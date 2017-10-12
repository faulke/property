create table Jwt(
	id smallserial PRIMARY KEY,
	userId text not null,
	jti text not null,
	createdDate timestamp without time zone not null,
  isRevoked boolean default false::boolean
)

/*	drop table Jwt  */