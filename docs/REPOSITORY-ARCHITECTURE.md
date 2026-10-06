# Repository Architecture

## Goal
This repository is a long-lived engineering learning knowledge base, not a single-certification dump. Structure must scale across cloud providers, platforms, certifications, courses, topics and projects without losing discoverability.

## Canonical taxonomy

```text
Cloud-Engineer/
├─ README.md
├─ AGENTS.md
├─ SKILL.md
├─ docs/                       # repository-wide standards and governance
├─ templates/                  # reusable content templates
├─ AWS/
│  ├─ README.md
│  ├─ Courses/
│  ├─ Certifications/
│  ├─ Topics/
│  └─ Projects/
├─ GCP/
│  ├─ README.md
│  ├─ Courses/
│  ├─ Certifications/
│  ├─ Topics/
│  └─ Projects/
├─ Azure/                      # create when first real package exists
├─ Kubernetes/                 # vendor-neutral domain example
├─ Linux/
├─ DevOps/
└─ Security/
```

Do not create empty top-level folders just for a roadmap. Add a domain only when it has real content.

## Content types
- `Courses/` — notes following a named training course/book/workshop.
- `Certifications/` — exam-oriented learning packages mapped to an official exam guide/path.
- `Topics/` — durable subject packs not tied to one course/exam, e.g. IAM, networking, Terraform.
- `Projects/` — build-oriented learning projects, capstones or implementation journals.

## Learning package contract
Every substantial package must have a `README.md` and should be independently understandable from that folder.

Recommended package layout:

```text
<Package>/
├─ README.md
├─ Module-01-*.md              # or modules/ for larger new packages
├─ Lab-Guide-TH/               # optional
├─ assets/
│  ├─ diagrams/
│  └─ source/                  # only reusable/licensed source assets
├─ CHEAT-SHEET.md              # optional
├─ GLOSSARY.md                 # optional
└─ QA-MATRIX.md                # required for complete certification/course claims
```

Existing packages may keep a flat module layout to avoid unnecessary link churn. New packages should prefer predictable names and two-digit ordering.

## Naming
- Directories: clear English product/course names using kebab case where practical, e.g. `Associate-Cloud-Engineer`, `SAA-C03`.
- Ordered modules: `Module-01-Topic.md`.
- Labs: `Lab-01-Topic.md`.
- Avoid provider prefixes inside provider folders unless the official name requires it.
- Avoid ambiguous folders such as `misc`, `new`, `temp`, `final2`.

## Navigation hierarchy
1. Root `README.md` = global catalog and standards entry point.
2. Provider/domain `README.md` = package catalog for that domain.
3. Package `README.md` = study path and package status.
4. Module/lab files = actual learning content.

Every new package must be linked at levels 1–3 in the same change.

## Status model
Use consistent labels:
- `Planning` — scope only.
- `In Progress` — actively authored, known gaps remain.
- `Review` — coverage complete, QA not finished.
- `Verified` — source/coverage/quality gate passed for a stated date/scope.
- `Archived` — retained for history; not current guidance.

Avoid `100%` without a declared scope and QA evidence.

## Migration policy
Structural cleanup should preserve package internals whenever possible. Move a whole subtree first, then update root/provider links. Internal reorganization is a separate change because it can break many relative links.
