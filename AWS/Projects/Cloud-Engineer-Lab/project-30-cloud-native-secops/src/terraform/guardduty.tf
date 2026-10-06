# Project 30: Centralized Security with GuardDuty and Security Hub

resource "aws_guardduty_detector" "main" {
  enable = true
}

resource "aws_securityhub_account" "main" {}

# Enable standard: CIS AWS Foundations Benchmark
resource "aws_securityhub_standards_subscription" "cis" {
  depends_on    = [aws_securityhub_account.main]
  standards_arn = "arn:aws:securityhub:ap-southeast-1::standards/cis-aws-foundations-benchmark/v/1.2.0"
}

# Macie for Sensitive Data discovery
resource "aws_macie2_account" "main" {}

resource "aws_macie2_classification_job" "pii_scan" {
  name     = "pii-scan-job"
  job_type = "SCHEDULED"
  s3_job_definition {
    bucket_definitions {
      account_id = data.aws_caller_identity.current.account_id
      buckets    = ["thaidemo-ml-data-lake-${data.aws_caller_identity.current.account_id}"]
    }
  }
  schedule_frequency {
    daily_schedule = true
  }
}
