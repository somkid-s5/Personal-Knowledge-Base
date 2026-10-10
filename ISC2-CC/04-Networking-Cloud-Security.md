# ISC2 CC Domain 4 — Networking and Cloud Security Concepts

> 🧠 **ภาพจำก่อนอ่าน:** 🌐 Network → 🛡️ Rules → 🖥️ Backend  
> 🎨 [Visual Guide ของวิชานี้](./VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Back to ISC2-CC](./README.md) · [Current Exam Map](./CURRENT-EXAM-MAP.md)

> **Current exam weight:** 21.3%  
> **Current outline effective:** 2026-09-01  
> **Teaching status:** Current-outline reconstruction in progress  
> **Historical source support:** Thor Study Guide / Quick Sheet Domain 4 (pre-2026 structure)

## เป้าหมายของบทนี้

Domain 4 คือบทที่เชื่อม “networking พื้นฐาน” เข้ากับ “security architecture” และ “cloud security”

หลังเรียนบทนี้ควรอธิบายได้ว่า:

- OSI และ TCP/IP model ช่วยคิดเรื่อง network security อย่างไร
- IPv4 / IPv6 / ports / protocols เกี่ยวข้องกับ firewall rule อย่างไร
- VPN ปกป้อง traffic แบบไหน
- firewall แบบ stateless, stateful และ application-aware ต่างกันอย่างไร
- Wi-Fi, Bluetooth, ICS และ IoT มี threat surface แบบไหน
- VLAN, firewall zone และ micro-segmentation ใช้ลด blast radius อย่างไร
- Defense in Depth กับ Zero Trust ต่างกันอย่างไร
- cloud characteristics สำคัญต่อ security อย่างไร
- IaaS / PaaS / SaaS เปลี่ยนขอบเขตความรับผิดชอบของ customer อย่างไร
- public / private / hybrid / community cloud ต่างกันอย่างไร
- Shared Responsibility Model ต้องใช้คิดอะไรบ้าง
- AI-assisted traffic analysis ช่วย security ได้ แต่ไม่ได้แทน control พื้นฐานอย่างไร

---

## 1. Mental model ใหญ่ของ Domain 4

ให้คิดเป็น flow:

~~~text
Traffic exists
→ identify source / destination
→ identify trust boundary
→ segment
→ inspect / enforce
→ allow only required communication
→ monitor
→ continuously verify
~~~

network security ที่ดีไม่ใช่แค่ “มี firewall”

แต่คือการรู้ว่า:

> traffic นี้ควรเดินจากไหน ไปไหน ผ่าน boundary อะไร ใช้ protocol อะไร และควรได้รับอนุญาตเพราะอะไร

---

## 2. Network security fundamentals

Network คือระบบที่ทำให้อุปกรณ์หลายตัวสื่อสารและแบ่งปัน resource กันได้

ในมุม security เราสนใจอย่างน้อย 4 เรื่อง:

1. **Identity** — ใครกำลังสื่อสาร
2. **Path** — traffic เดินผ่านอะไร
3. **Protocol** — ใช้วิธีสื่อสารแบบไหน
4. **Policy** — communication นี้ควรเกิดหรือไม่

Mental model:

~~~text
Source
→ network path
→ security controls
→ destination
~~~

ทุกจุดใน flow อาจเป็น attack surface

---

## 3. OSI Model

OSI model มี 7 layers:

| Layer | ชื่อ | ตัวอย่างสิ่งที่เกี่ยวข้อง |
|---:|---|---|
| 7 | Application | HTTP, DNS, application behavior |
| 6 | Presentation | encoding, compression, encryption concepts |
| 5 | Session | session establishment / maintenance |
| 4 | Transport | TCP, UDP, ports |
| 3 | Network | IP, routing |
| 2 | Data Link | Ethernet, MAC, VLAN |
| 1 | Physical | cable, fiber, radio |

จำง่ายจากล่างขึ้นบน:

~~~text
Physical
Data Link
Network
Transport
Session
Presentation
Application
~~~

จุดสำคัญไม่ใช่ท่อง layer อย่างเดียว แต่ต้องเชื่อมกับการ troubleshoot และ security

ตัวอย่าง:

- Layer 1 มีปัญหา → link down
- Layer 2 มีปัญหา → VLAN/MAC/switching
- Layer 3 มีปัญหา → routing/IP
- Layer 4 มีปัญหา → port/TCP/UDP
- Layer 7 มีปัญหา → application/protocol behavior

---

## 4. TCP/IP Model

TCP/IP model มักมองเป็น 4 layers:

| TCP/IP | ใกล้เคียง OSI |
|---|---|
| Application | OSI 5–7 |
| Transport | OSI 4 |
| Internet | OSI 3 |
| Link | OSI 1–2 |

Mental model:

~~~text
Application data
→ Transport segment/datagram
→ IP packet
→ Link frame
→ physical transmission
~~~

เมื่อ traffic เดินทางออกไป แต่ละ layer จะเพิ่มข้อมูลที่จำเป็นในการส่งต่อ

เรียกว่า encapsulation

ฝั่งปลายทางทำย้อนกลับเรียกว่า decapsulation

---

## 5. TCP vs UDP

### TCP

TCP เป็น connection-oriented protocol

คุณสมบัติ:

- connection setup
- sequencing
- acknowledgement
- retransmission
- reliable delivery

เหมาะกับ workload ที่ความถูกต้องสำคัญ เช่น:

- HTTPS
- SSH
- database session จำนวนมาก
- file transfer

### UDP

UDP เป็น connectionless protocol

คุณสมบัติ:

- overhead ต่ำกว่า
- ไม่มี guarantee แบบ TCP
- เหมาะกับ latency-sensitive traffic

ตัวอย่าง:

- DNS บางรูปแบบ
- streaming
- voice/video real-time
- gaming

### Security angle

อย่าคิดว่า TCP “ปลอดภัยกว่า” UDP โดยธรรมชาติ

สอง protocol ต่างกันเรื่อง transport behavior ไม่ใช่ encryption หรือ trust

---

## 6. IPv4 และ IPv6

### IPv4

IPv4 ใช้ address 32-bit

ตัวอย่าง:

~~~text
192.168.1.10
~~~

ข้อจำกัดสำคัญคือ address space มีขนาดจำกัด จึงมี NAT ถูกใช้แพร่หลายมาก

### IPv6

IPv6 ใช้ address 128-bit

ตัวอย่าง:

~~~text
2001:db8::10
~~~

จุดสำคัญ:

- address space ใหญ่กว่ามาก
- ลด dependency ต่อ NAT
- มีแนวคิด addressing ที่ต่างจาก IPv4
- network security tooling ต้องรองรับ IPv6 จริง

### Common mistake

> “เราไม่ได้ใช้ IPv6 จึงไม่ต้องสนใจ”

ในหลาย environment IPv6 อาจถูก enable โดย default

ถ้า firewall / IDS / monitoring สนใจแต่ IPv4 อาจเกิด blind spot

---

## 7. MAC address vs IP address

### MAC address

ใช้ใน local network / Layer 2

คิดว่าเป็น:

~~~text
local delivery identifier
~~~

### IP address

ใช้สำหรับ routing ระหว่าง networks

คิดว่าเป็น:

~~~text
logical network address
~~~

ตัวอย่าง:

~~~text
MAC → ส่ง frame ใน local segment
IP  → ส่ง packet ข้าม network
~~~

MAC สามารถ spoof ได้ จึงไม่ควรถือว่าเป็น strong identity proof

---

## 8. Ports และ applications

port ช่วยแยก service บน host เดียวกัน

Mental model:

~~~text
IP address = อาคาร
Port       = ห้อง
~~~

ตัวอย่าง common ports ที่ควรรู้เชิง concept:

| Port | Protocol / service | Security note |
|---:|---|---|
| 22 | SSH | encrypted remote administration |
| 23 | Telnet | plaintext legacy remote access |
| 25 | SMTP | mail transfer |
| 53 | DNS | name resolution |
| 80 | HTTP | plaintext web |
| 443 | HTTPS | HTTP over TLS |
| 3389 | RDP | Windows remote desktop |

อย่าท่อง port แบบ isolated

ควรถามว่า:

> service นี้จำเป็นต้องเปิดจาก network ใดบ้าง?

ตัวอย่าง rule ที่ดี:

~~~text
Admin subnet
→ TCP/22
→ Linux management host
~~~

ดีกว่า:

~~~text
0.0.0.0/0
→ TCP/22
→ every server
~~~

---

## 9. VPN

VPN สร้าง secure logical tunnel ผ่าน network ที่ไม่ trusted เช่น Internet

แนวคิด:

~~~text
Private traffic
→ encrypted/authenticated tunnel
→ public network
→ trusted endpoint
~~~

use cases:

- remote access
- site-to-site connectivity
- branch-to-datacenter
- hybrid cloud

VPN ไม่ได้ทำให้ endpoint ปลอดภัยโดยอัตโนมัติ

ถ้าเครื่องปลายทาง compromise อยู่แล้ว VPN อาจแค่สร้างเส้นทางที่ดีขึ้นให้ attacker

---

## 10. Firewalls

Firewall enforce policy ระหว่าง trust zones หรือ hosts

คำถามพื้นฐานคือ:

> traffic นี้ควรได้รับอนุญาตหรือไม่?

### Packet filtering

พิจารณาข้อมูลเช่น:

- source IP
- destination IP
- protocol
- source/destination port

ข้อดี:

- simple
- fast

ข้อจำกัด:

- context ต่ำ

### Stateful firewall

ติดตาม state ของ connection

เช่น:

~~~text
client initiates connection
→ firewall records session
→ return traffic is recognized
~~~

ช่วยแยก response traffic ที่ legitimate ออกจาก packet ที่ไม่เกี่ยวข้อง

### Application-aware / next-generation firewall

เข้าใจ application/protocol ได้ลึกกว่า header-level filtering

อาจใช้:

- application identification
- deep inspection
- threat detection
- policy by application

แต่ inspection มากขึ้นแลกกับ:

- complexity
- compute cost
- tuning
- privacy considerations

---

## 11. Firewall rule design

rule ที่ดีควรระบุ:

~~~text
source
destination
service / port
direction
action
business purpose
owner
expiry/review
~~~

แนวคิดที่ควรหลีกเลี่ยง:

~~~text
ANY → ANY → ALLOW
~~~

เพราะทำให้ segmentation แทบไม่มีความหมาย

---

## 12. Wireless security

wireless เพิ่ม risk เพราะ traffic เดินผ่าน radio spectrum

หัวข้อที่ควรคิด:

- authentication
- encryption
- rogue access point
- weak password
- misconfiguration
- range leakage
- device trust

Wi-Fi security ไม่ควรพึ่งแค่ “SSID ซ่อนอยู่”

hidden SSID ไม่ใช่ strong security control

---

## 13. Bluetooth

Bluetooth ใช้กับอุปกรณ์ระยะใกล้ เช่น:

- headset
- keyboard
- phone
- IoT device

risk ตัวอย่าง:

- insecure pairing
- weak/default PIN
- discoverable mode
- vulnerable firmware
- malicious nearby device

แนวทาง:

- disable เมื่อไม่ใช้
- patch firmware
- avoid unnecessary discoverability
- pair only trusted devices

---

## 14. Embedded systems, ICS และ IoT

### Embedded systems

อุปกรณ์ที่มี compute อยู่ภายในเพื่อทำหน้าที่เฉพาะ

เช่น:

- camera
- smart sensor
- printer
- access controller

### ICS

Industrial Control System ใช้ควบคุม industrial process

ตัวอย่าง:

- plant
- utilities
- manufacturing

### IoT

Internet of Things คืออุปกรณ์เชื่อมต่อ network ที่มี function เฉพาะ

risk ที่พบบ่อย:

- default password
- patch ยาก
- lifecycle ยาว
- weak crypto
- vendor support จำกัด
- monitoring ต่ำ
- network access กว้างเกินไป

Mental model:

~~~text
device functionality
+ long lifecycle
+ limited patching
+ network access
= high security attention
~~~

---

## 15. Segmentation

segmentation แบ่ง network ออกเป็น trust zones

เป้าหมาย:

- limit blast radius
- reduce unauthorized movement
- enforce policy
- improve monitoring

ตัวอย่าง:

~~~text
Internet
→ DMZ
→ App zone
→ Database zone
~~~

ไม่ควรเป็น:

~~~text
Internet
→ flat internal network
→ everything
~~~

---

## 16. Firewall zones

zone คือการจัดกลุ่ม network/resource ตาม trust หรือ function

ตัวอย่าง:

- Internet
- DMZ
- User
- Server
- Management
- Database

policy จึงเขียนเป็น flow ระหว่าง zones ได้

เช่น:

~~~text
User → App : HTTPS only
App → DB   : DB port only
User → DB  : deny
~~~

---

## 17. VLAN

VLAN ใช้แบ่ง Layer 2 broadcast domain แบบ logical

ข้อดี:

- segmentation
- traffic organization
- reduce broadcast scope

แต่ VLAN ไม่ได้แปลว่า secure isolation โดยอัตโนมัติ

communication ระหว่าง VLAN ยังต้องผ่าน routing และควรมี policy enforcement

Mental model:

~~~text
VLAN = logical grouping
Firewall / ACL = policy enforcement
~~~

---

## 18. Micro-segmentation

micro-segmentation ลด scope จาก network-level ใหญ่ลงไปถึง workload/application-level

ตัวอย่าง:

~~~text
App-01
→ allowed only to DB-01 TCP/5432

App-02
→ no access to DB-01
~~~

ข้อดี:

- ลด east-west movement
- ลด blast radius
- policy ละเอียดขึ้น

ข้อเสีย:

- policy complexity สูง
- ต้องมี asset/workload visibility ที่ดี

---

## 19. Defense in Depth

Defense in Depth ใช้ controls หลายชั้น

แนวคิด:

~~~text
one control fails
→ another control still reduces risk
~~~

ตัวอย่าง:

~~~text
MFA
+ endpoint protection
+ firewall
+ segmentation
+ logging
+ backup
~~~

อย่าเข้าใจว่า “ใส่ security tools เยอะ ๆ” เท่ากับ Defense in Depth

controls ต้องมี purpose และ cover different failure modes

---

## 20. Zero Trust

Zero Trust ไม่ใช่ product

เป็น security model ที่ลด implicit trust

mental model:

~~~text
Never trust implicitly
→ verify explicitly
→ enforce least privilege
→ continuously evaluate
~~~

คำถามก่อนอนุญาต access:

- identity คือใคร
- device trusted หรือไม่
- request มาจาก context ไหน
- resource คืออะไร
- risk level เท่าไร
- permission เท่าที่จำเป็นหรือไม่

Zero Trust ต่างจาก traditional perimeter model ที่มัก assume ว่า “เข้า internal network แล้วน่าเชื่อถือกว่า”

---

## 21. Defense in Depth vs Zero Trust

| Concept | จุดเน้น |
|---|---|
| Defense in Depth | controls หลายชั้น |
| Zero Trust | ไม่มี implicit trust; verify every access context |
| Segmentation | ลด movement / blast radius |
| Least Privilege | จำกัด permission |
| Monitoring | ตรวจจับ behavior และ evidence |

แนวคิดเหล่านี้เสริมกัน ไม่ใช่เลือกอย่างใดอย่างหนึ่ง

---

## 22. Cloud security — ทำไมเพิ่มเข้ามาใน Domain 4 ปี 2026

outline ใหม่ขยายจาก Network Security เป็น **Networking and Cloud Security Concepts**

เหตุผลคือ modern network boundary ไม่ได้อยู่แค่ data center อีกต่อไป

environment อาจมี:

- SaaS
- public cloud
- hybrid cloud
- remote users
- mobile devices
- third-party APIs
- cloud workloads

security boundary จึงกระจายออกไปมากขึ้น

---

## 23. Cloud characteristics

current outline ต้องเข้าใจ cloud characteristics หลัก

### On-demand self-service

user สามารถ provision resource ได้เองตาม policy

security impact:

- resource creation เร็ว
- misconfiguration ก็เกิดเร็ว
- governance/automation สำคัญ

### Broad network access

service เข้าถึงผ่าน network จากหลาย device/location

security impact:

- identity และ access control สำคัญ
- Internet exposure ต้องควบคุม

### Resource pooling

provider รวม resource ให้ลูกค้าหลายรายใช้ร่วมกันแบบ isolation

security impact:

- multi-tenancy
- isolation
- trust in provider controls

### Rapid elasticity

resource scale ขึ้นลงได้เร็ว

security impact:

- controls ต้อง scale ตาม workload
- static inventory อย่างเดียวไม่พอ

### Measured service

usage ถูกวัดและคิดตามการใช้งาน

security impact:

- abnormal usage อาจสะท้อน abuse
- telemetry ช่วย detect anomaly
- cost spike อาจเป็น security signal ได้

---

## 24. Cloud service models

### IaaS — Infrastructure as a Service

provider ให้ infrastructure

customer มักรับผิดชอบมากขึ้น เช่น:

- OS
- application
- data
- identity
- guest configuration

Mental model:

~~~text
provider manages infrastructure
customer manages more of the stack
~~~

### PaaS — Platform as a Service

provider ดูแล platform/runtime มากขึ้น

customer focus มากขึ้นที่:

- application
- data
- identity
- configuration

### SaaS — Software as a Service

provider ดูแล application stack มากที่สุด

customer ยังต้องรับผิดชอบเรื่องสำคัญ เช่น:

- users
- roles
- data
- configuration
- sharing
- device/session security

---

## 25. Service model comparison

| Area | IaaS | PaaS | SaaS |
|---|---|---|---|
| Physical infrastructure | Provider | Provider | Provider |
| Hypervisor/platform base | Provider | Provider | Provider |
| Guest OS | Customer | Provider | Provider |
| Application | Customer | Customer | Provider |
| Data | Customer | Customer | Customer/shared responsibility |
| Identity/access | Customer | Customer | Customer |
| Configuration | Customer-heavy | Shared | Customer still responsible for tenant settings |

exact responsibility แตกต่างตาม service/provider แต่ concept หลักคือ:

> managed service มากขึ้น ≠ customer ไม่มี security responsibility

---

## 26. Cloud deployment models

### Public cloud

provider ให้บริการแก่หลาย customers

ข้อดี:

- elasticity
- speed
- global scale

security concern:

- Internet exposure
- shared infrastructure model
- tenant configuration
- identity security

### Private cloud

cloud environment dedicated to one organization

ข้อดี:

- control สูง
- custom governance

ข้อเสีย:

- operational burden สูงกว่า

### Hybrid cloud

รวม private/on-prem กับ public cloud

ความท้าทาย:

- identity integration
- network routing
- policy consistency
- logging
- data movement

### Community cloud

environment ที่หลายองค์กรซึ่งมี requirement คล้ายกันใช้ร่วมกัน

เช่น industry/community ที่มี shared compliance needs

---

## 27. Shared Responsibility Model

นี่เป็น concept สำคัญที่สุดของ cloud security

Mental model:

~~~text
Provider secures the cloud
Customer secures what they put/configure in the cloud
~~~

แต่ขอบเขตเปลี่ยนตาม service model

ถามเสมอว่า:

1. ใครดูแล physical infrastructure
2. ใคร patch OS
3. ใคร configure identity
4. ใคร protect data
5. ใครเปิด firewall/security rules
6. ใคร monitor logs
7. ใคร manage application vulnerabilities

ตัวอย่าง:

SaaS provider อาจดูแล server ทั้งหมด

แต่ถ้า customer ให้ทุก user เป็น Global Admin ก็ยังเป็น customer-side security failure

---

## 28. Cloud network security mental model

ใช้ flow นี้:

~~~mermaid
flowchart LR
    USER[User / Workload] --> ID[Identity]
    ID --> EDGE[Cloud edge / gateway]
    EDGE --> SEG[Network segmentation]
    SEG --> APP[Application]
    APP --> DATA[Data service]
    USER -. telemetry .-> MON[Monitoring]
    EDGE -. logs .-> MON
    SEG -. logs .-> MON
    APP -. logs .-> MON
~~~

cloud security จึงเชื่อม:

- identity
- network
- application
- data
- telemetry

ไม่ควรมอง firewall เพียงตัวเดียว

---

## 29. AI-assisted network security

ISC2 2026 เพิ่ม AI concepts กระจายทุก domain

ใน Domain 4 AI อาจช่วย:

- traffic anomaly detection
- unusual connection pattern detection
- threat classification
- IDS/IPS tuning
- firewall analytics

ตัวอย่าง:

~~~text
normal behavior baseline
→ observe traffic
→ detect deviation
→ raise signal
→ human/system verifies
→ response
~~~

แต่ AI detection มีข้อจำกัด:

- false positive
- false negative
- training/baseline quality
- adversarial behavior
- explainability

AI จึงเป็น detection/enrichment layer ไม่ใช่เหตุผลให้ตัด firewall, segmentation หรือ access control ออก

---

## 30. Legacy Domain 4 topics ที่ย้ายออกจาก current Domain 4

Thor Domain 4 เก่ามีเนื้อหากว้างมาก

บางหัวข้อยังมีประโยชน์ แต่ไม่ควรสอนเป็น current Domain 4 โดยอัตโนมัติ

### ไป Domain 5 มากกว่า

- IDS/IPS operations เชิง monitoring
- SIEM/SOAR
- vulnerability scanning/testing
- threat/attack analysis
- zero-day handling
- asset hardening

### ไป Domain 2 มากกว่า

- backups เชิง BC/DR
- redundancy/resilience
- availability planning

### ไม่ใช่ current core objective โดยตรง

- RAID detail
- fire suppression detail
- electrical power detail
- cable/topology trivia เชิงลึก

หลักคือ:

> useful knowledge ≠ current exam-domain authority

---

## 31. Troubleshooting mental model

เมื่อ network service ใช้งานไม่ได้ ให้ไล่เป็น layer

~~~text
1. Physical / link
2. VLAN / local path
3. IP / routing
4. firewall / ACL
5. port / transport
6. DNS / name resolution
7. TLS / certificate
8. application
9. identity / authorization
~~~

ตัวอย่าง:

user เข้า web app ไม่ได้

อย่าเริ่มจาก restart server ทันที

ถาม:

- DNS resolve ไหม
- route ถึงไหม
- port 443 เปิดไหม
- TLS handshake ได้ไหม
- app ตอบไหม
- login ผ่านไหม

นี่คือประโยชน์จริงของ OSI/TCP-IP mental model

---

## 32. Scenario practice

### Scenario A — Flat network

บริษัทมี user PC, app server และ database อยู่ VLAN เดียวกันทั้งหมด

risk:

- lateral movement ง่าย
- blast radius สูง

แนวทาง:

- segmentation
- separate zones
- enforce only required flows

---

### Scenario B — Public SSH

VM เปิด TCP/22 จาก Internet ทั้งโลก

แม้ใช้ password แข็งแรง ก็ยังเพิ่ม attack surface

ดีกว่า:

- restricted source
- VPN / bastion
- strong authentication
- logging

---

### Scenario C — SaaS data leak

บริษัทใช้ SaaS ที่ provider security ดีมาก แต่ user แชร์ confidential document เป็น public link

นี่คือ Shared Responsibility failure ฝั่ง customer configuration/data governance

---

### Scenario D — IoT camera

กล้อง IoT patch ไม่ได้และต้องอยู่ในองค์กรอีก 5 ปี

แนวทาง:

- isolate network
- restrict outbound/inbound
- monitor
- inventory
- compensating controls

---

### Scenario E — Zero Trust misconception

ทีมบอกว่า “เราใช้ VPN แล้วจึงเป็น Zero Trust”

ไม่ถูก

VPN สร้าง secure tunnel แต่ไม่ได้หมายความว่า access ทุก request ถูก verify ตาม identity/device/context และ least privilege

---

### Scenario F — AI anomaly alert

AI firewall แจ้ง traffic anomaly แต่ไม่มี corroborating evidence

ควร:

- investigate context
- correlate logs
- validate before high-impact response

ไม่ควร assume ว่า AI alert = confirmed attack

---

## 33. Common traps

| Trap | วิธีคิดที่ถูก |
|---|---|
| VLAN = firewall | VLAN แบ่ง network; policy enforcement ยังต้องมี |
| VPN = endpoint secure | VPN ปกป้อง tunnel ไม่ได้ clean endpoint |
| TCP = secure | TCP reliable ไม่ได้แปลว่า encrypted |
| SSO/VPN/internal = trusted | Zero Trust ลด implicit trust |
| SaaS = provider รับผิดชอบ security ทั้งหมด | customer ยังรับผิดชอบ identity/data/config |
| IaaS/PaaS/SaaS = deployment model | เป็น service model |
| Public/Private/Hybrid = service model | เป็น deployment model |
| firewall = security architecture ทั้งหมด | เป็น control หนึ่งในหลายชั้น |
| AI IDS = ไม่ต้อง tune | AI detection ยังมี false positive/negative |
| old Domain 4 = current Domain 4 | outline 2026 ตัด/ย้ายหลายหัวข้อ |

---

## 34. Knowledge Check

ตอบโดยไม่เปิดโน้ต:

1. OSI Layer 3 กับ Layer 4 ต่างกันอย่างไร?
2. TCP กับ UDP ต่างกันตรงไหน?
3. IPv6 ทำไมยังต้องถูก monitor แม้องค์กรคิดว่า “ไม่ใช้”?
4. MAC address ใช้แทน strong identity ได้หรือไม่?
5. firewall rule ที่ดีควรระบุอะไรบ้าง?
6. stateful firewall ต่างจาก packet filtering อย่างไร?
7. VLAN กับ firewall ต่างกันอย่างไร?
8. segmentation ลด risk แบบไหน?
9. micro-segmentation ต่างจาก traditional segmentation อย่างไร?
10. Defense in Depth ต่างจาก Zero Trust อย่างไร?
11. cloud characteristic 5 อย่างมีอะไรบ้าง?
12. IaaS / PaaS / SaaS ต่างกันที่ responsibility อย่างไร?
13. public / private / hybrid cloud ต่างกันอย่างไร?
14. Shared Responsibility Model ช่วยตอบคำถามอะไร?
15. SaaS provider secure มาก แต่ user แชร์ข้อมูล public ใครยังรับผิดชอบ?
16. IoT device patch ไม่ได้ควรใช้ compensating control แบบไหน?
17. VPN ทำให้ระบบเป็น Zero Trust โดยอัตโนมัติหรือไม่?
18. AI-assisted IDS มีข้อจำกัดอะไร?
19. ถ้า web app ใช้งานไม่ได้ จะ troubleshoot layer ใดก่อนหลัง?
20. หัวข้ออย่าง SIEM/SOAR และ vulnerability scanning ควรไป current Domain ใดมากกว่า?

ถ้าอธิบายได้พร้อมเหตุผล แปลว่าเข้าใจ architecture ไม่ใช่แค่ท่องศัพท์

---

## Current official references

- [ISC2 Certified in Cybersecurity Exam Outline](https://www.isc2.org/certifications/cc/cc-certification-exam-outline)
- [Inside the Updated ISC2 Certified in Cybersecurity Exam](https://www.isc2.org/Insights/2026/08/inside-the-updated-isc2-cc-exam)

## Historical private source note

Thor Study Guide / Quick Sheet Domain 4 ใน private Google Drive ยังมี material ที่มีประโยชน์มากสำหรับ networking fundamentals เช่น OSI/TCP-IP, IPv4/IPv6, ports, VPN, firewall, wireless, VLAN, cloud models, IoT และ secure design principles

แต่ source เก่าครอบคลุมหัวข้อจำนวนมากที่ถูกย้ายหรือไม่ใช่ current Domain 4 core อีกต่อไป เช่น SIEM/SOAR, vulnerability scanning, backup, RAID, power และ fire suppression

บทนี้จึงใช้ **current ISC2 2026 outline เป็น scope authority** และใช้ Thor material เป็น historical teaching support เท่านั้น
