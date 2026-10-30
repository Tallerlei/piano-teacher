import { describe, expect, it } from 'vitest';
import { buildTimeline } from './audio';
import { parsePiece } from './parse';
import { chordMidis, keyAlterations, parsePitch, spellChord } from './theory';
import type { Piece } from './types';

const base: Piece = { id: 't', title: 'T', key: 'C', time: [4, 4], tempo: 100 };

describe('theory', () => {
  it('parses pitches to midi', () => {
    expect(parsePitch('C4').midi).toBe(60);
    expect(parsePitch('A4').midi).toBe(69);
    expect(parsePitch('F#3').midi).toBe(54);
    expect(parsePitch('Bb2').midi).toBe(46);
  });

  it('knows key signatures', () => {
    expect(keyAlterations('G')).toEqual([0, 0, 0, 1, 0, 0, 0]);
    expect(keyAlterations('F')).toEqual([0, 0, 0, 0, 0, 0, -1]);
    expect(keyAlterations('D')).toEqual([1, 0, 0, 1, 0, 0, 0]);
  });

  it('spells chords with correct letter names', () => {
    expect(spellChord('C', '7', chordMidis('C', '7'))).toEqual(['C4', 'E4', 'G4', 'Bb4']);
    expect(spellChord('Eb', 'maj', chordMidis('Eb', 'maj'))).toEqual(['Eb4', 'G4', 'Bb4']);
    expect(spellChord('F#', 'min', chordMidis('F#', 'min'))).toEqual(['F#4', 'A4', 'C#5']);
    expect(spellChord('C', 'maj', chordMidis('C', 'maj', 1))).toEqual(['E4', 'G4', 'C5']);
  });
});

describe('parser', () => {
  it('reads notes, chords, rests, dots, ties, fingers and chord symbols', () => {
    const p = parsePiece({ ...base, rh: '{C} C4/q.:1 D4/8 [C4 E4 G4]/q:135 r/q | E4/h~ E4/h' });
    const e = p.events;
    expect(e).toHaveLength(6);
    expect(e[0]).toMatchObject({ beats: 1.5, fingers: [1], chord: 'C' });
    expect(e[2].pitches.map((x) => x.name)).toEqual(['C4', 'E4', 'G4']);
    expect(e[2].fingers).toEqual([1, 3, 5]);
    expect(e[3].pitches).toHaveLength(0);
    expect(e[4].tie).toBe(true);
    expect(p.measureCount).toBe(2);
  });

  it('reuses the previous duration', () => {
    const p = parsePiece({ ...base, rh: 'C4/8 D4 E4 F4 G4/h' });
    expect(p.events.map((e) => e.beats)).toEqual([0.5, 0.5, 0.5, 0.5, 2]);
  });

  it('rejects incomplete bars', () => {
    expect(() => parsePiece({ ...base, rh: 'C4/q D4 E4 | F4/w' })).toThrow(/bar 1 has 3 beats/);
  });

  it('supports pickup bars', () => {
    const p = parsePiece({ ...base, pickup: 1, rh: 'G4/q | C5/w' });
    expect(p.measureLengths).toEqual([1, 4]);
  });
});

describe('timeline', () => {
  it('merges tied notes into one sounding note', () => {
    const t = buildTimeline(parsePiece({ ...base, rh: 'C4/h~ C4/h' }));
    const attacks = t.filter((n) => n.attack);
    expect(attacks).toHaveLength(1);
    expect(attacks[0].end).toBe(4);
  });

  it('applies swing to offbeat eighths', () => {
    const t = buildTimeline(parsePiece({ ...base, swing: true, rh: 'C4/8 D4 E4 F4 G4/h' }));
    expect(t[1].start).toBeCloseTo(2 / 3);
    expect(t[2].start).toBeCloseTo(1);
  });
});
