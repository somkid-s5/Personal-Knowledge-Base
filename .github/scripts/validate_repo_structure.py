from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]

REQUIRED_ROOT_FILES = [
    "README.md",
    "AGENTS.md",
    "SKILL.md",
    "skills/README.md",
    "skills/INTERNET-FIRST-CURRICULUM.md",
    "skills/SOURCE-INGESTION-CURRICULUM.md",
    "docs/REPOSITORY-ARCHITECTURE.md",
    "docs/CONTENT-STANDARD.md",
    "docs/SOURCE-POLICY.md",
    "docs/VISUAL-STANDARD.md",
    "docs/QUALITY-GATE.md",
    "templates/LEARNING-PACKAGE-README.md",
    "templates/SOURCE-MANIFEST.md",
    "templates/SOURCE-COVERAGE.md",
    "templates/MODULE.md",
    "templates/LAB.md",
]

REQUIRED_SYSTEMS = {
    "AWS-SAA-C03",
    "Azure-AZ-104",
    "GCP-ACE",
    "ISC2-CC",
    "Oracle-Database",
}

IGNORE_TOP_LEVEL_DIRS = {
    ".git",
    ".github",
    "docs",
    "templates",
    "skills",
}

LEGACY_ROOTS = {
    "AWS",
    "Azure",
    "GCP",
    "AWS_SAA_C03",
}

errors: list[str] = []

for rel in REQUIRED_ROOT_FILES:
    if not (ROOT / rel).is_file():
        errors.append(f"Missing required repository file: {rel}")

for system_name in sorted(REQUIRED_SYSTEMS):
    system = ROOT / system_name
    if not system.is_dir():
        errors.append(f"Missing canonical learning system: {system_name}")
        continue

    readme = system / "README.md"
    if not readme.is_file():
        errors.append(f"Learning system is missing README.md: {system_name}")
        continue

    head = "\n".join(
        readme.read_text(encoding="utf-8", errors="ignore").splitlines()[:24]
    )
    status_lines = [
        line
        for line in head.splitlines()
        if "status:" in line.casefold() or "system status:" in line.casefold()
    ]
    is_verified = any("verified" in line.casefold() for line in status_lines)

    if is_verified:
        if not (system / "SOURCE-MANIFEST.md").is_file():
            errors.append(
                f"Verified learning system is missing SOURCE-MANIFEST.md: {system_name}"
            )

        qa_files = [
            candidate
            for candidate in system.glob("*.md")
            if "qa" in candidate.name.casefold()
            and candidate.name.casefold() != "readme.md"
        ]
        if not qa_files:
            errors.append(
                f"Verified learning system is missing system-level QA evidence: {system_name}"
            )

# AWS is intentionally one visible system with three ordered internal layers.
aws = ROOT / "AWS-SAA-C03"
for layer in (
    "01-Certification-Core",
    "02-Architecture-Foundation",
    "03-Hands-On-Projects",
):
    if aws.is_dir() and not (aws / layer).is_dir():
        errors.append(f"AWS-SAA-C03 is missing required learning layer: {layer}")

# Any future non-governance top-level learning directory should at least be navigable.
for top in ROOT.iterdir():
    if (
        not top.is_dir()
        or top.name in IGNORE_TOP_LEVEL_DIRS
        or top.name.startswith(".")
        or top.name in LEGACY_ROOTS
    ):
        continue

    if top.name not in REQUIRED_SYSTEMS and not (top / "README.md").is_file():
        errors.append(
            f"Top-level learning system/domain is missing README.md: {top.name}"
        )

for legacy in sorted(LEGACY_ROOTS):
    if (ROOT / legacy).exists():
        errors.append(
            f"Legacy provider-first root '{legacy}' is not allowed. "
            "Use a learner-goal system such as AWS-SAA-C03, Azure-AZ-104, GCP-ACE, ISC2-CC or Oracle-Database."
        )

if errors:
    print("Repository structure validation failed:\n")
    for item in errors:
        print(f"- {item}")
    sys.exit(1)

print("Repository structure validation passed.")
