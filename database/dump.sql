CREATE DATABASE IF NOT EXISTS nodedb;
USE nodedb;
CREATE TABLE IF NOT EXISTS people (id int not null AUTO_INCREMENT, name varchar(255), PRIMARY KEY (id));
COMMIT;