# Module 06 — Cloud Storage & Data Protection

[สารบัญ](./README.md) · [ก่อนหน้า](./Module-05-Compute-Engine-and-Instance-Groups.md) · [ถัดไป](./Module-07-Databases-and-Data-Services.md)

## 1. Object, block และ file storage

| รูปแบบ | วิธีมองข้อมูล | Google Cloud ตัวอย่าง | เหมาะกับ |
|---|---|---|---|
| Object | object name + bytes + metadata | Cloud Storage | backup, media, static assets, data lake |
| Block | block device ให้ OS สร้าง filesystem | Persistent Disk / Hyperdisk | VM boot/data disks |
| File | filesystem ที่แชร์ตาม protocol | Filestore / NetApp Volumes | workload ที่ต้อง file semantics/shared file |

ตัวอย่าง app เขียนไฟล์แบบ rename/lock/random write ตาม POSIX ไม่ควรถือว่าเอา object storage มาต่อแล้ว behavior เหมือน filesystem ทุกด้าน แม้มี connector/FUSE ต้องตรวจ semantic/performance ของ connector

## 2. Bucket และ object

Bucket เป็น container ของ objects มี location, default storage class, access/protection settings ส่วน object มี name/data/metadata และ generation สำหรับระบุเวอร์ชันข้อมูล

Bucket name ต้องไม่ชนใน global namespace อย่าใส่ secret/ข้อมูลส่วนตัวในชื่อ เช่น password หรือเลขบัตร ชื่อ project กับชื่อ bucket ไม่จำเป็นต้องเหมือนกัน

Object ที่ชื่อ `reports/2026/oct.csv` ไม่ได้พิสูจน์ว่าเป็น directory บน disk ธรรมดา Google Cloud มี hierarchical namespace และ managed folder capabilities ในรูปแบบที่รองรับ ให้ตรวจชนิด bucket แทนเหมารวมว่าทุก bucket เหมือนกัน

## 3. Location ไม่ใช่ storage class

**Location** เลือกว่าข้อมูลจัดเก็บในพื้นที่ใด **Class** เลือกโมเดลค่าเก็บ/การเข้าถึงข้อมูล

ตัวอย่าง bucket region เดียวใช้ Archive ได้ หรือ bucket dual-region ใช้ Standard ได้ สอง field นี้ตอบโจทย์คนละด้าน

เลือก location จาก latency, data residency, redundancy และค่า transfer ไม่ถือว่า multi-region เป็น backup ป้องกันคนลบ เพราะการลบที่ถูกต้องตาม API ยังมีผลต่อข้อมูล

## 4. Storage classes

ตาม [Storage classes](https://docs.cloud.google.com/storage/docs/storage-classes):

| Class | ลักษณะการใช้งาน | Minimum storage duration |
|---|---|---:|
| Standard | ใช้บ่อย/ข้อมูลที่เข้าถึงบ่อย | ไม่มี minimum duration แบบอีกสาม class |
| Nearline | ใช้ไม่บ่อย ประมาณรายเดือน | 30 วัน |
| Coldline | ใช้ไม่บ่อย ประมาณรายไตรมาส | 90 วัน |
| Archive | ใช้ไม่บ่อยมาก/เก็บระยะยาว | 365 วัน |

Class เย็นกว่าค่าเก็บต่อหน่วยมักต่ำกว่า แต่มี access/retrieval และ early deletion considerations ไม่ควรเลือกจากราคาเก็บอย่างเดียว

**จุดต่างจากความรู้ AWS:** Cloud Storage Archive ไม่ได้มีขั้นตอนรอ thaw หลายชั่วโมงแบบบางบริการ archival อื่น การเลือก class จึงต้องพิจารณาต้นทุนและเงื่อนไขจริงของ Google Cloud

## 5. ตัวอย่างคิดต้นทุน

เก็บ log 1 TB แต่ query ทุกวัน: Archive อาจทำให้ค่าดึง/operation สูงขึ้นและไม่ตรง access pattern แม้ค่า storage ต่ำ

เก็บ backup 1 ปีแต่ลบหลัง 7 วัน: ต้องคิด minimum duration/early deletion ไม่ใช่เอาราคา 7 วันคูณอย่างเดียว

สูตรคิดเชิงแนวคิด:

`total cost ≈ storage + operations + retrieval + data transfer + protection copies/retained data`

ไม่มีราคาตัวเลขตายตัวในบทนี้ เพราะ region, class, usage และ product terms เปลี่ยนได้ ใช้ [pricing](https://cloud.google.com/storage/pricing) ณ เวลาตัดสินใจ

## 6. IAM และ public access

Uniform bucket-level access (UBLA) ทำให้จัด object access ผ่าน IAM โดยปิดกลไก ACL ตาม behavior ของบริการ ช่วยลดการมีสองระบบ permission ซ้อนกัน

Public access prevention ช่วยป้องกันการให้ public access ผ่าน principal สาธารณะ แต่ไม่แทน role ของ authorized users/workloads

| Role ตัวอย่าง | ภาพรวม |
|---|---|
| Storage Object Viewer | อ่าน/list objects ตาม permissions |
| Storage Object Creator | สร้าง objects โดยไม่มีสิทธิ์ทั่วไปในการอ่าน/ลบ/overwrite |
| Storage Object Admin | จัดการ objects ตาม role |
| Storage Admin | กว้าง รวมการดูแล storage resources |

Grant ใน bucket ที่ต้องใช้แคบกว่า grant project สำหรับทุก bucket หาก app ต้องอ่านเพียง bucket เดียว เริ่มที่ resource scope นั้น

Signed URL ให้สิทธิ์ชั่วคราวต่อ operation ที่ลงลายเซ็นตามเวลา/เงื่อนไข ไม่ต้องทำ bucket public แต่ URL เป็น bearer capability: ใครถือ URL อาจใช้ได้ตามขอบเขต จึงป้องกันการเผยแพร่

## 7. Lifecycle ไม่ใช่ backup

Lifecycle rules ทำงานตามเงื่อนไข เช่น age แล้ว `SetStorageClass` หรือ `Delete` โดยทำ asynchronously ไม่รับประกันเวลานาทีที่แน่นอน

ตัวอย่าง config เพื่ออ่านแนวคิด:

```json
{
  "rule": [
    {"action": {"type": "SetStorageClass", "storageClass": "NEARLINE"}, "condition": {"age": 30}},
    {"action": {"type": "Delete"}, "condition": {"age": 180}}
  ]
}
```

ถ้ามี versioning, retention หรือ soft delete ผลและค่าใช้จ่ายต้องพิจารณาร่วมกัน ไฟล์นี้ไม่ได้สั่งให้ apply policy กับ bucket production

Autoclass เป็นอีกทางเลือกที่ให้ระบบจัดการ class ตาม behavior ของ feature ตรวจเงื่อนไขและค่าธรรมเนียมก่อนเลือก ไม่ควรตั้ง lifecycle ที่ขัดกับ configuration ที่รองรับ

## 8. Versioning, soft delete, retention

| กลไก | ตอบโจทย์อะไร | สิ่งที่ไม่ได้ทำแทน |
|---|---|---|
| Object Versioning | เก็บ noncurrent generations เมื่อข้อมูลเปลี่ยนตามเงื่อนไข | ไม่ใช่สิทธิ์ห้ามลบทุกเวอร์ชัน |
| Soft delete | ช่วยกู้ข้อมูลที่ถูกลบใน retention window | ไม่ใช่การเก็บถาวรโดยไม่มีค่าใช้จ่าย |
| Retention policy / object retention | ป้องกันการลบก่อนเวลาที่กำหนดตาม mode | ไม่ใช่ข้อมูลสำรองแยกอิสระ |
| Independent backup/copy | recovery จากเหตุที่กำหนด | ไม่แทน access control |

[Soft delete](https://docs.cloud.google.com/storage/docs/soft-delete) มี configuration/defaults ที่ต้องตรวจจริงจาก bucket อย่าจำว่า “ลบ bucket แล้วข้อมูลหมดและไม่คิดเงินทันที”

Retention lock บางแบบย้อนกลับไม่ได้ จึงไม่ทดลอง lock บน bucket สำคัญเพื่อแค่เรียนรู้ ใช้ bucket lab และอ่าน behavior ก่อน

## 9. Transfer และ upload

```bash
gcloud storage cp ./report.csv gs://BUCKET_NAME/reports/report.csv
gcloud storage ls gs://BUCKET_NAME/reports/
gcloud storage cp gs://BUCKET_NAME/reports/report.csv ./downloaded.csv
```

ใช้ `gcloud storage` เป็นตัวอย่างหลัก ปัจจุบันยังอาจเจอแล็บเก่าใช้ `gsutil` ให้เข้าใจ action แทนจำว่าเครื่องมือสองตัวเป็นคนละ storage service

การย้ายข้อมูลจำนวนมากพิจารณา Storage Transfer Service สำหรับแหล่ง/ปลายทางที่รองรับ พร้อม schedule/integrity/permissions; การใช้ CLI copy ทีละไฟล์ไม่ใช่คำตอบเดียว

## 10. Filestore, NetApp Volumes, Managed Lustre

| บริการ | ความต้องการหลัก |
|---|---|
| Filestore | managed NFS file storage สำหรับ workload ที่รองรับ |
| NetApp Volumes | managed file storage/features ที่เหมาะกับ enterprise workloads; protocol ขึ้นกับ service configuration |
| Managed Lustre | high-performance parallel file workloads เช่น HPC/AI ตามบริการที่รองรับ |

ถ้าโจทย์มีคำว่า shared filesystem/legacy file application ให้ถาม protocol, throughput, locking, location และ client compatibility ก่อนเลือก object storage เพราะราคาถูกกว่า

## 11. Recovery checklist

1. ต้องกู้เวอร์ชันใด หรือทั้ง bucket?
2. ข้อมูลอยู่ generation/version/soft-deleted state แบบไหน?
3. Policy อนุญาต restore/delete หรือไม่?
4. Caller และ runtime identity มีสิทธิ์อะไร?
5. Restore ไป isolated location ก่อนเพื่อตรวจ consistency
6. ทดสอบ application อ่านข้อมูลจริงได้
7. ตรวจค่า retained data และ lifecycle หลัง recovery

## ทบทวน

**ไฟล์ไม่ค่อยอ่านแต่ต้องดาวน์โหลดได้ทันที:** class เย็นของ Google Cloud ยังเข้าถึงได้ตามบริการ ไม่เลือกจากสมมติฐานว่าต้องรอ thaw

**ต้องให้ app อัปโหลดแต่ห้ามอ่านไฟล์เก่า:** เริ่มพิจารณา Object Creator และตรวจ permission/overwrite requirement

**เปิด versioning แล้วค่าเก็บเพิ่ม:** ตรวจ noncurrent objects และ lifecycle; ลบ current object ไม่ได้แปลว่าข้อมูลเวอร์ชันอื่นหายหมด

## เอกสารประกอบ

- [Storage classes](https://docs.cloud.google.com/storage/docs/storage-classes)
- [Lifecycle](https://docs.cloud.google.com/storage/docs/lifecycle)
- [Soft delete](https://docs.cloud.google.com/storage/docs/soft-delete)
- [Uniform access](https://docs.cloud.google.com/storage/docs/uniform-bucket-level-access)
- [Public access prevention](https://docs.cloud.google.com/storage/docs/public-access-prevention)
- [Storage Transfer Service](https://docs.cloud.google.com/storage-transfer/docs/overview)
