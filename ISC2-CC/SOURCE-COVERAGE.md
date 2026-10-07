# ISC2-CC — Source Coverage

[Back to ISC2-CC](./README.md) · [Source Manifest](./SOURCE-MANIFEST.md)

> **Coverage date:** 2026-10-07  
> **Status:** Inventory complete for the currently discovered Drive source set; semantic ingestion is not complete

## Current-source coverage

| Source unit | Repository representation | Status |
|---|---|---|
| 2026 Domain 1 — Security Principles | [Domain 1 Teaching Note](./01-Security-Principles.md) | TEACHING-IN-PROGRESS |
| 2026 Domain 2 — Security Governance | [Current Exam Map](./CURRENT-EXAM-MAP.md) | SCOPE-MAPPED |
| 2026 Domain 3 — IAM Concepts | [Domain 3 Teaching Note](./03-Identity-Access-Management.md) | TEACHING-IN-PROGRESS |
| 2026 Domain 4 — Networking and Cloud Security Concepts | [Domain 4 Teaching Note](./04-Networking-Cloud-Security.md) | TEACHING-IN-PROGRESS |
| 2026 Domain 5 — Security Operations and Incident Response | [Current Exam Map](./CURRENT-EXAM-MAP.md) | SCOPE-MAPPED |

`SCOPE-MAPPED` means the current objective area is registered. It does **not** mean full teaching coverage exists.

## Private-source ingestion coverage

| Private source | Current handling | Status |
|---|---|---|
| Thor Study Guide Domain 1 | current Domain 1 foundation reconstructed; access-control material reserved for Domain 3 remap | PARTIAL |
| Thor Study Guide Domain 2 | must remap into current domains | PENDING |
| Thor Study Guide Domain 3 | IAM concepts remapped to current Domain 3; physical-security sections intentionally deferred | PARTIAL |
| Thor Study Guide Domain 4 | current networking/cloud concepts remapped; SIEM/SOAR, backup, resilience, scanning and other legacy topics deferred | PARTIAL |
| Thor Quick Sheet Domain 1 | supporting review source for current Domain 1 | PARTIAL |
| Thor Quick Sheet Domain 2 | review aid / gap evidence | PENDING |
| Thor Quick Sheet Domain 3 | supporting IAM review source; non-IAM physical material excluded from current Domain 3 | PARTIAL |
| Thor Quick Sheet Domain 4 | supporting network/cloud review source; legacy out-of-domain material intentionally excluded | PARTIAL |
| Thor Quick Sheet Domain 5 | review aid / gap evidence | PENDING |
| Thor Mnemonics | reference-only unless useful concepts are reconstructed | REFERENCE-ONLY / PENDING REVIEW |
| Thor Study Plan | reconstructed into [STUDY-PLAN.md](./STUDY-PLAN.md) using current-domain order | REFERENCE-ONLY / REVIEWED |
| Full Thor Study Guide Domain 5 | not found in discovered source set | MISSING-SOURCE |

## Required next pass

For each source:

1. read the entire file systematically,
2. extract its concept inventory,
3. map concepts to the 2026 objective map,
4. mark concepts that remain useful,
5. identify outdated organization or terminology,
6. identify current objectives not taught by the source,
7. reconstruct the teaching layer in original Thai wording,
8. add original visuals where they improve understanding.

## Completion condition

This file may move to `COMPLETE` only when every registered private source is accounted for and every current 2026 objective has corresponding repository teaching coverage.

No such claim is made yet.
