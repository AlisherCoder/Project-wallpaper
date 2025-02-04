import { PrdPatchValid, PrdPostValid } from "../validations/product-joi.js";
import db from "../config/db.js";
import path from "path";
import fs from "fs";

async function getAll(req, res) {
   try {
      let {
         page,
         take = 3,
         price,
         washable,
         brand,
         country,
         maxPrice,
         minPrice,
      } = req.query;

      if (price) {
         let [data] = await db.query(
            "select * from products where oldPrice = ?",
            [price]
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }

         return res.status(200).send({ data });
      }

      if (maxPrice && minPrice) {
         let [data] = await db.query(
            "select * from products where oldPrice >= ? and oldPrice <= ?",
            [minPrice, maxPrice]
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }

         return res.status(200).send({ data });
      }

      if (maxPrice) {
         let [data] = await db.query(
            "select * from products where oldPrice <= ?",
            [maxPrice]
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }

         return res.status(200).send({ data });
      }

      if (minPrice) {
         let [data] = await db.query(
            "select * from products where oldPrice >= ?",
            [minPrice]
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }

         return res.status(200).send({ data });
      }

      if (page) {
         let skip = (page - 1) * take;
         let [data] = await db.query(
            `select * from products limit ${take} offset ${skip}`
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (washable) {
         let [data] = await db.query(
            "select * from products where washable = true"
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (brand) {
         let [data] = await db.query(
            "select * from products where brandsId = ?",
            [brand]
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (country) {
         let [data] = await db.query(
            "select * from products where contryId = ?",
            [country]
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      let [data] = await db.query("select * from products");
      if (!data.length) {
         return res.status(200).send({ message: "Empty products" });
      }

      res.status(200).send({ data });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function getOne(req, res) {
   try {
      let { id } = req.params;
      let [data] = await db.query("select * from products where id = ?", [id]);

      if (!data.length) {
         return res.status(404).send({ message: "Not found data" });
      }

      res.status(200).send({ data: data[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function create(req, res) {
   try {
      let { error, value } = PrdPostValid.validate(req.body);
      if (error) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(422).send({ message: error.details[0].message });
      }

      let newPrd = {
         ...value,
         price: req.body.price || 0,
         image: req.file.filename,
      };

      let keys = Object.keys(newPrd);
      let values = Object.values(newPrd);
      let query = keys.map((k) => "?");

      let [created] = await db.query(
         `insert into products (${keys.join(",")})values(${query.join(",")})`,
         values
      );

      let [found] = await db.query("select * from products where id = ?", [
         created.insertId,
      ]);

      res.status(200).send({ data: found[0] });
   } catch (error) {
      try {
         fs.unlinkSync(req.file.path);
      } catch (error) {}
      res.status(500).send({ message: error.message });
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;

      let [data] = await db.query("select * from products where id = ?", [id]);
      if (!data.length) {
         return res.status(404).send({ message: "Not found data" });
      }

      await db.query("delete from products where id = ?", [id]);
      try {
         let filepath = path.join("uploads", data[0].image);
         fs.unlinkSync(filepath);
      } catch (error) {}

      res.status(200).send({ message: "Deleted", data: data[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function update(req, res) {
   try {
      let { error, value } = PrdPatchValid.validate(req.body);
      if (error) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(422).send({ message: error.details[0].message });
      }

      let { id } = req.params;
      let [data] = await db.query("select * from products where id = ?", [id]);

      if (!data.length) {
         try {
            fs.unlinkSync(req.file.path);
         } catch (error) {}
         return res.status(404).send({ message: "Not found data" });
      }

      let newPrd = {
         ...req.value,
      };

      if (req.file) {
         newPrd.image = req.file.filename;
         try {
            let filepath = path.join("uploads", data[0].image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }

      let keys = Object.keys(newPrd);
      let values = Object.values(newPrd);
      let queryKey = keys.map((key) => (key += "=?"));

      await db.query(`update products set ${queryKey.join(",")} where id = ?`, [
         ...values,
         id,
      ]);

      let [updated] = await db.query("select * from products where id = ?", [
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

async function sail(req, res) {
   try {
      let { id } = req.params;
      let { discount } = req.body;

      let [product] = await db.query("select * from products where id = ?", id);
      if (!product.length) {
         return res.status(404).send({ message: "Not found data" });
      }
      let { oldPrice } = product[0];
      let sail = oldPrice - (oldPrice * discount) / 100;
     
      if (sail <= 0) {
         return res.status(400).send({
            message: "The discounted price must not exceed the base price",
         });
      }

      await db.query("update products set price = ? where id = ?", [sail, id]);
      let [updated] = await db.query("select * from products where id = ?", [
         id,
      ]);

      res.status(200).send({ data: updated[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export { getAll, getOne, create, remove, update, sail };
