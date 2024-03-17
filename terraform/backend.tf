terraform {
  backend "gcs" {
    bucket  = "bucket-xyz01"
    prefix  = "gke/terraform.tfstate"
  }
}
