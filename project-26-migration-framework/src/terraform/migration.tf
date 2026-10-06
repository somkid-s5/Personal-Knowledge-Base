# Project 26: Cloud Migration Framework

resource "aws_mgh_home_region" "main" {
  home_region = "ap-southeast-1"
}

# Example: SMS Replication Job placeholder (since it requires on-prem connector)
# In a real lab, we'd document the connector setup.

resource "aws_datasync_location_s3" "destination" {
  s3_bucket_arn = aws_s3_bucket.migration_dest.arn
  subdirectory  = "/migration-data"
  s3_storage_class = "STANDARD"
  
  s3_config {
    bucket_access_role_arn = aws_iam_role.datasync.arn
  }
}

resource "aws_s3_bucket" "migration_dest" {
  bucket = "thaidemo-migration-dest-${data.aws_caller_identity.current.account_id}"
}

resource "aws_iam_role" "datasync" {
  name = "datasync-access-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "datasync.amazonaws.com"
      }
    }]
  })
}

data "aws_caller_identity" "current" {}
