# Lesson 26 — Using External Tables to Load and Transport Data (ภาษาไทย)

> 🧠 **ภาพจำก่อนอ่าน:** 🗄️ Data → ⚙️ Process → 🩺 Health  
> 🎨 [Visual Guide ของวิชานี้](../VISUAL-MEMORY-GUIDE-TH.md) — ภาพช่วยจำ ไม่แทนคำสั่งและเนื้อหาจริง

[Data Movement Index](./README.md) · [Lab 11](../10-Labs/Lab-11-Data-Movement-Read-Only.md)

> Source mapping: Oracle University 19c Administration Workshop Lesson 26. Original Thai reconstruction; source fidelity and live execution **pending**. DDL example is deliberately commented out.

## เป้าหมาย
รู้ว่า external table เก็บ metadata ใน database แต่ data อยู่ file/object store, เข้าใจ DIRECTORY privilege + OS path, เปรียบเทียบ ORACLE_LOADER กับ ORACLE_DATAPUMP, เลือก external-table staging และวินิจฉัย ORA-29913

## 1. External table structure

~~~mermaid
flowchart LR
 SQL[SQL SELECT] --> EXT[External table metadata]
 EXT --> DRV[Access driver]
 DRV --> DIR[Oracle DIRECTORY object]
 DIR --> FILE[(Server-side file or supported external storage)]
~~~

External table เป็น logical table interface ไปยังข้อมูลข้างนอกฐานข้อมูล ไม่ใช่ heap table ที่เก็บ rows ลง datafiles ภายในแบบปกติ. Driver ทำงานกับ data format และ access privileges ตามที่กำหนด.

| Driver | Source | Behavior |
|---|---|---|
| `ORACLE_LOADER` | Text files | อ่าน external data เพื่อ query/insert into internal table; ไม่ unload |
| `ORACLE_DATAPUMP` | Binary dump files (driver-specific) | อ่านและเขียน dump ผ่าน supported CTAS/unload workflow |
| `ORACLE_BIGDATA` | Object storage/data lakes (รองรับตาม service/version) | Query external big-data sources |

Oracle 26ai docs อธิบาย external tables และ Vector data extensions เพิ่มจาก 19c; **ห้ามถือว่า 19c มี feature ของ 26ai เท่ากัน**.

## 2. SQL anatomy (conceptual, DO NOT RUN)

~~~sql
-- Example structure only — DDL mutates database metadata:
-- CREATE TABLE LAB_EXT (
--   item_id NUMBER,
--   item_name VARCHAR2(100)
-- )
-- ORGANIZATION EXTERNAL
-- (
--   TYPE ORACLE_LOADER
--   DEFAULT DIRECTORY LAB_IMPORT_DIR
--   ACCESS PARAMETERS (RECORDS DELIMITED BY NEWLINE
--                      FIELDS TERMINATED BY ',')
--   LOCATION ('sample.csv')
-- );
~~~

**DIRECTORY** คือ DB object ที่ map filesystem path **ฝั่ง server** ไม่ใช่ไฟล์บนเครื่องที่รัน SQLcl. ต้องมี `READ` บน directory object และ OS read permission. บาง driver ต้องมี WRITE permission สำหรับ bad/log files. อย่ามอบ `CREATE ANY DIRECTORY` แก่ app user เพียงเพื่อให้ query ทำงาน.

## 3. Observe existing definitions (SELECT-only)

~~~sql
SHOW CON_NAME
SELECT directory_name,directory_path FROM dba_directories ORDER BY directory_name;
SELECT owner,table_name,default_directory_name,type_name
FROM dba_external_tables ORDER BY owner,table_name;
SELECT owner,table_name,location
FROM dba_external_locations ORDER BY owner,table_name;
~~~

หมายเหตุ: `TYPE_NAME` ใน `DBA_EXTERNAL_TABLES` แสดง access driver (ส่วน `ACCESS_TYPE` บอกชนิด access parameters เช่น BLOB/CLOB); คอลัมน์ dictionary แตกต่างได้ตาม release จึงต้องตรวจ SQL Reference จริงหากเกิด ORA-00904. สิทธิ์ใน directory และ filesystem ตรวจแยกจากกัน.

## 4. Troubleshooting ORA-29913
- ตรวจ underlying error code จาก trace/log อย่าสรุปจาก ORA-29913 เพียงอันเดียว
- สะกด directory object, file case sensitivity, OS mount/filesystem and permissions
- ตรวจ CSV field delimiter, record terminator, datatype, NLS/date masks, character set
- ตรวจ bad/log file directory permissions และ resource capacity
- ถ้า external table query สำเร็จแต่ INSERT ล้มเหลว ให้ตรวจ target constraints/quotas

## 5. Data quality exercise
สร้าง worksheet mapping จาก text file 3 columns ไป target staging: original encoding, null rules, reject count, column lengths, expected row counts, random samples และ duplicate prevention strategy. ลงรายละเอียด retries/rollback ก่อน import จริง.

## Review questions
- External table ต่างจาก SQL*Loader อย่างไร?
- ORACLE_LOADER กับ ORACLE_DATAPUMP driver รองรับ unload เหมือนกันหรือไม่?
- ทำไม file path local laptop มักใช้ไม่ได้?
- จะหาจุดเสียของ ORA-29913 อย่างไร?

## Official references
- [Oracle 26ai External Tables Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/26/sutil/oracle-external-tables-concepts.html)
- [Oracle 19c External Tables Concepts](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-external-tables-concepts.html)
