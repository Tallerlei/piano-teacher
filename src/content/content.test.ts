import { describe, expect, it } from 'vitest';
import { allLessons, allPieces } from './index';
import { parsePiece } from '../music/parse';
import { buildTimeline } from '../music/audio';
import { parsePitch } from '../music/theory';

describe('course content', () => {
  it('has unique lesson ids', () => {
    const ids = allLessons.map((r) => r.lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique piece ids', () => {
    const ids = allPieces.map((p) => p.piece.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every lesson has at least one step with text', () => {
    for (const { lesson } of allLessons) {
      expect(lesson.steps.length, lesson.id).toBeGreaterThan(0);
      for (const s of lesson.steps) expect(s.text.trim().length, `${lesson.id}: ${s.title}`).toBeGreaterThan(20);
    }
  });

  it('every chord shape has valid pitches and fingers', () => {
    for (const { lesson } of allLessons) {
      for (const s of lesson.steps) {
        for (const shape of s.shapes ?? []) {
          for (const text of [shape.rh, shape.lh]) {
            for (const tok of (text ?? '').split(/\s+/).filter(Boolean)) {
              const [p, f] = tok.split(':');
              expect(() => parsePitch(p!), `${lesson.id}: ${tok}`).not.toThrow();
              if (f !== undefined) expect(f, `${lesson.id}: ${tok}`).toMatch(/^([1-5]|[A-G][#b♯♭]?\d?)$/);
            }
          }
        }
      }
    }
  });

  for (const { piece } of allPieces) {
    describe(piece.id, () => {
      it('parses with complete bars in both hands', () => {
        expect(() => parsePiece(piece)).not.toThrow();
      });

      it('has a finger for every note when fingering is given', () => {
        const parsed = parsePiece(piece);
        for (const e of parsed.events) {
          if (e.fingers.length) expect(e.fingers.length, `${e.id} ${e.pitches.map((p) => p.name).join(' ')}`).toBe(e.pitches.length);
          for (const f of e.fingers) expect(f).toBeGreaterThanOrEqual(1);
          for (const f of e.fingers) expect(f).toBeLessThanOrEqual(5);
        }
      });

      it('stays within a playable range and resolves ties', () => {
        const parsed = parsePiece(piece);
        const timeline = buildTimeline(parsed);
        expect(timeline.length).toBeGreaterThan(0);
        for (const n of timeline) {
          expect(n.midi).toBeGreaterThanOrEqual(parsePitch('A0').midi);
          expect(n.midi).toBeLessThanOrEqual(parsePitch('C8').midi);
          expect(n.end).toBeGreaterThan(n.start);
        }
        for (const e of parsed.events.filter((ev) => ev.tie)) {
          const next = parsed.events.find((n) => n.hand === e.hand && Math.abs(n.start - (e.start + e.beats)) < 1e-6 && n.pitches.length);
          expect(next, `tie from ${e.id} needs a following note`).toBeDefined();
          for (const p of e.pitches) expect(next!.pitches.map((q) => q.midi), `tie from ${e.id}`).toContain(p.midi);
        }
      });
    });
  }
});
