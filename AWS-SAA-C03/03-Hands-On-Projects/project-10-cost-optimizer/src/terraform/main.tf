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
  region = var.aws_region
}

# SNS Topic for Cost Alerts
resource "aws_sns_topic" "cost_alerts" {
  name = "aws-cost-alerts"
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "cost_optimizer_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Policy for Lambda
resource "aws_iam_role_policy" "lambda_policy" {
  name = "cost_optimizer_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ce:GetCostAndUsage",
          "ec2:DescribeInstances",
          "ec2:DescribeVolumes",
          "ec2:StopInstances",
          "rds:DescribeDBInstances",
          "cloudwatch:GetMetricStatistics",
          "sns:Publish",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# Lambda Functions
resource "aws_lambda_function" "cost_scanner" {
  filename      = "lambda_function_payload.zip" # Placeholder, in IRL would be generated
  function_name = "cost_scanner"
  role          = aws_iam_role.lambda_role.arn
  handler       = "cost_scanner.lambda_handler"
  runtime       = "python3.11"
  timeout       = 60

  environment {
    variables = {
      SNS_TOPIC_ARN = aws_sns_topic.cost_alerts.arn
    }
  }
}

resource "aws_lambda_function" "rds_advisor" {
  filename      = "lambda_function_payload.zip"
  function_name = "rds_advisor"
  role          = aws_iam_role.lambda_role.arn
  handler       = "rds_advisor.lambda_handler"
  runtime       = "python3.11"
  timeout       = 60

  environment {
    variables = {
      SNS_TOPIC_ARN = aws_sns_topic.cost_alerts.arn
    }
  }
}

resource "aws_lambda_function" "cost_anomaly" {
  filename      = "lambda_function_payload.zip"
  function_name = "cost_anomaly"
  role          = aws_iam_role.lambda_role.arn
  handler       = "cost_anomaly.lambda_handler"
  runtime       = "python3.11"
  timeout       = 60

  environment {
    variables = {
      SNS_TOPIC_ARN = aws_sns_topic.cost_alerts.arn
    }
  }
}

resource "aws_lambda_function" "weekly_report" {
  filename      = "lambda_function_payload.zip"
  function_name = "weekly_report"
  role          = aws_iam_role.lambda_role.arn
  handler       = "weekly_report.lambda_handler"
  runtime       = "python3.11"
  timeout       = 60

  environment {
    variables = {
      SNS_TOPIC_ARN = aws_sns_topic.cost_alerts.arn
    }
  }
}

resource "aws_lambda_function" "slack_notifier" {
  filename      = "lambda_function_payload.zip"
  function_name = "slack_notifier"
  role          = aws_iam_role.lambda_role.arn
  handler       = "slack_notifier.lambda_handler"
  runtime       = "python3.11"

  environment {
    variables = {
      SLACK_WEBHOOK_URL = var.slack_webhook_url
    }
  }
}

# SNS Subscription for Slack Notifier
resource "aws_lambda_permission" "sns_trigger" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.slack_notifier.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = aws_sns_topic.cost_alerts.arn
}

resource "aws_sns_topic_subscription" "slack_subscription" {
  topic_arn = aws_sns_topic.cost_alerts.arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.slack_notifier.arn
}

# EventBridge Schedules
resource "aws_cloudwatch_event_rule" "daily" {
  name                = "cost-optimizer-daily"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_rule" "weekly" {
  name                = "cost-optimizer-weekly"
  schedule_expression = "cron(0 9 ? * MON *)"
}

resource "aws_cloudwatch_event_target" "scanner_weekly" {
  rule      = aws_cloudwatch_event_rule.weekly.name
  target_id = "cost_scanner"
  arn       = aws_lambda_function.cost_scanner.arn
}

# (Other targets omitted for brevity in this example, but would be added similarly)

# AWS Budget Alert
resource "aws_budgets_budget" "monthly_budget" {
  name              = "monthly-budget"
  budget_type       = "COST"
  limit_amount      = var.monthly_budget_limit
  limit_unit        = "USD"
  time_period_end   = "2087-06-15_00:00"
  time_period_start = "2024-01-01_00:00"
  time_unit         = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }
}
