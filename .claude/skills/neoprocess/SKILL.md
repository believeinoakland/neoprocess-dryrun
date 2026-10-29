---
name: neoprocess
description: "neoProcess: invoke at the start of every session with your role as the argument (bob, job, lane or root), before anything else."
hooks:
  PreToolUse:
    - hooks:
        - type: command
          command: 'node "/home/user/civicos-process/tools/hooks.mjs" pre'
  Stop:
    - hooks:
        - type: command
          command: 'node "/home/user/civicos-process/tools/hooks.mjs" stop'
---
!`node "/home/user/civicos-process/tools/proc.mjs" reading --role "$ARGUMENTS" --product "." || echo "STOP: the process repository is not at /home/user/civicos-process, or the role is not bob, job, lane or root; attach it, then invoke this skill again with your role."`
