# Content Standard

## Learning objective
Notes must help the reader build a usable mental model, not merely memorize service names.

A strong section usually follows:

```text
Problem → Mental model → How it works → Decision/tradeoff → Example → Failure/troubleshooting → Review
```

Not every section needs every element, but major concepts should not stop at definitions.

## Required qualities
### Accuracy
Use current, authoritative sources. Separate durable concepts from fast-changing product details.

### Teachability
Explain unfamiliar concepts from first principles before using dense abbreviations. Introduce one mental model at a time and connect it to prior knowledge.

### Operational value
For infrastructure topics, include what to inspect when something fails: identity, scope, network path, resource state, logs/metrics, quota/capacity, dependency health, cost/lifecycle as relevant.

### Decision value
When multiple services can solve similar problems, explain selection criteria and tradeoffs rather than declaring one universally better.

### Reviewability
End major modules with a concise summary, questions, scenarios or a checklist that exposes misunderstandings.

## Language
- Explain primarily in Thai.
- Preserve official English names for products, APIs, CLI commands, configuration keys and UI labels.
- Define acronyms on first important use.
- Avoid artificial translations that make official terminology harder to search.

## Recommended package README metadata
At the top of a package README, state:
- Status
- Last verified date
- Target learner
- Source of truth
- Scope / exclusions

## Tables
Use tables for comparisons and mappings, not for paragraphs that would read better as prose.

## Commands and code
For mutating commands, explain:
- what context/project/account is assumed,
- required permissions/prerequisites,
- expected result,
- how to verify,
- cleanup or rollback when applicable.

Do not present destructive commands as harmless examples.

## Certification content
A certification package should have:
- current exam guide/path source,
- objective map,
- teaching notes,
- visual map where useful,
- practice/review scenarios,
- QA matrix,
- explicit separation between official labs and original companion labs.

## Course/book content
Distinguish between:
- what the source teaches,
- original explanation added by this repository,
- optional modern/current updates.

Do not reproduce long copyrighted text or proprietary challenge answers.
