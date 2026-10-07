# Google Cloud ACE — Source Manifest

[Back to package README](./README.md) · [100% QA Matrix](./ACE-100-PERCENT-QA-MATRIX.md) · [Google Skills Curriculum Map](./GOOGLE-SKILLS-CURRICULUM.md)

> **Authoring mode:** Internet-first curriculum + official learning-path crosswalk  
> **Manifest reviewed:** 2026-10-07  
> **Declared verification scope:** non-lab Associate Cloud Engineer exam objectives + current Google Skills ACE learning path  
> **Official labs:** excluded from the repository's 100% non-lab claim; performed in Google Skills

## Primary sources

| Source | Role in this package | Verification treatment |
|---|---|---|
| Google Cloud Associate Cloud Engineer certification page | certification entry point and current exam-guide authority | verify before future completeness claims |
| Standard Associate Cloud Engineer Exam Guide — English | official exam objective inventory | source of truth for objective-by-objective QA |
| Google Skills — Associate Cloud Engineer Certification path | current learning-path activity inventory | source of truth for path/activity crosswalk |
| Current Google Cloud product documentation | service behavior, IAM, networking, operations, tooling and current product names | source of truth for fast-changing technical claims |

## Current official scope anchors

### Standard exam guide

Current package mapping follows the Standard Associate Cloud Engineer Exam Guide linked from the Google Cloud certification experience.

Exam-domain weighting used by this package:

1. Setting up a cloud solution environment — approximately 20%
2. Planning and implementing a cloud solution — approximately 30%
3. Ensuring successful operation of a cloud solution — approximately 30%
4. Configuring access and security — approximately 20%

Detailed evidence: [ACE-100-PERCENT-QA-MATRIX.md](./ACE-100-PERCENT-QA-MATRIX.md).

### Google Skills learning path

The public Google Skills ACE certification path was rechecked on **2026-10-07** and currently shows **17 activities**.

Path: https://www.skills.google/paths/11

The repository keeps the activity-level crosswalk in:

- [LEARNING-PATH-STUDY-GUIDE-TH.md](./LEARNING-PATH-STUDY-GUIDE-TH.md)
- [GOOGLE-SKILLS-CURRICULUM.md](./GOOGLE-SKILLS-CURRICULUM.md)

## Repository teaching layers

| Layer | Purpose |
|---|---|
| Modules 01–13 | durable concept / operations / troubleshooting teaching |
| Path Activity 01–17 notes | learning-path sequence and activity-specific context |
| ACE Visual Study Guide | architecture, flow, decision and troubleshooting maps |
| ACE Modern Objectives Deep Dive | current exam-guide topics that older ACE material may omit |
| Lab Guide TH | original companion practice; not official grader solutions |
| Cheat Sheet / Glossary / Exam Scenarios | review and retrieval practice |
| ACE 100% QA Matrix | declared-scope completeness evidence |

## Currentness policy

Recheck current Google Cloud documentation before relying on facts that can change materially, including:

- pricing,
- quotas and capacity,
- region/zone availability,
- accelerator types,
- product lifecycle or renaming,
- supported integrations,
- security defaults,
- console navigation.

Durable mental models can remain in the teaching modules; volatile operational facts should be dated or linked to current documentation.

## Integrity / copyright boundary

This package is an independently written Thai learning companion.

Do not add:

- certification exam dumps,
- hidden Google Skills grader logic,
- copied paid-course passages,
- proprietary figures when an original Mermaid/SVG explanation can teach the concept.

Official Google Skills labs remain authoritative for hands-on grader behavior.

## Maintenance trigger

Re-run the package QA and update this manifest when:

1. the Standard ACE Exam Guide changes,
2. the Google Skills path activity count/order changes,
3. a named service in the current objective map is renamed, deprecated, or materially changes role,
4. a major identity/networking/security recommendation changes,
5. the package verification date is renewed.
