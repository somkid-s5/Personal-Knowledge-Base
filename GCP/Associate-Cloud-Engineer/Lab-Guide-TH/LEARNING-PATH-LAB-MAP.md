# แผนที่ Google Skills Labs → ACE Companion Labs

[กลับสารบัญ ACE](../README.md) · [คู่มืออ่านตาม Path](../LEARNING-PATH-STUDY-GUIDE-TH.md) · [เปิด Lab Guide](./README.md) · [Google Skills ACE Path](https://www.skills.google/paths/11)

> ตรวจสอบชื่อกิจกรรมและ syllabus: 5 ตุลาคม 2026  
> **ข้อสรุป:** Companion Labs 5 ตัวใน repo ไม่ใช่ชุด Lab ของ Google Skills และไม่ครอบคลุม official hands-on ทั้ง Path ตารางนี้บอกเฉพาะความสัมพันธ์ของหัวข้อ เพื่อช่วยเลือกอ่าน ไม่ได้ยืนยันว่าขั้นตอนหรือคะแนน lab ตรงกัน

## วิธีอ่านสถานะ

- **บางส่วน** — หัวข้อคล้ายกันและช่วยเตรียมตัว แต่โจทย์, resources, permissions และ grader ต่างกัน
- **ไม่มีคู่มือเฉพาะ** — ใน repo ไม่มี Companion Lab สำหรับงานนั้นโดยตรง
- **ไม่ใช่ Cloud lab** — กิจกรรมเป็นการเรียนรู้/ทำ study guide มากกว่าการ provision Cloud resources

Google Skills Labs ใช้ credentials และ project ชั่วคราวของ session นั้น ให้ทำโจทย์และกดตรวจความคืบหน้าใน Google Skills เอง ห้ามนำ credentials ชั่วคราวไปใช้กับ project ส่วนตัว

## แผนที่ 17 กิจกรรม

| # | กิจกรรมตาม Learning Path | Official hands-on / lab ที่ทราบจาก syllabus | Companion Lab ใน repo | สถานะ |
|---:|---|---|---|---|
| 1 | A Tour of Google Cloud Hands-on Labs (GSP282) | Cloud Console, projects, IAM roles, API Library | Lab 01: Cloud Shell, bucket และ IAM | บางส่วน; ไม่ใช่ GSP282 |
| 2 | Build a Certification Study Guide: ACE Exam Prep | สร้าง Gemini Notebook และ study guide | ไม่มี — ไม่ใช่ Cloud provisioning lab | ไม่ใช่ Cloud lab |
| 3 | Essential Google Cloud Infrastructure: Foundation | Console/Cloud Shell, LAMP Marketplace, VPC, Private Google Access/Cloud NAT, VM creation/configuration | [Activity 03 โน้ต+แบบฝึก](../Path-Activity-03-Foundation-TH.md), Lab 01 (Cloud Shell), Lab 02 (VPC/private VM/NAT) | เนื้อหา/แบบฝึกประกบแล้ว; ยังไม่ใช่ official lab หรือ grader |
| 4 | Essential Google Cloud Infrastructure: Core Services | IAM, bucket/encryption, Cloud SQL, billing data in BigQuery, Cloud Observability | [Activity 04 โน้ต+แบบฝึก](../Path-Activity-04-Core-Services-TH.md), Lab 01 (bucket/IAM), Lab 03 (logs บางส่วน) | มีโน้ตและแบบฝึกประกบทุกหัวข้อ; ยังไม่ใช่ official lab หรือ grader |
| 5 | Elastic Google Cloud Infrastructure: Scaling and Automation | HA VPN, Application Load Balancer/autoscaling, Internal Load Balancer, Terraform | Lab 02 (network บางส่วน); Lab 05 (Terraform/VPC) | บางส่วน; ไม่มี VPN/LB lab โดยตรง |
| 6 | Getting Started with Google Kubernetes Engine | Cloud Build, GKE Autopilot cluster, deploy/manage/inspect workloads | Lab 04: GKE Deployment/Service/debugging | บางส่วน; ไม่ใช่ course lab |
| 7 | Developing Applications with Cloud Run: Fundamentals | Least-privilege IAM for Cloud Run; Pub/Sub integration | Lab 03: authenticated Cloud Run/revisions/logs | บางส่วน; Pub/Sub lab ไม่ครอบคลุม |
| 8 | Developing Applications with Cloud Run Functions | HTTP/event functions, Workflows/VPC, Firestore integration | ไม่มี function-specific lab | ไม่มีคู่มือเฉพาะ |
| 9 | Select a Google Cloud Database for Your Applications | Database Migration Service; Vector Search ใน AlloyDB, Cloud SQL for PostgreSQL และ Spanner | ไม่มี | ไม่มีคู่มือเฉพาะ |
| 10 | AI Infrastructure: Cloud GPUs | GPU provisioning, frameworks และ utilization; ตรวจรายการ activity สำหรับ demo/hand-on ใน edition ที่เรียน | ไม่มี | ไม่มีคู่มือเฉพาะ |
| 11 | AI Infrastructure: Cloud TPUs | TPU options/software/interoperability; ตรวจรายการ activity สำหรับ demo/hand-on ใน edition ที่เรียน | ไม่มี | ไม่มีคู่มือเฉพาะ |
| 12 | AI Infrastructure: Deployment Types | เลือก GCE/GKE deployment, network และ inference architecture | ไม่มี | ไม่มีคู่มือเฉพาะ |
| 13 | Logging and Monitoring in Google Cloud | Cross-project monitoring, uptime checks, alerts/SLOs, log analytics และ audit logs | Lab 03 (Cloud Run logs บางส่วน) | บางส่วน; ไม่มี Observability course lab |
| 14 | Getting Started with Terraform for Google Cloud | Create/change/destroy, dependencies/lifecycle, modules และ remote backend | Lab 05: Terraform VPC/plan/destroy | บางส่วน; ไม่ครอบคลุมทุก exercise |
| 15 | Implementing Cloud Load Balancing for Compute Engine (Skill Badge) | Network, Application และ Internal Load Balancing; challenge lab | ไม่มี load-balancer-specific lab | ไม่มีคู่มือเฉพาะ |
| 16 | Deploy Kubernetes Applications on Google Cloud (Skill Badge) | Docker, Artifact Registry, GKE, Deployments/Services และ challenge lab | Lab 04: GKE deployment/debugging | บางส่วน; ไม่ใช่ badge challenge |
| 17 | Build Infrastructure with Terraform on Google Cloud (Skill Badge) | Modules, state, import/change resources และ challenge lab | Lab 05: Terraform VPC/state | บางส่วน; ไม่ใช่ badge challenge |

## สิ่งที่ต้องจำก่อนทำแล็บ

- Lab ที่อยู่ใน course อาจมี task checker หรือ grader; การทำงานสำเร็จจากการมอง resource อย่างเดียวอาจยังไม่ถือว่าผ่าน
- ชื่อ project, region, resource และ permission ของ Google Skills lab เป็นค่าที่ระบบให้ใน session ให้ยึดโจทย์ live lab
- Companion Labs ใน repo เขียนเป็น Bash สำหรับ Cloud Shell project ของผู้เรียน ไม่ได้ใช้ grading task หรือ credentials ของ Google Skills
- ตรวจค่าใช้จ่าย, quota, API และ cleanup ก่อนทดลองใน project ของตัวเอง; GKE, NAT, VM, disk และ network resources อาจมีค่าใช้จ่าย
- คู่มือ Companion Labs ผ่านการตรวจรูปแบบ/static review แต่ยังไม่ได้ provision บนบัญชี Google Cloud จริง
- Challenge Lab เป็นการวัดการลงมือทำ ให้ใช้คู่มือประกอบเพื่อทบทวนหลักการและ troubleshooting ไม่ใช่แทนโจทย์ในบัญชี Skills

## Companion Lab ปัจจุบัน

| Lab | หัวข้อที่ฝึก | Path activities ที่ช่วยเตรียม | สิ่งที่ไม่ได้แทน |
|---|---|---|---|
| [01 Cloud Shell, Storage และ IAM](./Lab-01-Cloud-Shell-Storage-and-IAM.md) | project preflight, bucket, IAM/service account impersonation | 1, 3, 4 | GSP282 และ course IAM/storage grading |
| [02 Private VM, IAP และ NAT](./Lab-02-Private-VM-IAP-and-NAT.md) | VPC, VM, OS Login, IAP, egress | 3, 5 | HA VPN, LB และ course network graders |
| [03 Cloud Run revisions และ logs](./Lab-03-Cloud-Run-Revisions-and-Logs.md) | authentication, revision traffic, log review | 7, 13 | Pub/Sub, Cloud Run Functions และ full Observability Labs |
| [04 GKE Deployment และ debugging](./Lab-04-GKE-Deployment-and-Debugging.md) | cluster, Deployment, Service, troubleshooting | 6, 16 | Cloud Build course flow และ badge challenge |
| [05 Terraform VPC และ state](./Lab-05-Terraform-VPC-and-State.md) | HCL, plan, state, change และ cleanup | 5, 14, 17 | HA VPN/LB labs และ badge challenge |

