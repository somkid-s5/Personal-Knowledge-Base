variable "private_subnets" {
  type = list(string)
}

variable "db_sg_id" {}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

resource "aws_db_subnet_group" "main" {
  name       = "thaidemo-db-subnet-group"
  subnet_ids = var.private_subnets

  tags = {
    Name = "thaidemo-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  allocated_storage      = 20
  db_name                = "thaidemo"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.micro"
  username               = "admin"
  password               = var.db_password # Use AWS Secrets Manager in production
  parameter_group_name   = "default.postgres15"
  skip_final_snapshot    = true
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [var.db_sg_id]
  multi_az               = true # Essential for production-grade HA

  tags = {
    Name = "thaidemo-db"
  }
}

output "db_endpoint" {
  value = aws_db_instance.main.endpoint
}
