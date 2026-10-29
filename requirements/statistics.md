# Statistics: the area's canon

Owned by lane STATISTICS. Cited by `build/requirements/stats.md` by section (P5). A section is added or changed only by the lane's decision (`build/lanes/STATISTICS/decisions.md`).

## §1 Statistics of a list

A statistic is a pure function of a list of numbers (Arithmetic §1), computed with the Arithmetic area's operations, so its rounding is theirs.

## §2 Refusals

A statistic that has no value for an empty list refuses it with a `RangeError`; an element that is not a finite number is refused as Arithmetic §2 refuses it, the empty list judged first.

## §3 The midpoint of two numbers

The value midway between two numbers `a` and `b` is the Arithmetic midpoint (Arithmetic §4): the exact value of `(a + b) / 2` rounded once, to nearest, ties to even, a finite number whenever `a` and `b` are, and refused as Arithmetic §2 refuses. A statistic that needs it (the median of an even-length list, at its two middle elements) uses that operation and never composes one from a sum and a halving: `(a + b) / 2` overflows to an infinity when `a + b` does, and `a / 2 + b / 2` rounds twice. (ask A5.)
