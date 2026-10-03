# Lab 03 — Authenticated Cloud Run, Revisions & Logs

[Lab index](./README.md) · [Cloud Run concepts](../Module-09-Cloud-Run-and-Event-Driven-Services.md)

## เป้าหมายและ prerequisites

Deploy container ตัวอย่างเป็น service ที่ต้อง authenticate ใช้ runtime SA ของ lab แล้วสร้าง revision ใหม่และสลับ traffic พร้อมดู logs

ต้องมีสิทธิ์ deploy/delete Cloud Run, create/delete SA, `actAs` บน SA, invoke service และ read logs รวมสิทธิ์แก้ service IAM ถ้าใช้ flag จัด authentication ระหว่าง deploy ถ้า role ของ user ไม่รวม Invoker ให้ผู้ดูแลให้สิทธิ์เฉพาะ service ตามงาน ไม่เปิด public แทน

มีค่าใช้จ่าย Cloud Run/logging ตาม usage ไม่มีการสร้าง paid build pipeline ในตัวอย่างนี้เพราะใช้ prebuilt sample image

## Task 1 — เตรียม context และ SA

```bash
export PROJECT_ID="your-lab-project-id"
export REGION="us-central1"
export RUN_SA="ace-run-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
gcloud config set project "$PROJECT_ID"
gcloud auth list
gcloud services enable run.googleapis.com iam.googleapis.com \
  artifactregistry.googleapis.com --project="$PROJECT_ID"

gcloud iam service-accounts create ace-run-runtime \
  --display-name="ACE Cloud Run runtime" --project="$PROJECT_ID"
```

SA นี้ไม่ต้อง data roles เพราะ hello app ไม่อ่าน bucket/DB คน deploy ต้องมี `actAs` บน SA ตาม prerequisites ไม่สร้าง JSON key

## Task 2 — Deploy revision แรก

```bash
gcloud run deploy ace-hello \
  --image=us-docker.pkg.dev/cloudrun/container/hello \
  --region="$REGION" \
  --service-account="$RUN_SA" \
  --no-allow-unauthenticated \
  --invoker-iam-check \
  --min=0 \
  --max=2 \
  --project="$PROJECT_ID"

gcloud run services describe ace-hello \
  --region="$REGION" \
  --format='yaml(status.url,status.traffic,spec.template.spec.serviceAccountName)'
```

`--min`/`--max` เป็น service-level scaling flags ใน CLI ปัจจุบัน ตรวจ `gcloud run deploy --help` ถ้าใช้ version เก่าที่มีเพียง revision-level `--min-instances`/`--max-instances` อย่าถือว่าต่างชื่อแต่ semantics เหมือนกันทุกอย่าง

Expected: deployment Ready, URL และ revision/traffic ปรากฏ runtime SA ตรงค่า lab Service ต้องไม่ให้ `allUsers` invoke

## Task 3 — เรียกแบบ authenticated

```bash
export SERVICE_URL="$(gcloud run services describe ace-hello \
  --region="$REGION" --format='value(status.url)')"

curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" "$SERVICE_URL"
```

Expected: sample application HTML/response ถ้า 401/403 ตรวจ caller identity/Invoker/token/ingress ไม่เพิ่ม data roles ให้ runtime SA เพื่อแก้ caller access

ใน environment ที่ invocation tokens ต้อง audience/identity model ต่างออกไป ใช้ [authentication guide](https://docs.cloud.google.com/run/docs/authenticating/overview) และลอง authenticated proxy:

```bash
gcloud run services proxy ace-hello --region="$REGION" --port=8080
```

Proxy command รันค้างเพื่อ serve เปิดอีก Cloud Shell terminal แล้ว `curl http://localhost:8080` จากนั้นกลับ terminal แรกกด Ctrl+C ไม่เปิด proxy ทิ้งไว้แล้วคิดว่า command เสร็จ

## Task 4 — สร้าง revision ใหม่โดยยังไม่รับ traffic

จด revision แรกก่อน:

```bash
gcloud run revisions list --service=ace-hello --region="$REGION"
```

Deploy image เดิมแต่เพิ่ม environment config เพื่อให้เกิด revision ใหม่ ไม่อ้างว่าเปลี่ยน environment นี้ทำให้หน้า hello เปลี่ยนข้อความ เพราะ sample app อาจไม่อ่านตัวแปรนี้

```bash
gcloud run deploy ace-hello \
  --image=us-docker.pkg.dev/cloudrun/container/hello \
  --region="$REGION" \
  --service-account="$RUN_SA" \
  --set-env-vars=LAB_REVISION=two \
  --no-allow-unauthenticated \
  --invoker-iam-check \
  --no-traffic \
  --project="$PROJECT_ID"

gcloud run revisions list --service=ace-hello --region="$REGION"
```

Expected: revision ใหม่ Ready แต่ traffic ของ service ยังคง revision เดิม ตรวจชื่อจริงจาก output ไม่เดาว่า suffix ต้องเป็นเลขใด

## Task 5 — Canary และ rollback

```bash
export OLD_REVISION="actual-first-revision-name"
export NEW_REVISION="actual-second-revision-name"

gcloud run services update-traffic ace-hello \
  --region="$REGION" \
  --to-revisions="${OLD_REVISION}=90,${NEW_REVISION}=10"

gcloud run services describe ace-hello \
  --region="$REGION" --format='yaml(status.traffic)'
```

Expected: traffic percentages ตาม configuration ไม่พิสูจน์จากหน้า web ที่เหมือนกันเพราะทั้งสอง revision ใช้ image เดียวกัน

Rollback traffic:

```bash
gcloud run services update-traffic ace-hello \
  --region="$REGION" --to-revisions="${OLD_REVISION}=100"
```

## Task 6 — ดู logs

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" AND resource.labels.service_name="ace-hello"' \
  --project="$PROJECT_ID" --freshness=1h --limit=10 --format=json
```

Expected: request/container entries ที่เกิดขึ้นตาม telemetry; ดู revision label และเวลาจริง อาจต้องรอ ingestion และ request ที่ปฏิเสธก่อนเข้า app ไม่จำเป็นต้องมี app log เดียวกัน

## Cleanup

```bash
gcloud run services delete ace-hello --region="$REGION" --project="$PROJECT_ID"
gcloud iam service-accounts delete "$RUN_SA" --project="$PROJECT_ID"
gcloud run services list --region="$REGION" --project="$PROJECT_ID"
```

Expected: service/SA ของ lab ถูกลบ Logs ที่เก็บแล้วอาจยังอยู่ตาม retention ไม่มี image repository ของผู้เรียนถูกสร้างโดย lab นี้ จึงไม่ลบ sample repository ของผู้ให้บริการ

## อธิบายกลับให้ได้

- Runtime SA กับ caller ที่ invoke ต่างกันอย่างไร?
- ทำไม deploy ด้วย `--no-traffic` แล้ว user ยังเข้ารุ่นเดิม?
- ทำไม rollback app traffic ไม่รับประกันย้อน DB migration ได้?

## เอกสาร

- [Deploy reference](https://docs.cloud.google.com/sdk/gcloud/reference/run/deploy)
- [Proxy reference](https://docs.cloud.google.com/sdk/gcloud/reference/run/services/proxy)
- [Traffic migration](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration)
