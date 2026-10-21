# Activity 03 — Essential Google Cloud Infrastructure: Foundation (ฉบับอ่านเป็นโน้ตภาษาไทย)

[กลับไปคู่มืออ่านตาม Learning Path](./LEARNING-PATH-STUDY-GUIDE-TH.md) · [Activity 01](./Path-Activity-01-GSP282-TH.md) · [Activity 02](./Path-Activity-02-ACE-Study-Guide-TH.md) · [Lab map](./Lab-Guide-TH/LEARNING-PATH-LAB-MAP.md) · [Google Skills course](https://www.skills.google/paths/11/course_templates/50)

> บันทึกนี้เขียนประกบกิจกรรมที่ 3 ของ **Associate Cloud Engineer Certification Learning Path** โดยตรง ตาม course page ที่ตรวจเมื่อ 5 ตุลาคม 2026 เนื้อหาหลักของ course คือการใช้ Console/Cloud Shell, deploy จาก Marketplace, สร้าง VPC/firewall และสร้าง/ปรับ Compute Engine VM คู่มือนี้เป็นโน้ตและแบบฝึกเสริม ไม่ใช่คำแปลโจทย์หรือเฉลย grader ของ Google Skills

## เป้าหมายการเรียนรู้

เมื่อจบหัวข้อนี้ ควรอธิบายและทำสิ่งต่อไปนี้ได้:

1. เลือก project ที่ถูกต้องและแยก project ID, project name และ project number
2. ใช้ Console และ Cloud Shell ตรวจ context ก่อนสร้าง resource
3. อธิบายความสัมพันธ์ระหว่าง VPC, subnet, IP, route และ firewall
4. เลือก auto-mode หรือ custom-mode VPC ตามข้อกำหนด
5. วาง traffic path ของ VM และบอกได้ว่าอะไรเป็นตัวกำหนดทางออก/ทางเข้า
6. สร้าง VM โดยเลือก region/zone, machine type, boot disk, network interface และ access ให้เหมาะ
7. ประเมินค่าใช้จ่ายเบื้องต้นและลบ resource ที่ทดลองใช้

## 1. ภาพรวมสิ่งที่ course นี้สอน

Google Skills course page กำหนดผลลัพธ์ไว้ 4 กลุ่ม: ใช้ Google Cloud Console และ Cloud Shell, deploy solution จาก Google Cloud Marketplace, สร้าง VPC networks/firewall rules และสร้าง/ปรับแต่ง VM ด้วย Compute Engine

Syllabus สาธารณะของ course แบ่งหัวข้อเป็น:

- **Interacting with Google Cloud** — Console, Cloud Shell, project concepts, lab ดู UI/สร้าง bucket และ deploy LAMP จาก Marketplace
- **Virtual Networks** — VPC, project/network/subnetwork, subnet expansion, IP addresses, routes/firewall, pricing, สร้างและ configure VPC, Private Google Access และ Cloud NAT
- **Virtual Machines** — สร้าง VM, access/lifecycle, machine choices/pricing, special configurations, images/disks และงาน create/configure VM

รายละเอียดเวลา/ชื่อ lab อาจเปลี่ยนตาม edition และบัญชี ให้ยึดรายการที่แสดงในหน้า Google Skills ของผู้เรียนเมื่อลงมือจริง

## 2. Project คือขอบเขตจัดการ resource

Project เป็นขอบเขตหลักที่ใช้เปิด API, จัดการ IAM, quota และ billing attribution ของ resource เช่น VM, disk และ VPC

| ค่า | ใช้ทำอะไร | ข้อควรระวัง |
|---|---|---|
| Project name | ชื่ออ่านง่ายใน Console | เปลี่ยนได้ และไม่ใช่ตัวอ้างอิง CLI ที่ปลอดภัย |
| Project ID | ตัวระบุที่ใช้บ่อยใน CLI/API | โดยทั่วไปเปลี่ยนไม่ได้หลังสร้าง |
| Project number | เลขประจำ project | ใช้กับ service agents และ resource identity บางกรณี |

ก่อนคำสั่งที่สร้าง/แก้ไข resource ให้ตรวจอย่างน้อย:

```bash
gcloud auth list
gcloud config get-value project
gcloud config list
```

หาก project context ว่างหรือผิด ให้หยุดก่อน ไม่ควรเดา project จากชื่อคล้ายกัน การเปิด API อาจสร้าง service identity และการสร้าง resource เริ่มมีค่าใช้จ่ายได้

**Cloud Shell** คือ shell ที่ Google จัดให้ใน browser มี Google Cloud CLI และ authentication/context ที่เชื่อมกับผู้ใช้ใน Console ได้สะดวก แต่ยังต้องตรวจ project/region/zone เอง และไฟล์ใน home directory ควรมองเป็นพื้นที่ทำงาน ไม่ใช่ระบบ backup ถาวร

คำสั่งตรวจที่ใช้บ่อย:

```bash
gcloud config get-value project
gcloud config get-value compute/region
gcloud config get-value compute/zone
gcloud projects describe PROJECT_ID
```

## 3. Cloud Marketplace: เร่ง deploy แต่ต้องตรวจสิ่งที่จะถูกสร้าง

Marketplace ช่วยติดตั้ง solution ที่รวม software และ infrastructure ไว้ด้วยกัน ตัวอย่างใน course คือ LAMP stack (Linux, Apache, MySQL, PHP) บน Compute Engine

มอง Marketplace deployment เป็น deployment template ที่ยังต้อง review:

- resource ที่จะสร้าง เช่น VM, disk, firewall rule, service account
- machine type, zone, boot disk และ public IP
- network ports ที่เปิดและ source range ของ firewall rule
- license/software terms และค่าใช้จ่ายต่อเนื่อง
- วิธีเข้าถึง, update, backup และลบ resource

**อย่าถือว่า “คลิกเดียว” หมายถึงปลอดภัยหรือฟรี** และอย่าเปิดหน้าเว็บบน public IP ให้โลกเข้าถึงโดยไม่เข้าใจ ports/credentials หากทำใน Google Skills lab ให้ใช้ temporary project/credentials ที่ lab เตรียมไว้เท่านั้น และกด End Lab ตามคำแนะนำของ lab

## 4. โครงข่ายพื้นฐาน: VPC → subnet → NIC

### VPC network

VPC เป็นขอบเขตเครือข่ายแบบ logical ของ Google Cloud และเป็น global resource ภายใน project ส่วน subnet เป็น regional resource แต่ VM ต้องอยู่ใน zone หนึ่งซึ่งอยู่ภายใน region ของ subnet

```text
Project
└── VPC network (global)
    ├── Subnet asia-southeast1 (regional CIDR)
    │   ├── VM NIC: internal IP
    │   └── VM NIC: internal IP
    └── Subnet us-central1 (regional CIDR)
        └── VM NIC: internal IP
```

Google Cloud เรียก subnet ว่า subnetwork ในหลายหน้าจอ/คำสั่ง เป็นแนวคิดเดียวกัน

### Auto-mode เทียบกับ custom-mode

| แบบ | พฤติกรรม | เหมาะเมื่อ |
|---|---|---|
| Auto mode | สร้าง subnet ตาม region ด้วยช่วง IPv4 ที่ระบบกำหนด | ทดลอง/เริ่มต้นในสถานการณ์ที่ไม่มีข้อกำหนด CIDR เข้ม |
| Custom mode | ผู้ดูแลเลือก region และ CIDR ของแต่ละ subnet เอง | งานจริง, ต้องวาง IP plan, เชื่อม on-premises/เครือข่ายอื่น หรือควบคุมไม่ให้ช่วงชนกัน |

Auto-mode สะดวกแต่เลือก CIDR เองไม่ได้ทุกอย่าง และเมื่อมี region ใหม่ subnet อาจเพิ่มตามรูปแบบ auto network จึงไม่ใช่ตัวเลือกที่ควรใช้โดยไม่ตรวจ architecture การแปลง auto → custom เป็นการเปลี่ยนแบบที่ย้อนกลับไม่ได้ตามปกติ ต้องวางแผนก่อน

### วาง CIDR

CIDR กำหนดช่วง internal IP ใน subnet ตัวอย่าง `10.20.0.0/20` มีช่วง address มากกว่า `10.20.0.0/24` ก่อนจัดสรรให้ตรวจช่วงของ VPC อื่น, on-premises, VPN/Interconnect, peering และ IP ที่สงวน/ใช้ไปแล้ว อย่าดูเฉพาะ subnet ปัจจุบันถ้ามีแผนเชื่อมเครือข่ายภายหลัง

## 5. IP address ของ VM

- **Internal IP** ใช้สื่อสารภายใน VPC/เครือข่ายที่เชื่อมต่อกันตาม routes และ firewall
- **External IP** เป็นปลายทาง public ที่ช่วยให้สื่อสารผ่าน Internet ได้ แต่ไม่ได้ทำให้ทุก port รับ traffic ได้เอง
- VM อาจไม่มี external IP และยังเรียก Google APIs ผ่านเส้นทาง/การตั้งค่าที่รองรับได้ เช่น Private Google Access สำหรับกรณีเหมาะสม
- IP ภายใน/ภายนอกอาจเป็น ephemeral หรือ static ตามวิธีจัดสรร อย่าผูก DNS/application สำคัญกับ IP ชั่วคราวโดยไม่วางแผน

การเห็น external IP ไม่ได้แปลว่า firewall เปิดทาง และการมี route ไป Internet ไม่ได้แปลว่า inbound request ผ่าน firewall ได้

## 6. Routes กับ firewall ทำงานคนละหน้าที่

**Route** ตอบว่า packet ที่ออกจาก VM ควรส่งต่อไปทางใด เช่น default route ไป Internet gateway หรือ route ไป subnet/เครือข่ายที่เชื่อมต่อ

**VPC firewall rule** อนุญาตหรือปฏิเสธ traffic ตามทิศทาง, protocol/port, source/destination และ target ของ rule โดยปริยาย traffic ไม่ได้ถูกอนุญาตทั้งหมดเพียงเพราะ VM อยู่ใน VPC

เวลาวิเคราะห์ “เข้า VM ไม่ได้” ให้แยกตรวจ:

1. ใช้ IP/hostname ถูกหรือไม่
2. มีเส้นทางจาก client ถึงปลายทางหรือไม่
3. มี external IP, VPN/IAP/bastion หรือ access path ที่ตั้งใจไว้หรือไม่
4. firewall policy/rule อนุญาต protocol/port จาก source ที่ถูกต้องหรือไม่
5. guest OS firewall และ service process ฟัง port/address นั้นหรือไม่

เวลาวิเคราะห์ “VM ออก Internet ไม่ได้” ให้ตรวจ external IP หรือ Cloud NAT ตาม design, route, egress firewall, DNS และ guest configuration แยกกัน Cloud NAT จัดการ outbound translation สำหรับ resource ที่ไม่มี external IP ในรูปแบบที่รองรับ แต่ **ไม่ได้สร้าง inbound access ให้ VM**

## 7. Private Google Access กับ Cloud NAT

| ความต้องการ | แนวทาง | สิ่งที่ไม่ได้ทำ |
|---|---|---|
| VM ไม่มี external IP แต่ต้องเข้าถึง Google APIs/services ที่รองรับ | Private Google Access บน subnet ตามเงื่อนไข | ไม่ใช่ทางออก Internet ทั่วไป |
| VM ไม่มี external IP แต่ต้องติดต่อ public endpoints บน Internet | Cloud NAT พร้อม routes/config ที่เหมาะ | ไม่เปิด inbound connection เข้าหา VM |
| ผู้ดูแลต้อง SSH เข้า private VM | IAP TCP forwarding, bastion, VPN หรือเส้นทาง private ที่ออกแบบไว้ | Cloud NAT อย่างเดียวใช้ inbound SSH ไม่ได้ |

แนวคิดสำคัญคือ “private IP” ไม่ได้เท่ากับ “ไม่มี egress” และ “มี NAT” ไม่ได้เท่ากับ “ปลอดภัยทุกอย่าง” ต้องพิจารณา firewall, DNS, routes, IAM และจุดประสงค์ของ traffic ด้วย

## 8. Compute Engine VM: สิ่งที่ต้องเลือก

| ส่วน | คำถาม |
|---|---|
| Region/zone | ต้องอยู่ใกล้ผู้ใช้/data หรือมีข้อกำหนด residency/availability ใด |
| Machine family/type | CPU, memory, performance และ workload เหมาะกันหรือไม่ |
| Boot image | OS/version รองรับ app, patching และ license แบบใด |
| Boot disk | capacity/type/performance พอไหม และลบพร้อม VM หรือเก็บไว้ |
| Network interface | อยู่ VPC/subnet ใด, ต้องมี external IP หรือไม่ |
| Service account | VM ต้องเรียก Google API ใดบ้าง ให้สิทธิ์น้อยที่สุด |
| Access | OS Login/IAP/SSH key/serial access ตาม policy ไหน |
| Availability | zone failure รับได้หรือควรใช้ MIG/regional architecture |
| Cost | ค่า VM + disk + IP + network + license และเวลาที่ปล่อย resource ไว้ |

**VM lifecycle:** create → start/run → stop/suspend ตามชนิดและข้อจำกัด → start อีกครั้ง → delete  
การ stop VM ลด compute charges ในหลายกรณี แต่ disk และ resource อื่นอาจยังคิดค่าใช้จ่าย; static external IP ที่ไม่ได้ใช้งานก็อาจมีค่าใช้จ่ายตาม pricing ปัจจุบัน ตรวจ billing ก่อนทดลองจริง

### Startup script ใช้เมื่อใด

Startup script ช่วยทำงานเริ่มต้นเมื่อ VM boot เช่น ติดตั้ง package หรือสร้างไฟล์ทดสอบ แต่ไม่ใช่เครื่องมือจัดการ configuration ระยะยาวโดยอัตโนมัติ ต้องระวัง idempotency, package source, secret exposure และ log ที่มีข้อมูลสำคัญ

สำหรับ production ควรใช้ image/config management หรือ deployment pipeline ที่ตรวจซ้ำได้ แทนการพึ่ง script ยาวที่แก้ไขไม่ได้และไม่มี version control

## 9. แบบจำลอง request เข้าถึง web VM

สำหรับ client บน Internet ไปยัง web service บน VM ต้องมีองค์ประกอบครบ:

1. client resolve ชื่อเป็น public endpoint/IP ที่ถูกต้อง
2. forwarding/เส้นทางส่ง traffic ไป VM หรือ load balancer ที่ตั้งใจ
3. VPC firewall อนุญาต ingress เฉพาะ port/source ที่จำเป็น
4. guest OS firewall ไม่บล็อก
5. web server ทำงานและ bind address/port ที่รับ traffic
6. application พร้อมตอบ และ dependency ใช้งานได้

การเปิด TCP/80 ไม่ได้เปิด TCP/22; firewall rule หนึ่งตัวไม่ได้แทนอีกตัว และการเปิด source เป็น `0.0.0.0/0` ขยายผู้ที่ลองเชื่อมต่อได้ทั่ว Internet ควรใช้ source ที่แคบและกลไก admin access ที่องค์กรอนุมัติ

## 10. แบบฝึกปฏิบัติประกบ course (ทำใน Skills lab เป็นหลัก)

Course edition ปัจจุบันแสดง lab ที่เกี่ยวข้อง เช่น สำรวจ Console/Cloud Shell, Marketplace LAMP, สร้าง/configure VPC, Private Google Access/Cloud NAT และสร้าง/configure VM รายการและ grader ให้ยึดหน้า course ที่คุณเห็น

แบบฝึกต่อไปนี้ออกแบบเพื่อเข้าใจเป้าหมาย ไม่ใช่คำสั่งให้ทำใน production:

### Lab A — Console และ Cloud Shell

- ระบุชื่อ project, project ID และ project number
- เปิด Cloud Shell ตรวจ account, project และค่า region/zone
- สร้าง bucket ตามงานใน course lab หรือทบทวน flow ผ่าน Console
- ทดลองคำสั่งแบบ read-only เช่น `gcloud compute zones list`, `gcloud compute machine-types list --zones=ZONE`
- อธิบายว่าคำสั่งใดสร้าง resource และคำสั่งใดแค่ดูข้อมูล

### Lab B — Marketplace LAMP

ทำเฉพาะใน temporary project ของ Google Skills และเฉพาะเมื่อ course lab เปิดให้:

- ตรวจองค์ประกอบ Linux/Apache/MySQL/PHP และ VM ที่ Marketplace จะสร้าง
- ตรวจ machine type, zone, disk, external IP และ ports ก่อน deploy
- หลัง deploy ตรวจ VM state และเปิด URL จากผลลัพธ์
- ระบุ ingress rules ที่จำเป็นและอธิบายว่าทำไมไม่ควรเปิด database/admin ports สู่ Internet
- จบ lab ตามปุ่ม End Lab แล้วตรวจว่าทรัพยากรชั่วคราวถูกล้าง

### Lab C — VPC และ VM (แผนผัง)

ก่อนสร้าง resource ให้เขียนแผน:

- project: `PROJECT_ID`
- custom VPC: `ace-foundation-vpc`
- region/subnet/CIDR: เลือกช่วงที่ไม่ชนเครือข่ายอื่น
- VM: เลือก zone ใน region เดียวกับ subnet
- ingress: อนุญาตเฉพาะ HTTP จากแหล่งที่กำหนดใน lab
- egress: อธิบายว่าจะใช้ external IP, Private Google Access หรือ Cloud NAT สำหรับ traffic แต่ละชนิด

จากนั้นใน Google Skills course lab สร้าง VPC/subnet, VM, ปรับ firewall ตามโจทย์ และตรวจ VM/network details ใน Console กับคำสั่ง read-only `gcloud compute instances describe VM_NAME --zone=ZONE`.

### Lab D — Private Google Access กับ NAT

ใช้ lab ที่ course เตรียมให้เพื่อเปรียบเทียบสถานการณ์:

- VM ไม่มี external IP แต่เข้าถึง Google API ที่รองรับผ่าน Private Google Access
- VM ไม่มี external IP แต่ต้องออก Internet ผ่าน Cloud NAT
- ตรวจ route, firewall, DNS และ NAT logging/diagnostics ที่โจทย์เปิดให้
- ยืนยันว่า NAT ไม่ได้ทำให้ SSH จาก Internet เข้ามาได้

อย่าสร้าง Cloud NAT ใน project ส่วนตัวเพื่อทดลองโดยไม่ตรวจราคาและลบ resource เมื่อเสร็จ

## 11. Troubleshooting แบบแยกชั้น

| อาการ | ตรวจเป็นลำดับ |
|---|---|
| สร้าง resource ไม่ได้ | project, billing, API, IAM permission, quota, region/zone availability |
| VM ค้าง provisioning หรือสร้างไม่ได้ | zone, machine type availability, quota, policy, boot image/disk config |
| SSH ไม่ได้ | access method/IAM, IAP/VPN/bastion, firewall ingress, route, OS Login/SSH config |
| เข้าเว็บไม่ได้ | external IP/DNS, ingress firewall, guest firewall, process/listening port, app logs |
| VM private เรียก Google API ไม่ได้ | Private Google Access, DNS, API enabled, IAM ของ VM service account, egress firewall |
| VM private ออก Internet ไม่ได้ | Cloud NAT coverage/config, route, DNS และ egress policy |
| VM ทำงานแต่มีค่าใช้จ่ายต่อ | disk, static IP, NAT, snapshots, images, logs และ resources ที่ไม่ได้ลบ |

แก้ปัญหาทีละชั้นและเก็บ error message ก่อนเปลี่ยน firewall กว้าง ๆ การเปิดทุก port จากทุก source เพื่อ “ทดสอบเร็ว” อาจเพิ่มความเสี่ยงโดยไม่บอกสาเหตุจริง

## 12. สรุปจุดตัดสินใจ

- VPC เป็น global; subnet เป็น regional; VM เป็น zonal
- route เลือกทางไป; firewall คุมว่า traffic ถูกอนุญาตหรือไม่
- external IP, Private Google Access และ Cloud NAT แก้คนละโจทย์
- private VM ยังต้องมี access path ที่ออกแบบไว้สำหรับ admin
- Marketplace เร่ง deploy แต่ต้องตรวจ resource, ports และ recurring cost
- VM stop ไม่ได้แปลว่าค่าใช้จ่ายทุกอย่างหยุด
- Console และ gcloud คือหน้าตา/เครื่องมือที่เรียกจัดการ cloud resources; ตรวจ project context ก่อนทำ write operation เสมอ

## เช็กความเข้าใจ

1. VPC เป็น regional หรือ global resource? แล้ว subnet ล่ะ?
2. มี external IP แต่เข้า SSH ไม่ได้ อะไรบ้างที่ยังขวางได้?
3. VM ไม่มี external IP แต่ต้องเรียก Google API กับ public package repository ใช้แนวทางเหมือนกันหรือไม่?
4. Cloud NAT ช่วยให้ administrator SSH เข้ามาจาก Internet ได้หรือไม่?
5. ทำไม production network มักเลือก custom-mode VPC?
6. Stop VM แล้ว resource ใดอาจยังมีค่าใช้จ่าย?
7. เมื่อ Marketplace deploy LAMP stack ควรตรวจอะไรบ้างก่อนเผย URL ให้ผู้ใช้?

**เฉลยย่อ:** VPC เป็น global, subnet เป็น regional; external IP ไม่ข้าม firewall/OS/service; Google APIs อาจใช้ Private Google Access แต่ Internet egress ต้องมี egress design เช่น NAT; NAT ไม่ให้ inbound; custom mode คุม CIDR/region; disk/IP/NAT/snapshots อาจยังคิดเงิน; review machine/disk/network/firewall/license และ cleanup

## แหล่งอ้างอิง

- [Associate Cloud Engineer Path — Activity 03](https://www.skills.google/paths/11/course_templates/50)
- [Official course overview and public syllabus](https://www.coursera.org/learn/gcp-infrastructure-foundation) — หลักสูตร Google Cloud Training; ใช้ cross-check ชื่อ module และรายการ course labs
- [Working with Google Cloud Console and Cloud Shell lab](https://www.skills.google/course_templates/50/labs/530345)
- [Deploy a LAMP Stack with Google Cloud Marketplace lab](https://www.skills.google/focuses/19092)
- [Organize resources and projects](https://docs.cloud.google.com/docs/get-started/organize-resources)
- [Cloud Shell overview](https://docs.cloud.google.com/shell/docs/overview)
- [VPC overview](https://docs.cloud.google.com/vpc/docs/overview)
- [VPC networks](https://docs.cloud.google.com/vpc/docs/vpc)
- [Subnets](https://docs.cloud.google.com/vpc/docs/subnets)
- [Routes](https://docs.cloud.google.com/vpc/docs/routes)
- [Create and modify VPC networks](https://docs.cloud.google.com/vpc/docs/create-modify-vpc-networks)
- [Create and start a Compute Engine instance](https://docs.cloud.google.com/compute/docs/instances/create-start-instance)
- [Compute Engine networking overview](https://docs.cloud.google.com/compute/docs/networking/network-overview)
- [Private Google Access](https://docs.cloud.google.com/vpc/docs/private-google-access)
- [Cloud NAT overview](https://docs.cloud.google.com/nat/docs/overview)

## 📚 Deep Learning Notes — เดิน Packet หนึ่งเที่ยวจาก Internet ถึง VM (Original Supplement, 2026-10-21)

### 1. VPC, Subnet, IP, Route, Firewall ทำงานคนละส่วน

~~~mermaid
flowchart LR
 U[Browser] --> D[Public DNS]
 D --> IP[Public address]
 IP --> NIC[VM NIC in regional subnet]
 NIC --> FW{VPC firewall permits ingress?}
 FW -->|Yes| OS[OS firewall / listener port]
 FW -->|No| X[Traffic blocked]
 OS --> APP[Web process]
~~~

**VPC** เป็น Virtual Network ที่มีขอบเขต Global; **Subnet** อยู่ใน Region โดยกำหนด IP Range; **VM NIC** ต้องอยู่ใน Subnet; **Routes** ใช้เลือก Next Hop สำหรับ Packet และ **Firewall Rules/Policies** ตรวจว่าทราฟฟิกผ่านหรือไม่. สร้าง Route สำเร็จไม่ได้หมายความว่า TCP 443 ผ่าน; เปิด Firewall TCP 443 ไม่ได้หมายความว่า Web Server Listening 443

### 2. ลองวิเคราะห์ระบบจริงที่มี VM แต่เข้าเว็บไม่ได้

สมมติ VM อยู่ `asia-southeast1-b`, Web App Listening TCP 8080 และมี External IP. Client เข้า `https://site.example.test` แล้ว Timeout:

| ชั้น | สิ่งที่ตรวจ | ถ้าผิดจะเห็นอะไร |
|---|---|---|
| DNS | A/AAAA Record ชี้ที่ Endpoint ไหน | Resolve ผิด Address หรือ Public DNS ไม่มี |
| IP/Route | VM มี External IP หรือ LB Frontend หรือไม่ | Traffic ไปไม่ถึง Destination |
| VPC Firewall | Allow TCP Port/Target Tag หรือ Service Account ตรงไหม | Rule อาจไม่ Apply แม้มี Allow Rule อยู่ |
| OS Firewall | Host เปิด Listener Inbound หรือไม่ | TCP Block หรือ Connection Refused |
| Process | App รันและ Bind Address/Port ถูกไหม | Connection Refused/HTTP 5xx |
| Health | ถ้าใช้ Load Balancer — Probe Path/Port และ Backend Status | Backend UNHEALTHY |

**ข้อควรจำ:** Cloud NAT ใช้ให้ VM ที่ไม่มี External IP ออกไปยัง Internet Destination ตาม Routes ได้; ไม่ใช่ Service ที่เปิด Inbound เข้าหา VM โดยตรง. Private Google Access สำหรับ Google APIs มีเงื่อนไขต่างจาก Outbound Internet ผ่าน Cloud NAT

### 3. Read-only CLI Diagnostics ก่อนแก้ VPC

~~~bash
# Only against your assigned lab project. Commands inspect, do not create resources.
gcloud config list
gcloud compute networks list --project=LAB_PROJECT_ID
gcloud compute networks subnets list --project=LAB_PROJECT_ID
gcloud compute firewall-rules list --project=LAB_PROJECT_ID
gcloud compute instances list --project=LAB_PROJECT_ID
~~~

`LAB_PROJECT_ID` เป็น Placeholder. ตีความ Routes/NAT/Firewall จาก Network ที่ VM ใช้จริง ไม่ใช่แค่จำนวน Rules ใน Project. สำหรับองค์กรที่ใช้ Hierarchical Firewall Policies ต้องตรวจระดับ Org/Folder ด้วย — Project Rule เพียงอย่างเดียวอาจไม่อธิบาย Decision ทั้งหมด

### 4. จำ Cost / Security Trade-off ก่อนเลือก Architecture

- Public VM มี External Attack Surface มากกว่า Private VM + IAP/Approved Access Pattern; ถ้า Web App ต้อง Public อาจใช้ Managed Load Balancer และ Backend Private พร้อม Health Check
- Auto-mode Subnets อาจไม่เหมาะเมื่อวาง Addressing Plan กับ On-prem VPN หรือ CIDR ของระบบอื่น; Custom-mode ช่วยกำหนด Range ด้วยตัวเอง
- Marketplace ทำให้ Provisioning ง่าย แต่ต้อง Review IAM, VM Size, Persistent Disks, Licensing และ Billing ก่อนกด Deploy

### 🎯 Mini-case ปิดหนังสือ

Private VM ต้อง `apt update` ออก Internet แต่ไม่มี External IP. หลัง Setup Cloud NAT แล้วยังไม่ได้: เขียน Decision Tree ตรวจ Default Route, Cloud Router/NAT Attachment, Region, Firewall Egress, Guest DNS และ Proxy ก่อนเสนอ “เปิด External IP ชั่วคราว”

**Official references:** [VPC Overview](https://cloud.google.com/vpc/docs/vpc) · [VPC Firewall](https://cloud.google.com/firewall/docs/firewalls) · [Cloud NAT](https://cloud.google.com/nat/docs/overview) · [Private Google Access](https://cloud.google.com/vpc/docs/private-google-access).

**Lab note:** Diagram และ Diagnostics เป็น Original Companion Explanation; ไม่ได้ Execute VM/NAT และไม่ใช่คำสั่ง Grader ทางการ
