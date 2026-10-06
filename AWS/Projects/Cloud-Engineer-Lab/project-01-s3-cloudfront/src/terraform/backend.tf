# Terraform Backend Configuration

terraform {
  backend "s3" {
    # Replace with the bucket created by setup.sh
    bucket         = "thaidemo-tfstate-REPLACE_ME"
    key            = "project-01/terraform.tfstate"
    region         = "ap-southeast-1"
    
    # Replace with the table created by setup.sh
    dynamodb_table = "thaidemo-tf-lock"
    encrypt        = true
  }
}
