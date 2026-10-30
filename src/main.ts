import '@fontsource/noto-music/400.css';
import './style.css';
import { stopAllPlayback } from './player';
import { addPracticeSeconds, today, state } from './state';
import { h } from './ui';
import { chordsView } from './views/chords';
import { courseView } from './views/course';
import { homeView } from './views/home';
import { lessonView } from './views/lesson';
import { settingsView } from './views/settings';
import { playView, songbookView } from './views/songbook';
import type { View } from './views/view';

const TABS = [
  { href: '#/', label: 'Home', icon: '🏠', match: (p: string) => p === '/' },
  { href: '#/course', label: 'Course', icon: '🗺️', match: (p: string) => p.startsWith('/course') || p.startsWith('/lesson') },
  { href: '#/songs', label: 'Songbook', icon: '🎶', match: (p: string) => p.startsWith('/songs') || p.startsWith('/play') },
  { href: '#/chords', label: 'Chords', icon: '🎹', match: (p: string) => p.startsWith('/chords') },
  { href: '#/settings', label: 'Settings', icon: '⚙️', match: (p: string) => p.startsWith('/settings') },
];

const nav = h('nav', { class: 'tabs' });
const timerEl = h('span', { class: 'timer', title: 'Practice time today' });
const header = h('header', { class: 'topbar' },
  h('a', { class: 'brand', href: '#/' }, h('span', { class: 'brand-icon' }, '🎹'), 'Piano Teacher'),
  nav,
  timerEl,
);
const main = h('main', { class: 'content' });
document.getElementById('app')!.append(header, main);

let current: View | null = null;

function route(): View {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, anchor] = raw.split('#');
  const parts = path.split('/').filter(Boolean);
  switch (parts[0]) {
    case undefined:
      return homeView();
    case 'course':
      return courseView(anchor);
    case 'lesson':
      return lessonView(parts[1]);
    case 'songs':
      return songbookView();
    case 'play':
      return playView(parts[1]);
    case 'chords':
      return chordsView();
    case 'settings':
      return settingsView();
    default:
      return homeView();
  }
}

function render() {
  stopAllPlayback();
  current?.destroy?.();
  current = route();
  main.replaceChildren(current.el);
  main.scrollTo(0, 0);
  const path = (location.hash.replace(/^#/, '') || '/').split('#')[0];
  nav.replaceChildren(
    ...TABS.map((t) => h('a', { href: t.href, class: t.match(path) ? 'tab active' : 'tab' }, h('span', { class: 'tab-icon' }, t.icon), h('span', { class: 'tab-label' }, t.label))),
  );
  document.body.classList.toggle('in-lesson', path.startsWith('/lesson') || path.startsWith('/play'));
  updateTimer();
}

function updateTimer() {
  const min = Math.floor((state.practice[today()] ?? 0) / 60);
  timerEl.textContent = `⏱ ${min} min today`;
}

// count practice time while a lesson or piece is open and the app is visible
const TICK = 15;
setInterval(() => {
  if (current?.practising && document.visibilityState === 'visible') {
    addPracticeSeconds(TICK);
    updateTimer();
  }
}, TICK * 1000);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') stopAllPlayback();
});

window.addEventListener('hashchange', render);
render();
