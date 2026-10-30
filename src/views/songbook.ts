import { allPieces, findPiece, warmups } from '../content';
import { createPlayer } from '../player';
import { isDone } from '../progress';
import { h } from '../ui';
import type { View } from './view';

const STYLE_ORDER = ['Pop', 'Rock', 'Ballad', 'Blues', 'Soul', 'Folk', 'Classical'];

export function songbookView(): View {
  // melody-only versions are stepping stones; the full arrangement is listed instead
  const songs = allPieces.filter((p) => p.piece.style && p.piece.style !== 'Exercise' && p.lesson && !/ — (melody|right hand|left hand)$/.test(p.piece.title));
  const grouped = STYLE_ORDER.map((style) => ({ style, items: songs.filter((s) => s.piece.style === style) })).filter((g) => g.items.length);

  const el = h('div', { class: 'page songbook' },
    h('h1', {}, 'Songbook'),
    h('p', { class: 'lead' }, 'Every song and groove from the course in one place. Songs from lessons you haven’t reached yet are marked — have a peek, but they’ll make more sense in order.'),
    ...grouped.map((g) =>
      h('section', {},
        h('h2', {}, g.style),
        h('div', { class: 'cards' },
          ...g.items.map((p) => {
            const locked = p.lesson && !isDone(p.lesson.lesson.id);
            return h('a', { class: `song-card${locked ? ' later' : ''}`, href: `#/play/${p.piece.id}` },
              h('div', { class: 'song-title' }, p.piece.title),
              h('div', { class: 'song-meta' }, `${p.piece.composer ?? ''}${p.piece.composer ? ' · ' : ''}Key of ${p.piece.key}`),
              p.lesson ? h('div', { class: 'song-lesson' }, `${locked ? '🔒 ' : '✓ '}Unit ${p.lesson.unitIndex + 1}: ${p.lesson.lesson.title}`) : null,
            );
          }),
        ),
      ),
    ),
    h('section', {},
      h('h2', {}, 'Warm-ups & technique'),
      h('div', { class: 'cards' },
        ...warmups.map((w) =>
          h('a', { class: 'song-card warm', href: `#/play/${w.piece.id}` },
            h('div', { class: 'song-title' }, w.piece.title),
            h('div', { class: 'song-meta' }, w.focus),
          ),
        ),
      ),
    ),
  );
  return { el };
}

export function playView(id: string): View {
  const ref = findPiece(id);
  if (!ref) return { el: h('div', { class: 'page' }, h('h1', {}, 'Piece not found'), h('a', { href: '#/songs' }, 'Back to the Songbook')) };
  const player = createPlayer(ref.piece);
  const warm = warmups.find((w) => w.piece.id === id);
  const el = h('div', { class: 'play-page' },
    h('div', { class: 'play-top' },
      h('a', { class: 'btn ghost', href: warm ? '#/' : '#/songs' }, '← Back'),
      warm ? h('span', { class: 'play-note' }, `Warm-up: ${warm.focus} Start slowly, then speed up.`) : null,
      ref.lesson ? h('a', { class: 'btn ghost', href: `#/lesson/${ref.lesson.lesson.id}` }, `Open lesson: ${ref.lesson.lesson.title}`) : null,
    ),
    player.el,
  );
  return { el, practising: true, destroy: () => player.destroy() };
}
