# Architecting on AWS 7.12.4 — Study Notes

> Mobile-friendly reader copy. Source/master notes are backed up in Google Drive.

> Source: **Architecting on AWS 7.12.4 (EN) — Student Guide**  
> Coverage of these notes: **Module 1–13, Student Guide pages 26–650**  
> Course Introduction / front matter (pages 4–25) is not a separate note in this set.

---

## How to use this folder

- อ่านตามลำดับ `01 → 26` ถ้าต้องการเรียนแบบเต็มหลักสูตร
- เปิด `Architecting-on-AWS_Cheat-Sheet.md` เมื่อต้องการทบทวนเร็ว
- แต่ละ Module แบ่งเป็น Part เพื่อไม่ให้ไฟล์ยาวเกินไป
- GitHub copy นี้เน้นอ่านบนมือถือ: source screenshots ถูกเก็บไว้ใน Google Drive master copy ส่วน Mermaid diagrams และเนื้อหา Markdown ยังคงอยู่

---

## Course Map

| Module | Topic | Student Guide pages | Notes |
|---|---|---:|---|
| 1 | Architecting Fundamentals | 26–66 | 01–02 |
| 2 | Account Security | 67–113 | 03–04 |
| 3 | Networking 1 | 114–159 | 05–06 |
| 4 | Compute | 160–217 | 07–08 |
| 5 | Storage | 218–275 | 09–10 |
| 6 | Database Services | 276–330 | 11–12 |
| 7 | Monitoring and Scaling | 331–394 | 13–14 |
| 8 | Automation | 395–426 | 15–16 |
| 9 | Containers | 427–461 | 17–18 |
| 10 | Networking 2 | 462–499 | 19–20 |
| 11 | Serverless | 500–546 | 21–22 |
| 12 | Edge Services | 547–602 | 23–24 |
| 13 | Backup and Recovery | 603–650 | 25–26 |

---

# Module 1 — Architecting Fundamentals

### [01 — Architecting Fundamentals Part 1](./Module-1-Architecting-Fundamentals/01_Module-1_Architecting-Fundamentals_Part-1.md)
**Pages 26–43**

AWS value proposition, service categories, Global Infrastructure, Regions, Availability Zones, Data Centers, Region selection, Local Zones และ Edge Locations

### [02 — Architecting Fundamentals Part 2](./Module-1-Architecting-Fundamentals/02_Module-1_Architecting-Fundamentals_Part-2.md)
**Pages 44–66**

Solutions Architect responsibilities, AWS Well-Architected Framework, 6 Pillars, Well-Architected Tool, Console/CLI/SDK, Knowledge Check และ Lab 1

---

# Module 2 — Account Security

### [03 — Account Security Part 1](./Module-2-Account-Security/03_Module-2_Account-Security_Part-1.md)
**Pages 67–92**

Root user, IAM, Principal, Users, Groups, Roles, STS/AssumeRole, IAM policies, explicit deny, resource-based policies, defense in depth และ permissions boundaries

### [04 — Account Security Part 2](./Module-2-Account-Security/04_Module-2_Account-Security_Part-2.md)
**Pages 93–113**

Multi-account strategy, AWS Organizations, Organizational Units, Service Control Policies (SCPs), effective permissions และ Knowledge Check

---

# Module 3 — Networking 1

### [05 — Networking 1 Part 1](./Module-3-Networking-1/05_Module-3_Networking-1_Part-1.md)
**Pages 114–137**

IPv4/IPv6, CIDR, VPC, subnets, reserved IPs, public/private subnet, Internet Gateway, Route Table, NAT Gateway, ENI, Elastic IP และ Multi-AZ design

### [06 — Networking 1 Part 2](./Module-3-Networking-1/06_Module-3_Networking-1_Part-2.md)
**Pages 138–159**

Security Groups, Network ACLs, stateful vs stateless filtering, layered network defense, capstone packet flow และ Knowledge Check

---

# Module 4 — Compute

### [07 — Compute Part 1](./Module-4-Compute/07_Module-4_Compute_Part-1.md)
**Pages 160–183**

EC2 fundamentals, AMIs, instance families, Compute Optimizer, key pairs, tenancy, placement groups, User Data และ Instance Metadata/IMDS token flow

### [08 — Compute Part 2](./Module-4-Compute/08_Module-4_Compute_Part-2.md)
**Pages 184–217**

EBS, Instance Store, EC2 pricing/purchasing models, Savings Plans, Spot Instances, Serverless/Lambda, event sources, Knowledge Check และ Lab 2

---

# Module 5 — Storage

### [09 — Storage Part 1](./Module-5-Storage/09_Module-5_Storage_Part-1.md)
**Pages 218–240**

Block/File/Object storage, Amazon S3, buckets/objects/prefixes, access control, Block Public Access, Access Points, encryption, storage classes, Versioning และ Lifecycle

### [10 — Storage Part 2](./Module-5-Storage/10_Module-5_Storage_Part-2.md)
**Pages 241–275**

S3 replication, Multipart Upload, Transfer Acceleration, Event Notifications, EFS, FSx family, Storage Gateway, DataSync, Snowball Edge, decision flows และ Knowledge Check

---

# Module 6 — Database Services

### [11 — Database Services Part 1](./Module-6-Database-Services/11_Module-6_Database-Services_Part-1.md)
**Pages 276–294**

Relational vs nonrelational databases, managed vs unmanaged, Amazon RDS, Multi-AZ, Read Replicas, encryption, Amazon Aurora และ Aurora Serverless v2

### [12 — Database Services Part 2](./Module-6-Database-Services/12_Module-6_Database-Services_Part-2.md)
**Pages 295–330**

DynamoDB, primary keys, capacity modes, consistency, Global Tables, caching, Lazy Loading, Write-through, ElastiCache, DAX, AWS DMS, SCT, Knowledge Check และ Lab 3

---

# Module 7 — Monitoring and Scaling

### [13 — Monitoring and Scaling Part 1](./Module-7-Monitoring-and-Scaling/13_Module-7_Monitoring-and-Scaling_Part-1.md)
**Pages 331–348**

Monitoring concepts, CloudWatch Metrics, CloudWatch Logs, metric filters, CloudTrail, CloudTrail events และ VPC Flow Logs

### [14 — Monitoring and Scaling Part 2](./Module-7-Monitoring-and-Scaling/14_Module-7_Monitoring-and-Scaling_Part-2.md)
**Pages 349–394**

CloudWatch Alarms, EventBridge, Elastic Load Balancing, ALB/NLB/GWLB, EC2 Auto Scaling, Launch Templates, scaling methods, Knowledge Check และ Lab 4

---

# Module 8 — Automation

### [15 — Automation Part 1](./Module-8-Automation/15_Module-8_Automation_Part-1.md)
**Pages 395–406**

Infrastructure as Code, CloudFormation templates, stacks, change sets, cross-stack references และ layered stacks

### [16 — Automation Part 2](./Module-8-Automation/16_Module-8_Automation_Part-2.md)
**Pages 407–426**

Elastic Beanstalk, AWS Solutions Library, AWS CDK, AWS Systems Manager, Amazon Q Developer และ Knowledge Check

---

# Module 9 — Containers

### [17 — Containers Part 1](./Module-9-Containers/17_Module-9_Containers_Part-1.md)
**Pages 427–438**

Loose coupling, microservices, well-defined APIs, container fundamentals, VMs vs containers และ orchestration

### [18 — Containers Part 2](./Module-9-Containers/18_Module-9_Containers_Part-2.md)
**Pages 439–461**

Amazon ECR, ECS, EKS, AWS Fargate, container service selection และ Knowledge Check

---

# Module 10 — Networking 2

### [19 — Networking 2 Part 1](./Module-10-Networking-2/19_Module-10_Networking-2_Part-1.md)
**Pages 462–475**

VPC Endpoints, Interface Endpoints/AWS PrivateLink, VPC Peering, non-transitive routing, Shared Services VPC และ full-mesh peering

### [20 — Networking 2 Part 2](./Module-10-Networking-2/20_Module-10_Networking-2_Part-2.md)
**Pages 476–499**

Hybrid networking, Site-to-Site VPN, Direct Connect, Transit Gateway, attachments, TGW route tables, connectivity patterns และ Knowledge Check

---

# Module 11 — Serverless

### [21 — Serverless Part 1](./Module-11-Serverless/21_Module-11_Serverless_Part-1.md)
**Pages 500–518**

Serverless fundamentals, API Gateway, SQS, loose coupling, Standard vs FIFO, Visibility Timeout และ Short/Long Polling

### [22 — Serverless Part 2](./Module-11-Serverless/22_Module-11_Serverless_Part-2.md)
**Pages 519–546**

SNS, fan-out, SNS vs SQS, Kinesis, Data Firehose, Step Functions, State Machines, Knowledge Check และ Lab 5

---

# Module 12 — Edge Services

### [23 — Edge Services Part 1](./Module-12-Edge-Services/23_Module-12_Edge-Services_Part-1.md)
**Pages 547–570**

Edge fundamentals, Route 53, public/private hosted zones, routing policies, CloudFront, CDN และ edge caching

### [24 — Edge Services Part 2](./Module-12-Edge-Services/24_Module-12_Edge-Services_Part-2.md)
**Pages 571–602**

CloudFront optimization, DDoS concepts, AWS Shield, AWS WAF, Firewall Manager, AWS Outposts, Knowledge Check และ Lab 6

---

# Module 13 — Backup and Recovery

### [25 — Backup and Recovery Part 1](./Module-13-Backup-and-Recovery/25_Module-13_Backup-and-Recovery_Part-1.md)
**Pages 603–621**

Disaster planning, High Availability, Fault Tolerance, Backup vs DR, RPO/RTO, storage/network/database recovery, AMIs/IaC และ AWS Backup

### [26 — Backup and Recovery Part 2](./Module-13-Backup-and-Recovery/26_Module-13_Backup-and-Recovery_Part-2.md)
**Pages 622–650**

Backup & Restore, Pilot Light, Warm Standby, Multi-site Active/Active, cost/recovery trade-offs, Knowledge Check, capstone architecture และ Course Summary

---

# Suggested Study Paths

## Full course

```text
01 -> 02 -> 03 -> ... -> 26
```

เหมาะกับการเรียนเนื้อหาตามหลักสูตรและทำ Lab/Knowledge Check ไปพร้อมกัน

## Architecture-first review

```text
01-02 Fundamentals
  ↓
03-06 Security + Networking
  ↓
07-12 Compute + Storage + Database
  ↓
13-16 Monitoring + Automation
  ↓
17-22 Containers + Networking 2 + Serverless
  ↓
23-26 Edge + DR
```

## Quick pre-test review

1. อ่าน `Architecting-on-AWS_Cheat-Sheet.md`
2. กลับไปอ่านหัวข้อที่ยังสับสนจาก Note ต้นฉบับ
3. ทำ Knowledge Check ท้ายแต่ละ Module โดยไม่เปิดเฉลย
4. ทบทวน Labs เพื่อให้เห็น service ทำงานร่วมกันเป็น architecture

---

# High-value topics to revisit

- AWS Well-Architected Framework — 6 Pillars
- IAM policy evaluation, Explicit Deny, SCP และ Permissions Boundary
- Security Group vs Network ACL
- Public vs Private subnet / IGW / NAT Gateway
- EC2 User Data vs Instance Metadata
- EBS vs Instance Store
- S3 storage classes / Versioning / Lifecycle
- EFS vs FSx vs S3 vs EBS
- RDS Multi-AZ vs Read Replica
- DynamoDB consistency / capacity / DAX
- CloudWatch vs CloudTrail vs VPC Flow Logs
- ALB vs NLB vs GWLB
- Auto Scaling components and policies
- CloudFormation / CDK / Systems Manager
- ECS vs EKS / EC2 vs Fargate
- VPC Endpoint vs Peering vs VPN vs Direct Connect vs Transit Gateway
- SQS vs SNS vs Kinesis vs Step Functions
- Route 53 routing policies
- CloudFront vs Route 53
- Shield vs WAF vs Firewall Manager
- RPO vs RTO
- Backup & Restore vs Pilot Light vs Warm Standby vs Active/Active

---

## Source note

เอกสารชุดนี้สรุปจาก **Architecting on AWS 7.12.4 Student Guide** ที่ใช้เป็นแหล่งหลัก จึงตั้งใจรักษาคำศัพท์ โครงสร้าง และ framing ตามหลักสูตร ไม่ได้พยายามอัปเดตหรือแทนที่เนื้อหาด้วย AWS documentation รุ่นใหม่โดยอัตโนมัติ
