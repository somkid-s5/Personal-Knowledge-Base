# Module 03 — Cloud Shell, gcloud, Billing & Quotas

[สารบัญ](./README.md) · [ก่อนหน้า](./Module-02-IAM-Service-Accounts-and-Security.md) · [ถัดไป](./Module-04-VPC-Firewall-NAT-and-DNS.md)

## 1. Console กับ CLI ใช้ platform เดียวกัน

Console เหมาะสำรวจ configuration และดูผลแบบภาพ CLI เหมาะทำซ้ำ บันทึกคำสั่ง และ automation ทั้งสองต้องผ่านสิทธิ์/API ของ cloud services ไม่ใช่ช่องทางที่ใช้หลบ IAM กันได้

**Cloud Shell** คือ environment สำหรับใช้เครื่องมือบน browser พร้อมเครื่องมือหลายอย่างที่ติดตั้งไว้ แต่ไม่ใช่ VM ของ application และไม่ใช่ project เอง เปิด Cloud Shell แล้วต้องตรวจว่ากำลังชี้ project ใด

ตัวอย่าง: Console เลือก project A แต่ `gcloud` ยังตั้ง project B ถ้าสั่งสร้าง VM โดยไม่ระบุ `--project` อาจสร้างผิดที่ สิ่งนี้เป็น configuration mismatch ไม่ใช่ cloud ทำงานผิด

## 2. Read-only preflight

ก่อนใช้คำสั่งที่สร้าง/แก้ไข resource:

```bash
gcloud auth list
gcloud config list
gcloud config get-value project
```

`auth list` ดู account ที่ CLI รู้จักและตัวที่ active ส่วน `config list` ดู default properties เช่น project/region/zone ไม่พิมพ์ token หรือ key เพื่อ “เช็กว่ามี credential ไหม”

```bash
export PROJECT_ID="your-lab-project-id"
export REGION="us-central1"
export ZONE="us-central1-a"

gcloud config set project "$PROJECT_ID"
gcloud config set compute/region "$REGION"
gcloud config set compute/zone "$ZONE"
```

region/zone เป็นตัวอย่างเท่านั้น ถ้า Google Skills ให้ค่าอื่น ใช้ค่าจากแล็บ ไม่ override ตามไฟล์นี้

## 3. Named configurations

[gcloud configurations](https://docs.cloud.google.com/sdk/docs/configurations) ช่วยจัดชุด property ของ environment:

```bash
gcloud config configurations create ace-lab
gcloud config set project "$PROJECT_ID"
gcloud config configurations list
gcloud config configurations activate ace-lab
```

Configuration เป็นชุด property ของ CLI ไม่ใช่กลไก security isolation credential ที่เก็บในเครื่องยังต้องจัดการเอง และชื่อ config `production` ไม่ได้ป้องกันการสั่งผิด

ใช้ `--project`, `--region`, `--zone` ใน script ที่ต้องแน่นอน เช่น:

```bash
gcloud compute instances list --project="$PROJECT_ID"
```

## 4. gcloud auth กับ ADC

| สิ่งที่ใช้ | ผู้ใช้หลัก | ตัวอย่าง |
|---|---|---|
| gcloud CLI credentials | gcloud commands | `gcloud auth login` |
| Application Default Credentials (ADC) | client libraries / Terraform บาง config | `gcloud auth application-default login` สำหรับ local development |
| Attached workload identity | code บน cloud platform | SA ของ VM/Cloud Run และ metadata-based credentials |

[ADC](https://docs.cloud.google.com/docs/authentication/application-default-credentials) เป็นวิธีให้ library หา credential จากแหล่งที่รองรับ ไม่ใช่ permission role ชุดใหม่

ดังนั้น “gcloud ใช้ได้ แต่ Python SDK denied” อาจเป็นคนละ identity/config ไม่ต้องแก้ด้วยสร้าง SA key ทันที Cloud Shell/managed runtime มีกลไก credential ของ environment ให้ใช้ตามคู่มือ

## 5. APIs ต้องเปิดใน project

สร้าง resource ไม่ได้อาจเพราะ service API ยังไม่เปิด แม้ role ถูกต้อง:

```bash
gcloud services list --enabled --project="$PROJECT_ID"

gcloud services enable \
  compute.googleapis.com \
  storage.googleapis.com \
  --project="$PROJECT_ID"
```

คำสั่ง `enable` เป็นการเปลี่ยนแปลงและต้องมี permission สำหรับ Service Usage การเปิด API ไม่ได้สร้าง VM ให้ทันที แต่เป็น prerequisite ของการเรียกบริการนั้น

หาก environment lab ไม่ให้เปิด API ให้ใช้ project/services ที่แล็บจัดไว้ ไม่พยายามเพิ่มสิทธิ์เหนือข้อกำหนดแล็บ

## 6. Billing account ไม่ใช่ project

Billing account รวมค่าใช้จ่ายและการชำระเงิน project ที่ใช้บริการเสียเงินต้องเชื่อม billing ที่ใช้ได้ แต่หลาย project เชื่อม billing account เดียวได้

สิทธิ์จัดการ billing แยกจากสิทธิ์จัดการ project คนมี Project Owner ไม่ควรถูกสมมติว่ามีสิทธิ์ใช้ billing account ทุกตัว การ link ต้องมี permission ที่เกี่ยวข้องทั้งฝั่ง project และ billing

ตรวจจาก Console ที่ `Billing` และดูว่าเลือก scope ถูก การเห็นยอดรวมทั้งหมดบน billing account ไม่ได้หมายความว่าเป็นค่าจาก project lab เพียงตัวเดียว

## 7. Alerts-only budget และ Spend cap budget

[Budgets and alerts](https://docs.cloud.google.com/billing/docs/how-to/budgets) ช่วยติดตามค่าใช้จ่าย โดยเลือก scope และ threshold ได้ **Alerts-only budget ไม่ได้หยุดการใช้จ่ายอัตโนมัติ**

ตัวอย่างการฝึก: ตั้ง budget สำหรับ project lab แล้ว threshold 50%, 90%, 100% เพื่อรับ notification ค่าใช้จ่ายและ alert มี latency จึงยังต้อง cleanup resources หลังแล็บ

ถ้าจะใช้ Pub/Sub ของ alerts-only budget แจ้ง automation ให้หยุด/ปิด resource ต้องออกแบบเองและรู้ผลกระทบ ไม่ถือว่าการตั้ง alert อย่างเดียวได้ behavior นี้

**อัปเดตที่ต้องรู้:** เอกสารปัจจุบันมี [Spend cap budgets](https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps) แบบ **Preview** สำหรับ project/services ที่รองรับ สามารถ pause การใช้งานบริการตาม configuration เมื่อ cap ถูก enforce ได้ ต้องตรวจ supported services, reporting/enforcement delay และข้อจำกัดก่อนใช้ ไม่ใช่ hard cap แบบรับประกันว่าจะหยุดทุกค่าใช้จ่ายทุกบริการทันที

ณ วันที่ตรวจ เอกสารระบุ eligible API services เช่น Gemini API, Gemini Enterprise Agent Platform, Cloud Run และ Cloud Run functions โดย scope เป็นหนึ่ง project/หนึ่ง eligible service แบบรายเดือน ไม่ pause fixed usage ของ persistent compute/storage และ requests ที่กำลังทำงานอาจเสร็จพร้อมเกิดค่าใช้จ่ายต่อ ต้อง lift cap ตาม workflow เมื่อต้องการกลับมาใช้บริการ

โจทย์ที่พูดถึง budget แบบเดิม/alerts-only จึงตอบว่าแจ้งเตือน แต่ถ้าระบุ spend cap feature ให้ประเมินตาม feature นี้ อย่าจำคำตอบว่า “Google Cloud ไม่มี budget ที่หยุดบริการได้เลย”

## 8. Billing export กับ labels

Billing export ไป BigQuery ใช้วิเคราะห์ว่า project/service/SKU ใดมีค่าใช้จ่ายสูง และรวมกับ tags/labels ที่รองรับเพื่อจัดสรรค่าใช้จ่าย

ตัวอย่าง questions ที่ตอบได้:

- ค่า VM เพิ่มเพราะ machine type หรือจำนวนชั่วโมง?
- ค่า network transfer มาจาก region ใด?
- ค่า storage ลดลงจริงหลังเปลี่ยน class หรือ retrieval เพิ่มแทน?
- resource ที่ติด label `environment=lab` ยังมีค่าใช้จ่ายหลังจบแล็บหรือไม่?

Labels เป็น metadata สำหรับจัดกลุ่ม ไม่ใช่ network tags หรือ IAM secure tags ซึ่งมีหน้าที่ต่างกัน

## 9. Quota, limit และ capacity

| คำ | ความหมาย | วิธีแก้ที่เหมาะ |
|---|---|---|
| Quota | เพดานการใช้ทรัพยากร/API ตาม scope | ลดใช้หรือขอเพิ่มตามบริการ |
| System limit | ขีดจำกัดของระบบ/ผลิตภัณฑ์ | เปลี่ยนการออกแบบเมื่อเพิ่มไม่ได้ |
| Capacity | ทรัพยากรพร้อมใช้งานใน location ณ เวลานั้น | เปลี่ยน zone/type หรือใช้การสำรองที่เหมาะ |

**ตัวอย่าง:** ได้ quota GPU แล้วก็ยัง create ไม่ได้เพราะ zone ไม่มี capacity และมีเงินใน billing ไม่ได้แปลว่า quota ทุกชนิดไม่จำกัด

ก่อนขอเพิ่ม quota ดู error, scope, usage ปัจจุบัน และสิ่งที่ request ต้องใช้จริง Quota vCPU บางชนิดแยกตาม machine family/region ไม่ควรดูแค่รายการ global แล้วสรุป

## 10. ค่าใช้จ่ายที่คนมักลืม

VM หยุดแล้ว disk/snapshot/reserved IP บางประเภทอาจยังคิดเงิน Load balancer, NAT, logging ingestion, egress และ database ก็มีรูปแบบคิดเงินของตนเอง

คำว่า “ใช้ฟรี” ต้องตรวจ [Free program](https://cloud.google.com/free/docs/free-cloud-features), เงื่อนไข location/usage และ [pricing calculator](https://cloud.google.com/products/calculator) ปัจจุบัน ไม่ถือว่าทุก resource ใน lab เป็น free tier

ก่อน deploy ทำ 3 อย่าง: ประเมินค่าใช้จ่าย → จำกัด resource size/จำนวน → เตรียม cleanup ที่ตรวจได้ หลังจบตรวจ inventory เพราะลบแค่ VM ไม่ได้ลบ resource ที่สร้างแยกทั้งหมด

## 11. วิเคราะห์ error จาก CLI

| Error ลักษณะ | เริ่มตรวจ |
|---|---|
| `PERMISSION_DENIED` | active account, role, scope, policy |
| API disabled | service usage และ project ที่ request ใช้ |
| `QUOTA_EXCEEDED` | quota metric และ region/family |
| resource not found | project, region, zone, resource name |
| unsupported option | `gcloud ... --help`, installed version และ syntax |
| capacity exhausted | availability ของ location/type ไม่ใช่เพิ่ม Owner |

## ทบทวน

**ตั้ง alerts-only budget แล้วสร้าง VM ต่อได้ไหม?** ได้ถ้าสิทธิ์/quota/billing อนุญาต เพราะชนิดนี้เป็น alert ส่วน spend cap Preview ต้องตรวจ coverage และ enforcement ของ feature แยกกัน

**gcloud project A แต่ Console project B จะดู resource ไหน?** แต่ละ request ใช้ context ของช่องทางนั้น จึงต้องตรวจ context ก่อนทุกครั้ง

**สคริปต์ใน VM ควรใช้ user login ของคนดูแลหรือไม่?** ใช้ workload identity ที่กำหนดและ least privilege ตามงาน ลดการพึ่ง session/credential ของบุคคล

## เอกสารประกอบ

- [Configurations](https://docs.cloud.google.com/sdk/docs/configurations)
- [ADC](https://docs.cloud.google.com/docs/authentication/application-default-credentials)
- [Budgets](https://docs.cloud.google.com/billing/docs/how-to/budgets)
- [Billing export](https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery)
- [Quotas overview](https://docs.cloud.google.com/docs/quotas/overview)
