import { bars } from './helpers';
import type { Unit } from './types';

const fourChords = (chords: [string, string][], bass: string[]) => ({
  rh: bars(...chords.map(([name, ch]) => `{${name}} ${ch}/q ${ch}/q ${ch}/q ${ch}/q`), `{${chords[0]![0]}} ${chords[0]![1]}/w`),
  lh: bars(...bass.map((b) => `${b}/h ${b}/h`), `${bass[0]}/w`),
});

const gLoop = fourChords(
  [['G', '[B3 D4 G4]'], ['D', '[A3 D4 F#4]'], ['Em', '[B3 E4 G4]'], ['C', '[C4 E4 G4]']],
  ['G2', 'D3', 'E2', 'C3'],
);
const fLoop = fourChords(
  [['F', '[A3 C4 F4]'], ['C', '[G3 C4 E4]'], ['Dm', '[A3 D4 F4]'], ['Bb', '[Bb3 D4 F4]']],
  ['F2', 'C3', 'D3', 'Bb2'],
);
const dLoop = fourChords(
  [['D', '[A3 D4 F#4]'], ['A', '[A3 C#4 E4]'], ['Bm', '[B3 D4 F#4]'], ['G', '[B3 D4 G4]']],
  ['D3', 'A2', 'B2', 'G2'],
);

/** walking root – fifth bass in half notes */
const rf = (root: string, fifth: string) => `${root}/h ${fifth}/h`;

export const unit9: Unit = {
  id: 'u9',
  title: 'New Keys',
  subtitle: 'Sharps, flats and the keys of G, F and D — where guitar bands live',
  icon: '🔑',
  lessons: [
    {
      id: 'u9-l1',
      title: 'G major',
      summary: 'One sharp: F♯. The scale, the chords and the four-chord loop.',
      minutes: 25,
      steps: [
        {
          title: 'The G major scale',
          text: `So far nearly everything has been in C. But songs come in every key — and the **guitar-friendly keys G, D and F** are hugely common in pop and rock.

**G major** has one sharp: **F♯**. You’ll see it at the start of every line as the **key signature** — it means “every F is F♯” unless marked otherwise.

Fingering is the same as C major:
- **Right hand**: 1 2 3 – thumb under – 1 2 3 4 5
- **Left hand**: 5 4 3 2 1 – 3 over – 2 1`,
          piece: {
            id: 'u9-gscale',
            title: 'G Major Scale',
            style: 'Exercise',
            key: 'G',
            time: [4, 4],
            tempo: 80,
            rh: bars('G4/q:1 A4:2 B4:3 C5:1', 'D5/q:2 E5:3 F#5:4 G5:5', 'F#5/q:4 E5:3 D5:2 C5:1', 'B4/q:3 A4:2 G4/h:1'),
            lh: bars('G2/q:5 A2:4 B2:3 C3:2', 'D3/q:1 E3:3 F#3:2 G3:1', 'F#3/q:2 E3:3 D3:1 C3:2', 'B2/q:3 A2:4 G2/h:5'),
          },
          tasks: ['Right hand alone', 'Left hand alone', 'Hands together at 80 bpm'],
        },
        {
          title: 'Four chords in G',
          text: `The four pop chords in G are **G – D – Em – C** (I – V – vi – IV). Same pattern as C – G – Am – F, just moved up.

New shape: **D major** — D F♯ A. Here it’s played as A – D – F♯ so it sits close to the other chords.

> Transposing (moving a song to a new key) is easy once you think in Roman numerals: I – V – vi – IV works in *any* key.`,
          shapes: [
            { rh: 'B3:1 D4:2 G4:5', caption: 'G (I)' },
            { rh: 'A3:1 D4:3 F#4:5', caption: 'D (V)' },
            { rh: 'B3:1 E4:3 G4:5', caption: 'Em (vi)' },
            { rh: 'C4:1 E4:3 G4:5', caption: 'C (IV)' },
          ],
          piece: { id: 'u9-gloop', title: 'Four Chords in G', style: 'Pop', key: 'G', time: [4, 4], tempo: 92, ...gLoop },
          tasks: ['Name each chord as you play it', 'Hands together at 92 bpm', 'Play it with the 3-3-2 rhythm from Unit 3'],
        },
      ],
    },
    {
      id: 'u9-l2',
      title: 'F major',
      summary: 'One flat: B♭ — and a new scale fingering.',
      minutes: 25,
      steps: [
        {
          title: 'The F major scale',
          text: `**F major** has one flat: **B♭**.

Careful — the right-hand fingering is different! The thumb goes under onto **C**, not on B♭:
- **Right hand**: 1 2 3 4 – thumb under – 1 2 3 4
- **Left hand**: 5 4 3 2 1 – 3 over – 2 1 (same as before)

That way your 4th finger lands on the black key B♭ — black keys are for long fingers.`,
          piece: {
            id: 'u9-fscale',
            title: 'F Major Scale',
            style: 'Exercise',
            key: 'F',
            time: [4, 4],
            tempo: 80,
            rh: bars('F4/q:1 G4:2 A4:3 Bb4:4', 'C5/q:1 D5:2 E5:3 F5:4', 'E5/q:3 D5:2 C5:1 Bb4:4', 'A4/q:3 G4:2 F4/h:1'),
            lh: bars('F2/q:5 G2:4 A2:3 Bb2:2', 'C3/q:1 D3:3 E3:2 F3:1', 'E3/q:2 D3:3 C3:1 Bb2:2', 'A2/q:3 G2:4 F2/h:5'),
          },
          tasks: ['Right hand alone — watch the thumb on C', 'Left hand alone', 'Hands together at 80 bpm'],
        },
        {
          title: 'Four chords in F',
          text: `In F the I – V – vi – IV chords are **F – C – Dm – B♭**.

New shape: **B♭ major** — B♭ D F. Your thumb goes on the black key, which feels strange at first. Keep the hand a little further into the keys.`,
          shapes: [
            { rh: 'A3:1 C4:2 F4:5', caption: 'F (I)' },
            { rh: 'G3:1 C4:3 E4:5', caption: 'C (V)' },
            { rh: 'A3:1 D4:3 F4:5', caption: 'Dm (vi)' },
            { rh: 'Bb3:1 D4:3 F4:5', caption: 'B♭ (IV)' },
          ],
          piece: { id: 'u9-floop', title: 'Four Chords in F', style: 'Pop', key: 'F', time: [4, 4], tempo: 92, ...fLoop },
          tasks: ['Name each chord as you play it', 'Hands together at 92 bpm', 'Try the vi – IV – I – V order: Dm – B♭ – F – C'],
        },
      ],
    },
    {
      id: 'u9-l3',
      title: 'D major',
      summary: 'Two sharps: F♯ and C♯ — the favourite key of rock guitarists.',
      minutes: 25,
      steps: [
        {
          title: 'The D major scale',
          text: `**D major** has two sharps: **F♯ and C♯**. Lots of rock and folk songs live here because it’s so comfortable on guitar.

Fingering is the same as C and G:
- **Right hand**: 1 2 3 – thumb under – 1 2 3 4 5
- **Left hand**: 5 4 3 2 1 – 3 over – 2 1`,
          piece: {
            id: 'u9-dscale',
            title: 'D Major Scale',
            style: 'Exercise',
            key: 'D',
            time: [4, 4],
            tempo: 80,
            rh: bars('D4/q:1 E4:2 F#4:3 G4:1', 'A4/q:2 B4:3 C#5:4 D5:5', 'C#5/q:4 B4:3 A4:2 G4:1', 'F#4/q:3 E4:2 D4/h:1'),
            lh: bars('D3/q:5 E3:4 F#3:3 G3:2', 'A3/q:1 B3:3 C#4:2 D4:1', 'C#4/q:2 B3:3 A3:1 G3:2', 'F#3/q:3 E3:4 D3/h:5'),
          },
          tasks: ['Right hand alone', 'Left hand alone', 'Hands together at 80 bpm'],
        },
        {
          title: 'Four chords in D',
          text: `In D: **D – A – Bm – G**. Two new shapes: **A major** (A C♯ E) and **B minor** (B D F♯).

You now know the four-chord loop in **four keys**: C, G, F and D. That covers a *huge* number of pop and rock songs.`,
          shapes: [
            { rh: 'A3:1 D4:3 F#4:5', caption: 'D (I)' },
            { rh: 'A3:1 C#4:3 E4:5', caption: 'A (V)' },
            { rh: 'B3:1 D4:2 F#4:5', caption: 'Bm (vi)' },
            { rh: 'B3:1 D4:2 G4:5', caption: 'G (IV)' },
          ],
          piece: { id: 'u9-dloop', title: 'Four Chords in D', style: 'Rock', key: 'D', time: [4, 4], tempo: 96, ...dLoop },
          tasks: ['Name each chord as you play it', 'Hands together at 96 bpm', 'Play the left hand in driving eighth notes'],
        },
      ],
    },
    {
      id: 'u9-l4',
      title: 'Song: When the Saints',
      summary: 'A New Orleans classic in G with a walking left hand.',
      minutes: 25,
      steps: [
        {
          title: 'Go marching in',
          text: `**When the Saints Go Marching In** is a traditional gospel tune that became a New Orleans jazz anthem. Here it is in **G major**.

- It starts with a **three-beat pickup**: count “1” and start on “2”.
- Left hand: root and fifth in half notes, a simple “walking” feel.
- Chords: G, D7 (D F♯ A C), G7 (with F natural — see the ♮ sign) and C.

> Once you know it, give it a New Orleans bounce: lean on beats **2 and 4** and let the long notes ring.`,
          piece: {
            id: 'u9-saints',
            title: 'When the Saints Go Marching In',
            composer: 'Traditional',
            style: 'Folk',
            key: 'G',
            time: [4, 4],
            tempo: 112,
            pickup: 3,
            rh: bars(
              'G4/q:1 B4:3 C5:4',
              '{G} D5/w:5',
              'r/q G4/q:1 B4:3 C5:4',
              'D5/w:5',
              'r/q G4/q:1 B4:3 C5:4',
              'D5/h:5 B4/h:3',
              'G4/h:1 B4/h:3',
              '{D7} A4/w:2',
              'r/q B4/q:3 B4:3 A4:2',
              '{G} G4/w:1',
              '{G7} B4/h:2 D5/h:4',
              '{C} D5/q:4 C5/h.:3',
              'r/h B4/q:2 C5:3',
              '{G} D5/h:4 B4/h:2',
              '{D7} G4/h:1 A4/h:2',
              '{G} G4/w:1',
            ),
            lh: bars(
              'r/q r/q r/q',
              rf('G2', 'D3'), rf('G2', 'D3'), rf('G2', 'D3'), rf('G2', 'D3'), rf('G2', 'D3'), rf('G2', 'D3'),
              rf('D3', 'A2'), rf('D3', 'A2'),
              rf('G2', 'D3'), '[G2 F3]/h [B2 F3]/h',
              rf('C3', 'G2'), rf('C3', 'G2'),
              rf('G2', 'D3'), '[D3 C4]/h [D3 F#3]/h',
              '[G2 D3]/w',
            ),
          },
          tasks: ['Right hand alone at 90 bpm', 'Left hand alone at 90 bpm', 'Hands together at 90 bpm', 'Hands together at 112 bpm with a bounce'],
        },
      ],
    },
  ],
};
