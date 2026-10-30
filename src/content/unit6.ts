import { bars } from './helpers';
import type { Unit } from './types';

const Am = '[A3 C4 E4]';
const G = '[G3 B3 D4]';
const F = '[A3 C4 F4]';
const E = '[G#3 B3 E4]';

const threeThreeTwo = (chord: string, name: string) => `{${name}} ${chord}/q. ${chord}/q. ${chord}/q`;
const oct332 = (note: string, low: string) => `[${low} ${note}]/q. [${low} ${note}]/q. [${low} ${note}]/q`;

/** 6/8 broken chord: up four notes, back down two */
const arp68 = (name: string, a: string, b: string, c: string, d: string) => `{${name}} ${a}/8 ${b} ${c} ${d} ${c} ${b}`;
const RS = {
  Am: arp68('Am', 'A3', 'C4', 'E4', 'A4'),
  C: arp68('C', 'G3', 'C4', 'E4', 'G4'),
  D: arp68('D', 'A3', 'D4', 'F#4', 'A4'),
  F: arp68('F', 'A3', 'C4', 'F4', 'A4'),
  E: arp68('E', 'G#3', 'B3', 'E4', 'G#4'),
};
const RS_BASS = { Am: 'A2/h.', C: 'C3/h.', D: 'D3/h.', F: 'F2/h.', E: 'E2/h.' };
const RISING = ['Am', 'C', 'D', 'F', 'Am', 'C', 'E', 'E', 'Am', 'C', 'D', 'F', 'Am', 'E', 'Am', 'E'] as const;

const shanty = (bass: string, chord: string) => `${bass}/q ${chord}/q`;

export const unit6: Unit = {
  id: 'u6',
  title: 'Minor & Moody',
  subtitle: 'Minor keys, the Andalusian cadence and dark, dramatic grooves',
  icon: '🌙',
  lessons: [
    {
      id: 'u6-l1',
      title: 'The minor world',
      summary: 'The A minor scale and the chords that live in it.',
      minutes: 20,
      steps: [
        {
          title: 'A natural minor',
          text: `**A minor** uses exactly the same white keys as C major — it just starts on **A**. Same notes, different home, totally different mood.

Every major key has a **relative minor** three half-steps below: C major ↔ A minor.

Scale fingering (same pattern as C):
- **Right hand**: 1 2 3 – thumb under – 1 2 3 4 5
- **Left hand**: 5 4 3 2 1 – 3 over – 2 1

> Coming down, the right-hand 3 crosses *over* the thumb. Keep the wrist level and let the thumb glide.`,
          piece: {
            id: 'u6-aminor',
            title: 'A Minor Scale',
            style: 'Exercise',
            key: 'Am',
            time: [4, 4],
            tempo: 80,
            rh: bars('A4/q:1 B4:2 C5:3 D5:1', 'E5/q:2 F5:3 G5:4 A5:5', 'G5/q:4 F5:3 E5:2 D5:1', 'C5/q:3 B4:2 A4/h:1'),
            lh: bars('A2/q:5 B2:4 C3:3 D3:2', 'E3/q:1 F3:3 G3:2 A3:1', 'G3/q:2 F3:3 E3:1 D3:2', 'C3/q:3 B2:4 A2/h:5'),
          },
          tasks: ['Right hand alone, slowly', 'Left hand alone, slowly', 'Hands together at 60 bpm', 'Hands together at 80 bpm'],
        },
        {
          title: 'Chords of A minor',
          text: `The chords in A minor are the same as in C major — just viewed from a new home:

| i | III | iv | v / V | VI | VII |
|---|---|---|---|---|---|
| Am | C | Dm | Em / E | F | G |

One special trick: the **v** chord (Em) is often swapped for **E major** (with a **G♯**). That G♯ pulls hard back up to A and makes minor music sound dramatic — think flamenco, film scores and rock ballads.`,
          shapes: [
            { rh: 'A3:1 C4:3 E4:5', caption: 'Am — home' },
            { rh: 'A3:1 D4:3 F4:5', caption: 'Dm (2nd inversion)' },
            { rh: 'G#3:1 B3:2 E4:5', caption: 'E major — with G♯' },
            { rh: 'A3:1 C4:2 F4:5', caption: 'F (1st inversion)' },
            { rh: 'G3:1 B3:2 D4:5', caption: 'G' },
          ],
          tasks: ['Play Am – Dm – E – Am and listen to the pull of the G♯', 'Play Am – F – G – Am', 'Play each chord with the left-hand root'],
        },
      ],
    },
    {
      id: 'u6-l2',
      title: 'The Andalusian cadence',
      summary: 'Am – G – F – E: four falling chords with a Spanish flavour.',
      minutes: 20,
      steps: [
        {
          title: 'Song: Desert Road',
          text: `**Am – G – F – E** walks down step by step and lands on that dramatic E major. It’s called the **Andalusian cadence** (from flamenco), and it powers *Hit the Road Jack*, Del Shannon’s *Runaway*, *Walk Don’t Run* and many rock and surf tunes.

**Desert Road** (an original) uses the **3-3-2** rhythm from Unit 3:
- Bars 1–4: right-hand chords, left-hand octaves.
- Bars 5–8: the right hand plays a melody over the same groove.

The chord shapes barely move — fingers slide down one step at a time.`,
          piece: {
            id: 'u6-desert',
            title: 'Desert Road',
            composer: 'Piano Teacher original',
            style: 'Rock',
            key: 'Am',
            time: [4, 4],
            tempo: 104,
            rh: bars(
              threeThreeTwo(Am, 'Am'),
              threeThreeTwo(G, 'G'),
              threeThreeTwo(F, 'F'),
              threeThreeTwo(E, 'E'),
              '{Am} E5/q.:5 D5/q.:4 C5/q:3',
              '{G} D5/q.:4 C5/q.:3 B4/q:2',
              '{F} C5/q.:3 B4/q.:2 A4/q:1',
              '{E} G#4/q.:1 B4/8:2 E5/h:5',
              `{Am} ${Am}/w`,
            ),
            lh: bars(oct332('A2', 'A1'), oct332('G2', 'G1'), oct332('F2', 'F1'), oct332('E2', 'E1'), oct332('A2', 'A1'), oct332('G2', 'G1'), oct332('F2', 'F1'), oct332('E2', 'E1'), '[A1 A2]/w'),
          },
          tasks: ['Right-hand chords alone, counting 1-2-3 1-2-3 1-2', 'Hands together, bars 1–4', 'Melody bars 5–8 hands together', 'Whole song at 104 bpm'],
        },
      ],
    },
    {
      id: 'u6-l3',
      title: '6/8 and the rising sun',
      summary: 'Rolling broken chords in 6/8 time, on a classic traditional progression.',
      minutes: 20,
      steps: [
        {
          title: 'Feeling 6/8',
          text: `**6/8 time** has six eighth notes per bar, grouped in two sets of three: “**1** 2 3 **4** 5 6”. It has a rolling, swaying feel — perfect for broken chords.

This chord sequence comes from **The House of the Rising Sun**, a traditional American folk song made world-famous as a rock classic in the 1960s:

**Am – C – D – F | Am – C – E – E**

Notice the **D major** (with F♯) — a bright surprise inside a minor key.

Right hand: up four notes, back down two. Left hand: hold the bass note for the whole bar (dotted half note).

> Keep the arpeggio even and let it flow — think of waves, not steps.`,
          piece: {
            id: 'u6-rising',
            title: 'Rising Sun Arpeggios',
            composer: 'Traditional progression',
            style: 'Rock',
            key: 'Am',
            time: [6, 8],
            tempo: 150,
            rh: bars(...RISING.map((c) => RS[c]), '{Am} [A3 C4 E4 A4]/h.'),
            lh: bars(...RISING.map((c) => RS_BASS[c]), '[A1 A2]/h.'),
          },
          tasks: ['Right hand alone, counting “1 2 3 4 5 6”', 'Hands together at 110 bpm', 'Hands together at 150 bpm', 'Loop it and add the sustain pedal'],
        },
      ],
    },
    {
      id: 'u6-l4',
      title: 'Two minor folk songs',
      summary: 'A sea shanty and an old English ballad.',
      minutes: 30,
      steps: [
        {
          title: 'Drunken Sailor',
          text: `A traditional **sea shanty** in a minor-sounding mode called **D Dorian** (all white keys, home on D). Shanties were work songs — so play it with a strong, stomping beat!

New: **sixteenth notes** (quarter of a beat) in bar 1: “**1** e & **2** e &” — da-da-da, da-da-da.

Left hand: an oom-pah in **2/4**: low root, then a light chord.`,
          piece: {
            id: 'u6-sailor',
            title: 'Drunken Sailor',
            composer: 'Traditional sea shanty',
            style: 'Folk',
            key: 'C',
            time: [2, 4],
            tempo: 108,
            rh: bars(
              '{Dm} A4/8:5 A4/16:5 A4:5 A4/8:5 A4/16:5 A4:5',
              'A4/8:5 D4:1 F4:3 A4:5',
              '{C} G4/8:4 G4/16:4 G4:4 G4/8:4 G4/16:4 G4:4',
              'G4/8:5 C4:1 E4:3 G4:5',
              '{Dm} A4/8:4 A4/16:4 A4:4 A4/8:4 A4/16:4 A4:4',
              'A4/8:1 B4:2 C5:3 D5:4',
              '{C} C5/8:3 A4:1 G4:2 E4:1',
              '{Dm} D4/q:1 D4:1',
              '{Dm} A4/q:5 A4:5',
              'A4/8:5 D4:1 F4:3 A4:5',
              '{C} G4/q:4 G4:4',
              'G4/8:5 C4:1 E4:3 G4:5',
              '{Dm} A4/q:4 A4:4',
              'A4/8:1 B4:2 C5:3 D5:4',
              '{C} C5/8:3 A4:1 G4:2 E4:1',
              '{Dm} D4/q:1 D4:1',
            ),
            lh: bars(
              shanty('D3', '[F3 A3]'), shanty('D3', '[F3 A3]'), shanty('C3', '[E3 G3]'), shanty('C3', '[E3 G3]'),
              shanty('D3', '[F3 A3]'), shanty('D3', '[F3 A3]'), shanty('C3', '[E3 G3]'), shanty('D3', '[F3 A3]'),
              shanty('D3', '[F3 A3]'), shanty('D3', '[F3 A3]'), shanty('C3', '[E3 G3]'), shanty('C3', '[E3 G3]'),
              shanty('D3', '[F3 A3]'), shanty('D3', '[F3 A3]'), shanty('C3', '[E3 G3]'), '[D2 D3]/q r/q',
            ),
          },
          tasks: ['Clap the rhythm of bar 1', 'Right hand alone at 80 bpm', 'Hands together at 80 bpm', 'Hands together at 108 bpm — stomp!'],
        },
        {
          title: 'Greensleeves',
          text: `**Greensleeves** is an English folk ballad over 400 years old — and still covered by rock, pop and jazz artists today.

It’s in **3/4** with a **pickup** (start on beat 3), and it uses the long-short **dotted quarter + eighth** rhythm throughout. Watch out for **G♯** (from the E major chord) and **F♯** in the chorus.

Left hand: open fifths held for the whole bar — an ancient, hollow sound.

Practise in four 8-bar sections: tap the first bar of a section, then its last bar, to loop it.`,
          piece: {
            id: 'u6-greensleeves',
            title: 'Greensleeves',
            composer: 'Traditional English',
            style: 'Folk',
            key: 'Am',
            time: [3, 4],
            tempo: 100,
            pickup: 1,
            measuresPerLine: 4,
            rh: bars(
              'A4/q:1',
              '{Am} C5/h:2 D5/q:3', '{C} E5/q.:4 F5/8:5 E5/q:4', '{G} D5/h:3 B4/q:2', '{Em} G4/q.:1 A4/8:2 B4/q:3',
              '{Am} C5/h:4 A4/q:2', '{E} A4/q.:2 G#4/8:1 A4/q:2', '{E} B4/h:3 G#4/q:1', '{E} E4/h:1 A4/q:1',
              '{Am} C5/h:2 D5/q:3', '{C} E5/q.:4 F5/8:5 E5/q:4', '{G} D5/h:3 B4/q:2', '{Em} G4/q.:1 A4/8:2 B4/q:3',
              '{Am} C5/q.:4 B4/8:3 A4/q:2', '{E} G#4/q.:1 F#4/8:1 G#4/q:1', '{Am} A4/h.~:2', 'A4/h.:2',
              '{C} G5/h.~:5', '{G} G5/h:5 F#5/8:4 E5/8:3', '{G} D5/h:2 B4/q:1', '{Em} G4/q.:1 A4/8:2 B4/q:3',
              '{Am} C5/h:4 A4/q:2', '{E} A4/q.:2 G#4/8:1 A4/q:2', '{E} B4/h:3 G#4/q:1', '{E} E4/h.:1',
              '{C} G5/h.~:5', '{G} G5/h:5 F#5/8:4 E5/8:3', '{G} D5/h:2 B4/q:1', '{Em} G4/q.:1 A4/8:2 B4/q:3',
              '{Am} C5/q.:4 B4/8:3 A4/q:2', '{E} G#4/q.:1 F#4/8:1 G#4/q:1', '{Am} A4/h.~:2', 'A4/h.:2',
            ),
            lh: bars(
              'r/q',
              '[A2 E3]/h.', '[C3 G3]/h.', '[G2 D3]/h.', '[E2 B2]/h.', '[A2 E3]/h.', '[E2 B2]/h.', '[E2 B2]/h.', '[E2 B2]/h.',
              '[A2 E3]/h.', '[C3 G3]/h.', '[G2 D3]/h.', '[E2 B2]/h.', '[A2 E3]/h.', '[E2 B2]/h.', '[A2 E3]/h.', '[A2 E3]/h.',
              '[C3 G3]/h.', '[G2 D3]/h.', '[G2 D3]/h.', '[E2 B2]/h.', '[A2 E3]/h.', '[E2 B2]/h.', '[E2 B2]/h.', '[E2 B2]/h.',
              '[C3 G3]/h.', '[G2 D3]/h.', '[G2 D3]/h.', '[E2 B2]/h.', '[A2 E3]/h.', '[E2 B2]/h.', '[A2 E3]/h.', '[A1 A2]/h.',
            ),
          },
          tasks: ['Bars 1–9 hands together', 'Bars 10–17 hands together', 'Chorus (bars 18–33) hands together', 'The whole song at 100 bpm'],
        },
      ],
    },
  ],
};
