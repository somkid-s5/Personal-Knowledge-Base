# Project 21: Centralized Security Compliance

resource "aws_config_configuration_recorder" "main" {
  name     = "thaidemo-config-recorder"
  role_arn = aws_iam_role.config.arn
}

resource "aws_iam_role" "config" {
  name = "aws-config-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "config.amazonaws.com"
      }
    }]
  })
}

# AWS Config Rule: S3 Public Access Block
resource "aws_config_config_rule" "s3_public_access" {
  name = "s3-bucket-public-read-prohibited"

  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  }
}

# CloudTrail setup
resource "aws_cloudtrail" "main" {
  name                          = "thaidemo-trail"
  s3_bucket_name                = aws_s3_bucket.trail.id
  include_global_service_events = true
  is_multi_region_trail         = true
  enable_log_file_validation    = true
}

resource "aws_s3_bucket" "trail" {
  bucket = "thaidemo-cloudtrail-logs-${data.aws_caller_identity.current.account_id}"
  force_destroy = true
}

data "aws_caller_identity" "current" {}
