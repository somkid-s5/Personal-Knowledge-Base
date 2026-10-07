# AWS Config
resource "aws_config_configuration_recorder" "main" {
  name     = "main-recorder"
  role_arn = aws_iam_role.config_role.arn
}

resource "aws_iam_role" "config_role" {
  name = "aws-config-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "config.amazonaws.com"
        }
      },
    ]
  })
}

# IAM Access Analyzer
resource "aws_accessanalyzer_analyzer" "main" {
  analyzer_name = "account-analyzer"
  type          = "ACCOUNT"
}

# WAF Web ACL
resource "aws_wafv2_web_acl" "main" {
  name        = "thaifin-web-acl"
  description = "Managed rules for web app"
  scope       = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "AWS-AWSManagedRulesCommonRuleSet"
    priority = 0

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "thaifin-web-acl"
    sampled_requests_enabled   = true
  }
}
