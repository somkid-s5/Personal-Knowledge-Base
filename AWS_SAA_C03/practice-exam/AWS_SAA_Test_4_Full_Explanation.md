# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 1: ข้อ 1 - 10)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 1
**โจทย์:**
A company needs to implement a solution that will process real-time streaming data of its users across the globe. This will enable them to track and analyze globally-distributed user activity on their website and mobile applications, including clickstream analysis. The solution should process the data in close geographical proximity to their users and respond to user requests at low latencies.

Which of the following is the most suitable solution for this scenario?

**ตัวเลือก:**
- [x] Integrate CloudFront with Lambda@Edge in order to process the data in close geographical proximity to users and respond to user requests at low latencies. Process real-time streaming data using Kinesis and durably store the results to an Amazon S3 bucket.
- [ ] Use a CloudFront web distribution and Route 53 with a latency-based routing policy... Process real-time streaming data using Kinesis and durably store to S3.
- [ ] Integrate CloudFront with Lambda@Edge... Process real-time streaming data using Amazon Athena and durably store the results to an Amazon S3 bucket.
- [ ] Use a CloudFront web distribution and Route 53 with a Geoproximity routing policy... Process real-time streaming data using Kinesis...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทต้องการสร้างระะบบรับมือกับ "ข้อมูลพฤติกรรมการคลิกสตรีมแบบสดๆ (real-time streaming data / clickstream)" ของลูกค้าจาก "ทั่วทุกมุมโลก (across the globe)" 
เป้าหมายขั้นเทพ: ต้องให้ลูกค้าที่กดคลิก ได้รับการ **"ประมวลผลข้อมูลในตึกเซิร์ฟเวอร์ที่ใกล้บ้านลูกค้าที่สุด (close geographical proximity)"** และตอบกลับลื่นไหลไม่หน่วง (low latencies)!

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: อยากดักจับประมวลผลหน้าด่าน "ใกล้บ้านลูกค้าที่สุด (close proximity to users)" ไม่ใช่แค่วิ่งส่งข้อมูลเฉยๆ แต่ต้องประมวลผลด้วย (process data) = ไม้ตายคือ **`Lambda@Edge`** (ฝังโค้ดไว้ตามตึก CloudFront ถาวร)
- ทริค 2: สุขศาลาประมวลผล "ข้อมูลคลิกสตรีมไหลต่อเนื่องเป็นสายน้ำสดๆ (real-time streaming data / clickstream)" = บิดาแห่งสายน้ำคือ **`Amazon Kinesis`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Integrate CloudFront with Lambda@Edge in order to process the data... Process real-time streaming data using Kinesis...**
- **ทำไมถึงถูก:** คอมโบยอดมนุษย์! `Lambda@Edge` จะไปสิงอยู่ตามตึก CloudFront ใกล้บ้านลูกค้า คอยรับพฤติกรรมคลิกและประมวลผลให้แบบไร้ความหน่วง แล้วจากนั้นก็สาดข้อมูลสดๆ เข้าท่อ `Amazon Kinesis` เพื่อไปย่อยวิเคราะห์คลิกสตรีมต่อ จบงานเพอร์เฟค!

❌ **[ผิด] Integrate CloudFront with Lambda@Edge... Process real-time streaming data using Amazon Athena...**
- **ทำไมถึงผิด:** ตกม้าตายครึ่งหลัง! `Amazon Athena` เป็นเทพนักร่ายเวทตาราง SQL (เอาไว้สิงค้นหาไฟล์บน S3) มันไม่ใช่ท่อรับน้ำ "real-time streaming" เด้อออ (ผิดประเภท)

❌ **[ผิด] ใช้ Route 53 (latency-based หรือ Geoproximity)**
- **ทำไมถึงผิด:** โดนหลอก! `Route 53` เป็นแค่ "ป้ายบอกทางจราจร" มันทำหน้าที่ชี้เป้าให้ว่ารถต้องวิ่งอ้อมไปทางไหน แต่มัน **"ไม่สามารถเขียนโค้ดประมวลผลข้อมูลอะไรให้คุณได้นะจร๊ะ (no computing capability)"** จึงช่วยแก้ตรงโจทย์ไม่ได้เท่า Lambda@Edge 

---
---

## 📌 คำถามที่ 2
**โจทย์:**
A company launched an EC2 instance in the newly created VPC. They noticed that the generated instance does not have an associated DNS hostname.

Which of the following options could be a valid reason for this issue?

**ตัวเลือก:**
- [x] The DNS resolution and DNS hostname of the VPC configuration should be enabled.
- [ ] Amazon Route53 is not enabled.
- [ ] The newly created VPC has an invalid CIDR block.
- [ ] The security group of the EC2 instance needs to be modified.

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินใจร้อน สร้างเขตรั้ว VPC ใหม่เอี่ยม และเสกเครื่อง `EC2` ลงไป 
แต่ปัญหาคือ: ตอนเปิดเนตรขึ้นมา ส่องดูปรากฎว่า **"เครื่องไม่มีชื่อเรียก (no associated DNS hostname)"** มีแต่ IP แข็งๆ
สาเหตุเกิดจากหญ้าปากคอกตรงไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: กฎเหล็กของ AWS คือ "ถ้าแกสร้าง VPC สร้างเองกับมือ (Custom VPC) ค่าดั้งเดิมของมันคือมันจะ **ปิด** ออปชั่นตั้งชื่อ DNS อัตโนมัติ" หน้าที่คุณคือต้องไปเดินสวิตช์เปิด **`DNS resolution` และ `DNS hostnames`** ที่ VPC ซะก่อน!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The DNS resolution and DNS hostname of the VPC configuration should be enabled.**
- **ทำไมถึงถูก:** เบสิกตกวิชาสร้างบ้าน 101! ถ้าเป็น Default VPC ของระบบ มันจะเปิดสวิตช์แจกชื่อ DNS ให้อยู่แล้ว แต่พอคุณมาสร้าง VPC เอง คุณต้องก้มลงไปกดติ๊กถูกติ๊กเปิดคุณสมบัติ `DNS hostnames` ซะก่อน ไม่งั้นระบบจะแจกแค่เบอร์ IP เฉยๆ!

❌ **[ผิด] Amazon Route53 is not enabled.**
- **ทำไมถึงผิด:** เลอะเทอะ! ไม่เกี่ยวอะไรกับ `Route 53` เลยสักนิด! ไอ้ชื่อ DNS ของตัวเครื่องเนี่ย มันเป็นฟีเจอร์แถมฟรีในระดับแม่ข่ายบ้าน VPC ล้วนๆ

❌ **[ผิด] The security group... or invalid CIDR block**
- **ทำไมถึงผิด:** เอ้า Security Group ห้ามรถเข้าออก (พอร์ตพัง) / CIDR ล่ม (AWS มันร้องโวยวายตั้งแต่กดสร้างแล้ว ไม่ปล่อยให้คุณสร้างผ่านหรอก)... สรุปคือมโนเก่ง ไกลเกินเหตุไปหมดจ้า

---
---

## 📌 คำถามที่ 3
**โจทย์:**
A company decided to change its third-party data analytics tool to a cheaper solution. They sent a full data export on a CSV file which contains all of their analytics information. You then save the CSV file to an S3 bucket for storage. Your manager asked you to do some validation on the provided data export.

In this scenario, what is the most cost-effective and easiest way to analyze export data using standard SQL?

**ตัวเลือก:**
- [x] To be able to run SQL queries, use AWS Athena to analyze the export data file in S3.
- [ ] Use mysqldump client utility to load the CSV export file from S3 to a MySQL RDS instance...
- [ ] Create a migration tool to load the CSV export file from S3 to a DynamoDB instance...
- [ ] Use a migration tool to load the CSV export file from S3 to a database that is designed for online analytic processing (OLAP) such as AWS RedShift...

---
### 🎯 โจทย์ต้องการอะไร?
ลดงบประมาณรัดเข็มขัดกันสุดๆ! บริษัทดึงข้อมูลหนีออกมาเป็นแผ่นไฟล์ม้วนเดียวคือ **"ไฟล์ CSV สถิติ (export data)"** แล้วเอาไปซุกซ่อนไว้บนบ่อราคาถูก **`Amazon S3`**
คำประการสิทธิ์บอส: "หาท่ายากที่ประหยัดตังค์สุดๆ + ง่ายจัดๆ (cost-effective and easiest) ในการล้วงวิเคราะห์ไฟล์ CSV นี้ด้วยภาษา **`SQL`** ซิ๊!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: เมื่อคุณมีไฟล์ตายด้านโง่ๆอย่าง CSV, JSON อยู่ในตู้เซฟอย่างถัง **`S3`** แล้วคุณแผลงฤทธิ์อยากเสกคาถา **"วิเคราะห์ข้อมูลด้วยคำสั่ง SQL ตรงๆ ไร้เซิร์ฟเวอร์"** = จงถวายบังคมเรียก **`Amazon Athena`** ยอดนักสืบพ่วงเวทมนต์ SQL ขึ้นมาทันที!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] To be able to run SQL queries, use AWS Athena to analyze the export data file in S3.**
- **ทำไมถึงถูก:** เปรี้ยงเดียวจบ! ตัว `Amazon Athena (อาธีน่า)` คือค้อนวิเศษ เอาไว้หวดอ่านค้นหาไฟล์ดิบๆ บน S3 ด้วยภาษา SQL เลย! ไม่ต้องเปิดเช่าเซิร์ฟเวอร์ (Serverless) และเสียเงินคิดเรทเฉพาะแค่ "ตอนที่คุณกดค้นหาข้อมูล" เท่านั้น! ประหยัดและง่ายที่สุดในสามโลก

❌ **[ผิด] Use mysqldump / RedShift / DynamoDB...**
- **ทำไมถึงผิด:** ขี่ช้างอ้อมโลกจับตั๊กแตน! การที่คุณเอาไฟล์ CSV แล้วไปลักลอบจ้างเครื่องดาต้าเบส (RDS, Redshift) แล้วมานั่ง Import เข้าตาราง... 1. เสียตังค์ค่ารันเปิดเซิร์ฟเวอร์ดาต้าเบส 2. ลำบากโคตรรร (เหนื่อย setup) 3. DynamoDB ไม่รองรับ SQL ด้วยซ้ำ!

---
---

## 📌 คำถามที่ 4
**โจทย์:**
A Solutions Architect is designing the cloud architecture for the enterprise application suite of the company. Both the web and application tiers need to access the Internet to fetch data from public APIs. However, these servers should be inaccessible from the Internet.

Which of the following steps should the Architect implement to meet the above requirements?

**ตัวเลือก:**
- [x] Deploy a NAT gateway in the public subnet and add a route to it from the private subnet where the web and application tiers are hosted.
- [ ] Deploy the web and application tier instances to a public subnet and then allocate an Elastic IP...
- [ ] Deploy a NAT gateway in the private subnet and add a route to it from the public subnet...
- [ ] Deploy the web and application tier instances to a private subnet and then allocate an Elastic IP...

---
### 🎯 โจทย์ต้องการอะไร?
แอปองค์กรชั้นความลับ: มีเซิร์ฟเวอร์ Web & App ซุ่มซ่อนตัว
ภารกิจ: พวกมัน **"หิวเน็ต ขอเปิดทางมุดออกไปดึงข้อมูลชาวบ้าน (access the Internet)"** แต่กฎเหล็กสุดขีดคือ **"ห้ามให้คนนอกบ้านส่องส่องมุดเข้ามาหาปะฉะดะตัวมันเด็ดขาด! (inaccessible from the Internet)"**
คำถาม: ท่ายากสถาปัตยกรรมไหนตรงสเปคผีล่องหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ถ้าต้องการให้เครื่องในบ้าน "มุดออกเน็ตได้ แต่ฝั่งเน็ตเจาะเข้ามาไม่ได้" = นี่คือสูตรสำเร็จของการวางเครื่องหลบกระสุนไว้ในบ้านลับ `Private subnet` แล้วผูกท่อหายใจห้อยปอด **`NAT Gateway`** ทิ้งไว้ 
- ทริค 2: สลักหลังกฎแรงดึงดูด! ตัว `NAT Gateway` ต้องตั้งตระหง่านท้าลมกระสุนอยู่ ณ แดนหน้า **`Public Subnet (หมู่บ้านติดถนนใหญ่)`** เท่านั้นเสมอ!! (เพื่อให้มันรับลมส่งข้อมูลข้ามถนนไปหา IGW)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy a NAT gateway in the public subnet and add a route to it from the private subnet where the web and application tiers are hosted.**
- **ทำไมถึงถูก:** ตรงเป๊ะทุกจุดสัมผัส! คุณปั้น `NAT gateway` เป็นป้อมหน้าด่านทิ้งรับลมบกที่ `Public Subnet` แล้วตีตั๋วถนน (Route) โยงเอาไอ้เจ้าเครื่อง Web+App ที่แอบซ่อนตัวอยู่ในรูดำกลีบเมฆ (`Private subnet`) ให้ค่อยๆ แอบเดินมาขอลอดท่อห้ามเข้าออกไปเสพสวรรค์เน็ตได้อย่างปลอดภัย (คนฝั่งเน็ตจะตามสืบจ๊ะเอ๋เจอแค่ป้อม NAT ชนตู้มไม่ทะลุไปต่อ)

❌ **[ผิด] Deploy a NAT gateway in the private subnet...**
- **ทำไมถึงผิด:** เอ้าผิดที่! เอาป้อมยามอ้วนๆ อย่าง NAT ไปฝังกลบตายอยู่ในเมืองบาดาล (Private) มันก็ไม่มีถนนออกเน็ตสิพ่อร่ม เค้าต้องเอาไว้แดนหน้า (Public) โว้ย

❌ **[ผิด] Deploy the web and application tier instances to a public subnet...**
- **ทำไมถึงผิด:** ห้าวจัด! เอาเครื่องลวงตาองค์กรไปกระโดดวิ่งแก้ผ้าอยู่กลางแยกไฟแดง (Public) มันก็แหกกฎ "ห้ามคนนอกส่องเห็น" แถมการแจกเลขพาสปอร์ต `Elastic IP` (EIP) ยิ่งแปลว่าคุณป่าวประกาศชวนโจรมาเจาะหน้าบ้านคุณก๋ากั่นเลย!

---
---

## 📌 คำถามที่ 5
**โจทย์:**
A company recently launched an e-commerce application that is running in eu-east-2 region, which strictly requires six EC2 instances running at all times. In that region, there are 3 Availability Zones (AZ) that you can use - eu-east-2a, eu-east-2b, and eu-east-2c.

Which of the following deployments provide 100% fault tolerance if any single AZ in the region becomes unavailable? (Select TWO.)

**ตัวเลือก:**
- [x] eu-east-2a with six EC2 instances, eu-east-2b with six EC2 instances, and eu-east-2c with no EC2 instances
- [x] eu-east-2a with three EC2 instances, eu-east-2b with three EC2 instances, and eu-east-2c with three EC2 instances
- [ ] eu-east-2a with four EC2 instances, eu-east-2b with two EC2 instances, and eu-east-2c with two EC2 instances
- [ ] eu-east-2a with two EC2 instances, eu-east-2b with four EC2 instances, and eu-east-2c with two EC2 instances
- [ ] eu-east-2a with two EC2 instances, eu-east-2b with two EC2 instances, and eu-east-2c with two EC2 instances

---
### 🎯 โจทย์ต้องการอะไร?
กฎเหล็กสุดโหด: ร้านค้า E-commerce **สัญญายืมจมูกคนอื่นพ่นควันว่า "ต้องมีเครื่อง EC2 ยืนหยัดทำงานหน้าฟาดหน้าคอมฯครบ 6 เครื่องตลอดเวลา ห้ามหลุดเด็ดขาด! (requires 6 instances running at all times)"**
คุณมีอาวุธตั้งตึกเซิร์ฟเวอร์หว่านกระจาย 3 โซน (3 AZs: a, b, c)
คำถามท้าทายตรรกะ: ทายซิว่า ท่าไหนบ้างที่ **ถ้ามีพายุไซโคลนพัดถล่ม "ตึกไหนก็ได้ตึกนึงบึ้มหายวับไปกับตา 1 AZ (any single AZ down)"** แกจะยังมีพละกำลังเหลือ "รอดตายแตะยอดฝาเบียร์ก๊อก 6 เครื่อง 100% (fault tolerance)" บ้าง?!! 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: เล่นวิชาเลขประยุกต์ธรรมดา! เอามือปิดไปสัก 1 โซน (สมมติระเบิดหายไป) แล้วดูลำไส้ประชากรเครื่องที่เหลือว่า "รอดตายทะลุยอด **`>= 6 เครื่อง`** รึเปล่า?" (ต้องทำใจแข็งปิดทีละโซนทดสอบนะ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] [3, 3, 3] = eu-east-2a with three EC2 instances, eu-east-2b with three EC2 instances, and eu-east-2c with three EC2 instances**
- **ทำไมถึงถูก:** ลองจำลองลบทีละอัน: ถ้าตึก a ระเบิด (-3)... เหลือ b(3) + c(3) = 6 เครื่องรอด!! (ผ่านเป๊ะ), ถ้าตึก b บึ้ม เหลือ a+c ก็ = 6.. ดังนั้นกระจาย 3-3-3 คือมงลง!

✅ **[ถูกต้อง] [6, 6, 0] = eu-east-2a with six EC2 instances, eu-east-2b with six EC2 instances, and eu-east-2c with no EC2 instances**
- **ทำไมถึงถูก:** ตรรกะกระสอบทราย: ถ้าตึก a ไฟไหม้บึ้ม (-6)... อย่าตกใจ แกยังมีตึก b สแตนบายหนาบึกอีก 6 เครื่อง = 6 เครื่องรอดเฉย!! , แล้วถ้าตึก c บึ้ม? (มันศูนย์เครื่องแต่แรก) ก็ชิวๆ รอดสิฮะ 12 เหลือเฟือ

❌ **[ผิด] [4, 2, 2] , [2, 4, 2] , [2, 2, 2]**
- **ทำไมถึงผิด:** ลองจำลองหวยออกโง่ๆ: ถ้าคุณวาง **4-2-2** แล้ววันซวยตึก a (ตึก 4 เครื่อง) โดนบึ้มล้มตายบ่อ... คุณจะซวดเซง่อยลงเหลือแค่ 2+2 = 4 เครื่อง! ซึ่งแม่งต่ำกว่าความต้องการสัญญา (ล้มหายตายจาก 6 จ้า! สอบตก ไม่รอด 100%)
- **2-2-2**: นี่ก็งกเกิน บึ้มทีนึงเหลือแค่ 4 เจ๊งพังทั้งย่าน 

---
---

## 📌 คำถามที่ 6
**โจทย์:**
A company is looking to store its confidential financial files in AWS, which are accessed every week. The Architect was instructed to set up the storage system, which uses envelope encryption and automates key rotation. It should also provide an audit trail that shows who used the encryption key and by whom for security purposes.

Which combination of actions should the Architect implement to satisfy the requirement in the most cost-effective way? (Select TWO.)

**ตัวเลือก:**
- [x] Use Amazon S3 to store the data.
- [x] Configure Server-Side Encryption with AWS KMS Keys (SSE-KMS).
- [ ] Configure Server-Side Encryption with Customer-Provided Keys (SSE-C).
- [ ] Configure Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3).
- [ ] Use Amazon S3 Glacier Deep Archive to store the data.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทจะหอบ "ไฟล์การเงินโคตรลับที่สุดในโลก (confidential financial files)" มาแอบแช่ใน AWS โดยมีวิธีกินคือ **"แวะมาล้วงข้อมูลดมทุกสัปดาห์ (accessed every week)"**
บวชชีพราหมณ์กางยันต์คุ้มกันความปลอดภัยระดับ 10 กะโหลก:
1. การเข้ารหัสแบบซ้อนทับ (envelope encryption)
2. ปั่นสลับสับเปลี่ยนกุญแจให้ออโต้ (automates key rotation)
3. **ที่สำคัญที่สุด: ดักจับแกะรอยได้ว่าไอ้อีหน้าไหนแอบไขกุญแจห้องบ้าง! (audit trail that shows who used the encryption key)**
คำถาม: งัดเวทมนต์ AWS ตัวไหนมาสู้ให้คุ้มค่าสุด (งบน้อย) ??? (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: เก็บไฟล์แวบมาอ่าน "ทุกสัปดาห์ (every week)" = อย่าไปซุกในถ้ำแช่แข็งอมตะ Glacier เด็ดขาด (เบิกทีมีจ่ายหลังอาน)! ต้องเลือกห้องธรรมดา **`Amazon S3`** เท่านั้น!
- ทริค 2: ระบบกุญแจเทพประทานที่มีฟาร์มระบบ "กล้องวงจรปิดจับผู้ร้ายรอยนิ้วมือสแกนลายนิ้วมือ **(Audit trail ใครไขกุญแจบ้างผ่าน CloudTrail)**" = โดดเด่นสุดยอดในปฐพีมีเพียงอันเดียวคือเวทมนต์รหัส **`SSE-KMS`** จ้าหลาน!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon S3 to store the data.**
- **ทำไมถึงถูก:** ของมันต้องมี! โยนไฟล์ลงบ่อ `S3` เบสิกมาตรฐาน เนื่องจากต้องดึงมาดูทุกอาทิตย์ มันใช้ตระกูลสแตนดาร์ดถือว่าตอบโจทย์ชีวิตชิลๆ ได้

✅ **[ถูกต้อง] Configure Server-Side Encryption with AWS KMS Keys (SSE-KMS).**
- **ทำไมถึงถูก:** พระเอกสุดๆ! กุญแจเวียน `SSE-KMS` มีฟีเจอร์เด่นระดับเพชรยอดมงกุฎที่ไม่มีใครก๊อปได้คือ "มันทิ้งร่องรอยคราบอสุจิ (Audit Trail) ให้ทีมบอร์ดผู้บริหารกระชากหน้ากากแฉแง้มผ่าน CloudTrail ได้ตลอดเวลาว่า ไอ้มืดนาย A แอบเอาบัตรกุญแจมากระตุกเปิดโหลดไฟล์นี้ไปตอน 3 ทุ่ม!"

❌ **[ผิด] Use Amazon S3 Glacier Deep Archive to store the data.**
- **ทำไมถึงผิด:** เอากาวตาช้างดม! กฎเหล็กของสุสานหมีขั้วโลก `Glacier Deep Archive` มันหมกของดองไว้นานนับทศวรรษเพื่อลดราคา ถ้าคุณหิวอยากไปจุ๊บมัน **"ทุกสัปดาห์ (every week)"** คุณหน้ามืดจมกองค่าเบิกไฟล์แตกพ่ายแน่นอน ไม่ตรงโจทย์จ้า

❌ **[ผิด] Configure Server-Side Encryption with Amazon S3-Managed Keys (SSE-S3).**
❌ **[ผิด] Configure Server-Side Encryption with Customer-Provided Keys (SSE-C).**
- **ทำไมถึงผิด:** กุญแจผีบ้านนอก! อีสองตัวนี้ (SSE-S3 ของแจกฟรี กับ SSE-C ถือกุญแจมาเอง) ล้วนแล้วแต่ **"ไม่มีระบบกล้องวงจรปิดตามเช็คบิลประวัติใครแอบไขกุญแจ (No Audit Trail)"** โจรงัดรูกุญแจไปแอบดู คุณก็จับขโมยไม่ได้! ตกสเปซบอสกระจาย

---
---

## 📌 คำถามที่ 7
**โจทย์:**
A solutions architect is tasked with designing a scalable infrastructure solution for a business that runs uses Amazon Elastic Kubernetes Service (Amazon EKS) to execute container applications. Since the company's workload varies throughout the day, they want to make sure that its underlying infrastructure automatically scales in and out in response to demand.

Which of the following would meet the requirements with the LEAST amount of operational overhead?

**ตัวเลือก:**
- [x] Use a combination of Kubernetes Metrics and Kubernetes Cluster Autoscaler to manage the number of nodes.
- [ ] Use Amazon EC2 Auto Scaling Groups with custom scaling policies to manage the scaling of EKS worker nodes.
- [ ] Integrate an edge-optimized API endpoint in Amazon API Gateway...
- [ ] Set up CloudWatch alarms for CPU utilization or request count...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเสพบรรจุภัณฑ์หอยทากใช้ **`Amazon EKS (Kubernetes)`** แบกแอปคอนเทนเนอร์ 
ปัญหาชีวิต: สวิงบ้าเลือดกลางวันยอดพุ่งทยาน กลางคืนผีหลอก (workload varies)
ปรารถนา: บอสอยากให้รากฐานเครื่องจักรมัน "โยกย้ายขยายหดตัวพองโตยุบแฟบได้เองอัตโนมัติตามบุญกรรม (automatically scales in and out in response to demand)" 
คำถาม: ท่ายากสอยคางอันไหนแกะเกามันส์สุด แถมขี้เกียจนั่งเฝ้าปั้นโค้ดประยุกต์น้อยที่สุด (LEAST amount of operational overhead) ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: เมื่อคุณถวายตัวผูกมัดในลัทธิยักษ์ใหญ่แพยอร์ช **`Kubernetes (EKS)`** อย่าไปใช้ไอ้เครื่องมือบ้าบอหน้าโง่ของฝั่ง EC2 (EC2 Auto Scaling)... ให้ใช้ของแสลงขิงแชมป์โลหิตแท้ๆ ของชาวเรือ K8s นั่นคือเมนูเวทมนต์ **`Kubernetes Cluster Autoscaler (ตัวสเกลโหนดของ K8s โดยตรง)`** ! รับรอบว่าฟินสุดจั๊กจี้!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use a combination of Kubernetes Metrics and Kubernetes Cluster Autoscaler to manage the number of nodes.**
- **ทำไมถึงถูก:** เทพบุตรคู่ขวัญ! การพึ่งพา `Kubernetes Metrics (วัดหอยทาก)` ไปกระตุ้นยื่นซองขาวให้ `Kubernetes Cluster Autoscaler` ช่วยสเกลงอกเครื่องเซิร์ฟเวอร์ มันเป็นดีเอ็นเอเดียวกันแท้ 100% เลยทำให้การยืดหดของโหนด K8s ไหลลื่นและแอดมินแทบกระดิกเท้ารอเฉยๆ (Least overhead ที่แท้ทรู)

❌ **[ผิด] Use Amazon EC2 Auto Scaling Groups with custom scaling policies to manage the scaling of EKS worker nodes.**
- **ทำไมถึงผิด:** เอากาวแปะฝาท่อ! ฝั่ง `Amazon EC2 Auto Scaling Group` มันตาบอด! มันไม่รับรู้สภาวะกระเปาะหอยในจักรวาล Kubernetes ว่ามันเบียดเสียดกันแค่ไหนหรอกฮะ ถ้าคุณจะปล้ำตั้งค่า custom policies ให้มันอ่าน K8s ได้มึงต้องเหนื่อยรากเลือดปั้นโค้ดเองตายสลบ (Overhead บานเบอะ)

❌ **[ผิด] Set up CloudWatch alarms for CPU utilization...**
- **ทำไมถึงผิด:** หวังพึ่งโชคชะตาอย่างเดียว! `CloudWatch alarms` มันได้แค่จ้องมองกราฟร้องวู้วหวา(Monitor) แต่มันไม่มีแขนมีขาไปงอกเซิร์ฟเวอร์สเกลขยายเองได้นะว้อย (ไม่ได้ชี้เป้าเครื่องมือไปสเกลเลย)

❌ **[ผิด] Integrate an edge-optimized API endpoint in Amazon API Gateway...**
- **ทำไมถึงผิด:** ไม่ได้เกี่ยวอะไรกับสเกลเครื่อง! พี่แกมาขายตรง `API Gateway (หน้าประตูด่านรับยันต์ลูกค้า)` ซึ่งมันแค่แก้เรื่องเส้นทางเน็ต/API.. ไม่ได้ทำให้เซิร์ฟเวอร์ปั้นเครื่องปูดเพิ่มขึ้นแม้แต่นิ้วร้อย

---
---

## 📌 คำถามที่ 8
**โจทย์:**
A hospital has a mission-critical application that uses a RESTful API powered by Amazon API Gateway and AWS Lambda. The medical officers upload PDF reports to the system which are then stored as static media content in an Amazon S3 bucket.

The security team wants to improve its visibility when it comes to cyber-attacks and ensure HIPAA (Health Insurance Portability and Accountability Act) compliance. The company is searching for a solution that continuously monitors object-level S3 API operations and identifies protected health information (PHI) in the reports, with minimal changes in the existing Lambda function.

Which of the following solutions will meet these requirements with the LEAST operational overhead?

**ตัวเลือก:**
- [x] Use Amazon Textract to extract the text from the PDF reports. Integrate Amazon Comprehend Medical with the existing Lambda function to identify the PHI from the extracted text.
- [ ] Use Amazon Textract with the StartDocumentTextDetection API operation to extract text from PDF reports. Analyze the extracted data with a custom-built PHI detection algorithm within the Lambda function.
- [ ] Use Amazon Textract Medical with PII redaction turned on... Create a new Lambda function that calls the regular Amazon Comprehend API to identify the PHI...
- [ ] Use Amazon Transcribe to read and analyze the PDF reports using the StartTranscriptionJob API...

---
### 🎯 โจทย์ต้องการอะไร?
โรงพยาบาลมีแอปฯ ถึกทนที่หมอพยาบาลสุดเลิฟคอย **อัปโหลด "ไฟล์ผลตรวจคนไข้ (PDF reports)"** โยนทิ้งลงบ่อ S3
ทีมซื่อบื้อแอดมินความปลอดภัยระแวงตูด: อยากเช็คว่าในสลิปผลตรวจ **"อุตริหลงลืมถอดชื่อคนไข้เลขบัตรประชาชนตูดหมึกติดมาด้วยมั้ย? (identifies protected health information: PHI)"** แต่อยากแก้ไขโค้ด `Lambda function` อันเก่าน้อยสุด (lazy ชิบเป๋ง)
คำถาม: งัดยาวิเศษเทพตระกูล AI ตัวไหนมาสิงร่าง เพื่อลอกตากรองหาข้อมูลคนไข้หลุดโลก (PHI) อย่างเซียนและไม่ต้องดัดแปลงเยอะ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ต้องงัดแงะแกะตัวอักษรออกจากรูปสลักไฟล์ **`"PDF/รูปภาพ"`** = ยอดนักแกะตาเพชรมีเพียงหนึ่งเดียวคือ **`Amazon Textract`**!
- ทริค 2: สแกนกวาดสายตาหาตัวเลขความลับสวรรค์เช่น **"ข้อมูลผู้ป่วยคนไข้ยาโรคจิต (Protected Health Information - PHI) + มาตรฐานฝรั่ง HIPAA"** = หมอผีส่องอารมณ์ฉบับอัพเกรด **`Amazon Comprehend Medical`** ชงชามาให้โดยเฉพาะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon Textract to extract the text from the PDF reports. Integrate Amazon Comprehend Medical with the existing Lambda function to identify the PHI from the extracted text.**
- **ทำไมถึงถูก:** คอมโบฟ้าผ่าหมอผี! ก้าวแรกโยนแฟ้มแสกนตาบอด PDF ให้ `Textract` ควักลูกตาลอกตัวกระดุ๊กกระดิ๊กออกมาก่อน จากนั้นส่งก้อนอักษรไปยัดปากหมอดูสุดขลังรุ่นกาวทิพย์ `Comprehend Medical` ที่พี่มันเสกมาตรวจหาโรค/ยา/ชื่อคนไข้ (PHI) ได้สว่างโร่! แอดมินฟินน้ำตาพรั่งพรูเพราะจับแปะโค้ดชิลๆ ลง Lambda เดิม ไม่ต้องเทรน AI เหี้ยไรเองสักแอ๊ะ

❌ **[ผิด] Analyze the extracted data with a custom-built PHI detection algorithm within the Lambda function.**
- **ทำไมถึงผิด:** เอ้าเจริญพร! จะให้แอดมินโรงบาลมานั่งสุมหัว "เขียนสูตรโค้ดอัลกอริทึมแหกตาประดิษฐ์ขึ้นมาเอง (custom-built PHI detection)" โอ๊ยๆ กว่าบัคจะหายโจรแฮกหลุดลุ่ยหมดแล้วมั้ง (ขัดโจทย์ที่บอกเอาเหนื่อยน้อย LEAST overhead สุดๆ)

❌ **[ผิด] Use Amazon Textract Medical with PII redaction turned on...**
- **ทำไมถึงผิด:** โดนสับขาหลอก! 1. โลกนี้ไม่มีชื่อบริการกวางเรนเดียร์ `Amazon Textract Medical` ซะหน่อยจ้า มั่ว! 2. ไปจ้างหมอดูหน้าโง่ `(Amazon Comprehend)` ธรรมดาแทนหน้าไฮโซ `(Comprehend Medical)` ยิ่งพินาศ เพราะเวอร์ชั่นธรรมดามันแยกประเภทข้อมูลโรงพยาบาลลึกดิ่งไม่ได้ฮะ 

❌ **[ผิด] Use Amazon Transcribe to read and analyze the PDF reports...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `Amazon Transcribe` มีหน้าที่ "นั่งอมไมค์ฟังเสียงคนมาพิมพ์แชทแกะเทปเสียง (Speech-to-text)" มันเอาไปยัดแฟ้มกระดาษ PDF แล้วหวังให้มันแกะมาได้ม้ายยย ไอ้บร้า!

---
---

## 📌 คำถามที่ 9
**โจทย์:**
In this scenario, which of the following is true about Amazon EBS volume types and their respective usage? (Select TWO.)

**ตัวเลือก:**
- [x] Provisioned IOPS volumes offer storage with consistent and low-latency performance, and are designed for I/O intensive applications such as large relational or NoSQL databases.
- [x] Magnetic volumes provide the lowest cost per gigabyte of all EBS volume types and are ideal for workloads where data is accessed infrequently, and applications where the lowest storage cost is important.
- [ ] Spot volumes provide the lowest cost per gigabyte of all EBS volume types and are ideal for workloads where data is accessed infrequently...
- [ ] General Purpose SSD (gp3) volumes with multi-attach enabled offer consistent and low-latency performance, and are designed for applications requiring multi-az resiliency.
- [ ] Single root I/O virtualization (SR-IOV) volumes are suitable for a broad range of workloads...

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมาลองภูมิโปรแกรมเมอร์ต๊อกต๋อย: "ถกเถียงเรื่อง **ประเภทของฮาร์ดดิสก์แบบแปะตูดติดเครื่อง (Amazon EBS volume types)** หน่อยซิ"
คำถาม: กฎกติกามหาอำนาจข้อไหนกล่าวถูกต้องติงนังเกี่ยวกับประเภท EBS ลูกรัก ??? (เลือกหยิบ 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: สุดปังเทพเจ้าสายเปย์ ความไวแสง ทุบตีตบตีหนักขยี้รัวๆๆ (I/O intensive อัดฐานข้อมูลยักษ์ Database NoSQL) = ยกขันหมากให้สายซิ่ง **`Provisioned IOPS (SSD) (ตระกูล io1, io2)`** 
- ทริค 2: ยาจกผีปอบจอมประหยัดของตายไม่ค่อยแตะ (infrequent/lowest cost) ถ้าเป็นสายยุคกรุงศรีอยุธยาปู่ย่าก็คือ **`Magnetic (HDD)`** ถือว่าถูกสุดติ่งในช็อยต์นี้!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Provisioned IOPS volumes offer storage with consistent and low-latency performance, and are designed for I/O intensive applications such as large relational or NoSQL databases.**
- **ทำไมถึงถูก:** พูดดีมีสกุลรุนชาติ! ท่องเป็นคาถาสอบเลยว่า ฮาร์ดดิสก์ตระกูลกุสิก `Provisioned IOPS (io1, io2)` เกิดมามีปีกบินเหมาะสำหรับอุ้มบอสฐานข้อมูลยักษ์ฉีกทึ้งหฤโหด (I/O intensive applications) ทนทานเหยียบมิดสปีดไม่ตกเป๊ะๆ

✅ **[ถูกต้อง] Magnetic volumes provide the lowest cost per gigabyte of all EBS volume types and are ideal for workloads where data is accessed infrequently...**
- **ทำไมถึงถูก:** ตระกูลจานหมุนโบราณยาจก! `Magnetic volumes` หรือ Standard HDD เป็นของยุคตกกระป๋องที่ถูกที่ซู้ดดด เหมาะซุกขยะแฟ้มที่ไม่ค่อยเหลียวแลแวะไปดม (แต่โจทย์ข้อสอบเก่ายังถือว่าช็อยต์นี้ถูกอยู่นะจ๊ะ)

❌ **[ผิด] Spot volumes provide the lowest cost per gigabyte...**
- **ทำไมถึงผิด:** เอ้าแหกตาดูโลก! บนจักรวาล AWS มีบริการ "เครื่องเช่ายาจก `Spot Instances`" ก็จริง... แต่ไม่มีใครหน้าโง่มีบริการขาย "ฮาร์ดดิสก์เร่ร่อน `Spot volumes`" เด้อ! มโนชื่อสินค้ายอดเยี่ยมตกขวดไปดิ!

❌ **[ผิด] General Purpose SSD (gp3) volumes with multi-attach enabled... are designed for applications requiring multi-az resiliency.**
- **ทำไมถึงผิด:** มโนลึกจนเพ้อเจ้อ! 1. สกิลแยกร่างเสียบปลั๊กมัลติทัชทะยาน `(Multi-attach)` มีสงวนไว้สำหรับลูกเทพผู้ดี `io1 / io2 (Provisioned IOPS) เท่านั้นนะ gp3 ของชนชั้นกลางใช้ไม่ได้เว้ย!` 2. Multi-attach มันเสียบจิ้มข้ามAZ (multi-AZ) ไม่รอดนะจ๊ะ ลูกโซ่สั้นมันกระจุกอยู่แค่AZตัวเองเท่านั้นแหละ

❌ **[ผิด] Single root I/O virtualization (SR-IOV) volumes are suitable for a broad range of workloads...**
- **ทำไมถึงผิด:** จับแพะชนท่อไอเสีย! ไอ้วิชาพลังจิต `SR-IOV` เค้าเอาเป็นเคล็ดวิชาติดการ์ดแลนไฮสปีด (Enhanced Networking แบบ ENA) เค้าไม่เอามาเรียกเป็นชื่อฮาร์ดดิสก์บั้นท้าย EBS นะพ่อคุณ หลอกเด็กประถมเหอะ!

---
---

## 📌 คำถามที่ 10
**โจทย์:**
A financial services organization is developing a cloud-native application on AWS to process and analyze customer transaction data. The application utilizes Amazon Aurora for the database, Amazon EFS for file storage, and Amazon EventBridge to trigger AWS Step Functions for workflow orchestration.

The organization has implemented AWS IAM Identity Center for user authentication. The data science, engineering, and compliance teams require secure access to Amazon Aurora and Amazon EFS while maintaining strict data privacy standards. The solution must adhere to the principle of least privilege and minimize administrative overhead.

Which approach best satisfies these requirements?

**ตัวเลือก:**
- [x] Enable the IAM Identity Center with an Identity Center directory and create permission sets for granular access for Amazon Aurora and Amazon EFS. Assign teams to groups linked to specific permission sets based on their roles.
- [ ] Set up AWS Control Tower to manage multi-account access. Use Service Control Policies (SCPs) to restrict access to Aurora and EFS at the organizational level. Create IAM roles in each account... 
- [ ] Use Amazon Cognito User Pools for authentication and use Cognito Identity Pools to provide temporary AWS credentials...
- [ ] Create separate AWS accounts for each team using AWS Organizations. Set up cross-account IAM roles with least privilege and assign specific...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทบัตรเครดิตสายโหด ใช้ระบบปั่นวิเคราะห์ข้อมูลธุรกรรมบน **Aurora + EFS**
ระบบเช็คบัตรปชช. พนักงานตอนนี้ฝังฝากความนพเก้าไว้ที่ศูนย์กลาง **`AWS IAM Identity Center (อดีต AWS SSO)`**
เป้าหมายแสนเหี้ยม: พนักงานแบ่งก๊ก 3 แก๊ง (Data science / Engineering / Compliance) ต้องการเจาะลงเรือนไปเสพข้อมูลแบบเป๊ะๆ แต่ละก๊กสิทธิ์ไม่เท่ากันเลย (Principle of least privilege)
คำถาม: ดมกาวพ่นเวทมนต์ร่ายออปชันแบบไหน ให้แจกบัตรคิวเข้าห้องส้วมห้ามแย่งกันได้เนียนที่สุด แถมบริหารจัดการง่ายแสนเข็น (minimize administrative overhead) ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: "ผีสางเทวดายังไง ถ้าองค์กรคุณหันไปก้มกราบศาลเจ้า **`IAM Identity Center`** แล้ว... กฎหมายแผ่นดินบัญญัติไว้ว่า ท่าไม้ตายที่สอดคู่ซวบกันสวรรค์ประทานที่สุด คือการฉีกยันต์เสกตะกรุด **`Permission Sets`** (ตะกรุดห้ามเข้า-ออก) แล้วจับพนักงานยัดใส่เป็น **`แก๊งขี้เมา (Groups)`** ซะ!" = ง่ายกางปีกรวดเดียวจบ บันเทิงสุเดช!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable the IAM Identity Center with an Identity Center directory and create permission sets for granular access for Amazon Aurora and Amazon EFS. Assign teams to groups linked to specific permission sets based on their roles.**
- **ทำไมถึงถูก:** นี่คือวิถีแห่งเต๋าฉบับตำราเจี๊ยะเป๊ะๆ! เนื่องจากบ้านนี้ใช้ระบบ `IAM Identity Center` อยู่แล้ว วิธีเบสิกสุดขั้วคือ ไปถกแขนเสื้อชงกาแฟสร้างแพคเกจ "ยันต์ศักดิ์สิทธิ์ (Permission sets)" (เช่น ยันต์ A ส่อง EFS ได้ ยันต์ B ทิ้งบอมบ์ Aurora ได้) จากนั้นตลบตะแลงจัดตั้ง "แก๊งมังกรหยก (Groups)" แล้วผูกยันต์ให้แก๊งแต่ละแก๊ง (Role-based access) แอดมินหลับตาจิ้มคลุมกำเนิดได้รวดเร็วทันใจ ตอบโจทย์ least privilege สุดๆ

❌ **[ผิด] Set up AWS Control Tower... Use Service Control Policies (SCPs) to restrict access to Aurora and EFS at the organizational level.**
- **ทำไมถึงผิด:** เอามีดสปาร์ต้าไปหั่นหัวหอม! `Control Tower และ SCP` เป็นด่านตรวจระดับคลุมหลังคาตึกประเทศ (Organizational level) เวลาห้ามทีนึงแม่มดตัดสิทธิ์เกลี้ยงบัญชี มันหยาบกระด้างเกินกว่าจะก้มลงมาล้วงสแกนก้นเจาะรูเป๊ะๆ แบบห้ามเครื่องนั้นเครื่องนี้ (Granular fine-grained access) อย่างที่บอสอยากได้ฮะ

❌ **[ผิด] Use Amazon Cognito User Pools for authentication and use Cognito Identity Pools...**
- **ทำไมถึงผิด:** ทุบศาลพระภูมิเก่าทิ้งซะงั้น! ก็โจทย์อุตส่าห์สะกิดเตือนไว้แล้วว่า "ตูข้าก้มหัวใช้เมนูศูนย์รวม `AWS IAM Identity Center` อยู่แล้วนะเว้ย!" คุณจะบ้าเลือดอ้าปากกระโจนไปปั้นศูนย์ใหม่เตะชิงถ้วยอย่าง `Amazon Cognito` ให้เหนื่อยตับแหกทำไมน้อ (แถมสวิงผิดเป้าจากแนวแอพเอนเทอร์ไพรซ์ไปฝั่งแอปมือถืออีกตังห่าง)

❌ **[ผิด] Create separate AWS accounts for each team using AWS Organizations...**
- **ทำไมถึงผิด:** แก้ปัญหาล้านเจ็ดเกินเบอร์เว่อร์วัง! จะบ้ามั้ยแค่พนักงาน 3 แก๊งแหกคอกตีกัน "คุณเจือกบ้าจี้สั่งงอกบัญชี Account ผีปอบแยกประเทศให้แต่ละแก๊งซะเลย!!" อือหือ.. คราวนี้แอดมินวิ่งข้ามประเทศเซ็นปั๊มตรากระอักเลือดตายห่าเลยคับ (Administrative overhead พังกระจาย ไม่ผ่านๆ)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 2: ข้อ 11 - 20)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 11
**โจทย์:**
A media company is using Amazon EC2, ELB, and S3 for its video-sharing portal for filmmakers. They are using a standard S3 storage class to store all high-quality videos that are frequently accessed only during the first three months of posting.

As a Solutions Architect, what should you do if the company needs to automatically transfer or archive media data from an S3 bucket to Glacier?

**ตัวเลือก:**
- [x] Use Lifecycle Policies
- [ ] Use a custom shell script that transfers data from the S3 bucket to Glacier
- [ ] Use Amazon SQS
- [ ] Use Amazon SWF

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทแชร์วิดีโอเก็บไฟล์ลง S3 ธรรมดา (Standard) ซึ่งวิดีโอจะฮิตคนดูเยอะแค่ช่วง 3 เดือนแรกเท่านั้น
เป้าหมาย: อยากหาวิธี **"ย้ายไฟล์หรือดองไฟล์ (archive) จากบ่อ S3 ลงสุสานน้ำแข็ง Glacier แบบอัตโนมัติ (automatically transfer)"** เมื่อหมดความนิยม

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของตายแจกคะแนน! คำว่า "ย้ายไฟล์ S3 อัตโนมัติไปยังอีก Class (เช่น ไปตู้เย็น Glacier หรือสั่งลบเมื่อหมดอายุ)" = ไม้ตายก้นหีบคือฟีเจอร์ **`Lifecycle Policies`** กฎวัฏจักรชีวิตของ S3 เท่านั้น! ตั้งค่าปุ๊บมันย้ายเองไม่ต้องง้อรันสคริปต์ให้เมื่อย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Lifecycle Policies**
- **ทำไมถึงถูก:** ตรงเป๊ะตามตำรา! `Lifecycle Policies` (กฎวัฏจักรชีวิต) คือตัวช่วยตั้งเวลาของ S3 เช่น สั่งว่า "ถ้าไฟล์วิดีโอนี้อายุครบ 90 วันเมื่อไหร่ ให้ถีบมันตกลงไปห้องแช่แข็ง Glacier ทันทีเพื่อประหยัดเงิน" เซ็ตครั้งเดียวจบ ทำงานออโต้!

❌ **[ผิด] Use a custom shell script that transfers data...**
- **ทำไมถึงผิด:** ขี่ช้างจับตั๊กแตน! การมานั่งเขียนโค้ด `shell script` ตั้งเวลาปลุก Cronjob มาดูดไฟล์ย้ายเอง มันเหนื่อยและเสี่ยงเด้งพังฮะ ในเมื่อ S3 เค้ามีเมนูกดติ๊กถูกออโต้ให้แล้วจะมาเขียนโค้ดเองทำไม!

❌ **[ผิด] Use Amazon SQS / Use Amazon SWF**
- **ทำไมถึงผิด:** มั่วซั่วสุดเกียร์! `SQS` เป็นคิวส่งข้อความ ส่วน `SWF` เป็นตัวจัดคิวงาน ไม่ได้หอยหลอดอะไรกับการย้ายไฟล์ข้ามถัง S3 เลยจ้า

---
---

## 📌 คำถามที่ 12
**โจทย์:**
A company has a web application hosted in an On-Demand EC2 instance. You are creating a shell script that needs the instance's public and private IP addresses.

What is the best way to get the instance's associated IP addresses which your shell script can use?

**ตัวเลือก:**
- [ ] By using a CloudWatch metric.
- [ ] By using a Curl or Get Command to get the latest user data information from http://169.254.169.254/latest/user-data/
- [ ] By using IAM.
- [x] By using a Curl or Get Command to get the latest metadata information from http://169.254.169.254/latest/meta-data/

---
### 🎯 โจทย์ต้องการอะไร?
คุณกำลังพ่นโค้ด `shell script` สั่งงานอยู่ "ภายใน" เครื่องเซิร์ฟเวอร์ `EC2` ตัวนึง
ภารกิจ: สคริปต์ของคุณดันอยากรู้ **"เบอร์ IP (public/private IP) ของตัวมันเอง"** เอามาใช้งาน
คำถาม: ท่ายากไหนที่จะควักเบอร์ IP ออกมาใช้อย่างสวยงามและเบสิกสุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ถ้าอยากส่องดูไส้ติ่งข้อมูลหรือสเปคเครื่องของตัวเอง (เช่น เบอร์ IP, ชื่อ Hostname, Instance ID) ให้วิ่งไปเรียก URL เทพเจ้า **`http://169.254.169.254/latest/meta-data/`**
- ทริค 2: ระวังโดนสับขาหลอกกับหน้ากาก **`user-data`** (อันนั้นคือสคริปต์โค้ดตั้งต้นตอนเปิดเครื่องใหม่ ไม่ใช่แหล่งเก็บเบอร์ IP!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] By using a Curl or Get Command to get the latest metadata information from http://169.254.169.254/latest/meta-data/**
- **ทำไมถึงถูก:** URL มนตราศักดิ์สิทธิ์ประจำสายตาแฮกเกอร์ AWS! รหัส `169.254.169.254` ตามด้วยก้นกระทะ `/meta-data/` คือจุดขุดทอง! คุณแค่สาดคำสั่ง `curl` เข้าไป มันจะพ่นข้อมูลลับของตัวเครื่อง เช่น IP, ขื่อเน็ตเวิร์ก ออกมาให้สคริปต์คุณเอาไปสูบกินต่อได้เลย 

❌ **[ผิด] ...get the latest user data information from http://169.254.169.254/latest/user-data/**
- **ทำไมถึงผิด:** โดนหลอกรูกุญแจ! แหล่งพัก `/user-data/` มันเอาไว้จดบันทึกหน้าตาโค้ด Bash script ที่เรายัดๆ ใส่ตอนหน้าจอเสกเครื่อง (Bootstrapping) ไม่ใช่ที่เก็บประวัติเบอร์ IP นะเว้ย!

❌ **[ผิด] By using a CloudWatch metric / By using IAM**
- **ทำไมถึงผิด:** คนละเรื่องเลย! `CloudWatch` เอาไว้วัดชีพจรกราฟสถิติ, ส่วน `IAM` เอาไว้แจกบัตรคิวรปภ. ไม่ได้ใช้สอยเอาเบอร์ IP มารันในสคริปต์แบบนี้

---
---

## 📌 คำถามที่ 13
**โจทย์:**
A company hosts all its applications on its data center on the US East Coast. Most of the workloads are legacy applications that are hosted on individual virtual machines running in Linux and Windows operating systems. The company plans to migrate all of its VM workloads to the AWS cloud. To minimize changes in the applications during the migration process, it has been decided that the company will use a “lift-and-shift” strategy. The company also wants to minimize downtime during the migration process.

Which of the following options should the Solutions Architect implement for this scenario?

**ตัวเลือก:**
- [ ] Utilize AWS DataSync to migrate the application workloads to AWS...
- [x] Install the AWS Replication Agent on each of the on-premises VMs to continuously replicate the servers to AWS. Use AWS Migration Service (AWS MGN) to launch test instances and perform cutover once testing is completed.
- [ ] Use the AWS Application Discovery Service for lift-and-shift migrations...
- [ ] Export the on-premises VMs and upload the images to an Amazon S3 bucket. Use VM Import/Export service to import the images...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทยุคหินมีโรงงานเซิร์ฟเวอร์เก่าเก็บ (on-premises VMs ทั้ง Linux, Windows) 
ต้องการ **"อพยพย้ายสลัมทั้งหมดทะยานขึ้นสวรรค์ AWS"** แบบวิธีมักง่ายที่สุดคือ **"ยกเครื่องขึ้นมาโยนแปะหน้าตาเฉย (lift-and-shift)"** ไม่ต้องรื้อแก้โค้ดเลย (minimize changes) 
ที่สำคัญ: ตอนโยกย้าย ต้อง **หยุดชะงักระบบให้น้อยที่สุด (minimize downtime)!!**
คำถาม: งัดเครื่องมือ AWS เครื่องไหนมาสูบวิญญาณเซิร์ฟเวอร์ขึ้นสวรรค์ดี ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ได้ยินคำว่า "อพยพเซิร์ฟเวอร์แบบมักง่ายสุดๆ ยกมาทั้งก้อน (lift-and-shift) + ยันต์กันเหนียวหักดิบน้อยสุด (minimize downtime)" = สวรรค์โปรดประทาน **`AWS Application Migration Service (AWS MGN)`** (อภิมหาเครื่องดูดวิญญาณ CloudEndure ยุคใหม่) เพราะมันตีคู่กันซิงค์แบบดึงสดๆ เนียนกริบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Install the AWS Replication Agent... Use AWS Migration Service (AWS MGN) to launch test instances and perform cutover...**
- **ทำไมถึงถูก:** คอมโบไม้ตายเทพ! โยนลูกสมุนแมลงป่อง `AWS Replication Agent` ไปเกาะหลังเครื่องชาวบ้าน (on-prem) มันจะงอกรากสปอร์ค่อยๆ ดูดข้อลอกก๊อปปี้ไปโผล่ที่ AWS แบบไหลลื่นตลอดเวลา (continuous replication) พอดูดเสร็จก็แค่กดปุ่ม `Cutover` (สับสวิตช์) เครื่องเก่าดับ เครื่องใหม่ไฟสว่างแว้บ! แทบไม่กระพริบตา (minimum downtime)!

❌ **[ผิด] Export the on-premises VMs and upload the images... Use VM Import/Export service...**
- **ทำไมถึงผิด:** ท่าขี้เกียจของยุคมืด! การที่คุณนั่งเอาเมาส์จิ้ม Export เครื่องเป็นไฟล์ก้อนอ้วนๆ แล้วแบกใส่หลังเรือไปโยนใส่ S3 กว่าจะ Import เสร็จ (VM Import/Export) เครื่องต้นทางคนใช้แอปปาไข่ปาขวดเบียร์ตายข่าพอดี (Downtime ยาวนานหน้ามืดมัวดิน ไม่เนียนเลยเว้ย)

❌ **[ผิด] Utilize AWS DataSync to migrate the application workloads...**
- **ทำไมถึงผิด:** ห้าวจัด! `AWS DataSync` เกิดมาเพื่อขนส่งไม้สน **"ไฟล์ (Files/Folders)"** ดิบๆ แค่นั้น! มันไม่ได้มีสกิลลากวิญญาณระบบปฏิบัติการเซิร์ฟเวอร์ "ทั้ง VM (workloads)" เด้อ!

❌ **[ผิด] Use the AWS Application Discovery Service...**
- **ทำไมถึงผิด:** ผิดตำแหน่ง! `Application Discovery Service` เป็นแค่ **"กล้องส่องทางไกล"** เอาไว้นับเห็บหมาสำรวจว่าโรงงานคุณมีเซิร์ฟเวอร์กี่ตัว มันไม่ใช่เครื่องจักร "ขนย้าย" จริงๆ 

---
---

## 📌 คำถามที่ 14
**โจทย์:**
A startup plans to develop a multiplayer game that uses UDP as the protocol for communication between clients and game servers. The data of the users will be stored in a key-value store. As the Solutions Architect, you need to implement a solution that will distribute the traffic across a number of servers.

Which of the following could help you achieve this requirement?

**ตัวเลือก:**
- [x] Distribute the traffic using Network Load Balancer and store the data in Amazon DynamoDB.
- [ ] Distribute the traffic using Network Load Balancer and store the data in Amazon Aurora.
- [ ] Distribute the traffic using Application Load Balancer and store the data in Amazon RDS.
- [ ] Distribute the traffic using Application Load Balancer and store the data in Amazon DynamoDB.

---
### 🎯 โจทย์ต้องการอะไร?
สตาร์ทอัพทำเกมออนไลน์ยิงปืนฉะเดือด (multiplayer game) 
มีกฎฟิสิกส์ 2 ข้อ: 
1. ต้องสาดกระสุนจราจรแหลกแจกจ่ายโหลดผ่าน **"โปรโตคอลความไวแสง UDP"**
2. ส่วนตู้เซฟเก็บประวัติผู้เล่นต้องเป็นดาต้าเบสแบบ **"Key-value store"** (ของคู่กันแบบคีย์-ค่า)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: พอได้ยินคำว่า **`"โปรโตคอล UDP"`** = โหนสลิงข้ามกำแพงตัดช็อยส์ตัวเลือกที่ใช้ Application Load Balancer (ALB) ทิ้งไปให้หมด! เพราะ ALB มันรองรับแต่ HTTP/HTTPS ว้อย! ด่านหน้าสอย UDP ได้คือเทพหมีควาย **`Network Load Balancer (NLB)`** จ้า!
- ทริค 2: แหล่งเก็บของแบบ **`"Key-value store"`** (เช่น id: 1 -> name: "zaa") = ตำนารกอุดร NoSQL ทรงพลังคือ **`Amazon DynamoDB`**!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Distribute the traffic using Network Load Balancer and store the data in Amazon DynamoDB.**
- **ทำไมถึงถูก:** คอมโบเซราฟิม! ยืนยันหนักแน่นว่า `Network Load Balancer (NLB)` เป็นไอ้ต้าวถึกทน Layer 4 ยอมเปิดอกรับห่ากระสุน `UDP` ได้สบายแฮ! แล้วโยนชิ่งข้อมูลเข้าตระกร้า `DynamoDB` ที่เป็นอัครมหาเสนาบดีฝั่ง `key-value NoSQL` เป๊ะปังซูเปอร์ป๊อป!

❌ **[ผิด] Distribute the traffic using Network Load Balancer and store the data in Amazon Aurora.**
- **ทำไมถึงผิด:** ตกม้าตายตอนจบ! อุตส่าห์ดักหน้าด้วย NLB ถูกแล้ว.. แต่สะดุดขี้หมาดันไปเลือกศาลเจ้า `Amazon Aurora` ซึ่งเจ้านี่มันเป็นตระกูล **"Relational database (SQL Table ลิงก์ยุ่งเหยิง)"** ไม่ใช่ Key-value เด้อ!

❌ **[ผิด] Distribute the traffic using Application Load Balancer (ALB)...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! `ALB` มันคุยภาษาคน (Layer 7 / HTTP / HTTPS) มันไม่กระดิกหูฟังภาษายิงปืนดิบๆ อย่าง `UDP` ถ้ายัดเข้าไปคือบอทระเบิดทิ้งกระจายแต่หน้าประตูจ้า

---
---

## 📌 คำถามที่ 15
**โจทย์:**
An Auto Scaling group (ASG) of Amazon EC2 Linux instances has an Amazon FSx for OpenZFS file system with basic monitoring enabled in Amazon CloudWatch. The Solutions Architect noticed that the legacy web application hosted in the ASG takes a long time to load. After checking the instances, the Architect noticed that the ASG is not launching more instances as it should be, even though the servers already have high memory usage.

Which of the following options should the Architect implement to solve this issue?

**ตัวเลือก:**
- [x] Install the CloudWatch unified agent to the EC2 instances. Set up a custom parameter in AWS Systems Manager Parameter Store with the CloudWatch agent configuration to create an aggregated metric on memory usage percentage. Scale the Auto Scaling group based on the aggregated metric.
- [ ] Implement an AI solution that leverages Amazon Comprehend to track the near-real-time memory usage of each and every EC2 instance. Use Amazon SageMaker AI...
- [ ] Set up Amazon Rekognition to automatically identify and recognize the cause of the high memory usage. Use the AWS Well-Architected Tool to automatically trigger...
- [ ] Enable detailed monitoring on the EC2 instances of the Auto Scaling group. Use Auto Scaling with custom metrics to scale out the Auto Scaling group based on the aggregated memory usage...

---
### 🎯 โจทย์ต้องการอะไร?
ฝูงผึ้งรังเซิร์ฟเวอร์ `Auto Scaling Group (ASG)` ดันตีลังกาสั่นผับๆ โหลดเว็บอืดชักดิ้นชักงอ 
เจาะไปดูไส้ติ่งปรากฏว่า: **"แรมระเบิด (high memory usage)"** เครื่องจะพังแลนด์แล้ว! 
ไอ้เวรเอ๊ย แล้วทำไมระบบมันไม่ยอมเสกเครื่องใหม่มาช่วยกระจายโหลดล่ะ??!
คำถาม: งัดเวทมนต์วิชาไหน แก้ไขให้ระบบ ASG มันเห็นว่าแรมบวม แล้วขยายเครื่องตัวเองซะที ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: กฎข้อเหล็กม้าแห่ง AWS! ระบบหน้ามืด `CloudWatch` รุ่นเบสิก **"มันมองไม่ทะลุกะโหลกไปเห็นแรม (Memory/RAM)"** ของ EC2 หรอกนะ! มันเห็นแค่ CPU, Network, Disk. 
- ถ้าคุณอยากให้มันมองเห็น **Memory** = ต้องวิ่งไปถังส้วมควักยันต์สักยันต์ **`"Install CloudWatch unified agent (ตีตั๋วติดตั้งโปรแกรมเอเจนต์)"`** ซุกเข้าไปในรูตูดตัวเครื่องเท่านั้น ถึงจะดูดค่าแรม Custom metric ออกมาให้ ASG ผูกสายสอยลากเครื่องสเกลได้!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Install the CloudWatch unified agent to the EC2 instances. Set up a custom parameter in AWS Systems Manager Parameter Store... Scale the Auto Scaling group based on the aggregated metric.**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาว! เริ่มแรกจับป้อนวัคซีน `CloudWatch unified agent` หยดใส่ปาก EC2 ปุ๊บ มันจะปั๊มอ่านสถิติแรมในเครื่องได้ทันที แล้วใช้มุกเทพเก็บไฟล์ตั้งค่ารวบยอดใส่ Parameter Store ให้มันรวมสถิติกราฟส่งไปสะกิดปลุกผีลุก ASG ให้เบ่งเครื่องเพิ่ม คลีนสุดๆ

❌ **[ผิด] Enable detailed monitoring on the EC2 instances of the Auto Scaling group. Use Auto Scaling with custom metrics...**
- **ทำไมถึงผิด:** หลงทางจับกิ้งกือ! การเปิดโหมด `Detailed monitoring (ส่องถี่ขึ้น 1 นาที)` มันไม่ได้ไขกุญแจให้มองเห็น แรม (Memory) หรอกนะว้อย! ของที่ตาบอดมองไม่เห็นแต่แรก ต่อให้มึงส่องบ่อยถี่แค่ไหน มึงก็มองไม่เห็นอยู่ดี! (ถ้าไม่ลงไลเซนส์ agent ฝังก่อน)

❌ **[ผิด] Implement an AI solution that leverages Amazon Comprehend...**
- **ทำไมถึงผิด:** ดูดกาวเกินปริมาณ! `Comprehend` เป็นหมอดู AI แกะกล่องวิเคราะห์อารมณ์ภาษาคน (NLP) มึงจะเอามันไปส่องตูด "เซิร์ฟเวอร์แรมบวม" ไม่ได้ลูกกก!

❌ **[ผิด] Set up Amazon Rekognition... Use the AWS Well-Architected Tool...**
- **ทำไมถึงผิด:** เอากระทะฟาดหมา! `Rekognition` เอาไว้สแกนตรวจสอบสิวฝ้าหน้าคนบนรูปภาพจ้า! ไม่ได้เกี่ยวส้นตีนอะไรกับสแกนสถิติเครื่องคอมพิวเตอร์เลย ตลกคาเฟ่มากช็อยต์นี้!

---
---

## 📌 คำถามที่ 16
**โจทย์:**
An organization plans to use an AWS Direct Connect connection to establish a dedicated connection between its on-premises network and AWS. The organization needs to launch a fully managed solution that will automate and accelerate the replication of data to and from various AWS storage services.

Which of the following solutions would you recommend?

**ตัวเลือก:**
- [ ] Use an AWS Storage Gateway file gateway to store and retrieve files directly using the SMB file system protocol.
- [ ] Use an AWS DataSync agent to rapidly move the data over the Internet.
- [ ] Use an AWS Storage Gateway tape gateway to store data on virtual tape cartridges and asynchronously copy your backups to AWS.
- [x] Use an AWS DataSync agent to rapidly move the data over a service endpoint.

---
### 🎯 โจทย์ต้องการอะไร?
องค์กรลากสายเคเบิลมหาเทพ **`AWS Direct Connect (เชื่อมตึกเข้า AWS ดื้อๆ ท่อส่วนตัว)`** 
เป้าหมายความอยากได้: ปรารถนาหาไม้คทาวิเศษที่ "ปั้นง่ายโคตร (fully managed) เพื่อมา **สูบฉีดซิงค์ปั๊มข้อมูล (automate and accelerate the replication of data)** ข้ามไปมาหาบริการห้องเก็บของบน AWS" 
คำถาม: ท่ายากไหนลื่นปรี๊ดติดจรวดซิงค์ไฟล์ที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: หน้าที่หลักของกุลสตรีคือ "สูบข้อมูลก้อนโตๆ ยิงจรวดซิงค์อัตโนมัติ (automate and accelerate huge data transfer)" = แม่นยำที่สุดมีตัวเดียวคือ **`AWS DataSync agent`**
- ทริค 2: สังเกตดักควายว่า โจทย์ลงทุนเหมาเข่งขิงซื้อท่อฝังดินพรีเมียมส่วนตัว **`"Direct Connect"`** ไปแล้ว... ดังนั้นมึงห้ามเจือกวิ่งประจานตัวแก้ผ้าลอดผ่านถนนทางด่วนหลวงอย่าง "Internet" เด็ดขาด! ต้องมุดรูหนูส่วนตัวที่เรียกว่า **`"VPC service endpoint (หลุมดำส่วนตัว)"`** เท่านั้นถึงเจ๋งแจ๋วไร้คอขวด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an AWS DataSync agent to rapidly move the data over a service endpoint.**
- **ทำไมถึงถูก:** ต่อยมัดฮุกสลบ! `AWS DataSync` เก่งกาจเรื่องสูบซิงค์สเตียรอยด์วิ่งทะลุโซนิคข้ามเครื่องได้อยู่แล้ว แถมคุณรู้งานดันก้นเจิมมันลื่นลอดช่องทางบอบบางส่วนตัวด้วย "Service endpoint (ผ่านท่อ Direct Connect สายตรงดำดินไม่พึ่งเน็ตชาวบ้าน)" = เป็นสุดยอดนินจาคอมโบ!

❌ **[ผิด] Use an AWS DataSync agent to rapidly move the data over the Internet.**
- **ทำไมถึงผิด:** เสียดายตังค์ค่าสาย Direct Connect ม้ายยไอ้ตูดหมึก! อุตส่าห์จ่ายเงินซื้อสายตรงดำดินแล้ว มึงดันเสือกยิงสิง DataSync ให้วิ่งปีนขึ้นถนนหลวง `Internet` สาธารณะทำไมว้าา ความปลอดภัยเน่าเฟะพอดีฮะ!

❌ **[ผิด] Use an AWS Storage Gateway (file gateway / tape gateway)**
- **ทำไมถึงผิด:** หลงจิ้มผิดกะละมัง! `Storage Gateway` จุดประสงค์ของมันคือ "หลอกล่อให้คอมพิวเตอร์ที่โรงงานนึกว่ามันเสียบฮาร์ดดิสก์โง่ๆ ไว้ใต้โต๊ะ (Hybrid storage cache)" ไม่ได้เกิดมาติดจรวดแข่งซิงค์สูบข้อมูล (accelerate replication) สปีดเทพซ่าขนาดตัว DataSync เด้ออ 

---
---

## 📌 คำถามที่ 17
**โจทย์:**
A company has an Application Load Balancer (ALB) that accepts HTTP and HTTPS traffic on ports 80 and 443, respectively. Recently, the company associated a new domain for its website, and they want to ensure that all HTTP traffic for this new domain is automatically redirected to HTTPS to improve security.

Which ALB configuration should be done to satisfy the requirement?

**ตัวเลือก:**
- [x] Configure the existing HTTP listener to redirect traffic to port 443.
- [ ] Configure the existing on port 443 and add a redirect action to HTTP on port 80.
- [ ] Create a new ALB listener on port 443 and configure it to redirect HTTP traffic to HTTPS.
- [ ] Create a new HTTP listener on port 80 and add a redirect action to the HTTPS protocol on port 443.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทยืนด่านหน้ามีประตูรับแขก (ALB) ถึง 2 บาน คือ **พอร์ต 80 (HTTP เถื่อน)** และ **พอร์ต 443 (HTTPS เสื้อกันเกราะ)** เปิดต้อนรับไว้อยู่แล้ว
เพิ่งตั้งชื่อโดเมนใหม่สดๆ ร้อนๆ แล้วบอสสั่งเปรี้ยง: "ใครก็ตามที่ทะลึ่งเดินชนประตูเถื่อน **HTTP (80)**... จงถีบกระเด็นบิดข้อมือไล่ให้มันไปเข้าช่อง **HTTPS (443)** กันให้หมดนะโว้ยย!! (redirected to HTTPS)"
คำถาม: งัดวิธีตบบ้องหูตั้งค่า ALB ท่าไหนให้ถีบคนเนียนที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของตายที่มือใหม่ ALB ต้องเจอ! ถ้าของเดิมมีประตูรับพอร์ต 80 อ้าซ่าอยู่แล้ว วิธีเสกมนต์คือ "แก้ไขกฎกระชากหัว (Action rule)" ของอีประตู **`HTTP listener (port 80)` อันเดิมที่มีอยู่นั่นแหละ** ให้ปรับสวิตช์เป็นบอกว่า "หักเลี้ยวบังคับไหล (Redirect) ไปซุกร่อง Port 443 แทนนะจ๊ะ" = ขิงทีเดียวจบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the existing HTTP listener to redirect traffic to port 443.**
- **ทำไมถึงถูก:** ตรรกะเบสิกพระตั้งแผง! คุณเดินไปหาคุณตำรวจที่ยืนเฝ้า "ประตูเดิม (existing listener พอร์ต 80)" แล้วกระซิบใส่วอว่า "ลูกพี่ ใครหลงผ่านมาช่องนี้ พี่ถีบก้น (add Redirect action) ส่งปัดไปโผล่ช่อง 443 ให้หมดเลยนะ" เจ๋งเป้ง ง่าย สั้น จบ

❌ **[ผิด] Create a new HTTP listener on port 80 and add a redirect action...**
- **ทำไมถึงผิด:** เอ้า โง่งมแยกร่าง! ก็โจทย์มันบอกทนโท่อยู่แล้วว่าคุณ "มีประตู (HTTP 80) อยู่แล้ว (ALB accepts HTTP on 80)" มึงจะเสกช่างมารื้อตึก "สร้างประตูบานใหม่พอร์ต 80 เบิ้ลแฝด (Create new HTTP on 80)" ซ้อนทับกันสองบานได้ไงวะ ระบบพังชนกันพังยับตายพอดีฮะ

❌ **[ผิด] Create a new ALB listener on port 443 and configure it to redirect HTTP traffic to HTTPS.**
- **ทำไมถึงผิด:** ห้าวหน้าหลินทิพย์! ประตูศาลเจ้า 443 ก็เสือกมีอยู่แล้ว จะทะลึ่งสร้างประตู 443 เบิ้ลซ้ำทำแพะอะไร! แล้วประตู 443 มันมีไว้รับค่าย HTTPS แดนสวรรค์โว้ย ไม่ใช่ช่องรับคนบาปพอร์ต 80 จะมาเตะคนเข้าตรงนี้บ่ด้ายยย

❌ **[ผิด] Configure the existing on port 443 and add a redirect action to HTTP on port 80.**
- **ทำไมถึงผิด:** ตีลังกากลับหัว! เค้าสั่งให้ถีบคนบาปช่อง 80 ไปชุบตัวใส่เกราะช่อง 443... อีตัวเลือกนี้มึงดันหน้ามืดถีบคนใส่เกราะจาก 443 รูดเสาลงมาแกผ้าแก้แค้นไปอยู่เถื่อนช่อง 80 แทนเฉย! ปัญญาอ่อนตบกระโหลกแตกฮะ

---
---

## 📌 คำถามที่ 18
**โจทย์:**
A web application is hosted in an Auto Scaling group of EC2 instances deployed across multiple Availability Zones behind an Application Load Balancer. You need to implement an SSL solution for your system to improve its security which is why you requested an SSL/TLS certificate from a third-party certificate authority (CA).

Where can you safely import the SSL/TLS certificate of your application? (Select TWO.)

**ตัวเลือก:**
- [ ] An S3 bucket configured with server-side encryption with customer-provided encryption keys (SSE-C)
- [x] AWS Certificate Manager
- [ ] A private S3 bucket with versioning enabled
- [ ] CloudFront
- [x] IAM certificate store

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินบ้าเห่อกำใบประกาศศักดิ์สิทธิ์ตัวพรีเมี่ยม **"ยันต์ SSL/TLS Certificate (กุญแจเข้ารหัสHTTPS)"** ที่ประมูลซื้อหลุดลุ่ยไปอุดหนุนหาจากคนนอกมา **(Third-party CA)** 
เป้าหมายอยากซุกงำซ่อนตัว: ถามว่า "ข้าจะฝากหิ้วหงยันต์ใบนี้ เอากลับมายัดเก็บเซฟฝังดินไว้ในรูไหนของ AWS ดีน้าา ให้มันงัดออกมาแปะโชว์หน้าตึก (ALB) ได้เนียนกริบสุด?" (เลือก 2 ที่)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: สุดแสนขวัญใจประชาชน ดินแดนสรวงสวรรค์ที่เกิดมาเพื่ออมหุ้มเก็บกุญแจ SSL Certificate ดิบๆ คือ **`AWS Certificate Manager (ACM)`** เอาไว้เบิกแจกจ่ายให้ ALB ได้ชิลสุดๆ
- ทริค 2: สุสานบรรพบุรุษเก่าแก่คลาสสิก สมัยไดโนเสาร์ขี่ควายถ้า ACM เสือกเปิดบูธไม่ทัน คุณสามารถสไลด์โยนใบเซอร์ไปยัดลืมไว้ที่คลังสมบัติสำรอง **`IAM certificate store`** ตูดบี้ได้ด้วย!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Certificate Manager**
- **ทำไมถึงถูก:** พระมเหสีวังหน้า! `ACM` เกิดมามีหน้าที่สวมมงไว้เป็นสถานที่ "รับฝากตลับใบจดทะเบียน SSL" โดยตรง (และปั้นใบใหม่ให้ฟรีด้วยนะ) โยนของนอกเข้ามา Import พักไว้ที่นี่ปลอดภัยกางปีกร่มเย็นที่สุด

✅ **[ถูกต้อง] IAM certificate store**
- **ทำไมถึงถูก:** เติมช่องโหว่ตำนาน! ในอดีตกาลสมัยยังไม่มี ACM แจกฟรีแฉกๆ แอดมิน AWS ทั่วโลกเค้าจะต้องเสกยันต์นอกเอาคีย์ยัดฝังไว้ในซอกตูดปู่ทวด `IAM certificate store` กันทั้งนั้น! ซึ่งกติกา AWS มันบอกว่าตราบใดที่มีที่ซ่อนนี้อยู่ มันก็คือโกดังยัดใบเซอร์คลาสสิกที่ถูกต้องเว้ย! (ท่องเผื่อข้อสอบเก่าหลอกแดก)

❌ **[ผิด] CloudFront**
- **ทำไมถึงผิด:** ดักควายหน้าสั่น! `CloudFront` มันคือท้าวเวสสุวรรณผู้ยืนเฝ้าทางด่วนหน้าม่าน (CDN Edge) มัน "สามารถดึงเอาใบรับรองมาแปะโชว์ได้" แต่**มันไม่ใช่สถานที่ที่คุณจะเดินเข้ามาสั่งงัด Import กุญแจหมกเอาไว้ (Store)** เพื่อเอาไปเสียบแชร์ให้ ALB ใช้ต่อนะจร๊ะ! 

❌ **[ผิด] An S3 bucket... / A private S3 bucket...**
- **ทำไมถึงผิด:** เอากระป๋องสีทาบ้าน! ใครเค้าเอาของขลังตลับกุญแจเข้ารหัส (SSL Certificate) ไปโยนแอบชุบตัวกากๆ หมกไว้ในบ่อขยะไฟล์วิดีโอโง่ๆ อย่าง `S3` ว้าา! ถึงจะเกราะหนาบังขนาดไหน เครื่อง ALB มันจะไปมุดส้วมงัดเจาะงัดใบพาสปอร์ตนี้จาก S3 ไปแขวนคอตัวเองออกมาใช้ยังไง๊!!!? 

---
---

## 📌 คำถามที่ 19
**โจทย์:**
A company conducts performance testing on a large instance MySQL RDS DB instance twice a week. They use Performance Insights to analyze and fine-tune expensive queries. The company needs to reduce its operational expenses in running the tests without compromising the tests' integrity.

Which of the following is the most cost-effective solution?

**ตัวเลือก:**
- [ ] Stop the database once the test is done and restart it only when necessary.
- [ ] Perform a mysqldump to get a copy of the database on a local machine. Use MySQL Workbench to analyze the queries.
- [ ] Downgrade the database to a smaller instance.
- [x] Once the testing is completed, take a snapshot of the database and terminate it. Restore the database from the snapshot when necessary.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเปย์เช่าเครื่องฐานข้อมูลหมูเต๊ะยักษ์ `Large MySQL RDS DB` ไว้ **แค่ทดสอบประสิทธิภาพเล่นๆ เสพติด 2 วัน/สัปดาห์ (twice a week)** แล้วก็ไม่ได้เตะต้องอีก
บอสสั่งรัดเข็มขัด: "ทำยังไงให้เสียเงินน้อยที่สุดโคตรยาจก (reduce expenses/cost-effective) โดยที่ข้อมูลตอนทดสอบต้องอยู่เป๊ะปังห้ามพังทลาย (without compromising integrity)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของชิ้นใหญ่หรูหราที่เตะเล่นเบาๆ แค่ 2 วัน/อาทิตย์ = คุณจะเปิดแช่รันเซิฟเวอร์บูชายัญดูดตังค์ 24 ชม. ทำแพะอะไร! 
- วิธีตบหน้าเจ้าหนี้ซาดิสม์สุดคือ: พอเล่นเครื่องเสร็จปุ๊บ **ถ่ายรูปแชะเมมโมรี่เก็บไว้ซะ (Take a snapshot)** -> แล้วจับเครื่องดาต้าเบสกระชากสับคอตายห่า **ฆ่าลบทิ้ง (terminate it) ให้พ้นบัญชีหนี้** ไปเลยจ้า! -> พออาทิตย์หน้าหิวใหม่ ค่อยไปหยิบรูปถ่ายมาปลุกเสกเครื่องใหม่ประเดิมเล่น! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Once the testing is completed, take a snapshot of the database and terminate it. Restore the database from the snapshot when necessary.**
- **ทำไมถึงถูก:** สันดานโจรตัดงบสุดเพอร์เฟกต์! วิธีนี้แหละโคตรโหดแต่เด็ดขาด! เล่นเสร็จตีป้อมแตก หยิบกล้อง Snap รูปบันทึกความทรงจำก้อนดาต้าไว้อย่างปลอดภัย (ค่าแช่รูปลงถัง S3 ถูกขี้ตีน) แล้ว**ระเบิดลบเครื่อง RDS ทิ้งทำลายล้างเลย** = ค่าเช่าเครื่องสเต็กก้อนละหมื่นหายวับเหลือศูนย์! (พอจะใช้ค่อยคลอดเครื่องใหม่ งบไม่บานเบอะแน่ล้านเปอร์เซ็น)

❌ **[ผิด] Stop the database once the test is done and restart it only when necessary.**
- **ทำไมถึงผิด:** ครึ่งๆ กลางๆ หมาเห่า! การกดปุ่ม `Stop (พักเครื่อง)` คุณอาจจะไม่โดนฟันกบาลค่าไฟค่าซีพียูรัน... **แต่คุณยังคงโดนบอสเตะขอบตาเพราะคุณจะยังโดนคิดเงินค่า "จับจองพื้นที่ฮาร์ดดิสก์อุดอู้หน้าสลัม EBS โง่ๆ หน้าทุ่ง" ทุกวินาทีอยู่นะเว้ยย!!** ค่าฮาร์ดดิสบานเบอะ (หยุดไปก็แค่นั้น สู้เอาระเบิดบึ้มลบแม่งคุ้มกว่าเยอะ)

❌ **[ผิด] Downgrade the database to a smaller instance.**
- **ทำไมถึงผิด:** เอารถไถไปปั่นเครื่องบดนรก! ก็โจทย์มันขีดเส้นใต้ว่ากติกาคือต้องเทสต์ให้เหมือนโลกของจริง (ทดสอบ Large Machine ห้าม Compromise)! ถ้ามึงยัดห่าดาวน์เกรดเสกดาต้าเบสหลอดแฟบลงเหลือเครื่องจิ๋วแคระ แล้วมึงจะจำลองความเร็วเสมือนจริงหาแมวอะไร๊!! ผลทดสอบก็โกหกเละเทะสิ

❌ **[ผิด] Perform a mysqldump to get a copy of the database on a local machine...**
- **ทำไมถึงผิด:** ขุดหลุมฝังตัวเองตายในค่ายลูกเสือ! มึงดูดไฟล์ `mysqldump` ขนไปเทสต์บนสเปคคอมพิวเตอร์ลูกเมียน้อยใต้โต๊ะตัวเอง (local machine) ผลเทสต์ก็ออกมาช้ากากสาสไม่ตรงกับพละกำลังเซิฟเวอร์ยักษ์ของโลกจริงอยู่ดี... สอบตก integrity จ้า 

---
---

## 📌 คำถามที่ 20
**โจทย์:**
A newly hired Solutions Architect is checking all of the security groups and network access control list rules of the company's AWS resources. For security purposes, the MS SQL connection via port 1433 of the database tier should be secured. Below is the security group configuration of their Microsoft SQL Server database:

[Inbound MS SQL 1433 From: 0.0.0.0/0] 

The application tier hosted in an Auto Scaling group of EC2 instances is the only identified resource that needs to connect to the database. The Architect should ensure that the architecture complies with the best practice of granting least privilege.

Which of the following changes should be made to the security group configuration?

**ตัวเลือก:**
- [ ] For the MS SQL rule, change the Source to the Network ACL ID attached to the application tier.
- [x] For the MS SQL rule, change the Source to the security group ID attached to the application tier.
- [ ] For the MS SQL rule, change the Source to the static AnyCast IP address attached to the application tier.
- [ ] For the MS SQL rule, change the Source to the EC2 instance IDs of the underlying instances of the Auto Scaling group.

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินใจเต้นเจอฝันร้าย: ตารางกำแพงตั้งกฎดาต้าเบสซุ่มเปิดหูฉีกตาแหกรับก้อนขี้แฮกเกอร์ด้วยกฎโง่ๆ **"ใครก็ได้บนโลกทะลุเข้าดาต้าเบสฉันได้เลยจ้าาา (0.0.0.0/0)"**
แต่ในโลกความเป็นจริง ผู้บังคับบัญชาประกาศว่า **"มีเพียงกลุ่มแอปเซิร์ฟเวอร์ (App Tier ASG) แก๊งนี้แก๊งเดียวเท่านั้นนะยะ ที่ได้รับสิทธิพิเศษเดินกระดิกหางเข้ามาจับไข่เชื่อมต่อ Database ได้! (least privilege)"**
คำถาม: งัดวิธีไหนไปปรับแก้หน้าบ้านตาราง Security Group ให้ล็อกเป้าเนียนกริบรับแค่พี่แอปแก๊งนี้โดยเฉพาะ ??? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: กฎวิถีกระบี่ของ Security Group (SG)! ถ้าอยากผูกด้ายแดงล็อกให้เซิร์ฟเวอร์กล่อง A ดันก้นทิ่มเข้าไปหาดาต้าเบสกล่อง B ได้เพียวๆ 
- อย่าสลักรับหลังด้วยการจิ้ม IP โง่ๆ ขยะเกลื่อน... ให้สลักช่องที่มา (Source) ของกล่อง B โดย **"แปะโยงอ้างอิงรหัสบัตรประชาชนชื่อกลุ่ม `Security Group ID` ของไอ้กล่องหนุ่ม A เข้าไปซะ!"** จบปิ๊ง ไม่ว่ากล่อง A จะคลอดลูกอีกกี่หมื่นเครื่องก็เสียบผ่านได้หมดอัตโนมัติ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] For the MS SQL rule, change the Source to the security group ID attached to the application tier.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! นี่คือสุดยอดยางลบอัจฉริยะ (Security Group Referencing) แทนที่คุณจะปล่อยผีอ้าอ้าให้ 0.0.0.0/0 คุณแค่ไปลบออกแล้วพิมพ์รหัสตั๋วพรรคกระยาจก **"Security Group ID (เช่น sg-xxx)"** ของแก็งแอปพลิเคชันฝั่งตึก ASG แปะเข้าไปในช่อง Source ของ Database จบ! ไม่ว่าแอป ASG จะยืดหดงอกเครื่องใหม่ไข่ร่วงมากี่สิบเครื่อง ดาต้าเบสก็จะเปิดวาร์ปรับแขกเฉพาะคนอมยันต์ SG อันนี้เท่านั้น โคตร Best Practice คลีนจัด!

❌ **[ผิด] For the MS SQL rule, change the Source to the EC2 instance IDs of the underlying instances of the Auto Scaling group.**
- **ทำไมถึงผิด:** เอานิ้วจิ้มปลั๊กไฟ! ถ้าคุณทะลึ่งแก้กฎโดยเอาลูกปืนเจาะรหัส "Instance ID ลายตัว (เช่น i-1234, i-5678)" แปะรายตัวยาวเป็นหางว่าว แล้วเกิดวันพรุ่งนี้ไอ้แก๊ง Auto Scaling มันทุบเครื่องทิ้งคลอดเครื่องใหม่เลข ID เปลี่ยนหมด... มึงก็ต้องวิ่งหูตาแหกตามมาไล่ก้มหน้าพิมพ์เปลี่ยนเลขแก้ IP กฎทุกๆ วันให้ขี้เยี่ยวแตกตายหรอฮะ!!

❌ **[ผิด] For the MS SQL rule, change the Source to the Network ACL ID attached to the application tier.**
- **ทำไมถึงผิด:** มุดหน้าหาสุนัขที่ตูดเสาไฟ! ตัว `Security Group (กำแพงเครื่อง)` มันบอดสีลูกกระตา! กูสามารถอ้างอิงลิ้งก์ข้ามหากำแพง SG ด้วยกันเองได้ แต่มัน **ไม่สามารถเอาชื่อป้อมยามหน้าหมู่บ้าน (Network ACL ID) มาพิมพ์เป็นด่านกั้นในช่องรับ Source** ได้นะเว้ยย! 

❌ **[ผิด] For the MS SQL rule, change the Source to the static AnyCast IP address attached to the application tier.**
- **ทำไมถึงผิด:** เพ้อเจ้อหลอนยาบ้า! ไปขุดชื่อวิชาเทพ `AnyCast IP` มหายาน (ซึ่งมันขลุกใช้กับพี่โตอย่าง Global Accelerator ต่างหาก) มันเกี่ยวบ้าอะไรกับการยิงปั้มกระสุนผ่านด่าน Security Group ปัญญาอ่อนหลังบ้าน VPC หล่ะ! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 3: ข้อ 21 - 30)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 21
**โจทย์:**
A company must integrate the Lightweight Directory Access Protocol (LDAP) directory service from the on-premises data center to the AWS VPC using IAM. The identity store which is currently being used is not compatible with SAML.

Which of the following provides the most valid approach to implement the integration?

**ตัวเลือก:**
- [ ] Use IAM roles to rotate the IAM credentials whenever LDAP credentials are updated.
- [ ] Use an IAM policy that references the LDAP identifiers and AWS credentials.
- [x] Develop an on-premises custom identity broker application and use STS to issue short-lived AWS credentials.
- [ ] Use AWS IAM Identity Center to manage access between AWS and your LDAP.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทอยากต่อท่อเชื่อมระบบสแกนบัตรพนักงานปู่ทวด **`LDAP (บนเซิร์ฟเวอร์โรงงานตัวเอง - on-premises)`** เข้ากับระบบเทพของ **`AWS IAM`**
อุปสรรคชีวิต: ระบบบัตรพนักงานเก่านี่ **"มันคุยภาษามาตรฐาน SAML 2.0 ไม่เป็นโว้ย! (not compatible with SAML)"**
คำถาม: งัดวิธีไหนมาเชื่อมต่อระบบให้คุยกันรู้เรื่องและถูกต้องที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: กฎหมายคนเข้าเมือง AWS! ถ้าคุณมีเทคโนโลยีแจกบัตรที่บ้าน (Identity provider) แล้วอยากเชื่อมกับ AWS ...ถ้าเป็นไฮโซ SAML 2.0 ก็ชิลไป แต่ถ้าเครื่องแจกบัตรคุณ **"ล้าหลังดึกดำบรรพ์ ไม่รองรับ SAML"** = กฎบังคับว่าคณต้อง **"เขียนโปรแกรมพ่อสื่อคนกลางขึ้นมาเองคลุกวงใน (Create Custom identity broker application)"** แล้วให้พ่อสื่อไปจูบกับ **AWS STS** เพื่อขอตั๋วเข้างานชั่วคราวให้พนักงานเอง 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Develop an on-premises custom identity broker application and use STS to issue short-lived AWS credentials.**
- **ทำไมถึงถูก:** ไร้ทางเลือกอื่น! เมื่อของเก่ามันกากคุยภาษากลาง (SAML) ไม่รู้เรื่อง คุณต้องงัดไม้ตายสุดท้ายคือตั้งตึกสร้างโปรแกรมล่ามแปลภาษา (Custom Identity Broker) ไว้หน้าประตูโรงงานคุณซะ โปรแกรมนี้จะคอยถามชื่อรหัสผ่านพนักงาน เสร็จแล้วค่อยกริ๊งสายด่วนไปกราบไหว้ศูนย์ปั๊มตั๋ว `AWS STS (Security Token Service)` ขอตั๋วพาสปอร์ตชั่วคราว (short-lived credentials) มายัดใส่มือให้พนักงานถือเข้าประตู AWS ไปทำงาน

❌ **[ผิด] Use AWS IAM Identity Center to manage access between AWS and your LDAP.**
- **ทำไมถึงผิด:** ตกม้าตายตรงสเปค! เครื่องแม่ข่ายรวบยอดอย่าง `AWS IAM Identity Center (อดีต SSO)` มันคบตบจูบแต่สังคมผู้ลากมากดีที่แหลงภาษา **SAML 2.0** เป็นเท่านั้นจ้า! ถ้าระบบบ้านคุณไม่รองรับ SAML อี Identity Center มันก็ถีบหัวส่งไม่คุยด้วยหรอก!

❌ **[ผิด] Use an IAM policy / Use IAM roles...**
- **ทำไมถึงผิด:** มโนเตลิดเปิดเปิง! การที่คุณเอาเอกสารตั้งกฎกระดาษเปล่าอย่าง `IAM Policy / IAM roles` ไปถือกระดาษดักแกว่งหน้าตึก LDAP บ้านนอกของโรงงาน... ปลั๊กมันเสียบกันไม่ติดนะโว้ยยย (ไม่ได้เชื่อม Federation กันเลยสักนิด) ปัญญาอ่อนมากฮะ

---
---

## 📌 คำถามที่ 22
**โจทย์:**
A company has a team of developers that provisions its own resources on the AWS cloud. The developers use IAM user access keys to automate resource provisioning and application testing processes in AWS. To ensure proper security compliance, the security team wants to automate the process of deactivating and deleting any IAM user access key that is over 90 days old.

Which solution will meet these requirements with the LEAST operational effort?

**ตัวเลือก:**
- [ ] Create an Amazon EventBridge rule to filter IAM user access keys older than 90 days. Define a target to invoke an AWS Lambda function to deactivate and delete...
- [ ] Create a custom AWS Config rule to check the max-age of IAM access keys. Use Amazon EventBridge Scheduler to invoke an AWS Batch job...
- [x] Use the AWS Config managed rule to check if the IAM user access keys are not rotated within 90 days. Create an Amazon EventBridge rule for the non-compliant keys, and define a target to invoke a custom AWS Lambda function to deactivate and delete the keys.
- [ ] Create an Amazon EventBridge rule to filter IAM user access keys older than 90 days. Schedule an AWS Batch job that runs every 24 hours to delete...

---
### 🎯 โจทย์ต้องการอะไร?
ทีมงานโปรแกรมเมอร์แจก "กุญแจผีลับ (IAM access keys)" เกจิเกลื่อนกลาดกระจายเอาไว้เจาะเข้า AWS
เจ้านายสั่งระงับภัยทุจริต: **"ช่วยหาวิธีไล่ล่าจับผิดกุญแจเก่ากึกที่อายุเกิน 90 วัน (over 90 days old) แล้วพอมันเละเทะก็สั่งลบหักดันทิ้งอัตโนมัติซะ!"**
เงื่อนไขคนขี้เกียจ: ทำยังไงให้ใช้แรงงานแอดมิน **"ปั้นระบบนี้น้อยที่สุด (LEAST operational effort)"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: สุดยอดสายสืบตำรวจตรวจระเบียบวินัยหาคนทำผิดกฎ (เช็คกุญแจเกิน 90 วัน) = ต้องมีเครื่องแบบ **`AWS Config`** เป็นคนออกตรวจชี้หน้าคนทำผิด!
- ทริค 2: สังเกตของแจกฟรี! ใน AWS Config มันมีกฎสำเร็จรูปเขียนใส่ถาดมาให้กินเลยชื่อ **`AWS Config managed rule (กฎฟรีไม่ต้องเขียนโค้ดเพิ่ม)`** นี่แหละคือกุญแจสู่คำว่าลงแรงน้อยที่สุด!
- ทริค 3: พอเจอคนผิด ก็โยนเข้าตระกร้า `EventBridge` สะกิดแขนจ้างเพชฌฆาต `Lambda` ไปสับคอลบทิ้ง จบแฮ๊ปปี้!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use the AWS Config managed rule to check if the IAM keys are not rotated within 90 days. Create an Amazon EventBridge rule... invoke a custom AWS Lambda function to deactivate and delete the keys.**
- **ทำไมถึงถูก:** ครบสูตรเพอร์เฟค! แอดมินเดินนกหวีดไปเปิดใช้กฎสำเร็จรูป `Config managed rule (access-keys-rotated)` (ไม่ต้องเสียเวลาเถียงเขียนกฎเอง) พอมันจับเจอคนผิด (non-compliant) มันจะปาข่าวใส่ `EventBridge` แล้วตัวอีเวนต์จะเด้งไปปลุกมือปืน `Lambda` ให้บีบคอกุดกุญแจทิ้งทันที นี่คือวิธีเหนื่อยน้อยสุดและเจ๋งระดับโลกฮะ

❌ **[ผิด] Create a custom AWS Config rule... Use Amazon EventBridge Scheduler to invoke an AWS Batch job...**
- **ทำไมถึงผิด:** เอามีดสับขาตัวเอง! เค้ามีกฎสำเร็จรูปแจกฟรี (managed rule) ให้ใช้เสือกไปหลบมุม "ปั้นโค้ดกฎตีเองทั้งหมด (custom rule)" ให้เหนื่อยขี้แตกทำไม! แถมยังพิเรนทร์ใช้รถสิบล้ออย่าง `AWS Batch (ระบบรันงานซูเปอร์คอมพิวเตอร์)` มาเชือดกุญแจกะโหลกกะลาแค่เนี้ยนะ โคตรสิ้นเปลืองจ้า!

❌ **[ผิด] Create an Amazon EventBridge rule to filter IAM user access keys older than 90 days...**
- **ทำไมถึงผิด:** มโนล้วนๆ! ตัวบริการรับฝากข้อความ `Amazon EventBridge` **"มันไม่มีตาผีสางมองเห็นหรอกนะว่ากุญแจ IAM อันไหนหมดอายุ 90 วันรึยัง!"** (มันตั้ง Filter เช็คอายุแช่แข็งแบบนี้โดยตรงบน EventBridge ไม่ได้) หน้าที่ล้วงไส้กรองจับผิดมันคืองานของ AWS Config ล้วนๆ

---
---

## 📌 คำถามที่ 23
**โจทย์:**
An automotive company is working on an autonomous vehicle development and deployment project using AWS. The solution requires High Performance Computing (HPC) in order to collect, store and manage massive amounts of data as well as to support deep learning frameworks. The Linux EC2 instances that will be used should have a lower latency and higher throughput than the TCP transport traditionally used in cloud-based HPC systems. It should also enhance the performance of inter-instance communication and must include an OS-bypass functionality to allow the HPC to communicate directly with the network interface hardware to provide low-latency, reliable transport functionality.

Which of the following is the MOST suitable solution that you should implement to achieve the above requirements?

**ตัวเลือก:**
- [ ] Attach an Elastic Network Adapter (ENA) on each Amazon EC2 instance to accelerate High Performance Computing (HPC).
- [ ] Attach an Elastic Network Interface (ENI) on each Amazon EC2 instance to accelerate High Performance Computing (HPC).
- [x] Attach an Elastic Fabric Adapter (EFA) on each Amazon EC2 instance to accelerate High Performance Computing (HPC).
- [ ] Attach a Private Virtual Interface (VIF) on each Amazon EC2 instance to accelerate High Performance Computing (HPC).

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทรถบ้าพลัง ปลูกแก๊งก๊วนเครื่องซูเปอร์คอมพิวเตอร์ **`(HPC - High Performance Computing)`** บน EC2 Linux เพื่อเทรนสมองรถไร้คนขับ
โจทย์ต้องการการ์ดแลนสุดสวิงริงโก้ที่มีสเปค:
1. การสื่อสารระหว่างกันต้องพุ่งกระฉูดกว่าแบนด์วิธขี้ๆ บนเน็ตเวิร์กปกติ
2. หมัดเด็ดอัปเปอร์คัต: **"ต้องสามารถข้ามหัวสมองกล OS แล้วสื่อสารทะลวงลงฮาร์ดแวร์เน็ตเวิร์กตรงๆ ได้เลย (ต้องมี OS-bypass functionality)!!"**
คำถาม: งัดการ์ดเน็ตเวิร์กเทพตัวไหนมาเสียบตูดดี ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: พอคุณได้ยินรหัสลับ 3 คำนี้ต่อกันปุ๊บ **`"HPC (ซูเปอร์คอม)" + "Machine/Deep Learning" + "OS-bypass (ข้ามหน้าแผงวงจร)"`** ไม่ต้องอ่านโจทย์ต่อแล้ว! คำตอบมีสิ่งเดียวในสากลโลกคือการ์ดแลนสายรุ้ง **`EFA (Elastic Fabric Adapter)`** ขิงๆไปเลย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Attach an Elastic Fabric Adapter (EFA) on each Amazon EC2 instance to accelerate High Performance Computing (HPC).**
- **ทำไมถึงถูก:** ราชาแห่ง HPC! `EFA` เป็นปิศาจตาเดียวเกิดมาเพื่อสิงสู่เครื่องจักรนักคำนวณซูเปอร์คอมพิวเตอร์ ฟีเจอร์ที่ไม่มีใครทำได้นอกจากมันคือสกิลทะลุกำแพงนินจา `OS-bypass` (วิ่งข้ามสมอง OS ดิ่งไปจับไข่การ์ดฮาร์ดแวร์โดยตรง) ทำให้ชิปคุยกันสปีดกระสุนปืนแสงโคตรลื่นไหลปานจับวาง!

❌ **[ผิด] Attach an Elastic Network Adapter (ENA) ...**
- **ทำไมถึงผิด:** เกือบถูกแต่ยังต้อยต่ำ! การ์ด `ENA` มันคือการ์ดเน็ตเวิร์กไฮสปีดระดับปุถุชนเบสิกทั่วไป (ดีกว่าการ์ดธรรมดา) แต่น่าเศร้าใจที่มัน **"ไม่มีฟีเจอร์ OS-bypass"** เลยโดน EFA เหยียบมิดสโตนจมดินฮะ!

❌ **[ผิด] Attach an Elastic Network Interface (ENI) ...**
- **ทำไมถึงผิด:** ง่อยกระรอก! ตัว `ENI` มันก็แค่ "เศษชิ้นส่วนการ์ดแลนสมมติ (virtual network card)" ธรรมดาสามัญประจำบ้านความเร็วเต่าซิ่ง มันไม่มีวันรันทดรับโหลดหนักถล่มทลาย HPC ได้เลยสักแอะ!

❌ **[ผิด] Attach a Private Virtual Interface (VIF) ...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `VIF (Virtual Interface)` คือพอร์ตรากเสียบท่อกะเทยสำหรับปักสายทองแดง Direct Connect เชื่อมตึกบริษัทต่างหาก! มันไม่ใช่แผ่นการ์ดแลนเสียบตูดคอม EC2 บ้าบออะไรเลย! 

---
---

## 📌 คำถามที่ 24
**โจทย์:**
There is a new compliance rule in your company that audits every Windows and Linux EC2 instances each month to view any performance issues. They have more than a hundred EC2 instances running in production, and each must have a logging function that collects various system details regarding that instance. The SysOps team will periodically review these logs and analyze their contents using AWS Analytics tools, and the result will need to be retained in an S3 bucket.

In this scenario, what is the most efficient way to collect and analyze logs from the instances with minimal effort?

**ตัวเลือก:**
- [ ] Install AWS Inspector Agent in each instance which will collect and push data to CloudWatch Logs periodically. Set up a CloudWatch dashboard to properly analyze the log data of all instances.
- [x] Install the unified CloudWatch Logs agent in each instance which will automatically collect and push data to CloudWatch Logs. Analyze the log data with CloudWatch Logs Insights.
- [ ] Install the AWS Systems Manager Agent (SSM Agent) in each instance which will automatically collect and push data to CloudWatch Logs. Analyze the log data with CloudWatch Logs Insights.
- [ ] Install AWS SDK in each instance and create a custom daemon script that would collect and push data to CloudWatch Logs periodically. Enable CloudWatch detailed monitoring...

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งงัดแงะ: สั่งเปิดฟังก์ชันดูดเก็บประวัติ **"ประวัติล็อกบันทึกสถิติเถื่อน (logs) ตัวเครื่องลึกๆ ทุกเม็ด"** จากฝูง EC2 ทะลุร้อยเครื่อง (ทั้ง Linux, Windows) 
ต้องการดึงข้อมูลสลักหลังทั้งหมดมากองยำรวมกันแล้ว **"เสกหน้าจอวิเคราะห์อารมณ์แบบขลุกขลิกสืบสวนคดีด้วย (analyze contents)"** เอาแบบเหนื่อยแอดมิน **"น๊อยน้อยสุดๆ (minimal effort)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: สุดยอดสายยางดูดล็อกเครื่องเซิร์ฟเวอร์แบบเบ็ดเสร็จที่สุดตัวเดียวจบ (ครอบคลุมทั้ง Logs และสถิติแรม/ดิสก์ลึกๆ ของ Windows+Linux) = ซื้อวัคซีนเข็มเดียวจบคือ **`unified CloudWatch Logs agent`**
- ทริค 2: แว่นขยายนักสืบโคนัน เอาไว้นั่งยองๆ กดคีย์เวิร์ดกรองค้นหาตัวหนังสือในคอก Logs ดิบๆ อย่างเมามันส์ = เครื่องมือพระราชทาน **`CloudWatch Logs Insights`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Install the unified CloudWatch Logs agent in each instance which will automatically collect and push data to CloudWatch Logs. Analyze the log data with CloudWatch Logs Insights.**
- **ทำไมถึงถูก:** พระเอกเบอร์หนึ่งลงประกวด! `unified CloudWatch Logs agent` มันจับยัดกลืนทั้งไฟล์ Logs โฟลเดอร์หน้าหลัง และกราฟสถิติลึกๆ ส่งเข้าศูนย์กลางได้อย่างแนบเนียน พอผีโผล่ในลาน Logs คุณก็ใช้สกิล `CloudWatch Logs Insights` กดยิงคิวรี SQL ง่ายๆ ไล่จับผิดค้นหาวันเกิดเหตุได้เพลินจนลืมเมีย! (ฉบับขี้เกียจที่สุด)

❌ **[ผิด] Install AWS SDK in each instance and create a custom daemon script...**
- **ทำไมถึงผิด:** จะสร้างโคลีเซียมแต่เสือกเดินไปตัดต้นไม้ทีละต้นด้วยมีดพับ! มึงมานั่งเขียนสคริปต์โค้ดเองร้อยป่าเพื่อดึง Logs มึงเหนื่อยตายห่าตอนโค้ดบัคกระจายสิฮะ (ขัดคอนเซปต์ minimal effort แบบพังพินาศ) รอมันพังเจ้านายตบกบาลพอดี!

❌ **[ผิด] Install the AWS Systems Manager Agent (SSM Agent) ...**
- **ทำไมถึงผิด:** ผิดถุงยางก๊อตจิ! `SSM Agent` มันเป็นเครื่องมือเอาไว้ "กดเจาะกระโหลกสั่งรันอัปเดตแพทช์เครื่อง/ส่องหน้าจอรีโมตพาสเวิร์ด (Systems Manager)" มันไม่ได้มีตูดดูดไฟล์ Logs ตลอดเวลาแล้วสาดเข้า CloudWatch แบบอัตโนมัติซักกะหน่อยจ้า เลอะเทอะมากช็อยส์นี้

❌ **[ผิด] Install AWS Inspector Agent ... Set up a CloudWatch dashboard ...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! `AWS Inspector` เค้าเอาไว้ปล่อยหมาดมกลิ่น **"ตรวจหาช่องโหว่ความปลอดภัยไวรัสหน้าบ้าน (Security Vulnerability)"** ไม่ได้มานั่งสูบไฟล์ Logs ประวัติเครื่องโว้ยย! ยิ่งเอา Dashboard มากางส่อง Logs นี่ก็ตาเหล่ตาย หาอะไรไม่เจอหรอกฮะ 

---
---

## 📌 คำถามที่ 25
**โจทย์:**
A media company needs to configure an Amazon S3 bucket to serve static assets for the public-facing web application. Which methods ensure that all of the objects uploaded to the S3 bucket can be read publicly all over the Internet? (Select TWO.)

**ตัวเลือก:**
- [ ] Configure the cross-origin resource sharing (CORS) of the S3 bucket to allow objects to be publicly accessible from all domains.
- [x] Grant public read access to the object when uploading it using the S3 Console.
- [ ] Create an IAM role to set the objects inside the S3 bucket to public read.
- [ ] Do nothing. Amazon S3 objects are already public by default.
- [x] Configure the S3 bucket policy to set all objects to public read.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทอยากแจกเสบียงไฟล์รูปไฟล์เว็บกากๆ จากอู่ `Amazon S3` เรียงกระดาน **"สาธารณะประจานให้คนทั้งโลกเสพโหลดดูหน้าจอได้หมด (read publicly all over the Internet)"**
คำถาม: งัดวิธีตบบ้องหูตั้งระบบแบบไหน เพื่อคลุมกำเนิดไฟล์ทั้งหมดเป็นสาธารณะฟรีสไตล์? (เลือก 2 ทางเลือก)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: กฎเหล็กสวรรค์ "S3 ค่าเริ่มต้นมันจะล็อกกุญแจส่วนตั๊วส่วนตัว (Private) สุดๆ"
- การแหกกฎดึงสิทธิ์ถวายสระว่ายน้ำสาธารณะให้คนทั้งโลกคือ **"ห่ามแจกสดรายไฟล์ตอนอัปโหลดเลย (Grant public object)"** หรือ **"กางยันต์พรมผืนใหญ่คลุมส้วมทั้งบ่อเป็นสาธารณะ (Bucket policy)"** เท่านั้น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the S3 bucket policy to set all objects to public read.**
- **ทำไมถึงถูก:** ท่ายากที่กางร่มทีเดียวเปียกทั้งโลก! คุณไปเขียนคาถาเวทมนต์ (JSON) ที่หลังคา `Bucket policy` ป้ายสีให้คำสั่งว่า `{"Action":["s3:GetObject"], "Principal":"*"}` เพียงเท่านี้ ทุกสรรพสิ่งหยดน้ำที่เทลงกะละมังนี้จะกลายเป็นสาธารณะหมดจด!

✅ **[ถูกต้อง] Grant public read access to the object when uploading it using the S3 Console.**
- **ทำไมถึงถูก:** ท่าประณีตศิลป์! คุณอัปโหลดไฟล์ไปแล้วค่อยๆ บรรจงกดจิ้มติ๊กถูกติ๊กสเปกเหรียญว่า "ไอ้ไฟล์ก้อนนี้ อนุญาตให้คนสัญจรทั่วไป (Public read) ยกนิ้วส่องดูได้เลยจ้า" ชิลๆ โนดราม่า

❌ **[ผิด] Do nothing. Amazon S3 objects are already public by default.**
- **ทำไมถึงผิด:** ขี้จุ๊ตอแหล! AWS ป่าวประกาศปักป้ายหน้าผากไว้เลยว่า **"ตึก S3 สร้างใหม่ทุกตึก ค่าเริ่มต้นคือล็อกประตูดำมืด Private ห้ามใครเข้าทั้งปวงโดยมเด็ดขาด!"** จ้า จะมาของฟรีอะไร!

❌ **[ผิด] Configure the cross-origin resource sharing (CORS) of the S3 bucket...**
- **ทำไมถึงผิด:** ท่าดัดหลังนักกล้าม! `CORS` เอาไว้แก้เกมหมาหมู่ที่แกล้งโยนไฟล์รูปข้ามโดเมนอื่นด่ากัน (เช่น หน้าเว็บ foo.com แอบดึงรูปจากเว็บ S3.com แล้วโดนบราวเซอร์ด่าบล็อกการโหลด) ไม่ได้เกี่ยวส้นตีนกับการแหกผีเสื้อเปลื้องผ้าเปิดสาธารณะแบบโง่ๆ เลยฮะ 

❌ **[ผิด] Create an IAM role to set the objects inside the S3 bucket to public read.**
- **ทำไมถึงผิด:** มุดหน้าหาสุนัขที่ตูดเสาไฟ! ตัว `IAM Role` มันคือ "หมวก รปภ." เอาไว้สวมหัวให้ EC2 เดินเข้าไปในบ่อ S3 เพื่อหยิบของ! มัน **ไม่สามารถกระโดดเสกคาถาแก้กลไก permission เสกส้วม S3 ให้กลายเป็นของสาธารณะ** โล่งโจ้งแบบนั้นได้นะโว้ยปัญญาอ่อน 

---
---

## 📌 คำถามที่ 26
**โจทย์:**
A company is using an On-Demand EC2 instance to host a legacy web application that uses an Amazon Instance Store-Backed AMI. The web application should be decommissioned as soon as possible and hence, you need to terminate the EC2 instance.

When the instance is terminated, what happens to the data on the root volume?

**ตัวเลือก:**
- [x] Data is automatically deleted.
- [ ] Data is automatically saved as an EBS volume.
- [ ] Data is unavailable until the instance is restarted.
- [ ] Data is automatically saved as an EBS snapshot.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังกดปุ่มระเบิดตึกทิ้ง **(Terminate: สั่งฆ่ายกครัว)** เครื่อง `EC2` ตัวนึง
ความพีคคือ อีเครื่องนี้ดันใช้ฮาร์ดดิสก์แบบ **`Instance Store-Backed AMI` (ฮาร์ดดิสก์ลมปากที่แปะสิงติดชิป CPU แบบกะโหลกกะลา)** เป็นรากแก้ว (Root volume) 
คำถาม: ทันทีที่เครื่องป่นปี้วอดวายแหกตาย... ชะตากรรมของข้อมูลรูปโป๊ในฮาร์ดดิสก์นั้นจะเป็นฉันใด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ท่องชื่อฮาร์ดดิสก์ **`Instance Store` = "ฮาร์ดดิสก์ชั่วคราว ลมปากผีหลอก (Ephemeral)"** ชีวิตของมันผูกสลักผูกปิ่นโตติดกับเครื่อง EC2 เครื่องนั้นเท่านั้น! 
- กฎแห่งกรรม: ถ้ามึงเผลอมือกด **ปิดเครื่อง (Stop) หรือลบเครื่องทิ้ง (Terminate)**... ข้อมูลข้างในจะจมดิ่งชักตายหายวับดับศูนย์สลายหายไปตลอดกาลแบบไม่มีสิทธิ์ผุดสิทธิ์เกิด!! (ลบอัตโนมัติ 100%)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Data is automatically deleted.**
- **ทำไมถึงถูก:** ตอกตะปูปิดฝาโลงกงเต็ก! `Instance Store` ทำตัวเป็นปรสิตปลิงสิงเครื่อง ถ้าเซิร์ฟเวอร์เจ้าบ้านกดหั่นเป็ดม่องเท่ง (Terminate) ก้อนเนื้องอกฮาร์ดดิสก์ตัวนี้ก็จะแตกสลายปลิวหายเป็นทรายไปในพริบตา (Data is automatically deleted without warning!) จบข่าวเศร้าๆ ม้วยมรณาศูนย์กลาง

❌ **[ผิด] Data is automatically saved as an EBS volume / EBS snapshot.**
- **ทำไมถึงผิด:** โลกสวยมโนแจ่มเบิกบาน! ของฟรีที่ไหนเค้าจะเสกพรมวิเศษมาย่องถ่ายรูปเซฟข้อมูลกลั่นตัวเป็นฮาร์ดดิสก์คงกระพัน `EBS` ให้มึงแบบออโต้ตอนตึกถล่มล่ะวะ! ไม่มีทาง ข้อมูลตายแล้วตายเลยลูกพ่อ

❌ **[ผิด] Data is unavailable until the instance is restarted.**
- **ทำไมถึงผิด:** แกล้งโง่หรือไม่ได้อ่านโจทย์เอาใหม่! โจทย์มันเอาปืนจอหัวสั่ง **"Terminate (สอยร่วงยิงทิ้งเผาศพเกลี้ยงตึกไปแล้ว)"** เครื่องมันแตกกระจายเป็นอนุมานฝุ่น มึงจะเอากดสวิตช์ Restart เครื่องวิญญาณปู่โสมเฝ้าทรัพย์หน้าไหนมาฟื้นชีพได้อีกล่ะโว้ยย!! 

---
---

## 📌 คำถามที่ 27
**โจทย์:**
A web application requires a minimum of six Amazon Elastic Compute Cloud (EC2) instances running at all times. You are tasked to deploy the application to three availability zones in the EU Ireland region (eu-west-1a, eu-west-1b, and eu-west-1c). It is required that the system is fault-tolerant up to the loss of one Availability Zone.

Which of the following setup is the most cost-effective solution which also maintains the fault-tolerance of your system?

**ตัวเลือก:**
- [ ] 6 instances in eu-west-1a, 6 instances in eu-west-1b, and no instances in eu-west-1c
- [ ] 6 instances in eu-west-1a, 6 instances in eu-west-1b, and 6 instances in eu-west-1c
- [ ] 2 instances in eu-west-1a, 2 instances in eu-west-1b, and 2 instances in eu-west-1c
- [x] 3 instances in eu-west-1a, 3 instances in eu-west-1b, and 3 instances in eu-west-1c

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทหน้าเลือดบังคับกติกา: **"ฉันต้องมีเครื่อง `EC2` ยืนสแตนบายน่าฟาดหน้าคอมฯ อย่างน้อยเป๊ะๆ 6 เครื่องตลอดกาล (minimum 6 instances)"**
คุณมีอาวุธหว่านวางไข่ 3 โซน (3 AZs: a, b, c) ทายซิว่า ท่าไหนประหยัดเงินสุดตีน (cost-effective) และแม้มีเครื่องบินชนตึกพังยับตายหายไป 1 ตึกเต็มๆ (loss of one AZ)! คุณก็ยังเหลือเครื่องรอดแตะเลข 6 เครื่องเสมอ ?!

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริคเดียวกับข้อ 5 เป๊ะยันเงา! ใช้คณิตศาสตร์ ป.1 ลองเอามือปิดตัวเลขไป 1 โซน แล้วนับก้อนที่เหลือว่า "ผลรวม >= 6 หรือไม่" ถ้ารอดก็ให้เทียบว่าช็อยต์ไหนสร้างเครื่องรวมน้อยชิ้นที่สุด (คือประหยัดสุด)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] 3 instances in eu-west-1a, 3 instances in eu-west-1b, and 3 instances in eu-west-1c**
- **ทำไมถึงถูก:** ตรรกะกระสอบทรายชนะเลิศ! มีตึก A(3), B(3), C(3)... ถ้าแผ่นดินไหวตึก C ถล่มเละกลายเป็นฝุ่น (0)... คุณก็ยังคงแผลงฤทธิ์ยิ้มแฉ่งกอดตึกที่เหลือ A(3) + B(3) = 6 เครื่องถ้วน!! ตรงสเปกบอส แล้วรวมทั้งหมดสร้าง 9 เครื่อง ประหยัดสุดในหมู่คนรอดตาย!

❌ **[ผิด] 6 instances in a, 6 in b, 6 in c**
- **ทำไมถึงผิด:** รวยไปพ่อตู้! รวมหน้าบ้านเปิดร้านหว่านเซิฟเวอร์ล่อไปตั้ง `6+6+6 = 18 เครื่อง!!` ถึงแม้พายุจะพัดพังไป 1 ตึก เหลือ 12 ก็รอดตายสบายใจเฉิบ... แต่มันฉีกสอยงบประมาณบอสแหกกระจุย ไม่ตรงนิยาม "ประหยัดที่สุด (cost-effective)" เลยสักนิดนึงครับ 

❌ **[ผิด] 6 in a, 6 in b, 0 in c**
- **ทำไมถึงผิด:** เอ้า ลองนับรวมนะเฮ้ย `6+6+0 = 12 เครื่อง` แถมถ้าระเบิดลงตึก A ปุ๊บ... เหลือตึก B แค่ 6+0 = 6 เครื่อง ก็ถือว่ารอดตายแหละ (fault-tolerant) แต่แม่เจ้าโว้ยย... ออพชันตั้งไข่ตะกี้ (3-3-3 คือมงลงแค่ 9 เครื่องไงโว้ย) ใครถูกกว่ากันล่ะ? ของมึงแพงกว่าครับ ตกกระป๋องไป

❌ **[ผิด] 2 in a, 2 in b, 2 in c**
- **ทำไมถึงผิด:** งกขี้แตกจนบ้านบึ้ม! สร้างแค่ 2-2-2 รวมเป็น 6 ดูเหมือนประหยัดสุดๆ ใช่ป่าว... แต่พอซวยซ้ำซากตึก A โดนระเบิดลงตูม (-2) มึงจะเหลือหลงจ้งง่อยๆ แค่ `2+2 = 4 เครื่อง!!` ผลคือสอบตก ไม่รอดคำสัญญา 6 เครื่องที่เจ้านายขู่เอาไว้!

---
---

## 📌 คำถามที่ 28
**โจทย์:**
Every week, an e-commerce company announces a sales promotion, causing its application hosted on an Auto Scaling group to experience intermittent downtime. Because of long initialization times, the application only becomes operational minutes before a new EC2 instance turns into RUNNING state. A solutions architect must devise a solution that launches capacity in advance based on a forecasted load in order to scale faster.

Which solution meets the requirements with the least amount of effort?

**ตัวเลือก:**
- [ ] Use Amazon SageMaker Clarify to analyze and predict the workload pattern of the application. Create a scheduled scaling policy based on the prediction results.
- [ ] Create a dynamic scaling policy based on the historical average CPU load of the application.
- [ ] Create a Scheduled Amazon EventBridge (Amazon CloudWatch Events) Rule that runs a scaling job on a Lambda function every midnight.
- [x] Configure the Auto Scaling group to use predictive scaling.

---
### 🎯 โจทย์ต้องการอะไร?
ร้านขายของบ้าบิ่นจัดโปรโมชั่นบึ้มๆ ทุกๆ สัปดาห์
ปัญหาคอขวด: เว็บสะดุดล้มตาย! เพราะลูกหาบเครื่องเซิร์ฟเวอร์ EC2 ดันเปิดช้าม๊ากกก (long initialization times) ปลุกเสกใหม่ไม่ทันกิน!
เป้าหมายเทพบุตร: หมอผีอยากเสกกลไกให้ระบบมัน **"ตื่นรู้เสกเครื่องใหม่ยื่นดักหน้าเตรียมพร้อม (launches capacity in advance) จากการเดาใจคาดเดายอดโหลดกราฟในอนาคต (forecasted load)"** เพื่อให้รองรับทารกโหลดโปรโมชันลื่นไหลไม่ตายหน้าหงาย 
คำถาม: ท่ายากสอยคางอันไหนแกะเกามันส์สุด แถมขี้เกียจนั่งเฝ้าที่สุด (least effort)?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกฟรีโคตรเจ๋งระดับพระเจ้า! มีคำพูดว่า อยากจะขยายพุง ASG ดักหน้าเดาทางยอดจราจรในอนาคต **"Forecast/Predict"** = เมนูเทพคู่ตัวของ ASG เลยก็คือแม่หมอ **`Predictive scaling (การสเกลอดักหน้าแบบ AI พยากรณ์)`** กดกึกเดียวได้นกสองตัว!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the Auto Scaling group to use predictive scaling.**
- **ทำไมถึงถูก:** เปรี้ยงเดียวจบ! ตัว `Predictive scaling` บน ASG มันคือหมอดู AI มันจะนั่งส่องประวัติกราฟคอขวดแบนด์วิดท์ในอดีต (ว่าทุกวันศุกร์โปรเด้งคนบุกยับ) แล้วพอมันเดาอนาคตได้ปุ๊บ... มันจะถีบเครื่องเสกตัวโคลนนิ่งมาอุ่นเครื่องรอเสียบปลั๊กล่วงหน้าให้เพียบพร้อมเลย! ตอบโจทย์ "ล่วงหน้า(in advance)" + "เดาโหลด (forecast)" และกดยกนิ้วเดียวไม่ต้องเขียนโค้ด (least effort)!

❌ **[ผิด] Create a dynamic scaling policy based on the historical average CPU load...**
- **ทำไมถึงผิด:** ตามตูดผีกิน! ตัว `Dynamic scaling` (เช่น target-tracking) มันเป็นโหมด "เตะหมูเข้าปากหมา" คือคนบุกทะลักเข้ามากราฟเด้งแวะแตะเส้นชี้วัดซะก่อน มันถึงจะค่อยกระดิกนิ้วงอกเครื่อง... แต่อนิจจา โจทย์บอกแล้วไงว่าการเปิดเครื่องคุณมันหอยทากกินยาชา (long initialization) งอกไม่ทันโว้ยย คนด่าเละแล้วจ้า!

❌ **[ผิด] Use Amazon SageMaker Clarify to analyze and predict the workload...**
- **ทำไมถึงผิด:** เอามีดสปาร์ต้าหั่นมะนาว! `SageMaker Clarify` เค้าเอาไว้วิเคราะห์ว่าโมเดล AI มึงลำเอียงเหยียดสีผิวผู้หญิงผู้ชายหรือเปล่าตะหาก! มันไม่ได้มีความสามารถถอดร่างพยากรณ์ขยายเครื่อง Auto Scaling เลยจ้า มโนแหลกลาน

❌ **[ผิด] Create a Scheduled Amazon EventBridge Rule... run scaling on Lambda every midnight.**
- **ทำไมถึงผิด:** ท่าดัดหลังรันทดจัด! การตั้งเวลาเขียนบอทผี (Scheduled) บังคับสไลด์เปิดเครื่องเที่ยงคืน มันคือท่าคนโง่เขียนสคริปต์กากๆ เพราะชั่วโมงโปรโมชั่นคุณอาจจะเลื่อนหนีก็ได้ ใครจะไปรู้! สู้กดติ๊กถูกใช้ AI Predictive หมอดูตัวจริงของเมนู ASG มันอ่านกราฟแม่นกว่าและสบายกว่าร้อยเท่าฮะ

---
---

## 📌 คำถามที่ 29
**โจทย์:**
A financial firm is designing an application architecture for its online trading platform that must have high availability and fault tolerance. Their Solutions Architect configured the application to use an Amazon S3 bucket located in the us-east-1 region to store large amounts of intraday financial data. The stored financial data in the bucket must not be affected even if there is an outage in one of the Availability Zones or if there's a regional service failure.

What should the Architect do to avoid any costly service disruptions and ensure data durability?

**ตัวเลือก:**
- [x] Enable Cross-Region Replication.
- [ ] Create a new S3 bucket in another region and configure Cross-Account Access to the bucket located in us-east-1.
- [ ] Copy the S3 bucket to an EBS-backed EC2 instance.
- [ ] Create a Lifecycle Policy to regularly backup the S3 bucket to Amazon Glacier.

---
### 🎯 โจทย์ต้องการอะไร?
ตลาดหุ้นโชว์ความเหนียวหนืดหวิวกระจุย: ฝังสมบัติกราฟแท่งเทียนการเงินอันศักดิ์สิทธิ์ไว้ที่ตึกบ่อ S3 ประเทศ (Region) ขื่อ `us-east-1`
เป้าปักทะลุฟ้า: กฎมหาชนคือกราฟรูปโพยแทงหวยพวกนี้ ห้ามชิบหายวายป่วง **"แม้กระทั่งแผ่นดินซีกโลกอเมริกาทั้งประเทศจะบึ้มพังพินาศสึนามิลง (regional service failure) ข้อมูลก็ต้องห้ามตายเป็นอันขาด! (data durability)"**
คำถาม: งัดยันต์แปะหลัง S3 ท่าไหนเพื่อเซฟสมบัติไม่ให้แตกสลายเมื่อทวีปแตก ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: พอส่องเจอโจทย์เพ้อเจ้อว่า **"ป้องกันทวีป/ประเทศล่มหายไปทั้งดุ้น (regional service failure/ outage) สำหรับ S3 ว่ะเฮ้ย!"** = ไม้ตายก้นกุฏิที่ป้องกันโลกแตกข้ามทวีปได้มีเพียงกระบวนท่าเดียวคือ **`Cross-Region Replication (CRR)`** (วิชาโคลนนิ่งตุ่มน้ำข้ามประเทศอัตโนมัติ) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Cross-Region Replication.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! `Cross-Region Replication (CRR)` คือการปั๊มลูกแฝด! เมื่อแอดมินโยนไฟล์ลงหีบ S3 ฝั่งอเมริกา (US) มนตรานี้ก็จะขี้ขโมยก๊อปปี้ไฟล์นี้บินย้ายไปเซฟหมกอยู่ที่หีบ S3 ฝั่งเอเชีย (เช่น ญี่ปุ่น) อัตโนมัติ! วันดีคืนดีถ้าทวีปอเมริกาเอเลี่ยนบุกยิงบึ้มหายวับ ข้อมูลคุณก็ยังหันไปดูดอ่านสบายใจเฉิบที่ญี่ปุ่นได้ทันที เซฟโซนระดับโลก!

❌ **[ผิด] Create a new S3 bucket in another region and configure Cross-Account Access...**
- **ทำไมถึงผิด:** เลอะเทอะสับสนกะปิน้ำปลา! มึงตั้งบ่ออีกซีกโลกนึงก็ถูกละ... แต่เสือกไปกางยันต์ **"Cross-Account Access (ใบอนุญาตให้เพื่อนบ้านบัญชีอื่นมาล้วงตับกูได้)"** เฮ้ย! ยันต์นี้มันแปลว่ามึง "แค่ชี้แจกสิทธิ์ให้คนอื่นเข้ามาอ่านไฟล์ฝั่งเมกา"... มันไม่ได้มีความสามารถ **"สำเนาสูบข้อมูลข้ามโลก (Replicate)"** ไปพักไว้ให้หนีภัยสึนามิลูกบ้าระดับประเทศนะเว้ย! ถึกๆ บ้าบอมาก

❌ **[ผิด] Copy the S3 bucket to an EBS-backed EC2 instance.**
- **ทำไมถึงผิด:** เอากาวตราช้างปะรูตูดแตก! ตึก S3 มันคือโกดังทนทานอมตะของโลกใบนี้! มึงจะบ้าหิ้วไฟล์จาก S3 กลับไปซุกในกระป๋องฮาร์ดดิสก์สลัม `EBS` ที่แม่งพังง่ายกว่าขี้เลื่อยเพื่ออะไร? แถม EBS มันจุกก้นกระจุกอยู่แค่ในตึกเดียว (AZ เดียว) ถ้าพยาเมกาล่มมันก็ตุยเย่ตามกันทั้งฝูงนั่นแหละ! 

❌ **[ผิด] Create a Lifecycle Policy to regularly backup the S3 bucket to Amazon Glacier.**
- **ทำไมถึงผิด:** ขุดหลุมฝังศพทับศพตัวเอง! `Glacier` คือตู้แช่หมูกรอบดองเค็มใน S3 ซึ่งมันก็ตั้งตระหง่านอยู่บน **"แผ่นดินประเทศเดียวกัน (same region)"** นั่นแหละ ถ้าเอเลี่ยนบิงถล่มระดับ Regional... ไอ้ตู้แช่มึงก็ระเบิดกราบลาสวรรค์ไปด้วยจ้า ช่วยไม่ได้! 

---
---

## 📌 คำถามที่ 30
**โจทย์:**
A company has a global news website hosted in a fleet of EC2 Instances. Lately, the load on the website has increased which resulted in slower response time for the site visitors. This issue impacts the revenue of the company as some readers tend to leave the site if it does not load after 10 seconds. The goal is to address the issue in a cost-effective manner.

Which of the below services in AWS can be used to solve this problem? (Select TWO.)

**ตัวเลือก:**
- [ ] For better read throughput, use AWS Storage Gateway to distribute the content across multiple regions.
- [ ] Use Amazon RDS Multi-AZ deployments for database read scalability.
- [x] Use Amazon CloudFront with website as the custom origin.
- [ ] Deploy the website to all regions in different VPCs for faster processing.
- [x] Use Amazon ElastiCache for the website's in-memory data store or cache.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทปั่นเว็บไซต์สำนักข่าวระดับจักรวาล "ทั่วโลก" วิ่งกองรวมสูบอ่านอยู่ที่โขลง EC2 กรุ๊ปเดียว 
ปัญหาชีวิตหดหู่: หน้าเว็บอืดโหลดนานแตะก้อนหอยทาก (10 วิ) ทำให้ฝูงชนปาไข่เดินหนี กระเทือนรายได้!
เป้ากางเกง: หาคาถาเวทมนต์แก้ดงคอขวด "ย่นระยะทางความเร็วแสงให้ขี้แตกไวขึ้น" แบบบอสชอบใจ (cost-effective) 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียระดับ Global!
1. ถ้าอยากเสริฟหน้าเว็บไซต์ข่าว (รูปปั้น, html โง่ๆ) ไปจ่อปากป้อนคนอ่านระดับ "Global (ทั่วโลก)" ไม่ต้องบินมารูดิบๆ = ส่งผีดิบแวมไพร์ยืนเฝ้าปากซอย **`Amazon CloudFront (CDN)`** ไปปั๊มแคชหน้าเว็บเลย!
2. ถ้าอยากเสริฟกราฟฐานข้อมูลยัดกล่องกระดาษอ่านไวแสง ปะทะพุงกะทิ (Read scalable web) = ส่งหมาไนงัดแคชตัวซิ่ง **`Amazon ElastiCache`** ไปยืนอุดคอขวดป้อนนมข้อมูลซ้ำๆ แทนดาต้าเบสซะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon CloudFront with website as the custom origin.**
- **ทำไมถึงถูก:** พระเอกคู่แฝดคู่แรก! `CloudFront` สวมบทตู้แจกรูปภาพแจกข่าว CDN หน้าปากซอยทั่วจักรวาล แฟนคลับที่แอฟริกาไม่ต้องถ่อปลั๊กข้ามโลกมาโหลดข่าวที่อเมริกา แค่เดินไปตู้แคชหน้าตึกใกล้บ้านก็ได้ดูข่าวไวระเบิดละ โคตรแก้เรื่องอืด 10 วินาทีได้ชะงัก!

✅ **[ถูกต้อง] Use Amazon ElastiCache for the website's in-memory data store or cache.**
- **ทำไมถึงถูก:** พระเอกคู่แฝดคนที่สอง! เว็บข่าวมันก็คือ "ข่าวซ้ำๆ" ที่คนเป็นล้านแห่กันมาอ่าน! แทนที่เซิฟเวอร์ EC2 ต้องก้มหัวดึงดาต้าเบสตายห่าดึงกระอักกระอ่วน... ก็แค่เอาข่าวนั้นไปแปะสลักผูกไขว้ไว้บนกระดาษทดซิ่ง `ElastiCache (Memcached/Redis)` แรมปืนกล ใครเปิดอ่านก็สาดกระป๋องป้อนหน้าเว็บฟิ้วๆ ทะยานหนีคอขวดตายดาต้าเบสพังเลยฮะ!

❌ **[ผิด] Deploy the website to all regions in different VPCs for faster processing.**
- **ทำไมถึงผิด:** รวยปัญญาอ่อนแล้วแจกยาบ้า! การที่คุณเอาเว็บไซต์ไปลอกก๊อปปี้ "สร้างกองบัญชาการใหญ่ตั้งตึกทุกประเทศทั่วโลก (Deploy all regions)"... โอ้วแม่เจ้าา มึงลงทุนเซตระบบแยกเป็นพันล้านร้อยซอย มันแพงสัดๆ แพงหูฉีก (not cost-effective) และเหนื่อยอัปเดตโค้ดส้นตีนมากฮะ ผิดคอนเซปต์!

❌ **[ผิด] Use Amazon RDS Multi-AZ deployments for database read scalability.**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! เค้าให้ท่องตำรา AWS มาตั้งแต่ปางก่อน... ฟีเจอร์ `RDS Multi-AZ` มันมีไว้กางยันต์ **"เผื่อเครื่องไฟไฟไหม้แล้วซิงค์สลับเครื่องเอาตัวรอดตาย (High Availability/Failover)"** มันไม่ได้มีความสามารถ **"เพิ่มพลังอ่านข้อมูลขี้แตกติดจรวด (Read scalablity)"** ฮัลโหล! ถ้าอยากอ่านไวต้องไปปลุก `Read Replicas` นะว้อย โดนสับขาหลอกลื่นล้มตาย

❌ **[ผิด] For better read throughput, use AWS Storage Gateway...**
- **ทำไมถึงผิด:** กินยาประสาทแล้วหอน! `Storage Gateway` เอาไว้หลอกให้ตึกเซิฟเวอร์โรงงานตัวเอง นึกว่ามีฮาร์ดดิสก์หลุดทะลุจาก S3 มาวางแปะอยู่ ไม่ได้เกิดมาปั๊มโฮสเว็บอวกาศอะไรทั้งคู่จ้า มั่วชิบ

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 4: ข้อ 31 - 40)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 31
**โจทย์:**
A new company policy requires IAM users to change their passwords’ minimum length to 12 characters. After a random inspection, you found out that there are still employees who do not follow the policy.

How can you automatically check and evaluate whether the current password policy for an account complies with the company password policy?

**ตัวเลือก:**
- [ ] Create a Scheduled Lambda Function that will run a custom script to check compliance...
- [ ] Create a CloudTrail trail. Filter the result by setting the attribute to “Event Name” and lookup value to “ChangePassword”...
- [x] Configure AWS Config to trigger an evaluation that will check the compliance for a user’s password periodically.
- [ ] Create a rule in the Amazon CloudWatch event. Build an event pattern to match events on IAM. Set the event name to “ChangePassword”...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเพิ่งออกกฎเหล็ก: "พนักงานทุกคนต้องตั้งพาสเวิร์ดให้ยาวอย่างน้อย **12 ตัวอักษร** นะโว้ย!"
แต่แอดมินหมั่นไส้พบว่ามีไอ้พวกหัวดื้อยังแอบตั้งรหัสสั้นๆ อยู่ 
คำถาม: ท่ายากไหนที่จะสามารถ **"เดินตรวจตราอัตโนมัติ (automatically check and evaluate) ว่ารหัสผ่านทุกคนมันถูกต้องตามกฎหมาย (complies) หรือเปล่า"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์หนึ่ง! หน้าที่ของตำรวจจราจรที่เดินจับผิดคนแหกกฎ (check compliance / evaluate / rules / policy violations) บน AWS คือหน้าที่ผูกขาดของ **`AWS Config`** เท่านั้น! (มันมีกฎตายตัวเรื่องเช็ครหัสผ่านให้ใช้ฟรีๆ เลยด้วย)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure AWS Config to trigger an evaluation that will check the compliance...**
- **ทำไมถึงถูก:** เปรี้ยงเดียวจบ! แจกใบสั่งตำรวจ `AWS Config` ให้ออกลาดตระเวน (trigger evaluation) มันจะไปไล่ส่องรหัสพนักงานทุกคนในระบบแล้วปั๊มตราประทับว่า "นาย ก. ทำถูกกฎ (Compliant), นาย ข. รหัสสั้นเกินคือกบฏ (Non-compliant)" ง่ายๆ ขี้เกียจสุดๆ ไม่ต้องเขียนโปรแกรมเอง

❌ **[ผิด] Create a Scheduled Lambda Function that will run a custom script...**
- **ทำไมถึงผิด:** เอามีดพับไปตัดต้นไม้! การบ้าพลังจ้างนักฆ่าอย่าง `Lambda` มานั่งเขียนโค้ด (custom script) แฮ็กไล่เช็คพาสเวิร์ดชาวบ้าน มันเหนื่อยลากเลือดเปล่าๆฮะ ในเมื่อ Config มีปุ่มให้กดคลิกเดียวเสร็จ มึงจะมาเขียนโค้ดทำมายย

❌ **[ผิด] Create a CloudTrail trail. Filter the result by setting the attribute to “Event Name” and lookup value to “ChangePassword”**
- **ทำไมถึงผิด:** ตาบอดคลำช้าง! `CloudTrail` มันคือกล้องวงจรปิด มันแค่ถ่ายรูปไว้ว่า "นาย A เพิ่งกดเปลี่ยนรหัสผ่านเมื่อเช้านี้นะ" แต่มัน **ไม่รู้หรอกโว้ยว่ารหัสผ่านที่เปลี่ยนไปอ่ะ มันยาวถึง 12 ตัวอักษรหรือเปล่า!** ดักควายล้วนๆ 

❌ **[ผิด] Create a rule in the Amazon CloudWatch event... Set the event name to “ChangePassword”**
- **ทำไมถึงผิด:** อีหรอบเดียวกับ CloudTrail เลยฮะ! แจ้งเตือนกระดิ่งติ๊งๆ เวลามีคนเปลี่ยนรหัสผ่านได้ปุ๊บก็จริง แต่ระบบมันเช็คไส้ในรหัสผ่านไม่ได้ว่าแม่งผ่านกฎหมาย 12 ตัวอักษรไหม สอบตกด้าน Evaluate Compliance 

---
---

## 📌 คำถามที่ 32
**โจทย์:**
A company launched a global news website that is deployed to AWS and is using MySQL RDS. The website has millions of viewers from all over the world, which means that the website has a read-heavy database workload. All database transactions must be ACID compliant to ensure data integrity.

In this scenario, which of the following is the best option to use to increase the read-throughput on the MySQL database?

**ตัวเลือก:**
- [x] Enable Amazon RDS Read Replicas
- [ ] Enable Amazon RDS Standby Replicas
- [ ] Enable Multi-AZ deployments
- [ ] Use SQS to queue up the requests

---
### 🎯 โจทย์ต้องการอะไร?
เว็บสำนักข่าวอภิมหาคนดูเยอะทั่วโลกใช้ `MySQL RDS`
ปัญหาคือเว็บคอขวดเพราะ **กระแสน้ำคนดูแห่กัน "อ่านข่าว" (read-heavy database workload)** ถล่มทลายจนฐานข้อมูลหายใจไม่ออก
คำถาม: ท่ายากไหนงัดกระดองเต่าขยายพลัง **"การอ่านข้อมูล (increase read-throughput)"** ได้สยิวที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ถ้าเจอคำว่าแก้ปัญหา "คนแย่งกันอ่าน (read-heavy)" หรือ "อยากเพิ่มพลังการอ่าน (increase read-throughput)" คู่กับ RDS = ตอบตีลังกาชี้ไปที่เจ๊ **`Read Replicas`** (ร่างโคลนเซิฟเวอร์ผีดิบสำหรับอ่านเท่านั้น) ล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Amazon RDS Read Replicas**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาวตรงโจทย์! คุณแค่กดปุ่มงอกร่างโคลนนิ่งตึก `Read Replicas` ของ RDS แล้วบอกให้ฝูงซอมบี้คนดูเว็บไปรุมแย่งกันอ่านข่าวที่ตึกแฝดเหล่านี้แทน ตึกหลัก (Primary DB) ก็จะได้เอาเวลาไปเคลียร์งานเขียนงานบันทึกข้อมูลอย่างสบายใจแฮ ยอดโหลดการอ่านกระจุยกระจายคล่องคอฮะ

❌ **[ผิด] Enable Multi-AZ deployments / Standby Replicas**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตาแล้วไปสอบ! `Multi-AZ (Standby)` คือการก๊อปปี้ดาต้าเบสอีกกล่องไว้กันผีหลอก (กันตึกบึ้มไฟไหม้ Failover) เครื่อง Standby **มันไม่อนุญาตให้คนหน้าไหนเข้าไป "อ่านข้อมููล" เด็ดขาด**! (มันปิดประตูขังไว้เป็นบอดี้การ์ดเงียบๆ) ดังนั้นมันแก้ปัญหา read-heavy ไม่ได้โว้ยย!!

❌ **[ผิด] Use SQS to queue up the requests**
- **ทำไมถึงผิด:** แกะดำหลงฝูง! `SQS` มันเอาไว้รับคิวจัดแถวคนซื้อตั๋ว (งานเขียนงานโพสต์) ไม่ได้มีความสามารถเร่งสปีดกระจายหลอดพลัง **"การอ่าน (read throughput)"** คลังแสงข้อมูลให้เร็วขึ้นเลยฮะ! 

---
---

## 📌 คำถามที่ 33
**โจทย์:**
A data analytics company, which uses machine learning to collect and analyze consumer data, is using Redshift cluster as their data warehouse. You are instructed to implement a disaster recovery plan for their systems to ensure business continuity even in the event of an AWS region outage.

Which of the following is the best approach to meet this requirement?

**ตัวเลือก:**
- [ ] Use Automated snapshots of your Redshift Cluster.
- [ ] Do nothing because Amazon Redshift is a highly available, fully-managed data warehouse which can withstand an outage of an entire AWS region.
- [x] Enable Cross-Region Snapshots Copy in your Amazon Redshift Cluster.
- [ ] Create a scheduled job that will automatically take the snapshot of your Redshift Cluster and store it to an S3 bucket...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทถังแตกเก็บโคตรโกดังข้อมูลระดับบิ๊กเบิ้มอยู่ที่ตู้เย็นยักษ์ `Amazon Redshift cluster` 
เป้าหมายคือต้องเซต **ยานอพยพหนีตาย (disaster recovery)** ที่โหดระฟ้าขนาดว่า **"ถ้าอเมริกาแผ่นดินไหวทวีปล่มสลาย (AWS region outage)"** ข้อมูลกูต้องรอด!
คำถาม: งัดฟีเจอร์พรีเมียมอันไหนของ Redshift มาเป่ามนต์คุ้มครองรอดตายนอกประเทศ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: คล้าย S3 เป๊ะ! ถ้าส่องเจอคำว่าโกดังแตก "ทั้งทวีป/ทั้งประเทศล่ม (AWS region outage/failure)" = มันจะต้องแก้ด้วยกระบวนท่าย้ายหนีข้ามทวีปที่มีคำว่า **`"Cross-Region ... "`** เสมอ! สำหรับ Redshift คือปุ่มสวรรค์ **`Cross-Region Snapshots Copy`** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Cross-Region Snapshots Copy in your Amazon Redshift Cluster.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! `Redshift` มันใจดีมีสวิตช์วิเศษให้โยกคือ `Cross-Region Snapshots Copy` พอกดโช๊ะ! มันจะแอบวาร์ปถ่ายรูปแบล็คอัพ (Snapshot) ของทวีปอเมริกา ปลิวข้ามโลกไปหลบซ่อนอยู่ในซอกตูดทวีปเอเชียโดยอัตโนมัติ! วันดีคืนดีทวีปอเมริกาล่มสลาย คุณก็แค่วิ่งไปเอเชียแล้วเสกเครื่องใหม่จาก Snapshot นี้ได้ทันที!

❌ **[ผิด] Use Automated snapshots of your Redshift Cluster.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ฟีเจอร์ Snapshot ออโต้ดิบๆ มัน "เซฟรูปถ่ายกองไว้ใน **ดินแดนประเทศเดียวกัน (same region)**" นั่นแหละ! ถ้าทวีปเมกาล่ม รูปถ่ายมึงก็ล่มสลายไฟไหม้ตายห่าไปพร้อมกับโกดังหลักจ้า! 

❌ **[ผิด] Do nothing because Amazon Redshift is a highly available... can withstand an outage of an entire AWS region.**
- **ทำไมถึงผิด:** ตอแหลหลอกเด็กชาวดอย! ไม่มีเซอร์วิสตัวไหนของ AWS ที่อยู่เฉยๆ แล้วมันจะปีกงอกหนีตายตีลังกาข้าม Region ให้มึงเองฟรีๆ หรอกนะ! (ขนาด S3 ตึกยักษ์ก็ยังล่มได้ถ้าไม่ทำ Cross-Region) อยากรอดทวีปแตกแกต้องเซตระบบเองเสมอเว้ย! 

❌ **[ผิด] Create a scheduled job that will automatically take the snapshot... and store it to an S3 bucket...**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! จะมานั่งเขียนสคริปต์สับสวิตช์ตั้งปลุกดึง Snapshot จับแบกใส่ S3 เองทุกคืนให้เหนื่อยทำแพะอะไร! ในเมื่อ AWS เค้าแจกปุ่ม Cross-region copy ให้กดฟรีกึ๊กเดียวจบเนียนๆฮะ 

---
---

## 📌 คำถามที่ 34
**โจทย์:**
To save costs, your manager instructed you to analyze and review the setup of your AWS cloud infrastructure. You should also provide an estimate of how much your company will pay for all of the AWS resources that they are using. In this scenario, which of the following will incur costs? (Select TWO.)

**ตัวเลือก:**
- [ ] Using an Amazon VPC
- [x] A running EC2 Instance
- [ ] Public Data Set
- [ ] A stopped On-Demand EC2 Instance
- [x] EBS Volumes attached to stopped EC2 Instances

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายนั่งกุมขมับดูบิลบัตรเครดิตบริษัท แล้วทุบโต๊ะสั่งคุณ: "ไอ้หอกหัก สรุปว่าก้อนขยะชิ้นไหนใน AWS ที่เก็บตังค์กูบ้างวะ ตอบมา!!" 
คำถาม: ทรัพย์สินหรือวัตถุชิ้นไหนในรายชื่อด้านล่างที่จะ **"โดนหักตังค์เลือดสาด (incur costs)"** แน่ๆ ? (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกฟรี (ไม่มีบิล) = `VPC` (โซนเน็ตเวิร์กเปล่าๆ), `Stopped EC2` (เครื่องคอมพิวเตอร์ที่กดปิดสวิตช์แล้ว - จะฟันตังค์เฉพาะตอนไฟเขียวรันเท่านั้น), `Public Dataset` ของชาวบ้านแชร์มา
- ของหน้าเลือดสูบตังค์ (มีบิล) = เครื่องคอมที่ไฟกะพริบ **`Running EC2`**, และ... **`EBS Volume (ฮาร์ดดิสก์) ที่แช่ก้นดองค้างไว้`** (ต่อให้ปิดสวิตช์คอมแล้ว แต่กินเนื้อที่ฮาร์ดดิสก์ก็ต้องจ่ายโว้ยยย!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] A running EC2 Instance**
- **ทำไมถึงถูก:** ตรรกะกระสอบทรายชนะเลิศ! ก็เปิดแอร์สตาร์ทเครื่องซีพียูสูบไฟเซิร์ฟเวอร์รันอยู่หราๆ AWS เค้าก็ต้องคิดค่าเช่าเป็นรายวินาทีอยู่แล้ว อันนี้ของตาย!

✅ **[ถูกต้อง] EBS Volumes attached to stopped EC2 Instances**
- **ทำไมถึงถูก:** กับดักคนงกขี้แตกตาย! กฎของ AWS โคตรซาดิสต์... คุณกดปิดสวิตช์คอมพิวเตอร์ (Stopped EC2) ถือว่าคุณหยุดเสียค่าเช่า CPU... **แต่!! ไอ้ตัว "ฮาร์ดดิสก์ก้อนดำปี๋ (EBS volume)" ที่มันเสียบคาตูดเครื่องไว้ AWS เค้าคิดตังค์ค่า "กินพื้นที่ตู้ล็อคเกอร์" รายเดือนทุกลมหายใจนะโว้ย!!** (อยากเลิกเสียบิลก้อนนี้ ต้องกด Terminate ระเบิดเครื่องทิ้งสถานเดียวฮะ)

❌ **[ผิด] A stopped On-Demand EC2 Instance**
- **ทำไมถึงผิด:** รอดตัวไปฉิวเฉียด! ถ้ากดปุ่ม `Stop` (แต่ไม่ระเบิดทิ้ง) AWS เขาจะใจดี "หยุดคิดเงินค่าเช่าขุมพลัง CPU ของตัวเครื่อง EC2" ไปก่อน (แต่ไปโดนฟันกะโหลกค่าฮาร์ดดิสก์ EBS ข้อเมื่อกี้แทนไง 555+)

❌ **[ผิด] Using an Amazon VPC**
- **ทำไมถึงผิด:** ลานโล่งๆ หญ้าเทียมแจกฟรี! ตัวบริการกล่องเปล่ากางอาณาเขตเน็ตเวิร์กอย่าง `Amazon VPC` สร้างฟรีกี่ตึกก็ได้ไม่มีอั้น ไม่เสียตังค์ครับ (จะเริ่มตัดบัตรก็ต่อเมื่อเอาของไปวางข้างใน หรือเสียค่าโอนถ่าย data ข้ามไปมา)

❌ **[ผิด] Public Data Set**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ของที่ป้อมยามหน้าหมู่บ้าน AWS แกะกล่องเอามาวางเป็น "ของเล่นแจกฟรีให้ชาวบ้านเอาไปทำวิจัย (Public Dataset)" เค้าไม่หน้าเลือดเก็บตังค์ค่าพื้นที่หรอกจ้า เสพฟรีโหลดฟรี

---
---

## 📌 คำถามที่ 35
**โจทย์:**
A company has a web-based order processing system that is currently using a standard queue in Amazon SQS. The IT Manager noticed that there are a lot of cases where an order was processed twice. This issue has caused a lot of trouble in processing and made the customers very unhappy. The goal is to ensure that this issue will not recur.

What solution should be implemented to prevent this from happening again in the future?

**ตัวเลือก:**
- [ ] Alter the retention period in SQS.
- [ ] Alter the visibility timeout of SQS.
- [x] Use an SQS FIFO Queue instead.
- [ ] Change the message size in SQS.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกดกริ่งขายของใช้กระบอกไม้ไผ่ `Amazon SQS (Standard queue)` รับออเดอร์ลูกค้า 
อภิมหาปัญหาส้นตีน: ไอทีจับได้ว่า **"เชี่ย! ลูกค้ากดซื้อของ 1 ออเดอร์ แต่เสือกมีกล่องส่งไปเบิ้ล 2 กล่อง (processed twice/ duplicate messages) ตลอดเลย!"** ลูกค้าด่าเละ!
คำถาม: งัดยาวิเศษขนานไหนมาเสกใส่ท่อคิว เพื่อป้องกันปัญหาข้อความเบิ้ลผีหลอก (Duplicates) อย่างเด็ดขาด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: โรคประจำตัวระดับเบาหวานของ `SQS Standard Queue` คืออาการผีบ้า **"บางครั้งแอบโคลนข้อความเบิ้ลแจกซ้ำ (At-least-once delivery / duplicates)"** แถมคิวแซงกันมั่วซั่ว
- ดาบปราบมารฟาดคอตัวเดียวคือตีบวกสวิตช์อัปเกรดเป็นคิวเทพ **`"SQS FIFO Queue" (เข้าก่อนออกก่อนเป๊ะๆ)`** เพราะไอ้นี่มันมีระบบยันต์ศักดิ์สิทธิ์ **"Exactly-Once Processing (ฆ่าเชื้อข้อความเบิ้ลทิ้ง 100%)"**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an SQS FIFO Queue instead.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เปลี่ยนสายยางเส้นกากๆ (Standard SQS) โยนทิ้งซะ แล้วควักเงินซื้อสายยางพรีเมียม `FIFO Queue` มาใช้ มันการันตีอมพระมาพูดว่า "ข้อความที่ไหลเข้ามาตายังไง จะไหลออกไปตามลำดับเป๊ะๆ (First-In-First-Out) และที่ดุดันสุดคือ **ไม่มีการเสกข้อความก๊อปปี้หน้าเหมือนผีหลอกเด็ดขาด (Exactly-Once delivery)**" คลีนกริบ ตอบโจทย์ลูกค้ายิ้มแฉ่ง!

❌ **[ผิด] Alter the visibility timeout of SQS.**
- **ทำไมถึงผิด:** เอายาหม่องทาแผลโดนแทง! `Visibility timeout` มันคือตัวจับเวลาแอบข้อความ (เวลามีคนหยิบงานใบแรกไปอ่าน จะซ่อนกระดาษไม่ให้เพื่อนมาแย่งหยิบซ้ำ) มัน "ช่วยลดโอกาส" เพื่อนแย่งงานได้... **แต่มันไม่ได้แก้ปัญหาระดับโครงสร้างที่ SQS Standard แม่งปั๊มแบงค์ปลอมก๊อปข้อความเบิ้ลแต่แรกโว้ยย!!** ฟิสิกส์โครงสร้างมันตอแหลไม่รับประกันจ้า

❌ **[ผิด] Alter the retention period in SQS / Change the message size ...**
- **ทำไมถึงผิด:** หาวเป็นดาวเป็นเดือน! การยืดเวลาดองเค็มข้อความในตู้เย็น `(retention period)` หรือยืดหดขนาดไฟล์ซองจดหมาย `(message size)`... มันไปเกี่ยวส้นตีนตะรางอะไรกับกลไกต้านโรคข้อความก๊อปปี้ละคุณน้อนนน หลงป่าหนักมากฮะปัดตกไป 

---
---

## 📌 คำถามที่ 36
**โจทย์:**
A company is running a web application on AWS. The application is made up of an Auto-Scaling group that sits behind an Application Load Balancer and an Amazon DynamoDB table where user data is stored. The solutions architect must design the application to remain available in the event of a regional failure. A solution to automatically monitor the status of your workloads across your AWS account, conduct architectural reviews and check for AWS best practices.

Which configuration meets the requirement with the least amount of downtime possible?

**ตัวเลือก:**
- [x] In a secondary region, create a global table of the DynamoDB table and replicate the auto-scaling group and application load balancer. Use Route 53 DNS failover to automatically route traffic... Set up the AWS Well-Architected Tool to easily get recommendations...
- [ ] In a secondary region, create a global secondary index of the DynamoDB table... Set up the AWS Compute Optimizer to automatically get recommendations...
- [ ] Write a CloudFormation template... In the event of a failure, deploy the template... Set up and configure the Amazon Managed Service for Prometheus...
- [ ] Write a CloudFormation template... In the event of a failure, deploy the template... Launch an Amazon Managed Grafana workspace...

---
### 🎯 โจทย์ต้องการอะไร?
แอปเซิฟเวอร์ (EC2/ALB) หลังพิงภูเขาไฟตารางเบส `DynamoDB`
ฝันร้ายบรรลัยทวีป: เจ้านายกลัวประเทศอเมริกาจมทะเล (regional failure) จึงสั่งให้แกจัดยานลี้ภัยหนีไปตึกแฝดประเทศอื่น โดย **"ถ้าล่มปุ๊บ ต้องสลับกลับมาติดจรวดให้ไวปานวอกที่สุด (least amount of downtime)!"**
คำสั่งพ่วง: แล้วก็หาปุ่มเครื่องมืออะไรก็ได้ ที่ช่วยส่องตรวจเช็คสุขภาพระบบว่า "แอดมินแม่งจัดทำถูกหลักเบสแนวทาง AWS หรือเปล่าวะ (architectural reviews / best practices)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ถ้าเจอระเบิดทวีป `DynamoDB` ข้ามทวีป (Regional failure) = ยันต์กันภัยมีอันเดียวคือเปิดโหมด **`Global Table`** (มหาตารางปั๊มรูปแฝดทุกประเทศ) 
- ทริค 2: เครื่องมือกระโถนส่องบาปว่า "ระบบหนูทำถูกหลักประเพณี AWS (Best Practices/Architectural review) หรือไม่" = นี่คือคำนิยามลอกเลียนแบบของบริการ **`AWS Well-Architected Tool`** ชัดๆ หมอผีคอนเฟิร์ม!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] In a secondary region, create a global table of the DynamoDB table and replicate the auto-scaling group and ALB. Use Route 53 DNS failover... Set up the AWS Well-Architected Tool...**
- **ทำไมถึงถูก:** ตู้ปณขูดเลขเด็ด! ตรงปกทุกมิลลิเมตร! 
1. `DynamoDB Global Table` จัดการซิงค์ขุนเขาข้อมูลข้ามประเทศเป๊ะเวอร์ 
2. ตั้งทัพก๊อปปี้ตึก ASG / ALB สแตนด์บายรอไว้ แล้วผูกสายประคำ `Route 53 DNS Failover` (ถ้าทวีปหลักดับปุ๊บ จราจรสับสวิตช์ไหลเข้าทวีปสำรองทันที = downtime ต่ำแบบกระพริบตา) 
3. พระเอกยิงปืนปิดท้าย `Well-Architected Tool` ทรงเจริญเอาไว้ออดิทประเมินความฉลาดของแอดมินว่าดีเลิศตามหลัก Best Practices!

❌ **[ผิด] In a secondary region, create a global secondary index (GSI) of the DynamoDB table... Set up the AWS Compute Optimizer...**
- **ทำไมถึงผิด:** เอากระทะฟาดหมา! ไอ้ `Global Secondary Index (GSI)` มันแค่สารบัญหนังสือโง่ๆ ที่อยู่ **"ภายในตึกทวีปเดียวกัน"** โว้ยยย ไม่ได้มีปีกบินไปสแตนด์บายข้ามประเทศ! แถม `Compute Optimizer` มันเป็นไอ้บ้าเครื่องคิดเลขลดไซส์สเปค EC2 เสือกไม่เกี่ยวกับการตรวจสแกน Best Practice ล้วนๆ

❌ **[ผิด] Write a CloudFormation template... In the event of a failure, deploy the template in a secondary region... (ทั้งช้อยส์ Prometheus และ Grafana)**
- **ทำไมถึงผิด:** ห้าวจัดสลัดล้ม! การมักง่ายนั่งอม "สคริปต์สวดมนต์ CloudFormation" เอาไว้ใต้หมอน พอทวีปล่มสลายปุ๊บ... **ค่อยตื่นมากู้ภัยรันโค้ดก่อสร้างเสาเข็มทำตึกตอกเสา ALB/EC2 ใหม่หมดตั้งแต่ศูนย์ในอีกประเทศนึง (Pilot Light / Backup Restore)** ถุยย! กว่าตึกจะเสร็จครึ่งชั่วโมงอัป ลูกค้าด่าเละขี้แตกจ้า! (มันไม่ตอบโจทย์ "least amount of downtime (โคตรไว)" เลยสักนิด)

---
---

## 📌 คำถามที่ 37
**โจทย์:**
A company has a web application hosted in AWS cloud where the application logs are sent to Amazon CloudWatch. Lately, the web application has been encountering some errors which can be resolved simply by restarting the instance.

What will you do to automatically restart the EC2 instances whenever the same application error occurs?

**ตัวเลือก:**
- [ ] First, look at the existing Flow logs for keywords related to the application error to create a custom metric. Then, create a CloudWatch alarm... calls a Lambda function...
- [ ] First, look at the existing CloudWatch logs for keywords related to the application error to create a custom metric. Then, create an alarm in Amazon SNS...
- [ ] First, look at the existing Flow logs for keywords related to the application error to create a custom metric. Then, create a CloudWatch alarm that invokes an action...
- [x] First, look at the existing CloudWatch logs for keywords related to the application error to create a custom metric. Then, create a CloudWatch alarm for that custom metric which invokes an action to restart the EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
เซิร์ฟเวอร์รันแอปผีบ้าโยนประวัติขยะหน้าจอไปสุมไว้ที่ `CloudWatch Logs` ตลอดเวลา
ปัญหาคือแอปแม่งชอบน็อคหลับลึกเออเร่อพ่นคำว่า "ERROR" ออกมา ซึ่งวิธีรักษาปัญญาอ่อนสุดคือ **"แค่เตะปลั๊กปิดเปิดคอมใหม่ (restarting instance) แม่งก็หายแล้ว"**
คำถาม: ท่ายากไหน งัดกลไกให้ระบบมัน **"ส่องจับผิดคำว่า ERROR แล้วเตะปลั๊กคอม (restart) อัตโนมัติเอง"** โดยมือแอดมินไม่ต้องแวะมาเปื้อน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ถ้าจะจับผิด "ด่าคำหยาบ (keywords/errors) ในส้วมประวัติแอป (application logs)" มึงต้องไปส่องดูในถาด **`CloudWatch logs`** (ระวังโดนหลอกด้วยคำว่า Flow logs เพราะไอ้นั่นมันประวัติสายแลนเน็ตเวิร์ก VPC รูกุญแจ IP)
- ทริค 2: สั่งบอทเตะปลั๊กคอมปิดเปิดเครื่อง = สิ่งมหัศจรรย์แจกฟรีคือ **`CloudWatch Alarm (Action: EC2 reboot/restart)`** กรรไกรตัดสายไฟไม่ต้องไปง้อเสกเขียนโค้ด Lambda ให้เหนื่อยหรอกเฟ้ยย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] First, look at the existing CloudWatch logs for keywords... create a CloudWatch alarm... which invokes an action to restart the EC2 instance.**
- **ทำไมถึงถูก:** คอมโบโง่แต่ขิงข่า! เริ่มแรกมึงตั้งยามตาถลนส่องอ่านใน `CloudWatch logs` หาคำว่า 'ERROR' พอครบเป้าปุ๊บให้มันงอกแต้มกราฟผี (Metric filter)... พอตารางกราฟพุ่งปี๊ดทะลุปรอท ก็สั่งให้ไอ้กระดิ่งบอดี้การ์ด `CloudWatch Alarm` แหกปากดังลั่น แล้วเตะก้านคอสวิตช์ `Action: EC2 Reboot` ปิดเปิดเครื่องแม่งเลย จบปัญหาแบบสมูทสุดๆ (มีเมนู EC2 action ให้จิ้มสำเร็จรูปฟรีๆเลยนะเออ)

❌ **[ผิด] First, look at the existing CloudWatch logs... create an alarm in Amazon SNS...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตาแล้วไปสอบ! คุณพระคุณเจ้า... องค์กรกระบอกเสียงจดหมายขาว `Amazon SNS` มัน **"สร้างกระดิ่งเตือนภัย (Alarm) ตัวเองไม่ได้หรอกนะโว้ย"** (หน้าตามันเป็นแค่ท่อส่งอีเมล/SMS ธรรมดา) หน้าที่ Alarm ผูกขาดเป็นของลูกพี่ CloudWatch ล้วนๆ

❌ **[ผิด] First, look at the existing Flow logs for keywords... (ทั้งช้อยส์)**
- **ทำไมถึงผิด:** ขุดหลุมฝังศพตัวเองในทะเลทราย! `VPC Flow Logs` มันคือสมุดข่อยยามหน้าหมู่บ้าน จดแค่ป้ายทะเบียนรถ "IP ขาเข้า 1.x.x.x ซัดวิ่งออก IP 2.x.x.x ไปพอร์ต 80" มันไม่รู้เรื่องห่าเหวอะไรกับ **"ไส้ใน Application ก่นด่าคำว่า ERROR (Application logs/keyword)"** เลยสักกระจุกเดียว! มั่วชิบเป๋ง!

---
---

## 📌 คำถามที่ 38
**โจทย์:**
A Solutions Architect is designing a monitoring application which generates audit logs of all operational activities of the company's cloud infrastructure. Their IT Security and Compliance team mandates that the application retain the logs for 5 years before the data can be deleted.

How can the Architect meet the above requirement?

**ตัวเลือก:**
- [ ] Store the audit logs in an Amazon S3 bucket and enable Multi-Factor Authentication Delete (MFA Delete) on the S3 bucket.
- [ ] Store the audit logs in an EFS volume and use Network File System version 4 (NFSv4) file-locking mechanism.
- [ ] Store the audit logs in an EBS volume and then take EBS snapshots every month.
- [x] Store the audit logs in a Glacier vault and use the Vault Lock feature.

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินโดนอัยการศาลทหารสั่งชี้หน้า: "ไอ้ประวัติสมุดจดบันทึกจับผิดพนักงาน (audit logs) เนี่ย... มึงต้องกางยันต์คุ้มครอง **ห้ามลบทิ้งเด็ดขาดแช่ดองกะปิจนกว่าจะครบ 5 ปีดึกดำบรรพ์นะโว้ย (retain 5 years / compliance)!** ถ้าใครมือลั่นลบ พ่อจะยิงทิ้ง!!"
คำถาม: งัดเครื่องมือสวรรค์ตึกไหนมาเก็บกดล็อกกุญแจมือซ่อนของพวกนี้ดี ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียระดับโลก! ทันทีที่ข้อสอบขู่กรรโชกด้วยคำว่า **"ห้ามลบ/ห้ามแก้/ต้องแช่แข็งกี่ปีตามกฎหมาย (compliance / retain / immutable)"** = ต้องส่งมันไปตู้แช่แข็งเนื้อหมา `Glacier Vault` พร้อมกดปุ่มระเบิดสะพาน **`Vault Lock`** ล็อกกุญแจสลักโยนทิ้งทะเลหน้าด้านๆ! ต่อให้เอาพระอินทร์มางัดก็ลบไฟล์ไม่ได้จนกว่าจะหมดเวลา 5 ปีชัวร์ๆ ยันเงา!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Store the audit logs in a Glacier vault and use the Vault Lock feature.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! `Glacier Vault Lock` มันสร้างมาเพื่อตอบสนองตัณหาความหวาดระแวงของพวกออดิทและกฎหมาย WORM (Write Once Read Many)! พอมึงเขียนกฎใส่รูกุญแจ (เช่น ห้ามลบ 5 ปีโว้ย) แล้วสับสวิตช์ Lock กรึ๊บปุ๊บ!!... มนตรานี้จะศักดิ์สิทธิ์อมตะตลอดกาล **ไม่สามารถแก้ไขหรือรื้อถอนได้อีกต่อไป (Immutable)** แอดมินมือสั่นกะลบลักไก่ก็หน้าแหกกดไม่ได้ จบปิ้ง ตอบโจทย์ 100%

❌ **[ผิด] Store the audit logs in an Amazon S3 bucket and enable Multi-Factor Authentication Delete (MFA Delete)**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! ระบบงอก OTP `MFA Delete` มันคือยันต์กันผีมือลั่นเฉยๆ "ถ้ากูมีโทรศัพท์กู ก็แค่กดยืนยันรหัส OTP กูสับลบทิ้งไฟล์เล่นเมื่อไหร่ก็ได้" แล้วมันไปตอบโจทย์กติกา "ห้ามลบเด็ดขาด 5 ปีหน้าดื้อๆ (compliance)" ของศาลไคฟงหาแมวอะไร๊!! ลบได้อยู่ดีถ้ากูแค้นดึงปลั๊ก 

❌ **[ผิด] Store the audit logs in an EBS volume... / Store the audit logs in an EFS volume...**
- **ทำไมถึงผิด:** ท่าดัดหลังรันทดจัด! เสือกโง่เอากล่องดำประวัติแห่งชาติไปเก็บในฮาร์ดดิสก์สลัมอย่าง `EBS` หรือหอยหลอดเน็ตเวิร์ก `EFS` ... กูบอกเลยฮะ ไอพนักงานขีดเขียนชั่วร้ายมันแค่ SSH ล็อคอินเข้าเครื่องคอม พิมพ์คำสั่ง `rm -rf /` หมัดเดียว ไฟล์รัฐบาลมึงหายตัวเป็นผงแฟ้บทันที! ไม่มีหน้าไหนมาช่วยคุ้มกะลาหัวไฟล์พวกนี้ได้หรอกฮะ พังพินาศสึนามิ

---
---

## 📌 คำถามที่ 39
**โจทย์:**
A real-time data analytics application is using AWS Lambda to process data and store results in JSON format to an S3 bucket. To speed up the existing workflow, you have to use a service where you can run sophisticated Big Data analytics on your data without moving them into a separate analytics system.

Which of the following group of services can you use to meet this requirement?

**ตัวเลือก:**
- [ ] Amazon X-Ray, Amazon Neptune, DynamoDB
- [x] Amazon Athena, Amazon Redshift Spectrum, AWS Glue
- [ ] Amazon Glue, Amazon Redshift, Amazon S3
- [ ] Amazon Neptune, DynamoDB DAX, Amazon Redshift Spectrum

---
### 🎯 โจทย์ต้องการอะไร?
กุนซือยัดไฟล์ขี้หมาแห้ง JSON กองเป็นภูเขาทองหมกไว้ในตุ่มน้ำ `Amazon S3` เรียบร้อยละ
โจทย์สั่งงัดแงะ: บอสขี้เกียจลากข้อมูลหนีไปแอปอื่น เลยสั่งว่า **"หาเครื่องมือเทวดาไรก็ได้ ที่สามารถมุดหัวเข้าไปใช้พลานุภาพ Big Data ตะกุยดูดวิเคราะห์ไฟล์ดิบๆ ในบ่อ S3 ได้เลยทันที! (without moving them into a separate analytics system)"**
คำถาม: แก๊งค์มาเฟีย 3 หน่อบริการตัวไหน ที่มันล้วงตับ S3 สดๆ ได้เลย ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ขบวนการเซ็นไต 3 สีที่เกิดมาเพื่อรวมพลังกันงัดแงะเจาะไฟล์ (JSON, CSV, Parquet) คาบ่อโคลน S3 (สวด SQL สดๆ) คือ
1. **`Amazon Athena`** (ยิง SQL สดๆ เข้าไฟล์ S3)
2. **`Amazon Redshift Spectrum`** (ร่างทรงของ Redshift ที่ล้วงทะลุออกมากินขี้ใน S3 ได้)
3. **`AWS Glue`** (นักแปลงร่างจัดระเบียบหน้าสือสารบัญ catalog ชี้เป้าว่าไฟล์อยู่ตรงไหนให้ไอ้สองตัวบนอ่าน)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon Athena, Amazon Redshift Spectrum, AWS Glue**
- **ทำไมถึงถูก:** พระเอกคู่หูพังประตูเมือง! `Athena` ควงอีโต้ใช้ภาษา SQL สับหน้าไฟล์ใน S3 ตรงๆ ส่วน `Redshift Spectrum` ก็เป็นหนวดหมึกของโกดัง Redshift ที่เอื้อมมือมางมหาเหรียญใน S3 ตรงๆ ได้เช่นกัน โดยมีลูกหาบ `AWS Glue` คอยกางร่มช่วยจัดหน้าสารบัญให้ส่องเจอง่าย ไม่ต้องกระเดียดขนย้ายข้อมูลออกจากส้วม S3 ไปไว้ที่อื่นให้เสียค่าน้ำมันเลย! ตีแตกแหกเป้า

❌ **[ผิด] Amazon Glue, Amazon Redshift, Amazon S3**
- **ทำไมถึงผิด:** แกล้งโง่หน้าซื่อ! คุณหลอกดาว! ตัวประหลาดในคอกนี้คือ `Amazon Redshift (ร่างตัวแม่ปรกติ)`... กฎของตัวแม่คือ **"ถ้ามึงจะวิเคราะห์ดาต้า มึงต้องแบกกระสอบข้อมูลกระเตงๆ ยัดพ่นโหลดอัดเข้าไปค้างในท้องตู (โหลด Data เข้า Cluster) เสียก่อน"** มันขัดกับสัจธรรมโจทย์คำสั่งที่บอกว่า "ห้ามขนย้าย (without moving)" นะโว้ยย!! พลาดนิดเดียวสอบตกฮะ 

❌ **[ผิด] Amazon X-Ray, Amazon Neptune, DynamoDB / Amazon Neptune, DynamoDB DAX...**
- **ทำไมถึงผิด:** เอากะปิมาล้างหน้า! `Neptune` เป็นศาลเจ้าดาต้าเบสแบบใยแมงมุม (Graph) และ `DynamoDB (DAX)` ก็เป็นศาลพระภูมิแบบ Key-Value ... ไอ้สองตัวนี้มันเกิดมาทำหาแมวอะไรกับการกระทืบวิเคราะห์ Big Data ในส้วม S3 ฟระ! ไม่เกี่ยวข้องกันสักเสี้ยวตูดฮะ 

---
---

## 📌 คำถามที่ 40
**โจทย์:**
A company is using the AWS Directory Service to integrate their on-premises Microsoft Active Directory (AD) domain with their Amazon EC2 instances via an AD connector. The below identity-based policy is attached to the IAM Identities that use the AWS Directory service:

```json
{
 "Version":"2012-10-17",
 "Statement":[
  {
   "Sid":"DirectoryTutorialsDojo1234",
   "Effect":"Allow",
   "Action":["ds:*"],
   "Resource":"arn:aws:ds:us-east-1:987654321012:directory/d-1234567890"
  },
  {
   "Effect":"Allow",
   "Action":["ec2:*"],
   "Resource":"*"
  }
 ]
}
```

Which of the following BEST describes what the above resource policy does?

**ตัวเลือก:**
- [ ] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory name of: DirectoryTutorialsDojo1234
- [x] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory ID: d-1234567890
- [ ] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory ID: 987654321012
- [ ] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory ID: DirectoryTutorialsDojo1234

---
### 🎯 โจทย์ต้องการอะไร?
โจทย์แจกหน้าต่างโพยมหายันต์ JSON (IAM Policy) ท่อนึงมาให้จ้อง
คำถาม: ทักษะวิชาอ่านตาบอดของมึง... บรรทัดยันต์นี้มันบอกใบ้ว่า **"อนุญาตให้กระบี่ฟาดฟันท่า `ds:*` ใส่ทะลุเข้ารหัส Directory ID ตรงไหนในเป้าหมาย (Resource) วะ"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกคะแนนอนุบาล 3! หัดดูโครงสร้าง `ARN (Amazon Resource Name)` ของพาวเวอร์เรนเจอร์: `arn:aws:ds:us-east-1:[Account_ID]:directory/[Directory_ID]`
- ดังนั้น ตัวเลขยึกยือที่ห้อยติ่งท่อนรูตูดสุดท้ายหลังคำว่า `directory/` ก็คืออีรหัส **`d-1234567890 (Directory ID)`** นั่นเอง!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory ID: d-1234567890**
- **ทำไมถึงถูก:** ตรรกะกระสอบทรายชนะเลิศ! ก็เห็นทนโท่ว่าหลังก้นกระทะคำว่า `directory/` มีขี้ก้อนชื่อ **`d-1234567890`** ห้อยต่องแต่งอยู่ มันก็คือรหัสประจำตัวของ Directory ID ที่กฎบ้าๆ บวมๆ อันนี้มันเล็งลูกปืนอนุญาตพ่นไฟใส่นั่นแหละ ตอบตรงปกเป๊ะไม่แถฮะ

❌ **[ผิด] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory name of: DirectoryTutorialsDojo1234**
- **ทำไมถึงผิด:** หลอกเด็กร้องไห้! ไอ้คำว่า `DirectoryTutorialsDojo1234` มึงเหลือบตาไปดูบรรทัดบนสิเว้ย มันเป็นแค่ป้ายแปะหัวท้าย (Statement ID - `Sid`) ที่ใส่ไว้เล่นๆ สวยๆ ไม่ได้เป็นชื่อก้อนหิน Directory Name หรือเกี่ยวส้นตีนท่อนเป้าหมาย (Resource) เลยสักเสี้ยวหน้า!

❌ **[ผิด] Allows all AWS Directory Service (ds) calls as long as the resource contains the directory ID: 987654321012**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้เลขพรืดๆ ท่อนกลาง `987654321012` เค้าสงวนไว้สำหรับ "บัตรประจำตัวประชาชนไอดีของ 12 หลักบัญชีคุณ (Account ID)" เสมอ! มันไม่ใช่รหัส Directory ID โว้ย! สอบตกวิชาแกะรอยขี้แมว ARN อนาถฮะ

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 5: ข้อ 41 - 50)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 41
**โจทย์:**
A company deployed an online enrollment system database on a prestigious university, which is hosted in RDS. The Solutions Architect is required to monitor the database metrics in Amazon CloudWatch to ensure the availability of the enrollment system.

What are the enhanced monitoring metrics that Amazon CloudWatch gathers from Amazon RDS DB instances which provide more accurate information? (Select TWO.)

**ตัวเลือก:**
- [ ] CPU Utilization
- [x] RDS child processes
- [ ] Database Connections
- [ ] Freeable Memory
- [x] OS processes

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินระบบลงทะเบียนเรียนมหาวิทยาลัยใช้ฐานข้อมูล `RDS` 
โจทย์ถามตรงๆ ทื่อๆ: **"มึงรู้ไหมว่าไอ้หน้าต่างกราฟพรีเมียม Enhanced Monitoring ของ RDS น่ะ... มันใช้จับผิดกราฟอะไรได้บ้าง ที่กราฟออโต้พื้นฐาน CloudWatch ทั่วไปมันจับไม่ได้วะ?"** (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของพื้นฐาน (CloudWatch Metrics ปกติ) = `CPU`, `RAM (Freeable Memory)`, `Database Connections` (พวกนี้แจกฟรีดูได้เลย)
- ของพรีเมียม (Enhanced Monitoring) = ฟีเจอร์ล้วงตับลึกถึงขั้น **"กระบวนการทำงานในระบบปฏิบัติการ (Processes)"** ดังนั้นอะไรที่มีคำว่า **`OS processes`** หรือ **`RDS child processes`** ใช่ทั้งหมด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] RDS child processes / OS processes**
- **ทำไมถึงถูก:** เคาะกะโหลกจำ! พลังของ `Enhanced Monitoring` คือการฝังสายลับ (Agent) เข้าไปในตัวเครื่องคอม (OS) ของ RDS โดยตรง ทำให้มันสามารถแอบดูตารางการทำงานของ "พนักงานในเครื่อง (OS processes)" และ "ลูกสมุนของแม่ทัพ RDS (RDS child processes)" ได้ละเอียดยิบเป็นรายวินาที ซึ่งกราฟ CloudWatch ปกติมันอยู่แค่นอกกำแพงมองไม่เห็นไส้ในพวกนี้ฮะ!

❌ **[ผิด] CPU Utilization / Database Connections / Freeable Memory**
- **ทำไมถึงผิด:** ของแจกฟรีหน้างาน! กราฟกระจอกพวกนี้คือ `Standard CloudWatch Metrics` ที่ระบบมันส่งมารายงานออโต้อยู่แล้ว ไม่จำเป็นต้องเปิดอัลติ Enhanced Monitoring ก็ดูได้ฮะ 

---
---

## 📌 คำถามที่ 42
**โจทย์:**
A technology company is building a new cryptocurrency trading platform... During the first week, the engineer began creating CloudFormation YAML scripts to define all of the AWS resources needed for the application. The manager was shocked that the engineer hadn't set up the EC2 instances, S3 buckets, and other AWS resources immediately. He doesn't understand the purpose of the text-based scripts the engineer has written and has asked for clarification.

In this scenario, what are the benefits of using Amazon CloudFormation that the manager should know to address his concerns? (Select TWO.)

**ตัวเลือก:**
- [x] Allows you to model your entire infrastructure in a text file
- [x] Enables modeling, provisioning, and version-controlling of your entire AWS infrastructure
- [ ] Using CloudFormation itself is free, including the AWS resources that have been created.
- [ ] Provides highly durable and scalable data storage
- [ ] A storage location for the code of your application

---
### 🎯 โจทย์ต้องการอะไร?
ผู้จัดการบริษัทเทรดคริปโตเดินมาด่าวิศวกร: "ไอ้ห่า กูจ้างมึงมาสร้างเซิร์ฟเวอร์ (EC2, S3) ทำไมมึงมัวแต่นั่งพิมพ์สคริปต์ภาษาต่างด้าว (YAML) อยู่ได้วะ นั่งเทียนเขียนนิยายหรอ!?"
คำถาม: งัดสรรพคุณข้อดีของท่ายาก **`Amazon CloudFormation`** มาเถียงเจ้านายให้หน้าหงายที (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: สโลแกนหากินของ `CloudFormation` คือ **"Infrastructure as Code (IaC)"**! มันคือการเสกตึกเสกเซิร์ฟเวอร์ด้วยการพิมพ์โค้ดลงในหน้ากระดาษ **`text file`** มันเลยสามารถทำ **`version-controlling (เซฟประวัติย้อนหลังได้เหมือนเขียนโปรแกรม)`** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Allows you to model your entire infrastructure in a text file / Enables modeling, provisioning, and version-controlling of your entire AWS infrastructure**
- **ทำไมถึงถูก:** ตอกหน้าบอสไปเลยฮะ! "บอสครับ... ที่ผมนั่งพิมพ์เนี่ย มันคือวิชาเสกตึก! ผมสามารถเอาสคริปต์แผ่นนี้ (text file) ไปกดรันปุ๊บ AWS มันจะสร้าง EC2 S3 เน็ตเวิร์กต่างๆ ให้เสร็จสรรพอัตโนมัติ (provisioning) แถมพอมันเป็นก้อนโค้ด ผมก็เอาไปโยนใส่ Github เพื่อย้อนประวัติเวลาพัง (version-controlling) ได้ด้วย ดีกว่าไปนั่งคลิกมั่วๆ หน้าเว็บนะเว้ย!"

❌ **[ผิด] Using CloudFormation itself is free, including the AWS resources that have been created.**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้บริการตอกเสาเข็ม CloudFormation น่ะมันให้ยืมเครื่องมือฟรีก็จริง **แต่ไอ้เซิร์ฟเวอร์ EC2 หรือตึก S3 ที่มึงเสกขึ้นมาน่ะ... AWS แม่งเก็บเงินค่าเช่าปกติตามมิเตอร์นะโว้ยยย!** ของฟรีไม่มีโลก!

❌ **[ผิด] Provides highly durable and scalable data storage / A storage location for the code...**
- **ทำไมถึงผิด:** หาวเป็นดาวเป็นเดือน! CloudFormation มันคือ "พิมพ์เขียวก่อสร้าง" ไม่ใช่ "ตู้เย็นเก็บของ (Storage)" หรือหน้ากระดานเก็บซอร์สโค้ดแอพ (CodeCommit/S3)! โดนหลอกจับแพะชนแกะฮะ

---
---

## 📌 คำถามที่ 43
**โจทย์:**
A tech company currently has an on-premises infrastructure. They are currently running low on storage and want to have the ability to extend their storage using the AWS cloud.

Which AWS service can help them achieve this requirement?

**ตัวเลือก:**
- [ ] Amazon EC2
- [ ] Amazon Elastic Block Storage
- [x] AWS Storage Gateway
- [ ] Amazon SQS

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทนึงมีตึกคอมพิวเตอร์และฮาร์ดดิสก์อยู่ที่ออฟฟิศ (on-premises)
ปัญหาคือ: "เชี่ย! ฮาร์ดดิสก์ที่ออฟฟิศแม่งจะเต็มแล้วว!"
คำถาม: ท่ายากไหนที่สามารถ **"ต่อสายยางขยายพื้นที่ความจุ (extend storage) จากออฟฟิศ พุ่งทะลุมิติไปยืมพื้นที่บน AWS cloud"** ได้แบบเนียนๆ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรง! เมื่อไหร่ก็ตามที่โจทย์บ่นเรื่องออฟฟิศฮาร์ดดิสก์เต็ม แล้วอยาก **"ต่อท่อ/ขยายพื้นที่ (extend storage) วิ่งขึ้น Cloud (On-premises to AWS)"** ตัวละครเดียวในโลก AWS ที่ทำหน้าที่นี้คือประตูมิติ **`AWS Storage Gateway`** ล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Storage Gateway**
- **ทำไมถึงถูก:** นามบัตรตรงปก! `Storage Gateway` มันคือแผ่นซอฟต์แวร์ยันต์แปะหน้าประตูออฟฟิศ พอคุณเอาไฟล์โยนใส่ฮาร์ดดิสก์แผ่นนี้ มันจะแอบวาร์ปข้อมูลดัดหลังขโมยพื้นที่ในตู้เย็นยักษ์ (Amazon S3) บนคลาวด์มาเก็บให้คุณแบบชิลๆ ทำให้ฮาร์ดดิสก์ที่ออฟฟิศคุณเหมือนมีพื้นที่ลึกไร้ก้นบึ้ง (extend storage) พนักงานใช้งานได้เนียนๆ เหมือนฮาร์ดดิสก์ธรรมดาเป๊ะ!

❌ **[ผิด] Amazon Elastic Block Storage (EBS) / Amazon EC2**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! `EBS` มันคือฮาร์ดดิสก์ที่ **"เอาไว้เสียบก้นตูดเครื่องคอม EC2 บนคลาวด์เท่านั้น"**! มึงไม่สามารถเบิกมันมาเสียบก้นกะละมังที่ออฟฟิศ on-premises ได้โว้ยย!! 

❌ **[ผิด] Amazon SQS**
- **ทำไมถึงผิด:** หลุดโลกไปไกล! SQS มันคือท่อคิวสั่งข้าวผัดกะเพรา เอามาขยายพื้นที่เก็บไฟล์บ้าบออะไรล่ะฮะ 

---
---

## 📌 คำถามที่ 44
**โจทย์:**
A large multinational investment bank has a web application that requires a minimum of 4 EC2 instances to run to ensure that it can cater to its users across the globe. You are instructed to ensure fault tolerance of this system.

Which of the following is the best option?

**ตัวเลือก:**
- [x] Deploy an Auto Scaling group with 2 instances in each of 3 Availability Zones behind an Application Load Balancer.
- [ ] Deploy an Auto Scaling group with 2 instances in each of 2 Availability Zones behind an Application Load Balancer.
- [ ] Deploy an Auto Scaling group with 1 instance in each of 4 Availability Zones behind an Application Load Balancer.
- [ ] Deploy an Auto Scaling group with 4 instances in one Availability Zone behind an Application Load Balancer.

---
### 🎯 โจทย์ต้องการอะไร?
แอปโคตรสำคัญของธนาคาร มีกฎเหล็กพระราชทาน: **"กติกาคือต้องมีเครื่อง (EC2) วิ่งหล่อๆ อย่างน้อย 4 เครื่อง (minimum of 4) เสมอ!"** ขาดแม้แต่เครื่องเดียวแอปจะล่มตายห่า!
คำถาม: คุณต้องจัดขบวนทัพแบบไหน เพื่อให้บรรลุเป้าหมาย **"ทนทานต่ออุกกาบาตชนตึกพัง (Fault tolerance)"** (แปลว่า: สมมติตึกพังไป 1 โซน, เครื่องที่รอดชีวิต "ต้องเหลือรอดอยู่กะเตงแอปให้ได้อย่างน้อย 4 เครื่องเป๊ะๆ ขึ้นไป") ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: วิชาคณิตศาสตร์เด็กประถมเรื่อง `Fault Tolerance` (ทนอุกกาบาต 1 AZ พัง):
สูตรจำ: **"จำนวนเครื่องทั้งหมดหักลบด้วยเครื่องใน 1 โซน(AZ) ที่พังทิ้งไป... ผลลัพธ์ต้อง >= เครื่องขั้นต่ำที่โจทย์ขอ"**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy an Auto Scaling group with 2 instances in each of 3 Availability Zones...**
- **ทำไมถึงถูก:** คำนวณตามสูตร!
จัดทัพ 2 เครื่อง ใน 3 โซน (รวมมี 2+2+2 = 6 เครื่อง)
สมมติซวยสุดๆ อุกกาบาตชนโซนที่ 1 พังราบคาบ!! (พัง 2 เครื่อง)
**เหลือรอด = 4 เครื่อง** (โซนละ 2 เครื่องจาก 2 โซนที่รอด) ... ชนะเลิศ!! รอดตายฉิวเฉียดตามเป้า 4 เครื่องขั้นต่ำเป๊ะๆ ระบบไม่ล่มฮะ

❌ **[ผิด] Deploy an Auto Scaling group with 2 instances in each of 2 Availability Zones...**
- **ทำไมถึงผิด:** ตกคณิตศาสตร์!
ตอนแรกมี 2 โซน โซนละ 2 เครื่อง (รวม 4 เครื่อง) -- พอดีเป๊ะ!
แต่ถ้าอุกกาบาตชนพังไป 1 โซนปุ๊บ... **มึงจะเหลือรอดแค่ 2 เครื่อง!** ขาดโควต้า 4 เครื่องขั้นต่ำปุ๊บ แอปล่มขี้แตกคาที่จ้า

❌ **[ผิด] Deploy an Auto Scaling group with 1 instance in each of 4 Availability Zones...**
- **ทำไมถึงผิด:** อีหรอบเดิม!
ตอนแรกมี 4 โซน โซนละ 1 เครื่อง (รวม 4 เครื่อง)
ตึกพัง 1 โซนปุ๊บ... **เหลือรอด 3 เครื่อง!** ไม่ถึงเป้า 4 เครื่อง ล่มพังวินาศ

❌ **[ผิด] Deploy an Auto Scaling group with 4 instances in one Availability Zone...**
- **ทำไมถึงผิด:** สภาพพพ!! เอากระเช้าไข่ไปวางรวมกัน 4 ใบในตู้เดียว ถ้าตู้นั้นโดนสึนามิกวาด (Availability Zone ดับ) = **เหลือ 0 เครื่อง!** โคตรมักง่ายฮะ สอบตกวิชาสถาปนิกยับๆ

---
---

## 📌 คำถามที่ 45
**โจทย์:**
A multinational bank is storing its confidential files in an S3 bucket... multiple files have been uploaded without 256-bit Advanced Encryption Standard (AES) server-side encryption. For added protection, the encryption key must be automatically rotated every year. The solutions architect must ensure that there would be no other unencrypted files uploaded in the S3 bucket in the future.

Which of the following will meet these requirements with the LEAST operational overhead?

**ตัวเลือก:**
- [x] Create an S3 bucket policy that denies permissions to upload an object unless the request includes the s3:x-amz-server-side-encryption": "AES256" header. Enable server-side encryption with Amazon S3-managed encryption keys (SSE-S3) and rely on the built-in key rotation feature of the SSE-S3 encryption keys.
- [ ] Create a new customer-managed key from the AWS Key Management Service (AWS KMS)... Manually rotate the KMS key and every year.
- [ ] Create a Service Control Policy (SCP) for the S3 bucket that rejects any object uploads unless... modify the built-in key rotation feature of the SSE-S3 encryption keys to rotate the key yearly.
- [ ] Create an S3 bucket policy for the S3 bucket that rejects any object uploads unless the request includes the s3:x-amz-server-side-encryption":"aws:kms" header. Enable the S3 Object Lock in compliance mode...

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารสยองขวัญพบว่า พนักงานแม่งชอบหิ้วไฟล์ดิบๆ (ไม่ได้เข้ารหัส) โยนอัดใส่ `S3 bucket` ! 
คำสั่งศาลไคฟง:
1. สาปแช่ง (Deny) หน้าไหนที่อัพโหลดไฟล์แล้วไม่ใช้วิธีเข้ารหัสแบบ **`AES256 (SSE-S3)`** 
2. ตัวกุญแจเข้ารหัส ต้อง **"หมุนเปลี่ยนใหม่ฟรีอัตโนมัติทุกๆ 1 ปี (automatically rotated every year)"** โดยแอดมินต้องขี้เกียจที่สุด (Least operational overhead)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: บีบคอห้ามวางไฟล์ถ้าไม่เข้ารหัส = ท่าบังคับคือต้องเขียนยันต์ติดหน้าตู้เย็น **`S3 Bucket Policy (Deny -> s3:x-amz-server-side-encryption": "AES256")`** 
- ทริค 2: กุญแจขี้เกียจหมุนเอง = จงใช้กุญแจหลวงที่แจกฟรี **`SSE-S3 (Amazon S3-managed encryption keys)`** เพราะกฎของกุญแจหลวงหลวงคือ **มันแอบสับเปลี่ยนหมุนรหัสบาร์โค้ดให้เองฟรีๆ เป๊ะๆ ทุก 1 ปีอยู่แล้ว!!** (ไม่ต้องเอื้อมมือไปกดตั้งค่าเองเลยฮะ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an S3 bucket policy that denies permissions... header AES256. Enable server-side encryption with SSE-S3 and rely on the built-in key rotation feature...**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! จัดยันต์ `Bucket Policy` ปฏิเสธไฟล์ขยะ (AES256) ป้องกันพนักงานโง่ๆ อัพไฟล์ดิบได้รัดกุม แล้วเกาะกระแสขี้เกียจโดยใช้บริการกุญแจหลวง `SSE-S3` เพราะมันแอบใช้เวย์หมุนรหัสยิกๆ อัตโนมัติทุกรอบปีอยู่แล้วแบบเนียนกริบ (built-in key rotation) แอดมินนอนกระดิกเท้ากินเงินเดือนฟรีฮะ

❌ **[ผิด] Create a new customer-managed key from AWS KMS... Manually rotate the KMS key and every year.**
- **ทำไมถึงผิด:** ขยันหาเหาใส่หัว! ในเมื่อเค้าสั่งว่าต้อง least operational overhead (สบายสุด) มึงจะมาเสนอหน้าเหนื่อย "กดหมุนกุญแจเองด้วยมือ (manually rotate) ทุกปี" ไปเพื่ออออ!! แถมลืมใส่ Bucket policy กีดกันคนอัพไฟล์ดิบอีก สอบตก!

❌ **[ผิด] Create a Service Control Policy (SCP) for the S3 bucket... and modify the built-in key rotation feature of the SSE-S3...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `SCP` มันคือยันต์ระดับศาลพระภูมิ (ห้ามตั้งแต่ระดับ Organization/Account) ไม่ได้ลงดีเทลลึกระดับประตูถังน้ำ S3 เค้าใช้ Bucket Policy กันโว้ย! และที่สำคัญ... กุญแจหลวง SSE-S3 **"แอดมินไม่มีสิทธิ์ไปกดตั้งค่าเปลี่ยนความถี่รอบการหมุน (modify) ของมันหรอกนะ!"** AWS เค้าล็อกคอหมุน 1 ปีให้เองอัตโนมัติ แก้ไขไส้ในไม่ได้ฮะ

❌ **[ผิด] Create an S3 bucket policy... includes the header "aws:kms"... Enable the S3 Object Lock...**
- **ทำไมถึงผิด:** มั่วซั่วสุกี้รวมมิตร! โจทย์ขอ AES-256 (`SSE-S3`) แต่พี่จะแหกด่านบังคับใช้กุญแจ `KMS` ซะงั้น! แถมปัญญาอ่อนสุดคือเสือกเอาตู้แช่แข็งไฟล์ `S3 Object Lock` (ที่เอาไว้กันคนลบทิ้ง) มามั่วตอบว่าเป็นตัวแก้ปัญหากุญแจ... หลงทางไปดาวอังคารละฮะ

---
---

## 📌 คำถามที่ 46
**โจทย์:**
An organization uses a Microsoft SQL Server database to support its suite of applications. The organization plans to transition to an Amazon Aurora PostgreSQL database while minimizing application code modifications.

Which combination of actions will achieve these objectives? (Select TWO.)

**ตัวเลือก:**
- [ ] Use AWS Glue to transform the SQL queries from the applications for compatibility with Aurora PostgreSQL.
- [ ] Use Amazon Kinesis Data Streams for real-time data replication to Aurora PostgreSQL.
- [ ] Use AWS AppConfig to manage configuration updates during the migration.
- [x] Use AWS Schema Conversion Tool (AWS SCT) to convert the database schema and AWS Database Migration Service (AWS DMS) to migrate the data.
- [x] Turn on Babelfish on Aurora PostgreSQL to allow applications to continue using existing SQL queries.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทนึงโดนป้ายยา จะย้ายค่ายพระเอก! ทิ้งดาต้าเบสของเก่า `Microsoft SQL Server` แล้วย้ายซบอ้อมอก `Amazon Aurora PostgreSQL` 
ปัญหาปวดตับ: โค้ดในแอปพลิเคชันยังลืมแฟนเก่าไม่ได้ (ยังส่งคำสั่งภาษาของ Microsoft บ่อยๆ) เจ้านายเลยสั่งว่า **"ย้ายบ้านซะ! แต่ห้ามเขียนโค้ดแก้ภาษาตัวแอป (minimizing application code modifications) ให้เหนื่อยนะเว้ย!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: การย้ายค่ายย้ายศาสนาข้ามสายพันธุ์ (SQL Server -> PostgreSQL) ท่าสแตนดาร์ดบังคับตายตัวคือต้องใช้คู่หูหั่นศพ **`AWS SCT (แปลภาษาโครงสร้างตาราง)` + `AWS DMS (ขนย้ายกล่องข้อมูล)`**
- ทริค 2: ย้ายไป Aurora PostgreSQL แล้วไม่อยากแก้โค้ดแอป (เพราะแอปยังสวดมนต์ด้วยภาษาของ Microsoft) = ให้เปิดต่อมวุ้นแปลภาษาอัจฉริยะ **`Babelfish`** (ลูกเล่นลับของ Aurora PostgreSQL ที่เสกให้มันฟังภาษา Microsoft SQL Server รู้เรื่อง!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS SCT to convert schema and AWS DMS to migrate data / Turn on Babelfish on Aurora PostgreSQL...**
- **ทำไมถึงถูก:** คอมโบปราบเซียนงูเหลือมจงอาง! 
1. กางม่าน `AWS SCT` แปลงโครงสร้างเสาเข็มตารางจากค่าย Microsoft ให้กลายเป็นรหัส PostgreSQL แล้วเอา `AWS DMS` ดูดขนข้อมูลเก่าๆ ข้ามไปใส่บ้านใหม่ (มาตรฐานนักย้ายบ้าน)
2. วางยาต้มตุ๋นโดยเปิดโหมด **`Babelfish`** ให้เครื่อง Aurora! ทีนี้แอปพลิเคชันที่ยังสวดมนต์ด้วยภาษา Microsoft รุ่นศตวรรษก่อนก็สามารถยิงเข้ามาอ่านดาต้าเบสใหม่ได้เลย เพราะ Babelfish แม่งรับจบทำตัวเป็นวุ้นแปลภาษาให้อัตโนมัติ เลี่ยงการทุบโค้ดแก้แอปได้ 100% สบายแฮ!

❌ **[ผิด] Use AWS Glue to transform the SQL queries... / Use Amazon Kinesis Data Streams...**
- **ทำไมถึงผิด:** เอากาวปะทะท่อน้ำ! `AWS Glue` เอาไว้คลุกฝุ่นปั้นข้อมูลขยะให้เป็นก้อนความรู้ (ETL analytics) ไม่ได้เกิดมานั่งเฝ้ายามแปลภาษาโครงสร้าง SQL ให้แอป! ส่วน `Kinesis` คือท่อน้ำส้วมดูดเรียลไทม์ ซึ่งไม่อาจมาทำภารกิจแปลภาษาเสาเข็มตารางข้ามค่ายอย่างที่ DMS+SCT ทำได้ฮะ 

❌ **[ผิด] Use AWS AppConfig...**
- **ทำไมถึงผิด:** แถสีข้างถลอก! `AppConfig` เป็นปลั๊กอัพเดทค่า setting ซอฟต์แวร์แอปโง่ๆ ไม่ได้มีตรรกะพลังซูเปอร์ไซย่าที่จะมานั่งสะกดจิตแปลงภาษาดาต้าเบสข้ามค่ายให้คุณหรอกฮะ 

---
---

## 📌 คำถามที่ 47
**โจทย์:**
A company has a set of Linux servers running on multiple On-Demand EC2 Instances. The Audit team wants to collect and process the application log files generated from these servers for their report.

Which of the following services is best to use in this case?

**ตัวเลือก:**
- [ ] Amazon S3 Glacier for storing the application log files and Spot EC2 Instances for processing them.
- [x] Amazon S3 for storing the application log files and Amazon Elastic MapReduce for processing the log files.
- [ ] Amazon S3 Glacier Deep Archive for storing the application log files and AWS ParallelCluster for processing the log files.
- [ ] A single On-Demand Amazon EC2 instance for both storing and processing the log files

---
### 🎯 โจทย์ต้องการอะไร?
ทีมออดิทจอมบ่น ต้องการ **"ดูดจับไฟล์ขยะประวัติ (application logs)"** จำนวนมหาศาลจากฝูงเครือง `EC2` เอามากองรวบรวมไว้... เพื่อทำการ **"สับปั่นประมวลผลวิเคราะห์ Big Data (process)"** ทำรูปเล่มรายงาน 
คำถาม: จับคู่บริการพักขยะ + บริการเครื่องปั่นน้ำผลไม้สับขยะ อันไหนเทพสุดในเรื่องนี้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของดีประจำสูตรโต๊ะจีน Big Data Analytics: 
  - ส้วมเก็บขยะอนันต์ = **`Amazon S3`**
  - เครื่องบดสับประมวลผลขยะบิ๊กเบิ้ม (Hadoop/Spark framework) = **`Amazon EMR (Elastic MapReduce)`** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon S3 for storing the application log files and Amazon Elastic MapReduce for processing the log files.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! คู่หูดุดันไม่เกรงใจใคร โยนขยะ log ทุกอย่างอัดลงหม้อต้ม `Amazon S3` (พื้นที่ส้วมไร้ขีดจำกัด) จากนั้นจ้างเสือเหลือง `Amazon EMR` ที่เป็นปรมาจารย์ด้านการเปิดเครื่องโม่ (Hadoop / Spark) มากระทืบวิเคราะห์ประวัติ logs ดิบๆ เพื่อปั้นออกเป็นรายงาน จบปิ้งตามหลักเบสแพรคทิส!

❌ **[ผิด] Amazon S3 Glacier ... and Spot EC2 Instances... / Amazon S3 Glacier Deep Archive... and AWS ParallelCluster...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตาแล้วไปสอบ! `Glacier / Glacier Deep Archive` มันคือตู้แช่แข็งศพหน้าดื้อ โยนลงไปแล้วมึงต้อง **"รอเป็นชั่วโมงๆ ถึงวัน"** กว่าตู้จะบ้วนไฟล์ออกมาให้มึงอ่าน... แล้วมึงจะเอามาทำรายงานแบบสปีดดุเดือดได้ยังไงฟระ! รอเหงือกแห้ง! แถมจะมาจ้างเครื่อง EC2 จิ๋วๆ หรือ ParallelCluster ไปนั่งโง่ๆ อ่านบิ๊กดาต้ามันใช้มีดพับตัดต้นไม้วะฮะ 

❌ **[ผิด] A single On-Demand Amazon EC2 instance for both storing and processing...**
- **ทำไมถึงผิด:** งกขี้แตกแถมทำรถพัง! จะเช่าเครื่องคอมออฟฟิศโง่ๆ `EC2 เครื่องเดียว` มารับจบเป็นทั้งโกดังเก็บข้อมูลด้วยฮาร์ดดิสก์ EBS (ซึ่งแม่งมีลิมิตเดี๋ยวก็เต็ม) แล้วต้องเปิด Excel พิมพ์ประมวลผลเอง... ถ้าล็อกสี่แฉกเข้ามาหมื่นไฟล์พร้อมกัน เครื่องมึงก็น็อคคอมแฮงค์คาที่ไปแล้วสิโว้ย! 

---
---

## 📌 คำถามที่ 48
**โจทย์:**
A food company bought 50 licenses of Windows Server to be used by the developers when launching Amazon EC2 instances... The company wants to ensure that developers won’t be able to launch new instances once the licenses are exhausted. The company wants to receive notifications when all licenses are in use.

Which of the following options is the recommended solution to meet the company's requirements?

**ตัวเลือก:**
- [ ] Upload the licenses on AWS Systems Manager Fleet Manager...
- [ ] Define license configuration rules on AWS Certificate Manager...
- [ ] Configure AWS Resource Access Manager (AWS RAM) to track and control the licenses...
- [x] Define licensing rules on AWS License Manager to track and control license usage. Enable the option to “Enforce license limit” to prevent going over the number of allocated licenses. Add an Amazon SNS topic to send notifications and alerts.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทหิวแสงไปซื้อเหมา "ไลเซนส์ (License) โปรแกรมไมโครซอฟท์" มา 50 กล่อง แล้วเอามาพ่วงใช้บน EC2 (เรียกวิชา BYOL - Bring Your Own License)
คำสั่งฟ้าผ่า: **"หาปลอกคอหมามาล็อกคอพนักงาน! ถ้ายอดสปาวน์เครื่อง EC2 ทะลุชนเพดาน 50 กล่อง (ไลเซนส์หมด) ระบบต้อง 'สับสวิตช์เด้งถีบห้ามสร้างเครื่องใหม่เด็ดขาด' (prevent launch) และต้องส่งกระดิ่งเตือนภัยว่าไลเซนส์เหี้ยนแล้วนะโว้ย!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกคะแนนอนุบาล 3! ถ้าเห็นความคันปากขี้บ่นเรื่อง "โควต้าไลเซนส์ซอฟต์แวร์หมด / คุมจำนวนไลเซนส์ (Licenses)" พระเอกคนรับเหมาผูกขาดของเรื่องคือยามตู้ม้า **`AWS License Manager`** ซึ่งมีปุ่มไม้ตายชื่อ **`Enforce license limit`** (ล็อกเป้าห้ามสปาวน์เกินโควต้า) ล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Define licensing rules on AWS License Manager... Enable “Enforce license limit”... Add Amazon SNS...**
- **ทำไมถึงถูก:** เคาะกะโหลกจำ! นามบัตรตรงปกยิ่งกว่าปกซีดีเถื่อน! `AWS License Manager` เกิดมาเพื่อล่ามโซ่โควต้าคีย์เถื่อนหรือคีย์แท้ของชาวบ้าน พอมึงสั่งเปิดโหมด `Enforce license limit` ปุ๊บ... ไอพนักงานหน้าสลอนที่มากดเสกเครื่อง EC2 เครื่องที่ 51 จะโดนหน้าจอแดงปาดหน้าเหี้ยน ถีบสกัดกั้นการสร้างทันที! จากนั้นก็จุดพลุยิง `Amazon SNS` แจ้งเตือนบอสตามระเบียบ 

❌ **[ผิด] Define license configuration rules on AWS Certificate Manager...**
- **ทำไมถึงผิด:** เอากระทะฟาดหมา! `AWS Certificate Manager (ACM)` มันมีไว้ปั๊มตรารับรองหน้าบานๆ SSL/TLS คล้องแม่กุญแจให้ URL เว็บไซต์! มันคนละ "Certificate" กับ "Software License" นะโว้ยยย! หมากับแมวเลย

❌ **[ผิด] Upload the licenses on AWS Systems Manager Fleet Manager... / Configure AWS Resource Access Manager (AWS RAM)...**
- **ทำไมถึงผิด:** มั่วชื่อชาวบ้าน! `AWS RAM` มันเอาไว้แชร์รูกุญแจซับเน็ต แชร์ตอม่อข้ามบัญชี AWS แก๊งค์เพื่อน ไม่ได้มีต่อมจับผิดลิขสิทธิ์! ส่วน `Fleet Manager` มันเป็นลุงภารโรงเอาไว้รีโมท SSH เจาะทะลุเข้าเครื่อง ไม่ได้มีออพชั่นจำกัดโควต้าคีย์วินโดวส์โว้ย 

---
---

## 📌 คำถามที่ 49
**โจทย์:**
A leading IT consulting company has an application which processes a large stream of financial data by an Amazon ECS Cluster then stores the result to a DynamoDB table. You have to design a solution to detect new entries in the DynamoDB table then automatically trigger a Lambda function to run some tests to verify the processed data.

What solution can be easily implemented to alert the Lambda function of new entries while requiring minimal configuration change to your architecture?

**ตัวเลือก:**
- [ ] Use CloudWatch Alarms to trigger the Lambda function whenever a new entry is created in the DynamoDB table.
- [ ] Invoke the Lambda functions using SNS each time that the ECS Cluster successfully processed financial data.
- [x] Enable DynamoDB Streams to capture table activity and automatically trigger the Lambda function.
- [ ] Use Systems Manager Automation to detect new entries in the DynamoDB table then automatically invoke the Lambda function for processing.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบประมวลผลผ่าน `ECS` แล้วยัดบารมีข้อมูลทิ้งไว้ในหลุม `DynamoDB table`
กติกาของเจ้านาย: "อยากได้ตาข่ายดักนก... ทันทีที่มีขยะใหม่ตกลงมาในหลุม DynamoDB ปุ๊บ (new entries) **ระบบต้องเตะก้านคอปลุกนินจา `Lambda` ให้ตื่นขึ้นมาแอบฟอกข้อมูลวิเคราะห์ทันที (automatically trigger)!** โดยขี้เกียจเขียนโปรแกรมให้วุ่นวายสุด (minimal configuration)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงของฝั่งเซอร์เวอร์เลส! ถ้าอยากล็อกเป้า "ดักฟังเวลามีใครมาแอบเพิ่ม/ลด/แก้ข้อมูลในตาราง `DynamoDB` แล้วเสกเวทย์สั่งยิงปืนไปปลุก `Lambda` ทำงานต่ออัตโนมัติ" = พระเอกดาบนั้นคืนสนองมีแค่ตัวเดียวคือท่อส่งน้ำ **`DynamoDB Streams`** ล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable DynamoDB Streams to capture table activity and automatically trigger the Lambda function.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! สับสวิตช์วิเศษเปิดโหมด `DynamoDB Streams` โคตรจะตรงเผง! พอเปิดปุ๊บ ทุกครั้งที่มีแมงวันบินเข้าไปวางไข่ (new entries) หรือมีคนลบข้อมูล... ไอท่อนี้ก็จะแอบจับวิดีโอ (capture table activity) แล้วกระซิบเป่าหีบเพลงสะกิดปลุก `Lambda` ที่รอสแตนด์บายอยู่ให้พุ่งออกไปทำงานอัตโนมัติ โดยไม่ต้องมานั่งเขียนโค้ดแจ้งเตือนเองให้โง่เลยฮะ สบายแฮสุดๆ

❌ **[ผิด] Use CloudWatch Alarms to trigger the Lambda function whenever a new entry is created...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! `CloudWatch Alarms` หมอประดน้ำปัสสาวะ มันส่องดูกราฟปรอทวัดไข้บ้าๆ บวมๆ ของ CPU/RAM/Read/WriteCapacity... **แต่มันไม่สามารถล้วงตับอ่านวิญญาณได้หรอกว่า "ข้อมูลในตารางบรรทัดนี้แม่งถูกเพิ่มเข้ามาใหม่นะ"** ไม่มีประสาทสัมผัสรับรู้อะไรระดับลึกซึ้งแบบนั้นฮะ!

❌ **[ผิด] Invoke the Lambda functions using SNS each time that the ECS Cluster successfully processed...**
- **ทำไมถึงผิด:** แวะข้างทางเตะหมา! ขบวนการลากไส้... มึงจะต้องไปเสียเวลาขุดโค้ดแอปของ `ECS` เพื่อฝังโค้ดยิงปืนใหญ่ขอความช่วยเหลือสาด `SNS` ทิ้งให้ Lambda ฟังทำหอกอะไร ในเมื่อ DynamoDB มีสวิตช์สตรีมกดคลิกเดียวเสร็จ (โจทย์บอก require minimal configuration = ห้ามวุ่นวาย) 

❌ **[ผิด] Use Systems Manager Automation...**
- **ทำไมถึงผิด:** จ้างภารโรงไปรบ! `Systems Manager (SSM)` มีไว้สั่งบอทแพทช์อัพเดตแบคอัพปิดเครื่อง EC2 ทั่วไป มันไม่ใช่กล้องวงจรปิดที่จะมานั่งจับพฤติกรรมดักเจาะเวลาคนหิวแสงแอบหยอดลูกกรอกยัดลงหลุมตาราง DynamoDB โว้ย

---
---

## 📌 คำถามที่ 50
**โจทย์:**
A company has hundreds of VPCs with multiple VPN connections to their data centers spanning 5 AWS Regions. As the number of its workloads grows, the company must be able to scale its networks across multiple accounts and VPCs to keep up. A Solutions Architect is tasked to interconnect all of the company's on-premises networks, VPNs, and VPCs into a single gateway, which includes support for inter-region peering across multiple AWS regions.

Which of the following is the BEST solution that the architect should set up to support the required interconnectivity?

**ตัวเลือก:**
- [ ] Set up an AWS VPN CloudHub...
- [ ] Enable inter-region VPC peering that allows peering relationships to be established between multiple VPCs across different AWS regions...
- [ ] Set up an AWS Direct Connect Gateway to achieve inter-region VPC access...
- [x] Set up an AWS Transit Gateway in each region to interconnect all networks within it. Then, route traffic between the transit gateways through a peering connection.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทอภิมหาชุลมุน มีสายโยงยางแมงมุม `ร้อยกว่า VPCs` พ่วงกับสาขาออฟฟิศอีกบานตะไทข้าม `5 ทวีป (5 Regions)`!
กติกา: "ขอเครื่องรางมนต์ดำสักชิ้นเดียว... ที่สามารถมัดรวมเศษเชือกที่ยุ่งเหยิงข้ามทวีปข้ามชาตินี้ (VPCs, VPNs, On-premise) ให้มารวมศูนย์เสียบปลั๊กจึ้กเดียวจบกงเต็ก **(into a single gateway)** แล้วแถมต้องต่อท่อดัดหลังหมุนรหัสข้ามทวีป (inter-region peering) ได้ด้วย!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์มหากาฬ! เมื่อใดที่โจทก์บ่นว่ามี **"VPC ขยะนับร้อย (hundreds of VPC)"** ปนกับ **"VPN ห้อยต่องแต่งสาขาออฟฟิศ"** แล้วอยากจะยุบมัดแหนมตากแห้งรวมศูนย์กลางมาเป็นปลั๊ก 3 ตาทีเดียวเลย (single gateway/hub-and-spoke) = พระเอกองค์เดียวที่รับจบเรื่องท่อหมื่นสายคือรูตูดมหาประลัย **`AWS Transit Gateway`** จ้า!! (แล้วมันก็สามารถเสียบสายข้ามทวีป Transit Gateway Peering หากันได้ด้วยนะ!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up an AWS Transit Gateway in each region... Then, route traffic between the transit gateways through a peering connection.**
- **ทำไมถึงถูก:** ปรบมือรัวๆ! `Transit Gateway` มันประหนึ่งวงแหวนแห่งอำนาจ (Hub and Spoke) คุณโยน VPC และ VPN สาขานับร้อยเส้นมาเสียบรูก้นมันรูเดียวจบปิ้ง ไม่ต้องมานั่งโยงสายใยแมงมุมผูกไขว้กันให้ประสาทแดก! ส่วนภารกิจข้ามทวีป 5 ประเทศ ก็แค่สร้าง Transit Gateway ประจำแต่ล่ะประเทศ แล้วเอาไอ้เครื่องบิ๊กๆ นี่มาแตะจูบเสียบปลั๊ก Peering ข้ามทวีปกันเอง... สมบูรณ์แบบ คลีน โฉบเฉี่ยว กระเป๋าแหก (แต่ดี)

❌ **[ผิด] Enable inter-region VPC peering...**
- **ทำไมถึงผิด:** นิ้วล็อกเป็นตะคริว! `VPC Peering` มันคือการขึงเชือกสลิงจุดต่อจุด! ถ้ายืนกระต่ายขาเดียวมีโควต้าให้ทำ 100 VPCs เข้าหากัน... คุณต้องนั่งลากสายเชือกสูตรคณิตศาสตร์ [100*(100-1)]/2 = มึงต้องลากสาย 4,950 ครั้งบ้าบอคอแตกฮะ! แถมมันรองรับการเสียบก้นอุโมงค์ VPN จากออฟฟิศ on-premise สาขาตรงๆ ไม่ได้ด้วย 

❌ **[ผิด] Set up an AWS Direct Connect Gateway... / Set up an AWS VPN CloudHub...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `Direct Connect Gateway / VPN CloudHub` มันเป็นสายลับหน้าประตูวัด รับแขกคุยงานระหว่าง "VPC บนฟ้า" กับ "ออฟฟิศบ้านนอกนอกเขตกำแพง (On-prems/VPN)" ได้สวยๆ ก็จริง... **แต่มันเสือกไม่สามารถจับเอา VPC กับ VPC มากอดจูงมือวิ่งเข้าหากันเองโว้ย!** ถ้ายามสองฝั่ง VPC จะคุยกันเองตรงๆ ไอสองตัวนี้มันใบ้แดกฮะ จบเห่

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 6: ข้อ 51 - 60)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 51
**โจทย์:**
An online survey startup is collecting real estate data in the United States... The startup already has a total of 5 TB of data stored in an Amazon S3 bucket located in the us-east-1 Region. All real estate data must be shared with a European AWS Managed Service Provider (MSP) Partner which also uses Amazon S3 for storage. Due to budget constraints, the startup must keep its data transfer costs in S3 as low as possible and disable anonymous access.

Which solution meets this requirement MOST cost-effectively?

**ตัวเลือก:**
- [ ] Enable S3 Object Lock in governance mode to lower data transfer costs and set a Legal Hold for each object to disable anonymous access
- [x] Enable the Requester Pays feature on the Amazon S3 bucket to lower data transfer costs and disable anonymous access
- [ ] Enable Cross-Region Replication(CRR) on the startup’s S3 bucket to automatically copy the S3 content to the partner’s S3 bucket in Europe.
- [ ] Enable cross-account access of the startup’s S3 bucket to allow the data downloads and exclusive access from the partner’s AWS account

---
### 🎯 โจทย์ต้องการอะไร?
สตาร์ทอัพงบน้อยมีข้อมูล 5TB แช่ในตุ่มน้ำ `S3 us-east-1` 
กติกา: จะต้องใจป้ำ **"แชร์ข้อมูล"** ให้บริษัทพาร์ทเนอร์ฝั่งยุโรปดูดน้ำไปใช้ฟรีๆ... แต่โจทย์คือกูไม่มีตังค์โว้ยยย (budget constraints) หาทางตั้งค่า S3 ซิว่า **"ทำยังไงกูถึงไม่ต้องเป็นคนจ่ายค่าหน้าเลือด (data transfer costs) ตอนพาร์ทเนอร์มาดูดน้ำ และต้องไล่แขกคนนอก (disable anonymous access) ด้วย!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ขี้เหนียวยืนหนึ่ง! กติกาของ `S3` โดยปกติ **"เจ้าของบ้านต้องจ่ายค่าเน็ตเวิร์กตอนของไหลออก (Data Transfer Out)"** เสมอ! 
- วิธีผลักภาระหนี้คือ: เปิดฟีเจอร์มนต์ดำ **`Requester Pays` (คนขอดูต้องจ่ายตังค์ค่าโหลดเองนะเว้ย เจ้าของไม่จ่าย!)**... ซึ่งผลพลอยได้ของฟีเจอร์นี้แบบภาคบังคับคือ **มันจะตัดสิทธิ์บุคคลนิรนาม (anonymous access) ทิ้งทันที!** (เพราะต้องเอาบัตรเครดิตมารูดจ่ายไง เลยต้องยืนยันตัวตน) ตอบโจทย์ 2 เด้ง!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable the Requester Pays feature on the Amazon S3 bucket to lower data transfer costs and disable anonymous access**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! สับสวิตช์หน้าเลือด `Requester Pays` ใส่ที่ตู้ S3 ซะ! พอไอ้หุ้นส่วนฝั่งยุโรปมากดคลิกโหลดดาต้า 5TB ปุ๊บ... ทันทีที่มันโหลด **ใบเสร็จค่าดึงข้อมูลไหลตู้มจะพุ่งไปลงที่ "บัตรเครดิตบริษัทพาร์ทเนอร์ทวีปยุโรปทันที (มันต้องใช้บัญชี AWS มารูดเสร็จสรรพ)"**... เป็นเกราะป้องกันชั้นดีที่เจ้าของบ้านจะได้เสียแค่ค่าฝากของฟรีๆ ไม่ต้องจ่ายค่าเน็ต Data Transfer แถมพวกไก่กาไร้ตัวตน (Anonymous) ก็โดนเตะก้านคอกระเด็นหมด สบายแฮ

❌ **[ผิด] Enable Cross-Region Replication(CRR) on the startup’s S3 bucket to automatically copy...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้การหมุนเปิด `CRR` (ก๊อปข้ามทวีป) เค้าตั้งกฎว่า **"เจ้าของถัง S3 ต้นทาง เป็นคนจ่ายค่าส่งพัสดุข้ามโลก (Data Transfer Out - Inter-region) นะโว้ย!"** มึงโดนบิล 5TB พุ่งกระปูด ฆ่าตัวตายชัดๆ 

❌ **[ผิด] Enable cross-account access of the startup’s S3 bucket...**
- **ทำไมถึงผิด:** แกล้งโง่หน้าซื่อ! ยื่นกุญแจรีโมตให้ฝั่งเพื่อนบ้านฝั่งยุโรปเข้ามาดูใน S3 ตรงๆ ใช่ไหม? ปรากฏว่า... **"กฎเดิมฮะ ใครเป็นเจ้าของถัง S3 ต้นทาง ไอ้คนนั้นก็ต้องจ่ายค่า Data Transfer ให้เพื่อนบ้านโหลดอยู่ดี!!"** เจ็บปวดรวดร้าว ไม่ได้ช่วยประหยัดตังค์เล้ยย! 

❌ **[ผิด] Enable S3 Object Lock in governance mode...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! `S3 Object Lock` มันคือตู้แช่แข็ง WORM! ป้องกันไอ้โง่มาลบ/เขียนทับไฟล์ชั่วคราว ไม่เกี่ยวอะไรกับค่าแท็กซี่ดาต้า Data Transfer เลยสักนิดเดียว มั่วจับแพะชนแกะฮะ

---
---

## 📌 คำถามที่ 52
**โจทย์:**
A startup is planning to set up and govern a secure, compliant, multi-account AWS environment in preparation for its upcoming projects. The IT Manager requires the solution to have a dashboard for continuous detection of policy non-conformance and non-compliant resources across the enterprise, as well as to comply with the AWS multi-account strategy best practices.

Which of the following offers the easiest way to fulfill this task?

**ตัวเลือก:**
- [ ] Launch new AWS member accounts using the AWS CloudFormation StackSets...
- [x] Use AWS Control Tower to launch a landing zone to automatically provision and configure new accounts through an Account Factory. Utilize the AWS Control Tower dashboard to monitor provisioned accounts across your enterprise. Set up preventive and detective guardrails for policy enforcement.
- [ ] Use AWS Organizations to build a landing zone to automatically provision new AWS accounts. Utilize the AWS Personal Health Dashboard to see provisioned accounts across your enterprise...
- [ ] Use AWS Service Catalog to launch new AWS member accounts... Set up a Multi-Account Multi-Region Data Aggregator...

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทใหญ่อยากจะคลอดบริษัทลูก `(multi-account)` เลี้ยงดูส่งเสียแบบมีระบบระเบียบ ปลอดภัยไม่แหกกฎ 
บอสสั่งตรง: "ขอหน้าต่างบัญชาการแผงหน้าปัดมหาประลัย **(dashboard)** โง่ๆ อันนึง ที่สามารถไล่สแกนจับผิดนโยบายคนโกงข้ามบริษัททั้งหมดได้ **รัดกุมตามหลัก AWS เบสแพรคทิส และต้องเสร็จง่ายที่สุด (easiest way)!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกคะแนนอนุบาล 3! เมื่อหน้าข้อสอบผุดคำศัพท์เทพสุดหรูหราหมาเห่า 3 คำนี้พร้อมกัน:
  1. **"multi-account environment"** (สร้างบัญชีลูก)
  2. **"landing zone"** (ลานจอดเครื่องบิน คลอดบัญชีพร้อมแพ็คเกจเริ่มต้น)
  3. **"dashboard for continuous detection / enforcement / guardrails"** (มีรั้วเหล็กดัดจับผิด)
- = พระเอกตัวท็อปชุบแป้งทอด **`AWS Control Tower`** ล้วนๆ ล้านเปอร์เซ็นต์ (มันคือร่างอวตารของ Organizations + Config รวมกันในคลิกเดียว จบงานไวสุด)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Control Tower to launch a landing zone to automatically provision... Account Factory. Utilize the AWS Control Tower dashboard... Set up preventive and detective guardrails...**
- **ทำไมถึงถูก:** นามบัตรตรงปกยิ่งกว่ารูปสลิปปลอม! `AWS Control Tower` มันเป็นลูกทูนหัวคนใหม่ที่อุบัติมาเพื่อเคลียร์ปัญหาบริษัทข้ามบัญชี ภายในตัวมันมีปุ่มเดียวเสร็จสรรพ:
1) มันสร้างลานจอด `Landing Zone` ให้อัตโนมัติ (คลอดบัญชีใหม่ปุ๊บ มีระบบความปลอดภัยตั้งค่าติดตัวมาเป๊ะๆ จากโรงงาน Account Factory)
2) มีรั้วหนามไฟฟ้ายันต์กันผี **`Guardrails`** จับผิดและไล่เตะคนทำชั่วผิดกฎบริษัทลูกๆ
3) มีสุดยอด `Dashboard` สีเขียวแดง ให้เจ้านายดูขิงข่าได้ในหน้าเดียว ตอบโจทย์ "ง่ายที่สุด (easiest way)" อย่างสมบูรณ์แบบฮะ!

❌ **[ผิด] Use AWS Organizations to build a landing zone... Utilize the AWS Personal Health Dashboard...**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! `AWS Organizations` มันคือจดหมายซองผ้าป่า เอาไว้มัดรวมบิลเงินผ่อนบัญชีลูกเฉยๆ มัน **ไม่มีปุ่มเสกหน้าต่างหน้าปัด Guardrails จับจอมโจรข้ามบริษัท (Dashboard) มาให้ในตัว!** แถมเวรซ้ำกรรมซัด... แอบโยน `Personal Health Dashboard` (คลินิกแจ้งเตือนเซิฟเวอร์ดับ) เข้ามาผสมมั่วเฉย โคตรหลอกลวงฮะ

❌ **[ผิด] Launch new AWS member accounts using the AWS CloudFormation StackSets... Use AWS Config... / Use AWS Service Catalog...**
- **ทำไมถึงผิด:** ลำบากสายตัวแทบขาด! การที่คุณนั่งเปิดคอมเขียนเวทย์มนต์สร้างบัญชีทีละบรรทัด (CloudFormation) หรือผูกบอท `AWS Config` เองกับมือทุกบริษัทร้อยๆ บัญชี... แม่งจะตายห่าคาโต๊ะกันพอดี! เค้าสั่งว่า "ขอวิธีกล้วยๆ (Easiest way)" ซึ่งท่าพวกนี้ปัดตกขี้แตกล้วนๆ ฮะ มันเหนื่อยเวอร์ไป 

---
---

## 📌 คำถามที่ 53
**โจทย์:**
There are a few, easily reproducible but confidential files that your client wants to store in AWS without worrying about storage capacity. For the first month, all of these files will be accessed frequently but after that, they will rarely be accessed at all... However, the files under a specific tdojo-finance prefix in the S3 bucket will be used for post-processing that requires millisecond retrieval time.

Given these conditions, which of the following options would be the most cost-effective solution for your client's storage needs?

**ตัวเลือก:**
- [x] Store the files in S3 then after a month, change the storage class of the tdojo-finance prefix to One Zone-IA while the remaining go to Glacier using lifecycle policy.
- [ ] Store the files in S3 then after a month, change the storage class of the bucket to S3-IA using lifecycle policy.
- [ ] Store the files in S3 then after a month, change the storage class of the tdojo-finance prefix to S3-IA while the remaining go to Glacier using lifecycle policy.
- [ ] Store the files in S3 then after a month, change the storage class of the bucket to Intelligent-Tiering using lifecycle policy.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกค้ารมเสีย โยนไฟล์ขยะเอกสารจำนวนมากเข้าคลัง 
กติกา:
1) ไฟล์พวกนี้ **"ปั๊มสร้างออโต้ใหม่ได้ง่ายๆ (easily reproducible)"** = (แปลว่าต่อให้ฮาร์ดดิสก์ทวีปพัง ก็ไม่ต้องร้องไห้ เสกใหม่ได้)
2) เดือนแรก แห่กันมาอ่านเยอะมากๆ 
3) **"หลังจาก 1 เดือนไปแล้ว... จะลืมมันไปเลย (rarely accessed)"** = (ต้องย้ายลงตู้แช่ถูกๆ)
4) **ข้อยกเว้น!** ยกเว้นไอ้ไฟล์แกะดำชื่อขึ้นต้นด้วย `tdojo-finance/...` ต้องถูกบอทกระชากมาอ่านแบบ **ไวสัสระดับมิลลิวินาที (millisecond retrieval time)!**
คำถาม: งัดมุกสับรางรถไฟอันไหน ที่ประหยัดตังค์ให้ลูกค้าแบบหญ้าปากคอกที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: คีย์เวิร์ดไฟล์ขยะเสกใหม่ชิลๆ **(easily reproducible)** + นานๆ อ่านที **(rarely accessed / infrequent)** = ผู้ท้าชิงเบอร์หนึ่งเรื่องความงกคือ **`S3 One Zone-IA`** (ลดต้นทุนฝากไว้โซนเดียว โซนแตกช่างแม่ง สร้างใหม่ได้) แถมมันเสือกเบิกเงินดึงไฟล์โหลดเร็วปรี๊ด **(millisecond retrieval time)** เหมือน S3 ปกติเป๊ะด้วย! เวิร์คสัส!
- ทริค 2: ส่วนไฟล์ที่เหลือทั้งหมด ไม่มีข้อยกเว้นพิเศษ ไม่เคยอ่านอีกเลย = **ยัดโลงเย็น `Amazon S3 Glacier` ดองเค็มยาวๆ** ให้หนอนกินฮะ ถูกที่สุดในสามโลก

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Store the files in S3 then after a month, change the storage class of the tdojo-finance prefix to One Zone-IA while the remaining go to Glacier using lifecycle policy.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! แยกสมองคิด 2 กองแบบเฉียบขาด:
กองที่ 1: ไฟล์ลูกพ่อค้า (tdojo-finance) ย้ายเข้าตึกซอมบี้ `S3 One Zone-IA` (ประหยัดที่สุด และดึงไฟล์ได้ไวในเสี้ยววินาทีตามสั่ง + เสกไฟล์ใหม่ได้ถ้าโซนนั้นพัง)
กองที่ 2: ไฟล์ลูกเมียน้อย (ส่วนที่เหลือ) โยนแพ็กทิ้งลงเหวนรก `Glacier` ประหยัดค่าดองศพระดับขี้มด! ใช้สคริปต์กรองไฟล์ (Prefix lifecycle policy) สับรางอัตโนมัติ 

❌ **[ผิด] Store the files in S3 then after a month, change the storage class of the tdojo-finance prefix to S3-IA while the remaining go to Glacier...**
- **ทำไมถึงผิด:** รอดตายไปเสี้ยวเดียว! เอ๊ะ... มึงลืมอ่านโจทย์รึไงวะ เขาระบุว่าไฟล์แม่ง `easily reproducible` (ตึกพังช่างแม่งเสกใหม่โว้ย)... แล้วเสือกไปจ่ายเงินแพงจ้างบอดี้การ์ดหลายตึก (S3 Standard-IA ก๊อป 3 โซน) ให้สิ้นเปลืองงบทำติ่งอะไรล่ะฮะ! ถลุงเงินทิ้งเปล่าๆ โดนเจ้านายด่ากระเจิงแน่นอนต้องเลือก One Zone-IA เด้ 

❌ **[ผิด] Store the files in S3 then after a month, change the storage class of the bucket to S3-IA using lifecycle policy.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! การเหมารวมยัดทุกๆ ไฟล์ทั้งบัญชีลงหลุม `S3-IA` แม่งโคตรโง่เลยครับ! ไอ้ไฟล์ที่ไม่ได้จะหวนกลับมาอ่านอีกเลยมึงทำไมไม่ตบลงหลุมนรกชิวๆ อย่าง Glacier สิวะ! เสียตังค์ S3-IA ทิ้งไปเน่าๆ อะ 

❌ **[ผิด] Store the files in S3 then after a month, change the storage class of the bucket to Intelligent-Tiering...**
- **ทำไมถึงผิด:** งมเข็มในมหาสมุทร! คุณรู้อนาคตอยู่แล้วเต็มอกว่า "หลัง 1 เดือนมึงจะย้ายไปนรกขุมไหน"... จะจ้างไอ้บอทผีตาโบ๋ `Intelligent-Tiering` มานั่งกดเครื่องคิดเลขคาดเดาสุ่มเอาเองเพื่ออ!? มันมีค่าธรรมเนียมจัดการออโต๊ะโว้ย สิ้นเปลืองเงินแบบชุ่ยๆ 

---
---

## 📌 คำถามที่ 54
**โจทย์:**
A company has a fixed set of Amazon EC2 instances inside a VPC in the AWS cloud. The instances run a mission-critical application. In a recent incident, one of the EC2 instances suddenly powered down which affected the availability of the application. To avoid this incident in the future, the management wants to get notified of any upcoming AWS events that may affect these EC2 instances.

Which of the following options is the recommended action to meet the above requirements?

**ตัวเลือก:**
- [x] Create an Amazon EventBridge (Amazon CloudWatch Events) rule to check for AWS Personal Health Dashboard events that are related to Amazon EC2 instances. To send notifications, set an Amazon SNS topic as a target for the rule.
- [ ] Set up an Amazon EventBridge (Amazon CloudWatch Events) rule to check for any status change for Amazon EC2 instances. Set the target to an AWS Lambda function that will send a notification and restart the affected Amazon EC2 instances.
- [ ] Create an Amazon EventBridge (Amazon CloudWatch Events) rule that is scheduled to run every 24 hours. Set the target to an AWS Lambda function that will check AWS Service Health Dashboard and send notifications for any events that may affect Amazon EC2 instances.
- [ ] Set up an Amazon EventBridge (Amazon CloudWatch Events) rule to check for AWS Service Health Dashboard events that are related to Amazon EC2 instances. To send notifications, set an Amazon SNS topic as a target for the rule.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายหัวเสีย เครื่อง `EC2` ผีเข้าจู่ๆ ก็ดับวูบไปเลย ทำให้แอปล่มคาที่ 
เจ้านายสั่งเด็ดขาด: **"ครั้งหน้า หาทางติดเซนเซอร์กระดิ่งเตือนภัยเว้ย! ถ้ามีประกาศอุกกาบาตล่วงหน้าจากศูนย์บัญชาการ AWS (upcoming AWS events) ที่จะมากระแทกทะลวงเครื่อง EC2 ของกู... กูต้องได้รับการแจ้งเตือน!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 3! ศูนย์ข่าวประกาศ "อุบัติเหตุล่วงหน้า / ปิดซ่อมเซิฟเวอร์เฉพาะไอดีของมึง" คือสมุดโน้ต **`AWS Personal Health Dashboard`** (ห้ามเผลอไปกด Service Health Dashboard โว้ย อันหลังมันป้ายโฆษณาภาพรวมเฉยๆ)
- โดยท่าบังคับคือเอานกฮูกอีเจี๊ยบ **`EventBridge (CloudWatch Events)`** เป็นคนกระชากสายเบรกเวลามีประกาศหมอผีเด้งมา แล้วกดส่งนกพิราบ **`SNS topic`** เห่าให้เจ้านายฟัง

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon EventBridge... rule to check for AWS Personal Health Dashboard events... To send notifications, set an Amazon SNS topic...**
- **ทำไมถึงถูก:** นามบัตรตรงปก! จิ้มถูกจุด 100%! พอศูนย์บัญชาการส่งบิล "แจ้งเตือนอุกกาบาตหน้าบ้านท่าน (Personal Health events)" เช่น วันศุกร์นี้จะเตะปลั๊กไฟอัพเกรด EC2... ไอ้หน้าต่าง `EventBridge` มันจะเหลือกตาสะดุ้งตื่นทันที แล้วส่งกระดิ่งนกพิราบแจ้งอีเมล `SNS` ไปหาเจ้านายโดยตรง เจ้านายได้ข่าวไวชัวร์ๆ ไม่มีล่มอีกต่อไป

❌ **[ผิด] Set up an Amazon EventBridge... rule to check for AWS Service Health Dashboard events...**
- **ทำไมถึงผิด:** โดนสับขาหลอก! ถอดบทเรียนจำขึ้นใจ ป้ายประกาศ **`AWS Service Health Dashboard`** มันคือกระดานข่าวน้ำท่วมภาคกลาง "สถานะ EC2 ประเทศอเมริกาล่มทั้งประเทศนะคร๊าบบ" มันกว้างจัด!... มัน **"ไม่บอกรหัสเครื่อง IP ส้นตีนอะไรเกี่ยวพันกับไอดีของคุณเลยสักกะหน้าเดียว!!"** มึงจะเอามาจับผิดเครื่องมึงไม่ได้โว้ย หมากับแมวเลย

❌ **[ผิด] Set up an Amazon EventBridge... rule to check for any status change for Amazon EC2 instances... Lambda restart...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! เจ้านายสั่งหา "จดหมายแจ้งข่าวล่วงหน้า (Upcoming events)" โว้ย!! มึงจะไปตั้งท่าส่องกล้องจับผิด "เห้ยเครื่อง EC2 กูดับแล้ว (status change) ค่อยส่งเมลละกัน" ท่านี้คือวัวหายล้อมคอกของแท้ โดนเจ้านายแจกใบเตือนชัวร์ เพราะตอนส่องเจอ เครื่องมึงก็ดับแดกไปแล้วไง!! 

---
---

## 📌 คำถามที่ 55
**โจทย์:**
A Solutions Architect is designing a setup for a database that will run on Amazon RDS for MySQL. He needs to ensure that the database can automatically failover to an RDS instance to continue operating in the event of failure. The architecture should also be as highly available as possible.

Which among the following actions should the Solutions Architect do?

**ตัวเลือก:**
- [ ] Create five read replicas across different availability zones. In the event of an Availability Zone outage, promote any replica to become the primary instance.
- [ ] Create a read replica in the same region where the DB instance resides. In addition, create a read replica in a different region to survive a region’s failure. In the event of an Availability Zone outage, promote any replica to become the primary instance.
- [x] Create a standby replica in another availability zone by enabling Multi-AZ deployment.
- [ ] Create five cross-region read replicas in each region. In the event of an Availability Zone outage, promote any replica to become the primary instance.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกค้างอแง จ้างแอดมินมาอุ้มชูเด็กทารกดาต้าเบส `RDS MySQL`
โจทย์บังคับท่าไม้ตาย: **"ถ้าตึกหลักไฟไหม้... ระบบดาต้าเบสจะต้องสับรางดีดตัวเองกระโดดไปฟื้นคืนชีพที่เครื่องแฝดใหม่ได้เอง "อัตโนมัติ (automatically failover)!"** และเครื่องต้องเปิดแอ่นกระดกถ่างขารอรับหินชนตึกแบบ `highly available` ตลอดเวลา

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับยูนิเวิร์ส! ถ้าบนโลกของแผงวงจร RDS แม่งโชว์คำศัพท์ **`High Availability (HA) / Automatic Failover`** ในประโยคเดียวกันเมื่อไหร่!
คำตอบตีตราตายตัวสับสวิตช์วิเศษ คือท่า **`Multi-AZ deployment`** ล้านเปอร์เซ็นต์แบบไม่ต้องสืบต่อ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a standby replica in another availability zone by enabling Multi-AZ deployment.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! ก็ปุ่มสวิตช์มนต์ดำ `Multi-AZ` ของป๋า RDS มันออกแบบมาเพื่อท่านี้โดยเฉพาะ! พอคุณกดเปิดปุ๊บ AWS มันจะแอบสร้างร่างเงาซอมบี้ (Standby DB) ในตึกแฝด (อีก AZ นึง) ทันที... และพอตึกหลักโดนอุกกาบาตซัดพังปุ๊บ... **มันจะสลับพวงมาลัยจราจรเตะ IP ตัวหลักให้วิ่งมาเสียบที่เครื่องร่างเงาซอมบี้อัตโนมัติ 100% (Automatic Failover) ภายในเวลาวิเศษกระพริบตาเดียว!** โคตรอัจฉริยะ ตอบโจทย์ดั่งใจลูกค้ายิ้มแฉ่งฮะ!

❌ **[ผิด] Create five read replicas across different availability zones. In the event of an outage, promote... / Create a read replica.../ Create five cross-region read replicas...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ลูกหลงทั้งทีม! ประเด็นพังพินาศของหมากตระกูล **"สับดาบโปรโมตร่าง `Read Replica (เอามาอ่าน)` ให้เป็นมหาเทพร่างหลัก (Promote to primary)"** ก็คือ... **มันทำ "แบบอัตโนมัติ (Automated) หน้าไม่อายฟรีๆ" ลิ่งค์กันไม่ได้หรอกโว้ย!!** แอดมินต้องเป็นคนสวมแว่นวิ่งเข้ามาหยิบเมาส์กดคลิกวิวาห์เปลี่ยนชื่อเครื่องใหม่เอง! หรือต้องจ้างบอทเขียนโค้ดผีดิบเอง! ซึ่งแม่งสอบตกข้อกติกา automatically failover หน้าคะมำล้มตึงรัวๆ แถม downtime นานชิบหาย 

---
---

## 📌 คำถามที่ 56
**โจทย์:**
A company has an OLTP (Online Transactional Processing) application that is hosted in an Amazon ECS cluster using the Fargate launch type. It has an Amazon RDS database that stores data of its production website. The Data Analytics team needs to run queries against the database to track and audit all user transactions. These query operations against the production database must not impact application performance in any way.

Which of the following is the MOST suitable and cost-effective solution that you should implement?

**ตัวเลือก:**
- [ ] Upgrade the instance type of the RDS database to a large instance.
- [ ] Set up a new Amazon Redshift database cluster. Migrate the product database into Redshift and allow the Data Analytics team to fetch data from it.
- [x] Set up a new Amazon RDS Read Replica of the production database. Direct the Data Analytics team to query the production data from the replica.
- [ ] Set up a Multi-AZ deployments configuration of your production database in RDS. Direct the Data Analytics team to query the production data from the standby instance.

---
### 🎯 โจทย์ต้องการอะไร?
แอปซื้อขายรัวๆ โหนกิ้งก่าบนหลัง `Amazon RDS (OLTP)` 
ปัญหาเส้นเลือดตีบ: วันดีคืนดี "ไอ้พวกทีมคนวิเคราะห์บิ๊กดาต้า (Data Analytics team)" แม่งเสือกวิ่งปรู๊ดพุ่งเข้ามากระหน่ำพิมพ์ SQL สูบคิวรี่รบกวนจอกศักดิ์สิทธิ์ ทำให้แอปพังเว็บล่มตึกเบี้ยวประจำ!
คำสั่ง: **"หาทางไล่ตะเพิดแก๊งค์ไอ้พวกนักเคราะห์บอร์ด ไปดูดหน้าตารางที่อื่น โดยห้ามให้มันมาดึงขาเครื่องแม่โหลดหนักอีกเด็ดขาด!! (must not impact application performance)"** และต้องประหยัดสุด (cost-effective)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียระดับโลก! ทันทีที่ข้อสอบบ่นเรื่อง **"แก้ปัญหาคอขวดเพราะมี 'คนมาแย่งเครื่องหลักอ่านข้อมูลวิจัย' (read-heavy/analytics impacts DB)"** คู่กับกระดองเต่า RDS ... ไม้ตายก้นหีบชิ้นเดียวที่งัดมาเป่ามนต์เสร็จคือปุ่ม **`"Read Replica" (ปั๊มตึกแฝดผีดิบให้สายอ่านเท่านั้น)`** !! ถีบหัวส่งคนวิเคราะห์ให้อ่านตึกนี้ไปซะ จบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a new Amazon RDS Read Replica of the production database. Direct the Data Analytics team to query the production data from the replica.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! สมเหตุสมผลแถมเป๋าไม่ฉีก! คลอดลูกอ่อน **`Read Replica`** (เครื่องอ่านอย่างเดียว) ออกมาตั้งล่อเป้าข้างๆ.. จากนั้นชี้หน้าด่ากราดไล่พวกทีมแว่น Analytics ว่า "มึงไปรุมกระซวก SQL กูดิงที่ตึกแฝดนู่นซะนะ!" คราวนี้ตัวเวิร์คเกอร์เครื่องแม่ตึกหลัก (Primary DB) ก็นั่งยิ้มแฉ่งปั่นยอดขายต่อไปแบบลื่นหัวแตก ไม่โดนกวนส้นตีนอีกต่อไปแล้วฮะ

❌ **[ผิด] Set up a Multi-AZ deployments configuration... Direct the Data Analytics team to query from the standby instance.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `Multi-AZ Standby Replica` มันคือยามถือปืนเฝ้าตึกแฝดกันระเบิด... **มึงไม่สามารถเอาคนนอกเปิดประตูแทรกหน้าเข้าไป "อ่าน/สวดมนต์ (query)" บนเครื่อง Standby นี้ได้โว้ยย!!** มันล็อกตาย 100% รอเสียบตูดตัวแม่อย่างเดียว! ขี้โม้แหลกลาญ!

❌ **[ผิด] Set up a new Amazon Redshift database cluster. Migrate the product database...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ให้เช่าโกดัง Big Data `Redshift` คันยักษ์หน้าเลือดเพียงเพื่อแค่ดึงย้ายข้อมูล (Migrate) ไปให้ทีม Analytics อ่าน... แม่งสิ้นเปลืองบรรลัยวายป่วง! (Cost-effective ไหมล่ะมึง) ในเมื่อกวิ้น RDS หาง่ายๆ กด Read Replica แค่ 1 ปุ่มก็ได้ละอะฮะ

❌ **[ผิด] Upgrade the instance type of the RDS database to a large instance.**
- **ทำไมถึงผิด:** แก้ปัญหาควายๆ สบถคำหยาบ! อัพสเปคเครื่องปั่นไฟไซส์ยักษ์ อัด RAM CPU แต่ให้ไอ้พวกเวรเข้ามาจกคิวรี่แย่งแอปหลักพิมพ์... เดี๋ยวมันก็ดแดกอิ่มตเต็มจนพังอีกอยู่ดี! สิ้นเปลืองรันทด! หลงประเด็นฮะ

---
---

## 📌 คำถามที่ 57
**โจทย์:**
A company has stored 200 TB of backup files in Amazon S3. The files are in a vendor-proprietary format. The Solutions Architect needs to use the vendor's proprietary file conversion software to retrieve the files from their Amazon S3 bucket, transform the files to an industry-standard format, and re-upload the files back to Amazon S3. The solution must minimize the data transfer costs.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [ ] Export the data using AWS Snowball Edge device. Install the file conversion software on the device. Transform the data and re-upload it to Amazon S3.
- [ ] Deploy the EC2 instance in a different Region. Install the conversion software on the instance. Perform data transformation and re-upload it to Amazon S3.
- [x] Deploy the EC2 instance in the same Region as Amazon S3. Install the file conversion software on the instance. Perform data transformation and re-upload it to Amazon S3.
- [ ] Install the file conversion software in Amazon S3. Use S3 Batch Operations to perform data transformation.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายถมไฟล์รหัสต่างดาว (proprietary format) 200 TB หมกบ่อขยะ `Amazon S3`
เป้าหมาย: จ้างโปรแกรมช่างเหล็กสกัดแปลเป็นไฟล์สแตนดาร์ดธรรมดา... โดยกระบวนการคือ **"ดูดจาก S3 -> เข้าเครื่องช่างเหล็ก -> อัดกลับลง S3 เดิม!!"** 
คำสั่งศาลไคฟง: ท่ายากไหนมัดใจบิลบัตรเครดิตให้ **"ประหยัดต้นทุนค่าน้ำมันรถขนย้ายดาต้า (minimize data transfer costs) มากที่สุด"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: กฎแรงโน้มถ่วงของ AWS ท่องจำขึ้นใจ! วินมอเตอร์ไซค์รับจ้างดูดข้อมูลเข้าๆ ออกๆ ของ Amazon S3 **"ถ้ามึงส่งของไปมาระหว่าง S3 ถังเดียวกัน กับเครื่อง EC2 ที่อยู่ในทวีปเดียวกัน (Same Region) = มันจะฟรีค่าทางด่วนเน็ตเวิร์ก (Free Data Transfer) โว้ยยย!"**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy the EC2 instance in the same Region as Amazon S3. Install the file conversion software on the instance. Perform data...**
- **ทำไมถึงถูก:** ตรรกะกระสอบทรายชนะเลิศ! ตรงปกทุกมิลลิเมตร! สร้างบ้านช่างเหล็ก (เซิฟเวอร์ EC2) ให้มันยืนดมกลิ่นตดถัง S3 ในหมู่บ้านเดียวกัน (same Region)! ทีนี้แอดมินก็ลงโปรแกรมแล้วสูบพ่นข้อมูล 200 TB โยนไปมา... **ค่าแท็กซี่เน็ตเวิร์กจะเป็น "ศูนย์บาท!"** ประหยัดหูดับตับไหม้! สวรรค์มีตาฮะคุณน้อนน!

❌ **[ผิด] Deploy the EC2 instance in a different Region...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ส่งของข้ามทวีป (`different Region`) อ้อมโลกบ้าบอคอแตก! มึงรู้ไหมว่า AWS กะซวกไส้ค่า "Data Transfer Out (วิ่งออกนอกประเทศ)" เป็นล้าน! งานนี้บิลบัตรเครดิตทะลุ 200 TB บอสไล่มึงออกแน่นอนฮะ โคตรพัง!

❌ **[ผิด] Install the file conversion software in Amazon S3. Use S3 Batch Operations...**
- **ทำไมถึงผิด:** แกล้งโง่หน้าซื่อ! `S3 Batch Operations` มีไว้ทำมาราธอนก๊อปปี้ไฟล์เปลี่ยนชื่อ หรือใส่แม่กุญแจทีละหลายล้านไฟล์... **แต่มึงจะไป "เอาแผ่นซีดีโปรแกรมลง Windows ในก้อนถัง S3" ไม่ได้โว้ยย!!** S3 มันคือตุ่มน้ำโง่ๆ ไม่ใช่เครื่องคอมพิวเตอร์ EC2 ที่จะดับเบิ้ลคลิกสับสวิทช์ลงโปรแกรมสคริปต์ชาวบ้านได้! คนละดาวเลย!

❌ **[ผิด] Export the data using AWS Snowball Edge device...**
- **ทำไมถึงผิด:** ขี่กระสวยไปซื้อข้าวแกงหน้าปากซอย! เรียกจ้างรถกระบะทหาร `AWS Snowball` แบกเหล็กฮาร์ดดิสก์ 200 TB มาส่งให้คุณถึงบ้าน (แล้วต้องตั้งคอมเองด้วย)... เพื่อทำบุญแปลไฟล์ขี้ประติ๋วแล้วส่งกลับไปศูนย์ใหญ่อีก! เอื้อออ!! โคตรเหนื่อย + เสียค่าเช่าตู้เหล็กบานตะไท ไม่ตรงจุดประหยัดเบยย! 

---
---

## 📌 คำถามที่ 58
**โจทย์:**
A company has several web applications with users all around the world. Each application is hosted in an Auto Scaling group of EC2 instances in multiple AZs behind an Application Load Balancer (ALB). All applications have their own fully qualified domain name. For added security, the applications must use a publicly trusted SSL certificate.

Which solution will meet this requirement with the LEAST operational overhead?

**ตัวเลือก:**
- [ ] Launch a self-hosted certificate authority (CA) using the Let's Encrypt tool in an Amazon EC2 instance...
- [x] Use the AWS Certificate Manager (ACM) to generate a public SSL/TLS certificate. Associate the new SSL/TLS certificate on the HTTPS listener of the ALBs.
- [ ] Use OpenSSL to generate a self-signed certificate. Import the SSL/TLS certificate to the AWS Certificate Manager (ACM) and associate it with the HTTPS listener of the ALBs
- [ ] Issue an SSL/TLS certificate using the AWS Certificate Manager Private Certificate Authority. Associate the new certificate on the HTTPS listener of the ALBs.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบสปาวน์แอปโชว์หุ่นหลังกำแพงเตี้ย `ALB`
กติกา: โลกสั่งตบหน้าว่า **"หาล็อกกุญแจเขียวๆ (publicly trusted SSL certificate) มาแจกแปะพ่วงให้แอปทั้งหมด เพื่อรับลูกค้าทั่วโลก!"** แบบหน้าดื้อๆ และ **ให้แอดมินลากรองเท้าแตะกดตั้งค่าขี้เกียจได้มากที่สุด (LEAST operational overhead)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงประจำหมู่บ้าน! ทุกครั้งที่ร้องหาแม่กุญแจพกพา "เห้ย กูอยากได้กุญแจเขียว (SSL Certificate) ไปแปะหน้าบ้านเซิฟเวอร์จังว่ะ" = ทางลัดแจกฟรีและไวสุดในปฐพีคือไปขอกับเจ๊ตู้กุญแจ **`AWS Certificate Manager (ACM)`** แล้วจิ้มเสียบหน้ารูเข้าบ้าน **`ALB HTTPS listener`** ทันที... จบปิ้ง 2 ปุ่ม ไม่ต้องเหนื่อยเขียนโค้ด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use the AWS Certificate Manager (ACM) to generate a public SSL/TLS certificate. Associate the new SSL/TLS certificate on the HTTPS listener of the ALBs.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! ก็เจ๊บริการ `ACM` แม่งผลิตหน้ากากกุญแจเขียว Public SSL certificate แจกฟรีฮะ!! เราก็แค่ไปยกมือขอเจ๊แก แล้วถือป้ายเขียวๆ นี้ไปห้อยต่องแต่งหน้าประตูบ้าน `Application Load Balancer (HTTPS)` ปุ๊บ... ลูกค้าแอปทุกคนทั่วโลกก็ยิ้มแฉ่งกดเข้าเว็บได้อย่างปลอดภัย แถมพอครบปี เจ๊แกต่ออายุให้ฟรีออโต้อีกตะหาก แอดมินนอนดมยาดมเล่นเกมไปสวยๆ ขี้เกียจสมบูรณ์แบบรัดกุม 100% ตอบโจทย์ "least operational overhead"!

❌ **[ผิด] Issue an SSL/TLS certificate using the AWS Certificate Manager Private Certificate Authority.**
- **ทำไมถึงผิด:** ซื้อยาผิดขนาน! `ACM Private CA` แม่งเป็นบริการผลิตแม่กุญแจปิดปากหอยสลัว **"ใช้เฉพาะภายในบริษัทห้ามใครเสือก (Private network)"** โว้ย!! ถ้ามึงแช่แจกใบนี้ ลูกค้าหน้าทวีปทั่วโลกที่ทิ่มเข้ามาหน้าแอปมึง ก็โดนตอกหน้าด้วยป้ายแดง "เว็บอันตรายหนีไป" ทันทีฮะ ไม่ตอบโจทย์ public ขาดทุนยับ!

❌ **[ผิด] Use OpenSSL to generate a self-signed certificate. Import the SSL/TLS certificate...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กุญแจผีโจรป่า "Self-signed certificate" นี่มึงทิ้งดินสอเถอะฮะ! ลูกค้าทั่วโลกจะกล้าเหยียบเว็บมึงก็บ้าละ หน้าโดนแบรนว่าไอ้พวกมิจฉาชีพ 100%! แถมมึงต้องนั่งปั๊มใหม่เองหน้าดำคร่ำเครียดทุกปีด้วยมือเพียวๆ... เหนื่อยหมาหอบ (Overhead บาน) โดนเจ้านายแจกใบเตือนชัวร์ฮะ 

❌ **[ผิด] Launch a self-hosted certificate authority (CA) using the Let's Encrypt tool in an Amazon EC2 instance...**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! ไปกางตึกเช่าเครื่องคอม `EC2` ใหม่เอี่ยมอ่องเพื่อมารันคลอดกุญแจเถื่อน Let's Encrypt หอยหลอดบ้าบอ! เปลืองทั้งเงินค่าเช่า EC2 เปลืองทั้งแรงแอดมินที่ต้องมาบิวท์หน้าจอหน้าเกลือ! ในเมื่อ ACM แจกกุญแจโลกสวยฟรีเนียนๆ อยู่แล้ว มึงจะรันทดทำไมฮะ 

---
---

## 📌 คำถามที่ 59
**โจทย์:**
A Solutions Architect is working for a large global media company with multiple office locations all around the world. The Architect is instructed to build a system to distribute training videos to all employees.

Using Amazon CloudFront, what method would be used to serve content that is stored in Amazon S3 but not publicly accessible from S3 directly?

**ตัวเลือก:**
- [ ] Create an S3 bucket policy that lists the CloudFront distribution ID as the principal and the target bucket as the Amazon Resource Name (ARN).
- [ ] Create a web ACL in AWS WAF to block any public S3 access and attach it to the CloudFront distribution.
- [ ] Create an Identity and Access Management (IAM) user for CloudFront and grant access to the objects in your S3 bucket to that IAM user.
- [x] Create an Origin Access Control (OAC) for CloudFront and grant access to the objects in your S3 bucket to that OAC.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งกุนซือเสกหนังกำพร้าตู้คอนเทนเนอร์ `CloudFront` เลี้ยงต้อยหน้าระเบียงบ้าน `S3`
กติกาเหล็ก: **"ไอ้ตุ่มน้ำ S3 มึงต้องปิดกุญแจแน่นหนา ห้ามไอ้พวกหน้าหมามุดทะลุกำแพงเปิดดูดตรงๆ (not publicly accessible from S3 directly) ข้อมูลจะต้องไหลออกมาจากท่อส้วมหน้าบ้านยักษ์ CloudFront อย่างเดียวเท่านั้น!"**
คำถาม: งัดยันต์ปลอกคอหมาตัวไหน มาเชื่อมคอหอยสองหน่อนี้บ้าง ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับยูนิเวิร์ส! ถ้าขี้หลงตดเหมา `CloudFront` คู่ผัวแม่เสือ `S3` แล้วสั่งกฎเผด็จการว่า **"บังคับให้ลูกค้าวิ่งกินผ่านคอหอย CloudFront เท่านั้น S3 มึงต้องแอบเงียบๆ"** = ไม้ตายก้นหีบที่ใช้ไขกุญแจลับผูกคอเข้าหากัน คือท่าเสียบป้ายรหัสผ่านมนต์ดำชื่อว่า **`Origin Access Control (OAC)`** ล้านเปอร์เซ็นต์แบบไม่ต้องสืบต่อ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Origin Access Control (OAC) for CloudFront and grant access to the objects in your S3 bucket to that OAC.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! สปาวน์ยันต์แปะหน้าผากซอมบี้ที่ชื่อว่า `OAC (แบบใหม่ล่าสุด อัพเกรดจาก OAI)` ซะ! พอมึงหยิบ OAC มาคล้องคอ CloudFront แล้วตีโฉบกระดาษใบรับรองฝังลง `S3 Bucket Policy`... ตุ่มน้ำ S3 มึงก็จะกลายเป็นผีเฝ้าทรัพย์สนิท! **"ใครเสร่อกดลิงค์เข้ามาโหลดที่ S3 ตรงๆ จะโดนถีบเตะคว่ำหน้าแหก (Access Denied) แต่ถ้าใครอ้อมมาเคาะหน้ากาก CloudFront ลูกรัก OAC มันถึงจะยอมคายไฟล์ออกมาให้ 100%!"** เหนียวแน่นสมบูรณ์แบบตอบโจทย์ปังเปรี้ยง!

❌ **[ผิด] Create an Identity and Access Management (IAM) user for CloudFront...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `CloudFront` แม่งเป็น "บริการระดับชาติ" นะโว้ย มันไม่ใช่คนหรือพนักงานที่จะมาเบิกตลับคีย์ยัดทำบัตรจับ `IAM User` เป็นรายคน!! มันมุดขยะงมเข็มในมหาสมุทรเกินไป ท่านี้หน้าแหกรันทดฮะ!

❌ **[ผิด] Create an S3 bucket policy that lists the CloudFront distribution ID as the principal...**
- **ทำไมถึงผิด:** มั่วซั่วตายน้ำตื้น! มึงรู้ตัวปะเนี่ยว่า **"ในใบรับรอง Bucket Policy เค้าไม่อนุญาตให้มึงเอา 'รหัสบาร์โค้ด distribution ID โง่ๆ' ไปใส่อ้างอิงตรงช่อง Principal เด็ดขาด!"** กฎคือต้องยื่นนามบัตร IAM role, Accounts หรือน้อง OAC OAI ให้ดูเท่านั้นแหละฮะ บาปหน้าแหก!

❌ **[ผิด] Create a web ACL in AWS WAF to block any public S3 access...**
- **ทำไมถึงผิด:** หลอกเด็กร้องไห้! `AWS WAF` หมอผีกำแพงเมืองเวทมนตร์ มันยืนเด่นจับกุมโจรล้วงกระเป๋าแฮกเกอร์ฉกสคริปต์หน้ากระจาดเว็บ `CloudFront` เฉยๆ... แต่มัน **"ไม่ได้ไปยุ่มย่ามถือแม่กุญแจฝังล็อกหัวใจก้นตุ่ม S3 โว้ย!!"** ถ้ามึงไม่ล็อกประตู S3 ไอ้โจรมันก็เอาลิงก์ตรงมุดมดลูกทะลวงสูบไฟล์จากหลังบ้านอยู่ดี จบเห่!

---
---

## 📌 คำถามที่ 60
**โจทย์:**
A company has a regional API Gateway in the us-east-2 region that serves as a proxy to a backend service. Clients connect to the service using the invoke URL of the API stage. To improve usability, the company wants to associate a custom domain name (api.tutorialsdojo.com) with the API. Moreover, the domain name must support HTTPS to ensure secure connections. The company has an existing hosted zone for its domain on Amazon Route 53.

Which of the following would be the next step to achieve the company's objective?

**ตัวเลือก:**
- [ ] Use the AWS Certificate Manager Private Certificate Authority (ACM PCA) to generate a private certificate for api.tutorialsdojo.com. Override the invoke URL using stage variables.
- [ ] Request a public certificate in the us-east-1 region for api.tutorialsdojo.com using AWS Certificate Manager (ACM). Create a regional API Gateway domain name... 
- [ ] Import an existing public certificate for api.tutorialsdojo.com into AWS Certificate Manager (ACM) in the us-east-2. In Route 53, create a CNAME record for api.tutorialsdojo.com...
- [x] Request a public certificate in the us-east-2 region for api.tutorialsdojo.com using AWS Certificate Manager (ACM). Create a regional API Gateway domain name and associate it with api.tutorialsdojo.com and the ACM certificate. In Route 53, create an alias record for api.tutorialsdojo.com that points to the API Gateway domain name.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมีกระเป๋าวิเศษ `API Gateway แบบ Regional (ตั้งค่ายังทวีป us-east-2)` เอาไว้ดักพ่นข้อมูลหลังบ้าน 
แต่ URL ที่ Amazon เสกให้มันหน้าตาอุบาทว์บัดซบ! เจ้านายสั่ง: **"กูอยากเปลี่ยน URL ให้มันไฮโซเป็นโดเมนชาวบ้าน `api.tutorialsdojo.com` แถมควงแขนแม่กุญแจเขียว HTTPS ด้วย!"** 
คำถาม: ท่ายากสับขาหลอกอันไหนเรียงลำดับถูกเผง เพื่อคล้องคอ API Gateway เข้ากับโดเมนนี้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: กฎเหล็กของหน้ากาก **`Regional API Gateway`** คือ "กุญแจ SSL ยันต์ฮีลเลือดชุบแป้งทอด (ACM Certificate) ที่มึงจะเอามาพ่วง **แม่งต้องเกิดมาจากโรงงานปั๊มในประเทศเดียวกัน (Same Region) ปากท่อเป๊ะๆ!**" (โจทย์คือ us-east-2 แม่กุญแจก็ต้องเบิก us-east-2 จ้า!)
- ทริค 2: สร้างโดเมนใน API Gateway เสร็จ ต้องย้ายก้นไปบอก `Route 53` ให้ต่อท่อน้ำส่งใบสั่งซื้อ โดยท่ามาตรฐานคือเคาะปุ่มเสก **`Alias record`** ชี้ไปหาพระคัมภีร์ API Gateway Domain Name 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Request a public certificate in the us-east-2 region for api.tutorialsdojo.com using AWS Certificate Manager (ACM). Create a regional API Gateway domain name... In Route 53, create an alias record...**
- **ทำไมถึงถูก:** ตรรกะกระสอบทรายชนะเลิศ! ตรงปกทุกมิลลิเมตร! 
1. กดกระดิ่งสั่งแจกกุญแจโลกสวย Public Certificate ตุ่มน้ำ `us-east-2` ตรงทวีปหน้าบ้านตัวเองแป๊ะรวดเร็ว (ถูกต้อง 100%)
2. ทำพิธีคล้องคอดอกไม้ Custom domain 
3. จิ้มตูด `Route 53` ส่งไม้ต่อกราบอธิษฐาน **Alias Record** ซดหน้าเข้า API Gateway ราบลื่นพังพินาศปังเปรี้ยงฮะ!!

❌ **[ผิด] Request a public certificate in the us-east-1 region...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้บ้า!! กฎสังกะสีก็บอกอยู่ว่า "กวิ้น Regional API Gateway มึงตั้งรกรากอยู่ฝั่ง us-east-2"... แล้วมึงเสือกจะไปหิ้วกุญแจ SSL บินลัดฟ้าถ่อไปขอจากหิ้งพระทวีป `us-east-1` เนี่ยนะ!? ขั้วขยี้กฎ Same Region เละเทะฮะ! API Gateway มันไม่แคร์กุญแจต่างบ้านต่างเมืองโว้ย ปัดตกข้อนี้!

❌ **[ผิด] Import an existing public certificate... In Route 53, create a CNAME record...**
- **ทำไมถึงผิด:** แกล้งโง่หน้าซื่อ! ขบวนการท่าพิสดาร CNAME Record... มึงรู้ไหมว่า "ท่าที่หล่อลื่นไหลปรื้ดพรีเมียมและเบสแพรคทิสที่สุดในจักรวาล AWS ก็คือใช้ **Alias Record** ชี้กบาลไปหาหลังคา AWS Resources ตรงๆ เลยโว้ยย!! ไม่ต้องมาเปิดวุ้นแปลภาษา CNAME งึกๆ งักๆ ให้เหนื่อย!

❌ **[ผิด] Use the AWS Certificate Manager Private Certificate Authority (ACM PCA) to generate a private certificate...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เจ้านายขอป้าย "แอปสอยดาวประจักษ์เวทีระดับโลก" มึงจะไปหน้าด้านเอาแผ่นคีย์ยันต์กุญแจ **`Private CA`** หอยหลอดบ้าบอมาแปะททำแพะอะไร! ลูกค้านอกบ้านเค้ากดเข้ามาเจอจอแดงกระซวกไส้ด่าเว็บอันตรายหมดแหละ! เลวร้ายมากฮะ!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 4 (Part 7: ข้อ 61 - 65)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 61
**โจทย์:**
A company plans to migrate a NoSQL database to an EC2 instance. The database is configured to replicate the data automatically to keep multiple copies of data for redundancy. The Solutions Architect needs to launch an instance that has a high IOPS and sequential read/write access.

Which of the following options fulfills the requirement if I/O throughput is the highest priority?

**ตัวเลือก:**
- [ ] Use Compute optimized instance with instance store volume.
- [ ] Use General purpose instances with EBS volume.
- [ ] Use Memory optimized instances with EBS volume.
- [x] Use Storage optimized instances with instance store volume.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทจะย้ายดาต้าเบสสายหยาบ `NoSQL` มาปลูกบ้านบนเครื่อง `EC2` แอดมินกระซิบมาว่า "เดี๋ยวตัวเบสแม่งจะปั๊มเรปปลิก้า (replicate) เซฟสำรองข้อมูลกันเหนียวเองอยู่แล้ว"
คำสั่ง: **"กูอยากได้เครื่องคอมที่แม่งโคตรฮาร์ดคอร์เรื่องการอ่านๆ เขียนๆ (high IOPS / sequential read/write / throughput is the highest priority) เอาแบบเร็วหน้าสั่นสุดในปฐพี!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: เครื่อง EC2 ที่เกิดมาเพื่อบรรจุข้อมูลมหาศาลแล้วสับอ่าน/เขียนไวเป็นสายฟ้าแลบ (high IOPS / NoSQL) คือตระกูล **`Storage optimized instances`** (พวกขึ้นต้นด้วยตัว I ตัว D)
- ทริค 2: สตอเรจ (ฮาร์ดดิสก์) ที่วิ่งรับส่งข้อมูล (I/O throughput) โคตรเร็วที่สุด... เร็วยิ่งกว่าเทพเจ้า EBS คือตระกูล **`Instance store volume`** (ฮาร์ดดิสก์เสียบตูดเครื่อง) ซึ่งมีข้อเสียคือถ้ารีสตาร์ทเครื่องข้อมูลจะปลิวหายหมด! **แต่โจทย์แอบบอกแล้วว่าดาต้าเบสมันมีระบบ "replicate data automatically กันตาย" ไว้แล้ว!** จึงแปลว่าใช้ฮาร์ดดิสก์เสี่ยงตายอย่าง Instance store ควบม้าความเร็วแสงได้สบายใจเลย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Storage optimized instances with instance store volume.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! เข้าคู่สเปคเทพซิ่งสายฟ้าแลบ!
1. ตระกูลเครื่อง **`Storage optimized`** ถูกออกแบบมาเพื่อกางเต็นท์ให้ Database (เช่น I3 instances) มันอัดแน่นเรื่องความเร็วอ่านเขียนที่สุด
2. ฮาร์ดดิสก์แบบ **`Instance store volume`** เสียบการ์ดหน้าเครื่อง (NVMe SSD) มันให้ค่า IOPS / Throughput กระซวกไส้โหดตับแตกกว่า EBS เป็นร้อยเท่า! และถึงตึกจะดับ ข้อมูลก็ไม่หายเพราะแอปมีระบบ Replicate สำรองไปเครื่องอื่นแล้ว โครตคุ้ม!

❌ **[ผิด] Use General purpose instances with EBS volume. / Use Memory optimized instances with EBS volume.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ฮาร์ดดิสก์ **`EBS volume`** มันคือฮาร์ดดิสก์กากๆ เสียบสาย LAN วิ่งผ่านเน็ตเวิร์ก ยังไงค่า Throughput ก็โดนจำกัดคอขวดเพดาน (ไม่มีทางสู้ความเร็วแสงการ์ดเสียบเมนบอร์ดอย่าง Instance store ได้เลย) แถมเครื่อง General purpose ก็กลางๆ ไม่ได้ซิ่งดุดันฮะ 

❌ **[ผิด] Use Compute optimized instance with instance store volume.**
- **ทำไมถึงผิด:** ผิดฝาผิดตัว! ซื้อหม้อหุงข้าวมาปิ้งปลา! เครื่องเกรด **`Compute optimized`** (ซีรี่ส์ C) บอดี้การ์ดกล้ามโต มันออกแบบมาให้ปั่นเลขคณิตศาสตร์ บีบอัดวิดิโอ แต่มันไม่ได้มีกล้ามส่วนพุงมาเผื่อซึมซับการอ่าน/เขียน (I/O sequential) ระดับ NoSQL หรอกฮะ 

---
---

## 📌 คำถามที่ 62
**โจทย์:**
A company has a High Performance Computing (HPC) cluster that is composed of EC2 Instances with Provisioned IOPS (io1) volume to process transaction-intensive, low-latency workloads. The Solutions Architect must maintain high IOPS while keeping the latency down by setting the optimal queue length for the volume. The size of each volume is 10 GiB.

Which of the following is the MOST suitable configuration that the Architect should set up?

**ตัวเลือก:**
- [ ] Set the IOPS to 800 then maintain a low queue length.
- [ ] Set the IOPS to 600 then maintain a high queue length.
- [ ] Set the IOPS to 400 then maintain a low queue length.
- [x] Set the IOPS to 500 then maintain a low queue length.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีซูเปอร์คอมพิวเตอร์ (HPC) เสียบฮาร์ดดิสก์ลูกไฮโซสุดหรู **`Provisioned IOPS SSD (io1)` ขนาดกะจิ๋วหลิวแค่ "10 GiB"** 
และอยากรีดเค้นพลังความเร็วให้ได้แต้ม **high IOPS สูงที่สุด** พร้อมกดให้หน่วงน้อยสุด (keep latency down)
คำถาม: ท่ายากไหนคือสูตรรีดพลัง (ตั้งค่า IOPS ให้สูงสุดลิมิต) ของดิสก์ลูกนี้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: คณิตศาสตร์ประถมเรื่องกฎเกณฑ์ของ EBS **`io1`**:
สูตรเพดานความเร็ว `Maximum IOPS Ratio` ของรุ่น io1 คือ **`50 : 1`** (แปลว่า 1 GiB มึงเสกความแรงได้สูงสุดแค่ 50 IOPS)
โจทย์ให้ดิสก์มา **10 GiB** -> ดังนั้นแม็กซิมั่มลิมิตเพดานบินคือ **10 x 50 = `500 IOPS` สูงสุดเท่านั้น!!** (เกินนี้ระบบด่าว่าอเร่อ)
และคีย์เวิร์ดลดความหน่วง "keeping latency down" คือต้องล้างคอขวด **(maintain a low queue length)** ห้ามดองคิวยาว

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set the IOPS to 500 then maintain a low queue length.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! ก็โควต้าคณิตศาสตร์มันกดเครื่องคิดเลขได้ตัวเลข `500 IOPS` นี่ยิ่งกว่าหวยล็อค! ตั้ง 500 ถือว่ารีดพลังจดแม็กซิมั่มเพดานของดิสก์ 10 GiB แบบเลือดสาดแล้ว (รีดสุดตามที่เจ้านายขอ high IOPS) และการรักษาคิวสั้นๆ (low queue length) จะช่วยให้งานไม่ติดหล่มรอนาน (low latency) ถูกต้องล้านเปอร์เซ็นต์

❌ **[ผิด] Set the IOPS to 800... / Set the IOPS to 600...**
- **ทำไมถึงผิด:** ฝันกลางวัน! AWS แม่งตอกหน้าหงายตั้งแต่กรอกตัวเลขละ! ขนาดดิสก์แกมีแค่ 10 GiB (10 x 50 = แตะเพดานได้แค่ 500 โว้ย!) มาเสร่ออยากรัน 600 อยากรัน 800... มึงไปอัพไซส์ดิสก์ให้ใหญ่กว่านี้ก่อนฮะ ระบบไม่อนุญาตให้กรอก!

❌ **[ผิด] Set the IOPS to 400 then maintain a low queue length.**
- **ทำไมถึงผิด:** กั๊กของทำแป๊ะอะไร! ตัวเลือกนี้ระบบอนุญาตให้ตั้งได้ก็จริง (เพราะไม่เกิน 500)... แต่เจ้านายสั่งอยู่หลัดๆ ว่าขอบีบแตร "high IOPS" เค้นเลือดให้สุด... แล้วมึงจะไปกั๊กตั้งแค่ 400 ทำไมทั้งๆ ที่เครื่องแม่งอัดไปได้ถึง 500! โง่ตายน้ำตื้นฮะ เสียของ

---
---

## 📌 คำถามที่ 63
**โจทย์:**
A popular augmented reality (AR) mobile game is heavily using a RESTful API which is hosted in AWS. The API uses Amazon API Gateway and a DynamoDB table with a preconfigured read and write capacity. Based on your systems monitoring, the DynamoDB table begins to throttle requests during high peak loads which causes the slow performance of the game.

Which of the following can you do to improve the performance of your app?

**ตัวเลือก:**
- [x] Use DynamoDB Auto Scaling
- [ ] Add the DynamoDB table to an Auto Scaling Group.
- [ ] Integrate an Application Load Balancer with your DynamoDB table.
- [ ] Create an SQS queue in front of the DynamoDB table.

---
### 🎯 โจทย์ต้องการอะไร?
เกมมือถือหน้าใหม่ มาแรงคนเล่นแห่ทะลัก! ฉากรับข้อมูลจดคะแนนผู้เล่นใช้ถัง `DynamoDB` ซึ่งเคยระบุโควต้าไว้นิดเดียว (preconfigured read/write capacity)
พอคนเล่นแห่กันมาเยอะทะลักจุดเดือดปุ๊บ... โดนกระซวกไส้ "ระบบด่าคอขวดตีกลับ **(throttle requests)**" เซิฟเวอร์กระตุกเป็นสุนัขบ้า!
คำถาม: ท่ายากปุ่มไหน ที่จะไปปลดแอกโควต้ากระดองเต่า DynamoDB ให้มันขยายร่างตามแรงกระแทกได้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าบ่นเรื่อง "โควต้า Read/Write Capacity ของ DynamoDB ไม่พอรับมือตอนจุดพีคคนเยอะ (throttle)" ก็แค่จับมันเป่าลมปุ่มขยายร่างขยายปอดอัตโนมัติ ซึ่งฟีเจอร์นี้มันชื่อตรงเผงเด๊ะๆ ว่าปุ่ม **`DynamoDB Auto Scaling`** (กดคลิกเดียวสวรรค์เปิด!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use DynamoDB Auto Scaling**
- **ทำไมถึงถูก:** เคาะกะโหลกจำ! นามบัตรตรงปกยิ่งกว่ารูปในทินเดอร์! พอคุณไปติ๊กถูกฟีเจอร์ `DynamoDB Auto Scaling` ปุ๊บ... ทันทีที่คลื่นซอมบี้พุ่งทะลักกดเกมเข้ามายิกๆ ระบบมันแอบขยายลิมิตรูหลอดดูด Read/Write Capacity ให้กว้างขึ้นตามทราฟฟิกจริงอัตโนมัติ! (พอคนเงียบก็หุบรูลง ประหยัดตังค์) จัดว่าแก้ปัญหา Throttle ได้เฉียบขาดและชิวสุดฮะ

❌ **[ผิด] Add the DynamoDB table to an Auto Scaling Group.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ฟีเจอร์ `Auto Scaling Group (ASG)` มันมีไว้เพาะพันธุ์เสกเครื่องจักร "EC2 Instances" เป็นหมูตู้โว้ยย!! มันคนละแผนก! มึงจะเอาดาต้าเบสเจ้านายก้อนเดียวในโลกไปยัดสปาวน์เครื่องโง่ๆ ทำกระโหลกกะลาอะไรฮะ บ้าบอมาก 

❌ **[ผิด] Create an SQS queue in front of the DynamoDB table.**
- **ทำไมถึงผิด:** แวะข้างทางเตะหมา! `SQS` คือพนักงานรับบัตรคิว ท่านี้ถือว่าเป็นท่ายากบำบัดรักษา "ระบบล่ม/ข้อมูลหาย" (Decoupling) ได้ดี... แต่มัน **ไม่ได้ช่วยซ่อมรักษาแผลอักเสบฐานทัพให้เครื่องใหญ่ขึ้นนะ!** การเอากระบะบัตรคิว SQS ไปบังหน้า สุดท้ายมึงก็ต้องค่อยๆ หยิบป้อนใส่ DynamoDB เท่าเดิมอยู่ดี (Throughput ไม่ได้ขยายร่าง) แถมคราวนี้เกมแม่งจะกระตุกหน่วงกว่าเดิมอีกเพราะเจอจราจรรอบัตรคิวเข้าคิว! ไม่เข้าเป้า!

❌ **[ผิด] Integrate an Application Load Balancer with your DynamoDB table.**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! `ALB` มีไว้สับเบ้ารับส่งลูกค้าโยนเข้าตึกคอม EC2 / ECS! มันไม่ได้มีรูโหว่หน้าต่างเอามาเสียบพ่วงกอดเอวกับ DynamoDB ตรงๆ มั่วแพะชนแกะฮะ

---
---

## 📌 คำถามที่ 64
**โจทย์:**
A company plans to develop a custom messaging service that will be used to train an AI for an automatic response feature. The service is expected to receive thousands of messages per day, all of which will be processed by an Amazon EMR cluster. It is crucial that none of the messages are lost, no duplicates are produced, and that the messages are processed in EMR in the same order as their arrival.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [x] Create an Amazon Kinesis Data Stream to collect the messages.
- [ ] Set up an Amazon SNS Topic to handle the messages.
- [ ] Set up a default Amazon SQS queue to handle the messages.
- [ ] Create an Amazon Data Firehose to handle the messages.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายจะเทรนหุ่นยนต์ AI พนักงานตอบแชท! โดยจะมี "ขยะข้อความหลายหมื่นข้อความ (thousands of messages) ถาโถมเข้ามาประดังกระหน่ำใน 1 วัน" เพื่อรอป้อนเข้าเครื่องตัดต่อ `Amazon EMR` ท่ามกลางกระสุนวิกฤติ!
กฎเหล็กสุดสยองของเจ้านาย: **"ข้อความห้ามหายแม่งแม้แต่ตัวอักษรเดียว! ห้ามมีข้อความดอปเปิลแกงเกอร์ (no duplicates)! และที่สำคัญ... ข้อความต้องถูกเปิบเข้าบ้วนเรียงคิว 'ตามลำดับก่อน-หลัง (same order as their arrival) ห้ามแทรกคิวเด็ดขาด!'"**
คำถาม: ท่อจราจรนรกเสาไฟตัวไหน รองรับกติกาบ้าบอนี้ได้หมด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์มหากาฬ! ถ้าข้อสอบพ่นคำแช่งว่าต้อง **"รับข้อมูลเดือดๆ รัวๆ (thousands of messages) + ต้องเรียงลำดับเป๊ะๆ (order / sequence) + ห้ามเบิ้ลห้ามหาย"** = ท่อดูดน้ำวิเศษตัวเดียวที่รับจบภาระหนักอึ้งนี้ได้คือพญานาค **`Amazon Kinesis Data Stream`** ร้อยล้านเปอร์เซ็นต์ (มันมี Sequence Number สั่งเรียงลำดับหัวแตกได้เป๊ะสุด) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon Kinesis Data Stream to collect the messages.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! `Kinesis Data Streams` อวตารแห่งการสตรีมมิ่ง มันตีด่านรับระเบิดข้อความนับหมื่นๆ โดสในคราวเดียวได้สบายๆ (Real-time big data) และที่หน้าปกก้นบุหรี่ของมัน... ทันทีที่ข้อมูลมุดเข้ามาปุ๊บ มันจะปั๊มตรา "หมายเลขซีเรียลลอต (sequence number)" แขวนคอพ่นใส่ให้ทุกชิ้นทันที! ทำให้มัน **"เรียงลำดับก่อนหลังไม่ผิดเพี้ยนเป๊ะๆ"** ตอบโจทย์พระบรมราชโองการของบอสครบถ้วนกระบวนความฮะ!

❌ **[ผิด] Set up a default Amazon SQS queue...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `SQS แบบธรรมดา (default / standard queue)` มันคือกระบะรับบัตรคิวผีบ้า! มันมีกาดอกจันตัวเท่าบ้านเตือนไว้หน้าจดหมายว่า **"กูไม่รับประกันว่าคิวจะเรียงตามลำดับเป๊ะๆ นะโว้ย บางทีคิวหลังเสือกหลุดแซงคิวหน้าเฉย และบางทีอาจจะแถมก๊อบปี้ขยะเบิ้ล 2 ให้ด้วย! (best-effort ordering / at-least-once delivery)"** ขืนเอามาใช้หุ่น AI บอสแม่งคุยสลับประโยคมั่วซั่วหน้าสั่นแน่... (ถ้าจะใช้ SQS ต้องเจาะจงใช้ตัวเบ้อเร่อว่า FIFO Queue ถึงจะถูก แต่ในช้อยส์ลงไว้ว่า default เลยพัง)

❌ **[ผิด] Set up an Amazon SNS Topic...**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! `SNS` มันคือสถานีวิทยุจส.100 โทรโข่งเป่าแตรกระจายข่าว... พอร้องเพลงปุ๊บก็หายวับไปกับตา! มัน **ไม่มีลิ้นชักเซฟเก็บประวัติ** และไม่รับประกันการเรียงลำดับเข้าออกด้วยฮะ ข้อมูลปลิวหายเข้ากลีบเมฆ ล้านเปอร์!! 

❌ **[ผิด] Create an Amazon Data Firehose...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! รุ่นน้องตัวเล็ก `Kinesis Data Firehose` มันมีเวทย์มนต์เอาไว้ "มัดรวมขยะมัดใหญ่ๆ แล้วค่อยยัดใส่ถัง S3/Redshift" มันเน้นรับจ้างเหมาเข่งโง่ๆ... แต่มันเสือก **ไม่มีระบบปั๊มเลขบาร์โค้ดตั๋วเรียงลำดับคิว (No strict ordering guarantees)!** ขืนใช้นี่ข้อความอักษร AI แม่งสลับบทหนังมั่วเป็นหอยเมาเห็ดแน่นอนฮะ!

---
---

## 📌 คำถามที่ 65
**โจทย์:**
A startup launched a new FTP server using an On-Demand EC2 instance in a newly created VPC with default settings. The server should not be accessible publicly but only through the IP address 175.45.116.100 and nowhere else.

Which of the following is the most suitable way to implement this requirement?

**ตัวเลือก:**
- [ ] Create a new Network ACL inbound rule in the subnet of the EC2 instance... Protocol: UDP, Port Range: 20-21, Source: 175.45.116.100/0, Allow
- [ ] Create a new Network ACL inbound rule in the subnet of the EC2 instance... Protocol: TCP, Port Range: 20-21, Source: 175.45.116.100/0, Allow
- [x] Create a new inbound rule in the security group of the EC2 instance with the following details: Protocol: TCP, Port Range: 20 - 21, Source: 175.45.116.100/32
- [ ] Create a new inbound rule in the security group of the EC2 instance... Protocol: UDP, Port Range: 20 - 21, Source: 175.45.116.100/32

---
### 🎯 โจทย์ต้องการอะไร?
เด็กจบใหม่ตั้งเซิร์ฟเวอร์โอนไฟล์ขยะ `FTP` บนเครื่องลูกทุ่ง `EC2` ในดินแดนหมู่บ้านใหม่กิ๊ก (VPC default settings)
เจ้านายสั่งกางม่านเหล็ก: "ห้ามคนหน้าไหนเจาะเข้าตึกนี้ได้เด็ดขาด! ยกเว้นไอพีพระเจ้าไอพีเดียวคือ `175.45.116.100` เท่านั้นกูถึงจะยอมเปิดกางเกงให้เข้า!"
คำถาม: ท่ายากสับขาหลอกอันไหน เขียนยันต์ติดกำแพงถูกวิธีเป๊ะที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ต้องรู้ประวัติศาสตร์การแพทย์ก่อนว่า โปรแกรม **`FTP`** มันใช้ภาษาคอหอยคุยกันผ่านพอร์ต **`TCP`** (ช่อง 20, 21)... ห้ามกาพวกตัวประหลาด UDP เด็ดขาด! (ตัดช้อยส์ทิ้งไป 2 ข้อสบายๆ)
- ทริค 2: สั่งล็อกเป้าหมายให้เข้าได้แค่ **"IP เครื่องคอมพิวเตอร์แค่เครื่องเดียวโดดๆ"** ต้องลงท้ายด้วยตัวเลขคำสาป **`/32`** เสมอ! (ถ้าใครทิ่ม /0 มาแปลว่าแม่งปล่อยผีเข้าได้ทั้งโลก... โดนสับขาหลอก)
- ทริค 3: หมู่บ้านเกิดใหม่ VPC แบบ Default... ไอ้ทหารยามรั้วกระทรวง `Network ACL` แม่งเปิดไฟเขียวให้ "มนุษย์ทั้งจักรวาลเดินเข้าออกได้อิสระอยู่แล้วแต่เกิด!" ดังนั้นไม่ต้องพยายามไปแก้รั้วประเทศ (NACL) หรอก ให้ไปแปะกระดาษยันต์ที่ประตูห้องนอน **`Security Group`** ก็พอฮะ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new inbound rule in the security group of the EC2 instance... Protocol: TCP, Port Range: 20 - 21, Source: 175.45.116.100/32**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! สมบูรณ์แบบทุกพิกเซล!
1 เลือกแม่กุญแจยามหน้าตึก **`Security Group`** ถูกต้องเผงสุด เพราะยามรั้ว NACL แม่งเปิดออโต้อยู่แล้ว
2 ใช้ภาษาการแพทย์ **`TCP`** ตรงรุ่นของ FTP เป๊ะ!
3 สำคัญสุด! ปิดท้ายรหัสลับสั่งตาย **`/32`** แปลกษิดิศแปลว่า "อนุญาตไอพีนี้แค่เครื่องเดียวในปฐพีเท่านั้น!" เจ้านายยิ้มกริ่ม รัดกุมชัวร์ 

❌ **[ผิด] Create a new inbound rule in the security group of the EC2 instance... Protocol: UDP... Source: 175.45.116.100/32**
- **ทำไมถึงผิด:** บอดตาใส! กาถูกมาซะยาว เสือกมาตกม้าตายตอนจบเลือกภาษา **`UDP`** ไปทำหอกระทิงอะไรเล่า!! FTP ปู่ทวดมึงใช้ UDP หรอฮะ โดนเตะล่วงเลยทีเดียว 

❌ **[ผิด] Create a new Network ACL inbound rule... Protocol: TCP... Source: 175.45.116.100/0...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! โดนหลอกซ้ำซ้อน 2 เด้ง! 
เด้งแรก... รั้วประเทศ NACL เค้าพ่นสีไฟเขียวไว้ให้ตั้งแต่เกิดแล้ว ไม่ต้องไปดันทุรังย้ำคิดย้ำทำ
เด้งสอง... โหดสัสรัสเซีย! มึงลงท้ายหางสุนัขด้วย **`/0`** แปลว่า "เชิญมหาโจรทั่วค่อนทวีปหน้าไหนก็ได้ วิ่งทะลุกำแพงเข้ามาได้หมดโลกใบนี้!!" มึงเปิดประตูขนาดนี้เจ้านายโดนแฮกยับ ขี้รั่วเลยฮะข้อนี้ เลวร้ายมาก!! 

---
---


