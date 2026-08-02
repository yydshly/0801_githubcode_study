import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, getScrollProgress } from '../src/utils/scrollProgress.js';

test('clamp keeps normalized progress within the timeline bounds', () => {
  assert.equal(clamp(-0.2), 0);
  assert.equal(clamp(0.42), 0.42);
  assert.equal(clamp(1.4), 1);
});

test('getScrollProgress normalizes scroll position against the document runway', () => {
  const documentLike = { documentElement: { scrollHeight: 2500 } };
  const windowLike = { innerHeight: 1000, scrollY: 750 };

  assert.equal(getScrollProgress(documentLike, windowLike), 0.5);
  assert.equal(getScrollProgress(documentLike, { ...windowLike, scrollY: 5000 }), 1);
});
