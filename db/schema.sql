/* basic drop, create, use cycle to set up database */
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
/* create table for departments with id as primary key and name */
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(30),
    salary INT NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);