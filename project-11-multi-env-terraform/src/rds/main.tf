variable "vpc_id" { type = string }
variable "db_subnets" { type = list(string) }
variable "instance_class" { type = string }

resource "aws_db_instance" "main" {
  allocated_storage    = 10
  engine               = "postgres"
  instance_class       = var.instance_class
  username             = "admin"
  password             = "password" # IRL use Secrets Manager
  skip_final_snapshot  = true
}
