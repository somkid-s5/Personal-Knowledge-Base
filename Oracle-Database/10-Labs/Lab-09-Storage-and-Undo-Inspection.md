# Lab 09 — Storage, Tablespaces and Undo (Read-only)

> 🧠 **ภาพจำก่อนอ่าน:** 🧪 Lab → 🗄️ Data → ⚙️ Process → 🩺 Health → 🧹 Cleanup  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Storage Lessons 15–18](../05-Storage-Tablespaces-Undo/README.md)

> Original companion lab; not official Activity Guide. Static authored, **not executed**. Only authorized read-only queries; do not alter production.

## Prerequisites
Oracle 19c or 26ai sandbox, SQLcl/SQL*Plus, privileges on DBA and V$ views. Record instance, container, timestamp and redact internal datafile paths.

## Task 1: inspect logical storage

```sql
SHOW CON_NAME
SELECT tablespace_name,contents,status,bigfile
FROM dba_tablespaces ORDER BY tablespace_name;
```

Explain permanent versus temporary versus undo and block/extent/segment/datafile relationship.

## Task 2: inspect file capacity

```sql
SELECT tablespace_name,file_name,bytes,autoextensible,maxbytes
FROM dba_data_files ORDER BY tablespace_name;
SELECT tablespace_name,file_name,bytes,autoextensible,maxbytes
FROM dba_temp_files ORDER BY tablespace_name;
SELECT tablespace_name,SUM(bytes) free_extent_bytes
FROM dba_free_space GROUP BY tablespace_name;
```

Allocated space, free extents, autoextend max and underlying filesystem/ASM capacity are separate. Do not sum current bytes and maxbytes as independent space.

## Task 3: investigate undo

```sql
SELECT tablespace_name,status,SUM(bytes) undo_bytes
FROM dba_undo_extents GROUP BY tablespace_name,status;
SELECT begin_time,end_time,tuned_undoretention,ssolderrcnt,nospaceerrcnt
FROM v$undostat ORDER BY begin_time DESC FETCH FIRST 12 ROWS ONLY;
```

Explain ACTIVE/UNEXPIRED/EXPIRED and that undo retention guarantee can prioritize retention at expense of DML.

**19c RU caution:** ก่อนอธิบายผลของ `UNDO_RETENTION` กับ Fixed-size Undo ให้ตรวจ Release Update: ตั้งแต่ 19c RU 19.7 มี behavior ตาม Parameter Reference ที่ต่างจากรุ่นก่อนหน้า; ใช้ [Oracle 19c UNDO_RETENTION](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/UNDO_RETENTION.html) และเทียบ `V$UNDOSTAT` กับ Undo Capacity จริง. บันทึกเป็น **read-only exercise**; อย่าเปลี่ยน Parameter ใน Production.

## Troubleshooting workshop
- ORA-01653: identify segment, permanent tablespace, file limits, filesystem/ASM limits.
- ORA-01652: investigate TEMP usage and sort/hash workload.
- ORA-01555: inspect long readers, DML churn, undo retention, error timestamps.

## Exit checklist
- [ ] Classify physical versus logical space
- [ ] Explain growth headroom and underlying storage constraints
- [ ] Relate undo history to application query duration
- [ ] No mutating SQL executed; attach redacted evidence only

Cleanup: no resources created. Verification status: NOT RUN.

Official reference: <https://docs.oracle.com/en/database/oracle/oracle-database/26/admin/managing-undo.html>

## 🧪 Sandbox Execution & Evidence (Optional)

[▶️ Runbook + Approved Read-only SQL Scripts](./Sandbox-Validation/README.md) · [📝 Expected vs Actual Evidence Template](./Sandbox-Validation/VALIDATION-EVIDENCE-TEMPLATE.md)

**Status: NOT_EXECUTED.** เมื่อมี Isolated Sandbox ที่ได้รับอนุญาต ให้เลือก Script ที่ตรงหัวข้อ, บันทึก Oracle Version/RU, Container/Privileges และ Expected vs Actual ลง Private Evidence. อย่าอ้างว่า GitHub Actions PASS เท่ากับรัน Lab จริง และห้าม Commit Raw Database Output ลง Public Repository.
