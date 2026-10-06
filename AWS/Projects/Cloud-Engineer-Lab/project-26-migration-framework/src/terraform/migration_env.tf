# AWS Application Migration Service (MGN) Infrastructure Setup

# VPC for Staging Area (Where replication servers live)
resource "aws_vpc" "staging" {
  cidr_block           = "10.250.0.0/16"
  enable_dns_hostnames = true
  
  tags = {
    Name = "migration-staging-vpc"
    Environment = "Migration"
  }
}

# Subnet for Replication Servers (Must have outbound 443 to AWS MGN Endpoint)
resource "aws_subnet" "staging_a" {
  vpc_id            = aws_vpc.staging.id
  cidr_block        = "10.250.1.0/24"
  availability_zone = "ap-southeast-1a"
}

# IAM Role for MGN to perform Replication and Launch
resource "aws_iam_role" "mgn_service_role" {
  name = "AWSApplicationMigrationServiceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "mgn.amazonaws.com"
      }
    }]
  })
}

# Replication Settings (Template)
# Normally configured in AWS Console or via AWS CLI, but can be managed by TF
resource "aws_mgn_replication_configuration_template" "default" {
  staging_area_subnet_id = aws_subnet.staging_a.id
  staging_area_vpc_id    = aws_vpc.staging.id
  
  # Optimization: Use cheaper instances for replication
  replication_server_instance_type = "t3.small"
  use_dedicated_replication_server = false
  
  associate_default_security_group = true
  bandwidth_throttling             = 0 # 0 = No throttling (Fastest)
  data_plane_routing               = "PRIVATE_IP" # Use VPN/DirectConnect if available
}

output "staging_vpc_id" {
  value = aws_vpc.staging.id
}
