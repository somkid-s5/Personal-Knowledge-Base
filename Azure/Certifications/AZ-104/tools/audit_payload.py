#!/usr/bin/env python3
import base64
import gzip
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "interactive" / "assets"
INVENTORY = ROOT / "official-skills-2026-04-17.json"
LABS = [
    "rbac-lab.html",
    "storage-lab.html",
    "storage-access-lab.html",
    "compute-lab.html",
    "appservice-lab.html",
    "containers-lab.html",
    "networking-lab.html",
    "loadbalancing-lab.html",
    "monitor-lab.html",
    "recovery-lab.html",
]

def load_packed(pattern):
    parts = [
        p.read_text(encoding="utf-8").strip()
        for p in sorted(ASSETS.glob(pattern))
    ]
    if not parts:
        raise SystemExit(f"No files found for {pattern}")
    raw = base64.b64decode("".join(parts))
    return json.loads(gzip.decompress(raw).decode("utf-8"))

def norm(value):
    return re.sub(r"\s+", " ", str(value)).casefold()

def objective_text(obj):
    bits = [obj.get("code", ""), obj.get("title", "")]
    bits.extend(t.get("title", "") for t in obj.get("topics", []))
    bits.extend(obj.get("lines", []))
    return norm("\n".join(bits))

def main():
    data = load_packed("content-data.*.b64")
    questions = load_packed("question-bank.*.b64")
    flashcards = load_packed("flashcards.*.b64")
    inventory = json.loads(INVENTORY.read_text(encoding="utf-8"))

    actual = {}
    for domain in data.get("domains", []):
        for obj in domain.get("objectives", []):
            actual[str(obj.get("code"))] = obj

    failures = []
    passed = 0

    print("AZ-104 payload integrity: OK")
    print("payload meta:", json.dumps(data.get("meta", {}), ensure_ascii=False))
    print(
        "official inventory:",
        inventory["skills_measured"],
        "skill bullets=",
        inventory["total_skill_bullets"],
    )

    existing_labs = sum((ROOT / "interactive" / name).exists() for name in LABS)
    print(
        "practice assets:",
        "questions=", len(questions),
        "flashcards=", len(flashcards),
        "labs=", existing_labs,
    )

    if len(questions) != 155:
        failures.append(f"question bank expected 155, found {len(questions)}")
    if len(flashcards) != 103:
        failures.append(f"flashcards expected 103, found {len(flashcards)}")
    missing_labs = [name for name in LABS if not (ROOT / "interactive" / name).exists()]
    if missing_labs:
        failures.append(f"missing lab files: {missing_labs}")

    for expected in inventory["objectives"]:
        code = expected["code"]
        obj = actual.get(code)
        if not obj:
            failures.append(f"{code}: objective missing from payload")
            continue

        text = objective_text(obj)
        rows = []
        for bullet in expected["bullets"]:
            missing = [term for term in bullet["checks"] if norm(term) not in text]
            ok = not missing
            passed += int(ok)
            rows.append((bullet["id"], bullet["label"], ok, missing))
            if not ok:
                failures.append(
                    f'{bullet["id"]} {bullet["label"]}: missing evidence terms {missing}'
                )

        good = sum(1 for _, _, ok, _ in rows if ok)
        print(f"\n{code} {expected['title']}: {good}/{len(rows)}")
        for bullet_id, label, ok, missing in rows:
            suffix = f" | missing={missing}" if missing else ""
            print(f"  {'PASS' if ok else 'FAIL'} {bullet_id} {label}{suffix}")

    total = inventory["total_skill_bullets"]
    print(f"\nCOVERAGE RESULT: {passed}/{total} evidence checks passed")

    if failures:
        print("\nFAILURES:")
        for item in failures:
            print("-", item)
        sys.exit(1)

if __name__ == "__main__":
    main()
