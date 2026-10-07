# AZ-104 — Current Objective QA Matrix

[Back to package README](./README.md) · [Source Manifest](./SOURCE-MANIFEST.md) · [Currentness](./CURRENTNESS-2026.md)

> **QA date:** 2026-10-07  
> **Official scope:** Microsoft Learn AZ-104 skills measured as of 2026-04-17  
> **Automated inventory:** [official-skills-2026-04-17.json](./official-skills-2026-04-17.json)  
> **Regression audit:** [tools/audit_payload.py](./tools/audit_payload.py)

## What was actually verified

The interactive study payload is gzip/base64 packed, so this QA does not infer coverage from file names. CI decodes the same `content-data.*.b64` files that the browser loads and checks the real learning payload.

Current decoded inventory:

- 5 domains
- 15 official objective groups
- 180 learning topics
- 752 learning lines
- 82/82 current skill-bullet evidence checks
- 10/10 visual lab pages
- 155 scenario questions
- 103 flashcards
- 14 topic-linked architecture/decision diagrams plus the dedicated visual labs

The 82-item inventory is a repository paraphrase of the current Microsoft Learn skills list. It exists to make completeness testable without copying the study guide as a substitute for the official source.

## Objective-group results

| Domain | Objective | Current skill bullets | Payload evidence | Status |
|---|---|---:|---|---|
| Identity & Governance | 1.1 Manage Microsoft Entra users and groups | 5 | 7 topics / 33 lines | **PASS 5/5** |
| Identity & Governance | 1.2 Manage access to Azure resources | 3 | 13 topics / 52 lines | **PASS 3/3** |
| Identity & Governance | 1.3 Manage Azure subscriptions and governance | 7 | 11 topics / 55 lines | **PASS 7/7** |
| Storage | 2.1 Configure access to storage | 5 | 10 topics / 38 lines | **PASS 5/5** |
| Storage | 2.2 Configure and manage storage accounts | 5 | 16 topics / 54 lines | **PASS 5/5** |
| Storage | 2.3 Configure Azure Files and Azure Blob Storage | 7 | 19 topics / 58 lines | **PASS 7/7** |
| Compute | 3.1 Automate deployment with ARM templates or Bicep | 5 | 6 topics / 29 lines | **PASS 5/5** |
| Compute | 3.2 Create and configure virtual machines | 7 | 16 topics / 65 lines | **PASS 7/7** |
| Compute | 3.3 Provision and manage containers | 4 | 5 topics / 23 lines | **PASS 4/4** |
| Compute | 3.4 Create and configure Azure App Service | 8 | 14 topics / 62 lines | **PASS 8/8** |
| Networking | 4.1 Configure and manage virtual networks | 5 | 9 topics / 50 lines | **PASS 5/5** |
| Networking | 4.2 Configure secure access to virtual networks | 5 | 9 topics / 37 lines | **PASS 5/5** |
| Networking | 4.3 Configure name resolution and load balancing | 3 | 9 topics / 52 lines | **PASS 3/3** |
| Monitoring & Recovery | 5.1 Monitor resources in Azure | 6 | 21 topics / 78 lines | **PASS 6/6** |
| Monitoring & Recovery | 5.2 Implement backup and recovery | 7 | 15 topics / 66 lines | **PASS 7/7** |

**Objective coverage result: 82/82 current skill bullets have explicit evidence in the real payload.**

## Quality-gate review

| Quality dimension | Evidence | Status |
|---|---|---|
| Declared scope | Current Microsoft Learn date and five-domain weights recorded | **PASS** |
| Objective coverage | 82/82 automated evidence checks against decoded payload | **PASS** |
| No heading-only coverage | Every objective contains 23–78 decoded teaching lines and multiple topics; current objective deep-dive adds a durable explanatory layer | **PASS** |
| Decision/tradeoff learning | Exam Trigger/Trap/Rule sections, comparisons, scenario bank and current objective decision maps | **PASS** |
| Visual learning | 14 topic-linked diagrams + 10 interactive visual labs | **PASS** |
| Practice | 155 original scenario questions + 103 flashcards | **PASS** |
| Operations/troubleshooting | Network, load balancing, monitoring, backup/recovery and service-specific troubleshooting sections | **PASS** |
| Current exam scope | Microsoft Learn 2026-04-17 objective set used | **PASS** |
| Current platform deltas | High-impact 2025–2026 networking retirements/default changes documented separately | **PASS with overlay** |
| Source traceability | imported repo snapshot + user-owned source declaration + official scope source recorded | **PASS** |
| CI | payload decode/coverage + repository structure + links + Markdown checks | **PASS** |

## What the automated 82/82 check means

The validator is intentionally a **regression guard**, not a semantic oracle. For each current skill item it confirms that expected concept markers exist inside the correct decoded objective, rather than somewhere random in the repository.

That protects against accidental payload replacement, missing sections or future edits that silently drop an exam skill. Human-readable topic structure, line depth, diagrams, labs and scenarios are reviewed separately in this matrix. The repository also maintains [AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md](./AZ-104-CURRENT-OBJECTIVES-DEEP-DIVE-TH.md) so semantic teaching quality does not depend on packed-payload presence checks alone.

## Completion label

As of 2026-10-07, the package can be labeled:

> **Verified Current Objective Scope — AZ-104 skills measured 2026-04-17; 15/15 objective groups and 82/82 current skill bullets evidenced in the decoded learning payload, with visual/practice/currentness layers present.**

This does not mean Azure itself is permanently frozen or that passing the exam is guaranteed. Re-run the audit whenever Microsoft publishes a new skills-measured version.
