# Activity 07 — Developing Applications with Cloud Run: Fundamentals

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Activity 06 — GKE](./Path-Activity-06-GKE-TH.md) · [บท Cloud Run](./Module-09-Cloud-Run-and-Event-Driven-Services.md) · [Lab map](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/559)

> Activity นี้สอน Cloud Run resource model/container lifecycle/autoscaling, service identity/IAM, local development/testing และการเชื่อม Google Cloud services; syllabus แสดง hands-on least-privilege IAM bindings และ Pub/Sub integration โน้ตนี้เสริม course โดยไม่คัดลอก grader

## เรียนจบแล้วควรทำได้

- เลือก Cloud Run service สำหรับ HTTP application และแยก service/revision/instance
- เตรียม container ให้ทำงานตาม runtime contract
- อธิบาย concurrency, autoscaling, minimum/maximum instances และ tradeoffs
- แยก identity ของ deployer/build/runtime/caller
- ตั้ง invoker access, ingress และ service-to-service auth ให้ตรง use case
- จัด secrets/configuration โดยไม่ฝัง secret ใน source/image
- deploy revision, ตรวจ health และเปลี่ยน/rollback traffic
- เชื่อม Pub/Sub และออกแบบ retry/idempotency ให้ไม่ทำ side effect ซ้ำ

## Course modules และ lab ที่ syllabus ระบุ

| Module | ขอบเขต |
|---|---|
| Fundamentals of Cloud Run | resource model, container lifecycle, autoscaling, IAM access control |
| Service identity and authentication | service accounts, resource hierarchy, least privilege, secrets/environment variables |
| Application development, testing and integration | develop/test local, deployments/revisions, integrations |
| Hands-on | Implementing Least Privilege IAM Policy Bindings in Cloud Run; Using Cloud Pub/Sub with Cloud Run |

## 1. Cloud Run service และ revision

**Service** เป็น logical workload กับ stable endpoint/config; **revision** เป็น immutable snapshot ของ configuration/image/code เมื่อเปลี่ยน relevant config จะเกิด revision ใหม่; **instance** เป็น runtime instance ที่อาจ scale ตาม demand และ lifecycle policy

ข้อดีของ revision model คือ release แยกเป็นรุ่นและสามารถค่อย ๆ เปลี่ยน traffic ได้ แต่ state ใน local filesystem ไม่ใช่ persistent shared storage และแต่ละ revision อาจทำงานพร้อมกัน ต้องให้ compatible กับ database/API dependencies

### เทียบ compute option แบบเร็ว

| Workload | เริ่มพิจารณา |
|---|---|
| Stateless HTTP container ไม่ต้องการ Kubernetes API | Cloud Run service |
| Background task ที่ทำจบแล้วหยุด | Cloud Run job |
| Event handler/function code ตาม trigger | Cloud Run functions |
| ต้องควบคุม Kubernetes objects, cluster/network policy | GKE |
| ต้องควบคุม OS/VM process หรือ legacy runtime | Compute Engine |

## 2. Container runtime contract

Container ต้องเริ่ม process ที่ serve traffic ตาม runtime contract:

- listen port ที่กำหนดโดย environment/config (มักอ่านจาก `PORT`)
- bind address ที่รับ traffic จาก runtime เช่น `0.0.0.0` ไม่ใช่ loopback อย่างเดียว
- process ต้อง start ภายในเวลาที่เหมาะกับ startup/health behavior
- handle SIGTERM/shutdown ได้ดีเมื่อ instance ถูกหยุด
- ไม่เก็บ durable state ไว้เฉพาะ local filesystem
- logs ส่งไป stdout/stderr ให้ระบบรวบรวมได้ และห้าม log secrets

ทดสอบ container ในเครื่อง/CI ก่อน deploy: start, health path, port, env vars, startup failure, graceful shutdown และ dependency behavior

## 3. Scaling: concurrency และ instance count

Cloud Run scale ตาม incoming traffic และ settings/metrics ที่รองรับ:

- **Concurrency**: จำนวน concurrent requests ที่ instance รับได้ตาม setting; สูงขึ้นช่วยใช้ instance น้อยลงสำหรับ workload ที่ I/O bound แต่ CPU/memory/contention อาจทำ latency สูง
- **CPU/memory**: เลือกให้เหมาะกับ request profile/startup/background needs และ pricing mode
- **Minimum instances**: ช่วยลด cold-start ในบาง workload แต่มีค่าใช้จ่ายและไม่ได้ทำให้ทุก latency หาย
- **Maximum instances**: จำกัด scale ตาม config; ช่วยปกป้อง downstream ได้ระดับหนึ่ง แต่ห้ามใช้แทน connection pooling/rate limiting/financial budget control
- **Request timeout**: ต้องเหมาะกับงาน; งานยาวอาจควรเป็น job/async workflow

ตัวอย่างการคำนวณคร่าว ๆ: หากแต่ละ instance เปิด DB pool สูงสุด 15 connection และมีได้ 20 instances ก็อาจมี capacity ของ connection รวมถึง 300 ต่อ revision/service ตามการตั้งค่า อย่าคูณเฉพาะ concurrency แล้วลืม minimum/max instances และหลาย revisions ที่รับ traffic พร้อมกัน

## 4. IAM: แยก identity ให้ถูกบทบาท

| Identity | ใช้ทำอะไร | ตัวอย่าง permission |
|---|---|---|
| Deployer | deploy/ปรับ service และกำหนด runtime identity | Cloud Run deploy permissions, actAs ที่จำเป็น |
| Build identity | build source/image และ push artifact | Cloud Build/Artifact Registry permissions ที่เกี่ยวข้อง |
| Runtime service account | application เรียก Google APIs/อ่าน secret | อ่านเฉพาะ resource/API ที่ app ต้องใช้ |
| Invoker/caller | ส่ง request ไปยัง private service | Cloud Run Invoker บน service ตาม design |
| Google service agent | platform ทำงานแทน managed service | Google-managed permissions; อย่าลบ/แก้โดยไม่เข้าใจผล |

การมีสิทธิ์ deploy ไม่ได้แปลว่าผู้เรียก service มีสิทธิ์ และ runtime SA ไม่ใช่ user ที่ใช้ gcloud deploy ทำ least-privilege bindings แยกตาม principal และ resource scope

## 5. IAM Invoker เทียบกับ ingress

- **Authentication/Invoker** ระบุว่าใครเรียก service ได้
- **Ingress** จำกัด network paths/sources ที่ service ยอมรับ
- **Application authorization** ตรวจสิทธิ์ผู้ใช้ระดับ business logic

สามชั้นนี้ไม่ใช่สิ่งเดียวกัน: ingress ที่ internal ไม่ได้แทน authentication ของ caller และ Invoker permission ไม่ได้เปิดเส้นทาง network ที่ถูกจำกัดไว้

Service-to-service private call โดยทั่วไป caller ใช้ ID token ที่ audience เหมาะกับ service ปลายทางและ principal มีสิทธิ์ invoke ห้ามใส่ token ลง log หรือ hardcode ลง image

## 6. Secrets และ configuration

- **Environment variables** เหมาะกับ config ที่ไม่ลับตามข้อกำหนดขององค์กร; ไม่ควรสมมติว่า env vars ทุกตัวเป็นความลับ
- **Secret Manager** หรือการเชื่อม secret ที่รองรับ ใช้เก็บ secret พร้อมควบคุม access/rotation
- จำกัด runtime SA ให้อ่าน secrets เฉพาะที่จำเป็น
- ระวัง secret ใน build args, Dockerfile layers, shell history, CI logs และ error output
- แยก dev/test/prod secrets และอย่า copy secret production ลง lab

เมื่อหมุน secret ให้เข้าใจ revision rollout/refresh semantics และ connection pool/cache ที่ application ใช้

## 7. Pub/Sub integration: event-driven pattern

ภาพ flow ขั้นต้น:

```text
Publisher → Pub/Sub topic → subscription/trigger → Cloud Run handler
  → validate event → process idempotently → persist result → acknowledge/success
```

Cloud Run handler ต้องเตรียมรับ duplicate/retry ตาม delivery configuration และ trigger integration:

- ทำ idempotency โดย event ID/business key + durable record/transaction เมื่อจำเป็น
- แยก transient error (อาจ retry ได้) ออกจาก permanent invalid input
- จำกัด retry/backoff/dead-letter behavior ตาม semantics ที่รองรับ
- ส่ง success หลัง state transition สำคัญสำเร็จตาม design ไม่ใช่ก่อนเริ่มทำ
- log event identifiers แบบไม่เผย payload ลับ
- คิดเรื่อง concurrency และ downstream quotas/connection caps

## 8. Revision rollout และ rollback

Deploy revision ใหม่แบบไม่รับ trafficก่อน แล้วค่อยส่ง traffic ตามสัดส่วนจากเก่าไปใหม่เมื่อ health/metrics ผ่าน ใช้ revision history เพื่อ audit และ rollback traffic ได้ แต่ rollback ไม่ได้ย้อน database changes หรือ side effects

ตรวจ error rate, latency, startup failures, dependency metrics และ business signals; sample เล็กอาจสรุปผลไม่ได้ทันที ถ้า session affinity/traffic tags/traffic splits ถูกใช้ให้เข้าใจ behavior ปัจจุบัน

ดูตัวอย่างคำสั่งและข้อจำกัด canary เพิ่มใน [Module 09 — Cloud Run](./Module-09-Cloud-Run-and-Event-Driven-Services.md)

## 9. แบบฝึกประกบ course

ทำตามโจทย์ใน Google Skills lab และกด checkpoint ที่นั่น; ไม่ใช้ project ส่วนตัวหาก lab จัด temporary project ให้

### Lab A — Least-privilege IAM bindings for Cloud Run

- ระบุ deployer, runtime SA และ caller
- ตรวจ role ที่จำเป็นสำหรับ deploy กับ invoke แยกกัน
- ผูก Invoker กับ principal ตาม lab scope
- กำหนด runtime identity และ permission สำหรับ service dependency
- ทดสอบ permitted/denied calls ด้วย identity ที่ถูกต้อง
- อ่าน 403 ว่าขาด invocation หรือ app-level permission ใด หลีกเลี่ยง broad grant

### Lab B — Pub/Sub with Cloud Run

- สร้าง topic/subscription หรือ trigger ตาม lab
- ตรวจ identity ที่ trigger ใช้ส่ง request และ runtime identity ของ service
- ส่ง test message/event และตรวจ Cloud Run logs/response
- ทดสอบ failure/retry ตามโจทย์ โดยคิดถึง duplicate delivery
- ยืนยันผล processing ด้วย state/output ที่ lab คาดหวัง

### Local practice ก่อน deploy

ทำ checklist app ของตัวเอง: listen `PORT`, bind `0.0.0.0`, logs stdout, graceful shutdown, stateless storage, authentication model, env/secrets, concurrency/timeout และ DB connection pool

## 10. Troubleshooting

| อาการ | เริ่มตรวจ |
|---|---|
| Revision ไม่ Ready | container logs, port/bind, startup, memory, health checks, dependency |
| 401/403 ที่ endpoint | caller identity/token audience, invoker IAM, ingress |
| App เรียก API ไม่ได้ | runtime SA, target resource IAM, API enabled, VPC path |
| Secret อ่านไม่ได้ | runtime principal, Secret Manager IAM, version/status, mount/env setup |
| Pub/Sub event ไม่เข้า | topic/subscription/trigger config, trigger identity, region, permissions |
| Event ทำงานซ้ำ | delivery/retry, idempotency storage, side effects |
| Latency/cold start สูง | startup work, image size, dependencies, min instances/cpu settings |
| DB connections สูง | instance count × pool limit × active revisions, max scaling, pooling strategy |
| Rollback แล้วระบบยังผิด | data/schema changes, queued events/side effects, incompatible dependency |

## เช็กความเข้าใจ

1. Service, revision และ instance ต่างกันอย่างไร?
2. Runtime service account ต่างจาก deployer และ invoker อย่างไร?
3. Ingress internal แทน IAM authentication ได้หรือไม่?
4. ทำไม Cloud Run local filesystem ไม่เหมาะกับ durable shared state?
5. เพิ่ม concurrency แล้ว connection count หรือ latency อาจเปลี่ยนอย่างไร?
6. Pub/Sub ส่ง event ซ้ำได้; app ควรออกแบบอย่างไร?
7. Traffic rollback คืน database/schema ได้หรือไม่?

**เฉลยย่อ:** service เป็น logical endpoint, revision เป็น version/config snapshot, instance เป็น runtime process; identities ทำคนละหน้าที่; ingress ไม่ใช่ auth; local file ไม่ durable/shared; concurrency กระทบ resource pressure; handlers ควร idempotent และมี retry policy; traffic rollback ไม่ย้อน data migration

## แหล่งอ้างอิง

- [Activity 07 — Cloud Run Fundamentals ใน ACE Path](https://www.skills.google/paths/11/course_templates/559)
- [Course syllabus โดย Google Cloud Training](https://www.coursera.org/learn/developing-applications-with-cloud-run-on-gcp-fundamentals)
- [Cloud Run overview](https://cloud.google.com/run/docs/overview/what-is-cloud-run)
- [Container runtime contract](https://cloud.google.com/run/docs/container-contract)
- [Cloud Run IAM roles](https://cloud.google.com/run/docs/reference/iam/roles)
- [Authentication for service-to-service](https://cloud.google.com/run/docs/authenticating/service-to-service)
- [Cloud Run revisions and traffic](https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration)
- [Configure secrets](https://cloud.google.com/run/docs/configuring/secrets)
- [Pub/Sub overview](https://cloud.google.com/pubsub/docs/overview)
