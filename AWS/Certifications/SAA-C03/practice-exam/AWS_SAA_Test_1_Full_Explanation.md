# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 1: ข้อ 1 - 5)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 1
**โจทย์:**
A company is designing a banking portal that uses Amazon ElastiCache for Redis as its distributed session management component. To secure session data and ensure that Cloud Engineers must authenticate before executing Redis commands, specifically MULTI EXEC commands, the system should enforce strong authentication by requiring users to enter a password. Additionally, access should be managed with long-lived credentials while supporting robust security practices.

Which of the following actions should be taken to meet the above requirement?

**ตัวเลือก:**
- [ ] Generate an IAM authentication token using AWS credentials and provide this token as a password.
- [x] Authenticate the users using Redis AUTH by creating a new Redis Cluster with both the `--transit-encryption-enabled` and `--auth-token` parameters enabled.
- [ ] Set up a Redis replication group and enable the AtRestEncryptionEnabled parameter.
- [ ] Enable the in-transit encryption for Redis replication groups.

---
### 🎯 โจทย์ต้องการอะไร?
โจทย์ต้องการ**เพิ่มความปลอดภัย**ให้กับระบบจัดการ Session ที่ใช้ **Amazon ElastiCache for Redis** โดยมีเงื่อนไขหลักคือ:
1. วิศวกรต้องยืนยันตัวตน (Authenticate) ด้วยรหัสผ่านก่อนใช้คำสั่ง Redis (เช่น MULTI EXEC)
2. ต้องใช้ **Long-lived credentials** (รหัสผ่านที่มีอายุคงอยู่ยาวนาน)
3. มีความปลอดภัยที่ได้มาตรฐาน

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคู่คำบรรทัดแรกว่า **`ElastiCache for Redis`** + บรรทัดต่อมาบอกว่า **`require password`** (บังคับใส่รหัสผ่าน) = ให้มองหาช้อยส์ที่มีคำว่า **`Redis AUTH`** ทันที! (เพราะมันคือฟีเจอร์พาสเวิร์ดของฝั่ง Redis)
- ทริคที่ 2: เห็นคำว่า **`long-lived credentials`** (รหัสผ่านอยู่นานๆ) = ให้**ตัดช้อยส์**ที่มีคำว่า **`IAM Token`** ทิ้งทันที! (เพราะ IAM Token มีอายุแค่ชั่วคราว ไม่เกิน 12 ชั่วโมง)
- ทริคที่ 3: ระวังตัวหลอก! แค่บอกให้เข้ารหัส (Encryption) เฉยๆ ไม่ได้แปลว่าบังคับใส่รหัสผ่านล็อกอิน ดังนั้นช้อยส์ที่มีแค่คำว่า In-transit หรือ At-Rest เปล่าๆ ให้ตัดทิ้ง

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Authenticate the users using Redis AUTH by creating a new Redis Cluster with both the `--transit-encryption-enabled` and `--auth-token` parameters enabled.**
- **คืออะไร:** การใช้ฟีเจอร์ Redis AUTH โดยตั้งต่ารหัสผ่านผ่าน `--auth-token` พร้อมเปิดการเข้ารหัสข้อมูลขณะใช้งาน (`--transit-encryption-enabled`)
- **ทำไมถึงถูก:** Redis AUTH เป็นวิธีการที่บังคับให้ผู้ใช้ใส่รหัสผ่านก่อนใช้งานคำสั่ง Redis ซึ่งรหัสผ่านนี้มีคงอยู่ตลอด (Long-lived) 

❌ **[ผิด] Generate an IAM authentication token using AWS credentials and provide this token as a password.**
- **ทำไมถึงผิด:** Redis ไม่รองรับคำสั่ง MULTI EXEC ร่วมกับ IAM Auth และ IAM Token มีอายุแค่ 12 ชั่วโมงเท่านั้น (เป็น Short-lived ไม่ใช่ Long-lived)

❌ **[ผิด] Set up a Redis replication group and enable the AtRestEncryptionEnabled parameter.**
- **ทำไมถึงผิด:** เข้ารหัสบันทึกฮาร์ดดิสก์ (At-Rest) ไม่ช่วยให้ต้องล็อกอินด้วยรหัสผ่าน

❌ **[ผิด] Enable the in-transit encryption for Redis replication groups.**
- **ทำไมถึงผิด:** เปิดเข้ารหัสเครือข่ายรับ-ส่ง ไม่ได้บังคับหน้าต่างล็อกอินด้วยด้วยพาสเวิร์ด

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon ElastiCache for Redis**: บริการ In-memory data store ตัวท็อปของตาราง AWS มักใช้ทำระบบ Cache เก็บ Session จดจำการล็อกอินของผู้ใช้งาน
- **AWS IAM (Identity and Access Management)**: บริการสิทธิ์การเข้าถึงทรัพยากรต่างๆ 

---
---

## 📌 คำถามที่ 2
**โจทย์:**
A content management system (CMS) is hosted on a fleet of auto-scaled, On-Demand Amazon EC2 instances that use Amazon Aurora as its database. Currently, the system stores the file documents that users upload in one of the attached Amazon EBS volumes. The system's performance has been observed to be slow, and the manager has instructed the team to improve the architecture.

In this scenario, which solution should be implemented to achieve a scalable, highly available, POSIX-compliant shared file system?

**ตัวเลือก:**
- [ ] Create an Amazon S3 bucket and use this as the storage for the CMS.
- [x] Use Amazon EFS to provide a shared file system for concurrent access to data.
- [ ] Upgrade your existing EBS volumes to Provisioned IOPS SSD volumes.
- [ ] Leverage Amazon ElastiCache to cache frequently accessed data and reduce latency.

---
### 🎯 โจทย์ต้องการอะไร?
ระบบ CMS มีปัญหาทำงานช้า เนื่องจากปัจจุบันเก็บไฟล์อัปโหลดไว้บน **Amazon EBS Volume** ก้อนเดียว แล้วมี EC2 หลายตัว (Auto-scaled) แย่งกันเข้าถึง 
โจทย์ต้องการหาระบบไฟล์ (Shared file system) พร้อมคุณสมบัติ: ขยายได้ (Scalable), ทนทาน (Highly available), **ตรงมาตรฐาน Linux (POSIX-compliant)** และ **เข้าใช้งานพร้อมกันได้หลายเครื่อง (Concurrent access)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ถามหา **`shared file system`** (ระบบไฟล์แชร์ส่วนกลาง) ที่สิงอยู่คู่กับเครื่อง **`EC2`** หรือมีคำว่า **`POSIX-compliant`** (มาตรฐานไฟล์ Linux) = ให้กากบาทตอบ **`Amazon EFS`** แบบหลับตาได้เลย 99.99%!
- ทริคที่ 2: เจอคำว่า **`concurrent access`** (หลายๆเครื่องแย่งกันเข้ารุมไฟล์) = **ตัดช้อยส์ `Amazon EBS` ทิ้งด่วน!** เพราะดิสก์ EBS พื้นฐานมันเสียบได้แค่ EC2 เครื่องเดียวต่อลูก 
- ทริคที่ 3: **ตัด `Amazon S3` ทิ้ง** เพราะถึงแม้จะเป็นที่เก็บไฟล์โคตรใหญ่ แต่มันไม่รองรับ POSIX และไม่ใช่โครงสร้าง File System (มันเป็น Object Storage)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon EFS to provide a shared file system for concurrent access to data.**
- **คืออะไร:** Amazon Elastic File System (EFS) ตัวเก็บแชร์ไฟล์ระดับสุดยอด
- **ทำไมถึงถูก:** EFS ถูกออกแบบมาให้เป็น Shared storage ที่ EC2 Instances หลายร้อยเครื่องสามารถเอาจมูกมาเสียบดม (Mount) พร้อมๆ กันได้แบบลื่นไหล และรองรับมาตรฐาน POSIX ตรงกับโครงสร้างแฟ้มของ Linux สุดๆ

❌ **[ผิด] Create an Amazon S3 bucket and use this as the storage for the CMS.**
- **ทำไมถึงผิด:** S3 ไม่รองรับระบบไฟล์มาตรฐาน POSIX แบบตรงไปตรงมา และไม่รองรับการ File locking หน้าโฟลเดอร์

❌ **[ผิด] Upgrade your existing EBS volumes to Provisioned IOPS SSD volumes.**
- **ทำไมถึงผิด:** EBS เป็น Block storage ที่ผูกติดแชร์ให้ EC2 หลายๆเครื่องข้ามโซน AZ แบบปกติไม่ได้ ต่อให้สปีดเร็วขั้นเทพ มันก็เป็น Shared file system หลายตัวพรอมกันไม่ได้อยู่ดี

❌ **[ผิด] Leverage Amazon ElastiCache to cache frequently accessed data and reduce latency.**
- **ทำไมถึงผิด:** ไม่เกี่ยวกับการจัดการเก็บไฟล์ภาพ/วิดีโอที่คนอัปโหลดของ CMS เลย ElastiCache เอาไว้จำพวกข้อความสั้นๆ Text ไม่ใช่ไฟล์โฟลเดอร์

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon EFS (Elastic File System)**: ตู้แชร์ไฟล์ประจำบ้านของ EC2 (รองรับ Linux) ขยายความจุได้เองอนันต์ 
- **Amazon EBS (Elastic Block Store)**: ฮาร์ดดิสก์ต่อตูดคอมพิวเตอร์แบบเดี่ยวๆ (1-to-1) ให้กับ EC2 
- **Amazon S3 (Simple Storage Service)**: กล่องตู้คอนเทนเนอร์เก็บของรูปภาพ/วิดีโอบนคลาวด์รูปแบบ Object Storage (ไม่ใช่ระบบ File system ตามคอมพิวเตอร์ปกติ)

---
---

## 📌 คำถามที่ 3
**โจทย์:**
A company requires all the data stored in the cloud to be encrypted at rest. To easily integrate this with other AWS services, they must have full control over the encryption of the created keys and also the ability to immediately remove the key material from AWS KMS. The solution should also be able to audit the key usage independently of AWS CloudTrail.

Which of the following options will meet this requirement?

**ตัวเลือก:**
- [ ] Use AWS Key Management Service to create AWS managed keys and store the non-extractable key material in AWS CloudHSM.
- [ ] Use AWS Key Management Service to create a KMS key in a custom key store and store the non-extractable key material in Amazon S3.
- [ ] Use AWS Key Management Service to create AWS owned Keys and store the non-extractable key material in AWS CloudHSM.
- [x] Use AWS Key Management Service to create a KMS key in a custom key store and store the non-extractable key material in AWS CloudHSM.

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการเข้ารหัสข้อมูล (Encrypt at rest) ด้วย KMS โดยมีเงื่อนไขของกุญแจเข้ารหัส (Keys):
1. **ต้องควบคุมคีย์แบบเบ็ดเสร็จ (Full control)** และลบทิ้งกุญแจได้ทันทีด้วยตัวเอง!
2. **ต้องตรวจเช็คการบันทึกคีย์ (Audit independently of AWS CloudTrail)** แยกทำ Audit เองที่อื่น ไม่ง้อ CloudTrail

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคำว่า **`full control over encryption keys`** (คุมกุญแจเข้ารหัสเบ็ดเสร็จด้วยตัวเอง) แบบไม่ให้พนักงาน AWS แง้มดูได้ = ให้พุ่งไปตอบ **`AWS CloudHSM`** คู่กับท่า **`custom key store`** เท่านั้น! (เพราะถ้าเป็น AWS Managed หรือ Owned AWS จะแอบจัดการกุญแจให้เรา)
- ทริคที่ 2: เห็นคำว่า **`audit independently of AWS CloudTrail`** (ไม่ใช้วงจรปิด CloudTrail) = ชี้ไปหาพระเอก **`AWS CloudHSM`** ทันที! เพราะอุปกรณ์ตัวนี้มันเก็บประมวลผล Audit แจ้งทุจริตภายในตัวเองได้ (มีฮาร์ดแวร์ Log เป็นของตัวเอง)
- ทริคที่ 3: **ตัด `Amazon S3`** เรื่องสถานที่ซ่อนกุญแจทิ้งไปเลย ไม่มีใครโง่เก็บ Material Key ทิ้งไว้ในแฟ้ม S3 หรอก โดนแฮกเรียบ 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Key Management Service to create a KMS key in a custom key store and store the non-extractable key material in AWS CloudHSM.**
- **คืออะไร:** สร้าง Custom key store ใน KMS แล้วแพ็กตัวกุญแจของจริงไปอยู่ในตู้เซฟแสนแพง AWS CloudHSM (ที่บริษัทคุมเอง)
- **ทำไมถึงถูก:** CloudHSM เป็นอุปกรณ์ฮาร์ดแวร์เก็บกุญแจที่ให้สิทธิควบคุมคีย์แบบ 100% (แอดมิน AWS ก็แตะไม่ได้เลย) และ CloudHSM มีบันทึก log การเข้าใช้อยู่ในตัว สามารถ Audit แยกไม่ง้อ CloudTrail ได้ ตรงตามโจทย์เป๊ะ

❌ **[ผิด] Use AWS Key Management Service to create a KMS key in a custom key store and store the non-extractable key material in Amazon S3.**
- **ทำไมถึงผิด:** S3 คือบริการเก็บไฟล์ธรรมดา ไม่มีความสามารถทางฮาร์ดแวร์เพื่อเข้ารหัสและรักษา Material Key (ขยะเปียกในประเด็นนี้)

❌ **[ผิด] Use AWS Key Management Service to create AWS owned Keys and store the non-extractable key material in AWS CloudHSM.**
- **ทำไมถึงผิด:** ใช้ AWS owned Keys คือมอบหมายป้ายกรรมสิทธิ์กุญแจให้ AWS ถือครอง ซึ่งขัดกับโจทย์ที่ร้องหา "Full control" ของตัวเอง

❌ **[ผิด] Use AWS Key Management Service to create AWS managed keys and store the non-extractable key material in AWS CloudHSM.**
- **ทำไมถึงผิด:** เช่นกัน ใช้ AWS Managed Keys คือแบ่งให้ AWS ช่วยบริการให้ ทำให้เราไม่สามารถคุม Full control แบบดุดันได้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Key Management Service (KMS)**: ตัวจัดการกุญแจแม่กุญแจ (Keys) ใช้ล็อกรหัสปกป้องข้อมูลไม่ให้คนทั่วไปอ่านได้ 
- **AWS CloudHSM (Hardware Security Module)**: คือบริการ "ตู้เซฟปืนฮาร์ดแวร์" ของแท้ จับต้องได้ (บนคลาวด์) เอาไว้เก็บกุญแจเข้ารหัสลับโดยเฉพาะ ลูกค้า(เรา)คุมเบ็ดเสร็จ AWS ไม่มีเอี่ยวในการดูแลกุญแจนี้ รัฐบาลนิยมใช้
- **AWS CloudTrail**: บริการกล้องวงจรปิดของ AWS 

---
---

## 📌 คำถามที่ 4
**โจทย์:**
An online learning company hosts its Microsoft .NET e-Learning application on a Windows Server in its on-premises data center. The application uses an Oracle Database Standard Edition as its backend database.

The company wants a high-performing solution to migrate this workload to the AWS cloud to take advantage of the cloud’s high availability. The migration process should minimize development changes, and the environment should be easier to manage.

Which of the following options should be implemented to meet the company requirements? (Select TWO.)

**ตัวเลือก:**
- [ ] Refactor the application to .NET Core and run it as a serverless container service using Amazon Elastic Kubernetes Service (Amazon EKS) with AWS Fargate.
- [x] Perform a homogeneous migration by moving the Oracle database to Amazon RDS for Oracle in a Multi-AZ deployment using AWS Database Migration Service (AWS DMS).
- [ ] Provision and replatform the application to Amazon Elastic Container Service (Amazon ECS) with Amazon EC2 worker nodes. Use the Windows Server Amazon Machine Image (AMI) and deploy the .NET application using to the ECS cluster via the ECS Anywhere service.
- [x] Rehost the on-premises .NET application to an AWS Elastic Beanstalk Multi-AZ environment which runs in multiple Availability Zones.
- [ ] Use AWS Application Migration Service (AWS MGN) to migrate the on-premises Oracle database server to a new Amazon EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีแอป **.NET บน Windows** + ฐานข้อมูล **Oracle** อยากหนีขึ้น AWS โดยมีคาถา 3 ข้อ:
1. ต้องการทนทาน (High availability)
2. **ขี้เกียจรื้อแก้โค้ดโปรแกรมให้วุ่นวาย (Minimize development changes)**
3. วันหน้าพี่ขอดูแลระบบง่ายๆ (Easier to manage) 
*(เลือก 2 คำตอบ: ย้ายส่วน App 1 อัน / ย้ายส่วน DB 1 อัน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: บริบท "ฝั่งแบ็คอัพ/เขียนโค้ด" ถ้าเจอคำว่า **`minimize development changes`** (ขี้เกียจแก้โค้ด) = **ให้ตัดคำว่า `Refactor` และ `Replatform` ทุกช้อยส์ทิ้งลงถังขยะ!** (เพราะ 2 กระบวนท่านี้คือการต้องไปจ้างคนมาซ่อมทุบบ้านเปลี่ยนเขียนโค้ดใหม่ยับเยิน) และให้มองหาคำว่า **`Rehost`** หรือ **`Elastic Beanstalk`** แทน! (เพราะ Elastic Beanstalk อ้าแขนรับโค้ด .NET โง่ๆ เดิมๆขึ้นสวรรค์ได้เลย)
- ทริคที่ 2: บริบท "ฝั่งฐานข้อมูล" ถ้าเจอคำว่า **`Oracle`** หรือ SQL ต่างๆ แล้วบวกกับคำว่า **`easier to manage`** (อยากจัดการดูแลรักษาง่ายๆบนคลาวด์) = ต้องพุ่งเป้าไปตอบ **`Amazon RDS`** เสมอ! (บริการอัตโนมัติ) และ **ตัดการขน Database ไปปลูกใน `Amazon EC2` ทิ้งทันที!** (ลงบน EC2 คือนรกสร้างเอง ดูแลโครตยาก)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Rehost the on-premises .NET application to an AWS Elastic Beanstalk Multi-AZ environment which runs in multiple Availability Zones.**
- **ทำไมถึงถูก:** (ย้ายส่วนแอป) Elastic Beanstalk เป็นผู้รับเหมาที่ดูแลเรื่อง Server EC2 ให้อัตโนมัติ (ดูแลรักษาง่ายขึ้น) และรองรับโค้ดออฟฟิศเดิม .NET ได้เลย จึงไม่ต้องแกะระบบหรือโมดิฟายโค้ดเละเทะ ตอบโจทย์รี้ดโค้ดน้อยที่สุด

✅ **[ถูกต้อง] Perform a homogeneous migration by moving the Oracle database to Amazon RDS for Oracle in a Multi-AZ deployment using AWS Database Migration Service (AWS DMS).**
- **ทำไมถึงถูก:** (ย้ายส่วนฐานข้อมูล) เปลี่ยนขบวนรถไฟขน Oracle เดิม ไปใส่บน Amazon RDS สำหรับ Oracle แล้วเปิด Multi-AZ ให้ตายยาก Amazon RDS จะรับดูแลภาระงานซ่อมบำรุงล่างๆ ให้หมด (จัดการง่ายมาก) และเจาะสายยางโอนข้อมูลเนียนๆด้วย AWS DMS 

❌ **[ผิด] Refactor the application to .NET Core and run it as a serverless container service using Amazon Elastic Kubernetes Service (Amazon EKS) with AWS Fargate.**
- **ทำไมถึงผิด:** การ "Refactor" คือการรื้อบ้านและเขียนระบบใหม่เยอะมาก ซึ่งขัดกับโจทย์ที่อยากได้ "Minimize development changes" ห้ามแก้เยอะ

❌ **[ผิด] Use AWS Application Migration Service (AWS MGN) to migrate the on-premises Oracle database server to a new Amazon EC2 instance.**
- **ทำไมถึงผิด:** การเอา Database ไปรันหมกไว้บนเครื่อง EC2 คุณต้องเผชิญกับนรกการอัปเดตแพตช์เอง สำรองข้อมูลเอง ภาระหนักล้านแปด ซึ่งไม่ตอบข้อ Easier to manage

❌ **[ผิด] Provision and replatform the application to Amazon Elastic Container Service (Amazon ECS)...**
- **ทำไมถึงผิด:** คำว่า "Replatform" ก็คือหอบโค้ดไปยัดใส่เทคโนโลยีใหม่ (Container) ต้องแก้เยอะ แถมต้องคอยจ้างแอดมินมาเลี้ยงดู EC2 Worker node ด้วย ปวดหัว

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Elastic Beanstalk**: บริการเอาใจนักพัฒนาโค้ด แค่โยนสคริปต์ขึ้นไป (Java, .NET, PHP, Node.js) AWS จะจัดการประกอบร่าง เสียบปลั๊กเครื่อง เปิด Load Balancer ให้เองเบ็ดเสร็จ ลดภาระไอทีร้อยเปอร์เซ็นต์
- **Amazon RDS (Relational Database Service)**: ฐานข้อมูลสูตรสำเร็จของ AWS (MySQL, Postgres, Oracle) ตัวแม่แห่งความกาง่าย AWS จัดการอัปเดต เซฟก๊อปปี้แบคอัพให้แบบคุณชาย ไม่ต้องทนเหนื่อยทำเอง 
- **AWS Database Migration Service (DMS)**: ท่อลอดมิติดูดข้อมูลจากฐานข้อมูลเก่าที่ออฟฟิศ วิ่งตรงเข้า AWS อย่างราบรื่นและปลอดภัยโดยที่ไม่ต้องขัดจังหวะปิดโปรแกรมลูกหน้าร้าน

---
---

## 📌 คำถามที่ 5
**โจทย์:**
A popular social network is hosted in AWS and is using a Amazon DynamoDB table as its database. There is a requirement to implement a 'follow' feature where users can subscribe to certain updates made by a particular user and be notified via email.

Which of the following is the most suitable solution to implement to meet the requirement?

**ตัวเลือก:**
- [x] Enable DynamoDB Stream and create an AWS Lambda trigger, as well as the IAM role which contains all of the permissions that the Lambda function will need at runtime. The data from the stream record will be processed by the Lambda function which will then publish a message to Amazon SNS Topic that will notify the subscribers via email.
- [ ] Set up a DAX cluster to access the source DynamoDB table. Create a new DynamoDB trigger and an AWS Lambda function. For every update made in the user data, the trigger will send data to the Lambda function which will then notify the subscribers via email using Amazon SNS.
- [ ] Using the Amazon Kinesis Client Library (KCL), write an application that leverages on DynamoDB Streams Kinesis Adapter that will fetch data from the DynamoDB Streams endpoint. When there are updates made by a particular user, notify the subscribers via email using Amazon SNS.
- [ ] Create an AWS Lambda function that uses DynamoDB Streams Amazon Kinesis Adapter which will fetch data from the DynamoDB Streams endpoint. Set up an Amazon SNS Topic that will notify the subscribers via email when there is an update made by a particular user.

---
### 🎯 โจทย์ต้องการอะไร?
แอปโซเชียลใช้ฐานข้อมูล **Amazon DynamoDB** ต้องการเพิ่มฟีเจอร์ "กด Follow" หากบัญชีมี **อัปเดตเปลี่ยนแปลงข้อมูล (updates made)** แฟนคลับที่ติดตามจะต้องได้รับ **Email แจ้งเตือน!**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าระบบหลักคือ **`DynamoDB`** และมีคำว่า **`updates`**, **`modified`** หรือ **`changes`** (พฤติกรรมแก้ไขข้อมูลในบรรทัดฐานข้อมูล) = อาวุธเดียวที่ใช้ดักจับได้คือ **`DynamoDB Streams`** เท่านั้น! (ถ้าเจอช้อยส์ที่ใช้คลัสเตอร์ `DAX` มาทำตรงนี้ให้กากบาททิ้งทันที เพราะ DAX เอาไว้แค่เร่งความเร็วการอ่าน ไม่ใช่นักสืบตามรอยโพสต์)
- ทริคที่ 2: ถ้าโจทย์อยากส่ง **`notified via email`** (อีเมล, SMS) หรือ Push Notifications = หุ่นยนต์คอลเซ็นเตอร์ตัวนี้ชื่อ **`Amazon SNS`**
- ทริคที่ 3: ตรงจุดเชื่อมท่าระหว่าง DynamoDB Streams มาหา SNS ต้องมีคนเขียนโค้ดรับลูกวิ่งผลัด ซึ่งเครื่องปั่นอัตโนมัติที่ดีที่สุดคือ **`AWS Lambda`** 
- ทริคที่ 4 (จุดหลอก): ถ้าจะใช้ DynamoDB Streams ได้ **"คุณต้องไป Enable (เปิดสวิตช์) มันก่อนเสมอ"** ช้อยส์ข้อไหนร่ายเวทย์เฉยๆ โดยไม่พูดถึงคำว่า **Enable DynamoDB Stream** = โดนหลอก! (มันกินแห้วแน่ๆเพราะปิดสวิตช์หัวก๊อกไว้อยู่)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable DynamoDB Stream and create an AWS Lambda trigger... processing by Lambda... publish to Amazon SNS Topic that will notify subscribers via email.**
- **ทำไมถึงถูก:** ทำตามสูตร Best Practice! เริ่มแกะตั้งแต่ **เปิดสวิตช์ (Enable) DynamoDB Streams** เพื่อให้มันดักการเปลี่ยนแปลงพฤติกรรม > สะกิดให้ **AWS Lambda** ตื่นขึ้นมาประมวลผลแยกแยะ > ผลักข้อความโยนผูกเข้าวิทยุกระจายเสียง **Amazon SNS** เพื่อชู๊ต Email แจ้งเตือน 

❌ **[ผิด] Set up a DAX cluster to access the source DynamoDB table...**
- **ทำไมถึงผิด:** DAX เป็นระบบร่มหลบแดด "Cache หน่วยความจำ" หน้าที่ของมันคือต้อนรับเพื่อให้ดึงข้อมูลหน้าเว็บอ่านได้ในเสี้ยวมิลลิวินาที ไม่ใช่เรดาร์จับพฤติกรรมการแก้ไขฐานข้อมูล 

❌ **[ผิด] Using the Amazon Kinesis Client Library (KCL), write an application that leverages on DynamoDB Streams...**
- **ทำไมถึงผิด:** ประการแรก "คุณตกม้าตายเพราะลืมอธิบายว่าต้อง Enable (เปิดสวิตช์) DynamoDB Streams ก่อน" ประการที่สอง ท่าเขียนโปรแกรมยัด KCL ถือว่ายาก ยุ่งยากเกินไปเมื่อเทียบกับการปลุก Lambda ที่ทั้งถูกและอัตโนมัติ

❌ **[ผิด] Create an AWS Lambda function that uses DynamoDB Streams Amazon Kinesis Adapter...**
- **ทำไมถึงผิด:** โดนหลอกเหมือนข้อบนครับ มันขาดขั้นตอนสำคัญคือ "ลืมบอกให้ไป Enable เปิดสวิตช์ DynamoDB Streams" 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon DynamoDB**: บริการฐานข้อมูลแบบเสรี (NoSQL) ของ AWS ใช้ตารางรูปแบบหลวมๆ รองรับความเร็วอภิมหาศาล ค้นหาคำตอบเจอกระพริบตาเดียว
- **DynamoDB Streams**: ฟีเจอร์เรดาร์ของ DynamoDB ที่คอยจับตาและบันทึก "ร่องรอยทุกพฤติกรรมการเปลี่ยนแปลงที่เข้ามากระทำในตาราง" (Insert, Modify, Delete) แล้วสะกิดเตือนคิวส่งต่อให้ Service อื่นทำงานอัตโนมัติ
- **AWS Lambda**: หน่วยประมวลผลโค้ด Serverless จ่ายเงินแค่ตอนที่มันตื่นมารันโค้ดเสี้ยววิ (Event-driven)
- **Amazon SNS (Simple Notification Service)**: หอกระจายข่าว! แจ้งเตือนผ่าน Email, SMS, หรือยิงโยนไปหาแอปอื่นๆ พร้อมกันหลายแสนคนได้ในตุ้มเดียว

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 2: ข้อ 6 - 10)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 6
**โจทย์:**
A travel photo-sharing website is using Amazon S3 to serve high-quality photos to visitors. After a few days, it was discovered that other travel websites are linking to and using these photos. This has resulted in financial losses for the business.

What is the MOST effective method to mitigate this issue?

**ตัวเลือก:**
- [ ] Store and privately serve the high-quality photos on Amazon WorkDocs instead.
- [ ] Block the IP addresses of the offending websites using NACL.
- [ ] Use Amazon CloudFront distributions for your photos.
- [x] Configure your S3 bucket to remove public read access and use pre-signed URLs with expiry dates.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บไซต์แชร์รูปภาพท่องเที่ยวแห่งหนึ่งใช้ **Amazon S3** ในการเก็บและแสดงรูปภาพ ปัญหาคือมีเว็บไซต์อื่นมา "ขโมยลิงก์" (Hotlinking) เอาไปแปะบนเว็บหน้าตาเฉย ทำให้บริษัทเสียค่า Data Transfer (ค่าเน็ตไหลออก) จาก AWS เยอะมาก 
โจทย์ต้องการหาวิธีแก้ปัญหาที่มีประสิทธิภาพที่สุด เพื่อไม่ให้เว็บอื่นขโมยลิงก์ไปใช้หน้าด้านๆ ได้อีก

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ปัญหาเว็บคู่แข่งมาขโมยลิงก์รูปไปแปะเว็บตัวเองเรียกว่า "Hotlinking" วิธีแก้ปัญหาหลักการคือ "ห้ามเปิดถังให้อ่านแบะหลา" ถ้าเจอสถานการณ์นี้ต้องมองหาคำว่า **`remove public read access`** ทันที (ปิดหลังบ้านอย่าให้คนทั่วไปหยิบของฟรี)
- ทริคที่ 2: เมื่อปิดประตูบ้านแล้ว ลูกค้าเราจะดูรูปได้ยังไง? คำตอบของ AWS คือต้องใช้ **`pre-signed URLs`** (สร้างลิงก์ชั่วคราวที่มีกุญแจหมดอายุแปะติดไปด้วย) ดังนั้นถ้าเจอเว็บขโมยรูป S3 = กากบาทข้อ Pre-signed URLs โลด!
- ทริคที่ 3: **ตัดช้อยส์ `NACL` ทิ้งไปได้เลย** เพราะเราไปนั่งไล่แบน IP Address เว็บคู่แข่งไม่ไหวหรอก และจริงๆ แล้วคนที่โหลดรูปคือ "บราวเซอร์ของลูกค้าเเว็บคู่แข่ง" ซึ่ง IP เปลี่ยนไปเรื่อยๆ ทั่วโลกบล็อกไม่ได้!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure your S3 bucket to remove public read access and use pre-signed URLs with expiry dates.**
- **คืออะไร:** ปิดไม่ให้ใครก็สามารถเข้าถึงรูปผ่านลิงก์ S3 แบบสาธารณะ แล้วเปลี่ยนไปใช้ Pre-signed URL (ลิงก์ชั่วคราวที่มีกุญแจเข้ารหัสและกำหนดเวลาหมดอายุได้)
- **ทำไมถึงถูก:** เมื่อเราปิดการเข้าถึงแบบ Public เว็บที่ขโมยลิงก์ไปแปะจะโหลดรูปไม่ขึ้น (เพราะกุญแจหมดอายุ) ส่วนลูกค้าในระบบของเราเอง เซิร์ฟเวอร์จะสร้าง Pre-signed URL ที่มีอายุ 5 นาทีให้โหลดรูปได้ ซึ่งเป็นวิธีแก้ปัญหา Hotlinking ของโจรได้ตรงจุดและง่ายที่สุด

❌ **[ผิด] Store and privately serve the high-quality photos on Amazon WorkDocs instead.**
- **ทำไมถึงผิด:** Amazon WorkDocs คือบริการระบบแนวๆ Google Drive สำหรับพนักงานองค์กรแชร์ไฟล์งานเอกสารกัน ไม่ได้ถูกออกแบบมาเพื่อให้บริการโหลดรูปภาพลงหน้าเว็บไซต์ทั่วไป

❌ **[ผิด] Block the IP addresses of the offending websites using NACL.**
- **ทำไมถึงผิด:** อย่างที่บอกไป ไม่ใช่วิธีที่ยั่งยืน เพราะบราวเซอร์ลูกค้าเว็บอื่นเป็นคนดูดรูป ไม่ใช่ตัวเซิร์ฟเวอร์โจรดูด การบล็อก IP คนทั่วโลกจึงทำไม่ได้จริง

❌ **[ผิด] Use Amazon CloudFront distributions for your photos.**
- **ทำไมถึงผิด:** CloudFront (CDN) แค่ทำให้โหลดรูปเร็วขึ้น แต่ถ้าคุณไม่ได้ตั้งค่าจำกัดสิทธิ์ (Restrict Viewer Access) ลิงก์รูปบน CloudFront ของคุณก็จะถูกโจรขโมยไปแปะรัวๆ แถมคุณจะเสียเงินค่า CDN ให้โจรฟรีๆ อีกด้วย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon S3 Pre-signed URL**: เป็นฟีเจอร์แจกลิงก์ V.I.P สำหรับคนที่เราอนุญาตเท่านั้น ลิงก์นี้สามารถเข้าถึงเอกสารส่วนตัวบน S3 ได้ชั่วคราว (เช่น ตั้งให้หมดอายุภายใน 15 นาที) เหมาะมากกับการขายไฟล์ดิจิทัล หรือกันคนขโมยรูปลิ้งก์ตรงๆ
- **Amazon CloudFront**: เป็นบริการ Content Delivery Network (CDN) ของ AWS ที่ช่วยกระจายคอนเทนต์(เช่นรูปและวิดีโอ) ไปไว้ตามหัวเมืองประเทศต่างๆ ทั่วโลก ทำให้เว็บโหลดเร็วขึ้นปรี๊ด
- **Network ACL (NACL)**: เสมือน รปภ. เฝ้าประตูป้อมยามหน้าหมู่บ้าน (Subnet) ใช้ตั้งกฎว่า IP ไหนเข้าได้ / IP ไหนเข้าไม่ได้

---
---

## 📌 คำถามที่ 7
**โจทย์:**
A company is experiencing repeated outages in the Availability Zone where its Amazon RDS database instance is deployed, resulting in a complete loss of access to the database during each incident.

Which solution should be implemented to prevent losing database access if this occurs again?

**ตัวเลือก:**
- [ ] Make a snapshot of the database
- [x] Enabled Multi-AZ failover
- [ ] Increase the database instance size
- [ ] Create a read replica

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทแห่งหนึ่งเจอมรสุมตึกเซิร์ฟเวอร์ดับบ่อยครั้ง ใน Availability Zone ที่ฐานข้อมูล **Amazon RDS** อาศัยอยู่ ทำให้ทุกครั้งที่ตึกนั้นพัง ระบบจะสูญเสียการเชื่อมต่อฐานข้อมูลหายวับไปเลย!
โจทย์ต้องการวิธีแก้เพื่อไม่ให้ระบบขาดช่วงอีก แม้เกิดปัญหาตึก Data Center ถล่ม (Zone ล่ม) อีกครั้ง

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ถ้าเจอคำว่าโซนพัง **`repeated outages in the Availability Zone`** บวกกับ **`Amazon RDS`** หรือเจอคีย์เวิร์ดคำว่าอยากให้ใช้งานได้ต่อแบบ **`High Availability`** = กากบาทคำตอบ **`Multi-AZ`** ลูกเดียว! (เพราะตึกนึงพัง มันจะสลับสายไฟไปตึกหน้าปากซอยให้ทันที)
- ทริคที่ 2: ระวังตัวหลอกอย่างคำว่า **`Read replica`** (ฐานข้อมูลร่างแยก) เพราะร่างแยกมีเอาไว้ **ลดภาระเวลาคนมารุมอ่านเยอะๆ** (Scaling read traffic) มันไม่สามารถสลับสายไฟ (Failover) มาเป็นฐานข้อมูลหลักอัตโนมัติเวลาตึกพังได้! 
- ทริคที่ 3: เห็นคำว่า **`Snapshot`** หรือ **`Backup`** = ตัดทิ้งไปเลย! เพราะการก๊อปปี้ไฟล์เก็บไว้ ไม่ได้แปลว่าระบบจะเปิดทำงานต่อออโต้ตอนตึกพัง (ตึกพังคุณก็เปิดเน็ตไม่ได้อยู่ดี)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enabled Multi-AZ failover**
- **คืออะไร:** การเปิดใช้งานจุดสำรองข้ามโซน (Multi-AZ Failover)
- **ทำไมถึงถูก:** พอเราเปิด Multi-AZ ทันที AWS จะแอบสร้างฐานข้อมูลร่างโคลนนิ่งตัวที่ 2 (Standby) ไปซ่อนไว้ที่อีกโซน (แต่อยู่ในจังหวัดเดียวกัน) คอยซิงค์ข้อมูลตามกันเป๊ะๆ ตลอดเวลา เมื่อโซนตึกหลักไฟดับไฟไหม้ AWS จะสลับชี้ทาง (Failover) ย้ายหัวก๊อกไปหาโซนสำรองให้อัตโนมัติทันที ช่วยให้แอปพลิเคชันฐานข้อมูลยังทำงานต่อไปได้แบบไร้รอยต่อ

❌ **[ผิด] Make a snapshot of the database**
- **ทำไมถึงผิด:** นั่งกดเซฟ Snapshot การทำ Backup เก็บไว้ในตู้ ไม่ได้ช่วยให้ "ใช้งานระบบต่อไปได้แบบไม่ขาดตอน" ถ้าระบบล่มไปแล้ว เราก็แค่มีไฟล์ Backup หมกอยู่ แต่ไม่มีเครื่องเซิร์ฟให้รันงาน

❌ **[ผิด] Increase the database instance size**
- **ทำไมถึงผิด:** อัปเกรดเครื่องคอมให้ใหญ่ขึ้น (Scale-up) ไม่ได้แก้ปัญหาตึกไฟดับ ต่อให้เครื่องใหญ่เป็นช้าง พอไฟดับทั้งตึก เครื่องก็ดับสนิทอยู่ดี

❌ **[ผิด] Create a read replica**
- **ทำไมถึงผิด:** Read replica ทำหน้าที่คัดลอกไฟล์เอาไว้แบ่งเบียดเสียดคนเข้าไปโหลดอ่านแค่นั้น ต่อให้อยู่ข้ามโซนหนีไฟได้ แต่มันเกี่ยงงาน! มันไม่ยอมกระโดดเปลี่ยนตัวเองขึ้นมาเป็นฐานข้อมูลหลักตัวมาสเตอร์ (Promote) แบบอัตโนมัติยามหน้าสิ่วหน้าขวาน ต้องให้คนไปกดสวิตช์เอง

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon RDS Multi-AZ**: ฟีเจอร์พระเอกของ Amazon RDS สำหรับชาวบ้านที่อยากได้ความอึด (High Availability) และกู้ภัยอัตโนมัติ (Automated Failover) ถ้า Primary instance พังปุ๊บ มันจะโยกไปหา Standby instance ในเสี้ยวฟึ้ปเดียว
- **Amazon RDS Read Replica**: ฟีเจอร์ร่างแยกของ RDS ที่ไว้รองรับ "การอ่าน" ล้วนๆ ใช้อัปเกรดความแรงขยับขยายระบบ (Scalability) ลดภาระคอขวดจากเครื่อง Master มักใช้กับแอปพลิเคชันที่มีการไหลของคนเยอะๆ (Read-heavy) 

---
---

## 📌 คำถามที่ 8
**โจทย์:**
A company collects atmospheric data such as temperature, air pressure, and humidity from different countries. Each site location is equipped with various weather instruments and a high-speed Internet connection. The average collected data in each location is around 500 GB and will be analyzed by a weather forecasting application hosted in Northern Virginia. The Solutions Architect must determine the fastest way to aggregate all the data.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [x] Enable Transfer Acceleration in the destination bucket and upload the collected data using Multipart Upload.
- [ ] Set up a Site-to-Site VPN connection.
- [ ] Upload the data to the closest Amazon S3 bucket. Set up a cross-region replication and copy the objects to the destination bucket.
- [ ] Use AWS Snowball Edge to transfer large amounts of data.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทตรวจอากาศทั่วโลก (อยู่ห่างไกลคนละประเทศ คนละทวีป) ส่งข้อมูลไซส์ใหญ่ประมาณ 500 GB ต่อสถานที่ กลับมาวิเคราะห์ที่ศูนย์อเมริกา (N.Virginia) ความโชคดีคือ สถานีต้นทางมี **"อินเทอร์เน็ตความเร็วสูง (High-speed Internet connection)"** รองรับอยู่แล้ว
โจทย์ต้องการ**วิธีที่เร็วที่สุด**ในการรวบรวมไฟล์อุปสรรคข้ามโลกไซส์นี้เข้ามายัง Amazon S3

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์โอนไฟล์อ้วนๆ ข้ามน้ำข้ามทะเล (ต่างทวีป) กลับหลังบ้าน + มีเน็ตโคตรแรงอยู่แล้ว **`high-speed Internet connection`** = ล็อกเป้าคำตอบ **`S3 Transfer Acceleration`** ทันที! (เพราะมันคือเส้นทางด่วนพิเศษของ AWS สำหรับคนมีเน็ตแรงๆ)
- ทริคที่ 2: ถ้าเจอคำว่า **`Snowball`** (รถบรรทุกขนเซิร์ฟเวอร์) ให้ตัดทิ้งหน้าตาเฉย! เพราะถึงจะขนส่งไฟล์ใหญ่ปังขนาดไหน แต่ Snowball ต้องรอคนส่งไปรษณีย์หลายวัน มันขัดกับคอนเซปต์ "เร็วที่สุดกระหยิ่มใจ" และโจทย์บอกบริษัทมีเน็ตแรงอยู่แล้ว
- ทริคที่ 3: ถ้าจะอัปโหลดไฟล์ไฟล์ไซส์ยักษ์ (500GB) เข้า S3 แบบเสถียรสุด AWS บังคับใช้ท่า **`Multipart Upload`** เสมอ (หั่นซอยไฟล์ผีเสื้อเป็นล้านชิ้นแล้วโยนเข้าไปพร้อมๆกัน)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Transfer Acceleration in the destination bucket and upload the collected data using Multipart Upload.**
- **ทำไมถึงถูก:** เวนกำความลงตัว! **Transfer Acceleration** แบกข้อมูลวิ่งซิ่งนรกบนสายด่วน Edge location ของ AWS จากประเทศต้นทาง (ไม่ต้องมุดเน็ตบ้านกากๆ ทั่วไป) วิ่งตรงกลับอเมริกา ผสมสูตรกับ **Multipart Upload** ที่หั่นพาร์ทไฟล์โหลดพร้อมกัน คนมีเน็ตความเร็วสูงใช้วิธีนี้คือทะยานทะลุเพดานความเร็วแสง ถึงปลายทางไวสุด!

❌ **[ผิด] Set up a Site-to-Site VPN connection.**
- **ทำไมถึงผิด:** การต่อท่อ VPN Site-to-Site คือเรื่องของการบีบเข้ารหัสเพื่อความปลอดภัยระดับองค์กร (Security) ไม่ใช่เรื่องเพิ่มความเร็วสปีดเน็ต แถมการเข้ารหัสข้อมูลที่หัวท่อท้ายท่อ อาจกิน Overhead ทำให้เน็ตวิ่งอืดลงด้วยซ้ำ 

❌ **[ผิด] Upload the data to the closest Amazon S3 bucket. Set up a cross-region replication and copy the objects to the destination bucket.**
- **ทำไมถึงผิด:** อัปโหลดขึ้น S3 ถังไหนก็ได้ที่อยู่ใกล้ๆ แล้วจ้าง AWS ซิงค์ข้อมูลข้ามทวีป (Cross-Region Replication: CRR) ท่านี้ปกติใช้เวลาหน่วงในการ Replication ข้ามฟากประมาณ 15 นาทีเป็นอย่างน้อย แถมกินค่าใช้จ่ายซ้ำซ้อน 2 ถัง ไม่คู่ควรกับคำว่าเร็วที่สุด

❌ **[ผิด] Use AWS Snowball Edge to transfer large amounts of data.**
- **ทำไมถึงผิด:** AWS Snowball คือการสั่งให้ AWS ส่งตู้เซิร์ฟเวอร์ใส่กล่องเหล็กขับส่งพัสดุมาที่บ้าน ท่านี้ใช้ขนกระสุนข้อมูลขนาดมหึมาระดับตึก (อย่างน้อยๆ 10-80 Terabytes) แต่ข้อนี้ข้อมูลแค่ 500GB แถมดันมีเน็ตแรงอยู่แล้ว การรอพัสดุเป็นสัปดาห์จึงเป็นวิธีที่โคตรเต่าล้านปีที่สุด

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon S3 Transfer Acceleration (S3TA)**: เร่งเหยียบมิดสปีดอัปโหลดไฟล์ทางไกล โดย S3TA จะอาศัยป้อมปราการ Edge Locations รอมรับไฟล์จากคอมเรา (จุดที่ใกล้ที่สุดทั่วโลก) แล้วบีบอัดส่งผีพุ่งไต้ผ่านระบบเน็ตหลักสุดแรงของ AWS ทันที
- **AWS Snowball**: หีบเหล็กใส่เซิร์ฟเวอร์ขนย้ายข้อมูลขนาดใหญ่ (Petabyte-scale) เหมาะมากสำหรับบริษัทโรงงานป่ารกร้างที่ดันเจอรหัสนรก "เน็ตบ้านกาก หรือ ไม่มีอินเทอร์เน็ตเลย"
- **S3 Multipart Upload**: กฎเหล็กของ S3! แนะนำให้ใช้วิธีนี้เมื่ออัปโหลดไฟล์ที่อ้วนเกิน 100 MB ขึ้นไป เพราะมันช่วยซอยชิ้นส่วนส่งพร้อมกัน หากชิ้นไหนส่งพลาด ก็โหลดซ่อมแค่ชิ้นนั้น ไม่ต้องเริ่มโหลดใหม่ทั้งหมดใหม่ 

---
---

## 📌 คำถามที่ 9
**โจทย์:**
A company plans to launch an Amazon EC2 instance in a private subnet for its internal corporate web portal. For security purposes, the EC2 instance must send data to Amazon DynamoDB and Amazon S3 via private endpoints that don't pass through the public Internet.

Which of the following can meet the above requirements?

**ตัวเลือก:**
- [x] Use a DynamoDB VPC endpoint and an S3 VPC endpoint to route all access to these services via private endpoints.
- [ ] Use AWS VPN CloudHub to route all access to S3 and DynamoDB via private endpoints.
- [ ] Enable DynamoDB Encryption at Rest with the default AWS-managed key and S3 Server-Side Encryption with the default AWS KMS key to route all traffic to DynamoDB and S3 via private endpoints.
- [ ] Use AWS Direct Connect to route all access to S3 and DynamoDB via private endpoints.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีเซิร์ฟเวอร์เพจออฟฟิศ (EC2) นอนหลบอยู่ใน **ระบบปิด (Private subnet - กีดกันไม่มีช่องอินเทอร์เน็ตออกสู่โลกภายนอก)** ปรากฎว่าระบบนี้ดันพึ่งพาการส่งข้อมูลไปยัง **Amazon DynamoDB** และ **Amazon S3** (ซึ่งปกติ 2 บริการนี้เราต้องวิ่งผ่าอินเทอร์เน็ตถึงจะหาหน้าบ้านมันถูก)
โจทย์ต้องการมุดดินลับๆ พา EC2 เครื่องนี้แอบคุยกับ S3 และ DynamoDB **โดยต้องไม่เสี่ยงผละออกไปเจออินเทอร์เน็ตสาธารณะเลยเด็ดขาด (Private endpoints)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์มี "EC2 อยู่ในฝั่ง Private" แล้วอยากคุยกับ Service อื่นของ AWS (เช่น S3/DynamoDB) แบบ **`don't pass through the public Internet`** (วิ่งทางลับไม่ผ่านเน็ต) = 99.99% ต้องพุ่งเป้าทิ่มไปที่คำว่า **`VPC Endpoint`** (ทำช่องท่อลอดมิติใน VPC บ้านเราเอง) 
- ทริคที่ 2: ถ้าบริบทโจทย์อยู่ใน AWS 100% (คุยกันเองข้างในคลาวด์) = ตัดช้อยส์ที่มีคำว่า **`VPN`** หรือ **`Direct Connect`** ทิ้งทันที! เพราะไอ้ 2 เครื่องหมายการค้านี้ มันมักเอาไว้สำหรับ "ข้ามเผ่าพันธุ์" ดึงเน็ตจากเครื่องออฟฟิศ(On-premise) วิ่งเข้าหา AWS ต่างหาก! ไม่เกี่ยวกับการย้ายปูนข้างใน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use a DynamoDB VPC endpoint and an S3 VPC endpoint to route all access to these services via private endpoints.**
- **ทำไมถึงถูก:** ตรงตามตำรา! **VPC Endpoint** (Gateway type) คือประตูลับท่อลอดวิเศษที่ปักหมุดอยู่หลังบ้านเรา เมื่อ EC2 ส่งข้อมูลหา S3 ทราฟฟิกนั้นจะถูกเบี่ยงทิศทะลุท่อเข้าไปในโครงข่ายหลังบ้านของขุนพล AWS โดยตรง ไม่แหกปากโผล่หัวไปเจอโลกมืดอินเทอร์เน็ตข้างนอก ปลอดภัย 100%

❌ **[ผิด] Use AWS VPN CloudHub to route all access to S3 and DynamoDB via private endpoints.**
- **ทำไมถึงผิด:** ผิดเวทีแรง AWS VPN CloudHub คือศูนย์กระจาย Hub รวมร่างสัญญาณให้สำนักงานสาขา A คุยกับสาขาฝั่ง B ทั่วโลกได้ ไม่ได้ถูกสร้างมาเพื่อพา EC2 วิ่งลอดไปหา DynamoDB ซะหน่อย

❌ **[ผิด] Enable DynamoDB Encryption at Rest with the default AWS-managed key...**
- **ทำไมถึงผิด:** ไร้สาระสุดๆ อันนี้ไปเปิดการเข้ารหัสข้อมูลที่เก็บพักไว้ (Encryption At Rest) คือเรื่องทำฮาร์ดดิสก์ให้คนขโมยพาสเวิร์ดอ่านไม่ออก ไม่เกี่ยวขี้ประติ๋วอะไรกับการเลือก "เส้นทางเดินสายเน็ต (Route/Endpoint)" เลยแม้แต่น้อย

❌ **[ผิด] Use AWS Direct Connect to route all access to S3 and DynamoDB via private endpoints.**
- **ทำไมถึงผิด:** AWS Direct Connect เอาไว้จ้างการไฟฟ้าให้เดินสายไฟเบอร์ออปติกส่วนตัว "จากบริษัทนอกคลาวด์ (On-premise) ลากตรงเข้าตึกฝั่ง AWS" แต่เคสนี้บอกคอมอยู่ที่ฝั่ง AWS จ๋าๆ อยู่แล้ว (EC2) การไปซื้อสายใยแก้วทำDirect Connect ลากลงมาจึงไร้เหตุผล

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **VPC Endpoint**: ทางด่วนวีไอพีให้เครื่องในมุมมืด (Private Subnet) ทะลวงไปหา Service สาธารณะของ AWS (เช่น S3, DynamoDB) ดื้อๆ โดยไม่ต้องห้อย Public IP และไม่ต้องพึ่งอุปกรณ์แปลงสัญญาณใดๆ เพราะวิ่งอยู่บทโครงข่าย AWS อย่างเดียว
- **AWS Direct Connect**: บริการลากสายเน็ตไฟเบอร์เคเบิลส่วนบุคคล ไม่แชร์บอร์ดแบนด์อินเทอร์เน็ตกับชาวโลกร่วมกับใคร โยงจากเซิร์ฟตึกออฟฟิศเข้าสู่โกดังตึกโฮสของ AWS โดยตรง (เร็วขั้นต่ำ 1-100 Gbps เสถียรสุดๆ)

---
---

## 📌 คำถามที่ 10
**โจทย์:**
A company is using a combination of API Gateway and AWS Lambda for the web services of an online web portal that is accessed by hundreds of thousands of clients each day. The company will be announcing a new revolutionary product, and it is expected that the web portal will receive a massive number of visitors from all around the globe.

How can the back-end systems and applications be protected from traffic spikes?

**ตัวเลือก:**
- [ ] Manually upgrade the Amazon EC2 instances being used by API Gateway.
- [ ] API Gateway will automatically scale and handle massive traffic spikes so you do not have to do anything.
- [x] Use throttling limits in API Gateway.
- [ ] Deploy Multi-AZ in API Gateway with Read Replica.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังขายแอปเว็บพอทัลที่รันด้วยกระบวนท่าไร้เครื่องเซิร์ฟ **API Gateway รับแขกหน้าบ้าน + AWS Lambda หลังบ้าน** ปกติเจอผู้ใช้งานหลักแสนต่อวันก็สบายอยู่ 
แต่วันนี้บริษัทจะวางขายแรร์ไอเท็ม สินค้าปฏิวัติวงการ คาดว่ามีนักรบ "อภิมหาศาลจองคิวคลิกถล่มทลายจากทั่วโลก" (Massive visitors/Traffic Spikes)
โจทย์ต้องการวิธีการจัดตู้ยาม เพื่อ**ปกป้อง**ระบบโค้ดเซิร์ฟเวอร์หลังบ้าน (Back-end) ไม่ให้หัวแบะล่มสลายจากคลื่นซอมบี้คลิก

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์กลัวบิลพุ่งทะลุเพดานโลกหรือกลัวหลังบ้านตายเกลื่อนจากยอดเข้าชมมหาศาล **`massive number of visitors / spike`** และโจทย์ถามหาวิธี **`protected from`** ปกป้องตูดระบบ = กาข้อที่ใช้ท่า **`Throttling limits`** ไว้อันดับ 1!! (มันคือพนักงานกันชนบีบคอจำนวนคลิก ที่หน้าด่าน API Gateway)
- ทริคที่ 2: ระวังตัวเลือกคนซื่อบื้อ **`automatically scale so you do not have to do anything`** (มันขยายเองได้ นั่งหลินเฉยๆสิ) = ผิดมหันต์! เพราะระบบ AWS ถึงมันจะขยายหุ่นยนต์โคลนเก่ง แต่ถ้าไม่มีจุดพักการเบรกหลังบ้านคุณ (เช่น แถวคิวรอทรานแซกชั่นฐานข้อมูลล้น) มันพังคามือคุณได้เลย
- ทริคที่ 3: **ตัดช้อยส์ `EC2` ทิ้งไป** เพราะถ้าโจทย์ขึ้นต้นใช้ "API Gateway + Lambda" มันคืออาณาจักร "Serverless (ไร้เซิร์ฟดั้งเดิม)" ล้วนๆ เราไปกดอัปเกรดเครื่อง EC2 ใต้ดินแบบ Manual ไม่ได้นะจ๊ะ (เพราะ AWS หมกมันไว้ดูเอง)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use throttling limits in API Gateway.**
- **ทำไมถึงถูก:** ตรงโจทย์สุดๆ การตั้งค่าบีบจำกัดจำนวนที่เรียกได้ต่อวินาที (Throttling) ทึ่ด่านหน้า API Gateway เสมือนมี รปภ. ถือโทรโข่ง คอยคุมฝูงชนหน้าห้าง "เห้ย! เข้าได้แค่วิละ 1,000 คนพอ!" ส่วนเกินจะถูกยันหน้ากระแทกออกมาด้วย Error Code 429 "Too Many Requests" ทำให้หลังบ้านอย่าง Lambda ทำงานเท่าที่กำลังวังชารับไหว ไม่โดนตะลุมบอนตาย รอดสบายๆ

❌ **[ผิด] API Gateway will automatically scale and handle massive traffic spikes so you do not have to do anything.**
- **ทำไมถึงผิด:** ใช่ API Gateway รับโหลดสเกลดีมากๆ 10,000 วิมันก็ยันอยู่ แต่มันเป็นเพียง "ท่อส่งยักษ์" ถ้าคุณไม่ตั้งรปภ. (Throttling limits) ฝูงซอมบี้เหล่านั้นจะแห่ทะลักผ่านท่อไปเหยียบหัว Lambda และทำให้ Database ของคุณพังตู้มขี้แตกรับเคราะห์อยู่ดี 

❌ **[ผิด] Manually upgrade the Amazon EC2 instances being used by API Gateway.**
- **ทำไมถึงผิด:** ระบบนี้ใช้ Service เทพแบบ Serverless (API Gateway & Lambda) เราผู้เป็นนายจะไม่มีสิทธิ์ไปโผล่เห็นเซิร์ฟเจาะหลังเข้าไปคอนฟิกหรือจับสวิตช์เครื่อง EC2 ฆ่าหมกใต้พื้นบริการนี้ได้เลย

❌ **[ผิด] Deploy Multi-AZ in API Gateway with Read Replica.**
- **ทำไมถึงผิด:** เอาของไปปาสลัดผิดหม้อ! คำว่า "Read Replica" ศาสตร์ด้านนี้เขามีไว้ใช้แบ่งขยาย "ร่างยักษ์ให้ระบบฐานข้อมูล Database (เช่น Amazon RDS)" ให้อ่านไวขึ้น. บนโลกของ API Gateway ไม่มีปุ่มกดทำ Read Replica เลยชาตินี้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon API Gateway**: นายประตูทวารบาล บริการสร้าง ดูแล และเปิดประตูกำแพงจุดปล่อย API สำหรับติดต่อแอปพลิเคชันอย่างเป็นทางการ. มันดักจับทราฟฟิก กรองสแตท เข้าถึงระบบต่างๆ และสามารถตั้งคุมกติกาแบบ "ห้ามคลิกรัวเกิน 100 ที/วินะเว้ย!" (API Throttling/Quotas) ไว้เก็บตังค์ชาวบ้านได้ 
- **API Throttling**: การบีบท่อจำกัดปริมาณทราฟฟิกไหลเข้า ป้องกันโดนบอทยิงถล่ม (DDoS ย่อมๆ) หรือเอาไว้คุมโควต้า API สำหรับลูกค้าชั้นทาสและลูกค้าพรีเมียมได้ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 3: ข้อ 11 - 15)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 11
**โจทย์:**
A company is using AWS Fargate to run a batch job whenever an object is uploaded to an Amazon S3 bucket. The minimum ECS task count is initially set to 1 to save on costs and should only be increased based on new objects uploaded to the S3 bucket.

Which is the most suitable option to implement with the LEAST amount of effort?

**ตัวเลือก:**
- [ ] Set up an alarm in CloudWatch to monitor S3 object-level operations recorded on CloudTrail. Set two alarm actions to update the ECS task count to scale-out/scale-in depending on the S3 event.
- [ ] Set up an alarm in Amazon CloudWatch to monitor S3 object-level operations that are recorded on CloudTrail. Create an Amazon EventBridge (Amazon CloudWatch Events) rule that triggers the ECS cluster when new CloudTrail events are detected.
- [x] Set up an Amazon EventBridge (Amazon CloudWatch Events) rule to detect S3 object PUT operations and set the target to the ECS cluster to run a new ECS task.
- [ ] Set up an Amazon EventBridge (Amazon CloudWatch Events) rule to detect S3 object PUT operations and set the target to a Lambda function that will run the StartTask API command.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทตั้งค่าให้ **AWS Fargate (คอนเทนเนอร์แบบไร้เซิร์ฟเวอร์)** ตื่นขึ้นมาทำงาน (Batch job) ก็ต่อเมื่อมีไฟล์ใหม่ถูกอัปโหลดขว้างลงถัง Amazon S3 เท่านั้น
โจทย์ต้องการหาวิธีการที่เชื่อมระบบ 2 ตัวนี้เข้าด้วยกัน โดยลงแรงเหนื่อยน้อยที่สุด (LEAST amount of effort)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: การมีเหตุการณ์หนึ่งเกิดขึ้น (S3 Upload) แล้วอยากให้อีกที่นึงทำงานต่อทันทีแบบง่ายที่สุด = พระเอกของงานนี้คือ **`Amazon EventBridge`** (ชื่อเก่าคือ CloudWatch Events) ให้มองหาช้อยส์นี้ไว้ก่อนเลย
- ทริคที่ 2: ถ้าโจทย์สั่งว่า **`LEAST amount of effort`** (เหนื่อยน้อยสุด/ขี้เกียจเขียนโค้ด) = **ให้ตัดช้อยส์ที่ใช้ `Lambda function` คั่นกลางทิ้งไป!** เพราะ EventBridge หน้าที่มันเกิดมาเพื่อยิงสายตรงสั่งเข้าเป้าหมาย (ECS / Fargate) ได้ด้วยตัวมันเองอยู่แล้ว การไปเปิด Lambda ร่ายโค้ดกั้นกลางจึงถือเป็นเรื่องลงแรงเหนื่อยเปล่า
- ทริคที่ 3: **ตัด `CloudTrail` และ `CloudWatch Alarm` ทิ้ง** เพราะมันเป็นระบบสืบสวนและนาฬิกาปลุกฉุกเฉิน มันไม่เก่งเรื่องการสั่งรันโปรแกรมตามหลังเหตุการณ์จุกจิกแบบไฟล์หล่นลงถัง S3

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up an Amazon EventBridge (Amazon CloudWatch Events) rule to detect S3 object PUT operations and set the target to the ECS cluster to run a new ECS task.**
- **ทำไมถึงถูก:** ด้วยความง่ายของ EventBridge เราสามารถเลือกจับจ้องเหตุการณ์ (Object PUT - หรือการสร้างไฟล์ใหม่) ของบริการ Amazon S3 ได้เลย และสามารถเลือกตั้ง "Target (เป้าหมาย)" ยิงกระสุนสั่งไปที่ Amazon ECS โดยตรง ให้มันรัน Task ทำงานทันที ง่าย กระชับจบในบริการเดียว ตรงจุด "ลงทุนเหนื่อยน้อยสุด"

❌ **[ผิด] Set up an Amazon EventBridge (Amazon CloudWatch Events) rule to detect S3 object PUT operations and set the target to a Lambda function that will run the StartTask API command.**
- **ทำไมถึงผิด:** อ้อมโลกแบบใช้แรงเยอะโดยใช่เหตุ การที่เราต้องไปเปิดเซสชั่นเขียนโค้ดผูกมัด Lambda ขึ้นมาใหม่เพื่อไปเรียก API ให้ ECS สตาร์ท... เป็นพฤติกรรมที่เหนื่อย สู้สั่ง EventBridge ยิงชนยิงเป้าหมาย ECS โดยตรงเลยดีกว่า 

❌ **[ผิด] Set up an alarm in Amazon CloudWatch to monitor S3 object-level operations that are recorded on CloudTrail. Create an Amazon EventBridge (Amazon CloudWatch Events) rule that triggers the ECS cluster when new CloudTrail events are detected.**
- **ทำไมถึงผิด:** ซับซ้อนซ่อนเงื่อนมากเกินความจำเป็น การเอาตำรวจ CloudTrail มาไล่สืบจับว่าเมื่อกี้พึ่งมีไฟล์ตกขังอัปโหลดใช่มั้ย? แล้วค่อยรายงาน EventBridge มันทำให้กว่าจะได้รันจริงๆต้องประมวลผลนาน แถมตั้งค่าเยอะมาก จึงไม่ตอบโจทย์ Least amount of effort

❌ **[ผิด] Set up an alarm in CloudWatch to monitor S3 object-level operations recorded on CloudTrail. Set two alarm actions to update the ECS task count to scale-out/scale-in depending on the S3 event.**
- **ทำไมถึงผิด:** CloudWatch Alarm ไม่มีความสามารถ "สั่งเกิด Action เรียก ECS Task โดยตรง" มันจับเอาไปเชื่อมกับตู้สเกล (Auto Scaling) อย่างเดียว ไม่สามารถอ้างอิงให้ StartTask งานต่อตะเข็บได้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Fargate**: บริการกล่องรันคอนเทนเนอร์ (Container) สไตล์ Serverless ที่อยู่ใต้เครือข่าย Amazon ECS เราไม่ต้องตั้งเซิร์ฟเวอร์ ไม่ต้องจัดการระบบปฏิบัติการ แค่โยนสคริปต์กล่องให้มันรัน มันก็จะตื่นมารันแล้วคิดเงินรายวินาที
- **Amazon EventBridge**: ศูนย์กลางเส้นประสาทกระดูกสันหลังของ AWS (ชื่อเดิม: CloudWatch Events) ทำหน้าที่จับตาดู "เหตุการณ์ (Events)" ทั่วราชอาณาจักรคลาวด์ เช่น "มีตึก EC2 ล่ม", "มีคนแอบลบไฟล์", "มีไฟล์เข้ามาใหม่" พอจับสัญญาณได้ มันก็จะทำหน้าที่โยนคำสั่งไปกระตุ้น Service อื่นๆ ให้ทำแอคชั่นรับลูกต่อไปทันที

---
---

## 📌 คำถามที่ 12
**โจทย์:**
A company is using Amazon S3 to store frequently accessed data. When an object is created or deleted, the S3 bucket will send an event notification to the Amazon SQS queue. A solutions architect needs to create a solution that will notify the development and operations team about the created or deleted objects.

Which of the following would satisfy this requirement?

**ตัวเลือก:**
- [ ] Set up another SQS queue for the other team. Grant S3 permission to send a notification to the second SQS queue.
- [ ] Set up an Amazon SNS topic and configure two SQS queues to poll the SNS topic. Grant S3 permission to send notifications to SNS and update the bucket to use the new SNS topic.
- [x] Create an Amazon SNS topic and configure two SQS queues to subscribe to the topic. Grant S3 permission to send notifications to SNS and update the bucket to use the new SNS topic.
- [ ] Create a new Amazon SNS FIFO topic for the other team. Grant S3 permission to send the notification to the second SNS topic.

---
### 🎯 โจทย์ต้องการอะไร?
เดิมที **Amazon S3** เวลามีไฟล์ถูกสร้างหรือลบทิ้ง มันจะส่งข้อความแจ้งเตือนป้อนเข้าสู่ระบบคิวรับของ **Amazon SQS** (มีแค่คิวเดียว) 
แต่ตอนนี้ความต้องการเปลี่ยนไป! ฝ่ายบริหารอยากให้ "ทีมพัฒนาโปรแกรม (Dev)" และ "ทีมคุมเซิร์ฟเวอร์ (Ops)" ได้รับข้อความเตือนไฟล์เข้า-ออก พร้อมๆ กัน (คือส่งครั้งเดียว ต้องกระจายเข้า 2 คิว)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ท่องไว้เลยว่า S3 บังคับกฎเหล็ก **"เหตุการณ์เดียวกัน ห้ามส่งออกไปหาวิทยุปลายทาง 2 เครื่องพร้อมกันตรงๆ"** (S3 -> 2 SQS คิว = ทำไม่ได้พังพินาศ!)
- ทริคที่ 2: ถ้าอยากให้ข้อความเดียว กระจายก๊อปปี้ส่งไปหาหลายๆ คิวหรือหลายๆ อีเมลพร้อมกัน รหัสท่าไม้ตายนี้เรียกว่ารหัสกระหน่ำยิง **`Fanout pattern`** ซึ่งพระเอกแห่งการกระจายข้อความคือ **`Amazon SNS`** ให้เลือกช้อยส์ที่ใช้ SNS เป็นหัวจ่ายกระจายให้ SQS
- ทริคที่ 3: กติกาการคบกันระหว่าง SNS และ SQS คือ **SQS ทำหน้าที่เป็นสมาชิกกดยอมรับการแจ้งเตือน (`Subscribe`)** ไม่ใช่วิ่งไปง้อดึงขอข้อมูลเอาเอง (`Poll`)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon SNS topic and configure two SQS queues to subscribe to the topic. Grant S3 permission to send notifications to SNS and update the bucket to use the new SNS topic.**
- **ทำไมถึงถูก:** 这是สูตรสำเร็จ Fanout pattern! สร้างเสากระจายเสียง (Amazon SNS Topic) อันเดียวให้ S3 หยอดข้อความใส่ > จากนั้นให้ SQS ทั้งสองฝั่ง (ทีม Dev และ Ops) ไปกดหน้าเว็บสมัครเป็นเพื่อนสมาชิกติดตาม (Subscribe) ของเสา SNS ต้นนี้เสีย > เมื่อ S3 ส่งของหล่นตุ้บ SNS จะตะโกนกระจายข้อความเหมือนกันเด้ะๆ โยนเข้า 2 คิวให้รวดเดียวจบ!

❌ **[ผิด] Set up another SQS queue for the other team. Grant S3 permission to send a notification to the second SQS queue.**
- **ทำไมถึงผิด:** ฝืนธรรมชาติ AWS อย่างรุนแรง! เพราะ "Amazon S3 ห้ามตั้งค่าส่ง Event แจ้งเตือนของเหตุการณ์ไฟล์ทับซ้อนกันออกหลายทาง" คุณไม่สามารถกดบวก SQS 2 อันในหน้าตั้งค่า S3 ในบรรทัดเดียวันได้เลย

❌ **[ผิด] Create a new Amazon SNS FIFO topic for the other team. Grant S3 permission to send the notification to the second SNS topic.**
- **ทำไมถึงผิด:** ผิดสองเด้ง อย่างแรกคุณจะสร้าง SNS สองเสาแยกกันไม่ได้ (S3 กีดกันการส่งซ้ำจุดเดิม) และอย่างที่สองบริการคิวแบบลำดับความไว FIFO (First-In, First-Out) โคตรไม่จำเป็น เพราะโจทย์ไม่ได้บอกว่าเขาเคร่งทฤษฎีข้อมูลมาก่อนคิวแรก

❌ **[ผิด] Set up an Amazon SNS topic and configure two SQS queues to poll the SNS topic...**
- **ทำไมถึงผิด:** พจนานุกรมศัพท์ผิดเพี้ยน! SQS ไม่สามารถไปยืนรอหน้าร้าน SNS เพื่อขอ **`poll`** (ตะโกนง้อดึงข้อความ) โลกของ SNS เป็นระบบผลักของออกไปสู่มือผู้ติดตาม (Push / Subscribed) ถือว่าใช้ศัพท์หลอกผิดมหันต์

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon SQS (Simple Queue Service)**: บริการจุดยืนเข้าคิวยอมรับกรรมสำหรับเซิร์ฟเวอร์ ถ้าข้อมูลหลั่งไหลมาเยอะเป็นพายุตู้มเดียว เซิร์ฟอาจพังได้ เลยต้องมี SQS เป็นตะกร้ารองข้อมูลไว้ให้ก่อน เรียงเป็นคิว 1-2-3 เพื่อให้ลูกน้องเซิร์ฟเวอร์เดินมาหยิบของไปทำทีละชิ้น ระบบจะได้ไหม่ล่ม
- **Amazon SNS (Simple Notification Service)**: เสากระจายเสียงวิทยุหมู่บ้านของ AWS รับข้อความมา 1 ก้อน สามารถกระจายยิงส่งต่อ SMS, ส่ง Email, ปาลงตะกร้า SQS ของคน 1 แสนคนพร้อมกันได้ในเสี้ยววินาทีเดียว
- **Fanout Pattern**: เป็นชื่อกระบวนท่าของคลาวด์อินฟราฯ คือการเอา SNS ตั้งไว้ตรงกลางรับลูก 1 เม็ด แล้วปาสายรุ้งกระจายต่อให้ SQS ตะกร้าหลายๆใบพร้อมกัน เพื่อให้เซิร์ฟเวอร์หลายๆ ตัว (พนักงานคนละแผนก) เอาของเม็ดนี้ไปทำงานกันคนละหน้าที่ได้ 

---
---

## 📌 คำถามที่ 13
**โจทย์:**
A Solutions Architect needs to make sure that the On-Demand Amazon EC2 instance can only be accessed from this IP address (`110.238.98.71`) via an SSH connection.

Which configuration below will satisfy this requirement?

**ตัวเลือก:**
- [ ] Security Group Outbound Rule: Protocol – UDP, Port Range – 22, Destination 0.0.0.0/0
- [x] Security Group Inbound Rule: Protocol – TCP. Port Range – 22, Source 110.238.98.71/32
- [ ] Security Group Inbound Rule: Protocol – UDP, Port Range – 22, Source 110.238.98.71/32
- [ ] Security Group Outbound Rule: Protocol – TCP, Port Range – 22, Destination 110.238.98.71/32

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการตั้งค่า รปภ. บ้านเพื่อให้เครื่อง **Amazon EC2** ยอมอนุญาตให้คอมพิวเตอร์เจ้านายที่มีรหัส IP แค่เบอร์ `110.238.98.71` สามารถรีโมตพิมพ์โค้ดเจาะเข้ามาหน้าจอดำ **(SSH connection)** ได้เครื่องเดียวเท่านั้น

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคำว่ารีโมต **`SSH connection`** โลกของแฮกเกอร์คอมพิวเตอร์กำหนดตายตัวเลยว่า มันใช้ภาษาในการคุยแบบ **`Protocol: TCP`** (เพราะห้ามตัวหนังสือที่พิมพ์ไปหล่นหายเด็ดขาด) โดยใช้ประตูพอร์ตที่ **`Port Range: 22`** เสมอ!! (เห็นโปรโตคอล UDP ตัดทิ้งเลย)
- ทริคที่ 2: ถ้าเป็นการอนุญาตตั้งด่านให้ "แขกจากภายนอกทะลวงเข้ามาข้างในเครื่องเซิร์ฟเวอร์เรา" เรียกว่ากฎ **`Inbound Rule`** (แต่ถ้าเครื่องเราจะวิ่งไปโหลดเว็บข้างนอก เรียกว่ากฎ Outbound) เคสนี้ลูกค้าจะมารีโมตเข้าเครื่องเรา ก็ต้อง Inbound แน่นอน 
- ทริคที่ 3: การล็อกตายตัวให้เข้าได้แค่ IP เดียวเจาะจงเป๊ะๆ สัญลักษณ์รหัสลงท้ายย่าน CIDR จะเป็น **`/32`** เสมอ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Security Group Inbound Rule: Protocol – TCP. Port Range – 22, Source 110.238.98.71/32**
- **ทำไมถึงถูก:** ถูกต้องทั้ง 3 แกน 1.เป็นกำแพงดักคนนอกมาขอเข้า (Inbound) / 2.รหัสการสนทนาโปรโตคอลประตูรีโมต SSH แบบมาตรฐานคือ (TCP, Port 22) / 3.เจาะจงล็อกให้แค่ตาคนนี้แหกเข้ามาได้คนเดียวสายตรง (Source IP / 32) 

❌ **[ผิด] Security Group Inbound Rule: Protocol – UDP, Port Range – 22, Source 110.238.98.71/32**
- **ทำไมถึงผิด:** โปรโตคอลการคุยแบบ "UDP" นั้นส่วนมากเป็นศาสตร์ของการส่งสตรีมมิ่งดูยูทูปหรือแข่งเกมออนไลน์ ที่ไม่สนความครบถ้วนของข้อมูล (ดูคลิปภาพกระตุกแต่ไม่ค้าง) ซึ่งการมารีโมตเซิร์ฟเวอร์ป้อนโค้ด (SSH) ข้อมูลคำสั่งห้ามกระตุกหายเด็ดขาด มันจึงบังคับคุยบน TCP เท่านั้น 

❌ **[ผิด] Security Group Outbound Rule: Protocol – TCP, Port Range – 22, Destination 110.238.98.71/32**
- **ทำไมถึงผิด:** ตั้งกติกาแบนคนสลับทาง! ใช้กฎป้อมยามขาออก (Outbound Rules) ซึ่งโจทย์ต้องการจำกัดแขก "คนเข้าฝั่งลูกบ้านมาเจาะ EC2 ตัวเอง" ตัวแผงกรอง Security groups ของ AWS เป็นระบบจำคนเข้าเมือง (Stateful) เมื่อคุณยอมตั้ง Inbound ให้ใครเข้ามาคุยแล้ว ขากลับที่ตอบฝั่งนู้น (Outbound) มันจะยอมส่งค่าออโต้ให้อยู่แล้ว ไม่ต้องมาตั้งกติกา

❌ **[ผิด] Security Group Outbound Rule: Protocol – UDP, Port Range – 22, Destination 0.0.0.0/0**
- **ทำไมถึงผิด:** ผิดเละเทะยำใหญ่ ทั้งเป็นคำสั่งหลุดกรงพาส่งออก (Outbound) ลามไปใช้โปรโตคอลเกมคุย (UDP) แถมเปิดรับทุกย่านที่อยู่บ้านบนโลกอินเทอร์เน็ต (0.0.0.0/0)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Security Group**: คือกำแพงไฟจิ๋ว / หรือเปรียบเทียบเป็น ยามหน้าหอพัก ที่ติดอยู่หน้าระเบียงเครื่อง Amazon EC2 ทุกเครื่อง หน้าที่ของมันคือ กรองเบื้องต้นว่า "สิทธิ์ IP เบอร์ไหนอนุญาตให้ผ่านเข้ามาเสียบปลั๊กคุยกับเซิร์ฟเวอร์บนพอร์ตเบอร์อะไรบ้าง" 
- **SSH (Secure Shell)**: รีโมตคอนโซลจอดำสำหรับแอดมิน เพื่อใช้ควบคุมเครื่องสาย Linux จากระยะไกล ทำงานผ่าน Port หมายเลข 22
- **TCP vs UDP**: TCP คือการส่งจดหมายลงทะเบียนแบบดราม่า ถ้าพัสดุหล่นหายกลางทาง ระบบจะส่งใหม่จนกว่าจะได้รับพัสดุครบ (เหมาะกับเว็บ, แอพแชท, SSH) / ส่วน UDP ส่งจดหมายปาใส่หน้าแบบขยำทิ้งพากษ์นรก ปาไปแล้วหายช่างมัน ขอแค่ปาให้ไวที่สุด (เหมาะกับ ดูบอลสด, วิดีโอคอล)

---
---

## 📌 คำถามที่ 14
**โจทย์:**
A payment processing company plans to migrate its on-premises application to an Amazon EC2 instance. An IPv6 CIDR block is attached to the company’s Amazon VPC. Strict security policy mandates that the production VPC must only allow outbound communication over IPv6 between the instance and the internet but should prevent the internet from initiating an inbound IPv6 connection. The new architecture should also allow traffic flow inspection and traffic filtering.

What should a solutions architect do to meet these requirements?

**ตัวเลือก:**
- [x] Launch the EC2 instance to a private subnet and attach an Egress-Only Internet Gateway to the VPC to allow outbound IPv6 communication to the internet. Use AWS Network Firewall to set up the required rules for traffic inspection and traffic filtering.
- [ ] Launch the EC2 instance to a private subnet and attach AWS PrivateLink interface endpoint to the VPC to control outbound IPv6 communication to the internet. Use Amazon GuardDuty to set up the required rules for traffic inspection and traffic filtering.
- [ ] Launch the EC2 instance to a private subnet and attach a NAT Gateway to the VPC to allow outbound IPv6 communication to the internet. Use AWS Firewall Manager to set up the required rules for traffic inspection and traffic filtering.
- [ ] Launch the EC2 instance to a public subnet and attach an Internet Gateway to the VPC to allow outbound IPv6 communication to the internet. Use Traffic Mirroring to set up the required rules for traffic inspection and traffic filtering.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทบัตรเครดิต นำแอปพลิเคชันไปตั้งค่ายบน **Amazon EC2** แบบซุ่มมืด แต่ใช้เครือข่ายรุ่นใหม่สายพันธุ์ **IPv6** นโยบายความปลอดภัยสายโหดของบริษัทตั้งเป้าว่า:
1. ให้ EC2 มุดไปข้างนอกอินเทอร์เน็ตได้ (Outbound Allowed) -- เช่น ไปอัปเดตแพทช์
2. ห้ามมิให้ชาวเน็ตอินเทอร์เน็ตหน้าไหน ยิงคำของส่งพัสดุกระแทกสวนทางชิงเข้ามาในระบบ (Inbound Prevented)
3. ต้องติดกล้องวงจรปิดดักค้นยาเสพติด ตรวจจับไวรัสและสแปมจากข้อมูลที่ไหลไปมาได้ (Traffic inspection & filtering)
4. ทำทุกอย่างบนสายสื่อสารยุคใหม่ IPv6 แบบล้านเปอร์เซ็นต์

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ปกติเรื่องการยอมให้ออกเน็ตได้แต่ห้ามสวนกลับ ของฝั่งประชากรยุคเก่า (IPv4) เราจะใช้ "NAT Gateway" ในการแก้ปัญหา... แต่ถ้าข้อสอบเน้นย้ำถึงคำว่า **`IPv6`** และมีคำว่าโอนสิทธิให้ออกทางเดียวคือ **`allow outbound... but prevent inbound`** = ฟันธงเลยว่าคำตอบบังคับให้ใช้ของวิเศษที่เกิดมาเพื่อการณ์นี้โดยเฉพาะคือ **`Egress-Only Internet Gateway`** (จำชื่อท่อนี้ไปสอบได้เลย แม่นยำ100%)
- ทริคที่ 2: เจอคำว่าต้องการกรองตรวจค้นยาแฝงตัวระดับแพคเกจข้อมูล **`traffic inspection and filtering`** = ยามหน้าด่านทรงพลังของ AWS คือ **`AWS Network Firewall`** ให้คู่นี้ไปเลย!
- ทริคที่ 3: **ตัดช้อยส์ `Internet Gateway (IGW)` ธรรมดาทิ้ง** เพราะ IGW ถือเป็นประตูบานโถงกว้าง ถ้าแขวน IGW แล้ว ใครๆในเน็ตก็แฮสวนกลับหน้าด้านๆ วิ่งทับตายเข้ามาหาเครื่องได้ ไม่ตรงเป้า "ห้ามเข้า (prevent inbound)"

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch the EC2 instance to a private subnet and attach an Egress-Only Internet Gateway to the VPC to allow outbound IPv6 communication to the internet. Use AWS Network Firewall to set up the required rules for traffic inspection and traffic filtering.**
- **ทำไมถึงถูก:** IPv6 เป็นไอพีบ้าพลัง ไม่ว่าจะปกปิดยังไงมันก็พร้อมเป็น Public ทะลวงกำแพงออกเน็ตได้พร่ำเพรื่อเสมอ ดังนั้น AWS จึงสร้างประตูผีชื่อ **Egress-Only Internet Gateway** ขึ้นมาเพื่อช่วยกรองให้ "ข้อมูลหลุดลอยอออกไปจาก EC2 ได้ แต่ขาพวกแฮกเกอร์จากเน็ตยิงเข้า EC2 จะถูกประตูกระแทกหน้าเด้งออก" ตีโจทย์แตก และเพื่อให้กรองดูข้อมูลเจาะลึกยาเสพติดได้ เราจะตั้งป้อม **AWS Network Firewall** เข้าไปเสริมทัพจับกวาดทราฟฟิกขาออกแบบ Stateful 

❌ **[ผิด] Launch the EC2 instance to a private subnet and attach a NAT Gateway to the VPC to allow outbound IPv6 communication to the internet.**
- **ทำไมถึงผิด:** NAT Gateway ปลอมตัวเก่งจริงแต่มันส่วนใหญ่เกิดขัดตาทัพเพื่อคุมซ่อนไอพีรุ่นเก่า IPv4 เท่านั้น การเอา NAT Gateway ไปถ่อรับแขก IPv6 ล้วนๆ ถือว่าตลก และ AWS จัด Egress-Only สรรค์สร้างมาเพื่อรุ่นใหม่โดยตรงแล้ว 

❌ **[ผิด] Launch the EC2 instance to a public subnet and attach an Internet Gateway to the VPC to allow outbound IPv6 communication to the internet.**
- **ทำไมถึงผิด:** Internet Gateway จะทำให้ทราฟฟิกเข้ามาบานเบอะประเพณีไร้การกรอง ขัดประสงค์ที่ว่าจะต้อง "ห้ามการทักทายสวนเข้า (prevent inbound)" อย่างเด็ดขาด แถมฟีเจอร์ Traffic mirroring มันใช้หลัก "เฝ้ามองแอบก็อปปี้ส่องข้อมูล" ไม่ใช่กระบองเหล็กจับฟาด Filter บล็อกแพจเกจแบบที่ทำเจ็บจริงๆ จังๆ

❌ **[ผิด] Launch the EC2 instance to a private subnet and attach AWS PrivateLink interface endpoint to the VPC to control outbound IPv6 communication to the internet.**
- **ทำไมถึงผิด:** AWS PrivateLink เป็นพระเอกเดินสายไฟในท่อปิดลับที่คุยกันเอง "จากบริการ AWS หนึ่ง ไปบริการลูกน้อง AWS หนึ่ง" ไม่ใช่นิวเคลียร์เจาะโพรงส่งของออกเน็ตเวทีโลก! ส่วน Amazon GuardDuty ก็แค่สายลับนักสืบโคนันที่คอยดมกลิ่นส่งกระดาษบอกว่าคุณโดนขโมยนะ แต่ไม่มีด้ามปืนจับใครฟิลเตอร์ยันหน้าเข้าคุกด้วยตัวเองได้ 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Egress-Only Internet Gateway**: ประตูเวทมนต์สำหรับโลก "IPv6" เท่านั้น ทำหน้าที่ให้เครื่องคอมบนเกาะเรา ออกทะเลเน็ตไปโหลดบิทอัพแพทช์ได้ แต่เรือโจรสลัดจากทะเลอินเทอร์เน็ตหน้าไหนก็ขว้างระเบิดบี้เข้าเกาะเราไม่ได้! เป็นอาวุธปกป้องขั้นเซียนของฝั่ง IPv6
- **AWS Network Firewall**: บริการกำแพงเหล็ก (Firewall) ฉบับ Managed Service สำหรับควบคุมเส้นทางทราฟฟิกเข้า-ออกแบบละเอียดยิบ (ถึงระดับเตาะแพคเกจดูโดเมนหลอกลวง, ล็อกสเปคกั้น IP ผีดิบ) ไว้ป้องกันภัยคุกคามชั้นเอก

---
---

## 📌 คำถามที่ 15
**โจทย์:**
A company is in the process of migrating their applications to AWS. One of their systems requires a database that can scale globally and handle frequent schema changes. The application should not have any downtime or performance issues whenever there is a schema change in the database. It should also provide a low latency response to high-traffic queries.

Which is the most suitable database solution to use to achieve this requirement?

**ตัวเลือก:**
- [ ] Redshift
- [ ] An Amazon Aurora database with Read Replicas
- [ ] An Amazon RDS instance in Multi-AZ Deployments configuration
- [x] Amazon DynamoDB

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการระบบฐานข้อมูลเพื่อใช้งานด้วยเงื่อนไขสุดหินคือ:
1. กระจายตัวรอบโลกได้มหาศาล (Scale globally)
2. **จัดการการเปลี่ยนโครงสร้างหมวดหมู่ข้อมูลบ่อยๆ ได้ชิลล์ๆ ไม่จำกัดตารางจำเจ (Frequent schema changes)**
3. เวลาเปลี่ยนรูปทรงกระบวนการตีตาราง (Schema change) เครื่องต้องทะยานต่อห้ามหลุดหยุดทำงาน (Zero downtime)
4. ทำงานฉับไวในเวลามีคนแห่เสิร์ชเข้ามาเป็นล้านคน หน่วงหลักมิลลิวินาที (Low latency response)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: คำประกาศิตแห่งฐานข้อมูลที่ทำหน้าแห่เปลี่ยนแบบสอบถามเพิ่มช่องเพิ่มคอลัมน์กี่รอบก็ไม่พัง **`frequent schema changes`** หรือยืดหยุ่นหน้าด้านๆ (Flexible Schema) = ทรงนี้ต้องเป็นฐานข้อมูลอิสระแบบ **`NoSQL Database`** ซึ่งตัวจี๊ดสุดเบอร์ 1 ของวงการ AWS ที่ตอบโจทย์นี้คือ **`Amazon DynamoDB`** เท่านั้น!
- ทริคที่ 2: ถ้าเจอคำว่าทำเรื่องค้นหาตอบกลับโคตรเร็วหลักเสี้ยววิ **`low latency response`** + จำนวนคนดูหลักล้านทะลัก **`scale globally / high-traffic`** = โคตรย้ำชัดเจนว่าเป็นผลงานของ **`DynamoDB`** 
- ทริคที่ 3: **ตัดช้อยส์ `Amazon RDS` และ `Amazon Aurora` ทิ้งกระจุย** ทันทีที่เห็นว่า "อยากเปลี่ยน Schema บ่อยๆ เปลี่ยนทุกสิบนาที" เพราะเจ้ายักษ์สองตัวนี้เป็นฐานข้อมูลแบบดั้งเดิม (Relational SQL) ตารางแข็งทื่อเหมือนสลักหิน ถ้าเปลี่ยนฟิลด์ตารางทีนึงคือบรรลัย เกิด Downtime ระบบค้างเพื่อรื้อตารางใหม่แน่นอน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon DynamoDB**
- **ทำไมถึงถูก:** เพราะรูปแบบของ "Schema (โครงสร้างจัดหมวดหมู่คอลัมน์แถวข้อมูล)" บนระบบ NoSQL แบบ DynamoDB มีความหย่อนยานยืดหยุ่นสูง (Flexible Schema) รันอยู่บนอวกาศ วันนี้ลูกค้าอยากเก็บคอลัมน์ชื่อ, วันพรุ่งนี้ตื่นมาอยากเก็บใส่คอลัมน์เบอร์โทรเพิ่มยัดลงไป DynamoDB ก็อ้าแขนรับ ไม่ต้องกดหยุดสคริปต์ปิดโรงงานเพื่ออัปเดตระบบ แค่ส่งค่าเข้ามามันก็ปั้นบันทึกแถวใหม่ให้เอง ผสานเข้ากับระบบประมวลผลว่องไวระดับมิลลิวิ ยอดคนทะลักเป้นล้านก็รับไหว เข้ากับโจทย์ได้พอดีที่สุด

❌ **[ผิด] An Amazon RDS instance in Multi-AZ Deployments configuration**
- **ทำไมถึงผิด:** Amazon RDS เป็นฐานข้อมูลเชิงสัมพันธ์แบบ **Relational SQL** รุ่นคุณปู่ ซึ่งโครงสร้างมีความแข็งกระด้างจัดๆ (Rigid Schema) ถ้าวันหนึ่งลูกค้ามีข้อมูลใหม่ที่ไม่ได้ระบุลงในหัวข้อตาราง (Schema) ที่สร้างเตรียมไว้ล่วงหน้า ฐานข้อมูลจะพ่นเอ๋อด่าเละเทะไม่รับข้อมูลเลย! กระบวนการปิดแอปปรับแก้ทรงตาราง (ALTER TABLE) อาจกระแทกให้เกิด Downtime ชั่วขณะได้ ซึ่งชวดกฎเหล็กของโจทย์อย่างแรง

❌ **[ผิด] An Amazon Aurora database with Read Replicas**
- **ทำไมถึงผิด:** เหตุผลแฝดคนละฝากับ RDS เลย เพราะ Aurora ดั้งเดิมก็ยังคงเชิดชูตระกูลฐานข้อมูลแบบ Relational Database เมื่อต้องเจอตารางที่ปรับตัวยาก เปลี่ยนหมวดปุ๊บต้องรอสคริปต์ทับตารางไปทั่ว ทำให้กระทบโจทย์เรื่องการเปลี่ยนบ่อยๆ (schema change) 

❌ **[ผิด] Redshift**
- **ทำไมถึงผิด:** ฐานข้อมูลถังน้ำอ้วนกรุระดับโกดัง Data warehouse มันเกิดมานินทาวิเคราะห์ยอดเซลส์ปลายเดือนเน้นคิวรี่ขุดหาข้อมูลอดีต (OLAP) มันไม่ได้เกิดมากระโดดรับคิวทราฟฟิกหน้าจอหน้าบอร์ดพันทิปที่คนเป็นแสนรุมขยับคลิกไลค์หลักซุปเปอร์เสี้ยววิ (Low Latency Transaction) ขนาดนั้น

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon DynamoDB**: บริการฐานข้อมูลแบบ NoSQL ไร้เซิร์ฟเวอร์แบบจัดเต็ม (Serverless) เป็นลูกรักของ AWS ที่โดดเด่นเรื่อง 1. ความไวเสี้ยววินาที (Single-digit millisecond) ไม่แผ่วแม้ข้อมูลใหญ่เป็นล้านๆ เทราไบต์ / 2. สเกลกางร่มแบบอินฟินิตี้ / 3. ยืดหยุ่น ไม่บังคับตีเส้นคอลัมน์ตารางตายตัว
- **Relational vs NoSQL**: ยุคเก่าอย่าง "Relational DB" (เช่น RDS) เสมือนตารางกรอก Excel ที่ต้องล็อกหน้าตากระดาษตายตัว "ห้ามก้าวล่วง" หากจะเติมคอลัมน์ทีต้องสั่งรื้อสมุดใหม่ทั้งเล่ม! ส่วน "NoSQL Database" (เช่น DynamoDB) เหมือนหนังสือสมุดฉีกโยนกระดาษโน้ตทับๆ กัน จะเขียนสั้นเขียนยาวแปะอะไรบ้างมันก็เสกให้ได้ ไม่ต้องซีเรียสรูปแบบ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 4: ข้อ 16 - 20)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 16
**โจทย์:**
A company has a cloud architecture composed of Linux and Windows Amazon EC2 instances that process high volumes of financial data 24 hours a day, 7 days a week. To ensure high availability of the systems, the Solutions Architect must create a solution that enables monitoring of memory and disk utilization metrics for all instances.

Which of the following is the most suitable monitoring solution to implement?

**ตัวเลือก:**
- [x] Install the Amazon CloudWatch agent to all the EC2 instances that gather the memory and disk utilization data. View the custom metrics in the CloudWatch console.
- [ ] Use Amazon Inspector and install the Inspector agent to all EC2 instances.
- [ ] Use the default Amazon CloudWatch configuration to EC2 instances where the memory and disk utilization metrics are already available. Install the AWS Systems Manager (SSM) Agent to all the EC2 instances.
- [ ] Enable the Enhanced Monitoring option in EC2 and install Amazon CloudWatch agent to all the EC2 instances to be able to view the memory and disk utilization in the CloudWatch dashboard.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีเซิร์ฟเวอร์ทั้ง **Linux** และ **Windows (Amazon EC2)** รันระบบตรวจสอบข้อมูลทางการเงินแบบ 24 ชั่วโมง เพื่อให้แน่ใจว่าระบบจะไม่ล่ม สถาปนิกระบบต้องตั้งค่าให้สามารถ **ส่องดูเปอร์เซ็นต์การใช้งาน "หน่วยความจำ (Memory / RAM)" และ "พื้นที่ฮาร์ดดิสก์ (Disk utilization)"** ของทุกเครื่องได้ 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: กฎเหล็กของ AWS EC2 คือ **มันมองไม่ทะลุเข้าไปเห็น RAM และ %ฮาร์ดดิสก์ใน OS ของเรา!** ดังนั้นคีย์เวิร์ด **`memory and disk utilization`** บังคับให้เราต้องเลือกข้อที่มีคำว่า **`Install the Amazon CloudWatch agent`** และดึงค่าส่งออกมาเป็น **`custom metrics`** เสมอ!
- ทริคที่ 2: อย่าโดนประโยคสุดสวยหลอก! **ช้อยส์ที่บอกว่า `metrics are already available` (มีให้ดูอยู่แล้ว) = โกหกตัวโตๆ ตัดทิ้งได้เลย**
- ทริคที่ 3: เห็นคำว่า **`Enhanced Monitoring`** ให้ระวัง! ปุ่มวิเศษนี้มันมีอยู่จริง แต่มันเอาไว้มุดดู OS ของบริการฐานข้อมูล **Amazon RDS** เท่านั้น ในหน้าจอ EC2 ไม่มีปุ่มนี้ให้กดหรอกนะ ตัดทิ้งไปเลย

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Install the Amazon CloudWatch agent to all the EC2 instances that gather the memory and disk utilization data. View the custom metrics in the CloudWatch console.**
- **ทำไมถึงถูก:** เพราะโดยพื้นฐาน AWS เห็นแค่ค่าระดับฮาร์ดแวร์ภายนอก (เช่น CPU วิ่งเท่าไหร่, เน็ตวิ่งหนักไหม) เขาไม่มีสิทธิเจาะลึกทะลุเข้าไปดู OS ดึงข้อมูลส่วนตัวยิบย่อยในเครื่อง EC2 ของเราได้ (เช่น เสียบแรมกี่กิ๊ก เหลือเนื้อที่ฮาร์ดดิสก์ Drive C กี่เปอร์เซ็นต์) ดังนั้นเราต้องแก้ปัญหาด้วยการ **"ติดตั้ง CloudWatch Agent"** ลงไปในเครื่อง (รองรับทั้ง Linux/Windows) เพื่อให้สายลับตัวนี้แอบดูพื้นที่ RAM/Disk แล้วคุยวิทยุส่งข้อมูลกลับมาโชว์บนกราฟ (Custom Metrics)

❌ **[ผิด] Use the default Amazon CloudWatch configuration to EC2 instances where the memory and disk utilization metrics are already available. Install the AWS Systems Manager (SSM) Agent to all the EC2 instances.**
- **ทำไมถึงผิด:** ผิดอย่างมหันต์! ค่าลี้ลับของเครื่อง EC2 แบบ Ram กับ Disk Space "ไม่ได้มีให้ดูแบบ Default (Not natively available)" ถ้านั่งดูค่า Default คุณจะเห็นแค่ระดับนอกเครื่อง นอกจากนี้ SSM Agent ไม่ได้เอาไว้ส่งกราฟ RAM มันเอาไว้สั่งการรีโมตและแพทช์เครื่อง

❌ **[ผิด] Enable the Enhanced Monitoring option in EC2 and install Amazon CloudWatch agent to all the EC2 instances to be able to view the memory and disk utilization in the CloudWatch dashboard.**
- **ทำไมถึงผิด:** ไม่มีปุ่มฟีเจอร์ที่ชื่อ **Enhanced Monitoring** ในหน้าต่างของ Amazon EC2 ฟีเจอร์นี้เป็นเรื่องเฉพาะทางที่มีไว้สังเกตการณ์ระบบฐานข้อมูลตระกูล **Amazon RDS/Aurora** เท่านั้น

❌ **[ผิด] Use Amazon Inspector and install the Inspector agent to all EC2 instances.**
- **ทำไมถึงผิด:** ผิดหน้าที่! Amazon Inspector รับบทเป็นตำรวจสืบสวนคดีทุจริตความเสี่ยง ไวรัส หรือภัยคุกคามทางช่องโหว่ (Security Assessment) ของระบบตัวเครื่อง ไม่ได้รับหน้าที่เป็นช่างตวงดูแผงหน่วยความจำ หรือท่อฮาร์ดดิสก์ ของระบบแต่อย่างใด

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon CloudWatch Agent**: เอเจนต์สุดขยันของ AWS ที่เป็นสะพานเชื่อมมุดเข้าไประดับลึกสุดของเซิร์ฟเวอร์ (OS-level) เพื่อโกยข้อมูลสเปคเครื่อง (RAM, Disk ปัจจุบัน) และขุดดูไฟล์ Log ระดับ Application มาแสดงผลให้เห็นบนหน้าจอ CloudWatch Dashboards
- **Custom Metrics**: ค่าตัวแปรมิเตอร์วัดผลประหลาดๆ ที่เราขอสร้างเอาเอง (AWS ไม่ได้มีให้แต่แรก) จ่ายเงินเพิ่มเล็กน้อย แลกกับกราฟแจ่มๆ ของเราเอง

---
---

## 📌 คำถามที่ 17
**โจทย์:**
An online shopping platform is hosted on an Auto Scaling group of Amazon EC2 Spot instances and utilizes Amazon Aurora PostgreSQL as its database. It is required to optimize database workloads in the cluster by directing the production traffic to high-capacity instances and routing the reporting queries from the internal staff to the low-capacity instances.

Which is the most suitable configuration for the application as well as the Aurora database cluster to achieve this requirement?

**ตัวเลือก:**
- [ ] Do nothing since by default, Aurora will automatically direct the production traffic to your high-capacity instances and the reporting queries to your low-capacity instances.
- [ ] Configure your application to use the reader endpoint for both production traffic and reporting queries, which will enable your Aurora database to automatically perform load-balancing among all the Aurora Replicas.
- [ ] In your application, use the instance endpoint of your Aurora database to handle the incoming production traffic and use the cluster endpoint to handle reporting queries.
- [x] Create a custom endpoint in Aurora based on the specified criteria for the production traffic and another custom endpoint to handle the reporting queries.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทช้อปปิ้งใช้ **Amazon Aurora PostgreSQL** เป็นฐานข้อมูลหลัก ตอนนี้อยากรีดประสิทธิภาพระบบให้คุ้มค่า (มีเครื่องสเปคใหญ่กับสเปคเล็กปนกันอยู่) โดยอยากแยกสายคิว:
1. การเข้าเว็บซื้อของจริงของลูกค้า (Production traffic) ให้ชี้ให้เด้งไปเครื่องสเปคยักษ์ๆ (High-capacity instances) 
2. การให้พนักงานโหลดไฟล์รายงานงบ (Reporting queries) ให้ชี้ไปโหลดดึงเครื่องสเปคเล็กๆ (Low-capacity instances) พอ
โจทย์ถามว่า จะตั้งค่าทางเข้า Aurora ยังไงให้มันแยกลูกค้า 2 เกรดนี้ไปคนละเครื่องแบบอัตโนมัติ

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์มี "ฐานข้อมูล Amazon Aurora" และพูดถึงความทะเยอทะยานที่จะแยกลูกค้าให้ไปวิ่งเข้า "เครื่องไซส์ไม่เท่ากัน" (high-capacity ไปทางนึง / low-capacity ไปทางนึง) = คำตอบคือ **`Create a custom endpoint` (สร้างลิงก์ชี้เป้าเฉพาะกิจขึ้นมาเองเลย)**
- ทริคที่ 2: ระวังโดนหลอกให้ใช้ **`reader endpoint`** เพราะลิงก์นี้มันมีความเป็นคอมมิวนิสต์ คือมันจะ "กระจายโหลด (Load balance) สาดแบบสุ่มๆ ส่งให้ลูกน้องทุกเครื่องเท่าๆ กัน โดยไม่สนว่าเครื่องไหนสเปคใหญ่สเปคเล็ก" ซึ่งไม่ตอบโจทย์ 
- ทริคที่ 3: ช้อยส์ที่มาทรงมักง่ายแบบมีคำว่า **`Do nothing since by default`** (ฉันฉลาดเดี๋ยวมันทำเองแหละ) มักจะผิดเสมอ เพราะหน้าตาของ AWS ดั้งเดิมมันไม่มีเซนส์รู้ใจหรอกว่าข้อมูลก้อนนี้คือลูกค้า ก้อนนี้คือพนักงาน ถ้าแอดมินไม่เป็นคนชี้ทางให้

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a custom endpoint in Aurora based on the specified criteria for the production traffic and another custom endpoint to handle the reporting queries.**
- **ทำไมถึงถูก:** Aurora มีฟีเจอร์เด็ดชื่อ "Custom Endpoint" ที่ให้เราจับมัดรวมกลุ่ม Instance ที่มีสเปคเทียร์เดียวกันเอาไว้ใต้ลิงก์ทางเข้าตัวเดียวได้อย่างยอดเยี่ยม! (เช่น มัดลิงก์พนักงานไปเข้าสเปคต่ำ, และฝั่งแอปค้าขายไปเข้าลิงก์เครื่องระดับพระกาฬ) ตอบโจทย์รีดประสิทธิภาพตามคลาสได้อย่างสมบูรณ์

❌ **[ผิด] Do nothing since by default, Aurora will automatically direct the production traffic to your high-capacity instances and the reporting queries to your low-capacity instances.**
- **ทำไมถึงผิด:** Aurora ฉลาดแต่ไม่อ่านใจคน! มันไม่สามารถแยกแยะได้เองด้วยจิตสัมผัสว่า "เฮ้ย คำสั่งซื้อของนี้ทราฟฟิกชอปปิงนะ / เฮ้ย อันนี้พนักงานดูงบนะ" ถ้าเราไม่สร้างตั๋วแยก Custom Endpoint ให้มัน มันก็จะเหวี่ยงข้อมูลลงท่อรวมมั่วตั้วกันไปหมด 

❌ **[ผิด] Configure your application to use the reader endpoint for both production traffic and reporting queries, which will enable your Aurora database to automatically perform load-balancing among all the Aurora Replicas.**
- **ทำไมถึงผิด:** Reader Endpoint จะทำการ "เกลี่ยโหลด (Load Balance)" ให้เครื่องร่างแยก (Replica) ทุกตัวในระบบ ไม่สนใจหน้าอินทร์หน้าพรหมหรือคลาสสเปคเล็ก/ใหญ่ ผลคือเครื่องสเปคเล็กอาจทำงานกะอักเลือดตายเพราะได้งานหนักเท่าเครื่องใหญ่ หรือเครื่องใหญ่อาจจะทำงานเบาไปจนเปลืองค่าไฟไม่คุ้มค่าตัว 

❌ **[ผิด] In your application, use the instance endpoint of your Aurora database to handle the incoming production traffic and use the cluster endpoint to handle reporting queries.**
- **ทำไมถึงผิด:** Cluster endpoint เกิดมาใช้เพื่อเป็นเป้าชี้ให้กระสุนข้อมูลพุ่งไปที่ จุดเขียนก้อนหลัก (Primary instance/Writer) เท่านั้น ไม่ได้ช่วยแยกโหลดใหญ่/เล็ก และการให้พนักงานดึงรายงานจากตารางจุดเขียน อาจทำให้ระบบหน่วงทั้งระบบแอปพลิเคชันจนลูกค้าซื้อของไม่ได้ 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon Aurora Endpoints**: พอเราสร้างคลัสเตอร์ Aurora 1 ก้อน (ซึ่งมีหลายเครื่องปนกันข้างใน) มันจะมีลิงก์ทางเข้าหรือ "Endpoint" หลายรูปแบบ:
  1. **Cluster Endpoint**: บอสใหญ่ ลิงก์ไว้ชี้เป้าไปหาเครื่องที่มีจุดประสงค์เพื่อ "บันทึก/เขียน (Write)" ข้อลงฐานข้อมูล
  2. **Reader Endpoint**: ตัวกระจายงาน ลิงก์ที่ไว้ "อ่าน/ดึง (Read)" ข้อมูลอย่างเดียว โดยมันจะสุ่มกระจายงานให้ลูกน้อง Reader แบบเท่าเทียมกัน
  3. **Custom Endpoint**: ลิงก์จัดกลุ่มที่เราตั้งเอง เช่น จับมัดลูกน้องสเปคเล็กเครื่อง 1 กับ 3 ด้วยกันให้พนักงานใช้ เป็นต้น

---
---

## 📌 คำถามที่ 18
**โจทย์:**
An e-commerce company utilizes a regional Amazon API Gateway to host its public REST APIs. The API Gateway endpoint is accessed through a custom domain name set up with an Amazon Route 53 alias record. To support continuous improvement, the company intends to launch a new version of its APIs with enhanced features and performance optimizations.

How can the company reduce customer disruption and ensure MINIMAL data loss during the update process in the MOST cost-effective way?

**ตัวเลือก:**
- [ ] Modify the existing API Gateway with the updated version of the APIs, but keep the same custom domain name for the new API Gateway by using the import-to-update operation in either overwrite or merge mode.
- [x] Implement a canary release deployment strategy for the API Gateway. Deploy the latest version of the APIs to a canary stage and direct a portion of the user traffic to this stage. Verify the new APIs. Gradually increase the traffic percentage, monitor for any issues, and, if successful, promote the canary stage to production.
- [ ] Implement a blue-green deployment strategy for the API Gateway, deploying the latest version of the APIs to the green environment. Route some user traffic to it, validate the new APIs, and once thoroughly validated, promote the green environment to production.
- [ ] Create a new API Gateway with the updated version of the APIs in OpenAPI JSON or YAML file format, but keep the same custom domain name for the new API Gateway.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บไซต์มีบริการ **Amazon API Gateway** ใช้ชื่อโดเมนหลักตัวเองควบอยู่ บริษัทกำลังเตรียมปล่อยระบบ API ของใหม่เวอร์ชั่น 2.0 สู่ตลาด
โจทย์ต้องการวิธีผลัดใบระบบของบริษัท ให้เวอร์ชั่น 2.0 ไปถึงมือลูกค้าแบบค่อยเป็นค่อยไป เพื่อ**ลดปัญหาลูกค้าตกใจกระเด็นหลุดระบบ (reduce customer disruption / MINIMAL data loss)** เผื่อโค้ดพัง และต้องเป็นวิธีที่ประหยัดที่สุด **MOST cost-effective way**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์ปล่อยอัปเดตระบบของใหม่ (Deployment) + คีย์เวิร์ดบังคับว่าต้องเป็นวิธีที่**โคตรประหยัดงบ (MOST cost-effective)** = ต้องเลือกวิธีการปล่อยนกพิราบดูลาดเลาที่ชื่อว่า **`canary release deployment`** (Canary เป็นฟีเจอร์เด่นระดับ Built-in ให้ใช้ฟรีๆ ของบริการ API Gateway เลย)
- ทริคที่ 2: ทำไมถึงไม่ตอบ `blue-green deployment` ? เพราะวิธี Blue-Green คือการโคลนเซิร์ฟเวอร์หลังบ้านขึ้นมาอีกก็อปปี้นึงขนานกัน (ซับซ้อนและมีค่าใช้จ่ายเบิ้ล 2 เท่า) มันจึงไม่ตอบรับคอนเซปต์ข้อนี้ที่ถามว่าวิธีไหนคุ้มตังค์สุด
- ทริคที่ 3: **ตัดช้อยส์ที่บอกให้ อัปโหลดทับของเดิมรวดเดียว `overwrite or merge mode` ทิ้งไป** เพราะถ้าโค้ดของเวอร์ชั่นใหม่พังแปลว่าลูกค้า 100% ของคุณจะได้รับผลกระทบหน้าเว็บล่มพร้อมกัน ขัดกับคำว่า "minimize disruption" (ลดการพังทลายของลูกค้า)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Implement a canary release deployment strategy for the API Gateway. Deploy the latest version of the APIs to a canary stage and direct a portion of the user traffic to this stage. Verify the new APIs. Gradually increase the traffic percentage...**
- **ทำไมถึงถูก:** ใช้งานกลยุทธ์กรงนกกระจอกเทศเตือนภัย (Canary Release) API Gateway มีฟีเจอร์นี้ให้เปิดใช้แบบฟรีๆ สบายๆ เราแค่ตั้งค่าให้ระบบหั่นทราฟฟิก (เช่น 5%) ลองให้หลุดไปดมกลิ่นโค้ดตึกเวอร์ชันใหม่ดูก่อน ถ้าทำงานผ่านราบรื่นดีไม่มีบั๊กค่อยๆ ปรับหน้าปัดเร่งเป็น 10, 50 จนถึง 100% แต่ถ้าเว็บพังก็แค่หมุนหน้าปัดกลับมาเป็น 0% ทันที! ประหยัด ไม่ต้องตั้งเซิร์ฟใหม่ให้วุ่นวาย และลูกค้าได้รับผลกระทบน้อยที่สุด

❌ **[ผิด] Implement a blue-green deployment strategy for the API Gateway, deploying the latest version of the APIs to the green environment...**
- **ทำไมถึงผิด:** การย้ายสลับสีกล่องหลังบ้าน Blue / Green สามารถกันปัญหาได้ดีเยี่ยม แต่อาจจะไม่ตรงเป้าที่สุดเพราะมีคำว่า "แพง!" มันมีความซับซ้อนเกินไป ขัดกับกติกาพ่วงท้าย (MOST cost-effective) ที่พุ่งเป้าไปหาวิธีประหยัดสุด ซึ่งบน API Gateway แค่กดใช้ Canary ก็จบแล้ว

❌ **[ผิด] Modify the existing API Gateway with the updated version of the APIs, but keep the same custom domain name for the new API Gateway by using the import-to-update operation in either overwrite or merge mode.**
- **ทำไมถึงผิด:** การโค่นทิ้งนำเข้าทับตัวเดิมดื้อๆ 100% (In-place update) เหมือนการเดิมพันหมดหน้าตัก คือฝันร้ายเต็มสูบ ถ้าเวอร์ชั่นใหม่มีบั๊คตายทั้งระบบ ระบบคุณจะล่มพินาศป่นปี้พร้อมกันทุกคน 

❌ **[ผิด] Create a new API Gateway with the updated version of the APIs in OpenAPI JSON or YAML file format, but keep the same custom domain name for the new API Gateway.**
- **ทำไมถึงผิด:** เป็นกระบวนการทำมือที่งี่เง่ามาก! คือโยนทิ้งสร้างสร้างบริการตัวใหม่ แล้วไปสลับสายสะพานเข้าที่ชื่อโดเมน (DNS) ซึ่งกว่าโลกอินเทอร์เน็ตจะอัปเดตรับรู้การสับเปลี่ยนชื่อให้หันไปเสาใหม่ (DNS Propagation) อาจใช้เวลาหลายชั่วโมง ระหว่างนั้นเซสชั่นลูกค้าบางเครื่องจะขาดๆหายๆ กระตุกรับประสบการณ์ห่วยแตกสุดขีด

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Canary Release**: กลยุทธ์การปล่อยระบบเวอร์ชั่นใหม่ ที่ได้แรงบันดาลใจจากสมัยก่อน ที่คนงานเหมืองถ่านหินเอานกคานารี (นกน้อยปอดเล็ก) ห้อยปรงลงไปในเหมืองด้วย ถ้านกตายแปลว่าอากาศเป็นพิษให้รีบหนี!... การอัปเดตระบบก็เหมือนกัน เราปล่อยผู้ใช้ไป 5% ให้นกลองดมกลิ่นโค้ดใหม่ก่อน ถ้าไม่เจอเออเร่อก็แปลว่าผ่าน! โคตรเซฟลูกค้า 
- **Blue/Green Deployment**: การทำระบบเบิ้ล 2 ดุ้น ดุ้นสีฟ้าคือของเก่าที่ใช้อยู่ ดุ้นสีเขียวคือของใหม่ที่ขึ้นเซิร์ฟรอรันพร้อมทดสอบเต็มเหนี่ยวร้อยเปอร์ พอถึงวันฤกษ์ดี ก็แค่สับสวิตช์หน้าทางเข้าทีเดียว ดันลูกค้าทั้งหมดไปสายสีเขียวแทนทันที! (เซฟ, ย้อนอดีตง่ายมาก แต่ต้นทุนแพงกว่าเพราะต้องเบิ้ลเครื่อง)

---
---

## 📌 คำถามที่ 19
**โจทย์:**
A car dealership website hosted in Amazon EC2 stores car listings in an Amazon Aurora database managed by Amazon RDS. Once a vehicle has been sold, its data must be removed from the current listings and forwarded to a distributed processing system.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [ ] Create an RDS event subscription and send the notifications to Amazon SNS. Configure the SNS topic to fan out the event notifications to multiple Amazon SQS queues. Process the data using AWS Lambda functions.
- [x] Create a native function or a stored procedure that invokes an AWS Lambda function. Configure the Lambda function to send event notifications to an Amazon SQS queue for the processing system to consume.
- [ ] Create an RDS event subscription and send the notifications to AWS Lambda. Configure the Lambda function to fan out the event notifications to multiple Amazon SQS queues to update the processing system.
- [ ] Create an RDS event subscription and send the notifications to Amazon SQS. Configure the SQS queues to fan out the event notifications to multiple Amazon SNS topics. Process the data using AWS Lambda functions.

---
### 🎯 โจทย์ต้องการอะไร?
เต็นท์ขายรถใช้ฐานข้อมูล **Amazon Aurora** ทีนี่พอพนักงานขายรถออกไปแล้ว 1 คัน... "รายการข้อมูลรถถูกลบทิ้งจากตาราง (remove from listings) และจังหวะที่ข้อมูลถูกถอดปลั๊กลบทิ้งเนี่ย จะต้องถูกส่งต่อไปสะกิดระบบรันคอมระดับหลังบ้านทันที เพื่อเอาเรคคอร์ดนี้ไปปัดฝุ่นต่อให้เรียบร้อย (forwarded to a distributed processing)" 
โจทย์หา "สะพานเชื่อมตัวไหน" ที่จะรับแจ้งเตือนความเคลื่อนไหวระดับ "การลบบรรทัดในตาราง (Row-level data modification)" จาก Aurora ส่งออกไปข้างนอกได้เวิร์คสุด

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์อยากให้ "แอปฐานข้อมูลตระกูล Aurora MySQL ปัดฝุ่นทำงานตอบโต้เมื่อมีการ Insert/Update/Delete (แก้ไขบรรทัดข้อมูล) แล้วกระเด็นไปจับงานบน AWS Lambda รัวๆ" ท่าไม้ตายคลาสสิคคือการเรียกผ่านโค้ดในตัวเซิร์ฟเอง ที่ชื่อว่า **`Create a native function or a stored procedure` (สร้างฟังก์ชันระดับเนทิฟยิงเข้าหา Lambda)**
- ทริคที่ 2: เจอคำว่าเกิดความเปลี่ยนแปลงระดับบรรทัดข้อมูล = **ตัดช้อยส์ `RDS event subscription` ทิ้งให้หมดทุกข้อ!** เพราะ RDS event เกิดมาเพื่อรายงานเหตุการณ์ระดับตัวกระดองตึกเครื่องเซิร์ฟเวอร์เท่านั้น! เช่น "ฮาร์ดดิสก์ใกล้เต็ม", "เครื่องรีบูทเสร็จละนะบอส", หรือ "สำรองข้อมูลพัง" มันไม่มีทางรับรู้เลยว่าพนักงานเต็นท์รถลบข้อมูลแถวที่ 5 ทิ้งไปเมื่อไหร่!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a native function or a stored procedure that invokes an AWS Lambda function. Configure the Lambda function to send event notifications to an Amazon SQS queue for the processing system to consume.**
- **ทำไมถึงถูก:** เคล็ดลับสุดยอดของ "Amazon Aurora (ในร่าง MySQL)" คือความสามารถขั้นเทพในการแอบสร้างโค้ดสายลับทศกัณฐ์ระดับฐานข้อมูล (Native Function หรือ Stored procedure) ไว้ดักยิงกระสุน Trigger พุ่งกระดอนเข้าหา **AWS Lambda** โดยตรงจากในตัวมันเองได้เลย! พอมีแถวข้อมูลรถโดนพนักงานลบ (DELETE) ปุ๊บ มันก็จะดักยิงข้อมูลส่งให้ Lambda ทำคลอดต่อเข้าสายพาน SQS ประมวลผลได้เลยทันทีแบบเนียนกริบ!

❌ **[ผิด] Create an RDS event subscription and send the notifications to Amazon SNS. Configure the SNS topic to fan out the event notifications to multiple Amazon SQS queues. Process the data using AWS Lambda functions.**
- **ทำไมถึงผิด:** หางานให้เครื่องมือผิดประเภท! "RDS event subscription" มันเป็นฟีเจอร์รายงานสถานะพฤติกรรมความอยู่รอดของเครื่อง ไม่ใช่สายลับจับตาการแก้ไขข้อมูลบรรทัดตาราง มันจึงไม่สามารถเป็นสะพานส่งข้อมูลบรรทัดรถที่โดนลบไปหาใครหน้าไหนได้ทั้งสิ้น 

❌ **[ผิด] Create an RDS event subscription and send the notifications to AWS Lambda. Configure the Lambda function to fan out the event notifications to multiple Amazon SQS queues to update the processing system.**
- **ทำไมถึงผิด:** เหตุผลเดียวกันคือ ผิดตั้งแต่ถือท่อ "RDS event subscription" ยิงเปิดตัวมาเลย มันทำไม่ได้

❌ **[ผิด] Create an RDS event subscription and send the notifications to Amazon SQS. Configure the SQS queues to fan out the event notifications to multiple Amazon SNS topics. Process the data using AWS Lambda functions.**
- **ทำไมถึงผิด:** เละเป็นโจ๊ก! นอกจากจะใช้ RDS Event ผิดจุดแล้ว ยังวางโครงสถาปัตยกรรมกระจายเสียงกลับหลังหันเพี้ยนอีก (จงจำไว้ว่าการทำ Fan-out แจกจ่ายงาน ปกติจะต้องส่งจาก SNS เสาต้นเดียว พ่นกระจายลงตะกร้า SQS หลายๆ ตะกร้า ... ไม่ใช่บ้าบอเอาตะกร้า SQS ไปพัดยิงผีใส่เสา SNS เด็ดขาด!)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon Aurora Invoking AWS Lambda**: เป็นฟีเจอร์เด่นระดับโปร เมื่อจับร่าง Aurora MySQL คุณจะสามารถยัดพลังวิเศษให้มันส่งพัสดุยิงทะลุตรงไปสั่งงาน AWS Lambda function แบบหน้าด้านๆ ไม่ต้องส่ายหน้าหาบริการสื่อสารมาคั่นกลาง. ใช้ประโยชน์มากๆ เวลามีคำสั่งเปลี่ยนแปลงข้อมูลปุ๊บ อยากให้มีอีเมลแจ้งเตือนส่งออกไปหลังบ้านอัตโนมัติ

---
---

## 📌 คำถามที่ 20
**โจทย์:**
A cryptocurrency trading platform is using an API built in AWS Lambda and API Gateway. Due to the recent news and rumors about the upcoming price surge of Bitcoin, Ethereum and other cryptocurrencies, it is expected that the trading platform would have a significant increase in site visitors and new users in the coming days ahead.

In this scenario, how can you protect the backend systems of the platform from traffic spikes?

**ตัวเลือก:**
- [ ] Move the Lambda function in a VPC.
- [ ] Use CloudFront in front of the API Gateway to act as a cache.
- [x] Enable throttling limits and result caching in API Gateway.
- [ ] Switch from using AWS Lambda and API Gateway to a more scalable and highly available architecture using EC2 instances, ELB, and Auto Scaling.

---
### 🎯 โจทย์ต้องการอะไร?
แพลตฟอร์มเทรดคริปโต ใช้ระบบสร้างหน้าด่านกว้างขวางด้วย **API Gateway เสียบยอดหลังบ้านเป็น AWS Lambda** ทีนี้มีข่าวลือระดับโลกทำนายว่าบิตคอยน์จะพุ่งแรงทะลุโลก! แอดมินพบว่าเร็วๆ นี้จะมีนักลงทุนแตกตื่นคลิกแห่กระทำการถล่มยอดเข้าเว็บทนไม่ไหว (Traffic spikes) แน่ๆ
โจทย์ต้องการวิธีปกป้องกระดูกสันหลังหลังบ้าน (Backend systems) อย่าง Lambda ไม่ให้ถูกหน้าด่านตีแตกตายพินาศคาบ้าน 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์กลัวบ้านบึ้มจากการโดนยิงมารัวๆ **`protect the backend systems... from traffic spikes`** (ยอดโหลดทราฟฟิกกระชากกะทันหัน) บนโลกของ API Gateway ท่าไม้ต้านแรกคือการตั้งสติกดปุ่มล็อกคอปิดก๊อกจำนวนเข้าชม ที่เรียกว่า **`Enable throttling limits` (จำกัดความถี่การไหลเข้าของท่อ API)**
- ทริคที่ 2: โดนถล่มดูราคาบิทคอยพุ่ง! แปลว่าข้อมูลมันอ่านซ้ำๆ รัวๆ ไม่เปลี่ยนไปมาก การแนะให้เปิด **`result caching in API Gateway` (ระบบจดจำความจำหน้าด่าน)** เพื่อให้เอาคำตอบไปป้อนใส่ปากลูกค้าที่มากด Refresh หน้าเว็บได้เลย...จะยิ่งฟิน ลดแรงกระแทกถึง Lambda หลังบ้านได้เกิน 50%
- ทริคที่ 3: **ตัดช้อยส์ที่บอกให้ `Switch from... to... EC2...` (โยน AWS Lambda และ API ซะ แล้วกลับไปปลูกบ้าน EC2 + ELB ดั้งเดิม)** เกรดโซลูชั่นสถาปนิกคลาวด์ตัวจริง (Cloud Architect) จะไม่มีวันแนะนำให้คุณทิ้งอาณาจักรเหาะเหิน Serverless (ที่กางปีกออโต้สเกลขั้นเทกระจุยกระจาย) เพื่อกลับไปหนีซุกท่อสับสวิตช์เครื่อง EC2 อ้วนๆ แบบดึกดำบรรพ์แน่นอน ไร้สาระ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable throttling limits and result caching in API Gateway.**
- **ทำไมถึงถูก:** ปกป้องอย่างชาญฉลาด! ถ้าน้ำมามากไปกระแทกเขื่อนพัง ก็ตั้งด่านตรวจรปภ.บีบปากท่อ (Throttling limits) เสียเลย "ใครมาทีล่ะหมื่นวิ เด๋งปัดหางหล่นเป็น Error ซะ ให้ Lambda รอด!" และตั้งโรงรับฝากข้อมูลความจำ (Result Caching) หน้าปากซอยร่วมด้วย ตัวอย่างเช่น พอฝูงยุงเข้ามา 1 แสนคนพร้อมกัน API Gateway จะขุดเอาความจำราคา Bitcoin เมื่อ 5 วิที่แล้ว (Cache) ตะบันเสิร์ฟกลับรัวๆ ไม่ต้องปลุกให้ยอดฝีมือเข้าลุยงานรบกวน Lambda ให้เปลืองค่ารันบิลฟรีๆ

❌ **[ผิด] Use CloudFront in front of the API Gateway to act as a cache.**
- **ทำไมถึงผิด:** CloudFront มันคือมิติของ CDN กระจายภาพ/สคริปต์ให้โหลดเร็วขึ้นทั่วโลก แต่มันไม่ได้ช่วยต้านรับหน้าจังๆ จากการเจอยิงเข้าจุดตายอย่าง Dynamic API แถมถ้าไม่มี Throttling บีบปากท่อร่วมปกป้องด้วย หากของใน Cloudfront หมดอายุ แขกชาวเน็ตก็แห่ทะลวงหน้าทะลุเหยียบหัว Lambda แตกตายอยู่ดี 

❌ **[ผิด] Move the Lambda function in a VPC.**
- **ทำไมถึงผิด:** ดัน Lambda หนีไปหลบภัยสร้างคอกกรงกำแพงส่วนตัว (Amazon VPC) เป็นการแก้ไขปัญหาไม่ตรงจุด VPC เอาไว้แค่กั้นเครือข่ายความปลอดภัยด้านการแฮกเจรจา ไม่ใช่โล่กัปตันอเมริกาที่จะต้านทานความรุนแรงของก้อนคนกระเพาะ Traffic ที่ถล่มรัวๆ ท่วมหน้าประตู API Gateway ได้

❌ **[ผิด] Switch from using AWS Lambda and API Gateway to a more scalable and highly available architecture using EC2 instances, ELB, and Auto Scaling.**
- **ทำไมถึงผิด:** ตลกมาก ทิ้งสุดยอดเทคโนโลยี Serverless ยอดพีระมิดเรื่องทำสเกลตัวท็อปอย่าง API Gateway กับ Lambda เพื่อลดชั้นไปงมแก้ตัวปลูกป่าคุมเครื่องเหล็ก EC2 ด้วยตัวเอง เป็นแผนโบราณที่โคตรลำบากแอดมินเปล่าๆ 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **API Gateway Throttling**: ตัวกำกับความเร็ว (Rate Limiting) ที่ป้อมยามหน้าด่าน เช่น เราตั้งกติกาว่า 1 โทเคนเรียกได้ 1,000 ครั้ง/วินาที ถ้ากระแทกเรียกเกินนี้จะดีดหน้าหงายด้วยข้อความ `429 Too Many Requests`
- **API Gateway Caching**: ตัวเสริมความจำของจุดปล่อย API สามารถแคชผลลัพธ์คำตอบจดจำพักไว้ได้ (Time-To-Live แนะนำคือ 5-300 วินาที) เหมาะสมกับ API ที่ผลลัพธ์ไม่เปลี่ยนแปลงระห่ำเกินไป ช่วยลดภาระเซิร์ฟเวอร์หลังบ้านได้อลังการ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 5: ข้อ 21 - 25)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 21
**โจทย์:**
A company uses an Application Load Balancer (ALB) for its public-facing multi-tier web applications. The security team has recently reported that there has been a surge of SQL injection attacks lately, which causes critical data discrepancy issues. The same issue is also encountered by its other web applications in other AWS accounts that are behind an ALB. An immediate solution is required to prevent the remote injection of unauthorized SQL queries and protect their applications hosted across multiple accounts.

As a Solutions Architect, what solution would you recommend?

**ตัวเลือก:**
- [ ] Use Amazon Macie to scan for vulnerabilities and unintended network exposure. Refactor the web application to be less susceptible to SQL injection attacks based on the security assessment. Utilize the AWS Audit Manager to reuse the security assessment across all AWS accounts.
- [x] Use AWS WAF and set up a managed rule to block request patterns associated with the exploitation of SQL databases, like SQL injection attacks. Associate it with the Application Load Balancer. Integrate AWS WAF with AWS Firewall Manager to reuse the rules across all the AWS accounts.
- [ ] Use AWS Network Firewall to filter web vulnerabilities and brute force attacks using stateful rule groups across all Application Load Balancers on all AWS accounts. Refactor the web application to be less susceptible to SQL injection attacks based on the security assessment.
- [ ] Use Amazon GuardDuty and set up a managed rule to block request patterns associated with the exploitation of SQL databases, like SQL injection attacks. Associate it with the Application Load Balancer and utilize the AWS Security Hub service to reuse the managed rules across all the AWS accounts

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทใช้ **Application Load Balancer (ALB)** นำหน้าแอปพลิเคชันเว็บ ปรากฏว่าโดนแฮกเกอร์โจมตีด้วยท่าคลาสสิคคือ ทิ่มคำสั่งทำลายฐานข้อมูลผ่านช่องกรอกหน้าเว็บ **(SQL Injection)** อย่างหนักหน่วง แถมปัญหานี้ยังลามไปถึงแอปเว็บตัวอื่นๆ ใน "บัญชี AWS บัญชีอื่นของบริษัท (multiple accounts)" ด้วย
โจทย์ต้องการวิธีแก้ปัญหาแบบ **"ทันด่วน (Immediate solution)"** เพื่อบล็อก SQL Injection และต้องเป็นวิธีกดสั่งการครั้งเดียวแล้วบังคับแผ่ครอบคลุมข้ามบัญชีได้เลย

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดการโจมตีระดับหน้าเว็บ เช่น **`SQL injection`, `Cross-Site Scripting (XSS)`** หรือการโจมตีที่เข้ามาทางฝั่งเบราว์เซอร์ = ตัวบล็อกหลักของ AWS มีตัวเดียวเท่านั้นคือ **`AWS WAF`** (Web Application Firewall) 
- ทริคที่ 2: เจอคำว่าต้องควบคุมระบบรักษาความปลอดภัยข้ามร้อยตึกพันบัญชีพร้อมกัน **`across multiple accounts`** = ผู้บัญชาการทหารสูงสุดด้านนี้คือ **`AWS Firewall Manager`** เท่านั้น! ดังนั้นต้องหาช้อยส์ที่จับคู่ท่าไม้ตาย WAF + Firewall Manager 
- ทริคที่ 3: **ตัดช้อยส์ที่แนะให้ `Refactor the web application` (ให้พนักงานไปนั่งแก้โค้ดหลังบ้านเอาเอง)** ทิ้งไปเลย! เพราะโจทย์บอกซะดังลั่นว่าต้องการแบนการโจมตีแบบเร่งด่วนจี๋ (Immediate solution) ถ้ามัวแต่ให้โปรแกรมเมอร์ใช้เวลาสองเดือนรื้อโค้ดเขียนเว็บใหม่ บริษัทคงล้มละลายไปก่อนแล้ว! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS WAF and set up a managed rule to block request patterns associated with the exploitation of SQL databases, like SQL injection attacks. Associate it with the Application Load Balancer. Integrate AWS WAF with AWS Firewall Manager to reuse the rules across all the AWS accounts.**
- **ทำไมถึงถูก:** ไร้ที่ติ! 1. ใช้ **AWS WAF** ซึ่งเป็นเกราะกันแฮกเกอร์หน้าเว็บแบบตรงจุดที่สุด โดยเปิดใช้กฎอัตโนมัติ (Managed Rule) ของ AWS บล็อก SQL Injection แขวนไว้ที่โหลดบาลานเซอร์ (ALB) 2. แก้ปัญหาเรื่องหลายบัญชี โดยการอัญเชิญ **AWS Firewall Manager** มากดตั้งค่าแจกกติกาของ WAF นี้ทีเดียว กระจายกางร่มปกป้องบัญชี AWS ย่อยๆ ทุกแอคเคาท์รวดเดียวจบ ตรงความต้องการรวดเร็วถึงใจ

❌ **[ผิด] Use Amazon Macie to scan for vulnerabilities and unintended network exposure. Refactor the web application to be less susceptible to SQL injection attacks based on the security assessment. Utilize the AWS Audit Manager to reuse the security assessment across all AWS accounts.**
- **ทำไมถึงผิด:** เอางานไปให้ทนายทำแทนหมอ! Macie ทำหน้าที่หลักแค่มองหาและปกป้องข้อมูลส่วนตัว/อ่อนไหว (เช่น เลขบัตรประชาชน) ที่แอบซุกซ่อนอยู่ในถัง Amazon S3 เท่านั้น ไม่ได้มีเรดาร์ไว้ดักจับการยิงปืน SQL Injection จากหน้าเว็บเลย แถมการแนะนำให้ไป "รื้อเขียนแอปใหม่ (Refactor)" ช่างขัดแย้งกับคำร้องว่าต้องการยาปฏิชีวนะแก้ด่วน

❌ **[ผิด] Use AWS Network Firewall to filter web vulnerabilities and brute force attacks using stateful rule groups across all Application Load Balancers on all AWS accounts. Refactor the web application to be less susceptible to SQL injection attacks based on the security assessment.**
- **ทำไมถึงผิด:** ผิดจุด! Network Firewall ปกป้องเส้นประธานระดับเน็ตเวิร์กองค์กร (คล้าย รปภ. ค้นรถเข้าหมู่บ้าน) แต่ตัว SQL injection มันแฝงมากับแบบฟอร์มบนเว็บไซต์ซึ่งทำงานในระดับ Layer 7 (ลึกระดับแอปพลิเคชัน) Network Firewall ตรวจจับภาษามนุษย์กรอกฟอร์มไม่ได้เฉียบแหลมเท่า WAF และยังหน้าด้านแนะนำให้ไปรื้อแอปรออีกเช่นเคย

❌ **[ผิด] Use Amazon GuardDuty and set up a managed rule to block request patterns associated with the exploitation of SQL databases, like SQL injection attacks...**
- **ทำไมถึงผิด:** GuardDuty แม้เป็นผู้ตรวจการณ์ยอดเยี่ยมแต่ทำได้ "เพียงแค่เฝ้าระวังดมกลิ่นและส่งข้อความแจ้งเตือน (Threat Detection)" เท่านั้น มันไม่ใช่ไม้หน้าสามที่มีอำนาจไปเตะสกัดการโจมตีบล็อกแพ็คเกจเตะใครได้ด้วยตัวเองอย่างที่ WAF ทำได้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS WAF (Web Application Firewall)**: บอดี้การ์ดสวมแว่นดำคุมหน้าเว็บ ทำหน้าที่กรองคำร้องขอ (HTTP Web requests) ที่วิ่งเข้ามาผ่าน CloudFront, API Gateway, หรือ ALB เช่น สั่งแบน IP รัสเซียทะลวงเว็บ หรือเปิดสคริปต์บล็อกคนพิมพ์แทรก SQL Injection เข้ามาทางช่อง Password เป็นต้น
- **AWS Firewall Manager**: แม่ทัพใหญ่สั่งการ เมื่อคุณมีสิบๆ บัญชี AWS และขี้เกียจล็อกอินเข้าไปตั้งค่า WAF , Network Firewall ทีละบัญชี คุณก็มาใช้ Manager ตัวนี้กดปังเดียว แผ่รัศมีกางบาเรีย Firewall กฎเดียวกันไปคุ้มครองได้ครบทุกบัญชีย่อยๆ ทันที
- **Amazon Macie**: สายสืบแม็คไกเวอร์ ใช้ Machine Learning คุ้ยกล่องดำ (S3) เฝ้าระวังและค้นหาว่าบริษัทมีเผลอเก็บข้อมูลส่วนตัว (PII) เช่น พาสปอร์ต เลขเครดิต โยนทิ้งไว้ในระบบแบบลับๆ โจ่งแจ้งเกินไปไหม 

---
---

## 📌 คำถามที่ 22
**โจทย์:**
A global IT company with offices around the world has multiple AWS accounts. To improve efficiency and drive costs down, the Chief Information Officer (CIO) wants to set up a solution that centrally manages their AWS resources. This will allow them to procure AWS resources centrally and share resources such as AWS Transit Gateways, AWS License Manager configurations, or Amazon Route 53 Resolver rules across their various accounts.

As the Solutions Architect, which combination of options should you implement in this scenario? (Select TWO.)

**ตัวเลือก:**
- [x] Use the AWS Resource Access Manager (RAM) service to easily and securely share your resources with your AWS accounts.
- [ ] Use AWS Control Tower to easily and securely share your resources with your AWS accounts.
- [ ] Use the AWS Identity and Access Management service to set up cross-account access that will easily and securely share your resources with your AWS accounts.
- [x] Consolidate all of the company's accounts using AWS Organizations.
- [ ] Consolidate all of the company's accounts using AWS ParallelCluster.

---
### 🎯 โจทย์ต้องการอะไร?
ซีไอโอ (CIO) บริษัทระดับโลกมีหลายบัญชี AWS มีคำสั่งให้ทำการรวบยอด**บริหารจัดการทรัพยากรทุกบัญชีไว้ที่ศูนย์กลาง (Centrally manages)** เพื่อตัดทอนต้นทุนโดยการแบ่งปัน "แชร์ใช้ทรัพยากรส่วนกลางด้วยกัน" ข้ามบัญชี (เช่น ให้ทุกบัญชีมาใช้ Transit Gateways หรือตัวตั้งค่า License ตัวเดียวกัน จะได้ไม่ต้องจ่ายเงินซื้อซ้ำซ้อน)
โจทย์ถามว่าจะใช้คู่บริการผสมคอมโบไหนเพื่อผสานระบบแชร์ระดับองค์กรนี้เข้าด้วยกัน *(ตอบ 2 ตัวเลือก)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดคำว่า **`share resources`... `across accounts`** (แบ่งปันของข้ามบัญชี) โดยเฉพาะถ้าพ่วงคำหน้าตาอย่าง Transit Gateway หรือ License Manager เข้ามาด้วย = พระเอกที่จะทำงานแชร์ของนอกหน้าต่างบัญชีแบบนี้ได้คือ **`AWS RAM (Resource Access Manager)`** 
- ทริคที่ 2: การจะลากเอาบัญชีต่างๆ ทั่วโลกมารวมศูนย์จ่ายเงินที่เดียวหรือบริหารจากรัฐบาลกลาง **`Consolidate all of the company's accounts`** = ราชาครอบจักรวาลคือ **`AWS Organizations`** 
- ทริคที่ 3: **ตัด `AWS ParallelCluster` ทิ้งทันที** มันเป็นชื่อเครื่องมือร็อกเก็ตซายส์สำหรับจับกลุ่มเซิร์ฟเวอร์ยิงวิเคราะห์ข้อมูลบิ๊กดาต้า (HPC) ไม่เกี่ยวแม้แต่ปลายเล็บกับการบริหารบัญชีรวบยอดบริษัท!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Consolidate all of the company's accounts using AWS Organizations.**
- **ทำไมถึงถูก:** กติกาแรกเริ่มที่จะสามารถแชร์ของเจ๋งๆ ข้ามบัญชีอย่างปลอดภัยและรวมศูนย์ได้ คุณจำเป็นต้องจับทุกบัญชีย่อยมารวมศูนย์ภายใต้ต้นไม้ใหญ่อย่าง **AWS Organizations** เพื่อเปิดการจัดการร่วมศูนย์กลาง (Centralized management) เบิกจ่ายรวมบิลลงถุงรวบยอดลดต้นทุน 

✅ **[ถูกต้อง] Use the AWS Resource Access Manager (RAM) service to easily and securely share your resources with your AWS accounts.**
- **ทำไมถึงถูก:** **AWS RAM** คือระบบสุดเทพที่ทำงานคู่กับ AWS Organizations อย่างแนบเนียน ให้คุณตีบวกรวมสร้างทรัพยากร (เช่น จุดเกาะกลาง Transit Gateway) ไว้เพียงชิ้นเดียวในบัญชีกองกลาง แล้วค่อยกดยืนยันแจกตั๋วอนุญาต "เชิญมาใช้ร่วมกันนะ" ไปยังทุกบัญชีย่อยได้อย่างง่ายดาย จบกระบวนการตรงโจทย์เป๊ะไม่ต้องควักกระเป๋าเสียค่าเปิดเกตเวย์ซ้ำซ้อนให้เปลือง

❌ **[ผิด] Use the AWS Identity and Access Management service to set up cross-account access that will easily and securely share your resources with your AWS accounts.**
- **ทำไมถึงผิด:** เอาขวานไปหั่นผัก! IAM เป็นเรื่องของการสวมทะลวงสิทธิบุคคล (Role) เข้าไปยังบัญชีอื่นเพื่อ "จัดการหรือทำแอคชั่น" ซึ่งมันอาจทำได้จริง แต่มันวุ่นวายสร้างความรำคาญใจระดับสิบกะโหลกยามมีหลายสิบบัญชี แถมมันไม่ได้ถูกสร้างมาไว้เพื่อเป็นหน้าเว็บกลางสำหรับ "กดส่ง Share Resource ทางกายภาพ" อย่างระบบของ RAM

❌ **[ผิด] Use AWS Control Tower to easily and securely share your resources with your AWS accounts.**
- **ทำไมถึงผิด:** Control Tower มีหน้าที่เป็น "สถาปนิกร่างพิมพ์เขียวตั้งต้น" สำหรับบริษัทที่เพิ่งสมัคร AWS ใหม่แบบมาตรฐานเป๊ะๆ (กดคลิกเดียวได้ครบทั้งเปิด Organization, ขุดระบบ Log หลังบ้าน, กฎกันแฮกเบื้องต้น) แต่มันไม่ได้ทำหน้าที่หยิบเอาทรัพยากรอะไรมาระบุแชร์ส่งไปมาระหว่างบัญชีอย่างบริการ RAM

❌ **[ผิด] Consolidate all of the company's accounts using AWS ParallelCluster.**
- **ทำไมถึงผิด:** คนละแกแล็กซี่! ParallelCluster มีไว้สำหรับจัดทัพทำคลัสเตอร์จูนเซิร์ฟเวอร์รบมวลชน (High Performance Computing - HPC) เพื่อคำนวณสูตรวิจัยโมเลกุลเคมีฟิสิกส์ชั้นสูง ไม่ใช่เพื่อเอามาจัดการระบบตารางบัญชีโอนเงิน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Organizations**: บริการบริหารก้อนบัญชี AWS หลายร้อยใบของบริษัท ช่วยให้คุณจัดกลุ่มแผนกต่างๆ บังคับบัญชารวมยอด ลดค่าเสื่อมและชำระบิลผ่านบัตรเครดิตใบเดียว (Consolidated Billing) แถมสั่งอายัดนโยบายห้ามแผนก A ใช้บริการเกินกว่าที่กำหนดได้อีก
- **AWS RAM (Resource Access Manager)**: ผู้จัดการหอพัก ช่วยให้บัญชีที่มีทรัพยากรทรงคุณค่า (เช่น เครือข่าย Transit Gateway, ทรัพยากรเน็ตเวิร์ก) สามารถ "แชร์สิทธิ" ให้บัญชี AWS เครื่องอื่นในก๊วนเดียวกันหยิบใช้ได้ดื้อๆ เหมือนเปิด AirDrop หากัน

---
---

## 📌 คำถามที่ 23
**โจทย์:**
A popular social media website uses a Amazon CloudFront web distribution to serve static content to millions of users around the globe. Recently, the website has received a number of complaints about long login times. Additionally, there are instances where users encounter HTTP 504 errors. The manager has instructed the team to significantly reduce login time and further optimize the system.

Which of the following options should be used together to set up a cost-effective solution that improves the application's performance? (Select TWO.)

**ตัวเลือก:**
- [ ] Deploy your application to multiple AWS regions to accommodate your users around the world. Set up a Route 53 record with latency routing policy to route incoming traffic to the region that provides the best latency to the user.
- [x] Customize the content that the CloudFront web distribution delivers to your users using Lambda@Edge, which allows your AWS Lambda functions to execute the authentication process in AWS locations closer to the users.
- [x] Implement an origin failover by creating an origin group that includes two origins. Assign one as the primary origin and the other as secondary, which enables CloudFront to automatically switch to if the primary origin encounters specific HTTP status code failure responses.
- [ ] Establish multiple Amazon VPCs in different AWS regions and configure a transit VPC to interconnect all of your resources. To handle the requests faster, set up AWS Lambda functions in each region with the AWS Serverless Application Model (SAM) service.
- [ ] Configure your origin to add a Cache-Control max-age directive to your objects, and specify the longest practical value for max-age to increase the cache hit ratio of your CloudFront distribution.

---
### 🎯 โจทย์ต้องการอะไร?
โซเชียลมีเดียมีผู้ใช้งานเพียบ กระทำการส่งรูป/คลิปไปรอบโลกใช้บริการกระจายสัญญาณ **Amazon CloudFront** นำหน้า แต่ดันโดนลูกค้าบ่นกระหน่ำ 2 ประเด็นคือ: 
1. **ล็อกอินโคตรร่าช้า (Long login times)** 
2. เวลาใช้งานมักทะลึ่งเจอหน้าพัง **HTTP 504 Errors (Gateway Timeout)** 
แอดมินสั่งให้ซ่อม 2 ปัญหานี้ให้ดีขึ้น และต้องคำนึงถึง "การเซฟงบต้นทุนให้คุ้มประหยัดที่สุด (Cost-effective) " ด้วย *(ตอบ 2 ตัวเลือก)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: แก้ปัญหาล็อกอินช้า เพราะปกติคนล็อกอินจากทั่วโลก ต้องวิ่งตรวจสอบพาสเวิร์ดมาถึงเซิร์ฟเวอร์กลางที่อเมริกาที่เดียว = วิธีแก้ยอดฮิตที่ประหยัดและเนียนสุดคือ **ส่งสคริปต์ตรวจพาสเวิร์ดไปให้ตัวกระจายสัญญาณ CloudFront (Edge) ทำงานแทนซะเลย!** โดยการเรียกขุนพล **`Lambda@Edge`** มาจัดการ
- ทริคที่ 2: แก้ปัญหาเซิร์ฟเวอร์โหลดจนพังกระแทกหน้า 504 Errors (หน้าเซิร์ฟต้นทางรับไม่ไหว) = ท่าตั้งรับของ CloudFront คือฟีเจอร์กันตายที่เรียกว่า **`origin failover`** (จับคู่เซิร์ฟเวอร์หลัก-สำรองให้มัน ถ้าตัวหลักพ่น Error แจก 504 ปุ๊บ ให้สลับไปจกข้อมูลตัวรองมาแปะบังหน้าแก้ไขสถานการณ์ทันทีดุจเวทมนต์)
- ทริคที่ 3: **ตัดช้อยส์พวกกางเซิร์ฟเวอร์ร้อยหน้าจอ `Deploy to multiple AWS regions` ทิ้งไป** เพราะถึงแม้จะทำให้เร็วขึ้นจริง แต่การเอาเซิร์ฟเวอร์จริงไปจำลองตั้งฐานทัพ 5 ทวีปทั่วโลก มันขัดต่อกติกาคำสั่งที่ว่า **`cost-effective`** (ต้องเซฟงบ) ซึ่งมันใช้เงินมหาศาลสุดขีด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Customize the content that the CloudFront web distribution delivers to your users using Lambda@Edge, which allows your AWS Lambda functions to execute the authentication process in AWS locations closer to the users.**
- **ทำไมถึงถูก:** เอาโค้ดป๊อปอัพตัวสอบรหัส (Authentication) ไปฝังไว้ที่จุดรับแขกกึ่งกลางทั่วโลกของ Amazon ด้วยระบบ **Lambda@Edge** การล็อกอินช้าเพราะคนญี่ปุ่นต้องคอยส่งสัญญาณผ่านทะเลกลับมาเช็คผ่านเซิร์ฟแม่ที่บอสตันตลอดเวลา ถ้ามีตัวตรวจสอบรหัส (Lambda) ไปยืนอยู่หน้าหมู่บ้านใกล้ๆ ญี่ปุ่น งานล็อกอินก็เสร็จรวดเร็วว่องไวทันที ซึ่งแก้ปัญหาที่ 1 ได้ยอดเยี่ยมและประหยัดจั๊บ

✅ **[ถูกต้อง] Implement an origin failover by creating an origin group that includes two origins. Assign one as the primary origin and the other as secondary, which enables CloudFront to automatically switch to if the primary origin encounters specific HTTP status code failure responses.**
- **ทำไมถึงถูก:** เพื่อแก้ปัญหาที่ 2 คือเว็บพังล่มรหัส 504 เราจัดการด้วยการเปิดฟีเจอร์คู่หู (Origin failover) มีประธานกับรองประธาน ถ้าเซิร์ฟเวอร์ประธานฐานหลักทำงานอ้วกแตกพังล่ม (เจอ HTTP 5xx) ตัว CloudFront จะรู้ตัวไวดังสายฟ้าและไม่โยนหน้า Error 504 ออกไปประจานลูกค้า แต่ตัวมันจะแฉลบแอบดึงข้อมูลจากเซิร์ฟเวอร์ตัวรองขึ้นมากลบเกลื่อนแทนทันควัน 

❌ **[ผิด] Deploy your application to multiple AWS regions to accommodate your users around the world. Set up a Route 53 record with latency routing policy to route incoming traffic to the region that provides the best latency to the user.**
- **ทำไมถึงผิด:** ใช่! การทำแบบนี้ไวปานสายฟ้าแลบ แต่ทว่ากฎทองของคำถามข้อนี้คือเราต้องหาทางออกที่ "เซฟค่าใช้จ่าย (Cost-effective)" การเปย์แหลกเช่าตัวเซิร์ฟเวอร์ยักษ์กางฐานทัพไปทุกภูมิภาครอบโลกนั้นสิ้นเปลืองงบจนบานเบอะ แถมต้องใช้พนักงานดูแลซ้ำซ้อน 

❌ **[ผิด] Establish multiple Amazon VPCs in different AWS regions and configure a transit VPC to interconnect all of your resources. To handle the requests faster, set up AWS Lambda functions in each region with the AWS Serverless Application Model (SAM) service.**
- **ทำไมถึงผิด:** กระจายทัพ VPC วงอวกาศไปรอบทิศ แล้วผสานสายใยเกาะเข้าหากัน เหตุผลสุดคลาสสิคคือ "ราคากระฉูด" การต่อ Transit VPC ไขว้เครือข่ายโลกเป็นอะไรที่น่าขนลุกด้านค่าใช้จ่ายและสุดปวดหัว สู้กระดิกนิ้วใช้ Lambda Edge แจกเบ๊ออกไปถูกและง่ายกว่าลิบลับ

❌ **[ผิด] Configure your origin to add a Cache-Control max-age directive to your objects, and specify the longest practical value for max-age...**
- **ทำไมถึงผิด:** คอนฟิกให้เซิร์ฟพยายามลากอายุไฟล์ความทรงจำให้อยู่ได้นานๆ แต่อย่าลืม! กระบวนการเปรียบเทียบรหัสผ่าน (Login / Authentication) เป็นข้อมูลไดนามิกสุดยอดความลับส่วนตัวที่ทำ Cache จำลองเก็บไว้ล้อหน้าใครไม่ได้! คุณเอา Cache ไปเพิ่มความเร็วมั่วซั่วเพื่อช่วยระบบตรงจุดนี้ไม่ได้!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Lambda@Edge**: เวิร์คเกอร์ยอดมนุษย์ฟายอิ้งดัทช์แมน ปกติ Lambda จะรันอยู่ตำแหน่ง Region กลางบ้านเรา แต้ไอ้นี่คือการก๊อปปี้เอาโค้ด Lambda เหวี่ยงปลิวแจกไปตามคลินิกสาขาย่อย (Edge Locations) ทั่วโลก! เพื่อให้มันทำงานทักทายกับคนเข้าเว็บในรัสเซีย อเมริกา ญี่ปุ่น ได้ใกล้ตัว เร็วที่สุด โดยไม่ต้องวิ่งกลับมาถามแม่ใหญ่
- **CloudFront Origin Failover**: ฟีเจอร์แวร์เฮาส์ค้ำจุนหลังบ้านของ CloudFront เราสามารถตั้งแฝดตัวช่วยรับหน้าได้ เช่น ถ้าเกิดเหตุสุดวิสัยฝั่ง EC2 ต้นทางตายหยิบไฟล์ภาพดาราไม่ได้ ให้ CloudFront กระชากพวงมาลัยไปดึงรูปดาราห่วยๆ จากถัง S3 สำรองส่งมาให้คนดูกลางคันแทน 

---
---

## 📌 คำถามที่ 24
**โจทย์:**
A retail company receives raw `.csv` data files into its Amazon S3 bucket from multiple sources on an hourly basis, with an average file size of 2 GB.

An automated process must be implemented to convert these `.csv` files into the more efficient Apache Parquet format and store the converted files in another S3 bucket. Additionally, the conversion process must be automatically initiated each time a new file is uploaded into the S3 bucket.

Which of the following options must be implemented to meet these requirements with the LEAST operational overhead?

**ตัวเลือก:**
- [ ] Set up an Apache Spark job running in an Amazon EC2 instance and create an Amazon EventBridge (Amazon CloudWatch Events) rule to monitor S3 PUT events in the S3 bucket. Configure AWS Lambda to invoke the Spark job for every new .csv file added via a Function URL.
- [ ] Create an ETL (Extract, Transform, Load) job and a Data Catalog table in AWS Glue. Configure the Glue crawler to run on a schedule to check for new files in the S3 bucket every hour and convert them to Parquet format.
- [x] Utilize an AWS Glue extract, transform, and load (ETL) job to process and convert the .csv files to Apache Parquet format and then store the output files into the target S3 bucket. Set up an S3 Event Notification to track every S3 PUT event and invoke the ETL job in Glue through Amazon SQS.
- [ ] Use an AWS Lambda function triggered by an S3 PUT event to convert the .csv files to Parquet format. Use the AWS Transfer Family with SFTP service to move the output files to the target S3 bucket.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทรับไฟล์นามสกุล `.csv` แบบดิบๆ ไฟล์เบิ้มๆ ไฟล์ละ 2 GB ส่งมาเทกองไว้ที่ถัง **Amazon S3** ทุกๆ ชั่วโมง 
โจทย์ต้องการสร้างเครื่องออโต้เพื่อ **แปลงไฟล์ `.csv` กลายร่างโครงสร้างขั้นเทพเป็นนามสกุล "Apache Parquet"** แล้วจับย้ายออกไปเก็บยัง S3 ถังใหม่ 
กระบวนการต้องสตาร์ท "ทันทีที่มีไฟล์ตกใส่พื้นถัง" (automatically initiated each time a new file is uploaded) โดยต้องเป็นวิธีที่ประหยัดแรงงานคนคุมเครื่องที่สุด (LEAST operational overhead)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์มีไฟล์ก้อนยักษ์เข้า S3 ต้องการจับแปรรูปหน้าตาไฟล์ (เปลี่ยน CSV เป็น Parquet หรือวิเคราะห์ขยะ ETL) = ผู้รับเหมาก่อสร้างระดับหัวหน้าคุมงานด้านนี้ของ AWS คือ **`AWS Glue`**! หาข้อที่มีหมอนี่ไว้ก่อน
- ทริคที่ 2: งานอยากให้ระบบออโต้สตาร์ททำงาน "ทันทีที่มีไฟล์ใหม่หล่นทับ" = เครื่องส่งสัญญาณดีดลูกแก้วที่ตรงไปตรงมาที่สุดคือ **`S3 Event Notification`** เอาไว้เตะเรียกปลุกใครให้ตื่นมาทำหน้าที่
- ทริคที่ 3: **ทำไมไม่ใช้ `AWS Lambda` เพียวๆ แปลงไฟล์ล่ะ?** คำตอบ: เพราะไฟล์ใหญ่ตั้ง 2 GB ตัว Lambda เป็นเครื่องแสกนตัวกะเปี๊ยก มันมีขีดจำกัดหน่วยความจำและเวลา (รันได้ไม่เกิน 15 นาที) ขืนสั่งมันแปลงร่างไฟล์ยักษ์ 2 กิ๊ก มันคงค้างเติ่งสำลัก Timeout ตายซะก่อน! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Utilize an AWS Glue extract, transform, and load (ETL) job to process and convert the .csv files to Apache Parquet format and then store the output files into the target S3 bucket. Set up an S3 Event Notification to track every S3 PUT event and invoke the ETL job in Glue through Amazon SQS.**
- **ทำไมถึงถูก:** ผสมสูตรโคตรลงตัว หยิบ **AWS Glue** (มือปืนรับจ้างด้านแปรสภาพข้อมูล Serverless ETL) ออกมารับงานแปรรูปเปลี่ยน CSV ทื่อๆ เป็นข้อมูลคอลัมน์ Parquet การจุดระเบิดสั่งงานจะใช้ของวิเศษพื้นบ้าน (S3 Event Notifications) ถ่ายทอดงานส่งไปเรียกผ่าย Amazon SQS ปลุกให้ Glue มารุมทึ้งแปลงไฟล์ ทุกอย่างทำจบโดยที่คุณไม่ต้องมีบุคลากรไปตั้งระบบ OS เซิร์ฟเวอร์ดูแลจุกจิกเลยสักกระผีกเดียว เหนื่อยน้อยสุดๆ 

❌ **[ผิด] Create an ETL (Extract, Transform, Load) job and a Data Catalog table in AWS Glue. Configure the Glue crawler to run on a schedule to check for new files in the S3 bucket every hour and convert them to Parquet format.**
- **ทำไมถึงผิด:** ใช่เครื่องมือ Glue เหมือนกัน แต่ตกม้าตายตอนจบ! แทนที่จะสั่งให้ตื่น "ทันทีที่ไฟล์ตกพื้น" ดันไปตั้งค่าให้พนักงานคลาน (Crawler) นั่งเซตเวลาปลุกมาคอยด้อมๆมองๆ ดมหาถังขยะว่ามีไฟล์เข้าทุกชั่วโมงแทน (Schedule) ขัดกับโจทย์ที่สั่งว่าต้องลุยทันทีเมื่อไฟล์วาง

❌ **[ผิด] Use an AWS Lambda function triggered by an S3 PUT event to convert the .csv files to Parquet format. Use the AWS Transfer Family with SFTP service to move the output files to the target S3 bucket.**
- **ทำไมถึงผิด:** การส่งต่อตัวแปรสภาพเป็น Lambda ซึ่งเสมือนหุ่นกระป๋องปัญญานิ่มเมื่อเทียบงานบิ๊กดาต้า มาสู้กับไฟล์มหึมา 2GB คือความบรรลัยที่รอมัน "Timeout เสียเวลาดับกระทันหัน" แน่นอน แถมพล็อตแนะให้พึ่งพาการส่งของไปให้ SFTP (Transfer Family) ซึ่งบ้าบอมาก เพราะ S3 มันโยนไฟล์ข้ามถัง S3 โดยตรงได้เลยไม่ต้องง้อใคร

❌ **[ผิด] Set up an Apache Spark job running in an Amazon EC2 instance and create an Amazon EventBridge (Amazon CloudWatch Events) rule to monitor S3 PUT events in the S3 bucket. Configure AWS Lambda to invoke the Spark job for every new .csv file added via a Function URL.**
- **ทำไมถึงผิด:** เหนื่อยเกิ้น! มันขัดต่อพระราชประสงค์ที่อยากให้ "ดูแลยุ่งกับเครื่องระบบให้น้อยที่สุด (Least operational overhead)" ถ้าดันทุรังไปก่อตึก EC2 เพื่อลงระบบ Apache Spark คุณก็ต้องนั่งเฝ้าจอ ถลุงอัปเดตแพทช์ แบก OS แก้ไฟดับ ไม่รู้จบ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Glue**: ยอดหมอผีแห่งวงการจกข้อมูล (ETL: Extract, Transform, Load) หน้าที่ของมันคือ กวาดข้อมูลดิบเน่าๆ มาล้างให้สะอาด ดัดแปลงคอลัมน์ เปลี่ยนสกุล (CSV เป็น JSON/Parquet) แล้วยัดกลับเข้าโกดังให้เป็นระเบียบสวยงามโดยไร้พยาน เซิร์ฟเวอร์ไม่ต้องคุมให้เหนื่อยใจ (Serverless) 
- **Apache Parquet**: ตระกูลไฟล์ข้อมูลชั้นสูง เป็นการเก็บค่าแบบผ่าแนวตั้ง (Columnar Format) ยอดฮิตในหมู่งานคิวมหาศาล ทำให้บอทยกไปค้นหาประมวลผลต่อได้เร็วกว่าเท็กไฟล์กะโหลกกะลาอย่าง CSV มากๆ

---
---

## 📌 คำถามที่ 25
**โจทย์:**
A Docker application, which is running on an Amazon ECS cluster behind a load balancer, is heavily using Amazon DynamoDB. The application requires improved database performance by distributing the workload evenly and utilizing the provisioned throughput efficiently.

Which of the following should be implemented for the DynamoDB table?

**ตัวเลือก:**
- [ ] Reduce the number of partition keys in the DynamoDB table.
- [ ] Avoid using a composite primary key, which is composed of a partition key and a sort key.
- [x] Use partition keys with high-cardinality attributes, which have a large number of distinct values for each item.
- [ ] Use partition keys with low-cardinality attributes, which have a few number of distinct values for each item.

---
### 🎯 โจทย์ต้องการอะไร?
แอปพลิเคชันตู้คอนเทนเนอร์ใช้งานฐานข้อมูลระดับหัวหน้าอย่าง **Amazon DynamoDB** อย่างหนักหน่วง โลกทั้งใบของแอปพลิเคชันตอนนี้ต้องการเข็นประสิทธิภาพระบบให้สุด โดย **"คาดหวังการทะลวงปั๊มยอดให้แรงงานขุดข้อมูล (Read/Write workload) ไปกวาดกระจายๆ กระแทกบอร์ดอย่างเท่าเทียมและสวยงาม"** จะได้ใช้ความเร็วทั้งหมดที่ซื้อไว้ได้คุ้มค่า
โจทย์เจาะจงลงมาที่ตาราง **DynamoDB** ว่าเราควรตั้งค่ายุคทองอย่างไร เพื่อให้มันกระจายเรี่ยวแรงได้เท่าๆกัน

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: สถานการณ์บ่นเรื่อง "DynamoDB กระจายงานไม่แฟร์ ทราฟฟิกกระจุกบอมบ์จนพัง" คำตอบที่แก้ปัญหาโลกแตกของ NoSQL นี้ได้คือ ให้ปั้นคีย์ตัวท็อปขึ้นมาค้นหาตารางด้วยท่า **`Use partition keys with high-cardinality attributes`** (เปลี่ยนกุญแจให้มีความหลากหลายสูงยิ่งกว่าดาวล้านดวง)
- ทริคที่ 2: ระวังด้านตรงข้ามอย่างการ **`Use partition keys with low-cardinality...`** (ใช้ของที่เดาง่ายหรือซ้ำกันเยอะๆ) = นี่แหละตัวการที่ทำให้เซิร์ฟพังฐานข้อมูลบึ้มเพราะคนมารุมเข้าซอยเดียวกัน กระจกทะลุ! ตัดช้อยส์นี่ทิ้งทันที
- ทริคที่ 3: **ตัดช้อยส์ที่บอกให้หลบหนีไม่รันคู่ผสม `Avoid using a composite primary key`** เพราะในโลก Dynamo การจับคีย์หลักตบซ้อนคีย์รองจัดว่าเป็นการทำคอมโบที่ดีเลิศ ไม่มีใครแนะนำให้หลีกเลี่ยงของเทพแบบนั้นหรอก 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use partition keys with high-cardinality attributes, which have a large number of distinct values for each item.**
- **ทำไมถึงถูก:** กฎเหล็กของ DynamoDB! การจะเกลี่ยโหลดงานไปทั่วๆ คุณต้องสร้างกุญแจฐานตารางแรก (Partition Key) ด้วยคำที่มี **สเปกตรัมความหลากหลายสูงๆ ไร้ขีดจำกัด ไม่ซ้ำใครเลย (High-cardinality)** เช่น เลือกดึงใช้ โหมดหมายเลขประชาชน, อีเมลแอดเดรส, รหัสลูกค้า UUID พอข้อมูลมันเอกคลูซีฟไม่ซ้ำใครเลย คำร้องก็ปลิวพลัดพรากแผ่กระจายตกไปยังก้อนกล่องแบ่งคัดแยกย่อย (Physicial Partitions) ด้านหลังพวงมาลัยได้หลายๆ ก้อนกระจายเท่าๆกัน ยิงเต็มสูบไม่กระแทกคอขวด 

❌ **[ผิด] Use partition keys with low-cardinality attributes, which have a few number of distinct values for each item.**
- **ทำไมถึงผิด:** ตรงข้ามกับคำว่าดี! คือการออกแบบตารางโดยหาคีย์หลักสุดห่วยจำเจซ้ำซาก (Low-cardinality) เช่น เลือกกรุ๊ปสิทธิการผู้ชาย/ผู้หญิง, หรือเลือกปีเกิด 2024 ถ้าคอลัมน์นี้ถูกหยิบมาค้นหาบ่อยๆ แก็งค์ทราฟฟิกรุมยิงถล่มจะไปแห่จมกระจุกเข้าลิฟต์หาเซิร์ฟเวอร์คอลัมน์เพศชายอย่างเดียว เกิดอาการคอขวด "Hot Partition" 1 เซิร์ฟตูดไฟลุกรวนระเบิดพัง อีก 10 เซิร์ฟว่างนอนกระดิกเท้า สิ้นเปลืองแบนด์วิธชิบหาย

❌ **[ผิด] Reduce the number of partition keys in the DynamoDB table.**
- **ทำไมถึงผิด:** พยายามยุบมีตารางจับให้น้อยที่สุด การพยายามจำกัดกุญแจการเข้าช่องทางตีตาราง ให้อัดท่อเล็ก ยิ่งรวบ ยิ่งร้อนรน เกิดคอขวด ฐานข้อมูลจมคุกทนแรงมวลชนไม่ไหว เกิดทราฟฟิกโดนเตะ (Throttled) หงายหลังแน่นอน 

❌ **[ผิด] Avoid using a composite primary key, which is composed of a partition key and a sort key.**
- **ทำไมถึงผิด:** บอกปัดให้ห้ามใช้ระบบคีย์คู่ผสม (มี Partition Key จับคู่กับ Sort Key) คู่ผสมคือของขวัญพระเจ้ามีไว้ช่วยหั่นสัดส่วนแยกเรียงซอยให้กว้างและมีทางจัดฟอร์จูนทิศทางเอาตัวริอดได้ดีขึ้น การชี้เป้าว่า "หลีกเลี่ยงไม่ใช้" นี่แหละ เป็นตรรกะที่ป่วยในการบริหารฐานข้อมูลยามกางปีก (Scaling)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **DynamoDB Partition Key (PK)**: เหมือนป้ายระบุภาคเขตคลังสินค้า กุญแจชิ้นแรกแห่งพระเจ้าที่บังคับเอาไว้แจกจ่ายโยนบรรทัดข้อมูลของคุณไปบรรจุใส่ฮาร์ดดิสก์หลังบ้าน (Partition) ตัวไหนของ AWS ถ้าคุณกระจายของเก่ง (PK แตกต่างกันไป) รถบรรทุกก็จะวิ่งไปหาหลายๆ คลัง ช่วยให้ตารางอ่านโหลดดึงข้อมูลเร็วและเซิร์ฟไม่อ้วก
- **Cardinality (ความหลากหลายของค่า)**: สิ่งกำหนดความรอด!
  - **High Cardinality**: ค่าที่โอกาศซ้ำน้อยโคตรๆ (เช่น เลขบัตรประชาชน, รหัสพัสดุ) = ถือเป็น PK ที่เจ๋งมาก เพราะมันกระจัดกระจายข้อมูลได้ดี 
  - **Low Cardinality**: ค่าที่ซ้ำไปมาแค่จำใจ (เช่น สถานะ ชาย/หญิง, ใช่/ไม่ใช่) = หายนะ! เพราะข้อมูล 50% จะไปอุดตันตีกันอยู่ที่บล็อกเซิร์ฟเวอร์บล็อกเดียวเสมอ (Hot Key)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 6: ข้อ 26 - 30)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 26
**โจทย์:**
A leading bank has a web application that manages highly sensitive financial data of its clients. You are setting up an Amazon EC2 instance to process this data. Only the administrative staff and the database administrators should have SSH access to the EC2 instances. In this scenario, which is the most secure way to control access to your EC2 instance?

**ตัวเลือก:**
- [x] Configure a security group for the EC2 instance and specify the IP addresses of the administrators while ensuring that all the other unnecessary ports are closed.
- [ ] Implement an IAM policy to allow only specific IAM users assigned to administrators.
- [ ] Configure the Network ACL explicitly denying access to the rest of the IP addresses and allow only the administrators.
- [ ] Set up the default IAM role for all of your EC2 instances. Let only the administrators have the proper IAM policy that will allow them to log in to the system.

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารแห่งหนึ่งมีแอปพลิเคชันจัดการข้อมูลการเงินที่มีความละเอียดอ่อนสูง รันอยู่บน **Amazon EC2** โดยมีโจทย์หลักคือต้องการเจาะจงให้ **"มีเฉพาะผู้ดูแลระบบ (Admin) และ พนักงานจัดการฐานข้อมูล (DBA)"** สองกลุ่มนี้ที่จะได้รับสิทธิ์พิเศษ "อนุญาตให้เจาะรีโมตเข้าหลังบ้านผ่าน **SSH** ได้"
ในทางเทคนิค เราควรตั้งค่าสกัดกั้นประตู (control access) ด่านนี้ด้วยวิธีไหนที่ปลอดภัยและถูกต้องที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ด **`SSH access to the EC2 instances` (การเจาะเข้าเครื่องด้วยพอร์ต 22)** + **`secure way to control access` (ควบคุมคนเข้าออก)** = ท่าไม้ตายที่เป็นธรรมชาติที่สุดของคนเล่น EC2 คือหันไปพึ่งพายามหน้าประตูที่ชื่อว่า **`security group`** โดยจำกัดระบุ IP ต้นทางของแอดมินให้ชัดเจน
- ทริคที่ 2: **ตัดช้อยส์ `Network ACL (NACL)` ทิ้ง** เพราะ NACL มันเหมือนป้อมยามหน้าหมู่บ้าน (Subnet) ปกติเราไม่ใช้ NACL มานั่งไล่แบน IP คนทั้งโลกเพื่อป้องกัน EC2 เครื่องเดียว เพราะมันยุ่งยาก (NACL เป็น Stateless) แถมอาจไปกระทบเซิร์ฟเวอร์เพื่อนบ้านในวงเดียวกันตายหมู่ได้
- ทริคที่ 3: **ตัดช้อยส์พวก `IAM policy / IAM role` ทิ้งไปให้หมด!** เพราะโลกของ IAM บน AWS มีไว้ควบคุมว่าใครมีสิทธิ์ "คลิกปุ่มบนหน้าเว็บ AWS" (เช่น สิทธิ์กดสร้าง EC2, สิทธิ์ลบ S3) แต่มัน **"ไม่เคยมีสิทธิ์เป็นกุญแจไขเข้าสู่ระดับระบบปฏิบัติการ (OS-level)"** ผ่าน SSH แต่อย่างใด 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure a security group for the EC2 instance and specify the IP addresses of the administrators while ensuring that all the other unnecessary ports are closed.**
- **ทำไมถึงถูก:** **Security Group** ทำหน้าที่เป็นไฟร์วอลล์ส่วนบุคคลของเครื่อง EC2 ที่มีคุณสมบัติ "ปฏิเสธทุกคนที่ไม่ได้รับเชิญโดยปริยาย (Default Deny)" การตั้งกติกาเจาะจงให้แค่เลข IP ต้นทางของบริษัท (ออฟฟิศของแอดมิน) อนุมัติผ่านเข้ามาทางพอร์ต SSH ได้เท่านั้น ถือว่าเป็นวิธีจัดการระดับพื้นฐานที่แข็งแกร่งและเป็นสากล (Best practice) ที่สุดบน AWS

❌ **[ผิด] Configure the Network ACL explicitly denying access to the rest of the IP addresses and allow only the administrators.**
- **ทำไมถึงผิด:** แม้ในทฤษฎีจะทำได้ แต่มันยุ่งยากระดับข้ามภพเดือดร้อนชาวบ้าน Network ACL ควบคุมถนนใหญ่ระดับ Subnet ซึ่งอาจจะมีเครื่อง EC2 ทำสไลด์โชว์ หรือเว็บแอปอื่นๆ ซ่อนอยู่ในนั้น การที่คุณเขียนกฎบ้าเลือดว่า "ห้าม IP ทั่วโลกเหยียบเข้ามา (explicitly denying) ยกเว้น IP แอดมิน" ไปลงที่ยามหน้าหมู่บ้าน แปลว่าแอปของเพื่อนบ้านในวงเดียวกันจะโดนตัดเน็ตคนใช้เข้าไม่ได้พินาศไปด้วยทันที

❌ **[ผิด] Implement an IAM policy to allow only specific IAM users assigned to administrators.**
- **ทำไมถึงผิด:** ทำความเข้าใจใหม่ด่วน! การเข้าใช้ SSH ถึง "ตัวตับไตไส้พุงเครื่องเซิร์ฟเวอร์" ไม่ใช่โลกของบัตรประชาชนสวรรค์อย่าง IAM โลก IAM ใช้ระบุแค่ว่านาย A อนุญาตให้พนักงานเตะปลั๊กปิดเปิดเครื่อง EC2 ทิ้งได้ไหม แต่มันไม่มีอำนาจเป็นบัตรทองสอดรหัสสแกนผ่านพอร์ต SSH 22 เข้าไปดูคำสั่ง Linux ภายในเครื่องเลย 

❌ **[ผิด] Set up the default IAM role for all of your EC2 instances. Let only the administrators have the proper IAM policy that will allow them to log in to the system.**
- **ทำไมถึงผิด:** ผิดด้วยเหตุผลเดียวกับข้อบน IAM Role เป็นเพียงหมวกวิเศษที่สวมให้ "ตัวเครื่อง EC2" เพื่อให้มันกลายร่างไปทักทายกับบริการอื่น (เช่น เครื่องนี้ดึงรูปลง S3 ได้นะ) มันไม่ได้มีไว้สวมให้ "Admin ถือมาล็อกอิน" เพื่อแหกประตูกระบบปฏิบัติการ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Security Group (SG)**: บอดี้การ์ดยืนเฝ้าหน้าประตูห้อง (Instance-level) คอยตรวจตั๋ว Inbound/Outbound ท่าไม้ตายของ SG คือมันใจดี "จำหน้าคนได้ (Stateful)" ถ้าอนุญาตให้รีเควสเข้ามาตอนขาเข้า ขาออกก็ปล่อยกลับบ้านฉลุยตามธรรมชาติ 
- **Network ACL (NACL)**: รปภ. คุมประตูรั้วหน้าหมู่บ้าน (Subnet-level) เป็น รปภ. สมองเสื่อม (Stateless) ที่เคร่งครัดมาก ขาเข้ามาถ้าอนุญาตแล้ว ตอนขาออกถ้าไม่เขียนกฎทิ้งไว้ชัดเจนแกก็จับขังบล็อกไว้ไม่ให้ออก!
- **IAM Policy/Role**: ระบบจัดการตัวตนระดับคลาวด์ อนุญาตให้ขยับตั้งค่าเซอร์วิสต่างๆ ของ AWS ได้ แต่ไปแหยมระดับ OS อย่างการมุด SSH หรือ RDP เข้าเซิร์ฟเวอร์โดยตรงไม่ได้ (เว้นแต่จะใช้ผ่านระบบของ Systems Manager Session Manager (SSM) ซึ่งไม่ได้พูดถึงในข้อนี้)

---
---

## 📌 คำถามที่ 27
**โจทย์:**
An Enterprise customer with a strict corporate security policy relies on an AWS Site-to-Site VPN to connect its on-premises data center to its Amazon VPC. A Solutions Architect must implement a high availability infrastructure for the company’s internal network to prevent dropped connections against IPsec VPN outages.

Which of the following setup will satisfy the company’s requirement?

**ตัวเลือก:**
- [x] Configure a second Site-to-Site VPN connection and Customer Gateway device.
- [ ] Connect the 2 Customer Gateway devices on the Customer network to a single Customer Gateway associated with your VPN connection.
- [ ] Associate two Customer Gateway devices on your Virtual Private Gateway.
- [ ] Set up an AWS Direct Connect connection.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกค้าระดับองค์กรใหญ่มุ่งเน้นเรื่องนโยบายความปลอดภัยแบบเข้มงวด ปัจจุบันใช้งานอุโมงค์เข้ารหัส **AWS Site-to-Site VPN** ที่เชื่อมโยงความรักระหว่างเซิร์ฟเวอร์สำนักงานกับดินแดน **Amazon VPC** 
สถาปนิกระบบได้รับใบสั่งให้ **อัปเกรดระบบเพื่อสู้การล่ม (High Availability)** ห้ามเน็ตกระตุกขาดผึง หรืออุโมงค์หลุด (prevent dropped connections against IPsec VPN outages) โดยเด็ดขาด 
โจทย์หาอุปกรณ์ติดตั้งที่จะทำให้เส้นทางอุโมงค์รอดเสมอด้วยความมั่นใจ 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: คำว่า **`AWS Site-to-Site VPN`** คู่กับ **`high availability` (ระบบไม่มอดดับทนทานสูง)** = คำตอบที่ตรงปกที่สุดของการเซ็นอัปเกรด HA บน VPN ก็คือการทำเบิ้ล 2 ทางขนานกันไปเลย นั่นคือมองหาช้อยส์ที่บอกให้สร้าง **`a second Site-to-Site VPN connection`** พ่วงคู่ **`Customer Gateway device`** เพิ่มเป็นตัวที่สอง
- ทริคที่ 2: กฎข้อนึงของ AWS VPN คือ ระบบมันจะแจกอุโมงค์ให้คุณ 2 ท่อ (Tunnels) ต่อ 1 VPN Connection *ที่ฝั่ง AWS* มาให้ล่วงหน้าอยู่แล้วครับ จุดบอดมอดดับทั้งหมดจึงมักตกที่ "ฝั่งตัวรับสัญญาณหน้าออฟฟิศคุณ (Customer Gateway)" ถ้าเจ้านั่นพัง ไฟดับ ปลั๊กหลุด จบเห่! การลงทุนซื้อเร้าเตอร์อีกตัวแล้วเดินสายออฟฟิศก๊อปปี้เส้นที่ 2 ขึ้นมาขนานกัน จึงเป็นสูตรกู้ชีวิตระดับสากล 
- ทริคที่ 3: **ทำไมไม่ตอบสายตรง `AWS Direct Connect` ล่ะ? โคตรเสถียรเลยนะ!** = โดนโจทย์หลอกเรื่อง **`strict corporate security policy`** ครับ! สายลากไฟเบอร์ระดับองค์กร Direct Connect ไม่มีการปกปิดเข้ารหัสข้อมูล (Not encrypted by default) แต่องค์กรบีบเราว่าต้องอยู่ในระบบ IPsec VPN ดั้งเดิม การหนีไปเดินสายเน็ตใหม่ที่ใช้เวลาสร้างเป็นเดือนๆ แถมหลุดกรอบความปลอดภัยเดิม จึงหลงทางไปไกล

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure a second Site-to-Site VPN connection and Customer Gateway device.**
- **ทำไมถึงถูก:** เพราะระบบ Site-to-Site ของ AWS มีข้าราชการสองท่อประจำฝั่งเมฆอเมซอนรอรับหน้าอยู่แล้ว แต่จุดเปราะบางมักจะเกิดที่ฝั่ง "บริษัทหน้าบ้านนายจ้าง (Customer side)" ที่มักจะมีเร้าเตอร์รับโจทย์เพียงเครื่องเดียว ตู้ไฟระเบิดทีเดียวพนักงานมองหน้ากันเลิ่กลั่ก การลงทุนเบิ้ลอุปกรณ์ (Customer Gateway เครื่องที่ 2) และกดยืนยันใบสั่งสร้างอุโมงค์ (VPN connection เส้นที่ 2) ขนานกัน จะรับประกันเรื่องความถึกทนฮาร์ดคอร์ หากทางนี้เดี้ยง ระบบจะโยกซ้ายตบแฉลบหาเครื่องที่ 2 พลิกสถานการณ์ใช้งานต่อได้ไม่สะดุด

❌ **[ผิด] Connect the 2 Customer Gateway devices on the Customer network to a single Customer Gateway associated with your VPN connection.**
- **ทำไมถึงผิด:** เอาเร้าเตอร์ของบริษัท 2 เครื่องไปรุมมุดคอขวดแช่ที่หน้าผา "Gateway รับรองอันเดียวของ AWS" ... ในระบบ AWS นั้น "Customer Gateway 1 อัน" บนระบบ AWS ถือเป็น "ตัวแทนเงาสะท้อนอุปกรณ์แข็งกระด้าง 1 เครื่องที่อยู่บนโลกความจริง" อย่างเด็ดขาด มันไม่สามารถเอา 2 เครื่องบริษัทมารุมผูกรวมเป็น Customer Gateway นามธรรมเดียวบนระบบได้ (หลักการทำงานผิดรุนแรง)

❌ **[ผิด] Associate two Customer Gateway devices on your Virtual Private Gateway.**
- **ทำไมถึงผิด:** การต่อเร้าเตอร์ลูกค้า 2 ตัว ไปชนตึกประตูเมือง Virtual Private Gateway มันคือเศษเสี้ยวสถาปัตยกรรมที่หายไป! ข้ามขั้นตอนตรงที่ "คุณต้องกดสั่งสร้างตั๋วเปิดเส้นทาง AWS VPN ชุดใหม่ซะก่อน (Configure a second VPN connection)" ถ้าเอาแต่เตรียมตัวรับ (Customer gateway) ไปผูกกับประตูเมือง แต่ไม่ยอมเปิดถนนอุโมงค์เชื่อม มันก็เป็นแค่เร้าเตอร์เปิดตากลมที่ออฟฟิศเท่านั้น (Incomplete action ทำงานลอยๆ ไม่จบงาน)

❌ **[ผิด] Set up an AWS Direct Connect connection.**
- **ทำไมถึงผิด:** หลงเข้าป่า! บริษัทมีนโยบายสุดเขี้ยวลากดินเรื่องรหัสความปลอดภัย (Strict corporate security) จนทอดทิ้งประโยคกุมหัวใจ **IPsec VPN outages** ไม่ได้! โซลูชั่นลากสายเส้นผมไฟเบอร์ Direct Connect เป็นสื่อกลางลากตรงแต่มันโปร่งใสส่งสารดิบๆ ไร้ข้ารหัสแอบแฝง เอามาแก้โจทย์บริษัทหวาดระแวงภัยไม่ได้ และไม่ได้ช่วยปะยางอุโมงค์ IPsec เดิมที่มีอยู่เลยด้วย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Site-to-Site VPN**: ท่ออุโมงค์เข้ารหัสสุดโหด (IPsec) ที่เจาะมุดใต้ดินอินเทอร์เน็ตสาธารณะ เพื่อเชื่อมเซิร์ฟเวอร์บ้านพักออฟฟิศ (On-premise) ให้ทะลุเข้ามาในบ้านพักตากอากาศบนคลาวด์ AWS (VPC) ได้อย่างปลอดภัยไร้คนแอบล้วง 
  - **Customer Gateway (CGW)**: ตัวตนจำลองใน AWS ที่เอาไว้จดพิกัด IP ว่า "เร้าเตอร์สังกะสีหน้าบริษัทคุณ" ตัวไหนที่จะเป็นตัวรับอุโมงค์รหัสนี้
  - **Virtual Private Gateway (VGW)**: หรือเปรียบดั่ง "รปภ. คฤหาสน์ฝั่ง AWS" ที่จะคอยยืนอ้าแขนรอรับท่อ VPN ที่เจาะผ่านทะลุเข้ามาหา VPC ของคุณ

---
---

## 📌 คำถามที่ 28
**โจทย์:**
A media company stores its media assets with varying access patterns out of multiple AWS regions. Due to a new internal directive, you are assigned to evaluate your current AWS architecture and find a way to reduce your current cloud costs.

In this scenario, how should you architect your cloud storage solution to reduce your costs?

**ตัวเลือก:**
- [x] Consolidate your media assets in a single S3 bucket and use Amazon S3 Intelligent-Tiering.
- [ ] Transfer the media assets in Amazon Glacier and provision an AWS Snowball Edge device to download the objects out of the Amazon S3 buckets.
- [ ] Consolidate your media assets in a single S3 bucket and configure an S3 Lifecycle rule to transition your files to Amazon S3 Standard-Infrequent Access.
- [ ] Setup an S3 Storage Class Analysis via Amazon Athena to output a detailed report regarding your media assets and then subsequently transition the files manually to the most cost-effective storage class.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทค่ายสื่อ (Media company) เก็บกักคอนเทนต์ภาพและเสียงกระจายกันเป็นเบี้ยหัวแตกตามฐานหลายภูมิภาค โดยคอนเทนต์เหล่านี้ **"มีจังหวะการถูกดึงดูสลับมั่วซั่ว คาดเดาไม่ได้ (varying access patterns)"** คือบางคลิปถูกดูบ่อยเป็นล้าน บางคลิปก็ดองเป็นปี วันดีคืนดีเจ้านายมีคำสั่งนโยบายบริษัทให้หาทาง "ลดค่าเปิดแอร์ค่าเช่าโกดังคลาวด์ลง (reduce your costs) ซะ"
เราควรปรับทัพการเก็บไฟล์โยกไปใส่ตู้ไหนดี ให้ตอบโจทย์คลิปที่มีลักษณะคนดูฉาบฉวยเดาจุดเด่นไม่ได้? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดไฟล์เจ้ากรรมมีพฤติกรรมถูกจับเปิดดูแบบเข้าถึงตามอารมณ์ คาดเดาหาวัฏจักรของมันไม่ได้ **`varying access patterns`, `unknown access patterns`** = คำตอบคือการพึ่งความฉลาดของ AI ที่ชื่อว่า **`Amazon S3 Intelligent-Tiering`** เสมอ! 
- ทริคที่ 2: ระวังช้อยส์ **`S3 Standard-Infrequent Access (S3 Standard-IA)`** ข้อโง่คลาสสิคที่ชอบหลอกคนไปตาย S3-IA คือโกดังหลังบ้านที่มีกติกาว่า "ห้ามเข้ามาล้วงของบ่อยนะ ไม่งั้นฉันจะเก็บเงินค่าตบหัวเบิกของแพงลิบ (Retrieval fee)" ซึ่งมันขัดกับสภาพอารมณ์คนดูโจทย์ข้อนี้เป๊ะๆ เพราะคลิปมันดันมีวันที่จะสุ่มโดนดูมหาศาล (varying) จึงใช้ไม่ได้
- ทริคที่ 3: **ตัด `Amazon Glacier` ทิ้งให้ไว** Glacier คือการส่งไฟล์ลงไปดองแช่แข็งในไซบีเรีย เหมาะกับของที่ตายแล้วไม่คิดจะใช้อีก (เช่น เก็บใบเสร็จ 10 ปีเตรียมโดนรัฐบาลตรวจ) มันแช่แข็งจนถ้าลูกค้ารอโหลดคลิปดู เค้าต้องคอย 1-5 ชั่วโมงกว่าก้อนน้ำแข็งจะละลายพ่นคลิปให้ดูได้

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Consolidate your media assets in a single S3 bucket and use Amazon S3 Intelligent-Tiering.**
- **ทำไมถึงถูก:** เหมาสมบัติทุกชิ้นโยนตุ๊บรวมกองในคลัง S3 อันเดียว แล้วจ้างลูกกระจ๊อกปัญญาประดิษฐ์ทำบัญชีฉลาดล้ำอย่าง **Amazon S3 Intelligent-Tiering** คอยเฝ้าสอดส่องให้ ลูกน้องคนนี้จะคอยจับตาดูว่าคลิปเรื่องไหน 30 วันแล้วคนไม่แห่ไปกดดูเลย มันจะเตะแฝงไฟล์นั้นย้ายหลุดลงลิ้นชักลึกขึ้นที่ค่าเช่าถูกลง (ห้องเย็น IA) แต่ถ้าบังเอิญมีดราม่าคนกลับมาแห่ฮิตดูอีกครั้ง มันก็ชิงจังหวะมูฟดึงกลับมาห้อง Standard หลักแผ่พลังต้อนรับเต็มสูบ ที่เด็ดสุดคือ "คุณไม่โดนถลกหนังศีรษะจ่ายค่าธรรมเนียมเบิกของ (No retrieval fees)" ซักบาทเดียว! เหมาะเหม็งเป็นที่สุดกับโจทย์คนดูเอาแน่เอานอนไม่ได้

❌ **[ผิด] Consolidate your media assets in a single S3 bucket and configure an S3 Lifecycle rule to transition your files to Amazon S3 Standard-Infrequent Access.**
- **ทำไมถึงผิด:** การตั้งนาฬิกาตายตัว (Lifecycle rule) สั่งหุ่นยนต์ปัญญาเบานำพาทุกไฟล์เก่าเกินลดชั้นเป็นห้องดองรำลึก "S3 Standard-IA" หมด ถือเป็นกับดักหน้าบากงั่งๆ! กฎมัจจุราชห้อง S3-IA คือถ้ามีคนมือบอนแห่เข้าไปสุ่มหาฮิตดูคลิปเก่าในยุคนั้น คุณจะโดนเพชฌฆาตกระซวก "ค่าปรับค่าเบิกโหลดกะละมัง (Retrieval Fee)" บานตะไทรจนหนี้ท่วมหัว ทำให้แทนที่จะเซฟงบประหยัดต้นทุนตามใบสั่ง กลับเจ๊งยับพินาศแพงกว่าปล่อยมันนอนพังอยู่ Standard แบบตอนแรกเสียอีก!

❌ **[ผิด] Setup an S3 Storage Class Analysis via Amazon Athena to output a detailed report regarding your media assets and then subsequently transition the files manually to the most cost-effective storage class.**
- **ทำไมถึงผิด:** เอาวิศวกรไปรับจ้างแบกปูนชัดๆ! ให้ระบบเอาแว่น S3 Storage Class Analysis ล้วงจับทำรีพอร์ตตีแผ่ผลลัพธ์ผ่านโปรแกรมตักตารางวิเคราะห์ Athena ถือเป็นความดีงามนะ แต่ตกม้าตายตอนจบที่แนะนำให้ "เอาแรงงานมนุษย์พนักงานค่อยๆมานั่งสไลด์เม้าส์ทยอยย้ายเอาเองทีละไฟล์ (transition manually) ไปห้องถูกๆ" นอกจากจะหัวฟูเสียเวลาบ้าบอ สถิติก็แห้งเก่าช้าไม่ทันกิน วันรุ่งขึ้นคลิปอาจระเบิดฮิตจนพนักงานต้องมาตามปูพรมย้ายไฟล์กลับคืนกันให้วุ่น เป็นกรรมวิธีคนป่าที่ไม่ได้ช่วยเรื่องต้นทุนการปฏิบัติงานเลย

❌ **[ผิด] Transfer the media assets in Amazon Glacier and provision an AWS Snowball Edge device to download the objects out of the Amazon S3 buckets.**
- **ทำไมถึงผิด:** แนะนำแบบเหมือนหมอเมายา ย้ายของยัดส่งไปแช่ฟรีซยุคน้ำแข็ง (Glacier) แล้วแถมบ้าจี้สั่งลูกเรือขับหุ่นกระป๋องออฟไลน์ฮาร์ดไดรฟ์อย่าง (AWS Snowball Edge) อัดของขับรถส่งปณ.ขนออกจากตึกอเมซอน ... เป็นความเข้าใจที่หลุดมิติ S3 Glacier เก็บสุสานก็จริง แต่การอัดใส่ตู้ Snowball เอากลับไปเก็บออฟฟิศคือคุณต้องการแค่จะ "ย้ายบ้านหนีคลาวด์บริษัท AWS" ไม่ใช่ทำตัวเป็นผู้ให้คำปรึกษาลดราคาค่าเช่าของระบบตามโจทย์สั่ง!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon S3 Intelligent-Tiering**: บริการหรูๆ ของคนมีตัง (จ่ายค่าธรรมเนียมนิดหน่อยให้มัน) อัจฉริยภาพคือมันจะจัดสรรระบบ 4 ชั้น (Frequent, Infrequent, Archive, Deep Archive) โยกของย้ายห้องหนีค่าเช่าแพงๆ ให้เราเองแบบออโต้ ตามจังหวะว่าของถูกเปิดดูใช้งานบ่อยแค่ไหน (ดีเลิศเวลาบริษัทคุณเดาอนาคตข้อมูลไม่ได้ว่าชาวบ้านจะทำอะไร)
- **S3 Standard-IA (Infrequent Access)**: ห้องสำหรับเก็บไฟล์ "นานน้านจะหยิบขึ้นมาดูสักที" ค่าเช่าพื้นที่ถูกลงกว่าห้องปกติเกือบครึ่ง แต่ AWS ทำแสบด้วยการตั้งกฎว่า "ถ้าคุณเอาของออกจากห้องข้านะ ข้าคิดหน้าคุณ GB ละ 0.01 ดอล ทะลวงตับ!" ถ้พนักงานบริษัทเผลอไปหยิบสูบโหลดถี่ๆ ก็เตรียมตัวโบกมือลาเงินได้เลย

---
---

## 📌 คำถามที่ 29
**โจทย์:**
A popular news website receives high traffic whenever there are breaking news. Depending on the traffic, there could be thousands of users connecting to its database, which ultimately overwhelms the back-end system. Additionally, the database stores small pieces of data and there are certain instances where identical queries are repeated during a traffic spike. A Solutions Architect is mandated to alleviate the database from heavy traffic and accommodate millions of requests at a microsecond interval.

Which of the following database solutions is highly recommended for this scenario?

**ตัวเลือก:**
- [x] Amazon DynamoDB Accelerator (DAX)
- [ ] Amazon Aurora Multi-Master
- [ ] Redis on Amazon EC2
- [ ] Memcached on Amazon EC2

---
### 🎯 โจทย์ต้องการอะไร?
สำนักข่าวยอดฮิตมีมวลมหาประชาชนบุกถล่มเว็บทลักทุกครั้งที่มีข่าวจับดารา (breaking news) ฝูงซอมบี้โซเชียลจะวิ่งระดมกดโหลดอ่าน "ข้อมูลกระจุกเดียวกัน คำถามเดิมๆ หน้าตาซ้ำซาก (identical queries are repeated)" เป็นจำนวนนับพันนับหมื่น ทำเอาฐานข้อมูลรับไม่ไหวเซิร์ฟเวอร์หลังบ้านระเบิดอ้วกแตก 
สถาปนิกระบบได้รับธงลงมาเพื่อปกป้องแบ่งเบาภาระฐานข้อมูล (alleviate the DB) และที่น่ากลัวคือเรียกร้องความเร็วฉิวตอบสนองระดับ **"เศษเสี้ยวไมโครวินาที (Microsecond interval)"** และต้องทนแรงกระแทกจากคำร้องขอนับล้านจึ้กได้ 
โจทย์แนะให้เลือกอุปกรณ์ลดแรงชนฐานข้อมูลในรูปแบบที่ดีที่สุด

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดคำว่าตอบสนองอภิมหาเร็วทะลุแสงระดับ **`microsecond interval`** + เป็นการดึงคำสั่งฐานข้อมูลหน้าตาซ้ำเดิมกะโหลกกะลารัวๆ **`identical queries are repeated`** = พระเอกขี่ม้าขาวหน้าประตูมีเพียงบริการที่ชื่อว่า **`DAX (DynamoDB Accelerator)`** เท่านั้น (อุปกรณ์จดจำคำตอบอัตโนมัติ Cache ของ DynamoDB)
- ทริคที่ 2: **ทำไมไม่ตอบตระกูล Aurora แบบแจกจ่ายล่ะ `Aurora Multi-Master`** = เพราะ Aurora เป็นระบบ Relational Database แบบหรูหราอลังการที่เก่งรอบด้าน แต่ความเก่งของตัวมันยังสามารถรีดเค้นฝีเท้าออกมาได้เต็มที่อยู่ที่ระดับ "MilliSecond" (มิลลิวินาที) เท่านั้น มันไม่ได้เกิดมาทำหน้าที่จดจำและคลายซากตอดกระเด็นระดับ "Microsecond (เล็กกว่า Millisecond พันเท่า)" แบบ In-memory cache ได้!
- ทริคที่ 3: **ตัดช้อยส์ที่ต้องปั้นมือเองอย่าง `Redis / Memcached on Amazon EC2` ทิ้งไป!** ในโลกข้อสอบ AWS ทุกบริการที่มีคำว่า "on Amazon EC2" (ทำลงเครื่องเซิร์ฟเวอร์เอาเองสิ) ล้วนมักจะเป็นคำตอบที่ผิดเสมอ เพราะคุณเป็นสถาปนิกคลาวด์ คุณต้องเลือกระบบปรุงสำเร็จ Fully Managed ของ AWS ไม่ใช่ไปกางอ่างละลายปุ๋ยนั่งปวดหัวดูแลเครื่องเหล็กเอาเองจนแก่ตาย 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon DynamoDB Accelerator (DAX)**
- **ทำไมถึงถูก:** ไร้ที่ติ! DAX คือกระดองเต่าอัปเกรดความเร็วแสง (In-memory Caching เฉพาะกิจ) ประทับร่างกางหน้า Amazon DynamoDB ทรงพลังในศาสตร์คุมตาราง เมื่อคีย์เวิร์ดคือ "รวดเร็วระดับ Microsecond" ไอร่อนแมนเดียวที่คู่ควรดึงเอาคำตอบไปฉายไฟฉายสไลด์ตอดแจกให้พวกชอบกดรีเฟซโหลดข่าวเดิมๆ ซ้ำซกนับล้านคำขอได้อย่างอยู่หมัด โดยไม่ต้องรบกวนหลังบ้าน (DynamoDB) ให้บาดเจ็บสักนิดเดียว

❌ **[ผิด] Memcached on Amazon EC2**
- **ทำไมถึงผิด:** ใช่! Memcached เป็นระบบ Cache in-memory ขับพ่นออโต้ได้เร็วปรี๊ดตามสเป๊ก แต่ว่าการที่คุณงกเอาไปตั้งแคแคมป์รันโปรแกรมดื้อๆ บนรถบรรทุก Amazon EC2 เอง (Self-managed) คุณจะต้องพกพาราเซตามอลมานั่งคอยหมุนพวงมาลัยขยายเซิร์ฟเวอร์เวลามันระเบิด จัดการเครื่องพัดเป่าความร้อนแก้พังแก้เน็ตเวิร์กเองหมด ซึ่งโซลูชั่นกากๆทำมือแบบนี้ ไม่ใช่โจทย์ที่ AWS อยากให้คุณภูมิใจตอบนำเสนอให้ลูกค้า (Highly Recommended Solution)

❌ **[ผิด] Redis on Amazon EC2**
- **ทำไมถึงผิด:** เหตุผลแบนแต๊ดแต๋ลงหลุมศพเดียวกับ Memcached ข้างต้น ถ้าระดับสถาปนิกปั้นแต่งโซลูชั่นทำมือบนก้อนเหล็ก EC2 แบบนี้ คงถูกทีมงานตีมือหักโทษฐานที่หลงลืมไม่หลบไปใช้ระบบอัตโนมัติลูกรักสำเร็จรูปอย่าง Amazon ElastiCache for Redis ซึ่งทำลอนระบบซัพพอร์ตอิมพอร์ตแบคอัปสเกลให้อัตโนมัติไว้รอกินนิ่มกว่าเยอะ

❌ **[ผิด] Amazon Aurora Multi-Master**
- **ทำไมถึงผิด:** รันฐานข้อมูล Aurora โดยเปิดโหมดขุนพลนายพลดาวกระจาย (Multi-master) ให้เขียนลงหลายเครื่องพร้อมกัน โหมดนี้โคตรเท่ในฐานะผู้นำของการเปิดช่องทางสาดบักบัสเตอร์กระหน่ำยิงข้อมูลเข้าตัวตึก (Write requests) จากหลายหัวเมืองได้เพอร์เฟค แต่ว่าในมิติความเร็วสูงสุด มันยังติดอยู่ในกำแพงสปีดหลัก "มิลลิวินาที" ไม่ได้ทะลุปลดล็อกลิมิตไปถึง "ไมโครวินาที" ตามเป้ากระสุนโจทย์ข้อนี้เรียกร้องได้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **DynamoDB Accelerator (DAX)**: สหายคู่ใจของฐานข้อมูล NoSQL - DynamoDB ที่พุ่งประกบแนบสนิทอยู่ด้านหน้า เสมือนเลคเชอร์จดโพยที่มีสปีดอ่านแรงที่สุด หากเว็บคุณกำลังมีเทศกาลเทกระหน่ำ Flash Sale แล้วคนแห่ระดมกดขอดูตารางราคายางลบชิ้นเดียวซ้ำเป็นล้านครั้ง DAX จะทำหน้าที่ควักรูปยางลบปาแจกชาวบ้านคืนกลับไปเลยโดยไม่ปล่อยตัวกระจ๊อกหลุดมาเคาะตังค์รบกวนตารางของ DynamoDB หลักสักนิด
- **ElastiCache (Redis/Memcached)**: คลังข้อมูลลูกเมียน้อยคล้าย DAX แต่มีความเปิดกว้างกว่า มันเป็นบริการ Caching ที่เอาไปใช้ประกบแอบคู่กับฐานข้อมูล SQL คลาสสิคอย่าง Amazon RDS หรือ Aurora หรือตอดข้อมูลชั่วคราวทิ้งขว้างของแอปก็ได้ โดย Amazon จะจัดแจงลงแอป ปูเตียงคอยมอนิเตอร์เซิร์ฟเวอร์ให้คุณอย่างสวยหรู

---
---

## 📌 คำถามที่ 30
**โจทย์:**
You have a 5 GB `.exe` file that needs to be permanently available in S3 for downloading. There is a frequent and consistent demand for this file throughout the day. It has been predicted that it will continue modifying the file as needed due to security patch updates.

In this scenario, which is the most suitable object storage tier to host this file?

**ตัวเลือก:**
- [x] S3 Standard
- [ ] S3 Standard-Infrequent Access (S3 Standard-IA)
- [ ] Amazon S3 One Zone-IA
- [ ] Amazon Glacier

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีโปรแกรมไฟล์นามสกุล `.exe` ไซส์บิ๊กขนาด 5 GB จำเป็นต้องสิงสถิตโผล่ให้ดาวน์โหลดบน **Amazon S3** "ตลอดกาลชีพ (permanently available)" โดยมีชะตากรรมว่า ผู้คนจะแห่เข้ามาจิกคลิกสูบโหลดดึงไฟล์นี้ไปใช้ระเบิดระเบ้อ (Frequent and consistent demand) ประจำทุกวี่ทุกวัน 
แถมอีกเด้งนึงคือไฟล์เจ้ากรรมนี้จะต้อง "โดนอัดแพทช์ความปลอดภัยทับๆ ซ้ำๆ (continue modifying) เปลี่ยนของตลอดเวลา" ตามฤดูกาลด้วย
โจทย์ต้องการหาห้องเก็บของ S3 แบบไหนให้ราคาตรงกับทรงชีวิตของมันที่สุด 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ชีวิตคนเราสั้นนัก ถ้าเห็นคีย์เวิร์ดไฟล์ชะตากรรมสุดซวยที่ต้องโดนดึงล้วงโหลดอย่าง **`frequent and consistent demand` (ถูกใช้งานบ่อยและต่อเนื่องตลอดทั้งวัน)** = กดตัวคลาสสิคกึ่งกลางอมตะที่สุดคือ **`S3 Standard`** เท่านั้น! ไม่ต้องหนีไปชั้นที่ถูกกว่า เพราะคุณจะเจอลูกน้องของมันรุมกินโต๊ะค่าใช้จ่ายจนย่อยยับ
- ทริคที่ 2: ระวังลูกล่อ **`S3 Standard-Infrequent Access (S3 Standard-IA)`** หรือที่มีคำว่า **`-IA`** ห้อยท้าย คือห้อง "อย่ามายุ่งกับกูบ่อยๆ" มันให้ค่าเช่าพักถูกจริง แต่มีกฎกติกาห้ามนำไฟล์มาอัปโหลดทับสลัดแก้ไขของซ้ำไปมา (modifying) ถือเป็นสัญญาทาสที่คุณควรหนีเมื่อไฟล์บังคับว่าต้องอัปเดตอัดแพทช์ทับเรื่อยๆ
- ทริคที่ 3: **ตัด `Amazon Glacier` ทิ้งสิรออะไร!** ชั้นบรรยากาศกลาเซียร์เป็นหลุมฝังศพ เอาของลงไปฝังน้ำแข็งได้ค่าเช่าถูกโคตร แต่ถ้าจะกดดาวน์โหลดสักครั้ง คุณควักเวลารอจนหลับ 3-5 ชั่วโมง แถมเสียค่าขุดศพแพงหูฉี่ มันคือของไว้สำหรับ Audit โบราณๆ ไม่ใช่ไว้แจกจ่ายแขกโหลดของเล่น 5 กิ๊กตลอดวัน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] S3 Standard**
- **ทำไมถึงถูก:** เถรตรงที่สุด ถังห้องโถงระดับเบสิคมาตรฐานปกติ (S3 Standard tier) กว้างขวาง ทนทานถึกบ้าระห่ำ จุดเด่นสวรรค์ของ S3 Standard คือมันเหมาะกับสถานการณ์ "Frequent Access (คนต้องใช้ล้วงของจับเปิดดูบ่อยรัวๆ)" เมื่อไฟล์นี้ถูกแตะต้องโหลดแหลกทั้งวัน การเลือกคลังหลักเดิมคือคำตอบที่เซฟที่สุดเพราะคุณสามารถเขียนทับ โมดิฟายแพทช์ หรือให้คนล้านคนล้วงของได้ตลอดเวลาโดยที่ **"ไม่โดนชาร์จค่าธรรมเนียมเบิกของ (No data retrieval fees)"** เหมือนห้องเช่าระดับต่ำตัวอื่น

❌ **[ผิด] S3 Standard-Infrequent Access (S3 Standard-IA)**
- **ทำไมถึงผิด:** มุดหลุมหลบภัยไม่สำเร็จ! S3 Standard-IA ปลอมตัวมาด้วยค่าเช่าพื้นที่ห้องที่ถูกกว่าก็จริง แต่... กฎปีศาจของมันเค้ามีค่าตบหัวเรียก "Retrieval charge (คิดเงินกะรัตต่อยอดทุกครั้งที่มีคนกดเบิกไฟล์)" ตามจำนวนแบนด์วิดท์ที่ถูกดึงออกไป ถ้าไฟล์ 5 GB คุณโดนดึงเป็นหมื่นรอบในหนึ่งวัน แถมแก้ไขมันอีก คุณจะพบว่าโดนเรียกเก็บค่าค่าปรับท่วมท้นมโหฬารจนบัญชีบริษัทคุณพินาศขาดทุนย่อยยับ

❌ **[ผิด] Amazon S3 One Zone-IA**
- **ทำไมถึงผิด:** ชักหน้าโดดลงเหว! ห้องเช่าเกรดต่ำลงมากว่าเดิมอีกลำดับ (ราคาถูกโฮกๆ) แต่ซ่อนเงื่อนไขนิติกรรมปีศาจเดียวกันกับ Standard-IA คือมันยังคง "ชาร์จค่าเบิกต่อGB" บานเบอะ! หนำซ้ำความเสี่ยงสูงฉิบหาย เพราะของในห้องนี้ถูกโยนทิ้งไว้ในตึก Data Center (AZ) แค่คลัสเตอร์เป้าเดียว ไม่มีแบ็คอัพตึกเพื่อนบ้านช่วย เกิดมีนกบินชนกระจกไฟดับที่นั่นปุ๊บ ไฟล์แจกโหลดชูโรงนี้ก็จะล่มดับวูบไม่รับรองลูกค้าให้หน้าแตกยับเยินไปอีก! 

❌ **[ผิด] Amazon Glacier**
- **ทำไมถึงผิด:** บรรลัยสิครับท่าน! นี่มันหลุมศพไซบีเรีย! สุสาน Glacier มีไว้เอาของที่ชาตินี้ตายไปแล้วไม่คิดจะดูและไม่อยากทำลายทิ้ง (Archive data) เข้าไปหมกฝังกลบจ่ายค่าที่แสนถูกนรกแตก ถ้ามีลูกค้าใจร้อนมาเรียกเมาส์คลิกปุ่มดาวน์โหลด .exe พนักงานคุณคงสะดุ้งสุดตัว เพราะต้องทำพิธีออกใบคำร้องส่งเรื่องคอยละลายน้ำแข็งซึ่งใช้เวลากู้นานเป็น "ชั่วโมงๆ" (ไม่มีใครทนรอโหลดไฟล์นานขนาดนั้น) จึงหมดสิทธิ์แจกให้โลกชื่นชมได้รวดเร็วทันใจตามโจทย์ 24 ชั่วโมงทั้งวันอย่างแน่นอน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon S3 (Simple Storage Service)**: ตระกูลถังใส่ของไร้ก้นของ AWS สามารถแบ่งสันปันส่วนห้องเช่าได้ดังนี้:
  - **S3 Standard**: ดีฟอลต์สุดเทพ ห้องเบสิค เก็บแฟ้มเข้าออกบ่อยแค่ไหนก็ได้ ไม่เก็บตังค์ค่าพนักงานหยิบ เหมาะกับเว็บหลัก ไฟล์แชร์ แจกของชอปปิ้ง
  - **S3 Standard-IA**: ห้องเก็บถูก แต่อย่าเข้ามาเบิกบ่อย มีค่าตบหัว (ใช้เก็บแบ็คอัพรายสัปดาห์ ของที่ปีนึงใช้ทีนึง)
  - **S3 One Zone-IA**: ห้องเก็บระดับต่ำ ถูกสุดใน IA หายช่างมัน ไม่กระจายตึก แบ็คอัพพังได้
  - **S3 Glacier Flexible Retrieval / Deep Archive**: สุสานน้ำแข็ง ถูกที่สุดในโลกนี้ แต่กว่าจะเรียกออกมาใช้ที รอเหงือกแห้งเป็นชั่วโมง/วัน เหมาะกับไฟล์วิดีโอวงจรปิด 10 ปี เอกสารภาษีส่งรัฐ

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 7: ข้อ 31 - 35)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 31
**โจทย์:**
A Forex trading platform, which frequently processes and stores global financial data every minute, is hosted in an on-premises data center and uses an Oracle database. Due to a recent cooling problem in its data center, the company urgently needs to migrate its infrastructure to AWS to improve the performance of its applications. As the Solutions Architect, the responsibility is to ensure that the database is properly migrated and remains available in case of database server failure in the future, following AWS Prescriptive Guidance for database migration and high availability.

Which combination of actions would meet the requirement? (Select TWO.)

**ตัวเลือก:**
- [x] Create an Oracle database in Amazon RDS with Multi-AZ deployments.
- [ ] Convert the database schema using the AWS Schema Conversion Tool.
- [ ] Migrate the Oracle database to a non-cluster Amazon Aurora with a single instance.
- [x] Migrate the Oracle database to AWS using the AWS Database Migration Service
- [ ] Launch an Oracle database instance in Amazon RDS with Recovery Manager (RMAN) enabled.

---
### 🎯 โจทย์ต้องการอะไร?
แพลตฟอร์มเทรดค่าเงิน (Forex) ใช้ฐานข้อมูล **Oracle** วางเครื่องอยู่ในบริษัท (On-premises) เจอปัญหาแอร์เสียจนห้องเซิร์ฟเวอร์ร้อนจัด บริษัทต้องการหนีตาย "ย้ายฐานข้อมูลขึ้น AWS แบบด่วนจี๋ (Migrate)" และที่สำคัญเมื่อย้ายมาแล้ว ระบบจะต้อง "ทำงานทนทานไม่มีคำว่าล่ม เมื่อมีเซิร์ฟเวอร์ใดพังในอนาคต (high availability / database server failure)" ด้วย
โจทย์ต้องการ **2 ขั้นตอนคอมโบ** ที่จะทำหน้าที่ 1. จัดการวิธีย้ายข้อมูล และ 2. ตั้งฐานรับข้อมูลให้รอดพ้นการล่มซ้อน 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ด "ย้ายฐานข้อมูลขึ้น AWS" **`migrate its infrastructure to AWS`** เครื่องมือพระเอกที่เกิดมาเพื่องานแบกหามข้อมูลข้ามโลกแบบนี้คือ **`AWS Database Migration Service (DMS)`** 
- ทริคที่ 2: เจอคำสาปโจทย์ที่ว่าต้องจัดวางฐานข้อมูลให้ **`remains available in case of database server failure` (รอดตายแม้เซิร์ฟเวอร์พัง)** ท่าไม้ตายอมตะของการแก้ช้อยส์ข้อนี้คือ ให้สร้างฐานข้อมูลคู่แฝด **`Multi-AZ deployments` (เปิดโหมดทำงาน 2 โซน)**
- ทริคที่ 3: **ตัดช้อยส์ `AWS Schema Conversion Tool (SCT)` ทิ้งซะ!** คนจะใช้ SCT ก็ต่อเมื่อต้องการ "เปลี่ยนศาสนาของฐานข้อมูล (Heterogeneous)" เช่น ย้ายจาก Oracle ไปซบ PostgreSQL... แต่ในข้อนี้โจทย์ให้ย้ายจาก Oracle ขึ้นดอยไปเป็นตัว Oracle เหมือนเดิม (Homogeneous) จึงไม่จำเป็นต้องใช้สิ่วมานั่งสกัดแปลงภาษาโครงสร้าง (Schema) ให้วุ่นวาย

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Oracle database in Amazon RDS with Multi-AZ deployments.**
- **ทำไมถึงถูก:** เติมเต็มเงื่อนไขข้อที่ 2 (High Availability) ได้สมบูรณ์ โดยการตั้งฐานข้อมูล **Oracle** รอรับของบนโลก **Amazon RDS** แล้วตั้งค่าหัวใจสำคัญคือ เปิดโหมดลอกคราบสำรองคู่ขนาน **(Multi-AZ Deployments)** ซึ่งเป็นการแบ่งร่างเซิร์ฟเวอร์ไปวางไว้อีกตึก (Standby) ถ้าเกิดซวยเครื่องหลักไฟดับ ตึกพัง ตัวสำรองที่อยู่อีกโซนจะยืดอกขึ้นมารับหน้าแทนโดยอัตโนมัติ (Failover) ไม่ต้องปลุกแอดมินมาแก้ดึกๆ

✅ **[ถูกต้อง] Migrate the Oracle database to AWS using the AWS Database Migration Service**
- **ทำไมถึงถูก:** เติมเต็มเงื่อนไข 1 (ย้ายข้อมูล) ได้ดีที่สุด ปล่อยคาราวานรถบรรทุกของ **AWS Database Migration Service (DMS)** ไปขนย้ายเอาข้อมูลเข้ามา DMS คือฮีโร่สายแบกที่เก่งฉกาจในการดึงข้อมูลจาก On-premise หย่อนลง RDS โดยที่แอปหน้าบ้านแทบชะงักหยุดทำงานแค่เสี้ยววินาที (Minimal downtime) แถมยังรองรับการปั๊มข้อมูล Oracle สู่ Oracle แบบไร้รอยต่อ

❌ **[ผิด] Convert the database schema using the AWS Schema Conversion Tool.**
- **ทำไมถึงผิด:** เครื่องมือ SCT เอาไว้ใช้เวลาคุณอยากย้ายค่ายฐานข้อมูล (เช่น จาก Oracle รั้วปิด ไปเปิดโลก Open Source อย่าง MySQL/PostgreSQL) คุณต้องใช้เครื่องมือนี้ช่วยแปลงคำศัพท์, Data Type, โครงสร้างตาราง แต่ในบริบทนี้เราอพยพเผ่าพันธุ์เดิมไปอยู่โลกใหม่ (Oracle ไป Oracle) จึงไม่ต้องเสียเวลาถอดรหัสอะไรทั้งนั้น ปล่อยผ่านไปได้เลย

❌ **[ผิด] Migrate the Oracle database to a non-cluster Amazon Aurora with a single instance.**
- **ทำไมถึงผิด:** ย้ายไปลง Amazon Aurora แบบฉายเดี่ยว (Single Instance) นี่คือหายนะ! ตัวเดี่ยวแปลว่าไม่มีตัวสำรองรั้งท้าย หากเกิดซวยตึกนั้นระเบิด เครื่องดับ ระบบคุณก็จะล่มแบบสมบูรณ์แบบ ผิดพฤติกรรม High Availability อย่างร้ายแรง (แถมเกร็ดความรู้: ปัจจุบัน Aurora มีแค่ร่างอวตารของ MySQL กับ PostgreSQL เท่านั้น ไม่มีเอนจิ้นรองรับ Oracle โดยตรง)

❌ **[ผิด] Launch an Oracle database instance in Amazon RDS with Recovery Manager (RMAN) enabled.**
- **ทำไมถึงผิด:** แอดมินรุ่นเก่ามักจะขัดใจ เพราะบริการ Amazon RDS ถือว่าการจัดการปัดกวาดเช็ดถูหลังบ้านเป็นเรื่องของระบบอัตโนมัติ AWS จึง **แบน** ไม่ให้ประชากรผู้ใช้เปิดเครื่องมือแบ็คอัพแบบแมนนวลของฝั่ง Oracle แท้ๆ อย่าง **Recovery Manager (RMAN)** โดยเด็ดขาด 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Database Migration Service (DMS)**: ท่อสูบข้อมูลข้ามมิติ เอาไว้ดูดข้อมูลจากฐานข้อมูลเก่า (source) ถ่ายโอนไปยังฐานอเมซอน (target) ได้แบบเรียลไทม์ 
- **Amazon RDS Multi-AZ**: เมื่อเปิดใช้งาน RDS จะแอบไปเช่าเซิร์ฟเวอร์ในอีก Availability Zone (AZ) นึง แล้วซิงค์ข้อมูลก๊อปปี้ไปมาตลอดเวลา ถ้าตึกแรกไฟดับ มันจะอัปเกรดตึกสองขึ้นมารับลูกค้าแทนอัตโนมัตใน 1-2 นาทีโดยสคริปต์แอปพลิเคชันฝั่งเราไม่ต้องเปลี่ยน IP เลย

---
---

## 📌 คำถามที่ 32
**โจทย์:**
A government agency plans to store confidential tax documents on AWS. Due to the sensitive information in the files, the Solutions Architect must restrict the data access requests made to the storage solution to a specific Amazon VPC only. The solution should also prevent the files from being deleted or overwritten to meet the regulatory requirement of having a write-once-read-many (WORM) storage model.

Which combination of the following options should the Architect implement? (Select TWO.)

**ตัวเลือก:**
- [ ] Set up a new Amazon S3 bucket to store the tax documents and integrate it with AWS Network Firewall. Configure the Network Firewall to only accept data access requests from a specific VPC.
- [ ] Enable Object Lock but disable Object Versioning on the new Amazon S3 bucket to comply with the write-once-read-many (WORM) storage model requirement.
- [ ] Store the tax documents in the Amazon S3 Glacier Instant Retrieval storage class. Use the PutBucketPolicy API to apply a bucket policy that restricts access requests to a specific VPC.
- [x] Create a new Amazon S3 bucket with the S3 Object Lock feature enabled. Store the documents in the bucket and set the Legal Hold option for object retention.
- [x] Configure an Amazon S3 Access Point for the S3 bucket to restrict data access to a particular VPC only.

---
### 🎯 โจทย์ต้องการอะไร?
หน่วยงานรัฐจัดเก็บไฟล์ตัวเลขภาษีโคตรความลับลงใน **Amazon S3** มีกฎเหล็กบังคับ 2 ข้อที่สถาปนิกคลาวด์ต้องปวดหัวคือ
1. ไฟล์ต้อง "ห้ามถูกลบ ห้ามถูกแก้ไขหรือเขียนทับ" โดยเด็ดขาด เรียกว่าระบบ **WORM (Write-Once-Read-Many)** 
2. ไฟล์พวกนี้จะยอม "เปิดทางให้ดาวน์โหลดดึงไปอ่านได้เฉพาะรีเควสที่มุดท่อเจาะตรงมาจาก Amazon VPC (วงแลนส่วนตัว) ที่กำหนดไว้เท่านั้น" ไม่ให้รั่วไหลไปสู่โลกเน็ตภายนอก
ต้องการโซลูชั่น 2 ขั้นตอนตีโจทย์ 2 ข้อนี้ให้แตก 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดไฟล์ห้ามลบเด็ดขาด **`prevent the files from being deleted or overwritten`** หรือคำว่า **`WORM (write-once-read-many) storage`** = ฟีเจอร์ตัวมัมแห่งวงการ S3 ร่ายมนต์กันลบไฟล์นั่นก็คือ **`S3 Object Lock`** 
- ทริคที่ 2: โดนบังคับว่าท่อโหลดข้อมูล S3 ต้องมาจากแค่บางถนน **`restrict access requests... to a specific Amazon VPC`** = ป้อมยามตรวจคนเข้าเมืองของ Amazon S3 แบบโมเดิร์นคือฟีเจอร์ที่เรียกว่า **`Amazon S3 Access Point`** (สร้างจุดตายตัวให้ VPC มุดเข้าหา S3 โดยเฉพาะ)
- ทริคที่ 3: ระวังช้อยส์ตกม้าตาย! **ข้อที่หลอกให้ `disable Object Versioning` คู่กับ Object Lock** จงจำขึ้นใจว่า Object Lock ของ AWS S3 ใช้เวทย์มนตร์ควบคุมเวอร์ชันในการปกป้องไฟล์ **ถ้าถังไหนหลงลืมไปปิด Object Versioning ฟีเจอร์ Object Lock จะใช้การไม่ได้ทันที!**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new Amazon S3 bucket with the S3 Object Lock feature enabled. Store the documents in the bucket and set the Legal Hold option for object retention.**
- **ทำไมถึงถูก:** ตีโจทย์ข้อ 1 แตกกระจุย! สร้างถัง S3 แล้วจิ้มเปิดโหมดสุดยอดเพชฌฆาต **S3 Object Lock** ทะยานขึ้นมา ควบคู่ไปกับการเซตโหมดยื้อเวลา (Legal Hold) เมื่อกางบาเรียนี้ทับลงไป ใครหน้าไหนในจักรวาล (แม้แต่สิทธิ์แอดมินสูงสุด) ก็จะไม่อาจลบหรือเขียนทับไฟล์เอกสารภาษีชิ้นนี้ได้จนกว่าจะยกเลิกกฎค้ำประกัน Legal Hold ตรงสเปคระดับชาติ WORM แบบ 100%

✅ **[ถูกต้อง] Configure an Amazon S3 Access Point for the S3 bucket to restrict data access to a particular VPC only.**
- **ทำไมถึงถูก:** ตีโจทย์ข้อ 2 แตกกระแทกบอร์ด! การสร้างประตูหมาลอดส่วนตัวที่เรียกว่า **Amazon S3 Access Point** แล้วตั้งค่าบานประตูชิ้นนี้สลับซับซ้อนว่า "จุดรับแขกตรงนี้ อนุญาตให้รับรีเควสดาวน์โหลดไฟล์จากเครือข่าย VPC วงนี้เท่านั้น" เป็นวิธีที่ดีเลิศ ประณีต และจัดการเป็นสัดส่วนได้งดงามกว่าการไปเขียน Bucket Policy ปนเปผืนใหญ่ๆ 

❌ **[ผิด] Set up a new Amazon S3 bucket to store the tax documents and integrate it with AWS Network Firewall...**
- **ทำไมถึงผิด:** เลือกใช้เครื่องมือผิดมิติ! กำแพงกันไฟทมิฬ (Network Firewall) มันสิงสถิตย์คุ้มครองสายเคเบิ้ลภายในตัว Subnet ของระบบโซน VPC มันไม่มีอำนาจแผ่รัศมีไปกอดคุ้มครองถัง Amazon S3 ที่ลอยอยู่บนอินเทอร์เน็ตสาธารณะ (AWS Public Space) เพื่อสกัดรีเควสชาวบ้านได้โดยตรง (ทำงานกันคนละขอบเขตเน็ตเวิร์ก)

❌ **[ผิด] Store the tax documents in the Amazon S3 Glacier Instant Retrieval storage class. Use the PutBucketPolicy API...**
- **ทำไมถึงผิด:** เอางานช่างไม้ไปให้ช่างเย็บผ้าทำ! Glacier เกิดมาเพื่อลดเรื่อง "ค่าทิปค่าเช่าพื้นที่" เกรดการเก็บถาวรของมันไม่ได้มีผลพลอยได้แถมเทคโนโลยีเรื่องล็อกไฟล์กันซนโดนลบ (WORM model) แบบ Object Lock แต่อย่างใด ถือว่าตอบผิดประเด็นอย่างรุนแรง

❌ **[ผิด] Enable Object Lock but disable Object Versioning on the new Amazon S3 bucket to comply with the write-once-read-many (WORM) storage model requirement.**
- **ทำไมถึงผิด:** หลอกกันหน้าด้านๆ! กฎพระคัมภีร์ AWS ประกาศกร้าวว่ากระบวนการจะทำให้ S3 Object Lock ทำงานคุ้มกันสำเร็จ **ถังนั้นจะต้องเปิดสถานะจับเวอร์ชัน (Object Versioning) ตีสอดไส้ควบคู่อยู่เสมอห้ามกดยกเลิกเด็ดขาด** เพราะตัว Lock จะจำจดสถานะที่ผูกมัดกับไฟล์ Version ID นั้นๆ การมาแนะนำให้ชักปลั๊ก disable Versioning จึงเสมือนการสั่งฆ่าตัวตาย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Object Lock**: คาถาสต๊าฟเวลา (WORM - Write Once Read Many) สามารถเซตเวลาอายัดห้ามแตะไฟล์ได้ (Retention Period เช่น ห้ามลบ 10 ปี) หรืออายัดแบบไร้กำหนดรอศาลพิจารณา (Legal Hold ปลดล็อกได้ถ้ายกเลิกคำสั่ง) ค่ายุโรปและอเมริกามักบังคับใช้เพื่อเก็บประวัติการโอนเงิน
- **S3 Access Points**: ถ้าถัง S3 หนึ่งใบมีหลายหน่วยงานมารุมจก (เช่น ทีมบัญชี, ทีมเว็บ, ทีมแบ็คอัพ) แทนที่จะไปนั่งแก้หน้าจอ Bucket Policy ยาวเป็นกิโลเมตรให้ปวดหัว แอดมินจะสร้างประตูบ้าน (Access Points) เพิ่มหลายๆ บาน แต่ละบานมีเงื่อนไขต่างกัน เช่น "ประตูนี้นะให้เข้าได้เฉพาะ VPC ทีมบัญชี"

---
---

## 📌 คำถามที่ 33
**โจทย์:**
A financial application consists of an Auto Scaling group of Amazon EC2 instances, an Application Load Balancer, and a MySQL RDS instance set up in a Multi-AZ Deployment configuration. To protect customers' confidential data, it must be ensured that the Amazon RDS database is only accessible using an authentication token specific to the profile credentials of EC2 instances.

Which of the following actions should be taken to meet this requirement?

**ตัวเลือก:**
- [ ] Use a combination of IAM and STS to enforce restricted access to your RDS instance using a temporary authentication token.
- [x] Enable the IAM DB Authentication.
- [ ] Create an IAM Role and assign it to your EC2 instances which will grant exclusive access to your RDS instance.
- [ ] Configure SSL in your application to encrypt the database connection to RDS.

---
### 🎯 โจทย์ต้องการอะไร?
แอปทางการเงินมีกองกำลัง **Amazon EC2** มัดรวมทำงานคุยเจาะเบื้องหลังกับฐานข้อมูล **MySQL ผ่าน Amazon RDS** ដើម្បីปกป้องข้อมูลลูกค้า 
โจทย์ต้องการบังคับความปลอดภัยขั้นสูงสุดว่า **เซิร์ฟเวอร์ EC2 จะเข้าถึงฐานข้อมูลได้แค่ตอนมี "เหรียญโทเคนอนุญาตชั่วคราว (authentication token)" ที่ผูกกับรหัสประจำตัวของ EC2 ใบนั้นๆ เท่านั้น** (ย้ำว่าไม่ต้องการให้จำรหัสผ่านตายตัวเสี่ยงโดนแฮกกู้แบบตั้งพาสเวิร์ดแอดมิน MySQL ปกติ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดบังคับให้ใช้ "เหรียญชั่วคราวเจาะเข้าแทนรหัสผ่าน" อย่าง **`only accessible using an authentication token`** ผูกประสานกับเซิร์ฟเวอร์ตัวตึงอย่าง **`Amazon RDS`** (ที่รองรับ MySQL/PostgreSQL) = ฟีเจอร์สุดคลาสสิคที่ตอบโจทย์เสกรหัสผ่านชั่วคราวได้ก็คือปลั๊กอิน **`IAM DB Authentication`**
- ทริคที่ 2: ระวังช้อยส์ขัดขวางสายตื้นอย่าง การโยนให้ใช้แค่ **`IAM Role`** เฉยๆ! ในโลกจริงแค่เอาหมวก IAM Role ไปสวมหัวให้ EC2 สคริปต์ก็ยังทะลวงหน้าด่านกำแพงฐานข้อมูล RDS ไม่ได้ถ้าเราไม่ออกคำสั่งเปิดฟีเจอร์พ่วง (IAM DB Authentication) ภายในฝั่ง RDS รอรับก่อน
- ทริคที่ 3: **ตัด `SSL` ทิ้ง!** คีย์เวิร์ดของ SSL เน้นเรื่องการบีบอัดห่อหุ้มเข้ารหัสข้อมูลกลางอากาศไม่ให้ใครมาระหว่างทางขโมยอ่าน (Encryption in transit) แต่การใช้ Token ทะลวงฐานมันคือเรื่องของการโชว์บัตรแสดงตัว (Authentication) ไม่เกี่ยวกัน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable the IAM DB Authentication.**
- **ทำไมถึงถูก:** นี่คือเคล็ดวิชาตรงๆ ของ AWS! แทนการใช้ชุดชื่อผู้ใช้/พาสเวิร์ดผีดิบธรรมดาๆ ที่มักจะหลุดเวลาโปรแกรมเมอร์เอาไปทิ้งไว้ในโค้ด (Hardcoded) เมื่อเราเปิดโหมดปลั๊กอิน **IAM Database Authentication** ตัวหน้าด่านฐานข้อมูล (MySQL หรือ PostgreSQL) จะยอมให้โปรแกรมเมอร์ส่งเหรียญ "IAM Authentication Token" (ซึ่งผลิตจากหลังบ้านมามีอายุขัยพริบตาแค่ 15 นาที) มาใช้แทนรหัสผ่าน ถือเป็นสุดยอดความปลอดภัย

❌ **[ผิด] Create an IAM Role and assign it to your EC2 instances which will grant exclusive access to your RDS instance.**
- **ทำไมถึงผิด:** ไปทำแค่ครึ่งทาง! กะแค่สวมหมวกสร้างยันต์ IAM Role ลงที่ตัวตึกเครื่อง EC2 ให้มันผูกใจว่าเครื่องนี้พิเศษนะ... แต่คุณดันลืมไปปักธงประกาศไขกุญแจที่ฝั่งประตูให้ตัวฐานข้อมูลยอมรับหมวกบ้าบอนี้ด้วย! หากไม่ออกคำสั่งเบิกเนตร "Enable IAM DB Authentication" ซะก่อนหน้า ฐานข้อมูลก็จะสุ่มตีกลับหน้าหงายมอง EC2 ว่าเป็นคนนอกไร้รหัสผ่านอยู่ดี

❌ **[ผิด] Use a combination of IAM and STS to enforce restricted access to your RDS instance using a temporary authentication token.**
- **ทำไมถึงผิด:** ไปร่ายเวทมนตร์วุ่นวายทำไมเอง! ใช่ โค้ด STS (Security Token Service) เป็นคนผลิตเหรียญแห่งความโชคดีชั่วคราวให้ก็จริง แต่ระบบ "IAM DB Authentication" นอกเหนือจากจะไปทุบผลิตเหรียญ Token มาให้เบื้องหลังอยู่แล้ว มันยังจัดเตรียมรอยเชื่อมต่อเข้ากับฐานข้อมูล MySQL ให้เสร็จสรรพเรียบร้อย คุณไม่ต้องไปถ่อเขียนโปรแกรมลง STS หน้ามืดดึงเหรียญมาปะทะหน้าด่านเองแต่อย่างใด

❌ **[ผิด] Configure SSL in your application to encrypt the database connection to RDS.**
- **ทำไมถึงผิด:** ติดตั้งใบรับรอง SSL ถือเป็นความดีงามนะ มันเข้ารหัสข้อมูลรังไข่ที่วิ่งไปวิ่งมาผ่านสายแลน แต่ SSL มันไม่ได้ช่วยชี้แจงไขโจทย์ "การแสดงกุญแจตัวตนว่าใครเป็นคนส่งผ่าน (Authentication token)" มันเปรียบเสมือนคุณเอาหีบเหล็กขนธนบัตร (SSL) ใส่รถบรรทุกไปหน้าคฤหาสน์ แต่ตัวคนขับ (โปรแกรมเชื่อมต่อ DB) ไม่มีกุญแจผ่านกำแพงรั้ว รปภ.อยู่ดี

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **IAM Database Authentication**: ฟีเจอร์ชั้นเลิศเวลาเราไม่อยากแจกพาสเวิร์ด (เช่น `dbadmin` / `mypassword123`) ลงไปซ้ำซ้อนให้เซิร์ฟเวอร์ EC2 เอาไปเรียกฐานข้อมูล เพราะกลัวพาสหลุด โดยปลั๊กอินนี้จะทำงานคู่กับ AWS API สร้างโทเคน 15 นาทีแจกให้โค้ดของแอปพลิเคชันเอาไปเคาะประตูล็อกอินได้ชั่วคราว (ปัจจุบันรองรับเฉพาะ MySQL กับ PostgreSQL engine ของ RDS/Aurora)

---
---

## 📌 คำถามที่ 34
**โจทย์:**
A company needs to deploy at least two Amazon EC2 instances to support the normal workloads of its application and automatically scale up to six EC2 instances to handle the peak load. The architecture must be highly available and fault-tolerant as it is processing mission-critical workloads.

As a Solutions Architect, what should be done to meet this requirement?

**ตัวเลือก:**
- [x] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 4 and the maximum capacity to 6. Deploy 2 instances in Availability Zone A and another 2 instances in Availability Zone B.
- [ ] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 2 and the maximum capacity to 6. Use 2 Availability Zones and deploy 1 instance for each AZ.
- [ ] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 2 and the maximum capacity to 4. Deploy 2 instances in Availability Zone A and 2 instances in Availability Zone B.
- [ ] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 2 and the maximum capacity to 6. Deploy 4 instances in Availability Zone A.

---
### 🎯 โจทย์ต้องการอะไร?
แอปพลิเคชันธุรกิจหลักร้อยล้านมีกฎตายตัวขีดเส้นใต้ไว้เลยว่า
1. ในภาวะปกติสุขเซิร์ฟเวอร์หลับประธาน ต้องมีปั๊มน้ำ (EC2) ช่วยกันทำงานปั๊มแชร์งาน **"อย่างน้อย 2 เครื่อง (at least two EC2 instances) พร้อมกันเสมอ เพื่อซัพพอร์ตโหลดงานปกติ"** !
2. รีดเค้นพลังเบ่งกล้ามสุดทะลักตอนพีค (Peak load) ไต่ระดับขึ้นไปได้ **สูงสุด 6 เครื่อง**
3. ระบบต้องเป็นอมตะ **ทนทานสูงและสู้ความตาย (Highly available & Fault-tolerant)** หมายความว่า แม้เกิดพิบัติภัยฟ้าถล่มไฟฟ้าลัดวงจรตึก Data Center ดับระเบิดพินาศไปหนึ่งเขตโซน (1 AZ outage) โครงสร้างสเกลโดยรวมก็ยังเหลือชีวิตยืนหยัด **"รักษากติกาข้อ 1 มี 2 เครื่องเดินหน้าแบกสภาวะปกติ"** ไว้ให้ได้เสมือนไม่มีอะไรเกิดขึ้น!
เราควรตั้งค่าวงล้อสเกลเครื่อง Auto Scaling (Min และ Max capacity) พร้อมวางโลเคชั่นโซนไข่แดงอย่างไรดีที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: นี่คือข้อสอบคณิตศาสตร์จำลองภัยพิบัติ! กฎเหล็กของโจทย์ Fault-tolerant ข้าม AZ คือ "ถ้าก๊อตซิลล่ามาเหยียบพังไป 1 โซน (เสียเซิร์ฟเวอร์ไปครึ่งนึง) จำนวนเครื่องเซิร์ฟที่หลงเหลือรอดชีวิตในโซนสำรอง จะต้องมีปริมาณเท่ากับหรือมากกว่าคำว่า **`normal workloads` (ในที่นี่ตั้งธงไว้คือจำนวน 2)** เสมอ"
- ทริคที่ 2: ลองเอาฐานทัพแบ่งครึ่งดู: ถ้าเราเซตฐานเริ่มต้น **minimum capacity เป็น 4** วางตึกที่ Zone A 2 เครื่อง และ Zone B อีก 2 เครื่อง ... สมมุติ Zone A ไฟบึ้ม! เครื่อง 2 เครื่องหายสูญ! เรายังมีเครื่องที่ Zone B 2 ตัว ซึ่งสามารถพยุงรับน้ำหนักงานปกติ (`normal workloads = 2`) ได้หน้าตาเฉย แบบนี้ถือว่าสอบผ่าน! หวยจึงออกไปที่ Minimum 4 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 4 and the maximum capacity to 6. Deploy 2 instances in Availability Zone A and another 2 instances in Availability Zone B.**
- **ทำไมถึงถูก:** เผื่อแผ่สุดทางบุญ! วางเครื่องทั้งหมดเริ่มต้นด้วย Minimum สแตนบายชิลล์ๆ เปิดแอร์เย็นๆหน้าบ้านที่ **4 เครื่องขนานล่วงหน้า** กระจายตัวแช่ไว้ที่ โซน A 2 เครื่อง, และ โซน B 2 เครื่อง... ถ้าดวงจู๋สุดจัด ก๊อตซิลล่าพ่นไฟถล่ม "ตึกโซน A พังเรียบถล่มลงทะเล" ควันขโมง... วินาทีนั้น เครื่องในโซน A 2 เครื่องวอดวายตายสนิท แต่ปาฏิหาริย์คือเรายังเหลือ **2 เครื่องในดงโซน B เดินหน้าทำงานได้สบายๆ!** ทำให้สอดคล้องกับกติการับงานปกติแบกภาระคือ "ต้องมี 2 เครื่องทำงาน" ได้ 100% ตอบโจทย์ค้ำจุนเรื่อง Fault-tolerant แบบท็อปฟอร์ม

❌ **[ผิด] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 2 and the maximum capacity to 6. Use 2 Availability Zones and deploy 1 instance for each AZ.**
- **ทำไมถึงผิด:** จ่ายเงินแพงเพื่อมาตายดาบหน้าชัดๆ! หั่นเครื่องปกติแอบวางตึก โซน A แค่ 1 ตัว, โซน B แค่ 1 ตัว (สตาร์ทก้าวแรกที่ Minimum 2 เครื่อง) พนันได้เลยว่าพอตึก A ล่มไฟดับปุ๊บ... เครื่องหายสูญไปรอด 1 ทำให้คุณเหลือสล็อตขุมพลังทำงานอยู่ตัวโดดๆ "แค่ 1 เครื่องเปลี่ยวใจ" ในตึก B ขัดขืนกติกาขั้นเด็ดขาดของลูกค้าที่สั่งไว้ว่าต้องรันงานสแตนบายแบกน้ำหนักซัพพอทด้วย "ขั้นต่ำ 2 เครื่องพยุงตัว" เสมอ

❌ **[ผิด] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 2 and the maximum capacity to 4. Deploy 2 instances in Availability Zone A and 2 instances in Availability Zone B.**
- **ทำไมถึงผิด:** โจทย์ประกาศกร้าวชัดดาวล้านดวงว่า ระบบต้องสามารถโฉบช่วยกันเบ่งกล้ามสูบฉีดผุดเพิ่มมารับยอดคิวรถติดสุดกู่ที่ "สเกลอัดกระแทกรับลมสูงสุด 6 เครื่อง (scale up to six EC2 instances)" การตั้งเพดานเซ็ต Maximum หดหู่ปวกเปียกไว้แค่ 4 คุณจะทนหน้าพายุลูกค้าที่มารุม 6 เครื่องอ้วกแตกตายคาหน้ากระดาน 

❌ **[ผิด] Create an Auto Scaling group of EC2 instances and set the minimum capacity to 2 and the maximum capacity to 6. Deploy 4 instances in Availability Zone A.**
- **ทำไมถึงผิด:** นี่คือสถาปัตยกรรมระดับอนุบาล หวงก้างเอาไข่ทุกฟองไปกระจุกรอมชอมหมกกันอยู่ที่ตะกร้าเดียว (โซน A พรืดเดียว 4 เครื่องรวด!) ห่างไกลคำว่าระบบอมตะ "High Availability" มากๆ ถ้าตึกโซน A มีหม้อแปลงขั้วหลุดไฟดับ คุณจะไม่มีเหลือฐานที่มั่นเศษซากเซิร์ฟเวอร์สำรองในโซน B ให้ยืนกู้หน้าเอาตัวรอดเลย หายนะดับอนาถครบ 100%

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Auto Scaling Group (ASG)**: ทีมพยาบาลโคลนนิ่งตึก สามารถตั้งกติกา Min, Max, และ Desired Capacity (จุดคุมกำเนิดเครื่อง) เพื่อให้ AWS ยืดหดเสกพงศ์พันธุ์ EC2 ออกมาแบ่งเบาภาระเวลามีคนดูเว็บเยอะ และกระทืบทิ้งเวลาคนน้อยๆ 
- **Fault-Tolerant vs High Availability (HA)**: 
  - *HA*: พยายามรันระบบให้มีหน้าเว็บไม่ดับ (เปิดไว้ 1-2 AZ)
  - *Fault-Tolerant*: เลเวลท็อปของ HA คือ "ทนทานการล่มสลาย" หมายถึงชิ้นส่วนใหญ่พังหลุดไปดื้อๆ แต่ลูกค้าจับไม่ได้เลยว่ามีส่วนไหนของระบบเดี้ยงไป (แอบสำรองเครื่องเบิ้ลเผื่อตายหนักๆ ไปเลย)

---
---

## 📌 คำถามที่ 35
**โจทย์:**
A company has recently migrated its microservices-based application to Amazon Elastic Kubernetes Service (Amazon EKS). As part of the migration, the company must ensure that all sensitive configuration data and credentials, such as database passwords and API keys, are stored securely and encrypted within the Amazon EKS cluster's etcd key-value store.

What is the most suitable solution to meet the company's requirements?

**ตัวเลือก:**
- [x] Enable secret encryption with a new AWS KMS key on an existing Amazon EKS cluster to encrypt sensitive data stored in the EKS cluster's etcd key-value store.
- [ ] Enable default Amazon EBS volume encryption for the account with a new AWS KMS key to ensure encryption of sensitive data within the Amazon EKS cluster.
- [ ] Use AWS Secrets Manager with a new AWS KMS key to securely manage and store sensitive data within the EKS cluster's etcd key-value store.
- [ ] Use Amazon EKS default options and the Amazon Elastic Block Store (Amazon EBS) Container Storage Interface (CSI) driver as an add-on to securely store sensitive data within the Amazon EKS cluster.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทย้ายแอปพลิเคชันรูปแบบคอนเทนเนอร์มัดย่อยแตกๆ ขึ้นสู่เรือใหญ่ตู้คอนเทนเนอร์อย่าง **Amazon EKS (Elastic Kubernetes Service)** 
โจทย์ระบุว่าจุดที่ต้องปิดป้องกันสยึ๋ยกึ๋ยให้มิดชิดที่สุดหลังบ้านคือ มี "ข้อมูลของลับสุดยอดรหัสผ่าน, คีย์เหรียญผ่านด่าน (database passwords, API keys)" วางหมกเกลื่อนอยู่ในกระสวยฐานหน่วยความจำแกนหลักคูโบเนติสที่ชื่อว่า **`etcd key-value store`** (ซึ่งค่าพื้นฐานตรงนี้วางรหัสดิบๆ สดๆ โล่งเตียน)
โจทย์ต้องการหา **วิธีล็อคแม่กุญแจเข้ารหัส (Encrypted) ให้ขุมทรัพย์ที่กองในกระสวย etcd ปลอดภัยระดับสูงสุด** 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดคำว่าอัปเกรดล็อกกุญแจฐานข้อมูลเสาหลักเนทีฟของ Kubernetes ที่เจาะจงชื่อเป้าหมายว่า **`EKS cluster's etcd key-value store`** ฟีเจอร์ตัวจี๊ดตรงจุดนี้ที่ AWS มีให้เปิดใช้คือการตีคู่ผูกกุญแจมาสเตอร์ **`secret encryption with a new AWS KMS key`** (หรือเรียกกันว่า EKS Secret Encryption)
- ทริคที่ 2: **ตัดช้อยส์ลวงที่บอกให้เข้ารหัสฮาร์ดดิสก์ตรงๆ เช่น `EBS volume encryption` ทิ้งไป!** ฮาร์ดดิสก์ EBS เปล่าๆ ต่อให้คุณเปิดเข้ารหัส มันก็คุ้มครองแค่ไฟล์โปรแกรมดาดๆ ในแผ่นดิสก์ของเครื่องตึกย่อยลูกเรือ (Worker nodes) แต่ไอ้ห้องลับ etcd ที่ว่านี้ มันลอยตัวอยู่บึนตึกชั้นบนส่วนบังคับการพิเศษ (EKS Control Plane) ซึ่ง AWS เป็นคนดูแล เราลงไปแตะ EBS ฮาร์ดดิสก์มันดิบๆด้วยตัวเองไม่ได้! 
- ทริคที่ 3: **ระวัง `AWS Secrets Manager` มาตกม้าตายข้อนี้!** จริงอยู่บริการ Secret Manager ของอเมซอนมันเจ๋งในการสลับซ่อนพาสเวิร์ดหลอก แต่มันอพยพไม่ได้มีความคล่องแคล่วพอจะมุดผูกฝังตัวไปล็อกปั๊มลูกกุญแจถึงในทรวงตุ่มฐานข้อมูล etcd ในเนื้อในอวัยวะของเครือข่าย EKS ได้โดยตรง 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable secret encryption with a new AWS KMS key on an existing Amazon EKS cluster to encrypt sensitive data stored in the EKS cluster's etcd key-value store.**
- **ทำไมถึงถูก:** เปรี้ยงเดียวจบ! ความสุดยอดของ EKS (Kubernetes ฉบับอเมซอน) คือมันชูโรงรองรับการอัปเกรดความปึกแผ่นของชั้นความลับ Kubernetes Secrets โดยใช้พลังของบริการถือกุญแจระดับชาติอย่าง **AWS KMS** พอคุณเข้าไปกดเปิดใช้งาน **Secret Encryption** และห้อยกุญแจ KMS คู่กันปุ๊บ กล่องพาสเวิร์ด etcd จะถูกบีบอัดเข้ารหัสต้านทานแบบเพอร์เฟค (Encrypted at rest) ขโมยล้วงทะลวงกำแพงในเซิร์ฟเวอร์มาส่องดูพาสเวิร์ดก็อ่านไม่ออกแน่นอน

❌ **[ผิด] Enable default Amazon EBS volume encryption for the account with a new AWS KMS key to ensure encryption of sensitive data within the Amazon EKS cluster.**
- **ทำไมถึงผิด:** เอาน้ำไปรดรากไม้ยางพารา แต่หวังให้มะพร้าวบนยอดหวาน! การเข้ารหัสฮาร์ดดิสก์ (EBS Volume) ในฝั่งของเรา มันครอบคลุมแค่ไดรฟ์แผ่นดิสก์บน Node กลุ่มแรงงาน (Worker Nodes) ของเราเท่านั้น แต่ฐานข้อมูลขุมความลับ etcd มันนั่งตระหง่านอยู่บนศูนย์ปมประสาท ควบคุม EKS (Control Plane) ที่ถูกรันบนดินแดนหลังม่านที่ AWS ปกปิดเป็นผู้ดูแลให้ (AWS Managed) คุณจึงไม่มีอำนาจเถื่อนไปจับดิสก์ EBS ตรงนั้นเข้ารหัสได้เอง 

❌ **[ผิด] Use AWS Secrets Manager with a new AWS KMS key to securely manage and store sensitive data within the EKS cluster's etcd key-value store.**
- **ทำไมถึงผิด:** เอารถถังไปจับแมลงวัน! AWS Secrets Manager มีอาชีพหลักคือการเป็นตัวกลางหมุนจานจ่ายแจกหมุนเวียนพาสเวิร์ดให้แอปพลิเคชัน (Secret Rotation) มันเป็นเครื่องมือแยกอิสระ ไม่ได้เป็นปลั๊กอินที่มีคุณสมบัติพวยพุ่งไปล็อกตัวเก็บข้อมูลดั้งเดิมของชาว Kubernetes อย่าง "etcd key-value store" ภายในคลัสเตอร์ EKS โดยตรง 

❌ **[ผิด] Use Amazon EKS default options and the Amazon Elastic Block Store (Amazon EBS) Container Storage Interface (CSI) driver as an add-on to securely store sensitive data within the Amazon EKS cluster.**
- **ทำไมถึงผิด:** ลงปลั๊กอินหางเสือ EBS CSI driver ใส่ EKS ขี้เมาหวังการเข้ารหัส ไดรเวอร์ตัวกระเปี๊ยกของ Amazon EBS CSI เสกขึ้นมาเพื่อเป็น "สะพานเชื่อมสวมสัมภาระ" ให้แอปพลิเคชันในตู้คอนเทนเนอร์ดึงเนื้อที่ฮาร์ดดิสก์อเมซอนเปล่าๆ ออกมาใช้เพิ่มเติมกางตู้เย็นแค่นั้น ไม่ได้เกี่ยวพันสลึงเดียวกับการคุ้มกันลายนิ้วมือห้องนิรภัยของ etcd ให้ปลอดภัยจากการเจาะเลยสักนิด 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon EKS (Elastic Kubernetes Service)**: บริการระดับนายพลที่ช่วยคุณประคองเรือบรรทุกตู้คอนเทนเนอร์ (Kubernetes Cluster) ให้รันได้อย่างสบายใจเฉิบ โดย AWS จะกั้นโซนรับเหมาไปควบคุมบริหารตึก "Control plane" หลังบ้าน (รวมถึง etcd) ไม่ให้เราวุ่นวาย
- **etcd**: หัวใจและสมองส่วนความจำหลักของระบบนิเวศ Kubernetes ทุกคณู ทุกการตั้งค่า รวมถึงพาสเวิร์ด (K8s Secrets) จะถูกโยนเข้าไปหมกกองรวมกันเป็นข้อความเรียบง่าย (Plain text) เปลือยล้อนจ้อนที่นี่ ถ้าไม่เปิด EKS KMS Encryption ชุบเกราะป้องกัน ใครแฮกเข้ามาล้วง etcd ได้ ก็ได้คุมโลก!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 8: ข้อ 36 - 40)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 36
**โจทย์:**
A business has recently migrated its applications to AWS. The audit team must be able to assess whether the services the company is using meet common security and regulatory standards. A solutions architect needs to provide the team with a report of all compliance-related documents for their account.

Which action should a solutions architect consider?

**ตัวเลือก:**
- [ ] Run an Amazon Macie job to view the Service Organization Control (SOC), Payment Card Industry (PCI), and other compliance reports from AWS Certificate Manager (ACM).
- [ ] Run an Amazon Inspector assessment job to download all of the AWS compliance-related information.
- [ ] View all of the AWS security compliance reports from AWS Security Hub.
- [x] Use AWS Artifact to view the security reports as well as other AWS compliance-related information.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเพิ่งย้ายแอปขึ้นมาอยู่บน AWS ทีมผู้ตรวจสอบภายใน (Audit Team) มีคำสั่งขอดู "เอกสารรับรองมาตรฐานความปลอดภัยต่างๆ ระดับสากล (compliance-related documents)" เช่น ใบรับรอง SOC หรือ PCI เพื่อยืนยันว่าการตั้งระบบใน AWS ถูกต้องตามกฎหมายคุ้มครองมาตรฐาน 
โจทย์ถามว่า สถาปนิกระบบจะไปควานหา "รายงานและใบเซอร์รับรองพวกนี้" ออกมาจาก AWS ได้จากที่ไหน? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดทีมออดิทมาขอเอกสารรับรองความปลอดภัย **`audit team`** + **`compliance-related documents`** หรือมีคำว่าใบเซอร์ตัวพ่ออย่าง **`SOC, PCI reports`** = ให้พุ่งเป้าไปที่ห้องสมุดกลางของ AWS ที่ชื่อว่า **`AWS Artifact`** ทันที! ที่นี่คือตู้เก็บเอกสารสัญญารับรองทุกอย่างของ AWS
- ทริคที่ 2: ระวังโดนหลอกให้ไปกดโหลดดูรายงานจาก **`AWS Security Hub`** หรือ **`Amazon Inspector`** พวกนี้คือหน้าปัดมอนิเตอร์ดู "หลังคาบ้านเราว่าน้ำรั่วมั้ย โดนแฮกมั้ย" ถ้าน้ำรั่วมันจะด่าเราว่าไม่ Compliance ขาดมาตรฐานตามที่ควรจะเป็น แต่มัน **ไม่ใช่ "ตู้เก็บเอกสาร PDF ใบรับรอง ISO ระดับโลกของบริษัท Amazon"** ที่เอาไว้ให้ส่งให้กระทรวงตรวจสอบนะ แยกให้ออก

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Artifact to view the security reports as well as other AWS compliance-related information.**
- **ทำไมถึงถูก:** เถรตรงที่สุด! **AWS Artifact** คือห้องสมุดหอจดหมายเหตุของ Amazon มันเป็นศูนย์กลางคลังเอกสารให้คุณเข้าไปกด "ดาวน์โหลดยอมรับสัญญา/ใบ Certificate รายงานรับรองมาตรฐานความปลอดภัย" (อาทิ ISO, PCI DSS, SOC, HIPAA) ของเครื่องเซิร์ฟเวอร์กระทรวงเวทมนต์ AWS พร้อมเซฟเป็นไฟล์ PDF ออกมาเป็นหลักฐานยืนยันอวดให้ทีม Audit ดูได้ฉลุยที่สุด 

❌ **[ผิด] View all of the AWS security compliance reports from AWS Security Hub.**
- **ทำไมถึงผิด:** AWS Security Hub มีหน้าที่เป็นเหมือน "หน้าปัดเรดาร์รวมศูนย์แจ้งเหตุภัยพิบัติ" มันจะแสดงคะแนน Compliance ล้วงไส้กรองสถิติว่า "เห้ย บ้านเราปิดเซฟตี้ลูกบิดประตูไฟร์วอล AWS ครบมั้ย? เราเผลอเปิด S3 เป็น Public มั้ย?" เอาไว้บอกสถานะระบบ **แต่ไม่ใช่แหล่งเก็บ "เอกสารใบประกาศนียบัตรรับรองมาตรฐานของโครงสร้างบริษัท Amazon" (Compliance documents)** ที่ทีม Audit อยากได้แต่อย่างใด

❌ **[ผิด] Run an Amazon Inspector assessment job to download all of the AWS compliance-related information.**
- **ทำไมถึงผิด:** แนะนำทีมไปผิดที่! สุนัขดมกลิ่นไซเบอร์ Amazon Inspector มีหน้าที่ดมหา "ช่องโหว่ความเสี่ยงไวรัส หรือซีคิวริตี้แพตช์เก่าที่ไม่อัพเดต (Vulnerabilities)" ที่ฝังอยู่ในไส้เครื่องเซิร์ฟเวอร์ EC2 หรือในคอนเทนเนอร์ของคุณ มันสนใจแค่ว่าโปรแกรมที่คุณลงมันเก่ามีรูโบ๋ไหม ไม่ได้มีหน้าที่ปริ้นท์ใบรายงานระดับทวีปส่งสภาคองเกรส

❌ **[ผิด] Run an Amazon Macie job to view the Service Organization Control (SOC), Payment Card Industry (PCI), and other compliance reports from AWS Certificate Manager (ACM).**
- **ทำไมถึงผิด:** มั่วซั่วจับฉลากผูก 2 บริการ บริการ Macie อาชีพมันคือ "เครื่องสแกนหาข้อมูลส่วนตัว PII (เช่น เลขบัตรประชาชน, เลขหน้าบัตรเครดิต) ที่คุณเผลอหลุดเซฟวางในถัง S3" ส่วนบริการ ACM (Certificate Manager) คือแหล่ง "ปั๊มเหรียญใบรับรองความปลอดภัยเว็บไซต์คล้องกุญแจเขียว (SSL Certificate)" ให้หน้าเว็บ ทั้งคู่ไม่ได้มีใครเกี่ยวดองกับการพ่นรายงาน SOC หรือ PCI ออกมาตีหัวแอดมินเลย 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Artifact**: พอร์ทัลฟรีของ AWS มีไว้โหลดเอกสารที่เซิฟเวอร์ AWS ได้รับการตรวจสอบและรับรองจากฝ่ายตรวจสอบภายนอก เช่น "เซิร์ฟเวอร์ AWS ป้องกันไฟไหม้และกันข้อมูลบัตรเครดิตรอดปลอดภัยได้มาตรฐานสากล PCI นะ" เวลาบริษัทย้ายระบบมาขึ้น AWS แล้วรัฐบาลถามว่าฮาร์ดแวร์ได้มาตรฐานไหม ก็หยิบเอกสารจาก Artifact นี่แหละไปฟาดหน้า
- **AWS Security Hub**: ศูนย์รวมความปลอดภัยระดับนโยบายของเราเอง โชว์เป็นแดชบอร์ดเลยว่าบัญชี AWS ของเรามีสีแดงเถือกเพราะพนักงานหลงลืมล็อกรหัสเซิร์ฟเวอร์มั้ย

---
---

## 📌 คำถามที่ 37
**โจทย์:**
A startup is using Amazon RDS to store data from a web application. Most of the time, the application has low user activity but it receives bursts of traffic within seconds whenever there is a new product announcement. The Solutions Architect needs to create a solution that will allow users around the globe to access the data using an API.

What should the Solutions Architect do meet the above requirement?

**ตัวเลือก:**
- [ ] Create an API using Amazon API Gateway and use an Auto Scaling group of Amazon EC2 instances to handle the bursts of traffic in seconds.
- [ ] Create an API using Amazon API Gateway and use Amazon Elastic Beanstalk with Auto Scaling to handle the bursts of traffic in seconds.
- [x] Create an API using Amazon API Gateway and use AWS Lambda to handle the bursts of traffic in seconds.
- [ ] Create an API using Amazon API Gateway and use the Amazon ECS cluster with Service Auto Scaling to handle the bursts of traffic in seconds.

---
### 🎯 โจทย์ต้องการอะไร?
สตาร์ทอัพเจอปัญหา ปกติเว็บจะเงียบเหงาป่าช้า (low user activity) แต่พอมีอีเวนท์แถลงข่าวเปิดตัวสินค้าปุ๊บ **จะเกิดแรงกระแทกจากผู้ใช้มหาศาลไหลบ่าเข้ามาใน "ระดับเสี้ยววินาที (bursts of traffic within seconds)"** ทันที 
สถาปนิกระบบได้รับคำสั่งให้สร้างช่องทาง API เพื่อเปิดให้คนทั่วโลกทะลวงเข้าสูบข้อมูล
โจทย์ต้องการวิธีการจัดฉากกั้นเสิร์ฟ API ยังไง ให้ระบบคลาวด์ขยายร่างได้ทันตั้งตัวและรอดตายเมื่อคนแห่ทะลักเข้ามาไวปานสายฟ้าแลบขนาดนั้น

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดปัญหาคนแห่เข้ามาแบบฉับพลันทันที **`bursts of traffic within seconds` (คลื่นทราฟฟิกกระแทกในหลักวินาที)** = ตัดช้อยส์ที่มีคำว่า `EC2` หรือพวกที่ต้องสร้างเซิร์ฟเวอร์เองทิ้งให้หมด! เพราะการบูตเครื่องเปิด OS ใหม่ 1 เครื่องต้องใช้เวลา 1-3 ทีเป็นอย่างน้อย (Minutes) ไม่มีทางหนีตายรับแขกทันหลักเสี้ยววิแน่นอน
- ทริคที่ 2: เมื่อโจทย์เรียกร้องความยืดหยุ่นขยายตัวแบบไร้ขีดจำกัดและทันที (Instant scaling) คู่แท้ที่จะมาคุมหน้าด่าน API คือ **`AWS Lambda` (บริการ Serverless รันโค้ดทันทีไม่ต้องรอเปิดเครื่อง)** มันสามารถจุดระเบิดตัวเองแยกร่างแตกหน่อขึ้นมาประมวลผลคำขอนับพันได้ในระดับมิลลิวินาที

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an API using Amazon API Gateway and use AWS Lambda to handle the bursts of traffic in seconds.**
- **ทำไมถึงถูก:** เคล็ดลับของจักรวาล Serverless! ใช้ด่านหน้าอย่าง **API Gateway** ยืนแอ่นอกรับแขกชาวโลกแล้วตีคู่โอนงานให้มือปืนไร้เงาอย่าง **AWS Lambda** เป็นคนประมวลผล 
ความสุดขั้วของ Lambda คือมัน "ไม่มีเครื่อง OS ให้ต้องเสียเวลาบูตแช่" พอมีคนรุมกดโหลดสินค้า มันโผล่ปุ๊บก็แยกร่างนินจาเพิ่มตัวออกมารันงาน 1,000 คนพร้อมกันได้ในเสี้ยววินาทีเพื่อเคลียร์คำร้องจบ ครบตรงเป้าโจทย์เป๊ะ 

❌ **[ผิด] Create an API using Amazon API Gateway and use an Auto Scaling group of Amazon EC2 instances to handle the bursts of traffic in seconds.**
- **ทำไมถึงผิด:** ผิดตรงไทม์ไลน์แห่งกาลเวลา! การฝากความหวังให้หุ่นกระป๋อง Auto Scaling เรียกกองหนุนเป็นก้อนเหล็ก **Amazon EC2** คุณต้องเริ่มจากการส่งออร์เดอร์ สร้างเครื่อง รัน Windows/Linux ตัวเต็มซึ่งกินเวลาบูตโหลดเข้า OS เชื่องช้าเป็น "รอบนาที (Minutes)" กว่าเครื่องแรกจะตื่นมาล้างหน้า คนเป็นหมื่นที่กดรีเฟรชรอก็ทำหน้าเว็บล่มอ่วมไปแล้ว

❌ **[ผิด] Create an API using Amazon API Gateway and use Amazon Elastic Beanstalk with Auto Scaling to handle the bursts of traffic in seconds.**
- **ทำไมถึงผิด:** แฝดคนละฝาของข้อเบื้องบน! เลี้ยวหาบริการสำเร็จรูป **Amazon Elastic Beanstalk** ฟังดูหรูหราออโต้ แต่ไส้ในของ Elastic Beanstalk หลังม่านมันก็แอบไปกดสร้างปั๊มเครื่อง EC2 อ้วนๆ ชักช้ายืดยาดอยู่เหมือนเดิม ไม่ได้มีเทคโนโลยีขยายร่างระดับเสี้ยววิช่วยชีวิตอะไร

❌ **[ผิด] Create an API using Amazon API Gateway and use the Amazon ECS cluster with Service Auto Scaling to handle the bursts of traffic in seconds.**
- **ทำไมถึงผิด:** แม้การรันตีกล่องคอนเทนเนอร์บนฐาน **Amazon ECS** จะสามารถเริ่มเปิดโปรแกรมบูตตัวเองได้รวดเร็วกว่า EC2 เปล่าๆดั้งเดิม แต่... กระบวนการขยับกลไก Service Auto Scaling (ต้องรอ Cloudwatch แจ้งเตือนยอดทะลุ -> สั่ง ECS ต่อยอด -> โยนชิ้นงานโปรแกรมลงล็อกกล่อง) รวมๆแล้วก็ยังมีจังหวะหน่วงเทอะทะหลักครึ่งนาทีถึงนาทีอยู่ดี สู้แชมป์เสี้ยววินาทีแท้ๆ อย่างก้อนพลังงาน Lambda ไม่ติดฝุ่น

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Lambda**: หัวใจของ "Serverless" มันคือบริการที่ให้คุณเอาสคริปต์โค้ดเปล่าๆ (Node.js, Python, Java) ไปแปะไว้ พอมีเหตุการณ์ (Event) มากะซวกเรียกมัน มันจะตื่นรันโค้ดนั้นปุ๊บเสร็จแล้วหลับไปเลย กินเงินเฉพาะมิลลิวินาทีที่กระดิกตัวทำงาน 
- **Amazon API Gateway**: หน้าด่านประตูเหล็ก เอาไว้สร้าง URL แจกให้ชาวแอพมือถือเข้ามากด เเละมันยังช่วยกันผีบล็อกคำขอขยะ ช่วยผูกกับ Cognito ให้คนล็อกอินก่อนเข้าถึง และส่งงานต่อให้ Lambda อย่างสวยงาม 

---
---

## 📌 คำถามที่ 38
**โจทย์:**
An application consists of multiple Amazon EC2 instances in private subnets in different availability zones. The application uses a single NAT Gateway for downloading software patches from the Internet to the instances. There is a requirement to protect the application from a single point of failure when the NAT Gateway encounters a failure or if its availability zone goes down.

How should the Solutions Architect redesign the architecture to be more highly available and cost-effective?

**ตัวเลือก:**
- [ ] Create three NAT Gateways in each availability zone. Configure the route table in each private subnet to ensure that instances use the NAT Gateway in the same availability zone.
- [ ] Create two NAT Gateways in each availability zone. Configure the route table in each public subnet to ensure that instances use the NAT Gateway in the same availability zone.
- [ ] Create a NAT Gateway in each availability zone. Configure the route table in each public subnet to ensure that instances use the NAT Gateway in the same availability zone.
- [x] Create a NAT Gateway in each availability zone. Configure the route table in each private subnet to ensure that instances use the NAT Gateway in the same availability zone

---
### 🎯 โจทย์ต้องการอะไร?
แอปพลิเคชันตึก EC2 กระจายตัวแอบซ่อนอยู่ห้องมืดสุดแดนสนธยาที่ไม่มีอินเทอร์เน็ต **(Private Subnets ข้ามหลายโซนตึก AZ)** ปัจจุบันพวกมันยืมจมูกยาม 1 คนที่ชื่อว่า **"NAT Gateway ยืนอยู่ตัวเดียวโดดๆ"** เป็นรูระบายอากาศวิ่งออกไปสูบดึงเน็ตเพื่ออัปแพตช์ซอฟต์แวร์ 
โจทย์ต้องการหาวิธีป้องกันหายนะ **"คอขวดตัวเชื่อมตาย (single point of failure)"** หากตึก AZ ที่ตั้งเครื่องยาม NAT นี้บังเอิญระเบิดพัง ไฟดับ อินเทอร์เน็ตทั้งระบบก็ดับกุดหมด 
จะออกแบบแก้หน้านี้ใหม่ให้ปลอดภัยกระจายเสี่ยงล่ม (Highly Available) และประหยัดเงินในกระเป๋าคุ้มค่า (Cost-effective) ยังไงดี? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: การวางยามรักษาการ **`NAT Gateway`** เพื่อความถึกทนระดับ (High Availability) สูตรอมตะใน AWS คือ **"ให้ติดตั้ง NAT Gateway ไว้ 1 ตัว ประจำทุกๆ Availability Zone (AZ) ที่คุณใช้งาน"** ห้ามวางกระจุกตัวเดียว และไม่ต้องบ้าจี้วางโซนละ 2-3 ตัวเพราะเสียดายเงินและไม่มีประโยชน์
- ทริคที่ 2: พอสร้าง NAT ประจำโซนเสร็จ คุณต้องเขียนแผนที่นำทาง **`Route table`** ให้ถูกที่! จำไว้แม่นๆ ว่าหน้าที่ปั๊มอากาศของ NAT คือเพื่อต่อชีวิตให้ **"เครื่องที่ไม่มีเน็ต (`private subnet`)"** ได้มองเห็นแสงตะวัน ดังนั้นแผนที่ที่ต้องแก้ชี้ทางออกอินเทอร์เน็ตไปหา NAT ก็ต้องเป็น Route table ของ **`Private Subnet`** เท่านั้น! (ถ้าช้อยส์ไหนบอกให้ไปแก้ใน Public Subnet แปลว่ามั่ว!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a NAT Gateway in each availability zone. Configure the route table in each private subnet to ensure that instances use the NAT Gateway in the same availability zone**
- **ทำไมถึงถูก:** สมบูรณ์แบบไร้ที่ติ! วางเครื่องจูนเน็ต **NAT Gateway ประจำการ 1 ตัวฝังไว้ในทุกๆ โซนตึก AZ** ถือเป็นการรักษาแผลเสี่ยงตาย 100% หากตูม! โซนตึก A สลายไป ตึกโซน B ก็ยังมีท่อ NAT โซน B ของตัวมันเองดูดเน็ตรอดตายได้ชิลล์ๆ ไม่ตบตีกัน และวิธีการเชื่อมเน็ตที่ประหยัดเงินสุดคือ จัดป้ายชี้ทาง (Route Table ในแต่ละ Private Subnet) บอกกฎเหล็กว่า "ให้เครื่องใช้ท่อ NAT Gateway ที่อยู่โซนบ้านเดียวกันเท่านั้นนะ (in the same availability zone)" เพราะถ้าคุณบ้าจี้ให้เครื่องโซน A ทะลึ่งวิ่งข้ามเมืองไปออกเน็ตท่อ NAT ฝั่งโซน B อเมซอนจะชาร์จค่าวิ่งข้ามโซนอ่วมอรทัย (Data Transfer Charge) ถือว่าช้อยส์นี้ถูกต้องทั้งหลัก HA และเซฟงบที่สุด 

❌ **[ผิด] Create a NAT Gateway in each availability zone. Configure the route table in each public subnet to ensure that instances use the NAT Gateway in the same availability zone.**
- **ทำไมถึงผิด:** ตกม้าตายท่อนหลัง! อุตส่าห์สร้าง NAT 1 ตัวแยกลงตามโซนถูกเผงละ เเต่ดันตาเหล่ไปเขียนผูกป้ายทางม้าลายโยงให้เครื่องในฝั่ง "Public Subnet" ซะงั้น!
เครื่องใน Public Subnet มันเป็นพวกไฮโซมีท่อเจาะตรงออกเน็ตของตัวเองอยู่แล้ว (ใช้ IGW) มันไม่ได้ลำบากมารอรับอากาศหายใจเน็ตจาก NAT Gateway เลย คุณต้องไปเขียนอัปเดตทางหนีทีไล่นี้ให้กับผู้ยากไร้ใน **Private subnet** สิว้อย!

❌ **[ผิด] Create two NAT Gateways in each availability zone. Configure the route table in each public subnet to ensure that instances use the NAT Gateway in the same availability zone.**
- **ทำไมถึงผิด:** ซดงบประมาณผลาญเงินทิ้ง! ยัดท่อปั๊ม NAT Gateway ประเคนให้ 2 ตัวไปเลยจุกๆ กองใน 1 โซน AZ!
NAT 1 ตัวของ AWS ไม่ใช่ไก่กามันรองรับพายุแบนด์วิดท์อ้าปากรับได้สเกลทะลุถึง 45 Gbps ถือว่ามหาหินเกินจุดพีคระดับเซิร์ฟเวอร์ประเทศ แถมตัวเองก็มีอะไหล่กลไกท้าความตายสลับวงจรหลังบ้านเผื่อพังให้ในตัวอยู่แล้ว (Built-in redundant) การประเคน 2-3 ตัวในตึกเดียวกันไม่มีช่วยเรื่องเซฟตี้โซนไฟลัดวงจรได้ดีกว่า 1 ตัว แถมค่าเช่าเครื่อง NAT แบบรายชั่วโมงจะทำเอาเงินบริษัทแห้งกรอบ (Not cost-effective) 

❌ **[ผิด] Create three NAT Gateways in each availability zone. Configure the route table in each private subnet to ensure that instances use the NAT Gateway in the same availability zone.**
- **ทำไมถึงผิด:** เละทะไปใหญ่! นี่ก็บ้าพลังประเคนปั๊ม NAT เข้าไปยัดตั้ง 3 ตัวอัดแน่นๆ ใน 1 โซน ผิดด้วยเหตุผลข้อควายล้วนๆ โดนชาร์จค่าบริการรายชั่วโมงฉิบหายนับแสนดอลต่อปี โดยที่ไม่ได้ผลเรื่องความคุ้มค่า (Cost-effective) แต่อย่างใด 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **NAT Gateway**: ฮีโร่ผู้ยอมยืนตากแดดอยู่ใน Public Subnet หิ้วถังอ็อกซิเจนถ่ายเทอินเทอร์เน็ตไปส่งต่อให้เซิร์ฟเวอร์น้อยๆ ที่แอบเก็บตัวใน Private Subnet (ซึ่งออกเน็ตตรงๆไม่ได้) ได้มีโอกาสดึงแพตช์ ดาวน์โหลดอัพเดตซอฟต์แวร์ Windows หรือต่อคิวอัพเกรด Linux จากโลกภายนอก โดยความเจ๋งคือมัน "เปิดทางออกให้อย่างเดียว แต่ถ้าสลัดโลกภายนอกจะตีเนียนแฮกยิงสวนกลับผ่านท่ออินเทอร์เน็ตนี้เข้ามาไม่ได้เด็ดขาด"
- **การคิดเงิน NAT Gateway**: เขาชาร์จคุณ 2 เด้งนะครับ 1. ค่าเอาเครื่องไปวางทิ้งไว้ (Hourly Rate) และ 2. จำนวนปริมาณข้อมูลที่ขอดึงไหลผ่านมัน (Data Processing Charge/GB) ฉะนั้นอย่าวางมั่วถ้าคุณไม่รวยพอ

---
---

## 📌 คำถามที่ 39
**โจทย์:**
A telecommunications company is planning to grant AWS Console access to its developers. Company policy requires the use of identity federation and role-based access control. Currently, the roles are already assigned via groups in the corporate Active Directory.

In this scenario, what combination of the following services can provide developers access to the AWS console? (Select TWO.)

**ตัวเลือก:**
- [x] IAM Roles
- [ ] AWS Lambda
- [x] AWS Directory Service AD Connector
- [ ] AWS Directory Service Simple AD
- [ ] IAM Groups

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทโทรคมนาคมหน้าเลือดเตรียมเปิดประตูคอนโซลสวรรค์ AWS ให้เหล่าโปรแกรมเมอร์เข้าแก้งาน แต่มีเงื่อนไขบริษัทบังคับคอไว้เลยว่า "ห้ามสร้างชื่อรหัสแอคเคาท์ใหม่มั่วซั่วเด็ดขาด ต้องจับมัดซิงก์ใช้ระบบแพลตฟอร์มยืนยันตัวตน (identity federation) ที่อุดหนุน **ระบบ Active Directory ค่าย Microsoft ของออฟฟิศเดิมบริษัทอยู่แล้ว** (ซึ่งปัจจุบันมีบันทึกจดรายชื่อตำแหน่ง Roles ลูกน้องแบ่งตามแผนกไว้อีกด้วย)"
โจทย์ต้องการ **คอมโบกาวใจ 2 บริการ** ตัวไหนที่จะผสานประสานรอยแยกให้ Active directory บริษัทกับเมฆ AWS กอดรวมทำบัตรประชาชนใบเดียวกันได้ราบรื่น? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดบังคับให้ใช้ศูนย์ข้อมูลตัวตนบนคลาวด์บริษัทเชื่อมต่อกับ **`corporate Active Directory`** ไม่สร้างออฟฟิศใหม่ = บริการที่สะพานลอยโยงผ่านคือ **`AWS Directory Service AD Connector`** (คำว่า Connector บอกนิสัยชัดเจนว่าทำหน้าที่แค่เชื่อม ไม่ได้กักเก็บข้อมูลไว้เอง)
- ทริคที่ 2: พอใช้สะพานเสร็จ AWS ต้องการชุดสูทเพื่อรู้ว่าพนักงานคนนี้เดินเข้ามาในแอปแล้วทำอะไรได้บ้าง คีย์เวิร์ดบังคับให้ใช้ระบบสิทธิแบบ **`role-based access control`** = พนักงานจึงต้องถูกสวมทับด้วยเสื้อคลุมที่ชื่อว่า **`IAM Roles`** (ไม่ใช้ IAM User หรือ IAM Group เพราะพวกงั้นเป็นชาวประชาตัวติดดินที่ถูกสร้างกำเนิดบนผืนแผ่นดิน AWS ซึ่งขัดกับภาพ Identity federation ที่รับคนแปลกหน้ามาเยี่ยม)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Directory Service AD Connector**
- **ทำไมถึงถูก:** เติมเต็มการวางสะพาน! **AD Connector** เป็นตัวแทนเกตเวย์อัจฉริยะที่ชาญฉลาด มันจะไม่สร้างข้อมูลโปรไฟล์ใหม่เซฟเก็บไว้บน AWS เลย แต่มันเบี่ยงคิวทำหน้าที่ส่องต่อ "รับคำขอกรอกรหัสล็อกอินกล่องหน้า Console จากโปรแกรมเมอร์ -> วิ่งมุดทะลุท่อกลับไปเคาะประตูส่งข้อมูลให้เซิร์ฟเวอร์ Microsoft หน้าบริษัท (corporate Active Directory) เป็นคนประทานพรตรวจสอบรหัสแทน" ตอบสนองกฎระเบียบ Identity Federation ไม่สร้างรหัสแปลกแยกใหม่

✅ **[ถูกต้อง] IAM Roles**
- **ทำไมถึงถูก:** ชุดเกราะแห่งอำนาจทิพย์! เมื่อ AD Connector โทรไปถามออฟฟิศละตอกบัตรว่า "โอ๊ะ! นาย ก. คือโปรแกรมเมอร์แท้ของบริษัทเราชัวร์" หน้าที่ต่อไปเพื่อให้เขาเดินเปิดเมนูดูเซิร์ฟเวอร์เข้า AWS ได้ตามสั่งก็คือ เขาต้อง **"สวมรอยร่างวิญญาณ (Assume role)"** รับชุดเกราะอำนาจจาก **IAM Roles** ที่เราเผื่อเตรียมไว้ให้ก่อน เช่น Role "นักพัฒนา" จะโชว์ใบอนุญาตทำลาย สร้าง เตะ EC2, S3 ได้แค่ไหน ซึ่งเราแมปคู่กะกลุ่ม Active Directory ออฟฟิศให้สอดประสานกันอย่างลงตัว (role-based access)

❌ **[ผิด] AWS Directory Service Simple AD**
- **ทำไมถึงผิด:** เดินผิดตรอก! **Simple AD** เปรียบเสมือนการเปิดคอร์สสอนเปิดฐานเซิร์ฟเวอร์โดเมนก๊อบปี้แกะกล่องใหม่กริ๊บ บนวงเครือข่ายของ AWS เอง (Standalone) มันถูกออกแบบมาประหยัดตังค์ให้คนเพิ่งตั้งบริษัท แต่การสร้างทวีปป่าเขตร้อนใหม่แยกตัดขาดกับเมืองหลวงบริษัท (On-premise Active Directory) แบบนี้ ย่อมทำให้มันไม่สามารถเชื่อมโยงแชร์ข้อมูลมัดรวมข้ามโลกจากบริษัทแม่หน้าออฟฟิศมาผูกรวมมิตร (Federation) ได้ โค่นจุดหมายทิ้งทั้งหมด 

❌ **[ผิด] IAM Groups**
- **ทำไมถึงผิด:** หยิบผิดเครื่องมือเด็ดขาด! คุณจับนาย ก. มารวมแก๊งด้วยฟีเจอร์พิทักษ์มาเฟียที่ชื่อ **IAM Groups** ไม่ได้หรอก เพราะชนชั้นพวกเขาไม่มีตัวตนเป็น "ลูกคนรวยทะเบียนราษฎร์ IAM Users" ท้องถิ่นที่กำเนิดเกิดแต่ในแผ่นดินดิน AWS ตั้งแต่แรก (พนักงานมาจากดาวอื่น Federation) การเอาอากาศลมเบิกตั๋วมาใส่เข้า IAM Groups ก็เข้าอีหรอบดร็อปแว่นใช้การไม่ได้ ทิศทางผูกเข้ากับ Federation ตีตราแปลกหน้าต้องคุมฝูงอิงไปเกาะกับ "IAM Roles สวมวิญญาณสิทธิ์ชั่วคราว" เท่านั้นจึงจะชอบธรรม

❌ **[ผิด] AWS Lambda**
- **ทำไมถึงผิด:** หนีไปออกอ่าวทะเลลึกถึงกู่ไม่กลับ! **AWS Lambda** เกิดมาเพื่อประมวลผลโค้ดสคริปต์ Serverless ทำงานแบ็คกราวด์โปรเซสคณิตศาสตร์ส่ายไข่ ไม่มีวุฒิภาวะหน้าที่เกกมะเหรกในการมาตั้งศาลเซิร์ฟฟันธงยืนยันป้ายประกาศรับรองชื่อล็อกอิน (Authentication) ให้ใครผ่านกระต๊อบรั้วชานแดนเข้าเขต AWS แต่อย่างใดทั้งสิ้น ช้อยส์ตลกหลอกตาที่จับยัดมาเฉยๆ! 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Directory Service (Active Directory ฉบับคลาวด์)**: 
  - *AWS Managed Microsoft AD*: สร้างฐานเซิร์ฟเวอร์ลูกเศรษฐีไฮโซของแท้จาก Microsoft บน AWS เชื่อมลิงก์ทรัสต์โอนข้อมูลไปคุยกะปู่ย่าบรรพบุรุษที่ออฟฟิศ On-prem ได้
  - *AD Connector*: รปภ. ด่านสกัดกั้น ไม่ยอมแบกฐานข้อมูลไว้เอง โอนเรื่องส่งต่อคนเดินทะลุกลับไปเช็ครหัสกับเครื่องปู่ย่าหน้าออฟฟิศทั้งหมด
  - *Simple AD*: สร้างดินแดนเด็กกำพร้าราคาถูกโดดเดี่ยว ไม่ลิงก์ทรัสต์กับชาวโลกภายนอก

---
---

## 📌 คำถามที่ 40
**โจทย์:**
An application that records weather data every minute is deployed in a fleet of Amazon EC2 Spot instances and uses a MySQL RDS database instance. Currently, there is only one Amazon RDS instance running in one Availability Zone. The database needs to be improved to ensure high availability by enabling synchronous data replication to another RDS instance.

Which of the following performs synchronous data replication in RDS?

**ตัวเลือก:**
- [x] RDS DB instance running as a Multi-AZ deployment
- [ ] Amazon CloudFront running as a Multi-AZ deployment
- [ ] Amazon DynamoDB Read Replica
- [ ] RDS Read Replica

---
### 🎯 โจทย์ต้องการอะไร?
แอปจดบันทึกฟ้าฝนอากาศทุกอณูนาที ฝังตัวรันโปรแกรมอยู่บนหมู่ตึกเช่ากระจอกราคาถูก Amazon EC2 Spot instances รันควบดูดข้อมูลกะฐานข้อมูล **MySQL ผ่าน Amazon RDS ร่างเดียวเดี่ยวๆ โหย่งๆ ใน 1 โซนตึก AZ**
สวรรค์มีบัญชาลงมาว่าฐานข้อมูลอันบอบบางนี้ "ต้องถูกอัปเกรดให้คงกระพันตายยากต่อความเสี่ยงภัย (High Availablity)" ผ่านกลไกกาวใจนั่นคือ **"คัดลอกก๊อปปี้เทผงข้อมูลสดๆ ทุกเม็ดแบบจังหวะประสานเป็นเนื้อเดียวกันก้าวต่อก้าว (synchronous data replication)"** ลามตีล้อมส่งวิญญาณไปสะปอยที่ก้อนเซิร์ฟเวอร์ RDS สำรองตึกโซนอื่นอีกตัว! 
โจทย์ทดสอบความจำว่า: ฟีเจอร์วิเศษตัวใดของขุนพล RDS ที่เสกกางมนต์ปั๊มตับกระซวกซิงค์โคลนข้อมูลในร่าง **"Synchronous (ซิงโครนัส / ประสานจิตพร้อมกัน)"** ตามที่เบื้องบนประสงค์? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: กฎเหล็กของนักดาบจงจำไว้ **`RDS`** บริการนี้ชูโรงโหมดตัวตายตัวแทนปั๊มหัวใจ **`High Availability`** ได้ด้วยการงัดฟีเจอร์เด็ดตีคู่ข้ามโซนตึกชื่อว่า **`Multi-AZ deployment`** 
- ทริคที่ 2: จำคำพ่วง! **`Multi-AZ deployment`** = รูปแบบของมันเป็นการเบ่งโคลนข้อมูลดิสก์ต่อดิสก์หลังม่านชนิดที่ว่า "เขียนตึก A ประทับตึก B เสร็จปุ๊บ จึงค่อยปล่อยผ่าน" แปลว่าจังหวะมันเดินพร้อมกันเป๊ะๆ จึงเรียกว่า **`Synchronous replication`**
- ทริคที่ 3: ระวังปีศาจร้าย **`Read Replica`** หลอกหลอน! ฟีเจอร์ Read Replica ปั้นสลักตัวก๊อปปี้ออกมาเพื่อเป้าหมาย "ระบายความแออัดคนอ่าน (Read scalability)" และรูปแบบนิสัยก๊อปปี้ของมันเป็นพวกเฉื่อยชาจดเลคเชอร์ต้อยๆตามหลัง (รอเซิร์ฟแม่เขียนก้อนตัวเองให้เสร็จสบายใจก่อนค่อยทะลักแจกจ่ายลูก) จึงเรียกว่าพฤติกรรมนี้ว่า **`Asynchronous replication` (อะซิงโครนัส / ตามหลัง)** (เห็น Synchronous ให้กา Multi-AZ เห็น Asynchronous ให้กา Read Replica ทันที!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] RDS DB instance running as a Multi-AZ deployment**
- **ทำไมถึงถูก:** ไหลลื่นเข้าประตูดังปัง! เข้าไปห้องใต้ดินเสกคาถารดน้ำมนต์เปิดปุ่มสไลด์ชื่อ **Multi-AZ Deployment** ยกระดับดึงศักยภาพพระเจ้า RDS ดึงตึกกระจกเงาดันร่างเซิร์ฟคู่ขนานขึ้นมาสแตนบายอีกครึ่งซีก Availability Zone เคล็ดลับของการทำงานสุดหรู Multi-AZ นี้คือ ทันทีที่มีฝนตกลงข้อมูลเขียนบึกลงประทับหน้าตักฮาร์ดดิสก์หลักโซนตึกแรก... เมฆ AWS จะก๊อปปี้คราบเม็ดฝนที่ยังร้อนฉ่าลงไปบึกลงตีพับเขียนทับบนฮาร์ดดิสก์อีกตึกในเสี้ยววิ "พร้อมๆ กันรอให้เสร็จเป๊ะๆ ครบ 2 ฝั่งถึงออกตราเสร็จสิ้น" ปรากฎการณ์แฝดจิตสั่งประทับพร้อมกันนี้ถูกประทับตรานิยามทางอภิปรัชญาว่า **Synchronous Data Replication** ตอบโจทย์นายเหนือหัวอย่างเป๊ะปังร้อยเปอร์เซ็นต์

❌ **[ผิด] RDS Read Replica**
- **ทำไมถึงผิด:** แฝดนอกคอก! การสร้างแฝดขี้ข้าไว้คอยตั้งป้อมระบายแจกจ่ายให้คนแห่อ่านอย่างเดียว **Read Replica** ปั้นมาเพื่อเพิ่มพลังอัพสปีดขยายตัวรับงานเสิร์ฟกราฟ (Performance) แต่สไตล์คัดลอกนิสัยของมันดั๊นทะลึ่งตรงข้ามกับบรรทัดฐานซิงค์พร้อมกัน เพราะมันดึงข้อมูลลอยตัวทำงานเลคเชอร์ตามหลังจังหวะเซิร์ฟแม่ก้าวครึ่ง (เซิร์ฟเวอร์หลักเขียนเสร็จชิลล์ไปหนึ่งถึงสองวิ เซิร์ฟแฝดตัวนี้ค่อยรับใบสั่งจดบรรจงเก็บออยๆตาม) พฤติกรรมเยิ่นเย้อล้ำเส้นแบบนี้เราขนานนามทับศัพท์แสนเก๋ไกว่า "Asynchronous Replication (อะซิงโครนัส)" ซึ่งขัดกับโจทย์คีย์เวิร์ดอย่างร้ายกาจ! 

❌ **[ผิด] Amazon DynamoDB Read Replica**
- **ทำไมถึงผิด:** นั่งจินตนาการนอกโลกเหรอเนี่ย? จับแพะขี่ยานอวกาศชนแกะกันเลยทีเดียว นอกจากจะมั่วซั่วพาหนีราชการแอบย้ายทรงเซิร์ฟเวอร์ไปพึ่งพิงก้อนบริการฐานแบบ NoSQL หน้าใหม่อย่างฝั่ง **DynamoDB** (โจทย์บังคับให้คุม MySQL ตัวดีตัวเดิม) สิ่งที่ขำขันบรรลัยหลวงที่สุดคือ บริการขุมทรัพย์ระดับท๊อปเทียร์ DynamoDB โดยกำเนิดเนื้อแท้มันไม่มีฟีเจอร์พื้นๆ ชาวบ้านช่องที่เรียกว่า Read replica สร้างแฝดขี้ข้าลูเซอร์พวกนี้เลย! เทพอย่างมันใช้วิชาสร้างปะรำพิธียิ่งใหญ่ชื่อ Amazon DynamoDB Global Tables ในการซิงค์ข้อมูลกวาดโลกต่างหากว้อย 

❌ **[ผิด] Amazon CloudFront running as a Multi-AZ deployment**
- **ทำไมถึงผิด:** เมาชาไข่มุกมาใช่มั้ย! ลากเครื่องขยายกระแสไฟซิกหน้าเว็บรันตัวพ่ออย่าง **CloudFront** ขึ้นมายำทอดหน้าจอเป็นแฝดขี้เหล่ CloudFront เป็นจานดาวเทียมที่ตากแห้งเสิร์ฟก๊อปปี้คอนเทนต์รูปภาพ/วิดีโอ (CDN) ให้โหลดคลิกปุ่มแวบติดไวๆ ไปส่งยันดาวอังคาร มันเป็นเกราะกระจายหน้าเว็บ ไม่ใช่ห้องสมุดทฤษฎีกระดาษที่จะมายุ่งโคลนนิ่งตารางพิมในซาเล้งรถบรรทุกอย่างฐานข้อมูล (Database replication) เลยสักนิด! 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
**ทบทวน RDS Database Features: (ท่องให้ขึ้นใจ!)**
- **Multi-AZ Deployment**:
  - *จุดประสงค์*: Disaster Recovery กู้ภัยพิบัติตึกถล่ม / High Availability (HA) ทำเซิร์ฟเวอร์ไม่ให้ดับ
  - *รูปแบบการก๊อปปี้*: **Synchronous** (ทำพร้อมกัน 2 ดิสก์ คอนเฟิร์มเสร็จช้าลงกระจึ๋งนึง แต่ได้ความชัวร์ 100%)
  - *สถานะสำรอง*: ร่างสลบสแตนบาย (Standby) เอามาดึงข้อมูลสุ่มอ่านเล่นๆระหว่างรอไม่ได้
- **Read Replica**:
  - *จุดประสงค์*: Read Scalability กระจายภาระคนดึงเปิดอ่านกราฟรายงานไม่ให้เซิร์ฟหลักเหนื่อยหนัก
  - *รูปแบบการก๊อปปี้*: **Asynchronous** (เซิร์ฟแม่เสร็จก่อนแล้วค่อยผลักงานให้ลูกจดตาม ข้อมูลอาจจะกะพริบดีเลย์หน้าเว็บฝั่งคนเสพติดนิดนึง)
  - *สถานะสำรอง*: เปิดหูเปิดตาให้เข้าไปจิ้มล้วงสอบถามชิลล์ๆ ได้ตลอด

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 9: ข้อ 41 - 45)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 41
**โจทย์:**
A suite of web applications is hosted in an Auto Scaling group of Amazon EC2 instances across three Availability Zones and is configured with default settings. There is an Application Load Balancer that forwards the request to the respective target group on the URL path. The scale-in policy has been triggered due to the low number of incoming traffic to the application.

Which EC2 instance will be the first one to be terminated by the Auto Scaling group?

**ตัวเลือก:**
- [ ] The instance will be randomly selected by the Auto Scaling group
- [ ] The EC2 instance which has been running for the longest time
- [ ] The EC2 instance which has the least number of user sessions
- [x] The EC2 instance launched from the oldest launch template.

---
### 🎯 โจทย์ต้องการอะไร?
แอปพลิเคชันทำงานอยู่บนกลุ่ม **Auto Scaling Group ของ EC2** วางกระจายครอบคลุมข้าม 3 ตึก (Three Availability Zones) โดยระบบถูกตั้งค่าไว้แบบ**ค่าตั้งต้นพื้นฐาน (default settings)** 
เมื่อถึงยามดึก ยอดคนใช้งานเว็บลดลง นโยบายหดลดขนาดตัว **(scale-in policy)** ก็ถูกจุดชนวนให้เริ่มทำงานเพื่อปิดเครื่องประหยัดค่าไฟ 
โจทย์ต้องการเป๊ะๆ ว่า **"ภายใต้กฎเกณฑ์ Default นี้ Auto Scaling จะเลือกเล็งปืนฆ่า (terminated) เครื่อง EC2 เครื่องไหนทิ้งเป็นศพแรก?"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: นี่คือข้อสอบท่องจำกฎเหล็กของระบบสเกล! คำตอบตายตัวของกฎการหดตัวลดเครื่อง (Default termination policy) คือ "ระบบจะต้องฆ่าเครื่องที่ล้าหลังสุด หรือมาจากแม่พิมพ์เเบบร่างรุ่นเก่ากึ๊กที่สุดเสมอ" = มองหาช้อยส์ที่มีคำว่า **`oldest launch template`** หรือ **`oldest launch configuration`** กาได้เลย!
- ทริคที่ 2: **ห้ามตอบว่ามันจะมองหาเครื่องที่คนใช้น้อยสุด `least number of user sessions`** เพราะ Auto Scaling เป็นแค่ยามคุมจำนวนเครื่องเหล็ก มันไม่ได้ฉลาดขนาดล้วงตับเข้าไปส่องดูว่าในโปรแกรมเว็บมีแขกนั่งคลิกอยู่กี่คน! 
- ทริคที่ 3: **ห้ามตอบสุ่มฆ่ามั่วซั่ว `randomly selected`** AWS จะใช้วิธีจับฉลากสุ่มฆ่าก็ต่อเมื่อ มันค้นพบว่าเครื่องทุกเครื่องหน้าตาเหมือนกันเป๊ะ 100% (แม่พิมพ์เวอร์ชันเดียวกันเป๊ะ, เปิดมาพร้อมกันเป๊ะ) ซึ่งเป็นการตัดสินใจใน "ก๊อกสุดท้าย" ไม่ใช่ตรรกะข้อแรกที่จะเกิด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The EC2 instance launched from the oldest launch template.**
- **ทำไมถึงถูก:** ธรรมชาติของการตั้งค่า Default termination policy ของ Auto Scaling เวลามันโดนสั่งให้หดเครื่อง มันจะไล่ขั้นตอนโหดเหี้ยมดังนี้ครับ:
  1. ไปเช็คว่า โซนตึก AZ ไหนมีเครื่องเยอะสุดกระจุกกันอยู่? ให้ไปฆ่าตึกโซนนั้นก่อน เพื่อให้ทุกโซนมีจำนวนเครื่องสมดุลเท่าๆ กัน
  2. ถ้าบังเอิญแต่ละโซนตึกดันมีจำนวนเครื่องเท่ากันเป๊ะ มันจะดึงกฎข้อต่อไปมาตัดสินคือ **"เครื่องไหนถูกสร้างมาจากแม่พิมพ์ (Launch Template / Configuration) ฉบับพิมพ์เก่าที่สุด ให้ลากคอมันมาตึกคอทิ้งซะ!"** เหตุผลเพราะ AWS หวังดี อยากทิ้งเครื่องที่เกิดจากแม่พิมพ์อัปเดตใหม่ล่าสุดเอาไว้ให้บริการลูกค้านั่นเอง ช้อยส์นี้จึงถูกต้องตามตรรกะชั้นที่สอง

❌ **[ผิด] The EC2 instance which has the least number of user sessions**
- **ทำไมถึงผิด:** มโนไปเอง! ภายในตัวยามขยายเครื่องอย่าง Auto Scaling ร่างปกติ มันไม่ได้ติดเครื่องสแกนกรรมทะลวงฝังบ่อง Session ภายในแอป มันไม่รู้เลยด้วยซ้ำว่าเครื่องไหนกำลังให้บริการป้อนหน้าเว็บให้แขกกี่คน (มันจัดการระดับโครงสร้างโฮสต์ก้อนเหล็ก ไม่ใช่ระดับทราฟฟิกแอป)

❌ **[ผิด] The EC2 instance which has been running for the longest time**
- **ทำไมถึงผิด:** ไม่ได้สนใจอายุขัย! ระบบ Default policy ไม่เคยมองปัจจัยเรื่องอายุ(Uptime) ของตัวตึกเครื่อง EC2 เลยว่า "นาย A เปิดทิ้งมา 100 วันต้องตายก่อนเพื่อนนะ" มันแคร์แค่ว่าตอนคุณสั่งสร้างเครื่องตัวนี้ขึ้นมา คุณใช้ "แบบแปลนแม่พิมพ์ (Template)" เวอร์ชันเก่าหรือเวอร์ชันใหม่ต่างหาก 

❌ **[ผิด] The instance will be randomly selected by the Auto Scaling group**
- **ทำไมถึงผิด:** มั่วไร้กระบวนท่า! AWS ไม่ได้หลับตาโยนหินสุ่มฆ่าตั้งแต่แรก มันมีลำดับอัลกอริธึม (เช็ค AZ ลดความแออัด -> เช็คเวอร์ชันแม่พิมพ์ -> เช็คแพ็กเกจราคาบิลลิ่ง) ไว้ไล่บี้พิจารณาก่อนเสมอ จนกระทั่งถึงจุดตีตันที่พิจารณาแล้วว่า "เห้ย เครื่องพวกนี้มันฝาแฝดชัดๆ แม่พิมพ์เดียวกัน AZ เดียวกัน" มันถึงจะจิ้มจับฉลากสุ่มฆ่าเป็นขั้นตอนหางแถว ไม่ใช่คำตอบแรก

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Auto Scaling Termination Policy (สรุปลำดับการเชือด)**:
  1. (ถ้าไม่ได้กำหนดอะไร) ฆ่า Instance ใน AZ ที่มี Instance เยอะสุดก่อน (เพื่อรักษา Balance)
  2. ฆ่า Instance ที่ใช้ Launch Configuration / Launch Template เก่าสุด
  3. ฆ่า Instance ที่กำลังจะครบชั่วโมงการคิดเงิน (ใกล้แตะขอบบิลลิ่งรอบถัดไป)
  4. ถ้ามีหลาย Instance เข้าข่ายเท่ากันก๊อปปี้มาหมดเลย -> สุ่ม Random ทิ้ง!

---
---

## 📌 คำถามที่ 42
**โจทย์:**
A Solutions Architect identified a series of DDoS attacks while monitoring the Amazon VPC. The Architect needs to fortify the current cloud infrastructure to protect the data of the clients.

Which of the following is the most suitable solution to mitigate these kinds of attacks?

**ตัวเลือก:**
- [ ] Set up a web application firewall using AWS WAF to filter, monitor, and block HTTP traffic.
- [ ] A combination of Security Groups and Network Access Control Lists to only allow authorized traffic to access your VPC.
- [x] Use AWS Shield Advanced to detect and mitigate DDoS attacks.
- [ ] Using the AWS Firewall Manager, set up a security layer that will prevent SYN floods, UDP reflection attacks, and other DDoS attacks.

---
### 🎯 โจทย์ต้องการอะไร?
สถาปนิกระบบพบเห็นร่องรอยหน้าจอแดงเถือกจากการโจมตีแบบ **DDoS (Distributed Denial of Service - เอาหุ่นเครื่องซอมบี้มารุมยิงหน้าเว็บพร้อมกันเป็นล้านครั้งจนเซิร์ฟเวอร์สำลักระเบิดดับ)** โถมบุกเข้ามาที่ระบบเครือข่าย VPC 
โจทย์ต้องการหาอุปกรณ์ติดตั้งชิ้นไหนที่เหมาะสมเกิดมาเพื่อจุดธูป **"ต่อต้านระงับยับยั้งการโจมตี DDoS ชนิดนี้โดยเฉพาะ (mitigate these kinds of attacks)?"** 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ตารางแมพอาวุธระดับตำนาน: เห็นคีย์เวิร์ดมาเฟียสั่งยิงถล่ม **`DDoS attacks`** = ซลูชั่นต้านทานโล่กัปตันอเมริกาตัวเดียวในจักรวาล AWS ที่เกิดมาเพื่อสิ่งนี้คือ **`AWS Shield`** (โหมดฟรีป้องกันขั้นต่า, โหมด Advanced เอาไว้สู้กะตัวละครลับระดับโลก) 
- ทริคที่ 2: ระวังแฝดนรก **`AWS WAF` (Web Application Firewall)** ตัว WAF มีสกิลปัดป้องคนนิ้วซนที่พยายามมากดพิมพ์เจาะแฮกเข้ารหัสหลังบ้าน เช่น บังคับยิง `SQL Injection / XSS` แต่พละกำลังร่างกายของ WAF มันต้านพายุยิงน้ำป่าไหลหลากทะลักแบบ DDoS ไม่ไหว! 
- ทริคที่ 3: **ตัด รปภ. หละหลวมอย่าง `Security Groups` กับ `Network Access Control Lists (NACL)` ทิ้งเรียบ** รปภ.หน้าหมู่บ้านพวกนี้เช็คตรวจจับแค่เลข IP ขาเข้าขาออกบ้านๆ กะหลั่วๆ เจอพายุซอมบี้ DDoS เปลี่ยน IP เป็นแสนตัวมายืนอัดเต็มหน้าประตู ไฟร์วอลล์กระจกของ SG ก็พังแหกทะลุอยู่ดี 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Shield Advanced to detect and mitigate DDoS attacks.**
- **ทำไมถึงถูก:** ถูกเผงกระแทกใจ! **AWS Shield** คือองค์รักษ์โล่เหล็กที่ AWS ถวายมาเกิดมาเพื่อสะกัดกั้นแคมเปญระรานอย่าง DDoS โดยเฉพาะ! ซึ่งตามปกติเราทุกแอคเคาท์จะได้เกราะ Shield Standard ฟรีเป็นค่าเริ่มต้น แต่เมื่อกระสุนโจทย์ระบุว่าถึงขั้นกำลังโดนยิงถล่ม การร่ายมนตร์เรียกอัปเลเวลจ่ายเงินซื้อ **AWS Shield Advanced** จะเป็นการปลดล็อกทีมสอยร่วงระดับเทพ (AWS DDoS Response Team) ปรับโล่รับมือพายุขั้นสูง และของแถมสุดคุ้มคือมีชดเชย "จ่ายบิลค่าตกใจหน้ามืดให้" (เช่น ถ้ายอดใช้งาน EC2 พุ่งทะลวงดวงจันทร์ช่วงโดนยิงฟรีๆ AWS จะเคลียร์บิลให้) รับมือตรงประเด็น 100%

❌ **[ผิด] Set up a web application firewall using AWS WAF to filter, monitor, and block HTTP traffic.**
- **ทำไมถึงผิด:** เอาระบบกันฝุ่นไปกันพายุ! **AWS WAF** มันฉลาดเรื่องสแกนกลั่นกรองภัยคุกคามในระดับเนื้อแอป (Layer 7) เช่น ป้องกันแฮกเกอร์ฝังโค้ดไวรัสในช่องคอมเมนต์ (SQL Injection / XSS) แม้มันจะถูกตั้งค่าให้มีพอกันสแปมบล็อก IP กวนตีนเบาๆ ได้ แต่มันไม่ได้มีถังน้ำมันกระดองเหล็กที่ทนทานรับมือกับปริมาณทราฟฟิกยิงอัดพังตึกระดับเน็ตเวิร์กของ DDoS ของแท้ได้ ต้องยกหน้าที่บุกทะลวงให้ AWS Shield เท่านั้น 

❌ **[ผิด] Using the AWS Firewall Manager, set up a security layer that will prevent SYN floods, UDP reflection attacks, and other DDoS attacks.**
- **ทำไมถึงผิด:** หยิบสว่านเจาะไปใช้ขันน็อต! **AWS Firewall Manager** เป็นเพียง "กระดานจดบัญชาการหลังบ้าน (Admin Console)" เอาไว้บริหารจัดการสั่งกระจายสาดกฎ WAF รวดเดียวให้พนักงานบริษัทลูกหลายๆ Accounts พร้อมกัน ตัวมันเองไม่ได้ลุยลงสนามสู้รบฟันแทงสกัด SYN floods, UDP กระจายยิงใครหน้าไหนทั้งนั้น (มันแค่ชี้หน้าสั่งให้คนอื่นทำ ไม่ใช่ฮีโร่สายป้องกันโดยตรง)

❌ **[ผิด] A combination of Security Groups and Network Access Control Lists to only allow authorized traffic to access your VPC.**
- **ทำไมถึงผิด:** เหมือนเอาร่มกระดาษไปบังคลื่นสึนามิ! NACL กับ SG มันทำงานแบบก๊อกกิ๊ก ตรวจแค่ "บ้านเลขที่" IP ขาเข้าขาออกธรรมดา เจอพายุ DDoS ระดับเรือล้านบอทที่พรางตัวยิงอัดพรวดเข้ามาพร้อมกัน ไฟร์วอลด่านประตูเหล็กกระป๋องพวกนี้จะหน่วงตื้อ คอขวดจนสำลักตายระเบิดพังแหกกระจายทนรับน้ำหนักแบนด์วิธไม่ไหวอย่างง่ายดาย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Shield (Standard vs Advanced)**:
  - *Standard*: ฟรีติดมากับทุกอย่างใน AWS ช่วยปัดเป่า DDoS กิ๊กก๊อกที่มักเจอบ่อยระดับ Layer 3/4 ได้เบื้องต้น
  - *Advanced*: จ่ายแพงหูฉี่ (เดือนละหลายแสนบาท) แต่มาพร้อมสายด่วนอรหันต์ โทรเรียกให้ผู้เชี่ยวชาญ AWS มาช่วยกอบกู้เว็บตอนโดนยิงได้เลย พร้อมรับประกันไม่คิดตังค์ค่าบิลลิ่งกระฉูดเวลาโดนปั๊มทราฟฟิกปลอมใส่เว็บ

---
---

## 📌 คำถามที่ 43
**โจทย์:**
A tech company that you are working for has undertaken a Total Cost Of Ownership (TCO) analysis evaluating the use of Amazon S3 versus acquiring more storage hardware. The result was that all 1200 employees would be granted access to use Amazon S3 for the storage of their personal documents.

Which of the following will you need to consider so you can set up a solution that incorporates a single sign-on feature from your corporate AD or LDAP directory and also restricts access for each individual user to a designated user folder in an S3 bucket? (Select TWO.)

**ตัวเลือก:**
- [ ] Map each individual user to a designated user folder in S3 using Amazon WorkDocs to access their personal documents.
- [x] Configure an IAM role and an IAM Policy to access the bucket.
- [x] Set up a Federation proxy or an Identity provider, and use AWS Security Token Service to generate temporary tokens.
- [ ] Set up a matching IAM user for each of the 1200 users in your corporate directory that needs access to a folder in the S3 bucket.
- [ ] Use 3rd party Single Sign-On solutions such as Atlassian Crowd, OKTA, OneLogin and many others.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทวิเคราะห์แล้วว่าขี้เกียจซื้อฮาร์ดดิสก์ จึงจับพนักงานทั้งออฟฟิศ **1,200 คน (1200 employees)** เปิดโยกให้ย้ายไปเก็บข้อมูลงานส่วนตัวบน **Amazon S3** แทน 
โจทย์บรรยายกฎเหล็กไฟว้ 2 ข้อที่สถาปนิกคลาวด์ต้องทำคือ:
1. การล็อกอิน ต้องดึงใช้รหัสประจำตัวเข้างานเก่าเชื่อมทะลุกัน **(Single sign-on feature)** ชิ่งมาจากระบบฐานข้อมูลบัญชีหน้าออฟฟิศ **(corporate AD or LDAP)** โดยไม่มาสร้างสร้างรหัสผ่านมั่วหน้าใหม่ขึ้น
2. พนักงานแต่ละคน "ต้องมองให้เห็นและตะกุยล้วงได้แค่ โฟลเดอร์บ้านใครบ้านมันของตัวเองใน S3 เท่านั้น **(restricts access for each individual user to a designated folder)**" ห้ามเผือกแอบส่องของเพื่อน 
โจทย์ต้องการ **2 ขั้นตอนกระบวนท่า** ที่จะคลี่คลายทำลายเงื่อนไขคู่นี้ได้ราบคาบ 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดต้องการผูกรหัสบัญชีหน้าออฟฟิศมุดเชื่อมมาใช้งาน AWS ให้ใช้ฟีเจอร์คำว่า **`Federation proxy / Identity provider`** (ตั้งตัวแทนเจรจาข้ามระบบ) + ขาดไม่ได้คือพระเอกอย่างบริการ **`AWS Security Token Service (STS)`** ซึ่งมีไว้ระเบิดร่างส่งบัตรจอดรถชั่วคราวให้คนนอกทะลวงเข้าถึง AWS ได้โดยไม่ต้องงอกบัตรถาวร 
- ทริคที่ 2: โดนบังคับว่าพนักงาน 1,200 คนจะต้องมองเห็นกล่องสมบัติ S3 แค่โฟลเดอร์รหัสชื่อตัวเองเท่านั้น ไม่มองเห็นของส่วนรวม! ท่าจบของศาสตร์นี้คือ การจับเหรียญเบิกทางใส่สวมให้พวกเขากลายร่างรวมกันใน **`IAM role`** มัดเดียว พร้อมกับกระดาษสั่งยันต์ **`IAM Policy`** ที่ระบุว่ากระต๊อบ S3 ใคร ก็ให้ล้วงโฟลเดอร์ `${aws:username}` ของมันเท่านั้นพอ (เป็นท่าบังคับประหยัดเวลาแอดมิน)
- ทริคที่ 3: **ตัดช้อยส์ปัญญาอ่อนสร้างถึกมือชิ้นมหากาพย์อย่าง `Set up a matching IAM user for each of the 1200 users` ทิ้งทันที!** แค่คิดจะชวนสร้างแอคเคาส์ยูสเซอร์ AWS นั่งก๊อปปี้คนละใบกว่า 1,200 ชื่อก็ทำลายกฎ SSO อนิจจังจนพนักงานมีรหัส 2 ที่ตีกันวุ่นวายแล้ว 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a Federation proxy or an Identity provider, and use AWS Security Token Service to generate temporary tokens.**
- **ทำไมถึงถูก:** เคลียร์โจทย์ท่าที่ 1 (Single Sign On)! ภารกิจเชื่อมจิตนิมิตพนักงาน 1200 ชีวิตจากบริษัทมาเดินเล่นบน AWS ย่อมต้องพึ่งบารมีคอนเซปต์ "Federation" (ผูกมิตรเจรจา) ตัวออฟฟิศ Active directory บริษัืทจะติดต่อผ่านระบบตัวกลาง (Identity Provider) ส่งหน้าตาแร็กยันต์ใบหน้าผ่านทางปั้นกระดูกเหรียญของ **AWS STS (Security Token Service)** แล้ว STS จะผลิตไฟตัดหมอกผายมือให้เป็น "รหัสใบเบิกทางชั่วคราว (Temporary tokens)" ให้พนักงานวิ่งเข้าบ้าน AWS ได้ฉลุยโดยไม่ต้องแตะหน้าต่างงอกสร้างบัญชีใหม่ใดๆเลยสักนิด 

✅ **[ถูกต้อง] Configure an IAM role and an IAM Policy to access the bucket.**
- **ทำไมถึงถูก:** เคลียร์โจทย์ท่าที่ 2 (กั้นโฟลเดอร์ใครโฟลเดอร์มัน)! เมื่อผู้บุกรุกมีใบเบิกทางคุ้มครองชั่วคราว (Temporary tokens) พนักงานแปลกหน้าเหล่านั้นจะต้องถูกผีสิงนำร่างไปสวมหมวกเกาะกับ **IAM Role** ซะก่อน แล้วจากนั้นทีเด็ดคือแอดมินสลักคำสาปลงในหน้ากระดาษ **IAM Policy** แบบฉลาดรอบเดียวรวบทบว่า "ข้าขออนุญาตให้มึงทะลวงเข้า S3 ได้เฉพาะเส้นทาง `/Bucket/${aws:username}` ที่ตรงกับชื่อล็อกอินผีสิงตัวเองเท่านั้น!" จบปิ๊ง... พนักงาน 1,200 คนก็จะล้วงตาบอดล้วงดูได้แค่โฟลเดอร์ส่วนตัวของใครของมันสวยงาม

❌ **[ผิด] Set up a matching IAM user for each of the 1200 users in your corporate directory that needs access to a folder in the S3 bucket.**
- **ทำไมถึงผิด:** แอดมินมือระเบิด! นั่งงมกะโหลกถึกหน้าคอมนั่งจิ้มกดปุ่มสร้างบัญชี IAM User ด้วยมือดื้อๆ ทีละคนออโต้บน AWS ก๊อปปี้ขนานไปเลย 1,200 บัญชีรวด... มันขัดกับภาพลักษณ์สุดหรูของ Single Sign-on (SSO) พนักงานจะมีบัญชีซ้ำซ้อน 2 ที่ให้จำรหัสผ่านเพิ่ม ถ้ายิง Federation อิงระบบรหัสเช็คหน้าประตูบริษัทเดียวก็จบแล้ว 

❌ **[ผิด] Use 3rd party Single Sign-On solutions such as Atlassian Crowd, OKTA, OneLogin and many others.**
- **ทำไมถึงผิด:** นอกเรื่องพาหนีไปจ่ายตังแพงๆ ซื้อบริการล็อกอินเครื่องข่ายบริษัทจัดสรรนอกอย่าง OKTA หรือ OneLogin... โจทย์ตีกรอบกำหนดมาโคตรชัดว่าอยากให้ทำ SSO โดยเกาะกระแสกับระบบ " corporate AD or LDAP เก่าที่มีอยู่แล้วในรูออฟฟิศ" ไม่ได้อ้อนวอนชิงถามว่าจ้างซอฟต์แวร์นอกเจ้าไหนดี AWS มีเครื่องมือพึ่งตนเองอย่าง STS จัดการเนียนๆ ให้ฟรีอยู่แล้วไม่ต้องเสียเงินจ้างโจรให้มันสูบงบ 

❌ **[ผิด] Map each individual user to a designated user folder in S3 using Amazon WorkDocs to access their personal documents.**
- **ทำไมถึงผิด:** บ้าบอเอาเป็ดไปบิน! จับคู่พนักงานให้ใช้โปรแกรมซอฟแวร์ซิงค์งานเอกสาร **Amazon WorkDocs** มุดเข้าทะลวงโฟลเดอร์ S3... Amazon WorkDocs เป็นแอปพลิเคชันคลาวด์รับฝากเอกสารแชร์ร่วมแบบ Google drive เอนเทอร์ไพรซ์จริง แต่มันอู้ฟู่สงวนตัวทำงานปิดกั้นอยู่ในอาณาเขตกล่องไดรฟ์ของตัวมันเอง 100% คุณจะมาประยุกต์บ้าๆ เอาเผลอบังคับ WorkDocs ให้เบี่ยงปลายทางทะลุตรงไปดึงโฟลเดอร์ลับดิบๆ ในถัง Amazon S3 ไม่ได้! มันคนละบริการกัน 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS STS (Security Token Service)**: กระทรวงเสกบัตรผ่านชั่วคราว มีหน้าที่ออก Temporary credentials (เหมือนรหัสผ่านที่มีอายุขัยไม่กี่ชั่วโมง) มักใช้คู่กับบริการ Federation หรือเวลาแอปพลิเคชั่นขอมุดเข้าถึงฐานข้อมูล เพื่อไม่ให้โปรแกรมเมอร์เผลอลืมใส่รหัสผ่านถาวรค้างเติ่งไว้ในโค้ดให้แฮกเกอร์สูบขโมย
- **IAM Policy Variables**: เวลาจะจัดการคนเยอะเป็นพันๆคน อย่าโง่เขียนกฎยาวพันหน้า ให้ใช้ทริคสมาร์ทตัวแปรดึงชื่อมาใส่แทนตุ่ม เช่น การเขียนสิทธิ์ให้พนักงานเข้าโฟลเดอร์ `arn:aws:s3:::mybucket/${aws:username}` กฎพารากราฟเดียวเอาอยู่คุมพนักงานล้านคน

---
---

## 📌 คำถามที่ 44
**โจทย์:**
An AI-powered Forex trading application consumes thousands of data sets to train its machine learning model. The application’s workload requires a high-performance, parallel hot storage to process the training datasets concurrently. It also needs cost-effective cold storage to archive those datasets that yield low profit.

Which of the following Amazon storage services should the developer use?

**ตัวเลือก:**
- [ ] Use Amazon FSx For Windows File Server and Amazon S3 for hot and cold storage respectively.
- [ ] Use Amazon Elastic File System and Amazon S3 for hot and cold storage respectively.
- [x] Use Amazon FSx For Lustre and Amazon S3 for hot and cold storage respectively.
- [ ] Use Amazon FSx For Lustre and the Provisioned IOPS SSD (io1) volumes of Amazon EBS for hot and cold storage respectively.

---
### 🎯 โจทย์ต้องการอะไร?
แอปเทรดพอร์ตหุ้น Forex ขับเคลื่อนด้วยมันสมอง AI ดึงชุดข้อมูลปั่นสมองขยี้ฝึกสอนเครื่อง (Machine learning) หนักบ้าเลือดทะลักทลายมาก มีเป้าหมาย 2 ชั้นดังนี้:
1. การเก็บข้อมูลโซนไฟร้อน: ต้องการที่เก็บทรงพลัง **(high-performance, parallel hot storage)** ต้องปั่นอ่านดึงไฟล์ยัดพร้อมกันรัวๆอย่างหนักหน่วง เพื่อสอน AI อย่างสปีดขุนศึก 
2. การเก็บข้อมูลโซนหนาวขยะ: ต้องการที่ทิ้งของเย็นแช่แข็งดองศพ **(cost-effective cold storage)** ไว้เก็บซุกข้อมูลย้อนหลังที่ไม่ค่อยใช้ทำกำไร ราคาถูก
ให้จับคู่โซลูชัน 2 บริการที่เทพที่สุดในด้าน Storage ประสานพลังมาตอบโจทย์ห่าเหวข้อ 1 และ 2 ตามลำดับ 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: กฎทองแห่งสมองกลสุดหรู! ถ้าโจทย์จั่วหัวลากคำคีย์เวิร์ดระดับชาติอย่าง **`machine learning`**, **`high-performance`**, และคำว่าประมวลผลอ่านไฟล์ตีกรอบขนานแชร์ท่อใหญ่อย่าง **`parallel`** = คุณโดนสิงให้มองหาบริการ Storage ที่ปั่นสปีดโคตรทะลุจักรวาลเพียงหนึ่งเดียว นั่นคือ **`Amazon FSx For Lustre`**!
- ทริคที่ 2: พอโซนไฟร้อน FSx for lustre ได้ข้อ 1 ละ ฝั่งของแช่หมักดองของโซนขยะเย็น **`cost-effective cold storage`** ย่อมไม่มีที่เก็บเศษไฟล์ประหยัดไหนลอยมาขัดมงกุฎนอกจากกระสอบทรายอย่าง **`Amazon S3`** เท่านั้น! (ถ้าบอกให้ใช้ Amazon EBS เป็น Cold Storage คือคนบ้าแน่นอน เพราะมันแพงขี้แตก)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon FSx For Lustre and Amazon S3 for hot and cold storage respectively.**
- **ทำไมถึงถูก:** จับคู่ไฟและน้ำแข็งสะท้านพิภพได้สมบูรณ์แบบ! ฝั่งกระทะร้อนให้ใช้แชร์ไฟล์หรูหราอย่าง **Amazon FSx For Lustre** เข้าต่อสู้... เคล็ดลับของการทำ AI/Machine Learning แบบบ้าเลือด คือมันต้องการอ่านสตุไฟล์พร้อมๆ กันรัวทุบๆ แบบท่อขนาน (Parallel file system) เป็นพันทัพพร้อมกัน ซึ่งพระเอกตัวเดียวที่อ้าท่ออัพสปีดแรงม้าปั่นงานได้แตะพรมแดนซุปเปอร์คอมพิวเตอร์แบบ HPC นั่นก็คือตัวเอนจิ้น Lustre นี่แหละ (ตรงเป้าข้อ 1 แบบเจาะกะโหลก) 
และส่วนโซนประหยัดฝังดองซุกข้อมูลเหี่ยวแห้งเก่าๆ (Cold Storage) ก็อพยพโยนมันไปเก็บทิ้งเร่ร่อนไว้ที่ **Amazon S3** ที่มีออฟชั่นถังขยะถูกประหยัดราคาเซฟระดับเศษสลึงได้ (ตรงเป้าข้อ 2 พอดีเป๊ะ) คอมโบข้อนี้จึงถูกต้อง 

❌ **[ผิด] Use Amazon FSx For Lustre and the Provisioned IOPS SSD (io1) volumes of Amazon EBS for hot and cold storage respectively.**
- **ทำไมถึงผิด:** รวยปัญญาอ่อนแล้ว! ฝั่งกระทะร้อนใช้ Lustre นั้นถูกต้องเผง แต่ดั๊นพาตรรกะเสื่อมในฝั่งฝังขยะเย็น (Cold Storage) โดยดันทะลึ่งไปเช่าฮาร์ดดิสก์ก้อนราคาแพงทลายฟ้าบ้าพลังแบบเจาะท่อ SSD ของ **Amazon EBS - Provisioned IOPS (io1)** มาถมทำดองไฟล์เก่า 
ตัวเกรด io1 มันเกิดมาเพื่อเป็นขีดสุดฮาร์ดแวร์ไว้รองรับตาราง Database ระดับโลกกระหน่ำยิบๆ เอาของแพงปรี๊ดเสกมาเททิ้งทำ "ที่เก็บของกักตุนเย็นราคาถูก" จะบ้าเหรอ บริษัทล้มละลายแหงๆ 

❌ **[ผิด] Use Amazon Elastic File System and Amazon S3 for hot and cold storage respectively.**
- **ทำไมถึงผิด:** ซื้อจักรยานไปแข่งซูปเปอร์คาร์! ฝั่ง S3 เก็บเย็นน่ะถูก... แต่การเอา "แอป AI สมองกลพันล้าน" ไปใช้สายแจ็คเชื่อมดึงไฟล์ผ่านอ่างแชร์ไฟล์ร่วมมิตรเซิฟเวอร์ธรรมดาๆ อย่าง **Amazon EFS** มันส่งของอืดไป! ตัวบัสแชร์ EFS มันแค่สนับสนุนการแชร์ไฟล์ธรรมกาเนตเวิร์คกว้างๆ ของแบนด์วิดท์คนเดินเหยียบ มันไม่มีอัตราเร็วสุดโต่งหรือโครงสร้างควบขนานหนักๆเหมือนเอนจิ้นเฉพาะทางของระบบไฟแลบอย่าง Lustre เจอแอคชั่นโหลดแมชชีนเลิร์นนิ่งสูบยับๆ EFS สะอึกกระตุกชัวร์ 

❌ **[ผิด] Use Amazon FSx For Windows File Server and Amazon S3 for hot and cold storage respectively.**
- **ทำไมถึงผิด:** พาฝรั่งมาคุยอีสานฮะ! ฝั่งร้อนดันชวนไปใช้บริการแชร์เครือข่ายบริษัทอย่าง **FSx for Windows File Server** ควบวง S3 
FSx for Windows เกิดมาเพื่อให้มนุษย์เงินเดือนในบริษัทป้าๆลุงๆ ที่ใช้ Windows เปิด Microsoft Word/Excel แชร์พอยต์ดึงเปิดมาดูหมุนติ้วๆแก้ร่วมกันง่ายๆ มันไม่มีกลไกเทคโนโลยีท่อดึงข้อมูลแชร์ร่วมควบคู่อัญเชิญมหาศาลทะลักข้ามมิติ (Parallel file system) แบบของ Lustre ที่เหมาะกับงานสอนประมวลผลสมองกลจรวดอย่าง Machine learning เลย เอามาใช้ผิดประเภท

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **ตระกูล Amazon FSx**: รวมพลกล่องแชร์ไฟล์ระดับผู้เชี่ยวชาญ (EFS แบบไฮโซ) 
  - *FSx for Lustre*: พะยี่ห้อจรวด ติดเกราะเอาไว้สำหรับงานบ้าพลัง คำนวณขุดเหมือง, Render 3D รัวๆ, สถิติสภาพอากาศ, Machine Learning
  - *FSx for Windows File Server*: คลังแชร์ไฟล์เนทีฟ SMB อารมณ์โฟลเดอร์แชร์ของออฟฟิศที่ใช้ Windows Server (มี AD Authentication)
- **Amazon S3**: ทำไม S3 ถึงเป็น Cold Storage ชั้นเยี่ยม? เพราะมันมีคลาสหลายลูกล่อให้หมกซ่อนของ เช่น ขีดเส้นใต้ดันของลง **S3 Standard-IA** หรือดันจนขี้เยี่ยวแตกดองสถิติตายในถ้ำ **S3 Glacier Deep Archive** ที่ราคาแสนถูกราวกับเททิ้งข้างถนน

---
---

## 📌 คำถามที่ 45
**โจทย์:**
A company has 3 DevOps engineers that are handling its software development and infrastructure management processes. One of the engineers accidentally deleted a file hosted in Amazon S3 which has caused disruption of service.

What can the DevOps engineers do to prevent this from happening again?

**ตัวเลือก:**
- [ ] Use S3 Infrequently Accessed storage to store the data.
- [ ] Set up a signed URL for all users.
- [x] Enable S3 Versioning and Multi-Factor Authentication Delete on the bucket.
- [ ] Create an IAM bucket policy that disables delete operation.

---
### 🎯 โจทย์ต้องการอะไร?
วิศวกรฝึกหัดน้อยในขบวนทีม 3 คนดันมือลั่นเผลอไปกดคลิกกระซวกลบ **(accidentally deleted)** ไฟล์หัวใจสำคัญใน Amazon S3 พังพินาศจนหน้าเว็บค้างกระตุกดับระเบิด
โจทย์ถามว่าจะดัดนิสัยวางกลไกตั้งค่าระบบป้องกันอีหรอบนี้ยังไงบน S3 เพื่อหวังผล **ไม่ให้เกิดอุบัติเหตุมือลั่นลบไฟล์มั่ว** แบบไร้สติสัมปชัญญะซ้ำสองแบบนี้อีกในอนาคต? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดความบรรลัยเกิดจาก "สมาคมอุบัติเหตุมือลั่นลบไฟล์ทิ้ง" อย่างคำว่า **`accidentally deleted a file`** = กลไกดัดนิสัยอันดับหนึ่งใน S3 ของ AWS ที่ออกแบบมาเพื่อปกป้องคนมือไวโดยเฉพาะก็คือการสอดไส้การบังคับยืนยันยิง OTP เลข 6 หลักอีกชั้นก่อนกดลบทิ้งนั่นก็คือ ฟีเจอร์ **`Multi-Factor Authentication (MFA) Delete`** 
- ทริคที่ 2: จำกฎพระคัมภีร์พ่วงตัวแถมไว้! ฟีเจอร์สแกน OTP **MFA Delete** จะเปิดใช้การบูชาติดยันต์ลบล้างไม่ได้เด็ดขาด ถ้าคุณไม่ยอดผูกเปิดโหมด "ย้อนเวลากลับหลัง" ที่เรียกกันว่า **`S3 Versioning`** เอาไว้ในถังเสียก่อน ดังนั้นคอมโบข้อนี้ทั้งคู่คือเงื่อนไขของคำว่า "ลบไฟล์ของกูอย่างปลอดภัยชัวร์ 100%"
- ทริคที่ 3: **ระวังคีย์เวิร์ดรุนแรงเกินเหตุอย่างตั้งนโยบายห้ามลบเด็ดขาด! `disables delete operation` ทิ้งไป** AWS มักจะไม่ออกนโยบายไม้แข็งประหารหมู่อย่างการฆ่าฟันกั๊กห้ามลบทิ้งไปเลย (เว้นแต่จะเก็บเอกสารราชการ WORM) เพราะถ้าตั้งกฎปัญญาอ่อนแบบนี้ปุ๊บ ไฟล์ขยะในระบบที่จะอัปเดตเก่าๆ มันก็พลอยฟุซซี่ติดล็อกลบไม่ได้ตามไปด้วย คลาวด์ระเบิดแน่

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable S3 Versioning and Multi-Factor Authentication Delete on the bucket.**
- **ทำไมถึงถูก:** คอมโบปัดเป่ามนต์มารที่สุดเพอร์เฟกต์! การดึงสลักถวายระบบย้อนเวลา **S3 Versioning** ทำให้คุณอบอุ่นใจว่าทุกครั้งที่ใครตาบอดลบไฟล์รัวๆ ไฟล์มันจะไม่หายระเหยสูญอากาศไปเลยในทันที แต่มันจะซุกซ่อนหล่นลงมาทับเป็นรอยเวอร์ชั่นก๊อปปี้เก่า (ซึ่งกดปุ่มกู้กลับคืนมาได้เนียนๆ 100%)
แล้วความแสบซ่าส์ขั้นกว่าคือ การจะกดยืนยันปุ่มไล่บี้ล้างบางเศษขยะลบทำลายของจริงรอยเวอร์ชั่นทิ้งอย่างหมดยางอาย คุณจะโดนดักกระชากบังคับด้วยฟีเจอร์ด่านอรหันต์ **MFA Delete** (ให้ล้วงหยิบมือถือมากดกรอกเลขรหัสหมุนๆ OTP 6 ตัวยืนยันกับ AWS ว่ามึงตั้งใจร่ายฟาดลบจริงไม่ได้มือลั่นหรือเมาคีย์บอร์ด) ตัดปัญหาอุบัติเหตุจากไอ้เด็กฝึนงานได้อัศจรรย์หยดย้อย 

❌ **[ผิด] Create an IAM bucket policy that disables delete operation.**
- **ทำไมถึงผิด:** เอายาพิษไปรักษาสิวหนอง! การเขียนกระดาษกฎเหล็กลิขิตนโยบาย IAM Bucket policy กางรัดห้ามฟันฉับว่า "กูแบนห้ามใครหน้าหมาหน้าไหนในองค์กรกดลบแผลงไฟล์ลงนรกเด็ดขาด (disables delete)" 
มันยาแรงคอกันสนิทเกินไป! ถ้าคุณลงกฎว่ากูห้ามใครลบอะไรเลย งานของแอปบริษัทก็จะสั่นคลอนล่มจมตามสะดุดขัดขาตามเพราะ "ไฟล์รูปโปรไฟล์เก่าขี้เหล่แตกๆที่ไม่ใช้แล้ว หรือล็อกแบ็คอัพเทสตั้งใจจะลบทิ้งลบอัปเดต" มันก็พลอยจะกะโหลกกะลาหน้าด้านติดล็อกลบออกไม่ได้ไปด้วย (เผลอแป๊ปเดียวถังขยะเต็มระเบิดจ่ายค่าเช่าอ่วม) คุณแค่ต้องการแก้ไขระบบป้องกัน "อุบัติเหตุลบพลาด" ไม่ใช่ตั้งกฎตัดมือเหี้ยนพิการทำอะไรไม่ได้ 

❌ **[ผิด] Use S3 Infrequently Accessed storage to store the data.**
- **ทำไมถึงผิด:** หนีปัญหาไปย้ายเตียงนอน! เลื่อนโฉกโยกฝักฝ่ายเผ่นหนีขยับสเปคไฟล์ไปหมกซุกก้นเหวในโซนสตอเรจห้องเย็น S3 Infrequent Access (Standard-IA) 
การไปประหยัดรัดเข็มขัดเปลี่ยนคลาสห้องเป็น "หมวดหมกเก็บของนานที 30 วันมาดูหน" ก็ไม่ได้มีแจกโล่แถมหน้ากากหรือสวิตช์ป้องกันยับยั้งมือผีสะดุดหน้ามืดอะไรให้ซักแอะเดียว ถ้าลูกน้องหน้ามืดเมามากดสไลด์คลิกขวาปุ่มโดนลบ ไฟล์นั้นมันก็หน้าแหกปลิวหายจากตู้เหล็กลอยลมหายพังกระจายปอดแหกไปอยู่ดี

❌ **[ผิด] Set up a signed URL for all users.**
- **ทำไมถึงผิด:** ถือป้ายเตือนคนละภาษา! ไปคลำสั่งโปรแกรมงัดสลักตั้งพาสเวิร์ดคล้องผูกแม่กุญแจติดท้ายแถวลิ้งก์จำกัดชั่วโมงโหลดประหนึ่งป๊อปคอร์น (Signed URL) แจกเสียบปากผู้ใช้ 
Signed URL มันแค่ลูกล่อลูกชนถูกประดิษฐ์สาดแจกเป็นตั๋วสร้างเงื่อนไขกั๊กอนุญาตว่า "นาย ก. หน้าไหนแกมีเวลาคลิกดูดาวน์โหลดเซปสูบไฟล์ลิ้งก์คลิปนี้ได้แค่ช่วงเวลา 5 นาทีทองนี้นะ!" มันเป็นศาสตร์ศิลป์ของการกั้นคุมเชิงจำกัดชั่วโมงดูหน้าเว็บดาวน์โหลด (Securing Access) ไม่ได้มีความเกี่ยวดองโยงญาติสักอุนจิระดับนาโนเมตรกับการป้องกันขโมยบุกเผาหรือไอ้เด็กเวรมือลั่นไปทำลายไฟล์ตึกถล่ม (Accidental Deletion) แน่นอน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **MFA Delete**: ฟังชื่อก็รู้ว่ากันผี (Multi-Factor Authentication) ฟีเจอร์หน้าตึงที่ผูกควบกับระบบ Versioning เวลามีคนจะใจกล้ากด Empty Bucket หรือ Delete Object Version ทิ้งถาวรจาก S3 ระบบมันจะร้องกระพริบให้แอดมินคนนั้นควัก "เครื่องเหรียญพกหรือ Google Authenticator" มาคีย์รหัสกรอกก่อนถึงจะอนุญาตให้ลบ เป็นการรับประกันว่า "คนลบต้องอยู่ในจุดที่มีสติถือโทรศัพท์" นะจ้ะ! โดนหลอกแฮกกี้สคริปต์มารันไม่ได้ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 10: ข้อ 46 - 50)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 46
**โจทย์:**
An online medical system hosted in AWS stores sensitive Personally Identifiable Information (PII) of the users in an Amazon S3 bucket. Both the master keys and the unencrypted data should never be sent to AWS to comply with the strict compliance and regulatory requirements of the company.

Which S3 encryption technique should the Architect use?

**ตัวเลือก:**
- [ ] Use S3 server-side encryption with customer provided key.
- [x] Use S3 client-side encryption with a client-side master key.
- [ ] Use S3 server-side encryption with an AWS KMS key.
- [ ] Use S3 client-side encryption with an AWS KMS key.

---
### 🎯 โจทย์ต้องการอะไร?
ระบบข้อมูลโรงพยาบาลเก็บข้อมูลเวชระเบียนส่วนตัว (PII - Personally Identifiable Information) ลงใน **Amazon S3** 
บริษัทมีกฎเหล็กที่บังคับหัวเด็ดตีนขาดว่า **"ข้อมูลดิบหน้าเปล่าๆ (Unencrypted data) และ ตัวลูกกุญแจแม่ (Master keys) ห้าม ห้าม ห้าม! ส่งขึ้นไปแตะพื้นที่เซิร์ฟเวอร์ AWS โดยเด็ดขาด"** (เพื่อความปลอดภัยสูงสุดทางกฎหมาย คือไม่เชื่อใจให้ AWS รับรู้ข้อมูลหรือกุญแจทั้งสิ้น)
โจทย์ถามว่า สถาปนิกต้องเลือกใช้เทคนิคเข้ารหัส S3 ท่าไหนถึงจะถูกใจกระทรวงเวทมนต์?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นกฎเหล็กข้อแรก **`unencrypted data should never be sent to AWS` (ห้ามส่งไฟล์โป๊เปลือยขึ้น AWS)** = ถ้าเห็นคำนี้ ตัดช้อยส์แก๊งค์หัวเน่า **`server-side encryption`** ชิ้งลงถังได้เลย! เพราะเซิร์ฟเวอร์ไซด์คือการส่งไฟล์ปกติดิบๆ ของเราวิ่งข้ามเนตเวิร์คไปให้แอมะซอนสับบดเนื้อทำเข้ารหัสให้ที่ปลายทาง (AWS เห็นไฟล์ดิบเรา) คำตอบจึงโดนบีบให้เหลือแต่ **`client-side encryption` (กูขยำเข้ารหัสเองตั้งแต่หน้าคอมบ้านกูเลย)**
- ทริคที่ 2: เห็นกฎระเบียบข้อสอง **`master keys ... should never be sent to AWS` (ห้ามกุญแจแม่แตะแอมะซอน)** = ตัดช้อยส์ที่มีคำว่า **`AWS KMS key`** ทิ้งอย่างไร้เยื่อใย! เพราะ KMS คือบริการรับฝากกุญแจผีของ Amazon ถ้ารัฐบาลสั่งห้ามให้ AWS ยุ่งกับกุญแจ คุณก็ต้องรับบทพก **`client-side master key` (ถือลูกกุญแจพกติดกระเป๋ากางเกงตัวเอง)** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use S3 client-side encryption with a client-side master key.**
- **ทำไมถึงถูก:** รอดตาราง 100%! เพราะคำว่า "Client-side encryption" หมายถึง ข้อมูลจะถูกโปรแกรมของเราบดป่นเข้ารหัสปิดผนึกกลายเป็นภาษาต่างดาวตั้งแต่ยังไม่ทันออกจากหน้าจอโน้ตบุ๊คก้าวเท้าออกจากขอบเขตบริษัทเลยด้วยซ้ำ (AWS จึงไม่เคยเห็นข้อมูลดิบ) และการใช้ "client-side master key" ก็แปลว่ากุญแจไขตลับนี้แอดมินบริษัทเป็นคนหล่อขึ้นมาเอง และเก็บฝังใส่เซฟไว้ใต้ที่นอนตัวเองที่ออฟฟิศ ไม่เคยกดอัปโหลดทิ้งส่งให้ AWS ถือหางเลยแม้แต่วินาทีเดียว ตอบโจทย์เป๊ะปังร้อยเปอร์เซ็นต์!

❌ **[ผิด] Use S3 server-side encryption with customer provided key.**
- **ทำไมถึงผิด:** เอากระดูกไปฝากหมา! คำว่า "Server-side encryption" ก็ประจานตัวเองชัดเจนว่า คุณจะต้องส่งไฟล์ดิบๆ เดินแก้ผ้าวิ่งกลางอากาศ (unencrypted data) เข้าไปหาประตูเซิร์ฟเวอร์ AWS ให้พนักงานอเมซอนหยิบไปล็อคกุญแจบีบอัดให้ที่ปลายด่าน... ซึ่งแบบนี้ AWS ย่อมแอบเห็นข้อความในไฟล์ดิบแว๊บนึง ชวดผิดกฎข้อ 1 จังเต็มเปา

❌ **[ผิด] Use S3 server-side encryption with an AWS KMS key.**
- **ทำไมถึงผิด:** ประหาร 7 ชั่วโคตร! ผิดบาปมัน 2 กระทงรวด นอกจากคุณจะส่งไฟล์ดิบไปเปลือยหน้ากล้องบนเซิร์ฟเวอร์ AWS (Server-side) คุณดันทะลึ่งฝากให้ AWS ควบดูแลกุญแจแม่ KMS ด้วยตัวเองอีกต่างหาก เท่ากับยกบริษัทให้เขาไปเลย 

❌ **[ผิด] Use S3 client-side encryption with an AWS KMS key.**
- **ทำไมถึงผิด:** รอดแค่ครึ่งใบ! การเข้ารหัสหน้าคอมพิวเตอร์บ้านตัวเองนะ (Client-side) ถือว่ารอดกติกาข้อแรก แต่กุญแจผีที่คุณเอามาล็อคดันกระแดะไปลากเรียกใช้ลูกดอกวิเศษจาก AWS KMS (กุญแจลอยอยู่ในเซิร์ฟเวอร์ AWS) ซึ่งผิดกฎข้อ 2 ที่สั่งชัดว่าห้ามกุญแจแม่ (Master keys) เหยียบขอบรั้ว AWS เป็นอันตกม้าตายตอนจบ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Encryption Options**:
  - `SSE-S3 (Server-Side Encryption with Amazon S3-Managed Keys)`: ขี้เกียจสุดๆ โยนไฟล์ให้ AWS ล็อกให้ แถมกุญแจ AWS ก็เป็นคนปั๊มเก็บไว้เอง
  - `SSE-KMS (Server-Side Encryption with KMS)`: ให้ AWS ล็อกไฟล์ให้ แต่ลูกกุญแจเราเอาไปฝากในระบบชั้นสูง KMS (จัดการสิทธิ์ได้ว่าใครมีไฟเขียวดึงกุญแจไปไขไฟล์ S3 ไหน)
  - `SSE-C (Server-Side Encryption with Customer-Provided Keys)`: โยนไฟล์ให้ AWS ล็อกให้ แต่เราต้องแนบ "ลูกกุญแจหลอมเองจากบ้าน" ไปพร้อมไฟล์ด้วย (พอ AWS แก๊กเสร็จ มันจะโยนกุญแจทิ้งไม่จำให้)
  - `Client-Side Encryption`: โคตรระแวง AWS! เราเขียนโค้ดล็อกแม่กุญแจไฟล์เองตั้งแต่คอมพ์ที่ทำงาน แล้วโยนก้อนอิฐที่เข้ารหัสแล้วขึ้นไป AWS แค่เป็นโกดังรับฝาก

---
---

## 📌 คำถามที่ 47
**โจทย์:**
A newly hired Solutions Architect is assigned to manage a set of CloudFormation templates that are used in the company's cloud architecture in AWS. The Architect accessed the templates and tried to analyze the configured IAM policy for an S3 bucket.

```json
{ 
 "Version": "2012-10-17", 
 "Statement": [ 
  { 
   "Effect": "Allow", 
   "Action": [ 
    "s3:Get*", 
    "s3:List*" 
   ], 
   "Resource": "*" 
  }, 
  { 
   "Effect": "Allow", 
   "Action": "s3:PutObject", 
   "Resource": "arn:aws:s3:::boracay/*" 
  } 
 ] 
}
```
What does the above IAM policy allow? (Select THREE.)

**ตัวเลือก:**
- [x] An IAM user with this IAM policy is allowed to write objects into the boracay S3 bucket.
- [ ] An IAM user with this IAM policy is allowed to change access rights for the boracay S3 bucket.
- [ ] An IAM user with this IAM policy is allowed to read and delete objects from the boracay S3 bucket.
- [x] An IAM user with this IAM policy is allowed to read objects from all S3 buckets owned by the account.
- [x] An IAM user with this IAM policy is allowed to read objects from the boracay S3 bucket.
- [ ] An IAM user with this IAM policy is allowed to read objects in the boracay S3 bucket but not allowed to list the objects in the bucket.

---
### 🎯 โจทย์ต้องการอะไร?
วิศวกรโดนลูกพี่สั่งให้ไปหัดอ่านตีความกระดาษยันต์แปลภาษา **(IAM Policy JSON)** ของ AWS 
โจทย์ให้ก้อนบรรทัดคำสั่ง JSON มาแล้วกางกระดานถามว่า "เพื่อนๆ นี่มันคือยันต์มนต์ดำที่สั่งร่ายเปิดไฟเขียว (Allow) ให้คนถือป้ายทำอะไรได้บ้าง?" (เลือกข้อที่แปลถูก 3 ข้อ)

**มาแกะกล่องแปลภาษา JSON กันทีละบรรทัดเถอะ:**
- แกะก้อนที่ 1: ตรงท่อน `"Action": ["s3:Get*", "s3:List*"]` ควบกับเป้าหมาย `"Resource": "*"` 
  - **แปลว่า:** "ข้าขอให้อำนาจเอ็ง สามารถหยิบดูดดึงอ่านไฟล์ (Get) และส่องตาข่ายดูรายชื่อไฟล์ (List) ได้ดั่งใจนึก ทะลวงได้ **ทุกๆ ถัง S3 ในระบบทั้งหมด!** (เพราะใส่ดอกจันโง่ๆ ไว้ตรง Resource)"
- แกะก้อนที่ 2: ตรงท่อน `"Action": "s3:PutObject"` ควบกับเป้าหมาย `"Resource": "arn:aws:s3:::boracay/*"`
  - **แปลว่า:** "นอกจากนี้ ข้ายังแจกสิทธิ์ให้เอ็งสามารถวางอัปโหลดไฟล์ใหม่ๆ (PutObject) เข้าไปซุกได้ แต่คราวนี้ทำได้**เฉพาะเจาะจงในถังที่ชื่อ boracay โฟลเดอร์ใดๆ ก็ตามเท่านั้นนะ!** (ถ้าเอาไปยัดลงถังอื่นจะโดนตบ)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: การอ่านจับผิด JSON ให้กวาดสายตาดูคำสั่งกริยา **`Action`** ว่ามันอนุญาตหรือสั่งห้ามฟีเจอร์ไหน 
- ทริคที่ 2: ถ้าเห็น `s3:Get*` แปลว่า "อ่านได้ ดึงโหลดได้"
- ทริคที่ 3: ถ้าเห็น `s3:Put*` แปลว่า "อัปโหลด ยัดใส่ สร้างใหม่ แก้ไขเซฟทับตัวเก่าได้ (write)" 
- ทริคที่ 4: ถ้ากริยาเดือดๆ หายไป เช่น มองหาคำว่า `Delete` หรือพวก `Policy` ไม่เจอ... อย่ามโนกาช้อยส์ที่มันไม่มีในโค้ดเด็ดขาด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] An IAM user with this IAM policy is allowed to read objects from all S3 buckets owned by the account.**
- **ทำไมถึงถูก:** เผงเลย! เพราะก้อนคำสั่งเวทย์ท่อนแรกมีประกาศตัวเบ้งว่า (Action: "s3:Get*", ทุบใส่เป้า Resource: "*") เลยมีสิทธิ์กวาดสายตาอ่านและโหลดของจากประดาขุย **ทุกถัง S3 ในไอดี** ได้สบายๆ 

✅ **[ถูกต้อง] An IAM user with this IAM policy is allowed to write objects into the boracay S3 bucket.**
- **ทำไมถึงถูก:** ใช่แล้วลูกพี่! เพราะก้อนคำสั่งท่อนสองบอกว่ารับทราบอนุญาตให้อัปโหลดพ่นไฟล์ใหม่ (s3:PutObject) ยัดเข้าลิ้นชักถังเฉพาะที่ชื่อพิกัด "arn:aws:s3:::boracay/*" ได้

✅ **[ถูกต้อง] An IAM user with this IAM policy is allowed to read objects from the boracay S3 bucket.**
- **ทำไมถึงถูก:** ตรรกะเด็กประถม! ก็ในเมื่อไอ้ท่อนแรกมันประทานสิทธิ์ให้มึงดึงอ่านของ "ทุกถังบนโลกใน Account นี้" ได้ฟรีสไตล์... ไอ้ถังที่ชื่อ "boracay" มันก็เป็นหนึ่งในถังผู้น้อยในเครือข่ายสิ ฉะนั้นการเอาเมาส์ไปคลิกโหลดโยนอ่านไฟล์จาก boracay ทรงนี้ ย่อมได้สิทธิโดยปริยาย 

❌ **[ผิด] An IAM user with this IAM policy is allowed to change access rights for the boracay S3 bucket.**
- **ทำไมถึงผิด:** มโนเพ้อฝัน! ในบรรทัดโค้ดยันต์สี่บรรทัดนี้ ไม่มีคำสั่งกริยาเวทย์ตระกูลดัดแปลงเปลี่ยนยึดสิทธิ์เจ้าของถัง (เช่น s3:PutBucketPolicy หรือ s3:PutBucketAcl) ซ่อนอยู่หลืบไหนเลย คุณจะกระแดะไปเปลี่ยน Access rights ถังไม่ได้หรอก!

❌ **[ผิด] An IAM user with this IAM policy is allowed to read and delete objects from the boracay S3 bucket.**
- **ทำไมถึงผิด:** หลิ่วตาอ่านไม่ขาด! แม้จะอ่าน Read បាន (เพราะ Get*) แต่ในโค้ดมันสะกดปิดเงียบกริบ ไม่มีคำสั่งอำมหิตทำลายล้างที่ชื่อว่า `s3:DeleteObject` โผล่มาให้ขนลุกเลยแม้แต่ตัวอักษรเดียว พยายามสั่งกดลบไฟล์ก็จะเจอหน้าแดงกระดาษตีกลับ (Access Denied) 

❌ **[ผิด] An IAM user with this IAM policy is allowed to read objects in the boracay S3 bucket but not allowed to list the objects in the bucket.**
- **ทำไมถึงผิด:** แถสีข้างถลอก! ช้อยส์บอกยั่วประสาทว่า "อ่านถัง boracay ได้นะแจ๊ะ... แต่หน้ามืดตาบอดไม่ให้ส่องดูรายชื่อลิสต์ไฟล์ (not allowed to list items)" แต่แหกตาดูโค้ดย่อหน้าแรกสิ! ถัดจาก s3:Get* บรรทัดข้างล่างมันแปะกระแทกตาคู่กันโต้งๆว่า `"s3:List*"` ! จะมาโกหกว่าไม่อนุญาตลิสต์ได้ไงล่ะ 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **โครงสร้าง IAM Policy**:
  - `Effect`: กฎนี้ตั้งใจจะ "อนุญาต (Allow)" หรือ "ตบหน้าห้าม (Deny)" 
  - `Action`: การกระทำอะไรบ้างล่ะ? เช่น หยิบไฟล์, ปิดเครื่องเหล็ก, ลบ User
  - `Resource`: ลงมือทำกับอะไร? เช่น ถัง S3 ชื่อนี้, ฝูงคอมในกลุ่มนี้, หรือจับกวาดเครื่องหมายดอกจัน `*` แบบทำไม่อั้น

---
---

## 📌 คำถามที่ 48
**โจทย์:**
A company plans to host a web application in an Auto Scaling group of Amazon EC2 instances. The application will be used globally by users to upload and store several types of files. Based on user trends, files that are older than 2 years must be stored in a different storage class. The Solutions Architect of the company needs to create a cost-effective solution to store the old files yet still provide durability and high availability.

Which of the following approach can be used to fulfill this requirement? (Select TWO.)

**ตัวเลือก:**
- [ ] Use Amazon EFS and create a lifecycle policy that will move the objects to EFS-IA after 2 years.
- [ ] Use Amazon EBS volumes to store the files. Configure the Amazon Data Lifecycle Manager (DLM) to schedule snapshots of the volumes after 2 years.
- [x] Use Amazon S3 and create a lifecycle policy that will move the objects to S3 Standard-IA after 2 years.
- [x] Use Amazon S3 and create a lifecycle policy that will move the objects to S3 Glacier after 2 years.
- [ ] Use a RAID 0 storage configuration that stripes multiple Amazon EBS volumes together to store the files. Configure the Amazon Data Lifecycle Manager (DLM) to schedule snapshots of the volumes after 2 years.

---
### 🎯 โจทย์ต้องการอะไร?
แอปให้ลูกค้าเปิดหน้าเว็บอัปโหลดรูปโป๊ ไฟล์งาน รูปหมายัดข้ามน้ำข้ามทะเล (globally... upload and store several types of files) โดนกระแสสั่งมาว่า **"วิจัยพบว่าไฟล์โบราณที่มีอายุเกินตะพุ่น 2 ปี จะหงอยแทบไม่มีใครกดมาดู!"** 
สถาปนิกจึงต้องร่ายเวย์หาโกดังทิ้งศพ โยกย้ายไฟล์ผีดิบ 2 ปีไปกองในถังสตอเรจแบบชั้นเลิศ **ราคาประหยัดที่สุด (cost-effective)** แต่ข้อแม้ติ่งท้ายคือ ไฟล์เก่าๆ พวกนี้ยังห่วงใย ห้ามพัง หวีดร้องขึ้นมาต้องดึงคืนเร็วปรู๊ดปร๊าด (high availability and durability) 
โจทย์ต้องการกลยุทธ์ 2 ไอเดีย ท่าไหนที่เซฟตังแถมใช้ของบน AWS ได้ถูกหมวดบ้าง?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดไฟล์ของชิ้นๆ บ้าระห่ำจาก **"ทั่วโลก (globally upload)"** แถมต้องสร้างเงื่อนไขยกระดับคลาสให้ **"ถูกลงเมื่อเก่าเกิน 2 ปี"** = ท้าพิสูจน์ได้ล้านเปอร์เซ็นว่าตัวเก่งพระเอกเก็บไฟล์ระดับชาติ และมีฟีเจอร์ตู้ลื่นไหลคัดแยกขยะออโต้อย่าง **`lifecycle policy`** ได้พลิ้วไสวที่สุด คือ **`Amazon S3`** เท่านั้น! บริการอื่นไม่มีทางทนรับพายุอัปโหลดโกลโบลหรือเล่นท่าไลท์ไซเคิลเนียนๆแบบนี้ได้ (ตัด EFS กับ EBS ทิ้งลงทะเลไปเถอะ) 
- ทริคที่ 2: จำชื่อคลาส S3 ประหยัดๆ ไว้ 2 สหาย! ค่ายเก็บของเย็นตายยากที่คนนิยมโยนไฟล์เหี่ยวทิ้งก็คือ **`S3 Standard-IA`** (นานทีดูหน) และ **`S3 Glacier`** (แช่แข็งอาร์กติกราคาเยี่ยวราด) หา 2 คำนี้เจอก็กาได้เลยสบายใจ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon S3 and create a lifecycle policy that will move the objects to S3 Standard-IA after 2 years.**
- **ทำไมถึงถูก:** ไหลลื่นคลาสสิคสมองเพชร! ใช้ถังไร้ขีดจำกัด **Amazon S3** ยืนเป้าอ้าปากรับไฟล์แฉะจากทั่วโลก แล้วตั้งตู้ลื่นไหลแม่บ้านหุ่นยนต์ **Lifecycle Policy** ผูกเงื่อนไขกฎฟาดทิ้งไว้ว่า "ไฟล์ไหนตอกหน้าทึ้งแก่อยู่เกิน 730 วัน (2 ปี) ให้สวมปลอกคอลดระดับโอนย้ายมันตกลงไปอยู่ที่กอง **S3 Standard-IA** ชั้นประหยัดนะโว้ย" 
การกวาดไป Standard-IA เป็นทางเลือกชูโรงที่ลดค่าเช่าจุกๆแตะร้อยละ 50 แถมเวลาลูกค้าโรคจิตนึกอุตริอยากขุดดูรูปหมาเมื่อ 2 ปีก่อน ไฟล์มันก็ยังเด้งขึ้นหน้าจอเร็วปรี๊ดเสี้ยววิตอกโจทย์อวดยอด High availability กะ Durability ได้ครบเป็ด!

✅ **[ถูกต้อง] Use Amazon S3 and create a lifecycle policy that will move the objects to S3 Glacier after 2 years.**
- **ทำไมถึงถูก:** ตู้เก็บศพมหากาฬประหยัดบรรลัย! โยนเข้าตู้ S3 แช่แม่บ้านหุ่นยนต์ Lifecycle Policy แล้วสั่งดึงคอไฟล์ตกรุ่นหลุดสเปคโยนลงหลุมน้ำแข็งอาร์กติก **S3 Glacier** 
การใช้ตัวยอดนิยมคู่บารมี Glacier มีอานิสงส์ความทนทานสุดติ่ง แถมหั่นหั่นฟันฉับค่าเช่าหั่นชอกช้ำให้ต่ำเตี้ยเรี่ยดินจนเเทบเสียแค่สลึงเดียวต่อกิ๊ก (ตอบโจทย์ Cost-effective ขีดสุด) แม้เวลาลื้อกลับมาดูอาจจะต้องขุดรอราวๆ นาทีถึงชั่วโมงกว่าจะปั่นละลายมาได้ แต่ภาพรวมความทนความสวยคือปังมาก! 

❌ **[ผิด] Use Amazon EFS and create a lifecycle policy that will move the objects to EFS-IA after 2 years.**
- **ทำไมถึงผิด:** ตกหลุมพลางวันหมดอายุ! มองเผินๆ เหมือนจะเนียนจับไฟล์ใส่ตู้แชร์หลงป่าเข้า EFS รับไฟล์ไปกองตู้แล้วตั้งลื่นไหลออโต้ตกไป **EFS-IA**... แต่ข้อจำกัดบีบจิตทารุณของกฎ Lifecycle ภายในห้องเก็บกระดูก EFS คือมันปรับเกียร์หล่นย้ายชั้นลงให้คุณได้เชื่องช้าสุดๆ แค่เพดาน **"90 วัน! เท่านั้นโว้ย!"** 
ถ้าคุณผีบ้ามาสั่งป้อนพิมพ์เงื่อนไขฟุ่มเฟือยให้รอถึง 2 ปี (730 วัน) เครื่องพิมพ์หน้าคอนโซลม้วนครืนจะพ่นกล่องข้อความ Error ด่าหน้าหงายว่าตั้งค่าไม่ได้หรอก 

❌ **[ผิด] Use Amazon EBS volumes to store the files. Configure the Amazon Data Lifecycle Manager (DLM) to schedule snapshots of the volumes after 2 years.**
- **ทำไมถึงผิด:** เอากับข้าวไปยัดซุกหูฟังลูก! ฮาร์ดดิสก์บล็อก **EBS Volumes** มันเป็นติ่งเนื้อส้นทื่อๆ ที่เสียบติดหลุดขุมทรัพย์ก้อน EC2 แบบตัวต่อตัว ไม่ได้ฉลาดขึงรับไฟล์จากคนทั่วอเมริกายุโรปได้ (Not for Global object upload) แถมตัวท่อ **Data Lifecycle Manager** ในป่านั้น มันมีหน้าที่แค่คอยถ่ายรูปโฟโต้ก็อปปี้ "อ๊อกสแนปช็อตโขกดิสก์แบ็คอัพเก็บ" มันไม่ได้มีพลังโยกย้ายขุนไกรแยกร่างลดเปคไฟล์รายชิ้นโยนไปอยู่คลาสราคาถูกๆกากๆ เหมือนที่ S3 ทำได้สักนิด ผิดมหันต์!

❌ **[ผิด] Use a RAID 0 storage configuration that stripes multiple Amazon EBS volumes together to store the files. Configure the Amazon Data Lifecycle Manager (DLM) to schedule snapshots of the volumes after 2 years.**
- **ทำไมถึงผิด:** ผิดแบบทะลุจักรวาลดำดิ่งลงหลุมดำ! มั่วมาตีวิชาผูกดิสก์บ้าพลังทำ **RAID 0** (ซึ่งเป็นการปั่นรวมสปีดฮาร์ดดิสก์แบบเน้นซิ่ง แต่ถ้าพัง 1 ลูกคือบรรลัยยกแผงฉีกขาดชิ้นดีไม่ได้ ทนทานต่ำทรามสุดๆ ไม่ High availability ยับแม่) แถมยังหยิบ EBS ที่มีเรทชาร์จคุกตารางค่อนข้างแพงอื้อซ่ามาทำ และ Lifecycle ก็ย้ายก้อนไฟล์รหัสทับไม่ถูกอีก ไม่มีทางแตะอณูวิญญาณคำว่า Cost-effective แน่นอน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Lifecycle Policy ใน S3**: ลูกเล่นก้นหีบที่ทรงพลังสุด โยนของลงถังแล้วสร้างกฎตั้งเวลาเช่น "30 วันแรกร้อนแรงให้อยู่ S3 Standard -> พอครบ 30 วันหล่นไป S3 IA ลดค่าตั๋วเด็กลง -> พอครบ 365 วันไม่มีคนเหลียวแล ยันตกเหวลงสู่ Glacier ดองแข็ง" เป็นท่ามาตรฐานในการสอบเกือบทุกข้อ!

---
---

## 📌 คำถามที่ 49
**โจทย์:**
An e-commerce company runs a highly scalable web application that depends on an Amazon Aurora database. As the number of users increases, the read replica faces difficulties keeping up with the increasing read traffic, causing performance bottlenecks during peak periods.

Which of the following will resolve the issue with the most cost-effective solution?

**ตัวเลือก:**
- [ ] Increase the size of the Aurora DB cluster.
- [ ] Implement read scaling with Aurora Global Database.
- [x] Use automatic scaling for the Aurora read replica using Aurora Auto Scaling.
- [ ] Set up a read replica that can operate across different regions.

---
### 🎯 โจทย์ต้องการอะไร?
แอปตะกร้าซื้อของอีคอมเมิร์ซพึ่งพาหน้าฮุคฐานข้อมูลโคตรหรู **Amazon Aurora** 
แต่ปัญหาโลกแตกคือ พอถึงโปร 11.11 ฝูงคนเข้ามาแห่ช้อปปิ้ง ตัวเซิร์ฟเฝ้าแคชเชียร์หน้าร้านสำหรับถามหาสินค้า **"แฝดขี้ข้าอ่านข้อมูล (Read replica)"** แบกรับภาระโดนยิงคำถามกระจุยจี๋ (Read traffic) จนปั่นคิวเบียดกันตึงติดแหง๊กเป็นคอขวดสะดุด (Bottlenecks) 
โจทย์ถามหาวิธีปราบก้อนทราฟฟิกช้อปปิ้งหน้าร้านแบบได้ผลยืดหยุ่นฉลาดๆ แล้วต้อง **"จ่ายประหยัดที่สุดเท่าที่จะเสกได้ (most cost-effective solution)"** ด้วย

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดวิกฤต **"อ่านไม่ทัน/คนเปิดดูเยอะเกิน" (`read replica faces difficulties... increasing read traffic`)** = วิธีแก้ปัญหาระดับโลกของ AWS ไม่ใช่อัปเกรดเครื่องให้ใหญ่นะ (มันแพง) แต่เราต้อง "แตกก๊อปปี้สาขาสแตนบายเพิ่มให้เยอะๆมารุมช่วยบริการ" 
- ทริคที่ 2: พอโจทย์ลากพระเอกอย่าง **`Amazon Aurora`** มาชนกับความต้องการ "แยกร่างอัตโนมัติแถมหดตัวได้หนีค่าบิลแพง" (Cost-effective) = ฟีเจอร์ตัวจี๊ดของมันที่ร่ายมนต์ให้ขยายแฝดกระจายคิวแบบอัตโนมัติมีอยู่ชื่อเดียวเท่านั้นคือ **`Aurora Auto Scaling`** กาข้อนี้เตรียมรับคะแนนได้เลย 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use automatic scaling for the Aurora read replica using Aurora Auto Scaling.**
- **ทำไมถึงถูก:** เปิดสวิทซ์พระเอกเสกเวทมนต์ร่ายมหายักษ์แฝดจำแลง! นี่คือความสามารถลับขิงระดับราชันย์ของ Aurora ที่ตบ RDS หน้าหงาย คือ Amazon แอบฝังความอัจฉริยะกูรูอย่าง **Aurora Auto Scaling** เข้าไปให้ 
เวลาปกติร้านเงียบ มันอาจจะอัด Read replica ยืนฉีกยิ้มรับแขกไว้แค่ตัวเดียว แต่เมื่อไหร่ที่วิกฤตโปร 11.11 บุกคอขวดโดนรุมแห่ทายอินข้อมูลรัวๆ Auto Scaling จะงอกยักษ์จำแลงเครื่องลูก "Read replica ตัวที่ 2, 3... งอกทะลุถึง 15 ตัว!" มายืนก่ายหน้าผากรับออเดอร์หน้าเคาน์เตอร์แบบอัตโนมัติตามคลื่นความตาย และพอหลังเที่ยงคืนคนซา มันก็หุบร่มร่างแฝดทิ้ง ปิดสาขาย่อยเอาเงินค่าเช่ารายชั่วโมงคืนกระเป๋าให้คุณ โคตรล้ำและเซฟตัง Cost-effective สุดๆ

❌ **[ผิด] Increase the size of the Aurora DB cluster.**
- **ทำไมถึงผิด:** ทุบประปาห้องน้ำเปลี่ยนท่อใหม่หมดมันเหนื่อย! การทุบเครื่องทิ้งขยายสเปคเซิร์ฟเวอร์หลักยัดซีพียูอ้าซ่า (Scale-up) ให้ใหญ่ปึ๊กตลอดกาล คือการแก้ปัญหาแบบโง่เขลาขี่ช้างจับตั๊กแตน เพราะในช่วงเวลาตีสองตีสามที่คนเงียบเหงา คุณก็ยังต้องยอมพลีชีพถูกหักเงินจ่ายค่าเช่ารายชั่วโมงเรทเครื่องตัวท็อปเท่าเดิมตลอดกาลบานตะไททั้งเดือน (Overprovisioning) ถือเป็นดีลที่ไม่ประหยัดตังงบประมาณ (ไม่ Cost-effective) ตามเจตนารมณ์เลย 

❌ **[ผิด] Implement read scaling with Aurora Global Database.**
- **ทำไมถึงผิด:** สั่งพิซซ่าให้ขี่ข้ามโลกมากิน! ขยายปีกเปิดร้านแฝดระดับโลกไปทวีปอื่น **Aurora Global Database** 
การไปหนีถอยทัพสร้างเซิร์ฟเวอร์สำเนาแจกจ่ายระดับโลกถล่มไปอีกโขดทวีป (เช่น ตั้งทวีปยุโรป อเมริกา ออสเตรเลีย) มันมีไว้แก้ปัญหาความเร็วกระจุกปิงให้ลูกค้าทวีปนั้นดึงไวๆ แต่มันทำให้คุณต้องเจ็บปวดกระอักเลือดเสียค่าโอนปั๊มข้อมูลเหาะเหินข้ามฝั่งโลก (data transfer cost) เปล่าๆ ปลี้ๆ ซึ่งมโหฬารเกินเบอร์ไปมาก ไม่ตรงกับสเปคต้นเรื่องท้าทายที่คนล้นคอขวดในที่ๆ เดียวกันเลย 

❌ **[ผิด] Set up a read replica that can operate across different regions.**
- **ทำไมถึงผิด:** แตะขอบฟ้าหนีค่าแท็กซี่! เซ็ตขุดร่ายมนต์ให้ Read Replica ถ่อล่องลอยข้ามไปตั้งอยู่โซนสิงคโปร์หรือยุโรปลิ่วๆ (Cross-region) แบบโดดเดี่ยว
หนีปัญหาแพทเทิร์นเดียวกับด้านบน การส่งลากของคัดลอกข้ามขอบฟ้าภูมิภาคตึกฝั่งโลก (Cross-region replication) มันแก้แค่เรื่องกระจายทิศทางหนีตายไฟดับทั้งประเทศ แต่มันไม่ได้แก้ปัญหาหน้าร้านที่โดนคนไทยรุมเหยียบเคาน์เตอร์แจกคูปอง แถมโดนชาร์จค่าบริการส่งค่าทางด่วนเน็ตข้ามทวีปมหาศาลสุดๆ ไม่คุ้มขี้หน้า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Aurora Auto Scaling**: 
  - ฐานข้อมูลกะโหลกกะลาเจ้าอื่น: ถ้ารับแขกไม่ทัน แอดมินต้องตื่นมากลางดึกนั่งกดปุ่มงอกเครื่อง Read Replica ให้เองด้วยมือ พลาดคือล่ม
  - **ความเทพของ Aurora**: มันผสานร่างกับ Auto Scaling ได้ (เหมือนฝั่ง EC2 เลย!) โดยคุณตั้งกฎง่ายๆ ว่า "ถ้า CPU ของ Read Replica ปัจจุบันพุ่งทะลุ 70% ปุ๊บ... จงงอกลูกตัวใหม่มาแบ่งคิวช่วยรับแขกเดี๋ยวนี้ และงอกได้เต็มที่โควต้าถึง 15 สาขานะ!" ลดภาระแอดมินฮีโร่สุดๆ

---
---

## 📌 คำถามที่ 50
**โจทย์:**
A company has a web application that uses Internet Information Services (IIS) for Windows Server. A file share is used to store the application data on the network-attached storage of the company’s on-premises data center. To achieve a highly available system, the company plans to migrate the application and file share to AWS.

Which of the following can be used to fulfill this requirement?

**ตัวเลือก:**
- [x] Migrate the existing file share configuration to Amazon FSx for Windows File Server.
- [ ] Migrate the existing file share configuration to AWS Storage Gateway.
- [ ] Migrate the existing file share configuration to Amazon EFS.
- [ ] Migrate the existing file share configuration to Amazon EBS.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีแอปดึกดำบรรพ์รันบนหน้ากากเว็บเซิร์ฟเวอร์ของลุงบิลเกตส์ **(IIS - Internet Information Services for Windows Server)** ยึดอยู่คู่กับตู้เช่าแชร์โฟลเดอร์เก็บไฟล์ส่วนรวมฝากของในห้องเช่าหน้าออฟฟิศตัวเอง **(on-premises file share)**
ประธานบริษัทมีใบสั่งลงมา ต้องการวิธี **อพยพเด็ดถอนรากถอนโคนอพยพย้ายรังเซิร์ฟเวอร์ (Migrate) ทั้งก้อนนี้ ลี้ภัยโยนเข้าไปฝังร่างเกิดใหม่บนดินแดนแผ่นดินคลาวด์ AWS** โดยที่หน้ากากเว็บเซิร์ฟเวอร์ Windows ต้องทำงานได้ไหลลื่นเหมือนเดิมทุกประการ 
โจทย์ต้องการรู้ว่าควรหิ้วตู้ตะกร้าเก็บไฟล์รุ่นไหนใน AWS มารองรับหน้างานถอดแบบดั้งเดิมของ Windows ได้เนียนที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: นี่คือข้อสอบแยกประเภทเผ่าพันธุ์ตู้ไฟล์! เห็นคีย์เวิร์ดของฝั่งคุณลุงบิลเกตส์อาทิเช่น **`Windows Server`, `Internet Information Services (IIS)` หรือ `SMB file share`** = มองหาบริการคู่หูชาวแก็งวินโดวส์ใน AWS ทันทีนั่นคือ **`Amazon FSx for Windows File Server`** 
- ทริคที่ 2: ระวังโดนสับขาหลอกให้เข้าผิดค่าย! ตู้ **Amazon EFS** (Elastic File System) มันเกิดมาเป็นทาสรับใช้ให้เฉพาะเซิร์ฟเวอร์ค่ายหุ่นยนต์นกเพนกวิ้น **Linux** เท่านั้น! (ใช้ NFS protocol) หากริอ่านเอาค่าย Windows ไปเสียบจูน มันจะช็อตตบตีพ่นด่าชัวร์

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Migrate the existing file share configuration to Amazon FSx for Windows File Server.**
- **ทำไมถึงถูก:** เผ่าพันธุ์เดียวกันจิ้มติดแน่นล้านโวลต์! วงการฝ่าดงไอรอนแมนต้องชี้เป้ากวาดไฟล์ตู้เก่าทั้งหมดโยนใส่ตะกร้าวัวกระทิง **Amazon FSx for Windows File Server** 
FSx ถือกำเนิดตีป้อมสร้างขึ้นมาเพื่อชูธงรับมรดกบาปต่อมวลหมู่ระบบเน็ตเวิร์คแชร์หน้าจอเก่าๆ ของบริษัทที่เป็นค่ายลูกรัก Windows แท้ๆ! มันรองรับระบบ SMB เต็มเหนี่ยว, รองรับพ่วงระบบบัญชีพนักงาน (Active Directory) ครบถ้วน, จัดหน้าตาการผูกเช่าแชร์โฟลเดอร์เพอร์เฟคจูนติดคล้องจองกับแอป IIS อย่างไร้รอยตะเข็บกวนใจ ขนอพยพดึงปลั๊กขึ้นไปใช้ได้ดื้อๆ เหมือนไม่ได้ย้ายออฟฟิศเลย!

❌ **[ผิด] Migrate the existing file share configuration to Amazon EFS.**
- **ทำไมถึงผิด:** เอาอะแดปเตอร์ไอโฟนไปชาร์จซัมซุงเต่า! หิ้วตะกร้าโยนไฟล์ทั้งหมดอพยพเข้าตู้กับข้าว **Amazon EFS**... 
เอพริลฟูลเดย์หนักมาก! ตู้ยักษ์ Amazon EFS เลิกคบกับฝั่งลุงบิลเกตส์ตัดขั้วกันไปนานแล้ว มันเกิดมาเพื่อรอมชอมตีตัวแนบชิดโชว์หุ่นเครื่องเซิร์ฟเวอร์ในคราบ Linux/Mac OS ลัวนๆ (ด้วยช่องสัญญาณโปรโตคอล NFS) เอาแอพขั้ว Windows จ้าวโลกมาเปิดพอร์ตเสียบหน้าด้านๆ มันก็ร้องอี๋หน้าหงายทำงานเด้งป๊อปอัปหลุดกระเด็นไม่ได้แน่ๆ 

❌ **[ผิด] Migrate the existing file share configuration to AWS Storage Gateway.**
- **ทำไมถึงผิด:** สร้างสะพานลอยไม่ยอมข้ามฟากดึงเสารอ! บริการตระกูลเสาสะพานเชื่อม **AWS Storage Gateway** มีเป้าหมายแสนวิเศษเอาไว้เป็นเหมือน "ท่อประปาลวงโลก" ให้ตู้เหล็กเซิร์ฟเวอร์หน้าตึกออฟฟิศของคุณ "หลอกตัวเองว่าพุงใหญ่ขยายจุกขึ้นมาหน้ามืดโกยสูบเก็บของโยนสำรองไปซุกAWSยาวๆนะ" มันคือระบบปลิงดูดลูกครึ่งคลาวด์! 
แต่โจทย์จั่วหัวลั่นเงื่อนไขว่า เบ้าประธานบริษัทสั่งล้างบาง **ย้ายทึ้งทำลายฐานทัพออฟฟิศเดิม (Migrate) หิ้วขึ้นไปฝังตัวบนดินแดน AWS อิ่มๆ ทั้งร่างเต็มร้อย** จึงไม่มีพื้นที่ว่างสำหรับสะพานเสาเชื่อมลูกครึ่งพะรุงพะรังแบบเก่าซุกหลังอีกแล้ว

❌ **[ผิด] Migrate the existing file share configuration to Amazon EBS.**
- **ทำไมถึงผิด:** เอาไม้กวาดก้านมะพร้าวไปกวาดฝุ่นถนนสี่เลน! แปะชิปข้อมูลโยนฉาบไปบนก้อนฮาร์ดดิสก์บล็อก **Amazon EBS**... 
EBS มันคือท่อนฮาร์ดดิสก์บล็อกส้นทื่อๆ ที่หน้าไม่อายเสียบติดแปะแน่นอยู่ท้ายตูดหลืบของเครื่องคอมพิวเตอร์ลูกกระจ๊อก EC2 "แบบเดี่ยวๆ ตัวต่อตัวผัวเดียวเมียเดียว (Block storage)" มันไม่ได้มีสติปัญญากลไกดัดแปลงร่างบิดตัวเองลอยๆ พองโตให้เครื่องอื่นทั้งแผนกหรือผู้ใช้หลายๆ คนจากคนละเครื่องวิ่งเสียบกุญแจมาเปิดคลิกดูไฟล์รุมทึ้งแว๊นๆ แชร์ร่วมโต๊ะจีนพร้อมกันได้! (มันไม่ใช่ตัวกลาง Shared File System สำหรับเผื่อแผ่) ถือว่าเกาไม่ถูกที่คันที่สุด

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **NAS (Network Attached Storage)**: กล่องตู้แชร์ไฟล์ประจำออฟฟิศ หน้าตาคล้ายๆ ถังใส่น้ำแข็งให้พนักงานก๊อปปี้สลิปเงินเดือนโหลดโยนบิลเข้าไปใส่ๆ ถ้าคุณจะย้ายตู้เศษเหล็กพวกนี้ขึ้นคลาวด์ AWS มีบริการคู่ขวัญดักรอเตะอยู่แล้วแบ่งตามค่าย:
  - **ตู้พนักงานใช้ Linux ล้วน**: ให้ย้ายปาใส่ **Amazon EFS**
  - **ตู้พนักงานใช้ Windows เป็นหลัก (พ่วง Active Directory, ใช้ IIS)**: ให้ย้ายปาใส่ **Amazon FSx for Windows File Server** 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 11: ข้อ 51 - 55)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 51
**โจทย์:**
A company plans to migrate its on-premises workload to AWS. The current architecture is composed of a Microsoft SharePoint server that uses a Windows shared file storage. The Solutions Architect needs to use a cloud storage solution that is highly available and can be integrated with Active Directory for access control and authentication.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [x] Create a file system using Amazon FSx for Windows File Server and join it to an Active Directory domain in AWS.
- [ ] Create a file system using Amazon EFS and join it to an Active Directory domain.
- [ ] Create a Network File System (NFS) file share using AWS Storage Gateway.
- [ ] Launch an Amazon EC2 Windows Server to mount a new Amazon S3 bucket as a file volume.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังจะอพยพย้ายระบบงานหน้าออฟฟิศ (on-premises workload) บินขึ้นฟ้าไป AWS 
ตัวเอกของงานคือแอปพลิเคชั่น **Microsoft SharePoint** ซึ่งกอดคอสิงสถิตอยู่คู่กับตู้เช่าเก็บเอกสารแบบกระจายแชร์ **(Windows shared file storage - SMB)** 
สถาปนิกระบบได้รับใบสั่งว่า "จงหาตู้เก็บไฟล์ฉบับคลาวด์พันธุ์อึดตายยาก และต้องสามารถเสียบปลั๊กซิงก์เข้าระบบตรวจสอบชื่อพนักงานบริษัทดั้งเดิม **(Active Directory)** เพื่อสแกนบัตรรักษาความปลอดภัยคุมสิทธิ์เข้าแชร์โฟลเดอร์ได้เหมือนเดิมเปี้ยบเลย"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: แกะยี่ห้อเผ่าพันธุ์ตู้ไฟล์! เห็นคีย์เวิร์ดของฝั่งครอบครัวตระกูลลุงบิลเกตส์อาทิเช่น **`Microsoft SharePoint`, `Windows shared file storage` (หรือ SMB/CIFS)** และมีการบังคับให้เชื่อมระบบป้ายชื่อล็อกอินมรดกออฟฟิศอย่าง **`Active Directory`** = ไม่ต้องคิดมากเลย บริการตู้ไฟล์เก็บของตัวเดียวบนคลาวด์ AWS ที่เป็นทายาทเนื้อแท้ของ Windows ก็คือ **`Amazon FSx for Windows File Server`** 
- ทริคที่ 2: ระวังโดนสับขาหลอกพาเข้าผิดค่าย! ตู้ **`Amazon EFS`** (กับคำว่า NFS) เกิดมาเป็นทาสรับใช้ให้เฉพาะเซิร์ฟเวอร์ค่ายนกเพนกวิ้นแสนรัก **Linux/Mac** เท่านั้น! ถ้าเอาแอพขั้ว Windows จ้าวโลกอย่าง Microsoft SharePoint ไปเสียบตูดมัน มันจะพ่น Error ช็อตใส่ชัวร์ป้าบ 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a file system using Amazon FSx for Windows File Server and join it to an Active Directory domain in AWS.**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาวหน้ามนต์ตรงสเปค! เลือกสร้างตู้มังกร **Amazon FSx for Windows File Server** จับเสียบเข้าเครือข่ายชื่อของพนักงานบริษัท (Active Directory domain) นี่คือไม้ตายที่ออกแบบมาเพื่อกอบกู้แอป Windows แผ่นแท้อย่าง SharePoint อย่างแท้ 100% (Native compatibility) 
มันถอดรหัสคุยผ่านโปรโตคอล SMB ได้รื่นไหล พร้อมฟีเจอร์เกาะติดบัญชีพนักงานผูก AD ให้จัดการสิทธิ์การเข้าโฟลเดอร์พนักงาน (Access Control List - ACLs) เป็นรายบุคคลได้แบบเนียนกริบ ไม่ต้องปรับรื้อเขียนโค้ดวิธีทำงานใหม่เลยสักบรรทัด

❌ **[ผิด] Create a file system using Amazon EFS and join it to an Active Directory domain.**
- **ทำไมถึงผิด:** เอพริลฟูลเดย์อีกทีหลอกกูด่า! การอัญเชิญระบบแชร์ไฟล์ก้อนเมฆ **Amazon EFS (Elastic File System)** ออกโรงเอามาควบกับบัญชีพนักงาน Active Directory... 
บอกไปล้านรอบแล้วตู้ Amazon EFS เลิกคบกับฝั่งลุงบิลเกตส์ไปนานแล้วตั้งแต่วันเกิด! มันถูกสร้างมาเพื่อประเคนให้เครื่องเซิร์ฟเวอร์ในคราบ Linux ล้วนๆ (โปรโตคอล NFSv4) ถ้าคุณอุตริเอาแอพค่าย Windows บริสุทธิ์มาเปิดพอร์ตเสียบหน้าด้านๆ มันจะร้องอี๋พังพินาศไม่ทำงานสิจ๊ะ 

❌ **[ผิด] Create a Network File System (NFS) file share using AWS Storage Gateway.**
- **ทำไมถึงผิด:** สร้างท่อน้ำผิดสเปคแถมยังไม่ได้ย้ายบ้าน! ไปปั้นท่อสูบน้ำ **Network File System (NFS)** ผ่านตะแกรงก๊อกประตูทางเชื่อม **AWS Storage Gateway** 
คีย์เวิร์ดแห่งการฆ่าตัวตายคือคำว่าตะแกรง "NFS"! เพราะโจทย์ต้องการย้ายบ้าน "ค่าย Windows" ขึ้นเมฆ! แต่สถาปนิกปัญญาอ่อนดันทุรังจะยัดท่อหลอดดูด NFS ฝั่ง Linux ไปให้ใช้ มันก็เชื่อมตบตีคุยกันไม่รู้เรื่อง และที่สำคัญโจทย์สั่งให้ย้ายถอนรากถอนโคนอพยพย้ายรัง (Migrate) ไปคลาวด์ ไม่ได้จ้างให้ลากต่อสายเน็ตสะพานคลาวด์ครึ่งใบ (Storage Gateway) ยื้อเวลาหน้าออฟฟิศทิ้งไว้ 

❌ **[ผิด] Launch an Amazon EC2 Windows Server to mount a new Amazon S3 bucket as a file volume.**
- **ทำไมถึงผิด:** งกขี้เหนียวแบบไร้สติ! เปิดเช่าเครื่องเซิร์ฟหลอกๆ (EC2 Windows) เปล่าๆ แล้วดึงอัดกากยัดถังช้าง **Amazon S3** ให้โผล่แปลงร่างเป็นไดรฟ์ C: ทื่อๆ
Amazon S3 มันเป็นโกดังออบเจกต์หน้าเรียบ (Object Storage) มันไม่ได้ถูกสร้างหรือเปิดอ้าซ่ามารองรับการใช้ระบบเช็คชื่อล็อกอินสแกนยืนยันชื่อบัญชีพนักงานทีละคนอย่างยิบย่อย (Not integrated with Active Directory naturally) มันไม่มีโครงสร้างระบบรักษาความปลอดภัยระดับโฟลเดอร์ลึกๆ แบบแฟ้มตู้เอกสารเซิร์ฟเวอร์ไฟล์แท้ๆ ยัดเยียดฝืนเข้าไปมีแต่จะล่ม

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **ข้อสังเกต AWS Storage Gateway File Gateway**: ถึงแม้ว่าตัว File Gateway รุ่นปัจจุบันจะรองรับโปรโตคอลลากไฟล์แบบ SMB (สำหรับ Windows) ได้แล้วก็จริง แต่มันหน้าตาไม่ใช่เป้าหมายปลายทางที่ดีที่สุดหรอกนะ เพราะเป้าหมายของการใช้ Gateway คือ "ฉันอยากเก็บเซิร์ฟเวอร์ดั้งเดิมไว้ใต้โต๊ะที่ออฟฟิศเหมือนเดิม แค่อยากย้ายรูปเก่าไปดองยองๆบน AWS" 
แตกต่างจากโจทย์ข้อนี้ที่ประกาศกร้าวลั่นซอยว่าลุกฮือจะ "ลี้ภัยอพยพย้ายบ้านระเบิดออฟฟิศทิ้งข้ามไปอยู่คลาวด์ 100% เลยต่างหาก (Migrate)" เพราะตัว FSx for Windows คืออพาร์ทเมนต์ตู้บนคลาวด์หอพักของแท้ที่สแตนบายรออยู่เลย 

---
---

## 📌 คำถามที่ 52
**โจทย์:**
A financial services company plans to migrate its trading application from on-premises Microsoft Windows Server to Amazon Web Services (AWS).
The solution must ensure high availability across multiple Availability Zones and offer low-latency access to block storage.

Which of the following solutions will fulfill these requirements?

**ตัวเลือก:**
- [x] Configure the trading application on Amazon EC2 Windows Server instances across two Availability Zones. Use Amazon FSx for NetApp ONTAP to create a Multi-AZ file system and access the data via iSCSI protocol.
- [ ] Deploy the trading application on Amazon EC2 Windows Server instances across two Availability Zones. Use Amazon Elastic File System (Amazon EFS) to provide shared storage between the instances. Configure Amazon EFS with cross-region replication to sync data across Availability Zones.
- [ ] Configure the trading application on Amazon EC2 Windows instances across two Availability Zones. Use Amazon Simple Storage Service (Amazon S3) for storage and configure cross-region replication to sync data between S3 buckets in each Availability Zone.
- [ ] Deploy the trading application on Amazon EC2 Windows Server instances across two Availability Zones. Use Amazon FSx for Windows File Server for shared storage.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทวาณิชธนกิจทางการเงินหน้าเลือดต้องการทิ้งหอประวัติศาสตร์ ย้ายแอพโปรแกรมปั่นหุ้นระดับพระกาฬ (Trading application) ออกจากกล่องคอมใต้โต๊ะหลังเครื่องถ่ายเอกสาร **Microsoft Windows Server** ไปเฉิดฉายจรัสแสงในโลกของ AWS 
โดยกางตั้งเป้าหมายเสาเข็มสำคัญสองใบสลักไว้ว่า 
1. ระบบต้องเป็นหัวกะโหลกแฝดตายยากทนไฟตึกถล่ม (High availability **across multiple AZs**)
2. ขุมพลังสตอเรจฮาร์ดดิสก์ต้องมีความเร็วดุจสายฟ้าฟาดในโหมดเสียบยึดท้ายประกับตึกก้อนใครก้อนมัน **(low-latency access to BLOCK STORAGE)** 
จะใช้พระเอกลูกสูบตัวไหนแบกรับแท่นแพลทฟอร์มหนักหน่วงนี้?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดบังคับให้ใช้ก้อนฮาร์ดดิสก์แบบดิบๆ เร็วทะลวงขีดจำกัดอย่าง **`block storage`** ร่วมกับต้องทำให้ได้ **`high availability (Multi-AZ)`** บนสภาพแวดล้อมปนๆ **`Windows Server`** = ตัด Amazon EBS ทิ้งเป็นข้อแรก! เพราะ EBS มันผูกขาดตัวต่อตัวเสียบเครื่องใครเครื่องมันเป็น Block Storage จริง แต่มันเกลียดการโดนแชร์ข้ามซีกตึก AZ (ยกเว้นเฉพาะบางรุ่นเทพๆซึ่งโจทย์ไม่มีให้เลือก) 
- ทริคที่ 2: บริการเดียวที่แหกคอกเป็นสัตว์ประหลาด 2 ขั้ว ที่ตอบโจทย์การ "แผ่แชร์ฮาร์ดดิสก์ข้ามตึก Multi-AZ" และยังทะลึ่งปล่อยพลังเปิดท่อเสียบเป็นฮาร์ดดิสก์ดิบตระกูลสเปคสูงลิ่ว "Block storage (ผ่านพอร์ตชื่อว่า **`iSCSI`**)" ได้อย่างน่าอัศจรรย์ คือ **`Amazon FSx for NetApp ONTAP`** จำชื่อยอดมนุษย์รายนี้ไว้ให้ดีๆ 
- ทริคที่ 3: ระวังของปลอม! ถ้าช้อยส์บอกให้ใช้ **`Amazon FSx for Windows File Server`** หรือ **`Amazon EFS`** ให้สะบัดบ๊อบใส่ทันที! เพราะมันเกิดมาเพื่อทำงานเป็นแค่ตู้แชร์ไฟล์โป๊ส่วนกลางธรรมดาๆ เลคเชอร์ชาวบ้าน (File storage) ไม่มีความสามารถเสกตัวเองเป็นแผ่นบล็อก (Block storage) จ่ายข้อมูลโหดๆดุๆ ได้แบบรายแรก

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the trading application on Amazon EC2 Windows Server instances across two Availability Zones. Use Amazon FSx for NetApp ONTAP to create a Multi-AZ file system and access the data via iSCSI protocol.**
- **ทำไมถึงถูก:** เผด็จศึกไร้ที่ติ! ตั้งฐานรับด้วยเครื่องเทรดหุ้น Windows ฟาดเรียบ 2 ตึก 2 โซน AZ แล้วจ้างยอดขุนพลอัจฉริยะนามกร **Amazon FSx for NetApp ONTAP** มาแบกถังกระสุนฮาร์ดดิสก์ระดับเทพ 
พระเอกตัวจริงที่เก่งที่สุดและแบกได้ทั้งสองระบบคือยี่ห้อ NetApp ตัวนี้แหละ! มันคือมังกรฟิวชั่น 2 หัวที่เสิร์ฟพลังงานแผ่รังสีได้เต็มสตรีมทั้งคราบ "แชร์ไฟล์โฟลเดอร์นิ่มๆ" และ "จำแลงร่างเป็นก้อนฮาร์ดดิสก์เดี่ยว (Block storage) ยื่นหอกเสียบท้ายตูดเครื่องผ่านรหัสผ่านหัวจ่าย **iSCSI protocol**" ให้ความเร่าร้อนระดับหน่วยเสี้ยววินาทีแบบก้อน Block แท้ๆ แถมยังร่ายมนตร์ทำร่างแฝดปกป้องภัยข้ามตึกโซน Multi-AZ ได้เพอร์เฟกต์! ครบทุกเม็ดที่โจทย์สั่ง!

❌ **[ผิด] Deploy the trading application on Amazon EC2 Windows Server instances across two Availability Zones. Use Amazon FSx for Windows File Server for shared storage.**
- **ทำไมถึงผิด:** มารองตัวนี้ไม่ตอบโจทย์รอบด้าน! แม้จะหั่นตึกกระจายเครื่อง 2 โซน AZ สวยหรู แล้วตั้งแท่นประดับ **Amazon FSx for Windows File Server** เสิร์ฟเป็นที่เก็บตระกูลส่วนกลาง...
แต่ FSx for Windows File Server พรสวรรค์มันทำหน้าที่เป็นได้แค่เพียงตู้ไปรษณีย์เสิร์ฟโฟลเดอร์แชร์เอกสาร (Shared File Storage) ธรรมดาๆ มันไม่สามารถแปลงซากงอกปลั๊กมาพ่นไฟเสียบเครื่องเป็นเทคโนโลยีตระกูลประมวลผลเร็วดิบ **ฮาร์ดดิสก์บล็อก (Block storage)** ได้ตามใจโจทย์ประสงค์ 

❌ **[ผิด] Deploy the trading application on Amazon EC2 Windows Server instances across two Availability Zones. Use Amazon Elastic File System (Amazon EFS) to provide shared storage between the instances. Configure Amazon EFS with cross-region replication to sync data across Availability Zones.**
- **ทำไมถึงผิด:** ผิดมหันต์ 2 ประตูนรกระเบิด! หนีบเครื่องลงตึกคู่ 2 โซน AZ แล้วควบตู้ปันสุข **Amazon EFS** ตั้งตากครอสข้ามภาคโชว์...
1. Amazon EFS รังเกียจขั้ว Windows อยู่แล้วเสียบไม่ติดหน้าแหกไปหนึ่ง! 2. อารมณ์ยังมามั่วโหมด EFS มันทำตัวเป็นถังดอง "ระบบไฟล์แชร์ส่วนกลาง (Shared File Storage)" ขนานแท้ 100% ตอบโจทย์เรื่องสเปคความกระแทกกระทั้นดิบๆ ของระบบ Block Storage โหดๆไม่ได้ 3. โจทย์บอกให้กันตึกถล่ม Multi-AZ แต่แกไปซ่าตั้งคัดลอกข้ามฝั่งโลก Cross-Region ทำไม เสียเงินอ่วมซะเปล่า 

❌ **[ผิด] Configure the trading application on Amazon EC2 Windows instances across two Availability Zones. Use Amazon Simple Storage Service (Amazon S3) for storage and configure cross-region replication to sync data between S3 buckets in each Availability Zone.**
- **ทำไมถึงผิด:** ห่างไกลไปยันขอบกาแลกซี่ดาวอังคาร! โกยเครื่องลงตึกคู่ แล้วแหย่สายเซิร์ฟเวอร์ตลาดหุ้นไปเสียบคลังเก็บลอยฟ้ากระทะทองแดง **Amazon S3** ยิงกระจกข้ามทวีปพ่นข้ามเขต...
Amazon S3 โคตรไม่ใช่อุปกรณ์จำพวกความเร็วสูง Block storage ท่ี่จะมาดันท่อน้ำเลี้ยงเซาะตลาดหุ้นแบบรัวๆระดับเสี้ยววินาที แต่มันคือโรงเก็บมโหฬาร "แฟ้มเศษออบเจกต์ (Object storage)" ที่เดินต้วมเตี้ยมกระเซอะกระเซิง แถมอุตริจะโคลนนิ่งก๊อปข้ามทวีป (Cross-Region) ไปทำไม? โจทย์บอกแค่กันพังระดับตึกข้างซอยบ้าน (Multi-AZ) บ้าบอคอแตกทำเกินเหตุให้เสียเงินฟุ่มเฟือยฟรี

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **FSx Series Storage Types ชาติตระกูลตู้เหล็ก**:
  - `FSx for Windows File Server`: ถือสัญชาติ File Storage (SMB)
  - `FSx for Lustre`: ถือสัญชาติ File Storage (สายบ้าพลังลากรถสิบล้อ)
  - **`FSx for NetApp ONTAP`**: สัตว์ประหลาดลูกผสม เป็นได้ทั้ง File Storage (NFS, SMB) แถมยังอวตารแปลงร่างแยกเขี้ยวจ่ายท่อ iSCSI เป็น **Block Storage** (อารมณ์เหมือน EBS) ได้ด้วย! จึงเป็นข้อเดียวที่สอบผ่านวิชา Block storage ของโจทย์นี้!

---
---

## 📌 คำถามที่ 53
**โจทย์:**
A Solutions Architect is hosting a website in an Amazon S3 bucket named `tutorialsdojo`. The users load the website using the following URL: `http://tutorialsdojo.s3-website-us-east-1.amazonaws.com`. A new requirement has been introduced to add JavaScript on the webpages to make authenticated HTTP `GET` requests against the same bucket using the S3 API endpoint (`tutorialsdojo.s3.amazonaws.com`). However, upon testing, the web browser blocks JavaScript from allowing those requests.

Which of the following options is the MOST suitable solution to implement for this scenario?

**ตัวเลือก:**
- [ ] Enable cross-account access.
- [ ] Enable Cross-Region Replication (CRR).
- [x] Enable Cross-origin resource sharing (CORS) configuration in the bucket.
- [ ] Enable Cross-Zone Load Balancing.

---
### 🎯 โจทย์ต้องการอะไร?
สถาปนิกทำตัวถังหน้าเว็บฝากบ้านไว้กลางแดดบนถัง **Amazon S3** ซึ่งคนเข้าปกติดีด้วยโดเมนชื่อสายบุญ `...s3-website-us-east-1...`
แต่อยู่ๆบอสทุบโต๊ะ แจกใบสั่งบอกว่า "ให้ทีมงานยัดก้อนยันต์โค้ดสคริปต์ **JavaScript** เข้าเว็บ เพื่อเเอบวิ่งดูดทะลวงชอนไชไปหยิบไฟล์แปลกๆ ในรูถังดั้งเดิมของ S3 ผ่านสายตรงชื่อโดเมนหลังบ้านรหัส API ดิบๆ (`...s3.amazonaws.com`)" 
ปัญหาโลกแตกโผล่มาทันทีคือ... ตัวล็อกตาข่ายของเบราว์เซอร์ลูกค้า (Chrome, Safari, Firefox) "มันร้องกรี๊ด สั่งสกัดกั้นบล็อกหุบปากสคริปต์ JavaScript เตะตายคาตีนห้ามสูบรูปดึงไฟล์เป็นอันขาด (Browser blocks JavaScript)!" 
สถาปนิกมึนตึ้บ จะหาวิธีชักธงขาว อนุญาตเสกคาถาทะลวงกำแพงให้เบราว์เซอร์เชื่อใจสคริปต์ผีบ้าและปล่อยให้มันดูดภาพทะลุช่องได้ยังไง?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: นี่คือข้อสอบท่องจำเวทมนต์ตายตัว! ถ้าเห็นฉากโศกนาฏกรรมคำว่าสคริปต์ **`JavaScript` ดันถูกบล็อกด่านกักกันขังจากหน้า `เบราว์เซอร์ (web browser blocks)`** ตอนที่พยายามยื่นมือไปดึงทะลวงข้อมูลดึงวัตถุข้ามตึกโดเมนดึงไฟล์ข้าม API = ยาวิเศษขนานเดียวในปฐพีที่จะแก้คำสาปเบราว์เซอร์หอนี้คือกระดาษยันต์ที่มีชื่อว่า **`CORS (Cross-Origin Resource Sharing)`** กาปุ่มนี้อัดหน้าจอรับคะแนนไปเลย! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Cross-origin resource sharing (CORS) configuration in the bucket.**
- **ทำไมถึงถูก:** เคล็ดลับของการตบหน้าม้าพยศทำเว็บข้ามสายพันธ์ุ! ธรรมชาติของเว็บเบราว์เซอร์ขี้ระแวงอย่าง Chrome เวลามันเห็นสคริปต์ลูกเมียน้อยอย่าง (JavaScript) ทำตัวพยายามยืนขู่ดึงภาพหรือดึงโค้ดวิ่งเข้าดึงตระกูลโดเมนชื่ออื่นที่หน้าตา "ไม่ตรงเป๊ะกับชื่อเว็บหน้ากาก URL ใหญ่ (Cross-Origin)" ตัวเบราว์เซอร์มันจะชักกระบี่หวดตีกบาลบล็อกป้องกันภัยแฮกเกอร์ล้วงกระเป๋าสตางค์หลอกดึงข้อมูล (CORS Error) โดยอัตโนมัติตามสัญชาตญาณ 
การจะบอกให้เบราว์เซอร์ผ่อนปรนปลดเบรกมืออนุญาตให้ผี JavaScript ทำงานข้ามค่ายได้ก็คือ คุณต้องพ่นป้ายไปตั้งกฎ "CORS" เซ็นรับรองชื่อคนนอกเหล่านี้ซะที่หน้าถัง Amazon S3 เลย เบราว์เซอร์ถึงจะไฟเขียวปล่อยผ่านแบบไร้รอยต่อ

❌ **[ผิด] Enable cross-account access.**
- **ทำไมถึงผิด:** เอากุญแจบ้านไปไขตู้เย็น! การลากฟีเจอร์พ่วงสิทธิ์ไอดีข้ามค่ายบัญชี AWS ตัวกลม
"Cross-account access" มันเป็นเรื่องกงการของเจ้าขุนมูลนายมาเฟีย IAM หลังบ้านของระบบ AWS มันเป็นเรื่องลากระบบเปิดทางขยายพรมแดนให้เพื่อนบริษัทก้อนฝั่ง Accounts อื่นโผล่หัวมุดข้ามกำแพงมาหยิบของได้... แต่มันไม่ได้มียาหยอดตาสนิทชิดเชื้อเกี่ยวพันอะไรกับคำสั่งเบราว์เซอร์แบนสกัดกั้นหน้ากาก JavaScript ผู้บุกรุกดึงภาพข้ามสระว่ายน้ำตัวเอง (CORS) ใดๆทั้งสิ้น หลงทางสุดๆ 

❌ **[ผิด] Enable Cross-Region Replication (CRR).**
- **ทำไมถึงผิด:** หันไปพึ่งปาฏิหาริย์ตีพิมพ์กระจายก๊อปปี้ปั๊มเมฆระดับโลกพาดผ่านทวีป... 
CRR เอาไว้ใช้ตอนเวลาคุณต้องการ "โคลนนิ่ง" ของก้อนถังขยะทั้งก้อนให้เป็นอมตะแผ่รัศมีข้ามอวกาศไปอีกฝั่งสาขาสหรัฐอเมริกาเพื่อประหยัดทางหนีไฟให้ลูกค้าโซนอื่น หรือหนีภัยแผ่นดินไหว ไม่ใช่ลากร่างสถิตย์มาแวะป้อแป้แก้อาการหน้าจอเบราว์เซอร์ชาวบ้านกระตุกบล็อก JavaScript โว้ยยย 

❌ **[ผิด] Enable Cross-Zone Load Balancing.**
- **ทำไมถึงผิด:** เปิดระบบไฟจราจรไม้กั้นถนนสองเลนสลับรถวิ่งไปมา...
ไอ้นี่โผล่มาตลกที่สุด! มันคือปลั๊กพ่วงของเครื่องสูบน้ำหล่อๆ อย่าง Elastic Load Balancer (ELB) ที่กระจายแขกเข้าปาร์ตี้ตึก 2 ฝั่งให้เท่าๆกัน ซึ่งหน้าตาของมันไม่ได้มีชีวิตเกี่ยวพัน 4 สลึงผูกพันธ์กับถัง S3 นิ่งๆ ของประเด็นความบรรลัยในโจทย์ข้อนี้เลย 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **CORS อธิบายง่ายๆ**:
  - เว็บเราชื่อ `a.com` แต่ JavaScript ในหน้าเว็บเราดันทะลึ่งจะพิมพ์คำสั่งโค้ดดึงรูปลับของแอปจากถังที่ชื่อ `b.com`
  - เบราว์เซอร์ Chrome ตกใจแรงนึกว่าโดนไวรัสขโมยดูดข้อมูล! เลยเตะปลั๊กดับทิ้งบล็อกซะ! (CORS Error สีแดงเถือกในหน้า Console)
  - วิธีแก้: เราแค่ต้องเดินไปแปะป้ายกระดาษอนุญาต (CORS Configuration) ที่หน้าประตูถัง `b.com` ว่า "เฮี้ยน! โง่! อย่ากรี๊ด! ข้าอนุญาตให้สคริปต์ชะม้อยจากบ้านเว็บ `a.com` โกยล้วงไข่หยิบแอปเปิ้ลรูปภาพของข้าไปได้ตามสบายเลย" จบ! Chrome จะหุบปากเงียบและโหลดภาพติดสวยงาม

---
---

## 📌 คำถามที่ 54
**โจทย์:**
A tech company has a CRM application hosted on an Auto Scaling group of On-Demand EC2 instances with different instance types and sizes. The application is extensively used during office hours from 9 in the morning to 5 in the afternoon. Their users are complaining that the performance of the application is slow during the start of the day but then works normally after a couple of hours.

Which of the following is the MOST operationally efficient solution to implement to ensure the application works properly at the beginning of the day?

**ตัวเลือก:**
- [ ] Configure a Dynamic scaling policy for the Auto Scaling group to launch new instances based on the Memory utilization.
- [ ] Configure a Dynamic scaling policy for the Auto Scaling group to launch new instances based on the CPU utilization.
- [ ] Configure a Predictive scaling policy for the Auto Scaling group to automatically adjust the number of Amazon EC2 instances
- [x] Configure a Scheduled scaling policy for the Auto Scaling group to launch new instances before the start of the day.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีแอปพลิเคชั่นคีย์เอกสารพิมพ์ยิกๆ (CRM) วางซ้อนนอนรออยู่หลังปั๊มสูบลมสเกลใหญ่ **Auto Scaling EC2 (ซึ่งเป็นกระบะยำรวมมิตรตั้งกติกาปนกันทั้งเครื่องใหญ่เครื่องเล็กกระจิ๋ว)** 
วิถีชีวิตพฤติกรรมติ่งแอปนี้โคตรตายตัวคือ "มนุษย์เงินเดือนจะแห่แย่งกันตอกบัตรเข้าใช้เฉพาะเวลาทำงานเป๊ะๆ ตั้งแต่ **9 โมงเช้า - 5 โมงเย็นทุกวี่วัน**"
แต่เกิดหายนะเสียงระฆังบ่นด่าร้องเรียนตีคลุ้งทุกเช้าว่า "หน้าเว็บแม่งโคตรกาก อืดโคตรๆกว่าจะโหลดติดหมุนติ้วในตอน 9 โมง (เครื่องโหลดไม่ทันโหลดเต่าคลาน) แต่พอซักพักคล้อยสายบ่ายๆ เสือกเร็วลื่นปรี๊ดดทำตัวปกติซะงั้น"
สถาปนิกปวดหัวทุบโต๊ะ จะแก้ปัญหาจราจรแออัดติดขัดที่หน้าประตูแบบรู้ตารางชีวิตชัดเจนยังไง ถึงจะเนียน นุ่มนวล และฉลาดหน้าตาดีที่สุด (most operationally efficient)?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดพฤติกรรมปาเถื่อนคนแห่กระแทกแหกค่ายชัดเจนทะลุปรุโปร่งล่วงหน้าอย่างเวลานาฬิกาปลุก  **`extensively used during office hours from 9 in the morning to 5` (ใช้บี้แหลกเฉพาะ 9 โมงเช้าถึง 5 โมงเย็น)** = ไม่ต้องพึ่งหมอดูหมอผีใดๆ ทั้งสิ้น เลื่อนเมาส์ไปกาปุ่มโหมดตั้งเวลาชงโอวัลตินรอ **`Scheduled scaling policy`** อย่างเดียวเท่านั้น! เป็นท่ามาตรฐานของการแก้ปัญหาฝูงซอมบี้พนักงานเปิดคอมตอกบัตรเช้าที่เนียนที่สุดในจักรวาล AWS
- ทริคที่ 2: อย่าหลงกล **`Predictive scaling policy`** (การใช้พลังจิตเก็งกำไรพยากรณ์ล่วงหน้า)! แม้มันจะแอบฉลาดและรู้ว่า 9 โมงพนักงานจะพุ่งชน... แต่โจทย์ดันวางกับดักขบเหลี่ยมไว้ตรงท่อนคำว่า **EC2 instances "with different instance types and sizes (เครื่องใหญ่ปนเล็กยำทิ้งไข่)"** ระบบพลังจิต Predictive เป็นพวกหัวแข็ง จะทำงานได้แม่นยำฟินสุดๆ ก็ต่อเมื่อคุณใช้ฝูงเครื่องถ่ายเอกสารก๊อปปี้บล็อก "ขนาดสเปคเดียวกันเป๊ะทั้งหมดทุกหน่อ (homogenous)" ถ้าเครื่องเล็กปนใหญ่ยำรวมแบบนี้ กราฟพยากรณ์มันจะเพี้ยนโง่กะหลั่วเเฉะเลย ห้ามเลือกเด็ดขาด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure a Scheduled scaling policy for the Auto Scaling group to launch new instances before the start of the day.**
- **ทำไมถึงถูก:** เผด็จศึกเนียนกริบดุจสายลม! การตั้งนาฬิกาปลุกเลขาให้ชงกาแฟเสิร์ฟตั้งเตารอหน้าประตู **"Scheduled scaling policy"** วางคิวเบ่งขยายปั๊มเสกเครื่อง EC2 รอล่วงหน้าก่อน 9 โมงสักครึ่งชั่วโมง...
ถ้ารู้พฤติกรรมกะเวลาลูกสูบคนฮิตตีขึ้นลงล่วงหน้าชัดเจนแบบตายตัวฟันธง ไม่ต้องเล่นลีลาท่าพิสดารครับ! ใช้วิธี **สั่งออปชั่นเซ็ตเปิดลานจอดรถล่วงหน้าตามเวลา (Schedule)** นี่แหละชัวร์ร้อยเปอร์เซ็นต์ พอถึงเวลา 8:30 น. มันก็จะเริ่มขยับตะกุยเปิดบูตเครื่องหน้าใหม่เสียบไฟรอรับรับฝูงมนุษย์เงินเดือนทันที พอ 9 โมงปุ๊บลื่นปรื้ดดดดดกระจายคิวหายวับไม่ติดขัด ไม่เจ็บตัวหน้านิ่วคิ้วขมวดรอด่าฟรีตอนเช้าอีกแล้ว

❌ **[ผิด] Configure a Dynamic scaling policy for the Auto Scaling group to launch new instances based on the CPU utilization.**
- **ทำไมถึงผิด:** คล้อยตามขี้ปากคลำทางความร้อน! (Dynamic CPU utilization) พอเห็นเครื่องหอบแฮ่กๆ กระหืดกระหอบถึงจะเริ่มหน้าแหกตกใจปั๊มเครื่องเพิ่ม...
ก็เพราะการที่มันโหมดวัวหายล้อมคอกนี่แหละต้อง "รอให้เครื่องเหนื่อยหอบจัด (กราฟพุ่งพี้คขี้พุ่ง)" ถึงจะคายสติเรียกเพื่อนมาช่วย! พอตอนที่ระบบกำลังปั๊มปลดล็อกเสกสร้างก้อนเซิร์ฟเวอร์ใหม่มันต้องใช้เวลาบูตวินโดว์ 5-10 นาที... จังหวะนั้นพนักงานหัวเสียด่ารัวกด F5 รัวๆ หน้าเว็บอืดกากแตกไปแล้วไงล่ะ! แก้อาการเป็น "แก้ปลายเหตุ" วิ่งตามปัญหาไม่ทันเวลาอาหารเช้าโคตรๆ 

❌ **[ผิด] Configure a Dynamic scaling policy for the Auto Scaling group to launch new instances based on the Memory utilization.**
- **ทำไมถึงผิด:** ซ้ำรอยรอยด่างพร้อยของช้อยส์ข้อข้างบน! เปลี่ยนแค่ชื่อเซนเซอร์จับเหงื่อด้วยปริมาณการเขมือบสุกี้แรม (Dynamic Memory) ตีปีกเมื่อเครื่องตึงอืดอาดย้วย...
เพราะหลุมพรางของการตั้งหน้าตั้งตารับจากเซนเซอร์ Metric ท่าเก๋าตอนเกิดเหตุยับเยินไปแล้ว มันย่อมออกสเตปเดินชักช้าสะดุดและแก้กู้หน้าภาพพจน์ตอนเช้าอันเร่งด่วนจี๋ไม่ทันคลื่นลูกสูบที่ทะลักโถมเข้ามา ยอมตัดใจโดนด่าอืดปนกันไปเปล่าๆ 

❌ **[ผิด] Configure a Predictive scaling policy for the Auto Scaling group to automatically adjust the number of Amazon EC2 instances**
- **ทำไมถึงผิด:** สวมมงกุฎหมอดูเทวดาพยากรณ์พลาดท่าตกม้าตาย! **Predictive scaling** พยากรณ์เดาอนาคตจับจุดกราฟพุ่งพี้ยว...
เกือบจะดูหล่อและอายุน้อยร้อยล้านใช้ช่วยแก้ปัญหาปาดหน้ารอต้อนรับแขกล่วงหน้าได้! "แต่โชคร้าย..." โจทย์ระบุซ่อนซุกรอยตะเข็บเงื่อนไขโคตรชัดที่สลัดหลุดว่า กลุ่มเครื่องปั๊มในคอกกลุ่มนี้มันจัดโปรโมชั่นยำใหญ่เป็นคอกเครื่องผสมหลากขั้วสเปค **"(different instance types and sizes)"** 
ซึ่งเทพเจ้าหมอผีสายพยากรณ์ Predictive scaling มันออกแบบบอดี้บังคับมาให้เพ่งจิตจับทางให้แม่นยำระดับชาติก็ต่อเมื่อคุณบูชาศาลด้วย **"ก้อนเครื่องถ่ายเอกสารขนาดแม่พิมพ์พิมพ์เดียวกันทั้งหมดล้วนๆ (homogenous group)"** เท่านั้น! ถ้าล่อสเปคยำเปรี้ยวหวานยัดใส่ยับขนาดนั้น กราฟ AI ของ AWS จะปั่นป่วนหลอนเพี้ยนก่ายหน้าผากกระจาย ทำงานไม่เที่ยงตรงแถมปั๊มเกินงบแน่นอน 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Scaling Policies สำหรับลูกผู้ชาย**:
  - `Dynamic (Target Tracking / Step)`: สายรอลูกกระสุนวิ่งมาก่อนแล้วค่อยยกโล่บัง! รอให้โหลดทะลุฟ้าหอบแฮ่ก แล้วค่อยใช้เวลาวิ่งไปปลุกเรียกเครื่องมาเสริมทัพ (มักจะทำให้อืดในช่วง 5 นาทีแรกที่โดนยิงของจริง)
  - `Scheduled`: สายรู้ทันจดไดอารี่! รู้ว่าหวยออกเช้า 9 โมง สั่งเปิดเครื่องวอร์มอัปรอตั้งแต่ 8 โมงครึ่งเลย รถไม่ติดชัวร์!
  - `Predictive`: หมอดูปัญญาประดิษฐ์ AI! แอบสังเกตกราฟประวัติเรา 2 อาทิตย์ แล้วชิงเปิด/ปิดเครื่องล่วงหน้าให้อัตโนมัติในจุดที่เดาว่าจะพี้ค (แต่มีข้อแม้คือห้ามใช้สเปคเครื่องปนกันมั่วซั่วนะ จิตมันจะหลอนกะแแร๊งผิด)

---
---

## 📌 คำถามที่ 55
**โจทย์:**
A company has a hybrid cloud architecture that connects its on-premises data center and cloud infrastructure in AWS. It requires a durable storage backup for its corporate documents stored on-premises and a local cache that provides low-latency access to recently accessed data to reduce data egress charges. The documents must be stored on and retrieved from AWS via the Server Message Block (SMB) protocol. These files must be immediately accessible within minutes for six months and archived for another decade to meet data compliance.

Which of the following is the best and most cost-effective approach to implement in this scenario?

**ตัวเลือก:**
- [x] Launch a new file gateway that connects to your on-premises data center using AWS Storage Gateway. Upload the documents to the file gateway and set up a lifecycle policy to move the data into Glacier for data archival.
- [ ] Use AWS DataSync to transfer all files from the on-premises network directly to an Amazon S3 bucket, and set up a lifecycle policy to move the data into Glacier for archival.
- [ ] Establish a Direct Connect connection to integrate your on-premises network to your VPC. Upload the documents on Amazon EBS Volumes and use a lifecycle policy to automatically move the EBS snapshots to an Amazon S3 bucket, and then later to Glacier for archival.
- [ ] Launch a new tape gateway that connects to your on-premises data center using AWS Storage Gateway. Upload the documents to the tape gateway and set up a lifecycle policy to move the data into Glacier for archival.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมี 2 โลกฝั่งขวาซ้าย (หน้าตึกห้องเช่าคอกทำงานเก่าตัวเองประสานรอยกับ AWS) เกิดอาการอยากจัดแจงฝากชีวิตเศษก้อนกระดาษเอกสารออฟฟิศไปแบ็คอัพผิงไฟย่างบนสวรรค์คลาวด์ AWS โดยยื่นพร้อมเงื่อนไขดุเดือดตลบหลังตั้ง 3 ข้อให้แก้:
1. เครื่องในบ้านเจ้านายต้องแตะสัมผัสไฟล์เก่าคลำเล่นได้โคตรลื่นๆ ฉับไวทันตาเห็น (เพื่อลดภาระบวกค่าเช่าเน็ตขี้ไหล Egress ชูดดึงโหลดจากบนก้อนเมฆลงประจำๆ **ต้องการมี local cache ปลั๊กเมมฝังหน้าบ้าน)** 
2. ต้องเป็นปลั๊กสอยดาวทัศนาจรที่สนับสนุนรับลูกล่อสายท่อรับตระกูลจดหมายแชร์ไดรฟ์ Windows ฝรั่งเศส **(Server Message Block / SMB protocol)** ด้วยนะ
3. ต้องหยิบจับจิกหัวเอกสารโผล่มาอ่านปุ๊บปั๊บดมตดได้ในทันที "6 เดือนแรก"... จากนั้นพอเน่าเปื่อยก็สั่งแพคเกจดองแช่แข็งโยนลงถ้ำน้ำแข็งเก็บเป็นศพทศวรรษ! 
คว้าพระเอกตะเกียงวิเศษตัวไหนดีถึงจะรอดตัวราคาถูกใจเบื้องบนที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดคำว่าอยากมีแคชทิ้งทุ่นไว้หน้าบ้านเรียกใช้งานไวๆ **`a local cache that provides low-latency access`** + แถมพ่วงอ๊อฟชั่นใช้คำภาษาเก่าออฟฟิศ **`on-premises data center `** ด้วย = พระเอกสายสะพานเหล็กเชื่อมโลกที่ตอบโจทย์เสิร์ฟของค้างคาแคชไว้ที่หน้าบ้านให้ดึงเปิดไวๆคือบริการกึ่งคลาวด์ **`AWS Storage Gateway`** ล้านเปอร์เซ็นต์
- ทริคที่ 2: ด่านคัดตระกูลลูกหลาน Storage Gateway! โจทย์ระบุว่าลูกค้าใช้ภาษาแชร์โฟลเดอร์ของชาวบิลเกตส์นามว่า **`SMB protocol`** (หรือแก๊ง NFS ฝั่งลีนุกส์) = ลูกหลานคนที่ตอบโจทย์เป็นตู้แชร์ไฟล์ก็คือชื่อรุ่น **`File Gateway`** เท่านั้น! (ถ้ารุ่น Tape Gateway หรือ Volume Gateway จะทำตัวเป็นแชร์โฟลเดอร์ให้มิงกดคลิกลากเซฟผ่านหน้าต่างไม่ได้)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch a new file gateway that connects to your on-premises data center using AWS Storage Gateway. Upload the documents to the file gateway and set up a lifecycle policy to move the data into Glacier for data archival.**
- **ทำไมถึงถูก:** คอมโบลูกเตะกังฟูท่าเทพสุดของวงการ! ติดตั้งตู้วิเศษจอมลวงโลก **"File Gateway ในเครือตระกูล Storage Gateway"** วางเป็นกล่องฮาร์ดแวร์หรือคอมจำลองเครื่องใหญ่ย้วยแปะกางมุ้งไว้ที่ออฟฟิศตัวเอง... 
สเปคนี้แหละที่เกิดมาเพื่อ "หลอกเครื่องตึกบ้านๆว่าเป็นฮาร์ดดิสก์มหึมา" File Gateway เป็นคราบโปรไฟล์แชร์หน้าตาหลอกตบตาที่รับคำสั่งพูดคุยภาษาโบราณๆ (SMB / NFS) ได้อย่างคล่องคอแหว่ง และมีตัวเสพความรวดเร็วความจำฝังตู้ด่านหน้าเว็บ (เสี้ยววินาที Local cache - กันอืดประหยัดค่าเน็ตดึงโหลดEgressรัวๆ) 
แถมท่าจบเบิกเนตร... จากนั้นก็ผูกติดสปริงคัดสรรตระแกรง Lifecycle policy ไถโยนเตะเศษกล่องซากเน่า6เดือน ทิ้งโกยดองพ่นถุยเข้าถังอาร์กติกหลุมดำ Glacier ให้อัตโนมัติ (Cost-effective สุดติ่ง ตอบโจทย์ทุกรูขุมขน!)

❌ **[ผิด] Use AWS DataSync to transfer all files from the on-premises network directly to an Amazon S3 bucket, and set up a lifecycle policy to move the data into Glacier for archival.**
- **ทำไมถึงผิด:** จ้างกรรมกรสับตีนแตกแต่ตีโจทย์ไม่แตก! จ้างบริการสับรถสิบล้อย้ายของบ้าพลัง **AWS DataSync** วิ่งเหินขนไฟล์ออฟฟิศถล่มไปกองลอยฟ่องในถังคลังใหญ่ S3...
DataSync คือพนักงานบ้าเลือดแบกกระสอบ ขนของปาโยนอพยพข้ามทวีปมหาศาลรัวๆตู้มเดียว (migration transfer service) แต่ข้อเสียจุดบอดชี้ตายของมันคือไม่มีสมองจดจำซ่อนชอร์ตคัททางตัด (ไม่มีก้อนคั่นกลาง "Local Cache" รองรับตอนหน้าตึกเจ้านายสอดรู้สอดเห็นเรียกคลิกดูรูปน้องหมาไฟล์ซ้ำๆ) 
แปลว่าทุกๆ ครั้งที่เจ้านายเปิดดูรูปใบกำกับภาษีเก่า 1 ใบ วงเน็ตบริษัทคุณจะถ่อชูดวิ่งข้ามน้ำข้ามทะเลดึงมวลไฟรหัสลงจากสวรรค์ S3 ใหม่ล้วนๆ โดนชาร์จค่าก็อกน้ำรั่วไหล (Data egress charges) บานตะไทหูดับตับไหม้ ยับเยิน 

❌ **[ผิด] Establish a Direct Connect connection to integrate your on-premises network to your VPC. Upload the documents on Amazon EBS Volumes and use a lifecycle policy to automatically move the EBS snapshots to an Amazon S3 bucket, and then later to Glacier for archival.**
- **ทำไมถึงผิด:** ขี่ช้างอวกาศลงจอดจับหนู! สั่งขุดอุโมงค์ระเบิดภูเขาลากสายเคเบิลมุดป่าข้ามทวีปทะลวงหลุมดำ **Direct Connect** ควบรวมพ่วงเสียบติ่งก้อนฮาร์ดดิสก์บล็อก **EBS Volume** ติดกาว...
หนีผีเร่ร่อนป่ามาเจอจระเข้หน้ามืดกระชากติ่ง! EBS Volumes มีลักษณะเป็นฮาร์ดดิสก์ส้นทื่อๆ ยัดแปะเฉพาะตัวต่อตัวเครื่องใครเครื่องมัน ไม่ตอบโจทย์กางขี้กากแชร์เก็บขยะข้อมูลสำรองส่วนรวมแบบบุฟเฟ่ต์ให้หน้าบ้านได้ถูกและทนทานเลย (Not Cost-effective backup) 
แถมยังโคตรแพงเลือดสาดและยากเกินกู่ดึงเบอร์เมื่อต้องปั้นกล้ามกระตุกดึงฟีเจอร์พ่น Lifecycle มาตีลังกาย้ายก้อนกลับสูบลงถังน้ำแข็ง S3 Glacier อีก มันผิดฝาผิดตัวเพี้ยนหลุดแกแล็กซี่ที่สุด!

❌ **[ผิด] Launch a new tape gateway that connects to your on-premises data center using AWS Storage Gateway. Upload the documents to the tape gateway and set up a lifecycle policy to move the data into Glacier for archival.**
- **ทำไมถึงผิด:** ปลุกมัมมี่อียิปต์ให้เต้นโคฟเวอร์เกาหลี! สั่งเบิกเซ่นไหว้บรรพบุรุษม้วนสายฟิล์มด้วยตระกูลม้วนเทป **Tape Gateway** วางแช่ตระหง่านหน้าตึกออฟฟิศ ยัดดอง...
ตลับเทปผีสิงม้วนโชว์ลวดตัวนี้มันทำมาเพื่อดองศพและรับไฟล์สไตล์ห้องสมุดเทปโบราณกรุผี (Tape backup library Replacement) ซึ่งตามธรรมชาติของหุ่นยนต์แขนกลเทปแล้ว "โอ้พ่อคุณเอ้ยยย" มันจะหน่วงเวลาสกัดของหมุนดึงค้นกลับมารอคิวหยิบทีเป็นรอบหลายนาทีถึงหลายชั่วโมง ไม่สามารถแตะไฟล์ดมฉุยสูดตดดูได้ด่วนจี๋ฉับพลันในระดับ **"ทันใจลูกตาเสี้ยววิ/ทันทีทันใด (immediately accessible within minutes)"** ที่ฝังหวงโจทย์ตั้งกฎเหล็กข้อ 3 มัดคอกำกับไว้อย่างโจ่งแจ้งหรอกนะ!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Storage Gateway ตู้แปลงร่าง 3 สหาย:** บริการปลั๊กพ่วงสายตึงๆ "ตั้งซ่อนตื่งฮาร์ดแวร์ไว้หน้าออฟฟิศ แต่แอบลอบซุกส่งของทะลุขึ้น AWS ปนกัน" แบ่งเป็น 3 ผู้เล่นหลัก:
  - **File Gateway**: แปลงถัง S3 นกกระจอกให้กลายเป็น "ตู้แชร์ไฟล์ระดับออฟฟิศส่วนรวม (File Share)" พูดภาษาคนแชร์ (SMB, NFS) รู้เรื่อง และโชว์แผงเป็น Local Cache ช่วยบริษัทดึงไฟล์รูปซ้ำๆ ประหยัดตังโหลดเน็ต
  - **Volume Gateway**: แปลงก้อน Amazon EBS ที่ลอยคว้างให้เสมือนลงมาสิงสถิตเกิดเป็น "ฮาร์ดดิสก์ดิบ (Block Storage/ iSCSI)" ต่อท้ายตูดเสียบเซิร์ฟเวอร์ดั้งเดิมเก่าแก่ใต้ตึกบริษัท
  - **Tape Gateway**: หลอกลวงหน้าด้านๆ ทำตัวแอกชั่นหมุนติ้วๆเป็น "ตู้ใส่ตลับม้วนเทปแม่เหล็กโบราณ VTL" ให้โปรแกรมแบ็คอัพผีสางดั้งเดิมยิงหมุนสำรองขยะเทหน้าใส่ แต่ท้ายสุดโดนแอบส่งเทลงไปหมกฝังหนอนแช่ในถังโลงน้ำแข็ง S3 Glacier ในก้นเหวชั้นใต้ดินอยู่ดี

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 12: ข้อ 56 - 60)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 56
**โจทย์:**
A company has a web application that uses Amazon CloudFront to distribute its images, videos, and other static content stored in its Amazon S3 bucket to users around the world. The company has recently introduced a new member-only access feature for some of its high-quality media files. There is a requirement to provide access to multiple private media files only to paying subscribers without having to change the current URLs.

Which of the following is the most suitable solution to implement to satisfy this requirement?

**ตัวเลือก:**
- [ ] Configure your CloudFront distribution to use Field-Level Encryption to protect your private data and only allow access to members.
- [ ] Configure your CloudFront distribution to use Match Viewer as its Origin Protocol Policy which will automatically match the user request. This will allow access to the private content if the request is a paying member and deny it if it is not a member.
- [ ] Create a Signed URL with a custom policy which only allows the members to see the private files.
- [x] Use Signed Cookies to control who can access the private files in your CloudFront distribution by modifying your application to determine whether a user should have access to your content. For members, send the required `Set-Cookie` headers to the viewer which will unlock the content only to them.

---
### 🎯 โจทย์ต้องการอะไร?
แอปให้คนดูฝากคลิปหน้าใสทั่วโลกกระจายไปกับพายุ **Amazon CloudFront Cloud** (ดึงเนื้อหา Media จาก Amazon S3) 
คราวนี้บริษัทเพิ่งคิดเปิดระบบหาเงิน "สมาชิกพรีเมียมเฉพาะคนจ่ายตังค์เท่านั้น (paying subscribers) ถึงจะสูบดูดคลิปหรือสูบรูปดีๆ ชัดๆ เหล่านี้ไปได้"
เงื่อนไขเขี้ยวลากดินคือ **ให้สมาชิกเข้าถึงไฟล์ลับพร้อมกันทีละเยอะๆ เป็นกระบุง (multiple private media files) และห้ามแก้ทุบรูปชื่อโดเมน URL เดิม (without having to change the current URLs) เด็ดขาด** 
จะใช้ฟีเจอร์กันผีตัวไหนของ CloudFront ดี?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ด่านอรหันต์สกัดคนดูเถื่อนของ CloudFront มีแค่ 2 วิชา คือ **`Signed URL`** และ **`Signed Cookies`** เท่านั้น! (ถ้าเจอช้อยส์ชื่อพิสดารอื่นให้ตัดทิ้งก่อนเลย)
- ทริคที่ 2: วิธีแยกการใช้งาน 2 วิชานี้ง่ายมาก: 
  - ถ้าโจทย์ให้แจกไฟล์แค่ **1 ลิ้งก์ (individual file)** = ใช้ **`Signed URL`**
  - แต่ถ้าโจทย์ยั่วว่าลูกค้าต้องดูดไฟล์ **ทีละหลายๆ รูป/คลิปพร้อมกันเรื่อยๆ (multiple private files)** หรือสั่งข้อห้ามศักดิ์สิทธิ์ว่า **ห้ามเปลี่ยนรูปแบบ URL ปัจจุบันนะ (`without changing the current URLs`)** = ต้องฟันธงใช้คุกกี้วิเศษ **`Signed Cookies`** สถานเดียว! เพราะมันฝังรหัสผ่านไว้ในตัวเบราว์เซอร์ ไม่ต้องมานั่งเสกลิ้งก์ใหม่ให้ยืดยาว

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Signed Cookies to control who can access the private files in your CloudFront distribution by modifying your application to determine whether a user should have access to your content. For members, send the required `Set-Cookie` headers to the viewer which will unlock the content only to them.**
- **ทำไมถึงถูก:** เคล็ดวิชาที่เพอร์เฟคที่สุด! เสกรอยแสตมป์วิเศษในคราบขนม **"Signed Cookies"** ยัดใส่มือลูกค้าวีไอพี
CloudFront Signed Cookies เป็นท่าที่ให้โปรแกรมของคุณแอบซุกแสตมป์รหัสผ่าน (Set-Cookie) ไว้ในเครื่องลูกค้าตอนล็อกอินจ่ายตังค์ พอลูกค้ามีคุกกี้ตัวนี้ปุ๊บ... เขาสามารถเลื่อนจอกดดูดรูป สไลด์ลิงก์หนัง HLS/วิดีโอส่วนตัวได้เป็นสิบๆ ร้อยๆ ไฟล์รวดเดียว (access multiple restricted files) โดยที่ URL ของหนังทุกเรื่องยังหน้าตาเหมือนเดิมเป๊ะๆสั้นๆ ไม่ยาวยืด (ตรงกฎเป๊ะ) ตอบโจทย์ทั้งความเนียนและความสะดวกสบายครบวงจร!

❌ **[ผิด] Create a Signed URL with a custom policy which only allows the members to see the private files.**
- **ทำไมถึงผิด:** ตกม้าตายเพราะขัดกับข้อห้ามกฎบริษัท! การเสกพวงกุญแจส่วนตัวเป็น **"Signed URLs"** นั้น มันจะมีพฤติกรรมคือมันจะไปต่อท้ายเติมตัวอักษรรหัสรุงรังยาวเหยียดต่อท้าย URL ปัจจุบันของคุณ (changing URL structure) ซึ่งผิดกฎที่โจทย์ตั้งไว้ แถมฟีเจอร์ URL มันให้สิทธิ์เข้าดูได้ "ทีละ 1 ลิงก์ 1 ไฟล์" เท่านั้น ถ้าลูกค้าจะดูรูป 100 รูป คุณต้องนั่งปั่นลิงก์แจกใหม่ 100 รอบ โคตรทรมานชีวิต 

❌ **[ผิด] Configure your CloudFront distribution to use Match Viewer as its Origin Protocol Policy which will automatically match the user request.**
- **ทำไมถึงผิด:** มั่วสุดๆ! **Match Viewer Protocol Policy** เป็นตัวเลือกขบขัน มันทำหน้าที่แค่ช่วยแปลสัญญาณว่า "ถ้าลูกค้าพิมพ์มาด้วย http ธรรมดา CloudFront ก็จะวิ่งไปคุยกับเซิร์ฟเวอร์หลังบ้านด้วย http ธรรมดา... แต่ถ้าลูกค้าพิมพ์ https เข้ารหัสมา CloudFront ก็จะวิ่งไปหลังบ้านด้วย https" มันมีไว้รักษาความปลอดภัยช่องทางเฉยๆ ไม่ได้มีสมองมานั่งสกรีนแยกแยะคนจ่ายตังค์ VIP หรือสกัดคนเถื่อนไม่ให้ดูคลิปเลย

❌ **[ผิด] Configure your CloudFront distribution to use Field-Level Encryption to protect your private data and only allow access to members.**
- **ทำไมถึงผิด:** เอาเสื้อเกราะไปใส่กันแสงแดด! วิชานินจา **Field-Level Encryption** เอาไว้ใช้ซ่อนปิดบังตับไตไส้พุงข้อมูลที่มีความเซนซิทีฟขั้นสูงสุดบน "กล่องหน้าแบบฟอร์ม" (เช่น เลขบัตรเครดิต, รหัสSSN ที่ลูกค้ากรอก) ไม่ให้ลูกจ้างแอดมินกลางทางแอบขโมยอ่านได้... 
มันออกแบบมาปกป้อง "ข้อมูลที่ลูกค้าส่งเข้ามา" ไม่ใช่เอามาทำระบบสกรีนคัดกรองขวางทางคนที่จะ "ดึงวิดีโอพรีเมี่ยมออกไปดูล่น" แต่อย่างใด 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **CloudFront Security (สกัดคนโหลดฟรี)**:
  - **Signed URLs**: เหมาะตั๋วเข้างานเฉพาะกิจ! เช่น คุณซื้อตั๋วโหลดไฟล์ PDF หนังสือเล่มนึง โปรแกรมก็จะเจาะเสกลิงก์ยาวเหยียดให้คลิก 1 ครั้ง จำกัดให้โหลดได้แค่ 10 นาทีแล้วลิงก์จะพัง (เปลี่ยน URL)
  - **Signed Cookies**: เหมาะกับสมาชิกรายเดือน! จ่ายตังค์ปุ๊บตีตราประทับคุกกี้ที่แขน จากนั้นจะเดินไปแดกบุฟเฟ่ต์โซนเนื้อวากิวเปิดหนังดูเป็นร้อยๆเรื่องในเว็บก็ทำได้สบายๆ (ไม่เปลี่ยน URL)

---
---

## 📌 คำถามที่ 57
**โจทย์:**
A government entity is conducting a population and housing census in the city. Each household information uploaded on their online portal is stored in encrypted files in Amazon S3. The government assigned its Solutions Architect to set compliance policies that verify data containing personally identifiable information (PII) in a manner that meets their compliance standards. They should also be alerted if there are potential policy violations with the privacy of their S3 buckets.

Which of the following should the Architect implement to satisfy this requirement?

**ตัวเลือก:**
- [ ] Set up and configure Amazon Kendra to monitor malicious activity on their Amazon S3 data
- [x] Set up and configure Amazon Macie to monitor their Amazon S3 data.
- [ ] Set up and configure Amazon Fraud Detector to send out alert notifications whenever a security violation is detected on their Amazon S3 data.
- [ ] Set up and configure Amazon Polly to scan for usage patterns on Amazon S3 data

---
### 🎯 โจทย์ต้องการอะไร?
สำนักงานสถิติรัฐบาลกางโปรเจคเก็บข้อมูลสำมะโนประชากร ทะเบียนบ้าน โดยไฟล์ทั้งหมดทะลักถูกฝากเอาไว้เป็นความลับในกองพะเนินบน **Amazon S3** 
โจทย์สั่งเป็นกฎเหล็กว่า "ต้องเสกตำรวจลับตาเหยี่ยว เข้าไปดำน้ำแสกนดูกองไฟล์เอกสารหลายล้านชิ้นพวกนี้ เพื่อ **ตรวจสอบคลำหาดูซิว่าในแฟ้มไหนมีข้อมูลพวก เลขที่บัตรประชาชน, พาสปอร์ต, รหัสประกันสังคม (PII - Personally Identifiable Information)** หลุดแช่กองอยู่แบบโล่งๆ รั่วไหลบ้าง? และต้องกริ่งสัญญาณไซเรนแจ้งเตือนรัฐบาลทันทีที่พบความเสี่ยงทุจริตหลุดรอดทิ้งระเบิดไว้ในถัง S3"
สถาปนิกต้องจับสุนัขดมกลิ่นของ AWS ตัวไหนลงสนามนี้ถึงจะแม่นยำที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: นี่คือข้อสอบท่องจำชื่อบริการ AWS แบบกล้วยๆ! หากคุณจ้องเห็นคีย์เวิร์ดคำว่าทลายดงแงะค้นหา **`PII (Personally Identifiable Information)`** ควบคู่กับคำว่าคุ้ยกระจุยในถัง **`Amazon S3`** = หลับตากาข้อที่มี **`Amazon Macie`** ได้ 10,000% ไม่มีบริการหน้าไหนทำตัวเสือกดำน้ำเข้าไปส่องเลขบัตรประชาชนแม่นยำเท่าเจ้านี่อีกแล้ว

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up and configure Amazon Macie to monitor their Amazon S3 data.**
- **ทำไมถึงถูก:** เกิดมาเพื่อล่าแม่มด PII! เปิดกรงปล่อยฉลามสอดแนม **Amazon Macie** ให้ว่ายคลำดมกลิ่นรอบถัง S3 
**Amazon Macie** คือบริการรักษาความปลอดภัยชั้นสูงที่ใช้พลังปัญญาประดิษฐ์ (Machine Learning/AI) ในการอ่านใจทะลุเข้าไปแหวกสแกนดูไส้ในไฟล์ต่างๆ ที่ซุกซ่อนอยู่ในถัง Amazon S3 ของคุณ เพื่อควานหาตอว่ามีข้อมูลเซนซิทีฟ (PII) เช่น ตัวเลขรหัสประชาชน, ข้อมูลบัตรเครดิต, ข้อมูลสุขภาพ หลุดแอบทิ้งประเจิดประเจ้อเอาไว้ไหม? ถ้าระบบพบการรั่วไหลไม่ได้ตั้งใจ มันจะแผดเสียง Alarm สรุปหน้าแดชบอร์ดลากคอประจานทันที 

❌ **[ผิด] Set up and configure Amazon Fraud Detector to send out alert notifications whenever a security violation is detected on their Amazon S3 data.**
- **ทำไมถึงผิด:** ตำรวจจับผิดที่ผิดทาง! จ้างสิบตำรวจ **Amazon Fraud Detector** นั่งส่อง...
Fraud Detector เป็นสุนัขเฝ้ายามที่ถูกสร้างมาเพื่อจับผิดคนนิสัยเสีย "หลอกลวงต้มตุ๋นสร้างบัญชีปลอม ผูกบัตรเครดิตเถื่อนขโมยของ" ที่หน้าบ้านเว็บแอปพลิเคชันหรือร้านค้าออนไลน์อีคอมเมิร์ช มันไม่ได้มีความสามารถบรรดาศักดิ์ถึงขั้นดำน้ำมุดเข้าไปแหกแฟ้มกระดาษตัวอักษรเพื่อวิเคราะห์หาเลข PII ว่าอยู่โล่งๆ ในถัง S3 ได้เลย

❌ **[ผิด] Set up and configure Amazon Kendra to monitor malicious activity on their Amazon S3 data**
- **ทำไมถึงผิด:** ส่งครูบรรณารักษ์ไปล่าโจร! **Amazon Kendra** มันพยายามทำตัวเหมือน Google Search ส่วนตัวของบริษัท 
Kendra เป็นระบบเสิร์ชเอนจิ้นอัจฉริยะแบบ Enterprise เอาไว้ให้พนักงานพิมพ์เสิร์จหาไฟล์วิจัยเก่าๆ หาคู่มือเจอไวๆ ข้ามแผนกเท่านั้นแหละ มันไม่มีปุ่มตั้งด่านเรดาร์ตาข่ายจับข้อมูลซีเคร็ตรั่ว PII เพื่อเดินแจ้งเตือนตำรวจดักจับโจรขโมยไข่ (monitor malicious activity/security) ได้เลย เป็นช้อยส์หลอกเด็ก

❌ **[ผิด] Set up and configure Amazon Polly to scan for usage patterns on Amazon S3 data**
- **ทำไมถึงผิด:** ฮาขี้แตกที่สุด! ให้คอสเพลย์จับนกแก้ว **Amazon Polly** ทำตัวสวยสแกนการรันพฤติกรรม...
Amazon Polly มันคือโปรแกรมหูหนวกตาบอดที่รับจ้างแปลงกระดาษย่อหน้า (Text) ให้กลายเป็นเสียงอ่านของหุ่นยนต์นักพากย์ (Text-to-Speech) เอาท์พุตเป็นเสียง mp3! เอามันมาเดินป้วนเปี้ยนงมเข็มสแกนหาเลขบัตรประชาชน PII ใน S3 คงจะได้หรอกนะ 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Security Services จอมจับผิด**:
  - **`Amazon Macie`**: ผู้เชี่ยวชาญด้านหาเลข PII, บัตรเครดิต, เลขบัญชี ที่หลุดรั่วซ่อนอยู่ในถัง Amazon **S3** เท่านั้น
  - **`Amazon GuardDuty`**: รปภ.ส่วนกลาง คอยจับตาดูพฤติกรรมคนแฮกเจาะระบบ AWS Account หรือมี IP แปลกๆ มุดขุดคริปโต
  - **`AWS Inspector`**: หมอตรวจสุขภาพเครื่อง EC2 (และ Container) คอยสแกนหาช่องโหว่ OS เก่า ไม่อัปเดตแพทช์

---
---

## 📌 คำถามที่ 58
**โจทย์:**
A company has a highly available architecture consisting of an Elastic Load Balancer and multiple Amazon EC2 instances configured with Auto Scaling across three Availability Zones. The company needs to monitor EC2 instances based on a specific metric that is not readily available in Amazon CloudWatch.

Which of the following is a custom metric in CloudWatch that requires manual setup?

**ตัวเลือก:**
- [ ] Disk Read activity of an EC2 instance
- [x] Memory Utilization of an EC2 instance
- [ ] CPU Utilization of an EC2 instance
- [ ] Network packets out of an EC2 instance

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีระบบหรูหรายิ่งใหญ่ตั้งเครื่อง **EC2** แผ่สยายกิ่งก้านสาขาข้าม 3 Availability Zones พร้อมฝัง Auto Scaling เต็มเหนี่ยว
ทีมแอดมินตาซุกซนเกิดอยากส่งสายหยั่งระดับน้ำเพื่อวัดดูประสิทธิภาพเครื่อง EC2 บางตัวแบบลึกๆ.. 
โจทย์ทดสอบความจำว่า: ในมิเตอร์วัดไข้ Amazon CloudWatch นั้น มันจะมีค่าตัวแปรระดับแกนกลางอยู่ชนิดหนึ่ง (metric) ที่ **"มันไม่ยอมทำให้ฟรีหรือหาโชว์ให้ง่ายๆ (not readily available) จนตราบที่แอดมินจะต้องถกแขนเสื้อไปตั้งค่ายัดไส้สายสคริปต์กรอกเอาเอง (Custom metric)"** ...ค่านั้นคือข้อใด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: กฎการอ่านของเซนเซอร์ฟรี AWS! ตัวแปรใดก็ตามที่ AWS สามารถ **"ส่องมองได้จากเปลือกนอก (รอบตัวเครื่อง/นอกสายไส้ระบบปฏิบัติการ)"** เช่น กล้าม CPU, ความเร็วฮาร์ดดิสก์หมุนกี่รอบ (Disk I/O), สายแลนวิ่งแรงมั้ย (Network in/out) พวกนี้ AWS จะจับกราฟให้ **ฟรีๆ อัตโนมัติ!**
- ทริคที่ 2: อะไรก็ตามที่มัน **"ทะลุเข้าไปล้วงอยู่ในก้อนระบบปฏิบัติการ (Inside OS Level)"** อย่างเช่น "แรมเหลือเท่าไหร่ (RAM / Memory)" หรือ "พื้นที่ไดร์ฟ C เหลือมั้ย? (Disk Space/Swap)" พวกนี้ AWS ถือวิสาสะทะลวงกล่องดำของคุณไม่ได้ คุณต้องเป็นคนเขียนคริปต์ฝังเข็มส่งค่าน้ำออกมาให้เอง **(Custom Metric)** เสมอ จำคีย์เวิร์ด **`Memory Utilization`** ไว้ให้ขึ้นใจ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Memory Utilization of an EC2 instance**
- **ทำไมถึงถูก:** ลับสุดยอดนอกสายตาปรกติ! อยากรู้ลูกเล่นระดับซดกวาดล้างปริมาณ "หน่วยความจำ (Memory / RAM / Swap)" ให้ถกแขนเสื้อตั้งสคริปต์เสก Custom metric เอาเอง 
ตราบใดที่ AWS ไม่ได้ขออนุญาตจิ้มเครื่องเซ็นเซอร์มุดผ่าปอดล้วงทะลุเข้าไปแสกนกวาดข้างในชั้นไส้ติ่ง OS ระบบปฏิบัติการลึกๆ เอง มันจะมองไม่เห็นกราฟหอบของ **"อาการสูบ RAM (Memory Utilization)", และ อาการเตะเนื้อปอดบนฮาร์ดดิสก์ (Disk space)"** เลย หน้าที่ของคุณคือช่างประปาใจกล้า ที่ต้องเอาปลั๊กอินสคริปต์เข็มฉีดยาอย่าง **CloudWatch Agent** ไปยัดลงคอมแล้วจ่อดึงข้อมูลฉีดพ่นส่งกลับไปหา CloudWatch เป็นระดับ Custom เองล้วนๆ

❌ **[ผิด] CPU Utilization of an EC2 instance**
- **ทำไมถึงผิด:** การซดพลังแดกประมวลผลซีพียู... 
เส้นกราฟเต้นหัวใจระดับคลาสสิคอนุบาลนี้ Amazon มองเห็นได้ตั้งแต่แผงเหล็กนอกเครื่อง (Hypervisor level) มันเลยกวาดให้คุณดูฟรีทุกๆ 5 นาทีแบบหน้าชื่นตาบานบน CloudWatch โดยไม่ต้องใช้ความรู้กดตั้งค่า Custom metric อะไรเลย 

❌ **[ผิด] Disk Read activity of an EC2 instance**
- **ทำไมถึงผิด:** การไถคว้านสปีดฮาร์ดดิสก์รอบต่อนาที (Disk Read / Write operations)...
แม้จะเป็นเรื่องดิสก์ แต่ "มันวัดแค่การทุบดิ้นของหัวอ่านดิสก์ข้างนอกกล่องเหล็ก (Disk I/O)" ไม่ใช่วัดการจุของขนาดพื้นที่ (Disk Space) AWS มองเห็นปรกติอยู่แล้วว่าคุณถล่มดึงไฟล์ออกไปกิน I/O เท่าไหร่ โชว์กราฟฟรีครับ ไม่ต้องถ่อทำ Custom

❌ **[ผิด] Network packets out of an EC2 instance**
- **ทำไมถึงผิด:** แพ็กเก็ตเศษด้ายเน็ตที่ปล่อยคิวสะบัดก้นปลิวออกนอกเซิร์ฟเวอร์ (Network In / Out)...
ประทับใจจัง! เรื่องกระแสลมเน็ตเต้นระบำเข้าๆ ออกๆ ขั้วเครือข่าย ทาง AWS เขาสอดแนมดักท่อสายไฟเอาไว้เรียบร้อยแล้ว และมองเห็นชัวร์ๆ ว่ามีการสูบข้อมูลไปกี่กิกกะไบต์ แจกรายงานหน้าเว็บได้ทันทีโดยไม่ต้องพึ่งพาสคริปต์แสนยาก (Not Custom)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **ข้อสอบชอบหลอกซ้ำซาก (What is NOT a default CloudWatch Metric for EC2?)**:
  - `RAM / Memory Utilization` -> บังคับ Custom Metric!
  - `Disk Space (พื้นที่ว่างเหลือเท่าไหร่)` -> บังคับ Custom Metric!
  - `CPU, Network, Disk I/O (Read/Write)` -> ให้ฟรี! (Default Metrics)

---
---

## 📌 คำถามที่ 59
**โจทย์:**
A company hosted a web application in an Auto Scaling group of EC2 instances. The IT manager is concerned about the over-provisioning of the resources that can cause higher operating costs. A Solutions Architect has been instructed to create a cost-effective solution without affecting the performance of the application.

Which dynamic scaling policy should be used to satisfy this requirement?

**ตัวเลือก:**
- [ ] Use suspend and resume scaling.
- [ ] Use simple scaling.
- [x] Use target tracking scaling.
- [ ] Use scheduled scaling.

---
### 🎯 โจทย์ต้องการอะไร?
แอปรันอยู่ในหม้อต้ม **Auto Scaling EC2** แต่หัวหน้าไอทีเหงื่อแตกพลั่กเพราะกังวลใจเรื่องโรคติดการ **"เช่าเปิดเครื่องเซิร์ฟเวอร์เผื่อหน้าใหญ่ทิ้งคาไว้เกินความจำเป็น (over-provisioning)"** ซึ่งพาละลายเงินบริษัทยุบลงคอห่านรายชั่วโมงไปเปล่าๆ 
นายใหญ่จึงตบโต๊ะสั่งสถาปนิกให้ "ออกแบบนโยบายการเบ่งกล้ามเครื่องลูกข่ายใหม่ให้มันรัดเข็มขัดประหยัดตังค์โคตรๆ (cost-effective) ทว่าประสิทธิภาพต้องไม่สะดุดกากลงเลยนะ"
ในบรรดากฎเสกปั๊มกล้ามจังหวะขึ้นลง (Dynamic scaling policy) ลูกเล่นไหนตอบโจทย์นายพลได้เป๊ะที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ถ้าโจทย์บอกปัญหาคือการ **`over-provisioning` (เผลอตั้งเผื่อเหลือเยอะเกินไปเปลืองตังค์)** และอยากแก้ให้มัน **ไหลขึ้นลงแนบสนิทตามทราฟฟิกเป๊ะๆ ไร้ขยะบวมลอยนวล** = ไม่มีใครทำได้ดีและเนียนตาสมบูรณ์แบบเท่ากับ **`Target tracking scaling (เกาะติดเป้าหมาย)`** อีกแล้ว 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use target tracking scaling.**
- **ทำไมถึงถูก:** ใช้นโยบายสายสะพายติดตามสุนัขดมกลิ่นเป้าหมาย **"Target tracking scaling"** นี่คือพระเอกเพอร์เฟคสำหรับสายรัดเข็มขัดเงิน! 
เพราะ Target Tracking เป็นระบบ AI ชนเป้า ที่เราสามารถป้อนขีดจำกัดสั่งได้เลยว่า "ดูแลใหัหน่อยนะเว้ย ขอรักษาให้ค่าความเหนื่อย CPU ของฝูงเครื่องเฉลี่ยอยู่ที่ 50% ตลอดกาล!" ... พอลูกค้าทะลักปุ๊บ ระบบมันจะลุยปั๊มเครื่องงอกเพิ่มทันทีเพื่อดึงกราฟหัวทิ่มลงมา 50% และในทางกลับกัน *ถ้าช่วงดึกคนหดหาย มันก็จะทะยอยเตะปิดเครื่องปลดประจำการทิ้งอัตโนมัติ (scale in) เพื่อรักษาระดับให้คงที่เป๊ะๆ ที่ 50%* ... เมื่อมันฉลาดยุบหนอพองหนอได้เรียบกริบเบอร์นี้ มันจึงกำจัดภัยเงียบอาการ Over-provisioning บวมเเช่ตัวเปล่าๆ ได้ชะงัด และสมดุลยอดเยี่ยม

❌ **[ผิด] Use simple scaling.**
- **ทำไมถึงผิด:** กฎคนทื่อซื่อใจสลาย! ใช้นโยบายตีกลองรบแบบ **Simple scaling** พื้นๆซื่อๆ ...
Simple scaling เป็นท่าของรุ่นพ่อ พอเกิดสัญญาณชนเพดานหอบ มันจะงอกตัวขึ้นมา 1 เครื่องโต้งๆ แล้วกระโดดเข้าโหมด "นั่งพักเหนื่อยจิบน้ำ (Cooldown period)" นานหลายนาทีเพื่อรอเครื่องบูตให้เสร็จแบบไม่แยแสโลก... มันกระเตื้องช้ามาก ไม่ลื่นไหล และจังหวะที่มันยุบตัวดึงหดกลับลง (Scale in) ก็ตั้งค่าได้ขัดใจยากลำบาก เลยแก้อาการผลาญเงินบานเบอะเผื่อขาดเผื่อเหลือ Over-provisioning แบบหล่อๆ ลื่นๆ สู้เพื่อนไม่ได้

❌ **[ผิด] Use scheduled scaling.**
- **ทำไมถึงผิด:** เลี้ยวหาการขยายปั๊มรอตารางเวลาปลุกยามเช้า **Scheduled scaling**...
อาการนี้คือเหวี่ยงแหจับควัน... แม้นโยบายนี้จะเอาไว้ชงกาแฟกางเครื่องรอแก้วิกฤตตอกบัตร 9 โมงเช้าได้ชัวร์ร้อยเปอรเซนต์ แต่พอมันเจอกับพฤติกรรมลูกค้าที่คาดเดาจิตใจเวลามาไม่ได้... ถ้าคุณตั้งปลุกผิดเวลาก็เท่ากับเผลอปั๊มเครื่องทิ้งเปิดอ้าซ่าให้แอร์มันกินไฟเล่นรัวๆ (เกิดอาการ Over-provisioning เปลืองตังซ้ำร้อยเดิม) หรือบางทีลูกค้าดอดมาอุดหนุนหลังเที่ยงคืน โชคร้ายแอปก็ล่มกระจุย เพราะไม่ได้ตั้งปลุกรอเผื่อไว้ สรุปคือใช้ผิดงาน!

❌ **[ผิด] Use suspend and resume scaling.**
- **ทำไมถึงผิด:** ปุ้มซาวด์เบาต์ กดหยอดเหรียญทุ่มระงับทำงาน **suspend and resume scaling**
มึนเมามาก! มันแค่เมนูฟังก์ชั่นปลิดขั้วเอาไว้กระโดกกระเดก "หยุดพักฟลีซแช่แข็งการเบ่งกล้ามเครื่องลูกข่ายชั่วคราว (Suspend)" ตอนที่แอดมินกำลังนั่งยองๆซ่อมแอร์อัพเดตโค้ดแอพให้เสร็จ แล้วค่อยเปิดเครื่องรันใหม่ ไม่ได้มีเศษเสี้ยวของมันสมองที่จะเป็น Policy ขยายสเกลคุมค่าใช้จ่ายแต่อย่างใด เป็นตัวเลือกเอาฮา 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **ทำไม Target Tracking ถึงป๊อปปูล่าสุด?**: 
  - นึกภาพง่ายๆ เหมือนกับระบบ "แอร์อินเวอร์เตอร์" ในบ้านคุณเลย! คุณกดรีโมทตั้งไว้ที่ความเย็น 25 องศา (Target) แอร์มันจะเร่งสปีดสุดพลังเพื่อทำความเย็นให้ลดลงมาเตะ 25 ปุ๊บ มันก็จะเบาเครื่องเดินเบาเลี้ยงประหยัดไฟไว้ทันที (Scale In) แต่ถ้ามีคนเปิดประตูลมร้อนพัดเข้า มันก็ระเบิดตัวเองปั่นเป่าเย็นเสริมอีกรอบ... ง่ายๆ สบายแฮชเชียว!

---
---

## 📌 คำถามที่ 60
**โจทย์:**
A company wishes to query data that resides in multiple AWS accounts from a central data lake. Each account has its own Amazon S3 bucket that stores data unique to its business function. Access to the data lake must be granted based on user roles.

Which solution will minimize overhead and costs while meeting the required access patterns?

**ตัวเลือก:**
- [ ] Use Amazon Data Firehose to consolidate data from multiple accounts into a single account.
- [ ] Create a scheduled AWS Lambda function using Amazon EventBridge for transferring data from multiple accounts to the S3 buckets of the central account.
- [ ] Use AWS Control Tower to centrally manage each account's S3 buckets.
- [x] Use AWS Lake Formation to consolidate data from multiple accounts into a single account.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีอาณาจักร AWS ปลีกย่อยแยกแผนกกันเป็นกระจุยกระจาย **(รันอยู่บน multiple AWS accounts)** แต่ละแอคเคาท์ซ่องสุมความลับและจดหมายของแผนกตัวเองเอาไว้ในท่อ **Amazon S3** ที่ใครที่มัน
ผู้อำนวยการอยากสั่งรวบรวมถล่มข้ามจักรวาล ให้พนักงงานสามารถโยนคำสั่งสอบสวน (Query) กวาดหน้ากระดานลามไปทุกบัญชี ณ **เสาหลักกลางหอสมุดเพียงแห่งเดียว (central data lake)** 
โจทย์ระบุเงื่อนไขบีบไข่ว่า "จงหาบริการไหนที่หั่นภาระการแบกหินพองขนของยุ่งยาก และ **เซฟตังค์ได้สุดยอดที่สุด (minimize overhead and costs)** โดยที่ยังคุมประตูแจกสิทธิ์คนค้นหาข้อมูลตาม Roles ได้เนียนกริบดั่งเดิม?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ศัพท์เทคนิคมาแจกกล้วย! เห็นคำว่า **`central data lake` (สร้างลานรวมศูนย์ข้อมูลจากหลายบัญชี)** = แค่คีย์เวิร์ดก้อนนี้ก้อนเดียว ก็แหกปากตะโกนเรียกชื่ทายาทสายตรงผู้เชี่ยวชาญผูกเสี่ยวรวบรวมหนองน้ำจืดอย่างบริการ **`AWS Lake Formation`** มาคล้องคอได้เลยอย่างไม่ต้องลังเลใจ ไม่มีตัวไหนทำสระน้ำได้เจ๋งเท่านี้อีกแล้ว 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Lake Formation to consolidate data from multiple accounts into a single account.**
- **ทำไมถึงถูก:** ชักดาบจอมขมังเวทย์พระเอกมาสเตอร์พีซเข้าจัดการ! **AWS Lake Formation** เกิดมาเพื่อเป็นศูนย์บัญชาการก่อร่างสร้างลานประชุมหนองน้ำข้อมูล (Data Lake) โดยแท้จริง และรวดเร็วในไม่กี่วัน! 
สิ่งมหัศจรรย์ของมันคือการจัดการบัญชียกฝูง โดยไม่ต้องไล่ให้ชาวบ้านตักน้ำย้ายโคลนก๊อปปี้ไฟล์กันให้เหนื่อย Lake Formation มันจะปล่อยฟีเจอร์ "แชร์โต๊ะกินข้าวแบบปาร์ตี้ข้ามพรมแดน (Cross-account sharing)" คือร่ายมนต์เอาความเด็ดของถังน้ำ S3 จากบริษัทลูกร้อยพัน มาร้อยรวมเสกร่างชี้เป้าให้ดูยิ่งใหญ่ในบัญชี Data Lake ศูนย์กลางใบเดียว (จิ้มค้นหาดึ๋งเดียวเจอกันหมด ประหยัดเนื้อที่ตังค์ค่าก๊อปปี้ข้อมูล 100%) แถมเครื่องมือของมันยังสามารถสั่งห้ามเด็ดขาดระดับเจาะลึกได้ว่า "เจ้ามาร์คมีสิทธิ์มองเห็นแค่คอลัมภ์ B นะ, ส่วนนายสมชายดึงไฟล์ปีโป้ห้ามแตะโต๊ะซี (column-level access based on user roles)" แบบฟรีสไตล์ โฮลี่ชิท เพอร์เฟค!

❌ **[ผิด] Use Amazon Data Firehose to consolidate data from multiple accounts into a single account.**
- **ทำไมถึงผิด:** จ้างปั๊มสูบดับเพลิงอย่าง **Amazon Data Firehose** มาดูดของส่งข้ามบัญชี...
โอ้โห ขยะแขยงตังค์! Data Firehose เป็นสายยางหัวฉีดที่เอาไว้อ้าปากรับสตรีมคลื่นข้อมูลย่อยๆ (Streaming Data) ด้วยความเร็วแสง ถ้าเอามันมาติดตั้งวางเบ็ดในทุกๆ ธุรกิจสิบบัญชี ให้ดูดย้ายน้ำก๊อปปี้ไฟล์ส่งมาถัง S3 ใหญ่ซ้ำอีกชุด... บิลค่าใบเรียกเก็บเงินเดือนก็จะปรี๊ดพุ่งกระฉูดแตกจากการประมวลผลดับเพลิงและซ้ำซ้อนเปลืองขยะดิสก์ S3 เพิ่มขึ้นอีกเท่าตัว (Costly overhead บานเบอะ) ไม่ใช่ผู้ช่วย Data Lake ตามใจหวัง

❌ **[ผิด] Create a scheduled AWS Lambda function using Amazon EventBridge for transferring data from multiple accounts to the S3 buckets of the central account.**
- **ทำไมถึงผิด:** ทำตัวดราม่าเป็นโปรแกรมเมอร์ วางกับดักดึง **AWS Lambda** พ่วงระเบิดเวลา **EventBridge** ล่อสกิมของย้ายบ้าน...
คุณหนู... คุณกำลังไปตั้งศาลเตี้ยเขียนสคริปต์ทำโอนของเองทั้งยวง! การถวายหัวปั่นโค้ดดึงไฟล์และนั่งหัวฟูแกะรอยกำหนดสิทธิ์พรมแดน Role ข้ามบัญชีคุมสิทธิ์เองด้วยหยาดเหงื่อ มันโคตรเหนื่อยล้า จุกจิก และพังเละเทะง่าย ย้อนแย้งหน้ามือหลบส้นตีนกับโจทย์ที่ขอมินิมอลหั่นทิ้งความวุ่นวาย (minimize overhead) แบบสุดโต่งอย่างรุนแรง

❌ **[ผิด] Use AWS Control Tower to centrally manage each account's S3 buckets.**
- **ทำไมถึงผิด:** เอาไม้บรรทัดเหล็กเฆี่ยนมด สั่งปกครองด้วย **AWS Control Tower** ไปตีกระบาลบัญชีลูก...
Control Tower เกิดมาเป็นคุณครูห้องปกครองเอาไว้คุมบรรทัดฐานเสกสร้างออฟฟิศใหม่ (landing zone) หรือควบคุมกรอบโพลิซีระดับพระกาฬ (Governance and guardrails access) ให้อยู่ในร่องในรอย ไม่ให้พนักงานเสกฐานทัพจนกระจุยกระจาย 
แต่มันหน้าฉาก ไม่ได้รับบทอาชีพเป็นร่างแหซูเปอร์แม่ข่ายดึงไส้ข้อมูลรวมตัวเนื้องานกวาดโคลน S3 มามัดปั่นรวมศูนย์ให้เป็นดง Data Lake เพื่อสืบค้น Query ข้ามจักรวาลได้แต่ประการใด ผิดเวทีแล้วคุณครู!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Data Lake (ทะเลสาบข้อมูล)**: คือแอ่งเก็บน้ำดิบมโหฬาร (มักใช้ S3 เป็นก้นสระ) ที่โยนข้อมูลเทสาดลงมาทั้งก้อนแบบไม่ต้องจัดหมวดหมู่ก่อน... พอดองเสร็จคุณค่อยเอาช้อนตักวิเคราะห์
- **AWS Lake Formation**: ตัวเก่งแห่ง Data Lake เพราะเมื่อก่อนการทำแอ่งน้ำรวมศูนย์แบบนี้ แอดมินต้องเหงื่อตกตั้งค่า Security เป็นเดือนๆ แต่พอมี Lake Formation มันแพคเซ็ตอัปเชื่อมสระน้ำ+คุมสิทธิ์ให้เสร็จหล่อๆในพริบตาแค่ไม่กี่วัน!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Part 13: ข้อ 61 - 65)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 61
**โจทย์:**
An organization requires a persistent block storage volume to support its mission-critical workloads. The backup data will be stored in an object storage service and, after 30 days, transitioned to an archival storage service for long-term retention.

What should be done to meet the above requirement?

**ตัวเลือก:**
- [ ] Attach an instance store volume in your Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 One Zone-IA.
- [ ] Attach an Amazon EBS volume in your Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 One Zone-IA.
- [ ] Attach an instance store volume in your existing Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 Glacier Flexible Retrieval.
- [x] Attach an Amazon EBS volume in your Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 Glacier Flexible Retrieval.

---
### 🎯 โจทย์ต้องการอะไร?
องค์กรระดับโลกต้องการประกอบยานรบ (mission-critical workloads) โดยอยากได้ส่วนประกอบ 3 ชิ้นเรียงตามลำดับ ได้แก่:
1. พระเอก: ฮาร์ดดิสก์แบบบล็อกที่ข้อมูลคงกระพันไม่หายแม้ปิดเครื่อง **(persistent block storage volume)**
2. พระรอง: โกดังสำรองซุกแบ็คอัพก้อนไฟล์ **(object storage service)**
3. ตอนจบ: ไฟล์ที่ซุกไว้ครบ 30 วัน ต้องไหลปลิวเข้าป่าช้าดองอาร์ไคฟ์แช่แข็งยาวนาน **(archival storage service)**
จงจับคู่จัดเซ็ตคอมโบ้สถาปัตยกรรมนี้ให้ถูกต้อง?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: แกะรอยคำต่อคำ! "ฮาร์ดดิสก์บล็อกคงกระพัน" **(`persistent block storage`)** = ต้องเป็น **`Amazon EBS`** เท่านั้น! (Instance Store เป็นของวูบวาบ ปิดเครื่องไฟล์หายเกลี้ยง ไม่ใช่ persistent ถือว่าผิด)
- ทริคที่ 2: โกดังแบ็คอัพเก็บก้อนไฟล์ **(`object storage service`)** = **`Amazon S3`**
- ทริคที่ 3: สุสานแช่แข็งเก็บไฟล์ลืมโลก **(`archival storage`)** = แก๊งน้ำแข็ง **`S3 Glacier`** เท่านั้น! (ถ้าช้อยส์ไปจบที่ S3 One Zone-IA ให้ปาทิ้งได้เลย เพราะมันไม่ใช่คลาสดองศพข้ามทศวรรษ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Attach an Amazon EBS volume in your Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 Glacier Flexible Retrieval.**
- **ทำไมถึงถูก:** เพอร์เฟคคอมโบจับคู่ถูกทุกข้อ! "Persistent block storage" ตัวเก๋าฝั่ง AWS คือ **EBS** แน่นอน (อึดตายยาก ปิดเครื่องไฟล์ก็ยังอยู่) จากนั้น "Object storage" ก็ชี้เป้าคือบ่อ **Amazon S3** และตบท้ายด้วยคลาสสุสาน "Archival storage" ด้วยตระกูล **Glacier (Flexible Retrieval)** ทั้งกระบิ! เป็นสูตรรองรับถูกต้อง 100%

❌ **[ผิด] Attach an instance store volume in your Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 One Zone-IA.**
- **ทำไมถึงผิด:** ผิด 2 ประตูเต็มๆ! "Instance store" คือฮาร์ดดิสก์สายซิ่งที่ถูกลบหายวับทิ้งทันทีที่ปิดเซิร์ฟเวอร์ มันจึงสอบตกคำว่า Persistent (คงทนถาวร) ไปโดยปริยาย แถมตอนจรังไข่สุสานไปใช้ S3 One Zone-IA ซึ่งไม่ใช่คลาสแช่แข็งราคาถูกระดับ Archival (ตกม้าตายตอนจบซ้ำสอง)

❌ **[ผิด] Attach an Amazon EBS volume in your Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 One Zone-IA.**
- **ทำไมถึงผิด:** ต้นเรื่องดีจัดวาง EBS ได้ถูกเผง... แต่มันไปพลาดท่าตรง "นโยบายสุสานตอนจบ" S3 One Zone-IA มันเอาไว้เซฟค่าฝากไฟล์ที่คนหยิบน้อยและยอมรับความเสี่ยงศูนย์ข้อมูลระเบิดหายได้ 1 โซน แต่มันไม่ได้มีคุณสมบัติศักดิ์ศรีเป็นตู้ดองแช่แข็ง (Archival) อย่างที่โจทย์ระบุเจาะจง

❌ **[ผิด] Attach an instance store volume in your existing Amazon EC2 instance. Use Amazon S3 to store your backup data and configure a lifecycle policy to transition your objects to S3 Glacier Flexible Retrieval.**
- **ทำไมถึงผิด:** แช่แข็งถูก แต่ฮาร์ดดิสก์ตัวแม่ดันเป็นของร้อนปลอมปน! "Instance store volume" ลูกนี้คือลูกโป่งน้ำชั่วคราว ถ้าเผลอกดตุ่ม Stop EC2 เมื่อไหร่ไฟล์ระบบก็แตกโพล๊ะหายเกลี้ยงกลายเป็นศูนย์ มันไม่ใช่พระเอก Persistent Block Storage สำหรับงานเสี่ยงตาย Mission-critical โว้ย!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **EBS vs Instance Store**:
  - `EBS (Elastic Block Store)`: ฮาร์ดดิสก์เน็ตเวิร์ค ข้อมูลอยู่ถาวร (Persistent) ทนทาน ดึงปลั๊กย้ายเครื่องได้
  - `Instance Store`: ฮาร์ดดิสก์ที่แถมติดมากับเมนบอร์ดของเซิร์ฟเวอร์เร็วจี๊ด (Ephemeral) เหมาะกับทำพวก Cache แต่ถ้า Stop/Terminate เครื่องเมื่อไหร่ ข้อมูลหายเรียบเกลี้ยงวับ! 

---
---

## 📌 คำถามที่ 62
**โจทย์:**
There was an incident in a production environment where user data stored in an Amazon S3 bucket was accidentally deleted by a Junior DevOps Engineer. The issue was escalated to management, and after a few days, an instruction was given to improve the security and protection of AWS resources.

What combination of the following options will protect the S3 objects in the bucket from both accidental deletion and overwriting? (Select TWO.)

**ตัวเลือก:**
- [ ] Enable S3 Intelligent-Tiering
- [x] Enable Multi-Factor Authentication Delete
- [ ] Provide access to S3 data strictly through pre-signed URL only
- [x] Enable Versioning
- [ ] Disallow S3 Delete using an IAM bucket policy

---
### 🎯 โจทย์ต้องการอะไร?
เหตุการณ์คุ้นๆ (วิบากกรรม S3) วิศวกรฝึกหัดหน้าใหม่ในทีมเผลอไปกดคลิกลบ **(accidentally deleted)** ไฟล์ใน Amazon S3 ระบบล่มกระเจิง โดนผู้บริหารระดับสูงด่าหูฉีก
นายสั่งเด็ดขาดว่า "ไปหามาตรการปกป้อง S3 ให้รอดพ้นจากนรก **เผลอกดลบและเผลอเซฟของกะหลั่วทับ (accidental deletion and overwriting)** ซะให้สิ้นซาก" 
สถาปนิกปวดหัว จะใช้ฟีเจอร์กันลบตัวไหนมาผนึกกำลังกัน 2 ข้อ ถึงจะเอาเด็กรุ่นใหม่เพี้ยนๆอยู่มือ?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดป้องกันการ **`overwriting` (เผลออัปโหลดไฟล์ใหม่ทับไฟล์เก่า)** = ท่าไม้ตายเดียวในจักรวาล S3 ที่เสกให้การอัปโหลดไฟล์ชื่อเดิมกลายเป็นการ "สร้างเวอร์ชั่นใหม่แทนการทับของเดิม" คือท่า **`S3 Versioning`** 
- ทริคที่ 2: เห็นคีย์เวิร์ดป้องกันการเผลอลบ หรือซาดิสต์อยากลบเกลี้ยงกระดาน **`protect... from accidental deletion`** = ฟีเจอร์ตัวแกร่งที่เสริมทัพ Versioning คือคุณต้องบังคับให้คนลบหยิบมือถือมากดรหัส 6 หลักยืนยันตัวตนก่อนลบเสมอ นั่นคือ **`MFA Delete (Multi-Factor Authentication Delete)`** เป็นคอมโบเซ็ตมาตรฐานข้อสอบเลยจ้า 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Versioning**
- **ทำไมถึงถูก:** อัศวินขัดตาทัพของจริง! การเปิดกล้องรักษาความปลอดภัยถ่ายก็อปปี้ย้อนเวลา **S3 Versioning** เมื่อเปิดปุ๊บ หากแอดมินคนไหนเซฟไฟล์ชื่อเดิมซ้ำๆ (overwriting) หรือเผลอกดลบทิ้ง.. ไฟล์เก่าต้นฉบับไม่ได้ระเหยไปไหน! มันจะชุบชีวิตเก็บประวัติย้อนหลังเวอร์ชัน v1, v2 ไว้ซ้อนกันเงียบๆ (แค่ซ่อนป้ายบอกว่าโดนลบ) ทำให้ทีมงานสามารถกู้คลิกคืนชีวิตซากเดิมได้เสมออย่างรวดเร็ว!

✅ **[ถูกต้อง] Enable Multi-Factor Authentication Delete**
- **ทำไมถึงถูก:** ท่าไม้ตายกระแทกพนักงานขี้เซา! ถ้าคิดจะลบเวอร์ชั่นไฟล์เก่าแบบทำลายหายสาบสูญทะลุศาลทิ้งจริงๆ (Permanently delete version) หรือแม้แต่จะแอบไปปิดสวิตช์ฟีเจอร์ Versioning โยนทิ้งเพื่อทำลายหลักฐาน... ระบบจะตะคอกถามและบังคับให้คุณหยิบแอพ **MFA (เลข 6 หลักจากโทเค่นมือถือเจ้าของบัญชีตัวจริง)** มากรอกก่อนเสมอ ทำให้วิศวกรฝึกหัดหมดสิทธิ์เผลอเรอกดลบเกลี้ยงแบบไม่ได้ตั้งใจ (เพราะไม่มีมือถือของหัวหน้า) เป็นเกราะชั้นสองเพอร์เฟกต์ 

❌ **[ผิด] Disallow S3 Delete using an IAM bucket policy**
- **ทำไมถึงผิด:** ดื้อยาเกินกวาดล้าง! ตั้งกำแพงเหล็กจารึกกฎห้ามลบอะไรทั้งในระบบ (Disallow S3 delete)...
มันผิดมหันต์เพราะ "ยาแรงไปจนทำพัง" ถ้าคุณฟันฉับเขียนกฎ IAM ถังห้ามลบเด็ดขาดแบบเหมาเข่ง ถัง S3 ก็จะมีสถิติพองระเบิดเก็บขยะสะสมไปตลอดกาล เคลียร์ทิ้งเซฟพื้นที่ก็ไม่ได้! ปัญหาคือเขาต้องการ "กันอุบัติเหตุลบลั่น" ไม่ได้ต้องการประกาศสงครามกันแอดมินบริหารเคลียร์ดิสก์งานหรอก ยืดหยุ่นน้อยไป

❌ **[ผิด] Enable S3 Intelligent-Tiering**
- **ทำไมถึงผิด:** เอากระเป๋าตังค์ไปกันกระสุน! ระบบ AI โอนจ่ายค่าห้องเก็บอัจฉริยะ **S3 Intelligent-Tiering** ประหยัดตังค์...
ไม่เกี่ยวอะไรกับโจรกรรมเลย การจัดชั้น Tier หาแพคเกจราคาถูกมันเป็นเรื่องเซฟยอดบิลล้วนๆ ไม่ได้มีฟังก์ชันหรืออาวุธหน้าต่างป๊อปอัพไปปกป้องวิศวกรฝึกหัดกดลบไฟล์แม้แต่ชิ้นเดียว

❌ **[ผิด] Provide access to S3 data strictly through pre-signed URL only**
- **ทำไมถึงผิด:** เสียบพาสเวิร์ดผ่านลิ้งก์ชั่วคราว...
Pre-signed URLs มันถูกเสกมาเพื่อให้สิทธิ์ดูภาพ-ดูคลิปลับแบบมีชั่วโมงหมดอายุ (access/reading restrictions) ไม่ได้มีคุณสมบัติอำนาจวิเศษไปเกี่ยวกับการป้องป้องการ Overwrite ไฟล์เซฟทับ หรือสกัดกั้นการเผลอกดเมาส์เลื่อนลบโดยฝั่งแอดมินเลย 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **MFA Delete**: การตั้งค่านี้ "บังคับต้องมี Root Account" เท่านั้นถึงจะเปิด/ปิดฟีเจอร์ตัวนี้ได้ แอดมินไก่กา (IAM User) ทั่วไปไม่มีสิทธิ์ลบถาวรเด็ดขาด! เป็นเกราะสุดยอดสำหรับป้องกันถัง S3 สำคัญ

---
---

## 📌 คำถามที่ 63
**โจทย์:**
A medical records company is planning to store sensitive clinical trial data in an Amazon S3 repository with the object-level versioning feature enabled. The Solutions Architect is tasked with ensuring that no object can be overwritten or deleted by any user in a period of one year only. To meet the strict compliance requirements, the root user of the company’s AWS account must also be restricted from making any changes to an object in the S3 bucket.

Which of the following is the most secure way of storing the data in S3?

**ตัวเลือก:**
- [ ] Enable S3 Object Lock in governance mode with a legal hold of one year.
- [ ] Enable S3 Object Lock in governance mode with a retention period of one year.
- [ ] Enable S3 Object Lock in compliance mode with a legal hold of one year.
- [x] Enable S3 Object Lock in compliance mode with a retention period of one year.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเวชระเบียนโรงพยาบาลได้ทำสัญญากับมารฟ้า! สั่งโยนแฟ้มผลทดลองยา (clinical trial data) ของคนไข้ที่เซนซิทีฟขั้นสุดยอด ลงใน Amazon S3 
สถาปนิกโดนสั่งให้ลงเวทมนต์ร่ายคาถาผนึกก้นถัง (WORM: Write Once Read Many) โดยมีบรรทัดฐานกฎเลือดคือ:
1. ไฟล์ก้อนนี้จะต้องตกผลึกศักดิ์สิทธิ์ **ห้ามให้ใครในโลกหน้าไหนลบ/ทับ เป็นเวลา 1 ปีเต็มเป๊ะ (period of one year only)**
2. ถึงขั้นว่าต่อให้พระเจ้าที่เป็น **"Root user ของ AWS"** จะล็อกอินส่ายอาดๆ มากดลบ ก็ต้องโดนตีหน้าหงายเตะกระเด็น ไม่ยอมให้ลบอย่างเด็ดขาด! (root user... must also be restricted)
ใช้สวิตช์จับเวลา S3 Object Lock ท่าไหนดีถึงจะเหนียวแน่นที่สุดในปฐพี?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: ด่านล็อกถัง S3 ของ Object Lock โหมดห้ามเด็ดขาดไม่ไว้หน้าอินทร์หน้าพรหม **`restricted... root user` (แม้แต่พระเจ้า Root ก็ห้ามลบ!)** = คำสั้นๆ คำเดียวคือต้องเปิดผนึกกาวตาช้าง **`Compliance mode`** เท่านั้น! (ถ้าช้อยส์เป็น Governance mode ถือว่ายังมียอมอ่อนข้อให้คนมีสิทธิ์สูงงัดแงะได้ ถือว่าตกกระป๋องไปเลย)
- ทริคที่ 2: โจทย์บังคับสลักนาฬิกาตายตัว **`period of one year` (1 ปีเต็มหน้าถัง)** = คุณต้องตั้งค่าระบบนับถอยหลังลานตึกระเบิดด้วยเมนู **`retention period`** (เพราะปุ่ม Legal Hold มันเป็นแค่เครื่องหมายแช่แข็งไม่มีอายุเวลาจำกัด กดเปิด/กดปิดมือเปล่าๆเท่านั้น ไม่มีช่องให้กรอกคำว่า 1 ปีใดๆทั้งสิ้น) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable S3 Object Lock in compliance mode with a retention period of one year.**
- **ทำไมถึงถูก:** หยอดกาวตาช้างระดับโลกผสานคุกเวลา! ใช้ **S3 Object Lock โหมด Compliance** พร้อมจับเวลาไขลานหน่วงอายุ 1 ปี (**Retention period**) 
เพราะ **Compliance Mode** คือโหมดโหดสัสอำมหิตที่สุดในสามโลก เมื่อไขกุญแจโหมดนี้ครอบลงบนไฟล์แล้ว แม้แต่ไอดีสูงสุดบัญชีพระเจ้า (Root Account) ก็ไม่มีอำนาจเบิกไขลานปลดลบไฟล์ทำลายป่าเจ็ดป่าแสวงได้... จนกว่านาฬิกาจะนับถอยหลังครบ 1 ปีบริบูรณ์ และการตั้งค่าสั่งล็อกนับเวลาเป๊ะๆ แบบนี้นั้น ตัวเลือกเดียวที่ถูกต้องคือ **Retention period** คือโหมดไขนาฬิกานั่นเอง ตรงเป้าเผงที่สุด!

❌ **[ผิด] Enable S3 Object Lock in governance mode with a retention period of one year.**
- **ทำไมถึงผิด:** หยอดกาวแต่เผลอเจาะรูเผื่อหนีไฟแบบ **Governance Mode** และตั้งนาฬิกา 1 ปี...
Governance Mode มันยังมีรอยด่างพร้อยอยู่ตรงที่ว่า "มันเอาไว้ป้องกันแค่ระดับพนักงานทั่วไปเดินเตะลบไฟล์เล่น.. แต่ยังอนุญาตให้แอดมินที่มีบัตรผู้จัดการระดับพิเศษ (Special IAM privileges `s3:BypassGovernanceRetention`) หรือนายใหญ่ Root User สามารถงัดแงะยกเลิกการล็อกล้างบางได้กลางคัน!" ซึ่งมันแหว่งผิดจากกฎเหล็กที่โจทย์สั่งบังคับลั่นหน้าอกว่าให้บล็อกแบนตบหน้ามนุษย์หน้าไหนก็ตามรวมทั้งเทพเจ้า Root user ด้วย

❌ **[ผิด] Enable S3 Object Lock in governance mode with a legal hold of one year.**
- **ทำไมถึงผิด:** ได้โหมดกาว Governance แหว่งๆ แถมดันไปใช้ระบบกดปุ่มแช่แข็ง **Legal Hold** 
บรรลัยคูณสอง! นอกจากตัวมันเองจะเปิดช่องโหว่รอมชอมให้แอดมินสูงๆแอบมารบได้แล้ว... ฟีเจอร์ Legal Hold มันประพฤติตัวเป็นแค่ "ปั๊มสวิตช์เปิด/ปิดหน้าตาเฉยๆ" ที่สั่งให้ไฟล์แช่แข็งไว้ยาวๆ ไม่ให้ใครลบแบบไร้อนาคต **(ไม่อิงกับอายุนาฬิกา ไม่มีปฏิทินนับถอยหลัง!)** การเอา Legal Hold มาอ้วกบอกว่าจะตั้งเวลาให้มันทำงาน "1 ปีนะสาด" จึงประโยคหลอกเด็กที่ทำไม่ได้และไม่มีอยู่ในระบบ AWS 

❌ **[ผิด] Enable S3 Object Lock in compliance mode with a legal hold of one year.**
- **ทำไมถึงผิด:** ใช่! โหมดกาวตาช้างแกร่งสุดใช้ Compliance โหดจริง... แต่ดันไปตักใส่ปุ่มสวิตช์ฉุกเฉิน **Legal Hold**!
ก็ตามที่ด่าไปข้อข้างบน "Legal Hold" เป็นสวิตช์เปิดปิดชั่วคราว ไม่มีช่องรับกรอกตัวเลขตั้งเวลา (Duration) ใดๆ ทั้งนั้น มันกดล็อคแช่ก็คือแช่ทิ้งประดับไว้พะบูพะยูนตลอดกาลจนกว่าจะมีใครสักคนได้รับอนุญาตให้ไปกดปิดมันออก โหมดที่ตั้งอายุนับถอยหลัง 1 ปีได้จึงต้องเป็นเมนูบังคับ "Retention Period" เท่านั้น 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **WORM (Write Once, Read Many)**: สโลแกนเขียนได้ครั้งเดียว อ่านได้ร้อยครั้ง แต่ห้ามแก้ห้ามลบ! ตอบโจทย์บริษัทการแพทย์/ธนาคาร ที่กลัวโดนปรับเวลาข้อมูลโดนตัดต่อ ใช้อาวุธ S3 Object Lock คู่กายเสมอมี 2 โหมดคือ:
  1. `Governance` (หยวนๆ แอดมินใหญ่ลบได้)
  2. `Compliance` (โหดขี้แตก ไม่มีพระเจ้าองค์ไหนลบได้ทั้งนั้น จนกว่าจะหมดเวลา)

---
---

## 📌 คำถามที่ 64
**โจทย์:**
A company hosted an e-commerce website on an Auto Scaling group of Amazon EC2 instances behind an Application Load Balancer. The Solutions Architect noticed that the website is receiving a high number of illegitimate external requests from multiple systems with frequently changing IP addresses. To address the performance issues, the Solutions Architect must implement a solution that would block these requests while having minimal impact on legitimate traffic.

Which of the following options fulfills this requirement?

**ตัวเลือก:**
- [ ] Create a custom network ACL and associate it with the subnet of the Application Load Balancer to block the offending requests.
- [ ] Create a regular rule in AWS WAF and associate the web ACL to an Application Load Balancer.
- [ ] Create a custom rule in the security group of the Application Load Balancer to block the offending requests.
- [x] Create a rate-based rule in AWS WAF and associate the web ACL to an Application Load Balancer.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บอีคอมเมิร์ชปวดหัวหนัก! เจอมหกรรมพายุจลาจล **หุ่นบอทยิงถล่มโถมหน้าเว็บเข้ามา (receiving a high number of illegitimate requests)** ทำเอาเว็บกระตุกอืดเป็นเรือเกลือ 
แถมมิจฉาชีพพวกนี้ฉลาดเป็นกรด ปราบยากเพราะมันขยัน **"เปลี่ยนไอพีแอดเดรสใหม่หลอกตบตารัวๆตลอดเวลา (frequently changing IP addresses)"**
สถาปนิกต้องการฟาดแส้หาปราการเหล็กมากำราบสกัดแก๊งบอทกวนบาทานี้ โดยที่มีกฎเหล็กพ่วงท้ายคือ "ต้องปกป้องไม่ให้กระทบกระเทือนบล็อกลูกค้ามนุษย์ดีๆ (legitimate traffic) ที่มาเดินเล่นซื้อของตามปกติเลยนะ" 
ต้องใช้กำแพงเหล็กสูตรไหนของ AWS จัดการ?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดอาการคนแห่ทุบประตูรัวๆยอดคลิกทะลัก **`high number of requests`** ควบกับพฤติกรรมโจรพลิกแพลง **`frequently changing IP addresses` (เปลี่ยนไอพีหนีเรื่อยๆบล็อกรายตัวไม่ทัน)** = ต้องยกพลขึ้นบกด้วยระบบจดจำกลิ่นความถี่ของกำแพงแอปพลิเคชั่น **`AWS WAF`** ควบคู่กับโหมด **`Rate-based rule (กฎจับโควต้าคลิกถี่เกรี้ยวกราดเกินไป)`** เท่านั้น ถึงจะสะกดระงับอาการคลุ้มคลั่งบอทแบบนี้ได้ชะงัด และไม่กระทบคนหาเช้ากินค่ำ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a rate-based rule in AWS WAF and associate the web ACL to an Application Load Balancer.**
- **ทำไมถึงถูก:** อัญเชิญกำแพงหน้าบ้านยันต์แปดทิศ **AWS WAF (Web Application Firewall)** เสกคาถาเชือกบ่วงบาศ **"Rate-based rule (กฎจับความถี่การคลิก)"** แล้วสวมทับหน้าต่างระเบียง Application Load Balancer ไปเลย 
WAF มีหัวใจมังกรแบบ **Rate-based rule** ที่คอยเพ่งเล็งรอยตีนมนุษย์ต่อ 1 IP หากมันตรวจพบว่า "เห้ย ไอพีเบอร์มึงคลิกเปิดหน้าเว็บกูซ้ำๆ มากกว่า 5,000 ครั้งในเวลาแค่ 5 นาทีเนี่ย มันบอทดึงข้อมูลป่วนระบบล้านเปอร์เซ็นต์ ไม่ใช่มนุษย์แล้ว" กฎนี้ก็จะพุ่งชาร์จจับเครื่องพันธนาการบล็อกไอพีผีตัวนั้นซะ! 
แต่ลูกค้านาย ก. ไก่ที่คลิกช้อปปิ้งปกติ (ยอดวิวน้อยๆครั้ง) ก็โลดแล่นเนียนกริบ แถมถึงแม้บอทจะทะลึ่งพยายามหมุนเปลี่ยนไอพีเบอร์ใหม่เข้าหา WAF ก็จะจับสัมผัสความบ้าคลั่งความถี่และจับหักแบนร่วงเป็นชิ้นๆไปอยู่ดี สกัดอยู่หมัดทุกท่วงท่า!

❌ **[ผิด] Create a custom network ACL and associate it with the subnet of the Application Load Balancer to block the offending requests.**
- **ทำไมถึงผิด:** กะตะลุยถึกด้วยการโยนหินก้อนต่อก้อนใส่หน้ายามเฝ้าถนน **Network ACL** แบนรายไอพี...
โคตรเหนื่อยตาหลุดฟรีๆ! โจรมันบอกพฤติกรรมออกนอกหน้าชัดเจนอยู่ว่าขยัน "เปลี่ยน IP addresses หลอกตบตาตลอดกาลซ้ำๆ วนไป" ขืนคุณไปนั่งเปิดสมุดหน้าเหลืองเขียนกฎ NACL บล็อกไอพีใส่ Blacklist ตลอดกาล คุณก็ต้องเขียนไปร้องไห้ไปใหม่ล้านบรรทัดไล่ตามตูดมันตลอดชาติ แก้ปัญหาการรุมถล่ม (Throttle Limit) ไม่ได้เลย

❌ **[ผิด] Create a regular rule in AWS WAF and associate the web ACL to an Application Load Balancer.**
- **ทำไมถึงผิด:** ตั้งกฎลวดหนาม WAF เหมือนกันขึงไว้... แต่ดันซื่อบื้อใช้กฎพื้นๆ ตายตัว **Regular rule** 
กฎ Regular ของ WAF คือการตั้งดักสกัดคำต้องห้ามหน้ามืดตาบอด เช่น วิจัยว่า "ถ้าเจอลิงก์คนเสิร์จต่อท้ายคำว่า .jpg ให้บล็อก", "มีคำว่า DROP TABLE ให้บล็อก" ซึ่งมันไม่ได้ช่วยแก้ปัญหากลุ่มแก๊งบอทปรกติที่ปั่นทราฟฟิกรัวๆจนเครื่องเหนื่อยหอบเลยซักนิด โจรมันแค่คลิกหน้าร้านชิลๆ ซ้ำๆ แบบเนียนๆ มันก็แอบขโมยพลังแอปคุณได้แล้ว ต้องใช้แบบรดน้ำตามเป้า (Rate-based) ถึงจะตรวจจับความร้อนรุ่มของยอดคลิกสยบมารได้

❌ **[ผิด] Create a custom rule in the security group of the Application Load Balancer to block the offending requests.**
- **ทำไมถึงผิด:** ตั้งบอร์ดกำแพงรักษาความปลอดภัย **Security Group (SG)** พิมพ์กฎกร่างห้ามหน้าเหี้ยมเข้า...
ขำกลิ้ง! โครงสร้างของ Security Group ทั่วทั้งจักรวาล AWS ไม่ได้มีสวิตช์ปุ่ม **"DENY (ปฏิเสธแบนรายชื่อ)"** ไว้ห้ามใครทั้งนั้นเลย! กติกาของ SG คือ White-list "อนุญาตให้เข้าแค่นี้เท่านั้น นอกนั้นปลิว" และมันไม่สามารถเป็นปัญญาชนจับอารมณ์บอทยิงคลิกทะลักรัวความถี่ (Rate Limit/ Throttle Rate) ได้แบบหน้าต่าง WAF แต่อย่างใด สอบตกหมดท่า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **DDoS/Bot Attacks**: เวลาเจอคนยิงถล่มหน้าเว็บ (อย่างเช่นขิงรุมคลิกรีเฟรช F5 ถล่มเว็บโควตาวัคซีน) อาวุธชิ้นเอกที่ AWS เตรียมไว้ป้องกันคือ:
  1. `AWS Shield Advanced`: ด่านโล่กันกระสุนไซสยักษ์ระดับเน็ตเวิร์ค
  2. `AWS WAF` (Rate-based): ยามเฝ้าประตูตรวจความถี่ ถ้าย้ำคลิกแบบโรคจิตเกินมนุษย์ เตะก้านคอบล็อกทิ้ง!

---
---

## 📌 คำถามที่ 65
**โจทย์:**
A software development company is using serverless computing with AWS Lambda to build and run applications without having to set up or manage servers. The company has a Lambda function that connects to a MongoDB Atlas, which is a popular Database as a Service (DBaaS) platform, and also uses a third-party API to fetch certain data for its application. One of the developers was instructed to create the environment variables for the MongoDB database hostname, username, and password, as well as the API credentials that will be used by the Lambda function for DEV, SIT, UAT, and PROD environments.

Considering that the Lambda function is storing sensitive database and API credentials, how can this information be secured to prevent other developers on the team, or anyone, from seeing these credentials in plain text? Select the best option that provides maximum security.

**ตัวเลือก:**
- [ ] Enable SSL encryption that leverages on AWS CloudHSM to store and encrypt the sensitive information.
- [ ] There is no need to do anything because, by default, Lambda already encrypts the environment variables using the AWS Key Management Service.
- [x] Create a new AWS KMS key and use it to enable encryption helpers that leverage on AWS Key Management Service to store and encrypt the sensitive information.
- [ ] Lambda does not provide encryption for the environment variables. Deploy your code to an Amazon EC2 instance instead.

---
### 🎯 โจทย์ต้องการอะไร?
ทีมโปรแกรมเมอร์ใช้บริการเสกโค้ด **AWS Lambda** รันชิลๆ แล้วกะจะมุดต่องวงขอกุญแจเข้าไปเสียบอ่านฐานข้อมูลและดึง API ของชาวบ้าน (MongoDB / Third Party) 
แต่คนเขียนดันเอามักง่ายเอา **Username, Password** ที่เป็นความลับสูงสุด ไปหยอดใส่กรอกแบหลาโชว์ลงในช่องพารามิเตอร์ตูดเซิร์ฟ **(Environment variables)** 
ประเด็นคอขาดบาดตายคือ พวกเพื่อนลูกมือโปรแกรมเมอร์ในทีมคนอื่นๆ รวมไปถึงคนนอก "พอกดล็อกอินคลิกหน้าเว็บ AWS คอนโซลปุ้มเข้าไปดู ก็จะเห็นรหัสผ่านเหล่านั้นโชว์ประจานตระหง่านคาเบ้าตา (plain text ตัวหนังสือโต้งๆ)" ทันที!
โจทย์ต้องการวิธี **มัดรวมเข้ารหัสขั้นสุดยอดขั้นเทพ (maximum security)** ป้องกันไม่ให้ใครก็ตามในหน้าจอตั้งค่า เห็นหรือขโมยรหัสกุญแจพวกนี้หลุดลอยเด็ดขาด!

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคที่ 1: เห็นคีย์เวิร์ดปัญหาพาสเวิร์ดหลุดส่องเห็นเด่นชัดใน **`plain text`** ในช่องเซ็ตติ้งของ **`Lambda environment variables`** = วิธีกลบเกลื่อนรอยด่างคือการกระชากดึงตัวช่วย **`encryption helpers`** (ปุ่มเข้ารหัสซ่อนโค้ดที่ขยี้รหัสของ Lambda) มาประสานกำลังเปิดใช้งานร่วมกับการถลุงปั๊มลูกกุญแจส่วนตัวที่เราตีตราขึ้นมาเอง **(`AWS KMS key`)** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new AWS KMS key and use it to enable encryption helpers that leverage on AWS Key Management Service to store and encrypt the sensitive information.**
- **ทำไมถึงถูก:** เพอร์เฟ็กต์สุดบนหน้าปัดไขกุญแจ! เบิกกุญแจตลับลูกบิดทองคำ **AWS KMS (Key Management Service) Key** ตัวลิมิเต็ดของเราเอง แล้วกดเปิดปืนช่วยบดขยี้รหัส **(Encryption helpers)** ขยี้เสยซ่อนเซฟพาสเวิร์ดนี้ให้กลายเป็นกราฟึกเลอะเทอะไว้เลย
ถึงแม้ Lambda จะแอบหมกดองรหัสไว้ก้อนนึง แต่ถ้าเราทำวิชามารผูก "Encryption Helper" ควบคู่กับการเรียกปั๊มลูกกุญแจ KMS ลายเซ็นต์ของเราเองคล้องไว้... พอเพื่อนร่วมทีมคนอื่น (ที่ไม่มีบัตรเชิญเข้าถึง KMS เส้นนี้) ล็อกอินหน้า AWS Console และแอบถ่างตาส่องช่องหน้าต่าง Environment Variables สิ่งที่สายตาเขาจะเห็นคือมหกรรมมนต์ขอม "ตัวอักษรจึกยึกยือ (cipher text เข้ารหัส)" เละเทะอ่านกุญแจดิบๆ ไม่ออกแน่นอน ปลอดภัยไร้ปลิงดูด!

❌ **[ผิด] There is no need to do anything because, by default, Lambda already encrypts the environment variables using the AWS Key Management Service.**
- **ทำไมถึงผิด:** ลอยหน้าลอยตาประมาทหน้าแตก! อ้างว่าไม่ต้องทำอะไรหรอกจ้า Lambda เสิร์ฟแม่กุญแจ KMS ซ่อนให้อยู่แล้ว...
เป็นความประมาทขั้นวิบัติ! "จริงอยู่ว่า AWS ซ่อนกุญแจออฟไลน์ไว้ให้ในไดรฟ์ (At-Rest)" แต่! พอคุณโปรแกรมเมอร์เปิดหราล็อกอินมาเลื่อนเมาส์ส่องดูหน้าเว็บ Console AWS... ตัวกุญแจ KMS แบบฟรี (Default key) ถังของมันดัน **"ไขโชว์ปลดล็อกตัวหนังสือรหัสพาสเวิร์ดออกสดๆ โชว์แสงเจิดจ้าตีแผ่ต่อหน้าต่อตากลางวง!!"** ทำให้แอดมินหรือโปรแกรมเมอร์ในแผนกที่อ่านได้ ก็ยังแอบจดรหัสขโมยไปใช้อยู่ดี ผิดหลัก Maximum security เต็มประตู

❌ **[ผิด] Enable SSL encryption that leverages on AWS CloudHSM to store and encrypt the sensitive information.**
- **ทำไมถึงผิด:** เปิดสายสิญจน์ SSL ตรึงเสาตู้เซฟปืนใหญ่ **AWS CloudHSM (Hardware Security Module)** เข้าเกียร์...
เอากระสุนลูกซองไปยิงมดกิ่งไม้! CloudHSM คือตู้เซฟป้อมปราการเหล็กตัวท็อปสำหรับธนาคารราคาเหยียบครึ่งแสนบาทต่อปีของ AWS ซึ่งการเอามาครอบรหัสพาสเวิร์ดยิบย่อย 2-3 บรรทัดให้โปรแกรมเมอร์ดูมันเกินหน้าที่เกินวิสัย แถมไม่จำเป็นโคตรๆ เพราะมีกุญแจ KMS รุ่นเด็กเทพและฟรีพอใช้งานอยู่แล้ว ยิ่งไปกว่านั้น SSL เป็นเรื่องซ่อนตัวตอนสายลมวิ่งลอยฟ้าระหว่างส่งค่า (In-transit) ไม่ใช่เก็บซ่อนฝังในไข่รู Environment Variables 

❌ **[ผิด] Lambda does not provide encryption for the environment variables. Deploy your code to an Amazon EC2 instance instead.**
- **ทำไมถึงผิด:** งกถอยหนีพ่ายแพ้ บอกว่า Lambda มันอนุบาลกระจอกไม่มีระบบซ่อนพาสเวิร์ดหรอก ย้ายแอปเหี้ยๆนี้ไปคีย์รันบนเครื่อง EC2 ดีกว่ามั้ง...
ดูถูกเทคโนโลยีชาวบ้านเกินไปโว้ย! AWS Lambda เป็นสุดยอดความภูมิใจที่มีบริการบดรหัส Environment variables ปะกบทับผ่านความกรุณาช่วยของลูกพี่ตระกูล KMS เพียบพร้อมให้กดเปิดใช้งาน (Encryption Helpers) แบบอัจฉริยะอยู่แล้วจ้า อย่ามาหนีปัญหาย้ายบ้าน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Lambda Environment Variables**: มันคือช่องกรอกตัวแปรที่ใช้ป้อนรหัสให้สคริปต์โค้ดดึงไปสูบใช้ แต่เพื่อพลานามัยที่ดีที่สุด! สถาปนิกเก่งๆ เขาจะไม่มักง่ายพิมพ์พาสเวิร์ดทิ้งไว้ในช่อง Environment Variables กันหรอก แต่เขาจะมัดรหัสไปโยนเกาะผูกสลักซ่อนไว้ในโกดังหรูอย่าง **AWS Secrets Manager** หรือ **Systems Manager Parameter Store** แทน แล้วค่อยให้โค้ดแอบล้วงไปดึงตอนโหลด ซึ่งเนียนกว่า แถมหน้า Console ก็ไม่โชว์ของอุจาดตาให้เพื่อนเห็นด้วย!

---
---
