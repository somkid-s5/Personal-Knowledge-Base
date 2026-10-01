# Lab 1 — Exploring and Interacting with the AWS Management Console and AWS CLI

> คู่มือภาษาไทยสำหรับทำ Lab 1 จาก *Architecting on AWS 7.12.4 Lab Guide*  
> ช่วงต้นฉบับ: หน้า 4–18  
> คงชื่อเมนู ปุ่ม field คำสั่ง CLI และค่าที่ต้องกรอกเป็นภาษาอังกฤษตาม Console

## เป้าหมาย

หลังจบ Lab นี้ คุณจะสามารถ:

- ใช้งาน `AWS Management Console`
- สร้าง resource ผ่าน Console
- ใช้งาน `AWS CLI`
- สร้างและจัดการ Amazon S3 ผ่าน CLI

---

## Start Lab

1. กด `Start Lab`
2. รอจน AWS services ที่ระบบเตรียมไว้พร้อมใช้งาน
3. กด `Open Console`
4. ระบบจะเปิด `AWS Management Console` ใน tab ใหม่และ sign in ให้อัตโนมัติ

> **สำคัญ:** อย่าเปลี่ยน Region เว้นแต่ขั้นตอน Lab ระบุให้เปลี่ยน

---

# Task 1 — Explore and configure the AWS Management Console

## Task 1.1 — Choose an AWS Region

1. ที่ navigation bar ด้านบน ให้กด `Region selector`
2. เลือก Region ใดก็ได้เพื่อดูการเปลี่ยน Region
3. เปิด `General Settings` จากไอคอนรูปเฟือง
4. กด `See all user settings`
5. ในหัวข้อ `Localization and default Region` กด `Edit`
6. ที่ `Default Region` เลือก Region จาก dropdown
7. กด `Save settings`
8. หากมีปุ่ม `Go to new default Region` ให้กดเพื่อไป Region ที่ตั้งเป็น default
9. กดโลโก้ `AWS` มุมซ้ายบนเพื่อกลับหน้า Console home
10. จากนั้นที่ `Region selector` เลือก Region ให้ตรงกับค่า `LabRegion` ที่แสดงในหน้าคำสั่ง Lab

> ก่อนทำ Task ถัดไป ให้ตรวจว่า Region ใน Console ตรงกับ `LabRegion`

## Task 1.2 — Search with the AWS Management Console

1. ที่ช่อง `Search` บน navigation bar พิมพ์ `cloud`
2. สังเกตว่าผลลัพธ์จะถูก refine ตามตัวอักษรที่พิมพ์
3. ใช้ category ด้านซ้ายเพื่อกรองประเภทผลลัพธ์
4. ในส่วน `Services` เลือก `AWS Cloud Map`
5. เมื่อเปิด service console แล้ว กดโลโก้ `AWS` เพื่อกลับหน้า Console home

## Task 1.3 — Add and remove favorites

### เพิ่ม service เข้า Favorites

1. กดเมนู `Services`
2. เลือก `All services` หรือ `Recently visited`
3. ที่ service ที่ต้องการ ให้กดไอคอนรูปดาวด้านซ้ายของชื่อ service
4. เข้า `Favorites` เพื่อดูรายการ service ที่ปักไว้

### เอา service ออกจาก Favorites

1. เปิด `Services`
2. ที่รายการ `Favorites` ให้กดดาวของ service ที่ต้องการเอาออก

## Task 1.4 — Open a console for a service

1. เปิด `Services`
2. เลือก service จาก `Favorites`, `Recently visited` หรือ `All services`
3. เมื่อดูเสร็จ ให้กดโลโก้ `AWS` เพื่อกลับหน้า Console home

## Task 1.5 — Create and use dashboard widgets

1. กด `+ Add widgets`
2. เลือก widget ที่ต้องการ แล้วลากลงหน้า Console home
3. ทดลองย้าย widget โดยลาก title bar
4. เลือก widget `Recently Visited` แล้วลากมุมขวาล่างเพื่อ resize
5. ทดลองลบ widget:
   - เลือก `Welcome to AWS`
   - กดไอคอน `...`
   - เลือก `Remove widget`

---

# Task 2 — Create an Amazon S3 bucket using the AWS Management Console

> ตรวจ Region ให้ตรงกับ `LabRegion` ก่อนเริ่ม

1. เปิด `Services`
2. เลือก `All Services`
3. เลือกหมวด `Storage`
4. เลือก `S3`
5. ที่ navigation pane เลือก `General purpose buckets`
6. กด `Create bucket`
7. ใน `General configuration` ตั้งค่า:
   - `Bucket name`: `labbucket-NUMBER`
   - แทน `NUMBER` ด้วยตัวเลขสุ่ม เช่น `labbucket-987987`
8. ตรวจว่า `AWS Region` ตรงกับ `LabRegion`
9. ค่าอื่นคง default
10. กด `Create bucket`

ผลที่ควรได้: มีข้อความประมาณ `Successfully created bucket ...` และ bucket ใหม่แสดงในรายการ

---

# Task 3 — Upload an object into the Amazon S3 bucket using the S3 console

1. ดาวน์โหลดไฟล์รูปที่ Lab ให้มาและบันทึกชื่อประมาณ `HappyFace.jpg`
2. ใน Amazon S3 เลือก bucket `labbucket-xxxxx`
3. กด `Upload`
4. กด `Add files`
5. เลือก `HappyFace.jpg`
6. กด `Upload`
7. เมื่อขึ้น `Upload succeeded` กด `Close`

---

# Task 4 — Create an Amazon S3 bucket and upload an object using the AWS CLI

## Task 4.1 — Connect to the Command Host using Session Manager

1. ที่ช่อง `Search` ของ Console พิมพ์ `EC2`
2. ใน navigation pane เลือก `Instances`
3. เลือก instance `Command Host`
4. กด `Connect`
5. เลือก tab `Session Manager`
6. กด `Connect`

จะเปิด terminal session ของ `Command Host` ใน browser tab ใหม่

> อีกวิธีคือเปิด URL จากค่า `CommandHostSessionUrl` ที่ Lab ให้มา

## Task 4.2 — Use high-level S3 commands with the AWS CLI

### ดู bucket ทั้งหมด

```bash
aws s3 ls
```

### สร้าง bucket ผ่าน CLI

เปลี่ยน `NUMBER` เป็นเลขสุ่ม:

```bash
aws s3 mb s3://labclibucket-NUMBER
```

ตัวอย่าง:

```bash
aws s3 mb s3://labclibucket-787787
```

ผลที่คาดหวังจะมีข้อความลักษณะ:

```text
make_bucket: labclibucket-xxxxx
```

ตรวจว่า bucket ถูกสร้าง:

```bash
aws s3 ls
```

### Copy ไฟล์เข้า S3

แทน `labclibucket-NUMBER` ด้วยชื่อ bucket ที่สร้างจริง:

```bash
aws s3 cp /home/ssm-user/HappyFace.jpg s3://labclibucket-NUMBER
```

ผลที่คาดหวังจะมีข้อความ `upload:` และปลายทางเป็น bucket ของคุณ

### ดู object ใน bucket

```bash
aws s3 ls s3://labclibucket-NUMBER
```

ควรเห็น `HappyFace.jpg` ใน output

---

# End Lab

1. กลับไป `AWS Management Console`
2. มุมขวาบนเลือก `AWSLabsUser`
3. เลือก `Sign out`
4. กลับหน้า Lab แล้วกด `End Lab`
5. ยืนยันการจบ Lab

---

## สิ่งที่ควรได้หลังทำ Lab 1

- ใช้ `AWS Management Console` และเปลี่ยน Region ได้
- ใช้ Search / Favorites / Widgets ได้
- สร้าง Amazon S3 bucket ผ่าน Console ได้
- Upload object ผ่าน Console ได้
- เชื่อม EC2 ด้วย `Session Manager`
- ใช้ `aws s3 ls`, `aws s3 mb`, `aws s3 cp` ผ่าน `AWS CLI` ได้
