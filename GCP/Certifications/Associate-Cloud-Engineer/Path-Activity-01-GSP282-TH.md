# Activity 01 — A Tour of Google Cloud Hands-on Labs (GSP282)

[กลับคู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [เปิดกิจกรรม GSP282](https://www.skills.google/focuses/2794?parent=catalog&path=11) · [แผนที่ Lab](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md)

> ตรวจเนื้อหา official lab: 5 ตุลาคม 2026  
> เอกสารนี้สรุปหลักการและช่วยเตรียมอ่าน ไม่ใช่สำเนาคำสั่งหรือเฉลย grader ของ Google Skills

## เป้าหมายของบท

เมื่อจบบทนี้ เธอควรเริ่ม Google Skills lab ได้โดยไม่สับสนกับบัญชีหรือ project ส่วนตัว, บอกได้ว่า IAM role ใช้ควบคุมอะไร, ตรวจได้ว่า API เปิดอยู่ใน project หรือยัง และจบ session อย่างปลอดภัย

### ก่อนเริ่ม

ควรรู้วิธีเปิดเว็บเบราว์เซอร์และคัดลอกข้อมูลจากหน้าเว็บได้ ไม่จำเป็นต้องมี Google Cloud project ส่วนตัวหรือเคยใช้ gcloud มาก่อน

### หลังจบบท

เธอจะทำสิ่งเหล่านี้ได้:

- แยกบัญชีชั่วคราว, project สำหรับ lab และบัญชีส่วนตัวออกจากกัน
- อ่าน Project ID และตรวจ project ที่ console กำลังเปิด
- อธิบาย principal, role และ permission ด้วยภาษาง่าย ๆ
- เข้าใจว่า enable API กับให้ IAM access เป็นคนละการตั้งค่า
- เช็ก progress และปิด lab session เมื่อทำเสร็จ

### คำศัพท์ใหม่

| คำ | ความหมายแบบง่าย |
|---|---|
| Lab session | ช่วงเวลาฝึกที่ Google Skills เตรียมบัญชีและ Cloud project ชั่วคราวให้ |
| Project | พื้นที่จัดกลุ่มทรัพยากร การตั้งค่า และสิทธิ์ของงานหนึ่งชุด |
| Principal | ตัวตนที่กำลังขอใช้ Cloud เช่น user, group หรือ service account |
| Role | ชุด permission ที่ให้กับ principal |
| API | ช่องทางมาตรฐานที่ Console, CLI หรือ application ใช้เรียกบริการ |

---

## 1. ทำไม lab ถึงแยกจาก project ส่วนตัว

ลองนึกถึงห้องฝึกที่ให้บัญชีชั่วคราว กุญแจ และอุปกรณ์สำหรับทำแบบฝึกหัด พอหมดเวลาห้องถูกปิดและกุญแจใช้ไม่ได้อีก นี่คือแนวคิดของ Skills lab:

1. กด Start Lab
2. ระบบเตรียมบัญชีและ project ที่กำหนดสิทธิ์ไว้ พร้อมเริ่มนับเวลา
3. เราทำงานใน project นั้นและตรวจความคืบหน้าผ่าน Check my progress
4. กด End Lab เมื่อจบ; เมื่อเวลาหมด credentials ใช้ไม่ได้และ resource ของ lab ถูกลบตามระบบ

ข้อดีคือฝึกได้โดยไม่เอา resource ไปปนกับงานจริง แต่เงื่อนไข permission และชื่อ resource เป็นของ lab session นั้น จึงห้ามสมมติว่าเหมือน project ส่วนตัวทุกอย่าง

**ข้อควรทำก่อนเริ่ม**

- ถ้ามี Cloud Console ส่วนตัวเปิดค้างอยู่ ให้ sign out หรือเปิด lab ในหน้าต่าง Incognito/Private แยก เพื่อไม่ให้สลับบัญชีผิด
- ใช้ username/password ที่แสดงใน Lab details ของ session ปัจจุบันเท่านั้น
- อย่าบันทึก password, token หรือข้อมูล credentials ลงไฟล์โน้ต
- อ่าน timer และค่าที่ lab ให้ก่อนสร้างหรือแก้ resource

---

## 2. Project คือขอบเขตการทำงานหลัก

Project ใช้จัดกลุ่ม resource และการตั้งค่าที่เกี่ยวข้อง ตัวอย่างเช่น VM, network, bucket, API และ IAM bindings ของ application หนึ่งชุด

Project มีตัวระบุ 3 แบบ:

| ค่า | ใช้บอกอะไร | ตัวอย่างสมมติ |
|---|---|---|
| Project name | ชื่อที่คนอ่านง่าย แก้ชื่อได้ | Training Sandbox |
| Project ID | รหัสข้อความที่ใช้กับ CLI/API และต้องไม่ซ้ำทั่ว Google Cloud | ace-lab-som-2026 |
| Project number | หมายเลขตัวเลขที่ระบบกำหนด | 123456789012 |

อย่าสับสนระหว่าง Project name ที่เห็นบนหัว Console กับ Project ID ที่ต้องใส่ในคำสั่ง ตรวจทั้งสองแห่งให้แน่ใจก่อนเปลี่ยนค่าหรือรันคำสั่ง

ใน GSP282 อาจเห็น project สำหรับทำงานและ project ที่เก็บ learning resources ที่ใช้ร่วมกัน เช่น Qwiklabs Resources project ให้ทำงานใน project ที่ lab มอบหมาย และอย่าแก้หรือลบ project resources ที่ระบุว่า shared/read-only

### จุดสังเกตใน Console

- ชื่อ project ที่มุมบนไม่ได้แปลว่าเป็น Project ID
- Project info แสดงข้อมูลระบุตัว project
- project selector ใช้สลับ project; การสลับนี้เปลี่ยนขอบเขตที่คำสั่งและการเปลี่ยนแปลงถัดไปจะมีผล
- lab ใหม่อาจออก project ใหม่ แม้จะใช้ browser tab เดิม

---

## 3. IAM: ใครกำลังทำอะไรได้บ้าง

ในหน้า IAM ให้มองเป็นคำถามสามข้อ:

1. **ใคร?** — principal เช่น user ที่ lab มอบให้
2. **ทำอะไรได้?** — permission ที่ role รวมไว้
3. **บน resource ไหน?** — เช่น project หรือ resource ลูกภายใน project

คำศัพท์ที่ใกล้กัน:

- **Authentication** ตรวจว่า “เธอเป็นใคร”
- **Authorization** ตรวจว่า “ตัวตนนี้ทำ action นี้กับ resource นี้ได้ไหม”
- **Role** รวม permission หลายข้อและถูก grant ให้ principal
- **IAM binding** คือความสัมพันธ์ระหว่าง principal, role และ scope ที่ role มีผล

Google Cloud มี basic, predefined และ custom roles:

| ประเภท | ใช้เมื่อ | ข้อควรระวัง |
|---|---|---|
| Basic roles เช่น Viewer, Editor, Owner | ทำความเข้าใจ lab เบื้องต้นหรือกรณีที่ต้องใช้ขอบเขตกว้าง | ให้สิทธิ์กว้างมาก; อย่าใช้เป็น default ในระบบ production |
| Predefined roles | ต้องการชุด permission ที่ Google ดูแลสำหรับงานบริการหนึ่ง | ตรวจคำอธิบายและ permission ก่อน grant |
| Custom roles | ต้องการชุด permission เฉพาะขององค์กร | ต้องดูแลและทบทวนเอง |

GSP282 ใช้ basic roles เพื่อสอนหน้าตา IAM: Viewer ดูข้อมูลที่ role อนุญาต, Editor แก้ resource ได้กว้าง และ Owner มีสิทธิ์จัดการ project access เพิ่มด้วย รายละเอียดจริงให้ดู role definition ปัจจุบัน อย่าสรุปว่า “Editor ทำได้ทุกอย่าง” หรือใช้ role กว้างใน production โดยไม่ตรวจ

**กฎจำง่าย:** เห็น permission denied ไม่ได้แปลว่า API ปิดเสมอ; และ enable API ก็ไม่ได้ทำให้ผู้ใช้มี IAM permission โดยอัตโนมัติ

---

## 4. API: เปิดความสามารถให้ project

Google Cloud APIs คือ interface ที่ client หรือ service ใช้เรียกความสามารถของ Google Cloud API มักถูกเปิดใช้ **ต่อ project**:

- ถ้ายังไม่ enable API: project อาจเรียก service นั้นไม่ได้ แม้ตัวตนจะมี IAM role
- ถ้า enable API แล้ว: ยังต้องมี IAM permission ที่เหมาะสมก่อนทำ action
- API Library ใช้ค้นหา API และดูรายละเอียดของ API ก่อนเปิด

GSP282 ให้ฝึกเปิด Dialogflow API เพื่อให้เห็นกระบวนการใน API Library จุดประสงค์คือฝึก enable API ไม่ได้หมายความว่าต้องสร้าง Dialogflow agent เพื่อสอบ ACE

### ตัวอย่างจำลอง: API เปิดแล้ว แต่ยังเข้า service ไม่ได้

- Project เปิด API แล้ว
- User ไม่มี role ที่ให้สร้างหรือแก้ resource ของ service
- ผลคือ request ยังอาจถูกปฏิเสธด้วย permission error

กลับกัน ถ้า user มี role แต่ API ถูกปิด ก็อาจเจอ error เรื่อง service/API disabled

**แยกวิเคราะห์จากหลักฐาน**

| หลักฐาน | ตรวจต่อ |
|---|---|
| แจ้ง service/API not enabled | ตรวจ project ที่เลือกและ API Library |
| แจ้ง permission denied | ตรวจ principal, role, IAM scope และ policy |
| เห็น resource คนละชุด | ตรวจ project selector และ Project ID |

---

## 5. ทำกิจกรรม GSP282 ตามลำดับ

ทำขั้นตอนจริงในหน้ากิจกรรม Google Skills เพราะ progress checker ตรวจ lab project ที่ระบบจัดให้

### ขั้นที่ 1 — เริ่ม lab และตรวจ credentials

- **ทำอะไร:** กด Start Lab และอ่าน Lab details
- **ทำไม:** ระบบต้องสร้าง project และตัวตนสำหรับ session
- **ตรวจผล:** มี timer, username, password และ Project ID ของ session
- **ถ้าต่างออกไป:** อย่าใช้ credential จาก session เก่า; refresh หรือทำตามข้อความของ Skills

### ขั้นที่ 2 — เปิด Cloud Console ด้วยบัญชีของ lab

- **ทำอะไร:** ใช้ปุ่มเปิด Console ใน Lab details; ถ้ามีหน้าเลือกบัญชีให้ใช้ Use another account แล้วใส่ username/password ที่ lab แสดง
- **ทำไม:** Console ต้องใช้ตัวตนที่ได้รับ IAM role ใน project ชั่วคราว
- **ตรวจผล:** เปิด Console ได้และเห็น project ของ lab
- **ถ้าต่างออกไป:** ตรวจว่าหน้า browser ไม่ได้เลือกบัญชีส่วนตัวหรือบัญชีบริษัท

### ขั้นที่ 3 — อ่าน Project info และสำรวจ project selector

- **ทำอะไร:** อ่าน project name/ID/number แล้วเปิดตัวเลือก project เพื่อดู project ที่มีสิทธิ์
- **ทำไม:** ในองค์กรมีหลาย project และชื่อคล้ายกันได้
- **ตรวจผล:** สามารถชี้ Project ID ของ lab ได้ และกลับมาที่ project สำหรับทำงาน
- **ถ้าต่างออกไป:** อย่าทำงานใน shared learning resources project; กลับไปเลือก project ที่ Lab details ระบุ

### ขั้นที่ 4 — สำรวจ Navigation menu และ IAM

- **ทำอะไร:** เปิด Navigation menu เพื่อดูหมวดบริการ จากนั้นเข้า IAM เพื่อดู principal และ role ของบัญชี lab
- **ทำไม:** ต้องแยกบริการ Cloud ออกจากระบบกำหนดสิทธิ์ และรู้ว่าตัวตนปัจจุบันได้รับสิทธิ์อะไร
- **ตรวจผล:** พบ principal ของ session และอ่าน role ที่ผูกไว้ได้
- **ถ้าต่างออกไป:** ตรวจ project selector ก่อน เพราะหน้า IAM แสดง policy ของ project ที่เลือกอยู่

### ขั้นที่ 5 — Grant role ตาม task ของ lab

- **ทำอะไร:** ถ้า task ระบุให้ grant role, เพิ่ม principal ที่ task ให้มาและเลือก role ที่ระบุเท่านั้น
- **ทำไม:** เป็นการฝึกผูก role กับ principal บน scope ที่ถูกต้อง
- **ตรวจผล:** IAM แสดง principal และ role ที่เพิ่ม แล้วกด Check my progress ตาม task
- **ถ้าต่างออกไป:** ตรวจ email/principal ให้ตรง, role, project และข้อความ grader; อย่า grant Owner เพื่อให้ task “ผ่านง่าย”

> ใช้ principal ที่โจทย์กำหนดใน project ชั่วคราวเท่านั้น ห้ามทดลอง grant role ให้บัญชีบุคคลอื่นหรือ project จริง

### ขั้นที่ 6 — เปิด API ใน API Library

- **ทำอะไร:** เข้า APIs & Services → Library; ค้น API ที่ lab ระบุ (ใน GSP282 คือ Dialogflow API) แล้วกด Enable
- **ทำไม:** เป็นการเปิด service ให้ project ใช้งาน
- **ตรวจผล:** หน้ารายละเอียดแสดงว่า API เปิดแล้ว หรือ API ปรากฏในรายการ enabled services
- **ถ้าต่างออกไป:** ตรวจ Project ID, API ที่เลือก, permission และข้อความ error

### ขั้นที่ 7 — ตรวจ progress และจบ session

- **ทำอะไร:** กด Check my progress ของทุก task แล้วกด End Lab เมื่อเสร็จ
- **ทำไม:** grader อาจตรวจ task แยกกัน; การมี resource อยู่ไม่ได้แปลว่า checker บันทึกความคืบหน้าแล้ว
- **ตรวจผล:** คะแนน/สถานะกิจกรรมอัปเดต และ session จบ
- **ถ้าต่างออกไป:** อ่านข้อความ checker แล้วตรวจ resource, role หรือ API ใน project ของ session ก่อนกดตรวจซ้ำ

---

## 6. Cloud Shell: ตรวจ project ก่อนใช้ CLI (ตัวเลือกเสริม)

GSP282 หลัก ๆ สอน Cloud Console; ถ้าต้องการเทียบกับ CLI ให้ใช้ Cloud Shell ใน project lab ที่อนุญาตเท่านั้น

**บริบท:** Bash ใน Cloud Shell · ต้องเป็น lab session ที่ยัง active · ห้ามใช้กับ project ส่วนตัวโดยไม่ตั้งใจ

ก่อนทำอะไรที่เปลี่ยน resource:

    gcloud auth list
    gcloud config get-value project

ผลที่ต้องเห็น: account ที่แสดงเป็นบัญชี lab และ project เป็น Project ID ที่ตรงกับ Lab details

ถ้าคำสั่งแสดง project อื่น ให้หยุดและเลือก project ที่ถูกต้องก่อน อย่า enable API ใน project ที่ไม่แน่ใจ

เมื่อตรวจ project แล้วและ lab อนุญาตให้ใช้ CLI สำหรับ API task:

    gcloud services list --enabled --project=LAB_PROJECT_ID

แทน LAB_PROJECT_ID ด้วย Project ID จาก Lab details ผลคือรายการ API ที่เปิดใช้อยู่ หาก Dialogflow API ยังไม่อยู่และโจทย์ให้เปิด:

    gcloud services enable dialogflow.googleapis.com --project=LAB_PROJECT_ID

ตรวจรายการอีกครั้งหลังคำสั่งเสร็จ คำสั่ง enable API เปลี่ยนการตั้งค่าของ project จึงใช้เฉพาะใน lab project ที่กำหนดและ task ที่อนุญาตเท่านั้น

---

## 7. ปัญหาที่พบบ่อยและวิธีไล่ตรวจ

| อาการ | หลักฐานแรกที่ควรดู | วิธีแก้ |
|---|---|---|
| Sign in แล้วกลับมาหน้าเลือกบัญชี | URL/session และชื่อ account ที่ browser ใช้ | ใช้ account ชั่วคราวที่แสดงใน Lab details; ลองหน้าต่าง Incognito |
| หน้า Console แสดง project ไม่ตรง | Project name และ Project ID ใน project selector | กลับไปเลือก Project ID ของ session |
| Grant IAM แล้ว checker ยังไม่ผ่าน | principal, role, project scope และ task ที่ checker ระบุ | แก้ binding ให้ตรงโจทย์ แล้วกดตรวจซ้ำ |
| API เปิดไม่ได้ | project ที่เลือก, permission, ชื่อ API และข้อความ error | ตรวจว่าใช้ lab project; ถ้าขาด permission ให้ทำตาม lab/help ห้ามเพิ่ม role เองเกินโจทย์ |
| CLI ทำงานกับ project ผิด | ผล gcloud config get-value project | หยุดคำสั่งเปลี่ยน resource; ตั้ง project ตามค่าใน Lab details แล้วตรวจซ้ำ |
| timer หมดก่อนจบ | เวลาเหลือและ task ที่ยังไม่ checked | เริ่ม session ใหม่ตามสิทธิ์ของ Skills; resource/session เดิมอาจใช้ต่อไม่ได้ |

Troubleshooting ให้ไล่ตามลำดับ **บัญชี → project → task/resource → IAM/API → progress checker** อย่าเริ่มด้วยการให้สิทธิ์ Owner หรือสร้าง resource เพิ่มโดยไม่ดู error

---

## 8. Mini Lab แบบไม่เปลี่ยน resource

ใช้เวลา 5–10 นาที ระหว่างอ่านหรือหลังจบ GSP282:

1. โดยไม่เปิดเอกสาร ลองบอก Project ID ของ lab จาก memory
2. เปิด Lab details แล้วตรวจว่าจำถูกหรือไม่
3. ดู project ที่ Console เลือกอยู่ แล้วเทียบ ID
4. เปิด IAM แบบดูอย่างเดียวและบอกว่า principal ของ lab ได้ role อะไร
5. ปิดหน้า Console โดยไม่เปลี่ยน IAM/API; ถ้ายังอยู่ใน session ให้จบด้วย End Lab เมื่อกิจกรรมเสร็จ

**ผ่านเมื่อ:** บอก project, principal และ role ได้ถูกต้อง โดยไม่แก้ resource นอกเหนือจาก task ของ official lab

---

## 9. Knowledge Check

ลองตอบก่อนเปิดคำอธิบาย ให้คะแนนข้อละ 1 คะแนน; ผ่านที่ 4/5 และต้องผ่าน practical checkpoint ด้านล่างด้วย

### คำถาม

1. Project name, Project ID และ project number ต่างกันอย่างไร?
2. ถ้า API เปิดแล้วแต่ user ได้ permission denied ควรตรวจอะไร?
3. ทำไมไม่ควรใช้บัญชีส่วนตัวใน Cloud Console tab เดียวกับ lab session?
4. API enable กับการ grant IAM role แก้ปัญหาเดียวกันหรือไม่?
5. ใน production ควรใช้ Basic role แบบกว้างเป็นค่าเริ่มต้นหรือไม่?

<details>
<summary>เปิดดูคำตอบและเหตุผล</summary>

1. Name อ่านง่าย; ID เป็นรหัสที่ใช้เรียก project ใน CLI/API; number เป็น numeric identifier ที่ระบบกำหนด
2. ตรวจ principal, role, permission ที่ role มี และ scope/inheritance ของ IAM
3. เพราะ browser อาจเลือก identity/project ผิด ทำให้แก้ resource ผิดขอบเขต
4. ไม่ใช่; API enable เปิด service ให้ project เรียกได้ ส่วน IAM กำหนดว่า principal ทำ action อะไรได้
5. ไม่ควร; ใช้ predefined roles ที่แคบพอกับงานและ least privilege แล้วทบทวนสิทธิ์

**ทบทวน:** ข้อ 1 → ส่วน 2; ข้อ 2 และ 5 → ส่วน 3; ข้อ 3 → ส่วน 1; ข้อ 4 → ส่วน 4.

</details>

### Practical checkpoint

- [ ] ใช้ Lab details ระบุ username และ Project ID ได้ โดยไม่บันทึก secret
- [ ] Console แสดง project ของ session
- [ ] อธิบายได้ว่า IAM role และ API enable ทำคนละหน้าที่
- [ ] task ที่มี grader แสดง completion หลัง Check my progress
- [ ] จบ session ด้วย End Lab

**READY TO CONTINUE** เมื่อทำ checkpoint ได้ครบและได้อย่างน้อย 4/5 คะแนน

---

## 10. สรุปจำง่าย

1. Lab session มี identity, project และ timer ของตัวเอง
2. ตรวจ Project ID ก่อนทุก action ที่เปลี่ยน resource
3. IAM ตอบว่าใครทำอะไรได้; API enable เปิดความสามารถให้ project
4. Basic roles กว้าง; production ควรยึด least privilege
5. ใช้ task checker และ End Lab ให้ครบ

---

## แหล่งอ้างอิงทางการ

- [Google Skills — A Tour of Google Cloud Hands-on Labs (GSP282)](https://www.skills.google/focuses/2794?parent=catalog&path=11) — ขอบเขต task จริง, account/project ชั่วคราว, IAM, API Library และ progress check
- [Google Cloud IAM — Roles overview](https://cloud.google.com/iam/docs/roles-overview) — ประเภท role และแนวคิด role/permission
- [Google Cloud CLI — gcloud services enable](https://cloud.google.com/sdk/gcloud/reference/services/enable) — syntax สำหรับ enable API
- [Service Usage — Enable and disable services](https://cloud.google.com/service-usage/docs/enable-disable) — ภาพรวมเปิด/ปิด service ต่อ project
- [Resource Manager — Create and manage projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects) — การจัดการ project และ identifiers

