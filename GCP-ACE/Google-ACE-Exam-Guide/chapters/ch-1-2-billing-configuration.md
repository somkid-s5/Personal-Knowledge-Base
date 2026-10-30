# Chapter 1.2 — Managing billing configuration

> **Status: draft** | Exam Guide: English standard version effective 30 June 2026 | Source review: 30 October 2026 | No cloud resources were created or billed.  
> Diagram Design Skill (user's custom version) is unavailable in this session. A billing relationship architecture diagram is **pending**, not replaced with an improvised Mermaid/ASCII diagram.

## 1. Objective และผลลัพธ์การเรียนรู้

Official objective: **1.2 Managing billing configuration**. ครอบคลุมสี่หัวข้อใน [coverage matrix](../coverage-matrix.md):

- 1.2.01 Creating one or more billing accounts
- 1.2.02 Linking projects to a billing account
- 1.2.03 Establishing billing budgets and alerts
- 1.2.04 Setting up billing exports

เมื่อจบต้องอธิบาย billing relationship, สร้างและเชื่อมบัญชีใน sandbox, เลือก budget/alerts, ตั้งค่า BigQuery export และรู้ว่าขั้นตอนไหนอาจทำให้บริการหยุดหรือเสียค่าใช้จ่าย

## 2. ศัพท์สำคัญ

| คำ | ความหมาย |
|---|---|
| Cloud Billing account | บัญชีสำหรับรวมค่าใช้จ่ายของ Google Cloud projects; อาจผูกหลาย projects ได้ |
| Payments profile | ข้อมูลผู้ชำระเงินและการชำระเงินที่ Billing account ผูกอยู่ |
| Project billing association | ความสัมพันธ์ระหว่าง project กับ Billing account ที่ active; project ผูกได้ครั้งละหนึ่งบัญชี |
| Billing budget | เกณฑ์ติดตามค่าใช้จ่ายตาม amount, period และ scope |
| Budget alert | การแจ้งเตือนเมื่อ actual/forecasted spend ถึง threshold; ไม่ได้แปลว่าจะบล็อกการใช้บริการ |
| Spend cap budget | กลไกจำกัดการใช้งานเฉพาะบริการและโปรเจกต์ที่รองรับ; ไม่ใช่ hard cap ครอบคลุมทุกค่าใช้จ่าย |
| Billing export | ส่งข้อมูล cost/usage/pricing ไป BigQuery เพื่อวิเคราะห์ย้อนหลัง |
| BigQuery dataset | ตำแหน่งจัดเก็บตาราง export; ต้องวาง location และสิทธิ์ให้เหมาะ |

## 3. แนวคิดหลัก

### 3.1 Billing account ไม่เท่ากับ Project

**Billing account เป็นผู้รับค่าใช้จ่าย, Project เป็นหน่วยที่สร้างและรัน resource.** บัญชีเดียวชำระให้หลาย projects ได้ แต่ project หนึ่งเชื่อม Cloud Billing account ได้เพียงหนึ่งบัญชีในเวลาเดียวกัน. ข้อมูล charge แยกตาม project ได้ จึงควรแยก dev/prod เป็นคนละ project เมื่ออยากแยก IAM, environment และ cost attribution. การเปลี่ยน billing account ของ project เป็น operation ที่มีผลต่อเจ้าของค่าใช้จ่าย ไม่ใช่แค่เปลี่ยนชื่อ

ตัวอย่าง: บริษัทมี `ace-dev`, `ace-qa` และ `ace-prod`. ทั้งสามอาจแชร์ Billing account ส่วนกลาง แต่ตั้ง budget แยก project ได้. หากทีม Finance ต้องควบคุมการอนุมัติและแยก payment arrangement อาจใช้หลาย Billing accounts ตามนโยบายองค์กร

**Diagram pending:** Billing account(s) → linked projects → exported data → BigQuery dataset and alert channels. วางไฟล์ภายใต้ `../assets/diagrams/` และแทรก relative image link หลังสร้างผ่าน Diagram Design Skill และทดสอบภาพจริงเท่านั้น

### 3.2 การสร้างบัญชีและสิทธิ์

การสร้าง self-serve Billing account ใช้ Google Cloud Console และ Google payments profile. ผู้ใช้ภายใต้ Organization ต้องมี permission `billing.accounts.create` (โดยทั่วไป `roles/billing.creator`) และอาจต้องมีสิทธิ์ใช้งาน payments profile. ผู้สร้าง account โดยทั่วไปได้รับสิทธิ์ Billing Account Administrator ในบัญชีที่สร้าง. บัญชีหนึ่งเลือกสกุลเงินตามการตั้งค่าบัญชี และการสร้างบัญชีไม่ได้ทำให้มีเงินเครดิตเพิ่มโดยอัตโนมัติ

หลัก least privilege: คนสร้าง project ไม่จำเป็นต้องเป็น Billing Account Admin. สำหรับการ link project ต้องมีสิทธิ์ที่ billing account และฝั่ง project ตามเอกสารที่เกี่ยวข้อง. ไม่ควรแจก `roles/billing.admin` แค่เพื่อให้เห็นรายงานต้นทุน

### 3.3 Budget: alert เทียบกับ enforcement

**Alerts-only budget ไม่ใช่ hard spending limit.** ตั้งจำนวนเงินและเกณฑ์เช่น 50%, 90%, 100% เพื่อรับ email แจ้งเตือน ข้อมูล usage/cost อาจมี latency จึงอาจใช้เงินเกิน threshold ก่อน notification ได้

Docs ปัจจุบันยังกล่าวถึง **spend cap budgets** ที่รองรับเฉพาะบาง project/service/customer และมีข้อจำกัดด้านความครอบคลุมและความหน่วง; cap อาจหยุด usage ใหม่บางประเภท แต่ไม่ยืนยันว่าจะหยุดค่าใช้จ่ายจาก persistent compute/storage ทั้งหมด. ดังนั้นหากโจทย์ถามว่า “ตั้ง budget แล้วจะหยุด VM อัตโนมัติหรือไม่” คำตอบที่ถูกคือ *alerts-only budget ไม่หยุด*; หากโจทย์ระบุ spend cap budget ต้องพิจารณาขอบเขตบริการและเงื่อนไขแยก

### 3.4 BigQuery Billing export

Billing export ช่วยตอบว่า “บริการใด/โปรเจกต์ใด/ช่วงเวลาใดเสียเงินเท่าไร” ได้ละเอียดกว่าเพียง email threshold โดยเปิดใน **Billing → Billing export → BigQuery export**. เลือก project สำหรับ FinOps, สร้าง BigQuery dataset ที่รองรับ แล้วเปิด export ชนิดที่ต้องการ เช่น Standard usage cost หรือ Detailed usage cost; การส่ง export อาจมีระยะเวลาก่อนเห็นข้อมูล. Enable ตั้งแต่เริ่มใช้ billing account เป็นแนวทางที่ดีเพื่อให้เก็บประวัติได้มากที่สุด. BigQuery storage และ query อาจเกิดค่าใช้จ่ายเพิ่มเติม

**ห้ามสรุปว่า export เป็น real-time shutdown mechanism** และห้ามสมมติว่าข้อมูลย้อนหลังทุกวันมีอยู่ครบ หากเพิ่งเปิด export วันนี้

## 4. ตารางตัดสินใจ

| เป้าหมาย | เลือก | ไม่ควรเข้าใจผิด |
|---|---|---|
| รวมค่าใช้จ่ายจากหลาย projects | เชื่อมกับ Billing account เดียว | การแชร์ Billing account ไม่ได้แปลว่า IAM ระหว่าง projects รวมกัน |
| ให้ Developer จ่ายค่าใช้จ่ายของ sandbox ได้ | Grant เฉพาะ billing/project roles ที่จำเป็น | ไม่ต้องแจก Owner ทุก project |
| แจ้งเตือนเมื่อค่าใช้จ่ายเข้าใกล้เป้า | Alerts-only budget | ไม่ใช่ hard stop |
| ต้องการหยุดบาง service เมื่อเกิน cap | ประเมิน spend cap budgets ตาม eligibility | ไม่ได้คุมทุก cost item หรือทุกบริการ |
| วิเคราะห์ค่าใช้จ่ายราย SKU/resource | BigQuery billing export (เหมาะกับระดับ detail) | ไม่ใช่ Cloud Logging |
| เลิกจ่ายจาก Billing account เก่า | ย้าย project ไปบัญชี active ใหม่อย่างควบคุม | Unlink ผิดอาจทำให้บริการหยุด |

## 5. ขั้นตอนและ CLI

**Prerequisites:** ใช้ project ทดสอบที่ผู้ใช้มีสิทธิ์จัดการ, Billing account ที่ได้รับอนุญาต และ account ที่มีสิทธิ์ในการดู/เชื่อม billing. ไม่ต้องสร้าง resource ที่มีค่าใช้จ่ายเพื่ออ่านตัวอย่างนี้. คำสั่งด้านล่างใช้ placeholder เท่านั้น และยังไม่ได้ execute จริง

### A. ตรวจสอบสถานะ (read-only)

```bash
gcloud auth list
gcloud config get-value project

# แสดงบัญชีที่ผู้ใช้เข้าถึงได้
gcloud billing accounts list

# ตรวจ project ผูกกับบัญชีใด
gcloud billing projects describe PROJECT_ID
```

ตัวอย่างผล **จำลองเพื่ออธิบายรูปแบบ**:

```yaml
billingAccountName: billingAccounts/ABCDEF-123456-789012
billingEnabled: true
name: projects/PROJECT_ID/billingInfo
projectId: PROJECT_ID
```

### B. สร้าง Cloud Billing account

Console: **Billing → Manage billing accounts → Create account** แล้วกำหนด account name, country, currency/payment details ตามหน้าจอที่รองรับ. ตรวจสอบ payments profile และ permission ก่อนยืนยัน; ขั้นตอนนี้มีผลจริงต่อระบบการเรียกเก็บเงิน. การสร้าง Billing account ใหม่ในบทนี้ใช้ **Console เป็นหลัก** เพราะไม่ได้ยืนยันคำสั่ง GA CLI ที่ทำได้ครบทุกบริบท

### C. เชื่อม project กับ account (mutating)

```bash
gcloud billing projects link PROJECT_ID \
  --billing-account=ABCDEF-123456-789012

# Verify association หลังเชื่อม
gcloud billing projects describe PROJECT_ID
```

**ผลที่คาด:** `billingEnabled: true` และ Billing account ตรงกับเป้าหมาย (ต้องเป็นบัญชี active). คำสั่ง `link` ยังใช้ย้ายโครงการจากบัญชีเก่าไปบัญชีใหม่ได้ จึงต้องตรวจผลกระทบกับทีม Finance ก่อนรัน

### D. ตั้ง alerts-only budget (mutating)

```bash
gcloud billing budgets create \
  --billing-account=ABCDEF-123456-789012 \
  --display-name="ACE sandbox monthly alert" \
  --budget-amount=100 \
  --calendar-period=month \
  --threshold-rule=percent=0.50 \
  --threshold-rule=percent=0.90 \
  --threshold-rule=percent=1.00
```

หมายเหตุ: `100` ถูกตีความตามสกุลเงินของ Billing account หากไม่ใส่ currency. ตัวอย่างนี้เป็น **billing-account-level scope** และไม่จำกัดเพียง project เดียว. สำหรับ project-specific budget ต้องเพิ่ม `--filter-projects=projects/PROJECT_NUMBER` โดยตรวจรูปแบบ resource identifier และสิทธิ์กับ documentation ก่อนใช้จริง. ตั้ง alert routing/recipients เพิ่มตามนโยบายองค์กร

**Verify:** เปิด Billing → Budgets & alerts ตรวจ amount, scope, threshold และ recipients ก่อนใช้จริง. **Cleanup:** ลบ budget เฉพาะที่สร้างเพื่อทดสอบหลังตรวจ ID ให้ตรง; อย่าปิด Billing account หรือ unlink production project เพื่อฝึก cleanup

### E. เปิด BigQuery export (mutating through Console)

1. เตรียม project สำหรับ FinOps และสร้าง BigQuery dataset ที่รองรับ
2. เปิด Billing → Billing export → BigQuery export; เลือก Billing account ให้ถูก
3. Enable Standard หรือ Detailed cost export โดยเลือก project/dataset ที่เตรียมไว้
4. รอข้อมูล export ชุดแรก แล้วตรวจ BigQuery Tables และ permissions
5. สำหรับ query ต้องตรวจ schema/ชื่อ dataset ของ export จริงก่อนเขียน SQL ไม่สมมติว่าเป็นตารางชื่อ `billing`

**Expected vs Actual แบบฝึกที่ไม่มี lab:** Expected = มีตาราง export ใน dataset และมีแถวเมื่อข้อมูลถูกส่ง; Actual = อ่าน output จำลองและอธิบายว่าการไม่มีแถวทันทีอาจเป็น latency ไม่ใช่ permission error เสมอไป. ไม่จำเป็นต้องสร้าง dataset จริงเพื่อทำข้อสอบทบทวน

## 6. Troubleshooting

- **Project billing disabled:** ตรวจว่า project ผูกกับ *active* billing account จริงหรือไม่ และการเชื่อมสำเร็จหรือไม่
- **Permission denied when linking:** ตรวจทั้ง permission บน project และ billing account อย่าแก้ด้วย Owner แบบเดาสุ่ม
- **Budget alert ไม่มา:** ตรวจ budget scope, thresholds, recipients, notification channels และความหน่วงของข้อมูล billing
- **Cost เกิน budget:** alerts-only ไม่ใช่ spending cap; ตรวจต้นทางค่าใช้จ่ายและลด/ปิด resource อย่างมี change control
- **BigQuery export ยังไม่มี rows:** ตรวจการเปิด export, dataset, permissions และเวลาที่ผ่านไปหลัง enable
- **ย้ายบัญชีแล้วบริการหยุด:** ตรวจว่าบัญชีใหม่ active ไม่ใช่ closed account และตรวจ project linkage

## 7. MCQ สถานการณ์ (Original)

**Q1 (single).** บริษัทมี dev และ prod คนละ Project แต่ต้องชำระผ่านบัญชีเดียวและดูค่าใช้จ่ายแยก Project ควรทำอย่างไร? A. ย้าย resources ทั้งหมดมา project เดียว B. Link ทั้งสอง projects ไป Billing account เดียว C. แชร์ service account ตัวเดียว D. เปิด logging เพิ่ม. **ตอบ B:** A ลด isolation; C identity ไม่ใช่ billing; D logs ไม่เปลี่ยน account association

**Q2 (single).** Project ไม่มี billing active และ VM ไม่ทำงาน ผู้ดูแลควรตรวจอะไรก่อน? A. Cloud DNS B. Billing project association และ account status C. SSH key D. Cloud NAT. **ตอบ B:** A/C/D ไม่แก้ billing disabled

**Q3 (multiple; choose two).** ทีมต้องการให้ developer ผูก project sandbox กับบัญชี billing แต่ไม่ให้สิทธิ์ควบคุม payment methods ควรทำอะไร? A. ตรวจสิทธิ์ฝั่ง project B. ให้ Billing Account Admin กับทุกคน C. ให้สิทธิ์ billing account อย่างจำกัดสำหรับ link D. มอบ Organization Admin E. ปิด audit logging. **ตอบ A,C:** B/D กว้างเกินจำเป็น, E ไม่ช่วย

**Q4 (single).** ทีมตั้ง alerts-only budget 100 USD แล้วใช้ไป 120 USD ทำไม services ยังทำงานอยู่? A. Alerts-only budget แจ้งเตือนแต่ไม่ block B. Budget เก็บเงินคืนอัตโนมัติ C. Billing export หยุดเครื่อง D. IAM policy ปิด budget. **ตอบ A:** B/C/D ไม่ใช่ behavior ของ alerts-only

**Q5 (single).** Finance ต้องตรวจค่าใช้จ่ายแยกตาม SKU ย้อนหลังจำนวนมากและ query เอง ควรใช้? A. Cloud NAT B. BigQuery billing export C. Firewall logs เท่านั้น D. IAM policy history. **ตอบ B:** A/C/D ไม่ใช่ billing-cost dataset

**Q6 (multiple; choose two).** เปิด Billing export วันนี้แต่ไม่เห็น rows ใน BigQuery ทันที ควรตรวจอะไร? A. Dataset/export configuration B. ให้เวลา export ประมวลผลและส่งข้อมูล C. ลบ Billing account D. เปิด inbound 0.0.0.0/0 E. สร้าง VM เพิ่ม. **ตอบ A,B:** C ทำให้ระบบเสียหาย; D/E ไม่ช่วย cost export

**Q7 (single).** ผู้บริหารบอกให้ใช้ budget alerts เป็น hard spending cap สำหรับระบบที่ห้ามเสียเงินเกินแม้แต่บาทเดียว ควรตอบว่าอย่างไร? A. ได้แน่นอน B. Alerts-only ไม่ใช่ hard cap; ประเมิน spend caps ที่รองรับและมาตรการควบคุมเพิ่มเติม C. ปรับ IAM Viewer D. ใช้ Cloud Shell แทน. **ตอบ B:** A เป็นความเข้าใจผิด, C/D ไม่จำกัด billing charges

**Q8 (single).** แยก Payments Profile กับ Billing account ได้อย่างไร? A. เป็นสิ่งเดียวกัน B. Payments profile เกี่ยวกับข้อมูลชำระเงิน ส่วน Billing account รวม charge จาก projects C. Project ใช้หลาย Billing accounts พร้อมกัน D. Billing account จ่ายค่า Google Workspace อัตโนมัติ. **ตอบ B:** A สลับหน้าที่, C ไม่ใช่ project association ปกติ, D เป็นระบบ billing คนละประเภท

**Q9 (multiple; choose two).** ต้องย้าย project production ไป Billing account ใหม่เพื่อรวมค่าใช้จ่ายทีม แต่ต้องลด downtime ควรทำอะไร? A. ตรวจ new billing account active B. ตรวจ permissions และแจ้งผู้เกี่ยวข้องด้าน cost allocation C. Unlink ก่อนและปล่อยหลายวัน D. ปิดทุก service E. ให้ random developer ใช้ Owner. **ตอบ A,B:** C เสี่ยงบริการหยุด, D ไม่ใช่ prerequisite, E ขัด least privilege

**Q10 (single).** ต้องให้การเงินรับ email เมื่อค่าใช้จ่ายถึง 90% ของ monthly amount ควรตั้งอะไร? A. Billing budget with threshold alert and recipients B. Cloud Armor rule C. Kubernetes HPA D. VPC Peering. **ตอบ A:** B/C/D เป็นคนละปัญหา

## 8. Closed-note recall

1. ความสัมพันธ์หนึ่งต่อหลายระหว่าง Billing account กับ Projects เป็นอย่างไร?
2. ทำไม Budget alert ถึงไม่ใช่ Hard cap? Spend cap budgets มีข้อจำกัดอะไร?
3. สิทธิ์ประเภทไหนเกี่ยวกับการสร้าง Billing account และการ link project?
4. Billing export ช่วยตอบคำถามอะไรที่ Budget alert ตอบไม่ได้?
5. ถ้า export ไป BigQuery ไม่มีแถวทันที จะตรวจอะไรโดยยังไม่สร้าง workload เพิ่ม?

## 9. แหล่งอ้างอิง (ตรวจ 30 ต.ค. 2026)

- [Official ACE Exam Guide](https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf)
- [Create a Cloud Billing account](https://docs.cloud.google.com/billing/docs/how-to/create-billing-account)
- [Cloud Billing account and project link](https://docs.cloud.google.com/sdk/gcloud/reference/billing/projects/link)
- [Cloud Billing permissions](https://docs.cloud.google.com/billing/docs/how-to/billing-access)
- [Budget & alerts](https://docs.cloud.google.com/billing/docs/how-to/budgets)
- [Spend cap budgets](https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps)
- [gcloud billing budgets create](https://docs.cloud.google.com/sdk/gcloud/reference/billing/budgets/create)
- [Set up BigQuery export](https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

**QA outstanding:** Peer technical review, environment-specific permission tests, visual diagram using specified custom Skill, and real command execution. No independent exam-readiness claim.
