# 📚 Smart Learning Hub

เว็บสมุดโน้ตการเรียนส่วนตัว: เลือกวิชา อ่านเนื้อหา ดู Diagram ทำ Lab และบันทึกว่าอ่านจบบทไหนแล้ว

## เริ่มใช้งาน

ต้องใช้ Node.js เวอร์ชันที่รองรับ Astro 7 (แนะนำ Node.js 22.12 หรือใหม่กว่า)

~~~bash
cd website
npm install
npm run dev
~~~

เปิด http://localhost:4321/Personal-Knowledge-Base/

คำสั่ง npm run build จะสร้างเว็บ Static ไปยัง website/dist/

## ระบบแปลงโน้ตเป็นเว็บ

สคริปต์ scripts/sync-content.mjs อ่าน Markdown จากโฟลเดอร์วิชาที่ root โดยตรงทุกครั้งก่อน Build ไม่แก้ไฟล์โน้ตเดิม และทำหน้าที่:

- สร้างหน้าเริ่มต้นและหน้าเลือกวิชาในมุมมองของผู้เรียน
- จัดไฟล์ .md เป็นหน้าเว็บ และแปลงลิงก์ภายใน/รูปภาพ
- ซ่อนเอกสารบริหารเนื้อหา (audit, source manifest, QA) จาก Sidebar โดยไม่ลบไฟล์ต้นฉบับ
- สร้างหน้าแนะนำลำดับการอ่านของแต่ละวิชา

ภาษาที่แสดงหน้าแรกคือสมุดโน้ตส่วนตัว ไม่ใช่หน้าโฆษณาคอร์สจากภายนอก แหล่งอ้างอิงในเนื้อหาที่จำเป็นต่อความถูกต้องและสิทธิการใช้งานยังคงอยู่

## ฟีเจอร์และข้อจำกัด

- Astro + Starlight + Mermaid, Static เท่านั้น ไม่ใช้ Database
- Search, Sidebar, Dark Mode, Diagram, Code Highlight
- ปุ่มเรียนจบแต่ละหน้าเก็บสถานะใน localStorage เฉพาะ Browser
- ยังไม่มี Login, Sync ข้ามอุปกรณ์, ระบบ Quiz แบบเก็บคะแนน หรือ AI Tutor
- ตัวลำดับเรียนอัตโนมัติเป็นการเริ่มต้น ไม่ได้แทน Curriculum ที่ตรวจสอบแล้วของแต่ละวิชา
- อย่าคาดเดาว่า URL ปลายทางออนไลน์แล้ว จนกว่า Actions/Pages จะ Deploy ผ่านจริง

## GitHub Pages

1. ตรวจสอบก่อนเปิด Public ว่าไม่มีข้อมูลลับ หรือไฟล์ที่ไม่มีสิทธิ์เผยแพร่
2. Merge PR ของเว็บไซต์เมื่อ CI ผ่าน
3. ไปที่ Settings → Pages → Build and deployment → Source: GitHub Actions
4. Push เข้า main เพื่อให้ workflow ทำ Build และ Deploy

URL ที่คาดหมาย: https://somkid-s5.github.io/Personal-Knowledge-Base/

หากเปลี่ยนชื่อ Repo หรือใช้ Custom Domain ให้แก้ base/site ใน website/astro.config.mjs และ base ใน scripts/sync-content.mjs
