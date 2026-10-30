import { playChordNow, unlockAudio } from './music/audio';
import { createKeyboard, keyboardRange, type KeyMark } from './music/keyboard';
import { parsePitch } from './music/theory';
import type { Hand } from './music/types';
import type { Shape } from './content/types';

type Child = Node | string | null | undefined | false;

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const c of children) if (c !== null && c !== undefined && c !== false && c !== '') e.append(c);
  return e;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}

/** Tiny markdown subset: paragraphs, "- " lists, "1. " lists, "> " teacher tips, "| a | b |" tables, **bold**, *italic*. */
export function markdown(src: string): HTMLElement {
  const box = h('div', { class: 'md' });
  const blocks = src.trim().split(/\n\s*\n/);
  let html = '';
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim());
    if (lines.every((l) => l.startsWith('- '))) {
      html += `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
    } else if (lines.every((l) => /^\d+\. /.test(l))) {
      html += `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
    } else if (lines.every((l) => l.startsWith('>'))) {
      html += `<aside class="tip">${inline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '))}</aside>`;
    } else if (lines.every((l) => l.startsWith('|'))) {
      const rows = lines.filter((l) => !/^\|[\s:|-]+\|$/.test(l)).map((l) => l.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim())));
      const [head, ...body] = rows;
      html += `<table><thead><tr>${head!.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    } else {
      html += `<p>${inline(lines.join(' '))}</p>`;
    }
  }
  box.innerHTML = html;
  return box;
}

function parseShapeNotes(src: string | undefined, hand: Hand): { midi: number; mark: KeyMark }[] {
  if (!src) return [];
  return src.trim().split(/\s+/).map((tok) => {
    const [note, label] = tok.split(':');
    return { midi: parsePitch(note).midi, mark: { hand, label: label || undefined } };
  });
}

/** A keyboard diagram for a chord or hand position; tap it to hear it. */
export function shapeView(shape: Shape, compact = false): HTMLElement {
  const notes = [...parseShapeNotes(shape.lh, 'lh'), ...parseShapeNotes(shape.rh, 'rh')];
  const midis = notes.map((n) => n.midi);
  const [low, high] = keyboardRange(midis, compact ? 1 : 2, 4);
  const kb = createKeyboard(low, high);
  kb.setMarks(new Map(notes.map((n) => [n.midi, n.mark])));
  const box = h('button', { class: `shape${compact ? ' compact' : ''}`, title: 'Tap to hear' },
    kb.el,
    shape.caption ? h('div', { class: 'shape-caption' }, shape.caption, h('span', { class: 'hear' }, ' 🔊')) : h('span', { class: 'hear corner' }, '🔊'),
  );
  box.addEventListener('click', async () => {
    await unlockAudio();
    playChordNow(midis, !!shape.arpeggiate);
    const active = new Map(notes.map((n) => [n.midi, n.mark.hand as Hand]));
    kb.setActive(active);
    setTimeout(() => kb.setActive(new Map()), shape.arpeggiate ? 1600 : 900);
  });
  return box;
}
