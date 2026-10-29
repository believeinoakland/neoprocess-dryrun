// alpha: arithmetic for the dry run's toy product.

// The value as a message shows it: a string in quotes, anything else as written. Showing it never
// throws, whatever the value's getters or traps do, so the refusal stays a TypeError (R4, R5, R9).
function shown(x) {
  if (typeof x === 'string') return `'${x}'`;
  if (typeof x === 'bigint') return `${x}n`;
  if (typeof x === 'function') return '[function]';
  if (x === null || typeof x !== 'object') return String(x);
  try {
    return Array.isArray(x) ? JSON.stringify(x) : Object.prototype.toString.call(x);
  } catch {
    return '[object]';
  }
}

// `who: <place> is not a finite number: <value>`, the place counted from 1 (N2).
function finite(x, who, place) {
  if (typeof x !== 'number' || !Number.isFinite(x)) throw new TypeError(`${who}: ${place} is not a finite number: ${shown(x)}`);
  return x;
}

// R1, R5: a + b for finite numbers; anything else throws.
export function add(a, b) {
  return finite(a, 'add', 'argument 1') + finite(b, 'add', 'argument 2');
}

// R3–R4: left to right, 0 for an empty list; a non-finite element throws.
// Elements are checked, then added as `add` adds them. A running total that overflows to
// ±Infinity is carried on, not refused, since every element is finite (job record Q2).
export function sum(list) {
  let t = 0, i = 0;
  for (const x of list) t += finite(x, 'sum', `element ${++i}`);
  return t;
}

// R8–R9: left to right, 1 for an empty list (QUESTION #1: the identity of multiplication);
// a non-finite element throws, and a running total that overflows is carried on, as in `sum`.
export function product(list) {
  let t = 1, i = 0;
  for (const x of list) t *= finite(x, 'product', `element ${++i}`);
  return t;
}
