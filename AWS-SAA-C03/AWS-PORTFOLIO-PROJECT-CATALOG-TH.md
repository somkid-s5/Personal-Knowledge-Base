# 🛠️ AWS — 35 Project Workbooks (Portfolio Catalog)

> **เลือกทำตามเป้าหมาย ไม่ใช่ข้อกำหนดสอบ SAA-C03** — Project 00–34 เป็นโจทย์ฝึกสร้างระบบ/Portfolio; บางงานขั้นสูง เช่น EKS, Istio, SecOps, Platform และ Enterprise Architecture มีขอบเขตกว้างกว่าข้อสอบ

[🏠 AWS Hub](./README.md) · [📖 Module/Lab Map](./AWS-MODULE-LAB-PROJECT-MAP-TH.md) · [📚 Project Learning Path เดิม](./03-Hands-On-Projects/LEARNING_PATH.md)

## 🎯 วิธีเลือก Project

1. **เตรียมสอบ SAA:** อ่าน Modules 01–13 และทำ Labs ที่เหมาะ; Project เป็นตัวเลือก ไม่ใช่ checklist บังคับ
2. **ฝึก AWS จริง:** เริ่ม Project 00 แล้วเลือก Project 01–11 ตามหัวข้อที่ต้องการ
3. **สร้าง Portfolio:** เลือก Project 12–34 ตามระดับและผลงานที่จะนำเสนอ ไม่จำเป็นต้องทำครบทุกงาน
4. ทุก Project ต้องตรวจ IAM Permissions, Estimated Cost, Region, Cleanup และเกณฑ์ตรวจรับก่อนสร้าง Resource จริง

## 🗺️ Project Catalog — 00 ถึง 34

### Preparation & fundamentals (Project 00–05)

| Project | หัวข้อจากชื่อ Workbook | Modules ที่ช่วยทำความเข้าใจ |
|---|---|---|
| [Project 00](./03-Hands-On-Projects/project-00-preparation-setup/README.md) | preparation setup | [M01](./02-Architecture-Foundation/Module-01-Architecting-Fundamentals.md) |
| [Project 01](./03-Hands-On-Projects/project-01-s3-cloudfront/README.md) | s3 cloudfront | [M05](./02-Architecture-Foundation/Module-05-Storage.md), [M12](./02-Architecture-Foundation/Module-12-Edge-Services.md) |
| [Project 02](./03-Hands-On-Projects/project-02-linux-hardening/README.md) | linux hardening | [M02](./02-Architecture-Foundation/Module-02-Account-Security.md), [M04](./02-Architecture-Foundation/Module-04-Compute.md) |
| [Project 03](./03-Hands-On-Projects/project-03-flask-docker/README.md) | flask docker | [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 04](./03-Hands-On-Projects/project-04-bash-toolkit/README.md) | bash toolkit | [M08](./02-Architecture-Foundation/Module-08-Automation.md) |
| [Project 05](./03-Hands-On-Projects/project-05-monitoring/README.md) | monitoring | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md) |

### Infrastructure Architect (Project 06–11)

| Project | หัวข้อจากชื่อ Workbook | Modules ที่ช่วยทำความเข้าใจ |
|---|---|---|
| [Project 06](./03-Hands-On-Projects/project-06-3tier-architecture/README.md) | 3tier architecture | [M01](./02-Architecture-Foundation/Module-01-Architecting-Fundamentals.md), [M03](./02-Architecture-Foundation/Module-03-Networking-1.md), [M04](./02-Architecture-Foundation/Module-04-Compute.md), [M06](./02-Architecture-Foundation/Module-06-Database-Services.md), [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 07](./03-Hands-On-Projects/project-07-cicd-pipeline/README.md) | cicd pipeline | [M08](./02-Architecture-Foundation/Module-08-Automation.md) |
| [Project 08](./03-Hands-On-Projects/project-08-serverless-app/README.md) | serverless app | [M11](./02-Architecture-Foundation/Module-11-Serverless.md) |
| [Project 09](./03-Hands-On-Projects/project-09-container-security/README.md) | container security | [M02](./02-Architecture-Foundation/Module-02-Account-Security.md), [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 10](./03-Hands-On-Projects/project-10-cost-optimizer/README.md) | cost optimizer | [M05](./02-Architecture-Foundation/Module-05-Storage.md), [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md) |
| [Project 11](./03-Hands-On-Projects/project-11-multi-env-terraform/README.md) | multi env terraform | [M08](./02-Architecture-Foundation/Module-08-Automation.md) |

### Kubernetes / Mid-Level (Project 12–18)

| Project | หัวข้อจากชื่อ Workbook | Modules ที่ช่วยทำความเข้าใจ |
|---|---|---|
| [Project 12](./03-Hands-On-Projects/project-12-eks-prod/README.md) | eks prod | [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 13](./03-Hands-On-Projects/project-13-istio-mesh/README.md) | istio mesh | [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 14](./03-Hands-On-Projects/project-14-logging/README.md) | logging | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md) |
| [Project 15](./03-Hands-On-Projects/project-15-dr-system/README.md) | dr system | [M06](./02-Architecture-Foundation/Module-06-Database-Services.md), [M13](./02-Architecture-Foundation/Module-13-Backup-and-Recovery.md) |
| [Project 16](./03-Hands-On-Projects/project-16-advanced-network/README.md) | advanced network | [M03](./02-Architecture-Foundation/Module-03-Networking-1.md), [M10](./02-Architecture-Foundation/Module-10-Networking-2.md) |
| [Project 17](./03-Hands-On-Projects/project-17-secrets-mgmt/README.md) | secrets mgmt | [M02](./02-Architecture-Foundation/Module-02-Account-Security.md) |
| [Project 18](./03-Hands-On-Projects/project-18-finops-dashboard/README.md) | finops dashboard | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md), [M08](./02-Architecture-Foundation/Module-08-Automation.md) |

### Platform / Senior (Project 19–25)

| Project | หัวข้อจากชื่อ Workbook | Modules ที่ช่วยทำความเข้าใจ |
|---|---|---|
| [Project 19](./03-Hands-On-Projects/project-19-backstage-idp/README.md) | backstage idp | [M08](./02-Architecture-Foundation/Module-08-Automation.md), [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 20](./03-Hands-On-Projects/project-20-multi-region/README.md) | multi region | [M04](./02-Architecture-Foundation/Module-04-Compute.md), [M13](./02-Architecture-Foundation/Module-13-Backup-and-Recovery.md) |
| [Project 21](./03-Hands-On-Projects/project-21-security-compliance/README.md) | security compliance | [M02](./02-Architecture-Foundation/Module-02-Account-Security.md) |
| [Project 22](./03-Hands-On-Projects/project-22-chaos-engineering/README.md) | chaos engineering | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md), [M13](./02-Architecture-Foundation/Module-13-Backup-and-Recovery.md) |
| [Project 23](./03-Hands-On-Projects/project-23-ml-infra/README.md) | ml infra | [M04](./02-Architecture-Foundation/Module-04-Compute.md), [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 24](./03-Hands-On-Projects/project-24-event-driven/README.md) | event driven | [M11](./02-Architecture-Foundation/Module-11-Serverless.md) |
| [Project 25](./03-Hands-On-Projects/project-25-zero-trust/README.md) | zero trust | [M02](./02-Architecture-Foundation/Module-02-Account-Security.md), [M03](./02-Architecture-Foundation/Module-03-Networking-1.md) |

### Enterprise / Staff (Project 26–30)

| Project | หัวข้อจากชื่อ Workbook | Modules ที่ช่วยทำความเข้าใจ |
|---|---|---|
| [Project 26](./03-Hands-On-Projects/project-26-migration-framework/README.md) | migration framework | [M01](./02-Architecture-Foundation/Module-01-Architecting-Fundamentals.md), [M08](./02-Architecture-Foundation/Module-08-Automation.md), [M13](./02-Architecture-Foundation/Module-13-Backup-and-Recovery.md) |
| [Project 27](./03-Hands-On-Projects/project-27-gitops-enterprise/README.md) | gitops enterprise | [M08](./02-Architecture-Foundation/Module-08-Automation.md), [M09](./02-Architecture-Foundation/Module-09-Containers.md) |
| [Project 28](./03-Hands-On-Projects/project-28-observability-platform/README.md) | observability platform | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md) |
| [Project 29](./03-Hands-On-Projects/project-29-finops-maturity/README.md) | finops maturity | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md), [M08](./02-Architecture-Foundation/Module-08-Automation.md) |
| [Project 30](./03-Hands-On-Projects/project-30-cloud-native-secops/README.md) | cloud native secops | [M02](./02-Architecture-Foundation/Module-02-Account-Security.md), [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md) |

### Architect / Capstone (Project 31–34)

| Project | หัวข้อจากชื่อ Workbook | Modules ที่ช่วยทำความเข้าใจ |
|---|---|---|
| [Project 31](./03-Hands-On-Projects/project-31-hybrid-networking/README.md) | hybrid networking | [M10](./02-Architecture-Foundation/Module-10-Networking-2.md) |
| [Project 32](./03-Hands-On-Projects/project-32-cost-optimization-sp/README.md) | cost optimization sp | [M05](./02-Architecture-Foundation/Module-05-Storage.md), [M08](./02-Architecture-Foundation/Module-08-Automation.md) |
| [Project 33](./03-Hands-On-Projects/project-33-advanced-observability/README.md) | advanced observability | [M07](./02-Architecture-Foundation/Module-07-Monitoring-and-Scaling.md) |
| [Project 34](./03-Hands-On-Projects/project-34-full-architecture/README.md) | full architecture | [M01](./02-Architecture-Foundation/Module-01-Architecting-Fundamentals.md), [M13](./02-Architecture-Foundation/Module-13-Backup-and-Recovery.md) |

## 🛡️ ข้อควรระวัง

- Workbooks เป็นเอกสารฝึก ไม่ใช่หลักฐานว่าได้รัน Project จริงหรือผ่านการรีวิว Portfolio แล้ว
- บาง Project ใช้บริการที่อาจมีค่าใช้จ่ายต่อชั่วโมง/ปริมาณใช้งาน และบางตัวมีความซับซ้อนเกิน SAA
- ให้แยกผลการทดลอง (Evidence/Results) ออกจาก Tutorial และเก็บข้อมูลลับไว้ในระบบที่เหมาะสม ไม่ใส่ใน Public Repository
