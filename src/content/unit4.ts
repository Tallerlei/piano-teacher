import { bars } from './helpers';
import type { Unit } from './types';

const C = '[C4 E4 G4]';
const G = '[B3 D4 G4]';
const Am = '[C4 E4 A4]';
const F = '[C4 F4 A4]';

const LH = {
  C: ['C3', 'G3', 'C4'],
  G: ['G2', 'D3', 'G3'],
  Am: ['A2', 'E3', 'A3'],
  F: ['F2', 'C3', 'F3'],
  Em: ['E2', 'B2', 'E3'],
} as const;

/** root – fifth – octave – fifth, as quarters (one bar) or eighths (twice per bar) */
const lh = (c: keyof typeof LH, dur: 'q' | '8') => {
  const [r, f, o] = LH[c];
  return dur === 'q' ? `${r}/q ${f} ${o} ${f}` : `${r}/8 ${f} ${o} ${f} ${r} ${f} ${o} ${f}`;
};

/** oom-pah-pah: bass note, then the chord twice */
const waltz = (bass: string, chord: string) => `${bass}/q ${chord}/q ${chord}/q`;

export const unit4: Unit = {
  id: 'u4',
  title: 'Left Hand Grooves',
  subtitle: 'Give your left hand a job: bass patterns, arpeggios and the waltz',
  icon: '🎸',
  lessons: [
    {
      id: 'u4-l1',
      title: 'Root, fifth, octave',
      summary: 'The left-hand pattern behind thousands of pop ballads.',
      minutes: 20,
      steps: [
        {
          title: 'The 1 – 5 – 8 shape',
          text: `So far your left hand has mostly played single roots. Time to give it a proper job!

Take any chord’s **root** (1), its **fifth** (5 — count five letters up) and the **octave** (8 — the root again, higher). For C that’s **C – G – C**.

Fingering: **5** on the low root, **2** on the fifth, **1** (thumb) on the octave. Your hand keeps the same shape — just move it to the next root for each chord.

> The shape is the same for every major and minor chord. Learn the *feel* of the stretch, not just the notes.`,
          shapes: [
            { lh: 'C3:5 G3:2 C4:1', caption: 'C: 1 – 5 – 8', arpeggiate: true },
            { lh: 'G2:5 D3:2 G3:1', caption: 'G: 1 – 5 – 8', arpeggiate: true },
            { lh: 'A2:5 E3:2 A3:1', caption: 'Am: 1 – 5 – 8', arpeggiate: true },
            { lh: 'F2:5 C3:2 F3:1', caption: 'F: 1 – 5 – 8', arpeggiate: true },
          ],
          tasks: ['Play each shape as a block (all together)', 'Play each shape broken: up 1 – 5 – 8 and back', 'Jump between the C and G shapes without looking'],
        },
        {
          title: 'Quarter-note bass',
          text: `Now walk the shape **1 – 5 – 8 – 5** in quarter notes under the four pop chords. The right hand just holds each chord for the whole bar.

Keep the left-hand thumb light on the top note — the low root should be the strongest.`,
          piece: {
            id: 'u4-root5',
            title: 'Root–Fifth Walk',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 84,
            rh: bars(`{C} ${C}/w`, `{G} ${G}/w`, `{Am} ${Am}/w`, `{F} ${F}/w`, `{C} ${C}/w`, `{G} ${G}/w`, `{Am} ${Am}/w`, `{F} ${F}/h ${F}/h`),
            lh: bars('C3/q:5 G3:2 C4:1 G3:2', lh('G', 'q'), lh('Am', 'q'), lh('F', 'q'), lh('C', 'q'), lh('G', 'q'), lh('Am', 'q'), lh('F', 'q')),
          },
          tasks: ['Left hand alone at 70 bpm', 'Hands together at 84 bpm', 'Keep your eyes on the music, not your hands'],
        },
        {
          title: 'Flowing eighths',
          text: `Double the speed of the left hand: **1 – 5 – 8 – 5** twice per bar in **eighth notes**. Suddenly it flows like a ballad accompaniment!

The right hand plays half-note chords. If you have a sustain pedal, press it with each new chord, then lift and press again exactly as the next chord sounds (“change the pedal with the chord”).`,
          piece: {
            id: 'u4-arp8',
            title: 'Flowing Fifths',
            style: 'Ballad',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars(`{C} ${C}/h ${C}/h`, `{G} ${G}/h ${G}/h`, `{Am} ${Am}/h ${Am}/h`, `{F} ${F}/h ${F}/h`),
            lh: bars('C3/8:5 G3:2 C4:1 G3:2 C3:5 G3:2 C4:1 G3:2', lh('G', '8'), lh('Am', '8'), lh('F', '8')),
          },
          tasks: ['Left hand alone at 60 bpm — even eighths', 'Hands together at 72 bpm', 'Loop it 4 times at 84 bpm'],
        },
      ],
    },
    {
      id: 'u4-l2',
      title: 'Song: Rainy Window',
      summary: 'An original ballad: right-hand melody over flowing left-hand arpeggios.',
      minutes: 25,
      steps: [
        {
          title: 'Melody meets arpeggio',
          text: `**Rainy Window** is a gentle ballad. The left hand plays the **1 – 5 – 8 – 5** eighths you just learned; the right hand sings a melody on top.

New chord: **Em** (E – G – B) in bar 2. Its left-hand shape is **E – B – E**.

How to learn it:
1. Left hand alone until it runs on autopilot.
2. Right hand alone — sing along if you like!
3. Hands together **very slowly**, one bar at a time. Tap a bar to loop it.

> In a ballad the melody is the singer. Play it a little louder than the left hand.`,
          piece: {
            id: 'u4-rainy',
            title: 'Rainy Window',
            composer: 'Piano Teacher original',
            style: 'Ballad',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars(
              '{C} G4/q:1 C5:2 E5/q.:4 D5/8:3',
              '{Em} E5/q.:4 D5/8:3 B4/h:1',
              '{Am} A4/q:1 C5:2 E5/q.:4 D5/8:3',
              '{F} C5/h:2 A4/h:1',
              '{C} G4/q:1 C5:2 E5/q.:4 F5/8:5',
              '{G} G5/q.:5 F5/8:4 D5/h:2',
              '{F} C5/q.:2 D5/8:3 A4/q:1 C5:2',
              '{C} C5/w:2',
            ),
            lh: bars(lh('C', '8'), lh('Em', '8'), lh('Am', '8'), lh('F', '8'), lh('C', '8'), lh('G', '8'), lh('F', '8'), '[C2 C3]/w'),
          },
          tasks: ['Left hand alone at 72 bpm', 'Right hand alone, singing the melody', 'Hands together at 50 bpm', 'Hands together at 72 bpm with feeling'],
        },
      ],
    },
    {
      id: 'u4-l3',
      title: 'The waltz: oom-pah-pah',
      summary: 'Three beats in a bar — bass note, chord, chord.',
      minutes: 15,
      steps: [
        {
          title: 'Oom – pah – pah',
          text: `In **3/4 time** there are three beats per bar. The classic left-hand pattern is **bass – chord – chord** (“oom – pah – pah”):

- **Beat 1**: the low root — strong.
- **Beats 2 and 3**: two chord notes higher up — light and short.

New chord: **G7** (G – B – D – F). The F gives it a strong pull back home to C. In the left hand we play just **F and B** above the G root.

> Plenty of rock and pop ballads sway in three (or in 6/8). Once you feel the “1 – 2 – 3” you’ll hear it everywhere.`,
          piece: {
            id: 'u4-waltz',
            title: 'Oom-Pah-Pah',
            style: 'Exercise',
            key: 'C',
            time: [3, 4],
            tempo: 108,
            rh: bars(`{C} ${C}/h.`, `{F} ${F}/h.`, `{G7} [B3 D4 F4]/h.`, `{C} ${C}/h.`, `{C} ${C}/h.`, `{F} ${F}/h.`, `{G7} [B3 D4 F4]/h.`, `{C} ${C}/h.`),
            lh: bars(
              'C3/q:5 [E3 G3]/q:31 [E3 G3]/q:31',
              waltz('F2', '[F3 A3]'),
              waltz('G2', '[F3 B3]'),
              waltz('C3', '[E3 G3]'),
              waltz('C3', '[E3 G3]'),
              waltz('F2', '[F3 A3]'),
              waltz('G2', '[F3 B3]'),
              'C3/h.',
            ),
          },
          tasks: ['Left hand alone, counting “1 2 3”', 'Hands together at 90 bpm', 'Hands together at 108 bpm'],
        },
      ],
    },
    {
      id: 'u4-l4',
      title: 'Song: Amazing Grace',
      summary: 'A much-loved traditional hymn with a waltz left hand.',
      minutes: 25,
      steps: [
        {
          title: 'A pickup and a waltz',
          text: `**Amazing Grace** is a traditional hymn, sung by everyone from gospel choirs to rock bands.

Two new things:
- It starts with a **pickup** (or *upbeat*): the first bar only has beat 3. Count “1, 2” silently and play the G on “3”.
- The **C7** chord (C – E – G – B♭) leads strongly to F.

Left hand: the waltz pattern from the last lesson. Right hand: the melody — let it sing over the light “pah-pahs”.

> Bar 8 is **tied** into bar 9: hold that high G for five beats in total.`,
          piece: {
            id: 'u4-amazing',
            title: 'Amazing Grace',
            composer: 'Traditional',
            style: 'Folk',
            key: 'C',
            time: [3, 4],
            tempo: 96,
            pickup: 1,
            rh: bars(
              'G4/q:1',
              '{C} C5/h:3 E5/8:5 C5:3',
              '{C7} E5/h:5 D5/q:4',
              '{F} C5/h:3 A4/q:2',
              '{C} G4/h:1 G4/q:1',
              '{C} C5/h:3 E5/8:5 C5:3',
              '{Am} E5/h:5 D5/q:4',
              '{G} G5/h.~:5',
              'G5/h:5 E5/q:3',
              '{C} G5/h:5 E5/8:3 C5:1',
              '{C7} E5/h:3 D5/q:2',
              '{F} C5/h:1 A4/q:1',
              '{C} G4/h:1 {G7} G4/q:1',
              '{Am} C5/h:3 E5/8:5 C5:3',
              '{G7} E5/h:5 D5/q:4',
              '{C} C5/h.:3',
            ),
            lh: bars(
              'r/q',
              waltz('C3', '[E3 G3]'),
              waltz('C3', '[E3 Bb3]'),
              waltz('F2', '[F3 A3]'),
              waltz('C3', '[E3 G3]'),
              waltz('C3', '[E3 G3]'),
              waltz('A2', '[E3 A3]'),
              waltz('G2', '[G3 B3]'),
              waltz('G2', '[G3 B3]'),
              waltz('C3', '[E3 G3]'),
              waltz('C3', '[E3 Bb3]'),
              waltz('F2', '[F3 A3]'),
              'C3/q [E3 G3]/q G2/q',
              waltz('A2', '[E3 A3]'),
              waltz('G2', '[F3 B3]'),
              '[C3 G3]/h.',
            ),
          },
          tasks: ['Right hand alone at 80 bpm', 'Left hand alone at 80 bpm', 'Hands together at 80 bpm', 'Hands together at 96 bpm — expressive!'],
        },
      ],
    },
  ],
};
