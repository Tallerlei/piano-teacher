import type { Piece } from '../music/types';
import { bars } from './helpers';

export interface Warmup {
  piece: Piece;
  level: number; // unit index from which it is recommended
  focus: string;
}

const up8 = (notes: string[], fingers?: number[]) => notes.map((n, i) => `${n}/8${fingers ? `:${fingers[i]}` : ''}`).join(' ');

export const warmups: Warmup[] = [
  {
    level: 0,
    focus: 'Even fingers, both hands together.',
    piece: {
      id: 'wu-five',
      title: 'Five-Finger Ripple',
      style: 'Exercise',
      key: 'C',
      time: [4, 4],
      tempo: 96,
      rh: bars(up8(['C4', 'D4', 'E4', 'F4', 'G4', 'F4', 'E4', 'D4'], [1, 2, 3, 4, 5, 4, 3, 2]), up8(['C4', 'D4', 'E4', 'F4', 'G4', 'F4', 'E4', 'D4']), up8(['C4', 'E4', 'D4', 'F4', 'E4', 'G4', 'F4', 'D4'], [1, 3, 2, 4, 3, 5, 4, 2]), 'C4/w:1'),
      lh: bars(up8(['C3', 'D3', 'E3', 'F3', 'G3', 'F3', 'E3', 'D3'], [5, 4, 3, 2, 1, 2, 3, 4]), up8(['C3', 'D3', 'E3', 'F3', 'G3', 'F3', 'E3', 'D3']), up8(['C3', 'E3', 'D3', 'F3', 'E3', 'G3', 'F3', 'D3'], [5, 3, 4, 2, 3, 1, 2, 4]), 'C3/w:5'),
    },
  },
  {
    level: 0,
    focus: 'Finger strength and independence — the classic Hanon pattern.',
    piece: {
      id: 'wu-hanon',
      title: 'Hanon Exercise No. 1',
      composer: 'Charles-Louis Hanon',
      style: 'Exercise',
      key: 'C',
      time: [4, 4],
      tempo: 84,
      rh: bars(
        up8(['C4', 'E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4'], [1, 2, 3, 4, 5, 4, 3, 2]),
        up8(['D4', 'F4', 'G4', 'A4', 'B4', 'A4', 'G4', 'F4']),
        up8(['E4', 'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4']),
        up8(['F4', 'A4', 'B4', 'C5', 'D5', 'C5', 'B4', 'A4']),
        up8(['G4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4']),
        up8(['A4', 'C5', 'D5', 'E5', 'F5', 'E5', 'D5', 'C5']),
        up8(['B4', 'D5', 'E5', 'F5', 'G5', 'F5', 'E5', 'D5']),
        'C5/w:1',
      ),
      lh: bars(
        up8(['C3', 'E3', 'F3', 'G3', 'A3', 'G3', 'F3', 'E3'], [5, 4, 3, 2, 1, 2, 3, 4]),
        up8(['D3', 'F3', 'G3', 'A3', 'B3', 'A3', 'G3', 'F3']),
        up8(['E3', 'G3', 'A3', 'B3', 'C4', 'B3', 'A3', 'G3']),
        up8(['F3', 'A3', 'B3', 'C4', 'D4', 'C4', 'B3', 'A3']),
        up8(['G3', 'B3', 'C4', 'D4', 'E4', 'D4', 'C4', 'B3']),
        up8(['A3', 'C4', 'D4', 'E4', 'F4', 'E4', 'D4', 'C4']),
        up8(['B3', 'D4', 'E4', 'F4', 'G4', 'F4', 'E4', 'D4']),
        'C4/w:5',
      ),
    },
  },
  {
    level: 1,
    focus: 'Thumb-under in the scale of C. Keep the wrist level as the thumb passes.',
    piece: {
      id: 'wu-c-scale',
      title: 'C Major Scale',
      style: 'Exercise',
      key: 'C',
      time: [4, 4],
      tempo: 80,
      rh: bars('C4/q:1 D4:2 E4:3 F4:1', 'G4/q:2 A4:3 B4:4 C5:5', 'B4/q:4 A4:3 G4:2 F4:1', 'E4/q:3 D4:2 C4/h:1', 'r/w', 'r/w', 'r/w', 'r/w'),
      lh: bars('r/w', 'r/w', 'r/w', 'r/w', 'C3/q:5 D3:4 E3:3 F3:2', 'G3/q:1 A3:3 B3:2 C4:1', 'B3/q:2 A3:3 G3:1 F3:2', 'E3/q:3 D3:4 C3/h:5'),
    },
  },
  {
    level: 2,
    focus: 'Broken chords for a flexible hand: root, fifth, octave.',
    piece: {
      id: 'wu-arpeggio',
      title: 'Broken Chord Waves',
      style: 'Exercise',
      key: 'C',
      time: [4, 4],
      tempo: 88,
      rh: bars('{C} ' + up8(['C4', 'E4', 'G4', 'C5', 'G4', 'E4', 'C4', 'E4'], [1, 2, 3, 5, 3, 2, 1, 2]), '{F} ' + up8(['C4', 'F4', 'A4', 'C5', 'A4', 'F4', 'C4', 'F4'], [1, 2, 3, 5, 3, 2, 1, 2]), '{G} ' + up8(['B3', 'D4', 'G4', 'B4', 'G4', 'D4', 'B3', 'D4'], [1, 2, 3, 5, 3, 2, 1, 2]), '{C} [C4 E4 G4 C5]/w'),
      lh: bars(up8(['C3', 'G3', 'C4', 'G3', 'C3', 'G3', 'C4', 'G3'], [5, 2, 1, 2, 5, 2, 1, 2]), up8(['F2', 'C3', 'F3', 'C3', 'F2', 'C3', 'F3', 'C3']), up8(['G2', 'D3', 'G3', 'D3', 'G2', 'D3', 'G3', 'D3']), '[C3 G3]/w'),
    },
  },
  {
    level: 4,
    focus: 'Inversions up and down — know every chord in every position.',
    piece: {
      id: 'wu-inversions',
      title: 'Inversion Ladder',
      style: 'Exercise',
      key: 'C',
      time: [4, 4],
      tempo: 80,
      rh: bars(
        '{C} [C4 E4 G4]/q:135 [E4 G4 C5]:125 [G4 C5 E5]:135 [C5 E5 G5]:135',
        '[G4 C5 E5]/q:135 [E4 G4 C5]:125 [C4 E4 G4]/h:135',
        '{F} [F4 A4 C5]/q:135 [A4 C5 F5]:125 [C5 F5 A5]:135 [F5 A5 C6]:135',
        '[C5 F5 A5]/q:135 [A4 C5 F5]:125 [F4 A4 C5]/h:135',
        '{G} [G4 B4 D5]/q:135 [B4 D5 G5]:125 [D5 G5 B5]:135 [G5 B5 D6]:135',
        '[D5 G5 B5]/q:135 [B4 D5 G5]:125 [G4 B4 D5]/h:135',
      ),
      lh: bars('C3/w', 'C3/w', 'F2/w', 'F2/w', 'G2/w', 'G2/w'),
    },
  },
  {
    level: 5,
    focus: 'The A minor scale — same white keys as C major, but a darker home.',
    piece: {
      id: 'wu-a-minor',
      title: 'A Natural Minor Scale',
      style: 'Exercise',
      key: 'Am',
      time: [4, 4],
      tempo: 80,
      rh: bars('A4/q:1 B4:2 C5:3 D5:1', 'E5/q:2 F5:3 G5:4 A5:5', 'G5/q:4 F5:3 E5:2 D5:1', 'C5/q:3 B4:2 A4/h:1', 'r/w', 'r/w', 'r/w', 'r/w'),
      lh: bars('r/w', 'r/w', 'r/w', 'r/w', 'A2/q:5 B2:4 C3:3 D3:2', 'E3/q:1 F3:3 G3:2 A3:1', 'G3/q:2 F3:3 E3:1 D3:2', 'C3/q:3 B2:4 A2/h:5'),
    },
  },
  {
    level: 6,
    focus: 'The blues scale: the sound of every rock and blues solo.',
    piece: {
      id: 'wu-blues-scale',
      title: 'C Blues Scale',
      style: 'Exercise',
      key: 'C',
      time: [4, 4],
      tempo: 90,
      swing: true,
      rh: bars(up8(['C4', 'Eb4', 'F4', 'F#4', 'G4', 'Bb4', 'C5', 'Bb4'], [1, 2, 3, 4, 1, 2, 3, 2]), up8(['G4', 'F#4', 'F4', 'Eb4', 'C4', 'Eb4', 'F4', 'F#4'], [1, 4, 3, 2, 1, 2, 3, 4]), up8(['G4', 'Bb4', 'C5', 'Bb4', 'G4', 'F4', 'Eb4', 'F4']), 'C4/w:1'),
      lh: bars('[C3 G3]/w', '[C3 G3]/w', '[C3 G3]/w', '[C3 G3]/w'),
    },
  },
  {
    level: 8,
    focus: 'G major: one sharp (F♯). Same fingering as C.',
    piece: {
      id: 'wu-g-scale',
      title: 'G Major Scale',
      style: 'Exercise',
      key: 'G',
      time: [4, 4],
      tempo: 80,
      rh: bars('G4/q:1 A4:2 B4:3 C5:1', 'D5/q:2 E5:3 F#5:4 G5:5', 'F#5/q:4 E5:3 D5:2 C5:1', 'B4/q:3 A4:2 G4/h:1', 'r/w', 'r/w', 'r/w', 'r/w'),
      lh: bars('r/w', 'r/w', 'r/w', 'r/w', 'G2/q:5 A2:4 B2:3 C3:2', 'D3/q:1 E3:3 F#3:2 G3:1', 'F#3/q:2 E3:3 D3:1 C3:2', 'B2/q:3 A2:4 G2/h:5'),
    },
  },
  {
    level: 8,
    focus: 'F major: one flat (B♭). The right hand crosses on B♭ with finger 4!',
    piece: {
      id: 'wu-f-scale',
      title: 'F Major Scale',
      style: 'Exercise',
      key: 'F',
      time: [4, 4],
      tempo: 80,
      rh: bars('F4/q:1 G4:2 A4:3 Bb4:4', 'C5/q:1 D5:2 E5:3 F5:4', 'E5/q:3 D5:2 C5:1 Bb4:4', 'A4/q:3 G4:2 F4/h:1', 'r/w', 'r/w', 'r/w', 'r/w'),
      lh: bars('r/w', 'r/w', 'r/w', 'r/w', 'F2/q:5 G2:4 A2:3 Bb2:2', 'C3/q:1 D3:3 E3:2 F3:1', 'E3/q:2 D3:3 C3:1 Bb2:2', 'A2/q:3 G2:4 F2/h:5'),
    },
  },
];

export function recommendedWarmup(unitIndex: number, date = new Date()): Warmup {
  const pool = warmups.filter((w) => w.level <= unitIndex);
  const day = Math.floor(date.getTime() / 86_400_000);
  return pool[day % pool.length];
}
