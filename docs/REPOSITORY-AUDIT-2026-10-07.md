# Repository Baseline Audit — 2026-10-07

> **Status:** Current repository-wide baseline  
> **Architecture:** Learning System First  
> **Historical records:** the 2026-10-06 audit/consolidation files describe earlier provider-first migration stages and are not current architecture authority.

## Executive summary

The repository now operates as a **personal learning knowledge base** with four active top-level learning systems:

1. AWS-SAA-C03
2. Azure-AZ-104
3. GCP-ACE
4. ISC2-CC

This retains the learning-system-first navigation while broadening the repository mission beyond Cloud Engineer-only material. The connected Drive is treated as a source library; GitHub remains the curated set of active learning goals.

Governance, source traceability, QA evidence and CI remain repository-wide.

The AWS learner model is now explicit: **Certification = target**, **Course = method to build understanding**, and **Projects = proof through implementation/troubleshooting**.

## Current canonical systems

| System | Goal | Internal model | Declared status |
|---|---|---|---|
| AWS-SAA-C03 | AWS architecture + SAA-C03 | current certification core + versioned architecture foundation + hands-on project track | **Verified learning system** |
| Azure-AZ-104 | Microsoft Azure Administrator | current-objective teaching + interactive practice/labs | **Verified Current Objective Scope** |
| GCP-ACE | Google Cloud Associate Cloud Engineer | integrated modules + learning-path activities + visuals/labs | **Verified Non-Lab Objective Scope** |
| ISC2-CC | ISC2 Certified in Cybersecurity | current 2026 objective teaching + private historical source remap + review/practice | **Verified Current Objective Teaching Scope — 19/19** |

Verification remains bounded by each system's declared source, date and QA definition.

## Canonical repository shape

~~~text
Personal-Knowledge-Base/
├─ README.md
├─ AGENTS.md
├─ SKILL.md
├─ docs/
├─ skills/
├─ templates/
├─ AWS-SAA-C03/
├─ Azure-AZ-104/
├─ GCP-ACE/
└─ ISC2-CC/
~~~

Generic provider roots such as AWS/, Azure/ and GCP/ are no longer canonical.

## AWS system design

AWS is intentionally represented once at root:

~~~text
AWS-SAA-C03/
├─ README.md
├─ SOURCE-MANIFEST.md
├─ SYSTEM-QA.md
├─ 01-Certification-Core/
├─ 02-Architecture-Foundation/
└─ 03-Hands-On-Projects/
~~~

### 01-Certification-Core

Purpose: current SAA-C03 exam scope and current service knowledge. This layer defines the **target**: what the learner must know for the current SAA-C03 scope.

Evidence:
- 14/14 task families,
- 189/189 published Knowledge/Skill bullets accounted for,
- current-scope deep dive,
- original scenarios,
- source/provenance controls.

### 02-Architecture-Foundation

Purpose: long-form architecture theory from Architecting on AWS 7.12.4. This is the main **course/foundation layer** used to understand the target in depth.

Evidence:
- 13/13 course module families,
- 7/7 companion lab guides,
- original diagrams,
- currentness overlay,
- course/source QA.

This layer stays versioned instead of pretending the historical course itself is a live certification guide.

The current tree also has the known proprietary-derived AWS course image blocker cleaned up: **13 Student Guide-derived module images + 7 Lab Guide-derived lab images (20 known source images total)** are absent from the current tree. Git history has not been rewritten, so this is not a blanket public-redistribution claim.

### 03-Hands-On-Projects

Purpose: implementation, troubleshooting, cost/cleanup and portfolio practice. This layer is the practical **proof of skill**.

Evidence:
- Project 00 + Projects 01–34,
- shared project workbook/safety contract,
- project QA matrix,
- CI audit.

## Azure system

Azure-AZ-104 remains a single top-level system.

Current evidence:
- Microsoft Learn skills measured 2026-04-17,
- 15/15 objective groups,
- 82/82 skill-bullet evidence checks,
- maintained Thai current-objectives deep dive,
- 10 interactive visual labs,
- 155 scenario questions,
- 103 flashcards,
- currentness overlay,
- source manifest,
- payload regression audit.

## GCP system

GCP-ACE remains a single top-level system.

Current evidence:
- Standard ACE Exam Guide mapped,
- 17/17 Google Skills activities mapped,
- source manifest,
- modules and activity notes,
- visual guide,
- modern-objective deep dive,
- companion lab guides,
- objective-by-objective non-lab QA matrix.

Official Google Skills grader completion remains external by design.

## ISC2 CC system

ISC2-CC is the first non-cloud-provider learning system. The official ISC2 CC exam outline effective 2026-09-01 is the current scope authority.

Current evidence:
- 5/5 domains have Thai teaching content,
- 19/19 numbered objectives map to teaching artifacts,
- AI-security concepts are integrated across all five domains,
- all 11 supplied/discovered private Drive source files are explicitly accounted for,
- the pre-2026 Thor domain organization is remapped to the current outline,
- the unavailable full Thor Domain 5 Study Guide is documented as not supplied rather than silently inferred,
- current study plan, cheat sheet and 25 original scenarios are present,
- repository quality CI passed for the verification candidate.

Declared status: **Verified Current Objective Teaching Scope — 19/19**, verified 2026-10-07. This is a bounded current-objective/source-accounting claim, not an exam-pass guarantee.

## Governance layer

Repository-wide controls include:

- AGENTS.md
- SKILL.md
- Internet-first and Source-ingestion authoring skills
- Repository Architecture
- Content Standard
- Source Policy
- Visual Standard
- Quality Gate
- reusable templates

The authoring model is:

~~~text
choose learner goal/system
→ lock source/scope
→ inventory objectives/source units
→ design internal learning layers
→ teach for understanding
→ visual pass
→ practice/troubleshooting
→ currentness/fact-check
→ QA evidence
→ CI
→ publish
~~~

## CI / regression gates

Current hard checks include:

1. canonical active learning systems exist,
2. generic provider-first roots do not return,
3. Verified systems expose SOURCE-MANIFEST.md and system-level QA evidence,
4. AWS-SAA-C03 retains its three required ordered layers,
5. internal Markdown links resolve,
6. governance Markdown lint passes,
7. AZ-104 packed payload audit passes,
8. SAA-C03 provenance audit passes,
9. AWS project workbook audit passes.

External web-link health remains scheduled/advisory because vendor sites may rate-limit automated checks.

## Architecture decision rule going forward

The key question for new material is:

> Does this material support an existing learner goal?

If yes, integrate it into that learning system as a layer, module, lab or currentness supplement.

Create a new top-level system only when it represents a genuinely independent learner journey, for example another certification such as AWS-SAP-C02 or Azure-AZ-305.

Do not create generic provider buckets merely to classify file types.

## What is intentionally not claimed

The repository does not claim:

- every cloud service is covered,
- exam guides never change,
- vendor UI/pricing/quotas/regions are permanent,
- automated QA replaces human semantic review,
- official external labs can be replaced by companion labs,
- old Git history is necessarily redistribution-clean.

## Remaining non-blocking maintenance

- Re-audit systems when official certification scope changes.
- Update currentness overlays when major platform defaults or service lifecycle change.
- Decide Git-history/public-release policy before broad public redistribution.
- Keep standalone mirrors subordinate to the canonical learning system.
- Add new top-level systems only when a new learner goal actually exists.

## Current assessment

| Dimension | Assessment |
|---|---|
| Root navigation | **Simple: 4 active learning systems** |
| AWS learner UX | **Unified — target → course → projects model explicit** |
| Architecture/governance | **Mature baseline** |
| Source traceability | **Strong** |
| Package/system QA | **Strong for current systems** |
| Internal links | **Hard-gated** |
| Regression protection | **Strong baseline** |
| Long-term maintainability | **Strong if verification dates stay current** |

## Principle going forward

The repository should feel like a personal bookshelf with a few curated learning systems, not a mirror of every file stored in Drive.

> Open root → choose an active learning system → follow one coherent learning journey. Keep raw/source material in Drive until it deserves promotion into the curated knowledge base.
