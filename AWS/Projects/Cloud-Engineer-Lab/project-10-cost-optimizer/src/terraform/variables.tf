variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "slack_webhook_url" {
  description = "Slack Webhook URL for alerts"
  type        = string
  sensitive   = true
}

variable "alert_email" {
  description = "Email address for budget alerts"
  type        = string
}

variable "monthly_budget_limit" {
  description = "Monthly budget limit in USD"
  type        = string
  default     = "100"
}
