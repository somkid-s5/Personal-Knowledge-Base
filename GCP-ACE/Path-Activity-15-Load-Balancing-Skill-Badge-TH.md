# Activity 15 — Implementing Cloud Load Balancing for Compute Engine (Skill Badge)

[คู่มืออ่านตาม Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Visual Guide](./VISUAL-STUDY-GUIDE-TH.md#10-load-balancer--hybrid-connectivity) · [Module 10 — Load Balancing](./Module-10-Load-Balancing-and-Hybrid-Networking.md) · [Activity 05](./Path-Activity-05-Scaling-Automation-TH.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/648)

> Skill Badge นี้ควรทำให้เรา “ต่อ chain ของ load balancer ได้เอง” และ debug ได้ว่าพังที่ frontend, forwarding, proxy/URL map, backend service, health check, firewall หรือ application ไม่ใช่จำชื่อ LB อย่างเดียว

## 📖 บทเรียนเต็ม: Load Balancer เป็นระบบหลายชั้น ไม่ใช่ปุ่มสร้าง IP

### 1. เริ่มที่ Traffic Contract ก่อนเลือก Product

Client ต้องเรียก HTTP(S) Public ทั่วโลก? ต้องใช้ TCP Internal เฉพาะ VPC? Backend อยู่หลาย Regions? ต้องการ TLS Termination, URL Routing, Web Application Firewall, CDN, Static IP หรือ Session Affinity? คำตอบกำหนดว่าใช้ **Application Load Balancer** (L7 HTTP(S) Semantics) หรือ **Network Load Balancer** (L4 TCP/UDP) และ Global/Regional/Internal/External Product Type ใด

สถาปัตยกรรม Application LB ที่พบบ่อย: Forwarding Rule/Frontend → Target Proxy → URL Map → Backend Service → MIG/NEG Backend; Health Checks ให้ Signal ว่า Backend พร้อมรับ Traffic. *ไม่ใช่ทุก Load Balancer Product ใช้ Component Chain เดียวกัน* จึงต้องตรวจ Type ก่อนใช้ Runbook หรือ Firewall Rule

### 2. ทำไม Health Check ทำให้ VM RUNNING แต่ลูกค้าได้ 5xx

VM RUNNING คือ Compute State; Health Check อาจ Fail เพราะ App ไม่ Listen, Incorrect Path/Port, Host Firewall, VPC Firewall, Bad Response Code, Startup ยังไม่เสร็จ หรือ Dependency เสีย. Managed Instance Group มี Replicas ครบก็ยังไม่ได้ช่วยถ้า LB ไม่มี Healthy Endpoints

**Worked case:** Web App Listen Port 8080 แต่ Health Check ยิง 80, Backend Service Named Port ชี้ 80 และ Firewall Health Probe ไม่ผ่าน. User พบ 502/503. แยกตรวจ Backend/Health Check/Port/Firewall ก่อนเพิ่ม CPU. ถ้าทุก Backend ใน MIG 10 ตัว Unhealthy พร้อมกัน ให้ดู Shared Startup Script/Database/Firewall Change ไม่เริ่มแก้ด้วยการสร้าง 20 VM

### 3. Autoscaling vs Autohealing

Autoscaling เพิ่ม/ลด Replicas ตาม Metric; Autohealing ซ่อมสมาชิกที่ไม่ Healthy ตาม Config; LB เลือก Healthy Backend. ถ้า Database เป็น Single Point of Failure แล้ว App Check เชื่อม DB ทุกครั้ง Health Check ของทุก VM อาจ Fail พร้อมกันเมื่อ DB Down. ต้องออกแบบ Readiness/Liveness และ Dependency Boundaries ให้สอดคล้องกับ User Service Contract

**Global vs Regional:** เลือกจาก Where Clients/Backends Live, Product Mode, Failover Requirements, Data Residency, Pricing และ Health Model. ไม่เลือก Global เสมอเพราะ "ดีกว่า" หรือ Internal เสมอเพราะ "ปลอดภัย"; Networking/IAM/Firewall ยังสำคัญ

### 4. Guided Read-only Diagnostics

```bash
# Only with approved Google Skills project.
gcloud compute forwarding-rules list --project=LAB_PROJECT_ID
gcloud compute backend-services list --project=LAB_PROJECT_ID
gcloud compute health-checks list --project=LAB_PROJECT_ID
gcloud compute instance-groups managed list --project=LAB_PROJECT_ID
```

**Expected:** จับคู่ Frontend, Backend Service, Health Check และ MIG/Region/Zone ให้ตรงใน Lab; **Actual:** Query บางอย่างมี Global/Regional Variants ต้องดู Product Type และ Permissions; Resource ไม่แสดงไม่ได้แปลว่า LB Broken หากไม่เคยสร้าง. อย่าสร้าง Public LB หรือทำ Full Challenge Lab บน Personal Billing Project โดยไม่ Approval เพราะ Cost/Traffic Charges

### 5. Decision Worksheet ก่อนทำ Skill Badge

ก่อน Start ให้ระบุ Required LB Type, Frontend IP/Port, Backend Template, Health Check Path/Port, Network/Firewall Rules, Backend Instance Group/NEG, Autoscaling/Availability, Cost/Quota. เมื่อได้ Official Skills Lab Temporary Project ให้ทำ Steps ตามโจทย์/Grader และตรวจ Actual Config. หลังจบให้ End Lab/Cleanup ตาม Instructions. **การอ่านโน้ตนี้ไม่ใช่การทำ Challenge Lab ผ่าน**

### 6. Troubleshooting and answer key

1. VM RUNNING แต่ Backend UNHEALTHY? — ดู Health Path, Port, Firewall, App Startup
2. Forwarding Rule มี IP แต่ User 404? — URL Map/Host/Path Rules อาจผิด
3. Health Check 200 แต่ `/api` 502? — Health Path ไม่แทนทุก Endpoint/Dependency
4. MIG 3 Replicas แต่ Traffic ไม่มี? — ไม่มี Healthy Backends/Backend Service Registration/Config
5. Autoscaler เพิ่ม VM เพื่อแก้ DB Connection Exhaustion ดีไหม? — ไม่เสมอ; เพิ่ม Pressure
6. HTTPS Public ใช้ TCP Network LB ได้ทุก Feature L7 ไหม? — ไม่, URL Routing/TLS Policies ต่างกัน
7. เปิด `0.0.0.0/0` ทุก Port เพื่อให้ Health Check ผ่านดีไหม? — ไม่, Target/Source Ranges ต้องแคบ
8. Challenge Lab PASS ต้องมีอะไร? — Result จาก Google Skills Grader ไม่ใช่ CI/Diagram

[Load Balancing](https://cloud.google.com/load-balancing/docs/load-balancing-overview) · [Health Checks](https://cloud.google.com/load-balancing/docs/health-check-concepts).

## เป้าหมายการเรียนรู้

อ่านจบแล้วควรทำได้:

1. เลือก Application vs Network Load Balancer จาก protocol/behavior
2. แยก external/internal และ global/regional requirement
3. อธิบาย frontend → proxy/URL map → backend service → backend chain
4. สร้าง health check ที่ port/path ตรง app
5. รู้ว่าทำไม firewall ทำให้ backend unhealthy ได้
6. แยก VM ตอบตรงได้ออกจาก LB health ผ่าน
7. อ่าน 404/502/timeout/unhealthy backend แบบมีลำดับ
8. วาง challenge-lab workflow โดยไม่พึ่งจำคลิกใน Console

---

## 1. Load Balancer mental model

```mermaid
flowchart LR
    CLIENT[Client] --> FRONT[Frontend IP / Forwarding Rule]
    FRONT --> PROXY[Target proxy / LB processing]
    PROXY --> MAP[URL map / routing if applicable]
    MAP --> BS[Backend Service]
    BS --> BE1[Backend 1]
    BS --> BE2[Backend 2]
    HC[Health Check] --> BE1
    HC --> BE2
```

ไม่ใช่ LB ทุกชนิดมี component chain เหมือนกัน 100% แต่ภาพนี้ช่วยให้เข้าใจ Application LB ได้ดีมาก

---

## 2. เลือกชนิดจาก requirement

```mermaid
flowchart TD
    TRAFFIC[Traffic] --> H{HTTP/HTTPS และต้อง host/path routing?}
    H -- Yes --> ALB[Application Load Balancer]
    H -- No --> P{ต้อง proxy TCP/TLS behavior?}
    P -- Yes --> PROXY[Proxy Network Load Balancer family]
    P -- No --> N{ต้อง passthrough TCP/UDP?}
    N -- Yes --> PASS[Passthrough Network Load Balancer]
    N -- No --> REQ[ทบทวน protocol/requirements]
```

จากนั้นถามต่อ:
- client มาจาก Internet หรือ private network?
- global entry หรือ regional?
- backend อยู่ VM/MIG/NEG/serverless แบบใด?

---

## 3. Application LB component chain

| Component | คำถามที่ต้องตอบ |
|---|---|
| Frontend IP | client ต่อ IP ไหน? external/internal? |
| Forwarding rule | protocol/port/scope ถูกไหม? |
| Target proxy | TLS/proxy config ถูกไหม? |
| URL map | host/path route ไป backend ไหน? |
| Backend service | backend/health/load policy อะไร? |
| Backend | instance group/NEG ที่ถูกต้องไหม? |
| Health check | app พร้อมจริงที่ port/path นี้ไหม? |

เวลาพังให้เดิน chain นี้แทนเปิด firewall กว้าง ๆ ก่อน

---

## 4. Health Check: จุดที่ทำให้หลายคนงง

```mermaid
flowchart TD
    HC[Health checker] --> FW{Firewall allows health-check path?}
    FW -- No --> UN[Backend unhealthy]
    FW -- Yes --> PORT{Port ถูก?}
    PORT -- No --> UN
    PORT -- Yes --> APP{App listens/responds expected path?}
    APP -- No --> UN
    APP -- Yes --> OK[Healthy backend]
```

VM ที่ `curl localhost` ผ่าน อาจยัง unhealthy เพราะ:
- firewall source ไม่อนุญาต health checker
- named port/port mismatch
- app bind localhost อย่างเดียว
- path `/health` ไม่ตอบ expected status

---

## 5. Backend Service vs Instance Group

Instance group คือกลุ่ม compute backends ส่วน backend service เก็บ policy/health/backend attachment สำหรับ LB

อย่าสับสนว่า “สร้าง MIG แล้ว = มี load balancer” ยังต้องเชื่อม frontend/routing/backend service ตาม architecture

---

## 6. URL Map

```mermaid
flowchart LR
    REQ[HTTP request] --> HOST{Host?}
    HOST -->|api.example.com| API[/api route/]
    HOST -->|www.example.com| WEB[/web route/]
    API --> B1[API backend]
    WEB --> B2[Web backend]
```

**404 จาก LB/app** ต้องแยกว่า:
- URL map ไม่มี route
- backend app ตอบ 404
- host header/path ไม่ตรง

ไม่ใช่ทุก 404 เป็น firewall problem

---

## 7. Internal vs External

### External
client จาก Internet ตาม LB variant/architecture

### Internal
client ต้องอยู่ network/path ที่รองรับ เช่น VPC/connected network ตามชนิด LB

Internal LB มี IP private ไม่ได้แปลว่า client ทุก project/on-prem จะ route ถึงโดยอัตโนมัติ ต้องมี connectivity + DNS + firewall/IAM ตาม architecture

---

## 8. Global vs Regional

อย่าจำว่า Application LB = global เสมอ หรือ Network LB = regional เสมอ เพราะ Google Cloud มีหลาย variants

ให้ถาม:
1. frontend scope
2. backend scope
3. client geography
4. failover requirement
5. network tier/feature compatibility

---

## 9. Firewall กับ LB

มี traffic อย่างน้อยสองชนิดที่ต้องคิด:
- client/proxy data traffic
- health-check traffic

บาง LB ใช้ proxy infrastructure/proxy-only subnet ตาม variant จึงต้องอ่าน architecture ของชนิดที่เลือก ไม่ copy CIDR จาก tutorial อื่นมาใช้ทุก LB

---

## 10. MIG + LB + Autoscaling

```mermaid
flowchart TB
    USER[Users] --> LB[Load Balancer]
    LB --> MIG[Regional MIG]
    MIG --> VM1[VM A]
    MIG --> VM2[VM B]
    HC[Health Check] --> MIG
    AUTO[Autoscaler] --> MIG
    CPU[CPU / LB utilization signal] --> AUTO
```

สามกลไกทำคนละอย่าง:
- LB = distribute traffic
- health check = backend readiness/health
- autoscaler = จำนวน instances

---

## 11. Common failure matrix

| อาการ | เริ่มตรวจ |
|---|---|
| Frontend timeout | forwarding rule, client path, backend health |
| Backends unhealthy | health check, firewall, port/path/listener |
| 404 | URL map/host/path/app route |
| 502/503 | backend unhealthy/app error/capacity |
| บาง backend ตอบ บางตัวไม่ตอบ | instance app/config/version/health |
| Internal LB เข้าไม่ได้ | source network/route/firewall/scope |
| VM ตรงตอบได้ แต่ LB ไม่ได้ | LB chain/health/config ไม่ใช่ VM อย่างเดียว |

---

## 12. Read-only commands ที่ช่วย debug

ตัวอย่างแนวคิด (ชื่อ command/flags ให้ตรวจตาม resource type ปัจจุบัน):

```bash
gcloud compute forwarding-rules list
gcloud compute backend-services list
gcloud compute health-checks list
gcloud compute instance-groups list
gcloud compute firewall-rules list
```

ก่อน challenge lab ใช้ Console ก็ได้ แต่ต้องรู้ว่าแต่ละหน้าจอเทียบกับ component ใด

---

## 13. Challenge Lab Strategy

1. อ่าน requirement ทั้งหมดก่อนสร้าง
2. จด resource names/region/zone ที่ grader ต้องการ
3. วาด architecture 1 รูป
4. สร้าง backend app ให้ตอบได้ก่อน
5. ตรวจ health check
6. ต่อ backend service
7. ต่อ frontend/routing
8. ทดสอบจาก client path ที่ถูกต้อง
9. ตรวจ grader หลังแต่ละกลุ่มงานถ้าระบบอนุญาต
10. ห้าม rename resource ตามใจถ้า grader ระบุชื่อ

---

## 14. Mini Lab — วาด chain ก่อนทำจริง

```text
Client
 -> Frontend IP
 -> Forwarding Rule
 -> Target Proxy
 -> URL Map
 -> Backend Service
 -> MIG
 -> VM web server
```

ข้าง ๆ เขียน:
- protocol/port
- scope
- health check
- firewall sources
- expected HTTP response

ถ้าวาดไม่ได้ แปลว่ายังไม่พร้อม challenge lab

---

## 15. Troubleshooting walkthrough

**อาการ:** backend unhealthy

1. instance running?
2. app process running?
3. app bind `0.0.0.0`/expected interface?
4. health path/port ถูก?
5. firewall allow source ที่ต้องการ?
6. named port/backend setting ตรง?
7. health check response status ตรง?

**อาการ:** backend healthy แต่ user 404

→ ดู URL map/host/path/application route ไม่กลับไปแก้ health check ก่อน

---

## 16. Exam-style scenarios

**Scenario:** ต้อง route `/api` กับ `/static` ไปคนละ backend

**แนวคิด:** Application Load Balancer + URL map/path routing

**Scenario:** VM web เปิดตรง IP ได้ แต่ LB บอก unhealthy

**แนวคิด:** ตรวจ health check path/port/firewall/backend attachment

**Scenario:** Internal LB จาก on-prem เข้าไม่ได้ แต่ VM ใน VPC เข้าได้

**แนวคิด:** ตรวจ hybrid route/DNS/firewall/source connectivity ไม่ใช่เปลี่ยนเป็น external LB ทันที

---

## เช็กความเข้าใจ

1. Forwarding rule กับ backend service ทำหน้าที่ต่างกันอย่างไร?
2. Health check fail ได้ทั้งที่ app process running เพราะอะไร?
3. 404 ควรเริ่มตรวจ firewall หรือ URL map?
4. MIG = Load Balancer หรือไม่?
5. Internal LB ต้องมี network path จาก client หรือไม่?
6. Global/regional ควรเลือกจาก requirement อะไร?
7. VM ตอบตรงได้พิสูจน์ว่า LB chain ถูกไหม?
8. Challenge lab ทำไมควรวาด architecture ก่อน?

## แหล่งอ้างอิง

- [Google Skills — Implementing Cloud Load Balancing for Compute Engine](https://www.skills.google/paths/11/course_templates/648)
- [Cloud Load Balancing overview](https://cloud.google.com/load-balancing/docs/load-balancing-overview)
- [Choose a load balancer](https://cloud.google.com/load-balancing/docs/choosing-load-balancer)

## 📚 Deep Learning Notes — Load Balancer 502/503 จาก Health-Check Failure (Original Supplement, 2026-10-21)

### 1. อ่าน Component Chain แทนจำ Click ใน Console

```mermaid
flowchart LR
 U[Client] --> F[Forwarding rule]
 F --> TP[Target proxy]
 TP --> UM[URL map]
 UM --> BS[Backend service]
 HC[Health check] --> BS
 BS --> IG[Instance group]
 IG --> VM[Healthy web service]
```

ความผิดปกติต้องระบุเส้นที่ขาด: ถ้า DNS/Frontend ผิด Client อาจต่อไม่ได้เลย; ถ้า URL Map Rule ผิด Path เฉพาะบางเส้นทางอาจไป Backend ผิด; ถ้า Backend Health Unhealthy อาจเกิด 5xx แม้ VM Ping ได้

### 2. ลำดับ Troubleshooting ที่ใช้จริง

1. ตรวจ Type/Scope ของ Load Balancer (External/Internal, Global/Regional, Application/Network) ก่อนอ่าน Docs ไม่ใช้ Firewall Rule ชุดเดียวกับ LB ทุก Type
2. ตรวจ Forwarding Rule + Frontend Protocol/Port; Target Proxy/URL Map เหมาะกับ HTTP(S) LB
3. ตรวจ Backend Service, Health Check Port/Path และ Associated MIG/NEGs
4. ตรวจ Firewall Allow ที่จำเป็นสำหรับ Health Probe/Data Path ตาม LB Type
5. ตรวจ App Startup, Listening Port, Host Firewall และ Logs. Backend ที่รับ Request ได้ใน VM เองอาจยัง Fail Health Check
6. แยก `Autoscaling` จาก `Autohealing` และอย่า Force Health Check ให้กลับเขียวโดยปิด Security Controls

### 3. Example: /healthz ตอบ 200 แต่ /api สร้าง 502

ถ้า Health Path `/healthz` ผ่าน แต่ User API 502 ต้องตรวจ Timeout/Protocol Mismatch, App Handler, Downstream Database, TLS/Backend Configuration และ Header/Host Routing. Health Check ไม่ตรวจทุก Behavior ของ Application

### 4. Exam-style architecture decision

Traffic เป็น HTTPS Public ปริมาณสูง กระจายหลาย Regions — ต้องตอบว่า Global External Application Load Balancer เหมาะหรือไม่ จาก Global Routing, TLS, Backend Regions, CDN/Cloud Armor Needs; แทนการเลือกจากคำว่า “มี VM สองตัว”. สำหรับ Internal TCP Service อย่าเลือก HTTP URL Map โดยอัตโนมัติ

**Official:** [Load Balancing Overview](https://cloud.google.com/load-balancing/docs/load-balancing-overview) · [Health Checks](https://cloud.google.com/load-balancing/docs/health-check-concepts).

**Lab scope:** Original diagnostics and decision support; not challenge-lab grader or live LB result
