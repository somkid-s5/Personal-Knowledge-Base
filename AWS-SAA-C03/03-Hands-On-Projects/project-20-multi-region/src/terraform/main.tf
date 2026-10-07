# Aurora Global Cluster
resource "aws_rds_global_cluster" "thaipay" {
  global_cluster_identifier = "thaipay-global-db"
  engine                    = "aurora-postgresql"
  engine_version            = "15.4"
  database_name             = "thaipay"
  storage_encrypted         = true
}

# Primary Cluster (Singapore)
resource "aws_rds_cluster" "primary" {
  provider                    = aws.primary
  cluster_identifier          = "thaipay-primary"
  global_cluster_identifier   = aws_rds_global_cluster.thaipay.id
  engine                      = aws_rds_global_cluster.thaipay.engine
  engine_version              = aws_rds_global_cluster.thaipay.engine_version
  database_name               = aws_rds_global_cluster.thaipay.database_name
  master_username             = "admin"
  manage_master_user_password = true
  skip_final_snapshot         = true
  db_subnet_group_name        = aws_db_subnet_group.primary.name
  vpc_security_group_ids      = [aws_security_group.db_primary.id]
}

resource "aws_rds_cluster_instance" "primary_instance" {
  provider           = aws.primary
  identifier         = "thaipay-primary-1"
  cluster_identifier = aws_rds_cluster.primary.id
  instance_class     = "db.t3.medium"
  engine             = aws_rds_cluster.primary.engine
  engine_version     = aws_rds_cluster.primary.engine_version
}

# Secondary Cluster (Sydney)
resource "aws_rds_cluster" "secondary" {
  provider                  = aws.secondary
  cluster_identifier        = "thaipay-secondary"
  global_cluster_identifier = aws_rds_global_cluster.thaipay.id
  engine                    = aws_rds_global_cluster.thaipay.engine
  engine_version            = aws_rds_global_cluster.thaipay.engine_version
  skip_final_snapshot       = true
  db_subnet_group_name      = aws_db_subnet_group.secondary.name
  vpc_security_group_ids    = [aws_security_group.db_secondary.id]

  # Enable Write Forwarding
  enable_global_write_forwarding = true

  depends_on = [
    aws_rds_cluster_instance.primary_instance
  ]
}

resource "aws_rds_cluster_instance" "secondary_instance" {
  provider           = aws.secondary
  identifier         = "thaipay-secondary-1"
  cluster_identifier = aws_rds_cluster.secondary.id
  instance_class     = "db.t3.medium"
  engine             = aws_rds_cluster.secondary.engine
  engine_version     = aws_rds_cluster.secondary.engine_version
}

# Network Setup (Primary SG)
resource "aws_vpc" "primary" {
  provider             = aws.primary
  cidr_block           = "10.1.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_subnet" "primary_a" {
  provider          = aws.primary
  vpc_id            = aws_vpc.primary.id
  cidr_block        = "10.1.1.0/24"
  availability_zone = "ap-southeast-1a"
}

resource "aws_subnet" "primary_b" {
  provider          = aws.primary
  vpc_id            = aws_vpc.primary.id
  cidr_block        = "10.1.2.0/24"
  availability_zone = "ap-southeast-1b"
}

resource "aws_db_subnet_group" "primary" {
  provider   = aws.primary
  name       = "primary-db-subnet-group"
  subnet_ids = [aws_subnet.primary_a.id, aws_subnet.primary_b.id]
}

resource "aws_security_group" "db_primary" {
  provider = aws.primary
  name     = "allow_postgres"
  vpc_id   = aws_vpc.primary.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.1.0.0/16"]
  }
}

# Network Setup (Secondary SYD)
resource "aws_vpc" "secondary" {
  provider             = aws.secondary
  cidr_block           = "10.2.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_subnet" "secondary_a" {
  provider          = aws.secondary
  vpc_id            = aws_vpc.secondary.id
  cidr_block        = "10.2.1.0/24"
  availability_zone = "ap-southeast-2a"
}

resource "aws_subnet" "secondary_b" {
  provider          = aws.secondary
  vpc_id            = aws_vpc.secondary.id
  cidr_block        = "10.2.2.0/24"
  availability_zone = "ap-southeast-2b"
}

resource "aws_db_subnet_group" "secondary" {
  provider   = aws.secondary
  name       = "secondary-db-subnet-group"
  subnet_ids = [aws_subnet.secondary_a.id, aws_subnet.secondary_b.id]
}

resource "aws_security_group" "db_secondary" {
  provider = aws.secondary
  name     = "allow_postgres_secondary"
  vpc_id   = aws_vpc.secondary.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.2.0.0/16"]
  }
}

# S3 Cross-Region Replication
resource "aws_s3_bucket" "primary_assets" {
  provider = aws.primary
  bucket   = "thaipay-assets-sg-unique-id"
}

resource "aws_s3_bucket_versioning" "primary_versioning" {
  provider = aws.primary
  bucket   = aws_s3_bucket.primary_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket" "secondary_assets" {
  provider = aws.secondary
  bucket   = "thaipay-assets-syd-unique-id"
}

resource "aws_s3_bucket_versioning" "secondary_versioning" {
  provider = aws.secondary
  bucket   = aws_s3_bucket.secondary_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_iam_role" "replication" {
  provider = aws.primary
  name     = "s3-replication-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "s3.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_s3_bucket_replication_configuration" "replication" {
  provider   = aws.primary
  depends_on = [aws_s3_bucket_versioning.primary_versioning]

  role   = aws_iam_role.replication.arn
  bucket = aws_s3_bucket.primary_assets.id

  rule {
    id     = "replicate-all"
    status = "Enabled"

    destination {
      bucket        = aws_s3_bucket.secondary_assets.arn
      storage_class = "STANDARD"
    }
  }
}
