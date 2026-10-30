import { course } from '../content';
import { isDone, nextLesson, unitProgress } from '../progress';
import { state } from '../state';
import { h } from '../ui';
import type { View } from './view';

const RATING_LABEL = { tricky: 'still tricky', good: 'got it', easy: 'easy' };

export function courseView(anchor?: string): View {
  const next = nextLesson();
  const el = h('div', { class: 'page course' },
    h('h1', {}, 'Your course'),
    h('p', { class: 'lead' }, 'Ten units from confident beginner to intermediate. I recommend going in order, but feel free to jump ahead or revisit anything.'),
    ...course.map((u, i) => {
      const p = unitProgress(i);
      return h('section', { class: 'unit', id: u.id },
        h('div', { class: 'unit-head' },
          h('span', { class: 'unit-icon big' }, u.icon),
          h('div', {},
            h('h2', {}, `Unit ${i + 1} · ${u.title}`),
            h('div', { class: 'unit-sub' }, u.subtitle),
          ),
          h('span', { class: 'unit-count' }, `${p.done}/${p.total}`),
        ),
        h('div', { class: 'lesson-list' },
          ...u.lessons.map((l) => {
            const done = isDone(l.id);
            const isNext = next?.lesson.id === l.id;
            const rec = state.completed[l.id];
            return h('a', { class: `lesson-row${done ? ' done' : ''}${isNext ? ' next' : ''}`, href: `#/lesson/${l.id}` },
              h('span', { class: 'status' }, done ? '✓' : isNext ? '▶' : '○'),
              h('span', { class: 'lesson-text' },
                h('span', { class: 'lesson-title' }, l.title),
                h('span', { class: 'lesson-summary' }, l.summary),
              ),
              h('span', { class: 'lesson-meta' }, rec ? RATING_LABEL[rec.rating] : `${l.minutes} min`),
            );
          }),
        ),
      );
    }),
  );
  if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: 'start' }));
  return { el };
}
