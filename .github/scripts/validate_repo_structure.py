from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]

REQUIRED_ROOT_FILES = [
    "README.md",
    "AGENTS.md",
    "SKILL.md",
    "docs/REPOSITORY-ARCHITECTURE.md",
    "docs/CONTENT-STANDARD.md",
    "docs/SOURCE-POLICY.md",
    "docs/VISUAL-STANDARD.md",
    "docs/QUALITY-GATE.md",
    "templates/LEARNING-PACKAGE-README.md",
    "templates/MODULE.md",
    "templates/LAB.md",
]

CONTENT_TYPE_DIRS = {"Courses", "Certifications", "Topics", "Projects"}
IGNORE_TOP_LEVEL_DIRS = {".git", ".github", "docs", "templates"}

errors: list[str] = []

for rel in REQUIRED_ROOT_FILES:
    if not (ROOT / rel).is_file():
        errors.append(f"Missing required repository file: {rel}")

for top in ROOT.iterdir():
    if not top.is_dir() or top.name in IGNORE_TOP_LEVEL_DIRS or top.name.startswith("."):
        continue

    present_types = [child for child in top.iterdir() if child.is_dir() and child.name in CONTENT_TYPE_DIRS]
    if not present_types:
        # Not every future top-level folder has to be a learning domain, so only enforce
        # domain rules when the canonical content-type structure is present.
        continue

    if not (top / "README.md").is_file():
        errors.append(f"Domain/provider is missing README.md: {top.relative_to(ROOT)}")

    for content_type in present_types:
        for package in content_type.iterdir():
            if not package.is_dir() or package.name.startswith("."):
                continue
            if not (package / "README.md").is_file():
                errors.append(
                    "Learning package is missing README.md: "
                    f"{package.relative_to(ROOT)}"
                )

# Guard against known legacy root layouts returning after the migration.
for legacy in ("AWS_SAA_C03",):
    if (ROOT / legacy).exists():
        errors.append(
            f"Legacy root path '{legacy}' is not allowed; place content under provider/content-type/package."
        )

if errors:
    print("Repository structure validation failed:\n")
    for item in errors:
        print(f"- {item}")
    sys.exit(1)

print("Repository structure validation passed.")
