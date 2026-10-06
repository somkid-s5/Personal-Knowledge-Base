# Source and Fact-Checking Policy

## Two source modes

This repository supports two primary authoring modes defined in `SKILL.md`.

### Internet-first

Current official Internet sources establish the curriculum and technical truth.

Priority:

1. Official certification exam guide / official learning path / official course page.
2. Official product documentation.
3. Official architecture, security, reliability and best-practice documentation.
4. Official release/lifecycle documentation for changing features.
5. Reputable secondary sources only when primary sources do not answer the question.

### Source-ingestion

The user-supplied course/source set establishes what the source course teaches and what must be covered. Current official Internet documentation may be used to verify or enrich the material, but it must be labeled separately rather than silently replacing the source.

Priority for teaching fidelity:

1. Supplied primary course/source set.
2. Supplied companion materials such as lab guides or slides.
3. Current official product documentation for verification/supplement.
4. Secondary sources only when needed and clearly identified.

If the supplied source conflicts with current official documentation, preserve the course-era teaching and annotate the current delta instead of blending them invisibly.

## Source manifests

Substantial packages should maintain `SOURCE-MANIFEST.md` using `templates/SOURCE-MANIFEST.md`.

Source-ingestion packages should additionally maintain `SOURCE-COVERAGE.md` using `templates/SOURCE-COVERAGE.md` so every in-scope file/page/chapter/module can be accounted for.

## Verification dates

Add `Last verified: YYYY-MM-DD` when content depends on changing scope such as:

- certification objectives,
- course activity lists,
- product names/lifecycle,
- supported regions/features,
- quotas/limits,
- pricing,
- accelerator/model generations.

For supplied courses, also preserve edition/version/publication date when available.

## Durable vs volatile facts

Prefer durable statements in the main explanation. Link to current docs for volatile values instead of embedding numbers that will age quickly.

Example:

- Good: “GPU availability and quota vary by accelerator and location; check the current Compute Engine GPU documentation before provisioning.”
- Fragile: “GPU X is always available in region Y and costs exactly Z.”

## Cross-check rule

High-impact claims about security, identity, networking, data durability, billing or destructive lifecycle behavior should be verified against the relevant official documentation, not inferred from memory.

For Source-ingestion work, if verification shows the course is now outdated, record the delta rather than rewriting the historical source silently.

## Completeness claims

Before claiming complete coverage for Internet-first work:

1. freeze the current official objective/syllabus inventory,
2. map each objective to teaching content,
3. verify renamed/new services,
4. record known exclusions,
5. pass `docs/QUALITY-GATE.md`.

Before claiming complete source coverage for Source-ingestion work:

1. register every supplied source,
2. account for every in-scope page/chapter/module/lab,
3. resolve or explicitly flag unreadable/partial units,
4. distinguish course-derived content from current supplements,
5. pass `docs/QUALITY-GATE.md`.

## Copyright / integrity

- Do not store exam dumps.
- Do not reproduce proprietary challenge-lab grader answers.
- Do not paste large paid-course passages.
- Rewrite concepts in original Thai explanation and cite/reference the source.
- Source images must be owned, permitted, or clearly safe to redistribute; otherwise create an original Mermaid/diagram or reference the source.
- User-provided access does not automatically grant public redistribution rights.
- Preserve provenance for private/licensed source assets so future public-release review can identify restricted material.
