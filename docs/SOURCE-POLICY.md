# Source and Fact-Checking Policy

## Source priority
1. Official certification exam guide / official learning path / official course page.
2. Official product documentation.
3. Official architecture, security, reliability and best-practice documentation.
4. Official release/lifecycle documentation for changing features.
5. Reputable secondary sources only when primary sources do not answer the question.

## Verification dates
Add `Last verified: YYYY-MM-DD` when content depends on changing scope such as:
- certification objectives,
- course activity lists,
- product names/lifecycle,
- supported regions/features,
- quotas/limits,
- pricing,
- accelerator/model generations.

## Durable vs volatile facts
Prefer durable statements in the main explanation. Link to current docs for volatile values instead of embedding numbers that will age quickly.

Example:
- Good: “GPU availability and quota vary by accelerator and location; check the current Compute Engine GPU documentation before provisioning.”
- Fragile: “GPU X is always available in region Y and costs exactly Z.”

## Cross-check rule
High-impact claims about security, identity, networking, data durability, billing or destructive lifecycle behavior should be verified against the relevant official documentation, not inferred from memory.

## Certification completeness
Before claiming complete coverage:
1. freeze the current official objective inventory,
2. map each objective to teaching content,
3. verify renamed/new services,
4. record known exclusions,
5. pass `docs/QUALITY-GATE.md`.

## Copyright / integrity
- Do not store exam dumps.
- Do not reproduce proprietary challenge-lab grader answers.
- Do not paste large paid-course passages.
- Summarize/rewrite in original Thai explanation and cite/link to the source.
- Source images must be owned, permitted, or clearly safe to redistribute; otherwise create an original Mermaid diagram.
