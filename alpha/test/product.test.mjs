import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as alpha from '../src/index.mjs';

// Finite numbers covering every class: zeros of both signs, subnormals, the extremes,
// fractions whose product rounds, integers beyond 2^53, and seeded random values.
const EDGES = [0, -0, 1, -1, 0.1, 0.2, 0.3, 1.5, -2.75, 2 ** 53, 2 ** 53 + 2, -(2 ** 53),
  Number.MIN_VALUE, -Number.MIN_VALUE, Number.EPSILON, Number.MAX_VALUE, -Number.MAX_VALUE,
  Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 1e-300, 1e300, 123456.789];
function* seeded(n, seed = 54321) {
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) % 2 ** 31;
    const scale = 10 ** ((s % 8) - 4);
    yield ((s / 2 ** 31) - 0.5) * scale;
  }
}
const FINITE = [...EDGES, ...seeded(200)];
const NOT_FINITE = () => ['1', '', NaN, Infinity, -Infinity, null, undefined, {}, [1], [], true, false, 1n,
  Symbol('x'), () => 1, new Number(1)];

const product = (list) => alpha.product(list);

test('R8 product multiplies the elements left to right, and returns 1 for an empty list', () => {
  // The empty product: 1, the identity of multiplication (the job's reading of R8, QUESTION #1).
  assert.ok(Object.is(product([]), 1));
  const leftToRight = (list) => list.reduce((t, x) => t * x, 1);
  for (const base of [EDGES, FINITE, [...FINITE].reverse()]) {
    for (let n = 1; n <= base.length; n++) {
      const list = base.slice(0, n);
      assert.ok(Object.is(product(list), leftToRight(list)), `product of ${n}`);
    }
  }
  for (const a of FINITE) assert.ok(Object.is(product([a]), 1 * a), `product([${a}])`);
  assert.equal(product([2, 3, 4]), 24);
  // Order matters: ordinary floating-point multiplication, each step rounded.
  assert.equal(product([0.1, 0.2]), 0.020000000000000004);
  assert.equal(product([1e308, 10, 1e-308]), Infinity);
  assert.equal(product([1e-308, 10, 1e308]), 1e308 * (1e-308 * 10));
  assert.ok(Object.is(product([-0]), -0));
  assert.ok(Object.is(product([-1, 0]), -0));
  assert.ok(Object.is(product([Number.MAX_VALUE, Number.MAX_VALUE, 0]), NaN)); // an overflowed running total is carried
  assert.equal(product([Number.MAX_VALUE, 2, -1]), -Infinity);
});

test('R9 product throws a TypeError for an element that is not a finite number, coercing and skipping nothing', () => {
  for (const bad of NOT_FINITE()) {
    for (const list of [[bad], [bad, 1], [1, bad], [1, bad, 2], [0, bad], [...FINITE, bad]]) {
      assert.throws(() => product(list), TypeError, `${typeof bad} in a list of ${list.length}`);
    }
  }
});

test('R2 product is pure: no state, no input or output', () => {
  const globalsBefore = Object.getOwnPropertyNames(globalThis).sort();
  const writes = [];
  const out = process.stdout.write, err = process.stderr.write;
  process.stdout.write = (...a) => { writes.push(a); return true; };
  process.stderr.write = (...a) => { writes.push(a); return true; };
  let first, again;
  try {
    const run = () => FINITE.map((_, i) => product(FINITE.slice(i, i + 5)));
    first = run();
    for (const a of FINITE) { product([a, a]); assert.throws(() => product([a, NaN])); }
    again = run();
  } finally {
    process.stdout.write = out; process.stderr.write = err;
  }
  assert.deepEqual(again, first);
  assert.deepEqual(writes, []);
  assert.deepEqual(Object.getOwnPropertyNames(globalThis).sort(), globalsBefore);
  const list = [1, 2, 3];
  product(list);
  assert.deepEqual(list, [1, 2, 3]);
});
