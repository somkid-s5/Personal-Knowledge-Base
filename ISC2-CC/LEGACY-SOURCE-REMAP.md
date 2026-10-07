# ISC2 CC — Legacy Source Remap

[← ISC2-CC](./README.md) · [Source Manifest](./SOURCE-MANIFEST.md)

> Purpose: account for the private pre-2026 Thor source set without pretending its old domain structure is current.

## Source accounting

| Private source | Current handling | Status |
|---|---|---|
| Study Guide Domain 1 | CIA/risk/governance/controls/ethics → current Domain 1; IAM-related concepts cross-linked to Domain 3 | ACCOUNTED |
| Quick Sheet Domain 1 | review support for current Domain 1 | ACCOUNTED |
| Study Guide Domain 2 | BC/DR → current 2.2; Incident Management → current 5.3; old BIA/recovery-site detail retained as supporting context | ACCOUNTED |
| Quick Sheet Domain 2 | BC/DR/IR review concepts remapped to current Domain 2/5 | ACCOUNTED |
| Study Guide Domain 3 | logical access → current Domain 3; physical-security-heavy material is not treated as current Domain 3 | ACCOUNTED |
| Quick Sheet Domain 3 | IAM/access review support; physical material treated as historical/reference | ACCOUNTED |
| Study Guide Domain 4 | networking/cloud → current Domain 4; IDS/SIEM/threat/testing → Domain 5; backup/resilience → Domain 2; facilities trivia reference-only | ACCOUNTED |
| Quick Sheet Domain 4 | same mapping as Study Guide D4, used as review support | ACCOUNTED |
| Quick Sheet Domain 5 | crypto/data → 5.1; config/change → 5.4; awareness/social engineering → 2.3; security-testing-relevant phishing → 5.5 | ACCOUNTED |
| Mnemonics | reviewed as mnemonic/reference source; only accurate/current mnemonics promoted selectively | REFERENCE-ONLY / ACCOUNTED |
| Study Plan | reconstructed as [current study plan](./STUDY-PLAN.md) | ACCOUNTED |

## Missing-source clarification

A full **Thor Study Guide — Domain 5** is not present in the supplied/discovered Drive folder.

This is **not an unread source file**; it is a source that was never supplied. It remains documented as unavailable, while current Domain 5 teaching is built from:

1. the official ISC2 2026 exam outline,
2. current ISC2 AI guidance,
3. the supplied Thor Domain 5 Quick Sheet where its concepts remain relevant,
4. repository-authored teaching reconstruction.

## Important old-to-new moves

### Old Domain 2 → current structure

- BC / DR → Domain 2 objective 2.2
- Incident Response → Domain 5 objective 5.3

### Old Domain 3 → current structure

- logical access controls → Domain 3
- legacy physical access emphasis → no longer the center of Domain 3; relevant human/physical testing concepts are handled under 5.5 where current scope calls for them

### Old Domain 4 → current structure

- core networking / VPN / firewall / wireless / IoT / cloud → Domain 4
- SIEM / IDS operations / threat context → Domain 5.2
- vulnerability scanning/testing → Domain 5.5
- backup / redundancy / recovery → Domain 2.2
- power/fire-suppression/RAID detail → useful background, not current objective-core teaching

### Old Domain 5 → current structure

- data handling / crypto → Domain 5.1
- config/change management → Domain 5.4
- awareness/social engineering → Domain 2.3
- phishing as authorized physical/human testing example → Domain 5.5

## Mnemonic policy

The Thor mnemonic sheet contains both useful memory aids and older/oversimplified algorithm lists.

Promote only mnemonics that are both accurate and useful for current scope, such as:

- CIA
- MFA factor categories
- OSI layer ordering
- simple change-management sequencing

Do not promote obsolete algorithm trivia merely because it is memorable.

## Result

Every file actually present in the discovered private ISC2-CC Drive source set is now explicitly accounted for.

No proprietary PDF, long passage, figure or answer bank is committed to this repository.
