# ACE Cheat Sheet — ทบทวนเร็วพร้อมเหตุผล

[สารบัญ](./README.md) · [สถานการณ์ฝึกคิด](./EXAM-SCENARIOS.md)

Cheat Sheet ใช้หลังอ่านบทละเอียด ไม่ใช้ keyword เป็นกฎตายตัว อ่าน protocol, scope, availability, access และ cost constraints ของโจทย์ร่วมกัน

## 1. ก่อนทำทุกคำสั่ง

```bash
gcloud auth list
gcloud config list
gcloud config get-value project
kubectl config current-context
```

รู้ว่า **ใคร → project/cluster ไหน → location ไหน → action อะไร** แล้วจึงรันคำสั่งที่เปลี่ยน resource

## 2. Compute choices

| Requirement | เริ่มพิจารณา | เหตุผล |
|---|---|---|
| ต้อง admin OS / Windows legacy | Compute Engine | OS control |
| ต้อง Kubernetes API/ecosystem | GKE | orchestration model |
| Stateless HTTP container ทีมเล็ก | Cloud Run | ลด node/OS operations |
| Batch ทำจนจบ | Cloud Run jobs / batch compute ตามโจทย์ | task lifecycle |
| Function ตอบ event | Cloud Run functions + Eventarc/Pub/Sub ตาม trigger | event handler |
| Batch retry ได้และหยุดได้ | Spot VMs | ใช้ interruptible capacity |

MIG autoscaling เพิ่ม/ลดจำนวนเครื่อง Autohealing แทนเครื่องเสีย LB กระจาย traffic คนละหน้าที่

## 3. IAM

| คำถาม | ตรวจ |
|---|---|
| User denied | active identity, role/permission, resource scope, condition/deny |
| Deploy ผ่านแต่ app denied | runtime SA data permissions |
| Attach SA ไม่ได้ | `actAs` ของ deployer และ resource create permissions |
| Impersonate denied | caller Token Creator/permission บน SA |
| Impersonate แล้ว data denied | SA role บน data resource |
| ลบ project role แล้วสิทธิ์ยังอยู่ | inherited binding จาก ancestor |

Predefined role ตรงงาน → ใช้ก่อน custom role ถ้าเหมาะ Basic Editor/Owner ไม่ใช่ default ของทุก workload

คนจาก external IdP → Workforce Federation; workload นอก cloud → Workload Federation; Pod → GKE workload identity

## 4. Network

| สิ่ง | จำให้ตรง |
|---|---|
| VPC | Global |
| Subnet | Regional |
| VM | Zonal |
| Public NAT | private resources ออก public internet; ไม่เปิด inbound ใหม่ |
| Private Google Access | เข้าถึง Google APIs/services ที่รองรับ; ไม่ใช่ internet NAT ทั้งหมด |
| IAP | authorized tunnel path; ยังต้อง firewall และ OS auth |
| Shared VPC | host network ให้ service projects ใช้ |
| Peering | เชื่อม VPC แยกกัน; ไม่ transitive อัตโนมัติ |
| VPN/Interconnect | hybrid connection ตาม requirements |
| Cloud DNS | name resolution; ไม่สร้าง route/firewall เอง |

Firewall กับ route กับ process listener เป็น 3 เงื่อนไขต่างกัน Labels ไม่ใช่ network tags/secure tags

## 5. Load balancer

HTTP/HTTPS host/path → Application LB; TCP proxy → proxy network family; TCP/UDP passthrough → passthrough family ตาม variant ที่รองรับ

ดู internal/external และ regional/global/cross-region ก่อนเลือก Network Service Tier ไม่ใช่ CPU tier

Backend unhealthy → ตรวจ app/probe port, firewall source ของ LB variant และ health purpose ไม่เปิดทุก port เพื่อแก้

## 6. Storage / protection

| Requirement | ตัวเลือกเริ่มต้น |
|---|---|
| VM block disk | Persistent Disk / Hyperdisk ตาม support |
| Scratch ที่สูญหายได้ | Local SSD |
| Objects/media/backup | Cloud Storage |
| Shared NFS | Filestore ตาม requirement |
| Enterprise file protocols/features | NetApp Volumes ตาม support |
| HPC parallel filesystem | Managed Lustre ตาม support |

| Class | Minimum duration |
|---|---:|
| Standard | ไม่มี minimum แบบ cold classes |
| Nearline | 30 วัน |
| Coldline | 90 วัน |
| Archive | 365 วัน |

Cloud Storage cold classes ยัง online access ได้ ต้องคิด retrieval/operation/early deletion costs

Lifecycle = automatic actions ตามเงื่อนไข; Versioning = noncurrent generations; Soft delete = recovery window; Retention = deletion constraint; Backup = recovery copy/workflow แยกตามเหตุที่ป้องกัน

## 7. Data services

| โจทย์หลัก | เริ่มเลือก |
|---|---|
| MySQL/PostgreSQL/SQL Server managed app DB | Cloud SQL |
| PostgreSQL-compatible requirement ตรง AlloyDB | AlloyDB |
| Distributed relational transactions | Spanner |
| Document app model | Firestore |
| Wide-column/keyed high throughput | Bigtable |
| SQL analytics/data warehouse | BigQuery |
| Cache/session | Memorystore ตาม product |
| Messaging | Pub/Sub / Managed Kafka ตาม APIs/semantics |
| Stream/batch processing | Dataflow |

Cloud SQL ไม่ใช่ managed Oracle; HA ไม่ใช่ backup; read replica ไม่ใช่ automatic failover ทุกแบบ; BigQuery `LIMIT` ไม่รับประกันลด bytes scanned

## 8. Kubernetes

Deployment → desired replicas/release; Service → stable endpoint/selector; StatefulSet → stable identity/state pattern; PVC → persistent storage request

| อาการ | ตรวจหลัก |
|---|---|
| Pending | events, requests, nodes, quota, taints/affinity, PVC |
| ImagePullBackOff | image/registry/node identity/network |
| CrashLoopBackOff | logs/config/startup/dependencies |
| OOMKilled | memory profile/limits/leak |
| Running not Ready | readiness probe/app |
| Service no endpoints | selector/readiness/namespace |

HPA = replicas; VPA = resource requests/recommendations ตาม mode; node autoscaling = nodes; Autopilot managed infra ยังต้องตั้ง workload resources

## 9. Cloud Run

Service มี revisions; deploy revision ใหม่ไม่เท่ากับส่ง 100% traffic เสมอ; `--no-traffic` ใช้ตรวจรุ่นก่อน rollout

Invoker identity, ingress path และ runtime SA เป็นคนละเงื่อนไข App ต้อง listen ตาม container contract และไม่ใช้ local filesystem เป็น shared business database

Concurrency/max instances ต้องสอดคล้องกับ DB pool: app instances × pool max เป็นตัวอย่าง upper-demand estimate ไม่ใช่ค่า connection limit ของ platform ที่รับประกันตายตัว

Events อาจซ้ำ → idempotency/retry/dead-letter strategy ตาม delivery contract

## 10. Observability

Metrics = จำนวน/แนวโน้ม; logs = events; traces = request path latency; audit = identity/API actions

CPU ต่ำไม่ได้ปฏิเสธ pool/query/network/storage latency problems Ops Agent ช่วย guest telemetry ตาม support ไม่ใช่ business instrumentation ทุกอย่าง

Sink ต้อง destination writer permissions; VPC Flow Logs เป็น sampled/aggregated flow telemetry ไม่ใช่ packet capture/Audit Log ทุกชนิด

## 11. IaC

`init → fmt/validate → plan → review → apply → verify`

State ผูก config addresses กับ real resources ไม่ใช่ data backup Remote backend/locking ช่วยทีม แต่ไม่ห้าม Console drift ต้องคุม ownership/changes

Saved plans/state อาจ sensitive อย่า commit; IAM policy/binding/member resources มี authoritative/additive behavior ต่างกัน อ่าน provider docs

## 12. Billing และหัวข้อใหม่

- Alerts-only budget: แจ้งเตือน ไม่หยุดใช้จ่าย
- Spend cap Preview: single project/service ที่ eligible; enforcement ไม่ทันที และ persistent compute/storage charges ไม่หยุดทั้งหมด
- Quota มีไม่ได้แปลว่า capacity มี
- AI recommendations ต้องตรวจหลักฐาน/scope/cost
- Asset Inventory = resource metadata; App Hub = application registry/model; Cloud Hub = operations view
- CMEK = encryption key control สำหรับบริการที่รองรับ ไม่แทน IAM/backup

## 13. AWS → Google Cloud: จับคู่แบบมีเงื่อนไข

| ความคุ้นเคย AWS | Google Cloud ที่เทียบแนวคิดได้ | จุดที่อย่าเหมารวม |
|---|---|---|
| EC2 | Compute Engine | machine families/maintenance/identity ต่าง |
| ASG | MIG + autoscaler | config/update/health semantics ต่าง |
| S3 | Cloud Storage | class/location/retention/access model ต่าง |
| EBS | Persistent Disk / Hyperdisk | scope/features/performance ไม่เหมือนทุกชนิด |
| EKS | GKE | Autopilot/Standard และ identity ต่าง |
| RDS | Cloud SQL สำหรับ engines ที่รองรับ | Cloud SQL ไม่รองรับ Oracle แบบ RDS Oracle |
| Redshift | BigQuery ในโจทย์ analytics | deployment/pricing/architecture ต่าง |
| Lambda | Cloud Run functions ในโจทย์ functions | trigger/generation/runtime model ต่าง |
| CloudWatch | Monitoring + Logging และบริการที่เกี่ยวข้อง | ไม่ใช่ 1 product mapping สมบูรณ์ |
| CloudTrail | Cloud Audit Logs | enablement/data access/retention แตกต่าง |
| IAM role for workload | Service account + identity mechanism | policy/attachment model คนละระบบ |
| CloudFormation | Terraform / tooling ที่ Google รองรับ | engine/state/lifecycle ต่าง |

## อ่านต่อ

ใช้แหล่งอ้างอิงใน [แต่ละ Module](./README.md) และ [current exam guide](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf) เมื่อพบ feature/คำศัพท์ใหม่ ไม่ถือว่า mapping table แทน documentation
