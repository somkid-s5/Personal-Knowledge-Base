# Architecting on AWS 7.12.4 — Study Notes 📘

> **Mobile-friendly GitHub Reader** สำหรับโน้ตจาก *Architecting on AWS 7.12.4 (EN) — Student Guide*  
> ครอบคลุม **Module 1–13, หน้า 26–650**  
> ภาพ screenshot จาก Student Guide ฉบับเต็มยังเก็บอยู่ใน **Google Drive Master**; GitHub ชุดนี้เน้นอ่านเร็วบนมือถือ โดยคงเนื้อหา Markdown, ตาราง และ Mermaid diagrams ไว้ครบ

---

## ⚡ Quick Start

- [**🧪 LAB GUIDE ภาษาไทย — Lab 1–7 แบบทำตามได้จริง**](./Lab-Guide-TH/)
- [**📝 MOCK EXAM 65 ข้อ — เริ่มทำข้อสอบ**](./MOCK-EXAM-65.md)
- [**🧭 EXAM MODE — Keyword → Service → Module**](./EXAM-MODE.md)
- [**Cheat Sheet — ทบทวนเร็วทั้งคอร์ส**](./Architecting-on-AWS_Cheat-Sheet.md)
- [เฉลย Mock Exam — เปิดหลังทำครบ 65 ข้อเท่านั้น](./MOCK-EXAM-65-ANSWER-KEY.md)
- ถ้าเรียนเต็มหลักสูตร ให้อ่าน **Module 1 → 13** ตามลำดับ
- ถ้าต้องการลงรายละเอียดเพิ่มเติม ให้กลับไปดู Google Drive Master ซึ่งเก็บไฟล์ Part 1/Part 2 และ source figures ไว้ครบ

---

## 🧪 Lab Guide ภาษาไทย

คู่มือจาก **Architecting on AWS 7.12.4 Lab Guide** ถูกแยกไว้ใน [`Lab-Guide-TH/`](./Lab-Guide-TH/) โดยแปลคำอธิบายเป็นไทย แต่คงชื่อปุ่ม เมนู field ค่า config คำสั่ง CLI และ JSON เป็น English ตาม AWS Console เพื่อใช้เปิดทำ Lab ควบคู่กับ Builder Lab ได้ง่าย

| Lab | หัวข้อ |
|---:|---|
| 1 | Console / AWS CLI / Amazon S3 |
| 2 | VPC / Public-Private Subnets / IGW / NAT / EC2 |
| 3 | Aurora / Application Load Balancer / Target Group |
| 4 | Auto Scaling / Multi-AZ / Aurora Failover / Redundant NAT |
| 5 | S3 → SNS → SQS → Lambda Serverless Workflow |
| 6 | CloudFront + S3 Origin + Origin Access Control (OAC) |
| 7 | Capstone — CloudFormation + Aurora + EFS + ALB + Auto Scaling + WordPress |

[**เปิด Thai Lab Guide →**](./Lab-Guide-TH/)

---

## 📚 Modules

| # | Module | Student Guide pages |
|---:|---|---:|
| 1 | [Architecting Fundamentals](./Module-01-Architecting-Fundamentals.md) | 26–66 |
| 2 | [Account Security](./Module-02-Account-Security.md) | 67–113 |
| 3 | [Networking 1](./Module-03-Networking-1.md) | 114–159 |
| 4 | [Compute](./Module-04-Compute.md) | 160–217 |
| 5 | [Storage](./Module-05-Storage.md) | 218–275 |
| 6 | [Database Services](./Module-06-Database-Services.md) | 276–330 |
| 7 | [Monitoring and Scaling](./Module-07-Monitoring-and-Scaling.md) | 331–394 |
| 8 | [Automation](./Module-08-Automation.md) | 395–426 |
| 9 | [Containers](./Module-09-Containers.md) | 427–461 |
| 10 | [Networking 2](./Module-10-Networking-2.md) | 462–499 |
| 11 | [Serverless](./Module-11-Serverless.md) | 500–546 |
| 12 | [Edge Services](./Module-12-Edge-Services.md) | 547–602 |
| 13 | [Backup and Recovery](./Module-13-Backup-and-Recovery.md) | 603–650 |

---

## 🧭 Suggested Study Paths

### Full Course

```text
Module 1 → 2 → 3 → ... → 13
```

เหมาะกับการเรียนเนื้อหาตามลำดับ Student Guide และทำ Knowledge Check / Labs ไปพร้อมกัน

### Architecture-first Review

```text
Fundamentals
   ↓
Security + Networking
   ↓
Compute + Storage + Database
   ↓
Monitoring + Automation
   ↓
Containers + Networking 2 + Serverless
   ↓
Edge + Backup/DR
```

### Pre-test / Quick Review

1. ทำ [Mock Exam 65 ข้อ](./MOCK-EXAM-65.md) แบบจับเวลา 120 นาที
2. เช็กเฉลยและหา Module ที่พลาด
3. เปิด [EXAM MODE](./EXAM-MODE.md) เพื่อจำ keyword และ common traps
4. อ่าน [Cheat Sheet](./Architecting-on-AWS_Cheat-Sheet.md)
5. กลับมาเปิด Module ที่ยังอธิบาย “ทำไม” หรือ “ทำงานอย่างไร” ไม่ได้
6. ทบทวน Knowledge Check และ Lab architecture ของ Module ที่ผิดเยอะ

---

## 🎯 High-value Topics

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

## 🗂️ Reader vs Master Copy

### GitHub Reader — this folder

- 1 Markdown file ต่อ Module
- Thai Lab Guide แยก folder สำหรับ Lab 1–7
- เปิดอ่านง่ายบนมือถือ/Browser
- GitHub render Markdown และ Mermaid ให้ทันที
- ไม่มี dependency กับ local `assets/` จึงไม่เจอปัญหารูป relative path แบบ Google Drive mobile

### Google Drive Master

- 26 detailed notes แบ่ง Part 1/Part 2
- source screenshots / `assets/` จาก Student Guide
- `00_INDEX.md`
- Cheat Sheet

---

## Source note

เอกสาร Study Notes สรุปจาก **Architecting on AWS 7.12.4 Student Guide** ส่วน Lab Guide ภาษาไทยแปลงจาก **Architecting on AWS 7.12.4 Lab Guide** โดยยึด terminology และลำดับขั้นตอนของต้นฉบับเป็นหลัก
