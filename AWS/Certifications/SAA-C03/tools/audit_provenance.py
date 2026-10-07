#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
failures = []

legacy_dir = ROOT / "practice-exam"
legacy_files = list(legacy_dir.glob("AWS_SAA_Test_*")) if legacy_dir.exists() else []
if legacy_files:
    failures.append("legacy provenance-unclear practice files returned: " + ", ".join(p.name for p in legacy_files))

readme = (ROOT / "README.md").read_text(encoding="utf-8")
study = (ROOT / "STUDY-PATH.md").read_text(encoding="utf-8")
for label, text in [("README.md", readme), ("STUDY-PATH.md", study)]:
    if "practice-exam/" in text:
        failures.append(f"{label}: still links to retired practice-exam directory")

required = [
    "CURRENT-SCOPE-SCENARIOS.md",
    "CURRENT-SCOPE-DEEP-DIVE.md",
    "QA-MATRIX.md",
    "EXAM-GUIDE-MAP.md",
    "SOURCE-MANIFEST.md",
    "PRACTICE-PROVENANCE.md",
]
for name in required:
    if not (ROOT / name).exists():
        failures.append(f"missing required current study/provenance file: {name}")

if failures:
    print("SAA-C03 provenance audit: FAIL")
    for item in failures:
        print("-", item)
    sys.exit(1)

print("SAA-C03 provenance audit: PASS")
print("legacy practice files in current tree: 0")
print("canonical practice source: CURRENT-SCOPE-SCENARIOS.md")
