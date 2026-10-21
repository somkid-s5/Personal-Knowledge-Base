# 📋 Knowledge Base V2 — Content Audit & Cleanup Tracker

## Baseline

จำนวนบทหลักตอนเริ่ม Knowledge Base V2 คือ 78 ขั้น ก่อนแยก Azure เป็นห้า Domain ปัจจุบันมี 83 ขั้น (AWS 15, Azure 7, GCP 17, ISC2 13, Oracle 31) จำนวนนี้เป็นขั้นในแผนอ่าน ไม่ใช่การประกาศว่าทุกหลักสูตรสมบูรณ์

ก่อนเริ่ม V2 มี Markdown 241 ไฟล์ในห้าวิชา และไม่พบไฟล์ที่มี Git blob SHA เหมือนกันทั้งไฟล์ แต่อาจมีเนื้อหาซ้ำบางย่อหน้า/แนวคิด

## Automated scan snapshot — October 20, 2026

การสแกนหลังสร้าง Manifest V2 พบ **241 Markdown files** แบ่งเป็น **78 Main Lessons**, **60 curated supplements**, **38 internal/draft files**, และ **65 other learning/reference pages**

- พบ 15 กลุ่มย่อหน้ายาวที่เหมือนกันตามการ Normalize ข้อความก่อนแก้ Lesson 17
- พบ 1 คู่เนื้อหาที่คล้ายกันมากกว่าค่า Threshold: Oracle Lesson 15 กับ Lesson 17 (ประมาณ 29.6% ของตัวอย่างข้อความชุดสั้นกว่า)
- สคริปต์ใช้ Candidate Score เพื่อการตรวจของคน ไม่ใช่คำตัดสินว่าไฟล์ใดควรถูกลบ
- ได้ปรับ Lesson 17 ให้เน้น High Water Mark, Reuse / Reclaim, SHRINK / MOVE และการตัดสินใจ แทนการยกคำอธิบาย Capacity จาก Lesson 15 มาซ้ำ และลิงก์กลับ Lesson 15

## Auto-generated audit

เข้า website แล้วรัน:

```bash
npm install
npm run audit:content
```

รายงานจะอยู่ที่ website/reports/content-audit-v2.md และถูกแนบเป็น Actions artifact ชื่อ content-audit-v2 บน Workflow Learning Website

การหา Candidate Overlap เป็นการวัดความคล้ายเชิงข้อความเท่านั้น ไม่ใช่หลักฐานยืนยันว่าเนื้อหาส่วนเกินถูกต้องที่จะลบ

## Priority review queue

| Priority | Candidate | Decision rule |
|---|---|---|
| P1 | GCP 17 Activities เทียบ 13 Modules | Activity เป็นเส้นทางหลัก; Deep Dive ต้องมีรายละเอียดเพิ่มหรือ Link กลับ |
| P1 | Oracle 31 Lessons เทียบ Teaching Atlas Draft 10–31 | Lesson เป็นบทหลัก; Atlas เก็บใน Repo แต่ไม่แสดงเว็บ |
| P2 | AWS 13 Architecture Modules เทียบ Current Scope Deep Dive | Current Scope มีเนื้อหาเฉพาะการสอบ; ตรวจซ้ำก่อนรวม |
| P2 | AWS 7 Labs เทียบ 35 Projects (00–34) | ไม่รวมเป็นบทเดียวโดยอัตโนมัติ เพราะระดับฝึกต่างกัน |
| P2 | Azure 5 Domain Lessons เทียบ Interactive Learning | แยกบทหลักจากไฟล์เดิมแล้ว; Lab/Quiz เป็นแบบฝึกเสริม ไม่ใช่บทหลักซ้ำ |
| P3 | ISC2 Lessons / Review / Scenario | เก็บหน้าที่ต่างกัน ปรับ Crosslinks ให้ชัด |

## Cleanup decision log

ใช้คำตัดสิน KEEP, LINK, CONSOLIDATE, ARCHIVE เมื่ออ่านเปรียบเทียบเนื้อหาและยืนยัน Unique Value แล้ว

| Files reviewed | Decision | Unique value preserved | Link test | Status |
|---|---|---|---|---|
| Oracle Teaching Atlas / 31 Lessons | KEEP Lessons, hide Draft from Site | ไม่มีการลบ/ย้าย | รอ Full Content Review | Navigation cleanup |
| QA, Source Manifest, Session Memory | HIDE from Site, KEEP in GitHub | เก็บเอกสารต้นฉบับครบ | CI Build | Navigation cleanup |

## Important

ไม่ลบเนื้อหาโดยอัตโนมัติจาก Similarity Score, ไม่อ้างว่า Lab ที่ยังไม่เคย Execute ผ่านแล้ว และไม่อ้างว่า Certification ทั้งหลักสูตรมีความครบ 100% โดยไม่มี QA ตาม Scope จริง

## AZ-104 learning track follow-up — October 20, 2026

- AZ-104 เปลี่ยนจาก 2 steps เป็น 7 steps (Visual, Study Map, 5 Domain Notes) โดยคง Stable IDs เดิมของสองขั้นแรก
- เนื้อหาแนวคิดจากไฟล์ Deep Dive เดิมถูกแยกตาม 5 Domains; ไฟล์เดิมเหลือแผนอ่านและ Decision Maps เพื่อไม่ให้ต้องอ่านซ้ำ
- เชื่อม 10 Visual Labs เข้ากับ 5 Domains และ Mirror Static Practice App บน GitHub Pages เดียวกัน (Progress แยก)
- ตรวจ Build และโครง Skill Headings ทั้ง 82 หัวข้อผ่าน CI; การตรวจความถูกต้องของเทคนิคและการรัน Labs บน Azure จริงยังเป็นงานคนละส่วน

## GCP ACE V2 follow-up — October 20, 2026

- เก็บ 17 Activities เป็น Canonical Learning Path; 13 Modules และ 6 Companion Labs ยังอยู่ใน Repository เดิมทั้งหมด
- เพิ่มตาราง [Activity → Module → Lab](../GCP-ACE/ACTIVITY-TO-MODULE-MAP-TH.md) เชื่อมเส้นทางตามหัวข้อที่ต้องการเจาะลึก โดยไม่คัดลอกเนื้อหาบทเรียนเข้าไฟล์ใหม่
- สร้าง Contextual Links จาก Course Manifest ให้บทหลักและบทเสริมเชื่อมกันอัตโนมัติ พร้อม Related Link Validation ใน CI
- การทับซ้อนของ Concepts ระหว่าง Activity/Module ยังถือว่าเป็นบทบาทการสอนต่างกัน **ไม่ใช่ความซ้ำที่ลบได้อัตโนมัติ** หากจะรวมข้อความต้องตรวจ Examples, Commands, Troubleshooting และ Exam Scope ทีละหัวข้อก่อน

## AWS SAA V2 learning-map follow-up — October 21, 2026

- เส้นทางหลักยังเป็น 15 ขั้น: Architecture Modules 01–13 + SAA Current Scope Deep Dive + Scenarios
- เพิ่ม [13 Modules → 7 Labs → Project Catalog 00–34](../AWS-SAA-C03/AWS-MODULE-LAB-PROJECT-MAP-TH.md) โดยลิงก์แต่ละ Module ไปยัง Lab และ Selected Optional Projects จาก Course Manifest
- เพิ่ม [Portfolio Catalog](../AWS-SAA-C03/AWS-PORTFOLIO-PROJECT-CATALOG-TH.md) ให้ค้นพบ Project 00–34 รวม 35 Workbook โดยแยก Starter และ Advanced; Advanced projects ไม่ใช่ข้อสอบ SAA core
- ข้อมูลทั้งหมดเก็บอยู่ไฟล์เดิม ไม่ย้ายหรือลบ Lab/Project และไม่เปลี่ยน Stable Lesson IDs
- แยก Portfolio Workbooks ออกจากเส้นทางเตรียมสอบและ Progress, ตรวจลิงก์สลับ Module/Project ด้วย CI และ Build QA

**หมายเหตุ:** โครงสร้างนี้จัดลำดับ/บทบาทเพื่อลดการอ่านวนซ้ำ ไม่ใช่ Semantic Deduplication ทุกย่อหน้าและไม่ใช่หลักฐานรัน Project จริง

## ISC2 CC Domain/Scenario follow-up — October 21, 2026

- แยกเส้นทางเป็น 5 Domain Stages ตามลำดับ Study Plan: **1 → 3 → 4 → 2 → 5** แล้วต่อด้วย Scenario; ยังคง IDs `cc-001` ถึง `cc-013` เดิม
- เพิ่ม [Domain → Scenario → Review](../ISC2-CC/ISC2-DOMAIN-PRACTICE-MAP-TH.md) พร้อมข้อ 01–25 ตาม Domain
- เชื่อมจากบทหลักไปยัง Scenario เฉพาะหมวดและ Cheat Sheet จาก `related.practice`, `related.review`, `related.focus` ใน Course Manifest โดยไม่คัดลอกเนื้อหาสองไฟล์นั้นไปทุกบท
- ตรวจทั้ง 19 Objectives / 25 Scenario รายการจากไฟล์ต้นฉบับ, สถานะ Build และ stable Lesson IDs ใน CI แยกจากการรับรองผลสอบ

## Oracle topic-specific duplicate cleanup — October 21, 2026

การตรวจตำแหน่งข้อความจริงพบ **14 กลุ่มย่อหน้าที่ยาวซ้ำใน Oracle** แบ่งเป็น Lesson 07–08 (Networking Naming), Lesson 15–16–18 (Storage/Tablespace/Undo) และ Lesson 19–22 (Identity/Privileges/Profile/Auditing). อีก 1 กลุ่มซ้ำข้ามวิชาอยู่ใน Visual Memory Guide ซึ่งเป็นข้อความมาตรฐานที่ตั้งใจใช้ร่วมกัน.

- Lesson 08 เปลี่ยนการถามและการแก้ปัญหาให้เน้น ORA-12154, Easy Connect และ Local Naming โดยอ้างบทพื้นฐาน Lesson 07
- Lesson 16 เน้น Tablespace/OMF/Datafile Operations และข้อจำกัดก่อน Change; กลับไปอ่าน Capacity Fundamentals ที่ Lesson 15
- Lesson 18 เน้น Undo Retention, Consistent Reads และ ORA-01555 โดยอ้าง Storage Fundamentals ที่ Lesson 15
- Lesson 20, 21, 22 เพิ่ม Objective, Incident Workflow และ Self-check เฉพาะ Privileges, Profiles และ Unified Auditing แทนข้อความชุดเดียวกับ Lesson 19
- ไม่ลบไฟล์ต้นฉบับ ไม่เปลี่ยน SQL Read-only ที่มีอยู่, References, Lab Files หรือ Lesson IDs ที่ใช้กับ Progress
- เพิ่ม CI ตรวจ No Long-Paragraph Copy ในสามกลุ่มและ Stable Oracle Lesson IDs ทั้ง 31 ขั้น

**ขอบเขต:** การตรวจนี้วัดย่อหน้ายาวซ้ำตามข้อความ ไม่ได้ยืนยันว่าไม่มีความซ้ำในแนวคิดทุกบท หรือมีการ Execute Commands บน Oracle Database จริง.

## Full content QA gate — October 21, 2026

- [Full Content QA evidence matrix](./FULL-CONTENT-QA-2026-10-21.md) แยก Official Scope Snapshot / Static QA / Command Semantics / Live Lab Validation
- เพิ่ม `npm run qa:content` ตรวจ Body ของ Primary Lessons 83 ขั้น, H1, Code Fence, Internal Evidence References และ Project/Oracle Lab IDs พร้อมออกรายงานทุกไฟล์ใน CI
- แก้ Release-specific Detail: Oracle 19c RU 19.7 เปลี่ยนพฤติกรรม `UNDO_RETENTION` กับ Fixed-size Undo; [Lesson 18](../Oracle-Database/05-Storage-Tablespaces-Undo/Lesson-18-Managing-Undo-Data-TH.md) และ Lab 09 ชี้ชัดว่า 19c ทุก RU ไม่เหมือนกัน
- ยังไม่มีการรัน SQL/CLI กับ Cloud หรือ Oracle จริง และยังไม่สามารถรับรอง Semantic Accuracy ทุกบทได้

## Oracle technical reference validation — 2026-10-21

- [Oracle 5-case technical validation](../Oracle-Database/TECHNICAL-REFERENCE-QA-2026-10-21.md): Listener ORA-12519, PDB scope/visibility, Online Datafile Move side effects, Unified Auditing session activation, and 19c RU 19.7/26ai Undo documentation difference
- [CI technical evidence gate](../website/scripts/verify-oracle-technical.mjs): 31 stable IDs, official-document source anchors, read-only SQL blocks in eight reviewed notes/labs. **No live Oracle execution**
- DOC_REVIEWED = 5, LAB_EXECUTED = 0, LIVE_VALIDATED = 0; other Oracle subjects outside these cases remain for detailed fact checking
- No lesson migrations, no destructive commands run, and no claim of runtime parity across Oracle 19c/26ai

## Oracle Data Movement and Performance technical pass — October 21, 2026

- เพิ่ม [Official Reference Matrix Lessons 23–31](../Oracle-Database/DATA-MOVEMENT-PERFORMANCE-QA-2026-10-21.md) โดยตรวจ 9 บทและเสริม Labs 11–13 ตาม Oracle 19c Documentation
- คง 31 Stable Lesson IDs และ 13 Labs; แยก DOC_REVIEWED จาก NOT_EXECUTED อย่างชัดเจน
- เพิ่ม Regression Test `npm run check:oracle-data-performance`: ตรวจ Official-doc anchors, บท/ไฟล์ และ SQL Code Fences ที่ห้ามมี Write-changing Statements ใน Labs 11–13
- จุด Technical Accuracy สำคัญ: expdp/impdp NETWORK_LINK ต่างกัน, TABLE_EXISTS_ACTION แบบ destructive/default APPEND เมื่อ DATA_ONLY, RMAN ไม่ใช่ Data Pump, SQL Loader direct path constraints, AutoTask status vs job outcomes, DBMS_XPLAN privileges, Diagnostics/Tuning Pack Licensing
- ยังไม่ได้ตรวจความถูกต้องทุก Parameter ทุก Edition/Version หรือทำ Oracle Live Lab; ไม่ยกระดับสถานะเป็น 100% Verified

## Oracle sandbox execution/evidence pack — October 21, 2026

- เพิ่ม [8 SQL*Plus read-only inspection scripts และ Step-by-step Runbook](../Oracle-Database/10-Labs/Sandbox-Validation/README.md) (Sandbox only) และ [Expected vs Actual Evidence Template](../Oracle-Database/10-Labs/Sandbox-Validation/VALIDATION-EVIDENCE-TEMPLATE.md)
- Source script ครอบคลุม Context, Services/PDB, Storage/Undo, Data Pump Metadata, Unified Audit Policies, AutoTask, Performance Metadata และ Optional Cached Plan (DBMS_XPLAN)
- เพิ่ม Python Static Validator + Negative Safety Fixtures; GitHub Actions ตรวจไม่ให้มี DDL/DML, Host/SPOOL/Spool Raw Logs, Anonymous PL/SQL หรือ Script Include ใน Pack; **CI ไม่ได้รัน Oracle SQL**
- เชื่อม Lab 01/02/08/09/10/11/12/13 เข้าคู่มือ. 31 Oracle Lesson IDs, 13 Original Companion Labs และ 83 Site Lessons ยังคงเดิม
- Evidence แนะนำให้เก็บ Raw Output ใน Private Storage และเผยแพร่เฉพาะ Sanitized Portfolio Results ภายหลัง; สถานะเริ่มต้นทุก Script = NOT_EXECUTED

## Oracle sandbox evidence attestation follow-up — October 21, 2026

- เพิ่ม [JSON Expected vs Actual Input](../Oracle-Database/10-Labs/Sandbox-Validation/EVIDENCE-INPUT-TEMPLATE.json) และ [Offline Attestation Checker](../Oracle-Database/qa/assess_sandbox_evidence.py) ซึ่งไม่เชื่อม DB/Internet และไม่เรียก SQL
- Public Template เริ่มด้วย `NOT_EXECUTED` ทั้ง 8 SQL Cases; `PASSED` ต้องมี Approved Isolated Sandbox, Oracle Version, Timezone-aware Execution Time, Operator/Reviewer, Sanitized Actual และ Private Evidence Reference
- Negative Fixtures ป้องกัน False PASS จากข้อมูลไม่ครบ, ข้อมูลที่เติม Actual ขณะ NOT_EXECUTED, ไม่มี ORA Error ตอน SKIPPED_PRIVILEGE, Data Sensitive/IP, Case ID ซ้ำ และ Timestamp ไม่มี Timezone
- Ignore `Oracle-Database/10-Labs/Sandbox-Validation/private/` ป้องกันเผลอ Commit Private Evidence; ต้องยังตรวจ Git Status ก่อนทุก Push (gitignore ไม่ป้องกัน `git add -f`)
- GitHub Actions ตรวจกติกา Input Template แบบ Static; ไม่มี Oracle Connection และไม่มีการยืนยันความจริงของหลักฐานที่ผู้ใช้กรอก

## GCP Activities 01–17 — Deep note and visual reorganization (2026-10-21)

- เสริม 17 Activity pages ด้วย Original Deep Learning Notes เฉพาะบริบท, Worked Cases, Decision/Failure Patterns และ Mermaid Diagrams ในแต่ละหน้าโดยไม่ย้าย/เปลี่ยน Stable Progress IDs
- แก้ปัญหา Raw HTML `img src` ใช้ Relative URL หลัง Deploy; Rewrite เป็น `/Personal-Knowledge-Base/kb-assets/...` และตรวจ SVG Assets ใน `dist`
- จัดเมนู GCP ให้แสดง **17 Activities + Reference Library 1 Link**; Modules 13, Labs 6 และ Review ยังคงอ่านได้จาก Library และ Contextual Links ไม่ถูกลบ
- `website/scripts/verify-gcp.mjs` ตรวจว่าทั้ง 17 มีแผนภาพ/เนื้อหาใหม่ และ Website Build มี Icon SVG; QA นี้ไม่ได้ยืนยันว่า Official Google Skills Unit ทุกหน้าถูกถอดแบบหรือทุก Lab ถูก Execute จริง
