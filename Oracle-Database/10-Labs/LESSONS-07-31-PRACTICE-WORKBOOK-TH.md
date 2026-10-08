# Oracle Lessons 07–31 — Companion Practice Workbook ภาษาไทย

> **Coverage:** 8 mapped source lab groups at topic level; all activities below are original simulated or read-only exercises. **Not** an Oracle University Activity Guide substitute; official lab task/grader and execution fidelity **NOT VERIFIED**.

## Safety rules

- ห้ามใช้ `CREATE`, `ALTER`, `DROP`, `SHUTDOWN`, `STARTUP`, `KILL SESSION`, delete trace/log files, DBMS_SCHEDULER mutation บน production ใน workbook นี้
- DBA grants on V$ / DBA_ views must be least privilege and preapproved
- For AWR/ASH/ADDM/Tuning Pack functions check Oracle licensing first
- Write down environment, 19c/26ai version, CDB/PDB, business impact, expected verification, rollback and cost before any separate live lab

## NetSvcs — lessons 07–11

**Task goal:** ตรวจ TNS_ADMIN, Easy Connect, service registration, listener handler; read-only lsnrctl services; เสนอ fix ORA-12154/12514/12519 อย่างมีหลักฐาน.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## PDBs — lessons 12–14

**Task goal:** สำรวจ v$pdbs, PDB open state, services, common vs local users; วาง migration/clone/plug compatibility worksheet โดยไม่ execute.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## Storage — lessons 15–18

**Task goal:** สำรวจ DBA_TABLESPACES/DBA_DATA_FILES/DBA_TEMP_FILES/DBA_UNDO_EXTENTS, estimate autoextend vs filesystem/ASM headroom.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## UsersSec — lessons 19–22

**Task goal:** สำรวจ DBA_USERS/DBA_ROLE_PRIVS/DBA_TAB_PRIVS/DBA_PROFILES/UNIFIED_AUDIT_TRAIL ตาม least privilege.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## LoadTrans — lessons 23–26

**Task goal:** แยก Data Pump, SQL*Loader, external tables, transportable tablespace; ทำ migration validation checklist (counts/checksums/charset).

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## AutoMaint — lessons 27–28

**Task goal:** อ่าน DBA_AUTOTASK_CLIENT และ DBA_SCHEDULER_WINDOWS; เทียบ schedule กับช่วง peak workload.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## MonTune — lessons 29–31

**Task goal:** อ่าน V$SESSION, V$RESOURCE_LIMIT, V$SYSTEM_EVENT, V$SQL ตาม privileges; วาง timing-based incident timeline.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## CreateDB — lessons 03–06

**Task goal:** อ้างอิง Labs 03–06 ที่มีอยู่; วาง DBCA/manual DB create, parameters, startup and rollback โดยไม่สร้าง/หยุด DB.

**Step 1 — Prepare:** ระบุ host/container ที่ได้รับอนุญาต, SQL client, privilege, version และ clean-room sandbox; ถ้าไม่มี sandbox ให้ทำ tabletop อย่างซื่อสัตย์

**Step 2 — Design worksheet:** วาด resource/connection/data flow; ระบุ state, dependencies, privileges, warning และสิ่งที่ต้องวัดก่อนเปลี่ยน

**Step 3 — Inspect:** ใช้ตัวอย่าง SELECT-only ใน Teaching Atlas/Lessons; เก็บ output ที่ redact identifiers และไม่บันทึก credentials

**Step 4 — Failure drill:** เขียนสมมติฐาน 3 แบบ และลำดับ troubleshoot เมื่อ workflow ล้มเหลว; ระบุว่า evidence ไหนพิสูจน์ได้หรือยังไม่ได้

**Step 5 — Pass criterion:** อธิบายเหตุผล, expected outcome, verification query และ rollback/cleanup plan; mark **NOT EXECUTED** จนกว่าจะทำกับ authorized lab จริง

---

## Lab evidence register

| Group | Designed | Live execution | Official guide fidelity |
|---|---|---|---|
| NetSvcs | Topic exercise drafted | NOT RUN | PENDING |
| PDBs | Topic exercise drafted | NOT RUN | PENDING |
| Storage | Topic exercise drafted | NOT RUN | PENDING |
| UsersSec | Topic exercise drafted | NOT RUN | PENDING |
| LoadTrans | Topic exercise drafted | NOT RUN | PENDING |
| AutoMaint | Topic exercise drafted | NOT RUN | PENDING |
| MonTune | Topic exercise drafted | NOT RUN | PENDING |
| CreateDB | Topic exercise drafted | NOT RUN | PENDING |

## References
- [Oracle 19c docs](https://docs.oracle.com/en/database/oracle/oracle-database/19/)
- [Oracle 26ai docs](https://docs.oracle.com/en/database/oracle/oracle-database/26/)
