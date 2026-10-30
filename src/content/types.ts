import type { Piece } from '../music/types';

export interface Shape {
  rh?: string; // "C4:1 E4:3 G4:5"
  lh?: string;
  caption?: string;
  arpeggiate?: boolean;
}

export interface Step {
  title: string;
  text: string;
  piece?: Piece;
  shapes?: Shape[];
  tasks?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  steps: Step[];
}

export interface Unit {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  lessons: Lesson[];
}
