# Onboarding survey

Written by `proc init --mode convert` from git alone (ONBOARDING §2, step 1): where the project stands before it comes under the process. Helpers read the code and documents in full from here (P20).

## Directories

| directory | files | code files | kinds |
| --- | --- | --- | --- |
| `.` | 2 | 0 | .md 2 |
| `.claude` | 4 | 0 | .md 3, .json 1 |
| `.github` | 2 | 0 | .yml 2 |
| `alpha` | 4 | 4 | .mjs 4 |
| `beta` | 4 | 3 | .mjs 3, .txt 1 |
| `catalog` | 1 | 1 | .mjs 1 |
| `legacy` | 3 | 2 | .mjs 2, .txt 1 |
| `stats` | 2 | 2 | .mjs 2 |

## What builds and tests it

- package manifests: none found
- test directories: `alpha/test/`, `beta/test/`, `stats/test/`
- workflows: `.github/workflows/gate.yml`, `.github/workflows/prune.yml`
- deploy and service configuration: none found (read for the grant list, step 3)

## The legacy modules proposed (`build/modules.json`)

- `alpha`: `alpha/`
- `beta`: `beta/`
- `catalog`: `catalog/`
- `legacy`: `legacy/`
- `stats`: `stats/`
