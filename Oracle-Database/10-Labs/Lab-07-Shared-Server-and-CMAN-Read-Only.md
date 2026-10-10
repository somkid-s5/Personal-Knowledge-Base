# Lab 07 — Shared Server & CMAN Diagnostic Workbook (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Lesson 10](../03-Networking-Listener/Lesson-10-Shared-Server-Architecture-TH.md) · [Lesson 11](../03-Networking-Listener/Lesson-11-Oracle-Connection-Manager-TH.md)

> Original companion lab for Oracle Net Services. **Not an official Activity Guide lab. Not executed on an Oracle instance.** SELECT-only SQL and tabletop CMAN design. No ALTER SYSTEM, CMCTL state commands, editing cman.ora, or listener restarts.

## Prerequisites
- Authorized 19c/26ai lab, SQL client, permission to read relevant V$ views
- Optional sanitized CMAN topology from a test environment (no secrets)
- Record exact Oracle version, current PDB, and observation timestamp

## Part A — Identify connection mode

```sql
SHOW USER
SHOW CON_NAME
SELECT server, COUNT(*) total_sessions FROM v$session GROUP BY server;
SELECT name,value FROM v$parameter
WHERE name IN ('shared_servers','max_shared_servers','dispatchers','max_dispatchers');
```

**Expected:** Different connection mode categories may appear; a zero shared-session count is not a failure if shared servers are not configured.

## Part B — Dispatcher and shared-server health

```sql
SELECT name,status,busy,idle FROM v$dispatcher;
SELECT name,status,requests,busy FROM v$shared_server;
SELECT type,queued,wait,totalq FROM v$queue;
```

**Expected:** These views may return zero rows when shared server is unused. View access is controlled. Counters represent accumulated and point-in-time data; correlate multiple samples before conclusions.

## Part C — CMAN architecture tabletop
Draw and label `Client → CMAN gateway/rule → Database Listener → Handler → PDB`.
Answer: Which source subnet, destination host/port/service are allowed? Which administration connections need separate CMCTL rules? How will you test denied requests without exposing network?

## Part D — Failure drill
1. App reports ORA-12519. What does `lsnrctl services` show?
2. Are dispatchers registered? Are `V$QUEUE` trends increasing?
3. Is the application pool leaking/holding sessions?
4. Does CMAN have routing/ACL denials, or is the backend listener busy?
5. What rollback does a network architecture change require?

## Exit criteria
- [ ] Distinguish dedicated/shared, dispatcher, shared server and CMAN
- [ ] Explain queues, session multiplexing and client routing
- [ ] Inspect authorized runtime without changing parameters
- [ ] Provide evidence-based incident hypotheses and rollback
- [ ] State clearly whether lab was *actually executed* (currently: no)

**Cleanup:** none; disconnect SQL session normally.

## Documentation
- [19c shared server](https://docs.oracle.com/en/database/oracle/oracle-database/19/netag/configuring-shared-server-architecture.html)
- [26ai CMAN configuration](https://docs.oracle.com/en/database/oracle/oracle-database/26/netag/configuring-cman-ora-file-oracle-connection-manager-host.html)
