# SAA-C03 Objective-Level QA Matrix — 2026-10-06

[Back to SAA Hub](./README.md) · [Current Scope Deep Dive](./CURRENT-SCOPE-DEEP-DIVE.md) · [Exam Guide Map](./EXAM-GUIDE-MAP.md) · [Study Path](./STUDY-PATH.md)

> **Source of truth:** current web-based AWS Certified Solutions Architect – Associate (SAA-C03) Exam Guide on AWS Documentation  
> **Checked:** 2026-10-06  
> **Scope of this QA:** every published **Knowledge of** and **Skills in** bullet under the 14 current task statements. The guide explicitly says the service list is non-exhaustive and can change, so “100%” here means 100% of the published objective bullets on the checked date — not every AWS service or every possible exam question.

## 0. Completion rule

An objective family gets **PASS** only when the repository provides enough material to answer:

1. what problem/pattern the objective represents,
2. how the relevant AWS services differ,
3. when to select one option over another,
4. the security/resilience/performance/cost tradeoff where relevant,
5. at least one concrete course/project/deep-dive path for study.

The current official blueprint contains:

| Domain | Tasks | Knowledge + Skill bullets |
|---|---:|---:|
| 1. Secure Architectures | 3 | 32 |
| 2. Resilient Architectures | 2 | 43 |
| 3. High-Performing Architectures | 5 | 50 |
| 4. Cost-Optimized Architectures | 4 | 64 |
| **Total** | **14** | **189** |

The tables below compress closely related official bullets into learning families, but every published bullet is accounted for by one of the rows.

---

# Domain 1 — Design Secure Architectures (30%)

## Task 1.1 — Secure access to AWS resources

| Official knowledge/skill family | Primary teaching evidence | Reinforcement | Status |
|---|---|---|---|
| Multi-account access controls and account management | Architecting Module 02 + Deep Dive §1.1 | Project 21 / 25 / 34 | **PASS** |
| Federation, IAM and IAM Identity Center | Module 02 + Architecting `CURRENTNESS-2026.md` + Deep Dive §1.1–1.2 | Project 25 | **PASS** |
| Global infrastructure as a security/scope boundary | Module 01 + Module 03 | Project 06 / 20 | **PASS** |
| Least privilege and shared responsibility | Modules 01–02 | Security projects | **PASS** |
| Root/IAM-user security incl. MFA | Module 02 + currentness overlay | Deep Dive §1.1 | **PASS** |
| Users/groups/roles/policies authorization model | Module 02 | Deep Dive + original current-scope scenarios | **PASS** |
| STS, role switching and cross-account RBAC | Module 02 + Deep Dive §1.1 | multi-account projects | **PASS** |
| Multi-account security with Control Tower/SCPs | Module 02 + **Deep Dive §1.1 adds Control Tower** | Project 21 / 34 | **PASS** |
| Resource-policy selection | Module 02 + S3/edge modules | Project 01 / 17 | **PASS** |
| Directory federation to roles | Module 02 + Deep Dive §1.1–1.2 | current identity guidance | **PASS** |

**Task 1.1: 11/11 official bullets accounted for — PASS.**

## Task 1.2 — Secure workloads and applications

| Official knowledge/skill family | Primary teaching evidence | Reinforcement | Status |
|---|---|---|---|
| Application configuration / credential security | Deep Dive §1.3 + Module 02 | Project 17 Secrets Management | **PASS** |
| Service endpoints / private AWS-service access | Modules 03/10 + Deep Dive §1.4 | Project 16 / 25 | **PASS** |
| Ports, protocols and network traffic controls | Module 03 | Project 02 / 06 / 25 | **PASS** |
| Secure application access | Modules 02/03/12 + Deep Dive §1.2/1.5 | serverless/security projects | **PASS** |
| Cognito, GuardDuty, Macie use cases | **Deep Dive §1.2 and §1.5** | Project 30 for threat/SecOps context | **PASS** |
| DDoS / SQL injection and external threats | Module 12 + Deep Dive §1.5 | Project 30 / 34 | **PASS** |
| Secure VPC design: SG/routes/NACL/NAT | Module 03 + Deep Dive §1.4 | Project 06 / 16 / 25 | **PASS** |
| Public/private segmentation | Module 03 | Project 06 / 25 | **PASS** |
| Shield/WAF/Identity Center/Secrets Manager integration | Module 12 + Deep Dive §1.3/1.5 | Projects 17 / 34 | **PASS** |
| VPN/Direct Connect secure external connectivity | Module 10 | Projects 16 / 31 | **PASS** |

**Task 1.2: 10/10 official bullets accounted for — PASS.**

## Task 1.3 — Data security controls

| Official knowledge/skill family | Primary teaching evidence | Reinforcement | Status |
|---|---|---|---|
| Data access/governance | Modules 02/05/06 + Deep Dive §1.6 | Project 21 / 30 | **PASS** |
| Recovery / backup / replication | Module 13 | Project 15 / 20 | **PASS** |
| Retention and classification | Module 05 + Deep Dive §1.6 | Project 30 security-data context | **PASS** |
| Encryption/key management | Module 02/05/06 + Deep Dive §1.6 | Project 17 | **PASS** |
| Compliance-oriented service selection | Module 01/02 + Deep Dive §1.6 | Projects 21 / 30 | **PASS** |
| At-rest encryption with KMS | Modules 02/05/06 | Project 17 / 34 | **PASS** |
| In-transit encryption with ACM/TLS | Modules 03/12 + Deep Dive §1.6 | Project 01 / 06 | **PASS** |
| Key access policies | Module 02 + Deep Dive KMS policy trap | Project 17 | **PASS** |
| Backups and replication | Module 13 | Project 15 / 20 | **PASS** |
| Data access/lifecycle/protection policies | Module 05 + Deep Dive §1.6 | Project 01 / 21 | **PASS** |
| Key rotation and certificate renewal | Deep Dive §1.6 + Module 02/12 concepts | Project 17 | **PASS** |

**Task 1.3: 11/11 official bullets accounted for — PASS.**

### Domain 1 result

**32/32 published Knowledge/Skill bullets accounted for — PASS.**

---

# Domain 2 — Design Resilient Architectures (26%)

## Task 2.1 — Scalable and loosely coupled architectures

| Objective family | Primary teaching evidence | Reinforcement | Status |
|---|---|---|---|
| API creation / API Gateway / REST | Module 11 + Deep Dive §2.4 | Project 08 | **PASS** |
| Managed/purpose-built services incl. Transfer Family, SQS, Secrets Manager | Modules 05/11 + Deep Dive §1.3/3.5 | Projects 17 / 24 | **PASS** |
| Caching strategies | Module 06/12 | Project 34 | **PASS** |
| Stateless vs stateful microservices | Module 09 + Deep Dive §2.2 | Projects 06 / 12 | **PASS** |
| Event-driven architecture | Module 11 + Deep Dive §2.1 | Project 24 | **PASS** |
| Horizontal vs vertical scaling | Module 07 + Deep Dive §2.1 | Projects 06 / 34 | **PASS** |
| Edge acceleration / CDN | Module 12 + Deep Dive §2.4 | Project 01 | **PASS** |
| Migrating applications to containers | Module 09 + Deep Dive §2.3 | Projects 09 / 12 | **PASS** |
| Load balancing | Module 07/10 | Projects 06 / 34 | **PASS** |
| Multi-tier architecture | Modules 03/07 | Project 06 / 34 | **PASS** |
| Queuing/pub-sub | Module 11 + Deep Dive §2.1 | Project 24 | **PASS** |
| Serverless/Fargate/Lambda patterns | Modules 04/09/11 + Deep Dive §2.3 | Project 08 / 12 | **PASS** |
| Object/file/block storage | Module 05 | projects using S3/EBS/EFS | **PASS** |
| ECS/EKS orchestration | Module 09 | Project 12 | **PASS** |
| Read-replica selection | Module 06 + Deep Dive §2.5 | Project 34 | **PASS** |
| Workflow orchestration / Step Functions | Module 11 + Deep Dive §2.1 | event-driven practice | **PASS** |
| Design event-driven/microservice/multi-tier from requirements | Deep Dive §2.1–2.4 | Projects 06/08/24/34 | **PASS** |
| Determine component scaling | Module 07 + Deep Dive §2.1 | Projects 06/12/34 | **PASS** |
| Select services for loose coupling | Module 11 + Deep Dive §2.1 | Project 24 | **PASS** |
| Decide when containers fit | Module 09 + Deep Dive §2.3 | Project 12 | **PASS** |
| Decide when serverless fits | Module 11 + Deep Dive §2.3 | Project 08 | **PASS** |
| Recommend compute/storage/network/database technologies | Course Modules 03–12 + Deep Dive | Project 34 | **PASS** |
| Use purpose-built AWS services rather than one-size-fits-all | Deep Dive cross-domain decision method | course comparison sections | **PASS** |

**Task 2.1: 23/23 official bullets accounted for — PASS.**

## Task 2.2 — Highly available and/or fault-tolerant architectures

| Objective family | Primary teaching evidence | Reinforcement | Status |
|---|---|---|---|
| Regions/AZs/Route 53 | Modules 01/12 | Project 20 | **PASS** |
| Managed/purpose-built services | course service-selection mental models + Deep Dive | multiple projects | **PASS** |
| Route tables/basic networking | Module 03 | Project 06 / 16 | **PASS** |
| DR patterns, RPO/RTO | Module 13 + Deep Dive §2.7 | Project 15 / 20 | **PASS** |
| Distributed design patterns | Modules 07/11/12 + Deep Dive | Projects 20/24/34 | **PASS** |
| Failover strategies | Modules 06/12/13 | Project 15 / 20 | **PASS** |
| Immutable infrastructure | Module 08 + **Deep Dive §2.8** | IaC projects | **PASS** |
| Load balancing | Module 07 | Project 06 / 34 | **PASS** |
| RDS Proxy / proxy concepts | **Deep Dive §2.6** | Project 34 already covers connection exhaustion | **PASS** |
| Quotas and throttling | **Deep Dive §2.9** | project failure scenarios | **PASS** |
| Storage durability/replication | Modules 05/13 | Project 15 / 20 | **PASS** |
| Workload visibility / X-Ray | **Deep Dive §2.10** | Project 08 implements X-Ray; Project 34 tracing scenario | **PASS** |
| Automation for infrastructure integrity | Module 08 | Terraform/IaC projects | **PASS** |
| Cross-AZ/Region HA/FT service selection | Modules 07/12/13 + Deep Dive | Projects 15/20/34 | **PASS** |
| Business-aligned availability metrics | Module 07 + Deep Dive §2.10 | Project 34 SLO scenario | **PASS** |
| Mitigate single points of failure | Modules 07/13 | Projects 06/34 | **PASS** |
| Data durability / backups | Module 13 | Project 15 | **PASS** |
| Select DR strategy | Module 13 + Deep Dive §2.7 | Project 15 | **PASS** |
| Improve reliability of legacy/non-cloud-native apps | Deep Dive §2.7–2.9: LB/replication/DR/decoupling patterns without assuming rewrite | migration/DR projects | **PASS** |
| Purpose-built services for reliability | Deep Dive decision model + course | projects | **PASS** |

**Task 2.2: 20/20 official bullets accounted for — PASS.**

### Domain 2 result

**43/43 published Knowledge/Skill bullets accounted for — PASS.**

---

# Domain 3 — Design High-Performing Architectures (24%)

## Task 3.1 — High-performing/scalable storage

| Objective family | Evidence | Status |
|---|---|---|
| Hybrid storage solutions | Module 05 + Deep Dive §3.1 | **PASS** |
| S3/EFS/EBS service selection | Module 05 | **PASS** |
| Object/file/block characteristics | Module 05 + Deep Dive §3.1 | **PASS** |
| Match storage configuration to performance | Module 05 + Deep Dive §3.1 | **PASS** |
| Select storage that scales with future need | Module 05 + Deep Dive §3.1 | **PASS** |

**Task 3.1: 5/5 — PASS.**

## Task 3.2 — High-performing elastic compute

| Objective family | Evidence | Status |
|---|---|---|
| Batch/EMR/Fargate and compute use cases | **Deep Dive §3.2** + Modules 04/09 | **PASS** |
| Distributed compute / global-edge concepts | Modules 01/12 + Deep Dive §3.2 | **PASS** |
| Queue/pub-sub concepts | Module 11 | **PASS** |
| EC2/AWS Auto Scaling capabilities | Module 07 | **PASS** |
| Lambda/Fargate serverless patterns | Modules 04/09/11 | **PASS** |
| ECS/EKS orchestration | Module 09 | **PASS** |
| Decouple for independent scaling | Deep Dive §2.1/3.2 | **PASS** |
| Scaling metrics/conditions | Module 07 + Deep Dive §3.2 | **PASS** |
| Select EC2 compute options/features | Module 04 | **PASS** |
| Right-size resource type incl. Lambda memory | Module 04/11 + Deep Dive §3.2 | **PASS** |

**Task 3.2: 10/10 — PASS.**

## Task 3.3 — High-performing databases

| Objective family | Evidence | Status |
|---|---|---|
| Region/AZ database topology | Module 06 | **PASS** |
| ElastiCache/caching | Module 06 + Deep Dive §3.3 | **PASS** |
| Read/write access patterns | Module 06 + Deep Dive §3.3 | **PASS** |
| Capacity/instance/IOPS planning | Module 06 | **PASS** |
| Connections and proxies | Deep Dive §2.6/3.3 + Project 34 | **PASS** |
| Engine/migration use cases | Module 06 | **PASS** |
| Replication/read replicas | Module 06 | **PASS** |
| Relational/non-relational/serverless/in-memory types | Module 06 + Deep Dive §3.3 | **PASS** |
| Configure read-scaling architecture | Module 06 + Deep Dive | **PASS** |
| Design database architecture | Module 06 | **PASS** |
| Select relational engine | Module 06 | **PASS** |
| Aurora vs DynamoDB / database type choice | Module 06 | **PASS** |
| Integrate cache | Module 06 | **PASS** |

**Task 3.3: 13/13 — PASS.**

## Task 3.4 — High-performing/scalable networks

| Objective family | Evidence | Status |
|---|---|---|
| CloudFront / Global Accelerator | Module 12 + Deep Dive §3.4 | **PASS** |
| Subnet/routing/IP architecture | Modules 03/10 | **PASS** |
| Load balancing | Module 07/10 | **PASS** |
| VPN/Direct Connect/PrivateLink | Module 10 + Deep Dive §3.4 | **PASS** |
| Global/hybrid/multi-tier topology | Modules 03/10/12 | **PASS** |
| Network scaling/future capacity | Module 10 + Deep Dive §3.4 | **PASS** |
| Resource placement | Modules 01/03/10 | **PASS** |
| Load-balancer strategy | Module 07/10 | **PASS** |

**Task 3.4: 8/8 — PASS.**

## Task 3.5 — Data ingestion and transformation

| Objective family | Evidence | Status |
|---|---|---|
| Athena/Lake Formation/Quick analytics & visualization roles | **Deep Dive §3.5** + FinOps/SecOps projects | **PASS** |
| Ingestion patterns/frequency | Deep Dive §3.5 | **PASS** |
| DataSync / Storage Gateway transfer roles | Module 05 + Deep Dive §3.5 | **PASS** |
| Glue transformation | Deep Dive §3.5 + Project 18 Glue Catalog pipeline | **PASS** |
| Secure ingestion access | Deep Dive §3.5 + Domain 1 security patterns | **PASS** |
| Size/speed requirements | Deep Dive §3.5 | **PASS** |
| Kinesis streaming | Module 11 + Deep Dive §3.5 | **PASS** |
| Build/secure data lakes | Deep Dive §3.5 + Project 30 data-lake context | **PASS** |
| Streaming architecture | Module 11 + Deep Dive §3.5 | **PASS** |
| Transfer solutions | Module 05 + Deep Dive §3.5 | **PASS** |
| Visualization strategy | Deep Dive §3.5 | **PASS** |
| EMR compute for data processing | Deep Dive §3.2/3.5 | **PASS** |
| Ingestion configuration | Deep Dive §3.5 | **PASS** |
| Transform formats such as CSV→Parquet | Deep Dive §3.5 | **PASS** |

**Task 3.5: 14/14 — PASS.**

### Domain 3 result

**50/50 published Knowledge/Skill bullets accounted for — PASS.**

---

# Domain 4 — Design Cost-Optimized Architectures (20%)

## Task 4.1 — Cost-optimized storage

| Objective family | Evidence | Status |
|---|---|---|
| S3 Requester Pays / access-cost ownership | **Deep Dive §4.1** | **PASS** |
| Cost-allocation / consolidated billing concepts | Deep Dive §4.0 + FinOps projects | **PASS** |
| Cost Explorer/Budgets/CUR use cases | **Deep Dive §4.0** + Projects 18/29 | **PASS** |
| FSx/EFS/S3/EBS cost-aware service selection | Module 05 + Deep Dive §4.1 | **PASS** |
| Backup strategies | Module 13 | **PASS** |
| HDD/SSD block options/performance-cost | Module 05 + Deep Dive §4.1 | **PASS** |
| Data lifecycle | Module 05 | **PASS** |
| DataSync/Transfer Family/Storage Gateway | Module 05 + Deep Dive §3.5/4.1 | **PASS** |
| Storage access patterns | Module 05 | **PASS** |
| Cold/tiered storage | Module 05 + Deep Dive §4.1 | **PASS** |
| Object/file/block | Module 05 | **PASS** |
| Batch vs individual storage workflow | Deep Dive §4.1 | **PASS** |
| Correct storage sizing | Module 05 + Deep Dive §4.1 | **PASS** |
| Lowest-cost data-transfer method | Deep Dive §4.1 | **PASS** |
| Storage autoscaling need | Module 05 + service-specific scaling semantics in Deep Dive | **PASS** |
| S3 lifecycle management | Module 05 + Deep Dive §4.1 | **PASS** |
| Backup/archive selection | Module 13 + Module 05 | **PASS** |
| Migration-service selection | Module 05 + Deep Dive §3.5 | **PASS** |
| Storage-tier selection | Module 05 | **PASS** |
| Data-lifecycle selection | Module 05 | **PASS** |
| Lowest-cost fitting storage service | Module 05 + Deep Dive §4.1 | **PASS** |

**Task 4.1: 21/21 — PASS.**

## Task 4.2 — Cost-optimized compute

| Objective family | Evidence | Status |
|---|---|---|
| Cost allocation / multi-account billing | Deep Dive §4.0 + FinOps projects | **PASS** |
| Cost Explorer/Budgets/CUR | Deep Dive §4.0 + Projects 18/29 | **PASS** |
| Region/AZ cost/availability context | Module 01 + Deep Dive §4.2 | **PASS** |
| Spot/Reserved/Savings Plans | Module 04 + Deep Dive §4.2 | **PASS** |
| Edge/distributed compute | Module 12 | **PASS** |
| Outposts/hybrid compute | Module 12 | **PASS** |
| Instance families/sizes | Module 04 + Deep Dive §4.2 | **PASS** |
| Containers/serverless/microservices utilization | Modules 09/11 + Deep Dive §4.2 | **PASS** |
| Auto Scaling/hibernation strategies | Module 07 + Deep Dive §4.2 | **PASS** |
| ALB vs NLB vs GWLB cost/function fit | Modules 07/10 | **PASS** |
| Horizontal/vertical/hibernation scaling choice | Module 07 | **PASS** |
| Lambda vs EC2 vs Fargate cost fit | Deep Dive §4.2 + course | **PASS** |
| Availability class vs cost | Deep Dive §4.2 | **PASS** |
| Instance family selection | Module 04 | **PASS** |
| Instance size selection | Module 04 | **PASS** |

**Task 4.2: 15/15 — PASS.**

## Task 4.3 — Cost-optimized databases

| Objective family | Evidence | Status |
|---|---|---|
| Cost allocation/billing tools | Deep Dive §4.0 | **PASS** |
| Caching | Module 06 | **PASS** |
| Retention | Module 06/13 + Deep Dive §4.3 | **PASS** |
| Capacity planning/capacity units | Module 06 | **PASS** |
| Connections/proxies | Deep Dive §2.6/4.3 | **PASS** |
| Engine/migration use cases | Module 06 | **PASS** |
| Read replication | Module 06 | **PASS** |
| Relational/non-relational/Aurora/DynamoDB types | Module 06 | **PASS** |
| Backup/retention policy | Module 13 + Deep Dive §4.3 | **PASS** |
| MySQL/PostgreSQL engine selection | Module 06 | **PASS** |
| DynamoDB/RDS/serverless cost fit | Module 06 + Deep Dive §4.3 | **PASS** |
| Purpose-built/time-series/columnar decision concept | Deep Dive §4.3 | **PASS** |
| Schema/data migration across engines/locations | Module 06 | **PASS** |

**Task 4.3: 14/14 — PASS.**

## Task 4.4 — Cost-optimized networks

| Objective family | Evidence | Status |
|---|---|---|
| Cost allocation/billing tools | Deep Dive §4.0 | **PASS** |
| Load balancing | Modules 07/10 | **PASS** |
| NAT topology/cost | **Deep Dive §4.4** | **PASS** |
| Private/dedicated/VPN connectivity | Module 10 + Deep Dive §4.4 | **PASS** |
| Transit Gateway/VPC peering topology | Module 10 | **PASS** |
| DNS/network-service choice | Module 12 | **PASS** |
| Single/shared vs per-AZ NAT design | Deep Dive §4.4 | **PASS** |
| Direct Connect vs VPN vs internet | Module 10 + Deep Dive | **PASS** |
| Transfer-cost-aware routing/endpoints/Global Accelerator | Deep Dive §4.4 | **PASS** |
| CDN/edge caching strategy | Module 12 + Deep Dive §4.4 | **PASS** |
| Review workload for network optimization | Deep Dive §4.4 + FinOps projects | **PASS** |
| Throttling/backpressure strategy | Deep Dive §2.9/4.4 | **PASS** |
| Bandwidth allocation | Module 10 + Deep Dive §4.4 | **PASS** |
| Cost-management tooling family | Deep Dive §4.0 | **PASS** |

**Task 4.4: 14/14 — PASS.**

### Domain 4 result

**64/64 published Knowledge/Skill bullets accounted for — PASS.**

---

# Final objective QA result

| Domain | Result |
|---|---:|
| Secure Architectures | **32/32 PASS** |
| Resilient Architectures | **43/43 PASS** |
| High-Performing Architectures | **50/50 PASS** |
| Cost-Optimized Architectures | **64/64 PASS** |
| **Total** | **189/189 PASS** |

## What this 100% means

> **100% current published SAA-C03 Knowledge/Skill bullet coverage as checked on 2026-10-06.**

It does **not** mean:

- every AWS service is covered,
- the in-scope service list cannot change,
- exam questions are predictable,
- a learner will pass without hands-on practice,
- removed historical files are erased from old Git history.

AWS states that the guide/service list is non-exhaustive and subject to change. The `Last verified` date therefore matters.

## Remaining maintenance work

Objective coverage and the known current-tree practice-provenance blocker are both resolved within their declared scopes.

Remaining recurring work:

1. re-run this matrix when AWS changes the web-based exam guide,
2. keep new scenario practice repository-authored and provenance-clear,
3. recheck live service documentation for fast-changing behavior before production use.

See [PRACTICE-PROVENANCE.md](./PRACTICE-PROVENANCE.md) for the Git-history caveat.