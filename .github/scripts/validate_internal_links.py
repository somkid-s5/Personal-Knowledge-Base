from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[2]

INLINE_LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
REFERENCE_LINK_RE = re.compile(r"^\s*\[[^\]]+\]:\s*(\S+)", re.MULTILINE)
SKIP_PREFIXES = ("http://", "https://", "mailto:", "tel:", "data:", "javascript:", "#")
SKIP_DIRS = {".git", "node_modules", ".terraform"}


def iter_markdown_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.md"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        files.append(path)
    return sorted(files)


def clean_target(raw: str) -> str | None:
    target = raw.strip()
    if not target:
        return None

    # Markdown permits optional titles after the URL. Angle brackets are the
    # durable form for paths containing spaces, so preserve their contents.
    if target.startswith("<") and ">" in target:
        target = target[1 : target.index(">")]
    else:
        target = target.split(maxsplit=1)[0]

    target = target.strip("<>")
    if not target or target.startswith(SKIP_PREFIXES):
        return None

    parsed = urlsplit(target)
    if parsed.scheme or parsed.netloc:
        return None

    path_part = unquote(parsed.path)
    if not path_part:
        # Anchor-only links are intentionally skipped; validating GitHub's
        # generated heading slugs robustly would require a Markdown parser.
        return None
    return path_part


def resolve_target(source: Path, target: str) -> Path:
    if target.startswith("/"):
        return ROOT / target.lstrip("/")
    return source.parent / target


def main() -> int:
    broken: list[tuple[Path, str]] = []

    for source in iter_markdown_files():
        text = source.read_text(encoding="utf-8", errors="strict")
        raw_targets = INLINE_LINK_RE.findall(text) + REFERENCE_LINK_RE.findall(text)

        for raw in raw_targets:
            target = clean_target(raw)
            if target is None:
                continue

            resolved = resolve_target(source, target)
            if not resolved.exists():
                broken.append((source.relative_to(ROOT), target))

    if broken:
        print("Broken internal Markdown links found:\n")
        for source, target in broken:
            print(f"- {source}: {target}")
        print(f"\nTotal broken links: {len(broken)}")
        return 1

    print(f"Internal Markdown link validation passed across {len(iter_markdown_files())} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
