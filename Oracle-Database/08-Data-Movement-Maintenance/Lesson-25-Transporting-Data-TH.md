# Lesson 25 — Transporting Data (ภาษาไทย)

[Data Movement Index](./README.md) · [Lab 11](../10-Labs/Lab-11-Data-Movement-Read-Only.md)

> Oracle University 19c Administration Workshop Lesson 25 mapped by topic. Original Thai teaching content; **no private Student Guide page-level verification**, no transport operation executed. Commands used in inspection are SELECT-only.

## Outcomes
แยก logical export กับ transportable migration, อธิบาย self-contained tablespace set, metadata dump vs physical datafiles, endian/version compatibility, TDE และการยืนยันข้อมูลปลายทาง

## 1. Transportable workflow ไม่ใช่ full logical export

~~~mermaid
flowchart LR
 A[Source tablespace set] --> B[Check self-containment and dependencies]
 B --> C[Metadata export using Data Pump]
 A --> D[Copy datafiles under supported mode]
 C --> E[Target import metadata]
 D --> E
 E --> F[Validate object ownership, grants and data]
~~~

Transportable tablespaces เอาข้อมูลจริงจาก **datafiles** ไปพร้อม metadata ของ objects ที่จำเป็นในการตีความ. `TRANSPORT_TABLESPACES` ใน Data Pump export ส่งออก metadata ของ set ส่วน datafiles ต้องจัดการแยก. ไม่ใช่เพียงเอา `.dmp` ไป import แล้วได้ครบทุก byte.

### Self-containment และ Dependencies

- Transported set ต้องมี objects/dependencies ตาม self-containment rules เช่น index อยู่ใน set แต่ table owner อยู่ข้างนอกอาจเกิด violation
- Partitioned objects อาจต้องพิจารณาทุก partitions ให้ครบชุด
- ตรวจกับ DBA/application owners ว่ามี cross-schema grants, synonyms, jobs, external directories และ data outside set หรือไม่
- อย่า transport SYSTEM/SYSAUX ด้วยสมมติฐานว่าเป็น ordinary application tablespace

## 2. Compatibility gates

| Gate | ต้องตรวจ |
|---|---|
| Source/target version | Target release และ `COMPATIBLE`; ข้อกำหนด import ข้ามรุ่น |
| Endianness | Cross-platform datafile conversion ตาม supported tools |
| Read-only/cutover | Consistent transfer และ impact กับ source applications |
| TDE | Source/target keys, keystore/wallet และ encryption options |
| Datafiles | Copy completeness, file names, ASM/OMF and storage capacity |
| Metadata | Roles, object grants, directory objects, statistics, invalid objects |

ข้อมูล Oracle Data Pump 26ai ระบุว่า transportable tablespace export ไม่ควรถูก import ไป database รุ่นต่ำกว่า source version และต้องเป็น self-contained set. ตรวจ version-specific limitations ทุกครั้ง.

## 3. Read-only SQL for inventory

~~~sql
SHOW CON_NAME
SELECT tablespace_name,contents,status FROM dba_tablespaces ORDER BY tablespace_name;
SELECT tablespace_name,file_name,bytes FROM dba_data_files ORDER BY tablespace_name;
SELECT owner,segment_name,segment_type,tablespace_name
FROM dba_segments WHERE tablespace_name='LAB_TBS'
FETCH FIRST 20 ROWS ONLY;
~~~

ชื่อ `LAB_TBS` เป็น placeholder. แสดง file paths ได้เฉพาะใน private evidence; ห้ามเผยแพร่ storage topology จริง. `DBMS_TTS.TRANSPORT_SET_CHECK` ใช้ตรวจ self-containment แต่เป็น PL/SQL call ที่อาจเขียน violation metadata จึง **ไม่** อยู่ใน read-only lab นี้; ตรวจขั้นตอนกับ DBA ใน sandbox ก่อนใช้.

## 4. Case study
ต้องย้าย PDB application data 2 TB ไป target ที่ต่าง OS: สำรวจ endian/charset/source RU, downtime, storage links, TDE, dependencies และ restore. Transportable อาจมีข้อได้เปรียบเพราะไม่ต้อง unload/reload table rows ทั้งหมด แต่ version/platform constraint และ file transfer อาจทำให้ไม่เหมาะกว่า Data Pump schema import.

## 5. Verification/rollback
1. ตรวจ file checksum, size, complete transfer และ metadata import logs
2. ตรวจ schema counts, grants, indexes, partition definitions and invalid objects
3. ทำ business reconciliations และ application transaction smoke test
4. เก็บ source accessible และ rollback plan จนผู้รับระบบยืนยันผล
5. ทดสอบ backup/restore แยกจาก success status ของ transport

## Review questions
- เหตุใด .dmp ของ transportable อาจไม่พอสำหรับ import?
- Self-contained หมายถึงอะไร?
- ทำไม source/target TDE keys เป็น risk?
- Cross-endian มีข้อจำกัดอะไร?
- ข้อมูลแอปตรวจความถูกต้องอย่างไรหลังย้าย?

## References
- [Oracle 26ai Transportable Tablespace Export](https://docs.oracle.com/en/database/oracle/oracle-database/26/sutil/starting-oracle-data-pump.export.html)
- [Oracle 19c Self-contained set](https://docs.oracle.com/en/database/oracle/oracle-database/19/spmds/task-1-pick-a-self-contained-set-of-tablespaces.html)
