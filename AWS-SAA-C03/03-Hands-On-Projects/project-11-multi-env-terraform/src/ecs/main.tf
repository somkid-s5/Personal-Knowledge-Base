variable "vpc_id" { type = string }
variable "private_subnets" { type = list(string) }
variable "instance_type" { type = string }
variable "desired_count" { type = number }

resource "aws_ecs_cluster" "main" {
  name = "cluster-main"
}

output "cluster_name" { value = aws_ecs_cluster.main.name }
