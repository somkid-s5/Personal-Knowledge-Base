variable "vpc_cidr" { type = string }
variable "env" { type = string }

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  tags = {
    Name = "vpc-${var.env}"
    Environment = var.env
  }
}

output "vpc_id" { value = aws_vpc.main.id }
output "private_subnets" { value = ["subnet-123", "subnet-456"] }
output "db_subnets" { value = ["subnet-789", "subnet-012"] }
