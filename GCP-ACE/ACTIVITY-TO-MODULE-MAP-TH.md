# 🧭 GCP ACE — Activity → Module → Lab Crosswalk

> 📘 **เส้นทางหลักคือ 17 Activities ตาม Google Skills Learning Path ที่บันทึกไว้** ส่วน Module 01–13 และ Companion Labs 01–06 เป็นเนื้อหาเสริมแบบเลือกอ่านตามจุดที่ยังไม่เข้าใจ ไม่ใช่อีก 13 บทที่ต้องเรียนวนใหม่

[🏠 GCP Learning Hub](./README.md) · [📖 คู่มือ 17 Activities](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [🧪 สถานะ Official vs Companion Lab](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md)

## 🎯 ตารางเปิดประกบเมื่อจำเป็น

| Activity (ต้องอ่านตาม Path) | 🔬 Module เจาะลึก (เลือกอ่าน) | 🧪 Companion Lab (เลือกทำ) | เชื่อมโยงเรื่องอะไร |
|---|---|---|---|
| [Activity 01](./Path-Activity-01-GSP282-TH.md) | [M01](./Module-01-Foundations-and-Resource-Hierarchy.md), [M03](./Module-03-Tools-Billing-and-Quotas.md) | [Lab 01](./Lab-Guide-TH/Lab-01-Cloud-Shell-Storage-and-IAM.md) | Lab interface, active project, IAM context, Cloud Shell |
| [Activity 02](./Path-Activity-02-ACE-Study-Guide-TH.md) | — | — | วางแผนอ่านสอบและตรวจแหล่งข้อมูล — ไม่มี Module เพิ่มที่จำเป็น |
| [Activity 03](./Path-Activity-03-Foundation-TH.md) | [M01](./Module-01-Foundations-and-Resource-Hierarchy.md), [M04](./Module-04-VPC-Firewall-NAT-and-DNS.md), [M05](./Module-05-Compute-Engine-and-Instance-Groups.md) | [Lab 02](./Lab-Guide-TH/Lab-02-Private-VM-IAP-and-NAT.md) | Project/region/zone, VPC routing/firewall, Compute Engine VM |
| [Activity 04](./Path-Activity-04-Core-Services-TH.md) | [M02](./Module-02-IAM-Service-Accounts-and-Security.md), [M06](./Module-06-Storage-and-Data-Protection.md), [M03](./Module-03-Tools-Billing-and-Quotas.md), [M11](./Module-11-Observability-and-Operations.md) | [Lab 01](./Lab-Guide-TH/Lab-01-Cloud-Shell-Storage-and-IAM.md) | IAM, storage, quota และ observability |
| [Activity 05](./Path-Activity-05-Scaling-Automation-TH.md) | [M05](./Module-05-Compute-Engine-and-Instance-Groups.md), [M10](./Module-10-Load-Balancing-and-Hybrid-Networking.md), [M12](./Module-12-Terraform-and-Infrastructure-as-Code.md) | [Lab 06](./Lab-Guide-TH/Lab-06-Compute-Engine-Load-Balancing.md), [Lab 05](./Lab-Guide-TH/Lab-05-Terraform-VPC-and-State.md) | MIG, autoscaling, load balancing และ IaC |
| [Activity 06](./Path-Activity-06-GKE-TH.md) | [M08](./Module-08-GKE-and-Kubernetes.md) | [Lab 04](./Lab-Guide-TH/Lab-04-GKE-Deployment-and-Debugging.md) | Kubernetes objects, probes, deployments และ debugging |
| [Activity 07](./Path-Activity-07-Cloud-Run-TH.md) | [M09](./Module-09-Cloud-Run-and-Event-Driven-Services.md) | [Lab 03](./Lab-Guide-TH/Lab-03-Cloud-Run-Revisions-and-Logs.md) | Cloud Run revision, IAM, scaling และ logs |
| [Activity 08](./Path-Activity-08-Cloud-Run-Functions-TH.md) | [M09](./Module-09-Cloud-Run-and-Event-Driven-Services.md), [M07](./Module-07-Databases-and-Data-Services.md) | [Lab 03](./Lab-Guide-TH/Lab-03-Cloud-Run-Revisions-and-Logs.md) | Functions, triggers, service identity และ data integration |
| [Activity 09](./Path-Activity-09-Database-Selection-TH.md) | [M07](./Module-07-Databases-and-Data-Services.md) | — | Database selection, availability, PITR และ migration |
| [Activity 10](./Path-Activity-10-AI-Cloud-GPUs-TH.md) | [M13](./Module-13-AI-Tooling-and-Modern-Services.md), [M05](./Module-05-Compute-Engine-and-Instance-Groups.md) | — | GPU workload sizing, quota, VM placement และ data path |
| [Activity 11](./Path-Activity-11-AI-Cloud-TPUs-TH.md) | [M13](./Module-13-AI-Tooling-and-Modern-Services.md) | — | TPU topology, capacity, checkpoint และ workload fit |
| [Activity 12](./Path-Activity-12-AI-Deployment-Types-TH.md) | [M13](./Module-13-AI-Tooling-and-Modern-Services.md), [M08](./Module-08-GKE-and-Kubernetes.md) | — | Deploy inference/training workloads and accelerator scheduling |
| [Activity 13](./Path-Activity-13-Logging-Monitoring-TH.md) | [M11](./Module-11-Observability-and-Operations.md) | [Lab 03](./Lab-Guide-TH/Lab-03-Cloud-Run-Revisions-and-Logs.md) | Metrics, logs, traces, alerting และ operational diagnostics |
| [Activity 14](./Path-Activity-14-Terraform-Getting-Started-TH.md) | [M12](./Module-12-Terraform-and-Infrastructure-as-Code.md) | [Lab 05](./Lab-Guide-TH/Lab-05-Terraform-VPC-and-State.md) | Terraform config, plan, state, drift และ provider IAM |
| [Activity 15](./Path-Activity-15-Load-Balancing-Skill-Badge-TH.md) | [M10](./Module-10-Load-Balancing-and-Hybrid-Networking.md), [M05](./Module-05-Compute-Engine-and-Instance-Groups.md) | [Lab 06](./Lab-Guide-TH/Lab-06-Compute-Engine-Load-Balancing.md) | Load balancer, health check, backend และ MIG |
| [Activity 16](./Path-Activity-16-Kubernetes-Applications-Skill-Badge-TH.md) | [M08](./Module-08-GKE-and-Kubernetes.md) | [Lab 04](./Lab-Guide-TH/Lab-04-GKE-Deployment-and-Debugging.md) | Application deployment, registry, service, rollout และ triage |
| [Activity 17](./Path-Activity-17-Terraform-Build-Infrastructure-Skill-Badge-TH.md) | [M12](./Module-12-Terraform-and-Infrastructure-as-Code.md) | [Lab 05](./Lab-Guide-TH/Lab-05-Terraform-VPC-and-State.md) | Terraform modules, state, import, refactor และ verification |

### 🔬 Module ทั้ง 13 ใช้ทำอะไร?

Module 01–13 เป็น **deep dive / troubleshooting / reference** ของหัวข้อที่ปรากฏใน Activities หลายกิจกรรม หากเข้าใจจาก Activity แล้วไม่จำเป็นต้องอ่าน Module ซ้ำอีกทั้งหมด เปิดเฉพาะหัวข้อที่อยากลงลึกหรือแก้โจทย์ผิด

### 🧪 Companion Labs ต่างจาก Official Google Skills อย่างไร?

Companion Labs ทั้ง 6 เป็น Lab ใน Knowledge Base ที่ช่วยฝึกเทคนิคและตรวจผลด้วยตัวเอง **ไม่ใช่สำเนาของ Official Google Skills Lab หรือคำตอบ grader** หากต้องการทำ Challenge/Skill Badge ตาม Learning Path ให้ทำในหน้า Google Skills ของกิจกรรมนั้น แล้วใช้ Companion Lab เป็นแบบฝึกเสริมเมื่อเหมาะสม

## ✅ วิธีเรียนไม่วนซ้ำ

1. อ่าน Activity 01–17 ตามลำดับหลักและใช้ปุ่มบทก่อนหน้า/ถัดไป
2. เจอ Concept ที่ยังไม่เข้าใจ → กด Module ที่จับคู่ไว้ในตาราง (เฉพาะส่วนที่ต้องการ)
3. ต้องการลงมือทำเพิ่ม → ทำ Companion Lab ที่เกี่ยวข้อง หรือทำ Official Lab ตาม Course
4. ทบทวนด้วย Cheat Sheet และ Exam Scenarios; ทำเครื่องหมายเรียนจบเฉพาะ Activity หลัก

## 🔎 การรักษาความครบของเนื้อหา

- ความซ้ำด้าน **หัวข้อ** ระหว่าง Activity / Module / Lab เป็นเรื่องที่ตั้งใจไว้ เพราะมีบทบาทต่างกัน
- ไม่ย้ายเนื้อหาของ Module เข้า Activity อัตโนมัติ และไม่ลบ Commands, Scenarios หรือ Troubleshooting ที่อาจมีรายละเอียดเฉพาะ
- `course.yaml` เป็น **แหล่งหลักของความสัมพันธ์**; หน้านี้เป็นแผนที่อ่านสำหรับ GitHub/Markdown และจะมี CI ตรวจว่ารายการไม่ขาด
- ความครบของ Path หรือ Lab ต้องตรวจแยกจากการมีลิงก์และไฟล์ครบ — การจับคู่ไม่เท่ากับ Execute Lab ผ่าน
