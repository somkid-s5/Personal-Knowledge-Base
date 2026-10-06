# Activity 04 — Essential Google Cloud Infrastructure: Core Services (ฉบับอ่านเป็นโน้ตภาษาไทย)

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Activity 03](./Path-Activity-03-Foundation-TH.md) · [Lab map](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/49)

> โน้ตนี้ยึด Activity 04 ของ ACE Learning Path โดยตรง อธิบาย IAM, storage/database, resource/billing และ Cloud Observability พร้อมแบบฝึกประกบ Course page กับ syllabus ที่เผยแพร่ระบุ labs ด้าน IAM, Cloud Storage encryption, Cloud SQL, Billing data in BigQuery และ Observability คู่มือนี้เป็นเนื้อหาเรียบเรียงใหม่ ไม่ใช่เฉลย grader ของ Google Skills

## เป้าหมายการเรียน

หลังเรียนควรทำได้:

- อธิบายว่า principal ได้สิทธิ์จาก IAM policy ที่ผูกกับ resource อย่างไร และ inheritance ทำงานอย่างไร
- เลือก role อย่างระมัดระวัง พร้อมแยก user identity, service account และ Google-managed service agent
- เลือก Cloud Storage, Filestore หรือ database ตามรูปแบบข้อมูลและการใช้งาน
- อธิบาย encryption at rest, Google-managed keys, CMEK และข้อควรระวังของ key lifecycle
- อ่าน billing account/project/labels/SKU/usage และใช้ BigQuery เพื่อวิเคราะห์ billing export
- ใช้ Metrics, Logs, alert และ audit records เพื่อสังเกตการณ์ระบบ

## Course map

| Course module | ประเด็นที่ต้องจับให้ได้ | Hands-on ที่แสดงใน syllabus |
|---|---|---|
| Identity and Access Management (IAM) | organization, roles, members/principals, service accounts, best practices | Exploring IAM |
| Storage and Database Services | Cloud Storage features/classes, Filestore, Cloud SQL, Spanner, AlloyDB, Firestore, Bigtable, Memorystore | Create and Manage Cloud Storage Buckets and Encryption; Configure Cloud SQL |
| Resource Management | Resource Manager, quotas, labels, billing | Examine Billing Data with BigQuery |
| Resource Monitoring | Cloud Observability, monitoring, logging, error reporting, tracing, profiling | Monitor Resources with Google Cloud Observability |

รายการและชื่อบทเรียนอาจต่างตาม edition; ใช้หน้า Skills ของผู้เรียนเป็นตัวชี้ขาดเรื่องลำดับและ grader

## 1. IAM คือการตัดสินใจว่าใครทำอะไรกับ resource ใด

IAM policy มี **bindings** ที่ผูก principal กับ role บน resource:

`principal + role + resource`

ตัวอย่างเชิงความหมาย: ให้กลุ่มผู้ดูแลระบบมี Compute Instance Admin บน project เฉพาะ ไม่จำเป็นต้องให้สิทธิ์ทั้ง organization

- **Principal**: user, Google Group, service account หรือ federated identity ที่ได้รับอนุญาต
- **Role**: ชุด permissions
- **Resource**: เช่น organization, folder, project หรือ resource ที่รองรับ policy
- **Policy inheritance**: สิทธิ์ที่ให้ใน parent อาจสืบทอดลง child resources; ต้องพิจารณาสิทธิ์รวม ไม่ดูเฉพาะ policy บน resource ปลายทาง

IAM authorization ตอบ “ตัวตนนี้ทำ operation นี้ได้หรือไม่” ส่วน VPC firewall ตอบเรื่อง packet traffic; ทั้งสองเป็นคนละ control plane

### Basic, predefined และ custom roles

| ประเภท role | ความหมาย | ใช้เมื่อ |
|---|---|---|
| Basic (Owner/Editor/Viewer) | กว้างและครอบคลุมหลายบริการ | เข้าใจผลกระทบก่อนใช้; หลีกเลี่ยงเป็น default สำหรับงานจริง |
| Predefined | Google ดูแลชุด permission สำหรับงาน/บริการ | เป็นจุดเริ่มที่เหมาะกับ least privilege |
| Custom | องค์กรเลือก permission ที่จำเป็นเอง | เมื่อ predefined role กว้าง/แคบไม่ตรงงานและมีเจ้าของดูแล role |

เลือก role จาก **งานที่ต้องทำ** และ scope ที่เล็กที่สุด ไม่ใช่จากตำแหน่งงานหรือความสะดวกในขณะนั้น หลีกเลี่ยงการแก้ permission ด้วยการเพิ่ม Owner ทันทีเมื่อเจอ 403; อ่าน permission ที่ขาด, resource scope และ principal ที่กำลังใช้ก่อน

### User, Service Account และ Service Agent

- **User/group principal** แทนคนหรือกลุ่มคน
- **Service account (SA)** เป็น identity สำหรับ workload หรือ automation; application ใช้ SA เพื่อเรียก Google APIs
- **Service agent** เป็น Google-managed service identity ที่บริการสร้างเพื่อทำงานแทนบริการนั้น

อย่าสร้าง key file หากมีวิธี identity แบบไม่ใช้ key ที่เหมาะกว่า และห้ามใส่ key ลง source code, image หรือ Git หากต้องใช้ SA ให้ grant role แก่ principal ที่เหมาะสมและแยกสิทธิ์ deploy ออกจาก runtime access เท่าที่ architecture รองรับ

### แนวทางตรวจ IAM เมื่อ access denied

1. ยืนยัน account/principal ที่ใช้งานจริง
2. ตรวจ project/folder/organization ที่เลือก
3. อ่าน error ว่าขาด permission อะไรและกำลังทำ operation ใด
4. ตรวจ inherited policy, deny policy หรือ organization policy ที่เกี่ยวข้อง
5. เลือก role ที่ให้ permission เฉพาะงานใน scope ที่เหมาะสม
6. ตรวจผลและบันทึกเหตุผล; อย่าปล่อย temporary broad grant ค้างไว้

## 2. Cloud Storage, encryption และ data protection

Cloud Storage เป็น object storage: bucket เป็น container ของ objects; ใช้กับไฟล์, backup, static assets, data ingestion และ object-based datasets

### Storage classes เลือกจาก access pattern

เลือก class ตามความถี่การอ่าน, ระยะเวลาเก็บ, retrieval cost, minimum storage duration, location และ availability requirement ปัจจุบัน ไม่เลือกจากค่าเก็บต่อ GB อย่างเดียว เพราะ operation/retrieval/early deletion charges อาจเปลี่ยนต้นทุนจริง

- **Standard**: access ถี่/คาดเดาไม่ได้
- **Nearline/Coldline/Archive**: access ลดลงและเก็บนานขึ้น แต่ต้องพิจารณา retrieval และ minimum duration
- Location: regional, dual-region หรือ multi-region ตาม latency, residency, durability และราคา
- Lifecycle management ช่วยเปลี่ยน class/delete ตาม rule แต่ต้องทบทวน rule ให้ตรง retention policy

### IAM เทียบกับ ACL และ public access

Bucket/object permissions ควรจัดการด้วย IAM ตามแนวทางปัจจุบัน; uniform bucket-level access ช่วยรวมการควบคุมให้เข้าใจง่ายเมื่อไม่จำเป็นต้องใช้ ACL ราย object ตรวจ public access prevention และอย่าตั้ง object เป็น public เพื่อแก้ permission issue โดยไม่ตั้งใจ

### Encryption

Data ถูกเข้ารหัสขณะจัดเก็บโดยค่าเริ่มต้นตามบริการ แต่ข้อกำหนดอาจต้องใช้:

- **Google-managed encryption keys**: Google จัดการ key lifecycle ให้
- **CMEK (Customer-managed encryption keys)**: ใช้ Cloud KMS key ที่ลูกค้าควบคุม policy, rotation และ disable/destroy lifecycle ได้มากขึ้น
- **CSEK (Customer-supplied encryption keys)**: ลูกค้าเป็นผู้ส่ง key ใน request ตาม feature ที่รองรับ; ต้องจัดเก็บ key อย่างปลอดภัย

CMEK ไม่ได้ทำให้ข้อมูลปลอดภัยโดยอัตโนมัติ หาก key ถูก disable/destroy หรือ service account ขาดสิทธิ์ใช้ key งานอ่าน/เขียนอาจล้มเหลว ควรวาง rotation, backup/availability, audit, separation of duties และ recovery ก่อนบังคับใช้ CMEK

## 3. เลือก storage/database จาก data model

| Service | รูปแบบหลัก | คำถามเลือก |
|---|---|---|
| Cloud Storage | objects/files | ข้อมูลเป็นไฟล์หรือ blob และต้องการ lifecycle/location แบบใด |
| Filestore | managed NFS file system | หลาย clients ต้องใช้ shared filesystem semantics หรือไม่ |
| Cloud SQL | managed relational engines ที่รองรับ | ต้องการ relational schema/SQL และ operational footprint ระดับใด |
| AlloyDB | PostgreSQL-compatible managed database ที่ออกแบบเพื่อ performance/availability | workload PostgreSQL ต้องการคุณสมบัติเพิ่มใด |
| Spanner | relational, horizontal scale และ distributed consistency | ต้องการ scale/availability ระดับ global พร้อม relational model หรือไม่ |
| Firestore | document database | application อ่าน/เขียน document ตาม key/query แบบใด |
| Bigtable | wide-column NoSQL | workload key-value/time-series ที่ throughput สูงและ access pattern ชัดหรือไม่ |
| Memorystore | managed in-memory cache/data store | ต้องการ cache/low-latency ephemeral data หรือไม่ |

การจำชื่อผลิตภัณฑ์ไม่พอ ให้เทียบ schema, query, transaction, consistency, latency, scale, HA/DR, migration path, operations และ cost

### Cloud SQL: managed ไม่ได้แปลว่าไม่มีงาน DBA

ยังต้องเลือก engine/version, region, machine/storage, availability, backup/retention, maintenance, network/private IP, IAM/database auth, connection capacity, query performance และ migration plan ตรวจว่า HA configuration ตอบ availability ไม่ใช่ backup; backup ก็ไม่ใช่ cross-region DR จนกว่าจะตรวจ restore/failover path

อย่าเปิด database public โดยไม่จำเป็น ใช้ private connectivity และ authorized networks/identity ตาม architecture ตรวจ client connections, TLS, credentials และ application retry behavior

## 4. Resource Manager, quota, labels และ billing

- **Resource hierarchy**: Organization → Folder → Project → resources; ใช้จัด policy, scope และ ownership
- **Quota**: จำกัดจำนวนหรือ rate ของ resource/API; quota error แก้ด้วยการลด/จัดสรรใหม่หรือขอเพิ่มตาม workflow ไม่ใช่บังคับ retry ถี่ ๆ
- **Labels**: key/value metadata ใช้จัดกลุ่ม/filter/report ค่าใช้จ่าย; กำหนดมาตรฐาน เช่น `env`, `team`, `service`, หลีกเลี่ยงข้อมูลลับ/PII
- **Billing account**: เป็นการเชื่อม account ที่รับผิดชอบค่าใช้จ่ายกับ project; สิทธิ์ billing แยกจาก Project IAM

### อ่าน billing data ด้วย BigQuery

Billing export ส่งรายละเอียด usage/cost ไป BigQuery dataset เพื่อ query และทำ report ได้ คิดเป็น pipeline:

`Billing account → export configuration → BigQuery dataset/table → SQL query → report/dashboard`

ก่อน query ให้เข้าใจ schema/table type (เช่น standard/detailed export ตามที่เปิด), export start time, currency, usage date, project, service, SKU, credits, labels และ partitioning เพื่อไม่ตีความค่าใช้จ่ายผิด

ตัวอย่าง query สำหรับสำรวจ (ชื่อ project/dataset/table และ field ให้ตรวจ schema จริงก่อน):

```sql
SELECT
  project.id AS project_id,
  service.description AS service,
  sku.description AS sku,
  SUM(cost) AS gross_cost
FROM `BILLING_PROJECT.BILLING_DATASET.gcp_billing_export_v1_ACCOUNT_ID`
WHERE usage_start_time >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 30 DAY)
GROUP BY project_id, service, sku
ORDER BY gross_cost DESC
LIMIT 50;
```

Query นี้เป็นจุดเริ่มต้นในการดูยอด cost รวมก่อนเครดิต ไม่ใช่ invoice reconciliation สำเร็จรูป: ถ้าต้องหายอดสุทธิ ต้องคิด credits, adjustments, taxes และ export type/schema ตามรายงานที่ต้องการ

Budget alert เป็นสัญญาณเตือน ไม่ใช่ hard spending cap และ billing export อาจมี delay; อย่าใช้เป็นกลไกหยุด resource โดยอัตโนมัติเพียงตัวเดียว

## 5. Cloud Observability: ใช้สัญญาณหลายแบบร่วมกัน

| สัญญาณ | ตอบคำถาม | ตัวอย่าง |
|---|---|---|
| Metrics | มีค่าตัวเลขเปลี่ยนอย่างไรตามเวลา | CPU, request count, latency |
| Logs | เกิด event/ข้อความอะไร | application error, audit entry |
| Traces | request ผ่าน components ใดและเสียเวลาตรงไหน | distributed request path |
| Error Reporting | error groups/stack traces ใดเกิดซ้ำ | exception grouping |
| Profiles | code ใช้ CPU/memory ตรงไหน | profiling workload ที่รองรับ |

### Cloud Monitoring

- Resource metrics และ service metrics
- Dashboards สำหรับดูภาพรวมและแนวโน้ม
- Alert policies ผูก condition กับ notification channel
- Uptime checks ตรวจ endpoint จากภายนอกตาม configuration
- SLI/SLO ใช้กำหนดระดับ reliability ที่ผู้ใช้สัมผัสได้
- Multi-project monitoring scope ช่วยดู metrics ข้าม projects ตาม permissions/configuration

Alert ควรมี action ผู้รับผิดชอบและ runbook; threshold ที่ alert ถี่แต่ไม่มีผลกระทบผู้ใช้ทำให้ alert fatigue

### Cloud Logging และ Audit Logs

- Application/system logs ใช้ไล่เหตุการณ์
- Admin Activity audit logs บันทึกการเปลี่ยนแปลงการดูแล resource ตามบริการ
- Data Access logs บันทึกการเข้าถึงข้อมูลบางชนิดและอาจต้อง enable/มี cost/volume implications
- Log router, sinks และ log buckets ใช้ route/เก็บ logs ตาม retention และ access needs
- ใช้ Logs Explorer filter ด้วย resource, severity, timestamp, labels และ trace fields

อย่าเก็บ passwords, access tokens หรือ secret payload ใน application logs อย่าคิดว่า “ไม่เห็น log” แปลว่าไม่มีเหตุการณ์: ตรวจ sink/filter/exclusion, retention, permission และ audit-log type ที่เปิดไว้

## 6. แบบฝึกประกบ Labs ของ course

แล็บใน Google Skills ใช้ project/credentials ที่ระบบจัดให้; ทำ checkpoint และ grader ในหน้า lab เอง ห้ามใช้ credentials ชั่วคราวกับ project ส่วนตัว

### Lab A — Exploring IAM

- ตรวจ principal และ project ปัจจุบัน
- ดู policy และแยก predefined role กับ permission
- ให้สิทธิ์ตามโจทย์ course ใน scope ที่ระบุ
- ตรวจผลด้วย account/principal ที่โจทย์กำหนด
- ลบ/คืนสิทธิ์ที่เพิ่มเมื่อ lab instructions สั่ง

ฝึกคิดเพิ่ม: principal เป็น SA ของ VM และต้องอ่าน bucket — role ควรผูกกับ SA ที่ใช้ runtime ที่ bucket/resource scope ใด?

### Lab B — Cloud Storage buckets and encryption

- สร้าง bucket ด้วย location/storage class ตามโจทย์
- ตรวจ object listing, IAM access และ uniform bucket-level access
- ทดลอง encryption option ที่ lab เปิดให้ และตรวจ key resource/permissions
- ตรวจว่า download/upload ทำได้ด้วย principal ถูกตัว
- เปรียบเทียบ Google-managed key กับ customer-managed key และเหตุที่ key access failure ทำให้ object ใช้ไม่ได้

อย่าคัดลอก key หรือ temporary credentials ลงโน้ต/terminal history

### Lab C — Configure Cloud SQL

- สร้าง database instance ด้วย engine/region/availability ที่ lab ระบุ
- ตั้ง database/user และ network access ตามโจทย์
- เชื่อมต่อจาก client ที่อนุญาต ตรวจ connection และ query
- แยก Cloud SQL instance connectivity ออกจาก database-level authentication
- ตรวจ backup/HA setting ที่ทำใน lab โดยไม่ตีความว่าเป็น production DR ครบแล้ว

### Lab D — Examine billing data with BigQuery

- เลือก billing export dataset และ table ที่ lab เตรียม
- ตรวจ schema ก่อน query
- aggregate cost ตาม project/service/SKU/time
- อธิบาย gross cost, credits และการ refresh/export timing ตาม schema
- บันทึก query ที่ไม่เผยข้อมูล account/credentials

### Lab E — Monitor resources with Google Cloud Observability

- สร้าง/เปิดดู dashboard และเลือก metrics ของ resource
- สร้าง uptime check หรือ alert ตามโจทย์
- เปิด Logs Explorer และค้นหา event ตาม resource/severity/time
- แยก metric anomaly, application log และ audit event
- ตรวจ notification channel และเกณฑ์การเตือน

ใน project ส่วนตัว การเปิด resource/เก็บ logs/สร้าง database มีค่าใช้จ่ายได้ ให้ทดลองใน lab project ตาม session ก่อนและตรวจ cleanup

## 7. Troubleshooting: อย่าแก้ permission หรือเพิ่ม monitoring แบบเดาสุ่ม

| อาการ | จุดเริ่มตรวจ |
|---|---|
| IAM 403 | principal, missing permission, resource scope, inherited/deny/org policy |
| SA ใช้ key/API ไม่ได้ | runtime identity, attached SA, IAM grant, API enabled, key use restrictions |
| Object access denied | bucket/object IAM, public access prevention, CMEK permission, principal |
| Cloud SQL connect timeout | IP path, private/public config, authorized network, firewall, DNS |
| Cloud SQL authentication failed | username/password/IAM DB auth, database, TLS/client config |
| Billing table ว่าง | export configuration, correct billing account/dataset, permissions, export delay |
| Dashboard ไม่มี data | monitored project/scope, metric availability, time range, IAM |
| Alert ไม่ส่ง | condition, notification channel, channel verification, policy state, incident timing |
| ไม่เห็น Data Access log | log type/enablement, service support, permission, exclusions, query window |

## 8. เช็กความเข้าใจ

1. IAM binding ประกอบด้วยองค์ประกอบหลักใด และ inheritance ส่งผลอย่างไร?
2. ทำไมการ grant Editor เพื่อแก้ 403 จึงมักเป็นวิธีที่กว้างเกินไป?
3. CMEK เพิ่ม control อะไร และมี operational risk อะไร?
4. Cloud Storage ต่างจาก Filestore อย่างไร?
5. HA ของ Cloud SQL เท่ากับ backup/DR หรือไม่?
6. Billing export กับ budget alert ตอบคำถามคนละแบบอย่างไร?
7. Metrics, logs และ traces ต่างกันอย่างไร?
8. ทำไมการเปิด Data Access audit logs ต้องคิดเรื่อง volume/cost และ access policy?

**เฉลยย่อ:** IAM binding ผูก principal-role-resource; parent policy อาจสืบทอด; ใช้ least privilege/predefined role; CMEK ให้ควบคุม key lifecycle แต่ key outage ทำให้ data access ล้ม; object store vs shared filesystem; HA ไม่ใช่ backup/DR; export ใช้วิเคราะห์ usage/cost ย้อนหลัง ส่วน budget alert เตือน; metrics เป็นตัวเลข, logs เป็น event, traces เป็นเส้นทาง request; data access logs อาจมี volume สูงและข้อมูลอ่อนไหว ต้องกำหนด retention/permissions

## แหล่งอ้างอิง

- [Activity 04 — Core Services ใน ACE Path](https://www.skills.google/paths/11/course_templates/49)
- [Course syllabus by Google Cloud Training](https://www.coursera.org/learn/gcp-infrastructure-core-services)
- [Exploring IAM](https://cloud.google.com/iam/docs/overview)
- [IAM best practices](https://cloud.google.com/iam/docs/using-iam-securely)
- [Cloud Storage encryption](https://cloud.google.com/storage/docs/encryption)
- [Cloud Storage classes](https://cloud.google.com/storage/docs/storage-classes)
- [Cloud SQL overview](https://cloud.google.com/sql/docs/introduction)
- [Cloud Billing export to BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery)
- [Cloud Monitoring overview](https://cloud.google.com/monitoring/docs/monitoring-overview)
- [Cloud Logging overview](https://cloud.google.com/logging/docs/overview)
