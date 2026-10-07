# Terraform for CUR Infrastructure

# 1. S3 Bucket for Billing Reports
resource "aws_s3_bucket" "billing_data" {
  bucket = "thairetail-billing-data-${var.account_id}"
}

resource "aws_s3_bucket_policy" "billing_policy" {
  bucket = aws_s3_bucket.billing_data.id
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": { "Service": "billingreports.amazonaws.com" },
            "Action": [ "s3:GetBucketAcl", "s3:GetBucketPolicy" ],
            "Resource": "arn:aws:s3:::${aws_s3_bucket.billing_data.bucket}"
        },
        {
            "Effect": "Allow",
            "Principal": { "Service": "billingreports.amazonaws.com" },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::${aws_s3_bucket.billing_data.bucket}/*"
        }
    ]
}
POLICY
}

# 2. Athena Workgroup
resource "aws_athena_workgroup" "finops" {
  name = "finops-queries"

  configuration {
    result_configuration {
      output_location = "s3://${aws_s3_bucket.billing_data.bucket}/athena-results/"
    }
  }
}

# 3. Glue Database
resource "aws_glue_catalog_database" "finops" {
  name = "finops_db"
}
