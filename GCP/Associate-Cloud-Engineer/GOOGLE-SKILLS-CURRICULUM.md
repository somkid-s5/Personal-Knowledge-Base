# Associate Cloud Engineer — สารบัญและโน้ตตามหลักสูตร Google Skills

> ตรวจสอบ 5 ตุลาคม 2026 · ใช้อ่านประกบรายการกิจกรรมจริงและโน้ต 13 บทใน repo

> คู่มืออ่านตามลำดับ Path พร้อมลิงก์ไปยังบทโน้ตที่เกี่ยวข้องอยู่ที่ [LEARNING-PATH-STUDY-GUIDE-TH.md](./LEARNING-PATH-STUDY-GUIDE-TH.md) ส่วนการเทียบ official hands-on กับ Companion Labs อยู่ที่ [LEARNING-PATH-LAB-MAP.md](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md).

## ขอบเขตที่ยืนยันได้

หน้า [Associate Cloud Engineer Certification Learning Path](https://www.skills.google/paths/11) เปิดดูรายการกิจกรรมได้โดยไม่ต้องลงชื่อเข้าใช้ และแสดงชื่อ ประเภท คำอธิบาย และลำดับครบ 17 รายการ ด้านล่างคือ inventory ที่ตรวจจากหน้า path และหน้า activity/course ของแต่ละรายการเมื่อ 5 ตุลาคม 2026 หัวข้อ lesson สรุปด้วยถ้อยคำใหม่เพื่อใช้เป็นโน้ต ไม่ใช่ transcript

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


### รายการ 17 กิจกรรมตามลำดับที่แสดงบนหน้า Path

| # | กิจกรรม | ประเภท / เวลาโดยประมาณ | โน้ตที่อ่านประกบ |
|---:|---|---|---|
| 1 | [A Tour of Google Cloud Hands-on Labs (GSP282)](https://www.skills.google/focuses/2794?parent=catalog&path=11) | Lab · 45 นาทีบนการ์ด Path | [โน้ต Activity 01 — GSP282](./Path-Activity-01-GSP282-TH.md); Modules 01–03 |
| 2 | [Build a Certification Study Guide: ACE Exam Prep](https://www.skills.google/paths/11/course_templates/77) | Course · 1 ชม. | [โน้ต Activity 02 — ACE Exam Prep](./Path-Activity-02-ACE-Study-Guide-TH.md), Learning Path, Cheat Sheet |
| 3 | [Essential Google Cloud Infrastructure: Foundation](https://www.skills.google/paths/11/course_templates/50) | Course · 6 ชม. 45 นาที | Console/Cloud Shell, VPC, VM; Modules 01, 03–05, 10 |
| 4 | [Essential Google Cloud Infrastructure: Core Services](https://www.skills.google/paths/11/course_templates/49) | Course · 8 ชม. 15 นาที | IAM, storage/database, billing, monitoring; Modules 02–03, 06–07, 11 |
| 5 | [Elastic Google Cloud Infrastructure: Scaling and Automation](https://www.skills.google/paths/11/course_templates/178) | Course · 7 ชม. | hybrid network, load balancing, autoscaling, Terraform, managed data; Modules 04–05, 07, 10, 12 |
| 6 | [Getting Started with Google Kubernetes Engine](https://www.skills.google/paths/11/course_templates/2) | Course · 5 ชม. 45 นาที | Container, Kubernetes/GKE, Autopilot, kubectl; Module 08 |
| 7 | [Developing Applications with Cloud Run on Google Cloud: Fundamentals](https://www.skills.google/paths/11/course_templates/559) | Course · 8 ชม. | Cloud Run resource model, identity, access, revisions, integrations; Module 09 |
| 8 | [Developing Applications with Cloud Run Functions on Google Cloud](https://www.skills.google/paths/11/course_templates/505) | Course · 7 ชม. 15 นาที | HTTP/event triggers, VPC, security, workflows, Firestore; Module 09 |
| 9 | [Select a Google Cloud Database for Your Applications](https://www.skills.google/paths/11/course_templates/1234) | Course · 6 ชม. | relational/NoSQL, OLTP/OLAP, database choice, vector search; Module 07 |
| 10 | [AI Infrastructure: Cloud GPUs](https://www.skills.google/paths/11/course_templates/1403) | Course · 1 ชม. | GPU options, provisioning, frameworks, utilization; Module 13 |
| 11 | [AI Infrastructure: Cloud TPUs](https://www.skills.google/paths/11/course_templates/1405) | Course · 1 ชม. | TPU architecture/options, software, interoperability; Module 13 |
| 12 | [AI Infrastructure: Deployment Types](https://www.skills.google/paths/11/course_templates/1554) | Course · 1 ชม. 30 นาที | GCE/GKE deployment decisions and inference; Modules 05, 08, 13 |
| 13 | [Logging and Monitoring in Google Cloud](https://www.skills.google/paths/11/course_templates/99) | Course · 8 ชม. 30 นาที | metrics, alerting/SLOs, logs, audit; Module 11 |
| 14 | [Getting Started with Terraform for Google Cloud](https://www.skills.google/paths/11/course_templates/443) | Course · 6 ชม. 30 นาที | HCL, resources, modules, commands, state; Module 12 |
| 15 | [Implementing Cloud Load Balancing for Compute Engine](https://www.skills.google/paths/11/course_templates/648) | Skill badge · 30 นาที | network, application, internal load balancing; Module 10 |
| 16 | [Deploy Kubernetes Applications on Google Cloud](https://www.skills.google/paths/11/course_templates/663) | Skill badge · 1 ชม. 45 นาที | Docker, GKE, kubectl, Deployments/Services, CD; Module 08 |
| 17 | [Build Infrastructure with Terraform on Google Cloud](https://www.skills.google/paths/11/course_templates/636) | Skill badge · 1 ชม. 45 นาที | IaC, modules, state, import and change infrastructure; Module 12 |

เวลาเป็นค่าประมาณที่แสดงบนการ์ดกิจกรรมเมื่อวันที่ตรวจสอบ รายละเอียดหน้า lab GSP282 แสดงทั้งเนื้อหา 20 นาทีและ timer สำหรับทำ lab 45 นาที จึงยึดเวลา 45 นาทีบนการ์ด Path เป็นเวลาแผนอ่าน

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

## 5. Syllabus ของกิจกรรมที่เหลือใน Path 11

ส่วนนี้สรุปหัวข้อย่อยที่เปิดเผยบนหน้า Google Skills สำหรับกิจกรรม 1 และ 6–17 ส่วนกิจกรรม 2–5 มี syllabus อยู่ในส่วนก่อนหน้า หลักสูตรบางหน้าเป็น lesson แบบเอกสารหรือ lab ไม่ได้มีเฉพาะวิดีโอ

### 1. A Tour of Google Cloud Hands-on Labs — Lab GSP282

กิจกรรมเริ่มต้นให้คุ้นกับสภาพแวดล้อมแล็บและหน้า Cloud Console ได้แก่

- เข้า Console ด้วยข้อมูลชั่วคราวของแล็บ และแยกข้อมูลนั้นออกจากบัญชี Google Cloud ส่วนตัว/ที่ทำงาน
- ดู Projects และเข้าใจ project name, project number, project ID รวมถึง resource ภายใน project
- ใช้ navigation menu สำรวจประเภทบริการ
- เปิด IAM เพื่อตรวจ principal, role และ permission; แนวคิดพื้นฐานของ Viewer, Editor, Owner
- เปิด API Library และดูวิธี enable API ใน project
- รู้จัก Start Lab, timer, lab credentials, project ที่ระบบ provision ให้, progress tracking และการจบแล็บ

**โน้ตประกบ:** Modules 01–03 อธิบาย hierarchy, IAM, project/API/Cloud Console เพิ่มเติม; การลงมือทำจริงต้องใช้ credential ชั่วคราวที่ Google Skills มอบให้ใน session ของแล็บเท่านั้น

### 6. Getting Started with Google Kubernetes Engine

หัวข้อเรียงจากพื้นฐาน Google Cloud ไปสู่การจัดการ workload:

- พื้นฐาน cloud computing, Google Cloud compute/network, resource management, billing และการใช้ Console/Cloud Shell
- Container และ container image; build image ด้วย Cloud Build
- Kubernetes คืออะไร และ GKE ทำหน้าที่เป็น managed Kubernetes อย่างไร
- Kubernetes concepts/components; เปรียบเทียบ GKE Autopilot กับ Standard
- Kubernetes objects และการจัดการ desired state
- ใช้ kubectl ดู resources, ตรวจสถานะและ troubleshoot workloads
- Hands-on: Cloud Console/Cloud Shell, Cloud Build, สร้าง Autopilot cluster ผ่าน Console และ deploy/manage/inspect workloads จาก Cloud Shell

**โน้ตประกบ:** [Module 08 — GKE](./Module-08-GKE-and-Kubernetes.md), [Module 05 — Compute Engine](./Module-05-Compute-Engine-and-Instance-Groups.md), [Lab Guide](./Lab-Guide-TH/README.md)

### 7. Developing Applications with Cloud Run: Fundamentals

- Cloud Run overview, resource model และความสัมพันธ์ระหว่าง service/revision
- Container lifecycle และ autoscaling
- IAM access control: service identity, resource hierarchy และ least privilege
- Secrets และ environment variables
- พัฒนาและทดสอบ application ในเครื่องก่อน deploy
- จัดการ deployment, revisions และการปล่อยเวอร์ชัน
- เชื่อม Cloud Run เข้ากับบริการ Google Cloud อื่น เช่น Pub/Sub
- Labs ที่แสดงบนหน้า course: least-privilege IAM bindings for Cloud Run และใช้ Pub/Sub ร่วมกับ Cloud Run

**โน้ตประกบ:** [Module 09 — Cloud Run และ event-driven services](./Module-09-Cloud-Run-and-Event-Driven-Services.md)

### 8. Developing Applications with Cloud Run Functions

- แนวคิด Cloud Run functions: function แบบ managed สำหรับ HTTP request และ event
- Deploy functions; สร้างทั้ง HTTP และ event-driven functions
- กำหนด triggers และเชื่อม function กับ Workflows
- ตั้งค่า Serverless VPC Access เมื่อ function ต้องเชื่อม private resources
- Authentication, IAM และการปกป้องข้อมูลของ function
- เชื่อม function กับ Firestore และใช้ BigQuery Remote Functions
- Best practices สำหรับ code, dependencies, retries, observability และ resource usage
- Labs: develop/deploy HTTP และ event functions; เชื่อม project resources; integrate Firestore

**โน้ตประกบ:** Module 09 อธิบาย trigger, identity, VPC access, retry และ idempotency; ใช้ [Module 07](./Module-07-Databases-and-Data-Services.md) ประกอบเมื่อต่อ Firestore หรือ BigQuery

### 9. Select a Google Cloud Database for Your Applications

- ความแตกต่างของ relational และ non-relational databases
- กลุ่ม relational: Cloud SQL, AlloyDB, Spanner; กลุ่ม NoSQL: Firestore, Bigtable และบริการที่เกี่ยวข้อง
- แยก transactional workload (OLTP) กับ analytical workload (OLAP)
- เลือก database จาก schema/query, consistency, scale, latency, availability, migration และค่าใช้จ่าย
- Database considerations สำหรับ generative AI application และการจัดเก็บ/ค้นหา embeddings
- Vector Search บน AlloyDB, Cloud SQL for PostgreSQL และ Spanner
- Hands-on: ย้าย PostgreSQL ไป Cloud SQL ด้วย Database Migration Service; ทดลองตั้งค่า Vector Search ใน AlloyDB, Cloud SQL for PostgreSQL และ Spanner

**โน้ตประกบ:** [Module 07 — Databases and Data Services](./Module-07-Databases-and-Data-Services.md); vector search เป็นหนึ่งใน workload ที่ต้องประเมินตาม engine/edition และข้อกำหนดปัจจุบัน ไม่ใช่คุณสมบัติที่มีเหมือนกันทุก database

### 10. AI Infrastructure: Cloud GPUs

- ความหมายของ accelerated compute และบทบาทที่ต่างกันของ CPU, GPU และ TPU
- ตัวเลือก GPU และการจับคู่ชนิด accelerator กับ workload
- วิธี provision GPU clusters และสถาปัตยกรรมการขยายจากเครื่องเดียวไปยัง cluster
- Frameworks/software ที่ใช้ประโยชน์จาก GPU
- ปรับ utilization, memory use และ throughput ให้เหมาะกับงาน
- ตรวจ compatibility, location, quota, capacity และ cost ก่อนเลือก

**โน้ตประกบ:** [Module 13 — AI Tooling & Modern Cloud Operations](./Module-13-AI-Tooling-and-Modern-Services.md); รายชื่อ accelerator และ availability เปลี่ยนตาม generation/region จึงไม่ล็อกคำตอบไว้กับรุ่นใดรุ่นหนึ่ง

### 11. AI Infrastructure: Cloud TPUs

- TPU overview และความแตกต่างระหว่าง accelerator รุ่น/ตัวเลือก
- System architecture และ cloud architecture ของ TPU
- เลือก TPU option และรูปแบบการใช้/จัดสรร capacity ให้เหมาะกับเวลาและลักษณะ workload
- เลือก software stack ที่รองรับ
- การทำงานร่วมกันระหว่าง GPU และ TPU ใน ML workflow
- แนวปฏิบัติการพัฒนาโมเดล, use cases และตัวอย่างสถานการณ์

**โน้ตประกบ:** Module 13; ก่อนเลือกให้ตรวจ framework/model support, memory, interconnect, capacity, quota, location และราคาในปัจจุบัน

### 12. AI Infrastructure: Deployment Types

- ลำดับตัดสินใจ: machine type, consumption option, deployment option, orchestrator และ machine image
- เลือก GCE machine/deployment model พร้อมวาง networking ให้ instance
- Containerize AI application และเตรียม network สำหรับ GKE cluster
- ปรับ workload และพิจารณา GPU sharing
- ออกแบบ inference บน GKE, reference architecture และการใช้ GKE Inference Gateway เพื่อจัดการ inference traffic

**โน้ตประกบ:** Modules 05, 08 และ 13; ใช้เครื่อง/ออร์เคสเตรเตอร์ให้เหมาะกับระดับการควบคุม, ความยืดหยุ่น, operational burden และการใช้ accelerator

### 13. Logging and Monitoring in Google Cloud

- ภาพรวม Google Cloud Observability; บทบาท Cloud Monitoring, Cloud Logging, Error Reporting และ application performance tools
- Cloud Monitoring: architecture หลาย project, metric model/query, dashboards และ uptime checks
- SLI, SLO, SLA และการวาง alerting strategy; alert policies และ Service Monitoring
- Cloud Logging: architecture, log types/collection, storage, routing, export, query/view, log-based metrics และ Log Analytics
- Cloud Audit Logs: ประเภท log, Data Access logs, รูปแบบ log entry และแนวปฏิบัติ
- Labs: monitoring/dashboard across projects, uptime checks, alert policies/SLOs, log analytics และ audit logs

**โน้ตประกบ:** [Module 11 — Observability and Operations](./Module-11-Observability-and-Operations.md)

### 14. Getting Started with Terraform for Google Cloud

- Infrastructure as Code, Terraform overview และ Terraform workflow
- Terraform configuration/HCL และคำศัพท์ช่วง authoring
- คำสั่ง Terraform, Terraform Validator ตามชื่อ lesson และการแยก syntax validation ออกจาก policy validation ของ plan
- เอกสาร Google Cloud ปัจจุบันใช้ gcloud beta terraform vet เป็นแนวทางต่อจาก tooling รุ่นเก่า; ตรวจสถานะและ migration guide ก่อนนำไปใช้
- Resources, meta-arguments, implicit/explicit dependencies, variables และ outputs
- Terraform Registry และ Cloud Foundation Toolkit
- Modules: use cases, reuse, inputs/outputs และแนวทางออกแบบ
- State: local/remote backend และการจัดเก็บ state ให้ทีมใช้งานร่วมกัน
- Labs: create/change/destroy resources, dependency/lifecycle, reusable modules และ remote backend

**โน้ตประกบ:** [Module 12 — Terraform and Infrastructure as Code](./Module-12-Terraform-and-Infrastructure-as-Code.md)

### 15. Implementing Cloud Load Balancing for Compute Engine — Skill badge

- สร้างและ deploy Compute Engine VMs เป็น backend
- สร้าง passthrough Network Load Balancer
- สร้าง Application Load Balancer สำหรับ application
- สร้าง Internal Application Load Balancer เพื่อให้ client ภายในเชื่อมได้โดยไม่เปิด VM ตรงสู่ internet
- ทำ challenge lab รวมการตั้งค่า load balancing

**โน้ตประกบ:** [Module 10 — Load Balancing and Hybrid Networking](./Module-10-Load-Balancing-and-Hybrid-Networking.md)

### 16. Deploy Kubernetes Applications on Google Cloud — Skill badge

- ใช้ Docker สร้าง/run/debug containers และจัดการ container images
- Push/pull images จาก Google Artifact Registry
- สร้างและจัดการ GKE clusters
- ใช้ kubectl จัดการ cluster/resources
- Deploy และจัดการ application ด้วย Kubernetes Deployments และ Services
- รู้แนวทาง continuous delivery สำหรับ Kubernetes applications
- Labs: Docker introduction, GKE Qwik Start, orchestrate workload with Kubernetes และ challenge lab

**โน้ตประกบ:** Module 08; ใช้ Module 12 เมื่อเตรียม infrastructure แบบ IaC

### 17. Build Infrastructure with Terraform on Google Cloud — Skill badge

- แนวคิด IaC และโครงสร้าง Terraform configuration
- สร้าง เปลี่ยน provision และลบ infrastructure
- ใช้ modules แยก config ที่นำกลับมาใช้ได้
- จัดการ state ทั้ง local และ remote
- Import infrastructure ที่มีอยู่ แล้วปรับ configuration/state ให้สอดคล้อง
- Challenge lab ทดสอบ import/create/update/destroy

**โน้ตประกบ:** [Module 12 — Terraform and Infrastructure as Code](./Module-12-Terraform-and-Infrastructure-as-Code.md)

## 6. Course-to-exam map

อ้างอิง [Standard ACE Exam Guide](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf) ที่ตรวจ 4 ตุลาคม 2026 น้ำหนักเป็นค่าประมาณ ไม่ใช่จำนวนข้อแน่นอน

| หมวดข้อสอบ | น้ำหนัก | คอร์สที่ปูพื้น | โน้ตใน repo |
|---|---:|---|---|
| ตั้งค่า cloud solution environment | ~20% | Fundamentals, Foundation, Core Services | 01–04, 11, 13 |
| วางแผนและ implement solution | ~30% | Foundation, Core Services, Scaling and Automation | 04–10, 12–13 |
| ดูแลให้ solution ทำงานได้ | ~30% | Core Services, Scaling and Automation | 05–13 |
| ตั้งค่า access และ security | ~20% | Fundamentals, Core Services, ACE Exam Prep | 01–03, 08, 11, 13 |

คอร์ส Compute Engine ทั้งสามชุดไม่ใช่ขอบเขตข้อสอบทั้งหมด ข้อสอบ ACE ยังครอบคลุม GKE, Cloud Run, database choice, logs/audit, federation และ operational tooling จึงเช็กทุก objective จาก exam guide อีกครั้ง

## 7. ลำดับอ่าน

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
