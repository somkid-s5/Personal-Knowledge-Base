# Terraform for Transit Gateway and Endpoints

# 1. Transit Gateway
resource "aws_ec2_transit_gateway" "main" {
  description = "Main TGW for ThaiLogistics Hub-and-Spoke"
  auto_accept_shared_attachments = "enable"
  default_route_table_association = "disable"
  default_route_table_propagation = "disable"
  
  tags = { Name = "main-tgw" }
}

# 2. VPC Attachments
resource "aws_ec2_transit_gateway_vpc_attachment" "shared" {
  subnet_ids         = var.shared_subnets
  transit_gateway_id = aws_ec2_transit_gateway.main.id
  vpc_id             = var.shared_vpc_id
  dns_support        = "enable"
}

# 3. S3 Gateway Endpoint
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = var.shared_vpc_id
  service_name = "com.amazonaws.${var.region}.s3"
  route_table_ids = var.shared_route_tables
  
  policy = <<POLICY
{
    "Statement": [
        {
            "Action": "*",
            "Effect": "Allow",
            "Resource": "*",
            "Principal": "*"
        }
    ]
}
POLICY
}

# 4. ECR Interface Endpoint
resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id            = var.shared_vpc_id
  service_name      = "com.amazonaws.${var.region}.ecr.dkr"
  vpc_endpoint_type = "Interface"
  subnet_ids        = var.shared_subnets
  security_group_ids = [var.endpoint_sg_id]
  private_dns_enabled = true
}
