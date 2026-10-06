terraform {
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

resource "aws_ecr_repository" "secure_app" {
  name                 = var.repo_name
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
  }

  tags = {
    Environment = var.environment
    Compliance  = "SOC2"
  }
}

resource "aws_ecr_lifecycle_policy" "secure_app_policy" {
  repository = aws_ecr_repository.secure_app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 15 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 15
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_s3_bucket" "sbom_bucket" {
  bucket = "${var.repo_name}-sbom-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name        = "SBOM Storage"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "sbom_versioning" {
  bucket = aws_s3_bucket.sbom_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "sbom_encryption" {
  bucket = aws_s3_bucket.sbom_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

data "aws_caller_identity" "current" {}
