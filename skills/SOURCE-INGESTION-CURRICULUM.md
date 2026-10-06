# Skill B — Source-Ingestion Curriculum Builder

Use this skill when the user already has course material such as PDFs, slide decks, documents, screenshots/images, exported web pages, lab guides or other files and wants the agent to understand the material and convert it into this repository's learning system.

The supplied source set is the **primary teaching source**. Internet research is optional and must be clearly separated as verification or enrichment.

## Goal

Read the supplied material systematically, preserve the course's intended scope and sequence, understand it before summarizing, then rebuild it as high-quality Thai learning content using this repository's standards.

The job is not "extract some text and summarize it." The job is **source comprehension → coverage accounting → instructional reconstruction → QA**.

## 1. Register the source set

Before authoring, inventory every supplied source.

Create `SOURCE-MANIFEST.md` with at least:

| Source file | Type/version | Coverage unit | Read status | Notes |
|---|---|---|---|---|
| `course-guide.pdf` | PDF / edition | pages 1–650 | pending/complete | primary course |
| `lab-guide.pdf` | PDF | labs 1–7 | pending/complete | hands-on companion |

Record when available:

- course title,
- edition/version,
- publication/update date,
- provider/author,
- chapter/module/page structure,
- source language,
- whether the source is public, private or licensed/user-provided.

Do not start claiming coverage before the manifest exists.

## 2. Read the complete source set systematically

Read the material in its natural structure: table of contents → chapters/modules → appendices/labs/review sections.

For large sources, work in deterministic chunks and keep progress in the manifest. Do not sample a few pages and infer the rest.

For each chunk capture:

- headings and subheadings,
- stated learning objectives,
- key concepts and definitions,
- architecture/process explanations,
- examples and scenarios,
- important tables,
- diagrams/figures and what they teach,
- commands/configuration,
- labs/exercises,
- warnings/limitations,
- review questions or knowledge checks,
- cross-references to other sections.

For scanned/image-heavy material, prefer native document text and visual understanding first; use OCR only when necessary and flag uncertain extraction.

## 3. Build a Source Coverage / Fidelity Matrix

Create `SOURCE-COVERAGE.md` or an equivalent matrix before calling the package complete.

Minimum mapping:

`Source chapter/page/activity → repository file/section → concept coverage → visual coverage → status`

Statuses should include:

- `COMPLETE` — source unit understood and represented,
- `PARTIAL` — some material still missing,
- `REFERENCE-ONLY` — intentionally not rewritten; linked/referenced instead,
- `UNREADABLE` — source cannot be reliably interpreted,
- `OUT-OF-SCOPE` — intentionally excluded with reason.

A source-ingestion package cannot be `Verified` while material is silently unaccounted for.

## 4. Separate three information layers

Never blur these layers:

### A. Source-derived course content

Concepts taught by the supplied course. Rewrite in original explanatory language; do not copy long proprietary passages.

### B. Repository teaching reconstruction

Original mental models, diagrams, analogies, decision trees and troubleshooting explanations created to make the source easier to learn.

These may reorganize the explanation, but must not distort the source.

### C. Current Internet supplement

Newer product facts, corrections, renamed services or useful official documentation discovered outside the supplied course.

Label this clearly as `Current supplement`, `Updated note`, or equivalent. Do not silently rewrite history so an old course appears to have taught newer material.

## 5. Preserve course identity and learning intent

Keep traceability to the original course structure even when the repository uses a better teaching order.

The package README should state:

- source course/edition,
- source coverage,
- repository learning order,
- whether notes follow course order exactly or reorganize concepts,
- what has been supplemented from current documentation,
- last verification date.

If the course is versioned, keep that version in the package identity rather than pretending the material is timeless.

## 6. Author for understanding, not compression

Apply `../docs/CONTENT-STANDARD.md`.

Do not over-compress a long technical course into a short cheat sheet unless the user explicitly asks for that artifact.

For each major concept, add enough context to answer:

- why the course introduces it,
- how it works,
- what components relate to each other,
- decision/tradeoff logic,
- operational consequences,
- common misunderstandings,
- failure/troubleshooting path when relevant.

Preserve important nuance even when simplifying the language.

## 7. Rebuild visuals intelligently

For each source diagram/figure, first identify **what concept it teaches**.

Then choose one of:

1. create an original Mermaid/diagram that teaches the same concept,
2. create a simplified decision/flow map,
3. retain a source image only when reuse is permitted and provenance is appropriate,
4. reference the original source rather than redistribute the figure.

Do not bulk-copy copyrighted course screenshots/figures into a public repository merely because they were supplied to the agent.

For private/personal material, still record provenance so a future public-release review can identify restricted assets.

## 8. Handle labs and exercises

Distinguish:

- **official/source lab** — preserve purpose, prerequisites, architecture, expected outcome and conceptual explanation; link/reference the authorized lab where possible,
- **repository companion lab** — original exercise that practices the same skills,
- **grader/challenge solution** — do not reproduce proprietary grader logic or hidden challenge answers.

If commands from a source are reproduced because they are necessary technical instructions, verify context and safety rather than copying blindly.

## 9. Optional current-version verification

When the user wants the old/supplied course checked against today's platform, invoke the Internet-first research discipline as a **supplementary pass**.

Compare:

`Course statement → current official documentation → status`

Use labels such as:

- `Still current`,
- `Renamed`,
- `Changed`,
- `Deprecated`,
- `Needs current-doc check`.

Never silently delete the original course teaching just because the platform later changed; annotate the evolution so the notes remain understandable.

## 10. Quality gate for source ingestion

A source-ingestion package may be called complete only when:

- every supplied file is registered,
- every intended page/chapter/module/lab is accounted for,
- unreadable/missing areas are explicitly flagged,
- source-derived and supplementary information are distinguishable,
- important source diagrams have a visual-learning treatment or explicit reference,
- the package is teachable, not merely extracted,
- copyright/provenance risks are documented,
- `../docs/QUALITY-GATE.md` passes,
- internal links/repository CI pass.

For page-based sources, "100% source coverage" means all in-scope pages/sections are accounted for in the coverage matrix; it does not mean every sentence is copied or paraphrased.

## 11. Recommended package artifacts

```text
<Learning-Package>/
├─ README.md
├─ SOURCE-MANIFEST.md
├─ SOURCE-COVERAGE.md
├─ Module-01-*.md ...
├─ assets/                    # original/reusable visuals only
├─ labs/ or Lab-Guide-TH/     # when relevant
├─ CHEAT-SHEET.md             # optional review layer
├─ GLOSSARY.md                # optional
└─ QA-MATRIX.md               # when completeness against a formal scope is claimed
```

## Expected result

The learner should receive a coherent learning package that reflects the complete supplied course, is easier to understand than the raw source, keeps traceability to that source, and can be safely updated later without losing the distinction between the original course and newer platform knowledge.
