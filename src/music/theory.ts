import type { DurationCode, Pitch } from './types';

export const STEP_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const STEP_PC = [0, 2, 4, 5, 7, 9, 11];

export const DURATION_BEATS: Record<DurationCode, number> = {
  w: 4,
  h: 2,
  q: 1,
  '8': 0.5,
  '16': 0.25,
};

export function parsePitch(text: string): Pitch {
  const m = /^([A-Ga-g])(#|b|n)?(-?\d)$/.exec(text);
  if (!m) throw new Error(`Invalid pitch "${text}"`);
  const step = STEP_NAMES.indexOf(m[1].toUpperCase());
  const alter = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0;
  const octave = Number(m[3]);
  const midi = 12 * (octave + 1) + STEP_PC[step] + alter;
  return { step, alter, octave, midi, name: `${STEP_NAMES[step]}${m[2] === '#' ? '#' : m[2] === 'b' ? 'b' : ''}${octave}` };
}

/** Diatonic index used for vertical staff placement. */
export function diatonicIndex(p: Pitch): number {
  return p.octave * 7 + p.step;
}

export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export function midiToName(midi: number, preferFlats = false): string {
  const names = preferFlats ? FLAT_NAMES : SHARP_NAMES;
  return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

export function pitchClassName(midi: number, preferFlats = false): string {
  return (preferFlats ? FLAT_NAMES : SHARP_NAMES)[((midi % 12) + 12) % 12];
}

export function isBlackKey(midi: number): boolean {
  return [1, 3, 6, 8, 10].includes(((midi % 12) + 12) % 12);
}

// Key signatures: positive = sharps, negative = flats.
const KEY_SIGNATURES: Record<string, number> = {
  C: 0, Am: 0,
  G: 1, Em: 1,
  D: 2, Bm: 2,
  A: 3, 'F#m': 3,
  E: 4, 'C#m': 4,
  F: -1, Dm: -1,
  Bb: -2, Gm: -2,
  Eb: -3, Cm: -3,
  Ab: -4, Fm: -4,
};

export const SHARP_ORDER = [3, 0, 4, 1, 5, 2, 6]; // F C G D A E B
export const FLAT_ORDER = [6, 2, 5, 1, 4, 0, 3]; // B E A D G C F

export function keySignatureCount(key: string): number {
  if (!(key in KEY_SIGNATURES)) throw new Error(`Unknown key "${key}"`);
  return KEY_SIGNATURES[key];
}

/** Alteration per diatonic step (0..6) implied by the key signature. */
export function keyAlterations(key: string): number[] {
  const n = keySignatureCount(key);
  const alters = [0, 0, 0, 0, 0, 0, 0];
  if (n > 0) SHARP_ORDER.slice(0, n).forEach((s) => (alters[s] = 1));
  if (n < 0) FLAT_ORDER.slice(0, -n).forEach((s) => (alters[s] = -1));
  return alters;
}

export interface ChordQuality {
  id: string;
  label: string;
  suffix: string;
  intervals: number[];
  description: string;
}

export const CHORD_QUALITIES: ChordQuality[] = [
  { id: 'maj', label: 'Major', suffix: '', intervals: [0, 4, 7], description: 'Bright and stable — the backbone of pop and rock.' },
  { id: 'min', label: 'Minor', suffix: 'm', intervals: [0, 3, 7], description: 'Darker, emotional. Lower the middle note of a major chord by a half step.' },
  { id: 'sus2', label: 'Sus2', suffix: 'sus2', intervals: [0, 2, 7], description: 'Open and airy — neither major nor minor.' },
  { id: 'sus4', label: 'Sus4', suffix: 'sus4', intervals: [0, 5, 7], description: 'Tense; it wants to resolve back to the major chord.' },
  { id: 'add9', label: 'Add9', suffix: 'add9', intervals: [0, 4, 7, 14], description: 'A major chord with a sparkle on top. Very common in modern pop.' },
  { id: '7', label: 'Dominant 7', suffix: '7', intervals: [0, 4, 7, 10], description: 'Bluesy and restless. The sound of rock’n’roll and blues.' },
  { id: 'maj7', label: 'Major 7', suffix: 'maj7', intervals: [0, 4, 7, 11], description: 'Dreamy and smooth — soul, lo-fi and soft rock.' },
  { id: 'm7', label: 'Minor 7', suffix: 'm7', intervals: [0, 3, 7, 10], description: 'Mellow and soulful.' },
  { id: 'dim', label: 'Diminished', suffix: 'dim', intervals: [0, 3, 6], description: 'Tense and unstable; used as a passing chord.' },
  { id: 'aug', label: 'Augmented', suffix: 'aug', intervals: [0, 4, 8], description: 'Dreamy and mysterious; often leads somewhere new.' },
  { id: '5', label: 'Power chord', suffix: '5', intervals: [0, 7, 12], description: 'Root and fifth only — the rock sound.' },
];

export const ROOTS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const DEGREE_OF_INTERVAL: Record<number, number> = { 0: 0, 2: 1, 3: 2, 4: 2, 5: 3, 6: 4, 7: 4, 8: 4, 10: 6, 11: 6, 12: 0, 14: 1 };

/** Correctly spelled note names (e.g. "Bb4" not "A#4") for a chord's midi notes. */
export function spellChord(root: string, qualityId: string, midis: number[]): string[] {
  const rootLetter = STEP_NAMES.indexOf(root[0]);
  const rootPc = ROOTS.indexOf(root);
  return midis.map((m) => {
    const interval = (((m - rootPc) % 12) + 12) % 12;
    const quality = CHORD_QUALITIES.find((q) => q.id === qualityId)!;
    const raw = quality.intervals.find((i) => i % 12 === interval) ?? interval;
    const letter = (rootLetter + (DEGREE_OF_INTERVAL[raw] ?? 0)) % 7;
    let alter = (((m % 12) - STEP_PC[letter]) + 12) % 12;
    if (alter > 6) alter -= 12;
    if (Math.abs(alter) > 1) return midiToName(m, alter < 0);
    const octave = Math.floor((m - alter) / 12) - 1;
    const acc = alter === 1 ? '#' : alter === -1 ? 'b' : '';
    return `${STEP_NAMES[letter]}${acc}${octave}`;
  });
}

export function chordMidis(root: string, qualityId: string, inversion = 0, baseOctave = 4): number[] {
  const rootPc = ROOTS.indexOf(root);
  const quality = CHORD_QUALITIES.find((q) => q.id === qualityId);
  if (rootPc < 0 || !quality) throw new Error(`Unknown chord ${root}${qualityId}`);
  const base = 12 * (baseOctave + 1) + rootPc;
  const notes = quality.intervals.map((i) => base + i);
  const inv = Math.min(inversion, notes.length - 1);
  for (let i = 0; i < inv; i++) {
    const n = notes.shift()!;
    notes.push(n + 12);
  }
  return notes;
}
