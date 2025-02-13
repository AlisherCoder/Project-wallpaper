-- Active: 1737614280833@@127.0.0.1@3306@wallpaperstore
CREATE DATABASE wallpaperstore;

CREATE TABLE countries(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_uz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL
);

CREATE TABLE brands(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_uz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);


CREATE TABLE products(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_uz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL,
    price FLOAT,
    discountPrice FLOAT DEFAULT NULL,
    description_uz TEXT,
    description_ru TEXT,
    washable BOOLEAN,
    size VARCHAR(255),
    inStock BOOLEAN,
    brandsID INT,
    contryID INT,
    image VARCHAR(255),
    FOREIGN KEY (brandsID) REFERENCES brands(id),
    FOREIGN KEY (contryID) REFERENCES countries(id)
);

CREATE TABLE categories(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name_uz VARCHAR(255),
    name_ru VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE categoryitems(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    categoryID INT,
    productID INT,
    FOREIGN KEY (categoryID) REFERENCES categories(id),
    FOREIGN KEY (productID) REFERENCES products(id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    role ENUM("admin", "user") NOT NULL DEFAULT "user",
    status ENUM("active", "inactive") NOT NULL DEFAULT "inactive"
);

CREATE TABLE orders(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    totalPrice FLOAT,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE orderItems(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    orderId INT,
    productId INT,
    quantity INT,
    totalSum FLOAT,
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (orderId) REFERENCES orders(id)
);

