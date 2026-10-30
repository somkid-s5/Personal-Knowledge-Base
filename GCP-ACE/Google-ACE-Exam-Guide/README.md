# Google ACE Exam Guide

> Status: Scaffold / pending official objective-by-objective verification  
> Created: 2026-10-30  
> Teaching language: Thai; retain official English technical terminology  
> Source of truth: Google Associate Cloud Engineer official exam guide and Google Cloud documentation  
> Track: Exam-guide-first, independently readable curriculum (not Google Skills Activity-first)

## เป้าหมาย

หลักสูตรเตรียมสอบ Google Cloud Associate Cloud Engineer ที่อ่านได้จบในตัวเอง อธิบายแนวคิด เหตุผล ตัวอย่าง CLI การตัดสินใจ และการแก้ปัญหา โดยไม่บังคับทำ Google Skills Lab

โฟลเดอร์นี้เป็นหลักสูตร **ใหม่แยกจาก GCP-ACE Activities เดิม** ห้ามย้าย ลบ หรือเขียนทับเอกสารเดิมโดยไม่ตรวจและอนุมัติแผน migration ก่อน

## โครงบทเรียนเป้าหมาย

จัดตาม 4 sections ของ official exam guide และตรวจเลข objective ก่อนล็อกจำนวน chapters:

1. Setting up a cloud solution environment (1.1–1.2)
2. Planning and implementing a cloud solution (2.1–2.4)
3. Ensuring successful operation of a cloud solution (3.1–3.4)
4. Configuring access and security (4.1–4.2)

รวม 12 numbered objectives ตาม outline ที่จะตรวจยืนยันกับ Exam Guide ล่าสุด ไม่สร้างชื่อ chapter หรือเนื้อหาโดยคาดเดาจากความจำ

## มาตรฐาน Chapter

ทุกบทต้องมี objective mapping, definitions, first-principles explanations, decision matrix, verified CLI operations, worked example, troubleshooting, original MCQ (single and multiple select), recall questions, citations และวันที่ตรวจสอบ

## Diagram policy

- **MUST** ใช้ Diagram Design Skill ที่ผู้ใช้กำหนดเป็นเครื่องมือหลักสำหรับ Architecture, Infrastructure, Network, Cloud, System และ Data Flow Diagram
- เก็บภาพภายใต้ `assets/diagrams/` พร้อม relative paths จากบทเรียน
- เก็บ editable source เมื่อทำได้ และตรวจไฟล์ภาพ/ลิงก์ก่อน publish
- ไม่ใช้ ASCII Art หรือ Mermaid แบบหยาบแทนภาพ Architecture
- ถ้า Diagram Design Skill เรียกไม่ได้ ให้แจ้งข้อจำกัดและหยุดเฉพาะงาน Diagram; ห้ามอ้างว่าใช้ Skill แล้ว
- ยังไม่สร้าง Diagram ใดในระยะ Scaffold

## แผนงาน

- Phase 0: repository audit และ source/version check
- Phase 1: objective-by-objective coverage matrix และ chapter outline
- Phase 2: สร้าง chapter 1.1 เป็นแม่แบบ พร้อมตรวจคุณภาพ
- Phase 3: เขียนและตรวจทีละ chapter
- Phase 4: mock exam 50 ข้อ, cheat sheet, navigation, progress
- Phase 5: QA สำหรับ coverage, diagrams, CLI, explanations, links และ build

## ขอบเขตที่ยังไม่เสร็จ

ยังไม่มี objective coverage matrix ที่ verify แล้ว, chapter เนื้อหาจริง, diagram, mock exam และผล QA จึงไม่ประกาศว่าพร้อมสอบหรือครบ 100%

## แหล่งอ้างอิง

- [Associate Cloud Engineer certification](https://cloud.google.com/learn/certification/cloud-engineer)
- [Exam Guide PDF (file name 063026)](https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf)
- [Google Cloud documentation](https://cloud.google.com/docs)

รายละเอียดการยืนยันฉบับและ objective ดู [SOURCE-MANIFEST.md](./SOURCE-MANIFEST.md)
