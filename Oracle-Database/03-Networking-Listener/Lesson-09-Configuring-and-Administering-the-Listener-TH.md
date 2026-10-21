# Lesson 09 — Configuring and Administering the Listener (ภาษาไทย)

> 🧠 **ภาพจำก่อนอ่าน:** 🌐 Network → 🛡️ Rules → 🖥️ Backend  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Networking index](./README.md)

> Original Thai teaching, mapped to Oracle University 19c Administration Workshop Lesson 9. Source page-level fidelity and live execution: **PENDING**.

## Learning objectives
เข้าใจว่า listener ต่างจาก database instance; วินิจฉัย listener endpoint, dynamic service registration, dedicated handlers และ PDB services โดยไม่รีสตาร์ทระบบเพื่อเดาสาเหตุ

## Architecture

```mermaid
flowchart LR
 A[JDBC / SQLcl] --> B[TCP listener]
 B --> C[Registered service handler]
 C --> D[Instance / PDB]
 E[LREG] --> B
```

Listener รับ connection request และส่งต่อให้ handler ของ service; ส่วน LREG ทำ dynamic registration. Listener UP ไม่ได้แปลว่า PDB OPEN. `listener.ora` ใช้กำหนด listener endpoints และ options; dynamic registration ไม่ต้องกำหนดทุก service แบบ static SID_LIST.

## Read-only inspection
บน server ที่ได้รับอนุญาต:

```bash
lsnrctl status
lsnrctl services
```

บน SQL session ที่มี view privilege:

```sql
SHOW CON_NAME
SELECT name,network_name,con_id FROM v$services ORDER BY name;
SELECT instance_name,status FROM v$instance;
SELECT name,open_mode FROM v$pdbs;
SELECT name,value FROM v$parameter WHERE name IN ('local_listener','remote_listener');
```

## Incident lab: ORA-12514 / ORA-12519
1. ตรวจ host/port reachability และ service name ที่ client ขอ
2. เช็ก handler state จาก `lsnrctl services`
3. ตรวจ PDB state, registered service และ timestamp ของ logs
4. เมื่อ ORA-12519 ดู process/session headroom และ connection pool behavior; อย่าสรุปจาก error เพียงบรรทัด
5. ทำ change proposal พร้อม rollback ถ้าจำเป็นต้องปรับ configuration

`SERVICE_NAMES` ถูก deprecate สำหรับการจัดการ service ด้วยมือมาตั้งแต่ Oracle 19c: ใช้ DBMS_SERVICE/SRVCTL/GDSCTL ตาม topology. Listener control commands ที่เปลี่ยน state ต้องใช้ change approval.

## 🩺 Official-document validation — ORA-12519 & Handler State (2026-10-21)

**Oracle error definition:** ORA-12519 หมายถึง Listener ไม่พบ **service handler ที่พร้อมและเหมาะกับ connection request** ไม่ใช่หลักฐานว่า Listener Down และ **ไม่ยืนยัน** ว่า `PROCESSES` หรือ `SESSIONS` เต็มโดยอัตโนมัติ

```mermaid
flowchart TD
  E[ORA-12519] --> L[lsnrctl services]
  L --> H{Requested service & handler?}
  H -->|Not registered| S[Inspect service/PDB registration]
  H -->|BLOCKED or no available handler| C[Check instance capacity and pool trend]
  H -->|READY but still fails| P[Compare protocol and listener/client logs]
  S --> V[Collect evidence then propose change]
  C --> V
  P --> V
```

1. จาก host ที่ได้รับอนุญาต ใช้ `lsnrctl services` **แบบอ่านสถานะ** ดูชื่อ service, `DEDICATED` หรือ dispatcher, `READY` / `BLOCKED` และตัวนับ `established`, `refused`, `current`, `max`. `UNKNOWN` อาจเป็น static registration ไม่ได้แปลว่า Instance Down เสมอ
2. เทียบเวลา Error กับ `V$SERVICES`, `V$INSTANCE`, `V$PDBS` และ `V$RESOURCE_LIMIT` โดยใช้ View Privileges ที่ได้รับอนุญาต; ประเมิน Connection Pool Leak/Churn ร่วมด้วย
3. ตรวจ Network/Listener Log และ Error ฝั่ง JDBC ก่อนเสนอการเพิ่ม `PROCESSES`, Restart หรือแก้ Service Configuration
4. หาก handler ยัง `READY` แต่ client ถูกปฏิเสธ ให้ตรวจ Protocol, Service Requested และ Handler Eligibility แทนการเดาว่าไม่มี capacity

```sql
-- Read-only: must have privileges to query V$RESOURCE_LIMIT.
SELECT resource_name,current_utilization,max_utilization,initial_allocation,limit_value
FROM v$resource_limit
WHERE resource_name IN ('processes','sessions')
ORDER BY resource_name;
```

**ที่มา:** [Oracle 19c Net Listener — Monitoring Service Handlers](https://docs.oracle.com/en/database/oracle/oracle-database/19/netag/configuring-and-administering-oracle-net-listener.html) · [Oracle Error ORA-12519](https://docs.oracle.com/en/error-help/db/ora-12519/). นี่คือ Static Read-only Diagnostic ไม่ใช่ผลทดสอบ Production.

## Review questions
- Listener UP แต่ service ไม่ขึ้น เกิดจากอะไรได้บ้าง?
- Dynamic registration แตกต่างจาก static registration อย่างไร?
- ทำไมการเพิ่ม processes อาจไม่แก้ JDBC connection leak?

## Official source
- <https://docs.oracle.com/en/database/oracle/oracle-database/26/netag/overview-oracle-net-listener.html>
- <https://docs.oracle.com/en/database/oracle/oracle-database/26/netag/registering-information-local-listener.html>
