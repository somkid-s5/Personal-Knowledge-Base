# Lesson 24 — Loading Data with SQL*Loader (ภาษาไทย)

> 🧠 **ภาพจำก่อนอ่าน:** 🗄️ Data → ⚙️ Process → 🩺 Health  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Oracle Hub](../README.md) · [Data Movement](./README.md) · [Lab 11](../10-Labs/Lab-11-Data-Movement-Read-Only.md)

> Curriculum: Oracle University 19c Administration Workshop, Lesson 24. Original Thai teaching note; full guide fidelity PENDING. ตัวอย่าง control file ใช้เรียน syntax ไม่ใช่ production deployment. No live load executed.

## Learning outcomes
อ่าน control file, อธิบาย conventional/direct/external-table load, จัดการ errors/rejects, ตรวจผลและ rollback migration, ป้องกัน encoding corruption

## 1. สามวิธีของ SQL*Loader

- **Conventional path:** SQL*Loader แปลง input records ไปเป็น bind arrays และ insert ผ่าน database processing; เหมาะกับ workload ทั่วไป
- **Direct path:** สร้าง data blocks ด้วย path ที่ bypass บางส่วนของ conventional processing; เร็วในบางกรณีแต่มี restrictions, locking/index/constraint/redo implications
- **External-table load:** สร้าง external table metadata และใช้ SQL insert จาก external data; ช่วย transformation/parallelism เมื่อเหมาะสม

เลือก mode จาก **ความถูกต้องของข้อมูล** ก่อนความเร็ว. Direct path ไม่ได้ใช้ได้กับทุก constraint/trigger/data type scenario. <https://docs.oracle.com/en/database/oracle/oracle-database/26/sutil/sql-loader-conventional-path-direct-path-external-table-loads.html>

## 2. Control file anatomy (illustrative, DO NOT EXECUTE)

~~~text
-- Sample SQL*Loader control-file structure; lab-only placeholders:
LOAD DATA
INFILE 'sample.csv'
BADFILE 'sample.bad'
DISCARDFILE 'sample.dsc'
APPEND
INTO TABLE LAB_STAGE
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
TRAILING NULLCOLS
(
  id INTEGER EXTERNAL,
  customer_name CHAR(100),
  amount DECIMAL EXTERNAL
)
~~~

การอ่าน file จริงต้องออกแบบ handling ของ **embedded comma, quotes, newlines, character sets, decimal/date masks, nulls, duplicate keys และ trailing spaces**; example นี้ไม่ใช่ CSV parser ที่ robust สำหรับทุก input. Mode `APPEND` เพิ่มข้อมูลถ้ารันซ้ำ — เสี่ยง duplicate; ต้องวาง idempotency.

## 3. Logs: errors, bad, discard

| Output | ความหมาย | DBA ต้องตรวจ |
|---|---|---|
| Loader log | counts, field mappings, operation summary | logical/physical records, errors, elapsed time |
| Bad file | records ที่ถูกปฏิเสธระหว่าง parsing/DB insertion | invalid datatype, constraint, charset |
| Discard file | records ที่ไม่ผ่าน selection WHEN clause | ธุรกิจต้องการ discard จริงหรือไม่ |
| Database target | data rows ที่ insert แล้ว | row counts, sums, keys, referential consistency |

**Import success ไม่เท่ากับ row-level correctness**: เช่นชื่อภาษาไทยอาจกลายเป็น mojibake โดยไม่มี ORA error.

## 4. Read-only inspection

~~~sql
SHOW CON_NAME
SELECT owner,table_name,num_rows,last_analyzed
FROM dba_tables
WHERE owner='LAB_OWNER' ORDER BY table_name;
SELECT owner,table_name,constraint_name,constraint_type,status
FROM dba_constraints
WHERE owner='LAB_OWNER' ORDER BY table_name;
~~~

`NUM_ROWS` เป็น optimizer statistics อาจ stale/estimated — ไม่ใช่ `COUNT(*)` ที่เที่ยงตรงทุกเวลา. ใน sandbox สามารถทำ `SELECT COUNT(*)` บน authorized table เมื่อตรวจ impact ของ full scans แล้ว.

## 5. Validation worksheet
1. ขนาดและ hash ของ source file ก่อน upload
2. encoding/BOM, decimal separator, date time zone และ CSV quoting rules
3. expected input records / rejected / discarded / inserted ตามธุรกิจ
4. uniqueness, constraints, duplicates, null percentages, key ranges
5. reconciled totals เช่น SUM(amount) ก่อนและหลัง load
6. sample Thai characters แบบที่ source ควบคุมได้
7. retry policy และ undo/rollback (staging table, snapshot/backup)

## 6. Incident scenario
เจอ ORA-01722 Invalid Number เมื่อโหลด CSV: ตรวจ control field mapping, comma/decimal, whitespace, locale, bad-file record. อย่าปิด constraint หรือใช้ implicit conversion แก้ปัญหาโดยไม่พิสูจน์ payload.

## Review
- Conventional vs direct path มี trade-offs อะไร?
- Bad records ต่างจาก discarded records อย่างไร?
- เหตุใดใช้ `APPEND` แล้ว rerun อาจผิด?
- จะวัดความถูกต้องของข้อมูลไทยหลังการโหลดอย่างไร?

## References
- [Oracle 26ai SQL*Loader Command-Line Reference](https://docs.oracle.com/en/database/oracle/oracle-database/26/sutil/oracle-sql-loader-commands.html)
- [Oracle 26ai Loading methods](https://docs.oracle.com/en/database/oracle/oracle-database/26/sutil/sql-loader-conventional-path-direct-path-external-table-loads.html)

## 🔎 Official-document validation — SQL*Loader Loading Modes (2026-10-21)

| Mode | จุดเด่น | ต้องตรวจก่อนเลือก |
|---|---|---|
| Conventional | SQL INSERT and bind arrays; เหมาะ concurrent OLTP / small batch | Redo/Constraints/Concurrency Overhead |
| Direct | Write Oracle data blocks efficiently for bulk loads | Active Transactions, Locking, VPD/INSERT Policy, Clustered Table, Index/Constraint/Trigger Restrictions |
| External Table | Query/transform source files via SQL then INSERT | File permissions, access driver, parsing/reject controls |

**SQL*Loader ไม่สร้าง Table ให้อัตโนมัติ:** Target Table และ INSERT Privilege ต้องมีอยู่ก่อน. การใช้ `REPLACE` หรือ `TRUNCATE` ต้องตรวจ DELETE Privilege ตามข้อกำหนด SQL*Loader. Direct Path บางกรณีต้องมี Exclusive Access และไม่เหมาะกับ workload ที่มี Concurrent Writes

**APPEND ไม่ Idempotent:** รัน File เดิมซ้ำอาจเกิด Row Duplication. ใช้ Staging/Business Key, Hash/Row Counts, Quoting, Timestamp/Decimal Masks และ Thai Text Round-trip เพื่อให้พิสูจน์ได้ว่าข้อมูลไม่เสียหลัง Migration

Official: [Oracle 19c Conventional vs Direct Path](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-conventional-and-direct-loads.html) · [SQL*Loader Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-concepts.html).

**Status:** DOC_REVIEWED / LOADER NOT RUN.
