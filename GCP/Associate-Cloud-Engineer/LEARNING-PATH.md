# Learning Path & Exam Coverage Map

[กลับสารบัญ](./README.md)

## 1. เรียนให้เข้าใจก่อนจำบริการ

พื้นฐาน System Admin ช่วยเรื่อง OS, VM, network, backup และ troubleshooting มาก สิ่งที่ต้องเติมคือ resource scope, IAM ของ Google Cloud, managed services และการทำงานผ่าน APIs/IaC

ใช้ลำดับ **รู้ว่าทรัพยากรอยู่ที่ไหน → ใครมีสิทธิ์ → network ไปได้ไหม → workload ทำงานอย่างไร → วัดและแก้ปัญหาอย่างไร** เพื่อให้แต่ละบริการมีบริบท

## 2. จับคู่กับ Google Skills

นี่คือแผนอ่านตามหัวข้อ ไม่ใช่การยืนยันว่าทุกคอร์สต่อไปนี้อยู่ในลำดับเดียวกันกับหน้า Learning Path ของผู้เรียน

| คอร์ส/กลุ่มกิจกรรมที่เกี่ยวข้อง | บทที่อ่านประกอบ | สิ่งที่ควรทดลอง |
|---|---|---|
| [Build a Certification Study Guide: ACE Exam Prep](https://www.skills.google/course_templates/77) — course ID 77 ที่เนื้อหาเก่าใช้ชื่อ Preparing for Your Associate Cloud Engineer Journey | 01, ตาราง exam map ด้านล่าง | จดจุดแข็งและช่องว่างตาม objective |
| [Google Cloud Fundamentals: Core Infrastructure](https://www.skills.google/course_templates/60) | 01–07, 09 | สำรวจ project, VM, bucket, DB และ managed services |
| [Essential Google Cloud Infrastructure: Foundation](https://www.skills.google/paths/11/course_templates/50) | 03–05 | gcloud, custom VPC, VM และ subnet |
| [Essential Google Cloud Infrastructure: Core Services](https://www.skills.google/paths/11/course_templates/49) | 02, 03, 06, 11 | IAM, storage, monitoring และ permissions |
| [Elastic Google Cloud Infrastructure: Scaling and Automation](https://www.skills.google/paths/11/course_templates/178) | 05, 10, 12 | autoscaling, load balancing, hybrid และ automation |
| Kubernetes / serverless / Terraform skill badges ที่ผู้เรียนเลือก | 08, 09, 12 | deployment, IAM ของ workload, IaC |
| Exam preparation / review activities | CHEAT-SHEET, EXAM-SCENARIOS | อธิบายเหตุผลและกลับไปแก้จุดที่ยังไม่เข้าใจ |

หน้า [path 11](https://www.skills.google/paths/11) เป็นจุดตรวจชื่อกิจกรรมปัจจุบัน โดยรายการและชื่อสามารถเปลี่ยนได้

## 3. Exam map ปัจจุบัน

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

## 4. แผนอ่าน 4 สัปดาห์

| สัปดาห์ | อ่าน | ลงมือทำ | เช็กความเข้าใจ |
|---:|---|---|---|
| 1 | 01–04 | Lab 01 | อธิบาย IAM และ network path โดยไม่ดูโน้ต |
| 2 | 05–07, 10 | Lab 02 | เลือก compute/storage/DB และแยก HA กับ backup |
| 3 | 08–09, 12 | Lab 03–05 | deploy, ตรวจ failure, cleanup และอ่าน Terraform plan |
| 4 | 11, 13 + ทบทวน | ทดลอง incident scenarios | ทำสถานการณ์เองแล้วอ่านเหตุผล |

วันละประมาณ 60–90 นาทีอ่าน + 30–60 นาทีลงมือเป็นตัวอย่างแผน ปรับตามเวลาว่างได้ ไม่จำเป็นต้องจบทุกบทในวันเดียว

## 5. แบบบันทึกสิ่งที่ยังติด

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
