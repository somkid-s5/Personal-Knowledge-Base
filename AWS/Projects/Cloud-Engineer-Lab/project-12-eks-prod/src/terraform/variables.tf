variable "region" {
  type    = string
  default = "ap-southeast-1"
}

variable "cluster_name" {
  type    = string
  default = "prod-cluster"
}

variable "vpc_id" {
  type    = string
  description = "Existing VPC ID"
}

variable "private_subnets" {
  type    = list(string)
  description = "Existing Private Subnets"
}
