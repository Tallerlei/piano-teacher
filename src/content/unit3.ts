import { bars, rep } from './helpers';
import type { Unit } from './types';

// smooth shapes
const C = '[C4 E4 G4]';
const G = '[B3 D4 G4]';
const Am = '[C4 E4 A4]';
const F = '[C4 F4 A4]';
// low voicings for vi – IV – I – V
const Am2 = '[A3 C4 E4]';
const F2 = '[A3 C4 F4]';
const C2 = '[G3 C4 E4]';
const G2 = '[G3 B3 D4]';

const threeThreeTwo = (chord: string, name: string) => `{${name}} ${chord}/q. ${chord}/q. ${chord}/q`;
const eighths = (note: string) => rep(`${note}/8`, 8);

/** half, dotted quarter, then the next chord pushed in early on the "and" of 4 and tied over */
const pushBar = (chord: string, next: string, nextName: string) => `${chord}/h ${chord}/q. {${nextName}} ${next}/8~`;

export const unit3: Unit = {
  id: 'u3',
  title: 'Rhythm Is Everything',
  subtitle: 'Eighth notes, syncopation and the grooves of pop and rock',
  icon: '🥁',
  lessons: [
    {
      id: 'u3-l1',
      title: 'Eighth notes & the rock pulse',
      summary: 'Counting “1 & 2 &” and driving eighth notes.',
      minutes: 20,
      steps: [
        {
          title: 'Split the beat',
          text: `An **eighth note** is half a beat. Two eighths fill one beat and are often joined by a **beam**.

Count them: “**1 & 2 & 3 & 4 &**”. The numbers are on the beat, the “&”s are in between.

In rock and pop, the left hand often plays **steady eighth notes on the root** — that’s the engine of the band. The right hand plays chords on the beat on top.

Keep the eighths *even* and *light* — use a small wrist bounce instead of pushing from the arm.`,
          piece: {
            id: 'u3-drive',
            title: 'Eighth-Note Drive',
            style: 'Rock',
            key: 'C',
            time: [4, 4],
            tempo: 100,
            rh: bars(`{C} ${rep(`${C}/q`, 4)}`, `{G} ${rep(`${G}/q`, 4)}`, `{Am} ${rep(`${Am}/q`, 4)}`, `{F} ${rep(`${F}/q`, 4)}`, `{C} ${rep(`${C}/q`, 4)}`, `{G} ${rep(`${G}/q`, 4)}`, `{Am} ${rep(`${Am}/q`, 4)}`, `{F} ${F}/q ${F}/q ${F}/h`),
            lh: bars(eighths('C3'), eighths('G2'), eighths('A2'), eighths('F2'), eighths('C3'), eighths('G2'), eighths('A2'), eighths('F2')),
          },
          tasks: ['Left hand alone, counting “1 & 2 &” aloud', 'Hands together at 70 bpm', 'Hands together at 100 bpm'],
        },
        {
          title: 'Swap the jobs',
          text: `Now the **right hand** plays the eighth notes (as chords) and the left hand holds long roots. This is the pulsing chord sound behind many piano-driven pop and rock songs.

Tip: play the chord on each beat (1, 2, 3, 4) slightly stronger than the “&”s. That little accent makes it groove instead of sounding mechanical.`,
          piece: {
            id: 'u3-pulse8',
            title: 'Eighth-Note Chords',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 96,
            rh: bars(`{C} ${rep(`${C}/8`, 8)}`, `{G} ${rep(`${G}/8`, 8)}`, `{Am} ${rep(`${Am}/8`, 8)}`, `{F} ${rep(`${F}/8`, 8)}`),
            lh: bars('C3/w', 'G2/w', 'A2/w', 'F2/w'),
          },
          tasks: ['Play with accents on the beats', 'Loop it 4 times without stopping', 'Try 110 bpm'],
        },
      ],
    },
    {
      id: 'u3-l2',
      title: 'The push: syncopation',
      summary: 'Arrive early! Anticipated chords and ties — the secret of a modern pop feel.',
      minutes: 20,
      steps: [
        {
          title: 'Arriving early',
          text: `**Syncopation** means accenting notes *between* the beats. The most common pop trick is the **push** (or anticipation): the next chord arrives an eighth note *early*, on the “**& of 4**”, and is **tied** over the bar line.

A **tie** (the curved line) joins two notes of the same pitch: play the first, *hold* through the second — don’t play it again.

Count carefully: “1 2 3 **&** (hold) 2 3 **&** …”. This version uses the **vi – IV – I – V** order (Am – F – C – G) — the same four chords, starting on the minor one. Hear how it suddenly sounds more emotional?`,
          piece: {
            id: 'u3-push',
            title: 'Pushing Forward',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 88,
            rh: bars(
              `{Am} ${pushBar(Am2, F2, 'F')}`,
              pushBar(F2, C2, 'C'),
              pushBar(C2, G2, 'G'),
              pushBar(G2, Am2, 'Am'),
              pushBar(Am2, F2, 'F'),
              pushBar(F2, C2, 'C'),
              pushBar(C2, G2, 'G'),
              pushBar(G2, C2, 'C'),
              `${C2}/w`,
            ),
            lh: bars('A2/h A2/q. F2/8~', 'F2/h F2/q. C3/8~', 'C3/h C3/q. G2/8~', 'G2/h G2/q. A2/8~', 'A2/h A2/q. F2/8~', 'F2/h F2/q. C3/8~', 'C3/h C3/q. G2/8~', 'G2/h G2/q. C3/8~', 'C3/w'),
          },
          tasks: ['Clap the rhythm while counting', 'Right hand alone at 70 bpm', 'Hands together at 88 bpm'],
        },
      ],
    },
    {
      id: 'u3-l3',
      title: 'The 3-3-2 groove',
      summary: 'The rhythm hiding in countless modern hits.',
      minutes: 20,
      steps: [
        {
          title: 'Count to eight',
          text: `Count eight eighth notes per bar and accent the **1st, 4th and 7th**:

“**1** 2 3 **4** 5 6 **7** 8”

That’s a **3 + 3 + 2** grouping (also called the *tresillo*). It comes from Latin and Afro-Cuban music and is everywhere in modern pop, R&B and dance music.

As chords: **dotted quarter, dotted quarter, quarter**. Both hands play together here.`,
          piece: {
            id: 'u3-332',
            title: '3-3-2 Chords',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 96,
            rh: bars(threeThreeTwo(Am2, 'Am'), threeThreeTwo(F2, 'F'), threeThreeTwo(C2, 'C'), threeThreeTwo(G2, 'G'), threeThreeTwo(Am2, 'Am'), threeThreeTwo(F2, 'F'), threeThreeTwo(C2, 'C'), threeThreeTwo(G2, 'G')),
            lh: bars('A2/q. A2/q. A2/q', 'F2/q. F2/q. F2/q', 'C3/q. C3/q. C3/q', 'G2/q. G2/q. G2/q', 'A2/q. A2/q. A2/q', 'F2/q. F2/q. F2/q', 'C3/q. C3/q. C3/q', 'G2/q. G2/q. G2/q'),
          },
          tasks: ['Count “1 2 3 4 5 6 7 8” and clap on 1, 4, 7', 'Hands together at 80 bpm', 'Hands together at 96 bpm'],
        },
        {
          title: 'Broken 3-3-2',
          text: `Now break the chord into single notes in groups of **3 + 3 + 2**. This rolling, hypnotic pattern is a favourite of piano-driven bands (Coldplay’s *Clocks* is built on a similar 3-3-2 arpeggio).

Right hand: play the chord notes upwards, starting again on beats 1, “2&” and 4. Left hand: hold the root.`,
          piece: {
            id: 'u3-332-broken',
            title: 'Clockwork Arpeggio',
            composer: 'Piano Teacher original',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 110,
            rh: bars(
              '{Am} A3/8:1 C4:2 E4:4 A3:1 C4:2 E4:4 A3:1 C4:2',
              '{F} A3/8:1 C4:2 F4:5 A3:1 C4:2 F4:5 A3:1 C4:2',
              '{C} G3/8:1 C4:2 E4:4 G3:1 C4:2 E4:4 G3:1 C4:2',
              '{G} G3/8:1 B3:2 D4:4 G3:1 B3:2 D4:4 G3:1 B3:2',
            ),
            lh: bars('A2/w', 'F2/w', 'C3/w', 'G2/w'),
          },
          tasks: ['Right hand alone, accenting 1, 4, 7', 'Hands together at 80 bpm', 'Loop at 110 bpm'],
        },
      ],
    },
    {
      id: 'u3-l4',
      title: 'Song: Highway Lights',
      summary: 'An original rock song combining driving eighths, 3-3-2 and pushes.',
      minutes: 25,
      steps: [
        {
          title: 'Rock out',
          text: `**Highway Lights** is an original rock song using everything from this unit:

- **Verse** (bars 1–8): left hand drives eighth notes, right hand plays the 3-3-2 groove on vi – IV – I – V.
- **Chorus** (bars 9–16): the right hand switches to **pushes** — chords arriving early on the “& of 4”.

Practise the verse and chorus separately (tap a bar to select it, tap another to select a range). Start at around 80 bpm and work up to the full rock tempo.

> Rock piano should be confident! Firm fingers, a steady left hand, and don’t be afraid to play out.`,
          piece: {
            id: 'u3-highway',
            title: 'Highway Lights',
            composer: 'Piano Teacher original',
            style: 'Rock',
            key: 'Am',
            time: [4, 4],
            tempo: 126,
            rh: bars(
              threeThreeTwo(Am2, 'Am'), threeThreeTwo(F2, 'F'), threeThreeTwo(C2, 'C'), threeThreeTwo(G2, 'G'),
              threeThreeTwo(Am2, 'Am'), threeThreeTwo(F2, 'F'), threeThreeTwo(C2, 'C'), `{G} ${G2}/h ${G2}/q. {F} ${F}/8~`,
              pushBar(F, G, 'G'), pushBar(G, C, 'C'), pushBar(C, Am, 'Am'), `${Am}/h ${Am}/q. {F} ${F}/8~`,
              pushBar(F, G, 'G'), pushBar(G, C, 'C'), `${C}/h ${C}/q. ${C}/8~`, `${C}/w`,
            ),
            lh: bars(
              eighths('A2'), eighths('F2'), eighths('C3'), eighths('G2'),
              eighths('A2'), eighths('F2'), eighths('C3'), eighths('G2'),
              eighths('F2'), eighths('G2'), eighths('C3'), eighths('A2'),
              eighths('F2'), eighths('G2'), eighths('C3'), '[C2 C3]/w',
            ),
          },
          tasks: ['Verse (bars 1–8) hands together at 90 bpm', 'Chorus (bars 9–16) hands together at 90 bpm', 'Whole song at 110 bpm', 'Whole song at 126 bpm — rock star!'],
        },
      ],
    },
  ],
};
