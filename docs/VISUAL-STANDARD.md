# Visual Learning Standard

Visuals are part of teaching quality, not decoration.

## Use a diagram when the learner must understand
- hierarchy or scope,
- request/data/identity flow,
- lifecycle/state transition,
- architecture/components,
- service-selection decision,
- failure/troubleshooting path,
- relationship between multiple layers.

## Preferred formats
1. Mermaid — default for durable conceptual diagrams.
2. Original SVG/PNG — when icons/layout materially improve understanding.
3. Screenshot — only when exact UI navigation is itself part of the lesson.

## Diagram rules
- One diagram = one primary teaching idea.
- Keep labels short; explain nuance in prose below.
- Show boundaries such as project/region/VPC/cluster when they matter.
- For flows, indicate direction and identity when security depends on who calls what.
- For troubleshooting, use decision branches instead of a decorative architecture picture.
- A diagram is a mental model unless explicitly documented as exact implementation behavior.

## Minimum visual coverage
For a large learning package, each major concept family that benefits from visual reasoning must have at least one relevant visual in either the module or a package-level visual guide.

Do not force a diagram for vocabulary-only sections where it adds no value.

## Screenshots
Screenshots age quickly. If used:
- crop to the relevant UI,
- state product/page and verification date,
- avoid exposing account data or credentials,
- pair with text so the lesson still works after minor UI changes.

## Assets
Store reusable package visuals under `assets/diagrams/`. Store redistributable source/reference images under `assets/source/` only when licensing/ownership permits.
