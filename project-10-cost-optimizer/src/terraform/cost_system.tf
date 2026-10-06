terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

variable "aws_region" {
  default = "ap-southeast-1"
}

variable "aws_profile" {
  default = "thaidemo-dev"
}

# --- IAM Role for Lambdas ---
resource "aws_iam_role" "cost_lambda_role" {
  name = "thaidemo-cost-optimizer-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.cost_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "cost_access" {
  name = "cost-optimizer-access"
  role = aws_iam_role.cost_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ec2:DescribeInstances",
          "ec2:DescribeVolumes",
          "rds:DescribeDBInstances",
          "cloudwatch:GetMetricStatistics"
        ]
        Resource = "*"
      }
    ]
  })
}

# --- Cost Scanner Lambda ---
data "archive_file" "scanner_zip" {
  type        = "zip"
  source_file = "${path.module}/../app/cost_scanner.py"
  output_path = "${path.module}/cost_scanner.zip"
}

resource "aws_lambda_function" "cost_scanner" {
  filename         = data.archive_file.scanner_zip.output_path
  function_name    = "thaidemo-cost-scanner"
  role             = aws_iam_role.cost_lambda_role.arn
  handler          = "cost_scanner.lambda_handler"
  source_code_hash = data.archive_file.scanner_zip.output_base64sha256
  runtime          = "python3.11"
  timeout          = 60
}

# --- RDS Advisor Lambda ---
data "archive_file" "rds_zip" {
  type        = "zip"
  source_file = "${path.module}/../app/rds_advisor.py"
  output_path = "${path.module}/rds_advisor.zip"
}

resource "aws_lambda_function" "rds_advisor" {
  filename         = data.archive_file.rds_zip.output_path
  function_name    = "thaidemo-rds-advisor"
  role             = aws_iam_role.cost_lambda_role.arn
  handler          = "rds_advisor.lambda_handler"
  source_code_hash = data.archive_file.rds_zip.output_base64sha256
  runtime          = "python3.11"
  timeout          = 60
}

# --- EventBridge Schedules ---
resource "aws_cloudwatch_event_rule" "weekly" {
  name                = "thaidemo-weekly-cost-scan"
  description         = "Run cost optimizers weekly"
  schedule_expression = "cron(0 8 ? * MON *)" # Every Monday 8AM
}

resource "aws_cloudwatch_event_target" "scanner_target" {
  rule      = aws_cloudwatch_event_rule.weekly.name
  target_id = "cost_scanner"
  arn       = aws_lambda_function.cost_scanner.arn
}

resource "aws_cloudwatch_event_target" "rds_target" {
  rule      = aws_cloudwatch_event_rule.weekly.name
  target_id = "rds_advisor"
  arn       = aws_lambda_function.rds_advisor.arn
}

resource "aws_lambda_permission" "allow_scanner" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cost_scanner.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.weekly.arn
}

resource "aws_lambda_permission" "allow_rds" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rds_advisor.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.weekly.arn
}
