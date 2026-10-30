import { CHORD_QUALITIES, chordMidis, ROOTS, spellChord } from '../music/theory';
import { h, shapeView } from '../ui';
import type { View } from './view';

const INVERSIONS = ['Root position', '1st inversion', '2nd inversion', '3rd inversion'];

export function chordsView(): View {
  let root = 'C';
  let quality = 'maj';
  let inversion = 0;

  const display = h('div', { class: 'chord-display' });
  const rootRow = h('div', { class: 'chip-row' });
  const qualRow = h('div', { class: 'chip-row' });
  const invRow = h('div', { class: 'chip-row' });

  const chips = (row: HTMLElement, items: { value: string; label: string }[], current: () => string, set: (v: string) => void) => {
    row.replaceChildren(
      ...items.map((it) => {
        const b = h('button', { class: `chip${current() === it.value ? ' on' : ''}` }, it.label);
        b.addEventListener('click', () => {
          set(it.value);
          render();
        });
        return b;
      }),
    );
  };

  const render = () => {
    const q = CHORD_QUALITIES.find((c) => c.id === quality)!;
    const maxInv = q.intervals.length - 1;
    if (inversion > maxInv) inversion = 0;
    chips(rootRow, ROOTS.map((r) => ({ value: r, label: r.replace('#', '♯').replace('b', '♭') })), () => root, (v) => (root = v));
    chips(qualRow, CHORD_QUALITIES.map((c) => ({ value: c.id, label: c.label })), () => quality, (v) => (quality = v));
    chips(invRow, INVERSIONS.slice(0, maxInv + 1).map((l, i) => ({ value: String(i), label: l })), () => String(inversion), (v) => (inversion = Number(v)));

    const rhNotes = spellChord(root, quality, chordMidis(root, quality, inversion, 4));
    const bass = spellChord(root, quality, [chordMidis(root, quality, 0, 2)[0]])[0];
    const fingers = rhNotes.length === 3 ? [1, inversion === 1 ? 2 : 3, 5] : rhNotes.length === 4 ? [1, 2, 3, 5] : [1, 2, 3, 4, 5];
    const name = `${root}${q.suffix}`.replace('#', '♯').replace(/^([A-G])b/, '$1♭');
    display.replaceChildren(
      h('div', { class: 'chord-name' }, name),
      h('div', { class: 'chord-notes' }, rhNotes.map((n) => n.replace(/\d+$/, '').replace('#', '♯').replace(/([A-G])b/, '$1♭')).join(' – ')),
      h('p', { class: 'chord-desc' }, q.description),
      shapeView({ rh: rhNotes.map((n, i) => `${n}:${fingers[i]}`).join(' '), lh: `${bass}:5`, caption: `${name} — ${INVERSIONS[inversion].toLowerCase()} (tap to hear)` }),
    );
  };
  render();

  const el = h('div', { class: 'page chords' },
    h('h1', {}, 'Chord finder'),
    h('p', { class: 'lead' }, 'Look up any chord, see its shape and hear it. Numbers on the keys are suggested right-hand fingers.'),
    h('div', { class: 'chord-controls' },
      h('div', { class: 'label' }, 'Root'), rootRow,
      h('div', { class: 'label' }, 'Type'), qualRow,
      h('div', { class: 'label' }, 'Position'), invRow,
    ),
    display,
  );
  return { el };
}
