# 🎨 Icon-First Visual Learning Standard

**Effective:** 2026-10-10 · **Scope:** AWS SAA-C03, Azure AZ-104, GCP ACE, ISC2 CC, Oracle Database and future learning systems.

This complements [Visual Learning Standard](./VISUAL-STANDARD.md) and [Content Standard](./CONTENT-STANDARD.md); it never supersedes source, fidelity, security or QA rules.

## 🧠 Core principle — images help memory, text provides truth

**Icon / Emoji → English technical name → Thai meaning → How it works → When to use → Failure / Lab.**

Never convert the whole note into an image. Searchable Markdown, commands, configuration and references remain text. Icon-only explanations are prohibited.

## 🧩 Choose the right visual

| Topic | Recommended | Memory cue | Keep in text |
|---|---|---|---|
| Network/data path | SVG role icons + arrows | 🌐 → ⚖️ → 🖥️ | Actual routing, security boundaries |
| Identity/RBAC/IAM | Scope hierarchy / decision | 👤 → 🔑 → 🗂️ | Policy precedence, effective permissions |
| Database / Kubernetes | Containment/tree | 🗄️ → ⚙️ | Lifecycle, version-specific behavior |
| Troubleshooting | Decision tree / checks | 🚨 → 🔎 → 🩺 → ✅ | Observations, commands, diagnosis, rollback |
| Lesson / Lab | Icon section + checklist | 📘 → 🧪 → ✅ | Copyable CLI and expected results |
| Security | Outcome + control map | 🔒 🧾 🟢 | Control objectives and tradeoffs |

## 📐 Layout rules

- Use **one primary idea per diagram**; default to 3–5 large icon cards on one line or a readable hierarchy.
- Icons depict **roles** (client, network, identity, DB); pair with an English service/product name and Thai explanation in Markdown.
- Use consistent semantic colors: green = healthy/verified, red = fault, amber = warning, blue = neutral network. Never encode state by color alone.
- Prefer standalone SVG in `<Learning-System>/assets/visual-memory/` for polished, reusable static diagrams; use Mermaid for changeable flows and decision trees.
- SVG must be self-contained: no script, animation, foreignObject, remote font, network request, external CSS, embedded credential or user data.
- Include meaningful Markdown alt text: `![AWS ALB request path](../AWS-SAA-C03/assets/visual-memory/01-concept-path.svg)`.
- Test at desktop and mobile widths. Keep label length short; split flow into more than one diagram if unreadable at narrow sizes.
- Support GitHub Light/Dark rendering and mobile view; avoid raw HTML styling that GitHub sanitizes.
- Follow each visual with a searchable text explanation and a concrete example.

## 🏷️ Logos are not pictograms

- **Original icons**: simple vector drawings of general roles. Safe to author and modify; must not be labeled as official vendor logos.
- **Vendor/service logos**: prefer linking to official vendor asset pages, and vendor-supplied architecture symbols when licenses/branding permit reuse. Preserve source URL, retrieved date, license/usage terms and attribution as appropriate.
- Never invent an AWS/Azure/GCP/Oracle/ISC2 logo, copy a paid course figure, or embed logo URLs with unknown usage rights.
- Brand logos are for recognition; technical diagrams must remain understandable if the logo is missing.

## 🔎 Every major lesson

A good lesson should have **at most one short visual-memory cue near its beginning**, a link to a relevant system visual guide, and the complete factual explanation below. Only add a new diagram when it teaches something not already covered by the system guide. For text-only policy or source/QA documents, icons may be omitted.

## ✅ Quality gate

Check source correctness, visual semantics, non-decorative use, SVG validity, text alternatives, light/dark/mobile readability, working relative links, brand provenance and unchanged technical claims. Existing course/Certification verification labels **must not be raised** by visual work alone.

Start from [Icon-First Gallery](../VISUAL-GALLERY.md) and the linked visual guide for each learning system.
