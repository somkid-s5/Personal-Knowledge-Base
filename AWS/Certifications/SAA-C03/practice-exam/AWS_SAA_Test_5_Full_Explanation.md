# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 1: ข้อ 1 - 10)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 1
**โจทย์:**
A local bank has an in-house application that handles sensitive financial data in a private subnet. After the data is processed by the EC2 worker instances, they will be delivered to S3 for ingestion by other services.

How should you design this solution so that the data does not pass through the public Internet?

**ตัวเลือก:**
- [ ] Create an Internet gateway in the public subnet with a corresponding route entry that directs the data to S3.
- [x] Configure a VPC Endpoint along with a corresponding route entry that directs the data to S3.
- [ ] Provision a NAT gateway in the private subnet with a corresponding route entry that directs the data to S3.
- [ ] Configure a Transit gateway along with a corresponding route entry that directs the data to S3.

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารมีแอปประมวลผลข้อมูลการเงินสุดซีเคร็ท ซ่อนตัวมิดชิดอยู่ในห้องลับ `private subnet`
พอแอปประมวลผลเสร็จ มันอยากจะคลอดข้อมูลส่งไปเก็บไว้ในโกดัง `Amazon S3`
คำสั่งเหล็ก: **"ตอนแอบส่งข้อมูลไป S3 ข้อมูลต้องมุดท่อระบายน้ำทิ้งส่วนตัว ห้ามโผล่หัวออกไปวิ่งบนถนนสายสาธารณะ (Internet) เด็ดขาดกลัวโดนแฮก! (does not pass through the public Internet)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียยืนหนึ่ง! เวลาคุณเปื่อยบ่นว่าอยากให้เครื่องในกำแพง (Private Subnet) "มุดท่อแอบมุดดินไปคุยกับ AWS Services ตัวอื่น (เช่น S3, DynamoDB) **โดยห้ามออกเน็ต (No Internet / private network)**" ตำตอบที่ถูกต้องล้านเปอร์เซ็นต์คือการจ้างนินจาขุดอุโมงค์วิเศษที่ชื่อว่า **`VPC Endpoint`** ทันทีฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure a VPC Endpoint along with a corresponding route entry that directs the data to S3.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! `VPC Endpoint (เสา Gateway Endpoint สำหรับ S3)` คือเส้นทางลัดอุโมงค์ลับนินจา! พอติดตั้งปุ๊บ... เครื่องซอมบี้ในห้องส่วนตัวสามารถมุดดินโยนไฟล์เข้าตุ่มน้ำ S3 ได้โดยตรงผ่านสายแลนภายในของ AWS ล้วนๆ ไม่ต้องโผล่หัวไปเจอโลกกว้างอินเทอร์เน็ตเลยฮะ ปลอดภัย 100% บรรลุโจทย์แป๊ะ!

❌ **[ผิด] Create an Internet gateway...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `Internet Gateway (IGW)` คือประตูหน้าบ้านโง่ๆ ที่เปิดอ้าซ่าให้วิ่งออกถนนใหญ่อินเทอร์เน็ต! โจทย์แม่งเพิ่งสั่งอยู่แหมบๆ ว่า "กูไม่เอา Internet!!" มึงยังจะยัดเยียด IGW ให้ลูกค้าอีก โดนด่าเช็ดฮะ!

❌ **[ผิด] Provision a NAT gateway...**
- **ทำไมถึงผิด:** หลอกเด็กอนุบาล! `NAT Gateway` มันเป็นตัวหลอกแปลไอพีให้แอบวิ่งออกถนนใหญ่ได้... แต่เห้ยยยย!! ปลายทางของมันก็ยังคือ **"ต้องวิ่งออก Public Internet อยู่ดี!!"** แค่คนนอกมองไม่เห็น IP ต้นทางเฉยๆ ข้อมูลมึงก็ผจญภัยกลางแดดเหมือนเดิม สอบตกคำสั่ง "ห้ามออกเน็ต"ฮะ

❌ **[ผิด] Configure a Transit gateway...**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! `Transit Gateway` มันเอาไว้เป็นปลั๊กสามตาเสียบเชื่อมหมู่บ้าน VPC เป็นร้อยๆ หมู่บ้านเข้าหากัน... **มันไม่เกี่ยวหอกอะไรกับการขุดท่อไปหาตุ่ม S3 เลยโว้ย!** เอาสายพ่วงแบตมาเสียบรูก้นตัวเองบ้าบอคอแตก

---
---

## 📌 คำถามที่ 2
**โจทย์:**
A company has multiple AWS Site-to-Site VPN connections placed between their VPCs and their remote network. During peak hours, many employees are experiencing slow connectivity issues, which limits their productivity. The company has asked a solutions architect to scale the throughput of the VPN connections.

Which solution should the architect carry out?

**ตัวเลือก:**
- [x] Associate the VPCs to an Equal Cost Multipath Routing (ECMR)-enabled transit gateway and attach additional VPN tunnels.
- [ ] Re-route some of the VPN connections to a secondary customer gateway device on the remote network’s end.
- [ ] Add more virtual private gateways to a VPC and enable Equal Cost Multipath Routing (ECMR) to get higher VPN bandwidth.
- [ ] Modify the VPN configuration by increasing the number of tunnels to scale the throughput.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีสายเจาะมิติ `VPN` ลากตรงจากออฟฟิศเข้าป่า VPC หลายเส้น 
ปัญหา: ตอนคนแห่กันเข้ามาทำงาน (peak hours) เน็ต VPN แม่งโคตรอืด คอขวดจนมดเดินแซง (throughput ตัน)! 
คำสั่งกึ่งบังคับ: **"หาทางขยายท่อ (scale the throughput) ขยายความเร็วแบนวิดท์ VPN ให้กูเดี๋ยวนี้!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: คณิตศาสตร์แห่งความเจ็บปวด! กฎเหล็กของ AWS บอกว่า "ท่อ VPN 1 อุโมงค์ แม่งตันที่ความเร็วขี้หมาแค่ **1.25 Gbps**! (ต่อให้จ่ายแพงแค่ไหนก็ไม่เพิ่ม)"
- ท่าไม้ตายที่ใช้แก้ทางกฎงี่เง่าข้อนี้คือ: เบิกเครื่องรางหมอผี **`Transit Gateway`** ที่มีสวิตช์ลับชื่อว่า **`ECMP (Equal Cost Multipath Routing)`** พอเปิดปุ๊บ... มันจะเอาท่อ 1.25 Gbps หลายๆ เส้นมามัดรวมกันเป็นทนทานโคตรยักษ์ได้หน้าตาเฉย! (เช่น มัด 4 เส้น = 5 Gbps ปรี๊ดทะลุโลก) นามบัตรนี้ตายตัว!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Associate the VPCs to an Equal Cost Multipath Routing (ECMR/ECMP)-enabled transit gateway and attach additional VPN tunnels.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! ก็ไอ้ `Transit Gateway` ที่เปิดโหมดโหลดบาลานซ์นินจา `ECMP` นี่แหละคือพระเอกขี่ม้าขาวของวงการ ทันทีที่มึงเอาสาย VPN มัดรวมกันเสียบรูตูดมันปุ๊บ มันจะแบ่งจราจรปั่นล้อฟรี 4 เส้นพร้อมกัน ขยายขนาดท่อ throughput แบบสเตียรอยด์ทะลุเพดานลิมิต 1.25 Gbps ได้สวยๆ เลยฮะ 

❌ **[ผิด] Add more virtual private gateways to a VPC and enable ECMR...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้ประตูบ้านตาแก่ **`Virtual Private Gateway (VGW)`** มันมีกฎเหล็กพระราชทาน 2 ข้อคือ: 
1) 1 VPC แปะขโมย VGW ได้แค่ "อันเดียวเท่านั้น!" ห้ามถมที่ 
2) แม่งโง่ดักดาน **ไม่รองรับท่าเวทมนตร์ ECMP มัดรวมท่อ!** (ทำได้แค่ Transit Gateway เว้ย!)

❌ **[ผิด] Modify the VPN configuration by increasing the number of tunnels...**
- **ทำไมถึงผิด:** เมาเห็ดพิษ! การตั้งค่า Site-to-Site VPN 1 หัว **"มันก็มีมรดกตกทอดให้ลากอุโมงค์ได้แค่ 2 Tunnels เป็นขีดจำกัดตายตัวของ AWS โว้ยยย!"** มึงไม่สามารถเบ่งกล้ามกดเพิ่ม Tunnels ในหน้า Config หลอกตัวเองได้ฮะ ฝันไปเถอะ!

❌ **[ผิด] Re-route some of the VPN connections to a secondary customer gateway device...**
- **ทำไมถึงผิด:** แสบข้างพุง! ท่าหาห่วงยางนี้ (เพิ่ม Customer Gateway ออฟฟิศฝั่งบ้านเรา) มันเป็นวิชาเอาตัวรอด **"กันเครื่องระเบิดเจ๊ง (High Availability / Failover)"**... แต่มันเอามาหารจราจร (Throughput) ขยายตัวไม่ได้โว้ย!! เลนวิ่งแม่งก็ตันที่ 1.25 Gbps เท่าเดิมแหละฮะ 

---
---

## 📌 คำถามที่ 3
**โจทย์:**
A company has several microservices that send messages to an Amazon SQS queue and a backend application that poll the queue to process the messages... The backend operations are I/O-intensive as the number of messages is constantly growing, causing the company to miss its SLA. The Solutions Architect must implement a new architecture that improves the application's processing time and load management.

Which of the following is the MOST effective solution that can satisfy the given requirement?

**ตัวเลือก:**
- [ ] Create an AMI of the backend application's EC2 instance and launch it to a cluster placement group.
- [ ] Create an AMI of the backend application's EC2 instance and replace it with a larger instance size.
- [x] Create an AMI of the backend application's EC2 instance. Use the image to set up an Auto Scaling group and configure a target tracking scaling policy based on the ApproximateAgeOfOldestMessage metric.
- [ ] Create an AMI of the backend application's EC2 instance... configure a target tracking scaling policy based on the CPUUtilization metric with a target value of 80%.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบก้มหน้าก้มตาส่งใบสั่งซื้อเข้ากระบะคิว `Amazon SQS` ปล่อยให้เครื่องหลังบ้านดูดคิวไปเคลียร์ชิ้นต่อชิ้น 
ปัญหา: งานมันทะลักโหมกระหน่ำ กระบะคิวค้างเติ่งบานเบอะ! ส่งผลให้หลังบ้านทำงานช้าเป็นเต่า **"เลยเวลาจัดส่งที่รับปากลูกค้าไว้ (miss its SLA - Service Level Agreement)!"**
คำถาม: ท่ายากไหนที่จะกระชากคอเรียกกองทัพทหารมารุมเคลียร์คิวกระบะนี้ให้ไวที่สุด เพื่อกู้หน้าบริษัท ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดในโลกคิว! ทันทีที่ข้อสอบบ่นเรื่อง **"เคลียร์คิว `SQS` ไม่ทัน / ทะลุเวลา SLA / งานค้างอืด"** ... ตัวชี้วัดสเกลออโต้ระดับเทพที่โชว์เก๋าที่สุดที่จะปลุกกองทัพออกมารับงาน คือค่าพลัง **`ApproximateAgeOfOldestMessage (ความแก่ชราของข้อความกระดูกงูที่ดองอยู่ในคิวนานที่สุด)`**!
(ไม่ได้ใช้ CPUUtilization นะโว้ย เพราะคิวมันสะสมไม่ได้เกี่ยวหอกอะไรกะ CPU เครื่องหน้างาน)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an AMI... set up an Auto Scaling group and configure a target tracking scaling policy based on the ApproximateAgeOfOldestMessage metric.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! สมมติตั้งกฎเป้าหมาย (target tracking) ไว้ขำๆ ว่า "มึงห้ามดองคิวเกิน 2 นาทีนะเว้ย!"... ทันทีที่ค่า `ApproximateAgeOfOldestMessage` จับโป๊ะได้ว่า "เห้ย มีลูกค้าคนแรกยืนโง่ๆ อยู่ในหีบคิวรอมา 2 นาทีครึ่งละ!"... ระบบ `Auto Scaling` แม่งจะสะดุ้งตัวโยน แล้วสปาวน์เครื่อง EC2 คลอดออกมาเป็นสิบๆ เครื่องมารุมสแครชเศษกระดาษคิวนั้นทิ้งทันที!! ทันใจ ตรงจุด ไม่ผิดสัญญาลูกค้า (SLA) ล้านเปอร์เซ็นต์ฮะ 

❌ **[ผิด] Create an AMI... target tracking scaling policy based on the CPUUtilization metric with a target value of 80%.**
- **ทำไมถึงผิด:** โดนสับขาหลอกหน้าคะมำ! `CPUUtilization` กูเอามากางเกงในรัดคอ!! ลองคิดตรรกะดิ เครื่อง EC2 มึงอาจจะนั่งดูดคิวไปงีบหลับกิน CPU แค่ 20% แบบชิวๆ... แต่เสือกโง่ดูดได้แค่ชั่วโมงละกล่อง! ในขณะที่ในกระบะ SQS แม่งมีคิวดองรอค้างอยู่สามล้านกล่อง!!! ระบบ Auto Scaling มึงก็ไม่ยอมพ่นเครื่องมาช่วยสิวะ (ก็ CPU มึงยังไม่ถึง 80% อะ!) แล้วบอสมึงก็โดนลูกค้าด่าบ้านล่มเพราะส่งของไม่ทัน! 

❌ **[ผิด] Create an AMI of the backend application's EC2 instance and replace it with a larger instance size.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! อัพเบ่งไซส์เซิร์ฟเวอร์ยักษ์ก้อนเดียว `larger instance size` (Scale-Up)? มึงเจ็บไข้อยากจะรับภาระหนักแค่ก้อนใหญ่ก้อนเดียว ไม่ใช้กองทัพลูกกระจ๊อกหลายเครื่องมาแบ่งเบาภาระโง่ๆ... แล้วถ้าคิวมันพีคทะลักจักรวาลมึงก็ดับอยู่ดี ไม่ได้แก้ปัญหาคนมารุมหยิบคิวแบบพร้อมเพรียง (parallel) 

❌ **[ผิด] Create an AMI... launch it to a cluster placement group.**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! เอาตึกไปกระจุกรวมในหลุมเดียวกอดคอหล่อๆ `cluster placement group` เพื่อแลกความเร็วรับส่งไฟล์แผงวงจรในเครือเดียวกันบ้าๆ บอๆ... มันไม่ได้ช่วยดึงของจากปากคิว SQS ให้ไวขึ้นเลยแม้แต่มิลลิเมตรเดียว! มั่วเรื่องแล้วฮะ

---
---

## 📌 คำถามที่ 4
**โจทย์:**
A logistics company based in the USA runs its web application on a fleet of Amazon EC2 instances in an Auto Scaling group. The company uses an Application Load Balancer to distribute traffic among the EC2 instances. The company runs the same application in multiple AWS regions to cater to clients across several countries. A recent government policy has been enacted that prohibits the company from servicing a specific country.

Which of the following options is the recommended action to comply with the government requirement?

**ตัวเลือก:**
- [ ] Update the route tables to forward all outbound traffic to AWS Network Firewall and configure a stateful domain list rule group to block the specified country
- [ ] Update the Network Access Control Lists of all subnets used by the Amazon EC2 instances to “deny” all IP addresses from the specific country.
- [ ] Update the Network Access Control Lists of all subnets used by the Application Load Balancers to “deny” all IP addresses from the specific country.
- [x] Create a Web ACL rule in AWS WAF to block the specified country. Associate the rule to the Application Load Balancers.

---
### 🎯 โจทย์ต้องการอะไร?
แอปหลังกำแพงเตี้ย `ALB` โดนรัฐบาลเผด็จการสั่งจดหมายปิดผนึก: 
**"กฎหมายใหม่มาแล้ว! มึงห้ามให้บริการห้ามเสิร์ฟเน็ตให้คนจาก 'ประเทศนี้ (specific country)' เด็ดขาด!! บล็อกแม่งให้หมดประเทศ!"**
คำถาม: ท่ายากไม้ตายไหนที่เสกมนต์ดำบล็อกยกแผง "เตะก้านคอคนทั้งประเทศ" ได้แม่นยำและง่ายที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าโจทย์ร้องเรียกความเกลียดชังระดับประเทศ **"Block specific country / Geo match condition"** = พระพุทธรูปบูชาที่กางม่านกระสุนเวทมนตร์นี้ได้คือศาลพระภูมิ **`AWS WAF (Web Application Firewall)`** ลำพังผู้เดียวในปฐพีฮะ! แล้วเอาไปแขวนคอเจ๊ต้อนรับแขก ALB 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a Web ACL rule in AWS WAF to block the specified country. Associate the rule to the Application Load Balancers.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! ศาลพระภูมิ `AWS WAF` มันเด่นดังเรื่องการกางยันต์แผ่อาณาเขตชลธร "ภูมิศาสตร์ทวีป (Geo match / Country)" สุดๆ... มึงแค่เข้าไปจิ้มเลือกชื่อประเทศเกาหลีเหนือ โป๊ะ!! แล้วเอายันต์มาแปะหน้าด่าน `ALB`... ทีนี้พอมีใครใช้เน็ตจากประเทสนั้นกดลิงก์แอปปุ๊บ แม่งโดนถีบกระเด็นเข้าหน้า 403 Forbidden ทันทีฮะ ไว ง่าย สะอาด จบ

❌ **[ผิด] Update the Network Access Control Lists of all subnets used by the Application Load Balancers to “deny” all IP addresses...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! จะใช้ทหารยาม `NACL` ไปบล็อกไอพีรายประเทศบ้าบอคอแตกอะไรวะ! มึงรู้ปะว่าประเทศนึงแม่งมี IP Address เป็นสิบล้านๆ ตัวขดเป็นแสนบรรทัด!! แล้ว NACL 1 วงเสือกมีโควต้าให้มึงจดโพยกระดาษได้แค่กระจึ๋งเดียว... มึงจะพิมพ์ IP ทั้งประเทศลงไปยังไงไหวล่ะฮะ!! เป็นลมตายพอดี 

❌ **[ผิด] Update the Network Access Control Lists of all subnets used by the Amazon EC2 instances...**
- **ทำไมถึงผิด:** งมเข็มในมหาสมุทร + บ้าบอแบบข้อทะลวง! นอกจะพิมพ์ IP ไม่หวาดไม่ไหวแล้ว มึงเสร่อไปตั้งยามหน้าตึก `EC2` ตัวลูกเจี๊ยบหน้างานทำไม ในเมื่อยามจ่าฝูงรับแขกของมึงคือ ALB ยืนกอดอกบังหน้าบ้านมิดชิดอยู่ (ลูกค้ามาติดกูที่ ALB ก่อน)! ไปตั้งยามผิดตึกก็โดดสับขาหลอกสิฮะ 

❌ **[ผิด] Update the route tables to forward all outbound traffic to AWS Network Firewall and configure a stateful domain list...**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! หมอผีใหญ่ `AWS Network Firewall` กางม่านหมอกป้องกันได้โหดก็จริง แต่มันเอาไว้กรองโดเมน (domain list) หรือท่อเครือข่ายลึกๆ... มันไม่ได้ออกแบบมาปุ่มเดียวจอด "บล็อกคนระดับประเทศ (geo/country blocking)" โง่ๆ แบบที่ AWS WAF แจกฟรีไว้แล้วฮะ ซอยยับเยินไปหน่อย

---
---

## 📌 คำถามที่ 5
**โจทย์:**
A company needs to use Amazon S3 to store irreproducible financial documents. For their quarterly reporting, the files are required to be retrieved after a period of 3 months. There will be some occasions when a surprise audit will be held, which requires access to the archived data that they need to present immediately.

What will you do to satisfy this requirement in a cost-effective way?

**ตัวเลือก:**
- [ ] Use Amazon S3 -Intelligent Tiering
- [x] Use Amazon S3 Standard - Infrequent Access
- [ ] Use Amazon S3 Standard
- [ ] Use Amazon Glacier Deep Archive

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายมีกระดาษรายงานไฟแนนซ์ที่ "หายไปมึงต้องชดใช้ด้วยชีวิตห้ามเสกขึ้นมาใหม่ (irreproducible)" จับดองเก็บไว้ใน `S3`
กติกาการขุดหลุมศพมาดู:
1. ปกติแล้ว จะนอนดองยาวๆ **"เปิดดูปีละแค่ 4 ครั้ง (after a period of 3 months)"** ก็น่าจะประหยัดงบได้
2. **ข้อยกเว้นสยอง:** เมื่อไหร่ก็ตามที่โดนออดิทจู่โจม... ทีมงานต้องสามารถกระชากศพขึ้นมาตอบคำถาม **"เดี๋ยวนั้นทันทีความเร็วแสง! (present immediately / rapid access)"**
คำถาม: จับไฟล์ก้อนนี้ยัดตึก S3 โซนไหน ที่ได้ทั้งความงกเงิน (cost-effective) และความไวสายฟ้าแลบ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับยูนิเวิร์ส! ถ้าโจทย์บ่นงึมงำว่า **"ดองไว้นานๆ ไม่ค่อยอยากแตะหรอก (Infrequent)" + "แต่พอจะดูปุ๊บ ต้องได้ไฟล์ปั๊บกระพริบตาเดียว! (immediately / millisecond access)"** + "ขอประหยัดตังค์ด้วย" = แมตช์นี้ล็อคคู่แต่งงานไว้ที่โลงซอมบี้ไฮเทค **`Amazon S3 Standard - Infrequent Access (S3 Standard-IA)`** ล้านเปอร์เซ็นต์ (แถมก๊อปปี้ 3 โซนทนทานเพราะไฟล์ห้ามสูญหายด้วย ยิ่งตรงสเปค!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Amazon S3 Standard - Infrequent Access**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! `S3 Standard-IA` แม่งคือตึกคนตาบอดที่ครบเครื่อง! ค่าเช่าฝากของรายเดือนแม่งโคตรถูกกว่าปกติครึ่งนึง (เข้าตำรางกดองเค็ม 3 เดือนดูที) และเดชะบุญ... ต่อให้มันค่าเช่าถูก **แต่มันแสกนเสิร์ชกระชากไฟล์ส่งให้คุณดูได้ความเร็วหลัก "มิลลิวินาที!" (Immediate access รอดตายตอนโดนออดิทบุก)** ถูก คุ้ม ดี๊ดี!

❌ **[ผิด] Use Amazon Glacier Deep Archive**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! โลงเย็นชั้น 18 ขุมนรก `Glacier Deep Archive` มันงกเงินที่สุดในจักรวาลก็จริง... แต่!!! ถ้านายกฯ ออดิทบุกมา แล้วมึงกดขอเบิกดูกระดาษไฟล์จากโลงนี้... **มึงต้องนั่งเกาไข่รอ "12 ชั่วโมง!!" กว่าโลงมันจะคายศพไฟล์ออกมาให้โว้ย!** (Immediately พ่องมึงสิฮะ) สอบตกคอขาดกระเด็น!

❌ **[ผิด] Use Amazon S3 Standard**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ในเมื่อมึงนานๆ ดองเค็มอ่านที (3 เดือนหน)... มึงจะไปจ่ายเงินแพงบรรลัยกัลป์ค่าตึกตัวท็อป `S3 Standard` ไปเพื่ออออ!? ลูกค้ามีเงื่อนไขรัดงบชัดเจน (cost-effective) มึงตังค์เหลือหรอฮะ ช้อยส์นี้โง่เรื่องงบฮะ

❌ **[ผิด] Use Amazon S3 -Intelligent Tiering**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ในเมื่อมึงรู้อนาคตชัดแจ้งปานตาเห็นอยู่แล้วว่าแพทเทิร์นคือ "ดองยา 3 เดือน"... มึงจะไปจ่ายเงินกินเปล่ารายเดือน ยัดค่าธรรมเนียมให้บอท AI `Intelligent Tiering` มานั่งกะพริบตาคิดเลขเดาสุ่มเลื่อนตึกให้มึงทำมะเขืออะไร! เสียค่าบอทฟรีโว้ยฮะ 

---
---

## 📌 คำถามที่ 6
**โจทย์:**
A web application hosted in an Auto Scaling group of EC2 instances in AWS. The application receives a burst of traffic every morning, and a lot of users are complaining about request timeouts. The EC2 instance takes 1 minute to boot up before it can respond to user requests. The cloud architecture must be redesigned to better respond to the changing traffic of the application.

How should the Solutions Architect redesign the architecture?

**ตัวเลือก:**
- [x] Create a step scaling policy and configure an instance warm-up time condition.
- [ ] Create a CloudFront distribution and set the EC2 instance as the origin.
- [ ] Create a new launch template and upgrade the size of the instance.
- [ ] Create a Network Load Balancer with slow-start mode.

---
### 🎯 โจทย์ต้องการอะไร?
แอปโหนกระแสกางมุ้งใน `Auto Scaling group (ASG)`
ปัญหาคือ: ทุกเช้าลูกค้าแห่กันพุ่งมารุมซื้อหมูปิ้ง (traffic burst) จนแอปหมุนค้าง (request timeouts) 
สาเหตุความกาว: ตัวเครื่อง `EC2` ใหม่ที่ถูกเสกมารับแขกน่ะ **"แม่งเสือกเอ๋อแดก กว่าจะปลุก Windows ตื่นรันโค้ดเสร็จ (boot up) ต้องนั่งรอ '1 นาทีเต็ม' ก่อนหน้าบ้านจะพร้อมเสิร์ฟ"**! (แปลว่าโดนทะลักจนล่มตายก่อนเครื่องใหม่จะพร้อม)
คำถาม: แก้ไขกรรมตรงนี้ยังไง ให้กองทัพเสริมพร้อมรับมือคลื่นซอมบี้ให้สมบูรณ์แบบ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับจักรวาล! ถ้าในข้อสอบอุตส่าห์ด่าว่า **"เครื่องใหม่ปลุกยาก / แอปใช้เวลาบู๊ทนานโง่ๆ เป็นนาที (instance takes X mins to boot up)"** 
= ไม้ตายลับที่เอาไว้แก้ปูพรมนี้คือ ฟีเจอร์หน่วงเวลาเผื่อให้แอปวอร์มอัพ ที่ชื่อตรงเป๊ะๆว่า **`Configure an instance warm-up time`** (บวกกับท่าสเกลตามขั้นบันได Step scaling policy) ร้อยล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a step scaling policy and configure an instance warm-up time condition.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! 
1. เปลี่ยนมาใช้ชูดสเกล **`Step scaling`** (คลื่นซอมบี้มาแรง ก็เสกปืนใหญ่ มากระจอกก็เสกปืนพก) แบบกะปริมาณได้ 
2. ตัวแก้ปัญหาบู๊ทช้าคือฟีเจอร์มนต์ดำ **`Instance warm-up`**! พอตั้งไปว่า 60 วิ... ต่อให้ตื่นมาใหม่ Auto Scaling จะจับบอทตัวนี้ขังลืมในซองเต้นท์ 60 วิห้ามรับลูกค้า! **และสถิติ CPU ของเครื่องที่กำลังสะลึมสะลือนี้จะไม่ถูกนำไปคิดปะปนกับเครื่องอื่นให้เกณฑ์รวนด้วย!** ทำให้ ASG รู้งานและปั๊มกองทัพสำรองเพิ่มได้ถูกจังหวะ ไม่มีลูกค้าหน้าไหนจอค้างอีกต่อไป! ซูฮกฮะป๋า!

❌ **[ผิด] Create a Network Load Balancer with slow-start mode.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คนออกข้อสอบแม่งปั่นหัวโคตรอำมหิต! ไอ้ปุ่มอุ่นเครื่องกากๆ ที่ชื่อ "Slow-start mode" อะ... **มึงหาได้แค่ในลูกศิษย์อย่าง Application Load Balancer (ALB) เว้ยย!! ส่วน Network Load Balancer (NLB) แม่งมีที่ไหนเล่า โกหกหน้าตาย!!** 

❌ **[ผิด] Create a new launch template and upgrade the size of the instance.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงจะบ้าหรอ อัพสเปคเครื่องปั่นไฟไซส์ยักษ์ (upgrade size) มาโง่ๆ... มึงคิดว่าคอมใหญ่เห็บหมามันจะบู๊ตตัวเองติดตั้งโค้ดหน้างานใน "กระพริบตา" ได้จริงๆ หรอฮะ!? เผลอๆ โหลดหน้าตายนานกว่าเดิมอีก! แล้วก็ไม่ตอบรับกับแก็งค์ Auto Scaling ขยาย/ยุบวงตามจำนวนจราจรตอนเช้าด้วย โคตรเปลืองตั๋ง

❌ **[ผิด] Create a CloudFront distribution and set the EC2 instance as the origin.**
- **ทำไมถึงผิด:** ขี่อีแต๋นไปซื้อของเล่น! ไอ้เจ๊ตู้คอนเทนเนอร์ `CloudFront` แม่งมีหน้าที่หลักคือแอบถ่ายก๊อปปี้รูปนิ่งหรือวิดิโอแคชส่งให้ไวๆ ข้ามทวีป... **แต่มันไม่ได้มีมนต์ดำซ่อมรักษาโรคมะเร็ง "เครื่อง EC2 โหลดแอปช้า (boot up takes 1 min)" โว้ยยยพี่!!** ปลายทางหลังบ้านมึงห่วย เจ๊เค้าก็แบกไม่ไหวนะฮะ!

---
---

## 📌 คำถามที่ 7
**โจทย์:**
A healthcare company stores sensitive patient health records in their on-premises storage systems. These records must be kept indefinitely and protected from any type of modifications once they are stored. Compliance regulations mandate that the records must have granular access control and each data access must be audited at all levels. Currently, there are millions of obsolete records that are not accessed by their web application, and their on-premises storage is quickly running out of space. The Solutions Architect must design a solution to immediately move existing records to AWS and support the ever-growing number of new health records.

Which of the following is the most suitable solution that the Solutions Architect should implement to meet the above requirements?

**ตัวเลือก:**
- [ ] Set up AWS Storage Gateway to move the existing health records from the on-premises network to the AWS Cloud. Launch an Amazon EBS-backed EC2 instance... Enable Amazon S3 server access logging and S3 Object Lock...
- [x] Set up AWS DataSync to move the existing health records from the on-premises network to the AWS Cloud. Launch a new Amazon S3 bucket to store existing and new records. Enable AWS CloudTrail with Data Events and Amazon S3 Object Lock in the bucket.
- [ ] Set up AWS Storage Gateway to move the existing health records from the on-premises network to the AWS Cloud. Launch a new Amazon S3 bucket... Enable AWS CloudTrail with Management Events and Amazon S3 Object Lock...
- [ ] Set up AWS DataSync to move the existing health records from the on-premises network to the AWS Cloud. Launch a new Amazon S3 bucket... Enable AWS CloudTrail with Management Events and Amazon S3 Object Lock...

---
### 🎯 โจทย์ต้องการอะไร?
โรงพยาบาลมีขยะไฟล์ประวัติคนไข้ กองอยู่ในออฟฟิศนับล้านไฟล์จน **ฮาร์ดดิสก์ออฟฟิศจะระเบิดแตกอยู่แล้ว!! (storage running out of space)**
เงื่อนไขโหดสัส:
1. "ต้องเร่งขนย้ายอีเวรพวกนี้ทิ้งไปอุดอู้ที่ AWS แบบสายฟ้าแลบทันที (immediately move)" เพื่อระบายที่ว่าง!
2. ไฟล์พวกนี้ห้ามเสร่อลบทิ้งตลอดกาล และ **"ห้ามไอ้โง่หน้าไหนมาแก้ไฟล์ดัดแปลงเด็ดขาด!! (protected from modifications / WORM)"**
3. รัฐบาลขู่จับคุก: เวลาไอ้หมอคนไหนเปิดดูไฟล์ไหน **"มึงต้องมีกล้องวงจรปิดจับตาดูระดับซอกไข่ทุกลมหายใจ เข้าถึงไฟล์ไหนบ้าง (audited at all levels / data access)"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: บีบคอขนย้ายไฟล์ขยะรอบเดียวไวๆ เอาของออกจากออฟฟิศทิ้งไป AWS = ท่าไม้ตายขนย้าย **`AWS DataSync`** (ถ้า Storage Gateway มันยังคาดหวังใช้งานร่วมกับของเดิมบนออฟฟิศอยู่)
- ทริค 2: แช่แข็งห้ามแก้ห้ามลบไฟล์ประวัติคนไข้เด็ดขาด = ตู้แช่โลงเย็น **`S3 Object Lock`** ล้านเปอร์เซ็นต์
- ทริค 3: ล้วงตับติดกล้องวงจรปิด "ใครเปิดอ่าน/เข้าถึงไฟล์ไหนรึกเปล่า?" (data access/object level API) = ต้องเปิดกล้องวงจรปิด **`CloudTrail`** พร้อมร่ายมนต์โหมดบ้าบิ่นที่ชื่อว่า **`Data Events` เท่านั้น!** (ถ้าเป็น Management Events มันหูหนวกตาบอด ไม่ตอบโจทย์ล้วงลึกระดับไฟล์)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up AWS DataSync to move the existing health records... Launch a new Amazon S3 bucket... Enable AWS CloudTrail with Data Events and Amazon S3 Object Lock...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! มิกซ์แอนด์แมทช์สมบูรณ์แบบกระจุยกระจาย! 
1) โสเภณีนักขนส่ง `DataSync` เก็บกวาดถีบไฟล์หลายล้านแผ่นจากออฟฟิศ ย้ายถิ่นฐานพุ่งลงตุ่มน้ำ S3 สะอาดสะอ้าน
2) หย่อนเวทย์ **`S3 Object Lock`** เคลือบไฟล์เป็นหุ่นไฟเบอร์ ห้ามใครลบห้ามใครแก้ ตลอดชั่วกัลป์ปาวสาน
3) เสกกริ่ง **`CloudTrail + Data Events`** จับผิดละเอียดยางหนืดระดับ "ใครแม่งควักไฟล์กูมาอ่าน (GetObject) / ใครเปลี่ยนชื่อไฟล์กี่โมง" ชนเพดานระดับ Audit compliance ของรัฐบาลยิ้มแฉ่งเลยฮะ

❌ **[ผิด] Set up AWS DataSync... Enable AWS CloudTrail with Management Events...**
- **ทำไมถึงผิด:** บอดตาใส! กาถูกมาซะยาว เสือกตกม้าตายตอนจบเลือก **`Management Events`**! โอ้แม่เจ้า! โหมดตาแก่ management events มันมีไว้ส่องดูพฤติกรรมผิวเผิน เช่น "แอดมินสร้างถังน้ำ S3 เปล่าหว่า / ใครแก้ไข IAM User กูหว่า"... แต่มัน **"ไม่เห็นโว้ยย!! ว่ามีหมาตัวไหนแอบจกไฟล์ 'ใบรับรองแพทย์.pdf' ไปอ่าน!!"** สอบตก Audit compliance หน้าแตกแน่นอน ต้องเลือกลูกรัก "Data Events" สิวะ!

❌ **[ผิด] Set up AWS Storage Gateway to move... Launch a new Amazon S3 bucket... Enable AWS CloudTrail with Management Events...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! โดนหลอกซ้ำซ้อน 2 เด้ง! นอกจากหางเสือ Management Events จะพังพินาศแล้ว... มึงยังจะหน้าด้านเอา **`Storage Gateway`** ไปใช้อีก! กู้สถานการณ์ "ไฟล์ที่ทิ้งแล้วไม่อยากให้มันโผล่หน้าเว็บออฟฟิศอีก (obsolete records)" นี่นะ! Storage default มันอมพื้นที่บนออฟฟิศคุณไว้เพื่อสแตนบายใช้งานอยู่ดี! ไม่ตอบโจทย์ "อยากย้ายของขยะทิ้งไป" โว้ย! แถมแพงกว่าลากทิ้งเฉยๆ ด้วย

❌ **[ผิด] Set up AWS Storage Gateway... Launch an Amazon EBS-backed EC2 instance... Enable Amazon S3 server access logging...**
- **ทำไมถึงผิด:** มั่วซั่วตายน้ำตื้น! จะเอาไฟล์ล้านแผ่นไปโยนใส่ฮาร์ดดิสก์ `EBS / EC2` นี่นะ!? มึงบ้าไปแล้ว EBS มันขยายร่างอัตโนมัติไม่เก่งเท่า S3 โคตรแพง แถมมึงเสือกเอา `S3 Object Lock` มาแปะในช้อยส์นี้อีก (อ้าว ตกลงมึงจะให้กูเก็บลง S3 หรือ EC2 สับสนตัวเองอ่อ?) บ้าบอคอแตกเกินเยียวยาฮะ!

---
---

## 📌 คำถามที่ 8
**โจทย์:**
An operations team has an application running on EC2 instances inside two custom VPCs. The VPCs are located in the Ohio and N.Virginia Region respectively. The team wants to transfer data between the instances without traversing the public internet.

Which combination of steps will achieve this? (Select TWO.)

**ตัวเลือก:**
- [ ] Launch a NAT Gateway in the public subnet of each VPC.
- [x] Set up a VPC peering connection between the VPCs.
- [ ] Deploy a VPC endpoint on each region to enable a private connection.
- [x] Re-configure the route table’s target and destination of the instances’ subnet.
- [ ] Create an Egress-only Internet Gateway.

---
### 🎯 โจทย์ต้องการอะไร?
ทีมงานปลูกบ้านบนเครื่อง `EC2` แบบกระจัดกระจาย: หลังนึงอยู่แคว้น Ohio อีกหลังอยู่แคว้น N.Virginia (คนละทวีป Region กันเลย!)
คำสั่งศาลไคฟง: **"หาทางขึงลวดสลิง เชื่อม 2 บ้านให้คุยโยนไฟล์กันได้ โดยห้ามออกถนนสาธารณะ (without traversing the public internet) มึงต้องมุดดินคุยกันส่วนตัวเท่านั้น!"** (เลือก 2 ข้อที่จะประกบกันแล้วเสร็จพิธี)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียยืนหนึ่ง! การเชื่อมบ้านสองหลัง `VPC to VPC` (แม้จะข้ามทวีปก็ไม่สน) ให้เป็นเหมือนสายสะดือเดียวกัน = พระเอกคือวิชาผูกวิญญาณ **`VPC Peering Connection`** 
- และกฎเหล็กของ AWS คือ: สร้างสะพานลอยเสร็จ มึงต้องสอนแผนที่ลูกบ้านด้วยว่า "ให้ก้าวขาซ้ายออกเดินข้ามสะพานนี้ล่ะ!" ด้วยการ **`แก้แผนที่ Route table`** ไม่งั้นสายเนวิเกเตอร์มึงก็โง่อยู่ดี ล้านเปอร์เซ็นต์

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Set up a VPC peering connection between the VPCs. / Re-configure the route table’s target and destination...**
- **ทำไมถึงถูก:** คอมโบปราบเซียนงูเหลือมจงอาง! 
1. สร้างสะพานลอยกรรม **`VPC peering (Inter-region Peering)`** เสียบตูดระหว่างบ้าน Ohio กับ N.Virginia ซะ! เดชะบุญสะพานนี้มันมุดดินข้ามโลกใต้โครงข่ายมหาสมุทรของ Amazon ล้วนๆ ไม่โผล่ออกเน็ตให้แฮกเกอร์เห็นเลย ปลอดภัยตามสั่ง!
2. แค่สร้างสะพานยังไม่จบ! แอดมินต้องเปิดแง้มแผนที่กรอกตา **`ชี้ Route table`** ของซับเน็ตแต่ละบ้านว่า "เฮ้ย ถ้าเพื่อนอยากจะคุยกับไอ้หนุ่ม Ohio มึงวิ่งขึ้นสะพานหมายเลข PCX-xxx นี่ไปเลยเว้ย!" จบปิ้งสมบูรณ์แบบ!

❌ **[ผิด] Launch a NAT Gateway in the public subnet of each VPC.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `NAT Gateway` คือรูตูดที่เปิดให้ออกวิ่งร่อนเร่หาบเร่บนถนน **"Public Internet"** ล้วนๆ เลย! โจทย์แม่งเพิ่งสั่งเหยงๆ ว่าห้ามมุดออรเน็ต! มึงจะเอามาขวางเพื่อ? ขัดคำสั่งเจ้านายไล่ออกฮะ!

❌ **[ผิด] Deploy a VPC endpoint on each region to enable a private connection.**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! นินจา `VPC Endpoint` มันมีไว้ให้เครื่อง EC2 แอบขุดรูไปหา "เทพพระเจ้า AWS Services ส่วนตัว (เช่น ถัง S3 หรือ DynamoDB)"... **แต่มันเสือก "ไม่สามารถเอามาขุดรูเสียบก้นให้ EC2 กับ EC2 คุยกันข้ามแคว้นได้โว้ยย!!"** มึงคนละเรื่องคนละอาชีพเลยฮะ 

❌ **[ผิด] Create an Egress-only Internet Gateway.**
- **ทำไมถึงผิด:** หลุดโลกไปไกล! ไอ้ประตูตาแก่ `Egress-only` แม่งเป็นอาวุธโบราณของระบบ **"IPv6 เท่านั้น"** ที่เอาไว้บล็อกคนนอกแอบเข้ามา... มึงจะเอามาดันทุรังประดิษฐ์เสาโทรเลขข้ามทวีป Ohio กับ Virginia บ้าบออะไร ไม่ได้ช่วยโยงอะไรหากันได้ทั้งสิ้น ผิดเป้าหมายสุดๆ 

---
---

## 📌 คำถามที่ 9
**โจทย์:**
A company is planning to launch a High Performance Computing (HPC) cluster in AWS that does Computational Fluid Dynamics (CFD) simulations. The solution should scale-out their simulation jobs to experiment with more tunable parameters for faster and more accurate results. The cluster is composed of Windows servers hosted on t3a.medium EC2 instances. As the Solutions Architect, you should ensure that the architecture provides higher bandwidth, higher packet per second (PPS) performance, and consistently lower inter-instance latencies.

Which is the MOST suitable and cost-effective solution that the Architect should implement to achieve the above requirements?

**ตัวเลือก:**
- [x] Enable Enhanced Networking with Elastic Network Adapter (ENA) on the Windows EC2 Instances.
- [ ] Use AWS ParallelCluster to deploy and manage the HPC cluster to provide higher bandwidth, higher packet per second (PPS) performance, and lower inter-instance latencies.
- [ ] Enable Enhanced Networking with Intel 82599 Virtual Function (VF) interface on the Windows EC2 Instances.
- [ ] Enable Enhanced Networking with Elastic Fabric Adapter (EFA) on the Windows EC2 Instances.

---
### 🎯 โจทย์ต้องการอะไร?
จะทำเซิร์ฟเวอร์วิจัยคำนวณบ้าพลังสุดขีด `HPC cluster` สภาพแวดล้อม:
1. แก๊งลูกหาบคือหน้าต่าง **`Windows servers`** 
2. ซื้อกล่องไซส์ **`t3a.medium`** (เครื่องกระจอกๆ สายประหยัด)
คำสั่ง: "ขอป้ายยา... โมดิฟายรถไถให้เป็นซูเปอร์คาร์! กูอยากได้อาวุธเสริมที่ช่วยเพิ่มแบนด์วิดท์ ยิงลูกปืนรัวๆ (higher PPS) และหน่วงลดลงต่ำติดดิน (lower latencies) โดยต้องแมตช์สเปคนี้และถูกตังค์ที่สุด!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: อาการเสี้ยนยาอยากได้เน็ตโคตรมาราธอน (higher bandwidth/PPS/lower latency) ท่าบังคับคือต้องโหลดปลั๊กอินมนต์ดำ **`Enhanced Networking`** มาใส่เครืองเสมอ!!
- แต่... รหัสลับตัวปัญหา: ข้อนี้หักมุมเหลี่ยมหักศอก!
  - `ENA (Elastic Network Adapter)`: ปลั๊กอินมนุษย์ทั่วไป ใส่ได้ทุกเพศทุกวัย (รองรับเครื่อง t3a และ Windows) ไหลลื่น 100 Gbps เสียเงินฟรี!
  - `EFA (Elastic Fabric Adapter)`: อาวุธเทพติดจรวดเทอร์โบ (OS-bypass) แต่ดันเจอทางตัน 2 ต่อ... "แม่งไม่รองรับ Windows OS โว้ย! และแม่งเสือกไม่แจกให้เครื่องขี้ประติ๋ว t3a แก๊งชนชั้นกลางใช้อีก!"

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable Enhanced Networking with Elastic Network Adapter (ENA) on the Windows EC2 Instances.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! พกห่วงยางยี่ห้อรอดตาย `ENA` มาใส่เท่านั้นฮะ! เพราะเป็นของฟรีที่รองรับทั้งเครื่อง `Windows` และลูกกระจ๊อกไซส์ `t3a.medium` ครบสูตร! ทันทีที่เปิด อัตราเร่งส่งพัสดุ PPS ก็จะปรู๊ดปร๊าดแบบไม่ต้องเติมลมยาง เป็น solution เบสแพรคทิสที่หาได้ตามท้องตลาดฮะ

❌ **[ผิด] Enable Enhanced Networking with Elastic Fabric Adapter (EFA) on the Windows EC2 Instances.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คนบ้าอะไรซื้อล้อแมกซ์จรวดไปใส่รถเข็นผัก! ไอ้เกราะเหล็กวิเศษ `EFA` (ที่มันข้ามหัว OS ดิบๆ OS-bypass) มันตั้งกฎอวดรวยไว้ว่า **"ห้ามชนชั้น Windows ใช่เว้ย (ถ้ามึงดันใส่ มันก็กลายร่างกลับเป็นแค่ ENA ธรรมดา ไม่มีเวทย์มนต์เพิ่ม) แถมมึงต้องเป็นเครื่องรุ่นรวยๆ HPC ตัวท็อปด้วย!!"** เอามาจับคู่กับเครื่องกากๆ t3a ข้อนี้ผิดบริบทเละเทะฮะ 

❌ **[ผิด] Enable Enhanced Networking with Intel 82599 Virtual Function (VF) interface...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! ปลั๊กอินช่างเหล็กยี่ห้อ `Intel 82599 VF` มันเก่าเป็นรุ่นคุณทวดดึกดำบรรพ์ไปแล้ว! และที่พังกว่าคือ **"มันเสือกไม่รองรับตระกูลเครื่องใหม่กิ๊กอย่างสเตก t3a.medium แต่อย่างใดฮะ"** ใส่ตลับมั่วผิดเบอร์ เล่นเกมต่อไม่ได้ 

❌ **[ผิด] Use AWS ParallelCluster to deploy and manage the HPC cluster...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! `AWS ParallelCluster` แม่งเป็นแค่ "รีโมทคอนโทรลจิ้มแอป" เอาไว้ปั๊มสร้าง/ลบขุมกำลัง HPC ง่ายๆ บนปุ่มเดียว... **แต่มันไม่ได้มีอำนาจศักดิ์สิทธิ์ที่จะไปทลายเวทย์มนต์เน็ตเวิร์ก "เพิ่มแบนด์วิดท์ / ลด Latency ต่ำเตี้ย" จากตัวบอร์ดวงจรเครื่องได้โว้ยย!!** มันต้องใช้ปลั๊กกายภาพของจริงอย่าง ENA เข้ามาเสริมฮะ มั่วเรื่องแล้ว

---
---

## 📌 คำถามที่ 10
**โจทย์:**
An application is hosted in an On-Demand EC2 instance and is using Amazon SDK to communicate to other AWS services such as S3, DynamoDB, and many others. As part of the upcoming IT audit, you need to ensure that all API calls to your AWS resources are logged and durably stored.

Which is the most suitable service that you should use to meet this requirement?

**ตัวเลือก:**
- [ ] Amazon API Gateway
- [ ] AWS X-Ray
- [x] AWS CloudTrail
- [ ] Amazon CloudWatch

---
### 🎯 โจทย์ต้องการอะไร?
แอปหลังบ้านซอย `EC2` แอบยิงกระสุนสคริปต์ (Amazon SDK) สั่งงานเรียกใช้ตุ่ม S3 กับบ่อ DynamoDB ไม่หยุดหย่อน 
รัฐบาลลงดาบมาว่า: "ไอบริทนี้โดนทีม IT Audit คว้านท้องตรวจ... มึงต้องหากล้องวงจรปิดศักดิ์สิทธิ์ ที่สามารถ **'จดบันทึกวิญญาณการเคาะประตูเข้าออก (logged all API calls)'** ไม่ว่าไขประตูทรัพยากรไหน ต้องจับภาพให้หมด และเก็บเทปไว้อย่างดี (durably stored)!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดบนดาวอังคาร! ทันทีที่คุณแม่บ่นคันปากหาคำว่า **"Audit/Compliance (ออดิทตรวจค้น) หรือ All API calls / Who did what / logged all activity"** = พระพุทธรูปบูชาที่มาร่ายเวทย์ถ่ายวิดีโอวงจรปิดให้เรื่องนี้ คือตาวิเศษ **`AWS CloudTrail`** องค์เดียวเท่านั้น! นอนมาล้านเปอร์เซ็นต์

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS CloudTrail**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! `CloudTrail` คือนักสืบจิ๋วโคนัน! มันรับเหมาบันทึกประวัติศาสตร์ตั้งแต่ "ไอบ้าหน้าไหน / สคริปต์ตัวไหน ทิ่มยิงคำสั่ง (API Calls) อะไรมา / เข้าเบ้ากี่โมง / จากคอมพิวเตอร์ IP หน้าไหน" ครบจบในประโยคดียว! แล้วแอบอัดแฟ้มยัดลงถ้ำ S3 (ดองออโต้) เอาไว้ปาอัดหน้าทีม Audit เวลาโดนตรวจค้นบัญชีได้รัดกุม 100% ฮะ!

❌ **[ผิด] Amazon CloudWatch**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! หมอประดน้ำปัสสาวะ `CloudWatch` แค่มันแอบมองกราฟชีพจรหน้าจอบิดเบี้ยวๆ "เห้ย CPU เครื่องมึงพุ่งกระฉูด 90% นะโว้ย / RAM หมุนบาน!"... แต่มันหน้าตาโง่มืดบอด **"ไม่รู้อะไรเลยว่า หมาตัวไหนแอบใช้กระสุนยิงเจาะข้อมูลเข้ามาบ้าง (Who did the API calls)!"** มันคนละหน้าที่กันฮะ แยกกระดาน!

❌ **[ผิด] AWS X-Ray**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! สแกนเนอร์เอ็กซเรย์ปอด `X-Ray` มันมีชีวิตอยู่เพื่อกางไทม์ไลน์หมอผ่าตัด "ทะลวงคอขวดแอป (debugging & trace)" ว่าตอนโยนลูกบอลผ่านไมโครเซอร์วิส แม่งติดบั๊กแหว่งตรงไหน... มัน **ไม่ได้ว่างบันทึกบัญชีใบรับเสร็จจับโจร "All API calls หน้าไหน" ครบทุกฟังก์ชั่นตามคำสั่งออดิทโว้ยยย!** 

❌ **[ผิด] Amazon API Gateway**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! `API Gateway` มันคือประตูปราสาทรับแขกหน้าบ้าน เอาไว้รับกระสุนเรียก REST API จากชาวบ้าน... ไม่ได้มียามคอยนั่งพับเพียบรับหน้าที่ "ตามจดไดอารี่ทุกกระบวนท่า (Log all AWS API calls)" บ้าบออะไรทั่วส้วมขนาดนั้น! หลงทางหนักแล้วฮะ!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 2: ข้อ 11 - 20)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 11
**โจทย์:**
A company has an application hosted in an Amazon ECS Cluster behind an Application Load Balancer. The Solutions Architect is building a sophisticated web filtering solution that allows or blocks web requests based on the country that the requests originate from. However, the solution should still allow specific IP addresses from that country.

Which combination of steps should the Architect implement to satisfy this requirement? (Select TWO.)

**ตัวเลือก:**
- [x] Using AWS WAF, create a web ACL with a rule that explicitly allows requests from approved IP addresses declared in an IP Set.
- [ ] Set up a geo match condition in the Application Load Balancer that blocks requests from a specific country.
- [ ] Place a Transit Gateway in front of the VPC where the application is hosted and set up Network ACLs that block requests that originate from a specific country.
- [x] Add another rule in the AWS WAF web ACL with a geo match condition that blocks requests that originate from a specific country.
- [ ] In the Application Load Balancer, create a listener rule that explicitly allows requests from approved IP addresses.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีแอปอยู่หลังกำแพงเตี้ย `ALB` และกำลังตั้งด่านตรวจคนเข้าเมืองสุดโหด (web filtering)
**กฎเหล็ก 2 ข้อ:**
1. กูเกลียด "ประเทศนี้ (specific country)" บล็อกคนที่มาจากประเทศนี้ทิ้งให้หมด!
2. แต่เดี๋ยวก่อน... ในประเทศนั้น ดันมีลูกค้า VIP ของเราอยู่ด้วย! จง **"ปล่อยผ่าน/อนุญาต (allow)"** แค่เฉพาะพวกลูกค้า VIP (specific IP addresses) เหล่านั้นให้เข้าตึกได้หน้าตาเฉย!

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าโจทย์ร้องเรียกอักษรศีลธรรม **"Block specific country / Geo match condition"** ประกอบกับจะเล่นท่ายาก **"อนุญาตเฉพาะบาง IP (IP Set)"** = คนเดียวที่เนรมิตศาลพระภูมิแบบนี้ได้คือ **`AWS WAF`** พระเอกตลอดกาลฮะ
- ข้อบังคับคือ WAF ต้องสร้าง 2 กฎควบคู่กัน: กฎแรกเอาไว้กระถืบพรมประเทศทิ้ง (Geo match block) / กฎสองเอาไว้ช้อนหน้ากาก IP ของเสี่ย VIP (IP Set allow)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Using AWS WAF, create a web ACL with a rule... allows... IP Set / Add another rule in the AWS WAF web ACL with a geo match... blocks... specific country.**
- **ทำไมถึงถูก:** คอมโบปราบเซียนงูเหลือมจงอาง! มิกซ์แอนด์แมทช์สมบูรณ์แบบกระจุยกระจาย!
1) ศาลพระภูมิ `WAF` สร้างกฎลวดหนาม (Geo match) สั่งถีบส่งใครก็ตามที่แหยมมาจากประเทศเกาหลีเหนือ
2) แต่ WAF ก็เขียนข้อยกเว้นเป็นยันต์แผ่นที่ 2 (IP Set) แปะทับบอกยามว่า "แต่ถ้าเป็น IP 123.45.67 ของท่านผู้นำ VIP ล่ะก็... เปิดประตูเชิญท่านเข้าประทับได้เลยขอรับ!" โคตรสมาร์ท กฎซ้อนกฎจบใน WAF ที่เดียว!

❌ **[ผิด] Set up a geo match condition in the Application Load Balancer...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงจะบ้าหรอ ลูกจ๊อกหน้าโง่ `ALB` มันไม่ได้มีสมองมานั่งเปิดแผนที่โลกแยกแยะ "นายมาจากประเทศไหน (geo match)" โว้ย!! หน้าที่กรองประเทศมันคือของ AWS WAF พระเครื่องหลวงพ่อโกยฮะ โดนต้มเปื่อยแล้ว

❌ **[ผิด] In the Application Load Balancer, create a listener rule that explicitly allows requests from approved IP addresses.**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! การที่มึงไปนั่งสร้างตาราง Listener rule แยกบน ALB เพื่อมานั่งเช็ค IP... มันไปแย่งงาน WAF ทำไมฮะ!? ในเมื่อพระพุทธรูป WAF ก็มีโหมด IP Set ให้ใช้เป็นปึกแผ่นครบวงจรอยู่แล้ว ผสมกันมั่วซั่วการจัดการจะปวดหัวฮะ! (ข้อสอบอยากให้จบที่ WAF หมดเลยมากกว่า)

❌ **[ผิด] Place a Transit Gateway in front of the VPC... and set up Network ACLs that block requests that originate from a specific country.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! จะเอาทหารยาม `NACL` ไปบล็อกไอพีรายประเทศบ้าบอคอแตกอะไรวะ! ประเทศนึงมี IP เป็นสิบล้านๆ ตัว มึงจะกรอกแมนวลลงกระดาษ NACL ไหวหรอฮะ!? ยิ่งเอาปลั๊กพ่วง `Transit Gateway` ข้ามโลกมามิกซ์อีก บ้าไปกันใหญ่! 

---
---

## 📌 คำถามที่ 12
**โจทย์:**
A company has an On-Demand EC2 instance with an attached EBS volume. There is a scheduled job that creates a snapshot of this EBS volume every midnight at 12 AM when the instance is not used. One night, there has been a production incident where you need to perform a change on both the instance and on the EBS volume at the same time when the snapshot is currently taking place.

Which of the following scenario is true when it comes to the usage of an EBS volume while the snapshot is in progress?

**ตัวเลือก:**
- [ ] The EBS volume can be used in read-only mode while the snapshot is in progress.
- [x] The EBS volume can be used while the snapshot is in progress.
- [ ] The EBS volume cannot be used until the snapshot completes.
- [ ] The EBS volume cannot be detached or attached to an EC2 instance until the snapshot completes

---
### 🎯 โจทย์ต้องการอะไร?
เครื่อง `EC2` มีฮาร์ดดิสก์ `EBS` ห้อยต่องแต่งอยู่ กิจวัตรคือเที่ยงคืนจะปั๊มตราประทับถ่ายรูปเซฟเก็บไว้ (create a snapshot) ตัวดิสก์จะได้พัก
แต่คืนนึงดวงซวยเซิร์ฟล่มต้องรีบซ่อมแซม **"กูเผลอไปกดอัพเดตข้อมูลลงฮาร์ดดิสก์ ตอนที่มันกำลังหมุนติ้วๆ ถ่าย snapshot อยู่พอดีเป๊ะ!"**
คำถาม: ฮาร์ดดิสก์ EBS มันจะด่าพ่อไหม? กฎข้อยกเว้นตอนถ่ายรูปมันเป็นไง ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ความอเมซิ่งของเทคโนโลยีต่างดาว AWS! การกดถ่ายรูปก๊อปปี้ `Snapshot` ของ EBS มันคือการ "สแนปภาพระดับวินาทีวิญญาณ!" ดังนั้นต่อให้หลอดโหลดถ่ายรูปเพิ่งจะวิ่งไปแค่ 5% (snapshot is in progress)... **"มึงก็สามารถกลับไปตีดอตเอ อ่าน-เขียน (I/O) ทำทุกอย่างบนดิสก์จริงได้ปกติตามสบายเลยโว้ยย!! ไม่ต้องรอโหลดเสร็จ ข้อมูลก็ไม่พัง!"** (AWS แม่งเทพขนาดนั้นแหละ)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The EBS volume can be used while the snapshot is in progress.**
- **ทำไมถึงถูก:** เคาะกะโหลกจำ! AWS ประกาศกร้าวเลยว่า "ขณะที่แถบโหลด Snapshot กำลังคืบคลาน... มึงจะอ่าน จะเขียน จะลบ จะขยี้ก้อนดิสก์ต้นฉบับยังไงก็เชิญตามสบาย ไม่สะทกสะท้าน!" (เพราะภาพก๊อปปี้มันถูกชักภาพนิ่ง Freeze สต๊าฟเวลาเอาไว้ตั้งแต่วินาทีแรกที่คุณกดปุ่มถ่ายรูปไปแล้วนั่นเอง) 

❌ **[ผิด] The EBS volume can be used in read-only mode while the snapshot is in progress.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ใครบอกว่าโดนสาปให้เป็นโหมด "อ่านได้อย่างเดียว (read-only)" ล่ะฮะ!? AWS เค้าเทพพอ ไม่ต้องมากั๊กไม่ให้กูเขียนข้อมูลระหว่างรอหรอกฮะ โยกย้ายส่ายสะโพกใช้งานได้ทุกกระบวนท่า!

❌ **[ผิด] The EBS volume cannot be used until the snapshot completes.**
- **ทำไมถึงผิด:** ไร้สาระ! ถังหมักดอง Snapshot ใหญ่ๆ ไซส์วัยรุ่น บางทีแม่งแช่รอเป็น "หลายชั่วโมง" กว่าจะครบบล็อกเสร็จ... ถ้ากูต้องปิดบริษัทห้ามมึงแตะคอมเพื่อรอโหลดเสร็จ ลูกค้าไม่ต้องด่าพ่อกันหมดหรอฮะ! ยืดหยุ่นสิครับยืดหยุ่น!

❌ **[ผิด] The EBS volume cannot be detached or attached to an EC2 instance until...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มโนเพ้อพกตั้งกฎหมายเองไปเรื่อย! ระหว่างโหลดสแนปช็อต กูก็ดึงดิสก์จุกกรูดออก หรือย้ายไปสิงเครื่องใหม่ได้หน้าตาเฉยฮะ ไม่ได้มีกุญแจโดนล็อกขังลืมโว้ย!

---
---

## 📌 คำถามที่ 13
**โจทย์:**
A client is hosting their company website on a cluster of web servers that are behind a public-facing Application Load Balancer (AWS ALB). The client also uses Amazon Route 53 to manage their public DNS.

How should the client configure the DNS zone apex record to point to the load balancer?

**ตัวเลือก:**
- [ ] Create an A record pointing to the IP address of the load balancer.
- [x] Create an A record aliased to the load balancer DNS name.
- [ ] Create an alias for CNAME record to the load balancer DNS name.
- [ ] Create a CNAME record pointing to the load balancer DNS name.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกค้าเอาเว็บไปหมกไว้หลัง `Application Load Balancer (ALB)` และใช้พระสงฆ์ทำพิธีป้ายชื่อจากกรมที่ดิน `Amazon Route 53`
ปัญหาลูกทุ่ง: **"กูอยากเอาโดเมนชั้นเซียนตัวท็อปสุดสายป่าน (Zone Apex เช่น tutorialsdojo.com เพียวๆ ไม่มี www นำหน้า) ไปชี้เป้าลงหัว Load Balancer นี้ซะ!"**
คำถาม: กดรหัสคีย์ลัดไหนใน Route 53 ถึงจะชี้ดิ่งทะลุมาหาตัว Load balancer ได้เป๊ะปัง ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดในโลก DNS! กฎเหล็กของพระเจ้าคือ: **"ชั้นบนสุดของโดเมน (Zone Apex เช่น google.com เพียวๆ) ห้าม! ห้ามใช้ป้ายชื่อตัวแทนโง่ๆ อย่าง CNAME ชี้เป้าเด็ดขาด!!"**
- ท่าไม้ตายพลิกแพลง: AWS เสกเวทย์มนต์ขี้โกงที่ชื่อว่า **`Alias Resource Record Set (Alias Record)`** มาให้ใช้! คุณสามารถสร้างป้าย **`A Record แบบมีโหมดติ๊กถูกคำว่า Alias`** แล้วชี้เป้าผีสิงไปกอดคอ DNS name ของ ALB ได้เนียนๆ แบบแหกกฎกรรมเลยล่ะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an A record aliased to the load balancer DNS name.**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! เข้าคู่สเปคเทพซิ่ง! ในเมื่อยอดปิรามิด (Zone Apex) มันเกลียด CNAME... เราก็เนียนใช้ป้ายหน้าฉากเป็น **`A Record`** สิ! แล้วกดติ๊กฟีเจอร์มนต์ดำ **`Alias (ฝากเลี้ยง)`** โยงเส้นเอ็นไปหาชื่อห้อยท้ายของ `Load balancer` ตรงๆ! เดชะบุญ... ต่อให้ ALB แม่งสะเออะเปลี่ยนไอพีเปลี่ยนเบอร์โทรหนีเป็นร้อยรอบ Route 53 ศักดิ์สิทธิ์ก็จะส่งอัปเดตไอพีใหม่ตามล่าสิงบ่ามันให้ฟรีๆ ไม่มีหลุด! สมบูรณ์แบบ!

❌ **[ผิด] Create a CNAME record pointing to the load balancer DNS name. / Create an alias for CNAME record...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! โดนตบหน้าสั่นกระบาลแยก! กฎมณเฑียรบาลแห่งวงการอินเทอร์เน็ตหน้าแรก: **"มึงห้ามเอา CNAME record ไปแขวนป้ายบนยอดมงกุฎ Zone Apex เด็ดขาดมันผิดกฎหมาย!!"** (CNAME มันอนุญาตให้เขียนได้แค่ระดับลูกกระจ๊อกอย่าง www. เท่านั้น!) กาข้อนี้เหมือนกาใบลาออกฮะ 

❌ **[ผิด] Create an A record pointing to the IP address of the load balancer.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! มึงกล้าเอาตัวเลข IP Address โง่ๆ ไประบุชี้เป้าหา ALB หรอฮะ! มึงรู้ปะว่า Load Balancer ของ AWS อะ... **"มันชอบแอบเปลี่ยนสลับชุดตัวเลข IP ของมันตลอดเวลา (dynamic IP)!!"** ขืนมึงเอา IP เก่าไปกรอกแขวนป้ายไว้ สักพักลูกค้สเข้าเว็บมึงไม่ได้เพราะบ้านล่มชัวร์ล้านเปอร์เซ็นต์ เลวร้ายมาก!! 

---
---

## 📌 คำถามที่ 14
**โจทย์:**
A Solutions Architect is working for a multinational telecommunications company. The IT Manager wants to consolidate their log streams including the access, application, and security logs in one single system. Once consolidated, the company will analyze these logs in real-time based on heuristics. There will be some time in the future where the company will need to validate heuristics, which requires going back to data samples extracted from the last 12 hours.

What is the best approach to meet this requirement?

**ตัวเลือก:**
- [ ] First, set up an Auto Scaling group of EC2 servers then store the logs on Amazon S3 then finally, use EMR to apply heuristics on the logs.
- [ ] First, send all the log events to Amazon SQS then set up an Auto Scaling group of EC2 servers to consume the logs and finally, apply the heuristics.
- [x] First, send all of the log events to Amazon Kinesis then afterwards, develop a client process to apply heuristics on the logs.
- [ ] First, configure Amazon Cloud Trail to receive custom logs and then use EMR to apply heuristics on the logs.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งกวาดถังขยะ: "เห้ย! ไปกวาดแฟ้มประวัติ (Logs) ทุกลายเซ็นต์รอบบริษัทมากองรวมกันหน่อย!"
ความโหดสัส: 
1. ต้องมีวิชาตาทิพย์ **"ดูดจับและสแกนพฤติกรรมแฟ้มประวัติแบบสดๆ วินาทีต่อวินาทีเดี๋ยวนั้นทันที! (analyze in real-time)"**
2. สมองปลาทอง: "แต่กูอยากขอย้อนเวลาเปิดลิ้นชักกลับไปดมกลิ่นแฟ้มเก่าๆ **กรอถอยหลังได้ '12 ชั่วโมงที่แล้ว'** ด้วยนะ!"
คำถาม: กระบะทรายศาลพระภูมิไหน ที่เปิบข้าวได้ไวแบบสายฟ้าแลบ และดองผักบุ้งไว้ได้ข้ามคืน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ทันทีทีเจอคำแช่ง **"Real-time streaming / Real-time processing"** ของมวลมหาข้อมูล (Big data logs) = ผู้รับเหมาป้ายแดงตัวเต็งหนึ่งในปฐพีคือสายพาน **`Amazon Kinesis`** เท่านั้น! (บริการอื่นส่วนใหญ่มันชักช้าเป็นเต่า ถ่มน้ำลายใส่หน้าได้เลย)
- ทริค 2: แอบใจดี `Kinesis Data Streams` แม่งมีสวิตช์วิเศษหน้าลิ้นชัก ให้ดองขยะมิติคู่ขนาน **"กรอกลับย้อนเวลาดูเทปเก่า (retention period) ได้นาน 24 ชั่วโมงเป็นค่า Default (และปรับได้ถึง 365 วัน)"**... ดังนั้นสเปคร้องขอ "ย้อนดู 12 ชั่วโมง" สบายหมูทะเลยน้อง!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] First, send all of the log events to Amazon Kinesis then afterwards, develop a client process to apply heuristics on the logs.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! บริการพ่อพระรูปหล่อ **`Amazon Kinesis`** นามบัตรมันคือเจ้าพ่อ "เรียลไทม์ (Real-time analytic)" ตกกระป๋องเข้ามากี่ล้านดอท มันดูดวิเคราะห์สับแหลกเสี้ยววินาทีเดี๋ยวนั้นเลยฮะ! แถมความเทพคือตัวสายพานสตรีมมันเก็บสถิติย้อนหลังให้ 24 ชม. ครอบคลุมโจทย์เจ้านายสั่ง 12 ชม. พอดีเป๊ะมิกซ์กันกลมกล่อม!

❌ **[ผิด] First, send all the log events to Amazon SQS...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กระบะบัตรคิวป้าแก่ `SQS` มันเกิดมาเพื่อรับแขกส่งของ (Decoupling) ค่อยๆ หยิบออกมาทีละบัตรคิว... มัน **"ไม่มีสมองมานั่งสแกนวิเคราะห์บิ๊กดาต้าแบบสดๆ Real-time"** บ้าบอคอแตกอะไรทั้งสิ้น! มึงดองขยะไว้ในหีบไม่ได้แปลว่าจะเห็นภาพรวมอลังการฮะผิดวัตถุประสงค์!

❌ **[ผิด] First, set up an Auto Scaling group of EC2 servers then store the logs on Amazon S3 then finally, use EMR...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! นี่มันแผนการระดับอนุบาล! มึงจะให้ตึก `EC2` แบกขยะไปยัดลงโลงเย็น `S3` ให้เสร็จก่อน... แล้วค่อยเรียกหมอผียักษ์อย่างฮาดู๊ป `EMR` มานั่งสวดมนต์แกะถังเนี่ยนะ!? วิธีนี้แม่งเป็นงานช้าง **โคตรชักช้าอืดอาด** ("เดี๋ยวรอโหลดไฟล์เสร็จพรุ่งนี้ค่อยวิเคราะห์นะจ๊ะ") มันลบหลู่คำสั่งเจ้านายที่ว่า "ต้องวิเคราะห์สดเดี๋ยวนั้น (Real-time)" ขาดกระจุยฮะ! 

❌ **[ผิด] First, configure Amazon Cloud Trail to receive custom logs...**
- **ทำไมถึงผิด:** บอดตาใส! นักสืบ `CloudTrail` มันมีไว้จดไดอารี่แอบดูว่าแอดมินคนไหนเผลอไปกดปุ่มฆ่าคอมใน AWS (API Calls History) โว้ยย... มันไม่ใช่ถังขยะกะละมังที่จะมาอ้าปากรับอ้วกแฟ้ม "Application logs / Access logs มั่วซั่ว" ที่แอปพลิเคชันของคุณพ่นออกมาฮะ ผิดศาล! 

---
---

## 📌 คำถามที่ 15
**โจทย์:**
A company troubleshoots the operational issues of their cloud architecture by logging the AWS API call history of all AWS resources. The Solutions Architect must implement a solution to quickly identify the most recent changes made to resources in their environment, including creation, modification, and deletion of AWS resources. One of the requirements is that the generated log files should be encrypted to avoid any security issues.

Which of the following is the most suitable approach to implement the encryption?

**ตัวเลือก:**
- [ ] Use CloudTrail and configure the destination Amazon Glacier archive to use Server-Side Encryption (SSE).
- [ ] Use CloudTrail and configure the destination S3 bucket to use Server-Side Encryption (SSE).
- [x] Use CloudTrail with its default settings
- [ ] Use CloudTrail and configure the destination S3 bucket to use Server Side Encryption (SSE) with AES-128 encryption algorithm.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเพิ่งเรียกนักสืบจิ๋ว `CloudTrail` ให้มาถือกล้องวงจรปิดไล่ล่าความจริง "ใครหน้าไหนแอบมาลบ แอบมาสร้างเครื่องใน AWS วะ (AWS API call history)!" 
แต่เจ้านายสั่งกำชับความปลอดภัย: **"มึงระวังด้วยนะ! ไอ้คลิปวิดีโอเทปแฟ้มประวัติที่ถูกบันทึกเนี่ย ต้องล็อกกุญแจเข้ารหัส (generated log files should be encrypted) เสมอนะโว้ย ขี้เกียจปวดหัวเรื่องโดนแฮก!"**
คำถาม: ท่ายากสับขาหลอกอันไหน... ที่คุณต้องไปลงแรงตั้งค่าเพื่อให้เป็นไปตามกฎเหล็กนี้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุด! ความหลอกดาวของข้อนี้คือ AWS แม่งบริการสุดประทับใจแถมให้ฟรีแล้วฮะ! **แฟ้มเทปวงจรปิดทุกแผ่นที่นักสืบ `CloudTrail` พ่นอ้วกออกลงหลุมถัง S3 นั้น... "มันโคตรบังคับเข้ารหัสแม่กุญแจเหล็ก (Server-Side Encryption ด้วย AES-256) มาให้ตั้งแต่เกิดเป็นค่า Default ในสายเลือดแล้วโว้ย!!"**
- แปลว่าคุณป๋าสถาปนิก... "ไม่ต้องกระดิกนิ้วทำหอกอะไรเลย!!" เปิดค่าเดิมๆ ก็ผ่านเกณฑ์ Compliance หรูๆ แล้วฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use CloudTrail with its default settings**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! หล่อๆ นิ่งๆ นอนตีพุงสบายๆ ฮับ! แค่คุณใช้ `CloudTrail` แล้วเสียบปลั๊กกดด้ามจับสวิตช์ ปล่อยมันพ่นเทปลงถัง S3... ระบบศาลพระภูมิ AWS จะสวดมนต์กระซิบ **"เข้ารหัส SSE-S3"** ถักทอเทปทุกผืนให้ขลังตั้งแต่เริ่มต้นเกิดฟรีๆ เลยฮะ (Default settings) ไม่ต้องไปคลิกตั้งค่าบ้าบอหน้าไหนเพิ่มให้เหงื่อออก

❌ **[ผิด] Use CloudTrail and configure the destination S3 bucket to use Server-Side Encryption (SSE).**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! จะโชว์ขยันโง่ๆ ทำไมให้เหนื่อยฟรีอะฮะ!? มึงไม่ต้องถ่อไปติ๊กถูกเปิด SSE ในหลุมโลง S3 เองเลย เพราะตัวระบบ CloudTrail มันตั้งโปรแกรมมัดมือบรรจุแพ็กเกจหุ้มเกราะเวทย์มนต์ก่อนโยนลงหลุมให้มึงตั้งแต่แรกอยู่แล้วฮะ (ทำซ้ำซ้อน) 

❌ **[ผิด] Use CloudTrail and configure the destination Amazon Glacier archive to use Server-Side Encryption (SSE).**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! มั่วตั้วกันไปใหญ่! เป้าหมายกระโถนอ้วกธรรมชาติของ CloudTrail แม่งคือตุ่มน้ำ **`Amazon S3`** ล้วนๆ เลยพี่!! มึงจะมุดท่อเลี้ยวผิดไปเทขยะลงโลงเย็นชั้นสิบแปด `Amazon Glacier` โดยตรงบ้าบออะไรล่ะฮะ!

❌ **[ผิด] Use CloudTrail and configure the destination S3 bucket to use Server Side Encryption (SSE) with AES-128 encryption algorithm.**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! นอกจากจะปัญญาอ่อนโชว์ขยันไปตั้งค่าซ้ำซ้อนแล้ว ยังเสือกเดาใจเวทย์มนต์ผิดอีก!! พี่แกใช้พระเครื่องชุบทองคำรุ่น **`AES-256`** โว้ยย ไม่ใช่กุญแจสังกะสีกากๆ AES-128! ตกม้าตายตอนจบแบบโง่ๆ

---
---

## 📌 คำถามที่ 16
**โจทย์:**
A Solutions Architect is working for a fast-growing startup that just started operations during the past 3 months. They currently have an on-premises Active Directory and 10 computers. To save costs in procuring physical workstations, they decided to deploy virtual desktops for their new employees in a virtual private cloud in AWS. The new cloud infrastructure should leverage the existing security controls in AWS but can still communicate with their on-premises network.

Which set of AWS services will the Architect use to meet these requirements?

**ตัวเลือก:**
- [ ] AWS Directory Services, VPN connection, and Amazon S3
- [ ] AWS Directory Services, VPN connection, and ClassicLink
- [ ] AWS Directory Services, VPN connection, and AWS Identity and Access Management
- [x] AWS Directory Services, VPN connection, and Amazon Workspaces

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเพิ่งเปิดใหม่มีเครื่องคอมโง่ๆ อยู่ 10 เครื่องพร้อมเซิร์ฟเวอร์รหัสผ่านปู่ทวด `Active Directory` เก็บอยู่ในออฟฟิศเดิม
แต่ตอนนี้บริษัทงกเงินหน้ามืด: **"กูจะไม่ซื้อคอมพิวเตอร์จริงๆ ให้พนักงานใหม่แล้ว! กูจะเหมาเช่า 'คอมทิพย์ล่องหน (virtual desktops)' บนก้อนเมฆ AWS แทน!"**
คำสั่ง: "และคอมทิพย์พวกนี้ ต้องสามารถมุดท่อกลับมารายงานตัว ใช้รหัสผ่านล็อกอินผูกกับตึกแม่บนออฟฟิศได้เหมือนเดิมนะเว้ย (communicate with on-premises)!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดในจักรวาล VDI! ทันทีที่เจ้านายประกาศกร้าวว่าจะจ่ายเงินเช่าชั่วโมงร้านเกมส์ "คอมพิวเตอร์ลอยฟ้า (Virtual desktops / VDI)" คำตอบเดียวในสารบบ AWS ที่คุณต้องกาให้ถูกคือ **`Amazon Workspaces`** ล้านเปอร์เซ็นต์!
- (และไอ้คำสั่งเสริมที่ว่า ขอเชื่อมท่อสวมรอยปู่ทวดที่ออฟฟิศ = ก็ใช้ `VPN connection` มุดท่อใต้ดิน มาผสมพันธุ์เข้ากับ `AWS Directory Services` เป็นพนักงานแลกบัตรเข้าตึกนั่นเอง)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Directory Services, VPN connection, and Amazon Workspaces**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! มิกซ์แอนด์แมทช์สมบูรณ์แบบแจกคะแนนฟรี! 
1. `Amazon Workspaces` = คอมพิวเตอร์ร้านเกมส์ลอยฟ้า (ตอบโจทย์ข้อชี้เป็นชี้ตาย Virtual desktops)
2. `VPN connection` = สายแลนเวทย์มนต์โยงแคมป์คนงานที่ AWS เข้ากับตู้เซฟพาสเวิร์ดที่ออฟฟิศ 
3. `AWS Directory Service` = โปรแกรมจับคู่ประสานไขยาดอง รับพาสเวิร์ดชาว AWS มาชนกับพาสเวิร์ดช้างกระทืบโรงที่ออฟฟิศ 

❌ **[ผิด] AWS Directory Services, VPN connection, and Amazon S3**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงจะบ้าหรอฮะ!? ตุ่มน้ำ `Amazon S3` แม่งเป็นแค่ถังขยะกะละมังเอาไว้ดองรูปถ่าย ดองวิดีโอโง่ๆ... มึงจะเอาถังขยะไปเสกเป็น **มนุษย์ประทับร่างคอมพิวเตอร์เสมือน (virtual desktops)** มีหน้าจอ Windows บ้าบออะไร๊!? โคตรผิดฝาผิดตัวเลยฮะ!

❌ **[ผิด] AWS Directory Services, VPN connection, and AWS Identity and Access Management (IAM)**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! พระเอกคนสำคัญขาดไปไหนเล่าฮะ!? ช้อยส์นี้มึงไม่มี `Amazon Workspaces` ให้กดสตาร์ทพนักงานนั่งทำงานหน้าจอคอมลอยฟ้าซักเครื่อง! แล้วมึงดันเอา รปภ.กระทรวง `IAM` มายัดไส้แทน (IAM มีไว้แค่แจกบัตรคิวเข้าตึก AWS ไม่เกี่ยวหอกอะไรกับการเสกคอมลอยฟ้าให้คนใช้ VDI) โดนหลอกแล้วฮะ

❌ **[ผิด] AWS Directory Services, VPN connection, and ClassicLink**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้สะพานสนิมเขรอะ `ClassicLink` แม่งเป็นของโบราณยุคปู่ทวด (เอาไว้โยงเครื่องยุคไดโนเสาร์ EC2-Classic มาคุยกับ VPC) เลิกใช้ไปเป็นชาติแล้วโว้ยย!! แถมยังขาดหายใจตายเพราะไม่ได้เสกคาถาเรียกพระเอก Workspaces อีกต่างหาก ผิดซ้ำสอง!

---
---

## 📌 คำถามที่ 17
**โจทย์:**
A data analytics startup is collecting clickstream data and stores them in an S3 bucket. You need to launch an AWS Lambda function to trigger the ETL jobs to run as soon as new data becomes available in Amazon S3.

Which of the following services can you use as an extract, transform, and load (ETL) service in this scenario?

**ตัวเลือก:**
- [ ] AWS Step Functions
- [ ] S3 Select
- [x] AWS Glue
- [ ] Redshift Spectrum

---
### 🎯 โจทย์ต้องการอะไร?
ชาวเหมืองข้อมูล กอบโกยเศษสวะดอทคลิกเม้าส์มากองพะเนินยัดใส่ถัง `S3`
ต้องการเรียกวิชาเสกนินจา (Lambda) ให้กระเด้งสะดุ้งตื่น ทันทีที่มีหยดน้ำตกลงถัง... 
เพื่อสั่งให้ไปปลุก **"เครื่องจักรล้างจานคัดแยกขยะ (ETL jobs)"** ออกมาล้างขัดสีฉวีวรรณเพชรเม็ดงาม
คำถาม: ใครในจักรวาลนี้เกิดมาตั้งครรภ์เพื่อรับบทบาทแม่ย่านาง **"ETL (Extract, Transform, and Load)"** แบบสวยๆ ชิวๆ ไร้เซิร์ฟเวอร์ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดบนดาวอังคาร! คำว่า **`ETL (Extract, Transform, Load - ดูด-ดัดแปลงสแตท-ยัดลงหลุม)`** = คนเดียวที่ผูกขาดใบประกอบวิชาชีพนี้บนหน้าผากแบบสวยๆ สับๆ กาวเหนียวหนึบก็คือบริการที่ชื่อว่า **`AWS Glue`** (กาวสารพัดประโยชน์) เพียงผู้เดียวเท่านั้นฮะ! (ท่อง 2 คำนี้แหวกม่านประเพณีได้ล้านเปอร์!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Glue**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! นามบัตรพี่แกสลักเสลาไว้บรรทัดแรกเลยฮะ! `AWS Glue` คือโรงงานนรก "ETL ไร้เซิร์ฟเวอร์แบบ Fully managed" พอมันได้รับสัญญาณออด... มันจะเสกเครื่องปั่นน้ำผลไม้ (PySpark โง่ๆ) จับขยะใน S3 มาสับๆ ขยี้ๆ หั่นเต๋า ดัดแปลงสคีม่า แล้วโหลดเตรียมพร้อมยัดให้วิศวกรวิเคราะห์ต่อได้อย่างเลิศหรู! ตรงรุ่นเผง!

❌ **[ผิด] AWS Step Functions**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! คุณป้าแผนกประสานงาน `Step Functions` อะ... แม่งมีหน้าที่แค่แจกบัตรคิวชี้พรมแดน "เดี๋ยวมึงไปแผนกนี้นะ แล้วมึงรอกดเข้าแสกนนิ้วห้องนี้นะ (workflow choreography)"... **แต่มึงจะไม่มีปัญญาไปตักขี้ เลื่อยไม้ สับตับไตไส้พุงสกัดข้อมูล (ETL Data processing) เองหรอกโว้ยย!!!** มันคนละหน้าที่กันฮะ!

❌ **[ผิด] Redshift Spectrum**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สุภาพบุรุษชุดแดง `Redshift Spectrum` แม่งมีสายเลือดเป็นแค่นายพรานป่า "กระซวกแบนด์วิดท์ ยิงโค้ด SQL ทะลวงกำแพงเข้าไปอ่านขยะใน S3 โง่ๆ ดิบๆ (Query directly)"... **แต่มันไม่ได้มีอำนาจศักดิ์สิทธิ์ที่จะจับข้อมูลมาดัดแปลงผ่าตัดศัลยกรรมรูปพรรณหน้าตา (Transform - ตัว T ใน ETL)** มั่วแล้วฮะ

❌ **[ผิด] S3 Select**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ยาสามัญประจะบ้าน `S3 Select` แม่งเป็นแค่ปุ่มคีย์ลัดกะโหลกกะลา ที่ให้มึงกดค้นหาเศษเสี้ยวติ่งบรรทัดนึงจากไฟล์ CSV ก้อนยักษ์ที่กองเน่าอยู่ใน S3 (อ่านแค่เศษเสี้ยว)... **มึงไม่ได้เสกวิชาสกัดและแปลงร่างขยะระดับอุตสาหกามครอบจักรวาล (ETL)** บ้าบอคอแตกอะไรทั้งนั้น! 

---
---

## 📌 คำถามที่ 18
**โจทย์:**
A startup needs to use a shared file system for its .NET web application running on an Amazon EC2 Windows instance. The file system must provide a high level of throughput and IOPS that can also be integrated with Microsoft Active Directory.

Which is the MOST suitable service that you should use to achieve this requirement?

**ตัวเลือก:**
- [x] Amazon FSx for Windows File Server
- [ ] AWS Storage Gateway - File Gateway
- [ ] Amazon Elastic File System
- [ ] Amazon EBS Provisioned IOPS SSD volumes

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบปั่นเว็บโค้ด `.NET` อาศัยนอนอยู่ในบ้านพักกึ่งผีสิงเครื่องหน้าต่าง **`Windows instance`**
ปัญหาก็คือ: พวกมันอยากได้ตู้ยาสามัญประจำตึก **ซอกขยะส่วนกลาง (shared file system)** ที่แจกจ่ายให้กินฟรีกันทุกคนได้สบายๆ
กฎเหล็กคนอวดรวย: "ตู้ยานี้ต้องวิ่งสับฉลุยฉิบหาย (high throughput/IOPS) และที่สำคัญทะลวงไส้... ต้องสามารถเสียบปลั๊กผูกวิญญาณรวมกับ **`Microsoft Active Directory`** ได้อย่างแนบเนียน!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงทะลักจักรวาล! ถ้าบรรทัดไหนพิมพ์หลุดแฉลบแว้งคำศัพท์ว่า **"Shared file system + สำหรับบรรดาเครื่อง Windows + ผูกมิตรชิดเชื้อกับมนต์ดำ Active Directory (AD)"** = นามบัตรผีดิบนี้เขียนสลักชื่อผูกโยงไปหาฮีโร่หน้าเดิมที่ชื่อว่า **`Amazon FSx for Windows File Server`** แต่เพียงผู้เดียวในจักรวาลฮะ! ห้ามฉีกโผ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon FSx for Windows File Server**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! เข้าแก๊ปเหลี่ยมหักศอกพอดีทุกตัวอักษร!
ลูกพี่ `FSx Windows` แม่งสร้างขึ้นมาทุบหม้อข้าวถ่มน้ำลายใส่โลกมืดของ Windows ออริจินัลล้วนๆ! (รองรับ SMB Protocol) เสี้ยววินาทีที่พิงกำแพงเสียบก้นเข้ากับ `Microsoft Active Directory` คุณจะสัมผัสได้ถึงสปีดกล้ามมัดโต (10 GB/s & Millions IOPS!) แบ่งกันใช้หล้อๆ ทั้งตึก EC2 อย่างฟิน!

❌ **[ผิด] Amazon Elastic File System (EFS)**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! ตู้ยาหรรษา `Amazon EFS` แม่งแจกจ่ายความรักให้เพื่อนร่วมชะตากรรมได้เฉพาะแก๊งค์ไอ้เพนกวิน **"ตระกูล Linux เท่านั้นโว้ยยย!!!"** มึงเอาคนโง่จากค่าย Windows ไปตบมือขอข้าว EFS กิน มันถ่มน้ำลายไสหัวไล่ตะเพิดออกจากหน้าต่างเลยฮะ บอดตาใสชัดๆ!

❌ **[ผิด] AWS Storage Gateway - File Gateway**
- **ทำไมถึงผิด:** ขี่ช้างจับแมลงวัน! ไอ้ซุ้มหน้าประตู `File Gateway` มันเป็นท่ายากทวิภาคี... เอาไว้ให้คนที่ยังทำตัวติดดิน "ปักหลังอยู่ออฟฟิศเก่า On-premises" แต่เสล่ออยากมุดดินควักไฟล์ไปดองเก็บไว้ที่โลกอนาคต AWS (S3)... แบกภาระรับจ้างโยนของข้ามโลกบ้าบอ 
แถมประสิทธิภาพ IOPS แม่งคลานเป็นเต่า! โดนหมัดฮุก High Throughput & IOPS ของ FSx สอยร่วงคาเวทีพังยับเยินฮะ 

❌ **[ผิด] Amazon EBS Provisioned IOPS SSD volumes**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! มึงจะบ้าหรอฮะ!? ลูกข่าง `EBS` แม่งเป็นแค่ "ดิสก์ส่วนตัวเปลี่ยวๆ ยัดสวมเข้าไขสันหลังเครื่อง EC2 ได้แค่เครื่องเดียวเบอร์เดียว!" มัน **"ไม่สามารถแง้มกระโปรงแบ่งปันให้ชาวบ้านคนอื่นมารุมกระซวกร่วมกันได้โว้ยย (Not a shared file system)!!"** โดนหลอกตายน้ำตื้นอีกแล้ว! 

---
---

## 📌 คำถามที่ 19
**โจทย์:**
A company has a UAT and production EC2 instances running on AWS. They want to ensure that employees who are responsible for the UAT instances don't have access to work on the production instances to minimize security risks.

Which of the following would be the best way to achieve this?

**ตัวเลือก:**
- [ ] Provide permissions to the users via the AWS Resource Access Manager (RAM) service to only access EC2 instances that are used for production or development.
- [x] Define the tags on the UAT and production servers and add a condition to the IAM policy which allows access to specific tags.
- [ ] Launch the UAT and production instances in different Availability Zones and use Multi Factor Authentication.
- [ ] Launch the UAT and production EC2 instances in separate VPC's connected by VPC peering.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทปลูกต้นไม้ตึก `EC2` แยกเป็น 2 สายพันธุ์: ตึกซ้อมเล่นหม้อข้าวหม้อแกง (UAT) และตึกจริงรับลูกค้าจริง (Production)
เจ้านายสั่งกางกำแพงกระสุนเหล็ก: **"ไอ้พวกพนักงานเด็กฝึกงานสาย UAT อะ... มึงห้ามเสร่อทะลวงข้ามมาแตะต้องตึก Production ของกูเด็ดขาดนะโว้ยย เดี๋ยวกูเสียบ้านเสียเมือง!"**
คำถาม: ท่ายากสับขาหลอกอันไหน ที่เป็นเวทมนตร์กั้นเขตแดนแจกสิทธิ์แบ่งชนชั้นได้เพอร์เฟคที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าข้อสอบเริ่มสวดมนต์บ่นเรื่อง "แยกลูกรักลูกชัง / แบ่งชนชั้นว่าเครื่องนี้คือ UAT เครื่องโน้นคือ Prod / ห้ามยุ่งข้ามห้องประทับ" = กติกาที่ง่ายและหล่อที่สุดในสามโลกคือการ **`แปะป้ายชื่อคางชื่อ (Tags)`** ไว้ที่หน้าผากเครื่อง แล้วเขียนกฎมนต์ดำกระทรวงกลาโหม **`IAM Policy condition`** ระบุเลยว่า "ถ้าไม่มีป้ายนี้มึงโดนถีบหน้าแตก!" ล้านเปอร์เซ็นต์เสมอ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Define the tags on the UAT and production servers and add a condition to the IAM policy which allows access to specific tags.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! สมบูรณ์แบบทุกพิกเซล! 
1. เอากาวตราช้างแปะป้ายชื่อ **`"Tag: Env=UAT"`** แปะหน้าผากตึกหนึ่ง และ **`"Tag: Env=Prod"`** แปะอีกตึก!
2. ลากคอสมุดกฎหมาย **`IAM Policy`** มาตั้งแง่ว่า: "ไอ้จ๋อทีมงาน A มึงมีสิทธิ์ไขกุญแจเข้าตึก... เฉพาะตึกที่มีรอยสักป้ายห้อยคอเขียนว่า UAT เท่านั้นนะเว้ย!" เสร็จพิธีโจรหน้าไหนก็ขุดรูข้ามฝั่งไปป่วนไม่ได้เด็ดขาดฮะหล่อๆ!

❌ **[ผิด] Launch the UAT and production EC2 instances in separate VPC's connected by VPC peering.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! วิศวะกะโหลกกะลา! การจับตึกแยกไปอยู่คนละหมู่บ้าน `VPC` แล้วเอาสะพานผูกคอตาย `VPC peering` มาชักรอกข้ามเน็ตเวิร์ก **มันเป็นแค่การเปลี่ยนทิศทางกระแสน้ำโว้ย!! แต่มัน "ไม่ได้ลากเอารปภ.ไปเช็คหน้าประตูแจกสิทธิ์ (IAM Permission)" ห้ามพนักงานเดินดุ่ยๆ เข้าไปปิดเปิดเครื่องจากคอนโซลแต่อย่างใด!!** บ้าไปแล้ว

❌ **[ผิด] Launch the UAT and production instances in different Availability Zones and use Multi Factor Authentication.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! การเอาตึกหลบไปแอบกระจุกตัวละทิศละทาง (ต่าง AZ)... มันเป็นการเล่นแร่แปรธาตุเผื่อ "หนีอุกกาบาตโลกพัง (High Availability)" ต่างหากเล่า!! มันไม่เกี่ยวหอกอะไรกับการขลิบอารมณ์ รปภ. คัดกรองกั้นเด็กฝึกงานเลยซักมิลลิเมตรเดียว! มั่วเรื่องแล้วฮะ

❌ **[ผิด] Provide permissions to the users via the AWS Resource Access Manager (RAM)...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! มัดรวมสมองปลาทอง! บริการศาลกลาง `AWS RAM` มันมีชีวิตอยู่เพื่อกางเต็นท์แบงปันมรดกที่ดินทรัพยากร (เช่น Subnet) ทิ้งข้ามกำแพง **"ไถแจกไปให้ไอดีขั้วเพื่อนบ้าน (Cross AWS Accounts) ข้ามประเทศนู่น!!"** มึงคนละสิทธิคนละเรื่องกับพนักงานแผนกย่อยเตะตะกร้อกวนใจกันเองในบ้านเดียวกันเลยฮะ ผิดศาล! 

---
---

## 📌 คำถามที่ 20
**โจทย์:**
A company has an infrastructure that allows EC2 instances from a private subnet to fetch objects from Amazon S3 via a NAT Instance. The company’s Solutions Architect was instructed to lower down the cost incurred by the current solution.

How should the Solutions Architect redesign the architecture in the most cost-efficient manner?

**ตัวเลือก:**
- [ ] Replace the NAT instance with NAT Gateway to access S3 objects.
- [ ] Use a smaller instance type for the NAT instance.
- [ ] Remove the NAT instance and create an S3 interface endpoint to access S3 objects.
- [x] Remove the NAT instance and create an S3 gateway endpoint to access S3 objects.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบที่ถูกขังลืมในคุกมืด `private subnet` ดันบ้าบิ่นหน้าตาเฉย **เอาไฟฉายส่องขอของบริจาคไฟลน์จากตุ่มน้ำดิบ `Amazon S3`** 
แต่เวรกรรม... มึงดันมุดดินด้วยการเหยียบหัวพี่บิ๊ก `NAT Instance` (หรือจะ NAT Gateway ก็ช่าง) ในการหลุดรอดออกถนนใหญ่ไปดูดของกลับมา!
เจ้านายสั่งตบหน้า: "ไอ้ทิด! มึงทำแบบนี้บริษัทเสียตังค่าเน็ตไหลเป็นน้ำทะลักล้นเลยนะเหวย! **หาทางมุดท่อแบบฟรีๆ ที่รัดเข็มขัดที่สุด (cost-efficient) เกลียดการจ่ายเงินว้อยย!!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตาย! การจะให้ลูกหาบในคุกมืด มุดท่อส่วนตัวไปคุยกับพระเจ้า `Amazon S3` (หรือ DynamoDB) = ท่าบังคับขูดส้วมคือต้องขุดอุโมงค์ **`VPC Endpoint`** ลุกเดียว!
- ทริค 2: สยองพองขน! S3 มีเวทย์มนต์ตาทิพย์ VPC Endpoint 2 ตระกูลให้เลือกซื้อ...
  1) `Gateway endpoint` = ขุดรูท่ออุโมงค์ข้ามมิติ **"(แจกฟรี! ไม่มีค่าเช่ารายชั่วโมง ไม่มีค่าธรรมเนียมดูดเน็ต!)"** -> ตอบโจทย์เจ้านายงกสุดติ่ง!
  2) `Interface endpoint` = หลุดยุวชนทหาร... "(หน้าเลือด! คิดเงินค่าเช่ารายชั่วโมง + ค่าดูดเน็ต GB ละบาท!)"

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Remove the NAT instance and create an S3 gateway endpoint to access S3 objects.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! พระเอกตีระฆังดังกังวาน! กระโดดถีบยอดหน้าพี่บิ๊ก `NAT instance` ทิ้งซะ! แล้วปูกระเบื้องขุดอุโมงค์มิติ **`S3 Gateway Endpoint`** เสียบลงรูแทน... มึงจะสัมผัสได้ถึงกลิ่นอายความงกและหอมหวาน! เพราะการวิ่งรถผ้านรูนี้ **มันโคตรจะ "แจกฟรี!"** ไม่เสียค่าน้ำค่าไฟหรือค่าตัวกินเปล่าแต่อย่างใด ลดต้นทุนสมใจบอสผู้โลภมาก 100%!

❌ **[ผิด] Remove the NAT instance and create an S3 interface endpoint to access S3 objects.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบ เสือกไปตกม้าน้ำอืดยศทหารตอนสุดท้าย! ไอ้ `Interface endpoint` อะ... มึงต้องจ่ายส่วยรายชั่วโมงให้ตำรวจ (Hourly charge) ประเคนใส่หัวตลอดเวลาเปิดทิ้งไว้ แถมยังต้องโดนไถเงินตอนข้ามสะพานกินน้ำจุ๊กจิ๊ก (Data processing charge) อีก! ไหนเจ้านายมึงสั่งว่าขอโหมดรัดเข็มขัดถูกๆ (cost-efficient) ไงล่ะฮะ!? โง่ซ้ำสอง!

❌ **[ผิด] Replace the NAT instance with NAT Gateway to access S3 objects.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! หนีเสือปะจระเข้!! ในเมื่อโกรธเกลียดค่าเน็ตไหลเป็นเบี้ยของ `NAT Instance` มากนัก... มึงจะย้ายค่ายไปซบตักเสี่ยใหญ่อย่าง `NAT Gateway` ทำส้นตึกอะไรฮะ!! ขานั้นน่ะหน้าเลือดกว่าเดิมอีก เก็บแต้มทั้งรายชั่วโมงและค่าน้ำไหลเป็นท่อแตก... โดนกระซวกไส้แพงหูฉี่กว่าเดิมหมื่นเปอร์เซ็นต์ ผิดวัตถุประสงค์! 

❌ **[ผิด] Use a smaller instance type for the NAT instance.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! แค่ไปหดไข่ลดยศเครื่องเล็กจิ๋วโง่ๆ มันเป็นทริคประหยัดงบเต่าคลาน! ในเมื่อพี่บิ๊กแกมีหลุมมิติวิ เศษ `Gateway Endpoint` กางโปรแจกให้มึงมุด **"ฟรี 0 บาทถ้วน"**... มึงจะกลับไปขี้เหนียวกินข้าวคลุกน้ำปลาทำกระโหลกกะลาอะไรฮะ บ้าบอ!!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 3: ข้อ 21 - 30)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 21
**โจทย์:**
A company is using AWS IAM to manage access to AWS services. The Solutions Architect of the company created the following IAM policy for AWS Lambda:

```json
{
  "Version": "2012-10-17",
  "Statement": [
   {
    "Effect": "Allow",
    "Action": [
     "lambda:CreateFunction",
     "lambda:DeleteFunction"
    ],
    "Resource": "*"
  },
  {
   "Effect": "Deny",
   "Action": [
    "lambda:CreateFunction",
    "lambda:DeleteFunction",
    "lambda:InvokeFunction",
    "lambda:TagResource"
  ],
    "Resource": "*",
    "Condition": {
      "IpAddress": {
       "aws:SourceIp": "187.5.104.11/32"
      }
     }
    }
  ]
}
```
Which of the following options is allowed by this policy?

**ตัวเลือก:**
- [x] Create an AWS Lambda function using the 100.220.0.11/32 address.
- [ ] Delete an AWS Lambda function using the 187.5.104.11/32 address.
- [ ] Delete an AWS Lambda function from any network address.
- [ ] Create an AWS Lambda function using the 187.5.104.11/32 address.

---
### 🎯 โจทย์ต้องการอะไร?
โจทย์ยกตัวอย่างหน้ากระดาษ **`IAM Policy (กฎหมายศาลรัฐธรรมนูญ)`** เขียนไว้ 2 มาตรา ว่าด้วยเรื่องการเสก/ลบนินจา Lambda
**มาตรา 1 (ใจดี):** อนุญาต `Allow` ให้สร้าง (Create) และลบ (Delete) นินจา Lambda ได้จากทุกที่เลยจ้า
**มาตรา 2 (ใจร้าย):** สั่งประหาร `Deny` ห้ามสร้าง, ห้ามลบ, ห้ามใช้งาน (Invoke/Tag)... **"เฉพาะไอ้โจรหน้าชั่วที่ถือบัตรประชาชนเลข `IP 187.5.104.11/32` เท่านั้น!!"**
คำถาม: จากกฎหมาย 2 ข้อผสมกัน... สรุปแล้วใครทำอะไรได้บ้าง ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: กฎเหล็กสูงสุดแห่งจักรวาล IAM! **"คำสาปแช่ง (Explicit Deny) มีศักดิ์เหนือกว่าทุกสิ่งบนโลกใบนี้!!"** ต่อให้มึงมีใบอนุญาต (Allow) ร้อยกษัตริย์... แต่ถ้าโดนคำสาปแช่ง (Deny) สวนทับมา ข้อนั้นมึงจะตายสนิท ทำอะไรไม่ได้เลย!
- ทริค 2: สรุปแปลไทยเป็นไทยคือ "ทุกคนในโลกมีสิทธิ์สร้าง/ลบ Lambda หมด... **ยกเว้นไอ้บ้านเลขที่ 187.5.104.11 เท่านั้น** ที่โดนแบล็คลิสต์ตลอดชีพ!"

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create an AWS Lambda function using the 100.220.0.11/32 address.**
- **ทำไมถึงถูก:** ต่อยฮุกเข้าเป้าเนื้อๆ! ไอ้หนุ่ม IP `100.220.0.11` แม่งเป็นคนนอกที่ไม่ได้โดนหางเลขในลิสต์คำสาปแช่ง (Deny IP 187.5.104.11) ดังนั้นมันจะได้รับประโยชน์จากมาตรา 1 เต็มๆ ก็คือ "สร้างนินจา Lambda ได้หน้าตาเฉยฮะ รอดตัว!"

❌ **[ผิด] Create an AWS Lambda function using the 187.5.104.11/32 address.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงตาปลาดุกหรอฮะ!? ไอดีนี้แหละคือเจ้ากรรมนายเวรที่โดนมาตรา 2 ประทับตรา **`Deny`** (สาปแช่งห้ามสร้างห้ามลบ) เต็มหน้าผาก! ขืนมันกด Create ระบบ IAM ก็ตบหน้าสั่น Access Denied สิวะฮะ!

❌ **[ผิด] Delete an AWS Lambda function using the 187.5.104.11/32 address.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! เหตุผลเดียวกันเป๊ะ! ไอ้เบอร์ IP อัปมงคลนี้มันโดนบล็อกทั้ง `CreateFunction` และ `DeleteFunction` อยู่ในกรงขังเดียวกัน! มึงจะเสร่อมากดลบ (Delete) ก็โดนยามเอาปืนยิงไส้แตกอยู่ดีฮะ!

❌ **[ผิด] Delete an AWS Lambda function from any network address.**
- **ทำไมถึงผิด:** กาถูกครึ่งใบ! มึงจะเหมาเข่งว่า "ลบจากที่ไหนก็ได้ (any address)" มันกว้างไปโว้ยย!! คำว่า any มันเหมารวมไอ้โจร IP `187.5.104.11` เข้าไปด้วย ซึ่งไอนั่นมันลบไม่ได้ไง! ประโยคนี้เลยเป็นเท็จฮะ!

---
---

## 📌 คำถามที่ 22
**โจทย์:**
An organization plans to run an application in a dedicated physical server that doesn’t use virtualization. The application data will be stored in a storage solution that uses an NFS protocol. To prevent data loss, you need to use a durable cloud storage service to store a copy of your data.

Which of the following is the most suitable solution to meet the requirement?

**ตัวเลือก:**
- [ ] Use AWS Storage Gateway with a gateway VM appliance for your compute resources. Configure File Gateway to store the application data and backup data.
- [x] Use an AWS Storage Gateway hardware appliance for your compute resources. Configure File Gateway to store the application data and create an Amazon S3 bucket to store a backup of your data.
- [ ] Use an AWS Storage Gateway hardware appliance for your compute resources. Configure Volume Gateway to store the application data and create an Amazon S3 bucket to store a backup of your data.
- [ ] Use an AWS Storage Gateway hardware appliance for your compute resources. Configure Volume Gateway to store the application data and backup data.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทไดโนเสาร์มีกฎเหล็กแปลกประหลาด: "กูเกลียดของปลอม! กูจะรันแอปบน **เครื่องเหล็กกล้าของจริง (physical server that doesn't use virtualization) เท่านั้น!**"
แถมแอปโง่ๆ ตัวนี้ บังคับใช้ท่อสูบน้ำโบราณ **`NFS protocol`** เท่านั้นด้วยนะ
คำสั่งทะลวงไส้: "หาวิธีตักน้ำจากแอปในออฟฟิศ... โยนแบ็คอัพไปดองไว้บนก้อนเมฆ (S3) ให้กูที!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ทันทีทีเจอคำว่า **"Physical server / Doesn't use virtualization"** (ไม่ยอมใช้เครื่องจำลอง VM) = หน้าไพ่บังคับตอกตะปูเลยว่า คุณต้องสั่งซื้อกล่องเหล็ก **`Storage Gateway hardware appliance`** ของแทร่จากเว็บ Amazon ให้มาส่งที่ออฟฟิศจริงๆ เท่านั้น! (ห้ามใช้ VM appliance เด็ดขาด)
- ทริค 2: ทันทีทีเจอคำว่า **"NFS protocol"** (หรือ SMB) = มันเป็นลูกรักของตระกูล **`File Gateway`** เท่านั้นฮะ! (ส่วนพี่น้องมันอย่าง Volume Gateway แม่งกินของคาวได้อย่างเดียวคือ iSCSI protocol) 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use an AWS Storage Gateway hardware appliance... Configure File Gateway... store a backup in S3**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! มิกซ์แอนด์แมทช์สมบูรณ์แบบแจกคะแนนฟรี!
1) ซื้อกล่องเหล็กดัมเบล `Hardware appliance` มาเสียบปลั๊กที่ออฟฟิศ (แก้โจทย์ physical server ล้วน)
2) เปิดโหมดประตูมิติ `File Gateway` (แก้โจทย์รองรับท่อ NFS)
3) เสียบก้นมันลงหลุมโลงเย็น S3 บนก้อนเมฆ... จบข่าว! ลูกพี่พอใจ 100%!

❌ **[ผิด] Use AWS Storage Gateway with a gateway VM appliance...**
- **ทำไมถึงผิด:** บอดตาใส! ก้อเจ้านายเพิ่งสั่งปาวๆ ว่า "กูไม่ใช้ Virtualization (VM)!!" มึงยังจะหน้าด้านไปโหลดไฟล์ติดตั้ง **`VM appliance (เครื่องเสมือน)`** มาลงให้แกด่าพ่อทำไมฮะ!? อ่านโจทย์ไม่แตก!

❌ **[ผิด] Use an AWS Storage Gateway hardware appliance... Configure Volume Gateway...**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้ประตูมิติลูกเมียน้อยอย่าง `Volume Gateway` อะ แม่งคุยภาษาคน (NFS/SMB) ไม่รู้เรื่องโว้ย! มันเป็นไอ้บ้ากล้ามที่คุยแต่ภาษาเอเลี่ยน **"บล็อกเครื่องจักร iSCSI"** ล้วนๆ ทะลึ่งเอามาต่อท่อ NFS ก็พังพินาศสิฮะ ผิดศาล! 

---
---

## 📌 คำถามที่ 23
**โจทย์:**
A startup launched a fleet of on-demand EC2 instances to host a massively multiplayer online role-playing game (MMORPG). The EC2 instances are configured with Auto Scaling and AWS Systems Manager.

What can be used to configure the EC2 instances without having to establish an RDP or SSH connection to each instance?

**ตัวเลือก:**
- [ ] AWS CodePipeline
- [ ] AWS Config
- [ ] EC2Config
- [x] Run Command

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทเปิดเซิร์ฟเกมเถื่อน `EC2` เป็นร้อยทุ่ง มีโปรแกรมลูกเสือ `AWS Systems Manager` ฝังอยู่แล้ว
ปัญหาคือคนคุมเกมขี้เกียจตื่นเช้า: **"มึงมีวิธีสั่งการ ตีบวก ปรับแต่งตั้งค่า (configure) เครื่อง EC2 ทีละร้อยเครื่องรวด... "โดยที่กูไม่ต้องมานั่งเปลืองแรงพิมพ์รหัสผ่านล็อกอินเจาะไข่แดง (SSH / RDP) ทีละเครื่องไหมวะ!?"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! คีย์เวิร์ดระดับชาติบนจักรวาล AWS ถ้าโจทย์ถามหาวิชาเวทมนตร์ **"รีโมทสั่งการ / ลงโปรแกรม / ตั้งค่า EC2 หลายร้อยเครื่องพร้อมกัน โดยไม่ต้องควักพาสเวิร์ดมาล็อกอิน (Without SSH/RDP)"** = คำตอบเดียวแบบผูกขาดใบสัมปทานคือฟีเจอร์ **`Run Command`** (ซึ่งเป็นร่างทรงของ Systems Manager) เท่านั้นฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Run Command**
- **ทำไมถึงถูก:** พระเอกขี่ม้าขาวมาโปรด! ลูกพี่ `Run Command` แม่งทำหน้าที่เป็น "โทรโข่งกระจายเสียง"! คุณพิมพ์สคริปต์คอมมานด์แค่บรรทัดเดียวจากหน้าเว็บกางร่ม AWS... มันจะกระซิบส่งคำสั่งไปให้ลูกเสือ Systems Manager Agent ที่ฝังอยู่ในตึก EC2 ร้อยเครื่องให้ทำตามคำสั่งพร้อมกันเป๊ะๆ! โดยที่คุณไม่ต้องมุดท่อ SSH สกปรกๆ เลยซักกะแอะ! เทพสุดๆ!

❌ **[ผิด] EC2Config**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! คุณปู่ทวด `EC2Config` แม่งเป็นสคริปต์โบราณกาลที่เอาไว้ตั้งค่าบูตเครื่อง Windows สมัยพระเจ้าเหา (และตอนนี้เค้าเปลี่ยนชื่อมันเป็น EC2Launch ไปนานแล้วด้วย) มันไม่ใช่ไม้คทาวิเศษที่จะใช้เสกคำสั่งข้ามหัวกระดานร้อยเครื่องโดยไม่ล็อกอินฮะ คนละหน้าที่กัน!

❌ **[ผิด] AWS Config**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ชื่อคุณป้า `AWS Config` มันเหมือนจะคล้าย... แต่มันคือนักสืบตาทิพย์! เอาไว้จดบันทึกว่า "ไอ้บ้าคนไหนแอบมาเปลี่ยนการตั้งค่า (Configuration History) ในบ้านกูวะ!"... **แต่มันไม่ได้มีมือมีตีนไปยิงสคริปต์รีโมทสั่งรันคำสั่งเจาะไข่แดงใครโว้ยย!!** 

❌ **[ผิด] AWS CodePipeline**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ลุงกอริลล่า `CodePipeline` มันแผนกขนส่งพัสดุ CI/CD กองโค้ดขวักไขว่ของสายโปรแกรมเมอร์ฮะ! มึงจะให้รถบรรทุกไปรับจ๊อบเป็นยามเฝ้าเครื่องกดรีโมทคอนโทรลแทนแอดมินหรอ? ผิดกระบะทรายพังพินาศ! 

---
---

## 📌 คำถามที่ 24
**โจทย์:**
In a startup company you are working for, you are asked to design a web application that requires a NoSQL database that has no limit on the storage size for a given table. The startup is still new in the market and it has very limited human resources who can take care of the database infrastructure.

Which is the most suitable service that you can implement that provides a fully managed, scalable and highly available NoSQL service?

**ตัวเลือก:**
- [x] DynamoDB
- [ ] SimpleDB
- [ ] Amazon Neptune
- [ ] Amazon Aurora

---
### 🎯 โจทย์ต้องการอะไร?
โจทย์บอกสเปคสั่งตัดซูเปอร์คาร์: อยากได้ฐานข้อมูลพันธุ์ดุ...
1. แก๊งค์แหกกฎไร้ระเบียบ **`NoSQL database`**
2. หลุมดำตอม่อยักษ์ **"เก็บข้อมูลตารางนึงยัดได้ไม่อั้น ไร้ขีดจำกัด (no limit on storage size)!"**
3. และที่สำคัญสุด: บริษัทกูจน ไม่มีปัญญาจ้างยามมาเฝ้าตึก... ขอแบบ **"บริการสำเร็จรูปเสิร์ฟถึงเตียง (fully managed / serverless) กูนั่งกระดิกท้าวรออย่างเดียวพอ!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดในดาวมฤตยู! ทรงนี้ไม่ต้องสวดมนต์แล้วฮะ... ทันทีที่เจอตระกูล **"NoSQL + ไร้เซิร์ฟเวอร์ (Fully managed) + ไม่จำกัดพื้นที่โคตรสเกล (No limit / scalable)"** นามบัตรแชมป์เปี้ยนโลกแชมป์เดียวของ AWS คือ **`Amazon DynamoDB`** เจ้าพ่อตารางตารางมหาภัย 100% กาแบบไม่ต้องดูช้อยส์ยังถูก!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] DynamoDB**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! สมบูรณ์แบบทุกรูขุมขน! ลูกพี่ `DynamoDB` แม่งคือตำนาน NoSQL ที่ Amazon สร้างขึ้นมาทุบโต๊ะ! ไหลลื่นไร้เซิร์ฟเวอร์ 100% (ไม่ต้องนั่งอัปเดตแพทช์ Windows โง่ๆ) และกฎหมายสูงสุดคือ "ตารางหนึ่งเทเบิล... มึงจะยัดรูปโป๊เป็นพันๆ Petabyte ก็ไม่มีใครด่า!" ไร้รอยต่อทอเต็มผืนของแทร่!

❌ **[ผิด] SimpleDB**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ไอ้ตู้เย็นร้อยปี `SimpleDB` แม่งเป็นบร๊ะเจ้า NoSQL รุ่นเดอะ (เกิดก่อน DynamoDB อีก) แต่กรรมตามสนอง... แม่งมีข้อจำกัดส้นตึกคือ **"หนึ่งตาราง (Domain) ห้ามอัดข้อมูลเกิน 10 GB เด็ดขาด ถังแตก!!"** ซึ่งมันผิดกฎเหล็กของโจทย์ที่ร้องขอ "No limit on storage size" คอขาดบาดตายฮะ!

❌ **[ผิด] Amazon Aurora**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! พระรูปหล่อ `Aurora` แม่งเทพจริงรวยจริง... แต่มันคือนักเรียนกวดวิชาสาย **"ตารางระเบียบเป๊ะ (Relational Database / SQL)!!"** มึงเอาพ่อหนุ่มมีระเบียบมาตอบโจทย์ช่างกล "NoSQL" มันก็สอบตกตั้งแต่ด่านแรกแล้วโว้ยยย! บอดตาใส!

❌ **[ผิด] Amazon Neptune**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้ปลาหมึกยักษ์ `Neptune` มันพวกกูรูสายมืด... เป็นฐานข้อมูลตระกูล **"ใยแมงมุม (Graph database) ขุดหารากเหง้าว่าใครเป็นชู้กับใครโว้ย!"** ไม่ใช่ Document/Key-Value ทั่วไปแบบที่แอปสตาร์ทอัพโง่ๆ นึกจะเอามาใช้เก็บ Log เล่นๆ ถ่มน้ำลายใส่เลยฮะ!

---
---

## 📌 คำถามที่ 25
**โจทย์:**
An application is hosted in an Auto Scaling group of EC2 instances. To improve the monitoring process, you have to configure the current capacity to increase or decrease based on a set of scaling adjustments. This should be done by specifying the scaling metrics and threshold values for the CloudWatch alarms that trigger the scaling process.

Which of the following is the most suitable type of scaling policy that you should use?

**ตัวเลือก:**
- [ ] Simple scaling
- [ ] Target tracking scaling
- [ ] Scheduled Scaling
- [x] Step scaling

---
### 🎯 โจทย์ต้องการอะไร?
มีแก๊งค์โคลนนิ่งตึก `Auto Scaling group` 
เจ้านายสั่งกติกาเพิ่มเตาปฏิกรณ์: "กูอยากตั้งกฎหมายเวทย์มนต์ (Scaling policy) โดยระบุว่าจะดึงตัวเลขไหนมาวัด (metrics) และเมื่อไหร่จะแหกปากร้องเตือน (CloudWatch alarms threshold)... 
และที่สำคัญ: **"การเพิ่ม/ลดตึก ต้องทำเป็น 'สเต็ปบันไดขั้นอวิชชา' (based on a set of scaling adjustments)!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ข้อสอบ Auto Scaling มีศัพท์หากินแค่ 3 ตัว:
  1. "กูอยากให้ CPU นิ่งๆ แถวๆ 50% เหมือนเปิดแอร์" = `Target tracking`
  2. "เพิ่มลดเป็นขั้นบันได (set of scaling adjustments) / มีการตั้ง Alarm ขยายตามระดับความรุนแรง (size of the alarm breach)" = **`Step scaling`** (คำตอบตายตัว!)
  3. "กูเบื่อ! ขี้เกียจคิด ทะลุเกณฑ์ปุ๊บ มึงกระชากทีละเครื่องโง่ๆ จบๆ" = `Simple scaling`

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Step scaling**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! เข้าเป้าทุกตัวอักษร! กฎแห่ง `Step Scaling` คือการสลักหลัง CloudWatch Alarm แยกเป็นขั้นบันได เช่น "ถ้า CPU แตะ 60% มึงเพิ่ม 1 เครื่องนะ... แต่ถ้าเดือดปุดๆ ทะลุ 90% มึงสับตีนแตกเพิ่มพรวดเดียว 5 เครื่องเลยนะโว้ย!" (set of scaling adjustments) นี่แหละความฉลาดมิกซ์แอนด์แมทช์ที่แท้ทรู!

❌ **[ผิด] Target tracking scaling**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คุณหนูแอร์คอนดิชั่น `Target tracking` แม่งไม่สนใจกฎข้อบังคับขั้นบันไดบ้าบออะไรทั้งนั้น! มึงแค่ตั้งเทอร์โมสตรัทโง่ๆ ว่า "กูขอเป้า CPU 50% จบ..." แล้วเดี๋ยวมันไปสั่งเปิดปิดแอร์เพิ่มเครื่องลดเครื่องของมันเองแบบกลวงๆ! ผิดคีย์เวิร์ดอย่างจังฮะ!

❌ **[ผิด] Simple scaling**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ไดโนเสาร์เต่าล้านปี `Simple scaling` แม่งคือบรรพบุรุษที่เอาแต่ใจ... พอกริ่งเตือนดังปุ๊บ มันจะทำตามคำสั่งบรรทัดเดียวซ้ำๆ หุ่นยนต์แตก "กูจะเพิ่ม 1 เครื่อง! กูจะเพิ่ม 1 เครื่อง!"... มัน **ไม่มีสมองมานั่งสวิตช์แยกระดับขั้นบันไดความรุนแรง (set of adjustments / size of alarm)** ห่วยแตกฮะ AWS แนะนำให้เลิกใช้แล้วด้วย!

❌ **[ผิด] Scheduled Scaling**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะ `Scheduled Scaling` มีไว้เล่นผีถ้วยแก้วตั้งนาฬิกาปลุกตายตัว "ทุกวันศุกร์ 8 โมงเช้า มึงปั้มเครื่องลอยมาเลยลูก!" ...มันไม่ได้ใช้เครื่องวัดปรอทหน้าตาของชาวบ้าน (metrics / CloudWatch Alarms) มาขยี้ขยับตัวตามกลไกเล้ย! หลุดวงโคจรไปไกล!

---
---

## 📌 คำถามที่ 26
**โจทย์:**
A company has a web-based ticketing service that utilizes Amazon SQS and a fleet of EC2 instances. The EC2 instances that consume messages from the SQS queue are configured to poll the queue as often as possible to keep end-to-end throughput as high as possible. The Solutions Architect noticed that polling the queue in tight loops is using unnecessary CPU cycles, resulting in increased operational costs due to empty responses.

In this scenario, what should the Solutions Architect do to make the system more cost-effective?

**ตัวเลือก:**
- [ ] Configure Amazon SQS to use short polling by setting the ReceiveMessageWaitTimeSeconds to zero.
- [x] Configure Amazon SQS to use long polling by setting the ReceiveMessageWaitTimeSeconds to a number greater than zero.
- [ ] Configure Amazon SQS to use short polling by setting the ReceiveMessageWaitTimeSeconds to a number greater than zero.
- [ ] Configure Amazon SQS to use long polling by setting the ReceiveMessageWaitTimeSeconds to zero.

---
### 🎯 โจทย์ต้องการอะไร?
แอปซื้อตั๋ว มีคนงาน `EC2` ยืนรอรับบัตรคิวจากตู้กดหรรษา `Amazon SQS`
อาการหนักคือ: ไอ้พวก EC2 แม่งบ้าพลัง! กระตุกสั่นริกๆ กระหน่ำตีระฆังหน้ากะลา SQS ถามยิกๆ **"มีของไหม? มีของให้กูยัง? (poll in tight loops)"**... ผลลัพธ์คือ **"กะลายังว่างเปล่า (empty responses)"** แต่ EC2 เหนื่อยฟรี CPU พุ่งหัวขโมยตังค์ค่าไฟยับๆ!
คำถาม: ท่ายากสับขาหลอกอันไหน... ที่จะช่วย "ตบกบาลกระชาก EC2 ให้นั่งคอยเฉยๆ นานๆ (ลดต้นทุน)" ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียสายยาจกคลุกฝุ่น SQS! เมื่อไหร่ก็ตามที่โจทย์ด่าว่า **"โอ๊ย บ้าบอ ถามรัวๆ เสียค่า API ฟรีๆ เพราะได้กล่องเปล่ากลับมา (Empty responses)!"** = วิธีปราบผีที่หล่อที่สุดคือเปิดวิชา **`Long Polling (รอคอยอย่างใจเย็น)`**
- และคาถาเสก Long Polling ให้ทำงานก็คือ: ต้องบิดนาฬิกาทราย **`ReceiveMessageWaitTimeSeconds` ให้มีค่า "มากกว่า 0 วิ" (Greater than zero - แม็กซิมัม 20 วิ)** เท่านั้น!! ท่องจำชั่วชีวิตฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Configure Amazon SQS to use long polling by setting the ReceiveMessageWaitTimeSeconds to a number greater than zero.**
- **ทำไมถึงถูก:** ต่อยฮุกเข้าแกนสมอง! เป๊ะทุกตัวอักษรไม่เหลื่อมล้ำ!
วิชาขี้เกียจ `Long Polling` จะเอากรรไกรตัดสายโทรศัพท์ EC2 ให้ยืนร้องเพลงรอเงียบๆ... ถ้า SQS ยังไม่มีของส่งมา EC2 มันก็จะ "รอค้างไปนานสูงสุด 20 วินาที (greater than 0)" ช่วยฆ่าล้างเผ่าพันธุ์ปัญหา **'โทรติดด่าฮัลโหลแต่ไม่มีใครพูด (empty response)'** ได้ร้อยล้านเปอร์เซ็นต์ โคตรประหยัดค่า API!

❌ **[ผิด] Configure Amazon SQS to use short polling by setting the ReceiveMessageWaitTimeSeconds to zero.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! นี่มันคืออาการของโรคสันนิบาต **`Short Polling (ทวงหนี้รายวินาที)`** ของเดิมที่เป็นสาเหตุทำเครื่องมึงชิบหายอยู่นี่ไงฮะ!! มึงตั้งค่าศูนย์วิกะพริบตาปุ๊บก็ไปทุบประตูด่าปั๊บ... มีแต่จะเปลืองตังค์ค่า CPU เหนื่อยหอบแดกทิ้งขว้าง!

❌ **[ผิด] Configure Amazon SQS to use short polling by setting the ReceiveMessageWaitTimeSeconds to a number greater than zero.**
- **ทำไมถึงผิด:** บอดตาใสจับสลับคู่! มึงบ้าหรอ! กฎหมายกำหนดว่า "ถ้าดึงเวลาให้มากกว่า 0" มันจะเปลี่ยนร่างวิวัฒนาการไปเป็นก๊อดซิลล่า `Long Polling` ทันทีโว้ยย!! มันจะเรียกว่า Short polling ได้ไงเล่าฮะ! ขัดแย้งในตัวเองฉิบหาย!

❌ **[ผิด] Configure Amazon SQS to use long polling by setting the ReceiveMessageWaitTimeSeconds to zero.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ตรรกะวิบัติย้อนแย้งอีกแล้วฮะ! การตั้งค่าให้เป็น 0 คือความหมายของผีถ้วยแก้วกระตุกสั่น `Short Polling`! จะมายัดไส้เรียกตัวเองว่า Long Polling ให้หรูหราหมาเห่าทำซากอะไร! ผิดไวยากรณ์ขั้นรุนแรง!

---
---

## 📌 คำถามที่ 27
**โจทย์:**
A top investment bank is in the process of building a new Forex trading platform. To ensure high availability and scalability, you designed the trading platform to use an Elastic Load Balancer in front of an Auto Scaling group of On-Demand EC2 instances across multiple Availability Zones. For its database tier, you chose to use a single Amazon Aurora instance to take advantage of its distributed, fault-tolerant, and self-healing storage system.

In the event of system failure on the primary database instance, what happens to Amazon Aurora during the failover?

**ตัวเลือก:**
- [ ] Amazon Aurora flips the A record of your DB Instance to point at the healthy replica, which in turn is promoted to become the new primary.
- [ ] Amazon Aurora flips the canonical name record (CNAME) for your DB Instance to point at the healthy replica, which in turn is promoted to become the new primary.
- [ ] Aurora will first attempt to create a new DB Instance in a different Availability Zone of the original instance. If unable to do so, Aurora will attempt to create a new DB Instance in the original Availability Zone in which the instance was first launched.
- [x] Aurora will attempt to create a new DB Instance in the same Availability Zone as the original instance and is done on a best-effort basis.

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารโลกสร้างแอปเทรดหุ้น Forex จัดเครื่อง `EC2` นำทัพแน่นทุ่น 
แต่แอบงกที่ฐานข้อมูล: **"กูเช่าพระเอกดาวซัลโวตารางก้อนโต `a single Amazon Aurora instance` มาวาดลวดลายไว้แค่หัวเดียวเพียวๆ (ไม่มีสแตนอินหรือ Replica ห้อยท้ายมาด้วย!)"**
ดราม่าบังเกิด: จู่ๆ อุกกาบาตชนกะโหลก DB ตัวหัวใจหลักปางตายตายห่า (system failure)...
คำถาม: ในเมื่อมึงไม่มีห่วงยางช่วยชีวิตสำรอง (Replica) เลยซักแอะ... `Aurora` จะกระทืบไส้ดิ้นรนเอาชีวิตรอดฉุกเฉิน (Failover) ด้วยปาฏิหาริย์กระบวนท่าไหน ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ความโหดสัสของ Aurora ระดับอนุบาล 2! หน้าไพ่บีบไข่แตกมาแล้วว่า **"มึงหล่อเท่ใช้ฐานข้อมูลแค่ 1 หัวเด่นๆ (Single instance - ไม่มี Replica)"**!
- กฎแห่งความตาย: ถ้าไม่มีร่างโคลนสแตนอินกางรอไว้... Aurora จะเสกมนต์ดำกระตุ้นชีพจร โดยการ **"ปั้นดินเหนียวคลอดเครื่อง DB ตัวใหม่ขึ้นมาดื้อๆ ในตึกเดิม (same AZ) ให้ก่อนแบบขูดเลือดขูดเนื้อ (best-effort basis) ดันทุรังสุดชีวิตล่ะวะ!"**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Aurora will attempt to create a new DB Instance in the same Availability Zone as the original instance and is done on a best-effort basis.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! หนีเสือปะจระเข้ของแทร่! กฎหมายหน้ารกโลกของ Aurora ถ้าลูกค้าเสล่อไม่ซื้อ Replica นำทาง... เวลามันตายห่า มันก็จะวิ่งเต้นตะเกียกตะกาย **"สร้างตัวลอกเลียนแบบร่างทรงขึ้นมาใหม่ตรงจุดที่มึงตายแหละ (same AZ)!" แบบบุญทำกรรมแต่ง (best-effort)**... รอดก็รอด ไม่รอดก็ฉิบหายสวดอภิธรรมฮะ! (ตอบตรงตำราที่สุด)

❌ **[ผิด] Amazon Aurora flips the canonical name record (CNAME) / Amazon Aurora flips the A record... to point at the healthy replica...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงตาปลาดุกหรอฮะ!? โจทย์เขาสลักหน้าผากตัวเบ้อเริ่มมาแล้วว่าฐานะยากจนใช้แค่ **`single Amazon Aurora (ร่างเดี่ยว)`** กูไม่ได้เจียดตังค์ซื้อ **`Replica (ร่างโคลน)`** มาห้อยต่องแต่งไว้ซักกะตัวโว้ย!! แล้วมึงจะเอาป้าย CNAME ชักรอกไปแปะใส่หัว Replica นอกโลกที่ไหนละฮะ!? กาผิดสเปคเต็มๆ!

❌ **[ผิด] Aurora will first attempt to create a new DB Instance in a different Availability Zone...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! มั่วตั้วล้อหลังแซงล้อหน้า! หลักสูตร CPR มนุษย์กบของ AWS... อันดับแรกมันต้องพยายามคลอดลูกแฝดงัดข้อโผล่พรวดขึ้นมาใน **"คลินิกเดิมที่เพิ่งตาย (same AZ) ก่อนเป็นอันดับแรกเสมอโว้ย!!"** ไม่ใช่เสร่อหนีไปเริงร่าข้ามโลกสร้างใหม่ที่ประเทศอื่น (different AZ) แบบหน้าตาเฉย มันกระโดดข้ามสเต็ปฮะ!

---
---

## 📌 คำถามที่ 28
**โจทย์:**
A financial analytics application that collects, processes, and analyzes stock data in real-time uses Amazon Kinesis Data Streams. The producers continually push data to Kinesis Data Streams while the consumers process the data in real time.

In Kinesis, where can the consumers store the results? (Select TWO.)

**ตัวเลือก:**
- [ ] Amazon Athena
- [ ] Amazon EMR
- [x] Amazon Redshift
- [ ] AWS Glue
- [x] Amazon S3

---
### 🎯 โจทย์ต้องการอะไร?
ขยะอวกาศ (Stock data) ถูกสาดกระหน่ำยิงฉีดน้ำใส่ท่อ **`Kinesis Data Streams`** แบบสายฟ้าแลบ (real-time)
ไอ้พวกลูกหาบ `consumers` ก็รับอ้วกดูดน้ำมารีบปั่นๆ ย่อยวิเคราะห์เรียบร้อยปานกามนิตหนุ่ม!
เจ้านายถาม: **"แล้วกากเดนผลลัพธ์ที่ย่อยดัดแปลงเสร็จแล้ว (store the results) เนี๊ยะ แก๊งค์ Consumer Kinesis มันสามารถบ้วนทิ้งลงกระโถนอ่างน้ำบริการไหนของ AWS เป็นเป้าหมายปลายทางได้บ้างวะ ???"** (เลือก 2 ทางออก)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงประจำท่อปราบมาร Kinesis! ท่องเป็นกลอนแปดเลยฮะ: **"จุดพักพิงฝากผีฝากไข้ของบรรดาซาก Kinesis Consumers เอาของไปโยกยัดได้ มีหน้ากากประจำคือ 1. Amazon S3 (ดองขยะยาวๆ) และ 2. Amazon Redshift (อัดเข้าตลับโกดังใหญ่เตรียมโดนฉีก) และ 3. Amazon DynamoDB (แปะกาวฝังชิพตาราง)"**
- บริการอื่นๆ ที่โผล่มาหลอกแดกในช้อยส์ ส่วนใหญ่มันคือเครื่องปั่นน้ำผลไม้ "ตัวคำนวณประมวลผล (Compute/Analyze)" ไม่ใช่ "ตู้เก็บศพ (Storage)" ฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon S3 / Amazon Redshift**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร!
1. `Amazon S3` = ถังขยะกะละมังครอบจักรวาล Consumer ดูดรินน้ำเสร็จ บ้วนทิ้งผางลงป่าช้ามรดกโลกยอดฮิตที่สุดของ AWS 
2. `Amazon Redshift` = โกดังกระจก Data Warehouse สุดหรู Consumer เอาของหรูที่สับหั่นขยี้อย่างดีแล้ว ยัดแช่แข็งก้อนเบ้อเริ่มรอนายกสมาคมมาเขียน SQL จกไปวิเคราะห์กราฟต่อหล่อๆ ฮะ 

❌ **[ผิด] AWS Glue**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! คุณป้าสารพัดช่าง `Glue` เนี่ยะ เค้าเป็นมือสังหารรับจ้าง "สกัด-แปลง-ยัด (ETL Service)" ถือมีดพร้าทำกับข้าวนะฮะ! เขามิใช่ตู้เซฟเก็บอาหารแช่แข็ง (Storage buffer) ที่ใครจะมาฝากของยัดใส่ไส้พุงเค้าได้โว้ยย!! ผิดบทบาทฮะ!

❌ **[ผิด] Amazon Athena**
- **ทำไมถึงผิด:** บอดตาใส! กะเทยชุดเกราะ `Athena` นางเป็นนินจานักกระซวก! ถือมีดสั้นวิ่งเข้าไปยิงโค้ด (Query) สับๆ ขยะใน S3 ดิบๆ... นางไม่ใช่ **"กระถางต้นไม้ (Storage / Database)"** ที่มึงจะบ้วนน้ำลายขยะจาก Kinesis ไปฝากดองทิ้งไว้บนตัวนางได้บ้าบอคอแตกอะไรทั้งนั้น! หลอกดาวจัดๆ

❌ **[ผิด] Amazon EMR**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะช้างกระทืบโรง `EMR` แกเป็นโรงฆ่าสัตว์ Hadoop จั๊กกะแร้เปียก! เอาไว้สับๆ บดๆ Big Data (Processing Engine)! แม้แกจะเชื่อมดูดน้ำจาก Kinesis ไปเป็นโจทย์ทำต้มยำได้... "แต่มันไม่ได้เป็นหีบศพ Storage พักพิงยาวๆ เอาไว้รับของหลังย่อยเสร็จ (Store results)" โว้ยย! เก็บไว้ในหัวมึงรอมึงดับคอมทิ้งก็หายหมดสิฮะโง่จริง!

---
---

## 📌 คำถามที่ 29
**โจทย์:**
A business plans to deploy an application on EC2 instances within an Amazon VPC and is considering adopting a Network Load Balancer to distribute incoming traffic among the instances. A solutions architect needs to suggest a solution that will enable the security team to inspect traffic entering and exiting their VPC.

Which approach satisfies the requirements?

**ตัวเลือก:**
- [x] Create a firewall using the AWS Network Firewall service at the VPC level then add custom rule groups for inspecting ingress and egress traffic. Update the necessary VPC route tables.
- [ ] Enable Traffic Mirroring on the Network Load Balancer and forward traffic to the instances. Create a traffic mirror filter to inspect the ingress and egress of data that traverses your Amazon VPC.
- [ ] Create a firewall at the subnet level using the Amazon Detective service. Inspect the ingress and egress traffic using the VPC Reachability Analyzer.
- [ ] Use the Network Access Analyzer service on the application’s VPC for inspecting ingress and egress traffic. Create a new Network Access Scope to filter and analyze all incoming and outgoing requests.

---
### 🎯 โจทย์ต้องการอะไร?
เอาหน้าต่างแอปตั้งหน้ากระดาน `EC2` ห้อยพัดลม `Network Load Balancer (NLB)` ไว้หน้าตึก 
ตำรวจ รปภ. หวงก้างสั่งกำชับ: **"กูอยากแหกตาดูล้วงลึก (inspect) แพ็กเก็ตจดหมายทุกลูกที่แม่งบินตีลังกาเข้าและออกเขตรั้วบ้าน VPC ของกู!"**
คำถาม: ท่ายากสับขาหลอกอันไหน... ที่เป็นกล้องวงจรปิดระดับเอ็กซเรย์กระเป๋าสะพาย ตรวจจับของโจรตามคำสั่งบอสได้เป๊ะสุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตาย! ถ้าโจทย์ร้องเรียกอักษรศีลธรรม **"อยากตรวจไส้ในแพ็กเก็ตล้วงตับ (Perform deep packet inspection / inspect traffic) ขาเข้า-ขาออก ตรงแนวตะเข็บชายแดนขอบรั้ว VPC"** = ทหารม้าปราบผีเพียงคนเดียวที่ทำตัวเหมือน Suricata IPS ขั้นเทพกำแพงเหล็กได้คือผู้ชายที่ชื่อว่า **`AWS Network Firewall`** ล้านเปอร์เซ็นต์เท่านั้นฮะ! (ท่องไว้คู่กันตลอดกาล)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Create a firewall using the AWS Network Firewall service at the VPC level then add custom rule groups...**
- **ทำไมถึงถูก:** พระเอกตีระฆังดังกังวาน! เข้าเป้าทุกร่องลึก! การตั้งป้อมค่าย **`AWS Network Firewall`** คล่อมด่านพรมแดนหมู่บ้าน (VPC level) มันคือท่าไม้ตายสูงสุดของ AWS ที่จะปลดล็อกโหมดล้วงไส้ Deep Packet Inspection (DPI) แหกตาดูจดหมายขากลับและขาเข้า ยันเงาหัวกุญแจเข้ารหัสเลยฮะ ถือเป็นบรรทัดฐานความปลอดภัยที่เจ้านายปลื้มสุด!

❌ **[ผิด] Use the Network Access Analyzer service on the application’s VPC...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ไอ้โปรแกรมลูกเสือ `Network Access Analyzer` อะ แม่งเป็นแค่นกแก้วนกขุนทอง... คอยรายงานว่า "อุ๊ย บ้านนี้ประตูล็อกไม่แน่นนะ รูรั่วนะบอส (verify network segmentation)"... **แต่มันไม่ได้มีอำนาจศักดิ์สิทธิ์ไปแหกตาล้วงตับไตไส้พุงดูเนื้อหาในจดหมายแต่ละใบ (Deep packet inspection) ระหว่างทางได้หน้าตาเฉยโว้ยย!!** คนละชนชั้น!

❌ **[ผิด] Create a firewall at the subnet level using the Amazon Detective service...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! กรรไกรตัดสายตรรกะฉับๆๆ! มึงตาปลาดุกหรอฮะ!? ยอดนักสืบจิ๋ว `Amazon Detective` แม่งมีไว้สอบสวนคดีฆาตกรรมรวบรวมหลักฐานย้อนหลังฮะ!! มันไม่ได้มีกำเนิดมาเสก **"ลวดหนาม Firewall"** ขวางหน้าประตูบ้านดื้อๆ แบบนี้บ้าบอคอแตกอะไรทั้งนั้น! หลอกเด็กชัดๆ!

❌ **[ผิด] Enable Traffic Mirroring on the Network Load Balancer...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! วิชาลอกการบ้าน `Traffic Mirroring` แม่งก็แค่ทาสรับใช้ "แอบสำเนากระจกสะท้อนก๊อปปี้แพ็กเก็ต (Copy network traffic) ไปโยนทิ้งไว้ข้างทาง"... **การก๊อปปี้มาโยนเรี่ยราด ไม่ได้แปลว่าแกจะสามารถ 'วินิจฉัยล้วงไส้สับคอหอยตรวจจับภัยคุกคาม (Inspect)' ด้วยตัวของมันเองหน้ารูจมูกโว้ย!!** มึงต้องมี Intrusion Detection System (IDS) แยกมารับส่วยอีกต่างหาก วุ่นวายแถมไม่ได้ความปลอดภัยเป็นกอบเป็นกำฮะ!

---
---

## 📌 คำถามที่ 30
**โจทย์:**
Amazon Elastic Kubernetes Service (Amazon EKS) is used by an e-commerce company to deploy and manage its containerized applications. The website experiences a surge in traffic around the holidays, which significantly adds to the effort. The goal is to ensure that its underlying infrastructure automatically scales in and out in response to demand.

Which of the following would meet the requirements with the LEAST amount of operational overhead? (Select TWO.)

**ตัวเลือก:**
- [ ] Enable the Cluster Autoscaler for Amazon EKS to automatically manage the number of nodes based on the resource needs of the pods.
- [ ] Install the Kubernetes Metrics Server to the Amazon EKS cluster and activate Vertical Pod Autoscaler.
- [ ] Use CloudWatch Alarms to trigger scaling for containerized applications.
- [x] Install the Kubernetes Metrics Server to the Amazon EKS cluster and activate the Horizontal Pod Autoscaling.
- [x] Set up Karpenter to automatically adjust the number of nodes in the EKS cluster when pods fail or are rescheduled onto other nodes.

---
### 🎯 โจทย์ต้องการอะไร?
แอปตะกร้าสินค้า ปลูกถั่วงอกเลี้ยงไข้ห้อยอยู่ในดง **`Amazon EKS`** (คิวเบอร์เนตีส)
ปัญหา: ช่วงโบนัสออก คนแห่ช้อปปิ้งจนเซิร์ฟพัง! 
บอสสั่งกร้าว: **"กูต้องการเวทมนตร์ ปั๊มขยายร่างหดร่างอัตโนมัติ (automatically scales in and out) ทั้งตัวกล่องแอป (Pod) และตัวเครื่องเหล็ก (Node) รับพายุมรสุม..."**
ออปชั่นพิเศษเสริม: **"...แบบชิวๆ ประหยัดหยาดเหงื่อแรงงานกรรมกร (LEAST amount of operational overhead) ด้วยนะโว้ย!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: โลกของ Kubernetes การขยายร่างมี 2 มิติเสมอ! มิติแรก "ขยายตัวกล่องแอป (Pod)" ท่าเบสิคชาวบ้านที่เวิร์กสุดในการรับโหลดคือ **`Horizontal Pod Autoscaling (HPA)`** (แตกหน่อแยกร่างตัว Pod โคลนกันเยอะๆ ดีกว่าสูบสเตียรอยด์ขยายร่างแนวตั้ง Vertical)
- ทริค 2: มิติ "ขยายแผ่นฐานอสังหาเครื่องปั่นไฟ (Node)" ท่าปราบมารยุคใหม่ที่ AWS รักและอวยยศดันสุดส้นตีน แย่งงาน Cluster Autoscaler สบายแฮนด์ฟรี 100% ก็คือโปรเจกต์โอเพนซอร์สลูกกระจ๊อกที่ชื่อว่า **`Karpenter`** ฮับ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Install the Kubernetes Metrics Server... activate Horizontal Pod Autoscaling. / Set up Karpenter to automatically adjust the number of nodes...**
- **ทำไมถึงถูก:** คอมโบปราบเซียนงูเหลือมจงอาง! สมบูรณ์แบบสุดทางรัก! 
1. `Horizontal Pod Autoscaling (HPA)` = พออุณหภูมิ CPU เดือดปุดๆ HPA จะปั๊มโคลนนิ่งแก้วเจลลี่รังไหมก้อน Pod กระจายร่างไปทั่วตึกเพียบเลย! ตอบรับโจทย์คำว่า "Scale in and out" แนวราบตรงตัวเป๊ะ!
2. `Karpenter` = ของเล่นชิ้นใหม่ลูกรัก AWS! เกิดมาเป็นวิศวกรคุมไซด์งานแทนมึง! บริหารจัดหาเครื่องเปล่าตระกูล EC2 โถกๆ (Node) มาวางรอให้พวก Pod ได้เช่าอยู่ได้อย่างฉลาดและว่องไวแสงกว่ายุคหินเก่าเยอะ ลดปัญหา Operational overhead ให้แก่นายช่างได้ล้านเปอร์เซ็นต์ฮะ!

❌ **[ผิด] Enable the Cluster Autoscaler for Amazon EKS...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! คุณปู่ `Cluster Autoscaler` แม่งก็เป็นคนคอยปั๊มเครื่อง Node เหมือนกันนั่นแหละฮะ... แต่กรรมคือลูกพี่แกทำงานแบบเต่าล้านปี ควบคุมตัวแปรผ่าน Auto Scaling Group ให้วุ่นวายปวดกะบาล (Operational overhead พุ่งทะยาน!) สู้ลูกรักคนใหม่อย่าง `Karpenter` ไม่ได้ซักขุมขนฮะ โดนตบตกรอบไป!

❌ **[ผิด] Install the Kubernetes Metrics Server... and activate Vertical Pod Autoscaler.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะงอกแนวตั้ง `Vertical Pod Autoscaler (VPA)` แม่งหน้าด้าน! แทนที่จะโคลนนิ่งแยกร่างรับตีนลูกค้า (Scale out)... มึงเสือก "จับไข่ Pod ตัวเดิมกรอกสเตียรอยด์ เพิ่มแรมเพิ่ม CPU ให้บวมฉุ!" ซึ่งกติกาโจทย์มันร้องขอฮะว่า **"ขยายเข้า ขยายออก (Scale IN and OUT)"** ซึ่งคำนี้คือการเล่นแร่แปรธาตุเผ่าพันธุ์ "แนวระนาบแนวนอน (Horizontal)" ล้วนๆ! มึงมาสาย Vertical ผิดป้ายฉิบหายวายป่วง!

❌ **[ผิด] Use CloudWatch Alarms to trigger scaling for containerized applications.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! นี่มึงใช้หอกไม้ไผ่แทงอุกกาบาตหรอฮะ!? ในเมื่อกษัตริย์ `EKS` เขามีเครื่องมือเวทมนตร์ภายในอัจฉริยะแจกให้เสร็จสรรพ (HPA/Karpenter)... มึงจะทุรังงมไปใช้กริ่งโรงเลื่อยบ้านบึ้มอย่าง `CloudWatch Alarms` ผูกท่อส่งลมโง่ๆ ตัดคร่อมสลับไปมาทำไมให้ระบบแตกกระจาย (Overhead โคตรรุงรัง)! เลอะเทอะมากฮะ!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 4: ข้อ 31 - 40)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 31
**โจทย์:**
A company needs secure access to its Amazon RDS for MySQL database that is used by multiple applications. Each IAM user must use a short-lived authentication token to connect to the database.

Which of the following is the most suitable solution in this scenario?

**ตัวเลือก:**
- [ ] Use AWS IAM Identity Center to access the RDS database.
- [ ] Use an MFA token to access and connect to a database.
- [ ] Use AWS Secrets Manager to generate and store short-lived authentication tokens.
- [x] Use IAM DB Authentication and create database accounts using the AWS-provided AWSAuthenticationPlugin plugin in MySQL.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทอยากไขกุญแจเข้าโกดังฐานข้อมูล **`Amazon RDS for MySQL`** โดยให้พนักงานแต่ละคน (IAM User) ถือรหัสผ่านพิเศษ
กฎเหล็กคนบ้า: **"กูไม่เอาพาสเวิร์ดถาวร! กูอยากให้พนักงานใช้วิชานินจา 'ปั่นรหัสผ่านชั่วคราวฉุกเฉิน (short-lived authentication token) อายุสั้นๆ' มาเสียบคีย์การ์ดเข้าฐานข้อมูล!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! ทันทีที่โจทย์ร้องเรียกอักษรศีลธรรม **"ต่อท่อเข้า RDS (MySQL / PostgreSQL) + แล้วบังคับใช้ตั๋วเดินทางชั่วคราว 15 นาที (Short-lived authentication token / No password)"** = หน้าไพ่แชมป์เปี้ยนโลกคำตอบเดียวในปฐพีคือการใช้วิชา **`IAM DB Authentication`**! ห้ามเบี่ยงประเด็นเด็ดขาด!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use IAM DB Authentication and create database accounts using the AWS-provided AWSAuthenticationPlugin plugin in MySQL.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! สมบูรณ์แบบทุกพิกเซล! การสับสวิตช์เปิดวิชา **`IAM DB Authentication`** มันจะเสกตั๋วผีอายุสั้น 15 นาที ให้พนักงานเอาไปรูดเข้าฐานข้อมูลแทนรหัสผ่านปู่ทวดได้ดื้อๆ เลยฮะ! (แถมยังบีบคอให้เปิดช่องทางเข้ารหัสท่อ SSL ปลอดภัยสูงสุด 100% ด้วย) ส่วนปลั๊กอิน `AWSAuthenticationPlugin` นี่ก็คือลูกจ๊อกยามหน้าประตูที่ AWS โยนลงตู้ MySQL ให้ผูกแขนรับเหมาทำงานนี้คู่กันเป๊ะๆ

❌ **[ผิด] Use AWS Secrets Manager to generate and store short-lived authentication tokens.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! คุณป้าตู้เซฟปืนแตก `Secrets Manager` แม่งก็เป็นคนเก็บกุญแจฐานข้อมูลเหมือนกัน... แต่มันไม่ใช่วิชานินจาเป่าลม "รหัสปลอมตัวอายุสั้นวิกฤต (generate short-lived token) แทนการหมุนคาร์ล็อค" โว้ยย!! มันเก็บรหัสผ่านจริงแหละ แต่ให้โปรแกรมอื่นมาเบิกไปใช้! ท่าเบิกพาสเวิร์ดฉุกเฉินมันเป็นหน้าที่ของ IAM DB Auth ล้วนๆ ฮับ!

❌ **[ผิด] Use an MFA token to access and connect to a database.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้กุญแจมือถือ `MFA token (Google Auto/OTP)` แม่งเป็นลิ่วล้อหน้าประตูกระทรวง IAM!! มันไม่ได้มีชีวิตอยู่เพื่อทิ่มไข่เจาะพาสเวิร์ดทิ่มทะลุลงไปยันสะดือแแอปฐานข้อมูล MySQL (RDS) ตรงๆ นะฮะ! ผิดระดับ เลเยอร์มันเพี้ยน!

❌ **[ผิด] Use AWS IAM Identity Center to access the RDS database.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ตำรวจจอหยอดเหรียญ `IAM Identity Center (AWS SSO เดิม)` แม่งเป็นศูนย์บัญชาการ "คนในองค์กร" ให้ล็อกอินรวบยอดฮะ! มันไม่มีปุ่มวิเศษสั่งดึงสายกระชาก "Token 15 นาทีฉุกเฉินเชื่อม DB" บ้าบอคอแตกอะไรทั้งนั้น! มั่วซั่วผิดประเด็นยับเยิน! 

---
---

## 📌 คำถามที่ 32
**โจทย์:**
An application is hosted on an EC2 instance with multiple EBS Volumes attached and uses Amazon Neptune as its database. To improve data security, you encrypted all of the EBS volumes attached to the instance to protect the confidential data stored in the volumes. 

Which of the following statements are true about encrypted Amazon Elastic Block Store volumes? (Select TWO.)

**ตัวเลือก:**
- [ ] Only the data in the volume is encrypted and not all the data moving between the volume and the instance.
- [ ] Snapshots are not automatically encrypted.
- [x] All data moving between the volume and the instance are encrypted.
- [ ] The volumes created from the encrypted snapshot are not encrypted.
- [x] Snapshots are automatically encrypted.

---
### 🎯 โจทย์ต้องการอะไร?
คุณตั้งค่า "เข้ารหัสแม่กุญแจเวทย์มนต์ (Encrypted EBS volumes)" ให้ก้อนดิสก์แล้ว! 
คำถามทฤษฎีจ๋าชาวดิน: อาการสั่นของก้อนดิสก์แบบไหนที่ลูกพี่ทำได้บ้างฮะ ถ้าง้างประตูแม่กุญแจ EBS ไว้แล้ว? (เลือก 2 ข้อสิ)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ท่องเป็นบทสวดมนต์หน้าเสาธงให้ขึ้นใจ... **"เมื่อไหร่ก็ตามที่ดิสก์ EBS โดนเจิมยันต์เข้ารหัสแล้ว (Encrypted)..."** มันจะสาดรังสีออร่าเผื่อแผ่มนต์ดำไปครอบคลุมคนรอบข้างทันที!
   1) ข้อมูลมิติลี้ลับ "ระหว่าวทาง (data-in-transit)" ที่เสียวแปล๊บวิ่งจากเครื่อง EC2 มายังเมนบอร์ดดิสก์... **ก็โดนเข้ารหัสอัตโนมัติด้วย!**
   2) ภาพถ่ายผีถ้วยแก้วก๊อปปี้ดิสก์ตัวแม่ทุกๆ ใบ (Snapshots)... **ก็จะคลอดลูกออกมาแบบโดนเข้ารหัส (Encrypted snapshot) ทารกติดแม่ไปอัตโนมัติ 100% เลยฮะ!** (รวมถึงดิสก์ใหม่ที่ปั้นแต่งออกมาจากรูปถ่ายพวกนี้ด้วย กฎมณเฑียรบาลติดเชื้อยกครัว!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] All data moving between the volume and the instance are encrypted. / Snapshots are automatically encrypted.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกกฎแรงโน้มถ่วง AWS! (ตามทริคข้างบนเป๊ะๆ) อานิสงส์รังสีความขลังของแม่กุญแจ EBS มันเผื่อแผ่ปัดกวาดเช็ดถูข้อมูลระหว่างวิ่งและภาพสแนปช็อตให้เหนียวหนืดติดเกราะ 100% ฟรีๆ เลยฮะ ไม่ต้องดิ้นรนเจ็บตัวตั้งค่าเพิ่ม!

❌ **[ผิด] Only the data in the volume is encrypted and not all the data moving between the volume and the instance.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ไร้สาระ! พระเจ้าอุตส่าห์เสกมนต์ให้เผื่อแผ่อานิสงส์กางร่มกันกระสุนครอบคลุมข้อมูลระหว่างทาง (Data moving) ให้แล้ว มึงจะเสือกมาเถียงว่า "เอ๊ะ ตรงกลางถนนไม่ได้เข้ารหัสนะ (not all the data moving)" ทำหอกอะไรล่ะฮะ!

❌ **[ผิด] Snapshots are not automatically encrypted.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! บิดเบือนความจริงสุดส้นตีน! กฎหมายครอบครัวประกาศกร้าวว่า "แม่เป็นไง ลูก(Snapshot)เป็นงั้น!" มันถ่ายทอดพันธุ์ทางสายเลือดติดรหัสแม่กุญแจอัตโนมัติเลยฮะ! ไม่มีข้อยกเว้นเด็ดขาด!

❌ **[ผิด] The volumes created from the encrypted snapshot are not encrypted.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ในเมื่อมึงเอากระจกรูปถ่ายสแนปช็อต (ที่โดนสาปเข้ารหัสแล้ว) มาโคลนนิ่งแกะสลักปั้นร่างเด็กทารก (ดิสก์ก้อนใหม่)... ไอ้ก้อนดิสก์ใหม่นี่มันก็ต้องติดเชื้อแม่กุญแจตาบอดหูหนวกออกมา 100% สิวะฮะ! จะมาอ้างว่าชุบตัวเป็นผ้าขาวบาง (not encrypted) หาพระแสงอะไร!

---
---

## 📌 คำถามที่ 33
**โจทย์:**
A company needs to accelerate the performance of its AI-powered medical diagnostic application by running its machine learning workloads on the edge of telecommunication carriers' 5G networks. The application must be deployed to a Kubernetes cluster and have role-based access control (RBAC) access to IAM users and roles for cluster authentication.

Which of the following should the Solutions Architect implement to ensure single-digit millisecond latency for the application?

**ตัวเลือก:**
- [ ] Host the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Set up node groups in AWS Wavelength Zones for the EKS cluster. Attach the EKS connector agent role AmazonECSConnectorAgentRole to your cluster and use AWS Control Tower for RBAC access.
- [ ] Host the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster and run the Kubernetes pods on AWS Fargate. Create node groups in AWS Wavelength Zones for the EKS cluster. Add the EKS pod execution IAM role AmazonEKSFargatePodExecutionRole to your cluster and ensure that the Fargate profile has the same IAM role as your Amazon EC2 node groups.
- [ ] Launch the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Configure the Amazon VPC CNI plugin for Kubernetes to manage pod networking in AWS Wavelength Zones. Install the AWS IAM Authenticator for Kubernetes aws-iam-authenticator to your cluster.
- [x] Launch the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Create node groups in AWS Wavelength Zones for the EKS cluster via the Wavelength service. Apply the AWS authenticator configuration map aws-auth ConfigMap to your cluster.

---
### 🎯 โจทย์ต้องการอะไร?
แอปโรงพยาบาล AI หมอเถื่อน ต้องการซูเปอร์สปีดยิ่งกว่านรก!! เครื่องมือแพทย์เจาะไข่แดง...
1. **"ขอมุดเครือข่ายมือถือเสาเข็มของแก๊งทรูดีแทค (edge of telecommunication carriers' 5G networks) จุกๆ เพื่อความหน่วงต่ำปานแสง 0.001 วิ (single-digit millisecond latency)!"**
2. อยากเลี้ยงแอปนี้บนกระถางต้นไม้ `Kubernetes (EKS)`
3. อยากให้ รปภ. คุกกระทรวง IAM แปลงร่างข้ามมิติมาแจกบัตรคิวเข้ากะทะห้องแล็บ EKS ได้เลยดื้อๆ (RBAC access to IAM users)!!
คำถาม: งัดท่ายากคอมโบเทพอันไหนมาผสมสูตรยาพิษดี ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: ทันทีทีเจอคำว่า **"5G networks / Telecommunication edge / Single-digit millisecond latency"** = นามบัตรพระเอกรูปหล่อที่เอาเสาสัญญาณยัดใส่กระดูกคอตั้งแคมป์ประชิดตึก True/AIS เลย ก็คือพ่อหนุ่ม **`AWS Wavelength`** ตลอดกาล! (ห้ามเบี้ยวโผ)
- ทริค 2: การจะลากคอ รปภ. IAM เข้ามาแดรกเหล้าเมาแปะชิปเข้าประตูค่ายในกระโจมพยาบาล Kubernetes ได้นั้น... มันมีมนต์ดำลับสุดยอดหนึ่งเดียวที่ชื่อว่า **`aws-auth ConfigMap`** (แฟลชไดร์ฟสอดไส้ชื่อคนรหัสลับผูกผี EKS กับ IAM) ท่องตัวนี้ไว้หากินได้ล้านคะแนน!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Launch the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Create node groups in AWS Wavelength Zones... Apply the AWS authenticator configuration map aws-auth ConfigMap to your cluster.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! มิกซ์แอนด์แมทช์สมบูรณ์แบบแจกคะแนนฟรี!
1. เอาป้อมค่าย Node ไปปลูกฝังเข็มริมหน้าต่างเสาสัญญาณ AIS/True ซะ! โดยใช้วิชา **`AWS Wavelength Zones`** ตอบโจทย์ทะลวงมิติ 5G ปรู๊ดปร๊าดเสี้ยววิ!
2. ลากกระบอกปืนยาสลบ **`aws-auth ConfigMap`** ไปยัดใส่ปาก EKS ดื้อๆ! เพื่อสั่งสอนให้ลูกน้องทหารยาม Kubernetes ยอมพยักหน้ารับบัตรกระทรวง IAM มาโยงคู่จับเป็น (RBAC access) เนียนๆ เลิศ!

❌ **[ผิด] Launch the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. Configure the Amazon VPC CNI plugin... Install the AWS IAM Authenticator (aws-iam-authenticator) to your cluster.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงตาปลาดุกหรอฮะ!? ลูกสมุนปลั๊กไฟปลั๊กพ่วง `VPC CNI plugin` มันมีหน้าปั้มแจก IP ให้เด็กในบ้าน EKS แดกแค่นั้นเอง... มันไม่ใช่แผนผังการคลอดลูกแฝดตึก EKS แย่งสาย 5G ของพวก Wavelength ซะทีไหน! และไอ้สวะ `AWS IAM Authenticator` แม่งเป็นแอปแฝงร่างอยู่ในหัวศาลากลาง EKS อยู่แล้ว... ไม่มีค่ายไหนต้องถ่อไปติดตั้ง "แมนนวลมือ" เองบ้าบอคอแตกให้เหงื่อร่วงเด็ดขาดฮะ!! (มึงต้องตั้งค่าผ่าน aws-auth ConfigMap โว้ย!) มั่วจัด!

❌ **[ผิด] Host the application to an Amazon Elastic Kubernetes Service (Amazon EKS) cluster... Attach the EKS connector agent role AmazonECSConnectorAgentRole... use AWS Control Tower for RBAC access.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะงอกแนวดิ่ง `AWS Control Tower` แม่งหน้าด้าน! เค้ามีไว้สำหรับแจกจ่ายบัตรสี รปภ. จัดระเบียบบริษัทหลายห้อง "ระหว่างตึก AWS Accounts มนุษย์แม่" มึงจะชักရอกข้ามป่าแอมะซอนมาตั้งด่านเช็คบัตร RBAC ในรูแคบแอเรียลูกเมียน้อยอย่าง "Kubernetes Cluster" ทำส้นตึกอะไรฮะ เลอะเทอะสุดติ่งกระดิ่งแมว!!

❌ **[ผิด] Host the application to... run the Kubernetes pods on AWS Fargate... ensure that the Fargate profile has the same IAM role as your Amazon EC2 node groups.**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้บ้า!! สเกลลวงตาพังพินาศพอกัน... ถ้ามึงมีแผนจะย้ายบ้านเด็กกำพร้า Pod หนีความจริงไปให้คุณป้า `AWS Fargate` เลี้ยงดูอุ้มชูแทน มึง **"ห้าม! ผูกเหรียญบัตรคิว IAM role เดียวกันกับพวกมนุษย์เศษเดน EC2 Node Group หน้าเก่าเด็ดขาด"** มันจะตีกันแย่งบัตรพนักงานตายห่า (โครตผิดหลักความปลอดภัย Fargate profile)!! แล้วคำสั่ง Wavelength 5G ยังเสือกหายสาบสูญไปไหนก็ไม่รู้ มั่วซ้ำซ้อน!!

---
---

## 📌 คำถามที่ 34
**โจทย์:**
An On-Demand EC2 instance is launched into a VPC subnet with the Network ACL configured to allow all inbound traffic and deny all outbound traffic. The instance’s security group has an inbound rule to allow SSH from any IP address and does not have any outbound rules. 

In this scenario, what are the changes needed to allow SSH connection to the instance?

**ตัวเลือก:**
- [x] The network ACL needs to be modified to allow outbound traffic.
- [ ] Both the outbound security group and outbound network ACL need to be modified to allow outbound traffic.
- [ ] No action needed. It can already be accessed from any IP address using SSH.
- [ ] The outbound security group needs to be modified to allow outbound traffic.

---
### 🎯 โจทย์ต้องการอะไร?
ตึกเช่ากระโหลกกะลา `EC2` โดนขังเดี่ยว
ด่านที่ 1 ตู้ยามหน้าหมู่บ้าน (Network ACL / NACL): "ยอมให้คนนอกเหยียบตีนเข้าผับได้ร้อยเปอร์เซ็นต์ (allow inbound) **แต่ห้ามใครเดินหน้าด้านกลับออกไปเด็ดขาด! (deny outbound)**"
ด่านที่ 2 รปภ. หน้าประตูห้องน้ำ (Security group / SG): "ยอมให้คนเจาะไข่แดงทะลวงไส้ (allow SSH inbound) รูดซิปกางเกงเข้ามากระทืบได้เลย..." **และเสือกไม่ได้กำหนดขาออก (no outbound rules) อีกตังหาก!**
คำถาม: ท่ายากสับขาหลอกอันไหน ที่มึงต้องซ่อมแซม... เพื่อให้มนุษย์รีโมทเจาะไข่แดง "SSH เดินขากลับตอบแชท" ออกมาถึงบ้านพักลูกค้าได้อย่างปลอดภัย ??? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค 1: กฎเหล็กแผ่นดินแม่ผัว! รปภ. **`Security Group (SG)`** แม่งเป็นคนความจำดี (Stateful) ถ้ายามอนุญาตให้เจาะไข่แดงเข้ามา (SSH Inbound = Allow) แม้ลูกบิดขาออกมันจะหุบอยู่ ยามก็จะ **"แอบขยิบตาดึงจดหมายตอบกลับ (Outbound) ให้สอดลอดใต้ดากพรมคลานออกประตูไปได้อัตโนมัติ"** เสมอ!! (ตึก SG รอดตาย!)
- ทริค 2: สันดานนรกของแทร่! จ่าบ้ากามหน้าปากซอยหมู่บ้าน **`Network ACL`** แม่งเป็นพวกสมองปลาทอง (Stateless) ความจำเสื่อม! แม้ขาเข้าจะเปิดโล่งให้พี่มืดเข้ามาได้ (Allow Inbound)... ถ้ามึงเสือกซ่าล็อกประตูปิดตายขาออก **"(Deny Outbound)"** กูบอกเลยจดหมายพี่มืดก็เอาฟาดหน้าชนกระจกพังกระจายขากลับออกไปไม่ได้โว้ยย!! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The network ACL needs to be modified to allow outbound traffic.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษรไม่เหลื่อมล้ำ! (ตามทริคข้างบนเป๊ะๆ) ปัญหาคอขวดมันกระจุกล็อคตายแหงกอยู่ตรงด่านตรวจสมองปลาทอง **`Network ACL`** ที่มึงดันไปขังสัตว์ติดหน้าต่าง "Deny all outbound" นั่นแหละฮะ!! มึงต้องแก้พินัยกรรมให้ NACL สั่งลบเครื่องหมายต๊ะกะบานกากบาททิ้ง แล้วอนุญาตปล่อยกระแสพยุงตอบกลับออกถนนใหญ่ไปซะ แค่นี้ก็รอดด่วนแล้ว!

❌ **[ผิด] Both the outbound security group and outbound network ACL need to be modified to allow outbound traffic.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงจะบ้าหรอฮะ!? ลูกรักยามอัจฉริยะ **`Security group`** มึงไม่ต้องไปแตะต้องขุดหลุมขาออก (Outbound) ศพล่อเป้าให้มันเลยโว้ยยย! เพราะมันฉลาดพอที่จะตบมือลอดถ่อส่งผ่านทางให้เองฟรีๆ แล้วตั้งแต่อนุญาตขาเข้า! มึงจะโชว์ขยันตั้งค่าซ้ำซอนไปหาพระแสงหอกหักอะไร!

❌ **[ผิด] The outbound security group needs to be modified to allow outbound traffic.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! บอดตาใสจับสลับคู่! หลงประเด็นหน้าตาเฉย! มึงจะงัดเครื่องมือแม่เหล็กไปซ่อมประตูรปภ. SG ที่มันไม่ได้เสีย... แต่เสือกปล่อยผ่านสังกะสีสนิมเขรอะตัวพ่อจ่าปลาทอง NACL ที่ด่านมันปิดทึบน่ากลัวอยู่หน้าตายิ้มเบิกบาน! เจริญพวง! ข้อมูลบล็อกระเบิดหน้ายับเยินฮะ 

❌ **[ผิด] No action needed. It can already be accessed from any IP address using SSH.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! ปากดีขี้ขลาดตาขาว! ทะนงแช่อ่างกระทะทองแดง "ไม่ต้องทำหอกอะไรเลย!" แล้วมึงคิดว่าจดหมายตอบกลับฮัลโหล (SSH response) มันจะลอดรูเข็มกระสุนผ่านประตูผีดิบ NACL ที่มึงล็อกแน่นกางมืออุดท่อว่า "Deny All ขาออก" ไปได้ยังไงฮะ!? แหกตาดูกฎตรรกะมันขัดกันฉิบหาย!

---
---

## 📌 คำถามที่ 35
**โจทย์:**
A research institute has developed simulation software that requires significant computational power. Currently, the software runs on a local server with limited resources, taking several hours to complete each simulation. The server has 32 virtual CPUs (vCPUs) and 256 GiB of memory. The institute plans to migrate the software to AWS. Their objective is to speed up the simulations by running them in parallel.

As a Solutions Architect, which solution will achieve this goal with the LEAST operational overhead?

**ตัวเลือก:**
- [ ] Consider using Amazon EC2 Spot Instances to run the simulations.
- [ ] Use Lambda functions to process simulation tasks in parallel.
- [ ] Run the simulations using AWS Fargate.
- [x] Utilize AWS Batch to manage the execution of the software.

---
### 🎯 โจทย์ต้องการอะไร?
ห้องแล็บซ่อนหมกของนักวิทยาศาสตร์จอมโหยหิว! สร้างแอปจำลองโลกผีดิบกินทรัพยากรระดับซูเปอร์ไซย่า... สเปคเดิมออฟฟิศคือ "ยืมคอมพ่อ 32 vCPUs กับยัดแรมโหดสัส 256 GiB..." ขนาดล่อของแรงขนาดเนี๊ยะ แม่งกระตุกตับแลบลากคอข้ามวันข้ามคืน (taking several hours)!
บอสสั่งกร้าว: **"กูทนรับกลิ่นสาบเต่าล้านปีไม่ไหวแล้ว ย้ายหนีมา AWS ซะ... แล้วจงสับกระดูกสับไส้ปลากระป๋อง ทวีคูณรันงานคำนวณถึกๆ นี่ 'เป็นปึกแผ่นแก๊งค์พันธมิตรพร้อมๆ กัน (running them in parallel)!!' รีดซูเปอร์สปีดยิบตาแบบไม่ต้องจ้างกรรมกรมานั่งคุมแผงเองด้วย (LEAST operational overhead)!!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! ทันทีทีเจอคำว่า **"ซอฟต์แวร์จำลองนรกแตก (Simulation software) + รันงานอ้วนช้างกระทืบโรงข้ามวันข้ามคืน (taking several hrs) + สับแยกส่วนทำโคลนนิ่งแกะกระจายทำงานควบขนานให้เร็วที่สุด (running in parallel)"** = แฟนพันธุ์แท้ตำนานคนเหล็กขี่รถถังคันเดียวของ AWS คือ **`AWS Batch`** เท่านั้นฮะ! (ท่อง 2 คำนี้แหวกม่านประเพณีได้ล้านเปอร์!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Utilize AWS Batch to manage the execution of the software.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกร่องลึก! คุณลุงซานตาครอส `AWS Batch` เกิดมาเกิดมาเพื่ออุ้มชูนักวิทยาศาสตร์โรคจิต! ส่งถุงขยะซ뮬เลชันอ้วนพียัดใส่ลิ้นชัก... มันจะไปเสกจินตนาการ คลอดโคลนนิ่งเหมาสัญญากว้านซื้อตึก EC2 หลายร้อยคัน แล้วหั่นงานเป็นชิ้นหมูสับแจกจ่ายเข้าปากลูกน้องให้ขย้ำพร้อมๆ กัน (รัน Parallel) ทะลวงกำแพงเสร็จไวขึ้นล้านเท่า! โดยแอดมินแค่นั่งตีพุงกินน้ำรอกะลามะพร้าวสบายใจเฉิบ! ตอบโจทย์ "Least operational overhead" เต็มแม็กซ์!

❌ **[ผิด] Use Lambda functions to process simulation tasks in parallel.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงตาปลาดุกหรอฮะ!? ลูกอมนินจา `AWS Lambda` อะ แม่งมีร่างกายแคระแกร็นบอบบาง! กฎหมายประหารชีวิตกำหนดว่า **"มึงห้ามอมลูกอมเสกหายตัวเกิน 15 นาทีเด็ดขาด!! (15 min maximum execution limit) ทะลุเกณฑ์กูเชือดทันที!"** แต่แมเนเจอร์มึงเพิ่งบอกปาวๆ ว่างานจำลองหอกนี้กระซวกแรงอืดกินเวลาถึง "หลายชั่วโมง (several hours)!" แค่นี้ตีนนินจาแลมด้าก็ย่อยสลายคอพับตายสวดอภิธรรมข้างส้วมแล้วฮะ!

❌ **[ผิด] Run the simulations using AWS Fargate.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะพี่เลี้ยงเด็ก `AWS Fargate` อะ มันกระโหลกกะลามากฮะ! มันถูกสาปให้เลี้ยงเด็กโง่ด้วยสเตียรอยด์กระจอกกากหมู (มีเพดานลิมิตเพดานบินต่ำมาก ไม่พอยัดไซส์โหด RAM 256GiB / 32 vCPU แบบที่โจทย์กระเหี้ยนกระหือรืออยากได้หรอก) และที่น่าสมเพชกว่าคือ... Fargate มันโง่เกินกว่าจะบริหารคิวงานแบ่งโควต้าซิมเมอเรชันขนานเป็นตับให้เป็นฝูงนกเป็ดน้ำเองได้ (No task orchestration) เสียสติฮะที่กาข้อนี้!

❌ **[ผิด] Consider using Amazon EC2 Spot Instances to run the simulations.**
- **ทำไมถึงผิด:** เอากาวปะกางเกงใน! ไอ้ของถูกราคาตก `Spot Instances` แม่งคือตั๋วเครื่องบิน Stand-by! ถ้าเจาะไข่รันข้ามวันข้ามคืน (several hours) อยู่ดีๆ เจ้าของใจดำมาตัดริบบิ้นกระตุกเสา 2 นาทีแย่งเครื่องกลับคืนกลางอากาศเตะมึงออกจากตึก (interruption) งานซิมมูเลชั่นบำบัดหัวใจที่มึงรันค้างไว้มาครึ่งคืนก็บรรลัยหน้าแหกยับร่วงตุ๊บเป็นผีตายโหงสิฮะฮัลโหลลล! หาความบรรลัยมาใส่ตัวแท้ๆ 

---
---

## 📌 คำถามที่ 36
**โจทย์:**
A company has 10 TB of infrequently accessed financial data files that would need to be stored in AWS. These data would be accessed infrequently during specific weeks when they are retrieved for auditing purposes. The retrieval time is not strict as long as it does not exceed 24 hours.

Which of the following would be a secure, durable, and cost-effective solution for this scenario?

**ตัวเลือก:**
- [x] Upload the data to S3 and set a lifecycle policy to transition data to Glacier after 0 days.
- [ ] Upload the data to Amazon FSx for Windows File Server using the Server Message Block (SMB) protocol.
- [ ] Upload the data to S3 then use a lifecycle policy to transfer data to S3 One Zone-IA.
- [ ] Upload the data to S3 then use a lifecycle policy to transfer data to S3-IA.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทหวงก้างหอบสมบัติพัสถานบัญชีเน่าๆ (financial data) ไซส์บิ๊กเบิ้ม **10 TB** ขนมาถมกองไว้ที่ AWS! 
กฎเหล็กชาวพุทธ:
1. ของเน่าพวกนี้... ชาตินึงจะมีออดิทหูหนวกแวะมาตรวจรื้อดูสักหน (infrequently accessed) 
2. เวลาบุกเบิกขุดซากศพ... ก็ขุดใจเย็นๆ **"ตราบใดที่ไม่เกิน 1 คืน (24 hours) กูก็ไม่ด่าพ่อหรอก!"**
คำถาม: งัดท่ายากคอมโบเทพอันไหนมาผสมสูตรยาประหยัดเงินในกระเป๋า (cost-effective) แบบจี่จี้จังไรที่สุด ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียชั้นบรรยากาศดาวศุกร์! เมื่อไหร่ก็ตามที่โจทย์อนุญาตให้มึงตีพุงนอนรอขุดศพสบายใจข้ามวันข้ามคืนปานสล๊อต **"เวลาขุดยืดกระเป๋าได้ข้ามวัน / รอได้นานๆ (doesn't exceed 24 hours)"** + พ่วงกับคำสปอยส์ **"ประหยัดยาจกสุดตีน (Cost-effective) + นานๆ ขุดที (infrequently)"** = มันจะโยนบัตรคิวเข้าห้องอภิปรายนรกภูมิชั้นโลงเย็นระดับประเทศสยาม **`S3 Glacier` (Flexible Retrieval)** ทันทีล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Upload the data to S3 and set a lifecycle policy to transition data to Glacier after 0 days.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร! พระเอกตีระฆังดังกังวาน! ลำเลียงศพ 10 TB ลากลงเหวป่าช้า `Amazon S3` กะละมังก่อน แล้วตั้งสายพานรูดม่านส่งตัวลูกเป็ดขี้เหร่สไลด์หนอนทะลวงลงนรกถ้ำน้ำแข็ง **`Glacier Flexible Retrieval`** โดยทันควัน (after 0 days) อุต๊ะ!! มันกินสเปคโดนเต็มๆ เพราะ Glacier คิดราคาโคตรถูกปานเปิบข้าวเปล่า! และยอมให้แกขุดศพออกมาได้ภายในเวลาเหี่ยวๆ ประมาณ 3-12 ชั่วโมง ชิวๆ (ไม่เกินโจทย์ 24 ชม แน่นอน!)

❌ **[ผิด] Upload the data to S3 then use a lifecycle policy to transfer data to S3-IA.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คุณป้าชั้นสอง `S3-IA` (Standard - Infrequent Access) แม่งก็เก็บของได้นาน... แต่มันเสือกแพงงงง! และรวดเร็วขุดจึกกระตุกฉับเดียวได้เบอร์เต็มวินาทีฉับพลัน (milliseconds retrieval) เกินความคาดหมายของโจทย์มว๊ากก!! ในเมื่อบอสโคตรชิวบอกว่า "กูบอสนอนรอได้ตั้ง 24 ชม." มึงจะยอมควักเศษสตางค์เจ็บตัวทุ่มทุ่มจ่ายช่างขุดไวไปทำหอกอะไรล่ะ!

❌ **[ผิด] Upload the data to S3 then use a lifecycle policy to transfer data to S3 One Zone-IA.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะลูกเมียน้อย `S3 One Zone-IA` แม่งคือตัวละครขี้กากจังไรแห่ง AWS! มันเก็บแพ็คกระเป๋าศพยัดลงตึกผีแคบๆ เพียงโซนเดียว (Single AZ)! ถ้าพายุเข้าตึกนั้นพัง ข้อมูลการเงินบอสของมึงก็ "สวดอภิธรรมปลิวหายไปกับสายลม (Not Durable/ ไม่ทนมือทนตีน)" สิฮะฮัลโหลลล! ซึ่งโจทย์มันประกาศกร้าวว่ากูชอบความอึกถึกเหนียวแน่นหนึบทนตายยากนะเว้ย!

❌ **[ผิด] Upload the data to Amazon FSx for Windows File Server...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้าน Windows โง่ๆ ตัวนี้ มันเป็นแค่รถเก็บขยะสำหรับวงการลูกข่างชาว `.NET / Windows` แบ่งปันข้อมูลหน้าโต๊ะทำงาน (Shared File System)! ขยะข้อมูล 10 TB ดองเค็มที่มึงเอามายัด... มันคงค่าเช่ายแพงหูฉี่สติแตก โนบราตกม้าตายไปตั้งแต่ด่านความงก (cost-effective) แล้วฮะ! 

---
---

## 📌 คำถามที่ 37
**โจทย์:**
A company plans to design a highly available architecture in AWS. They have two target groups with three EC2 instances each, which are added to an Application Load Balancer. In the security group of the EC2 instance, you have verified that port 80 for HTTP is allowed. However, the instances are still showing out of service from the load balancer.

What could be the root cause of this issue?

**ตัวเลือก:**
- [ ] The instances are using the wrong AMI.
- [ ] The wrong subnet was used in your VPC.
- [x] The health check configuration is not properly defined.
- [ ] The wrong instance type was used for the EC2 instance.

---
### 🎯 โจทย์ต้องการอะไร?
พี่บิ๊กวางป้อมค่ายจัดตึก `Application Load Balancer (ALB)` เตรียมจ่ายบัตรคิวลูกจ๊อกตึก `EC2` กองพะเนินยัดลงกล่อง
ตรวจสอบความเรียบร้อยรอบค่าย: ยามหน้าประตู (Security Group) ชูสองนิ้วร้องเพลงบอกว่า **"ปอร์ตเวทย์มนต์หมายเลข 80 (HTTP) โดนปลดล็อกดึงสลักเรียบร้อยแล้วบอส! ให้เสียวลอดเข้าไขกระดูกได้เลย!"**
ดราม่าปะทุ: เสือกเกิดอาเพศบ้าบอ... หน้าจอคอมด่าพ่อเปรี้ยง! เห้ย! ทำไมลูกรัก EC2 พวกนี้ **"กูเช็คหน้าสมุดจดบอกว่ามันลาป่วยขาดสอบตาเหลือกทุกใบเลยวะ! (showing out of service / Unhealthy)"** ห่าเอ๊ยเกิดอะไรขึ้นวะเนี่ย??

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าปัญหาหมวดด่าทอแอบแฝง **"เปิดรูรับทะลวง SG เจาะตีนปอร์ต 80 อ้าซ่า 100% แล้ว แต่ ALB ก็ยังแสร้งตาเหลือกด่าโวยวายว่า EC2 กูไม่ฟื้นคืนชีพ ตายห่า (Out of service)!"**
- เหตุผลตัวแม่อันดับหนึ่งคือ: มึงไม่ได้ทำบุญปัดรังควาน **"โปรแกรมสวดมนต์หน้าจอก่อนฉีดยาเข็ม (Health Check Configuration)"** ขุดท่อไว้ไงฮะ! หมอหน้าโหลดบาลานซ์ (ALB) มันส่งคลื่นสัญญาณชีพไปเจาะหน้ากระจก EC2 โหลดไฟล์ HTML ไม่เข้าเป้า... มันเลยประจานด่ามึงยับเยิน! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The health check configuration is not properly defined.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตราบใดที่กติกาเข็มทิศรหัสลับบอกว่ารปภ. (Security Group) ไร้มลทิน! แปลว่าลูกศนูสะบัดวิ่งตรงจากหนังสติ๊ก ALB อัดผางเข้าหน้าหน้าผาก EC2 แน่นอน... แต่กะเทย EC2 ดันเล่นตัว ไม่ยอมสะบัดผ้าสะกิดคลื่นส่งกลับไปบอก "กูยังมีชีวิตอยู่สบายดี (HTTP 200 OK) ตามเป้าหมายเส้นทาง URL Ping Path" มันก็เลยโดนปรับตกตาเหลือก "Unhealthy / Out of service" ห้อยหัวต่องแต่งนั่นเอง (ต้องกลับไปซ่อมที่หน้าต่าง Target Group Health check)

❌ **[ผิด] The wrong subnet was used in your VPC**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คนละทิศละทางฮะกูยอม! ถ้ามึงเอาขมิ้นฝังดินวางตึกในรั้วหมู่บ้านลูกเมียน้อย (ผิดท่อผูก Subnet) ตั้งแต่เริ่มแรก... มึง **"สวดอภิธรรมโอนกรรมสิทธิ์เครื่องเข้าไปจับยัดใส่ Target Group สมัครเรียน Load Balancer ไม่เข้าด้วยซ้ำโว้ยย!! (Load balancer จะด่าหน้าแตกแต่แรกกึ่งวินาที)"** มันจะไม่มีโอกาสมาถึงอีเวนท์ตอนจบที่ยามพยักหน้าตรวจ SG เสร็จหลอกฮะ! 

❌ **[ผิด] The instances are using the wrong AMI. / The wrong instance type was used for the EC2 instance.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! มั่วตั้วระดับอนุบาลเห็บหมา! พี่หมอ `Application Load Balancer` แม่งเป็นพวกกระจอกไม่เลือกหน้าต่างปลาดุกฮะ! จะมึงเสี้ยนยัดหน้าต่างเป็นไก่อมตะ Linux 16 บิทกะโหลกกะลา (wrong AMI) หรือจะใช้คอมกากไซส์จิ๋วยอดฝีปะทุอย่าง t2.nano หน้าโง่ (wrong instance type)... พี่หมอมันก็โยนบัตรคิวให้มึงรับแขกหน้าตาเฉยฮะ! **ตราบใดที่มึงยังมีหน้าอกเด้งๆ ตอบปิงกลับไปหา Health Check ของมันได้... มันก็ไม่สนชาติตระกูลมึงหรอกเว้ย!** พังยับ!

---
---

## 📌 คำถามที่ 38
**โจทย์:**
A news company is planning to use a Hardware Security Module (CloudHSM) in AWS for secure key storage of their web applications. You have launched the CloudHSM cluster but after just a few hours, a support staff mistakenly attempted to log in as the administrator three times using an invalid password in the Hardware Security Module. This has caused the HSM to be zeroized, which means that the encryption keys on it have been wiped. Unfortunately, you did not have a copy of the keys stored anywhere else.

How can you obtain a new copy of the keys that you have stored on Hardware Security Module?

**ตัวเลือก:**
- [ ] Use the Amazon CLI to get a copy of the keys.
- [ ] Contact AWS Support and they will provide you a copy of the keys.
- [ ] Restore a snapshot of the Hardware Security Module.
- [x] The keys are lost permanently if you did not have a copy.

---
### 🎯 โจทย์ต้องการอะไร?
มีพนักงานสติแตกกากหมา ลืมรหัสผ่านตู้เซฟปืนแตก **`CloudHSM (ตู้เหล็กเก็บกุญแจเข้ารหัสซูเปอร์พรีเมียม)`**
กรรมตามสนอง: ไอ้พนักงานหน้ามืด **"งัดกุญแจใส่รหัสผิดรัวๆ 3 ครั้งซ้อนเป็นท่อนไม้!"**
ความฉิบหายบังเกิด: ตู้ประทัด HSM ทำหน้าบูด เปิดระบบตระกรุดระเบิดกัมมันตภาพรังสีล้างเผ่าพันธุ์ศพ **"Zeroized เด็ดชีพกุญแจในครรภ์มันให้หายเรียบเกลี้ยงเป็นอากาศธาตุวิปโยค!"** (ระบบ Security ป้องกันโจรงัดล้วงตับ)
แถมนายหัวเพิ่งเช็คซองผ้าป่าพบว่า **"ไอ้เวรกรรม กูไม่เคยถ่ายเอกสารก๊อปปี้ชุบแป้งทอด (no copy) กุญแจดอกนั้นไว้เลยสักแอะ!!"**
คำถาม: ท่ายากสับขาหลอกอันไหน... ที่จะอัญเชิญดวงวิญญาณกุญแจดอกเดิมกลับลงมาเกิดได้ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหักระดับคอขาดบาดตาย! จำขึ้นใจ... บริการหน้ากากเหล็กตาบอดที่ชื่อ **`AWS CloudHSM` คือตู้เซฟส่วนบุคคลแบบ 100% "AWS ไม่สามารถ, ไม่รับรู้, และไม่มีสิทธิ์สแกนกุญแจในกระเป๋ากางเกงมึงได้เลยแม้แต่เสี้ยวมิลลิวินาทีเดียว!!"**
- กฎแห่งความตาย: ถ้าเจอกลไกชุบชีวิตตู้ระเบิด Zeroize ล้างบางทำลายล้างไส้พุงจนแตกดับ... และเสือกมึงไม่ได้เก็บแบคอัพรูปถ่ายล่วงหน้าเอาไว้... กุญแจดอกนั้นคือ **"ล่องจุ๊นอวสานชีวิตตายเกลี้ยงถาวร (LOST PERMANENTLY)!!"** ร้องไห้ขี้มูกโป่งไปทำศพใหม่สถานเดียวฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] The keys are lost permanently if you did not have a copy.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! บอดตาแตกกระจุยกระจาย! ร้องให้หนักมากน้ำตาเปียกตีน! ตามที่เล่าไว้ล้านเปอร์เซ็นต์... ลิเกจบโรงแล้วฮะหนุ่ม พระพุทธเจ้าหน้าไหนในสามโลกก็งัดเอากุญแจดอกสำคัญนี้กลับมาให้มึงไม่ได้อีกต่อไปตลอดกาล!! หายสาบสูญกลายเป็นเถ้าถ่านฟริ้ง! 

❌ **[ผิด] Contact AWS Support and they will provide you a copy of the keys.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงตาปลาดุกหรอฮะ!? มึงคิดว่า AWS แม่งแอบส่องกล้องวงจรปิดลอกลายเซ็นกุญแจมึงหรอ! บริการ CloudHSM แม่งคือบริการสำหรับลูกค้ารุ่นโอนเอนไข่แข็ง (Dedicated Hardware) "AWS เขาหน้าดันทุรังตาบอด! เขาเข้าไม่ถึงสิทธิ์กุญแจมึง!" ไปก้มกราบลูกพี่หน้าแชทซัพพอร์ตให้ไขขี้เลื่อยออก ก็ได้แต่เสียงหัวเราะหัวขวดตอกหน้าฮะ! 

❌ **[ผิด] Restore a snapshot of the Hardware Security Module.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ตรรกะวิบัติย้อนแย้งกะลาแตก! ในโจทย์เจ้านายเพิ่งตบกบาลมึงด่าว่า **"มึงไม่ได้ถ่ายเอกสารสำเนา (did not have a copy / No backup snapshots) ไว้เลยโว้ยย!!"** มึงจะเอาผีเร่ร่อนที่ไหนไปกดปุ่ม Restore รูปถ่ายที่มึงไม่ได้ปั้นไว้บ้าบอคอแตกอะไรหละหอยหลอด!? บอดตาใสจับสลับคู่! 

❌ **[ผิด] Use the Amazon CLI to get a copy of the keys.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ในเมื่อของมันโดนล้างบางสวดอภิธรรมไปจากไขสันหลังเครื่องแล้ว มึงจะทะลึ่งพิมพ์แฮก Command-Line กระซวกเจาะเอาอะไรออกมาได้อีกละวะฮะ รกสมองจริงๆ!

---
---

## 📌 คำถามที่ 39
**โจทย์:**
A web application is hosted on an EC2 instance that processes sensitive financial information. The EC2 instance is launched in a private subnet, and all data is stored in an Amazon S3 bucket. Users access financial information over the Internet through pre-signed URLs generated by the web application. The company's security team is concerned that internet connectivity to Amazon S3 poses a security risk.

In this scenario, what will you do to resolve this security vulnerability in the most cost-effective manner?

**ตัวเลือก:**
- [ ] Change the web architecture to access the financial data in S3 through an interface VPC endpoint, which is powered by AWS PrivateLink.
- [ ] Change the web architecture to access the financial data hosted in your S3 bucket by creating a custom VPC endpoint service.
- [x] Change the web architecture to access the financial data through a Gateway VPC Endpoint.
- [ ] Change the web architecture to access the financial data in your S3 bucket through a VPN connection.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบที่ถูกขังลืมในคุกมืด `private subnet` บ้าบิ่นหน้าตาเฉย **เอาไฟฉายส่องขอของบริจาคไฟล์ข้อมูลบัญชีรวยๆ ไปเก็บไว้ในตุ่มน้ำดิบ `Amazon S3`** 
ตำรวจตระเวนชายแดนสติแตก: **"บ้าน่า! มึงดึงข้อสอบบัญชีรวยๆ เหล่านี้ผ่าน 'ท่ออินเทอร์เน็ตสาธารณะ (Internet gateway/NAT)' อกแตกตายเดี๋ยวโจรสลัดก็แฮกล้วงตับฟรีๆ หรอก!!"** 
บอสสั่งกร้าว: "จงปั้นรูหนอนที่มุดลอดอุโมงค์ใต้ดิน (หนีถนนปราบโจร Internet) เสียบตูดเข้า S3 ให้กูที... และขอย้ำอักษรศีลธรรม **'เกลียดการจ่ายเงิน ประหยัดสุดขูดรัดเข็มขัดที่สุด (most cost-effective) ด้วยนะเว้ย!'**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! (โจทย์ข้อนี้ก๊อปเดจาวูไอเดียเดียวกับข้อ 20 มาแดกฟรีอีกแล้วฮะ) 
- ถ้าให้มุดท่อความมืดลอดใต้ดินเพื่อคุยกับพระเจ้า `Amazon S3` = คำตอบตั้งต้นคือทำวิชา **`VPC Endpoint`**
- สยองพองขน! เจ้านายสั่งหาโหมด **รัดเข็มขัดกระเป๋าฉีก (most cost-effective)** = ต้องเลือกซื้อตั๋วท่ออุโมงค์แบบ **`Gateway VPC Endpoint`** เพราะท่อเหวนี้แม่ง **"แจกฟรีให้ชาวบ้านมุดฟรี 0 บาทถ้วน (No hourly or data processing charges)!!"**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Change the web architecture to access the financial data through a Gateway VPC Endpoint.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร! พระเอกทรงพลังที่สุดแบบแจกคะแนนฟรี! มึงปูกระเบื้องขุดตอหม้อ **`Gateway VPC Endpoint`** ไว้ในห้องเครื่อง (Subnet Route Table) เลย... พอ EC2 อยากดมข้อมูล S3 มันก็มุดเหวลอดรูพ่นออกปุ๊บหน้าตู้เซฟ S3 โดยไม่โผล่หัวแตะสายเน็ตเวิร์กถนนหลวงให้อับอตายร้อยล้านเปอร์เซ็นต์ (ปลอดภัยสุดยอด)! และที่บอสยิ้มแฉ่งปริ่มคือ... **มุดรูนี้มันของแจกฟรีไม่เสียตัง!** ประหยัดงบที่สุดสมใจอยากเป๊ะ!

❌ **[ผิด] Change the web architecture to access the financial data in S3 through an interface VPC endpoint...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! คุณจ๊อกทหารเลว `Interface VPC Endpoint` มุดรูทะลวงไข่ใต้ดินได้จริงฮะ! แต่มึงดันเป็นลูกกระจี๊กหน้าเงิน! มึงเก็บส่วยบี้ไถเงินค่าเช่าท่อเป็น "รายชั่วโมง และ ค่าโอนถ่ายข้อมูล GB ละบาทหน้าเตา" (Hourly + Data processing charge) โดนบอสแหกอกตบคว่ำสิฮะโจทย์มันร้องขอท่า "Cost-effective" มึงจะเปย์ของแพงทำพระไตรปิฎกอะไร! หลอกดาวจัดๆ

❌ **[ผิด] Change the web architecture to access the financial data hosted in your S3 bucket by creating a custom VPC endpoint service.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! มึงทะลึ่งจะเอาบริษัทมึงก่อร่างสร้างตัวเป็น **"VPC Endpoint Service มหาอำนาจ (ตั้งตัวเองเป็นเจ้าพ่อ PrivateLink ขายของให้เพื่อนบ้านลูกค้ารายอื่นมุดท่อ)"** บ้าบอคอแตกอะไรล่ะฮะ!? โจทย์เขาแค่เป็นเหยียบอยากมุดรูหนอนไปโหลดรูป S3 ธรรมดาๆ! ไม่ได้อยากตั้งตัวเสี่ยขายซอฟต์แวร์บริการโว้ยยย ลากไถลไปดาวพุธเลยฮะ!

❌ **[ผิด] Change the web architecture to access the financial data in your S3 bucket through a VPN connection.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านหมอดูตาทิพย์ `VPN Connection` มันขึงสะพานเวทมนตร์ก็จริง... แต่มันก็ยังต้องบากร่อง "ว่ายน้ำแหวกแหกกางเกงกลางถนนอินเทอร์เน็ตหลวง (Public Internet)" อยู่ดีฮะ! แถมตุ่มน้ำ S3 มันอยู่ในบ้าน AWS เครือข่ายเดียวกัน... มึงจะต้องลงทุนหน้าสิวหน้าขวานออกถนนใหญ่ขุด VPN ขากลับเข้าบ้านตัวเองทำด๋อยอะไรฮะ ตรรกะบอดสนิท! 

---
---

## 📌 คำถามที่ 40
**โจทย์:**
A company has multiple research departments that have deployed several resources to the AWS cloud. Each department is free to provision resources as needed. To ensure normal operations, the company wants to track its AWS resource usage so that it does not reach the AWS service quotas unexpectedly.

Which combination of actions should the Solutions Architect implement to meet the company requirements? (Select TWO.)

**ตัวเลือก:**
- [ ] Query the AWS Trusted Advisor Service Limits check every 24 hours by calling the DescribeTrustedAdvisorChecks API operation. Ensure that your AWS account has a Developer support plan.
- [ ] Utilize the AWS managed rule on AWS Config to monitor AWS resource service quotas. Schedule this checking using an AWS Lambda function.
- [x] Capture the events using Amazon EventBridge (Amazon CloudWatch Events) and use an Amazon Simple Notification Service (Amazon SNS) topic as the target for notifications.
- [ ] Create an Amazon Simple Notification Service (Amazon SNS) topic and configure it as a target for notifications.
- [x] Write an AWS Lambda function that refreshes the AWS Trusted Advisor Service Limits checks and set it to run every 24 hours.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทมีทีมนักวิจัยเยอะแยะ มือคันยิกๆ ต่างคนต่างดึงต่างสร้างของเล่นรันกระจัดกระจายเกลื่อนป่า AWS ตลอดเวลา
ปัญหาคอขวดนรก: "ตายโหง!! เพดานจ่าฝูงโควต้า (AWS service quotas / limits) ของบัญชีเราแม่งจะทะลุกระจุยกระจายชนเพดานเมื่อไหร่บ้างกูไม่รู้เลย!" 
บอสสั่งกร้าว: "จงสร้างเครื่องมือตรวจจับสัญญาณชีพสอดแนม (monitor AWS resource usage)... และยิงปืนพลุบ้องไฟแจ้งเตือนก่อนที่โควต้าบริษัทกูจะบรรลัยแตกตื่น (does not reach service quotas)!!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดบนหน้าตำราสวดมนต์ Solutions Architect! การมอนิเตอร์ "โควต้าขีดจำกัดหน้าหีบ (Service Quotas/Limits)" ในจักรวาล AWS แชมป์เก่าหน้าเดิมเพียงคนเดียวที่ทำสถิติจดเพดานกุญแจทุกอย่างก็คือลุงซานตาคลอส **`AWS Trusted Advisor`**!
- ท่าแพทเทิร์นอมตะ (AWS Official Pattern): 
   1. เลี้ยงนินจา **`AWS Lambda`** ให้ตื่นมาแหกขี้ตาหมุนกงล้อดึงข้อมูล Refresh เซ็นเซอร์กงจักร Trusted Advisor Checks วันละ 1 หน (รัน Every 24 hours)
   2. ใช้หูทิพย์ **`Amazon EventBridge`** (CloudWatch Events) แอบดักฟังลมหายใจสะดุ้ง "เห้ย! เกินโควต้าอะเลิร์ตว้อย!" -> เลี้ยวแฉลบยิงพลุให้ชะนี **`Amazon SNS`** กระจายอีเมลบ่นเจ้านายหน้าตาเฉย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Write an AWS Lambda function that refreshes the AWS Trusted Advisor Service Limits checks... / Capture the events using Amazon EventBridge... and use an Amazon SNS...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! มิกซ์แอนด์แมทช์สมบูรณ์แบบแจกคะแนนฟรี! (ตามแพทเทิร์นเทพเป๊ะทุกกระเบียดนิ้ว)
ช้อยส์ 1: คุณลุง Trusted Advisor คอยเก็บข้อมูลแต้มโควต้า (Service limits) แต่แกขี้เกียจตื่น เราก็ต้องเอานินจา `Lambda` วางยาปลุกให้สะดุ้งทุกๆ 24 ชม เพื่อรีเฟรชข้อมูลที่ดองเค็มให้สดใหม่
ช้อยส์ 2: พอตาซานต้าอืดอาดพ่นป้ายแต้มมา... `EventBridge` ก็ช้อนรับกระจับจังหวะสั่นสะเทือน แล้วส่งโทรโข่ง `SNS` เมลแหกปากด่าหน้าบอสได้หล่อๆ ชิวๆ ครบวงจรจบทุกตึก! 

❌ **[ผิด] Create an Amazon Simple Notification Service (Amazon SNS) topic and configure it as a target for notifications.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงตาปลาดุกหรอฮะ!? ช้อยส์นี้มันก็คือ "เสี้ยวหางตาปิติ (ครึ่งซีก)" ของท่าถูกอีกช้อยส์นึงไงหละโว้ย! แต่เสือกขี้เกียจพูดให้ครบว่าเอา SNS ไปดักฟังคู่หูมาจากใคร (อ้าว แม่งตั้งลอยๆ บ้าบอ ไม่บอกว่าจะรับพัสดุมาจากไหน EventBridge หรือยังไง??) มันก็เลยเป็นกระบวนท่ากากหมูทิ่มตากันเองเปล่าๆ ฮะ! ผิดไวยากรณ์

❌ **[ผิด] Utilize the AWS managed rule on AWS Config to monitor AWS resource service quotas...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยฮะ! ลุงนักสืบตาทิพย์ `AWS Config` มันเก่งเรื่องจดบันทึกไดอารี่แอบดูความผิดชาวบ้าน (Compliance Check/Resource inventory) โว้ยย!! มัน **"ไม่มีเข็มทิศเวทมนตร์ไปแหกตาส่องเพดานกะโหลกโควต้าลิมิตบริษัท (Service quotas)"** แบบลุง Trusted Advisor บ้าบอคอแตกอะไรทั้งนั้น! หลอกดาวจัดๆ!

❌ **[ผิด] Query the AWS Trusted Advisor Service Limits check every 24 hours by calling the DescribeTrustedAdvisorChecks API operation. Ensure that your AWS account has a Developer support plan.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! บิดเบือนความจริงสุดส้นตีนฮะ!
1. คำสั่ง `DescribeTrustedAdvisorChecks` มันคือการขุดหลุมหลุยส์ขอดูแค่ "ชื่อเช็ค" (มีชื่อเรื่องอะไรให้กูตรวจบ้าง)... มันไม่ได้แหกหน้าอกล้วงไส้ขอดู "แต้มลิมิตด่าทอแบบดิบๆ (Limit detail data)" โว้ย!! (มึงต้องใช้ DescribeTrustedAdvisorCheckResult ต่างหาก!)
2. ไอ้แต้มโควต้าลุงซานต้าแบบทะลวงลึกเนี่ยะ... **AWS มันงก หน้าหมาสงวนสิทธิ์ให้แค่บรรดาเศรษฐีเช่าตึกหน้าเหลี่ยมแพลน `Business หรือ Enterprise Support` เท่านั้นที่ตักกินฟรีได้ฮะ!!** พวกบัตรยาจกตระกูล `Developer support plan` หมดสิทธิ์เลียหน้าปัด API ตัวนี้เด็ดขาดฮะ กฎหมายตายตัว!!

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 5: ข้อ 41 - 50)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 41
**โจทย์:**
A wearable device generates over 1 MB of health data and sends it to Amazon S3 daily. A healthcare company is looking for a solution to summarize this data efficiently in a fast and cost-effective manner. The processing must use Python and be completed in 10 seconds. Moreover, the solution should have minimal infrastructure to manage.

Which is the most suitable architecture for this requirement?

**ตัวเลือก:**
- [x] Use AWS Lambda with a Python library for processing.
- [ ] Create an AWS Glue PySpark job to process the data.
- [ ] Use Amazon Data Firehose to send the data from the device to Amazon S3. Process the data on an EC2 instance with at least 512 MB of memory.
- [ ] Store the data in Amazon Redshift and process it with AWS Lambda.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทโรงพยาบาลมีของเล่นสายรัดข้อมือไฮเทค พ่นข้อมูลสุขภาพเศษขยะจุ๋มจิ๋ม **แค่ 1 MB ต่อวัน** โยนเข้าโกดัง `Amazon S3`
ความต้องการพิลึกพิลั่น: **"กูอยากย่อยสรุปผลไฟล์ขยะ 1 MB นี้แบบสายฟ้าฟาดให้เสร็จภายใน 10 วินาที... รันด้วยภาษางู (Python) ถนัดมือ... และขอแบบชิวๆ ประหยัดตังค์ (cost-effective) ไม่ต้องจ้างยามมาเฝ้าเซิร์ฟเวอร์ (minimal infrastructure)!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! ทันทีทีเจอคำร้องขอ **"รันสคริปต์สั้นๆ ทำงานไวๆ (10 วินาที) + งานกระจอกเบาหวิว (data 1 MB) + ไม่ต้องบริหารจัดการเซิร์ฟเวอร์ (minimal infrastructure/serverless) + รองรับ Python"** = หลับตากาหน้ากากนินจา **`AWS Lambda`** ได้เลยล้านเปอร์เซ็นต์! แม่งเกิดมาเพื่อรับจ๊อบเศษเหล็กแบบนี้โดยเฉพาะฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Lambda with a Python library for processing.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! มิกซ์แอนด์แมทช์สมบูรณ์แบบแจกคะแนนฟรี! นินจา `AWS Lambda` ลูกเบาหวิวตัวนี้แหละที่รองรับงูเหลือม (Python) 100% แถมเกิดมาเพื่อไร้สังกัด (serverless = minimal infrastructure) ประหยัดสุดยอดเพราะคิดตังค์เป็นเสี้ยววินาที... มึงมารันงานขยะ 1 MB จบใน 10 วิเนี่ย แทบจะรันฟรีตลอดชาติเลยฮะ สมใจเจ้านายเป๊ะ!

❌ **[ผิด] Create an AWS Glue PySpark job to process the data.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงเอาค้อนธอร์ (AWS Glue) มาตอกตะปูแขวนรูปใบเดียวหรอฮะ!? ลูกข่างเวทมนตร์ Glue มันรันงูเหลือมได้ (PySpark)... แต่มันออกแบบมาสับช้างกระทืบโรง Big Data โคตรใหญ่โว้ยย!! ถ้ามึงเอามาเปิดสับของเล่นชิ้นจิ๋ว 1 MB แม่งจะโดน "ชาร์จขั้นต่ำบังคับรีดไถค่าเปิดเครื่องเลย 1 นาทีเต็มๆ" (Minimum billing duration) ทั้งที่มึงรันแค่ 10 วิ... โคตรสิ้นเปลือง (not cost-effective) ฮะบอสต่อยหน้าหงาย!

❌ **[ผิด] Use Amazon Data Firehose to send the data from the device to Amazon S3. Process the data on an EC2 instance...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ลูกเมียน้อย `EC2 instance` แม่งคือตึกกระโหลกกะลาที่ **"มึงต้องมานั่งลง OS เอง อัปแพทช์เอง ป้องกันไวรัสเอง (High infrastructure management)!"** ซึ่งมันละเมิดกฎเหล็กของโจทย์ที่ร้องขอ "minimal infrastructure" ฉิบหายวายป่วงฮะ รุงรังชีวิตเปล่าๆ!

❌ **[ผิด] Store the data in Amazon Redshift and process it with AWS Lambda.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! มึงบ้าหรอฮะ!? โกดังแช่แข็งยักษ์ `Amazon Redshift` (Data Warehouse) แม่งมีไว้ให้พวกมหาเศรษฐียัดข้อมูลยักษ์ระดับ PetaByte! ทะลึ่งเช่าตึกระฟ้าบ้าบอมาเก็บฝุ่นข้อมูลจิ๋มมด 1 MB มึงเอาสมองส่วนไหนคิดฮะ ค่าเช่าแพงบรรลัยตายสวดอภิธรรม!

---
---

## 📌 คำถามที่ 42
**โจทย์:**
A top IT Consultancy has a VPC with two On-Demand EC2 instances with Elastic IP addresses. You were notified that the EC2 instances are currently under SSH brute force attacks over the Internet. The IT Security team has identified the IP addresses where these attacks originated. You have to immediately implement a temporary fix to stop these attacks while the team is setting up AWS WAF, GuardDuty, and AWS Shield Advanced to permanently fix the security vulnerability.

Which of the following provides the quickest way to stop the attacks to the instances?

**ตัวเลือก:**
- [x] Block the IP addresses in the Network Access Control List
- [ ] Place the EC2 instances into private subnets
- [ ] Assign a static Anycast IP address to each EC2 instance
- [ ] Remove the Internet Gateway from the VPC

---
### 🎯 โจทย์ต้องการอะไร?
ตึกเช่ากระโหลกกะลา `EC2` เปิดหน้าต่างแสกหน้าโชว์หราอยู่บนโลกออนไลน์ (Public IP) 
ดราม่าบังเกิด: กองทัพโจรสลัดไซเบอร์กำลังรุมปาหินเจาะไข่แดง **"กระหน่ำเจาะหน้าส้วม SSH Brute Force Attacks อย่างเมามัน!"** 
จุดได้เปรียบเดียวที่มึงมีคือ: หน่วยข่าวกรอง รปภ. แม่ง "สืบได้หมายเลขบัตรประชาชน (IP addresses) ของไอ้พวกโจรห้าร้อยนี่มาครบหมดแล้วเรียบร้อย!"
บอสสั่งกร้าว: **"กูขอท่าปราบผี 'เหยียบเบรกหัวทิ่ม (quickest way)' เพื่อแช่แข็งไอ้พวกโจร IP ที่รู้หน้าค่าตานี้เดี๋ยวนี้!! ระหว่างรอพวกวิศวกรตัวประกอบมันไปลากกำแพงเมืองจีนมาซ่อมทีหลัง!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! เมื่อไหร่ก็ตามที่โจทย์สั่ง **"สาดน้ำมนต์บล็อกการโจมตีจากไอ้หัวขวด IP เฉพาะเจาะจงที่เรารู้ตัวมันแล้ว (Deny specific IP addresses) แบบไวแสงกระสุนพุ่งปรี๊ด"**
- คาถาไม้ตายแห่งชาติที่บล็อกคนเลวได้คือ **`Network Access Control List (NACL)`** เท่านั้นฮะ! เพราะ NACL มีอำนาจสูงสุดในกระทรวงเวทมนต์หยิบสลักประทับตรา `Deny` สาปแช่ง IP คนชั่วได้รายคน... แตกต่างจาก รปภ. SG (Security Group) ที่โลกสวยทำตัวเป็นผ้าขาวบาง อนุญาตให้แต่คนดีเข้า (Allow only) แต่ไม่ยอมบล็อกด่าสาปแช่งคนเหี้ยเป็นการส่วนตัวฮะ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Block the IP addresses in the Network Access Control List**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร! พระเอกตีระฆังดังกังวาน! ตามทริคข้างบนฮะ... ทันทีที่มึงรู้ IP ของหมาบ้า มึงก็แค่เขียนกฎประทับตราใส่หน้าแผง `NACL` ว่า "ไอ้ 187.X.X.X กู Deny หัวมึง!" เพียงแค่นี้กำแพงกิเลสหน้าหมู่บ้านแม่งก็จะกระแทกหน้าโจรปลิวไปเองโดยอัตโนมัติ ภารกิจปราบผีชั่วคราวฉับไวสำเร็จ 100%!

❌ **[ผิด] Place the EC2 instances into private subnets / Remove the Internet Gateway from the VPC**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? การกระชากตึกไปหมกไว้ในหลุมมืด (Private Subnet) หรือระเบิดสะพานหลวงทิ้ง (Remove IGW)... แม่งจะทำให้อินเทอร์เน็ตพินาศขาดสะบั้น! แอปมึงก็ล็อกดาวน์ตายโหง ลูกค้าตัวจริงหน้าไหนก็เข้าแอปมึงไม่ได้เลยสิวะฮะ! แก้ปัญหาแบบหน้ามืดฆ่าตัวตายชัดๆ บัดซบ!

❌ **[ผิด] Assign a static Anycast IP address to each EC2 instance**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! วิชาเปลี่ยนป้ายทะเบียน `Anycast IP address` แม่งเป็นอาวุธสงครามของ AWS Global Accelerator สำหรับกระจายตึกรับแขกให้วิ่งเร็วๆ โว้ย! มันไม่ได้มีโล่กัปตันอเมริกามากันกระสุนแบล็คลิสต์โจร SSH โง่ๆ แบบนี้บ้าบอคอแตกอะไรทั้งนั้น! มั่วซั่วผิดประเด็นยับเยิน! 

---
---

## 📌 คำถามที่ 43
**โจทย์:**
A Solutions Architect is migrating several Windows-based applications to AWS that require a scalable file system storage for high-performance computing (HPC). The storage service must have full support for the SMB protocol and Windows NTFS, Active Directory (AD) integration, and Distributed File System (DFS).

Which of the following is the MOST suitable storage service that the Architect should use to fulfill this scenario?

**ตัวเลือก:**
- [x] Amazon FSx for Windows File Server
- [ ] Amazon S3 Glacier Deep Archive
- [ ] Amazon FSx for Lustre
- [ ] AWS DataSync

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบจะขนกองบรรณาการแอปเก่าๆ **`Windows-based applications`** ย้ายบ้านขึ้นสวรรค์ AWS 
และพวกมันเรียกร้องหาถังขยะส่วนร่วมนิสัยเสีย: กูอยากได้บริการเก็บไฟล์แชร์ (file system storage) ที่รองรับชาวบ้าน Windows ถอดด้ามแบบ 100% เท่านั้น...
คีย์เวิร์ดหน้าส้วม: **"ต้องรองรับรูเสียบ `SMB protocol`, รองรับกติกาเมียหลวง `Windows NTFS`, ผูกแขนแต่งงานกับบัตรนายจ้าง `Active Directory (AD)` และยืมตังค์ `Distributed File System (DFS)` ได้!!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดบนหน้าตำราสวดมนต์ Solutions Architect! เมื่อไหร่ก็ตามที่โจทย์พ่นภาษาต่างดาว **"Windows ล้วนๆ, SMB, NTFS, AD (Active Directory), DFS"** กองขยะเหล่านี้มันคือรากมะม่วงบรรพบุรุษของซอฟต์แวร์ฝั่ง Windows ทั้งกะบิ! 
- ดังนั้นเทพเจ้ากล่องไฟล์แชร์ที่เสิร์ฟสนองนี๊ดไมโครซอฟท์ตัวพ่อที่สุดใน 3 โลกก็คือ **`Amazon FSx for Windows File Server`** ลุงตู่ยืนหนึ่งไร้เทียมทาน! ท่องแล้วกาได้ล้านเปอร์เซ็นต์!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon FSx for Windows File Server**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกร่องลึก! ตามสูตรรักทริคข้างบน (สมบูรณ์แบบไม่ขัดเจตนา) ลูกพี่ `FSx for Windows` สร้างมาเพื่อสถิตเป็นพระบิดาของตระกูล Windows ในโลก AWS ทุกการเซ่นไหว้ SMB, NTFS, หรือ AD มันตอบสนองได้เสมือนยกเครื่องมาจากออฟฟิศนายจ้าง 100% รัวๆ! แจกแต้มอนุบาล!

❌ **[ผิด] Amazon FSx for Lustre**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คุณน้อง `FSx for Lustre` แม่งหน้าตาคล้ายกัน แต่มันแอบแต่งตัวเป็นซามูไรปราบเซียนสายมืด! มันคบหาแต่โปรแกรมประมวลผลบ้าพลังตระกูล Linux, Machine Learning, หรือซุปเปอร์คอมพิวเตอร์ (HPC) หนักๆ โว้ยย! มึงเอาพวก Linux มาคุยภาษาพ่อขุน Windows SMB / Active Directory มันก็คุยไม่รู้เรื่องสอบตกหน้าหงายสิฮะโง่จริง!

❌ **[ผิด] Amazon S3 Glacier Deep Archive**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! มึงตาปลาดุกหรอฮะ!? มึงจะเอาถ้ำน้ำแข็งสี่มิติ `Glacier Deep Archive` ที่มีไว้ฝังศพซากไดโนเสาร์อืดอาดรอขุด 12 ชั่วโมง... มาทำเป็นระบบแชร์อัปโหลดไฟล์ (File System) ดุ๊กดิ๊กไปมาหาชาวบ้าน Windows ได้ไงวะฮะ! ผิดประเภทอย่างรุนแรง!

❌ **[ผิด] AWS DataSync**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ไอ้สวะช่างทาสี `AWS DataSync` แม่งเป็นแค่เรือเดินสมุทร "บริการขนของย้ายตู้คอนเทนเนอร์เข้า AWS"... ไม่ใช่ "ตู้เก็บของ (Storage)" บ้าบอคอแตกอะไรทั้งนั้น มึงจะเอาขนมปังไปทาพุงมันเก็บไว้ใช้ได้หรอฮะ เลอะเทอะสุดชีวิต!

---
---

## 📌 คำถามที่ 44
**โจทย์:**
A leading media company has recently adopted a hybrid cloud architecture, requiring the migration of application servers and databases to AWS. One of its applications requires a heterogeneous database migration, where an on-premises Oracle database needs to be transformed to PostgreSQL in AWS. This entails a schema and code transformation before the proper data migration begins.

Which of the following options is the most suitable approach to migrate the database to AWS?

**ตัวเลือก:**
- [x] Use the AWS Schema Conversion Tool to convert the source schema and application code to match that of the target database, and then use the AWS Database Migration Service to migrate data from the source database to the target database.
- [ ] Use Amazon Neptune to convert the source schema and code to match that of the target database in Amazon RDS. Leverage AWS Batch jobs to efficiently migrate data from the source database to the target database in a streamlined batch process.
- [ ] Heterogeneous migrations of databases are not supported in AWS. The database must first be transformed to PostgreSQL and then migrated to Amazon RDS.
- [ ] Configure a Launch Template that automatically converts the source schema and code to match that of the target database. Then, use the AWS Database Migration Service to migrate data from the source database to the target database. 

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทหนังสือนิตยสารกระเบื้องแตก จะย้ายฝูงซอฟต์แวร์สุดโบราณเข้า AWS!
ปัญหาที่ปวดกบาลสุดคือ: จะต้องย้ายบ้านลูกเมียน้อย! ถีบหัวส่งระบบฐานข้อมูล **`Oracle (หน้าเก่า)` แปลงเพศศัลยกรรมข้ามสายพันธุ์ไปเป็น `PostgreSQL (หน้าใหม่)`** ในฝั่ง AWS แบบสับแหลกไม่เหลือเยื่อใยฮะ (Heterogeneous database migration)!
บอสสั่งกร้าว: **"กูรู้ว่าโครงสร้างไส้ติ่งตาราง (Schema) และโค้ดมันคุยคนละภาษากัน! กูต้องแปลงศัลยกรรมโครงสร้างมันก่อนย้ายสมบัติ (Data) เข้าตึกใหม่... สอนกูซิ๊ว่าต้องอัญเชิญแพ็คเกจยันต์เหมาเข่งลูกพี่คนไหนมาช่วยทำทีวะ?"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! มหากาพย์ศัลยกรรมแปลงเพศ Database บนจักรวาล AWS มึงต้องเหมาเข่งลูกพี่ลูกอมคู่นี้เท่านั้น ท่องขึ้นใจสวดมนต์เช้าเย็น!!
  - Step 1: ใช้หมอศัลยกรรม **`AWS Schema Conversion Tool (SCT)`** ผ่าตัดปาดเนื้อคว้านโครงสร้างตารางและโค้ดให้หน้าตาเหมือนปลาดุกตัวใหม่เป๊ะๆ!
  - Step 2: ใช้รถสิบล้อดูดส้วม **`AWS Database Migration Service (DMS)`** ทำคลอดดูดข้อมูลเก่าๆ สูบฉีดท่อส่งไปยังตึกฐานข้อมูลตัวใหม่ตามรางตารางที่ปูขัดเงาไว้แล้วอย่างเสนาะหู! (คู่ผัวตัวเมียอำมตะ!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use the AWS Schema Conversion Tool to convert the source schema... and then use the AWS Database Migration Service to migrate data...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร! พระเอกตีระฆังดังกังวาน! (ตามเนื้อเรื่องทริคข้างบน 100% เลยฮะ) 
1. หมอ SCT = คว้านท่อโครงสร้าง (Schema). 
2. รถม้า DMS = ขนส่งเลือดกระฉูด (Data Data). นี่แหละคัมภีร์วิชาย้ายค่ายข้ามสายพันธุ์อมตะตลอดกาล!

❌ **[ผิด] Heterogeneous migrations of databases are not supported in AWS. The database must first be transformed to PostgreSQL and then migrated to Amazon RDS.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ถ่มน้ำลายใส่หน้าเจ้านาย! AWS เค้าโคตรจะหน้าด้านเปิดแคมเปญฮีโร่รองรับวิชาแปลงเพศข้ามสายพันธุ์ (Heterogeneous migration) อย่างสุดติ่งกระดิ่งแมวฮะ!! มึงจะไปใส่ร้ายเค้าฉาวโฉ่ว่าเค้าไม่รับทำเหี้ยอะไรล่ะฮะ!

❌ **[ผิด] Configure a Launch Template that automatically converts the source schema and code... Then, use the AWS Database Migration Service...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! มึงเอากล่องกระดาษ `Launch Template` ที่เอาไว้ปั้มสแตมป์ตั้งค่าซื้อเครื่องตึกเหล็ก EC2 มาแอบเสกมนต์ข้ามมิติแปลงร่าง Database Schema หรอฮะ!? หลอนยาอะไรมาเนี่ยฮะ! ผิดกรรมกรอย่างไม่น่าให้อภัยฮะ!

❌ **[ผิด] Use Amazon Neptune to convert the source schema... Leverage AWS Batch jobs to efficiently migrate data...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัว! หลุดวงโคจรสุดกู่! ไอ้สวะ `Amazon Neptune` แม่งเป็นปลาหมึกหาทฤษฎีรากเหงา Graph Database โว้ย! ไม่ใช่หมอทำศัลยกรรมโครงสร้างกระดูกหน้าแปลก! และสวะ `AWS Batch` แม่งคือเครื่องจักรหั่นหมูรันทดสอบ... ไม่ใช่รถดูดส้วมสูบฉีดฐานข้อมูลเว้ย! มั่วทุกตัวละครฮะ! 

---
---

## 📌 คำถามที่ 45
**โจทย์:**
A financial company wants to store their data in Amazon S3 but at the same time, they want to store their frequently accessed data locally on their on-premises server. This is due to the fact that they do not have the option to extend their on-premises storage, which is why they are looking for a durable and scalable storage service to use in AWS.

What is the best solution for this scenario?

**ตัวเลือก:**
- [x] Use AWS Storage Gateway - Cached Volumes.
- [ ] Use a fleet of EC2 instance with EBS volumes to store the commonly used data.
- [ ] Use both Elasticache and S3 for frequently accessed data.
- [ ] Use Amazon Glacier.

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารโลกอยากเก็บกระเป๋าบินขึ้นสวรรค์เอาไฟล์ไปทิ้งในโกดัง `Amazon S3` (เพราะฮาร์ดดิสก์ออฟฟิศตัวเองแม่งตัน ซื้อฮาร์ดกิสก์เพิ่มก็ไม่ได้ กาฝากทิ้ง AWS แม่งเลย)
เงื่อนไขลูกเมียน้อย: "แต่สำหรับไฟล์ข้อมูลกระดาษทิชชู่ที่ **แอบโหลดมาถูบ่อยๆ (frequently accessed data) กูขออนุญาตเก็บซ่อนดองเค็มไว้บนฮาร์ดดิสก์ในตึกออฟฟิศนายจ้างตัวเองนะโว้ย (locally) ขี้เกียจเอื้อมมือไปโหลดไกลๆ เสียเวลาฮะ!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! ไดอะล็อกโง่ๆ ในหมวดตระกูล **Storage Gateway (Volume Gateway)** ท่องให้ขึ้นใจ:
   - ของทั้งหมดหมกไว้ออฟฟิศ + โยนแค่ตลับเบ็คอัพ (Snapshot) ไป AWS = `Stored Volumes`
   - **ของทั้งหมดอัปทิ้งไปเก็บ AWS (S3) พื้นที่กว้างๆ + แต่แอบซ่อนไฟล์ที่แดกบ่อยๆ ไว้ในตู้เย็นออฟฟิศ (Cache / Frequently accessed locally)** = คำตอบโดนใจคือ **`Cached Volumes`** 100% เลยฮะ!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use AWS Storage Gateway - Cached Volumes.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร! พระเอกตีระฆังดังกังวาน! ตามคัมภีร์กฎการตั้งชื่อเลยฮะ... ทันทีที่เสียบปลั๊กโหลดแอป **`Cached Volumes`** ปุ๊บ มันก็จะดูดไฟล์หลักร้อย TB อ้วกพ่นไปดองเกาะเมฆบน S3 ให้เลยแบบประหยัดตังค์ (ได้สเกลใหญ่สุดยอด)... ในขณะเดียวกันมันจะแอบเก็บอมเหรียญ "ไฟล์ที่เจ้านายกำลังกระหายจัง (frequently accessed)" ไว้กักตุนในเครื่องที่ออฟฟิศด้วย (ลด Latency ดึงได้ไวปรู๊ชๆ) โคตรมิกซ์แอนด์แมทช์สมบูรณ์แบบตอบสนองทุกรูขุมขนของโจทย์ฮะ! 

❌ **[ผิด] Use both Elasticache and S3 for frequently accessed data.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! คุณน้อง `Elasticache` แม่งคือตู้เย็นดองแคช... แต่มันเสือกตั้งตระหง่านอยู่บนก้อนเมฆ (In AWS Cloud) โว้ยย!! โจทย์มันสั่งน้ำลายยืดเจาะจงว่าขอดองแคชซึมเศร้า **"ในออฟฟิศส่วนตัวของข้า (locally / on-premises server)"** แหมะ! มึงหลอกดาวล่อหลอกพากูกระเด็นออกนอกโลกป้ายนู้นซะงั้น บ้าบอ!

❌ **[ผิด] Use Amazon Glacier.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ตู้แช่ไดโนเสาร์อืดอาด `Glacier` มีไว้แช่แข็งโลงศพที่ไม่ได้เปิดเป็นชาติ! พอโจทย์มึงร้องงอแง "อยากได้ของที่หยิบแดกบ่อยๆ ถี่ๆ (frequently accessed)"... ขืนมึงเอาไปแช่ตู้ Glacier แม่งก็ฉิบหายสวดอภิธรรมสิฮะ ต้องรอละลายน้ำแข็งตั้งครึ่งค่อนวันกว่าจะได้แดกนึกภาพออกไหมฮะ! กะลาแตกย้อนแย้งสุด!

❌ **[ผิด] Use a fleet of EC2 instance with EBS volumes to store the commonly used data.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านเช่าตึก EC2 โง่ๆ ธรรมดา มึงจะเอากำแพงอะไรมาเสกเป็นลูกผสม "เสมียนเก็บตู้เย็นที่ออฟฟิศ (on-prem locaux) + ท่อส่งลงอ่าง S3" ได้อัตโนมัติหละฮะ (แม่งเป็นแค่ก้อน Hard Disk หมุนๆ สเตตัสปรกติ) ต้องมาลงสคริปต์กากๆ วุ่นวายแถมไม่เข้ากับคำว่าประหยัดเหนื่อยแฮนด์ฟรีอีกด้วย! ผิดฝาผิดตัวฮะ!

---
---

## 📌 คำถามที่ 46
**โจทย์:**
The start-up company that you are working for has a batch job application that is currently hosted on an EC2 instance. It is set to process messages from a queue created in SQS with default settings. You configured the application to process the messages once a week. After 2 weeks, you noticed that not all messages are being processed by the application.

What is the root cause of this issue?

**ตัวเลือก:**
- [x] Amazon SQS has automatically deleted the messages that have been in a queue for more than the maximum message retention period.
- [ ] The batch job application is configured to long polling.
- [ ] The SQS queue is set to short-polling.
- [ ] Missing permissions in SQS.

---
### 🎯 โจทย์ต้องการอะไร?
แอปกระโหลกกะลา EC2 ต้องมารับจ๊อบอ่านจดหมายในตะกร้าหน้าบ้าน **`Amazon SQS (ที่กดเลือกออปชันตั๋วแบบเริ่มต้น/Default settings)`**
ปัญหาคือ: คนส่งเอาของมาดองๆๆ ทิ้งไว้... แต่เจ้านายตั้งกฎส้นตีนว่า "กูจะตื่นมาแกะซองอ่านจดหมายพวกนี้ **'สัปดาห์ละ 1 หนเท่านั้นแหละ (process once a week)!'**"
เวลาผ่านไป 2 วีก... เจ้านายโวยวายตาเหลือก **"เห้ยย!! ทำไมจดหมายกูหายหัวไปไหนหมดวะ!? มันอ่านไม่ครบทุกฉบับอะกูสาบานได้!! ผีหลอกหรอวะ!"**
คำถาม: อะไรคือตัวการขโมยของ ???

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบร้อยข้อแล้วมึงไม่รู้เลขวิเศษนรกแตกนี้คือสอบตกเลยฮะ! 
- กฎแห่งความตาย: ตะกร้าเวทมนตร์ **`Amazon SQS` แบบค่ามาตรฐานโรงงาน (Default settings) มีอายุผูกชะตาชีวิตให้จดหมายเน่าสลายล่องหนอัตโนมัติ ภายในเวลาเพียงแค่ "4 วัน (Days)" เท่านั้น!!** (สูงสุดยืดดึงตดได้ 14 วัน)
- ฉะนั้นถ้าตั้งป้อมจะปลุกแอดมินมาอ่านจดหมาย "ทุกๆ 1 สัปดาห์ (7 ว้น)"... หึ! มันช้าไปแล้วน้องเอ๋ย วันอังคาร-พฤหัส จดหมายมันก็บรรลัยเปรี้ยงหายวับไปจากหน้าประวัติศาสตร์โลกแล้วฮะ! นี่แหละความจริงอันโหดร้าย!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon SQS has automatically deleted the messages that have been in a queue for more than the maximum message retention period.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามทริคข้างบนฮะ (อายุขัย Default = 4 วัน)... มึงดันทุรังดึงเชงซะ 7 วัน (1 week) มันก็เลยหมดโปรโมชันอายุขัยก้นบุหรี่ (message retention period) โดนระบบมัจจุราชเขี่ยถังผีลงหลุมลืมหายสาบสูญเกลี้ยงสิฮะฮัลโหลลล! สมใจอยากดันทุรังดีนัก! 

❌ **[ผิด] The batch job application is configured to long polling. / The SQS queue is set to short-polling.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงจะบ้าหรอฮะ!? ลูกเล่นเวทมนตร์กะพริบตาถี่ๆ ห่างๆ ของคุณปู่ Short/Long Polling เนี่ยะ มันมีผลแค่เรื่อง "ตอนดึงกระสุนแอดมินต้องยืนรอจนเหงือกแห้งไหม / เปลืองตังค์ API เปล่าๆ ปี้ๆ ไหม"... มันไม่ได้มีอำนาจส้นตีนไป **"ลืมหูลืมตาแดกกลืนขโมยจดหมายชาวบ้านให้สูญหายจากโลกนี้ดื้อๆ"** โว้ยย! มั่วหน้าตาเฉยฮะ! 

❌ **[ผิด] Missing permissions in SQS.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! ตรรกะบอดสนิท! ถ้าพนักงานตึ่มไม่มีใบอนุญาตแหกประตูมุดรับพัสดุ (Missing permissions) กระจาดแม่ร่วง... เจ้านายมึงก็ต้องตาเหลือกแหกปากร้องโหยหวนด่า "Access Denied อดแดกตั้งแต่ใบแรกตั้งแต่วินาทีแรกแล้วฮะ!" จะมานังทำสำออยแกล้งเป็นเพิ่งสังเกต "เอ๊ะหายไปบางส่วนเมื่อเวลาผ่านไป 2 วีค..." หาพระแสงอะไรเล่าฮะ เลอะเทอะสุดชีวิต! 

---
---

## 📌 คำถามที่ 47
**โจทย์:**
A company deployed a web application that stores static assets in an Amazon Simple Storage Service (S3) bucket. The Solutions Architect expects the S3 bucket to immediately receive over 2000 PUT requests and 3500 GET requests per second at peak hour.

What should the Solutions Architect do to ensure optimal performance?

**ตัวเลือก:**
- [x] Do nothing. Amazon S3 will automatically manage performance at this scale.
- [ ] Add a random prefix to the key names.
- [ ] Use Byte-Range Fetches to retrieve multiple ranges of an object data per GET request.
- [ ] Use a predictable naming scheme in the key names such as sequential numbers or date time sequences.

---
### 🎯 โจทย์ต้องการอะไร?
แอปลูกทุ่งโยนรูปภาพยัดใส่ตุ่มน้ำ `Amazon S3` บันเทิงมากฮะ
ดราม่าปะทุ: บ่งบอกว่าช่วงเวลาเบิกบานโปรโมชั่น (Peak hour)... ตุ่มน้ำ S3 กูจะโดนรุมกระซวกแทงมิดด้าม! **"มีคนแห่ปาขอฝากรูป (PUT requests) 2000 ครั้ง/วิ... และมีคนแหย่ตูดแหกขอดูรูป (GET requests) 3500 ครั้ง/วิ!"**
บอสหน้าซีด: ต้องกระโดดงัดวิชาพ่นผีสางอันไหนใส่ Amazon S3 เพื่อให้ของมันลื่นหัวปรื้ดไม่สะดุด (optimal performance) ในสเกลหมาบ้าฝูงนี้ดีวะเนี่ย!?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้าโง่ๆ เลยฮะ.. AWS สลักคำคมประกาศหลังกระทรวงว่า: โกดัง S3 สมัยใหม่ มันแดกสเตียรอยด์ปรับตัวแล้วฮะพี่น้อง! "ตราบใดที่คนแหกประตูพังเข้ามา **เอาของยัดใส่หน้าต่าง PUT ไม่เกิน 3,500 หน/วิ... หรือดึงทึ้งหยิบแหลก GET ไม่เกิน 5,500 หน/วิ...** กูจะสแตนบายปั๊มออกซิเจนนั่งยิ้มร่าเริงรบกวนขนาดยิ้มแฉ่งชิวๆ แบบมึงไม่ต้องหาหอกงัดสคริปต์มาทำบ้าอะไรเพิ่มเติมสักแอะเลยฮะ!!"
- ถ้าตัวเลขในโจทย์ ไม่ทะลุทวารกำแพง (3500 PUT / 5500 GET) = กาหน้าตาเฉยว่า **`Do Nothing!` (ไม่ต้องสะเออะทำอะไรทั้งนั้น)** ฮะ กูแช่แป้งได้เลย! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Do nothing. Amazon S3 will automatically manage performance at this scale.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามทริคข้างบนเป๊ะฮะ! มึงโดนแค่ 2000 PUT กับ 3500 GET ต่อวิ... ซึ่งแม่มเทียบไม่ติดกับโคตรขีดจำกัดพลังอมฤตล่าสุดที่ AWS เพิ่งอัพเดตกล้ามให้ S3 ใหม่อะคร้าบ! (รับได้จุๆ 3500 PUT / 5500 GET)... เพราะงั้นลูกพี่ก็นอนแคะขี้ตาไขว่ห้าง **ไม่ต้องดิ้นรนทำอะไร (Do nothing S3 auto scale)** แล้วปล่อย AWS โกยยอดให้มึงไปฟรีๆ ก็จบฮะ รอดตายๆๆ!

❌ **[ผิด] Add a random prefix to the key names.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ไดโนเสาร์เต่าล้านปีอัปยศ! ในยุคพระเจ้าตากสินฮะ ที่พอคนแห่รุมทิ้งของ S3 จะเหงื่อแตกพลั่ก แล้วชาวบ้านต้องเอาน้ำมนต์บักชี้ "พ่นชื่อโฟลเดอร์ตอแหลมล่อเป้าสุ่มเดา (random prefix)" ไว้ขยายคอขวดแหว่งท่อให้ S3... กูบอกเลย **"เคล็ดวิชาซอมบี้โง่ๆ อันนี้ AWS ยกเลิกใช้ขีดฆ่าปาทิ้งลงส้วมขยะไปนานแล้วโว้ยย!! เลิกสอนเดียกนี้!!"** บาปหนาย้อนยุคมั่วตั้วฮะ!

❌ **[ผิด] Use a predictable naming scheme in the key names such as sequential numbers or date time sequences.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้าน "ระบุชื่อไฟล์แบบมีตรรกะคาดเดาง่าย 1..2..3.. (sequential numbers)" นอกจากแม่งจะไม่ช่วยเร่งพายุมรสุมแล้ว... แม่งเสือกย้อนกลับมาทิ่มตูดตัวเองอีกฮะ! เพราะยิ่งมึงเรียงคิวชื่อเลขลำดับติดๆ กัน มันจะกรูก๊อกทะลักมั่วรวมกันอยู่ในหัวอ่านจานผี Partition ช่องระบายน้ำเดียวกันให้มันกระตุกตายหาอัดสำลักคอแตกฮะ (Overwhelm I/O)! ฆ่าตัวตายของแทร่!

❌ **[ผิด] Use Byte-Range Fetches to retrieve multiple ranges of an object data per GET request.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! มึงจะให้ชาวบ้านกระซวกกระซวกรีดฉีกชิ้นเนื้อรูปภาพดาวน์โหลดดึงมาครึ่งตัวครึ่งลำ (Byte-Range Fetch) มันช่วยกระชากตูดให้ของโหลดเร็วขึ้นได้จริงฮะ! **"แต่พระพุทธเจ้า AWS มันไม่อนุญาตให้มึงถุยจดหมายสั่งเสือกหอยหลอด GET request ครั้งเดียวแล้วขอโหลดชิ้นเนื้อแหว่งหลายๆ จุด (multiple ranges) พร้อมกันห่าลงหม้อ!"** ฮะ! ผิดหลักไวยากรณ์สากล AWS ล้วนๆ! มั่วจับแพะชนแกะฮะ!

---
---

## 📌 คำถามที่ 48
**โจทย์:**
An e-commerce application is using a fanout messaging pattern for its order management system. For every order, it sends an Amazon SNS message to an SNS topic, and the message is replicated and pushed to multiple Amazon SQS queues for parallel asynchronous processing. A Spot EC2 instance retrieves the message from each SQS queue and processes the message. There was an incident that while an EC2 instance is currently processing a message, the instance was abruptly terminated, and the processing was not completed in time.

In this scenario, what happens to the SQS message?

**ตัวเลือก:**
- [x] When the message visibility timeout expires, the message becomes available for processing by other EC2 instances
- [ ] The message will be sent to a Dead Letter Queue in AWS DataSync.
- [ ] The message is deleted and becomes duplicated in the SQS when the EC2 instance comes online.
- [ ] The message will automatically be assigned to the same EC2 instance when it comes back online within or after the visibility timeout.

---
### 🎯 โจทย์ต้องการอะไร?
แอปตะกร้าสินค้า ปาจดหมายออเดอร์เข้าตุ่มหอก **`SNS Topic`** จากนั้นถูกโบท็อกซ์ระเบิดลูกปรายกระจุย (Fanout) แจกฝังตัวลงซ่องโสเภณี **`SQS Queues`** เป็นตับๆ
ลูกหาบกระโหลกกะลาราคาถูกตระกูล **`Spot EC2`** (ตั๋ว Standby โดน AWS เตะบินได้ตลอดเวลา) เป็นคนย่องมาตกเบ็ดหยิบไปทำกับข้าว
ดราม่าปะทุ: สมมุติว่า Spot EC2 กำลังเคี้ยวกะหล่ำปลีจดหมายเพลินๆ อ้าวชิบหาย! **"โดนฟ้าผ่า AWS ถีบหัวส่งสั่งประหาร EC2 ดับกลางอากาศตายห่าเครื่องระเบิด!! (abruptly terminated)"** งานยังทำไม่เสร็จ!
คำถามทฤษฎีจ๋า: ทายซิ๊... ไอ้สวะจดหมายค้างคาฉบับนั้นที่มันกำลังคายทิ้งไว้ตรงโคลนตม มันจะมีชะตากรรมดิ้นรนไปโผล่แหกปากตรงไหนต่อวะฮะ ?? 

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! กฎอมตะแห่งกระทรวง SQS คือ: **"SQS แม่งใจบุญสุนทานโคตรๆ ฮะ! ทันทีที่มีคนย่องมารับจดหมายปุ๊บ... SQS จะเสกมนต์ผ้าคลุมล่องหน (Visibility Timeout - มาตรฐานคือ 30 วิ) ขยำกบาลฉบับนั้นซ่อนปัดกวาดให้คนอื่นหาไม่เจอ"** 
- ข้อควรระวัง: แต่ถ้าไอ้เวรกรรมหน้ามนุษย์ที่เสือกโหยหวนอุ้มจดหมายเดินกะเผลกๆ ไปนั้น เกิดสะดุดก้อนปูนกะโหลกแตกดับหม่องเท่งกลางทาง (ตายแล้วยังไม่ทันรายงานว่า กูทำพัสดุรับชิ้นนี้จบแล้วนะ) -> พอครบ 30 วิ มนต์ผ้าคลุมล่องหนพังทลาย!! 👉 **จดหมายฉบับผีตายโหงนี้มันจะ "กระเด้งฟื้นคืนชีพกลับมานอนเด้งรออ่อยเหยื่อให้เพื่อนคนอื่นในซอยโสเภณี (other EC2 instances) แบกไปทำกับข้าวใหม่ดื้อๆ เลยฮะ!" (Message becomes available again)!**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] When the message visibility timeout expires, the message becomes available for processing by other EC2 instances**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามทริคบรรทัดบนสุดฮะ... นี่แหละสัญชาตญาณเอาตัวรอดล้านเปอร์เซ็นต์ของ SQS! เพราะพนักงานหน้าเก่าที่อุ้มมึงไปโดนฟ้าผ่าลงตับตายดับสูญ... ตัว SQS ซึ่งไม่ได้เห็นควันควันอ้วยยืนยันปิดจ๊อบ "จบงาน (Delete message call)" สักที... ทันทีที่ผ้าคลุมล่องหนหมดเวลาศพหมกอายุขัย (Visibility timeout expires) จดหมายฉบับนั้นก็จะเปล่งแสงกระเด็นเด้งกลับมาในตลาด... เพื่อรอคนใหม่ใจสปอร์ตอุ้มไปสานต่อปณิธานให้พ้นบ่วงกรรมอัตโนมัติ 100% ฮะ หล่อมาก!!

❌ **[ผิด] The message will automatically be assigned to the same EC2 instance when it comes back online within or after the visibility timeout.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! ช้อยส์นี้มันจงใจลักไก่ทุจริตแบบโง่บัดซบฮะ!! មึงบ้าหรอเจ้านาย EC2 แม่งระเบิดศพดับตายพังไปเป็นเถ้าถ่านซะขนาดนั้น (terminated)! มึงจะไปผูกแผงคาดหวังรอเครื่องเดิมซากผีตัวเก่าโคลนนิ่งมาอ้าแขนรักรอรับกล่องได้ยังไงฮะ SQS แม่งไม่ได้เสือกเป็นญาติมารอพี่รับส่งกะให้ตัวเดิมโว้ยย!! มันกระจายให้ "ไอ้หน้าไหนก็ได้ในแก๊งค์เพื่อนที่ขยันตอนนั้น (other EC2 instances)" ให้มาแดกไปแทนต่างหาก! ระวังโดนสวมเขาตายนะฮะ!

❌ **[ผิด] The message is deleted and becomes duplicated in the SQS when the EC2 instance comes online.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! บิดเบือนความจริงสุดส้นตีนฮะ! ของเดิมโดนถุยทิ้งจมโขลกกาวแล้วอัญเชิญปั้มสแตมป์เบิ้ล (duplicated)? มึงตาปลาดุกหรอฮะ!? ลูกแม่ค้ามันก็แค่ "ลบผ้าคลุมล่องหนออกแล้วโผล่มาเป็นฉบับเดิมของแทร่ 1 องค์ถ้วน" ไม่มีท่าปั้มขยายเพิ่มปริมาณป่าเถื่อนอะไรทั้งนั้น! บ้าบอคอแตกอะไรล่ะฮะ!

❌ **[ผิด] The message will be sent to a Dead Letter Queue in AWS DataSync.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ลากไถลไปดาวพุธเลยฮะ! แม้การอัญเชิญจดหมายผีตายโหงตกระกำลำบากไปบ้วนทิ้งในป่าช้า (Dead Letter Queue - DLQ) มันจะเป็นของน่ารักที่ทำได้ในโลก SQS นะฮะ... **แต่ไอ้ห่า!! DLQ มันไม่ใช่โถส้วมของพวกช่างทาสีรถตู้ขนของ `AWS DataSync` โว้ยย!!** DLQ มันก็คือตะกร้า SQS ชนิดพิเศษอีกใบที่เอาไว้ซับน้ำตาก็ดิ่งแค่นั้นเอง! หายนะมั่วตั๊วอย่างสาหัสฮะ! 

---
---

## 📌 คำถามที่ 49
**โจทย์:**
A company needs to accelerate the development of its GraphQL APIs for its new customer service portal. The solution must be serverless to lower the monthly operating cost of the business. Their GraphQL APIs must be accessible via HTTPS and have a custom domain.

What solution should the Solutions Architect implement to meet the above requirements?

**ตัวเลือก:**
- [x] Develop the application using the AWS AppSync service and use its built-in custom domain feature. Associate an SSL certificate to the AWS AppSync API using the AWS Certificate Manager (ACM) service to enable HTTPS communication.
- [ ] Launch an AWS Elastic Beanstalk environment and use Amazon Route 53 for the custom domain. Configure Domain Name System Security Extensions (DNSSEC) in the Route 53 hosted zone to enable HTTPS communication.
- [ ] Deploy the GraphQL APIs as Kubernetes pods to AWS Fargate and AWS Outposts using Amazon EKS Anywhere for deployment. Create a custom domain using Amazon CloudFront and enable the Origin Shield feature to allow HTTPS communication to the GraphQL APIs.
- [ ] Host the application in the VMware Cloud on AWS service. Associate a custom domain to the GraphSQL APIs via the AWS Directory Service for Microsoft Active Directory and provide multiple domain controllers to enable HTTPS communication.

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งกติกาเพิ่มเตาปฏิกรณ์: "กูจะปั้นแอปบริการ **`GraphQL APIs`** สายเถื่อน"
กฎเหล็กสายประหยัด:
1. "ต้องเป็นผีถ้วยแก้วล่องหน **`Serverless`** เท่านั้น! กูขี้เกียจจ้างกรรมกรมาจ่ายค่าเช่ารายเดือนบานตะไท!" 
2. ต้องเปิดปอร์ตทะลวงไข่สว่างโร่ดุจดั่งแม่พระ **`HTTPS`** (ปลอดภัยสุดๆ) 
3. และขอติดป้ายโชว์หราเปลี่ยนชื่อเท่ๆ **`custom domain`** (เว็บกูเองไม่เอาลิงค์ลิ่วล้อ Amazon บ้าบอ!)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! ทันทีทีในโจทย์ร้องเรียกอักษรศีลธรรม **"GraphQL APIs" + Serverless (ไม่ต้องเช่าตึกหน้าเก่า)** = แชมป์เปี้ยนโลกกระสอบทรายที่เพิ่งผุดมาจากแดนสวรรค์ คือน้อง **`AWS AppSync`** แต่เพียงผู้เดียวฮะ! (ท่องเวทมนตร์ข้อนี้ข้อเดียวชนะคดีทุกศาล!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Develop the application using the AWS AppSync service and use its built-in custom domain feature... Associate an SSL certificate to the AWS AppSync API using the AWS Certificate Manager (ACM)...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก!
1) ลากน้องคนสวย `AWS AppSync` มาร่ายรำทำแอป GraphQL ตามหลักเป๊ะๆ (แถมแกเป็นแม่นาง Serverless 100% ตอบโจทย์เรื่องลดรายจ่ายกรรมกรให้ซูบผอมสมใจนึก)
2) ทุลักทุเลเปิดท่าไม้ตาย `built-in custom domain` ปรุงแต่งโดเมนชื่อแปลกให้แอปเลยทันทีดื้อๆ 
3) สวิทช์ไปถือกุญแจศักดิ์สิทธิ์ `AWS Certificate Manager (ACM)` เสียบหน้าต่างกระชากเปิดด่าน HTTPS สมปรารถนาล้านเปอร์เซ็นต์ฮะ!

❌ **[ผิด] Launch an AWS Elastic Beanstalk environment... Configure Domain Name System Security Extensions (DNSSEC) in the Route 53...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงแหกตาดูโจทย์สิฮะ บอสร้องปาวๆ ว่า "กูขอความซูบผอม Serverless 0 บาท!"... แต่พวกแพลตฟอร์มคุมตึกแฝด `Elastic Beanstalk` มันตระกร้อล้างผลาญคลอดเครื่อง EC2 (ตึกกระจอกเซิร์ฟเวอร์ราคาแพง) สดๆ ออกมาจากตูด! ผิดสเปคจ๊อดดดรับไม่ได้ฮะ (ไม่ใช่ Serverless)!! และอีกประการคือ DNSSEC ของ Route 53 มันเอาไว้ป้องกันโจรปลอมแปลงบัตรประชาชนส้นตีน (DNS lookup spoofing)... ไม่ใช่ปุ่มกดดัดจริตเสก "HTTPS ให้แอป" ทำหอกอะไรแสนแพง!

❌ **[ผิด] Deploy the GraphQL APIs as Kubernetes pods to AWS Fargate and AWS Outposts... Create a custom domain using Amazon CloudFront and enable the Origin Shield feature...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! แม้น้องเต่า Fargate จะแสร้งตัวเป็นแม่นาง Serverless ดุจดั่งผ้าขาวบางนะฮะ... **"แต่ตู้เย็นซากเหล็กลูกเมียน้อยอย่าง AWS Outposts อะ (ปุ่มแดงเครื่องในออฟฟิศตัวเอง) มันไม่ใช่ลัทธิ Serverless หน้าด้านอะไรเลยโว้ยย!! บริหารจัดการแพงระยับฉิบหายวายป่วง!"** แล้วการเสือกเสกมนต์ให้ CloudFront เปิด Origin Shield มันมีไว้บรรเทาความเจ็บปวดกระซวกที่หัวกำแพงตึก... ไม่ใช่เสกปุ่มกดเปิด HTTPS ตรงๆ กับแอปตัวมันเองโว้ยฮะ! มั่วตั้วจับแพะชนแกะฮะ!

❌ **[ผิด] Host the application in the VMware Cloud on AWS service. Associate a custom domain to the GraphSQL APIs via the AWS Directory Service for Microsoft Active Directory...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านเช่าตึกแพงบรรลัย "VMware Cloud"... แม่งเอาไว้จุติร่างฝูงคอมประกอบ Virtual Machine นรกแตกที่ขุดมาจากบริษัทนายจ้างโว้ย! ไม่ต้องพูดถึงหลักการประหยัด "Serverless" เลยนะฮะ ลิเกปิดฉากตั้งแต่ยังไม่เริ่ม! และทะลึ่งเอาบัตรตอกออฟฟิศนายจ้าง "AWS Directory Service" มาเสกบัตรคิว HTTPS นามบัตรโดเมนเร่ร่อน (Custom Domain) เนี่ยยนะ!? บอดสนิทพินาศยับเยินฮะ 

---
---

## 📌 คำถามที่ 50
**โจทย์:**
A data analytics company keeps a massive volume of data that they store in their on-premises data center. To scale their storage systems, they are looking for cloud-backed storage volumes that they can mount using Internet Small Computer System Interface (iSCSI) devices from their on-premises application servers. They have an on-site data analytics application that frequently accesses the latest data subsets locally while the older data are rarely accessed. You are required to minimize the need to scale the on-premises storage infrastructure while still providing their web application with low-latency access to the data.

Which type of AWS Storage Gateway service will you use to meet the above requirements?

**ตัวเลือก:**
- [x] Volume Gateway in cached mode
- [ ] Tape Gateway
- [ ] File Gateway
- [ ] Volume Gateway in stored mode

---
### 🎯 โจทย์ต้องการอะไร?
แอพวิเคราะห์ขยะข้อมูลยักษ์อยู่ที่ตึกดินของออฟฟิศ
เจ้านายสั่งกติกาเพิ่มเติ่ม: ซื้อฮาร์ดดิสก์เซิฟเวอร์ที่ออฟฟิศมันเปลือง (minimize scale on-premises) ขอให้เอาโกดัง AWS มาช่วยขึงยึดสายเชื่อมหัวเทียนต่อเข้าด้วยท่อแปลกประหลาดที่ชื่อว่า **`iSCSI protocol`** ให้ที!
และเงื่อนไขจุกจิกอีกแล้ว!! (ก็อปปี้สคริปต์ข้อ 45 ลอกกระดาษเป๊ะฮะ) คือ... **"อะไรที่เป็นขยะชั้นเลิศที่แอบดอมดมถูบ่อยๆ (frequently accessed data subsets) กูขอยามซ่อนหมกไว้ในตู้เย็นออฟฟิศตัวเองแหละใกล้ๆ ปาก (locally)... ส่วนพวกขยะเปียกซากศพไดโนเสาร์ขอบายมึงเอาโยนทิ้งไว้บนก้อนเมฆทั้งหมดเลยโว้ยย!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! (โจทย์ข้อนี้ก๊อปเดจาวูไอเดียเดียวกับข้อ 45 มาแดกฟรีอีกแล้วฮะ) 
1. ทันทีที่เจาะจงใช้ท่อห่อสายสลิง **`iSCSI protocol`** แทนสายชาวบ้าน = มึงห้ามตอบท่อปลอมๆ อย่างก๊วนแชร์ File Gateway (เพราะพวกนั้นมันมักมากในกามชอบ SMB/NFS) มึงต้องเล็งไปที่ครอบครัวพระเอกใจหมาอย่าง **`Volume Gateway`** เท่านั้น!!
2. โจรปล้นทรัพย์หน้าเดิม: ถ้ามีเงื่อนไขบีบกระเพาะว่า **"กระอักเลือดโกยขยะโยนทิ้งก้อนเมฆ (S3) ทั้งหมด + แต่ซุ่มเงียบเสือกซ่อนตัวกระแดะดองก้อนไฟล์ที่แดกบ่อยๆ (frequent) ไว้ใกล้จมูกที่ออฟฟิศตัวเอง"** = มันก็คือกฎการตั้งชื่อนรกของตำรานิติ **`Cached Volumes`** (ปราบมาร) แสนเปอร์เซ็นต์โว้ย!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Volume Gateway in cached mode**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทุกตัวอักษร! พระเอกตีระฆังดังกังวาน! ตามคัมภีร์กฎรักทริคข้างบนเป๊ะๆ (สมบูรณ์แบบไม่ขัดเจตนา)... เปิดช่องรับแขกผ่านเข็มฉีดยา iSCSI และขโมยขยะโยนพ่นทิ้ง S3 ยิบตา แต่แอบดองความผูกพันของไฟล์ฮิตๆ (Frequently access) ไว้ใกล้จมูกเครื่อง Cached! ช่วยกระชาก Latency หนังหมาให้ต่ำติดดิน ตอบรับเจตนารมณ์ 100%!

❌ **[ผิด] Volume Gateway in stored mode**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาถูกครึ่งใบเสือกตายโง่! ชงมาดีเสือกมาสะดุดขาตัวเองล้มตอนจบฮะ! คุณน้องหน้ามืด `Stored mode` มันคือกติกาที่... **"มึงจะดึงดันถลุงงบเก็บสมบัติห่าเหวทั้งหมดแช่แข็งอมก้อนน้ำแข็งไว้ที่ 'ออฟฟิศตัวเองเพียวๆ (Store entire dataset ON-PREMISES)'"** แล้วค่อยโยนถ่ายรูปกะโหลกไปฝากไว้ก้อนเมฆ! อ้าวเห้ย! โจทย์แม่งเพิ่งร้องโหยหวนแหกปากว่า "กูไม่เอาแล้วกูทนซื้อฮาร์ดดิสก์เพิ่มหน้าออฟฟิศไม่ไหวแล้ววว (minimize to scale on-premise)!" เพราะงั้นถ้ามึงขืนปักหลักธงชัยเลือก Stored... ขยะแม่งก็ล้นหน้าออฟฟิศมึงจนตึกออฟฟิศถล่มสิฮะโง่จริง!

❌ **[ผิด] File Gateway**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! มึงตาปลาดุกหรอฮะ!? ลูกข่ายกระจายเสียง `File Gateway` มันเป็นทาสรับใช้คนทรงที่ชอบเล่นรูดซิปกางเกงแบบเบาบาง **NFS / SMB protocol** ล้วนๆ!! มึงฝืนเอาขั้วเจาะไข่แบบฝังเลือดเนื้อก้อนดิสก์หนาเตอะอย่าง **"iSCSI protocol"** ไปเสียบตูดมัน มันก็ร้องไห้ฟ้องแม่ด่าพ่อมึงสิฮะ ผิดกระบวนท่าเจาะเกราะฮะ! 

❌ **[ผิด] Tape Gateway**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านซากไดโนเสาร์ `Tape Gateway` (VTL) เนี่ย! มันมีหน้าที่เอาไปสุ่มรื้อถ่ายโอนม้วนเทปกระดาษฉีกขาด (Long-term backup Archive) ลากขยะทิ้งหลุมศพ Glacier ดื้อๆ แบบดองเค็มฮะ!! มันไม่ได้ออกแบบมาปั่นจักรจานหมุนกะทันหันให้ชาวบ้านแดกบ่อยๆ ถี่ๆ ไวๆ (frequently access) ได้หน้าตาเฉยฮะ บอดตาใสจับสลับคู่! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 6: ข้อ 51 - 60)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 51
**โจทย์:**
A leading e-commerce company is in need of a storage solution that can be simultaneously accessed by 1000 Linux servers in multiple availability zones. The servers are hosted in EC2 instances that use a hierarchical directory structure via the NFSv4 protocol. The service should be able to handle the rapidly changing data at scale while still maintaining high performance. It should also be highly durable and highly available whenever the servers will pull data from it, with little need for management.

As the Solutions Architect, which of the following services is the most cost-effective choice that you should use to meet the above requirement?

**ตัวเลือก:**
- [x] Amazon EFS
- [ ] Amazon S3
- [ ] Amazon FSx for Windows File Server
- [ ] Amazon EBS

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทขายของออนไลน์ต้องการพื้นที่เก็บข้อมูลร่วมกัน (Storage solution) ที่สามารถ **โดนรุมกระซวกจากเซิร์ฟเวอร์ Linux ถึง 1,000 เครื่องพร้อมๆ กัน!** (Simultaneously accessed by 1000 Linux servers) ที่ทวีปูพรมหลายโซน (Multiple AZs)
คีย์เวิร์ดบังคับ: "ต้องคุยผ่านภาษา **NFSv4 protocol**, เก็บไฟล์แบบโฟลเดอร์ต้นไม้ (Hierarchical directory), รัวอัปเดตข้อมูลไฟล์เปลี่ยนไปมาบ่อยๆ (rapidly changing data) และถึกทนระดับเทพ"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้าโง่ๆ เลยฮะ 
- กฎแห่งความตาย: เมื่อไหร่ก็ตามที่โจทย์พ่นภาษาต่างดาว **"Linux ล้วนๆ, โดนรุมสกรัมพร้อมกันหลายร้อยหลายพันเครื่อง (concurrently accessible by thousands of EC2), และภาษาเสียบตูดคือ NFS"** = คำตอบแห่งจักรวาลที่มีอยู่ตัวเดียวคือ **`Amazon EFS` (Elastic File System)** จิกหัวกาได้ล้านเปอร์เซ็นต์ไม่ต้องคิดเยอะฮะ! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon EFS**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ลูกพี่ `Amazon EFS` สร้างมาเพื่อสถิตเป็นพระบิดาของตระกูล Linux ในเกาะ AWS โดยเฉพาะ! มันรองรับมาตรฐาน NFS ลื่นปื๊ด และพลังเวทมนตร์ของมันคือ "ยอมให้เครื่อง EC2 เป็นพันๆ หมื่นๆ เครื่องมารุมกระซวกดูดไฟล์โฟลเดอร์เดียวกันได้พร้อมกัน!" (ต่างจาก S3 ที่แก้ไขทีละนิดถี่ๆ ไม่เก่งเท่า) แจกแต้มอนุบาลชัดๆ!

❌ **[ผิด] Amazon S3**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! ถึงแม้ถังขยะ S3 จะรองรับคนหมื่นคนได้สบายๆ... แต่อย่าลืมนะฮะ S3 แม่งเป็นที่เก็บของชิ้นๆ (Object Storage) ไม่ใช่ระบบโฟลเดอร์ต้นไม้ (Hierarchical) และที่สยองสุดคือ S3 "ขยะแขยงการถูกรุมแก้ไฟล์เดิมซ้ำๆ ถี่ๆ รัวๆ (rapidly changing data)!" ซึ่งเป็นข้อห้ามรุนแรงของ S3 โว้ยฮะ! ฝืนใช้ก็พังพินาศสิฮะโง่จริง!

❌ **[ผิด] Amazon EBS**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! ฮาร์ดดิสก์ `Amazon EBS` ธรรมดาๆ แม่งมีจริตเห็นแก่ตัวฮะ! 1 ลูกต่อสายสะดือเสียบเข้าตูด EC2 ได้แค่ 1 เครื่องเท่านั้น! (EBS ไม่เปิดรับแชร์เมียให้คน 1000 คนรุมโทรมเด็ดขาด) มึงจะมัดรวม Linux 1000 เครื่องมาเสียบ EBS ลูกเดียวได้ยังไงฮะ ผิดธรรมชาติเว้ย!!

❌ **[ผิด] Amazon FSx for Windows File Server**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญตั๊กแตน `FSx for Windows` แม่งสร้างมาบรรณาการเฉพาะชนชั้น "Windows (SMB)" เว้ยย!! ขืนมึงเอาแก๊งเสี่ยว Linux ไปคุยภาษาอังกฤษใส่ชาวบ้าน Windows แม่งจะคุยกันรู้เรื่องไหมละฮะ! ผิดฝาผิดตัวยับเยินฮะ!

---
---

## 📌 คำถามที่ 52
**โจทย์:**
A company has a web application hosted in their on-premises infrastructure that they want to migrate to AWS cloud. Your manager has instructed you to ensure that there is no downtime while the migration process is on-going. In order to achieve this, your team decided to divert 50% of the traffic to the new application in AWS and the other 50% to the application hosted in their on-premises infrastructure. Once the migration is over and the application works with no issues, a full diversion to AWS will be implemented. The company's VPC is connected to its on-premises network via an AWS Direct Connect connection.

Which of the following are the possible solutions that you can implement to satisfy the above requirement? (Select TWO.)

**ตัวเลือก:**
- [x] Use an Application Elastic Load balancer with Weighted Target Groups to divert and proportion the traffic between the on-premises and AWS-hosted application. Divert 50% of the traffic to the new application in AWS and the other 50% to the application hosted in their on-premises infrastructure.
- [x] Use Route 53 with Weighted routing policy to divert the traffic between the on-premises and AWS-hosted application. Divert 50% of the traffic to the new application in AWS and the other 50% to the application hosted in their on-premises infrastructure.
- [ ] Use AWS Global Accelerator to divert and proportion the HTTP and HTTPS traffic between the on-premises and AWS-hosted application. Ensure that the on-premises network has an AnyCast static IP address and is connected to your VPC via a Direct Connect Gateway.
- [ ] Use Route 53 with Failover routing policy to divert and proportion the traffic between the on-premises and AWS-hosted application. Divert 50% of the traffic to the new application in AWS and the other 50% to the application hosted in their on-premises infrastructure.
- [ ] Use a Network Load balancer with Weighted Target Groups to divert the traffic between the on-premises and AWS-hosted application. Divert 50% of the traffic to the new application in AWS and the other 50% to the application hosted in their on-premises infrastructure.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทลูกเมียน้อยจะย้ายตึกเว็บแอปจากออฟฟิศนายจ้าง (On-premises) ขึ้นสวรรค์ AWS Cloud (VPC ปัจจุบันเชื่อมท่อส่งตรง Direct Connect กลับบ้านไว้แล้ว)
เป้าหมายระดับเทพ: **"ต้องย้ายแอปเนียนๆ สมูทๆ ห้ามดับเด็ดขาด (Zero downtime)!"**
แผนการโคตรชั่วร้าย: **"งั้นกูจะแอบสับรางแบ่งคนละครึ่ง! ลูกค้า 50% ให้วิ่งไปป้าย AWS ดมของใหม่, ลูกค้าอีก 50% ให้มุดท่อกลับไปใช้แอปเก่าที่ออฟฟิศนายจ้าง!"** รอจนแน่ใจว่า AWS ของแทร่แล้วค่อยตบหัว 100% มาฝั่งใหม่!!
คำถาม: งัดวิชามารอะไรมาสับรางแบ่งเปอร์เซ็นต์แบบเป๊ะๆ ได้บ้าง (เลือก 2 ท่า)?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! พอเห็นคีย์เวิร์ดคำว่า **"สับรางแบ่งเปอร์เซ็นต์เป๊ะๆ หน้าแผง (percent / proportion / divert part of traffic) เช่น 50-50, 90-10"** 
- หวยในจักรวาล AWS มีแค่ 2 เทพเจ้าเท่านั้นที่ทำสแครชแผ่นแบ่งเปอร์เซ็นต์กระจายหน้าตาเฉยได้ คือ:
   1. **`Route 53 (Weighted routing policy)`** - ตัวพ่อสับรางป้ายรถเมล์บนทองฟ้า!
   2. **`Application Load Balancer (Weighted Target Groups)`** - ยามเฝ้าประตูที่ดื้อดึงสับรางเปอร์เซ็นต์ลงท่อ (รับ IP ลูกค้าฝั่งออฟฟิศ On-premises ผ่าน Direct Connect ได้สบายๆ)!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use Route 53 with Weighted routing policy...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! พระตำหนัก `Route 53 Weighted` นี่แหละพ่อบุญธรรมแห่งการแบ่งเค้ก! ตั้งน้ำหนัก Weight = 50:50 แม่งก็ส่งแขกแยกเขี้ยวไปฝั่งโลกใบเก่าออฟฟิศ กับฝั่งเมฆ AWS ได้เนียนกลิบ! หายนะไม่มีชิวๆ!

✅ **[ถูกต้อง] Use an Application Elastic Load balancer with Weighted Target Groups...**
- **ทำไมถึงถูก:** ขยี้จมูกรัวกบาล! ลุง `ALB` สมัยใหม่มันแดกสเตียรอยด์เพิ่มกล้ามแล้วฮะ! มันมีไพ่ตายชื่อว่า `Weighted Target Groups` ที่สามารถหารสัดส่วนคนเข้า 50-50 ลงตระกร้าหลังบ้านได้! และทีเด็ดคือตระกร้าหลังบ้าน (Target Group แบบ IP address)... มันสามารถชี้ทะลวงท่อ Direct Connect กลับไปหาเครื่องแอปหลังออฟฟิศนายจ้างได้เลยโว้ยย! มิกซ์แอนด์แมทช์สมบูรณ์แบบแจกคะแนนฟรี!

❌ **[ผิด] Use Route 53 with Failover routing policy...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ลูกแม่ค้า `Failover routing` มันเอาไว้เป็นพระรองซับน้ำตา "ถ้าเครื่องหลัก A ดับพังพินาศพินาศ... มึงถึงจะหักเลี้ยวหัวทิ่มไปหาเครื่องสำรอง B" โว้ย! มันไม่มีสมองมาสับตลับเมตรกางแบ่งเค้ก 50-50 หน้าสลอนแบบคนรวยทำหรอกฮะ! ผิดหลักไวยากรณ์สากล!

❌ **[ผิด] Use a Network Load balancer with Weighted Target Groups...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! ยาสามัญประจำบ้านพี่แว๊น `Network Load Balancer (NLB)` แม่งหูหนวกตาบอดเน้นซิ่งเร็วอย่างเดียวฮะ! กฎกระทรวงคือ "NLB **ไม่มี** ปุ่มออปชันให้ปรับระวิงเปอร์เซ็นต์ Weighted Target Groups" โว้ย! ฟีเจอร์ผู้ดีดัดจริตบ้าบอนี้มีแค่ใน ALB ฝั่งเดียวเท่านั้น! มั่วตั้วหน้าตาย!

❌ **[ผิด] Use AWS Global Accelerator to divert and proportion the HTTP and HTTPS traffic... Ensure that the on-premises network has an AnyCast static IP address...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! แม้ว่า `Global Accelerator` จะแอบมีท่าน้ำหนัก (Endpoint Weights) นะฮะ... **แต่ไอ้ชิบหายส้นตีนคือท่อนหลังฮะ!! "บังคับให้ออฟฟิศมึงอัญเชิญป้าย AnyCast IP หน้าหมู่บ้านหรอ!?"** บ้าบอคอแตก! ป้าย AnyCast IP มันเป็นของขลังที่ AWS เสกให้ใช้บนอินเทอร์เน็ตหน้าตึก AWS เองโว้ยย! ออฟฟิศพ่อมึงจะไปเสก AnyCast IP สร้างเองเพื่อรับ Direct Connect หอกหาเหวอะไร๊! เลอะเทอะสุดชีวิตจับเจ่าฮะ!  

---
---

## 📌 คำถามที่ 53
**โจทย์:**
A healthcare company manages patient data using a distributed system. The organization utilizes a microservice-based serverless application to handle various aspects of patient care. Data has to be retrieved and written from multiple Amazon DynamoDB tables.

The primary goal is to enable efficient retrieval and writing of data without impacting the baseline performance of the application as well as ensuring seamless access to patient information for healthcare professionals.

Which of the following is the MOST operationally efficient solution?

**ตัวเลือก:**
- [x] Utilize AWS AppSync pipeline resolvers
- [ ] Use CloudFront functions
- [ ] Set up DynamoDB connector for Amazon Athena Federated Query
- [ ] Launched AWS Lambda functions with an edge-optimized Amazon API Gateway

---
### 🎯 โจทย์ต้องการอะไร?
แอปหลังบ้านโรงพยาบาลกระจัดกระจาย (Microservice serverless) ใช้กระชากชิ้นเนื้อข้อมูลคนไข้ 
ปัญหาปวดหัว: "กูต้องแว้นมอเตอร์ไซค์ไปคุ้ยขยะในตาราง **`Amazon DynamoDB` หลายๆ โต๊ะ (multiple tables) เพื่อดึงและเขียนข้อมูลไปมา!**"
บอสสั่งกร้าว: "หาวิธีสูบฉีดข้อมูลจากหลายๆ โต๊ะแบบม้วนเดียวจบ โคตรประหยัดแรงงาน (MOST operationally efficient) และไม่ทำแอปหลักกากหน่วงสะดุดเท้าตัวเองให้กูเดี๋ยวนี้!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! เมื่อไหร่ก็ตามที่แอปดัดจริตร้องไห้กระซิกๆ ว่า **"อยากชงกาแฟแก้วเดียว (API ยิงตู้มเดียว) แต่แอบสั่งให้หลังบ้านวิ่งทะลวงคว้านไส้ดึงข้อมูลจากหลายๆ ฐานข้อมูล (Multiple data sources / tables) ไปรวบหัวรวบหางส่งกลับมาให้ที"**
- หน้ากากพระเอกที่เกิดมาเพื่อเคลียร์บิลยุ่งยากห่วงโซ่นี้คือ **`AWS AppSync` (โดยเฉพาะฟีเจอร์ไม้ตาย 'Pipeline Resolvers')** ฮะ! มันเป็นบริการทำ GraphQL ที่เก่งกาจเรื่องร้อยพวงมาลัยต่อจิ๊กซอว์ข้อมูลหลายซอกหลงมุมได้โคตรเซียนระดับบิดาแห่งมวลมนุษยชาติ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Utilize AWS AppSync pipeline resolvers**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราสวดมนต์ของ AWS เลยฮะ ลูกเล่น `Pipeline resolvers` ของคุณน้อง `AppSync` เอาไว้ยกเครื่องทำความสะอาด "ปัญหาลูกทุ่งที่แอปหน้าบ้านต้องวิ่งรอกสั่งงานหลายๆ ครั้งไปตามโต๊ะ DB"... พอเปลี่ยนมาใช้นางปุ๊บ หน้าบ้านยิงคำสั่ง GraphQL ป๊าบเดียว ตัวทะลวงไส้ Pipeline Resolvers จะวิ่งไปกวาดรวบรวมขยะจาก DynamoDB สามสี่ตารางมาแพ็คใส่กล่องโบว์แดงส่งกลับหน้าชื่นตาบานฮะ! ตอบรับเจตนารมณ์ความง่าย 100%!

❌ **[ผิด] Set up DynamoDB connector for Amazon Athena Federated Query**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! คุณแม่ `Amazon Athena` เป็นยานอวกาศเอาไว้คราดขยะดึงรายงานสอบสวนบน S3 ยาวๆ โว้ย! ถึงแม้พักหลังจะเปิดประตูหลัง `Federated Query` ให้ควักถาม DynamoDB ได้ด้วยก็ตามเถอะ... **"แต่มันเสือกทำได้แค่คราดอ่านสอบสวนเท่านั้น! (Read-only) มันเป็นง่อยไม่มีน้ำยาเอาไว้เขียนบันทึกข้อมูล (Write) ป้อนกลับลงโต๊ะ DynamoDB เด็ดขาดโว้ยยย!"** (โจทย์สั่งให้ต้องทั้ง Retrieve AND Write)! หักมุมดับอนาถตกเหวตายฮะ!

❌ **[ผิด] Launched AWS Lambda functions with an edge-optimized Amazon API Gateway**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! การเอายามเฝ้าประตู `Edge-optimized API Gateway` มันมีไว้เร่งสปีดเครื่องบินลด Latency กระจายจุดเข้าหน้าประตูทั่วโลก (CloudFront ลิ่วล้อ)... มันไม่ได้มีสรรพคุณพิเศษเหี้ยอะไรในการช่วยทะลวงเขียนดึงข้อมูล 10 ตารางของ DynamoDB ให้ประหยัดแรงงานใดๆ ทั้งสิ้นฮะ! มึงก็ต้องถลอกปอกเปิกไปเขียนโค้ดเหนื่อยปลาร้าแตกใน Lambda เองอยู่ดี! โง่ซ้ำซ้อน!

❌ **[ผิด] Use CloudFront functions**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านลิ่วล้อ `CloudFront Functions` เป็นแค่หน่วยรบจิ๋วหน้ากองด่านเอาไว้สับรหัสหัวจดหมาย (HTTP header manipulation/ URL rewrite) กระจิบกระจอก! มันไม่ได้มีเส้นสายพละกำลังหอบแฮ่กไปกระซวกปล้ำดึงคอหอยข้อมูลจากโต๊ะ DynamoDB เลยสักแอะฮะ อ่อนปวกเปียกผิดเวที!

---
---

## 📌 คำถามที่ 54
**โจทย์:**
A Solutions Architect joined a large tech company with an existing Amazon VPC. When reviewing the Auto Scaling events, the Architect noticed that their web application is scaling up and down multiple times within the hour.

What design change could the Architect make to optimize cost while preserving elasticity?

**ตัวเลือก:**
- [x] Change the cooldown period of the Auto Scaling group and set the CloudWatch metric to a higher threshold
- [ ] Add provisioned IOPS to the instances
- [ ] Upgrade the instance type in the launch template.
- [ ] Increase the base number of Auto Scaling instances for the Auto Scaling group

---
### 🎯 โจทย์ต้องการอะไร?
ลูกพี่ตรวจงานระบบ `Auto Scaling Group (ASG)` หน้าหม้อกระทะทองแดง
ปัญหาดราม่าปะทุ: **"ไอ้เวรแอปพลิเคชันกูแม่งบ้าสเตียรอยด์ผีเข้าผีออก! เดี๋ยวเด้งขยายเครื่องเพิ่ม (Scale up) เดี๋ยวถอนหายใจไล่เครื่องออก (Scale down) เด้งไปเด้งมาซอยยิกๆ เป็นสิบๆ รอบภายใน 1 ชั่วโมง!"**
เจ้านายสั่งสอน: "กูรำคาญตาเหลือเกิน ทำยังไงก็ได้ให้มันเลิกดิ้นเด้งไปมาเปลืองตังค์โดยใช่เหตุ แต่เวลารถติดหนักๆ ก็ยังต้องกางร่มรักษาความยืดหยุ่น (Elasticity) ไว้ด้วยนะเจ้านาย!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวง ASG เลยฮะ: "ถ้าแอปหน้ามืดเด้งเข้าเด้งออกรัวๆ ถี่ๆ (Scaling up and down multiple times / Flapping / Thrashing) แสดงว่าตูดมึงไวไฟขี้ตกใจเกินเหตุ!"
- ยาแก้แพ้ชงด่วน: 
  1. เพิ่ม **`Cooldown Period`** (ระยะพักใจ) ให้มันหน่วงหายใจลึกๆ ก่อนจะตัดสินใจสั่งรบใหม่ (ป้องกันการสั่งซ้ำซ้อนรัวๆ)
  2. ยกกำแพงปลุกผี **`Metric threshold`** ให้สูงขึ้น (เช่น จากเดิมขยายเมื่อ CPU > 50% ก็เปลี่ยนเป็นรอ CPU > 80% ค่อยหน้ามืดขยาย)... แค่นี้มันก็เลิกบ้าจี้หดขยายรัวๆ แล้วฮะ ชิวๆ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Change the cooldown period of the Auto Scaling group and set the CloudWatch metric to a higher threshold**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ก็คือยาแก้แพ้ครอบจักรวาลตามทริคข้างบนเป๊ะๆ ฮะ! ดื่มยาแก้หอบ `Cooldown period` เข้าไปเพื่อถ่วงเวลาให้ระบบเซ็ตตัวรอผลลัพธ์เครื่องเก่าให้บ่มสุกก่อน จะได้ไม่ลนลานแตกซิกเบิ้ลเครื่อง... และอัปคานเหล็ก `higher threshold` ให้ไม่ต้องตื่นตูมอ่อนไหวทุกปล้องหญ้า! แค่นี้ไข้ดิ้นรัวๆ ก็หายเป็นปลิดทิ้ง! 

❌ **[ผิด] Upgrade the instance type in the launch template.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงแหกตาดูโจทย์สิฮะ บอสร้องปาวๆ ว่า "ให้ช่วยรักษาเงินในกระเป๋าเมียด้วย (Optimize cost)"... การหน้ามืดเดินไปอัพเกรดหิ้งพระ `Instance type` ให้รวยหรูอู้ฟู่ขึ้น (เช่น จาก Small กลายเป็น Large ใหญ่โตมโหฬาร) แม่งแพงขึ้นฉิบหายบรรลัยพินาศเลยสิฮะ! แตะต้องข้อห้ามเจ้านายยับเยิน!

❌ **[ผิด] Increase the base number of Auto Scaling instances for the Auto Scaling group**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! มึงบ้าหรอฮะ!? การดันฝืนดึงลูกจ้างประจำ `Base number (Minimum capacity)` ให้เพิ่มขึ้นกองขยะไว้เยอะๆ ตลอดเวลาตั้งแต่เริ่ม... แปลว่ามึงต้องจ่ายตังค์จ้างเครื่องพวกนี้มายืนตบยุงหายใจทิ้งฟรีๆ ตอนเที่ยงคืนไม่มีแขกอะนะฮะ!? เปลืองเงินอ้วกแตกขี้แตก! ขัดแคมเปญ Optimize cost บรรลัยพินาศฮะ!

❌ **[ผิด] Add provisioned IOPS to the instances**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! มึงจะบ้าหรอฮะ ไปหอบเงินเปย์ซื้อกระสุนทองคำ `Provisioned IOPS (PIOPS)` ยัดตูดฮาร์ดดิสก์ EBS ให้หมุนจานหมุนเร็วขึ้นทำพระแสงอะไรฮะโง่จริง! มันช่วยแก้ปัญหา "ASG ดิ้นพล่านหดขยายตัวไวไฟเกินไป" ได้สักนิดไหมฮะ!? นอกจากจะไม่ลดยาใจสั่นแล้ว เสือกทำรายจ่ายทะลุดาวอังคารหนักกว่าเดิมอีก มั่วสุดขีด! 

---
---

## 📌 คำถามที่ 55
**โจทย์:**
A social media company needs to capture the detailed information of all HTTP requests that went through its public-facing Application Load Balancer every five minutes. The client's IP address and network latencies must also be tracked, while the load balancer's availability is monitored separately through the ELB health check. The captured data should be used for analyzing traffic patterns and for troubleshooting Docker applications orchestrated by the Amazon ECS Anywhere service.

Which of the following options meets the customer requirements with the LEAST amount of overhead?

**ตัวเลือก:**
- [x] Enable access logs on the Application Load Balancer. Integrate the ECS cluster with Amazon CloudWatch Application Insights to analyze traffic patterns and simplify troubleshooting.
- [ ] Integrate Amazon EventBridge metrics on the Application Load Balancer to capture the client IP address. Use Amazon CloudWatch GetMetricData to retrieve and analyze traffic-related metrics.
- [ ] Install and run the AWS X-Ray daemon on the ECS cluster. Use the Amazon CloudWatch ServiceLens to analyze the traffic that goes through the application.
- [ ] Enable AWS CloudTrail for their Application Load Balancer. Use the CloudTrail Lake to analyze and troubleshoot the application traffic.

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทยามอยากได้กล้องวงจรปิดแบบ HD ไวส่องแอบดูชาวบ้านดมกาวหน้าบ้าน **`Application Load Balancer (ALB)`** ตัวหน้าต่างรับแสง!
กติกาเจาะจงโคตรๆ: **"กูอยากได้ลิสต์จดหมายเข้าทั้งหมด! กูอยากรู้ชื่อป้ายทะเบียน (Client's IP Address) และเวลาจอดรถติดแหงก (Network latencies) มาดองรายงานให้กูทุกๆ 5 นาที!"**
เป้าหมายปลายทาง: นำร่องขยะพวกนี้ป้อนตูดพอร์ตท่อเข้าเครื่องจักรวิเคราะห์ส่องกล้อง เพื่อช่วยแงะซากปะการังไล่จับงี่เง่าของแอป **`Docker / Amazon ECS`**... (ขอเทคนิคมารที่ง่ายดาย ไม่ต้องเขียนสคริปต์วุ่นวายปวดกบาล!)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! มหากาพย์กล้องวงจรปิด AWS... 
  - ทันทีที่โจทย์ร้องหิวอยากซดน้ำซุป **"แอบขอลอกข้อมูลรายบุคคลที่วิ่งผ่าน Load Balancer (ELB/ALB) เช่น Client IP, Latency, เส้นทาง Request Path"** = คัมภีร์หน้าเดียวที่ทำได้ตั้งแต่สมัยพระเจ้าตากคือปุ่มกดลับ **`Enable Access Logs` แถมโยนดองใส่ตะกร้า S3 ฟรีๆ ทุกๆ 5 นาทีตามที่ขอเป๊ะ!!** (ถ้าไปเลือก CloudTrail แม่งสอบตกทันทีเพราะพี่แกมีไว้บันทึกแค่ 'ยามไหนมากดปิดเปิดปุ่ม' ไม่ได้ซดน้ำซุปข้อมูลชาวบ้าน)
  - แถมตีบวกลูกเมียน้อยวิเคราะห์วิบากกรรม (Troubleshoot ECS) ด้วยของเล่นเทพ **`Amazon CloudWatch Application Insights`** ที่มันทำผังรูปภาพแจกจ่ายฟรีฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Enable access logs on the Application Load Balancer. Integrate the ECS cluster with Amazon CloudWatch Application Insights...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราสวดมนต์ของทริคเป๊ะ! ติ๊กปุ่มเปิด `Access Logs` ปากประตู ALB แม่มก็จะดูดหลักฐานบัตรประชาชน IP ปิงแบนวิธพ่นหราลงหม้อ S3 ให้อัตโนมัติทุกๆ 5 นาทีแบบไม่ต้องเขียนสคริปต์สักซีก!... ส่วนหางโจทย์ก็ตีกรรเชียงเอาเทวดา `CloudWatch Application Insights` มาคุมเลนส่องกล้องพฤติกรรม ECS แค่นี้ก็ปิดซอยเลี้ยงตอบรับเงื่อนไข 100% ฮะ!

❌ **[ผิด] Enable AWS CloudTrail for their Application Load Balancer. Use the CloudTrail Lake...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงอัญเชิญตำรวจมาจับคนขี้หรอฮะ!? ตลับเทป `AWS CloudTrail` แม่งคือยามรักษาการณ์ **"ตรวจจับคนหน้าด้านที่แอบมากดลบ/เปลี่ยนการตั้งค่ารีโมทแปลกๆ บน AWS แดชบอร์ด (API Events)"** โว้ย!! มันไม่มีกระบอกเลนส์ซูมขี้ตามาจดบันทึก **"ไอ้สมชาย IP หน้าบ้านลูกค้าที่เพิ่งกดตะกร้าสั่งกางเกงในหน้าเว็บ!"** บ้าบอคอแตกอะไรทั้งนั้น มึงจับสลับกระบอกปืนแล้วฮะโง่จริง! 

❌ **[ผิด] Integrate Amazon EventBridge metrics on the Application Load Balancer to capture the client IP address...**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! มึงเอานกฮูก `EventBridge` แบกวิทยุวอทหารมาเสกจับ Client IP หรอฮะ!? EventBridge แม่งเป็นไปรษณีย์ส่งจดหมายตื่นตระหนกข้ามกระทรวงตามเงื่อนไข (Rule) โว้ย มันไม่ได้มีกะเพาะยักษ์บันทึกดองไฟล์ดักฟัง IP แฉกเช่นกะละมัง Access Logs แต่อย่างใด มั่วซั่วจับแพะชนแกะฮะ!

❌ **[ผิด] Install and run the AWS X-Ray daemon on the ECS cluster. Use the Amazon CloudWatch ServiceLens...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญเอ็กซเรย์ร่างกระตุก `AWS X-Ray` มันคือสายลับปลอกคอหมาที่เอาไว้เจาะลึกทะลวงไส้ "วิญญาณโค้ดในแอปพลิเคชัน (Microservices tracing)" เพื่อหาปมหน่วงช้าตามท่อภายใน! ซึ่งต่อให้มึงฝังปลอกคอหมาตัวนี้ลงแอปเสร็จ... มึงก็ **แหกตาซดข้อมูลบันทึกรอยเท้า Client IP จากหน้าอก ALB ไม่ได้โว้ยย!!** ขาดจิ๊กซอว์ฝั่งหน้าประตูบ้านพังพินาศพินาศฮะ! 

---
---

## 📌 คำถามที่ 56
**โจทย์:**
A company plans to use Route 53 instead of an ELB to load balance the incoming request to the web application. The system is deployed to two EC2 instances to which the traffic needs to be distributed. You want to set a specific percentage of traffic to go to each instance.

Which routing policy would you use?

**ตัวเลือก:**
- [x] Weighted
- [ ] Failover
- [ ] Geolocation
- [ ] Latency

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสั่งกติกาอินดี้: "กูจะไล่ยาม `ELB` ออก แล้วหันมาเทิดทูนป้ายรถเมล์ `Route 53` เป็นคนสับรางโอนหน้าหน้าไม้แทน!"
กติกาเจาะจงโคตรๆ: มีตึก EC2 สองชั้นรับแขก... **"กูอยากจะบงการตั้งค่าตัวเลข 'สัดส่วนเปอร์เซ็นต์แบบเป๊ะๆ' (specific percentage of traffic) ในการโยนคนไปสับรางซ้ายขวาให้เครื่องสองตัวนี้ดื้อๆ!"**
คำถาม: งัดออปชัน Route 53 ตัวไหนมาปรนเปรอตัณหาความเป๊ะนี้ดีวะฮะ!?

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! ของโคตรแจกฟรีโบนัสสิ้นปีฮะ! 
- ส่องหาคีย์เวิร์ดกระแทกตูด: **"แบ่งแขกแจกเป็นเศษส่วนเปอร์เซ็นต์เป๊ะๆ (Set specific percentage / proportion)"**
- หวยจักรวาลตกไปอยู่ที่แชมป์เปอร์เซ็นต์เดียวบนแผง Route 53 คือท่าไม้ตาย **`Weighted Routing Policy`** ล้านเปอร์เซ็นต์ฮะ!! (ลากเส้นตั้งตัวเลขน้ำหนัก Weight ซ้ายขวาป๊าบเดียวจบ ขี้ฟันมาก!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Weighted**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ก็คือยาแก้แพ้ครอบจักรวาลตามทริคข้างบนเป๊ะๆ ฮะ! ลูกพี่ `Weighted` สันดานมันคือให้เรากดตลับเมตรกรอกตัวเลขสัดส่วนโยนลงกระเป๋าตามชอบใจ (เช่น มึงให้เครื่องกาก 20, เครื่องเทพ 80 ...มันก็จะเกณฑ์ฝูงชนวิ่งทะลวงเข้าสัดส่วนนี้เป๊ะเสมือนพระเจ้าดลบันดาล)! ตรงตามคำขอ 100% เลยฮะ ขี้หมูขี้หมามาก!

❌ **[ผิด] Failover**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! ท่ากันชนรถชน `Failover` เอาไว้หลบหัวทิ่มตอนตายฮะ! "ยามปรกติกูดันแขกเข้าเครื่องหลัก 100% เน้นๆ ...แต่วันไหนเครื่องหลักดับสลบเหมือด กูก็หักเลี้ยวหัวทิ่มโกยแขก 100% เข้าเครื่องสำรองแทนแบบหน้าด้านๆ"! มึงเห็นมันมีกระติ่งสมองงัดเครื่องคิดเลขสับเปอร์เซ็นต์ 70-30 อย่างที่คุณชายหน้าหนอนบอสใหญ่อยากได้ตรงไหนฮะ!?

❌ **[ผิด] Geolocation**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! มึงตาปลาดุกหรอฮะ!? ลูกข่ายดูหมอ `Geolocation` มันใช้บัตรประชาชนดูรากเหง้าแผ่นดินเกิดโว้ย! "อ๊ะ ลูกค้าอยู่ทวีปเอเชีย โยนวิ่งไปเซิฟเวอร์สิงคโปร์... ลูกค้าฝรั่งมังค่ายุโรป โยนแสกหน้าไปกรงลอนดอน"! ไม่เกี่ยวหอยหลอดอะไรกับการนั่งตัดเค้กแบ่งเปอร์เซ็นต์เป๊ะๆ เลยสักนิด ผิดหลักไวยากรณ์ฮะ!

❌ **[ผิด] Latency**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านสายซิ่ง `Latency` เอาไว้เตะเสยวิ่งสปีดฮะ! แม่งแอบจับเวลาหลังบ้านให้ว่า "ลูกค้าคนนี้มันอยู่ใกล้ศูนย์หน้าป้ายไหน (วิ่ง Ping แล้วได้สปีดเร็วกว่า Latency น้อยสุด) กูก็เตะส่งให้เครื่องนั้นรับแขกซะ จะได้ไม่อ้อยอิ่ง"! ซึ่งก็ไม่อยู่ในเงื่อนไขการหั่นแบ่งเปอร์เซ็นต์ดื้อๆ อยู่ดีฮะ บ้าบอ!

---
---

## 📌 คำถามที่ 57
**โจทย์:**
A company has recently adopted a hybrid cloud architecture and is planning to migrate a database hosted on-premises to AWS. The database currently has over 50 TB of consumer data, handles highly transactional (Online Transaction Processing – OLTP) workloads, and is expected to grow. The Solutions Architect should ensure that the database is ACID-compliant and can handle complex application queries.

Which type of database service should the Architect use?

**ตัวเลือก:**
- [x] Amazon Aurora
- [ ] Amazon DynamoDB
- [ ] Amazon Redshift
- [ ] Amazon RDS

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังเกณฑ์กองทัพจะอพยพฐานข้อมูลตึกเก่าดินเหนียว ขึ้นดอย AWS
ภาระแบกหลังหัก: มึงเอ้ยย! ฐานข้อมูลก้อนนี้แม่งมีขยะศพลูกค้าใหญ่โตฟาดไป **กว่า 50 TB++!!**... ไม่พอเสือกเป็นระบบบันทึกบิลซื้อขายปืนกลซอยยิกๆ ทุกวินาที **`(OLTP / Highly transactional)`** และแน่นอนอนาคตมีแต่จะใหญ่บวมฉุเป็นหมูตอน!
เงื่อนไขเจ้านายด่า: "มึงต้องหาโต๊ะฐานข้อมูลหน้าใหม่ที่... 1. คุยภาษา SQL เทพๆ แทงทะลุบิลสับซ้อนได้ (complex queries) / 2. เสิร์ฟกติกาความเป๊ะสากลของความถูกต้องเด็ดขาด **`(ACID-compliant)`** ให้กูด้วย!"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! เจอสเป็คซูเปอร์คาร์ล้นหลามขนาดยี้ ท่องคาถาเทพเจ้าวงการฐานข้อมูล AWS ไปเลยพี่น้อง:
  - โจทย์สั่งความเรื่องมาก: **`OLTP` + `ACID-compliant` + ตีคำสั่ง SQL สับซ้อนหัวแตก (`Complex Queries`)** = เป็นของวิเศษฝั่ง Relational Database (RDS / Aurora)! (ขีดฆ่า DynamoDB / Redshift ทิ้งลงดอยไปก่อนโลด)
  - ความสยองขั้นสุดท้าย: **"ขี้ก้อนยักษ์ขนาดกว่า 50 TB และเสือกเบ่งบานโตขึ้นเรื่อยๆ แหนะ (expected to grow)!"** = อนิจจา! โต๊ะ RDS โง่ๆ ตัวลุงมันตันรับแดกปลาหมึกได้ยัดเต็มกระเพาะสูงสุดแค่ "16 TB ต่อตาราง" โว้ย!... ดังนั้นหวยหามจึงต้องตกไปหานางฟ้าปั้นพอร์ช **`Amazon Aurora`** ที่เสกกระเพาะสำรองหดขยายกลืนกินช้างระยำได้สูงสุดทะยานถึง "128 TB" ต่อก้อนอัตโนมัติ (Auto-scaling storage)!! แชมป์โลกจบที่ตัวนี้ฮะ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Amazon Aurora**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! พระมารดา `Aurora` นางกวาดเรียบทุกกระเบียดนิ้วฮะ! เป็นฐานข้อมูลสายเลือด Relational ชั้นสูง (ตอบรับ ACID และ OLTP 100%) แทงคิวรี่ SQL วิจิตรพิสดารแตกฟองแค่ไหนก็เอาอยู่... และหมัดน็อคดาวน์คือ ท้องแม่นางจุแน่นหนานุ่มฟู เบ่งขยายตัวเองอัตโนมัติดูดกลืนซากศพข้อมูล 50 TB ได้เสบยๆ จนทะลุเพดานทะยานไปถึง 128 TB โว้ยย!! ลอยแพหนีลุง RDS กระจอกๆ ไม่เห็นฝุ่นฮะ!

❌ **[ผิด] Amazon RDS**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! แม้ว่าคุณปู่ `Amazon RDS` จะพยายามกระดิกหางเสิร์ฟกฎหมาย ACID / OLTP ให้ได้ก็เถอะ... **แต่ไอ้ฉิบหายกระเพาะปู่มันตีบตันฮะ!! ปู่แกแดกจุยัดเครื่องในตารางนึง (table engine) ปริ่มๆ ได้มากสุดราวๆ 16 TB หรือถ้าขวขิดๆ ก็ไปตันแหว่งๆ อยู่ดี!!** มึงจะเอาภูเขาศพ 50 TB++ ไปยัดรูก้นปู่แก แกก็ระเบิดขี้แตกสวดอภิธรรมสิฮะ บ้าบอคอแตกเสี่ยงตายสุด! 

❌ **[ผิด] Amazon DynamoDB**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! แม้น้องเต่า `DynamoDB` จะเป็นยอดมนุษย์กินจุไร้ขีดจำกัดนะฮะ... **แต่นางเป็น NoSQL สายเถื่อนโว้ย!! นางไม่รู้จักท่าฟ้อนรำคำสั่ง "ซ้อนตารางซับซ้อน (complex application queries - JOINs)" เหี้ยอะไรทั้งนั้นฮะ!!** ถามปุ๊บหน้ามุ่ยคว่ำโต๊ะปั๊บ! ใช้งานผิดประเภทอย่างรุนแรงฮะ! 

❌ **[ผิด] Amazon Redshift**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญโกดังยักษ์ `Amazon Redshift` (Data Warehouse) แม่งมีกระเพาะระดับประเทศจริงฮะ... **แต่มันเกิดมาเพื่อดองสรุปวิเคราะห์ข้อมูลย้อนหลัง (`OLAP`) นานๆ กินทีโว้ยย!!** ขืนมึงสั่งให้ลูกปืนกล `OLTP` (ระบบยิงจดบันทึกยอดชำระตังค์โอนเงินยิกๆๆ เสี้ยววิ) ไปสะกิดแทงตูดโกดังยักษ์ Redshift รัวๆ แม่งก็จะกระอักเลือดอืดเป็นหอยทากสำลักตายห่าทันทีฮะ ผิดฝาผิดตัวเว้ย!! 

---
---

## 📌 คำถามที่ 58
**โจทย์:**
An investment bank has a distributed batch processing application which is hosted in an Auto Scaling group of Spot EC2 instances with an SQS queue. You configured your components to use client-side buffering so that the calls made from the client will be buffered first and then sent as a batch request to SQS. What is a period of time during which the SQS queue prevents other consuming components from receiving and processing a message?

**ตัวเลือก:**
- [x] Visibility Timeout
- [ ] Processing Timeout
- [ ] Component Timeout
- [ ] Receiving Timeout

---
### 🎯 โจทย์ต้องการอะไร?
ธนาคารแห่งนึงมีแอปทำกับข้าวแจกจ่าย (batch processing) หมกตัวอยู่บนฝูง `EC2 Spot` หน้าหม้อ และผูกแอกล่ามจดหมายกระปุกหมู `SQS queue` ไว้ป้อนข้าว
คำถามทฤษฎีแจกคะแนนอนุบาล: **"ใน SQS มันจะมีช่วงจังหวะเวลาซอมบี้อึมครึมนึงเว้ยย... ที่พอมีคนเดินมาหยิบจดหมายไปแดกแล้วป่อง! SQS จะเสกมนต์ผ้าคลุมล่องหน 'ซ่อนจดหมายฉบับทิ้งไว้ชั่วคราว ป้องกันไม่ให้แร้งลง (prevent other consuming components) มารุมดึงซ้ำซ้อน!!' ไอ้ก้อนเวลาซอมบี้นี้ มึงมีชื่อเรียกทางวิชาการว่าหยังวะ!?"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้าโง่ๆ เลยฮะ! ไม่มีอะไรต้องวิเคราะห์เยอะ 
- กฎแห่งกระทรวง SQS: ช่วงเวลาพรางตัวหลบหน้าหลบตาซ่อนตัวชั่วคราวให้แอดมินคนแรกหอบไปรันงานแอบๆ **จนกว่าจะกดคอนเฟิร์มลบจดหมาย (หรือหมดเวลาเด้งกลับมากองคืน)**... กาลเวลานั้นเรียกว่า **`Visibility Timeout`** โว้ย!! ท่องเวทมนตร์ 3 พยางค์นี้ขึ้นใจ จบการรายงาน!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Visibility Timeout**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราสวดมนต์เป๊ะฮะลูกพี่! `Visibility Timeout` ก็คือเวลาซ่อนตัวพรางตัว (ค่ามาตรฐานคือ 30 วินาที) ที่กางร่มบังแดดให้พนักงานหอบจดหมายไปเคี้ยวสบายๆ โดยไม่มีหมาตัวไหนเพื่อนร่วมงานคนไหนมาแย่งบิลสลิปไปตีหน้าช้ำทำซ้ำฮะ! ตอบตรงเผง!

❌ **[ผิด] Processing Timeout / Component Timeout / Receiving Timeout**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? ไอ้ชื่อปัญญาอ่อนประดิษฐ์ขึ้นมามั่วๆ **Processing / Component / Receiving Timeout แม่งไม่มีสถิตหน้าสารบบวงการ AWS SQS บ้าบอคอแตกอะไรทั้งนั้นโว้ยยย!!** อาจารย์คงนึกสนุกแต่งนิยายมั่วหน้าตายมาหลอกเด็กอมมือฮะ ปัดทิ้งลงโถส้วมเดี๋ยวนี้!

---
---

## 📌 คำถามที่ 59
**โจทย์:**
A company plans to deploy a Docker-based batch application in AWS. The application will be used to process both mission-critical data as well as non-essential batch jobs.

Which of the following is the most cost-effective option to use in implementing this architecture?

**ตัวเลือก:**
- [x] Use ECS as the container management service then set up a combination of Reserved and Spot EC2 Instances for processing mission-critical and non-essential batch jobs respectively. 
- [ ] Use ECS as the container management service then set up Spot EC2 Instances for processing both mission-critical and non-essential batch jobs. 
- [ ] Use ECS as the container management service then set up Reserved EC2 Instances for processing both mission-critical and non-essential batch jobs. 
- [ ] Use ECS as the container management service then set up On-Demand EC2 Instances for processing both mission-critical and non-essential batch jobs. 

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทกำลังจะชิงสุกก่อนห่าม หิ้วตระกร้า `Docker` มาปั่นสลัดรันงานรัวๆ (batch application)
เจ้านายสั่งกติกาแยกส่วน: "เห้ย! งานกูแบ่งระดับชั้นวรรณะนะโว้ย! รังนึงคือ **'งานคอขาดบาดตายห้ามเจ๊งพังเด็ดขาด (mission-critical)'**... อีกรังนึงคือ **'งานกระหลั่วต่ำต้อย ทิ้งช้าข้ามวันก็ไม่เป็นไร (non-essential batch jobs)'**"
บอสมองตาขวาง: **"กูอยากคุมงบให้ประหยัดจนตัวซีดจางที่สุดในสามโลก (most cost-effective) มึงจัดขบวนแห่ขันหมากลูกน้องมาให้เป๊ะที่สุดในหมวดหมู่นี้สิ๊!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! ไดอะล็อกสุดอมตะของการควบรถม้า EC2 ฮะ!
   - โจอี้บอยของจริง **(Mission-critical)** ห้ามตายห้ามล้มห้ามสาย = มึงต้องใช้ของประหยัดที่เสถียรมั่นคงอย่างลัทธิ **`Reserved EC2 Instances` (ผูกสัญญาเช่าเครื่องตายตัว ได้ส่วนลดกระจายแต่วางใจได้ล้านเปอร์เซ็นต์)**
   - ทาสรับใช้รองบ่อน **(Non-essential)** หมาตายควายล้มชะงักรอได้ = มึงอัญเชิญพระกาลมารคอหอย **`Spot EC2 Instances` (ตั๋วขอทานราคาลด 90% แต่โดน AWS ถีบประหารชีวิตตัดสายได้ทุกเมื่อ)** มาโง้งรับจ๊อบผีพลางๆ แม่งเลย! 
- บทสรุป: ผสมผสานสองโลกเข้าด้วยกัน **"Combination of Reserved and Spot"** แม่งคือสุดยอดกระบี่เย้ยยุทธจักรความขี้ตืด AWS ฮะ!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Use ECS as the container management service then set up a combination of Reserved and Spot EC2 Instances for processing mission-critical and non-essential batch jobs respectively.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามสูตรรักทริคข้างบน 100% เลยฮะ!! แบ่งเค้กได้ฉลาดแกมโกงสุดขีด: งานพระราชาโยนให้ลูกทุ่ง Reserved Instances (เหมาเข่งสัญญาประหยัดและเสถียร). ส่วนงานขยะมูลฝอยก็โยนไปให้ลูกเมียน้อย Spot Instances (เสี่ยงตายทิ้งขว้างแต่ล่อราคาถูกขี้ตีน 90%)... ประสานพลังร่วมกันผ่านร่างทรง `Amazon ECS` ควบคุมคอนเทนเนอร์ แบบนี้บอสกอดคอร้องไห้ซึ้งใจน้ำตาแตกฮะ!

❌ **[ผิด] Use ECS as the container management service then set up Spot EC2 Instances for processing both mission-critical and non-essential batch jobs.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงหน้ามืดตาฝางเห็นแก่ตังค์เกินโว้ยฮะ!! แม้ตั๋วยาจกหน้าส้วม `Spot EC2` แม่งจะถูกที่สุดในสามโลก... **แต่มึงจะฝืนเอางานคอขาดบาดตายระดับชาติ (mission-critical) ไปแขวนกบาลไว้บนตั๋ว Spot เลวๆ ที่พร้อมจะโดน AWS ระเบิดดึงปลั๊กแท้งออกกลางอากาศบัดเดี๋ยวนั้นได้หรอฮะ!?** ระบบหลักฉิบหายพินาศสลบเหมือดสิฮะโง่จริง!

❌ **[ผิด] Use ECS as the container management service then set up Reserved EC2 Instances for processing both mission-critical and non-essential batch jobs.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! มึงบ้าหรอเจ้านาย!? แม้ท่าผูกสัญญา `Reserved` แม่งจะถูกกว่าซื้อกินรายวัน (On-Demand)... แต่มึงจะประสานล่อเหมารัง Reserved เลี้ยงข้าวคลุกกะปิ **'งานขยะกระจอกข้ามคืน (Non-essential)'** ไปด้วยทำไมเพื่อวะฮะ!? ในเมื่อพระเจ้าประทานพรตั๋วขอทาน 90% จ่ายทิ้ง Spot มาให้ประหยัดกว่าบานตะไท! พลาดความถูกระดับจักรวาลไปน่าเสียดายตีมือรัวๆฮะ! 

❌ **[ผิด] Use ECS as the container management service then set up On-Demand EC2 Instances for processing both mission-critical and non-essential batch jobs.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุเลยคุณน้า! ตั๋วทัวร์ชั่วคราว `On-Demand` แม่งคือตั๋วเครื่องบินฟูลไพรซ์ ราคาแพงบาดคอหอยที่สุดในแผงลอตเตอรี่ EC2 โว้ยย!! ถ้ามึงซัด On-Demand เหมารวบทั้งกระบิแบบหูหนวกตาบอด... แล้วมึงจะเอาหน้าไหนไปเคลมกับเจ้านายว่า "มึงทำสถาปัตยกรรมระดับซุปเปอร์ Most Cost-Effective สุดยอดปรมาจารย์ประหยัดวะฮะ!?" ทิ้งลงชักโครกไปเลยฮะคำตอบนี้!

---
---

## 📌 คำถามที่ 60
**โจทย์:**
A company plans to implement a hybrid architecture. A dedicated connection needs to be created from the Amazon Virtual Private Cloud (VPC) to the on-premises network. This connection must provide high bandwidth throughput and a more consistent network experience than Internet-based solutions.

Which of the following can be used to create a private connection between the VPC and the company's on-premises network?

**ตัวเลือก:**
- [x] AWS Direct Connect
- [ ] Transit VPC
- [ ] AWS Site-to-Site VPN
- [ ] Transit Gateway with equal-cost multipath routing (ECMP)

---
### 🎯 โจทย์ต้องการอะไร?
บริษัทจะสร้างเรือนหอสองแผ่นดิน (Hybrid architecture)
ปัญหาชีวิตฮะ: กูต้องการมุดดินท่อสายยาง "ลากเส้นตรงสูบฉีด (Dedicated connection) ดิ่งทะลวงลูกกรงป่าอเมซอน VPC มุดกลับไปหาออฟฟิศนายจ้าง (on-premises)" แบบส่วนตั๊วส่วนตัว!
เงื่อนไขพรีเมียมตัวแม่: **"กูขอเลนท่อด่วนพิเศษ รุมทึ้งรถสิบล้อโคตรมันส์ (High bandwidth throughput) และต้องเสถียรนิ่งสงบ ดุจดั่งตู้ไทม์แมชชีนห้ามกระตุกกระพริบด่าแม่เน็ตหลุดเด็ดขาด (more consistent than Internet-based solutions)!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของแจกแต้มอนุบาล 1! ถ้าทำข้อสอบตัวนี้คือล่อเป้าโง่ๆ เลยฮะ 
- คาถาไม้ตายแห่งชาติ: ทันทีทีในโจทย์ฟาดงวงฟาดงาคำว่า **"Dedicated connection / High bandwidth / ไม่ต้องง้อ ไม่ต้องเสี่ยงรถติดดมควันบนสี่แยกอินเตอร์เน็ต (bypass internet/more consistent)"**
- พระเอกซุปเปอร์ฮีโร่ผู้รับเหมาขุดเจาะท่อแสงสายไฟเบอร์ส่วนตัวทะลวงประเทศ ตัวเก่งตัวเดียวของ AWS ในเคสนี้ก็คือ **`AWS Direct Connect`** เท่านั้นฮะ! มันคือการลากสายสลิงตรงจากออฟฟิศมึงไปปักอกห้องเซิร์ฟเวอร์ AWS ดื้อๆ ไม่แคร์ใครในโลกหล้า! 

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] AWS Direct Connect**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ก็คือยาแก้แพ้ครอบจักรวาลตามทริคข้างบน 100% เลยฮะ! นายจ้างอ้อมกอด `Direct Connect` แม่งปั้นสายไฟเบอร์ใต้น้ำฉนวนทองแดง มึงจะได้เลนส่วนตัวไม่ปะปนพวกตาสีตาสาอินเตอร์เน็ต ทำให้เสถียรขั้นเทพ (Consistent) และอัดแบนวิธโยนคลิปช้างปั้นป่วนทะลุทะลวง (High bandwidth) ตอบทุกรูขุมขมเจ้านายเป๊ะ! 

❌ **[ผิด] AWS Site-to-Site VPN**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงแหกตาดูโจทย์สิฮะ บอสร้องปาวๆ ว่า "กูขยะแขยงสี่แยกพ่นมลพิษอินเตอร์เน็ตนะเว้ย!"... แต่คุณน้องรถตู้ `Site-to-Site VPN` แม่งเสือกวิ่งโยกคลอนผสมโรงจามพ่นน้ำลายอยู่บนสะพานลอย **'Public Internet'** สาธารณะโว้ยย!! ถ้าวันไหนเน็ตหน้าปากซอยประท้วงรถติดขัด... ไอ้ VPN บ้านี่ก็กระตุกพินาศย่อยยับตามตูดชาวบ้านไปด้วยทันที! (ไม่ Consistent) สอบตกข้อห้ามขั้นรุนแรงฮะ! 

❌ **[ผิด] Transit VPC / Transit Gateway with equal-cost multipath routing (ECMP)**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้สถานีหมอชิต `Transit Gateway / Transit VPC` แม่งเป็นแค่ "พนักงานสับสวิทช์รางรถไฟศูนย์กลาง" เอาไว้ถักทอเส้นด้ายร้อยมาลัยผูกมิตรกับ VPC เป็นรังนกกระจอก!... แต่วิญญาณเนื้อแท้ของมัน **ไม่ได้เสกมนต์สร้าง 'ท่อสายไฟเบอร์ส่วนตัวพาดผ่านมหาสมุทรลงดิน (Dedicated hardware line)'** ลงไปหาออฟฟิศนายจ้างหรอกเว้ยย!! มึงก็ต้องถ่อไปควานซื้อ Direct Connect หรือ VPN มาเสียบตูดมันอยู่ดีเพื่อเดินทาง! มั่วหน้าตายจับชนโครมฮะ! 

---
---


# 📝 AWS Solutions Architect Associate - Practice Exam 5 (Part 7: ข้อ 61 - 65)

เอกสารนี้สรุปและอธิบายข้อสอบแต่ละข้ออย่างละเอียด เพื่อให้ง่ายต่อการอ่านและทำความเข้าใจ พร้อมทริคการจับคีย์เวิร์ดสำหรับทำข้อสอบแบบรวดเร็ว

---

## 📌 คำถามที่ 61
**โจทย์:**
A company has an application hosted in an Auto Scaling group of Amazon EC2 instances across multiple Availability Zones behind an Application Load Balancer. There are several occasions where some instances are automatically terminated after failing the HTTPS health checks in the ALB and then purges all the ephemeral logs stored in the instance. A Solutions Architect must implement a solution that collects all of the application and server logs effectively. She should be able to perform a root cause analysis based on the logs, even if the Auto Scaling group immediately terminated the instance.

What is the EASIEST way for the Architect to automate the log collection from the Amazon EC2 instances?

**ตัวเลือก:**
- [x] Add a lifecycle hook to your Auto Scaling group to move instances in the Terminating state to the Terminating:Wait state to delay the termination of unhealthy Amazon EC2 instances. Configure a CloudWatch Events rule for the EC2 Instance-terminate Lifecycle Action Auto Scaling Event with an associated Lambda function. Trigger the CloudWatch agent to push the application logs and then resume the instance termination once all the logs are sent to CloudWatch Logs.
- [ ] Add a lifecycle hook to your Auto Scaling group to move instances in the Terminating state to the Pending:Wait state to delay the termination of the unhealthy Amazon EC2 instances. ...
- [ ] Add a lifecycle hook to your Auto Scaling group to move instances in the Terminating state to the Terminating:Wait state ... Set up AWS Step Functions to collect the application logs ...
- [ ] Add a lifecycle hook to your Auto Scaling group to move instances in the Terminating state to the Terminating:Wait state ... Set up the AWS Systems Manager Run Command service to run a script ...

---
### 🎯 โจทย์ต้องการอะไร?
ดราม่าปะทุ: เครื่อง EC2 รันอยู่ในล้อเกวียน `Auto Scaling Group (ASG)`
ความระยำคือ: พอมันสะดุดหน้ามืดตาเหลือก (Failing ALB health check)... **น้อง ASG สายโหดก็จะเตะกระบอกปืน "ประหารชีวิต (Terminated)" เครื่องทิ้งห่าลงถังขยะแบบกระชากคอหอยทันที!!**
ผลกรรม: ทำให้กู **"เก็บซากศพประวัติ (logs) ในเครื่องไม่ทันโว้ย!!"** ศพล่องหนหายไปกับตา! อยากจะสอบสวนคดีว่าเหตุมันตายเพราะเหี้ยอะไรก็ไม่ได้! (root cause analysis)!! 
บอสสั่งกร้าว: **"หาวิธีสวดอภิธรรมศพหน่วงเวลามันไว้แป๊บดิ๊ (EASIEST way)! ขอเวลายืนดูดบุหรี่ให้ระบบส่ง Logs มาเก็บที่ส่วนกลางก่อน... แล้วมึงค่อยถีบศพสับสวิตช์ฆ่ามันทิ้งของจริง!"**

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! เจอคำร้องงอแง **"อยากยื้อเวลาลมหายใจเฮือกสุดท้ายดึงเชงของ EC2 ไว้แป๊บนึง ก่อนโดนประหารชีวิต (delay the termination / wait to collect logs)"**
- คาถาไม้ตายยื้อความตายคือ: **`Lifecycle hook (Terminating:Wait)`** (สั่งเชือกคล้องคองดแขวนคอชั่วคราว) + ท่าหอบของง่ายสุดคือ **`CloudWatch Agent`** (ให้เด็กขนของยกขยะ Logs หนีเตลิดออกมาใส่ตู้เย็นให้เสร็จ)... จบภารกิจปุ๊บก็ปล่อยเชือกแขวนคอตายห่าตามปรกติ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Add a lifecycle hook to your Auto Scaling group to move instances in the Terminating state to the Terminating:Wait state... Trigger the CloudWatch agent to push the application logs...**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามสูตรรักทริคข้างบนฮะ!
  1. โยนสัญญาสงบศึกชั่วคราว `Lifecycle hook (Terminating:Wait)` ยื้อชีวิตศพ EC2 ให้ค้างติ่งไว้ (delay termination)
  2. แอบกระซิบต่อสายด่วน `CloudWatch Events rule` สั่งยิงปืนยาสลบ `Lambda`
  3. ปลุกวิญญาณเด็กรับใช้ประจำเครื่อง **`CloudWatch agent`** ให้อ้วกพ่นขยะสมบัติ Logs หอบหนีไปเก็บก้อนเมฆเร็วเข้า! หยิบเสร็จปุ๊บก็สั่งประหารสับเครื่องตายซาก (resume termination) แบบปิดจ๊อบสวยงามเนียนสบัด!

❌ **[ผิด] ...move instances in the Terminating state to the Pending:Wait state... Set up an AWS Systems Manager Automation script...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงหลงป่าเผาบ้านตัวเองหนีหนูหรอฮะ!? มึงแหกตาดูป้ายสเตจชีวิตฮะ! ไอ้สถานะตื่นตูม **`Pending:Wait`** เนี่ย แม่งคือสเตจ **"ทารกกำลังจะลืมตาดูโลก (ตอนที่เครื่องกำลังจะถูกสร้าง Scale-Out)"** โว้ย!! มึงเอาทารกไปคลุมผ้าขาวห่อศพรอการประหารสับคอสิ้นใจ (Scale-In / Terminating) หรอฮะ!? จับแพะชนแกะผิดวัยอย่างร้ายแรงฮะ สมองกลับทิศฮะ!

❌ **[ผิด] ...Set up AWS Step Functions to collect the application logs and send them to a CloudWatch Log group.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ลูกเมียน้อย `AWS Step Functions` แม่งคือร่างทรงจิ๊กซอว์ร้อยคิวงาน (Workflow orchestrator)!! ถ้อยคำปะติดปะต่อที่มึงจะบอกว่า "เอาสเต็ปฟังก์ชัน ไปเก็บล็อคจากในเครื่อง EC2" แม่งเป็นกรรมกรปีนกำแพงส้นตีนมากฮะ! ในเมื่อมึงมียาสามัญพระเจ้าอย่าง `CloudWatch Agent` สร้างมาดูดขยะให้อัตโนมัติแล้ว มึงจะถ่อสังขารไปเขียนร้อยคิวบ้าบอทำหอกอะไรแพงๆ ฮะ โต้แย้งกติกา EASIEST อย่างจังฮะ!

❌ **[ผิด] ...Set up the AWS Systems Manager Run Command service to run a script that collects and uploads the application logs...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านบ้าเพาเวอร์ `Systems Manager Run Command` แม่งก็แอบทำตัวโชว์พาวเสกสคริปต์ลงเครื่องไปเก็บกวาดขยะ logs ได้เหมือนกันฮะ... แต่มึงจะเหนื่อยตั้งหน้าตั้งตา **"เขียนสคริปต์ซับซ้อนทิปโท (run a custom script) แล้วพ่นทิ้ง CloudWatch"** ไปทำไมฮะ!? ในเมื่อกระทรวง AWS สอนไว้ว่ายาประคบประหงมง่ายและเพอร์เฟ็กต์ที่สุดก็คือกรรมกรตัวแม่ `CloudWatch Agent` หอบของหนีโว้ย!! อย่าทำเรื่องง่ายให้เป็นเรื่องพินาศบัดซบฮะ เลิกฝันกวีซับซ้อน! 

---
---

## 📌 คำถามที่ 62
**โจทย์:**
An e-commerce company’s Chief Information Security Officer (CISO) has taken necessary measures to ensure that sensitive customer data is secure in the cloud. However, the company recently discovered that some customer Personally Identifiable Information (PII) was mistakenly uploaded to an S3 bucket.

The company aims to rectify this mistake and prevent any similar incidents from happening again in the future. Additionally, the company would like to be notified if this error occurs again.

As the Solutions Architect, which combination of options should you implement in this scenario? (Select TWO.)

**ตัวเลือก:**
- [x] Identify sensitive data using Amazon Macie and create an Amazon EventBridge (Amazon CloudWatch Events) rule to capture the SensitiveData event type.
- [x] Set up an Amazon SNS topic as the target for an Amazon EventBridge (Amazon CloudWatch Events) rule that sends notifications when the error occurs again.
- [ ] Identify sensitive data using Amazon GuardDuty by creating an Amazon EventBridge (Amazon CloudWatch Events) rule to include the CRITICAL event types from GuardDuty findings.
- [ ] Set up an Amazon SQS as the target for an Amazon EventBridge (Amazon CloudWatch Events) rule that sends notifications when the error occurs again.
- [ ] Set up an AWS IoT Message Broker as the target for an Amazon EventBridge (Amazon CloudWatch Events) rule that sends notifications when the SensitiveData:S3Object/Personal event occurs again.

---
### 🎯 โจทย์ต้องการอะไร?
ดราม่าปะทุระดับชาติ: "ไอ้ชิบหายส้นตีน! พนักงานมือบอนเสือกอัปโหลดไฟล์ลับ **`Personally Identifiable Information (PII)`** (ข้อมูลบัตรประชาชน / เลขบัตรเครดิต) ไปประจานทิ้งเรี่ยราดหน้าบอร์ดตุ่มน้ำ S3 ยับเยินฮะ!"
เจ้านายสั่งกติกาเพิ่มเตาปฏิกรณ์: "กูจะเอาเรื่องนี้ให้ถึงที่สุด! หาวิธี **'จับทุจริตแสกนหาขยะ PII หลุดลอยพวกนี้แบบหน้ามืด (identify sensitive data)'** ให้กู! และถ้าจับได้คาหนังคาเขา... มึงช่วยแผดเสียงร้องโหยหวนแหกปากเตือนเจ้านาย (Notified) กูด้วย! (เลือกมา 2 ชิ้นส่วนประกอบร่าง)"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับคอขาดบาดตายซ้ำซาก! เจอสเป็คแสกนทะลวงไส้กะโหลก S3 ท่องคาถาเทพเจ้ายันต์กันผีไปเลยพี่น้อง:
  - 1. **`Amazon Macie`**: ยอดมนุษย์เครื่องเอ็กซเรย์หมาดมกาวตาเพชรแห่งจักรวาล S3! มันเกิดมาเพื่อควานหาฉกฉวยไฟล์โป๊, ไฟล์ข้อมูลส่วนตัวมนุษย์ **`(PII, Credit Cards, Secrets)`** ล้วนๆ ล้านเปอร์เซ็นต์โว้ย!!
  - 2. **`Amazon SNS`**: พ่อหนุ่มระฆังไฟไหม้ตื่นตูม! หมาดมกาว Amazon Macie จับผีตาโบ๋ได้ -> โยนเรื่องแจ้งตำรวจสภ. `EventBridge` -> ปิดจ๊อบสั่งกระทืบกระดิ่งไฟไหม้ **`Amazon SNS`** ให้โหยหวนส่ง SMS ด่าแม่ปลุกเจ้านายถึงเตียงนอน! แม็กซ์แอนด์แมนช์ประสานงานลื่นไหลโช๊ะๆ 2 สเต็ปฮะจบ!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Identify sensitive data using Amazon Macie and create an Amazon EventBridge... rule to capture the SensitiveData event type.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราสวดมนต์เป๊ะฮะลูกพี่! นางรำ `Amazon Macie` สร้างมาเพื่อแสกนดมกลิ่นเนื้อหาเรต R (ข้อมูลส่วนตัวมนุษย์ / PII) ในกระดาน S3 โดยเฉพาะ! เจอปุ๊บนางก็กรี๊ดรายงานผีเข้า `SensitiveData event` เข้าแผงควบคุมโว้ย! แชมป์โลกจบที่ตัวนี้ฮะ ชิ้นส่วนที่หนึ่ง!

✅ **[ถูกต้อง] Set up an Amazon SNS topic as the target for an Amazon EventBridge... rule that sends notifications when the error occurs again.**
- **ทำไมถึงถูก:** ขยี้จมูกรัวกบาล! ชิ้นส่วนจิ๊กซอว์แผ่นที่สองก็มาดุดัน! เมื่อ EventBridge จับเสียงกรี๊ดแจ้งว่ามีคนอัปไฟล์โป๊แล้วปุ๊บ... มันก็ส่งซิกปลุกตะเบ็งเสียงปืนใหญ่ `Amazon SNS` (พระเอกนักแฉประจำหมู่บ้าน) เพื่อร้องโหยหวนแจ้งเตือน (Notifications) สะกิดผู้พิทักษ์สันติราษฎร์ให้ตื่นตัวมาลบรอยด่างพร้อยทันทีฮะ ตอบปรารถนาบอสตรงเผง!

❌ **[ผิด] Identify sensitive data using Amazon GuardDuty...**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงแหกตาดูความสามารถมันสิฮะ บอสร้องปาวๆ "อยากจับหาเนื้อหาขยะไฟล์โป๊ PII ในถัง S3 นู่นน"... ไอ้ตำรวจสายตรวจ `GuardDuty` แม่งเสือกเก่งแค่จับโจรขโมยกุญแจบุกออฟฟิศ ยิงพอร์ตสแกนหน้าตึก บรุทฟอร์ซทุบหน้าต่าง AWS (Account hijacking / Threat detection)... แต่มันเสือก **ไม่มีกะเพาะเครื่องเอ็กซเรย์เจาะหา "เนื้อหา PII ทะลวงไฟล์" แบบลูกเทพ Macie ส้นตีนอะไรเลยโว้ยย!!** มึงจับคนมาส่องผิดเวทีพินาศสุดฮะ!

❌ **[ผิด] Set up an Amazon SQS as the target for... sends notifications when the error occurs again.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้สวะกระปุกออมสิน `Amazon SQS` แม่งเป็นกระป๋องทิ้งจดหมายดองดึกตู้ไปรษณีย์ เอาไว้รอชาติหน้ากว่าจะมีคนมางัดอ่าน! มึงจะให้มัน "ประเคนร้องโหยหวนเตือนภัย (Real-time notifications)" แบบไลฟ์สดเด้งเข้ามือถือเจ้านายได้เหรอฮะไอ้บ้า!? สับเครื่องผิดฮะ ผิดประเภทอย่างรุนแรงพังพินาศ!

❌ **[ผิด] Set up an AWS IoT Message Broker as the target for an Amazon EventBridge...**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้าน "AWS IoT Message Broker"... มึงเป็นเชี้ยอะไรไปลากหมาแมวฝั่งตู้เย็นสมาร์ทโฮม กระติกน้ำร้อนบลูทูธ (IoT / Internet of Things) มาร้องโหยหวนรับจดหมายแจ้งเตือนไฟล์ S3 โป๊โว้ยยย!! ผิดหลักดาวอังคารอภิมหาหลุดวงโคจรเลยคุณน้า บ้าบอคอแตก!

---
---

## 📌 คำถามที่ 63
**โจทย์:**
A health organization is using a large Dedicated EC2 instance with multiple EBS volumes to host its health records web application. The EBS volumes must be encrypted due to the confidentiality of the data that they are handling and also to comply with the HIPAA (Health Insurance Portability and Accountability Act) standard.   

In EBS encryption, what service does AWS use to secure the volume's data at rest? (Select TWO.)

**ตัวเลือก:**
- [x] By using Amazon-managed keys in AWS Key Management Service (KMS).
- [x] By using your own keys in AWS Key Management Service (KMS).
- [ ] By using the SSL certificates provided by the AWS Certificate Manager (ACM).
- [ ] By using S3 Server-Side Encryption.
- [ ] By using S3 Client-Side Encryption.
- [ ] By using a password stored in CloudHSM.

---
### 🎯 โจทย์ต้องการอะไร?
โรงพยาบาลยักษ์ใหญ่เปิดห้องผ่าตัดบนแผงวงจร `EC2` ห้อยสายน้ำเกลือเสียบตูดเข้าฮาร์ดดิสก์ `EBS Volumes`!
ความเรื่องมากบังเกิด: เพราะเก็บข้อมูลไข่คนไข้ (Confidential) ตามกติกากระทรวงนางพยาบาล (HIPAA) กะโหลกฮาร์ดดิสก์พวกนี้ **"แม่งบังคับต้องร่ายมนต์สวมถุงยางเข้ารหัสลับปิดปากถ้ำห้ามรัวขุดพ่น (Encrypted data at rest)"!!**
คำถามบ๊องแบ๊ว: ทายซิ๊... "พระเจ้า AWS งัดวิชาลูกกรงขังเหี้ยอะไรมาใช้เสกคาถาล็อกประตูฮาร์ดดิสก์ EBS (Volume encryption) วะฮะ?" (เลือก 2 ท่าที่ถูกต้อง)

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดบนหน้าตำราสวดมนต์ AWS Certification! 
- กฎแห่งความตาย: เมื่อไหร่ก็ตามที่โจทย์พ่นภาษาพิลึกพิสดาร **เจาะยิงเป้าลงกระดองฮาร์ดดิสก์ "EBS Encryption (Data at rest)"** 
- หวยจักรวาลตกไปอยู่ที่นายช่างตีกุญแจผีเบอร์หนึ่งลูกพี่ **`AWS Key Management Service (KMS)`** เท่านั้นเว้ย!! (S3 ดูกากไปเลย) ซึ่งเจ้า KMS มันเป็นโคตรพ่อโคตรแม่สวิงกิ้งเปิดออปชันให้มึงกระแทกกุญแจได้ 2 ท่าหมาบ้าเลยฮะ คือ:
   1. กุญแจผีตราประทับ AWS ตีให้เองฟรีๆ **`(Amazon-managed keys)`**
   2. กุญแจผีนอกคอกที่มึงดัดจริตรีดเหล็กตีเอามาเองจากบ้าน **`(Customer-managed keys / Your own keys)`**

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] By using Amazon-managed keys in AWS Key Management Service (KMS).**
✅ **[ถูกต้อง] By using your own keys in AWS Key Management Service (KMS).**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูกคู่ดูโอ้เลยฮะ! ลุงฮาร์ดดิสก์ `EBS` ทั้งเผ่าพันธุ์มันเกี่ยวก้อยสาบานตนเป็นเมียน้อยลับๆ ให้กับ `KMS` ตั้งแต่กำเนิดฮะ! พอจะแปลงกายเข้ารหัสล็อกฮาร์ดดิสก์ปุ๊บ มึงก็แค่แบมือขอกุญแจผีสำเร็จรูป **(Amazon-managed)**... หรือถ้าเป็นคนเรื่องมากขี้ระแวงมึงก็พกแม่กุญแจมาคล้องล็อกบ้านเอง **(Your own keys)** ได้หมดหน้าตัก AWS โค้งคำนับให้ 100% ตอบข้อห้ามถูกเป๊ะ!

❌ **[ผิด] By using S3 Server-Side Encryption. / By using S3 Client-Side Encryption.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! มึงตาปลาดุกหรอฮะ!? ลูกแม่ค้า `S3 Encryption` มันเอาไว้เสกคาถาร่มกันกระสุนใส่ขี้ดินถังขยะนรกแตก **`Amazon S3 Object`** โว้ย!! มันเสือกมาปีนเกลียวก้าวล้ำก่ายอาณาเขตกล่องฮาร์ดดิสก์ก้อนเหล็ก `EBS Volumes` เครื่อง EC2 คนอื่นเขาได้ยังไงวะฮะ!? มั่ววงเวียนเผ่าพันธุ์ฉิบหายวายป่วงฮะ!

❌ **[ผิด] By using the SSL certificates provided by the AWS Certificate Manager (ACM).**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญประจำบ้านกระสุนตาโบ๋ `ACM (SSL certificates)` มันใบเบิกทางป้ายโฆษณาหน้าวัด เอาไว้เบิกเนตรสะกดวิญญาณเปิดวาปเสากระโดงทะลวง **"เกราะขนส่งตอนกำลังวิ่งเล่นไปมา (Data In-Transit / HTTPS)"** ระหว่างคนกับเซิฟเวอร์โว้ยย!! มันไม่มีปัญญาตีกระบานล็อกก้อนศพหีบสมบัตินอนนิ่งๆ ใต้ดิน (Data at Rest) ใน EBS บ้าบออะไรนั่นหรอกฮะ! ผิดวัตถุประสงค์รุนแรง!

❌ **[ผิด] By using a password stored in CloudHSM.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ไอ้สวะเครื่องฮาร์ดแวร์กระโหลกหนา `CloudHSM` แม่งเป็นตู้เซฟยักษ์เก็บความลับกุญแจรหัสชั้นบรรยากาศ (Keys) ของบริษัทมหาเศรษฐี... มันไม่ได้รับฝากอมขี้ฟันกระจอกๆ อย่าง **"ฝากจดรหัสผ่าน (password)"** บ้าบออะไรนี่เลยนะเว้ย (กุญแจ กับ หรัสผ่าน คนละโลกฮะ)!! มึงหลุดกรอบลากไถลไปดาวอังคารทิ้งโถส้วมเดี๋ยวนี้! 

---
---

## 📌 คำถามที่ 64
**โจทย์:**
A company has a web application hosted on a fleet of EC2 instances located in two Availability Zones that are all placed behind an Application Load Balancer. As a Solutions Architect, you have to add a health check configuration to ensure your application is highly-available.

Which health checks will you implement?

**ตัวเลือก:**
- [x] HTTP or HTTPS health check
- [ ] ICMP health check
- [ ] TCP health check
- [ ] FTP health check

---
### 🎯 โจทย์ต้องการอะไร?
เจ้านายสรรสร้างเว็บแอปกระจายทั่วสองอาณาเขต 
แผงหน้าด่านบัญชาการใช้ยามรักษาการณ์รุ่นใหม่ระดับคริสตัล: **`Application Load Balancer (ALB)`** ตัวแม่ฮะ!
เจ้านายสั่งกติกาเพิ่มเติ่ม: "มึงไปหาเข็มฉีดยามาทิ่มตูดจับไข้ (Health check) ลูกน้อง EC2 หลังบ้านดิ๊... ดูว่ามันกระดิกตัวสบายดีไหลตายหรือเปล่า?"
คำถามโง่ๆ ทดสอบความรู้เบสิก: "และไอ้เข็มฉีดยาจับไข้ที่ยาม ALB ยอมปักให้... แม่งเสือกเป็นเข็มฉีดยาตระกูลสเป็คไหนวะคะ!?"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงระดับแจกแต้มอนุบาล 1! ตำราสวดมนต์บทแรกของกระทรวงยามเฝ้าประตูเลยฮะ!
- **ALB (Application Load Balancer) = ชาติตระกูลผู้ดีตีนแดง ชั้นที่ 7 (Layer 7)** แม่งเข้าใจภาษาดอกไม้ผู้ดีเท่านั้น!! ดังนั้นเวลาทะลวงจิ้มตูดถามสารทุกข์สุกดิบ มันจะยอมสปีดภาษาทักทายไข้จับหยาบๆ แค่ **`HTTP` และ `HTTPS`** (แอปพลิเคชันเว็บ) องครักษ์ผู้พิทักษ์เพียงสองคนเท่านั้นฮะ หยาบคายกว่านี้ไม่รับคุย! 
- (ถ้าเจ้านายอยากกวนตีนจิ้มตูดรัน TCP หรือ UDP ต้องไปวอนขอลุงแว๊น NLB - Network Load Balancer นู่น!)

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] HTTP or HTTPS health check**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามตำราแจกของฟรีเป๊ะๆ!! ยามผู้ดี `ALB` มีสติปัญญาระดับ Layer 7 จมูกไวคุยภาษาคน HTTP/HTTPS ซูฮกซอกซอนเข้าไส้! พอจะกระซวกแหกตูดส่ายหาอาการไข้ (Health check) แม่งก็เลือกพ่นเข็มตรวจไข้รหัส Layer 7 ดื้อๆ เลยฮะ ง่ายปานปอกกล้วยเข้าปาก!

❌ **[ผิด] TCP health check**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! มึงแหกตาดูป้ายโจทย์สิฮะ บอสบอกว่า ALB เว้ย! แต่คาถากระซวกไส้ป่าเถื่อน `TCP Health Check` หรือเช็คปิง IP ถ่อยๆ แม่งเป็นรสนิยมลัทธิพี่แว๊นเด็กส่งของชั่วคราว **`Network Load Balancer (NLB)` / ลุงปู่ Classic Load Balancer (CLB)** โว้ยย!! ลายเซ็นไม่ตรงเผ่าพันธุ์ ALB ผู้สูงส่งฮะ กระเด็นออกไปเลย!

❌ **[ผิด] ICMP health check / FTP health check**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! ยาสามัญปาหี่ `ICMP (Ping สะกิดกะโหลก)` หรือ `FTP (ถังขยะโยนไฟล์รันเข้าออก)` แม่งเอ๊ยย... AWS โหลดบาลานเชอร์หน้าไหนในโลกนี้เขายอมให้ใช้ปะการังพวกนี้มาแหกรูก้นเชื้องไข้ (Health check target) กันวะฮะ!? บิดเบือนความจริงกวนส้นตีนสุดชีวิต กราดยิงแพะแกะพินาศยับฮะ! 

---
---

## 📌 คำถามที่ 65
**โจทย์:**
A company is running a batch job on an EC2 instance inside a private subnet. The instance gathers input data from an S3 bucket in the same region through a NAT Gateway. The company is looking for a solution that will reduce costs without imposing risks on redundancy or availability.

Which solution will accomplish this?

**ตัวเลือก:**
- [x] Remove the NAT Gateway and use a Gateway VPC endpoint to access the S3 bucket from the instance.
- [ ] Re-assign the NAT Gateway to a lower EC2 instance type.
- [ ] Replace the NAT Gateway with a NAT instance hosted on a burstable instance type.
- [ ] Deploy a Transit Gateway to peer connection between the instance and the S3 bucket.

---
### 🎯 โจทย์ต้องการอะไร?
ลูกหาบกรรมกร EC2 นอนซมไข้ติดเตียงอยู่ใน **`Private Subnet` (โซนป่าช้ามืดมิด ไร้แสงอาทิตย์อินเตอร์เน็ตเข้าถึง)**
พฤติกรรมสุดสิ้นเปลือง: อ้ายนี่มันบ้ากาม! วันๆ เอาแต่นำบิลมุดร้อยท่อต่อสายน้ำเกลือเสียตังค์แพงๆ ทะลุด่านตึกปริมณฑล **`NAT Gateway`** เพื่อออกไปสูดขยะดึงของบนฟ้า `Amazon S3` ก้อนเมฆหน้าประตูป่าส้นตีน (เสียทั้งค่าเปิด NAT ชั่วโมงละเกือบสิบบาท แถมเสียค่าบิลสูบ Data ขี้ก้อนราย GB อ้วกแตก!!)
เจ้านายคิ้วขมวด: "ไอ้สัส! มึงช่วยหากิมมิคอะไรมาถล่มทุบคอหอยมัน... **ช่วยลดราคาค่าแดกไฟมันหน่อยสิวะ (reduce costs)! แต่ห้ามลดคุณภาพถึกทนความตอแหลของแดน S3 (redundancy) ด้วยนะ!**"

### 🗝️ ทริคจับ Keyword หาคำตอบไว
- ทริค: ของคู่ผัวตัวเมียเบอร์แรงที่สุดกระดูกงูหัก! มหากาพย์ขุนพันธ์ AWS ฉายรังสี: 
- ทันทีที่โจทย์ร้องปวดกบาลเรื่อง **"EC2 จากหลุมศพ Private Subnet นั่งซดมาม่าคุยแชทมุดท่อกับ 1) `Amazon S3` นอกป่า หรือ 2) `Amazon DynamoDB` ข้ามทวีป... แล้วเสือกโหยหวนจ่ายค่าบิลตู้ `NAT Gateway` เป็นแสนจนกระอักเลือด อยากลดค่าใช้จ่ายรัวๆ!"** 
- หวยจักรวาลล้านเปอร์เซ็นต์ตกไปที่ไม้ตายสับหัวแหลก: **เตะสวะแพงระยับ `NAT Gateway` ทิ้งลงส้วมซะ!! แล้วอัญเชิญท่อวิเศษวาร์ปฟรี (ไม่มีค่าเช่าชั่วโมง ไม่คิดค่าเปิดห้อง) อย่างเทพเจ้า `Gateway VPC endpoint`** แทงอุโมงค์ปรู๊ซดิ่งทะลวงตูด S3 ลับตาคนไปดื้อๆ แบบไม่ต้องอ้อมโผล่หน้าถนนหลวงให้เปลืองส้นตีน แถมปลอดภัยระดับโลกใต้บาดาลฟรีค่าไฟอีกต่างหาก!!

### 💡 อธิบายแต่ละตัวเลือก

✅ **[ถูกต้อง] Remove the NAT Gateway and use a Gateway VPC endpoint to access the S3 bucket from the instance.**
- **ทำไมถึงถูก:** ต่อยฮุกสลบคาหมัด! เป๊ะทะลุแกนกระดูก! ตามคัมภีร์รักทริคด้านบนรัวๆ ฮะ! ปิดตำนานทิ้งไพ่ตู้แพงกระจอก NAT Gateway ลงบ่อ! แล้วอัดท่อพลังลมปราณวาร์ปดำดิน `Gateway VPC endpoint (สร้างมาร่ายยาวฟรีแถมทนทานหายห่วง)` ยิงดิ่งล่วงลูกศรเข้าประตูหลัง S3 ตรงๆ แบบไม่ผ่านสี่แยกสะพานลอยให้ชาร์จค่าผ่านทางหน้าด้านๆ แม้แต่สตางค์แดงเดียวฮะ! ลดค่าไฟกระจายตอบเจตนารมณ์สมบูรณ์แบบแจกคะแนนฟรี!

❌ **[ผิด] Replace the NAT Gateway with a NAT instance hosted on a burstable instance type.**
- **ทำไมถึงผิด:** เอากาวตราช้างหยอดตา! กาตายงี่เง่ามากครึ่งใบ! แม้ว่าปู่ `NAT Instance` กระจอกๆ กระโหลกกะลา (เสียบลงเครื่อง EC2 ขโมยเน็ตบ้าน) มันอาจจะราคาถูกกว่าตู้ยักษ์ NAT Gateway อยู่นิดนึงก็ตาม... **แต่ไอ้ชิบหาย!! มันเสือกไม่กันตายโว้ยย!! ถ้าเครื่อง NAT instance แม่งสลบหัวฟาดพื้นดับ (Single point of failure) = ลูกบ้านทั้งหมดในซอยหลุมผีก็ข้ามสะพานเข้า S3 ไม่ได้พินาศตายห่าทั้งบาง!!** ซึ่งมันละเมิดข้อห้ามคำสาปนายจ้างที่สั่งไว้เด็ดขาดว่า "มึงห้ามกระเทือนเสี่ยงตายหลุดถอดปลั๊กกูนะ (without imposing risks on redundancy/availability)" เสี่ยงคุกติดตะรางสุดชีวิตฮะ!

❌ **[ผิด] Deploy a Transit Gateway to peer connection between the instance and the S3 bucket.**
- **ทำไมถึงผิด:** เอากระโถนครอบหัวเล่น! เลอะเทอะกันไปใหญ่! สถานีหมอชิตปั๊มตั๋วรวมมิตร `Transit Gateway` หน้าที่มันคือเสกเวทมนต์สานตาข่ายลากสายเชื่อมเพื่อนบ้านร้อยเกาะ AWS 20 กรุงเข้าหากันเป็นใยแมงมุมโว้ย!! มึงเอาค้อนธอร์กะเบือนบ้านมาเสกท่อโยงแแชทกับเพื่อนปริมณฑลกะพริบๆ อย่างโกดัง `S3 bucket` มันบ้าบอจับแพะชนไดโนเสาร์อักเสบฮะ ผิดกระบวนท่าพินาศ! 

❌ **[ผิด] Re-assign the NAT Gateway to a lower EC2 instance type.**
- **ทำไมถึงผิด:** ขี่อีแต๋นบุกดาวอังคาร! สมองไหลบวมฉุฮะ! ตู้ท่อประปาอัดฉีดเน็ต `NAT Gateway` แม่งเป็น "สินค้าสำเร็จรูป (Fully managed)" ที่พระอินทร์ AWS เทปูนเสกมาให้เว้ยย!! มึงเป็นใครไปชี้หน้าร้องขอหดเปลี่ยนไส้ในเครื่องตึก "เอ้ยย! กูลดคอหอยดึงสเปค EC2 มึงปั้มราคาถูกๆ หน่อยดิ๊!"... บ้าบอ!! **ระบบแม่งไม่มีหน้าจอตัวเลือกให้ปรับแต่งแงะไส้เลือก EC2 type ของ NAT Gateway เหี้ยอะไรเลยทั้งสิ้นฮะ!!** ปิดตายจินตนาการทิ้งโถส้วมเดี๋ยวนี้โว้ย!

---
---


