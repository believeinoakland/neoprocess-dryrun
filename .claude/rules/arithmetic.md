---
paths:
  - "alpha/**"
  - "beta/**"
  - "catalog/**"
---
# Arithmetic: the area's rules

1. A function of this area never coerces: a value that is not a finite number is refused with a `TypeError` (canon §2).
2. A reduction of an empty list yields its operation's identity and is never refused: `0` for a sum, `1` for a product (canon §3; L-ARITH-1).
