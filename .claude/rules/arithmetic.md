---
paths:
  - "alpha/**"
  - "beta/**"
  - "catalog/**"
---
# Arithmetic: the area's rules

1. A function of this area never coerces: a value that is not a finite number is refused with a `TypeError` (canon §2).
2. A reduction of an empty list yields its operation's identity and is never refused: `0` for a sum, `1` for a product (canon §3; L-ARITH-1).
3. The midpoint of two numbers is the exact value of `(a + b) / 2` rounded once, and is finite whenever they are; it is never computed as the floating-point `(a + b) / 2` (it overflows) or `a / 2 + b / 2` (it rounds twice) (canon §4; L-ARITH-2).
