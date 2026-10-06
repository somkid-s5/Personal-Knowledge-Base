# Architecting on AWS 7.12.4 — Provenance & Redistribution Notes

[Back to package README](./README.md) · [Sources](./SOURCES.md) · [Course QA matrix](./COURSE-QA-MATRIX.md)

> **Review date:** 2026-10-06

## Purpose

This package is a personal learning reader derived from a licensed AWS training course. The repository should preserve the learner's own explanations and original learning visuals while avoiding unnecessary redistribution of proprietary course material.

## Content classes

### A. Original repository content — preferred for GitHub

Safe direction for public learning content:

- Thai explanations written in the repository's own wording,
- original Mermaid diagrams,
- original SVG architecture summaries generated from the repository's own diagrams,
- original comparison tables and troubleshooting flows,
- original review questions created from learned concepts,
- links to official AWS documentation.

### B. Course-derived notes — allowed as study notes, keep transformative

The module sequence and topics follow *Architecting on AWS 7.12.4*. Notes should remain explanatory and transformative rather than reproducing the source line-by-line.

Good pattern:

> explain the concept in Thai, add a mental model, decision rule, operational example and current AWS note.

Avoid:

- copying long paragraphs from the Student Guide,
- reproducing complete knowledge checks verbatim when redistribution rights are unclear,
- rebuilding the guide page-by-page as a substitute for the licensed original.

### C. Source screenshots / source figures — restricted review area

Some historical files under `assets/source/` were extracted from or closely tied to the Student Guide/Lab Guide. Their presence in a repository does **not** establish redistribution permission.

Repository policy going forward:

1. do not add new proprietary course screenshots to GitHub,
2. prefer original Mermaid/SVG diagrams,
3. keep licensed source screenshots in the private master/reference location when needed for personal study,
4. before a public-release claim, remove or explicitly clear every source screenshot whose redistribution rights are uncertain,
5. do not use a source screenshot merely because it is convenient when an original diagram can teach the same concept.

## Current package status

At this review point:

- original Mermaid/SVG learning visuals exist across the course,
- historical `assets/source/` images still exist in the repository and therefore keep **Public Redistribution Readiness = REVIEW**,
- the package should not be labeled redistribution-clean until that source-asset cleanup is complete,
- course-fidelity and learning-quality status are tracked separately in [COURSE-QA-MATRIX.md](./COURSE-QA-MATRIX.md).

## Mock exam / question policy

`MOCK-EXAM-65.md` should contain original review questions written for this repository. It must not become a dump of real certification questions or a copied commercial question bank.

For official AWS classroom knowledge checks or lab grader content:

- explain the underlying concept,
- write an original equivalent scenario when practice is useful,
- do not publish hidden grader answers or restricted assessment content.

## Attribution style

When a module follows a defined page range from the Student Guide, it is fine to state the source/course/page range for provenance. The repository should not imply that AWS authored or endorsed the Thai explanation.

Use wording such as:

> Study note based on the Architecting on AWS 7.12.4 course scope; explanation and diagrams are independently written for this repository.

## Definition of provenance-clean

The package can be marked **Provenance Clean** only when all of the following are true:

- [ ] no unapproved source screenshots remain in the public tree,
- [ ] no long copied passages from restricted course material remain,
- [ ] mock/review questions are original or clearly licensed,
- [ ] original diagrams are distinguishable from source material,
- [ ] source/course attribution is retained where needed,
- [ ] current official documentation is linked for fast-changing technical claims.
