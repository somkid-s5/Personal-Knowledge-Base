# Chapter 2.1 — Planning and implementing compute resources

> **Editorial status: DRAFT**, not independently verified. Exam blueprint: 30 June 2026, checked 30 October 2026. Official Google Cloud documentation is cited per concept. Commands are examples for an authorized test project; no deployment was executed. Architecture diagrams are pending the user's custom Diagram Design Skill, which is not available here.

## 1. Objective coverage

This chapter follows **section 2.1** of the [official ACE guide](https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf), exactly **12 considerations** (IDs follow [coverage matrix](../coverage-matrix.md)).

| ID | Requirement | Where taught |
|---|---|---|
| 2.1.01 | Select compute choices: Compute Engine, GKE, Cloud Run, Cloud Run functions, Agent Runtime | 3.1, 4 |
| 2.1.02 | Launch VM, availability policy and SSH keys | 3.2, 5 |
| 2.1.03 | Choose zonal/regional Persistent Disk and Hyperdisk | 3.3 |
| 2.1.04 | Create autoscaled MIG using instance template | 3.4, 5 |
| 2.1.05 | Configure OS Login | 3.2, 5 |
| 2.1.06 | Configure VM Manager | 3.5 |
| 2.1.07 | Use Spot VMs and custom machine types | 3.6 |
| 2.1.08 | Install/configure kubectl | 3.7, 5 |
| 2.1.09 | Deploy Autopilot, regional, private GKE clusters | 3.7 |
| 2.1.10 | Deploy a containerized app on GKE | 3.7, 5 |
| 2.1.11 | Deploy serverless apps for Pub/Sub, Cloud Storage events, Eventarc | 3.8 |
| 2.1.12 | Identify when to use GPUs/TPUs | 3.9 |

## 2. คำศัพท์ก่อนเรียน

| Term | ความหมายที่ต้องแยก |
|---|---|
| VM | เครื่องเสมือนที่ทีมดูแล OS และ runtime |
| Instance template | Configuration สำหรับสร้าง VM ซ้ำ; เมื่อแก้ template ให้สร้าง version ใหม่แล้วเปลี่ยน MIG ที่ใช้อ้างอิง |
| Managed instance group (MIG) | กลุ่ม VM ที่ดูแลจำนวน/ซ่อม/กระจายตามการตั้งค่า |
| Autoscaling | เพิ่มลดจำนวน replicas ตาม load, ไม่ใช่ load balancing |
| Autohealing | ตรวจ health และซ่อมหรือสร้าง instance ใหม่, ไม่ใช่ backup |
| GKE Autopilot | GKE mode ที่ Google ดูแลโหนดและการจัดสรร infrastructure มากขึ้น |
| kubectl | CLI ที่สื่อสาร Kubernetes API ผ่าน kubeconfig/context |
| Cloud Run service | รัน container โดยไม่ต้องจัดการ servers/cluster โดยตรง |
| Cloud Run functions | รูปแบบ function สำหรับ workload ตาม event หรือ request |
| Eventarc | ระบบ route events จากแหล่งต่าง ๆ ไป destination |
| GPU / TPU | Accelerators สำหรับงาน parallel compute / machine learning; ขึ้นกับ framework และ workload |
| Agent Runtime | Managed environment สำหรับ deploy AI agent บน Gemini Enterprise Agent Platform; ไม่ใช่ตัวเลือกทั่วไปแทนเว็บเซิร์ฟเวอร์ |

## 3. Core teaching

### 3.1 เลือก runtime จากระดับการควบคุมที่จำเป็น

คำถามแรกไม่ใช่ “ใช้บริการไหนใหม่ที่สุด” แต่เป็น “ทีมต้องดูแล OS, orchestration, scaling และ networking แค่ไหน?”

- **Compute Engine:** ต้องการ control OS, background service, legacy app, kernel/system packages หรือ custom VM configuration. ทีมต้อง patch OS, เลือก machine type, disks และ availability strategy.
- **MIG บน Compute Engine:** แอปทำงานกับ VM image/template ซ้ำกันได้และอยาก autohealing/autoscaling. หลีกเลี่ยงเก็บ state ใน local disk ของ VM แบบที่สูญหายเมื่อ instance ถูกแทนที่.
- **GKE:** Workload มีหลาย containerized services, ต้องใช้ Kubernetes API, Deployments, Services, policies และ cluster-level capabilities. เพิ่ม operational abstraction ที่ต้องเรียนรู้ ไม่ใช่แค่ทางเลือกที่ถูกกว่าเสมอ.
- **Cloud Run:** Stateless web/API/container jobs แบบ managed, เน้น deployment และ autoscaling โดยไม่จัด cluster. ต้องเข้าใจ concurrency, cold starts, request limits และ permissions; workload บางชนิดไม่เหมาะ.
- **Cloud Run functions:** ฟังก์ชันทำงานตาม event/request โดยไม่ต้องออกแบบ server lifecycle เอง. เหมาะกับ event handling ขนาดเล็กหรือชิ้นงานแยกง่าย; ถ้าต้องการ web application หลาย endpoint อาจเลือก Cloud Run service.
- **Agent Runtime:** สำหรับ deploy และจัดการ AI agent; ตรวจข้อจำกัดและ runtime requirements ก่อนเลือก. อย่าสับสนกับ Cloud Run ทั่วไป.

**Worked case:** บริษัทมี Windows legacy service ที่ต้องใช้ Windows-specific packages และ scheduled job ทำงานยาว → Compute Engine เหมาะกว่า Cloud Run. อีกทีมมี containerized HTTP API รับคำขอแบบ burst และไม่อยากดูแล cluster → Cloud Run เป็นจุดเริ่มประเมิน. ทีม platform มี microservices ที่ต้องใช้ Kubernetes CRDs และ network policies → GKE.

### 3.2 VM, access และ availability

เลือก zone ที่รองรับ machine type/accelerator, network/subnet, image, boot disk, service account และ firewall ก่อนสร้าง VM. VM เป็น **zonal resource** แม้ VPC จะ global และ subnet regional. ตรวจ machine availability และ quota ของ zone/region.

SSH เข้า Linux VM ต้องผ่านทั้งเงื่อนไข network (external IP, IAP หรือ private connectivity), IAM/OS Login หรือ metadata SSH keys และ guest OS. **OS Login** ผูกการจัดการ SSH access เข้ากับ IAM และอาจมีข้อกำหนดเพิ่มเติมเมื่อองค์กรใช้ 2FA; เมื่อเปิด OS Login ระบบจะไม่ใช้ metadata-based SSH keys แบบเดิมสำหรับการเข้าถึงตามปกติ. ให้สิทธิ์เฉพาะที่จำเป็น เช่น roles/compute.osLogin หรือ roles/compute.osAdminLogin ตามหน้าที่.

Availability policy เกี่ยวกับ maintenance/restart/termination behavior ไม่ใช่ replacement สำหรับ multi-zone redundancy. หากต้องการทน zone failure ให้สร้าง architecture ที่เหมาะสม ไม่ใช่แค่เลือก restart on failure.

### 3.3 Storage ที่ติด VM

- **Zonal Persistent Disk:** เหมาะกับ VM/แอปที่มี disk อยู่ใน zone เดียว; durable block storage แต่การล่มของ zone อาจกระทบการเข้าถึง.
- **Regional Persistent Disk:** Replication ระหว่างสอง zones ใน region ที่รองรับ ช่วยเรื่อง zone-level resilience แต่ไม่ได้แทน snapshots/backups และมีเงื่อนไขการ attach/failover.
- **Hyperdisk:** Block storage ที่มีทางเลือกด้าน performance/IOPS/throughput และข้อจำกัดความเข้ากันได้ต่างกันตาม type/machine; ไม่ใช่ชนิดที่ดีที่สุดสำหรับทุก VM.
- **Local SSD:** เหมาะกับ scratch/cache ที่ยอมเสียข้อมูลได้; ไม่ใช่ทางเลือกแทน durable data disk.

คำถามสอบมักให้ constraint เช่น RPO, recovery, IOPS, latency, cost และ zone outage; ต้องเลือก disk ตาม workload ไม่ใช่จำว่าแพงที่สุดดีที่สุด

### 3.4 MIG: จาก template สู่ self-healing/auto-scaling

ลำดับหลักคือ **instance template → managed instance group → autoscaling policy → health check/autohealing (เมื่อเหมาะ)**. Template บอกว่าแต่ละ VM ควรมีอะไร; MIG ดูแลสมาชิกและจำนวน. Autoscaler ดู metric/load และปรับ size; autohealing ดูสุขภาพ instance. Load balancer เป็นอีกหน้าที่หนึ่ง จัดเส้นทาง traffic; ไม่จำเป็นต้องมีทุก MIG.

**Failure scenario:** MIG มี VM 3 ตัว แต่ผู้ใช้ยังเข้า API ไม่ได้: ตรวจ health checks, backend service, firewall allow health-check ranges, application readiness และ routes. การเพิ่มจำนวน VM อย่างเดียวไม่ทำให้ backend healthy.

### 3.5 VM Manager

**VM Manager** ช่วยเรื่อง inventory, OS patch management และ OS configuration/guest policy ตาม supported environments. มี prerequisites เช่น OS Config API, VM service accounts/permissions, agent และ network reachability; อย่าสมมติว่าเปิด API แล้วเห็น patch compliance ทุก VM ทันที. สำหรับข้อสอบ ให้แยกการติดตั้ง/อัปเดตแพ็กเกจด้วย VM Manager ออกจากการ scale VM ด้วย MIG.

### 3.6 Spot VMs และ custom machine types

**Spot VM** เหมาะกับ batch/queue processing ที่ retry ได้และยอมให้ถูก preempted ได้ทุกเมื่อ; ไม่ควรใช้เป็นฐานเดียวของ stateful service ที่ห้ามสะดุด. ลดต้นทุนได้แต่ไม่มี capacity guarantee แบบ VM ทั่วไป. เก็บ checkpoint/output ไปที่ durable storage; ออกแบบ shutdown/retry ให้ดี.

**Custom machine type** ใช้เมื่อ predefined machine size ให้ vCPU/RAM ไม่พอดี แต่ข้อจำกัด ratio/CPU platform/ราคาและ feature compatibility ต้องตรวจตาม series. อย่าสรุปว่า custom ถูกกว่า predefined ทุกกรณี.

### 3.7 GKE: cluster, kubectl และ workload

**Autopilot** ให้ Google จัด node lifecycle/infrastructure ตาม workload declarations มากขึ้น. **Standard** ให้ operator ควบคุม node pools มากกว่า. **Regional cluster** กระจาย control plane และอาจกระจาย nodes ตามการตั้งค่า; เลือกเพื่อเพิ่ม resilience ไม่ใช่เพราะทุก app ต้อง regional. **Private cluster** จำกัด exposure ของ nodes/control plane ตาม network design และต้องมีวิธีเข้าถึง endpoint, Google APIs และ image registry ที่เหมาะสม.

Workflow ที่ต้องจำ: สร้าง cluster → get credentials → ตรวจ context → deploy Kubernetes manifests → inspect Pods, Deployments, Services และ Events. **kubectl context ผิด** อาจเปลี่ยน cluster คนละตัว จึงต้องตรวจด้วย `kubectl config current-context` ก่อน apply.

### 3.8 Serverless deployment และ events

Cloud Run deploy จาก container image ไป service. หากต้องการให้ Cloud Storage upload หรือ Pub/Sub event trigger workload สามารถใช้ **Eventarc** กับ destination ที่รองรับได้; แต่ละ event source อาจต้อง config trigger, filters, IAM ของ trigger identity, Pub/Sub transport และ destination invoker permissions. Event delivery อาจมี retries/duplicates: ออกแบบ handler แบบ **idempotent**.

Worked case: อัปโหลดภาพลง bucket → event → thumbnail worker → เก็บภาพที่แปลงแล้ว. อย่าให้ handler สร้าง event วนลูปจากการเขียนไฟล์ใหม่เข้า bucket เดิมโดยไม่กรองชื่อ/path.

### 3.9 GPU หรือ TPU?

GPU ใช้งานทั่วไปได้กับ parallel workloads และ ML frameworks กว้างกว่า (ขึ้นกับ libraries). TPU เป็น accelerator ที่ออกแบบสำหรับ machine learning tensor operations มี ecosystem/compilation/framework constraints ที่ต้องประเมิน. เลือกจาก model compatibility, software stack, memory, distributed training, availability, quota และ **total cost per completed job** ไม่ใช่ดูราคาต่อชั่วโมงอย่างเดียว. ตรวจ accelerators/machine availability ใน region/zone ก่อนออกแบบ deployment

## 4. Decision matrix

| Scenario | Recommended starting point | Alternative/tradeoff |
|---|---|---|
| Windows legacy app + custom OS dependencies | Compute Engine | Cloud Run ไม่ให้ดูแล Windows VM |
| Stateless API, burst traffic, small operations team | Cloud Run | GKE ถ้าต้องใช้ Kubernetes APIs/policies |
| Multiple Kubernetes microservices requiring controllers | GKE | Cloud Run หากไม่ต้องการ orchestrator |
| Fleet of identical Linux VMs requiring autoscale | MIG | Standalone VMs ต้องดูแล repairs เอง |
| Interruptible image processing | Spot VMs | Standard VM สำหรับงานที่ไม่ยอม interrupt |
| Cross-zone disk continuity for supported VM design | Regional Persistent Disk | Zonal disk ถูกและง่ายกว่าแต่ไม่ replicate ระหว่าง zones |
| AI training with TPU-compatible framework | Evaluate TPU | GPU ถ้า model/toolchain ต้อง CUDA/library ecosystem |
| Event-driven simple handler | Cloud Run functions / Cloud Run + Eventarc | VM daemon ต้องดูแล runtime |
| Deploy/manage AI agents | Agent Runtime | Cloud Run สำหรับ custom agent container เมื่อไม่ต้องการ managed agent runtime |

## 5. Operations workbook: inspect, create, update and cleanup

**Sandbox prerequisites:** authorized GCP project with active billing, required APIs, least-privilege roles, quota and supported location. Commands that create VMs, disks, clusters, load-balancing components or Cloud Run services can incur costs. Replace uppercase placeholders. Examples are *not executed* and illustrative outputs are not real environment results.

```bash
# Confirm identity/project; read-only
gcloud auth list
gcloud config get-value project
gcloud compute zones list
gcloud compute instances list --project=PROJECT_ID

# Example standalone Linux VM; creates a billable VM and boot disk
gcloud compute instances create ace-demo-vm \
  --project=PROJECT_ID --zone=ZONE \
  --machine-type=e2-medium \
  --image-family=debian-12 --image-project=debian-cloud

# Enable OS Login at the instance (requires appropriate permission)
gcloud compute instances add-metadata ace-demo-vm \
  --zone=ZONE --metadata=enable-oslogin=TRUE

# Verify
gcloud compute instances describe ace-demo-vm --zone=ZONE
```

OS Login access additionally requires appropriate IAM role and reachable SSH path. Do not enable public ingress just to make this tutorial work.

```bash
# Create template for homogeneous compute fleet
gcloud compute instance-templates create ace-web-template \
  --machine-type=e2-medium \
  --image-family=debian-12 --image-project=debian-cloud

# MIG: fixed starting size (autoscaling comes next)
gcloud compute instance-groups managed create ace-web-mig \
  --zone=ZONE --template=ace-web-template --size=2

# Enable autoscaling policy on MIG
gcloud compute instance-groups managed set-autoscaling ace-web-mig \
  --zone=ZONE --min-num-replicas=2 --max-num-replicas=5 \
  --target-cpu-utilization=0.6

# Inspect group state
gcloud compute instance-groups managed describe ace-web-mig --zone=ZONE
gcloud compute instance-groups managed list-instances ace-web-mig --zone=ZONE
```

**Verification example (illustrative):** `targetSize: 2` and a current managed instance list. Autoscaler may adjust capacity after observing metrics; target size can diverge from desired number while provisioning.

```bash
# GKE Autopilot: creates billable resources
gcloud container clusters create-auto ace-auto \
  --project=PROJECT_ID --location=REGION

# Install kubectl for Google Cloud CLI environment as applicable:
gcloud components install kubectl

gcloud container clusters get-credentials ace-auto \
  --project=PROJECT_ID --location=REGION
kubectl config current-context
kubectl get nodes
kubectl create deployment hello --image=us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
kubectl get deployments,pods
```

Use `kubectl apply -f MANIFEST.yaml` for reviewed declarative configurations; avoid `kubectl expose` externally without an access review. For **private cluster**, network isolation/endpoint flags vary by GKE configuration, so consult the official private cluster guide rather than copying speculative flags.

```bash
# Deploy private-by-default Cloud Run service; IMAGE_URL must exist and be accessible
gcloud run deploy ace-api --project=PROJECT_ID \
  --image=IMAGE_URL --region=REGION \
  --no-allow-unauthenticated

# Inspect
gcloud run services describe ace-api --project=PROJECT_ID --region=REGION
```

**Cleanup (only after checking names, project and dependencies):**

```bash
gcloud run services delete ace-api --region=REGION --project=PROJECT_ID
gcloud container clusters delete ace-auto --location=REGION --project=PROJECT_ID
gcloud compute instance-groups managed delete ace-web-mig --zone=ZONE --project=PROJECT_ID
gcloud compute instance-templates delete ace-web-template --project=PROJECT_ID
gcloud compute instances delete ace-demo-vm --zone=ZONE --project=PROJECT_ID
```

These cleanup commands are destructive and require confirmation. Inspect snapshots/disks/IPs/network resources that might survive separately and incur cost. **Outstanding command labs:** CLI creation of regional/private GKE cluster, VM Manager guest policy, Eventarc trigger, custom machine types and Spot VM need complete, doc-verified per-service examples before chapter can be marked verified.

## 6. Exam traps and troubleshooting

1. MIG autohealing ≠ autoscaling; neither replaces backups.
2. Regional Persistent Disk ≠ globally replicated storage; recovery still requires compatible architecture.
3. Autopilot manages more of the cluster, but **your application configuration, IAM and security remain your responsibility**.
4. Private GKE node without public IP can still pull images when appropriate Google API routes and access are configured; private ≠ no egress.
5. OS Login is identity authorization for SSH, not a replacement for routes/firewall/IAP.
6. Cloud Run service revision and GKE deployment revision follow different update models.
7. Spot VM capacity and lifetime aren't guaranteed; checkpoint/retry.
8. GPU ≠ TPU interchangeability; assess framework first.

## 7. Original MCQs (10 questions, explained)

**Q1 (single).** ทีมมี Windows application ที่ต้องแก้ registry และติดตั้ง driver เอง ต้องการ lift-and-shift ภายใน 1 เดือน. A Cloud Run B Compute Engine C Eventarc D GKE Autopilot. **Correct B.** A ไม่มี Windows VM OS control; C ส่ง event; D จัด container ไม่ใช่ตัวเลือกตรงสำหรับ Windows VM lift-and-shift.

**Q2 (single).** API stateless รับ traffic เฉพาะช่วง flash sale ทีมไม่ต้องการดูแล cluster. A Cloud Run B VM เดียว C Persistent Disk D TPU. **Correct A.** B ต้องบริหาร scaling/OS; C storage; D accelerator ไม่ใช่ managed HTTP runtime.

**Q3 (multiple, select two).** ทีมมี VM web server จาก template ต้องรองรับโหลดเพิ่มและ replace VM ที่ health check fail. A MIG autoscaling B MIG autohealing C เพิ่ม HDD disk D Cloud DNS เท่านั้น E Cloud Asset Inventory. **Correct A,B.** C เพิ่ม storage; D DNS ไม่เพิ่มจำนวนหรือซ่อม instance; E inventory ไม่ใช่ workload lifecycle.

**Q4 (single).** Operator มี IAM ที่เหมาะสมแต่ SSH เข้า VM ไม่ได้หลังเปิด OS Login; VM ไม่มี external IP และไม่มี VPN/IAP. สาเหตุควรตรวจชั้นใดก่อน? A Network access path B Billing export C Cloud Storage lifecycle D BigQuery schema. **Correct A.** IAM authorization ไม่ทำให้ network route เชื่อมได้เอง; B/C/D ไม่เกี่ยวกับ SSH.

**Q5 (multiple, select two).** งาน batch รันซ้ำได้ ต้องลดต้นทุนและยอมรับ interruption. A Spot VM B Save intermediate checkpoints to durable storage C ใช้ Local SSD เป็นสำเนาเดียว D ห้าม retry E เพิ่ม Owner role. **Correct A,B.** C อาจสูญข้อมูล; D ขัด interruptible design; E ไม่แก้ availability.

**Q6 (single).** ทีมต้องใช้ Kubernetes CRD และ multiple custom operators. A Cloud Run functions B GKE C Cloud DNS D VM Manager. **Correct B.** A execution abstraction ไม่ใช่ full Kubernetes API; C DNS; D OS fleet management.

**Q7 (single).** ต้องสร้าง cluster แต่ไม่ต้องการดูแล node pool รายวัน. A GKE Autopilot B VM template C Cloud NAT D Cloud SQL. **Correct A.** B/C/D ไม่ใช่ managed Kubernetes node lifecycle mode.

**Q8 (multiple, select two).** Cloud Storage ส่ง event ไป Cloud Run ผ่าน Eventarc; handler บางครั้งประมวลผลไฟล์เดิมซ้ำ. A ทำ handler ให้ idempotent B ตรวจ trigger filters/identity C เปลี่ยน disk เป็น Hyperdisk D เปิด unauthenticated ทุกกรณี E เพิ่ม static IP. **Correct A,B.** C/E ไม่แก้ event semantics, D เปิด access เกินจำเป็นและไม่ใช่ remedy.

**Q9 (single).** องค์กรต้องการลดผลจากการเสียของ zone ที่ใช้ disk ขณะยังคงรูปแบบ block storage บน Compute Engine. A Regional Persistent Disk (พร้อม failover design) B Local SSD only C RAM disk D Cloud Shell home directory. **Correct A.** B/C ephemeral, D ไม่ใช่ production block storage.

**Q10 (multiple, select two).** นักวิจัยเลือกระหว่าง GPU/TPU สำหรับ training ที่มี dependency CUDA-specific และ location จำกัด. A ตรวจ framework compatibility B ตรวจ regional accelerator availability/quota C TPU ต้องดีที่สุดเสมอ D GPU ไม่มีประโยชน์กับ ML E เลือกจากราคา hourly อย่างเดียว. **Correct A,B.** C/D เป็น false generalizations; E ละเลย job duration/compatibility.

## 8. Closed-note recall

1. Compute Engine, GKE, Cloud Run, Cloud Run functions, Agent Runtime ต่างกันตรง responsibility layer ใด?
2. อธิบาย template, MIG, autoscaler, autohealing และ load balancer ว่าทำคนละหน้าที่อย่างไร
3. จะเลือก zonal/regional PD, Hyperdisk หรือ Local SSD จาก constraints อย่างไร?
4. อธิบายขั้นตอน get credentials, verify kubectl context, deploy และ inspect app บน GKE
5. เมื่อ Cloud Storage event ทำให้ worker เขียนผลกลับ bucket เดิม ต้องป้องกันอะไร?

## 9. Official sources (checked 2026-10-30)

- [2026 ACE exam guide](https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf)
- [Create VM instances](https://docs.cloud.google.com/compute/docs/instances/create-start-instance)
- [Manage instance templates](https://docs.cloud.google.com/compute/docs/instance-templates/create-instance-templates)
- [MIG create CLI](https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/create)
- [MIG autoscaling CLI](https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/set-autoscaling)
- [OS Login](https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin)
- [VM Manager](https://docs.cloud.google.com/compute/vm-manager/docs/overview)
- [Disk choices](https://docs.cloud.google.com/compute/docs/disks)
- [GKE Autopilot creation](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster)
- [GKE app deployment](https://docs.cloud.google.com/kubernetes-engine/docs/deploy-app-cluster)
- [Cloud Run deploy](https://docs.cloud.google.com/run/docs/deploying)
- [Eventarc triggers](https://docs.cloud.google.com/eventarc/standard/docs/create-triggers)
- [Spot VMs](https://docs.cloud.google.com/compute/docs/instances/spot)
- [Agent Runtime overview](https://docs.cloud.google.com/agent-builder/agent-engine/overview)

**Definition of Done remaining:** Diagram Design custom skill render, syntax/permissions audit for all commands, missing example CLI for five subtopics, independent content QA, test outputs and build validation.
