# Skill A — Internet-First Curriculum Builder

Use this skill when the learning package must be created from scratch and no complete course/source set has been supplied.

The Internet is the research surface, but **official/current primary sources are the source of truth**.

## Goal

Build a durable Thai learning package that is accurate, current, teachable, visual where useful, operationally valuable and mapped to an explicit official scope.

Do not begin by writing modules from model memory.

## 1. Define the learning contract

Record before research:

- learner and assumed prerequisites,
- target outcome,
- target learning system / learner goal,
- provider/certification/domain context,
- intended depth,
- included and excluded scope,
- whether official external labs are part of the learning path,
- research/verification date.

Place the work inside the appropriate top-level learning system defined by `../docs/REPOSITORY-ARCHITECTURE.md`. If the learner goal already exists, add a layer to that system instead of creating a parallel root package.

## 2. Lock the authoritative scope

Find the strongest current primary source for the scope, for example:

1. official certification exam guide,
2. official learning path/course syllabus,
3. official product documentation,
4. official architecture/best-practice documentation,
5. official release/lifecycle documentation when freshness matters.

Secondary sources may help interpretation or discover gaps, but they do not override primary sources without explicit evidence.

For certification/course work, capture the exact title/version/date where available.

## 3. Build a Source Manifest before authoring

Create `SOURCE-MANIFEST.md` for substantial Internet-first packages.

Minimum fields:

| Source | Authority | What it controls | Verified |
|---|---|---|---|
| Official exam/course page | Primary | current scope/version | YYYY-MM-DD |
| Official guide/syllabus | Primary | objectives/modules | YYYY-MM-DD |
| Product docs | Primary | technical behavior | YYYY-MM-DD |

The manifest prevents an agent from mixing old guides, localized stale PDFs or third-party summaries without noticing.

## 4. Inventory the scope completely

Before writing lessons, enumerate every official objective/activity/chapter that belongs to the declared scope.

For certifications, start `QA-MATRIX.md` now rather than at the end.

For each official item map:

`Official item → planned note/module → visual need → practice/operation need → status`

An unassigned official item is a visible gap, not something to fix by claiming broad coverage elsewhere.

## 5. Design the learning architecture

Reorganize official material only when it improves learning without losing traceability.

Recommended progression:

```text
mental model
→ foundational concepts
→ architecture / flow
→ decision and tradeoff
→ implementation / operation
→ failure and troubleshooting
→ practice
→ review
```

The learner should always be able to trace the teaching structure back to the official scope.

## 6. Author for understanding

Apply `../docs/CONTENT-STANDARD.md`.

For each major concept explain, when applicable:

- problem it solves,
- mental model,
- how it works,
- request/data/identity path,
- when to choose it,
- alternatives and tradeoffs,
- security/reliability/cost implications,
- common failure modes,
- troubleshooting path,
- what the learner should now be able to explain or do.

Do not turn official headings into shallow bullet lists.

## 7. Visual pass

Apply `../docs/VISUAL-STANDARD.md`.

Prefer original Mermaid/flow/decision/architecture diagrams for:

- hierarchy and scope,
- request/data/identity paths,
- lifecycle/state,
- architecture relationships,
- service-selection decisions,
- troubleshooting decisions.

Screenshots are secondary and should only exist when UI location/navigation itself is part of the lesson.

## 8. Practice and operations pass

Use original exercises or link/crosswalk to official labs.

Add useful combinations of:

- mini scenarios,
- decision questions,
- command workflows,
- failure injection,
- troubleshooting cases,
- official lab crosswalks,
- review scenarios.

Never reproduce exam dumps, proprietary graders or paid answer keys.

## 9. Freshness and contradiction pass

For facts that change quickly, verify at authoring time:

- product/service names,
- lifecycle/deprecation,
- supported locations/features,
- quotas/limits when essential,
- exam/course versions,
- renamed products.

Prefer durable wording over freezing volatile values. If an exact volatile value matters, attach a date and primary source.

When official sources disagree, investigate version/date/context and document the ambiguity instead of choosing silently.

## 10. Completeness gate

A package may be called `Verified` or `100%` only when:

- every declared official objective/activity/chapter is accounted for,
- every assigned note contains real explanatory content rather than a heading placeholder,
- decision/tradeoff coverage exists where selection matters,
- operation/troubleshooting exists where operations are in scope,
- visual coverage exists where a visual materially improves understanding,
- source manifest and verification date are current,
- `../docs/QUALITY-GATE.md` passes,
- repository CI/navigation checks pass.

`100%` always means 100% of the **declared, dated scope**, never all knowledge about a platform.

## 11. Publish

Update in the same change:

- package README,
- `SOURCE-MANIFEST.md`,
- `QA-MATRIX.md` when scope-completeness is claimed,
- learning-system README,
- root README catalog when appropriate.

## Expected result

The final package should be useful even after the exam/course is finished: it should teach architecture, operational thinking and troubleshooting rather than merely reproduce a syllabus.
