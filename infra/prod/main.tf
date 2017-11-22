variable db_username {}
variable db_password {}

# s3 backend
terraform {
  backend "s3" {
    bucket = "property-infra"
    key    = "prod/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.aws_region}"
}

# vpc
module "property_vpc" {
  source        = "../modules/vpc"
  vpc_cidr      = "${var.vpc_cidr}"
  vpc_name      = "${var.vpc_name}"
  public_cidrs  = "${var.public_cidrs}"
  private_cidrs = "${var.private_cidrs}"
  subnet_azs    = "${var.subnet_azs}"
}

# s3 bucket

## public subnet
  # t2.micro Linux with .net core API 
resource "aws_security_group" "api_sg" {  
  name = "api_sg"

  description = "API server"
  vpc_id = "${module.property_vpc.vpc_id}"

  # Only postgres in
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "api" {
  ami           = "${var.ami_id}"
  subnet_id     = "${element(module.property_vpc.public_subnet_ids, 0)}"
  instance_type = "t2.micro"
  key_name      = "${var.key_name}"
  vpc_security_group_ids = [
    "${module.property_vpc.vpc_default_sg}",
    "${aws_security_group.api_sg.id}"
  ]
}

output "api_instance_address" { value = "${aws_eip.api_eip.public_ip}" }

resource "aws_eip" "api_eip" {
  instance = "${aws_instance.api.id}"
  vpc      = true
}

# private subnet
resource "aws_db_subnet_group" "property_db_subnets" {
  name       = "db_subnet_group"
  subnet_ids = ["${module.property_vpc.private_subnet_ids}"]

  tags { Name = "property-db-subnet"}
}

resource "aws_security_group" "property_db_sg" {  
  name = "property_db_sg"

  description = "RDS postgres server"
  vpc_id = "${module.property_vpc.vpc_id}"

  # Only postgres in
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "property_db" {
  allocated_storage      = 20
  engine                 = "postgres"
  instance_class         = "db.t2.micro"
  name                   = "property_db_instance"
  username               = "${var.db_username}"
  password               = "${var.db_password}"
  db_subnet_group_name   = "${aws_db_subnet_group.property_db_subnets.id}"
  vpc_security_group_ids = [
    "${module.property_vpc.vpc_default_sg}", 
    "${aws_security_group.property_db_sg.id}"
  ]
}

output "property_db_dns" { value = "${aws_db_instance.property_db.endpoint}"}
