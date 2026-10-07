# Repository Baseline Audit — 2026-10-07

> **Status:** Current repository-wide baseline  
> **Supersedes as current-status reference:** `REPOSITORY-AUDIT-2026-10-06.md`  
> **Purpose:** record what is actually verified now, what CI enforces, and what still remains intentionally outside the verification claim.

## Executive summary

The repository has moved from a collection of learning folders into a governed, source-aware learning knowledge base.

Current strengths:

- canonical provider/domain → content type → learning package taxonomy,
- root/provider/package navigation,
- repository-wide authoring rules and reusable skills/templates,
- source/freshness/visual/quality policies,
- hard CI gates for structure and internal links,
- package-specific regression audits for mature packages,
- explicit, scope-bounded `Verified` labels rather than vague completeness claims,
- source manifests and package-level QA evidence for verified packages.

The major architecture/governance migration is complete for the current package set.

## Current canonical packages

| Provider | Type | Package | Current declared status |
|---|---|---|---|
| AWS | Course | Architecting on AWS 7.12.4 | **Verified Course Scope** |
| AWS | Certification | SAA-C03 | **Verified Current Objective Scope** |
| AWS | Project track | Cloud Engineer Lab | **Verified Project Workbook Structure & Safety Baseline** |
| Azure | Certification | AZ-104 | **Verified Current Objective Scope** |
| GCP | Certification | Associate Cloud Engineer | **Verified Non-Lab Objective Scope** |

Each `Verified` label is intentionally different because the packages have different sources and goals. Verification always means “passes the declared scope/date contract,” not “everything about the platform is permanently complete.”

## Governance layer

Repository-wide control files now include:

- `AGENTS.md`
- `SKILL.md`
- `skills/INTERNET-FIRST-CURRICULUM.md`
- `skills/SOURCE-INGESTION-CURRICULUM.md`
- `docs/REPOSITORY-ARCHITECTURE.md`
- `docs/CONTENT-STANDARD.md`
- `docs/SOURCE-POLICY.md`
- `docs/VISUAL-STANDARD.md`
- `docs/QUALITY-GATE.md`
- reusable package/module/lab/source templates

The authoring model is:

```text
lock source/scope
→ inventory objectives/source units
→ scaffold package
→ teach for understanding
→ visual pass
→ practice/troubleshooting
→ currentness/fact-check
→ QA evidence
→ CI
→ publish/update navigation
```

## CI / regression gates

Current repository quality checks include:

1. **Canonical structure validation**
   - required governance files exist,
   - provider/domain indexes exist,
   - learning packages have README files,
   - legacy root layouts are blocked.

2. **Verified package evidence contract**
   - a package that explicitly declares Verified status must expose:
     - `SOURCE-MANIFEST.md`,
     - package-level QA evidence.

3. **Internal Markdown link validation**
   - missing local files/directories fail CI.

4. **Governance Markdown lint**
   - maintains baseline readability without forcing legacy style churn everywhere.

5. **AZ-104 packed payload regression audit**
   - decodes the real gzip/base64 learning payload,
   - checks 82/82 current skill-bullet evidence,
   - checks lab/question/flashcard inventory.

6. **SAA-C03 provenance guard**
   - protects the canonical practice layer from known provenance regressions.

7. **AWS Cloud Engineer Lab workbook audit**
   - validates the shared project workbook/safety contract.

8. **External link health**
   - remains scheduled/advisory because vendor sites may rate-limit or block automated requests.

## Package status notes

### AWS — Architecting on AWS 7.12.4

Current state:

- 13/13 course module families mapped,
- 7/7 companion lab guides mapped,
- currentness overlay present,
- source manifest and course QA matrix present,
- historical Student Guide-derived images removed from the current tree,
- original Mermaid/SVG visuals retained.

Important caveat:

- Git history was **not** rewritten, so earlier source-image blobs may still exist in old commits. A future public-release process must decide whether history rewriting is necessary.

### AWS — SAA-C03

Current state:

- current exam scope mapped,
- 14/14 task families covered,
- 189/189 current published Knowledge/Skill bullets accounted for,
- current-scope teaching layer and QA matrix present,
- practice provenance guard present,
- known provenance-unclear legacy practice files removed from the current tree.

### AWS — Cloud Engineer Lab

Current state:

- Project 00 + Projects 01–34,
- package-level source manifest and project QA matrix,
- shared project workbook/safety contract,
- CI regression audit.

Verification here is about workbook structure/safety baseline, not a claim that every tool/version in every project is permanently production-current.

### Azure — AZ-104

Current state:

- official Microsoft Learn skills measured as of 2026-04-17,
- 15/15 objective groups,
- 82/82 skill-bullet evidence checks against the decoded interactive payload,
- maintained Thai current-objectives deep dive,
- 10 interactive visual labs,
- 155 scenario questions,
- 103 flashcards,
- currentness overlay and source manifest,
- CI payload audit.

### GCP — Associate Cloud Engineer

Current state:

- Standard ACE Exam Guide objective coverage,
- 17/17 current Google Skills activities mapped,
- source manifest,
- visual study guide,
- modern-objective deep dive,
- objective-by-objective non-lab QA matrix.

Official Google Skills lab/grader completion remains external to the repository by design.

## What is intentionally not claimed

This repository does **not** claim:

- permanent truth about AWS/Azure/GCP,
- guaranteed certification success,
- complete coverage of every product in any cloud,
- that vendor UI, pricing, quotas, Region support or service lifecycle never changes,
- that automated keyword/regression checks replace human technical review,
- that old Git history is redistribution-clean,
- that official external labs can be replaced by repository companion labs.

## Remaining non-blocking work

### 1. Public-release/history policy

If the repository is ever made broadly public, decide whether to:

- keep current history and rely on current-tree cleanup,
- rewrite Git history to purge old restricted blobs,
- move licensed private source/reference material into a separate private repository or storage location.

This is a release/legal/provenance decision, not a current learning-quality blocker.

### 2. Mirror synchronization policy

Standalone repositories such as the AZ-104 interactive mirror or Cloud Engineer Lab mirror should not become competing sources of truth.

Preferred direction:

```text
Cloud-Engineer canonical package
        ↓
optional deploy/focused mirror
```

If bidirectional edits are ever required, document an explicit sync workflow first.

### 3. Semantic review remains human work

CI can prove:

- expected files exist,
- links resolve,
- declared inventory markers remain,
- workbook/payload contracts remain.

CI cannot prove that an explanation is pedagogically perfect or that every cloud recommendation remains correct forever. Major platform/exam updates still require official-source review.

### 4. Currentness maintenance

Re-run package QA whenever:

- an exam guide/skills-measured version changes,
- a learning path changes,
- a named service is renamed/deprecated,
- identity/security/networking defaults change materially,
- imported source payloads are regenerated.

## Current architecture assessment

| Dimension | Assessment |
|---|---|
| Repository architecture | **Mature baseline** |
| Navigation | **Strong** |
| Source traceability | **Strong for current verified packages** |
| Authoring consistency | **Strong and governed** |
| Package-level QA | **Strong for current canonical packages** |
| Automated regression protection | **Strong baseline** |
| Internal link integrity | **Hard-gated** |
| External link integrity | **Advisory by design** |
| Provenance/current-tree hygiene | **Strong, with Git-history caveat** |
| Long-term maintainability | **Strong if verification dates are maintained** |

## Principle going forward

The repository should grow by adding **well-scoped learning packages**, not by accumulating loose notes.

For every substantial new package:

1. identify the source mode,
2. declare source/scope/date,
3. create a source manifest,
4. build teachable content,
5. add visuals where they improve understanding,
6. add practice/troubleshooting,
7. create QA evidence,
8. pass repository CI,
9. only then use a `Verified` or completeness label.

The goal is not “more files.” The goal is a knowledge base that remains understandable, auditable and maintainable years later.
