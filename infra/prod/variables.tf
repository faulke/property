variable "access_key" {}
variable "secret_key" {}
variable "aws_region" {}

# prod vpc cidr
variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

# prod vpc name
variable "vpc_name" {
  default = "property_prod_vpc"
}

# public subnet cidr blocks
variable "public_cidrs" {
  default = ["10.0.0.0/24", "10.0.1.0/24"]
}

# private subnet cidr blocks
variable "private_cidrs" {
  default = ["10.0.20.0/24", "10.0.21.0/24"]
}

# availability zones for all subnets
variable "subnet_azs" {
  default = ["us-west-2a", "us-west-2b"]
}

variable "ami_id" {
  default = "ami-e689729e"
}

variable "key_name" {
  default = "property-key"
}

