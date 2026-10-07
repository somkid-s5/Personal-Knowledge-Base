# Cloud Engineer Lab — Project QA Matrix

[Back to package README](./README.md) · [Project Standard](./PROJECT-STANDARD.md) · [Source Manifest](./SOURCE-MANIFEST.md)

> **QA date:** 2026-10-07  
> **Declared verification scope:** workbook structure, learning/safety sections, project inventory, local artifact presence and lightweight secret-pattern regression checks  
> **Machine audit:** [tools/audit_projects.py](./tools/audit_projects.py)

## Inventory

| Item | Expected | Verified |
|---|---:|---:|
| Preparation project | Project 00 | **1/1** |
| Hands-on projects | Projects 01–34 | **34/34** |
| Project README workbooks | 00–34 | **35/35** |
| Architecture visuals | Projects 01–34 | **34/34** |
| Runnable/inspectable non-README artifacts | Projects 01–34 | **34/34 project directories contain artifacts** |

## Workbook contract

Every project workbook is required to contain the following learning dimensions:

| Dimension | Result |
|---|---|
| Scenario / problem | **35/35** |
| Architecture / topology | **35/35** |
| Prerequisites / estimated effort | **35/35** |
| Ordered tasks / implementation | **35/35** |
| Verification | **35/35** |
| Troubleshooting | **35/35** |
| Exercises / review | **35/35** |
| Cost awareness | **35/35 after 2026-10-07 safety pass** |
| Cleanup guidance | **35/35 after 2026-10-07 safety pass** |

Explicit Failure Injection / Incident / RCA sections are **not a mandatory 35/35 contract**. They are strongly encouraged where breaking the environment is safe and pedagogically useful. Troubleshooting remains mandatory for every project.

## 2026 safety/currentness pass

High-impact corrections completed in this QA pass:

- Project 00 no longer teaches Root User → IAM User → long-lived access key → `AdministratorAccess` as the default human workstation setup.
- Temporary credentials through IAM Identity Center/federation or supported AWS CLI sign-in are the default learning model.
- The package landing page no longer instructs learners to use long-lived admin access keys.
- The landing page no longer references the old split `SCENARIO.md`, `GUIDE.md` and `CHECKLIST.md` layout; each project uses one consolidated workbook.
- Project README marketing no longer claims every project contains Failure Testing / Incident Stories.
- Missing cost/cleanup guidance was added to the project workbooks that lacked it.
- Certification claims are framed as skills reinforcement rather than unverified exam-objective completeness.

## Automated audit

The project audit fails when:

- project numbering is not exactly 00–34,
- a project lacks `README.md`,
- a required workbook concept is absent,
- project 01–34 lacks any inspectable artifact beyond the workbook,
- simple AWS access-key/secret-assignment patterns are detected in text files.

It emits a warning, not a failure, when a project lacks an explicit Incident/RCA/Failure Injection section.

## What this verification does not prove

This QA does **not** claim that:

- every command in all 34 projects was executed live on 2026-10-07,
- every Terraform/provider/Kubernetes dependency is the newest possible release,
- every architecture is production-ready for every organization,
- every AWS service price/quota/Region combination is timeless,
- the track fully covers any specific certification exam.

Those claims require a different technical/runtime or certification-specific audit.

## Completion label

When CI passes, the correct package label is:

> **Verified Project Workbook Structure & Safety Baseline — Project 00 + Projects 01–34; all 35 workbooks satisfy the common learning contract, with cost/cleanup guidance, current human-authentication baseline and regression QA.**

This is intentionally narrower and more defensible than calling all 34 implementations permanently current.
