# AWS Config Rule: S3 Public Read Prohibited
resource "aws_config_config_rule" "s3_public_prohibited" {
  name = "s3-bucket-public-read-prohibited"

  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  }
}

# Auto-Remediation via Lambda
resource "aws_config_remediation_configuration" "s3_remediation" {
  config_rule_name = aws_config_config_rule.s3_public_prohibited.name
  target_type      = "SSM_DOCUMENT"
  target_id        = "AWS-ConfigureS3BucketPublicAccessBlock"

  parameter {
    name         = "BucketName"
    resource_id_parameter_value = "RESOURCE_ID"
  }
}
