# Lesson 29 — Database Monitoring and Tuning Performance Overview (ภาษาไทย)

> 🧠 **ภาพจำก่อนอ่าน:** 🗄️ Data → ⚙️ Process → 🩺 Health  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Monitoring & Troubleshooting](./README.md) · [Lab 13](../10-Labs/Lab-13-Oracle-Performance-Triage-Read-Only.md)

> Oracle University 19c Administration Workshop Lesson 29. Original Thai learning content; NOT page-level checked against private Student Guide, nor executed on a database. 26ai documentation used for current reference. **AWR/ASH/ADDM may require Diagnostics Pack; SQL Tuning Advisor requires Tuning Pack depending on product/licensing.**

## Goals
แยก throughput/response time/DB time, คิดแบบ wait-time model, สร้าง baseline, ระบุ business impact และอ่าน performance views แบบไม่เดาว่า CPU สูงคือสาเหตุของทุกปัญหา

## 1. Performance is a timed system

~~~mermaid
flowchart LR
 A[Application request] --> B[Network and pool]
 B --> C[Oracle service and session]
 C --> D[CPU execution]
 C --> E[Wait events: I/O, locks, commit]
 D --> F[Response to client]
 E --> F
~~~

User response time รวมเวลาฝั่ง app/network/pool กับ database processing. DB time สะท้อนเวลาที่ foreground sessions ใช้ CPU หรือรอ non-idle waits เป็นตัวช่วยวิเคราะห์ database workload; ไม่ใช่ response time ของ user โดยตรง.

**Throughput** เช่น transactions per second ต่างจาก **latency** เช่น p95/p99 response time และ **concurrency**. เพิ่ม concurrency อาจทำให้ throughput ดีขึ้นช่วงหนึ่งแล้ว latency เพิ่มเพราะ queue/lock.

## 2. Wait-class interpretation

| Class / symptom | Hypothesis | What to correlate |
|---|---|---|
| User I/O | Storage reads or inefficient access | SQL plan, IOPS/latency, buffer cache |
| Commit | Redo log sync/flush | Commit frequency, redo subsystem |
| Application | Row lock contention | blocking sessions, transaction lifetime |
| Concurrency | Internal contention | hot segments/buffers, workload mix |
| Network | Data transfer / network flow | client fetch size, round trips |
| Idle | Waiting for client or normal idle process | Often expected, not an incident by itself |

**A cumulative counter is not a trend** until compared across observations with timestamps. Start with a baseline from normal business periods and repeat read-only measurements at incident time.

## 3. Safe discovery queries

~~~sql
SHOW CON_NAME
SELECT instance_name,status,startup_time FROM v$instance;

SELECT wait_class, total_waits, time_waited
FROM v$system_wait_class ORDER BY time_waited DESC;

SELECT resource_name,current_utilization,max_utilization,limit_value
FROM v$resource_limit
WHERE resource_name IN ('processes','sessions','transactions');
~~~

Units differ between views; check Oracle Reference before comparing metrics or plotting. Do not sum entire lifetime wait values as though they are a 5-minute interval.

## 4. No pack? Still investigate

Oracle has V$SESSION, V$RESOURCE_LIMIT, V$SYSTEM_EVENT, V$SQL and SQL execution-plan metadata, subject to privileges and feature availability. **Do not access AWR, ASH, ADDM or Real-Time SQL Monitoring without checking licensing**, even if default parameters make views queryable.

## 5. Incident scenario
App reports high p95 while database CPU is under 40%. DBAs inspect lock waits, I/O latency, JDBC connection pool queue and SQL execution plan. An OS CPU percentage that is not 100% cannot rule out database wait, single-threaded bottleneck or app-side serialization.

## 6. Diagnostic sequence
1. Reproduce precise symptom/time range and affected service/PDB
2. Correlate app request IDs / logs / database session MODULE/ACTION where available
3. Capture wait classes, SQL_IDs, blocked sessions and resource headroom
4. Compare against normal baseline and change timeline
5. Choose one hypothesis and safe validation; propose approved change only afterward

## Review
- Why does low CPU not rule out slow database requests?
- What makes wait counter trends meaningful?
- How can application connection pooling hide root causes?
- Which Oracle diagnostics are licensed features?

## References
- [26ai Measuring Database Performance](https://docs.oracle.com/en/database/oracle/oracle-database/26/tgdba/measuring-database-performance.html)
- [26ai Database Licensing Information](https://docs.oracle.com/en/database/oracle/oracle-database/26/dblic/Licensing-Information.html)
