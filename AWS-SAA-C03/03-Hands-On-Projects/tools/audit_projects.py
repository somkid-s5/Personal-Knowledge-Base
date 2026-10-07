#!/usr/bin/env python3
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECT_RE = re.compile(r"^project-(\d{2})-.+$")

CHECKS = {
    "scenario": r"Scenario|สถานการณ์",
    "architecture": r"Topology Diagram|Architecture Diagram|architecture\.png|\x60\x60\x60mermaid",
    "prerequisites": r"Prerequisite|สิ่งที่ต้องเตรียม|Estimated Time|เวลาที่",
    "tasks": r"Tasks|ขั้นตอนการปฏิบัติ",
    "verification": r"Verification|ตรวจสอบ",
    "troubleshooting": r"Troubleshooting|แก้ปัญหา",
    "exercises": r"Exercise|แบบฝึกหัด",
    "cost": r"Cost|ค่าใช้จ่าย|FinOps|ต้นทุน",
    "cleanup": r"Cleanup|Clean Up|เก็บกวาด|ลบทรัพยากร|destroy",
}

SECRET_PATTERNS = {
    "AWS access key id": re.compile(r"AKIA[0-9A-Z]{16}"),
    "AWS secret assignment": re.compile(r"(?i)aws_secret_access_key\s*[=:]\s*['\"][^<'\"\s]{16,}"),
}

def main():
    projects = sorted(
        p for p in ROOT.iterdir()
        if p.is_dir() and PROJECT_RE.match(p.name)
    )

    failures = []
    warnings = []

    package_readme = (ROOT / "README.md").read_text(encoding="utf-8")
    setup_readme = (ROOT / "project-00-preparation-setup" / "README.md").read_text(encoding="utf-8")

    if "temporary credentials" not in package_readme.casefold():
        failures.append("package README: temporary-credential human authentication baseline missing")
    if "temporary credentials" not in setup_readme.casefold():
        failures.append("project-00: temporary-credential authentication baseline missing")

    legacy_auth_patterns = {
        "package README": [
            r"IAM User.+AdministratorAccess",
            r"aws configure.+Access Key",
        ],
        "project-00": [
            r"Root User.+IAM.+Create user",
            r"แนบสิทธิ์.+AdministratorAccess",
        ],
    }
    for label, patterns in legacy_auth_patterns.items():
        body = package_readme if label == "package README" else setup_readme
        for pattern in patterns:
            if re.search(pattern, body, re.I):
                failures.append(f"{label}: legacy human-auth pattern returned: {pattern}")

    print(f"Cloud Engineer Lab project audit: projects={len(projects)}")

    expected = [f"{i:02d}" for i in range(35)]
    actual = [PROJECT_RE.match(p.name).group(1) for p in projects]
    if actual != expected:
        failures.append(f"project sequence must be 00..34; found {actual}")

    for project in projects:
        readme = project / "README.md"
        if not readme.exists():
            failures.append(f"{project.name}: missing README.md")
            continue

        text = readme.read_text(encoding="utf-8")
        missing = [name for name, pattern in CHECKS.items() if not re.search(pattern, text, re.I)]

        files = [p for p in project.rglob("*") if p.is_file() and p.name != "README.md"]
        if project.name != "project-00-preparation-setup" and not files:
            failures.append(f"{project.name}: no runnable/inspectable project artifacts")

        if missing:
            failures.append(f"{project.name}: missing workbook concepts {missing}")

        incident = bool(re.search(r"Failure Testing|Incident|RCA|Root Cause|Chaos", text, re.I))
        if not incident:
            warnings.append(f"{project.name}: no explicit incident/failure-injection section (optional)")

        for file in [readme, *files]:
            if file.suffix.lower() in {".png", ".jpg", ".jpeg", ".ico"}:
                continue
            try:
                body = file.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            for label, pattern in SECRET_PATTERNS.items():
                if pattern.search(body):
                    failures.append(f"{project.name}: potential {label} in {file.relative_to(ROOT)}")

        status = "PASS" if not missing else "FAIL"
        print(f"{status} {project.name} | files={len(files)+1} | incident={'yes' if incident else 'optional-missing'}")

    print(f"\nWarnings: {len(warnings)}")
    for item in warnings:
        print("-", item)

    if failures:
        print(f"\nFailures: {len(failures)}")
        for item in failures:
            print("-", item)
        sys.exit(1)

    print("\nPROJECT TRACK RESULT: PASS")

if __name__ == "__main__":
    main()
