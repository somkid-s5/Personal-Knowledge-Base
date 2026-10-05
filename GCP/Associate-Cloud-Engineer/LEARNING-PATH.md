# Learning Path & Exam Coverage Map

[กลับสารบัญ](./README.md)

## 1. เรียนให้เข้าใจก่อนจำบริการ

พื้นฐาน System Admin ช่วยเรื่อง OS, VM, network, backup และ troubleshooting มาก สิ่งที่ต้องเติมคือ resource scope, IAM ของ Google Cloud, managed services และการทำงานผ่าน APIs/IaC

ใช้ลำดับ **รู้ว่าทรัพยากรอยู่ที่ไหน → ใครมีสิทธิ์ → network ไปได้ไหม → workload ทำงานอย่างไร → วัดและแก้ปัญหาอย่างไร** เพื่อให้แต่ละบริการมีบริบท

## 2. อ่านตามกิจกรรม Google Skills

เริ่มตามลำดับทางการใน [คู่มืออ่านตาม Google Skills Learning Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) ซึ่งมี 17 กิจกรรม พร้อมบทอ่านและคำถามเช็กความเข้าใจ ส่วนไฟล์ [สารบัญหลักสูตร](./GOOGLE-SKILLS-CURRICULUM.md) ใช้ตรวจ syllabus และหัวข้อย่อย ส่วน [แผนที่ Lab ต่อ Path](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) แสดงชัดว่า official hands-on ใดมี Companion Lab ใกล้เคียงและส่วนใดยังไม่มี

## 3. โครงสร้างคอร์ส Google Skills ที่ตรวจยืนยันได้

หน้า [ACE Certification Learning Path](https://www.skills.google/paths/11) เปิดดูโดยไม่ลงชื่อเข้าใช้ได้ และแสดงชื่อ ประเภท คำอธิบาย และลำดับครบ 17 กิจกรรม ส่วน [สารบัญหลักสูตรและโน้ตตาม Google Skills](./GOOGLE-SKILLS-CURRICULUM.md) แจกแจงรายการทั้งหมด หัวข้อย่อยที่เห็นบนหน้าแต่ละ course และ crosswalk ไปยังบทเรียนใน repo

17 กิจกรรมมีทั้ง lab ปูพื้น, คอร์ส infrastructure หลัก, GKE/Cloud Run/database/AI/observability/Terraform และ skill badges ตาม [inventory พร้อมลิงก์รายกิจกรรม](./GOOGLE-SKILLS-CURRICULUM.md#รายการ-17-กิจกรรมตามลำดับที่แสดงบนหน้า-path) โดย [Google Cloud Fundamentals (ID 60)](https://www.skills.google/course_templates/60) ยังคงเป็นบทปูพื้นเสริมที่ไม่อยู่ในรายการ 17 กิจกรรมที่ตรวจเห็น

| คอร์ส | บทอ่านประกอบ |
|---|---|
| Google Cloud Fundamentals: Core Infrastructure — พื้นฐานเสริม | 01–10, 13 |
| A Tour of Google Cloud Hands-on Labs | 01–03 |
| Getting Started with Google Kubernetes Engine | 05, 08 |
| Developing Applications with Cloud Run: Fundamentals / Functions | 07–09 |
| Select a Google Cloud Database for Your Applications | 06–07 |
| AI Infrastructure: Cloud GPUs / TPUs / Deployment Types | 05, 08, 13 |
| Logging and Monitoring in Google Cloud | 11 |
| Getting Started with Terraform for Google Cloud / Terraform skill badge | 12 |
| Load Balancing skill badge | 05, 10 |
| Deploy Kubernetes Applications skill badge | 08, 12 |
| Essential Google Cloud Infrastructure: Foundation | 01, 03–05, 10 |
| Essential Google Cloud Infrastructure: Core Services | 01–03, 06–07, 11 |
| Elastic Google Cloud Infrastructure: Scaling and Automation | 04–05, 07, 10, 12 |
| Build a Certification Study Guide: ACE Exam Prep | GOOGLE-SKILLS-CURRICULUM, CHEAT-SHEET, EXAM-SCENARIOS |

หลักสูตรและชื่อกิจกรรมอาจเปลี่ยนตามเวลา รุ่นภาษา หรือสิทธิ์บัญชี ให้ใช้รายชื่อที่แสดงในบัญชี Google Skills ของผู้เรียนเป็นรายการกิจกรรมล่าสุด และใช้ curriculum map สำหรับหัวข้อย่อยที่เปิดเผยได้

## 4. Exam map ปัจจุบัน

อ้างอิง [Standard Exam Guide ทางการ](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf) ที่หน้ารับรองลิงก์ ณ 2026-10-03 เปอร์เซ็นต์เป็นน้ำหนักโดยประมาณ ไม่ใช่จำนวนข้อที่แน่นอน

| หมวด | น้ำหนัก | จุดที่ต้องฝึก | บทหลัก |
|---|---:|---|---|
| 1. Setting up a cloud solution environment | ~20% | hierarchy, policies, identities, APIs, billing, quotas, locations, asset visibility | 01–04, 11, 13 |
| 2. Planning and implementing a cloud solution | ~30% | compute, data/storage, network และ tooling สำหรับ deploy | 04–10, 12–13 |
| 3. Ensuring the successful operation of a cloud solution | ~30% | operate workloads, backups, network changes, observability และ AI/developer environments | 05–13 |
| 4. Configuring access and security | ~20% | IAM inheritance, roles, service accounts, short-lived credentials, federation | 02–03, 08, 13 |

### Coverage checklist

| Objective family | เนื้อหาที่มี | ระดับ |
|---|---|---|
| Project/accounts/billing | hierarchy, Cloud Identity, org policy, API, budget/export/quota | อธิบาย + ตัวอย่างคำสั่ง |
| IAM/SA/federation | allow/deny, predefined/custom, impersonation, workforce/workload, GKE identity | อธิบาย + Lab 01 |
| Compute | VM, OS Login, disks, Spot, MIG, snapshot/image, VM Manager | อธิบาย + Lab 02 |
| Containers/serverless | GKE modes, kubectl, scaling, Artifact Registry, Cloud Run revisions/events | อธิบาย + Lab 03–04 |
| Storage/data | bucket lifecycle/security, file storage, DB selection, backup/query/job status | อธิบาย + Lab 01 |
| Network | VPC, firewall/secure tags, subnet resizing, routes, NAT/DNS, LB/hybrid | อธิบาย + Lab 02 |
| Operations | alerts, audit/flow/firewall logs, Ops Agent, metrics, traces, health, recommendations | อธิบาย + troubleshooting |
| Tooling | Terraform/state, Helm, Config Connector, Fabric FAST, AI-assisted review | อธิบาย + Lab 05 |
| Newer objectives | agent runtime, GPUs/TPUs, notebooks/workstations, CMEK, Database Center, Cloud Hub | ภาพรวมการเลือกและดูแล ไม่ใช่ deep specialization |

ส่วนบริการ data/AI ที่มีหลายผลิตภัณฑ์ เน้นให้เลือกและดูแลในระดับ ACE ไม่ใช่หลักสูตร DBA, Kubernetes administrator หรือ ML engineer เต็มชุด

## 5. แผนอ่าน 4 สัปดาห์

| สัปดาห์ | อ่าน | ลงมือทำ | เช็กความเข้าใจ |
|---:|---|---|---|
| 1 | 01–04 | Lab 01 | อธิบาย IAM และ network path โดยไม่ดูโน้ต |
| 2 | 05–07, 10 | Lab 02 | เลือก compute/storage/DB และแยก HA กับ backup |
| 3 | 08–09, 12 | Lab 03–05 | deploy, ตรวจ failure, cleanup และอ่าน Terraform plan |
| 4 | 11, 13 + ทบทวน | ทดลอง incident scenarios | ทำสถานการณ์เองแล้วอ่านเหตุผล |

วันละประมาณ 60–90 นาทีอ่าน + 30–60 นาทีลงมือเป็นตัวอย่างแผน ปรับตามเวลาว่างได้ ไม่จำเป็นต้องจบทุกบทในวันเดียว

## 6. แบบบันทึกสิ่งที่ยังติด

```markdown
วันที่:
บท/กิจกรรม:
สิ่งที่อธิบายได้เอง:
สิ่งที่ยังสับสน:
คำสั่ง/ผลลัพธ์ที่ลอง:
เหตุผลที่คำตอบเดิมผิด:
ครั้งถัดไปจะทดลองอะไร:
```

ถ้าเลือกบริการถูกเพราะจำ keyword อย่างเดียว ให้เพิ่มเงื่อนไขหนึ่ง เช่น เปลี่ยน HTTP เป็น TCP, เปลี่ยน analytics เป็น transaction หรือกำหนดว่าห้ามมี public IP แล้วดูว่าคำตอบต้องเปลี่ยนหรือไม่
