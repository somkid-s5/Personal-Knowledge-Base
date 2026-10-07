# AGENTS.md — Personal Knowledge Base Rules

This file defines repository-wide instructions for humans and AI agents.

## Mission

Maintain this repository as a long-lived, high-quality personal learning knowledge base. Current systems focus on cloud and cybersecurity, but future systems may cover infrastructure, DevOps, Linux, networking, databases, automation or other technical goals the owner is actively learning.

## Mandatory workflow

1. Read `SKILL.md` before creating or substantially rewriting learning content.
2. Select exactly one **primary authoring mode** before substantial writing:
   - Internet-first → `skills/INTERNET-FIRST-CURRICULUM.md`
   - Source-ingestion → `skills/SOURCE-INGESTION-CURRICULUM.md`
3. Follow `docs/CONTENT-STANDARD.md`, `docs/SOURCE-POLICY.md`, `docs/VISUAL-STANDARD.md` and `docs/QUALITY-GATE.md`.
4. Inspect the nearest package `README.md` and preserve its learning path and terminology.
5. For time-sensitive facts, verify against current official sources before presenting them as current.
6. Do not claim a package is complete unless its declared scope and selected skill's coverage requirements pass.

## Authoring-mode rules

- **Internet-first:** do not write the curriculum from memory. Lock current official scope, create a source inventory/manifest and map official objectives before authoring.
- **Source-ingestion:** do not sample a few pages and infer the rest. Register all supplied sources, read them systematically and account for every intended source unit in a coverage/fidelity matrix.
- When both supplied material and current web research matter, Source-ingestion stays primary and web research is a clearly labeled supplement/current-verification layer.
- Never silently blend course-era statements and current product behavior so the learner cannot tell which is which.

## Content rules

- Thai is the default explanation language; keep product names, CLI commands, API names, menu labels and technical terms in English when that improves accuracy.
- Teach `why`, `how`, `when`, tradeoffs and failure modes; do not produce glossary-only notes.
- Prefer progressive learning: mental model → concept → example → decision → operation → troubleshooting → review.
- Use Mermaid/flow/decision/architecture diagrams when a visual model reduces cognitive load.
- Do not add screenshots just for decoration. UI screenshots must teach a navigation/task that cannot be explained more durably with text/diagram.
- Commands that mutate resources must include scope, permissions, cost/risk, verification and cleanup context when relevant.
- Never commit credentials, API keys, passwords, tokens, private account identifiers or real production secrets.

## Source rules

- For Internet-first work, primary source priority is official exam guide / official course page → official product documentation → official architecture/best-practice docs → reputable secondary sources only when needed.
- For Source-ingestion work, the supplied course/source set is the primary teaching source; current official docs may verify or supplement it but must not be silently substituted.
- Record verification dates for certification/course inventories and fast-changing product facts.
- Preserve source edition/version when available.
- Avoid hard-coding volatile pricing, quotas, supported regions, model/accelerator generations or lifecycle status unless the date/source is explicit.
- Do not copy paid course text, challenge-lab graders, exam dumps or proprietary answer keys. Rewrite concepts in original language and reference/link the authorized source.
- Do not bulk-copy proprietary screenshots/figures into a public package merely because the user supplied the source. Prefer original diagrams and maintain provenance records.

## Repository structure

Use the learning-system-first taxonomy defined in `docs/REPOSITORY-ARCHITECTURE.md`.

Top-level learning content should be organized by an active learner goal, for example `AWS-SAA-C03`, `Azure-AZ-104`, `GCP-ACE`, or `ISC2-CC`. Courses, books, projects, labs, current-objective notes and practice material belong inside the relevant system as learning layers when they support the same goal.

Do not recreate generic provider or dump roots such as `AWS/`, `Azure/`, `GCP/`, `Books/`, `Courses/` or `Misc/`. The connected Drive may remain a broad source library; promotion into GitHub should be selective and goal-driven.

## Change discipline

- Prefer one focused branch/PR per structural or content theme.
- Preserve relative links when moving a whole package. If paths change, update root/system navigation in the same change.
- Avoid silent mass rewrites of already-verified content.
- Structural migrations must not change technical meaning unless explicitly part of the change.

## Definition of done

A package is publishable only when:

- authoring mode is known,
- scope and source of truth are clear,
- source inventory/coverage requirements for the selected skill are satisfied,
- navigation works,
- content is teachable rather than merely enumerated,
- visuals exist where useful,
- important decisions/failure modes are covered,
- sources, provenance and verification dates are present where needed,
- the relevant checklist in `docs/QUALITY-GATE.md` passes,
- repository CI passes.
