# SAA-C03 — Practice & Provenance Policy

[Back to package README](./README.md) · [Source Manifest](./SOURCE-MANIFEST.md) · [Sources](./SOURCES.md)

> **Review date:** 2026-10-07

## Why this file exists

A certification study repository needs practice questions, but it must not become an exam-dump mirror or a substitute for a commercial/third-party question bank.

The package previously contained six very large historical practice walkthrough files under `practice-exam/`. Their English question stems/options were reproduced in full, while the files did not record a source/license that established redistribution rights. Some explanations also used inconsistent tone and oversimplified technical rules.

Because provenance could not be established from the repository evidence, those six files were removed from the **current tree** on 2026-10-07.

## Current practice source

The supported practice layer is:

- [CURRENT-SCOPE-SCENARIOS.md](./CURRENT-SCOPE-SCENARIOS.md) — repository-authored scenarios based on current public objective families,
- hands-on reinforcement through [Cloud Engineer Lab](../03-Hands-On-Projects/),
- self-check/review prompts inside the long-form course and certification notes.

Future practice sets should be original transformations of public technical concepts, not copied question-bank wording.

## Rules for future questions

Allowed direction:

- write a new scenario in repository wording,
- test architecture decisions/tradeoffs,
- explain why alternatives lose,
- map the scenario to public exam objective families,
- cite current AWS documentation for changing technical behavior.

Do not add:

- real/leaked exam questions,
- copied commercial practice-bank stems/options,
- hidden grader content,
- long third-party question text with unclear redistribution rights,
- claims that the repository knows the real exam.

## Git-history caveat

Removing a file from the current branch does not erase it from old Git commits. Earlier blobs may remain reachable in repository history.

If this private repository is prepared for a public release and history-level removal is required, perform a separate history rewrite/repository migration after backing up and reviewing the impact on commit hashes, branches and collaborators.

## Completion state

For the **current tree**, the known SAA legacy-practice provenance blocker is removed.

This provenance result is separate from current objective coverage. Current objective coverage is tracked in [QA-MATRIX.md](./QA-MATRIX.md).
