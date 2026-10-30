import type { Piece } from '../music/types';
import type { Lesson, Unit } from './types';
import { unit1 } from './unit1';
import { unit2 } from './unit2';
import { unit3 } from './unit3';
import { unit4 } from './unit4';
import { unit5 } from './unit5';
import { unit6 } from './unit6';
import { unit7 } from './unit7';
import { unit8 } from './unit8';
import { unit9 } from './unit9';
import { unit10 } from './unit10';
import { warmups } from './warmups';

export const course: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10];

export interface LessonRef {
  unit: Unit;
  unitIndex: number;
  lesson: Lesson;
  index: number; // global index
}

export const allLessons: LessonRef[] = course.flatMap((unit, unitIndex) => unit.lessons.map((lesson) => ({ unit, unitIndex, lesson, index: 0 }))).map((r, i) => ({ ...r, index: i }));

export function findLesson(id: string): LessonRef | undefined {
  return allLessons.find((r) => r.lesson.id === id);
}

export interface PieceRef {
  piece: Piece;
  lesson?: LessonRef;
  stepIndex?: number;
}

export const allPieces: PieceRef[] = [
  ...allLessons.flatMap((ref) => ref.lesson.steps.flatMap((s, stepIndex) => (s.piece ? [{ piece: s.piece, lesson: ref, stepIndex }] : []))),
  ...warmups.map((w) => ({ piece: w.piece })),
];

export function findPiece(id: string): PieceRef | undefined {
  return allPieces.find((p) => p.piece.id === id);
}

export { warmups };
