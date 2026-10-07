# Cloud Engineer Lab — Project Workbook Standard

[Back to Cloud Engineer Lab](./README.md) · [Repository-wide AGENTS.md](../../../AGENTS.md) · [SKILL.md](../../../SKILL.md)

Every project in this track is a **hands-on workbook**, not only a code sample. The project must teach the learner how to reason about the system, build it, verify it, break/debug it, and leave the account/workstation in a safe state.

## Required learning contract

Each `project-XX-*/README.md` must provide the following concepts, although exact heading wording may vary:

1. **Scenario / problem** — what business or operational problem is being solved.
2. **Architecture / topology** — Mermaid or an original architecture image with surrounding explanation.
3. **Prerequisites and time** — tools, accounts, dependencies and expected effort.
4. **Tasks / implementation** — ordered work with reasons, not command dumping.
5. **Verification** — observable evidence that the project actually works.
6. **Troubleshooting** — symptoms, likely layers/causes and investigation steps.
7. **Exercises / review** — learner must reason, not only copy commands.
8. **Cost awareness** — identify services/resources that can incur charges; never promise that a project is free.
9. **Cleanup** — explicit deletion/stop/destroy guidance or an explicit statement that no billable cloud resource was created.
10. **Security/safety** — temporary credentials, least privilege and destructive-command warnings when applicable.

## Authentication baseline

For human AWS access, prefer temporary credentials:

1. IAM Identity Center / federation for workforce access.
2. AWS CLI local sign-in with temporary credentials when appropriate.
3. Long-term IAM-user access keys only for exceptional use cases that cannot use temporary credentials.

Do not instruct learners to use the root user for routine work. Do not make a long-lived IAM user with `AdministratorAccess` the default lab workstation pattern.

## Cost baseline

AWS Free Tier, credits and service pricing change. Every cloud project must assume that charges are possible.

Good workbook behavior:

- state the potentially billable services,
- recommend checking Billing / Cost Explorer / Free Tier status,
- recommend a small AWS Budget or spend alert before large labs,
- include cleanup steps,
- call out expensive resources such as NAT Gateway, EKS, RDS/Aurora, GPU instances, OpenSearch, data transfer and multi-region duplication when relevant.

## Cleanup baseline

Prefer the tool that owns the resource:

```text
Terraform-created resource → terraform destroy
CloudFormation stack        → delete the stack
Helm release                → helm uninstall
Kubernetes object           → kubectl delete / GitOps removal
Console/CLI-created service → delete the service explicitly
```

After cleanup, verify the account rather than assuming deletion succeeded.

## Failure and incident learning

Every project must have troubleshooting. Explicit failure injection / incident / RCA exercises are strongly recommended for projects where breaking the environment is safe and useful, but are **not mandatory for every project**.

When intentionally causing a failure:

- define blast radius,
- avoid production accounts/data,
- state how to recover,
- clean up fault-injection resources,
- distinguish a safe simulation from production procedure.

## Source files

A project should include runnable or inspectable artifacts when the topic benefits from them: Terraform, YAML, scripts, application code, policies or queries. Placeholder-only code should be labeled as pseudocode or a teaching skeleton.

## Definition of done

A project is repository-ready when:

- the workbook contract above is satisfied,
- commands are current enough for the declared environment,
- authentication guidance follows current security practice,
- cost/cleanup risk is explicit,
- internal links work,
- no real credentials/secrets are committed,
- repository CI passes.
