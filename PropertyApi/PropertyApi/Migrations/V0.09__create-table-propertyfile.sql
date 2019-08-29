create table propertyfile(
	id smallserial PRIMARY KEY,
	propertyid int not null,
	filename text not null,
	fileindex int default 0,
	storagekey text not null,
	storagebucket text not null,
	createddate timestamp without time zone not null
)

/*	drop table propertyfile  */