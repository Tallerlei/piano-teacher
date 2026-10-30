import { midiToFrequency } from './theory';
import type { Hand, ParsedPiece } from './types';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let pianoWave: PeriodicWave | null = null;

function audio(): AudioContext {
  if (!ctx) {
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    // lets Web Audio play on iPad even when the ring/silent switch is on (Safari 17+)
    if (nav.audioSession) nav.audioSession.type = 'playback';
    ctx = new AudioContext({ latencyHint: 'interactive' });
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(comp).connect(ctx.destination);
    const harmonics = [0, 1, 0.42, 0.22, 0.12, 0.09, 0.05, 0.04, 0.025, 0.015];
    pianoWave = ctx.createPeriodicWave(new Float32Array(harmonics.length), new Float32Array(harmonics));
  }
  return ctx;
}

export async function unlockAudio(): Promise<void> {
  const c = audio();
  if (c.state !== 'running') await c.resume();
  const buf = c.createBuffer(1, 1, 22050);
  const src = c.createBufferSource();
  src.buffer = buf;
  src.connect(c.destination);
  src.start();
}

interface Voice {
  oscs: OscillatorNode[];
  gain: GainNode;
}
const voices = new Set<Voice>();

export function playNote(midi: number, when: number, duration: number, velocity = 0.8): void {
  const c = audio();
  const freq = midiToFrequency(midi);
  const gain = c.createGain();
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = Math.min(9000, freq * 7 + 600);
  filter.Q.value = 0.4;
  // lower notes sustain longer, like real strings
  const decay = Math.max(0.6, 3.2 - (midi - 36) * 0.035);
  const peak = 0.28 * velocity * (midi < 48 ? 1.15 : 1);
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(peak, when + 0.006);
  gain.gain.setTargetAtTime(peak * 0.35, when + 0.006, decay * 0.18);
  gain.gain.setTargetAtTime(0.0001, when + 0.25, decay);
  const end = when + duration;
  gain.gain.cancelScheduledValues(end);
  gain.gain.setTargetAtTime(0, end, 0.07);

  const oscs: OscillatorNode[] = [];
  for (const detune of [-3, 3]) {
    const o = c.createOscillator();
    o.setPeriodicWave(pianoWave!);
    o.frequency.value = freq;
    o.detune.value = detune;
    o.connect(filter);
    o.start(when);
    o.stop(end + 0.6);
    oscs.push(o);
  }
  filter.connect(gain).connect(master!);
  const voice = { oscs, gain };
  voices.add(voice);
  oscs[0].onended = () => voices.delete(voice);
}

export function click(when: number, accent: boolean, volume = 1): void {
  const c = audio();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'square';
  o.frequency.value = accent ? 1760 : 1100;
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(0.12 * volume, when + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, when + 0.05);
  o.connect(g).connect(master!);
  o.start(when);
  o.stop(when + 0.06);
  const voice = { oscs: [o], gain: g };
  voices.add(voice);
  o.onended = () => voices.delete(voice);
}

export function silenceAll(): void {
  if (!ctx) return;
  const now = ctx.currentTime;
  for (const v of voices) {
    v.gain.gain.cancelScheduledValues(now);
    v.gain.gain.setTargetAtTime(0, now, 0.02);
    for (const o of v.oscs) {
      try {
        o.stop(now + 0.1);
      } catch {
        /* already stopped */
      }
    }
  }
  voices.clear();
}

export function playChordNow(midis: number[], arpeggiate = false): void {
  const c = audio();
  const t = c.currentTime + 0.03;
  midis.forEach((m, i) => playNote(m, t + (arpeggiate ? i * 0.18 : 0), arpeggiate ? 1.6 - i * 0.18 : 1.4));
}

// ---------------------------------------------------------------- transport

export interface PlayOptions {
  tempoFactor: number;
  hands: Record<Hand, boolean>;
  metronome: boolean;
  countIn: boolean;
  loop: boolean;
  range?: [number, number] | null; // inclusive measure indices
}

export interface TimedNote {
  eventId: string;
  hand: Hand;
  midi: number;
  start: number; // beats
  end: number; // beats
  attack: boolean;
}

/** Turn parsed music into individual notes, resolving ties and swing. */
export function buildTimeline(parsed: ParsedPiece): TimedNote[] {
  const swing = (b: number) => {
    if (!parsed.piece.swing) return b;
    const base = Math.floor(b + 1e-9);
    const frac = b - base;
    return base + (frac <= 0.5 ? frac * (4 / 3) : 2 / 3 + (frac - 0.5) * (2 / 3));
  };
  const out: TimedNote[] = [];
  const open = new Map<string, TimedNote>(); // `${hand}-${midi}` → note awaiting tie continuation
  const sorted = [...parsed.events].sort((a, b) => a.start - b.start);
  for (const e of sorted) {
    for (const p of e.pitches) {
      const key = `${e.hand}-${p.midi}`;
      const prev = open.get(key);
      const endBeat = e.start + e.beats;
      if (prev && Math.abs(prev.end - swing(e.start)) < 1e-6) {
        prev.end = swing(endBeat);
        out.push({ eventId: e.id, hand: e.hand, midi: p.midi, start: swing(e.start), end: swing(endBeat), attack: false });
        if (!e.tie) open.delete(key);
        continue;
      }
      const note: TimedNote = { eventId: e.id, hand: e.hand, midi: p.midi, start: swing(e.start), end: swing(endBeat), attack: true };
      out.push(note);
      if (e.tie) open.set(key, note);
      else open.delete(key);
    }
  }
  return out;
}

export interface Transport {
  stop(): void;
}

interface Highlight {
  eventId: string;
  hand: Hand;
  midi: number;
  on: number;
  off: number;
}

export function play(
  parsed: ParsedPiece,
  opts: PlayOptions,
  onFrame: (activeEvents: Set<string>, activeKeys: Map<number, Hand>, beat: number | null) => void,
  onEnd: () => void,
): Transport {
  const c = audio();
  const bpm = parsed.piece.tempo * opts.tempoFactor;
  const spb = 60 / bpm;
  const [m1, m2] = opts.range ?? [0, parsed.measureCount - 1];
  const fromBeat = parsed.measureStarts[m1];
  const toBeat = parsed.measureStarts[m2] + parsed.measureLengths[m2];
  const timeline = buildTimeline(parsed).filter((n) => n.start >= fromBeat - 1e-6 && n.start < toBeat - 1e-6);
  const unit = 4 / parsed.piece.time[1];
  const barBeats = (parsed.piece.time[0] * 4) / parsed.piece.time[1];

  let stopped = false;
  let timer: number | undefined;
  let raf = 0;
  const highlights: Highlight[] = [];
  let passStart = 0;

  const schedulePass = (t0: number) => {
    passStart = t0;
    for (const n of timeline) {
      const on = t0 + (n.start - fromBeat) * spb;
      const off = t0 + (Math.min(n.end, toBeat) - fromBeat) * spb;
      if (opts.hands[n.hand]) {
        if (n.attack) playNote(n.midi, on, Math.max(0.05, off - on - 0.02), n.hand === 'lh' ? 0.68 : 0.85);
      }
      highlights.push({ eventId: n.eventId, hand: n.hand, midi: n.midi, on, off: off - 0.015 });
    }
    if (opts.metronome) {
      for (let m = m1; m <= m2; m++) {
        const ms = parsed.measureStarts[m];
        const len = parsed.measureLengths[m];
        const offset = m === 0 && parsed.piece.pickup ? barBeats - len : 0;
        for (let b = 0; b < len - 1e-6; b += unit) {
          const posInBar = b + offset;
          click(t0 + (ms + b - fromBeat) * spb, Math.abs(posInBar) < 1e-6, 0.8);
        }
      }
    }
    const end = t0 + (toBeat - fromBeat) * spb;
    const wait = (end - c.currentTime - 0.25) * 1000;
    timer = window.setTimeout(() => {
      if (stopped) return;
      if (opts.loop) schedulePass(end);
      else
        timer = window.setTimeout(() => {
          if (!stopped) {
            stopped = true;
            cancelAnimationFrame(raf);
            onFrame(new Set(), new Map(), null);
            onEnd();
          }
        }, 450);
    }, Math.max(0, wait));
  };

  let start = c.currentTime + 0.12;
  if (opts.countIn) {
    const clicks = Math.round(barBeats / unit);
    for (let i = 0; i < clicks; i++) click(start + i * unit * spb, i === 0);
    start += barBeats * spb;
  }
  schedulePass(start);

  const frame = () => {
    if (stopped) return;
    const t = c.currentTime;
    const evs = new Set<string>();
    const keys = new Map<number, Hand>();
    for (let i = highlights.length - 1; i >= 0; i--) {
      const h = highlights[i];
      if (h.off < t - 1) {
        highlights.splice(i, 1);
        continue;
      }
      if (h.on <= t && t < h.off) {
        evs.add(h.eventId);
        keys.set(h.midi, h.hand);
      }
    }
    const beat = t >= passStart ? fromBeat + (t - passStart) / spb : null;
    onFrame(evs, keys, beat);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return {
    stop() {
      if (stopped) return;
      stopped = true;
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      silenceAll();
      onFrame(new Set(), new Map(), null);
    },
  };
}
