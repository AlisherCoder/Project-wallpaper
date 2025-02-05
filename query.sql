

DESC products;

SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'user', o.userId) AS orderInfo,
    JSON_OBJECT('id', p.id, 
                'name_uz', p.name_uz, 
                'name_ru', p.name_ru,
                'price', p.price,
                'oldPrice', p.oldPrice,
                'description_uz', p.description_uz,
                'description_ru', p.description_ru,
                'washable', p.washable,
                'size', p.size,
                'inStock', p.inStock,
                'brandsID', p.brandsID,
                'contryID', p.contryID,
                'image', p.image) AS productInfo
FROM orderItems AS oi
JOIN orders AS o ON o.id = oi.orderId
JOIN products as p ON p.id = oi.productId;

-- id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     name_uz VARCHAR(255) NOT NULL,
--     name_ru VARCHAR(255) NOT NULL,
--     price FLOAT,
--     oldPrice FLOAT,
--     description_uz TEXT,
--     description_ru TEXT,
--     washable BOOLEAN,
--     size VARCHAR(255),
--     inStock BOOLEAN,
--     brandsID INT,
--     contryID INT,
--     image VARCHAR(255),


SELECT u.*,
    JSON_ARRAYAGG(
        JSON_OBJECT ('id', o.id, 'user', o.userId, 'totalPrice', o.totalPrice)
    ) orders
FROM users AS u
JOIN orders AS o ON u.id = o.userId
GROUP BY u.id