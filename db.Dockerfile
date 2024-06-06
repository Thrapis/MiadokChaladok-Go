# start with base image
FROM postgres:16-alpine

EXPOSE 5432

# import data into container
# All scripts in docker-entrypoint-initdb.d/ are automatically executed during container startup
COPY ./database/init.sql /docker-entrypoint-initdb.d/
COPY ./database/migration.sql /docker-entrypoint-initdb.d/
COPY ./database/post-migration.sql /docker-entrypoint-initdb.d/