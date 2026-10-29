import { test } from 'node:test';
import assert from 'node:assert/strict';
import { midpoint } from '../src/index.mjs';

// Finite numbers covering every class: zeros of both signs, subnormals, the boundary of the normal
// range, the extremes, fractions, integers beyond 2^53, and seeded random values of every magnitude.
const EDGES = [0, -0, 1, -1, 0.1, 0.2, 0.3, 1.5, -2.75, 2 ** 53, 2 ** 53 + 2, -(2 ** 53),
  Number.MIN_VALUE, -Number.MIN_VALUE, 2 * Number.MIN_VALUE, 3 * Number.MIN_VALUE, -5 * Number.MIN_VALUE,
  2 ** -1022, -(2 ** -1022), 2 ** -1022 - Number.MIN_VALUE, 2 ** -1021, 2 ** -1021 + Number.MIN_VALUE,
  Number.EPSILON, Number.MAX_VALUE, -Number.MAX_VALUE, Number.MAX_VALUE / 2, 2 ** 1023, 2 ** 971,
  Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 1e-300, 1e300, 123456.789];
function* seeded(n, seed = 24680) {
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) % 2 ** 31;
    yield ((s / 2 ** 31) - 0.5) * 10 ** ((s % 600) - 300);
  }
}
const FINITE = [...EDGES, ...seeded(200)];

// The exact value of a finite number, in units of 2^-1074, from its bits.
function units(x) {
  const v = new DataView(new ArrayBuffer(8));
  v.setFloat64(0, x);
  const hi = v.getUint32(0), lo = v.getUint32(4);
  const e = (hi >>> 20) & 0x7ff, f = (BigInt(hi & 0xfffff) << 32n) | BigInt(lo);
  const m = e === 0 ? f : (f | (1n << 52n)) << BigInt(e - 1);
  return hi >>> 31 ? -m : m;
}
// The number nearest n * 2^-1075, ties to even: the exact midpoint rounded once.
function roundHalfUnits(n, negZero) {
  if (n === 0n) return negZero ? -0 : 0;
  const neg = n < 0n, s = neg ? -n : n;
  const q = Math.max(s.toString(2).length - 1 - 1075 - 52, -1074), shift = BigInt(q + 1075);
  let k = s >> shift;
  const rest = s - (k << shift), half = 1n << (shift - 1n);
  if (rest > half || (rest === half && (k & 1n))) k += 1n;
  const r = q >= -1022 ? Number(k) * 2 ** q : Number(k) * 2 ** (q + 1074) * Number.MIN_VALUE;
  return neg ? -r : r;
}
const exactMidpoint = (a, b) => roundHalfUnits(units(a) + units(b), Object.is(a + b, -0));

test('R10 midpoint is the exact (a + b) / 2 rounded once, to nearest, ties to even, for every pair of finite numbers in each class', () => {
  for (const a of FINITE) {
    for (const b of FINITE) {
      const m = midpoint(a, b);
      assert.ok(Object.is(m, exactMidpoint(a, b)), `midpoint(${a}, ${b}) = ${m}`);
      assert.ok(Number.isFinite(m), `midpoint(${a}, ${b}) is finite`);
    }
  }
  // R10's own examples, where (a + b) / 2 overflows and a / 2 + b / 2 underflows.
  assert.equal(midpoint(Number.MAX_VALUE, Number.MAX_VALUE), Number.MAX_VALUE);
  assert.equal(midpoint(Number.MIN_VALUE, Number.MIN_VALUE), Number.MIN_VALUE);
  assert.equal(midpoint(-Number.MAX_VALUE, -Number.MAX_VALUE), -Number.MAX_VALUE);
  assert.ok(Object.is(midpoint(-Number.MAX_VALUE, Number.MAX_VALUE), 0));
  assert.equal(midpoint(Number.MAX_VALUE, 2 ** 1023), 1.5 * 2 ** 1023);
  // Subnormal ties go to the even neighbour: 0.5, 1.5 and 2.5 units of 2^-1074.
  assert.ok(Object.is(midpoint(Number.MIN_VALUE, 0), 0));
  assert.equal(midpoint(Number.MIN_VALUE, 2 * Number.MIN_VALUE), 2 * Number.MIN_VALUE);
  assert.equal(midpoint(2 * Number.MIN_VALUE, 3 * Number.MIN_VALUE), 2 * Number.MIN_VALUE);
  assert.equal(midpoint(-3 * Number.MIN_VALUE, 0), -2 * Number.MIN_VALUE);
  // Ordinary values.
  assert.equal(midpoint(2, 4), 3);
  assert.equal(midpoint(1, 2), 1.5);
  assert.equal(midpoint(-7, 7), 0);
});

// Every kind of value that is not a finite number.
const NOT_FINITE = () => ['1', '', NaN, Infinity, -Infinity, null, undefined, {}, [1], [], true, false, 1n,
  Symbol('x'), () => 1, new Number(1),
  // Values whose inspection throws: the refusal is still a TypeError.
  { get [Symbol.toStringTag]() { throw new RangeError(); } },
  new Proxy({}, { get() { throw new SyntaxError(); }, getPrototypeOf() { throw new SyntaxError(); } }),
  (() => { const r = Proxy.revocable([], {}); r.revoke(); return r.proxy; })()];

test('R11 midpoint throws a TypeError when either argument is not a finite number, coercing nothing', () => {
  for (const bad of NOT_FINITE()) {
    for (const ok of [0, -1, 2.5, Number.MAX_VALUE, Number.MIN_VALUE]) {
      assert.throws(() => midpoint(bad, ok), TypeError, `midpoint(${typeof bad}, ${ok})`);
      assert.throws(() => midpoint(ok, bad), TypeError, `midpoint(${ok}, ${typeof bad})`);
    }
    for (const bad2 of NOT_FINITE()) assert.throws(() => midpoint(bad, bad2), TypeError);
  }
  const says = (f, message) => assert.throws(f, (e) => e instanceof TypeError && e.message === message, message);
  says(() => midpoint('1', 2), "midpoint: argument 1 is not a finite number: '1'");
  says(() => midpoint(1, Infinity), 'midpoint: argument 2 is not a finite number: Infinity');
});

test('R2 midpoint is pure: no state, no input or output', () => {
  const globalsBefore = Object.getOwnPropertyNames(globalThis).sort();
  const writes = [];
  const out = process.stdout.write, err = process.stderr.write;
  process.stdout.write = (...a) => { writes.push(a); return true; };
  process.stderr.write = (...a) => { writes.push(a); return true; };
  let first, again;
  try {
    const run = () => FINITE.map((a, i) => midpoint(a, FINITE[(i * 7) % FINITE.length]));
    first = run();
    for (const a of FINITE) { midpoint(a, a); assert.throws(() => midpoint(a, NaN)); }
    again = run();
  } finally {
    process.stdout.write = out; process.stderr.write = err;
  }
  assert.deepEqual(again, first);
  assert.deepEqual(writes, []);
  assert.deepEqual(Object.getOwnPropertyNames(globalThis).sort(), globalsBefore);
});
