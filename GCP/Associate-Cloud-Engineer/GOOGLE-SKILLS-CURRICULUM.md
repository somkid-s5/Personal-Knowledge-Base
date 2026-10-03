# Associate Cloud Engineer — สารบัญและโน้ตตามหลักสูตร Google Skills

> ตรวจสอบ 4 ตุลาคม 2026 · ใช้อ่านประกบคอร์สจริงและโน้ต 13 บทใน repo

## ขอบเขตที่ยืนยันได้

หน้า [Associate Cloud Engineer Certification Learning Path](https://www.skills.google/paths/11) ระบุ 17 activities และบอกว่าเป็นชุด courses, labs และ skill badges แต่หน้าสาธารณะที่ไม่ลงชื่อเข้าใช้แสดงเพียงจำนวนกับคำอธิบาย ไม่แสดงรายชื่อ/ลำดับทั้ง 17 กิจกรรม จึงไม่เดารายการที่มองไม่เห็น

หน้าคอร์ส Google Skills ที่เชื่อมจาก path 11 และยืนยันได้ในรอบตรวจนี้:

| คอร์ส | ID | หัวข้อหลักตามหน้า course |
|---|---:|---|
| [Essential Google Cloud Infrastructure: Foundation](https://www.skills.google/paths/11/course_templates/50) | 50 | Google Cloud, VPC, Compute Engine |
| [Essential Google Cloud Infrastructure: Core Services](https://www.skills.google/paths/11/course_templates/49) | 49 | IAM, storage/database, billing/resource management, monitoring |
| [Elastic Google Cloud Infrastructure: Scaling and Automation](https://www.skills.google/paths/11/course_templates/178) | 178 | Hybrid network, load balancing, autoscaling, Terraform, managed services |
| [Build a Certification Study Guide: ACE Exam Prep](https://www.skills.google/paths/11/course_templates/77) | 77 | ปัจจุบันระบุ Gemini Notebook และการสร้าง study guide สำหรับ ACE |

ด้านล่างเป็นสารบัญ lesson/lab ที่เผยแพร่สาธารณะของ Google Cloud Training สำหรับคอร์สเหล่านี้ ใช้ขยายจากคำอธิบายสั้นบน Skills; รายละเอียดบางอย่างอาจต่างกันตามรุ่นภาษา/edition

[Google Cloud Fundamentals: Core Infrastructure](https://www.skills.google/course_templates/60) เป็นคอร์สพื้นฐานเสริมที่เกี่ยวข้อง แต่หน้าสาธารณะที่ตรวจได้ไม่ยืนยันว่าเป็นหนึ่งใน 17 activities ปัจจุบันของ path 11 จึงแยกไว้เป็นบทปูพื้นทางเลือก

นี่เป็นโน้ตเรียบเรียงใหม่เพื่ออธิบายแนวคิดและโยงกลับไปยังหัวข้อสอบ ไม่ใช่ transcript หรือสำเนาวิดีโอ/คำตอบ lab ของ Google Skills

---

## 0. พื้นฐานเสริม — Google Cloud Fundamentals: Core Infrastructure

[หน้า Google Skills](https://www.skills.google/course_templates/60) · [syllabus ของ Google Cloud Training](https://www.coursera.org/learn/gcp-fundamentals)

คอร์สนี้ปูคำศัพท์ บริการ compute/storage และการจัดการ resource ก่อนเรียนบทที่ลงรายละเอียด

### Module 1 — Course Introduction
เป้าหมายและภาพรวมคอร์ส

### Module 2 — Introducing Google Cloud
Cloud computing; IaaS กับ PaaS; global network; ความยั่งยืน; security; open-source ecosystem; pricing และ billing

### Module 3 — Resources and Access in the Cloud
Resource hierarchy และ projects; IAM; service accounts; Cloud Identity; ช่องทางใช้ Google Cloud; เริ่มต้นกับ Cloud Marketplace

### Module 4 — Virtual Machines and Networks in the Cloud
VPC; Compute Engine; การ scale VM; คุณสมบัติ VPC; Cloud Load Balancing; Cloud DNS และ Cloud CDN; การเชื่อม network; lab เริ่มต้น VPC/Compute Engine

### Module 5 — Storage in the Cloud
Cloud Storage และ storage classes/data transfer; Cloud SQL; Spanner; Firestore; Bigtable; วิธีเลือก storage/database; lab Cloud Storage และ Cloud SQL

### Module 6 — Containers in the Cloud
Container; Kubernetes; Google Kubernetes Engine (GKE)

### Module 7 — Applications in the Cloud
Cloud Run; Cloud Run functions; พัฒนาแอปบน cloud; lab Hello Cloud Run

### Module 8 — Prompt Engineering
แนวคิด generative AI tools และการเขียน prompt เพื่อให้ Gemini ตอบจากบริบท Google Cloud ได้ดีขึ้น

### Module 9 — Course Summary
ทบทวนและแหล่งเรียนต่อ

**อ่านต่อใน repo:** [01 Foundations](./Module-01-Foundations-and-Resource-Hierarchy.md), [02 IAM](./Module-02-IAM-Service-Accounts-and-Security.md), [04 VPC](./Module-04-VPC-Firewall-NAT-and-DNS.md), [05 Compute Engine](./Module-05-Compute-Engine-and-Instance-Groups.md), [06 Storage](./Module-06-Storage-and-Data-Protection.md), [07 Databases](./Module-07-Databases-and-Data-Services.md), [08 GKE](./Module-08-GKE-and-Kubernetes.md), [09 Cloud Run](./Module-09-Cloud-Run-and-Event-Driven-Services.md), [13 AI tools](./Module-13-AI-Tooling-and-Modern-Services.md)

---

## 1. Essential Google Cloud Infrastructure: Foundation

[Google Skills ID 50](https://www.skills.google/paths/11/course_templates/50) · [syllabus ของ Google Cloud Training](https://www.coursera.org/learn/gcp-infrastructure-foundation)

เน้นเข้าใช้งาน Cloud Console/Cloud Shell, ออกแบบ virtual network และสร้าง/ดูแล VM

### Module 1 — Introduction
ภาพรวมชุดคอร์ส infrastructure และบทบาทของผู้ออกแบบ cloud

### Module 2 — Interacting with Google Cloud
- ใช้ Google Cloud Console และ Cloud Shell
- สำรวจ project และทำงานกับทรัพยากร
- Google Cloud Marketplace และการ deploy LAMP stack
- Labs: Explore the Google Cloud Console and Cloud Shell; Deploy a LAMP Stack with Google Cloud Marketplace

### Module 3 — Virtual Networks
- VPC network, project และ subnetworks
- ขยาย subnet และจัดการ IP address
- Internal/external IP และการ map address
- Routes และ firewall rules
- Common network designs และราคา
- Private Google Access สำหรับเข้าถึง Google APIs จาก resource ที่ไม่มี external IP
- Cloud NAT สำหรับให้ private VM เริ่ม outbound connection
- Labs: Create and Configure VPC Networks; Implement Private Google Access and Cloud NAT

### Module 4 — Virtual Machines
- Compute Engine; สร้าง VM; access และ lifecycle
- Machine/compute options, ราคา และ special configurations
- Images, disk options และงานจัดการ VM ที่พบบ่อย
- Labs: Create Virtual Machines; Create and Configure Virtual Machines

**จำความสัมพันธ์:** VPC เป็น network scope; subnet เป็นช่วง IP ระดับ region; route กำหนด next hop; firewall กรอง traffic; Cloud NAT ให้ private resource ออกไปได้โดยไม่เปิด inbound จาก internet

**อ่านต่อใน repo:** [01 hierarchy](./Module-01-Foundations-and-Resource-Hierarchy.md), [03 tools/billing](./Module-03-Tools-Billing-and-Quotas.md), [04 VPC/firewall/NAT/DNS](./Module-04-VPC-Firewall-NAT-and-DNS.md), [05 Compute Engine/MIG](./Module-05-Compute-Engine-and-Instance-Groups.md), [10 load balancing/hybrid](./Module-10-Load-Balancing-and-Hybrid-Networking.md)

---

## 2. Essential Google Cloud Infrastructure: Core Services

[Google Skills ID 49](https://www.skills.google/paths/11/course_templates/49) · [syllabus ของ Google Cloud Training](https://www.coursera.org/learn/gcp-infrastructure-core-services)

ต่อจาก VM/VPC ไปยัง IAM, data services, resource cost และ observability

### Module 1 — Introduction
เป้าหมายคอร์สและภาพรวม infrastructure services

### Module 2 — Identity and Access Management (IAM)
- IAM และการให้สิทธิ์แก่ principals
- Organization และ resource hierarchy
- Roles: predefined/custom; demo สร้าง custom role
- Members/principals และการ bind role
- Service accounts
- Organization restrictions และ IAM best practices
- Lab: Exploring IAM

**อ่านต่อ:** [01 hierarchy](./Module-01-Foundations-and-Resource-Hierarchy.md), [02 IAM/service accounts](./Module-02-IAM-Service-Accounts-and-Security.md), [08 GKE identity](./Module-08-GKE-and-Kubernetes.md)

### Module 3 — Storage and Database Services
- Cloud Storage และคุณสมบัติของ buckets
- เลือก storage class; Filestore
- Cloud SQL; Spanner; AlloyDB; Firestore; Bigtable; Memorystore
- Bucket encryption และการจัดการ storage
- Labs: Create and Manage Cloud Storage Buckets and Encryption; Configure Cloud SQL

**อ่านต่อ:** [06 Storage/data protection](./Module-06-Storage-and-Data-Protection.md), [07 Databases/data services](./Module-07-Databases-and-Data-Services.md)

### Module 4 — Resource Management
- Resource Manager; quotas; labels
- Billing และ billing administration
- ตรวจข้อมูลค่าใช้จ่ายโดยใช้ BigQuery
- Lab: Examine Billing Data with BigQuery

**อ่านต่อ:** [01 hierarchy](./Module-01-Foundations-and-Resource-Hierarchy.md), [03 billing/quotas/APIs](./Module-03-Tools-Billing-and-Quotas.md), [07 BigQuery](./Module-07-Databases-and-Data-Services.md)

### Module 5 — Resource Monitoring
- Google Cloud Observability และ Monitoring
- Logging; Error Reporting; Tracing; Profiling
- Partner integrations
- Lab: Monitor Resources with Google Cloud Observability

**อ่านต่อ:** [11 Monitoring, Logging และ Troubleshooting](./Module-11-Observability-and-Operations.md)

### Module 6 — Course Resources
เอกสาร PDF และลิงก์อ้างอิงประกอบทุกโมดูล

---

## 3. Elastic Google Cloud Infrastructure: Scaling and Automation

[Google Skills ID 178](https://www.skills.google/paths/11/course_templates/178) · [syllabus ของ Google Cloud Training](https://www.coursera.org/learn/gcp-infrastructure-scaling-automation)

เน้นเชื่อม network, รองรับ traffic, scale workload, ทำ infrastructure automation และเลือก managed services

### Module 1 — Introduction
ภาพรวมชุดคอร์สสำหรับสร้างระบบ Google Cloud หรือเชื่อมระบบเดิม โดยเน้น Compute Engine

### Module 2 — Interconnecting Networks
- Cloud VPN และ HA VPN
- Cloud Interconnect และ Peering
- เลือก connection ให้ตรงความต้องการ
- Shared VPC และ VPC Peering
- Lab: Configure Google Cloud HA VPN

**อ่านต่อ:** [04 VPC/routes](./Module-04-VPC-Firewall-NAT-and-DNS.md), [10 VPN/Interconnect/Peering/Shared VPC](./Module-10-Load-Balancing-and-Hybrid-Networking.md)

### Module 3 — Load Balancing and Autoscaling
- Managed instance groups
- Autoscaling และ health checks
- Application Load Balancing
- Cloud CDN
- Network Load Balancing และ Internal Load Balancing
- วิธีเลือก load balancer
- Labs: Configure an Application Load Balancer with Autoscaling; Configure an Internal Load Balancer

**จำหน้าที่:** load balancer กระจาย traffic; health check คัด backend ที่พร้อม; autoscaler ปรับจำนวน VM; MIG จัดการ instances จาก template และ policy ร่วมกัน

**อ่านต่อ:** [05 Compute Engine/MIG](./Module-05-Compute-Engine-and-Instance-Groups.md), [10 Load Balancing](./Module-10-Load-Balancing-and-Hybrid-Networking.md), [11 Observability](./Module-11-Observability-and-Operations.md)

### Module 4 — Infrastructure Automation
- Infrastructure as Code และ Terraform
- Google Cloud Marketplace สำหรับ deploy solution
- Lab: Automating the Deployment of Infrastructure Using Terraform

**อ่านต่อ:** [12 Terraform/IaC](./Module-12-Terraform-and-Infrastructure-as-Code.md), [Lab 05: Terraform VPC and state](./Lab-Guide-TH/Lab-05-Terraform-VPC-and-State.md)

### Module 5 — Managed Services
- BigQuery สำหรับ analytics/warehouse
- Dataflow สำหรับ data processing
- Dataprep by Trifacta ใน syllabus edition ที่ตรวจพบ
- Managed Service for Apache Spark ใน syllabus edition ที่ตรวจพบ
- Demo managed Spark service

ชื่อบริการในวิดีโอรุ่นเดิมอาจต่างจากชื่อผลิตภัณฑ์ปัจจุบัน ส่วน ACE เน้นเข้าใจหน้าที่และการเลือกใช้ ไม่ได้กำหนดให้เชี่ยวชาญ data pipeline ระดับ production

**อ่านต่อ:** [07 databases/analytics/data services](./Module-07-Databases-and-Data-Services.md), [13 modern services](./Module-13-AI-Tooling-and-Modern-Services.md)

---

## 4. Build a Certification Study Guide: ACE Exam Prep

[Google Skills ID 77](https://www.skills.google/paths/11/course_templates/77)

หน้า Google Skills ปัจจุบันระบุ Gemini Notebook: ทบทวนความสามารถ สร้าง notebook และใช้ study guide ฝึกสอบ แหล่งเรียนรุ่นก่อนอาจเรียกเครื่องมือว่า NotebookLM และมีโครงสร้างบทเรียนต่างกัน จึงยึดกิจกรรมที่แสดงในบัญชี Skills ปัจจุบัน

ใช้ช่วงนี้ทำสิ่งต่อไปนี้:
1. แยก exam guide เป็น 4 หมวด และทำ checklist ว่าตนเองเข้าใจข้อใดแล้ว
2. เก็บเอกสารทางการและโน้ตที่เชื่อถือได้เป็น sources ของ study guide
3. สร้างคำถาม/คำอธิบายเพื่อทบทวน แล้วตรวจคำตอบกลับกับเอกสารต้นทาง
4. จดช่องว่างความรู้และกลับไปอ่านบทหรือทำ lab ที่ตรงกัน

**อ่านต่อ:** [Learning Path & Exam Map](./LEARNING-PATH.md), [Cheat Sheet](./CHEAT-SHEET.md), [Exam Scenarios](./EXAM-SCENARIOS.md), [Glossary](./GLOSSARY.md)

---

## 5. Course-to-exam map

อ้างอิง [Standard ACE Exam Guide](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf) ที่ตรวจ 4 ตุลาคม 2026 น้ำหนักเป็นค่าประมาณ ไม่ใช่จำนวนข้อแน่นอน

| หมวดข้อสอบ | น้ำหนัก | คอร์สที่ปูพื้น | โน้ตใน repo |
|---|---:|---|---|
| ตั้งค่า cloud solution environment | ~20% | Fundamentals, Foundation, Core Services | 01–04, 11, 13 |
| วางแผนและ implement solution | ~30% | Foundation, Core Services, Scaling and Automation | 04–10, 12–13 |
| ดูแลให้ solution ทำงานได้ | ~30% | Core Services, Scaling and Automation | 05–13 |
| ตั้งค่า access และ security | ~20% | Fundamentals, Core Services, ACE Exam Prep | 01–03, 08, 11, 13 |

คอร์ส Compute Engine ทั้งสามชุดไม่ใช่ขอบเขตข้อสอบทั้งหมด ข้อสอบ ACE ยังครอบคลุม GKE, Cloud Run, database choice, logs/audit, federation และ operational tooling จึงเช็กทุก objective จาก exam guide อีกครั้ง

## 6. ลำดับอ่าน

1. ใช้ Fundamentals เป็นบทปูพื้นหากยังใหม่กับ Google Cloud
2. เรียน Foundation พร้อมโน้ต 01, 03, 04, 05 และ 10
3. เรียน Core Services พร้อมโน้ต 02, 06, 07 และ 11
4. เรียน Scaling and Automation พร้อมโน้ต 04, 05, 07, 10 และ 12
5. อ่านโน้ต 08–09 ควบคู่กับกิจกรรม GKE/Cloud Run ใน Skills
6. ปิดท้ายด้วย ACE Exam Prep และตรวจทุก objective ใน [coverage map](./LEARNING-PATH.md) ก่อนทำ [สถานการณ์ฝึก](./EXAM-SCENARIOS.md)

## แหล่งข้อมูล

- [Google Skills — ACE Certification Learning Path](https://www.skills.google/paths/11)
- [Google Skills — Foundation (ID 50)](https://www.skills.google/paths/11/course_templates/50)
- [Google Skills — Core Services (ID 49)](https://www.skills.google/paths/11/course_templates/49)
- [Google Skills — Scaling and Automation (ID 178)](https://www.skills.google/paths/11/course_templates/178)
- [Google Skills — ACE Exam Prep (ID 77)](https://www.skills.google/paths/11/course_templates/77)
- [Google Skills — Google Cloud Fundamentals (ID 60)](https://www.skills.google/course_templates/60)
- [Google Cloud Training syllabus — Fundamentals](https://www.coursera.org/learn/gcp-fundamentals)
- [Google Cloud Training syllabus — Foundation](https://www.coursera.org/learn/gcp-infrastructure-foundation)
- [Google Cloud Training syllabus — Core Services](https://www.coursera.org/learn/gcp-infrastructure-core-services)
- [Google Cloud Training syllabus — Scaling and Automation](https://www.coursera.org/learn/gcp-infrastructure-scaling-automation)
- [Google Cloud — Standard ACE Exam Guide](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf)
