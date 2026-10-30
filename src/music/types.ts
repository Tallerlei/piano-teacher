export type Hand = 'rh' | 'lh';

export type DurationCode = 'w' | 'h' | 'q' | '8' | '16';

export interface Pitch {
  step: number; // 0 = C … 6 = B
  alter: number; // -1 flat, 0 natural, 1 sharp
  octave: number;
  midi: number;
  name: string; // e.g. "F#4"
}

export interface NoteEvent {
  id: string; // "rh-12"
  hand: Hand;
  pitches: Pitch[]; // empty = rest
  start: number; // in quarter-note beats from the start of the piece
  beats: number;
  dur: DurationCode;
  dotted: boolean;
  tie: boolean;
  fingers: number[];
  measure: number;
  chord?: string; // chord symbol starting at this event
}

export interface ChordSymbol {
  name: string;
  start: number;
  measure: number;
}

export interface Piece {
  id: string;
  title: string;
  style?: 'Pop' | 'Rock' | 'Ballad' | 'Blues' | 'Folk' | 'Classical' | 'Exercise' | 'Soul';
  composer?: string;
  key: string; // "C", "G", "F", "D", "Bb", "A", "E", "Am", "Em", "Dm"
  time: [number, number];
  tempo: number; // quarter-note bpm
  pickup?: number; // length of the first (incomplete) bar in quarter beats
  swing?: boolean;
  rh?: string;
  lh?: string;
  about?: string;
  measuresPerLine?: number;
}

export interface ParsedPiece {
  piece: Piece;
  events: NoteEvent[];
  chords: ChordSymbol[];
  measureCount: number;
  measureStarts: number[]; // beat where each measure starts
  measureLengths: number[];
  totalBeats: number;
}
