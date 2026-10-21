# 📝 Oracle Sandbox Validation — Expected vs Actual Evidence

> **TEMPLATE ONLY — NOT_EXECUTED.** This document contains placeholders, not real Oracle results. Copy to **private storage outside the public GitHub repository** before entering details.

[🧪 Execution Guide](./README.md) · [Oracle Lab Index](../README.md)

## 🪪 Session / Environment

| Field | Value to record in private copy |
|---|---|
| Lab ID | `ORACLE-SBX-YYYYMMDD-XX` |
| Status | `NOT_EXECUTED` |
| Approval / Scope | `PENDING_APPROVAL`; sandbox instance/PDB only |
| Oracle Version / RU / Edition | `NOT_RECORDED` |
| OS / Oracle Client | `NOT_RECORDED` |
| Current CDB/PDB / Service | `REDACTED_OR_NOT_RECORDED` |
| User Permission Level | `READ_ONLY_VIEW_GRANTS_PENDING` |
| Observation time / timezone | `NOT_RECORDED` |
| Reviewer / Date | `NOT_ASSIGNED` |
| Raw evidence location | `PRIVATE_ONLY_NOT_SHARED` |
| Public sanitized evidence | `NONE` |

## ✅ Script runbook — Expected vs Actual

| Script ID | Expected observation | Actual observation (redacted) | Status | Evidence Ref / Error |
|---|---|---|---|---|
| 00 Context | Correct Version, Container, Instance and Database Open Mode | NOT RUN | NOT_EXECUTED | — |
| 01 Services / PDB | Relevant Services and PDB State visible according to scope | NOT RUN | NOT_EXECUTED | — |
| 02 Storage / Undo | Tablespaces and Undo History/Extent Status | NOT RUN | NOT_EXECUTED | — |
| 03 Data Pump | Existing Directory / Job metadata, no data transfer | NOT RUN | NOT_EXECUTED | — |
| 04 Unified Audit | Policy activation metadata if supported | NOT RUN | NOT_EXECUTED | — |
| 05 AutoTask | Client, Window and Job History comparison | NOT RUN | NOT_EXECUTED | — |
| 06 Performance | Limits, Existing SQL_ID/Child/Plan Hash snapshot | NOT RUN | NOT_EXECUTED | — |
| 07 Cursor Plan (optional) | Cached Plan of Approved SQL_ID | NOT RUN | NOT_EXECUTED | — |
| Listener (manual, optional) | Local authorized `lsnrctl services` handler state | NOT RUN | NOT_EXECUTED | — |

**Allowed statuses:** `NOT_EXECUTED`, `PASSED`, `FAILED`, `SKIPPED_PRIVILEGE`, `NOT_APPLICABLE`, `BLOCKED_LICENSE`, `BLOCKED_WRONG_TARGET`. Do not mark `PASSED` if no actual test occurred.

## 🔎 Findings / Analysis

### Finding 1 — Example blank row (fill only after execution)

- **Case:** `TBD`
- **Hypothesis:** `TBD`
- **Expected:** `TBD`
- **Actual:** `NOT_EXECUTED`
- **Oracle Error / Evidence:** `NONE`
- **Diagnosis:** `PENDING`
- **Next action:** `REVIEW_AND_APPROVE`
- **Impact / Scope:** `NO_CHANGES_MADE`
- **Source reference and version:** `TBD`

## 🛡️ Safety and traceability

- [ ] Confirmed target is an approved isolated Sandbox, not Production
- [ ] Recorded full Oracle RU/Edition and CDB/PDB/Instance scope
- [ ] Used a least-privilege account; no SYSDBA or broad grants for convenience
- [ ] Inspected each selected `.sql` file before execution; no scripted destructive action
- [ ] Verified no AWR/ASH/ADDM, SQL Advisor or additional licensed feature was used without entitlement
- [ ] Removed internal IP, hostname, names, SQL text/bind data, secrets and private paths
- [ ] Compared Expected vs Actual with reviewer
- [ ] No state-changing command issued in this exercise; disconnected cleanly
- [ ] No raw output committed to public GitHub

## 📂 Evidence manifest (private only)

| Evidence ID | Type | Recorded observation | Redaction checked | Storage |
|---|---|---|---|---|
| EVID-001 | Screenshot or text summary | NOT_RECORDED | PENDING | PRIVATE_ONLY |
| EVID-002 | SQL*Plus exit/error | NOT_RECORDED | PENDING | PRIVATE_ONLY |

## 🏁 Reviewer decision

**Outcome:** `NOT_EXECUTED`. No statement of successful live Lab execution can be made until actual approved work and sanitized evidence exist.

**Reviewer:** `NOT_ASSIGNED` · **Reviewed at:** `NOT_RECORDED` · **Follow-up:** `PENDING`

**Portfolio-ready summary (after validation only):** concise architecture, incident question, selected diagnostics, anonymized results and their limits, what changed in understanding, plus proof of cleanup. Do not disclose sensitive infrastructure.
