package container_policy

# Check if latest tag is used
deny[msg] {
    input[i].Cmd == "from"
    val := input[i].Value
    contains(val, ":latest")
    msg = sprintf("Do not use 'latest' tag in base image: %v", [val])
}

# Check if no tag is used (defaults to latest)
deny[msg] {
    input[i].Cmd == "from"
    val := input[i].Value
    not contains(val, ":")
    msg = sprintf("Explicit version tag required for base image: %v", [val])
}

# Check if root user is specified (should not be)
deny[msg] {
    input[i].Cmd == "user"
    val := input[i].Value
    val == "root"
    msg = "Explicitly running as 'root' is not allowed"
}

# Check if non-root user is used
# Note: This is a simple check; in reality, you'd check for the EXISTENCE of a USER command.
deny[msg] {
    not has_user_command
    msg = "Dockerfile must contain a USER command (running as non-root is mandatory)"
}

has_user_command {
    input[i].Cmd == "user"
}

# Check for HEALTHCHECK
deny[msg] {
    not has_healthcheck
    msg = "Dockerfile must contain a HEALTHCHECK command"
}

has_healthcheck {
    input[i].Cmd == "healthcheck"
}
