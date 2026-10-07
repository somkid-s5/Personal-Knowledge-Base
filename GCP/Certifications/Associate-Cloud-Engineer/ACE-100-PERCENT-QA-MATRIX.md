# ACE 100% QA Matrix — Non-Lab Completeness

[กลับ README](./README.md) · [Exam Map](./LEARNING-PATH.md) · [Visual Study Guide](./VISUAL-STUDY-GUIDE-TH.md) · [Modern Objectives Deep Dive](./ACE-MODERN-OBJECTIVES-DEEP-DIVE-TH.md)

> ตรวจล่าสุด: **7 ตุลาคม 2026**  
> Source of truth: [Standard Associate Cloud Engineer Exam Guide — English](https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf) ที่หน้า Certification ทางการลิงก์อยู่ และ [Google Skills ACE Learning Path](https://www.skills.google/paths/11) ซึ่งแสดง 17 activities ณ วันที่ตรวจ  
> **Official labs / grader ไม่รวมในคะแนน 100%** เพราะทำใน Google Skills โดยตรงตามแผนของผู้เรียน

## 0. คำว่า “100%” ใน repo นี้หมายถึงอะไร

ไม่ใช้คำว่า 100% เพื่อหมายถึง “รู้ทุกอย่างเกี่ยวกับ Google Cloud” หรือ “รับประกันข้อสอบผ่าน” แต่หมายถึง **100% non-lab coverage ของ scope ทางการที่ตรวจได้ ณ วันที่ด้านบน** ตามเกณฑ์นี้:

1. ทุก objective ใน Standard Exam Guide ต้อง map ไปยังบทอธิบายที่อ่านได้จริง ไม่ใช่มีเพียงชื่อหัวข้อ
2. ทุก activity ใน Google Skills Path ต้องมีโน้ตภาษาไทยหรือ crosswalk ที่ชัดเจน
3. หัวข้อที่ต้องตัดสินใจเลือกบริการต้องมี **When / Why / Tradeoff / ไม่ควรเลือกเมื่อไร**
4. หัวข้อ operation ต้องมี **วิธีตรวจผล / failure pattern / troubleshooting path** อย่างน้อยใน Module, Activity หรือ Deep Dive ที่เกี่ยวข้อง
5. หัวข้อที่เข้าใจง่ายขึ้นด้วยภาพต้องมี **Mermaid / flow / decision map / architecture map** ใน Module, Activity หรือ Visual Study Guide
6. คำสั่งหรือ workflow ที่มีผลต่อ resource ต้องมีบริบทเรื่อง scope, IAM, cost, verification หรือ cleanup ตามความเหมาะสม
7. ชื่อบริการใหม่/เปลี่ยนชื่อใน Exam Guide ต้องมีคำอธิบายเชื่อมกับชื่อเดิมเมื่อจำเป็น
8. ข้อมูลที่เปลี่ยนเร็ว เช่น ราคา รุ่น accelerator, availability, quota หรือ product lifecycle ต้องชี้กลับไป current docs แทนการฝังค่าที่อาจล้าสมัย

สถานะที่ใช้:

- **PASS** = ครบตามเกณฑ์ non-lab ข้างต้น
- **OFFICIAL LAB** = เนื้อหาทฤษฎี/mental model ครบ แต่การพิสูจน์ hands-on ให้ทำใน Google Skills
- **N/A** = เกณฑ์ visual หรือ operation ไม่ได้เพิ่มคุณค่าอย่างมีนัยสำคัญกับ objective นั้น

---

# 1. Section 1 — Setting up a cloud solution environment (~20%)

## 1.1 Setting up cloud projects and accounts

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Creating a resource hierarchy | Module 01 — organization/folder/project, inheritance, scope | Visual Guide: Resource Hierarchy | **PASS** |
| Applying organizational policies to the resource hierarchy | Module 01 — org policy vs IAM, inheritance/effective policy | hierarchy + policy mental model | **PASS** |
| Granting members IAM roles within a project | Module 02 — principal/role/resource/binding, least privilege | IAM decision flow | **PASS** |
| Managing users and groups in Cloud Identity manually and automated | Module 01/02 — identity administration vs cloud authorization, groups | identity boundary explanation | **PASS** |
| Enabling APIs within projects | Module 01/03 — API enablement, service identities, project context | Console/gcloud/API flow | **PASS** |
| Provisioning and setting up Google Cloud Observability products | Module 11 + Activity 13 — Monitoring, Logging, Ops Agent, alerting | Observability signal map | **PASS** |
| Assessing quotas and requesting increases | Module 03 — quota vs capacity vs billing, diagnostics | quota troubleshooting decision flow | **PASS** |
| Setting up standalone organizations | Module 01 — standalone organization purpose/eligibility/current constraints | resource hierarchy context | **PASS** |
| Setting up cloud networking | Module 04 — VPC/subnet/routes/firewall/NAT/DNS | packet path + VPC map | **PASS** |
| Verifying product availability across regions/zones | Module 01/03/05/13 — scope, location, quota/capacity/accelerator availability | location decision model | **PASS** |
| Configuring Cloud Asset Inventory and using Gemini Cloud Assist to analyze resources | Module 13 + Modern Deep Dive #2–3 | Asset Inventory + AI verification flows | **PASS** |
| Configuring Workforce Identity Federation | Module 02 + Modern Deep Dive #4 | federation decision + STS/trust flow | **PASS** |

## 1.2 Managing billing configuration

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Creating one or more billing accounts | Module 03 — billing account vs project/resource | Billing flow | **PASS** |
| Linking projects to a billing account | Module 03 — billing attribution/context | Billing → Project map | **PASS** |
| Establishing billing budgets and alerts | Module 03 — budget alert is not a hard stop, notification/remediation model | budget decision flow | **PASS** |
| Setting up billing exports | Module 03 / Activity 04 — export to BigQuery and analysis context | billing export data path | **PASS** |

**Section 1 result: 16/16 objectives PASS.**

---

# 2. Section 2 — Planning and implementing a cloud solution (~30%)

## 2.1 Planning and implementing compute resources

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Selecting compute: Compute Engine, GKE, Cloud Run, Cloud Run functions, Agent Runtime | Modules 05, 08, 09, 13 + Modern Deep Dive | compute/deployment decision maps | **PASS** |
| Launching a compute instance incl. availability policy / SSH keys | Module 05 + Activity 03 | VM lifecycle/access flow | **PASS** |
| Choosing zonal PD, regional PD, Hyperdisk | Modules 05/06 | block-storage decision map | **PASS** |
| Creating autoscaled MIG with instance template | Module 05 | Template → MIG → LB/autoscaling map | **PASS** |
| Configuring OS Login | Modules 02/05 | identity → OS access model | **PASS** |
| Configuring VM Manager | Module 05 — inventory/patch/OS policies + prerequisites | ops workflow | **PASS** |
| Using Spot VMs and custom machine types | Module 05 — interruption/cost/fit tradeoffs | decision table | **PASS** |
| Installing/configuring kubectl | Module 08 + Activity 06/16 | GKE admin flow | **PASS** |
| Deploying GKE Autopilot/regional/private clusters | Module 08 + Activity 06 | cluster architecture + Standard vs Autopilot | **PASS** |
| Deploying containerized app to GKE | Module 08 + Activity 16 | image → registry → deployment → service | **PASS** |
| Deploying serverless apps/events via Pub/Sub/Storage/Eventarc | Module 09 + Activities 07/08 | Cloud Run/Eventarc/PubSub flow | **PASS** |
| Identifying whether to use GPUs or TPUs | Module 13 + Activities 10/11 | GPU vs TPU decision tree | **PASS** |

## 2.2 Planning and implementing storage and data solutions

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Choosing/deploying Cloud SQL, BigQuery, Firestore, Spanner, Bigtable, AlloyDB, Dataflow, Pub/Sub, Managed Kafka, Memorystore | Module 07 + Activity 09 + Modern Deep Dive | database/data-service selection map | **PASS** |
| Choosing/deploying Cloud Storage, Filestore, NetApp Volumes, Managed Lustre and storage classes | Module 06 | Object vs Block vs File + class decision map | **PASS** |
| Loading data via CLI, Cloud Storage, Storage Transfer Service | Modules 06/07 | load/transfer workflow | **PASS** |
| Maintaining multi-region redundancy across data solutions | Modules 06/07/10 — redundancy vs backup/DR distinctions | region/redundancy mental model | **PASS** |

## 2.3 Planning and implementing networking resources

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Creating custom VPC, Shared VPC, VPC Peering | Modules 04/10 | VPC + Shared VPC/Peering maps | **PASS** |
| VPC firewall rules and Cloud NGFW ingress/egress policies | Module 04 + Modern Deep Dive #6 | policy/rule evaluation flow | **PASS** |
| Using secure Tags and service accounts in NGFW rules | Modern Deep Dive #6 | target/tag/service-account decision | **PASS** |
| Connectivity: Cloud VPN, VPC Peering, Interconnect | Module 10 | hybrid connectivity decision map | **PASS** |
| Choosing/deploying load balancers | Module 10 + Activity 15 | frontend → proxy → URL map → backend chain | **PASS** |
| Differentiating Network Service Tiers | Module 10 | comparison/tradeoff explanation | **PASS** |

## 2.4 Planning and implementing resources using tooling

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Fabric FAST | Module 12 + Modern Deep Dive #7 | foundation automation map | **PASS** |
| Config Connector | Module 12 + Modern Deep Dive #8 | CRD → controller → GCP reconciliation | **PASS** |
| Terraform | Module 12 + Activities 14/17 | config/state/plan/apply/import maps | **PASS** |
| Helm | Module 12 + Modern Deep Dive #9 | values → chart → rendered manifests | **PASS** |
| Gemini CLI | Module 13 + Modern Deep Dive #10 | AI output → review → test → deploy | **PASS** |
| Google Antigravity | Module 13 + Modern Deep Dive #10 | AI-assisted implementation control loop | **PASS** |
| Gemini Cloud Assist | Module 13 + Modern Deep Dive #3/#10 | evidence-based AI workflow | **PASS** |
| Application Design Center | Module 13 + Modern Deep Dive #10 | generated architecture/config review flow | **PASS** |

**Section 2 result: 30/30 objective lines PASS.**

---

# 3. Section 3 — Ensuring successful operation of a cloud solution (~30%)

## 3.1 Managing compute resources

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Remotely connecting to Compute Engine | Module 05 / Activity 03 | SSH/IAP/OS Login access path | **PASS** |
| Viewing running Compute Engine inventory | Modules 03/05 | gcloud/Console inspection workflow | **PASS** |
| Snapshots/images incl. scheduled snapshots | Module 05 | recovery/image/snapshot comparison | **PASS** |
| Viewing GKE nodes/Pods/Services inventory | Module 08 | kubectl inspection flow | **PASS** |
| Configuring GKE access to Artifact Registry | Module 08 + Activity 16 | image pull identity flow | **PASS** |
| Managing GKE node pools incl. autoscaling | Module 08 | workload vs node scaling levels | **PASS** |
| Working with Pods/Services/StatefulSets | Module 08 | object topology + StatefulSet/persistence model | **PASS** |
| Managing HPA/VPA | Module 08 | scaling-level comparison | **PASS** |
| Managing Autopilot Pod resource requests | Module 08 | requests/scheduling/cost explanation | **PASS** |
| Deploying new Cloud Run versions | Module 09 | Service → Revisions | **PASS** |
| Traffic splitting: Cloud Run/functions/GKE | Modules 08/09 + Activities 07/08 | rollout/canary maps | **PASS** |
| Cloud Run autoscaling | Module 09 | concurrency/min/max/downstream capacity | **PASS** |
| Attaching GPUs/TPUs | Module 13 + Activities 10/11/12 | accelerator lifecycle + failure diagnostics | **PASS** |
| Deploying agent to Agent Runtime | Module 13 + Modern Deep Dive #11 | Agent Runtime architecture and identity/tool/data flow | **PASS** |
| Managing Workbench and BigQuery notebooks | Module 13 + Modern Deep Dive #12 | notebook lifecycle/IAM/data/cost model | **PASS** |
| Managing Cloud Workstations | Module 13 + Modern Deep Dive #13 | developer → workstation → VPC/API flow | **PASS** |

## 3.2 Managing storage and data solutions

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Managing/securing Cloud Storage objects | Module 06 | IAM/UBLA/PAP/signed URL/recovery | **PASS** |
| Object lifecycle policies | Module 06 | lifecycle/version/soft-delete/retention map | **PASS** |
| Querying Cloud SQL, BigQuery, Bigtable, Spanner, Firestore, AlloyDB | Module 07 | query/access-pattern distinctions | **PASS** |
| Estimating data storage cost | Modules 03/06/07 | storage + operation + retrieval + transfer model | **PASS** |
| Backup/restore Cloud SQL, Firestore, Spanner, AlloyDB, Bigtable | Module 07 + Modern Deep Dive | HA vs replica vs backup/PITR/recovery model | **PASS** |
| Reviewing Dataflow/BigQuery job status | Module 07 | job/status/error operational workflow | **PASS** |
| Database Center | Module 13 + Modern Deep Dive #14 | fleet → health/recommendation → engine follow-up | **PASS** |
| CMEK | Modules 06/13 + Modern Deep Dive #15 | service identity → KMS key flow | **PASS** |

## 3.3 Managing networking resources

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Resizing subnet IPv4 range | Module 04 | CIDR/subnet planning + constraints | **PASS** |
| Reserving static external/internal IPs | Modules 04/10 | endpoint/address lifecycle | **PASS** |
| Adding custom static routes | Modules 04/10 | route vs firewall path | **PASS** |
| Using Cloud DNS and Cloud NAT | Module 04 | DNS + NAT packet path | **PASS** |
| Managing VPC firewall rules and Cloud NGFW | Module 04 + Modern Deep Dive | firewall debug order | **PASS** |

## 3.4 Monitoring and logging

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Cloud Monitoring metric alerts | Module 11 + Activity 13 | signal → condition → notification/runbook | **PASS** |
| Custom metrics ingestion | Module 11 | custom/log-based metrics + cardinality | **PASS** |
| VPC Flow Logs / audit logs / firewall logs | Module 11 | telemetry-type comparison | **PASS** |
| Exporting logs to external/on-prem/BigQuery | Module 11 | Log Router/sink/destination identity flow | **PASS** |
| Log buckets / Log Analytics / Log Router | Module 11 | routing/storage/query model | **PASS** |
| Viewing/filtering logs | Module 11 + Activity 13 | Logs Explorer/CLI examples | **PASS** |
| Viewing specific log entry details | Module 11 | filter/time/resource/event context | **PASS** |
| Trace / Profiler / Query Insights / index advisor | Module 11 | diagnostics tool selection | **PASS** |
| Personalized Service Health | Module 11/13 + Modern Deep Dive | provider-health check in incident flow | **PASS** |
| Ops Agent | Module 11 | agent prerequisites/integration/VM boundary | **PASS** |
| Managed Service for Prometheus | Module 11 + Modern Deep Dive | Prometheus metrics path and use case | **PASS** |
| Gemini Cloud Assist for Monitoring | Module 13 + Modern Deep Dive | AI suggestion → evidence verification | **PASS** |
| Active Assist | Modules 11/13 + Modern Deep Dive | recommendation → workload-context review | **PASS** |
| Cloud Hub | Modules 11/13 + Modern Deep Dive | application/event health aggregation model | **PASS** |

**Section 3 result: 43/43 objective lines PASS.**

---

# 4. Section 4 — Configuring access and security (~20%)

## 4.1 Managing IAM

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Viewing/creating IAM policies | Module 02 | principal + role + resource + condition/policy model | **PASS** |
| Role attachment and inheritance in Organization hierarchy | Modules 01/02 | hierarchy/IAM inheritance visual | **PASS** |
| Basic/predefined/custom roles | Module 02 | role-selection/least-privilege explanation | **PASS** |

## 4.2 Managing service accounts

| Official objective | เนื้อหาหลัก | Visual / Ops evidence | Status |
|---|---|---|---|
| Creating service accounts incl. Google-managed SAs | Module 02 | user-managed vs service agent distinction | **PASS** |
| Least-privilege SA policies | Module 02 | runtime identity decision flow | **PASS** |
| Assigning SAs to resources | Modules 02/05/08/09 | VM/GKE/Cloud Run runtime identity examples | **PASS** |
| Managing IAM permissions of a service account | Module 02 | resource access vs access-to-SA separation | **PASS** |
| Service account impersonation | Module 02 + Modern Deep Dive #5 | caller → SA → short-lived credential → API | **PASS** |
| Short-lived SA credentials | Module 02 + Modern Deep Dive #5 | token lifecycle/security reasoning | **PASS** |
| Google Cloud SA with GKE application | Module 08 | Kubernetes SA vs Google SA + WIF for GKE | **PASS** |
| Provisioning Workload Identity Federation | Module 02 + Modern Deep Dive #4 | external workload → federation → IAM → API | **PASS** |

**Section 4 result: 11/11 objective lines PASS.**

---

# 5. Google Skills Path — 17/17 Activity Coverage

| # | Activity | Thai study material | Visual / practice support | Status |
|---:|---|---|---|---|
| 01 | A Tour of Google Cloud Hands-on Labs | Path-Activity-01 | Visual Guide + Modules 01–03 | **PASS + OFFICIAL LAB** |
| 02 | Build a Certification Study Guide: ACE Exam Prep | Path-Activity-02 | Exam Map / Cheat Sheet / Scenarios | **PASS** |
| 03 | Essential Google Cloud Infrastructure: Foundation | Path-Activity-03 | Modules 01/03/04/05 + Visual Guide | **PASS + OFFICIAL LAB** |
| 04 | Essential Google Cloud Infrastructure: Core Services | Path-Activity-04 | IAM/Storage/DB/Billing/Observability visuals | **PASS + OFFICIAL LAB** |
| 05 | Elastic Google Cloud Infrastructure: Scaling and Automation | Path-Activity-05 | LB/Hybrid/Terraform/MIG maps | **PASS + OFFICIAL LAB** |
| 06 | Getting Started with Google Kubernetes Engine | Path-Activity-06 | Module 08 + GKE topology | **PASS + OFFICIAL LAB** |
| 07 | Developing Applications with Cloud Run: Fundamentals | Path-Activity-07 | Module 09 + revision/traffic map | **PASS + OFFICIAL LAB** |
| 08 | Developing Applications with Cloud Run: Functions | Path-Activity-08 | Module 09 + event/retry/idempotency map | **PASS + OFFICIAL LAB** |
| 09 | Select a Google Cloud Database for Your Applications | Path-Activity-09 | Module 07 + database decision tree | **PASS + OFFICIAL LAB** |
| 10 | AI Infrastructure: Cloud GPUs | Path-Activity-10 expanded | GPU workflow + diagnostics + mini-lab | **PASS** |
| 11 | AI Infrastructure: Cloud TPUs | Path-Activity-11 expanded | TPU fit/topology/benchmark maps | **PASS** |
| 12 | AI Infrastructure: Deployment Types | Path-Activity-12 expanded | deployment decision tree | **PASS** |
| 13 | Logging and Monitoring in Google Cloud | Path-Activity-13 expanded | Observability maps/runbook | **PASS + OFFICIAL LAB** |
| 14 | Getting Started with Terraform for Google Cloud | Path-Activity-14 expanded | Terraform graph/state/import maps | **PASS + OFFICIAL LAB** |
| 15 | Implementing Cloud Load Balancing for Compute Engine | Path-Activity-15 expanded | LB component/debug map | **PASS + OFFICIAL LAB** |
| 16 | Deploy Kubernetes Applications on Google Cloud | Path-Activity-16 expanded | image→registry→GKE + troubleshooting | **PASS + OFFICIAL LAB** |
| 17 | Build Infrastructure with Terraform on Google Cloud | Path-Activity-17 expanded | import/state/module workflow | **PASS + OFFICIAL LAB** |

**Learning Path result: 17/17 activities have study coverage. Official grader execution remains in Google Skills by design.**

---

# 6. Teaching-quality QA

| Dimension | Requirement | Evidence | Result |
|---|---|---|---|
| Coverage | Every current Standard Exam Guide objective mapped | Sections 1–4 above | **100% PASS** |
| Concept depth | Purpose + mechanism + decision/tradeoff | Modules 01–13 + Modern Deep Dive | **100% PASS** |
| Operations | Verification/failure/troubleshooting where applicable | Modules 04/05/07/08/09/10/11/12/13 + Activities | **100% PASS** |
| Visual learning | Every major architecture/decision family has a map | VISUAL-STUDY-GUIDE-TH + embedded Mermaid | **100% PASS** |
| Learning Path alignment | 17/17 activities mapped | Path Activity 01–17 + Study Guide | **100% PASS** |
| Review | Cheat Sheet / Glossary / Exam Scenarios | dedicated files | **100% PASS** |
| Hands-on official grader | Performed in Google Skills | intentionally excluded | **OFFICIAL LAB** |

## Visual rule used for 100%

“100% visual” ไม่ได้หมายถึงต้องมีภาพทุกย่อหน้า แต่หมายถึง **ทุก concept family ที่การเห็นความสัมพันธ์ช่วยให้เข้าใจเร็วกว่า text มี visual อย่างน้อยหนึ่งตัว** เช่น hierarchy/IAM, packet path, compute/MIG, storage decision, database selection, GKE topology, Cloud Run revisions/events, load balancing/hybrid, observability, Terraform state, accelerator/deployment, modern identity/security/tooling

Screenshot ของ Console ไม่บังคับทุกบทเพราะ UI เปลี่ยนเร็วและทำให้โน้ตแก่เร็วกว่า architecture/flow ที่เป็น mental model; screenshot ใช้เฉพาะเมื่อ navigation/UI เป็น learning objective จริง

---

# 7. Final status

**NON-LAB ACE STUDY COVERAGE: 100% PASS — as of 2026-10-06**

ขอบเขตของคำประกาศนี้คือ:

- current English Standard ACE Exam Guide ที่หน้า Certification ทางการลิงก์อยู่
- current Google Skills ACE path 17 activities
- theory / decision making / operation / troubleshooting / visual mental models
- ไม่รวมการรัน official lab/grader จริง
- ไม่รับประกันคำถามสอบจริงหรือ product changes ในอนาคต

หาก Google แก้ Exam Guide หรือ Learning Path หลังวันที่นี้ ให้ถือ matrix นี้เป็น baseline แล้ว re-audit diff ก่อนเรียก 100% ต่อไป
