# Terraform Configuration for 3-Tier Architecture (Flat / Learning Version)
# NOTE: This is a self-contained single-file example for learning purposes.
# For the production-ready modular version, use src/terraform/ instead.

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  default = "ap-southeast-1"
}

variable "db_password" {
  description = "Database master password — set via TF_VAR_db_password"
  type        = string
  sensitive   = true
}

# --- Dynamic AMI lookup (Amazon Linux 2023, always latest) ---
data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_availability_zones" "available" {}

# --- VPC & Networking ---
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "project-06-vpc" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

# Public Subnet AZ-1
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true
  tags = { Name = "project-06-public-a" }
}

# Public Subnet AZ-2 (required by ALB)
resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = data.aws_availability_zones.available.names[1]
  map_public_ip_on_launch = true
  tags = { Name = "project-06-public-b" }
}

# Private App Subnet AZ-1
resource "aws_subnet" "private_app_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]
  tags = { Name = "project-06-private-app-a" }
}

# Private App Subnet AZ-2
resource "aws_subnet" "private_app_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]
  tags = { Name = "project-06-private-app-b" }
}

# Private DB Subnet AZ-1
resource "aws_subnet" "private_db_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]
  tags = { Name = "project-06-private-db-a" }
}

# Private DB Subnet AZ-2 (required for RDS Multi-AZ)
resource "aws_subnet" "private_db_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.21.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]
  tags = { Name = "project-06-private-db-b" }
}

resource "aws_eip" "nat" { domain = "vpc" }

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_a.id
  depends_on    = [aws_internet_gateway.igw]
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private_app_a" {
  subnet_id      = aws_subnet.private_app_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_app_b" {
  subnet_id      = aws_subnet.private_app_b.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_db_a" {
  subnet_id      = aws_subnet.private_db_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_db_b" {
  subnet_id      = aws_subnet.private_db_b.id
  route_table_id = aws_route_table.private.id
}

# --- Security Groups ---
resource "aws_security_group" "alb_sg" {
  name        = "project-06-alb-sg"
  vpc_id      = aws_vpc.main.id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "app_sg" {
  name        = "project-06-app-sg"
  vpc_id      = aws_vpc.main.id
  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db_sg" {
  name        = "project-06-db-sg"
  vpc_id      = aws_vpc.main.id
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app_sg.id]
  }
}

# --- Database ---
resource "aws_db_subnet_group" "main" {
  name       = "project-06-db-subnet-group"
  subnet_ids = [aws_subnet.private_db_a.id, aws_subnet.private_db_b.id]
}

resource "aws_db_instance" "main" {
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = "db.t3.micro"
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  username               = "admin"
  password               = var.db_password
  skip_final_snapshot    = true
  multi_az               = true
}

# --- Compute ---
resource "aws_launch_template" "app" {
  name_prefix   = "project-06-app-"
  image_id      = data.aws_ami.amazon_linux_2023.id # Dynamic AMI lookup
  instance_type = "t3.micro"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = base64encode(<<-EOF
              #!/bin/bash
              dnf install -y nginx
              systemctl enable nginx
              systemctl start nginx
              echo "<h1>Hello from Project 06 — 3-Tier Architecture</h1>" > /usr/share/nginx/html/index.html
              EOF
  )
}

resource "aws_lb_target_group" "app" {
  name     = "project-06-app-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    interval            = 30
  }
}

resource "aws_autoscaling_group" "app" {
  desired_capacity    = 2
  max_size            = 4
  min_size            = 1
  vpc_zone_identifier = [aws_subnet.private_app_a.id, aws_subnet.private_app_b.id]
  target_group_arns   = [aws_lb_target_group.app.arn]

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "project-06-app"
    propagate_at_launch = true
  }
}

resource "aws_lb" "main" {
  name               = "project-06-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id] # 2 AZs required
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

output "alb_dns_name" {
  description = "Open this URL in your browser after terraform apply"
  value       = "http://${aws_lb.main.dns_name}"
}
