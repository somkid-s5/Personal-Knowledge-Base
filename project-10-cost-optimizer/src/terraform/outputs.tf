output "sns_topic_arn" {
  value = aws_sns_topic.cost_alerts.arn
}

output "lambda_functions" {
  value = {
    scanner  = aws_lambda_function.cost_scanner.function_name
    advisor  = aws_lambda_function.rds_advisor.function_name
    anomaly  = aws_lambda_function.cost_anomaly.function_name
    report   = aws_lambda_function.weekly_report.function_name
    notifier = aws_lambda_function.slack_notifier.function_name
  }
}
