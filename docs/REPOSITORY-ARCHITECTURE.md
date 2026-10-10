# Repository Architecture

## Goal

This repository is a long-lived personal learning knowledge base. Its navigation is optimized around the owner's active learning goals: the root exposes a small number of curated **learning systems**, not a mirror of every course, ebook, provider or Drive folder.

## Canonical taxonomy — Learning System First

~~~text
<repository-root>/
├─ README.md
├─ AGENTS.md
├─ SKILL.md
├─ docs/
├─ skills/
├─ templates/
├─ assets/                # shared, original learning visuals
├─ <Learning-System-A>/
├─ <Learning-System-B>/
├─ <Learning-System-C>/
├─ <Learning-System-D>/
└─ <Learning-System-E>/
~~~

Current systems:

~~~text
AWS-SAA-C03/
Azure-AZ-104/
GCP-ACE/
ISC2-CC/
Oracle-Database/
~~~

A top-level learning-system name should communicate the actual learner goal. Certification-centered systems normally use a provider + certification identifier, for example AWS-SAA-C03, Azure-AZ-104, GCP-ACE and ISC2-CC. Durable non-certification systems may use a goal name such as Oracle-Database when several product versions support one continuing learner goal. Non-certification systems may use a durable skill goal such as Linux-Administration when that goal becomes substantial enough to maintain.

## System contract

Every substantial top-level learning system must have:

~~~text
<Learning-System>/
├─ README.md
├─ SOURCE-MANIFEST.md
├─ *QA*.md
└─ learning content / layers
~~~

A system may be flat when that is easiest to learn, as with GCP ACE, or layered when several source identities support one goal.

### Layered-system example

~~~text
AWS-SAA-C03/
├─ README.md
├─ SOURCE-MANIFEST.md
├─ SYSTEM-QA.md
├─ 01-Certification-Core/
├─ 02-Architecture-Foundation/
└─ 03-Hands-On-Projects/
~~~

The nested layers may retain their own README, source manifest and QA evidence because they have different source identities. They must still feel like parts of one learner journey from the top-level system README.

## When to create a new top-level system

Create a new system when the learner goal is independently understandable, actively useful and maintainable, for example another certification such as ISC2-CISSP or a genuinely standalone Linux/Kubernetes learning track if it grows into a full journey.

Do **not** create a new top-level folder merely because:

- content came from a different book/course,
- a lab repository existed separately,
- the content type is Projects instead of Notes,
- the cloud provider is the same but the material supports an existing system,
- a PDF, ebook, saved course or Drive folder exists but is not yet an active learning goal.

If the material reinforces an existing learning goal, integrate it as a layer inside that system.

## Learning layers

Common internal layers include:

- certification/current-objective core,
- versioned foundation course,
- hands-on projects/labs,
- visual guide,
- currentness overlay,
- scenarios/practice,
- source/provenance evidence,
- QA/regression tooling.

These are implementation details inside a learning system, not root navigation categories.

## Navigation hierarchy

1. Root README.md = global learning-system catalog.
2. Learning-system README.md = single learner entry point and study order.
3. Layer README.md = detailed path for a source/course/project layer when needed.
4. Module/lab files = actual learning content.

Every new top-level learning system must be linked from the root README in the same change.

## Naming

- Top-level systems: concise, recognizable learning goal names such as AWS-SAA-C03.
- Ordered layers: two-digit prefix when order matters, e.g. 01-Certification-Core.
- Modules: Module-01-Topic.md.
- Labs: Lab-01-Topic.md.
- Avoid generic root folders such as AWS, Azure, GCP, Courses, Books, Projects, misc, new, final2.

## Status model

- Planning — scope only.
- In Progress — actively authored, known gaps remain.
- Review — coverage is believed complete but QA is unfinished.
- Verified — declared source/scope/date and relevant quality gates pass.
- Archived — retained for history; not current guidance.

A Verified top-level system must expose source traceability and QA evidence.

## Migration policy

Prefer atomic subtree moves so internal relative links survive. After a structural migration:

1. update cross-layer links,
2. update root/system navigation,
3. update CI paths,
4. update current architecture/governance docs,
5. run internal-link and package-specific regression checks.

Historical audit documents may retain old paths when clearly labeled as historical records.
