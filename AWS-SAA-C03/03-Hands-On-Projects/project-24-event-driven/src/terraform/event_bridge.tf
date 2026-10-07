# Project 24: Event-Driven Architecture with EventBridge

resource "aws_cloudwatch_event_bus" "app" {
  name = "thaidemo-app-bus"
}

resource "aws_cloudwatch_event_rule" "order_placed" {
  name           = "order-placed-rule"
  event_bus_name = aws_cloudwatch_event_bus.app.name
  
  event_pattern = jsonencode({
    "source": ["thaidemo.orders"],
    "detail-type": ["OrderPlaced"]
  })
}

# Example target: Lambda (assumes Lambda from previous projects)
resource "aws_cloudwatch_event_target" "process_order" {
  rule           = aws_cloudwatch_event_rule.order_placed.name
  event_bus_name = aws_cloudwatch_event_bus.app.name
  target_id      = "process-order-lambda"
  arn            = var.process_order_lambda_arn
}
