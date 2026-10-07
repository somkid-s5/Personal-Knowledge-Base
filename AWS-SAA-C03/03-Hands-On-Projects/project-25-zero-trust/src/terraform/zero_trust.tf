# Project 25: Zero Trust Networking with Verified Access

resource "aws_verifiedaccess_instance" "main" {
  description = "Zero Trust Access for ThaiDemo Apps"
  
  tags = {
    Name = "thaidemo-verified-access"
  }
}

resource "aws_verifiedaccess_trust_provider" "oidc" {
  policy_reference_name = "thaidemo-oidc"
  trust_provider_type   = "user"
  user_trust_provider_type = "oidc"

  oidc_options {
    issuer                = var.oidc_issuer
    authorization_endpoint = var.oidc_auth_endpoint
    token_endpoint        = var.oidc_token_endpoint
    user_info_endpoint     = var.oidc_user_info_endpoint
    client_id             = var.oidc_client_id
    client_secret         = var.oidc_client_secret
    scope                 = "openid profile email"
  }
}

resource "aws_verifiedaccess_group" "main" {
  verifiedaccess_instance_id = aws_verifiedaccess_instance.main.id
  
  policy_document = <<EOF
  permit(principal, action, resource)
  when {
      context.thaidemo-oidc.groups.contains("engineering")
  };
EOF
}
