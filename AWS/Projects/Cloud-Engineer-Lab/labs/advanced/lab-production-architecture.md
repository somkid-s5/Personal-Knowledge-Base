# 🔥 Production-Ready Web Architecture (Thai) 🇹🇭
> **Scenario**: "การออกแบบสถาปัตยกรรมสำหรับระบบ E-Commerce ระดับ Enterprise ที่ต้องการความเสถียร 99.99%"

## 🏗️ Architecture Diagram (สถาปัตยกรรมระบบ)
```text
User → [Route53] → [CloudFront] → [S3 (Static Assets)]
                      ↓
               [ALB (Load Balancer)]
                      ↓
               [Auto Scaling Group]
          (EC2 Instance A | EC2 Instance B)
                      ↓
               [RDS (Multi-AZ)]
          (Primary DB | Standby DB)
```

---

## 📈 Scenario & Scale (การรองรับโหลด)
- **Estimated Traffic**: 10,000 – 20,000 users/day
- **Peak Load**: 300 – 500 requests/second (ช่วงที่มีแคมเปญใหญ่หรือ Flash Sale)
- **Performance Thinking**: 
    - ระบบถูกออกแบบให้ขยายตัวแบบ **Horizontal Scaling** (เพิ่มจำนวนเครื่อง) แทนที่จะเพิ่มขนาดเครื่อง (Vertical) เพื่อรองรับโหลดที่พุ่งสูงขึ้นแบบทันทีทันใด
    - **Potential Bottleneck**: ในระดับ 500 req/s คอขวดมักจะไปอยู่ที่ **Database Connection Pool** และ **I/O Latency** ของดิสก์ ดังนั้นการทำ Query Optimization และการใช้ **ElastiCache (Redis)** เพื่อช่วยลดภาระ DB จึงเป็นทางเลือกที่ต้องพิจารณา

### 📉 Performance Impact: ผลลัพธ์ก่อนและหลังปรับจูน
| ตัวชี้วัด (Metrics) | ก่อนปรับจูน (Before) | หลังปรับจูน (After - Optimized) |
| :--- | :--- | :--- |
| **Database CPU Load** | 85 - 90% (เสี่ยงค้าง) | 25 - 30% (เหลือพื้นที่สเกล) |
| **Average Page Load** | 3.5 Seconds (ช้าจนลูกค้าหนี) | **800 Milliseconds** (p95) |
| **Max Concurrent Users** | ~2,000 (เริ่มเจอ Error 5xx) | **10,000+** (นิ่งและเสถียร) |
| **Data Transfer Cost** | สูง (เพราะโหลดจาก App ตลอด) | **ลดลง 40%** (เพราะใช้ CloudFront Caching) |

---

## ⚖️ Design Decisions (Trade-offs & Decisions)

### 1. ALB vs NLB
- **Decision**: เลือกใช้ **ALB** เพราะเราต้องการความสามารถในระดับ Application Layer (Layer 7) เช่น การทำ SSL Termination และ Path-based routing
- **Trade-off**: แม้ NLB จะรองรับ Load ได้มหาศาลกว่า (หลักล้าน req/s) และ Latency ต่ำกว่ามาก แต่ความซับซ้อนในการจัดการในระดับ App จะสูงขึ้น ซึ่งสำหรับเว็บแอปทั่วไป ALB ตอบโจทย์ได้คุ้มค่ากว่า

### 2. Multi-AZ: Cost vs Availability
- **Decision**: เลือก **Multi-AZ** เป็นมาตรฐานขั้นต่ำ
- **Trade-off**: ต้องจ่ายค่า Data Transfer ข้าม Availability Zone แต่แลกมาด้วยความมั่นใจว่าธุรกิจจะไม่หยุดชะงัก (Business Continuity) หากเกิดเหตุการณ์ไฟไหม้หรือน้ำท่วมที่ Data Center แห่งใดแห่งหนึ่ง

### 3. CloudFront Benefits
- **Decision**: ใช้ CloudFront ขวางหน้าทุกทรัพยากร
- **Trade-off**: เพิ่มขั้นตอนในการทำ Deployment (ต้องล้าง Cache) แต่ช่วยประหยัดค่า Bandwidth ขาออก (Data Transfer Out) ของ AWS ได้มหาศาล และลดโหลดของเครื่องเซิร์ฟเวอร์จริงได้เกิน 50% สำหรับไฟล์ Static

---

## 🚨 Incident Report: "The Health Check Loop of Death" (บทเรียนจากความผิดพลาดจริง)
**เหตุการณ์**: ช่วง Deployment เที่ยงคืน ทีมงานมีการอัปเดตโค้ดใหม่ แต่ลืมเช็คว่า Path สำหรับ Health Check เปลี่ยนไป
- **Symptom (อาการ)**: 
    - เครื่องใหม่ Deploy ขึ้นมา → ALB เช็ค Health Check ไม่เจอ (404) → ALB มองว่า Unhealthy → ASG สั่ง Terminate เครื่องทิ้งทันที
    - ASG พยายามเปิดเครื่องใหม่มาทดแทน → วนลูปเดิม (Launch -> Kill -> Launch)
    - จนกระทั่งเครื่องเวอร์ชันเก่าถูกไล่ลบจนหมด ทำให้ทั้งเว็บไซต์ **ล่ม 100% (Error 503)**
- **The Fix (การแก้ไข)**: 
    - แก้ไข Target Group ให้ชี้ไปที่ Path ที่ถูกต้องอย่างเร่งด่วน และเปลี่ยนนโยบายการ Health Check ให้ยืดหยุ่นขึ้นในช่วง Deploy
- **Lesson Learned (สิ่งที่ได้เรียนรู้)**: 
    - **"อย่าฝากชีวิตไว้กับ Health Check ที่ซับซ้อนเกินไป"** จงใช้ Endpoint ง่ายๆ เช่น `/ping` หรือ `/health` ที่แยกขาดจาก Business Logic เพื่อให้ระบบ Infra ยังคงรันอยู่ได้แม้แอปจะพังบางส่วน

---

## 🛡️ High Availability & Failure Simulation (การทนทานต่อความล่มสลาย)

### 🔴 กรณี EC2 Instance ล่ม (Instance Crash)
- **Impact**: Traffic บางส่วนอาจจะ Drop ชั่วคราว
- **Recovery**: ALB จะตรวจพบผ่าน **Health Check** (Unhealthy) และหยุดส่ง Traffic ทันที จากนั้น ASG จะสั่ง Launch เครื่องใหม่ทดแทน (Self-healing) ภายในเวลาไม่เกิน 2-3 นาที

### 🔴 กรณี Data Center ล่ม (AZ Failure)
- **Impact**: พลังการประมวลผลหายไปครึ่งหนึ่ง (หากรัน 2 AZ)
- **Recovery**: ASG จะสร้างเครื่องใหม่ใน AZ ที่ยังเหลืออยู่โดยอัตโนมัติ ระบบยังคงรันต่อได้โดยไม่ต้องมีคนเข้ามาแก้ไข (No manual intervention)

---

## 🧯 Troubleshooting (Advanced Debugging Flow)

**Symptom: ผู้ใช้งานเข้าเว็บไซต์ไม่ได้ (ขึ้น Error 502/504)**

**Step-by-Step Analysis:**
1. **Edge Check**: เช็ค CloudFront ว่ายังส่ง Traffic มาที่ ALB หรือไม่? (ดู Error Rate ใน CF Metrics)
2. **Network Check**: ทดลอง `telnet` หรือ `nc` ไปที่ ALB DNS Name เพื่อดูว่าพอร์ต 443 ยังตอบสนองไหม
3. **Compute Check**: เข้าไปดูที่ **Target Group** หากพบว่าสถานะเป็น `Unhealthy`:
    - ไปเช็ค **Security Group** (พอร์ต 80/443 และพอร์ตของ App)
    - เช็ค **Health Check Path** (แอปตอบ 200 OK หรือไม่?)
4. **Log Analysis**: ตรวจสอบ CloudWatch Logs ของแอปเพื่อหาข้อความ Error (เช่น DB Timeout, Out of Memory)

---

## 💡 Insight (Production Experience - เจ็บมาเยอะ เรียนรู้มาจริง)
1. **Health Check Strictness**: อย่าตั้งให้เข้มงวดเกินไปในช่วงแรก! การพลาดเพียง 2 ครั้งแล้วตัดเครื่องทิ้ง อาจทำให้เกิด **Cascading Failure** (เครื่องที่เหลือรับโหลดไม่ไหวแล้วล่มตามกันหมด)
2. **Pre-warming Strategy**: ถ้าจะทำ Flash Sale 11.11 เที่ยงคืน อย่ารอให้ Auto Scaling ทำงานเอง มันจะ "ช้าเกินไป" เสมอ! ต้องทำ **Scheduled Scaling** ล่วงหน้าอย่างน้อย 30 นาที
3. **Graceful Shutdown**: แอปต้องรู้จัก `SIGTERM` ถ้าคุณสั่งปิดเครื่องแล้วแอปตัดการทำงานทันที ลูกค้าที่กำลังกดจ่ายเงินอยู่จะเจอ Error ทันที (Bad User Experience)
4. **The Log Rotation Trap**: เซิร์ฟเวอร์โปรดักชันจำนวนมาก "ตาย" ไม่ใช่เพราะโค้ดกาก แต่เพราะ **Disk เต็ม** จากไฟล์ Log ที่ไม่ได้หมุนเวียน (Rotate) นี่คือพื้นฐานที่ห้ามพลาด
5. **Security Group Chain**: อย่าระบุ IP ใน Security Group ถ้าไม่จำเป็น! ให้ใช้ **Security Group ID** อ้างอิงกันเอง (Source/Destination) เพื่อสร้าง "สายโซ่แห่งความไว้วางใจ" ที่ยืดหยุ่นที่สุด

---

## 🏢 ใช้ในงานจริง
- **E-Commerce Platform**: ระบบขายของออนไลน์ที่ล่มไม่ได้ในช่วงแคมเปญใหญ่
- **SaaS Application**: ระบบซอฟต์แวร์บริการที่มีผู้ใช้งานจำนวนมากและต้องการความเสถียรสูง
- **Banking API**: ระบบการเงินที่เน้นความปลอดภัยและความพร้อมใช้งานระดับสูงสุด
