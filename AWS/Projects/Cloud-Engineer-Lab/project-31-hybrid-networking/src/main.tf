# Terraform Configuration for Site-to-Site VPN

# 1. Create Customer Gateway (Office side)
resource "aws_customer_gateway" "office_router" {
  bgp_asn    = 65000
  ip_address = "203.0.113.12" # Public IP of your Office Router
  type       = "ipsec.1"
  tags = { Name = "office-customer-gateway" }
}

# 2. Create Virtual Private Gateway (AWS side)
resource "aws_vpn_gateway" "aws_vgw" {
  vpc_id = aws_vpc.main.id
  tags = { Name = "aws-vpn-gateway" }
}

# 3. Create the VPN Connection
resource "aws_vpn_connection" "main" {
  vpn_gateway_id      = aws_vpn_gateway.aws_vgw.id
  customer_gateway_id = aws_customer_gateway.office_router.id
  type                = "ipsec.1"
  static_routes_only  = false # Use BGP
  tags = { Name = "hybrid-vpn-connection" }
}

# 4. Enable Route Propagation
resource "aws_vpn_gateway_route_propagation" "main" {
  vpn_gateway_id = aws_vpn_gateway.aws_vgw.id
  route_table_id = aws_route_table.private.id
}
