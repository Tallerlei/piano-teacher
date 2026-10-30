import { play, unlockAudio, type Transport } from './music/audio';
import { createKeyboard, keyboardRange, type KeyMark } from './music/keyboard';
import { parsePiece } from './music/parse';
import { renderStaff, type SystemBox } from './music/staff';
import type { Hand, ParsedPiece, Piece } from './music/types';
import { save, state } from './state';
import { h } from './ui';

export interface PlayerHandle {
  el: HTMLElement;
  destroy(): void;
}

let activeTransport: Transport | null = null;

export function stopAllPlayback(): void {
  activeTransport?.stop();
  activeTransport = null;
}

export function createPlayer(piece: Piece): PlayerHandle {
  const parsed: ParsedPiece = parsePiece(piece);
  const tempoKey = piece.id;
  let tempoFactor = state.tempo[tempoKey] ?? 0.75;
  const hands: Record<Hand, boolean> = { rh: true, lh: true };
  let loop = false;
  let selection: [number, number] | null = null;
  let transport: Transport | null = null;
  let noteEls = new Map<string, SVGGElement>();
  let systems: SystemBox[] = [];
  let currentSystem = -1;
  let lit = new Set<string>();
  const eventMeasure = new Map(parsed.events.map((e) => [e.id, e.measure]));

  const hasRh = !!piece.rh;
  const hasLh = !!piece.lh;

  const staffBox = h('div', { class: 'staff-box' });
  const allMidis = parsed.events.flatMap((e) => e.pitches.map((p) => p.midi));
  const [low, high] = keyboardRange(allMidis, 2, 4);
  const keyboard = createKeyboard(low, high);

  // hand position: first note(s) of each hand
  const showStartPosition = () => {
    const marks = new Map<number, KeyMark>();
    for (const hand of ['lh', 'rh'] as Hand[]) {
      const first = parsed.events.find((e) => e.hand === hand && e.pitches.length);
      first?.pitches.forEach((p, i) => marks.set(p.midi, { hand, label: first.fingers[i] ? String(first.fingers[i]) : undefined }));
    }
    keyboard.setMarks(marks);
  };
  showStartPosition();

  const MIN_SCALE = 0.7;
  const draw = () => {
    const width = (staffBox.clientWidth || 700) - 4;
    const height = staffBox.clientHeight - 12;
    const render = (scale: number) => renderStaff(parsed, {
      width,
      scale,
      showNoteNames: state.settings.noteNames,
      showFingers: state.settings.fingers,
      selection,
    });
    // shrink the notation (within limits) so the current line *and the next one* fit on screen
    let scale = 1;
    let r = render(scale);
    for (let i = 0; i < 4 && height > 0; i++) {
      const need = twoLineHeight(r.systems);
      if (need <= height + 1 || scale <= MIN_SCALE) break;
      scale = Math.max(MIN_SCALE, (scale * height) / need);
      r = render(scale);
    }
    noteEls = r.noteEls;
    systems = r.systems;
    currentSystem = -1;
    lit = new Set();
    staffBox.replaceChildren(r.svg);
  };

  staffBox.addEventListener('click', (ev) => {
    // hit-test by position so taps on noteheads/stems/chord symbols still select the bar
    const target = [...staffBox.querySelectorAll('.measure-hit')].find((r) => {
      const b = r.getBoundingClientRect();
      return ev.clientX >= b.left && ev.clientX <= b.right && ev.clientY >= b.top && ev.clientY <= b.bottom;
    });
    if (!target) return;
    const m = Number(target.getAttribute('data-measure'));
    if (!selection) selection = [m, m];
    else if (selection[0] === selection[1] && m !== selection[0]) selection = [Math.min(m, selection[0]), Math.max(m, selection[0])];
    else if (m >= selection[0] && m <= selection[1]) selection = null;
    else selection = [m, m];
    if (transport) stop();
    updateSelectionLabel();
    draw();
  });

  const playBtn = h('button', { class: 'btn primary play-btn', 'aria-label': 'Listen' }, '▶ Listen');
  const bpmLabel = h('span', { class: 'bpm' });
  const tempo = h('input', { type: 'range', min: '30', max: '120', step: '5', value: String(Math.round(tempoFactor * 100)), 'aria-label': 'Tempo' }) as HTMLInputElement;
  const updateBpm = () => (bpmLabel.textContent = `${Math.round(piece.tempo * tempoFactor)} bpm`);
  updateBpm();
  tempo.addEventListener('input', () => {
    tempoFactor = Number(tempo.value) / 100;
    state.tempo[tempoKey] = tempoFactor;
    save();
    updateBpm();
    if (transport) restart();
  });

  const toggle = (label: string, initial: boolean, onChange: (v: boolean) => void, title: string) => {
    const b = h('button', { class: `chip${initial ? ' on' : ''}`, title, 'aria-pressed': String(initial) }, label);
    let v = initial;
    b.addEventListener('click', () => {
      v = !v;
      b.classList.toggle('on', v);
      b.setAttribute('aria-pressed', String(v));
      onChange(v);
    });
    return b;
  };

  const restart = () => {
    stop();
    start();
  };

  const selectionLabel = h('button', { class: 'chip selection-chip hidden', title: 'Clear bar selection' });
  const updateSelectionLabel = () => {
    if (!selection) {
      selectionLabel.classList.add('hidden');
      return;
    }
    selectionLabel.classList.remove('hidden');
    selectionLabel.textContent = selection[0] === selection[1] ? `Bar ${selection[0] + 1} ✕` : `Bars ${selection[0] + 1}–${selection[1] + 1} ✕`;
  };
  selectionLabel.addEventListener('click', () => {
    selection = null;
    updateSelectionLabel();
    if (transport) stop();
    draw();
  });

  const controls = h('div', { class: 'controls' },
    playBtn,
    h('div', { class: 'tempo' }, h('span', { class: 'tempo-icon' }, '🐢'), tempo, h('span', { class: 'tempo-icon' }, '🐇'), bpmLabel),
    hasRh ? toggle('🎵 Right hand', true, (v) => { hands.rh = v; if (transport) restart(); }, 'Hear the right hand') : '',
    hasLh ? toggle('🎵 Left hand', true, (v) => { hands.lh = v; if (transport) restart(); }, 'Hear the left hand') : '',
    toggle('Metronome', state.settings.metronome, (v) => { state.settings.metronome = v; save(); if (transport) restart(); }, 'Click on every beat'),
    toggle('Count-in', state.settings.countIn, (v) => { state.settings.countIn = v; save(); }, 'One bar of clicks before starting'),
    toggle('🔁 Loop', loop, (v) => { loop = v; if (transport) restart(); }, 'Repeat until you stop'),
    selectionLabel,
  );

  const onFrame = (evs: Set<string>, keys: Map<number, Hand>) => {
    for (const id of lit) if (!evs.has(id)) noteEls.get(id)?.classList.remove('playing');
    let measure = Infinity;
    for (const id of evs) {
      if (!lit.has(id)) noteEls.get(id)?.classList.add('playing');
      measure = Math.min(measure, eventMeasure.get(id) ?? Infinity);
    }
    lit = evs;
    keyboard.setActive(keys);
    if (measure !== Infinity) followSystem(measure);
  };

  // "page turn": when playback reaches a new line, bring it to the top so the next line shows below it
  const followSystem = (measure: number) => {
    const i = systems.findIndex((s) => measure >= s.firstMeasure && measure <= s.lastMeasure);
    if (i < 0 || i === currentSystem) return;
    currentSystem = i;
    const top = Math.max(0, systems[i]!.top - 4);
    if (Math.abs(staffBox.scrollTop - top) > 2) staffBox.scrollTo({ top, behavior: 'smooth' });
  };

  const start = async () => {
    stopAllPlayback();
    await unlockAudio();
    keyboard.setMarks(new Map());
    transport = play(parsed, {
      tempoFactor,
      hands,
      metronome: state.settings.metronome,
      countIn: state.settings.countIn,
      loop,
      range: selection,
    }, onFrame, () => {
      transport = null;
      activeTransport = null;
      setPlaying(false);
      showStartPosition();
    });
    activeTransport = transport;
    setPlaying(true);
  };

  const stop = () => {
    transport?.stop();
    if (activeTransport === transport) activeTransport = null;
    transport = null;
    setPlaying(false);
    showStartPosition();
  };

  const setPlaying = (p: boolean) => {
    playBtn.textContent = p ? '■ Stop' : '▶ Listen';
    playBtn.setAttribute('aria-label', p ? 'Stop' : 'Listen');
    playBtn.classList.toggle('stop', p);
  };

  playBtn.addEventListener('click', () => (transport ? stop() : start()));

  const header = h('div', { class: 'piece-header' },
    h('div', {},
      h('div', { class: 'piece-title' }, piece.title),
      h('div', { class: 'piece-meta' }, [piece.composer, piece.style, `Key of ${piece.key}`, `${piece.time[0]}/${piece.time[1]}`, piece.swing ? 'Swing feel' : ''].filter(Boolean).join(' · ')),
    ),
    h('div', { class: 'piece-hint' }, 'Tip: tap a bar to practise just that part'),
  );

  const kbBox = h('div', { class: 'keyboard-box' }, keyboard.el);
  const el = h('div', { class: 'player' }, header, staffBox, controls, kbBox);

  let lastWidth = 0;
  let lastHeight = 0;
  const ro = new ResizeObserver(() => {
    if (staffBox.clientWidth !== lastWidth || Math.abs(staffBox.clientHeight - lastHeight) > 8) {
      lastWidth = staffBox.clientWidth;
      lastHeight = staffBox.clientHeight;
      draw();
    }
  });
  ro.observe(staffBox);

  return {
    el,
    destroy() {
      stop();
      ro.disconnect();
    },
  };
}

/** Tallest span of two consecutive lines (or the single line if there is only one). */
function twoLineHeight(systems: SystemBox[]): number {
  if (systems.length < 2) return systems[0] ? systems[0].bottom - systems[0].top : 0;
  let max = 0;
  for (let i = 0; i < systems.length - 1; i++) max = Math.max(max, systems[i + 1]!.bottom - systems[i]!.top);
  return max;
}
