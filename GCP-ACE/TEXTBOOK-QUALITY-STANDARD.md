# 📘 มาตรฐานบทเรียนเต็มรูปแบบ — GCP ACE

> **Textbook-first standard (2026-10-30).** เป้าหมายคือให้ผู้อ่านเข้าใจแนวคิดหลักได้จากภาษาไทยโดยไม่ต้องดูวิดีโอก่อน; ไม่ใช่ Transcript หรือสำเนาคอร์ส Google Skills และไม่ได้หมายความว่าผ่าน Official Graded Lab

## 🧭 นิยามคุณภาพ 1 Activity

**Activity = หน่วยเรียนรู้ที่จบสมบูรณ์ในหน้าเดียว** มีคำอธิบายจากพื้นฐานถึงการตัดสินใจ พร้อมทางเลือกฝึกจริงเมื่อได้รับอนุญาต. Module/Reference Library ใช้ค้นคว้าลึกเพิ่มเติมเท่านั้น **ห้ามใช้ลิงก์ไป Module มาแทนการสอน Core Concept**.

1. **Learning outcomes:** ผู้อ่านต้องตอบได้ว่าหลังเรียนจะสามารถอธิบาย ออกแบบ ทดลองและตรวจอะไร
2. **Teach from first principles:** นิยาม, กลไกทำงาน, องค์ประกอบ, ขอบเขต Identity/Network/Region/Project, คำศัพท์ที่เชื่อมกับงาน On-prem และตัวอย่างที่จับต้องได้
3. **End-to-end architecture reasoning:** Diagram ที่อ่านได้, Packet/Data/Control Plane Flow และ Failure Boundary; ใช้ Diagram Design Skill กับ Architecture Diagram ที่สร้าง/แก้ไขใน Markdown และเก็บ Source/Asset ภายใต้ `assets/diagrams`. ห้ามแทรก Mermaid ลวก ๆ หรือวาด ASCII Art เป็น Diagram ใหม่
4. **Worked examples:** หนึ่งกรณีทำทีละขั้น ตั้งแต่ Requirements → Design → Why-this-not-that → Expected Behavior → Trade-offs; ห้ามแค่มีชื่อ Service
5. **Hands-on walkthrough:** Prerequisites, Lab vs Personal Sandbox, Billing/Permissions, Step/Command พร้อมอธิบายทุก Flag ที่สำคัญ, Expected vs Actual และ Cleanup สำหรับ Resources ที่สร้างจริง
6. **Incident lab:** Error/Symptom → Hypotheses → Evidence → Isolation → Resolution → Verify → Lessons Learned โดยแยกผลสมมติกับผลรันจริง
7. **Decision tables:** Comparison, Limits, Security, Reliability, Cost, Quota/Capacity และบริการที่มีชื่อคล้ายแต่ใช้แทนกันไม่ได้
8. **Retrieval practice:** อย่างน้อย 5 คำถามมีเฉลย *เหตุผล*; 1 Scenario เชื่อมปัญหาหลาย Service/Layer
9. **Official evidence:** Link ไป Google Skills Activity/Course ที่ยืนยันได้ + Google Cloud Service Documentation, Recorded Scope/Snapshot; ระบุ `UNVERIFIED` หาก Course/Unit ซ่อนหลัง Login หรือเปลี่ยนจากเดิม
10. **Accuracy & editorial review:** ไม่มี Placeholder ที่แปลกเป็นคำสั่งใช้จริง, No Secrets, ไม่กล่าวว่า Lab Passed จาก CI; บทเรียนต้องอ่านแบบต่อเนื่องไม่ copy/paste Intro/References/Boilerplate จากบทอื่น

**ไม่ใช้จำนวนบรรทัด/จำนวนคำเป็นตัวแทนคุณภาพ**: เนื้อหา 30,000 ตัวอักษรที่มีแต่รายการหัวข้อยังไม่ใช่ตำรา. ควรมีเนื้อหายาวตาม Complexity ของ Course — Activity แบบ Study Guide อาจไม่ต้องหนาเท่า Foundation ที่ครอบ 3 Modules; แต่ต้องสอนตามวัตถุประสงค์ของกิจกรรมนั้นจนจบ.

## ✅ Definition of Done (ห้ามใช้ QA Pass แทน Editorial Pass)

| Gate | ผ่านเมื่อ | ใครยืนยัน |
|---|---|---|
| Structure | มีเป้าหมาย, Concepts, Worked Example, Lab, Troubleshooting, Assessment, Source | Automated QA + Author |
| Technical | อ้างอิง Oracle? **ไม่** — ต้องอ้าง Google Cloud Docs และ Version ล่าสุดเท่าที่เข้าถึงได้, ไม่กล่าวอ้างเกิน Source | Human technical review |
| Visual | Diagram มีเหตุผล อ่านง่าย, Assets โหลดจาก GitHub Pages ได้ | Human visual review + asset QA |
| Learning | มือใหม่สามารถอธิบาย Why/How และทำ Exercise โดยไม่เปิด Module ได้ | Human learner review |
| Practical | Commands มี Context/Expected Output/Permissions/Costs/Cleanup และไม่จำเป็นต้อง Execute Production | Lab review |
| Live | มี Actual Outputs ที่ Redact, Run Date, Version, Reviewer | Approved Sandbox only |

สถานะของแต่ละ Activity: `V3_NOTE` = ฉบับโน้ตเดิม, `TEXTBOOK_DRAFT` = กำลังขยายด้วยมาตรฐานใหม่, `EDITORIAL_REVIEWED` = ผ่าน Human Content/Diagram Review, `LAB_EXECUTED` = มีหลักฐานรันจริง. **ตอนนี้ห้ามเหมาว่า 17/17 เป็น EDITORIAL_REVIEWED หรือ LAB_EXECUTED**

## 🛑 Google Skills Path #11 snapshot mismatch — 2026-10-30

ตรวจหน้า `https://www.skills.google/paths/11` โดยไม่ Login วันที่ 30 ต.ค. 2026 ได้ **13 activities** (Last updated 2 days) แต่ cached/parameterized pages ที่เข้าถึงได้บางเวอร์ชันยังขึ้น **17 activities**. จำนวนและกิจกรรมที่เห็นอาจเปลี่ยนตามรุ่น/สิทธิ์/การปรับ Path. จึง **รักษา 17 Existing Lesson IDs gcp-001..017** เพื่อไม่ให้ Progress ในเว็บไซต์หาย และบันทึก `CURRICULUM_RECONCILIATION_REQUIRED` ไว้ก่อน ไม่ประกาศว่า 17 บทปัจจุบันตรงกับ Official Path ล่าสุด 100%.

- [Google Skills Path #11 (canonical)](https://www.skills.google/paths/11)
- [Associate Cloud Engineer Standard Exam Guide](https://cloud.google.com/learn/certification/guides/cloud-engineer)
- [Foundation Course](https://www.skills.google/paths/11/course_templates/50)
- [Core Services Course](https://www.skills.google/paths/11/course_templates/49)

**Reconciliation rule:** เมื่อยืนยัน Course Inventory/Order ของบัญชีผู้ใช้หรือ Official Public Course Listing ได้ จึงทำ Path Mapping แบบ Current vs Archived; ห้ามลบโน้ตที่ไม่ได้อยู่ใน Path ปัจจุบันถ้ายังมีคุณค่าด้านความรู้ — ให้จัดเป็น Reference/Archived แล้วรักษา IDs และ Redirects ก่อนเสมอ.

## 📋 Editorial backlog — ไม่อ้างว่าเสร็จจากการมี Diagram เพียงอย่างเดียว

| Activities | Current baseline | Textbook acceptance |
|---|---|---|
| 01–02 | Original Thai Notes V3 | ต้องตรวจการเรียน Google Skills Lab Orientation / Study Guide เป็นราย Activity |
| 03 | Original Notes V3 + expanded textbook example | ตรวจ full Foundation conceptual chain + actual teaching quality |
| 04 | Original Notes V3 | ตรวจ Core Services IAM / Storage / Cloud SQL / Billing / Monitoring เป็นหนังสือเต็ม |
| 05–09 | Original Notes V3 | ต้องทดสอบว่าอ่านแทน Course Video เพื่อเข้าใจ Concepts ได้ |
| 10–17 | Original Notes V3 | ต้องตรวจแต่ละ Activity เทียบ Path Latest และ Exam Guide (โดยไม่บังคับให้ AI Topics กินเนื้อหาเกิน ACE Objectives) |

**ลำดับตรวจรับ:** Foundation → Core Services → Scaling → GKE/Cloud Run → Operations/Terraform → Remaining Activities; แต่ละรอบต้องมี Lesson ที่แก้จริง, Source Trail และ Human Readability Review, ไม่ใช่ปั๊มข้อความให้ครบ 17 บทแล้วประกาศ Finished
