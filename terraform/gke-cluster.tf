module "gke" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  version = "~> 15.0"

  project_id     = var.project_id
  name           = "myapp-gke-cluster"
  region         = "northamerica-northeast2"  # Use region without specifying a zone
  network        = module.myapp-vpc.network_name
  subnetwork     = module.myapp-vpc.subnets_names[0]

  node_pools = [
    {
      name               = "default-node-pool"
      machine_type       = "e2-medium"
      min_count          = 1
      max_count          = 3
      auto_repair        = true
      auto_upgrade       = true
      initial_node_count = 2
    }
  ]
}
