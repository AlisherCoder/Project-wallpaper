import db from "../config/db.js";
import fs from "fs";
import path from "path";
import { BrandPatchValid, BrandPostValid } from "../validations/brands.joi.js";

export async function getAll(req, res) {
   try {
      let { name_uz, name_ru } = req.query;

      if (name_uz) {
         name_uz = `%${name_uz}%`;
         let [data] = await db.query(
            "select * from brands where name_uz LIKE ?",
            [name_uz]
         );
         if (!data.length) {
            return res.status(200).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (name_ru) {
         name_ru = `%${name_ru}%`;
         let [data] = await db.query(
            "select * from brands where name_ru LIKE ?",
            [name_ru]
         );
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      let [data] = await db.query("SELECT * FROM brands");
      if (!data.length) {
         return res.status(200).send({ message: "Empty data" });
      }

      res.status(200).send({ data });
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

      res.status(200).send({ data: brand[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function create(req, res) {
   try {
      let { error } = BrandPostValid.validate(req.body);
      if (error) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(422).send({ message: error.details[0].message });
      }
      let { name_uz, name_ru } = req.body;

      let [result] = await db.query(
         "INSERT INTO brands (name_uz, name_ru, image) VALUES (?, ?, ?)",
         [name_uz, name_ru, req.file.filename]
      );

      let [found] = await db.query("select * from brands where id = ?", [
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
      let { error } = BrandPatchValid.validate(req.body);
      if (error) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(422).send({ message: error.details[0].message });
      }

      let [brand] = await db.query("select * from brands where id = ?", [id]);
      if (!brand.length) {
         return res.status(404).send({ message: "Not found data" });
      }

      let keys = Object.keys(req.body);
      let values = Object.values(req.body);

      if (req.file) {
         keys.push("image");
         values.push(req.file.filename);
         try {
            let filepath = path.join("uploads", brand[0].image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }

      let queryKey = keys.map((key) => (key += "= ?"));
      await db.query(`update brands set ${queryKey.join(",")} where id = ?`, [
         ...values,
         id,
      ]);

      let [updated] = await db.query("select * from brands where id = ?", [id]);

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
      let [brand] = await db.query("select * from brands where id = ?", [id]);
      
      if (brand.length === 0) {
         return res.status(404).send({ message: "Brand not found" });
      }

      await db.query("DELETE FROM brands WHERE id = ?", [id]);
      try {
         let filepath = path.join("uploads", brand[0].image);
         fs.unlinkSync(filepath);
      } catch (error) {}

      res.status(200).send({ message: "Brand deleted successfully" });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}
