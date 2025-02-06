const getAllOrderItems = `SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'userId', o.userId) AS orderInfo,
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
JOIN products as p ON p.id = oi.productId;`;

const getOneOrderItems = `SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'userId', o.userId) AS orderInfo,
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
JOIN products as p ON p.id = oi.productId
WHERE oi.id = ?;`;

const getByOrderId = `SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'userId', o.userId) AS orderInfo,
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
JOIN products as p ON p.id = oi.productId
WHERE oi.orderId = ?;`;

const getByProductId = `SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'userId', o.userId) AS orderInfo,
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
JOIN products as p ON p.id = oi.productId
WHERE oi.productId = ?;`;

const getByQuantity = `SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'userId', o.userId) AS orderInfo,
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
JOIN products as p ON p.id = oi.productId
WHERE oi.quantity = ?;`;

const getByTotalSum = `SELECT oi.*,
    JSON_OBJECT('id', o.id,
                'totalPrice', o.totalPrice, 
                'userId', o.userId) AS orderInfo,
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
JOIN products as p ON p.id = oi.productId
WHERE oi.totalSum = ?;`;

export {
   getAllOrderItems,
   getOneOrderItems,
   getByOrderId,
   getByProductId,
   getByQuantity,
   getByTotalSum,
};
