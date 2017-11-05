## creates everything needed for public subnet

variable "vpc_id" {}
variable "cidrs" { type = "list" }
variable "azs" { type = "list" }
variable "name" { default = "public" }
variable "gateway_id" {}

resource "aws_subnet" "public" {
  vpc_id                  = "${var.vpc_id}"
  cidr_block              = "${element(var.cidrs, count.index)}"
  availability_zone       = "${element(var.azs, count.index)}"
  count                   = "${length(var.cidrs)}"
  map_public_ip_on_launch = true

  tags {
    Name = "tf-${var.name}-${element(var.azs, count.index)}-public"
  }

  lifecycle { create_before_destroy = true }
}

resource "aws_route_table" "public" {
  vpc_id = "${var.vpc_id}"
  count  = "${length(var.cidrs)}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${var.gateway_id}"
  }

  tags { Name = "tf-${var.name}.${element(var.azs, count.index)}" }
}

resource "aws_route_table_association" "public" {
  count          = "${length(var.cidrs)}"
  subnet_id      = "${element(aws_subnet.public.*.id, count.index)}"
  route_table_id = "${element(aws_route_table.public.*.id, count.index)}"
}

output "subnet_ids" { value = ["${aws_subnet.public.*.id}"] }
