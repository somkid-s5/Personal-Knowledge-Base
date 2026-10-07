# Source Manifest — Architecting on AWS 7.12.4

[Back to package README](./README.md) · [Detailed sources](./SOURCES.md) · [Course QA matrix](./COURSE-QA-MATRIX.md) · [Provenance](./PROVENANCE.md)

> **Authoring mode:** Source-ingestion + current official-document verification  
> **Manifest reviewed:** 2026-10-07  
> **Historical learning source:** licensed *Architecting on AWS 7.12.4 (EN) — Student Guide* and corresponding Lab Guide  
> **Current verification source:** official AWS Training and AWS service documentation

## Source classes

| Class | Source | Role in this package | Redistribution treatment |
|---|---|---|---|
| Historical course | Architecting on AWS 7.12.4 Student Guide | module sequence, course concepts, historical page mapping | reference only; do not reproduce proprietary pages/figures |
| Historical labs | Corresponding Architecting on AWS Lab Guide | official classroom hands-on sequence | reference/crosswalk only; repository labs are learning companions |
| Current course scope | AWS Classroom Training catalog + Architecting on AWS outline | verify the current 13-module course family | link/reference |
| Current product behavior | AWS service documentation | verify security defaults, names, tooling and modern recommendations | link/reference |
| Repository content | Thai explanations, Mermaid, original SVGs, scenarios, review material | teachable learning layer | original repository content |

## Current official scope anchor

The current official Architecting on AWS outline describes an intermediate three-day course and retains the 13 module families represented in this package:

1. Architecting Fundamentals
2. Account Security
3. Networking 1
4. Compute
5. Storage
6. Database Services
7. Monitoring and Scaling
8. Automation
9. Containers
10. Networking 2
11. Serverless
12. Edge Services
13. Backup and Recovery

The exact mapping and evidence live in [COURSE-QA-MATRIX.md](./COURSE-QA-MATRIX.md).

## Currentness sources

High-impact modern behavior is verified from official AWS documentation. Important families include:

- IAM / IAM Identity Center / AWS Organizations / STS
- AWS CLI v2 authentication
- Amazon VPC and hybrid networking
- EC2 / EBS / Lambda
- S3 / EFS / FSx / migration services
- RDS / Aurora / DynamoDB / DMS
- CloudWatch / CloudTrail / ELB / Auto Scaling
- CloudFormation / Systems Manager
- ECS / EKS / Fargate / ECR
- API Gateway / SQS / SNS / Kinesis / Step Functions
- Route 53 / CloudFront / WAF / Shield / Global Accelerator
- AWS Backup and Well-Architected reliability guidance

Use [SOURCES.md](./SOURCES.md) for the detailed documentation map and [CURRENTNESS-2026.md](./CURRENTNESS-2026.md) for material deltas from the historical course.

## Provenance boundary

Licensed source material is not part of the publishable teaching layer. The current repository tree no longer contains the 13 historical Student Guide-derived images that previously lived under `assets/source/`. Original Mermaid and SVG learning diagrams remain.

Git history has **not** been rewritten, so earlier blobs may remain reachable from old commits. See [PROVENANCE.md](./PROVENANCE.md).

## Maintenance trigger

Re-run source/currentness QA when any of these happens:

- AWS publishes a materially different Architecting on AWS outline,
- a service used by the course is renamed, deprecated or changes security guidance,
- authentication or root-account recommendations change,
- a lab pattern becomes legacy/not recommended,
- the package is prepared for public redistribution.
