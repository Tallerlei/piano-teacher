import { allLessons, course } from '../content';
import { recommendedWarmup } from '../content/warmups';
import { currentUnitIndex, isDone, nextLesson, reviewLesson, unitProgress } from '../progress';
import { state, streak, today } from '../state';
import { h } from '../ui';
import type { View } from './view';

function greeting(): string {
  const hour = new Date().getHours();
  const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return state.name ? `${part}, ${state.name}!` : `${part}!`;
}

export function homeView(): View {
  const next = nextLesson();
  const review = reviewLesson();
  const warm = recommendedWarmup(currentUnitIndex());
  const doneCount = allLessons.filter((r) => isDone(r.lesson.id)).length;
  const minutesToday = Math.round((state.practice[today()] ?? 0) / 60);

  const teacherLine = !doneCount
    ? 'Welcome! I’ve planned your first lesson. Grab a seat at the piano and let’s begin.'
    : next
      ? `You’re doing great — ${doneCount} lesson${doneCount === 1 ? '' : 's'} done. Here’s today’s plan.`
      : 'You’ve finished the whole course. I’m proud of you! Keep your favourite songs fresh and explore the Songbook.';

  const plan = h('div', { class: 'plan' },
    h('a', { class: 'plan-card', href: `#/play/${warm.piece.id}` },
      h('div', { class: 'plan-step' }, '1 · Warm-up · 5 min'),
      h('div', { class: 'plan-title' }, warm.piece.title),
      h('div', { class: 'plan-text' }, warm.focus),
    ),
    next
      ? h('a', { class: 'plan-card main', href: `#/lesson/${next.lesson.id}` },
          h('div', { class: 'plan-step' }, `2 · ${state.stepIndex[next.lesson.id] ? 'Continue' : 'New lesson'} · ${next.lesson.minutes} min`),
          h('div', { class: 'plan-title' }, next.lesson.title),
          h('div', { class: 'plan-text' }, `Unit ${next.unitIndex + 1}: ${next.unit.title} — ${next.lesson.summary}`),
        )
      : h('a', { class: 'plan-card main', href: '#/songs' },
          h('div', { class: 'plan-step' }, '2 · Play'),
          h('div', { class: 'plan-title' }, 'Songbook'),
          h('div', { class: 'plan-text' }, 'Pick any song and polish it to performance level.'),
        ),
    review
      ? h('a', { class: 'plan-card', href: `#/lesson/${review.lesson.id}` },
          h('div', { class: 'plan-step' }, '3 · Review · 5–10 min'),
          h('div', { class: 'plan-title' }, review.lesson.title),
          h('div', { class: 'plan-text' }, state.completed[review.lesson.id].rating === 'tricky' ? 'You found this one tricky — let’s polish it.' : 'Keep it fresh: play it once more at full tempo.'),
        )
      : h('a', { class: 'plan-card', href: '#/songs' },
          h('div', { class: 'plan-step' }, '3 · Just for fun'),
          h('div', { class: 'plan-title' }, 'Play something you enjoy'),
          h('div', { class: 'plan-text' }, 'Finish with a song you like from the Songbook.'),
        ),
  );

  const units = h('div', { class: 'unit-strip' },
    ...course.map((u, i) => {
      const p = unitProgress(i);
      const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
      return h('a', { class: `unit-pill${i === currentUnitIndex() ? ' current' : ''}`, href: `#/course#${u.id}` },
        h('span', { class: 'unit-icon' }, u.icon),
        h('span', { class: 'unit-name' }, `${i + 1}. ${u.title}`),
        h('span', { class: 'bar' }, h('span', { class: 'fill', style: `width:${pct}%` })),
      );
    }),
  );

  const el = h('div', { class: 'page home' },
    h('section', { class: 'hero' },
      h('div', { class: 'teacher-avatar', 'aria-hidden': 'true' }, '🎹'),
      h('div', {},
        h('h1', {}, greeting()),
        h('p', { class: 'teacher-line' }, teacherLine),
      ),
      h('div', { class: 'stats' },
        h('div', { class: 'stat' }, h('b', {}, String(streak())), h('span', {}, 'day streak')),
        h('div', { class: 'stat' }, h('b', {}, String(minutesToday)), h('span', {}, 'min today')),
        h('div', { class: 'stat' }, h('b', {}, `${doneCount}/${allLessons.length}`), h('span', {}, 'lessons')),
      ),
    ),
    h('h2', {}, 'Today’s practice'),
    plan,
    h('h2', {}, 'Your journey'),
    units,
  );
  return { el };
}
