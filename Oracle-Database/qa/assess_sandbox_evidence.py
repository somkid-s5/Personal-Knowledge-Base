#!/usr/bin/env python3
"""Validate Oracle Sandbox evidence MANIFEST consistency offline.

No Oracle connectivity, SQL execution, cloud API, shell command invocation, network
or external dependencies. This CANNOT attest that a human ran an SQL command;
it checks only whether a reported result is sufficiently documented for review.
Never pass raw Oracle query output to this tool.
"""
from __future__ import annotations

import argparse
import copy
import datetime as dt
import json
import re
import sys
from pathlib import Path

PACK = Path(__file__).resolve().parents[1] / "10-Labs" / "Sandbox-Validation"
TEMPLATE = PACK / "EVIDENCE-INPUT-TEMPLATE.json"
SCRIPT_IDS = tuple(f"{n:02d}" for n in range(8))
STATUSES = frozenset({
    "NOT_EXECUTED", "PASSED", "FAILED", "SKIPPED_PRIVILEGE",
    "NOT_APPLICABLE", "BLOCKED_LICENSE", "BLOCKED_WRONG_TARGET",
})
EXECUTED = frozenset({"PASSED", "FAILED"})
PLACEHOLDERS = frozenset({"", "TBD", "PENDING", "NOT_RUN", "NOT_RECORDED", "NONE", "NOT_EXECUTED"})
REF = re.compile(r"^EVID-[0-9]{3,6}$")
ORA_ERROR = re.compile(r"^ORA-[0-9]{5}$")
SENSITIVE = re.compile(r"(?i)(?:password|token|private[_ -]?key|secret)\s*[:=]|(?:BEGIN\s+(?:RSA|OPENSSH)\s+PRIVATE\s+KEY)")
IPV4 = re.compile(r"(?<![0-9.])(?:\d{1,3}\.){3}\d{1,3}(?![0-9.])")


def populated(value: object) -> bool:
    return isinstance(value, str) and value.strip().upper() not in PLACEHOLDERS


def valid_timestamp(value: object) -> bool:
    if not isinstance(value, str) or not value.strip():
        return False
    try:
        parsed = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return False
    return parsed.tzinfo is not None and parsed.utcoffset() is not None


def validate(data: object, *, template: bool = False) -> tuple[list[str], dict[str, int]]:
    issues: list[str] = []
    if not isinstance(data, dict):
        return ["top-level evidence must be a JSON object"], {}
    if data.get("schema_version") != 1:
        issues.append("unsupported schema_version (required: 1)")
    sandbox = data.get("sandbox")
    if not isinstance(sandbox, dict):
        issues.append("missing sandbox metadata object")
        sandbox = {}
    cases = data.get("cases")
    if not isinstance(cases, list):
        return issues + ["cases must be an ordered array"], {}
    if len(cases) != len(SCRIPT_IDS):
        issues.append("expected exactly 8 cases (00–07)")
    counts: dict[str, int] = {status: 0 for status in sorted(STATUSES)}
    ids: list[str] = []
    for entry in cases:
        if not isinstance(entry, dict):
            issues.append("each case must be a JSON object")
            continue
        case_id = entry.get("id")
        if not isinstance(case_id, str):
            issues.append("case id must be a two-digit string")
            continue
        ids.append(case_id)
        status = entry.get("status")
        if status not in STATUSES:
            issues.append("case " + case_id + ": unknown status")
            continue
        counts[status] += 1
        expected = entry.get("expected")
        actual = entry.get("actual_summary")
        evidence = entry.get("evidence_ref")
        error = entry.get("error_code", "")
        if not populated(expected):
            issues.append("case " + case_id + ": expected observation missing")
        if status == "NOT_EXECUTED":
            if populated(actual) or populated(evidence) or populated(error):
                issues.append("case " + case_id + ": NOT_EXECUTED cannot contain actual results/evidence")
        elif status in EXECUTED:
            if not populated(actual):
                issues.append("case " + case_id + ": actual_summary required for executed claim")
            if not isinstance(evidence, str) or not REF.fullmatch(evidence):
                issues.append("case " + case_id + ": evidence_ref must be EVID-###")
            if status == "PASSED" and populated(error):
                issues.append("case " + case_id + ": PASSED must not have an error_code")
            if status == "FAILED" and not (populated(error) or populated(actual)):
                issues.append("case " + case_id + ": failed case needs error or observed symptom")
        elif status == "SKIPPED_PRIVILEGE":
            if not isinstance(error, str) or not ORA_ERROR.fullmatch(error):
                issues.append("case " + case_id + ": privilege skip needs ORA-##### error")
        for key in ("actual_summary", "evidence_ref", "error_code"):
            val = entry.get(key, "")
            if val is None:
                continue
            if not isinstance(val, str):
                issues.append("case " + case_id + ": " + key + " must be a string")
            elif SENSITIVE.search(val) or IPV4.search(val):
                issues.append("case " + case_id + ": possible secret/IP in " + key + " — redact offline")
    if ids != list(SCRIPT_IDS):
        issues.append("case ids must be exactly 00, 01, 02, 03, 04, 05, 06, 07 in order")
    if len(set(ids)) != len(ids):
        issues.append("duplicate case id(s)")
    any_executed = any(counts.get(k, 0) for k in EXECUTED)
    if any_executed:
        for field in ("approved", "isolated", "redaction_confirmed", "no_state_changes_confirmed"):
            if sandbox.get(field) is not True:
                issues.append("executed claim requires sandbox." + field + " = true")
        for field in ("approval_ref", "oracle_version_full", "container_scope", "operator", "reviewer"):
            if not populated(sandbox.get(field)):
                issues.append("executed claim requires sandbox." + field)
        if not valid_timestamp(sandbox.get("executed_at")):
            issues.append("executed claim requires timezone-aware sandbox.executed_at")
    if template:
        if any(counts.get(status, 0) for status in STATUSES if status != "NOT_EXECUTED"):
            issues.append("PUBLIC template must have all eight cases NOT_EXECUTED")
        if any(sandbox.get(field) is True for field in
               ("approved", "isolated", "redaction_confirmed", "no_state_changes_confirmed")):
            issues.append("PUBLIC template must not pre-attest approval, isolation or redaction")
    return issues, counts


def fixtures(base: dict) -> None:
    good = copy.deepcopy(base)
    issues, _ = validate(good, template=True)
    assert not issues, "default template must validate: " + repr(issues)
    negative: list[dict] = []
    x = copy.deepcopy(good)
    x["cases"][0]["status"] = "PASSED"  # No evidence, reviewer, approval
    negative.append(x)
    x = copy.deepcopy(good)
    x["cases"][0]["actual_summary"] = "fabricated result"
    negative.append(x)
    x = copy.deepcopy(good)
    x["cases"][0]["status"] = "SKIPPED_PRIVILEGE"
    negative.append(x)
    x = copy.deepcopy(good)
    x["cases"][0]["actual_summary"] = "password=123abc"
    negative.append(x)
    x = copy.deepcopy(good)
    x["cases"][0]["id"] = "01"
    negative.append(x)
    x = copy.deepcopy(good)
    x["cases"][0]["status"] = "PASSED"
    x["cases"][0]["actual_summary"] = "Looks fine"
    x["cases"][0]["evidence_ref"] = "EVID-001"
    x["sandbox"].update({
        "approved": True, "isolated": True, "redaction_confirmed": True,
        "no_state_changes_confirmed": True, "approval_ref": "LAB-APPROVED",
        "oracle_version_full": "19.0.0.0.0", "container_scope": "ISOLATED_PDB",
        "operator": "TESTER", "reviewer": "REVIEWER",
        "executed_at": "2026-10-21T11:00:00",  # timezone missing
    })
    negative.append(x)
    for n, candidate in enumerate(negative, 1):
        problems, _ = validate(candidate)
        assert problems, "unsafe/incomplete fixture was accepted: " + str(n)
    print("Oracle offline evidence self-tests PASS: 6 invalid claims blocked, defaults NOT_EXECUTED")


def main() -> int:
    ap = argparse.ArgumentParser(description="Offline Oracle evidence consistency check (no DB I/O)")
    ap.add_argument("--file", type=Path, help="PRIVATE sanitized evidence JSON; never raw Oracle output")
    args = ap.parse_args()
    if not TEMPLATE.is_file():
        print("ERROR: public input template not found", file=sys.stderr)
        return 1
    try:
        base = json.loads(TEMPLATE.read_text(encoding="utf-8"))
        fixtures(base)
        target = json.loads(args.file.read_text(encoding="utf-8")) if args.file else base
        errors, counts = validate(target, template=not bool(args.file))
    except (OSError, json.JSONDecodeError, AssertionError) as exc:
        # Never print JSON input, which may contain confidential data.
        print("ERROR: evidence cannot be parsed or static fixtures failed", file=sys.stderr)
        return 1
    if errors:
        for message in errors:
            print("EVIDENCE QA ERROR: " + message, file=sys.stderr)
        return 1
    ordered = ", ".join(k + "=" + str(v) for k, v in counts.items() if v)
    print("ORACLE_EVIDENCE_QA PASS: " + ordered)
    print("LIMITATION: structural attestation only; cannot prove SQL execution or source authenticity.")
    if args.file:
        print("RESULT: reported outcomes are eligible for HUMAN REVIEW; not independently verified")
    else:
        print("RESULT: public template only — NO LABS EXECUTED")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
