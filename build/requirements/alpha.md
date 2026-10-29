# alpha — requirements

**Status** · The dry run's toy module (PROCESS-MECHANICS §15).

## Public

### Purpose

Arithmetic on numbers.

### Provides

**add(a, b) → number**
- **R1** Returns `a + b` for two finite numbers.

- **R5** `add` throws a `TypeError` when either argument is not a finite number, as `sum` does (R4); nothing is coerced. (Added by BOB during D3, confirming beta's REPORT 1: `add('1', 2)` returned `'12'`. In the real product this change of meaning goes to Bob, P17; in the dry run BOB records that it would have brought it to him, with the recommendation to add the refusal.)

**sum(list) → number** (added by BOB during D3, answering alpha's QUESTION on N1)
- **R3** Returns the elements of `list` added left to right with `add` (ordinary floating-point addition, not a correctly rounded or exact sum), and `0` for an empty list. The running total is carried as ordinary addition carries it, so a total that overflows is `Infinity` (R4 and R5 judge the elements, never the running total). (Clarified by BOB during D3, answering alpha's Q2.) (Wording clarified by BOB during D3 after beta's QUESTION 1: "exact" was ambiguous.)
- **R4** Throws a `TypeError` when an element is not a finite number (a non-number, `NaN` or an infinity); nothing is coerced or skipped.

**product(list) → number** (written ahead for N1; met by alpha's job)
- **R8** Returns the elements of `list` multiplied left to right (ordinary floating-point multiplication); the value for an empty list is `1`, the identity of multiplication, as the Arithmetic canon defines it (`requirements/arithmetic.md` §3; L-ARITH-1).
- **R9** Throws a `TypeError` when an element is not a finite number, as `sum` does (R4); nothing is coerced or skipped.

**midpoint(a, b) → number** (added by BOB for ask A5: the Statistics canon §3 needs the Arithmetic midpoint as one operation; met in the tranche's completion round)
- **R10** Returns the midpoint of two finite numbers `a` and `b` as the Arithmetic canon defines it (`requirements/arithmetic.md` §4; L-ARITH-2): the exact value of `(a + b) / 2` rounded once, to nearest, ties to even, a finite number whenever `a` and `b` are; so `midpoint(Number.MAX_VALUE, Number.MAX_VALUE)` is `Number.MAX_VALUE` and `midpoint(Number.MIN_VALUE, Number.MIN_VALUE)` is `Number.MIN_VALUE`.
- **R11** Throws a `TypeError` when either argument is not a finite number, as `add` does (R5); nothing is coerced.

## Private

### Uses

None.

### Invariants

- **R2** Pure: no state, no input or output.

### Satisfies

- `requirements/arithmetic.md` §1 (numbers), §2 (refusals), §3 (empty lists), §4 (the midpoint); the dry run N1.
