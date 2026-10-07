# Project 15: Disaster Recovery DNS Failover

resource "aws_route53_health_check" "primary" {
  fqdn              = "primary.thaidemo.co"
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = "3"
  request_interval  = "30"

  tags = {
    Name = "primary-health-check"
  }
}

resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = "www.thaidemo.co"
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

resource "aws_route53_record" "www_secondary" {
  zone_id = var.zone_id
  name    = "www.thaidemo.co"
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
