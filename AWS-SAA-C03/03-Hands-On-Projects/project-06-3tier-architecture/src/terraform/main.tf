# Root Main Configuration for Project 06

terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

module "networking" {
  source = "./modules/networking"
}

module "security_groups" {
  source = "./modules/security_groups"
  vpc_id = module.networking.vpc_id
}

module "rds" {
  source          = "./modules/rds"
  private_subnets = module.networking.private_subnets
  db_sg_id        = module.security_groups.db_sg_id
}

module "ecs" {
  source          = "./modules/ecs"
  vpc_id          = module.networking.vpc_id
  public_subnets  = module.networking.public_subnets
  private_subnets = module.networking.private_subnets # Fargate in private subnet
  alb_sg_id       = module.security_groups.alb_sg_id
  app_sg_id       = module.security_groups.app_sg_id
}
