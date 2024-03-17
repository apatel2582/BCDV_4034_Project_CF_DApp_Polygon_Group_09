terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.74.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 3.90"
    }
  }

  required_version = ">= 0.14"

  backend "gcs" {
    bucket = "4034bucket"
    prefix = "terraform/state"
  }
}
