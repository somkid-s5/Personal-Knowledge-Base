# Project 18: Athena for Cost and Usage Reports (CUR)

resource "aws_athena_workgroup" "finops" {
  name = "finops-analysis"

  configuration {
    enforce_workgroup_configuration    = true
    publish_cloudwatch_metrics_enabled = true

    result_configuration {
      output_location = "s3://${aws_s3_bucket.results.bucket}/athena-results/"
    }
  }
}

resource "aws_athena_database" "cur" {
  name   = "athena_cur_db"
  bucket = aws_s3_bucket.results.bucket
}

resource "aws_s3_bucket" "results" {
  bucket = "thaidemo-finops-results-${data.aws_caller_identity.current.account_id}"
  force_destroy = true
}

data "aws_caller_identity" "current" {}

output "athena_workgroup" {
  value = aws_athena_workgroup.finops.id
}
