# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 1: ข้อ 1 - 5)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 1
**โจทย์:**
A company plans to migrate its suite of containerized applications running on-premises to a container service in AWS. The solution must be cloud-agnostic and use an open-source platform that can automatically manage containerized workloads and services. It should also use the same configuration and tools across various production environments.

What should the Solution Architect do to properly migrate and satisfy the given requirement?

**ตัวเลือก:**
- [x] Migrate the application to Amazon Elastic Kubernetes Service with EKS worker nodes.
- [ ] Migrate the application to Amazon Elastic Container Service with ECS tasks that use the AWS Fargate launch type.
- [ ] Migrate the application to Amazon Elastic Container Service with ECS tasks that use the Amazon EC2 launch type.
- [ ] Migrate the application to Amazon Container Registry (ECR) with Amazon EC2 instance worker nodes.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทต้องการย้าย Containerized application จาก On-premises ขึ้นไปบน AWS โดยมีเงื่อนไขสำคัญคือ:
1. **Cloud-agnostic**: ไม่ยึดติดกับผู้ให้บริการ Cloud เจ้าใดเจ้าหนึ่ง (ถ้าย้ายค่ายก็ยังใช้ได้)
2. **Open-source platform**: ต้องใช้แพลตฟอร์มที่เป็นโอเพนซอร์ส
3. จัดการ Container อัตโนมัติและใช้ Configuration / Tools แบบเดิมได้ทั้งหมด

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์มีคำว่า **`container`** + **`open-source`** + **`cloud-agnostic`** = พุ่งเป้าไปที่ **`Kubernetes`** หรือ **`Amazon EKS`** ทันที! (เพราะ Kubernetes เป็นของ Open-source ทำให้ย้ายไปทำบน Cloud เจ้าอื่นอย่าง Azure, GCP ได้สบาย)
- ทริคที่ 2: ถ้าเจอ **`Amazon ECS`** (Elastic Container Service) ให้จำไว้เสมอว่ามันคือบริการ **Proprietary (ลิขสิทธิ์เฉพาะของ AWS เขีบนมาเอง)** มันไม่ใช่ Open-source และย้ายไป Cloud เจ้าอื่นไม่ได้ตรงๆ ให้ **ตัดช้อยส์ ECS ทิ้งทั้งหมด!**
- ทริคที่ 3: **`Amazon ECR`** เป็นแค่ตู้เก็บ Image (Registry) ไม่ใช่บริการรันหรือจัดการ Container

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Migrate the application to Amazon Elastic Kubernetes Service with EKS worker nodes.**
- **ทำไมถึงถูก:** Amazon EKS เป็นบริการจัดการ Kubernetes (K8s) ของ AWS ซึ่ง K8s เป็น Open-source และเป็น Cloud-agnostic ล้านเปอร์เซ็นต์ ทำให้สามารถใช้ Tools เดิมจาก On-premises มารันบน AWS ได้แบบไม่ติดขัด

❌ **[ผิด] Migrate the application to Amazon Elastic Container Service with ECS tasks that use the AWS Fargate launch type.**
- **ทำไมถึงผิด:** ECS เป็นระบบของ AWS เอง (ไม่ใช่ Open-source) และ Fargate ก็เป็นของ AWS จึงไม่ตอบโจทย์ Cloud-agnostic

❌ **[ผิด] Migrate the application to Amazon Elastic Container Service with ECS tasks that use the Amazon EC2 launch type.**
- **ทำไมถึงผิด:** เหตุผลเดียวกับข้อบน ECS ไม่ใช่ Open-source

❌ **[ผิด] Migrate the application to Amazon Container Registry (ECR) with Amazon EC2 instance worker nodes.**
- **ทำไมถึงผิด:** ECR เป็นแค่ที่ฝากไฟล์ (Docker Image) ไม่มีระบบจัดการ (Orchestration) ให้

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **Amazon EKS (Elastic Kubernetes Service)**: ระบบรันคอนเทนเนอร์ระดับโลกที่เป็นมาตรฐานของใครหลายๆ บริษัท (ยากแต่เก่ง ท่ารันเยอะ)
- **Amazon ECS (Elastic Container Service)**: ระบบรันคอนเทนเนอร์ใช้งานง่าย สร้างโดย AWS เอง ผูกขาดกับ AWS

---
---

## 📌 คำถามที่ 2
**โจทย์:**
A company is hosting its web application in an Auto Scaling group of EC2 instances behind an Application Load Balancer. Recently, the Solutions Architect identified a series of SQL injection attempts and cross-site scripting attacks to the application, which had adversely affected their production data.

Which of the following should the Architect implement to mitigate this kind of attack?

**ตัวเลือก:**
- [ ] Block all the IP addresses where the SQL injection and cross-site scripting attacks originated using the Network Access Control List.
- [ ] Using AWS Firewall Manager, set up security rules that block SQL injection and cross-site scripting attacks. Associate the rules to the Application Load Balancer.
- [x] Set up security rules that block SQL injection and cross-site scripting attacks in AWS Web Application Firewall (WAF). Associate the rules to the Application Load Balancer.
- [ ] Use Amazon Guard​Duty to prevent any further SQL injection and cross-site scripting attacks in your application.

---
### 🎯 โจทย์ต้องการอะไร?
แอปพลิเคชันหลัง **Application Load Balancer (ALB)** กำลังถูกโจมตีด้วยรูปแบบ:
- **SQL injection** (ฝังโค้ดอันตรายในฐานข้อมูล)
- **Cross-site scripting (XSS)** (ฝังสคริปต์หลอกขโมยข้อมูลหน้าเว็บ)
โจทย์อยากรู้ว่า "ต้องตั้งค่าป้อมปราการตัวไหน ถึงจะบล็อกการโจมตีระดับเว็บไซต์เหล่านี้ได้?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเห็นคำเจาะจงว่า **`SQL injection`** หรือ **`cross-site scripting (XSS)`** ให้มองหาบริการเดียวเลยคือ **`AWS WAF (Web Application Firewall)`** เพราะออกแบบมาเพื่อกันภัยคุกคามหน้าเว็บแบบนี้เป๊ะๆ ติดตั้งขวางหน้า ALB ได้เลย
- ทริคที่ 2: เจอช้อยส์ **`NACL (Network Access Control List)`** ให้ข้ามไปเลย เพราะ NACL กั้นหน้าประตู IP ไม่ได้ฉลาดพอจะเข้าไปเช็คโค้ด SQL ที่ซ่อนอยู่ในกล่อง HTTP
- ทริคที่ 3: **`Amazon GuardDuty`** เป็นแค่ยามคอย "ตรวจและแจ้งเตือน" (Threat detection) ไม่ได้เป็นฟิลเตอร์บล็อกเว็บแบบ Real-time เหมือน WAF

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up security rules that block SQL injection and cross-site scripting attacks in AWS Web Application Firewall (WAF). Associate the rules to the Application Load Balancer.**
- **ทำไมถึงถูก:** AWS WAF เป็นฮีโร่สายตรงเรื่องจัดการ SQL injection และ XSS ทำงานร่วมกับ ALB ได้ และสามารถตั้ง Rule ให้บล็อกแพ็กเกจแปลกปลอมเหล่านี้ทิ้งได้เลย

❌ **[ผิด] Using AWS Firewall Manager...**
- **ทำไมถึงผิด:** AWS Firewall Manager เป็นแค่หน้ารวมศูนย์ (Dashboard) เอาไว้จัดการ WAF ของหลายๆ Account อีกที ไม่ได้ใช้บล็อกโดยตรงสำหรับเคส Account เดียวแบบนี้ (หลอกด้วยคำว่า Firewall)

❌ **[ผิด] Block all the IP addresses... using the Network Access Control List.**
- **ทำไมถึงผิด:** แฮกเกอร์เปลี่ยน IP เรื่อยๆ ได้ และ NACL ดูแค่ชั้น Network Layer (IP/Port) ไม่เก่งพอแกะ Layer 7 (HTTP) เพื่อดัก SQL สตริง

❌ **[ผิด] Use Amazon Guard​Duty to prevent...**
- **ทำไมถึงผิด:** GuardDuty คือ AI ตรวจจับพฤติกรรมแปลกๆ ใน AWS มันช่วยเตือนภัย แต่ไม่สามารถกรองแพ็กเกจ HTTP ดัก SQL injection เพื่อ "ป้องกัน (Prevent)" ได้ตรงๆ

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS WAF**: รปภ. ตรวจกระเป๋าหน้าเว็บ ใครซ่อนมีด (SQLi, XSS) มาในกล่อง HTTP จะไล่ออกหมด

---
---

## 📌 คำถามที่ 3
**โจทย์:**
An organization stores and manages financial records of various companies in its on-premises data center, which is almost out of space. The management decided to move all of their existing records to a cloud storage service. All future financial records will also be stored in the cloud. For additional security, all records must be prevented from being deleted or overwritten.

Which of the following should you do to meet the above requirement?

**ตัวเลือก:**
- [x] Use AWS DataSync to move the data. Store all of your data in Amazon S3 and enable object lock.
- [ ] Use AWS Storage Gateway to establish hybrid cloud storage. Store all of your data in Amazon S3 and enable object lock.
- [ ] Use AWS DataSync to move the data. Store all of your data in Amazon EFS and enable object lock.
- [ ] Use AWS Storage Gateway to establish hybrid cloud storage. Store all of your data in Amazon EBS and enable object lock.

---
### 🎯 โจทย์ต้องการอะไร?
1. ฝั่ง On-premises ฮาร์ดดิสก์จะเต็มแล้ว อยาก **"ย้ายข้อมูลเก่าทั้งหมด (move all existing)"** และให้ของใหม่ไปเก็บบน Cloud เลย 
2. ต้องการความปลอดภัยพิเศษคือ: **ต้องป้องกันไม่ให้ไฟล์โดนลบ หรือเขียนทับ (prevented from being deleted or overwritten)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ด **`prevented from being deleted or overwritten`** (ห้ามลบ/ห้ามเขียนทับ) = ต้องใช้ฟีเจอร์ **`Object lock`** บน **`Amazon S3`** เท่านั้น! (บริการอื่นอย่าง EBS หรือ EFS ไม่มีฟีเจอร์นี้) -> **ตัดช้อยส์ EBS/EFS ทิ้ง!**
- ทริคที่ 2: เลือกระหว่าง DataSync vs Storage Gateway? โจทย์บอกฮาร์ดดิสก์กำลังจะเต็ม จึงต้องการส่งขึ้นคลาวด์ "ทั้งหมด" และทำงานอยู่บนคลาวด์ต่อเนื่อง (ไม่ทำระบบ Hybrid ควบคู่กันแล้ว) ดังนั้นเครื่องมือย้ายไฟล์สายตรง **`AWS DataSync`** จึงเหมาะที่สุด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS DataSync to move the data. Store all of your data in Amazon S3 and enable object lock.**
- **ทำไมถึงถูก:** 1. DataSync คือลูกพี่ขนของย้ายค่ายสายซิ่ง 2. โยนใส่ตระกร้า S3 3. เปิดฟีเจอร์ S3 Object Lock เพื่อเสกคาถา WORM (Write-Once-Read-Many) ปกป้องไฟล์ห้ามใครหน้าไหนมาลบ

❌ **[ผิด] Use AWS Storage Gateway to establish hybrid cloud storage. Store all of your data in Amazon S3 and enable object lock.**
- **ทำไมถึงผิด:** Storage Gateway เหมาะกับการทำ **Hybrid** (On-premises ขอแบ่งที่เก็บบนคลาวด์ แต่หน้าบ้านยังใช้อยู่) แต่โจทย์ข้อนี้ออฟฟิศไม่มีที่เหลือแล้ว จะย้ายหนีขึ้นคลาวด์ทั้งหมด จึงไม่ตรงจุดประสงค์

❌ **[ผิด] Use AWS DataSync to move the data. Store all of your data in Amazon EFS and enable object lock.**
- **ทำไมถึงผิด:** Amazon EFS (แฟ้มแชร์ Linux) ไม่มีฟีเจอร์เด็ดอย่าง Object Lock

❌ **[ผิด] Use AWS Storage Gateway... Store all of your data in Amazon EBS and enable object lock.**
- **ทำไมถึงผิด:** Amazon EBS ไม่รองรับ Object Lock เช่นเดียวกัน

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS DataSync**: สุดยอดรถพ่วงขนย้ายข้อมูลขนาดใหญ่จาก On-premise ไปหา S3/EFS/FSx อย่างรวดเร็ว
- **Amazon S3 Object Lock**: กุญแจเวทมนตร์ ล็อคไฟล์ให้เข้าโหมด "อธิษฐานแล้วห้ามแตะ" แม้แต่แอดมินหรือ Root ก็เผลอลบไม่ได้จนกว่าจะหมดเวลา

---
---

## 📌 คำถามที่ 4
**โจทย์:**
A Solutions Architect is building a cloud infrastructure where Amazon EC2 instances require access to various AWS services, such as Amazon S3 and Amazon Redshift. The Architect will also need to provide access to system administrators so that the system administrators can deploy and test changes.

Which configuration should be used to ensure that access to the resources is secured and not compromised? (Select TWO.)

**ตัวเลือก:**
- [ ] Store the AWS Access Keys in the EC2 instance.
- [x] Enable Multi-Factor Authentication.
- [ ] Assign an IAM user for each EC2 Instance.
- [ ] Store the AWS Access Keys in ACM.
- [x] Assign an IAM role to the EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
โจทย์มีผู้ใช้งานสองกลุ่มคือ:
1. เครื่อง **EC2 instances** ต้องการสิทธิ์เข้าถึง S3 และ Redshift
2. กลุ่ม **System administrators (แอดมินคน)** ต้องการสิทธิ์เข้ามาจัดการระบบ
โดยทั้งหมดนี้ต้อง ปลอดภัยสูงสุด มั่นใจได้ว่าข้อมูลจะไม่ถูกแฮก

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเป็น **"เครื่องจักร/เซิร์ฟเวอร์" (EC2)** ต้องการเรียกใช้เซอร์วิสอื่น = **ห้ามแจกกุญแจถาวร (Access Keys) เด็ดขาด!** ของที่ถูกต้องที่สุดคือการสวมเสื้อ **`IAM Role`** ให้กับ EC2 ตัวนั้นๆ -> **เลือก `Assign an IAM role`**
- ทริคที่ 2: ถ้าเป็น **"คน" (System administrators)** ล็อกอินเข้ามา = ความปลอดภัยขั้นสุดคือการบังคับให้เปิด **`MFA`** (Multi-Factor Authentication หรือยืนยันตัวตนสองชั้น) กฎเหล็กแอดมิน AWS ทั่วโลก

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Assign an IAM role to the EC2 instance.**
- **ทำไมถึงถูก:** IAM Role เอาไว้แจกบัตรผ่านชั่วคราวให้เครื่อง EC2 ทำให้ EC2 เดินไปหยิบของใน S3 หรือ Redshift ได้อย่างปลอดภัยแบบไม่ต้องเก็บกุญแจความลับไว้ในเครื่อง

✅ **[ถูกต้อง] Enable Multi-Factor Authentication.**
- **ทำไมถึงถูก:** การให้แอดมินที่เป็นคนเข้ามาจัดการ ต้องเพิ่มความยากให้แฮกเกอร์ด้วยการเปิด MFA (แอปมือถือ OTP)

❌ **[ผิด] Store the AWS Access Keys in the EC2 instance.**
- **ทำไมถึงผิด:** บาปหนาที่สุดของโลก AWS! การเจาะรูเก็บกุญแจ Access Keys ของจริงไว้ในเครื่อง EC2 ถ้ามีใครเจาะเครื่องได้ หรือหลุดออกไป บริษัทเจ๊งทันที (ควรใช้ IAM Role แทน)

❌ **[ผิด] Assign an IAM user for each EC2 Instance.**
- **ทำไมถึงผิด:** IAM User สร้างไว้ให้ "คน" ใช้ ไม่ใช่เอามาแจกให้ "โปรแกรมหรือเครื่องจักร" 

❌ **[ผิด] Store the AWS Access Keys in ACM.**
- **ทำไมถึงผิด:** ACM (AWS Certificate Manager) มีหน้าที่เก็บใบประกาศนียบัตรอัปหน้าเว็บ (SSL/TLS HTTPS) ไม่ใช่ที่เก็บ Access Keys

---
---

## 📌 คำถามที่ 5
**โจทย์:**
A company wants to streamline the process of creating multiple AWS accounts within an AWS Organization. Each organization unit (OU) must be able to launch new accounts with preapproved configurations from the security team which will standardize the baselines and network configurations for all accounts in the organization.

Which solution entails the least amount of effort to implement?

**ตัวเลือก:**
- [ ] Centralized the creation of AWS accounts using AWS Systems Manager OpsCenter. Enforce policies and detect violations to all AWS accounts using AWS Security Hub.
- [ ] Set up an AWS Config aggregator on the root account of the organization to enable multi-account, multi-region data aggregation. Deploy conformance packs to standardize the baselines and network configurations for all accounts.
- [x] Set up an AWS Control Tower Landing Zone. Enable pre-packaged guardrails to enforce policies or detect violations.
- [ ] Configure AWS Resource Access Manager (AWS RAM) to launch new AWS accounts as well as standardize the baselines and network configurations for each organization unit

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีโครงสร้าง AWS แบบองค์กร (AWS Organization) อยากหาเครื่องมือเบาแรง (**least amount of effort**) ที่ช่วย:
1. การสร้าง Account ลูกใหม่ๆ ให้ง่ายขึ้น (streamline the process)
2. เมื่อเปิด Account ใหม่ ต้องมาพร้อมกับการตั้งค่าที่ทีม Security วางบรรทัดฐาน (baselines) ไว้ให้อัตโนมัติ

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: จำเป็นสูตรไว้เลยว่า ถ้าโจทย์มีเรื่อง **`multi-account`** + ต้องการวางมาตรฐานความปลอดภัยแต่แรก **`standardize the baselines`** + และต้องการลงทุนลงแรงต่ำที่สุด **`least amount of effort`** = คำตอบจักรวาลนี้มีหนึ่งเดียวคือ **`AWS Control Tower`** 
- ทริคที่ 2: **`AWS Control Tower`** มักจะมาคู่กับคำว่า **`Landing Zone`** (ลานจอดคอปเตอร์สำหรับปูพรม Account) และกำแพงกันชนที่แถมมาให้เรียกว่า **`Guardrails`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up an AWS Control Tower Landing Zone. Enable pre-packaged guardrails to enforce policies or detect violations.**
- **ทำไมถึงถูก:** ตัวจบของงานแอดมินองค์กร! AWS Control Tower มีคลิกสร้าง Landing Zone ทำให้การสร้าง Account ลูกใหม่ๆ ได้ค่าพื้นฐานที่ถูกตั้งค่ามาอย่างดี (Best-practice) และมีกำแพง "Guardrails" ทุบหัวลูกน้องที่แอบตั้งค่าผิดกฎของบริษัทได้เลย ง่ายดายที่สุด

❌ **[ผิด] Set up an AWS Config aggregator...**
- **ทำไมถึงผิด:** AWS Config ทำหน้าที่แค่เฝ้าดูตั้งค่า (Detective) และจับผิดเป็นรายตัว ไม่ได้เป็นพระเอกสร้าง Account ใหม่อัตโนมัติให้ได้แบบ Control Tower ทำให้ต้องเหนื่อยเขียนบทสั่งงานเอง (ไม่ผ่านข้อ Least amount of effort)

❌ **[ผิด] Configure AWS Resource Access Manager (AWS RAM)...**
- **ทำไมถึงผิด:** AWS RAM เอาไว้แค่ "แชร์ทรัพยากรข้าม Account" (เช่น แชร์ Subnet ให้อีก Account ใช้) มันไม่สามารถเนรมิตเปิด AWS Account ขึ้นมาใหม่ให้ได้

❌ **[ผิด] Centralized the creation of AWS accounts using AWS Systems Manager OpsCenter...**
- **ทำไมถึงผิด:** Systems Manager OpsCenter คือศูนย์รวมช่างซ่อมตั๋วปัญหาในระดับ Resource ไม่ใช่ในโปรเจ็กต์การขยายปูพรม Account

### 📚 ความรู้เพิ่มเติมเกี่ยวกับ AWS Services ในข้อนี้
- **AWS Control Tower**: ผู้ว่าราชการจังหวัดของการสร้างและจัดระเบียบ AWS Accounts ในองค์กร มาคลิกเดียวเซ็ตค่ายกแผง
- **AWS Organizations**: ทะเบียนบ้านกลาง รวมบิลค่าใช้จ่าย และคุมกฎหมาย (SCP)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 2: ข้อ 6 - 10)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 6
**โจทย์:**
A company has two On-Demand EC2 instances inside the Virtual Private Cloud in the same Availability Zone but are deployed to different subnets. One EC2 instance is running a database and the other EC2 instance a web application that connects with the database. You need to ensure that these two instances can communicate with each other for the system to work properly.

What are the things you have to check so that these EC2 instances can communicate inside the VPC? (Select TWO.)

**ตัวเลือก:**
- [x] Check the Network ACL if it allows communication between the two subnets.
- [ ] Ensure that the EC2 instances are in the same Placement Group.
- [ ] Check if both instances are the same instance class.
- [ ] Check if the default route is set to a NAT instance or Internet Gateway (IGW) for them to communicate.
- [x] Check if all security groups are set to allow the application host to communicate to the database on the right port and protocol.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมี **EC2 สองเครื่อง** อยู่ใน VPC เดียวกัน (AZ เดียวกัน) แต่อยู่ **ต่าง Subnet** 
เครื่องแรกเป็น = Database / เครื่องที่สองเป็น = Web Application
ปัญหาคือ: เครื่อง Web App ติดต่อเครื่อง Database ไม่ได้ จะต้องไปตรวจเช็ค "ประตูกั้น" ตรงไหนบ้าง? (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การติดต่อสื่อสารกันภายใน VPC (Networking) ถ้าติดขัด ต้องนึกถึง "รปภ. สองด่าน" เสมอ คือ:
  1. **`Network ACL (NACL)`** = รปภ. คุมหน้าหมู่บ้าน (คุมระดับ Subnet)
  2. **`Security Group (SG)`** = รปภ. เฝ้าหน้าบ้าน (คุมระดับ EC2 Instance)
- ทริคที่ 2: ถ้าเจอช้อยส์ที่บอกให้ไปเช็ค **`Internet Gateway (IGW)` หรือ `NAT`** ให้ตัดทิ้ง! เพราะ IGW และ NAT มีไว้เพื่อให้ EC2 ออกไปคุยโทรศัพท์กับ "อินเทอร์เน็ตภายนอก" ไม่ใช่เอาไว้คุยกันเองในบ้าน (VPC)
- ทริคที่ 3: **`Placement Group`** เอาไว้จัดกลุ่มเครื่องให้รับส่งข้อมูลเร็วปรี๊ดเสี้ยววิ (Low-latency) ไม่เกี่ยวกับการอนุญาตให้คุยกันได้หรือไม่ได้

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Check if all security groups are set to allow the application host to communicate to the database on the right port and protocol.**
- **ทำไมถึงถูก:** ตรวจสอบ Security Group ว่าหน้าบ้าน Database เปิดพอร์ตรับแขก (เช่น 3306 MySQL) ให้ฝั่ง Web Application เข้ามาหาถูกต้องหรือเปล่า

✅ **[ถูกต้อง] Check the Network ACL if it allows communication between the two subnets.**
- **ทำไมถึงถูก:** ตรวจสอบ Network ACL (NACL) ของทั้งสอง Subnet ว่ามีกฎ (Rules) เผลอไปบล็อก IP ต้นทางหรือปลายทางระหว่าง Subnet กันเองหรือไม่ 

❌ **[ผิด] Check if the default route is set to a NAT instance or Internet Gateway (IGW) for them to communicate.**
- **ทำไมถึงผิด:** EC2 ใน VPC เดียวกัน สามารถคุยกันเองผ่าน Local Route ภายในได้เลย ไม่ต้องวิ่งอ้อมไปหาเต้ารับอินเทอร์เน็ต (IGW)

❌ **[ผิด] Ensure that the EC2 instances are in the same Placement Group.**
- **ทำไมถึงผิด:** Placement group ใช้กรณีที่รันแอปคำนวณสเปคสูงๆ ที่ต้องการเน็ตเวิร์คความหน่วงต่ำ ไม่ได้เป็นตัวชี้วัดว่าเน็ตเวิร์กจะคุยกันติดไหม

❌ **[ผิด] Check if both instances are the same instance class.**
- **ทำไมถึงผิด:** สเปคเครื่องคนละรุ่น (เช่น t2.micro คุยกับ c5.large) ก็ติดต่อสื่อสารกันได้ปกติ

---
---

## 📌 คำถามที่ 7
**โจทย์:**
A software company has resources hosted in AWS and on-premises servers. You have been requested to create a decoupled architecture for applications which make use of both resources.

Which of the following options are valid? (Select TWO.)

**ตัวเลือก:**
- [ ] Use DynamoDB to utilize both on-premises servers and EC2 instances for your decoupled application
- [x] Use SQS to utilize both on-premises servers and EC2 instances for your decoupled application
- [ ] Use VPC peering to connect both on-premises servers and EC2 instances for your decoupled application
- [x] Use SWF to utilize both on-premises servers and EC2 instances for your decoupled application
- [ ] Use RDS to utilize both on-premises servers and EC2 instances for your decoupled application

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการเชื่อมระบบโปรแกรมระหว่าง **บน AWS** และเครื่องเซิร์ฟเวอร์ **On-premises** แบบ **"Decoupled architecture (สถาปัตยกรรมแบบแยกส่วนกันทำงาน)"**
ให้เลือก 2 บริการที่สามารถรองรับโจทย์ข้อนี้ได้

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเห็นคำว่า **`decoupled`** (แยกส่วนการทำงาน ไม่รอคอยซึ่งกันและกัน) ให้สมองลิงก์ไปหาพวกบริการคิวรอส่งงาน (Message Queue) เสมอ! และที่ดังที่สุดบน AWS ก็คือ **`Amazon SQS`** 
- ทริคที่ 2: บริการอีกตัวที่ชอบมาคู่เคียงกับคำว่า Decoupled รองลงมาจาก SQS ก็คือ **`Amazon SWF (Simple Workflow)`** (หรือ Step Functions)
- ทริคที่ 3: ระวังคำหลอก! การรวมเน็ตเวิร์กระหว่าง On-premises กับ AWS เค้าใช้ VPN หรือ Direct Connect... ส่วน **`VPC Peering`** เอาไว้เชื่อมระหว่าง VPC ใน AWS ด้วยกันเท่านั้น ห้ามตอบมาเชื่อมกับ On-prem เด็ดขาด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use SQS to utilize both on-premises servers and EC2 instances for your decoupled application**
- **ทำไมถึงถูก:** SQS (Simple Queue Service) เป็นกล่องไปรษณีย์รับฝากข้อความจดหมาย (Message Queue) ซึ่ง EC2 กับ On-premises สามารถแวะมาหยิบจดหมายไปประมวลผลตอนไหนก็ได้ ช่วยทำให้ระบบแยกส่วน(Decouple) กันอย่างสมบูรณ์แบบ เครื่องฝั่งใดพัง อีกฝั่งก็หยิบงานไปทำต่อได้ ไม่ล่มทั้งระบบ

✅ **[ถูกต้อง] Use SWF to utilize both on-premises servers and EC2 instances for your decoupled application**
- **ทำไมถึงถูก:** SWF (Simple Workflow Service) เป็นบริการจัดคิวลำดับงาน (Task coordinator) ซึ่งรองรับ Worker (คนช่วยทำงาน) ทั้งแบบอยู่บน Cloud (EC2) และ Worker แบบออฟไลน์ (On-premises) จึงแยกส่วนโปรแกรมได้อย่างดี

❌ **[ผิด] Use VPC peering to connect both on-premises servers and EC2 instances...**
- **ทำไมถึงผิด:** VPC Peering ใช้เชื่อมวงแลนภายใน AWS (VPC ถึง VPC) ไม่ใช่เครื่องมือเชื่อม On-premises (ต้องใช้ VPN/Direct Connect)

❌ **[ผิด] Use DynamoDB...**
❌ **[ผิด] Use RDS...**
- **ทำไมถึงผิด:** สองตัวนี้เป็นแค่ฐานข้อมูลเก็บตาราง (Database) ไม่ใช่พระเอกหลักด่านหน้าของงานสายคิวสลับแยกส่วน Decoupled architecture 

---
---

## 📌 คำถามที่ 8
**โจทย์:**
A company has a requirement to move an 80 TB data warehouse to the cloud. It would take 2 months to transfer the data based on the current bandwidth allocation.

Which option is the most cost-effective for quick data upload to AWS?

**ตัวเลือก:**
- [ ] AWS Direct Connect
- [ ] Amazon S3 Multipart Upload
- [ ] AWS DataSync
- [x] AWS Snowball Edge

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการย้ายไฟล์คลังข้อมูลมหาศาล **(80 TB)** ขึ้น Cloud แต่เน็ตเน่ากากมากๆ **(ใช้เวลา 2 เดือน) ถ้าย้ายผ่านอินเทอร์เน็ตปกติ**
โจทย์ถามอยากได้วิธีส่งข้อมูลเข้า AWS แบบไวๆ และคุ้มตังค์ที่สุด (Most cost-effective for quick data upload)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ระบุว่าข้อมูลใหญ่สัสๆๆ (ระดับหลายสิบเกณฑ์ **`TB (Terabytes)`** หรือระดับ **`PB (Petabytes)`**) + คำว่าเน็ตกากๆ **`take "x" months to transfer`** หรือ **`limited bandwidth`** = ให้โยนอินเทอร์เน็ตทิ้งไป แล้วสั่งกล่องไปรษณีย์เหล็ก **`AWS Snowball`** (ตระกูล Snow Family) รถบรรทุกขนเหล็กมารับเสมอ! ทริคนี้ฟันธง 100%
- ทริคที่ 2: ข้อสอบหลอกให้ใช้ **`Direct Connect`** (สายแลนเช่าเหมาเส้น) -> สายเช่ามันแพงมาก และใช้เวลาขุดดินลากสายนานกว่าจะทำเสร็จ ไม่เหมาะกับการขนย้ายของล็อตใหญ่ๆ แบบฉุกเฉินครั้งเดียวจบ
- ทริคที่ 3: **`AWS DataSync`** กับ **`Multipart Upload`** เป็นการใช้เส้นทางอินเทอร์เน็ตปกติ ซึ่งโจทย์ก็ด่าแล้วว่าเน็ตช้ากินเวลา 2 เดือน เลิกคิดจะใช้อินเทอร์เน็ตได้เลย

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Snowball Edge**
- **ทำไมถึงถูก:** Snowball Edge คือบริการส่งกล่องฮาร์ดดิสก์แข็งแกร่งกันกระแทกจากอเมซอนมาถึงตึกบริษัทคุณ ให้คุณเสียบถ่ายโอน 80 TB ลงกล่องนี้ (แปบเดียวเสร็จ) แล้วเรียกไปรษณีย์มารับกล่องส่งกลับไป AWS. นี่คือวิธีที่เร็วกว่าเน็ตอืดๆ เป็น 10 เท่าในเคส 80TB

❌ **[ผิด] AWS DataSync**
- **ทำไมถึงผิด:** DataSync ซิ่งเร็วแค่ไหน แต่สุดท้ายข้อจำกัดคือ "ท่ออินเทอร์เน็ต" ออฟฟิศคุณตีบตันอยู่ดี มันก็วิ่งกินเวลา 2 เดือนเท่าเดิม

❌ **[ผิด] AWS Direct Connect**
- **ทำไมถึงผิด:** เช่าสายแลนความเร็วสูง 1-10 Gbps ยิงตรงยาวเข้า AWS (ใช้ข้ามทวีป) ค่าบริการมหาโหด และใช้เวลาเซ็นสัญญาขุดดินติดตั้งเป็นเดือนๆ

❌ **[ผิด] Amazon S3 Multipart Upload**
- **ทำไมถึงผิด:** การอัปโหลดหลายท่อนซ้อนกัน ก็ช่วยแบ่งไฟล์ 80TB ได้ แต่มันก็ยังต้องผจญภัยผ่านสายอินเทอร์เน็ต 2 เดือนของคุณอยู่ดี ไม่ช่วยลดจำนวนวันขนส่งลง

---
---

## 📌 คำถามที่ 9
**โจทย์:**
A company has an enterprise web application hosted on Amazon ECS Docker containers that use an Amazon FSx for Lustre filesystem for its high-performance computing workloads. A warm standby environment is running in another AWS region for disaster recovery. A Solutions Architect was assigned to design a system that will automatically route the live traffic to the disaster recovery (DR) environment only in the event that the primary application stack experiences an outage.

What should the Architect do to satisfy this requirement?

**ตัวเลือก:**
- [x] Set up a failover routing policy configuration in Route 53 by adding a health check on the primary service endpoint. Configure Route 53 to direct the DNS queries to the secondary record when the primary resource is unhealthy. Configure the network access control list and the route table to allow Route 53 to send requests to the endpoints specified in the health checks. Enable the Evaluate Target Health option by setting it to Yes.
- [ ] Set up an ​Amazon EventBridge rule to monitor the primary Route 53 DNS endpoint and create a custom AWS Lambda function. Execute the ChangeResourceRecordSets API call using the function to initiate the failover to the secondary DNS record.
- [ ] Set up an Amazon CloudWatch Alarm to monitor the primary Route 53 DNS endpoint and create a custom AWS Lambda function. Execute the ChangeResourceRecordSets API call using the function to initiate the failover to the secondary DNS record.
- [ ] Set up a Weighted routing policy configuration in Route 53 by adding health checks on both the primary stack and the DR environment. Configure the network access control list and the route table to allow Route 53 to send requests to the endpoints specified in the health checks. Enable the Evaluate Target Health option by setting it to Yes.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีระบบโปรแกรมรันอยู่ที่ภูมิภาคหลัก (Primary region) และมีภูมิภาคสำรองแบบ Warm standby สำหรับกรณีภัยพิบัติ (Disaster Recovery)
โจทย์ต้องการวิธีตั้งค่าเพื่อ **"เบี่ยงเส้นทางผู้ใช้งานไปหาเมืองสำรองอัตโนมัติ" (automatically route the live traffic... only in the event that the primary... outage)** เฉพาะตอนที่เมืองหลักไฟดับหรือพังลง

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเปลี่ยนเส้นทางจราจรเมื่อมีฝั่งนึงพัง คือหน้าที่การจดโดเมนเนมของ **`Amazon Route 53`**
- ทริคที่ 2: ถ้าเจอคำว่า **`Disaster Recovery (DR)`** + **`active-passive`** หรือ **`only when primary outage`** (จ่ายทราฟฟิกไปฝั่งรองเฉพาะตอนฝั่งเอกตาย) = นโยบายเดียวที่รองรับคือกฎ **`Failover routing policy`** ใน Route 53
- ทริคที่ 3: ระวังตัวหลอกอย่างกฎ **`Weighted routing policy`** (กฎน้ำหนักตัว) กฎนี้มันแบ่งแยกคนละ 50/50 สลับคนเข้าเว็บ (เช่น A/B Testing) ไม่ได้เหมาะมารอเป็นพระเอกขี่ม้าขาวแค่ตอนระบบหลักล่ม

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a failover routing policy... adding a health check on the primary service endpoint. Configure Route 53 to direct the DNS queries to the secondary record when the primary resource is unhealthy.**
- **ทำไมถึงถูก:** ตรงตัวเป๊ะ! ใช้คาถา "Failover Routing Policy" และให้ Route 53 มีระบบเอาไม้แหลมแทงตรวจเช็คชีพจร (Health Check) ฝั่งระบบหลักตลอดเวลา ถ้าระบบหลักชีพจรดับตาย (Unhealthy) ให้หักสวิตช์มุ่งคนไปหาพิกัดเมืองสำรองทันที

❌ **[ผิด] Set up a Weighted routing policy configuration in Route 53...**
- **ทำไมถึงผิด:** Weighted เป็นการให้รถวิ่งเข้าทุกทางตามสัดส่วนที่ตั้งไว้ (เช่น 80:20) ไม่ใช่หลักการสำรอง DR (ที่ฝั่งรองต้องปิดตัวเงียบๆ ไม่ให้ใครเข้า จนกว่าฝั่งหลักจะล่ม)

❌ **[ผิด] Set up an Amazon CloudWatch Alarm to monitor the primary Route 53... and Lambda...**
- **ทำไมถึงผิด:** การเจือกเอา CloudWatch มาจับ Alarm แล้วปลุกผี Lambda ไปแก้ตาราง Route 53 เป็นเทคนิคโบราณที่แต่งเติมจนระบบพะรุงพะรัง ทั้งที่ Route 53 มีปุ่มให้กดเปิดออโต้ Health Check อยู่แล้ว

❌ **[ผิด] Set up an ​Amazon EventBridge rule to monitor...**
- **ทำไมถึงผิด:** เหตุผลเดียวกันกับด้านบนครับ ใช้ท่าปราบมังกรที่ซับซ้อนเกินไป (เรียก Lambda + API ChangeResourceRecordSets) Route 53 จัดการเองจบในตัวง่ายกว่าเยอะ

---
---

## 📌 คำถามที่ 10
**โจทย์:**
A start-up company has an EC2 instance that is hosting a web application. The volume of users is expected to grow in the coming months, and hence, you need to add more elasticity and scalability in your AWS architecture to cope with the demand.

Which of the following options can satisfy the above requirement for the given scenario? (Select TWO.)

**ตัวเลือก:**
- [ ] Set up two EC2 instances deployed using Launch Templates and integrated with AWS Glue.
- [x] Set up two EC2 instances and then put them behind an Elastic Load balancer (ELB).
- [x] Set up two EC2 instances and use Route 53 to route traffic based on a Weighted Routing Policy.
- [ ] Set up an AWS WAF behind your EC2 Instance.
- [ ] Set up an S3 Cache in front of the EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
แอปหน้าร้านฝากร่างไว้กับ **EC2 แค่ตัวเดียวโดดๆ** ต่อมาคนเริ่มเข้าเยอะ คาดว่าอนาคตทราฟฟิกจะระเบิดตู้ม
เราต้องหาวิธีแปลงร่างระบบให้ **มีความยืดหยุ่น (Elasticity)** และ **อึด รองรับลูกค้ามหาศาล (Scalability)** (เลือก 2 คำตอบ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การทำให้ระบบทนพายุลูกค้า (Scalability) ก้าวแรกคือ "เพิ่มจำนวนพนักงาน (EC2 instances)" และ "หาผู้ช่วยแจกบัตรคิว" วิธีเบสิคคือการเรียกใช้บริการตำรวจจราจร **`Elastic Load Balancer (ELB)`**
- ทริคที่ 2: แต่นอกจาก Load Balancer แล้ว ทางฝั่งป้ายชื่อ **`Route 53`** ก็เก่งเหมือนกัน! เราจดโดเมนแล้วตั้งระบบ "ปันสวนแบ่งทราฟฟิก" แบบ **`Weighted Routing Policy (50:50)`** ชี้เป้าไปหา EC2 ทีละตัวสลับกันเพื่อกระจายลูกค้าเข้าเครื่องได้สบายๆ
- ทริคที่ 3: **`AWS WAF`** นี่เอาไว้ป้องกันหน้าเว็บยิง SQL แฮก (เรื่อง Security) ไม่ช่วยกระจายโหลด และ **`AWS Glue`** มันเป็นแม่บ้านจัดระเบียบข้อมูลสถิติ Big Data ไม่เกี่ยวอะไรข้องกับเว็บคนเข้าเลย

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up two EC2 instances and then put them behind an Elastic Load balancer (ELB).**
- **ทำไมถึงถูก:** สร้าง EC2 เครื่องฝาแฝดเพิ่มขึ้นมา แล้วเอาหลบหลังหลังกำแพง ELB (Elastic Load Balancer) คอยแยกลูกค้าแจกจ่ายให้สองเครื่องนี้หารโหลดกันรันแบบสบายๆ

✅ **[ถูกต้อง] Set up two EC2 instances and use Route 53 to route traffic based on a Weighted Routing Policy.**
- **ทำไมถึงถูก:** ซื้อ EC2 เพิ่มอีกเครื่อง แล้วไปกระซิบคุณปู่ Route 53 ให้สร้างกฎ Weighted 50% ให้ลูกค้า 100 คน แบ่งส่องไฟไปหา IP เครื่อง A ครึ่งนึง IP เครื่อง B ครึ่งนึง ช่วยกระจายคนได้เนียนๆ 

❌ **[ผิด] Set up two EC2 instances deployed using Launch Templates and integrated with AWS Glue.**
- **ทำไมถึงผิด:** AWS Glue คือบริการ ETL จัดระเบียบโกยฝุ่น Big Data ให้เป็นก้อน ใช้งานคนละจุดประสงค์ ไม่เกี่ยวกับการกระจายโหลดแอปเว็บ

❌ **[ผิด] Set up an AWS WAF behind your EC2 Instance.**
- **ทำไมถึงผิด:** WAF = กำแพงป้องกันแฮกเกอร์

❌ **[ผิด] Set up an S3 Cache in front of the EC2 instance.**
- **ทำไมถึงผิด:** S3 เป็นที่เก็บไฟล์รูปภาพ ไม่ได้มีระบบ "Cache" ตั้งหน้าบ้านช่วยโหลด (ระบบ Cache ของ AWS คือ Amazon CloudFront หรือ ElastiCache นู้น)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 3: ข้อ 11 - 15)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 11
**โจทย์:**
A music publishing company is building a multitier web application that requires a key-value store which will save the document models. Each model is composed of band ID, album ID, song ID, composer ID, lyrics, and other data. The web tier will be hosted in an Amazon ECS cluster with AWS Fargate launch type.

Which of the following is the MOST suitable setup for the database-tier?

**ตัวเลือก:**
- [ ] Use Amazon WorkDocs to store the document models.
- [ ] Launch an Amazon RDS database with Read Replicas.
- [ ] Launch an Amazon Aurora Serverless database.
- [x] Launch a DynamoDB table.

---
### 🎯 โจทย์ต้องการอะไร?
พัฒนาระบบคลังเพลงรูปแบบ Multitier Web โดยต้องการ **ฐานข้อมูล (Database)** ที่รองรับการเก็บโครงสร้างข้อมูลแบบ **Key-value store** (ดึงกุญแจแล้วพ่วงหีบสมบัติ) เพื่อเก็บเอกสารต่างๆ นานา เช่น รหัสนักร้อง, ลิขสิทธิ์เพลง, เนื้อเพลง (Lyrics) ฯลฯ โครงสร้างไม่ตายตัว

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: แทบไม่ต้องอ่านจบประโยค เจอหน้าตาคำว่า **`key-value store`** หรือ **`document store`** เมื่อไหร่ในข้อสอบ ให้หลับตากากบาทตอบ **`Amazon DynamoDB`** ทันทีล้านล้านเปอร์เซ็นต์!
- ทริคที่ 2: ถ้าเจอช้อยส์แนว **`Amazon RDS`** หรือ **`Amazon Aurora`** ให้ตัดทิ้งเลย เพราะพวกนี้คือฐานข้อมูลโลกเก่าแบบ **Relational (ตารางคอลัมน์ Excel ล้วนๆ)** ไม่ใช่ Key-value store (NoSQL)
- ทริคที่ 3: **`Amazon WorkDocs`** คือ Dropbox ฉบับอเมซอน เอาไว้ให้พนักงานโยนไฟล์ Word, PDF แชร์กันในทีม ไม่ใช่ฐานข้อมูลระบบ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch a DynamoDB table.**
- **ทำไมถึงถูก:** DynamoDB คือสุดยอดฐานข้อมูล NoSQL แบบครอบจักรวาลบน AWS ที่ออกแบบมาสนับสนุนโหมด "Key-value" และ "Document models" โดยตรง ข้อมูลทรงอิสระอย่างเนื้อเพลง หรือข้อมูลหลวมๆ ก็โกยยัดลงไปได้เลย

❌ **[ผิด] Launch an Amazon RDS database with Read Replicas.**
- **ทำไมถึงผิด:** RDS เป็น SQL แบบเก่า (Relational table) รูปแบบตาราง Fix ขอบเขตพังทลายถ้าโครงสร้างข้อมูลดิ้นไปดิ้นมา

❌ **[ผิด] Launch an Amazon Aurora Serverless database.**
- **ทำไมถึงผิด:** เหมือนข้อบน Aurora เป็น MySQL/PostgreSQL ธีมขี่จรวด (Relational Engine) ไม่ใช่สาย Key-value เอาไปใส่โครงสร้างตามโจทย์ไม่ได้

❌ **[ผิด] Use Amazon WorkDocs to store the document models.**
- **ทำไมถึงผิด:** แม้โจทย์จะล่อลวงด้วยคำว่า "document models" แต่ WorkDocs เป็นคล้ายๆ Google Drive เก็บสางงานเอกสารออฟฟิศ ไม่เกี่ยวกับโปรแกรมจัดเก็บแบบ Database Engine

---
---

## 📌 คำถามที่ 12
**โจทย์:**
A multinational company currently operates multiple AWS accounts to support its operations across various branches and business units. The company needs a more efficient and secure approach in managing its vast AWS infrastructure to avoid costly operational overhead.

To address this, they plan to transition to a consolidated, multi-account architecture while integrating a centralized corporate directory service for authentication purposes.

Which combination of options can be used to meet the above requirements? (Select TWO.)

**ตัวเลือก:**
- [ ] Establish an identity pool through Amazon Cognito and adjust the AWS IAM Identity Center settings to allow Amazon Cognito authentication.
- [x] Integrate AWS IAM Identity Center with the corporate directory service for centralized authentication. Configure a service control policy (SCP) to manage the AWS accounts.
- [ ] Utilize AWS CloudTrail to enable centralized logging and monitoring across all AWS accounts.
- [ ] Set up a new entity in AWS Organizations and configure its authentication system to utilize AWS Directory Service directly.
- [x] Implement AWS Organizations to create a multi-account architecture that provides a consolidated view and centralized management of AWS accounts.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมี **หลาย AWS Account (multiple AWS accounts)** จัดการยากมาก เสียค่าใช้จ่ายค่ากุญแจบำรุงแพง
ต้องการรวบรวมบัญชีลูกๆทั้งหมดให้แน่นแฟ้นขึ้น (consolidated, multi-account architecture) และทำให้ **ล็อกอินที่เดียวแล้วข้ามทะลุประตูไปยังแอคเคาท์อื่นๆ ได้ด้วย (integrate corporate directory service)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์อยากผนึกรวมรวบยอดบิลบัญชีมหาศาล **`consolidated, multi-account`** หรือรวบบิลการเงิน = **`AWS Organizations`** คือแกนกลางที่จะขาดไปไม่ได้! 
- ทริคที่ 2: ถ้าต้องการ "หน้าล็อกอินศูนย์กลางของบริษัท" (หน้า Single Sign-On เข้าสู่ระบบหลายๆ Account) หรือคีย์เวิร์ด **`centralized authentication`** = บริการที่รับจบคือ **`AWS IAM Identity Center (สืบทอดร่างจาก SSO)`** ซึ่งมันมาคู่ครองกับการสร้างนโยบายเด็ดขาดลบล้างทุกบิลอย่าง **`Service Control Policy (SCP)`** 
- ทริคที่ 3: เห็นคำว่า **`Amazon Cognito`** ให้ตัดทิ้ง! เพราะ Cognito สร้างหน้าล็อกอินให้ "ลูกค้าภายนอก (Customer/Users)" เช่น ล็อกอินด้วย Google/Facebook เข้าแอป ไม่ใช่เอาไว้รวมบัญชี Active Directory ของพนักงานในบริษัทหลังบ้าน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Implement AWS Organizations to create a multi-account architecture that provides a consolidated view and centralized management of AWS accounts.**
- **ทำไมถึงถูก:** จัดระเบียบเมืองหลวงด้วย AWS Organizations จับรวม Account สาขาย่อยเข้าด้วยกัน รวมบิลค่าใช้จ่าย และคุมภาพรวมได้จากยอดหอคอยบัญชีแม่

✅ **[ถูกต้อง] Integrate AWS IAM Identity Center with the corporate directory service for centralized authentication. Configure a service control policy (SCP) to manage the AWS accounts.**
- **ทำไมถึงถูก:** ใช้ท่า IAM Identity Center (ชื่อเก่า AWS SSO) ต่อด้ายแดงกับหลังบ้านบริษัท (Active directory) ทำให้พนักงานคีย์รหัสรอบเดียว เลือกกระโดดเข้าได้นับร้อย Account หน้าบ้าน พร้อมบวกกฎเหล็กอำนาจสูงสุดของ AWS อย่าง "SCP (Service control policy)" คุมกำเนิดพฤติกรรมแปลกๆ ได้อย่างอยู่หมัด

❌ **[ผิด] Establish an identity pool through Amazon Cognito...**
- **ทำไมถึงผิด:** Cognito ไว้รองรับลูกค้าปาร์ตี้ภายนอก (B2C Logins) ไม่ใช่งานขององค์กร (B2E หรือ Single Sign-On บัญชีบริษัท)

❌ **[ผิด] Set up a new entity in AWS Organizations... utilize AWS Directory Service directly.**
- **ทำไมถึงผิด:** AWS Directory Service คือ Active Directory บน Cloud ซึ่งเอาไปดึงต่อเป็นหน้าประตูไม่ได้ตรงๆ มันต้องเอา IAM Identity Center มายืนขวางหน้าเป็นตัวกลางกระจายคำขออยู่ดี 

❌ **[ผิด] Utilize AWS CloudTrail to enable centralized logging and monitoring...**
- **ทำไมถึงผิด:** CloudTrail เป็นกล้องวงจรปิดดัก Log เก็บประวัติขี้ไคลคนว่าใครกดลบทรัพยากร ไม่ได้เกี่ยวข้องกับการสร้าง SSO Authentication ให้แอดมินตามที่โจทย์ถามเลย

---
---

## 📌 คำถามที่ 13
**โจทย์:**
A business has a network of surveillance cameras installed within the premises of its data center. Management wants to leverage Artificial Intelligence to monitor and detect unauthorized personnel entering restricted areas. Should an unauthorized person be detected, the security team must be alerted via SMS.

Which solution satisfies the requirement?

**ตัวเลือก:**
- [x] Use Amazon Kinesis Video Streams to stream live feeds from the cameras. Use Amazon Rekognition to detect unauthorized personnel. Set the phone numbers of the security team as subscribers to an Amazon SNS topic.
- [ ] Configure Amazon Elastic Transcoder to stream live feeds from the cameras. Use Amazon Kendra to detect authorized personnel. Set the phone numbers of the security team as subscribers to an Amazon SNS topic.
- [ ] Utilize a custom containerized video processing application on Amazon Elastic Kubernetes Service (Amazon EKS). Integrate AWS App2Container (A2C) and Amazon SageMaker Autopilot to detect unauthorized personnel. Set the phone numbers of the security team as subscribers to an Amazon SNS topic.
- [ ] Set up Amazon Managed Service for Prometheus to stream live feeds from the cameras. Use Amazon Fraud Detector to detect unauthorized personnel. Set the phone numbers of the security team as subscribers to an Amazon SNS topic.

---
### 🎯 โจทย์ต้องการอะไร?
มีกล้องวงจรปิด (surveillance cameras) ยิงภาพติดห้องนิรภัย Data center
ผู้จัดการอยากเอาระบบ AI มาช่วยปัดกวาด **วิเคราะห์ใบหน้า (detect unauthorized personnel)** ในกล้องแบบสดๆ ว่ามีโจรเข้าไหม
ถ้าหน้าแปลกปลอมโผล่เข้ามาปุ๊ป ให้ส่ง **SMS เด้งเตือนทีมรักษาความปลอดภัย** ล็อคคอทันที!

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอคำว่า **`live stream`**, **`cameras`** หรือระบบการรับส่งภาพ/ข้อมูลรัวๆจากอุปกรณ์นอกบ้าน (IoT, Video) = ประตูทางเข้าข้อมูลหลักคือท่อลากสปีดจรวจอย่าง **`Kinesis`** แน่นอน! (และภาพวิดีโอต้องเข้าท่อ **`Kinesis Video Streams`**)
- ทริคที่ 2: พอเจอคีย์เวิร์ดบอกว่า AI แกะรอยวิเคราะห์**ใบหน้า, วัตถุ, คนร้าย** (detect, image, face) = ปรมาจารย์ด้านนี้ของ AWS มีคนเดียวบนหิ้งคือ **`Amazon Rekognition`**
- ทริคที่ 3: เจอคีย์เวิร์ดให้ส่ง **SMS แจ้งเตือนกระเป๋าโทรศัพท์ หรือ Email** (alerted via SMS) ย้ำอีกครั้ง หุ่นยนต์โทรโข่งนี้ชื่อว่า **`Amazon SNS`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon Kinesis Video Streams... Amazon Rekognition... Amazon SNS topic.**
- **ทำไมถึงถูก:** ทำงานเป็นฮีโร่ทีมอเวนเจอร์อย่างเพอร์เฟค! 1. ตั้งรับสูบน้ำสูบวีดีโอภาพด้วย Kinesis Video Streams 2. บีบคอฉายเข้าให้ระบบ AI (Rekognition) แสกนใบหน้าคน 3. โจรโพล่ปุ๊บ SNS กระจายส่ง SMS หาทีมวิสามัญทันที

❌ **[ผิด] Configure Amazon Elastic Transcoder... Use Amazon Kendra...**
- **ทำไมถึงผิด:** Elastic Transcoder มีไว้แค่บีบอัดแปลงไฟล์วิดีโอ (เช่น แปลง .mp4 เป็นฟอร์แมตมือถือ) ไม่ได้เก่งเรื่องดูด Live streaming และหนักสุดคือ "Kendra" มันคือระบบ Google Search ภายในองค์กร ไว้พิมพ์ค้นหาคำจากเอกสาร ไม่รู้วิชาจับใบหน้าคน

❌ **[ผิด] Utilize a custom containerized video processing application on Amazon Elastic Kubernetes Service... Integrate Amazon SageMaker Autopilot**
- **ทำไมถึงผิด:** ท่านี้คือท่ายากระดับตำนาน สั่งให้วิศวกรไปเขียนโค้ดตั้งเซิร์ฟเวอร์ยุ่งยากเอง (แถมส่ายหัวไปใช้บริการยึกยือหลายอย่าง) ในขณะที่ Kinesis + Rekognition มีให้คลิกซื้อใช้งานอัตโนมัติ 

❌ **[ผิด] Set up Amazon Managed Service for Prometheus... Use Amazon Fraud Detector**
- **ทำไมถึงผิด:** Prometheus เฝ้าดูสถิติกราฟของเครื่อง Server ไม่ได้มีไว้ถ่ายวิดีโอ ส่วน Fraud Detector ถนัดเรื่องดักการขโมยรูดบัตรเครดิตฉ้อโกง ธุรกรรมการเงินบนเน็ต ไม่ได้ไปจับผิดโจรหน้าบริษัทหน้ากล้อง!

---
---

## 📌 คำถามที่ 14
**โจทย์:**
An insurance company utilizes SAP HANA for its day-to-day ERP operations. Since they can’t migrate this database due to customer preferences, they need to integrate it with the current AWS workload in the VPC in which they are required to establish a site-to-site VPN connection.

What needs to be configured outside of the VPC for them to have a successful site-to-site VPN connection?

**ตัวเลือก:**
- [ ] A dedicated NAT instance in a public subnet
- [x] An Internet-routable IP address (static) of the customer gateway's external interface for the on-premises network
- [ ] The main route table in your VPC to route traffic through a NAT instance
- [ ] An EIP to the Virtual Private Gateway

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทยังใช้ระบบ SAP HANA ค้างเติ่งอยู่ที่ On-premises (ต่างถิ่นต่างสถานที่)... แต่ต้องการโยงสาย LAN ปลอมเข้ามาเสียบฝั่ง AWS หรือเจาะทะลุกันด้วยท่า **"Site-to-Site VPN Connection"** 
คำถามคือ: ไอ้อุปกรณ์ที่ตั้งหลบอยู่ **นอกวัง VPC (Outside of the VPC)** ต้องตั้งค่าสวิตช์เปิดอะไร ถึงจะเสกสายลับ VPN ติดกันได้?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การสร้าง Site-to-Site VPN มุดอุโมงค์เข้า AWS จะต้องจับปลาสองมือ ฝั่ง AWS (ในวังบ้านของคูคต) เรียกประตูนี้ว่า **`Virtual Private Gateway (VGW)`** และฝั่งออฟฟิศห่างไกล (นอกวัง-บนกะลามะพร้าวลูกค้า) เรียกประตูนี้ว่า **`Customer Gateway`**
- ทริคที่ 2: โจทย์ถามหาอุปกรณ์ "นอก VPC" (Outside VPC) ดังนั้นคือพูดถึงฝั่งของลูกค้าล้านเปอร์เซ็นต์! สิ่งที่คุณต้องเตรียมที่อุปกรณ์ Customer Gateway เพื่อคุยกับดวงจันทร์ AWS ให้รู้เรื่องก็คือ **การมี IP เป็นของตัวเองที่ชาวโลกเชื่อมต่อได้ หรือ Internet-routable IP address (Static IP นิ่งๆ 1 เบอร์)** 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] An Internet-routable IP address (static) of the customer gateway's external interface for the on-premises network**
- **ทำไมถึงถูก:** การจะตั้งป้อม Customer Gateway (CGW) ที่บริษัทเพื่อลากสาย VPN เข้า AWS ตัวป้อมบริษัทจำเป็นต้องมี IP Address แจกจ่ายจดทะเบียนสาธารณะ (Static IP) เพื่อให้ AWS มองเห็นหน้าบ้านและผูกอุโมงค์ VPN หากันได้

❌ **[ผิด] A dedicated NAT instance in a public subnet**
- **ทำไมถึงผิด:** NAT Instance เอาไว้ให้ EC2 ตัวน้อยๆ โยงเน็ตแอบดูดข้อมูลจากโลกกว้าง (ไม่มีส่วนเกี่ยวข้องกับการจัดทำอุโมงค์ VPN ข้ามรัฐ)

❌ **[ผิด] The main route table in your VPC to route traffic through a NAT instance**
- **ทำไมถึงผิด:** อันนี้ก็ท่า NAT อยู่ดีครับ ไม่เกี่ยวกับ Site-To-Site VPN (VGW/CGW) 

❌ **[ผิด] An EIP to the Virtual Private Gateway**
- **ทำไมถึงผิด:** Virtual Private Gateway ไม่ต้องให้เราไปดลบันดาลเจาะรูใส่ EIP (Elastic IP) แปะหน้าต่างให้มันเลย AWS จัดการเสกให้เสร็จสรรพใต้อุโมงค์

---
---

## 📌 คำถามที่ 15
**โจทย์:**
A company is building an internal application that allows users to upload images. Each upload request must be sent to Amazon Kinesis Data Streams for processing before the pictures are stored in an Amazon S3 bucket.

The application should immediately return a success message to the user after the upload, while the downstream processing is handled asynchronously. The processing typically takes about 5 minutes to complete.

Which solution will enable asynchronous processing from Kinesis to S3 in the most cost-effective way?

**ตัวเลือก:**
- [x] Use Kinesis Data Streams with AWS Lambda consumers to asynchronously process records and write them to S3.
- [ ] Use a combination of AWS Lambda and Step Functions to orchestrate service components and asynchronously process the requests.
- [ ] Send data from Kinesis Data Streams to Amazon Data Firehose and configure it to deliver directly to S3.
- [ ] Use a combination of Amazon SQS to queue the requests and then asynchronously process them using On-Demand Amazon EC2 Instances.

---
### 🎯 โจทย์ต้องการอะไร?
ผู้ใช้อัปโหลดรูป ส่งคำขอเข้าไปนอนกองกันที่ **Amazon Kinesis Data Streams**
โจทย์ต้องการ: 
1. เมื่อผู้ใช้โยนรูปเสร็จปุ๊ป หน้าเว็บต้องเด้งข้อความโชว์ **"สำเร็จ!" (Return a success message immediately)** ไม่ให้คนรอนาน 
2. งานที่เหลือให้ทำอยู่ท่อข้างหลังม่าน (Asynchronous) ซึ่งปั่นประมวลผลประมาณ **5 นาที** แล้วค่อยทะลักส่งเข้าโกดังเก็บภาพสุดท้าย **Amazon S3** 
อยากได้ท่าที่ **คุ้มค่ากระเป๋าตังค์มากที่สุด (Most cost-effective)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การประมวลผลข้างหลังม่านแบบงุบงิบๆ 5 นาที (สั้นๆ ไม่เกิน 15 นาที แถมกินเงินทีละกระจึ๊ก) คู่หูพระรองแห่งชาติตลอดการที่ตามจับมือกันมาทุกยุคทุกสมัยของ AWS คือ **`AWS Lambda`** (Lambda รองรับการดึงข้อมูลจากแกนกลาง Kinesis มาแสกนต่อได้สบายๆ แบบ Serverless ไม่เปลืองพัดลม)
- ทริคที่ 2: ถ้าเจอช้อยส์ให้ไปเช่า **`Amazon EC2 Instances`** ทำงานแบ็คกราว = ตัดทิ้งทันที! (เซิร์ฟเวอร์ EC2 เปิดแช่ทิ้งไว้กินไฟเปล่าๆแพงบรรลัยกัลป์ ไม่เป็นมิตรกับโจทย์ที่ร้องหาว่า Cost-effective ที่สุด)
- ทริคที่ 3: เห็นคีย์เวิร์ดมาแต่ไกลว่า **`Step Functions`** พ่วงมาด้วย = มันแพงขึ้นแน่นอน เพราะ Step Functions คิดเงินหยุมหยิมตอนส่งงานซอยเล็กซอยน้อย (ไม่ค่อยเหมาะกับงานล้างรูปตรงๆ จาก Kinesis ที่ Lambda เหมาทำเองไหวหมดเปลือก)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Kinesis Data Streams with AWS Lambda consumers to asynchronously process records and write them to S3.**
- **ทำไมถึงถูก:** พระเอกสุดๆ! Kinesis วางคิวรับคำอัปโหลดมา ส่งไม้ผลัดปลุกให้ฝูงซอมบี้ช่างปั้น AWS Lambda ตื่นขึ้นมารับช่วงยำภาพ 5 นาทีแบบ Asynchronous แถม Lambda เก็บตังค์แค่ตอนมันตื่น 5 นาทีนั้นเป๊ะๆ คุ้มสุดชีวิต ก่อนคายไฟล์ผลงานแพ็คห่อวางลงบน S3

❌ **[ผิด] Use a combination of AWS Lambda and Step Functions...**
- **ทำไมถึงผิด:** Step Functions เป็นบริการสั่งการออเกสเตชันที่เพิ่มขั้นบันไดชิ้นงานให้แพงขึ้นโดยใช่เหตุ การเชื่อมท่อ Kinesis ไปหา Lambda ไม่จำเป็นต้องอ้อมโลกไปเรียกนายแบบ Step Functions ให้วุ่นวาย

❌ **[ผิด] Use a combination of Amazon SQS to queue the requests and then asynchronously process them using On-Demand Amazon EC2 Instances.**
- **ทำไมถึงผิด:** โจทย์บังคับปูพรหมมาล่วงหน้าว่า "ส่งเข้าท่อ Kinesis" แต่เอ็งแหกด่านจะไปเข้าท่อใหม่ SQS เฉย! แถมเอาไปปั่นกับ EC2 มันจ่ายแพงอ้วกแตกแบบรายชั่วโมง (ขัดกับคำว่า Cost-effective)

❌ **[ผิด] Send data from Kinesis Data Streams to Amazon Data Firehose and configure it to deliver directly to S3.**
- **ทำไมถึงผิด:** Data Firehose โหดมากในการโหลดกวาดทิ้งใส่หลุม S3 ทันที แต่มัน "ห่วยแตก" และไม่ยืดหยุ่นถ้าจะใช้เล่นทริกประมวลผลแปลกๆ ยาวนาน 5 นาทีก่อนย้ายของเข้าตู้ (Firehose มักมีเวลาหนืดบดบังคับแค่เสี้ยวบีบอัด ไม่ยืดหยุ่นเท่าจับ Lambda ล้วนๆ)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 4: ข้อ 16 - 20)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 16
**โจทย์:**
Both historical records and frequently accessed data are stored on an on-premises storage system. The amount of current data is growing at an exponential rate. As the storage’s capacity is nearing its limit, the company’s Solutions Architect has decided to move the historical records to AWS to free up space for the active data.

Which of the following architectures deliver the best solution in terms of cost and operational management?

**ตัวเลือก:**
- [x] Use AWS DataSync to move the historical records from on-premises to AWS. Choose Amazon S3 Glacier Deep Archive to be the destination for the data.
- [ ] Use AWS Storage Gateway to move the historical records from on-premises to AWS. Choose Amazon S3 Glacier Deep Archive to be the destination for the data.
- [ ] Use AWS Storage Gateway to move the historical records from on-premises to AWS. Choose Amazon S3 Glacier to be the destination for the data. Modify the S3 lifecycle configuration to move the data from the Standard tier to Amazon S3 Glacier Deep Archive after 30 days.
- [ ] Use AWS DataSync to move the historical records from on-premises to AWS. Choose Amazon S3 Standard to be the destination for the data. Modify the S3 lifecycle configuration to move the data from the Standard tier to Amazon S3 Glacier Deep Archive after 30 days.

---
### 🎯 โจทย์ต้องการอะไร?
ฮาร์ดดิสก์ที่บริษัทใกล้จะเต็มแล้ว เลยต้องการย้ายไฟล์ **"ข้อมูลเก่าๆ ที่ไม่ค่อยได้ใช้ (historical records)"** ขึ้นไปอยู่เก็บบนคลาวด์ AWS เพื่อคืนพื้นที่ว่างให้บริษัท 
ต้องการวิธีที่ **ประหยัดที่สุด (cost) และจัดการง่ายสุด (operational management)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าต้องทำการ "ย้ายบ้าน/ลากขนไฟล์" ปริมาณมากๆ จากออฟฟิศ (On-premise) ทิ้งขึ้นคลาวด์ถาวร เครื่องมือขนย้ายซิ่งสุดคือ **`AWS DataSync`** (ส่วน `Storage Gateway` เอาไว้ทำสาขาต่อเชื่อมกันแบบ Hybrid ใช้ค้างคู่ขนาน ไม่ได้เน้นขนย้ายทิ้งรวดเดียว)
- ทริคที่ 2: พอเป็นการเก็บ "ข้อมูลเก่า/คลังเก็บถาวร (Archive / Historical)" = ต้องเข้าโกดังห้องเย็นที่ราคาถูกที่สุด ซึ่งก็คือ **`Amazon S3 Glacier Deep Archive`** เสมอ!
- ทริคที่ 3: ระวังตัวหลอกที่บอกให้โยนเข้าถัง "S3 Standard" ก่อน แล้วรอตั้งกฎ Lifecycle 30 วันค่อยย้ายไปห้องเย็น -> *มันเสียเวลาและเปลืองเงินพรีเมียม 30 วันแรก!* DataSync มันเก่งพอที่จะเล็งป้ายปลายทาง ยิงข้อมูลมุดเข้าห้องเย็น S3 Glacier Deep Archive ได้โดยตรงเลยตั้งแต่เริ่มจ้าา

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS DataSync to move the historical records from on-premises to AWS. Choose Amazon S3 Glacier Deep Archive to be the destination for the data.**
- **ทำไมถึงถูก:** เวิร์คที่สุดและถูกที่สุดตามโจทย์ต้องการ ให้รถพ่วง AWS DataSync ซิ่งขนข้อมูลเก่าจากออฟฟิศ วิ่งทะลุส่งดิ่งตรงเข้าไปแช่แข็งใน S3 Glacier Deep Archive เลย (ไม่ต้องผ่าน S3 ชั้นอื่นให้เสียเงินแพงๆ)

❌ **[ผิด] Use AWS Storage Gateway... Choose Amazon S3 Glacier Deep Archive to be the destination for the data.**
- **ทำไมถึงผิด:** แสตนด์บาย Storage Gateway ไว้มันเปลืองและผิดจุดประสงค์ครับ ระบบนี้มันเอาไว้ "Cache ไฟล์ใช้งานบ่อยให้อยู่ที่ออฟฟิศ" ไม่ใช่เอามาเป็นรถถ่ายโอนส่งข้อมูลเก่าขึ้นโกดัง

❌ **[ผิด] Use AWS DataSync... Choose Amazon S3 Standard... Modify the S3 lifecycle configuration to move... after 30 days.**
- **ทำไมถึงผิด:** ท่านี้คือท่ายืดตังค์เปล่าๆ ต้องไปจ่ายเงินตั้งแพงกักข้อมูลประเคนบน S3 Standard ก่อนตั้ง 1 เดือน แล้วค่อยลดรูปเข้า Glacier Deep Archive (DataSync มันมุดเข้า Deep Archive เลยได้ จะอ้อมโลกทำไม)

❌ **[ผิด] Use AWS Storage Gateway... Modify the S3 lifecycle configuration... after 30 days.**
- **ทำไมถึงผิด:** เจ็บซ้ำซ้อน ทั้งผิดที่ใช้ Storage Gateway และทั้งผิดที่แวะพักของ 30 วันให้เปลืองเงิน

---
---

## 📌 คำถามที่ 17
**โจทย์:**
A startup has multiple AWS accounts that are assigned to its development teams. Since the company is projected to grow rapidly, the management wants to consolidate all of its AWS accounts into a multi-account setup. To simplify the login process on the AWS accounts, the management wants to utilize its existing directory service for user authentication

Which combination of actions should a solutions architect recommend to meet these requirements? (Select TWO.)

**ตัวเลือก:**
- [x] Configure AWS IAM Identity Center (AWS Single Sign-On) for the organization and integrate it with the company’s directory service using the Active Directory Connector
- [ ] On the master account, use AWS Organizations to create a new organization with all features turned on. Enable the organization’s external authentication and point it to use the company’s directory service.
- [ ] Create an identity pool on Amazon Cognito and configure it to use the company’s directory service. Configure AWS IAM Identity Center (AWS Single Sign-On) to accept Cognito authentication.
- [ ] Create Service Control Policies (SCP) in the organization to manage the child accounts. Configure AWS IAM Identity Center (AWS Single Sign-On) to use AWS Directory Service.
- [x] On the master account, use AWS Organizations to create a new organization with all features turned on. Invite the child accounts to this new organization.

---
### 🎯 โจทย์ต้องการอะไร?
จะจัดระเบียบองค์กร มีเงื่อนไขหลัก 2 ข้อ:
1. การบริหารบัญชี: รวบหลายๆ **AWS Accounts** หมัดรวมกันเป็นก้อนเดียวเพื่อดูแล 
2. การล็อกอิน: ต้องการให้พนักงาน **ล็อกอินครั้งเดียวแล้วเข้าได้ทุก Accounts (simplify login)** โดยอนุญาตให้เอา "พาสเวิร์ดของบริษัท (existing directory service)" มาเสียบใช้เชื่อมต่อกันได้เลย 

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การรวมกันเป็นปึกแผ่นหลายแอคเคาท์ (consolidate / multi-account) = คือหน้าที่ของ **`AWS Organizations`** ทันทีแบบไม่ต้องลุ้น!
- ทริคที่ 2: ระบบที่ให้ล็อกอินเบอร์เดียวเปิดทะลุได้ทุกตึกในโปรแกรมตระกูล AWS Account (SSO) ปัจจุบันชื่อบริการนี้เรียกว่า **`AWS IAM Identity Center`** (ชื่อเก่า AWS SSO)
- ทริคที่ 3: แล้ว IAM Identity Center มันจะไปรู้รหัสผ่านแอดมินบริษัทได้ยังไง? คำตอบคือมันต้องเสียบปลั๊กเชื่อมหาฐานข้อมูล On-prem ของสำนักงาน ด้วยปลั๊กพ่วงสายชาร์จที่ชื่อ **`Active Directory Connector`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] On the master account, use AWS Organizations to create a new organization with all features turned on. Invite the child accounts to this new organization.**
- **ทำไมถึงถูก:** (ตอบโจทย์ข้อแรกรวมบัญชี) สร้างสภากลาง AWS Organizations มารวมกัน เปิดใช้งานทุกฟีเจอร์แล้วส่งเทียบเชิญบัตรทองไปชวน Account เล็กๆ ในบริษัทเข้ามาสังกัดเดียวกัน

✅ **[ถูกต้อง] Configure AWS IAM Identity Center (AWS Single Sign-On)... integrate with the company’s directory service using the Active Directory Connector**
- **ทำไมถึงถูก:** (ตอบโจทย์ล็อกอินสะดวกรวมศูนย์) เอา AWS IAM Identity Center กางแผงเป็นหน้าประตูใหญ่ และใช้สายต่อ AD Connector ลากโยงไปซิงค์รหัสผ่านมาจากฐานข้อมูลของบริษัท พนักงานก็จะได้หน้าต่างล็อกอินพาสเวิร์ดเดิมเป๊ะ

❌ **[ผิด] On the master account, use AWS Organizations... Enable the organization’s external authentication...**
- **ทำไมถึงผิด:** เป็นประโยคเสกคาถามั่วๆ AWS Organizations ไม่มีปุ่มให้ตั้งค่า "external authentication" ด้วยตัวเอง វាต้องไปพึ่งตัวยืนพื้นคู่หูอย่าง IAM Identity Center เป็นคนทำต่างหาก

❌ **[ผิด] Create an identity pool on Amazon Cognito...**
- **ทำไมถึงผิด:** ลืม Cognito ไปได้เลย Cognito เค้าสร้างมาเตรียมให้แอพ B2C โลกภายนอกปาร์ตี้ ไม่ใช่เอามาเป็นป้อมพนักงานแอดมินออฟฟิศหลังบ้าน

❌ **[ผิด] Create Service Control Policies (SCP)... Configure AWS IAM Identity Center (AWS Single Sign-On) to use AWS Directory Service.**
- **ทำไมถึงผิด:** SCP มีเอาไว้สร้าง "กฎควบคุมสั่งห้ามทรัพยากร" ไม่ได้มีบทบาทเกี่ยวข้องกับการทำพาสเวิร์ดล็อกอิน (SSO) ใดๆ เลย แถมนี่ไปอ้างอิง AWS Directory Service มั่วๆ ด้วย (บริษัทเขามี Directory ของตัวเองอยู่แล้ว ไม่ต้องไปสร้างที่ AWS Directory Service ใหม่)

---
---

## 📌 คำถามที่ 18
**โจทย์:**
A company has a dynamic web app written in MEAN stack that is going to be launched in the next month. There is a probability that the traffic will be quite high in the first couple of weeks. In the event of a load failure, how can you set up DNS failover to a static website?

**ตัวเลือก:**
- [x] Use Route 53 with the failover option to a static S3 website bucket or CloudFront distribution.
- [ ] Add more servers in case the application fails.
- [ ] Duplicate the exact application architecture in another region and configure DNS weight-based routing.
- [ ] Enable failover to an application hosted in an on-premises data center.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังจะเปิดตัวแอปเว็บใหม่ กลัวว่าช่วงแรกคนจะแห่กันเข้ามาจนเว็บล่ม
โจทย์ถามตรงๆ: ถ้าเครื่องเซิร์ฟหลักโดนดึงปลั๊กตาย (load failure) จะหักเหพวงมาลัย DNS ให้มันสวิง **เปลี่ยนไปหาหน้าเว็บป้ายนิ่งๆ (DNS failover to a static website)** อย่าง "ขออภัย เว็บล่มแป้บ" ได้ยังไง?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ด **`DNS failover`** เมื่อไหร่ ไม่ต้องสืบ... พระเอกขี่ม้าขาวที่เล่นท่าเปลี่ยนป้ายโฆษณา DNS ได้คือ **`Amazon Route 53`** ตัวเดียวเท่านั้น
- ทริคที่ 2: โฮมออฟฟิศรับจบเรื่องหน้าเว็บนิ่งๆ ถึกๆทนแสนคน (static website) บน AWS ก็คือ **`Amazon S3`** (S3 Static Website Hosting) หรือหน้ากระจายเนื้อหาอย่าง **`Amazon CloudFront`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Route 53 with the failover option to a static S3 website bucket or CloudFront distribution.**
- **ทำไมถึงถูก:** เอา Route 53 ตั้งเป็นป้อมยามเปิดกฎ Failover หาก EC2 ดับชีพจรขาด ให้หักกระจับสลับทราฟฟิกชี้คนมุ่งหน้าไปอ่านแผ่นป้าย Static ที่ฝากไว้บนถัง S3 (หรือ CloudFront) ทันที (วิธีคล่าวๆ คือ Sorry page)

❌ **[ผิด] Add more servers in case the application fails.**
- **ทำไมถึงผิด:** ถ้าเครื่องจะเจ๊ง การดันเซิร์ฟเพิ่มตอนระบบมันเละไปแล้ว(ระบบหลุดไปแล้ว)ทำให้เกิดจังหวะเว็บ Down อยู่ดี ไม่ตอบโจทย์ DNS Failover ไปหาหน้า Static Page ตอนคับขันตามโจทย์ถาม

❌ **[ผิด] Duplicate the exact application architecture in another region and configure DNS weight-based routing.**
- **ทำไมถึงผิด:** การทำบ้านเสมือนสองเมกะโปรเจ็กต์ข้ามเมืองมันแพงโครตๆ แล้วกฎ Weighted มันลากสลับหน้ากันตลอดเวลา ไม่ได้เป็นหมวดรักษาความปลอดภัยตอนฝั่งหลักล่มแบบ "Failover"

❌ **[ผิด] Enable failover to an application hosted in an on-premises data center.**
- **ทำไมถึงผิด:** เราพยายามจะหนีออฟฟิศเก่าที่รับโหลดไม่กี่พันคนก็เดี้ยงไปคลาวด์ ถ้าหนีกลับไปออฟฟิศพังๆเพื่อรับคนตอนแอปล่มนี่คือตายหมู่ชัดๆ

---
---

## 📌 คำถามที่ 19
**โจทย์:**
A company is running a multi-tier web application farm in a virtual private cloud (VPC) that is not connected to their corporate network. They are connecting to the VPC over the Internet to manage the fleet of Amazon EC2 instances running in both the public and private subnets. The Solutions Architect has added a bastion host with Microsoft Remote Desktop Protocol (RDP) access to the application instance security groups, but the company wants to further limit administrative access to all of the instances in the VPC.

Which of the following bastion host deployment options will meet this requirement?

**ตัวเลือก:**
- [ ] Deploy a Windows Bastion host with an Elastic IP address in the public subnet and allow SSH access to the bastion from anywhere.
- [ ] Deploy a Windows Bastion host on the corporate network that has RDP access to all EC2 instances in the VPC.
- [ ] Deploy a Windows Bastion host with an Elastic IP address in the private subnet, and restrict RDP access to the bastion from only the corporate public IP addresses.
- [x] Deploy a Windows Bastion host with an Elastic IP address in the public subnet and allow RDP access to bastion only from the corporate IP addresses.

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินดูแลเซิร์ฟเวอร์ทั้งกรุ๊ปใน AWS ผ่านเครื่องกระโดดที่เรียกว่า **"Bastion host"** (เครื่องคอมเปิดหน้าจอ Windows RDP ให้แอดมินคุม) 
ปัญหาคือ: ปัจจุบันเปิดอ้าซ่าเกินไป บริษัทยั่งอยาก **จำกัดความปลอดภัยล้อมกรอบ (limit administrative access)** ให้คนเข้าเครืองหน้าด่าน Bastion โหดรัดกุมที่สุด ต้องตั้งค่าท่าไหน?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: สถานที่ตั้งของป้อมยามรับแขก **`Bastion Host (Jump Box)`** กฎสวรรค์จารึกไว้ว่า **มันต้องไปตั้งหล่อๆอยู่ใน `Public Subnet` เท่านั้นร้อยเปอร์เซ็นต์!** (เพื่อรับแขกแอดมินจากโลกภายนอก) ถ้าช้อยส์ขานบอกว่าเอาไปตั้งหลบใน ❌ `Private Subnet` หรือตั้งที่ ❌ `Corporate network (บ้านออฟฟิศเก่า)` ให้กากบาททิ้งด่วน!
- ทริคที่ 2: ความปลอดภัยขั้นสุด = บน Security Group ของเครื่องป้อมยาม Bastion **ห้ามเปิด Allow All (0.0.0.0/0) เด็ดขาด** แต่ต้องบล็อกล็อคระบุเจาะจงสายตรงแจก IP ให้ **เฉพาะไอพีบริษัทเท่านั้น (Only from corporate IP addresses)** ถึงจะมีสิทธิรีโมทเข้ามาหน้าจอ RDP 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Deploy a Windows Bastion host with an Elastic IP address in the public subnet and allow RDP access to bastion only from the corporate IP addresses.**
- **ทำไมถึงถูก:** ทำตามสูตรรักษาความน่าเชื่อถือทุกกระเบียดนิ้ว: เอาป้อมยาม Bastion สวมป้าย Elastic IP ดักหน้าทางเข้าวง `Public Subnet` ควบคู่กับการล็อคแม่กุญแจว่ายอมให้แค่ "IP ของฝั่งสำนักงานบริษัท" เท่านั้นนะ ที่จะรีโมท RDP ตีตั๋วทะลุหน้าจอเข้ามาได้

❌ **[ผิด] Deploy a Windows Bastion host with an Elastic IP address in the private subnet...**
- **ทำไมถึงผิด:** เอากล้องวงจรปิดป้อมยามหน้าด่านไปวางหลบในถ้ำ `Private Subnet` แอดมินอยู่นอกถ้ำจะกระโดดเข้าไปคุมยังไงวะคร้าบบบบ (มันรับคอนเน็คชั่นตรงจากเน็ตไม่ได้)

❌ **[ผิด] Deploy a Windows Bastion host with an Elastic IP address in the public subnet and allow SSH access to the bastion from anywhere.**
- **ทำไมถึงผิด:** ตกม้าตายสองซ้อน 1) มึงอนุญาตให้ใครในโลกก็ได้เข้ามา (from anywhere) จบเห่พังทลาย 2) โง่ปลดพอร์ตผิดด้วย ระบบบอกให้เสียบเข้า Windows แต่ดันไปเปิดช่องเชื่อมต่อตระกูลของ Linux (SSH) 

❌ **[ผิด] Deploy a Windows Bastion host on the corporate network...**
- **ทำไมถึงผิด:** Bastion เป็นแขกฝั่งคลาวด์ ต้องสร้างไว้ในบ้าน AWS สิ ไม่ใช่ไปเบ่งเครื่องบนพื้นตึกออฟฟิศตัวเอง

---
---

## 📌 คำถามที่ 20
**โจทย์:**
An online events registration system is hosted in AWS and uses ECS to host its front-end tier and an RDS configured with Multi-AZ for its database tier. What are the events that will make Amazon RDS automatically perform a failover to the standby replica? (Select TWO.)

**ตัวเลือก:**
- [x] Storage failure on primary
- [x] Loss of availability in primary Availability Zone
- [ ] Storage failure on secondary DB instance
- [ ] In the event of Read Replica failure
- [ ] Compute unit failure on secondary DB instance

---
### 🎯 โจทย์ต้องการอะไร?
ฐานข้อมูล **Amazon RDS** ถูกตั้งค่าไว้แบบคู่จิ้นคู่กู้ชีพ **"Multi-AZ" (Active/Standby)**
คำถาม: เหตุการณ์ภัยพิบัติรูปแบบไหนบ้างล่ะ ที่จะทำให้ Amazon RDS **กดปุ่มลั่นไกดีดระบบ สลับการขับเคลื่อน (Failover) ไปสิงร่างเครื่อง Standby ทันที?** (เลือก 2 เหตุผล)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ระบบสำรอง Multi-AZ จะทำงานสลับไม้ผลัดก็ต่อเมื่อ **"ตัวเอกขบวนหลัก (Primary)" โดนสอยร่วงเท่านั้น!** 
- ทริคที่ 2: ให้ไล่อ่านช้อยส์ แล้วหากาตัวที่มีสาเหตุความพังโยงว่า **`"on primary"`** (เช่น ฮาร์ดดิสก์หลักพัง ไฟดับโซนหลัก)
- ทริคที่ 3: ถ้าช้อยส์โผล่พยุงตระกูล **`secondary`** (ตัวรองพัง) หรือ **`Read Replica`** (ตัวอ่านแถมพัง) = เลิกสนใจได้เลย! ต่อให้เครื่องรองหรือเครื่องลูกมือระเบิดกระจุย ตัวเอก(Primary) ก็ยังยืนยิ้มกางโล่ให้บริการต่อไปตามปกติ ไม่มีวันลั่นไกสลับการทำงาน Failover เด็ดขาด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Loss of availability in primary Availability Zone**
- **ทำไมถึงถูก:** ถิ่นฐานศูนย์บัญชาการหลัก (Primary AZ) โดนไฟดับหรือตึกถล่ม RDS จะรู้ทันทีและหักสวิตช์เด้งไปใช้ฐานทัพรอง (Standby Replica) ทำหน้าที่แทน

✅ **[ถูกต้อง] Storage failure on primary**
- **ทำไมถึงถูก:** ฮาร์ดดิสก์ตัวแม่ที่ฐานหลัก (Primary) หมุนแล้วระเบิดจานแม่เหล็กพังเจ๊ง RDS จะสลับโยนงานข้ามเมืองทันที

❌ **[ผิด] Storage failure on secondary DB instance**
- **ทำไมถึงผิด:** ฮาร์ดดิสก์เครื่องสำรองเจ๊งช่างหัวมัน ขอแค่ตัวหลักรันได้ก็เพียงพอกับลูกค้า (ไม่ทำ Failover จ้า เดี๋ยว AWS จะแอบจัดการหาสาขาสำรองใหม่ให้เองเบื้องหลังเงียบๆ)

❌ **[ผิด] Compute unit failure on secondary DB instance**
- **ทำไมถึงผิด:** ซีพียูเครื่องสำรองดับ ก็ปล่อยมันดับไป ตัวหลักยังวิ่งฉิว ไม่สะดุด ไม่สลับร่าง

❌ **[ผิด] In the event of Read Replica failure**
- **ทำไมถึงผิด:** Read Replica แค่แบรนช์แยกไว้อ่านบิลเฉยๆ เสมือนพนักงานจดโน้ตแถม พนักงานหายไปก็ไม่ได้มีผลกระทบอะไรกับท่านประธาน (Primary) จึงไม่มีการสลับลั่นไก Failover เหมือน Multi-AZ คุมหลัก

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 5: ข้อ 21 - 25)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 21
**โจทย์:**
A company owns a photo-sharing app that stores user uploads on Amazon S3. There has been an increase in the number of explicit and offensive images being reported. The company currently relies on human efforts to moderate content, and it wants to streamline this process by using Artificial Intelligence to only flag images for review. For added security, any communication with its resources on its Amazon VPC must not traverse the public Internet.

How can this task be accomplished with the LEAST amount of effort?

**ตัวเลือก:**
- [ ] Use AWS Lambda to create custom image moderation logic. Deploy this Lambda function in a public VPC to ensure communication through the public Internet.
- [ ] Use Amazon Detective to detect images with graphic nudity or violence in S3. Ensure that all communications made by your AWS resources do not traverse the public Internet via the AWS Audit Manager service.
- [x] Use Amazon Rekognition to detect images with graphic nudity or violence in S3. Create an Interface VPC endpoint for Rekognition with the necessary policies to prevent any traffic from traversing the public Internet.
- [ ] Use an image classification model in Amazon SageMaker. Set up Amazon GuardDuty and connect it with SageMaker to ensure that all communications do not traverse the public Internet.

---
### 🎯 โจทย์ต้องการอะไร?
แอปแชร์รูปเจอคนมือบอนอัปภาพโป๊/รุนแรงลง S3 เต็มไปหมด ตอนนี้ใช้ "คนตาถลนเฝ้าจอ" จ้องรูปทีละแผ่น 
บริษัทอยากได้ **ระบบ AI** มาช่วยแสกนกรองรูปภาพอัตโนมัติ (streamline by using AI) โดยที่ **ใช้แรงเขียนโค้ดน้อยที่สุด (Least amount of effort)**
และมีกฎเหล็กความปลอดภัยคือ: การต่อสายดึงภาพไปแสกน **"ห้ามหลุดสายแลนโผล่ออกอินเทอร์เน็ตสาธารณะ" (must not traverse the public Internet)** เด็ดขาด

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าโจทย์ระบุให้แสกนภาพ **โป๊ (explicit), รุนแรง (violence), คัดกรองภาพ (moderate content, image)** พระเอก AI เรื่องภาพมีคนเดียวคือ **`Amazon Rekognition`** 
- ทริคที่ 2: ถ้าโจทย์บอกให้ลงทุนแรงน้อยที่สุด **(least effort)** ห้ามไปเขียนโค้ดสร้าง AI ด้วยตัวเองบน **`AWS Lambda`** หรือไปเทรนโมเดลตารางเองบน **`Amazon SageMaker`** เด็ดขาด! (Amazon Rekognition คือสำเร็จรูปสุด)
- ทริคที่ 3: เห็นคีย์เวิร์ดความปลอดภัย **`must not traverse the public Internet`** (ห้ามท่อแตะขอบเน็ตนอก) = ของวิเศษที่ใช้เจาะท่อดูดบริการ AWS สายลับดำดินมุดอยู่แต่ใต้วัง VPC ก็คือท่า **`VPC endpoint (หรือ Interface VPC endpoint/PrivateLink)`** เสมอ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon Rekognition to detect images with graphic nudity or violence in S3. Create an Interface VPC endpoint for Rekognition with the necessary policies to prevent any traffic from traversing the public Internet.**
- **ทำไมถึงถูก:** หยิบ Amazon Rekognition กระป๋องสำเร็จรูปมาโยนลงแสกนภาพโป๊ได้อย่างง่ายดายที่สุด (ประหยัดแรงสุด) แล้วร่ายมนต์สวม "Interface VPC endpoint" เจาะสายยางดำมุดดินให้ Rekognition จ๊วบดมภาพลับโดยไม่ต้องแง้มประตูหน้าบ้านให้ชาวอินเทอร์เน็ตเห็น

❌ **[ผิด] Use an image classification model in Amazon SageMaker. Set up Amazon GuardDuty...**
- **ทำไมถึงผิด:** เอา SageMaker มาตั้งเตาแก๊สอบพิซซ่า AI เทรนหุ่นยนต์เองจากศูนย์ เป็นท่ายากสุดๆ ฆ่าตัวตายชัดๆ ไม่เข้าแก๊ป least effort แต่อย่างใด และ GuardDuty เป็นตัวเฝ้าดูความปลอดภัยเฉยๆ ไม่ได้มีอำนาจเสกท่อเน็ตให้หลบมิดชิด (GuardDuty ≠ VPC Endpoint)

❌ **[ผิด] Use Amazon Detective to detect images... via AWS Audit Manager**
- **ทำไมถึงผิด:** เอายามเฝ้ารอยนิ้วมือสืบสวนคดี (Amazon Detective) ไปนั่งแสกนภาพโป๊... นี่คือคนละเรื่อง! Detective มีหน้าที่สืบคดีแฮกเกอร์เจาะเครือข่าย ไม่ได้ดึงหน้าคนในรูป

❌ **[ผิด] Use AWS Lambda to create custom image moderation logic. Deploy this Lambda function in a public VPC...**
- **ทำไมถึงผิด:** ให้โปรแกรมเมอร์แต่งโค้ดวิเคราะห์ภาพโป๊เองเหนื่อยลากเลือดเปล่าๆ แถมข้อสอบยังสะเพร่าบอกให้ "Deploy ออก Public VPC ทะลุเน็ตอ้าซ่าเลย" ซึ่งขัดกับกฎเหล็กของโจทย์ที่ห้ามเห็นเเดือนเห็นตะวัน!

---
---

## 📌 คำถามที่ 22
**โจทย์:**
A company hosts its web application on a set of Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer (ALB). The application has an embedded NoSQL database. As the application receives more traffic, the application becomes overloaded mainly due to database requests. The management wants to ensure that the database is eventually consistent and highly available.

Which of the following options can meet the company requirements with the least operational overhead?

**ตัวเลือก:**
- [ ] Change the ALB with a Network Load Balancer (NLB) to handle more traffic. Use the AWS Glue DynamoDB export connector to export data from Amazon DynamoDB to Amazon S3 for analytics periodically, and continue running the application’s NoSQL database on the EC2 instances.
- [x] Configure the Auto Scaling group to spread the EC2 instances across three Availability Zones. Use the AWS Database Migration Service (AWS DMS) with a replication server and an ongoing replication task to migrate the embedded NoSQL database to Amazon DynamoDB.
- [ ] Configure the Auto Scaling group to spread the EC2 instances across three Availability Zones. Configure replication of the NoSQL database on the set of EC2 instances to spread the database load.
- [ ] Change the ALB with a Network Load Balancer (NLB) to handle more traffic and integrate AWS Global Accelerator to ensure high availability. Configure replication of the NoSQL database on the set of EC2 instances to spread the database load.

---
### 🎯 โจทย์ต้องการอะไร?
แอปหน้าร้านรันบน EC2 มีจุดบอดคือ **มีฐานข้อมูล NoSQL ถูกฝังซ่อนติดแง็กอยู่ในเครื่อง EC2 เดียวกัน (embedded NoSQL database)** 
พอคนใช้เยอะปุ๊ป ฐานข้อมูลดึงสเปค EC2 จนพังยับเยิน ล่มรายวัน
ทำยังไงให้ระบบนี้ถึกทนระดับ **Highly available** และแก้ปัญหาเหนื่อยดูแล **(least operational overhead)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การฝัง (Embed) ฐานข้อมูลไว้ในพยาธิลำไส้ EC2 คือ "สิ่งชั่วร้ายขั้นสุด" ในมุมมอง Best Practice บนคลาวด์! ถ้าโจทย์เจอเคสนี้เมื่อไร หน้าที่ของคุณคือการจับมันผ่าตัดแยกชิ้นส่วน **"ย้ายมันออกไปซะ (Migrate) สู่บริการฐานข้อมูลแบบจัดการให้เลย (Managed database Service)"**
- ทริคที่ 2: ฐานข้อมูล NoSQL สำเร็จรูปตัวเทพที่สุดในจักรวาล AWS ที่ทนทาน (Highly available) คืองูยักษ์ **`Amazon DynamoDB`** 
- ทริคที่ 3: ย้ายของข้ามค่ายก็ต้องใช้ท่อน้ำเวทย์มนต์อย่าง **`AWS Database Migration Service (AWS DMS)`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure the Auto Scaling group to spread the EC2 instances across three Availability Zones. Use the AWS Database Migration Service (AWS DMS) with a replication server and an ongoing replication task to migrate the embedded NoSQL database to Amazon DynamoDB.**
- **ทำไมถึงถูก:** 1. กระจายโหลด EC2 (ตัวประมวลผลเพียวๆ) แตกสาขาไป 3 เมืองให้อยู่ทน (Three AZs). 2. สำคัญสุด: ต่อสายยาง DMS ดึงข้อมูลก้อนมะเร็งอุดตัน NoSQL จาก EC2 เดิม แล้วฉีดดริฟย้ายเข้าท่อใส่ DynamoDB ของใหม่ (ที่ดูแลตลอดยันแก่ตายให้แบบอัตโนมัติ ลดภาระแอดมิน - least operational overhead)

❌ **[ผิด] Configure the Auto Scaling group to spread the EC2 instances across three Availability Zones. Configure replication of the NoSQL database on the set of EC2 instances...**
- **ทำไมถึงผิด:** ไม่ได้แก้ปัญหาที่ต้นเหตุ! การดันเอา Database ไปก๊อปปี้วางโคลนนิ่งบน EC2 ตัวอื่นๆ ด้วย ยิ่งทำให้ชีวิตแอดมินนรกแตก ต้องมาอัปเดตแพตช์จูนสเตจพะรุงพะรังทุกเครื่อง (ซ้ำร้าย ขัดกับความ least overhead แบบรุนแรง)

❌ **[ผิด] Change the ALB with a Network Load Balancer (NLB)... integrate AWS Global Accelerator... Configure replication of the NoSQL database on the set of EC2...**
- **ทำไมถึงผิด:** บ้าบอคอแตก เปลี่ยนคนยามหน้าบ้านเป็น NLB ซะงั้น แถมประเคนติดปีก Global Accelerator อีก (แอปไม่ได้กะขายหมานโลก) แถมสุดเจ็บลึกยังดื้อดึงไปเก็บก้อนมะเร็ง NoSQL ยัดไส้ก๊อปปี้แช่ไว้ใน EC2 ต่อไป

❌ **[ผิด] Change the ALB with a Network Load Balancer (NLB)... Use AWS Glue DynamoDB export connector... continue running the application’s NoSQL database on the EC2 instances.**
- **ทำไมถึงผิด:** ก็ยังดักดานอยู่แต่จะดองเค็มฐานข้อมูลไว้ในก้อน EC2 อีกแล้ว (ไม่หนีตายพึ่งใบบุญ AWS DynamoDB ซะที)

---
---

## 📌 คำถามที่ 23
**โจทย์:**
A company wants to organize the way it tracks its spending on AWS resources. A report that summarizes the total billing accrued by each department must be generated at the end of the month.

Which solution will meet the requirements?

**ตัวเลือก:**
- [x] Tag resources with the department name and enable cost allocation tags.
- [ ] Tag resources with the department name and configure a budget action in AWS Budget.
- [ ] Use AWS Cost Explorer to view spending and filter usage data by Resource.
- [ ] Create a Cost and Usage report for AWS services that each department is using.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทอยากจัดระเบียบรายงานค่าสมาร์ทบิล AWS ตอนสิ้นเดือน 
อยากให้บิลใบเดียว สรุปแจกแจงแยกมาเลยว่า **"แผนกไหน (each department)" ใช้เงินผลาญต้นทุนไปเท่าไหร่บ้าง?**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การจะแยกบิลตามแผนก, ตามชื่อโปรเจ็กต์, ตามชื่อผู้ดูแล = เครื่องมือวิเศษอันเดียวใน AWS ที่ช่วยจดโพยคือการแปะป้ายตราประทับ **`Tags`** เข้ากับทุกทรัพยากร
- ทริคที่ 2: แต่แปะ Tags ธรรมดาบิลมันไม่ออกรายงานให้ คุณต้องกระโดดไปเปิดสวิตช์ฟีเจอร์ที่ชื่อว่า **`Cost allocation tags`** (ยอมให้ป้าย Tags นี้ กลายเป็นบัญชีแยกหมวดหมู่เงินในบิลรวมตอนสิ้นเดือน)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Tag resources with the department name and enable cost allocation tags.**
- **ทำไมถึงถูก:** ขั้นที่ 1: แปะป้าย EC2 ตัวนี้ "แผนกบัญชี", S3 ท่อนี้ "แผนกฝ่ายขาย" ขั้นที่ 2: เข้าไปเปิดตู้ "Cost allocation tags" ในหน้า Billing เพียงเท่านี้สิ้นเดือนบิลก็จะมีตารางแยกรหัสให้เลยว่าฝ่ายไหนล้างผลาญมากกว่ากัน

❌ **[ผิด] Tag resources with the department name and configure a budget action in AWS Budget.**
- **ทำไมถึงผิด:** ไปใช้ "AWS Budgets" ผิดที่ผิดเวลา Budgets เอาไว้ตั้งกระดิ่งเตือนภัยว่า "เห้ย! เดือนนี้มึงใช้เกินงบหมื่นนึงแล้วนะ เตือนด่วน!" ไม่ใช่มีหน้าที่คอยรวบสรุปยอดสรุปตอนม้วนใบเสร็จสิ้นเดือน

❌ **[ผิด] Use AWS Cost Explorer to view spending and filter usage data by Resource.**
- **ทำไมถึงผิด:** Cost Explorer เป็นกราฟเส้นดูรายวัน ฟิลเตอร์โง่ๆ ลอยๆ ได้นิดหน่อย แต่มันดูบิลแยกเจาะลึกทะลุ "แผนก (Department)" ไม่ได้ถ้าคุณไม่เปิด Tag คุมก่อน

❌ **[ผิด] Create a Cost and Usage report for AWS services that each department is using.**
- **ทำไมถึงผิด:** Cost and Usage report (CUR) ใบรับเสร็จแบบเจาะระเอียดยิบเป็นบรรทัด Excel แต่มันก็หน้ามืดแปะได้แค่ Service AWS (EC2, S3) ไม่สามารถเจาะหักเข้าเป็นบั้นท้าย "แผนก (Department)" ได้เลยถ้ามึงไม่แปะ Tag ช่วยให้มันดูทางก่อน

---
---

## 📌 คำถามที่ 24
**โจทย์:**
A company plans to conduct a network security audit. The web application is hosted on an Auto Scaling group of EC2 Instances with an Application Load Balancer in front to evenly distribute the incoming traffic. A Solutions Architect has been tasked to enhance the security posture of the company’s cloud infrastructure and minimize the impact of DDoS attacks on its resources.

Which of the following is the most effective solution that should be implemented?

**ตัวเลือก:**
- [ ] Configure Amazon CloudFront distribution and set an Application Load Balancer as the origin. Create a security group rule and deny all the suspicious addresses. Use Amazon SNS for notification.
- [x] Configure Amazon CloudFront distribution and set Application Load Balancer as the origin. Create a rate-based web ACL rule using AWS WAF and associate it with Amazon CloudFront.
- [ ] Configure Amazon CloudFront distribution and set a Network Load Balancer as the origin. Use VPC Flow Logs to monitor abnormal traffic patterns. Set up a custom AWS Lambda function that processes the flow logs and invokes Amazon SNS for notification.
- [ ] Configure Amazon CloudFront distribution and set a Network Load Balancer as the origin. Use Amazon GuardDuty to block suspicious hosts based on its security findings. Set up a custom AWS Lambda function that processes the security logs and invokes Amazon SNS for notification.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บฝูงบิน EC2 + ALB หน้าบ้านกำลังกลุ้มใจ เจอโจมตีกลั่นแกล้งยิงรัวเข้ามาถี่ๆ ถล่มให้เว็บล่ม (พฤติกรรมนี้เรียก **DDoS attacks**)
โจทย์ต้องการหาการตั้งค่าเกราะคุ้มกันที่ **มีประสิทธิภาพสูงที่สุด กรองคนร้ายออกไปได้เนียนๆ (most effective solution)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าพูดถึงการกันผีบ้า **`DDoS attacks`** ในระดับแอปพลิเคชัน ตัวกันชนหน้าบ้านที่ทนตีนที่สุดในโลกและควรมาพ่วงเสมอคือ **`Amazon CloudFront`** คู่กับยามเฝ้าประตู **`AWS WAF`**
- ทริคที่ 2: ผีบ้า DDoS ชอบยิงย้ำๆรัวๆ (Flood traffic) ฟีเจอร์ตัวแสบของ AWS WAF ที่จับโจรพวกนี้อยู่หมัดคือการสกัดจับความถี่ หรือที่เรียกว่า **`Rate-based rule`** (เช่น ตั้งกฎว่าถ้า IP นี้นิ้วเบียดปั้มคลิกเว็บกูเกิน 1,000 ครั้งใน 5 นาที กูกั้นมึงทิ้งออกนอกประตูทันที)
- ทริคที่ 3: **`VPC Flow Logs`** กับ **`Amazon GuardDuty`** เป็นแค่นักสืบมาส่องร่องรอยกล้องวงจรปิด "ดูความผิดปกติ" 但ไม่สามารถยกโล่เดินไปเตะก้านคอคนร้ายบล็อกโจรได้ "ด้วยตัวเอง" (ทำไม่ได้แบบ Real-time)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure Amazon CloudFront distribution and set Application Load Balancer as the origin. Create a rate-based web ACL rule using AWS WAF and associate it with Amazon CloudFront.**
- **ทำไมถึงถูก:** ครบสูตร! วางตัวแทงค์ CloudFront กันตะเบ็งโหลดหน้าบ้าน แล้วสวมปลอกคอตีตรา AWS WAF บังคับใช้กฎจำกัดความถี่คลิก (Rate-based rules) โจรใช้บอทปั้มถล่มเซิร์ฟหน้าไหนกดถี่เกินค่า WAF แฉลบเป่าหัวทิ้ง โหลดรัวๆกระจายหมดท่าไปเอง

❌ **[ผิด] Configure Amazon CloudFront... Create a security group rule and deny all the suspicious addresses...**
- **ทำไมถึงผิด:** ใครจะไปนั่งพิมพ์มือนิ้วหงิกกรอกบล็อคตัวเลข IP โจรทีละตัวลง Security Group ไหว (โจรแฮกมันมีร้อยหมื่นล้าน IP ทั่วโลก แถม IP มันปลอมพรางแฝงตัวตลอด) ไม่ practical สู้ WAF ตัดไฟอัตโนมัติก็ไม่ได้

❌ **[ผิด] Configure Amazon CloudFront... Use VPC Flow Logs to monitor abnormal traffic patterns. Set up a custom AWS Lambda function...**
- **ทำไมถึงผิด:** นั่งส่อง Flow Logs มันช้ากว่าจะเห็น กว่าจะดันโยนใส่ Lambda ไปวิเคราะห์ส่งไลน์เซฟตี้ ก็โดนเครื่องโจรปั่น DDoS ล่มเจ๊งเละคาตาไปแล้ว ไม่ใช่ Most effective (ไม่ใช่เกราะคุ้มชนแบบ Real-time inline แบบ WAF)

❌ **[ผิด] Configure Amazon CloudFront... Use Amazon GuardDuty to block suspicious hosts...**
- **ทำไมถึงผิด:** GuardDuty จับสืบอกคนร้ายได้จริง แต่ทำหน้าที่เตือนภัยเฉยๆ ไม่มีมือเท้าวิเศษไป "Block suspicious hosts (กันคนร้ายบล็อก)" ให้ระบบโดยอัตโนมัติ

---
---

## 📌 คำถามที่ 25
**โจทย์:**
A company has a cryptocurrency exchange portal that is hosted in an Auto Scaling group of EC2 instances behind an Application Load Balancer and is deployed across multiple AWS regions. The users can be found all around the globe, but the majority are from Japan and Sweden. Because of the compliance requirements in these two locations, you want the Japanese users to connect to the servers in the ap-northeast-1 Asia Pacific (Tokyo) region, while the Swedish users should be connected to the servers in the eu-west-1 EU (Ireland) region.

Which of the following services would allow you to easily fulfill this requirement?

**ตัวเลือก:**
- [x] Use Route 53 Geolocation Routing policy.
- [ ] Set up an Application Load Balancers that will automatically route the traffic to the proper AWS region.
- [ ] Use Route 53 Weighted Routing policy.
- [ ] Set up a new CloudFront web distribution with the geo-restriction feature enabled.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บเทรดคริปโต มีลูกค้าเยอะมากใน "ญี่ปุ่นและสวีเดน"
มันมีกฎเกณฑ์ของแต่ละประเทศบ้าบอเรื่องบังคับเก็บข้อมูลข้ามแดน (Compliance requirement)
โจทย์เลยสั่งบังคับแบบเผด็จการว่า: **"ถ้าลูกค้าญี่ปุ่นบินเข้าเว็บ ต้องชิ่งให้มันไปโผล่เซิร์ฟเวอร์ที่โตเกียว(Japan)เท่านั้น! และถ้าลูกค้าสวีเดนกดเข้า ต้องโดนขังให้ทะลุไปหาเซิร์ฟเวอร์ไอร์แลนด์(EU)เท่านั้น!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าข้อสอบชูมือบังคับเจาะจงล็อกให้คนเข้าเมืองหน้าบ้านตามขอบเขต **"สัญชาติผู้ใช้/ประเทศ/ทวีป (Geographic origin)"** เช่น บังคับคนไทยไปนี่ ฝรั่งหน้ายุโรปไปนู่น = การจัดฉากหน้าประตูด่านแรกต้องพึ่ง Route 53 โดยใช้เวทมนตร์กฎ **`Geolocation Routing Policy`** 
- ทริคที่ 2: อย่าหลงกลกับ **`CloudFront Geo-restriction`**! กฎนี้เอาไว้ "กางม่านบล็อก/ไล่ส่ง" ไม่ให้ประเทศโลกงูๆปลาๆเข้ามาดูซีรีย์เว็บเราเฉยๆ (Block list) มันไม่ได้มีหน้าที่ "เสิร์ฟรถแท็กซี่ชี้ทาง" โยนว่าประเทศไหนต้องวิ่งไปใช้ Region ใด
- ทริคที่ 3: **`Weighted Routing`** เป็นการแบ่งปันโยนคนหารกันสัดส่วน 50:50 เข้าเครื่องแรนด้อม ไม่สนใจสัญชาติใดๆ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Route 53 Geolocation Routing policy.**
- **ทำไมถึงถูก:** เป๊ะตามตำคัมภีร์! ตั้งป้ายชี้ทาง Route 53 Geolocation ว่า "ใคร IP ทะเบียนบ้านอยู่ญี่ปุ่น มึงต้องบังคับเลี้ยวขวาไปลงฐานทัพโตเกียวนะ ส่วนใครหัวทองติดป้ายสวีเดน มึงแวะซ้ายลงฐานไอร์แลนด์ไปเลย" (บังคับกฎหมายได้เนียนกริบ)

❌ **[ผิด] Set up an Application Load Balancers that will automatically route the traffic to the proper AWS region.**
- **ทำไมถึงผิด:** Load Balancer (ELB/ALB) มีแขนขาปลาหมึกกระจายโหลดได้แค่วนภายในป่าหิมพานต์ Region เดียวกัน (เช่น ข้ามกล่องตึก AZa ไป ตึก AZb) ไม่ใช่ตัวใหญ่พอที่จะถลาบินข้ามประเทศข้ามโลกเตะลูกค้ากระจายตู้มๆตามใจชอบได้

❌ **[ผิด] Use Route 53 Weighted Routing policy.**
- **ทำไมถึงผิด:** กฎคนละสายเลย Weighted มันแบ่งคิวชู๊ต 70-30 มั่วซั่ว ไม่ได้จับบัตรประชาชนแยกคนชาติต่างๆ 

❌ **[ผิด] Set up a new CloudFront web distribution with the geo-restriction feature enabled.**
- **ทำไมถึงผิด:** Geo-restriction (Geoblocking) เป็นกำแพงหิน ไล่ปิดรัวๆประเทศเกาหลีเหนือห้ามดูเว็บNetflixตูนะโว้ย ไม่ใช่ฟีเจอร์จราจรไล่ต้อนคนไปลงฐานเซิร์ฟเวอร์แบบนี้ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 6: ข้อ 26 - 30)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 26
**โจทย์:**
A media company wants to ensure that the images it delivers through Amazon CloudFront are compatible across various user devices. The company plans to serve images in WebP format to user agents that support it and return to JPEG format for those that don't. Additionally, the company wants to add a custom header to the response for tracking purposes.

As a solution architect, what approach would one recommend to meet these requirements while minimizing operational overhead?

**ตัวเลือก:**
- [ ] Create multiple CloudFront distributions, each serving a specific image format (WebP or JPEG). Route incoming requests based on the User-Agent header to the respective distribution using Amazon Route 53.
- [x] Configure CloudFront behaviors to handle different image formats based on the User-Agent header. Use Lambda@Edge functions to modify the response headers and serve the appropriate format.
- [ ] Generate a CloudFront response headers policy. Utilize the policy to deliver the suitable image format according to the User-Agent HTTP header in the incoming request.
- [ ] Implement an image conversion service on Amazon EC2 instances and integrate it with CloudFront. Use AWS Lambda functions to modify the response headers and serve the appropriate format based on the User-Agent header.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทส่งรูปภาพผ่าน CloudFront ให้ลูกค้าระดับโลก
ปัญหาคือ มือถือบางรุ่นอ่านไฟล์ภาพ `WebP` ได้ (ภาพชัดและเบา) บางรุ่นอ่านไม่ได้ต้องส่งภาพเก่า `JPEG` กลับไปให้
โจทย์ต้องการวิธี **เสิร์ฟภาพสลับนามสกุลไปมาให้ลูกค้าอัตโนมัติ (serve images in WebP or JPEG based on user agents)** และแถมด้วยการ **แปะป้าย Header พิเศษติดของกลับไปให้ลูกค้าด้วย (add a custom header to the response)** 
โดยทั้งหมดนี้ต้องเหนื่อยดูแลน้อยที่สุด (minimizing operational overhead)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าต้องปรับของแต่งของ "ก่อนเสิร์ฟให้ลูกค้า" หรือ "ก่อนเด้งเข้าเซิร์ฟเวอร์หลัก" แบบแนบเนียนที่หน้าเครือข่าย CDN (CloudFront) **ไม้ตายกระบวนท่าเดียวที่ทำเรื่องพวกนี้ได้คือ `Lambda@Edge` หรือ `CloudFront Functions`** เท่านั้น (เอาสคริปต์มาดักหน้าด่าน)
- ทริคที่ 2: โจทย์มีลูกเล่นสองต่อ คือ 1. เปลี่ยนนามสกุลภาพสดๆ (Serve appropriate format) 2. สอดไส้ Custom Header กลับไป ซึ่งการจะเขียนลอจิกซับซ้อนแก้ไขทั้ง Request/Response ได้เบ็ดเสร็จ ก็ต้องตกเป็นหน้าที่ของ `Lambda@Edge` อยู่ดี
- ทริคที่ 3: ระวังตัวหลอกที่บอกให้รัน "Image conversion บน EC2" อันนี้ล้าหลังและเหนื่อยลากเลือด (ขัดคีย์เวิร์ด minimizing operational overhead)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure CloudFront behaviors to handle different image formats based on the User-Agent header. Use Lambda@Edge functions to modify the response headers and serve the appropriate format.**
- **ทำไมถึงถูก:** เวิร์คและสมาร์ทที่สุด ให้ CloudFront คอยดมกลิ่น User-Agent (รุ่นมือถือ) จากนั้นโยนให้โค้ดจิ๋ว Lambda@Edge ที่ดักรออยู่ที่หน้าประตู ขนาบคู่ทำหน้าที่ 2 อย่างคือ: หยิบรูปภาพไฟล์ถูกนามสกุลให้ + แปะป้าย Custom Header ก่อนจะตีกลับส่งให้ลูกค้า (เร็วและไม่ต้องมีเซิร์ฟเวอร์หลังบ้านมารับกรรม)

❌ **[ผิด] Create multiple CloudFront distributions, each serving a specific image format (WebP or JPEG). Route incoming requests based on the User-Agent header...**
- **ทำไมถึงผิด:** มุกคนบ้า! สร้าง CloudFront แยกตัวนึงแจก WebP อีกตัวแจก JPEG แล้วให้ Route 53 มานั่งสลับคิว บ้าไปแล้วครับระบบพังวุ่นวายแน่นอนแถมเปลืองตังค์ยับเยิน ไม่ practical เลย

❌ **[ผิด] Generate a CloudFront response headers policy. Utilize the policy to deliver the suitable image format...**
- **ทำไมถึงผิด:** "Response headers policy" ของ CloudFront มันทำได้แค่เรื่องเบสิคคือ "หย่อน Header เพิ่ม/ซ่อน Header ทิ้ง" แต่ฟีเจอร์นี้ "ไม่มีปัญญา" ไปคิดลอจิกสลับไฟล์ภาพเปลี่ยนนามสกุล WebP/JPEG อะไรได้เลย (มันเป็นแค่ policy โง่ๆ ไม่ใช่โค้ดโปรแกรม)

❌ **[ผิด] Implement an image conversion service on Amazon EC2 instances...**
- **ทำไมถึงผิด:** ทำไมต้องขี่ช้างจับตั๊กแตนลาก EC2 มานั่งขยี้แปลงไฟล์ภาพด้วยตัวเองให้เปลืองค่าแรงดูแลล่ะ (ขัดกับ least/minimizing operational overhead สุดๆ) ใช้ Lambda@Edge สบายใจกว่าเยอะ

---
---

## 📌 คำถามที่ 27
**โจทย์:**
A solutions architect is designing a secure, cost-effective, and highly available storage solution for a company’s data. One of the requirements is to ensure that the previous version of a file is preserved and can be retrieved if a modified version is uploaded. Additionally, the company must comply with strict regulatory requirements that mandate data retention in an immutable state for at least 3 years before being moved to an archive. Once archived, the data will only be accessed once a year.

How should the solutions architect build the solution?

**ตัวเลือก:**
- [ ] Create an Amazon S3 Standard bucket and enable S3 Object Lock in governance mode.
- [ ] Create an Amazon S3 Standard bucket with object-level versioning enabled and configure a lifecycle rule that transfers files to S3 Glacier Deep Archive after 3 years.
- [ ] Create a One-Zone-IA bucket with object-level versioning enabled and configure a lifecycle rule that transfers files to Amazon S3 Glacier Deep Archive after 3 years.
- [x] Create an Amazon S3 Standard bucket, enable object-level versioning, and then enable S3 Object Lock in compliance mode. After that, configure a lifecycle rule to move the files to S3 Glacier Deep Archive after 3 years.

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการระบบเก็บไฟล์เอกสารที่มีเงื่อนไขเหล็ก 3 ข้อ:
1. ไฟล์โดนเซฟทับ **ต้องกู้เวอร์ชันเก่ากลับมาได้ (previous version is preserved)**
2. มีกฎหมายบังคับ **ห้ามลบ ห้ามแก้ไขเด็ดขาด เป็นเวลา 3 ปี (immutable state / strict regulatory)**
3. พอครบ 3 ปีปุ๊ป ให้ **ย้ายเข้าคลังเก็บของเก่าถาวรเลย** เพราะนานๆๆๆทีจะเปิดดู (accessed once a year)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การอนุรักษ์ไฟล์เวอร์ชั่นเก่าๆ เอาไว้เผื่อโดนเซฟทับ = ฟีเจอร์ **`S3 Versioning (object-level versioning)`**
- ทริคที่ 2: การสั่งแข็งไฟล์เป็นหิน ห้ามใครลบ ห้ามแก้ไข (ตามกฎหมาย/regulatory) = ฟีเจอร์ **`S3 Object Lock`** 
- ทริคที่ 3: `Object Lock` มี 2 โหมดจำให้ขึ้นใจ: 
  - **`Governance mode`** = ห้ามลบ แต่แอดมินใหญ่ใจดียังยอมให้รหัสพิเศษปลดล็อคได้ 
  - **`Compliance mode`** = โหมดโหดสัส! ล็อคตาย ห้ามลบแม้แต่พระเจ้าบัญชีหลัก(Root)ก็ลบไม่ได้ (นิยมใช้ตอบโจทย์พวกกฎหมาย/regulatory compliance)
- ทริคที่ 4: ย้ายเข้าโกดังประหยัดแช่แข็งสุดเหวี่ยง (เข้าถึงปีละครั้ง) = **`S3 Glacier Deep Archive`** เสมอ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon S3 Standard bucket, enable object-level versioning, and then enable S3 Object Lock in compliance mode. After that, configure a lifecycle rule to move the files to S3 Glacier Deep Archive after 3 years.**
- **ทำไมถึงถูก:** ครบองค์ประชุมเป๊ะ! เปิด S3 Versioning กันโดนเซฟทับ -> เปิด Object Lock ในโหมดโหดร้ายสุด (Compliance mode) เพื่อตรึงไฟล์เป็นศิลาแลง 3 ปีห้ามใครแหยมลบ -> และตั้งนาฬิกาปลุกโยนของแช่แข็งลง Glacier Deep Archive หลังจากผ่านพ้น 3 ปี

❌ **[ผิด] Create an Amazon S3 Standard bucket and enable S3 Object Lock in governance mode.**
- **ทำไมถึงผิด:** ผิด 2 จุด: 1) โหมด Governance อ่อนปวกเปียกไป แอดมินลบได้ ไม่ผ่านกฎหมายหรอก ต้องเป็น Compliance 2) ลืมช้อยส์เรื่องโยนของเข้าโกดังเก่า (Archive) ชะงั้น

❌ **[ผิด] Create an Amazon S3 Standard bucket with object-level versioning enabled and configure a lifecycle rule that transfers files to S3 Glacier Deep Archive after 3 years.**
- **ทำไมถึงผิด:** คุณพระ! ลืมใส่กุญแจ Object Lock (ปล่อยปะละเลยให้คนยังสามารถมือบอนกด Delete ไฟล์ทิ้งได้อยู่) แบบนี้ผิดกฎหมายบริษัทเต็มพิกัด

❌ **[ผิด] Create a One-Zone-IA bucket with object-level versioning enabled and configure a lifecycle rule...**
- **ทำไมถึงผิด:** นอกจากจะลืม Object Lock แล้ว ยังเอาข้อมูลสำคัญงวดนี้ไปเสี่ยงตายฝากไว้กับถังเกรดต่ำสุดอย่าง "One-Zone-IA" (เก็บที่เมืองเดียวรหัส AZ เดียว) ถ้าศูนย์นั้นไฟไหม้คือจบเห่! (โจทย์อยากได้ Highly available storage)

---
---

## 📌 คำถามที่ 28
**โจทย์:**
An accounting application uses an Amazon RDS database configured with Multi-AZ deployments to improve availability. What would happen to RDS if the primary database instance fails?

**ตัวเลือก:**
- [ ] The IP address of the primary DB instance is switched to the standby DB instance.
- [x] The canonical name record (CNAME) is switched from the primary to standby instance.
- [ ] A new database instance is created in the standby Availability Zone.
- [ ] The primary database instance will reboot.

---
### 🎯 โจทย์ต้องการอะไร?
ฐานข้อมูล **Amazon RDS** ทำท่าอมตะแยกร่างสำรองตีคู่ **"Multi-AZ"** เอาไว้
โจทย์ถามเชิงเทคนิคดื้อๆ: "ถ้าเครื่องตัวแม่ (Primary) หน้ามืดตายคาที่... กลไกเบื้องหลังที่ Amazon RDS จะสลับร่างกระตุกให้ตัว Standby ตื่นขึ้นมารับช่วงต่อนั้น **มันสลับกันด้วยวิธีไหน?**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเปลี่ยนพระเอกปุบปับของ RDS Multi-AZ เบื้องหลังนั้น **ไม่ได้เกิดจากการเปลี่ยน IP แต่อย่างใด** เพราะ IP มันผูกตายกับสายแลน (Subnet) ย้ายข้ามประเทศข้ามเมืองAZกันไม่ได้
- ทริคที่ 2: วิธีเวทมนตร์ที่ AWS ทำคือ "สับรางชื่อป้ายโดเมน" หรือที่เรียกว่า **`สลับ CNAME (Canonical Name record)`** (คือบอกลูกค้าทิศทางว่า จากเดิมคำว่า db.aws.com ชี้เข้าเครื่องหลัก ให้กระพริบดวงตาชี้เป้าใหม่ยิงไปหาเครื่อง Standby แทน)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The canonical name record (CNAME) is switched from the primary to standby instance.**
- **ทำไมถึงถูก:** เถรตรงตามตำราเลย RDS จะใช้กระบวนการชิ่งสลับป้ายตัวอักษร DNS (CNAME record) ให้เด้งสลัดปลายทางไปตกใส่เครื่อง Standby อย่างอัตโนมัติ โดยที่แอปหน้าบ้านยังคงเรียกชื่อฐานข้อมูลเดิมเสมอไม่เปลี่ยนแปลง

❌ **[ผิด] The IP address of the primary DB instance is switched to the standby DB instance.**
- **ทำไมถึงผิด:** ตามหลักเน็ตเวิร์ค คุณลอยเอา IP เลขเดิมข้ามตึกภูเขาบก(AZ)ไปแปะทับเครื่องก้อนใหม่ไม่ได้ IP มันฝังรากอยู่ที่ตึกใครตึกมัน

❌ **[ผิด] The primary database instance will reboot.**
- **ทำไมถึงผิด:** ข้าศึกบุกระเบิดโรงสีกระจุยไปแล้ว จะมาซ่อม Reboot เครื่องเก่านั่งตบยุงรอฟื้นหรอ? ไม่ใช่! ระบบฉลาดพอที่จะหันพวงมาลัย Failover ไปหาเครื่องสำรองที่ Standby สบายใจรออยู่แล้วทันที

❌ **[ผิด] A new database instance is created in the standby Availability Zone.**
- **ทำไมถึงผิด:** ของมันต้องมี! โหมด Multi-AZ คือคุณจ่ายตังค์สร้างเครื่องสำรองแสตนด์บายคู่ขนานเปิดทิ้งไว้อยู่ตลอดเวลาแล้ว ไม่ใช่พอบ้านไฟไหม้แล้วพึงจะค่อยตะเกียกตะกายไปสั่ง "สร้างเครื่องใหม่ตอนนั้นพอดี (Created new DB)" (มันจะก๊อปข้อมูลทันได้ไง) 

---
---

## 📌 คำถามที่ 29
**โจทย์:**
A start-up company that offers an intuitive financial data analytics service has consulted about its AWS architecture. The company has a fleet of Amazon EC2 worker instances that process financial data and then output reports used by its clients. The reports must be stored in a durable storage. The number of files to be stored can grow over time as the start-up company is expanding rapidly overseas, and thus, it also needs a way to distribute the reports faster to clients located across the globe.

Which of the following is a cost-efficient and scalable storage option for this scenario?

**ตัวเลือก:**
- [x] Use Amazon S3 as the data storage and Amazon CloudFront as the CDN.
- [ ] Use multiple EC2 instance stores for data storage and Amazon ElastiCache as the CDN.
- [ ] Use Amazon S3 Glacier as the data storage and Amazon ElastiCache as the CDN.
- [ ] Use Amazon Redshift as the data storage and Amazon CloudFront as the CDN.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทวิเคราะห์เจเนเรท "ไฟล์รายงาน(Reports)" ออกมาแจกลูกค้าทั่วโลก 
หาที่เก็บไฟล์เหล่านั้นให้ **ปลอดภัย ทนทาน (Durable storage)** และเนื่องจากฐานลูกค้าทั่วโลกเพิ่มขึ้นเรื่อยๆ (ขยายตัว overseas) เลยหาทาง **พ่นแจกจ่ายไฟล์พวกนี้ถึงมือลูกค้าทั่วโลกแบบเร็วติดสปีด (Distribute faster to clients across the globe)** ด้วย 
ต้องเลือกคอมโบเทพไหนราคาถูกและคุ้มค่าที่สุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: "ที่เก็บไฟล์" เทพที่สุด โคตรอึดทนทาน และยืดหยุ่นไม่มีวันเต็ม (Durable, Grow over time, Scalable) = คำตอบคือ **`Amazon S3`** แบบไม่ต้องคิดเยอะ (หนีห่างจากของห่วยๆ อย่าง EC2 Instance Store หรือของผิดประเภทอย่าง โกดังแช่แข็ง S3 Glacier ไปได้เลย)
- ทริคที่ 2: ปัญหา "คนทั่วโลกรุมแย่งโหลดไฟล์ให้เร็วติดจรวด" = อาชีพนี้คือพระเอกกระจายหน้าป้ายเครือข่ายอย่าง **`CDN (Content Delivery Network)`** ซึ่งตัวท็อปในค่าย AWS ก็คือ **`Amazon CloudFront`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon S3 as the data storage and Amazon CloudFront as the CDN.**
- **ทำไมถึงถูก:** สูตรสำเร็จคู่ขวัญจักรวาล AWS! โยนไฟล์กระดาษรายงานยัดเก็บใส่โกดัง Amazon S3 ที่ไม่มีวันพังยับ แล้วเอาปืนใหญ่ Amazon CloudFront ดึงก๊อปปี้ไปกระจายวางรอที่ประเทศปลายทางทั่วโลกให้ลูกค้าตักโหลดได้อย่างรวดเร็ว

❌ **[ผิด] Use Amazon Redshift as the data storage and Amazon CloudFront as the CDN.**
- **ทำไมถึงผิด:** เอากระดาษไฟล์รายงาน PDF โง่ๆ ไปเก็บยัดกระปุกออมสินฐานข้อมูลระดับโกดังบิ๊กดาต้าอย่าง (Amazon Redshift) มันผิดประเภทขั้นรุนแรง! (Redshift เค้าเอาไว้นั่งรันคิวรี่ SQL สร้างกราฟ ไม่ใช่ที่ฝากฝังไฟล์ธรรมดา)

❌ **[ผิด] Use Amazon S3 Glacier as the data storage and Amazon ElastiCache as the CDN.**
- **ทำไมถึงผิด:** 1. Amazon S3 Glacier เป็นตะกร้าห้องเย็น! ไฟล์ลงไปหลับไหลเป็นชั่วโมงกว่าจะได้งัดออกมา ลูกค้ารอโหลดตายพอดี 2. Amazon ElastiCache เป็นตัวจำ Cache หน้าคิวรี่ฐานข้อมูลหลังระบบออฟฟิศ ไม่ได้เอาไว้กระจายไฟล์เป็น CDN หน้าบ้านโชว์ลูกค้า

❌ **[ผิด] Use multiple EC2 instance stores for data storage and Amazon ElastiCache as the CDN.**
- **ทำไมถึงผิด:** 1. EC2 Instance Store คือฮาร์ดดิสก์ชั่วคราวติดมากับเครื่อง ปิดเครื่องแปปเดียวไฟล์รายงานปลิวหายสูญสลายชัวร์ร้อยเปอร์เซ็นต์ (ผิดคิว Durable แบบเต็มประตู) 2. ElastiCache ก็ผิดจุดประสงค์ของการทำ CDN ตามที่ข้อบนอธิบาย

---
---

## 📌 คำถามที่ 30
**โจทย์:**
A company has multiple VPCs with IPv6 enabled for its suite of web applications. The Solutions Architect attempted to deploy a new Amazon EC2 instance but encountered an error indicating that there were no available IP addresses on the subnet. The VPC has a combination of IPv4 and IPv6 CIDR blocks, but the IPv4 CIDR blocks are nearing exhaustion. The architect needs a solution that will resolve this issue while allowing future scalability.

How should the Solutions Architect resolve this problem?

**ตัวเลือก:**
- [ ] Disable the IPv4 support in the VPC and use the available IPv6 addresses.
- [x] Set up a new IPv6-only subnet with a large CIDR range. Associate the new subnet with the VPC then launch the instance.
- [ ] Set up a new IPv4 subnet with a larger CIDR range. Associate the new subnet with the VPC and then launch the instance.
- [ ] Ensure that the VPC has IPv6 CIDRs only. Remove any IPv4 CIDRs associated with the VPC.

---
### 🎯 โจทย์ต้องการอะไร?
เครือข่าย VPC ตอนนี้มีทั้งเลขที่บ้านแบบเก่า (IPv4) และแบบใหม่ (IPv6) ผสมกัน
ปัญหาใหญ่: **"เลขหมาย IPv4 ตอนนี้หมดเกลี้ยงแล้ว! (IPv4 nearing exhaustion)"** ทำให้กดสร้างเครื่อง EC2 ใหม่ไม่ได้เลย เพราะสับตะไคร้หา IP แจกให้เครื่องไม่ทัน 
แอดมินต้องการแก้ปัญหานี้ให้เคลียร์ขาดและอยู่ยงคงกระพันสร้างเครื่องใหม่ได้เรื่อยๆ (future scalability)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: จำกฎสวรรค์เอาไว้เลย: **"คุณไม่สามารถกดปิดระบบ IPv4 / ลบฐานราก IPv4 ทิ้งไปจาก AWS VPC ได้อย่างเด็ดขาด!"** (IPv4 คือหัวใจผูกขาดแต่ดั้งเดิมของ VPC ถ้าลบทิ้งระบบรวนกู่ไม่กลับ) ดังนั้นช้อยส์ไหนบอกว่าให้ปิด Disable IPv4 หรือ Remove IPv4 ขว้างทิ้งลงถังขยะได้เลย 
- ทริคที่ 2: ถ้า IPv4 เริ่มหมด วิธีแก้ปัญหาของคนมีวิสัยทัศน์คือการ "ก้าวไปข้างหน้า" สร้างซับเน็ตอันใหม่ที่เป็นสายเลือดพิเศษ **`IPv6-only subnet`** จุเครื่องได้อีกเป็นทุ่งมหาศาล แล้วประเคนให้ระบบรันบนนี้ซะ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a new IPv6-only subnet with a large CIDR range. Associate the new subnet with the VPC then launch the instance.**
- **ทำไมถึงถูก:** ชาญฉลาดที่สุด! ในเมื่อ Subnet ตัวเก่าแบบดั้งเดิมของเจ้านายมีเลข IPv4 หมดเกลี้ยงไปแล้ว ก็แค่กางอาณาเขต "Subnet อันใหม่กริ๊บๆ" และพะยี่ห้อให้เป็นเมืองหลวงของ "IPv6 อย่างเดียวเพียวๆ (IPv6-only subnet)" ไปเลย สร้างบ้าน EC2 แสนล้านหลังก็ไม่มีวันเบียดกันตาย (IPv6 ใหญ่โคตร) ตอบโจทย์รองรับอนาคตได้เนียนๆ

❌ **[ผิด] Set up a new IPv4 subnet with a larger CIDR range. Associate the new subnet with the VPC and then launch the instance.**
- **ทำไมถึงผิด:** แก้ปัญหาที่ปลายเหตุ! คุณก็แค่ไปแหกขยายสร้างวง Subnet แบบเก่าควักเนื้อกระเบียดกระเสียดแบ่งเค้ก IPv4 (ที่มีอย่างจำกัด) มาใช้อีก ไม่ช้าก็เร็วหน้าบานตัณหากลับมาเจอทางตัน IPv4 หมดอีกรอบอยู่ดี (ไม่ scalability)

❌ **[ผิด] Disable the IPv4 support in the VPC and use the available IPv6 addresses.**
- **ทำไมถึงผิด:** ขี้จุ๊! เราไม่สามารถปิดหนี (Disable IPv4) ในบอดี้หลักของ VPC ก้อนเดิมได้ เพราะกฎ AWS ล็อคแม่กุญแจว่า VPC ยังไงก็ต้องพยุงเส้นเลือดหลัก IPv4 ติดตัวไว้เสมอ

❌ **[ผิด] Ensure that the VPC has IPv6 CIDRs only. Remove any IPv4 CIDRs associated with the VPC.**
- **ทำไมถึงผิด:** เหมือนข้อบนเลย ไอ้การจะไปล้วงไส้ลบ (Remove IPv4) ทิ้งให้ VPC บริสุทธิ์ผุดผ่องเหลือแต่ IPv6 อย่างเดียวนั้น "ทำไม่ได้บนโลกนี้" (VPC ของ AWS บังคับกอดคอเกิดจาก IPv4 เป็นหลัก)

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 7: ข้อ 31 - 35)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 31
**โจทย์:**
A commercial bank has a forex trading application. They created an Auto Scaling group of EC2 instances that allow the bank to cope with the current traffic and achieve cost-efficiency. They want the Auto Scaling group to behave in such a way that it will follow a predefined set of parameters before it scales down the number of EC2 instances, which protects the system from unintended slowdown or unavailability.

Which of the following statements are true regarding the cooldown period? (Select TWO.)

**ตัวเลือก:**
- [x] Its default value is 300 seconds.
- [x] It ensures that the Auto Scaling group does not launch or terminate additional EC2 instances before the previous scaling activity takes effect.
- [ ] It ensures that the Auto Scaling group launches or terminates additional EC2 instances without any downtime.
- [ ] It ensures that before the Auto Scaling group scales out, the EC2 instances have ample time to cooldown.
- [ ] Its default value is 600 seconds.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทตั้งค่า Auto Scaling Group ให้เพิ่มลดเครื่อง EC2 อัตโนมัติ 
โจทย์ทดสอบความจำว่า: คุณรู้จักศัพท์คำว่า **"Cooldown period"** ในการทำ Auto Scaling หรือไม่? และคุณสมบัติของมันคืออะไร? (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หน้าที่หลักของ **`Cooldown period`** คือ "เป็นช่วงพักเบรกหยุดพักหายใจ" (ไม่ให้ระบบมันตื่นตูมสวิงเพิ่มลดเครื่องรัวๆ บ้าคลั่งติดกันจนเกินไป) ต้องรอเครื่องรอบก่อนรันเสร็จหรือลดเสร็จก่อน ถึงจะยอมรับคำสั่งขยายร่าง/หดร่างรอบถัดไป **(does not launch or terminate before previous activity takes effect)**
- ทริคที่ 2: ค่า Default มาตรฐานโรงงานของช่วงหยุดพักหายใจ (Cooldown) นี้ ตั้งไว้ที่ **`300 วินาที (5 นาที)`** เป๊ะๆ 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] It ensures that the Auto Scaling group does not launch or terminate additional EC2 instances before the previous scaling activity takes effect.**
- **ทำไมถึงถูก:** นิยามตรงตัวเป๊ะ! "คูลดาวน์" คือการห้ามเลือดไม่ให้ระบบรีบร้อนเตะเครื่องทิ้ง หรือคลอดเครื่องใหม่ซ้อนกันรัวๆ (เบรกให้รอบก่อนหน้าเปิดเครื่องรันจนแอปเริ่มทำมาหากินให้คงที่ก่อน)

✅ **[ถูกต้อง] Its default value is 300 seconds.**
- **ทำไมถึงถูก:** ข้อสอบวัดความจำ ค่าตั้งต้นของ Cooldown คือ 300 วินาที (5 นาที)

❌ **[ผิด] Its default value is 600 seconds.**
- **ทำไมถึงผิด:** จำผิดแล้วพี่! ตัวเลข Default คือ 300 ไม่ใช่ 600 (ข้อนี้มาหลอก)

❌ **[ผิด] It ensures that the Auto Scaling group launches or terminates additional EC2 instances without any downtime.**
- **ทำไมถึงผิด:** คูลดาวน์ไม่ได้มีเวทมนตร์วิเศษป้องปรามเซิร์ฟเวอร์เจ๊ง (Downtime) มันเอาไว้พักชะลอการสั่งงานลูปสเกลเฉยๆ คนละหน้าที่กัน

❌ **[ผิด] It ensures that before the Auto Scaling group scales out, the EC2 instances have ample time to cooldown.**
- **ทำไมถึงผิด:** ประโยคหลอกเด็กแปลตรงตัวแบบกำปั้นทุบดิน ("ให้เวลาเครื่อง EC2 ระบายความร้อน!?") ไม่ใช่เว้ยยย มันคือเวลาเบรกชะลอรอบของ Auto Scaling Group ต่างหาก ไม่ใช่ให้เครื่องลดอุณหภูมิความร้อน

---
---

## 📌 คำถามที่ 32
**โจทย์:**
An application is hosted in AWS Fargate and uses RDS database in Multi-AZ Deployments configuration with several Read Replicas. A Solutions Architect was instructed to ensure that all of their database credentials, API keys, and other secrets are encrypted and rotated on a regular basis to improve data security. The application should also use the latest version of the encrypted credentials when connecting to the RDS database.

Which of the following is the MOST appropriate solution to secure the credentials?

**ตัวเลือก:**
- [ ] Store the database credentials, API keys, and other secrets to Systems Manager Parameter Store each with a SecureString data type. The credentials are automatically rotated by default.
- [ ] Store the database credentials, API keys, and other secrets to AWS ACM.
- [ ] Store the database credentials, API keys, and other secrets in AWS KMS.
- [x] Use AWS Secrets Manager to store and encrypt the database credentials, API keys, and other secrets. Enable automatic rotation for all of the credentials.

---
### 🎯 โจทย์ต้องการอะไร?
แอดมินเบื่อที่ต้องเอา "รหัสผ่านฐานข้อมูล (Database credentials)" หรือพวก "API Keys (กุญแจความลับ)" ไปฝังทิ้งแว่นตาไว้ในโค้ดดิบๆ (Hardcode)
อยากหาตู้สลัมบน AWS ไว้ **เก็บซ่อนความลับพวกนี้อย่างปลอดภัย (secure the credentials)** 
และพระเอกของงานคือตู้เซฟนั้นต้องสามารถ **"สับเปลี่ยนรหัสใหม่ให้อัตโนมัติ (rotated on a regular basis)"** ได้ด้วย

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอคำว่า **"สับเปลี่ยนรหัสผ่านมาสเตอร์ฐานข้อมูลอัตโนมัติ (rotated, rotation credentials)"** บริการตัวตึงหนึ่งเดียวบน AWS ที่เกิดมาเพื่อสิ่งนี้เลยคือ **`AWS Secrets Manager`** (คำตอบตายตัว!)
- ทริคที่ 2: ระบบเก็บความงำถูกๆอีกตัวคือ **`Systems Manager Parameter Store`** มันเก็บพาสเวิร์ดได้เหมือนกัน แต่ข้อเสียคือ "มันอัปเดตสับเปลี่ยนรหัสอัตโนมัติ(Rotate default) ไม่เป็น!" (ถ้าจะทำต้องเขียนโค้ดยากมาก) 
- ทริคที่ 3: `AWS KMS` แค่ตู้เหรียญสร้างกุญแจเข้ารหัสลับ (Encryption Key) ส่วน `AWS ACM` มีไว้จดทะเบียนใบเซอร์ (SSL Cert) ทั้งสองตัวไม่ได้เกิดมาจุพาสเวิร์ดโง่ๆหรือ API Key แต่อย่างใด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Secrets Manager to store and encrypt the database credentials, API keys, and other secrets. Enable automatic rotation for all of the credentials.**
- **ทำไมถึงถูก:** เพอร์เฟคที่สุด AWS Secrets Manager มีความสามารถเทพในการเข้ารหัสและที่สำคัญคือมันเสกตัวล่องหนไป "สับเปลี่ยนรหัสผ่าน (Rotate) เชื่อมกับ RDS ให้อัตโนมัติ" ตามรอบวันที่เราตั้งไว้ โดยโค้ดแอปหน้าบ้านยังทำงานดึงรหัสใหม่ได้ชิวๆ

❌ **[ผิด] Store the database credentials... to Systems Manager Parameter Store... The credentials are automatically rotated by default.**
- **ทำไมถึงผิด:** ประโยคท้ายคือขี้หกคำโต!! Parameter Store มัน "ไม่เคยแถมฟีเจอร์ Rotate อัตโนมัติให้ฟรีเป็น default" คุณต้องถึกไปปั้นโค้ดเขียน Lambda มาสับพาสเวิร์ดเองซึ่งน่าเบื่อแสนเข็ญ

❌ **[ผิด] Store the database credentials, API keys, and other secrets to AWS ACM.**
- **ทำไมถึงผิด:** AWS Certificate Manager (ACM) ไม่ได้เอามาเก็บรหัสผ่านฐานข้อมูล มันเป็นแฟ้มใส่ "ใบรับรองเว็บกุญแจเขียว (SSL Certificate)" สำหรับลงหลังคาหน้าเว็บให้เป็น https เท่านั้น

❌ **[ผิด] Store the database credentials, API keys, and other secrets in AWS KMS.**
- **ทำไมถึงผิด:** KMS คือโรงงานตีดาบตีกุญแจเข้ารหัส (Master Key) ไม่ได้เป็นเก๊ะลิ้นชักที่ให้โปรแกรมเมอร์แอบยื่นฝากกระดาษจดพาสเวิร์ด/API Key แต่อย่างใด

---
---

## 📌 คำถามที่ 33
**โจทย์:**
An organization needs to control access to several Amazon S3 buckets. The organization plans to use a gateway endpoint to allow access to trusted buckets.

Which of the following could help you achieve this requirement?

**ตัวเลือก:**
- [ ] Generate a bucket policy for trusted S3 buckets.
- [x] Generate an endpoint policy for trusted S3 buckets.
- [ ] Generate an endpoint policy for trusted VPCs.
- [ ] Generate a bucket policy for trusted VPCs.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีถัง S3 เยอะมาก และได้ทำการตอกเสาเข็มมุดท่อส่วนตัวเชื่อมต่อระหว่างหน้าบ้าน VPC วิ่งเข้าหา S3 ด้วยช่องทางพิเศษที่เรียกว่า **"Gateway endpoint"** 
โจทย์ต้องการ **จำกัดสิทธิ์ (control access)** คัดกรองรปภ.ว่า "จากท่อดำดิน Gateway อันเนี้ย... กูอนุญาตให้มึงทะลุไปโผล่ได้เฉพาะ **ถัง S3 ที่ไว้ใจได้ไม่กี่ใบหลักๆเท่านั้น (allow access to trusted buckets)** ห้ามทะลึ่งวิ่งไปเข้าถัง S3 มั่วซั่ว"

ตกลงแอดมินควรเขียนกฎแผ่นกระดาษยื่นให้ใครตรวจ?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การจำกัดประตูทางเข้าเฉพาะรูท่อ Gateway Endpoint ว่า "ท่อนี้มึงวิ่งไปปลายทางหาของเล่น(S3) กระป๋องไหนได้บ้าง..." ต้องทำสิ่งที่เรียกว่าการตั้ง **`Endpoint Policy`** 
- ทริคที่ 2: เป้าหมายของโจทย์คือชี้เฉพาะจงระบุ **จำนวนถังปลายทาง (trusted S3 buckets)** ดังนั้นการเขียน Endpoint policy นี้ก็ต้องระบุเจาะจงรายชื่อถังที่น่าเชื่อถือ (ไม่ใช่ระบุ VPC)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Generate an endpoint policy for trusted S3 buckets.**
- **ทำไมถึงถูก:** ถูกต้องเผง! นี่คือการเขียนกฎติดแผ่นป้ายไว้ที่หน้าท่อ "Endpoint Policy" โดยสั่งรปภ.เลยว่า "เห้ย ใครมุดท่อนี้มา กูยอมให้ทะลุออกไปเจอเฉพาะถัง S3 ที่ลิสต์ชื่อไว้เท่านั้นนะ (Trusted buckets) ถังอื่นห้ามแตะเด็ดขาด" (เซ็ตทีเดียวคุมหมดทั้งท่อ)

❌ **[ผิด] Generate a bucket policy for trusted S3 buckets.**
- **ทำไมถึงผิด:** ถัง S3 บริษัทมึงมีเป็นร้อยใบ จะถ่อไปนั่งไล่แปะ "Bucket Policy" ไล่ตั้งค่าทีละถังยันเช้าเลยหรอวะ (มันทำได้แต่มันปัญญาอ่อนและช้า) ทางที่ดีควรติดเกราะบล็อกที่ท่อ (Endpoint) ฝั่งเดียวจบไวสัส

❌ **[ผิด] Generate a bucket policy for trusted VPCs.**
- **ทำไมถึงผิด:** ย้อนแย้งโจทย์! โจทย์ระบุต้องการล็อคเป้าให้ไปเจอลิสต์ "ถัง S3 ที่น่าเชื่อถือ (S3 buckets)" แต่คุณดันจะไปเขียนไล่ขัง "VPCs (เครือข่าย)" เสียนี่ มันมั่วประเด็น

❌ **[ผิด] Generate an endpoint policy for trusted VPCs.**
- **ทำไมถึงผิด:** เขียนกฎท่อ Endpoint ถูกต้องแล้ว... แต่มึงระบุคนละครึ่งท่อน! โจทย์ขอให้กรองไปหาถัง S3 ปลายทาง แต่นี่เสือกเขียนกฎระบุเครือข่าย VPC ซะงั้น

---
---

## 📌 คำถามที่ 34
**โจทย์:**
A company has a top priority requirement to monitor certain database metrics and send email notifications to the Operations team if any issues occur.

Which combination of AWS services can accomplish this requirement? (Select TWO.)

**ตัวเลือก:**
- [ ] Amazon EC2 Instance with a running Berkeley Internet Name Domain (BIND) Server.
- [ ] Amazon Simple Email Service
- [x] Amazon CloudWatch
- [ ] Amazon Simple Queue Service (SQS)
- [x] Amazon Simple Notification Service (SNS)

---
### 🎯 โจทย์ต้องการอะไร?
โปรเจ็กต์ด่วนจี๋: ต้องการบริการบน AWS คู่ไหนที่เข้าขากันเพื่อ
1. **จับตาเฝ้าดูความผิดปกติ (monitor metrics)** ของฐานข้อมูล
2. ถ้าพังหรือโหลดเยอะปุ๊ป ให้ลั่นไก **"ส่งอีเมลแจ้งเตือน (send email notifications)"** ไปปลุกทีมแอดมินทันที

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หูตาตับไว! ของวิเศษหนึ่งเดียวในจักรวาล AWS ที่ทำหน้าที่นั่งยาม **"Monitor metrics / เฝ้าดูกราฟ / ตรวจจับ Logs"** ขี้แตกขี้แตนสารพัดคือ **`Amazon CloudWatch`** 
- ทริคที่ 2: ระบบโทรโข่งกระจายเสียง แจ้งเตือนยิงแจ้งเตือนแอปเปิ้ล, ส่ง SMS, หรือยิง **อีเมลเตือนพายุเข้า (Email notifications)** แจ้งปลุกแอดมินตอนตีสอง = ต้องยกให้หอกระจายข่าว **`Amazon SNS (Simple Notification Service)`** เสมอ!! 
- ทริคที่ 3: ระวังตัวหลอกอย่าง `Amazon SES (Simple Email Service)` ! บริการนี้มีไว้สำหรับ "ยิงเมลมาร์เก็ตติ้งขายของ/สแปมลูกค้าทีละแสนฉบับ" ไม่ได้เอามาใช้ตั้งเตือนผูกเป็นไซเรนจับคู่กับ Monitor ของระบบเด้อ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon CloudWatch**
- **ทำไมถึงถูก:** พระเอกคนที่ 1 รับบท "กล้องวงจรปิด/ยามเฝ้าจอ" นั่งจับตากราฟ (Metrics) ของฐานข้อมูล ถ้ายอดพุ่งทะลุเพดานปุ๊ป ให้หันไปดีดนิ้วสั่งพระเอกคนที่ 2 ทันที

✅ **[ถูกต้อง] Amazon Simple Notification Service (SNS)**
- **ทำไมถึงถูก:** พระเอกคนที่ 2 รับบท "เด็กเดินเอกสารด่วน" พอ CloudWatch สั่งงานมา SNS จะไปเปิดคัมภีร์ลิสต์อีเมลแอดมิน แล้วสแปมส่งเมลแจกจ่ายเตือนภัยเข้ามือถือทีมงานเรียงตูปอย่างรวดเร็ว (อารมณ์เหมือน Pub/Sub กระจายข่าว)

❌ **[ผิด] Amazon Simple Email Service**
- **ทำไมถึงผิด:** (SES) ไม่ใช่อีเมลเตือนภัยไฟดับในระบบ AWS มันมีเอาไว้สำหรับฝ่ายการตลาด (Marketing) ส่งเมลโฆษณาลดราคาหาลูกค้านับล้านคน (Transactional/Bulk email) ไม่ตอบโจทย์แจ้งเตือนคนคุมคลัสเตอร์หลัก

❌ **[ผิด] Amazon Simple Queue Service (SQS)**
- **ทำไมถึงผิด:** SQS คือตะกร้าใส่บัตรคิวหลังร้านเอาไว้ประวิงเวลาให้พนักงานมาหยิบงานไปทำทีละชิ้น (Queue) ไม่ได้มีสติปัญญาไปส่งอีเมลร้องเตือนแอดมินได้เลย

❌ **[ผิด] Amazon EC2 Instance with a running Berkeley Internet Name Domain (BIND) Server.**
- **ทำไมถึงผิด:** BIND คือระบบหน้าตั้งป้ายเปลี่ยนชื่อเว็บ (DNS Server) ไม่ได้มีจุดเกาะเกี่ยวกับเรื่องเฝ้ากะยาม Monitor หรือลั่นอีเมลแต่อย่างใด เมากาวสุดๆ

---
---

## 📌 คำถามที่ 35
**โจทย์:**
A solutions architect is instructed to host a website that consists of HTML, CSS, and some Javascript files. The web pages will display several high-resolution images. The website should have optimal loading times and be able to respond to high request rates.

Which of the following architectures can provide the most cost-effective and fastest loading experience?

**ตัวเลือก:**
- [ ] Host the website using an Nginx server in an EC2 instance. Upload the images in an S3 bucket. Use CloudFront as a CDN to deliver the images closer to end-users.
- [x] Upload the HTML, CSS, Javascript, and the images in a single bucket. Then enable website hosting. Create a CloudFront distribution and point the domain on the S3 website endpoint.
- [ ] Host the website in an AWS Elastic Beanstalk environment. Upload the images in an S3 bucket. Use CloudFront as a CDN to deliver the images closer to your end-users.
- [ ] Launch an Auto Scaling Group using an AMI that has a pre-configured Apache web server, then configure the scaling policy accordingly. Store the images in an Elastic Block Store. Then, point your instance’s endpoint to AWS Global Accelerator.

---
### 🎯 โจทย์ต้องการอะไร?
ต้องการเปิดร้านค้าเว็บไซต์กะโหลกกะลาที่**มีแค่กระดาษเปล่า (HTML), สีทาบ้าน (CSS), ลูกเล่นจิ้มๆ (Javascript)** อ้อ! และรูปภาพใหญ่ๆสวยๆแค่นั้น 
หมายความว่าเว็บนี้เป็น **"หน้ากากกระดาษล้วนๆ (Static Website)"** ไม่มีฐานข้อมูลหลังบ้าน ไม่ต้องเอาเซิร์ฟเวอร์ไปต้มมาม่าบวกลบเลขให้
เป้าหมายคือ: หาวิธีรันเว็บสไตล์นี้ให้ **ถูกเงินที่สุด (cost-effective) และรูปภาพโหลดโชว์ลูกค้าเร็วติดจรวด (fastest loading)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หน้ากระดาษนิ่งๆ โง่ๆ ไร้ชีวิต (HTML, CSS, JS ล้วน / Static Website) **กฎทองคำข้อแรกคือห้ามเอาไปปักบน `EC2 / Elastic Beanstalk` เด็ดขาด!** เพราะของพวกนี้เป็นเซิร์ฟเวอร์ดมไฟฟ้าราคาแพง คุณต้องเอากระดาษพวกนี้ไปแปะฟรีกินบุญเก่าไว้ที่กำแพงของ **`S3 Bucket (S3 Website Hosting)`** (ถูกบรรลัยแถมไม่รู้พัง)
- ทริคที่ 2: พอรูปใหญ่คนแห่เข้าระดับโลกเยอะ อยากโหลดเร็วตีนผี ก็ต้องจับคู่ตีบวกด้วยโล่หน้าด่านแจกแคช **`Amazon CloudFront`** ไว้หน้าร้าน S3 เท่านั้นคือคำตอบที่สมบูรณ์แบบที่สุด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Upload the HTML, CSS, Javascript, and the images in a single bucket. Then enable website hosting. Create a CloudFront distribution and point the domain on the S3 website endpoint.**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาวที่เรียบง่ายแต่ทรงพลัง! โยนขยะ(HTML/CSS/JS/รูปภาพ) ทั้งหมดกองตบๆไว้ใน **ถัง S3 ใบเดียว** แล้วติ๊กถูกฟังก์ชั่น "Website Hosting" ให้มันกางเตนท์แจกเว็บ จากนั้นเอาปืนใหญ่ CloudFront วางขวางหน้าบ้านคอยก๊อปปี้แคชแจกชาวโลกอย่างรวดเร็ว (ถูกแบบไม่ต้องจ่ายค่าไฟรายเดือนเซิร์ฟเวอร์เลย)

❌ **[ผิด] Host the website using an Nginx server in an EC2 instance. Upload the images in an S3 bucket. Use CloudFront...**
- **ทำไมถึงผิด:** มัวซั่วขี่ช้างจับตั๊กแตน! ทำเป็นหรูไปถ่างเครื่อง EC2 + ติดตั้ง Nginx Server เอามานั่งแจกจ่ายแค่หน้าเว็บกระดาษเปล่า HTML เนี่ยนะ? นอกจากจะเซ็ตแพง หรูเกินเหตุ แล้วเวลามีคนถล่มเว็บ EC2 ก็ล่มอีก (ไม่ Scalable เท่า S3 หรอกครับ)

❌ **[ผิด] Launch an Auto Scaling Group using an AMI that has a pre-configured Apache web server... Store the images in an Elastic Block Store. Then, point to AWS Global Accelerator.**
- **ทำไมถึงผิด:** นี่ยิ่งบ้าใหญ่เข้าลัทธินรกอเวจี! เอาเว็บกระดาษโง่ๆไปโยนตั้ง Auto Scaling Group (เปลืองเครื่อง EC2 มากๆ) เอารูปภาพไปแปะยัดใส่ฮาร์ดดิสก์เครื่อง (EBS) แถมขยี้ด้วยการตีกระชังครอบ Global Accelerator อันแพงหูฉี่เข้าไปอีก... (ไม่ได้มีความ Cost-effective แม้แต่เสี้ยวเล็บ!)

❌ **[ผิด] Host the website in an AWS Elastic Beanstalk environment. Upload the images in an S3 bucket...**
- **ทำไมถึงผิด:** เหมือนข้อแรก Elastic Beanstalk เอาไว้อบพิซซ่าแจกแอปพวก PHP/NodeJS แจ๋มๆที่มีลอจิกหรูๆ (มันเสก EC2 ขึ้นมาเบื้องหลังแหละ) ไม่คุ้มที่จะเอามาปัดฝุ่นเสิร์ฟ HTML เฉยๆ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 8: ข้อ 36 - 40)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 36
**โจทย์:**
A company receives semi-structured and structured data from different sources, which are eventually stored in their Amazon S3 data lake. The Solutions Architect plans to use big data processing frameworks to analyze these data and access it using various business intelligence tools and standard SQL queries.

Which of the following provides the MOST high-performing solution that fulfills this requirement?

**ตัวเลือก:**
- [ ] Use Amazon Managed Service for Apache Flink Studio and store the processed data in Amazon DynamoDB.
- [ ] Use AWS Glue and store the processed data in Amazon S3.
- [ ] Create an Amazon EC2 instance and store the processed data in Amazon EBS.
- [x] Create an Amazon EMR cluster and store the processed data in Amazon Redshift.

---
### 🎯 โจทย์ต้องการอะไร?
เป้าหมายของโจทย์คือมีข้อมูลมหาศาลเก็บกองดองอยู่ใน S3 Data lake
ต้องการเลือกระบบ **"ประมวลผล Big Data ขนาดยักษ์ (big data processing frameworks)"** เพื่อกรองข้อมูล และส่งเข้าไปเก็บให้นักวิเคราะห์สามารถ **"ใช้เครื่องมือ BI ปั้นกราฟสวยๆ และคิวรี่ SQL ธรรมดาๆดึงข้อมูลมาดูได้เลย (access it using business intelligence tools and standard SQL queries)"**
เน้นหาทีมประสานงานที่เก่งที่สุดและให้ **ประสิทธิภาพสูงสุด (MOST high-performing solution)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอคำว่าระบบถึกทึน **`"big data processing frameworks"`** (พวก Apache Hadoop, Apache Spark) ของพวกนี้ต้องโยนให้พี่ควาญช้างอย่าง **`Amazon EMR`** เป็นคนคุมคลัสเตอร์เสมอ
- ทริคที่ 2: ระบบปลายทางที่เกิดมาเพื่อเสิร์ฟทีม Data ยิงคิวรี่ **`"standard SQL queries"`** หนักๆ และเสียบปลั๊กทะลุเข้าโปรแกรมทำกราฟ **`"business intelligence (BI) tools"`** ตัวพ่อขาใหญ่ประจำหมู่บ้านคือโกดังเพชร **`Amazon Redshift`** เท่านั้น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon EMR cluster and store the processed data in Amazon Redshift.**
- **ทำไมถึงถูก:** คอมโบปราบเซียนบิ๊กดาต้า! เอา `Amazon EMR` คุมฝูงช้างประมวลผลจัดเรียงข้อมูลขยะกองโตให้เป็นระเบียบ แล้วฉีดอัดเก็บลงถัง Data Warehouse ปลายทางคือ `Amazon Redshift` ที่รองรับหัวต่อ BI Tools และภาษา SQL พื้นฐานแบบ 100% ตอบโจทย์ครบและวิ่งเร็วปรื๊ดดด

❌ **[ผิด] Use AWS Glue and store the processed data in Amazon S3.**
- **ทำไมถึงผิด:** แวะจอดผิดป้ายไปหน่อย! ถึง AWS Glue จะเป็นคนกวาดขยะ ETL จัดเรียงข้อมูลได้ แต่มันเอาไปกองทิ้งไว้หน้า "Amazon S3" เฉยๆ ซึ่งตัว S3 เปล่าๆ มันไม่ได้มีพลังแรงถีบให้ทีม BI เอาโปรแกรมมากราดยิงพายุ SQL คิวรี่รัวๆ ได้เร็วเท่า Amazon Redshift หรอก (สู้คอมโบ EMR+Redshift ในเรื่อง High-performing ไม่ได้)

❌ **[ผิด] Use Amazon Managed Service for Apache Flink Studio and store the processed data in Amazon DynamoDB.**
- **ทำไมถึงผิด:** Flink เอาไว้วิเคราะห์เรื่องของไหลแบบ "สตรีมมิ่งสดๆ ภูเขาไฟระเบิด" ไม่เข้าพวกกับโจทย์นี้ แถมยิ่งไปดองขยะใส่งู DynamoDB (NoSQL) ยิ่งพังหนัก เพราะ DynamoDB อ่อนด๋อยเรื่องให้พนักงานมายิงคำสั่งย่อหน้า SQL หรือส่องกล้อง BI มากๆ 

❌ **[ผิด] Create an Amazon EC2 instance and store the processed data in Amazon EBS.**
- **ทำไมถึงผิด:** เอาคอมประกอบมานั่งยำข้อมูลบิ๊กดาต้าเอง เก็บลงฮาร์ดดิสก์ธรรมดา EBS... นี่มันยุคหิน! ห่างไกลคำว่า high-performing ไกลลิบ

---
---

## 📌 คำถามที่ 37
**โจทย์:**
A solutions architect is designing a three-tier website that will be hosted on an Amazon EC2 Auto Scaling group fronted by an Internet-facing Application Load Balancer (ALB). The website will persist data to an Amazon Aurora Serverless DB cluster, which will also be used for generating monthly reports.

The company requires a network topology that follows a layered approach to reduce the impact of misconfigured security groups or network access lists. Web filtering must also be enabled to automatically stop traffic to known malicious URLs and to immediately drop requests coming from blacklisted fully qualified domain names (FQDNs).

Which network topology provides the minimum resources needed for the website to work?

**ตัวเลือก:**
- [ ] Set up an Auto Scaling group of EC2 instances behind an Application Load Balancer with an Aurora Serverless DB cluster to store application data. Deploy all resources in a public subnet. Configure host-based routing to the Application Load Balancer to stop traffic to known malicious URLs and drop requests from blacklisted FQDNs.
- [ ] Set up an Application Load Balancer in front of an Auto Scaling group of EC2 instances with an Aurora Serverless DB cluster to persist data. Launch a NAT Gateway in a public subnet to restrict external services from initiating a connection to the EC2 instances and immediately drop requests from unauthorized FQDNs. Deploy all other resources in private subnets.
- [ ] Set up an Application Load Balancer and a NAT Gateway deployed in public subnets. Launch the Auto Scaling Group of EC2 instances and Aurora Serverless DB cluster in private subnets. Directly integrate the AWS Network Firewall with the Application Load Balancer to automatically stop traffic to known malicious URLs and drop requests coming from blacklisted FQDNs.
- [x] Set up an Application Load Balancer deployed in a public subnet, then host the Auto Scaling Group of EC2 instances and the Aurora Serverless DB cluster in private subnets. Launch an AWS Network Firewall with the appropriate firewall policy to automatically stop traffic to known malicious URLs and drop requests coming from blacklisted FQDNs. Reroute your Amazon VPC network traffic through the firewall endpoints.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทสร้างเว็บ 3-tier โครงสร้างใหญ่ ประกอบด้วยด่านหน้า ALB ทะลุเข้ามาเจอเซิร์ฟ EC2 และเชื่อมต่อกับฐานข้อมูล Aurora 
โดยตั้งกฎเหล็กด้านเน็ตเวิร์ค 2 ข้อ:
1. ต้องวางผังเมืองให้ **"ซ้อนกันเป็นชั้นๆลดความเสี่ยง (layered approach)"** (คือห้ามกองกระจุกรวบตึงรวมกัน)
2. ต้องตั้งป้อมค่ายกลดักจับหน้าบ้าน **ปัดเป่ากรองพวกผีบ้าแฮกเกอร์ที่มาจากพวกเว็บเถื่อน (stop malicious URLs and drop blacklisted FQDNs)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การวางผังเมืองเว็บแบบป้องกันลดความเสี่ยง (layered approach / best practice) คือ **ต้องเอาแค่ป้อมยามหน้าด่าน (ALB) ยื่นหน้าออกไปโชว์ตัวใน `Public Subnet` เท่านั้น** แล้วซ่อนลูกเมียของมีค่า (EC2, Aurora Database) มุดเข้าไปหลบภัยในถ้ำ **`Private Subnet`** ให้หมด
- ทริคที่ 2: ระบบที่เกิดมามีปัญญาหยั่งรู้สายดำ ท่องคาถา **กรองชื่อโดเมนเถื่อน (Blacklisted FQDNs)** ได้บนโลกคลาวด์ AWS ก็คือดาบศักดิ์สิทธิ์ **`AWS Network Firewall`** นั่นเอง!
- ทริคที่ 3: ระวังของปลอม! เรา**ไม่สามารถ**เอา AWS Network Firewall ไปฟิวชั่นเกาะเชื่อมเป็นเนื้อเดียวกับ Application Load Balancer (ALB) แบบดื้อๆได้ (Directly integrate ไม่ได้) ต้องดักกรองโดยใช้เทคนิคบิดเส้นทางจราจร Reroute VPC traffic เท่านั้น

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up an Application Load Balancer deployed in a public subnet, then host the Auto Scaling Group of EC2 instances and the Aurora Serverless DB cluster in private subnets. Launch an AWS Network Firewall... Reroute your Amazon VPC network traffic through the firewall endpoints.**
- **ทำไมถึงถูก:** สวยงามตามท้องเรื่อง! 1. วาง ALB ไว้ข้างนอก (Public) ซ่อน EC2+Aurora ไว้ในถ้ำ (Private) นี่คือ Layered pattern ขั้นสุดยอด 2. กางม่านบาเรีย AWS Network Firewall แล้วใช้วิชาบิดกระแสน้ำ (Reroute VPC traffic) บังคับรถทุกคันต้องวิ่งผ่านป้อมไฟร์วอลล์เพื่อสาดน้ำยาสแกน FQDN เถื่อนทิ้งไปให้หมดก่อนเข้าบ้าน

❌ **[ผิด] Set up an Application Load Balancer and a NAT Gateway... Directly integrate the AWS Network Firewall with the Application Load Balancer...**
- **ทำไมถึงผิด:** มั่วซั่วเทคนิค! คุณไม่สามารถจับ AWS Network Firewall มายัดฉีดเสียบรูเข้า ALB ได้ตรงๆ (Directly integrate ไม่ได้ ถ้า WAF อะทำได้) แถมพก NAT Gateway มาทำไมให้เปลืองเงินในจุดที่แปลกๆด้วย

❌ **[ผิด] Set up an Auto Scaling group of EC2 instances... Deploy all resources in a public subnet. Configure host-based routing to the Application Load Balancer to stop traffic...**
- **ทำไมถึงผิด:** ลากลูกเมียลงถนนหมด! เอาทุกสรรพสิ่งตั้งแต่ EC2 ยัน Database มาแก้ผ้าโชว์หราประจานอยู่กลาง `Public Subnet` ผิดผีหลักการ Layered approach แบบไม่น่าให้อภัย แถม ALB ธรรมดาๆ ไม่มีพาวเวอร์ไปดักจับบล็อก FQDN เถื่อนระดับสูงได้หรอก

❌ **[ผิด] Set up an Application Load Balancer... Launch a NAT Gateway in a public subnet to... immediately drop requests from unauthorized FQDNs...**
- **ทำไมถึงผิด:** ให้บทผิดตัวละคร! NAT Gateway มันคือพนักงานไปรษณีย์แถมตั๋วขาออกให้เด็กใน Private Subnet โทรออกข้างนอกได้ มันไม่มีหูตาไปแสกนไวรัสหรือเตะสกัด "drop requests from unauthorized FQDNs" ได้เลย

---
---

## 📌 คำถามที่ 38
**โจทย์:**
An e-commerce company is receiving a large volume of sales data files in .csv format from its external partners on a daily basis. These data files are then stored in an Amazon S3 Bucket for processing and reporting purposes.

The company wants to create an automated solution to convert these .csv files into Apache Parquet format and store the output of the processed files in a new S3 bucket called “tutorialsdojo-data-transformed”. This new solution is meant to enhance the company’s data processing and analytics workloads while keeping its operating costs low.

Which of the following options must be implemented to meet these requirements with the LEAST operational overhead?

**ตัวเลือก:**
- [ ] Integrate Amazon EMR File System (EMRFS) with the source S3 bucket to automatically discover the new data files. Use an Amazon EMR Serverless with Apache Spark to convert the .csv files to the Apache Parquet format and then store the output in the "tutorialsdojo-data-transformed" bucket.
- [ ] Utilize an AWS Batch job definition with Bash syntax to convert the .csv files to the Apache Parquet format. Configure the job definition to run automatically whenever a new .csv file is uploaded to the source bucket.
- [ ] Use Amazon S3 event notifications to trigger an AWS Lambda function that converts .csv files to Apache Parquet format using Apache Spark on an Amazon EMR cluster. Save the processed files to the “tutorialsdojo-data-transformed" bucket.
- [x] Use AWS Glue crawler to automatically discover the raw data file in S3 as well as check its corresponding schema. Create a scheduled ETL job in AWS Glue that will convert .csv files to Apache Parquet format and store the output of the processed files in the “tutorialsdojo-data-transformed" bucket.

---
### 🎯 โจทย์ต้องการอะไร?
มีพาร์ทเนอร์โยนไฟล์ดิบๆ บ้านๆ `.csv` โกยใส่ถัง S3 เป็นล้านๆ ไฟล์ทุกวัน 
บริษัทอยากได้เครื่องจักรเวทมนตร์มาทำ 2 หน้าที่:
1. ปัดกวาดเช็ดถู **แปลงไฟล์กากๆ `.csv` กลายร่างเป็นหน้าตาไฮโซ `.Parquet`** (บีบอัดเล็กลง โดนดึงคิวรี่เร็วขึ้น)
2. **ขี้เกียจดูแล (LEAST operational overhead) และค่าใช้จ่ายพองาม**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หน้าที่กวาดบ้าน ล้างจาน แปลงไส้กรอกหมูให้เป็นลูกชิ้น **(Convert CSV to Parquet / ETL)** พระเอกประจำช่องนี้ที่เกิดมารับงานแม่บ้านล้วนๆ คือ **`AWS Glue`** (จำไว้เลยว่า Glue = Serverless ETL แปลงฟอแมตไฟล์)
- ทริคที่ 2: หุ่นยนต์จิ๋วของ AWS Glue ที่มีหน้าที่เดินสอดส่องเอาแว่นขยายส่องดูหัวตารางว่า CSV ก้อนนี้มีคอลัมน์อะไรบ้าง (Discover raw data / check schema) ก่อนจะสั่งแปลงร่าง มันชื่อว่า **`AWS Glue Crawler`**
- ทริคที่ 3: เห็นคีย์เวิร์ด least operational overhead = เลี่ยงการตั้งแก๊งก่อตั้งอาณาจักร **`Amazon EMR cluster`** หรือทำสงครามเขียนสคริปต์ **`AWS Batch / Bash`** ไว้เลยเพราะมันวุ่นวายปวดหัวสุดๆ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Glue crawler to automatically discover the raw data file in S3 as well as check its corresponding schema. Create a scheduled ETL job in AWS Glue that will convert .csv files to Apache Parquet format...**
- **ทำไมถึงถูก:** สูตรสำเร็จสำเร็จรูป 100%! ปล่อยฝูงปลวก AWS Glue crawler ไปแทะดูโครงสร้างตารางไฟล์ CSV จากนั้นตั้งเวลาให้เครื่องซักผ้า AWS Glue ETL job หมุนปั่นผ้าแปลงไฟล์จาก CSV ให้กลายเป็น Parquet แบบโง่ๆ ไม่ต้องไปคลำท่อตั้งเซิร์ฟเวอร์ใดๆให้เปลืองแรง (Least overhead ขั้นสุด)

❌ **[ผิด] Integrate Amazon EMR File System (EMRFS)... Use an Amazon EMR Serverless...**
- **ทำไมถึงผิด:** เอาระเบิดปรมาณูไปทุบยุง เอา EMRFS ซึ่งเป็นช้างใหญ่ไปนั่งงมแปลงไฟล์ CSV ง็อกแง็กๆ มันไม่ได้ง่ายหรือประหยัดแรงโอเปอเรชั่นเหมือนกดปุ่ม Glue แต่อย่างใด 

❌ **[ผิด] Use Amazon S3 event notifications to trigger an AWS Lambda function that converts .csv files to Apache Parquet format using Apache Spark on an Amazon EMR cluster.**
- **ทำไมถึงผิด:** ความวุ่นวายระดับสิบกะโหลก เอา Lambda ไปสั่งบงการ Spark บนหลังคา EMR Cluster วกวนยิ่งกว่าสปาเก็ตตี้ ระบบเยอะชิ้นแบบนี้ตัดทิ้งไปได้เลยถ้าโจทย์ถามหา LEAST operational overhead

❌ **[ผิด] Utilize an AWS Batch job definition with Bash syntax to convert the .csv files to the Apache Parquet format...**
- **ทำไมถึงผิด:** คุณพระ! ให้โปรแกรมเมอร์มานั่งเขียนสคริปต์บรรทัดคำสั่งเถื่อนๆ (Bash syntax) แล้วใช้ Docker กระป๋องของ AWS Batch รัน... มันเป็นท่ายากเฉพาะกลุ่มและเหนื่อยดูแลจุกจิกมาก (ไปพึ่งแม่พระอย่าง AWS Glue สบายคอกว่าเยอะ)

---
---

## 📌 คำถามที่ 39
**โจทย์:**
A GraphQL API hosted is hosted in an Amazon EKS cluster with AWS Fargate launch type and deployed using AWS SAM. The API is connected to an Amazon DynamoDB table with DynamoDB Accelerator (DAX) as its data store. Both resources are hosted in the us-east-1 region.

The AWS IAM authenticator for Kubernetes is integrated into the EKS cluster for role-based access control (RBAC) and cluster authentication. A solutions architect must improve network security by preventing database calls from traversing the public internet. An automated cross-account backup for the DynamoDB table is also required for long-term retention.

Which of the following should the solutions architect implement to meet the requirement?

**ตัวเลือก:**
- [ ] Create a DynamoDB gateway endpoint. Set up a Network Access Control List (NACL) rule that allows outbound traffic to the dynamodb.us-east-1.amazonaws.com gateway endpoint. Use the built-in on-demand DynamoDB backups for cross-account backup and recovery.
- [ ] Create a DynamoDB interface endpoint. Associate the endpoint to the appropriate route table. Enable Point-in-Time Recovery (PITR) to restore the DynamoDB table to a particular point in time on the same or a different AWS account.
- [ ] Create a DynamoDB interface endpoint. Set up a stateless rule using AWS Network Firewall to control all outbound traffic to only use the  dynamodb.us-east-1.amazonaws.com endpoint. Integrate the DynamoDB table with Amazon Timestream to allow point-in-time recovery from a different AWS account.
- [x] Create a DynamoDB gateway endpoint. Associate the endpoint to the appropriate route table. Use AWS Backup to automatically copy the on-demand DynamoDB backups to another AWS account for disaster recovery.

---
### 🎯 โจทย์ต้องการอะไร?
พ่นศัพท์ขยะหรูๆ มาเต็มประโยคแรก (EKS, Fargate, SAM, DAX, Kubernetes RBAC) ช่างหัวมัน!
คำสั่งหลักจริงๆของโจทย์เริ่มที่ตรงนี้ครับ: 
1. ต้องยิงสายตรงเชื่อมไปคุยกับงูเขียวฐานข้อมูล DynamoDB โดย **"ห้ามหลุดสายแลนโผล่ออกอินเทอร์เน็ตสาธารณะ" (preventing database calls from traversing the public internet)**
2. ต้องตั้งเวลาแบ็คอัพผีปอบ DynamoDB **กระเด็นข้ามไปเก็บไว้อีกแอคเคาท์นึงเลย** เผื่อบ้านหลักระเบิด (cross-account backup)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ของวิเศษที่เจาะท่อดูดเชื่อมหลังบ้านจาก VPC วิ่งตรงรี่มุดเข้าหา S3 กับ DynamoDB แบบไม่เห็นเดือนเห็นตะวัน (ไม่แคร์เน็ตข้างนอก) คือคาถาที่ชื่อว่า **`Gateway endpoint`** เท่านั้น! (จำแพ็คคู่เลย S3 กับ DynamoDB ใช้ Gateway endpoint ฮิตสุด)
- ทริคที่ 2: การจะถ่ายโอนแบ็คอัพก๊อปปี้เผ่นหนีส่งข้ามประเทศ หรือ **"ส่งข้ามไปอีกแอคเคาท์อื่น (cross-account / cross-region backup)"** ของตระกูลฐานข้อมูลนั้น ฟังก์ชั่นกิ๊กก๊อกที่แถมมากับตัวมันเองทำไม่ได้ คุณต้องให้พนักงานมือปืนรับจ้างส่วนกลางที่ชื่อ **`AWS Backup`** เป็นคนอุ้มพาข้ามกำแพงไปให้

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a DynamoDB gateway endpoint. Associate the endpoint to the appropriate route table. Use AWS Backup to automatically copy the on-demand DynamoDB backups to another AWS account for disaster recovery.**
- **ทำไมถึงถูก:** เคลียร์ชัดๆ 2 ดอกรวด! 1. สร้างท่อมืด DynamoDB Gateway endpoint ผูกติดแผนที่ (route table) ขังไม่ให้ออกนอกเน็ต 2. จ้างลูกพี่ขนส้วม AWS Backup ทำหน้าที่เข็นก้อนสำรองเซฟข้อมูลสาดข้ามแอคเคาท์

❌ **[ผิด] Create a DynamoDB interface endpoint. Associate the endpoint to the appropriate route table. Enable Point-in-Time Recovery (PITR) to restore the DynamoDB table... on the same or a different AWS account.**
- **ทำไมถึงผิด:** ผิดสองเด้ง 1. เอา Interface endpoint มาใช้กับ DynamoDB มันแพงลากเลือด(ปกติเขาใช้ Gateway ประหยัดกว่า) 2. ฟีเจอร์ย้อนเวลาปลาไหลข้ามกำแพง (PITR) ของตัว DynamoDB เองนั้น... "มันข้ามแอคเคาท์ไม่ได้โว้ย!" (restore ข้ามบัญชีคนอื่นไม่ได้)

❌ **[ผิด] Create a DynamoDB gateway endpoint. Set up a Network Access Control List (NACL) rule that allows outbound traffic to the dynamodb.us-east-1.amazonaws.com gateway endpoint. Use the built-in on-demand DynamoDB backups for cross-account...**
- **ทำไมถึงผิด:** มั่วฟังก์ชั่น! "built-in on-demand DynamoDB backups" ไอ้ฟีเจอร์บ้านໆที่แถมมาเนี่ย มันอัมพาตแดก ขยับก๊อปปี้วิ่งไปบัญชีอื่น (cross-account) ไม่ได้เด็ดขาด ต้องพึ่ง AWS Backup สถานเดียว

❌ **[ผิด] Create a DynamoDB interface endpoint. Set up a stateless rule using AWS Network Firewall... Integrate the DynamoDB table with Amazon Timestream to allow point-in-time recovery from a different AWS account.**
- **ทำไมถึงผิด:** นี่ก็นั่งเทียนแต่งนิยายล้ำโลก! Network Firewall เกินเบอร์ไปมาก ส่วน Amazon Timestream เค้าเป็นฐานข้อมูลตีเส้นกราฟเวลาเก็บประวัติ ไม่ได้เอามาเก็บขยะเป็นระบบแบ็คอัพให้ใคร ขุดหลุมฝังศพตัวเองแท้ๆ

---
---

## 📌 คำถามที่ 40
**โจทย์:**
A company is implementing its Business Continuity Plan. As part of this initiative, the IT Director instructed the IT team to set up an automated backup of all the Amazon EBS volumes attached to the company’s Amazon EC2 instances. The solution must be implemented as soon as possible and should be both cost-effective and simple to maintain.

What is the fastest and most cost-effective solution to automatically back up all of the EBS volumes?

**ตัวเลือก:**
- [ ] Set your Amazon Storage Gateway with EBS volumes as the data source and store the backups in your on-premises servers through the storage gateway.
- [ ] Use an EBS snapshot retention rule in AWS Backup to automatically manage snapshot retention and expiration.
- [x] Use Amazon Data Lifecycle Manager (Amazon DLM) to automate the creation of EBS snapshots.
- [ ] For an automated solution, create a scheduled job that calls the "create-snapshot" command via the AWS CLI to take a snapshot of production EBS volumes periodically.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งงานด่วน: ให้ตั้งระบบ **แคปภาพถ่ายเก็บตุนก้อนฮาร์ดดิสก์ทั้งหมด (EBS Volumes)** ที่เสียบก้นเครื่องลูกเครื่อง EC2 ไว้ เป็นแบ็คอัพสำรองฉุกเฉิน
บังคับว่า: ต้องตั้งค่าเสร็จ **"ไวที่สุด (fastest)"**, **"ใช้เงินเยียวยาคุ้มค่าที่สุด (cost-effective)"** และที่สำคัญขี้เกียจปวดหัว **ดูแลรักษาง่ายสุดๆ (simple to maintain)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าพูดถึงการแบ็คอัพ **`EBS Volumes อย่างเดียวล้วนๆ (ล้วนๆแบบไม่เกี่ยวเครื่องอื่น)`** ฟีเจอร์เบ้าหลอมตรงจุดที่ถูกสร้างมาเพื่อจับเวลาถ่ายรูป EBS และตามเตะลบรูปดองเก่าทิ้งให้แบบฟรีๆอัตโนมัติ คือ **`Amazon Data Lifecycle Manager (Amazon DLM)`** 
- ทริคที่ 2: อย่าหลงกล **`AWS Backup`**! ถึงมันจะแบ็คอัพฮาร์ดดิสก์ได้ แต่มันครอบจักรวาลเกินไป ยุ่งยากและเป็นเตาปิ้งรวมสารพัดสิ่ง (ถ้าเอา Most cost-effective กับ Simple เฉพาะกลุ่ม EBS อย่างเดียว.. DLM นอนมา)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon Data Lifecycle Manager (Amazon DLM) to automate the creation of EBS snapshots.**
- **ทำไมถึงถูก:** พระเอกเฉพาะทางของงานนี้! DLM ไม่คิดตังค์เพิ่ม (ฟรี) คลิกตั้งกฎแปปเดียวว่าให้แคปก้อน EBS ทุกๆ 12 ชั่วโมง แล้วเดี๋ยวถ้าถึงเวลา 7 วันมึงช่วยลบของเก่าทิ้งให้กูด้วยนะจบ... (เร็ว ง่าย ประหยัดงบ)

❌ **[ผิด] For an automated solution, create a scheduled job that calls the "create-snapshot" command via the AWS CLI...**
- **ทำไมถึงผิด:** นี่คือวิถีโปรแกรมเมอร์หัวโบราณ! ไปเขียนสคริปต์ผูกสายนกหวีดสั่งแคปหน้าจอเองแบบเถื่อนๆ... เจ๊งง่าย บัคเยอะ แล้วการมานั่งประคบประหงมดูแลสคริปต์แบบนี้มันไม่ผ่านเงื่อนไข "simple to maintain" แต่อย่างใด 

❌ **[ผิด] Use an EBS snapshot retention rule in AWS Backup to automatically manage snapshot retention and expiration.**
- **ทำไมถึงผิด:** AWS Backup มันเป็นระบบโกดังเก็บสรรพสิ่งคลังอาวุธระดับองค์กรใหญ่ การกระโดดไปเซ็ตระบบนี้แค่ปั้มรูป EBS ก้อนเดียวมันขี่ช้างจับตั๊กแตนเกินไป (ไม่ simple / ไม่ fastest เท่ากดเปิดสวิตช์ DLM แน่นอน)

❌ **[ผิด] Set your Amazon Storage Gateway with EBS volumes as the data source and store the backups in your on-premises servers through the storage gateway.**
- **ทำไมถึงผิด:** เอากลับตาลปัตร! ฮาร์ดดิสก์ EBS มันอยู่บนฟ้า (คลาวด์ AWS) แต่นี่จะทะลึ่งดูดข้อมูลลากสายถอยหลังหอบกลับมาเก็บดองที่เซิร์ฟเวอร์ออฟฟิศเก่าด้วยวงล้อ "Storage Gateway" เนี่ยนะ? (หนีเสือปะจระเข้ชัดๆ) เสียเวลาและดักดานสุดๆ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 9: ข้อ 41 - 45)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 41
**โจทย์:**
A Solutions Architect created a new Standard-class Amazon S3 bucket to store financial reports that are not frequently accessed but should immediately be available when an auditor requests the reports. To save costs, the Architect changed the storage class of the S3 bucket from Standard to Infrequent Access storage class.

In S3 Standard - Infrequent Access storage class, which of the following statements are true? (Select TWO.)

**ตัวเลือก:**
- [ ] It automatically moves data to the most cost-effective access tier without any operational overhead.
- [ ] It provides high latency and low throughput performance.
- [ ] Ideal to use for data archiving.
- [x] It is designed for data that is accessed less frequently.
- [x] It is designed for data that requires rapid access when needed.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเก็บไฟล์รายงานการเงินลงถัง S3 โดยเปลี่ยนคลาสจากแบบแพง (Standard) ไปเป็นแบบประหยัด **"Standard - Infrequent Access (Standard-IA)"** เพราะไฟล์พวกนี้นานๆทีสรรพากรจะมาขอตรวจ (not frequently accessed) แต่ถ้ามีคนมาขอตรวจปุ๊ป ต้องกดดาวน์โหลดพรวดออกมาได้ทันที (immediately be available)
โจทย์ถามตรงๆว่า: คุณสมบัติเด่นของ **S3 Standard-IA** คืออะไร? (เลือก 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ชื่อมันก็บอกโต้งๆ อยู่แล้ว **`Infrequent Access`** แปลว่า **"เข้าถึงไม่บ่อย / นานๆเปิดดูที (accessed less frequently)"**
- ทริคที่ 2: จุดเด่นของคำว่า Standard คือมันเร็วแรงเท่าของแพง! ดังนั้นถึงมันจะหยิบดูไม่บ่อย แต่มันถูกออกแบบมาให้ **"พร้อมถูกกระชากดึงไฟล์ออกไปได้อย่างรวดเร็วทันทีที่ต้องการ (rapid access when needed)"** แบบระดับมิลลิวินาที 
(ต่างจากพวกกลาเซียร์ S3 Glacier อันนั้น archiving ต้องรอละลายน้ำแข็งเป็นชั่วโมง)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] It is designed for data that is accessed less frequently.**
- **ทำไมถึงถูก:** นิยามตรงตัว 100% เอาไว้เก็บของที่เดือนนึงหยิบมาดูแค่ครั้งสองครั้ง (ลดภาระค่าเช่าที่ฝากไฟล์) 

✅ **[ถูกต้อง] It is designed for data that requires rapid access when needed.**
- **ทำไมถึงถูก:** นี่คือข้อดีของ S3 Standard-IA เพราะยังรักษาความเร็วปรู๊ดปร๊าดแบบ Real-time ดึงปุ๊ปโหลดปั๊ป (rapid access) เอาไว้รองรับผู้สอบบัญชีที่ขอดูไฟล์ด่วนได้ทันใจ 

❌ **[ผิด] It automatically moves data to the most cost-effective access tier without any operational overhead.**
- **ทำไมถึงผิด:** ผิดคลาส! นิยามหรูๆ ที่บอกว่า "ย้ายชั้นย้ายคลาสลับสับเปลี่ยนราคาถูกให้อัตโนมัติ" อันนี้เป็นความสามารถของ **`S3 Intelligent-Tiering`** ครับ ไม่ใช่ Standard-IA 

❌ **[ผิด] It provides high latency and low throughput performance.**
- **ทำไมถึงผิด:** ยุ่งละ! High Latency แปลว่าโหลดโครตช้าอืดอาด ซึ่งผิดเต็มประตู S3 Standard-IA มันเร็วเท่า Standard ทุกประการ (Low Latency / High Throughput) 

❌ **[ผิด] Ideal to use for data archiving.**
- **ทำไมถึงผิด:** ประโยคนี้คือสโลกแกนขายของ **`S3 Glacier`** (ห้องเย็นแช่แข็ง) ถ้าโจทย์พูดถึง "Data Archiving (ดองขยะ 10 ปี)" ตอบ Glacier เสมอ

---
---

## 📌 คำถามที่ 42
**โจทย์:**
A company launched a website that accepts high-quality photos and turns the photos into a downloadable video montage. The website offers both a free and a premium account, with the premium account guaranteeing faster processing. All requests by both free and premium members go through a single Amazon SQS queue and are then processed by a group of Amazon EC2 instances that generate the videos. The company needs to ensure that premium users, who paid for the service, have higher priority than free members.

How should the company re-design its architecture to address this requirement?

**ตัวเลือก:**
- [ ] For the requests made by premium members, set a higher priority in the SQS queue so it will be processed first compared to the requests made by free members.
- [ ] Use Amazon S3 to store and process the photos and then generate the video montage afterward.
- [ ] Use Amazon Kinesis to process the photos and generate the video montage in real-time.
- [x] Create an SQS queue for free members and another one for premium members. Configure your EC2 instances to consume messages from the premium queue first and if it is empty, poll from the free members' SQS queue.

---
### 🎯 โจทย์ต้องการอะไร?
เว็บแปลงรูปเป็นวิดีโอ มีคิวงานค้างเยอะมาก (SQS) 
ปัญหามีอยู่ว่า: ลูกค้าสายเปย์ (Premium) บ่นว่าทำงานช้า เพราะคิวดันไปปะปนโดนจับยัดรวมทะลวงคอขวดอยู่ในท่อเดียวกันกับพวกลูกค้าสายฟรี (Free members) 
บริษัทอยากแก้ระบบให้ **"ลูกค้า VIP (Premium) ได้ลัดคิว แซงคิวถูกประมวลผลให้เสร็จก่อนเสมอ (higher priority)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กของท่อต่อคิว **`Amazon SQS`** คือ "งานอะไรก็ตามที่โดนโยนลงไปในคิวแถวเดียวกัน มันตั้งค่า VIP แซงคิวกันเองในท่อไม่ได้! (Cannot set priority to individual items)" 
- ทริคที่ 2: วิธีแก้ปัญหา VIP ลัดคิวสุดคลาสสิกของ AWS คือ **ต้องสร้างท่อคิว (SQS Queue) แยกเป็น 2 ท่อขาดจากกันเลย!** ท่อนึงให้ VIP รอกว้างๆสบายๆ อีกทนึงให้สายฟรีรอเบียดๆ แล้วเขียนโค้ดที่ EC2 ให้บังคับไปดึงคิวท่อ VIP มาทำให้เหี้ยนก่อน ถ้าคิว VIP ว่างปุ๊ป ค่อยตวัดมือไปหยิบงานคิวสายฟรีมาทำ (Poll from premium queue first)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an SQS queue for free members and another one for premium members. Configure your EC2 instances to consume messages from the premium queue first and if it is empty, poll from the free members' SQS queue.**
- **ทำไมถึงถูก:** เป็น Best Practice การจัดการคิว VIP 100%! แยกกระบะ SQS เป็นสองใบ (ใบเสียตังค์ กับ ใบคนจน) แล้วสั่งให้เด็กรับรถ EC2 ไปล้วงหยิบใบงานจากกระบะคนเสียส่วยให้หมดก่อน พอว่างเมื่อไหร่ค่อยคลานไปหยิบงานคนจนมาทำ

❌ **[ผิด] For the requests made by premium members, set a higher priority in the SQS queue so it will be processed first...**
- **ทำไมถึงผิด:** โดนหลอกเต็มๆ! SQS คิวเดี่ยวๆ เบๆ มันไม่สามารถเอาหนังยางไปรัดชิ้นงานแล้วติดป้ายด่วนพิเศษ (Higher Priority) แทรกคิวกันเองภายในทิ่วเดียวกันได้ (ระบบมันไม่รองรับฟีเจอร์นี้)

❌ **[ผิด] Use Amazon S3 to store and process the photos...**
- **ทำไมถึงผิด:** S3 เป็นแค่ถังน้ำถังขยะเอาไว้เซฟไฟล์ดองไว้ มันไม่มีปัญญาหรือสมองไปประมวลผล (process) ตีดนตรีตัดต่อวิดีโอได้หรอกครับ 

❌ **[ผิด] Use Amazon Kinesis to process the photos and generate the video montage in real-time.**
- **ทำไมถึงผิด:** Kinesis เอาไว้ใช้เจาะน้ำบาดาลดูดท่อ Data Streaming รัวๆ แบบเรียลไทม์ (อย่างพวกกราฟหุ้น, แทร็คกิ้งรถบรรทุก) ไม่ได้ถูกออกแบบมาให้ขุดรูปภาพมานั่งชงวิดีโอแบบนี้

---
---

## 📌 คำถามที่ 43
**โจทย์:**
An organization is currently using a tape backup solution to store its application data on-premises. Plans are in place to use a cloud storage service to preserve the backup data for up to 10 years, which may be accessed about once or twice a year.

Which of the following is the most cost-effective option to implement this solution?

**ตัวเลือก:**
- [ ] Use Amazon S3 to store the backup data and add a lifecycle rule to transition the current version to Amazon S3 Glacier.
- [ ] Use AWS Storage Gateway to backup the data directly to Amazon S3 Glacier Flexible Retrieval.
- [ ] Order an AWS Snowball Edge appliance to import the backup directly to Amazon S3 Glacier Flexible Retrieval.
- [x] Use AWS Storage Gateway to backup the data and transition it to Amazon S3 Glacier Deep Archive.

---
### 🎯 โจทย์ต้องการอะไร?
ที่ทำงานเก่ายังใช้เครื่องบันทึกเทปม้วนดำๆโบราณ (Tape Backup) คัดลอกข้อมูลอยู่ที่ห้องแอร์บริษัทเซิร์ฟเวอร์ (On-premises)
อยากเลิกใช้เทป แล้วหันมาส่งข้อมูลยัดขึ้น Cloud ไปเลย โดยเป้าหมายคือต้องการ **"ดองเก็บยาว 10 ปี (preserve up to 10 years)"**, นานๆๆๆๆหยิบมาดูทีปีละหน และที่สำคัญที่สุดคือต้องการแบบ **"โคตรถูก ประหยัดเงินสุดๆ (most cost-effective)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ดคำว่า **`"Tape Backup solution (ม้วนเทป VTL)"`** โคจรมาเจอกับบริษัท **`"on-premises"`** คำตอบล็อคเป้าทันทีว่าต้องมีพระเอกหัวหอกคือ **`AWS Storage Gateway (Tape Gateway)`** ไว้หลอกโปรแกรมแบ็คอัพผีปอบดั้งเดิมว่า "กูนี่แหละคือม้วนเทปเปล่า" แล้วแอบดูดอัพขึ้นคลาวด์ไป
- ทริคที่ 2: เห็นคีย์เวิร์ดกะเก็บซากฟอสซิลยาวนาน **`"10 years / most cost-effective"`** (10 ปีแบบถูกที่สุด) ของถูกสุดในจักรวาล AWS มีชิ้นเดียวคือ **`Amazon S3 Glacier Deep Archive`** (ถูกกว่านี้ก็ทิ้งลงแม่น้ำแล้ว)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Storage Gateway to backup the data and transition it to Amazon S3 Glacier Deep Archive.**
- **ทำไมถึงถูก:** ตีโจทย์แตกสองเด้ง! 1. อุปกรณ์ที่หัวต่อเข้ากันได้กับตู้เทปเก่าเป๊ะๆ คือ AWS Storage Gateway VTL 2. ปลายทางที่ราคาถูกระดับเศษดินเศษหญ้าสำหรับเก็บขยะ 10 ปี คือระดับแช่แข็งสุดขั้ว S3 Glacier Deep Archive

❌ **[ผิด] Use AWS Storage Gateway to backup the data directly to Amazon S3 Glacier Flexible Retrieval.**
- **ทำไมถึงผิด:** ผิดตรงคลาสปลายทาง! Glacier "Flexible Retrieval" มันดันแพงกว่า "Deep Archive" โขอยู่ โจทย์บังคับว่าขอหาวิธีที่ประหยัดที่สุด (Most cost-effective) เลยตกม้าตายข้อนี้

❌ **[ผิด] Order an AWS Snowball Edge appliance to import the backup directly to Amazon S3 Glacier Flexible Retrieval.**
- **ทำไมถึงผิด:** นั่งเรียกรถกระบะสิบล้อ Snowball เพื่อขนเทป? นอกจากจะวุ่นวายเรื่องหัวต่อแล้ว Snowball มันส่งไฟล์ยัดเข้าตุ่ม Glacier โดยตรงไม่ได้ มันต้องเทใส่ S3 Standard ก่อนเสมอ แถมอัดไปรุ่นแพงอย่าง Flexible Retrieval อีก

❌ **[ผิด] Use Amazon S3 to store the backup data and add a lifecycle rule to transition the current version to Amazon S3 Glacier.**
- **ทำไมถึงผิด:** ม้วนเทปมันต่อตรงๆ ทิ่มพรวดเข้า S3 บนฟ้าไม่ได้เว้ยเฮ้ย! มันต้องมีตัวแปลงภาษากลางออฟฟิศอย่าง Storage Gateway มาขวางก่อนเสมอ 

---
---

## 📌 คำถามที่ 44
**โจทย์:**
A media company is setting up an ECS batch architecture for its image processing application. It will be hosted in an Amazon ECS Cluster with two ECS tasks that will handle image uploads from the users and image processing. The first ECS task will process the user requests, store the image in an S3 input bucket, and push a message to a queue. The second task reads from the queue... Once the image is processed and transformed, it will upload the objects to the S3 output bucket. To complete the architecture, the Solutions Architect must create a queue and the necessary IAM permissions for the ECS tasks.

Which of the following should the Architect do next?

**ตัวเลือก:**
- [ ] Launch a new Amazon MQ queue and configure the second ECS task to read from it. Create an IAM role that the ECS tasks can assume in order to get access to the S3 buckets and Amazon MQ queue. Set the (EnableTaskIAMRole) option to true in the task definition.
- [ ] Launch a new Amazon AppStream 2.0 queue and configure the second ECS task to read from it. Create an IAM role that the ECS tasks can assume in order to get access to the S3 buckets and AppStream 2.0 queue. Declare the IAM Role (taskRoleArn) in the task definition.
- [ ] Launch a new Amazon Data Firehose and configure the second ECS task to read from it. Create an IAM role that the ECS tasks can assume in order to get access to the S3 buckets and Data Firehose. Specify the ARN of the IAM Role in the taskDefinitionArn field of the task definition.
- [x] Launch a new Amazon SQS queue and configure the second ECS task to read from it. Create an IAM role that the ECS tasks can assume in order to get access to the S3 buckets and SQS queue. Declare the IAM Role (taskRoleArn) in the task definition.

---
### 🎯 โจทย์ต้องการอะไร?
ระบบประมวลผลแบ่งงานเป็น 2 ท่อน (รันบนลูกเจี๊ยบ ECS) 
ท่อน 1 อัพรูปใส่ถังขยะ S3 แล้ว **"สอดจดหมายสั่งงานลงท่อคิว (push a message to a queue)"**
ท่อน 2 คอยมา **"รอเปิดอ่านจากคิว (reads from the queue)"** แล้วไปหยิบรูปมาทำงาน
โจทย์ให้เติมคำในช่องว่าง: จงสร้าง "ท่อคิว (Queue)" และ "แผ่นป้ายพนักงาน IAM" สำหรับยื่นให้ ECS สังเคราะห์ระบบให้สมบูรณ์

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าเจอระบบแบ่งงานโยนงานรับส่งตะกร้าต่อกัน (Queue/Decoupling application) พระเอกก้นกุฏิเบอร์ 1 ของวงการท่อคิว AWS คือ **`Amazon SQS queue`** (จิ้มหาสาย SQS ในช้อยส์ก่อนเลย)
- ทริคที่ 2: เวลาจะโยนแผ่นป้ายวิเศษ (IAM Role) แขวนคอให้พนักงานเสิร์ฟ **`ECS Task`** ให้มันมีสิทธิ์เดินไปล้วงถัง S3 กับล้วงท่อคิวได้ จะต้องผูกสิทธิ์ระบุลงไปที่ช่อง **`"taskRoleArn"`** (แปลว่า Role สำหรับ Task)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch a new Amazon SQS queue and configure the second ECS task to read from it. Create an IAM role that the ECS tasks can assume in order to get access to the S3 buckets and SQS queue. Declare the IAM Role (taskRoleArn) in the task definition.**
- **ทำไมถึงถูก:** เพอร์เฟคคอมโบ! หยิบท่อรับส่งกระดาษทดที่ดีที่สุด (Amazon SQS) มาเสียบตรงกลาง แล้วระบุชื่อแผ่นป้ายคล้องคอช่างภาพ (IAM Role) ให้ตัว Task ตรงๆ ผ่านกรอบ `taskRoleArn` ช่างภาพจะได้มีกุญแจไขไปล้วงถัง S3 ออกมาทำงานได้

❌ **[ผิด] Launch a new Amazon Data Firehose... Specify the ARN of the IAM Role in the taskDefinitionArn field...**
- **ทำไมถึงผิด:** มั่วฟังก์ชั่นสองดอกซ้อน! 1. Data Firehose เป็นสายยางฉีดน้ำดับเพลิง พ่นข้อมูลมหาศาลรัวๆลงตุ่ม S3 ไม่ใช่ "ตะกร้าใส่คิว (Queue)" แบบที่โจทย์ขอ 2. ช่องใส่ป้ายชื่อ Role ของ ECS ต้องเป็น `taskRoleArn` ไม่ใช่ "taskDefinitionArn" ไอ้ช่องหลังมันไว้ใส่ชื่อแม่พิมพ์เด้อ

❌ **[ผิด] Launch a new Amazon AppStream 2.0 queue...**
- **ทำไมถึงผิด:** มาได้ไงวะเนี่ย! AppStream 2.0 คือตัวปล่อยสัญญาณภาพโปรแกรม 3D หนักๆจากเซิร์ฟเวอร์ยิงขึ้นหน้าจอ Browser ให้เด็กขี้เกียจลงโปรแกรมที่บ้านเล่น ไม่ได้มีจุดกะต๊อยเชื่อมโยงกับเรื่องการทำคิว Queue ประมวลผลภาพหลังบ้านเลยแม้แต่นิดเดียว

❌ **[ผิด] Launch a new Amazon MQ queue... Set the (EnableTaskIAMRole) option to true in the task definition.**
- **ทำไมถึงผิด:** ถึง Amazon MQ จะเป็นรังคิวได้ แต่มันเอาไว้สำหรับของโบราณ Legacy แถมตัวเลือกนี้ช่างปัญญาอ่อน "EnableTaskIAMRole" ออปชั่นนี้มันมีไว้แค่สำหรับเครื่องเก่ากึ้ก Windows-based ECS เฉยๆ ไม่ได้ใช้ท่ามาตรฐานแบบชี้เป้า taskRoleArn

---
---

## 📌 คำถามที่ 45
**โจทย์:**
A media company hosts large volumes of archive data that are about 250 TB in size on its internal servers. The company has decided to move this data to Amazon S3 because of its durability and redundancy. The company currently has a 100 Mbps dedicated line connecting its head office to the Internet.

Which of the following is the FASTEST and MOST COST-EFFECTIVE way to import all this data to S3?

**ตัวเลือก:**
- [ ] Establish a direct connection using AWS Direct Connect, then transfer the data over to S3.
- [ ] Use S3 Transfer Acceleration to speed up the upload.
- [ ] Upload it directly to S3
- [x] Request several AWS Snowball devices to upload the data into S3.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีขยะระดับสัตว์ประหลาด **ปาเข้าไป "250 TB"** กองอยู่ในโกดังหน้าออฟฟิศ
อยากจะขุดย้ายไอ้ 250 TB เนี้ย ทะยานขึ้นฟ้าไปฝากไว้ในทวีป AWS S3 
แต่ปัญหามีอยู่ว่า เน็ตสายแลนบริษัท **"กากจัด มีวิ่งแค่ 100 Mbps (เต่าคลาน)"**
จงหาวิธีที่ **"ไวที่สุดราวแสงกระสุน (FASTEST)"** และ **"ถูกเงินที่สุด (MOST COST-EFFECTIVE)"** ในการขนย้ายขยะกองระฟ้านี้

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กดเครื่องคิดเลขไวๆ! ขยะตัวแม่ **`250 TB`** ถ้าดึงดันส่งออกทางช่องคลอดอินเทอร์เน็ตที่กากแค่ **`100 Mbps`** ...ใช้เวลาอัพโหลดโต้รุ่งเกินร้อยวัน (เกิน 3 เดือนมึงบ้าไปแล้ว!)
- ทริคที่ 2: กฎข้อนึงของ AWS คือ: ถ้าไฟล์ใหญ่เกินระดับ **10 Terabytes ขึ้นไป** แล้วเน็ตบริษัทกาก ให้ตบโต๊ะสั่งเหมารถสิบล้อ **`AWS Snowball`** ขับมาจอดเทียบหน้าบริษัท โหลดใส่ฮาร์ดดิสก์กระเป๋าเจมส์บอนด์ปึ้กๆๆ แล้วโยนใส่คาร์โก้ไปรษณีย์ส่งกล่องคืน AWS ทันที... (เสร็จใน 1 สัปดาห์ ไวกว่ารอเน็ตแน่นอนแถมราคาถูกกว่าตีตั๋วเน็ตด้วย)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Request several AWS Snowball devices to upload the data into S3.**
- **ทำไมถึงถูก:** คือสูตรสำเร็จของการขนถ่ายข้อมูลระดับช้าง! เรียกรถมะกะโรนี Snowball ใส่กล่องฮาร์ดดิสก์แข็งโป๊กส่งมาที่ออฟฟิศ เสียบสายแลนอัดก๊อปปี้ 250 TB โครมๆ ลงกล่องแล้วส่งเคอรี่คืนศูนย์ AWS จบงานอย่างไวไม่เกินสัปดาห์

❌ **[ผิด] Upload it directly to S3**
- **ทำไมถึงผิด:** ฝืนสังขารตัวเองมาก บีบพุงอัดไฟล์ 250 TB ลงท่อหลอดดูดยาคูลท์ 100 Mbps หวังอัพโยนขึ้น S3 ตรงๆ... หลานบวชก็ยังอัพไม่เสร็จครับ เลิกคุย 

❌ **[ผิด] Establish a direct connection using AWS Direct Connect, then transfer the data over to S3.**
- **ทำไมถึงผิด:** เอารถแบคโฮมาเจาะขุดถนนลากสายเคเบิลมุดป่าข้ามประเทศ (Direct Connect) เพียงเพื่อ... จะมาขนขยะไฟล์ก้อนนี้ทิ้งให้เสร็จๆหรอ? การขุดท่อ Direct Connect ต้องรอผู้รับเหมาเป็นเดือนๆ แถมค่าใช้จ่ายรายเดือนทะลักเดือดมหาศาล (บ้าบิ่นและไม่ประหยัด)

❌ **[ผิด] Use S3 Transfer Acceleration to speed up the upload.**
- **ทำไมถึงผิด:** ยาโด๊ปก็ช่วยไม่ได้! S3 Transfer Acceleration มันช่วยแค่ให้วิ่งทางด่วนบนเครือข่ายโลก (Edge locations) แต่ด่านคอขวดที่แท้จริงคือหน้าประตูบ้านคุณที่โดนบีบแคบเหลือแค่ 100 Mbps ต่อให้ไปจอดรอเข้าทางด่วนกี่คันมันก็วิ่งออกได้แค่นี้แหละ ช้าบรรลัยอยู่ดี

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 10: ข้อ 46 - 50)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 46
**โจทย์:**
All objects uploaded to an Amazon S3 bucket must be encrypted for security compliance. The bucket will use server-side encryption with Amazon S3-Managed encryption keys (SSE-S3) to encrypt data using 256-bit Advanced Encryption Standard (AES-256) block cipher.

Which of the following request headers must be used?

**ตัวเลือก:**
- [ ] x-amz-server-side-encryption-customer-algorithm
- [ ] x-amz-server-side-encryption-customer-key
- [ ] x-amz-server-side-encryption-customer-key-MD5
- [x] x-amz-server-side-encryption

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทบังคับว่ารูปภาพทุกใบที่อัพโหลดใส่ถัง S3 **ต้องแผ่รังสีเข้ารหัสป้องกันขโมยทุกครั้ง (encrypted for security)**
โดยเจาะจงใช้ระบบเข้ารหัสแบบ **"Amazon S3-Managed encryption keys (SSE-S3)"** ซึ่งเป็นการให้ S3 สร้างกุญแจล็อคให้อัตโนมัติ (เป็น AES-256)
โจทย์ถามว่า: ตอนเขียนโค้ดอัพโหลดรูป ต้องแนบ "Header พิเศษ" คำสั่งไหนไปบอกให้ S3 รู้ว่าให้เข้ารหัสแบบนี้นะ?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเข้ารหัส S3 มี 3 ท่าหลัก:
  1. `SSE-S3` (ให้ S3 จัดการกุญแจให้ 100%) -> ใช้ Header สั้นๆแค่นี้พอ: **`x-amz-server-side-encryption`**
  2. `SSE-KMS` (ใช้ตู้เซฟ KMS สร้างกุญแจให้) 
  3. `SSE-C` (ลูกค้า Customer พกกุญแจมาตีเอง) -> พวกนี้จะมีคำว่า "-customer-" ห้อยท้าย Header เสมอ
- ทริคที่ 2: โจทย์ระบุชัดเจนว่าให้ใช้แบบ **`Amazon S3-Managed (SSE-S3)`** แปลว่าช้อยส์ข้อไหนมีคำว่า "customer" ห้อยท้ายคือตกรอบรวดเดียว 3 ข้อเลยครับ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] x-amz-server-side-encryption**
- **ทำไมถึงถูก:** เคลียร์ตรงประเด็น! นี่คือ Header เรียบๆ ปกติที่ใช้กระซิบบอกถัง S3 ว่า "เฮ้ย รูปเนี้ยอัพขึ้นไปแล้ว มึงช่วยล็อคกุญแจฟรีของมึง (SSE-S3) ให้ด้วยนะ"

❌ **[ผิด] x-amz-server-side-encryption-customer-algorithm**
❌ **[ผิด] x-amz-server-side-encryption-customer-key**
❌ **[ผิด] x-amz-server-side-encryption-customer-key-MD5**
- **ทำไมถึงผิด:** ทั้ง 3 ข้อนี้มีคำว่า "-customer-" ห้อยท้ายหมดเลย ซึ่งพวกนี้มันเป็นตั๋ว Header สำหรับการเข้ารหัสท่าพิสดารแบบ **`SSE-C (Customer-Provided Keys)`** ที่โปรแกรมเมอร์ต้องเป็นคนสร้างรหัสกุญแจเองแล้วแนบมาพร้อมกับรูป (ไม่ใช่ให้ S3 สร้างให้แบบที่โจทย์ต้องการ)

---
---

## 📌 คำถามที่ 47
**โจทย์:**
A company runs a messaging application in the ap-northeast-1 and ap-southeast-2 region. A Solutions Architect needs to create a routing policy wherein a larger portion of traffic from the Philippines and North India will be routed to the resource in the ap-northeast-1 region.

Which Route 53 routing policy should the Solutions Architect use?

**ตัวเลือก:**
- [ ] Latency Routing
- [ ] Geolocation Routing
- [x] Geoproximity Routing
- [ ] Weighted Routing

---
### 🎯 โจทย์ต้องการอะไร?
เว็บแชทตั้งเซิร์ฟเวอร์ไว้ 2 ประเทศ: ญี่ปุ่น (ap-northeast-1) กับ ออสเตรเลีย (ap-southeast-2)
แอดมินต้องการบิดเข็มทิศ Route 53 ให้จราจรคนเล่นเว็บ **"เฉพาะพื้นที่ฟิลิปปินส์และอินเดียเหนือ (Philippines and North India)"** ถูกกวาดต้อนให้ไหลไปเข้าเซิร์ฟเวอร์ที่ญี่ปุ่น **ในสัดส่วนที่กินอาณาเขตใหญ่กว่าปกติ (larger portion of traffic)**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ท่องคาถาเลย! ถ้าเจอคำว่าบิดพื้นที่ให้กินอาณาเขตประเทศอื่น **`"larger portion / bias / expand geographic region"`** แบบนี้... นโยบาย Route 53 หน้าเดียวที่ทำได้เรียกว่า **`Geoproximity Routing`** (เป็นการเบ่งรัศมีการกวาดคนด้วยค่า Bias อารมณ์คล้ายๆการวาดวงเวียนรัศมีกินแดนเพื่อนบ้าน)
- ทริคที่ 2: ระวังโดนหลอก! คนชอบสับสนกับ `Geolocation Routing` อันนั้นคือการล็อคโซนเป๊ะๆแข็งทื่อว่า "คนฟิลิปปินส์ต้องไปญี่ปุ่น" (แต่อันนี้ไม่สามารถเบ่งรัศมีแบบ larger portion กลืนกินเพื่อนบ้านอย่าง North India รันเข้ามาเจือปนได้)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Geoproximity Routing**
- **ทำไมถึงถูก:** พระเอกสายฮุบดินแดน! โพลิซีนี้ยอมให้เราตั้งค่า "Bias (เบ่งรัศมี)" ดึงคนพื้นที่ข้างเคียงให้ข้ามฝั่งมาหาเราได้ ทำให้เซิร์ฟญี่ปุ่นสามารถกางอาณาเขตทางเรขาคณิต (Geoproximity) รวบเอาคนปินส์กับอินเดียมาจับยัดเข้าตัวเองได้สำเร็จ

❌ **[ผิด] Geolocation Routing**
- **ทำไมถึงผิด:** กฎนิ่งเกินไป! มันล็อคพิกัดแข็งทื่อแบบเป๊ะๆ 1-1 ("คนประเทศ A ต้องไปเซิร์ฟ B") มันไม่สามารถไปขยายรัศมีส่วนแบ่งพื้นที่เขตแดน (larger portion) แบบที่โจทย์แอดวานซ์ร้องขอได้

❌ **[ผิด] Latency Routing**
- **ทำไมถึงผิด:** นโยบายตัวท็อปเรื่อง "ใครปิงต่ำ เร็วสุด ไปเซิร์ฟนั้น" (วัดความไวเน็ต) ไม่ได้สนใจว่าคุณอยู่ประเทศไหน หรือสัดส่วนใหญ่แค่ไหน ถ้าเน็ตไปออสเตรเลียไวกว่า มันก็โยนไปออสซี่

❌ **[ผิด] Weighted Routing**
- **ทำไมถึงผิด:** นโยบายจับสลากแบ่ง% (เช่น 80% เข้านี่ 20% เข้านั่น) เป็นการแบ่งแบบโคตรตาบอด ไม่สนใจประเทศ ไม่สนใจพื้นที่ ไม่แคร์อะไรทั้งนั้น โยนตั๋วสลับเซิร์ฟเวอร์อย่างเดียว

---
---

## 📌 คำถามที่ 48
**โจทย์:**
A company has developed public APIs hosted in Amazon EC2 instances behind an Elastic Load Balancer. The APIs will be used by various clients from their respective on-premises data centers. A Solutions Architect received a report that the web service clients can only access trusted IP addresses whitelisted on their firewalls.

What should you do to accomplish the above requirement?

**ตัวเลือก:**
- [x] Associate an Elastic IP address to a Network Load Balancer.
- [ ] Create an Alias Record in Route 53 which maps to the DNS name of the load balancer.
- [ ] Associate an Elastic IP address to an Application Load Balancer.
- [ ] Create a CloudFront distribution whose origin points to the private IP addresses of your web servers.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทตั้งเครื่อง API ให้ลูกค้าบริษัทอื่นเรียกใช้ โดยเอา ALB (Application Load Balancer) ขวางหน้าไว้ตามระเบียบ
ทีนี้ลูกค้าบ่นว่า: "เห้ย เน็ตบริษัทกูมันบล็อกเว็บมั่วซั่วนะ กูปลดบล็อกออกให้เวฟมึงได้เฉพาะ **"IP คงที่เท่านั้น (whitelisted IP addresses)"** เอาชื่อเว็บ (DNS) มาใส่ไม่เวิร์ค"
เกิดปัญหาแล้วสิ เพราะปกติ Load Balancer บน AWS มันเปลี่ยนหมายเลข IP ไปเรื่อยๆแบบสุ่ม (Dynamic IP) 
เราจะหาทางแจก **"IP คงที่ตายตัว (Elastic IP)"** ให้โควต้า Load Balancer ตัวนี้ได้ยังไง?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กของ AWS โลกจำ! มนุษย์**ไม่สามารถ**เอา IP คงที่ (Elastic IP) ไปแปะยัดใส่ **`Application Load Balancer (ALB)`** ได้เด็ดขาด! (ระบบไม่ให้ทำ)
- ทริคที่ 2: ถ้าคุณฝืนชะตาชีวิตจำเป็นต้องใช้ "IP คงที่กับ Load Balancer" เพื่อเอาใจลูกค้า whitelisted firewalls... ฮีโร่ตัวปะทะเดียวที่ยอมให้อัด IP ตายตัวใส่หน้าด่านได้คือ **`Network Load Balancer (NLB)`** เท่านั้น!! (คำตอบสูตรสำเร็จ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Associate an Elastic IP address to a Network Load Balancer.**
- **ทำไมถึงถูก:** แก้มถูกจุด 100%! NLB เป็นลูกรักเพียงคนเดียวในตระกูล Load Balancer ที่ AWS อนุญาตให้ดึงเข็มกลัด "Elastic IP (IP คงที่เลขสวยๆ)" มาปักติดเสื้อได้ พอ NLB ได้เลข IP นิ่งๆแล้ว ลูกค้าก็จะได้เอาเลขนี้ไปกรอกลง Whitelist ปลดแบนที่เน็ตบริษัทเขาได้อย่างสบายใจ

❌ **[ผิด] Associate an Elastic IP address to an Application Load Balancer.**
- **ทำไมถึงผิด:** ผิดกฎหมาย AWS อย่างแรง! ขีดขีดเส้นใต้ไว้เลยว่า "ALB ไม่สามารถเสียบ Elastic IP แปะตรงๆได้" (หน้าบ้านมันได้เป็นชื่อลิ้งค์ DNS ยาวๆเท่านั้น IP มันจะดิ้นดุ๊กดิ๊กไปเรื่อยๆตามโหลด) 

❌ **[ผิด] Create an Alias Record in Route 53 which maps to the DNS name of the load balancer.**
- **ทำไมถึงผิด:** ทำชื่อ Alias แปะผ่าน Route 53 ไปก็เท่านั้น เพราะลูกค้าดันบ่นว่า "กูต้องเอา IP ตัวเลขแท้ๆไปปลดล็อคไฟร์วอลล์โว้ย ไม่ใช่เอาชื่อโดเมนตัวอักษรไปปลด"

❌ **[ผิด] Create a CloudFront distribution whose origin points to the private IP addresses of your web servers.**
- **ทำไมถึงผิด:** เอา CloudFront มาโผล่บังหน้าหวังจะหลอกเด็ก... นอกจาก CloudFront ก็ไม่มี IP คงที่ให้ฟิกซ์ใส่ไฟร์วอลล์แล้ว การพยายามโยง Private IP เซิร์ฟเวอร์ในรังทะลุออก CloudFront ก็เป็นท่าที่ทำไม่ได้จริงในชีวิตจริง

---
---

## 📌 คำถามที่ 49
**โจทย์:**
A company is running a custom application in an Auto Scaling group of Amazon EC2 instances. Several instances are failing due to insufficient swap space. The Solutions Architect has been instructed to troubleshoot the issue and effectively monitor the available swap space of each EC2 instance.

Which of the following options fulfills this requirement?

**ตัวเลือก:**
- [ ] Create a CloudWatch dashboard and monitor the SwapUsed metric.
- [ ] Create a new trail in AWS CloudTrail and configure Amazon CloudWatch Logs to monitor your trail logs.
- [x] Install the CloudWatch agent on each instance and monitor the SwapUtilization metric.
- [ ] Enable detailed monitoring on each instance and monitor the SwapUtilization metric.

---
### 🎯 โจทย์ต้องการอะไร?
เซิร์ฟเวอร์ EC2 พังรัวๆ เพราะแรมเสมือน (Swap space) ในเครื่องล้นเต็ม
เจ้านายสั่งเด็ดขาด: "ไปหาวิธีจับตาดูกราฟ **ดูเปอร์เซ็นต์แรมเสมือน (monitor available swap space)** ของเครื่อง EC2 ทุกตัวให้เดี๋ยวนี้!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: รู้หรือไม่? Amazon CloudWatch (ยามเฝ้ากราฟ) ในค่าเริ่มต้นแบบ Default มันมีความสามารถตาบอดทิพย์! มันมองเห็นแค่ "ซีพียู(CPU), เน็ตเวิร์ค(Network), ดิสก์หยาบๆ" **แต่มันมองทะลุเข้าไปดูเชิงลึกอย่าง กราฟการกิน RAM ล้วนๆ, จำนวนพื้นที่ว่าง HDD (Disk space), หรือ Swap memory ในเครื่อง EC2 ไม่ได้เด็ดขาด!**
- ทริคที่ 2: ถ้าอยากทะลวงเข้าไปดูเครื่องในตับไตไส้พุงอย่าง กราฟกิน RAM (Memory) หรือ กราฟล้น Swap ... ทางรอดเดียวคือคุณต้องเชิญพยาบาลจิ๋วเดินไป **"ติดตั้งโปรแกรม `CloudWatch Agent` ลงในท้องกันเครื่อง EC2 นั้นซะ (Install agent)"** แล้วให้มันคอยส่งผลเลือดเป็น Custom metrics กลับมา

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Install the CloudWatch agent on each instance and monitor the SwapUtilization metric.**
- **ทำไมถึงถูก:** นี่คือวิธีที่ถูกต้อง 100% การอยากดูค่าลึกลับในระบบ OS (อย่างแรมกับแดน Swap) บน EC2 คุณจำเป็นต้องขยันไปลงโปรแกรมปลิงดูดเลือด `CloudWatch Agent` ฝังไว้เครื่องใครเครื่องมันเสมอ มันถึงจะคายกราฟ Custom ที่ชื่อว่า SwapUtilization ออกมาให้ชม

❌ **[ผิด] Enable detailed monitoring on each instance and monitor the SwapUtilization metric.**
- **ทำไมถึงผิด:** โดนช้อยส์ปั่นหัว! "Detailed monitoring" มันแค่เปลี่ยนการอัพเดทกราฟ CPU ปกติจาก 5 นาทีให้ด่วนขึ้นเป็นอัพเดททุก 1 นาที (เสียตังค์เพิ่ม) แต่มันไม่ได้มีมนต์วิเศษเสกกาะทำให้ตาบอดมองเห็นกราฟ Swap ขึ้นมาได้แต่อย่างใด (ต้องลง Agent ลูกเดียว)

❌ **[ผิด] Create a CloudWatch dashboard and monitor the SwapUsed metric.**
- **ทำไมถึงผิด:** ไปรอเปิดหน้าจอดู Dashboard กราฟเปล่าๆ ก็ไม่เจอหรอกครับ เพราะตัวเครื่อง EC2 ต้นทางมันไม่ได้เป่าส่งข้อมูลอัพขึ้นมาตั้งแต่แรก (ต้องปลูกถ่าย Agent ก่อน ถึงจะปั้นขึ้น Dashboard ได้)

❌ **[ผิด] Create a new trail in AWS CloudTrail and configure Amazon CloudWatch Logs to monitor your trail logs.**
- **ทำไมถึงผิด:** มั่วแพ็คเกจ! CloudTrail มันคือกล้องวงจรปิดจับผู้ร้ายขโมยบัตรพนักงาน(ส่อง API ใครคลิกนู้นคลิกนี่) ไม่ได้มีพลังไปนั่งส่องกราฟกินแรม Swap Space ในเครื่องเซิร์ฟเวอร์ซักกะนิ๊ดเลย

---
---

## 📌 คำถามที่ 50
**โจทย์:**
A company is running a dashboard application on a Spot EC2 instance inside a private subnet. The dashboard is reachable via a domain name that maps to the private IPv4 address of the instance’s network interface. A solutions architect needs to increase network availability by allowing the traffic flow to resume in another instance if the primary instance is terminated.

Which solution accomplishes these requirements?

**ตัวเลือก:**
- [x] Create a secondary elastic network interface and point its private IPv4 address to the application’s domain name. Attach the new network interface to the primary instance. If the instance goes down, move the secondary network interface to another instance.
- [ ] Use the AWS Network Firewall to detach the instance’s primary elastic network interface and move it to a new instance upon failure.
- [ ] Attach an elastic IP address to the instance’s primary network interface and point its IP address to the application’s domain name. Automatically move the EIP to a secondary instance if the primary instance becomes unavailable using the AWS Transit Gateway.
- [ ] Set up AWS Transfer for FTPS service in Implicit FTPS mode to automatically disable the source/destination checks on the instance’s primary elastic network interface and reassociate it to another instance.

---
### 🎯 โจทย์ต้องการอะไร?
มีหน้าเว็บหลังบ้านแอดมินรันอยู่บนเครื่องประหยัดไฟ (Spot EC2 - ดับเมื่อไหร่โชคชะตากำหนด) อยู่ในห้องปิดตาย (Private Subnet) 
เราเข้าเว็บนี้ผ่านลิงก์ชื่อโดเมนยาวๆ ซึ่งโยงไปหาพิกัด IP วงใน (Private IP) ของสายแลนเครื่องนี้
ปัญหามีอยู่ว่า: ถ้าเกิดเครื่องไฟดับเครื่องพังไป เราอยากหาทางลัด **"ตวัดสายเน็ตนี้ชักเสียบเข้าเครื่องสำรองอื่นเพื่อกู้ชีพเว็บด่วนพยาบาลกลับมาติดอีกรอบทันที (resume in another instance if primary terminated)"** 
จะทำยังไงให้ไวที่สุดโดยไม่ต้องมารอแก้ป้ายชื่อเว็บ (DNS)?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การ์ดแลนประจำเครื่องอันแรก (Primary Network Interface - eth0) ของ EC2 นั้น **ถูกตอกตะปูตายตัว ห้ามถอดห้ามกระชากทิ้ง (Cannot detach primary ENI)** 
- ทริคที่ 2: ถ้าอยากดึงสายแลนชักเข้าชักออกโยกเครื่องข้ามไปมาแบบ Fast and Furious ต้องสร้างอวัยวะเสริมเทียมคือ **`"Secondary Elastic Network Interface (ENI)"`** (สายแลนปลั๊กไฟเส้นที่สอง) เพราะไอ้สายเบอร์สองเนี่ยล่ะ AWS อนุญาตให้ดึงถอดออกแล้วหิ้วไปเสียบก้น EC2 เครื่องใหม่เพื่อชุบชีวิต IP เดิมได้ทันที!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a secondary elastic network interface and point its private IPv4 address to the application’s domain name. Attach the new network interface to the primary instance. If the instance goes down, move the secondary network interface to another instance.**
- **ทำไมถึงถูก:** พระเอกสุดคลาสสิคของสาย ENI! 1. ปั้นการ์ดแลนสำรองเบอร์สอง (Secondary ENI) ผูกชื่อเว็บรอไว้ 2. เสียบเข้าตูดเครื่องปจบ. 3. ถ้าเครื่องกระอักเลือดตายปุ๊ป (Spot โดนยึด) ก็แค่ชักถอนการ์ดแลนใบที่ 2 นี่แหละ เอาไปเสียบรูเครื่องสำรองตัวใหม่... ไวกว่านารุโตะ ไม่ต้องไปรออัพเดตแก้น้ำหมึก DNS ซักบรรทัด!

❌ **[ผิด] Use the AWS Network Firewall to detach the instance’s primary elastic network interface and move it to a new instance upon failure.**
- **ทำไมถึงผิด:** บาปหนากรรมสองชั้น! 1. Firewall มีไว้บล็อกเว็บโป๊ ไม่ได้มีขาโตไปชักดึงสายแลนใครได้ 2. กฎทองคือมึงดึงกระชากสายหลัก "Primary ENI" ออกจากเครื่องแบบดื้อๆแบบที่โจทย์มั่วนี้ไม่ได้เด็ดขาด เครื่องตายดับดิ้นลูกเดียว 

❌ **[ผิด] Attach an elastic IP address to the instance’s primary network interface... Automatically move the EIP to a secondary instance... using the AWS Transit Gateway.**
- **ทำไมถึงผิด:** มั่วซั่วผิดตระกูล! 1. เครื่องมันอยู่ในหลุมดำ Private Subnet (ไม่มีเน็ตนอก) จะบ้าจี้เอาเลขเน็ตอินเทอร์เน็ตสาธารณะ (Elastic IP) ทิ่มเข้าไปเสียบทำไมให้เปลือง! 2. AWS Transit Gateway คือชุมทางรวมฮับส่งพัสดุข้ามเมืองข้าม VPC ไม่ได้มีมือดีไปโยกย้าย EIP หาเครื่องสำรองให้ใครเลย

❌ **[ผิด] Set up AWS Transfer for FTPS service in Implicit FTPS mode to automatically disable the source/destination checks...**
- **ทำไมถึงผิด:** ไร้สาระออกทะเลสู่สุไหงโกลก! บริการอัพโหลดสคริปต์หน้าเว็บสมัยดึกดำบรรพ์อย่าง FTPS มารีแอดแทชสาย ENI ? มั่วแบบเอาคำศัพท์หรูกรวงๆมาผสมกันหลอกคนตาสีตาสาเฉยๆ ทิ้งไปเลยครับ 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 11: ข้อ 51 - 55)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 51
**โจทย์:**
A global company has deployed numerous AWS Outposts servers in various remote locations worldwide. These servers frequently need to download software updates consisting of multiple files from an S3 bucket in the us-west-2 region. The company is experiencing significant delays in distributing these updates across all servers.
What solution would most effectively reduce the deployment latency while minimizing operational overhead?

**ตัวเลือก:**
- [ ] Set up AWS Global Accelerator to route traffic from Outposts servers to the nearest AWS edge location, then use private VIF connections to access the S3 bucket in us-west-2.
- [ ] Set up an Amazon CloudFront distribution with the us-west-2 S3 bucket as the primary origin and create a secondary origin in another region, implementing a CachingDisabled cache policy. Use signed URLs for downloads.
- [x] Create an Amazon CloudFront distribution with the us-west-2 S3 bucket as the origin. Use signed URLs for software downloads.
- [ ] Use Amazon S3 Transfer Acceleration on the existing S3 bucket and have the Outposts servers use the Transfer Acceleration endpoint for downloads.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีเซิร์ฟเวอร์ย่อยๆ **`AWS Outposts (เซิร์ฟตู้เหล็ก AWS ไปตั้งที่สาขาทั่วโลก)`** ซึ่งพวกเขามีปัญหาคือเวลาจะดาวน์โหลดโปรแกรมอัพเดทไฟล์ใหญ่ๆจาก **โกดัง S3 ที่อเมริกา (us-west-2)** มันช้าลากเลือดมาก (ลืมไปเลยว่าหน่วงข้ามโลกแค่ไหน)
โจทย์ต้องการ: หาวิธี **"ลดความเบื่อหน่ายในการรอโหลด (reduce latency)"** โดยต้อง **"ง่ายที่สุด แทบไม่ต้องออกแรงบริหาร (minimizing operational overhead)"** ด้วย

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การแจกจ่ายไฟล์กระจายไปหัวเมือง **"ทั่วโลก (worldwide / remote locations)"** ให้โหลดปรู๊ดปร๊าดแบบไม่ต้องบินข้ามน้ำข้ามทะเลไปดูดจากอเมริกาโดยตรงตลอดเวลา ฮีโร่เรื่องการทำสำเนาแจกจ่ายระดับโลก (CDN) คือ **`Amazon CloudFront`** (วางหน้า S3 ถังหลักไปเลย)
- ทริคที่ 2: ของแถมคือการแจกจ่ายโปรแกรมอัพเดทพวกเนี้ย ปกติมันเป็นไฟล์มีลิขสิทธิ์ ไม่ใช่อยากให้ใครดูดก็ดูด ดังนั้นการปล่อยให้โหลดผ่าน **`"Signed URLs"`** (ลิงก์มีอายุขัยเฉพาะคน) จึงเป็นมาตรฐานความปลอดภัยที่ลอกเลียนแบบได้ง่ายที่สุด

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an Amazon CloudFront distribution with the us-west-2 S3 bucket as the origin. Use signed URLs for software downloads.**
- **ทำไมถึงถูก:** คอมโบอมตะที่แท้ทรู! ตอม่อ S3 อเมริกาเป็นแหล่งต้นน้ำ ปล่อยให้ปืนใหญ่ CloudFront ยิงก๊อปปี้ไฟล์พวกนี้เอาไปกักตุน (Cache) ตามสาขาย่อย Edge Location ทั่วโลก ทำให้ลูกตู้ Outpost ทั่วโลกโหลดไฟล์ใกล้บ้านได้เร็วโคตรๆ แถมแจกลิงก์เซ็นชื่อ Signed URLs ป้องกันสิทธิ์การโหลดมั่วซั่วได้อีก บริหารโคตรง่าย

❌ **[ผิด] Set up an Amazon CloudFront distribution with the us-west-2 S3 bucket as the primary origin and create a secondary origin in another region, implementing a CachingDisabled cache policy.**
- **ทำไมถึงผิด:** เอ้า มึงตั้ง CDN (CloudFront) มาแจกไฟล์ข้ามโลกเพื่อช่วยเซฟเน็ต แต่เสือกไปกดปุ่มสั่ง **"ปิดออพชั่น Caching (CachingDisabled)"** เนี่ยนะ!! โง่บัดซบ มันจะไปก๊อปปี้ส่งเร็วได้ยังไงในเมื่อทุกครั้งแม่งก็ต้องวิ่งไปรบกวนปู่ S3 อเมริกาเหมือนเดิมเป๊ะๆ (เหนื่อยฟรีไม่ได้อะไรเลย)

❌ **[ผิด] Use Amazon S3 Transfer Acceleration on the existing S3 bucket and have the Outposts servers use the Transfer Acceleration endpoint for downloads.**
- **ทำไมถึงผิด:** S3 Transfer Acceleration เป็นทางด่วนจ่ายแพง! มันไม่ได้แจกจ่ายไฟล์ทำสำเนา (Cache) ไว้หน้าบ้านเหมือน CloudFront มันเป็นแค่การเปลี่ยนเลนวิ่งอัพ/ดาวน์โหลดไฟล์ล้วนๆ ทำให้เสียเงินเปล่าประโยชน์เมื่อเทียบกับการเอา CloudFront ไปตั้งรับจบกินบุญยาวๆ

❌ **[ผิด] Set up AWS Global Accelerator to route traffic from Outposts servers to the nearest AWS edge location, then use private VIF connections to access the S3 bucket in us-west-2.**
- **ทำไมถึงผิด:** มั่วแพ็คเกจอีกแล้ว! Global Accelerator เอาไว้ให้คนเข้าเว็บเล่นเกมยิงปืน (Non-HTTP/UDP/TCP แบบลื่นๆ) มันไม่เกี่ยวอะไรกับการไปตั้งแคชก๊อปปี้ดาวน์โหลดไฟล์จากถัง S3 เลย แถมลากสาย Private VIF ไปหากันมั่วไปหมด

---
---

## 📌 คำถามที่ 52
**โจทย์:**
A Solutions Architect of a multinational gaming company develops video games for PS4, Xbox One, and Nintendo Switch consoles, plus a number of mobile games for Android and iOS. Due to the wide range of their products and services, the architect proposed that they use API Gateway.

What are the key features of API Gateway that the architect can tell to the client? (Select TWO.)

**ตัวเลือก:**
- [x] Enables you to build RESTful APIs and WebSocket APIs that are optimized for serverless workloads.
- [ ] Provides you with static anycast IP addresses that serve as a fixed entry point to your applications hosted in one or more AWS Regions.
- [ ] Enables you to run applications requiring high levels of inter-node communications at scale on AWS through its custom-built operating system (OS) bypass hardware interface.
- [x] You pay only for the API calls you receive and the amount of data transferred out.
- [ ] It automatically provides a query language for your APIs similar to GraphQL.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทขายเกมข้ามแพลตฟอร์ม (PS4, มือถือ) แอดมินแนะนำเจ้านายว่า "เจ้านายครับ เรามาตั้งหน้าบ้านรับแขกด้วย **`Amazon API Gateway`** กันเถอะครับ เฟี้ยวฟ้าวมากๆ"
โจทย์ถามตรงๆ โง่ๆ เลยว่า: จงบรรยายสรรพคุณอันดีงามของ **Amazon API Gateway** ให้เจ้านายฟังซิ? (เลือกสรรพคุณที่ถูกต้อง 2 ข้อ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หน้าที่หลักของ API Gateway คือการเป็น "หน้าด่านเสิร์ฟน้ำ" ให้คนภายนอกเรียกเข้ามาหลังบ้าน (Serverless / EC2) ซึ่งรองรับการทำมาตรฐานยอดฮิตอย่าง **`RESTful APIs`** (โยนคำถาม-รอรับคำตอบ) และ **`WebSocket APIs`** (แชทเรียลไทม์ 2 ทาง)
- ทริคที่ 2: ระบบ AWS พวกโฮสต์ Serverless หน้าบ้านแบบนี้ เค้าเก็บตังค์ตามเศษเหรียญที่คุณหยอด **"(Pay only for the API calls / จ่ายเท่าที่ถูกเรียกใช้งาน)"** ไม่ได้คิดตังค์เหมาจ่ายรายเดือนรวดเดียว

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enables you to build RESTful APIs and WebSocket APIs that are optimized for serverless workloads.**
- **ทำไมถึงถูก:** นิยามเกิดมา 100%! API Gateway ก่อกำเนิดมาเพื่อปั้นรูปแบบ REST และ WebSocket เชื่อมก้นเข้าหาฟังก์ชันจิ๋วไร้เซิร์ฟดักดักรันอย่างเห็บหมา Lambda สอดประสานเป็นสเต็ป Serverless เต็มตัว

✅ **[ถูกต้อง] You pay only for the API calls you receive and the amount of data transferred out.**
- **ทำไมถึงถูก:** ถูกต้อง! ไม่มีค่าเช่าตึกเหมาจ่ายรายเดือน เจ็บแค่นั้น... เจ็บเท่าจำนวนกระสุนแชท(API Call) ที่ลูกค้ายิงเข้ามา + ปริมาณขยะที่ส่งคืนออกไป (Data transferred out)

❌ **[ผิด] It automatically provides a query language for your APIs similar to GraphQL.**
- **ทำไมถึงผิด:** มั่วแล้วลูกพี่! API Gateway เป็นทางผ่านธรรมดาๆ ถ้าเจ้านายอยากได้ความเทพกรองภาษาแบบดึงฟิลด์ "GraphQL" ... ต้องไปใช้บริการเฉพาะทางอย่าง **`AWS AppSync`** นู่น

❌ **[ผิด] Provides you with static anycast IP addresses that serve as a fixed entry point to your applications hosted in one or more AWS Regions.**
- **ทำไมถึงผิด:** ไอ้นี่ไปหลงจำของวิเศษเพื่อนบ้าน! นิยาม "Anycast IP สองเบอร์วิ่งข้ามประเทศ (Fixed entry point/AWS Regions)" เป็นสโลกแกนป้ายหาเสียงของพรรค **`AWS Global Accelerator`** ครับ ไม่เกี่ยวกับพรรค API Gateway เลย

❌ **[ผิด] Enables you to run applications requiring high levels of inter-node communications at scale on AWS through its custom-built operating system (OS) bypass hardware interface.**
- **ทำไมถึงผิด:** ถกเถียงเรื่องฮาร์ดแวร์บ้าบอคอแตก "OS bypass hardware interface" อันนี้มันไปอธิบายความเทพฉายเดี่ยวเรื่องแลนระดับหลอดอุลตร้าแมน **`Elastic Fabric Adapter (EFA)`** นู่น ไม่ได้เฉียดหัว API ซักติ๊ด 

---
---

## 📌 คำถามที่ 53
**โจทย์:**
A media company has two VPCs: VPC-1 and VPC-2 with peering connection between each other. VPC-1 only contains private subnets while VPC-2 only contains public subnets. The company uses a single AWS Direct Connect connection and a virtual interface to connect their on-premises network with VPC-1.

Which of the following options increase the fault tolerance of the connection to VPC-1? (Select TWO.)

**ตัวเลือก:**
- [ ] Establish a hardware VPN over the Internet between VPC-2 and the on-premises network.
- [x] Establish another AWS Direct Connect connection and private virtual interface in the same AWS region as VPC-1.
- [x] Establish a hardware VPN over the Internet between VPC-1 and the on-premises network.
- [ ] Establish a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.
- [ ] Use the AWS VPN CloudHub to create a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.

---
### 🎯 โจทย์ต้องการอะไร?
มีสองหมู่บ้าน VPC-1 (ปิดตายน่าเบื่อ) กับ VPC-2 (ดาราสาธารณะ) เจาะท่อคุยกันแบบ **"VPC Peering"** 
และออฟฟิศนายทุนใหญ่ (On-premises) เจาะท่อส่งน้ำบาดาลยักษ์ **`Direct Connect`** ยิงเดี่ยวๆทิ่มลงไปหา **"VPC-1 เท่านั้น (connect with VPC-1)"** 
ปัญหามีอยู่ว่า: ถ้าท่อ Direct Connect อันนี้พังขึ้นมา អอฟฟิศนายทุนจะด่าเอา แอดมินอยากเสริมชูชีพป้องกันผีหลอก **"เพิ่มเกราะกำบังหุ้มให้เส้นทางไปสู่หัวใจ VPC-1 เหนียวขึ้นพังได้ยากขึ้น (increase the fault tolerance to VPC-1)"** จะต้องทำยังไงบ้าง? (เลือก 2 ทางรอด)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎเหล็กของท่อแว่น VPC Peering คือ **"ห้ามปีนรั้วชะโงกคุยข้ามบ้านคนอื่น! (No edge-to-edge routing / No Transitive routing)"** หมายความว่า ออฟฟิศนายทุนที่มีท่อปักอยู่แค่ VPC-1 เค้า**ไม่สามารถ**อาศัยใบบุญท่อนี้เดินอ้อมทะลุไปโผล่ VPC-2 ต่อได้ และในทางกลับกัน... ก็**ห้าม**ใช้วิธีลากสายใหม่ไปเสียบ VPC-2 แล้วหวังพึ่งบารมีให้มันไหลกลับมาเข้าหลังบ้าน VPC-1 แทนท่อที่พังเด็ดขาด! (สรุปคือ: ตัดช้อยส์ที่มีคำว่า **"เสียบเข้า VPC-2"** ทิ้งส้วมไปให้หมดซะ)
- ทริคที่ 2: ถ้าอยากเสริมเกราะกันท่อฉีกขาดตาย (High Availability / Fault tolerance) ให้กับ VPC-1 ก็ต้องเอาสายรัดของใหม่ทิ่มเสียบตรงๆ อัดเข้า `VPC-1` เพิ่มไปอีกท่อนึงเท่านั้น! 
  - ทางที่ 1: เจียดเงินไปสับเสาเข็ม **`ซอยท่อ Direct Connect เพิ่มอีกท่อ`** อัดลงรูเดิม VPC-1 ไปเลย (แพงแต่นิ่งแน่)
  - ทางที่ 2: ถ้าไม่มีเงิน แต่อยากได้ยางอะไหล่สำรองถูกๆ ก็ถัก **`สายเสาอากาศเคเบิ้ล (Hardware VPN internet)`** ไปเสียบลำเลียงน้ำแทนแก้ขัด (ดีกว่าไม่มี)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Establish another AWS Direct Connect connection and private virtual interface in the same AWS region as VPC-1.**
- **ทำไมถึงถูก:** หนามยอกเอาหนามบ่ง! ท่อเหล็กกล้าอันแรกมันเสี่ยงพังใช่มั้ย? มึงก็ไปเช่าจ้างคนมาขุดเจาะ "ท่อ Direct Connect ท่อนที่สอง (Another DX)" เสียบขนานข้างๆ เข้าหัวใจ VPC-1 แบบเดิมซะสิ จะได้เป็น Active-Active สับสวิตช์กันปลอดภัยร้อยเปอร์เซ็นต์ (นี่คือท่ายากคนรวย)

✅ **[ถูกต้อง] Establish a hardware VPN over the Internet between VPC-1 and the on-premises network.**
- **ทำไมถึงถูก:** ท่ายางอะไหล่คนจน! ท่อสายดิน Direct Connect พังใช่มั้ย มึงก็ไปตั้งเสาอากาศปาคลื่นผ่านแอร์สาธารณะอินเตอร์เน็ต "Hardware VPN" ส่งข้อมูลลอยฟ้าเสียบเข้าหลังคา VPC-1 ไปเลยสิ ถือเป็นหนทางกู้ชีพขัดตาทัพที่โคตรคลาสสิคและประหยัดงบสุดๆ

❌ **[ผิด] Establish a hardware VPN over the Internet between VPC-2 and the on-premises network.**
❌ **[ผิด] Establish a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.**
❌ **[ผิด] Use the AWS VPN CloudHub to create a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.**
- **ทำไมถึงผิด:** กฎนรก Transitive Routing ฟาดคอขาด! ทั้งสามตัวเลือกด้านบนนี้พากันไป "เลี้ยวรถเสียบปลั๊กที่บ่อพัก VPC-2 หมดเลย" โดยตั้งความหวังลมๆ แล้งๆ ว่าเดี๋ยวมันก็ว่ายน้ำลอดท่อ Peering แอบทะลุไปโผล่ในฐาน VPC-1 ให้เราเองแหละ... **(ฝันไปเถอะ! AWS ไม่อนุญาตให้ใช้ VPC ตัวกลางเป็นเบ๊รับส่งพัสดุหักมุกแบบนี้ได้ครับ ถ้ามึงอยากไป VPC-1 มึงก็ต้องปักตรงไปดินแดน VPC-1 สิว้อย)**

---
---

## 📌 คำถามที่ 54
**โจทย์:**
A company needs to assess and audit all the configurations in its AWS account. It must enforce strict compliance by tracking all configuration changes made to any of its Amazon S3 buckets. Publicly accessible S3 buckets should also be identified automatically to avoid data breaches.

Which of the following options will meet this requirement?

**ตัวเลือก:**
- [ ] Use AWS CloudTrail and review the event history of your AWS account.
- [ ] Use AWS IAM to generate a credential report.
- [x] Use AWS Config to set up a rule in your AWS account.
- [ ] Use AWS Trusted Advisor to analyze your AWS environment.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายนั่งกุมขมับ กลัวลูกน้องแอบเปิดซิบตั้งค่าถังขยะ S3 เป็นแบบเปิดอ้าซ่าให้ใครก็เข้ามาดูดรูปโป๊บริษัทไปได้ (Publicly accessible buckets) 
อยากได้ตำรวจซักคนมาคอย **"สอดส่องตรวจสอบประวัติการตั้งค่า (assess and audit configurations)"** หายานแม่มาคอย **"ติดตามทุกการเปลี่ยนผ้าอ้อม (tracking configuration changes)"** ของทรัพยากรทั้งหมดในบัญชี ถ้ารถคันไหนตั้งค่าผิดกฎจราจร (Compliance) ปุ๊ป ต้องร้องโวยวายทันที

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ถ้าพูดถึงการแอบสอดส่องว่า **"ตอนตีสาม มีลูกน้องคนไหนไปรูดเปลี่ยนการตั้งค่า S3 (Configuration changes!)"** หรือถ้าอยากไปออกกฎเหล็กให้ทุกอย่างอยู่กับร่องกับรอย (Enforce Compliance rule) ... ผู้รับเหมามือวางอันดับ 1 ในวงการกฎระเบียบคือตำรวจหน้าผี **`AWS Config`** ครับ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Config to set up a rule in your AWS account.**
- **ทำไมถึงถูก:** หมากตัวจริงที่โจทย์ตามหา! AWS Config เกิดมาเพื่อจดประวัติ (ส่อง Time Machine กลับไปดูอดีต) ว่า "เฮ้ย เมื่อชั่วโมงก่อนถัง S3 ใบนี้น่าจะตั้งปิดไฟอยู่นี่หว่า ไมตอนนี้แม่มเสือกเปิดสวิตช์เป็น Public วะ" แล้วเราตั้งสมการ **กฎ (Rules)** กำกับให้มันจับกุมพวกลักลอบเปลี่ยนสถานะให้ประจานออกมาได้สบายๆ

❌ **[ผิด] Use AWS CloudTrail and review the event history of your AWS account.**
- **ทำไมถึงผิด:** ดิ้นแก้ตัวไม่ขึ้น! พี่ `CloudTrail` แกเป็นนักข่าวกล้องวงจรปิดคอยจดป้ายทะเบียนแค่ว่าใครแอบดอดเข้ามา "กดคำสั่งอะไรเวลากี่โมง (API calls/Event history)" แต่มันปันใจไปเสือกจดหรือตีตราว่า "การตั้งค่าลึกๆในหลุมพรางขั่วบวกลบเปลี่ยนไปยังไง" ไม่ได้ และไม่มีสติปัญญาไปตรวจว่าถัง S3 นี่หลุดแผงลอยเปิดอ้าซ่า Public รึยัง 

❌ **[ผิด] Use AWS Trusted Advisor to analyze your AWS environment.**
- **ทำไมถึงผิด:** แอดไวเซอร์ผู้น่าสงสาร... ไอ้เจ้านี่มันแค่คุณตาเป็ดน้อยมานั่งชี้แนะตักเตือนทั่วไปว่า "หลานจ๋า ถัง S3 เปิดโล่งนะ, เงินใช้เยอะไปนะ" ป้อนคำแนะนำขยะๆ (Recommendations) ให้เฉยๆ แต่มันไม่สามารถไปสร้างกฎเหล็กลิขสิทธิ์มาครอบหัวคนแบบ "Rule Tracking / Audit History" เพื่อจับกุมแผ่รังสีการเปลี่ยนแปลงตามที่บริษัทต้องการได้ 

❌ **[ผิด] Use AWS IAM to generate a credential report.**
- **ทำไมถึงผิด:** IAM report มันแค่ปริ้นท์ใบเสร็จประจานตารางการเข้างานว่าพนักงานคนไหนแอบซุ่มไม่เปลี่ยนรหัสผ่าน (Password credential) มาแล้วกี่เดือน... ไม่ได้เกี่ยวห่าเกี่ยวเหวอะไรกับการกระทำแอบเปิดถังขยะ S3 ของบริษัทเลย ปัญญาอ่อนสุดๆ

---
---

## 📌 คำถามที่ 55
**โจทย์:**
A company has a static corporate website hosted in a standard Amazon S3 bucket and a new web domain name that was registered using Amazon Route 53. There is a requirement to integrate these two services in order to successfully launch the corporate website.

What are the prerequisites when routing traffic using Route 53 to a website that is hosted in an S3 Bucket? (Select TWO.)

**ตัวเลือก:**
- [x] A registered domain name
- [ ] The record set must be of type "MX".
- [x] The S3 bucket name must be the same as the domain name.
- [ ] The Cross-Origin Resource Sharing (CORS) option should be enabled in the S3 bucket.
- [ ] The S3 bucket must be in the same region as the hosted zone.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเพิ่งเอาหน้ากระดาษเว็บตายังค้างๆ (Static website) ไปแปะไว้บน **ถังโง่ๆอย่าง Amazon S3**
แล้วกำเงินไปจิ้มเช่าป้ายชื่อปังๆ (Domain Name) จากพนักงานขายชื่อหน้าบวช **Amazon Route 53**
โจทย์ทิ้งคำถามไว้ให้คบคิด: มึงเงยหน้าขึ้นมาตอบกูสิว่า ถ้ายากจะเสกเวทมนตร์จับคู่ป้ายชื่อโดเมน Route 53 เสียบแรดๆเข้าหาแว่นตาหลังร้าน S3 เว็บโง่ๆเนี่ย... **"กฎเหล็กข้อยกเว้นพื้นฐานที่ต้องเช็ค (Prerequisites) ก่อนยัดห่าแต่งงาน มีอะไรบ้าง?"** (เลือก 2 ทางเลือกแห่งนรก!)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเอาร้านค้า Route 53 ไปบิดจ่าหน้าซองส่งพัสดุเข้าบ้านกระจอกๆอย่าง **S3 Static Website...** **ชื่อถัง S3 มึงต้องเซ็ตให้ตรงพ้องจองกับป้ายชื่อโดเมนแบบหน้าซองจดหมายสิบแปดมงกุฎ!! (Bucket name MUST MATCH the domain name)** เป็นกฎทองคำที่ชาวบ้านหน้าโง่ตกหลุมตายประจำ
- ทริคที่ 2: สิ้นคิดมาก... ก็อยากจะดึงลูกค้า Route 53 ให้วิ่งเข้างวงช้าง... มึงก็ต้องมี **Domain name ให้ชาวบ้านกดก่อนดิน้องง!** ถ้าไม่มีเงินเช่าป้ายชื่อแล้วมึงจะให้ Route 53 ขี่ลาไปหาพ่องงง!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The S3 bucket name must be the same as the domain name.**
- **ทำไมถึงถูก:** บังคับโหดสัสๆ! ถ้าคุณเช่าโดเมนชื่อว่า `pornhub.com` บน Route 53 คุณต้องไปตั้งชื่อกล่องพลาสติกถัง S3 ของคุณให้ชื่อเป๊ะว่า `pornhub.com` เช่นกัน ไม่ใช่อยากตั้งชื่อฮิปฮอปว่า `my-video-x` ก็ฝืนตั้งไป (ถ้าไม่ตรงกัน Route53 จะหาถังมึงไม่เจอครับผ้ม)

✅ **[ถูกต้อง] A registered domain name**
- **ทำไมถึงถูก:** ตรรกะกำปั้นทุบดิน! ถ้าคุณเสี้ยนอยากจะตั้งพิกัดบ้านด้วย Route 53 คุณก็ต้องมีเหรียญเช่าซื้อลิขสิทธิ์ทะเบียนบ้านป้ายชื่อ "Registered Domain Name" ก่อน ถึงตอกเสาเข็มทำธุรกิจได้ไงเล่า!

❌ **[ผิด] The S3 bucket must be in the same region as the hosted zone.**
- **ทำไมถึงผิด:** นี่ก็หลงทางผิดกลิ่น! Route 53 แกคือสมุดโทรศัพท์ครอบโลก แกเป็น Global Service อยู่ก้อนเมฆกระจายแสงทุกที่ ไม่แคร์ว่าพิกัดตึบของถัง S3 เล็กๆมึงจะฝังรากมะกรูดที่ญี่ปุ่นหรือนรกสิงคโปร์... แค่ชื่อถังตรง ก็จูนติดแล้วพี่น้อง!

❌ **[ผิด] The Cross-Origin Resource Sharing (CORS) option should be enabled in the S3 bucket.**
- **ทำไมถึงผิด:** ไปไกลยันดาวนาวิก... CORS เป็นออพชั่นที่เอาไว้ปลดแบนให้ชาวบ้านหน้าแปลก (ต่างโดเมน) สามารถยิงทะลวงโค้ด JavaScript ไหลเข้าไปดูด Font สกัดดาวรุ่งในถัง S3 ได้ แต่ไม่ใช่นิพพานปุ่มวิเศษที่ต้องหน้าสิ่วหน้าขวานรีบตั้งก่อนแต่งงานกับ Route 53 เลยมึง

❌ **[ผิด] The record set must be of type "MX".**
- **ทำไมถึงผิด:** ป้าบเข้าให้! ชนิด "MX Record" ไสหัวไปส่งจดหมายไปรษณีย์ **`อีเมล Mail Server`** นู่นเลยพ่อตากลม... ไม่เกี่ยวหาเกี่ยวเหวอะไรกับการจูงหมาปักป้ายเข้าเว็บไซต์ HTML กระดาษเปล่าของบริษัทเลยซักเสี้ยวติ่งขน

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 12: ข้อ 56 - 60)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 56
**โจทย์:**
A company has an application that continually sends encrypted documents to Amazon S3. The company requires that the configuration for data access is in line with its strict compliance standards. It should also be alerted if there is any risk of unauthorized access or suspicious access patterns.

Which step is needed to meet the requirements?

**ตัวเลือก:**
- [ ] Use Amazon Inspector to alert whenever a security violation is detected on S3.
- [x] Use Amazon GuardDuty to monitor malicious activity on S3.
- [ ] Use AWS CloudTrail to monitor and detect access patterns on S3.
- [ ] Use Amazon Rekognition to monitor and recognize patterns on S3.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทส่งเอกสารสำคัญเก็บใน S3 ตลอดเวลา 
ต้องการตัวช่วยด้านความปลอดภัยที่ทำหน้าที่ **"แจ้งเตือน (alerted) ทันทีที่เจอกลิ่นตุๆ หรือมีพฤติกรรมน่าสงสัยว่าจะมีคนแปลกหน้าแอบเข้ามาดูดไฟล์ (unauthorized access or suspicious access patterns)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: หมาเฝ้าบ้านจอมจับผิด! หน้าที่หลักในการใช้ AI สอดส่อง **"พฤติกรรมน่าสงสัย / โจรแอบเจาะระบบ (suspicious access / malicious activity)"** บน AWS คืองานของ **`Amazon GuardDuty`** (มันจะส่องตั้งแต่วงแลน VPC, บัญชีผู้ใช้, ยันการแอบเจาะถัง S3)
- ทริคที่ 2: ระวังโดนสับขาหลอกกับ `CloudTrail` อันนั้นแค่กล้องวงจรปิด "บันทึก" ว่าใครทำอะไร แต่มันไม่มีสมอง AI มาวิเคราะห์หรือส่งเสียงเตือนว่า "เห้ย นี่มันพฤติกรรมโจรนี่หว่า!" แบบที่ GuardDuty ทำได้

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon GuardDuty to monitor malicious activity on S3.**
- **ทำไมถึงถูก:** เปรี้ยงเดียวจบ! ฝากบ้านไว้กับ GuardDuty มันจะใช้ Machine Learning ส่องพฤติกรรมคนเข้า S3 ตลอดเวลา ถ้าเจอใครเปลี่ยนสิทธิ์มั่วซั่ว หรือโหลดเถื่อนปั๊ป มันจะลั่นไซเรนเตือนทันที

❌ **[ผิด] Use AWS CloudTrail to monitor and detect access patterns on S3.**
- **ทำไมถึงผิด:** CloudTrail เป็นแค่ "คนจดบันทึกประวัติ (Log recorder)" ว่านาย ก. ล็อกอินกี่โมง, นาย ข. โหลดไฟล์ไหน มันไม่ได้มีความฉลาดไปคำนวณหารูปแบบโจร (Detect suspicious patterns) แต่อย่างใด

❌ **[ผิด] Use Amazon Inspector to alert whenever a security violation is detected on S3.**
- **ทำไมถึงผิด:** Inspector เป็นคุณหมอตรวจโรค เอาไว้สแกนช่องโหว่รอยรั่วบน "เครือง EC2 / Container" (เช่น ลืมอัพเดทแพทช์ Windows, เปิดพอร์ตอันตรายทิ้งไว้) มันไม่ได้มารับจ้างเฝ้าเวรยามหน้าถัง S3 ครับ

❌ **[ผิด] Use Amazon Rekognition to monitor and recognize patterns on S3.**
- **ทำไมถึงผิด:** กาวจัดๆ! Rekognition คือ AI สำหรับ "สแกนใบหน้าคนในรูปถ่ายหรือวิดีโอ" เผื่อจับเท็จรอยยิ้มอารมณ์ความรู้สึก... ไม่ได้เกี่ยวกับการเตือนภัยแฮกเกอร์ขโมยไฟล์เลย

---
---

## 📌 คำถามที่ 57
**โจทย์:**
An insurance company plans to implement a message filtering feature in its web application. To implement this solution, it needs to create separate Amazon SQS queues for each type of quote request. The entire message processing should not exceed 24 hours.

As the Solutions Architect for the company, which of the following solutions should be implemented to meet the above requirement?

**ตัวเลือก:**
- [ ] Create one Amazon SNS topic and configure the SQS queues to subscribe to the SNS topic. Publish the same messages to all SQS queues. Filter the messages in each queue based on the quote request type.
- [ ] Create a data stream in Amazon Kinesis Data Streams. Use the Kinesis Client Library to deliver all the records to the designated SQS queues based on the quote request type.
- [x] Create one Amazon SNS topic and configure the SQS queues to subscribe to the SNS topic. Set the filter policies in the SNS subscriptions to publish the message to the designated SQS queue based on its quote request type.
- [ ] Create multiple Amazon SNS topics and configure the SQS queues to subscribe to the SNS topics. Publish the message to the designated SQS queue based on the quote request type.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทขายประกันอยากทำระบบ **"คัดกรองข้อความ (message filtering feature)"**
โดยมีกฎว่า: จะแยกท่อรอคิว **SQS แตกสาขาออกไปตามแต่ละประเภทของใบเสนอราคา (separate SQS queues for each type)** 
โจทย์ถาม: จะตั้งระบบคนส่งจดหมายยังไงให้กระจายงานลงท่อ SQS แต่ละท่อได้อย่างถูกต้องและมีประสิทธิภาพ (ฟิลเตอร์คัดจดหมายได้)?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ท่ามาตรฐานของ AWS ในการรับประกาศกระจายข่าว 1 จุด แล้วค่อยๆแตกแขนงแยกลงท่อ SQS หลายๆ เส้น เขาเรียกว่า **`"Fanout pattern" (คอมโบระหว่าง SNS + SQS)`**
- ทริคที่ 2: คีย์เวิร์ดของข้อนี้คือคำว่า **"กรองข้อความ (filtering)"** แทนที่เราจะระดมยิงหว่านจดหมาย(SNS) โง่ๆ ไปให้สี่ห้าท่อ SQS รอรับขยะซ้ำๆ กันเต็มไปหมด... สู้เราตั้งกฎดักไว้ที่ตัว Subscribe ของ SNS เลยดีกว่าว่า **"ตั้งคัดกรองที่กระบอกปืน SNS เลย (Set filter policies in SNS)"** ถ้าจดหมายนี้หมวด A ก็ปารู A, ถ้าหมวด B ก็ปารู B แยกกันชัดเจน

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create one Amazon SNS topic and configure the SQS queues to subscribe to the SNS topic. Set the filter policies in the SNS subscriptions to publish the message to the designated SQS queue based on its quote request type.**
- **ทำไมถึงถูก:** ทรงอย่างแบด! สร้างสถานีป่าวประกาศ (1 SNS Topic) พอเวลามีออเดอร์เข้า SNS จะทำหน้าที่ฉลาดๆ คือใช้ "Filter policies" แยกจับโยนจดหมายให้ตรงทะลุลงกระบอกลูกข่าย (SQS) เฉพาะที่เกี่ยวข้องเท่านั้น ไม่โหลดขยะบวม

❌ **[ผิด] Create one Amazon SNS topic... Publish the same messages to all SQS queues. Filter the messages in each queue...**
- **ทำไมถึงผิด:** ทำงานโง่! นี่คือการสแปมแจกโบรชัวร์ (Publish same messages to ALL) ให้ท่อ SQS ทุกท่อได้รับจดหมายเหมือนกันหมด แล้วค่อยภาระให้ท่อ SQS ไปนั่งลื้อหาเปิดแอบอ่านกรองทิ้งกันเอง... เป็นวิธีที่ปัญญาอ่อนและช้ามาก

❌ **[ผิด] Create multiple Amazon SNS topics and configure the SQS queues to subscribe to the SNS topics...**
- **ทำไมถึงผิด:** ซับซ้อนและเปลืองตัวมาก! การไปบ้าจี้สร้างสถานีประกาศแจ้งเตือน "หลายๆ ท่อ (Multiple SNS topics)" แยกตามหมวด มันดูแลรักษาจุกจิกวุ่นวาย เปลืองแบนด์วิดธ์ เปลืองเงิน สู้ทำสถานีเดียว (1 SNS) แล้วอาศัยฟีเจอร์แยกกรองข้างในฟินกว่า

❌ **[ผิด] Create a data stream in Amazon Kinesis Data Streams. Use the Kinesis Client Library to deliver all the records to the designated SQS queues...**
- **ทำไมถึงผิด:** เข้าป่าไปยิงนก! Kinesis ไม่ใช่ระบบไปรษณีย์คัดแยกจดหมาย (มันไม่มี Message Filtering) สิ่งที่คุณต้องการในโลก Decoupling บริหารคิวแอพคือ SNS คู่กับ SQS แค่นั้นจบ

---
---

## 📌 คำถามที่ 58
**โจทย์:**
A company plans to migrate all of their applications to AWS. The Solutions Architect suggested to store all the data to EBS volumes. The Chief Technical Officer is worried that EBS volumes are not appropriate for the existing workloads due to compliance requirements, downtime scenarios, and IOPS performance.

Which of the following are valid points in proving that EBS is the best service to use for migration? (Select TWO.)

**ตัวเลือก:**
- [ ] EBS volumes can be attached to any EC2 Instance in any Availability Zone.
- [x] EBS volumes support live configuration changes while in production which means that you can modify the volume type, volume size, and IOPS capacity without service interruptions.
- [x] An EBS volume is off-instance storage that can persist independently from the life of an instance.
- [ ] When you create an EBS volume in an Availability Zone, it is automatically replicated on a separate AWS region to prevent data loss due to a failure of any single hardware component.
- [ ] Amazon EBS provides the ability to create snapshots (backups) of any EBS volume and write a copy of the data in the volume to Amazon RDS, where it is stored redundantly in multiple Availability Zones.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกน้องเถียงเจ้านายตอแหล: เจ้านาย (CTO) กังวลเรื่องข้อจำกัดหลายอย่างของ ฮาร์ดดิสก์เช่า **Amazon EBS Volume** ว่ามันจะห่วยแตกกากเดน ไม่คู่ควรเอาขึ้นระบบจริง 
โจทย์เป็นคำถามวัดความรู้กว้างๆ ว่า: จงหาข้อแถแก้ตัวเริ่ดๆ (ข้อดีสุดเจ๋งระดับเทพ) ของฮาร์ดดิสก์ **EBS** มาโชว์เหนือลบคำสบประมาทเจ้านายให้ได้ 2 ข้อ!

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: ข้อดีข้อแรกสุดปังของดิสก์ EBS คือมันเป็น **"ฮาร์ดดิสก์ลอยฟ้า (Off-instance storage)"** แปลว่า ถ้าเครื่องคอมมึง (EC2) ถ่านหมดระเบิดบึ้มไป... ข้อมูลตับไตก้อนดิสก์ก็จะยังอยู่รอดปลอดภัย ไม่แหลกเหลวไปพร้อมกับซากเครื่อง
- ทริคที่ 2: ข้อดีข้อสองที่ว้าวสุดๆ คือ **มันสามารถขยายพุงสดๆ ตอนเครื่องเปิดรันอยู่ได้เลย! (Live configuration changes)** ขนาดดิสก์เต็มหรอ? กดรูดขยายไซส์เพิ่มเลย ไม่ต้องรีบู๊ท ปิดเครื่องให้เสียจังหวะ

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] EBS volumes support live configuration changes while in production which means that you can modify the volume type, volume size, and IOPS capacity without service interruptions.**
- **ทำไมถึงถูก:** ความเทพของแทร่! คุณสามารถเปลี่ยนชนิดดิสก์จากถูกไปแพง (HDD รูดไป SSD) บีบขยายพื้นที่ หรือเร่งความเร็วสปีดดิสก์ (IOPS) ในขณะที่เว็บรันลูกค้าช้อปปิ้งอยู่ได้สบายๆ ไม่ต้องมาแจ้งเตือนเว็บล่มขอปิดปรับปรุงใดๆ 

✅ **[ถูกต้อง] An EBS volume is off-instance storage that can persist independently from the life of an instance.**
- **ทำไมถึงถูก:** นี่คือหลักประกันความปลอดภัยกู้ชีพ! EBS มันเหมือน External Harddisk ถึงเราจะไปกระทืบทำลายเครื่องตัวแม่ (EC2 Instance) ทิ้ง ดิสก์มันก็จะหลุดกระเด็นออกมารอให้เราเอาไปเสียบเครื่องใหม่ได้เรื่อยๆ ชีวิตอมตะ (ถ้าเราติ๊กตั้งค่าไว้นะ)

❌ **[ผิด] EBS volumes can be attached to any EC2 Instance in any Availability Zone.**
- **ทำไมถึงผิด:** มั่วแล้วลูกเพ่! กฎข้อห้ามเหล็กของ EBS คือ **"มันข้ามเขตไม่ได้โว้ย!"** ฮาร์ดดิสก์มึงนอนอยู่ตึกทองย่าน AZ-A... วันดีคืนดีมึงอยากลากหัวสายดิสก์ข้ามจังหวัดไปเสียบตูดเครื่อง EC2 ในโซน AZ-B... แบบนี้ระเบิดแน่! (ทำไม่ได้ครับ ต้องทำ Snapshot ก๊อปข้ามไปก่อน)

❌ **[ผิด] When you create an EBS volume in an Availability Zone, it is automatically replicated on a separate AWS region...**
- **ทำไมถึงผิด:** ผิดระดับบ้าบิ่น! AWS มันสำรองก๊อปปี้ดิสก์ EBS ให้พังยากก็จริง แต่มันสำรองซ่อนหลบไว้ข้างๆกัน **"ภายในโซน AZ ดึกเดียวกันเท่านั้น (Within that zone only)"** ไม่ใช่สำรองข้ามโลกเหาะบินข้ามประเทศ (Separate AWS region) แบบที่คุยโวในช้อยส์นี้

❌ **[ผิด] Amazon EBS provides the ability to create snapshots... and write a copy of the data in the volume to Amazon RDS...**
- **ทำไมถึงผิด:** ประโยคแรกอารมณ์ดี "แคปรูปก๊อปปี้ Snapshot" ถูกต้อง... แต่พอขมวดท้ายดันบอกว่า เอารูปแบ็คอัพไปซุกเก็บไว้ในท่อฐานข้อมูล **"Amazon RDS"** ซะงั้น! (บ้าป่าว ปกติเขาเก็บรูป Snapshot กองดองทิ้งไว้ในหลุมดำ **Amazon S3** ต่างหากเล่า)

---
---

## 📌 คำถามที่ 59
**โจทย์:**
A digital media company shares static content to its premium users around the world and also to their partners who syndicate their media files. The company is looking for ways to reduce its server costs and securely deliver their data to their customers globally with low latency.

Which combination of services should be used to provide the MOST suitable and cost-effective architecture? (Select TWO.)

**ตัวเลือก:**
- [x] Amazon S3
- [ ] AWS Lambda
- [x] Amazon CloudFront
- [ ] AWS Global Accelerator
- [ ] AWS Fargate

---
### 🎯 โจทย์ต้องการอะไร?
เนื้อหาโจทย์: บริษัทสื่อมีเดียทำหน้าเว็บง่ายๆ ขายไฟล์แจกรูปแจกวิดีโอทั่วไป (Static content) ยิงแจกคนทั่วโลก
เป้าหมายคือ: หาวิธียิงแจกไฟล์พวกนี้ให้ **"โหลดไวปรู๊ดปร๊าดทะลุโลก (globally / low latency)"** โดยต้องพยายาม **"เซฟค่าใช้จ่ายให้ถูกทึ่สุดๆ (reduce server costs / cost-effective)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เพลงบรรเลงประจำชาติ AWS! ถ้ามีโจทย์บอกให้โฮสต์เว็บกากๆ หรือเสิร์ฟไฟล์นิ่งๆ **`Static content`** แบบประหยัดไร้เซิร์ฟเวอรให้ถูกบรรลัย... ช้อยส์แรกที่ต้องวิ่งไปหมอบกราบคือ **`Amazon S3`** 
- ทริคที่ 2: ถ้าอยากก๊อปปี้ปายอด S3 ให้กระเด็นกระจายแจกชาวโลกโหลดติดจรวด **`Globally with Low latency`**... ภรรยาคู่บุญที่ต้องกอดคอกันมาคู่กับถัง S3 เสมอคือเจ๊โล่ม่วง **`Amazon CloudFront (CDN)`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon S3**
✅ **[ถูกต้อง] Amazon CloudFront**
- **ทำไมถึงถูก:** นี่คือคอมโบอมตะคู่ฟ้า AWS "S3 + CloudFront" สำหรับการเสิร์ฟเว็บกระดาษหรือแจกไฟล์ ทิ้งไฟล์ไว้ในตุ่ม S3 ก้อนเดียวจบ (ไม่ต้องเช่าเซิร์ฟเวอร์ จ่ายค่าไฟ) แล้วเอาปืนใหญ่ CloudFront วางหน้าบ้านคอยก๊อปปี้พ่นแคชแจกชาวโลกอย่างรวดเร็ว (ได้ทั้งประหยัด ได้ทั้งโลกโหลดไว)

❌ **[ผิด] AWS Fargate**
❌ **[ผิด] AWS Lambda**
- **ทำไมถึงผิด:** ของดีนะ แต่ผิดงาน! ทั้ง Fargate (รันคอนเทนเนอร์) กับ Lambda (รันโค้ด Serverless จิ๋ว) พวกนี้เอาไว้รัน "Logic บวกลบคูณหาร สมองแอปพลิเคชั่น" ล้วนๆ ถ้าแค่จะให้เสิร์ฟรูปนิ่งๆ หรือ HTML กระดาษเปล่า... ทะลึ่งไปจ้างพวกมันมาทำงานนี่ถือว่าเปลืองค่าแรงมาก (สู้ S3 ถูกๆ ไม่ได้แม้แต่ปลายเล็บ)

❌ **[ผิด] AWS Global Accelerator**
- **ทำไมถึงผิด:** คู่แข่ง CloudFront! แต่เจ้านี่เกิดมาเพื่อเปิดทางด่วนให้พวกโปรแกรมประยุกต์ลึกๆ เกมออนไลน์ (UDP/TCP) หรือแอพที่ต้องการ IP เรนจ์คงที่ (Static IP) มันไม่ได้เก่งกาจเรื่องก๊อปปี้แคชประหยัดแบนด์วิดธ์โหลดรูปนิ่งๆ เท่า CloudFront ค้าบ

---
---

## 📌 คำถามที่ 60
**โจทย์:**
An Intelligence Agency developed a missile tracking application that is hosted on both development and production AWS accounts. The Intelligence agency’s junior developer only has access to the development account. The developer has received security clearance to access the agency’s production account but the access is only temporary and only write access to Amazon EC2 and Amazon S3 is allowed.

Which of the following allows the developer to issue short-lived access tokens that act as temporary security credentials to allow access to AWS resources?

**ตัวเลือก:**
- [ ] All of the given options are correct.
- [x] Use AWS Security Token Service (STS)
- [ ] Use AWS SSO
- [ ] Use Amazon Cognito to issue JSON Web Tokens (JWT)

---
### 🎯 โจทย์ต้องการอะไร?
องค์กรพิทักษ์โลกรันสองฝั่งแอคเคาท์ AWS (ฝั่ง Dev พัฒนา VS ฝั่ง Prod รบจริง)
มีเด็กฝึกงานคนนึง วันๆหมกตัวอยู่แต่ฝั่ง Dev... แต่วันนี้ฉุกเฉินได้รับอนุญาตให้ข้ามร่องไปเหยียบฝั่ง Prod ได้ **"แบบชั่วคราวฉุกเฉิน (access is ONLY TEMPORARY)"**
โจทย์ถาม: บริการเวทมนตร์ใดของ AWS ที่เสกคาถาผลิต **"ป้ายห้อยคอหมดอายุไว (short-lived access tokens / temporary security credentials)"** ให้เด็กคนนี้มุดรั้วข้ามประเทศไปทำภารกิจได้ชั่วคราวแล้วเหรียญพังทลายสลายร่างไปเอง?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ดหลุดโลกคำว่า **`"Short-lived / Temporary security credentials (บัตรพนักงานอายุสั้นแบบชั่วคราว)"`** มันคือสัญลักษณ์ประจำตัวของบริการแจกตั๋วหนัง **`AWS Security Token Service (STS)`** ล้วนๆ 100% เลยครับ (ตอบหลับตาจิ้มได้เลย)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Security Token Service (STS)**
- **ทำไมถึงถูก:** พระเอกตีโจทย์แตกกระจุย STS มีหน้าที่เดียวคือ "แจกพาสปอร์ตผี" ให้คนที่อยู่นอกประเทศ (หรือแอคเคาท์อื่นอย่างเด็ก Dev) ปลอมตัว Assume Role แอบมุดอุโมงค์เข้ามารับสิทธิ์ฝั่ง Prod ได้แค่ชั่วข้ามคืน (ตามเวลาที่กำหนด) พอหมดเวลาก็เตะกลับบ้าน (ปลอดภัย ป้องกันลืมลบสิทธิ์)

❌ **[ผิด] Use Amazon Cognito to issue JSON Web Tokens (JWT)**
- **ทำไมถึงผิด:** ผิดกลุ่มเป้าหมาย! Cognito เป็นยามเฝ้าล็อกอินบัญชี Facebook/Google ของ "ชาวบ้านผู้ใช้งานแอปทั่วไป (User authentication)" ไม่ได้กะเอามาปั๊มเหรียญตั๋วหนังชั่วคราวแจกทะลวงค่ายยึดแอคเคาท์ AWS Resources ของฝั่งแอดมินแต่อย่างใด

❌ **[ผิด] Use AWS SSO**
- **ทำไมถึงผิด:** AWS SSO (ปัจจุบันชื่อ IAM Identity Center) มันเป็นแดชบอร์ดศูนย์กลางสวยๆ ให้แอดมินพนักงานประจำกดจิ้มเลือกล็อกอินเข้าระบบหลายๆแอคเคาท์พร้อมกัน (แต่คนปั๊มเหรียญเบื้องหลังตัวแม่ที่แจกตั๋วอายุสั้นจริงๆ ก็คือเครื่องจักร STS นี่แหละ)

❌ **[ผิด] All of the given options are correct.**
- **ทำไมถึงผิด:** มั่วละ มีถูกข้อหน้าเป๊ะเว่อร์เบอร์เดียวเอง

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam Analysis (Test 2 - Part 13: ข้อ 61 - 65)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 61
**โจทย์:**
A DevOps Engineer is required to design a cloud architecture in AWS. The Engineer is planning to develop a highly available and fault-tolerant architecture consisting of an Elastic Load Balancer and an Auto Scaling group of EC2 instances deployed across multiple Availability Zones. This will be used by an online accounting application that requires path-based routing, host-based routing, and bi-directional streaming using Remote Procedure Call (gRPC).

Which configuration will satisfy the given requirement?

**ตัวเลือก:**
- [ ] Configure a Network Load Balancer in front of the auto-scaling group. Use a UDP listener for routing.
- [x] Configure an Application Load Balancer in front of the auto-scaling group. Select gRPC as the protocol version.
- [ ] Configure a Gateway Load Balancer in front of the auto-scaling group. Ensure that the IP Listener Routing uses the GENEVE protocol on port 6081 to allow gRPC response traffic.
- [ ] Configure a Network Load Balancer in front of the auto-scaling group. Create an AWS Global Accelerator accelerator and set the load balancer as an endpoint.

---
### 🎯 โจทย์ต้องการอะไร?
วิศวกรต้องการสร้างระบบแอปบัญชีออนไลน์หรูๆ โดยจะเอา Load Balancer มาวางขวางหน้าฝูง EC2 (Auto Scaling)
แต่สเปคของแอปนี้เรียกร้องความฟอพังชั่นเว่อร์วัง 3 อย่างคือ:
1. ต้องแยกทางเดินน้ำตามชื่อโฟลเดอร์ url ได้ **`(path-based routing)`**
2. ต้องแยกทางเดินตามชื่อโดเมนเว็บได้ **`(host-based routing)`**
3. รองรับการแชทเชื่อมต่อความเร็วสูงภาษาเอเลี่ยน **`(bi-directional streaming using gRPC)`**
โจทย์ถาม: ควรจะอัญเชิญ Load Balancer ตัวไหน (รุ่นไหน) มาประทับทรงถึงจะเก่งกาจทำได้ครบทั้ง 3 อย่างเป๊ะๆ?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เห็นคีย์เวิร์ดลูกเล่นอ่านภาษาคนออกอย่าง **`"path-based routing"`** (เลี้ยวซ้ายไป /images เลี้ยวขวาไป /video) หรือ **`"host-based routing"`** (เลี้ยวซ้ายเว็บ1 เลี้ยวขวาเว็บ2) ... โยน Network Load Balancer (NLB) ทิ้งถังขยะไปเลยครับ! เพราะ NLB โง่เป็นควายมันอ่านภาษาพวกนี้ไม่ออก โหลดบาลานซ์เซอร์รุ่นเดียวในโลกที่ฉลาดพอจะอ่านซองจดหมายระดับ Layer 7 HTTP นี้ออกคือ **`Application Load Balancer (ALB)`** เท่านั้น!! (ตอบข้อที่มี ALB อัตโนมัติ)
- ทริคที่ 2: ของแถมคือ ปัจจุบัน ALB ได้อัพแพทช์เวทมนตร์อัญเชิญเทพ **`gRPC`** (โปรโตคอลยิงรัวๆแบบแชทสด) มาจุติในร่างได้แล้วครับ สบายใจหายห่วง

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure an Application Load Balancer in front of the auto-scaling group. Select gRPC as the protocol version.**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาวตรงโจทย์ 300%! ALB เป็น Load Balancer ตัวท็อปสายเว็บไซต์ (Layer 7) ที่เหมาจบครบทั้ง Path-based, Host-based, และอัพเกรดรองรับภาษาเทพ gRPC ได้ด้วย

❌ **[ผิด] Configure a Network Load Balancer in front of the auto-scaling group. Use a UDP listener for routing.**
- **ทำไมถึงผิด:** NLB ถนัดสาดสายยางฉีดน้ำแรงดันสูง (Layer 4/UDP/TCP) แต่สมองมันทึบ มันไม่รู้ว่าแพ็กเก็ตข้างในมันกำลังเรียกเข้าโฟลเดอร์ไหนของเว็บ (Path-based Routing บอดสนิท) แถมมันไม่รู้จักจดหมายรักฉบับ gRPC ด้วย

❌ **[ผิด] Configure a Gateway Load Balancer in front of the auto-scaling group...**
- **ทำไมถึงผิด:** Gateway Load Balancer เป็นพี่ รปภ.คอยตรวจระเบิดตูดรถสิงคโปร์เข้าด่าน (Layer 3 Firewall) โดยใช้โปรโตคอลลับ "GENEVE" มันไม่ได้มีหน้าที่มารับแขกเสิร์ฟเว็บแอพพลิเคชั่น หรือทำ Path-based หวานแหววแต่อย่างใด

❌ **[ผิด] Configure a Network Load Balancer... Create an AWS Global Accelerator accelerator...**
- **ทำไมถึงผิด:** อัดความซับซ้อน Global Accelerator เข้ามาครอบ NLB อีกชั้นเพื่อทำทางด่วน แต่ก็ตกม้าตายอยู่ดีเพราะ NLB เบื้องหลังก็ยังโง่อ่านพาร์ท (Path-based) ไม่เป็นอยู่ดี แก้อะไรไม่ได้

---
---

## 📌 คำถามที่ 62
**โจทย์:**
A company developed a meal planning application that provides meal recommendations for the week as well as the food consumption of the users. The application resides on an EC2 instance which requires access to various AWS services for its day-to-day operations.

Which of the following is the best way to allow the EC2 instance to access the S3 bucket and other AWS services?

**ตัวเลือก:**
- [ ] Add the API Credentials in the Security Group and assign it to the EC2 instance.
- [ ] Store the API credentials in a bastion host.
- [x] Create a role in IAM and assign it to the EC2 instance.
- [ ] Store the API credentials in the EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
แอปพลิเคชั่นรันสิงสู่อยู่ในคอมพิวเตอร์ **EC2** 
หน้าต่างบานนี้อยากจะกระโดดข้ามรั้วไปหยิบของใน **ถัง S3** และเรียกใช้บริการเพื่อนบ้านอื่นๆ บน AWS ได้
โจทย์ถามตรงๆ ง่ายๆ: จะทำบัตรผ่านเข้าออก (ให้สิทธิ์การจกของ S3) แบบไหนให้พี่ EC2 ถึงจะ **"ปลอดภัยที่สุด / เป็นคนดีย์ที่สุด (Best way)"** ?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: กฎทองคำแห่งความปลอดภัยฝังหัวของ AWS! **"ห้ามจดรหัสผ่านรหัสลับ (API Credentials / Access Keys / Secret Key) แปะฝังทิ้งไว้ในโค้ดเครื่อง EC2 หรือที่ใดๆ เด็ดขาด!!"** (ถ้าแฮกเกอร์เจาะเครื่องได้ มันก็ขโมยรหัสมึงไปปล้นบ้านบูดต่อได้เลย) รูดช้อยส์ข้อไหนที่มีคำว่า "Store API Credentials" ทิ้งเรียบให้หมด!!
- ทริคที่ 2: วิธีที่นางฟ้า AWS ประทานพรมาให้คือการเสก **"แผ่นป้ายพนักงานชั่วคราว (IAM Role)"** แล้วเอาไปห้อยคอผูกติดกับเครื่อง EC2 ตัวนั้นเลย (Assign Role to EC2) EC2 จะหยิบของใน S3 ได้เองโดยไม่ต้องพกเหรียญกุญแจถาวรให้เสี่ยงโดนดักปล้น!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a role in IAM and assign it to the EC2 instance.**
- **ทำไมถึงถูก:** ทรงเยาวชนคนดี 100%! นี่คือ Best Practice อันทรงเกียรติ สวมปลอกคอ (IAM Role) แถบแม่เหล็กให้หลังตูด EC2 มันจะสร้างสิทธิ์ผีผ่านเข้าออก S3 เนียนๆให้เอง ปลอดภัยสุดยอดเพราะไม่มีรหัสผ่านตกค้างอยู่ในคอม

❌ **[ผิด] Store the API credentials in the EC2 instance.**
- **ทำไมถึงผิด:** ทรงโจรฉาวโฉ่! เอาแฟลชไดร์ฟเซฟรหัสผ่านเจ้านาย (API Credentials) ไปโยนทิ้งไว้บนเครื่อง EC2 ดื้อๆ... ขี้เกียจมักง่ายแบบนี้แหละที่โดนแฮกเกอร์ตามขุดเหมืองขโมยคีย์ไปปั่นบิทคอยน์หมดตัวกันมานักต่อนักแล้ว

❌ **[ผิด] Store the API credentials in a bastion host.**
- **ทำไมถึงผิด:** ไปกันใหญ่! เอาความลับระดับชาติไปฝากไว้ในเครื่องคอมพิวเตอร์หน้าหงายรับแขก (Bastion host) ที่มีหน้าที่แค่โผล่หน้าให้ชาวดอตเน็ตชิ่งกระโดดสเตปเฉยๆ... ไม่เมคเซนส์เลย แถมตรรกะเดิมคือ "ห้ามเซฟ Credential ฝังตายตัวในคอม" ครับ

❌ **[ผิด] Add the API Credentials in the Security Group and assign it to the EC2 instance.**
- **ทำไมถึงผิด:** มโนล้านเปอร์เซ็นต์! กำแพงไฟนรก Security Group มันมีสมองคอยเพ่งกรอง "หมายเลข IP กะ เลขป้ายทะเบียน Port ด่านตรวจตม." แค่นั้นโว้ย มันรวยขนาดมีช่องให้เสียบเอา "รหัสผ่าน API Credentials" ไปยัดซ่อนในกำแพงอิฐของมันได้ตั้งแต่เมื่อไหร่เล่า... คนออกข้อสอบเมาละ

---
---

## 📌 คำถามที่ 63
**โจทย์:**
A company has an on-premises MySQL database that needs to be replicated in Amazon S3 as CSV files. The database will eventually be launched to an Amazon Aurora Serverless cluster and be integrated with an RDS Proxy to allow the web applications to pool and share database connections. Once data has been fully copied, the ongoing changes to the on-premises database should be continually streamed into the S3 bucket. The company wants a solution that can be implemented with little management overhead yet still highly secure.

Which ingestion pattern should a solutions architect take?

**ตัวเลือก:**
- [x] Create a full load and change data capture (CDC) replication task using AWS Database Migration Service (AWS DMS). Add a new Certificate Authority (CA) certificate and create an AWS DMS endpoint with SSL.
- [ ] Use AWS Schema Conversion Tool (AWS SCT) to convert MySQL data to CSV files. Set up the AWS Application Migration Service (AWS MGN) to capture ongoing changes from the on-premises MySQL database and send them to Amazon S3.
- [ ] Set up a full load replication task using AWS Database Migration Service (AWS DMS). Launch an AWS DMS endpoint with SSL using the AWS Network Firewall service.
- [ ] Use an AWS Snowball Edge cluster to migrate data to Amazon S3 and AWS DataSync to capture ongoing changes. Create your own custom AWS KMS envelope encryption key for the associated AWS Snowball Edge job.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทยังมีฐานข้อมูลตู้แอร์เย็นเฉียบ MySQL (On-premises) อยู่ที่บ้านนอก 
เป้าหมายคือ: อยากสูบก๊อปปี้คัดลอกถังฐานข้อมูลนี้ ไปเป็นแผ่นไฟล์เอ็กเซล **"CSV"** โยนกักตุนไว้ในบ่อขยะ **Amazon S3** (เตรียมผงาดเข้าร่างทอง Amazon Aurora ต่อไป)
ที่สำคัญคือต้องทำสองจังหวะ: 
1. ตอนแรกก๊อปอัดให้หมดตุ่มเต็มๆรวดเดียว **(fully copied)**
2. หลังจากนั้น ถ้าโรงงานมีลูกกุ้งไหลแก้ข้อมูลใหม่แม้แต่ฟิลด์เดียว ก็ให้สูบไหลตามสตรีมมิ่งสดๆแอบไปแปะ S3 ทันทีตลอดกาล **(continually streamed ongoing changes)** 
และต้อง **"ขี้เกียจทำที่สุด (little management overhead) + ปลอดภัยไร้ปลิง (highly secure)"** ด้วย!

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: เพลงธีมรถบรรทุกสูบส้วมย้ายบ้านฐานข้อมูล! ถ้าเจอโจทย์สั่ง **"ย้ายข้อมูล Database เก่าแบบก๊อปตุ่มเต็มๆ (Full Load)"** แถมซูเปอร์จ็อบให้ **"สูบสอดส่องซิงค์ข้อมูลก้อนยิบย่อยที่เปลี่ยนไปแบบสดๆตลอดชีพ (Capture ongoing changes / CDC)"** ... พระเอกคนเดียวคือหลอดกาแฟยักษ์ **`AWS Database Migration Service (AWS DMS)`** เท่านั้นครับ (DMS เป็นแอพย้ายบ้านของ AWS ที่ครบเครื่องสุด)
- ทริคที่ 2: เขาระบุว่าต้องการความ **"ปลอดภัยสูงส่ง (Highly Secure)"** วิธีที่ฉลาดและเป็นเรื่องจริงที่สุดในการเข้ารหัสดักรหัสผ่านคือ การยื่น **"ใบประกาศนียบัตร (Certificate Authority / CA) ผูก SSL"** ให้อุโมงค์ท่อ DMS มันเคลือบเกราะทองนั่นเอง 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a full load and change data capture (CDC) replication task using AWS Database Migration Service (AWS DMS). Add a new Certificate Authority (CA) certificate and create an AWS DMS endpoint with SSL.**
- **ทำไมถึงถูก:** ตีโจทย์กระจุย! DMS เหมาล้างบางสองแฉกคือทำสูบอัดเหมาเข่งแรก (Full Load) และสูบชงตามการเปลี่ยนแปลงเรียลไทม์ (CDC) ตรงใจเป๊ะ! แถมแผ่กางรังสีเสริมความปลอดภัย Secure ด้วยเกราะ Certificate Authority (CA) บวกลบรหัส SSL เป็นอันเสร็จพิธีสบายๆ 

❌ **[ผิด] Set up a full load replication task using AWS Database Migration Service (AWS DMS). Launch an AWS DMS endpoint with SSL using the AWS Network Firewall service.**
- **ทำไมถึงผิด:** ซื้อหมูแถมสุนัข! อันนี้เซ็ตตั้งค่ามาแค่ "เหมาก๊อปตูมใหญ่รอบเดียว (Full Load)" ขาดวิชาตอดเล็กตอดน้อยสูบความเปลี่ยนแปลงภายหลัง (ขาด CDC / Ongoing changes) แถมยังทะลึ่งจะเอา "แม่ทัพ Network Firewall" มานั่งเซ็ตค่ากุญแจ SSL ให้ DMS อีก... ไฟร์วอลล์บ้าอะไรมันจะมาพิมพ์ใบเซอร์แจก SSL ให้ท่อสูบส้วม DMS วะ มันคนละสายงานกันมั่วเกิน!

❌ **[ผิด] Use AWS Schema Conversion Tool (AWS SCT) to convert MySQL data to CSV files. Set up the AWS Application Migration Service (AWS MGN) to capture ongoing changes...**
- **ทำไมถึงผิด:** โกหกทั้งแพ็คเกจ! 1. อุปกรณ์แม่แรงงัดแงะ "SCT" เอาไว้แปลงภาษาจากดอสเก่า (Orcale) เป็นภาษาดาวอังคาร (Aurora) มันไม่ได้มีฟีเจอร์โหลดเครื่องปริ้นเป็นกระดาษ CSV ไฟล์บ้าอะไรเลย 2. จะเอา "รถสิบล้อย้ายเซิร์ฟเวอร์ทั้งกระบิ (AWS MGN)" มาจับตาดู "Ongoing changes" ของฐานข้อมูล มันไม่ใช่! MGN เขาไว้ย้ายหน้าจอ OS คอมทั้งลูกขึ้น Cloud โว้ย ไม่ใช่ถอดเกล็ดปลาฐานข้อมูล

❌ **[ผิด] Use an AWS Snowball Edge cluster to migrate data to Amazon S3 and AWS DataSync to capture ongoing changes...**
- **ทำไมถึงผิด:** เอารถแบคโฮมาถอนขนจมูกชัดๆ! ไม่ได้ห้าม แต่มันเปลืองงบเปล่าๆ สั่งปิ่นโตเครื่องเหล็กชงช้าง (Snowball Edge) พร้อมเอา DataSync โยนข้ามหัวเพื่อสิงคอเปลี่ยนแปลงไฟล์... ในเมื่อโปรแกรมซอฟต์แวร์ DMS ตัวจิ๋วบนคลาวด์มันจัดการเหมาขุดฐานข้อมูล (Full+CDC) ได้จบๆด้วยปลายนิ้วแล้ว จะไปสั่งเหล็กมาที่บ้านให้เหนื่อยบริหารทำไมเล่า

---
---

## 📌 คำถามที่ 64
**โจทย์:**
A company has a serverless application made up of AWS Amplify, Amazon API Gateway and a Lambda function. The application is connected to an Amazon RDS MySQL database instance inside a private subnet. A Lambda Function URL is also implemented as the dedicated HTTPS endpoint for the function, which has the following value: `https://12june1898pil1pinas.lambda-url.us-west-2.on.aws/`

There are times during peak loads when the database throws a “too many connections” error preventing the users from accessing the application.

Which solution could the company take to resolve the issue?

**ตัวเลือก:**
- [ ] Increase the memory allocation of the Lambda function
- [ ] Increase the rate limit of API Gateway
- [ ] Increase the concurrency limit of the Lambda function
- [x] Provision an RDS Proxy between the Lambda function and RDS database instance

---
### 🎯 โจทย์ต้องการอะไร?
โจทย์ยาวเป็นกิโลใจความมีนิดเดียว: แอป Lambda (เด็กรับรถ) ยิงเชื่อมต่อวิ่งลงฐานข้อมูล RDS MySQL 
ปัญหาเกิดขึ้นตอนช่วงพีคๆ ลูกค้าโหมกระหน่ำกดเข้าเว็บ: เด็กรับรถ Lambda แม่งก๊อปปี้ร่างแยกร่างได้หลักหมื่นคนภายในเสี้ยววิ แต่ฝั่งตุ๊กตา RDS มันแยกร่างรับสายรับท่อไม่ทัน เลยขึ้นกากบาทสีแดงตีหน้าลูกค้าว่า **`"Too Many Connections (สายไม่ว่าง/คนเต็ม/ท่อตันแล้วโว้ยยย!)"`** ซะงั้นทำเว็บล่ม
โจทย์ถาม: แก้โรค "ท่อตันคนแย่งกันเสียบตูด RDS เยอะเกิน" ได้ด้วยวิธีเทพแบบไหนดีสุด?

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: นี่คือ Classic Pattern ยอดฮิตอันดับ 1 ในการออกแบบ Serverless เจอฐานข้อมูลยุคหิน! อาการ **`"Too Many Connections" (คิวท่อเต็ม)`** เกิดจากการที่พลพรรคแมลงสาบ Lambda เป็นร้อยหมื่นตัว แผลงฤทธิ์แห่มาขอชนแก้วกับ RDS ตัวเดียว ทุกตัวแย่งเปิดโต๊ะใหม่ (Open connection) จนร้านเจ๊งไม่มีที่ว่าง
- ทริคที่ 2: พระเอกขี่เครื่องกรองน้ำตัวพ่อฮีโร่จัดการคิวโต๊ะนี้คือ **`Amazon RDS Proxy`** (ยามหน้าผับ/เด็กรับรถ) มันจะทำหน้าที่ตั้งด่านกั้นหน้า RDS แล้ว "มัดรวมเหมาเข่งตั๋ว (Pool connections)" จัดระเบียบการเสียบแก้วชนขวดของ Lambda ให้หน้าผับดูเรียบร้อยชิวๆ และไม่ให้ร้าน RDS ฐานข้อมูลพังนั่นเอง!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Provision an RDS Proxy between the Lambda function and RDS database instance**
- **ทำไมถึงถูก:** ถูกต้องที่สุด! ถ้าเจอคู่ชก "Lambda + RDS" แล้วมีคำว่า Connections รั่วไหลเตือนสีแดง... หยิบเจลหล่อลื่น `RDS Proxy` มาทาคั่นกลางได้เลย มันถูกสร้างมาอุดช่องโหว่นี้โดยเฉพาะ บริหารการใช้หลอดดูดซ้ำ (Connection pooling) ให้โคตรเทพ 

❌ **[ผิด] Increase the memory allocation of the Lambda function**
- **ทำไมถึงผิด:** ผิดประเด็น! การอัพแรมให้ Lambda มันเก่งขึ้นเร็วขึ้น (ขยายพุงแมลงสาบ) มันก็ยิ่งทำให้ Lambda มันวิ่งแซงกันไปจ่อต่อคิวขอเสียบชนแก้ว RDS "ไวขึ้น ถี่ขึ้นและหนักขึ้น" เข้าไปใหญ่สิ ล่มไวกว่าเดิมล้านเปอเซ็นต์ฮะ

❌ **[ผิด] Increase the concurrency limit of the Lambda function**
- **ทำไมถึงผิด:** เอ๊า นี่ก็พากันลงนรก! อาการ "Concurrency Limit" คือการขยายเพดานเพิ่มกองทัพให้ Lambda แยกร่างสแปมเรียกได้เยอะขึ้น แยกร่างได้หลักหมื่นตัวมาถล่มทิ่มเสียบไข่ RDS... RDS ก็ช็อคตายชักกระตุกสิครับ (Too Many connection มันเกิดจากพวกมึงเยอะเกินไปนี่แหละ!) 

❌ **[ผิด] Increase the rate limit of API Gateway**
- **ทำไมถึงผิด:** โบยหน้าบ้านเฉย! การขยาย Rate Limit หน้าด่าน API Gateway ยิ่งทำให้มันทะลวงเปิดประตูปล่อยให้คำสั่งของลูกค้าถล่มยิงเข้ามาใส่ Lambda ได้ทะลักปรอทแตกเยอะขึ้น... ผลลัพธ์คือ RDS ก็แหกกระจายระเบิดพังไวขึ้นกว่าเดิมอีก 

---
---

## 📌 คำถามที่ 65
**โจทย์:**
For data privacy, a healthcare company has been asked to comply with the Health Insurance Portability and Accountability Act (HIPAA). The company stores all its backups on an Amazon S3 bucket. It is required that data stored on the S3 bucket must be encrypted.

What is the best option to do this? (Select TWO.)

**ตัวเลือก:**
- [x] Enable Server-Side Encryption on an S3 bucket to make use of AES-256 encryption.
- [ ] Store the data on Amazon EBS volumes with encryption enabled instead of using S3.
- [ ] Store the data in encrypted Amazon EBS snapshots.
- [ ] Enable Server-Side Encryption on an S3 bucket to make use of AES-128 encryption.
- [x] Before sending the data to S3 over HTTPS, encrypt the data locally first using your own encryption keys.

---
### 🎯 โจทย์ต้องการอะไร?
โรงพยาบาลมีขยะแบ็คอัพเก็บไว้ในบ่อ **Amazon S3 bucket** 
กฎหมายคนไข้บอกไว้ว่า ขยะก้อนทิ้งในบ่อเนี้ย **"มึงต้องแพ็คแผ่ลวดหนามเข้ารหัสกันขโมย (Encrypted) สถานเดียว!"** 
โจทย์ให้เสนอวิธีแผ่รังสีเข้ารหัสให้ถูกเป้าที่สุด (เลือก 2 ท่าเข้ารหัส S3 ที่เป็นไปได้)

### 🗝️ ทริคจับ Keyword หาคำตอบไว (สไตล์คนไม่เก่งอังกฤษ)
- ทริคที่ 1: การเข้ารหัสรูปใน S3 มีหลักๆ 2 ค่าย
  1. โยนสระให้แม่นาค AWS จัดการ **(Server-Side / ฝั่ง S3)** -> พอของโยนเข้า S3 ปั๊ป มันจะล็อคกุญแจเพชรเบอร์สุงสุด **`AES-256`** ให้ฟรีอัตโนมัติ 
  2. เข้ารหัสใส่กล่องเหล็กตั้งแต่ที่บ้านกูเลย **(Client-Side / ฝั่งลูกค้า)** -> คือจับรูปมาห่อกุญแจตีตลับเหล็กที่ออฟฟิศตัวเองให้เสร็จก่อน แล้วถึงค่อยสาดตูมขว้างลงแม่น้ำส่งไปให้บ่อ S3 เก็บ (Before sending to S3, encrypt locally)
- ทริคที่ 2: ข้อไหนทะลึ่งบอกว่าให้หนีไปเปิดเช่าโรงแรม **Amazon EBS (ฮาร์ดดิสก์ติดเครื่อง EC2)** แทน บ้องหูมันทีนึง ตัดทิ้งเลย เพราะข้อสอบเขาถามการสแกนและจัดการในโกดังน้อง "S3" เด้อ 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Server-Side Encryption on an S3 bucket to make use of AES-256 encryption.**
- **ทำไมถึงถูก:** พระเอกสุดคลาสสิคของค่าย Server-Side รูดซิปเปิดออพชั่น SSE-S3 ให้ถัง S3 จัดการตอกกุญแจเหล็กกล้าชั้นเกรงล่าวเวคกิ้งสูงสุด `AES-256` (มาตรฐานโลก) ปลอดภัยไร้กังวล

✅ **[ถูกต้อง] Before sending the data to S3 over HTTPS, encrypt the data locally first using your own encryption keys.**
- **ทำไมถึงถูก:** นี่คือเคล็ดลับวิชาสอดแนมขั้นเทพ (Client-side encryption)! กูไม่ไว้ใจมึงอะ AWS ปลอม... กูขอใช้กุญแจบ้านกูล็อคหีบสมบัติจากในคอมกู (encrypt locally first) ให้เป็นก้อนหินพรางตาก่อนจะโยกย้ายโอนขึ้นฟ้าสวรรค์ AWS นะ... ปลอดภัยขั้นสุดยอด

❌ **[ผิด] Enable Server-Side Encryption on an S3 bucket to make use of AES-128 encryption.**
- **ทำไมถึงผิด:** มั่วเบอร์ล็อคกุญแจ! AWS S3 Server Side ตัวดีฟอลต์มันไฮท็อป มันสาดรังสีล็อคกุญแจมาตรฐาน **`AES-256`** ยึดโลกเวิล์ดคลาสครับ! มันไม่มีตัวเลือกหลอกเด็กกิ๊กก๊อกถอยยุคอย่าง AES-128 ขายกากๆ ให้เลือกจิ้มหรอก 

❌ **[ผิด] Store the data on Amazon EBS volumes with encryption enabled instead of using S3.**
❌ **[ผิด] Store the data in encrypted Amazon EBS snapshots.**
- **ทำไมถึงผิด:** เสนอย้ายเผ่าพันธุ์ย้ายบ้านเฉย! กฎหมายสั่งให้ดูแลหอสมุดบนบ่ออึ **"Amazon S3"** แต่มึงดันทะลึ่งไปเช่าสร้างโกดังฮาร์ดดิสก์ราคาแพงจิปาถะอย่าง **"Amazon EBS (ฮาร์ดดิสก์ติดซีพียู)"** มาเปิดขนาบข้างเฉย... แถมโง่ย้ายไฟล์โยกหนีอีก ผิดจุดหมายโจทย์สุดๆ

---
---


