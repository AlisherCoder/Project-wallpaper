import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { CatPatchValid, CatPostValid } from "../validations/category.joi.js";

export async function getAll(req, res) {
   try {
      let { name_ru, name_uz } = req.query;

      if (name_uz) {
         let [data] = await db.query(
            "select * from categories where name_uz = ?",
            [name_uz]
         );
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (name_ru) {
         let [data] = await db.query(
            "select * from categories where name_ru = ?",
            [name_ru]
         );
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      let [data] = await db.query("SELECT * FROM categories");
      if (!data.length) {
         return res.status(404).send({ message: "Not found data" });
      }

      res.status(200).send({ data });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function getOne(req, res) {
   try {
      const { id } = req.params;
      const [data] = await db.query("SELECT * FROM categories WHERE id = ?", [
         id,
      ]);

      if (data.length === 0) {
         return res.status(404).send({ message: "Not found data" });
      }

      res.status(200).send({ data: data[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function create(req, res) {
   try {
      let { error } = CatPostValid.validate(req.body);
      if (error) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(422).send({ message: error.details[0].message });
      }
      let { name_uz, name_ru } = req.body;

      let [result] = await db.query(
         "INSERT INTO categories (name_uz, name_ru, image) VALUES (?, ?, ?)",
         [name_uz, name_ru, req.file.filename]
      );

      let [found] = await db.query("select * from categories where id = ?", [
         result.insertId,
      ]);

      res.status(201).send({ data: found[0] });
   } catch (error) {
      try {
         fs.unlinkSync(req.file.path);
      } catch (error) {}
      res.status(500).send({ message: error.message });
   }
}

export async function update(req, res) {
   try {
      const { id } = req.params;
      let { error } = CatPatchValid.validate(req.body);
      if (error) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(422).send({ message: error.details[0].message });
      }

      let [data] = await db.query("select * from categories where id = ?", [
         id,
      ]);
      if (!data.length) {
         return res.status(404).send({ message: "Not found data" });
      }

      let keys = Object.keys(req.body);
      let values = Object.values(req.body);

      if (req.file) {
         keys.push("image");
         values.push(req.file.filename);
         try {
            let filepath = path.join("uploads", data[0].image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }

      let queryKey = keys.map((key) => (key += "= ?"));
      await db.query(
         `update categories set ${queryKey.join(",")} where id = ?`,
         [...values, id]
      );

      let [updated] = await db.query("select * from categories where id = ?", [
         id,
      ]);

      res.status(200).send({ data: updated[0] });
   } catch (error) {
      try {
         fs.unlinkSync(req.file.path);
      } catch (error) {}
      res.status(500).send({ message: error.message });
   }
}

export async function remove(req, res) {
   try {
      let { id } = req.params;

      let [data] = await db.query("select * from categories where id = ?", [
         id,
      ]);
      if (data.length === 0) {
         return res.status(404).send({ message: "Not found data" });
      }

      await db.query("DELETE FROM categories WHERE id = ?", [id]);
      try {
         let filepath = path.join("uploads", data[0].image);
         fs.unlinkSync(filepath);
      } catch (error) {}

      res.status(200).send({ message: "Deleted successfully" });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}
