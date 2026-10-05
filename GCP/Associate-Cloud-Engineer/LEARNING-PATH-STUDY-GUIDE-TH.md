# คู่มืออ่านโน้ตตาม Google Skills Learning Path — ACE

[กลับสารบัญ ACE](./README.md) · [เปิด Learning Path ทางการ](https://www.skills.google/paths/11) · [สารบัญหัวข้อย่อยของหลักสูตร](./GOOGLE-SKILLS-CURRICULUM.md) · [แผนที่ Lab](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md)

> รุ่นตรวจสอบ: 5 ตุลาคม 2026 · ยึดลำดับ 17 กิจกรรมที่หน้า ACE Learning Path แสดงในวันที่ตรวจสอบ  
> **สถานะเนื้อหา:** เอกสารนี้จัดลำดับการอ่านตาม Path และชี้ไปยังโน้ตภาษาไทยที่มีอยู่ เนื้อหาเทคนิคหลักอยู่ใน 13 บทตามหัวข้อ ไม่ใช่ transcript หรือฉบับแปลครบทุกบทเรียนของ Google Skills

## วิธีใช้

1. เปิดกิจกรรมตามลำดับด้านล่างใน Google Skills แล้วอ่านหัวข้อไทยที่ผูกไว้ก่อนหรือระหว่างเรียน
2. ใช้ [สารบัญหลักสูตร](./GOOGLE-SKILLS-CURRICULUM.md) ดูหัวข้อย่อยที่เปิดเผยของแต่ละ course และ [Exam Map](./LEARNING-PATH.md) เชื่อมกลับไปยังขอบเขตสอบ
3. เมื่อกิจกรรมมี hands-on ให้เปิด [แผนที่ Lab ตาม Path](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) เพื่อดูว่าโน้ตมี lab คู่มือที่ตรงหรือเป็นเพียงแล็บเสริม
4. Lab ใน Google Skills ใช้ project และ credentials ชั่วคราวจาก session ของกิจกรรมนั้น อย่านำ credentials ไปใช้กับ project ส่วนตัว

คำว่า **มีโน้ตประกบ** หมายถึงมีบทอธิบายแนวคิดที่เกี่ยวข้องใน repo แล้ว ไม่ได้ยืนยันว่าทุก lesson หรือทุกขั้นตอน lab ของ course ถูกเขียนซ้ำครบถ้วน

---

## ลำดับกิจกรรม

### 1. A Tour of Google Cloud Hands-on Labs — GSP282

**อ่านโน้ตฉบับละเอียด:** [Activity 01 — GSP282](./Path-Activity-01-GSP282-TH.md)

**เป้าหมาย:** รู้จัก Cloud Console, project, IAM และ API พร้อมเข้าใจว่าระบบแล็บให้สภาพแวดล้อมชั่วคราวอย่างไร

- แยกชื่อบัญชี Google ส่วนตัวออกจากบัญชีชั่วคราวของแล็บ
- เข้าใจ project name, project ID และ project number ว่าเป็นคนละค่า
- สำรวจเมนูบริการและดูว่า resource อยู่ใน project ใด
- ตรวจ principal และ role ใน IAM; เข้าใจขอบเขตของ Viewer, Editor และ Owner
- รู้ว่า API ต้อง enable ใน project ที่จะใช้บริการ
- เข้าใจ Start Lab, timer, progress check และการจบ session

**อ่านประกบ:** [01 Foundations](./Module-01-Foundations-and-Resource-Hierarchy.md), [02 IAM](./Module-02-IAM-Service-Accounts-and-Security.md), [03 Tools/Billing/Quotas](./Module-03-Tools-Billing-and-Quotas.md)

**Lab:** ทำ GSP282 ใน Google Skills เอง; [Lab 01](./Lab-Guide-TH/Lab-01-Cloud-Shell-Storage-and-IAM.md) มีแนวคิดใกล้กันบางส่วน แต่ไม่ใช่ขั้นตอนหรือ grading task เดียวกัน

**เช็กตัวเอง:** ถ้าสลับไปใช้ project ผิด จะตรวจ project ID ที่ active อยู่ตรงไหน? ทำไม credential ของ lab ไม่ควรถูกใช้กับบัญชีส่วนตัว?

### 2. Build a Certification Study Guide: ACE Exam Prep

**อ่านโน้ตฉบับละเอียด:** [Activity 02 — ACE Exam Prep](./Path-Activity-02-ACE-Study-Guide-TH.md)

**เป้าหมาย:** ใช้ Gemini Notebook สร้างคู่มือทบทวนสอบจากแหล่งข้อมูลที่ระบุได้ และรู้จักตรวจคำตอบจากต้นทาง

- แยกขอบเขตสอบ ACE ออกเป็น 4 domain ก่อนสร้างหัวข้ออ่าน
- เลือก source ที่เชื่อถือได้ เช่น exam guide ปัจจุบัน, เอกสาร Google Cloud และโน้ตของตนเอง
- สร้าง notebook และจัดกลุ่ม source ให้ค้นย้อนกลับได้
- ใช้ study guide สร้างคำถามฝึกและสรุปจุดที่ยังไม่เข้าใจ
- ตรวจคำตอบกับ source ต้นทาง ไม่ท่องคำตอบจาก AI โดยไม่ตรวจสอบ

**อ่านประกบ:** [Learning Path & Exam Map](./LEARNING-PATH.md), [Cheat Sheet](./CHEAT-SHEET.md), [Exam Scenarios](./EXAM-SCENARIOS.md), [Glossary](./GLOSSARY.md)

**Lab:** เป็นกิจกรรมสร้าง study guide ไม่ใช่ Cloud resource lab ใน 5 Companion Labs ของ repo

**เช็กตัวเอง:** ถ้า AI สรุปว่า Cloud NAT รับ inbound connection ได้ จะตรวจความถูกต้องจากเอกสารใด และจะแก้โน้ตอย่างไร?

### 3. Essential Google Cloud Infrastructure: Foundation

**อ่านโน้ตและแบบฝึกประจำกิจกรรม:** [Activity 03 — Foundation](./Path-Activity-03-Foundation-TH.md)

**เป้าหมาย:** ใช้ Console/Cloud Shell ทำงานกับ VPC และ Compute Engine ตั้งแต่การสร้างจนถึงการเข้าถึง VM

- เลือก project และใช้ Cloud Shell / gcloud
- อ่าน VPC, subnet, CIDR, IP, route และ firewall rules
- แยก Private Google Access ออกจาก Cloud NAT
- สร้างและเข้าถึง VM; เลือก machine type, image และ disk
- เข้าใจ Marketplace และภาพรวมการ deploy application

**Lab ตาม course syllabus:** Explore the Google Cloud Console and Cloud Shell; Deploy a LAMP Stack with Google Cloud Marketplace; Create and Configure VPC Networks; Implement Private Google Access and Cloud NAT; Create Virtual Machines; Create and Configure Virtual Machines.

**อ่านประกบ:** [01 Foundations](./Module-01-Foundations-and-Resource-Hierarchy.md), [03 Tools](./Module-03-Tools-Billing-and-Quotas.md), [04 VPC](./Module-04-VPC-Firewall-NAT-and-DNS.md), [05 Compute Engine](./Module-05-Compute-Engine-and-Instance-Groups.md), [10 Load Balancing/Hybrid](./Module-10-Load-Balancing-and-Hybrid-Networking.md)

**Lab ที่ใกล้เคียง:** Lab 01 ครอบคลุม Cloud Shell บางส่วน; Lab 02 ครอบคลุม VPC/private VM/NAT บางส่วน แต่ไม่มีคู่มือแทน LAMP หรือ grading tasks ของ course

**เช็กตัวเอง:** VM ไม่มี external IP แต่ต้องดาวน์โหลด package และเรียก Google API ต้องพิจารณา Private Google Access, Cloud NAT และ firewall ต่างกันอย่างไร?

### 4. Essential Google Cloud Infrastructure: Core Services

**เป้าหมาย:** ใช้ identity, storage, database, billing และ monitoring ประกอบเป็นระบบที่ดูแลได้

- ผูก principal กับ role บน resource hierarchy และเข้าใจ service account
- เลือก Cloud Storage class และปกป้องข้อมูลด้วย encryption/retention
- เข้าใจตัวเลือก Cloud SQL และ database services ระดับภาพรวม
- ตรวจ project, quota, billing และข้อมูลค่าใช้จ่าย
- ใช้ Monitoring และ Logging เพื่อตรวจ resource

**Lab ตาม course syllabus:** Exploring IAM; Create and Manage Cloud Storage Buckets and Encryption; Configure Cloud SQL; Examine Billing Data with BigQuery; Monitor Resources with Google Cloud Observability.

**อ่านประกบ:** [02 IAM](./Module-02-IAM-Service-Accounts-and-Security.md), [03 Billing/Quotas](./Module-03-Tools-Billing-and-Quotas.md), [06 Storage](./Module-06-Storage-and-Data-Protection.md), [07 Databases](./Module-07-Databases-and-Data-Services.md), [11 Observability](./Module-11-Observability-and-Operations.md)

**Lab ที่ใกล้เคียง:** Lab 01 มี bucket/IAM บางส่วน; Lab 03 มี logs บางส่วน ไม่ได้แทน Cloud SQL, BigQuery billing หรือ course grading tasks

**เช็กตัวเอง:** งบประมาณแบบ alert ช่วยหยุด resource ที่ยังทำงานอยู่เองหรือไม่? ถ้าไม่ใช่ ต้องตรวจและ cleanup อะไร?

### 5. Elastic Google Cloud Infrastructure: Scaling and Automation

**เป้าหมาย:** เชื่อมเครือข่าย รองรับ traffic และทำ infrastructure ซ้ำได้

- เปรียบเทียบ HA VPN, Cloud Interconnect, VPC Peering และ Shared VPC
- เข้าใจ MIG, health check, autoscaling และ Cloud CDN
- เลือก Application, Network และ Internal Load Balancing ตาม protocol, scope และ backend
- ใช้ Terraform เพื่อสร้างและเปลี่ยน infrastructure
- รู้บทบาทของ BigQuery และ managed data-processing services

**Lab ตาม course syllabus:** Configure Google Cloud HA VPN; Configure an Application Load Balancer with Autoscaling; Configure an Internal Load Balancer; Automating the Deployment of Infrastructure Using Terraform.

**อ่านประกบ:** [04 VPC](./Module-04-VPC-Firewall-NAT-and-DNS.md), [05 Compute/MIG](./Module-05-Compute-Engine-and-Instance-Groups.md), [07 Data Services](./Module-07-Databases-and-Data-Services.md), [10 Load Balancing/Hybrid](./Module-10-Load-Balancing-and-Hybrid-Networking.md), [12 Terraform](./Module-12-Terraform-and-Infrastructure-as-Code.md)

**Lab ที่ใกล้เคียง:** Lab 02 แตะ network egress; Lab 05 แตะ Terraform/VPC; ไม่มีคู่มือ HA VPN หรือ load balancer ที่ตรงกับ labs ของ course

**เช็กตัวเอง:** ต้องเชื่อม network ระหว่างองค์กรโดยเข้ารหัสผ่าน internet และต้องการ tunnel สำรอง ควรพิจารณาอะไรบ้างก่อนเลือก HA VPN?

### 6. Getting Started with Google Kubernetes Engine

**เป้าหมาย:** เข้าใจ container, Kubernetes และวิธี deploy workload บน GKE

- สร้าง container image ด้วย Cloud Build และเข้าใจหน้าที่ของ registry
- แยก Kubernetes ออกจาก GKE ซึ่งเป็น managed control plane/cluster service
- เปรียบเทียบ GKE Autopilot กับ Standard
- อ่าน Deployment, Pod, Service และ desired state
- ใช้ kubectl ตรวจสถานะและ troubleshoot workload

**อ่านประกบ:** [05 Compute Engine](./Module-05-Compute-Engine-and-Instance-Groups.md), [08 GKE](./Module-08-GKE-and-Kubernetes.md)

**Lab ที่ใกล้เคียง:** Lab 04 ฝึก deploy/debug บน GKE แต่ไม่ใช่ course lab หรือ challenge lab เดียวกัน

**เช็กตัวเอง:** Deployment แสดง desired replicas มากกว่า available replicas ควรตรวจ object, event, pod status และ logs อย่างไร?

### 7. Developing Applications with Cloud Run on Google Cloud: Fundamentals

**เป้าหมาย:** deploy application container แบบ managed และจัดการ identity, revision และ traffic

- เข้าใจ Cloud Run service, revision และ container contract
- ตั้งค่า IAM, service identity, secrets และ environment variables
- แยก identity ที่ deploy ออกจาก runtime service account
- เข้าใจ autoscaling และ concurrency
- เชื่อม Pub/Sub หรือบริการอื่นกับ Cloud Run
- เปลี่ยน revision, ส่ง traffic และ rollback อย่างควบคุมได้

**Lab ตาม course syllabus:** least-privilege IAM bindings for Cloud Run; ใช้ Pub/Sub ร่วมกับ Cloud Run

**อ่านประกบ:** [02 IAM](./Module-02-IAM-Service-Accounts-and-Security.md), [09 Cloud Run](./Module-09-Cloud-Run-and-Event-Driven-Services.md), [11 Observability](./Module-11-Observability-and-Operations.md)

**Lab ที่ใกล้เคียง:** Lab 03 ฝึก authenticated Cloud Run, revisions และ logs; เป็น lab เสริม ไม่ตรงกับ course grader

**เช็กตัวเอง:** ถ้าต้อง rollback เวอร์ชันโดยไม่ลบ service ควรใช้ revision และ traffic split อย่างไร?

### 8. Developing Applications with Cloud Run Functions on Google Cloud

**เป้าหมาย:** สร้าง function ที่ตอบ HTTP หรือทำงานจาก event แล้วเชื่อมกับ service อื่นอย่างปลอดภัย

- แยก HTTP trigger กับ event trigger
- เลือก authentication และกำหนด IAM ให้ principal ที่เรียก
- ใช้ Eventarc/Pub/Sub และเชื่อม Workflows
- ใช้ Serverless VPC Access เมื่อจำเป็นต้องเข้าถึง private resource
- เชื่อม Firestore หรือ BigQuery Remote Functions ตาม use case
- ออกแบบ retry, idempotency, logging และการจัดการ dependency

**Lab ตาม course syllabus:** พัฒนา/deploy HTTP และ event functions; เชื่อม project resources; integrate Firestore

**อ่านประกบ:** [07 Databases](./Module-07-Databases-and-Data-Services.md), [09 Cloud Run/Events](./Module-09-Cloud-Run-and-Event-Driven-Services.md), [11 Observability](./Module-11-Observability-and-Operations.md)

**Lab ที่ใกล้เคียง:** Lab 03 เป็น Cloud Run service lab ไม่ใช่ function lab; coverage ของฟังก์ชันยังไม่มีคู่มือเฉพาะ

**เช็กตัวเอง:** เมื่อ event เดิมถูกส่งซ้ำ function จะป้องกัน side effect ซ้ำได้อย่างไร?

### 9. Select a Google Cloud Database for Your Applications

**เป้าหมาย:** เลือกฐานข้อมูลจากรูปแบบข้อมูลและ workload ไม่เลือกจากชื่อที่คุ้นเคย

- แยก relational, document, wide-column และ globally distributed database
- แยก OLTP จาก OLAP
- ประเมิน schema/query, consistency, latency, availability, scale, migration และ cost
- เข้าใจ Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable และ BigQuery
- รู้แนวคิด embeddings/vector search สำหรับ AI application และตรวจ edition/engine support
- ทำความเข้าใจ migration ของ PostgreSQL ไป Cloud SQL ในระดับ workflow

**อ่านประกบ:** [06 Storage](./Module-06-Storage-and-Data-Protection.md), [07 Databases/Data Services](./Module-07-Databases-and-Data-Services.md)

**Lab:** course มี hands-on เรื่อง Database Migration Service และ Vector Search ตาม syllabus; ไม่มี Companion Lab ใน repo ที่ทำซ้ำงานเหล่านี้

**เช็กตัวเอง:** ระบบรับธุรกรรมจำนวนมากกับงานวิเคราะห์ข้อมูลขนาดใหญ่ต้องเลือกฐานข้อมูลเหมือนกันหรือไม่? เพราะอะไร?

### 10. AI Infrastructure: Cloud GPUs

**เป้าหมาย:** เข้าใจเมื่อใด GPU เหมาะกับ workload และอะไรเป็นข้อจำกัดก่อน provision

- เปรียบเทียบ CPU, GPU และ TPU ตามรูปแบบการคำนวณ
- จับคู่ GPU option กับ memory, throughput และ distributed workload
- เข้าใจการ provision accelerator และการขยายจากเครื่องสู่ cluster
- ตรวจ framework/software support, quota, location และ capacity
- วัด utilization และค่าใช้จ่าย ไม่เลือก accelerator จากชื่อรุ่นเพียงอย่างเดียว

**อ่านประกบ:** [05 Compute Engine](./Module-05-Compute-Engine-and-Instance-Groups.md), [13 AI/Modern Services](./Module-13-AI-Tooling-and-Modern-Services.md)

**Lab:** ยังไม่มี GPU provisioning lab ใน Companion Labs; ต้องตรวจ availability และราคาใน Google Cloud ปัจจุบันก่อนทดลองจริง

**เช็กตัวเอง:** GPU ว่างแต่ utilization ต่ำอาจเกิดจากอะไร นอกจากชนิด GPU ไม่เหมาะ?

### 11. AI Infrastructure: Cloud TPUs

**เป้าหมาย:** รู้สถาปัตยกรรม TPU และเงื่อนไขที่ทำให้เหมาะกับงาน ML

- เข้าใจ TPU architecture และตัวเลือกการใช้งาน
- ตรวจ software/framework/model compatibility
- คิดถึง memory, interconnect, scaling และ capacity
- เข้าใจการประสาน GPU/TPU ใน workflow โดยไม่สมมติว่าเปลี่ยนแทนกันได้ทุกงาน

**อ่านประกบ:** [13 AI/Modern Services](./Module-13-AI-Tooling-and-Modern-Services.md)

**Lab:** ไม่มี TPU provisioning lab ใน Companion Labs

**เช็กตัวเอง:** ก่อนย้าย workload จาก GPU ไป TPU ต้องตรวจ dependency และข้อกำหนดใด?

### 12. AI Infrastructure: Deployment Types

**เป้าหมาย:** เลือกตำแหน่งและรูปแบบ deploy workload AI ระหว่าง VM, GKE และ inference service

- เลือก machine type, consumption option, deployment model และ machine image
- วาง network สำหรับ VM หรือ GKE cluster
- เตรียม container และจัดการ accelerator ให้เหมาะกับ workload
- เข้าใจ inference traffic, autoscaling และ GKE Inference Gateway
- เปรียบเทียบระดับ control กับ operational overhead

**อ่านประกบ:** [05 Compute Engine](./Module-05-Compute-Engine-and-Instance-Groups.md), [08 GKE](./Module-08-GKE-and-Kubernetes.md), [13 AI/Modern Services](./Module-13-AI-Tooling-and-Modern-Services.md)

**Lab:** ไม่มี deployment lab เฉพาะใน Companion Labs

**เช็กตัวเอง:** งาน inference ที่ต้องควบคุม node/driver เองกับงานที่ต้องการลดภาระ cluster ควรเปรียบเทียบอะไร?

### 13. Logging and Monitoring in Google Cloud

**เป้าหมาย:** ตรวจสุขภาพระบบและหาเหตุขัดข้องจาก metrics, logs, traces และ audit records

- เข้าใจ Cloud Monitoring, Cloud Logging, Error Reporting และ tracing
- สร้าง dashboard, uptime checks และ alert policies
- แยก SLI, SLO และ SLA; ทำ alert ให้สื่อถึง action
- เข้าใจ log routing, log buckets, sinks, query และ log-based metrics
- ตรวจ Cloud Audit Logs โดยเฉพาะ Data Access เมื่อจำเป็น
- มอง monitoring ข้าม project

**Lab ตาม course syllabus:** multi-project dashboards/monitoring; uptime checks; alert policies/SLOs; log analytics; audit logs

**อ่านประกบ:** [11 Observability and Operations](./Module-11-Observability-and-Operations.md)

**Lab ที่ใกล้เคียง:** Lab 03 ฝึกดู Cloud Run logs; ยังไม่มีคู่มือ dashboards, SLO, log analytics หรือ audit logs แบบแยกกิจกรรม

**เช็กตัวเอง:** alert ที่เกิดจาก CPU อย่างเดียวอาจไม่บอก user impact; จะเสริม SLI หรือ signal ใด?

### 14. Getting Started with Terraform for Google Cloud

**เป้าหมาย:** เขียนและทบทวน IaC อย่างปลอดภัย พร้อมเข้าใจ state และการเปลี่ยนแปลง

- อ่าน HCL, resource, variable, output, dependency และ module
- เข้าใจ init, plan, apply และ destroy
- ใช้ plan ตรวจ add/change/destroy ก่อน apply
- แยก configuration, state และ resource จริง
- เข้าใจ remote backend, locking, drift, import และ policy validation

**อ่านประกบ:** [12 Terraform/IaC](./Module-12-Terraform-and-Infrastructure-as-Code.md)

**Lab ตาม syllabus:** สร้าง/เปลี่ยน/ลบ resources; dependency/lifecycle; reusable modules; remote backend

**Lab ที่ใกล้เคียง:** Lab 05 ฝึก Terraform VPC, plan และ cleanup แต่ไม่ครอบคลุมทุก lesson หรือ badge grader

**เช็กตัวเอง:** ถ้า plan จะลบ resource ที่ยังใช้งานอยู่ ต้องตรวจ state, configuration และ dependency อะไรก่อน?

### 15. Implementing Cloud Load Balancing for Compute Engine — Skill Badge

**เป้าหมาย:** ตั้ง backend และเลือก load balancer ให้ตรงชนิด traffic และขอบเขตการเข้าถึง

- เตรียม Compute Engine VM/backend และ health check
- แยก passthrough Network Load Balancer จาก Application Load Balancer
- เข้าใจ internal load balancer สำหรับ traffic ภายใน
- ตรวจ firewall, backend health และ forwarding path
- ทำ challenge lab ด้วยการอ่าน requirement แล้วตรวจผลจาก resource ที่สร้าง

**อ่านประกบ:** [05 Compute Engine/MIG](./Module-05-Compute-Engine-and-Instance-Groups.md), [10 Load Balancing](./Module-10-Load-Balancing-and-Hybrid-Networking.md)

**Lab:** Skill badge มี hands-on/challenge lab; ไม่มี Companion Lab สำหรับ load balancing โดยตรง

**เช็กตัวเอง:** requirement ระบุ HTTP host/path routing เทียบกับ TCP passthrough ควรเริ่มเลือก LB จากเงื่อนไขใด?

### 16. Deploy Kubernetes Applications on Google Cloud — Skill Badge

**เป้าหมาย:** สร้าง image, ส่ง image เข้า registry, deploy บน GKE และดูแล Service/Deployment

- ใช้ Docker build, run และ debug container
- จัดการ image ใน Artifact Registry
- ใช้ GKE และ kubectl
- deploy/update application ด้วย Deployment และ expose ด้วย Service
- เข้าใจ continuous delivery และตรวจสถานะ rollout
- ทำ challenge lab ด้วยการแยกปัญหา image, cluster, deployment และ service

**อ่านประกบ:** [08 GKE/Kubernetes](./Module-08-GKE-and-Kubernetes.md), [12 Terraform](./Module-12-Terraform-and-Infrastructure-as-Code.md)

**Lab ที่ใกล้เคียง:** Lab 04 ฝึก Deployment/Service/debugging บน GKE แต่ไม่ได้แทน challenge lab หรือ grading tasks ของ badge

**เช็กตัวเอง:** image pull ไม่สำเร็จควรแยกตรวจ image path/tag, registry permission, node identity และ workload events อย่างไร?

### 17. Build Infrastructure with Terraform on Google Cloud — Skill Badge

**เป้าหมาย:** ใช้ modules และ state เพื่อสร้าง เปลี่ยน import และลบ infrastructure อย่างควบคุมได้

- ออกแบบ Terraform configuration ที่อ่านและนำกลับมาใช้ได้
- อ่าน plan ก่อนเปลี่ยนจริง และตรวจ dependency
- เข้าใจ local/remote state และการทำงานร่วมกัน
- import resource ที่มีอยู่แล้วและทำให้ config กับ state ตรงกัน
- ทำ challenge lab โดยระวัง resource ที่ระบบให้มาและ resource ที่ผู้เรียนสร้าง

**อ่านประกบ:** [12 Terraform/IaC](./Module-12-Terraform-and-Infrastructure-as-Code.md)

**Lab ที่ใกล้เคียง:** Lab 05 ครอบคลุม Terraform VPC/state บางส่วน; ยังไม่ใช่ challenge lab ของ badge

**เช็กตัวเอง:** ทำไมการ import resource เข้า state อย่างเดียวจึงยังไม่ทำให้ Terraform configuration จัดการ resource นั้นได้ถูกต้อง?

---

## สถานะความครอบคลุมใน repo

| สิ่งที่ตรวจ | สถานะ |
|---|---|
| ลำดับ 17 กิจกรรมและลิงก์ไป Google Skills | ทำเป็นคู่มืออ่านตามลำดับแล้ว |
| โน้ตอธิบายแนวคิดหลัก | มีใน 13 บทเชิงหัวข้อ และเชื่อมจากแต่ละกิจกรรม |
| ความละเอียดครบทุก lesson ตาม course edition | ยังต้องเทียบกับหน้า course/บัญชีผู้เรียนเป็นระยะ เพราะเนื้อหาและ edition เปลี่ยนได้ |
| คู่มือ Lab ตรงกับ official Lab ทุกตัว | ยังไม่ครบ; ดู [แผนที่ Lab](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) |
| การทดสอบ provisioning บน Google Cloud จริง | ยังไม่ได้ทำ; Companion Labs มีคำเตือนเรื่องค่าใช้จ่ายและ validation |

เอกสารนี้ทำให้ **ลำดับการอ่าน** เดินตาม Learning Path; มันไม่ได้อ้างว่าคู่มือ 5 Companion Labs เป็น Lab ทั้งหมดของ Google Skills
