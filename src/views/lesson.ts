import { allLessons, findLesson } from '../content';
import { createPlayer, type PlayerHandle } from '../player';
import { completeLesson, save, state, type Rating } from '../state';
import { h, markdown, shapeView } from '../ui';
import type { View } from './view';

const PRAISE: Record<Rating, string> = {
  tricky: 'That’s completely normal — tricky means you’re learning. I’ll bring this back for review in your practice plan. Keep going!',
  good: 'Well done! Play it once more tomorrow and it will really stick.',
  easy: 'Excellent — you’re flying! On to the next challenge.',
};

export function lessonView(id: string): View {
  const ref = findLesson(id);
  if (!ref) return { el: h('div', { class: 'page' }, h('h1', {}, 'Lesson not found'), h('a', { href: '#/course' }, 'Back to the course')) };
  const { lesson, unit, unitIndex } = ref;
  let step = Math.min(state.stepIndex[id] ?? 0, lesson.steps.length - 1);
  let player: PlayerHandle | null = null;

  const teacher = h('aside', { class: 'teacher-pane' });
  const work = h('section', { class: 'work-pane' });
  const el = h('div', { class: 'lesson' }, teacher, work);

  const go = (n: number) => {
    step = Math.max(0, Math.min(lesson.steps.length - 1, n));
    state.stepIndex[id] = step;
    state.lastLesson = id;
    save();
    render();
  };

  const render = () => {
    const s = lesson.steps[step];
    const isLast = step === lesson.steps.length - 1;
    const lessonNo = unit.lessons.indexOf(lesson) + 1;

    const dots = h('div', { class: 'step-dots' },
      ...lesson.steps.map((st, i) => {
        const b = h('button', { class: `dot${i === step ? ' current' : ''}${i < step ? ' seen' : ''}`, title: st.title, 'aria-label': `Step ${i + 1}: ${st.title}` });
        b.addEventListener('click', () => go(i));
        return b;
      }),
    );

    const tasks = s.tasks?.length
      ? h('div', { class: 'tasks' },
          h('div', { class: 'tasks-title' }, 'Practice tasks'),
          ...s.tasks.map((t) => {
            const cb = h('input', { type: 'checkbox' });
            return h('label', { class: 'task' }, cb, h('span', {}, t));
          }),
        )
      : null;

    const finish = isLast ? finishBlock() : null;

    const back = h('button', { class: 'btn ghost' }, '← Back');
    back.toggleAttribute('disabled', step === 0);
    back.addEventListener('click', () => go(step - 1));
    const nextBtn = h('button', { class: 'btn primary' }, 'Next →');
    nextBtn.addEventListener('click', () => go(step + 1));

    teacher.replaceChildren(
      h('div', { class: 'teacher-scroll' },
        h('div', { class: 'crumbs' }, h('a', { href: `#/course#${unit.id}` }, `Unit ${unitIndex + 1} · ${unit.title}`), ` · Lesson ${lessonNo}`),
        h('h1', { class: 'lesson-title' }, lesson.title),
        dots,
        h('div', { class: 'bubble' },
          h('h2', {}, s.title),
          markdown(s.text),
        ),
        tasks,
        finish,
      ),
      h('div', { class: 'step-nav' }, back, h('span', { class: 'step-count' }, `${step + 1} / ${lesson.steps.length}`), isLast ? h('span', {}) : nextBtn),
    );
    teacher.querySelector('.teacher-scroll')?.scrollTo(0, 0);

    player?.destroy();
    player = null;
    if (s.piece) {
      player = createPlayer(s.piece);
      work.replaceChildren(player.el);
    } else if (s.shapes?.length) {
      work.replaceChildren(h('div', { class: `shapes count-${s.shapes.length}` }, ...s.shapes.map((sh) => shapeView(sh))), h('p', { class: 'hint' }, 'Tap a keyboard to hear it, then play it on your piano.'));
    } else {
      work.replaceChildren(h('div', { class: 'placeholder' }, h('div', { class: 'placeholder-icon' }, unit.icon), h('p', {}, 'Read through the notes on the left, then tap Next.')));
    }
  };

  const finishBlock = () => {
    const box = h('div', { class: 'finish' });
    const rec = state.completed[id];
    const ask = () => {
      box.replaceChildren(
        h('div', { class: 'finish-title' }, rec ? 'Practised this again? How did it go?' : 'Finished? How did this lesson go?'),
        h('div', { class: 'rating' },
          ...(['tricky', 'good', 'easy'] as Rating[]).map((r) => {
            const b = h('button', { class: `btn rate ${r}` }, r === 'tricky' ? '😅 Still tricky' : r === 'good' ? '🙂 Got it' : '🤩 Easy');
            b.addEventListener('click', () => {
              completeLesson(id, r);
              state.stepIndex[id] = 0;
              save();
              done(r);
            });
            return b;
          }),
        ),
      );
    };
    const done = (r: Rating) => {
      const nextRef = allLessons[ref.index + 1];
      box.replaceChildren(
        h('div', { class: 'finish-title' }, 'Lesson complete! 🎉'),
        h('p', {}, PRAISE[r]),
        h('div', { class: 'finish-actions' },
          nextRef ? h('a', { class: 'btn primary', href: `#/lesson/${nextRef.lesson.id}` }, `Next: ${nextRef.lesson.title} →`) : h('a', { class: 'btn primary', href: '#/songs' }, 'Open the Songbook'),
          h('a', { class: 'btn ghost', href: '#/' }, 'Home'),
        ),
      );
    };
    ask();
    return box;
  };

  render();
  return {
    el,
    practising: true,
    destroy() {
      player?.destroy();
    },
  };
}
