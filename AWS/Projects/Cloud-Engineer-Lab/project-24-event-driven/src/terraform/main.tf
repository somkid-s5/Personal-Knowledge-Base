# EventBridge Global Bus
resource "aws_cloudwatch_event_bus" "main" {
  name = "thaipay-global-bus"
}

# SNS Topic for Fan-out
resource "aws_sns_topic" "payment_events" {
  name = "payment-events-fanout"
}

# SQS Queue for Payment Processing
resource "aws_sqs_queue" "payment_processing" {
  name                      = "payment-processing-queue"
  message_retention_seconds = 86400
  visibility_timeout_seconds = 60 # At least 6x Lambda timeout (10s)
  
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.payment_dlq.arn
    maxReceiveCount     = 3
  })
}

# Dead Letter Queue
resource "aws_sqs_queue" "payment_dlq" {
  name = "payment-processing-dlq"
}

# Subscription: SNS to SQS
resource "aws_sns_topic_subscription" "payment_sqs" {
  topic_arn = aws_sns_topic.payment_events.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.payment_processing.arn
}

# EventBridge Rule
resource "aws_cloudwatch_event_rule" "payment_success" {
  name           = "payment-success-rule"
  event_bus_name = aws_cloudwatch_event_bus.main.name

  event_pattern = jsonencode({
    source      = ["thaipay.payments"]
    detail-type = ["PaymentSuccess"]
  })
}

# Target: EventBridge to SNS
resource "aws_cloudwatch_event_target" "sns" {
  rule           = aws_cloudwatch_event_rule.payment_success.name
  target_id      = "SendToSNS"
  arn            = aws_sns_topic.payment_events.arn
  event_bus_name = aws_cloudwatch_event_bus.main.name
}

# DynamoDB Table for Idempotency
resource "aws_dynamodb_table" "processed_events" {
  name           = "processed_events"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }
}
