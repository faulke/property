variable vpc_cidr {}
variable vpc_name {}
variable public_cidrs { type = "list" }
variable private_cidrs { type = "list" }
variable subnet_azs { type = "list" }

## create vpc
resource "aws_vpc" "vpc" {
  cidr_block = "${var.vpc_cidr}"

  tags { Name = "${var.vpc_name}" }
}

## internet gateway for public subnets
resource "aws_internet_gateway" "public" {
  vpc_id = "${aws_vpc.vpc.id}"

  tags { Name = "tf-${var.vpc_name}-gateway" }
}

## public subnets for web server(s)
module "public_subnet" {
  source = "./public_subnet"
  vpc_id = "${aws_vpc.vpc.id}"
  cidrs  = "${var.public_cidrs}"
  azs    = "${var.subnet_azs}"
  gateway_id = "${aws_internet_gateway.public.id}"
}

## private subnet for RDS
module "private_subnet" {
  source = "./private_subnet"
  vpc_id = "${aws_vpc.vpc.id}"
  cidrs  = "${var.private_cidrs}"
  azs    = "${var.subnet_azs}"
}

output "vpc_id" { value = "${aws_vpc.vpc.id}" }
output "vpc_default_sg" { value = "${aws_vpc.vpc.default_security_group_id}"}
output "public_subnet_ids"  { value = "${module.public_subnet.subnet_ids}" }
output "private_subnet_ids"  { value = "${module.private_subnet.subnet_ids}" }
