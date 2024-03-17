variable "vpc_cidr_block" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.10.0.0/16"
}

variable "private_subnet_cidr_blocks" {
  description = "List of CIDR blocks for the private subnets."
  type        = list(string)
}

variable "public_subnet_cidr_blocks" {
  description = "List of CIDR blocks for the public subnets."
  type        = list(string)
}
