# Activity 13 — Logging and Monitoring in Google Cloud

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Visual Guide](./VISUAL-STUDY-GUIDE-TH.md#11-observability-signal--hypothesis--evidence) · [Module 11 — Observability](./Module-11-Observability-and-Operations.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/99)

> บทนี้ยกระดับจาก “รู้จัก Monitoring/Logging” ไปเป็น **ใช้ telemetry เพื่อหาสาเหตุจริง** ตั้งแต่ user impact → metrics/logs/traces → hypothesis → alert/runbook → verification

## เป้าหมายการเรียนรู้

อ่านจบแล้วควรทำได้:

1. แยก Metrics, Logs, Traces และ Audit Logs ได้
2. อธิบาย monitored resource, metric labels และ aggregation ได้ระดับใช้งาน
3. สร้าง mental model ของ dashboard, uptime check, alert, SLI/SLO
4. เข้าใจ Log Router, log bucket, sink, retention และ destination permission
5. ใช้ logs/metrics แยก app issue, infra issue และ dependency issue
6. รู้ว่า Ops Agent จำเป็นเมื่อไร และ platform metrics มีอะไรโดยไม่ต้อง agent
7. อ่าน multi-project monitoring/scoping project ได้
8. ทำ incident workflow โดยไม่เริ่มจาก restart หรือเพิ่ม CPU แบบเดา

---

## 1. Observability ไม่ใช่ Dashboard

```mermaid
flowchart LR
    USER[User impact] --> MET[Metrics: มากแค่ไหน?]
    USER --> LOG[Logs: เกิดอะไร?]
    USER --> TRACE[Trace: ช้าที่ขั้นไหน?]
    USER --> AUDIT[Audit: ใครเปลี่ยนอะไร?]
    MET --> HYP[Hypothesis]
    LOG --> HYP
    TRACE --> HYP
    AUDIT --> HYP
    HYP --> TEST[ทดสอบสมมติฐาน]
    TEST --> FIX[Mitigate / Fix]
    FIX --> VERIFY[Verify recovery]
```

Observability ที่ดีตอบคำถามได้ ไม่ใช่มีกราฟเยอะที่สุด

---

## 2. Metrics, Logs, Traces ต่างกันอย่างไร

| Signal | ตอบคำถาม | ตัวอย่าง |
|---|---|---|
| Metrics | ปริมาณ/แนวโน้มเท่าไร | request rate, p95 latency, CPU, connections |
| Logs | event/request เกิดอะไร | stack trace, auth denied, startup error |
| Traces | request ใช้เวลาตรงไหน | frontend → app → DB |
| Audit logs | ใครเรียก/เปลี่ยน control plane/data | IAM change, resource create/delete |

### ตัวอย่างระบบช้า

```mermaid
flowchart LR
    C[Client] --> LB[Load Balancer]
    LB --> APP[Application]
    APP --> DB[Database]
    APP --> API[External API]
    LB -.metrics/logs.-> OBS[Observability]
    APP -.logs/traces/custom metrics.-> OBS
    DB -.query/connection metrics.-> OBS
    API -.latency/error.-> OBS
```

CPU ต่ำไม่ได้พิสูจน์ว่าระบบเร็ว เพราะ app อาจกำลังรอ DB/network/lock/connection pool

---

## 3. Four Golden Signals

1. **Latency** — request ใช้เวลานานแค่ไหน โดยเฉพาะ p95/p99
2. **Traffic** — requests/throughput เท่าไร
3. **Errors** — error ratio ไม่ใช่ดูจำนวน raw อย่างเดียว
4. **Saturation** — resource/pool/queue ใกล้เพดานไหม

### ทำไม average latency หลอกได้

ถ้า 95 requests = 100 ms แต่ 5 requests = 10 s

Average ยังอาจดูไม่แย่มาก แต่ user กลุ่มหนึ่งเจอปัญหารุนแรง จึงต้องดู percentile

---

## 4. Monitored resource + metric + labels

Metric ไม่ได้อยู่ลอย ๆ ต้องรู้ว่าอ้างถึง resource อะไร

ตัวอย่างแนวคิด:

```text
resource.type = gce_instance
metric = CPU utilization
resource.labels.instance_id = ...
resource.labels.zone = ...
```

เวลา query ต้องเลือก:
- resource type
- metric
- time range
- alignment period
- reducer/aggregation
- labels/grouping

เปรียบเทียบค่าแบบคนละ aggregation อาจทำให้สรุปผิด

---

## 5. Dashboard ควรตอบคำถาม

Dashboard สำหรับ web service ที่มี LB + app + DB ควรเห็นอย่างน้อย:

```mermaid
flowchart TB
    USER[User experience] --> L[p95/p99 latency]
    USER --> E[Error ratio]
    USER --> T[Traffic]
    APP[Application] --> Q[Thread/queue/pool]
    APP --> CPU[CPU/RAM]
    DB[Database] --> CONN[Connections]
    DB --> SQL[Query latency / locks]
```

ถ้า dashboard มีแต่ VM CPU แต่ user complaint คือ API ช้า แปลว่า coverage ยังไม่ตรง service

---

## 6. Uptime checks

Uptime check ตรวจ endpoint จาก probe location ตาม configuration

ใช้ตอบว่า:
- endpoint reachable ไหม
- HTTP status ถูกไหม
- response content ตรง expectation ไหม (ตาม feature)

แต่ uptime check ไม่ได้พิสูจน์ว่า business transaction ทุกอย่างทำงาน เช่น `/health` 200 แต่ checkout query DB ไม่ได้

ควรแยก:
- shallow health
- dependency-aware health
- synthetic business check ตามความจำเป็น

---

## 7. SLI / SLO / SLA

```mermaid
flowchart LR
    SLI[SLI = สิ่งที่วัด] --> SLO[SLO = เป้าหมาย]
    SLO --> ALERT[Alert / error budget decisions]
    SLA[SLA = ข้อตกลงภายนอก] -.อาจอิง SLI/SLO แต่ไม่ใช่สิ่งเดียวกัน.-> SLO
```

ตัวอย่าง:
- SLI = % requests ที่ latency < 500 ms
- SLO = 99.9% ต่อ 30 วัน
- SLA = ข้อตกลงกับลูกค้าพร้อมเงื่อนไข/เครดิต

SLO ที่วัดไม่ได้จริงไม่มีประโยชน์

---

## 8. Alert ที่ดี

Alert ต้องมี action ที่คนรับรู้ว่าทำอะไรต่อ

| Alert แย่ | Alert ดีกว่า |
|---|---|
| CPU > 70% 10 วินาที | 5xx ratio สูงต่อเนื่อง + user impact |
| disk usage สูง | disk free ต่ำกว่าระดับที่มีเวลาแก้ + runbook |
| service down | endpoint/SLO burn พร้อม service/project/owner |

คิดก่อนสร้าง:
- threshold
- duration/window
- missing data
- notification channel
- owner
- severity
- runbook

---

## 9. Multi-project monitoring

องค์กรอาจมี monitoring view กลาง โดยมี **scoping project** สำหรับมอง metrics/resources จาก monitored projects ตาม relationship/IAM ที่รองรับ

```mermaid
flowchart TB
    SCP[Scoping / monitoring project] --> P1[Project: App A]
    SCP --> P2[Project: App B]
    SCP --> P3[Project: Shared Infra]
    OPS[Operations team] --> SCP
```

ข้อสำคัญ:
- visibility ไม่เท่ากับ admin permission ทุก project
- alert ownership/notification ต้องชัด
- naming/labels สำคัญเมื่อหลาย project

---

## 10. Ops Agent

บน VM platform อาจมี host metrics บางตัวอยู่แล้ว แต่ guest/application telemetry บางอย่างต้อง Ops Agent หรือ instrumentation

**ตัวอย่าง:**
- VM CPU เห็นได้จาก platform metric
- guest memory/process/app log อาจต้อง agent/config

ก่อนติด agent ตรวจ:
- supported OS
- VM service account/IAM
- egress/API access
- config
- ingestion/cost

Cloud Run/GKE มี managed telemetry model ของตัวเอง ไม่ติด VM agent แบบเดียวกันทุก platform

---

## 11. Cloud Logging flow

```mermaid
flowchart LR
    SRC[VM / GKE / Cloud Run / Audit] --> ROUTER[Log Router]
    ROUTER --> BUCKET[Log bucket]
    ROUTER --> SINK[Sink]
    SINK --> BQ[BigQuery]
    SINK --> GCS[Cloud Storage]
    SINK --> PS[Pub/Sub]
    BUCKET --> QUERY[Logs Explorer / Log Analytics]
```

### สิ่งที่ต้องแยก

- **Log Router** ประเมิน route/filter
- **Log bucket** เก็บ logs
- **Sink** ส่งไป destination
- **Retention** กำหนดระยะเก็บ
- **View** จำกัด/จัดมุมมองตาม feature
- **Log Analytics** ใช้ query/analysis ตาม capabilities

---

## 12. Sink สร้างแล้วข้อมูลไม่เข้า destination

ตรวจเป็นลำดับ:

1. filter match จริงไหม
2. log entry เข้า router ไหม
3. destination ถูกไหม
4. writer identity ของ sink มี permission ไหม
5. destination location/config รองรับไหม
6. exclusion มีผลไหม
7. time range ถูกไหม

```mermaid
flowchart TD
    MISS[Sink destination ไม่มี log] --> F{Filter match?}
    F -- No --> FIXF[แก้ filter]
    F -- Yes --> W{Writer identity มีสิทธิ์?}
    W -- No --> FIXW[Grant destination permission]
    W -- Yes --> D{Destination/config ถูก?}
    D -- No --> FIXD[แก้ destination]
    D -- Yes --> T[ตรวจ latency/time range/exclusion]
```

---

## 13. Audit Logs

ใช้ตอบคำถามด้าน control/security เช่น:
- ใครแก้ IAM
- ใครลบ VM
- ใครสร้าง firewall rule
- ใครอ่าน/เขียน data ตามประเภท log/บริการที่รองรับ

แยกประเภทสำคัญ:
- Admin Activity
- Data Access
- System Event
- Policy Denied

Data Access มี enablement/cost/coverage ที่ต้องตรวจตาม service ไม่สมมติว่าเปิดเหมือนกันทุกตัว

---

## 14. Network logs

| Log | ใช้ดู |
|---|---|
| VPC Flow Logs | network flow telemetry แบบ sampling/aggregation |
| Firewall rule logging | traffic ที่ match rule ที่เปิด log |
| Audit logs | API/control operation |

VPC Flow Logs ไม่ใช่ packet capture และไม่ใช่ Audit Logs

---

## 15. Log-based metrics vs Custom metrics

### Log-based metric
สร้าง metric จาก log pattern เช่น count ของ specific error

### Custom metric
application ส่ง signal โดยตรง เช่น:
- `db_pool_active`
- `db_pool_waiting`
- `queue_depth`
- `order_processing_seconds`

Custom metrics มักดีกว่า parsing log สำหรับ signal ที่ application รู้เป็นตัวเลขอยู่แล้ว

ระวัง high-cardinality labels เช่น request_id/user_id

---

## 16. Trace / Profiler / Query Insights

```mermaid
flowchart LR
    REQ[Request] --> FE[Frontend span]
    FE --> APP[App span]
    APP --> SQL[DB span/query]
    APP --> EXT[External API span]
```

- **Trace** หาเวลาที่เสียใน request path
- **Profiler** หา CPU/memory hot path ใน runtime ที่รองรับ
- **Query Insights** หา query/database performance ตาม product

ไม่ใช่ทุก legacy app จะมี trace อัตโนมัติ ต้อง instrumentation/support

---

## 17. Incident workflow: ระบบช้า

```mermaid
flowchart TD
    INC[User reports slow] --> TIME[กำหนด time window + endpoint + impact]
    TIME --> GOLD[Latency / Traffic / Errors / Saturation]
    GOLD --> SPLIT{ช้าทุก instance หรือบางตัว?}
    SPLIT --> APP[App queue/thread/GC/pool]
    APP --> DB[DB connections/query/locks]
    DB --> NET[Network/DNS/dependency]
    NET --> CHANGE[Deployment/config/audit changes]
    CHANGE --> HYP[สร้าง hypothesis]
    HYP --> TEST[ทดสอบจาก evidence]
    TEST --> FIX[Mitigate/Fix]
    FIX --> VERIFY[Verify user-facing recovery]
```

ห้ามใช้ “CPU/RAM ไม่เต็ม” เป็นข้อสรุปว่า infra ปกติทั้งหมด

---

## 18. ตัวอย่าง Connection Pool Incident

อาการ:
- app 500 เป็นช่วง ๆ
- restart app แล้วหายชั่วคราว
- DB connections เพิ่มเรื่อย ๆ
- CPU DB ไม่สูง

สิ่งที่ควรเพิ่มใน telemetry:
- pool active
- pool idle
- pool waiting
- acquire time
- DB sessions
- query latency
- app instance count

จากนั้นดูความสัมพันธ์ก่อนแก้ด้วยการเพิ่ม DB max connections

---

## 19. Personalized Service Health / Active Assist / Cloud Hub

ใช้เป็นข้อมูลประกอบ:
- provider incident/health
- recommendations
- fleet/operations insights

แต่ recommendation ไม่ใช่คำสั่งให้ apply ทันที ต้องตรวจ workload pattern, peak, SLO และ business context

---

## 20. Mini Labs

### Lab A — Logs Explorer

กำหนดโจทย์: หา Cloud Run errors 1 ชั่วโมงล่าสุด

แนว query:

```text
resource.type="cloud_run_revision"
severity>=ERROR
```

จากนั้นเพิ่ม service/project/time filter ให้แคบ

### Lab B — Alert design

ออกแบบ alert สำหรับ API:
- signal: 5xx ratio
- threshold/window
- owner
- notification
- runbook link
- recovery condition

### Lab C — Sink failure

Sink ไป BigQuery ไม่ส่งข้อมูล

ให้ตรวจ filter → writer identity → destination permission → dataset/location → exclusion

### Lab D — Slow system

วาด flow:

```text
Client -> LB -> App -> DB
```

เขียน metric/log ที่ต้องการอย่างน้อยชั้นละ 2 ตัวก่อนเข้าเครื่อง production

---

## 21. Exam-style scenarios

**Scenario:** ต้องรู้ว่าใครแก้ firewall rule เมื่อ 10:35

**แนวคิด:** Audit Logs ไม่ใช่ CPU metric

**Scenario:** VM CPU ต่ำ แต่ request p99 สูงและ connection pool waiting สูง

**แนวคิด:** ตรวจ app/DB pool/query ไม่เพิ่ม VM CPU โดยอัตโนมัติ

**Scenario:** สร้าง log sink แล้ว destination ว่าง

**แนวคิด:** ตรวจ writer identity permission และ filter/destination ก่อน

**Scenario:** ต้อง monitor หลาย projects จากทีมกลาง

**แนวคิด:** multi-project monitoring/scoping project + IAM/ownership

---

## เช็กความเข้าใจ

1. Metrics กับ Logs ตอบคนละคำถามอย่างไร?
2. p95/p99 สำคัญกว่า average ในกรณีใด?
3. Uptime check 200 ยืนยันว่า checkout ใช้งานได้ไหม?
4. SLI/SLO/SLA ต่างกันอย่างไร?
5. Sink writer identity ใช้ทำอะไร?
6. VPC Flow Logs กับ Audit Logs ต่างกันอย่างไร?
7. VM RAM metric หายควรตรวจอะไร?
8. CPU ต่ำพิสูจน์ว่า app ไม่ช้าหรือไม่?
9. Custom metric แบบใดช่วย connection-pool incident?
10. Alert ที่ดีควรมี runbook/owner เพราะอะไร?

## แหล่งอ้างอิง

- [Google Skills — Logging and Monitoring in Google Cloud](https://www.skills.google/paths/11/course_templates/99)
- [Cloud Monitoring](https://cloud.google.com/monitoring/docs)
- [Cloud Logging](https://cloud.google.com/logging/docs)
- [Cloud Audit Logs](https://cloud.google.com/logging/docs/audit)
- [Ops Agent](https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent)
