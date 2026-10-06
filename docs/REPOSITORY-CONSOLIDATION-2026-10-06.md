# Repository Consolidation — 2026-10-06

## Goal

Make `somkid-s5/Cloud-Engineer` the primary long-term learning knowledge base while preserving the useful identity of source courses, certifications, interactive study tools and hands-on project repositories.

The consolidation rule is:

> **One canonical knowledge base, separate source-aware learning packages.**

Do not flatten unrelated content into one folder merely because it covers the same cloud provider.

## Sources reviewed

### Existing AWS packages in Cloud-Engineer

1. `AWS/Courses/Architecting-on-AWS-7.12.4/`
   - versioned AWS course notes
   - Modules 1–13
   - Thai lab guides
   - diagrams/review material/mock exam
   - source identity: Architecting on AWS 7.12.4 Student/Lab Guide

2. `AWS/Certifications/SAA-C03/`
   - six detailed practice-test walkthroughs
   - previously a practice pack rather than a full certification hub

### External repository — AZ-104

`somkid-s5/az-104-master-cram-book`

Imported source snapshot: `ad6c2913af351b2b30feb29f5594999891b4d994`

The original repo is an interactive AZ-104 study system containing Learn/Cram views, 10 visual labs, flashcards, scenario questions, blueprint/checklist views and Playwright tests. Its README states that the content was generated from the user's `AZ-104 2026 Complete Exam Cheat Sheet (Pass-First)` source document.

The current Microsoft Learn AZ-104 study guide uses skills measured as of 2026-04-17 with five domains and 15 objective groups. The imported repo's declared scope matches that high-level structure, but main-repository objective-level fidelity QA is still required.

Canonical location after consolidation:

`Azure/Certifications/AZ-104/`

The original interactive implementation is preserved under:

`Azure/Certifications/AZ-104/interactive/`

### External repository — Cloud Engineer Lab

`somkid-s5/Cloud-Engineer-Lab`

Imported source snapshot: `14a4925efcd7158fe7a093b79fd2a58d778703c2`

The project contains preparation setup plus project-01 through project-34, covering AWS architecture, Terraform/IaC, Linux, Docker, EKS/Kubernetes, CI/CD, security, FinOps, observability, migration, hybrid networking and Well-Architected review scenarios.

Canonical location after consolidation:

`AWS/Projects/Cloud-Engineer-Lab/`

## AWS architecture decision

The Architecting course and SAA-C03 certification material should **not** be physically merged into a single content folder.

Reason:

- the course is source-ingestion content tied to version 7.12.4,
- the certification is current-scope content tied to the changing AWS exam guide,
- hands-on projects have a broader cloud-engineering scope than the certification.

Instead, `AWS/Certifications/SAA-C03/` becomes the learner-facing certification hub that connects:

```text
Architecting on AWS 7.12.4
        ↓
Current SAA-C03 exam map
        ↓
Gap study
        ↓
Selected Cloud Engineer Lab projects
        ↓
Practice tests 1–6
        ↓
Targeted re-study
```

Current AWS SAA-C03 guide checked on 2026-10-06:

- Design Secure Architectures — 30%
- Design Resilient Architectures — 26%
- Design High-Performing Architectures — 24%
- Design Cost-Optimized Architectures — 20%

The new `EXAM-GUIDE-MAP.md` records current domain/task mapping to existing course modules and projects. It intentionally does not claim objective-level completeness yet.

## Azure architecture decision

The AZ-104 interactive site is useful as an application-like study experience and should remain intact as an imported source subtree rather than being decomposed immediately.

The parent certification package owns:

- canonical README/status,
- source manifest,
- current-scope coverage matrix,
- future QA/delta notes,
- future long-form Markdown learning material if needed.

This lets the repository keep the original interactive experience while bringing it under the same governance model as AWS and GCP.

## Canonical structure after this phase

```text
Cloud-Engineer/
├─ AWS/
│  ├─ Courses/
│  │  └─ Architecting-on-AWS-7.12.4/
│  ├─ Certifications/
│  │  └─ SAA-C03/
│  └─ Projects/
│     └─ Cloud-Engineer-Lab/
├─ Azure/
│  └─ Certifications/
│     └─ AZ-104/
│        └─ interactive/
└─ GCP/
   └─ Certifications/
      └─ Associate-Cloud-Engineer/
```

## Standalone repositories after consolidation

Do not delete or archive the old repositories automatically.

Recommended role:

- `az-104-master-cram-book` — public/live deployment mirror while the canonical package lives in `Cloud-Engineer`.
- `Cloud-Engineer-Lab` — legacy/focused project mirror while canonical integration/navigation lives in `Cloud-Engineer`.

If the old repositories continue receiving edits, define an explicit sync direction. The safest default is **Cloud-Engineer → mirror**, not bidirectional editing.

## Remaining QA after migration

### SAA-C03

- create objective-level current exam inventory,
- map every AWS knowledge/skill bullet,
- write current supplements for gaps,
- create `QA-MATRIX.md`,
- review practice-question provenance before public release.

### AZ-104

- verify all bullets beneath the 15 current objective groups,
- identify content delta since the source document snapshot,
- decide whether to add long-form Markdown notes alongside the interactive system,
- preserve original question-bank provenance and test coverage.

### Cloud Engineer Lab

- run imported Markdown/local-link QA,
- scan for credentials/secrets and environment-specific values,
- classify each project by provider/domain/certification reinforcement,
- review volatile AWS/Terraform/Kubernetes versions before calling projects current-production references.

## Principle going forward

A separate repository is justified only when it must remain independently deployable or independently consumable. The learning source of truth, navigation, QA state and cross-package relationships should live in `Cloud-Engineer`.
