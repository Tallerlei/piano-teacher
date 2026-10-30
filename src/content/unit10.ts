import { bars } from './helpers';
import type { Unit } from './types';

const auldMelody = bars(
  'C4/q:1',
  '{F} F4/q.:2 F4/8:2 F4/q:2 A4/q:4',
  '{C} G4/q.:3 F4/8:2 G4/q:3 A4/q:4',
  '{F} F4/q.:2 F4/8:2 A4/q:4 C5/q:5',
  '{Bb} D5/h.:5 D5/q:5',
  '{F} C5/q.:5 A4/8:4 A4/q:4 F4/q:2',
  '{C} G4/q.:3 F4/8:2 G4/q:3 A4/q:4',
  '{Bb} F4/q.:3 D4/8:1 D4/q:1 {C} C4/q:1',
  '{F} F4/h.:2 D5/q:5',
  '{F} C5/q.:5 A4/8:4 A4/q:4 F4/q:2',
  '{C} G4/q.:3 F4/8:2 G4/q:3 D5/q:5',
  '{F} C5/q.:4 A4/8:2 A4/q:2 C5/q:4',
  '{Bb} D5/h.:4 F5/q:5',
  '{F} C5/q.:5 A4/8:4 A4/q:4 F4/q:2',
  '{C} G4/q.:3 F4/8:2 G4/q:3 A4/q:4',
  '{Bb} F4/q.:3 D4/8:1 D4/q:1 {C} C4/q:1',
  '{F} F4/h.:2 r/q',
);

const rf = (root: string, fifth: string) => `${root}/h ${fifth}/h`;
const auldBass = bars(
  'r/q',
  rf('F2', 'C3'), rf('C3', 'G2'), rf('F2', 'C3'), rf('Bb2', 'F2'),
  rf('F2', 'C3'), rf('C3', 'G2'), 'Bb2/h. C3/q', rf('F2', 'C3'),
  rf('F2', 'C3'), rf('C3', 'G2'), rf('F2', 'C3'), rf('Bb2', 'F2'),
  rf('F2', 'C3'), rf('C3', 'G2'), 'Bb2/h. C3/q', '[F2 C3]/h. r/q',
);

// Walking Home: RH chords, LH walk-ups into the next chord
const wC = '[E4 G4 C5]';
const wAm = '[E4 A4 C5]';
const wF = '[F4 A4 C5]';
const wG = '[D4 G4 B4]';
const hold = (name: string, ch: string) => `{${name}} ${ch}/h ${ch}/q ${ch}/q`;
const walkRound = ['C3/h:1 B2/q:2 A2/q:3', 'A2/h:1 G2/q:2 F2/q:3', 'F2/h:1 E2/q:2 F#2/q:1', 'G2/h:1 A2/q:2 B2/q:1'];

// Glasshouse: split arpeggios across the hands
const glass = (name: string, l: [string, string, string], r: [string, string, string]) => ({
  lh: `${l[0]}/8:5 ${l[1]}:2 ${l[2]}/h.:1`,
  rh: `{${name}} r/q. ${r[0]}/8:1 ${r[1]}:2 ${r[2]}:5 ${r[1]}:2 ${r[0]}:1`,
});
const gC = glass('C', ['C3', 'G3', 'C4'], ['E4', 'G4', 'C5']);
const gG = glass('G', ['G2', 'D3', 'G3'], ['D4', 'G4', 'B4']);
const gAm = glass('Am', ['A2', 'E3', 'A3'], ['E4', 'A4', 'C5']);
const gF = glass('F', ['F2', 'C3', 'F3'], ['F4', 'A4', 'C5']);

// Encore: verse with 1-5-8-5 left hand, pushed chorus, big ending
const eighths = (r: string, f: string, o: string) => `${r}/8 ${f} ${o} ${f} ${r} ${f} ${o} ${f}`;
const eC = '[E4 G4 C5]';
const eG = '[D4 G4 B4]';
const eD = '[D4 F#4 A4]';
const eEm = '[E4 G4 B4]';
const push = (chord: string, next: string, nextName: string) => `${chord}/h ${chord}/q. {${nextName}} ${next}/8~`;

export const unit10: Unit = {
  id: 'u10',
  title: 'Playing Like a Pro',
  subtitle: 'Lead sheets, walk-ups, two-hand arrangements — and your encore',
  icon: '🎤',
  lessons: [
    {
      id: 'u10-l1',
      title: 'Reading a lead sheet',
      summary: 'Melody + chord symbols: how real pop and rock musicians read music.',
      minutes: 30,
      steps: [
        {
          title: 'What is a lead sheet?',
          text: `Most pop and rock songbooks — and almost every band — use a **lead sheet**: just the **melody** with **chord symbols** above it. There’s no left-hand part written out. *You* decide what the left hand plays.

This is the most important skill in the course: it turns any song you find into something you can play.

Here is **Auld Lang Syne** (traditional, in **F major** — remember B♭) as a lead sheet. Play the melody with your right hand and **read the chord symbols out loud** as you go.

- Starts with a one-beat **pickup** on C.
- In bars 8 and 16 the chord changes on beat 4: B♭ then C.`,
          piece: {
            id: 'u10-auld-lead',
            title: 'Auld Lang Syne (lead sheet)',
            composer: 'Traditional',
            style: 'Folk',
            key: 'F',
            time: [4, 4],
            tempo: 84,
            pickup: 1,
            rh: auldMelody,
          },
          tasks: ['Play the melody alone', 'Say every chord name aloud while playing', 'With your left hand, play just the chord roots in whole notes'],
        },
        {
          title: 'Add your own left hand',
          text: `Now add a left hand from your toolbox. The simplest choice: **root and fifth** in half notes — that’s what is written here.

When you’re comfortable, swap it for any other pattern you’ve learned:
- **Unit 4**: broken chords (1-5-8-5)
- **Unit 4**: waltz-style “bass – chord – chord” (in 4/4: bass – chord – bass – chord)
- **Unit 5**: inversions in the right hand under the melody

> There is no “right” answer. Pros pick the left hand that suits the mood.`,
          piece: {
            id: 'u10-auld',
            title: 'Auld Lang Syne',
            composer: 'Traditional',
            style: 'Folk',
            key: 'F',
            time: [4, 4],
            tempo: 84,
            pickup: 1,
            rh: auldMelody,
            lh: auldBass,
          },
          tasks: ['Hands together at 70 bpm', 'Hands together at 84 bpm', 'Replace the left hand with 1-5-8-5 eighth notes'],
        },
      ],
    },
    {
      id: 'u10-l2',
      title: 'Walk-ups and fills',
      summary: 'Connect chords with walking bass lines and little right-hand fills.',
      minutes: 25,
      steps: [
        {
          title: 'Walking between chords',
          text: `A **walk-up** (or walk-down) is a short bass line that **steps into the next chord**. It makes a simple progression sound like a real band. Country, rock, gospel and pop players use it all the time.

In bar 1 the C chord walks **down** C – B – A to land on Am. In bar 3 the bass walks F – E – F♯ to land on G, and G walks up G – A – B back to C.

In bar 8 the right hand plays a **fill**: a quick run down to lead back home.

Progression: **C – Am – F – G** (I – vi – IV – V), the “50s progression” from Unit 5.`,
          piece: {
            id: 'u10-walking',
            title: 'Walking Home',
            style: 'Pop',
            key: 'C',
            time: [4, 4],
            tempo: 96,
            rh: bars(
              hold('C', wC), hold('Am', wAm), hold('F', wF), hold('G', wG),
              hold('C', wC), hold('Am', wAm), hold('F', wF),
              `{G} ${wG}/h D5/8:5 C5:4 B4:3 A4:2`,
              `{C} [C4 E4 G4 C5]/w`,
            ),
            lh: bars(...walkRound, ...walkRound, '[C2 C3]/w:51'),
          },
          tasks: ['Left hand alone — sing the bass line', 'Hands together at 80 bpm', 'Hands together at 96 bpm', 'Make up your own fill in bar 8'],
        },
      ],
    },
    {
      id: 'u10-l3',
      title: 'Two-hand ballad style',
      summary: 'Share flowing arpeggios between both hands, then add a melody on top.',
      minutes: 30,
      steps: [
        {
          title: 'Glasshouse',
          text: `This is how piano ballads get that big, flowing sound: the **left hand starts the arpeggio and the right hand finishes it**. Together they cover three octaves.

- Left hand: root – fifth – octave, then **hold**.
- Right hand: comes in on “**&** of 2” and rolls up and back down.
- Use the **sustain pedal**: press it on beat 1, change it (up–down) at every new chord.

Round 3 keeps the left hand going but the right hand plays a **melody** instead — that’s a full two-hand arrangement.`,
          piece: {
            id: 'u10-glasshouse',
            title: 'Glasshouse',
            style: 'Ballad',
            key: 'C',
            time: [4, 4],
            tempo: 72,
            rh: bars(
              gC.rh, gG.rh, gAm.rh, gF.rh,
              gC.rh, gG.rh, gAm.rh, gF.rh,
              '{C} E5/h.:5 D5/8:4 C5/8:3',
              '{G} D5/h:4 B4/h:2',
              '{Am} C5/q.:3 B4/8:2 A4/h:1',
              '{F} A4/h.:3 G4/q:2',
              '{C} [E4 G4 C5]/w:135',
            ),
            lh: bars(
              gC.lh, gG.lh, gAm.lh, gF.lh,
              gC.lh, gG.lh, gAm.lh, gF.lh,
              gC.lh, gG.lh, gAm.lh, gF.lh,
              '[C2 C3]/w:51',
            ),
          },
          tasks: ['Left hand alone with pedal', 'Rounds 1–2 hands together at 60 bpm', 'Round 3 (melody) hands together', 'The whole piece at 72 bpm'],
        },
      ],
    },
    {
      id: 'u10-l4',
      title: 'Your encore',
      summary: 'A full rock anthem using everything you know — and graduation!',
      minutes: 35,
      steps: [
        {
          title: 'Encore',
          text: `Time to put it all together in one big **anthem in G major**:

- **Verse** (bars 1–8): melody with dotted rhythms over a flowing **1-5-8-5** left hand.
- **Chorus** (bars 9–16): pushed chords from Unit 3 — the chord arrives on the “& of 4” and is tied over.
- **Build-up** (bars 15–16): driving eighth notes that get louder and louder (*crescendo*).
- **Ending**: one huge G chord. Let it ring with the pedal!

Take it section by section. This is a performance piece — when it’s ready, **play it for someone**.`,
          piece: {
            id: 'u10-encore',
            title: 'Encore',
            style: 'Rock',
            key: 'G',
            time: [4, 4],
            tempo: 92,
            rh: bars(
              '{G} D5/q:4 B4/q:2 D5/q.:4 E5/8:5',
              '{D} D5/q.:4 A4/8:1 A4/h:1',
              '{Em} B4/q:2 G4/q:1 B4/q.:2 C5/8:3',
              '{C} C5/q.:3 B4/8:2 G4/h:1',
              '{G} D5/q:2 B4/q:1 D5/q.:2 G5/8:5',
              '{D} F#5/q.:4 E5/8:3 D5/h:2',
              '{Em} E5/q.:3 D5/8:2 B4/q:1 G4/q:1',
              '{C} C5/h:2 {D} A4/h:1',
              `{C} ${push(eC, eG, 'G')}`,
              push(eG, eD, 'D'),
              push(eD, eEm, 'Em'),
              push(eEm, eC, 'C'),
              push(eC, eG, 'G'),
              push(eG, eD, 'D'),
              `${eD}/h ${eD}/8 ${eD} ${eD} ${eD}`,
              `${eD}/8 ${eD} ${eD} ${eD} ${eD} ${eD} ${eD} ${eD}`,
              '{G} [G4 B4 D5 G5]/w:1235',
            ),
            lh: bars(
              eighths('G2', 'D3', 'G3'),
              eighths('D3', 'A3', 'D4'),
              eighths('E2', 'B2', 'E3'),
              eighths('C3', 'G3', 'C4'),
              eighths('G2', 'D3', 'G3'),
              eighths('D3', 'A3', 'D4'),
              eighths('E2', 'B2', 'E3'),
              'C3/8 G3 C4 G3 D3 A3 D4 A3',
              'C3/h C3/q. G2/8~',
              'G2/h G2/q. D3/8~',
              'D3/h D3/q. E3/8~',
              'E3/h E3/q. C3/8~',
              'C3/h C3/q. G2/8~',
              'G2/h G2/q. D3/8~',
              'D3/h D3/8 D3 D3 D3',
              'D3/8 D3 D3 D3 D3 D3 D3 D3',
              '[G2 D3 G3]/w:521',
            ),
          },
          tasks: ['Verse: hands separately, then together', 'Chorus: hands together at 76 bpm', 'Build-up and ending', 'The whole song at 92 bpm', 'Perform it for someone!'],
        },
        {
          title: 'Graduation 🎓',
          text: `**Congratulations — you made it!** Look back at where you started: finding middle C and playing five-finger melodies. Now you can:

- read treble **and** bass clef,
- play in **C, G, F, D and A minor**,
- use **inversions**, **seventh**, **sus** and **add9** chords,
- play the **12-bar blues**, boogie bass and the blues scale,
- read a **lead sheet** and invent your own left hand,
- play syncopated pop rhythms and full two-hand ballads.

That’s a solid **intermediate** player. 🎉

**Where next?**

| Goal | What to do |
|---|---|
| Play your favourite songs | Find lead sheets or chord charts and use the patterns from this course |
| Play by ear | Pick a song, find the key, then work out the bass notes first |
| Improve reading | Sight-read a few bars of something new every day |
| Get creative | Write your own song with I – V – vi – IV and a melody on top |
| Keep your hands fit | Do the warm-ups and scales in new keys (A, E, B♭) |

Keep revisiting your favourite pieces in the **Songbook** — and keep playing every day, even if just for 10 minutes.`,
          tasks: ['Choose one song you love and find its chords', 'Play Encore for a friend or family member'],
        },
      ],
    },
  ],
};
