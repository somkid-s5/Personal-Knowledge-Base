include "root" {
  path = find_in_parent_folders()
}

terraform {
  source = "../../src//rds"
}

dependency "networking" {
  config_path = "../networking"
}

inputs = {
  vpc_id        = dependency.networking.outputs.vpc_id
  db_subnets    = dependency.networking.outputs.db_subnets
  instance_class = "db.t3.micro"
}
