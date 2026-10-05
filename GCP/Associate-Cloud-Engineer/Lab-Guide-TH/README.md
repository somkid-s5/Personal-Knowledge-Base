# Lab Guide ภาษาไทย — ACE Companion Labs

[กลับสารบัญหลัก](../README.md)

แล็บ 5 ตัวนี้เป็น Companion Labs ที่ออกแบบเพื่อทดลองแนวคิดในโน้ต ไม่ใช่คำแปล/เฉลยของแล็บ Google Skills และไม่ได้ใช้ grading tasks ของคอร์ส จึง **ไม่ครอบคลุม official labs ทั้ง Learning Path**

ดู [แผนที่ Learning Path → Labs](./LEARNING-PATH-LAB-MAP.md) เพื่อเทียบกิจกรรมทั้ง 17 รายการกับ Companion Labs ว่าหัวข้อใดใกล้เคียงและหัวข้อใดยังไม่มีคู่มือเฉพาะ

## เลือกทำตามลำดับ

| Lab | สิ่งที่จะทำ | อ่านก่อน | เวลาโดยประมาณ |
|---:|---|---|---|
| 01 | [Cloud Shell + bucket + SA impersonation](./Lab-01-Cloud-Shell-Storage-and-IAM.md) | 01–03, 06 | 30–45 นาที |
| 02 | [Private VM + OS Login + IAP + NAT](./Lab-02-Private-VM-IAP-and-NAT.md) | 04–05 | 45–60 นาที |
| 03 | [Authenticated Cloud Run + revisions](./Lab-03-Cloud-Run-Revisions-and-Logs.md) | 02, 09, 11 | 30–45 นาที |
| 04 | [GKE Deployment + Service + debugging](./Lab-04-GKE-Deployment-and-Debugging.md) | 08 | 45–75 นาที รวมเวลาสร้าง cluster |
| 05 | [Terraform VPC + plan + destroy](./Lab-05-Terraform-VPC-and-State.md) | 12 | 30–45 นาที |

## Environment และค่าใช้จ่าย

ใช้ **Bash ใน Cloud Shell** และ project lab ที่ได้รับอนุญาตเท่านั้น ตรวจ account/project ก่อนทำทุกไฟล์ ค่าตัวอย่าง region/zone ไม่ใช่ข้อบังคับ หากใช้ Google Skills Lab ให้ใช้ค่าและ permission ของแล็บจริง และหยุดส่วนที่ไม่อยู่ในขอบเขตแล็บนั้น

VM/disks/NAT/GKE/Cloud Run/storage/logging มีค่าใช้จ่ายได้ GKE ไม่ใช่แล็บที่สมมติว่าฟรี ส่วน NAT คิดค่าใช้จ่ายตามบริการ แม้ VM ตัวอย่างเล็กก็ยังมี disk/network charges ได้

**Alerts-only budget** ไม่หยุดใช้จ่าย; Spend cap budgets Preview จำกัดเฉพาะบริการ/ขอบเขตที่รองรับและไม่หยุด persistent resource charges ทุกอย่าง ดูบท 03 จึงต้องทำ cleanup และตรวจ resources ที่เหลือ

## ก่อนเริ่มทุกครั้ง

```bash
gcloud auth list
gcloud config get-value project
gcloud config list
```

- ใช้ account/project lab ที่ถูกต้อง
- Billing/API/quota พร้อมสำหรับ lab นั้น
- ไม่มี resources ชื่อเดียวกันจากงานอื่น; ถ้ามีให้เปลี่ยน prefix ทั้งแล็บ
- มี permissions ที่ระบุ ไม่แก้โดย grant Owner ให้ทุกตัวตน
- เก็บเวลาทดลองและผลที่ได้ โดยไม่เก็บ token/key ลงโน้ต

## สถานะการตรวจแล็บ

คำสั่งตรวจรูปแบบกับเอกสารทางการและตรวจ code blocks แบบ static แล้ว แต่ **ยังไม่ได้รัน provisioning บนบัญชี Google Cloud จริง** ในการจัดทำโน้ตนี้ Expected results เป็นสิ่งที่ควรเห็นเมื่อ environment ผ่าน prerequisites ไม่ใช่รายงานว่ามี resources ถูกสร้างแล้ว

ถ้า error ให้ใช้ troubleshooting ในแต่ละไฟล์ พร้อมตรวจ `gcloud ... --help` ตาม installed version และ policy ของ environment
