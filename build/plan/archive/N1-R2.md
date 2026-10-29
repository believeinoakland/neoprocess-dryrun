# Plan: neoProcess dry run N1

**Status** · OPEN. The completion round of N1 (P10; rulebook PLN 7): one job per closed-layer module with work found in the round before, alpha first, since stats uses the service alpha adds. Do exactly what each entry says and say in your report what each one did. A message to BOB is always: write your wait in your record (`neo job state --set "WAITING: …"`), push, then send.

## Layer 1

**alpha**
- N13 · Add `midpoint(a, b) → number` meeting R10 and R11 (ask A5; the Arithmetic canon §4, L-ARITH-2): the exact value of `(a + b) / 2` rounded once, to nearest, ties to even, finite whenever `a` and `b` are. Test it at the interface on both of R10's examples, on `midpoint(-Number.MAX_VALUE, Number.MAX_VALUE)`, on a pair whose exact midpoint is a subnormal tie, and on R11's refusals.

## Layer 2

**stats**
- N14 · Meet R11 as it now reads (ask A5; L-STATISTICS-1): the even-length median is `alpha.midpoint` of the two middle elements. Test the even-length case (N10's CHANGE), the review's gap among them (`median([Number.MAX_VALUE, Number.MAX_VALUE])` is `Number.MAX_VALUE`), and strike R11's mark.