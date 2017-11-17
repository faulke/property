create table PropertyFile(
	id smallserial PRIMARY KEY,
	propertyId smallserial not null,
	fileName text not null,
	fileIndex smallserial not null,
	storageBucket text not null,
	storageKey text not null,
	createdDate timestamp without time zone not null
)

/*	drop table PropertyFile  */