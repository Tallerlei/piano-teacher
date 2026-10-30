import { exportProgress, importProgress, resetProgress, save, state } from '../state';
import { h } from '../ui';
import type { View } from './view';

export function settingsView(): View {
  const toggle = (label: string, help: string, get: () => boolean, set: (v: boolean) => void) => {
    const cb = h('input', { type: 'checkbox' }) as HTMLInputElement;
    cb.checked = get();
    cb.addEventListener('change', () => {
      set(cb.checked);
      save();
    });
    return h('label', { class: 'setting' }, cb, h('span', {}, h('b', {}, label), h('small', {}, help)));
  };

  const name = h('input', { type: 'text', value: state.name, placeholder: 'Your first name', maxlength: '30' }) as HTMLInputElement;
  name.addEventListener('change', () => {
    state.name = name.value.trim();
    save();
  });

  const exportBtn = h('button', { class: 'btn ghost' }, 'Download backup');
  exportBtn.addEventListener('click', () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: 'piano-teacher-progress.json' });
    a.click();
    URL.revokeObjectURL(a.href);
  });
  const fileInput = h('input', { type: 'file', accept: 'application/json,.json', class: 'hidden' }) as HTMLInputElement;
  fileInput.addEventListener('change', async () => {
    const f = fileInput.files?.[0];
    if (!f) return;
    try {
      importProgress(await f.text());
      alert('Progress restored!');
      location.hash = '#/';
    } catch (e) {
      alert(`Could not restore: ${(e as Error).message}`);
    }
  });
  const importBtn = h('button', { class: 'btn ghost' }, 'Restore backup');
  importBtn.addEventListener('click', () => fileInput.click());
  const resetBtn = h('button', { class: 'btn danger' }, 'Reset all progress');
  resetBtn.addEventListener('click', () => {
    if (confirm('Really delete all your progress? This cannot be undone.')) {
      resetProgress();
      location.hash = '#/';
    }
  });

  const el = h('div', { class: 'page settings' },
    h('h1', {}, 'Settings'),
    h('section', { class: 'card' },
      h('h2', {}, 'About you'),
      h('label', { class: 'setting text' }, h('span', {}, h('b', {}, 'Name'), h('small', {}, 'So your teacher can greet you properly.')), name),
    ),
    h('section', { class: 'card' },
      h('h2', {}, 'Sheet music'),
      toggle('Show finger numbers', 'Small numbers telling you which finger to use.', () => state.settings.fingers, (v) => (state.settings.fingers = v)),
      toggle('Show note names', 'Letter names under the notes. Great for learning, but try to wean yourself off them!', () => state.settings.noteNames, (v) => (state.settings.noteNames = v)),
    ),
    h('section', { class: 'card' },
      h('h2', {}, 'Your progress'),
      h('p', {}, 'Progress is saved on this device only. Download a backup to move it to another device.'),
      h('div', { class: 'button-row' }, exportBtn, importBtn, resetBtn, fileInput),
    ),
    h('section', { class: 'card' },
      h('h2', {}, 'iPad tips'),
      h('ul', {},
        h('li', {}, 'Tap Share → “Add to Home Screen” to use Piano Teacher full-screen like an app.'),
        h('li', {}, 'No sound? Check the volume and, on older iPads, the silent switch.'),
        h('li', {}, 'Put the iPad on the music stand in landscape — everything is designed to be readable from the bench.'),
      ),
    ),
  );
  return { el };
}
