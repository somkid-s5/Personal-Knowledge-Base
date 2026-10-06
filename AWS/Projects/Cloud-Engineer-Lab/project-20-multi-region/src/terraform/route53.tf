resource "aws_route53_record" "api_sg" {
  zone_id = var.zone_id
  name    = "api.thaipay.co"
  type    = "A"

  set_identifier = "singapore"
  latency_routing_policy {
    region = "ap-southeast-1"
  }

  alias {
    name                   = aws_lb.alb_sg.dns_name
    zone_id                = aws_lb.alb_sg.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api_syd" {
  zone_id = var.zone_id
  name    = "api.thaipay.co"
  type    = "A"

  set_identifier = "sydney"
  latency_routing_policy {
    region = "ap-southeast-2"
  }

  alias {
    name                   = aws_lb.alb_syd.dns_name
    zone_id                = aws_lb.alb_syd.zone_id
    evaluate_target_health = true
  }
}
