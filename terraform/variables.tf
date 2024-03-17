variable "vpc_cidr_block" {}
variable "project_id" {
  description = "The project ID."
  type        = string
}

variable "region" {
  description = "The region for the resources."
  type        = string
}

variable "private_subnet_cidr_blocks" {
  description = "List of CIDR blocks for the private subnets."
  type        = list(string)
}

variable "public_subnet_cidr_blocks" {
  description = "List of CIDR blocks for the public subnets."
  type        = list(string)
}

