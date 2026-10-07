# Repository Audit — 2026-10-06

> **Historical snapshot.** This file records the repository state during the first architecture migration. For the current baseline, see [Repository Baseline Audit — 2026-10-07](./REPOSITORY-AUDIT-2026-10-07.md).

## Executive summary
The repository already contains strong learning material, especially the Architecting on AWS package and the GCP Associate Cloud Engineer package. The main weakness was not technical content volume; it was **repository-level consistency and governance**.

Before this architecture pass, the root mixed provider folders and one-off certification folders, navigation was stale, and there were no repository-wide authoring rules, source policy, visual standard, reusable templates, quality gate or automated structural checks.

This pass establishes the repository as a scalable learning knowledge base rather than a collection of unrelated notes.

## What was already strong
### GCP — Associate Cloud Engineer
- Current exam/path mapping and non-lab QA matrix exist.
- Detailed modules, activity notes, visual guide, modern-objective deep dive, scenarios, glossary and companion labs exist.
- The package demonstrates the desired future direction: source-aware, visual, operational and exam-mapped.

### AWS — Architecting on AWS 7.12.4
- Modules 1–13 are substantial and organized for reading.
- Diagrams/assets, lab guides, mock exam, exam mode and cheat sheet provide multiple learning modes.
- Package-level README provides a clear study path.

### AWS — SAA-C03 practice material
- Six large explanation files exist and are discoverable through a package README.
- Explanations are useful as practice review material.

## Problems found before this pass
1. **Inconsistent taxonomy** — AWS course content lived under `AWS/`, while `AWS_SAA_C03/` lived at repository root and GCP certification content used another pattern.
2. **No repository governance** — no `AGENTS.md`, `SKILL.md`, content/source/visual standards or QA gate.
3. **Stale root portal** — root README described the repo mainly as certification notes and contained outdated paths/status wording.
4. **No provider indexes** — AWS and GCP had no provider-level landing page for future packages.
5. **No reusable templates** — future content could easily drift into a different structure/style.
6. **No formal source/freshness policy** — important because cloud products, exam guides and learning paths change.
7. **No explicit definition of `Complete` / `100%`** at repository level.
8. **No automated repository-structure/documentation QA.**
9. **Source/provenance risk needs review** for redistributable screenshots and third-party practice-exam question text before any future public release.
10. **Package maturity is uneven** — GCP ACE has a formal QA matrix; AWS packages do not yet use the same repository-wide quality gate.

## Changes made in this pass
### Structure
Canonical paths are now:

```text
AWS/Courses/Architecting-on-AWS-7.12.4/
AWS/Certifications/SAA-C03/
GCP/Certifications/Associate-Cloud-Engineer/
```

Provider-level `README.md` files were added.

### Governance
Added:
- `AGENTS.md`
- `SKILL.md`
- `docs/REPOSITORY-ARCHITECTURE.md`
- `docs/CONTENT-STANDARD.md`
- `docs/SOURCE-POLICY.md`
- `docs/VISUAL-STANDARD.md`
- `docs/QUALITY-GATE.md`
- reusable files under `templates/`
- pull request quality checklist

### Navigation
The root README was redesigned as a knowledge-base portal rather than a single certification landing page.

### Package maturity labels
- Architecting on AWS now explicitly says **content-complete against the named course, repository-wide QA migration pending**.
- SAA-C03 now explicitly says **practice set complete**, not full current exam-guide coverage.
- GCP ACE remains the reference example for a package with an explicit objective-by-objective QA matrix.

### Automated quality checks
Added:
- `.github/scripts/validate_repo_structure.py` — fail-fast structural rules for required governance files, provider READMEs and package READMEs.
- `.github/workflows/repo-quality.yml` — structure validation plus Markdown linting of governance/index files.
- `.github/workflows/link-health.yml` — scheduled/manual advisory link health using Lychee.
- `.github/dependabot.yml` — weekly GitHub Actions dependency updates.
- `.markdownlint-cli2.jsonc` — pragmatic lint configuration that can expand to legacy packages gradually.

The external link checker is intentionally advisory because vendor documentation sites can rate-limit or reject automated requests; structural validation is a hard gate.

### Secret hygiene
`.gitignore` now excludes common local environment files, key/certificate files and Terraform state/generated directories that may contain sensitive information.

## Remaining work — recommended phases
### Phase 2 — Complete AWS package normalization
- Create a package-level QA matrix for Architecting on AWS if it should be promoted from `Review` to `Verified` under the new repository standard.
- Turn SAA-C03 into a true certification learning package only if desired: lock the current official exam guide, build an objective inventory, add missing theory/visual/troubleshooting content and create a QA matrix.
- Decide whether internal flat module layouts should remain; do not migrate to `modules/` merely for aesthetics because link churn has a maintenance cost.

### Phase 3 — Source and provenance review
- Review `assets/source/` images and confirm whether they should stay private, be replaced with original diagrams, or have provenance/licensing notes.
- Review SAA-C03 practice-exam material before any public release; avoid redistributing third-party copyrighted question banks without permission.
- Add package-level `SOURCES.md` where source provenance is complex.

### Phase 4 — Expand automated QA gradually
- Extend Markdown lint coverage into mature packages after legacy formatting is normalized.
- Consider secret scanning and a package metadata checker if the repository grows substantially.
- Keep link health advisory unless external-site reliability becomes predictable enough for a hard gate.

### Phase 5 — Cross-cloud/topic knowledge
As reusable notes grow, add vendor-neutral domains only when they contain real content, for example:
- `Kubernetes/Topics/`
- `Linux/Topics/`
- `DevOps/Topics/`
- `Security/Topics/`

Avoid duplicating the same explanation in every provider package; create a shared topic only when it becomes genuinely reusable.

## Current architecture assessment after this pass
- **Content quality:** strong, but package maturity still varies.
- **Navigation:** strong after the new root/provider indexes.
- **Scalability:** strong with provider/domain → content type → package taxonomy.
- **Authoring consistency:** governed by repository-wide rules/templates.
- **Source/freshness discipline:** policy exists; older packages still need retroactive review.
- **Automated QA:** baseline implemented; broader legacy coverage can be phased in.
- **Security hygiene:** improved with ignore rules and agent/source policies.
- **Public-release readiness:** not assumed; provenance/copyright review is required first.

## Principle going forward
The repository should optimize for **future learning and maintainability**, not file count. A new note is valuable when it is accurate, teachable, connected to the knowledge map, visually clear where appropriate, and maintainable when the platform changes.
