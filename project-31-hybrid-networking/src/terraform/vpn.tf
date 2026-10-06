# Project 31: Site-to-Site VPN for Hybrid Cloud

resource "aws_customer_gateway" "main" {
  bgp_asn    = 65000
  ip_address = "203.0.113.12" # Static IP of On-prem Router
  type       = "ipsec.1"

  tags = {
    Name = "on-prem-gateway"
  }
}

resource "aws_vpn_gateway" "vpn_gw" {
  vpc_id = var.vpc_id

  tags = {
    Name = "thaidemo-vpn-gw"
  }
}

resource "aws_vpn_connection" "main" {
  vpn_gateway_id      = aws_vpn_gateway.vpn_gw.id
  customer_gateway_id = aws_customer_gateway.main.id
  type                = "ipsec.1"
  static_routes_only  = true

  tags = {
    Name = "thaidemo-to-onprem"
  }
}

resource "aws_vpn_connection_route" "office" {
  destination_cidr_block = "192.168.10.0/24"
  vpn_connection_id      = aws_vpn_connection.main.id
}
