from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
SYSTEM_GUIDES = {
    "AWS-SAA-C03": "VISUAL-MEMORY-GUIDE-TH.md",
    "Azure-AZ-104": "VISUAL-MEMORY-GUIDE-TH.md",
    "GCP-ACE": "VISUAL-STUDY-GUIDE-TH.md",
    "ISC2-CC": "VISUAL-MEMORY-GUIDE-TH.md",
    "Oracle-Database": "VISUAL-MEMORY-GUIDE-TH.md",
}
errors = []
svg_files = [ROOT / "assets/visual-memory/learning-map.svg"]
for system, guide in SYSTEM_GUIDES.items():
    folder = ROOT / system
    for target in (folder / guide, folder / "README.md"):
        if not target.is_file():
            errors.append(f"Missing visual guide or entry page: {target}")
    for filename in ("01-concept-path.svg", "02-diagnostic-path.svg"):
        asset = folder / "assets/visual-memory" / filename
        svg_files.append(asset)
        if not asset.is_file():
            errors.append(f"Missing visual asset: {asset}")
            continue
        for document in (folder / guide, folder / "README.md"):
            if document.is_file() and filename == "01-concept-path.svg" and filename not in document.read_text(encoding="utf-8"):
                errors.append(f"Missing concept image reference: {document}")

for svg in svg_files:
    if not svg.is_file():
        errors.append(f"Missing SVG: {svg}")
        continue
    try:
        root = ET.parse(svg).getroot()
        if not root.tag.endswith("svg") or not root.attrib.get("aria-label"):
            errors.append(f"SVG root/aria-label invalid: {svg}")
        for el in root.iter():
            short_name = el.tag.rsplit("}", 1)[-1].lower()
            if short_name in ("script", "foreignobject", "iframe", "animate", "animatetransform"):
                errors.append(f"Unsafe/unsupported SVG element: {svg}:{short_name}")
            for key, val in el.attrib.items():
                if key.lower().startswith("on") or any(x in val.lower() for x in ("https://", "http://", "javascript:")):
                    errors.append(f"External or active content: {svg}:{key}")
    except ET.ParseError as exc:
        errors.append(f"Malformed SVG: {svg}: {exc}")

if errors:
    print("\n".join(errors))
    raise SystemExit(1)
print(f"Icon-first visual validation passed for {len(SYSTEM_GUIDES)} systems and {len(svg_files)} SVGs.")
