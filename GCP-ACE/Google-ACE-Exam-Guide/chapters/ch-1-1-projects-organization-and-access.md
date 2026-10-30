# Chapter 1.1 — Projects, organization and access

> **Status: draft, not verified.** อ้างอิง Exam Guide (30 มิ.ย. 2026), technical docs ตรวจเบื้องต้น 30 ต.ค. 2026. ยังไม่มี Diagram Design Skill ที่เรียกใช้ได้ในเซสชันนี้ จึงเว้น Architecture Diagram โดยไม่ใช้ Mermaid แทน

## 1. Objective mapping

Chapter นี้รับผิดชอบ bullet **1.1.01 ถึง 1.1.12** ใน [coverage matrix](../coverage-matrix.md): resource hierarchy, organization policies, project IAM, Cloud Identity users/groups, API enablement, initial Observability, quotas, standalone organizations, initial networking, regions/zones, Cloud Asset Inventory + Gemini Cloud Assist และ Workforce Identity Federation

## 2. คำศัพท์จำเป็น

| คำศัพท์ | ความหมายในการทำงาน |
|---|---|
| Organization | ขอบเขตบริหารสูงสุดสำหรับทรัพยากรขององค์กร |
| Folder | ชั้นจัดกลุ่ม project และสืบทอดนโยบาย |
| Project | หน่วยหลักสำหรับ resource, API และการจัดการต้นทุน |
| Principal | ตัวตนที่ขอเข้าถึง resource เช่น user หรือ service account |
| Role | ชุด permissions; ไม่ใช่ตัวตน |
| IAM allow policy | ผูก principal กับ role ณ scope ของ resource |
| Organization Policy | ข้อกำหนดควบคุมการใช้ทรัพยากร ไม่ใช่ IAM role |
| Quota | ขีดจำกัดการใช้ resource/API; ไม่ใช่คำรับประกัน capacity |
| Workforce Identity Federation | ให้คนจาก external identity provider เข้าถึง Google Cloud โดยไม่ต้องสร้าง Google user แยกทุกคน |
| Cloud Asset Inventory | ค้นหาและติดตาม metadata ของ cloud resources ใน scope ที่มีสิทธิ์ |

## 3. แนวคิดหลัก

### 3.1 Project สำคัญอย่างไร

คิดว่า **Project คือขอบเขตการทำงาน ไม่ใช่แค่โฟลเดอร์**: ในโปรเจกต์หนึ่งเราเปิด APIs, จัด resource, จัด IAM และผูก billing ได้ การแยก production กับ development คนละโปรเจกต์ช่วยแยกการจัดการสิทธิ์และต้นทุน แต่ไม่ได้หมายความว่า network ระหว่างโปรเจกต์จะเชื่อมกันโดยอัตโนมัติ

Organization, Folder และ Project ทำหน้าที่ต่างกัน: organization กำหนด governance; folder จัดกลุ่มตามทีม/สภาพแวดล้อมและสืบทอดนโยบาย; project เป็นที่อยู่ของ workload ส่วน resource นั้นอยู่ใต้ project และมี scope ของบริการเอง เช่น VM ระดับ zone และ VPC ระดับ global

**[Diagram pending]** Resource hierarchy + inherited policies: ต้องสร้างด้วย Diagram Design Skill, ส่งภาพไปยัง `../assets/diagrams/`, เก็บไฟล์ต้นฉบับถ้ามี และทดสอบ relative links ก่อน publish

### 3.2 Organization Policy กับ IAM ต่างกัน

สมมติทีม Platform ต้องบังคับให้สร้าง VM เฉพาะภูมิภาคที่อนุญาต ข้อกำหนดประเภทนี้เป็นเรื่อง **organization policy** ไม่ใช่การ grant IAM role. IAM ตอบว่า *ใครทำอะไรได้กับ resource ใด* ส่วน org policy จำกัดว่าทรัพยากรจะกำหนดค่าอะไรได้ แม้ principal จะมี permission สร้าง resource ก็ยังติด org policy ได้

**Policy inheritance:** นโยบาย/สิทธิ์จาก parent scope ส่งผลต่อลูก แต่การประเมินจริงขึ้นกับ policy type และ constraint ต้องอ่าน effective policy ไม่ใช่ดูเฉพาะหน้าของ project

### 3.3 Authentication, IAM, API และ Quota คือคนละด่าน

เมื่อ `gcloud` รายงาน permission denied ให้ตรวจตามลำดับ: account ที่ active, project ที่เลือก, API ที่เปิดใช้, IAM permission ที่ต้องใช้, org policy และ resource scope. หาก error เป็น quota exceeded ให้ตรวจ quota และ usage; การเพิ่ม IAM role ไม่ได้เพิ่ม quota. ถ้าบริการไม่มีใน region ที่เลือก การเพิ่ม quota ก็ไม่ทำให้มันพร้อมใช้งานใน region นั้น

### 3.4 Cloud Identity และ Workforce Federation

Cloud Identity ใช้จัดการ identities และ groups ขององค์กร โดยการใส่คนเข้ากลุ่มแล้ว grant สิทธิ์ให้กลุ่มช่วยลดการจัดการ role รายบุคคล. สำหรับพนักงานที่ login ผ่าน IdP ภายนอก เช่น Microsoft Entra ID, Workforce Identity Federation อาจเหมาะกว่า provisioning identities แบบแยกกันทั้งหมด; ต้องมี organization, workforce pool, provider, mapping และ IAM ตามที่ออกแบบ. **Workforce** มุ่งไปที่มนุษย์ ส่วน **Workload Identity Federation** ใช้กับ workload ภายนอก และอยู่ใน Chapter 4.2

### 3.5 Observability ตั้งแต่ต้นโครงการ

ก่อนเปิดระบบให้เลือกสัญญาณที่จะติดตาม เช่น error rate, latency และ quota usage; วาง alert routing และ log retention. Google Cloud Observability เป็นกลุ่มผลิตภัณฑ์ ไม่ใช่การเปิด API เพียงตัวเดียวแล้ว monitoring พร้อมทันที. การวาง logging/monitoring เป็นส่วนหนึ่งของ project setup เพื่อลด blind spot ตอนเกิด incident; รายละเอียดและคำสั่งอยู่ใน Chapter 3.4 ซึ่งเป็นเจ้าของเรื่อง operation.

### 3.6 สถานที่ให้บริการ

อย่าสับสนว่า project ต้องอยู่ใน region เดียว: **Project เป็น global administrative scope** แต่บริการบางชนิดให้เลือก region/zone ที่รองรับจริงก่อน deploy. ตรวจ availability, quota ตาม location และ dependency ของบริการ เช่น VM กับ disk ก่อนเลือก design. อย่าสรุปว่า Google Cloud product ทุกตัวเปิดได้ทุก region

### 3.7 Cloud Asset Inventory กับ Gemini Cloud Assist

Cloud Asset Inventory ใช้ search inventory ข้ามขอบเขตที่มีสิทธิ์ เช่น projects, folders หรือ organization. Gemini Cloud Assist ช่วยวิเคราะห์และแนะนำ แต่คำตอบ AI ต้องตรวจเทียบกับข้อมูล resource, policy และ official docs เสมอ โดยเฉพาะก่อนคำสั่งเปลี่ยนแปลง production

## 4. Decision table

| สถานการณ์ | ใช้ | ไม่ใช่คำตอบหลัก | ข้อควรระวัง |
|---|---|---|---|
| แยกต้นทุนและสิทธิ์ production/dev | Separate projects | เปลี่ยนชื่อ VM | วาง billing และ network แยก |
| บังคับ location ของทรัพยากร | Organization Policy | Grant Owner | ตรวจ policy ที่ inherited |
| เปิด service เพื่อให้ project เรียก API ได้ | Service Usage | IAM role อย่างเดียว | ต้องมี IAM สำหรับการใช้งาน |
| คนจาก IdP ภายนอกต้องเข้าถึง console | Workforce Identity Federation | Workload federation | ต้องตั้งค่าฝั่ง IdP และ IAM |
| ค้นหา metadata ของหลายโปรเจกต์ | Cloud Asset Inventory | Console เปิดทีละ VM | สิทธิ์กำหนดขอบเขตที่ค้นได้ |
| ขอใช้ VM เพิ่มแล้วถูกจำกัด | Check quota and capacity | Grant Editor | Quota increase ไม่รับประกัน capacity |

## 5. CLI workbook: create, update, inspect, delete

ตัวอย่างใช้ placeholders เท่านั้น **ยังไม่ได้ execute จริง**. ต้องมี Google Cloud CLI, สิทธิ์เหมาะสม และโครงการ sandbox ที่ได้รับอนุญาต. การสร้าง resource หรือเปิด API อาจนำไปสู่ค่าใช้จ่ายเมื่อใช้งานบริการ

```bash
# inspect: ตรวจ account และ project ก่อนทุกคำสั่ง
gcloud auth list
gcloud config get-value project
gcloud projects describe PROJECT_ID
gcloud services list --enabled --project=PROJECT_ID

# create: ต้องมี resourcemanager.projects.create บน parent
gcloud projects create PROJECT_ID --name="ACE Sandbox" --organization=ORGANIZATION_ID

# update: เปิด API ต้องมี serviceusage.services.enable
gcloud services enable compute.googleapis.com --project=PROJECT_ID

# update IAM: ต้องมีสิทธิ์แก้ project IAM policy
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="group:cloud-operators@example.com" \
  --role="roles/compute.viewer"

# inspect inventory: ต้องมี cloudasset.assets.searchAllResources บน scope
gcloud asset search-all-resources --scope="projects/PROJECT_ID" --limit=10

# inspect: ตรวจผลหลังเปลี่ยนแปลง
gcloud projects get-iam-policy PROJECT_ID
gcloud services list --enabled --project=PROJECT_ID
```

**ตัวอย่างผลที่คาดหวัง (illustrative, ไม่ใช่ output จริง):**
```text
# gcloud config get-value project
PROJECT_ID
# gcloud services list --enabled ...
NAME                    TITLE
compute.googleapis.com  Compute Engine API
```

**Cleanup:** หากแค่ฝึกเพิ่ม IAM ให้ใช้ `gcloud projects remove-iam-policy-binding` กับ member/role เดิมหลังตรวจว่าระบบอื่นไม่ต้องใช้สิทธิ์นั้น. ไม่แนะนำ `projects delete` เป็นคำสั่ง cleanup อัตโนมัติ เพราะกระทบ resource และ billing ทั้งโปรเจกต์. ขั้นตอน shutdown/deletion ต้องตรวจ dependency และ backup ก่อน. **TODO:** เพิ่มตัวอย่างการตั้งค่า Organization Policy, standalone organization, Cloud Identity provisioning, Observability และ Workforce pool หลังตรวจขั้นตอน/permissions ครบกับ docs; ตัวอย่างข้างต้นจึงยังไม่ครอบคลุม command ของทุก bullet.

## 6. จุดพลาดบ่อย

1. เปิด API แล้วคิดว่าทุก user ใช้บริการนั้นได้ทันที
2. ใช้ basic roles ระดับ Owner/Editor เพื่อแก้ permission denied โดยไม่รู้ permission ที่ขาด
3. เข้าใจว่า quota increase = มี capacity ให้แน่นอน
4. เข้าใจว่า global VPC แปลว่า subnet และ VM เป็น global ด้วย
5. สลับ Workforce (human identities) กับ Workload (application identities)
6. ดู project-level IAM policy แล้วสรุปว่าไม่มี inherited permission จาก parent

## 7. Original exam practice (draft, 8 questions)

ทุกข้อเป็นโจทย์สร้างใหม่ ไม่ใช่ข้อสอบจริง. เลือกคำตอบตาม constraints. อ่านเฉลยหลังคิดเอง

**Q1 (single):** บริษัทต้องแยก development และ production ด้าน IAM และรายงานต้นทุนเป็นราย environment โดยไม่ต้องมี organization ใหม่ ควรทำอย่างไร? A. ใช้ VM labels อย่างเดียว B. แยก projects C. ใช้คนละ region อย่างเดียว D. ใช้ service account เดียว. **ตอบ B.** A labels ไม่แยก IAM/billing boundary, C region ไม่แยก project governance, D ใช้ identity ร่วมทำให้แยกสิทธิ์ยาก

**Q2 (single):** User มี permission สร้าง VM แต่สร้างที่ region หนึ่งไม่ได้ เพราะองค์กรห้าม location นี้ ต้องแก้อะไร? A. เพิ่ม Viewer B. เพิ่ม quota อย่างเดียว C. ตรวจ organization policy constraint D. เปลี่ยน account billing. **ตอบ C.** A เป็น read-only, B ไม่เปลี่ยน org policy, D billing ไม่แก้ constraint ของ location

**Q3 (multiple, choose two):** ทีมเปิด Compute Engine API แล้วแต่ผู้ใช้ยังสร้าง VM ไม่ได้ อยากตรวจสาเหตุด้วยหลัก least privilege ควรทำอะไร? A. ตรวจ active identity/project B. มอบ Owner ทันที C. ตรวจ required IAM permissions และ org policy D. ลบ project E. เปลี่ยนชื่อ VM. **ตอบ A,C.** B กว้างเกินจำเป็น; D ทำลาย resource; E ไม่แก้ permission

**Q4 (single):** พนักงานบริษัทใช้ external IdP และต้องเข้าถึง Google Cloud Console โดยไม่สร้าง Google identities เป็นรายคน ควรประเมินอะไร? A. Workforce Identity Federation B. Workload Identity Federation C. Cloud NAT D. Cloud DNS. **ตอบ A.** B เน้น workload, C outbound translation, D DNS resolution

**Q5 (single):** ต้องค้นหา resource metadata หลาย project ภายใต้ organization เพื่อ audit และมี IAM ถูกต้อง ใช้อะไร? A. Cloud Asset Inventory B. Cloud NAT C. Persistent Disk snapshots D. Cloud Run revisions. **ตอบ A.** B network, C backup disk, D deployment version

**Q6 (multiple, choose two):** ทีมเพิ่ม limit ของ CPU แล้ว ยังสร้าง VM ใน zone เดิมไม่ได้ ควรพิจารณาอะไร? A. Zone capacity B. VM machine type availability ใน location นั้น C. เพิ่ม logging retention D. มอบ billing.viewer E. เปลี่ยน display name. **ตอบ A,B.** C, D, E ไม่แก้ resource placement/capacity

**Q7 (single):** กลุ่มผู้ดูแลต้องเห็น VM inventory แต่ไม่ควรแก้ instance ควรเริ่มที่แนวคิดไหน? A. ให้ Owner B. Grant compute.viewer role ที่ scope เหมาะสม C. Public bucket D. Disable IAM. **ตอบ B.** A เกินสิทธิ์, C ไม่เกี่ยวกับ Compute Engine, D ทำให้การควบคุมการเข้าถึงเสียหาย

**Q8 (multiple, choose two):** ก่อน deploy ระบบใหม่ใน region ที่ทีมยังไม่เคยใช้ ควรตรวจอะไร? A. Service regional availability B. Relevant quotas/location C. ว่าสามารถเปลี่ยน Project ID ภายหลังได้ D. เปิด public inbound ทุก port E. ว่าทุกบริการรองรับ global placement. **ตอบ A,B.** C ไม่ใช่เงื่อนไข deploy และ project ID เปลี่ยนไม่ได้, D เป็นความเสี่ยง, E เป็นการสมมติผิด

## 8. Closed-note recall

1. ต่างกันอย่างไรระหว่าง Organization Policy และ IAM allow policy?
2. Project ช่วยแยกต้นทุนและ governance อย่างไร และอะไรที่ *ไม่ได้* แยกอัตโนมัติ?
3. API enabled แล้ว permission denied ต้องเช็กชั้นใดบ้าง?
4. Workforce และ Workload Identity Federation มุ่งแก้โจทย์คนละแบบอย่างไร?
5. ทำไมการได้ quota เพิ่มไม่ได้ยืนยันว่า VM จะ launch สำเร็จใน zone ที่ต้องการ?

## 9. Sources (checked 2026-10-30)

- [Google ACE exam guide](https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf)
- [Create projects](https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects)
- [gcloud projects create](https://docs.cloud.google.com/sdk/gcloud/reference/projects/create)
- [gcloud services enable](https://docs.cloud.google.com/sdk/gcloud/reference/services/enable)
- [gcloud projects add-iam-policy-binding](https://docs.cloud.google.com/sdk/gcloud/reference/projects/add-iam-policy-binding)
- [gcloud asset search-all-resources](https://docs.cloud.google.com/sdk/gcloud/reference/asset/search-all-resources)
- [Configure Workforce Identity Federation](https://docs.cloud.google.com/iam/docs/configuring-workforce-identity-federation)
- [View and manage quotas](https://docs.cloud.google.com/docs/quotas/view-manage)

**Editorial outstanding:** Full objective-by-objective detail, organization/Cloud Identity/Observability/AI tooling commands, diagrams using custom skill, independent review and real CLI execution remain pending. Do not mark this chapter verified.
