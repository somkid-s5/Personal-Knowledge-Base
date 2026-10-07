# Session Memory & Architectural Decisions

## Active Role
- **Role**: Senior IT Mentor & DevOps Setup Engineer
- **Responsibility**: Guiding a transitioning Sysadmin through setting up their workstation for hands-on DevOps labs.

## Key Architectural Decisions
1. **WSL Hybrid Workspace Model**:
   - **File Location**: Keep project source files on the Windows filesystem (`C:\Workspace\...`) to prevent visual editor file locking and integrate cleanly with local tools.
   - **Execution Environment**: Execute all script runtimes, Terraform deployments, Kubernetes management, and testing commands inside WSL (Ubuntu) to ensure Linux compatibility.
2. **Metadata Mounting (`wsl.conf`)**:
   - Enabled metadata mounting mapping inside WSL `/etc/wsl.conf` using `metadata,umask=22,fmask=11` options. This is essential to prevent Git / file permission mismatch errors (e.g., file permissions defaulting to 777 on mounted folders).
3. **AWS Named Profile Strategy**:
   - Isolates developer workloads under a custom named profile `developer-dev` rather than setting it up under the `default` profile to protect actual production environments.
4. **Comprehensive Toolset Mapping (Audit for 34 Projects)**:
   - Evaluated the dependency requirements for all 34 projects and expanded the setup guide to support all phases of the workbook:
     - **Basic Setup**: Git, VS Code, AWS CLI, Terraform
     - **Containerization**: Docker Desktop with WSL 2 integration (Projects 03, 09)
     - **Advanced IaC & Automation**: Terragrunt (Project 11), Ansible (Project 02), Python 3 / pip / boto3 (Projects 10, 32)
     - **Kubernetes Ecosystem**: kubectl & Helm (Projects 12, 13, 14, 15, 17, 27, 28, 30, 33)

## Session State & Tasks
- **Task Completed**: Updated `project-00-preparation-setup/README.md` to detail comprehensive WSL installation, Docker Desktop integration, kubectl, Helm, Ansible, Terragrunt, and Python tools.
- **Git State**: Local repository requires staging, committing, and pushing the new updates to GitHub `main` branch.
