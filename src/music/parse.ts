import { DURATION_BEATS, parsePitch } from './theory';
import type { ChordSymbol, DurationCode, Hand, NoteEvent, ParsedPiece, Piece } from './types';

/*
 * Compact notation used by all lessons:
 *   C4/q        quarter note        [C4 E4 G4]/h   chord
 *   r/q         rest                 C4/q.          dotted
 *   C4/h~       tied into next note  C4/q:3         finger 3 ([..]/h:135 per chord note, low → high)
 *   {Am}        chord symbol         |              bar line
 * When the duration is omitted, the previous duration is reused.
 */
const TOKEN = /^(\[[^\]]+\]|r|[A-Ga-g][#bn]?-?\d)(?:\/(w|h|q|8|16))?(\.)?(~)?(?::(\d+))?$/;

export function barLength(piece: Piece, measure: number): number {
  const full = (piece.time[0] * 4) / piece.time[1];
  if (measure === 0 && piece.pickup) return piece.pickup;
  return full;
}

function tokenize(src: string): string[] {
  // keep chords like "[C4 E4 G4]/h" together and split "{Am}" from neighbours
  const out: string[] = [];
  const re = /\[[^\]]*\][^\s|{]*|\{[^}]*\}|\||[^\s|{]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push(m[0]);
  return out;
}

interface HandResult {
  events: NoteEvent[];
  chords: ChordSymbol[];
  measures: number;
}

function parseHand(piece: Piece, hand: Hand, src: string): HandResult {
  const events: NoteEvent[] = [];
  const chords: ChordSymbol[] = [];
  let t = 0;
  let measure = 0;
  let measureStart = 0;
  let lastDur: DurationCode = 'q';
  let pendingChord: string | undefined;

  const closeMeasure = () => {
    const len = t - measureStart;
    const expected = barLength(piece, measure);
    if (Math.abs(len - expected) > 1e-6) {
      throw new Error(`${piece.id} ${hand}: bar ${measure + 1} has ${len} beats, expected ${expected}`);
    }
    measure++;
    measureStart = t;
  };

  for (const tok of tokenize(src)) {
    if (tok === '|') {
      closeMeasure();
      continue;
    }
    if (tok.startsWith('{')) {
      pendingChord = tok.slice(1, -1);
      chords.push({ name: pendingChord, start: t, measure });
      continue;
    }
    const m = TOKEN.exec(tok);
    if (!m) throw new Error(`${piece.id} ${hand}: cannot read "${tok}"`);
    const [, body, durStr, dot, tie, fingerStr] = m;
    const dur: DurationCode = (durStr as DurationCode | undefined) ?? lastDur;
    lastDur = dur;
    const beats = DURATION_BEATS[dur] * (dot ? 1.5 : 1);
    let pitches = body === 'r' ? [] : body.startsWith('[') ? body.slice(1, -1).trim().split(/\s+/).map(parsePitch) : [parsePitch(body)];
    pitches = [...pitches].sort((a, b) => a.midi - b.midi);
    events.push({
      id: `${hand}-${events.length}`,
      hand,
      pitches,
      start: t,
      beats,
      dur,
      dotted: !!dot,
      tie: !!tie,
      fingers: fingerStr ? fingerStr.split('').map(Number) : [],
      measure,
      chord: pendingChord,
    });
    pendingChord = undefined;
    t += beats;
  }
  if (t - measureStart > 1e-6) closeMeasure();
  return { events, chords, measures: measure };
}

export function parsePiece(piece: Piece): ParsedPiece {
  const hands: HandResult[] = [];
  if (piece.rh) hands.push(parseHand(piece, 'rh', piece.rh));
  if (piece.lh) hands.push(parseHand(piece, 'lh', piece.lh));
  if (!hands.length) throw new Error(`${piece.id}: no music`);
  const measureCount = Math.max(...hands.map((h) => h.measures));
  if (hands.some((h) => h.measures !== measureCount)) {
    throw new Error(`${piece.id}: hands have different bar counts (${hands.map((h) => h.measures).join(' vs ')})`);
  }
  const measureStarts: number[] = [];
  const measureLengths: number[] = [];
  let acc = 0;
  for (let i = 0; i < measureCount; i++) {
    measureStarts.push(acc);
    measureLengths.push(barLength(piece, i));
    acc += barLength(piece, i);
  }
  const events = hands.flatMap((h) => h.events);
  // chord symbols: prefer right-hand ones, fall back to left hand
  const rhChords = hands[0].chords;
  const chords = rhChords.length ? rhChords : hands.flatMap((h) => h.chords);
  return { piece, events, chords, measureCount, measureStarts, measureLengths, totalBeats: acc };
}
