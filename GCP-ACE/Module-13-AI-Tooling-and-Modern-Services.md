# Module 13 — AI Tooling & Modern Cloud Operations

> 🧠 **ภาพจำก่อนอ่าน:** 🧠 Concept → 🗺️ Flow → 🔎 Verify  
> 🎨 [Visual Guide ของวิชานี้](./VISUAL-STUDY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[สารบัญ](./README.md) · [ก่อนหน้า](./Module-12-Terraform-and-Infrastructure-as-Code.md) · [Lab Guide](./Lab-Guide-TH/README.md)

## 1. ทำไมมีบทนี้

Standard Exam Guide ปัจจุบันเพิ่ม AI-assisted operations/tooling และผลิตภัณฑ์ใหม่หลายรายการ หากอ่านแต่โน้ต ACE เก่า อาจพลาดหัวข้อเหล่านี้

บทนี้เป็นภาพรวมสำหรับเลือกและดูแลในระดับ ACE ไม่ใช่หลักสูตร ML engineering หรือ agent development เต็มรูปแบบ ชื่อ/feature/availability เปลี่ยนเร็ว จึงมีวันที่ตรวจและลิงก์ current docs

## 2. AI ช่วยอะไรในงาน cloud

| เครื่องมือ | ลักษณะงาน | สิ่งที่ยังต้องตรวจเอง |
|---|---|---|
| Gemini Cloud Assist | ช่วยวิเคราะห์/แนะนำใน cloud context ตาม capability และสิทธิ์ | resource scope, evidence, effect ของ recommendation |
| Gemini CLI | AI-assisted terminal/development ตาม tool configuration | commands, credentials, working directory, actual result |
| Google Antigravity | agent-oriented development/tooling ตาม product | code quality, tests, deployment scope |
| Application Design Center | ออกแบบ/deploy application infrastructure ตาม capabilities | generated config, IAM, location, cost |

AI response ไม่ใช่หลักฐานว่าคำสั่งถูกรันแล้ว ต้องดู cloud API result/resource state/logs จริง เช่น AI บอก “VM healthy” แต่ไม่มี metric/time range ก็ยังใช้ปิด incident ไม่ได้

## 3. Gemini Cloud Assist

[Gemini Cloud Assist](https://docs.cloud.google.com/cloud-assist/overview) ช่วยงานด้าน cloud analysis/operation ตาม integration ของบริการ การเข้าถึงขึ้นกับ prerequisites, IAM และ product settings

ตัวอย่างคำถามที่มีข้อมูลพอ:

> ใน project lab นี้ ช่วง 14:00–14:30 Asia/Bangkok service inventory มี p95 latency สูงขึ้นหลัง revision ใหม่ ช่วยเปรียบเทียบ error rate, latency และ dependency signals ก่อน/หลัง พร้อมระบุหลักฐานที่ใช้

ตัวอย่างที่ข้อมูลไม่พอ: “ระบบช้า แก้ให้ที” เพราะไม่มี project/service/time window/impact/scope

เมื่อได้ recommendation ให้แยก observation, hypothesis และ proposed change เช่น “connection wait สูง” เป็นหลักฐาน ส่วน “ลด concurrency” เป็นทางเลือกที่ต้องทดสอบ

## 4. Cloud Asset Inventory

ใช้รวบรวม/search/analyze metadata ของ cloud assets ตาม scope/permissions เหมาะกับ inventory, security review และคำถาม “มี resource อะไรอยู่ที่ไหน ใครเข้าถึงได้”

ไม่ใช่ agent ที่อ่านไฟล์ทุก VM หรือรู้ credential ภายใน app โดยอัตโนมัติ Assets/API support และ freshness ต้องตรวจตาม [Cloud Asset Inventory](https://docs.cloud.google.com/asset-inventory/docs/overview)

**ตัวอย่างงานจริง:** หา buckets ที่ public access config ไม่ตรง baseline, ดู SA ที่ผูก workload หรือสำรวจ projects/resources ก่อนตั้ง monitoring coverage

## 5. App Hub กับ Cloud Hub

| บริการ | บทบาท |
|---|---|
| App Hub | application model/registry ที่รวม resources เป็น application components |
| Cloud Hub | operations view/insights ของ project/application |
| Monitoring/Logging | telemetry และ operation data sources ที่เกี่ยวข้อง |

[Cloud Hub](https://docs.cloud.google.com/hub/docs/overview) รวมมุมมอง events, health, capacity และอื่น ๆ ที่รองรับ ช่วยให้มอง application ข้าม resource ได้ แต่ถ้าข้อมูลต้นทางไม่ได้เก็บ/ไม่มีสิทธิ์ก็ไม่ควรคาดว่าจะเห็นทุกอย่าง

อย่าสับสน Cloud Hub กับ Network Connectivity Center hub ซึ่งเป็น network connectivity concept คนละเรื่อง

## 6. Database Center และ Active Assist

Database Center ให้มุมมอง database fleet ตามบริการที่รองรับ ใช้หา health/configuration/recommendation signals เพื่อไปดูแล engine ต่อ

Active Assist/recommenders ช่วย optimization เช่น unused resources/rightsizing/access recommendations ตาม capabilities ไม่ควรทำทุก recommendation โดยไม่มี business context

**ตัวอย่าง:** VM CPU เฉลี่ยต่ำ แต่รัน batch สิ้นเดือน อาจไม่ควรลด size จาก 7 วันล่าสุดอย่างเดียว ตรวจ peak, memory, storage และ service objectives

## 7. GPUs vs TPUs

| Accelerator | ลักษณะ | ถามก่อนเลือก |
|---|---|---|
| GPU | accelerator สำหรับ workloads/frameworks ที่รองรับ | software stack, model/runtime, GPU memory, driver |
| TPU | accelerator ที่ออกแบบสำหรับ ML tensor workloads และ ecosystem ที่รองรับ | framework/model compatibility, TPU architecture/runtime |

ไม่เลือก TPU เพียงเพราะ “AI เร็วกว่า” ทุก model หรือ GPU เพียงเพราะ “เครื่องมี RAM เยอะ” ตรวจ workload support, quota, location, cost และ availability

Attach GPU/TPU ไม่ได้ทำให้ code CPU เดิมใช้ accelerator อัตโนมัติ ต้องใช้ libraries/runtime ที่รองรับ และ installation/maintenance behavior ต่างจาก VM ทั่วไป

## 8. Agent Runtime

Exam guide ปัจจุบันใช้ชื่อ **Agent Runtime on Gemini Enterprise Agent Platform** พร้อมชื่อเดิม Vertex AI Agent Engine เพื่อช่วยจับคู่กับเนื้อหาเก่า

[Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale) เป็น managed runtime สำหรับ deploy/operate/scale agentic applications ตาม capabilities เช่น runtime identity, observability และ components ที่รองรับ

Cloud Engineer ต้องคิด API/region/quota, runtime SA, data/tool access, networking, versions/traffic, logs/traces และ usage cost ไม่ถือว่า agent มีสิทธิ์อ่านทุก project หรือทำทุก action เพียงเพราะ deploy แล้ว

ตัวอย่าง app agent ค้นเอกสารแล้วเรียก ticket API: ต้องให้ access เฉพาะ data/tools ที่ต้องใช้ บันทึก actions และตรวจการ retry/side effects โดยเฉพาะงานสร้าง/แก้ข้อมูล

## 9. Notebooks และ Cloud Workstations

| Environment | ใช้กับ | ดูแลอะไร |
|---|---|---|
| Managed notebooks / Workbench ที่บริการรองรับ | data/ML development | compute lifecycle, storage, identity, package/data access |
| BigQuery notebooks | analytics/data development ตาม integration | query/data access, runtime configuration และค่าใช้จ่าย |
| Cloud Workstations | managed developer environments | workstation config, networking, access, lifecycle |

Development environment ยังมีค่า compute/storage/network ไม่ใช่ sandbox ฟรีตลอด เปิด accelerator notebook ทิ้งไว้ก็อาจมีค่าใช้จ่ายตาม configuration

แยก dev identity จาก production runtime identity และไม่ใช้ไฟล์ SA key ที่แชร์ทุก developer เป็นวิธี default

## 10. CMEK และ Cloud KMS

[CMEK](https://docs.cloud.google.com/kms/docs/cmek) ให้เราเลือก/ควบคุม encryption keys สำหรับ services ที่รองรับ โดย service identities ต้องมี permission ใช้ key ตาม integration

| ประเด็น | วิธีคิด |
|---|---|
| Key location | ต้อง compatible กับ resource/service location |
| IAM | แยก key administration กับ key usage เมื่อออกแบบได้ |
| Rotation | วาง version/rotation behavior ตามบริการ |
| Disable/destroy | อาจทำให้ data/resource ใช้งานไม่ได้ ต้องเข้าใจผลก่อนทำ |
| Backup/DR | ต้องมี key access/recovery ที่สอดคล้องกับ data recovery |

CMEK ไม่แทน IAM, firewall หรือ backup และไม่ได้แปลว่าผู้ที่ได้รับอนุญาต query data จะอ่านไม่ได้ บริการถอดรหัสตาม authorized operations เมื่อ key ใช้งานได้

## 11. New storage/data services

Managed Lustre, NetApp Volumes, AlloyDB และ Managed Kafka ต้องรู้ว่าแก้โจทย์ไหน ไม่ต้องจำทุก SKU แต่ต้องตรวจ protocol/API compatibility, location, HA/recovery, IAM และ pricing ก่อน deploy

**ตัวอย่าง:** HPC ต้อง parallel filesystem throughput ไม่ใช่ relational database จึงพิจารณา Managed Lustre จาก requirement ส่วน app ใช้ Kafka clients ต้องดู Kafka service compatibility แทนคิดว่า Pub/Sub API เหมือนกันทุกด้าน

## 12. Workflow ใช้ AI แบบตรวจได้

1. กำหนดโจทย์พร้อม project/service/time/constraints
2. ให้ดึงหลักฐานแบบ read-only ที่สิทธิ์อนุญาต
3. แยกข้อเท็จจริงกับการคาดเดา
4. สร้าง proposed config/command พร้อมผลกระทบและ rollback
5. ตรวจ IAM/scope/cost และ output ที่สร้าง
6. รันใน lab/staging ตาม change process ก่อน production
7. ตรวจผลจากระบบจริงและบันทึกหลักฐาน

ตัวอย่างคำถามทบทวน: “AI แนะนำเพิ่ม max instances ทำไมอาจทำให้แอปพัง?” เพราะ downstream DB connection/throughput อาจไม่รองรับ ต้องดูระบบทั้งเส้นทาง

## 13. อ่าน AI infrastructure path ในมุม Cloud Engineer

กิจกรรม AI infrastructure ใน Path 11 ครอบคลุมการเลือก accelerator และรูปแบบ deploy ในภาพรวม ไม่ได้แทนหลักสูตรพัฒนาโมเดล:

| คำถามก่อนเลือก | GPU | TPU |
|---|---|---|
| Workload/framework รองรับหรือไม่ | ตรวจ driver, runtime, libraries และ model kernels | ตรวจ framework/compiler/runtime และรูปแบบ model ที่รองรับ |
| รูปแบบ workload | งานหลากหลายและ ecosystem GPU กว้าง | tensor/ML workload ที่เข้ากับ TPU system |
| Provisioning | VM, multi-GPU หรือ cluster ตาม workload | TPU resource/system และ topology ตามรุ่นที่เปิดใน region |
| Capacity/cost | ตรวจ quota, accelerator availability, utilization และเวลาที่ต้องใช้ | ตรวจ quota, capacity/consumption option, utilization และเวลาที่ต้องใช้ |

ชื่อรุ่น เครื่องที่รองรับ และตัวเลือกบริโภคเปลี่ยนตาม generation/region จึงควรตรวจหน้า product ปัจจุบันก่อนคำนวณราคา

### เลือกระหว่าง GCE, GKE และรูปแบบใช้งาน

- **GCE VM:** เลือกเมื่อจำเป็นต้องควบคุม machine image, drivers, system packages, process lifecycle หรือ topology ด้วยตนเองมากขึ้น
- **GKE:** เลือกเมื่อจำเป็นต้องจัดการ containerized inference/workloads, schedule GPU resources หรือทำ rollout ใน cluster โดยทีมมีความพร้อมดูแล Kubernetes
- ก่อน containerize ตรวจ base image, accelerator drivers/runtime compatibility, Artifact Registry access, startup/readiness behavior และ observability
- แบ่ง GPU ให้หลาย workloads เฉพาะเมื่อเทคนิค sharing ที่เลือกเหมาะกับ hardware/runtime และไม่ทำให้ latency/performance isolation ผิดเป้าหมาย
- สำหรับ inference ตรวจ network/ingress, model loading time, batching/concurrency, health signals, accelerator utilization และ autoscaling behavior
- GKE Inference Gateway/architecture ใช้เมื่อ feature และ product support ปัจจุบันตรงกับ routing/serving need; อย่าสรุปว่า gateway แก้ model capacity หรือ model quality

**ใช้เป็นโจทย์เลือก design:** เริ่มจาก model/framework และ service objective → เลือก accelerator → เลือก machine/consumption model → เลือก GCE หรือ GKE → ตรวจ network, IAM, capacity, cost และ rollout/recovery

## เอกสารประกอบ

- [Current exam guide](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf)
- [Gemini Cloud Assist](https://docs.cloud.google.com/cloud-assist/overview)
- [Cloud Hub](https://docs.cloud.google.com/hub/docs/overview)
- [Cloud Asset Inventory](https://docs.cloud.google.com/asset-inventory/docs/overview)
- [Agent Runtime](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale)
- [CMEK](https://docs.cloud.google.com/kms/docs/cmek)
