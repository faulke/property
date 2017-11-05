## creates everything needed for private subnet

variable "vpc_id" {}
variable "cidrs" { type = "list" }
variable "azs" { type = "list" }
variable "name" { default = "public" }

resource "aws_subnet" "private" {
  vpc_id                  = "${var.vpc_id}"
  cidr_block              = "${element(var.cidrs, count.index)}"
  availability_zone       = "${element(var.azs, count.index)}"
  count                   = "${length(var.cidrs)}"
  map_public_ip_on_launch = true

  tags {
    Name = "tf-${var.name}-${element(var.azs, count.index)}-private"
  }

  lifecycle { create_before_destroy = true }
}

output "subnet_ids" { value = ["${aws_subnet.private.*.id}"] }
