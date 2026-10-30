# 📋 GCP ACE — Textbook Completion & Verification

> Updated 2026-10-30 | **TEXTBOOK_AUTHORED 17/17** from the historical Google Skills Path snapshot. This means the full Thai teaching text was written and is subject to static QA. It is **not** a proprietary video transcript, independently tested pedagogy, or Google Skills graded-lab completion.

[📘 Textbook Standard](./TEXTBOOK-QUALITY-STANDARD.md) · [🌤️ GCP Hub](./README.md) · [📚 Optional Library](./REFERENCE-LIBRARY.md)

## ✅ Completion statuses — do not conflate them

| Layer | Status | What it proves |
|---|---|---|
| Thai self-study teaching authored | **17/17 TEXTBOOK_AUTHORED** | Concepts, architecture logic, real scenarios, read-only practice, failure reasoning and answer explanations appear in the main chapter of every page |
| Editorial/independent learner review | **0/17 EDITORIAL_REVIEWED** | A knowledgeable independent reviewer or learner still needs to test comprehension |
| Official hands-on lab execution | **0/17 LAB_EXECUTED** | No Google Cloud resource was provisioned and no official grader was completed |
| Build/source/visual QA | **CI_CHECKED** | Automated checks can inspect pages, links, code fences, diagrams and published files, not understanding |
| Current Learning Path parity | **CURRICULUM_RECONCILIATION_REQUIRED** | Canonical Path #11 showed 13 activities publicly on 30 Oct 2026; other search snapshots showed 17. Our stable IDs remain historical until titles/order can be verified |

## 📖 All historical Activity chapters

| ID | Teaching topic | Open the full Thai lesson | Writing status |
|---|---|---|---|
| gcp-001 | A Tour of Google Cloud Hands-on Labs | [Activity 01](./Path-Activity-01-GSP282-TH.md) | TEXTBOOK_AUTHORED |
| gcp-002 | ACE Study Guide | [Activity 02](./Path-Activity-02-ACE-Study-Guide-TH.md) | TEXTBOOK_AUTHORED |
| gcp-003 | Infrastructure Foundation | [Activity 03](./Path-Activity-03-Foundation-TH.md) | TEXTBOOK_AUTHORED |
| gcp-004 | Infrastructure Core Services | [Activity 04](./Path-Activity-04-Core-Services-TH.md) | TEXTBOOK_AUTHORED |
| gcp-005 | Scaling and Automation | [Activity 05](./Path-Activity-05-Scaling-Automation-TH.md) | TEXTBOOK_AUTHORED |
| gcp-006 | GKE | [Activity 06](./Path-Activity-06-GKE-TH.md) | TEXTBOOK_AUTHORED |
| gcp-007 | Cloud Run | [Activity 07](./Path-Activity-07-Cloud-Run-TH.md) | TEXTBOOK_AUTHORED |
| gcp-008 | Cloud Run Functions | [Activity 08](./Path-Activity-08-Cloud-Run-Functions-TH.md) | TEXTBOOK_AUTHORED |
| gcp-009 | Database Selection | [Activity 09](./Path-Activity-09-Database-Selection-TH.md) | TEXTBOOK_AUTHORED |
| gcp-010 | Cloud GPUs | [Activity 10](./Path-Activity-10-AI-Cloud-GPUs-TH.md) | TEXTBOOK_AUTHORED |
| gcp-011 | Cloud TPUs | [Activity 11](./Path-Activity-11-AI-Cloud-TPUs-TH.md) | TEXTBOOK_AUTHORED |
| gcp-012 | AI Deployment Types | [Activity 12](./Path-Activity-12-AI-Deployment-Types-TH.md) | TEXTBOOK_AUTHORED |
| gcp-013 | Logging & Monitoring | [Activity 13](./Path-Activity-13-Logging-Monitoring-TH.md) | TEXTBOOK_AUTHORED |
| gcp-014 | Terraform Getting Started | [Activity 14](./Path-Activity-14-Terraform-Getting-Started-TH.md) | TEXTBOOK_AUTHORED |
| gcp-015 | Load Balancing Skill Badge | [Activity 15](./Path-Activity-15-Load-Balancing-Skill-Badge-TH.md) | TEXTBOOK_AUTHORED |
| gcp-016 | Kubernetes Applications Skill Badge | [Activity 16](./Path-Activity-16-Kubernetes-Applications-Skill-Badge-TH.md) | TEXTBOOK_AUTHORED |
| gcp-017 | Terraform Infrastructure Skill Badge | [Activity 17](./Path-Activity-17-Terraform-Build-Infrastructure-Skill-Badge-TH.md) | TEXTBOOK_AUTHORED |

## 📚 Reading layout

Each Activity opens with one **primary textbook chapter**, written so readers can understand the essential concepts *without* first watching a video. The previous notes, extra definitions and practice tasks are retained below a clearly marked **optional appendix** instead of being mixed into the primary explanation. The 13 Modules, 6 Companion Labs, visual gallery and exam reviews remain in the optional [Reference Library](./REFERENCE-LIBRARY.md).

## ⚠️ Current official Path may differ from historical path

[Canonical Google Skills Path #11](https://www.skills.google/paths/11) showed **13 activities** on 30 Oct 2026 without login; indexed/parameterized views and the earlier site snapshot show **17 activities**. The current dynamic page doesn't reveal the full course inventory in the available public response. **Do not assert 17/17 current official path match**. Keep `gcp-001..017` progress IDs and links unchanged until a verified activity-by-activity reconciliation (including course IDs and ordering) can safely reorganize the navigation. No 17 historical chapter was deleted.

## 🧪 Editorial acceptance protocol

1. Read the primary chapter only; can a new learner explain why each system component exists?
2. Reconstruct the architecture, evaluate alternatives, and diagnose one previously unseen failure.
3. Verify version-sensitive claims against current official Google Cloud product documentation.
4. Read/edit visuals with the configured Diagram Design Skill if diagrams actually need to be created/changed. Current lesson diagrams were retained, not redrawn in this task.
5. Validate any cloud commands only in an authorized temporary Skills project/sandbox, with Expected vs Actual, Billing/Quota boundaries and cleanup.
6. For official Graded Lab PASS, retain sanitized result from Google Skills; CI BUILD PASS is not Lab PASS.

**Textbook authoring is complete for all 17 historical pages. Independent pedagogy review, runtime labs and current official path reconciliation are separate work, not silently counted as done.**
