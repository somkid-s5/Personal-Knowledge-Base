include "root" {
  path = find_in_parent_folders()
}

terraform {
  # Replace with actual module source
  source = "../../../../../project-06-3tier-architecture/src/terraform/modules/networking"
}

inputs = {
  vpc_cidr = "10.1.0.0/16"
  env      = "dev"
}
