const getAllCatItem = `SELECT ci.*, 
        JSON_OBJECT(
            "id", c.id, 
            "name_uz", c.name_uz, 
            "name_ru", c.name_ru
        ) AS categoryInfo,
        JSON_OBJECT(
            "id", p.id, 
            "name_uz", p.name_uz, 
            "name_ru", p.name_ru, 
            "brandId", p.brandsID, 
            "countryId", p.contryID, 
            "price", p.price, 
            "oldPrice", p.oldPrice, 
            "inStock", p.inStock, 
            "description_uz", p.description_uz, 
            "description_ru", p.description_ru, 
            "washable", p.washable, 
            "size", p.size, 
            "image", p.image
        ) AS productInfo
FROM categoryItems ci
JOIN categories c ON ci.categoryID = c.id
JOIN products p ON ci.productID = p.id`;

const getOneCatItem = `SELECT ci.*, 
        JSON_OBJECT(
            "id", c.id, 
            "name_uz", c.name_uz, 
            "name_ru", c.name_ru
        ) AS categoryInfo,
        JSON_OBJECT(
            "id", p.id, 
            "name_uz", p.name_uz, 
            "name_ru", p.name_ru, 
            "brandId", p.brandsID, 
            "countryId", p.contryID, 
            "price", p.price, 
            "oldPrice", p.oldPrice, 
            "inStock", p.inStock, 
            "description_uz", p.description_uz, 
            "description_ru", p.description_ru, 
            "washable", p.washable, 
            "size", p.size, 
            "image", p.image
        ) AS productInfo
FROM categoryItems ci
JOIN categories c ON ci.categoryID = c.id
JOIN products p ON ci.productID = p.id
WHERE ci.id = ?`;

export { getAllCatItem, getOneCatItem };
