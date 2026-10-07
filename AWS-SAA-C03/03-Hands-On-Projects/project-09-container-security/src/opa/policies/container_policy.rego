package docker.policy

# Deny images that run as root
deny[msg] {
    input[0].Config.User == ""
    msg := "Image must not run as root. Specify a user in the Dockerfile."
}

deny[msg] {
    input[0].Config.User == "root"
    msg := "Image must not run as root. Specify a non-root user in the Dockerfile."
}

# Require a healthcheck
deny[msg] {
    not input[0].Config.Healthcheck
    msg := "Image must have a HEALTHCHECK defined."
}

# Disallow 'latest' tag (though this check is usually done against the deployment manifest, 
# we can flag it here if the input contains repo tags)
deny[msg] {
    tags := input[0].RepoTags[_]
    endswith(tags, ":latest")
    msg := "Image must not use the 'latest' tag. Pin to a specific version."
}
