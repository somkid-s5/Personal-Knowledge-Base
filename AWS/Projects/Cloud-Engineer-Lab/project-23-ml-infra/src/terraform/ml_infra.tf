# Project 23: Machine Learning Infrastructure (SageMaker)

resource "aws_sagemaker_notebook_instance" "main" {
  name          = "thaidemo-notebook"
  role_arn      = aws_iam_role.sagemaker.arn
  instance_type = "ml.t3.medium"

  tags = {
    Name = "thaidemo-notebook"
  }
}

resource "aws_iam_role" "sagemaker" {
  name = "sagemaker-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "sagemaker.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "sagemaker_full" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonSageMakerFullAccess"
  role       = aws_iam_role.sagemaker.name
}

resource "aws_s3_bucket" "data_lake" {
  bucket = "thaidemo-ml-data-lake-${data.aws_caller_identity.current.account_id}"
}
