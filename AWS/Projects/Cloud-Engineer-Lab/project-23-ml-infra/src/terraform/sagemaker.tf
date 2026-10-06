resource "aws_sagemaker_domain" "main" {
  domain_name = "thaivision-ml-domain"
  auth_mode   = "IAM"
  vpc_id      = var.vpc_id
  subnet_ids  = var.private_subnets

  default_user_settings {
    execution_role = aws_iam_role.sagemaker_role.arn
    
    jupyter_server_app_settings {
      default_resource_spec {
        instance_type = "system"
      }
    }
  }
}
