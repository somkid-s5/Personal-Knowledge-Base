variable "aws_region" {
  type        = string
  description = "AWS Region"
  default     = "ap-southeast-1"
}

variable "repo_name" {
  type        = string
  description = "ECR Repository name"
  default     = "secure-app"
}

variable "environment" {
  type        = string
  description = "Environment name"
  default     = "production"
}
