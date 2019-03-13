CREATE USER acciom_user@localhost IDENTIFIED BY 'acciom_password';
GRANT ALL PRIVILEGES ON *.* TO 'acciom_user'@'localhost';
CREATE DATABASE acciom_db;
CREATE DATABASE source_db;
CREATE DATABASE dest_db;
FLUSH PRIVILEGES;