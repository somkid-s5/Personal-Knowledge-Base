# Terraform Variables

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "aws_profile" {
  description = "AWS CLI profile name"
  type        = string
  default     = "thaidemo-dev"
}

variable "bucket_name" {
  description = "Name of the S3 bucket for the website"
  type        = string
  validation {
    condition     = length(var.bucket_name) > 3
    error_message = "The bucket_name must be at least 3 characters long."
  }
}

variable "domain_name" {
  description = "The domain name for the website (e.g., thaidemo.co)"
  type        = string
}
