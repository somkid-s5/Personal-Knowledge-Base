# SKILL.md — Build High-Quality Learning Content

Use this workflow whenever creating a new course, certification, topic pack, lab set or major content expansion in this repository.

## 1. Lock the scope
Write down:
- target learner,
- target outcome,
- official syllabus/exam/course source of truth,
- what is included,
- what is intentionally excluded,
- verification date for time-sensitive scope.

Do not start by writing modules from memory.

## 2. Build an inventory first
Create a checklist of official objectives/activities/chapters before authoring. Map each item to a planned file or section. For certifications, create a QA matrix early so missing objectives are visible before writing is considered complete.

## 3. Scaffold the learning package
Minimum package:

```text
<Provider-or-Domain>/<Content-Type>/<Package>/
├─ README.md
├─ Module-01-*.md or modules/
├─ Lab-Guide-TH/ or labs/          # when hands-on content exists
├─ assets/                         # diagrams/source images when needed
├─ CHEAT-SHEET.md                  # optional but recommended for large packs
├─ GLOSSARY.md                     # optional
└─ QA-MATRIX.md                    # required for certification/syllabus-complete claims
```

A package README must answer: what this is, who it is for, source/scope, learning order, status, last verified date, quick links, and how to know when the learner is done.

## 4. Author for understanding
Every major concept should answer as many of these as applicable:
1. What problem does it solve?
2. What is the mental model?
3. How does data/request/identity flow?
4. When should I choose it?
5. What are the main alternatives and tradeoffs?
6. What can fail and how do I investigate it?
7. What security/cost/availability implications matter?
8. What should I be able to explain or do after this section?

Avoid content that is only a list of product names or definitions.

## 5. Visual pass
Apply `docs/VISUAL-STANDARD.md` after the first draft. Add visuals for hierarchies, flows, state/lifecycle, architecture, comparisons and troubleshooting decision paths. Prefer Mermaid for durable conceptual diagrams.

## 6. Practice pass
Add one or more of:
- mini scenario,
- decision question,
- command walkthrough,
- troubleshooting case,
- official lab crosswalk,
- companion lab.

Never copy proprietary grader steps or exam dumps.

## 7. Fact-check pass
Apply `docs/SOURCE-POLICY.md`:
- use official primary sources first,
- verify current names/lifecycle/scope,
- mark volatile facts with date/source,
- remove unsupported claims,
- separate durable concepts from fast-changing product details.

## 8. Quality gate
Run the checklist in `docs/QUALITY-GATE.md`. A package cannot be called `Complete`, `100%`, or equivalent until its declared scope passes the gate and the QA matrix shows no unresolved objective gap.

## 9. Publish/update navigation
Update in the same change:
- package README,
- provider/domain README,
- root README catalog,
- moved-path references if structure changed.

## Writing style
- Default explanation language: Thai.
- Keep official service names, CLI/API/menu labels and code in English.
- Prefer clear paragraphs, tables and diagrams over dense walls of bullets.
- Explain first, then summarize. Do not reduce full study notes into cheat sheets unless the file is explicitly a cheat sheet.
- Write for future maintenance: avoid unnecessary screenshots, volatile exact prices and undocumented assumptions.
