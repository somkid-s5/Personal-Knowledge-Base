# VPC for Zero Trust Environment
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
}

# Private Subnets only (Zero Trust principle: no direct internet access)
resource "aws_subnet" "private" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

# Security Group for VPC Endpoints
resource "aws_security_group" "vpce" {
  name   = "vpc-endpoint-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }
}

# Interface Endpoints for SSM (Required for Session Manager in private VPC)
resource "aws_vpc_endpoint" "ssm" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-southeast-1.ssm"
  vpc_endpoint_type   = "Interface"
  security_group_ids  = [aws_security_group.vpce.id]
  private_dns_enabled = true
  subnet_ids          = [aws_subnet.private.id]
}

resource "aws_vpc_endpoint" "ssmmessages" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-southeast-1.ssmmessages"
  vpc_endpoint_type   = "Interface"
  security_group_ids  = [aws_security_group.vpce.id]
  private_dns_enabled = true
  subnet_ids          = [aws_subnet.private.id]
}

resource "aws_vpc_endpoint" "ec2messages" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.ap-southeast-1.ec2messages"
  vpc_endpoint_type   = "Interface"
  security_group_ids  = [aws_security_group.vpce.id]
  private_dns_enabled = true
  subnet_ids          = [aws_subnet.private.id]
}

# S3 Gateway Endpoint
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.ap-southeast-1.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private.id]
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}

# IAM Role for EC2 with Zero Trust Policy
resource "aws_iam_role" "ec2_role" {
  name = "zero-trust-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

# Enforce MFA Policy
resource "aws_iam_policy" "mfa_enforced" {
  name        = "EnforceMFA"
  description = "Deny all access if MFA is not present"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "DenyAllWithoutMFA"
      Effect    = "Deny"
      Action    = "*"
      Resource  = "*"
      Condition = {
        "BoolIfExists" = { "aws:MultiFactorAuthPresent" = "false" }
      }
    }]
  })
}
