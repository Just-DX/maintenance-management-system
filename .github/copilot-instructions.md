---
description: Read project documentation before starting any task
activation: always_on
---

# Read Docs First (Mandatory)

Before starting **any** task (analysis, planning, coding, refactoring, or running commands), I must:

## 1. Read documentation first (in this order, if present)

1. `/docs/**`
   - ARCHITECTURE.md
   - CONTEXT.md
2. `README.md`
3. `CONTRIBUTING.md`
4. `SECURITY.md`
5. Any `/docs/README.md`, `/docs/index.md`, or `/docs/overview.md`

## 2. Acknowledge what I learned

Before proposing a solution or making changes, provide a short summary:

- “What I learned from the docs” (5–10 bullet points)
- Call out:
  - Constraints
  - Architectural rules
  - Naming conventions
  - Tooling expectations

## 3. Resolve conflicts explicitly

- If documentation conflicts with assumptions or prior context:
  - Documentation takes precedence
  - Clearly call out the mismatch

## 4. Only then proceed

After completing the above:

- Propose a plan
- Ask clarifying questions **only if required**
- Start implementation

Failure to follow this rule is considered incorrect behavior.
