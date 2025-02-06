import db from "../config/db.js";
import { getAllCatItem, getOneCatItem } from "../queries/cat-item-query.js";
import {
   CatItemPatchValid,
   CatItemPostValid,
} from "../validations/categoryItem.joi.js";

export async function getAll(req, res) {
   try {
      const [data] = await db.query(getAllCatItem);

      if (!data.length) {
         return res.status(200).send({ message: "Empty category Items" });
      }

      res.status(200).json({ data: data });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function getOne(req, res) {
   try {
      const { id } = req.params;
      const [categoryItem] = await db.query(getOneCatItem, [id]);

      if (categoryItem.length === 0) {
         return res.status(404).send({ message: "Category item not found" });
      }

      res.status(200).send({ data: categoryItem[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function create(req, res) {
   try {
      const { categoryID, productID } = req.body;

      let { error } = CatItemPostValid.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      const [result] = await db.query(
         "INSERT INTO categoryItems (categoryID, productID) VALUES (?, ?)",
         [categoryID, productID]
      );

      let [created] = await db.query(
         "select * from categoryItems where id = ?",
         result.insertId
      );

      res.status(201).send({ data: created[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function update(req, res) {
   try {
      let { error } = CatItemPatchValid.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      const { id } = req.params;
      const [data] = await db.query(
         "SELECT * FROM categoryItems WHERE id = ?",
         [id]
      );

      if (data.length == 0) {
         return res.status(404).send({ message: "Not found data" });
      }

      let keys = Object.keys(req.body);
      let values = Object.values(req.body);
      let queryKey = keys.map((key) => (key += "= ?"));
      await db.query(
         `update categoryItems set ${queryKey.join(",")} where id = ?`,
         [...values, id]
      );

      let [updated] = await db.query(
         "select * from categoryItems where id = ?",
         [id]
      );

      res.status(200).send({ data: updated[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export async function remove(req, res) {
   try {
      const { id } = req.params;
      const [result] = await db.query(
         "DELETE FROM categoryItems WHERE id = ?",
         [id]
      );

      if (result.affectedRows === 0) {
         return res.status(404).send({ message: "Not found data" });
      }

      res.status(200).send({ message: "Category item deleted successfully" });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}
