# AGENTS.md — Cloud Engineer Knowledge Base Rules

This file defines repository-wide instructions for humans and AI agents.

## Mission
Maintain this repository as a long-lived, high-quality learning knowledge base for cloud, infrastructure, DevOps, security, Linux, Kubernetes, automation and related engineering topics.

## Mandatory workflow
1. Read `SKILL.md` before creating or substantially rewriting learning content.
2. Follow `docs/CONTENT-STANDARD.md`, `docs/SOURCE-POLICY.md`, `docs/VISUAL-STANDARD.md` and `docs/QUALITY-GATE.md`.
3. Inspect the nearest package `README.md` and preserve its learning path and terminology.
4. For time-sensitive facts, verify against current official sources before writing.
5. Do not claim a package is complete unless its scope is defined and the QA gate is passed.

## Content rules
- Thai is the default explanation language; keep product names, CLI commands, API names, menu labels and technical terms in English when that improves accuracy.
- Teach `why`, `how`, `when`, tradeoffs and failure modes; do not produce glossary-only notes.
- Prefer progressive learning: mental model → concept → example → decision → operation → troubleshooting → review.
- Use Mermaid/flow/decision/architecture diagrams when a visual model reduces cognitive load.
- Do not add screenshots just for decoration. UI screenshots must teach a navigation/task that cannot be explained more durably with text/diagram.
- Commands that mutate resources must include scope, permissions, cost/risk, verification and cleanup context when relevant.
- Never commit credentials, API keys, passwords, tokens, private account identifiers or real production secrets.

## Source rules
- Primary source priority: official exam guide / official course page → official product documentation → official architecture/best-practice docs → reputable secondary sources only when needed.
- Record the verification date for certification/course inventories and fast-changing product facts.
- Avoid hard-coding volatile pricing, quotas, supported regions, model/accelerator generations or lifecycle status unless the date/source is explicit.
- Do not copy paid course text, challenge-lab graders, exam dumps or proprietary answer keys. Rewrite concepts in original language and link to the official source.

## Repository structure
Use the taxonomy defined in `docs/REPOSITORY-ARCHITECTURE.md`:
`<Domain-or-Provider>/<Content-Type>/<Learning-Package>/`.

Existing canonical provider types include `Courses`, `Certifications`, `Topics` and `Projects`. New top-level roots require a clear domain-level purpose and README.

## Change discipline
- Prefer one focused branch/PR per structural or content theme.
- Preserve relative links when moving a whole package. If paths change, update root/provider navigation in the same change.
- Avoid silent mass rewrites of already-verified content.
- Structural migrations must not change technical meaning unless explicitly part of the change.

## Definition of done
A package is publishable only when:
- scope and source of truth are clear,
- navigation works,
- content is teachable rather than merely enumerated,
- visuals exist where useful,
- important decisions/failure modes are covered,
- sources and verification dates are present where needed,
- the relevant checklist in `docs/QUALITY-GATE.md` passes.
