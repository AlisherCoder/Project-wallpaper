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
        const [brands] = await db.query("SELECT * FROM brands");
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const [brand] = await db.query("SELECT * FROM brands WHERE id = ?", [id]);

        if (brand.length === 0) {
            return res.status(404).send({ message: "Brand not found" });
        }

        res.status(200).json(brand[0]);
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
                "INSERT INTO brands (name_uz, name_ru, image) VALUES (?, ?, ?)",
                [name_uz, name_ru, image]
            );

            res.status(201).json({ message: "Brand created successfully", brandId: result.insertId });
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

            const [brand] = await db.query("SELECT * FROM brands WHERE id = ?", [id]);

            if (brand.length === 0) {
                return res.status(404).send({ message: "Brand not found" });
            }

            const newImage = image || brand[0].image;

            await db.query(
                "UPDATE brands SET name_uz = ?, name_ru = ?, image = ? WHERE id = ?",
                [name_uz, name_ru, newImage, id]
            );

            res.status(200).json({ message: "Brand updated successfully" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
}

export async function remove(req, res) {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM brands WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Brand not found" });
        }

        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
