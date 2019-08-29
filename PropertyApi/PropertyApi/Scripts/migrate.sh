#!/bin/bash

export PG_CONN_STRING="User ID=${PGUSER};Password=${PGPASS};Host=${PGHOST};Port=5432;Database=${PGDATABASE};Pooling=False"
dotnet ef database update

cd flyway-6.0.1
./flyway migrate -user=$PGUSER -password=$PGPASS -url="jdbc:postgresql://${PGHOST}:5432/${PGDATABASE}" -locations='filesystem:/opt/migrations'
