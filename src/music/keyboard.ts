import { isBlackKey, midiToName } from './theory';
import type { Hand } from './types';

const SVG_NS = 'http://www.w3.org/2000/svg';

export interface KeyMark {
  hand: Hand | 'both';
  label?: string;
}

export interface KeyboardView {
  el: SVGSVGElement;
  setActive(active: Map<number, Hand>): void;
  setMarks(marks: Map<number, KeyMark>): void;
}

/** Pick a C-to-B range that covers all notes and spans at least `minOctaves`. */
export function keyboardRange(midis: number[], minOctaves = 2, maxOctaves = 4): [number, number] {
  if (!midis.length) return [48, 48 + 12 * minOctaves - 1];
  let low = Math.floor(Math.min(...midis) / 12) * 12;
  let high = Math.floor(Math.max(...midis) / 12) * 12 + 11;
  while ((high - low + 1) / 12 < minOctaves) {
    if (low > 36 && (high >= 83 || (high - 60) > (60 - low))) low -= 12;
    else high += 12;
  }
  while ((high - low + 1) / 12 > maxOctaves) {
    high -= 12;
  }
  return [low, high];
}

export function createKeyboard(low: number, high: number): KeyboardView {
  const whites: number[] = [];
  for (let m = low; m <= high; m++) if (!isBlackKey(m)) whites.push(m);
  const W = 24;
  const Hh = 120;
  const width = whites.length * W;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'keyboard');
  svg.setAttribute('viewBox', `0 0 ${width} ${Hh + 2}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMax meet');

  const keys = new Map<number, { rect: SVGRectElement; label: SVGTextElement }>();
  const whiteGroup = document.createElementNS(SVG_NS, 'g');
  const blackGroup = document.createElementNS(SVG_NS, 'g');
  svg.append(whiteGroup, blackGroup);

  const make = (m: number, x: number, w: number, h: number, black: boolean) => {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', '1');
    rect.setAttribute('width', String(w));
    rect.setAttribute('height', String(h));
    rect.setAttribute('rx', black ? '2' : '3');
    rect.setAttribute('class', black ? 'key black' : 'key white');
    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', String(x + w / 2));
    label.setAttribute('y', String(black ? h - 8 : h - 10));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', black ? 'key-label on-black' : 'key-label');
    if (m % 12 === 0) {
      label.textContent = midiToName(m);
      label.classList.add('c-label');
    }
    (black ? blackGroup : whiteGroup).append(rect, label);
    keys.set(m, { rect, label });
  };

  whites.forEach((m, i) => make(m, i * W + 0.5, W - 1, Hh, false));
  for (let m = low; m <= high; m++) {
    if (!isBlackKey(m)) continue;
    const leftWhite = whites.indexOf(m - 1);
    make(m, (leftWhite + 1) * W - W * 0.32, W * 0.64, Hh * 0.62, true);
  }

  const defaultLabel = (m: number) => (m % 12 === 0 ? midiToName(m) : '');
  let marks = new Map<number, KeyMark>();

  return {
    el: svg,
    setMarks(next) {
      marks = next;
      for (const [m, k] of keys) {
        k.rect.classList.remove('mark-rh', 'mark-lh', 'mark-both');
        const mark = marks.get(m);
        if (mark) k.rect.classList.add(`mark-${mark.hand}`);
        k.label.textContent = mark?.label ?? defaultLabel(m);
        k.label.classList.toggle('marked', !!mark);
      }
    },
    setActive(active) {
      for (const [m, k] of keys) {
        const hand = active.get(m);
        k.rect.classList.toggle('active-rh', hand === 'rh');
        k.rect.classList.toggle('active-lh', hand === 'lh');
      }
    },
  };
}
