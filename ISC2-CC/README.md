# ISC2-CC — Certified in Cybersecurity

> **System status:** **In Progress — current scope locked; private source ingestion and teaching reconstruction pending**  
> **Primary scope authority:** ISC2 Certified in Cybersecurity Exam Outline effective **2026-09-01**  
> **Build mode:** Hybrid — Source-ingestion + current official scope verification  
> **Last scope verification:** 2026-10-07

[← Repository root](../README.md)

## What this system is

This is the personal learning system for **ISC2 Certified in Cybersecurity (CC)**.

The current official exam outline is the authority for **what must be learned now**. The private study material already stored in Google Drive is treated as supporting source material, not as automatically current content.

This distinction matters because the CC outline changed materially on 2026-09-01. Older study guides can still teach useful fundamentals, but their domain names, weighting and organization must be remapped before they are used as current exam notes.

## Current exam domains

| Domain | Weight | Learning role |
|---|---:|---|
| 1. Security Principles | 24% | Core security, risk, governance, controls and ethics |
| 2. Security Governance | 17.3% | GRC, resilience, awareness and effectiveness measurement |
| 3. Identity and Access Management (IAM) Concepts | 20% | Identity lifecycle, authentication and logical access |
| 4. Networking and Cloud Security Concepts | 21.3% | Networking, segmentation, defense architecture and cloud security |
| 5. Security Operations and Incident Response | 17.3% | Data protection, monitoring, threat context, IR, asset protection and testing |

See [CURRENT-EXAM-MAP.md](./CURRENT-EXAM-MAP.md) for the current study map.

Current teaching artifacts:

- [Domain 1 — Security Principles](./01-Security-Principles.md)
- [Domain 3 — Identity and Access Management](./03-Identity-Access-Management.md)
- [Current Study Plan](./STUDY-PLAN.md)

## Source model

~~~text
Current ISC2 exam outline
        ↓
current objective map
        ↓
private Drive study material
        ↓
remap / gap analysis
        ↓
Thai teaching reconstruction
        ↓
practice + review + QA
~~~

Private Drive sources currently include Thor study guides/quick sheets, mnemonics and a study plan. They are registered in [SOURCE-MANIFEST.md](./SOURCE-MANIFEST.md) and tracked in [SOURCE-COVERAGE.md](./SOURCE-COVERAGE.md).

The repository does **not** copy the proprietary PDFs themselves.

## Recommended learning order

1. Read [CURRENT-EXAM-MAP.md](./CURRENT-EXAM-MAP.md) to understand the 2026 target.
2. Follow [STUDY-PLAN.md](./STUDY-PLAN.md) for the current recommended sequence.
3. Start with [Domain 1 — Security Principles](./01-Security-Principles.md), then continue with [Domain 3 — Identity and Access Management](./03-Identity-Access-Management.md).
4. Continue with Domain 4 because networking/cloud security is the largest technical domain.
5. Study Domain 2 to connect governance, resilience and security awareness.
6. Finish with Domain 5 to connect daily operations, monitoring, incident response and testing.
7. Use repository-authored scenarios and review notes as they are added.

## Current state

Already done:

- current 2026 ISC2 CC scope identified,
- official domain weights recorded,
- private Drive source set inventoried,
- pre-2026 material clearly separated from current scope,
- current-source and QA scaffolding created,
- current teaching notes created for Domain 1 and Domain 3,
- historical Thor study-plan concepts reconstructed into a current 2026 study plan.

Still pending:

- full read of every private source file,
- source-to-2026-objective mapping,
- identification of 2026 topics missing from older material,
- Domain 2, 4 and 5 Thai teaching notes,
- full source-fidelity pass for Domain 1 and Domain 3 material,
- original diagrams and practice scenarios,
- final quality-gate review.

## Completion rule

Do not label this system `Verified`, `Complete` or `100%` until every current official objective is mapped to teaching content and every registered private source is accounted for.

Current status is intentionally **In Progress**.

## Evidence

- [Current Exam Map](./CURRENT-EXAM-MAP.md)
- [Source Manifest](./SOURCE-MANIFEST.md)
- [Source Coverage](./SOURCE-COVERAGE.md)
- [System QA](./SYSTEM-QA.md)

## Official references

- [ISC2 CC Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- [ISC2 CC Certification](https://www.isc2.org/certifications/cc)
