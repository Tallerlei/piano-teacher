# 🎹 Piano Teacher

A friendly piano course for **real pianos**. It takes you from a decent beginner to an intermediate player, with a pop and rock focus. The app is the teacher and you play on your own instrument.

Built for an **iPad in landscape**. It also works in any modern browser and can be added to the home screen as a web app.

**Live:** https://tallerlei.github.io/piano-teacher/

## What's inside

- **10 units, 40 lessons**, each step-by-step with teacher notes, tasks and a tick-off progress tracker:
  1. Getting Started: posture, finding C, five-finger melodies
  2. Both Hands: bass clef, hands together, first chords
  3. Pop Rhythms: the four-chord song, pushes, the 3-3-2 groove
  4. Left Hand Grooves: root-fifth, broken chords, waltz
  5. Inversions & Smooth Moves: voice leading, the 50s progression, slash chords
  6. Minor & Moody: A minor, 6/8, Dorian, Greensleeves
  7. Blues & Rock 'n' Roll: the 12-bar blues, boogie bass, blues scale, swing
  8. Colour Chords: sus, 7ths, add9, ii–V–I, ballad shells
  9. New Keys: G, F and D major
  10. Playing Like a Pro: lead sheets, walk-ups, two-hand ballads, the final *Encore*
- **Sheet music** with grand staff, fingering, chord symbols and an animated keyboard.
- **Listen and practise**: playback with a moving cursor, adjustable tempo, metronome, count-in, hand on/off, and looping of any bar range (tap a bar, then tap another).
- **Songbook** for every song in the course, **Chords** reference, daily warm-ups, and practice-time tracking.
- Progress is saved locally in the browser. There is no account, no tracking and no microphone.

## About the songs

Melodies of copyrighted pop and rock songs are **not** included. Instead, the course teaches the **chord progressions, grooves and patterns** that those songs are built on, and names famous examples of each. The music you play is original or traditional/public domain (e.g. *Amazing Grace*, *Greensleeves*, *When the Saints*, *Auld Lang Syne*). With those patterns you can play along with real songs from any chord chart or lead sheet.

## Development

```bash
npm install
npm run dev      # http://localhost:5173/piano-teacher/
npm test         # vitest: music engine + validates every piece in the course
npm run build    # type-check + production build into dist/
```

Stack: Vite, TypeScript and no framework. Notation is drawn by a custom SVG renderer (`src/music/staff.ts`) and sound comes from the Web Audio API (`src/music/audio.ts`).

### Writing music

Pieces live in `src/content/unitN.ts` and use a compact text notation (see `src/music/parse.ts`):

```
{C} C4/q:1 D4 E4 F4 | G4/h.~:5 G4/q | [C3 G3]/w:52 | r/q
```

- `PITCH/dur`. Durations are `w h q 8 16`, plus `.` for dotted and `~` for a tie. `:fingers` comes last.
- `[C4 E4 G4]` is a chord, `r` is a rest, and `{Am}` is a chord symbol. Pitches are absolute, so write `F#4` in G major.
- Bars are separated by `|`, and the test suite checks that every bar adds up.

## Deployment

Every push to `main` runs the tests, builds the app and deploys it to GitHub Pages using `.github/workflows/deploy.yml`.
