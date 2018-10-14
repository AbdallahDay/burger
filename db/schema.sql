CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    burger_name VARCHAR(255),
    devoured BOOLEAN
);