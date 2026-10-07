terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  alias  = "primary"
  region = "ap-southeast-1"
}

provider "aws" {
  alias  = "secondary"
  region = "ap-southeast-2"
}
