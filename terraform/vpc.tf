module "myapp-vpc" {
  source  = "terraform-google-modules/network/google"
  version = "~> 3.0"

  project_id   = var.project_id
  network_name = "myapp-vpc"
  routing_mode = "REGIONAL"

  subnets = [
    {
      subnet_name   = "private-subnet-01"
      subnet_ip     = var.private_subnet_cidr_blocks[0]
      subnet_region = var.region
    },
    {
      subnet_name   = "private-subnet-02"
      subnet_ip     = var.private_subnet_cidr_blocks[1]
      subnet_region = var.region
    },
    {
      subnet_name   = "private-subnet-03"
      subnet_ip     = var.private_subnet_cidr_blocks[2]
      subnet_region = var.region
    },
    {
      subnet_name   = "public-subnet-01"
      subnet_ip     = var.public_subnet_cidr_blocks[0]
      subnet_region = var.region
    },
    {
      subnet_name   = "public-subnet-02"
      subnet_ip     = var.public_subnet_cidr_blocks[1]
      subnet_region = var.region
    },
    {
      subnet_name   = "public-subnet-03"
      subnet_ip     = var.public_subnet_cidr_blocks[2]
      subnet_region = var.region
    }
  ]

  secondary_ranges = {
    private-subnet-01 = []
    private-subnet-02 = []
    private-subnet-03 = []
    public-subnet-01  = []
    public-subnet-02  = []
    public-subnet-03  = []
  }
}
