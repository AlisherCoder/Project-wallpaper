import { OrderPatchValid, OrderPostValid } from "../validations/order-joi.js";
import db from "../config/db.js";
import {
   getAllOrder,
   getByUserId,
   getOneOrder,
} from "../queries/order-query.js";

async function getAll(req, res) {
   try {
      let { userId } = req.query;

      if (userId) {
         let [data] = await db.query(getByUserId);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      let [data] = await db.query(getAllOrder);
      if (!data.length) {
         return res.status(200).send({ message: "Empty orders" });
      }

      res.status(200).send({ data });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function getOne(req, res) {
   try {
      let { id } = req.params;
      let [data] = await db.query(getOneOrder, [id]);

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
      let { error } = OrderPostValid.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      let { totalPrice, userId } = req.body;

      let [created] = await db.query(
         "insert into orders (totalPrice, userId) values(?,?)",
         [totalPrice, userId]
      );

      let [found] = await db.query("select * from orders where id = ?", [
         created.insertId,
      ]);

      res.status(201).send({ data: found[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;
      let [deleted] = await db.query("delete from orders where id = ?", [id]);

      if (!deleted.affectedRows) {
         return res.status(404).send({ message: "Not found data" });
      }

      res.status(200).send({ message: "Deleted" });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function update(req, res) {
   try {
      let { id } = req.params;

      let { error } = OrderPatchValid.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      let keys = Object.keys(req.body);
      let values = Object.values(req.body);
      let queryKey = keys.map((key) => (key += "= ?"));

      await db.query(`update orders set ${queryKey.join(",")} where id = ?`, [
         ...values,
         id,
      ]);

      let [updated] = await db.query("select * from orders where id = ?", [id]);

      res.status(200).send({ data: updated[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export { getAll, getOne, create, remove, update };
