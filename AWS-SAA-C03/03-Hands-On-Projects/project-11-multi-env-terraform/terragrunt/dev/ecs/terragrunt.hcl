include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../../src//ecs"
}

dependency "networking" {
  config_path = "../networking"
}

inputs = {
  vpc_id          = dependency.networking.outputs.vpc_id
  private_subnets = dependency.networking.outputs.private_subnets
  instance_type   = "t3.micro"
  desired_count   = 1
}
