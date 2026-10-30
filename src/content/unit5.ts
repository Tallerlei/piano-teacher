import { bars } from './helpers';
import type { Unit } from './types';

const C = '[C4 E4 G4]';
const G = '[B3 D4 G4]';
const Am = '[C4 E4 A4]';
const F = '[C4 F4 A4]';

/** backbeat: chord on beats 2 and 4 */
const backbeat = (chord: string, name: string) => `{${name}} r/q ${chord}/q r/q ${chord}/q`;
/** a 50s-style bass line: root (long-short), third, fifth */
const fiftiesBass = (r: string, t: string, f: string) => `${r}/q. ${r}/8 ${t}/q ${f}/q`;

export const unit5: Unit = {
  id: 'u5',
  title: 'Inversions & Smooth Moves',
  subtitle: 'Turn chords upside down, play them in any order and make them glide',
  icon: '🔄',
  lessons: [
    {
      id: 'u5-l1',
      title: 'Turning chords upside down',
      summary: 'Root position, 1st and 2nd inversion — the same chord, three shapes.',
      minutes: 20,
      steps: [
        {
          title: 'Three shapes of C',
          text: `You’ve already used a few “upside-down” chords to move smoothly. Now let’s make it official.

A chord is still the same chord whatever order its notes are in:

- **Root position**: root at the bottom — C E G
- **1st inversion**: move the root to the top — E G C
- **2nd inversion**: move the next note up too — G C E

Fingering: root position and 2nd inversion use **1 3 5**. The 1st inversion feels better with **1 2 5** (the gap is at the top).

> Spot the gap! In every inversion there are two notes next to each other (a 4th apart) — that’s where the root is: the **upper note of the gap**.`,
          shapes: [
            { rh: 'C4:1 E4:3 G4:5', caption: 'C root position' },
            { rh: 'E4:1 G4:2 C5:5', caption: 'C 1st inversion' },
            { rh: 'G4:1 C5:3 E5:5', caption: 'C 2nd inversion' },
          ],
          tasks: ['Play the three shapes up and down, saying their names', 'Find the three shapes of F', 'Find the three shapes of G'],
        },
        {
          title: 'Inversion climb',
          text: `Climb up through the inversions and back down — for C, F and G. Keep the hand loose and let the arm carry it along the keyboard; the fingers keep their shape.`,
          piece: {
            id: 'u5-climb',
            title: 'Inversion Climb',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 80,
            rh: bars(
              '{C} [C4 E4 G4]/q:135 [E4 G4 C5]/q:125 [G4 C5 E5]/q:135 [C5 E5 G5]/q:135',
              '[G4 C5 E5]/q:135 [E4 G4 C5]/q:125 [C4 E4 G4]/h:135',
              '{F} [F3 A3 C4]/q:135 [A3 C4 F4]/q:125 [C4 F4 A4]/q:135 [F4 A4 C5]/q:135',
              '[C4 F4 A4]/q:135 [A3 C4 F4]/q:125 [F3 A3 C4]/h:135',
              '{G} [G3 B3 D4]/q:135 [B3 D4 G4]/q:125 [D4 G4 B4]/q:135 [G4 B4 D5]/q:135',
              '[D4 G4 B4]/q:135 [B3 D4 G4]/q:125 [G3 B3 D4]/h:135',
              '{C} [C4 E4 G4]/w:135',
            ),
            lh: bars('C3/w', 'C3/w', 'F2/w', 'F2/w', 'G2/w', 'G2/w', '[C2 C3]/w'),
          },
          tasks: ['Right hand alone at 60 bpm', 'Hands together at 80 bpm', 'Close your eyes for the C climb'],
        },
      ],
    },
    {
      id: 'u5-l2',
      title: 'Same chords, different order',
      summary: 'I – vi – IV – V, the 50s progression, and the backbeat.',
      minutes: 20,
      steps: [
        {
          title: 'Roman numerals',
          text: `Musicians number chords by their position in the key. In C major:

| I | ii | iii | IV | V | vi |
|---|---|---|---|---|---|
| C | Dm | Em | F | G | Am |

Capitals are major, lower case minor. So far you’ve met two famous orders of the same four chords:

- **I – V – vi – IV** (C G Am F): the “four-chord song” sound
- **vi – IV – I – V** (Am F C G): the moodier version

Now meet **I – vi – IV – V** (C Am F G) — the **50s progression**. It’s the backbone of *Stand By Me*, *Every Breath You Take* and countless doo-wop and soul classics.

The right hand plays on the **backbeat** (beats 2 and 4, where the snare drum hits) while the left hand plays a bouncy bass line.`,
          piece: {
            id: 'u5-fifties',
            title: 'Fifties Night',
            style: 'Soul',
            key: 'C',
            time: [4, 4],
            tempo: 100,
            rh: bars(backbeat(C, 'C'), backbeat(Am, 'Am'), backbeat(F, 'F'), backbeat(G, 'G'), backbeat(C, 'C'), backbeat(Am, 'Am'), backbeat(F, 'F'), backbeat(G, 'G'), `{C} ${C}/w`),
            lh: bars(
              'C3/q.:5 C3/8:5 E3/q:3 G3/q:1',
              fiftiesBass('A2', 'C3', 'E3'),
              fiftiesBass('F2', 'A2', 'C3'),
              fiftiesBass('G2', 'B2', 'D3'),
              fiftiesBass('C3', 'E3', 'G3'),
              fiftiesBass('A2', 'C3', 'E3'),
              fiftiesBass('F2', 'A2', 'C3'),
              fiftiesBass('G2', 'B2', 'D3'),
              '[C2 C3]/w',
            ),
          },
          tasks: ['Left hand alone at 80 bpm', 'Clap on 2 and 4 while the app plays', 'Hands together at 80 bpm', 'Hands together at 100 bpm'],
        },
      ],
    },
    {
      id: 'u5-l3',
      title: 'Slash chords & the falling bass',
      summary: 'C/E, G/B and a bass line that walks down step by step.',
      minutes: 20,
      steps: [
        {
          title: 'What does G/B mean?',
          text: `A **slash chord** tells you which note goes in the bass: **G/B** means “play a G chord, with **B** as the lowest note”. It’s just an inversion with the bass note named!

Slash chords are used to make the **bass line move by step**. Listen to this famous descending pattern:

**C – G/B – Am – Am/G – F – C/E – Dm – G**

The bass walks down **C – B – A – G – F – E – D**, while the right hand barely moves. This falling-bass sound runs from Bach to Procol Harum’s *A Whiter Shade of Pale* and through countless pop ballads.`,
          piece: {
            id: 'u5-falling',
            title: 'Falling Bass',
            style: 'Ballad',
            key: 'C',
            time: [4, 4],
            tempo: 76,
            rh: bars(
              `{C} ${C}/h:135 {G/B} ${G}/h:125`,
              `{Am} ${Am}/h:125 {Am/G} ${Am}/h:125`,
              `{F} ${F}/h:135 {C/E} ${C}/h:135`,
              `{Dm} [D4 F4 A4]/h:135 {G} ${G}/h:125`,
              `{C} ${C}/h {G/B} ${G}/h`,
              `{Am} ${Am}/h {Am/G} ${Am}/h`,
              `{F} ${F}/h {C/E} ${C}/h`,
              `{Dm} [D4 F4 A4]/h {G7} [B3 D4 F4]/h`,
              `{C} ${C}/w`,
            ),
            lh: bars('C3/h B2/h', 'A2/h G2/h', 'F2/h E2/h', 'D2/h G2/h', 'C3/h B2/h', 'A2/h G2/h', 'F2/h E2/h', 'D2/h G2/h', '[C2 C3]/w'),
          },
          tasks: ['Left hand alone — sing the falling bass', 'Hands together at 60 bpm', 'Hands together at 76 bpm', 'Add the sustain pedal, changing with every chord'],
        },
      ],
    },
    {
      id: 'u5-l4',
      title: 'Song: Paper Boats',
      summary: 'Melody on top: choose the inversion that puts the tune in your little finger.',
      minutes: 25,
      steps: [
        {
          title: 'Melody on top',
          text: `Here’s an intermediate secret: when you play chords and melody in the right hand together, choose the **inversion that puts the melody note on top**. Your little finger sings, the other fingers fill in the harmony.

**Paper Boats** uses the vi – IV – I – V order. Watch how the chord shape changes even when the chord name doesn’t — that’s the melody choosing its inversion.

Between chords, single melody notes fill the gaps. Play them gently, connecting to the next chord.

> Make the top note sing: put a little more weight on the little finger than on the other two.`,
          piece: {
            id: 'u5-paper',
            title: 'Paper Boats',
            composer: 'Piano Teacher original',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 80,
            rh: bars(
              '{Am} [C4 E4 A4]/q.:124 B4/8:5 [E4 A4 C5]/h:125',
              '{F} [A3 C4 F4]/q.:124 G4/8:5 [C4 F4 A4]/h:125',
              '{C} [E4 G4 C5]/q.:125 B4/8:4 [C4 E4 G4]/h:135',
              '{G} [B3 D4 G4]/h:125 [D4 G4 B4]/h:135',
              '{Am} [E4 A4 C5]/q.:125 B4/8:4 [C4 E4 A4]/h:125',
              '{F} [C4 F4 A4]/q.:125 G4/8:4 [A3 C4 F4]/h:125',
              '{C} [G3 C4 E4]/q.:135 F4/8:5 {G} [B3 D4 G4]/h:125',
              '{C} [E4 G4 C5]/w:125',
            ),
            lh: bars('A2/h E3/h', 'F2/h C3/h', 'C3/h G3/h', 'G2/h D3/h', 'A2/h E3/h', 'F2/h C3/h', 'C3/h G2/h', '[C2 C3]/w'),
          },
          tasks: ['Play only the top notes — that’s the melody', 'Right hand alone at 60 bpm', 'Hands together at 60 bpm', 'Hands together at 80 bpm, melody singing'],
        },
      ],
    },
  ],
};
