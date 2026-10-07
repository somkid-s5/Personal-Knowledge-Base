# Architecting on AWS 7.12.4 — Course QA Matrix

[Back to package README](./README.md) · [Currentness overlay](./CURRENTNESS-2026.md) · [Sources](./SOURCES.md) · [Provenance](./PROVENANCE.md)

> **QA date:** 2026-10-07  
> **Course-fidelity source:** *Architecting on AWS 7.12.4 (EN) — Student Guide* / Lab Guide  
> **Current public scope cross-check:** AWS Classroom Training → **Architecting on AWS** course outline currently linked from the AWS Training catalog  
> **Important:** PASS below means the repository covers the declared course scope. It does not mean every AWS product feature outside this course is covered.

## 1. Course-scope completeness

The current AWS classroom outline still uses the same 13-module architecture represented by this package.

| # | Current AWS course outline family | Repository note | Visual evidence | Status |
|---:|---|---|---|---|
| 1 | Architecting Fundamentals — services, infrastructure, Well-Architected | [Module 01](./Module-01-Architecting-Fundamentals.md) | Mermaid + original SVG | **PASS** |
| 2 | Account Security — principals, identities, policies, multiple accounts | [Module 02](./Module-02-Account-Security.md) | Mermaid + original SVG | **PASS** |
| 3 | Networking 1 — IP addressing, VPC fundamentals, traffic security | [Module 03](./Module-03-Networking-1.md) | Mermaid + original SVG | **PASS** |
| 4 | Compute — compute services, EC2, EC2 storage/pricing, Lambda | [Module 04](./Module-04-Compute.md) | Mermaid + original SVG | **PASS** |
| 5 | Storage — storage services, S3, shared file systems, migration | [Module 05](./Module-05-Storage.md) | Mermaid + original SVG | **PASS** |
| 6 | Database Services — RDS, DynamoDB, caching, migration | [Module 06](./Module-06-Database-Services.md) | Mermaid + original SVG | **PASS** |
| 7 | Monitoring and Scaling — monitoring, alarms/events, LB, Auto Scaling | [Module 07](./Module-07-Monitoring-and-Scaling.md) | Mermaid + original SVG | **PASS** |
| 8 | Automation — CloudFormation, infrastructure management | [Module 08](./Module-08-Automation.md) | Mermaid + original SVG | **PASS** |
| 9 | Containers — microservices, containers, container services | [Module 09](./Module-09-Containers.md) | Mermaid + original SVG | **PASS** |
| 10 | Networking 2 — endpoints, peering, hybrid networking, Transit Gateway | [Module 10](./Module-10-Networking-2.md) | Mermaid + original SVG | **PASS** |
| 11 | Serverless — API Gateway, SQS, SNS, Kinesis, Step Functions | [Module 11](./Module-11-Serverless.md) | Mermaid + original SVG | **PASS** |
| 12 | Edge Services — Route 53, CloudFront, DDoS protection, Outposts | [Module 12](./Module-12-Edge-Services.md) | Mermaid + original SVG | **PASS** |
| 13 | Backup and Recovery — disaster planning, AWS Backup, recovery strategies | [Module 13](./Module-13-Backup-and-Recovery.md) | Mermaid + original SVG | **PASS** |

**Result: 13/13 module families covered.**

## 2. Hands-on sequence

This package contains seven Thai lab guides matching the major hands-on sequence represented by the course materials.

| Lab | Main learning outcome | Repository guide | Status |
|---:|---|---|---|
| 1 | Console / AWS CLI / S3 foundations | [Lab 01](./Lab-Guide-TH/Lab-01-Console-and-CLI-TH.md) | **PASS — companion course guide** |
| 2 | Build VPC infrastructure | [Lab 02](./Lab-Guide-TH/Lab-02-Building-VPC-Infrastructure-TH.md) | **PASS — companion course guide** |
| 3 | Create database layer | [Lab 03](./Lab-Guide-TH/Lab-03-Database-Layer-TH.md) | **PASS — companion course guide** |
| 4 | Configure high availability | [Lab 04](./Lab-Guide-TH/Lab-04-High-Availability-TH.md) | **PASS — companion course guide** |
| 5 | Build serverless architecture | [Lab 05](./Lab-Guide-TH/Lab-05-Serverless-Architecture-TH.md) | **PASS — companion course guide** |
| 6 | CloudFront with S3 origin | [Lab 06](./Lab-Guide-TH/Lab-06-CloudFront-S3-Origin-TH.md) | **PASS — companion course guide** |
| 7 | Multi-tier capstone | [Lab 07](./Lab-Guide-TH/Lab-07-Capstone-TH.md) | **PASS — companion course guide** |

These files are study companions. The actual AWS-hosted lab environment and instructor-provided course resources remain the authoritative hands-on environment.

## 3. Teaching-quality gate

| Quality dimension | Evidence | Status |
|---|---|---|
| Purpose / mental model | Modules explain why a service/pattern exists before feature detail | **PASS** |
| Architecture / flow | All 13 modules have Mermaid and/or original SVG visual summaries | **PASS** |
| Decision making | Comparison tables and scenario-oriented sections are present across core service families | **PASS** |
| Security / reliability | IAM, VPC controls, HA, backup/DR and Well-Architected principles are integrated | **PASS** |
| Operations / troubleshooting | Operational checks and failure thinking are present, but depth varies by module | **PASS for course level** |
| Reviewability | Cheat sheet, exam mode, mock exam, answer key and module reviews exist | **PASS** |
| Current-product accuracy | Historical course material is separated from a currentness overlay | **PASS with overlay** |
| Source-image provenance | Original Mermaid/SVG visuals retained; 13 Student Guide-derived module images + 7 Lab Guide-derived lab images removed from current tree; Git-history caveat documented | **PASS — known image blocker** |

## 4. Currentness gate

The package intentionally preserves the 7.12.4 course structure, while [CURRENTNESS-2026.md](./CURRENTNESS-2026.md) records important changes in current AWS guidance and naming.

Current high-impact deltas already documented include:

- workforce access: federation / IAM Identity Center + temporary credentials preferred over routine IAM-user long-term credentials,
- centralized root access management for AWS Organizations member accounts,
- CloudFront **OAC** preferred over legacy **OAI** for S3 origins,
- **Amazon Data Firehose** as the current name for the former Amazon Kinesis Data Firehose,
- AWS CLI v2 as the maintained default for new learning workflows.

## 5. Completion label

As of 2026-10-06 the correct package label is:

> **Verified Course Scope — 13/13 modules + 7/7 companion lab guides; currentness overlay present; known module/lab source-image blocker removed from the current tree.**

Do not shorten this to “everything in AWS is current” or “complete AWS architecture reference.” The package is a high-quality reader for the named course, augmented with current AWS notes.
