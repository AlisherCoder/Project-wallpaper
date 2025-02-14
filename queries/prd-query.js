const getAllPrd = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
GROUP BY p.id;`;

const getOnePrd = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
WHERE p.id = ?
GROUP BY p.id`;

const getByPrice = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
WHERE p.oldPrice = ?
GROUP BY p.id`;

const getByMaxPriceAndMinPrice = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where oldPrice >= ? and oldPrice <= ?
GROUP BY p.id`;

const getByMaxPrice = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where oldPrice <= ?
GROUP BY p.id`;

const getByMinPrice = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where oldPrice >= ?
GROUP BY p.id`;

const getByWashable = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where washable = ?
GROUP BY p.id`;

const getByBrand = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where brandsID = ?
GROUP BY p.id`;

const getByCountry = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where contryID = ?
GROUP BY p.id`;

const getByNameUz = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where p.name_uz LIKE ?
GROUP BY p.id`;

const getByNameRu = `SELECT p.*,
    JSON_OBJECT ('id', b.id, 'name_uz', b.name_uz, 'name_ru', b.name_ru, 'image', b.image)
    AS brand,
    JSON_OBJECT ('id', c.id, 'name_uz', c.name_uz, 'name_ru', c.name_ru)
    AS country,
    JSON_ARRAYAGG (
        JSON_OBJECT ('id', ct.id, 'name_ru', ct.name_ru, 'name_uz', ct.name_uz, 'image', ct.image)
    ) AS categories
FROM products AS p 
JOIN brands AS b ON p.brandsID = b.id
JOIN countries AS c ON p.contryID = c.id
JOIN categoryitems as cti ON cti.productID = p.id
JOIN categories as ct ON ct.id = cti.categoryID
where p.name_ru LIKE ?
GROUP BY p.id`;

export {
   getAllPrd,
   getOnePrd,
   getByPrice,
   getByMaxPriceAndMinPrice,
   getByMaxPrice,
   getByMinPrice,
   getByWashable,
   getByBrand,
   getByCountry,
   getByNameRu,
   getByNameUz,
};
