# Activity 08 — Developing Applications with Cloud Run Functions

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Activity 07 — Cloud Run Fundamentals](./Path-Activity-07-Cloud-Run-TH.md) · [บท Cloud Run/Event](./Module-09-Cloud-Run-and-Event-Driven-Services.md) · [บทฐานข้อมูล](./Module-07-Databases-and-Data-Services.md) · [Lab map](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) · [Google Skills course](https://www.skills.google/course_templates/505)

> Activity นี้ต่อจาก Cloud Run fundamentals ไปยัง single-purpose functions สำหรับ HTTP request และ cloud events โดยเน้น build/deploy, triggers, Workflows, VPC, security, Firestore และ BigQuery Remote Functions ชื่อผลิตภัณฑ์/หน้าจออาจเปลี่ยนตาม generation; ดู current Google Cloud docs ประกอบเสมอ

## เป้าหมาย

- เลือก function สำหรับงาน HTTP/event ที่ logic มีขอบเขตชัด
- build/test/deploy function และเข้าใจ source-to-container lifecycle
- แยก trigger identity, caller identity, deployer และ runtime service account
- ใช้ HTTP auth/event trigger ที่ถูกต้อง และเชื่อม Workflows/Pub/Sub/Eventarc
- configure Serverless VPC Access เมื่อจำเป็นต้องเข้าถึง private network
- integrate Firestore/BigQuery ตาม data/API contract
- ทำ retry/idempotency/logging/secret handling ให้ปลอดภัย

## Course outline / labs ที่ syllabus แสดง

| Module | ประเด็น |
|---|---|
| Introduction to Cloud Run functions | function/FaaS use cases และ deploy |
| Calling and connecting functions | HTTP/event triggers, Workflows, VPC connection |
| Securing functions | authentication, function identity, protect data |
| Integrating with cloud databases | Firestore integration, BigQuery Remote Functions |
| Best practices | design, reliability, security, operations |

Hands-on ที่เปิดเผย: Develop and Deploy Cloud Run Functions; Connect Cloud Run Functions; Integrate Cloud Run Functions with Firestore ส่วนอื่นเป็น reading/quiz ตาม course edition

## 1. Function mental model

Function คือ code entry point ที่ platform build/deploy แล้วเรียกเมื่อ HTTP request หรือ event มาถึง เหมาะกับ handler ที่ทำหน้าที่เดียวชัดเจน เช่น รับ webhook, transform object event หรือทำ validation/enrichment ก่อนบันทึกข้อมูล

ปกติ function ใช้ infrastructure model ของ Cloud Run ในการรัน container; ไม่ได้หมายความว่าไม่มี container, IAM, region, scaling, runtime configuration หรือ operational concerns

| แบบเรียก | ตัวอย่าง | สิ่งที่ต้องกำหนด |
|---|---|---|
| HTTP | API/webhook | URL, auth, request/response, timeout, CORS เมื่อเกี่ยวข้อง |
| Event-driven | Pub/Sub, Cloud Storage หรือ event source ที่รองรับผ่าน Eventarc | provider, event type/filter, delivery/retry, trigger identity, handler contract |
| Orchestrated | Workflow เรียกหลาย steps/service/functions | auth ระหว่าง steps, branching, retry/compensation, timeout |

## 2. Build, deploy, test

วงจรโดยทั่วไป:

```text
source + runtime/dependencies + entry point
→ build artifact/container
→ deploy revision/function
→ configure trigger and service identity
→ test request/event
→ inspect logs/metrics and cleanup
```

จุดที่พลาดบ่อย:

- entry point/name ไม่ตรงกับ source handler
- runtime version/dependencies ไม่รองรับ
- startup/build failure กับ handler runtime failure เป็นคนละจุด
- event schema/source ไม่ตรงกับ code
- trigger เรียก service ไม่ได้เพราะ IAM/identity/region configuration
- function deploy สำเร็จ แต่ downstream API/database access denied
- secret ใส่ผิด environment หรือไม่มี permission อ่าน

ทดสอบ logic และ validation ในเครื่องก่อน deploy; ใช้ sample event/request ที่ไม่มีข้อมูล production; แยก unit test, integration test และ live trigger test

## 3. HTTP function กับ event function

### HTTP

ตรวจ method/path/content type/body validation, authentication, response code, timeout และ idempotency หาก client retry ได้ HTTP function ที่ unauthenticated/public ต้องผ่าน application-level authorization หากมีข้อมูลส่วนบุคคล/ธุรกรรม

### Event

Event-triggered invocation ต้องยึด event contract, source, filtering และ delivery semantics ของ trigger ที่เลือก อย่าสมมติว่า event จะถูกส่งครั้งเดียว/เรียงลำดับเสมอ หากงานมีผลข้างเคียงให้เขียน idempotently:

1. อ่าน stable event/message ID หรือ business key
2. ตรวจ processed record/transaction boundary
3. ทำ operation อย่างปลอดภัยเมื่อ duplicate
4. บันทึกผลก่อนถือว่าสำเร็จตาม acknowledgement contract
5. ส่ง error/retry เฉพาะที่แก้ได้ด้วยการลองใหม่

## 4. Trigger identity, caller และ runtime identity

| Identity | หน้าที่ |
|---|---|
| Human/deployer | สร้าง/แก้ function และผูก runtime/trigger |
| Build identity | build source และจัดการ artifacts ตาม pipeline |
| Trigger identity | เรียก function/เชื่อมกับ event source ใน trigger model ที่ต้องใช้ |
| Runtime service account | function code เรียก Google APIs และอ่าน resources |
| HTTP caller | เรียก endpoint และต้อง authenticate ตาม access policy |

ในบาง trigger model มี service agent เพิ่มเติม อย่าเดาว่า runtime SA เป็นคน invoke function ทุกกรณี ตรวจ IAM roles ตาม trigger type และ deployment generation

Least privilege คือให้แต่ละ identity เฉพาะ permissions ที่จำเป็นกับ resource scope เท่านั้น การให้ Editor แก้ 403 อาจซ่อน identity ที่ผิดตัว

## 5. Workflows สำหรับ orchestration

Workflows ประสาน steps ที่เรียก Google APIs หรือ HTTP endpoints โดยมีลำดับ, conditions, retries และ error handling ตามนิยาม workflow เหมาะเมื่อต้องประสานหลายบริการอย่างตรวจสอบได้

ไม่ควรย้าย business transaction ซับซ้อนไปไว้ใน function เดียวโดยไร้ state/retry policy และไม่ควร retry side-effecting step โดยไม่ idempotency/compensation Workflows ไม่ได้ทำให้ database transaction ครอบคลุมทุก service อัตโนมัติ

ใช้ function เมื่อเป็น handler/compute step; ใช้ workflow เมื่อเป็น orchestration; ใช้ message/event service เมื่อ decouple producer-consumer ตาม event-driven pattern

## 6. Serverless VPC Access และ network

ใช้เมื่อต้องให้ function เข้าถึง private address/resource ใน VPC ตาม supported network configuration ตรวจ:

- connector/direct network egress model ที่รุ่นปัจจุบันรองรับ
- region compatibility, subnet/IP capacity และ connector sizing ถ้ามี
- egress setting: all traffic หรือ private ranges ตามโจทย์
- routes, firewall, DNS, destination service และ return path
- runtime IAM แยกจาก network reachability

Private network route ไม่ได้ grant IAM; IAM grant ก็ไม่ได้สร้าง route/DNS/firewall ให้ การเชื่อมต่อ private ปลายทางใช้ไม่ได้ให้แยกตรวจ Layer 3/4, DNS, firewall และ application auth ทีละข้อ

## 7. เชื่อม Firestore และ BigQuery

### Firestore

- เลือก database location/mode/data model/query/indexes จาก application pattern
- runtime identity ใช้ permission ที่เหมาะกับ database/resource
- ออกแบบ document IDs และ writes ให้ idempotent เมื่อ event ถูก retry
- พิจารณ transaction/batch limits, contention และ connection/client library usage
- ห้ามใส่ admin credential ใน code; ใช้ application identity

### BigQuery Remote Functions

Remote Function ทำให้ BigQuery เรียก remote service/function ตาม contract สำหรับ row/batch inputs และ return results; ไม่ใช่ SQL UDF replacement สำหรับทุกงาน

ต้องพิจารณา latency, request size, permissions, region/co-location, service endpoint, retries, concurrency, result schema และ query cost เพราะ query อาจเรียก remote service จำนวนมาก ควรจำกัด input/ใช้ batching/cache เมื่อรองรับและวัด cost/performance ก่อน production

## 8. Secrets และ data protection

เก็บ passwords/API keys ใน Secret Manager ตามการเชื่อมต่อที่รองรับ แล้ว grant runtime identity อ่านเฉพาะ secret/version ที่จำเป็น หลีกเลี่ยง:

- secret ใน source repository, container image, build logs, event payload logs
- log payload เต็มที่มีข้อมูลลูกค้า
- ใช้ production secret ใน lab
- grant secret accessor ให้ deployer ทั้ง project ทั้งที่ runtime เท่านั้นที่ต้องอ่าน

Rotation ต้องคำนึงถึง function revisions/instances ที่ทำงานอยู่, cache/client connection และ rollback path

## 9. แบบฝึกประกบ Activity 08

ทำ official labs ใน Google Skills session และตรวจคะแนนจากหน้า Skills เอง

### Lab A — Develop and Deploy Cloud Run Functions

- เลือก HTTP/event model ตามโจทย์
- ตรวจ source, runtime, function entry point และ dependencies
- deploy ตาม region/project ที่ lab กำหนด
- ส่ง test HTTP request หรือ sample event
- ตรวจ logs, response และ revision/function status

### Lab B — Connect Cloud Run Functions

- เชื่อม trigger source/caller และ function ตามโจทย์
- ตรวจ permissions ของ trigger identity และ runtime SA
- ทดลอง Workflows integration ตามขั้นตอน course
- ถ้าต้องเข้าถึง private resource ให้ตรวจ VPC configuration, DNS และ firewall

### Lab C — Integrate Functions with Firestore

- ตรวจ Firestore database/location และ function runtime identity
- เขียน/อ่าน sample document ตามโจทย์
- ส่ง request/event ซ้ำเพื่อคิดเรื่อง idempotency
- ตรวจ logs/error handling โดยไม่เผยข้อมูลลับ

### Reading practice — BigQuery Remote Functions

วาดเส้นทาง BigQuery query → remote function endpoint → request/response schema → result table; ระบุ service auth, location, retry, maximum volume และค่าที่อาจเพิ่มตามจำนวน rows

## 10. Troubleshooting

| อาการ | ตรวจ |
|---|---|
| Build/deploy fail | build logs, runtime/dependencies, APIs, deploy permission, image/build identity |
| HTTP 401/403 | caller authentication, invoker, ingress, audience, app authorization |
| Event ไม่ trigger | source/event type/filter, trigger status/region, trigger identity, IAM |
| Function 5xx/retry loop | logs, payload schema, downstream error, retry/idempotency |
| Firestore permission denied | runtime SA, API/database/location, IAM scope, rules/client model |
| Private resource unreachable | VPC egress config, connector/subnet, DNS, route, firewall, destination |
| Timeout | external dependency latency, function timeout, connection pool, long-running job design |
| Duplicate write | event/message ID, transactional/idempotent handling, delivery configuration |
| Remote function query ช้า/แพง | rows × invocations, batching, endpoint latency, query plan, location |

## เช็กความเข้าใจ

1. Function เหมาะกับ workload แบบใดเมื่อเทียบกับ Cloud Run service?
2. Trigger identity กับ runtime SA ทำงานเหมือนกันหรือไม่?
3. Event ถูกส่งซ้ำจะป้องกัน transaction ซ้ำอย่างไร?
4. เมื่อ function เข้ private database ไม่ได้ การ grant IAM อย่างเดียวพอหรือไม่?
5. Workflows กับ function รับผิดชอบคนละส่วนอย่างไร?
6. BigQuery Remote Function เหมาะกับทุก SQL computation หรือไม่?
7. ทำไมไม่ควร log event payload เต็ม?

**เฉลยย่อ:** function เหมาะ handler/single-purpose; trigger identity เชื่อม event invocation ส่วน runtime SA ใช้ API ระหว่าง code ทำงาน; ใช้ event ID/business key+durable idempotency; ต้องมีทั้ง network path และ IAM; workflow orchestrates steps, function executes logic; remote function เพิ่ม network/latency/cost จึงไม่เหมาะทุก row-wise task; payload อาจมี secrets/PII

## แหล่งอ้างอิง

- [Activity 08 — Cloud Run Functions course](https://www.skills.google/course_templates/505)
- [Course syllabus by Google Cloud Training](https://www.coursera.org/learn/developing-applications-with-cloud-functions-on-google-cloud)
- [Cloud Run functions overview](https://cloud.google.com/run/docs/functions/overview)
- [Cloud Run function triggers](https://cloud.google.com/run/docs/function-triggers)
- [Deploy Cloud Run functions](https://cloud.google.com/run/docs/deploy-functions)
- [Connect Cloud Run functions to VPC](https://cloud.google.com/run/docs/configuring/connecting-vpc)
- [Workflows overview](https://cloud.google.com/workflows/docs/overview)
- [Firestore overview](https://cloud.google.com/firestore/docs/overview)
- [BigQuery remote functions](https://cloud.google.com/bigquery/docs/remote-functions)

## 📚 Deep Learning Notes — Functions/Eventarc/Firestore Transaction Flow (Original Supplement, 2026-10-21)

### 1. Event-driven ไม่ได้หมายความว่าเรียกครั้งเดียวเสมอ

~~~mermaid
flowchart LR
 E[Cloud Storage object event] --> EV[Eventarc trigger]
 EV --> FN[Cloud Run function]
 FN --> F[Firestore write]
 FN --> L[Cloud Logging]
 EV -->|retry on failure| FN
~~~

Cloud Run Functions รองรับ Event-driven กับ HTTP Patterns แต่ **Event Delivery/Retries** มี Semantics ที่ต้องอ่านตาม Event Source/Trigger. ออกแบบ Handler ให้ **Idempotent** เพราะ Delivery อาจเกิดซ้ำ และต้องแยก Event ID, Business Key และ Processing Status เพื่อกัน Duplicate Writes

### 2. HTTP vs Event ทำให้ Security Model ต่างกัน

| หัวข้อ | HTTP Function | Event-triggered Function |
|---|---|---|
| ผู้เริ่ม Request | Browser / Service / External Client | Eventarc / Supported Event Producer |
| Auth | Invoker IAM หรือ External Gateway ตามการตั้งค่า | Trigger-to-Service Authentication และ Eventarc Identity |
| Failure | HTTP Status ที่ Caller เห็น | Async Delivery/Retry/Dead-letter Plan ตาม Trigger |
| Idempotency | Caller Retry / Network Timeout | Duplicate Event Delivery & Replay |
| Audit | Request Logs/Invoker Identity | Trigger Delivery Logs + Runtime Identity |

**Deployment Identity** ที่ Deploy Function ไม่ใช่ **Runtime Identity** ที่ Function ใช้อ่าน Firestore. ถ้า Function Deploy สำเร็จแต่ Event ไม่เข้า ให้ดู Eventarc Trigger Region, Event Filters, Service Account Permissions, Topic Routing และ Sink Logs ก่อนเปลี่ยน Function Code

### 3. Case Study: Uploaded File → Save Metadata

Image File เข้าสู่ Bucket แล้ว Trigger Function ให้ Save `object_generation` กับ `event_id` ใน Firestore. หาก Function Timeout หลังเขียน Firestore แต่ก่อนส่ง Success, Event อาจถูกส่งซ้ำ; Logic ต้อง Check Deduplication Key ก่อน Create ใหม่เสมอ (ใช้ Transaction/Conditional Create Pattern ตาม Requirement)

**Bad implementation:** ทุก Event ทำ Blind Insert เป็น Document ID ใหม่ → Retry อาจสร้าง Duplicates; **Safer approach:** ใช้ Stable Key จาก Event / Object Generation และตรวจ Event Processing Status ให้มี Consistent State

### 4. Local mental lab

1. ออกแบบ Business Idempotency Key สำหรับ Object `images/profile01.png` Generation 1001 และ 1002: ทั้งสองควรถูก Process อย่างไร?
2. ถ้า Function เขียน Firestore ได้แต่ BigQuery Remote Function Timeout ให้ตั้ง Retry Budget/Backoff อย่างไร?
3. ทำไมการใช้ Private VPC Connectivity กับ Firestore/IAM ไม่เหมือน Public HTTP Trigger Security?

**Official:** [Cloud Run Functions](https://cloud.google.com/functions/docs/concepts/overview) · [Eventarc Overview](https://cloud.google.com/eventarc/docs/overview) · [Firestore Transactions](https://cloud.google.com/firestore/docs/manage-data/transactions).

**Status:** Original architecture/retry companion; ไม่มี Function Trigger ถูกสร้างหรือรันจริง
