import { PrdPatchValid, PrdPostValid } from "../validations/product-joi.js";
import db from "../config/db.js";
import path from "path";
import fs from "fs";
import {
   getAllPrd,
   getOnePrd,
   getByPrice,
   getByMaxPriceAndMinPrice,
   getByMaxPrice,
   getByMinPrice,
   getByWashable,
   getByBrand,
   getByCountry,
   getByNameUz,
   getByNameRu,
} from "../queries/prd-query.js";

async function getAll(req, res) {
   try {
      let {
         page,
         take = 3,
         price,
         washable,
         brandId,
         countryId,
         maxPrice,
         minPrice,
         name_uz,
         name_ru,
      } = req.query;

      if (price) {
         let [data] = await db.query(getByPrice, [price]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (name_uz) {
         name_uz = `%${name_uz}%`;
         let [data] = await db.query(getByNameUz, [name_uz]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (name_ru) {
         name_ru = `%${name_ru}%`;
         let [data] = await db.query(getByNameRu, [name_ru]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (maxPrice && minPrice) {
         let [data] = await db.query(getByMaxPriceAndMinPrice, [
            minPrice,
            maxPrice,
         ]);

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (maxPrice) {
         let [data] = await db.query(getByMaxPrice, [maxPrice]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (minPrice) {
         let [data] = await db.query(getByMinPrice, [minPrice]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (page) {
         let skip = (page - 1) * take;
         let [data] = await db.query(
            `SELECT p.*,
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
            GROUP BY p.id
            LIMIT ${take} OFFSET ${skip}`
         );

         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (washable) {
         let [data] = await db.query(getByWashable, [washable]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (brandId) {
         let [data] = await db.query(getByBrand, [brandId]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (countryId) {
         let [data] = await db.query(getByCountry, [countryId]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      let [data] = await db.query(getAllPrd);
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
      let [data] = await db.query(getOnePrd, [id]);

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
      console.log(req.body)
      console.log("-------------------------")
      console.log(value)
      let { categoriesId, ...data } = value;
      categoriesId = JSON.parse(categoriesId);

      let newPrd = {
         ...data,
         price: req.body.price || 0,
         image: req.file.filename,
      };

      let keys = Object.keys(newPrd);
      let values = Object.values(newPrd);
      let query = keys.map((k) => " ?");

      let [created] = await db.query(
         `insert into products (${keys.join(",")})values(${query.join(",")})`,
         values
      );

      if (!categoriesId.length) {
         return res
            .status(400)
            .send({ message: "categoriesId cannot be empty." });
      }

      for (let categoryId of categoriesId) {
         try {
            await db.query(
               "insert into categoryItems (productId, categoryId) values (?,?)",
               [created.insertId, categoryId]
            );
         } catch (error) {
            return res.status(500).send({ message: error.message });
         }
      }

      let [found] = await db.query("select * from products where id = ?", [
         created.insertId,
      ]);

      res.status(201).send({ data: found[0] });
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
         ...value,
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

      if (typeof discount != "number") {
         return res.status(422).send({ message: "Discount must be number" });
      }

      let [product] = await db.query("select * from products where id = ?", id);
      if (!product.length) {
         return res.status(404).send({ message: "Not found data" });
      }
      let { price } = product[0];
      let sail = price - (price * discount) / 100;

      if (sail <= 0) {
         return res.status(400).send({
            message: "The discounted price must not exceed the base price",
         });
      }

      await db.query("update products set discountPrice = ? where id = ?", [
         sail,
         id,
      ]);
      let [updated] = await db.query("select * from products where id = ?", [
         id,
      ]);

      res.status(200).send({ data: updated[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export { getAll, getOne, create, remove, update, sail };
