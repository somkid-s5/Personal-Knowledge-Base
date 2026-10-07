# Cloud Engineer Lab — Local Agent Guidance

This file is a package-local compatibility entry point for tools that automatically read `CLAUDE.md`.

It is **not** a separate source of repository policy. Follow the canonical rules in this order:

1. [Repository AGENTS.md](../../../AGENTS.md)
2. [Repository SKILL.md](../../../SKILL.md)
3. [Cloud Engineer Lab Project Standard](./PROJECT-STANDARD.md)
4. This package README and the individual project workbook

## Package-specific rules

- Preserve the learning path `project-00` then `project-01` through `project-34`.
- Treat each project `README.md` as a unified workbook rather than recreating old `SCENARIO.md`, `GUIDE.md`, `CHECKLIST.md` or similar split files.
- Keep Thai explanations while preserving official English technical names, commands and API/service identifiers.
- Prefer original Mermaid or repository-owned architecture visuals.
- Every project must include scenario, architecture, prerequisites, implementation, verification, troubleshooting, exercises, cost awareness and cleanup guidance.
- Use temporary AWS credentials for human access by default; never instruct routine root-user use.
- Never commit real credentials, private keys, tokens, Terraform state containing secrets or production data.
- Mark destructive or potentially expensive steps clearly.
- Failure injection / RCA is encouraged where safe and useful but is not mandatory for every project.
- Update [PROJECT-QA-MATRIX.md](./PROJECT-QA-MATRIX.md) and run `tools/audit_projects.py` when the project contract changes.

## Change discipline

Do not bulk-rewrite 34 projects merely for style consistency. Preserve technically useful material and make targeted changes for correctness, safety, teaching quality or maintainability.

A package-wide `Verified` claim must remain scoped to what the QA matrix and CI actually prove.
