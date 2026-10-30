import { bars, rep } from './helpers';
import type { Unit } from './types';

// smooth (voice-led) right-hand shapes for the "four chords" loop in C
const C = '[C4 E4 G4]';
const G = '[B3 D4 G4]';
const Am = '[C4 E4 A4]';
const F = '[C4 F4 A4]';

const sunriseMelody = bars(
  '{C} E4/q:2 G4:4 G4/q. A4/8:5',
  '{G} G4/h:4 D4/h:1',
  '{Am} C4/q:1 E4:3 E4/q. G4/8:5',
  '{F} A4/h G4/q F4/q',
  '{C} E4/q:1 G4:2 C5/q.:5 B4/8:4',
  '{G} B4/q A4 G4/h',
  '{Am} A4/q C5 B4 A4',
  '{F} A4/h. G4/q',
  '{C} G4/q E4 C4/h',
);

export const unit2: Unit = {
  id: 'u2',
  title: 'Your First Pop Chords',
  subtitle: 'Build chords and play the famous four-chord progression',
  icon: '🎸',
  lessons: [
    {
      id: 'u2-l1',
      title: 'Building chords',
      summary: 'Major and minor triads: the “skip a key” shape and the half-step formula.',
      minutes: 15,
      steps: [
        {
          title: 'What is a chord?',
          text: `A **chord** is three or more notes played together. The basic chord — a **triad** — is built by stacking every *other* white key: play a note, skip one, play, skip one, play.

From C: **C** (skip D) **E** (skip F) **G** → the **C major** chord.

The bottom note is the **root** and gives the chord its name. Use fingers **1 – 3 – 5** in the right hand.

Tap each chord to hear it. Notice how **major** chords sound bright and **minor** chords (the ones with an “m”) sound darker.`,
          shapes: [
            { rh: 'C4:1 E4:3 G4:5', caption: 'C major' },
            { rh: 'F4:1 A4:3 C5:5', caption: 'F major' },
            { rh: 'G4:1 B4:3 D5:5', caption: 'G major' },
            { rh: 'A4:1 C5:3 E5:5', caption: 'A minor (Am)' },
          ],
        },
        {
          title: 'Major vs. minor: the secret formula',
          text: `Count **half steps** (every key, black or white, is one half step):

- **Major** = root, up **4** half steps, up **3** more. (C → E → G)
- **Minor** = root, up **3** half steps, up **4** more. (A → C → E)

So the only difference is the **middle note** (the *third*). Play C major, then lower the E to E♭ — you just played **C minor**. Feel the mood change?

With this formula you can build *any* chord. Try D major: D, up 4 = F♯, up 3 = A. That black key is what makes it major!`,
          shapes: [
            { rh: 'C4:1 E4:3 G4:5', caption: 'C major (4 + 3)' },
            { rh: 'C4:1 Eb4:3 G4:5', caption: 'C minor (3 + 4)' },
            { rh: 'D4:1 F#4:3 A4:5', caption: 'D major' },
            { rh: 'D4:1 F4:3 A4:5', caption: 'D minor (Dm)' },
          ],
          tasks: ['Play C major, then C minor, five times', 'Build E major and E minor using the formula', 'Build A major (you’ll need a black key)'],
        },
        {
          title: 'Chord shapes in the key of C',
          text: `In the key of C, you can build a chord on every white key. Some come out major, some minor:

- **Major**: C, F, G
- **Minor**: Dm, Em, Am

These six chords power thousands of songs. Play through them with the right hand. Keep fingers **1-3-5**, move the whole hand as one unit, and try to land all three notes exactly together.`,
          piece: {
            id: 'u2-shapes',
            title: 'Chords of C Major',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars('{C} [C4 E4 G4]/w:135', '{F} [F4 A4 C5]/w:135', '{G} [G4 B4 D5]/w:135', '{C} [C4 E4 G4]/w:135', '{Am} [A4 C5 E5]/w:135', '{Dm} [D4 F4 A4]/w:135', '{Em} [E4 G4 B4]/w:135', '{Am} [A4 C5 E5]/w:135'),
          },
          tasks: ['Play each chord and say its name', 'Play the line with the metronome at 72 bpm', 'Close your eyes and find Am, F and G'],
        },
      ],
    },
    {
      id: 'u2-l2',
      title: 'The four chords of pop',
      summary: 'I – V – vi – IV: the progression behind countless hits.',
      minutes: 20,
      steps: [
        {
          title: 'One progression, a thousand songs',
          text: `Here’s a pop secret: a huge number of hits use the same four chords in the same order. In C they are **C – G – Am – F**. Musicians call it **I – V – vi – IV** (Roman numerals = the chord’s position in the scale).

You’ll hear this progression (in various keys) in songs like:

- *Let It Be* — The Beatles
- *No Woman, No Cry* — Bob Marley
- *With or Without You* — U2
- *Don’t Stop Believin’* — Journey (verse)
- *Someone Like You* — Adele
- *I’m Yours* — Jason Mraz

Once you can play these four chords smoothly, you can accompany yourself on all of them.`,
          shapes: [
            { rh: 'C4:1 E4:3 G4:5', lh: 'C3:5', caption: 'I — C' },
            { rh: 'G4:1 B4:3 D5:5', lh: 'G2:5', caption: 'V — G' },
            { rh: 'A4:1 C5:3 E5:5', lh: 'A2:5', caption: 'vi — Am' },
            { rh: 'F4:1 A4:3 C5:5', lh: 'F2:5', caption: 'IV — F' },
          ],
        },
        {
          title: 'Play the loop',
          text: `The right hand plays the chord, the left hand plays its **root** (the chord’s name note) down low.

This is the “root position” way — the hand jumps around quite a bit. That’s fine for now; next lesson I’ll show you a trick to make it much smoother.

Count four beats for each chord and **change on beat 1**. Prepare the next chord during beat 4: look ahead, move your hand early.`,
          piece: {
            id: 'u2-four-root',
            title: 'Four Chords — root position',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 70,
            rh: bars(`{C} [C4 E4 G4]/w:135`, `{G} [G4 B4 D5]/w:135`, `{Am} [A4 C5 E5]/w:135`, `{F} [F4 A4 C5]/w:135`, `{C} [C4 E4 G4]/w`, `{G} [G4 B4 D5]/w`, `{Am} [A4 C5 E5]/w`, `{F} [F4 A4 C5]/w`),
            lh: bars('C3/w:5', 'G2/w', 'A2/w', 'F2/w', 'C3/w', 'G2/w', 'A2/w', 'F2/w'),
          },
          tasks: ['Right hand alone, saying the chord names', 'Left hand alone', 'Hands together at 60 bpm without stopping'],
        },
      ],
    },
    {
      id: 'u2-l3',
      title: 'Smooth moves',
      summary: 'Keep common notes and move as little as possible — your first inversions.',
      minutes: 20,
      steps: [
        {
          title: 'The lazy pianist’s trick',
          text: `Good pianists are “lazy” — they move their hands as little as possible. C, G, Am and F share notes, so instead of jumping, we **keep the shared notes and only move what has to move**:

- **C** = C E G (1-3-5)
- **G** = B D G (1-2-5) — only the bottom two notes slide down
- **Am** = C E A (1-2-5) — just like C, but G moves up to A
- **F** = C F A (1-3-5) — the middle note moves up to F

The notes are the same chords, just stacked in a different order. These rearrangements are called **inversions** — we’ll study them properly in Unit 5. Tap to compare.`,
          shapes: [
            { rh: 'C4:1 E4:3 G4:5', lh: 'C3', caption: 'C' },
            { rh: 'B3:1 D4:2 G4:5', lh: 'G2', caption: 'G (B on the bottom)' },
            { rh: 'C4:1 E4:2 A4:5', lh: 'A2', caption: 'Am' },
            { rh: 'C4:1 F4:3 A4:5', lh: 'F2', caption: 'F (C on the bottom)' },
          ],
        },
        {
          title: 'The smooth loop',
          text: `Same four chords, but now your right hand hardly moves. Hear how much more connected and “professional” it sounds?

Keep your thumb resting near middle C the whole time.`,
          piece: {
            id: 'u2-four-smooth',
            title: 'Four Chords — smooth',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars(`{C} ${C}/w:135`, `{G} ${G}/w:125`, `{Am} ${Am}/w:125`, `{F} ${F}/w:135`, `{C} ${C}/w`, `{G} ${G}/w`, `{Am} ${Am}/w`, `{F} ${F}/w`),
            lh: bars('C3/w:5', 'G2/w', 'A2/w', 'F2/w', 'C3/w', 'G2/w', 'A2/w', 'F2/w'),
          },
          tasks: ['Right hand alone until the changes feel easy', 'Hands together at 72 bpm', 'Play it with your eyes on the screen, not your hands'],
        },
        {
          title: 'Add a pulse',
          text: `Now the right hand plays **four chords per bar** — one on every beat — while the left hand holds the root. This steady piano pulse is the sound of many big ballads.

Keep the chords even and not too loud. The left hand can be slightly stronger to give the music a foundation.`,
          piece: {
            id: 'u2-pulse',
            title: 'Pulse Ballad',
            style: 'Ballad',
            key: 'C',
            time: [4, 4],
            tempo: 76,
            rh: bars(`{C} ${rep(`${C}/q`, 4)}`, `{G} ${rep(`${G}/q`, 4)}`, `{Am} ${rep(`${Am}/q`, 4)}`, `{F} ${rep(`${F}/q`, 4)}`, `{C} ${rep(`${C}/q`, 4)}`, `{G} ${rep(`${G}/q`, 4)}`, `{Am} ${rep(`${Am}/q`, 4)}`, `{F} ${rep(`${F}/q`, 4)}`),
            lh: bars('C3/w', 'G2/w', 'A2/w', 'F2/w', 'C3/w', 'G2/w', 'A2/w', 'F2/w'),
          },
          tasks: ['Play with the metronome at 60 bpm', 'Play at 76 bpm', 'Try it loud, then very soft'],
        },
      ],
    },
    {
      id: 'u2-l4',
      title: 'Song: Four-Chord Sunrise',
      summary: 'An original pop song: melody over the four chords, then the accompaniment.',
      minutes: 25,
      steps: [
        {
          title: 'The melody',
          text: `Time for a real song! **Four-Chord Sunrise** is an original pop tune written for this course on C – G – Am – F.

The right hand plays the melody, the left hand plays the root of each chord. Look out for the **dotted quarter + eighth** rhythm (bars 1, 3 and 5) — it gives the tune its lilt.

Practise the right hand alone first. Then add the left hand.`,
          piece: {
            id: 'u2-sunrise',
            title: 'Four-Chord Sunrise',
            composer: 'Piano Teacher original',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 92,
            rh: sunriseMelody,
            lh: bars('C3/w:5', 'G2/w', 'A2/w', 'F2/w', 'C3/w', 'G2/w', 'A2/w', 'F2/w', 'C3/w'),
          },
          tasks: ['Right hand alone at 70 bpm', 'Hands together at 70 bpm', 'Hands together at 92 bpm'],
        },
        {
          title: 'The accompaniment',
          text: `Now play the song like a singer-songwriter would accompany it: the right hand plays the chords in a **long–short–short** rhythm (half note, quarter, quarter), the left hand plays the root twice per bar.

Try this: let the app play the **melody** version (previous step) while you play this accompaniment — or sing the melody yourself!`,
          piece: {
            id: 'u2-sunrise-acc',
            title: 'Four-Chord Sunrise — accompaniment',
            composer: 'Piano Teacher original',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 92,
            rh: bars(`{C} ${C}/h ${C}/q ${C}/q`, `{G} ${G}/h ${G}/q ${G}/q`, `{Am} ${Am}/h ${Am}/q ${Am}/q`, `{F} ${F}/h ${F}/q ${F}/q`, `{C} ${C}/h ${C}/q ${C}/q`, `{G} ${G}/h ${G}/q ${G}/q`, `{Am} ${Am}/h ${Am}/q ${Am}/q`, `{F} ${F}/h ${F}/q ${F}/q`, `{C} ${C}/w`),
            lh: bars('C3/h C3/h', 'G2/h G2/h', 'A2/h A2/h', 'F2/h F2/h', 'C3/h C3/h', 'G2/h G2/h', 'A2/h A2/h', 'F2/h F2/h', 'C3/w'),
          },
          tasks: ['Accompaniment at 92 bpm', 'Hum the melody while you play the accompaniment', 'Now pick one of the famous four-chord songs and play these chords while singing it'],
        },
      ],
    },
  ],
};
