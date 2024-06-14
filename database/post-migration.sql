\connect miadok_db postgres;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO miadok_manager;

SELECT * FROM pg_user WHERE usename = 'miadok_manager';


--
-- SELECT * FROM "Products"