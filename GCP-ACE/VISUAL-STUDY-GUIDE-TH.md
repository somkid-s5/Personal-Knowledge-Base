# ACE Visual Study Guide — แผนภาพจำแบบเห็นภาพก่อนอ่านยาว

[กลับสารบัญ ACE](./README.md) · [คู่มืออ่านตาม Learning Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Exam Map](./LEARNING-PATH.md)

> เป้าหมายของไฟล์นี้คือทำให้หัวข้อที่อ่านเป็นข้อความยาว ๆ กลายเป็นภาพจำก่อน แล้วค่อยกลับไปอ่าน Module/Activity แบบละเอียด แผนภาพเป็น **mental model** เพื่อช่วยเรียน ไม่ใช่ representation ของ internal implementation ทุก service แบบ 1:1

---

## 1) ภาพใหญ่ของ Google Cloud: Resource Hierarchy → Workload

```mermaid
flowchart TB
    ORG[Organization] --> F1[Folder: Production]
    ORG --> F2[Folder: Sandbox]
    F1 --> P1[Project: App]
    F1 --> P2[Project: Shared Network]
    F2 --> P3[Project: Learning]
    P1 --> IAM[IAM / APIs / Quotas / Billing attribution]
    IAM --> VM[Compute Engine]
    IAM --> GKE[GKE]
    IAM --> RUN[Cloud Run]
    IAM --> DB[Managed databases]
    IAM --> ST[Cloud Storage]
```

**จำสั้น ๆ:** ก่อนแก้ workload ให้ถามก่อนว่า *อยู่ project ไหน → identity อะไร → API เปิดไหม → quota/billing พร้อมไหม → network ไปถึงไหม* แล้วค่อยดูตัว service

อ่านต่อ: [Module 01](./Module-01-Foundations-and-Resource-Hierarchy.md)

---

## 2) IAM: ใคร ทำอะไร ที่ไหน ด้วย identity ไหน

```mermaid
flowchart LR
    U[User / Group / Workload] --> AUTH[Authentication]
    AUTH --> P[Principal]
    P --> R[Role]
    R --> S[Resource Scope]
    S --> C{Allow + inherited policy\nผ่านหรือไม่?}
    C -- No --> DENY[Denied]
    C -- Yes --> D{Deny / boundary / org constraint\nบล็อกหรือไม่?}
    D -- Yes --> DENY
    D -- No --> OK[Authorized]
```

### Deployer กับ Runtime Identity ต้องแยกกัน

```mermaid
flowchart TB
    DEV[Developer / CI] -->|deploy permission + actAs| APP[Cloud Run / VM / GKE workload]
    APP -->|runs as| SA[Runtime Service Account]
    SA -->|least privilege| DATA[Bucket / DB / Secret / API]
    DEV -.ไม่จำเป็นต้องมี data access.-> DATA
```

อ่านต่อ: [Module 02](./Module-02-IAM-Service-Accounts-and-Security.md)

---

## 3) Console / gcloud / API / Billing / Quota

```mermaid
flowchart LR
    USER[User] --> CONSOLE[Cloud Console]
    USER --> CLI[gcloud / Cloud Shell]
    CONSOLE --> API[Google Cloud APIs]
    CLI --> API
    API --> IAM[IAM check]
    IAM --> QUOTA[Quota / system limits]
    QUOTA --> CAP[Regional / zonal capacity]
    CAP --> RESOURCE[Resource created or changed]
    RESOURCE --> BILL[Usage → Billing account]
    BILL --> EXPORT[Budgets / Billing export / analysis]
```

### Create ไม่ได้ ให้ไล่จากซ้ายไปขวา

```mermaid
flowchart TD
    E[Create failed] --> A{Active account / project ถูกไหม?}
    A -- No --> FIX1[แก้ context]
    A -- Yes --> B{API enabled?}
    B -- No --> FIX2[Enable API ถ้ามีสิทธิ์]
    B -- Yes --> C{IAM permission?}
    C -- No --> FIX3[แก้ role/scope]
    C -- Yes --> D{Quota / limit?}
    D -- No --> FIX4[ลด usage / ขอ quota]
    D -- Yes --> E2{Capacity / location รองรับ?}
    E2 -- No --> FIX5[เปลี่ยน zone/type/plan]
    E2 -- Yes --> F[อ่าน error เฉพาะ service]
```

อ่านต่อ: [Module 03](./Module-03-Tools-Billing-and-Quotas.md)

---

## 4) Network: Packet ต้องผ่านอะไรบ้าง

```mermaid
flowchart LR
    C[Client] --> DNS[DNS resolve]
    DNS --> EP[Public/Internal IP or Load Balancer]
    EP --> ROUTE[Route / forwarding path]
    ROUTE --> FW[Firewall / Cloud NGFW]
    FW --> NIC[VM / backend NIC]
    NIC --> OSFW[Guest OS firewall]
    OSFW --> LISTEN[Process listening]
    LISTEN --> APP[Application]
    APP --> DEP[DB / API / downstream]
```

### Private VM ออกไปไหนใช้เครื่องมือคนละตัว

```mermaid
flowchart TB
    VM[Private VM: no external IP] --> Q{ปลายทางคืออะไร?}
    Q -->|Google APIs| PGA[Private Google Access / supported private access]
    Q -->|Public Internet| NAT[Cloud NAT / proxy]
    Q -->|Admin SSH| IAP[IAP / VPN / bastion / private path]
    NAT -.ไม่ได้เปิด inbound.-> VM
```

อ่านต่อ: [Module 04](./Module-04-VPC-Firewall-NAT-and-DNS.md)

---

## 5) Compute Engine: VM เดี่ยว → Template → MIG → Load Balancer

```mermaid
flowchart TB
    IMG[Image / startup config] --> T[Instance Template]
    T --> MIG[Managed Instance Group]
    MIG --> Z1[VM zone A]
    MIG --> Z2[VM zone B]
    HC[Health Check] --> MIG
    AS[Autoscaler] --> MIG
    Z1 --> LB[Load Balancer backend]
    Z2 --> LB
    LB --> USERS[Users]
```

### สามคำที่ชอบสับสน

```mermaid
flowchart LR
    AUTO[Autoscaling] -->|เพิ่ม/ลด| COUNT[จำนวน VM]
    HEAL[Autohealing] -->|แทนเครื่องเสีย| HEALTH[VM lifecycle]
    BAL[Load balancing] -->|กระจาย request| TRAFFIC[Traffic]
```

อ่านต่อ: [Module 05](./Module-05-Compute-Engine-and-Instance-Groups.md)

---

## 6) Storage: Object vs Block vs File

```mermaid
flowchart TD
    NEED[Workload ต้องเก็บข้อมูลแบบไหน?] --> Q1{ต้อง mount เป็น disk ให้ OS ไหม?}
    Q1 -- Yes --> BLOCK[Persistent Disk / Hyperdisk]
    Q1 -- No --> Q2{ต้อง shared filesystem / POSIX-like semantics ไหม?}
    Q2 -- Yes --> FILE[Filestore / NetApp Volumes / Managed Lustre ตามงาน]
    Q2 -- No --> OBJ[Cloud Storage object]
```

### Data protection ไม่ใช่คำเดียว

```mermaid
flowchart LR
    DATA[Object/Data] --> VER[Versioning]
    DATA --> SOFT[Soft delete]
    DATA --> RET[Retention policy]
    DATA --> BAK[Independent backup/copy]
    VER --> REC[Recovery options]
    SOFT --> REC
    RET --> GOV[Deletion protection / governance]
    BAK --> REC
```

**จำ:** Lifecycle = จัดอายุข้อมูล, Retention = จำกัดการลบ, Versioning/Soft delete = ช่วยกู้บางเหตุการณ์, Backup = สำเนา/วิธีกู้ที่ออกแบบแยก

อ่านต่อ: [Module 06](./Module-06-Storage-and-Data-Protection.md)

---

## 7) Database Decision Map

```mermaid
flowchart TD
    W[Workload] --> A{Analytics scan/aggregate ใหญ่?}
    A -- Yes --> BQ[BigQuery]
    A -- No --> B{Relational transaction / SQL semantics?}
    B -- Yes --> C{ต้อง global/distributed relational scale สูง?}
    C -- Yes --> SP[Spanner]
    C -- No --> D{PostgreSQL-compatible performance/feature need?}
    D -- Yes --> AL[AlloyDB]
    D -- No --> SQL[Cloud SQL]
    B -- No --> E{Document model?}
    E -- Yes --> FS[Firestore]
    E -- No --> F{High-throughput key/time-series access?}
    F -- Yes --> BT[Bigtable]
    F -- No --> RECHECK[กลับไปดู access pattern ใหม่]
```

### HA ≠ Backup

```mermaid
flowchart LR
    HA[HA] --> AVAIL[ลด downtime จาก infrastructure failure]
    REPL[Read Replica] --> SCALE[อ่านเพิ่ม / DR บางรูปแบบ]
    BACKUP[Backup] --> RESTORE[กู้ข้อมูล]
    PITR[PITR] --> TIME[กู้กลับจุดเวลา]
```

อ่านต่อ: [Module 07](./Module-07-Databases-and-Data-Services.md)

---

## 8) GKE: จาก Image ไปถึง User

```mermaid
flowchart LR
    SRC[Source] --> BUILD[Cloud Build / build pipeline]
    BUILD --> AR[Artifact Registry]
    AR --> DEP[Deployment]
    DEP --> RS[ReplicaSet]
    RS --> POD1[Pod]
    RS --> POD2[Pod]
    SVC[Service] --> POD1
    SVC --> POD2
    GW[Ingress / Gateway / Load Balancer] --> SVC
    USER[Client] --> GW
```

### Pod เรียก Google API ใช้ identity อีกเส้นหนึ่ง

```mermaid
flowchart LR
    KSA[Kubernetes ServiceAccount] --> WIF[Workload Identity Federation for GKE]
    WIF --> IAM[Google Cloud IAM principal / service account path]
    IAM --> API[Cloud Storage / Secret / API]
```

อ่านต่อ: [Module 08](./Module-08-GKE-and-Kubernetes.md)

---

## 9) Cloud Run / Functions / Event-driven

```mermaid
flowchart TB
    CLIENT[HTTP Client] --> RUN[Cloud Run Service]
    RUN --> R1[Revision A]
    RUN --> R2[Revision B]
    R1 --> DATA[DB / Storage / API]
    R2 --> DATA
    EVENT[Cloud event] --> EA[Eventarc / Pub/Sub]
    EA --> FN[Cloud Run Function / service]
    FN --> DATA
```

### Event ต้องคิด Retry + Idempotency

```mermaid
flowchart LR
    M[Message/Event] --> H[Handler]
    H -->|success| ACK[Ack / success response]
    H -->|temporary failure| RETRY[Retry + backoff]
    RETRY --> H
    H -->|poison / repeated failure| DLQ[Dead-letter path]
    H --> KEY[Idempotency key / dedupe state]
```

อ่านต่อ: [Module 09](./Module-09-Cloud-Run-and-Event-Driven-Services.md)

---

## 10) Load Balancer + Hybrid Connectivity

```mermaid
flowchart LR
    USER[Client] --> FRONT[Frontend IP / forwarding rule]
    FRONT --> PROXY[Target proxy]
    PROXY --> URL[URL map]
    URL --> BS[Backend service]
    BS --> NEG[NEG / Instance Group]
    HC[Health Check] --> NEG
```

### เชื่อม network เลือกอะไร

```mermaid
flowchart TD
    N[ต้องเชื่อม network] --> A{Workload อยู่หลาย project แต่ใช้ network กลาง?}
    A -- Yes --> SVPC[Shared VPC]
    A -- No --> B{สอง VPC แยกกัน ต้อง private route?}
    B -- Yes --> PEER[VPC Peering ถ้า topology/route constraints เหมาะ]
    B -- No --> C{เชื่อม On-prem ↔ Google Cloud?}
    C -- Yes --> D{ต้อง dedicated connectivity / bandwidth model?}
    D -- Yes --> INT[Interconnect]
    D -- No --> VPN[HA VPN]
```

อ่านต่อ: [Module 10](./Module-10-Load-Balancing-and-Hybrid-Networking.md)

---

## 11) Observability: Signal → Hypothesis → Evidence

```mermaid
flowchart LR
    USER[User impact] --> MET[Metrics: มากแค่ไหน]
    USER --> LOG[Logs: เกิดอะไร]
    USER --> TRACE[Trace: ช้าที่ขั้นไหน]
    USER --> AUDIT[Audit: ใครเปลี่ยนอะไร]
    MET --> HYP[Hypothesis]
    LOG --> HYP
    TRACE --> HYP
    AUDIT --> HYP
    HYP --> TEST[ทดสอบด้วยหลักฐาน]
    TEST --> FIX[Mitigate / fix / verify]
```

### ระบบช้าแต่ CPU ไม่เต็ม

```mermaid
flowchart TB
    SLOW[User says slow] --> EDGE[LB / frontend latency]
    EDGE --> APP[App threads / queue / GC]
    APP --> POOL[DB connection pool]
    POOL --> DB[Query / locks / storage]
    APP --> DNS[DNS / network RTT]
    APP --> DOWN[External dependency]
```

อ่านต่อ: [Module 11](./Module-11-Observability-and-Operations.md)

---

## 12) Terraform: Config + State + Real World

```mermaid
flowchart TB
    GIT[HCL in Git] --> PLAN[terraform plan]
    STATE[Terraform state] --> PLAN
    REAL[Real Google Cloud resources] --> PLAN
    PLAN --> REVIEW{Review}
    REVIEW -- approve --> APPLY[terraform apply]
    REVIEW -- change code --> GIT
    APPLY --> REAL
    APPLY --> STATE
```

### Import ไม่ใช่สร้าง HCL ให้อัตโนมัติ

```mermaid
flowchart LR
    EXIST[Existing resource] --> CFG[เขียน resource address/config]
    CFG --> IMPORT[Import into state]
    IMPORT --> PLAN[Plan]
    PLAN --> ALIGN[ปรับ config จนตรง intent]
    ALIGN --> SAFE[Apply เมื่อไม่มี replace ที่ไม่ตั้งใจ]
```

อ่านต่อ: [Module 12](./Module-12-Terraform-and-Infrastructure-as-Code.md)

---

## 13) AI Infrastructure / Modern Operations

### GPU vs TPU เริ่มจาก workload ไม่ใช่ชื่อ accelerator

```mermaid
flowchart TD
    AI[Training / Inference workload] --> FW{Framework/model รองรับ TPU path ดีหรือไม่?}
    FW -- Yes --> SCALE{Tensor workload ใหญ่และ scale ได้ดี?}
    SCALE -- Yes --> TPU[Benchmark TPU]
    SCALE -- No --> GPU[Benchmark GPU/CPU ด้วย]
    FW -- No --> GPU
    GPU --> BENCH[เทียบ latency / throughput / memory / cost]
    TPU --> BENCH
```

### จะรัน AI workload ที่ไหน

```mermaid
flowchart TD
    W[AI workload] --> C{ต้องควบคุม OS/driver/topology ลึก?}
    C -- Yes --> GCE[Compute Engine]
    C -- No --> K{ต้อง Kubernetes scheduling / multi-service platform?}
    K -- Yes --> GKE[GKE]
    K -- No --> M{เข้ากับ managed runtime / inference service ไหม?}
    M -- Yes --> MANAGED[Managed runtime / service]
    M -- No --> REQ[ทบทวน requirement]
```

### AI-assisted operations ต้องตรวจผลจริง

```mermaid
flowchart LR
    Q[Question / incident context] --> AI2[Gemini Cloud Assist / AI tooling]
    AI2 --> OBS[Observation / recommendation]
    OBS --> VERIFY[Verify metrics, logs, IAM, resource state]
    VERIFY --> CHANGE[Proposed change]
    CHANGE --> TEST2[Lab / staging / controlled rollout]
    TEST2 --> PROD[Verify production result]
```

อ่านต่อ: [Module 13](./Module-13-AI-Tooling-and-Modern-Services.md)

---

# One-page troubleshooting map

```mermaid
flowchart TD
    X[มีปัญหา] --> C1{สร้าง resource ไม่ได้?}
    C1 -- Yes --> CP[Context → API → IAM → Quota → Capacity → Org Policy]
    C1 -- No --> C2{เข้า service ไม่ได้?}
    C2 -- Yes --> NET[DNS → Route → Firewall → Listener → Auth → App]
    C2 -- No --> C3{ระบบช้า/500?}
    C3 -- Yes --> OBS2[Latency/Error → App queue/pool → DB → Network → Dependency]
    C3 -- No --> C4{Deploy แล้วพัง?}
    C4 -- Yes --> DEP2[Revision/Image/Manifest → Config/Secret → Identity → Health → Rollback]
    C4 -- No --> C5{IaC plan แปลก?}
    C5 -- Yes --> TF[Config → State → Drift → Replacement → Ownership]
```

## วิธีใช้ไฟล์นี้ให้คุ้ม

1. ก่อนเริ่ม Activity ให้เปิด diagram ของหัวข้อนั้น 2–3 นาที
2. อ่าน Module/Activity แล้วกลับมาวาด flow จากความจำ
3. ก่อนทำ lab ให้บอกตัวเองว่า request/data จะไหลผ่านองค์ประกอบใดบ้าง
4. เวลาเจอ error ให้ชี้ตำแหน่งบน flow ก่อนแก้ อย่าเริ่มจาก restart หรือเปิดสิทธิ์กว้าง ๆ
5. ถ้าอธิบาย diagram ได้โดยไม่อ่านข้อความ แปลว่า mental model เริ่มติดแล้ว
