import db from "../config/db.js";

export async function getAll(req, res) {
    try {
        const [data] = await database.query(
            `SELECT 
            ci.*, 
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "id", c.id, 
                    "name_uz", c.name_uz, 
                    "name_ru", c.name_ru
                )
            ) AS categories,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "id", p.id, 
                    "name_uz", p.name_uz, 
                    "name_ru", p.name_ru, 
                    "brandId", p.brandsID, 
                    "country_id", p.contryID, 
                    "price", p.price, 
                    "oldPrice", p.oldPrice, 
                    "available", p.inStock, 
                    "description_uz", p.description_uz, 
                    "description_ru", p.description_ru, 
                    "washable", p.washable, 
                    "size", p.size, 
                    "image", p.image
                )
            ) AS products
        FROM categoryItems ci
        LEFT JOIN categories c ON ci.categoryID = c.id
        LEFT JOIN products p ON ci.productID = p.id
        GROUP BY ci.id;
        `);

        if (!data.length) {
            return res.status(200).send({ message: "Empty category Items" });
            
        }
        
        res.status(200).json({data: data});
    
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const [categoryItem] = await database.query(
            `SELECT 
    ci.*, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", c.id, 
            "name_uz", c.name_uz, 
            "name_ru", c.name_ru
        )
    ) AS categories,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            "id", p.id, 
            "name_uz", p.name_uz, 
            "name_ru", p.name_ru, 
            "brandId", p.brandsID, 
            "country_id", p.contryID, 
            "price", p.price, 
            "oldPrice", p.oldPrice, 
            "available", p.inStock, 
            "description_uz", p.description_uz, 
            "description_ru", p.description_ru, 
            "washable", p.washable, 
            "size", p.size, 
            "image", p.image
        )
    ) AS products
FROM categoryItems ci
LEFT JOIN categories c ON ci.categoryID = c.id
LEFT JOIN products p ON ci.productID = p.id
WHERE ci.id = ?
GROUP BY ci.id;
`);

        if (categoryItem.length === 0) {
            return res.status(404).send({ message: "Category item not found" });
        }

        res.status(200).json(categoryItem[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function create(req, res) {
    try {
        const { categoryID, productID } = req.body;

        if (!categoryID || !productID) {
            return res.status(400).send({ message: "Both categoryID and productID are required" });
        }

        const [result] = await db.query(
            "INSERT INTO category_items (categoryID, productID) VALUES (?, ?)",
            [categoryID, productID]
        );

        res.status(201).json({ message: "Category item created successfully", categoryItemId: result.insertId });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const { categoryID, productID } = req.body;

        const [categoryItem] = await db.query("SELECT * FROM categoryItems WHERE id = ?", [id]);

        if (categoryItem.length === 0) {
            return res.status(404).send({ message: "Category item not found" });
        }

        await db.query(
            "UPDATE category_items SET categoryID = ?, productID = ? WHERE id = ?",
            [categoryID, productID, id]
        );

        res.status(200).json({ message: "Category item updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM category_items WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Category item not found" });
        }

        res.status(200).json({ message: "Category item deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

