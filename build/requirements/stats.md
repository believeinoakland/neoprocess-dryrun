# stats — requirements

**Status** · The dry run's toy module (PROCESS-MECHANICS §15). Extracted from `legacy`: `mean` in D3; `max` and `min` in D4, met in D4; `distinct` from `catalog` and `legacy` in D5, where R9 is not yet met (entry N11).

## Public

### Purpose

Statistics over lists of numbers.

### Provides

**mean(list) → number**
- **R1** Returns the arithmetic mean of the numbers in a non-empty `list`, computed as `alpha.sum(list) / list.length`; refuses an empty `list` with a `RangeError`, as `max` does (R5; `requirements/statistics.md` §2), the empty list judged before any element (ask A4).
- **R2** Refuses an element that is not a finite number as `alpha.sum` does.

**max(list) → number**
- **R4** Returns the largest number in a non-empty `list`.
- **R5** Refuses an empty `list` with a `RangeError` (D3's N8: `legacy.max([])` returned `-Infinity`).

**min(list) → number**
- **R6** Returns the smallest number in a non-empty `list`.
- **R7** Refuses an empty `list` with a `RangeError`.

**max and min, both**
- **R8** Refuse an element that is not a finite number with a `TypeError`, coercing and skipping nothing; an empty list is refused first (R5, R7). `-0` and `+0` compare as `Math.max` and `Math.min` compare them. (stats QUESTION 1, D4.)

**distinct(list) → boolean**
- **R9** `true` when no two elements of `list` are the same value (as a `Set` compares them), else `false`; an empty list is distinct.

**median(list) → number** (written ahead for N1; met by stats's job)
- **R10** Returns the middle element of `list` sorted ascending when its length is odd; the list itself is not changed. `-0` and `+0` are equal in that order and equal elements keep their order in `list`, so `median([0, -0, 1])` is `-0` and `median([-0, 0, 1])` is `0`. (Wording clarified by BOB after STATS #1's finding in its first report.)
- **R11** For an even length, the value midway between the two middle elements (taken in ascending order as R10 sorts), computed as the Statistics canon defines (`requirements/statistics.md` §3; L-STATISTICS-1): `alpha.midpoint` of the two; refuses an empty list with a `RangeError` and a non-finite element with a `TypeError`, as `max` does (R5, R8).

## Private

### Uses

- `alpha.sum`.
- `alpha.midpoint` (from the completion round, ask A5).

### Invariants

- **R3** Pure: no state, no input or output.

### Satisfies

- `requirements/statistics.md` §1, §2, §3; the dry run N1.
