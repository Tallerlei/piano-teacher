export type Rating = 'tricky' | 'good' | 'easy';

export interface LessonRecord {
  completedAt: string;
  rating: Rating;
  reviews: number;
}

export interface Settings {
  noteNames: boolean;
  fingers: boolean;
  metronome: boolean;
  countIn: boolean;
}

export interface AppState {
  name: string;
  completed: Record<string, LessonRecord>;
  stepIndex: Record<string, number>;
  lastLesson: string | null;
  practice: Record<string, number>; // ISO date → seconds practised
  tempo: Record<string, number>; // piece id → tempo factor
  settings: Settings;
}

const KEY = 'piano-teacher:v1';

const DEFAULT: AppState = {
  name: '',
  completed: {},
  stepIndex: {},
  lastLesson: null,
  practice: {},
  tempo: {},
  settings: { noteNames: false, fingers: true, metronome: true, countIn: true },
};

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT);
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...structuredClone(DEFAULT), ...parsed, settings: { ...DEFAULT.settings, ...parsed.settings } };
  } catch {
    return structuredClone(DEFAULT);
  }
}

export const state: AppState = load();

export function save(): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetProgress(): void {
  Object.assign(state, structuredClone(DEFAULT));
  save();
}

export function exportProgress(): string {
  return JSON.stringify(state, null, 2);
}

export function importProgress(json: string): void {
  const parsed = JSON.parse(json) as Partial<AppState>;
  if (typeof parsed !== 'object' || !parsed || typeof parsed.completed !== 'object') throw new Error('Not a Piano Teacher backup');
  Object.assign(state, { ...structuredClone(DEFAULT), ...parsed, settings: { ...DEFAULT.settings, ...parsed.settings } });
  save();
}

export function today(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addPracticeSeconds(seconds: number): void {
  const k = today();
  state.practice[k] = (state.practice[k] ?? 0) + seconds;
  save();
}

/** Consecutive days (ending today or yesterday) with at least 5 minutes of practice. */
export function streak(): number {
  let count = 0;
  const d = new Date();
  if ((state.practice[today(d)] ?? 0) < 300) d.setDate(d.getDate() - 1);
  while ((state.practice[today(d)] ?? 0) >= 300) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export function completeLesson(id: string, rating: Rating): void {
  const prev = state.completed[id];
  state.completed[id] = { completedAt: new Date().toISOString(), rating, reviews: prev ? prev.reviews + 1 : 0 };
  save();
}
