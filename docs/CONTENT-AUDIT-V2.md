# 📋 Knowledge Base V2 — Content Audit & Cleanup Tracker

## Baseline

บทเรียนหลักที่นิยามใน manifest มี 78 ขั้น (AWS 15, Azure 2, GCP 17, ISC2 13, Oracle 31) — เป็นขั้นในแผนอ่าน ไม่ใช่การประกาศว่าเนื้อหาทั้งหลักสูตรสมบูรณ์

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
| P2 | AWS 7 Labs เทียบ 34 Projects | ไม่รวมเป็นบทเดียวโดยอัตโนมัติ เพราะระดับฝึกต่างกัน |
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
