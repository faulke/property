create table Jwt(
	id smallserial PRIMARY KEY,
	user_id text not null,
	jti text not null,
	created_date timestamp without time zone not null
)

/*	drop table Jwt  */