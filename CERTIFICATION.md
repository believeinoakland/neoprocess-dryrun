# Certification of neoProcess (P3): the dry run N1

One row per path PROTOCOL §10, JOB-LIFE §13 and DESIGN-STAGE §5 name. A row is PROVEN by what git and GitHub show (an ask file's stages, a PR's comments and checks, a state-branch line, a metrics row), never by a session's report (P20). PLANNED names the entry or act that drives it. The process is certified only when every row reads PROVEN, or names the reason it can only be proven in a product run and the check that will prove it there.

## The protocol (PROTOCOL §10)

| # | path | driven by | evidence | status |
| --- | --- | --- | --- | --- |
| P1 | a job's QUESTION answered by BOB alone | alpha N6 | ask A2 (ALPHA #1's `QUESTION #3`, is N2's rewording a change of meaning) as the state branch read before E1's close: `**Route** · answered by BOB · the wording of an error message whose class and no-coercion rule R4, R5 fix is a wording matter, BOB's by mechanics §7`, `**Replied** · 2026-10-29`, `**Status** · CLOSED`; the same for A3 (BETA #1's `QUESTION 1` on N8 and rulebook BLD 5). No requirement file changed with either close | PROVEN |
| P2 | a job's QUESTION asked of a lane, decided, folded into a requirement, replied as a CHANGE the job merges | alpha N1 → ARITH | the ask's four stages; `requirements/arithmetic.md` §3 and alpha R8 in one commit with the close; the job's merge of `tranche` | PLANNED |
| P3 | a lane's QUESTION to another lane through BOB | stats N12 → STATS → ARITH | STATS's ask with its own `QUESTION #n` From line; ARITH's decision; STATS's decision | PLANNED |
| P4 | an ask that needs Bob, held NEEDS BOB, closed citing his decision | stats N11 | the ask: Route `needs Bob`, Status NEEDS BOB, Decided `Bob`, Replied | PLANNED |
| P5 | a successor BOB continuing an ASKED ask from its file | BOB handover with an ask ASKED | the ask's Asked line by BOB #1, Replied by BOB #2 | PLANNED |
| P6 | a job's send_message to a lane refused by its hook | alpha N7 | the refusal text in alpha's report; no message in the lane's transcript | PLANNED |
| P7 | a lane re-chartered by `neo lane charter` | BOB's act | the charter file and the `re-chartered` decision line | PLANNED |
| P8 | two requests in one BOB turn, both found by `neo status`, handled in order | alpha N5 | ALPHA #1's `QUESTION #1` and `QUESTION #3` reached BOB #1 in one turn (one `ReadNotifications` at 06:14:19Z with both, beside a repeat of #1 and `QUESTION #2`); `neo status` then listed `ANSWER alpha`; both recorded in arrival-record order (A1 for #1, A2 for #3) and routed in that order (A1 `asked of ARITH`, then A2 `answered by BOB`), copied from the asks' From and Route lines before E1's close | PROVEN |
| P9 | a worker's result recorded by the wake its completion sends, BOB's turn ended meanwhile | any dispatch | BOB's transcript: turn end, completion wake, `neo ask …` with the result | PLANNED |
| P10 | a worker killed mid-task, seen by the failure notice, re-dispatched from the same brief (`neo ask dispatch --again`) | BOB's act | the ask's Working line with its `replaced · <first line>` under it; one brief file | PLANNED (first try 06:16Z: killed, failure notice seen, re-dispatched from the one brief, but before `--again` existed, so not recorded; to drive again) |
| P11 | a Working line past its due listed LATE and re-dispatched | BOB's act (`--due 1`) | A1's question worker dispatched with `--due 1` (Working line `BOB #1 · question · since 2026-10-29T06:16:05.803Z · due 2026-10-29T06:17:05.804Z`); at 06:17:22Z `neo status` printed the queue item `RECEIVED A1 LATE` and `working: [{ask: A1, …, late: true}]`; A1 re-dispatched from its brief and asked of ARITH (`**Asked** · ARITH · 2026-10-29`) | PROVEN |
| P12 | a duplicate `neo ask decided` refused | BOB's act | the second `neo ask decided --ask A1` (the same answer file, after ARITH #1's `DECISION A1` was recorded) printed `REFUSED: A1 already has its decision`; A1's lines unchanged (From, Route `asked of ARITH`, Asked, Decided `ARITH · 2026-10-29`, Status DECIDED) | PROVEN |
| P13 | a lane refreshed mid-ask, its successor finishing the ask from git | BOB's act (`lane route --context-pct 60`) | the lane's Status line with the new session; the decision by it | PLANNED |
| P14 | BOB refreshed with a Working line out, its successor re-dispatching it | BOB handover | the takeover's acts; the second dispatch | PLANNED |
| P15 | a move to a second account with an ask open, closed on the new account | only between Bob's two accounts | — | provable only with Bob's two accounts (PROTOCOL §15) |
| P16 | a request whose message arrives before its record (RESEND, not acted on) | alpha N5 (`QUESTION #2`) | ALPHA #1's `QUESTION #2` arrived with no wait for it in alpha's record (alpha's Status line named only `QUESTION #1` then, and #1 and #3 after); BOB #1 sent the one line `RESEND QUESTION #2: no wait for it was in your record when it arrived, so it is not acted on (PROTOCOL §7b).`; no ask holds a `QUESTION #2` From line (A1 is #1, A2 is #3) | PROVEN |
| P17 | a job's send_message refused by its hook while its record is unpushed | alpha N4 | the refusal text in alpha's report | PLANNED |
| P18 | a message numbered the same as one already recorded, refused by `neo ask open` | alpha N5 (`QUESTION #1` again) | `neo ask open` for ALPHA #1's second delivery of `QUESTION #1` printed `REFUSED: ALPHA #1's QUESTION #1 is already recorded as A1: a repeated delivery, not a new request`; exactly one ask (A1) carries `QUESTION #1` from ALPHA #1 | PROVEN |
| P19 | a dormant lane started by `neo ask ask` from the register, the ask answered by the new session | stats N12 (STATS dormant) | STATS's Status line DORMANT then LIVE; the create_session printed by `ask ask` | PLANNED |
| P20 | an epoch closed (state branch gone) and the next opened, every durable file on `tranche` | the close | `git ls-remote` without `state/E1`; `build/epochs.md`; the asks' text copied where cited | PLANNED |

## The job's life (JOB-LIFE §13)

| # | path | driven by | evidence | status |
| --- | --- | --- | --- | --- |
| J1 | a job started from a draft PR whose body is its START | every job | PRs #4 (`alpha N1 (ALPHA #1)`) and #5 (`beta N1 (BETA #1)`), opened as drafts with bodies beginning `START ALPHA #1 · N1 · layer 1 · module alpha` / `START BETA #1 …` as `neo layer start` printed them; each job's first commit after its opening commit: alpha `2b69c05` "alpha N1: product's tests (R8, R9, R2), function not yet implemented" after `04628e6` "ALPHA #1 opens: N1 layer 1, module alpha"; beta `04ccac3` after its opening commit | PROVEN |
| J2 | the `**Met**` strike riding the job's own commit; ownership accepts it | alpha N1 (R8, R9), stats N10 (R10, R11) | alpha: commit `2baa58d` "alpha N1: met R8, R9" in PR #4, the gate `success` on it (run 40828757806). stats (R10, R11) still to come in layer 2 | PLANNED (alpha half seen) |
| J3 | the gate red on a branch and green after the fix | alpha N3 | PR #4's check `gate`: `failure` on `2b69c05` (run 40827945919: "tests: 6/8 pass; new reds: R8 …; R2 …", product's tests before the function, plan N3), then `success` on `2baa58d` (run 40828757806, 06:22:08Z) | PROVEN |
| J4 | a review decided "no review" with its reason | BOB on alpha or beta | the job's Review line `no review · …` | PLANNED |
| J5 | a review decided "review" whose worker reports a gap, fixed and approved | stats N10 (and alpha, 29 Oct: an R9 gap) | the PR's comment reviews `CHANGES REQUESTED by the review` then `APPROVED by the review`; the Review line `gaps: n` then `approved`; the CHANGE; the second completion | PLANNED |
| J6 | a merge by the queue waking BOB and recorded | every merge | the `pull_request.closed` event; the job's Merge line | PLANNED |
| J7 | a CHANGE after the merge re-opening the job on a fresh branch and PR | alpha N1's answer, timed after its merge | two PRs for alpha; the REOPENED line; the second merge | PLANNED |
| J8 | a branch behind `tranche` updated by `update_pull_request_branch` at `neo merge`, the gate run again on the updated tip (the merged result), and the merge made only from that run's head (BLD 5 forbids the test that would have made this run red, BOB #1's A3; a red here is J3's path) | beta's PR, behind after alpha merges | the Merge line `updating` then `merging <updated tip>`; the check runs on the two tips; the merge commit | PLANNED |
| J9 | a job retired early by `neo job retire` and one at the layer's close | alpha early, beta at the close | the plan's owed lines; two metrics rows | PLANNED |
| J10 | a tranche closed by the one PR to `main` | the close | the PR `N1: close`, merged by BOB; `tranche` gone | PLANNED |
| J11 | a job that ends a turn with its record WORKING sent back by its goal without a message from BOB | beta N9 | BETA #1's transcript (`list_events`, kind user): after its first commit it ended a turn with its record WORKING and no wait; the turn was sent back by `Stop hook feedback: PROCESS: your record reads WORKING: finish the step, or set the wait you end on (\`neo job state --set "WAITING: …"\`), or run \`neo job complete\` (JOB-LIFE §11)` at 06:19:34Z, with no message from BOB in between; the goal evaluator's own send-back is not among the user events read (beta's report on PR #5, comment 6489521033, says it came too) | PROVEN |
| J12 | whether a message whose first words are `/goal` sets the goal again after a wait | PROBE-J12 #1, 29 Oct | `get_session`: the first condition unchanged (`iterations: 1, met: true`); the message read as data by `ReadNotifications`; no `Goal set:` reply | MEASURED before the run: it does not (SESSIONS §1b); no dry-run row |
| J13 | the merge queue on `tranche`, the required checks, auto-merge queuing, the `merge_group` run (JOB-LIFE §12) | every merge | GitHub's queue page; the check runs on `merge_group` | PLANNED |

## The Design stage (DESIGN-STAGE §5)

| # | path | driven by | evidence | status |
| --- | --- | --- | --- | --- |
| D1 | a lane decision that changes a canon section, written by the lane, cited by a requirement | ARITH on alpha N1 | `requirements/arithmetic.md` §3 by the lane; alpha R8 citing it | PLANNED |
| D2 | a lane decision that changes a rule: BOB rewrites the rulebook; before-and-after rendered where the rule is Bob's | ARITH's rule for empty lists | `.claude/rules/arithmetic.md` rule 2 rewritten by BOB; the decision line | PLANNED |
| D3 | a decision that changes a requirement's meaning, held NEEDS BOB, folded after his decision, an entry sent to each user module | stats N11 | the ask; stats R1 as Bob decided; the CHANGE to stats (and to legacy's census if any) | PLANNED |
| D4 | a decision line cited from a rulebook with the ask file gone | after the epoch closes | the rulebook's `L-ARITH-<n>`; no `asks/` anywhere | PLANNED |

## Permissions (PERMISSIONS.md §4)

| # | path | driven by | evidence | status |
| --- | --- | --- | --- | --- |
| X1 | every row of the act table (`tools/acts.md`) tried in its role and relation, passing | the whole run | the table's measured column, each row naming its event | PLANNED |
| X2 | a classifier refusal recorded by `neo refused`, listed by `neo status`, routed to the party whose relation passes | BOB archives a session it did not create (induced) | the mechanism (an unpredicted refusal recorded by `neo refused`, listed by `neo status`, routed by `neo refused routed`) seen twice before the jobs started, both of kind platform: the two `refusal` rows of `build/metrics/N1.csv` on `tranche` (commits 261f2ff and ce2db75): R-BOB-1-1, GitHub refusing the printed draft PR ("No commits between tranche and job/alpha"), fixed in the process at b3ff809; R-BOB-1-2, the proxy refusing the retry's ref delete, fixed at 164445b. The classifier case (BOB archiving a session it did not create) is still to be induced | PLANNED (the classifier case) |
| X3 | the state-branch delete through the git proxy | `neo epoch close` | the branch gone, or the proxy's refusal and the design settled | PLANNED |
| X4 | the toy's `.claude/settings.json` written by `neo shims` at seeding | the seed | the commit, or the classifier's refusal and Bob's commit. `.claude/settings.json` committed by the seeding session (neoProcess #5) as written by `neo shims`, with no refusal: `406851a` "N1 seed: the toy product under neoProcess (… shims by neo shims)" and `9cf0fd4`, both on `main` (PRs #1, #2) | PROVEN |
| X5 | a standing-list rule honoured where a permission prompt would otherwise stop a session | a job's act the list names | the act taken with no prompt | PLANNED |
| X6 | `autoMode.allow` in the product's settings honoured by a cloud session in Auto | a job's routine act in Auto | the act taken with no classifier block | PLANNED |
| X7 | the hook's `allow` clears a prompt in a cloud session (Accept edits) | a job's `neo` command | the command run with no prompt and no allow rule for it | PLANNED |
| X8 | server-managed rules from the admin console reach a product's sessions | Bob's act, if he takes it | the toy's session with the repository file removed still approved | PLANNED, Bob's act |

