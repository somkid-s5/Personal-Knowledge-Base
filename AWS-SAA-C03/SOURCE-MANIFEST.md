# AWS-SAA-C03 — System Source Manifest

[Back to system README](./README.md) · [System QA](./SYSTEM-QA.md)

> **Reviewed:** 2026-10-07  
> **System purpose:** unified AWS architecture + SAA-C03 learning system

## Source layers

| Layer | Source identity | Role |
|---|---|---|
| 01-Certification-Core | Current AWS SAA-C03 Exam Guide + official AWS documentation | Current objective authority |
| 02-Architecture-Foundation | Architecting on AWS 7.12.4 Student/Lab Guide + current AWS cross-checks | Long-form architecture foundation |
| 03-Hands-On-Projects | Repository-authored/imported Cloud Engineer Lab workbooks + current technical references | Implementation/troubleshooting practice |

Detailed source/provenance evidence remains inside each layer:

- [Certification Source Manifest](./01-Certification-Core/SOURCE-MANIFEST.md)
- [Certification Sources](./01-Certification-Core/SOURCES.md)
- [Course Source Manifest](./02-Architecture-Foundation/SOURCE-MANIFEST.md)
- [Course Provenance](./02-Architecture-Foundation/PROVENANCE.md)
- [Project Source Manifest](./03-Hands-On-Projects/SOURCE-MANIFEST.md)

## Authority order

For exam scope:

```text
Current AWS SAA-C03 Exam Guide
→ current AWS service documentation
→ current-scope repository teaching layer
→ historical/versioned course
→ practice/projects
```

For the historical course sequence, the versioned course source remains authoritative for what that course taught.

## Maintenance triggers

Re-audit when:

- AWS publishes a materially changed SAA exam guide,
- a service in the current objective map is renamed/deprecated,
- security/networking defaults change materially,
- the Architecting course version is replaced,
- imported project content is regenerated,
- the repository is prepared for public redistribution.
