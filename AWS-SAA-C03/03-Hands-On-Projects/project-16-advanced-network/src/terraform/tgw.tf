# Project 16: Transit Gateway for Multi-VPC Networking

resource "aws_ec2_transit_gateway" "main" {
  description = "Main TGW for ThaiDemo Shared Services"
  
  auto_accept_shared_attachments = "enable"
  default_route_table_association = "enable"
  default_route_table_propagation = "enable"

  tags = {
    Name = "thaidemo-tgw"
  }
}

resource "aws_ec2_transit_gateway_vpc_attachment" "app_vpc" {
  subnet_ids         = var.app_vpc_subnets
  transit_gateway_id = aws_ec2_transit_gateway.main.id
  vpc_id             = var.app_vpc_id

  tags = {
    Name = "app-vpc-attachment"
  }
}

resource "aws_ec2_transit_gateway_vpc_attachment" "shared_vpc" {
  subnet_ids         = var.shared_vpc_subnets
  transit_gateway_id = aws_ec2_transit_gateway.main.id
  vpc_id             = var.shared_vpc_id

  tags = {
    Name = "shared-vpc-attachment"
  }
}
