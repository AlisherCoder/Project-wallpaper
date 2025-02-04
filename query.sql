
show tables;

DESC categories;

INSERT INTO countries(name_uz, name_ru) VALUES
("country1 uz", "country1 ru"),
("country2 uz", "country2 ru");

INSERT INTO users (firstName, lastName, password, phoneNumber, email, address, role, status)
VALUES("Alisher", "Sharipov", "12345", "1234567890", "alisher@gmail.com", "tashkent", "user", "active");

SELECT * FROM users;

SELECT * from products where `oldPrice` > 13000 && `oldPrice`  <= 2000;