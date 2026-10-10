#!/usr/bin/env python3
"""Structural QA for the original Oracle Database learning system.

No database connection, proprietary course file access, or network required.
This checks source-index completeness and relative Markdown links only.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote

REPO_ROOT = Path(__file__).resolve().parents[2]
ORACLE_ROOT = REPO_ROOT / "Oracle-Database"

TRACKER_ROW = re.compile(
    r"^\|\s*(\d{2})\s*\|.*?\]\((\./[^)]+\.md)\)\s*\|",
    flags=re.MULTILINE,
)
MD_LINK = re.compile(r"\[[^\]\n]+\]\((<?[^)\s]+>?)")

def errors_for_source_index() -> list[str]:
    problems: list[str] = []
    tracker = ORACLE_ROOT / "FULL-FIDELITY-QA-TRACKER.md"
    if not tracker.exists():
        return [f"Missing source tracker: {tracker.relative_to(REPO_ROOT)}"]
    txt = tracker.read_text(encoding="utf-8")
    records = TRACKER_ROW.findall(txt)
    found = [int(n) for n, _ in records]
    if sorted(found) != list(range(1, 32)):
        problems.append("Lesson tracker must have unique rows 01..31; found " + str(found))
    for number, rel_path in records:
        lesson = (ORACLE_ROOT / rel_path).resolve()
        if not lesson.is_relative_to(ORACLE_ROOT.resolve()):
            problems.append(f"Out-of-repo lesson path for {number}: {rel_path}")
            continue
        if not lesson.is_file():
            problems.append(f"Missing lesson {number}: {lesson.relative_to(REPO_ROOT)}")
            continue
        title = lesson.read_text(encoding="utf-8").splitlines()
        if not title or not re.match(rf"^#\s+Lesson\s+0?{int(number)}\b", title[0]):
            problems.append(f"Wrong H1/title number for lesson {number}: {lesson.relative_to(REPO_ROOT)}")
    labs = sorted((ORACLE_ROOT / "10-Labs").glob("Lab-??-*.md"))
    numbers = [int(x.name[4:6]) for x in labs]
    if sorted(numbers) != list(range(1, 14)):
        problems.append(f"Lab companion filenames must have 01..13 once each: {numbers}")
    return problems

def errors_for_local_links() -> list[str]:
    problems: list[str] = []
    root = REPO_ROOT.resolve()
    for md in sorted(ORACLE_ROOT.rglob("*.md")):
        lines = md.read_text(encoding="utf-8").splitlines()
        fence: str | None = None
        for line_no, line in enumerate(lines, 1):
            match = re.match(r"^\s*(`{3,}|~{3,})", line)
            if match:
                token = match.group(1)
                if fence is None:
                    fence = token[0]
                elif token[0] == fence:
                    fence = None
                continue
            if fence is not None:
                continue
            for candidate in MD_LINK.findall(line):
                href = candidate.strip("<>")
                if href.startswith(("https://", "http://", "mailto:", "data:", "#")):
                    continue
                relative = unquote(href.split("#", 1)[0].split("?", 1)[0])
                if not relative:
                    continue
                target = (md.parent / relative).resolve()
                if not target.is_relative_to(root):
                    problems.append(f"Out-of-repo link: {md.relative_to(root)}:{line_no} -> {href}")
                elif not target.exists():
                    problems.append(f"Broken Markdown link: {md.relative_to(root)}:{line_no} -> {href}")
    return problems

def main() -> int:
    problems = errors_for_source_index() + errors_for_local_links()
    if problems:
        print(f"ORACLE_KB_QA FAIL: {len(problems)} problems", file=sys.stderr)
        for p in problems:
            print(" - " + p, file=sys.stderr)
        return 1
    print("ORACLE_KB_QA PASS: 31 indexed lessons, 13 labs, local Markdown links resolve")
    print("NOTE: Does NOT verify Student Guide fidelity, SQL execution, 26ai compatibility, licensing, or live labs.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
