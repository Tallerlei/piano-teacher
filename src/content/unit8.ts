import { bars } from './helpers';
import type { Unit } from './types';

// voice-led seventh chords around middle C (3rd, 5th, 7th or 7th, root, 3rd)
const Cmaj7 = '[E4 G4 B4]';
const Am7 = '[E4 G4 C5]';
const Dm7 = '[F4 A4 C5]';
const G7 = '[F4 G4 B4]';

/** chord on 1, then again on the "& of 2" tied over beat 3 */
const neoPush = (chord: string, name: string) => `{${name}} ${chord}/q. ${chord}/8~ ${chord}/h`;

export const unit8: Unit = {
  id: 'u8',
  title: 'Colour Chords',
  subtitle: 'Sus, add9 and seventh chords — the sound of modern pop, soul and ballads',
  icon: '🎨',
  lessons: [
    {
      id: 'u8-l1',
      title: 'Suspended chords',
      summary: 'Sus2 and sus4: chords that hang in the air before resolving.',
      minutes: 20,
      steps: [
        {
          title: 'Sus4 and sus2',
          text: `Take a major or minor chord and **replace the 3rd**:

- **sus4**: the 3rd moves *up* to the 4th — C F G. Tense, wants to fall back to E.
- **sus2**: the 3rd moves *down* to the 2nd — C D G. Open, airy, neither happy nor sad.

“Sus” means *suspended* — the chord hangs in the air. Guitarists love them; you’ll hear them in The Who’s *Pinball Wizard*, Tom Petty’s *Free Fallin’* and all over modern pop and worship music.

Fun fact: **Csus2** (C D G) has the same notes as **Gsus4** (G C D). Same shape, different bass note!`,
          shapes: [
            { rh: 'C4:1 E4:3 G4:5', lh: 'C3:5', caption: 'C' },
            { rh: 'C4:1 F4:4 G4:5', lh: 'C3:5', caption: 'Csus4' },
            { rh: 'C4:1 D4:2 G4:5', lh: 'C3:5', caption: 'Csus2' },
            { rh: 'D4:1 E4:2 A4:5', lh: 'A2:5', caption: 'Asus4' },
          ],
          piece: {
            id: 'u8-sus',
            title: 'Suspended Shimmer',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 80,
            rh: bars(
              '{Csus4} [C4 F4 G4]/h:145 {C} [C4 E4 G4]/h:135',
              '{Csus2} [C4 D4 G4]/h:125 {C} [C4 E4 G4]/h:135',
              '{Gsus4} [C4 D4 G4]/h:125 {G} [B3 D4 G4]/h:125',
              '{Asus4} [D4 E4 A4]/h:125 {Am} [C4 E4 A4]/h:125',
              '{Fsus2} [C4 F4 G4]/h:145 {F} [C4 F4 A4]/h:135',
              '{Csus4} [C4 F4 G4]/h:145 {C} [C4 E4 G4]/h:135',
              '{Gsus4} [C4 D4 G4]/h:125 {G} [B3 D4 G4]/h:125',
              '{Csus2} [C4 D4 G4]/w:125',
            ),
            lh: bars('C3/w', 'C3/w', 'G2/w', 'A2/w', 'F2/w', 'C3/w', 'G2/w', '[C2 C3]/w'),
          },
          tasks: ['Play C → Csus4 → C and listen to the tension and release', 'Right hand alone at 70 bpm', 'Hands together at 80 bpm'],
        },
      ],
    },
    {
      id: 'u8-l2',
      title: 'Sevenths & add9',
      summary: 'Major 7, minor 7, dominant 7 and add9 — four new colours.',
      minutes: 20,
      steps: [
        {
          title: 'Adding a fourth note',
          text: `Stack one more note on top of a triad and you get a **seventh chord**:

- **Cmaj7** (C E G **B**): dreamy, soft — soul, jazz, chill pop.
- **Am7** (A C E **G**): mellow minor — warmer than plain Am.
- **Dm7** (D F A **C**): smooth and gentle.
- **G7** (G B D **F**): the bluesy “dominant” — wants to go home to C.

And **add9** adds the 9th (the 2nd, an octave up) *without* the 7th: **Cadd9** (C E G **D**). Sparkly and modern — a favourite of pop pianists and acoustic guitarists.

Compare each triad with its colourful version:`,
          piece: {
            id: 'u8-colours',
            title: 'Chord Colours',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars(
              '{C} [C4 E4 G4]/h {Cmaj7} [C4 E4 G4 B4]/h',
              '{Am} [C4 E4 A4]/h {Am7} [C4 E4 G4 A4]/h',
              '{Dm} [D4 F4 A4]/h {Dm7} [C4 D4 F4 A4]/h',
              '{G} [B3 D4 G4]/h {G7} [B3 D4 F4 G4]/h',
              '{C} [C4 E4 G4]/h {Cadd9} [C4 D4 E4 G4]/h',
              '{Cmaj7} [C4 E4 G4 B4]/w',
            ),
            lh: bars('C3/w', 'A2/w', 'D3/w', 'G2/w', 'C3/w', '[C2 C3]/w'),
          },
          tasks: ['Play each pair and describe the colour in one word', 'Hands together at 72 bpm', 'Find Fmaj7 (F A C E) and Em7 (E G B D) yourself'],
        },
      ],
    },
    {
      id: 'u8-l3',
      title: 'The ii – V – I',
      summary: 'Dm7 – G7 – Cmaj7: the smoothest progression in music.',
      minutes: 20,
      steps: [
        {
          title: 'Two fingers move',
          text: `**ii – V – I** (Dm7 – G7 – Cmaj7 in C) is the backbone of jazz, soul, R&B and plenty of sophisticated pop. It sounds expensive — and with the right voicings it’s *easy*.

Watch the right hand: from **Dm7** (F A C) to **G7** (F G B), only two notes move, by a step. From **G7** to **Cmaj7** (E G B), only the F moves down to E. The hand hardly moves at all!

This is called **voice leading** — every note takes the shortest path. The left hand plays the roots: **D – G – C**.`,
          piece: {
            id: 'u8-251',
            title: 'Two-Five-One',
            style: 'Soul',
            key: 'C',
            time: [4, 4],
            tempo: 76,
            rh: bars(
              `{Dm7} ${Dm7}/w:135`,
              `{G7} ${G7}/w:125`,
              `{Cmaj7} ${Cmaj7}/w:135`,
              `${Cmaj7}/w:135`,
              `{Dm7} ${Dm7}/h:135 ${Dm7}/h:135`,
              `{G7} ${G7}/h:125 ${G7}/h:125`,
              `{Cmaj7} ${Cmaj7}/w:135`,
              `${Cmaj7}/w:135`,
            ),
            lh: bars('D3/w', 'G2/w', 'C3/w', 'C3/w', 'D3/h D3/h', 'G2/h G2/h', 'C3/w', '[C2 C3]/w'),
          },
          tasks: ['Right hand alone — notice which fingers move', 'Hands together at 76 bpm', 'Transpose it: Gm7 – C7 – Fmaj7 (bonus!)'],
        },
      ],
    },
    {
      id: 'u8-l4',
      title: 'Song: Late Night Drive',
      summary: 'An original neo-soul groove with seventh chords and left-hand shells.',
      minutes: 30,
      steps: [
        {
          title: 'Shells and colours',
          text: `**Late Night Drive** loops **Cmaj7 – Am7 – Dm7 – G7** — a smooth, late-night soul sound.

New left-hand technique: **shells**. Instead of a single root, play the **root and 7th** together — a wide, rich sound that leaves room for the right hand:

- Cmaj7: C + B
- Am7: A + G
- Dm7: D + C
- G7: G + F

Bars 1–4: right-hand chords with an early push on the “& of 2”. Bars 5–9: a melody that lands on the chords’ colour notes (7ths and 9ths).

> Play it laid-back: lean slightly *behind* the beat and keep the touch soft.`,
          piece: {
            id: 'u8-latenight',
            title: 'Late Night Drive',
            composer: 'Piano Teacher original',
            style: 'Soul',
            key: 'C',
            time: [4, 4],
            tempo: 80,
            rh: bars(
              neoPush(Cmaj7, 'Cmaj7'),
              neoPush(Am7, 'Am7'),
              neoPush(Dm7, 'Dm7'),
              neoPush(G7, 'G7'),
              '{Cmaj7} E5/q.:5 D5/8:4 B4/h:2',
              '{Am7} C5/q.:3 B4/8:2 G4/h:1',
              '{Dm7} A4/q.:1 C5/8:2 F5/q:5 E5/q:4',
              '{G7} D5/h.:3 r/q',
              `{Cmaj7} ${Cmaj7}/w:135`,
            ),
            lh: bars('[C3 B3]/w:51', '[A2 G3]/w:51', '[D3 C4]/w:51', '[G2 F3]/w:51', '[C3 B3]/w', '[A2 G3]/w', '[D3 C4]/w', '[G2 F3]/w', '[C2 C3]/w'),
          },
          tasks: ['Left-hand shells alone', 'Bars 1–4 hands together at 70 bpm', 'Bars 5–9 hands together at 70 bpm', 'Whole song at 80 bpm, laid-back'],
        },
      ],
    },
  ],
};
