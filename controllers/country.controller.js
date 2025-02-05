import db from "../config/db.js";

export async function getAll(req, res) {
    try {
        const [countries] = await db.query("SELECT * FROM countries");
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function getOne(req, res) {
    try {
        const { id } = req.params;
        const [country] = await db.query("SELECT * FROM countries WHERE id = ?", [id]);

        if (country.length === 0) {
            return res.status(404).send({ message: "Country not found" });
        }

        res.status(200).json(country[0]);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function create(req, res) {
    try {
        const { name_uz, name_ru } = req.body;

        if (!name_uz || !name_ru) {
            return res.status(400).send({ message: "Both name_uz and name_ru are required" });
        }

        const [result] = await db.query(
            "INSERT INTO countries (name_uz, name_ru) VALUES (?, ?)",
            [name_uz, name_ru]
        );

        res.status(201).json({ message: "Country created successfully", countryId: result.insertId });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const { name_uz, name_ru } = req.body;

        const [country] = await db.query("SELECT * FROM countries WHERE id = ?", [id]);

        if (country.length === 0) {
            return res.status(404).send({ message: "Country not found" });
        }

        await db.query(
            "UPDATE countries SET name_uz = ?, name_ru = ? WHERE id = ?",
            [name_uz, name_ru, id]
        );

        res.status(200).json({ message: "Country updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM countries WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Country not found" });
        }

        res.status(200).json({ message: "Country deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
