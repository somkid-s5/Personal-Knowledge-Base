# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 1: ข้อ 1 - 10)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 1
**โจทย์:**
A new DevOps engineer has created a CloudFormation template for a web application and she raised a `pull request` in GIT for you to check and review. After checking the template, you immediately told her that the template will not work. Which of the following is the reason why this CloudFormation template will fail to deploy the stack?

```json
{
 "AWSTemplateFormatVersion":"2010-09-09",
 "Parameters":{
   "VPCId":{
     "Type":"String",
     "Description":"manila"
 },
 "SubnetId":{
   "Type":"String",
   "Description":"subnet-b46032ec"
 }
},
"Outputs":{
 "InstanceId":{
  "Value":{
   "Ref":"manilaInstance"
  },
  "Description":"Instance Id"
  }
 }
}
```

**ตัวเลือก:**
- [x] The Resources section is missing.
- [ ] The Conditions section is missing.
- [ ] The value of the AWSTemplateFormatVersion is incorrect. It should be 2017-06-06.
- [ ] An invalid section named Parameters is present. This will cause the CloudFormation stack to fail.

---
### 🎯 โจทย์ต้องการอะไร?
เด็กใหม่หน้ามนเขียนโค้ด `CloudFormation` เป็นไฟล์ JSON ส่งมาให้ตรวจ... แต่พอดูปุ๊บ เราด่าสวนกลับไปแบบไม่ต้องคิดเลยว่า **"สคริปต์กากๆ นี่ยังไงก็พัง รันโดนด่าแน่นอนโว้ยย!!"**
คำถาม: จุดบอดบรรลัยพินาศในโค้ด JSON ข้างต้นคือตรงไหนวะ!?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! บทบัญญัติแห่งกฎหมาย `CloudFormation`
- โค้ดของ CloudFormation มีส่วนประกอบ (Sections) มากมาย (เช่น Parameters, Outputs, Mappings) แต่... **กระดูกสันหลังที่บังคับว่า "ห้ามหายเด็ดขาดดดด (The ONLY required section)!!" ก็คือช่อง `Resources` (เอาไว้สั่งสร้าง Resource ถาวรอะไรบน AWS)**
- แหกตาดูกล่อง JSON ในโจทย์สิฮะ... มีแต่ช่อง FormatVersion, Parameters, Outputs แต่เสือกไม่มีช่อง Resources!! แล้วมึงจะให้ AWS สร้างห่าอะไรให้มึงรันละฮะ!? กาตอบไปเลยว่าหน้าตัด Resources หายไปฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The Resources section is missing.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราสวดมนต์เป๊ะฮะลูกพี่! ส่วนหัวใจสำคัญที่สุดและเป็นส่วนเดียวที่ "ภาคบังคับ" ของ CloudFormation ก็คือท่อน `Resources` (จุดสั่งการช่างไม้ตีตะปูสร้างตึก)! ถ้าท่อนนี้โดนขโมยลบออกไป ระบบมันก็ไม่รู้จะสร้างอะไรให้มึงสิฮะ พังพินาศตั้งแต่บรรทัดแรก!

❌ **[ผิด] The Conditions section is missing.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! ถังขยะ `Conditions` (ปุ่มเงื่อนไข If-Else) แม่งเป็นแค่ออฟชันเสริมเติมความเก๋ไก๋เท่านั้นโว้ย! ไม่มีก็ไม่ได้ทำให้เซิร์ฟเวอร์ระเบิดแต่อย่างใด! ใช้งานผิดประเภทอย่างรุนแรงฮะ!

❌ **[ผิด] The value of the AWSTemplateFormatVersion is incorrect. It should be 2017-06-06.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! วันที่ของเวอร์ชั่น CloudFormation (AWSTemplateFormatVersion) ที่พระเจ้าประทานพรและยังใช้งานเป็นสากลจนปัจจุบันคือวันที่ **`"2010-09-09"`** เว้ยย!! ไอ้รุ่น 2017-06-06 เหี้ยอะไรนั่นอาจารย์แกนั่งเทียนเขียนแต่งขึ้นมาหลอกเด็กอมมือล้วนๆ ฮะบ้าบอที่สุด!

❌ **[ผิด] An invalid section named Parameters is present. This will cause the CloudFormation stack to fail.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! กล่อง `Parameters` มันเอาไว้เป็นจุดตั้งคำถามให้แอดมินกรอกตัวแปรก่อนรันสคริปต์ฮะ (เช่นจะกรอก ID VPC อะไร?) แม่งเป็นส่วนประกอบมาตรฐานสากลโลกปกติมากๆ ไม่ใช่วายร้ายที่ทำให้โค้ดพังแต่อย่างใด มั่วซั่วจับแพะชนแกะฮะ! 

---
---

## 📌 คำถามที่ 2
**โจทย์:**
A company is running an on-premises application backed by a 1TB MySQL 8.0 database. A couple of times each month, the production data is fully copied to a staging database at the request of the analytics team. The team can't work on the staging database until the copy is finished, which takes hours.

Throughout this period, the application experiences intermittent downtimes as well. To expedite the process for the analytics team, a solutions architect must redesign the application's architecture in AWS. The application must also be highly resilient to disruptions.

Which combination of actions best satisfies the given set of requirements while being the most cost-effective? (Select TWO)

**ตัวเลือก:**
- [x] Use an Amazon Aurora database with Multi-AZ Replicas.
- [x] Clone the production database in the staging environment using Aurora cloning.
- [ ] Take a manual snapshot and restore it to a database in the staging environment.
- [ ] Replicate the production database to a staging database using the mysqldump client utility
- [ ] Use an Amazon RDS database in a Multi-AZ Deployments configuration

---
### 🎯 โจทย์ต้องการอะไร?
ดราม่าปะทุหลังบ้าน: บริษัททำเหมืองข้อมูลมีโต๊ะ **`MySQL`** ยักษ์ 1TB อยู่ใต้ถุนออฟฟิศนายจ้าง (on-premises)
ความระยำคือ: ทุกๆ เดือน ทีมมดงาน (Analytics team) จะดันทุรัง **"ขอก็อปปี้กระดานโต๊ะพ่วงข้อมูลสด (Production) ไปใส่ถังทดสอบ (Staging)"**... ซึ่งการดึงสำเนาข้อมูลยักษ์ทีละ 1TB แม่งใช้เวลาลากเลือดเป็นชั่วโมงๆ และช่วงเวลาดึงกระชากนั้น **"โต๊ะหลักเจ๊งกระตุกค้าง (Intermittent downtimes) บรรลัยพินาศด้วย!"**
บอสสั่งกร้าว: "มึงหาทางย้ายมันขึ้นสวรรค์ AWS ทีซิ! หากิมมิคอะไรสักอย่างมาเสกก็อปปี้โต๊ะทดสอบให้รวดเร็วฉับไว และแก้ปัญหาแอปกระตุกคว่ำตายให้กูซะ! (และเน้นประหยัดๆ ด้วยนะ!)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของการเล่นแร่แปรธาตุกระดูกหน้าผอม AWSฮะ!
- เจอปัญหา **"การดูดก็อปปี้สเต็มเซลล์ฐานข้อมูลสด ไปเป็นฐานข้อมูลชิ่งตัวปลอม (Staging/Testing) แล้วแม่งกินเวลาโคตรนาน แถมกระทบโตกินข้าวชาวบ้านจนแอปกระตุกร่วง"**
- คาถายมราชรัวฮีลอันดับ 1 ของจักรวาล คือการหอบผ้าหอบผ่อนหนีไปซบอกลูกรัก **`Amazon Aurora`** ซะ!! เพราะ Aurora มีลูกเล่นเวทมนตร์แผลงศรชื่อ **`Aurora Cloning`** แม่งคือการโคลนนิ่งแยกพาร์ทิชั่นหน้ากระจกเสี้ยววินาทีดื้อๆ ไม่ต้องเทก๊อปปี้ขยะซ้ำซ้อน ไม่ต้องรอโหลดข้ามวันข้ามคืน (Fast) และประหยัดโคตรๆ!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an Amazon Aurora database with Multi-AZ Replicas.**
✅ **[ถูกต้อง] Clone the production database in the staging environment using Aurora cloning.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ประสานอินทรีสองหมัดเข้าด้วยกัน!! แกนหลักแรกคือ มึงต้องเปลี่ยนวิถีชีวิตตายห่าไปคุกเข่ากราบ **`Amazon Aurora (Multi-AZ)`** เพื่อเสริมสิริมงคลให้ระบบรันหน้าด้านหน้าทนแก้แอปกระตุกดับ (Resilient)! และแกนหลักที่สอง... มึงกดปุ่มเวทมนตร์ **`Aurora Cloning`** เสกกระดานกระจกตู้ปลา Staging ให้ทีม Analytics ใช้งานเสี้ยววินาที!! โคลนไวปรื๊ดดด! ไม่กระทบใครเลย ทรงพลังโครตๆ! ฮาร์ดคอร์เคลียร์โจทย์ 100%!

❌ **[ผิด] Use an Amazon RDS database in a Multi-AZ Deployments configuration**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! ลุง `RDS` ธรรมดาสามัญชน แม่งมีลูกเล่นปกป้องไม่ให้ตายด้วย Multi-AZ จริงฮะ... แต่ลุงแกมันคนซื่อๆ ไม่มีท่าไม้ตายเสกกระจกแยกเงา **`Cloning`** เหี้ยอะไรแบบท่านมหาเทพ Aurora เลยนะเว้ย! การจะเสกโต๊ะปลอมให้หลานๆ มึงต้องกดดาวนโหลด Snapshot ตาตั้งทั้งชั่วโมงอยู่ดี ไม่ได้แก้ระวิงปัญหาห่าอะไรเลยฮะ! 

❌ **[ผิด] Take a manual snapshot and restore it to a database in the staging environment.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญทุบหินจุดไฟ `Manual Snapshot` แล้วรีสโตร์คลอดตัวใหม่เนี่ย... แม่งดักดานเหมือนสมัยอยุธยาฮะ! การรีดไส้ข้อมูลระดับ 1TB ย้ายศพไปโต๊ะตัวโต๊ะหนึ่ง แม่งกินเวลาลากไส้หลายชั่วโมงบรรลัยเหมือนเดิมฮะ ไม่ได้ช่วยความฉับไวติดจรวดอ้วกแตกแบบบอสสั่งเลย!

❌ **[ผิด] Replicate the production database to a staging database using the mysqldump client utility**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้ท่าคนป่า `mysqldump` เนี่ย แม่งคือการปล้ำรุมโทรมโต๊ะหลัก บีบบังคับสไลด์ถกเถียงส่งข้อมูลออกมารายบรรทัดโคตรทรยศฮะ! วิธีสวะๆ แบบนี้แหละคือต้นเหตุของปัญหา **"กระทบโตกินข้าวหลัก ทำ Performance แอปหลักกระตุกแผ่นดินไหว"** ที่เจ้านายเพิ่งบ่นอ้วกแตกมาหมาดๆ โว้ยยย!! ชี้ทางลงเหวฆ่าตัวตายชัดๆ! 

---
---

## 📌 คำถามที่ 3
**โจทย์:**
A software development company has hundreds of Amazon EC2 instances with multiple Application Load Balancers (ALBs) across multiple AWS Regions. The public applications hosted in their EC2 instances are accessed on their on-premises network. The company needs to reduce the number of IP addresses that it needs to regularly whitelist on the corporate firewall device.

Which of the following approach can be used to fulfill this requirement?

**ตัวเลือก:**
- [x] Use AWS Global Accelerator and create an endpoint group for each AWS Region. Associate the Application Load Balancer from each region to the corresponding endpoint group.
- [ ] Create a new Lambda function that tracks the changes in the IP addresses of all ALBs across multiple AWS Regions. Schedule the function to run and update the corporate firewall every hour using Amazon CloudWatch Events.
- [ ] Use AWS Global Accelerator and create multiple endpoints for all the available AWS Regions. Associate all the private IP addresses of the EC2 instances to the corresponding endpoints.
- [ ] Launch a Network Load Balancer with an associated Elastic IP address. Set the ALBs in multiple Regions as targets.

---
### 🎯 โจทย์ต้องการอะไร?
ปัญหาโลกแตก: บริษัทกระจายตึกรังนก `EC2` และประตูค่าย `ALB` ไปทั่วแผ่นดินหลายทวีป **(Across multiple AWS regions)**
ฝ่าย IT Security หลังบ้านออฟฟิศนายจ้างประสาทเสีย: "ไอ้เหี้ย! เครื่องไฟร์วอลล์กูพัง!! วันๆ กูต้องมานั่งเพิ่มนั่งลบ IP ของพวกมึง (Whitelist) เป็นร้อยๆ เบอร์ใส่หน้าตู้ เพราะ ALB มึงชอบกระเพื่อม IP ดิ้นไปเรื่อย!"
บอสสั่งกร้าว: "มึงหาเตารีดอะไรก็ได้ มารวบตึง **ยุบรหัส IP พวกนั้นให้เหลือแค่ 'ป้ายถาวร (Static IP)' ไม่กี่ป้ายทีซิ!** ยามไฟร์วอลล์กูจะได้ปลดแอกพอกันที!" 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้าฮะ 
- คาถายันต์สกัดผี: ทันทีทีในโจทย์ฟาดงวงฟาดงาคำว่า **"ฉันอยากรวบแอปหลายๆ ทวีป (Multiple Regions) ให้เหลือป้ายทางเข้า 'IP ถาวรไม่ดิ้นหนี (Static IP)' แค่ 2 ป้าย... เพื่อจะได้ไม่ต้องเหนื่อย Whitelist ไฟร์วอลล์หน้าตาเฉยรัวๆ บ่อยๆ อีก!"**
- พระเอกซุปเปอร์ฮีโร่หน้าเดิมเจ้าเดียวมีแค่ **`AWS Global Accelerator`** เท่านั้นฮะ! มันเสก `Anycast IP` ถาวรหินสลัก 2 เบอร์แจกคุณป๊าบเดียว แล้วหลังบ้านมันบุกทะลวงเครือข่ายมุดไปภูมิภาคต่างๆ เอง! จบข่าว!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Global Accelerator and create an endpoint group for each AWS Region. Associate the Application Load Balancer from each region to the corresponding endpoint group.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราสวดมนต์ของพระเจ้าฮะ! อัญเชิญหมอผี `Global Accelerator` ซึ่งมันจะเสก Static IP ตรึงตราถาวร 2 เบอร์ประดิษฐานให้! ยามไฟร์วอลล์แค่เอา 2 เบอร์นี้ไปกรอก Whitelist ทีเดียวชาติหน้าเสร็จศพ! ส่วนด้านหลังก็เอา Endpoint Group แยกตามทวีปโยงเสียบตูด ALB แต่ละทวีปอย่างมีระเบียบ! เป๊ะ 100% ตอบขจัดปัญหาขี้มูกโป่งทันตา!

❌ **[ผิด] Use AWS Global Accelerator and create multiple endpoints... Associate all the private IP addresses of the EC2 instances...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงแหกตาดูความซับซ้อนสิฮะ บอสร้องให้ลดภาระเว้ย! แต่ไอ้ข้อนี้ดันสั่งให้ "**เอาสายยางเชื่อมตรงเข้า Private IP ของน้อง EC2 ทีละตัวๆๆๆๆ จนครบหลายร้อยตัว**" ใน Global Accelerator ซะงั้น!! โดนตบหัวหลุดฮะ เพราะปกติเขาจะใช้บริการยาม ALB มาเป็นปราการด่านหน้ารักษาการณ์ EC2 ไม่กี่ตัว!! มึงจะข้ามห้วยไปขุดศพ EC2 ทีละตัวให้รกฐานข้อมูลตายห่าทำไม มั่วหน้าตาย! 

❌ **[ผิด] Launch a Network Load Balancer with an associated Elastic IP address. Set the ALBs in multiple Regions as targets.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ถึงแม้ไอ้เณร `Network Load Balancer (NLB)` แม่งจะเก่งยิงกาวเสกหิน `Elastic IP` ถาวรได้หน้าตาเฉยก็จริง... แต่ความจริงเปิดเผยคือ **"NLB เสือกเกิดมาเป็นลูกเมียน้อยประจำภูมิภาค (Regional service) เท่านั้นโว้ย!!"** มันสติปัญญาต่ำตมไม่สามารถกระโดดร้อยพวงมาลัยข้ามทวีปหาม ALB นอกเขตทวีปตัวมัน (Multiple Regions) ได้เด็ดขาดฮะ! ข้อจำกัดภูมิศาสตร์ฟาดหน้าหงาย!

❌ **[ผิด] Create a new Lambda function that tracks the changes in the IP addresses... update the corporate firewall every hour...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญเขียนโปรแกรมบ้าบอดิ้นพล่านฮะ! บอสสั่งว่าเบื่อการอัปเดตไฟร์วอลล์ IP บ่อยๆ... มึงก็เลยจัดฉากแอ็กชั่น "ส่งเจมส์บอนด์ `Lambda` เขียนสคริปต์วิ่งไล่ตามแทร็คการเปลี่ยน IP แผง ALB แล้วกระซวกยิงคำสั่งอัปเดตสั่นไฟร์วอลล์ออฟฟิศนายจ้างทุกๆ ชั่วโมงมันซะเลย!!" นี่คือการเอาเชือกมัดคอตัวเองผูกระเบิดชัดๆ งานโคตร Over-engineer บรรลัยพินาศที่สติเฟื่องสุดยอดฮะ ทิ้งขยะหมกส้วมซะ! 

---
---

## 📌 คำถามที่ 4
**โจทย์:**
A company is planning to deploy a High Performance Computing (HPC) cluster in its VPC that requires a scalable, high-performance file system. The storage service must be optimized for efficient workload processing, and the data must be accessible via a fast and scalable file system interface. It should also work natively with Amazon S3 that enables you to easily process your S3 data with a high-performance POSIX interface.

Which of the following is the MOST suitable service that you should use for this scenario?

**ตัวเลือก:**
- [x] Amazon FSx for Lustre
- [ ] Amazon Elastic File System (EFS)
- [ ] Amazon Elastic Block Storage (EBS)
- [ ] Amazon FSx for Windows File Server

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายกำลังบ้าคลั่ง จะรันซูเปอร์คอมพิวเตอร์ระดับสเกียดฟ้า **`High Performance Computing (HPC)`** คำนวณขีปนาวุธ 
ภาระชิ้นโต: กองทัพต้องการ "ระบบท่อสูบน้ำบาดาลแฟ้มข้อมูลความเร็วซูเปอร์โซนิก (High-performance file system)"
ไฮไลท์ไม้เด็ด: กระบวนท่านี้ **"ต้องเข้ากันเป็นผัวเมียตุ๋นเนื้อเปื่อยกับถังขยะ `Amazon S3` ได้แนบเนียนชนิดที่ว่า สูบข้อมูลจาก S3 มาเคี้ยวเสกเป็นหน้าต่างไฟล์โฟลเดอร์รวดเร็วแสง (POSIX interface) ได้ทันที!!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะ!
- คาถายมราชรัวฮีลอันดับ 1 ของจักรวาล : เจอคำเสกยันต์ประจัญบาน **`HPC (High Performance Computing)`** + ความเข้าขากับพระบิดา **`Amazon S3` (ดึงเข้าออกแนบเนียนราวกับเป็นพี่น้องกัน)** 
- หัวหอกกระบี้เดียวในหมู่บ้าน AWS ที่ทำภารกิจซูเปอร์สปีดคุยกับ S3 ได้ก็คือ **`Amazon FSx for Lustre`** (ราชาสายบู๊ซด HPC) กาลงไปไม่ต้องสงสัยให้เสียเวลา!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon FSx for Lustre**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆ!! ขุมพลัง `FSx for Lustre` คือปีศาจร้ายที่สร้างมาปั่นงานนรกแตก (HPC, Machine Learning) ให้สปีดทะลุหลอด! ทีเด็ดทะลุมิติคือ มันสามารถเอาถัง `Amazon S3` มาเป็นกล่องกระดาษหลังบ้าน (Seamless integration) กางออกเป็นโฟลเดอร์จำลองความเร็วแสงป๊าบเดียวจบ! พระเอกหัวแถวแห่งจักรวาลนี้!

❌ **[ผิด] Amazon Elastic File System (EFS)**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! แม้ลูกแม่ค้าข้าวมันไก่ `Amazon EFS` จะเก่งกาจเรื่องเป็นไดรฟ์แชร์มั่วซั่วของ Linux... แต่นางสปีดตะมุตะมิไม่แรงดุจฟ้าผ่า ไม่เหมาะกับการเผาหัวเครื่องสูบ HPC สิ้นเชิง! และที่โหดร้ายสุดคือ **"นางคุยกับ S3 โง่ๆ โดยตรงไม่ได้โว้ย!! ไม่มีปัญญาดึงไฟล์จาก S3 มากางเป็นโฟลเดอร์อัตโนมัติหรอกฮะ!"** ขาดตอนความประเสริฐ! 

❌ **[ผิด] Amazon FSx for Windows File Server**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลก `FSx for Windows` สร้างมาให้ชาว Windows ใช้ประดับบารมี! ถึงมันจะเก่งกาจขนาดไหนแต่มันเสือก **ไม่มีสายสะดือบุญญาธิการคุ้ยขยะกับตุ่ม `Amazon S3` แต่อย่างใดเลยฮะ!** (ไม่ Native integration) ผิดกระบวนการสืบพยาน!

❌ **[ผิด] Amazon Elastic Block Storage (EBS)**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ก้อนอิฐบล็อกสลบ `EBS` มันคือฮาร์ดดิสก์แข็งโป๊กเสียบตูดเครื่องใครเครื่องมันฮะ! มันไม่ได้มีความสามารถผันตัวเป็น **"แฟ้มข้อมูลแบ่งปันร้อยศพ (scalable file system)"** บ้าบออะไรนั่นเลยฮะ! มันเห็นแก่ตัวเป็นบ้า! ตอบผิดโลกผิดมิติหลงจักรวาลพังพ่ายฮะ! 

---
---

## 📌 คำถามที่ 5
**โจทย์:**
A company plans to implement a network monitoring system in AWS. The Solutions Architect launched an EC2 instance to host the monitoring system and used CloudWatch to monitor, store, and access the log files of the instance.

Which of the following provides an automated way to send log data to CloudWatch Logs from the Amazon EC2 instance?

**ตัวเลือก:**
- [x] CloudWatch Logs agent
- [ ] AWS Transfer for SFTP
- [ ] CloudTrail with log file validation
- [ ] CloudTrail Processing Library

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสุดขยัน ปั้นตึกเครื่องคอม `EC2` มานั่งซุ่มตรวจตรายามรักษาการณ์ระบบ
บอสตบโต๊ะผาง: **"กูอยากคายสมบัติขยะ 'Log files' ทั้งหมดจากในตับไตไส้พุงของ EC2 วิ่งแล่นไปดองฟอร์มาลีนบนห้องเย็นสูทหรูทะลุฟ้า `Amazon CloudWatch Logs` รัวๆ!!"**
คำถามบ๊องแบ๊วท้าอนุบาล: "เอ๊ะ... แล้วมึงจะเอาเครื่องมือเสกผีตัวไหน มาสิงสถิตยัดพ่นดูดขยะ Logs ในเครื่อง EC2 นี้อัตโนมัติหรอจ๊ะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ! 
- การพ่นลมหายใจดูดรีดขยะ **`Logs / Metrics`** ต่างๆ นานาในอวัยวะเครื่องยนต์ EC2... หนทางเดียวที่ถูกต้องตามตำรากระทรวงคือ มึงต้องจ้างภารโรงเวทมนต์ชื่อ **`CloudWatch Agent`** (หรือ CloudWatch Logs Agent รุ่นคลาสสิก) มาสิงร่างลงขันอาสาแบกขยะขว้างทิ้งขึ้นก้อนเมฆ CloudWatch ให้ทุกวัน! จบภารกิจรวบรัด! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] CloudWatch Logs agent**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ภารโรง `CloudWatch Logs Agent` (ปัจจุบันพัฒนาเป็น CloudWatch Agent ตัวกลม) มันทำหน้าที่เดียวในชีวิตคือ นั่งเฝ้ารออ้าปากดูดซับ Logs, OS Metrics ต่างๆ แล้วโยนทิ้งดิ่งไปสู่ตู้โชว์ CloudWatch แบบไม่บ่นสักคำ! สวมบทฮีตเตอร์อัตโนมัติประหยัดโค้ดตอบถูกเป๊ะ!

❌ **[ผิด] CloudTrail with log file validation**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงตาปลาดุกหรอฮะ!? ลูกแม่ค้า `CloudTrail` แม่งทำหน้าที่เสิร์ฟบันทึกจับโจรหน้าดำ **"ใครมากดปุ่มมั่วซั่วบน AWS Dashboard (API Calls)"** โว้ย!! มันไม่มีเสาเข็มยื่นมือเข้าไปล้วงดูดขยะกระทะในระบบปฏิบัติการ Linux/Windows EC2 (Application logs) ให้เจ้านายมึงหรอกฮะ งี่เง่าสุดติ่ง! 

❌ **[ผิด] AWS Transfer for SFTP**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลก `AWS Transfer for SFTP` เป็นบุรุษไปรษณีย์เอาไว้ผ่องถ่ายไฟล์โยนข้ามทะเลเข้าถังขยะ S3 เฉพาะกิจ!! มึงเป็นเชี้ยอะไรมาเหงื่อแตกปั่นจักรยานไล่ต้อน Logs ส่งให้หน้าบ้าน CloudWatch อะฮะ ผิดกระบวนท่าส้นตีนอย่างแรงฮะโง่จริง!

❌ **[ผิด] CloudTrail Processing Library**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้ห้องสมุดจาวา `CloudTrail Processing Library` แม่งเป็นแค่กล่องดินสอเครื่องเขียนโปรแกรม (Java library) ให้ช่างก่อสร้างเอาโค้ดไปย่อยกระดาษ CloudTrail Logs มาอ่านวิเคราะห์เองฮะ!! มันไม่ได้เป็นตุ๊กตาผีสิงอัตโนมัติที่จะอ้าปากพ่น Logs ใส่ CloudWatch ตามที่บอสเพรียกหา! บ้าบอคอแตกหลงจักรวาลฮะ! 

---
---

## 📌 คำถามที่ 6
**โจทย์:**
A company plans to host a movie streaming app in AWS. The chief information officer (CIO) wants to ensure that the application is highly available and scalable. The application is deployed to an Auto Scaling group of EC2 instances on multiple AZs. A load balancer must be configured to distribute incoming requests evenly to all EC2 instances across multiple Availability Zones.

Which of the following features should the Solutions Architect use to satisfy these criteria?

**ตัวเลือก:**
- [x] Cross-zone load balancing
- [ ] Path-based Routing
- [ ] Amazon VPC IP Address Manager (IPAM)
- [ ] AWS Direct Connect SiteLink

---
### 🎯 โจทย์ต้องการอะไร?
จะสร้างแอปสตรีมหนังชนโรงสุดเจ๋ง ถมศพเครื่อง **`EC2` กระจายปักหลักหลายทวีปเกาะ (Multiple AZs)**
ความเรื่องมากบังเกิด: "ยามเฝ้าประตูหน้าบ้าน `Load Balancer` จะสับสวิตช์จ่ายตังค์ลูกค้ายังไงวะ **ถึงจะเกลี่ยแขกสาดหน้าใส่หน้าตักของลูกข่าย EC2 ทุกตัว ไม่ว่าเสือกมันจะซ่อนตัวอยู่ฝั่งซ้ายหรือฝั่งขวาของเกาะได้อย่างเท่าเทียม (Distribute incoming requests evenly... across multiple AZs)!!**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ! 
- คาถายมราชรัวฮีลอันดับ 1 ของ Load Balancer: มนต์ดำผีดิบที่กางแขนโอบกอดชาวบ้าน **"ให้ทะลวงค่าย ทะลวงกำแพงเขตแดนเมือง AZ ไปโยนแขกให้ครบสัดส่วนกันเกลี่ยโคตรแฟร์"** เรียกว่าวิชา **`Cross-zone load balancing`** โว้ย!! ร้องตะโกนใส่หน้ามันไปเลยฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Cross-zone load balancing**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ออปชันระดับเทพ `Cross-zone load balancing` มันทำหน้าที่มัดรวมโถส้วมเครื่องลูกข่ายทั้งหมดไม่ว่าจะอยู่เขตทวีปไหนก็ตาม... แล้วแอบตั้งโต๊ะคำนวณปาดเหงื่อหารแบ่งสัดส่วนแขกแจกหน้าไพ่สาดกระจายเท่าๆ กันทุกคนอย่างไร้อคติ!! ตอบเป๊ะ 100% ไม่มีหักคะแนนจิตพิสัยฮะ! 

❌ **[ผิด] Path-based Routing**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! วิชาสับหิน `Path-based Routing` เอายันต์ไปป้ายชี้ทางจราจรเช่น "เห้ย ถ้าลิ้งลงท้ายด้วย /images มึงเตะไปตึกซ้าย, ถ้า /video มึงเตะไปตึกขวานะ"... ซึ่งมันเอาไว้แยกสายงานโว้ย!! ไม่ได้เกี่ยวกับกระบวนการปรองดองแห่งชาติ **"หารสัดส่วนคนเข้าให้เท่าเทียมแผ่กระจกซ้ายขวา"** ดั่งที่บอสสั่งสักกะรูก้นเดียวฮะ! 

❌ **[ผิด] Amazon VPC IP Address Manager (IPAM)**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้สมุดจดหนี้ `IPAM` แม่งคือสมุดข่อยปัญญาอ่อนเอาไว้จดบันทึกให้แอดมินดูเท่ๆ ว่า "ตอนนี้บริษัทมึงดึง IP วงไหนไปแจกใครบ้างแล้ว"... มึงบ้าหรอเจ้านาย มันไม่มีตีนกายไปช่วยเตะชิ่งหน้าไม้โยนคนแขกเข้า ALB เลยสักป๊าปฮะ! บ้าบอคอแตกหลงจักรวาล! 

❌ **[ผิด] AWS Direct Connect SiteLink**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญทุบหินจุดไฟ `SiteLink` แม่งคือการลากสายสลิงมัดรวบออฟฟิศสาจาเชียงใหม่ กับ ออฟฟิศสาขากรุงเทพ ให้แอบกิ๊กคุยกันลัดลอดกะโหลกหนาเส้นทาง Direct Connect!! มึงเอามาลากสายตอบคำถามยาม Load Balancer สับไพ่ซ้ายขวาเหี้ยอะไร๊ฮะ!! โคตรมั่วถอดปลอกคอหมาฮะ!

---
---

## 📌 คำถามที่ 7
**โจทย์:**
A global news network created a CloudFront distribution for their web application. However, you noticed that the application's origin server is being hit for each request instead of the AWS Edge locations, which serve the cached objects. The issue occurs even for the commonly requested objects.

What could be a possible cause of this issue?

**ตัวเลือก:**
- [x] The Cache-Control max-age directive is set to zero.
- [ ] There are two primary origins configured in your Amazon CloudFront Origin Group.
- [ ] The file sizes of the cached objects are too large for CloudFront to handle.
- [ ] An object is only cached by Cloudfront once a successful request has been made hence, the objects were not requested before, which is why the request is still directed to the origin server.

---
### 🎯 โจทย์ต้องการอะไร?
ปัญหาโลกแตก: อุตส่าห์ด่าเจ้านายให้ซื้อป้ายโฆษณามหาเทพ **`Amazon CloudFront (CDN)`** มากันคนหินด่าลามปามพุ่งถึงหน้าอกรังนก `Origin server` หลังบ้านแท้ๆ!
ความโป๊ะแตกทะลุมิติบังเกิด: **"ไอ้ชิบหาย!! ทำไมหน้าบ้าน Edge locations แม่งไม่ขยันพกของเกาะหลัง (Cache) มาแจกแขกวะ!! ทุกคำขอแม่งเสือกปลิวข้ามแผงทะลุตูดดิ่งไปทารุณกรรมเซิร์ฟเวอร์หลังบ้าน (Origin server) ล้วนๆ 100% เลยอะ!!"** ไม่เว้นแม้กระทั่งไฟล์รูปหน้าชักโครกที่แขกมาดูวันละล้านคนก็นิ่งสนิท!
คำถามบ๊องแบ๊วท้ากะโหลก: กูตบแป้งตั้งค่าอะไรพลาดจนหายนะบังเกิดแบบนี้วะ!?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความตาย: อาการ **"CloudFront หัวควยกูไม่ยอมอมขยะ (Cache) สักกระเบียดนิ้ว และหักคอคายคนทั้งหมดทิ้งดิ่งทะลุไปรุมสกรัมบ้านใหญ่เรื่อยๆ ถี่ๆ"** 
- ปมปัญหาคือ มึงดันไปปั่นป่วนหัวหน้าท่อน้ำ (HTTP Headers) ด้วยคาถา **`Cache-Control max-age = 0`** (หรือ 0 วินาที) มึงสั่งประหารให้มันเก็บขยะไว้ 0 วิ! พอ 0 วิปุ๊บ... แม่งก็หมดอายุ! CloudFront ดันซื่อบื้อก็เลยวิ่งถ่อไปล้วงไข่ถามเซิร์ฟเวอร์หลักทุกเสี้ยววินาทีไงฮะ หน้ามืดโง่ดักดาน! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The Cache-Control max-age directive is set to zero.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โคตรตรงกระเดือก! พอเสือกทะลึ่งเปิดคำสั่ง `max-age = 0` ให้ยามหน้าบ้าน CloudFront... ยามมันก็บ้าจี้ "ของชิ้นนี้หมดอายุแล้วตั้งแต่กูรับมา! กูขอวิ่งไปเบิกซากใหม่ที่ตึกเซิร์ฟเวอร์ Origin เถอะ!" กลายเป็นหนังควายวิ่งขวิดบ้านตัวเองรัวๆ สิบแผ่นดินฮะ! สมน้ำหน้า!

❌ **[ผิด] An object is only cached by Cloudfront once a successful request has been made hence... which is why the request is still directed to the origin server.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? มึงแหกตาดูโจทย์สิฮะ บอสร้องปาวๆ ว่า "ไอ้ชิบหาย ไฟล์ร้อยล้านวิว (commonly requested objects) แม่งก็ยังมุดทะลุตูดหลบการดักจับ Cache โว้ยย!" ถ้ามันเคยหอบไปส่งครั้งแรกสำเร็จ มันก็ควรดองอมไว้แล้วสิฮะ... ไม่ใช่วิ่งหนีทะลุตูดทุกไม้แบบบ้าๆ บอๆ พินาศตรรกะพังทลายฮะ! 

❌ **[ผิด] The file sizes of the cached objects are too large for CloudFront to handle.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญบ้าพลังกะหลั่ว! ถึงแม้โจทย์มันไม่บอกหรอกฮะว่าขนาดไฟล์ใหญ่เท่าจิ๋มมดหรือเท่าบ้านยักษ์... แต่พระอรหันต์ `CloudFront` แกคอหอยยโสโอหังอมขยะได้หนาแน่นมหาศาลสุดๆ ฮะ! ถ้ามันใหญ่เกินแก๊ป แม่งก็ร้องกรี๊ดเตือนตั้งแต่หน้าบ้าน ไม่ใช่ปล่อยของไหลทะลักมาถล่มทัพ Origin พลิกลิปลับแบบนี้ฮะ มั่วหน้าตาย!

❌ **[ผิด] There are two primary origins configured in your Amazon CloudFront Origin Group.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้หีบสมบัติ `Origin Group` เขาเอาไว้กันผีตายโหง (Failover)! กฎกระทรวงมีแค่ "พี่หัวหน้าหลัก (Primary)" คนเดียว กับ "อีหนูเบอร์สอง (Secondary)" นั่งตบยุงรอ!... มึงบ้าหรอเจ้านาย ไปเอามาจากผังการบินไหนกระซวกมีลูก Primary ล่อหน้าเป้า 2 คนให้ตีกันตายวะฮะ!! กาวทะลุหลอด! 

---
---

## 📌 คำถามที่ 8
**โจทย์:**
A company created a VPC with a single subnet then launched an On-Demand EC2 instance in that subnet. You have attached an Internet gateway (IGW) to the VPC and verified that the EC2 instance has a public IP. The main route table of the VPC is as shown below:

```
Destination: 10.0.0.0/16
Target: local
```

However, the instance still cannot be reached from the Internet when you tried to connect to it from your computer. Which of the following should be made to the route table to fix this issue?

**ตัวเลือก:**
- [x] Add this new entry to the route table: 0.0.0.0/0 -> Your Internet Gateway
- [ ] Add this new entry to the route table: 0.0.0.0/27 -> Your Internet Gateway
- [ ] Add the following entry to the route table: 10.0.0.0/27 -> Your Internet Gateway
- [ ] Modify the above route table: 10.0.0.0/27 -> Your Internet Gateway

---
### 🎯 โจทย์ต้องการอะไร?
ปัญหาโลกแตก: แอดมินมือใหม่ปั้นตึก `EC2` แปะป้ายทะเบียน `Public IP` หล่อๆ หน้าบ้าน แถมเอาสายยางหนีบจุกลม `Internet Gateway (IGW)` หักตูดปักกรง VPC เรียบร้อย!
ความระยำบังเกิด: "ไอ้ชิบหาย!! ทำไมกูเอาคอมกูมุดทะลุจากบ้าน นั่งปิงหาเน็ตป้าย Public IP เครื่องมันไม่ได้วะ!? มืดบอดหนวกสลบเหมือด!"
แหกตาดูลายแทง `Route Table` ของเก่า: มีป้ายโง่ๆ เขียนไว้บรรทัดเดียว "ถ้าจะส่งจดหมายคุยวงในท่อระบายน้ำปริมณฑล `10.0.0.0/16` ก็มุดลงตู้ Local"
คำถามบ๊องแบ๊ว: กูต้องกดแปรงกระเบื้องลายแทง Route Table ตัวไหนไปเพิ่ม ถึงจะทุบคุกออกหาสี่แยกอินเตอร์เน็ตสากลได้วะ!?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงคมนาคม AWSฮะ!
- กฎแห่งความตาย: ถ้าใจมึงปรารถนาจะตีตั๋วถ่อพายเรือสาดมั่วซั่วไปนอกมิติสู่อินเตอร์เน็ตโลกหล้า (Internet) หน้าป้ายจราจร Route มึงต้องสวดคาถาครอบจักรวาล **`"0.0.0.0/0"`** (แปลว่าไปแม่งมันทุกหนทุกแห่ง ทุก IP บนปฐพี) แล้วหักพวงมาลัยพุ่งเข้าหาป้ายรถเมล์ **`Internet Gateway (IGW)`** เป็นทัพหน้า! จบภารกิจซดเบียร์ได้! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Add this new entry to the route table: 0.0.0.0/0 -> Your Internet Gateway**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! พระนาง `0.0.0.0/0` คือยันต์ครอบวิชาของถนนซิ่งเน็ตปารีสฮะ! เติมบรรทัดนี้ปั๊บ แม่งจะปล่อยรถจากแผง EC2 ทั่วฟ้ามุดรู IGW ได้ระรัวฉบับเต็มสูบ และมึงก็ซูมรีโมทจากคอมส้นตีนบ้านเข้า IP หน้าต่างป๊าบได้ด้วยเช่นกัน เริ่ดหรูเพอร์เฟ็กต์ฮะ!

❌ **[ผิด] Add this new entry to the route table: 0.0.0.0/27 -> Your Internet Gateway**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงแหกตาดูหางเลขสิฮะ บอสร้องบอกอยากมุดมหาสมุทรอินเตอร์เน็ตเว้ย!... มึงคว้ามีดมาสับส่วนแบ่งคอหอย `0.0.0.0/27` แม่งตีกรอบแคบเท่าบ่อกบโว้ย!! ใครหน้าไหนเขาสอนมึงเขียนหน้าป้ายอินเตอร์เน็ตโลกแหว่งวิ่นแบบนี้หรอฮะ!? หน้ามืดตามัวเขียนผิดหลักไวยากรณ์ยับเยินฮะ โดนตัดเกรดศูนย์! 

❌ **[ผิด] Add the following entry to the route table: 10.0.0.0/27 -> Your Internet Gateway**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้เลขเด็ด `10.0.0.0/...` แม่งคือสายเลือดปริมณฑล "คุกนรกในตึกแกเอง (Local VPC)" โว้ย!! มึงจะมัดเชือกปริมณฑลของมึงถีบกะบาลปักลอยหน้าสลอนส่งไปหาป้าย IGW เพื่อ!? ตกวิชาเน็ตเวิร์กอย่างรุนแรง จับแพะชนไดโนเสาร์อักเสบฮะ!

❌ **[ผิด] Modify the above route table: 10.0.0.0/27 -> Your Internet Gateway**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! นอกจากจะสวดคาถา `10.0.0.0` หมาหลงป่าผิดฝั่งไปซุกรัง IGW แล้ว... มึงเสือกอหังการถึงขั้น **"ทำลายล้างกฎเหล็ก Local 10.0.0.0/16 โดนแก้ไข (Modify) เหยียบย่ำซะราบคาบ!!"** มึงบ้าหรอฮะ กฎเหล็กแผ่นดินเกิดวงใน Local เขาห้ามตีกบาลแตะต้องเว้ยย!! พังทลายมหาบัณฑิตเลยฮะข้อนี้ เลวร้ายขั้นสุดยอดฮะ!

---
---

## 📌 คำถามที่ 9
**โจทย์:**
An intelligence agency is currently hosting a learning and training portal in AWS. Your manager instructed you to launch a large EC2 instance with an attached EBS Volume and enable Enhanced Networking. What are the valid case scenarios in using Enhanced Networking? (Select TWO.)

**ตัวเลือก:**
- [x] When you need a higher packet per second (PPS) performance
- [x] When you need a consistently lower inter-instance latencies
- [ ] When you need a dedicated connection to your on-premises data center 
- [ ] When you need high latency networking
- [ ] When you need a low packet-per-second performance

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่สับกะบาล: "พวกมึงไปปั้นตึก `EC2` หน้ากระดุม แล้วรูดบัตรเบิกออปชัน **`Enhanced Networking`** มาอุดตูดเครื่องให้กูเดี๋ยวนี้!"
คำถามบ๊องแบ๊ว: "เอ๊ะ... แล้วคุณประโยชน์โชว์พาวของไอ้เหี้ย `Enhanced Networking` เนี่ย แม่งคือบุญบาปทรงพลังด้านมืดเหี้ยอะไรวะฮะ? มีสรรพคุณอะไร? (เลือกอวยพรมา 2 ช้อ)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้าโง่ๆ เลยฮะ 
- คาถายมราชรัวฮีลอันดับ 1 ของ EC2: ออปชันปีกนางฟ้า **`Enhanced Networking`** แม่งคือกฎกระทรวงของการ **"แดกสเตียรอยด์บูตสปีดเข็มไมล์เน็ตเวิร์กทะลุฟ้า (I/O performance)"** 
- สรรพคุณสุดยอดของมันคือ:
   1. ทะลวงบีบสายน้ำฉีดรถสิบล้อ **`Higher Packet Per Second (PPS)`** แดกไม่ยั้งไหลเลื่อนลื่นปี๊ดดด!
   2. กวาดล้างสิวเสี้ยนขจัดหน่วงความอืด ปั้มตูดทลวงเร็วติดจรวด **`Lower Inter-instance Latencies`** (ให้เสาไฟฟ้า 2 ต้นใน AWS ปิงคุยกันไวเหนือแดนมนุษย์)!! ฮาร์ดคอร์เคลียร์โจทย์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] When you need a higher packet per second (PPS) performance**
✅ **[ถูกต้อง] When you need a consistently lower inter-instance latencies**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ประสานอินทรีสองหมัดเข้าด้วยกัน!! สรรพคุณต่าย่ายายตาแม่งก็ตามทริคเป๊ะฮะ! เสียบตูด Enhanced Networking ปั๊บ... รูท่อบานเบอะ สูบขยะอ้วกกระสุนรัวลั่นทุ่งทวีคูณกาลมหาศาล (Higher PPS)! แถมหวดขจัดความเกียจคร้าน ลดเวลาอืดดดหน่วงงงข้ามเสา (Lower latencies) ทวีคูณความเสถียรดุจพระเจ้าเสกสรรค์! ตอบเป๊ะ 100% ไม่มีหักคะแนนจิตพิสัยฮะ! 

❌ **[ผิด] When you need a dedicated connection to your on-premises data center**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาค้อนธอร์มางอกสะพานแขวนพังๆ หรอฮะ!? การ "เจาะท่อลับเฉพาะส่วนตัว (dedicated connection) ข้ามน้ำข้ามทะเลบุกห้องส้วมบ้านนายจ้าง (on-premises)" แม่งเป็นหน้าที่ของพระเจ้า **`AWS Direct Connect`** ระดับซูเปอร์พรีเมียมโว้ยย!! การหวดเอา Enhanced Networking ซึ่งเป็นแค่ยาสเตียรอยด์ระดับปัจเจกชนมาตอบนี่คือ มั่วซั่วจับแพะชนไดโนเสาร์ฮะ! 

❌ **[ผิด] When you need high latency networking / When you need a low packet-per-second performance**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! มึงมีตังค์เหลือเฟือม๊ากกก... ถึงยอมกัดฟันซื้อของถ่มถุยเพื่อ **"ทำให้แอปหน่วงๆ ยิงปิงช้าๆ รอกรีดเลือด (High latency)"** หรือ **"ลดระดับรูฉี่ให้บีบหยดช้าๆ แหมะๆ (Low PPS)"** เพื่อ!? มนุษย์หน้าไหนในจักรวาลนี้เสาะแสวงหาสถานการณ์อัปยศพังพินาศแบบนี้วะฮะ!? ย้อนแย้งหน้าซื่อตาบอดตอบลวกๆ แบบนี้โง่บรรลัยพินาศตรรกะหัวขวานฮะ! ทิ้งส้วมซะ! 

---
---

## 📌 คำถามที่ 10
**โจทย์:**
A company has a VPC for its Human Resource department and another VPC located in different AWS regions for its Finance department. The Solutions Architect must redesign the architecture to allow the finance department to access all resources that are in the human resource department, and vice versa. An Intrusion Prevention System (IPS) must also be integrated for active traffic flow inspection and to block any vulnerability exploits.

Which network architecture design in AWS should the Solutions Architect set up to satisfy the above requirement?

**ตัวเลือก:**
- [x] Launch an AWS Transit Gateway and add VPC attachments to connect all departments. Set up AWS Network Firewall to secure the application traffic travelling between the VPCs.
- [ ] Create a Traffic Policy in Amazon Route 53 to connect the two VPCs. Configure the Route 53 Resolver DNS Firewall to do active traffic flow inspection and block any vulnerability exploits.
- [ ] Establish a secure connection between the two VPCs using a NAT Gateway. Manage user sessions via the AWS Systems Manager Session Manager service.
- [ ] Create a Direct Connect Gateway and add VPC attachments to connect all departments. Configure AWS Security Hub to secure the application traffic travelling between the VPCs.

---
### 🎯 โจทย์ต้องการอะไร?
ปัญหาโลกแตก: บริษัทกระจัดกระจาย มีค่าย `VPC ของแก๊ง HR` อยู่ซ้าย และ `VPC แก๊งการเงิน` อยู่ขวา... เสือกอยู่ **"คนละทวีปกันด้วย (Different regions)!"**
คำสั่งเพชฌฆาต: "มึงไปร้อยพวงมาลัยสลิง สานความสัมพันธ์สองค่าย VPC นรกข้ามทวีปให้คลอเคลียจูบปากคุยกันชิวๆ ซิ๊!"
ไฮไลท์ไม้เด็ด: "และหน้าประตูวังค่าย ต้องจ้างยามมาดเข้มเสกมนต์ **`IPS (Intrusion Prevention System)`** มาเดินเตะคนร้าย คุ้ยแคะไส้ในกระเป๋าเดินทาง (active flow inspection) เตะขยะแขยงตบโจรทิ้ง (block exploits) ถวายหัวด้วยนะเว้ย!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ! 
- คาถายมราชประสานวิญญาณ:
  - 1) ขึงลวดผีดิบเชื่อมค่ายแคมป์ VPC รัวๆ ไม่ว่าจะทวีปเดียวกันหรือข้ามทวีป (VPC to VPC) ท่าเต้นตายตัวคือลาก **`AWS Transit Gateway`** รับเหมาจุดศูนย์กลางปังเดียวจบฮะ!
  - 2) ตำรวจจอมจุ้นจ้านกวาดหาเชื้อโรคลึกระดับไส้กรอก (IPS, Active flow inspection, Block vulnerability exploits)... ทุระกันดารเครื่องมือรักษาความปลอดภัยที่รับหน้าที่นี้เต็มตัวคือพี่โต **`AWS Network Firewall`** โว้ยยย (อย่ากระแดะไปเอา Route 53 DNS Firewall มันง่อยมากฮะ กรองได้แค่ชื่อโดเมน URL)!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch an AWS Transit Gateway and add VPC attachments to connect all departments. Set up AWS Network Firewall to secure the application traffic travelling between the VPCs.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ประสานอินทรีสองหมัดเข้าด้วยกัน!! แกนหลักแรก โยนสถานีหมอชิต `Transit Gateway` นั่งแป้นเป็นพระเจ้า เสียบตูดลิงค์ผูกโบว์เชื่อมแก๊ง HR กับการเงินข้ามทวีปรวมญาติได้สิวๆ! แกนที่สอง ตั้งศาลพระภูมิเตะก้านคอโจร `AWS Network Firewall` ไว้ส่องกล้อง IPS ทะลวงไส้ก้อนเนื้อขจัดของโจรพินาศ! จบเกมพระเอกรูปหล่อ 100%!

❌ **[ผิด] Create a Traffic Policy in Amazon Route 53 to connect the two VPCs. Configure the Route 53 Resolver DNS Firewall...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงตาปลาดุกหรอฮะ!? ลูกแม่ค้า `Route 53 Traffic Policy` มันเอาไว้จงใจหักพวงมาลัยสาดแขกเข้า Server ไม่เกี่ยวหาเหวอะไรกะสานพวงมาลัยมุดวงในเชื่อมเพื่อนบ้าน VPC กันและกันเลยซักแอะ!! แถมลูกจ๊อก `Route 53 Resolver DNS Firewall` ก็แสนจะง่อยเปลี้ย... เก่งแค่ปัดป้ายจราจรบล็อคเว็บพนัน... เสือกไม่มีสติปัญญาเลอค่าไปรับบทเป็นนักสแกนไวรัสทะลวงไส้กรอก IPS เพื่อบล็อค Exploits ดั่งโจทย์ปราถนาฮะ ยับเยินล้มไม่เป็นท่า!

❌ **[ผิด] Establish a secure connection between the two VPCs using a NAT Gateway. Manage user sessions via the AWS Systems Manager...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฮะ!! "ท่อประปาตด `NAT Gateway`... แม่งเอาไว้มุดหนีคุกหน้าสลอนขึ้นฝ่าออกก้อนเมฆทุรกันดารอินเทอร์เน็ตโว้ย!!" มันไม่เคยมีวาสนารับจ็อบเหมาสานสายโยงเชื่อมเกาะข้ามทวีประหว่างดง VPC ขั้วโลกฮะ บ้าบอสุดบรรลัยพินาศตรรกะแตก! ผิดประเภท!

❌ **[ผิด] Create a Direct Connect Gateway and add VPC attachments... Configure AWS Security Hub...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้สวะกระโหลกหนา `Direct Connect Gateway` มนุษย์เขาเอาไว้ล่ามโซ่ทะลวงป่ากฐินไปหา "เซิร์ฟเวอร์เจ้านายออฟฟิศนายจ้าง (On-premises)" โว้ย!! มึงเอาท่อนรกนี้มาเชื่อมกนัเองในป่า VPC บนสวรรค์ AWS ทำสากกะเบืออะไรฮะ!! แถมปัญญาปลาทอง `AWS Security Hub` แม่งเสือกเก่งแค่แสกนรอยรั่วแล้ว "ร้องโวยวายบนจอตั้งโต๊ะโชว์หน้ารวมญาติ"... นางไม่มีมือมีตีนเป็น IPS ลงด้ามดาบฟันคอตับโจรเตะกระเด็น (Active inspect+block) ตามสั่งบอสได้จริงฮะ สอบตก! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 2: ข้อ 11 - 20)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 11
**โจทย์:**
A tech company is running two production web servers hosted on Reserved EC2 instances with EBS-backed root volumes. These instances have a consistent CPU load of 90%. Traffic is being distributed to these instances by an Elastic Load Balancer. In addition, they also have Multi-AZ RDS MySQL databases for their production, test, and development environments. 

What recommendation would you make to reduce cost in this AWS environment without affecting availability and performance of mission-critical systems? Choose the best answer.

**ตัวเลือก:**
- [ ] Consider using On-demand instances instead of Reserved EC2 instances
- [ ] Consider using Spot instances instead of reserved EC2 instances
- [x] Consider not using a Multi-AZ RDS deployment for the development and test database
- [ ] Consider removing the Elastic Load Balancer

---
### 🎯 โจทย์ต้องการอะไร?
จับผิดค่าใช้จ่ายพังพินาศ: เซิร์ฟเวอร์ `EC2` ตัวจริง (Production) ทำงานหลังขดหลังแข็ง CPU ล่อไป 90% ตลอดศก มี `Load Balancer` ยืนแจกงานหน้าบ้านงามๆ
แต่พอเหลียวไปดูฐานข้อมูล... ไอ้บริษัทนี้ดันเหมารวมเปิดสวิตช์ **`Multi-AZ RDS MySQL` (ร่างแฝดปกป้องเซิร์ฟเวอร์ตาย) ให้กับมันทุก Environment ทั้งของจริง (Production), ถังกระบะทรายเทส (Test), และถังเด็กฝึกงานเขียนโค้ด (Development)!!**
คำถามบ๊องแบ๊วท้าอนุบาล: "โอ้โหหห... มึงช่วยกระโดดถีบยอดหน้าหาแพะรับบาปที่ผลาญตังค์ทิ้งขว้างโดยเปล่าประโยชน์ และชี้แนะวิธีลดค่าใช้จ่าย (reduce cost) โง่ๆ ลงทีซิ!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความตาย: ถังฐานข้อมูลขี้ปะติ๋วอย่าง **`Development / Test`** แม่งเป็นแค่ถังขยะทดลองวิชาฮะ พังก็แค่สร้างใหม่! ไม่มีมนุษย์หน้าไหนในจักรวาลเขาอหังการเปิดเหมา **`Multi-AZ (ระบบแฝดคอยอัพสำรองฉุกเฉิน)`** ให้ถังขยะพวกนี้หรอกฮะ มันเปลืองตังค์ชิบหายวายป่วง!! Multi-AZ มันสงวนลิขสิทธิ์ความหรูหราไว้ใช้กับถัง `Production (ของจริงระดับชาติ)` เท่านั้นโว้ยย!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Consider not using a Multi-AZ RDS deployment for the development and test database**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ตามสเต็ปเลยฮะ... ปิดการใช้งานปุ่มเศรษฐี Multi-AZ ในถัง Development และ Test ซะ!! แล้วบิลสิ้นเดือนเจ้านายจะลดฮวบน่าชื่นใจ จบตรรกะง่ายๆ แบบเพียบพร้อมฮะ!

❌ **[ผิด] Consider using On-demand instances instead of Reserved EC2 instances**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงแหกตาดูความขัดแย้งสิฮะ บอสร้องอยากลดต้นทุน... แต่มึงเสือกหน้ามืดไปสั่งปลดป้าย `Reserved EC2 (ตั๋วเหมารายปีลดราคากระหน่ำ 70%)` แล้วเปลี่ยนมาใช้ `On-demand (ซื้อตั๋วหน้าโรงราคาแพงระยับ)` แทนเนี่ยนะ!? มึงบ้าหรอเจ้านาย ผลาญตังค์ล้มละลายยับเยินกว่าเดิมฮะ โดนไล่ออก! 

❌ **[ผิด] Consider using Spot instances instead of reserved EC2 instances**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ถัง EC2 ของโจทย์แม่งกำลังรันแอป "Production ของจริงระดับชาติ" เสิร์ฟลูกค้าอยู่นะเว้ย!... ถาดหรรษา `Spot instances (ของประมูลราคาถูกพร้อมโดนเตะปลั๊กทิ้งทุกระเบียดนิ้ว)` เขาเอาไว้เสพกับงานกระบะทรายหรือพินิจพิเคราะห์ชิวๆ ห้ามเอามาอิงแอบแบกหลังบ้าน Production เด็ดขาด! บรรลัยพินาศตรรกะ!

❌ **[ผิด] Consider removing the Elastic Load Balancer**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้หีบสมบัติ `ELB` แม่งคือยามเฝ้าประตูแจกไพ่ชีวิตนะฮะ! ถอดมันทิ้งปั๊บ ระบบก็พังกระจายไร้สมดุลย์ (Affect availability and performance)! มึงไปยุ่งกะแกนหลังทำหอกอะไร๊!

---
---

## 📌 คำถามที่ 12
**โจทย์:**
A company deployed a fleet of Windows-based EC2 instances with IPv4 addresses launched in a private subnet. Several software installed in the EC2 instances are required to be updated via the Internet.

Which of the following services can provide the firm a highly available solution to safely allow the instances to fetch the software patches from the Internet but prevent outside network from initiating a connection?

**ตัวเลือก:**
- [ ] Egress-Only Internet Gateway 
- [x] NAT Gateway
- [ ] NAT Instance 
- [ ] VPC Endpoint 

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่ปลูกตึก `EC2 (Windows)` ซุกหัวนอนอยู่ในค่ายสุสานลับ **`(Private subnet)`** แถมใช้สายสิญจน์คุมกำเนิดแบบ **`IPv4`**
ความอยากรู้อยากเห็นบังเกิด: "เจ้านายครับ... อีกล่องโปรแกรมข้างในกระดูกมันอยากวิ่งถ่อแรดออกไปมหาสมุทรเน็ตเวิร์ก **เพื่อไปดาวน์โหลดอัปเดตแพทช์ (update via Internet)** อะฮะ!"
คำสั่งเพชฌฆาต: "เออ! มึงหาประตูหลังอะไรก็ได้ให้มันแอบมุดออกไปสูบอัปเดตได้!! แต่อย่าเสือกเปิดอ้าซ่าให้ใครทะลวงกลับเข้ามาตีท้ายครัวได้เด็ดขาดนะโว้ย (prevent outside connection)... และเน้นเลยว่าต้องถึกทนระดับสิบล้อชนไม่พัง **(Highly available)** ด้วย!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ! 
- คาถายมราชประสานวิญญาณ:
  - 1) อ่าว.. อยู่กระดองค่ายมืดมิด Private Subnet อยากชะโงกหัวแอบดูดความรู้เน็ตเวิร์ก (IPv4) แบบวันเวย์... ท่าบังคับลากสายคือพี่หมอ **`NAT (Network Address Translation)`** เท่านั้น!!
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ขอแบบ "อึดตายยาก สิบล้อลากไม่พัง (Highly available) ไร้ภาระเลี้ยงดู!"... ฟันธงสับคอหอยฉลามเข้าเป้าที่ยอดมนุษย์ **`NAT Gateway`** ทันทีฮะ ไม่ต้องสวมกะโหลกชั่งใจให้โง่เขลา!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] NAT Gateway**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! อัญเชิญลูกรักกระทรวง `NAT Gateway` ไปทำหน้าที่อ้าหวูดดูดเลือดสูบข้อมูลเน็ตยุทธจักรนอกค่ายได้บันเทิงเริงใจแบบกะลาครอบหัว (ด่าหมาบล็อคคนนอกกลับ 100%) แถมเป็นบริการของ AWS ล้วนๆ ระดับ Fully-managed เสกความถึก High availability เหนือเมฆโฉบฉียวสุดฤทธิ์ฮะ!

❌ **[ผิด] NAT Instance**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! แม้ลุงชราปาหี่ปิงปอง `NAT Instance` จะมีวิชามุดกระดองเหมือนกัน... แต่ลุงแกแม่งเป็นแค่ "พนักงานยืนยิงตัวเป็นๆ ตัวเดี่ยว (Single EC2)"ฮะ!! ไม่มีฮาคิราชันย์ห่าอะไรเลย เสียบปลั๊กหลุดล้มหัวฟาดพื้นคือตึกเจ๊งพังทั้งค่าย ไม่มีความ High Available สะกิดติ่งโจทย์แม้แต่น้อยฮะ โดนเตะตกกระป๋อง! 

❌ **[ผิด] Egress-Only Internet Gateway**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้หีบสมบัติ `Egress-Only IGW` มันเกิดมาเพื่อรับใช้สายเลือดกษัตริย์ **`IPv6 เท่านั้นโว้ย!!`** มึงแหกตาดูโจทย์สิลูกพี่... เครื่องบริษัทนี้แม่งดักดานใช้ IP ยุคไดโนเสาร์ `IPv4` กันอยู่ฮะ!! เอาเครื่องมือข้ามพิภพมาเสียบก้นมันก็ช็อตตายซากกันพอดี! กาวทะลุหลอด! 

❌ **[ผิด] VPC Endpoint**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! มุดท่อกะลา `VPC Endpoint` แม่งเอาไว้มุดหนีทะลวงมิติเชื่อมหาบริการอื่นๆ "ภายในใต้ร่มโพธิ์ร่มไทรดงสวรรค์ AWS ด้วยกันเอง (เช่น S3, DynamoDB)" โว้ย!! มันเสือกโผล่หน้าปลาคาร์ฟทะลุข้ามทวีปหาสุสานอินเตอร์เน็ตสากลไม่ได้ฮะ!! มั่วซั่วจับแพะชนช้าง! 

---
---

## 📌 คำถามที่ 13
**โจทย์:**
A game company has a requirement of load balancing the incoming TCP traffic at the transport level (Layer 4) to their containerized gaming servers hosted in AWS Fargate. To maintain performance, it should handle millions of requests per second sent by gamers around the globe while maintaining ultra-low latencies.

Which of the following must be implemented in the current architecture to satisfy the new requirement?

**ตัวเลือก:**
- [ ] Launch a new microservice in AWS Fargate that acts as a load balancer since using an ALB or NLB with Fargate is not possible.
- [ ] Launch a new Application Load Balancer.
- [x] Launch a new Network Load Balancer.
- [ ] Create a new record in Amazon Route 53 with Weighted Routing policy to load balance the incoming traffic.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสุดขยัน ปั้นตึกเกมนรกแตก `AWS Fargate (Container)` ให้คอเกมแห่มาเล่นทั่วโลก
ความเรื่องมากบังเกิด: "มึงไปหายามหน้าบ้าน (Load Balancer) เจ๋งๆ มายืนคุมซะทีซิ... สเปคที่กูต้องการคือ **ต้องซดปริมาณ TCP traffic ชั้น 4 (Layer 4) ได้เป็นดิ่งนรกสิบล้านครั้งต่อวินาที (millions of requests per second) แบบเสี้ยววินาทีแทบไม่ดีเลย์ (ultra-low latencies)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของยาม Load Balancerฮะ!
- กฎแห่งความตาย: ถ้าใจมึงปรารถนาจะสู้รบกับความโกรธาจลาจลทะลุล้านซูเปอร์โซนิก **`"TCP (Layer 4) / Millions of requests per second / Ultra-low latency"`** 
- พี่กล้ามปูตัวเดียวในปฐพีที่รับอภิมหางานระดับซุปเปอร์ฮาร์ดคอร์นี้ได้ คือเทพเจ้าสายฟ้า **`Network Load Balancer (NLB)`** ทุบโจทย์กระจายกระพี้หอก 100% เลยฮะ!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch a new Network Load Balancer.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ไอ้เณรกล้ามปู `NLB` แม่งเกิดมาเพื่อเขมือบยอด TCP Layer 4 ความเร็วแสงทะลุมิติแบบบ้าระห่ำ ไม่แคร์สี่แคร์แปดอะไรทั้งนั้น รับแขกร้องกันทั่วหล้าด้วยความหน่วงติดดินสุดๆ ตอบเป๊ะโหยงๆ ไร้ข้อกังขา! 

❌ **[ผิด] Launch a new Application Load Balancer.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาซ้อหน้ามน `ALB` แม่งดีแค่ฉอเลาะเปิดซองจดหมายอ่านไส้ใน HTTP/HTTPS ชั้นฟ้า (Layer 7) ช้าๆ เนิบๆ โว้ยย!!! มันไม่ได้สถิตความถึกบ้าระห่ำอัดฉีด Layer 4 หรือดดันทุรังปะทะสิบล้านครั้งกระสุนสาดแบบ NLB!! กระหม่อมบางแบบนี้ใช้ผิดงานพินาศฮะ! 

❌ **[ผิด] Create a new record in Amazon Route 53 with Weighted Routing policy...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ขุมพลังป้ายจราจร `Route 53` แม่งเก่งแค่ชี้ทางสว่างร่ายมนต์สับน้ำหนักซ้ายขวา (DNS load balancing)... แต่มันไม่ได้มีสวิงตะแกรงรองรับเขมือบความบ้าคลั่งเหงื่อแตกพลั่กระดับสิบล้านทราฟฟิกชลอเวลาลามปามขนาดนั้นฮะ! เอาเสาไฟฟ้ามาบังรับกระสุนปืนกลเหรอฮะ มัวซั่วถอดปลอกคอหมาฮะ!

❌ **[ผิด] Launch a new microservice in AWS Fargate that acts as a load balancer since using an ALB or NLB with Fargate is not possible.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ใครหน้าไหนบอกมึงฮะว่า "เอาแก๊งยาม ALB/NLB ไปเสียบตูดตึก Fargate ไม่ได้"! กะลาครอบหัวชัดๆ! Fargate แม่งอ้าขารับยาม ALB/NLB ทุกรูขุมขนปกติสุขเว้ย! มึงกระแดะไปสร้างตู้ยามจำลองขึ้นมาปั่นเองให้รกโค้ดทำสากกะเบืออะไรฮะ โง่ดักดาน! 

---
---

## 📌 คำถามที่ 14
**โจทย์:**
A multinational corporate and investment bank regularly processes steady workloads of accruals, loan interests, and other critical financial calculations every night from 10 PM to 3 AM on their on-premises data center for their corporate clients. Once the process is done, the results are then uploaded to the Oracle General Ledger which means that the processing should not be delayed or interrupted. The CTO has decided to move its IT infrastructure to AWS to save costs. The company needs to reserve compute capacity in a specific Availability Zone to properly run their workloads.

As the Senior Solutions Architect, how can you implement a cost-effective architecture in AWS for their financial system?

**ตัวเลือก:**
- [x] Use On-Demand Capacity Reservations, which provide compute capacity that is always available on the specified recurring schedule.
- [ ] Use Regional Reserved Instances to reserve capacity on a specific Availability Zone and lower the operating cost through its billing discounts.
- [ ] Use On-Demand EC2 instances which allows you to pay for the instances that you launch and use by the second. Reserve compute capacity in a specific Availability Zone to avoid any interruption.
- [ ] Use Dedicated Hosts, which provide a physical host that is fully dedicated to running your instances, and bring your existing per-socket, per-core, or per-VM software licenses to reduce costs.

---
### 🎯 โจทย์ต้องการอะไร?
ดราม่าปะทุ: ธนาคารหน้าเลือดเจ้าเดิม ทำการปั่นงานคำนวณดอกเบี้ยหนี้สินกระจายตอนดึกสงัด **"โหมโรงทุกๆ สี่ทุ่ม ยาวไปถึงตีสี่ (10 PM to 3 AM) เท่านั้น!!"**
ข้อแม้บีบคอ: "งานมหากาพย์เงินล้านนี้ ห้ามเสือกหยุด! ห้ามพัง! ห้ามกระตุกดับ! เด็ดขาด (should not be delayed or interrupted) เคลื่อนย้ายมา AWS ทั้งที ต้องมี **โซลูชั่นจองเหมาเครื่องเซิร์ฟเวอร์ตีตราจองกั๊กที่ตายตัวล่วงหน้าในเขตเมืองหลวง (reserve capacity in a specific AZ)** แบบห้ามให้คนอื่นมาแย่งตอนดึกส้นตีนนี้เด็ดขาด แถมต้องประหยัดด้วยนะ!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ! 
- คาถายมราชประสานวิญญาณ:
  - 1) โจทย์สั่งตายว่าต้อง **"กั๊กที่จองพื้นที่รันเครื่องข้ามศพ (Reserve capacity)"** ในเขตปริมณฑล Availability Zone (AZ) ใดหนึ่งให้ได้ 100% ชัวร์ป้าบกันคนอื่นมาแย่งชิ่ง!
  - 2) เสือกใช้งานแค่ 5 ชั่วโมงตอนดึก... ออปชันเทพเจ้าที่เนรมิตฝันนี้ได้คือเปิดสวิตช์ **`On-Demand Capacity Reservations`** แม่งคือกฎบัตรสลักชื่อจองที่จอดรถส่วนตัว! "เห้ย AWS กูขอจองเครื่องสเปคนี้ ที่เขตมณฑลนี้นะเว้ย ห้ามใครแตะ!" จบข่าวรวบรัดฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use On-Demand Capacity Reservations, which provide compute capacity that is always available on the specified recurring schedule.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! หมอผีหน้าหล่อ `Capacity Reservations` จุติมาเพื่อแก้ปัญหาบ้าบอกั๊กที่จอดรถฮะ! มึงสามารถมัดจำเสกกั๊กที่ดึกแค่ไหนก็ไม่หลุด! รันตามคำสั่ง schedule ผุดขึ้นมาเป๊ะๆ ไม่มีหน้าแตก ไม่มีใครมาฉกเครื่องไปแดกแน่นอน ถูกใจวัยโจ๋ ตอบเป๊ะ 100%!

❌ **[ผิด] Use Regional Reserved Instances to reserve capacity on a specific Availability Zone...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ตั๋วเหมาโหล `Regional Reserved Instances` แม่ง **"ไม่มีมนต์ดำเสกจองพื้นที่ขยุ้มก้อนเครื่องแช่แข็งในตุ่ม AZ หรอกนะโว้ยย!! (No capacity reservation)"** มันมั่วซั่วหมาหยอกไก่ แจกส่วนลดครอบจักรวาลเฉยๆ ฮะ! ถ้าอยากจองพื้นที่มึงต้องถอยไปเล่นสายลึก `Zonal Reserved` โว้ย กระโดดเหยียบขี้หมาลื่นล้มฮะ! 

❌ **[ผิด] Use On-Demand EC2 instances... Reserve compute capacity in a specific Availability Zone to avoid any interruption.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้หนุ่มหน้าใสชื้อตั๋วหนังตู้ `On-Demand` เพียวๆ เนี่ย แม่งคือกฎแผงลอย "มีโต๊ะก็แดก ไม่มีโต๊ะก็ยืนรอ"ฮะ! **มันเสือกไม่มีออปชันให้กั๊กจองโต๊ะข้ามวันข้ามคืน (reserve capacity) ได้ด้วยตัวมันเองเด็ดขาดโว้ย!!** มันต้องคลุกเคล้ากับข้อตะกี้ (Capacity Reservations) คู่กันสิฮะ บ้าบอคอแตกหลงจักรวาล! 

❌ **[ผิด] Use Dedicated Hosts...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! บอสร้องให้ประหยัดตังค์... มึงดันหน้ามืดไปเสือกซื้อ "เซิร์ฟเวอร์เหล็กดัดเหมาทั้งรากฐานแม่เหล็ก 24 ชั่วโมง (Dedicated host)" เพื่อมารันก๊อกแก๊กแค่ 5 ชั่วโมงตอนดึกเนี่ยนะ! ปัญญาอ่อนที่สุดฮะ ผลาญตังค์กระจุยกระจาย โดนทุบหัวแบะ! 

---
---

## 📌 คำถามที่ 15
**โจทย์:**
A Python application running on VMware Cloud on AWS must connect to an Amazon DynamoDB table called tutorialsdojo. Considering the principle of least privilege access, a solutions architect must form an IAM policy that allows the application to read, write, update and delete items from the tutorialsdojo table only.

Which IAM policy would satisfy the requirements?

**ตัวเลือก:**
- [x] 
```json
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": [
"dynamodb:PutItem",
"dynamodb:DeleteItem",
"dynamodb:GetItem",
"dynamodb:UpdateItem"
],
"Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/tutorialsdojo"
}
]
}
```
- [ ] 
```json
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": "*",
"Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/tutorialsdojo"
}
]
}
```
- [ ] 
```json
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": [
"dynamodb:PutItem",
"dynamodb:DeleteItem",
"dynamodb:GetItem",
"dynamodb:UpdateItem"
],
"Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/*"
}
]
}
```
- [ ] 
```json
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Action": [
"dynamodb:Put*",
"dynamodb:Delete*",
"dynamodb:Get*",
"dynamodb:Update*"
],
"Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/tutorialsdojo"
}
]
}
```

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายนั่งยันนอนยัน: "มึงไปร่างหนังสือกฎหมายยันต์กันผี **`IAM Policy`** ให้แอปไพธอนกูที!"
บทบัญญัติศักดิ์สิทธิ์ (Least privilege): "อนุญาตให้แอปเสล่อๆ นี้ ทำได้แค่ **อ่าน (read), เขียน (write), แก้ไข (update) และ ลบทิ้ง (delete)** ผีดิบในหลุมฝังศพ `DynamoDB` ที่ชื่อว่า **`tutorialsdojo` เท่านั้นนะโว้ยยย (table only)!!** ห้ามแรดไปแตะตารางดาราคนอื่น หรือเสือกได้ออปชันงี่เง่าแปลกปลอมเด็ดขาด!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ! 
- คาถายมราชทะลวงตาบอด: "Least privilege" คือการเขียมสาดๆ! ให้เฉพาะสิ่งที่มึงร้องขอเป๊ะๆ ห้ามมีติ่งลามปาม!
  - 1) Action ต้องเจาะจงเป๊ะๆ ไม่มีดอกจันสั่วๆ: `GetItem`, `PutItem`, `UpdateItem`, `DeleteItem`
  - 2) Resource ต้องล็อกเป้าเป๊ะๆ แค่ตารางเดียว: `...:table/tutorialsdojo`
- เจอโค้ดบรรทัดไหนที่มีเครื่องหมาย **`* (Wildcard)`** โผล่แพลมมาแส่แต๋น... มึงจับหักคอโยนทิ้งโลดฮะ ผิดกฎกูขี้เหนียว!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง]**
```json
"Action": ["dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:GetItem", "dynamodb:UpdateItem"],
"Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/tutorialsdojo"
```
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามโจทย์เรียกร้องเป๊ะๆ! แอคชั่นล็อคสเปคชัดเจนทั้ง 4 กระจุก ไม่ลามปามไปท่าแปลกประหลาด และทรัพยากรก็ล็อคกุนแจขี้เหนียวให้บุกรุกได้แค่ที่ผืนดิน `tutorialsdojo` เท่านั้น! ขาวสะอาด บริสุทธิ์ผุดผ่อง 100% ฮะ!

❌ **[ผิด] `Action: "*"` ...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาการแบบนี้คือการยื่นตั๋วป๋าควักให้บัตรเครดิตรูดปื๊ดไม่อั้นฮะ! เอาเครื่องหมายทศกัณฑ์ `*` ลงไปปาดคอ Action แม่งคือเปิดกว้างให้ผีในตารางทำบ้าบอทำลายตาราง ทำขยะอะไรก็ได้อย่างเสรีฮะ ผิดวินัยทหาร Worst practice!

❌ **[ผิด] `"Resource": "arn:aws:dynamodb:...:table/*"` ...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! บอสร้องให้ทะลวงตารางเจาะจงแค่ `tutorialsdojo` เว้ยย!! มึงทะลึ่งไปเปิดกุญแจบังกะโล `table/*` ปล่อยผีบุกปะฉะดะตารางดาราคนอื่นทั้งแอคเคานต์ทะลวงไข่สั่นกระจ่างเลยหรอฮะ!? ตกการรับฟังอย่างแรง! 

❌ **[ผิด] `"Action": ["dynamodb:Put*", "dynamodb:Delete*", "dynamodb:Get*", "dynamodb:Update*"]` ...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! มึงติดนิสัยสาดกระสุน `*` ห้อยตูด Action กันนักหรอฮะ! ไอ้การสาดดาว `Update*` เนี่ย แม่งดันลากเหวิงปอบประหลาดติดมาเป็นพรวนด้วยอย่างเช่น `UpdateTable`, `UpdateGlobalTableSettings` ซึ่งบอสไม่ได้สั่งให้มึงบุกรุกไปทำเรื่องเสือกๆ พวกนี้เว้ย!! ฟันธงลบกระจุย!

---
---

## 📌 คำถามที่ 16
**โจทย์:**
A company is designing a customized text messaging service that targets its mobile app users. As part of its multi-engagement marketing campaign, a company needs to send a one-time confirmation message to all of its subscribers using Short Message Service (SMS). The solutions architect must design the system to allow a subscriber to reply to the SMS messages.

The customer responses must be kept for an entire year for analysis and targeted sale promotions. In addition, the SMS responses must also be collected, processed, and analyzed in near-real-time.

Which solution will meet these requirements with the LEAST operational overhead?

**ตัวเลือก:**
- [ ] Set up an Amazon Connect contact flow to send the confirmation SMS messages to the mobile app users. Deploy an AWS Lambda function to process and analyze the responses. Store the data to Amazon S3 Glacier Flexible Retrieval
- [x] Create an Amazon Pinpoint journey for the multi-engagement SMS marketing campaign and an Amazon Kinesis Data Stream for analysis. Configure Amazon Pinpoint to send events to the Kinesis data stream for collection, processing, and analysis. Set the retention period of the Kinesis data stream to 365 days.
- [ ] Launch a new Amazon Simple Queue Service (Amazon SQS) queue to send out SMS messages. Use AWS Step Functions and AWS Lambda to collect, process, and analyze responses. Store the data to Amazon S3 Glacier Instant Retrieval.
- [ ] Create a new topic in Amazon Simple Notification Service (Amazon SNS) and an Amazon Kinesis data stream configured with all its default settings. Send SMS messages using Amazon SNS. Integrate the Kinesis data stream to the SNS topic for data collection, archiving, and analysis.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสุดขยัน ปั้นแอปมือถือแล้วงอแงอยาก **"ส่ง SMS โฆษณายัดเยียดลูกค้าพร้อมแคมเปญกระหน่ำ (multi-engagement marketing campaign)"**
ความเรื่องมากบังเกิด 3 ชั้น:
1. ลูกค้าต้องกดส่ง SMS ด่าพ่อกลับมาได้ (reply)
2. ขยะคำด่าลูกค้าต้องถูกสะสมจับดองฟอร์มาลีนไว้ **1 ปีเต็ม (an entire year)** ไว้มาทบทวนบาป!
3. สเต็ปตอบกลับพวกนี้ต้องสวิงสวายจับปั่นน้ำผลไม้ยืนวิเคราะห์สายโหดแบบโคตรสด **(near-real-time)**
คำถามบ๊องแบ๊วท้าอนุบาล: "กูต้องงัดค้อนอาวุธหน้าตาแบบไหนมาผสมพันธุกรรม ถึงจะสะบัดบ็อบจบปัญหานี้สวยๆ เน้นถูบ้านง่ายๆ สบายเกลียว (LEAST operational overhead) วะ?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ: 
  - 1) อ่าว.. กะเล่นบทพ่อพระใจบุญ **โปรย SMS โฆษณาล่าแต้ม (multi-engagement marketing)** พระเอกหัวกระทิช่องนี้ก็คือตู้จดหมายรัก **`Amazon Pinpoint (journey)`** แน่นอน 100% 
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ขอสวิงสวายผ่าสดด่ากลับวิเคราะห์เรียลไทม์ **(Real-time processing)** และดองยาว 1 ปี... มึงหนีไม่พ้นต้องซบไหล่อุโมงค์นรก **`Amazon Kinesis Data Stream`** ที่สับสวิตช์ยืดอายุดองกระดูกทะลุ **365 days**!! ฮาร์ดคอร์เคลียร์โจทย์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon Pinpoint journey... and an Amazon Kinesis Data Stream... Set the retention period of the Kinesis data stream to 365 days.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โยนไม้ตาย `Amazon Pinpoint` เสิร์ฟ SMS ลูกค้าได้บรรเจิดแจ่มจรัสสุดๆ ขจัดข้อสงสัย! จากนั้นเอาท่อ `Kinesis Data Stream` รองรับขี้ปลาวาฬเวลาลูกค้าตอบกลับเพื่อรันเวทมนตร์เรียลไทม์ แล้วสับเกียร์ขยายตู้เย็นดองซากไว้ 365 วัน (1 ปี) ครบ 3 คอมโบหน้าแหกแตกกระเซ็น ตอบข้อนี้แล้วบินได้เลยฮะ!

❌ **[ผิด] Create a new topic in Amazon SNS and... Amazon Kinesis data stream configured with all its default settings...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาซ้อ `Amazon SNS` मै่งเป็นแค่เสาโทรเลขยิงแบล็บ SMS ทื่อๆ หน้าด้านๆ... นางไม่มีเซนส์ศิลปะทำโปรโมชั่นรักคุด (Marketing campaign / Journey) แฝงอะไรกับชาวบ้านเขาหรอกฮะ กระด้างสุดๆ! และที่นรกแตกกว่าคือ... มึงปล่อยลอยแพ `Kinesis default settings` ซึ่งแปลว่าหน้าไพ่มันจะดองซากได้ชิวๆ แค่ **24 ชั่วโมงโว้ย!!** บอสบอกจะยืดเป็น 1 ปี ไม่แหกตาดูเลย! กาวทะลุหลอด!

❌ **[ผิด] Launch a new Amazon SQS queue to send out SMS messages...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้ห้องส้วม `Amazon SQS` แม่งเอาไว้ซุกคิวจดหมายระหว่างช่างเชื่อมใน AWS คุยกันเองโว้ยย!! มันไม่มีเสาไฟฟ้าเอาไปดัดแปลงยิงข้อความ SMS เข้ามือถือชาวป่าได้หรอกฮะ!! ผิดฟังก์ชั่นระดับขุดหลุมฝังตัวตาย! 

❌ **[ผิด] Set up an Amazon Connect contact flow...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้หน้าปัด `Amazon Connect` มันคือห้องคอลเซ็นเตอร์สแครชแผ่นรับสายชาวบ้านฮะ!" มึงจะเอามันมารับจ๊อบถ่อตูดส่ง SMS โฆษณาเด็กปั๊มแบบงี่เง่าทำสากกะเบืออะไรฮะ!! สติแตกหลุดจักรวาล บำรุงรักษาเหนื่อยแตกตายฮะ! 

---
---

## 📌 คำถามที่ 17
**โจทย์:**
A startup is building a microservices architecture in which the software is composed of small independent services that communicate over well-defined APIs. In building large-scale systems, fine-grained decoupling of microservices is a recommended practice to implement. The decoupled services should scale horizontally from each other to improve scalability.

What is the difference between Horizontal scaling and Vertical scaling?

**ตัวเลือก:**
- [ ] Horizontal scaling means running the same software on bigger machines which is limited by the capacity of individual servers. Vertical scaling is adding more servers to the existing pool and doesn’t run into limitations of individual servers.
- [x] Vertical scaling means running the same software on bigger machines which is limited by the capacity of the individual server. Horizontal scaling is adding more servers to the existing pool and doesn’t run into limitations of individual servers.
- [ ] Horizontal scaling means running the same software on smaller containers such as Docker and Kubernetes using ECS or EKS. Vertical scaling is adding more servers to the existing pool and doesn’t run into limitations of individual servers.
- [ ] Vertical scaling means running the same software on a fully serverless architecture using Lambda. Horizontal scaling means adding more servers to the existing pool and it doesn’t run into limitations of individual servers.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายเพิ่งไปกินลมชมวิวกลับมา อยากเปิดคอร์สสอนปรัชญาช้างเผือก:
คำถามบ๊องแบ๊วท้าอนุบาล: "เห้ยพวกเสมียน! มึงจงนิยามความฝันเปียกสีกากีความแตกต่างระหว่าง **ปั้มกล้ามแนวตั้ง (Vertical scaling)** กับ **ปั้มกล้ามแนวนอน (Horizontal scaling)** มาให้กูชื่นใจทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง AWS ฮะ!
- ท่องจำขึ้นใจไปยันตาย: 
  - **`Vertical Scaling` (Scale Up):** คือการเอาเครื่องคอมกระจอกมาอัดฉีดสเตียรอยด์ "ซื้อแรม ซื้อ CPU มายัดอัพเกรดให้เครื่องมันตัวใหญ่กล้ามปูขึ้น (bigger machines)" แต่ถึงจุดนึง กล้ามสุกมันก็จะตันเพดานกะโหลก!! (limited by individual server capacity)
  - **`Horizontal Scaling` (Scale Out):** คือไม่ต้องเบ่งกล้าม! แต่เป็นการ **"จับโคลนนิ่งงอกร่างแยกเงี้ยวพันตัว (adding more servers)"** กระจายมดงานเข้ามารุมกระทืบ ช่วยๆ กันหารงานไป! แบบนี้สิวะ ไร้ข้อจำกัด ขยายเป็นหมื่นเป็นล้านตัวก็ได้ชิวๆ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Vertical scaling means running the same software on bigger machines which is limited by the capacity of the individual server. Horizontal scaling is adding more servers to the existing pool and doesn’t run into limitations of individual servers.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! นิยามเป๊ะปังระดับหนังสือเรียน สลับฉากอวดรวยขึงขลัง Vertical = เบ่งเครื่องให้ใหญ่โตแต่สักวันก็ตัน / Horizontal = ปั้มร่างแยกกองทัพเพิ่มหัวเครื่องไม่หวาดไม่หวั่นทะลุขีดจำกัด!! ให้คะแนนเต็มร้อยฮะ!

❌ **[ผิด] Horizontal scaling means running the same software on bigger machines which is limited by the capacity of individual servers. Vertical scaling is adding more servers...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!! มันจับนิยามของ Vertical สลับกับ Horizontal พินาศมั่วซั่วไปหมดฮะ งี่เง่าสุดๆ!! 

❌ **[ผิด] Horizontal scaling means running the same software on smaller containers such as Docker and Kubernetes...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้การที่คุณมึงทะลึ่งยกคอนเทนเนอร์ Docker ขึ้นมาพร่ำเพ้อเนี่ย มันไม่ได้มีส่วนเสี้ยวเกี่ยวกับการให้คำนิยามสายสัญญะ Horizontal เหี้ยอะไรเลยฮะ! มันแค่ชื่อเครื่องมือ!! ตกหน้าผาตายฮะ!

❌ **[ผิด] Vertical scaling means running the same software on a fully serverless architecture using Lambda...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ไปเอาหลักจรรยาบรรณวิศวกรมาจากส้วมบ่อไหนหรอฮะ ที่บอกว่า Vertical = ถวายหัวให้ Serverless Lambda วะ!! บ้าบอคอแตกหลงจักรวาล เพี้ยนกะโหลกร้าวฮะ ลบกระจุยทิ้งลงโถ!

---
---

## 📌 คำถามที่ 18
**โจทย์:**
A company plans to launch an application that tracks the GPS coordinates of delivery trucks in the country. The coordinates are transmitted from each delivery truck every five seconds. The must be able to process coordinates from multiple consumers in real-time. The aggregated data will be analyzed in a separate reporting application.

Which AWS service should you use for this scenario?

**ตัวเลือก:**
- [ ] Amazon AppStream
- [ ] Amazon Simple Queue Service
- [ ] Amazon Elastic MapReduce (EMR)
- [x] Amazon Kinesis

---
### 🎯 โจทย์ต้องการอะไร?
จะสร้างแอประบุตำแหน่งสะกดรอยสิบล้อส่งของปลาร้า กระจายไปทั่วจักรวาลประเทศ
เงื่อนไขอำมหิต: "สัญญาณ GPS ของสิบล้อทุกคันระยำ จะถูกสาดกระสุนมาให้ส่วนกลางรัวๆ **ทุกๆ 5 วินาที!!**" หน้าที่มึงคือหาตัวมารับจบ ปั่นเขมือบพายุข้อมูลกระแสไหลหลากพวกนี้โชว์สเต็ป **"เรียลไทม์ (real-time processing)"** ซะทีซิ!! 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชรัวฮีลอันดับ 1 : บอสร้องประท้วงให้กราบไหว้ท่อสูบน้ำบาดาล **"กลั่นแกล้งสูบน้ำข้อมูลบ้าคลั่ง ท่อแตกรายวิถีแบบสดๆ หยดต่อหยด (Streaming / Real-time / Every 5 sec)"**
- เทพบุตรพระเอกขี่ม้าขาวหนึ่งเดียวในแดน AWS ที่รับจ๊อบกระดูกเบอร์ล้านนี้ได้ คือพระเจ้า **`Amazon Kinesis`** เท่านั้นฮะ!! ตอบไม่ต้องคิดหน้าคิดหลัง ข้ามค่ายไปด่านต่อไปได้เลย! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon Kinesis**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! อุโมงค์ท่อน้ำนรกแตก `Kinesis` โคตรถนัดงานเขมือบลมหายใจรัวๆ ทุกวินาที สกิลโต้คลื่นสตรีมมิ่งปะทะหน้าพายุข้อมูลสด Real-time นี่คืองานถนัดที่มันเกิดมาเพื่อสิ่งนี้เลยฮะ ไม่ต้องลีลาท่าเยอะฮะ! 

❌ **[ผิด] Amazon Elastic MapReduce (EMR)**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาเฮีย `EMR (Hadoop/Spark)` แม่งคือช้างสารโรงสีข้าว ถนัดเคี้ยวปลาวาฬตัวใหญ่ๆ แต่เป็นแบบง่อยๆ "หมักทิ้งไว้เป็นโกดังแล้วค่อยขยับเหงือกประมวลผล (Batch mode)"โว้ย!! มันไม่ได้หน้าไวปั่นของดิบสด Real-time แข่งกับเวลาทุก 5 วิแบบสายเลือด Kinesis หรอกฮะ ชนชั้นมันต่างกัน ผิดกระบวนการสืบพยาน! 

❌ **[ผิด] Amazon Simple Queue Service**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้ห้องส้วม `SQS` มันเป็นแค่โถซุกขยะพักจดหมายไว้ให้ชาวบ้านมาเปิดอ่านแบบชิวๆ โว้ย!!" มันไม่ได้เกิดมาแบกหน้ารับกระสุนสายน้ำหลาก Real-time บ้าบอแตกที่ปลิวมาล้านเส้นพร้อมกันแบบนี้ฮะ ถ้าร้ายแรงขนาดนี้ต้อง Kinesis สถานเดียว!

❌ **[ผิด] Amazon AppStream**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้เพนกวินหน้าโง่ `AppStream` แม่งเอาไว้ "แชร์แชร์หน้าจอ ถ่ายทอดสดโปรแกรมคอม (Desktop proxy) ลงเบราว์เซอร์ชาวบ้าน" โว้ย!! มึงเอามันมารับหน้าที่บดขยี้ GPS ของสิบล้อทำหาพระแสงสากกะเบืออะไรฮะ!! ฮาขี้แตกหลงป่าเผาบ้านฮะ โคตรมั่วถอดปลอกคอหมาฮะ!

---
---

## 📌 คำถามที่ 19
**โจทย์:**
A company developed a financial analytics web application hosted in a Docker container using MEAN (MongoDB, Express.js, AngularJS, and Node.js) stack. You want to easily port that web application to AWS Cloud which can automatically handle all the tasks such as balancing load, auto-scaling, monitoring, and placing your containers across your cluster.

Which of the following services can be used to fulfill this requirement?

**ตัวเลือก:**
- [ ] Amazon Elastic Container Service (Amazon ECS)
- [ ] AWS CloudFormation
- [ ] AWS Compute Optimizer
- [x] AWS Elastic Beanstalk

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสุดขยัน ปั้นตึกแอปวิเคราะห์การเงินเท่ๆ แบบวัยรุ่นสแต็ค **`MEAN (MongoDB, Express, Angular, Node)`** แถมแพ็คกระเป๋ายัดกล่อง **`Docker container`** สุดหรูมาเรียบร้อย!
ความขี้เกียจบังเกิดกะทันหัน: "กูอยากโยกถังส้วมนี้โยนลง AWS อะ! แต่กูแม่งขี้เกียจสันหลังยาวมาก!! กูขอเครื่องมือวิเศษ **ที่จัดการปั้นฐานตึกทุกซอกทุกมุมให้กูอัตโนมัติรัวๆ เลยนะเว้ย! (automatically handle balancing load, auto-scaling, monitoring) แบบเอาของโยนใส่หน้ามึงแล้วเนรมิตเซิฟเวอร์ให้กูเสร็จสรรพ!!**" 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงคนขี้เกียจฮะ!
- กฎแห่งความตาย: ถ้าใจมึงปรารถนาจะล้างมือในอ่างทองคำ โยนโค้ดเวรๆ หยิบมือเดียว หรือโยนกล่อง Docker ใส่ตู้ปณ... แล้วร้องขอให้มี "จินนี่เสกสรรค์ เนรมิตตึก EC2, ฐานยาม Load balancer, เกลี่ยเสาเข็ม Auto-scaling อัตโนมัติ" หน้ามืดตามัว
- พระเอกบริการซักรีดเบอร์ 1 ของคนขี้เกียจ (PaaS) ในจักรวาล AWS ก็คือลูกรัก **`AWS Elastic Beanstalk`** โว้ย!! มึงแค่โยน Docker ทิ้งไว้ เดี๋ยวพ่อกางร่มจัดการเสกทุกสิ่งอัตโนมัติให้เองฮะ จบ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Elastic Beanstalk**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! หมอผีหน้าหล่อ `Elastic Beanstalk` แม่งเกิดมาเพื่อถักทอร้อยพวงมาลัยรับจบให้คนขี้เกียจสันหลังยาวแบบมึงฮะ! เพียงแค่กระดิกหูโยน Docker ให้มันกลืนกิน มันก็จะคายเสาเข็มตึก ปั้น Load balancer ถีบออโต้สเกลครบวงจรให้อย่างงามตา ชีวิตแสนสุขี ตอบเป๊ะโหยงๆ ไร้ข้อกังขา! 

❌ **[ผิด] Amazon Elastic Container Service (Amazon ECS)**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! แม้ลุงท่าเรือ `ECS` จะรักการสวิงสวายเตะปลั๊ก Docker สุดหัวใจ... แต่ลุงแกเสือก "ให้เกียรติจงใจทิ้งบอมบ์ตั้งค่าส้นตีนๆ หลายปุ่มให้มึงทำเอง (ไม่ได้ Automatic ขนาดนั้น)!!" มึงต้องปั้นตั้งรอกล้ามขึ้นในการเซียน Load balancer ควบ Auto-scale เองกับมือขีดกระจุย! แต่กระทรวงนี้เจ้านายร้องหาแต่ "ความอัตโนมัติไร้รอยต่อ"... มึงส่ง ECS ไปก็บรรลัยหน้าแหกฮะ ไม่รอด! 

❌ **[ผิด] AWS CloudFormation**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้หีบสมบัติ `CloudFormation` มันคือกรรมกรถือพิมพ์เขียว JSON เว้ย!! มึงเอาท่อนรกนี้มาเขียนโค้ดเนรมิตตึกเองทุกอิฐทุกกระเบื้อง (Manual setup) บ้าบอคอแตกโคตรลำบากเหนื่อยขบกบาล! บอสสั่งว่าจงหาทางลัดสบายสุด มันเอาหินทุบหัวตัวเองทำสากกะเบืออะไรฮะ โง่ดักดาน! 

❌ **[ผิด] AWS Compute Optimizer**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้หน้าปัด `Compute Optimizer` แม่งเป็นอีเจ๊จุ้นจ้านเอาไว้ส่องตูด EC2 แล้วแอบซุบซิบให้มึงเปลี่ยนไซส์เครื่องให้ถูกลงเพื่อประหยัดตังค์!" มันไม่ได้มีความสามาถจับตุ๊กตา Docker ไปเพาะพันธุ์สร้างตึกเนรมิตอะไรแบบนี้เลยฮะ สติแตกหลุดจักรวาลมั่วซั่วหัวไชเท้า!!

---
---

## 📌 คำถามที่ 20
**โจทย์:**
An airline company receives a lot of requests to book flights, update booking details, and flight check-ins. Since these requests flood the customer support teams, the management wants to build a self-service solution that can handle these requests without a human agent. This solution should be text-based, allowing users to type concerns in a chat box while AI analyzes intentions, provides answers, or fulfills predefined actions automatically.

Which of the following options is the recommended solution for the above requirements?

**ตัวเลือก:**
- [x] Deploy a conversational chatbot using Amazon Lex. Define conversation flow for specific user intentions. Integrate AWS Lambda functions as code hooks to perform actions based on user requests.
- [ ] Work with an AWS Managed Service Provider (MSP) to deploy a conversational chatbot using Amazon Polly for natural-language processing (NLP) and Speech Synthesis Markup Language (SSML) to enhance spoken responses. Integrate AWS Lambda functions as code hooks to perform actions based on user requests.
- [ ] Deploy a conversational chatbot using Amazon Rekognition. Define conversation flow for specific user intentions. Create AWS Lambda functions that can be invoked depending on user intentions.
- [ ] Create a conversational chatbot using Amazon Comprehend for natural-language processing (NLP). Depending on the user’s intent, invoke AWS Lambda functions that can perform the needed actions.

---
### 🎯 โจทย์ต้องการอะไร?
สวรรยาแอร์ไลน์ปูดระเบิด: คอลเซ็นเตอร์หัวแตก เพราะเจอสายโทรทวงตั๋ว เปลี่ยนไฟล์ท ระรัวท่วมท้น
เจ้านายสั่งเด็ดขาด: "พวกมึงไปปั้น **หุ่นยนต์แชทบอทตอบกวนตีนอัจฉริยะ (Conversational chatbot / Text-based)** มาสักตัวซิ!! ให้มันคุยกับลูกค้า รับรู้สันดานจุดประสงค์ (AI analyzes intentions) แล้วเสกคำตอบทำรายการให้เสร็จสรรพแทนมนุษย์ที!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความตาย: ถ้าใจมึงปรารถนาจะเนรมิตผีสิง **`"Chatbot พิมพ์โต้ตอบอัจฉริยะวิเคราะห์ความต้องการ (Intents / Natural language)"`**  
- พระเอกหน้าหยกแห่งศตวรรษนี้คือพ่อวัวล่ำ **`Amazon Lex`** (สมองส่วนวิเคราะห์ภาษาตัวเดียวกับที่ซ่อนในตุ๊กตา Alexa)!! แล้วเอาเสาหลังบ้านอย่าง **`AWS Lambda`** มาประกบรับคำสั่งทำงานเบื้องหลังแทนคน... โว้ว! คู่จิ้นนบสวรรค์รังสรรค์เสร็จสรรพเพอเฟ็กต์ 100%! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy a conversational chatbot using Amazon Lex. Define conversation flow... Integrate AWS Lambda functions as code hooks...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! หมอผีหน้าหล่อ `Lex` แม่งคือผู้ถือคัมภีร์จักรวาลแชทบอท! ควบคู่ท่าไม้ตายจับโยงหนวดสายสะดือกับ `Lambda` เพื่อกดรันโต้ตอบเนรมิตตั๋วบินให้เสร็จสรรพไร้เทียมทาน! ไม่มีที่ติ ตอบข้อนี้แล้วบินได้เลยฮะ!

❌ **[ผิด] Work with an AWS Managed Service Provider (MSP) to deploy a conversational chatbot using Amazon Polly...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงตาปลาดุกหรอฮะ!? ลูกแม่ค้า `Amazon Polly` แม่งคือสากกะเบือ "แปลงตัวอักษรให้ออกเสียงพูดทื่อๆ (Text-to-Speech)" โว้ย!! มันไม่มีสมองซีกซ้ายไปปั้นประทับกบาลคุยฉะฉานตบมุขแชทบอทวิเคราะห์เจตจำนงค์ห่าอะไรแบบนี้หรอกฮะ งี่เง่าสุดติ่ง! 

❌ **[ผิด] Deploy a conversational chatbot using Amazon Rekognition...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ไอ้หีงห้อยหน้าตาย `Amazon Rekognition` แม่งทำหน้าที่ "ลืมตาส่องกล้องแสกนใบหน้าหาตำรวจ / วิเคราะห์วีรเวรภาพนิ่ง" โว้ยย!! มึงเสือกเอากล้องวงจรปิดมาเสกเป็นตัวหนังสือคุยจ้อแจ๊ะแชทบอททำสากกะเบืออะไรฮะ!! สติแตกหลุดจักรวาลมั่วซั่วหัวไชเท้า!!

❌ **[ผิด] Create a conversational chatbot using Amazon Comprehend...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! พระนางงี่เง่า `Amazon Comprehend` แม่งคือพระโอษฐ์แห่งการ "อ่านจับใจความหนังสือพิมพ์ว่าวันนี้คนด่ารึคนชม (Sentiment analysis / NLP)" เฉยๆฮะ!! นางไม่ได้มีหน้าต่างหน้าปัดระบบมารองรับรังสรรค์ปั้นบทสนทนาแชทบอท (Conversation flow) หรูหราแบบ Lex!! คนละสายงานกันฮะ อย่าเสร่อเอาแพะมาชนกับเครื่องบินฮะ! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 3: ข้อ 21 - 30)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 21
**โจทย์:**
A tech company is having an issue whenever they try to connect to the newly created EC2 instance using a Remote Desktop connection from a computer. Upon checking, the Solutions Architect has verified that the instance has a public IP and the Internet gateway and route tables are in place.

What else should he do to resolve this issue?

**ตัวเลือก:**
- [ ] You should create a new instance since there might be some issue with the instance
- [x] Adjust the security group to allow inbound traffic on port 3389 from the company’s IP address.
- [ ] Adjust the security group to allow inbound traffic on port 22 from the company’s IP address.
- [ ] You should restart the EC2 instance since there might be some issue with the instance

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่ปลูกตึก `EC2 (Windows)` ตัวใหม่เอี่ยมอ่องเสร็จปุ๊บ กะจะรีโมทหน้าจอเข้าไปตั้งค่า **`(Remote Desktop connection)`** สักหน่อย ปรากฏว่าเข้าไม่ได้ฮะ! ขาวโพลน!
ตรวจสอบเบื้องต้น: มี Public IP แล้ว (ทางเข้าหน้าบ้านมี), เสียบ Internet Gateway แล้ว, Route tables เปิดทางแล้ว (สะพานเชื่อมอินเตอร์เน็ตครบถ้วน)
คำถามบ๊องแบ๊วท้าอนุบาล: "กูยังลืมทำห่าอะไรอีกวะเนี่ย ถึงรีโมทเข้าเครื่องไม่ได้ ช่วยบอกทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความตาย: ถ้าใจมึงปรารถนาจะสิงร่างคุยโทรจิตเข้าเครื่องคอมระยะไกลท่องจำไว้เลย:
  - สาย **Linux (จอสายคำสั่งมืดๆ):** ต้องเจาะรูกำแพงเหล็ก (Security Group) รูเบอร์ **`SSH (Port 22)`**
  - สาย **Windows (จอภาพสวยงาม):** ต้องเจาะรูกำแพงเหล็ก (Security Group) รูเบอร์ **`RDP (Port 3389)`**
- ในข้อนี้โจทย์ดักควายว่าต้องการ `Remote Desktop (Windows)` ฉะนั้นฟันธงลงดาบสับเข้าที่คอหอย **Port 3389** ชัวร์ป้าบ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Adjust the security group to allow inbound traffic on port 3389 from the company’s IP address.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ลืมเจาะยามหน้าตึกฮะมึง! มึงมีเน็ตหน้าบ้านแต่ยามไม่เปิดประตูให้ก็เข้าไม่ได้สิฮะ ต้องไปตั้งค่ากะลากำแพง Security Group เบิกเนตรช่องเบอร์ `3389 (สัญลักษณ์ผีดิบ RDP)` เพื่ออนุญาตให้ออฟฟิศมึงเปิดประตูมิติเข้ามาได้ฮะ! 

❌ **[ผิด] Adjust the security group to allow inbound traffic on port 22 from the company’s IP address.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!! พอร์ต `22 (SSH)` แม่งเอาไว้มุดเข้าอุโมงค์เครื่อง Linux ดำๆ โว้ย! มันเสือกดมกาวมาเจาะรูตอบ Remote Desktop Windows หน้าตาเฉยฮะ ผิดช่องตายห่า! 

❌ **[ผิด] You should restart the EC2 instance...** และ **You should create a new instance...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยย เครื่องเพิ่งสร้างใหม่เอี่ยมเลยเว้ย จะให้ชัตดาวน์แล้วลบทิ้งง่อยๆ แค่เพราะเข้าไม่ได้เนี่ยนะฮะ!?" สติปัญญาติดดอยฮะ! ปัญหาแม่งงี่เง่าแค่ยามหน้าประตูบล็อค ไม่เกี่ยวห่าอะไรกับไส้ในเซิร์ฟเวอร์เพี้ยนหรอกฮะ โง่ดักดาน! 

---
---

## 📌 คำถามที่ 22
**โจทย์:**
An application is using a Lambda function to process complex financial data that run for 15 minutes on average. Most invocations were successfully processed. However, you noticed that there are a few terminated invocations throughout the day, which caused data discrepancy in the application.

Which of the following is the most likely cause of this issue?

**ตัวเลือก:**
- [ ] The concurrent execution limit has been reached.
- [ ] The failed Lambda Invocations contain a ServiceException error which means that the AWS Lambda service encountered an internal error.
- [x] The failed Lambda functions have been running for over 15 minutes and reached the maximum execution time.
- [ ] The Lambda function contains a recursive code and has been running for over 15 minutes.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสุดขยัน ปั้นตึกเสากระโดงผีสิง **`AWS Lambda`** ให้รันบดขยี้ตัวเลขการเงิน (complex financial data)
แอบกระซิบชี้แจง: "ส่วนใหญ่งานนี้แม่งใช้เวลาวิ่งลากเลือด **เฉลี่ยประมาณ 15 นาที (run for 15 minutes on average)!!**" 
ดราม่าปะทุ: แต่แล้ว... แม่งดันมีจังหวะนรกที่โดนศาลเตี้ย AWS **"กระทืบปลั๊กดับกลางอากาศแบบงงๆ (terminated invocations)"** ทำเอาฐานข้อมูลพินาศฉิบหาย!
คำถามบ๊องแบ๊วท้าอนุบาล: "มึงช่วยคลำหาต้นตอหน่อยซิ ว่าแม่งดับทุเรศๆ เพราะอะไร!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง AWS Lambdaฮะ!
- กฎเหล็กคนขี้กลัวแห่ง Lambda: กฎหมายอาญาของ Lambda แม่งเผด็จการมาก! ห้ามมึงรันแช่แรดข้ามคืนเด็ดขาด!! **เวลาอายุขัยสูงสุดที่ AWS ให้มันมีชีวิตอยู่คือ 900 วินาที หรือเท่ากับ 15 นาทีถ้วนเป๊ะๆ (maximum execution time)!!**
- ถ้างานมึงเสือกตูดหนักยืดยาดเกิน 15 นาทีปั๊บ... มันจะเอามีดสับคอหอยตัดปลั๊กทิ้งทันทีไม่ต้องปรานี!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The failed Lambda functions have been running for over 15 minutes and reached the maximum execution time.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โดนข้อหาวิ่งเข้าเส้นชัยเกินเวลาที่กฎหมายกำหนดชัวร์ป้าบ! โจทย์เสือกฟ้องโต้งๆ ว่างานนี้แม่งโดยเฉลี่ยล่อไป 15 นาทีเป๊ะ แปลว่าต้องมีบางจังหวะที่เสือกดีเลย์วิ่งทะลุ 15 นาทีชัวร์ๆ พอล้ำเส้น 15 นาทีปุ๊บ ก็โดน AWS ถีบปลั๊กกระเด็นสลบเหมือดไปไงฮะ! ตรรกะทะลุปรุโปร่ง 100%!

❌ **[ผิด] The concurrent execution limit has been reached.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาการโควต้าเรียกใช้พร้อมกันเต็ม (1,000 threads) น่ะ... AWS มันไม่ได้เอามีดสับคอตัดปลั๊กให้มันตุยกลางอากาศนะฮะ! แต่มันจะทำแค่ **"ชลอโยนใบสั่งปัดตกคิวให้รอ (Throttle)"** เท่านั้นเว้ย มันจะไม่ปลิดชีพคนที่กำลังวิ่งเข้าเส้นชัยจนข้อมูลพินาศแบบนี้ฮะ มั่วซั่วจับแพะชนช้าง! 

❌ **[ผิด] The failed Lambda Invocations contain a ServiceException error...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "มึงจะบอกว่าดาต้าเซ็นเตอร์ AWS ไฟไหม้อุปกรณ์เซิร์ฟเวอร์เจ๊งเป็นช่วงๆ ตลอดทั้งวันเนี่ยนะฮะ!?" ปัญญาอ่อนที่สุดฮะ พระเอก AWS ไม่ล่มสั่วๆ เป็นเบี้ยหัวแตกหรอกฮะ ต้นเหตุที่ชัดล้านเปอร์เซ็นคือมึงดื้อรันแช่เกิน 15 นาทีต่างหาก โทษตะกร้าเหยียบขี้หมาลื่นล้มฮะ!

❌ **[ผิด] The Lambda function contains a recursive code and has been running for over 15 minutes.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้ท่อบั๊กโค้ดกินตะกร้อเวียนตายเกิดซ้ำซาก (Recursive loop)" มันทำให้บิลสิ้นเดือนมึงพังบรรลัยฮะ!... แต่มันก็ไม่ได้ฉีกกฎการตัดคอ 15 นาทีโว้ยย!! ไม่ว่ามึงจะหมุนซ้ำๆ ห่าอะไรก็ตาม พอแตะยอดเขา 15 นาทีมึงก็ต้องโดนสับปลั๊กตายอยู่ดีฮะ ความผิดอยู่ที่ 15 นาที ไม่ได้อยู่ที่โค้ดหมุนฮะ! 

---
---

## 📌 คำถามที่ 23
**โจทย์:**
An application is loading hundreds of JSON documents into an Amazon S3 bucket every hour which is registered in AWS Lake Formation as a data catalog. The Data Analytics team uses Amazon Athena to run analyses on these data, but due to the volume, most queries take a long time to complete.

What change should be made to improve the query performance while ensuring data security?

**ตัวเลือก:**
- [ ] Compress the data into GZIP format before storing it in the S3 bucket. Apply an IAM policy with aws:SourceArn and aws:SourceAccount global condition context keys in Lake Formation that prevents cross-service confused deputy problems and other security issues.
- [ ] Apply minification on the data and implement the Lake Formation tag-based access control (LF-TBAC) authorization strategy to ensure security.
- [ ] Convert the JSON documents into CSV format. Provide fine-grained named resource access control to specific databases or tables in AWS Lake Formation.
- [x] Transform the JSON data into Apache Parquet format. Ensure that the user has an lakeformation:GetDataAccess IAM permission for underlying data access control.

---
### 🎯 โจทย์ต้องการอะไร?
ดราม่าปะทุ: ฝูงมดงานขนขยะ `JSON` เทเทใส่บ่อพัก `Amazon S3` กองเป็นภูเขาทุกชั่วโมง ถังนี้ถูกจดทะเบียนเซรามิก `AWS Lake Formation` ดูแลความปลอดภัย
ความงอแงบังเกิด: "ทีมคณิตกรสวมแว่น ควักปืน `Amazon Athena` มานั่งยิงสืบค้นข้อมูลในภูเขานี้... ปรากฏว่า **ยิงทีแม่งหนืดเหนียว ชักช้าเต่าคลานมากๆ (queries take a long time to complete)!!**"
คำสั่งเพชฌฆาต: "มึงเอาตัวรอดหน้างานให้กูที! ทำไงถึงจะ **เพิ่มสปีดการสืบค้น (improve query performance)** ให้พุ่งปรี๊ดขึ้น และยังเกาะแน่น **กฎความปลอดภัย (data security)** ของบึงศักดิ์สิทธิ์ได้ด้วย!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! คู่หูทำลายล้างของพระเอกหน้าหยก Amazon Athena!
- คาถายมราชประสานวิญญาณ:
  - 1) ถ้าตึก `Athena` ร้องโอดโอยว่าอืดเต่าคลาน ท่าสวดมนต์แก้เคล็ดเดียวให้สปีดพุ่งปรี๊ด (แถมประหยัดเงิน) คือเปลี่ยนสันดานขยะจาก `JSON / CSV (อ่านทั้งแผง)` ให้เป็น **`Apache Parquet หรือ ORC (แบบบีบอัดแท่งดินสอ Columnar)`** เท่านั้น!! มันจะวิ่งเร็วขึ้น 200% ทันทีฮะ!
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ต้องดูแลคัมภีร์วิเศษ `Lake Formation` ด้วย... กฎเหล็กของท่อกรองน้ำบาดาลนี้คือ มึงต้องเสกบัตรประชาชน **`lakeformation:GetDataAccess`** โว้ย!! ถึงจะมีสิทธิ์แหกตาดูเครื่องเคราข้อมูลสุดลึกนี้ได้ฮะ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Transform the JSON data into Apache Parquet format. Ensure that the user has an lakeformation:GetDataAccess IAM permission...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! อัญเชิญอาวุธระดับพระกาฬ `Apache Parquet` มาถีบยอดหน้า JSON ง่อยๆ ทิ้งไปซะ สปีดอ่านพุ่งกระฉูดทะลุกระป๋องทันทีฮะ แถมกำแพงป้องกันค่ายกล Lake Formation ก็แก้ด้วยการแจกยันต์ `GetDataAccess` โฟกัสเป้าหมายเพอร์เฟ็คระดับหนังสือเรียนฮะ!

❌ **[ผิด] Convert the JSON documents into CSV format...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงจะบ้าหรอเจ้านาย!? สั่งเปลี่ยนขยะเปียก JSON ให้กลายเป็นขยะเหนียว `CSV` เนี่ยนะฮะ!! มันเป็นตระกูลสเปกดึกดำบรรพ์ Row-based เหมือนกัน แม่งไม่ได้ช่วยเพิ่มสปีดการอ่านของ Athena ห่าอะไรเลยฮะ ขยันโง่ถอยหลังลงคลองอย่างรุนแรงฮะ! 

❌ **[ผิด] Apply minification on the data...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้การที่คุณมึงเอา JSON มาลบช่องว่างสเปซบาร์เข้าสูตรมินิมอล `Minification` แม่งช่วยประหยัดน้ำหนักถังขยะ S3 ได้นิดกระปิดกระปรอยเท่านั้นฮะ แต่มันเสือกไม่ได้ช่วยให้ Athena ค้นคำเร็วขึ้นเลยโว้ยยย (แทบไม่กระดิกเลยซักติ่ง)! ผิดประเด็นระดับขุดหลุมฝังตัวเองฮะ!

❌ **[ผิด] Compress the data into GZIP format...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! แม้ท่านจะอุตริจับยัดลูกโป่งอัดลม `GZIP` ให้ไฟล์เล็กลง แต่มันก็ยังไม่ใช่ทางออกซุปเปอร์ไซย่าสายความเร็ว Columnar อย่าง Parquet ฮะ! และที่นรกแตกกว่าคือ... เสือกงัดยันต์ยุ่งยาก "Confused deputy" บ้าบออะไรมาพล่ามวะฮะ โคตรจะ Overkill และไม่ได้แก้ปัญหาเสรีการอ่านข้อมูลเลยฮะ เพ้อเจ้อลอยนวล! 

---
---

## 📌 คำถามที่ 24
**โจทย์:**
A company plans to use a cloud storage service to temporarily store its log files. The number of files to be stored is still unknown, but it only needs to be kept for 12 hours.

Which of the following is the most cost-effective storage class to use in this scenario?

**ตัวเลือก:**
- [x] Amazon S3 Standard
- [ ] Amazon S3 One Zone-IA
- [ ] Amazon S3 Glacier Deep Archive
- [ ] Amazon S3 Standard-IA

---
### 🎯 โจทย์ต้องการอะไร?
จะเอาเศษกระดาษ Log files มาโยนทิ้งพักแช่ไว้ในถังขยะก้อนหนึ่งชั่วคราวฉุกละหุก
เงื่อนไขอำมหิต: "**ขอแค่ซุกตัวไว้ 12 ชั่วโมง (kept for 12 hours) แล้วลบทิ้งแม่งเลย!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงเลือกถังขยะ S3 สายเปย์พันธุ์ไหนที่ **ประหยัดค่าเช่าส้วมที่สุด (most cost-effective)** สำหรับความรวดเร็วฉาบฉวยระดับพระกระโดดกำแพงแบบนี้!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความตาย (กฎหน้าเลือด Minimum Storage Duration ของซ่อง S3): 
  - `S3 Standard:` ใจดีสุด! มึงจะฝากไว้ 1 วิ หรือ 5 นาที แล้วลบทิ้ง ก็จ่ายตังค์เป๊ะๆ แค่นั้น! ไม่มีสัญญาผูกมัด!
  - `S3 Standard-IA`, `One Zone-IA:` แก๊งค์หน้าเลือด! ฝากปุ๊บ บังคับจ่ายขั้นต่ำ **30 วัน** โว้ย!! ถึงมึงจะลบทิ้งในชั่วโมงเดียว มันก็จะเก็บเงินมึงเต็มๆ 30 วัน!
  - `Glacier`, `Deep Archive:` แก๊งค์มาเฟียดองศพ! บังคับจ่ายขั้นต่ำ **90 หรือ 180 วัน** โว้ย!!
- โจทย์ล่อเป้าสั้นกุด **"12 ชั่วโมง ลบทิ้ง"** ... มึงแหกตาดูสิว่าใครถูกสุด? ก็ต้องซุกซอกตึก **`S3 Standard`** เท่านั้นสิวะฮะ! ถึงมันจะค่าเช่ารายเดือนแพงสุด แต่ฝาก 12 ชม.แล้วลบทิ้ง แม่งเก็บเงินมึงแค่เศษกระดาษทิชชู่ฮะ!! ถูกใจวัยรุ่น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon S3 Standard**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ถึงตั๋วรายเดือนมันจะดูแพงหูฉี่ แต่แม่นาง `S3 Standard` ใจดีเสือกไม่มีข้อผูกมัดหน้าเลือดสัญญาขั้นต่ำฮะ! คุณมึงฝากไว้ 12 ชั่วโมงปุ๊บ ลบทิ้งปั๊บ แม่งหักเงินคุณแค่เศษสตางค์เป๊ะๆ ตามการใช้งานเศษเสี้ยววิเลยฮะ คุ้มสุดในพิภพโลกบ้องตื้นนี้ฮะ 100% ชัวร์! 

❌ **[ผิด] Amazon S3 Standard-IA** และ **Amazon S3 One Zone-IA**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาซ้อเจ๊หน้าเลือดแก๊งค์นี้ แม่งมีกฎบัตรชั่วช้าติดตัวคือ **"สัญญาขั้นต่ำ 30 วันโว้ย! (Minimum 30 days storage)"** มึงเอาศพไปฝากแค่ 12 ชั่วโมงแล้วเผาทิ้ง... แม่งก็จะส่งบิลมาไล่เบี้ยเก็บเงินมึงเต็มแม็ก 30 วันฮะ!! ผลาญตังค์กระจุยกระจายโง่เขลาเบ๊าเบาฮะ! 

❌ **[ผิด] Amazon S3 Glacier Deep Archive**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้ห้องแช่เย็นนรกเยือกแข็งสุดขีด `Deep Archive` แม่งมีกฎเผด็จการเหี้ยมโหดป่าเถื่อนคือ **"ห้ามขยับตัวสัญญาดองขั้นต่ำ 180 วัน โว้ยย!! (Minimum 180 days)"** มึงอุตริเอาข้อมูลกระจอกๆ ข้ามคืนไปโยนใส่ถังนี้ มึงล้มละลายโดนขูดรีดเต็มดอมิ่ง 180 วันบ้าบอหน้าแหกแน่ฮะ!! ผิดสายพันธุ์ขยายรั้นฮะ!

---
---

## 📌 คำถามที่ 25
**โจทย์:**
A startup is building IoT devices and monitoring applications. They are using IoT sensors to monitor the traffic in real-time by using an Amazon Kinesis Stream that is configured with default settings. It then sends the data to an Amazon S3 bucket every 3 days. When you checked the data in S3 on the 3rd day, only the data for the last day is present and no data is present from 2 days ago.

Which of the following is the MOST likely cause of this issue?

**ตัวเลือก:**
- [ ] Someone has manually deleted the record in Amazon S3.
- [x] By default, data records in Kinesis are only accessible for 24 hours from the time they are added to a stream.
- [ ] The access of the Kinesis stream to the S3 bucket is insufficient.
- [ ] Amazon S3 bucket has encountered a data loss.

---
### 🎯 โจทย์ต้องการอะไร?
มหากาพย์คดีข้อมูลหาย: เซ็นเซอร์ก๊อกๆ แก๊กๆ โยนทวิตข้อความสดลงท่อผีสิง **`Amazon Kinesis Stream (ตั้งค่าดิบๆ มาตรฐาน default)`** รัวๆ 
แพลนโง่ๆ ของหัวหน้า: "เดี๋ยวกูจะให้ท่อผีนี้มันคลายตะขาบคายข้อมูลใส่ถังขยะ `S3 bucket` แบบม้วนเดียวจบ **ทุกๆ 3 วัน (every 3 days)** นะเว้ย" 
หายนะบังเกิด: พอครบ 3 วัน กูเปิดถัง `S3` ดูด้วยความคึกคะนอง... ปรากฏว่า **"แม่งมีแค่ข้อมูลของวันล่าสุดวันเดียว!! อีก 2 วันแรกแม่งหายสาบสูญโหว่ไปไหนวะ!?"**
คำถามบ๊องแบ๊วท้าอนุบาล: "จงจับแพะหาต้นตอมารับบาปซิ ว่าทำไมข้อมูล 2 วันแรกมันตรอมใจตายหายจ้อยไปหมด!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง AWS Kinesisฮะ!
- กฎแห่งความตาย (กฎอายุดองซากของ Kinesis): ท่อ Kinesis มันไม่ใช่ตุ่มแช่แข็งฮะ!! **ระยะเวลาพักใจมาตรฐาน (Default retention period) ขอมันคือแค่ 24 ชั่วโมง หรือ 1 วันถ้วนเป๊ะๆ!!**
- ถ้ามึงไม่ปรับขยายอายุขัย (ยืดได้สูงสุด 365 วัน)... พอครบ 24 ชั่วโมงเมื่อไหร่ AWS แม่งเอารถกวาดขยะมาเหยียบทิ้งลงนรกโลกันต์ข้อมูลมลายสูญรัวๆ ฮะ! โทษมึงเสือกงี่เง่าตั้งเป้าไว้ 3 วัน ข้อมูลวันแรกๆ เลยโดนกินตับเรียบฮะ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] By default, data records in Kinesis are only accessible for 24 hours from the time they are added to a stream.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! จับโจรได้คาหนังคาเขา ข้อหาความตายคือ "Default Retention = 24 hours" ตามตำราศาลเตี้ยฮะ! ข้อมูลวันแรกกับวันที่สองมันแก่หงำเหงือกทะลุ 24 ชั่วโมงปุ๊บ AWS แม่งลบศพทิ้งชิลๆ ไปเรียบร้อยฮะ ถึงวันที่ 3 มึงจะกว้านขยะลง S3 แม่งก็เหลือแค่กากเดนวันสุดท้ายวันเดียว ร้องไห้กระซิกๆ ฮะ! 100% ชัวร์! 

❌ **[ผิด] Someone has manually deleted the record in Amazon S3.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาการชี้โบ๊ชี้เบ๊จับพนักงานฟันศาลเตี้ยว่า "มีไอ้บ้าที่ไหนไม่รู้แอบไปกดลบทิ้งแน่ๆ" ... ปัญญาอ่อนฮะ! ข้อสอบ AWS ไม่เล่นมุกทุจริตยิบย่อยกาวๆ แบบนี้ฮะ แถมถ้ามันลบจริงมึงก็จับผีใน CloudTrail ได้ ข้ออ้างนี่ตื้นเขินมัดจุกมาก! 

❌ **[ผิด] Amazon S3 bucket has encountered a data loss.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "มึงจะกล่าวหาว่าพระสมุทร `Amazon S3` ที่อ้างสถิติอมตะ 11 Nines (99.999999999%) แม่งทำฮาร์ดดิสก์พังบี้แบนจนข้อมูลมึงพินาศเนี่ยนะฮะ!?" เพ้อเจ้อวิปริตสุดฮะ บ่อน้ำพันปี S3 แม่งถึกระดับอุกกาบาตชน โอกาสทำข้อมูลพังคือศูนย์เปอร์เซ็นต์อย่าเสือกมาหาเรื่องฮะ!

❌ **[ผิด] The access of the Kinesis stream to the S3 bucket is insufficient.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ถ้าบัตรผ่านสิทธิผีข้ามเขตมันป่วยชำรุดแบบ "Insufficient access"... แม่งก็จะผลัดตกคูน้ำ **"โอนข้อมูลไม่เข้า S3 เลยแม้แต่วินาทีเดียวเว้ย!!"** แต่นี่ของวันสุดท้ายเสือกโอนยัดลงไปสำเร็จสวยๆ แปลว่าประตูสิทธิมันอ้าขารอปกติสุขอยู่แล้วต่างหาก โง่ดักดาน! 

---
---

## 📌 คำถามที่ 26
**โจทย์:**
A manufacturing company launched a new type of IoT sensor. The sensor will be used to collect large streams of data records. You need to create a solution that can ingest and analyze the data in real-time with millisecond response times.

Which of the following is the best option that you should implement in this scenario?

**ตัวเลือก:**
- [x] Ingest the data using Amazon Kinesis Data Streams and create an AWS Lambda function to store the data in Amazon DynamoDB.
- [ ] Ingest the data using Amazon Kinesis Data Streams and create an AWS Lambda function to store the data in Amazon Redshift.
- [ ] Ingest the data using Amazon Kinesis Data Firehose and create an AWS Lambda function to store the data in Amazon DynamoDB.
- [ ] Ingest the data using Amazon Simple Queue Service and create an AWS Lambda function to store the data in Amazon Redshift.

---
### 🎯 โจทย์ต้องการอะไร?
จะปั้นเครือข่ายเซนเซอร์ก๊อกๆ แก๊กๆ โยนก้อนข้อมูลสายน้ำหลากมหาศาล (large streams of data) ลงสู่ส่วนกลาง
เงื่อนไขอำมหิต 2 เด้ง: 
1) มึงต้องรองรับของสด "ยิบย่อยซูเปอร์ **real-time** วิเคราะห์ปั่นพายุให้ได้"
2) ห้องสมุดปลายสายต้องสวมคาถาเหาะเหิน **"ตอบโต้สายฟ้าแล่บระดับเสี้ยววินาทีมิลลิเซกคอน!! (millisecond response times)!!"** โว้ว!!

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ 2 จังหวะ: 
  - 1) บอสร้องประท้วงให้กราบไหว้ท่อสูบน้ำบาดาล Real-time แบบสดๆ ท่อแตกรายวิถี = จับล็อคคอเพชฌฆาต **`Amazon Kinesis Data Streams`** เท่านั้น! (Firehose มันไม่ได้โคตร Realtime แถมต้องพักหายใจ 60 วิ, SQS มันสายชิวพักจดหมาย)
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ขอห้องสมุดตอบกลับดิ่งนรก **Millisecond** สายฟ้าฟาด = หุ่นยนต์แฟลชฮีโร่ตัวจี๊ดสุดคือ **`Amazon DynamoDB`** พระเอกโชว์สกิลเดียวใน AWS ที่เคลม Single-digit millisecond response time ทุบสถิติโลกกระจาย!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Ingest the data using Amazon Kinesis Data Streams and create an AWS Lambda function to store the data in Amazon DynamoDB.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ผสมสายพันธุ์ฮีโร่หน้าหยกสมบูรณ์แบบ! พระเอก `Data Stream` มุดท่อสวิงสวาย Real-time ฉลุยลากไส้ทะลุโลก! จบคอมโบที่ตู้เย็นซิ่งฟ้าแล่บ `DynamoDB` ที่เสริฟ์การตอบโต้มหากาฬ Millisecond อย่างงามตา! ชุดนี้จบปัญหากินรวบจักรวาล 100% ฮะ!

❌ **[ผิด] Ingest the data using Amazon Kinesis Data Streams and create an AWS Lambda function to store the data in Amazon Redshift.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! แม้ท่อ Kinesis จะสอบผ่าน Real-time ฉลุย... แต่คุณมึงเสือกเอาขยะสายฟ้าฟาดไปโยนให้ช้างสารดึกดำบรรพ์โกดังยักษ์ `Amazon Redshift` เนี่ยนะฮะ!? โกดังเห่ยๆ ตัวนี้มันขาสั้นเต่าคลาน การตอบโต้แม่งล่อไป **"Sub-second (เศษเสี้ยววินาทีใหญ่ๆ) หรือวิกว่าๆ ด้วยซ้ำ!!"** มันไม่ได้ตีนผีแตะคันเร่ง Millisecond จี๊ดจ๊าดแบบใจหวังฮะ ผิดกระบวนการสืบพยาน! 

❌ **[ผิด] Ingest the data using Amazon Kinesis Data Firehose and create an AWS Lambda function to store the data in Amazon DynamoDB.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้ท่อดับเพลิง `Kinesis Data Firehose` แม่งมีสายสิญจน์ล็อกเป้าปลายทางได้แค่ไม่กี่ที่เว้ย (S3, Redshift, OpenSearch, HTTP)!! **มันเสือกไม่มีหน้าต่างโยนหยอดเหรียญใส่ตุ่ม DynamoDB แบบตรงๆ ทื่อๆ ได้เลยฮะ!!** มั่วจับแพะชนเครื่องบิน มุดผิดรูตายอนาถฮะ! 

❌ **[ผิด] Ingest the data using Amazon Simple Queue Service and create an AWS Lambda function to store the data in Amazon Redshift.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ผิดบรรลัยตั้งแต่ตุ่มแรกฮะ "ไอ้ห้องส้วม `SQS` แม่งคือลานซุกขยะจดหมายธรรมดา ไม่ได้เสกวิชาดูดวง Real-time ให้แกะไส้วิเคราะห์แต่อย่างใดฮะ" แถมตู้ท้ายก็ดันเสือกใช้เต่าคลาน Redshift อีกตะหาก ง่อยเปลี้ยเสียขาพิการสองเด้งฮะ โดนลบกระจุยทิ้ง! 

---
---

## 📌 คำถามที่ 27
**โจทย์:**
A company has multiple AWS sandbox accounts that are used by its development team. All developers must be given access to the contents of one of the main account’s S3 buckets. For security purposes, any personally identifiable information (PII) or financial data uploaded in the bucket must be continuously monitored and removed.

How can this be done at the lowest possible cost and with the least amount of configuration effort?

**ตัวเลือก:**
- [ ] Configure cross-account replication on the S3 bucket. Integrate AWS Audit Manager with the S3 bucket to discover any personally identifiable information (PII) or financial data.
- [x] Create an S3 bucket policy that grants access from the sandbox accounts. Use Amazon Macie to discover personally identifiable information (PII) or financial data.
- [ ] Add S3 read permission to the IAM policy of each IAM user from the sandbox accounts. Use Amazon Detective to discover personally identifiable information (PII) or financial data.
- [ ] Generate a pre-signed URL for the objects on the S3 bucket. Use the Amazon S3 Storage Lens to discover personally identifiable information (PII) or financial data.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่เปิดบัญชีเด็กฝึกงานเพลย์บอยไว้หลายกระบะ (multiple AWS sandbox accounts)
ความเรื่องมากบังเกิด: "เจ้านายครับ... แก๊งเด็กฝึกงานพวกนี้ มันต้อง **ถ่อข้ามเขตมาเจาะถังเหล็ก S3 ของบัญชีหลักเสี่ยใหญ่ว่ะฮะ (Cross-account access S3)**"
ประเด็นดราม่าพ่วง: "เพื่อกันความสะเพร่า... ในถังนี้ห้ามมีข้อมูลบัตรประชาชน ข้อมูลเลขที่บัญชีการเงิน **(PII or financial data)** เผลอหลุดเข้ามาเด็ดขาด! ต้องมีสายสืบนั่งเฝ้า (monitored and removed)!"
คำสั่งเพชฌฆาต: "จัดการชิ้วๆ ซิ ขอแบบ **โคตรประหยัดขี้เหนียว และไม่ต้องตั้งค่าเหนื่อยจนหัวปล๊าก (lowest cost, least configuration effort)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ:
  - 1) ถ้าอยากกระโดดเชือกเจาะกำแพงให้คนนอกค่าย (ต่าง Account) มองเห็นถังขยะ S3 ง่ายที่สุดไม่ต้องเสียเหงื่อ ท่าสวดมนต์หน้าด้านๆ คือแปะแผ่นยันต์ **`S3 Bucket Policy`** ขึงไว้หน้าถังเลยฮะ! อนุญาตปุ๊บจบปั๊บ! 
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ขอสแกนระเบิดค้นหาข้อมูลลับจิมิ (PII / Financial data) ที่สุดของพระเอกนักแบล็คเมล์สาย AI ในกระทรวงนี้คือหมอผีดุ๊กดิ๊ก **`Amazon Macie`** เท่านั้นฮะ! ถนัดเจาะไข่แดงส่องความลับในกระเป๋าเป้ S3 ระดับซุปตาร์ 100%! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an S3 bucket policy that grants access from the sandbox accounts. Use Amazon Macie to discover personally identifiable information (PII)...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! เซ็นยันต์มนต์ดำ `Bucket Policy` ใบเดียวคลุมหัวทะลุทะลวงง่ายสุด พลังสูงสูด ไม่เหนือยตั้งค่าฮะ! บวกกับดึงพระเอกนักส่องความลัป `Amazon Macie` มาเป็น รปภ. คอยจับโป๊ะเลขบัตรประชาชนเป๊ะๆ ถูกต้องตามกฎหมาย 100% เลยฮะ ไม่ต้องคิดเยอะ!

❌ **[ผิด] Configure cross-account replication on the S3 bucket. Integrate AWS Audit Manager...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? บอสร้องอยากให้แค่ "ชะโงกหน้าดูถังเดียวกัน"... มึงดันเสือกไปตั้งค่าคัดลอกถังขยะคู่แฝดหนีข้าม Account `Replication` ซะงั้น เปลืองตังค์ชิบหายฮะ บ้าบอ!! แถมเสือกงัดคนตรวจบัญชีกระโหลกกะลา `Audit Manager` มา ซึ่งไอ้หมอนี่ส่อง PII ใน S3 ไม่เป็นหรอกโว้ยย!! พังเละ!

❌ **[ผิด] Add S3 read permission to the IAM policy of each IAM user from the sandbox accounts. Use Amazon Detective...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว!! มึงจะถ่อสังขารไปนั่งบ้าจี้แปะสิทธิอนุญาตบนหัวเด็กเล่นกระบะทรายทุกคน ทีละคนทีละคนเนี่ยนะฮะ!! เหนื่อยตายห่า!" ไม่ได้ตรงคอนเซปต์ Least configuration effort เล้ย! แถมคุณนักสืบโคนัน `Amazon Detective` แม่งเก่งแต่งมรอยเท้าหาต้นตอโจรปล้นบ้าน ไม่ได้มีสกิลมาแสกนหน้าอกหา PII นะโว้ยยย โง่ดักดาน! 

❌ **[ผิด] Generate a pre-signed URL for the objects on the S3 bucket. Use the Amazon S3 Storage Lens...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "มึงจะบ้าหรอฮะ ให้แจกใบปลิว `Pre-signed URL (ลิ้งค์ชั่วคราวมีอายุขัย)` ทีละไฟล์ๆ ให้เด็กเล่นกระบะทรายใช้อ่าน!? ขี้แตกตายก่อนพอดีถ้ามีสิบล้านไฟล์!" ปัญญาอ่อนที่สุดฮะ ลำบากสายตัวแทบขาด! ส่วนแม่นาง `Storage Lens` มันคือรีพอร์ตหน้าปัดยอดมนุษย์ดูสถิติไซส์กระดูก S3 ภาพรวมฮะ ไม่มีมันสมองวิเคราะห์ PII เหี้ยอะไรเลยฮะ มั่วซั่วจับแพะชนไดโนเสาร์!

---
---

## 📌 คำถามที่ 28
**โจทย์:**
A company has several unencrypted Amazon EBS snapshots in its Amazon VPC. The Solutions Architect must ensure that all of the new EBS volumes restored from the unencrypted snapshots are automatically encrypted.

What should be done to accomplish this requirement?

**ตัวเลือก:**
- [ ] Launch new EBS volumes and specify the symmetric encryption AWS KMS keys for encryption.
- [x] Enable the EBS Encryption By Default feature for the AWS Region.
- [ ] Enable the EBS Encryption By Default feature for specific EBS volumes.
- [ ] Launch new EBS volumes and encrypt them using asymmetric AWS KMS keys.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมีถุงยังชีพสำรองกระดูกสันหลัง **`EBS snapshots (ตัวเวอร์ชั่นถ่ายเอกสารมา)`** เต็มบ้านเต็มเมือง ซึ่งแม่งไม่ได้เข้ารหัสห่าอะไรเลย (unencrypted) แบบเปลือยล่อนจ้อน!
ความขี้เกียจบังเกิดกะทันหัน: "เห้ย! เวลาลูกบ้านมันกดซิมแปะสร้างฮาร์ดดิสก์ตัวใหม่ (restored EBS volumes) จากของก็อปเปลือยพวกนี้... กูอยากบังคับกฎหมายอาญา **ให้ระบบมันเสกเข้ารหัสบังหน้าอัตโนมัติรัวๆ 100% เลยนะเว้ย (automatically encrypted)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- ตำราสวดมนต์บทแรกของกระทรวงคนขี้เกียจ AWS: ถ้าอยากกวาดล้างคำสาปให้ลูกเสือฮาร์ดดิสก์เกิดใหม่ทุกตัวต้องสวมชุดเกราะดั้งจมูก (Encryption) เป็นภาคบังคับ 
- แค่เอื้อมมือไปกดสวิตช์พระเอกวิเศษชื่อ **`"EBS Encryption By Default"`** ตูมเดียว!! สวิตช์ศักดิ์สิทธิ์นี้คือการล็อกคอระดับมหานคร **"(Regional-level setting)"** เสกพรว่าใครหน้าไหนสร้างฮาร์ดดิสก์ใหม่ในแผ่นดินนี้ ลูกมันจะโดนทาสีเข้ารหัสหมดจดเด็ดขาดฮะ!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable the EBS Encryption By Default feature for the AWS Region.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! สวิตช์วิเศษกินรวบแผ่นดินฮะมึง! กดปุ๊บ กฎหมายคลุมทั้งจังหวัด (Region) สบายเกลียว ไม่ต้องมานั่งสั่งเป็นรายตัว ฮาร์ดดิสก์เกิดใหม่ป๊อบอัพมาจะสวมเกราะเข้ารหัสสวยงามไร้ที่ติฮะ ตรงจริต "automatically encrypted" ล้างผลาญความโง่แบบเนียนกริบ 100%!

❌ **[ผิด] Enable the EBS Encryption By Default feature for specific EBS volumes.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!! ปุ่มนรกแตก `Encryption By Default` ของ EBS มันอนุภาพมหาประลัยคลุมเครือทั้งอาณาเขตจังหวัดโว้ย!! ระบบมันไม่มีลูกบิดง่อยๆ ให้มาจิ้มเลือกเจาะจงรายตัวพรรค์นี้ฮะ!! (Not for specific EBS volumes) ลืมไปได้เลย บ้าบอคอแตก! 

❌ **[ผิด] Launch new EBS volumes and specify the symmetric encryption AWS KMS keys for encryption.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้การที่คุณมึงให้ลูกน้องถ่อร่วงมาสร้างฮาร์ดดิสก์ทีละก้อน แล้วนั่งคลิกเลือกกุญแจทีละเปลาะด้วยซอกฝีมือมนุษย์ฮะ!! แม่งโคตรแมนนวล!! โจทย์สั่งว่า "automatically encrypted (สาดบังคับเด็ดขาด)" แต่มึงไปวางกับดักให้ตาสีตาสากระดิกนิ้วพลาดปล่อยผีเปลือยหลุดไปได้เนี่ยนะฮะ!! ผิดอุดมการณ์ความเผด็จการฮะ! 

❌ **[ผิด] Launch new EBS volumes and encrypt them using asymmetric AWS KMS keys.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! เหมือนบรรทัดบนเป๊ะคือแมนนวลป่วยๆ... แถมเสือกบ้าคลั่งงัดกุญแจผีระดับรัฐมนตรีตีกัน **`Asymmetric KMS keys`** มาไขตู้เย็นฮาร์ดดิสก์โง่ๆ อีก!! EBS แม่งรองรับแค่สายพันธุ์ `Symmetric` พริ้วๆ เท่านั้นฮะ มุดผิดรูตายอนาถฮะ!

---
---

## 📌 คำถามที่ 29
**โจทย์:**
A Solutions Architect is managing a three-tier web application that processes credit card payments and online transactions. Static web pages are used on the front-end tier while the application tier contains a single Amazon EC2 instance that handles long-running processes. The data is stored in a MySQL database. The Solutions Architect is instructed to decouple the tiers to create a highly available application.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [ ] Move all the static assets and web pages to Amazon CloudFront. Use Auto Scaling in Amazon EC2 instance. Migrate the database to Amazon RDS with Multi-AZ deployments configuration.
- [ ] Move all the static assets, web pages, and the backend application to a larger instance. Use Auto Scaling in Amazon EC2 instance. Migrate the database to Amazon Aurora.
- [ ] Move all the static assets to Amazon S3. Set concurrency limit in AWS Lambda to move the application to a serverless architecture. Migrate the database to Amazon DynamoDB.
- [x] Move all the static assets and web pages to Amazon S3. Re-host the application to Amazon Elastic Container Service (Amazon ECS) containers and enable Service Auto Scaling. Migrate the database to Amazon RDS with Multi-AZ deployments configuration.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่ปลูกตึกแอปปล้นเงินบัตรเครดิตแบบ 3 ชั้นสุดคลาสสิค (Three-tier web application)
สภาพชำรุดทรุดโทรมปัจจุบัน:
- หน้าบ้านขายของ: หน้าเว็บนิ่งๆ ถือป้ายโฉบเฉี่ยว (Static web pages)
- ชั้นลอยกลางบ้าน: ใช้เซิร์ฟเวอร์โดดเดี่ยวแค่ตัวเดียว **(single EC2 instance)** รับจบปั่นน้ำผลไม้วิชาหนักหน่วงสูบเลือดแช่นาน **(long-running processes)**
- ชั้นใต้ดินซุกศพ: ใช้ฐานข้อมูลสายหาง่าย **MySQL**
คำท้าบอสดุดัน: "เห้ย! บ้านช่องแม่งเหม็นสาบจะตายห่า พังง่ายเกิน! มึงไปสะบะลากกระชากล้างไพ่จัดโซนแยกส่วน (decouple the tiers) แล้วอัดให้มันอมตะตายยากสิบล้อชนไม่พังทีซิ (highly available)!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง AWS ฮะ!
- แงะไถ่กระดูกดำทีละชั้น:
  - 1) ของตายขยะหน้าบ้าน (Static Web): อย่ากระแดะซุกในตึกเช่า ต้องโยนลงถาดหลุม **`Amazon S3`** เท่านั้น! ของคู่บุญแจกแต้ม!
  - 2) แกนกลางปั่นน้ำผลไม้ (Long-running process): มึงจะเสกเวทมนต์ Lambda ไม่ได้! เพราะ Lambda แม่งมีอายุขัยตายห่าแค่ 15 นาที! ต้องโยกไปสถิตในซอกตึกหรูหราอย่าง **`Amazon ECS (Containers)`** แล้วเปิดปั๊มลูกแฝด Auto Scaling เอาสิฮะ!
  - 3) ฐานข้อมูล (MySQL): เพื่อความรอดตายอมตะ... แค่โยกขบวนไปฝากถังตู้เซฟปะดิษฐ์กึ่งเซียน **`Amazon RDS`** และอัญเชิญมารแปลงร่างกระเทยแฝด **`Multi-AZ deployments`** ตายแล้วเกิดใหม่ทันทีฮะ จบ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Move all the static assets and web pages to Amazon S3. Re-host the application to Amazon Elastic Container Service (Amazon ECS) containers... Migrate the database to Amazon RDS with Multi-AZ deployments configuration.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ขยะนิ่งโละลงโถ S3, งานแช่นานสุดโหดจับยัดกล่อง ECS กางร่มสเกลอัตโนมัติซุกไพ่เซียน, และส่วนฐานตึกฉิมพลีก็อัด Multi-AZ คร่อมคู่ให้ RDS แฝดอมตะฟินแตก 3 เด้ง! สมบูรณ์แบบทุกซอกทุกมุมอย่างไร้รอยต่อฮะ! 

❌ **[ผิด] Move all the static assets to Amazon S3. Set concurrency limit in AWS Lambda to move the application to a serverless architecture...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? โจทย์เขี้ยวลากดินสั่งชัดเจนว่าฐานกลางแอปมึงต้องแบกรับ "เนื้องานแช่นาน (Long-running processes)" โว้ย!! มึงเอาไปโยนให้ไอ้เด็กเสิร์ฟสายสั้นจู๋อย่าง `Lambda (ตายสนิททุก 15 นาที)` เนี่ยนะฮะ!? บรรลัยพินาศตรรกะขาดสะบั้นตั้งแต่ครึ่งทางฮะ! 

❌ **[ผิด] Move all the static assets, web pages, and the backend application to a larger instance.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ขี้เกียจสันหลังยาวมากฮะ! บอสร้องให้ "แหกแยกชิ้นส่วนจัดโซน (Decouple)"... มึงดันมัดรวมทั้งขยะหน้าบ้านและแอปหลังบ้านมากระจุกเป็นส้วมก้อนเดียวในเครื่องตัวใหญ่โง่ๆ แล้วเบ่งกล้าม (Larger instance) เนี่ยนะ!! ไม่ได้แบ่งผ่อนแรงห่าอะไรเลย แถมเจ๊งทีก็พินาศยกก้อนฮะ ร้องไห้กระซิกๆ!

❌ **[ผิด] Move all the static assets and web pages to Amazon CloudFront...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้พี่หมื่น `CloudFront` มันเป็นแค่คนส่งแก๊ซความเร็วแสง (CDN / Cache) ไม่ใช่โกดังเก็บศพหน้าเว็บจริงโว้ย!!" โคตรงี่เง่าฮะ มึงจะหอบผ้าหอบผ่อนหน้าเว็บทั้งหมดไปทิ้งถาวรใน CloudFront ไม่ได้ฮะ ด่านแรกมึงต้องซุกใน S3 ก่อนเสมอ! มั่วซั่วหยิบบะหมี่กินกับไอติม!

---
---

## 📌 คำถามที่ 30
**โจทย์:**
A commercial bank has designed its next-generation online banking platform to use a distributed system architecture. The Solutions Architect was tasked to ensure that the architecture is highly scalable, cost-effective, and leverages Amazon EC2 for compute resources.

Which of the following will provide the most suitable solution for this scenario?

**ตัวเลือก:**
- [ ] Launch multiple EC2 instances and use Elastic Load Balancing to distribute traffic across the instances, which will host application services, while Amazon SNS will act as a highly-scalable buffer for messages as they travel between distributed applications.
- [ ] Launch multiple EC2 instances behind an Application Load Balancer to host your application services, and an AWS Step Functions workflow which will act as a highly scalable buffer that stores messages as they travel between distributed applications.
- [ ] Launch multiple On-Demand EC2 instances to host your application services and an Amazon SQS queue which will act as a highly-scalable buffer that stores messages as they travel between distributed applications.
- [x] Launch an Auto-Scaling group of EC2 instances to host your application services and an Amazon SQS queue. Include an Auto Scaling trigger to watch the SQS queue size which will either scale in or scale out the number of EC2 instances based on the queue.

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารหน้าเลือดจะปั้นยานแม่แอปธนาคารเจนเนอเรชั่นใหม่แบบซอยยิบย่อยกระจายศูนย์ (distributed system architecture) 
คำสั่งเพชฌฆาต: "แกไปจับฐานเสาตึกให้มั่น! มันต้อง **โคตรยืดหยุ่นสวิงสวายอัตโนมัติ (highly scalable)** แถมขี้เหนียวประหยัดตังค์ **(cost-effective)** และอนุรักษ์นิยมใช้บ้านพักคนชรา **`Amazon EC2`** เป็นแกนหลักขับเคลื่อนปั่นไฟนะเว้ย!!" 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! คู่หูนรกแตกแห่งจักรวาลแยกชิ้นส่วน!
- คาถายมราชประสานวิญญาณ: 
  - 1) บอสร้องหาความเป็นสวิงสวายตายยากสอดรับภาระหนักๆ ของพี่กล้ามปู `EC2`... ของเล่นเดียวที่ผุดพล่านตอบโจทย์ยืดหดขยายตัวได้ก็คืออัญเชิญ **`Auto Scaling Group`** ฮีโร่ร่างแยกร้อยแปดพันเก้ายืนคุมเชิง!
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ขอสไตล์ซอยย่อยสับกระจุยปะทะระหว่างส่วนต่างๆ... มึงต้องสวดอัญเชิญกาวใจอย่างน้องยามเป่านกหวีด **`Amazon SQS queue (คิวรับจดหมายดองกันชน buffer messages)`** ไว้ถ่วงเวลากันชาวบ้านรุมทึ้งกระทืบตาย!
  - ผสมพันธุ์คู่จิ้นระดับมหาเทพ: "**จับ Auto Scaling นั่งจิบชาจ้องส่องหน้าเหลี่ยมๆ ของ SQS ว่าถ้ามีจดหมายแน่นล้นคิว ก็ระเบิดร่างแยก EC2 ออกมาช่วยกระทืบงานไงฮะ!**" สูตรโกงทะยานฟ้า!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch an Auto-Scaling group of EC2 instances to host your application services and an Amazon SQS queue. Include an Auto Scaling trigger to watch the SQS queue size...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! ลีลาพลิ้วไหวระดับซุปเปอร์สตาร์! ใช้เบาะกันกระแทกสายเหนียว `SQS queue` มารองรับซับจดหมายคิวรถติด! แล้วลากหนวดปลาหมึกจงใจตั้งค่าไม้ตาย "เสกพายุร่างเงามดงาน EC2 อัตโนมัติ (Auto-Scaling trigger)" เมื่อเห็นคิว SQS ส้วมแตกทะลุปรอทฮะ! ได้ทั้งความประหยัดและความโชติช่วงชัชวาล สเกลออโต้ปาดเหงื่อ! 

❌ **[ผิด] Launch multiple On-Demand EC2 instances... and an Amazon SQS queue...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาการชี้โบ๊ชี้เบ๊ฮะ! ครึ่งหลังมึงฉลาดดึงโถส้วม SQS มาก็จริง... แต่ครึ่งแรกคุณพี่เล่นทุ่มทุนสร้าง "จ้างวินมอเตอร์ไซค์มายืนรอเฉยๆ บูชาหัวเสา EC2 เปล่าๆ เพียวๆ บานตะไท ไม่มีสวิทช์ร่างเงานับถอยหลัง Auto Scaling ควบคุม!!" โคตรเปลืองตังค์ชิบหาย ตายคาที่ ไม่ได้ Highly scalable อะไรเลยฮะ! 

❌ **[ผิด] Launch multiple EC2 instances... while Amazon SNS will act as a highly-scalable buffer...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้ลำโพงงานวัด `Amazon SNS` मै่งเป็นแค่เสาโทรเลขยิงกระจายข้อความแบล็บหน้าด้านๆ ฮะ!! **มันไม่มีกะลาซอกหลืบไว้ทำตัวเป็น "เบาะกันกระแทกดองจดหมายหละหลวม (buffer for messages)" โว้ยย!!** ส่งผิดรู ปลายทางล้มก็ร่วงหายสัจธรรมพินาศฮะ ต้อง SQS เท่านั้นนะถึงจะอมของหน่วงเวลาไว้ได้!

❌ **[ผิด] Launch multiple EC2 instances... and an AWS Step Functions workflow which will act as a highly scalable buffer...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "โอ้โหวว!! ไอ้แม่ทัพ `Step Functions` มันมีไว้จัดคิวกางร่มบัญชาการรบร้อยปุ่มเว้ย!" ไม่ได้เสือกเอามาทำตัวเป็นเบาะกันกระแทกบัฟเฟอร์จดหมายวิ่งกระจิ๊กกระจอกระดับประถมแบบกล่อง SQS หรอกฮะ หยิบเครื่องจักรสูบน้ำมาดับเทียนฮะ โง่ดักดาน! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 4: ข้อ 31 - 40)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 31
**โจทย์:**
A healthcare company has developed an AWS Lambda function to handle requests from a third-party analytics service. When new patient data is available, the service sends an HTTP POST request to a webhook intended to trigger the Lambda function.

What would be the MOST operationally efficient solution to ensure that the service can call the Lambda function?

**ตัวเลือก:**
- [ ] Attach an Amazon SQS queue to the Lambda function. Use the SQS queue URL as the webhook.
- [ ] Create an API Gateway endpoint for the Lambda function. Provide the endpoint as a webhook to the third-party analytics service.
- [x] Generate a Lambda Function URL and use it as the webhook for the third-party analytics service.
- [ ] Launch an EC2 instance that acts as a proxy for the Lambda function. Give the instance’s public IP as a webhook to the third-party analytics service.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายปั้นโค้ดประมวลผลไว้ในตึกผีสิง **`AWS Lambda`** 
มีแขกรับเชิญหน้าใหม่: แก๊งค์บริการเก็บสถิติคนนอก (third-party analytics service) จะรับอาสายิงธนู **`HTTP POST webhook`** มาปลุกให้ Lambda ลุกขึ้นมาทำงาน
คำสั่งเพชฌฆาต: "มึงหาทางเปิดประตูรับแขก (Webhook) ให้ Lambda กูทีซิ! ขอแบบ **โคตรมักง่าย ขี้เกียจตั้งค่าที่สุด เหนื่อยนิดเดียวพอ (MOST operationally efficient)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความมักง่ายของ Lambda: 
  - แต่ก่อนถ้าอยากเอา Lambda รับ Webhook เปรี้ยวๆ มึงต้องถ่อสังขารไปกางเต็นท์ผูกติดกับ `API Gateway` ให้วุ่นวาย
  - แต่ปัจจุบัน AWS ใจดีแจกของฟรี! **แค่มึงกดสวิตช์เปิดสกิลตาที่ 3 `Lambda Function URL`** แม่งก็เนรมิตลิ้งก์ HTTPS Webhook ดิบๆ เสียบเข้าก้น Lambda ให้มึงเอาไปก๊อปส่งให้คนนอกยิงเข้ามาได้เลย!! มักง่ายสุดๆ ไม่ต้องง้อประตู API Gateway ให้เหนื่อยตั้งค่าฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Generate a Lambda Function URL and use it as the webhook for the third-party analytics service.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! แค่ปลายนิ้วสัมผัสกดเสก `Lambda Function URL` แม่งก็คลอดลิ้งก์ HTTPS ออกมาให้มึงเสร็จสรรพเอาไปโยนให้คนนอกยิง Webhook ได้เลยฮะ! โคตรรวบรัด โคตรขี้เกียจ โคตรมีประสิทธิภาพ (Operationally efficient)! จบข่าว!

❌ **[ผิด] Create an API Gateway endpoint for the Lambda function...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาซ้อ `API Gateway` ম্যা่งเป็นทางออกที่ดีและทรงพลังนะฮะ... แต่มันเสือก **สอบตกความขี้เกียจฮะ!!** มึงต้องนั่งหลังขดหลังแข็งคลำทางตั้งค่าท่ายากเพาะพันธุ์ Method สารพัด ซึ่งโจทย์ร้องขอวิถีคนขี้เกียจสุดๆ (operationally efficient) ฉะนั้นโดนปัดตกเพราะเหนื่อยรันวงการฮะ! 

❌ **[ผิด] Attach an Amazon SQS queue to the Lambda function. Use the SQS queue URL as the webhook.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "ไอ้ห้องส้วม `SQS` มันรับจดหมายจากช่างเชื่อมภายในป่า AWS ด้วยกันเองโว้ย!!" มันไม่ได้เปิดหน้าอกรับแขก HTTP นอกบ้านตรงๆ (direct HTTP webhook request) ได้หรอกฮะ ใครจะบ้าเอา SQS ไปรับหน้าแทนแอปชาวบ้าน!! มั่วซั่วจับแพะชนไดโนเสาร์ฮะ! 

❌ **[ผิด] Launch an EC2 instance that acts as a proxy for the Lambda function.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! บอสร้องอยากสบายที่สุด แต่มึงดันทะลึ่งไปเช่าเซิร์ฟเวอร์กระดูกทึบ `EC2 instance` เพื่อมารันจ๊อบเป็นยามเฝ้าประตูสะพานปัดเป๋อส่งให้ Lambda เนี่ยนะ!! บ้าบอคอแตกหลงจักรวาลที่สุดฮะ สร้างขยะระบบไร้ค่า! 

---
---

## 📌 คำถามที่ 32
**โจทย์:**
A top university has recently launched its online learning portal where the students can take e-learning courses from the comforts of their homes. The portal is on a large On-Demand EC2 instance with a single Amazon Aurora database.   

How can you improve the availability of your Aurora database to prevent any unnecessary downtime of the online portal?

**ตัวเลือก:**
- [ ] Deploy Aurora to two Auto-Scaling groups of EC2 instances across two Availability Zones with an elastic load balancer which handles load balancing.
- [ ] Use an Asynchronous Key Prefetch in Amazon Aurora to improve the performance of queries that join tables across indexes.
- [ ] Enable Hash Joins to improve the database query performance.
- [x] Create Amazon Aurora Replicas.

---
### 🎯 โจทย์ต้องการอะไร?
มหาลัยผอมแห้งเปิดเว็บสอนออนไลน์: ซ้อนร่างอยู่บนก้อนหินเดี่ยวๆ EC2 กับฐานข้อมูลตัวเดียวโดดๆ **`(single Amazon Aurora database)`**
คำสั่งเพชฌฆาต: "เจ้านายกลัวหน้าแหกตอนปิงพุ่ง! มึงช่วยเสกคาถา **เสริมออปชั่นอมตะปกป้องฐานข้อมูลล่มกระทันหัน (improve availability / prevent downtime)** ให้ถัง Aurora ของกูทีซิ!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงฐานข้อมูลฮะ!
- กฎแห่งเทพ Aurora สายอมตะ: 
  - ยานแม่ `Amazon Aurora` แม่งเป็นสายพันธุ์เหนือมนุษย์! แค่มึงสับสวิตช์ปั้มร่างแยก **`Amazon Aurora Replicas (เครื่องอ่านสำรอง)`** โผล่มาเมื่อไหร่ นอกจากมันจะช่วยเบาแรงอ่านข้อมูลแล้ว...
  - **ถ้าเครื่องหลักแม่งหัวขาดตายห่าปุ๊บ (Downtime)! ไอ้ร่างทรง Replica เครื่องใดเครื่องนึงจะดีดตัวกระโดดสวมมงกุฎขึ้นเป็นจ่าฝูงรับจบแทนอัตโนมัติทันทีฮะ!! (Failover)** โคตรทน โคตรอมตะ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create Amazon Aurora Replicas.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ถ้าไม่มีชอยส์ Multi-AZ ให้กา ก็ซัดเข้าที่หน้า `Aurora Replicas` นี่แหละวิเศษนัก! เพราะในโลกของ Aurora... อีเครื่อง Replica มันไม่ได้มีดีแค่อ่านอย่างเดียวฮะ แต่มันคือรัชทายาทแฝงตัว! ตายหนึ่ง เกิดใหม่หนึ่ง ตอบโจทย์หนีตายล่มสลาย 100% ฮะ!

❌ **[ผิด] Deploy Aurora to two Auto-Scaling groups of EC2 instances across two Availability Zones...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!? `Aurora` แม่งคือบริการระดับ Fully-managed ดินแดนศักดิ์สิทธิ์ของ AWS ที่มันปั้นของมันเองลึกลับฮะ! มึงไม่มีปัญญาไปทะลึ่งจกมือเสก Auto-Scaling EC2 มารันครอบฐานตึก Aurora เองหรอกโว้ยย!! ผิดกระบวนการขบกบาลฮะ! 

❌ **[ผิด] Enable Hash Joins to improve the database query performance.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! โจทย์เค้าร้องไห้อยากได้ความรอดตายอมตะสิบล้อชนไม่พัง (Availability / Prevent downtime)... มึงเสือกงัดคัมภีร์ `Hash Joins` ซึ่งเอาไว้ปั่นสูตรตารางทวีคูณให้หาคู่เร็วขึ้น (Performance tuning) ไปตอบ!! บ้าบอคอแตก ไม่ตรงคำถามอย่างรุนแรงฮะ! 

❌ **[ผิด] Use an Asynchronous Key Prefetch in Amazon Aurora to improve the performance...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! เหมือนบรรทัดบนเป๊ะฮะ! มนต์ดำ `Asynchronous Key Prefetch` แม่งมีไว้เร่งฝีเท้าการสืบค้นหาข้อมูล (Performance) ฮอยย!! มันไม่ได้เกี่ยวกับเวทมนต์คืนชีพตอนเครื่องพังร่วงแต่อย่างใดฮะ โง่ดักดาน! 

---
---

## 📌 คำถามที่ 33
**โจทย์:**
A company has several EC2 Reserved Instances in their account that need to be decommissioned and shut down since they are no longer used by the development team. However, the data is still required by the audit team for compliance purposes.

Which of the following steps can be taken in this scenario? (Select TWO.)

**ตัวเลือก:**
- [ ] Convert the EC2 instances to Spot instances with a persistent Spot request type.
- [x] Take snapshots of the EBS volumes and terminate the EC2 instances.
- [ ] Convert the EC2 instance to On-Demand instances
- [ ] Stop all the running EC2 instances.
- [x] You can opt to sell these EC2 instances on the AWS Reserved Instance Marketplace

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมีบิลเครื่อง **`EC2 แบบเหมาจ่ายรายปี (Reserved Instances)`** ค้างเติ่งอยู่เพียบ!!
ดราม่าปะทุ: "ตอนนี้เลิกใช้แล้วเว้ย!! กูอยากฆ่าทิ้งสับสวิตช์ปิดตายมันทิ้งซะให้ห่างหูห่างตา **(decommissioned and shut down)**!!"
ข้อแม้ลูกโซ่: "แต่เดี๋ยวก่อน! ข้อมูลข้างในฮาร์ดดิสก์ทั้งหมด... **ห้ามหายนะโว้ย!! (data is still required)** ทีมตรวจสอบทุจริต (audit) เค้าต้องเก็บบันทึกไว้ดอง!!"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงหาวิธีกำจัดเครื่องผีเสื้อพวกนี้ให้พ้นคอ พร้อมทั้งรักษาศพข้อมูลไว้ และเอาทุนคืนด้วย (เลือก 2 ทางเลือก)!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราช 2 สเต็ปคอมโบชิ่ง:
  - 1) บอสสั่งห้ามข้อมูลหาย: วิชามารที่ง่ายบัดซบคือ **`ดึงเบรคถ่ายรูปเก็บศพเนื้อดิบ (Take snapshots of EBS)`** แล้วเตะปลั๊กฆ่าทิ้งล้างเผ่าพันธุ์ (Terminate) จบข่าว เซฟเงิน!
  - 2) เสือกตบโต๊ะโวยวายว่า กูเหมาจ่ายรายปี (Reserved) ไปแล้ว เลิกใช้กลางคันตังกูหายทำไงวะ?: ท่าไม้ตายเดนตายของ AWS คือมึงสามารถห่อศพตั๋วรายปีนี้ "เอาไปเซลล์เทขายทอดตลาดมือสอง ใน **`AWS Reserved Instance Marketplace`**!!" คืนทุนได้เฉียบขาดระดับหนังสือเรียน!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Take snapshots of the EBS volumes and terminate the EC2 instances.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ถ่ายรูปสแนปช็อตดองศพข้อมูลฮาร์ดดิสก์ให้ฝ่ายตรวจสอบจุใจ แล้วลงดาบสั่งเชือดทิ้งเครื่องกลวงๆ เพื่อลดบิลสิ้นเดือนฮะ! ถูกต้องตามหลักปรัชญาเป๊ะปัง! 

✅ **[ถูกต้อง] You can opt to sell these EC2 instances on the AWS Reserved Instance Marketplace**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ก็มึงซื้อตั๋วดูหนังเหมาจ่ายรายปีมาแล้วฮะคุณพี่! ขืนทิ้งไว้ปล่าวๆ ตังก็หดหายสิฮะ หอบหิ้วสัญญาโง่ๆ นี่ไปเซี้ยวขายต่อสวมรอยให้ชาวบ้านในตลาดมืด `Reserved Instance Marketplace` ซะ! อย่างน้อยก็ได้ตังคืนเข้ากระเป๋า ฟินแตก 100%! 

❌ **[ผิด] Stop all the running EC2 instances.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? มึงแค่กดปุ่ม `Stop (ปิดสวิตช์พักเครื่อง)`... ไอ้เนื้อก้อนฮาร์ดดิสก์ข้างในแม่งก็ยังอมตังค์ค่าเช่าพื้นที่ (Storage cost) บิลยาวเป็นหางว่าวอยู่ดีฮะ!! โง่ดักดาน! โจทย์สั่งเด็ดขาดว่าให้ฆ่าทิ้ง (Decommission / Shut down)! 

❌ **[ผิด] Convert the EC2 instance to On-Demand instances** และ **Convert the EC2 instances to Spot instances...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "เห้ยยย!! บอสบอกว่า กู-ไม่-ใช้-แล้ว-โว้ย!! จะลบเครื่องทิ้ง!" มึงจะแส่แต๋นไปแปลงร่างเครื่องจากคนฉลาดไปเป็นตั๋วผี `On-Demand` (หน้าหม้อจ่ายรายชั่วโมง) หรือ `Spot` ให้เจ็บกะโหลกเสียตังค์ต่อไปทำเชี่ยอะไรวะฮะ!? เอาหินทุบหัวตัวเองพินาศฉิบหายฮะ! 

---
---

## 📌 คำถามที่ 34
**โจทย์:**
A company has several websites and hosts its infrastructure on the AWS Cloud. The mission-critical web applications are hosted on fleets of Amazon EC2 instances behind Application Load Balancers. The company uses AWS Certificate Manager (ACM) provided certificate on the ALBs to enable HTTPS access on its websites. The security team wants to get notified 30 days before the expiration of the SSL certificates.

Which of the following can the Solutions Architect implement to meet this request? (Select TWO.)

**ตัวเลือก:**
- [x] Create an Amazon EventBridge (Amazon CloudWatch Events) rule and schedule it to run every day to identify the expiring ACM certificates. Configure to rule to check the DaysToExpiry metric of all ACM certificates in Amazon CloudWatch. Send an alert notification to an Amazon Simple Notification Service (Amazon SNS) topic when a certificate is going to expire in 30 days.
- [ ] Modify all certificates to use the AWS Certificate Manager Private Certificate Authority. Create an Amazon EventBridge (Amazon CloudWatch Events) rule that will check for ACM events that shows certificates expiring within 30 days. Set the target to invoke an AWS Lambda function to send a message to an Amazon SNS topic.
- [x] Create an Amazon EventBridge (Amazon CloudWatch Events) rule that will check AWS Health or ACM expiration events related to ACM certificates. Send an alert notification to an Amazon Simple Notification Service (Amazon SNS) topic when a certificate is going to expire in 30 days.
- [ ] Utilize AWS Trusted Advisor to check for the ACM certificates that will expire in 30 days. Using this metric, create an Amazon CloudWatch alarm that will send an alert to an AWS Systems Manager OpsItem.
- [ ] Use AWS Config to manually create a rule that checks for certificate expiry on ACM. Create an Amazon EventBridge (Amazon CloudWatch Events) rule to send an alert to an Amazon Simple Notification Service (Amazon SNS) topic when AWS Config flags a resource.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่ปลูกหน้าเว็บติดพาสปอร์ตเขียวปี๋ HTTPS เอาไว้บานเบอะ (ใช้บริการ `AWS Certificate Manager - ACM`)
ความหลอนสั่นประสาท: "เจ้านายกลัวหน้าแหกตอนใบอนุญาตบัตรเหลือง SSL มันหมดอายุแล้วเว็บโดนขึงดำประจานล่มฮะ!"
คำสั่งเพชฌฆาต: "มึงไปหากะดิ่งนรกรอเตือนภัยกูที! **เอาระดับเสียวสันหลัง 30 วันก่อนหมดอายุเป๊ะๆ ให้ส่งไซเรนปรี๊ดๆ ทักมากวนใจกู (get notified 30 days before expiration)!!**" (เลือก 2 ท่าที่ถูกต้อง)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ: สัญญาณไฟไหม้ดักจับ ACM ใบอนุญาตเน่าเปื่อย มันมีไม้ตายอยู่ 2 สายตระกูลหลักๆ คือ...
  - 1) สายสถิติโหนกระแส: นั่งจดตาจ้องเข็มไมล์เกจ์วัด **`"DaysToExpiry metric ของ Amazon CloudWatch"`** แล้วเอาสายสิญจ์ EventBridge ผูกไซเรน SNS ทักมาเลยฮะ! 
  - 2) สายข่าววงใน: แอบดักฟังวิทยุตำรวจ **`"AWS Health events หรือ ACM expiration events"`** (แม่งจะส่งอีเวนท์สั่นประสาทล่วงหน้า 45 วันอยู่แล้ว) แล้วเอาสายสิญจ์ EventBridge ดักทางปล่อยระเบิด SNS ทักมา! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon EventBridge... rule that will check AWS Health or ACM expiration events... Send an alert notification to... SNS.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ท่าคลาสสิก ดมกลิ่นสัญญาณชีพประจำเดือนของ AWS Health หรือ ACM Expiration events มาสับสวิตช์ EventBridge ยิงปืนยาม SNS! แจ้งเตือนเป๊ะ 100%! 

✅ **[ถูกต้อง] Create an Amazon EventBridge... rule and schedule it to run every day... check the DaysToExpiry metric in CloudWatch. Send an alert notification to... SNS.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! เป๊ะปังอลังการเช่นกัน! ใช้ไม้ตายสายตรวจจับตัวเลขสถิติล้วนๆ ฮะ ให้ EventBridge วิ่งเหยาะๆ รายวันส่องเกจ์วัด `DaysToExpiry` ถ้านับถอยหลังชน 30 วันปุ๊บก็กดกระดิ่ง SNS ขยี้บอส! 

❌ **[ผิด] Use AWS Config to manually create a rule that checks for certificate expiry on ACM...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! อาซ้อ `AWS Config` แม่งมีกระบวนท่าไม้ตายสำเร็จรูปแจกพรีเซลส์ฟรีๆ ชื่อ `acm-certificate-expiration-check` อยู่แล้วฮะ! มึงจะกระแดะหน้าด้าน "มุดไหไปสร้างโค้ดแมนนวลเองด้วยมือล้วนๆ (manually create a rule)" ทำซากอ้อยอะไรฮะ เหนื่อยเปล่าไร้สาระ! 

❌ **[ผิด] Modify all certificates to use the AWS Certificate Manager Private Certificate Authority...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! เพื่อความสะใจในการแจ้งเตือน... มึงเสือกอหังการถึงขั้นรื้อของฟรีทิ้งแล้วเปลี่ยนไปเปิดเตาหลอมตั้งกระทรวงทะเบียนราษฎร์ส่วนตัว `Private CA` ที่ค่าเช่าสุดโหดล่อไป 400 เหรียญต่อเดือนเนี่ยนะ!!?" ล้มละลายพินาศทะลุปรอทฮะ! ไม่จำเป็นเลยซักกะติ๊ดดด!

❌ **[ผิด] Utilize AWS Trusted Advisor to check for the ACM certificates that will expire in 30 days...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ลุงผู้ประกาศข่าว `Trusted Advisor` แม่งเก่งก็จริง... แต่มันเสือก **ไม่มีตาต้อกระจกมองเห็นอีเวนท์ SSL Certificate หมดอายุของ ACM โว้ยย!!**" ตำรามันไม่ได้จุติบรรทัดนี้มาเลยฮะ! หลอกควายสุดๆ! 

---
---

## 📌 คำถามที่ 35
**โจทย์:**
A company is looking for a way to analyze the calls between customers and service agents. Each conversation is transcribed, JSON-formatted, and saved to an Amazon S3 bucket. The company’s solutions architect is tasked to design a solution for extracting and visualizing sentiments from the transcribed files.

Which solution meets the requirements while minimizing the amount of operational overhead?

**ตัวเลือก:**
- [ ] Train a custom Natural Language Processing (NLP) model using Amazon SageMaker. Index the sentiment along with the transcript to an Amazon OpenSearch cluster. Visualize the results using the OpenSearch Dashboard.
- [x] Create an Amazon Comprehend analysis job. Index the sentiment along with the transcript to an Amazon OpenSearch cluster. Visualize the results using the OpenSearch Dashboard.
- [ ] Analyze the JSON files with Amazon Textract. Index the sentiment along with the transcript to an Amazon OpenSearch cluster. Visualize the results using Amazon Managed Grafana.
- [ ] Create an Amazon Comprehend analysis job. Index the sentiment along with the transcript to an Amazon OpenSearch cluster. Visualize the results using Amazon Managed Grafana.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่แอบอัดเสียงลูกค้าที่โทรมาด่าคอลเซนเตอร์ แล้วถอดเทปเสียงเป็นตัวอักษรขยะ `JSON` ดองไว้ใน S3 ยั้วเยี้ย
โรคจิตกำเริบ: "เจ้านายครับ... กูอยากได้เครื่องมือดูดเนื้อผ้าตัวอักษรพวกนี้ **มาแสกนหน้าอกดูว่าอารมณ์ลูกค้ากำลังบูดหรือกำลังฟิน (extracting sentiments)!!** แล้วจับมาตีเส้นกราฟสวยๆ (visualizing) กูควรบูชาพระองค์ไหนดีวะ ขอแบบ **ทำแอ็คชั่นโคตรน้อยสบายแฮจิบชาชิวๆ (minimizing operational overhead)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ: 
  - 1) อ่าว.. กะเล่นอุตริแอบอ่านตัวอักษรจับอารมณ์คลื่นสมอง "มันกำลังดีใจ มันกำลังสาปแช่งกู (Sentiment analysis / NLP)" ปรมาจารย์หมอผียืนหนึ่งตัวเดียวในจักรวาล AWS คือ **`Amazon Comprehend`** แน่นอน 100%! (ไม่ต้องถ่อสังขารไปนั่งปั้นโมเดลสมองกล SageMaker เองหรอกฮะ เหนื่อย!)
  - 2) เสือกตบโต๊ะสั่งเพิ่มว่า ขอทำกระดานกราฟฟิกสะดุดตา! ของคู่บุญที่เกิดมาเคียงคู่หมอผีดูดตัวอักษรพวกนี้ คือศาลไคฟง **`Amazon OpenSearch (Elasticsearch โฉมใหม่)`** ที่มีพร็อพ **`OpenSearch Dashboard (Kibana)`** ให้วาดกราฟสะบัดบ็อบชิวๆ ฮะ จบข่าว! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon Comprehend analysis job. Index the sentiment along with the transcript to an Amazon OpenSearch cluster. Visualize the results using the OpenSearch Dashboard.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! อัญเชิญฮานาโกะซัง `Amazon Comprehend` ล้วงไข่วิเคราะห์อารมณ์ลูกค้าแตกกระจุย ไม่ต้องลงแรงเซ็ตห่าอะไรมากฮะ แล้วโยนขี้ต่อให้พระสังกัจจาย `OpenSearch` ปั้นหน้าปัด Dashboard (Kibana) ฟินาเล่ระดับแกรนด์มาสเตอร์ คุ้มสุดในพิภพโลกบ้องตื้นฮะ 100% ชัวร์! 

❌ **[ผิด] Train a custom Natural Language Processing (NLP) model using Amazon SageMaker...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? บอสร้องอยากให้พริ้วไหวแบบขี้เกียจสันหลังยาว (minimizing operational overhead) แต่มึงเสือกสวมวิญญาณนักวิทยาศาสตร์ซาดิสม์ "ไปนั่งคว้านสมองปั้นโมเดล Machine Learning เองด้วยวิชา `SageMaker`" เนี่ยนะฮะ!! ล่อไป 3 ชาติกว่าจะเสร็จฮะ เพ้อเจ้อวิปริตสุดฮะ ไม่ใช่แนวทางสำเร็จรูปอย่างที่หวังไว้!

❌ **[ผิด] Analyze the JSON files with Amazon Textract...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้หีงห้อยหน้าตาย `Amazon Textract` แม่งทำหน้าที่ "ลืมตาส่องไฟฉายแสกนใบเสร็จบิลค่าไฟ PDF ดึงตัวหนังสือบนรูปภาพออกมาเป็นตัวพิมพ์" โว้ยย!! มึงไม่มีปัญญาไปวิเคราะห์อารมณ์ Sentiment ใดๆ ได้เลยฮะ มั่วซั่วจับแพะชนไดโนเสาร์ฮะ! 

❌ **[ผิด] Create an Amazon Comprehend analysis job... Visualize the results using Amazon Managed Grafana.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! ครึ่งแรกใช้ Comprehend แม่งฉลาดฮะ แต่ครึ่งหลังมึงดันเสร่อลากเส้นกราฟพิสดารด้วย **`Managed Grafana`**! ซึ่งหน้าปัดกะโหลก Grafana แม่งเกิดมาเพื่อ "ดูสถิติชีพจรเวลาเซิร์ฟเวอร์แบบ Time-series"ฮะ! ไม่ได้เกิดมาอ้อนแอ้นรังสรรค์กราฟ Search text มิกซ์รวมอย่าง OpenSearch Dashboard หรอกฮะ! ฝืนตั้งค่าให้เมื่อยตุ้มฮะ ผิดบรรทัดฐาน! 

---
---

## 📌 คำถามที่ 36
**โจทย์:**
A Solutions Architect designed a real-time data analytics system based on Kinesis Data Stream and Lambda. A week after the system has been deployed, the users noticed that it performed slowly as the data rate increases. The Architect identified that the performance of the Kinesis Data Streams is causing this problem.

Which of the following should the Architect do to improve performance?

**ตัวเลือก:**
- [ ] Implement Step Scaling to the Kinesis Data Stream.
- [x] Increase the number of shards of the Kinesis stream by using the UpdateShardCount command.
- [ ] Replace the data stream with Amazon Data Firehose instead.
- [ ] Improve the performance of the stream by decreasing the number of its shards using the MergeShard command.

---
### 🎯 โจทย์ต้องการอะไร?
ดราม่าปะทุ: ปลูกตึกท่อผีสิง **`Kinesis Data Stream`** สับกบาลเข้าเครื่อง Lambda ได้เจ็ดวัน 
ความงอแงบังเกิด: "เจ้านายๆๆ... ยิ่งปล่อยให้ท่อสูบน้ำวิ่งเร้าใจมากเท่าไหร่ แม่งยิ่งวิ่งหนืดตืดเต่าคลานอืดอาดช้าบรรลัยเลยวะฮะ! เหมือนส้วมเต็มกะทันหัน!"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงงัดไม้ตายมากระทืบระบบท่อ `Kinesis Stream` ให้ทะลวงขรี้พุ่งปรี๊ดความเร็วแสงเหมือนเดิมทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง AWS Kinesisฮะ!
- กฎแห่งความเร็วแสงสายน้ำหลาก: ท่อ Kinesis Data Stream แม่งวัดขุมพลังตามไซส์ของร่องกระดูกที่เรียกว่า **`Shards (เหล็กดัดฟัน)`**
  - ถ้ามึงงก ซื้อมาน้อยขี้ประติ๋ว = ท่อเล็ก กระน้ำไหลช้า อืดลากเลือด!
  - ถ้าพายุทะลวงฮีท... ท่าบรรเทาทุกข์มีท่าเดียวคือ **"จับแยกร่างผ่าท่อให้แผ่สยายกว้างขึ้น (Split Shard)" หรือที่เรียกว่าต้อง "เพิ่มจำนวน Shard (Increase the number of shards)"** เท่านั้น!! ความเร็วมึงถึงจะไหลพุ่งปรู๊ดพราดดั่งออเจ้าฮะ จบ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Increase the number of shards of the Kinesis stream by using the UpdateShardCount command.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกหนังสือเรียนเป๊ะ ถ้าอืด ถ้าหนืด ท่าแก้เคล็ดคือร่ายเวทย์ `UpdateShardCount` เข้าไปสับร่างเบ่งจำนวนร่องน้ำลึก (Shards) สิฮะ!! ยิ่งมีเลนถนนให้วิ่งเยอะ รถก็ยิ่งฉลุยทะลุปรอทยังไงล่ะฮะ! ถ้านี่คือสูตรโกงที่มึงต้องจำไว้จนตาย!

❌ **[ผิด] Replace the data stream with Amazon Data Firehose instead.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!? ท่อดับเพลิง `Kinesis Data Firehose` แม่งไม่มีร่องกระดูก Shards ให้ปรับกบาลเลยเว้ย! และความขลังของสปีด Firehose มันไม่ได้แซงทะลุมิติดีกว่าแบบโชติช่วงอะไรเลย! (แถม Firehose แม่งไม่ Real-time เท่า Stream ด้วยซ้ำฮะ) ทำพินาศเละเทะเปลี่ยนสัจธรรมเลยฮะ! 

❌ **[ผิด] Improve the performance of the stream by decreasing the number of its shards using the MergeShard command.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว!! ถนนก็รถติดบรรลัยชิ้วหายอยู่แล้ว มึงเสือกอหังการเอารถแบคโฮมา **บีบเลนถนนยุบรวมกันให้น้อยลง (Decreasing number of shards / MergeShard)** เข้าไปอีกเนี่ยนะ!!?" ปัญญาอ่อนที่สุดฮะ ลำบากสายตัวเบี้ยวเลยฮะ อืดตายห่าร้อยเท่าพันทวี! 

❌ **[ผิด] Implement Step Scaling to the Kinesis Data Stream.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้ลูกเจี๊ยบเอ๊ย!! `Step Scaling` मै่งเป็นท่าสวิงสวายเปิดกระจกของกระทรวง **Auto Scaling ถ้ำ EC2** โว้ยย!!! มันไม่ได้มีออปชันห่านี้มาให้กดปุ่มจิ้มเสกในถ้ำ Kinesis Data Stream เลยฮะ!!" มโนขั้นสุด จับแพะชนไดโนเสาร์ฮะ! 

---
---

## 📌 คำถามที่ 37
**โจทย์:**
A fast food company is using AWS to host its online ordering system which uses an Auto Scaling group of Amazon EC2 instances deployed across multiple Availability Zones with an Application Load Balancer in front. To better handle the incoming traffic from various digital devices, a new routing logic is being considered. Requests with URLs matching /api/android should be directed to a target group named "Android-Target-Group". Conversely, requests which have a URL of /api/ios are forwarded to another separate target group named "iOS-Target-Group".

How can this change be implemented in AWS?

**ตัวเลือก:**
- [ ] Replace your ALB with a Gateway Load Balancer then use path conditions to define rules that forward requests to different target groups based on the URL in the request.
- [ ] Replace your ALB with a Network Load Balancer then use host conditions to define rules that forward requests to different target groups based on the URL in the request.
- [x] Use path conditions to define rules that forward requests to different target groups based on the URL in the request.
- [ ] Use host conditions to define rules that forward requests to different target groups based on the hostname in the host header. This enables you to support multiple domains using a single load balancer.

---
### 🎯 โจทย์ต้องการอะไร?
ตั้งตู้ยามระดับสวรรค์ **`Application Load Balancer (ALB)`** บังหน้าร้านตึก EC2 
ความเรื่องมากบังเกิด: คราวนี้บอสอยากให้ตู้ยาม ALB มีสมองกรองด่านพรมแดนแยกแยะเผ่าพันธุ์ฮะ:
- ถ้าใครชูธงลิ้งก์เดินชนกำแพงที่มีคำว่า **`/api/android`** ให้เตะคอกระเด็นส่งหลุมฝังศพ `Android-Target-Group`
- แต่ถ้าใครชูธงลิ้งก์มีคำว่า **`/api/ios`** ให้หมุนพวงมาลัยหักศอกส่งบ้าน `iOS-Target-Group`
คำถามบ๊องแบ๊วท้าอนุบาล: "จงงัดตำราจราจรของ ALB มาเฉลยซิ ว่าทักษะนี้แม่งเรียกว่าส้นตีนบรรทัดอะไร!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- ตำราสวดมนต์บทแรกของกระทรวง Application Load Balancer (ALB): 
  - ถ้าเห็นสแลชห้อยท้ายชื่อเว็บตูดยาวๆ เช่น `.../image`, `.../order`, หรือในข้อนี้คือ **`/api/android` กับ `/api/ios`**
  - นั่นคือวิชาหมอผีดักจับเส้นทางหฤโหดที่เรียกว่า **`"Path-based routing (หรือ Path conditions)"`** โว้ย!! จบ 100% เลยฮะ ไม่ต้องคิดเยอะ!
  - องค์ความรู้เบ่งกล้าม: ถ้าเป็น `Host-based routing (หรือ Host conditions)` จะเป็นการกรองด่านหน้าประตูบ้านใหญ่ เช่น `mobile.example.com` สลับกับ `desktop.example.com` ฮะ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use path conditions to define rules that forward requests to different target groups based on the URL in the request.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! เพราะลูกเล่น `/api/...` ก็คือหางติ่ง Path ของ URL ไงฮะ! หมอผี ALB เก่งกาจเรื่องวิชาแยกแยะ Path conditions จับส่งตึกซ้ายขวาได้ฟินาเล่ระดับแกรนด์มาสเตอร์ คุ้มสุดในพิภพโลกบ้องตื้นฮะ 100% ชัวร์! 

❌ **[ผิด] Use host conditions to define rules that forward requests to different target groups based on the hostname...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!? ลูกศรเบอร์นี้มันดักตีหัวเฉพาะ "Hostname (ยอดหลังคาบ้าน เช่น api.google.com)" โว้ย!! มันไม่ได้ดักจับติ่งห้อยตูดหลังสแลชพ่นไฟพิฆาตแบบ Path เงื่อนไขของโจทย์เลยฮะ ผิดศพตายห่าร้อยเท่าพันทวี! 

❌ **[ผิด] Replace your ALB with a Network Load Balancer...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว!! ไอ้เณรกล้ามปู `Network Load Balancer (NLB)` แม่งหูหนวกตาบอดชั้นฟ้า Layer 7 โว้ย!!" มันเสือกไม่มีปัญญาคลำกระดองหอยเปิดซองดูว่าลิ้งก์มึงเป็น `/api/ios` หรือส้นตีนอะไรเลยฮะ! มันเก่งแต่อัดฉีด TCP ถ่อยๆ! มึงเปลี่ยนพินาศเละเทะล้มละลายฮะ! 

❌ **[ผิด] Replace your ALB with a Gateway Load Balancer then use path conditions...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้หน้าผุ `Gateway Load Balancer` มันสายสืบตำรวจเกาะด่านดักจับไวรัสเครื่องสแกน Network Appliance ฮะ!" ไม่ได้เกิดมานั่งจับก้นดมลิ้งก์ URL ปลดปล่อยชาวบ้านเข้าเว็บแต่อย่างใดฮะ! โง่ดักดาน! 

---
---

## 📌 คำถามที่ 38
**โจทย์:**
A multinational manufacturing company has multiple accounts in AWS to separate their various departments such as finance, human resources, engineering and many others. There is a requirement to ensure that certain access to services and actions are properly controlled to comply with the security policy of the company.

As the Solutions Architect, which is the most suitable way to set up the multi-account AWS environment of the company?

**ตัวเลือก:**
- [ ] Provide access to externally authenticated users via Identity Federation. Set up an IAM role to specify permissions for users from each department whose identity is federated from your organization or a third-party identity provider.
- [x] Use AWS Organizations and Service Control Policies to control services on each account.
- [ ] Connect all departments by setting up a cross-account access to each of the AWS accounts of the company. Create and attach IAM policies to your resources based on their respective departments to control access.
- [ ] Set up a common IAM policy that can be applied across all AWS accounts.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายเพิ่งเบิกเนตรเปิดลัทธิมหากาพย์ **"มีบัญชี AWS ให้แผนกย่อยเต็มศาลพระภูมิหมด (multiple accounts in AWS)"** (บัญชีการเงิน, บัญชีโชว์รูม, บัญชีปราบมาร ฯลฯ)
ความเรื่องมากบังเกิด: "เห้ย! แม่งเยอะว่ะ! สภาพแม่งเหมือนปล่อยหมาหมู่เข้าบ้าน กูจะรวบตึง **ครอบกฎหมายอาญาตีกรอบเหล็กตายตัว (control services / comply with security policy)** รุมเขกกระโหลกสัตว์ประหลาดใน 108 สาขาพร้อมๆ กันได้ไงวะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ: สันดานเผด็จการระดับ "ลัทธิรวมศูนย์ตีหัวนับร้อยบัญชี (Multiple Accounts governance)"... ทิ้งค้อนปอนด์ทุกสรรพสิ่งแล้วบูชาพระผู้เป็นเจ้าองค์เดียวที่ชื่อว่า **`AWS Organizations`** เข้าสิงร่าง!
  - องค์กรนี้มีลูกกระจ๊อกมือขวาชื่ออาวุธนิวเคลียร์ **`SCP (Service Control Policies)`** ที่เป็นกฎอัยการศึกระดับสุดขอบ! ควัก SCP ออกมาฟาดตูมเดียวคอร์รัปชั่นทุก Account หุบปากเงียบกริบ 100%! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Organizations and Service Control Policies to control services on each account.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! พระเอกตัวจริงเสียงจริงแห่งกระทรวงรวมศูนย์รวบอำนาจหลายบัญชี มีครบทั้งแม่ทัพเพลย์บอย (Organizations) ประทับตรากางร่มคุมฝูงลิงหลงฝูงด้วยแส้เฆี่ยนตีพิฆาต (SCP) ราบคาบสมบูรณ์แบบที่สุดในปฐพี! 

❌ **[ผิด] Set up a common IAM policy that can be applied across all AWS accounts.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? อาซ้อใบปะหน้า `IAM policy` ปกติกระจอกงอกง่อย แม่งเป็นสัมภเวสี **"ศาลเล็กที่คุมกะโหลกได้แค่ข้างใน Account บ้านตัวเองเท่านั้นโว้ยยย (Cannot apply across all accounts ซี้ซั้ว)"** มึงเอาใบสมัครพนักงานเซเว่นไปประดับยศยิงข้ามทวีปหาสาขาอื่นไม่ได้ฮะ!! 

❌ **[ผิด] Connect all departments by setting up a cross-account access to each of the AWS accounts of the company.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว!! มอเตอร์ไซค์วินวินาทีเนี่ยนะ 100 แผนก ก็ต้องกด Cross-account จิ้มตั้งค่าลากสายใยเดี่ยวไขว้กัน 10,000 เส้นเนี่ยนะ!!?" ปัญญาอ่อนที่สุดฮะ ลำบากสายตัวแทบขาด! ท่านี้เอาไว้เปิดรูหนอนส่วนตัวคุยกันนิดๆ หน่อยๆ ไม่ใช่วิชาตีวงแหวนคุมจักรวาลเผด็จการแบบที่โจทย์อยากได้ฮะ โดนเตะปลั๊กทิ้ง! 

❌ **[ผิด] Provide access to externally authenticated users via Identity Federation...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! อันนี้คือท่าสวิงสวายเปิดรูให้ "ล็อกอินจากนอกบ้านด้วยรหัสผ่าน Active Directory (Identity Federation)!" แม่งช่วยแก้เคล็ดแค่ปัญหา "มึงล็อกอินเข้าถูกมั้ย (Authentication)" เฉยๆ ฮะ! เสือกไม่ได้เกี่ยวขีดจำกัดตีกรอบกฎหมายอาญา (Account-wide Permission Policy) ล้างไพ่เลยซักติ่ง! มั่วซั่วจับแพะชนไดโนเสาร์ฮะ!

---
---

## 📌 คำถามที่ 39
**โจทย์:**
A website hosted on Amazon ECS container instances loads slowly during peak traffic, affecting its availability. Currently, the container instances are run behind an Application Load Balancer, and CloudWatch alarms are configured to send notifications to the operations team if there is a problem in availability so they can scale out if needed. A solutions architect needs to create an automatic scaling solution when such problems occur.

Which solution could satisfy the requirement? (Select TWO.)

**ตัวเลือก:**
- [x] Create an AWS Auto Scaling policy that scales out the ECS service when the service’s memory utilization is too high.
- [ ] Create an AWS Auto Scaling policy that scales out the ECS cluster when the ALB target group’s CPU utilization is too high.
- [ ] Create an AWS Auto Scaling policy that scales out an ECS service when the ALB endpoint becomes unreachable.
- [x] Create an AWS Auto Scaling policy that scales out the ECS cluster when the service’s CPU utilization is too high.
- [ ] Create an AWS Auto Scaling policy that scales out the ECS service when the ALB hits a high CPU utilization.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายเปิดร้านขายของซุกตึกกล่อง **`Amazon ECS container instances`** แถมมียาม `Application Load Balancer` บังหน้า
วิกฤติหมาว้อ: "พอตี 5 ปุ๊บ ชาวบ้านแย่งกันกดลิ้งก์เพียบ! ร้านกูอืดเต่าชักระตุกหน้ามืดทุกที (loads slowly during peak traffic)!! แถมพนักงานดันต้องนั่งเฝ้าจอรับเมล์แล้วกดผุดตึกด้วยมือเหี่ยวๆ ตัวเอง"
คำสั่งเพชฌฆาต: "มึงไปตั้งหน้าปัดผีเครื่องยนต์ **ซุ่มเสกมดงานกล่องคอนเทนเนอร์ออโต้อัตโนมัติ (scale out automatic)** ทีซิ กูต้องจับตาดูเกจ์วัดสเตตัสหลอดไหนวะ!?" (เลือก 2 ทางเลือก)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎหน้าปัดรถยนต์ Auto Scaling ฝั่งนรกตัวกล่อง ECS:
  - เครื่องระเบิดพลัง ECS แม่งจะจ้องจับพวงมาลัยสถิติชั้นครู (Metrics) ยืนพื้นอยู่แค่ 3 อย่างที่ลากไส้มันได้คือ:
    1) **`Service’s CPU utilization`** (หลอดพลังสมองกล่องบวมเต่ง)
    2) **`Service’s memory utilization`** (หลอดพลังเวทมนต์กล่องอืดความจำเสื่อม)
    3) **`ALB Request Count Per Target`** (ยอดจดหมายซัดหน้าทะลักประตู ALB)
  - นอกจากนี้... คือของเก๊ ของสั่วๆ! โดยเฉพาะมุกตลกฝืดหน้าแหก "CPU ของด่านหน้า ALB"... พระเอกยาม ALB แม่งไม่มีหลอดพลัง CPU ให้มึงมานั่งวัดนั่งดมก้นหรอกโว้ยย!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an AWS Auto Scaling policy that scales out the ECS service when the service’s memory utilization is too high.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! หนึ่งในคัมภีร์วิเศษของเกจ์วัดชีพจรกล่อง ECS ที่โดนกระซวกไส้จนแรมพังล้นตลับ! (Memory utilization สูงปรี๊ด) เจอแบบนี้แสกนปั๊บเตะปลั๊กสเกลเพิ่มร่างแยกสวยงาม 100%! 

✅ **[ถูกต้อง] Create an AWS Auto Scaling policy that scales out the ECS cluster when the service’s CPU utilization is too high.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! เป๊ะปังอลังการเช่นกัน! หลอดพลังสมองของกล่อง ECS (CPU utilization สูงปรี๊ด) ก็เป็นคาถาสดใสอีกตัวที่ยอดฮิตที่สุดในการควักร่างโคลนออกมาสู้งานหนักฮะ ฟันธง 100%! 

❌ **[ผิด] Create an AWS Auto Scaling policy that scales out the ECS service when the ALB hits a high CPU utilization.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ยามศาลไคฟง `Application Load Balancer` มันคือวิญญาณสถิตบริการไร้ตัวตนฮะ!! **"มันไม่มีหลุมฝังศพ CPU ห่าอะไรให้มึงไปส่องจ้องเกจ์วัดเลยโว้ยย!! (No CPU metric on ALB)"** มึงอุตริแต่งนิยายเองลอกตาตายฮะ! 

❌ **[ผิด] Create an AWS Auto Scaling policy that scales out the ECS cluster when the ALB target group’s CPU utilization is too high.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โหววว! เลอะเทอะกันไปใหญ่! ยืดเยื้อซอกหลืบเดิมเหมือนบรรทัดบนเป๊ะ! `Target group ของ ALB` แม่งก็ไม่หน้าด้านแจกค่าสถิติ CPU Utilization หรอกฮะ!" ขืนยิงสูตรนี้ไปรังแต่จะโดนหน้าต่าง Error ตบพังพินาศสั่นๆ แน่นอน ผิดหลักวิกฤต! 

❌ **[ผิด] Create an AWS Auto Scaling policy that scales out an ECS service when the ALB endpoint becomes unreachable.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "โห! ถ้าป้ายหมู่บ้านหน้าโง่ของมึง (ALB endpoint) ถึงขั้นล่มดับระยำตายห่า Unreachable" แม่งไม่ได้เกิดจากการโหลดอืดแล้วฮะ!! ปัญหานี้แม่งแปลว่ามึงเจาะรู Firewall Security Group ผิด หรืออินเตอร์เน็ตโดนเตะปลั๊กพังทั้งค่ายต่างหาก!! การเบ่งร่างเพิ่ม (Scale out) ECS แม่งแก้ปัญหาผิดรูตายซากฮะ โง่ดักดาน! 

---
---

## 📌 คำถามที่ 40
**โจทย์:**
A disaster recovery team is planning to back up on-premises records to a local file server share through SMB protocol. To meet the company’s business continuity plan, the team must ensure that a copy of data from 48 hours ago is available for immediate access. Accessing older records with delay is tolerable.

Which should the DR team implement to meet the objective with the LEAST amount of configuration effort?

**ตัวเลือก:**
- [ ] Mount an Amazon EFS file system on the on-premises client and copy all backups to an NFS share.
- [x] Use an AWS Storage File gateway with enough storage to keep data from the last 48 hours. Send the backups to an SMB share mounted as a local disk.
- [ ] Create an AWS Backup plan to copy data backups to a local SMB share every 48 hours.
- [ ] Create an SMB file share in Amazon FSx for Windows File Server that has enough storage to store all backups. Access the file share from on-premises.

---
### 🎯 โจทย์ต้องการอะไร?
ทีมกู้ภัยออฟฟิศหน้าจ่อยืนปาดเหงื่อ: กะจะโยนก้อนผีขยะแบ็คอัพจากตึกแผงลอยบ้านนอก (on-premises) ไปแช่อุ่นซุกเกาะสวรรค์ผ่านสายเชื่อมท่อประปาสกุล **`SMB protocol`** (ท่อแบบวินโดวส์)
เงื่อนไขอำมหิต: "ถ้าหัวแตกโชกเลือด... ส้วมของ 48 ชั่วโมงล่าสุดต้อง **ดีดนิ้วดึงของเก่าฉกมาดูสดๆ ได้ทันทีไม่หน่วงเลย! (data from last 48 hours available for immediate access)** ส่วนพวกแก่หงำเหงือกที่เกิน 48 ชม. ให้มันกระดี๊กระด๊าจิบชาช้าๆ มีอาการดีเลย์หน่อยกางร่มรอได้ (delay is tolerable)"
คำสั่งเพชฌฆาต: "มึงไปควักคัมภีร์วิเศษกระทรวงไหนมาดีวะ ที่ตอบโจทย์ห่านี้แถม **หน้าด้านขี้เกียจตั้งค่าสุดๆ (LEAST effort)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ: สื่อสารท่อ **"SMB Protocol หรือ NFS Protocol"** คับป่าแบบนี้แถมพ่วงการโยนก้อนศพซุกใต้ตึก On-premise มุ่งสู่ท้องพระแม่ S3! มึงอย่าดื้อด้านมองข้ามประตูเวทมนต์ฮีโร่สายนี้ฮะ: **`AWS Storage File Gateway`** (จำไว้เลย File Gateway = กินทั้ง NFS และ SMB แถมก้นเป็น S3)
  - แถมมันมีลูกเล่นวิเศษชื่อว่า **`Local Cache (หม้อพักใจหน้าบ้าน)`** มึงแค่เบ่งไซส์หม้อหน้านี้ให้ใหญ่พออมซากของ 48 ชั่วโมงล่าสุด... มันก็เสกพรให้ดึงข้อมูลอุ่นๆ แถวๆ นี้เข้าสู่อย่างเสี้ยววิแบบสดชื่น!! ตกสเปกโจทย์ 100%! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an AWS Storage File gateway with enough storage to keep data from the last 48 hours. Send the backups to an SMB share mounted as a local disk.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! โคตรเพอร์เฟค! เสกหีบวิเศษ `File Gateway` ที่รองรับสายยาง SMB พอดีเด๊ะ แล้วจงใจเบ่งท้องก้นหีบ (Local Cache) ให้กว้างพอซ่อนศพ 48 ชม. โว้ว!! ดึงของสดจี๊ดจ๊าดไม่หน่วงตามเป้า ส่วนของแก่ๆ ก็ถูกสูบถ่มถุยลง S3 ไกลโพ้น ดึงมาดูใหม่ก็ดีเลย์นิดๆ ฟินกระจายไร้ที่ติฮะ! 

❌ **[ผิด] Create an SMB file share in Amazon FSx for Windows File Server that has enough storage to store all backups. Access the file share from on-premises.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? แม้ตระกูล `FSx server` แม่งจะสับร่าง SMB โหดโฉดก็จริง... แต่มึงเสือกหน้าด้านให้เครื่องดักดานฝั่ง On-premise กระโดดเกาะไฟล์ฝั่ง AWS ทื่อๆ ตรงๆ โว้ยย!! ถ้าจะทำบัดซบขนาดนี้มึงต้องถ่อสังขารไปนั่งงมสวดสายเชื่อมมิติ `VPN Network` หรือ `Direct Connect` ล่อไปสิบล้านท่า!! สอบตกพินาศเรื่อง "Least configuration effort (ขี้เกียจตั้งค่า)" อย่างรุนแรงฮะ! 

❌ **[ผิด] Mount an Amazon EFS file system on the on-premises client and copy all backups to an NFS share.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว!! บอสร้องแผกแหกปากชัดแจ๋วว่ากูจะโหนสายสกุล **`SMB protocol (ฝั่ง Windows)`** โว้ย!!" มึงดันทะลึ่งไปเปิดบ่อเลี้ยงปลาดุก **`Amazon EFS`** ซึ่งเป็นยันต์ของเผ่าพันธุ์ **`NFS protocol (ฝั่ง Linux ตัวดำ)`** เนี่ยนะฮะ!? มั่วซั่วหยิบสากกะเบือรบกับดาบเจไดตายโหงตายห่าฮะ! 

❌ **[ผิด] Create an AWS Backup plan to copy data backups to a local SMB share every 48 hours.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้หน้ากากลิง `AWS Backup` แม่งเก่งแต่กวาดขยะห่อศพ **บริการไส้ในดงป่า AWS เองด้วยกันโว้ยยย (AWS native resources)**!!" มันไม่ได้มีปัญญาหน้าด้านมุดสะพานทอดไข่คั่วขโมยศพเครื่องชาวบ้านใน On-premise SMB ตรงๆ ทื่อๆ ในระบบดึกดำบรรพ์ได้หรอกฮะ! ผิดฟังก์ชั่นระดับขุดหลุมฝังตัวตาย! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 5: ข้อ 41 - 50)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 41
**โจทย์:**
A Solutions Architect needs to set up the required compute resources for the application which have workloads that require high, sequential read and write access to very large data sets on local storage.

Which of the following instance type is the most suitable one to use in this scenario?

**ตัวเลือก:**
- [ ] General Purpose Instances
- [x] Storage Optimized Instances
- [ ] Memory Optimized Instances
- [ ] Compute Optimized Instances

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งไปหาซื้อคอมพิวเตอร์ลูกรักตัวใหม่ (EC2 instance) มารันงานช้าง!
สเปกนรก: "กูจะเอาไปสูบข้อมูลมหาศาล ปั่นกระจุยกระจาย ทลายโกดัง **อ่านเขียนข้อมูลเป็นกอบเป็นกำลงฮาร์ดดิสก์แบบบ้าระห่ำ (high, sequential read and write access to very large data sets on local storage)!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "กูต้องถอยรถไถรุ่นไหนมาถึงจะคู่ควรวะฮะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งเผ่าพันธุ์รถถัง EC2: 
  - ท่องจำให้ขึ้นใจ: ถ้าเจอคีย์เวิร์ด **"ตะบี้ตะบันปั่นฮาร์ดดิสก์ อ่าน/เขียน โหดโฉด (High Read/Write / Large data sets / Local storage)"** แม่งต้องพึ่งพี่บิ๊กสายหิ้วกระสอบข้าวสารอย่างเผ่าพันธุ์ **`"Storage Optimized Instances (ซีรีย์ I, D, H)"`** เท่านั้นฮะ! พละกำลังเหนือโลก! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Storage Optimized Instances**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกที่สุดในสามโลกฮะ รุ่นนี้สร้างมาเผื่อกะซวกไส้ทะลวงฮาร์ดดิสก์ IOPS ในพื้นที่ท้องถิ่น (Local storage) ได้ทะลักทะล้นหลักหมื่นหลักแสนรอบต่อวินาที ตอบโจทย์สายร่อนทอง 100%! 

❌ **[ผิด] Memory Optimized Instances**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!? ไอ้กล้ามโตตัวนี้ (สาย R, X) แม่งเก่งเรื่อง "ยัดข้อมูลเข้าแรม (Memory / RAM) ไปประมวลผลด่วนจี๋" ฮะ ไม่ได้เก่งเรื่องตอกเสาเขียนลงดิสก์แต่อย่างใดฮะ! 

❌ **[ผิด] Compute Optimized Instances**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! ไอ้หนุ่มแว่นเนิร์ดตัวนี้ (สาย C) แม่งเก่งเรื่อง "คำนวณสูตรคณิตศาสตร์ หัวแตก ถอดรหัส แปลงไฟล์วิดีโอ (Compute-bound)" โว้ย!! ไม่ได้เกิดมาแบกกระสอบข้าวสารลงโกดังฮาร์ดดิสก์เลยฮะ มั่วซั่วหยิบสากกะเบือรบกับดาบเจไดตายโหงตายห่าฮะ! 

❌ **[ผิด] General Purpose Instances**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้ไก่รองบ่อน เป็ดง่อย (สาย T, M)" รุ่นกลางๆ ทำได้ทุกอย่างต้มยำทำแกง แต่เสือกไม่เทพซักด้าน! เอาไปชนกับงานช้างอสูรกายระดับนี้ แม่งหัวแบะกระอักเลือดตายห่าคากองเอกสารฮะ! 

---
---

## 📌 คำถามที่ 42
**โจทย์:**
A Solutions Architect is working for a weather station in Asia with a weather monitoring system that needs to be migrated to AWS. Since the monitoring system requires a low network latency and high network throughput, the Architect decided to launch the EC2 instances to a new cluster placement group. The system was working fine for a couple of weeks, however, when they try to add new instances to the placement group that already has running EC2 instances, they receive an 'insufficient capacity error'.

How will the Architect fix this issue?

**ตัวเลือก:**
- [ ] Create another Placement Group and launch the new instances in the new group.
- [ ] Submit a capacity increase request to AWS as you are initially limited to only 12 instances per Placement Group.
- [x] Stop and restart the instances in the Placement Group and then try the launch again.
- [ ] Verify all running instances are of the same size and type and then try the launch again.

---
### 🎯 โจทย์ต้องการอะไร?
กรมอุตุจะย้ายบ้านมา AWS อยากได้เน็ตวิ่งลื่นปรู๊ดปร๊าด (low latency, high throughput) เลยต้อนจับ EC2 ไปยัดเข้ากรงกะเกณฑ์ที่ชื่อ **`Cluster Placement Group`** (เพื่อให้เครื่องมันสุมหัวสิงอยู่ตู้เหล็กตู้เดียวกัน)
วิกฤติหมาว้อ: "ใช้มาสองสัปดาห์ อยากคลอดลูกเพิ่มฮะ... ปรากฏว่าพอกดปุ่มเบ่งเครื่องใหม่ แม่งขึ้นหน้าต่างแดงแปร๊ดด่าว่า **'insufficient capacity error' (ตะแกรงตู้เต็ม กูยัดเครื่องใหม่ให้มึงไม่ได้แล้วโว้ยย)!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงงัดตำราสายเทามาแก้เคล็ดทีซิ เอาไงต่อดี!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง Placement Group ฮะ!
- กฎแห่งกรงหมา Cluster Placement Group:
  - แม่งคือการบังคับให้ AWS จับเซิร์ฟเวอร์มึง ไปสุมหัวยืนกอดคอกันอยู่บนแผ่นเหล็ก (Hardware) แผ่นเดียวกัน เพื่อให้เน็ตตะโกนหากันไวๆ
  - แต่ถ้ายัดลูกทีหลังแล้วที่มันเต็มเกยตื้น (insufficient capacity)! **ท่าแก้เคล็ดข่มขืนป่าช้ามีท่าเดียวคือ "สั่ง Stop เครื่องเก่าทั้งหมดพร้อมกัน... แล้วกด Start ปลุกผีขึ้นมาใหม่ทั้งหมด!! (Stop and restart instances)"**
  - พอปลุกใหม่พร้อมๆ กันปุ๊บ... AWS แม่งจะฉลาดหาตู้แผงเหล็กไซส์บิ๊กเบิ้มใบใหม่ที่ยัดครบทั้งครอบครัวมึงได้ แล้วอพยพไปยัดลงนั่นให้จบๆ สวยๆ เลยฮะ 100% ชัวร์! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Stop and restart the instances in the Placement Group and then try the launch again.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตามสูตรยาผีบอกที่กล่าวไว้ฮะ: สับเบรกหัวทิ่ม (Stop) แล้วสตาร์ทใหม่! AWS จะจัดแจงหาโกดังใหญ่กว่าเดิมสาดมึงลงไปพร้อมลูกน้องหน้าใหม่รวดเดียวจบ เลี่ยงหลุมศพความจุทะลักได้สบายๆ ฮะ! 

❌ **[ผิด] Create another Placement Group and launch the new instances in the new group.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? เสร่อไปเปิดกรงใหม่ขังลูกเมียแยกบ้าน... แล้วเป้าหมายที่โจทย์บอกว่า 'อยากให้ทุกเครื่องหันไปซุบซิบกระซิบกันไวๆ (Cluster)' แม่งจะเป็นจริงได้ไงละวะฮะ มันก็ห่างเหินคุยกันข้ามเขาข้ามทะเลสิฮะ ผิดบรรทัดฐานอย่างรุนแรง! 

❌ **[ผิด] Submit a capacity increase request to AWS as you are initially limited to only 12 instances per Placement Group.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! กฎหมาบ้าที่ไหนเนี่ย โควต้าจำกัดแค่ 12 เครื่องต่อตู้!!?" แม่งแต่งนิยายนั่งเทียนเขียนหลอกควายล้วนๆ ฮะ ในโลกแห่งความจริงไม่มีขีดจำกัดหน้าโง่เลข 12 หรอกฮะ! 

❌ **[ผิด] Verify all running instances are of the same size and type and then try the launch again.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยยย! ถึงมึงจะตรวจดูว่าสเปกเครื่องหุ่นเท่ากันเป๊ะ แต่อนาถารูรูแผงเหล็กมันเต็มกางเกงในปริ (capacity error) โว้ยยย!!" การมานั่งส่องกระจกดูสเปกไม่ได้ช่วยเขี่ยนิ้วเปิดแผงเหล็กให้กว้างขึ้นได้ซักกะติ๊ดดด! ไม่แก้อะไรเลยฮะ!

---
---

## 📌 คำถามที่ 43
**โจทย์:**
There is a technical requirement by a financial firm that does online credit card processing to have a secure application environment on AWS. They are trying to decide on whether to use KMS or CloudHSM.

Which of the following statements is right when it comes to CloudHSM and KMS?

**ตัวเลือก:**
- [ ] If you want a managed service for creating and controlling your encryption keys but don't want or need to operate your own HSM, consider using AWS CloudHSM.
- [x] You should consider using AWS CloudHSM over AWS KMS if you require your keys stored in dedicated, third-party validated hardware security modules under your exclusive control.
- [ ] AWS CloudHSM should always be used for any payment transactions.
- [ ] No major difference. They both do the same thing.

---
### 🎯 โจทย์ต้องการอะไร?
แก๊งค์มาเฟียเจ้าพ่อนายธนาคาร (financial firm) รูดปรื๊ดบัตรเครดิตออนไลน์ กลัวโดนแฮกเกอร์ฉกกระเป๋าตังค์ 
ข้อถกเถียงผ่าซาก: "เจ้านายกำลังปวดกะโหลก... เลือกไม่ถูกฮะ! ระหว่างหยิบ **`AWS KMS`** หรือ **`AWS CloudHSM`** มาใช้คุมกุยแจเข้ารหัสเซฟเฮ้าส์ตัวเองดีวะ!?"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงเลือกชอยส์บรรทัดที่วิสัชนาสัจธรรมของ 2 เทพเจ้ากุญแจนี้ได้ถูกต้องที่สุดทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งคุกมืดแม่กุญแจเทพ 2 ดอก:
  - **`AWS KMS:`** เป็นลูกกระจ๊อกขูดตังค์หน้างาน (Managed service) เหมาะกับคนมักง่ายขี้เกียจคุมตู้ฮาร์ดแวร์เอง! ใช้ง่าย ฝังรากครบจักรวาล AWS
  - **`AWS CloudHSM:`** เป็นปู่โสมเฝ้าทรัพย์ตัวพ่อหน้าเลือด! เมื่อมึงต้องการ **"จ่าฝูงตู้เหล็กฮาร์ดแวร์ของกูคนเดียว กฎบ้าบอมาตรฐานคนนอกรับรอง (Third-party validated / Single-tenant) ตัวกูเสือกบงการได้คนเดียว AWS ก็เสือกไม่ได้ (under your exclusive control)!"**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] You should consider using AWS CloudHSM over AWS KMS if you require your keys stored in dedicated, third-party validated hardware security modules under your exclusive control.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! คำนิยามศักดิ์สิทธิ์ของปู่โสม `CloudHSM` ครบถ้วนกระบวนความฮะ! ตู้เหล็กส่วนตัว (Dedicated), ตรวจสอบจากภายนอกล้านเปอร์เซ็นต์ (Third-party validated), และสิทธิ์ขาดกูกุมกุญแจแต่เพียงผู้เดียว (Exclusive control)! ถ้าลูกค้ายึดติดหลงป่ากฎหมายบ้าบอ มึงจัด CloudHSM อัดปากแม่งไปเลยฮะ 100%! 

❌ **[ผิด] If you want a managed service for creating and controlling your encryption keys but don't want or need to operate your own HSM, consider using AWS CloudHSM.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาส้มตำมาสับสลับกระเทียมหรอฮะ!? มึงเขียนสลับหัวมังกรกันแล้ว!! ไอ้คนที่ "มักง่ายขี้เกียจเลี้ยงตู้ HSM เอง (don't want to operate your own HSM)" मै่งต้องจิ้ม **`AWS KMS`** โว้ยยย ไม่ใช่ชี้หน้าบอกให้ไปใช้ CloudHSM!! ย้อนแย้งหน้าคว่ำฮะ! 

❌ **[ผิด] AWS CloudHSM should always be used for any payment transactions.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! กฎหมาบ้าที่ไหนเนี่ย บังคับกรอกหูว่ารูดปรื๊ดเมื่อไหร่ต้องใช้ CloudHSM มัดตัวผูกขาดเสมอไป!!?" แม่งเพ้อเจ้อตีขลุมฮะ! KMS ก็ได้รับใบเซอร์ผ่านเกณฑ์ PCI-DSS รูดปรื๊ดบัตรเครดิตลื่นหัวทิ่มได้เหมือนกันฟร้อนท์ๆ โว้ย! ไม่เกี่ยวห่าอะไรเลยที่ต้องบังคับว่าต้อง CloudHSM รัวๆ เสมอไปฮะ!

❌ **[ผิด] No major difference. They both do the same thing.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไม่มีความต่างโพ่งง!" ฟ้ากับเหวเลยโว้ยย! อันนึงตู้สาธารณะของรัฐบาล AWS จิ้มง่ายๆ อันนึงตู้เซฟส่วนตัวโคตรรวยเช่าเหมาลำ 100%! มึงตบหน้าเทพเจ้าผู้สร้างตายหงายท้องฮะตอบข้อนี้! 

---
---

## 📌 คำถามที่ 44
**โจทย์:**
A company has an application architecture that stores both the access key ID and the secret access key in a plain text file on a custom Amazon Machine Image (AMI). The EC2 instances, which are created by using this AMI, are using the stored access keys to connect to a DynamoDB table.

What should the Solutions Architect do to make the current architecture more secure?

**ตัวเลือก:**
- [ ] Put the access keys in an Amazon S3 bucket instead.
- [x] Remove the stored access keys in the AMI. Create a new IAM role with permissions to access the DynamoDB table and assign it to the EC2 instances.
- [ ] Do nothing. The architecture is already secure because the access keys are already in the Amazon Machine Image.
- [ ] Put the access keys in Amazon Glacier instead.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายโง่เขลาเบาปัญญา: สร้างหุ่นกระบอก AMI แล้ว **"สักลายแทงกุญแจผี Access Key & Secret Key เปลือยๆ อล่างฉ่าง แปะแหมะไว้ข้างฝาผนังตึก (plain text file)!!"** 
วีรกรรมสัปดน: ลูกเจี๊ยบ EC2 ตัวไหนเกิดจาก AMI หุ่นรุ่นนี้ก็จะคว้ากุญแจผีอันนี้ ไปไขประตูทะลวงหยิบของในตู้เย็น DynamoDB กินรัวๆ
คำสั่งเพชฌฆาต: "โอ้โหววว! โคตรอันตราย หละหลวมส้นตีนมากฮะ! มึงไปงัดวิชาความปลอดภัยขั้นเทพ มาตบกบาลเจ้านายแก้ปัญหารูรั่วนี้ทีซิ!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎเหล็กกระทรวงรักษาความมั่นคง AWS: 
  - **"ห้าม! ห้าม!! ห้ามมึงจดโพยรหัส Access Key / Password ฝังติดตึกยัดไว้ในซอร์สโค้ด หรือยัดใน AMI เด็ดขาดโว้ยยย!!!"** ลบแม่งทิ้งให้เหี้ยนเด๋วนี้!!
  - ท่ามาตรฐานเพชรยอดมงกุฎที่ถูกต้องคือ: ให้มึงปั้นยันต์กันผี **`IAM Role`** เสกสเวทมนต์อนุญาตไขตู้เย็น DynamoDB ไว้... แล้วเอาเชือกฟางจับ **IAM Role มัดโยงสวมผูกติดทับร่าง EC2 (Assign role to EC2 instance)!!** แค่นี้ EC2 ก็จะล้วงตู้เย็นได้ฟรีๆ ปลอดภัยไร้รอยต่อ โดยไม่ต้องพกพาสเวิร์ดเหี้ยอะไรทั้งสิ้น 100% ชัวร์ตังค์อยู่ครบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Remove the stored access keys in the AMI. Create a new IAM role with permissions to access the DynamoDB table and assign it to the EC2 instances.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! โคตรพ่อโคตรแม่ถูกต้องทะลุจักรวาลฮะ! กระทืบรหัสที่สลักไว้บน AMI ทิ้งซะ! แล้วเสกชุดทหาร `IAM Role` ติดปีกให้ EC2 ใส่สวมรอยไปไขประตู DynamoDB แทน จบสวยสดงดงามตามหลักสถาปัตยกรรมระดับเทพฮะ! 

❌ **[ผิด] Do nothing. The architecture is already secure because the access keys are already in the Amazon Machine Image.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? "ซากศพปลอดภัยพ่องงง!!" ใครหน้าไหนไปล้วงก๊อปปี้เอา AMI ดึกดำบรรพ์ก้อนนี้ไปแตกไฟล์ ก็เห็นรหัสผ่านกระแทกตาสว่างจ้า ขนของหนีพินาศวอดวายหมดสิฮะ บ้าบอคอแตกที่สุดฮะ! 

❌ **[ผิด] Put the access keys in an Amazon S3 bucket instead.** และ **Put the access keys in Amazon Glacier instead.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! หนีเสือปะช้างขนานแท้ฮะ!" รหัสอยู่ในหุ่นกระบอกว่าแย่แล้ว... มึงยังจะหน้าด้านอุ้มรหัสผีไปฉิบหายซุกซ่อนฝังดินไว้ในตู้เซฟป่าช้าอย่าง `S3` หรือตู้เย็นช่องฟรอส `Glacier` แดกแอร์เล่นอีก!! มึงกะว่าจะให้แฮกเกอร์ขุดเจาะหลุมศพเอาไปกินง่ายขึ้นหรอฮะ!? นั่งจับแพะชนไดโนเสาร์ฮะ โดนตบปากแตก! 

---
---

## 📌 คำถามที่ 45
**โจทย์:**
A company has a fleet of running Spot EC2 instances behind an Application Load Balancer. The incoming traffic comes from various users across multiple AWS regions, and you would like to have the user's session shared among the fleet of instances.

A Solutions Architect is required to set up a distributed session management layer that will provide scalable and shared data storage for the user sessions that supports multithreaded performance. The cache layer must also detect any node failures and replace the failed ones automatically.

Which of the following would be the best choice to meet the requirement while still providing sub-millisecond latency for the users?

**ตัวเลือก:**
- [ ] Amazon RDS database with RDS Proxy
- [x] Amazon ElastiCache for Memcached with Auto Discovery
- [ ] AWS ELB sticky sessions
- [ ] Amazon ElastiCache for Redis Global Datastore

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายปั้นแก๊งค์จรจัด EC2 Spot ยืนแจกโปรอยู่หลังตู้ยาม ALB
วิกฤติหมาว้อ: "ลูกค้าทะลัก! กูอยากให้ปาท่องโก๋ประวัติการล็อคอิน **(user's session) ถูกแชร์แบ่งปันดมกันได้ครบทุกเครื่องในดงพงไพรนี้ (shared among fleet)!!**"
สเปกนรกแตกบังคับ 4 ข้อรวด: 
1) เร็วดุจสายฟ้าฟาดทะลวงนรก **(sub-millisecond latency)**
2) สับสวิตช์มัลติเธรดโหดโฉด **(multithreaded performance)**
3) ถ้าเครื่องพังหน้ามืดตายห่า... ต้องรู้ตัวแล้วเด้งเปลี่ยนศพให้ใหม่เอี่ยม **(detect node failures and replace automatically)**
4) **(Auto Discovery)** แบบลับๆ แฝงอยู่ในกมลสันดาน!
คำถามบ๊องแบ๊วท้าอนุบาล: "จงอัญเชิญพระเจ้าองค์ไหนมากางร่มให้โปรเจคนี้ดีวะฮะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- คาถายมราชประสานวิญญาณ: พอโจทย์ร้องแหกปากหาเวชระเบียบ **"Sub-millisecond"** มึงตัดแก๊งค์ถังขยะ RDS ทิ้งได้เลยฮะ ลูกเต๋าล็อคเป้ามาที่ตระกูลตุ่นปากเป็ดอย่าง **`ElastiCache`** ทันที!
  - ทีนี้มาแหกอกชิงดำ: ระหว่าง `Memcached` กับ `Redis` ใครเข้าวิน!?
  - คีย์เวิร์ดปลิดชีพคือ: **"Multithreaded performance"** (ทำงานหลายแขนหลายขา) โล่นี้เป็นลูกรักของ **`Memcached`** แต่เพียงสะดือเดียวฮะ! (Redis เป็นพวกมนุษย์แขนด้วน Single-threaded)
  - แถม Memcached มีสกิลลัทธิหลบซ่อนตัวที่ชื่อ **`Auto Discovery`** ร่ายมนต์หากันเองแล้วปลดระวางขยะเน่าเสียให้เบ็ดเสร็จฮะ ฟินาเล่ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon ElastiCache for Memcached with Auto Discovery**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปก 4 ซุ้มเรือนยอดฮะ! เป็นเทพความเร็วแสง (Sub-millisecond), ตีลังกาหลายตลบแบบ (Multithreaded), แถมยังมีสายสิญจ์ `Auto Discovery` คอยปัดเป่าดมกลิ่นตามล่าศพเน่าแล้วงอกหน่อทดแทนตายตัวฮะ! เพอร์เฟคทะลุมิติ! 

❌ **[ผิด] Amazon ElastiCache for Redis Global Datastore**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเจี๊ยบ `Redis` แม่งเป็นพวกแขนด้วนขาขาดทำงานตอดทีละจึ้ก **"Single-threaded"** โว้ยยย ไม่ใช่ "Multithreaded" อย่างที่โจทย์ร้องขอฮะ! แถมโยนติ่ง Global Datastore มาให้ไขว้เขวเฉยๆ ฮะ ไม่ตรงสเปกอย่างหนัก!

❌ **[ผิด] Amazon RDS database with RDS Proxy**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว!! บอสร้องอยากแดกสปีดระดับแฟลช **Sub-millisecond** เสี้ยวของเสี้ยวของเสี้ยววินาที!!" แม่งเอารถไถนา `RDS` ที่เป็นกระดองเต่า Harddisk ล้วนๆ มารัน มันไม่มีปัญญาผลิตความเร็วแสงหรอกโว้ย แถมเอามาคุม Session อีก เหนื่อยจิปถ่างฮะ! 

❌ **[ผิด] AWS ELB sticky sessions**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ไอ้ยาม ELB หน้าโง่!" ยันต์กาวช้าง `sticky session` แม่งเป็นการแก้ปม "บังคับให้ลูกค้าตีนติดกาว ล็อกอินกี่ตลบก็ถูกเตะส่งกลับไปเครื่อง EC2 เครื่องเดิมหน้าซ้ำๆ!" มันเสือก **ไม่ได้เป็นการแชร์ข้อมูล session แบ่งปันกันทั้งฝูง (shared among fleet)** แบบที่โจทย์กระเหี้ยนกระหือรืออยากได้ฮะ โง่ดักดานตายห่า! 

---
---

## 📌 คำถามที่ 46
**โจทย์:**
A global medical research company has a molecular imaging system that provides each client with frequently updated images of what is happening inside the human body at the molecular and cellular levels. The system is hosted in AWS and the images are hosted in an S3 bucket behind a CloudFront web distribution. When a fresh batch of images is uploaded to S3, it is required to keep the previous ones in order to prevent them from being overwritten.

Which of the following is the most suitable solution to solve this issue?

**ตัวเลือก:**
- [ ] Add Cache-Control no-cache, no-store, or private directives in the S3 bucket
- [ ] Invalidate the files in your CloudFront web distribution
- [x] Use versioned objects
- [ ] Add a separate cache behavior path for the content and configure a custom object caching with a Minimum TTL of 0

---
### 🎯 โจทย์ต้องการอะไร?
หมอโรคจิตเปิดเว็บแสกนอวัยวะภายในสดๆ ร้อนๆ! โยนรูปลงถัง S3 แล้วโดนสตั๊นบัฟความเร็วแสงด้วย **`CloudFront`**
วิกฤติหมาว้อ: "พอกูอัพรูปปอดตับไตไส้พุงเซ็ตใหม่ขึ้น S3 ถี่ๆ... **กูอยากเก็บซากรูปอดีตของเก่าดองไว้ให้หมด! ห้ามบันทึกทับฆ่ารูปเก่าเด็ดขาด (keep the previous ones / prevent from being overwritten)!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "ท่ามกลางพายุอันเชี่ยวกรากของ CloudFront... กูทุบแก้ปมนี้ด้วยคาถาศักดิ์สิทธิ์บทไหนดีวะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความทรงจำ S3 ข้ามภพ:
  - อ่านคีย์เวิร์ดกษัตริย์ตรงๆ เลย: **"ห้ามทับของเก่า / อยากเก็บประวัติทั้งหมดไว้ (prevent overwritten / keep previous)"**
  - ไม่ต้องแคร์ CloudFront ให้ปวดหมองเลยฮะ! คาถาปัดเป่าปัญหาลูกกะโล่นี้ของ S3 คือมึงแค่กดปลดล็อคยันต์กันผี **`"Versioning (เครื่องจักรระลึกชาติ)"`** หรือใช้ชื่อไฟล์เป็นเวอร์ชั่น (Versioned objects) แค่นี้ศพเก่ามึงก็พะเนินเทินทึกไม่มีทางสูญหายกลืนกินแน่นอนฮะ 100% ชัวร์ตังค์อยู่ครบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use versioned objects**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ซีเครทคอมโบระดับอนุบาล 1! อยากแฉ่งรูปภาพใหม่แต่เสียดายงกรูปรุ่นเก่าไว้ดูต่างหน้า ก็แค่สับสวิตช์ใช้ `Versioning` ใส่รหัส V1, V2 ให้ไฟล์ แค่นี้ CloudFront ก็แจกจ่ายของสด แถมของเก่าใน S3 ก็ยังรอดตายจากการโดนปู้ยี่ปู้ยำทับเละได้ชัวร์ๆ ฮะ! ฟินกระจาย! 

❌ **[ผิด] Invalidate the files in your CloudFront web distribution**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ยันต์หมอผี `Invalidation` แม่งคือการล้างป่าช้าไล่เตะตูดซากแคชทิ้งจากหน้าปัด CloudFront! มันทำให้เห็นรูปใหม่เร็วขึ้นก็จริง... แต่เสือกไม่ได้ช่วยป้องกันออฟชั่น "ห้ามรูปใน S3 โดนบันทึกทับทิ้ง (prevent overwritten)" แต่อย่างใดเลยโว้ย! ขูดเลือดขูดเนื้อเสียตังค์ฟรีฮะ! 

❌ **[ผิด] Add a separate cache behavior path for the content and configure a custom object caching with a Minimum TTL of 0**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "เปลี่ยนกฎหมายตั้งนาฬิกาตาย `TTL เป็น 0` เพื่อบังคับห้าม CloudFront จำซากขยะไว้!" แม่งก็ทำให้ CloudFront เอ๋อแดกดึงแต่รูปสดๆ จนโหลดอืดบรรลัยชิ้วหายฮะ! แถมอ่าว... แล้วประเด็นพิทักษ์ซากศพของเก่าใน S3 ล่ะ!? ก็หลุดวงโคจรโดนบันทึกทับตายโหงเหมือนเดิมฮะ โง่ดักดาน! 

❌ **[ผิด] Add Cache-Control no-cache, no-store, or private directives in the S3 bucket**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! เล่นแผลงๆ ยัดหัวสลากเตือน CloudFront ว่าห้ามอมลูกอม (no-cache)! ก็เหมือนบรรทัดบนเป๊ะฮะ ไวรัสแดกตายห่าแถมเสือกเบี่ยงประเด็นเรื่องกันกระแทกไฟล์ทับใน S3 ทิ้งหน้าตาเฉยฮะ! นั่งตีปลาหน้าไซฮะ!

---
---

## 📌 คำถามที่ 47
**โจทย์:**
A company launched a cryptocurrency mining server on a Reserved EC2 instance in the us-east-1 region's private subnet that uses IPv6. Due to the financial data that the server contains, the system should be secured to prevent any unauthorized access and to meet regulatory compliance requirements.

In this scenario, which VPC feature will allow the EC2 instance to communicate to the Internet but prevents inbound IPv6 traffic?

**ตัวเลือก:**
- [ ] NAT instances
- [x] Egress-only Internet gateway
- [ ] Internet Gateway
- [ ] NAT Gateway

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่ปล้นธนาคารมาแอบเปิดบ่อนขุดเหรียญคริปโต บดขยี้อยู่ในถ้ำลึกโซนส่วนตัว (private subnet) แต่เสือกใช้อินเตอร์เน็ตเผ่าพันธุ์อนาคต **`IPv6`**
ความกลัวขี้หดแคปเจอร์: "ข้อมูลลับกูมันสยองเกิน! อยากให้เครื่อง EC2 กูคายน้ำลายพ่นไวรัสออกไปดูดเน็ตชาวบ้านได้สบายเบิร์ด **แต่ปิดประตูตายห้ามไอ้หน้าโง่ตัวไหนบนเน็ตทะลวง IP ทักทายเข้ามาได้เลยเด็ดขาด (communicate to internet BUT prevent inbound IPv6 traffic)!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "กูต้องฝังเสาอากาศรุ่นไหนลงไปในรู VPC ดีฮะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งประตูบ้าน VPC ที่มี 2 สแตนดาร์ด:
  - ฝูงชนยุคหินสาย **`IPv4:`** ถ้าจะทำออปชัน ออกได้-แต่เสือกเข้าไม่ได้ แม่งต้องใช้เตารีด **`NAT Gateway / NAT Instance`**
  - **แต่เดี๋ยวก่อน!** ถ้ามึงเปรียวปี๊ดใช้เผ่าพันธุ์ **`IPv6:`** ... ไอ้ลุง NAT Gateway แม่งหูหนวกตาบอดทำไม่เป็นโว้ย!! 
  - สวรรค์ลิขิตมาให้มึงต้องชักดาบขุนพลที่มีชื่อว่า **`"Egress-only Internet gateway (EIGW)"`** เท่านั้นฮะ!! เกิดมาเพื่อสายเลือด IPv6 ล้วนๆ ออกทักทายชาวโลกได้ แต่ฝั่งนู้นบุกทะลวงกลับมาโดนเตะก้านคอสลบปางตาย 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Egress-only Internet gateway**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! พระเอกขี่ม้าขาวตัวจริงของสงครามสายเลือด `IPv6`! กาลอวสานที่มันออกแบบมาโดยเฉพาะ บังหน้าตึก Private ให้ปั่นขุดเหรียญเริงร่าออกเน็ตได้ แต่ดักตบกบาลพวกซอมบี้ห้ามบุกสวนเข้ามา (Prevent inbound) ชิวๆ ฮะ! จบ 100%! 

❌ **[ผิด] NAT Gateway**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเจี๊ยบ `NAT Gateway` แม่งคือตำนานเทพของฝั่งเมืองมนุษย์ยุคหิน `IPv4` โว้ยยย แกนกลางสันดานมันไม่รู้จักภาษาหน้าตาสายพันธุ์ `IPv6` แถมดักประตูทางเข้าของ V6 ไม่เป็นด้วยฮะ โคตรมั่วตายดักดาน! 

❌ **[ผิด] NAT instances**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ปัจจุบันใครใช้ NAT instance นี่แม่งต้องจุดธูปไหว้นะฮะ โบราณเกิ๊นติ!" และอีพ็อคนี้ก็เหมือนรุ่นพี่มันด้านบนฮะ แม่งเป็นยารักษาโรคหืดจับเฉพาะเผ่า `IPv4` ไม่ได้มีหัวสมองไปจับต้อง `IPv6` แต่อย่างใดฮะ เลอะเทอะสุดๆ! 

❌ **[ผิด] Internet Gateway**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "ประตูหน้าบ้านโจ๋งครึ่ม!" ถ้ามึงเอา `Internet Gateway (IGW)` มาครอบสวมหัวปุ๊บ สภาพก็คือเตะเปิดฟรีคิกอ้าซ่าให้ชาวโลกบุกหน้าสลอนเข้าทิ่มตูด EC2 มึงพรุนได้สบายสแว้กเลยฮะ (Allow inbound) ผิดกฎหมายเหล็กของเถ้าแก่บรรทัดสุดท้ายอย่างรุนแรงพินาศฮะ โง่ดักดาน!

---
---

## 📌 คำถามที่ 48
**โจทย์:**
An e-commerce company plans to optimize its disaster recovery configuration using AWS Cloud to minimize operational disruptions during outages or major system maintenance for its on-premises Microsoft SQL Server-based application. The objective is to achieve a recovery point objective (RPO) of 60 seconds or less and a recovery time objective (RTO) of 1 hour.

Which of the following is the MOST cost-effective solution for this scenario?

**ตัวเลือก:**
- [x] Set up a pilot light strategy using AWS Elastic Disaster Recovery (AWS DRS) to replicate the changes of the on-premises application to AWS
- [ ] Back up SQL Server to AWS Storage Gateway for hybrid storage and fast disaster recovery. Enable fast snapshot restore in Amazon Elastic Block Store (Amazon EBS).
- [ ] Use Microsoft SQL Server Enterprise with Always On availability groups and set up a multi-site active/active setup between the corporate on-premises application and AWS
- [ ] On AWS, implement a warm standby using Amazon RDS for SQL Server database and configure AWS Database Migration Service (AWS DMS) with change data capture (CDC) to sync the data from the on-premises application.

---
### 🎯 โจทย์ต้องการอะไร?
ร้านขายของเล่นฝรั่งเศส มีคลังเซิร์ฟเวอร์ฐานข้อมูล `Microsoft SQL Server` ซุกอยู่ก้นตึกตัวเอง (on-premises) 
อาการวิตกจริต: "เจ้านายกลัวแผ่นดินไหวตึกถล่ม! เลยอยากจัดแผนลี้ภัยฉุกเฉินเหาะขึ้นฟ้าไปซบบน AWS (Disaster Recovery)!!"
ขีดจำกัดหน้าหมา: ต้องการข้อมูลหายเต็มที่ไม่เกินหมาเห่า 60 วินาที (RPO <= 60s) และร่างฟื้นคืนชีพปั่นไฟต่อได้ภายใน 1 ชั่วโมง (RTO = 1h)
คำสั่งเพชฌฆาต: "งัดคัมภีร์วิเศษบอกกูที ท่าไหน **ประหยัดตังค์ฉิบหายวายป่วงที่สุด (MOST cost-effective)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความตระหนี่ถี่เหนียวขั้นสุดยอด:
  - ท่ารอดตายสุดประหยัดที่ฉากหน้าตึกออฟฟิศ on-premise กับแดนสวรรค์ AWS: **"โหนสลิงใช้ช่างเชื่อมมืออาชีพ `AWS Elastic Disaster Recovery (DRS)` ฮุบวิชาแบบ Pilot light"**
  - วิชา `AWS DRS` แม่งโคลนข้อมูลระดับเสี้ยววิ (RPO จิ๋วๆ) แถมเวลามีเรื่องก็อัญเชิญปลุกเสกเครื่องบน AWS มาฟื้นไข้รันลั่นทุ่งไวว่องไม่เกินชั่วโมง (RTO ตรงปก)... และที่สำคัญสุด "ตอนปกติดีดไข่เล่น มันแดร์ค่าเช่าพื้นที่โคตรขี้หมูขี้หมา 5 บาท 10 บาท ไม่ต้องต้มน้ำปั่นเครื่องรอฟรีๆ ฮะ (Cost-effective สุดติ่ง)!" 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a pilot light strategy using AWS Elastic Disaster Recovery (AWS DRS) to replicate the changes of the on-premises application to AWS**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! พระรองขวัญใจคนจนตัวจริง! `AWS DRS` นั่งลอกการบ้านบล๊อกฮาร์ดดิสก์เงียบๆ ให้ RPO ในหลักวินาที (น้อยกว่า 60s สบายๆ)! แล้วมันปิดเครื่องเซิร์ฟหลักไว้รอ (Pilot light) ทำให้อัตราซดบิลโคตรถูก! พอระเบิดตูมตามกางเต็นท์เสร็จภายใน 1 ชั่วโมงทันใจฮะ 100% ชัวร์ตังค์อยู่ครบ! 

❌ **[ผิด] Use Microsoft SQL Server Enterprise with Always On availability groups and set up a multi-site active/active setup...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกอ้อนทำ `Active/Active Multi-site` คือวิชาพ่นไฟโหดสลัดรัสเซีย... แต่มึงต้องติดเครื่องเปิดแอร์ซดไฟทิ้งฟรีๆ บน AWS ตลอดเวลา 24 ชม. เสียค่าเช่าตั๋วโง่ๆ เดือนละสองแสนเนี่ยนะ!! สอบตกคะเนตหน้าหมาคำว่า **"เจ้านายสั่งเอาแบบประหยัดสุดๆ (MOST cost-effective)"** อย่างยับเยินพินาศฮะ! 

❌ **[ผิด] On AWS, implement a warm standby using Amazon RDS for SQL Server database and configure AWS Database Migration Service (AWS DMS)...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "วร๊ายยย! ท่านี้ `Warm Standby (ติดไฟแดงรอเหยียบคันเร่ง)` ก็ล่อแหลมผลาญตังค์เหมือนบรรทัดบนเป๊ะฮะ!" มึงบังคับเลี้ยงจตุคาม `Amazon RDS` บนฟ้าอ้าปากค้างไว้ตลอดชีพ เสียค่าตัวกินเปล่าอื้อซ่าฮะ! รอดตายไวก็จริง แต่บิลบัตรเครดิตทะลุกระจกตายสยองโหงฮะ โง่ดักดาน! 

❌ **[ผิด] Back up SQL Server to AWS Storage Gateway for hybrid storage and fast disaster recovery. Enable fast snapshot restore in Amazon Elastic Block Store (Amazon EBS).**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "โอ้โหวว!! โยนศพใส่ `Storage Gateway` ลงหลุมประหยัดกี่ชาติวะ!" หีบเซฟกระดองเต่าใบนี้มันเกิดมาอมซากแบ็คอัพเก็บไว้โว้ยย!! ถ้าตึกระอุไฟไหม้ มึงกว่าจะไปขูดภาพ Snapshot กว่าจะปั้นดินเครื่องแผ่วๆ ติดกระดูก `Fast Snapshot restore`... ปาไป 3 ชาติเกือบหมดวันฮะ RTO=1 hour ไม่มีทางทำขี้กระจ่างได้ทันแน่นอนฮะ เต่าล้านปีมาก!

---
---

## 📌 คำถามที่ 49
**โจทย์:**
A company is using an Amazon RDS for MySQL 5.6 with Multi-AZ deployment enabled and several web servers across two AWS Regions. The database is currently experiencing highly dynamic reads due to the growth of the company’s website. The Solutions Architect tried to test the read performance from the secondary AWS Region and noticed a notable slowdown on the SQL queries.

Which of the following options would provide a read replication latency of less than 1 second?

**ตัวเลือก:**
- [ ] Use Amazon ElastiCache to improve database performance.
- [ ] Create an Amazon RDS for MySQL read replica in the secondary AWS Region.
- [ ] Upgrade the MySQL database engine.
- [x] Migrate the existing database to Amazon Aurora and create a cross-region read replica.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายลากฐานข้อมูลบ้านๆ **`Amazon RDS for MySQL`** มาทำ Multi-AZ แถมเปิดย่านขายของลากยาว 2 ทวีป (Two AWS Regions)
วิกฤติหมาว้อ: "โห!! ชาวบ้านระดมคลิกหน้าเว็บมารุมกินโต๊ะ! กูอุตส่าห์เทสต์ระบบอ่านฐานข้อมูลเจาะข้ามทวีปมายังดินแดนรอง (Secondary Region) แม่ง **หนืดเหี้ยๆ เต่าคลานตาค้างอ่านไม่ขยับเลย (slowdown on SQL queries)!!**"
คำสั่งเพชฌฆาต: "กูรับความโง่นี้ไม่ได้... ไปหาวิชามารไหนก็ได้ที่ทะลึ่งช่วยสปีดกบฏการกระซวกอ่านข้อมูลข้ามทวีป **ให้วิ่งชิวหน่วงไม่เคืองเสี้ยววิ (read replication latency less than 1 second)!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงฐานข้อมูลข้ามโลก!
- คาถายมราชประสานวิญญาณ: สัตว์ประหลาดที่เกิดมาเพื่อเบ่งกล้ามข้ามพรมแดน "โหยหาความเร็วปรี๊ดดข้ามทวีป Delay เสี้ยววินาที (Latency < 1 sec)"
  - ยานแม่ **`Amazon Aurora`** เป็นมหาเทพบุตรสายข้ามจักรวาล! ถ้ามึงจัดท่ากางปีน **"Aurora Cross-Region Read Replica"** เมื่อไหร่ พลังอานุภาพความขลังของมันจะจูนหลอดหน่วงเวลาแค่นิดเดียวจิ๋วหลิว ต่ำกว่า 1 วินาทีสบายรูตูดเป๊ะ 100%! ใครแตะเป็นต้องสยบฮะ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Migrate the existing database to Amazon Aurora and create a cross-region read replica.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! วิถีซามูไรตัวจริง ถุยคัสตอม MySQL บ้านนอกนั่นทิ้งซะ แล้วย้ายสำมะโนครัวมาอิงแอบกอดเจ้านายศักดิ์สิทธิ์ `Amazon Aurora` แล้วเสกสมุนปั๊มเงาข้ามทวีปซะ ความงอแงดีเลย์อืดอาดจะปลาสนาการหายสาบสูญทะลุมิติทันทีฮะ! 

❌ **[ผิด] Create an Amazon RDS for MySQL read replica in the secondary AWS Region.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเจี๊ยบบ้านนอก `RDS MySQL` สั่งเบาะๆ งอก Read Replica ข้ามทวีป... หืมม! มันช่างทุเรศตายห่าฮะ "เพราะสายใยแก้วเชื่อมฐานบ้านนอก 2 ทวีปของ MySQL มันหน่วงลากยาวเป็นหลายๆ วินาทีโว้ยยย (asynchronous in seconds)!!" ไม่อาจเอื้อมกด Delay ตัดต่ำมิดตีนต่ำกว่า 1 วิในฝันได้แน่นอนฮะ กะลาครอบหัวล้านเปอร์เซ็นต์!

❌ **[ผิด] Use Amazon ElastiCache to improve database performance.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตู้เซฟตุ่นปากเป็ดหน้าย่น `ElastiCache` แม่งแก้ชงได้แค่ปมชาวบ้านแห่มาอ่านตารางหน้าเดิมซ้ำๆ รัวๆ โว้ย!!" แต่โจทย์บอกโต้งๆ ว่าลูกค้ารายการเปลี่ยนหน้าบ่อยกะฉาด (highly dynamic reads) แง้บแบบนี้ ElastiCache จับยืดดึงไม่อยู่ฮะ พังพินาศปราชัย! 

❌ **[ผิด] Upgrade the MySQL database engine.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยยยย! เลอะเทอะสัด!! มึงเปลี่ยนเสื้อผ้าอัพเกรดแพทช์ 5.6 เป็น 5.7 ทื่อๆ แม่มไม่ได้ทะลึ่งเสกยาสั่งข้ามทวีปให้วิ่งความเร็วคุม 1 วินาทีได้หรอกฮะ!" แม่งช่วยกระจึดนึง ไม่ได้แก้คอหอยตีบข้ามภูมิภาคเลยฮะ นั่งเกาหัวโง่แดกฮะ!

---
---

## 📌 คำถามที่ 50
**โจทย์:**
A Solutions Architect is implementing a new High-Performance Computing (HPC) system in AWS that involves orchestrating several Amazon Elastic Container Service (Amazon ECS) tasks with an Amazon EC2 launch type that is part of an ECS cluster. The ECS cluster is configured with an ECS Capacity Provider to dynamically manage and scale the EC2 instances based on ECS task demand, ensuring sufficient compute resources are always available for high-throughput workloads.

Users around the globe will frequently access the system, and it is expected that hundreds of ECS tasks will run most of the time. These tasks require high-frequency read and write operations to a shared storage system. The output data of each ECS task is around 10 MB, and although obsolete data is eventually archived and deleted, the total storage size will not exceed 10 TB.

Which of the following is the MOST suitable solution that the Architect should recommend?

**ตัวเลือก:**
- [x] Launch an Amazon Elastic File System (Amazon EFS) with Provisioned Throughput mode and set the performance mode to Max I/O. Configure the EFS file system as the container mount point in the ECS task definition of the ECS cluster.
- [ ] Set up an SMB file share by creating an Amazon FSx for Windows File Server. Set the file share as the container mount point in the ECS task definition of the ECS cluster.
- [ ] Launch an Amazon DynamoDB table with DynamoDB Accelerator (DAX) and DynamoDB Streams enabled. Configure the table to be accessible by all ECS cluster instances. Set the DynamoDB table as the container mount point in the ECS task definition of the ECS cluster.
- [ ] Launch an Amazon Elastic File System (Amazon EFS) file system with Bursting Throughput mode and set the performance mode to General Purpose. Configure the EFS file system as the container mount point in the ECS task definition of the ECS cluster.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่เล่นของแรง: เปิดสำนักร่างทรงมหาเทพคอมพิวเตอร์ HPC สั่งคุมกัปตันฮุคบัดซบ **`Amazon ECS tasks บนหลังม้า EC2`** เป็นร้อยๆ ชีวิต 
วิกฤติหมาว้อ: "โห!! ชาวบ้านรอบจักรวาลแม่งมามุงดูเพียบ! ไอ้กัปตันร้อยตัวแผลงฤทธิ์ป่วนกะทิ **กระซวกรุมสกรัมอ่านเขียนทะลักด่าวดิ้นใส่โกดังถังแตก (high-frequency read and write)!!**"
คำสั่งเพชฌฆาต: "กูควรหาตู้เซฟวิเศษตระกูลไหนที่แม่งแบกศพไหว โดนรุมสกรัมชงโกโก้พร้อมกันเป็นร้อยมือก็ไม่หน้ามืด แถมย้ำป้อนข้าวยัดตอกเส้นเลือดมิดด้ามทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงแชร์ไฟล์หลุมศพ!
- กฎอมตะแห่งการโดนรุมกระซวกแชร์ข้อมูลของตึกร้อยชั้น ECS:
  - ท่องไว้เลย: โบยบินเข้าถ้ำอสูรกายระดับ 100 มือรุมทึ้ง... สวรรค์ประทานถังขยะเทพกาวช้างชื่อว่า **`Amazon EFS`** มาให้กอดคอล้วงไข่เป็นของแชร์ส่วนกลางเวิร์คสุด!
  - เจาะลึกออปชั่นเสริม: ของมันต้องแรงสิวะฮะ! 
    - ทวีคูณทิ้งดิ่งทะลวงขีดจำกัดแสกนแหลก: ต้องตบเกียร์ **`Max I/O`** ไว้ยันศพลูกหาบร้อยชีวิตดิ้นพล่าน! (General purpose ไว้ให้ส้วมใช้)
    - แถมเสกพรเสียวสวาทรุงรังเสร็จสรรพ: อย่าใช้ Burst เลอะเทอะหน้าใสฮะ ต้องจิ้มกดเกียร์ **`Provisioned Throughput`** ค้ำเหยียบคันเร่งดิ่งหฤโหดไปเลยฮะ จบ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch an Amazon Elastic File System (Amazon EFS) with Provisioned Throughput mode and set the performance mode to Max I/O. Configure the EFS file system as the container mount point in the ECS task definition of the ECS cluster.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกโคตรพ่อโคตรแม่ฮะ! อัญเชิญถังขยะอมตะ `Amazon EFS` แถมคัดออปชั่นกะซวกพลังสายมารระดับสูงสุด อมมือผีร้อยตัวรุมทึ้งด้วยออปชั่น `Max I/O` + เหยียบคันเร่งพ่นท่อประปาลำซิ่งหุ้มทองคำ `Provisioned Throughput`!! รันหุ่นรบกระสุนพุ่งมิดปลอกทะลวงมิติสบายเบิร์ด 100% ชัวร์! 

❌ **[ผิด] Launch an Amazon Elastic File System (Amazon EFS) file system with Bursting Throughput mode and set the performance mode to General Purpose...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! ถ้ามึงจัดแจงเซ็ตแผ่วๆ `Bursting` หน้าสั่น... หรือจิ้มดักปัญญาชน `General Purpose`.. หึๆ! โดนกัปตันฮุคดงดิบร้อยชีวิตรุมสกรัมกระซวกเลือดพุ่งอ้วกแตกคาสนามรบแน่นอนฮะ มันทนแรงกระแทกแช่ยาวรัวๆ แบบ HPC ไม่ไหวฮะ ยับเยินตายห่า! 

❌ **[ผิด] Set up an SMB file share by creating an Amazon FSx for Windows File Server...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! กัปตัน ECS แม่งส่วนใหญ่มีเชือกฟางสันดานเป็นศาลปู่ Linux ล้วนๆ!" มึงจะแส่เจาะสะดือหน้าต่างกะเทย **`FSx for Windows`** ที่ใช้ท่อสกุลกล้วยไข่หำหด SMB มารองรับสายเถื่อนเป็นร้อยตัวให้เมื่อยตุ้มทำเตี่ยอะไรฮะ!? ปรสิตฝังรากตายซากไม่ได้กระดิกนิ้วประสิทธิภาพส้นตีนห่าอะไรเลยฮะ! 

❌ **[ผิด] Launch an Amazon DynamoDB table with DynamoDB Accelerator (DAX) and DynamoDB Streams enabled... Set the DynamoDB table as the container mount point...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยย!! พระอัลลอฮกะทุ้งดิน!! มึงเอาค้อนไปสอยมะม่วงหรอฮะ!?" **`DynamoDB` แม่งคือตุ่มโกดังหน้ากระดานโว้ยยย (Database) มันไม่ใช่โฟลเดอร์ไฟล์แชร์ให้มึงมาจุดธูปกดสูตรทุเรศเมาส์ติ่งกาว (`mount point`) ยัดตูดใส่แผงหลังคอนเทนเนอร์เว้ยยย!!** จับแพะชนไดโนเสาร์หน้าด้านๆ ฮาแตกขี้แตกขี้แตนฮะ โดนตบปากสั่นดิ้นกระแด่วๆ เลยฮะ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 6: ข้อ 51 - 60)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 51
**โจทย์:**
A cryptocurrency company wants to go global with its international money transfer app. Your project is to make sure that the database of the app is highly available in multiple regions.

What are the benefits of adding Multi-AZ deployments in Amazon RDS? (Select TWO.)

**ตัวเลือก:**
- [x] Increased database availability in the case of system upgrades like OS patching or DB Instance scaling.
- [x] Provides enhanced database durability in the event of a DB instance component failure or an Availability Zone outage.
- [ ] Creates a primary DB Instance and synchronously replicates the data to a standby instance in a different Availability Zone (AZ) in a different region.
- [ ] Significantly increases the database performance.
- [ ] Provides SQL optimization.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทคริปโตอยากโกอินเตอร์ เลยสั่งให้มึงไปทำฐานข้อมูลแอปพลิเคชั่นให้ถึกทนฆ่าไม่ตาย (highly available)
คำถามบ๊องแบ๊วท้าอนุบาล: "การเจียดตังค์เปิดฟีเจอร์ **`Multi-AZ (กระจายหลายโซน)`** ใน **`Amazon RDS`** แม่งให้ประโยชน์อะไรกับชีวิตมึงบ้างวะฮะ 2 ข้อเน้นๆ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง Multi-AZ!
- กฎอมตะแห่งการปั๊มลูกแฝดข้ามตึก (Multi-AZ):
  - เกิดมาเพื่อชูโรง 2 เรื่องสำคัญระดับพระกาฬ:
    1. **"ถึกทนแผ่นดินไหวตึกถล่ม (Durability / Availability Zone outage)"**: ถ้าตึกพัง แม่ข่ายดับ มันจะสลับไปลูกข่ายอีกตึกให้เอง สบายๆ!
    2. **"รอดตายตอนจอฟ้าอัพแพทช์เครื่อง (Availability in system upgrades/patching)"**: เวลาอัพเกรดสเปกหรือซ่อมวินโดวส์ มันจะอัพเครื่องลูกก่อน แล้วค่อยสลับไปอัพเครื่องแม่ ลูกค้าแทบไม่รู้สึกว่าล่มเลยฮะ!
  - ข้อควรระวังหมาตาย: แม่ง **"ไม่ได้ช่วยให้ฐานข้อมูลเร็วขึ้น (Not increase performance) และไม่ได้ช่วยจูน SQL โว้ยย!"** แถม Multi-AZ แม่งคือการโคลนข้ามตึกใน "ทวีปเดียวกัน (Same Region)" ไม่ใช่ข้ามทวีปฮะ ระวังดักควาย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Increased database availability in the case of system upgrades like OS patching or DB Instance scaling.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ประโยชน์แท้ทรูฮะ เวลามึงกดอัพสเปกหรือยัดแพทช์ มันจะไปทำที่เครื่องสแตนด์บายก่อน แล้วค่อยสลับขาหลอกให้เครื่องเน่าโดนทำทีหลัง ลดปัญหาเว็บล่มเวลาช่างเข้ามาซ่อมบ้านได้มหาศาลฮะ 100%! 

✅ **[ถูกต้อง] Provides enhanced database durability in the event of a DB instance component failure or an Availability Zone outage.**
- **ทำไมถึงถูก:** คอมโบลูกที่สองฮะ! ถ้าเกิดเวรกรรมตึกพัง แผ่นดินไหว ไฟดับ (AZ outage) เครื่องสำรองที่แอบซุกตัวอยู่ตึกข้างๆ ก็จะโผล่หัวมารับงานต่อทันทีดุจพระเอกขี่ม้าขาวฮะ! รอดตายปาฏิหาริย์! 

❌ **[ผิด] Creates a primary DB Instance and synchronously replicates the data to a standby instance in a different Availability Zone (AZ) in a different region.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! อ่านดีๆ แม่งเขียนหลอกว่า `different region (ข้ามทวีป)`!! เห้ย! สันดานดิบ Multi-AZ แม่งคือการโคลนข้ามตึกใน **"ทวีปเดียวกัน (Same Region)"** โว้ยยยย!! ข้ามทวีปแม่งของ Read Replica นู่นฮะ โดนหลอกเต็มแรง! 

❌ **[ผิด] Significantly increases the database performance.** และ **Provides SQL optimization.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! จับแพะชนไดโนเสาร์ฮะ!" ฟีเจอร์ Multi-AZ แม่งมั่วนิ่มฮะ ไม่ได้ทำให้สปีดการอ่านเขียนเร็วขึ้นปรุ๊ดปร๊าด หรือฉลาดขึ้นไปจูน SQL โว้ย! มันแค่ปั๊มลูกแฝดไว้นอนหลับรอเสียบแทนเวลาแม่มันตายเฉยๆ ฮะ เลอะเทอะสุดๆ! 

---
---

## 📌 คำถามที่ 52
**โจทย์:**
A Solutions Architect needs to launch a web application that will be served globally using Amazon CloudFront. The application is hosted in an Amazon EC2 instance which will be configured as the origin server to process and serve dynamic content to its customers.

Which of the following options provides high availability for the application?

**ตัวเลือก:**
- [x] Provision two EC2 instances deployed in different Availability Zones and configure them to be part of an origin group.
- [ ] Launch an Auto Scaling group of EC2 instances and configure it to be part of an origin group.
- [ ] Use Amazon S3 to serve the dynamic content of your web application and configure the S3 bucket to be part of an origin group.
- [ ] Use Lambda@Edge to improve the performance of your web application and ensure high availability. Set the Lambda@Edge functions to be part of an origin group.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายเช่าเครื่องคอม EC2 มาเป็นก้นครัว (Origin) ปรุงอาหารตามสั่ง (dynamic content) แจกจ่ายให้ชาวโลกผ่านตู้สปีดความเร็วแสง **`Amazon CloudFront`** 
คำสั่งเพชฌฆาต: "มึงไปเสกมนต์ใส่ตู้ CloudFront ยังไงก็ได้ ให้เครื่องครัวกูถึกทนหน้าหนาตกน้ำไม่ไหลตกไฟไม่ไหม้ **(High Availability)** ทีซิ! สมมติไฟดับไปเครื่องนึง เว็บกูก็ต้องไม่ล่ม!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความรอดตายหลังโล่ CloudFront: 
  - จู่ๆ ถ้าเครื่องเซิร์ฟเวอร์โดนถล่มตายห่า CloudFront มันไม่ได้ร่ายมนต์ชุบชีวิตให้เองนะฮะ!!
  - มึงต้องตั้งค่าสิ่งที่เรียกว่า **`"Origin Failover"`** โดยอัญเชิญพระเครื่องตั้งวงที่ชื่อว่า **`"Origin Group"`**
  - กฎการทำงาน: มึงต้องมีเครื่องเซิร์ฟเวอร์อย่างน้อย 2 ตัวตั้งอยู่คนละตึก (different Availability Zones) แล้วจับมันมัดรวมกันใส่ใน Origin Group... พอเบอร์หนึ่งหัวกุด CloudFront จะสลับวาร์ปโยนขี้ไปให้เบอร์สองหลังบ้านเองอัตโนมัติฮะ รอดตายสวยๆ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Provision two EC2 instances deployed in different Availability Zones and configure them to be part of an origin group.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! วิถีเทพแห่งการรอดซุ้มมือปืน! กางร่มเครื่อง EC2 สองตัวไขว้ตึกกัน แล้วตะครุบหัวมันมัดรวมเป็น `Origin Group` เดียวกัน หลังบ้าน CloudFront! เวลาเครื่องแรกตาย สัญญาณก็เตะปลิวไปเครื่องสองชิวๆ เนียนกริบฮะ! 

❌ **[ผิด] Launch an Auto Scaling group of EC2 instances and configure it to be part of an origin group.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "มึงจะเอาแก๊งค์หัวไม้ `Auto Scaling group` หน้าด้านๆ ทื่อๆ มายัดลงในฐานะลูกบ้านของ Origin Group ตรงๆ ใน CloudFront ไม่ได้โว้ยยย!!" CloudFront มันรับชื่อหลังบ้านเป็นรายตัว (หรือ ELB) แต่ไม่รับ Auto scaling group ทื่อๆ ฮะ เลอะเทอะมาก! 

❌ **[ผิด] Use Amazon S3 to serve the dynamic content of your web application and configure the S3 bucket to be part of an origin group.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "ตีลังกาตกส้วมตาย!!" โจทย์แหกปากบอกอยู่แม็บๆ ว่าจะรัน **"ของสดของต้มยำทำแกง (Dynamic content)"** แม่งจะลากลังโฟมแช่ศพ **`Amazon S3`** มารันได้ยังไงวะฮะ! S3 แม่งมีปัญญาแจกเฉพาะรูปโง่ๆ นิ่งๆ วิดีโอนิ่งๆ (Static) โว้ยยย ไม่เข้าใจโลกอย่างร้ายแรงฮะ! 

❌ **[ผิด] Use Lambda@Edge to improve the performance of your web application and ensure high availability. Set the Lambda@Edge functions to be part of an origin group.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "โอ้โหวว! จับแพะชนไดโนเสาร์ฮะ!" มึงจะเอายันต์กันผี `Lambda@Edge` มาสวมรอยแอ้มเป็นก้นครัว (Origin Group) ไม่ได้โว้ยย!! มันเกิดมาเพื่อสับสลับแต่งตัวดัดแปลงข้อมูลระหว่างทางเฉยๆ ไม่ได้มีไว้เสกมารองรับลูกปืนเวลาแอปพลิเคชั่นล่มฮะ! ผิดวัตถุประสงค์รุนแรง!

---
---

## 📌 คำถามที่ 53
**โจทย์:**
A computer animation film studio runs a web application on an Amazon EC2 instance. It uploads 5 GB video objects to an Amazon S3 bucket. Video uploads take longer than expected, impacting the application's performance.

Which method will help improve the performance of the application?

**ตัวเลือก:**
- [x] Use S3 Multipart Upload API.
- [ ] Leverage on Amazon CloudFront and use HTTP POST method to reduce latency.
- [ ] Use Amazon Elastic Block Store (Amazon EBS) Provisioned IOPS volumes in a Logical Volume Management (LVM) stripe configuration on an EBS-optimized instance to maximize throughput.
- [ ] Enable Enhanced Networking with the Elastic Network Adapter (ENA) on your EC2 Instances.

---
### 🎯 โจทย์ต้องการอะไร?
สตูดิโอหนังทำเว็บให้พนักงานอัพโหลดซากวิดีโอไฟล์ช้างแมมมอธยักษ์ (5 GB) โยนทิ้งลงลังบรรจุ **Amazon S3**
วิกฤติหมาว้อ: "โห!! นั่งดูหลอดอัพโหลดกระดึ๊บๆ นานชิบหายวายป่วง! เครื่องค้าง แอปกระตุกเป็นเจ้าเข้า (uploads take longer than expected)!!"
คำถามบ๊องแบ๊วท้าอนุบาล: "กูจะทุบแก้ปัญหานี้ให้มันไหลลื่นปรื๊ดๆ ไดสันได้ไงวะฮะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง S3 ขนของหนัก!
- กฎอมตะแห่งการโยนหินลงถังขยะ S3:
  - ท่องไว้ให้ซึมลึกในซีรีบรัม: ถ้าเจอไฟล์ช้างไซส์ยักษ์ ทะลุร้อยกิโลกรัม (มากกว่า 100 MB ไปจนถึงหลัก GB) หางานโยนขึ้น S3...
  - **ห้ามโยนไปดุ้นๆ ทื่อๆ!!** ให้มึงจับไฟล์นั้นมา "สับหมูสับละเอียดให้เป็นก้อนเล็กๆ แล้วระดมทีมมดงานขนขึ้นไปปาสายฟ้าฟาดพร้อมๆ กันหลายทิศทาง (Parallel)"... สิ่งมหัศจรรย์นี้เรียกว่า **`"S3 Multipart Upload API"`**
  - วิชาลูกไม้นี้จะช่วยกระชากสปีดให้หายอืดเป็นปลิดทิ้ง แถมเน็ตกระตุกหลุดก็ไม่ต้องเริ่มนับหนึ่งใหม่ฮะ โคตรโหดโฉด 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use S3 Multipart Upload API.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ยาพาราแก้อาการขนช้างขึ้นหนีน้ำโดยเฉพาะฮะ! ฉีกร่างวิดีโอ 5GB เป็นชิ่นเล็กชิ้นน้อยแล้วอัพแบบปูพรมรัวๆ (Parallel) แม่งโคตรจะสปีดปรู๊ดปร๊าดเลยฮะ! ปลดล็อคความหน่วงได้สนิทใจ 

❌ **[ผิด] Leverage on Amazon CloudFront and use HTTP POST method to reduce latency.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! ตู้กระจายรูปโง่ๆ `CloudFront` แม่งเกิดมาเพื่อ "ดูดของจาก S3 ไปเซิร์ฟชาวบ้านไวๆ" โว้ย! ไม่ได้มีพละกำลังช่วยเร่งสปีดขาอัพโหลดไฟล์หนักๆ เข้า S3 ให้อภินิหารแต่อย่างใดเลยฮะ หยิบอาวุธผิดประเภท! 

❌ **[ผิด] Use Amazon Elastic Block Store (Amazon EBS) Provisioned IOPS volumes...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงจะทุ่มทุนสร้างต่อจิ๊กซอฮูดฮาร์ดดิสก์ `EBS Provisioned IOPS` ซุปเปอร์ชาร์จมาแปะก้น EC2 หาสวรรค์วิมานอะไรฮะ!? ปัญหามันอยู่ที่คอขวด "เน็ตปาขึ้นฟ้า (S3 upload)" โว้ย ไม่ได้อยู่ที่ความกากของฮาร์ดดิสก์ก้นครัวเล๊ยยยฮะ บ้าบอ! 

❌ **[ผิด] Enable Enhanced Networking with the Elastic Network Adapter (ENA) on your EC2 Instances.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "สายแลนเทพพ่องง!" ถึงมึงจะจับสายแลนไฟเบอร์ออพติกยัดกะโหลก EC2 มันก็กระจึ๋งนึงฮะ เพราะสัจธรรมของการโยนหนอนชาเขียวเป็นท่อนเดียวใหญ่ๆ 5GB ดุ้นๆ เข้า S3 แม่งง่อยตายชักอยู่ดี มึงต้องสับหมูก่อน (Multipart)! เกาไม่ถูกที่คันอย่างแรง!

---
---

## 📌 คำถามที่ 54
**โจทย์:**
An online shopping platform has been deployed to AWS using Elastic Beanstalk. They simply uploaded their Node.js application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring. Since the entire deployment process is automated, the DevOps team is not sure where to get the application log files of their shopping platform. 

In Elastic Beanstalk, where does it store the application files and server log files?

**ตัวเลือก:**
- [x] Application files are stored in S3. The server log files can also optionally be stored in S3 or in CloudWatch Logs.
- [ ] Application files are stored in S3. The server log files can only be stored in the attached EBS volumes of the EC2 instances, which were launched by AWS Elastic Beanstalk.
- [ ] Application files are stored in S3. The server log files can be stored directly in Glacier or in CloudWatch Logs.
- [ ] Application files are stored in S3. The server log files can be optionally stored in CloudTrail or in CloudWatch Logs.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายอัพโค้ดแอป Node.js หมูๆ ขึ้นค่ายหุ่นยนต์ **`Elastic Beanstalk`** แล้วนอนกระดิกตีนรอให้มันปรุงสุกยันเครื่องขึ้นบก (Automated process)
อาการกระอ่วนใจ: "เห้ยย! แล้วโค้ดแอปกรูกับขี้เหยื่อประวัติล็อกการใช้งาน **(application files and server log files) หุ่นยนต์แม่งเอาไปซุกหีบซ่อนไว้หลุมศพไหนวะ!?**"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงงัดพิกัดลายแทงที่ซ่อนของไอ้ค่ายเวทย์มนต์ Elastic Beanstalk มาแฉทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งลายแทงสมบัติ Elastic Beanstalk:
  - ท่องจำให้ขึ้นใจเลยว่า: กะอีแค่ "ซอร์สโค้ดแอป (Application files)" ถังขยะใบเดียวในศตวรรษนี้ที่ปาลงได้ก็คือ **`Amazon S3`** เท่านั้น! (ซึ่งทุกออปชั่นแม่งก็ให้ S3 หมด มึงหนีไม่พ้น)
  - ไอ้ที่ต้องฟาดฟันก็คือ **"ล็อกไฟล์เซิร์ฟเวอร์ (Server log files)"** แม่งจะทิ้งไปไหน?
    - ท่ามาตรฐานที่หุ่นยนต์ทำได้: แม่งเตะพ่นลงหลุม **`Amazon S3`** ให้เก็บริ้วรอยประวัติยาวๆ หรือเตะขึ้นป้ายไฟนินจา **`CloudWatch Logs`** ไปดูสดๆ หน้าจอ! แค่นี้เองฮะ 2 ทางเลือกอมตะนิรันดร์กาล 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Application files are stored in S3. The server log files can also optionally be stored in S3 or in CloudWatch Logs.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกโคตรพ่อโคตรแม่ฮะ! ซอร์สโค้ดโยนลงลัง S3 ถูกต้องล้านเปอร์เซ็นต์ ส่วนประวัติ Log ก็เตะอัดอัดลง S3 หรือเปิดไฟไซเรนวิ่งปิงไปหน้าจอมัลติวิชั่น `CloudWatch Logs` ได้อย่างฟินนาเล่ฮะ! นี่คือสัจธรรมของ Beanstalk ชัวร์ๆ! 

❌ **[ผิด] Application files are stored in S3. The server log files can only be stored in the attached EBS volumes of the EC2 instances...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! เลวทรามต่ำช้า! บังคับว่าซากล็อกไฟล์ตกค้างแปะติดฮาร์ดดิสก์ `EBS` ได้ที่เดียว (can only be)" มึงจะบ้าหรอ! ถ้าเจ้านายกูสับสวิตช์ Auto-scale ปลิวหายไปทั้งเครื่อง EBS ก็ฉิบหายระเบิดตามไปด้วยสิฮะ บรรลัยจักรวาล! นั่งเทียนเขียนชัดๆ! 

❌ **[ผิด] Application files are stored in S3. The server log files can be stored directly in Glacier or in CloudWatch Logs.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงจะเสร่อจงใจโยนประวัติเครื่องสดๆ พ่นกลบดินเข้าตู้แช่แข็งป่าช้า **`Glacier` ทื่อๆ (directly)** บ้าบองี่เง่าฮะขี้ไหล! โลกของ Elastic Beanstalk แม่งต่อท่อขว้างลง S3 ได้เท่านั้นฮะ ถ้าอยากดองเค็มร้อยวันพันปีมึงต้องเอา S3 ไปแปลงร่างต่อเอาเอง เลิกตอแหล! 

❌ **[ผิด] Application files are stored in S3. The server log files can be optionally stored in CloudTrail or in CloudWatch Logs.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "จับแพะชนไดโนเสาร์ฮะ!" อัญเชิญยมบาล `CloudTrail` มารับประวัติเครื่องคอมเพื่อ!!? CloudTrail มันเอาไว้จับผิด "มนุษย์ที่มากົດปุ่มแมนนวลเล่นแร่แปรธาตุบน AWS" โว้ยย ไม่ใช่ถังรับขี้ล็อกประวัติแอปพลิเคชันพัง! มั่วซั่วตายชวนสลดฮะ!

---
---

## 📌 คำถามที่ 55
**โจทย์:**
A company deployed a web application to an EC2 instance that adds a variety of photo effects to a picture uploaded by the users. The application will put the generated photos to an S3 bucket by sending PUT requests to the S3 API.

What is the best option for this scenario considering that you need to have API credentials to be able to send a request to the S3 API?

**ตัวเลือก:**
- [x] Create a role in IAM. Afterwards, assign this role to a new EC2 instance.
- [ ] Store your API credentials in Amazon Glacier.
- [ ] Store the API credentials in the root web application directory of the EC2 instance.
- [ ] Encrypt the API credentials and store in any directory of the EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกน้องเสกเครื่อง EC2 มารันแอปตัดต่อรูปเถื่อนๆ แล้วโยนไฟล์รูปขยะขึ้นขี่เสลี่ยง **Amazon S3 (ผ่าน S3 API)**
ปมหน้าหมา: "เห้ย! เวลาจะเคาะประตูขอเข้าถ้ำ S3 แม่งต้องห้อยบัตรพนักงานคิวอาร์โค้ด (API credentials / Access Keys) โชว์ด้วยว่ะ!"
คำสั่งเพชฌฆาต: "งัดคัมภีร์มาแก้เผ็ดทีซิ ท่าจอดรถไม้ไหน **เทพสุดและปลอดภัยสุดในการแจกบัตรผ่านให้ EC2 มันเสือกมีปัญญาคุยกับ S3 ได้!?**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงความมั่นคง AWS!
- กฎอมตะแห่งการคุยข้ามเซอร์วิสหลังบ้าน: 
  - **"ห้าม! ห้าม!! ห้ามมึงอุตริจดพาสเวิร์ด/API Key โยนฝังแปะไว้บนหน้าผากเครื่อง EC2 หรือยัดใส่โค้ดเด็ดขาดโว้ยยย!!!"** ลบแม่งทิ้งให้เหี้ยนเด๋วนี้!!
  - ท่ามาตรฐานเพชรยอดมงกุฎที่ถูกต้องระดับจักรวาลคือ: **ให้ปั้นยันต์กันผี "IAM Role" แล้วเอาเชือกฟางจับยันต์ IAM Role อาบน้ำเต้าหู้สวมชุดผูกติดทับร่าง EC2 ทันที (assign role to EC2 instance)!!** แค่นี้ EC2 ก็จะล้วงตู้เย็น S3 ได้ฟรีๆ ปลอดภัยไร้รอยต่อ ร้อยล้านเปอร์เซ็นต์ชัวร์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a role in IAM. Afterwards, assign this role to a new EC2 instance.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! โคตรพ่อโคตรแม่ถูกต้องทะลุมิติฮะ! สวมเสื้อเกราะเทพ `IAM Role` ลงกลางกระหม่อมลูกเจี๊ยบ EC2 ปุ๊บ จบปัญหา! ปลอดภัยไร้กังวลไม่มีคราบคีย์หลุดหล่นตามหน้าปัดให้แฮกเกอร์ฉกไปสูบชาไข่มุกชัวร์ๆ ฮะ เป๊ะ! 

❌ **[ผิด] Store the API credentials in the root web application directory of the EC2 instance.** และ **Encrypt the API credentials and store in any directory of the EC2 instance.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "มึงจะบ้าหรอ! ซุกโพยรหัสพาสเวิร์ดทิ้งไว้ตามซอกเสาหน้าออฟฟิศ EC2 เลยเนี่ยนะ!!?" ถึงมึงจะบอกว่าเข้ารหัสบ้าบอคอแตกมันก็อันตรายโคตรฉิบหายวายป่วงฮะ ล้านเปอร์เซ็นต์ว่าเจาะปุ๊บขนขวดปล้นบ้านตายโหงหมดแน่นอนฮะ เลวทรามเกินรับไหว! 

❌ **[ผิด] Store your API credentials in Amazon Glacier.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" หนีเสือปะตัวนิ่มขนานแท้ฮะ! มึงโดนสั่งให้หาทางหยิบพาสเวิร์ดไปใช้แบบปลอดภัย แต่เสืือกหน้าด้านโยนพาสเวิร์ดลงหลุมฝังศพห้องแช่แข็ง `Glacier` แดกแอร์เล่น!! มึงกะว่าจะให้แฮกเกอร์ขุดเจาะหลุมศพมาไขตู้เอาไปกินหรอฮะ!? นั่งดมกาวหน้าหมาฮะ โดนตบปากแตก!

---
---

## 📌 คำถามที่ 56
**โจทย์:**
A company is using Amazon S3 to store frequently accessed data. The S3 bucket is shared with external users that will upload files regularly. A Solutions Architect needs to implement a solution that will grant the bucket owner full access to all uploaded objects in the S3 bucket.

What action should be done to achieve this task?

**ตัวเลือก:**
- [x] Create a bucket policy that will require the users to set the object's ACL to bucket-owner-full-control.
- [ ] Create a CORS configuration in the S3 bucket.
- [ ] Enable server access logging and set up an IAM policy that will require the users to set the object's ACL to bucket-owner-full-control.
- [ ] Enable the Requester Pays feature in the Amazon S3 bucket.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายเจ้าของถังขยะ **Amazon S3** ใจบุญ เอากะละมังตั้งหน้าบ้านให้ **คนนอก (external users)** แวะปัสสาวะอัพโหลดไฟล์ทิ้งเอาไว้ประจำ
วิกฤติหมาว้อ: "เห้ย! ไฟล์ที่ไอ้คนนอกเอามาทิ้ง... **สิทธิ์การเป็นเจ้าของไฟล์ (ownership) เสือกตกเป็นของไอ้คนโพสต์นะโว้ย เจ้านายเจ้าของถังแม่งเสือกไปเตะไปทุบไฟล์นั้นไม่ได้เฉย หน้าด้านๆ!!**"
คำสั่งเพชฌฆาต: "งัดขวานมาทุบเผด็จศึกทีซิ! ทำยังไงบังคับให้เจ้านายกูซึ่งเป็น **'เจ้าของถัง (bucket owner)' ได้ผูกขาดสิทธิ์เข้าถึงเบ็ดเสร็จ (full access) กับทุกขยะที่โยนลงมา!?**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความรุนแรงอำนาจเจ้าของถังขยะ: 
  - สัจธรรม S3: "ใครเป็นคนอัพโหลด คนนั้นคือพระเจ้าของไฟล์นั้น" 
  - แต่ถ้าอยากตบหน้าพระเจ้า ทุบกบาลยึดสัมปทานมาให้รปภ.เจ้าของถัง... มึงต้องกางยันต์กฎอัยการศึกหน้าหมู่บ้านที่เรียกว่า **`"Bucket Policy"`**
  - สังคายนาประโยคคำสั่งใน Bucket policy ว่า: "ก่อนมึงจะปาไฟล์ทิ้ง มึงต้องก้มกราบแนบพาสปอร์ต **`ACL=bucket-owner-full-control`** คืนอำนาจเด็ดขาดให้กูก่อน! ไม่งั้นถีบกระเด็นห้ามอัพ!!" ท่านี้ปิดจ๊อบสวยสด 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a bucket policy that will require the users to set the object's ACL to bucket-owner-full-control.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! วิถีซามูไรตัวจริงก้มกราบกุมอำนาจ! ร่ายมนต์ `Bucket Policy` ดักตบหน้าคนนอกทุกคน บังคับขูดรีดลายเซ็นยกร่มโพธิ์ร่มไทรให้รปภ.หน้าตึกครอบครองไฟล์เบ็ดเสร็จ (`bucket-owner-full-control`) แจ่มแมวรอดตายชัวร์ฮะ ปรบมือ! 

❌ **[ผิด] Enable server access logging and set up an IAM policy that will require the users to set the object's ACL to bucket-owner-full-control.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! โอ้โหวว! ติ่งท้ายสวยหรู... แต่บรรทัดแรกเริ่มกาวแตกฮะ! "ไปตั้งศาลพระภูมิสร้างกฎที่ `IAM policy` เพื่อไปกางร่มคลุมคนนอก!?" มึงบ้าหรอฮะ คนนอกจากต่างดาวมึงจะไปเดินสายใส่ปลอกคอ IAM จับผูกทีละคนยังไงไหว!! กฎเหมารวมหมาบ้าที่ถูกต้องมันต้องตั้งด่านจับตบแก๊งค์ไอโอหน้าบ้านตรงๆ ที่ `Bucket Policy` โว้ยยย เลือดยศผิดตำแหน่งฮะ! 

❌ **[ผิด] Create a CORS configuration in the S3 bucket.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงจะเอายาสวนก้น `CORS (Cross-Origin Resource Sharing)` มาแก้เคล็ดเรื่องสิทธิ์เจ้าของเพื่อ!!? CORS มันแค่ช่วยแหกขี้ตาหลอกเบราว์เซอร์ให้กลืนกินสคริปต์หน้าเว็บข้ามโดเมนได้โว้ยย!! ไม่ได้หน้าด้านพลิกคว่ำสับสวิตช์ยกดุลยภาพเจ้าของไฟล์เปลี่ยนมือเลยฮะ บ้าบอ! 

❌ **[ผิด] Enable the Requester Pays feature in the Amazon S3 bucket.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "จับแพะชนไดโนเสาร์ฮะ!" อัญเชิญป้ายทวงหนี้ `Requester Pays` มาแปะหน้าโถส้วม... มันก็แค่บอกว่า "ใครหน้าไหนจะเข้ามาสูบไฟล์โหลดออกไป มึงจ่ายค่าโง่ค่าเน็ตเองนะกูไม่เกี่ยว!" แม่งคนละมิติกับประเด็นยื้อแย่งกรรมสิทธิ์ความขี้เหนียว (full access) เป็นเจ้าของไฟล์หน้าตาเฉยฮะ พินาศ!

---
---

## 📌 คำถามที่ 57
**โจทย์:**
An online stock trading system is hosted in AWS and uses an Auto Scaling group of EC2 instances, an RDS database, and an Amazon ElastiCache for Redis. You need to improve the data security of your in-memory data store by requiring the user to enter a password before they are granted permission to execute Redis commands.   

Which of the following should you do to meet the above requirement?

**ตัวเลือก:**
- [x] Authenticate the users using Redis AUTH by creating a new Redis Cluster with both the --transit-encryption-enabled and --auth-token parameters enabled.
- [ ] Create a new Redis replication group and set the AtRestEncryptionEnabled parameter to true.
- [ ] Enable the in-transit encryption for Redis replication groups.
- [ ] Do nothing. This feature is already enabled by default.
- [ ] None of the above.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายเปิดบ่อนค้าหุ้น เฝ้าเซิร์ฟเวอร์ด้วยป้อมยามอัฉริยะ **`Amazon ElastiCache for Redis`** (ตุ่นหน้าย่นในหลุมความจำเสื่อม)
วิกฤติหมาว้อ: "โห!! ปล่อยเปลือยทะลึ่งตาโล่งจ้งมานาน อยากอัพยันต์กันผี **กูอยากให้ใครหน้าไหนจะเคาะประตูพิมพ์คำสั่ง Redis แดกข้อมูลกู... ต้องบังคับลั่นรหัสผ่าน (enter a password) ใส่หน้าทิ่มหน้ากูก่อน!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "จงงัดพิกัดลายแทงที่ซ่อนของไอ้ค่ายเวทย์มนต์ Redis มาแฉทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งแม่กุญแจตุ่นหน้าย่น (Redis Auth Security):
  - โคตรง่ายฮะ! ถ้าอยากให้มันบังคับกราบรหัสผ่านตั๋วผี... ฟีเจอร์นิทานเวตาลนี้เขาเรียกว่า **`"Redis AUTH (คาถาดมรหัส)"`**
  - สเต็ปการเสกร่ายคาถา: มึงต้องทุบทำลายล้างสร้างรัง Redis ใหม่ลูกเดียว (create new Redis cluster) พร้อมกับสอดไส้ยันต์ 2 แผ่นตีคู่กันมาคือติดปีก **`ตั้งพาสเวิร์ด (--auth-token)`** และข้อบังคับพ่วงที่ขาดไม่ได้คือ **`บังคับเข้ารหัสกลางอากาศ (--transit-encryption-enabled)`** ขาดสองข้อนี้คือลูกเจี๊ยบตายห่าฮะ 100% ชัวร์ตังค์อยู่ครบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Authenticate the users using Redis AUTH by creating a new Redis Cluster with both the --transit-encryption-enabled and --auth-token parameters enabled.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกโคตรพ่อโคตรแม่ฮะ! ฟาดหมัดน็อครอบด้วยวิชา `Redis AUTH` งอกตุ่มใหม่แล้วเหยียบเบรคบังคับใส่กรอกรหัส (`--auth-token`) ประกบติดกับแพ็คเกจเข้ารหัสกลางฝูง (`--transit-encryption-enabled`) มัดรวมกันนี่คือสุดยอดคัมภีร์ยันต์กันผีของ Redis ตัวจริงฮะ! 

❌ **[ผิด] Enable the in-transit encryption for Redis replication groups.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "มึงกางเต็นท์ปิดไฟหน้ารถ `in-transit encryption` อย่างเดียว..." แล้วติ่งนรกที่เจ้านายสั่งนักสั่งหนาว่า "กูอยากทุบให้ใส่รหัสผ่านโว้ยยย (enter a password)" มึงก็ลืมไปหน้ามืดซะงั้น โดนตบปากสั่นฮะ แค่ครึ่งใบสอบตกเต็มๆ! 

❌ **[ผิด] Create a new Redis replication group and set the AtRestEncryptionEnabled parameter to true.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงจะเสร่อจงใจโยนพาสเวิร์ดมาแต่เสือกงัดไม้ตะพดท่อนผิด!! `AtRestEncryption` แม่งคือการจับบีบข้อมูลอัดเม็ดเซฟลงฮาร์ดดิสก์ให้ปลอดภัยเฉยๆ โว้ยยย!! ไม่ได้มีปัญญาโผล่หน้าต่างป๊อปอัพมาด่าไล่ให้มนุษย์กรอกรหัสผ่านก่อนใช้งาน (`Redis AUTH`) ແต่อย่างใดฮะ ชนผิดหน้าต่างอย่างรุนแรงพินาศ! 

❌ **[ผิด] Do nothing. This feature is already enabled by default.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "นอนเกาพุงฟรีสไตล์พ่องงง!!" กูจะบ้าตาย! ค่าดั้งเดิมโรงงาน (by default) แม่มถอดกางเกงในเปลือยเดินหน้าสลอน เปิดอ้าซ่าให้สุนัขจรจัดมาคว้าข้อมูลไปฟรีๆ ไม่มีล็อครหงรหัสเหี้ยอะไรโว้ยยย นอนตดตายฮะตอบข้อนี้!

---
---

## 📌 คำถามที่ 58
**โจทย์:**
An application is hosted in an Auto Scaling group of EC2 instances and a Microsoft SQL Server on Amazon RDS. There is a requirement that all in-flight data between your web servers and RDS should be secured.

Which of the following options is the MOST suitable solution that you should implement? (Select TWO.)

**ตัวเลือก:**
- [x] Force all connections to your DB instance to use SSL by setting the rds.force_ssl parameter to true. Once done, reboot your DB instance.
- [x] Download the Amazon RDS Root CA certificate. Import the certificate to your servers and configure your application to use SSL to encrypt the connection to RDS.
- [ ] Enable the IAM DB authentication in RDS using the AWS Management Console.
- [ ] Specify the TDE option in an RDS option group that is associated with that DB instance to enable transparent data encryption (TDE).
- [ ] Configure the security groups of your EC2 instances and RDS to only allow traffic to and from port 443.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายนั่งยองๆ ซุ่มต้มยำทำแกงบนจาน `Microsoft SQL Server` ลงเตา **Amazon RDS** 
วิกฤติหมาว้อ: "เห้ย! กูกลัวแฮกเกอร์ดักฟังข้อมูลวิ่งไปวิ่งมาระหว่างทาง (in-flight data)!!"
คำสั่งเพชฌฆาต: "กูจะตบสวิตช์ท่าไหนเพื่อบังคับให้ทุกอนูข้อมูลที่วิ่งจากเว็บมาฐานข้อมูล **เต้นระบำซ่อนรหัสปลิดระวางปลอดภัยเบ็ดเสร็จ (secured in-flight)!! (เลือกมา 2 ท่าเน้นๆ)**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงดักฟังมิจฉาชีพ!
- กฎแห่งความรอดตายในการคุยกันแบบซ่อนแอบกลางอากาศ: 
  - สัจธรรมการเข้ารหัส In-flight data มีเวทมนต์ชื่อลือเลื่องคือ **`"SSL"`**! ถ้าจะเหยียบมิดด้ามบังคับใช้งาน SSL ให้ได้ 100% ต้องประสานรอยร้าวสองฝั่งให้ตรงกัน:
    1. **ฝั่งฐานข้อมูล (RDS):** ถอดสลักปืนบังคับหินเจียร... ตั้งค่า parameter **`"rds.force_ssl = true"`** (บังคับไอ้หน้าโง่ที่จะมาคุยกลั้วด้วยต้องอมลูกอม SSL มาคลุกเคล้าก่อน!) และต้องรีบูตสเต๊กถึงจะติดกาว!
    2. **ฝั่งต้นทางตอแหล (EC2 App):** มึงจะด่าฝ่ายเดียวไม่ได้... แอปมึงก็ต้องอัญเชิญป้ายวิญญาณ **`"RDS Root CA certificate"`** ใส่กระเป๋าตังค์มาอมไว้ แล้วกราบใช้งาน SSL ก่อนเดินสายคุยไปหาด้วยนะจ๊ะ ถือว่าคุยกันรู้เรื่อง 100% ชัวร์ฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Force all connections to your DB instance to use SSL by setting the rds.force_ssl parameter to true. Once done, reboot your DB instance.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! จิ๊กซอว์ตัวที่ 1... ท่าบังคับขู่เข็ญดักหน้าด่านฝั่งเซอร์เวอร์ฮะ! "มึงจะเข้ากราบตีนกู มึงต้องห่อคอ SSL มานะเว้ยไอ้สัตว์!" ปลุกกระแสด้วย Parameter `rds.force_ssl=true` รอดพ้นมิจฉาชีพ 100%! 

✅ **[ถูกต้อง] Download the Amazon RDS Root CA certificate. Import the certificate to your servers and configure your application to use SSL to encrypt the connection to RDS.**
- **ทำไมถึงถูก:** คอมโบลูกที่สองฮะ! จิ๊กซอว์ตัวที่ 2 จัดฉากฝั่งหน้าบ้านโว้ยย! ให้แอปมึงดูดคัมภีร์ยันต์กันผี `Root CA Certificate` พกกระเตงไปตั้งค่ายกลเข้าโหมดต่อสาย SSL... คราวนี้ต่างฝ่ายต่างสอดประสานระบำเริงร่ากลางอากาศโดยไร้รอยต่อแฮกเกอร์สูบเลือดสูบเนื้อแน่นอนฮะ บราโว่! 

❌ **[ผิด] Specify the TDE option in an RDS option group that is associated with that DB instance to enable transparent data encryption (TDE).**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! ยันต์เทพ `TDE (Transparent Data Encryption)` แม่งคือท่าดองก้อนเนื้อฝังลงดินเข้ารหัสเซฟตายตอนก้อนหลับลึก (Data At-Rest) โว้ยยย!!" เจ้านายสั่งให้ล็อคตายตอน "หมาวิ่งกลางอากาศ (In-flight)" มึงหยิบยาผิดขวดแดกก็ตายห่าสิฮะ บ้าบอ! 

❌ **[ผิด] Enable the IAM DB authentication in RDS using the AWS Management Console.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" สกิลแจกตั๋วผี `IAM DB authentication` มันโคตรเทพก็จริง... แต่มันเสือก **เสกมนต์คุยรู้เรื่องแค่เฉพาะค่าย MySQL กับ PostgreSQL เว้ยย!!** โจทย์ดันกระสันแร่ตะบันฐานเต่า `Microsoft SQL Server`!! IAM หันหลังให้งอนง้อแดกข้าวลิงตายชักฮะ จับแพะชนไดโนเสาร์หน้าด้านๆ! 

❌ **[ผิด] Configure the security groups of your EC2 instances and RDS to only allow traffic to and from port 443.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "โถ่ไอ้ง่าว!" แค่มึงร่ายมนต์สับรั้วเปิดให้วิ่งพอร์ต 443 โง่ๆ หน้ากระดาน... มันไม่ได้หมายความว่ารถยนต์ข้างในรูรั้วมึงจะแอบเปิดประทุนแก้ผ้าวิ่งโฉบไปมาให้แฮกเกอร์เห็นไม่ได้โว้ยย!! การห้ามรถวิ่งคนละทางมันไม่ได้เป็นการเข้ารหัสป้องรถกระบะแต่อย่างใดเลยฮะ มั่วสิ้นดี!

---
---

## 📌 คำถามที่ 59
**โจทย์:**
A web application, which is hosted in the on-premises data center and uses a MySQL database, must be migrated to AWS Cloud. You need to ensure that the network traffic to and from your RDS database instance is encrypted using SSL. For improved security, you have to use the profile credentials specific to your EC2 instance to access your database, instead of a password.

Which of the following should you do to meet the above requirement?

**ตัวเลือก:**
- [x] Set up an RDS database and enable the IAM DB Authentication.
- [ ] Configure your RDS database to enable encryption.
- [ ] Launch the mysql client using the --ssl-ca parameter when connecting to the database.
- [ ] Launch a new RDS database instance using Aurora with the Backtrack feature enabled.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายย้ายบ้านกระเตงหม้อ **`MySQL database`** ขึ้นฟ้าสวรรค์ AWS อิงแอบซบตอกเสาเข็ม **Amazon RDS**
คำสั่งเพชฌฆาตหน้าหมาคอมโบ 2 ดอก:
1) กูอยากให้ลมหายใจตดระเหยตอนคุยกันข้ามฟ้า แม่งเข้ารหัสเกราะเพชรติดทน **`SSL (encrypted in-transit)`**
2) บูสความขลังขั้นสุด: กูเกลียดขี้หน้าพาสเวิร์ดผีดิบ! **กูบังคับให้มึงใช้ไอ้พวกยศฐาบรรดาศักดิ์ชุดเครื่องแบบเสื้อกั๊ก (EC2 profile / IAM Role) เป็นตัวไขทะลวงกุญแจล้วงความจำตู้เย็นฐานข้อมูลแทน (instead of a password) ปลอดภัยไร้ที่ติฮะ!!**
คำถามบ๊องแบ๊วท้าอนุบาล: "จงเลือกขบวนท่าเด็ดดวงเพื่อสยบมารผจญนี้ทีซิ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความรอดตายในการคุยกับตู้เซฟวิเศษ RDS: 
  - คีย์เวิร์ดกษัตริย์: แค่มึงเห็นคำว่า **"ขยะแขยงไม่อยากใช้ Password แล้วแสร้งใช้ IAM/Profile บุกบากทะลวงฐานข้อมูลแทน"**...
  - ป้ายชื่อชูโรงแฉ่งกระหม่อมของวิชานี้คือ **`"IAM DB Authentication"`** เท่านั้นฮะ มีวิชาเดียวในยุทธภพ!
  - ข้อดีที่แฝงมาคือ: พอมึงกางร่มวิชานี้ปุ๊บ คลื่นพลังมันจะบีบบังคับเหยียบกัปปิตันให้ **วิ่งผ่านท่อ SSL เข้ารหัสหุ้มทองคำทันทีอัตโนมัติ 100% ชัวร์ตังค์อยู่ครบ! (ได้คอมโบตายห่าสองต่อแบบงงๆ)** จบเป๊ะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up an RDS database and enable the IAM DB Authentication.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกโคตรพ่อโคตรแม่ฮะ! ฟาดหมัดน็อครอบด้วยวิชา `IAM DB Authentication` ทรงพลังมหาศาล สลับหน้ากากลากเอาโปรไฟล์ EC2 (IAM) แทนปัดพาสเวิร์ดทิ้งดิ่งลงทะเล แล้วเสือกของแถมบังคับคุยสาย SSL หุ้มเกราะฟินาเล่อีก! ครบวงจรตายสนิทในไม้เดียวฮะ 

❌ **[ผิด] Launch the mysql client using the --ssl-ca parameter when connecting to the database.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "มึงกางเต็นท์ปิดไฟหน้ารถ `วิ่งท่อ --ssl-ca` อย่างเดียว..." แล้วติ่งนรกที่เจ้านายสั่งนักสั่งหนาว่า "กูกระเดี้ยนกระดอนไม่อยากใช้พาสเวิร์ด (instead of password)" มึงก็ลืมไปหน้ามืดซะงั้น!! โดนตบปากสั่นฮะ แค่ครึ่งใบสอบตกเต็มๆ! 

❌ **[ผิด] Configure your RDS database to enable encryption.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" ยันต์เทพ `RDS encryption` แม่งคือท่าดองก้อนเนื้อฝังลงดินเข้ารหัสเซฟตายตอนก้อนหลับลึก (At-Rest) โว้ยยย!! เจ้านายสั่งให้ล็อคตายตอน "หมาวิ่งกลางอากาศ (In-flight/SSL)" และเสก IAM ปัดเป่าพาสเวิร์ด มึงหยิบยาผิดขวดแดกแก้ผิดอาการก็ตายห่าสิฮะ บ้าบอ! 

❌ **[ผิด] Launch a new RDS database instance using Aurora with the Backtrack feature enabled.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยย!! พระอัลลอฮกะทุ้งดิน!! มึงเอาค้อนไปสอยมะม่วงหรอฮะ!?" **`Aurora Backtrack` แม่งคือไทม์แมชชีนย้อนเวลากลับไปก่อนเจ้านายลั่นเผลอลบตารางโง่ๆ ลบทิ้งแบบปัญญาอ่อนโว้ยยย!!** แม่งเกี่ยวส้นตีนห่าพยาธิอะไรกับการตุนพาสเวิร์ด หรือเข้ารหัสวิ่งกลางหาววะเนี่ยย!! จับแพะชนไดโนเสาร์หน้าด้านๆ ฮาแตกขี้แตกฮะ หลงประเด็นยับเยิน!

---
---

## 📌 คำถามที่ 60
**โจทย์:**
A Solutions Architect created a brand new IAM User with a default setting using AWS CLI. This is intended to be used to send API requests to Amazon S3, DynamoDB, Lambda, and other AWS resources of the company’s cloud infrastructure.

Which of the following must be done to allow the user to make API calls to the AWS resources?

**ตัวเลือก:**
- [x] Create a set of Access Keys for the user and attach the necessary permissions.
- [ ] Assign an IAM Policy to the user to allow it to send API calls. 
- [ ] Do nothing as the IAM User is already capable of sending API calls to your AWS resources.   
- [ ] Enable Multi-Factor Authentication for the user.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายนั่งงัดปลักจิ้มคีย์บอร์ด **กะซวกเสกปั้นพนักงานใหม่ขึ้นมา 1 หน่อ (Brand new IAM user)** ด้วยท่ายากหน้าจอดำ **`AWS CLI`** ปล่อยทุกอย่างว่างเปล่าแบบไข่ในหิน (default setting)
ความหวังหมู่บ้าน: "เจ้านายเตรียมเอาไอ้เด็กฝึกงานคนนี้ ไปสวมรอยปาหอกสั่งยิงปืนใส่ชาวบ้านอย่าง S3, Dynamo, Lambda บลาๆ (send API requests)"
คำถามบ๊องแบ๊วท้าอนุบาล: "โอ้โห!! มึงต้องเสกอาวุธห่าอะไรเหาะอัดตูดกรอกปากเด็กนี่ก่อน มันถึงจะเห่าหอนเคาะประตูคุยชาวบ้านพังได้เบ็ดเสร็จวะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง IAM ยุคหินตัดเสื้อหน้าจอดำ!
- กฎอมตะแห่งการคลอดลูกจากมดลูก CLI: 
  - ท่องจำให้ขึ้นใจเลยว่า: กะอีแค่ "ปั้นคนใหม่แบบไข่ในหินด้วย CLI (default setting)" หน้าตามันจะ **หน้าโง่ ว่างเปล่า บ้องตื้น ไม่มีคีย์ ไม่มีพาสเวิร์ด เข้าจอเว็บยังไม่ได้เลยโว้ยย!** (ไม่เหมือนการจิ้มกราบทางหน้าจอเว็บ Console ที่มันจะบังคับเตือนให้กรอก)
  - ดังนั้น เพื่อชุบชีวิตให้ไอ้ผีดิบตัวนี้ทะลวงยิงปืน (API calls) ได้! สัจธรรมเสร็จสมอารมณ์หมายก็คือ: **สร้างขุมพลังป้ายหยกทหาร "Access Keys (ID/Secret)" รัดคอให้มันก่อน แล้วกางยันต์ "IAM Policy (permissions)" อนุญาตให้มันเห่าหอนได้!** แค่นี้มันก็แปลงร่างเป็นสุดยอดอสูรกายตามเจ้านายสั่ง 100% ชัวร์ฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a set of Access Keys for the user and attach the necessary permissions.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกโคตรพ่อโคตรแม่ฮะ! ฟาดหมัดน็อครอบด้วยการปั๊มลูกกุญแจผีทิ่มตูด `Access Keys` ยื่นให้เด็กฝึกงานพร้อมห่อข้าวกล่องกงจักรพรรดิ `Permissions` สั่งเสร็จสับมันจะยิง API ถล่มโลกได้หน้าตาเฉยฮะ! จบสวยปรู๊ดปร๊าด! 

❌ **[ผิด] Do nothing as the IAM User is already capable of sending API calls to your AWS resources.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! ยืนหัวเดียวกระเทียมลีบหน้าโง่ๆ มือเปล่า ไม่สะพายปืนกุญแจ Access Key พกไว้..." ต่อให้มึงตะโกนสบถด่าหน้าวัด มึงก็ไม่มีปัญญาเห่าให้ยาม AWS ปล่อยมึงไปกระแทก API ทิพย์ได้หรอกฮะ! บ้าบอคอแตกนอนตดตายหน้าด่านฮะ 

❌ **[ผิด] Assign an IAM Policy to the user to allow it to send API calls.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงคลุมเสื้อเกราะยันต์ทะลวงศพ `IAM Policy` หน้าตาเฉยอย่างเดียว... แต่เสือกไม่มีมือไปกุมดาบกุญแจผีเวทย์มนต์ **`Access keys` ไว้โยกเคาะหน้าประตู (API password)** แล้วใบอนุญาตมันจะไปเบ่งขี้ให้ใครดูวะฮะ!? ตกม้าตายครึ่งใบฮะ ครบองค์ประกอบไม่พอ! 

❌ **[ผิด] Enable Multi-Factor Authentication for the user.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยย!! มึงเอาฮาใช่ไหมเนี่ย!?" เสกตู้สุ่มพาสเวิร์ดนรก `MFA` ห้อยไข่ให้เด็กฝึกงาน... มันไม่ได้เสกดาบ API `Access keys` งอกออกมาจากฟ้าแต่อย่างใดโว้ยย!! จับแพะชนไดโนเสาร์หลงทิศหลงทางอย่างอัปยศพินาศฮะ! บ้ากาวล้วนๆ ฮะ!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 6 (Part 7: ข้อ 61 - 65)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 61
**โจทย์:**
A game development company operates several virtual reality (VR) and augmented reality (AR) games which use various RESTful web APIs hosted on their on-premises data center. Due to the unprecedented growth of their company, they decided to migrate their system to AWS Cloud to scale out their resources as well to minimize costs. 

Which of the following should you recommend as the most cost-effective and scalable solution to meet the above requirement?

**ตัวเลือก:**
- [x] Use AWS Lambda and Amazon API Gateway.
- [ ] Host the APIs in a static S3 web hosting bucket behind a CloudFront web distribution.
- [ ] Use a Spot Fleet of Amazon EC2 instances, each with an Elastic Fabric Adapter (EFA) for more consistent latency and higher network throughput. Set up an Application Load Balancer to distribute traffic to the instances.
- [ ] Set up a micro-service architecture with ECS, ECR, and Fargate.

---
### 🎯 โจทย์ต้องการอะไร?
ค่ายเกม VR/AR บ้านนอกจะย้ายถิ่นฐาน **ระบบหลังบ้าน RESTful Web APIs** ขึ้นฝั่ง AWS 
วิกฤติหมาว้อ: "เจ้านายบอกว่าช่วงนี้คนเล่นทะลักถล่มทลายเลยอยากหนีมาอัพสเกลบนเมฆ (scale out)"
คำสั่งเพชฌฆาต: "กูอยากได้ท่าตีลังกาที่ **ยืดหยุ่นสเกลถึกทน (scalable)** และเสือกผีเจาะปาก **ขี้เหนียวประหยัดตังค์ฉิบหายวายป่วง (most cost-effective) สุดๆ ในขบวนแห่นี้!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง API ยืดหยุ่นขี้เหนียว!
- กฎแห่งความรอดตายในการทำ API บน AWS: 
  - ท่องจำให้ขึ้นใจ: ถ้าเจอป้ายไฟ "RESTful APIs / Scale ขยายแหลก / ขอถูกๆ จ่ายตามจริง (Cost-effective)"
  - ยานแม่ **`Serverless (Lambda + API Gateway)`** คือมหามิตรสายพุทธคุณตัวจริงเบอร์ 1 ของยุทธจักรโว้ย! ดันเป็นลูกรัก AWS เพราะมึงจ่ายเงิน "แค่ตอนเศษเสี้ยววินาทีที่คนกดยิง API เท่านั้น (pay only what you use)" ไม่ต้องเปิดคอมทิ้งขว้างรอให้เปลืองตั๋ว ค่าเช่าก็ถูกแสนถูก สเกลออโต้ปรี๊ดปร๊าด ทรงพลังไร้ขีดจำกัด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Lambda and Amazon API Gateway.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! โคตรพ่อโคตรแม่ถูกต้องทะลุมิติฮะ! นี่คือสถาปัตยกรรม Serverless แห่งอนาคต รับแขกเสร็จเก็บตังค์ปุ๊บหายตัวแว้บ ไม่กินไฟไม่ซดงบ ยืดหดได้ตามปริมาณลูกค้าล้วนๆ ตอบโจทย์ cost-effective ล้านเปอร์เซ็นต์! ฟินาเล่ฮะ! 

❌ **[ผิด] Host the APIs in a static S3 web hosting bucket behind a CloudFront web distribution.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! เลวทรามต่ำช้า!" มึงบ้าหรอฮะ ฐานทัพ API คือ **"ระบบคิดเลขรันสคริปต์คอมพิวเตอร์ (dynamic compute)"** แต่มึงเสือกจะเอาไปฝังดินไว้ที่ลังน้ำแข็งแจกรูปนิ่งๆ โง่ๆ อย่าง **`S3 static web`**!! ดำน้ำลึกหาหอยแครงฮะ! 

❌ **[ผิด] Set up a micro-service architecture with ECS, ECR, and Fargate.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" สกิลขี่เรือหลวง `ECS + Fargate` มันก็พอจะงอกลูกหลานปั๊มคอนเทนเนอร์เก่งอยู่หรอกนะ... แต่เห้ย! ต้นทุนมัน "หนาและบวมเป่ง (แพงกว่า Lambda บานตะไทชิบฝาย)" โว้ยยย ไม่ได้ตรงป้ายเหลืองหน้าร้านที่เขียนว่า "Most cost-effective" เลยฮะ เปลืองงบเปล่าๆ ปี้ๆ! 

❌ **[ผิด] Use a Spot Fleet of Amazon EC2 instances, each with an Elastic Fabric Adapter (EFA)...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยย!! จับแพะชนไดโนเสาร์หลงทิศหลงทาง!" ถึงมึงจะฉลาดแกมโกงไปเช่าเครื่องหลุดจำนำราคาถูก (`Spot fleet`) โกงความตาย... แต่จุดด้อยคือ "มันบ๋อแบ๋ไม่ได้มีความสามารถเด้งหน้าเด้งหลังออโต้สเกลลิ่งในตัวมันเอง (Not scalable) ถ้าระบบ Auto-scaling group (ASG) พังทลาย!" แถมลากสายไฟเบอร์ `EFA` มาให้เป็นภาระอีก บ้าบอคอแตกเกินเบอร์ฮะ!

---
---

## 📌 คำถามที่ 62
**โจทย์:**
A company has an application that uses multiple EC2 instances located in various AWS regions such as US East (Ohio), US West (N. California), and EU (Ireland). The manager instructed the Solutions Architect to set up a latency-based routing to route incoming traffic for www.tutorialsdojo.com to all the EC2 instances across all AWS regions.

Which of the following options can satisfy the given requirement?

**ตัวเลือก:**
- [x] Use Route 53 to distribute the load to the multiple EC2 instances across all AWS Regions.
- [ ] Use AWS DataSync to distribute the load to the multiple EC2 instances across all AWS Regions.
- [ ] Use an Application Load Balancer to distribute the load to the multiple EC2 instances across all AWS Regions.
- [ ] Use a Network Load Balancer to distribute the load to the multiple EC2 instances across all AWS Regions.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายปั่นโปรเจคพันล้าน ซื้อคอนโด EC2 ไว้รันแอปหว่านข้าม 3 ทวีป: นิวยอร์ค, แคลิฟอร์เนีย, ไอร์แลนด์ 
คำสั่งเพชฌฆาตหน้าหมา: "เห้ย! เวลาคนเข้าเว็บดอทคอม มึงช่วยหากรรมการโบกธง **เตะแบ่งคนไปเข้าตึกที่ใกล้ที่สุด หน่วงน้อยที่สุด (latency-based routing / across ALL AWS REGIONS) ทีซิ!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งจราจรระดับกะโหลกจักรวาล: 
  - **"ข้ามทวีป (Cross-Regions) + ผูกกับชื่อโดเมนดอทคอม (www.domain.com)"**
  - ตำรวจจรจารหน้าด่านแห่งปฐพีที่จะมาแบกรับวิชานี้และมีป้ายเหลืองเขียนว่า "Latency-based routing" ตัวเดียวในโลกเวทมนต์ AWS ก็คือ **`"Amazon Route 53"`** โว้ยยย ไม่มีสัตว์ประหลาดตัวอื่นแล้วฮะ! 100% ชัวร์ตังค์อยู่ครบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Route 53 to distribute the load to the multiple EC2 instances across all AWS Regions.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! ตรงปกโคตรพ่อโคตรแม่ฮะ! ตำรวจโบกธงจราจรข้ามจักรวาลตัวตึง! มันคือ DNS เทพเจ้าของ AWS ตัวเดียวที่มีสูตรลับ `Latency-based routing` ชี้เป้าวาร์ปข้ามทวีปไปเซิร์ฟเวอร์ที่ตอบสนองลูกค้าไวที่สุด ฟินาเล่มัดจบ! 

❌ **[ผิด] Use an Application Load Balancer to distribute the load to the multiple EC2 instances across all AWS Regions.** และ **Use a Network Load Balancer...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "มึงกางเต็นท์ผิดที่ผ่อนบ้านผิดจังหวะ!!" สันดานดิบของบรรดา `Elastic Load Balancer (ALB, NLB)` ทื่อๆ ทั่วไป... **แม่งกระจายจราจรได้เฉพาะแค่ "หมาในทวีป (Within Region) ข้ามตึก AZ เฉยๆ" โว้ยยย ไม่ใช่กระโดดถีบข้ามทวีป (across AWS Regions) หน้าตาเฉยทะลุปรุโปร่งฮะ!!** โดนตบปากแตก! 

❌ **[ผิด] Use AWS DataSync to distribute the load to the multiple EC2 instances across all AWS Regions.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงจะเอารถบรรทุกส่งของ `DataSync` มายืนแจกออร์เดอร์คนบนหน้าเว็บเพื่อ!!? โตเป็นควายแล้ว DataSync แม่งคือสิบล้อดูดข้อมูลก๊อปปี้ไฟล์ย้ายบ้าน (Migration files) จากออฟฟิศไปขึ้นสวรรค์ S3/EFS หูหนวกตาบอด ไม่ใช่ตู้กระจายจราจร (Load Balancer)! นั่งดมกาวชัดๆ ฮะ!

---
---

## 📌 คำถามที่ 63
**โจทย์:**
A multinational company has been building its new data analytics platform with high-performance computing workloads (HPC) which requires a scalable, POSIX-compliant storage service. The data need to be stored redundantly across multiple AZs and allows concurrent connections from thousands of EC2 instances hosted on multiple Availability Zones.

Which of the following AWS storage service is the most suitable one to use in this scenario?

**ตัวเลือก:**
- [x] Amazon Elastic File System
- [ ] Amazon S3
- [ ] Amazon ElastiCache
- [ ] Amazon EBS Volumes

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่มหาเศรษฐีกำลังตั้งเตารีดคอมพิวเตอร์ผีดิบแสนล้าน **(High-performance computing - HPC)** 
วิกฤติหมาว้อ: "กูจะหาที่ฝังศพถังเก็บข้อมูลหน้าตาแบบโฟลเดอร์รันสคริปต์ได้ **(POSIX-compliant)** แถมยืดหยุ่นหน้าทน!"
คำสั่งเพชฌฆาตโชว์เทพ 2 ดอก:
1) มันต้องซุกซ่อนโคลนกันผีไว้ข้ามตึก (redundantly across multiple AZs)
2) กฎอมตะแห่งการปั้มพ์: **ยอมให้แมงมุม EC2 นับพันๆ ตัว จากสารพัดตึก รุมกระซวกล้วงทับไฟล์พร้อมกันวินาทีเดียวได้สบายตูด (concurrent connections from thousands of EC2 / multiple AZs)!!**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎแห่งความรุนแรงอำนาจถังขยะ: 
  - สัจธรรมการแชร์โฟลเดอร์ระดับมหากาพย์ AWS: "ถ้าอ่านคำสั่งบรรทัดสุดท้ายเห็นว่า: **คนนับพันนับหมื่นรุมแชร์โฟลเดอร์/กะซวกแย่งข้าวกินถาดเดียวกัน (concurrent thousands instances)**!!"
  - ไอ้ตุ่มโกดังที่ว่านั้นคือ: **`"Amazon EFS (Elastic File System)"`** ชัวร์ๆ โว้ยย!! พระเอกตัวจริงเสียงจริง เพราะมันคือ Shared File System แบบ NFS/POSIX-compliant เป๊ะๆ 100% ครบเครื่องต้มยำดมกาวตายชัก!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon Elastic File System**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! โคตรพ่อโคตรแม่ถูกต้องทะลุมิติฮะ! นี่คือถังแชร์ไฟล์ส่วนกลางที่อ้าแขนรับฝูงลูกเจี๊ยบนับพันมารุมกินโต๊ะพร้อมกันสบายๆ ซ้ำยังเป็นโฟลเดอร์ทรงเดิมเป๊ะๆ ที่โปรแกรมสมัยหินยอมเปิดใจรับ (`POSIX-compliant`) แถมก๊อปปี้เผื่อเหนียวข้าม 3 ตึกรอดตายฟินาเล่ฮะ! 

❌ **[ผิด] Amazon EBS Volumes**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! เลวทรามต่ำช้า!" อีเตียงหัก `EBS Volume` แม่งเป็นฮาร์ดดิสก์บล็อก **ที่โดยสันดานแล้ว "มันยอมให้ผัวเสียบได้ทีละคน (attached to a single instance)" โว้ยยย!!** จะไปอ้าซ่าให้พันคนรุมโทรมเสียบพร้อมกันแบบโจทย์สั่งได้ไงวะฮะ! กามตายด้านฮะ พินาศ! 

❌ **[ผิด] Amazon S3**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" มึงจะเอากล่องกระดาษลังดองของ `S3` มาสวมรอยแอ้มเป็นโฟลเดอร์ `POSIX-compliant` ไม่ได้โว้ยย!! S3 มันเป็นกล่องเก็บทีละชิ้นใหญ่ๆ (Object storage) ไม่ได้เปิดหน้าต่างยิบย่อยเมาท์ไดรฟ์ให้เสียบเมาส์รันประมวลผล HPC ปรู๊ดปร๊าดแบบโฟลเดอร์ได้ฮะ ผิดวัตถุประสงค์! 

❌ **[ผิด] Amazon ElastiCache**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "จับแพะชนไดโนเสาร์ฮะ!" อัญเชิญตุ่นปากเป็ดย่น `ElastiCache` มาเป็นฮาร์ดดิสก์เก็บข้อมูลแชร์เพื่อ!!? แม่งเป็นส้วมพักความจำชั่วคราวซิงค์คอหอยใน RAM (In-memory Store) โว้ย ไม่ได้คลอดมาเป็น `POSIX file system` หรือที่ฝังซากกระดูกข้อมูลทนๆ เสียหน่อยฮะ งงในงง!

---
---

## 📌 คำถามที่ 64
**โจทย์:**
A Solutions Architect is trying to enable Cross-Region Replication to an S3 bucket but this option is disabled. Which of the following options is a valid reason for this?

**ตัวเลือก:**
- [x] In order to use the Cross-Region Replication feature in S3, you need to first enable versioning on the bucket.
- [ ] The Cross-Region Replication feature is only available for Amazon S3 - One Zone-IA
- [ ] The Cross-Region Replication feature is only available for Amazon S3 - Infrequent Access.
- [ ] This is a premium feature which is only for AWS Enterprise accounts.

---
### 🎯 โจทย์ต้องการอะไร?
สมุน AWS อุตริอยากเลียนแบบจิ๋นซีฮ่องเต้! เข้าไปในกะละมัง **Amazon S3** จะกดเปิดสวิตช์ท่าไม้ตายพ่นไฟข้ามทวีป **`"Cross-Region Replication (CRR)"`**
วิกฤติหมาว้อ: "โห!! ซวยแล้ว!! **ทำไมปุ่มเสือกเป็นสีเทากดไม่ได้ (Option is disabled)? ขยับไม่ได้เฉย หน้าด้านๆ!!**"
คำถามบ๊องแบ๊วท้าอนุบาล: "บอกใบ้เหตุผลงั่งๆ หน่อยซิ ทำไมมันถึงติดป้ายห้ามเข้าเตะสกัดดาวรุ่งวะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้ากระดูกเปราะฮะ!
- กฎอมตะแห่งการโคลนร่างของ S3:
  - ท่องจำให้ขึ้นใจเลยว่า: กะอีแค่ "จะปั๊มลูกโคลนนิ่งข้ามทวีป หรือทวีปเดียวกัน (Same/Cross-Region Replication)"
  - ยันต์คุ้มกันก่อนเสือกเปิดประตูบานนี้: **มึงต้องเปิดใช้งานฟังก์ชันอมตะนิรันดร์กาล `"Versioning (เครื่องจักรถักทอระลึกชาติ)"` ก่อนโว้ยย!!** ไม่งั้น AWS มันงงว่ามันจะก๊อปแฝดเวอร์ชั่นไหนไปทวีปอื่นดีฮะ ขาด Versioning โลกวินาศครับ 100%!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] In order to use the Cross-Region Replication feature in S3, you need to first enable versioning on the bucket.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! โคตรพ่อโคตรแม่ถูกต้องทะลุมิติฮะ! นี่คือสัจธรรมข้อบังคับกฎกระทรวงของแท้... มึงหน้าด้านไปข้ามทวีปไม่ได้เด็ดขาด ถ้ากะละมังฝั่งนึงและอีกฝั่งแม่งยังไม่สับสวิตช์ `Versioning` เป็นกุญแจเบิกทาง! ปรบมือรัวๆ! 

❌ **[ผิด] The Cross-Region Replication feature is only available for Amazon S3 - One Zone-IA** และ **The Cross-Region Replication feature is only available for Amazon S3 - Infrequent Access.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! เลวทรามต่ำช้า!" มึงบ้าหรอฮะ ท่าเปิดสวิตช์โคลนหน้าตาข้ามทวีปนี้ **สามารถร่ายมนตขลังได้บนกะละมัง S3 'ทุกชนชั้นชั้นวรรณะ (All storage classes)' โว้ยยย!** จะ Standard, IA, หรือ One Zone ก็เบ่งพลังได้หมดเลย ไม่แบ่งพรรคแบ่งพวกฮะ หลอกควายล้วนๆ! 

❌ **[ผิด] This is a premium feature which is only for AWS Enterprise accounts.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" เขียนเต้าไข่มาหลอกล่อให้หมางงฮะ "พรีเมี่ยมฟีเจอร์สำหรับชาว Enterprise ขูดรีดเท่านั้น!" บ้าบอ! ฟีเจอร์ CRR แม่งของสาธารณะชน ทุกแอคเคาท์เด็กแว๊นอนุบาลก็ใช้ได้หมดฮะ ไม่มีหวงก้างใดๆ เลยฮะ พินาศ!

---
---

## 📌 คำถามที่ 65
**โจทย์:**
A company requires corporate IT governance and cost oversight of all of its AWS resources across its divisions around the world. Their corporate divisions want to maintain administrative control of the discrete AWS resources they consume and ensure that those resources are separate from other divisions.

Which of the following options will support the autonomy of each corporate division while enabling the corporate IT to maintain governance and cost oversight? (Select TWO.)

**ตัวเลือก:**
- [x] Use AWS Consolidated Billing by creating AWS Organizations to link the divisions’ accounts to a parent corporate account.
- [x] Enable IAM cross-account access for all corporate IT administrators in each child account.
- [ ] Create separate Availability Zones for each division within the corporate IT AWS account. Improve communication between the two AZs using the AWS Global Accelerator.
- [ ] Create separate VPCs for each division within the corporate IT AWS account. Launch an AWS Transit Gateway with equal-cost multipath routing (ECMP) and VPN tunnels for intra-VPC communication.
- [ ] Use AWS Trusted Advisor and AWS Resource Groups Tag Editor

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมาเฟียข้ามชาติ อยากคุมบิลบัตรเครดิตบริษัทลูกตามสาขาทั่วโลก **(corporate IT governance and cost oversight)**
ปมหน้าหมา: "แต่เห้ย! บริษัทลูกแม่งเสือกปากดี! กระแดะดิ้นรนขอผูกขาดขอบริหารกุมอำนาจจัดการของเล่นแผนกตัวเอง **ไม่อยากยุ่งปะปนโดนรวมฮิตด่าทอฉิบหาย (maintain administrative control / separate from other divisions)!!**"
คำสั่งเพชฌฆาต: "กูจะจัดทัพสรรหาโซลูชั่นไหนที่วิน-วิน **ลูกก็เป็นไทอิสระ แต่พ่อก็ยังแอบดูดตังค์สอดส่องครอบงำบิลได้อยู่เบ็ดเสร็จวะ!? (เลือกมา 2 ท่าเน้นๆ)**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงแยกแอคเคาท์!
- กฎอมตะแห่งการแยกบ้านแต่ซดกระเป๋าตังค์พ่อ: 
  - สัจธรรมการแยกวงตีกรอบสิทธิ์ให้ลูก: อย่ามานั่งแบ่งตึกง่อยๆ ในแอคเคาท์เดียว! ให้ไปจับแยกผ่าคลอดเป็นคนละ **"AWS Accounts"** ขาดกระจุยออกจากกันไปเลย 100% ลูกจะได้อิสระเสรีบงการชีวิตตัวเอง!
  - ขบวนท่าร่ายมนต์สอดส่องของฝั่งเจ้านาย (ตีคู่ประสานพลัง):
    1. **รวมศูนย์ดูดเลือดซดบิล (`AWS Organizations -> Consolidated Billing`):** กางร่มไทรดึงแอคเคาท์ติ่งลูกๆ ทั้งหลายมาเสียบอกรวบบิลบิลเดียวดูว่าใครผลาญตังค์เท่าไหร่
    2. **มุดลอดใต้ถุนส่องบ้านลูก (`IAM cross-account access`):** สร้างยันต์เส้นสายให้ รปภ.ไอทีฝั่งพ่อ 可以วาร์ปมุดเข้าหลังบ้านแอคเคาท์ลูกๆ เข้าไปสืบราชการลับได้โดยไม่ต้องขอ User/Password สร้างใหม่ให้เมื่อยตุ้มฮะ ฟินาเล่!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Consolidated Billing by creating AWS Organizations to link the divisions’ accounts to a parent corporate account.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆฮะ! โฉบเฉี่ยวคว้าคะแนนไปกินสวยๆ ฮะ! จิ๊กซอว์ตัวที่ 1... ท่ากุมบังเหียนบิลค่าเน็ต! ร่ายมนต์ `AWS Organizations` เชื่อมสายนรกให้แอคเคาท์ลูกทั้งโลก โดนรวบตึงรวมบิลค่าใช้จ่ายลงมาโผล่ขูดยับที่แม่ (`Consolidated Billing`) ตรวจบัญชีเป๊ะ 100%! 

✅ **[ถูกต้อง] Enable IAM cross-account access for all corporate IT administrators in each child account.**
- **ทำไมถึงถูก:** คอมโบลูกที่สองฮะ! จิ๊กซอว์ตัวที่ 2 จัดฉากสายลับล้วงคองูเห่า! กางยันต์ `IAM cross-account` ให้สายสืบไอทีบริษัทแม่ แสกนหน้าวาร์ปมุดเข้าบ้านช่องของบรรดาแผนกลูกๆ ได้แบบเนียนๆ ไม่ต้องถลกเสื้อแอบสมัคร User ใหม่ให้ยุ่งยากวุ่นวายฮะ! คอมโบคู่บุญตายชัวร์! 

❌ **[ผิด] Create separate VPCs for each division within the corporate IT AWS account...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกเสือชาวบ้านฮะข้อนี้! "อ่าวเห๊ย! ยัดทุกแผนกมาสุมดมกาวอยู่ใน 'องค์กรแอคเคาท์เดียว' แล้วแค่สร้าง `VPC` กั้นแยกห้องนอน!?" บรรลัยสิครับแบบนั้น!! แอดมินรวมก็ยังตีกันยับ แถมมันไม่ใช่วิถีการมอบ "เอกราชสิทธิ์ขาด" หรือ "ช่วยแยกความรับผิดชอบบิลอย่างโปร่งใส" ให้ลูกแต่ละสาขาสักกะติ๊ดดด! พินาศ! 

❌ **[ผิด] Create separate Availability Zones for each division within the corporate IT AWS account...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! กะลาครอบหัวฮะ! "โอ้โหวว! ตีลังกาตกส้วมตาเหลือกฮะ!" ยิ่งมั่วแดกหนักเลยฮะ!! "บังคับแต่ละแผนกไปสิงอยู่คนละตึกโง่ๆ (Availability Zones)" อหังการเกินเยียวยา! ตึก AZ แม่งไม่ใช่เครื่องมือแบ่งขอบเขตแบ่งทรัพย์สินของมนุษย์ หรือแบ่งบิลเว้ย!! โดนหัวเราะเยาะตายห่า! 

❌ **[ผิด] Use AWS Trusted Advisor and AWS Resource Groups Tag Editor**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตะบะตะแบงฝืนโลกฮะ! "เห้ยย!! จับแพะชนไดโนเสาร์หลงทิศหลงทาง!" ตัวยันต์ดูไพ่ยิปซี `Trusted Advisor` มันทำได้แค่เห่าแช่งเตือนเวลาบ้านกาก ค่าไฟแพง พินาศพูนผลโว้ย!! ไม่ได้เกิดวิชาเวทมนตร์อเวจีไปรวมศูนย์บิลข้ามบัญชี หรือแทรกแซงกุมบังเหียนครอบจักรวาลแต่อย่างใดฮะ เลอะเทอะสัดฮะ!

---
---


