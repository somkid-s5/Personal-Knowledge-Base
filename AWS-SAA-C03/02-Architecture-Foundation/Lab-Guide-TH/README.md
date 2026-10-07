# Architecting on AWS 7.12.4 — Lab Guide ภาษาไทย 🧪

คู่มือทำ Lab ภาษาไทยที่แปลงจาก **Architecting on AWS 7.12.4 (EN) — Lab Guide**

## รูปแบบของชุดนี้

- คำอธิบายและขั้นตอน → **ภาษาไทย**
- ชื่อ AWS services / Console menu / button / field / status → **คงภาษาอังกฤษ** เพื่อกดตามหน้าจอจริงได้
- CLI commands / JSON policies / User Data / CloudFormation parameter names → **คงรูปแบบเดิม**
- ตัด copyright, marketing, Additional resources, icon legend และข้อความประกอบที่ไม่จำเป็นต่อการทำ Lab
- Optional Tasks ที่ยังเป็นส่วนหนึ่งของ Lab จะเก็บไว้และระบุว่า Optional ชัดเจน

> ใช้คู่มือนี้สำหรับกดตาม AWS Builder Lab ได้โดยตรง หาก Console เปลี่ยน UI เล็กน้อย ให้ยึดชื่อ service/field ภาษาอังกฤษเป็นหลัก

---

## Labs

| Lab | หัวข้อ | Source pages | คู่มือไทย |
|---:|---|---:|---|
| 1 | Exploring and Interacting with the AWS Management Console and AWS CLI | 4–18 | [เปิด Lab 1](./Lab-01-Console-and-CLI-TH.md) |
| 2 | Building your Amazon VPC Infrastructure | 19–52 | [เปิด Lab 2](./Lab-02-Building-VPC-Infrastructure-TH.md) |
| 3 | Creating a Database Layer in Your Amazon VPC Infrastructure | 53–68 | [เปิด Lab 3](./Lab-03-Database-Layer-TH.md) |
| 4 | Configure High Availability in Your Amazon VPC | 69–93 | [เปิด Lab 4](./Lab-04-High-Availability-TH.md) |
| 5 | Build a Serverless Architecture | 94–117 | [เปิด Lab 5](./Lab-05-Serverless-Architecture-TH.md) |
| 6 | Configure an Amazon CloudFront Distribution with an Amazon S3 Origin | 118–145 | [เปิด Lab 6](./Lab-06-CloudFront-S3-Origin-TH.md) |
| 7 | Capstone Lab | 146–182 | [เปิด Lab 7](./Lab-07-Capstone-TH.md) |

---

## เส้นทางของ Lab ทั้งคอร์ส

```text
Lab 1 — Console / CLI / S3
   ↓
Lab 2 — VPC / Subnets / IGW / NAT / EC2
   ↓
Lab 3 — Aurora / ALB / Target Group
   ↓
Lab 4 — Auto Scaling / Multi-AZ / Failover
   ↓
Lab 5 — S3 → SNS → SQS → Lambda
   ↓
Lab 6 — CloudFront + S3 + OAC
   ↓
Lab 7 — Capstone: CloudFormation + Aurora + EFS + ALB + Auto Scaling + WordPress
```

---

## ค่าจาก Builder Lab ที่ต้องระวัง

หลาย Lab มีค่าที่สร้างเฉพาะ session/account และต้อง copy จากด้านซ้ายของหน้าคำสั่ง เช่น:

- `LabRegion`
- `RemoteRegion`
- `LabPassword`
- `DBClusterParameterGroup`
- `Task1TemplateUrl`
- `Task5TemplateUrl`
- `CreateThumbnailZIPLocation`
- `CreateMobileImageZIPLocation`
- `LabBucketName`
- `DestinationBucketName`
- `LabCloudFrontDistributionDNS`

อย่าแทนค่าเหล่านี้จากตัวอย่างในคู่มือ เพราะค่าจริงอาจต่างกันในแต่ละ Lab session

---

[← กลับไป Architecting on AWS Study Notes](../README.md)
