# 📋 Knowledge Base V2 — Content Audit & Cleanup Tracker

## Baseline

บทเรียนหลักที่นิยามใน manifest มี 78 ขั้น (AWS 15, Azure 2, GCP 17, ISC2 13, Oracle 31) — เป็นขั้นในแผนอ่าน ไม่ใช่การประกาศว่าเนื้อหาทั้งหลักสูตรสมบูรณ์

ก่อนเริ่ม V2 มี Markdown 241 ไฟล์ในห้าวิชา และไม่พบไฟล์ที่มี Git blob SHA เหมือนกันทั้งไฟล์ แต่อาจมีเนื้อหาซ้ำบางย่อหน้า/แนวคิด

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
| P2 | Azure Markdown Deep Dive เทียบ Interactive Learning | ทำ Crosswalk ต่อ 5 Objective Domains ก่อนแตกหรือรวมบท |
| P3 | ISC2 Lessons / Review / Scenario | เก็บหน้าที่ต่างกัน ปรับ Crosslinks ให้ชัด |

## Cleanup decision log

ใช้คำตัดสิน KEEP, LINK, CONSOLIDATE, ARCHIVE เมื่ออ่านเปรียบเทียบเนื้อหาและยืนยัน Unique Value แล้ว

| Files reviewed | Decision | Unique value preserved | Link test | Status |
|---|---|---|---|---|
| Oracle Teaching Atlas / 31 Lessons | KEEP Lessons, hide Draft from Site | ไม่มีการลบ/ย้าย | รอ Full Content Review | Navigation cleanup |
| QA, Source Manifest, Session Memory | HIDE from Site, KEEP in GitHub | เก็บเอกสารต้นฉบับครบ | CI Build | Navigation cleanup |

## Important

ไม่ลบเนื้อหาโดยอัตโนมัติจาก Similarity Score, ไม่อ้างว่า Lab ที่ยังไม่เคย Execute ผ่านแล้ว และไม่อ้างว่า Certification ทั้งหลักสูตรมีความครบ 100% โดยไม่มี QA ตาม Scope จริง
