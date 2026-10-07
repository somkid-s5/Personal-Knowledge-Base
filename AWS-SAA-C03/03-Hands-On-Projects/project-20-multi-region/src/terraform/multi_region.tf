# Project 20: Multi-Region Global Infrastructure

provider "aws" {
  alias  = "primary"
  region = "ap-southeast-1"
}

provider "aws" {
  alias  = "secondary"
  region = "us-east-1"
}

# --- Global Accelerator ---
resource "aws_globalaccelerator_accelerator" "main" {
  name     = "thaidemo-global-accel"
  ip_address_type = "IPV4"
  enabled         = true
}

resource "aws_globalaccelerator_listener" "http" {
  accelerator_arn = aws_globalaccelerator_accelerator.main.id
  protocol        = "TCP"

  port_range {
    from_port = 80
    to_port   = 80
  }
}

# --- DynamoDB Global Table ---
resource "aws_dynamodb_table" "global" {
  name             = "thaidemo-global-table"
  billing_mode     = "PAY_PER_REQUEST"
  hash_key         = "PK"
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "PK"
    type = "S"
  }

  replica {
    region_name = "us-east-1"
  }

  tags = {
    Name = "thaidemo-global-table"
  }
}

output "accelerator_dns" {
  value = aws_globalaccelerator_accelerator.main.dns_name
}
