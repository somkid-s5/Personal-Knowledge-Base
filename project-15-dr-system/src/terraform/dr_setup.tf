# Terraform for Backup and DNS Failover

# 1. AWS Backup Plan
resource "aws_backup_vault" "primary" {
  name = "primary-vault"
}

resource "aws_backup_plan" "hourly" {
  name = "hourly-backup-plan"

  rule {
    rule_name         = "hourly-rule"
    target_vault_name = aws_backup_vault.primary.name
    schedule          = "cron(0 * * * ? *)"

    lifecycle {
      delete_after = 30
    }

    copy_action {
      destination_vault_arn = var.secondary_vault_arn
    }
  }
}

# 2. Route53 Health Check
resource "aws_route53_health_check" "primary" {
  fqdn              = var.primary_alb_dns
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = "3"
  request_interval  = "30"
}

# 3. DNS Failover Records
resource "aws_route53_record" "app_primary" {
  zone_id = var.zone_id
  name    = "app.${var.domain}"
  type    = "A"

  failover_routing_policy {
    type = "PRIMARY"
  }

  set_identifier = "primary"
  health_check_id = aws_route53_health_check.primary.id

  alias {
    name                   = var.primary_alb_dns
    zone_id                = var.primary_alb_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "app_secondary" {
  zone_id = var.zone_id
  name    = "app.${var.domain}"
  type    = "A"

  failover_routing_policy {
    type = "SECONDARY"
  }

  set_identifier = "secondary"

  alias {
    name                   = var.secondary_alb_dns
    zone_id                = var.secondary_alb_zone_id
    evaluate_target_health = true
  }
}
