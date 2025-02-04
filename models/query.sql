-- Active: 1737614280833@@127.0.0.1@3306@oboy_project
CREATE DATABASE OBOY_PROJECT;

CREATE TABLE country(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255)
);

CREATE TABLE brands(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
    image VARCHAR(255)
);


CREATE TABLE product(
    id int AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
    price int,
    old_price int,
    description_uz TEXT,
    description_ru TEXT,
    washable INT,
    size VARCHAR(255),
    available INT,
    brands_id INT,
    contry_id INT,
    FOREIGN KEY (brands_id) REFERENCES brands(id),
    FOREIGN KEY (contry_id) REFERENCES country(id)
);

CREATE TABLE category(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE categoryItem(
    id INT AUTO_INCREMENT PRIMARY key,
    category_id INT,
    product_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);


CREATE Table user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_price VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE orderItem(
    id int AUTO_INCREMENT PRIMARY KEY,
    total INT,
    count INT,
    product_id INT,
    orders_id INT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (orders_id) REFERENCES orders(id)
);

