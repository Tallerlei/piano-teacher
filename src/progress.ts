import { allLessons, type LessonRef } from './content';
import { state } from './state';

export function isDone(id: string): boolean {
  return !!state.completed[id];
}

/** First lesson (in course order) that hasn't been completed yet. */
export function nextLesson(): LessonRef | undefined {
  return allLessons.find((r) => !isDone(r.lesson.id));
}

export function currentUnitIndex(): number {
  return nextLesson()?.unitIndex ?? allLessons[allLessons.length - 1].unitIndex;
}

/** A completed lesson worth revisiting: tricky ones first, otherwise the least recently practised. */
export function reviewLesson(): LessonRef | undefined {
  const done = allLessons.filter((r) => isDone(r.lesson.id));
  if (done.length < 2) return undefined;
  const age = (r: LessonRef) => Date.now() - new Date(state.completed[r.lesson.id].completedAt).getTime();
  const tricky = done.filter((r) => state.completed[r.lesson.id].rating === 'tricky' && age(r) > 6 * 3600_000);
  if (tricky.length) return tricky.sort((a, b) => age(b) - age(a))[0];
  const candidates = done.filter((r) => state.completed[r.lesson.id].rating !== 'easy' && age(r) > 2 * 86_400_000 && r.lesson.steps.some((s) => s.piece));
  return candidates.sort((a, b) => age(b) - age(a))[0];
}

export function unitProgress(unitIndex: number): { done: number; total: number } {
  const lessons = allLessons.filter((r) => r.unitIndex === unitIndex);
  return { done: lessons.filter((r) => isDone(r.lesson.id)).length, total: lessons.length };
}
