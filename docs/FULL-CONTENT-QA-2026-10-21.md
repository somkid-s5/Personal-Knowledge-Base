# 🔎 Full Content QA — Official Scope & Evidence Matrix

> **21 ตุลาคม 2026 · Evidence snapshot** สำหรับ Knowledge Base V2 ห้าวิชา ไม่ใช่ใบรับรองว่าเนื้อหา 100% หรือผ่านการทำ Lab จริง

## 📊 แยกผลตรวจตามระดับหลักฐาน

| QA Level | สถานะ | รับรองอะไรได้ |
|---|---|---|
| 1 — Official Scope Snapshot | ✅ ตรวจตัวอย่างจากเว็บผู้ผลิตวันนี้ | Domain / Weight / จำนวน Activities และเวอร์ชันที่อ้างอิงด้านล่าง |
| 2 — Repository Structural QA | ✅ ตรวจด้วย CI | Main Lesson 83 ขั้น, Link Validation, Files, Titles, Fence Balance, Crosswalk |
| 3 — Semantic & Technical Accuracy ทุกบท | ⚠️ ยังไม่ครบ | ต้องอ่านทวนเนื้อหา, ปรับ Release/Feature/License และทดลองคำสั่ง |
| 4 — Hands-on Execution / Evidence | ⏳ ยังไม่ทดสอบในรอบนี้ | ต้องใช้ Cloud Sandbox/Oracle VM, Log, Screenshots ที่ Redact, Verification/Cleanup |

**ห้ามสรุปว่า Pass 83/83 ใน Stage 2 หมายถึงเนื้อหา 83 บทถูกต้องทุกบรรทัด** — สถานะนี้หมายถึงผ่านกฎโครงสร้างอัตโนมัติเท่านั้น

## 📚 ผลตรวจขอบเขตจากแหล่งทางการ

| วิชา | สิ่งที่ยืนยันวันนี้ | แหล่งทางการ | ยังต้องตรวจอะไรเพิ่ม |
|---|---|---|---|
| ☁️ AWS SAA-C03 | 4 Domains และน้ำหนัก **30%, 26%, 24%, 20%** ตรงกับ Exam Guide ใน Repo | [AWS Exam Guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03.html) | ตรวจทุก Task/Service Decision กับรุ่นปัจจุบัน, ดู Cost/Regional Constraints และ AWS Hands-on แบบแยก |
| 🔷 Azure AZ-104 | 5 Skill Domains; Skills Measured **17 เม.ย. 2026** ตรงกับโน้ตเวอร์ชันที่ใช้ | [Microsoft Learn AZ-104](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104) | ต้องตรวจ 82 Skill Bullets ทีละหัวข้อและ Deploy/Monitor/Networking บน Azure จริง; Interactive เป็น Simulation |
| 🌤️ GCP ACE | หน้า Official [Learning Path 11](https://www.skills.google/paths/11) แสดง **17 Activities** | [Google Skills Path](https://www.skills.google/paths/11) · [ACE Exam Guide](https://cloud.google.com/learn/certification/guides/cloud-engineer) | ตรวจรายละเอียด Lab/Course ตามหน้า Google Skills จริง, แยก Official Grader จาก Companion Labs, ตรวจ Service Changes |
| 🛡️ ISC2 CC | Outline มีผล **1 ก.ย. 2026**; 5 Domains **24%, 17.3%, 20%, 21.3%, 17.3%** (ผลรวมปัดเศษ) | [ISC2 CC Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline) | ตรวจ Concept/เหตุผลใน 25 Scenarios รวมถึง 19 Objectives ทีละรายการ; ไม่ใช่ข้อสอบจริง |
| 🗄️ Oracle Database | อ้างอิง **19c Administration** เป็นพื้นฐาน; พบ Technical Nuance จริงเรื่อง Fixed-size Undo/`UNDO_RETENTION` ตั้งแต่ **19c RU 19.7** | [Oracle Parameter Reference](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/UNDO_RETENTION.html) · [Managing Undo](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-undo.html) | ตรวจ 31 Lessons/13 Companion Labs ตาม Patch Level/Edition/OS และข้อจำกัด License ใน Oracle VM ที่แยกจาก Prod |

## 🩺 Technical Issue Fixed — Oracle UNDO_RETENTION

Oracle Database Reference มีพฤติกรรม Fixed-size Undo ต่างกันระหว่าง **19c ก่อน RU 19.7** กับ **19c RU 19.7+** ดังนั้นข้อความสั้น ๆ ว่า `UNDO_RETENTION` ถูกละเลยโดย Fixed-size Undo เสมอ จึงไม่ถูกต้องสำหรับทุก 19c Release Update

ปรับ [Lesson 18 — Managing Undo](../Oracle-Database/05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md), [Lab 09 — Storage & Undo](../Oracle-Database/10-Labs/Lab-09-Storage-and-Undo-Inspection.md) และ [Oracle Version Map](../Oracle-Database/VERSION-MAP.md) ให้บอกวิธีตรวจ `V$VERSION`, `V$UNDOSTAT`, Retention Guarantee และ Capacity แบบ Read-only โดยไม่สั่งเปลี่ยนค่า Production

## 🧪 ระบบ QA อัตโนมัติที่เพิ่ม

จากโฟลเดอร์ `website/`:

```bash
npm run build
npm run qa:content
```

ตรวจทุกบทหลักใน Course Manifest (83 ขั้น), ชื่อเรื่อง H1, การปิด Code Fence, ข้อความอ้างอิง Scope ที่ระบุไว้ใน Repo และ Oracle Lab Index 01–13 พร้อมบันทึกคำสั่งที่ **อาจ** เปลี่ยนแปลงทรัพยากรให้ตรวจด้วยคน (เป็น Pattern ไม่ใช่การยืนยันความเสี่ยง)

ผลตรวจอัตโนมัติถูกแนบใน GitHub Actions ชื่อ Artifact `full-content-qa` เป็น `full-content-qa.md` แยกรายบท ไม่ถือว่า Command ได้ Execute แล้ว

## 🧪 Oracle Sandbox Execution Readiness — 2026-10-21

- [Read-only Oracle Sandbox SQL Pack](../Oracle-Database/10-Labs/Sandbox-Validation/README.md) เพิ่ม 8 SQL Files สำหรับผู้ใช้เลือก Execute ทีละไฟล์บน Isolated Sandbox
- [Evidence Template](../Oracle-Database/10-Labs/Sandbox-Validation/VALIDATION-EVIDENCE-TEMPLATE.md) เก็บ Expected/Actual, Approval, Oracle RU, Permissions, Error และ Sanitized Proofs ใน Private Storage
- [Static Safety Validator](../Oracle-Database/qa/validate_sandbox.py) ตรวจ SQL Pack ด้วย Allowlist และ Negative Test Fixtures ใน Oracle KB QA CI. **ไม่มี Live DB Connection/Execution**; จึงยังเป็น NOT_EXECUTED ทุก Test

## 🚦 QA Gate สำหรับยกระดับเป็น Tested/Verified

1. เลือก Lesson/Objective แล้วระบุ Provider Doc Version, Date, Reviewer และ Commit SHA
2. ตรวจ Concept และตัวอย่าง SQL/CLI ด้วยเอกสาร Reference ที่ตรงกับ Region, Version, Edition, OS และ Permissions
3. ทำ Lab ใน Environment ชั่วคราวที่ได้รับอนุญาต พร้อม Baseline, Time, Cost Limit, Output/Exit Code และ Verification
4. เก็บ Evidence ที่ปิดบัง Secrets, Internal IP, PII และ Tokens แล้ว พร้อม Cleanup/Restore Proof
5. ลงสถานะ `DOC_REVIEWED`, `STATIC_QA`, `LAB_EXECUTED` และ `LAB_VALIDATED` แยกกัน; ถ้าไม่มีหลักฐานจริงให้คงเป็น `NOT_EXECUTED`

## 🗄️ Oracle technical validation follow-up — 2026-10-21

- เพิ่ม [Oracle Technical Reference QA Matrix](../Oracle-Database/TECHNICAL-REFERENCE-QA-2026-10-21.md) แยก 5 Case จาก Oracle Official Docs แบบ Cross-version พร้อม Known Documentation Difference ใน 26ai Undo
- ปรับ Listener Lesson 09 / Lab 02, PDB Lesson 14 / Lab 08, Tablespace Lesson 16, Unified Audit Lesson 22 / Lab 10 และ 19c→26ai Delta
- เพิ่ม CI Evidence Contract สำหรับ Official URLs, Read-only SQL Examples และ Lesson IDs; ไม่รัน Oracle หรือ Claim ว่า 26ai Behavior ได้ Live-validated

## 🗄️ Oracle Lessons 23–31 supplemental validation — 2026-10-21

- [Data Movement / Maintenance / Performance Evidence Matrix](../Oracle-Database/DATA-MOVEMENT-PERFORMANCE-QA-2026-10-21.md) — 9 canonical Lessons และ 3 companion Labs ตรวจตาม Oracle 19c official docs
- เพิ่ม Quality Gate ตรวจการอ้างอิงทางการและตัวอย่าง SQL แบบ Read-only; Preserve Stable Lesson IDs ทั้ง 31
- **DOC_REVIEWED ไม่เท่ากับ LAB_EXECUTED:** ไม่ได้รัน SQL, Data Pump, RMAN, SQL*Loader หรือ Advisor บน Oracle Instance จริง

## 🎯 ลำดับ QA เชิงลึกที่ควรดำเนินต่อ

| Priority | เนื้อหา | เหตุผล |
|---|---|---|
| P0 | Oracle 19c/26ai Version/SQL Runbook: Undo, PDB, Listener, Unified Audit | พฤติกรรมตาม RU, Edition, Security และ PDB Scope |
| P1 | Azure AZ-104: 5 Domains/82 Skill Bullets + Interactive Lab Verification | Scope ปัจจุบันตรวจได้ แต่ยังไม่ใช่ Test บน Azure จริง |
| P1 | GCP ACE: 17 Activities vs Official Labs/Grader and current ACE Objectives | ลำดับครบ แต่ Companion ไม่ได้แทน Official Labs |
| P1 | AWS SAA-C03: 14 Tasks, service choices and 7 Labs | Concept/Tradeoffs/Cost/Permission ต้อง Review ทีละข้อ |
| P2 | ISC2 CC: Objective/Scenario reasoning | ตรวจเหตุผลและ Cross-domain distinctions ไม่ใช่แค่จำนวนข้อ |

> **CI Green = Repo อ่าน/Build/ลิงก์/โครงสร้างผ่าน.** ไม่ใช่ Product Exam Guarantee, Certificate หรือ Proof of Live Hands-on
