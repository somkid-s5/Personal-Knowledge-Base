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

# --- DynamoDB ---
resource "aws_dynamodb_table" "items" {
  name           = "thaidemo-items"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = {
    Name = "thaidemo-items-table"
  }
}

# --- IAM for Lambda ---
resource "aws_iam_role" "lambda_exec" {
  name = "thaidemo-lambda-role"

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
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "dynamodb_access" {
  name = "dynamodb-access"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:DeleteItem"
      ]
      Resource = aws_dynamodb_table.items.arn
    }]
  })
}

# --- Lambda Function ---
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../app"
  output_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "api_handler" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = "thaidemo-api-handler"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "lambda_handler.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "python3.11"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.items.name
    }
  }
}

# --- API Gateway ---
resource "aws_apigatewayv2_api" "http_api" {
  name          = "thaidemo-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"

  integration_uri    = aws_lambda_function.api_handler.invoke_arn
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "any_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

output "api_endpoint" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}
