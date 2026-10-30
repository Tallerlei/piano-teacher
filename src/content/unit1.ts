import { bars } from './helpers';
import type { Unit } from './types';

const odeRh = bars(
  '{C} E4/q:3 E4 F4:4 G4:5',
  '{G} G4/q:5 F4:4 E4:3 D4:2',
  '{C} C4/q:1 C4 D4:2 E4:3',
  '{G} E4/q.:3 D4/8:2 D4/h',
  '{C} E4/q:3 E4 F4:4 G4:5',
  '{G} G4/q F4 E4 D4',
  '{C} C4/q:1 C4 D4 E4',
  '{G} D4/q.:2 {C} C4/8:1 C4/h',
);

export const unit1: Unit = {
  id: 'u1',
  title: 'Warm Start',
  subtitle: 'Posture, the keyboard map, rhythm and your first tune',
  icon: '🌱',
  lessons: [
    {
      id: 'u1-l1',
      title: 'Welcome to your lessons',
      summary: 'How this course works, how to sit and how to number your fingers.',
      minutes: 10,
      steps: [
        {
          title: 'Hi, I’m your piano teacher',
          text: `Great to meet you! Over the next weeks I’ll walk you from *decent beginner* to a confident **intermediate player** who can sit down and play pop, rock, ballads and blues.

Here’s how we work together:

- **You read** my explanation on this side of the screen.
- **You listen**: press **▶ Listen** and I’ll play the example, lighting up the notes and keys.
- **You play** it on your own piano. Slow it down with the tempo slider — slow practice is the secret of every good player.
- **You tick off** the practice tasks and tell me how it went. If something was tricky, I’ll bring it back for review.

> Aim for **20–30 minutes a day**: 5 minutes warm-up, 15 minutes lesson, then play something just for fun. Little and often beats one long weekend session.`,
        },
        {
          title: 'Sit like a pianist',
          text: `Good habits now save you years of fixing later. Check these every time you sit down:

- **Bench height**: forearms roughly level with the keys, elbows slightly above.
- **Distance**: sit on the front half of the bench, far enough back that your elbows are a little in front of your body.
- **Middle**: your belly button lines up roughly with **middle C**.
- **Feet** flat on the floor (right foot near the sustain pedal).
- **Hands**: curved, as if gently holding a ball. Fingertips play, not the flat pads. The thumb plays on its side.
- **Shoulders** relaxed. If they creep up, stop, shake your hands out and start again.`,
          tasks: ['Adjust your bench height', 'Find the "holding a ball" hand shape', 'Check your shoulders are relaxed'],
        },
        {
          title: 'Finger numbers',
          text: `Pianists number their fingers the same way in both hands: **thumb = 1**, index = 2, middle = 3, ring = 4, little finger = 5.

Notice the hands are mirror images: in the **right hand** the thumb is on the left; in the **left hand** the thumb is on the right.

Tap the keyboards to hear the five-finger **C position** for each hand. Put your hands there on your piano and wiggle each finger as you say its number out loud.`,
          shapes: [
            { rh: 'C4:1 D4:2 E4:3 F4:4 G4:5', caption: 'Right hand C position (thumb on middle C)', arpeggiate: true },
            { lh: 'C3:5 D3:4 E3:3 F3:2 G3:1', caption: 'Left hand C position (little finger on C)', arpeggiate: true },
          ],
          tasks: ['Say finger numbers aloud while wiggling each finger', 'Do it with eyes closed'],
        },
      ],
    },
    {
      id: 'u1-l2',
      title: 'Finding your way around',
      summary: 'Black-key landmarks, middle C and the five-finger position.',
      minutes: 15,
      steps: [
        {
          title: 'The keyboard map',
          text: `The black keys come in groups of **two** and **three**. They’re your landmarks — you’ll never get lost again.

- **C** is always the white key just to the left of a group of **two** black keys.
- **F** is just to the left of a group of **three** black keys.
- The white keys are named **C D E F G A B**, then it starts again.

**Middle C** is the C closest to the middle of your piano (usually right under the brand name). It’s home base for reading music.`,
          shapes: [{ rh: 'C4:C D4:D E4:E F4:F G4:G A4:A B4:B C5:C', caption: 'The white keys from middle C up', arpeggiate: true }],
          tasks: ['Play every C on your piano, bottom to top', 'Play every F', 'Find middle C with your eyes closed (feel for the two black keys)'],
        },
        {
          title: 'Five-finger warm-up',
          text: `Now let’s connect the fingers to the notes on the staff. The **right hand** plays in the treble clef (top staff); the **left hand** plays in the bass clef (bottom staff).

First the right hand plays up and down, then the left hand answers. Small numbers above or below the notes are **finger numbers**.

Press **Listen**, then play along. Keep the fingers curved and let each note sound fully before the next.`,
          piece: {
            id: 'u1-cpos',
            title: 'C Position Warm-up',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 80,
            rh: bars('C4/q:1 D4:2 E4:3 F4:4', 'G4/q:5 F4:4 E4:3 D4:2', 'C4/q:1 E4:3 G4:5 E4:3', 'C4/w:1', 'r/w', 'r/w', 'r/w', 'r/w'),
            lh: bars('r/w', 'r/w', 'r/w', 'r/w', 'C3/q:5 D3:4 E3:3 F3:2', 'G3/q:1 F3:2 E3:3 D3:4', 'C3/q:5 E3:3 G3:1 E3:3', 'C3/w:5'),
          },
          tasks: ['Play it at 60 bpm without stopping', 'Play it at 80 bpm', 'Say the note names out loud while playing'],
        },
        {
          title: 'Both hands together',
          text: `Now both hands play **the same notes at the same time**, an octave apart. Your brain has to send the same message to two very different hands — this is the first step to real independence.

Start slowly. Listen for both notes landing exactly together, like one sound.`,
          piece: {
            id: 'u1-parallel',
            title: 'Parallel Motion',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars('C4/q:1 D4:2 E4:3 F4:4', 'G4/q:5 F4:4 E4:3 D4:2', 'C4/q:1 D4:2 E4:3 D4:2', 'C4/w:1'),
            lh: bars('C3/q:5 D3:4 E3:3 F3:2', 'G3/q:1 F3:2 E3:3 D3:4', 'C3/q:5 D3:4 E3:3 D3:4', 'C3/w:5'),
          },
          tasks: ['Hands together at 50 bpm', 'Hands together at 72 bpm', 'Play it three times in a row without a mistake'],
        },
      ],
    },
    {
      id: 'u1-l3',
      title: 'Rhythm refresh',
      summary: 'Whole, half, quarter notes, rests, and counting out loud — in 4/4 and 3/4.',
      minutes: 15,
      steps: [
        {
          title: 'Counting is your superpower',
          text: `Wrong notes are forgiven; wrong rhythm is noticed by everyone. Let’s make rhythm rock solid.

- **Quarter note** (filled, with stem) = **1 beat**
- **Half note** (hollow, with stem) = **2 beats**
- **Dotted half** = **3 beats** (a dot adds half the value again)
- **Whole note** (hollow, no stem) = **4 beats**
- **Rests** are silences of the same lengths — they count too!

The **time signature 4/4** means four beats in every bar. Count “**1 2 3 4**” out loud while you play. Yes, out loud. Every pro does it when learning something new.`,
          piece: {
            id: 'u1-rhythm44',
            title: 'Clap & Count in 4/4',
            style: 'Exercise',
            key: 'C',
            time: [4, 4],
            tempo: 84,
            rh: bars('C4/q:1 C4 C4 C4', 'E4/h:3 E4/h', 'G4/q:5 G4 E4/h:3', 'C4/w:1', 'D4/q:2 r/q D4 r', 'E4/h.:3 r/q', 'F4/q:4 E4:3 D4:2 E4:3', 'C4/w:1'),
            lh: bars('C3/w:5', 'C3/w', 'C3/w', 'C3/w', 'G2/w', 'C3/w', 'G2/w', 'C3/w'),
          },
          tasks: ['Clap the right-hand rhythm while counting aloud', 'Play the right hand alone, counting aloud', 'Hands together with the metronome'],
        },
        {
          title: 'Three beats: 3/4 time',
          text: `In **3/4** there are three beats per bar: “**1** 2 3, **1** 2 3”. It’s the waltz feel — and it’s used in plenty of pop ballads too (think of songs that “sway”).

Lean slightly on beat **1** of every bar. Notice the **dotted half note** fills a whole bar.`,
          piece: {
            id: 'u1-rhythm34',
            title: 'Little Waltz',
            style: 'Exercise',
            key: 'C',
            time: [3, 4],
            tempo: 96,
            rh: bars('C4/h.:1', 'E4/h:3 E4/q', 'G4/q:5 F4:4 E4:3', 'D4/h.:2', 'E4/h:3 D4/q:2', 'F4/q:4 E4:3 D4:2', 'E4/h:3 D4/q:2', 'C4/h.:1'),
            lh: bars('C3/h.:5', 'C3/h.', 'C3/h.', 'G2/h.', 'G2/h.', 'G2/h.', 'G2/h.', 'C3/h.'),
          },
          tasks: ['Count “1 2 3” aloud while playing', 'Play with metronome at 96 bpm'],
        },
      ],
    },
    {
      id: 'u1-l4',
      title: 'Your first song: Ode to Joy',
      summary: 'A world-famous melody in C position, then add the left hand.',
      minutes: 20,
      steps: [
        {
          title: 'The melody',
          text: `Our first song is **Ode to Joy** — a melody everyone knows, and it fits perfectly in the C position. (Don’t worry, we’ll get to pop and rock very soon!)

Watch bar 4: the **dotted quarter + eighth** rhythm. The dotted quarter is long (1½ beats), the eighth is short (½ beat). Count “**1 2 & 3 4**”, the D comes on the “&”.

Play the right hand alone first. The letters above the staff (**C**, **G**) are **chord symbols** — we’ll use them in a minute.`,
          piece: {
            id: 'u1-ode-rh',
            title: 'Ode to Joy — melody',
            composer: 'Ludwig van Beethoven',
            style: 'Classical',
            key: 'C',
            time: [4, 4],
            tempo: 100,
            rh: odeRh,
          },
          tasks: ['Right hand at 70 bpm', 'Right hand at 100 bpm', 'Play it from memory'],
        },
        {
          title: 'Add the left hand',
          text: `The left hand plays just **C** and **G** — the roots of the two chords. Long notes in the left hand, melody in the right: this “melody + bass” idea is the foundation of how you’ll play every pop song.

Tip: practise the left hand alone first (turn off the right hand sound with the chip below and play along).`,
          piece: {
            id: 'u1-ode',
            title: 'Ode to Joy',
            composer: 'Ludwig van Beethoven',
            style: 'Classical',
            key: 'C',
            time: [4, 4],
            tempo: 100,
            rh: odeRh,
            lh: bars('C3/w:5', 'G3/w:1', 'C3/w:5', 'G3/w:1', 'C3/w:5', 'G3/w:1', 'C3/w:5', 'G3/h:1 C3/h:5'),
          },
          tasks: ['Left hand alone while the app plays the right hand', 'Hands together at 60 bpm', 'Hands together at 100 bpm'],
        },
      ],
    },
  ],
};

