# ISC2-CC — Source Coverage

[Back to ISC2-CC](./README.md) · [Source Manifest](./SOURCE-MANIFEST.md)

> **Coverage date:** 2026-10-07  
> **Status:** **COMPLETE for the supplied/discovered private source set + current 2026 objective mapping**

## Current official objective coverage

| Domain | Repository representation | Status |
|---|---|---|
| 1 — Security Principles | [Domain 1](./01-Security-Principles.md) | COMPLETE |
| 2 — Security Governance | [Domain 2](./02-Security-Governance/) | COMPLETE |
| 3 — IAM Concepts | [Domain 3](./03-Identity-Access-Management.md) | COMPLETE |
| 4 — Networking and Cloud Security | [Domain 4](./04-Networking-Cloud-Security.md) | COMPLETE |
| 5 — Security Operations and Incident Response | [Domain 5](./05-Security-Operations-Incident-Response/) | COMPLETE |

Detailed objective evidence: [OBJECTIVE-COVERAGE-2026.md](./OBJECTIVE-COVERAGE-2026.md) — **19/19 numbered objectives**.

## Private-source accounting

| Private source | Current handling | Status |
|---|---|---|
| Thor Study Guide Domain 1 | current D1 reconstruction + cross-domain remap | ACCOUNTED |
| Thor Study Guide Domain 2 | BC/DR → D2; IR → D5 | ACCOUNTED |
| Thor Study Guide Domain 3 | IAM → D3; legacy physical emphasis remapped/reference-only | ACCOUNTED |
| Thor Study Guide Domain 4 | network/cloud → D4; operations/testing → D5; resilience → D2 | ACCOUNTED |
| Thor Quick Sheet Domain 1 | D1 review support | ACCOUNTED |
| Thor Quick Sheet Domain 2 | D2/D5 review support | ACCOUNTED |
| Thor Quick Sheet Domain 3 | D3 review support | ACCOUNTED |
| Thor Quick Sheet Domain 4 | D4 + remap support | ACCOUNTED |
| Thor Quick Sheet Domain 5 | D5 data/crypto/config + D2 awareness remap | ACCOUNTED |
| Thor Mnemonics | reviewed; safe/current mnemonics only, otherwise reference-only | ACCOUNTED |
| Thor Study Plan | reconstructed as [STUDY-PLAN.md](./STUDY-PLAN.md) | ACCOUNTED |

See [LEGACY-SOURCE-REMAP.md](./LEGACY-SOURCE-REMAP.md) for topic-level old-to-new handling.

## Source not supplied

A full **Thor Study Guide — Domain 5** is not present in the Drive source set.

It is documented as unavailable rather than silently assumed. Current Domain 5 teaching is grounded in the official ISC2 2026 outline/current guidance plus the supplied Domain 5 Quick Sheet where relevant.

## Coverage interpretation

COMPLETE here means:

- every supplied/discovered private source file is accounted for,
- every current numbered ISC2 CC objective has a teaching artifact,
- old source organization is not mistaken for current scope,
- proprietary source PDFs/figures are not redistributed.

It does **not** mean every sentence of the private sources was copied, every cybersecurity topic is covered, or an exam pass is guaranteed.
