# 📚 Knowledge Base V2 — Content Architecture

## Mission

สมุดโน้ตส่วนตัว 5 วิชา ที่เลือกวิชาแล้วรู้ทันทีว่าต้องเรียนอะไร ต่อบทไหน ทำ Lab ไหน และทบทวนอย่างไร ไม่ใช่เว็บแสดงรายการไฟล์ที่เรียงอัตโนมัติ

## Six learner-facing roles

| Role | Purpose | Progress |
|---|---|---|
| 🗺️ Learning Path | แผนลำดับเดียวต่อวิชา | ใช้รวมความคืบหน้า |
| 📘 Lessons | ความเข้าใจหลัก Concept, Architecture, Decision | Lesson ID ถาวร |
| 🧪 Labs | ฝึกตรวจสอบ ทดลอง แก้ปัญหา Cleanup | บันทึกแยกจากบทหลักในอนาคต |
| 📝 Practice | Scenarios, Quiz, Exam Mode | แยกจากบทหลัก |
| 🧠 Review | Cheatsheet, Visual Memory | ไม่บังคับให้เรียนจบ |
| 📚 Reference | Deep Dives, Version Delta | ไม่บังคับให้เรียนจบ |

QA, provenance, audits, session memory และ working drafts คือเอกสารดูแล Repo ไม่ใช่บทเรียนในเว็บ สิ่งที่ถูกซ่อนจากเว็บยังอยู่ใน GitHub และยังเข้าถึงได้เมื่อ Repo เป็น Public

## Structure: logical V2 first, physical migration later

```text
Personal-Knowledge-Base/
├── AWS-SAA-C03/course.yaml
├── Azure-AZ-104/course.yaml
├── GCP-ACE/course.yaml
├── ISC2-CC/course.yaml
├── Oracle-Database/course.yaml
├── website/
│   ├── learning-plan.mjs
│   ├── content-policy.mjs
│   ├── scripts/sync-content.mjs
│   └── scripts/audit-content.mjs
├── docs/KNOWLEDGE-BASE-V2.md
└── [existing Markdown notes, Labs and asset paths unchanged]
```

อนาคตอาจย้ายเนื้อหาให้ใช้ 01-Lessons, 02-Labs, 03-Practice, 04-Review, 05-Reference และ internal ได้ แต่ **ไม่ย้ายไฟล์จริงจนกว่าจะมี Redirect/Link Migration Test**

## Canonical curriculum

Course manifest ของแต่ละวิชาเป็น Source of Truth เดียวสำหรับลำดับเรียนและ Stable Lesson ID ส่วน website/learning-plan.mjs ทำหน้าที่อ่าน manifest ไม่กำหนดหลักสูตรซ้ำ

- เมื่อแก้เนื้อหา: แก้ Markdown เดิม
- เมื่อเปลี่ยนลำดับ: แก้ course.yaml
- เมื่อเปลี่ยนชื่อหรือย้ายไฟล์: แก้ path ใน course.yaml แต่ **อย่าเปลี่ยน Lesson ID**
- ไม่ใช้ Path, Filename, หรือเลขลำดับใหม่แทนรหัสความคืบหน้าเดิม
- เมื่อวิชาที่ยังขาดบทหลัก เช่น Azure ให้บอกว่ามีช่องว่าง ไม่สร้างบทว่างหรืออ้างว่าครบ

## Content duplication policy

**One Concept, One Canonical Explanation** แต่ไม่ใช่ One File per Keyword

1. หากสองบทอธิบายเรื่องเดียวกันจริงและมีคำอธิบายซ้ำ ตรวจรายละเอียดและเลือกบทหลักหนึ่งแห่ง
2. Lab, Scenario, Cheatsheet อธิบายหรือใช้แนวคิดเดิมเพื่อวัตถุประสงค์ต่างกัน ควรเก็บและลิงก์กลับ Canonical Lesson
3. Before merge ต้องรักษาตัวอย่างเฉพาะ Commands, Edge Cases, Troubleshooting และ Diagrams ของทั้งสองบท
4. Archive เฉพาะไฟล์ Draft ที่พิสูจน์ว่าไม่มีสาระเฉพาะและมีลิงก์ชดเชยแล้ว ไม่ลบด้วยสคริปต์อัตโนมัติ
5. ตรวจ Licensing, Technical Accuracy, current certification scope และสถานะ Lab Execution แยกจาก similarity

## Quality gate

1. Manifest มีไฟล์จริงและรหัสบทไม่ซ้ำกัน
2. Internal documents ไม่โผล่เป็นบทเรียนหรือ Search
3. Progress ของผู้เรียนเดิมยังถูก migrate จาก Browser v1 เป็น v2
4. Astro Build, Link CI, Repo Quality และ Oracle QA ผ่าน
5. npm run audit:content สร้างรายงาน Inventory และ Candidate Overlap สำหรับตรวจด้วยคน

## Physical migration gate (future)

ตรวจลิงก์และ SVG ก่อนย้าย → รักษา Lesson ID → เพิ่ม Redirect ให้ URL เดิม → ตรวจ progress → ทดสอบ Lab/เนื้อหา → ตรวจ CI → ค่อยลบ path เก่าที่ไม่มีผู้ใช้อ้างอิง
