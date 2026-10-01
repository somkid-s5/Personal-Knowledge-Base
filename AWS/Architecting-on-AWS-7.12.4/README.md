# Architecting on AWS 7.12.4 — Study Notes 📘

> **Mobile-friendly GitHub Reader** สำหรับโน้ตจาก *Architecting on AWS 7.12.4 (EN) — Student Guide*  
> ครอบคลุม **Module 1–13, หน้า 26–650**  
> ภาพ screenshot จาก Student Guide ฉบับเต็มยังเก็บอยู่ใน **Google Drive Master**; GitHub ชุดนี้เน้นอ่านเร็วบนมือถือ โดยคงเนื้อหา Markdown, ตาราง และ Mermaid diagrams ไว้ครบ

---

## ⚡ Quick Start

- [**🧭 EXAM MODE — Keyword → Service → Module**](./EXAM-MODE.md)
- [**Cheat Sheet — ทบทวนเร็วทั้งคอร์ส**](./Architecting-on-AWS_Cheat-Sheet.md)
- ถ้าเรียนเต็มหลักสูตร ให้อ่าน **Module 1 → 13** ตามลำดับ
- ถ้าต้องการลงรายละเอียดเพิ่มเติม ให้กลับไปดู Google Drive Master ซึ่งเก็บไฟล์ Part 1/Part 2 และ source figures ไว้ครบ

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

1. เปิด [EXAM MODE](./EXAM-MODE.md) เพื่อจำ keyword และ common traps
2. อ่าน [Cheat Sheet](./Architecting-on-AWS_Cheat-Sheet.md)
3. กลับมาเปิด Module ที่ยังอธิบาย “ทำไม” หรือ “ทำงานอย่างไร” ไม่ได้
4. ทบทวน Knowledge Check ท้ายแต่ละ Module
5. ทบทวน Lab architecture เพื่อเชื่อมหลาย services เข้าด้วยกัน

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

เอกสารชุดนี้สรุปจาก **Architecting on AWS 7.12.4 Student Guide** เป็นแหล่งหลัก และตั้งใจรักษาคำศัพท์ โครงสร้าง และ framing ตามหลักสูตร ไม่ได้พยายามแทนที่ด้วย AWS documentation รุ่นใหม่โดยอัตโนมัติ
