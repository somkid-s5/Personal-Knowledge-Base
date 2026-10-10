# Lab 01 — Cloud Shell, Cloud Storage & IAM Impersonation

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 👤 Identity → 🔑 Access → 🛡️ Controls → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-STUDY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lab index](./README.md) · [แนวคิด IAM](../Module-02-IAM-Service-Accounts-and-Security.md)

## เป้าหมายและ prerequisites

สร้าง bucket ส่วนตัว, upload/download object, สร้าง SA แล้วทดลองอ่านข้อมูลด้วย identity ของ SA โดยไม่สร้าง JSON key

ต้องมีสิทธิ์สร้าง/ลบ bucket และ SA, แก้ bucket IAM และ SA IAM, เปิด APIs หากยังไม่เปิด และ impersonate SA ตาม binding ที่สร้าง Lab account บางแบบไม่มี permission แก้ IAM: ทำเฉพาะส่วนที่อนุญาต ไม่ใช้บัญชีส่วนตัวแทนใน session ของ Google Skills

ค่าใช้จ่าย: object storage/operations และ retained data จาก soft delete ตาม config มีได้

## Task 1 — ตรวจ context

```bash
export PROJECT_ID="your-lab-project-id"
export REGION="us-central1"
gcloud config set project "$PROJECT_ID"
gcloud auth list
gcloud projects describe "$PROJECT_ID" --format='yaml(projectId,projectNumber,name)'
```

Expected: project ID/name ตรง environment ที่ตั้งใจทำ จากนั้นเปิด APIs หากได้รับอนุญาต:

```bash
gcloud services enable storage.googleapis.com iam.googleapis.com \
  iamcredentials.googleapis.com --project="$PROJECT_ID"
```

## Task 2 — สร้าง bucket

ใช้ suffix ลดชื่อชน ค่าทั้งหมดอยู่เฉพาะ shell นี้ ถ้าเปิดใหม่ต้องบันทึกชื่อ resource กลับมาเอง

```bash
export BUCKET_NAME="${PROJECT_ID}-ace-notes-${RANDOM}"
export SA_NAME="ace-storage-reader"
export SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud storage buckets create "gs://${BUCKET_NAME}" \
  --project="$PROJECT_ID" \
  --location="$REGION" \
  --uniform-bucket-level-access \
  --public-access-prevention

gcloud storage buckets describe "gs://${BUCKET_NAME}"
```

Expected: bucket สร้างสำเร็จ ตรวจ location, uniform access และ public access prevention; ไม่มีการให้ `allUsers` อ่าน

## Task 3 — อัปโหลดและเช็กเนื้อหา

```bash
mkdir -p ~/ace-lab-01
cd ~/ace-lab-01
printf 'Hello from ACE Lab 01\n' > hello.txt
gcloud storage cp hello.txt "gs://${BUCKET_NAME}/hello.txt"
gcloud storage ls "gs://${BUCKET_NAME}/"
gcloud storage cp "gs://${BUCKET_NAME}/hello.txt" downloaded.txt
cmp hello.txt downloaded.txt
```

Expected: list เห็น `hello.txt`; `cmp` สำเร็จโดยไม่มี output แปลว่า bytes เหมือนกัน ถ้าคำสั่ง cp/list denied ให้ดูสิทธิ์ของ **active user** ตอนนี้ ยังไม่ได้ใช้ SA

## Task 4 — สร้าง read-only workload identity

```bash
gcloud iam service-accounts create "$SA_NAME" \
  --display-name="ACE lab storage reader" \
  --project="$PROJECT_ID"

gcloud storage buckets add-iam-policy-binding "gs://${BUCKET_NAME}" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.objectViewer"
```

SA ได้อ่าน objects ของ bucket นี้ ไม่ได้ Storage Admin ทั้ง project

## Task 5 — อนุญาต caller ให้ impersonate

ดู active account จาก `gcloud auth list` แล้วใส่ email ของ user จริง ห้ามใช้ email ของ SA ใน field นี้

```bash
export CALLER_EMAIL="your-lab-user@example.com"

gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --project="$PROJECT_ID" \
  --member="user:${CALLER_EMAIL}" \
  --role="roles/iam.serviceAccountTokenCreator"

gcloud storage cat "gs://${BUCKET_NAME}/hello.txt" \
  --impersonate-service-account="$SA_EMAIL"
```

Expected: เห็นข้อความ Hello โดยคำสั่งใช้ SA identity หาก policy เพิ่งเปลี่ยน อาจต้องรอ propagation แล้วลองซ้ำ แต่ไม่ grant roles เพิ่มโดยเดา

## Task 6 — ทดลอง write ที่ควรถูกปฏิเสธ

```bash
gcloud storage cp hello.txt "gs://${BUCKET_NAME}/should-not-upload.txt" \
  --impersonate-service-account="$SA_EMAIL"
```

Expected: permission denied เพราะ SA มี Object Viewer การ denied นี้เป็นผลลัพธ์ของการทดสอบ ไม่ใช่ lab failure

ถ้า upload สำเร็จ SA อาจมี inherited/direct roles ที่กว้างกว่า ต้องตรวจ policies ไม่สรุปว่า Object Viewer เขียนได้ หาก object ถูกสร้างให้ลบด้วย user ที่ได้รับอนุญาตตอน cleanup

## Troubleshooting

| อาการ | ตรวจ |
|---|---|
| Bucket name exists | สร้างชื่อใหม่/ใช้ suffix ใหม่ |
| IAM Credentials API disabled | API ใน project และสิทธิ์เปิด |
| Token creation denied | caller email และ Token Creator บน SA ถูกหรือไม่ |
| Token สร้างได้แต่ cat denied | SA data access และ bucket scope |
| User อ่านได้แต่ SA ไม่ได้ | เป็นคนละ identity; user roles ไม่ส่งต่อให้ SA |

## Cleanup เฉพาะ resources ของ lab

ใช้ user identity เดิม ไม่ใช่ SA reader:

```bash
gcloud storage rm "gs://${BUCKET_NAME}/hello.txt"
# รันบรรทัดถัดไปเฉพาะเมื่อ Task 6 สร้าง object นี้สำเร็จ
# gcloud storage rm "gs://${BUCKET_NAME}/should-not-upload.txt"
gcloud storage buckets delete "gs://${BUCKET_NAME}"
gcloud iam service-accounts delete "$SA_EMAIL" --project="$PROJECT_ID"
```

Expected: live bucket และ SA ถูกลบ ตรวจ Console/CLI ว่าไม่มี resource live เหลือ หาก bucket เปิด soft delete ข้อมูลอาจยัง retained/มีค่าใช้จ่ายตาม retention แม้ลบ live resource แล้ว ไม่เปลี่ยน retention ของ bucket งานอื่นเพื่อทำ cleanup นี้

## อธิบายกลับให้ได้

1. Token Creator ของ caller กับ Object Viewer ของ SA ทำคนละอย่างอย่างไร?
2. ทำไมไม่ได้สร้าง SA key แต่ยังอ่าน bucket ได้?
3. ทำไมเราให้ role ที่ bucket แทน project?

## เอกสาร

- [Create bucket](https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/create)
- [Impersonation](https://docs.cloud.google.com/iam/docs/service-account-impersonation)
- [Delete bucket](https://docs.cloud.google.com/sdk/gcloud/reference/storage/buckets/delete)
