# SAA-C03 Current-Scope Scenarios — Original Practice

> 🧠 **ภาพจำก่อนอ่าน:** 🧠 Concept → 🗺️ Flow → 🔎 Check → ✅ Explain  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ดูภาพช่วยจำ แล้วอ่านรายละเอียด/คำสั่งในบทนี้

[Back to SAA Hub](./README.md) · [Deep Dive](./CURRENT-SCOPE-DEEP-DIVE.md) · [QA Matrix](./QA-MATRIX.md)

> Original repository-authored scenarios based on public SAA-C03 objective families. These are **not real exam questions** and are intentionally written to test architecture reasoning rather than recall leaked wording.

## How to answer

For every scenario, identify:

1. the hard requirement,
2. the architecture dimension being tested,
3. the simplest AWS pattern that satisfies it,
4. why the nearest distractor loses.

---

## 1. Multi-account workforce access

A company has 40 AWS accounts and an existing corporate identity provider. Security wants employees to use corporate identities, avoid individual long-lived IAM access keys, and receive different permissions in development and production accounts.

**Best design:** Federate the workforce through **AWS IAM Identity Center**, assign permission sets/accounts by role, and use temporary role sessions.

**Why:** The requirement is centralized workforce access across accounts with temporary credentials.

**Trap:** Creating the same IAM users in 40 accounts duplicates identities and creates credential-management debt.

**Objective:** Domain 1 / secure access.

---

## 2. Governed account factory

An enterprise creates dozens of AWS accounts per quarter. Every new account must follow a standardized landing-zone design, central logging requirements, and OU-level governance controls with minimal manual setup.

**Best design:** **AWS Control Tower** with a governed landing zone and Account Factory, integrated with AWS Organizations.

**Why:** This is account provisioning + governance orchestration, not merely account grouping.

**Trap:** Organizations alone provides the organization/policy structure but does not by itself deliver the same prescriptive landing-zone/account-factory workflow.

**Objective:** Domain 1 / multi-account security.

---

## 3. Customer login vs engineer login

A public mobile application needs millions of customers to sign up and sign in. Separately, engineers need access to AWS accounts.

**Best design:** Use **Amazon Cognito** for application end users and **IAM Identity Center/federation** for workforce AWS-account access.

**Why:** These are two different identity populations and trust boundaries.

**Trap:** IAM Identity Center is not the normal customer identity store for a public app; Cognito is not the default workforce account-access service.

**Objective:** Domain 1 / secure application access.

---

## 4. Suspicious activity vs sensitive S3 data

Security has two questions: “Which AWS activity looks malicious?” and “Which S3 buckets contain sensitive data?”

**Best design:** Use **GuardDuty** for threat-detection findings and **Macie** for sensitive-data discovery/risk around S3.

**Why:** Detection signal and data-classification signal are different problems.

**Trap:** WAF filters web requests; it does not replace GuardDuty or Macie.

**Objective:** Domain 1 / security-service selection.

---

## 5. Serverless connection storm

A Lambda-based API scales from hundreds to thousands of concurrent executions. The relational database becomes unstable because too many connections open during bursts. Queries themselves are already efficient.

**Best design:** Put **Amazon RDS Proxy** between the application and supported RDS/Aurora database and continue to control Lambda concurrency/downstream capacity.

**Why:** The primary bottleneck is connection management, not read throughput.

**Trap:** A read replica does not solve a write-side or general connection-storm problem by itself.

**Objective:** Domain 2 / fault tolerance + Domain 3 / database performance.

---

## 6. Queue before scaling workers

An order-processing API receives unpredictable spikes. Processing can take several seconds, and orders must not be dropped if workers are temporarily overloaded.

**Best design:** Place **Amazon SQS** between the request/producer side and scalable workers; scale consumers based on backlog/workload metrics.

**Why:** A durable queue buffers spikes and lets producer/consumer capacity vary independently.

**Trap:** Direct synchronous calls keep the components tightly coupled and transfer overload upstream.

**Objective:** Domain 2 / loose coupling.

---

## 7. One event, multiple independent reactions

When an invoice is paid, finance, analytics, notification, and fraud systems each need their own independent processing path.

**Best design:** Publish the event through a fan-out/event-routing architecture such as **SNS or EventBridge**, with durable consumer paths where needed.

**Why:** One event must reach multiple independent consumers.

**Trap:** One SQS queue with four competing consumers distributes work; it does not automatically give every system its own copy.

**Objective:** Domain 2 / event-driven architecture.

---

## 8. RPO/RTO drives DR

A system can lose up to 15 minutes of data and must recover in under 30 minutes after a Region-level disaster. Keeping full production capacity active in two Regions is considered too expensive.

**Best design:** Evaluate a **warm-standby** style strategy with cross-Region data replication/backups and tested scaling/failover automation that meets the stated RPO/RTO.

**Why:** Requirements are tighter than backup-and-restore but do not necessarily justify always-on full active-active capacity.

**Trap:** “Multi-Region active-active” is not automatically best when cost is an explicit constraint.

**Objective:** Domain 2 / DR strategy.

---

## 9. DR quota failure

A company has copied AMIs and data to a secondary Region. During a DR exercise, the recovery stack cannot launch enough instances because the target Region lacks required service quota.

**Best design:** Treat **service quotas/capacity prerequisites as part of DR readiness**, request/validate them in advance, and test failover regularly.

**Why:** A backup is not a recoverable architecture unless dependencies can actually be provisioned.

**Trap:** More backups do not fix a launch-quota bottleneck.

**Objective:** Domain 2 / quotas and fault tolerance.

---

## 10. Find the slow hop

Users report intermittent 3-second checkout requests. CPU, memory, and aggregate error rate look normal. The request crosses API, Lambda/service code, and a database.

**Best design:** Use **distributed tracing such as AWS X-Ray** together with metrics/logs to isolate which hop contributes latency.

**Why:** The question is request-path latency, not only host utilization.

**Trap:** Increasing instance size before identifying the slow dependency is guesswork.

**Objective:** Domain 2 / workload visibility.

---

## 11. Batch analytics compute

A company periodically processes thousands of independent data-processing jobs. Jobs can queue, have different compute requirements, and do not need always-on application servers.

**Best design:** Evaluate **AWS Batch** for queued batch compute; use an analytics platform such as **Amazon EMR** when the workload specifically needs distributed big-data frameworks/ecosystems.

**Why:** “batch jobs” and “distributed analytics cluster” are related but not identical compute models.

**Trap:** Running permanent EC2 workers at peak capacity wastes resources for intermittent jobs.

**Objective:** Domain 3 / compute-service selection.

---

## 12. Global static/dynamic delivery

A public application serves cacheable web assets globally and wants to reduce origin load and user latency.

**Best design:** Use **Amazon CloudFront** with an appropriate cache/origin design.

**Why:** The requirement explicitly benefits from CDN edge caching.

**Trap:** AWS Global Accelerator improves global network paths for supported applications but is not a content cache.

**Objective:** Domain 3 / network performance.

---

## 13. Low-latency global TCP without caching

A global application uses a non-cacheable TCP protocol and needs stable anycast entry IPs and optimized routing over the AWS global network.

**Best design:** Evaluate **AWS Global Accelerator**.

**Why:** The problem is global network path/availability for TCP/UDP traffic, not cached content delivery.

**Trap:** CloudFront is not a general replacement for arbitrary non-cacheable TCP protocols.

**Objective:** Domain 3 / edge networking.

---

## 14. Build an governed S3 data lake

Raw files arrive in S3. Analysts need SQL queries, a shared catalog, ETL into Parquet, and fine-grained governance over data/catalog access.

**Best design:** Use a pattern combining **AWS Glue Data Catalog**, **AWS Glue** transformations, **Amazon Athena**, and **AWS Lake Formation** governance; choose visualization through the current Amazon Quick BI experience when required.

**Why:** Catalog, transform, query, govern, and visualize are separate responsibilities.

**Trap:** S3 bucket permissions alone do not provide the same catalog-level/fine-grained data-lake governance model.

**Objective:** Domain 3 / ingestion and transformation.

---

## 15. Stream processing vs managed delivery

Telemetry arrives continuously. Team A needs custom consumers that read records from the stream. Team B only needs managed buffered delivery to an analytics destination.

**Best design:** Use **Kinesis Data Streams** when consumers need direct stream processing/control; use **Amazon Data Firehose** when the main requirement is managed delivery to supported destinations.

**Why:** The operational model and consumer control differ.

**Trap:** Treating every streaming requirement as the same service choice ignores who processes the stream and how.

**Objective:** Domain 3 / streaming architecture.

---

## 16. S3 cold data cost

A compliance archive is written once, rarely accessed, must be retained for years, and retrieval can take longer than interactive application access.

**Best design:** Choose an appropriate lower-cost S3 archival tier and lifecycle policy after checking retrieval latency, retrieval charges, minimum-duration rules, and retention requirements.

**Why:** Access pattern and retrieval SLA justify cold tiering.

**Trap:** Choosing the lowest storage price without considering retrieval/minimum-duration costs can be more expensive overall.

**Objective:** Domain 4 / storage cost.

---

## 17. Interruptible compute fleet

A render workload can checkpoint and retry jobs. It runs many EC2 instances for hours but does not require any specific instance to survive interruption.

**Best design:** Use **Spot Instances** as a strong candidate with diversification/retry/checkpoint design.

**Why:** The workload explicitly tolerates interruption.

**Trap:** Paying On-Demand for the entire fleet ignores the interruption-tolerant requirement.

**Objective:** Domain 4 / compute cost.

---

## 18. Predictable baseline plus burst

A service has a stable baseline of compute consumption every day plus occasional unpredictable bursts.

**Best design:** Consider an appropriate **Savings Plans/commitment** for the predictable baseline while keeping burst capacity elastic through On-Demand and/or Spot where the workload permits.

**Why:** Commit only what is predictably consumed; keep uncertain demand flexible.

**Trap:** Committing the full peak can overpay when bursts do not occur.

**Objective:** Domain 4 / purchasing model.

---

## 19. NAT gateway and cross-AZ cost

Private instances in three AZs send large volumes to AWS services. All traffic currently crosses AZs to one NAT gateway. The architecture needs high availability and lower transfer/NAT-processing cost.

**Best design:** Evaluate **VPC endpoints** for supported AWS-service traffic and compare per-AZ NAT architecture against the shared-NAT path, accounting for both availability and cross-AZ/data-processing charges.

**Why:** Cost comes from the traffic path, not just the hourly NAT resource.

**Trap:** Removing NAT redundancy solely to save money can violate the availability requirement.

**Objective:** Domain 4 / network cost.

---

## 20. Database type before instance size

An application stores massive key-value records accessed by a known partition key with very high scale. The team is sizing increasingly large relational database instances to keep up.

**Best design:** Re-evaluate whether a purpose-built key-value service such as **DynamoDB** better matches the access pattern before continuing to vertically scale a relational engine.

**Why:** Cost/performance optimization starts with the correct database model, then capacity sizing.

**Trap:** Rightsizing the wrong database type only optimizes a poor architecture.

**Objective:** Domains 3 and 4 / database performance and cost.

---

# Review matrix

| Domain | Scenarios |
|---|---|
| Secure | 1–4 |
| Resilient | 5–10 |
| High-performing | 11–15 |
| Cost-optimized | 16–20 |

Use these scenarios before the legacy six practice walkthroughs. They are current-scope, original, and safe to expand as the official guide changes.
