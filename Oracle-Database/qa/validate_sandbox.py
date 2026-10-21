#!/usr/bin/env python3
"""Static safety/evidence validator for the optional Oracle Sandbox SQL Pack.

NO DATABASE CONNECTIONS. This is deliberately narrower than a SQL parser: approved
view SELECT/SHOW only, no shell/SQL*Plus commands that can write files or resources.
Passing this test is NOT proof of runtime safety, entitlement or lab execution.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ORACLE = ROOT / "Oracle-Database"
PACK = ORACLE / "10-Labs" / "Sandbox-Validation"
SQL_DIR = PACK / "sql"

EXPECTED = (
    "00-context.sql",
    "01-services-pdb.sql",
    "02-storage-undo.sql",
    "03-data-pump-metadata.sql",
    "04-audit-policy-metadata.sql",
    "05-autotask-metadata.sql",
    "06-performance-metadata.sql",
    "07-cursor-plan-optional.sql",
)
UNSAFE = re.compile(
    r"\b(?:CREATE|ALTER|DROP|TRUNCATE|INSERT|UPDATE|DELETE|MERGE|GRANT|REVOKE|"
    r"COMMIT|ROLLBACK|AUDIT|NOAUDIT|FLASHBACK|SHUTDOWN|STARTUP|EXEC|EXECUTE|"
    r"BEGIN|DECLARE|CALL|LOCK|WITH)\b|\bFOR\s+UPDATE\b",
    re.IGNORECASE,
)
SQLPLUS_BAD = re.compile(
    r"(?i)^(?:HOST|!|SPOOL|SAVE|GET|EDIT|COPY|CONNECT|CONN|DISCONNECT|"
    r"EXIT|QUIT|START|ACCEPT|DEFINE|UNDEFINE|VARIABLE|PRINT|SET|WHENEVER|"
    r"PASSWORD|PAUSE|PROMPT|COLUMN|TTITLE|BTITLE|@|@@)\b"
)
VIEW = re.compile(r"\bFROM\s+([A-Z0-9_$]+)\b", re.IGNORECASE)
CALL = re.compile(r"\b([A-Z][A-Z0-9_$.]*)\s*\(", re.IGNORECASE)
ALLOWED_CALLS = {"SYS_CONTEXT", "SUM", "TABLE", "IN", "DBMS_XPLAN.DISPLAY_CURSOR"}
ALLOWED_VIEWS = {"DUAL", "AUDIT_UNIFIED_ENABLED_POLICIES"}


class SqlPolicyError(Exception):
    """Static allowlist failure."""


def code_lines(source: str) -> list[str]:
    """Strip full-line and trailing SQL comments from the reviewed, fixed SQL pack."""
    result: list[str] = []
    for line in source.splitlines():
        # This pack has no quoted double-hyphen values, block comments or q-strings.
        line = line.split("--", 1)[0].strip()
        if line:
            result.append(line)
    return result


def validate_statement(statement: str, *, optional_plan: bool) -> None:
    without_strings = re.sub(r"'(?:''|[^'])*'", "''", statement)
    if not re.match(r"^SELECT\b", without_strings, re.IGNORECASE):
        raise SqlPolicyError("Only SELECT statements may be executed")
    if UNSAFE.search(without_strings):
        raise SqlPolicyError("SQL contains write-changing or disallowed tokens")
    if re.search(r"[&@]|/\*|\*/|--", without_strings):
        raise SqlPolicyError("Substitution, script inclusion or comments within SQL are forbidden")
    sources = VIEW.findall(without_strings)
    if not sources:
        raise SqlPolicyError("SELECT must read approved catalog/dynamic views")
    for source in sources:
        upper = source.upper()
        allowed = upper in ALLOWED_VIEWS or upper.startswith(("V$", "DBA_"))
        if upper == "TABLE":
            allowed = optional_plan and "DBMS_XPLAN.DISPLAY_CURSOR" in without_strings.upper()
        if not allowed:
            raise SqlPolicyError("Unapproved FROM source: " + upper)
    calls = {x.upper() for x in CALL.findall(without_strings)}
    if calls - ALLOWED_CALLS:
        raise SqlPolicyError("Unapproved SQL function: " + ",".join(sorted(calls - ALLOWED_CALLS)))
    if "DBMS_XPLAN.DISPLAY_CURSOR" in without_strings.upper() and not optional_plan:
        raise SqlPolicyError("DBMS_XPLAN only permitted in the optional cursor-plan script")


def validate_sql(source: str, *, optional_plan: bool = False) -> int:
    if "CONTRACT: SANDBOX_READ_ONLY" not in source:
        raise SqlPolicyError("Missing read-only approval contract")
    count = 0
    buffer: list[str] = []
    for line in code_lines(source):
        if not buffer and line.upper() in {"SHOW USER", "SHOW CON_NAME"}:
            count += 1
            continue
        if not buffer and (SQLPLUS_BAD.search(line) or line.startswith(("!", "@", "\\"))):
            raise SqlPolicyError("SQL*Plus control/shell/file command not permitted")
        if not buffer and not re.match(r"^SELECT\b", line, re.IGNORECASE):
            raise SqlPolicyError("Unexpected command outside SELECT/SHOW: " + line[:80])
        buffer.append(line)
        if ";" in line:
            content = " ".join(buffer)
            if content.count(";") != 1 or not content.rstrip().endswith(";"):
                raise SqlPolicyError("Multiple SQL statements or invalid terminator")
            validate_statement(content[:-1].strip(), optional_plan=optional_plan)
            count += 1
            buffer = []
    if buffer:
        raise SqlPolicyError("Unterminated SELECT statement")
    if count < 2:
        raise SqlPolicyError("Script missing minimum inspection statements")
    return count


def self_test() -> None:
    good = "-- CONTRACT: SANDBOX_READ_ONLY\nSHOW CON_NAME\nSELECT name FROM v$database;\n"
    assert validate_sql(good) == 2
    bad = (
        good.replace("SELECT name", "DELETE"),
        "-- CONTRACT: SANDBOX_READ_ONLY\nSHOW USER\nSPOOL raw.txt\nSELECT name FROM v$database;",
        "-- CONTRACT: SANDBOX_READ_ONLY\nSHOW USER\nSELECT * FROM dba_users FOR UPDATE;",
        "-- CONTRACT: SANDBOX_READ_ONLY\nSHOW USER\nSELECT utl_http.request('x') FROM dual;",
        "-- CONTRACT: SANDBOX_READ_ONLY\nSHOW USER\nSELECT name FROM v$database; DROP TABLE foo;",
        "-- CONTRACT: SANDBOX_READ_ONLY\nSHOW USER\n@another.sql",
    )
    for case in bad:
        try:
            validate_sql(case)
        except SqlPolicyError:
            pass
        else:
            raise AssertionError("Unsafe SQL fixture passed")
    print("Sandbox validator self-tests: PASS (6 unsafe fixtures rejected)")


def main() -> int:
    self_test()
    problems: list[str] = []
    found = tuple(sorted(p.name for p in SQL_DIR.glob("*.sql")))
    if found != tuple(sorted(EXPECTED)):
        problems.append(f"Expected exactly 8 versioned .sql scripts; found {found}")
    checked = 0
    for name in EXPECTED:
        script = SQL_DIR / name
        if not script.is_file():
            problems.append("Missing SQL file: " + name)
            continue
        try:
            checked += validate_sql(script.read_text(encoding="utf-8"), optional_plan=name.startswith("07-"))
        except SqlPolicyError as exc:
            problems.append(f"{name}: {exc}")
    guide = PACK / "README.md"
    template = PACK / "VALIDATION-EVIDENCE-TEMPLATE.md"
    if not guide.is_file() or not template.is_file():
        problems.append("Required runbook or evidence template missing")
    else:
        runbook = guide.read_text(encoding="utf-8")
        evidence = template.read_text(encoding="utf-8")
        for marker in (
            "READY_FOR_AUTHORIZED_SANDBOX", "NOT_EXECUTED", "SKIPPED_PRIVILEGE",
            "DBMS_XPLAN", "lsnrctl services", "Private", "Oracle 19c"
        ):
            if marker not in runbook:
                problems.append("Runbook missing safety/evidence marker: " + marker)
        for name in EXPECTED:
            if name not in runbook:
                problems.append("Runbook missing SQL file: " + name)
        if "NOT_EXECUTED" not in evidence or "PASSED" not in evidence or "Actual observation" not in evidence:
            problems.append("Evidence template does not state expected/actual and execution status")
        if "| NOT RUN | NOT_EXECUTED |" not in evidence:
            problems.append("Template must default all evidence rows to NOT_EXECUTED")
    if problems:
        for issue in problems:
            print("ORACLE_SANDBOX_QA ERROR: " + issue, file=sys.stderr)
        return 1
    print(
        "ORACLE_SANDBOX_QA PASS: 8 read-only SQL scripts, "
        f"{checked} SELECT/SHOW observations, private evidence template and runbook"
    )
    print("LIMITATION: not executed on Oracle; SQL static allowlist is not a full parser.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
