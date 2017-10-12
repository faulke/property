create table Property(
	id smallserial PRIMARY KEY,
	address varchar(50) not null,
	city varchar(50) not null,
	state char(2) not null,
	zipcode int not null,
	landlord_id int not null,
	rent money,
	bedrooms int,
	bathrooms int,
	sq_feet int,
	pets boolean default false::boolean
)



/*	drop table Property  */
	
