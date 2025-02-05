import db from "../config/db.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage }).single("image");

export async function getAll(req, res) {
    try {
        const [categories] = await db.query("SELECT * FROM categories");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const [category] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);

        if (category.length === 0) {
            return res.status(404).send({ message: "Category not found" });
        }

        res.status(200).json(category[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function create(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        try {
            const { name_uz, name_ru } = req.body;
            const image = req.file ? req.file.filename : null;

            if (!name_uz || !name_ru || !image) {
                return res.status(400).send({ message: "All fields are required" });
            }

            const [result] = await db.query(
                "INSERT INTO categories (name_uz, name_ru, image) VALUES (?, ?, ?)",
                [name_uz, name_ru, image]
            );

            res.status(201).json({ message: "Category created successfully", categoryId: result.insertId });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
}

export async function update(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        try {
            const { id } = req.params;
            const { name_uz, name_ru } = req.body;
            const image = req.file ? req.file.filename : null;

            const [category] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);

            if (category.length === 0) {
                return res.status(404).send({ message: "Category not found" });
            }

            const newImage = image || category[0].image;

            await db.query(
                "UPDATE categories SET name_uz = ?, name_ru = ?, image = ? WHERE id = ?",
                [name_uz, name_ru, newImage, id]
            );

            res.status(200).json({ message: "Category updated successfully" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
}

export async function remove(req, res) {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
