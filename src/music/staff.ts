import { diatonicIndex, keyAlterations, keySignatureCount, STEP_NAMES } from './theory';
import type { NoteEvent, ParsedPiece } from './types';

const SVG_NS = 'http://www.w3.org/2000/svg';
const S = 11; // staff line spacing in px
const H = S / 2;

export interface StaffOptions {
  width: number;
  showNoteNames: boolean;
  showFingers: boolean;
  selection?: [number, number] | null;
}

export interface StaffRender {
  svg: SVGSVGElement;
  noteEls: Map<string, SVGGElement>;
}

type StaffKind = 'treble' | 'bass';
const TOP_LINE: Record<StaffKind, number> = { treble: 38, bass: 26 };
const BOTTOM_LINE: Record<StaffKind, number> = { treble: 30, bass: 18 };
const MIDDLE_LINE: Record<StaffKind, number> = { treble: 34, bass: 22 };

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}, parent?: Element): SVGElementTagNameMap[K] {
  const e = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  parent?.appendChild(e);
  return e;
}

function text(parent: Element, x: number, y: number, content: string, attrs: Record<string, string | number> = {}) {
  const t = el('text', { x, y, ...attrs }, parent);
  t.textContent = content;
  return t;
}

const ACC_GLYPH: Record<number, string> = { 1: '♯', [-1]: '♭', 0: '♮' };

function measuresPerLine(parsed: ParsedPiece, width: number): number {
  if (parsed.piece.measuresPerLine) return parsed.piece.measuresPerLine;
  const counts = new Map<string, number>();
  for (const e of parsed.events) {
    const k = `${e.hand}-${e.measure}`;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const density = Math.max(1, ...counts.values());
  const usable = width - 110;
  const perMeasure = Math.max(130, density * 26 + 30);
  return Math.max(1, Math.min(parsed.measureCount, 4, Math.floor(usable / perMeasure)));
}

export function renderStaff(parsed: ParsedPiece, opts: StaffOptions): StaffRender {
  const { piece } = parsed;
  const hasRh = parsed.events.some((e) => e.hand === 'rh');
  const hasLh = parsed.events.some((e) => e.hand === 'lh');
  const staves: StaffKind[] = [];
  if (hasRh) staves.push('treble');
  if (hasLh) staves.push('bass');
  const staffOf = (e: NoteEvent): StaffKind => (e.hand === 'rh' ? 'treble' : 'bass');

  const width = Math.max(320, opts.width);
  const mpl = measuresPerLine(parsed, width);
  const keyCount = keySignatureCount(piece.key);
  const keyAlters = keyAlterations(piece.key);

  const svg = el('svg', { class: 'staff', width });
  const noteEls = new Map<string, SVGGElement>();
  const ksWidth = Math.abs(keyCount) * 9;

  let y = 0;
  for (let sys = 0, first = 0; first < parsed.measureCount; sys++, first += mpl) {
    const last = Math.min(parsed.measureCount, first + mpl) - 1;
    const sysEvents = parsed.events.filter((e) => e.measure >= first && e.measure <= last);
    const idxRange = (kind: StaffKind) => {
      const ids = sysEvents.filter((e) => staffOf(e) === kind).flatMap((e) => e.pitches.map(diatonicIndex));
      return ids.length ? [Math.min(...ids), Math.max(...ids)] : [TOP_LINE[kind], TOP_LINE[kind]];
    };
    const [tMin, tMax] = idxRange('treble');
    const [bMin, bMax] = idxRange('bass');
    const firstStaff = staves[0];
    const lastStaff = staves[staves.length - 1];
    const topIdxMax = firstStaff === 'treble' ? tMax : bMax;
    const botIdxMin = lastStaff === 'treble' ? tMin : bMin;
    // headroom (px above the top staff line) needed by notes, up-stems and RH fingering
    let headroom = (topIdxMax - TOP_LINE[firstStaff]) * H;
    for (const e of sysEvents) {
      if (!e.pitches.length || staffOf(e) !== firstStaff) continue;
      const idxs = e.pitches.map(diatonicIndex);
      const mid = MIDDLE_LINE[firstStaff];
      let hi = (Math.max(...idxs) - TOP_LINE[firstStaff]) * H;
      if (e.dur !== 'w' && mid - Math.min(...idxs) >= Math.max(...idxs) - mid) hi = Math.max(hi, (Math.min(...idxs) - TOP_LINE[firstStaff]) * H + 3.3 * S);
      if (opts.showFingers && e.hand === 'rh' && e.fingers.length) hi = Math.max(10, hi + 10) + (e.fingers.length - 1) * 11 + 9;
      headroom = Math.max(headroom, hi);
    }
    const chordLift = Math.max(22, (topIdxMax - TOP_LINE[firstStaff]) * H + 30, headroom + 8);
    const above = Math.max(46, (topIdxMax - TOP_LINE[firstStaff]) * H + 50, chordLift + 20);
    const nameLane = opts.showNoteNames ? 18 : 0;
    const below = Math.max(34, (BOTTOM_LINE[lastStaff] - botIdxMin) * H + 34) + nameLane;
    const gap = staves.length === 2 ? 52 + Math.max(0, 30 - tMin) * H + Math.max(0, bMax - 26) * H + nameLane : 0;

    const tops: Partial<Record<StaffKind, number>> = {};
    tops[firstStaff] = y + above;
    if (staves.length === 2) tops.bass = tops.treble! + 4 * S + gap;
    const sysBottom = tops[lastStaff]! + 4 * S + below;
    const g = el('g', { class: 'system' }, svg);

    const yOf = (kind: StaffKind, idx: number) => tops[kind]! + (TOP_LINE[kind] - idx) * H;

    // header: clefs, key signature, time signature
    const x0 = 6;
    const headerW = 34 + ksWidth + (sys === 0 ? 24 : 6);
    const mx0 = x0 + headerW;
    const mw = (width - mx0 - 6) / mpl;
    const sysRight = mx0 + mw * (last - first + 1);

    // selection + hit areas
    for (let m = first; m <= last; m++) {
      const mx = mx0 + (m - first) * mw;
      const sel = opts.selection && m >= opts.selection[0] && m <= opts.selection[1];
      el('rect', {
        class: `measure-hit${sel ? ' selected' : ''}`,
        x: mx, y: tops[firstStaff]! - 16, width: mw, height: tops[lastStaff]! + 4 * S + 16 - (tops[firstStaff]! - 16),
        'data-measure': m, rx: 6,
      }, g);
    }

    for (const kind of staves) {
      const top = tops[kind]!;
      for (let i = 0; i < 5; i++) el('line', { class: 'staff-line', x1: x0, x2: sysRight, y1: top + i * S, y2: top + i * S }, g);
      if (kind === 'treble') text(g, x0 + 2, top + 3 * S + 3, '𝄞', { class: 'clef', 'font-size': 4.1 * S });
      else text(g, x0 + 2, top + 3 * S + 1, '𝄢', { class: 'clef', 'font-size': 3.7 * S });
      // key signature
      const sharpIdx = kind === 'treble' ? [38, 35, 39, 36, 33, 37, 34] : [24, 21, 25, 22, 19, 23, 20];
      const flatIdx = kind === 'treble' ? [34, 37, 33, 36, 32, 35, 31] : [20, 23, 19, 22, 18, 21, 17];
      for (let i = 0; i < Math.abs(keyCount); i++) {
        const idx = keyCount > 0 ? sharpIdx[i] : flatIdx[i];
        text(g, x0 + 34 + i * 9, yOf(kind, idx) + 4.5, keyCount > 0 ? '♯' : '♭', { class: 'accidental', 'font-size': 17 });
      }
      if (sys === 0) {
        const tx = x0 + 36 + ksWidth + 6;
        text(g, tx, top + 2 * S - 1, String(piece.time[0]), { class: 'timesig' });
        text(g, tx, top + 4 * S - 1, String(piece.time[1]), { class: 'timesig' });
      }
    }
    // system bracket line
    el('line', { class: 'bar-line', x1: x0, x2: x0, y1: tops[firstStaff]!, y2: tops[lastStaff]! + 4 * S }, g);

    // measure number
    text(g, x0, tops[firstStaff]! - 30, String(first + 1), { class: 'measure-number' });

    // bar lines
    for (let m = first; m <= last; m++) {
      const xr = mx0 + (m - first + 1) * mw;
      const isEnd = m === parsed.measureCount - 1;
      for (const kind of staves) {
        el('line', { class: 'bar-line', x1: xr, x2: xr, y1: tops[kind]!, y2: tops[kind]! + 4 * S }, g);
        if (isEnd) {
          el('line', { class: 'bar-line', x1: xr - 5, x2: xr - 5, y1: tops[kind]!, y2: tops[kind]! + 4 * S }, g);
          el('rect', { x: xr - 3, y: tops[kind]!, width: 4, height: 4 * S, class: 'bar-end' }, g);
        }
      }
      if (staves.length === 2) el('line', { class: 'bar-line', x1: xr, x2: xr, y1: tops.treble! + 4 * S, y2: tops.bass! }, g);
    }

    // Each onset gets width growing with sqrt(duration), so short notes before long ones aren't cramped.
    const onsetX = new Map<number, Map<number, number>>();
    const key = (t: number) => Math.round(t * 1000);
    for (let m = first; m <= last; m++) {
      const ms = parsed.measureStarts[m]!;
      const end = ms + parsed.measureLengths[m]!;
      const times = new Set<number>([key(ms)]);
      for (const e of parsed.events) if (e.measure === m) times.add(key(e.start));
      for (const c of parsed.chords) if (c.measure === m) times.add(key(c.start));
      const sorted = [...times].sort((a, b) => a - b);
      const weights = sorted.map((t, i) => Math.sqrt(((sorted[i + 1] ?? key(end)) - t) / 1000) + 0.35);
      const total = weights.reduce((a, b) => a + b, 0);
      const mx = mx0 + (m - first) * mw;
      const map = new Map<number, number>();
      let acc = 0;
      sorted.forEach((t, i) => { map.set(t, mx + 20 + (acc / total) * (mw - 30)); acc += weights[i]!; });
      onsetX.set(m, map);
    }
    const xAt = (m: number, start: number) => onsetX.get(m)!.get(key(start))!;
    const xOf = (e: NoteEvent) => xAt(e.measure, e.start);

    // chord symbols
    for (const c of parsed.chords.filter((c) => c.measure >= first && c.measure <= last)) {
      text(g, xAt(c.measure, c.start) - 6, tops[firstStaff]! - chordLift, c.name, { class: 'chord-symbol' });
    }

    // accidentals carry per measure+staff
    const carried = new Map<string, number>();

    // beam groups
    const beamGroups = new Map<string, NoteEvent[]>();
    const beatUnit = piece.time[1] === 8 ? 1.5 : 1;
    for (const kind of staves) {
      const evs = sysEvents.filter((e) => staffOf(e) === kind);
      let group: NoteEvent[] = [];
      const flush = () => {
        if (group.length > 1) group.forEach((e) => beamGroups.set(e.id, group));
        group = [];
      };
      for (const e of evs) {
        const isBeamable = e.dur === '8' && !e.dotted && e.pitches.length > 0;
        const beatNo = Math.floor((e.start - parsed.measureStarts[e.measure]) / beatUnit + 1e-6);
        if (!isBeamable) {
          flush();
          continue;
        }
        const prev = group[group.length - 1];
        if (prev) {
          const prevBeat = Math.floor((prev.start - parsed.measureStarts[prev.measure]) / beatUnit + 1e-6);
          if (prev.measure !== e.measure || prevBeat !== beatNo || Math.abs(prev.start + prev.beats - e.start) > 1e-6) flush();
        }
        group.push(e);
      }
      flush();
    }
    const drawnBeams = new Set<NoteEvent[]>();
    const stemInfo = new Map<string, { x: number; up: boolean; tipY: number; endY: number }>();

    const stemUp = (kind: StaffKind, idxs: number[]) => {
      const mid = MIDDLE_LINE[kind];
      const hi = Math.max(...idxs) - mid;
      const lo = mid - Math.min(...idxs);
      return lo >= hi;
    };

    // first pass: stem directions & positions (needed for beams)
    for (const e of sysEvents) {
      if (!e.pitches.length || e.dur === 'w') continue;
      const kind = staffOf(e);
      const group = beamGroups.get(e.id);
      const idxs = (group ?? [e]).flatMap((n) => n.pitches.map(diatonicIndex));
      const up = stemUp(kind, idxs);
      const x = xOf(e);
      const ys = e.pitches.map((p) => yOf(kind, diatonicIndex(p)));
      const sx = up ? x + 5.6 : x - 5.6;
      const tipY = up ? Math.min(...ys) - 3.3 * S : Math.max(...ys) + 3.3 * S;
      const endY = up ? Math.max(...ys) : Math.min(...ys);
      stemInfo.set(e.id, { x: sx, up, tipY, endY });
    }
    // beams adjust tips
    for (const [, group] of beamGroups) {
      if (drawnBeams.has(group)) continue;
      drawnBeams.add(group);
      const infos = group.map((n) => stemInfo.get(n.id)!);
      const up = infos[0].up;
      const firstI = infos[0];
      const lastI = infos[infos.length - 1];
      let slope = (lastI.tipY - firstI.tipY) / Math.max(1, lastI.x - firstI.x);
      slope = Math.max(-0.12, Math.min(0.12, slope));
      let offset = 0;
      for (const inf of infos) {
        const lineY = firstI.tipY + slope * (inf.x - firstI.x);
        offset = up ? Math.min(offset, inf.tipY - lineY) : Math.max(offset, inf.tipY - lineY);
      }
      for (const inf of infos) inf.tipY = firstI.tipY + offset + slope * (inf.x - firstI.x);
      el('line', { class: 'beam', x1: firstI.x, x2: lastI.x, y1: firstI.tipY, y2: lastI.tipY, 'stroke-width': 4.5 }, g);
    }

    // second pass: draw events
    for (const e of sysEvents) {
      const kind = staffOf(e);
      const ng = el('g', { class: `note ${e.hand}`, 'data-id': e.id }, g);
      noteEls.set(e.id, ng);
      const x = xOf(e);
      const top = tops[kind]!;

      if (!e.pitches.length) {
        drawRest(ng, e, x, top);
        continue;
      }
      const hollow = e.dur === 'w' || e.dur === 'h';
      const info = stemInfo.get(e.id);
      const up = info?.up ?? true;
      const idxs = e.pitches.map(diatonicIndex);

      // ledger lines
      const minI = Math.min(...idxs);
      const maxI = Math.max(...idxs);
      for (let l = BOTTOM_LINE[kind] - 2; l >= minI; l -= 2) el('line', { class: 'ledger', x1: x - 10, x2: x + 10, y1: yOf(kind, l), y2: yOf(kind, l) }, ng);
      for (let l = TOP_LINE[kind] + 2; l <= maxI; l += 2) el('line', { class: 'ledger', x1: x - 10, x2: x + 10, y1: yOf(kind, l), y2: yOf(kind, l) }, ng);

      // note heads (with second-interval displacement)
      let prevIdx = -999;
      let prevShifted = false;
      let accCol = 0;
      e.pitches.forEach((p) => {
        const idx = diatonicIndex(p);
        let dx = 0;
        if (idx - prevIdx === 1 && !prevShifted) {
          dx = up ? 11.5 : -11.5;
          prevShifted = true;
        } else prevShifted = false;
        prevIdx = idx;
        const ny = yOf(kind, idx);
        if (e.dur === 'w') {
          el('ellipse', { class: 'head hollow whole', cx: x + dx, cy: ny, rx: 7, ry: 4.6 }, ng);
        } else {
          el('ellipse', { class: `head${hollow ? ' hollow' : ''}`, cx: x + dx, cy: ny, rx: 6.3, ry: 4.4, transform: `rotate(-22 ${x + dx} ${ny})` }, ng);
        }
        if (e.dotted) {
          const onLine = (idx - BOTTOM_LINE[kind]) % 2 === 0;
          el('circle', { class: 'dot', cx: x + Math.max(dx, 0) + 11, cy: onLine ? ny - H : ny, r: 1.8 }, ng);
        }
        // accidentals
        const key = `${e.measure}-${kind}-${p.step}-${p.octave}`;
        const current = carried.has(key) ? carried.get(key)! : keyAlters[p.step];
        if (p.alter !== current) {
          text(ng, x - 17 - accCol * 10, ny + 5, ACC_GLYPH[p.alter], { class: 'accidental', 'font-size': 17, 'text-anchor': 'middle' });
          accCol = (accCol + 1) % 2;
          carried.set(key, p.alter);
        }
      });

      // stem, flags
      if (info) {
        el('line', { class: 'stem', x1: info.x, x2: info.x, y1: info.endY, y2: info.tipY }, ng);
        if (!beamGroups.has(e.id) && (e.dur === '8' || e.dur === '16')) {
          const flags = e.dur === '8' ? 1 : 2;
          for (let f = 0; f < flags; f++) {
            const fy = info.tipY + (up ? f * 8 : -f * 8);
            const d = up
              ? `M${info.x},${fy} c1,9 11,11 8,24`
              : `M${info.x},${fy} c1,-9 11,-11 8,-24`;
            el('path', { class: 'flag', d }, ng);
          }
        }
      }

      // tie to next event of same hand
      if (e.tie) {
        const next = parsed.events.find((n) => n.hand === e.hand && n.start > e.start + 1e-6 && n.pitches.some((p) => e.pitches.some((q) => q.midi === p.midi)));
        const x2 = next && next.measure <= last ? xOf(next) - 7 : sysRight - 4;
        for (const p of e.pitches) {
          const ny = yOf(kind, diatonicIndex(p)) + (up ? 7 : -7);
          const bend = up ? 7 : -7;
          el('path', { class: 'tie', d: `M${x + 7},${ny} Q${(x + x2) / 2},${ny + bend} ${x2},${ny}` }, ng);
        }
      }

      // fingers
      if (opts.showFingers && e.fingers.length) {
        const ys = e.pitches.map((p) => yOf(kind, diatonicIndex(p)));
        const fingers = [...e.fingers];
        if (e.hand === 'rh') {
          const base = Math.min(top - 10, Math.min(...ys, info && info.up ? info.tipY : Infinity) - 10);
          fingers.forEach((f, i) => text(ng, x, base - (fingers.length - 1 - i) * 11, String(f), { class: 'finger', 'text-anchor': 'middle' }));
        } else {
          const base = Math.max(top + 4 * S + 18, Math.max(...ys, info && !info.up ? info.tipY : -Infinity) + 18);
          fingers.forEach((f, i) => text(ng, x, base + (fingers.length - 1 - i) * 11, String(f), { class: 'finger', 'text-anchor': 'middle' }));
        }
      }

      // note names
      if (opts.showNoteNames) {
        const label = e.pitches.map((p) => STEP_NAMES[p.step] + (p.alter === 1 ? '♯' : p.alter === -1 ? '♭' : '')).join('');
        let ly: number;
        if (kind === 'treble' && staves.length === 2) ly = tops.bass! - nameLane / 2 - 4;
        else ly = top + 4 * S + below - 8;
        text(ng, x, ly, label, { class: 'note-name', 'text-anchor': 'middle' });
      }
    }

    y = sysBottom;
  }
  svg.setAttribute('height', String(Math.ceil(y)));
  svg.setAttribute('viewBox', `0 0 ${width} ${Math.ceil(y)}`);
  return { svg, noteEls };
}

function drawRest(g: SVGGElement, e: NoteEvent, x: number, top: number) {
  const mid = top + 2 * S;
  switch (e.dur) {
    case 'w':
      el('rect', { class: 'rest', x: x - 6, y: top + S, width: 12, height: 5 }, g);
      break;
    case 'h':
      el('rect', { class: 'rest', x: x - 6, y: mid - 5, width: 12, height: 5 }, g);
      break;
    case 'q':
      el('path', {
        class: 'rest-stroke',
        d: `M${x - 3},${mid - 15} l6,7 l-5,6 l6,7 c-5,-3 -9,0 -4,6`,
      }, g);
      break;
    default: {
      el('circle', { class: 'rest', cx: x - 3, cy: mid - 4, r: 2.6 }, g);
      el('path', { class: 'rest-stroke', d: `M${x - 3},${mid - 2} q4,2 7,-3 l-5,15` }, g);
      if (e.dur === '16') {
        el('circle', { class: 'rest', cx: x - 5, cy: mid + 3, r: 2.6 }, g);
        el('path', { class: 'rest-stroke', d: `M${x - 5},${mid + 5} q4,2 8,-3` }, g);
      }
    }
  }
  if (e.dotted) el('circle', { class: 'dot', cx: x + 9, cy: mid - H, r: 1.8 }, g);
}
