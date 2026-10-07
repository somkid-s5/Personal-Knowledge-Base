# Architecting on AWS 7.12.4 — Sources

[Back to package README](./README.md) · [Course QA matrix](./COURSE-QA-MATRIX.md) · [Currentness overlay](./CURRENTNESS-2026.md)

> **Last source review:** 2026-10-06

## 1. Course-fidelity sources

The package is aligned to the following learning sources:

- *Architecting on AWS 7.12.4 (EN) — Student Guide* — source for the historical course sequence and page-level study mapping.
- Corresponding *Architecting on AWS Lab Guide* — source for the original classroom lab sequence.
- Current AWS Classroom Training catalog: `https://aws.amazon.com/training/classroom/`
- Current Architecting on AWS course outline linked by the AWS Training catalog: `https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/training/approved/pdfs/classroom-training/architecting-on-aws.pdf`

The current public course outline is used to confirm that the package still maps to the official 13-module course family. It is **not** used to overwrite historical 7.12.4 page references.

## 2. Current AWS documentation used for high-impact verification

### Identity / account security

- IAM security best practices: `https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html`
- Compare IAM identities and credentials: `https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_identity-management.html`
- IAM Identity Center workforce access: `https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-workforce-access.html`
- IAM Identity Center + AWS Organizations: `https://docs.aws.amazon.com/singlesignon/latest/userguide/identity-center-and-orgs.html`
- Centralize root access for member accounts: `https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-enable-root-access.html`
- Root user best practices: `https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html`

### Edge / CloudFront

- Restrict access to an S3 origin with CloudFront OAC/OAI: `https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html`

### Streaming naming

- Amazon Data Firehose API reference: `https://docs.aws.amazon.com/firehose/latest/APIReference/Welcome.html`
- Amazon Data Firehose document history: `https://docs.aws.amazon.com/firehose/latest/dev/history.html`

### Tooling

- AWS CLI v2 command reference: `https://docs.aws.amazon.com/cli/latest/`

## 3. Primary documentation families by module

These are the documentation families to use when a claim needs current verification.

| Module | Current documentation family |
|---:|---|
| 01 | AWS Well-Architected Framework, AWS global infrastructure |
| 02 | IAM, IAM Identity Center, AWS Organizations, AWS STS |
| 03 | Amazon VPC, security groups, network ACLs, Route Tables |
| 04 | Amazon EC2, EBS, Lambda, EC2 Auto Scaling pricing/instance docs |
| 05 | Amazon S3, EFS, FSx, Storage Gateway, DataSync |
| 06 | Amazon RDS/Aurora, DynamoDB, ElastiCache/DAX, AWS DMS |
| 07 | CloudWatch, CloudTrail, Elastic Load Balancing, EC2 Auto Scaling, EventBridge |
| 08 | AWS CloudFormation, Systems Manager |
| 09 | Amazon ECS, Amazon EKS, AWS Fargate, Amazon ECR |
| 10 | VPC endpoints/PrivateLink, VPC peering, Site-to-Site VPN, Direct Connect, Transit Gateway |
| 11 | API Gateway, SQS, SNS, Kinesis, Amazon Data Firehose, Step Functions |
| 12 | Route 53, CloudFront, AWS WAF, AWS Shield, Global Accelerator, Outposts |
| 13 | AWS Backup, disaster-recovery guidance, Well-Architected Reliability pillar |

## 4. Source priority rule

When sources disagree, use this order for current technical behavior:

1. current AWS service documentation,
2. current AWS Well-Architected / Prescriptive Guidance where architectural guidance is the question,
3. current AWS Training course outline for course scope,
4. historical Student Guide for 7.12.4 course fidelity,
5. secondary sources only for clarification, never as the sole authority for a high-impact claim.

## 5. What must be rechecked before marking a future review complete

- current AWS Training catalog still lists Architecting on AWS,
- current outline still maps to the package's declared course scope,
- identity/security recommendations have not materially changed,
- names of renamed services are current,
- legacy mechanisms called out in `CURRENTNESS-2026.md` remain correctly characterized,
- pricing, quotas, service availability and console screenshots are not treated as timeless facts.
