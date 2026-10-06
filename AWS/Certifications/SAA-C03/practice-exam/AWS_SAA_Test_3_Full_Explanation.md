# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 1: ข้อ 1 - 5)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 1
**โจทย์:**
A Data Analyst in a financial company is tasked to provide insights on stock market trends to the company's clients. The company uses AWS Glue extract, transform, and load (ETL) jobs in daily report generation, which involves fetching data from an Amazon S3 bucket. The analyst discovered that old data from previous runs were being reprocessed, causing the jobs to take longer to complete.

Which solution would resolve the issue in the most operationally efficient way?

**ตัวเลือก:**
- [x] Enable job bookmark for the ETL job.
- [ ] Create a Lambda function that removes any data already processed. Then, use Amazon EventBridge (Amazon CloudWatch Events) to trigger this function whenever the ETL job's status switches to SUCCEEDED.
- [ ] Parallelize the job by splitting the dataset into smaller partitions and processing them simultaneously using multiple EC2 instances.
- [ ] Increase the size of the dataset used in the job to speed up the extraction and analysis process.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทใช้ **AWS Glue** ทำ ETL ดึงข้อมูลจาก S3 มาประมวลผลทุกวัน แต่เจอปัญหาว่าข้อมูลเก่าที่ทำไปแล้ว ถูกเอามาทำซ้ำด้วย ทำให้งานเสร็จช้าลง
โจทย์อยากรู้วิธีแก้ปัญหาที่ **เปลืองแรงจัดการน้อยที่สุด (operationally efficient)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็น **`AWS Glue`** + ปัญหาเรื่อง **`old data... reprocessed`** (ประมวลผลข้อมูลเก่าซ้ำ) = มองหาคำว่า **`Job bookmark`** ทันที! เพราะฟีเจอร์นี้คือระบบที่คอยจดจำว่าอ่านไฟล์ถึงไหนแล้ว (เหมือนที่คั่นหนังสือ) จะได้ไม่อ่านของเก่าซ้ำ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable job bookmark for the ETL job.**
- **คืออะไร:** เปิดใช้งานระบบจดจำสถานะ (Job Bookmark) ของ AWS Glue
- **ทำไมถึงถูก:** Job Bookmark จะจำตําแหน่งไว้ว่าข้อมูลไหนประมวลผลไปแล้วบ้าง ครั้งต่อไปเมื่อรัน Job มันจะเอาเฉพาะข้อมูล "ใหม่" มาทำโดยอัตโนมัติ ประหยัดเวลาและไม่ต้องเขียนโปรแกรมอะไรเพิ่มเลย (Operationally efficient ที่สุด)

❌ **[ผิด] Create a Lambda function that removes any data already processed...**
- **ทำไมถึงผิด:** ให้ Lambda ตามลบข้อมูลที่ทำเสร็จไปแล้ว ถึงจะช่วยเรื่องซ้ำซ้อนได้ แต่มันยุ่งยากมาก (ต้องเซ็ต EventBridge) และถ้าเกิด Job ล้มเหลวกลางคืน ข้อมูลก็จะถูกลบทิ้งไปแล้ว ทำให้กู้งานกลับมาทำใหม่ไม่ได้

❌ **[ผิด] Parallelize the job by splitting the dataset...**
- **ทำไมถึงผิด:** การแบ่งข้อมูลให้หลายๆ เครื่องช่วยกันประมวลผล (Parallel) อาจทำให้เสร็จเร็วขึ้น แต่ไม่ได้แก้ปัญหาที่ต้นเหตุคือ "การไปดึงข้อมูลเก่ามาทำซ้ำ"

❌ **[ผิด] Increase the size of the dataset...**
- **ทำไมถึงผิด:** การโยนไฟล์ชุดใหญ่ขึ้นไม่ได้ทำให้ระบบคลี่คลายปัญหา แถมยิ่งทำให้ช้าและเปลืองทรัพยากรหนักกว่าเดิม

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Glue**: บริการ Serverless สำหรับทำงาน ETL (Extract, Transform, Load) เหมาะสำหรับเอามาเคลียร์และแปลงข้อมูลก้อนใหญ่ให้พร้อมวิเคราะห์

---
---

## 📌 คำถามที่ 2
**โจทย์:**
An online stock trading application stores financial data in an Amazon S3 bucket, with a lifecycle policy that moves older data to Glacier every month. A strict compliance requirement mandates that a surprise audit can occur at any time, and the required data must be retrievable in under 15 minutes under all circumstances. The manager has instructed that retrieval capacity be available when needed and should support up to 150 MB/s of retrieval throughput.

Which of the following will meet the given requirement? (Select TWO.)

**ตัวเลือก:**
- [ ] Specify a range, or portion, of the financial data archive to retrieve.
- [ ] Use Standard Retrieval for accessing the financial data.
- [ ] Use Bulk Retrieval to access the financial data.
- [x] Use Expedited Retrieval to access the financial data.
- [x] Purchase provisioned retrieval capacity.

---
### 🎯 โจทย์ต้องการอะไร?
แอปเทรดหุ้นเก็บข้อมูลเก่าไว้ใน **Amazon S3 Glacier** 
มีกฎข้อบังคับว่าต้องรองรับการถูกผู้ตรวจสอบ (Audit) สุ่มตรวจได้ตลอดเวลา และต้องสามารถ **ดึงข้อมูลกลับมาได้ภายในไม่เกิน 15 นาที ในทุกสภาวการณ์ (under all circumstances)** แถมผู้จัดการสั่งว่าต้องทำความเร็วในการคืนไฟล์ระดับ 150 MB/s แบบชัวร์ๆ
*(เลือก 2 ตัวเลือกที่สอดคล้องกัน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ดึงข้อมูลจาก **`Glacier`** โดยมีเวลาบังคับ **`under 15 minutes`** (ไม่เกิน 15 นาที) = ต้องตอบ **`Expedited Retrieval`** (แบบด่วนจี๋ ใช้เวลา 1-5 นาที) เท่านั้น! (ถ้าตอบ Standard = 3-5 ชั่วโมง / Bulk = 5-12 ชั่วโมง ให้ตัดทิ้ง)
- ทริคที่ 2: เจอคำว่าเสกของ **`under all circumstances`** (การันตีความพร้อมใช้งานในทุกๆสถานการณ์) บวกกับขอแบนด์วิธคงที่ **`150 MB/s`** = ต้องมีการจ่ายเงินจองช่องทางด่วนพิเศษ หรือที่เรียกว่า **`provisioned retrieval capacity`** นั่นเอง

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Expedited Retrieval to access the financial data.**
- **ทำไมถึงถูก:** Expedited คือแพ็กเกจการดาวน์โหลดข้อมูลออกจาก Glacier ที่เร็วที่สุด ใช้เวลาเอาของออกจากตู้แช่แค่ 1-5 นาทีเท่านั้น (ตามโจทย์ที่บังคับให้ใช้เวลาไม่เกิน 15 นาที)

✅ **[ถูกต้อง] Purchase provisioned retrieval capacity.**
- **ทำไมถึงถูก:** การจ่ายเงิน "ซื้อ Provisioned capacity" ทิ้งไว้ คือการซื้อคิว VIP การันตีว่าในยามที่คนแย่งดาวน์โหลดของจาก Glacier ทั้ง AWS คุณจะได้แบนด์วิธจัดเต็มที่ 150 MB/s แน่นอนร้อยเปอร์เซ็นต์ในทุกๆ สถานการณ์

❌ **[ผิด] Use Standard Retrieval... / Use Bulk Retrieval...**
- **ทำไมถึงผิด:** Standard ใช้เวลารอไฟล์ละลาย 3-5 ชั่วโมง ส่วน Bulk (ดึงเหมาโหลราคาถูกสุด) ใช้เวลารอ 5-12 ชั่วโมง ซึ่งมันเกินโควต้า 15 นาทีแน่นอน

❌ **[ผิด] Specify a range, or portion...**
- **ทำไมถึงผิด:** การเลือกดาวน์โหลดไฟล์มาแค่ครึ่งๆ กลางๆ (Range) ไม่ได้ช่วยลัดคิวให้ได้ไฟล์ใน 15 นาที ไม่เกี่ยวกับการเพิ่มสปีดหรือช่วยเพิ่มประสิทธิภาพเวลา Auditing จี้สั่ง

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon S3 Glacier**: บริการกล่องตู้แช่แข็งของ S3 เอาไว้ดองข้อมูลที่แทบจะไม่ได้แตะแล้ว (ถูกมาก) แต่เวลาจะเอาไฟล์ออกมาต้องรอละลายนาน (มีให้ดึง 3 ระดับความเร็ว: Expedited, Standard, Bulk)

---
---

## 📌 คำถามที่ 3
**โจทย์:**
A tech company is currently using Auto Scaling for their web application. A new AMI now needs to be used for launching a fleet of EC2 instances.

Which of the following changes needs to be done?

**ตัวเลือก:**
- [x] Create a new launch template.
- [ ] Create a new target group.
- [ ] Create a new target group and launch template.
- [ ] Do nothing. You can start directly launching EC2 instances in the Auto Scaling group with the same launch template.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทใช้ **Auto Scaling** ปั๊มเครื่อง EC2 อัตโนมัติอยู่ ตอนนี้มีเครื่องต้นแบบตัวใหม่ **(new AMI)** และอยากให้ Auto Scaling ตัวเดิมเอา AMI อันใหม่นี้ไปชุบแป้งทอด

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเปลี่ยนรูปโฉมรหัสประจำเครื่อง **`AMI`** ของกลุ่ม **`Auto Scaling`** = กฎเหล็กของระบบคือ "เราแก้ไขไส้ในแม่พิมพ์ Launch Template อันเดิมไม่ได้!" วิธีแก้เดียวคือต้อง **`Create a new launch template`** (สร้างพิมพ์เขียวเวอร์ชั่นใหม่ หรืออันใหม่ไปเลย)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new launch template.**
- **ทำไมถึงถูก:** หน้าที่ของ Launch template (พิมพ์เขียว) คือเก็บข้อมูลว่า EC2 ใหม่ต้องใช้แม่พิมพ์ไหน (AMI อะไร) ซึ่งกฎของ AWS คือเราไม่สามารถแก้ไขเนื้อในของ Launch template เวอร์ชั่นเก่าได้ เราเลยต้องกด "สร้างใหม่" เพื่อระบุ AMI ตัวล่าสุด แล้วค่อยสั่งให้ Auto Scaling หันมาใช้แม่พิมพ์ใหม่นี้แทน

❌ **[ผิด] Create a new target group.**
- **ทำไมถึงผิด:** Target Group เป็นเรื่องของการแบ่งกลุ่มเป้าหมายหลังบ้านให้ Load Balancer (ELB) เอาไว้รับและชี้ทางจราจร ไม่ได้เกี่ยวอะไรกับการอัปเดตระบบปฏิบัติการ (AMI) เครื่องต้นแบบเลย

❌ **[ผิด] Create a new target group and launch template.**
- **ทำไมถึงผิด:** ไม่มีความจำเป็นต้องสร้าง Target group ใหม่ สร้างเปลี่ยนแค่ Launch template อย่างเดียวก็พอ

❌ **[ผิด] Do nothing...**
- **ทำไมถึงผิด:** ถ้านั่งอยู่เฉยๆ ไม่ทำอะไร Auto Scaling ก็จะยังทำหน้ามึนปั๊มเครื่อง AMI เวอร์ชั่นเก่าขึ้นมาเรื่อยๆ เวลาที่มีโหลดหนักๆ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Launch Template**: พิมพ์เขียวสั่งตัดสูท เอาไว้ตั้งค่ามาตรฐาน (เช่น เลือก AMI อะไร, เครื่องไซส์ไหน, ความปลอดภัย Security Group ไหน) เลี้ยงประดับบารมีให้ Auto scaling นำไปผลิตเครื่องเหมือนๆ กัน

---
---

## 📌 คำถามที่ 4
**โจทย์:**
An on-premises server uses an SMB network file share to store application data. The application produces around 50 MB of data per day, but it only needs to access some of it for daily processes. To save on storage costs, the company plans to copy all the application data to AWS. However, the goal is to retain the ability to retrieve data with the same low-latency access as the local file share. The company does not have the capacity to develop the needed tools for this operation.

Which of the following should the company use?

**ตัวเลือก:**
- [x] AWS Storage Gateway
- [ ] Amazon FSx for Windows File Server
- [ ] AWS Virtual Private Network (VPN)
- [ ] AWS Snowball Edge

---
### 🎯 โจทย์ต้องการอะไร?
เซิร์ฟเวอร์ออฟฟิศ (On-premises) ใช้โปรโตคอล **SMB** (โฟลเดอร์แชร์ในเน็ตเวิร์ค) เก็บไฟล์ข้อมูล
บริษัทอยากขนไฟล์ทั้งหมดไป**ฝากคลาวด์ AWS (เพื่อประหยัดเงินค่าฮาร์ดดิสก์)** แต่ข้อแม้คือ เวลาดึงข้อมูลใช้งานในวันธรรมดา **ต้องได้ความเร็วปรู๊ดปร๊าด เสมือนไม่มีอะไรเปลี่ยนแปลง (low-latency access as local)**
และบริษัทนี้ **ไม่มีทีมโปรแกรมเมอร์เขียนโค้ด (does not have the capacity to develop tools)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเห็นคู่คำเชื่อมโยงจากบริษัทที่มี **`SMB`** หรือ NFS และต้องการยัดไฟล์ลงหลุม **`AWS`** เพื่อให้แอปในออฟฟิศทำงานไวเหมือนเดิม (มี Cache ฝั่ง Local) = คำตอบคือบริการสะพานข้ามภพ **`AWS Storage Gateway`** (โหมด File Gateway) ทันที!
- ทริคที่ 2: เจอคำลบข้ออ้าง **`does not have the capacity to develop tools`** = ให้หาตัวเลือกที่เป็นบริการเบ็ดเสร็จของ AWS ไม่ต้องมาทนเขียนสคริปต์ก๊อปปี้ไฟล์เอาเอง

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Storage Gateway**
- **ทำไมถึงถูก:** File Gateway (ในชุด AWS Storage Gateway) จะทำตัวเป็นเซิร์ฟเวอร์ SMB ปลอมๆ ตั้งไว้ที่ออฟฟิศ เพื่อหลอกให้ไฟล์วิ่งผ่านมันไปเก็บใน Amazon S3 บนคลาวด์อัตโนมัติ (ประหยัดค่าแผ่นดิสก์) แถมมันมีความสามารถพิเศษคือจดจำไฟล์ที่เพิ่งถูกเรียกใช้บ่อยๆ อมไว้ในออฟฟิศด้วย (Local caching) ทำให้แอปดึงไฟล์ได้เร็วพุ่งทะยานเท่าเดิมแป๊ะตามโจทย์ที่สั่งเป๊ะ

❌ **[ผิด] Amazon FSx for Windows File Server**
- **ทำไมถึงผิด:** FSx คือการขนขุมทรัพย์แฟ้ม Windows ไปตั้งบนน่านฟ้า AWS ล้วนๆ ดังนั้นเวิร์คโหลดจากออฟฟิศต้องพึ่งพาเน็ตอินเทอร์เน็ตในการโหลดเอกสารข้ามประเทศทุกครั้ง (ไม่มีกลไกอม Local Cache) ทำให้ความเร็วตกลงไม่สามารถทำ Low-latency access เสมือนออฟฟิศได้

❌ **[ผิด] AWS Virtual Private Network (VPN)**
- **ทำไมถึงผิด:** VPN เป็นแค่ท่อดำน้ำสร้างความปลอดภัยบนเครือข่ายอินเทอร์เน็ต ไม่ใช่กล่องเก็บฝากไฟล์และพ่วง Cache ย้ายของแต่อย่างใด

❌ **[ผิด] AWS Snowball Edge**
- **ทำไมถึงผิด:** เป็นเครื่องส่งข้อมูลแบบกระเป๋าเดินทางสแตนเลส (ใส่รถบรรทุกของจริง) ใช้ขนย้ายไฟล์ก้อนใหญ่ระดับ Petabyte ไปสิงค์โปร์ ไม่ใช่ตัวทำงาน Sync ข้อมูลรายวันแบบเชื่อมต่อ SMB

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Storage Gateway (File Gateway)**: ทูตทำหน้าที่เชื่อมฮาร์ดดิสก์ออฟฟิศ (NFS, SMB) ดุนของเข้าไปให้ลอยอยู่บน Amazon S3 อย่างปลอดภัย มีฟีเจอร์ Cache ท้องถิ่นให้แอปเรียกซ้ำไวขิงๆ

---
---

## 📌 คำถามที่ 5
**โจทย์:**
A large insurance company has an AWS account that contains three VPCs (DEV, UAT and PROD) in the same region. UAT is peered to both PROD and DEV using a VPC peering connection. All VPCs have non-overlapping CIDR blocks. The company wants to push minor code releases from Dev to Prod to speed up time to market.

Which of the following options helps the company accomplish this?

**ตัวเลือก:**
- [ ] Do nothing. Since these two VPCs are already connected via UAT, they already have a connection to each other.
- [x] Create a new VPC peering connection between PROD and DEV with the appropriate routes.
- [ ] Create a new entry to PROD in the DEV route table using the VPC peering connection as the target.
- [ ] Change the DEV and PROD VPCs to have overlapping CIDR blocks to be able to connect them.

*(หมายเหตุ: ในข้อสอบจริง ข้อนี้ให้เลือกข้อเดียว ซึ่งข้อที่เป็นคู่คำตอบที่ถูกต้องคือ: สร้าง VPC peering ใหม่ระหว่าง PROD และ DEV และอัปเดต Route)*

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมี 3 แผนก 3 ห่วงข่าย (VPCs): **DEV, UAT, PROD**
ปัจจุบัน **UAT** เป็นตรงกลาง สร้างสะพานข้าม (VPC Peering) ไปหาทั้ง **PROD** และ **DEV** 
แต่อยู่มาวันหนึ่ง ทีม **DEV** ต้องการส่งโค้ดทางลัดข้ามไปหา **PROD** โดยตรง! 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กแสนคลาสสิคของ VPC Peering คือ **"ห้ามกระโดดข้ามหัวเพื่อนเด็ดขาด!"** (Non-transitive peering) หมายความว่า ต่อให้ A เชื่อม B และ B เชื่อม C ... A กับ C กลับคุยกันไม่รู้เรื่องนะจ๊ะ! 
- ทริคที่ 2: ถ้าอยากให้ A กับ C (DEV กับ PROD) คุยกันได้ = **`Create a new VPC peering connection`** (คุณก็จับทั้งคู่ลากมาแต่งงานเชื่อมชิปกันตรงๆ เลยสิ + อย่าลืมเปิดป้ายบอกทาง/appropriate routes)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new VPC peering connection between PROD and DEV with the appropriate routes.**
- **ทำไมถึงถูก:** เพราะ VPC Peering เป็นความสัมพันธ์แบบตัวต่อตัว (Non-transitive) การที่ DEV เชื่อมผ่าน UAT ไม่ได้ทำให้เป็นนายหน้าพาไปส่งถึง PROD ได้ ถ้า DEV อยากแอบคุยกับ PROD ทั้งคู่ต้องสร้าง VPC Peering Connection ตรงๆ หากัน และตั้งป้ายจราจร Route Tables ใหม่ไปหากัน

❌ **[ผิด] Do nothing. Since these two VPCs are already connected via UAT...**
- **ทำไมถึงผิด:** ตกหลุมพรางอย่างจัง! VPC Peering ไม่ใช่การเชื่อมเครือข่ายใยแมงมุม (Transitive ไม่ได้) UAT เป็นตัวกลางให้DEVฝากของไปPRODไม่ได้เด็ดขาด 

❌ **[ผิด] Create a new entry to PROD in the DEV route table using the VPC peering connection as the target.**
- **ทำไมถึงผิด:** แค่เอานิ้วไปวาดป้ายบอกทาง (Route Table) อย่างเดียวมันไปไม่ถึงหรอกครับ เพราะคุณยังไม่ได้จ่ายสัมปทานสร้างถนน (VPC Peering Connection) เชื่อมกันจริงๆ เลย

❌ **[ผิด] Change the DEV and PROD VPCs to have overlapping CIDR blocks...**
- **ทำไมถึงผิด:** หายนะชัดๆ! การตั้งรหัสเครื่อง (CIDR Block) ให้เหมือนกันเป๊ะ (Overlapping) จะทำให้ AWS มึนงงว่าใครคือตัวจริง และมันเป็นกฎเหล็กห้ามทำ VPC Peering ระหว่าง IP ชนกันด้วย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **VPC Peering**: สายไฟจั๊มเชื่อมโยงให้วง LAN ของคุณสองวงส่งข้อมูลหากันได้เป็นการส่วนตัว โดยไม่กระเด็นออกสู่อินเทอร์เน็ตสาธารณะ
- **Transitive Routing**: AWS มักเตือนเสมอว่า VPC Peering ขี้งก ไม่มีใครเป็นป๋าดันให้ใคร อยากคุยกันต้องจีบกัน(สร้างเส้น)ตรงๆ ยกเว้นคุณจะยอมจ่ายเงินซื้อ "Transit Gateway" (ตู้ชุมสายกลาง)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 2: ข้อ 6 - 10)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 6
**โจทย์:**
You are automating the creation of EC2 instances in your VPC. Hence, you wrote a python script to trigger the Amazon EC2 API to request 50 EC2 instances in a single Availability Zone. However, you noticed that after 20 successful requests, subsequent requests failed.

What could be a reason for this issue and how would you resolve it?

**ตัวเลือก:**
- [ ] By default, AWS allows you to provision a maximum of 20 instances per Availability Zone. Select a different Availability Zone and retry the failed request.
- [ ] There was an issue with the Amazon EC2 API. Just resend the requests and these will be provisioned successfully.
- [x] There is a vCPU-based On-Demand Instance limit per region which is why subsequent requests failed. Just submit the limit increase form to AWS and retry the failed requests once approved.
- [ ] By default, AWS allows you to provision a maximum of 20 instances per region. Select a different region and retry the failed request.

---
### 🎯 โจทย์ต้องการอะไร?
เขียนสคริปต์ Python สั่งสร้างเครื่อง **EC2 จำนวน 50 เครื่อง** ผ่าน API
แต่ปรากฏว่า **สร้างไปได้แค่ 20 เครื่องปุ๊บ สคริปต์พังและด่ากลับมา!**
โจทย์อยากรู้ว่า "สาเหตุคืออะไร?" และ "ต้องแก้ปัญหาอย่างไร?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเห็นการสร้างเครื่อง `EC2` แล้วโดนบล็อคตัวเลขไว้ที่ **`20 instances`** (สร้างต่อไม่ได้) = ปัญหานี้เรียกว่า **`vCPU-based On-Demand Limit`** ของ AWS (การจำกัดโควต้ากันคนกดเล่นจนตังค์หมด) และวิธีแก้คือ **"ต้องกรอกเอกสารส่งแบบฟอร์ม (Submit increase form) ขอเพิ่มลิมิตจาก AWS"** เท่านั้น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] There is a vCPU-based On-Demand Instance limit per region... Just submit the limit increase form to AWS...**
- **ทำไมถึงถูก:** บัญชีผู้ใช้ AWS ทุกคนจะมีขีดจำกัดจำนวน On-Demand vCPU (ซอฟต์ลิมิตต่อ Region) ป้องกันการถูกแฮ็กเกอร์เอาไปรันขุดเหรียญ วิธีแก้ก็แค่ส่งเรื่อง "Request Limit Increase Form" เพื่อขอปลดล็อกจำนวนเครื่อง

❌ **[ผิด] By default, AWS allows... 20 instances per Availability Zone. Select a different Availability Zone...**
- **ทำไมถึงผิด:** โควต้าเครื่องจำกัดที่ระดับ Region (ภูมิภาค) ไม่ใช่ Availability Zone (ตู้) การหนีไปสร้างใน AZ ข้างๆ ภายในโซนเดิม ยังไงก็ชนเพดานอยู่ดี

❌ **[ผิด] There was an issue with the Amazon EC2 API. Just resend the requests...**
- **ทำไมถึงผิด:** ไม่ได้ล่มเพราะ API พังหรือบั๊ก ต่อให้สแปมรันสคริปต์ส่งคำขอรัวๆ กี่ครั้ง มันก็เด้งกลับอยู่ดีเพราะลิมิตเต็ม

❌ **[ผิด] By default, AWS allows... 20 instances per region. Select a different region and retry...**
- **ทำไมถึงผิด:** หนีไป Region อื่นก็อาจจะสร้างได้จริง แต่มันไม่ใช่วิธีแก้ปัญหาที่ตรงจุด บริษัทอยากได้ 50 เครื่องรวมกันในแอปเดียวกัน การกระจายข้ามทวีปทำให้ระบบเละเทะและผิดวัตถุประสงค์ (ที่ถูกคือต้องกรอกเอกสารขอเพิ่มโควต้า)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Service Limits**: กฎข้อบังคับที่กันคนพลาดกดเกิน (กันบิลช็อก) โดยค่า Default จะให้เรามี EC2 (On-Demand) ปั่นได้ประมาณระดับนึง ถ้าต้องใช้บิ๊กเบิ้มกว่านั้นต้องเคาะประตูบ้าน Support ของ AWS

---
---

## 📌 คำถามที่ 7
**โจทย์:**
A Solutions Architect needs to deploy a mobile application that collects votes for a singing competition. Millions of users from around the world will submit votes using their mobile phones. These votes must be collected and stored in a highly scalable and highly available database which will be queried for real-time ranking. The database is expected to undergo frequent schema changes throughout the voting period.

Which of the following combination of services should the architect use to meet this requirement?

**ตัวเลือก:**
- [ ] Amazon Aurora and Amazon Cognito
- [ ] Amazon Relational Database Service (RDS) and Amazon MQ
- [ ] Amazon DocumentDB (with MongoDB compatibility) and Amazon AppFlow
- [x] Amazon DynamoDB and AWS AppSync

---
### 🎯 โจทย์ต้องการอะไร?
แอปมือถือโหวตประกวดร้องเพลง มีคนกดโหวตจากทั่วโลก **(Millions of users)**
ข้อมูลผลโหวตต้องเอาไปทำ "อันดับคะแนนทันที" **(real-time ranking)**
และตารางฐานข้อมูลมีการ "เปลี่ยนแปลงคอลัมน์บ่อยมาก" **(frequent schema changes)**
*(ให้เลือก 2 บริการที่เหมาะสมมาจับคู่กัน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: โจทย์ที่พูดถึง **`frequent schema changes`** (คอลัมน์เปลี่ยนบ่อยไม่ตายตัว) หรือคนใช้เยอะทะลักล้านคน **`Millions of users`** = ให้ตัดฐานข้อมูลแบบมีกรอบ (Relational DB) อย่าง RDS กับ Aurora ทิ้งไปก่อนเลย! แล้วฟันธงตอบฐานข้อมูลไร้กรอบ (NoSQL) ตัวชูโรงอย่าง **`Amazon DynamoDB`** 
- ทริคที่ 2: เจอคำว่า **`real-time`** วิ่งคู่กับแอปมือถือ และใช้ดึงข้อมูลตาราง = บริการเชื่อมต่อทำ Live Update ทันใจที่ดีที่สุดคือ **`AWS AppSync`** (รองรับ GraphQL)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon DynamoDB and AWS AppSync**
- **ทำไมถึงถูก:** `DynamoDB` เป็น NoSQL ที่ไร้รูปแบบโครงสร้าง (Schemaless) ทำให้เปลี่ยนคอลัมน์เมื่อไหร่ก็ได้ตามโจทย์เป๊ะ แถมรองรับคนกดโหวตกระหน่ำระดับล้านครั้งต่อวิได้สบายแฮ ส่วน `AppSync` จะยิงข้อมูลเชื่อมผลคะแนนแบบ Real-time กลับไปพ่นใส่แอปมือถือทันใจแฟนคลับที่สุด

❌ **[ผิด] Amazon Aurora and Amazon Cognito**
- **ทำไมถึงผิด:** `Aurora` เป็นฐานข้อมูลแบบตารางเป๊ะๆ (Relational SQL) การจะรื้อเปลี่ยน Schema บ่อยๆ กลางรายการโหวตคือสร้างความพังพินาศได้ง่าย และ Cognito เป็นแค่ยามเฝ้าล็อกอิน ไม่เกี่ยวอะไรกับ Real-time ranking

❌ **[ผิด] Amazon Relational Database Service (RDS) and Amazon MQ**
- **ทำไมถึงผิด:** RDS ก็คือ SQL (แก้ Schema ยากเหมือน Aurora) และ MQ คือท่อส่งจดหมาย (Message Broker) ไม่ใช่ระบบอัปเดตหน้าจอมือถือ Real-time

❌ **[ผิด] Amazon DocumentDB (with MongoDB compatibility) and Amazon AppFlow**
- **ทำไมถึงผิด:** `DocumentDB` เป็น NoSQL เหมือนกัน (พอใช้ได้) แต่ `AppFlow` คือท่อดูดข้อมูลเพื่อส่งออกไปหาโปรแกรมภายนอกออฟฟิศ (เช่น Salesforce, Zendesk) ไม่ได้เอามาทำหน้าจอ Real-time ใส่แอปพลิเคชัน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon DynamoDB**: บริการฐานข้อมูลแบบเสรี (NoSQL) ของ AWS ใช้ตารางรูปแบบหลวมๆ รองรับความเร็วอภิมหาศาล ค้นหาคำตอบเจอกระพริบตาเดียว
- **AWS AppSync**: หัวใจหลักในการทำข้อมูลอัปเดตแบบ Live บนมือถือ (ลืมวิธี Refresh หน้าจอแบบเก่าๆไปได้เลย)

---
---

## 📌 คำถามที่ 8
**โจทย์:**
A Solutions Architect is managing a company's AWS account of approximately 300 IAM users. They have a new company policy that requires changing the associated permissions of all 100 IAM users that control the access to Amazon S3 buckets.

What will the Solutions Architect do to avoid the time-consuming task of applying the policy to each user?

**ตัวเลือก:**
- [ ] Create a new S3 bucket access policy with unlimited access for each IAM user.
- [ ] Create a new policy and apply it to multiple IAM users using a shell script.
- [ ] Create a new IAM role and add each user to the IAM role.
- [x] Create a new IAM group and then add the users that require access to the S3 bucket. Afterward, apply the policy to the IAM group.

---
### 🎯 โจทย์ต้องการอะไร?
มีพนักงานในบัญชีถึง **300 ยูสเซอร์** มีนโยบายใหม่ของบริษัทสั่งให้ "เปลี่ยนสิทธิ์การเข้าถึงไฟล์ใน S3" ใหม่ให้กับพนักงาน **100 คน**
คำถาม: แอดมินจะทำยังไงให้เรื่องนี้ง่ายสุด โดย**ไม่ต้องมานั่งไล่ติ๊กมือทำทีละคนให้ปวดหลัง (avoid time-consuming task)** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎทองของกระทรวง IAM เวลาต้องแจกจ่ายสิทธิ์ให้กับฝูงชนหลายๆคนพร้อมกัน (จัดการทีละ lots) = คำตอบมีเพียงสิ่งเดียวบนโลก AWS คือ **`Create a new IAM group`** (จับยัดลงกลุ่ม) แล้วโยนป้ายคำสั่งให้กลุ่มก้อนนั้นถือเอาไว้!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new IAM group and then add the users... Afterward, apply the policy to the IAM group.**
- **ทำไมถึงถูก:** การจัดการสิทธิ์ที่ดีที่สุด (Best Practice) ไม่ใช่การไล่ติดบัตรให้พนักงานทีละคน แต่เป็นการ "สร้างแผนก (IAM Group)" เช่น กลุ่มใช้งานS3 จากนั้นดึงพนักงาน 100 คนมาเข้ากลุ่ม ហើយแปะป้ายกฎ (Policy) ให้กลุ่มนี้แค่อันเดียว! เรียบร้อยจบปิ๊ง

❌ **[ผิด] Create a new policy and apply it to multiple IAM users using a shell script.**
- **ทำไมถึงผิด:** ถึงการเขียนสคริปต์คอมพิวเตอร์ยิงคำสั่งไปแปะสิทธิ์ 100 คนพร้อมกันจะประหยัดเวลาชั่วคราวซิวๆ แต่วันหน้าก็วุ่นวายตอนที่มีเด็กเข้าใหม่หรือลาออกอยู่ดี เพราะไม่ได้เอาคนมารวมกันไว้ในห้องกลุ่มให้เป็นระเบียบ

❌ **[ผิด] Create a new IAM role and add each user to the IAM role.**
- **ทำไมถึงผิด:** คอนเซปแปลกประหลาดมาก IAM Role มันเอาไว้สวมหมวกชั่วคราว (เหมือนหุ่นยนต์ EC2 สวมรอย) เราไม่ได้เอาพนักงาน (IAM user) เข้าไปอยู่ใน IAM Role

❌ **[ผิด] Create a new S3 bucket access policy with unlimited access...**
- **ทำไมถึงผิด:** การโยนสิทธิ์เทพ (Unlimited access) เหมาให้ทุกคนไม่ได้แก้ปัญหาที่เสียเวลาจัดการ แถมยังแหกคอกกฎความปลอดภัยข้อร้ายแรงของบริษัทอีกด้วย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **IAM Group**: ห้องชมรมหรือแผนก เมื่อใครเดินเข้าห้องนี้ก็จะได้รับสิทธิ์การใช้งานตามที่ห้องนั้นตั้งไว้ เวลาปลดสิทธิ์ก็แค่แตะคนออกจากห้องไป

---
---

## 📌 คำถามที่ 9
**โจทย์:**
A large financial firm in the country has an AWS environment that contains several Reserved EC2 instances hosting a web application that has been decommissioned last week. To save costs, you need to stop incurring charges for the Reserved instances as soon as possible.

What cost-effective steps will you take in this circumstance? (Select TWO.)

**ตัวเลือก:**
- [x] Go to the AWS Reserved Instance Marketplace and sell the Reserved instances.
- [ ] Go to the Amazon.com online shopping website and sell the Reserved instances.
- [ ] Stop the Reserved instances as soon as possible.
- [x] Terminate the Reserved instances as soon as possible to avoid getting billed at the on-demand price when it expires.
- [ ] Contact AWS to cancel your AWS subscription.

---
### 🎯 โจทย์ต้องการอะไร?
แอปเก่าของบริษัทถูก "ปิดตัวลงไปแล้วเมื่อสัปดาห์ก่อน (decommissioned)"
แต่ดันเผลอซื้อตั๋วเครื่อง **Reserved EC2 instances** (เครื่องจ่ายเงินซื้อเหมาโปรโมชั่นรายปี) ทิ้งเอาไว้
โจทย์ถาม: ทำยังไงให้บริษัท **"หยุดเสียเงินให้เร็วที่สุดและเซฟเงิน (cost-effective)"** กับเครื่องโปรแบบนี้บ้าง ???
*(เลือก 2 ตัวเลือกที่สอดคล้องกัน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอคำว่าไม่อยากใช้ **`Reserved instances`** (ซื้อตั๋วปีไปแล้วแต่อยากเท) วิธีการถอนทุนคืนที่ฉลาดที่สุดคือการ **`Sell (ขายต่อ)`** ที่ **`AWS Reserved Instance Marketplace`**
- ทริคที่ 2: แม้จะขายเอาเงินคืน ก็ต้องจำกัดแผลระวังเลือดไหลต่อ! เพราะถ้าตั๋วหมดอายุ มันจะดีดตัวเองเปลี่ยนสถานะกลับไปคิดราคาแพงหูฉี่แบบ (On-demand) ดังนั้นเราต้องกดระเบิดทำลายทิ้ง **`Terminate`** มันไปด้วย

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Go to the AWS Reserved Instance Marketplace and sell the Reserved instances.**
- **ทำไมถึงถูก:** ตลาดนัดสัญญาเช่าของ AWS อนุญาตให้บริษัทที่ติดแหงกจ่ายค่าเซิร์ฟเวอร์แบบเหมาปี นำเครื่อง(สัญญาค้าง)ไปเร่ขายต่อให้ลูกค้าคนอื่นที่อยากเช่าระยะสั้นได้ เป็นทางเดียวที่จะกู้เงินคืนมาคุ้มสุด

✅ **[ถูกต้อง] Terminate the Reserved instances as soon as possible to avoid getting billed at the on-demand price when it expires.**
- **ทำไมถึงถูก:** การลบเครื่อง (Terminate) ทิ้งไปเลย เป็นการปิดประตูความเสี่ยง เพราะถ้าเราลืมทิ้งไว้จนอายุโปรโมชั่นรายปีหมดแล้วเครื่องยังตั้งโด่อยู่ ระบบมันจะหักเงินเราตามราคาเต็ม (On-Demand) ไปเรื่อยๆ เป็นเงาแค้นตามหลอกหลอน

❌ **[ผิด] Stop the Reserved instances as soon as possible.**
- **ทำไมถึงผิด:** การแค่กด "Stop (ปิดจอ)" EC2 ไม่ได้ช่วยดับภาระใดๆ เพราะ AWS จะยังคงหักเงินเก็บค่าที่จอดรถ (เช่น Elastic IP หรือ EBS วอลลุ่มที่ติดอยู่) ตามเดิม 

❌ **[ผิด] Contact AWS to cancel your AWS subscription.**
- **ทำไมถึงผิด:** โคตรทำลายล้าง... ยกเลิกบัญชี AWS ทิ้งทั้งหมดไปคลี่ปมกับสัญญา Reserved แค่ไม่กี่เครื่องเนี่ยนะฮะ! ทำไม่ได้จ้า ถ้ามีทรัพยากรอื่นวิ่งอยู่บริษัทได้พังพินาศแน่

❌ **[ผิด] Go to the Amazon.com online shopping website...**
- **ทำไมถึงผิด:** Amazon.com เอาไว้ซื้อสบู่ เครื่องซักผ้าครับ ไม่ใช่ตลาดขายสัญญาเซิร์ฟเวอร์คลาวด์ 😂

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Reserved Instances (RI)**: ซื้อตั๋วเช่าเหมาจ่ายล่วงหน้า 1 ปี หรือ 3 ปี (ราคาถูกลง 70%) ข้อเสียคือผูกมัดเหมือนเน็ตค่ายมือถือ
- **AWS Reserved Instance Marketplace**: ตลาดมือสองของคนโดนผูกมัด ปล่อยโอนสัญญาต่อให้เพื่อนใช้แทนได้

---
---

## 📌 คำถามที่ 10
**โจทย์:**
A Solutions Architect is working for a large insurance firm. To maintain compliance with HIPAA laws, all data that is backed up or stored on Amazon S3 needs to be encrypted at rest.

Which encryption methods can be employed, assuming S3 is being used for storing financial-related data? (Select TWO.)

**ตัวเลือก:**
- [ ] Store the data on EBS volumes with encryption enabled instead of using Amazon S3
- [ ] Use AWS Shield to protect your data at rest
- [x] Encrypt the data using your own encryption keys then copy the data to Amazon S3 over HTTPS endpoints.
- [ ] Store the data in encrypted EBS snapshots
- [x] Enable SSE on an S3 bucket to make use of AES-256 encryption

---
### 🎯 โจทย์ต้องการอะไร?
บริษัททำประกัน ภายใต้กฎหมาย **HIPAA** (รักษาความลับขีดสุด) 
ข้อมูลทุกอย่างที่เก็บใน **Amazon S3 ต้องถูกเข้ารหัสขณะหลับล็อกขัง (Encrypted at rest)**
โจทย์ถาม: ท่าตั้งค่าการเข้ารหัสข้อมูลใน S3 แบบไหนที่ทำได้บ้าง?
*(เลือก 2 ตัวเลือกที่สอดคล้องกัน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: โจทย์ถามเจาะจงที่ **`Amazon S3`** ก็ให้ตัดตัวเลือกที่หลอกชวนหนีไปใช้ตัวอื่นอย่าง **`EBS volumes`** หรือ **`EBS snapshots`** ทิ้งทันที (โจทย์ไม่ได้ถามหาฮาร์ดดิสก์ EBS)
- ทริคที่ 2: เข้ารหัสใน **`S3`** มีแค่กระโดด 2 ท่าหลักๆ คือ 1. ให้ AWS ล็อกให้ = **`SSE (Server-Side Encryption)`** / 2. ล็อกคอเองจากบ้าน = **`Client-side Encryption / your own encryption keys`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable SSE on an S3 bucket to make use of AES-256 encryption**
- **ทำไมถึงถูก:** SSE (Server-Side Encryption) เป็นท่ามาตรฐานที่ AWS ยื่นกุญแจรุ่นหนา (AES-256) มาพันข้อมูลเราให้ตอนที่โยนไฟล์ลงกล่อง ข้อนี้ผ่านเกณฑ์เข้ารหัส At rest แน่นอนสบายใจ

✅ **[ถูกต้อง] Encrypt the data using your own encryption keys then copy the data to Amazon S3 over HTTPS endpoints.**
- **ทำไมถึงถูก:** ท่าเข้ารหัสเองในออฟฟิศ หรือ Client-side Encryption เอาไฟล์ห่อฟอยด์พันเทปไขว้รหัสผ่านให้เสร็จสับ แล้วค่อยอัปโหลดวิ่งผ่านเลนปลอดภัย (HTTPS) ไปโยนใส่กล่องของป้าแอมะซอน (S3) อันนี้ก็ถูกหลักความปลอดภัยระดับองค์กรเช่นกัน

❌ **[ผิด] Store the data on EBS volumes...**
- **ทำไมถึงผิด:** หลุดโจทย์ ถามช้างตอบม้า! เค้าบังคับให้ใช้ S3 มาไล่ให้ไปใช้ EBS ทำไม

❌ **[ผิด] Store the data in encrypted EBS snapshots**
- **ทำไมถึงผิด:** เหมือนข้อด้านบน เอาไฟล์แบ็กอัปไปดองเป็น Snapshot ใน EBS ผิดโจทย์จ้า

❌ **[ผิด] Use AWS Shield to protect your data at rest**
- **ทำไมถึงผิด:** AWS Shield เป็นโล่ป้องกันแฮ็กเกอร์รุมกระทืบเว็บ (DDoS) ไม่ได้เป็นฟังก์ชันที่เอาไว้ใส่แม่กุญแจเข้ารหัสไฟล์ในฮาร์ดดิสก์ให้งงเล่นเลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 SSE-S3 (Server-Side Encryption)**: ล็อกแม่กุญแจที่ฝั่งปลายทาง (AWS เอาไปล็อกให้) ง่ายดีไม่ต้องเปลืองแรง
- **Client-Side Encryption**: ล็อกรหัสผ่านจากคอมที่บ้านให้เสร็จ แล้วค่อยส่งรอยขยุกขยิกขึ้นคลาวด์ ปลอดภัยแบบหลอนๆ ดี!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 3: ข้อ 11 - 15)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 11
**โจทย์:**
A company is storing its financial reports and regulatory documents in an Amazon S3 bucket. To comply with the IT audit, they tasked their Solutions Architect to track all new objects added to the bucket as well as the removed ones. It should also track whether a versioned object is permanently deleted. The Architect must configure Amazon S3 to publish notifications for these events to a queue for post-processing and to an Amazon SNS topic that will notify the Operations team.

Which of the following is the MOST suitable solution that the Architect should implement?

**ตัวเลือก:**
- [ ] Create a new Amazon SNS topic and Amazon MQ. Add an S3 event notification configuration on the bucket to publish s3:ObjectAdded:* and s3:ObjectRemoved:* event types to SQS and SNS.
- [x] Create a new Amazon SNS topic and Amazon SQS queue. Add an S3 event notification configuration on the bucket to publish s3:ObjectCreated:* and s3:ObjectRemoved:Delete event types to SQS and SNS.
- [ ] Create a new Amazon SNS topic and Amazon SQS queue. Add an S3 event notification configuration on the bucket to publish s3:ObjectCreated:* and ObjectRemoved:DeleteMarkerCreated event types to SQS and SNS.
- [ ] Create a new Amazon SNS topic and Amazon MQ. Add an S3 event notification configuration on the bucket to publish s3:ObjectCreated:* and ObjectRemoved:DeleteMarkerCreated event types to SQS and SNS.

---
### 🎯 โจทย์ต้องการอะไร?
เก็บบัญชีใน **Amazon S3** ต้องการให้นักสืบมาตั้งเสาสัญญาณแจ้งเตือนเวลา **"มีไฟล์ถูกเพิ่มเข้ามาใหม่"** และ **"ไฟล์ถูกลบถาวรไป"** 
โดยต้องส่งคิวไปทำงานต่อ **(a queue)** และส่งอีเมลแจ้งทีมงาน **(SNS topic)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าหาบริการมาทำ **`a queue`** สำหรับรับข้อความจาก S3 ท่องไว้เลยว่าต้องเป็นพระเอกคู่บุญ **`Amazon SQS`** เท่านั้น (ห้ามใช้ Amazon MQ เพราะ S3 คุยกับ MQ ตรงๆไม่ได้!)
- ทริคที่ 2: จำศัพท์เฉพาะของคำสั่ง S3 Event > ถ้าเป็น "สร้างไฟล์" เรียกว่า **`s3:ObjectCreated:*`** (ไม่มีคำว่า ObjectAdded) / ถ้าเป็น "ลบไฟล์ถาวร" เรียกว่า **`s3:ObjectRemoved:Delete`** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new Amazon SNS topic and Amazon SQS queue. Add an S3 event notification configuration on the bucket to publish s3:ObjectCreated:* and s3:ObjectRemoved:Delete...**
- **ทำไมถึงถูก:** การเชื่อม S3 Event ไปหา Amazon SNS และ Amazon SQS คือสูตรสำเร็จที่ถูกต้อง อีกทั้งยังอ้างอิงชื่อคำสั่งสร้าง (`s3:ObjectCreated:*`) และลบไฟล์ถาวร (`s3:ObjectRemoved:Delete`) ได้ถูกต้องตามคู่มือเป๊ะๆ

❌ **[ผิด] Create a new Amazon SNS topic and Amazon MQ... (มีคำว่า s3:ObjectAdded)**
- **ทำไมถึงผิด:** ผิดสองเด้ง! 1. S3 ไม่ส่ง Notification เข้า Amazon MQ และ 2. ในโลก AWS ไม่มี Event ชื่อ `s3:ObjectAdded:*` จ้า (มันเรียกว่า ObjectCreated ตังหาก)

❌ **[ผิด] Create a new Amazon SNS topic and Amazon SQS queue... (มีคำว่า ObjectRemoved:DeleteMarkerCreated)**
- **ทำไมถึงผิด:** คำสั่ง `ObjectRemoved:DeleteMarkerCreated` คือการแค่ "แปะป้ายลบหลอกๆ" (เวลาที่เปิด Versioning ไว้) ซึ่งขัดกับโจทย์ที่ร้องหาการตรวจจับเวลายูสเซอร์ "ลบไฟล์ทิ้งหายสาบสูญไปเลย (permanently deleted)" ซึ่งต้องใช้ `s3:ObjectRemoved:Delete` 

❌ **[ผิด] Create a new Amazon SNS topic and Amazon MQ... (มีคำว่า ObjectRemoved:DeleteMarkerCreated)**
- **ทำไมถึงผิด:** ผิดทั้ง MQ และชื่อฟังก์ชั่น DeleteMarkerCreated ดังอธิบายไว้ข้างต้นแจ้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Event Notification**: ฟีเจอร์ตัวแฉ ถ้ามีใครมายุ่งกับไฟล์ มันจะตะโกนฟ้องไปหา SNS(ส่งอีเมล), SQS(ทำคิวงาน) หรือยิง Lambda ทันที
- **Amazon SQS / Amazon SNS**: สองคู่หูนักกระจายข่าวสาร SQS=จัดคิวให้โปรแกรมมารับ / SNS=ตะโกนใส่ลำโพงให้ส่งข้อความออก

---
---

## 📌 คำถามที่ 12
**โจทย์:**
A company that is rapidly growing in recent months has been in the process of setting up IAM users on its single AWS Account. A solutions architect has been tasked to handle the user management, which includes granting read-only access to users and denying permissions whenever an IAM user has no MFA setup. New users will be added frequently based on their respective departments.

Which of the following action is the MOST secure way to grant permissions to the new users?

**ตัวเลือก:**
- [x] Launch an IAM Group for each department. Create an IAM Policy that enforces MFA authentication with the least privilege permission. Attach the IAM Policy to each IAM Group.
- [ ] Create an IAM Role that enforces MFA authentication with the least privilege permission. Set up a corresponding IAM Group for each department. Attach the IAM Role to the IAM Groups.
- [ ] Create a Service Control Policy (SCP) that enforces MFA authentication for each department. Add a trust relationship to every SCP and attach it to each IAM User.
- [ ] Set up IAM roles for each IAM user and associate a permissions boundary that defines the maximum permissions.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังขยาย คนมาสมัครงานเยอะ จัดการผู้ใช้ **(IAM users)** เยอะมาก 
หัวเมืองไอทีต้องตั้งค่า: อ่านได้อย่างเดียว (Read-only), บังคับแสกนม่านตาสองชั้น (MFA) ถ้าใครไม่ตั้ง MFA คือเข้าไม่ได้
โดยแต่ละคนจะมาจากหลากหลายแผนก **(added frequently based on departments)**
คำถาม: ควรจัดการสิทธิ์นี้อย่างไรให้ ปลอดภัยและสบายคนทำ (MOST secure) ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การจัดการยูสเซอร์นับร้อยนับพันจากหลากหลายแผนก (departments) = กฎเหล็กแอดมิน AWS คือต้องจัดการแบบเหมารวมผ่านห้อง **`IAM Group`** เท่านั้น (โยนคนเข้าแก๊งค์) โคตรปลอดภัยและลดข้อผิดพลาด
- ทริคที่ 2: การแนบกฎ (Policy) แจกให้พนักงาน = ต้องตั้ง **`IAM Policy`** (กระดาษใบสั่ง) และนำไปผูกเย็บติดกับหัวหน้าแผนก หรือ **`Attach to IAM Group`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch an IAM Group for each department. Create an IAM Policy... Attach the IAM Policy to each IAM Group.**
- **ทำไมถึงถูก:** การจัดการที่ดีที่สุดคือ "สร้างแฟ้มกลุ่ม IAM Group แบ่งตามแผนก" -> "สร้างกฎ IAM Policy บังคับใช้ MFA" -> "โยนกฎนั่นแปะติด IAM Group" เวลามีคนใหม่เข้ามาก็แค่ดึงเขามาอยู่ในห้องของแผนกนั้น กฎตั่งต่างก็จะถ่ายทอดสปีชีส์ให้พนักงานครอบครองทันที (ฟินเฟร่อ)

❌ **[ผิด] Create an IAM Role... Attach the IAM Role to the IAM Groups.**
- **ทำไมถึงผิด:** ผิดตรงที่หน้าต่างตั้งค่า AWS ไม่ให้คุณเอาหมวกเปลี่ยนร่าง (IAM Role) ไปผูกติดกับแผนกงาน (IAM Group) กันตรงๆ การส่งต่อสิทธิ์ให้ Group ต้องใช้คำว่า IAM Policy (ไม่ใช่ Role)

❌ **[ผิด] Create a Service Control Policy (SCP)... attach it to each IAM User.**
- **ทำไมถึงผิด:** มั่วซั่วมาก SCP เป็นกฎรระดับศาลรัฐธรรมนูญ เอาไว้ครอบหัว "AWS Account" ทั้งบัญชี (ในระบบ Organization) ไม่ใช่เอามาแปะติดกับบัญชียูสเซอร์แต่ละคน

❌ **[ผิด] Set up IAM roles for each IAM user and associate a permissions boundary...**
- **ทำไมถึงผิด:** การสร้าง Role ไล่แจกให้ยูสเซอร์ทีละคนเป็นเรื่องบ้าบอที่สุดบนโลก ไอทีเสียเวลาแย่ จัดการไม่ได้ตามแผนกด้วย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **MFA (Multi-factor Authentication)**: การบังคับสแกนรหัส OTP ขั้นที่สองบนมือถือก่อนเข้าใช้งาน AWS เสริมเกราะหนา 10 ชั้น
- **Least Privilege Principle**: กฎหมายสูงสุดของ Cyber Sec ให้สิทธิ์แค่พอใช้เท่านั้น! ไม่ให้เกิน ไม่ให้เผื่อ

---
---

## 📌 คำถามที่ 13
**โจทย์:**
A Solutions Architect working for a startup is designing a High Performance Computing (HPC) application which is publicly accessible for their customers. The startup founders want to mitigate distributed denial-of-service (DDoS) attacks on their application.

Which of the following options are **not suitable** to be implemented in this scenario? (Select TWO.)

**ตัวเลือก:**
- [x] Use Dedicated EC2 instances to ensure that each instance has the maximum performance possible.
- [ ] Use an Amazon CloudFront service for distributing both static and dynamic content.
- [ ] Use AWS Shield and AWS WAF.
- [ ] Use an Application Load Balancer with Auto Scaling groups for your EC2 instances. Prevent direct Internet traffic to your Amazon RDS database by deploying it to a new private subnet.
- [x] Add multiple Elastic Fabric Adapters (EFA) to each EC2 instance to increase the network bandwidth.

---
### 🎯 โจทย์ต้องการอะไร?
ดีไซน์ระบบเครื่องแรงระดับไฮคลาส (HPC) รับลูกค้าออนไลน์
แต่เจ้าของค่ายกลัวโดนแฮ็กเกอร์ยิงถล่ม **(mitigate DDoS attacks)**
คำถาม: ท่าไหน **"ไม่เหมาะสม (NOT suitable)"** ที่จะนำมาเป็นวิธีป้องกันการยิง DDoS โจมตีระบบบ้าง ???
*(ข้อนี้หาผู้กระทำผิด 2 ข้อ ที่ไม่เกี่ยวกับการป้องกัน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: อ่านโจทย์ลวงโลกให้ดี! เค้าให้หากระบวนท่าที่ **`"ไม่เหมาะจะเอามากัน DDoS โดนสแปม"`** 
- ทริคที่ 2: วัตถุกันภัยของ AWS ได้แก่ Cloudfront(ซับแรงกระแทกจากทวีปอื่น), WAF/Shield(โล่แบรนด์อเมริกา) และ LoadBalancer(ยามหน้าประตูดันเซิร์ฟฯเยอะๆสู้). ดังนั้นท่าฮีโร่สายบู๊ที่เน้นเพิ่มความเร็วเช่น **`Dedicated EC2`** หรือสาย **`EFA`** ไม่มีพลังเวทมนตร์อะไรมากันยิงจรวดเลย! ตอบสองข้อนี้ซะ

### 💡 อธิบายแต่ละตัวเลือก (ผู้กระทำผิดที่ตอบถูก)

✅ **[ตอบถูกเพราะไม่เก่งกัน DDoS!] Use Dedicated EC2 instances to ensure... maximum performance...**
- **ทำไมถึงถูก (ที่ตอบข้อนี้):** การเช่าเครื่องเซิร์ฟเวอร์แบบส่วนตัวแบบไม่แชร์ฮาร์ดดิสก์ใคร (Dedicated) ไม่ได้มีภูมิคุ้มกันป้องกันแฮกเกอร์เลย โดนสแปมขยะล้านวิวก็พังพินาศพอกัน

✅ **[ตอบถูกเพราะไม่เก่งกัน DDoS!] Add multiple Elastic Fabric Adapters (EFA)... increase network bandwidth.**
- **ทำไมถึงถูก (ที่ตอบข้อนี้):** EFA เป็นชิปการ์ดแลนวิเศษที่เอาไว้เร่งความเร็วสื่อสารระหว่างซูเปอร์คอมพิวเตอร์ด้วยกัน (อารมณ์สายไฟเบอร์ไฮสปีด) มันไม่เกี่ยวอะไรกับการรับกระสุนหน้าบ้านจากแฮกเกอร์ แถมมันติดตั้งได้แค่ตัวเดียวต่อเซิร์ฟเวอร์ด้วย

❌ **[ผิด (เพราะมันท่าป้องกันจริงๆ)] Use an Amazon CloudFront...**
- **ทำไมตัวนี้ป้องกันได้:** CloudFront ตัวซึมซับแรงกระแทกล้ำเลิศ มีที่กระจายอยู่ทั่วโลก มันจะแบกรับขยะที่แห่ยิงเข้ามาไม่ให้ทะลุเข้าถึงบ้านหลัก

❌ **[ผิด (เพราะมันท่าป้องกันจริงๆ)] Use AWS Shield and AWS WAF.**
- **ทำไมตัวนี้ป้องกันได้:** เป็นแม่ทัพโล่กำบังประจำชาติ AWS เกิดมาเพื่อกระตุกบล็อกระงับภัยคุกคามโดยตรง

❌ **[ผิด (เพราะมันท่าป้องกันจริงๆ)] Use an Application Load Balancer with Auto Scaling...**
- **ทำไมตัวนี้ป้องกันได้:** โดนยิงใช่มั้ย? Auto Scaling สั่งปั๊มเครื่อง EC2 สู้กลับเป็นพันตัวมารับโหลดขยะเลยดิ ก็เป็นทางออกหนึ่งที่ดีในการสู้รบครับ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **DDoS (Distributed Denial-of-Service)**: ภัยที่ทำให้เซิร์ฟเวอร์ค้างเพราะเจอพายุสแปมโหลดข้อมูลถี่ๆ ยิงจนพัง

---
---

## 📌 คำถามที่ 14
**โจทย์:**
A company is setting up a cloud architecture for an international money transfer service to be deployed in AWS which will have thousands of users around the globe. The service should be available 24/7 to avoid any business disruption and should be resilient enough to handle the outage of an entire AWS region. To meet this requirement, the Solutions Architect has deployed their AWS resources to multiple AWS Regions. He needs to use Route 53 and configure it to set all of the resources to be available all the time as much as possible. When a resource becomes unavailable, Route 53 should detect that it's unhealthy and stop including it when responding to queries.

Which of the following is the most fault-tolerant routing configuration that the Solutions Architect should use in this scenario?

**ตัวเลือก:**
- [x] Configure an Active-Active Failover with Weighted routing policy. 
- [ ] Configure an Active-Active Failover with One Primary and One Secondary Resource. 
- [ ] Configure an Active-Passive Failover with Weighted Records. 
- [ ] Configure an Active-Passive Failover with Multiple Primary and Secondary Resources. 

---
### 🎯 โจทย์ต้องการอะไร?
แอประบบโอนเงินระดับโลก ต้องการออนไลน์ตลอด 24/7 **(available 24/7)** และต้องกันเหนียวแม้ไฟไหม้ทั้งดาต้าเซ็นเตอร์ (outage of entire region)
โดยลงสถาปัตยกรรมไว้หลายทวีป **(multiple AWS Regions)**
และอยากให้ป้ายจราจร **Route 53 นำทางให้ทุกบ้านเปิดรับแขกอยู่ตลอดเวลา (all resources to be available all the time)** ถ้าบ้านไหนไฟดับก็เลิกโยนคนไปบ้านนั้น
คำถาม: ท่าตั้งค่า Routing แบบไหนตอบโจทย์และถึกทนระดับพระกาฬ (most fault-tolerant) ที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ระบุชัดมากว่า **`available "all the time"`** (เปิดรับการจราจรพร้อมใช้ทำงานอยู่ตลอดทุกทวีป) = คุณต้องใช้โหมดตีคู่ขนาน **`Active-Active Failover`** ทันที (ตัดช้อยส์ Active-Passive ที่แปลว่ามียามหลับกับยามตื่นออกไปซะ)
- ทริคที่ 2: ใน AWS, โหมด Active-Active เวิร์กได้ดีกับระบบจัดสรรปันส่วนอย่าง **`Weighted`** หรือ Latency หรือ Geolocation (ข้อนี้บังคับตอบ **`Weighted routing policy`**) และโลกนี้**ไม่มีกฎการตั้งค่า One Primary and One Secondary** โผล่ในฟังก์ชั่น Active-Active (เพราะทุกอันถือเป็นตัวจริงหมด)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure an Active-Active Failover with Weighted routing policy.**
- **ทำไมถึงถูก:** Active-Active คือทุก Region รับส่งการจราจรโอนเงินทั้งหมดไปพร้อมๆ กัน ซึ่งถ้าภูมิภาคไหนดับไป Route 53 ก็จะเตะภูมิภาคนั้นทิ้งแล้วโยนน้ำหนักที่เหลือไปให้ Region ที่รอดชีวิต (ซึ่งจะจัดน้ำหนักได้ด้วย Weighted Routing) ทำงานต่อได้ลื่นไหลสุดๆ

❌ **[ผิด] Configure an Active-Active Failover with One Primary and One Secondary Resource.**
- **ทำไมถึงผิด:** คอนเซปแปลกประหลาดมาก Active-Active ไม่ถือเรื่องตัวจริงตัวสำรอง(ไม่มี Primary หรือ Secondary) เนื่องจากตัวมันถือว่าทุกคนคือคัวจริงทำงานพร้อมกันหมด 

❌ **[ผิด] Configure an Active-Passive Failover with Weighted Records.**
- **ทำไมถึงผิด:** Active-Passive (ตัวหนึ่งทำงาน ตัวหนึ่งนอนพักตั้งรับ) ไม่ตรงตามโจทย์ที่อยากให้ทุกเสา "all of resources to be available all the time" ช่วยกันทำมาหากิน

❌ **[ผิด] Configure an Active-Passive Failover with Multiple Primary and Secondary Resources.**
- **ทำไมถึงผิด:** ผิดสองเด้ง ทั้งความเป็น Active-Passive แถมประเด็นการตั้ง Primary & Secondary ซ้อนเบิ้ล ซึ่งไม่ตอบโจทย์

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon Route 53**: ยามเฝ้าประตูหน้าหมู่บ้านคลาวด์ รับจดโดเมน แอบส่องเช็คว่าเซิร์ฟเวอร์ภูมิภาคไหนดิ่งลงเหว ก็ปัดไม้กั้นสับรางทางวิ่งไปให้อีกทวีปนึง

---
---

## 📌 คำถามที่ 15
**โจทย์:**
A production MySQL database hosted on Amazon RDS is running out of disk storage. The management has consulted its solutions architect to increase the disk space without impacting the database performance.

How can the solutions architect satisfy the requirement with the LEAST operational overhead?

**ตัวเลือก:**
- [x] Modify the DB instance settings and enable storage autoscaling.
- [ ] Modify the DB instance storage type to Provisioned IOPS.
- [ ] Increase the allocated storage for the DB instance.
- [ ] Change the default_storage_engine of the DB instance’s parameter group to MyISAM.

---
### 🎯 โจทย์ต้องการอะไร?
ฐานข้อมูล **MySQL บน Amazon RDS** ของบริษัทใกล้จะระเบิด เพราะ**พื้นที่ฮาร์ดดิสก์เต็มคาตา (running out of disk storage)**
บอสสั่งให้ไปเพิ่มพื้นที่ โดยห้ามดึงให้ประสิทธิภาพงานหน่วงเด็ดขาด
คำถาม: ท่าไหนที่แก้ปัญหานี้แล้ว **เหนื่อยคนทำน้อยที่สุด (LEAST operational overhead)** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอ Amazon **`RDS`** เจอปัญหา **`storage`** พื้นที่เต็ม และต้องการทางที่ง่าย ไม่ต้องมานั่งเฝ้าหน้าจอคอยงัดเติมเงินเองทีหลัง (Least operational overhead) = ให้จิ้มเปิดโหมดออโต้ หรือหาคำว่า **`Storage Autoscaling`** รับรองถูกต้องชัวร์! (RDS มีฟีเจอร์นี้ให้เปิดคลิกเดียว) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Modify the DB instance settings and enable storage autoscaling.**
- **ทำไมถึงถูก:** AWS RDS มีฟีเจอร์เทพชื่อ "Storage Auto Scaling" เมื่อพื้นที่ใกล้เต็ม (เหลือน้อยกว่า 10%) ระบบมันจะยืดขยายดันป๊องขนาดฮาร์ดดิสก์ขึ้นให้จุกๆ อย่างอัตโนมัติ ไม่ต้องหยุดพักเซิร์ฟเวอร์ และที่เจ๋งสุดคือเปิดทิ้งไว้แล้วเอาเวลาไปนอนดูเน็ตฟลิกซ์ได้เลย (เหนื่อยน้อยสุดๆ)

❌ **[ผิด] Increase the allocated storage for the DB instance.**
- **ทำไมถึงผิด:** นี่คือการขยับมือเพิ่มอัพเกรดด้วยตัวเอง (Manual) วันนี้เต็มคุณก็กดเพิ่ม พรุ่งนี้เต็มอีกคุณก็ต้องตื่นมากดเพิ่มอีก น่าเบื่อและเปลืองแรงมาก(มี operational overhead สูง) เมื่อเทียบกับการเปิดสวิตช์ Auto

❌ **[ผิด] Modify the DB instance storage type to Provisioned IOPS.**
- **ทำไมถึงผิด:** Provisioned IOPS เป็นเรื่องของการ "ซื้อความเร็วในการอ่าน/เขียนดิสก์" ไม่ได้เกี่ยวข้องกับการขยายตู้ฮาร์ดดิสก์ใหญ่ขึ้นเพื่อแก้ปัญหาพื้นที่เก็บระเบิด

❌ **[ผิด] Change the default_storage_engine of the DB instance’s parameter group to MyISAM.**
- **ทำไมถึงผิด:** การเปลี่ยนเอนจินพื้นฐานของ RDS เป็น MyISAM ไม่ได้มีความหมายอะไรกับการสางปัญหาเนื้อที่เต็มเลย ไม่เกี่ยวข้องกันอย่างสิ้นเชิง

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **RDS Storage Auto Scaling**: สวิตช์มายากลที่ขยายหลุมดำบน RDS ให้ใหญ่เรื่อยๆ โดยอัตโนมัติ ไม่มีพักดาวน์ไทม์ (Zero downtime) จ่ายตังค์เท่าที่ขยายด้วย

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 4: ข้อ 16 - 20)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 16
**โจทย์:**
A company uses multiple AWS accounts consolidated under AWS Organizations. The company needs to copy multiple Amazon S3 objects to an S3 bucket in a different owned AWS account. The Solutions Architect must configure permissions to enable this transfer while ensuring the destination account owns the copied objects rather than the source account.

How can the Architect accomplish this requirement?

**ตัวเลือก:**
- [ ] Set up cross-origin resource sharing (CORS) in S3 by creating a bucket policy that includes AmazonS3FullAccess and allows an IAM user or role to copy objects from the source bucket in one account to the destination bucket in the other account.
- [ ] Enable the Requester Pays feature in the source S3 bucket. The fees would be waived through Consolidated Billing since both AWS accounts are part of the organization.
- [x] Configure cross-account permissions in S3 by creating an IAM customer-managed policy that allows an IAM user or role to copy objects from the source bucket in one account to the destination bucket in the other account. Then attach the policy to the IAM user or role that you want to use to copy objects between accounts.
- [ ] Connect the two S3 buckets from two different AWS accounts to Amazon WorkDocs. Set up cross-account access to integrate the two S3 buckets. Use the WorkDocs console to copy the objects from one account to the other with modified object ownership assigned to the destination account.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีหลายบัญชี AWS (Account A และ B) ต้องการ "ก๊อปปี้ไฟล์จากกล่อง Amazon S3 ข้ามบัญชี (cross-account copy)" 
โดยมีเงื่อนไขสำคัญคือ **"บัญชีผู้รับ (Destination account) ต้องได้เป็นเจ้าของกรรมสิทธิ์ไฟล์ที่ก๊อปปี้มาใหม่นี้ด้วย"** ไม่งั้นจะแก้ไขไฟล์ไม่ได้

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การอนุญาตให้ AWS สองบัญชีคุยกันหรือส่งของหากันได้ = ต้องใช้ทางเชื่อมกรรมสิทธิ์ที่เรียกว่า **`Cross-account permissions`** (โดยการสร้างตั๋วมอบสิทธิ์ IAM ให้เดินข้ามฝั่งได้)
- ทริคที่ 2: กฎเหล็กของ S3 Object Ownership คือ "ใครเป็นคนที่จ่ายสคริปต์สั่งอัปโหลด คนนั้นคือเจ้าของไฟล์" ดังนั้นวิธีแก้ปัญหาให้บัญชี B เป็นเจ้าของ คือ **ให้บัญชี B (ปลายทาง) เป็นคนสั่งคำสั่งดูด (Copy) มาจากเตาของ A ซะ**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure cross-account permissions in S3 by creating an IAM customer-managed policy...**
- **ทำไมถึงถูก:** การเซ็ต `cross-account permissions` ถือเป็นท่ามาตรฐาน (Best Practice) ในการย้ายของข้ามบ้าน คือการตั้ง Policy ให้คนของ Account B มีสิทธิชะโงกหน้าไปดูดไฟล์ใน Account A มาเก็บไว้ที่บ้าน B ได้ (การทำแบบนี้บัญชี B จะนับผลงานเป็นของตนเอง และได้กรรมสิทธิ์ไฟล์ 100%)

❌ **[ผิด] Set up cross-origin resource sharing (CORS) in S3...**
- **ทำไมถึงผิด:** CORS เป็นฟีเจอร์กันการดึง Script/รูปภาพข้ามโดเมนบนหน้าเว็บไซต์ (Browser) ไม่เกี่ยวกับการอนุญาตให้พนักงาน IAM ใน AWS ย้ายข้อมูลข้ามบัญชี 

❌ **[ผิด] Connect the two S3 buckets from two different AWS accounts to Amazon WorkDocs...**
- **ทำไมถึงผิด:** ทำเรื่องง่ายให้เป็นเรื่องยาก Amazon WorkDocs คือบริการทำแอปฝากไฟล์แบบ Google Drive ไว้ให้พนักงานออฟฟิศใช้ ไม่เหมาะจะเอาคอมมาผูกให้ S3 วิ่งข้ามบัญชี

❌ **[ผิด] Enable the Requester Pays feature in the source S3 bucket...**
- **ทำไมถึงผิด:** `Requester Pays` เป็นแค่การผลักภาระค่าเน็ตให้ฝั่งคนดาวน์โหลดไฟล์เป็นคนจ่ายตังค์ ไม่ได้เป็นทางอนุญาตให้ Account อื่นเข้ามายกไฟล์ข้ามบ้านในระดับ Security 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Cross-Account Access**: การอนุญาตให้คนบ้านอื่น (AWS Account อื่น) ข้ามมากินข้าวบ้านเราได้ โดยใช้ IAM Role มอบสิทธิ์ชั่วคราวให้
- **S3 Object Ownership**: ไฟล์บน S3 เป็นระบบชนชั้นเจ้ายศเจ้าอย่าง ใครเป็นคนสร้างคนนั้นคือเจ้าของ แม้ไฟล์นั้นจะวางอยู่ในถังบ้านคนอื่นก็หน้าด้านไม่ให้ใครแก้ได้

---
---

## 📌 คำถามที่ 17
**โจทย์:**
A tech startup is launching an on-demand food delivery platform using Amazon ECS cluster with an AWS Fargate serverless compute engine and Amazon Aurora. It is expected that the database read queries will significantly increase in the coming weeks ahead. A Solutions Architect recently launched two Read Replicas to the database cluster to improve the platform's scalability.

Which of the following is the MOST suitable configuration that the Architect should implement to load balance all of the incoming read requests equally to the two Read Replicas?

**ตัวเลือก:**
- [x] Use the built-in Reader endpoint of the Amazon Aurora database.
- [ ] Use the built-in Cluster endpoint of the Amazon Aurora database.
- [ ] Enable Amazon Aurora Parallel Query.
- [ ] Create a new Network Load Balancer to evenly distribute the read queries to the Read Replicas of the Amazon Aurora database.

---
### 🎯 โจทย์ต้องการอะไร?
แอปส่งอาหาร ใช้ฐานข้อมูล **Amazon Aurora** 
ผู้จัดการคาดว่าช่วงนี้คนจะแห่เข้ามาดูเมนูเยอะมาก (ยอดดึงข้อมูลอ่าน/Read queries จะพุ่งสูงปรี๊ด) อาคิเทคก็เลยปั๊มลูกน้องฝาแฝด **(Read Replicas)** ขึ้นมาช่วยอ่าน 2 ตัว
คำถาม: ท่าตั้งค่าแบบไหนที่จะช่วย **"กระจายยอดคนอ่าน (Load balance) ยิงแบ่งให้ลูกน้อง 2 ตัวนี้เท่าๆกัน"** ได้ตรงจุดที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าใช้ **`Amazon Aurora`** แล้วอยากกระจายยอดคำสั่ง **`อ่าน (read queries)`** ไปให้ลูกน้อง Replicas ช่วยกันรับโหลด = คำตอบมีคีย์เวิร์ดเดียวคือ **`Reader endpoint`** (จุดเชื่อมต่อสำหรับแผนกอ่านอย่างเดียวของออโรร่า)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use the built-in Reader endpoint of the Amazon Aurora database.**
- **ทำไมถึงถูก:** ฐานข้อมูล Aurora บริการลูกค้าดั่งราชา มันมีฟังก์ชัน `Reader Endpoint` ฝังมาให้ในตัวแบบ Built-in พอคุณเอาลิงก์นี้ไปให้โค้ดหลังบ้านใช้ เวลาคนเปิดแอป โค้ดจะยิงไปลิงก์นี้ และ AWS จะทำการสลับไพ่สับโหลดกระจายไปให้ลูกกระจ๊อก Read Replicas ทุกตัวอย่างฉลาดล้ำเองโดยไม่ต้องตั้งค่า Load Balancer เพิ่ม!

❌ **[ผิด] Use the built-in Cluster endpoint of the Amazon Aurora database.**
- **ทำไมถึงผิด:** `Cluster Endpoint` หรือที่เรียกว่า `Writer Endpoint` เป็นจุดรวมศูนย์สำหรับ "หัวหน้า" ที่เอาไว้รับคำสั่ง "เขียน เลอะ และลบข้อมูล (DML/DDL)" เท่านั้น เอามาใช้รับโหลดอ่านกระจายรัวๆ ไม่ได้

❌ **[ผิด] Create a new Network Load Balancer to evenly distribute the read queries...**
- **ทำไมถึงผิด:** เหนื่อยเปล่า ทำไมต้องเอา NLB มาทำ Load Balance แจกจ่ายฐานข้อมูลเองด้วย ในเมื่อ Amazon Aurora มันมีฟีเจอร์ Reader Endpoint สร้างติดมาให้ใช้ฟรีๆ อย่างครบเครื่องอยู่แล้ว 

❌ **[ผิด] Enable Amazon Aurora Parallel Query.**
- **ทำไมถึงผิด:** `Parallel Query` คือฟีเจอร์พลังม้ามืด เอาไว้ให้ CPU ของฮาร์ดดิสก์ช่วยกันรุมรันสคริปต์สืบค้นแบบ Analytics ให้นานๆ เสร็จไวขึ้น ไม่ใช่ฟีเจอร์ตัวแจกไพ่กระจายคิว Read Replicas สลับเครื่อง

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon Aurora Endpoints**: ออโรร่าแบ่งทางเข้าออกชัดเจน:
  - **Cluster (Writer) Endpoint:** เข้ามาทางนี้เพื่อเซฟ เพื่อลบ เพื่อแก้ (ต่อตรงไปหาตัว Master)
  - **Reader Endpoint:** เข้ามาทางนี้เพื่อชะโงกหน้าดูอย่างเดียว (ตัวชี้ทางจะจ่ายงานกระจายแบ่งให้ลูกน้องทุกเครื่องทำหน้าเว็บลื่นๆ)

---
---

## 📌 คำถามที่ 18
**โจทย์:**
A company needs to use Amazon Aurora as the Amazon RDS database engine of their web application. The Solutions Architect has been instructed to implement a 90-day backup retention policy.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [ ] Create a daily scheduled event using CloudWatch Events and AWS Lambda to directly download the RDS automated snapshot to an S3 bucket. Archive snapshots older than 90 days to Glacier.
- [x] Create an AWS Backup plan to take daily snapshots with a retention period of 90 days.
- [ ] Configure RDS to export the automated snapshot automatically to Amazon S3 and create a lifecycle policy to delete the object after 90 days.
- [ ] Configure an automated backup and set the backup retention period to 90 days.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทใช้ฐานข้อมูล **Amazon Aurora** 
ผู้ใหญ่ข้างบนสั่งนโยบายมาว่า **ต้องเก็บไฟล์แบคอัปย้อนหลังให้ได้ 90 วันเต็ม (90-day backup retention policy)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กของ AWS RDS/Aurora เรื่องการแบคอัปอัตโนมัติ (Automated backups) คือ **"มันเก็บย้อนหลังให้สูงสุดแค่ 35 วัน เท่านั้น!!"**
- ทริคที่ 2: ถ้าเจอโจทย์สั่งเก็บแบคอัปนานข้ามเดือน (เกิน 35 วัน เช่น **`90-day`** หรือ 1 ปี) = หมดสิทธิ์ใช้ฟีเจอร์แบคอัปดั้งเดิมของ RDS ต้องพึ่งหนุ่มหล่อบริการภายนอกที่ชื่อ **`AWS Backup`** เท่านั้น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an AWS Backup plan to take daily snapshots with a retention period of 90 days.**
- **ทำไมถึงถูก:** `AWS Backup` คือบริการรับเหมาเก็บเซฟเกมของค่าย AWS ที่สามารถเซ็นสัญญาฝากทิ้งไว้นานตามสั่ง (ตั้งได้ 90 วันสบายๆ) ตอบโจทย์เก็บรักษายาวนานแบบง่ายดาย

❌ **[ผิด] Configure an automated backup and set the backup retention period to 90 days.**
- **ทำไมถึงผิด:** หลอกกันหน้าตาย ฟีเจอร์ Automated Backup บนหน้าตา RDS ตั้งสไลด์ขีดสูงสุดได้แค่ 35 วัน พิมพ์เลข 90 วันใส่ไม่ได้นะจ๊ะ ระบบร้องเอ๋ง 

❌ **[ผิด] Configure RDS to export the automated snapshot automatically to Amazon S3...**
- **ทำไมถึงผิด:** RDS ไม่มีสวิตช์วิเศษที่จะกดโอน Snapshot ไปโยนทิ้งบน S3 กล่องกะละมังแบบ "อัตโนมัติ (automatically)" ซะทีเดียว การโยกต้องทำแบบ Manual หรือใช้โค้ดเสริมช่วย

❌ **[ผิด] Create a daily scheduled event using CloudWatch Events and AWS Lambda... directly download...**
- **ทำไมถึงผิด:** ท่ามาแรงแซงทางโค้งมาก สั่งให้ Lambda ตามลงไปดูดไฟล์แบคอัปเองแบบงงๆ ทุกวัน... ท่านี้ทำได้จริงแต่ถือเป็นการเขียนสคริปต์ที่โคตรเหนื่อยและเปลืองแรงโดยใช่เหตุ ในเมื่อ AWS สร้างตัวช่วยเบ็ดเสร็จอย่าง AWS Backup มาให้ใช้แล้ว

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **RDS Automated Backups**: ย้อนเวลาหาอดีตได้สูงสุดแค่ 35 วัน ไม่ดขาด
- **AWS Backup**: แผนกรับฝากของส่วนกลางของเซิร์ฟเวอร์ทุกรุ่นใน AWS (รวมถึง RDS) เก็บดองกิมจิรักษากี่ปีก็ได้ ดึงก็ง่าย

---
---

## 📌 คำถามที่ 19
**โจทย์:**
A large financial firm needs to set up a Linux bastion host to allow access to the Amazon EC2 instances running in their VPC. For security purposes, only the clients connecting from the corporate external public IP address `175.45.116.100` should have SSH access to the host.

Which is the best option that can meet the customer's requirement?

**ตัวเลือก:**
- [ ] Network ACL Inbound Rule: Protocol – UDP, Port Range – 22, Source 175.45.116.100/32
- [ ] Network ACL Inbound Rule: Protocol – TCP, Port Range-22, Source 175.45.116.100/0
- [ ] Security Group Inbound Rule: Protocol – UDP, Port Range – 22, Source 175.45.116.100/32
- [x] Security Group Inbound Rule: Protocol – TCP. Port Range – 22, Source 175.45.116.100/32

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเพิ่งตั้งด่านหน้าบ้าน **Linux bastion host (EC2 ชนิดหนึ่ง)** 
ต้องการเปิดให้รีโมตหน้าจอสีดำเข้าไปเคาะคำสั่ง **(SSH access)** ได้
โดยมีกฎเหล็กว่า **อนุญาตแค่ IP เดียวจากบริษัทเท่านั้น คือ `175.45.116.100`**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ด **`SSH`** ให้นึกถึงกำแพงค่ายทหาร (Protocol) ซึ่ง SSH ในโลกคอมพิวเตอร์ ทำงานบนระบบ **`TCP ที่พอร์ต 22`** แน่นอน 100% (ถ้ามีช้อยส์ข้อไหนเป็น UDP ให้ชี้หน้าด่าว่ามั่ว แล้วตัดทิ้งเลย)
- ทริคที่ 2: รหัสนามสกุลของ IP ที่อนุญาตแค่ "หนึ่งไอพีโดดๆ (Single IP)" คือ **`/32`** เสมอ (ถ้าลงท้ายด้วย `/0` คืออนุญาตแบบเปิดประตูบ้านอ้าซ่าให้โจรปล้นทั้งเครือข่าย)
- ทริคที่ 3: จะกันโจรเข้าเครื่อง EC2 เฉพาะตัว (Bastion host) ใช้ **`Security Group`** เป็นยามเฝ้าหน้าประตูตรงจุดที่สุด (ตัว ACLs มันเฝ้าหน้าปากซอยหมู่บ้าน หยาบไปหน่อยสำหรับข้อนี้)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Security Group Inbound Rule: Protocol – TCP. Port Range – 22, Source 175.45.116.100/32**
- **ทำไมถึงถูก:** รวบยอดแบบเพอร์เฟค! การคุ้มกันระดับ EC2 ใช้ยาม `Security Group`, โปรโตคอล SSH คือ `TCP 22`, และระบุพิกัดคนเข้าแบบล็อคเครื่องเดียวเป๊ะๆ ด้วยหาง `175.45.116.100/32` (เลข 32 คือล็อกเฉพาะไอพีนี้เท่านั้น)

❌ **[ผิด] Security Group Inbound Rule: Protocol – UDP, Port Range – 22...**
- **ทำไมถึงผิด:** เพราะดันตั้งค่าเป็น `UDP 22` ระบบ SSH มันวิ่งขบวนรถไฟขนส่ง TCP เท่านั้นครับ

❌ **[ผิด] Network ACL Inbound Rule: Protocol – TCP, Port Range-22, Source 175.45.116.100/0**
- **ทำไมถึงผิด:** ผิดทั้งการใช้ยามใหญ่ของซอย (NACL) มาควบคุมระดับเครื่องตัวเดียว และยังตั้งค่าตัวท้ายเป็น `/0` หมายถึงโลกทั้งใบ (Any network size) ทำให้คนอื่นที่ไม่ใช่ IP นีก็หลุดเข้าได้

❌ **[ผิด] Network ACL Inbound Rule: Protocol – UDP, Port Range – 22...**
- **ทำไมถึงผิด:** ผิดสองเด้งคือตั้ง NACL และยังปั้น UDP มาอีก 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Bastion Host (Jump Box)**: เครื่องคอมหน้าด่านที่ยอมโดนเอาไปตากฝนกระสุนหน้าบ้าน เพื่อเป็นสะพานกระโดดลอดพาสเวิร์ดเข้าไปหาเซิร์ฟเวอร์ตัวจริงข้างหลังตู้นิรภัย (กันไม่ให้ตัวจริงออกเน็ต)
- **Security Group (SG)**: ยามเฝ้าระวังระดับ "เครื่องเซิร์ฟเวอร์"
- **Network ACL**: ตำรวจเฝ้าระวังระดับ "ปากซอยเครือข่าย (Subnet)"

---
---

## 📌 คำถามที่ 20
**โจทย์:**
A company is generating confidential data that is saved on its on-premises data center. As a backup solution, the company wants to upload its data to an Amazon S3 bucket. In compliance with its internal security mandate, the encryption of the data must be done before sending it to S3. The company must spend time managing and rotating the encryption keys as well as controlling who can access those keys.

Which of the following methods can achieve this requirement? (Select TWO.)

**ตัวเลือก:**
- [x] Set up Client-Side Encryption using a client-side master key.
- [x] Set up Client-Side Encryption with AWS KMS key.
- [ ] Set up Client-Side Encryption with S3 managed encryption keys.
- [ ] Set up Server-Side Encryption (SSE) with Amazon EC2 key pair.
- [ ] Set up Server-Side Encryption with keys stored in a separate S3 bucket.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีข้อมูลลับสุดยอดอยู่ที่ออฟฟิศ (On-premises) อยากโยนอัปโหลดมาฝากไว้ที่กล่อง Amazon S3
กฎความปลอดภัยคือ: **ต้องเข้ารหัสข้อมูลมาให้เสร็จสับตั้งแต่ที่ออฟฟิศ "ก่อน" มุดลงส่งไปถึง AWS (encryption... done before sending to S3)**
และบริษัทอยากทำตัวเยอะ ขอจัดการหมุนเวียนกุญแจเข้ารหัสลับนี้เอง (managing and rotating encryption keys)
*(ให้เลือก 2 ท่าที่ตรงปก)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ดบังคับให้ **`เข้ารหัสให้เสร็จ "ก่อนส่งไปให้ (before sending)"`** AWS = ท่านี้เรียกตรงตัวว่า **`Client-Side Encryption`** (เข้ารหัสแพ็คของมาจากที่บ้านลูกค้า) (ถ้าเจอ Server-Side Encryption ให้ตัดทุกข้อทิ้งแบบไร้ความปราณี!)
- ทริคที่ 2: บริษัทอยากเป็นคน **จัดการกุญแจเอง** = แปลว่าท่า Client-Side นี้ บริษัทต้องเอากุญแจมาปั๊มเอง (Client-side master key) หรือไม่ก็ยืมเครื่องมือ AWS มาปั๊มเป็นส่วนตัว (AWS KMS key) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up Client-Side Encryption using a client-side master key.**
- **ทำไมถึงถูก:** เพราะเป็นการเข้ารหัสจากฝั่งบ้านบริษัทลูกค้า (Client-Side) และบริษัทสร้างกุญแจส่วนตัว (Client-Side master key) มาพันข้อมูลเองตรงตามโจทย์ทุกกระเบียดนิ้ว

✅ **[ถูกต้อง] Set up Client-Side Encryption with AWS KMS key.**
- **ทำไมถึงถูก:** การนำกุญแจส่วนตัวจากตู้เซฟ KMS ของเราเองไปใช้ห่อฟอยด์พันข้อมูลที่ฝั่งบริษัทลูกค้า (Client-Side) ก็เป็นท่าที่ปลอดภัยและอนุญาตตามมาตรฐาน 

❌ **[ผิด] Set up Client-Side Encryption with S3 managed encryption keys.**
- **ทำไมถึงผิด:** ดูจากชื่อแล้วประชดความรู้ตัวเอง... เราไม่สามารถเอากุญแจหลวง "S3 managed keys" ขนกลับไปห่อฝั่งลูกค้า(Client-side)ได้หรอกครับ เพราะมันเป็นของหลวงที่อยู่แต่ในฝั่งน่านฟ้า AWS S3 เท่านั้น

❌ **[ผิด] Set up Server-Side Encryption (SSE) with Amazon EC2 key pair.**
- **ทำไมถึงผิด:** ผิดทั้งกระบวนท่า เพราะมันคือ Server-Side Encryption (เอาไฟล์เปลือยวิ่งมาแล้วให้ AWS จัดการพันฟอยด์ให้ทีหลัง) แถมคือกุญแจ EC2 Key Pair มันมีไว้ปลดล็อกหน้าจอเซิร์ฟเวอร์ ไม่ได้มีไว้เข้ารหัสหน้าอก S3 เด้อ!

❌ **[ผิด] Set up Server-Side Encryption with keys stored in a separate S3 bucket.**
- **ทำไมถึงผิด:** นี่ก็วิบัติ ผิดตรงที่เป็นท่า Server-Side (โยนไฟล์เปลือยเข้าเน็ต) และบนหน้าโลกนี้ไม่มีใครโง่เอากุญแจเซฟคีย์ไปวางทิ้งไว้ในตะกร้ารวมขยะ S3 ทั่วไปกันหรอกจ้า 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Client-Side Encryption**: กลัวโดนไปรษณีย์แอบดูพัสดุ เราเลยขอเข้ารหัสใส่กล่องเหล็กตั้งแต่ก้าวเดินออกจากแผนกออฟฟิศของเราเอง สบายใจที่สุด
- **Server-Side Encryption**: ไม่ซีเรียส โยนไฟล์ลงไปในขนส่งไปรษณีย์ก่อน แล้วเดี๋ยวพอพัสดุถึงสถานี AWS ค่อยให้ไปรษณีย์ AWS เคลือบฟิล์มเข้ารหัสให้ตอนโยนเก็บ

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 5: ข้อ 21 - 25)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 21
**โจทย์:**
An online registration system hosted in an Amazon EKS cluster stores data to a db.t4g.medium Amazon Aurora DB cluster. The database performs well during regular hours but is unable to handle the traffic surge that occurs during flash sales. A solutions architect must move the database to Aurora Serverless while minimizing downtime and the impact on the operation of the application.

Which change should be taken to meet the objective?

**ตัวเลือก:**
- [ ] Take a snapshot of the DB cluster. Use the snapshot to create a new Aurora DB cluster.
- [ ] Add an Aurora Replica to the cluster and set its instance class to Serverless. Failover to the read replica and promote it to primary.
- [x] Use AWS Database Migration Service (AWS DMS) to migrate to a new Aurora Serverless database.
- [ ] Change the Aurora Instance class to Serverless

---
### 🎯 โจทย์ต้องการอะไร?
ระบบลงทะเบียนวิ่งบน Amazon EKS ต่อกับฐานข้อมูล **Amazon Aurora DB (แบบ provisioned ปกติ)** 
ตอนคนน้อยก็ลื่นดี แต่พอถึงช่วง **ลดราคา Flash Sales** คนแห่มา ฐานข้อมูลแบกไม่ไหว
สถาปนิกเลยตัดสินใจจะย้ายบ้านฐานข้อมูลนี้ ไปเป็นรุ่น **Aurora Serverless** ที่ขยายตัวเองได้พริบตา
คำถาม: ท่าย้ายบ้านแบบไหนที่ **"ลดเวลาดับของแอปพลิเคชัน (minimizing downtime)"** และ **"ไม่กระทบคนใช้งาน (minimal impact)"** ได้ดีที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเปลี่ยนเอนจิน/ย้ายข้ามสายพันธุ์ฐานข้อมูลหรือโอนย้ายแพลตฟอร์มแบบ **"ด่วนจี๋ ไม่ยอมให้เว็บล่ม (minimizing downtime)"** = ยกป้ายไฟบริการย้ายค่ายเบอร์เดิมระดับพระเจ้าอย่าง **`AWS Database Migration Service (AWS DMS)`** โอนลื่นสุดติ่ง
- ทริคที่ 2: คุณ **`เปลี่ยนชนิดเครื่องแบบคลิกเดียว (change instance class)`** จากเครื่องประกอบ(Provisioned) ให้กระโดดไปเป็นวิญญาณแบบ Serverless ดื้อๆ บนหน้า console ไม่ได้นะเออ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Database Migration Service (AWS DMS) to migrate to a new Aurora Serverless database.**
- **ทำไมถึงถูก:** DMS คือเครื่องมือคัดลอกฐานข้อมูลข้ามโลกแบบ Real-time โดยไม่รบกวนบ้านเก่าเลยแม้แต่น้อย ลูกค้ายังคงกดสั่งซื้อที่บ้านเก่าได้ ขณะที่ระบบดูดข้อมูลไหลไปเทที่บ้านใหม่ Aurora Serverless ตลอดเวลา พอเทเสร็จก็สับสวิตช์ย้ายแอปไปชี้ทางใหม่ แทบไม่รู้ตัวเลยว่าเว็บดับ (เกือบจะ Zero Downtime)

❌ **[ผิด] Change the Aurora Instance class to Serverless**
- **ทำไมถึงผิด:** มักง่ายไปนิด AWS ไม่ยอมให้คุณคลิกขวาเปลี่ยนสายแพลตฟอร์มจาก Aurora ธรรมดาไปเป็น Serverless ได้ตรงๆ มันบังคับต้องสร้าง Cluster บ้านใหม่มารองรับลูกเดียว 

❌ **[ผิด] Take a snapshot of the DB cluster. Use the snapshot to create a new Aurora DB cluster.**
- **ทำไมถึงผิด:** ท่าหยุดโลกคัดลอกไฟล์ ถ่ายเซฟเกม (Snapshot) เอาเซฟไปกางสร้างบ้านใหม่... ซึ่งระหว่างที่สร้างบ้านใหม่ ลูกค้าจะโดนสั่งห้ามเขียน/ซื้อของ เพราะข้อมูลจะไม่อัปเดต ท่านี้หน้าเว็บดับ (downtime) นานสุดๆ เป็นชั่วโมง 

❌ **[ผิด] Add an Aurora Replica to the cluster and set its instance class to Serverless. Failover...**
- **ทำไมถึงผิด:** คล้ายกับการเปลี่ยนคลาสตรงๆ คือคุณไม่สามารถเสกตั้งลูกน้อง Read Replica ให้หน้าตาเป็นอมนุษย์ Serverless แล้วหวังเดี๊ยวค่อยดันตูดมันขึ้นมาเป็นหัวหน้าใหญ่แทน มันเป็นคนละสปีชีส์กัน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS DMS (Database Migration Service)**: เครื่องดูดฝุ่นที่ย้ายสารพัดฐานข้อมูลมารวมที่ AWS ไม่ต้องปิดเซิร์ฟเวอร์ระหว่างย้าย แถมย้ายข้ามสายพันธุ์(Oracle เป็น MySQL) ได้ด้วย
- **Aurora Serverless**: ฐานข้อมูลวิญญาณ ไม่ประมวลผลก็ไม่เสียตังค์ ขยายตัวเองใหญ่ขึ้นเล็กเองได้โดยอัตโนมัติ ตอบโจทย์ระบบ Flash Sales ที่คนบุกมาแบบพายุเป็นหมื่น

---
---

## 📌 คำถามที่ 22
**โจทย์:**
A web-based application must extract specific data from a large CSV file stored in an Amazon S3 bucket. The application requires filtering or transforming the data dynamically before returning it, ensuring that only the needed data is returned without downloading the entire object.

Which of the following actions should be implemented to achieve this?

**ตัวเลือก:**
- [ ] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket’s name.
- [ ] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket's name and object's metadata.
- [x] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket's name and object's key.
- [ ] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket's name and object tags.

---
### 🎯 โจทย์ต้องการอะไร?
แอปหลังบ้านต้องการแงะเสี้ยวข้อมูลเล็กๆ ออกมาจาก **ไฟล์ CSV ใหญ่ยักษ์บน Amazon S3** 
ต้องคัดกรองแปลงข้อมูล **เฉพาะส่วนก่อนที่จะส่งกลับ (filtering dynamically before returning)** โดยไม่ให้โหลดไฟล์ใหญ่มาทั้งก้อน 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ฟีเจอร์ที่สั่งแก้ไฟล์ระหว่างที่กำลังดูดขึ้นมาจาก S3 โดยใช้ตัวช่วย (แปลงร่างก่อนลงจาน) เรียกว่า **`S3 Object Lambda`** 
- ทริคที่ 2: จะสั่งให้ Lambda รู้ว่าต้องจิ้มเข็มลงไปผ่าตัดไฟล์ไหน มันต้องระบุตำแหน่งจาก **ชื่อถัง (Bucket's name)** และ **ชื่อไฟล์ (Object's key)** เท่านั้น ไม่เกี่ยวกับ Metadata หรือ Tag

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket's name and object's key.**
- **ทำไมถึงถูก:** การให้ Lambda สกัดกั้นไฟล์ใหญ่และหั่นเนื้อให้แอปโหลดไปเฉพาะชิ้นที่เลิศรสที่สุด คือการใช้ S3 Object Lambda ร่วมกับระบบระบุตำแหน่งคือชื่อถังบิ๊กเบิ้ม (Bucket) และชื่อสกุลไฟล์หน้าคุ้น (Object key)

❌ **[ผิด] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket's name and object's metadata.**
- **ทำไมถึงผิด:** ข้อมูล `Metadata` (ป้ายบอกขนาด วันที่ หรืองานกระดาษ) มันเป็นเปลือกนอกของไฟล์ ไม่ได้บอกคอนเทนต์ข้างในไฟล์ที่ทีมงานอยากกรองออกมา

❌ **[ผิด] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket's name and object tags.**
- **ทำไมถึงผิด:** `Tags` คือป้ายกระดาษแปะตัวอย่าง "ของเล่น/ผู้ชาย/ปลา" ไม่เกี่ยวกับข้อมูลเนื้องานในไฟล์ CSV ที่เราต้องการหั่นดึงมาวิเคราะห์

❌ **[ผิด] Use S3 Object Lambda with a Lambda function that processes the data based on the bucket’s name [เพียงอย่างเดียว].**
- **ทำไมถึงผิด:** คุณตะโกนแค่ชื่อตะกร้า "เห้ย หยิบตะกร้า S3 บัคเก็ต 2 มาที" แต่ในถังแม่งมีไฟล์เป็นล้าน Lambda จะโผล่ไปหั่นไฟล์ไหนละทีนี้? ต้องระบุชื่อ Object key (ชื่อไฟล์) ควบคู่ด้วยเสมอ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Object Lambda**: ฟีเจอร์มือปราบมาแรง ที่ให้มุดแก้/หั่น/บังข้อมูลตอนมีคำสั่งขอดาวน์โหลดจาก S3 (เช่น เซ็นเซอร์บัตรประชาชน เซ็นเซอร์รูปโป๊ หรือดึงแค่ก้อนที่อยากได้ก่อนส่งให้คนขอ)

---
---

## 📌 คำถามที่ 23
**โจทย์:**
An investment bank is working with an IT team to handle the launch of the new digital wallet system. The applications will run on multiple EBS-backed EC2 instances which will store the logs, transactions, and billing statements of the user in an S3 bucket. Due to tight security and compliance requirements, the IT team is exploring options on how to safely store sensitive data on the EBS volumes and S3.

Which of the below options should be carried out when storing sensitive data on AWS? (Select TWO.)

**ตัวเลือก:**
- [ ] Create an EBS Snapshot
- [x] Enable Amazon S3 Server-Side or use Client-Side Encryption
- [ ] Migrate the EC2 instances from the public to private subnet.
- [ ] Use AWS Shield and WAF
- [x] Enable EBS Encryption

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารจะออกสินค้าดิจิทัลวอลเล็ต
แอปจะอยู่บน **เซิร์ฟเวอร์ EC2 ต่อฮาร์ดดิสก์ EBS** และใช้ **ถัง Amazon S3 เก็บสลิปโอนเงินลูกค้า**
มีกฎความปลอดภัยระดับชาติว่า ผู้ดูแลต้องทำการ **"จัดเก็บข้อมูลอ่อนไหวอย่างปลอดภัย (safely store sensitive data) ทั้งบนกล่องดิสก์ EBS และกล่อง S3"**
คำถาม: ท่าไหนที่ช่วยปกป้องการ "จัดเก็บข้อมูล" ได้โคตรดีย์? *(เลือกผู้ช่วย 2 คน)*

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การปกป้องข้อมูลอ่อนไหว "ตอนเก็บเข้ากรุและนอนทอดหุ่ย (safely store/at rest)" คือการจับมันใส่ตู้ไป **`เข้ารหัส (Encryption)`** ทั้งคู่
- ทริคที่ 2: สังเกตตัวไหนเข้ารหัส S3? -> **`Amazon S3 Server-Side or Client-Side Encryption`**
- ทริคที่ 3: สังเกตตัวไหนเข้ารหัส EBS? -> **`Enable EBS Encryption`** (จิ้มตอบ 2 อันนี้ได้เลย ง่ายจนตกใจ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Amazon S3 Server-Side or use Client-Side Encryption**
- **ทำไมถึงถูก:** ปกป้องข้อมูลบิลสลิปเงินฝากบน S3 ด้วยการล็อคเข้ารหัส ไม่ว่าจะเข้ารหัสล่วงหน้ามาจากที่บ้าน(Client) หรือปล่อยให้ AWS ซ่อนรูปให้ (Server-side) ก็ดีงามหมด

✅ **[ถูกต้อง] Enable EBS Encryption**
- **ทำไมถึงถูก:** ปกป้องตู้ฮาร์ดดิสก์ใต้ EC2 ด้วยการจับมันเข้ารหัสดิสก์(EBS Encryption) ไปซะ หุ้มเกราะหนากันแฮ็กเกอร์แอบถอดฮาร์ตดิสก์

❌ **[ผิด] Create an EBS Snapshot**
- **ทำไมถึงผิด:** Snapshot คือการถ่ายเอกสารก๊อปปี้ไฟล์เอาไปดองเก็บไว้เป็นตัวสำรอง (Backup) มันไม่ได้ช่วยเรื่อง "ความปลอดภัย/ป้องกันคนมาแอบอ่านแต่อย่างใด"

❌ **[ผิด] Migrate the EC2 instances from the public to private subnet.**
- **ทำไมถึงผิด:** การโยกเซิร์ฟหนีการตกเป็นตู้พับบลิก เป็นเรื่องของการหลบเลี่ยงไม่โดนแฮกเกอร์เจอตัว ไม่ใช่ท่าของการ "จัดเก็บไฟล์ S3/EBS อย่างปลอดภัย" ตามที่โจทย์ล็อกสเปคไว้

❌ **[ผิด] Use AWS Shield and WAF**
- **ทำไมถึงผิด:** WAF กับ Shield เป็นโล่เทพไว้กันสแปม/จรวดคนเข้าเว็บทางอินเตอร์เน็ตจากภายนอก (ป้องกัน DDoS) มันไม่รู้วิธีเข้ารหัสดิสก์หลังบ้านนะ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Encryption at Rest**: มาตรฐาน Security ท้องฟ้า AWS ห้ามวางไฟล์ดิบๆเด็ดขาด ต้องเข้ารหัสกุญแจไว้ (พวกรหัสบัตรเครดิต หรือข้อมูลการเงิน)
- **EBS Encryption**: กดคลิกเดียวตอนสร้างก้อนฮาร์ดดิสก์ ก็เข้ารหัสให้หมดแล้ว ฟรีอีกต่างหาก ใช้ซะ!

---
---

## 📌 คำถามที่ 24
**โจทย์:**
A company runs a multi-tier web application in the AWS Cloud. The application tier is hosted on Amazon EC2 instances and the backend database is hosted on an Amazon Aurora for MySQL DB cluster. For security compliance, all of the application variables such as DB hostnames, environment settings, product keys, and database passwords must be stored securely with encryption.

Which of the following options is the most cost-effective solution to meet the requirements?

**ตัวเลือก:**
- [ ] Store the values by creating secrets in AWS Secrets Manager. Use AWS Key Management Service (AWS KMS) for the encryption. Use the BatchGetSecretValue API to retrieve multiple secrets efficiently. Update the application to retrieve the values of the secrets.
- [ ] Store the values as key-value pairs in AWS Systems Manager OpsCenter. By default, the key-value pairs will be encrypted at rest. Configure the application to retrieve the variables when it starts.
- [x] Store the values by creating SecureString type parameters in AWS Systems Manager Parameter Store. Use AWS Key Management Service (AWS KMS) for the encryption. Update the application to retrieve the parameter values.
- [ ] Store the values in a file saved in an Amazon S3 bucket. Enable encryption on the S3 bucket. Configure the application to download the file contents when it starts.

---
### 🎯 โจทย์ต้องการอะไร?
แอปหลังบ้านต้องการเก็บซ่อน "พวกสายรหัสตัวแปร (DB hostnames, product keys, database passwords)" ไว้อย่างมิดชิดที่สุด (stored securely with encryption)
คำถาม: วิธีไหน **"ประหยัดตังค์ที่สุด (MOST cost-effective)"** ที่ปกป้องรหัสผ่านพวกนี้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ตู้เซฟเก็บพาสเวิร์ดในโลก AWS มี 2 หน้าคือ AWS Secrets Manager กับ AWS Systems Manager Parameter Store (SSM)
- ทริคที่ 2: ถ้าโจทย์มีคีย์เวิร์ดบังคับเรื่อง **`most "cost-effective" (ประหยัดที่สุด/ของฟรี)`** = กรุณากาลงไปที่กล่องข้อความธรรมดาอย่าง **`AWS Systems Manager Parameter Store (SSM)`** ทันที เพราะพี่แกให้บริการฝากข้อความลับขั้นพื้นฐาน **ฟรี!** (ส่วน Secrets Manager โคตรงก เก็บค่าฝากต่อรหัสเป็นเดือนๆ ละ 10 กว่าบาท แพงกว่าเยอะ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Store the values by creating SecureString type parameters in AWS Systems Manager Parameter Store...**
- **ทำไมถึงถูก:** สมบูรณ์แบบสุดๆ AWS SSM Parameter Store ใช้เก็บค่าพารามิเตอร์รหัสผ่าน โดยใช้ฟีเจอร์ `SecureString` ในการเข้ารหัส (ด้วยกุญแจ KMS) และที่สำคัญ บริการนี้ฝากฟรีจร้าาา (Cost-effective สุดๆ ยิ้มแก้มปริเลยสิ)

❌ **[ผิด] Store the values by creating secrets in AWS Secrets Manager...**
- **ทำไมถึงผิด:** แม้ตัว `AWS Secrets Manager` เป็นลูกขุนนางชั้นสูงที่เก็บพาสเวิร์ดพร้อมโรเทตรหัสได้เพอร์เฟกต์ แต่บริการพี่แกไม่ใช่ฟรีแมน! โดนชาร์จค่าฝากเป็นรายเดือนต่อความลับหนึ่งรหัส (ไม่ตอบโจทย์ความอยากเซฟค่ามาม่าของข้อนี้ "most cost-effective")

❌ **[ผิด] Store the values as key-value pairs in AWS Systems Manager OpsCenter...**
- **ทำไมถึงผิด:** คลัง OpsCenter มีไว้เพื่อจัดการใบเคลมหรือใบสั่งซ่อมบำรุงเซิร์ฟเวลามีเรื่องบักโกรก ไม่ได้มีไว้เป็นกระเป๋าฝากพาสเวิร์ด (มันคนละฟังก์ชันกันนะ)

❌ **[ผิด] Store the values in a file saved in an Amazon S3 bucket...**
- **ทำไมถึงผิด:** อนาถามาก เอารหัสพาสเวิร์ดไปฝากพิมพ์ใส่ไฟล์เท็กซ์ (Text file) แล้วโยนลงกล่อง S3 ...เวลาอยากได้รหัสทีคือแอปต้องบินไปโหลดไลฟ์ลงมาแกะอ่าน... เปลืองแรงเขียนโค้ดยุ่งยาก วุ่นวายแถมไม่ถูกหลักซอฟต์แวร์สมัยใหม่ที่เค้าเรียกผ่าน API กันแล้ว

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS SSM Parameter Store (SecureString)**: บริการเก็บคีย์พาสเวิร์ดแบบพื้นฐาน **ฟรีแบบสั่นกระดิ่งเลย**
- **AWS Secrets Manager**: บริการเก็บและ **หมุนเวียน/สลับรหัส** เปลี่ยนใหม่ทุกวันอัตโนมัติ (เก่งกว่า แต่เสียตังค์แพง)

---
---

## 📌 คำถามที่ 25
**โจทย์:**
A solutions architect is designing an infrastructure for a serverless application. The application is packaged as a Docker image stored in Amazon Elastic Container Registry (Amazon ECR) and must be deployed on a fully managed serverless compute service. Additionally, the application requires 5 GB of ephemeral storage for temporary data processing.

Which deployment option meets these requirements?

**ตัวเลือก:**
- [ ] Deploy the application Amazon ECS cluster with Amazon EC2 worker nodes and attach a 5 GB Amazon EBS volume.
- [ ] Deploy the application to an Amazon ECS cluster that uses AWS Fargate tasks.
- [x] Deploy the application in an AWS Lambda function with Container image support. Set the function’s storage to 5 GB.
- [ ] Deploy the application in an AWS Lambda function with Container image support. Attach an Amazon Elastic File System (Amazon EFS) volume to the function.

---
### 🎯 โจทย์ต้องการอะไร?
จะสร้างแอปแบบไม่มีเซิร์ฟเวอร์ (Serverless) เป็นสภาพ **หลอดแก้วตู้คอนเทนเนอร์ (Docker image)** 
และต้องการที่รันแบบ **fully managed serverless แบบประหยัดพลังงาน** 
ข้อแม้: ต้องการกระเป๋าย่ามฝากข้อมูลแบบชั่วคราวชั่วข้ามคืน (ephemeral storage/พื้นที่ทิ้งขว้าง) **ขนาดจุกๆ ทีเดียว 5 GB รวด**
คำถาม: ควรนำทัพแอปนี้ไปวางที่บริการตัวไหนดี ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ดคำว่า **`Serverless`** แบบเต็มอัตราศึก แถมบอกความพิสดารว่าแอปใช้ **`Container image` (ตู้ Docker)** = นึกถึงท่าไม้ตายที่ **`AWS Lambda supports Container image`** เท่านั้น (พกคอนเทนเนอร์เข้าแลมบ์ด้าเลย)
- ทริคที่ 2: ฟีเจอร์ของ Lambda นั้นมันมีถังเก็บของกระจุกกระจิกชั่วคราว /tmp (ephemeral storage) ที่**ตอนนี้ขยายทุ่นได้มากสุดถึง `10 GB` แล้วนะ! (แค่คลิกเซ็ตอัพเพิ่มได้เลย)** (ตัดชอยส์ที่บังคับพ่วง EFS ออก)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy the application in an AWS Lambda function with Container image support. Set the function’s storage to 5 GB.**
- **ทำไมถึงถูก:** ถูกเผง! บริการ AWS Lambda มีฟีเจอร์อนุญาตให้ยัดตัว Docker เข้ามาวิ่งในอ้อมอกแลมบ์ด้าได้แล้ว (Container image support) และแลมบ์ด้ายุคใหม่ล่าสุด (หลังปี 2022) มันสามารถปรับที่เก็บชั่วคราว (ephemeral storage ลับ) ได้สูงสุดถึงล้น 10 GB ดังนั้นตั้งกล่องขนาด 5 GB ได้สบายๆ ฟินๆ

❌ **[ผิด] Deploy the application to an Amazon ECS cluster that uses AWS Fargate tasks.**
- **ทำไมถึงผิด:** บริการ Fargate เป็น Serverless และรัน Docker ได้ก็จริง... แต่ตัวโจทย์ล็อคสเปคอยากได้ "fully managed serverless" ที่รันแล้วทิ้ง (เน้นความง่าย/รวดเร็วแบบ ephemeral) ซึ่ง Lambda เป็นพระเอกยืนหนึ่งเรื่องนี้มากกว่า (ECS ยังบังคับให้คุณปวดหัวไปเซ็ตอัพ Load Balancers และลากเส้นเครือข่าย VPC อีกขยุมหนึ่ง) 

❌ **[ผิด] Deploy the application in an AWS Lambda function... Attach an Amazon Elastic File System (Amazon EFS) volume...**
- **ทำไมถึงผิด:** ใช่ Lambda มีฟีเจอร์พ่วงกล่อง EFS ไดร์ฟเครือข่ายได้ แต่!! EFS มันคือ "กล่องฝากไฟล์ถาวร (Persistent)" ไม่เข้าเป้าโจทย์ที่เรียกร้องหากล่องพักซอยย่อยแบบ "ขยะชั่วคราวรันเสร็จจับโยนทิ้ง (Ephemeral temporary storage)"

❌ **[ผิด] Deploy the application Amazon ECS cluster with Amazon EC2 worker nodes and attach a 5 GB...**
- **ทำไมถึงผิด:** เห็นชอยส์ดึงเครื่อง **`Amazon EC2 worker`** เข้ามาไหม? เครื่องเดี่ยวๆ ใหญ่โตมันจะมาใช่ "Serverless (ระบบอมนุษย์)" ได้ยังไง 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Lambda Ephemeral Storage (/tmp)**: แฟลชไดร์ฟส่วนตัวของแลมบ์ด้าที่เสียบตูดมันอยู่ ใช้วางไฟล์แคช ประเกลือกประกลิ้ง โหลดรูปภาพ ยืดได้ระหว่าง 512 MB จนถึงหน้ามืด 10,000 MB!
- **AWS Lambda Container Image Support**: แลมบ์ด้าสายแบดบอย ไม่ใช่คอยรับแต่สคริปต์สั้นๆ แต่ตอนนี้สามารถหิ้วตู้คอนเทนเนอร์หนักสุด 10GB มารันบนหัวมันได้ตังหาก!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 6: ข้อ 26 - 30)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 26
**โจทย์:**
A document sharing website is using AWS as its cloud infrastructure. Free users can upload a total of 5 GB data while premium users can upload as much as 5 TB. Their application uploads the user files, which can have a max file size of 1 TB, to an S3 Bucket.

In this scenario, what is the best way for the application to upload the large files in S3?

**ตัวเลือก:**
- [ ] Use a single PUT request to upload the large file
- [ ] Use AWS Import/Export
- [x] Use Multipart Upload
- [ ] Use AWS Snowball

---
### 🎯 โจทย์ต้องการอะไร?
เว็บไซต์ฝากไฟล์ **อัปโหลดไฟล์ขนาดใหญ่เบิ้ม (a max file size of 1 TB) ลงตู้ Amazon S3 Bucket**
คำถาม: วิธีการไหน **"ดีที่สุด (best way)"** สำหรับให้ "แอปพลิเคชัน (the application)" ตัวนี้โยนไฟล์ใหญ่ลง S3 ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กของ S3! การกดอัปโหลดไฟล์ไฟล์เดียวรวด (a single PUT request) จะโดนจำกัดขนาดไว้ที่ **"ไม่เกิน 5 GB เด็ดขาด!!"**
- ทริคที่ 2: ถ้าเจอโจทย์ที่มีไฟล์ชิ้นเดียวใหญ่เกิน 100 MB ไปจนถึงเป็นหลัก TB (เช่น 1TB ในข้อนี้) = ทางรอดเดียวคือต้องหั่นไฟล์เป็นท่อนๆ แล้วอัปโหลดแข่งกัน ซึ่งก็คือการเปิดโหมด **`Multipart Upload`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Multipart Upload**
- **ทำไมถึงถูก:** ฟีเจอร์แบ่งไฟล์เป็นเศษเสี้ยวอัปโหลดพร้อมกัน (Multipart Upload) เป็นไฟท์บังคับของการอัปไฟล์ชิ้นเบ้อเร่อเท่อ (ระดับ 1TB) ให้อีกฝั่ง AWS ค่อยเอาเศษเสี้ยวเหล่านั้นประกอบร่างใหม่ให้เพอร์เฟ็กต์ และเร็วกว่าอัปไฟล์เดี่ยวด้วย

❌ **[ผิด] Use a single PUT request to upload the large file**
- **ทำไมถึงผิด:** ทำไม่ได้ล้านเปอร์เซ็นต์ ท่าอัปโหลดดั้งเดิม (Single PUT Request) อนุญาตให้หน้าเว็บส่งเศษไฟล์ได้ใหญ่ไม่เกิน 5 GB เท่านั้นจ้า (ใครจะเถียงโจทย์ข้อนี้ล่ะ)

❌ **[ผิด] Use AWS Snowball**
- **ทำไมถึงผิด:** แตะลิมิตความฮา AWS Snowball คือกระเป๋าเดินทางเหล็กสุดถึกทนที่ต้องโทรสั่งให้พนักงาน AWS ขับรถตู้มาส่งหน้าบ้าน(ฮาร์ดแวร์จริงๆ) เพื่อก๊อปปี้ไฟล์ย้ายเซิร์ฟเวอร์ มันไม่ใช่ฟีเจอร์สำหรับ User ออนไลน์นั่งคลิกอัปโหลดหน้าเว็บแต่อย่างใด 

❌ **[ผิด] Use AWS Import/Export**
- **ทำไมถึงผิด:** ชื่อเก่าบริการรุ่นคุณปู่คล้าย Snowball คือการนั่งแพ็กฮาร์ดดิสก์ใส่กล่องไปรษณีย์แล้วส่ง Kerry/FedEx ไปรษณีย์ไปกู้ภัยที่ AWS (ไม่เกี่ยวกับท่าแอปออนไลน์อัปโหลดไฟล์)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Multipart Upload**: โคตรไอเท็มสับไฟล์เป็นชิ้นเล็กๆ แล้วส่งพรึ่บพร้อมกัน ถ้าเสี้ยวไหนเน็ตหลุด ก็ส่งใหม่แค่เสี้ยวนั้นชิวๆ (เหมาะกับไฟล์เริ่มที่ 100 MB และดันเพดานไฟล์ใหญ่สุดได้ถึงอลังการระดับ 5 TB ต่อไฟล์)

---
---

## 📌 คำถามที่ 27
**โจทย์:**
A company is hosting EC2 instances that are on non-production environment and processing non-priority batch loads, which can be interrupted at any time.

What is the best instance purchasing option which can be applied to your EC2 instances in this case?

**ตัวเลือก:**
- [ ] On-Demand Capacity Reservations
- [ ] On-Demand Instances
- [ ] Reserved Instances
- [x] Spot Instances

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังจ่ายค่าเช่าเครื่อง EC2 ไว้สำหรับล้างจาน รันแบบทดสอบ (non-production environment) และเอามาปั่นงานประมวลผลกากๆ (non-priority batch loads) 
ความพีคคือ **"ถ้าเครื่องดับกลางคันก็ไม่เป็นไรเลย (can be interrupted at any time)"** แฮปปี้สุดๆ
คำถาม: ท่าจ่ายเงินค่าเช่าเครื่อง (purchasing option) รูปแบบไหน **"ดีงามที่สุด (best)"** สำหรับงานดิวตี้นี้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเห็นคีย์เวิร์ดคำว่าทนต่อการโดน **`"เตะปลั๊กหลุด/ดับกลางทางได้ (interrupted at any time)"`** ปุ๊บ = ไม่ต้องอ่านต่อแล้วครับ ตอบราคาเครื่องล้างจานประมูลถูกสุดในโลกเหมาเข่งอย่าง **`Spot Instances`** ทันที 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Spot Instances**
- **ทำไมถึงถูก:** เครื่องเช่าแบบ `Spot` คือการเอาเครื่องเหลือทิ้งของชาวบ้านมาตั้งราคาประมูลใหม่ (ลดสูงสุดถึง 90% จากราคาเต็ม) เงื่อนไขเด็ดคือเวลาเจ้าของเดิมมาทวงเครื่อง ระบบจะแจ้งเตือนล่วงหน้า 2 นาที แล้วเตะเราปลิวเลยทันที เหมาะเจาะกับงานสายที่ดับเมื่อไหร่ก็ไม่แคร์อย่าง "รัน Batch ทดสอบกากๆ"

❌ **[ผิด] On-Demand Instances**
- **ทำไมถึงผิด:** `On-Demand` คือการกดเช่าน้องตู้ม้าตามมิเตอร์นาที/ชั่วโมงของจริง ราคาโปรโมชั่นเต็มคาราเบล ไม่มีลดแม้แต่สลึงเดียว ดึงมาใช้งานประมูลของเหลือทิ้งนี่ก็แปลกคนสิ

❌ **[ผิด] Reserved Instances**
- **ทำไมถึงผิด:** `Reserved` เป็นระบบ "เซ็นสัญญาซื้อเครื่องล่วงหน้าผูกปิ่นโต 1-3 ปี" ราคาจะถูกลง 70% เหมาะกับเครื่องลูกรักหน้าบ้าน (Production) ที่ต้องนิ่งเสถียร ห้ามดับไปทำสัญญายาวๆ 

❌ **[ผิด] On-Demand Capacity Reservations**
- **ทำไมถึงผิด:** การโยนเงินผูกขาดสำรองที่นั่งกันเหนียว "ชั้นจองโต๊ะเบอร์นี้นะ!" ราคาเท่า On-Demand โคตรแพงขี้แตก 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **EC2 Spot Instances**: ห้องเช่ารายชั่วโมงล้างจาน จ่ายถูกเวอร์ แต่แม่บ้าน AWS เข้าเครื่องเรามาซักผ้าเมื่อไหร่ก็โดนสะกิดออกด่วน 2 นาที (ดับแบบงงๆ เหมาะกับงาน AI ทดสอบ, Hadoop งานพื้นๆ ที่ชุบชีวิตได้)

---
---

## 📌 คำถามที่ 28
**โจทย์:**
A media company recently launched their newly created web application. Many users tried to visit the website, but they are receiving a 503 Service Unavailable Error. The system administrator tracked the EC2 instance status and saw the capacity is reaching its maximum limit and unable to process all the requests. To gain insights from the application's data, they need to launch a real-time analytics service.

Which of the following allows you to read records in batches?

**ตัวเลือก:**
- [ ] Create an Amazon S3 bucket to store the captured data and use Amazon Redshift Spectrum to analyze the data.
- [x] Create a Kinesis Data Stream and use AWS Lambda to read records from the data stream.
- [ ] Create a Data Firehose and use AWS Lambda to read records from the data stream.
- [ ] Create an Amazon S3 bucket to store the captured data and use Amazon Athena to analyze the data.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บซีรีส์แหกโค้งแตก คนแห่เข้าเว็บจนเซิร์ฟเวอร์เจ๊ง ทนรับ Request ไก่กาไม่ไหว
อยากจะวิเคราะห์หาเบาะแสดูเรดาร์ข้อมูลเหล่านี้แบบ **"สดๆ ณ เดี๋ยวนั้น (real-time analytics service)"**
คำถาม: ท่าไหนสามารถมัดรวมข้อมูล **อ่านเป็นก้อนมัดรวมกันใหญ่ๆ (read records in batches)** มารายงานเราได้บ้าง ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: วิเคราะห์ข้อมูลแบบสดๆ ตื่นเต้นกระเด้งขึ้นหน้าจอ Real-time = โบกมือทิ้งตระกูล Amazon S3, Athena, Redshift ไปได้เลย แล้วหันหน้าหากระแสน้ำสายหลักอย่าง **`Amazon Kinesis Data Stream`** เป็นคำตอบเบอร์ 1 แน่นอน
- ทริคที่ 2: พระสายสด (Real-time stream processing) มักจับคู่กับมือปืนรับจ้างอย่าง **`AWS Lambda`** เพื่อดักหน้าน้ำแล้วหั่นแพ็คก้อนซูชิ (batches) เสิร์ฟให้เราแบบชิวๆ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a Kinesis Data Stream and use AWS Lambda to read records from the data stream.**
- **ทำไมถึงถูก:** เพราะ `Kinesis Data Stream (KDS)` คือพระเอกจากจักรวาลวิเคราะห์ข้อมูลจังหวะคลิกเมาส์สดๆ และการตั้งแม่บ้าน `AWS Lambda` ดักรออ่านข้อมูลปั้นเป็นก้อน (Batches) หั่นเป็นแท่งเพียบพร้อมสมบูรณ์สูตรที่สุดในวงการ!

❌ **[ผิด] Create a Data Firehose and use AWS Lambda to read records from the data stream.**
- **ทำไมถึงผิด:** `Kinesis Data Firehose` เป็นพี่น้องสายรถดับเพลิง คือ "รับแล้วเอาไปเททิ้งปลายทาง (S3/Redshift)" เน้นเป็นท่อส่งจดหมาย (Ingestion) แบบ Near Real-time "ไม่ใช่วิเคราะห์สดๆ" และข้อจำกัดใหญ่อีกอย่างคือ ฝั่งปลายทางของ Firehose ใช้หัวปลั๊ก Lambda ดักรอโหลดข้อมูลไม่ได้นะ! 

❌ **[ผิด] Create an Amazon S3 bucket to store the captured data and use Amazon Athena to analyze the data.**
- **ทำไมถึงผิด:** S3 คือตู้เย็นคลังเสบียงแช่แข็ง ข้อมูลเข้ามาแล้วจะโดนแช่ไว้รอคนมาเจาะ Athena ไม่ได้ตอบโจทย์คำว่า "วิเคราะห์ข้อมูลกระแสธารแบบสด Real-time" ที่โจทย์ลากเสียงหา

❌ **[ผิด] Create an Amazon S3 bucket to store the captured data and use Amazon Redshift Spectrum...**
- **ทำไมถึงผิด:** ผิดแบบเดียวกับข้อบน เพราะตระกูลพวกนี้คือน้ำนิ่งไหลึก เน้นสืบค้นข้อมูลในอดีต (Analytics at rest/Batch data) 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon Kinesis Data Stream (KDS)**: คลองแสนแสบระดับไฮสปีด ที่ซึมซับการสาดข้อมูลรัวๆหลักล้านคลิก/วินาที เอามาโชว์หน้าจอแดชบอร์ดให้ทีมแอดมินใจเต้นแรง
- **Batching with Lambda**: แลมบ์ด้าสามารถจดจำจังหวะอมทนน้ำลาย อมซ้ำๆรอดูดทีเดียว 10 หยด (Batches) แล้วค่อยส่งคำตอบไปประมวลผลเซฟตังค์ได้เยอะ

---
---

## 📌 คำถามที่ 29
**โจทย์:**
A company plans to use a durable storage service to store on-premises database backups to the AWS cloud. To move their backup data, they need to use a service that can store and retrieve objects through standard file storage protocols for quick recovery.

Which of the following options will meet this requirement?

**ตัวเลือก:**
- [ ] Use the AWS Storage Gateway volume gateway to store the backup data and directly access it using Amazon S3 API actions.
- [ ] Use Amazon EBS volumes to store all the backup data and attach it to an Amazon EC2 instance.
- [x] Use the AWS Storage Gateway file gateway to store all the backup data in Amazon S3.
- [ ] Use AWS Snowball Edge to directly backup the data in Amazon S3 Glacier.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทตั้งใจจะขนย้ายไฟล์แบคอัปฐานข้อมูลจากออฟฟิศตัวเอง **(on-premises database backups)** ไปเก็บแช่แข็งที่ AWS
โดยข้อแม้ล้ำเส้นคือ: "ต้องเรียกใช้บริการแบบดึงผ่านหัวจ่ายไดรฟ์ออฟฟิศปกติ **(standard file storage protocols)**" เช่น NFS หรือ SMB เพื่อกู้ข้อมูลฉุกเฉินได้ปั๊บดั่งใจ 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การโอนข้อมูลข้ามออฟฟิศเข้ากล่อง S3 ด้วยการหลอกให้พนักงานเชื่อว่าเป็นพอร์ตไดรฟ์ของเครือข่ายออฟฟิศทั่วไป "NFS / SMB (standard file storage protocols)" = เทพเจ้าองค์เดียวคือ **`AWS Storage Gateway`** สายพันธุ์ย่อยที่ชื่อ **`File Gateway`** เท่านั้น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use the AWS Storage Gateway file gateway to store all the backup data in Amazon S3.**
- **ทำไมถึงถูก:** พระเอกรุ่นใหญ่ `Storage Gateway (ประเภท File Gateway)` ถูกสถาปนาขึ้นมาเพื่อนางเอกเรื่องนี้โดยเฉพาะ มันทำหน้าหลอกเสิร์ฟ "โฟลเดอร์แชร์ SMB/NFS หน้าตาแสนคุ้นเคย" ขึ้นเซิร์ฟเวอร์แอดมินในออฟฟิศ แต่กระเป๋าหลังบ้านดันทับทะลุมิติไปทะลักโผล่ปักที่กล่องอมตะ Amazon S3 ได้อย่างมหัศจรรย์ (ถูกสุด ยืดหยุ่นสุดๆ)

❌ **[ผิด] Use the AWS Storage Gateway volume gateway... access it using Amazon S3 API actions.**
- **ทำไมถึงผิด:** ใช่แล้ว Storage Gateway อันนี้เป็นเผ่าพันธุ์ย่อยที่ชื่อ `Volume Gateway` ซึ่งมันเสิร์ฟเป็น "ก้อนฮาร์ดดิสก์เปล่าเชื่อมด้วยสายพอร์ต iSCSI" ไม่ใช่โปรโตคอลแชร์โฟลเดอร์ (File storage protocols) แถมความตอกย้ำคือคุณเอากุญแจคำสั่งผี (S3 API) สอดเข้าไปดูดไขของมันตรงๆ ไม่ได้นะจ๊ะ (เพราะมันเข้ารหัสทับชั้นไว้)

❌ **[ผิด] Use Amazon EBS volumes to store all the backup data and attach it...**
- **ทำไมถึงผิด:** ไม่มีความทนทาน(durable) ระดับ Amazon S3 และที่แย่คือ EBS เป็นฮาร์ดดิสก์บล็อกเฉยๆ มันทำโปรโตคอลเครือข่ายออฟฟิศ(SMB/NFS)แชร์ขบวนรถชาวบ้านไม่ได้ (ถ้าไม่ตั้ง EC2 ไปลงโปรแกรมตั้งค่าหัวหมุนล้านรอบ)

❌ **[ผิด] Use AWS Snowball Edge to directly backup the data in Amazon S3 Glacier.**
- **ทำไมถึงผิด:** ผิดยับๆ เลย 1.รถตู้เหล็ก Snowball Edge ไม่รองรับคำสั่งเซิร์ฟแชร์โฟลเดอร์ดิบๆ(standard file storage protocols) 2.สโนว์บอลโยนข้อมูลเข้าห้องใต้ดิน S3 Glacier โดดๆ แบบข้ามชั้นบรรยากาศไม่ได้(ต้องดร็อบที่ S3 ปกติก่อน)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Storage Gateway**: หัวปลั๊กแปลงไฟระหว่างเครื่องบนโลกมนุษย์ (ออฟฟิศ) กับสรวงสวรรค์ (AWS Cloud)
- **File Gateway**: หลอกคอมบริษัทว่าเป็นเครื่อง Windows File Share/Linux NFS ธรรมดา แต่ลึกๆเอาของไปซ่อนใน S3 ชิวๆ

---
---

## 📌 คำถามที่ 30
**โจทย์:**
A company hosted a web application on a Linux Amazon EC2 instance in the public subnet that uses a non-default network ACL. The instance uses a default security group and has an attached Elastic IP address. The network ACL is configured to block all inbound and outbound traffic. The Solutions Architect must allow incoming traffic on port 443 to access the application from any source.

Which combination of steps will accomplish this requirement? (Select TWO.)

**ตัวเลือก:**
- [ ] In the Network ACL, update the rule to allow both inbound and outbound TCP connection on port 443 from source 0.0.0.0/0 and to destination 0.0.0.0/0
- [x] In the Security Group, add a new rule to allow TCP connection on port 443 from source 0.0.0.0/0
- [ ] In the Network ACL, update the rule to allow outbound TCP connection on port 32768 - 65535 to destination 0.0.0.0/0
- [ ] In the Security Group, create a new rule to allow TCP connection on port 443 to destination 0.0.0.0/0
- [x] In the Network ACL, update the rule to allow inbound TCP connection on port 443 from source 0.0.0.0/0 and outbound TCP connection on port 32768 - 65535 to destination 0.0.0.0/0

---
### 🎯 โจทย์ต้องการอะไร?
เว็บโฮสต์ขึ้นเครื่อง Linux EC2 ใช้ยามปากซอย **Network ACL แบบตั้งแผงกันไว้หมดทุกทาง (block all)** และใช้ยามหน้าบ้าน **Default Security Group** 
สถาปนิกปวดขมับ: อยากจะเปิดก๊อกให้แขกล็อกอินหน้าเว็บที่มีกุญแจเขียว (เปิดทางเข้ามาพอร์ต TCP 443 HTTPS แบบโลกทั้งใบ) 
คำถาม: ท่าสับสวิตช์เปิด 2 ช่องด่านหน้าบ้านให้ผู้คนสัญจรเข้ามาได้อย่างลื่นไหล คือ 2 ข้อกติกาตัวไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: "กฎหมายยามหน้าปากซอย (NACL)" เลวร้ายมาก... ถ้าคุณยอมโจรให้รอดกระเจิงเข้ามาทางซอย 443 ได้ (Inbound) ขากลับตอนมันขนผลลัพธ์กลับบ้าน คุณก็ต้องเปิด **"ช่องหมามุด (Ephemeral Ports ขา Outbound ทรง 32768 - 65535)"** ปล่อยรอดทะลุไปให้มันเดินออกด้วย ไม่งั้นติดแหงก 
- ทริคที่ 2: "กฎหมายพี่ยามเฝ้าหน้าบ้านสุดเฟรนด์ลี่ (Security Group)" ฉลาดสุดล้ำ... ขอแค่คุณเปิดหน้าต่างตอนโจรปีนมาทางพอร์ต 443 "หน้าบ้าน (Inbound)" อย่างเดียวก็พอ! ขากลับมันเสกคาถมุดกำแพงกลับเอง (Stateful) ได้ ไม่ต้องมาเสียเวลาเปิดรูด่านขาออก(Outbound) ให้โง่

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] In the Security Group, add a new rule to allow [Inbound] TCP connection on port 443 from source 0.0.0.0/0**
- **ทำไมถึงถูก:** เฝ้าเครื่อง EC2 เป็นรายตัวก็เปิด Inbound พอร์ต 443 บน SG สิจ๊ะ และจบสิ้นเพียงแค่นี้ ด้วยความตลกร้ายที่ Default Security Group ขาออกมันเปิดก๊อกสูบออกทะลุ 100% อยู่แล้ว

✅ **[ถูกต้อง] In the Network ACL, update the rule to allow inbound TCP connection on port 443... and outbound TCP connection on port 32768 - 65535...**
- **ทำไมถึงถูก:** ตารางเวรยามรปภ. NACL ง่อนแง่นสมองเสื่อมเสมอมา การตอบสนองให้แครบถ้วนคือ "พยักหน้าอนุญาตเข้า(In) ที่พอร์ต 443" และระวัง! "ต้องอนุญาตถีบออก(Outbound) ให้สุ่มพอร์ตหมามุดตั้งแต่ 32768 ถึง 65535 ตามสไตล์ Linux ด้วยรัวๆ" (ถูกเป๊ะทั้งเข้าและออกในข้อเดียว ปรบมือรัวๆ)

❌ **[ผิด] In the Network ACL, update the rule to allow both inbound and outbound... on port 443...**
- **ทำไมถึงผิด:** ไอ้ขาเข้า(Inbound)น่ะถูก แต่ขาเครดิตตอนหอบกลับ (Outbound) มันไม่ได้บ้าหอบกลับทางพอร์ต 443 สะกิดย้อนกลับนะ มันวิ่งออกทางท่อสุ่มพอร์ต 32000 กว่าๆ ต่างหาก 

❌ **[ผิด] In the Network ACL, update the rule to allow outbound TCP connection on port 32768 - 65535...**
- **ทำไมถึงผิด:** เอ้า เปิดช่องหมามุดขาออก(Out)ให้เดินกลับบ้านอย่างเดียว แล้วลอยแพชาวแก๊งไม่เปิดประตูด้านหน้าขาเข้า(In)ให้ปีนมาทางพอร์ต 443 เลยเหรอ?! เว็บก็ดับสนิทสิจ๊ะ 

❌ **[ผิด] In the Security Group, create a new rule to allow [Outbound] TCP connection on port 443 to destination 0.0.0.0/0**
- **ทำไมถึงผิด:** การเปิดก๊อกขาออก(Outbound ไปข้างนอกบ้าน) ใน SG ก็ไม่มีความหมายใดๆ กับปัญหาหน้าปกที่บอกว่าแขก "เข้ามาจอย(Incoming traffic)" บนเครื่องเราไม่ได้เลย เพราะมันตีมั่วทิศไปไกล แถมปกติตอนสร้างเครื่อง Default SG ก็เปิดประตูออกให้อ้าซ่าอยู่แล้ว

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Security Group (Stateful)**: คนดีที่จำหน้าได้ เปิดขาเข้า(In) ขาออกก็ผ่านฉลุย
- **Network ACL (Stateless)**: ยามสมองเสื่อม ตรวจบัตรประชาชนทั้งเดินเข้าและเดินออก แถมขากลับเซิร์ฟเวอร์จะเปลี่ยนช่องลอดเป็น "Ephemeral Ports ขยะสุ่ม(เช่น32768-61000)" 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 7: ข้อ 31 - 35)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 31
**โจทย์:**
A new online banking platform has been re-designed to have a microservices architecture in which complex applications are decomposed into smaller, independent services. The new platform uses Kubernetes, and the application containers are optimally configured for running small, decoupled services.

The new solution should remove the need to provision and manage servers, let you specify and pay for resources per application as well as improve security through application isolation by design.

Which of the following is the MOST suitable solution to implement to launch this new platform to AWS?

**ตัวเลือก:**
- [ ] Host the application in Amazon EMR Serverless and an EBS storage with the fast snapshot restore feature enabled
- [ ] Deploy an Amazon EKS Cluster on AWS Outposts with Kubernetes Cluster Autoscaler and sync any orphaned pods with Amazon AppFlow
- [ ] Use Amazon ECS to run the Kubernetes cluster on AWS Fargate
- [x] Use AWS Fargate on Amazon EKS with Service Auto Scaling to run the containerized banking platform

---
### 🎯 โจทย์ต้องการอะไร?
แอปธนาคารเปลี่ยนดีไซน์เป็น **Microservices** และใช้ **Kubernetes** 
โจทย์ระบุว่าอยากหาระบบคลาวด์รับช่วงต่อที่มีคุณสมบัติดังนี้:
1. **"ไม่ต้องมานั่งตั้งค่าดูแลเซิร์ฟเวอร์ (remove the need to provision and manage servers)"** (แปลว่าต้องการ Serverless)
2. จ่ายเงินตามขนาดแอปพลิเคชันที่ใช้จริง
3. เน้นความปลอดภัยแบบแยกห้องตัดขาดกัน (Application isolation)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ดกัปตันเรือใบ **`Kubernetes`** หรือวงการ K8s = คำตอบต้องเจาะจงไปที่บริการ **`Amazon EKS`** เท่านั้น (ห้ามกา ECS เด็ดขาด เพราะมันเป็นของ Docker ธรรมดา)
- ทริคที่ 2: เห็นคีย์เวิร์ดขี้เกียจดูแลเครื่อง **`"remove the need to provision and manage servers"`** หรือ Serverless สำหรับ Container = คำตอบคือต้องดึงฮีโร่ไร้กายหยาบอย่าง **`AWS Fargate`** มาช่วยรัน
- ทริคจับคู่เป๊ะ: รัน Kubernetes + แบบไร้เซิร์ฟเวอร์ดูแล = **`AWS Fargate on Amazon EKS`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Fargate on Amazon EKS with Service Auto Scaling to run the containerized banking platform**
- **ทำไมถึงถูก:** เติมเต็มทุกความหล่อเหลาให้โจทย์ EKS เป็นเจ้าพ่อวงการ Kubernetes และ Fargate เข้ามาช่วยรับเหมาเป็นเครื่องเซิร์ฟเวอร์วิญญาณให้ ทำให้เราไม่ต้องมานั่งอัปเดตแพตช์เครื่องเอง แถมแอปแต่ละตัวก็แยกแคปซูลอยู่กันคนละโลก (isolation) ปลอดภัยขั้นสุด

❌ **[ผิด] Use Amazon ECS to run the Kubernetes cluster on AWS Fargate**
- **ทำไมถึงผิด:** ยำรวมมิตรผิดประเภท! `Amazon ECS` เอามาใช้รัน Kubernetes (K8s) ไม่ได้นะจ๊ะ ECS มันเป็นระบบ Orchestrator พื้นฐานของสาย Docker/AWS แท้ๆ ไม่ใช่มาตรฐาน Open-source ของ Kubernetes

❌ **[ผิด] Deploy an Amazon EKS Cluster on AWS Outposts...**
- **ทำไมถึงผิด:** ไปกันใหญ่ `AWS Outposts` คือการสั่งซื้อตู้เซิร์ฟเวอร์เหล็กแบรนด์ AWS ของจริงมาตั้งแอร์คอยเป่าที่บ้านออฟฟิศตัวเอง มันคือฮาร์ดแวร์ Physical ล้วนๆ ขัดกับหัวใจโจทย์ที่ร้องขอบริการแบบไม่ต้องดูแลเซิร์ฟเวอร์อย่างรุนแรง

❌ **[ผิด] Host the application in Amazon EMR Serverless and an EBS storage...**
- **ทำไมถึงผิด:** `Amazon EMR` คือเซิร์ฟเวอร์ม้าใช้สายช้าง(Hadoop/Spark) เอาไว้เคี้ยวฟางข้อมูล Big Data กองโต ไม่ได้มีศาลพระภูมิอะไรเกี่ยวกับแอปวงการ Kubernetes และ Microservices เลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon EKS (Elastic Kubernetes Service)**: กัปตันขับเรือใบ Kubernetes ควบคุมตู้คอนเทนเนอร์ระดับโลก
- **AWS Fargate**: เซิร์ฟเวอร์ไร้ร่าง อยากได้คอนเทนเนอร์กี่ตัวก็แค่ร่ายมนต์เสกขึ้นมา ไม่ต้องมานั่งดูปุ่ม Power ของเครื่อง EC2 เอง

---
---

## 📌 คำถามที่ 32
**โจทย์:**
A company needs to collect gigabytes of data per second from websites and social media feeds to gain insights into its product offerings and continuously improve the user experience. To meet this design requirement, an application is deployed on an Auto Scaling group of Spot EC2 instances which processes the data and stores the results to DynamoDB and Redshift. The solution should have a built-in enhanced fan-out feature.

Which fully-managed AWS service can you use to collect and process large streams of data records in real-time with the LEAST amount of administrative overhead?

**ตัวเลือก:**
- [x] Amazon Kinesis Data Streams
- [ ] Amazon S3 Access Points
- [ ] AWS Data Exchange
- [ ] Amazon Managed Streaming for Apache Kafka (Amazon MSK)

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการรองรับการสาดข้อมูลปริมาณ "หลาย Gigabytes ต่อวินาที (gigabytes of data per second)" จากเว็บไซต์และทวีตเตอร์
เพื่อเอามาวิเคราะห์แบบ **"เรียลไทม์ (process data records in real-time)"** 
มีกฎเหล็ก 2 ข้อคือต้องเป็นบริการแบบ **"สำเร็จรูปคนดูแลเหนื่อยน้อยสุด (fully-managed / LEAST administrative overhead)"** และต้องมีฟีเจอร์พ่นน้ำแยกสายอย่าง **"enhanced fan-out"** 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: บริการพสุธากัมปนาทรองรับข้อมูลถล่มเป็น GB/วินาที เพื่อวิเคราะห์แบบ **`Real-time`** มี 2 ค่ายคือ Kinesis Data Streams และ Amazon MSK (Kafka)
- ทริคที่ 2: ถ้าโจทย์ระบุว่าต้องการแบบ **`LEAST amount of administrative overhead (คลิกเดียวจบขี้เกียจตดูแล)`** และฟีเจอร์เอกซ์คลูทีฟ **`"enhanced fan-out"`** (พ่นข้อมูลกระจายท่อคูณสอง) = ให้กา **`Amazon Kinesis Data Streams`** แบบไม่ต้องคิดเยอะ เพราะฝั่ง MSK ดูแลยากกว่าและไม่มีชื่อฟีเจอร์ Fan-out แบบนี้ครับ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon Kinesis Data Streams**
- **ทำไมถึงถูก:** `Kinesis Data Streams (KDS)` เป็นสะพานข้ามแม่น้ำสาดสตรีมมิ่งข้อมูลสปีดทะลุนรกหลักล้านคลิกแบบสดๆ (Real-time) และเป็นของคู่บุญ AWS ที่มาพร้อมฟีเจอร์ไม้ตาย "Enhanced Fan-out" เพื่อเบ่งท่อส่งข้อมูลให้คนอ่านได้เร็วขึ้น 2 เท่าโดยไม่แย่งแบนด์วิดท์กัน

❌ **[ผิด] Amazon Managed Streaming for Apache Kafka (Amazon MSK)**
- **ทำไมถึงผิด:** MSK เอาไว้ตีคู่สูสีกับ Kinesis ก็จริง แถมรันแบบ Real-time ได้เหมือนกัน แต่การดูแล Apache Kafka ในโลกความจริงนั้นปวดตับปวดไตตั้งค่ายากกว่า Kinesis หลายขุม (ไม่ตอบโจทย์ LEAST overhead) อีกทั้ง MSK ไม่มีฟีเจอร์ที่ชื่อ "enhanced fan-out" แบบของ AWS ครับ

❌ **[ผิด] Amazon S3 Access Points**
- **ทำไมถึงผิด:** S3 เป็นหลุมเก็บขยะสถิตย์ ไม่ใช่ทางวิ่งสตรีมมิ่งข้อมูล (Streaming logs) และ S3 Access Points มีไว้แบ่งประตูกุญแจคนรับของเฉยๆ

❌ **[ผิด] AWS Data Exchange**
- **ทำไมถึงผิด:** `Data Exchange` คือตลาดสด Shopee เอาไว้วางขาย-กดซื้อชุดข้อมูลวิเคราะห์สถิติชาวบ้านรายเดือน ไม่เกี่ยวอะไรกับไปตั้งรับท่อน้ำ Real-time เลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Enhanced Fan-out (KDS)**: ปกติท่อของ Kinesis จะรับเถ้าแก่สูบน้ำได้จำกัดความเร็ว แต่ถ้าเปิดโหมดมหาเทพ Enhanced Fan-out จะเป็นการอัดฉีดท่อ 2 MB/sec แยกท่อส่วนตัวให้ลูกค้าแต่ละคนดูดไปฟรีๆ เร็วแรงทะลุจอ

---
---

## 📌 คำถามที่ 33
**โจทย์:**
A Solutions Architect is working for a financial company. The manager wants to have the ability to automatically transfer obsolete data from their S3 bucket to a low-cost storage system in AWS after a certain period of time.

What is the best solution that the Architect can provide to them?

**ตัวเลือก:**
- [x] Use Lifecycle Policies in S3 to move obsolete data to Glacier.
- [ ] Use an EC2 instance and a scheduled job to transfer the obsolete data from their S3 location to Amazon S3 Glacier.
- [ ] Use Amazon SQS.
- [ ] Use Amazon Timestream.

---
### 🎯 โจทย์ต้องการอะไร?
ผู้จัดการบริษัทการเงิน อยากได้วิธีที่จะโยกเอนคัดแยก **"ข้อมูลไฟล์ถัง S3 ที่ล้าสมัย/ตกรุ่นแล้ว (obsolete data)"** 
กระเด็นกระดอนไหลไปจมอยู่กับ **"กรุเก็บของราคาถูกที่สุด (low-cost storage system)"** แบบ **"อัตโนมัติ (automatically)"** เมื่อเวลาผ่านไประยะหนึ่ง (เช่น เลย 3 เดือนปุ๊บ จับโยนลงกรุ่ง)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ในคำสอนวิชา Amazon S3 การตั้งเวลาเปลี่ยนย้ายชนชั้นของไฟล์ (แก่แล้วให้ย้ายบ้านไปอยู่ที่ถูกๆ) เรียกว่ากฎของวงจรชีวิต หรือ **`S3 Lifecycle Policies`** 
- ทริคที่ 2: บ้านพักคนชรา (Low-cost storage system/Archiving) ที่ถูกที่สุดในตระกูล S3 เอาไว้ดองไฟล์ยาวๆ ไม่ค่อยดู คือลานน้ำแข็ง **`Amazon S3 Glacier`** (เจอคู่คอมโบ 2 คำนี้ กาข้อนั้นเลย)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Lifecycle Policies in S3 to move obsolete data to Glacier.**
- **ทำไมถึงถูก:** ตอบโจทย์ตรงล็อกเป๊ะๆ การเปิดโหมด `Lifecycle Policies` บนหน้าจอ S3 สามารถตั้งคำสั่งง่ายๆได้เลยว่า "ถ้าไฟล์มีอายุครบ 30 วัน ให้เตะชั้นประหยัด Standard-IA -> ถ้าครบ 90 วันให้เตะร่วงลงหลุมซอมบี้ `S3 Glacier` (ราคาถูกสุดๆ)" อัตโนมัติชิวๆ และถูกวิธีที่สุด

❌ **[ผิด] Use an EC2 instance and a scheduled job to transfer the obsolete data...**
- **ทำไมถึงผิด:** นี่มันท่าขี่ช้างจับตั๊กแตน! ทำไมต้องเปิดเครื่องเซิร์ฟเวอร์ EC2 ขึ้นมาตั้งสคริปต์รายวัน (Scheduled job) ให้มันคอยกวาดไฟล์ S3 ขนย้ายไป Glacier ให้เหนื่อยเล่นล่ะ ทั้งเปลืองตังค์ค่า EC2 และเปลืองแรงคนเขียนสคริปต์สุดๆ 

❌ **[ผิด] Use Amazon SQS.**
- **ทำไมถึงผิด:** SQS เป็นตู้ไปรษณีย์รับจดหมายเข้าคิวงาน ไม่ใช่สถานที่รับฝากไฟล์วิดีโอหรือไฟล์เก็บข้อความใหญ่ๆ (หลงทางมาไกลมาก)

❌ **[ผิด] Use Amazon Timestream.**
- **ทำไมถึงผิด:** `Timestream` เป็นฐานข้อมูลเก็บคลังสถิติพวกเซนเซอร์ความร้อน IoT ย้อนหลังรายวินาที (Time-series) นามสกุลคนละชั้นกับ S3 Storage เก็บเศษไฟล์ดองเค็มเลยจ้า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Lifecycle configuration**: ล้อคลายวงจรเกิดแก่เจ็บตายของไฟล์ มี 2 โหมด
  - **Transition**: ส่งไฟล์ไปตกระกำลำบากยังชั้นต่างๆที่ถูกลงเรื่อยๆ
  - **Expiration**: สั่งประหารไฟล์ ลบทิ้งขยะทันทีเมื่อถึงเวลาที่กำหนด
- **S3 Glacier**: ชั้นเก็บของประหยัดตังค์โคตรๆ แต่ข้อเสียคือเวลาอยากจะหยิบของขึ้นมาดูทีนึง ต้องรอพนักงาน AWS งมหาเป็นเวลาหลายนาที จนถึงเป็นชั่วโมง 

---
---

## 📌 คำถามที่ 34
**โจทย์:**
A company has an On-Demand EC2 instance located in a subnet in AWS that hosts a web application. The security group attached to this EC2 instance has the following Inbound Rules:
*(รูปแนบ: โชว์ Security Group มี Inbound แค่ SSH พอร์ต 22)*
The Route table attached to the VPC is shown below. You can establish an SSH connection into the EC2 instance from the Internet. However, you are not able to connect to the web server using your Chrome browser.
*(รูปแนบ: โชว์ Route Table ขาออกไปที่ 0.0.0.0/0 วิ่งชี้ไปหา Internet Gateway igw-b51618cc อย่างสวยงาม)*

Which of the below steps would resolve the issue?

**ตัวเลือก:**
- [x] In the Security Group, add an Inbound HTTP rule.
- [ ] In the Security Group, remove the SSH rule.
- [ ] In the Route table, add this new route entry: 0.0.0.0 -> igw-b51618cc
- [ ] In the Route table, add this new route entry: 10.0.0.0/27 -> local

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินปลุกปั้นหน้าเว็บไว้บน EC2 เช็คแล้วโชคดี **รีโมตจอดำ (SSH) เข้าเครื่องเซิร์ฟได้ปกติสบายมาก**
แต่! ปัญหาคือเวลายูสเซอร์เอาโครม **(Chrome browser) เปิดเข้าหน้าเว็บไซต์ กลับเข้าไม่ได้ หมุนติ้วๆ (not able to connect to web server)**
คำถาม: ต้องลากมือไปเติมสวิตช์แก้บัคตรงไหน ถึงจะเข้าเว็บได้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การที่คุณเจาะจอเข้า SSH ก๊อกๆๆ ได้ แปลว่าตารางเดินทาง **Route Table หรือ Internet Gateway ในเครื่องคุณเนี่ย "สมบูรณ์แบบร้อยเปอร์เซ็นต์" แล้วจ้า** ไม่ต้องไปแตะต้องซ่อมมันเลย (ตัดชอยส์เรื่อง Route Table ทิ้งไปซะ)
- ทริคที่ 2: ปัญหาหน้า Chrome หมุนติ้วๆ แปลว่าด่านหน้าตีกันไม่ให้พอร์ตเว็บไซต์เข้า ซึ่งพอร์ตของเว็บไซต์ทั่วไปคือ **`HTTP (พอร์ต 80)`** ดังนั้นยามหน้าประตูอย่าง **`Security Group`** ต้องไขกุญแจเพิ่ม Inbound **`HTTP`** สิครับ ถึงจะรอด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] In the Security Group, add an Inbound HTTP rule.**
- **ทำไมถึงถูก:** เบสิกสุดๆ ปัญหาทั้งหมดทั้งมวลแค่ลืมเจาะรูเปิดทาง "HTTP พอร์ต 80" บนกล่องยามหน้าด่าน Security Group ไงล่ะ แค่เพิ่มกฎนี้ไป แขกชาวโครมก็มุดเข้าเว็บได้ร่าเริงแล้ว

❌ **[ผิด] In the Security Group, remove the SSH rule.**
- **ทำไมถึงผิด:** เห้ยยย! นั่นมันกุญแจประตูหลังบ้านเรา ไปลบทิ้งทำไม ลบทิ้งเราก็อัปเดตเซิร์ฟเวอร์ต่อไม่ได้สิ แถมลบแล้วเว็บโครมก็ยังเข้าไม่ได้อยู่ดี ป่วยหนักกว่าเดิม 

❌ **[ผิด] In the Route table, add this new route entry: 0.0.0.0 -> igw-b51618cc**
- **ทำไมถึงผิด:** เพราะในโจทย์มีเขียนว่า "สามารถต่อ SSH เข้ามาจากอินเตอร์เน็ตได้ปกติ" นี่ก็เป็นตัวการันตีแล้วว่าตาราง Route Table มีเส้นทางออก Internet Gateway (0.0.0.0 -> igw) เตรียมเสร็จสรรพเรียบร้อยแต่แรกแล้ว ไม่ต้องไปแอดเกะกะซ้ำซ้อนจ้า

❌ **[ผิด] In the Route table, add this new route entry: 10.0.0.0/27 -> local**
- **ทำไมถึงผิด:** ยิ่งเลอะเทอะใหญ่ เส้นทางวิ่งวงใน (local route) ระบบมันจะเสกแปะลง Route Table ให้อัตโนมัติเป็น Default ของ AWS ตัวแรกสุดอยู่แล้ว ไม่จำเป็นและไม่สามารถไปคลอดมือเองได้เลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Security Group Troubleshooting**: ปัญหาเว็บต่อไม่ติด เข้าไม่ได้ ส่วนใหญ่ 90% เกิดจากแอดมินลืมเปิด Inbound (HTTP: 80 / HTTPS: 443) และยามตัวนี้ด่านเข้าไม่ได้แปลว่ามันตีตกเงียบ (Timeout) แบบไม่ส่งเสียงร้องบอกด้วยนะ

---
---

## 📌 คำถามที่ 35
**โจทย์:**
A company has established a dedicated network connection from its on-premises data center to AWS Cloud using AWS Direct Connect (DX). The core network services, such as the Domain Name System (DNS) service and Active Directory services, are all hosted on-premises. The company has new AWS accounts that will also require consistent and dedicated access to these network services.

Which of the following can satisfy this requirement with the LEAST amount of operational overhead and in a cost-effective manner?

**ตัวเลือก:**
- [x] Create a new Direct Connect gateway and integrate it with the existing Direct Connect connection. Set up a Transit Gateway between AWS accounts and associate it with the Direct Connect gateway.
- [ ] Set up a new Direct Connect gateway and integrate it with the existing Direct Connect connection. Configure a VPC peering connection between AWS accounts and associate it with Direct Connect gateway.
- [ ] Set up another Direct Connect connection for each and every new AWS account that will be added.
- [ ] Create a new AWS VPN CloudHub. Set up a Virtual Private Network (VPN) connection for additional AWS accounts.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทลากสายไฟเบอร์ส่วนตัว **AWS Direct Connect (DX)** มุดใต้ดินเชื่อมจากออฟฟิศปักเข้าเซิร์ฟ AWS เรียบร้อยละ
โดยมีศูนย์กลางพวกรหัสพนักงาน (Active Directory) วางกองอยู่ที่บ้านออฟฟิศ
ปัญหา: บริษัทมีการ **"ผุดบัญชี AWS Account ใหม่ๆ ขึ้นมาเรื่อยๆ เป็นดอกเห็ด"** และบัญชีลุกเจี๊ยบพวกนี้ก็อยากวิ่งย้อนเกล็ดกลับมาดูพาสเวิร์ดที่ออฟฟิศผ่านสายตรงเส้นนี้ด้วย
คำถาม: ท่าตั้งค่าเครือข่ายท่าไหนที่จะ **เชื่อมพวกฝูงบัญชีใหม่นี้เข้าสายไฟเบอร์ DX" แบบเหนื่อยน้อยสุดและประหยัดงบ (LEAST overhead and cost-effective)** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การมีเครือข่ายผุดยั๊วเยี้ยหลายสิบ VPC/หลาย Account แล้วอยากรวบเสาไฟเอามารวมกระจุกไว้ที่ศูนย์กลางหน้าบ้านจุดเดียว ท่านี้เรียกว่าฮับศูนย์กลาง หรือสวิตช์ใหญ่ **`Transit Gateway`** พระกู้ภัยเครือข่าย (เจอคีย์เวิร์ดนี้ให้หูผึ่ง)
- ทริคที่ 2: ถ้าอยากรวมศูนย์ VPC หลายวง เพื่อไปเสียบก้นออกสายไฟเบอร์ **Direct Connect (DX)** แบบประหยัดๆ ไม่ต้องลากสายใหม่ = สูตรผสมปูนสำเร็จรูปคือ **`Transit Gateway` + หัวปลั๊ก `Direct Connect Gateway`** เป็นคอมโบมหาประลัยแก้โจทย์นี้ได้ 100% เลย

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a new Direct Connect gateway... Set up a Transit Gateway between AWS accounts and associate it...**
- **ทำไมถึงถูก:** เพอร์เฟ็กต์! คุณสร้างปลาหมึกนิวเคลียร์อย่าง `Transit Gateway` ไว้กลางรังบัญชี AWS แล้วให้พวกลูกบ้านใหม่ทุกกรุ๊ปมาเสียบเต้าฮับอันนี้ จากนั้นเอาปลาหมึกตัวนี้ต่อพ่วงกับสายแลน `Direct Connect Gateway` วิ่งตรงข้ามทวีปกลับบ้านออฟฟิศ ประหยัดที่สุดและเซ็ตอัพง่ายแค่หน้าคอนโซล ไม่ต้องลากสายไฟเบอร์เพิ่มใดๆ

❌ **[ผิด] Set up another Direct Connect connection for each and every new AWS account...**
- **ทำไมถึงผิด:** ถลุงงบบริษัทซะป่นปี้! การโยงสายเคเบิล Direct Connect เพิ่มให้ VPC มัดละเส้น เป็นการกระทำที่แพงโคตรบรรลัย (เส้นละหลายหมื่นต่อเดือน) แถมใช้เวลาบิ้วเส้นใหม่เป็นเดือน และแอดมินต้องนั่งเกาสมองจัดการสาย 50 เส้นพร้อมกัน (ผิดกฎ cost-effective ที่สุด)

❌ **[ผิด] Set up a new Direct Connect gateway... Configure a VPC peering connection...**
- **ทำไมถึงผิด:** การโยงสะพานใยแมงมุม `VPC peering` ไม่สามารถทำ "ทางผ่าน/ตั๋วโดยสารร่วม (Transitive)" ได้ หมายความว่า ถ้า VPC B พีริ่งกับ VPC A... แล้ว VPC A ต่อสายตรง (DX) กลับออฟฟิศ...  ไอ้ VPC B จะหน้าด้านมุดเกาะ A ไปถึงออฟฟิศแบบเนียนๆไม่ได้นะ! (มันไม่ได้ทะลุปรุโปร่งถึงกันแบบนี้จ้า ร่วงตั้งแต่ทฤษฎีแรก)

❌ **[ผิด] Create a new AWS VPN CloudHub. Set up a Virtual Private Network (VPN)...**
- **ทำไมถึงผิด:** ท่าหนีปัญหา ไม่ใช้งานสายตรง(DX)ของบริษัท แต่หนีไปเปิดอุโมงค์มุดผ่านอินเตอร์เน็ตสาธารณะแทน (VPN) ซึ่งผิดสเปคกับโจทย์ที่ร้องขอ "consistent and dedicated access" หรือความเร็วแบบสม่ำเสมอผ่านสายตรง แถม VPN Cloudhub มีไว้มัดรวมออฟฟิศชานเมืองหลายสาขาให้คุยกัน ไม่ใช่สำหรับมัดฝูง AWS Accounts

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Transit Gateway (TGW)**: เราเตอร์/ฮับ กลางอวกาศ ต่อให้เรามี VPC แสนวง ก็แค่ลากเส้นเล็กๆ มาเสียบที่ตูดฮับ TGW ตัวนี้จบปิ้ง คุยกันได้ทะลุปรุโปร่งหมด ไม่ต้องมานั่งโยงใย VPC Peering ให้เป็นรังนกกระจอก
- **Direct Connect Gateway**: อุปกรณ์แปลงหัวปลั๊ก เพื่อฉีดสัญญาณจากสาย DX โบรยบอมเข้าไปในระบบ AWS วงใน

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 8: ข้อ 36 - 40)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 36
**โจทย์:**
A Solutions Architect is designing a highly available environment for an application. She plans to host the application on EC2 instances within an Auto Scaling Group. One of the conditions requires data stored on root EBS volumes to be preserved if an instance terminates.

What should be done to satisfy the requirement?

**ตัวเลือก:**
- [ ] Enable the Termination Protection option for all EC2 instances.
- [x] Set the value of DeleteOnTermination attribute of the EBS volumes to False.
- [ ] Use AWS DataSync to replicate root volume data to Amazon S3.
- [ ] Configure ASG to suspend the health check process for each EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
จะสร้างแอปพลิเคชันบนกลุ่ม Auto Scaling Group (ASG) 
มีกฎเหล็กข้อบังคับคือ: **"ถ้าเครื่อง EC2 โดนสั่งปิดลบทิ้ง (terminates) ข้อมูลที่เก็บอยู่บนฮาร์ดดิสก์หลัก (root EBS volumes) จะต้องถูกเก็บรักษาไว้ ห้ามหายตามเครื่อง"**
คำถาม: ท่าตั้งค่าอันไหนที่รักษาสิทธิรอดตายให้ฮาร์ดดิสก์ก้อนนี้ได้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ค่าเริ่มต้นตามนิสัยปกติของ AWS คือ "ถ้ากดยิงเครื่องทิ้งแล้ว ฮาร์ดดิสก์แกนกลาง (Root Volume) จะโดนระเบิดทิ้งไปพร้อมเครื่องด้วย" 
- ทริคที่ 2: ถ้าอยากเซฟชีวิตฮาร์ดดิสก์ก้อนหลักนี้ไว้ ก็แค่สับสวิตซ์คำสั่งคุณสมบัติที่ชื่อ **`DeleteOnTermination`** (ลบทิ้งเมื่อสั่งยุบเครื่อง) ให้เปลี่ยนเป็น **`False`** (ปิด) ซะ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set the value of DeleteOnTermination attribute of the EBS volumes to False.**
- **ทำไมถึงถูก:** ตรงตัวที่สุด ในหน้าตั้งค่าหรือโค้ด AWS แค่ปัดสวิตช์ฟังก์ชัน `DeleteOnTermination=False` ที่ก้อน EBS Root สตอเรจ เท่านี้เมื่อ ASG หมั่นไส้สั่งฆ่าปาดคอเครื่อง EC2 ตัวฮาร์ดดิสก์ก้อนเก่าก็จะหลุดร่วงหล่นแหมะไว้ให้เราเข้าไปเก็บข้อมูลต่อรอดพ้นความตายไปได้อย่างปลอดภัย 

❌ **[ผิด] Enable the Termination Protection option for all EC2 instances.**
- **ทำไมถึงผิด:** เปิดโหมด "กันเผลอกดมือลั่น" `Termination Protection` มันแค่เตือนคนห้ามไปกดลบเครื่องเล่นๆ เฉยๆ แต่เมื่อไรก็ตามที่ ASG ออโต้สเกลลิ่งรู้สึกว่าเครื่องพังแล้วสั่งเก็บกวาด ฟีเจอร์นี้ก็กันไม่อยู่หรอกนะ และที่สำคัญ ไม่ได้ช่วยรอดตายให้กับชั้นข้อมูล EBS แข็งๆเลย

❌ **[ผิด] Use AWS DataSync to replicate root volume data to Amazon S3.**
- **ทำไมถึงผิด:** เล่นท่าพิสดาร `DataSync` มีไว้ย้ายไฟล์ระหว่างกล่อง NFS ข้ามออฟฟิศ หรือกล่องแชร์ขยะ S3 ยักษ์ๆ ไม่รู้จะลากอเนกประสงค์นี้ให้มานั่งซิงค์ไดรฟ์ Root เล็กๆทำไม และวิธีนี้ไม่ได้ตอบโจทย์การหยุดระบบลบดิสก์ของ EBS โดยตรงใดๆ 

❌ **[ผิด] Configure ASG to suspend the health check process for each EC2 instance.**
- **ทำไมถึงผิด:** การปิดหูตา (Suspend health check) ของ Auto Scaling Group หมายความว่าต่อให้เครื่อง EC2 พังจอฟ้าคาที่ ASG ก็จะไม่จับฆ่าทิ้งและไม่ปั้นตัวใหม่มาแทน (อ้าว ระบบก็พังสิ! ขัดเป้าหมาย High Availability ยับๆ จ้า)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **EBS DeleteOnTermination**:
  - Root Volume = **True** (เครื่องตาย ดิสก์หลักแถมฟรีตายตาม)
  - Data Volume (ก้อนดิสก์หนีบพ่วง) = **False** (เครื่องตาย ดิสก์พ่วงรอดชิวๆ ไม่ได้โดนตั้งค่าปิดมาแต่แรก)

---
---

## 📌 คำถามที่ 37
**โจทย์:**
In Amazon EC2, you can manage your instances from the moment you launch them up to their termination. You can flexibly control your computing costs by changing the EC2 instance state. Which of the following statements is true regarding EC2 billing? (Select TWO.)

**ตัวเลือก:**
- [x] You will be billed when your Reserved instance is in terminated state.
- [ ] You will be billed when your On-Demand instance is in pending state.
- [ ] You will be billed when your Spot instance is preparing to stop with a stopping state.
- [ ] You will not be billed for any instance usage while an instance is not in the running state.
- [x] You will be billed when your On-Demand instance is preparing to hibernate with a stopping state.

---
### 🎯 โจทย์ต้องการอะไร?
เรื่องเงินๆ ทองๆ ของคนเช่าเครื่องเซิร์ฟเวอร์ (EC2)
คำถาม: กฎเกณฑ์การนับขวดน้ำเก็บตังค์ (billing) ที่ **ถูกต้อง 2 ประการ** คือประโยคไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เครื่องสัญญาผูกมัดระยะยาว 1-3 ปีอย่าง **`Reserved Instances (RI)`** คือการเซ็นเช็คจ่ายล่วงหน้าหรือผ่อนจ่ายไปแล้ว "ต่อให้คุณหมั่นไส้กดยุบเครื่องดับทิ้ง (terminated state) AWS ก็จะเดินหน้าเก็บตังค์ตามยอดขวดบัตรต่อไปอยู่ดีจนครบระยะบิล 1 ปีจ้า" 
- ทริคที่ 2: สภาพครึ่งหลับครึ่งตื่น เครื่องกำลังงัวเงียเตรียมจำศีล **`"preparing to hibernate (stopping state)"`** คุณจะต้องชดใช้ค่าไฟอยู่ เพราะมันกำลังง่วนเก็บความจำ RAM ลงฮาร์ดดิสก์ให้คุณเนิ่นนาน 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] You will be billed when your Reserved instance is in terminated state.**
- **ทำไมถึงถูก:** เครื่องสัญญา `Reserved Instances (RI)` ผูกปิ่นโตกันแล้ว ต่อให้คุณกดลบทิ้งมันกลางปี AWS ก็ยิ้มแฉ่งเตรียมใบเรียกเก็บเงินเดือนถัดไปส่งมาให้คุณอยู่ดี (ถึงแม้ซากเครื่องจะไม่อยู่ให้ดูต่างหน้าแล้วก็ตาม)

✅ **[ถูกต้อง] You will be billed when your On-Demand instance is preparing to hibernate with a stopping state.**
- **ทำไมถึงถูก:** ตอนที่คุณกดปุ่มหยุดเครื่องสไตล์สูบแบต (Hibernate) จังหวะกำลังเตรียมตัวเก็บแอปฯที่ค้างลงฮาร์ดดิสก์ AWS จะยังขูดสลึงค่าไฟคุณอยู่! จนกว่ามันจะไปถึงป้าย `stopped (หลับสนิท)` จึงจะเลิกเก็บ 

❌ **[ผิด] You will be billed when your On-Demand instance is in pending state.**
- **ทำไมถึงผิด:** ใจคอจะโกงกันขนาดนี้เลยเหรอ เครื่องแค่กำลังตั้งไข่เริ่มรันเปิดไฟ (Pending) ยังไม่ได้วิ่งเข้า Windows สมบูรณ์แบบเลย AWS ไม่ใจดำขนาดเก็บตังค์ตอนเครื่องยังบู๊ทไม่เสร็จนะ (เก็บตอน Running นู่น)

❌ **[ผิด] You will be billed when your Spot instance is preparing to stop with a stopping state.**
- **ทำไมถึงผิด:** ผิดถนัด เครื่องพเนจร `Spot Instance` ตอนประมูลได้และถ้ามันถูกเตะเตรียมตัวจะหลับ (stopping state) จากเครื่องสภาวะปกติ AWS จะใจดีโบกมือบ๊ายบาย **ไม่ทวงตังค์** ในวินาทีเหล่านั้นจ้า

❌ **[ผิด] You will not be billed for any instance usage while an instance is not in the running state.**
- **ทำไมถึงผิด:** แหม... คำว่า "ไม่เก็บเงินตอนที่เครื่องไม่ได้วิ่งอยู่" มันครอบคลุมพร่ำเพรื่อไปหน่อย เพราะอย่างข้อข้างบนตอนที่เครื่องเพิ่งจะ "จำศีล (hibernate) หมาดๆ" แม้ไม่ได้ Running แต่มันก็ยังแอบดูดเงินเราอยู่ดีแหละ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **EC2 Lifecycle**: 
  - `pending` -> **ฟรี**
  - `running` -> **จ่ายตังค์**
  - `stopping (เตรียมนอนปกติ)` -> **ฟรี**
  - `stopping (เตรียมจำศีลปั่นแรม)` -> **จ่ายตังค์เต็มเม็ด**
  - `stopped` / `terminated` -> **ฟรี** (ยกเว้นติดสัญญา RI)

---
---

## 📌 คำถามที่ 38
**โจทย์:**
A company is deploying a Microsoft SharePoint Server environment on AWS using CloudFormation. The Solutions Architect needs to install and configure the architecture that is composed of Microsoft Active Directory (AD) domain controllers, Microsoft SQL Server 2012, multiple Amazon EC2 instances to host the Microsoft SharePoint Server and many other dependencies. The Architect needs to ensure that the required components are properly running before the stack creation proceeds.

Which of the following should the Architect do to meet this requirement?

**ตัวเลือก:**
- [ ] Configure the UpdateReplacePolicy attribute in the CloudFormation template. Send a success signal after the applications are installed and configured using the cfn-signal helper script.
- [ ] Configure a UpdatePolicy attribute to the instance in the CloudFormation template. Send a success signal after the applications are installed and configured using the cfn-signal helper script.
- [x] Configure a CreationPolicy attribute to the instance in the CloudFormation template. Send a success signal after the applications are installed and configured using the cfn-signal helper script.
- [ ] Configure the DependsOn attribute in the CloudFormation template. Send a success signal after the applications are installed and configured using the cfn-init helper script.

---
### 🎯 โจทย์ต้องการอะไร?
เสกสร้างอาณาจักร Microsoft (AD, SQL Server, SharePoint) เต็มขั้นขึ้นมาด้วยกล่องโค้ดเสกฝัน `AWS CloudFormation`  ปัญหาคือมีของลงอัดแน่นเยอะมาก และแต่ละอันก็ลงตั้งค่านาน
โจทย์ร้องขอ: สถาปนิกอยากจะบังคับรอกอไผ่ **"ให้หน้าแอปพร้อมติดเครื่องรันครบถ้วนเสร็จสมบูรณ์เสียก่อน (must ensure... properly running before the stack creation proceeds)"** ก่อนที่ AWS CloudFormation จะกาไฟเช็คถูกว่าเสกเสร็จข้ามด่านไปเสกของชิ้นต่อไป

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: "กฎหมายขอคุกเข่ารอก่อนยังเสกไม่เสร็จ!" ใน CloudFormation ภาษาหลักทางการคือแอตทริบิวต์ **`CreationPolicy`** ที่คอยเบรกห้ามลื่นไหลไปเสกตัวอื่น จนกว่าตัวมันเองจะส่งพลุเขียวส่งสัญญาณ (Signal) ตอบกลับมา
- ทริคที่ 2: สคริปต์สหายรักที่คอยยิงพลุสัญญาณบอกว่าซอฟต์แวร์ข้างในเครื่องเซ็ตเสร็จหมดแล้วน้าาา คือคำสั่ง **`cfn-signal`** (ถ้าเจอ cfn-init แบบชอยส์หลอกๆนั่นมีไว้โหลดไฟล์เฉยๆ) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure a CreationPolicy attribute... using the cfn-signal helper script.**
- **ทำไมถึงถูก:** แม่นเปี๊ยบ `CreationPolicy` คือป้ายห้ามเข้าเขตก่อสร้าง! ทำหน้าที่บอก CloudFormation ว่า "ฮัลโหล อย่าเพิ่งโชว์เตือนว่าเครื่องสร้างเสร็จนะ ช่วยรอฉันรันปั้นโปรแกรมในเครื่องด้วย" เมื่อโปรแกรมพร้อมปุ๊บก็กดรีโมต `cfn-signal` สับสวิตช์ส่งไฟเขียวว่า "สำเร็จโว้ย ดำเนินสร้างด่านต่อไปได้เลย"

❌ **[ผิด] Configure the DependsOn attribute... using the cfn-init helper script.**
- **ทำไมถึงผิด:** ใช่ `DependsOn` เอาไว้จัดคิวลำดับญาติว่าใครเกิดก่อน-หลัง แต่การรอคำสั่งเครื่องโหลดสคริปต์ให้เสร็จก่อนแบบที่โจทย์อยากได้ต้องใช้คู่กับเบรก `CreationPolicy` เสมอ และปืนยิงพลุตอนจบชื่อ `cfn-signal` ไม่ใช่ `cfn-init` จ้า (ไอนั่นไว้ชงกาแฟเสิร์ฟไฟล์แรกเริ่มเฉยๆ)

❌ **[ผิด] Configure a UpdatePolicy attribute... using the cfn-signal helper script.**
- **ทำไมถึงผิด:** คนละบทกัน `UpdatePolicy` เฝ้าระวังพฤติกรรมเฉพาะตอนเพื่อนพ้องอัพเกรด(อัพเดท) สลับเครื่องสเกลใหม่ ไม่ใช่ตอนที่เพิ่งจะจุดไฟเสกเกิดร่างครั้งแรก(Creation) ครับโผม

❌ **[ผิด] Configure the UpdateReplacePolicy attribute... using the cfn-signal helper script.**
- **ทำไมถึงผิด:** ยิ่งคนละเล่มบุ๊ค `UpdateReplacePolicy` มีเพื่อบอกว่า "ถ้าเผลอลบกระถางฉันทิ้งเพื่ออัพเดตอันใหม่...ก็เก็บรอยฝากสำรองอันเก่าไว้ด้วยนะ" ไม่เกี่ยวกับการจับเวลาติดตั้งแอปใดๆ สิ้น

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **CloudFormation CreationPolicy**: รอโหวตไฟเขียวจากยอดมนุษย์ EC2 หรือ ASG ในหน้าจอ ถ้าหมดเวลาที่ตั้งไว้แต่ดันไม่ได้รับพลุไฟ `cfn-signal` กลับมา มันจะพังกระดานคว่ำกระทะ (Rollback) ลบทิ้งทั้งวังทันที 

---
---

## 📌 คำถามที่ 39
**โจทย์:**
A solutions architect is writing an AWS Lambda function that will process encrypted documents from an Amazon FSx for NetApp ONTAP file system. The documents are protected by an AWS KMS customer key. After processing the documents, the Lambda function will store the results in an S3 bucket with an Amazon S3 Glacier Flexible Retrieval storage class. The solutions architect must ensure that the files can be decrypted by the Lambda function.

Which action accomplishes the requirement?

**ตัวเลือก:**
- [ ] Attach the kms:decrypt permission to the Lambda function’s resource policy. Add a statement to the AWS KMS key’s policy that grants the function’s resource policy ARN the kms:decrypt permission.
- [ ] Attach the kms:decrypt permission to the Lambda function’s resource policy. Add a statement to the AWS KMS key’s policy that grants the function’s execution role the kms:decrypt permission.
- [x] Attach the kms:decrypt permission to the Lambda function’s execution role. Add a statement to the AWS KMS key’s policy that grants the function’s execution role the kms:decrypt permission.
- [ ] Attach the kms:decrypt permission to the Lambda function’s execution role. Add a statement to the AWS KMS key’s policy that grants the function’s ARN the kms:decrypt permission.

---
### 🎯 โจทย์ต้องการอะไร?
เขียนฟังก์ชันสคริปต์ `AWS Lambda` ดำน้ำไปงมอ่านไฟล์ข้อมูลเอกสารที่ "โดนล็อคเข้ารหัสกุญแจ (รหัส AWS KMS)" 
หัวใจสำคัญ: อยากให้สคริปต์แลมบ์ด้านี้ **"สามารถไขแม่กุญแจถอดรหัสอ่านไฟล์ได้จริง (files can be decrypted by the Lambda function)"** 
คำถาม: ท่าตั้งค่า 2 ทางที่ถูกต้องเพื่อเบิกทางสิทธิ์ถอดรหัสผ่าน KMS key ให้แลมบ์ด้า คือท่าไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การอนุญาตให้คนใช้ฟังก์ชันแลมบ์ด้าทำแอคชั่นต่างๆได้ ต้องฝังยันต์อนุญาตเข้าไปใน **`"Lambda function’s execution role"`** (หมวกพนักงานใบหน้าที่มันสวม) เท่านั้น! ห้ามไปแตะฝั่ง resource policy 
- ทริคที่ 2: ฝั่งของกุญแจ AWS KMS Key เอง ก็ต้องอ้าแขนรับใครสักคนเข้ามาไข... ซึ่งในนโยบายลูกกุญแจใบนี้มันรู้จักแต่คนที่ใส่หมวกพนักงาน หรือ **`"execution role"`** เหมือนกัน (ไม่อ่านสิทธิฟังก์ชันตรงๆ)
- สรุป: ตอบข้อที่แปะคำว่า **`"execution role"`** เรียงกันทั้ง 2 ส่วน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Attach the kms:decrypt... to the Lambda function’s execution role. Add a statement to the AWS KMS key’s policy that grants the function’s execution role...**
- **ทำไมถึงถูก:** ต่อยอดถูกต้องสุด 1) คุณต้องติดบัตรพนักงานปั้นนโยบายให้หมวกสวมแลมบ์ด้า `(Execution Role)` ให้มีแอคชั่นไปไขกุญแจ(kms:decrypt)ให้เป็นซะก่อน 2) ฝั่งลูกกุญแจ `KMS Key Policy` ก็ต้องอนุญาตสิทธิ์ว่า "อ้าว ไอ้พ่อหนุ่มคนที่สวมหมวก `(Execution Role)` นี้น่ะ เข้ามาแตะตัวฉันได้เลยจ้า" คอมโบเข้าคู่ 

❌ **[ผิด] Attach the kms:decrypt permission to the Lambda function’s resource policy... grants the function’s execution role...**
- **ทำไมถึงผิด:** การโยนสิทธิ์ไขกุญแจไปใส่ที่ `Lambda resource policy` ผิดกฎหมายอย่างแรง! เพราะฟังก์ชัน Resource policy มันระบุว่า "ใครหน้าไหนสามารถหน้าด้านเสกให้ฟังก์ชันนี้ทำงานได้ (who can invoke)?" ไม่เกี่ยวอะไรกับว่าตัวมันเองสิทธิไปทำอะไรเพื่อนบ้านจ้า 

❌ **[ผิด] Attach the kms:decrypt permission to the Lambda function’s execution role... grants the function’s ARN...**
- **ทำไมถึงผิด:** ตอนที่ Lambda บินย่องเบาไปแตะกุญแจ KMS นั้น มันใช้ใบเบิกทางพลังอำนาจยศ `Execution Role` ไปคุย ไม่ได้เดินถือโค้ดบาร์โค้ดตัวเองที่ชื่อ `function’s ARN` เข้าไปเบ่งให้ KMS กุญแจดูตรงๆ แต่อย่างใด 

❌ **[ผิด] Attach the kms:decrypt... to the Lambda function’s resource policy... grants the function’s resource policy ARN...**
- **ทำไมถึงผิด:** เละตุ้มเป๊ะ เละตั้งแต่การไปฝากสิทธิ์ไขกุญแจ (kms:decrypt) ไว้กระเป๋ากลวงของ Resource policy ที่แสนจะไร้ประโยชน์ในเคสนี้แล้ว แถมไปโยกฝั่งกุญแจให้เชื่อใจ Resource Policy ARN ไก่กาอีก 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Execution Role (IAM)**: หมวกทำงานชั่วคราวของบรรดาเซอร์วิส (เช่น EC2, Lambda) ให้มีพลังเวทย์บินไปสั่งการอ่าน/เขียนของกะละมังเพื่อนๆ (S3, DynamoDB, KMS) ได้

---
---

## 📌 คำถามที่ 40
**โจทย์:**
A solutions architect is managing an application that runs on a Windows EC2 instance with an attached Amazon FSx for Windows File Server. To save cost, management has decided to stop the instance during off-hours and restart it only when needed. It has been observed that the application takes several minutes to become fully operational which impacts productivity.

How can the solutions architect speed up the instance’s loading time without driving the cost up?

**ตัวเลือก:**
- [ ] Migrate the application to a Linux-based EC2 instance.
- [ ] Enable the hibernation mode on the EC2 instance.
- [x] Migrate the application to an EC2 instance with hibernation enabled.
- [ ] Disable the Instance Metadata Service to reduce the things that need to be loaded at startup.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งประหยัดแอร์: เลิกงานปิดสวิตช์เครื่อง (Windows EC2) ดึกๆ หิวค่อยกดเปิดใหม่ 
ปัญหาคือพอกดรีเครื่องใหม่ทีไร **"เสียเวลารอบู๊ทนานมาก (takes several minutes...)"** กว่าแอปหน้าจอจะเด้งสมบูรณ์พร้อม พนักงานนอนหลับน้ำลายยืดกันหมด 
คำถาม: ทรงแบกภาระนี้ สถาปนิกปั้นระบบจะช่วยเร่งสปีดเครื่องติดไฟ **โหลดเร็วสุดขีด (speed up the loading time)** โดยไม่เพิ่มตังค์ได้ยังไง ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: "ปิดเครื่องแปปนึง แต่ตอนตื่นมาไม่อยากเริ่มวินโดว์ใหม่ อยากให้หน้าจอค้างอยู่ที่เดิมเป๊ะ" = ฟีเจอร์จำศีลเครื่องกักความจำ หรือ **`Hibernation mode`** ตอบโจทย์ที่สุดครับ ปาฎิหาริย์กึ่มๆ หลับแแปปเดียว
- ทริคที่ 2: จำกฎสุดแสบของ AWS ให้ดี! "โหมดกักจำศีล (Hibernation) ไม่สามารถตั้งทีหลังได้" **คุณต้องตั้งค่านี้ตั้งแต่แผงเกิดตอนสั่งสร้างเครื่อง (at launch) เท่านั้น**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Migrate the application to an EC2 instance with hibernation enabled.**
- **ทำไมถึงถูก:** เมื่อมันรังสรรค์ฟีเจอร์จำศีลทีหลังไม่ได้ คุณก็แค่ก๊อปปี้แอปแล้ว **โยกย้าย (Migrate)** ไปใส่ลงในเครื่องตัวใหม่กริ๊บ ที่บรรจงคลิกเปิดโหมด **Hibernation enabled** ตั้งแต่วินาทีแรกที่คลอด แล้วเวลาเครื่องหลับ มันจะแช่แข็งโปรแกรมและ RAM ปัจจุบันทิ้งลงฮาร์ดดิสก์ให้รวดเร็ว ตื่นมาปุ๊บก็พร้อมเล่นต่อได้ไวปรื๋อ

❌ **[ผิด] Enable the hibernation mode on the EC2 instance.**
- **ทำไมถึงผิด:** พลิกเกมโชติช่วง! เครื่องที่มีชีวิตรันตูดฉีกอยู่แล้ว คุณไม่สามารถกดร่ายมนต์สคริปต์เสกสร้างปุ่ม `Enable hibernation mode` แทรกไปที่หน้าเครื่องเดิมได้นะจ๊ะ (นี่มันกติกาโหดร้ายลิขิตมาให้ผิดเห็นๆ)

❌ **[ผิด] Migrate the application to a Linux-based EC2 instance.**
- **ทำไมถึงผิด:** หาเรื่องแท้ๆ การหนีจากสภาพแวดล้อม Windows ไป Linux อาจทำให้แอปพลิเคชันพังเปิดไม่ติดได้เลยด้วยซ้ำ เพราะสคริปต์เก่าตายกะทันหัน และมันก็ไม่ได้การรันตีด้วยว่ามันจะโหลดเร็วปรี๊ดขึ้นมาตอนบู๊ท

❌ **[ผิด] Disable the Instance Metadata Service to reduce the things that need to be loaded at startup.**
- **ทำไมถึงผิด:** การปิดช่องดูป้ายข้อมูลตัวเอง Metadata Service (เช่นถามเบอร์ไอพีตัวเอง) มันไม่ได้ช่วยกวาดขยะรกๆ ที่เป็นภาระเครื่องบู๊ทให้เบาขึ้นได้สักเศษเสี้ยวเดียว ไม่ส่งผลกับสปีดเลยครับ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **EC2 Hibernation**: เวทมนตร์สั่งหยุดเครื่องแช่แข็ง ข้อมูลที่แบกไว้ใน RAM ทั้งหมดจะไหลทะลักไปจดลงที่ Root EBS Volume หนาๆแทน เวลาเปิดเครื่องมันก็จะปั๊มข้อมูลเดิมเหล่านี้ขึ้นมาเสียบ RAM ทันตาเห็น 
- 💸 *เรื่องค่าตังค์*: ขณะแช่แข็งหลับ (hibernate) ก็ประหยัดได้บานเบอะโดยจ่ายเพียงเศษบาทค่าเช่าก้อนฮาร์ดดิสก์ EBS ไม่เสียค่าเช่าเครื่องเปลืองๆ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 9: ข้อ 41 - 45)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 41
**โจทย์:**
A company has clients all across the globe that access product files stored in several Amazon S3 buckets, which are behind each of the respective Amazon CloudFront web distributions. The company currently wants to deliver content to a specific client, ensuring that only that client can access the data. At present, all clients can access the S3 buckets directly using an S3 URL or through the CloudFront distribution. The Solutions Architect must serve the private content via CloudFront only, to secure the distribution of files.

Which combination of actions should the Architect implement to meet the above requirements? (Select TWO.)

**ตัวเลือก:**
- [ ] Enable the Origin Shield feature of the CloudFront distribution to protect the files from unauthorized access.
- [x] Require the users to access the private content by using special CloudFront signed URLs or signed cookies.
- [x] Restrict access to files in the origin by creating an origin access control (OAC) and giving it permission to read the files in the bucket.
- [ ] Generate an S3 presigned URL to ensure that only the client can access the files. Remove permission to use S3 URLs to read the files for anyone else.
- [ ] Create a custom CloudFront function to check and ensure that only their clients can access the files.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทแจกจ่ายไฟล์ให้ลูกค้าทั่วโลกผ่านถัง S3 โดยมีประตูหน้าบ้านคือ `Amazon CloudFront`
เป้าหมายด่วน!: อยากจะส่งไฟล์เอกสารลับ **"ให้แค่ลูกค้าวีไอพีคนพิเศษคนเดียวโหลดได้เท่านั้น (only that client can access)"** 
และกฎเหล็กอีกข้อ: **"บังคับให้ทุกคนต้องโหลดไฟล์ผ่านประตูด้านหน้า (CloudFront only)"** ห้ามตุกติกแอบหยิบลิงก์ตรงของ S3 URL ไปโหลดหลังบ้านเด็ดขาด!
คำถาม: ท่าตั้งค่าลิขิตกฎรัดกุม 2 ข้อ คือสูตรมัดรวมอันไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: บังคับให้แขกเข้าเว็บบริษัทโหลดไฟล์ผ่านหน้าด่าน CloudFront "เท่านั้น" (ห้ามแอบมุดโหลด S3 หลังบ้าน) = ต้องจับยามเฝ้าประตูที่ชื่อป้าย **`Origin Access Control (OAC)`** ไปสิงอยู่ที่ S3 
- ทริคที่ 2: แจกตั๋วหนังส่วนตัวให้ลูกค้าสเปิร์มวีไอพีคนเดียวดู (Private Content) = ต้องเสกตั๋วที่เข้ารหัสวันหมดอายุและล็อคตัวบุคคล นั่นคือ **`CloudFront signed URLs หรือ signed cookies`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Restrict access to files in the origin by creating an origin access control (OAC)...**
- **ทำไมถึงถูก:** เคลียร์ซะที! คุณตั้ง `OAC (สมัยก่อนเรียก OAI)` ขึ้นมาเป็นยามเฝ้าถัง S3 เพื่อตวาดใส่ลูกบ้านทุกคนว่า "ใครที่หยิบลิงก์ S3 ของชั้นตรงๆ จะเข้าไม้ได้เด็ดขาด! ยกเว้นเจ้านาย CloudFront เท่านั้นที่มีสิทธิ์หยิบของออกจากถังนี้ไปแจกได้จ้า" (แก้ปัญหาห้ามโหลด S3 URL)

✅ **[ถูกต้อง] Require the users to access the private content by using special CloudFront signed URLs or signed cookies.**
- **ทำไมถึงถูก:** ตั๋วหนังวีไอพีเสกมาเพื่อสิ่งนี้! พอฝากชีวิตไว้หน้าด่าน CloudFront แล้ว คุณก็สามารถเขียนโค้ดเจเนอเรตลิงก์วิเศษ `(Signed URL)` แบบมีวันหมดอายุ หรือแจกคุกกี้อมตะ `(Signed Cookie)` ให้เฉพาะไอดีลูกค้าคนนั้นเอาไปโหลดไฟล์ส่วนตัวได้รัวๆ แจ่มแมว!

❌ **[ผิด] Generate an S3 presigned URL to ensure that only the client can access the files. Remove permission to use S3 URLs...**
- **ทำไมถึงผิด:** แหม... โดนโจทย์ตบหน้ามาหมาดๆ ว่าให้ใช้ทางผ่าน "via CloudFront only" แต่เจือกมาหนีปัดความรับผิดชอบไปสร้างตั๋วที่ฝั่ง S3 (S3 presigned URL) ตรงๆ ซึ่งมันใช้งานข้ามระบบไม่ได้ตามข้อบังคับจ้า แถมตั้งค่ายุ่งยากกว่ามากเวลาลูกค้ามีไฟล์ตั้งล้านไฟล์ 

❌ **[ผิด] Create a custom CloudFront function to check and ensure that only their clients can access the files.**
- **ทำไมถึงผิด:** ฮ่วย! ถึงแม้ `CloudFront Function` จะรันสคริปต์สแกนเปลี่ยนชื่อไฟล์ได้จี๊ดจ๊าดไวทะลุเพดาน แต่มันไม่รัดกุมพอจะมานั่งทำระบบรักษาความปลอดภัยดักจับล็อกอินตรวจสิทธิ์ลูกค้าทีละคนหรอกนะ 

❌ **[ผิด] Enable the Origin Shield feature of the CloudFront distribution to protect the files from unauthorized access.**
- **ทำไมถึงผิด:** หลอกชื่อเนี่ยนๆ `Origin Shield` มันไม่ใช่โล่กัปตันอเมริกาเอาไว้กันพวกแฮกเกอร์(Secure) แต่มันคือ "โล่กันโหลดเว็บรัวๆทับเซิร์ฟเวอร์จนเจ๊ง(Cache)" ช่วยแบ่งเบาภาระต้นทาง (S3/EC2) เฉยๆ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **OAC (Origin Access Control)**: เปลี่ยน S3 จากของสาธารณะ ให้เป็นของหลังบ้านที่ CloudFront เข้าไปหยิบได้ที่เดียว (อัพสเปคจาก OAI รุ่นเก่า)
- **CloudFront Signed URLs vs Signed Cookies**: 
  - URL = โหลดไฟล์ตั๋วใบเดียว/สิทธิรายอัน
  - Cookie = ให้เหมาจ่ายตั๋วพรีเมี่ยม ดูหนังเรทหรูได้ทุกเรื่อง (ได้ไฟล์รัวๆ)

---
---

## 📌 คำถามที่ 42
**โจทย์:**
Due to the large volume of query requests, the database performance of an online reporting application significantly slowed down. The Solutions Architect is trying to convince her client to use Amazon RDS Read Replica for their application instead of setting up a Multi-AZ Deployments configuration.

What are two benefits of using Read Replicas over Multi-AZ that the Architect should point out? (Select TWO.)

**ตัวเลือก:**
- [x] It elastically scales out beyond the capacity constraints of a single DB instance for read-heavy database workloads.
- [x] Provides asynchronous replication and improves the performance of the primary database by taking read-heavy database workloads from it.
- [ ] It enhances the read performance of your primary database by increasing its IOPS and accelerates its query processing via AWS Global Accelerator.
- [ ] Provides synchronous replication and automatic failover in the case of Availability Zone service failures.
- [ ] Allows both read and write operations on the read replica to complement the primary database.

---
### 🎯 โจทย์ต้องการอะไร?
ระบบหน้าเว็บโดนพลังมังกรยิงคิวรี่ (query requests) หาข้อมูลสถิติรายงานถล่มทลายจนเซิร์ฟเวอร์ฐานข้อมูลหอบแฮ่ก
สถาปนิกเลยปั้นฝัน กล่อมเจ้านายให้ซื้อบริการ **"Amazon RDS Read Replica"** มาปราบมาร แทนที่จะไปใช้ฟังก์ชันเครื่องสำรองหนีตาย (Multi-AZ) 
คำถาม: งัดไม้ตาย **ประโยชน์ 2 ข้อ (benefits)** ของการใช้ Read Replica ที่เหนือกว่า Multi-AZ ออกมาโชว์บอร์ดให้เจ้านายฟังซิ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หน้าที่ศักดิ์สิทธิ์หนึ่งเดียวของ **Read Replica** คือ **`"ช่วยสเกลขยายเครื่องไว้อ่านข้อมูลประทังชีวิต (scales out/read-heavy workloads)"`** ลดภาระเครื่องแม่!
- ทริคที่ 2: จำลึกสลักเข้าโสตประสาท! 
  - Read Replica = วิ่งก๊อปปี้ส่งของให้เพื่อนแบบหลวมๆขี้เกียจ **`Asynchronous replication` (ใช้ลดภาระอ่าน)`** 
  - Multi-AZ = ขยันก๊อปปี้แนบชิดรอยต่อรอยเงา **`Synchronous replication` (ใช้ดึงสายปลั๊กสลับชุบชีวิตเครื่องล่ม Auto Failover)`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] It elastically scales out beyond the capacity constraints of a single DB instance for read-heavy database workloads.**
- **ทำไมถึงถูก:** โชว์ตารางสเกลทันที! คุณสามารถเสกร่างโคลนเครื่อง Read Replica แยกตัวออกมาเผชิญหน้าให้แอปฯ สูบขีดจำกัดการโหลดอ่านสถิติ (read-heavy) ได้บานเบอะ สูบจนเครื่องออริจินัลไม่ต้องทำงานหนักคนเดียวได้สบาย

✅ **[ถูกต้อง] Provides asynchronous replication and improves the performance of the primary database by taking read-heavy database workloads from it.**
- **ทำไมถึงถูก:** พระเอกสุดๆ ระบบอัปเดตข้อมูลแบบพักหายใจ `Asynchronous` ส่งผลให้ฐานข้อมูลหลัก (Primary) ไม่ต้องหน้าซีดรอซิงค์เป๊ะๆ 100% ทำให้เครื่องหลักเอาเรี่ยวแรงไปเทหน้าตักรับโหลดหนักๆ แทน เครื่องลูกก็ทำหน้าที่แจกจ่ายไฟล์สถิติให้อย่างฉ่ำใจ

❌ **[ผิด] Provides synchronous replication and automatic failover in the case of Availability Zone service failures.**
- **ทำไมถึงผิด:** เอ้าาา! นั่นมันประโยคหากินคู่บุญของฟีเจอร์กันตายบอมบ์ `Multi-AZ` ต่างหากล่ะวะ! (ข้อมูลเรียลไทม์เป๊ะแถมพกไม้กายสิทธิ์หลบซ่อนเซิร์ฟพังอัตโนมัติ) ไม่ใช่ Read Replica

❌ **[ผิด] Allows both read and write operations on the read replica to complement the primary database.**
- **ทำไมถึงผิด:** ผิดกฎวงการ! เครื่อง Read Replica หรือภาษาไทยคือ "ร่างทรงโคลนนิ่งที่เกิดมาให้อ่านได้อย่างเดียว" คุณไม่สามารถกดเขียนไขข้อมูล (write operations) เข้าเครื่องมันตรงๆได้ (ต้องอ้อนเครื่องแม่อย่างเดียว) 

❌ **[ผิด] It enhances the read performance of your primary database by increasing its IOPS and accelerates its query processing via AWS Global Accelerator.**
- **ทำไมถึงผิด:** ขี้โม้อีกแล้ว! Read Replica ไม่ได้อัปเกรดยัดสเตียรอยด์ (IOPS) ใส่เครื่องแม่เดิมให้แรงขึ้นนะ มันแค่ปั๊มเครื่องใหม่มารับภาระแทน แถมตัวที่เชื่อมโลกให้เร็วปรู๊ดปร๊าด `AWS Global Accelerator` ก็เป็นสายมุดเน็ตเวอร์ชั่นทางลัด ไม่ได้เกี่ยวอะไรกับสปีดคิวรี่ฮาร์ดดิสก์ของ RDS ในข้อนี้เลย 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Read Replica (Amazon RDS)**: ท่าลดขยะลดภาระ เหมาะกับระบบรุมดูข้อมูล (สถิติ, รายงาน BI Report) เสกได้เยอะสุดๆ
- **Multi-AZ (Amazon RDS)**: ท่ารอดตายจากสึนามิ ไม่สามารถเอาเครื่องแฝดมาให้อยู่อ่านได้ (มันล่องหน) มีหน้าที่รอเครื่องแม่ดราม่าพัง มันก็จะเสียบแทนตำแหน่งทันที (Auto Failover) 

---
---

## 📌 คำถามที่ 43
**โจทย์:**
An aerospace engineering company recently adopted a hybrid cloud infrastructure with AWS. One of the responsibilities of the Solutions Architect is to launch an Amazon VPC with both public and private subnets for Amazon EC2 instances and database instances. The architecture must ensure each subnet is properly defined within the assigned VPC CIDR block.

Which of the following statements are true regarding VPC subnets? (Select TWO.)

**ตัวเลือก:**
- [ ] EC2 instances in a private subnet can communicate with the Internet only if they have an Elastic IP.
- [ ] The allowed block size in VPC is between a /16 netmask (65,536 IP addresses) and /27 netmask (32 IP addresses).
- [ ] Each subnet spans 2 Availability Zones.
- [x] Each newly created subnet is, by default, linked to the main route table of the VPC.
- [x] Each subnet maps to a single Availability Zone.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทวิศวกรรมการบินเพิ่งอพยพขึ้นคลาวด์ สถาปนิกได้รับใบสั่งให้กางปีกสร้างรัง **Amazon VPC** ที่มีลูกเจี๊ยบห้องหับมากมาย แบ่งเป็นโซนรับแขก (Public) กับโซนหวงห้าม (Private)
คำถาม: ทฤษฎีกติกาบ้านสไตล์มินิมอล **VPC Subnets ของค่าย AWS ประโยคไหนที่เป็นหลักความจริงร้อยเปอร์เซ็นต์ (true) 2 ประการ ???**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กแผ่นสวรรค์! "ห้องเช่า Subnet ของคุณ 1 ตำแหน่ง จะโดนจับตรึงตอกตะปูติดกับพื้น **`ซับเน็ต 1 วง = ขังตายกางอยู่ได้แค่ใน 1 เขตพื้นที่เซิร์ฟเวอร์ (Availability Zone: AZ) เท่านั้น`**" ข้ามประเทศข้ามจังหวัดไม่ได้!
- ทริคที่ 2: ช่างไฟใจดีของ AWS แอบผูกตารางแผนที่นำทาง **`(Main route table)`** ยัดเหยียดมาให้คุณอัตโนมัติ ทันทีที่คุณกรอกสร้างห้อง Subnet แรกเสร็จปุ๊บ (ไม่ต้องเดินสายไฟเองในตอนสร้างวงใหม่) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Each subnet maps to a single Availability Zone.**
- **ทำไมถึงถูก:** ตามเบสิกจ๋า Subnet ก๊วนเดียวต้องกระจุกรวมกันอยู่ในตึกออฟฟิศ/ศูนย์ข้อมูล 1 ตึก (Availability Zone) อย่างเดียวเท่านั้น เลี้อยรัดสปาเก็ตตี้跨กระโดดไปข้ามตึกอื่น (Span AZs) ไม่ได้เด็ดขาด

✅ **[ถูกต้อง] Each newly created subnet is, by default, linked to the main route table of the VPC.**
- **ทำไมถึงถูก:** พอคุณสร้าง Subnet โผล่ปิ๊งขึ้นมารังนึง ระบบ AWS จะแอบจับเส้นทางเดินวงในอัตโนมัติมาผูกมัดกับแผนที่ Main Route Table ให้ก่อนทันที (จนกว่าแกจะเปรี้ยวเดินไปเสก Custom Route Table สร้างเองใหม่)

❌ **[ผิด] Each subnet spans 2 Availability Zones.**
- **ทำไมถึงผิด:** เอ้า! ผิดไปจากข้อถูกสุดกู่ ซับเน็ต 1 วง ขางัดถ่างสเกาท์แครกเกอร์คลุมตึก 2 ตึกพร้อมกัน (Spans 2 AZs) ไม่ได้นะจ๊ะ (ถ้า VPC คลุมทั้งจังหวัดกว้างๆน่ะพอได้ แต่ตัวซับเน็ตเล็กๆเองต้องปักเขตย่อยลงไปเป๊ะๆ) 

❌ **[ผิด] The allowed block size in VPC is between a /16 netmask (65,536 IP addresses) and /27 netmask (32 IP addresses).**
- **ทำไมถึงผิด:** ข้อสอบความจำชัดๆ ตัวเลขไซส์ IP แคบสุดที่ AWS อนุญาตให้ยิบย่อยสร้างห้องซับเน็ตคือ **`/28 netmask (จิ๊บๆ 16 IP)`** นะจ๊ะ ไม่ใช่ /27 ซะหน่อย 

❌ **[ผิด] EC2 instances in a private subnet can communicate with the Internet only if they have an Elastic IP.**
- **ทำไมถึงผิด:** เห้ย กติกาโซนไข่แดงลูกคุณหนู (Private Subnet) คือ "ห้ามมีรอยสัก IP สาธารณะ/Elastic IP แปะตรงหน้าผากมันเด็ดขาด!" ไม่งั้นใครก็ล้วงเจอสิ ถ้าลูกคุณหนูอยากจะมุดรูแอบดูหนังฝรั่งนอกบ้าน ต้องต่อท่อลอดใต้ดิน `NAT Gateway` หรือ `NAT Instance` กระโดดออกไปสูบเน็ตแทนจ้า (ไม่ใช่เสก IP แจกลงเครื่องดื้อๆ)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **VPC Subnets Principles (หลักการจำให้ขึ้นใจ)**:
  - 1 VPC = คลุมแผ่วงกลมใหญ่หลาย AZs
  - 1 Subnet = ขังกรอบเล็กๆ ยัดอยู่แค่ใน 1 AZ เท่านั้น!! 

---
---

## 📌 คำถามที่ 44
**โจทย์:**
A travel company has a suite of web applications hosted in an Auto Scaling group of On-Demand EC2 instances behind an Application Load Balancer that handles traffic from various web domains such as i-love-manila.com, i-love-boracay.com, i-love-cebu.com and many others. To improve security and lessen the overall cost, you are instructed to secure the system by allowing multiple domains to serve SSL traffic without the need to reauthenticate and reprovision your certificate everytime you add a new domain. This migration from HTTP to HTTPS will help improve their SEO and Google search ranking.

Which of the following is the most cost-effective solution to meet the above requirement?

**ตัวเลือก:**
- [ ] Add a Subject Alternative Name (SAN) for each additional domain to your certificate.
- [ ] Create a new CloudFront web distribution and configure it to serve HTTPS requests using dedicated IP addresses in order to associate your alternate domain names with a dedicated IP address in each CloudFront edge location.
- [x] Upload all SSL certificates of the domains in the ALB using the console and bind multiple certificates to the same secure listener on your load balancer. ALB will automatically choose the optimal TLS certificate for each client using Server Name Indication (SNI).
- [ ] Use a wildcard certificate to handle multiple sub-domains and different domains.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัททัวร์เหมาโหลดเซิร์ฟเวอร์รอยยิ้มปะทะแขกด้วยหน้าด่าน `Application Load Balancer (ALB)` 
มีเว็บขายทัวร์ร้อยเกาะ (เช่น i-love-manila.com, i-love-cebu.com ชื่อต่างกันหมดเลย) 
ต้องการอัปสถานะจาก HTTP กระจอกๆ เป็น **HTTPS (SSL/TLS กุญแจสีเขียว)** ให้ดูแพงๆ เพื่อเปย์คะแนน Google SEO!
เงื่อนไขหัวใจสำคัญ: **"อยากเปิดใบเซอร์ SSL หลายๆใบใน ALB โดยขี้เกียจไปอัปใบจดทะเบียนใหม่ทุกครั้งที่ซื้อโดเมนเกาะใหม่เพิ่ม"** 
และ **"ต้องท่าที่ประหยัดเงินที่สุด (cost-effective)"** 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอเทวดาโหลดบาลานซ์หน้าบ้าน (ALB) แล้วมีโจทย์ปาชื่อโดเมนร้อยพ่อพันแม่ (Multiple domains) มาให้มันรับ... ทางออกวิเศษเบอร์แรกสุดและประหยัดฟรีๆ คือให้ ALB ใช้ตาข่ายจับแยกกุญแจ SSL ที่ชื่อว่า **`Server Name Indication (SNI)`** 
- ทริคที่ 2: ระบบ `SNI (Server Name Indication)` มันจะเอากุญแจใบเซอร์นับแสนใบของเราไปผูกกับ Listener ตัวเดียวได้เลย แขกเข้าเว็บเกาะไหนมา มันก็จ่ายแจกใบเขียวคืนถูกโดเมนเป๊ะ ไม่ต้องทำตัวเหมาโหลเสียตังค์ตั้งใหม่แต่อย่างใด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Upload all SSL certificates of the domains in the ALB... bind multiple certificates to the same secure listener... using Server Name Indication (SNI).**
- **ทำไมถึงถูก:** สวยงามตามตำราเป๊ะ! เราจับโยนเอาใบเซอร์ย่อยๆ จิปาถะยัดลงไปในกล่อง Load Balancer ทีเดียวจบ แล้วเปิดออปชั่นชี้ทางสวรรค์ `Server Name Indication (SNI)` (ฟีเจอร์นี้แถมฟรีบน ALB จ้า) เมื่อคนขอเว็บเซบู (Cebu) ไอ้ต้าว SNI มันก็จะสับรางล้วงใบเซอร์เซบูปกเขียวไปจ่ายแจกให้หน้าเว็บแบบพอดีเป๊ะ ตอบโจทย์ง่ายๆ ได้ใจความเลย

❌ **[ผิด] Use a wildcard certificate to handle multiple sub-domains and different domains.**
- **ทำไมถึงผิด:** เอ๊าะ! `ใบเซอร์ไวลด์การ์ด (Wildcard *: *.mario.com)` มันเป็นลูกเศรษฐีที่สืบทอดบัลลังก์ได้เฉพาะกับคนหนามตระกูลเดียวกันเท่านั้น (Sub-domains) เช่น shop.mario.com, pay.mario.com...แต่มันเอาไปขึงกางโดเมนคนละขั้วแบบจอมปลอมอย่าง i-love-manila กะ i-love-cebu รวบหัวรวบหางไม่ได้จ้า

❌ **[ผิด] Add a Subject Alternative Name (SAN) for each additional domain to your certificate.**
- **ทำไมถึงผิด:** ขัดกับเจตนารมณ์ขี้เกียจของโจทย์! ถ้าเลือกวิธีเผากล่าว `SAN` คุณจะต้องเหนื่อยไป "เปิดระบบแจกบัตรคิว-สกรีนยืนยันกุญแจใหม่ทั้งหมด (reauthenticate and reprovision)" ทุกครั้งที่คุณงอกโดเมนเว็บเกาะใหม่มาเพิ่ม (แต่วงเล็บโจทย์มันบอกไว้ชัดๆว่าไม่อยากทำตัวงี่เง่าแบบนี้นะ!)

❌ **[ผิด] Create a new CloudFront... and configure it to serve HTTPS requests using dedicated IP addresses...**
- **ทำไมถึงผิด:** ใช้ท่านี้บริษัทเจ๊งแน่นอน! การเปิดโหลดหน้าด่าน CloudFront แล้วผลาญเงินประมูลซื้อเต้าจ่ายเน็ตล็อคเป้าส่วนตัว `"dedicated IP addresses"` (สมัยโบราณที่ SNI ยังไม่เกิด) เพื่อยัดใบเซอร์หน้าเว็บนั้น มันกินงบระดับหลักหลายร้อยดอลลาร์/เดือน/IP ซึ่งขัดกับคำว่า "cost-effective (ถูกสุด)" เต็มประตูชัย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **SNI (Server Name Indication)**: พนักงานสับรางขั้นเทพ! ใครที่เอาใบเซอร์ SSL โดเมนต่างขั้วๆ 10 โดเมนมาฝากที่ ALB ... ระบบ SNI จะจำหน้าแล้วแจกคืนใบเขียวให้ถูกต้องเป๊ะ ทำให้คุณเปิดเว็บพอร์ต HTTPS ลิสต์ได้มหาศาลภายใต้ IP เครื่องโหลดตัวเดียว 

---
---

## 📌 คำถามที่ 45
**โจทย์:**
A company is using Amazon VPC that has a CIDR block of 10.31.0.0/27 that is connected to the on-premises data center. There was a requirement to create a Lambda function that will process massive amounts of cryptocurrency transactions every minute and then store the results to EFS. After setting up the serverless architecture and connecting the Lambda function to the VPC, the Solutions Architect noticed an increase in invocation errors with EC2 error types such as EC2ThrottledException at certain times of the day.

Which of the following are the possible causes of this issue? (Select TWO.)

**ตัวเลือก:**
- [ ] The associated security group of your function does not allow outbound connections.
- [x] The Lambda function is placed in a VPC subnet with limited IP address capacity.
- [ ] The attached IAM execution role of your function does not have the necessary permissions to access the resources of your VPC.
- [ ] Your VPC does not have a NAT gateway.
- [x] Your Lambda function exceeds the VPC quota for Elastic Network Interfaces (ENIs) or available IP addresses in the subnet.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเสกบ้านกระต๊อบขนาดจิ๋ว `(VPC CIDR /27 มีไอพีแค่ 32 จุ๋มจิ๋ม)` 
เขียนสคริปต์ `Lambda function` ยัดลงไปในบ้านน้อยหลังนี้ เพื่อประมวลผลเหรียญคริปโต (เทรดเงินหลักล้านรัวๆ ทุบทะลุนาที) แล้วเทขยะใส่ลงดิสก์แชร์ก้อนยักษ์ EFS 
ปัญหาอาการงอแง: ทุกๆช่วงเวลาช็อคไทม์ (certain times of the day) โดนบีบคอร้องกร๊ีด เกิดโควต้าทะลัก Error: **`EC2ThrottledException`** (พังเละเทะ)
คำถาม: หาสาเหตุผีหลอกขวดน้ำว่า **บัคทะลักอันทนงนี้ เกิดจากความซวยอะไร 2 ตอ ???** 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ปกติขุมพลังอภินิหาร `Lambda` สเกลแยกร่างทะลักขยายทัพได้รัวๆ ไม่พึ่งเซิร์ฟเวอร์... แต่โจทย์ดันทะลึ่งลากมันไปแหกตาติดโซ่ตรวนขังไว้ใน **`บ้านจิ๋ว (VPC Subnet เล็กๆ /27 แค่กะเป๊ะเดียว)`**  
- ทริคที่ 2: พอมันแยกร่าง (scale) ข้ามวินาทีเพื่อรับมือปริมาณคลิกมหาศาล มันก็ทะลึ่งร้องหาปั๊มปลั๊กไอพีในบ้าน... ปรากฎว่าสายเบรคแตก **โควต้าแจกบัตรคิว IP ร่อยหรอจนหมดเกลี้ยง หรือตีนตุ๊กแกปลั๊กไฟอย่าง (`ENIs` หมดโควต้า)** มันก็เลยตบด้วย Exception ค่ายก้นขวด EC2ThrottledException ครับ 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The Lambda function is placed in a VPC subnet with limited IP address capacity.**
- **ทำไมถึงถูก:** ต่อยอดปัญหาแรกสุด ในตอนที่อีดิทสคริปต์รับงานโหดๆ ฟังก์ชันมันจะแตกหน่อ(แยกร่าง Scale Out) และการแยกร่างแต่ละทีต้องการ "ไอพี (IP Address)" ส่วนตัวในวงนั้นไปหล่อเลี้ยง... สังเกตโจทย์ให้ซับเน็ตมาก้อนเท่าขี้มด (/27 = 32 IPs) แป๊บเดียวมันก็ทะลักจนสูบไอพีก๊อกแห้ง พังเละ!

✅ **[ถูกต้อง] Your Lambda function exceeds the VPC quota for Elastic Network Interfaces (ENIs) or available IP addresses in the subnet.**
- **ทำไมถึงถูก:** เหตุผลคล้ายข้อบน แลมบ์ด้าต้องผูกขาตัวเองเข้าท่อน้ำสายชาร์จ `(ENIs)` เพื่อที่จะเสี่ยงภัยแอบวิ่งเข้าห้องรับแขก VPC ในวงแคบ... เมื่อโควต้าระบบ ENI (เครือข่ายแลน) แจกฟรีดันสูบหมดหน้าตัก ควาญช้างก็บีบคอรับโหลดคริปโตทะลักไม่ไหว แตกโบ๊ะ! 

❌ **[ผิด] Your VPC does not have a NAT gateway.**
- **ทำไมถึงผิด:** ใช่แล้ว NAT Gateway ต่อเน็ตภายนอกก็จริง แต่โจทย์บอกว่ามันไปลงถัง "EFS" ในบ้าน VPC ตัวเอง ไม่ได้ลอว์ลิงค์ออกดูหนังฝรั่งนอกบ้านสักหน่อย แถมโจทย์บอกว่าบัคนี้ผุดขึ้นมา "เฉพาะเวลางานหยาบ(เร่งด่วน)" ไม่ได้เจ๊งค้างเปิดเน็ตไม่ติดทั้งวันนะ 

❌ **[ผิด] The associated security group of your function does not allow outbound connections.**
- **ทำไมถึงผิด:** ขาออกประตูยาม `Security group outbound` เจ๊งมันจะร้องบอก "Connection Timeout" เงียบเหงาไปเลย และที่สำคัญถ้ามันตีด่านขาออกไม่ได้ มันจะพังพินาศตั้งแต่บรรทัดแรกของโค้ดเลย "ไม่ได้พังรวนเฉพาะช่วงรถติด (certain times of the day)" หรอกนะ

❌ **[ผิด] The attached IAM execution role of your function does not have the necessary permissions...**
- **ทำไมถึงผิด:** โวยวายผิดตึก! ถ้าแลมบ์ด้านี้ไม่มีสิทธิ์จับขอบกระโปรงของขุมทรัพย์ใน VPC (IAM Permission พัง) การด่าตอบของยามก็คือคำจารึกบัค `AccessDeniedException (เข้าขไม่ได้โว้ย)` ไม่เกี่ยวอะไรกับติ้วคอขวด Throttling บีบคอเลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Lambda running inside VPC**: กฎข้อระวังที่ฮิตบรรลัย! ถ้าคุณจะจับสายชาร์จแลมบ์ด้าลากเข้าไปเสียบตูดทำพิธีในเครื่อง VPC คุณต้องเผื่อใจสร้างห้องน้ำวงไพ่ **(Subnet ID) ที่มีไอพี (IP Address) จำนวนเหลือบานเบอะพอรองรับ** ไว้เสมอ ไม่งั้นโดนติ้ว Throttling ดับสยองตอนคิวงานเยอะๆแน่นอน

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 10: ข้อ 46 - 50)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 46
**โจทย์:**
A company deployed a high-performance computing (HPC) cluster that spans multiple Amazon EC2 instances across multiple Availability Zones and processes various wind simulation models. Currently, the Solutions Architect is experiencing a slowdown in their applications and upon further investigation, it was discovered that it was due to latency issues.

Which is the MOST suitable solution that the Solutions Architect should implement to provide low-latency network performance necessary for tightly-coupled node-to-node communication of the HPC cluster?

**ตัวเลือก:**
- [ ] Use EC2 Dedicated Instances with elastic inference accelerator
- [ ] Set up a spread placement group across multiple Availability Zones in multiple AWS Regions.
- [ ] Set up AWS Direct Connect connections across multiple Availability Zones for increased bandwidth throughput and more consistent network experience.
- [x] Set up a cluster placement group within a single Availability Zone in the same AWS Region.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทรันระบบประมวลผลก้อนยักษ์ระดับซูเปอร์คอมพิวเตอร์ **"HPC (high-performance computing) cluster"** โยนงานซิมูเลชั่นสายลมข้ามตึกไปมา
ปัญหา: แอปฯ กระตุกหน่วงมาก สืบแล้วพบว่าเกิดจาก **"ค่าความหน่วงของเครือข่ายสูง (latency issues)"** ที่เกิดจากการลากสายคุยกันข้ามตึกข้ามโซน
คำถาม: ท่าไม้ตายไหนช่วยจัดระเบียบเครื่องให้คุยกันแบบ **"ไหลลื่นแนบชิด ค่าความหน่วงต่ำปรี๊ด (low-latency network... tightly-coupled)"** สำหรับชาว HPC ได้ดีที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอคีย์เวิร์ดของระบบคำนวณซับซ้อน **`HPC (High-performance computing)`** หรือโจทย์บ่นอยากลดค่า Ping ความหน่วงให้เหลือศูนย์ **`Low-latency / Tightly-coupled`** = นึกถึงกลุ่มจัดวางเซิร์ฟเวอร์แบบเบียดกันแน่นๆ ชื่อ **`"Cluster Placement Group"`** ทันที
- ทริคที่ 2: กฎข้อนึงของ Cluster Placement Group คือ "มันยอมให้เครื่องกองรวมกันเป็นปลากระป๋องได้แค่ใน **ตึกเดียว/โซนเดียว (single Availability Zone)** เท่านั้น" ห้ามแหกคอกข้ามตึก!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a cluster placement group within a single Availability Zone in the same AWS Region.**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาวสไตล์ HPC! `Cluster Placement Group` คือการจับเอาเซิร์ฟเวอร์ทั้งหมดมากองสุมขดตัวอยู่บนตู้แร็คเดียวกันในตึกดียวกัน (Single AZ) ทำให้สัญญาณเน็ตไม่ต้องวิ่งข้ามถนนไปมา ส่งผลให้ค่าความหน่วง (Latency) ลดลงต่ำเตี้ยเรี่ยดิน สัมผัสปุ๊บติดปั๊บดั่งใจสั่ง ตรงสเปคที่สุด

❌ **[ผิด] Set up a spread placement group across multiple Availability Zones in multiple AWS Regions.**
- **ทำไมถึงผิด:** เอ้า! `Spread Placement Group` มันคือการไล่เตะเครื่องแต่ละตัวให้ **"กระจายแยกย้ายกันไปอยู่คนละอำเภอคนละแร็คไฟ"** เพื่อกันตายหมู่ (ถ้าตึกระเบิดจะได้รอดตัวอื่น) ซึ่งการเตะกระจัดกระจายแบบนี้ ยิ่งทำให้เวลาเครื่องมันคุยกันยิ่งหน่วงช้าข้ามทุ่งเข้าไปใหญ่ (แก้ปัญหาโจทย์ผิดแถมทำพังกว่าเดิม)

❌ **[ผิด] Set up AWS Direct Connect connections across multiple Availability Zones...**
- **ทำไมถึงผิด:** `AWS Direct Connect` คือการลากสายไฟเบอร์ส่วนตัวจาก "ออฟฟิศคุณบนโลกมนุษย์ มุดดินไปเสียบที่ AWS" มันไม่เกี่ยวอะไรเลยกับการเร่งความเร็วสื่อสารวงในระหว่างเครื่อง EC2 ด้วยกันเองบนคลาวด์

❌ **[ผิด] Use EC2 Dedicated Instances with elastic inference accelerator**
- **ทำไมถึงผิด:** `Dedicated Instances` เป็นแค่ฟีเจอร์เศรษฐีที่ขอเช่าตู้เหล็กเหมาทั้งแผงไม่ปะปนกับชาวบ้านเฉยๆ และ `elastic inference` ก็เป็นแค่ตัวเร่งประมวลผลการ์ดจอ AI มันไม่ได้ช่วยเรื่องลดเส้นทางสายสปาเก็ตตี้เครือข่ายให้สั้นลง (latency) เลยสักนิด 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Placement Groups 3 รสชาติ**:
  - **Cluster**: อัดปลากระป๋องกองตึกเดียว (เหมาะกับ HPC โคตรคำนวณ/เน็ตแรงปรี๊ด)
  - **Partition**: แบ่งใส่ตะกร้าระดับชั้นย่อยๆ เช่นตระกูล Hadoop 빅ดาต้า
  - **Spread**: เตะแยกกันอยู่คนละจักรวาลตึกย่อยๆ (กันตายหมู่เต็มพิกัด ขีดสุดแค่ 7 เครื่องต่อตึก)

---
---

## 📌 คำถามที่ 47
**โจทย์:**
A company requires that all AWS resources be tagged with a standard naming convention for better access control. The company’s solutions architect must implement a solution that checks for untagged AWS resources.

Which solution requires the least amount of effort to implement?

**ตัวเลือก:**
- [x] Use an AWS Config rule to detect non-compliant tags.
- [ ] Use service control policies (SCP) to detect resources that are not tagged properly.
- [ ] Use tag policies in AWS Organizations to standardize the naming of tags. Store all the tags in an Amazon S3 bucket with the S3 Object Lock feature enabled.
- [ ] Create a Lambda function that runs compliance checks on tagged resources. Schedule the function using Amazon EventBridge (Amazon CloudWatch Events).

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทออกกฎทหาร: "ตั้งแต่นี้ไป ทรัพยากร AWS ทุกอันต้อง **ติดป้ายชื่อ (tagged)** ตามหลักสากลเป๊ะๆ ห้ามมีไอ้ของชิ้นไหนไม่มีป้ายชื่อหลุดรอดไปตะลอนๆ"
คำถาม: สถาปนิกปวดหัว จะใช้วิธีไหนในการตั้งด่านสแกนหาไอ้พวกแหกคอก "ทรัพยากรเถื่อนๆที่ไม่ได้ติดป้าย (checks for untagged resources)" แบบ **"ขี้เกียจที่สุดและเหนื่อยน้อยที่สุด (least amount of effort)"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การตั้งจ่าเฉยคอยเดินสอดส่องสอดแนม (detect / check compliance) ว่าของชิ้นนี้ตั้งค่าผิดระเบียบหรือเปล่า หน้าที่หลักที่ถูกต้องตรงใบสั่งคือระบบตำรวจศาลอย่าง **`AWS Config`**
- ทริคที่ 2: ถ้าโจทย์บอกว่าเอาแบบ "เหนื่อยน้อยสุด ขี้เกียจเขียนโค้ด (least effort/overhead)" ฟันธงเลยว่าให้ใช้ "กฎสำเร็จรูป" หรือ Managed Rule ของ **`AWS Config rule`** ง่ายคลิกเดียวจบ! ไม่ต้องไปเขียน Lambda สคริปต์เองให้เมื่อยตุ้ม

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an AWS Config rule to detect non-compliant tags.**
- **ทำไมถึงถูก:** ไร้ที่ติ! `AWS Config` ถูกสถาปนามาเพื่อสิ่งนี้ มันมีกฎสำเร็จรูป (Managed Rule) ที่ชื่อ `required-tags` รอเปิดใช้อยู่แล้ว แค่คุณคลิกเปิดปุ๊บ มันก็เดินตรวจตราจับขยะเถื่อนที่ไม่มีป้ายชื่อ หรือป้ายชื่อเขียนผิดรหัส มาขึ้นกระดานประจานให้แอดมินดูทันที (ไม่ต้องออกแรงสักแอะ)

❌ **[ผิด] Create a Lambda function that runs compliance checks on tagged resources...**
- **ทำไมถึงผิด:** ใช่แล้ว คุณสามารถเขียนโค้ดสคริปต์สุดขลังยัดใส่ `Lambda` แล้วตั้งนาฬิกาให้มันตื่นมาวิ่งเช็คได้ทุกเช้า...แต่นั่นมัน "โครตเหนื่อย!" สวนทางกับคีย์เวิร์ด least amount of effort ในโจทย์อย่างสิ้นเชิง

❌ **[ผิด] Use tag policies in AWS Organizations... Store all the tags in an Amazon S3 bucket with the S3 Object Lock feature enabled.**
- **ทำไมถึงผิด:** แถสีข้างถลอก! นโยบาย `Tag policies` มันช่วยบังคับการตั้งชื่อให้สะกดถูกต้องก็จริง แต่มัน "ไม่มีพรสวรรค์ชี้เป้าสืบค้นหรอกนะว่าของเก่าชิ้นไหนที่ไม่มีป้าย (detect non-compliant)" และไอ้การเอนโค้ดฝังล็อคใส่คลังแสง `S3 Object Lock` ก็ไม่ได้มีสาระอะไรเกี่ยวกับการแก้ปัญหานี้เลย ยำมั่วไปหมด

❌ **[ผิด] Use service control policies (SCP) to detect resources that are not tagged properly.**
- **ทำไมถึงผิด:** เอดเดอร์แมน `SCP` มีหน้าที่เป็นศาลเจ้ากางม่านพลัง "ห้ามทำนู่นนี่นั่น" (Guardrails) แก่ลูกบัญชี แต่ตัวมันไม่ได้มีสายตาเรดาร์คอยไปไล่เพ่งว่าไอเทมชิ้นนั้นชิ้นนี้ไม่มีป้ายห้อยคอซะหน่อยนะ (SCP สแกนตรวจหาบัคขยะแบบนี้ไม่ได้)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Config**: กล้องวงจรปิด/ตำรวจตรวจระเบียบ บันทึกทุกซอกทุกมุมของการเปลี่ยนแปลง ใครแอบเปลี่ยนขนาดเครื่อง หรือแอบลบป้ายชื่อ มันบันทึกลงสมุดแดง (Compliance) ฟ้องทันที

---
---

## 📌 คำถามที่ 48
**โจทย์:**
A company is hosting an application on EC2 instances that regularly pushes and fetches data in Amazon S3. Due to a change in compliance, the instances need to be moved on a private subnet. Along with this change, the company wants to lower the data transfer costs by configuring its AWS resources.

How can this be accomplished in the MOST cost-efficient manner?

**ตัวเลือก:**
- [x] Create an Amazon S3 gateway endpoint to enable a connection between the instances and Amazon S3.
- [ ] Set up an AWS Transit Gateway to access Amazon S3.
- [ ] Set up a NAT Gateway in the public subnet to connect to Amazon S3.
- [ ] Create an Amazon S3 interface endpoint to enable a connection between the instances and Amazon S3.

---
### 🎯 โจทย์ต้องการอะไร?
เครื่องเซิร์ฟเวอร์โดนสั่งย้ายอับเปหิเข้าไปอยู่ในมุมมืดโซนปิดตาย **"Private Subnet (เข้าเน็ตออโต้ไม่ได้หลุดจากโลกภายนอก)"**
แต่ปัญหากลับกลายเป็น: นังเครื่องพวกนี้ดันมีความจำเป็นต้องมุดสายไปคุยรับส่งข้อมูลกับ **Amazon S3** เป็นกิจวัตร 
คำถาม: ท่าเชื่อมท่อใต้ดินให้เครื่องโลกมืดคุยกับสวรรค์ S3 ได้ โดยที่ **"ประหยัดต้นทุนค่าดูดข้อมูลที่สุด (MOST cost-efficient)"** คือท่าพระปฐมเจดีย์ไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การอนุญาตให้ลูกหลงในกรอบกรง (Private Subnet) สามารถวิ่งเข้าหาเซอร์วิส S3 หรือ DynamoDB ได้โดยไม่ต้องเสียตังค์เปิดท่อต่ออินเตอร์เน็ตทั่วไป ท่าบังคับสูตรโกงมาตรฐานคือการทะลวงท่อผีที่เรียกว่า **`VPC Endpoint`** 
- ทริคที่ 2: VPC Endpoint สายนรกนี้ มี 2 หน้าตาคือ Gateway กับ Interface... แต่ถ้าโจทย์พูดถึง "S3 หรือ DynamoDB" ปั๊บ... ท่าที่ฉีกกฎ **`ลดต้นทุนสุดๆ (cost-efficient) และได้ฟรีเปล่าๆไม่ต้องเสียค่าเช่ารายชั่วโมงเลย`** คือ **`"Gateway Endpoint"`** (จำกฎฟรีนี้ให้ขึ้นใจ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon S3 gateway endpoint to enable a connection between the instances and Amazon S3.**
- **ทำไมถึงถูก:** โคตรเพอร์เฟค! ตัว `Gateway Endpoint` คือประตูมิติโดเรม่อนที่ทาง AWS เปิดให้ใช้ **ฟรีๆ! ไม่มีค่าเช่ารายชั่วโมง** แค่ลากเส้นพิกัดบอก Route Table ยัดไว้ แค่นี้เครื่องกบในกะลาก็จะมุดโผล่ทะเล S3 ได้แบบไม่เสียค่าเน็ตส่วนเกินสักบาท! ประหยัดกว่านี้ก็บวชแล้ว

❌ **[ผิด] Create an Amazon S3 interface endpoint to enable a connection between the instances and Amazon S3.**
- **ทำไมถึงผิด:** ใช่แล้วคุณใช้ `Interface endpoint` รันเชื่อมท่อเข้า S3 ได้สบายเหมือนกัน และแถมพ่นไอพีพิกัดได้ดุดันกว่าด้วย แต่ข้อเสียมหาแรงคือ... ท่านี้ AWS มัน "เก็บตังค์ค่าเช่ารายชั่วโมงยับๆ แถมสูบตังค์ค่าวิ่งข้อมูล Data Processing เพิ่มอีก" (ผิดคอนเซปต์คนจน MOST cost-efficient บาดเจ็บสาหัส)

❌ **[ผิด] Set up a NAT Gateway in the public subnet to connect to Amazon S3.**
- **ทำไมถึงผิด:** ท่าช่างไฟฝึกหัด การตั้งรูต่อเน็ตอย่าง `NAT Gateway` เพื่อให้เครื่องในตู้มุดออกทางสว่างไปหา S3 ได้นั้นมันทำได้จริง...แต่มันโคตรแพง! NAT Gateway เก็บค่าโง่รายชั่วโมงแถมเก็บค่าวิ่งดูดข้อมูลข้ามเน็ต (Data Transfer) แพงมหาโหด (สอบตกงบประหยัดทันที)

❌ **[ผิด] Set up an AWS Transit Gateway to access Amazon S3.**
- **ทำไมถึงผิด:** เล่นใหญ่รัชดาลัยเธียร์เตอร์! ฮับอวกาศ `Transit Gateway` เค้ามีไว้เสียบปลั๊กรวมญาติระหว่าง VPC หมื่นวงกับโลกออฟฟิศ ไม่ได้เอาไว้มาแก้ท่อส้วมกระจอกๆ ต่อสายเข้า S3 วงเดียวแบบนี้จ้า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **VPC Endpoints สู่สวรรค์ (ของฟรีมีในโลก)**:
  - **Gateway Endpoint**: ใช้ได้แค่กับ **S3** และ **DynamoDB** เท่านั้น!! (และ **ฟรีค่าเช่า 100%**)
  - **Interface Endpoint**: บริการอื่นๆ ที่เหลือบนโลก AWS (และต้องเสียค่าเช่าชั่วโมง + ค่าชาร์จวิ่ง Data)

---
---

## 📌 คำถามที่ 49
**โจทย์:**
A FinTech startup deployed an application on an Amazon EC2 instance with attached Instance Store volumes and an Elastic IP address. The server is only accessed from 8 AM to 6 PM and can be stopped from 6 PM to 8 AM for cost efficiency using Lambda with the script that automates this based on tags.

Which of the following will occur when the EC2 instance is stopped and started? (Select TWO.)

**ตัวเลือก:**
- [x] All data on the attached instance-store devices will be lost.
- [x] The underlying host for the instance is possibly changed.
- [ ] The Elastic IP address is disassociated with the instance.
- [ ] The ENI (Elastic Network Interface) is detached.
- [ ] There will be no changes.

---
### 🎯 โจทย์ต้องการอะไร?
ฟินเทคสุดฮิป เช่าเครื่อง EC2 แบบพิเศษมา โดยสั่งเอาออปชั่นแถมดิสก์ความเร็วแสงฝังบอร์ดที่ชื่อ **`Instance Store volumes`** ห้อยติดมาด้วย แถมเอาหน้าไปแปะป้ายทะเบียนจดแปร **`Elastic IP`** ไว้ให้เท่ๆ
ทุกๆเย็น 6 โมง จะตั้งสคริปต์เวทมนตร์ให้มันปิดเครื่อง (stopped) แล้วเช้า 8 โมงปลุกมาวิ่งคึกๆ (started) แบบอัตโนมัติ
คำถาม: ทันทีที่คุณกดปุ่มหยุด (Stopped) และเพลย์ (Started) ปุ๊บ... **ปรากฎการณ์วุ่นวายอะไร 2 อย่างที่จะบรรลัยเกิดขึ้น (will occur) แบบหลีกเลี่ยงไม่ได้ ???**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ดิสก์ขยะทองคำ **`Instance Store`** คือฮาร์ดดิสก์ RAM ที่ฝังติดอยู่กับเครื่องเหล็กบนโลกความจริง "ถ้าคุณแค่หน้าด้านกดหยุดเครื่อง (Stop) ปุ๊บ AWS จะเตะตัวตนวิญญาณคุณหลุดจากตู้เหล็กเดิมเพื่อไล่ที่... ส่งผลให้ **ข้อมูลใน Instance Store จะระเหยกลายเป็นไอหายวับไปกับตาทันที!**"
- ทริคที่ 2: สืบเนื่องจากทริคแรก... เมื่อร่างวิญญาณคุณโดนเตะออกจากเครื่องเหล็ก เวลาคุณสั่งตื่นมาเปิดเครื่องใหม่ (Start)... AWS ก็จะหยิบวิญญาณคุณไปเสียบรันในเครื่องคอมแฮร์รีเครื่องใหม่ที่ช่องว่างอยู่ **`(host is possibly changed)`** นั่นเอง 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] All data on the attached instance-store devices will be lost.**
- **ทำไมถึงถูก:** โดนเต็มๆ ฮาร์ดดิสก์สายฟ้าแลบ `Instance store` มันผูกติดแบบกายหยาบกับตู้แม่ เมื่อไรที่คุณกด Stop เครื่องปุ๊บ... AWS จะถือว่าตู้เหล็กตู้นี้ว่างแล้ว และขัดล้างกระดานลบทิ้งข้อมูลเกลี้ยงทันทีเพื่อรอแขกคนใหม่มาเสียบแทน (ความซวยมาเยือนคนขี้งกแน่ๆ ถ้าเผลอเซฟงานสำคัญทิ้งไว้)

✅ **[ถูกต้อง] The underlying host for the instance is possibly changed.**
- **ทำไมถึงถูก:** เป็นตรรกะผลพวงเลย เมื่อเครื่องถูกทิ้งร้างปิดไฟ (Stop)... เช้าอีกวันมันผงาดตื่น (Start) มันก็นึกง่ายๆ เหมือนตื่นไปหาโต๊ะเช่า Hot Desk ตัวใหม่นั่งทำงาน (คอมเหล็กเครื่องใหม่) ไม่ได้รับประกันว่าโชคดีจะได้โต๊ะเหล็กหน้าตาหนิมเขรอะตัวเดิมนะฮะ

❌ **[ผิด] The Elastic IP address is disassociated with the instance.**
- **ทำไมถึงผิด:** ฮ่วย! ผิดอย่างแรง ป้ายทะเบียนวีไอพี `Elastic IP` ที่คุณเสียตังค์จดมันคือเพื่อนตาย มันจะแปะอยู่คู่หน้าผากเครื่องคุณไปตลอดกาลยันหน้าหนาว ไม่สนว่าคุณจะเป่าไฟดับปิดกี่รอบ (มันหลุดแค่ตอนคุณตั้งใจกดคืนป้ายเท่านั้น) *ปล. ยกเว้นระบบโบราณมากๆ EC2-Classic ที่อาจหลุดร่วงบ้าง แต่ปัจจุบันโลกเขาใช้ EC2-VPC หมดแล้ว*

❌ **[ผิด] The ENI (Elastic Network Interface) is detached.**
- **ทำไมถึงผิด:** สายแลนตีนตุ๊กแกวิเศษ `ENI` (การ์ดจอเน็ตเวิร์ค) ก็เกาะติดหนึบกับตัวก้อนข้อมูลเครื่องประดุจสายสะดือลูก ต่อให้มุดคอมปิดเครื่องยังไง มันก็ไม่หลุดเตลิดเปิดเปิงหรอกจ้า

❌ **[ผิด] There will be no changes.**
- **ทำไมถึงผิด:** แหม ตอบชุ่ยๆ มีชัวร์สิ! อย่างข้อมูลระเหยหายเนี้ย กระทบแน่นอนชัวร์ร้อยเปอจ้า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **EBS vs Instance Store**: 
  - **EBS**: ถอดออกได้ ปิดเครื่องข้อมูลไม่พัง (เหมือน Flash Drive ยักษ์)
  - **Instance Store**: ฝังติดบอร์ดแม่ สปีดแรงทะลุนรก! แต่วินาทีที่คุณ Stop หรือ Terminate เครื่อง... สิ่งที่คุณเซฟไว้จะพินาศหายพริบตาจ้า

---
---

## 📌 คำถามที่ 50
**โจทย์:**
A company currently has an Augment Reality (AR) mobile game that has a serverless backend. It is using a DynamoDB table which was launched using the AWS CLI to store all the user data and information gathered from the players and a Lambda function to pull the data from DynamoDB. The game is being used by millions of users each day to read and store data.

How would you design the application to improve its overall performance and make it more scalable while keeping the costs low? (Select TWO.)

**ตัวเลือก:**
- [x] Use API Gateway in conjunction with Lambda and turn on the caching on frequently accessed data and enable DynamoDB global replication.
- [ ] Configure CloudFront with DynamoDB as the origin; cache frequently accessed data on the client device using ElastiCache.
- [x] Enable DynamoDB Accelerator (DAX) and ensure that the Auto Scaling is enabled and increase the maximum provisioned read and write capacity.
- [ ] Since Auto Scaling is enabled by default, the provisioned read and write capacity will adjust automatically. Also enable DynamoDB Accelerator (DAX) to improve the performance from milliseconds to microseconds.
- [ ] Use AWS IAM Identity Center to authenticate users and have them directly access DynamoDB using single sign-on. Manually set the provisioned read and write capacity to a higher RCU and WCU.

---
### 🎯 โจทย์ต้องการอะไร?
เกม AR มือถือมีคนเล่นเบียดเสียด **ล้านคนต่อวัน (millions of users)** ขูดขีดเซิร์ฟเวอร์แบบทะลุจอ
ระบบใช้แค่ฟังก์ชันขลังๆ Lambda ดูดข้อมูลพาสเวิร์ด/สถิติ จากตารางลูกเต๋า **`DynamoDB (ที่กดเสกดิบๆผ่านคำสั่งหน้าจอดำ CLI)`**
คำถาม: ทรงบารมีพระคุ้มครอง! ให้เสนอไอเดียปรับจูนระบบ 2 ข้อ ให้ **"วิ่งปรู๊ดปร๊าดไวแสง (improve performance)"** และ **"รองรับคนมหาศาลแบบราคาไม่แพงกระเป๋าฉีก (scalable... keeping costs low)"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ล่อเป้าว่ามีคนรุมตอมเข้ามาอ่านกะทะเป็ดย่าง DynamoDB รัวๆ! ท่าเร่งสปีดแบบไม่ต้องแก้โค้ดคือติดเทอร์โบหน้ารถที่เรียกว่า **`DynamoDB Accelerator (DAX)`** ซะ (อ่านแรงทะลุมิลลิวินาที)
- ทริคที่ 2: จำใส่สมอง! "ถ้าคุณสร้าง DynamoDB ด้วยการงมหอยคำสั่งหน้าจอดำ (AWS CLI) สวิตช์สเกลลื่นไหล **Auto Scaling มันจะ `ไม่ได้เปิดเป็นค่าเริ่มต้น (NOT default)` นะจ๊ะ!**" ต้องเอามือไปสับสวิตช์แก้เปิดมันเอง
- ทริคที่ 3: ระบบ Serverless (Lambda) หัวเดียวกระเทียมลีบสู้แดดไม่ได้ ต้องจับสวมหน้าจั่วคอยป้องแขกด้วย **`API Gateway (ที่มีฟีเจอร์ Caching จดจำหน้าลูกค้า)`** มาช่วยคลายความร้อน 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable DynamoDB Accelerator (DAX) and ensure that the Auto Scaling is enabled and increase the maximum provisioned read and write capacity.**
- **ทำไมถึงถูก:** ตีตื้นปัญหาได้หมดจด! 1. อัดยาแรง `DAX` มาเป็นกันชนก๊อปปี้ข้อมูลแจกจ่ายให้คนมาอ่านได้ดุจสายฟ้าฟาด 2. วิ่งไปเช็คและปัดสวิตช์ `Auto Scaling` ให้เป็น เปิด (เพราะคนสร้างหน้าจอดำ CLI ลืมเปิดไว้แน่ๆ!) คว้านเพดาน RCU/WCU รองรับโหลดให้ใหญ่ขึ้น สวยครบถ้วน 

✅ **[ถูกต้อง] Use API Gateway in conjunction with Lambda and turn on the caching on frequently accessed data and enable DynamoDB global replication.**
- **ทำไมถึงถูก:** อาวุธหนักก๊อกสอง! จับลูกเจี๊ยบ Lambda ไปซ่อนหลังหน้ากากยักษ์ `API Gateway` แล้วเปิดโหมดอมความจำ (Turn on caching) ดักหน้าประตูไว้ซะ คนโหลดซ้ำๆก็ไม่ต้องวิ่งไปกวน Lambda ให้เปลืองตังค์ ประหยัดงบ และแถมโยนตารางไปรอบโลก(Global) ให้ปิงลดลงด้วย

❌ **[ผิด] Since Auto Scaling is enabled by default... Also enable DynamoDB Accelerator (DAX)...**
- **ทำไมถึงผิด:** เกือบดี แต่ไปตายน้ำตื้นตรงประโยคหลอกกวนโอ๊ยว่า `Since Auto Scaling is enabled by default (เพราะไอ้ออโต้สเกลมันเปิดมาดักรอเป็นค่าเริ่มต้นอยู่แล้วไง!)` ผิดแหกโคก! ถ้าเสกผ่านเสาคำสั่งดำ CLI ออโต้สเกลจะดับสนิทเป็นใบ้ตั้งแต่เกิดจนกว่าแอดมินจะไขลานจ้า

❌ **[ผิด] Configure CloudFront with DynamoDB as the origin; cache frequently accessed data on the client device using ElastiCache.**
- **ทำไมถึงผิด:** มั่วซั่วสปาเกตตี้สุดตีน! ยามหน้าด่านทรงอย่าง `CloudFront` มันเสริฟเนื้อคู่ได้แค่ตึก S3/ALB/EC2 เท่านั้น **มันจับหน้าเข้าคู่ผูกกับกะทะร้อยล้าน DynamoDB ตรงๆไม่ได้โว้ย!!** แถมไปยัดเยียดปั้น ElastiCache งงๆใส่เครื่องมือถืออีก ตลกเหรอ!

❌ **[ผิด] Use AWS IAM Identity Center to authenticate users and have them directly access DynamoDB... Manually set the provisioned... to a higher RCU and WCU.**
- **ทำไมถึงผิด:** สองเด้งแห่งความพินาศ 1) เอาคนนับล้านมามุดท่อระบบยืนยันตัวตนพนักงานบริษัท (IAM Identity Center / SSO) เนี่ยนะ ขัดกันสุดๆ 2) แล้วการให้คนตั้งหมุนปรับสปีดเองด้วยมือ (Manually set capacity) ขึ้นลง มันคือภาระที่แพงขี้แตก ไม่ใช่คำว่า "keeping costs low" สุดประหยัดแบบที่หวังไว้เลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **DynamoDB Accelerator (DAX)**: ก้อนน้ำแข็งซับเหงื่อหน้าเตา DynamoDB สำหรับยามที่ลูกค้านับแสนจ้องจะแย่งซื้อของชิ้นเดียวกัน มันจะก๊อปให้ไวระดับไมโครวินาที โดยแอดมินขี้เกียจแทบไม่ต้องแก้โค้ดเลย 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 11: ข้อ 51 - 55)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 51
**โจทย์:**
A company is building an automation tool for generating custom reports on its AWS usage. The company must be able to programmatically access and forecast usage costs on specific services.

Which of the following would meet the requirements with the LEAST amount of operational overhead?

**ตัวเลือก:**
- [ ] Generate AWS Budgets reports for usage cost data and deliver them via Amazon Simple Queue Service (SQS).
- [x] Use the AWS Cost Explorer API with pagination to programmatically retrieve the usage cost-related data.
- [ ] Configure AWS Budgets to send usage cost data to the company via Amazon SNS.
- [ ] Utilize the downloadable AWS Cost Explorer report .csv files to access the cost-related data. Predict usage costs using AWS Budgets.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังปั้นเครื่องมือบอทอัตโนมัติ (automation tool) เพื่อออกรายงานสรุปบิลค่าใช้จ่าย AWS 
โดยหวังว่าบอทตัวนี้จะสามารถ **"เขียนโค้ดมุดเข้าไปดึงข้อมูล (programmatically access)"** และ **"ทำนายอนาคตดูดวงค่าใช้จ่าย (forecast usage costs)"** ของเซอร์วิสแต่ละตัวได้
คำถาม: ท่ายากไหนที่ตอบโจทย์ความฝันของบอทตัวนี้ โดยที่แอดมิน **"แทบไม่ต้องตื่นมาเหนื่อยลงแรงทำเองเลย (LEAST operational overhead)"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเห็นคำว่า "ดึงข้อมูลเชิงลึก/วิเคราะห์อดีต/ทำนายอนาคตค่าใช้จ่าย (forecast/analyze costs)" แวะปั๊มที่บริการ **`AWS Cost Explorer`** ยืนหนึ่งเท่านั้น
- ทริคที่ 2: ถ้าโจทย์ระบุว่าอยากให้ "บอท/หุ่นยนต์/โปรแกรม เข้าไปดึงข้อมูลแทนคน (programmatically access)" วิธีที่เมพและตรงจุดสุดคือการต่อท่อสายสะดือ **`API (Cost Explorer API)`** เข้าไปคุยกันตรงๆ (ไม่ต้องมานั่งให้คนกดดาวน์โหลดไฟล์ CSV โง่ๆ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use the AWS Cost Explorer API with pagination to programmatically retrieve the usage cost-related data.**
- **ทำไมถึงถูก:** พระเอกสุดๆ! `AWS Cost Explorer` เป็นบริการเดียวที่ครบเครื่องเรื่อง "ดึงอดีต-ทำนายอนาคต(forecast)" และการที่โจทย์อยากใช้บอท(programmatically) ก็เสิร์ฟคู่กับช่องทาง `Cost Explorer API` ซะเลย บอทก็วิเคราะห์ข้อมูลค่าใช้จ่ายย้อนหลังสบายใจเฉิบ แถมนี่คือวิธีที่แอดมินแทบกระดิกเท้ารอผล (LEAST overhead ขนานแท้)

❌ **[ผิด] Generate AWS Budgets reports for usage cost data and deliver them via Amazon Simple Queue Service (SQS).**
- **ทำไมถึงผิด:** แสบตา! `AWS Budgets` มีหน้าที่ไว้ "ตั้งขีดจำกัดปลุกเตือนภัย (Alert threshold) เมื่อเงินไหลทะลุกระเป๋า" มันไม่ได้เอาไว้ให้บอทวิ่งเข้ามารีดไถดึงประวัติค่าใช้จ่ายรายตัวนะฮะ แถมเอาไปผูกส่งเข้าท่อคิว SQS ก็ผิดจุดประสงค์สุดกู่

❌ **[ผิด] Configure AWS Budgets to send usage cost data to the company via Amazon SNS.**
- **ทำไมถึงผิด:** เหมือนข้อบน AWS Budgets ส่งจดหมายรักเตือนสติว่าเงินหมดได้ (ผ่านอีเมล SNS) แต่มันไม่มีฟีเจอร์แจงรายละเอียดบิลหรือส่งวิเคราะห์กราฟทำนายอนาคต (Forecast) แบบเจาะลึกให้โปรแกรมเอาไปใช้เขียนแอปต่อได้จ้า 

❌ **[ผิด] Utilize the downloadable AWS Cost Explorer report .csv files... Predict usage costs using AWS Budgets.**
- **ทำไมถึงผิด:** ท่าไม้ตายมนุษย์หินฟลินท์สโตน! การรอโหลดไฟล์ `.csv` มางมเองแปลว่ามนุษย์ต้องกระโจนเข้าไปเปิด Excel นั่งไฮไลท์เอาตาเหลือก (ขัดกับคีย์เวิร์ดบอท Programmatic สุดๆ) แถมโจทย์บอกว่าต้องออกแรงน้อยสุด (LEAST overhead) วิธีลงมือทำเอง manual แบบนี้ตกกระป๋องไปเลย 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Cost Explorer**: กราฟแท่งสีรุ้ง วิเคราะห์ย้อนหลัง ทำนายเทรนด์ล่วงหน้าได้ (ผ่านหน้าเว็บ หรือแทง API ก็ได้)
- **AWS Budgets**: หมาเฝ้าบ้าน "นายจ๋า เงินทะลุหมื่นนึงล่ะนะ!" (แจ้งเตือนเฉยๆ ไม่ได้มีกราฟสวยๆให้ดู)

---
---

## 📌 คำถามที่ 52
**โจทย์:**
A call center wants to use Artificial Intelligence(AI) to extract insights from audio recordings to assess the quality of its customer service. The calls are available in both English and Hindi. A sentiment analysis report in English must be generated for each recording to assess whether or not the customer had a positive experience. Once the solution is completed, new languages will eventually be supported, such as Arabic, Mandarin, and Spanish.

How can the solutions architect build the solution without maintaining any machine learning model?

**ตัวเลือก:**
- [ ] Transcribe audio recordings into text using Amazon Polly's StartSpeechSynthesisTask operation. Set up Amazon Rekognition to recognize and automatically translate Hindi texts into English. Use the combination of Amazon Fraud Detector and Amazon SageMaker BlazingText algorithm for sentiment analysis.
- [ ] Utilize the Amazon Lex service to convert audio recordings into text. Call the Amazon Translate API to translate Hindi texts into English and use Amazon SageMaker Clarify for sentiment prediction and analysis.
- [ ] Set up Amazon Comprehend to convert audio recordings into text. Use Amazon Kendra to translate Hindi texts into English and utilize the Amazon Detective service to automatically detect negative user behaviors for sentiment analysis.
- [x] Convert audio recordings into text using Amazon Transcribe. Set up Amazon Translate to translate Hindi texts into English and use Amazon Comprehend for sentiment analysis.

---
### 🎯 โจทย์ต้องการอะไร?
ศูนย์ Call Center มีไฟล์เสียงลูกค้าโทรมาด่า/ชม เป็นภาษา "อังกฤษ" และ "ฮินดี (อินเดีย)"
เป้าหมายคือ: อยากจับเสียงเหล่านี้มาปั่นเป็น "รายงานวิเคราะห์อารมณ์บวก/ลบ (sentiment analysis report)" ในเวอร์ชั่นภาษาอังกฤษล้วนซะ! (ถ้าเป็นฮินดีต้องแปลก่อน) แถมอนาคตจะมีภาษาแขก อาหรับ จีน สเปน งอกมาด้วย
เงื่อนไขชี้ชะตา: สถาปนิกปอดแหก **"ไม่อยากเทรนปั้นโมเดล AI เองให้เมื่อยตุ้ม (without maintaining any machine learning model)"** จะจ้าง AI สำเร็จรูปของ AWS ท่าไหนมายำรวมกัน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: แปลงเสียงคนพูดเป็นตัวอักษรพิมพ์แจก (audio to text) = **`Amazon Transcribe (คนจดเลคเชอร์)`**
- ทริคที่ 2: แปลภาษาจากชาติฮินดีมาเป็นชาติมะกัน (translate) = **`Amazon Translate (วุ้นแปลภาษา)`**
- ทริคที่ 3: วิเคราะห์อารมณ์คำพูดว่าด่าหรือชม (sentiment analysis) = **`Amazon Comprehend (นักจิตวิทยาจับอารมณ์)`**
>> ทุกตัวเป็น Managed Service สำเร็จรูป ไม่ต้องเทรนสมอง AI เอง! (ตอบโจทย์จังๆ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Convert audio recordings into text using Amazon Transcribe. Set up Amazon Translate to translate Hindi texts into English and use Amazon Comprehend for sentiment analysis.**
- **ทำไมถึงถูก:** ทีมAvengersรวมดาวโชว์ฟอร์มเทพ! ครบวงจรตั้งแต่: จ้าง `Transcribe` ฟังเทปเสียงและพิมพ์ออกมาเป็นตัวกะยึกกะยือ -> โยนข้ามทะเลไปให้วุ้นแปลภาษา `Translate` พ่นอังกฤษล้วนออกมา -> จบพิธีด้วยการโยนเข้าปากหมอดู `Comprehend` ทายอารมณ์ลูกค้าว่าด่าหรือปลื้ม... แถมทั้ง 3 ทหารเสือนี้คือ AI สำเร็จรูป (Pre-trained) ของลอร์ด AWS ที่ไม่ต้องเทรนโมเดลเอง (ตรงโจทย์เด๊ะ!)

❌ **[ผิด] Transcribe audio recordings into text using Amazon Polly's... Set up Amazon Rekognition... Use the combination of Amazon Fraud Detector and Amazon SageMaker BlazingText...**
- **ทำไมถึงผิด:** ยำใหญ่ใส่สารพัดมั่ว! `Amazon Polly` คือหุ่นยนต์นักอ่านข่าว (แปลงพิมพ์เป็นเสียง) เอามาฟังเทปไม่ได้! / `Amazon Rekognition` คือไอ้จุกส่องกล้องใบหน้า/รูปภาพ เอามาแปลภาษาไม่ได้! / และถ้าดื้อดึงไปปลุกวิญญาณเดอะแมททริกซ์ `SageMaker BlazingText` ขึ้นมา... มึงต้องมานั่งปั้นเทรนสมอง AI เองนะ (ตายหยังเขียดแถมผิดโจทย์)

❌ **[ผิด] Utilize the Amazon Lex service to convert audio recordings into text... use Amazon SageMaker Clarify for sentiment prediction...**
- **ทำไมถึงผิด:** บ้าไปแล้ว! `Amazon Lex` คือสิริแชทบอทตอบโต้เสียง ไม่ใช่นักพิมพ์ดีดแกะเทป (Transcribe)! แถมเสพติด `SageMaker` ให้มาปั้นโมเดลแก้อารมณ์อีก ซึ่งโจทย์เค้าเพิ่งบอกไปหมาดๆว่าอั้วไม่อยากสร้างโมเดลเอง

❌ **[ผิด] Set up Amazon Comprehend to convert audio recordings into text. Use Amazon Kendra to translate Hindi texts... utilize the Amazon Detective...**
- **ทำไมถึงผิด:** เอ้า! จับแพะชนแกะหนักกว่าเดิม `Comprehend` ฟังเทปไม่ได้ว้อย (มันอ่านตัวหนังสืออย่างเดียว) / `Amazon Kendra` มันคือ Google Search ประจำบริษัทไม่ใช่เครื่องแปลภาษา / ปลายแถวโผล่ยอดเซียน `Amazon Detective` นักสืบคดีแฮกเกอร์ความปลอดภัย เอามาทำไม๊!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- ก๊วน AI สำเร็จรูป AWS (AI Services) ที่คนสอบชอบสับสน:
  - **Transcribe**: เสียง -> พิมพ์
  - **Polly**: พิมพ์ -> เสียง
  - **Translate**: วุ้นแปลภาษา
  - **Comprehend**: อ่านอารมณ์ (บวก,ลบ,กลาง) แยกแยะชื่อคน/ชื่อบริษัท
  - **Rekognition**: ตาปะปารัสซี่ (สแกนรูป ดารา หนัง สิว ฝ้า)
  - **Lex**: แชทบอทเสียง (เสกสิริ/อเล็กซ่า)

---
---

## 📌 คำถามที่ 53
**โจทย์:**
A company installed sensors to track the number of people who visit the park. The data is sent every day to an Amazon Kinesis stream with default settings for processing, in which a consumer is configured to process the data every other day. You noticed that the S3 bucket is not receiving all of the data that is being sent to the Kinesis stream. You checked the sensors if they are properly sending the data to Amazon Kinesis and verified that the data is indeed sent every day.

What could be the reason for this?

**ตัวเลือก:**
- [x] By default, the data records are only accessible for 24 hours from the time they are added to a Kinesis stream.
- [ ] Your AWS account was hacked and someone has deleted some data in your Kinesis stream.
- [ ] There is a problem in the sensors. They probably had some intermittent connection hence, the data is not sent to the stream.
- [ ] By default, Amazon S3 stores the data for 1 day and moves it to Amazon Glacier.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทติดเซนเซอร์นับขานักท่องเที่ยวสวนสาธารณะ (ส่งข้อมูลเข้าท่อซ่า `Amazon Kinesis` ทุกๆวัน) ท่อนี้ถูกตั้งค่าเดิมๆ (default) ไม่ได้แต่งเติมอะไร
แต่ฝั่งดักรับปลายท่อคือแอป Consumer ที่ตั้งตื่นมากวาดข้อมูลไปลงบ่อ `S3` โดยหลับใหลอยู่และจะโผล่มากวาดของออมทรัพย์ **"แบบวันเว้นวัน (every other day)"**
ปัญหาเกิด! แอดมินส่องในบ่อ S3 ปรากฎว่าข้อมูลขาดๆ หายๆ มาไม่ครบ! (เช็คเซนเซอร์แล้วก็ส่งเข้าท่อปกติดีทุกประการ)
คำถาม: ทายซิว่า "ผีหลอกวิญญาณหลอน (the reason)" อะไรกวาดข้อมูลหายไป ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอท่อน้ำซิ่ง **`Amazon Kinesis`** แล้วมีคำสาป **`"Default Settings (ค่าดั้งเดิม)"`** ให้ท่องจำตัวเลขศักดิ์สิทธิ์คือ: ข้อมูลที่ไหลเข้าท่อ Kinesis จะ **`หมดอายุบูดเน่าหายวับไปใน "24 ชั่วโมง (1 วัน)"`** เท่านั้น! (ถ้าคุณไม่รีบมาดูดออกไป)
- ทริคที่ 2: ปลายทาง (Consumer) ดันเสือกตื่นมาสูบของ **"วันเว้นวัน (every other day = 48 ชม.)"** ซึ่งเกินกว่าระยะเวลาที่ของในท่อจะเน่าตาย (24 ชม.) ดังนั้นข้อมูลของเมื่อวานก็เลยระเหยสาปสูญหายไปไงล่ะ ปัดโถ่!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] By default, the data records are only accessible for 24 hours from the time they are added to a Kinesis stream.**
- **ทำไมถึงถูก:** ก็ตามเบสิกล้วนๆจ้า กฎเหล็กของท่อ `Kinesis Data Streams (ถ้าตั้งค่าแบบ Default)` คือข้อมูลจะมีชีวิตรอดอยู่รอคนมารับกอดแค่ **24 ชั่วโมง (24 hours retention)** เท่านั้น! ดังนั้นไอ้แอปปลายทางที่ชอบมาทำตัวชิล สูบข้อมูลวันเว้นวัน (48 ชม.) มันก็จะพลาดหยิบของเก่าที่บูดลบเป่าปลิวทิ้งไปแล้ว แหว่งเป็นช่องโหว่นั่นเอง! วิธีแก้คือคุณก็แค่ไปขยายหลอดอายุ (Retention) ท่อ Kinesis ให้เป็น 48 ชม. ซะสิ 

❌ **[ผิด] There is a problem in the sensors. They probably had some intermittent connection hence, the data is not sent...**
- **ทำไมถึงผิด:** เอ้าโจทย์อุตส่าห์ดักทางไว้สาดส่องว่า "ข้าเช็คทบส่องดูเซนเซอร์ละเอียดแล้วโว้ย ส่งของครบทุกวันเป๊ะ (verified that the data is indeed sent every day)" รีบไปโทษฮาร์ดแวร์ชาวบ้านได้ไง 

❌ **[ผิด] By default, Amazon S3 stores the data for 1 day and moves it to Amazon Glacier.**
- **ทำไมถึงผิด:** ใส่ร้ายป้ายสี `Amazon S3` สุดๆ! ของออริจินัลโยนลง S3 มันไม่มีทางเสือกทำสไลเดอร์ไหลร่วงดงหมีขั้วโลก `Glacier` ใน 1 วันเองอัตโนมัตินะ (ถ้านายไม่ไปตั้งกฎไลฟ์ไซเคิลให้มัน) แถมของร่วงไป Glacier มันก็แค่แช่แข็ง ไม่ได้โดนลบหายวับไปไหน 

❌ **[ผิด] Your AWS account was hacked and someone has deleted some data in your Kinesis stream.**
- **ทำไมถึงผิด:** มโนแจ่มซับซ้อนเกินข้อสอบแสนบริสุทธิ์! แฮกเกอร์ว่างขโมยข้อมูลเซนเซอร์นับขาสวนสาธารณะเนี่ยนะ!? อีกอย่างข้อมูลที่ตกท่อเข้าไปสิงใน Kinesis Stream แล้ว **"ไม่มีมนุษย์หรือแฮกเกอร์หน้าไหนเจาะกะโหลกไปสั่งลบรายตัวได้ (immutable)"** จนกว่าจะครบกำหนดอายุไขบูดตายระเหยเองจ้า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Kinesis Data Streams Retention (ความจุทนทาน)**: 
  - ค่าดั้งเดิม Default อายุไข = **24 ชั่วโมง (1 วัน)**
  - ยัดเงินบูสอัพขยายร่างได้ยืดหยุ่นยาวสุดๆ = **365 วัน (8760 ชั่วโมง)** สมัยก่อนได้แค่ 7 วันแต่เค้าป๋าใจดีอัพเกรดให้แล้วนะ!

---
---

## 📌 คำถามที่ 54
**โจทย์:**
A company intends to give each of its developers a personal AWS account through AWS Organizations. To enforce regulatory policies, preconfigured AWS Config rules will be set in the new accounts. A solutions architect must see to it that developers are unable to remove or modify any rules in AWS Config.

Which solution meets the objective with the least operational overhead?

**ตัวเลือก:**
- [x] Add the developers' AWS account to an organization unit (OU). Attach a service control policy (SCP) to the OU that restricts access to AWS Config.
- [ ] Set up an AWS Control Tower in the root account to detect if there were any changes to the new account’s AWS Config rules. Attach an IAM trust relationship to the IAM User of each developer which prevents any changes in AWS Config.
- [ ] Configure an AWS Config rule in the root account to detect if changes to the new account’s Config rules are made.
- [ ] Use an IAM Role in the new accounts with an attached IAM trust relationship to disable the access of the root user to AWS Config.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสายเปย์ อยากแจกบัญชี **AWS account ส่วนตัว** ให้ลูกสมุนนักโปรแกรมเมอร์ (developers) ไว้ลองวิชาส่วนตัว โดยคลุมถุงชนคุมทั้งหมดผ่าน **AWS Organizations** 
กฎเหล็กสั่งตาย: แอดมินดันแอบแฝงเอากล้องวงจรปิด `AWS Config rules` ไปซ่อนไว้ในบัญชีแจกฟรีพวกนี้ เพื่อมอนิเตอร์ความห้าว! 
คำถาม: แอดมินจะกางยันต์คุ้มกะลาหัวกติกาไหนดี เพื่อ **"กะซวกสิทธิ์ห้ามไม่ให้โปรแกรมเมอร์บ้าบิ่น ลบหรือปรับแต่งกล้องวงจรปิด AWS Config (unable to remove or modify)"** โดยต้องตั้งค่าแบบคุมงบไม่เหนื่อย (least operational overhead) ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์บอกว่ามีการเสกเมือง **`AWS Organizations`** และคุณมีความแคนอยากเอาไม้เรียวไล่หวดคุมประพฤติ "บล็อคบัญชีลูกทั้งหมดไม่ให้ทำนั่นทำนี่เด็ดขาด (restrict access)" = ฟันธงเลยว่าคำตอบร้อยทั้งร้อยต้องเสกใบสั่งตาย **`Service Control Policy (SCP)`** ยัดลงไปคลุมกำเนิดแน่นอน!
- ทริคที่ 2: SCP ทรงพลังมาก เหนือกว่า IAM กิ๊กก๊อก! ต่อให้ไอ้ลูกข่ายล็อกอินเป็น Root ของเมืองตัวเอง ก็แหกตะแกรง SCP ไม่พ้น (สมใจอยากแอดมินเป๊ะ!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Add the developers' AWS account to an organization unit (OU). Attach a service control policy (SCP) to the OU that restricts access to AWS Config.**
- **ทำไมถึงถูก:** สูตรปราบผีสางที่ดีที่สุด! คุณจับบรรดาบัญชีลูกหมูนักพัฒนามากองรวมกันในคอกรั้วเดียวที่เรียกว่า `OU (organization unit)` จากนั้นร่ายเวทมนต์แปะกำแพงเมืองแผ่นบักเต้ง `SCP` สั่งฟ้าผ่าไว้ว่า "ไอ้พวกลูกหมาห้ามแตะเมนู Config นะว้อย!" แค่นี้ลูกสมุนก็ทำตัวลวดหยั่งเจียมเนื้อเจียมตัวแล้วจ้า (แถมบริหารง่ายสุดๆ ผนึกทีเดียวดับรวด)

❌ **[ผิด] Use an IAM Role in the new accounts with an attached IAM trust relationship to disable the access of the root user to AWS Config.**
- **ทำไมถึงผิด:** เอ๊าะเอ๋อ! ระบบบัตรยาม `IAM Role` และนโยบายลัทธิ `Trust relationship` "ไม่สามารถเอาไปอุดปากพระเจ้าผู้สร้างโลก(Root User) ของบัญชีนั้นได้นะโว้ย!!" ถ้าโปรแกรมเมอร์มันห้าวเป้ง ล็อกอินใช้ Root มันก็เตะบัตรยาม IAM ทิ้งและแอบลบ Config ได้อยู่ดี พลาดแรง!

❌ **[ผิด] Configure an AWS Config rule in the root account to detect if changes to the new account’s Config rules are made.**
- **ทำไมถึงผิด:** ผิดเป้าหมายอย่างจัง! ไอ้การเอากล้องมาส่องวงจรปิด (Config) มันดีนะ...แต่มันแค่ **"ร้องฟ้องชี้เป้าแรสเตอร์แบล็กลิสต์ (detect) เฉยๆ แต่อย่าลืมว่าโจทย์หน้ายักษ์สั่งคีย์เวิร์ดบอกว่า อยากขวิดให้ตายคามือแบบ ห้ามกดลบ(prevents / Unable to remove)"** ไปส่องกล้องพึ่ง Config แจ้งเตือนอย่างเดียวมันจะไปคว้ามือมันออกจากการลบยังไงเล่า!

❌ **[ผิด] Set up an AWS Control Tower in the root account to detect if there were any changes... Attach an IAM trust relationship to the IAM User of each developer which prevents any changes...**
- **ทำไมถึงผิด:** จับแพะชนท่อไอเสีย! จ้างหุ่นยนต์เทพ `Control Tower` มาช่วยส่องตรวจจับ แล้วดันทะลึ่งไปจับคู่สอดไส้ยันต์คุ้มกัน `IAM Trust Relationship` ขวางยาม ซึ่งอย่างที่อธิบายไปว่า IAM Trust ไว้สอดไส้การอนุญาตคนสวมบท (AssumeRole) มันช่วยอะไรกะการเสกบล็อกคำสั่งแก้ไข Config ในเครื่องอื่นฟระฮะ แถมถ้าเจอ User ห้าวเป้งใช้ Root นโยบายกิ๊กก๊อก IAM ก็แหลกกระจุยกระจาย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Organizations & SCP (คู่หูปราบเกรียน)**: 
  - สร้างร่มคันใหญ่องค์กรกางคลุมลูกเห็บ 
  - **SCP (Service Control Policies)**: ยันต์แปะหน้าผากแวมไพร์! ถ้า SCP บอกว่าบัญชีย่อยนี้ห้ามใช้ S3... ต่อให้ไอ้ลูกน้องเอาพาสเวิร์ดผี Root Login มาดื้อดึงกดสร้าง S3 ก็ทำไม่ได้จ้า (อำนาจเหนือทุกสรรพสิ่งในเมือง)

---
---

## 📌 คำถามที่ 55
**โจทย์:**
A major TV network has a web application running on eight Amazon T3 EC2 instances behind an application load balancer. The number of requests that the application processes are consistent and do not experience spikes. A Solutions Architect must configure an Auto Scaling group for the instances to ensure that the application is running at all times.

Which of the following options can satisfy the given requirements?

**ตัวเลือก:**
- [ ] Deploy eight EC2 instances with Auto Scaling in one Availability Zone behind an Amazon Elastic Load Balancer.
- [ ] Deploy four EC2 instances with Auto Scaling in one region and four in another region behind an Amazon Elastic Load Balancer.
- [x] Deploy four EC2 instances with Auto Scaling in one Availability Zone and four in another availability zone in the same region behind an Amazon Elastic Load Balancer.
- [ ] Deploy two EC2 instances with Auto Scaling in four regions behind an Amazon Elastic Load Balancer.

---
### 🎯 โจทย์ต้องการอะไร?
สถานีโทรทัศน์ยักษ์ใหญ่ รันแอปทายผลโหวด 8 เครื่อง **(8 Amazon T3 EC2 instances)** ยืนซุ่มอยู่หลังรูปเคารพ Load Balancer
ข้อดีของแอปนี้คือ: ผู้ชมเข้ามาโหวดแบบเรียบๆ สม่ำเสมอ ไม่ตูมตาม (consistent and no spikes) อือหือชิลล่ะสิ!
คำถาม: กางปีกสถาปัตยกรรมท่าไหนดี เพื่อร่ายมนต์ใส่ `Auto Scaling group` ให้แอป **"รันค้ำฟ้าไม่หลุดสักวินาที (running at all times / High Availability ชิลๆเนียนๆ)"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎอมตะแห่งความตายยาก "ห้ามวางไข่ทั้งหมดไว้ในตระกร้าใบเดียว (ตึกเดียว/AZ เดียว)" ดังนั้นอะไรที่อัด **8 เครื่องใน 1 AZ กาเครื่องหมายผิดทิ้งทันควัน!**
- ทริคที่ 2: พระเอกโหลดบาลานซ์ **`Amazon Elastic Load Balancer (ELB หรือ ALB)`** มันกางปีกโอบกอดได้เฉพาะเครื่อง EC2 ที่ **"อยู่แค่กะลาในประเทศ (Region) เดียวกันข้ามตึกลุย AZ ได้" เท่านั้น**!! มันไปเสือกเหยียดขากอดเครื่องที่อยู่ทวีปอื่นไม่ได้ (ห้ามข้าม Region)!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy four EC2 instances with Auto Scaling in one Availability Zone and four in another availability zone in the same region behind an Amazon Elastic Load Balancer.**
- **ทำไมถึงถูก:** พระสมเด็จวัดระฆังคุ้มครอง 100%! กระจายความเสี่ยง (High Availability) แบบเบสิก คือแบ่งกำลังพล ครึ่งนึง (4 เครื่อง) ไว้ตึก AZ1 และอีกครึ่ง (4 เครื่อง) ชงไว้ตึก AZ2 ภายในเมืองรั้วบ้านเดียวกัน (Same Region) แล้วมี Load Balancer คอยแจกบัตรคิวเข้างานให้ ถุกตึกไหนไฟดับสึนามิพัดถล่ม อีกฝั่งก็ยังคงรอดประทังชีวิตรอยางออโต้สเกลปล่องพ่นเครื่องงอกมาอุดรูให้ ไม่ตายหมู่แน่นอน!

❌ **[ผิด] Deploy eight EC2 instances with Auto Scaling in one Availability Zone behind an Amazon Elastic Load Balancer.**
- **ทำไมถึงผิด:** เอายางแตกไปลุยหิมะ! ยัดฉิบ 8 เครื่องกระจุกอยู่แหงะในคอนโดตึกเดียวกัน `(One Availability Zone)` เกิดวันซวยแผ่นดินไหวตึกถล่ม เซิร์ฟเวอร์ดับ 8 จอรวด สถานนีโทรทัศน์เจ๊งจอดำหมดเกาะทันที (ผิดกติกา High availability)

❌ **[ผิด] Deploy four EC2 instances with Auto Scaling in one region and four in another region behind an Amazon Elastic Load Balancer.**
- **ทำไมถึงผิด:** เพี้ยนจัด! เอาปีก Load balancer กิ๊กก๊อก ไปกางข้ามประเทศ `(One region... another region)` มันทำไม่ได้นะจ๊ะ ปี่มันตีไม่ถึงทวีปอื่น! (ELB มันคุยได้แค่ในอาณาเขตภูมิภาคตัวเองนะ ถ้าอยากข้ามทวีปก็ไปพึ่งป้ายจราจรอวกาศ Route 53 นู่น!)

❌ **[ผิด] Deploy two EC2 instances with Auto Scaling in four regions behind an Amazon Elastic Load Balancer.**
- **ทำไมถึงผิด:** ทรงโคตรเวรี่ยาก! กางเต็นท์ 4 ภูมิภาค `(in four regions)` อย่างที่แหกตาดูข้อก่อนหน้านี้ว่า Load balancer มดหมัดตัวกระจ้อยมันข้ามภูมิภาคไม่ได้เว้ยเฮ้ย!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **ELB (Elastic Load Balancer) ขอบเขตจินตนาการ**: 
  - กางปีกเห็บข้ามตึกโซน **(Cross-AZ) รอดทนทาน!**
  - กางปีกเสร่อข้ามแม่น้ำโขงประเทศทวีป **(Cross-Region) ทำไม่ได้โว้ย!!** 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 12: ข้อ 56 - 60)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 56
**โจทย์:**
A company has an e-commerce application that saves the transaction logs to an S3 bucket. You are instructed by the CTO to configure the application to keep the transaction logs for one month for troubleshooting purposes, and then afterward, purge the logs.

What should you do to accomplish this requirement?

**ตัวเลือก:**
- [ ] Enable CORS on the Amazon S3 bucket which will enable the automatic monthly deletion of data
- [x] Configure the lifecycle configuration rules on the Amazon S3 bucket to purge the transaction logs after a month
- [ ] Create a new IAM policy for the Amazon S3 bucket that automatically deletes the logs after a month
- [ ] Add a new bucket policy on the Amazon S3 bucket.

---
### 🎯 โจทย์ต้องการอะไร?
แอปฯ ร้านค้าออนไลน์ E-commerce ถูกตั้งให้กวาดขยะ "บันทึกสลิปรายการซื้อขาย (transaction logs)" ไปเททิ้งสุมไว้ในบ่อขยะ **Amazon S3**
หัวหน้า CTO สั่งการบัญชาสวรรค์มาว่า: "ช่วยตั้งระบบให้**เก็บสลิปพวกนี้ไว้ดูแก้ต่างแค่ 1 เดือนก็พอ (keep logs for one month) หลังจากนั้นให้เอากาวอุดท่อ เผาขยะทำลายทิ้งซะให้เกลี้ยงอัตโนมัติ (purge the logs)**!"
คำถาม: ท่ายากสับสวิตช์ไหนบนโลก AWS จัดการเสกขยะ S3 สลายร่างตายคาที่หลังจบวัฏจักร 30 วัน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอข้อสอบถามหา "วัฏจักรชีวิต" การเก็บรักษาของบน S3 (เช่น เก็บ 30 วันลบทิ้ง / เก็บ 1 ปีแช่แข็ง) ทางสวรรค์มีคำตอบสำเร็จรูปตายตัวคือ **`Lifecycle configuration rules`** ไม่มีบริการอื่น!
- ทริคที่ 2: ในกฎ Lifecycle มีบทกระทำอยู่ 2 ส่วนหลักคือ **`Transition (ย้ายไปโซนถูกๆ)`** และ **`Expiration/Purge (หมดอายุขัยทิ้งขยะ)`** ซึ่งตรงโจทย์เป๊ะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the lifecycle configuration rules on the Amazon S3 bucket to purge the transaction logs after a month**
- **ทำไมถึงถูก:** เปรี้ยงเดียวจอด! `Lifecycle configuration rules` คือกฎเหล็กคุมกำเนิดไฟล์ในถัง S3 โดยคุณกดระบุกฎว่า "ไอ้พวกไฟล์ Logs ครบอายุ 30 วันปุ๊บ (expiration) เชือดทิ้งทันที!" S3 ก็จะทำกรรมกรลบให้ฟรีๆ อัตโนมัติทุกเดือนอย่างซื่อสัตย์ จบปิ้ง!

❌ **[ผิด] Add a new bucket policy on the Amazon S3 bucket.**
- **ทำไมถึงผิด:** เอ้า `Bucket Policy` มันคือด่านตรวจตำรวจหน้าหมู่บ้าน S3 ที่คอยบอกว่า "นาย A เข้ามาดูไฟล์ได้ / นาย B ห้ามโหลดไฟล์นี้" มัน "ไม่ได้มีอิทธิฤทธิ์ตื่นมาตั้งแคมป์ลบไฟล์อัตโนมัติตามปฏิทินพระเครื่องนะฮะ!" พลาด!!

❌ **[ผิด] Create a new IAM policy for the Amazon S3 bucket that automatically deletes the logs after a month**
- **ทำไมถึงผิด:** ตลกบริโภค! ยันต์อนุญาต `IAM Policy` ไม่เคยวูบวามตื่นมา "ตั้งเวลาสั่งลบไฟล์ให้เราได้เองออโต้ (automatically deletes logs)" หรอกนะ หน้าที่ของมันคือระบุว่าคนนั้นทำแอคชั่นนี้ได้มั้ย แค่นั้นแหละ! ไม่มี้ไม่มีฟีเจอร์นาฬิกาปลุกใน IAM

❌ **[ผิด] Enable CORS on the Amazon S3 bucket which will enable the automatic monthly deletion of data**
- **ทำไมถึงผิด:** โคตรเพ้อเจ้อ `CORS (Cross-Origin Resource Sharing)` มันคือป้ายประกาศอนุญาตให้เว็บหน้าบ้าน(เช่น javascript จากโดเมนก๊องแก๊ง) มาดูดรูปในถัง S3 ไปโชว์หน้าจอข้ามถิ่นได้ มันไปเกี่ยวอัลไล๊กับการตั้งศาลลบไฟล์ทิ้งรายเดือนแบบที่โจทย์ต้องการ!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Lifecycle Rules (กฎวัฏจักรสงสาร)**:
  - ย้ายเตียงให้ถูกลง (Transition) เช่น 30 วัน ย้ายไป Standard-IA -> 90 วัน แช่ตู้เย็น Glacier
  - ฆ่าทิ้ง (Expiration/Purge) เช่น แก่ตายครบ 1 ปี ลบเกลี้ยงบอร์ด S3 โลด!

---
---

## 📌 คำถามที่ 57
**โจทย์:**
A large telecommunications company needs to run analytics against all combined log files from the Application Load Balancer as part of the regulatory requirements.

Which AWS services can be used together to collect logs and then easily perform log analysis?

**ตัวเลือก:**
- [ ] Amazon EC2 with EBS volumes for storing and analyzing the log files.
- [ ] Amazon DynamoDB for storing and EC2 for analyzing the logs.
- [ ] Amazon S3 for storing the ELB log files and an EC2 instance for analyzing the log files using a custom-built application.
- [x] Amazon S3 for storing ELB log files and Amazon EMR for analyzing the log files.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทยักษ์ใหญ่เทเลคอม จำต้องทำรายงานวิเคราะห์กองขยะมโหฬาร "ก้อนล็อกจากประตู **Application Load Balancer (ALB log files)**" รัวๆ เพื่อส่งกติการะดับชาติ
คำถาม: จับคู่เทพเจ้า 2 พระองค์ของค่าย AWS ที่จะประสานพลัง **"เก็บล็อก (collect logs)"** ขยำรวมกับ **"เครื่องบดวิเคราะห์ล็อกแบบชิลๆ (perform log analysis)"** ให้เกิดมรรคผลแบบไม่เหนื่อย ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กของธรรมชาติ... ที่ซุกหัวนอนหลักของล็อกบันทึกเหยื่อคนเข้าคลอดบาลานซ์ (ELB/ALB Access logs) มันจะต้องถูกโยนเข้าห้องเย็น **`Amazon S3`** เท่านั้น! (เก็บเนียนๆ ถูกสุด ทนทาน 99.999999999%) 
- ทริคที่ 2: ถ้าโจทย์บอกว่าต้องการตัวดูดเจาะวิเคราะห์ปั่นเครื่องคั้นน้ำผลไม้ 빅ดาต้า "log analysis" สำเร็จรูป ตัวเลือกเพชฌฆาตปราบเซียนก็คือ **`Amazon EMR (Hadoop / Spark Big Data)`** ซึ่งมันสนิทกับบ่อ S3 อยู่แล้ว!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon S3 for storing ELB log files and Amazon EMR for analyzing the log files.**
- **ทำไมถึงถูก:** นี่คือเมนูเชฟไฟท์เตอร์ติดดาว! สเต็ปแรก: โยนล็อกบ้าบอหน้าด่าน ELB ไปหมักทิ้งไว้ในบ่อราคาถูก `Amazon S3` (ถูกและดี) สเต็ปสอง: จ้างเครื่องปั่นโคตรบิ๊กดาต้า `Amazon EMR (Hadoop/Spark)` มาสูบวิเคราะห์หาพฤติกรรมคนเข้าเว็บแบบลื่นๆ สำเร็จรูป จบงานไว สวยงามไร้ที่ติ

❌ **[ผิด] Amazon S3 for storing the ELB log files and an EC2 instance for analyzing the log files using a custom-built application.**
- **ทำไมถึงผิด:** ยอดเยี่ยมที่เก็บลง `S3` แต่ครึ่งหลังมึงบ้าไปแล้ว! จะไปเสียเงินเช่าเครื่องเซิร์ฟเปล่าๆ `EC2` แล้วมานั่งเขียนโค้ดหลังขดหลังแข็ง "ปั้นแอปขึ้นมาเอง (using a custom-built application)" เพื่อวิเคราะห์สถิติขนาดยักษ์เนี่ยนะ... (ไม่ economy แถมเหนื่อยลากเลือดเลยนะเตง) หันไปใช้โปรแกรมสำเร็จรูป EMR ถูกและง่ายกว่าเยอะ

❌ **[ผิด] Amazon DynamoDB for storing and EC2 for analyzing the logs.**
- **ทำไมถึงผิด:** เมาหมัดโคตรๆ! `DynamoDB` เป็นฐานข้อมูล NoSQL ปรู๊ดปร๊าดระดับมิลลิวินาที 1) มึงจะเอาไฟล์ล็อกขยะไร้ค่ามหาศาลไปยัดลงของแพงระยับทำไม๊! 2) ELB มันเขียนล็อกลง DynamoDB ไม่เป็นโว้ย! (มันรักแต่ S3)

❌ **[ผิด] Amazon EC2 with EBS volumes for storing and analyzing the log files.**
- **ทำไมถึงผิด:** โง่เขลาเบาปัญญา! การเอาไฟล์ล็อกหมื่นล้านไฟล์ไปซุกไว้ในฮาร์ดดิสก์ก้อนก้อนกะรุ่งกะริ่ง `EBS` ที่ถอดเสียบกับเซิร์ฟ `EC2` มันทั้งแพงลิบหูลิบตา แถมไม่ทนทานเท่าระดับ S3 ตึกพังดิสก์พังไฟล์ลบเกลี้ยง 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **ELB Access logs -> ทิ้ง S3**: ตัวเลือกตายตัวหน้าด่านโหลดบาลานซ์ ถ้าจะเก็บล็อกคนเข้าเว็บ ก็ต้องก๊อกโยนใส่ S3 อัตโนมัติ (เป็น Default เลย)
- **Big data / Log Analysis -> EMR (Hadoop)**: ถ้าโจทย์ชอบพูดกรอกหูถึงคำว่า Big Data / Framework ตระกูล Hadoop, Spark, HBase / วิเคราะห์ log level จักรวาล ตอบ EMR ไปได้เลย!

---
---

## 📌 คำถามที่ 58
**โจทย์:**
A manufacturing company has EC2 instances running in AWS. The EC2 instances are configured with Auto Scaling. There are a lot of requests being lost because of too much load on the servers. The Auto Scaling is launching new EC2 instances to take the load accordingly yet, there are still some requests that are being lost.

Which of the following is the MOST suitable solution that you should implement to avoid losing recently submitted requests?

**ตัวเลือก:**
- [ ] Set up Amazon Aurora Serverless for on-demand, auto-scaling configuration of your EC2 Instances and also enable Amazon Aurora Parallel Query feature for faster analytical queries over your current data.
- [x] Use an Amazon SQS queue to decouple the application components and scale-out the EC2 instances based upon the ApproximateNumberOfMessages metric in Amazon CloudWatch.
- [ ] Use larger instances for your application with an attached Elastic Fabric Adapter (EFA).
- [ ] Replace the Auto Scaling group with a cluster placement group to achieve a low-latency network performance necessary for tightly-coupled node-to-node communication.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทโรงงานผีสิง มีเครื่องตัดเย็บ `EC2` ชงออโตสเกลเพิ่มร่างได้
ปัญหาใหญ่สะท้านสวรรค์: งานไหลมาทะลักรัวจัดๆ ถึงแม้ Auto Scaling จะปั่นงอกเครื่องตัวใหม่มาสู้ แต่ **"คำสั่งออเดอร์โดนเตะทิ้งลอยหายไปกลางอากาศเพียบ (requests being lost)"** เพราะเครื่องงอกไม่ทันกิน
คำถาม: ท่ายากสอยคางแบบไหนที่จะ **"แก้ไขกาวอุดรอยรั่วนี้ ไม่ให้มีคลิก/ออเดอร์ไหนหายตายจากโลกนี้ไปฟรีๆ อีกเลยตลอดกาล (avoid losing submitted requests)"** ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์แหกปากร้องให้ช่วย "ป้องกันคลิกหาย / ออเดอร์ลูกค้าหล่นหายช่วงโหลดแตก (avoid losing requests/messages)" วีรบุรุษขุนค้อนอันเดียวที่ช่วยได้คือ **`การตั้งตะกร้าคิวบัตรคอย SQS มารับฝากของไว้ก่อนเดี๋ยวค่อยทะยอยแจก!`** เรียกว่าหลักการ **`Decouple (ตัดความสัมพันธ์แนบชิด)`**
- ทริคที่ 2: พอมีตะกร้าคิว (SQS) เราก็แค่ฉลาดสอน Auto Scaling ลูกรักว่า "ถ้าเห็นบัตรคิวในตะกร้าล้นกระบุง (ApproximateNumberOfMessages metric) ก็จงอ้าปากฮุบสเกลเครื่อง EC2 มาถล่มแดกคิวด่วนๆเลยนะ!" 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an Amazon SQS queue to decouple the application components and scale-out the EC2 instances based upon the ApproximateNumberOfMessages metric in Amazon CloudWatch.**
- **ทำไมถึงถูก:** พระเอกสุดๆ 1. ใช้กะบะทราย `SQS queue` มารองรับออเดอร์ช่วงไฟถล่ม (Decouple แยกชิ้นส่วนทิ้งไว้คิวไม่หายแน่นอน) 2. สั่ง Auto Scaling เอี่ยวไปแอบดูตัวเลขบัตรคิวค้างในบ่อ (ApproximateNumberOfMessages) ถ้ายาวไปก็สั่งงอกร่าง `EC2` มาประมวลผลเพิ่มรัวๆ ตอบโจทย์ออเดอร์ไม่หายล้านเปอร์เซ็นต์

❌ **[ผิด] Replace the Auto Scaling group with a cluster placement group to achieve a low-latency network...**
- **ทำไมถึงผิด:** แก้ผ้าเอาหน้ารอดผิดท่า! ไปรื้อวงออโต้สเกลทิ้ง แล้วเอาเครื่องมากองสุมรวมกันในถ้ำเดียวกัน `(cluster placement group)` เพื่อให้มันต่อจิกคุยกันไวปรู๊ดปร๊าด "มันก็ไม่ได้ช่วยแก้ปัญหาออเดอร์ลูกค้าหล่นหายหน้าเซิฟเวอร์ปะวะ!" ฮ่วย

❌ **[ผิด] Use larger instances for your application with an attached Elastic Fabric Adapter (EFA).**
- **ทำไมถึงผิด:** เอะอะขยายร่างไซส์ยักษ์ (larger instances) แต่มันก็การันตีไม่ได้หรอกนะ ว่าเวฟมนุษย์ถล่มสเตเดี้ยมรอบหน้า เครื่องยักษ์เมิงจะไม่แตกหักหกกระเด็น แถมสายฟ้าเทอร์โบสปอร์ต `Elastic Fabric Adapter (EFA)` มันของชาว HPC ระดับเทพ... ไม่เกี่ยวอะไรกับการอุ้มชูออเดอร์ตกหล่นเลยจ้า! 

❌ **[ผิด] Set up Amazon Aurora Serverless for on-demand, auto-scaling configuration of your EC2 Instances...**
- **ทำไมถึงผิด:** เพี้ยนและย้อนแย้งขั้นสุด!! มหานคร `Amazon Aurora Serverless` คือบริการ "ฐานข้อมูลยืดหยุ่น" ที่สเกลออโต้... **แต่มันเสือกไม่เกี่ยวอัลไล๊กับการไปสเกลแยกร่างเครื่อง EC2 จ้า!!** ออโรร่าสเกลให้แต่เซฟเวอร์ดาต้าเบสมันเองเว้ยแก! ไม่ได้ช่วยเสกเครื่องโฮสให้เลย

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Decoupling (แยกชิ้นส่วนเพื่อรอด)**: ถ้าคุณมีชิ้นส่วน A ป้อนงานให้ B แต่ B รับแดกไม่ทันพ่นทิ้งกระจาย ทิศทางแก้คือเอาถังคิว (SQS) มาคั้นตรงกลาง A จะขี้โยนสาดเท่าไหร่ ถัง SQS ก็อ้าปากอมรับไว้ไม่หาย (แล้วค่อยให้ B ทะยอยแดกจากถังสบายๆ)
- **Auto Scaling + SQS**: ปัจจัยการขยายร่างเครื่อง EC2 ยุคใหม่ ไม่ได้มองพึ่งแค่ CPU แล้ว แต่มองถึง "ปริมาณบัตรคิวที่ล้นทะลักบน SQS (ApproximateNumberOfMessages)" นำมาคำนวณสเกลง่ายโคตร

---
---

## 📌 คำถามที่ 59
**โจทย์:**
A firm has a containerized application that runs on a self-managed Kubernetes cluster. The cluster writes data in an on-premises MongoDB database. A solutions architect is requested to move the service to AWS in order to minimize operational overhead. The firm prohibits any changes to the code.

Which action meets these objectives?

**ตัวเลือก:**
- [ ] Migrate the cluster to an Amazon Elastic Container Service (ECS) cluster using Amazon ECS Anywhere and the database to an Amazon Aurora Serverless database.
- [ ] Migrate the cluster to an Amazon Elastic Container Service (ECS) cluster with the images stored in the Amazon Elastic Container Registry (Amazon ECR). Move the database to an Amazon Neptune database
- [ ] Migrate the cluster to an Amazon Elastic Kubernetes Service (EKS) cluster using Amazon EKS Anywhere and the database to an Amazon DynamoDB table.
- [x] Migrate the cluster to an Amazon Elastic Kubernetes Service (EKS) cluster and the database to an Amazon DocumentDB (with MongoDB compatibility) database.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีแอปพลิเคชันยัดใส่กล่องคอนเทนเนอร์ (containerized) รันเตลิดอยู่บนระบบ **`Kubernetes cluster` ที่ปวดหัวนั่งเฝ้าเทรนเอง (self-managed) ในบ้านออฟฟิศเก่า (on-premises)** 
พร้อมฐานข้อมูลหลังบ้านที่ใช้ **`MongoDB database`** 
สถาปนิกโดนรับน้องให้: ขนย้ายแอปฯ มหานครทั้งหมดนี่ขึ้นไปสถิตบนปุยเมฆ AWS โดยห้ามเหนื่อย (minimize overhead)
และเงื่อนไขจันทคราสสั่งว่า: **"ห้ามแตะต้อง! ห้ามแกะแก้ตัวโค้ดแม้แต่บรรทัดเดียวเด็ดขาด!! (prohibits any changes to the code)"**
คำถาม: จับแพะยัดสว่าน บริการไหนของ AWS โยนครอบทั้งคู่ลงตัวเป๊ะ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: แอปรันบน "Kubernetes เก่า" ยกขึ้นเมฆ AWS ก็ต้องจับยัดลงทะเลสาบสำเร็จรูป **`Amazon EKS (Elastic Kubernetes Service)`** ถึงจะตรงสายเลือดที่สุด 
- ทริคที่ 2: ฐานข้อมูลเก่าคือระบบบอสกองทัพเอกสาร **"MongoDB"** ถ้าโจทย์สั่งตายว่า "ห้ามแก้โค้ดเลยแม้แต่น้อย (no code changes)" ขุมทรัพย์บน AWS ที่ลอกโคลนสเปิร์มความเข้ากันได้ 100% กะมองโกคือ **`Amazon DocumentDB (with MongoDB compatibility)`** จ้า!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Migrate the cluster to an Amazon Elastic Kubernetes Service (EKS) cluster and the database to an Amazon DocumentDB (with MongoDB compatibility) database.**
- **ทำไมถึงถูก:** พระเอกคู่บุญ! ส่วนของคอนเทนเนอร์ K8s ยกย้ายไปนอนชูคอบน `Amazon EKS` (สบายแอส) / ส่วนของฐานข้อมูล MongoDB ก็แค่ย้ายศาลพระภูมิไปสิงใน `Amazon DocumentDB` ที่เป็นเหมือนเครื่องเล่นเกมแฟมิคอม(MongoDB compatibility) ที่ลอกซอร์สมาเลย ไม่ต้องแก้โค้ดแอปแม้แต่อักขระเดียว! ฟินนาเล่!

❌ **[ผิด] Migrate the cluster to an Amazon Elastic Kubernetes Service (EKS) cluster using Amazon EKS Anywhere and the database to an Amazon DynamoDB table.**
- **ทำไมถึงผิด:** เอ้า! จะย้ายขึ้น AWS ดันทะลึ่งไปเตะใช้ `Amazon EKS Anywhere` (บริการที่เอา K8s กลับมายัดใส่เครื่องออฟฟิศชาวบ้าน) แปลกๆนะมึง แถมที่นรกร้ายกว่าคือ... จะให้ย้ายดาต้าเบส MongoDB ไปเป็นตาราง `Amazon DynamoDB` โอ้โฮ! พี่ต้องนั่งรื้อแก้โค้ดชิบหายวายวอดเลย (ผิดกฎต้องห้าม prohibitive changes code แบบเต็มตีน)

❌ **[ผิด] Migrate the cluster to an Amazon Elastic Container Service (ECS) cluster using Amazon ECS Anywhere and the database to an Amazon Aurora Serverless database.**
- **ทำไมถึงผิด:** เหยียบเบรคหัวคว่ำ! จับของเก่า MongoDB (NoSQL ทรงเอกสาร/Document) เอาแม่งไปยัดลงแพลตฟอร์มตรามังกร `Amazon Aurora (Relational DB / SQL โบราณจ๋า)` เป็นการย้ายขั้วที่ "ต้องฉีกโค้ดใหม่ทั้งหมด 1000%" ห่างไกลจากคำว่าไม่แก้โค้ดไปไกลโพ้น 

❌ **[ผิด] Migrate the cluster... (ECS)... Move the database to an Amazon Neptune database**
- **ทำไมถึงผิด:** โอ๊ย ตกคณิตศาสตร์! `Amazon Neptune` มันคือยอดปรมาจารย์ฐานข้อมูลแบบโยงใยแมงมุม (Graph Database) ที่เอาไว้หากิ๊กคนรู้จักของเพื่อนใน Facebook ... เอาของสไตล์ตู้เอกสาร MongoDB ยัดใส่ Neptune นี่หมาไม่เห่าเลยล่ะ แก้โค้ดบานทุ่งรื้อบริษัทใหม่หมดฮะ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Database Migration Matches (สลับหน้าฐานข้อมูลบน AWS)**:
  - MySQL, PostgreSQL -> **Amazon Aurora** (หรือ RDS)
  - MongoDB -> **Amazon DocumentDB** (รอดตายไม่ต้องแก้โค้ดเยอะ)
  - Cassandra -> **Amazon Keyspaces**
- **Kubernetes (K8s)** -> ย้ายมา **Amazon EKS** ง่ายที่สุด

---
---

## 📌 คำถามที่ 60
**โจทย์:**
A data analytics company is setting up an innovative checkout-free grocery store. The Solutions Architect developed a real-time monitoring application that uses smart sensors to collect the items that the customers are getting from the grocery’s refrigerators and shelves, then automatically deduct those items from customer accounts. The company wants to analyze the items that are frequently being bought and store the results in Amazon S3 for durable storage to determine the purchase behavior of its customers.

Which of the following must be used to easily capture, transform, and load streaming data into S3, Amazon OpenSearch Service, and Splunk?

**ตัวเลือก:**
- [ ] Amazon DynamoDB Streams
- [x] Amazon Data Firehose
- [ ] Amazon SQS
- [ ] Amazon Redshift

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทจัดตั้งร้านขายของชำแห่งอนาคต "ขโมยของเดินออกแล้วชัวร์เน็ตหักตังรัวๆ (checkout-free grocery store แบบ Amazon Go)"
มันมีแอปเซนเซอร์อัจฉริยะ (real-time monitoring) คอยดูคอยสูบข้อมูลคนหยิบเป๊บซี่จากตู้แช่แล้วหักเงิน... 
เป้าหมายคือ: บริษัทอยากวิเคราะห์ดาต้ามหาศาลนี้ (streaming data) โยนไปขังไว้ใน `S3` เพื่อหาพฤติกรรมลูกค้า 
คำถาม: เทพเจ้ามังกรตัวไหนที่จะสูบป้อนอ้าปากงับ **"สายน้ำข้อมูลสด (streaming data) และแปรรูป (transform) ยัดเข้าไปใน S3, OpenSearch Service หรือ Splunk แบบอัตโนมัติรวดเร็ว (capture, transform, and load)"** ??? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ตราประทับเทพ! ถ้าราชสำนักถามคำว่า **"ดึง, ดัดแปลงตัวอักษร, แล้วเทยัดลงหลุม (capture, transform, load: ETL) ข้อมูลแบบวอลุ่มสตรีมสดๆ (streaming data)" -> ยัดลงปลายทางออมทรัพย์เด่นๆคือ `S3, Redshift, OpenSearch, Splunk`**... นี่คือสูตรสวดมนต์ของบริการหน้าหล่อที่ชื่อว่า **`Amazon Data Firehose`** ทันที!! (ไม่มีพรายกระซิบตัวอื่นโว้ย)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon Data Firehose**
- **ทำไมถึงถูก:** พระเอกขวัญใจคนขี้เกียจ! `Amazon Data Firehose (เดิมชื่อ Kinesis Data Firehose)` ถูกสร้างมาเพื่อดูดซับท่อน้ำสตรีมมิ่งมโหฬาร (Streaming data) แล้วเอามาบีบอัด เปลี่ยนนามสกุล แถมกรองขยะออก (transform) จากนั้นจัดเรียงยัดโยนส่งพัสดุเป็นก้อนๆ ลงบ้านกัณฑ์เป๊ะๆ อย่าง "S3, Redshift, OpenSearch และ Splunk" แบบอัตโนมัติ (Zero administration ไม่มีโค้ดให้ปวดหัว) ตอบโจทย์แม่นยำ 200%

❌ **[ผิด] Amazon DynamoDB Streams**
- **ทำไมถึงผิด:** หลุดฟอร์มไปหน่อย `DynamoDB Streams` ทำได้แค่เป็นท่อสายวูบวาบคอยฟ้องแอดมินว่า "เฮ้ยๆ ตาราง DynamoDB กูก้อนนี้มีคนแอบมาสั่ง Edit/Delete ข้อมูลใหม่นะเว้ย!" เอาไว้แค่นั้นแหละ มันไม่ได้รับจ้างดูดข้อมูลสตรีมเซนเซอร์ลูกค้าจากอากาศ หรือมีนิสัยกระโดดยัดส่งของข้ามโลกบาร์โค้ดไปให้ S3 หรอกย่ะ

❌ **[ผิด] Amazon SQS**
- **ทำไมถึงผิด:** เอ้าเห้ย `Amazon SQS` คือกะบะรอคิวบัตรรับของ (message queuing) ให้แอปแต่ละก้อนกระโดดมาเอาไปเคี้ยวกิน "มันไม่สามารถดัดแปลงข้อมูล (transform) หรือห้าวเป้งโยนโครมยัดของเข้าบ่อ S3 / OpenSearch สำเร็จรูปด้วยตัวเองได้เลยนะ" (ต้องหาทาสฝีมือมารอเขียนโค้ดรับไปเอง)

❌ **[ผิด] Amazon Redshift**
- **ทำไมถึงผิด:** ขี่ช้างจับตั๊กแตน! `Amazon Redshift` คือตึกใหญ่เครื่องคั้นบิ๊กดาต้าวิเคราะห์ดาต้าแวร์เฮ้าส์ (Data Warehouse) ไม่ได้เป็น "ท่อลำเลียงส่งต่อ" (capture, transform, load streaming data) แต่มันคือ **"ปลายทาง (Destination)"** ที่ไอ้ตัว Firehose ข้อแรกนี่แหละ จะเป็นคนแบกข้อมูลมาโยนส่งให้มันแดกอะ!! แยกแยะให้ถูกจ้า

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon Data Firehose (สายส่งเดลิเวอรี่สูบแล้วยัดป้อน)**: 
  - จุดรับของ: สตรีมมิ่งเซนเซอร์สดๆ, Kinesis DS 
  - จุดโยนของทิ้ง(Destinations): **S3, Amazon Redshift, Amazon OpenSearch, Splunk, Datadog** (จำ 5 ชื่อนี้ไปสอบเลยออกประจำ)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 3 (Part 13: ข้อ 61 - 65)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 61
**โจทย์:**
A company has a global online trading platform in which users from all over the world regularly upload terabytes of transactional data to a centralized Amazon S3 bucket.

Which of the following should be used in the present system to improve throughput and ensure consistently fast data transfer to the S3 bucket, regardless of the user's location?

**ตัวเลือก:**
- [ ] Use Amazon CloudFront Origin Access Control (OAC)
- [x] S3 Transfer Acceleration
- [ ] FTP
- [ ] AWS Direct Connect

---
### 🎯 โจทย์ต้องการอะไร?
แพลตฟอร์มเทรดหุ้นระดับโลก มีผู้ใช้งานจากทั่วทุกมุมโลก (all over the world) ระดมโยนไฟล์ข้อมูลขนาดยักษ์ระดับ Terabytes อัปโหลดเข้าสู่ถัง **Amazon S3** ที่กระจุกอยู่จุดเดียว
คำถาม: ฟีเจอร์ตัวไหนของ AWS ที่เสกมาเพื่อ **"เร่งสปีดการอัปโหลดไฟล์ (improve throughput / fast data transfer)"** เข้าถัง S3 ให้ก๋ากั่นว่องไว ไม่ว่าลูกค้าจะอยู่มุมไหนของโลกก็ตาม (regardless of location) ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ระบุชัดเจนว่าต้องการ **"เร่งความเร็วอัปโหลดไฟล์เข้า S3 ข้ามโลก (fast data transfer to S3 / users all over the world)"** คำตอบมักมีเพียงหนึ่งเดียวที่หน้าตาตรงสเปค คือ **`S3 Transfer Acceleration`**
- ทริคที่ 2: S3 Transfer Acceleration ใช้เครือข่ายใยแมงมุมของ CloudFront (Edge Locations) ทั่วโลกรับไฟล์จากลูกค้าใกล้บ้าน แล้ววาร์ปวิ่งผ่านท่อส่วนตัวความเร็วแสงของ AWS วิ่งตรงดิ่งเข้าถัง S3 โดยตรง (ไวกว่าวิ่งบนอินเตอร์เน็ตปกติหลายร้อยเท่า!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] S3 Transfer Acceleration**
- **ทำไมถึงถูก:** เติมเน็ตทรูความเร็วแสง! ตัว `S3 Transfer Acceleration` เกิดมาเพื่อแก้ปัญหาลูกค้าอยู่ไกลโพ้นทะเลแล้วหน้ามืดอัปไฟล์เข้า S3 ช้า มันจะให้ลูกค้าอัปไฟล์เข้าเซิร์ฟเวอร์ย่อย(Edge) ที่ใกล้บ้านที่สุดก่อน แล้ว AWS จะรับช่วงต่อลากไฟล์มุดท่อด่วน (Optimized network path) พุ่งเข้าถัง S3 แบบรวดเร็วและการันตีสปีดเน็ต

❌ **[ผิด] Use Amazon CloudFront Origin Access Control (OAC)**
- **ทำไมถึงผิด:** ผิดวัตถุประสงค์! ฟีเจอร์ยามเฝ้าประตู `OAC` เค้ามีไว้ "บล็อกไม่ให้คนแอบเข้าหลังบ้าน S3 โดยตรง (ต้องมุดผ่านหน้าเว็บ CloudFront เท่านั้น)" มันไม่ได้เป็นตัวช่วยเร่งสปีด (throughput) การอัปไฟล์จากทั่วโลกเข้าไปเก็บแบบข้อแรก

❌ **[ผิด] AWS Direct Connect**
- **ทำไมถึงผิด:** เล่นใหญ่ระดับขุดเจาะอุโมงค์! `Direct Connect` ลากสายไฟเบอร์ส่วนตัวสุดแพงจากออฟฟิศตัวเองไปโผล่ที่ AWS... แต่โจทย์บอกว่าคุณมี "แขกผู้ใช้จากทั่วทุกมุมโลก (users all over the world)" คุณขึงสายไฟเบอร์แจกแขกทั่วโลกไม่ได้หรอกนะ!

❌ **[ผิด] FTP**
- **ทำไมถึงผิด:** มนุษย์ถ้ำชัดๆ! โปโตคอล `FTP (File Transfer Protocol)` ห่วยแตกโบราณกาล อืดอาดยืดยาด แถมไม่ได้มีฟีเจอร์การันตีความเร็ว (consistently fast data transfer) ใดๆ เลยบนโลกโกลบอล

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **S3 Transfer Acceleration**: เหมาะสุดๆสำหรับบริษัทที่มีลูกค้าอยู่ขั้วโลกเหนือและขั้วโลกใต้ ที่ต้องเหมาส่งไฟล์อัปโหลดก้อนยักษ์เข้าถัง S3 ถังเดียว โดยมันจะลักไก่ใช้ Edge Location ของ CloudFront มาเป็นตัวล่อรับไฟล์แทน

---
---

## 📌 คำถามที่ 62
**โจทย์:**
A company has launched multiple Amazon EC2 instances inside a private subnet of a VPC. The Solutions Architect is reviewing the Network ACL (NACL) rules associated with that subnet to ensure security. The current Inbound Rules for the NACL are configured as follows:
- Rule #100: Allow All Traffic
- Rule #101: Deny TCP port 4000 traffic from 110.238.109.37.
- Rule *: Deny All Traffic

A computer with the IP address 110.238.109.37 attempts to send a request to one of the EC2 instances in this subnet.

What will happen to the incoming request based on the NACL rules?

**ตัวเลือก:**
- [x] It will be allowed.
- [ ] Initially, it will be allowed and then after a while, the connection will be denied.
- [ ] It will be denied.
- [ ] Initially, it will be denied and then after a while, the connection will be allowed.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมาตรวจเวรยามหน้าตึก **Network ACL (NACL)** ซึ่งตั้งกฎกติกาการปล่อยคนเข้าตึก (Inbound Rules) ดังนี้:
- **ป้ายกฎหมายเลข 100:** อนุญาต (Allow) ให้ทุกคนทุกสรรพสิ่งเข้าได้!
- **ป้ายกฎหมายเลข 101:** สั่งไม่อนุญาต (Deny) ห้ามไอ้หมายเลขบัตรปชช. 110.238.109.37 เข้ามาพอร์ต 4000 เด็ดขาด!
- กฎผีเครื่องหมายดอกจัน *: ไม่ให้ใครเข้าทั้งนั้น!
สถานการณ์: ไอ้หนุ่ม IP 110.238.109.37 คนนั้นเดินดุ่มๆ เข้ามาขอพอร์ตอนุญาต
คำถาม: ทายซิว่า รปภ. NACL จะจัดการกับหมอนี่ยังไง (What will happen) ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กแผ่นศิลาจารึก! "ตึกระฟ้า NACL นั้นซื่อตรง **`อ่านและประมวลผลกฎจากตัวเลขน้อยที่สุด ไปหาตัวเลขมากที่สุดเสมอ (Sequentially, lowest to highest)`**" 
- ทริคที่ 2: เคล็ดวิชาฟันฉับ! ทันทีที่ NACL ตรวจเจอกฎข้อไหนตรงกับสถานการณ์ **`มันจะตัดสินใจเดี๋ยวนั้นทันที (First-match policy)`** โดยขี้เกียจก้มหน้าลงไปอ่านกฎข้อข้างล่างที่เหลือ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] It will be allowed.**
- **ทำไมถึงถูก:** วิ่งชนกฎข้อ 100 โครมเบ้อเร่อ! พอไอ้หนุ่ม IP นี้เดินเข้ามา NACL จะหรี่ตาอ่านป้าย **#100** เป็นข้อแรก ซึ่งป้ายสลักว่า "Allow All Traffic (ให้ทุกคนเข้าได้)" รปภ. ก็เลยเปิดประตูให้มันเดินลอดเข้าตึกอย่างสบายใจ โดยไม่ได้ชำเลืองตาลงไปอ่านป้าย #101 ที่เขียนสั่งห้าม IP นี้ไว้เลยแม้แต่นิดเดียว! (ถ้าอยากแบนหมอนี่ คุณต้องเอากฎ Deny ไปไว้หมายเลข #99 ต่างหากล่ะ!)

❌ **[ผิด] It will be denied.**
- **ทำไมถึงผิด:** ถ้าคุณตอบข้อนี้ แปลว่าคุณโดนโจทย์หลอกเอาป้าย #101 สั่งแบนมาหลอกล่อให้คุณหลงกล NACL ไม่ฉลาดพอที่จะหาสรุปผลรวม มันทื่อๆ อ่านเจอ #100 บอกว่าเข้าได้ก็จบปิ๊ง อนุญาตทันที

❌ **[ผิด] Initially, it will be allowed and then after a while, the connection will be denied.**
- **ทำไมถึงผิด:** เพ้อเจ้อทะลุมิติ! NACL เป็นรปภ.สมองปลาทอง (Stateless) มันดูเป็นรอบๆ ไม่มีการมาอนุญาตให้เดินเล่นก่อนแล้วค่อยส่งการ์ดไปลากคอออกทีหลัง (No dynaminc reassess) จบคือจบช็อตเดียว

❌ **[ผิด] Initially, it will be denied and then after a while, the connection will be allowed.**
- **ทำไมถึงผิด:** บ้าบอคอแตกเหมือนข้อที่แล้ว NACL ตัดสินฟันฉับทีเดียว ไม่มีเปลี่ยนใจ!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **NACL (Network Access Control List)**: ยามเฝ้ารั้วหมู่บ้าน (Subnet)
  - อ่านกฎจาก **น้อยไปมาก** เสมอ! (10 >> 20 >> 30 ...)
  - ถ้าเจอกฎที่เข้าข่าย **หยุดอ่านทันที** แอคชั่นตามนั้นเลย! (First-match)
  - ความจำปลาทอง (Stateless) ขาเข้าอนุญาต ขาออกต้องดูกฎขาออกด้วย 

---
---

## 📌 คำถามที่ 63
**โจทย์:**
A Solutions Architect is unable to connect to the newly deployed EC2 instance via SSH using a home computer. However, the Architect was able to successfully access other existing instances in the VPC without any issues.

Which of the following should the Architect check and possibly correct to restore connectivity?

**ตัวเลือก:**
- [ ] Configure the Network Access Control List of your VPC to permit ingress traffic over port 22 from your IP.
- [ ] Configure the Security Group of the EC2 instance to permit ingress traffic over port 3389 from your IP.
- [x] Configure the Security Group of the EC2 instance to permit ingress traffic over port 22 from your IP.
- [ ] Use Amazon Data Lifecycle Manager.

---
### 🎯 โจทย์ต้องการอะไร?
คุณสถาปนิกปั้นเครื่อง **EC2 (Linux) ใหม่เอี่ยม** แต่กลับงอแง **มุดจอเจาะเข้าเครืองพอร์ต SSH ไม่ได้!! (unable to connect via SSH)** 
ทั้งๆที่เครื่อง EC2 รุ่นพี่ตัวอื่นๆ ในดงเพื่อน VPC วิ่งมุดเข้าได้ปกติลื่นไหลดี
คำถาม: งมหาจุดเกิดเหตุซิว่า แกตั้งค่าบัคติดบล็อกที่ด่านตรวจไหน ต้องแก้อะไร ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ระบุเจาะจงว่า "เครื่องชาวบ้านวงอื่นในรั้วเดียวกันเข้าได้หมด ติดปัญหาแค่ไอ้เครื่องงอก **ใหม่แกะกล่องตัวนี้ตัวเดียว!**" เป้าเป้าหมายชี้ชัดไปที่ยามเฝ้าหน้าประตูกุฏิเครื่องนั้นๆ หรือก็คือ **`Security Group (ยามหน้ากุฏิรายตัว)`** !! (ไม่ใช่ NACL ที่เป็นยามเฝ้ารั้วหน้าหมู่บ้าน เพราะถ้ายามหน้าหมู่บ้านมันตั้งบล็อก เครื่องชาวบ้านตัวอื่นต้องเข้าไม่ได้ไปด้วยสิ)
- ทริคที่ 2: จะมุดเจาะรีโมทหน้าจอดำ **`SSH (Linux)`** พอร์ตสากลศักดิ์สิทธิ์ประจำโลกคือหมายเลข **`พอร์ต 22 (Port 22)`** เท่านั้นท่องให้ขึ้นใจ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the Security Group of the EC2 instance to permit ingress traffic over port 22 from your IP.**
- **ทำไมถึงถูก:** เพอร์เฟคปังปุริเย่! สาเหตุคลาสสิกของมือใหม่ AWS คือลืมหยอดเหรียญด่านยามหน้าห้อง `Security Group` ขาเข้า (ingress) ให้เป็น **"ยอมรับแสงสว่างให้มุดพอร์ต 22 (SSH)"** มาจาก IP คอมพิวเตอร์เล่นเกมที่บ้านกูนี่แหละครับ หายปลิดทิ้ง!

❌ **[ผิด] Configure the Network Access Control List of your VPC to permit ingress traffic over port 22 from your IP.**
- **ทำไมถึงผิด:** วินิจฉัยผิดที่! `NACL` ยามเฝ้ารั้วหมู่บ้าน โนบรามันไม่ได้พัง! ก็โจทย์อุตส่าห์บอกใบ้มาโต้งๆว่า "เครื่องบ้านอื่นชั้นยังแวะไปทักทาย SSH ตีไข่แตกเข้าได้ปกติเลย (successfully access other existing instances)" แปลว่าประตูรั้วใหญ่หน้าหมู่บ้านแหกช่องโหว่ไว้แล้วจ้า 

❌ **[ผิด] Configure the Security Group of the EC2 instance to permit ingress traffic over port 3389 from your IP.**
- **ทำไมถึงผิด:** เอ้าผิดพอร์ต! จะมารีโมทหน้าจอดำ SSH แต่ดันเดินไปเคาะห้อง **`พอร์ต 3389 (RDP - Remote Desktop Protocol)`** รีโมทหน้าจอสีๆของอีเจ๊ Windows เค้าทำไมฮะ 

❌ **[ผิด] Use Amazon Data Lifecycle Manager.**
- **ทำไมถึงผิด:** พาลเรือตกคลอง! `Data Lifecycle Manager (DLM)` เค้าเอาไว้ตั้งค่ารับเหมามาช่วย Backup ดูดข้อมูล Snapshot ฮาร์ดดิสก์ EBS ทิ้งไว้ ไม่ได้เกี่ยวกับการชุ่ยลืมเปิดพอร์ตไฟร์วอลล์รับลูกค้าเร๊ย!

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- ท่องพอร์ตคลาสสิกไว้สอบ!:
  - **SSH (หน้าจอดำ Linux)** = Port 22
  - **RDP (หน้าจอสี Windows)** = Port 3389
  - **HTTP (เว็บกากๆ)** = Port 80
  - **HTTPS (เว็บรวยขลิบทอง)** = Port 443

---
---

## 📌 คำถามที่ 64
**โจทย์:**
The media company that you are working for has a video transcoding application running on Amazon EC2. Each EC2 instance polls a queue to find out which video should be transcoded, and then runs a transcoding process. If this process is interrupted, the video will be transcoded by another instance based on the queuing system. This application has a large backlog of videos which need to be transcoded. Your manager would like to reduce this backlog by adding more EC2 instances, however, these instances are only needed until the backlog is reduced.

In this scenario, which type of Amazon EC2 instance is the most cost-effective type to use?

**ตัวเลือก:**
- [ ] On-demand instances
- [ ] Reserved instances
- [x] Spot instances
- [ ] Dedicated instances

---
### 🎯 โจทย์ต้องการอะไร?
โรงงานเรนเดอร์วิดีโอ ใช้เครื่อง `EC2` หลายสิบตัวดึงงานเข้าคิวมาเรนเดอร์
ความเจ๋งคือ: ถ้าระหว่างทำงาน จู่ๆมีมือดียกเลิกพังเครื่อง EC2 ทิ้งกระทันหัน (interrupted) ตัวงานก็จะแค่เด้งกลับไปนอนรอที่บัตรคิว แล้วเดี๋ยวมีเพื่อน EC2 เครื่องอื่นมางับงานไปทำต่อจนจบเอง (เก่งสัส ไม่แคร์สื่อ!)
ปัญหาคือตอนนี้: กองงานคลิปวิดีโอทับถมภูเขาดิน (large backlog) บอสเลยสั่งงอกเครื่อง EC2 ชั่วคราวมาปั่นงานให้จบไวๆ (จบปุ๊บโล๊ะทิ้ง)
คำถาม: เพื่อสนองกิเลสแสนเหนียวของบอส ต้องเหมาเช่า EC2 ประเภทยาจกไหนที่ **"ประหยัดตังค์โคตรๆ (cost-effective)"** ให้เหมาะกับงานนี้สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: งานที่ไม่ซีเรียส **"สามารถโดนเตะปลั๊กหลุดกะทันหันกลางคันได้โดยระบบไม่พัง (process interrupted/gracefully handle)"** = นี่คืองานชั้นเลิศของพวกตลาดนัดแบกะดิน **`Spot instances`** (ของเหลือทิ้งบน AWS ราคาถูกขี้รด)
- ทริคที่ 2: และเมื่อมีคำห้อยท้ายว่า "งานค้างกองโต อยากได้ปั่นชั่วคราวแล้วทิ้ง ประหยัดตังค์สุดติ่ง" คำตอบก็ชี้ชัดล้านเปอร์เซ็นต์ไปที่ `Spot instance (ถูกกว่าซื้อปกติ 90%)`

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Spot instances**
- **ทำไมถึงถูก:** นางเอกสายเหนียว! `Spot Instance` คือเครื่องเช่า EC2 โละสต๊อก ที่ AWS เอามาตั้งแผงเซลล์ลดกระหน่ำถึง 90% แลกเปลี่ยนกับข้อแม้ร้ายกาจว่า "AWS มีสิทธิ์ถีบหัวส่งริบเครื่องคืนได้ทุกเมื่อ โดยจะเตือนล่วงหน้าแค่ 2 นาที" แต่เผอิญว่าแอปในโจทย์มันเทพ โดนเตะหลุดคิวงานก็ไม่พังไปรอคนอื่นมาทำต่อได้ (Fault-Tolerant) เลยเข้าทางซุบซิบนินทากับ Spot อย่างจัง! ประหยัดตังค์สุดๆ บอสยิ้มแฉ่ง

❌ **[ผิด] On-demand instances**
- **ทำไมถึงผิด:** ซื้อราคาเต็มหน้าเคาน์เตอร์! `On-demand` คือการซื้อมาเปิดใช้แพงๆ แบบไม่ต้องต่อคิวห้ามใครแย่ง (จ่ายเต็มชั่วโมง) ถึงแม้มันจะเปิดๆปิดๆชิลดี แต่มันก็ยังแพงมหาโหดกว่าชาวบ้านตลาดนัด Spot อย่างฟ้ากับเหว ไม่ตอบคำว่า cost-effective เด็ดขาด

❌ **[ผิด] Reserved instances**
- **ทำไมถึงผิด:** แต่งงานผูกมัด! `Reserved` คือการเซ็นสัญญาจองโลง 1-3 ปี แลกส่วนลดครึ่งราคา... บ้าไปแล้ว! งานนี้บอสต้องการงอกเครื่องมาปั่นแฟ้มขี้เกียจแค่ "ชั่วคราว (until backlog is reduced)" แล้วทิ้งโว้ย ไปบ้าเลือดเซ็นสัญญา 1 ปี เสียค่าโง่ทำแพะอะไร

❌ **[ผิด] Dedicated instances**
- **ทำไมถึงผิด:** ชีวิตคฤหาสน์หรู! `Dedicated` คือการเช่าเหมาตู้ฮาร์ดแวร์สแตนเลสส่วนตัว ไม่ปะปนสายไฟเตียงติดกับลูกค้าไข่ต้มคนอื่น ราคาจุกอกพรีเมี่ยมสุดๆ ผิดคอนเซปบอสสายประหยัดอย่างจัง 

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- เลือกเครื่อง EC2 ฉบับย่อ:
  - **On-Demand**: ใช้งานแบบไม่มีเวลาตายตัว จ่ายเรทเต็ม (แพง)
  - **Reserved (RI)**: รันยาวเหยียดแน่นอน 24ชม. นาน 1-3 ปี (ลดเยอะ)
  - **Spot**: งานตะกร้าคิวประมวลผล สารพัดนึก งานขาดตอนได้ โดนถีบหัวส่งได้ (ลดเว่อร์ 90%)

---
---

## 📌 คำถามที่ 65
**โจทย์:**
A Solutions Architect for a global news company is configuring a fleet of EC2 instances in a subnet that currently is in a VPC with an Internet gateway attached. All of these EC2 instances can be accessed from the Internet. The architect launches another subnet and deploys an EC2 instance in it, however, the architect is not able to access the EC2 instance from the Internet.

What could be the possible reasons for this issue? (Select TWO.)

**ตัวเลือก:**
- [x] The route table is not configured properly to send traffic from the EC2 instance to the Internet through the Internet gateway.
- [ ] The Amazon EC2 instance does not have an attached Elastic Fabric Adapter (EFA).
- [ ] The Amazon EC2 instance is not a member of the same Auto Scaling group.
- [x] The Amazon EC2 instance does not have a public IP address associated with it.
- [ ] The route table is not configured properly to send traffic from the EC2 instance to the Internet through the customer gateway (CGW).

---
### 🎯 โจทย์ต้องการอะไร?
สำนักข่าวเพิ่งตั้งตู้แร็ค **EC2 ห้องเก่าๆ (Subnet 1)** โดยเจาะประตูต่อเน็ต `Internet Gateway (IGW)` เรียบร้อย เครื่องแก๊งแรกเล่นเน็ตเฟี้ยวฟ้าวได้หมด
ปัญหาเกิด!: แอดมินดันไปทะลึ่งสร้าง **บ้านใหม่ (Subnet 2) และเสกยัด EC2 ก้อนใหม่ลงไป... ถถถ! ปรากฎว่าไอ้ต้าวเครื่องใหม่แม่งเล่นเน็ต/เข้าจากเน็ต ไม่ได้เลยว่ะ!!** (not able to access from the Internet)
คำถาม: ทายซิว่า "ความสะเพร่าขี้ลืม" ของแอดมินคนนี้ เกิดจุดบัคตรงเรื่องอะไร **2 ประการ ???**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กแผ่นดินเกิด! ถ้าอยากให้เครื่อง EC2 โหลๆซักเครื่องสามารถสัมผัสโลกสว่างอินเตอร์เน็ต (Internet-facing) เครื่องนั้น "จำเป็นต้องพกบัตรประชาชนพาสปอร์ต **`(Public IP address / Elastic IP)`** ติดหน้าผากไว้เสมอ" (ไม่งั้นคนนอกจะหาบ้านมันไม่เจอ)
- ทริคที่ 2: บ้านแกสร้างประตูรั้ว (IGW) แล้วก็จริง... แต่แกดันเสือกสร้างหมู่บ้านใหม่ (Subnet 2) ซึ่งหมู่บ้านใหม่ดัน "ยังไม่ได้ขีดป้ายจราจรบอกทาง **`(Route table)`** ชี้เป้าให้ออกไปหาประตูรั้ว IGW บานที่ว่าเลย!" (รถมันก็หลงทางสิครับ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The Amazon EC2 instance does not have a public IP address associated with it.**
- **ทำไมถึงถูก:** ตกม้าตายตอนจบ! ต่อให้คุณลากเส้นเน็ตหรูแค่ไหน แต่ถ้าตอนสร้างเครื่อง EC2 คุณลืมติ๊กตั้งค่าประจุพาสปอร์ตสติ๊กเกอร์ `Public IP address` (หรือ IP ขาออกสาธารณะ) มันก็หลุดจากเรดาร์ดาวเทียม ใครจะไปพิมเข้าเว็บ URL คุณจากโลกภายนอกเจอเล่า!

✅ **[ถูกต้อง] The route table is not configured properly to send traffic from the EC2 instance to the Internet through the Internet gateway.**
- **ทำไมถึงถูก:** ใช่แล้ว! ถึงแม่ข่าย VPC จะมีกำแพงทลายทะลวงเปิดประตูซุ้ม `Internet gateway (IGW)` เตรียมให้แล้วก็ตาม... แต่คุณสร้าง "หมู่บ้าน Subnet งอกใหม่กิ๊ก" ขาดตารางจราจรของหมู่บ้านที่ชื่อว่า `Route table` ที่ลืมใส่กฎสลักชี้ทางว่า "ใครอยากออกเน็ต 0.0.0.0/0 ให้วิ่งไปลอดซุ้มประตูยานแม่ IGW นะลูก" มันก็เลยหลุดอยู่ในกะลานั่นเอง

❌ **[ผิด] The route table is not configured properly to send traffic from the EC2 instance to the Internet through the customer gateway (CGW).**
- **ทำไมถึงผิด:** งงเต๊กกงเต๊ก! ประตูง้างออกเน็ตภายนอกเราเรียกว่า `Internet gateway (IGW)` จ้า ไม่ใช่ไอ้ช่องแอร์ `Customer gateway (CGW)` ที่เค้าเอาไว้ลากท่อ VPN ไพรเวทมุดใต้ดินต่อเข้าบริษัทหัวเมืองเก่าหรอกนะ คนละโยดเลย

❌ **[ผิด] The Amazon EC2 instance is not a member of the same Auto Scaling group.**
- **ทำไมถึงผิด:** มั่วแพะจับแกะ! ไอ้วงเวียนแห่ประท้วง `Auto Scaling Group` เค้ามีไว้เสกแยกร่างเครื่อง EC2 จ้า มันไม่เกี่ยวบั้นท้ายอะไรเลยกับการตั้งค่าเส้นทางจราจรเล่นอินเตอร์เน็ตนะ ถึงอยู่คนเดียวมันก็เดินไปเล่นบ้านใครก็ได้

❌ **[ผิด] The Amazon EC2 instance does not have an attached Elastic Fabric Adapter (EFA).**
- **ทำไมถึงผิด:** เอะอะก็บูสท์! คุณไม่จำเป็นต้องซื้อสายเบ่งพลังคอสโม `Elastic Fabric Adapter (EFA)` กิ๊กก๊อกมาเสียบเครื่อง เพื่อจะให้มันเล่นเน็ตส่งเมล์ชาวบ้านได้นะ! (EFA มันเอาไว้ให้สแกนเนอร์ HPC ไฮสปีดเขาคุยกันหรอกนะเฟ้ย)

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- เช็คลิสต์รอดตาย EC2 ทะลุเข้าเน็ต:
  1. มีซุ้มประตู **Internet Gateway** ใน VPC
  2. มีแผ่นป้ายจราจรชี้เป้า **Route Table (0.0.0.0/0 -> IGW)**
  3. ยามตึก **NACL / Security Group** ยอมให้รถวิ่งเข้าออก
  4. เครื่อง EC2 มีดั้งจมูกเปิดตัว **Public / Elastic IP**

---
---


