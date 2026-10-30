import { bars, rep } from './helpers';
import type { Unit } from './types';

// smooth 3-note seventh-chord voicings around middle C
const C7 = '[Bb3 C4 E4]';
const F7 = '[A3 C4 Eb4]';
const G7 = '[B3 D4 F4]';
const CHORD = { C7, F7, G7 };
type Ch = keyof typeof CHORD;

const TWELVE: Ch[] = ['C7', 'C7', 'C7', 'C7', 'F7', 'F7', 'C7', 'C7', 'G7', 'F7', 'C7', 'G7'];

/** boogie dyads: root + 5th, 6th, flat 7th, 6th */
const BOOGIE: Record<Ch, [string, string, string, string, string]> = {
  C7: ['C3', 'G3', 'A3', 'Bb3', 'A3'],
  F7: ['F2', 'C3', 'D3', 'Eb3', 'D3'],
  G7: ['G2', 'D3', 'E3', 'F3', 'E3'],
};
const boogieQ = (c: Ch) => {
  const [r, ...top] = BOOGIE[c];
  return top.map((t) => `[${r} ${t}]/q`).join(' ');
};
const boogie8 = (c: Ch) => {
  const [r, ...top] = BOOGIE[c];
  return top.map((t) => `[${r} ${t}]/8 [${r} ${t}]/8`).join(' ');
};

/** walking boogie bass: 1 3 5 6 b7 6 5 3 */
const WALK: Record<Ch, string> = {
  C7: 'C3/8 E3 G3 A3 Bb3 A3 G3 E3',
  F7: 'F2/8 A2 C3 D3 Eb3 D3 C3 A2',
  G7: 'G2/8 B2 D3 E3 F3 E3 D3 B2',
};

export const unit7: Unit = {
  id: 'u7',
  title: 'Blues & Rock ’n’ Roll',
  subtitle: 'The 12-bar blues, swing feel, boogie bass and blues licks',
  icon: '🎷',
  lessons: [
    {
      id: 'u7-l1',
      title: 'The 12-bar blues',
      summary: 'The chord pattern behind blues, rock ’n’ roll and a huge chunk of rock.',
      minutes: 20,
      steps: [
        {
          title: 'Twelve bars, three chords',
          text: `The **12-bar blues** is the most important pattern in rock history — from Chuck Berry and Elvis to AC/DC and the White Stripes. It uses three chords, **I – IV – V**, in a fixed order:

| 1–4 | 5–6 | 7–8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|
| C7 | F7 | C7 | G7 | F7 | C7 | G7 |

In the blues every chord is a **dominant 7th** (a major chord plus the flat 7th). Our right-hand shapes keep the three most important notes and barely move:

- **C7**: B♭ – C – E
- **F7**: A – C – E♭
- **G7**: B – D – F

Bar 12 (G7) is the **turnaround**: it sends you back to the top. When you finish, end on C7.`,
          shapes: [
            { rh: 'Bb3:1 C4:2 E4:4', lh: 'C3:5', caption: 'C7' },
            { rh: 'A3:1 C4:2 Eb4:4', lh: 'F2:5', caption: 'F7' },
            { rh: 'B3:1 D4:2 F4:4', lh: 'G2:5', caption: 'G7' },
          ],
          piece: {
            id: 'u7-twelve',
            title: '12-Bar Blues in C',
            style: 'Blues',
            key: 'C',
            time: [4, 4],
            tempo: 96,
            measuresPerLine: 4,
            rh: bars(...TWELVE.map((c, i) => `${i === 0 || c !== TWELVE[i - 1] ? `{${c}} ` : ''}${CHORD[c]}/h ${CHORD[c]}/h`)),
            lh: bars(...TWELVE.map((c) => rep(`${BOOGIE[c][0]}/q`, 4))),
          },
          tasks: ['Say the chord names out loud while the app plays', 'Hands together at 80 bpm', 'Play it twice through without stopping', 'Try it from memory'],
        },
      ],
    },
    {
      id: 'u7-l2',
      title: 'Swing & the boogie left hand',
      summary: 'Long-short swung eighths and the 5–6–♭7–6 boogie pattern.',
      minutes: 25,
      steps: [
        {
          title: 'The boogie engine',
          text: `Here’s the left-hand pattern that powers boogie-woogie and early rock ’n’ roll. Keep finger **5** on the **root** and move the top note **5th – 6th – ♭7th – 6th** with fingers **2 – 1 – 1 – 1**: the thumb hops from the 6th up to the ♭7th and back. Stay relaxed and keep the root steady.

Start in quarter notes on C. Then try F and G — the shape is identical.`,
          piece: {
            id: 'u7-boogie-q',
            title: 'Boogie Engine',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 100,
            lh: bars(
              '[C3 G3]/q:52 [C3 A3]/q:51 [C3 Bb3]/q:51 [C3 A3]/q:51',
              boogieQ('C7'),
              boogieQ('F7'),
              boogieQ('F7'),
              boogieQ('G7'),
              boogieQ('F7'),
              boogieQ('C7'),
              boogieQ('C7'),
            ),
          },
          tasks: ['C pattern until it feels automatic', 'Switch C → F → C', 'Play the 8 bars at 100 bpm'],
        },
        {
          title: 'Swing it!',
          text: `Blues and rock ’n’ roll are played with a **swing** (or **shuffle**) feel: pairs of eighth notes are played **long – short**, like “**doo**-ba **doo**-ba” or “**Hump**-ty **Dump**-ty”.

The music is still *written* as normal eighth notes — the swing is a style instruction. The app plays this piece swung, so listen first.

Now the boogie left hand plays **swung eighths** (each dyad twice) through the whole 12-bar blues, and the right hand stabs chords on beats **2 and 4**.`,
          piece: {
            id: 'u7-boogie-12',
            title: 'Boogie Blues',
            style: 'Blues',
            key: 'C',
            time: [4, 4],
            tempo: 100,
            swing: true,
            measuresPerLine: 4,
            rh: bars(...TWELVE.map((c, i) => `${i === 0 || c !== TWELVE[i - 1] ? `{${c}} ` : ''}r/q ${CHORD[c]}/q r/q ${CHORD[c]}/q`)),
            lh: bars(...TWELVE.map((c) => boogie8(c))),
          },
          tasks: ['Left hand alone at 80 bpm, swung', 'Hands together at 80 bpm', 'Hands together at 100 bpm', 'Twice through, ending on C7'],
        },
      ],
    },
    {
      id: 'u7-l3',
      title: 'The blues scale & licks',
      summary: 'Six notes that instantly sound like the blues.',
      minutes: 25,
      steps: [
        {
          title: 'C blues scale',
          text: `The **blues scale** in C: **C – E♭ – F – F♯ – G – B♭ – C**. That F♯ is the famous “blue note”.

Fingering (right hand): **1 2 3 4** on C – E♭ – F – F♯, thumb under to G, then **2 3** on B♭ and C. Coming down, reverse it.

The great thing: over a 12-bar blues in C, *every* note of this scale sounds good over *every* chord. It’s your improvisation playground.

> A classic blues move: play **E♭ and slide into E** — a “crushed” note, like a guitarist bending a string.`,
          piece: {
            id: 'u7-blues-scale',
            title: 'C Blues Scale',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 90,
            swing: true,
            rh: bars('C4/8:1 Eb4:2 F4:3 F#4:4 G4:1 Bb4:2 C5:3 r/8', 'C5/8:3 Bb4:2 G4:1 F#4:4 F4:3 Eb4:2 C4/q:1'),
            lh: bars('C3/w', 'C3/w'),
          },
          tasks: ['Up and down slowly, straight', 'Up and down swung at 90 bpm', 'Make up your own lick with these notes'],
        },
        {
          title: 'Call and response',
          text: `Blues is a conversation: a short phrase (the **call**), then space or an answer (the **response**). These licks all use the blues scale. The left hand keeps the boogie going in quarter notes.

Listen for the **E♭ → E** crushed-note lick in bars 1, 7 and 11 — it’s one of the most-used sounds in blues and rock ’n’ roll piano.`,
          piece: {
            id: 'u7-licks',
            title: 'Blues Licks',
            style: 'Blues',
            key: 'C',
            time: [4, 4],
            tempo: 96,
            swing: true,
            measuresPerLine: 4,
            rh: bars(
              '{C7} G4/8:1 Bb4:2 C5:3 Eb5:4 E5/q:5 C5/q:3',
              'r/h r/8 G4/8:1 Bb4:2 C5:3',
              'Eb5/8:4 E5/q.:5 C5/h:3',
              'r/h G4/8:1 A4:2 Bb4:3 B4:4',
              '{F7} C5/q.:2 A4/8:1 C5/q:2 Eb5/q:4',
              'C5/h:2 r/h',
              '{C7} G4/8:1 Bb4:2 C5:3 Eb5:4 E5/q:5 C5/q:3',
              'r/h r/8 G4/8:1 A4:2 B4:3',
              '{G7} D5/q.:4 B4/8:3 D5/q:4 F5/q:5',
              '{F7} Eb5/8:4 C5/q.:2 A4/h:1',
              '{C7} G4/8:1 Bb4:2 C5:3 Eb5:4 E5/q:5 C5/q:3',
              '{G7} r/h G4/8:1 A4:2 Bb4:3 B4:4',
            ),
            lh: bars(...TWELVE.map((c) => boogieQ(c))),
          },
          tasks: ['Right hand alone, one lick at a time', 'Hands together at 72 bpm', 'Hands together at 96 bpm', 'Replace one lick with your own'],
        },
      ],
    },
    {
      id: 'u7-l4',
      title: 'Song: Saturday Strut',
      summary: 'An original rock ’n’ roll stomper with a walking boogie bass.',
      minutes: 30,
      steps: [
        {
          title: 'Rock ’n’ roll!',
          text: `**Saturday Strut** is an original 12-bar rock ’n’ roll tune, in the style of 1950s piano pounders.

- **Left hand**: the **walking boogie bass** — 1 3 5 6 ♭7 6 5 3 — swung eighth notes. It’s the most famous left hand in rock ’n’ roll. Practise it alone a lot!
- **Right hand**: a rocking **6th riff** (the top note rocks between the 5th and 6th of the chord), plus the crushed-note lick.
- Bar 12 is a **stop** — everyone hits the G7 and waits — then the big ending.

> Rock ’n’ roll piano needs energy, but stay loose: tension is the enemy of speed.`,
          piece: {
            id: 'u7-strut',
            title: 'Saturday Strut',
            composer: 'Piano Teacher original',
            style: 'Rock',
            key: 'C',
            time: [4, 4],
            tempo: 132,
            swing: true,
            measuresPerLine: 4,
            rh: bars(
              '{C7} [E4 G4]/8:13 [E4 A4]:14 [E4 G4]:13 [E4 A4]:14 [E4 G4]/q:13 r/q',
              '[E4 G4]/8:13 [E4 A4]:14 [E4 G4]:13 [E4 A4]:14 [E4 Bb4]/q:15 [E4 A4]/q:14',
              '[E4 G4]/8:13 [E4 A4]:14 [E4 G4]:13 [E4 A4]:14 [E4 G4]/q:13 r/q',
              'G4/8:1 Bb4:2 C5:3 Eb5:4 E5/q:5 r/q',
              '{F7} [A4 C5]/8:13 [A4 D5]:14 [A4 C5]:13 [A4 D5]:14 [A4 C5]/q:13 r/q',
              '[A4 C5]/8:13 [A4 D5]:14 [A4 C5]:13 [A4 D5]:14 [A4 Eb5]/q:15 [A4 D5]/q:14',
              '{C7} [E4 G4]/8:13 [E4 A4]:14 [E4 G4]:13 [E4 A4]:14 [E4 G4]/q:13 r/q',
              'G4/8:1 Bb4:2 C5:3 Eb5:4 E5/q:5 r/q',
              '{G7} [B4 D5]/8:13 [B4 E5]:14 [B4 D5]:13 [B4 E5]:14 [B4 F5]/q:15 [B4 D5]/q:13',
              '{F7} [A4 C5]/8:13 [A4 D5]:14 [A4 C5]:13 [A4 D5]:14 [A4 Eb5]/q:15 [A4 C5]/q:13',
              '{C7} [E4 G4]/8:13 [E4 A4]:14 [E4 G4]:13 [E4 A4]:14 [E4 G4]/q:13 r/q',
              `{G7} ${G7}/q r/q r/h`,
              '{C7} G4/8:1 Bb4:2 C5:3 Eb5:4 E5/8:5 [E5 G5 C6]/q.:135',
            ),
            lh: bars(...TWELVE.slice(0, 11).map((c) => WALK[c]), 'G2/q r/q r/h', 'C3/8 E3 G3 A3 Bb3 [C2 C3]/q.'),
          },
          tasks: ['Walking bass alone at 90 bpm — until it’s automatic', 'Right hand alone at 90 bpm', 'Hands together at 90 bpm', 'Hands together at 132 bpm — strut!'],
        },
      ],
    },
  ],
};
