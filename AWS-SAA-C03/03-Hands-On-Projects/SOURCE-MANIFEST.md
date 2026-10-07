# Cloud Engineer Lab — Source Manifest

[Back to package README](./README.md) · [Migration Note](./MIGRATION-NOTE.md) · [Project Standard](./PROJECT-STANDARD.md) · [QA Matrix](./PROJECT-QA-MATRIX.md)

> **Package type:** original hands-on project track  
> **Canonical home:** `AWS/Projects/Cloud-Engineer-Lab/`  
> **Manifest reviewed:** 2026-10-07

## Source classes

| Source | Type | Role | Snapshot / status |
|---|---|---|---|
| `somkid-s5/Cloud-Engineer-Lab` | original standalone GitHub repository | source of the imported project workbooks and runnable artifacts | imported 2026-10-06 from `14a4925efcd7158fe7a093b79fd2a58d778703c2` |
| Cloud-Engineer repository governance | repository standard | canonical structure, authoring, QA, safety and navigation rules | current main-repo policy |
| Current AWS documentation | official vendor documentation | verify authentication, service lifecycle, security and fast-changing operational behavior | recheck when a project is materially revised |
| Project source code / IaC | original repository artifacts | runnable or inspectable learning implementation | maintained with each project |

## Scope

The track contains:

- Project 00 — workstation / WSL / tooling / AWS CLI preparation
- Projects 01–34 — AWS-centered hands-on engineering projects
- architecture diagrams,
- Terraform / Terragrunt / Kubernetes / Helm / scripts / application code where applicable,
- advanced supplemental labs,
- a staged learning path from foundation to capstone.

This project track is broader than one certification. It must not be used as evidence that a certification exam guide is fully covered unless a certification package separately maps those objectives.

## Currentness boundary

The durable source is the **engineering scenario and reasoning**. The following are volatile and must be verified against current official docs before production use:

- authentication recommendations,
- service/SKU lifecycle,
- Kubernetes/EKS compatibility,
- Terraform/provider versions,
- pricing and Free Tier eligibility,
- regional availability,
- quotas/defaults,
- console navigation,
- exact CLI flags or install commands.

## Authentication source of truth

For human AWS access, current AWS IAM guidance favors federation and temporary credentials. Project 00 and the package landing page use that as the baseline rather than routine Root User access or a long-lived IAM user with `AdministratorAccess`.

Primary references:

- https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
- https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-user.html

## Cost / cleanup source of truth

Pricing changes, so workbook text should identify **cost-bearing resource families** and cleanup ownership rather than promise a fixed/free price.

Primary references:

- https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html
- https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/checklistforunwantedcharges.html

## Provenance

The imported project content is the user's own project repository rather than licensed course pages. Do not add third-party diagrams, paid-course screenshots, leaked assessment content or credentials merely because they are useful references.

## Maintenance triggers

Re-run project-track QA when:

1. a project is added/removed/renumbered,
2. workbook structure changes,
3. Project 00 authentication guidance changes,
4. a major AWS service used by a project is retired/renamed,
5. a project's IaC/runtime dependencies are upgraded,
6. the standalone mirror is synchronized back into the canonical package.
