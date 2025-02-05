import {
   OrderItemPatchValid,
   OrderItemPostValid,
} from "../validations/order-joi.js";
import db from "../config/db.js";
import {
   getAllOrderItems,
   getByOrderId,
   getByProductId,
   getByTotalSum,
   getOneOrderItems,
} from "../queries/orderItems-query.js";

async function getAll(req, res) {
   try {
      let { orderId, productId, quantity, totalSum } = req.query;

      if (orderId) {
         let [data] = await db.query(getByOrderId, [orderId]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (productId) {
         let [data] = await db.query(getByProductId, [productId]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (quantity) {
         let [data] = await db.query(getByQuantity, [quantity]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      if (totalSum) {
         let [data] = await db.query(getByTotalSum, [totalSum]);
         if (!data.length) {
            return res.status(404).send({ message: "Not found data" });
         }
         return res.status(200).send({ data });
      }

      let [data] = await db.query(getAllOrderItems);
      if (!data.length) {
         return res.status(200).send({ message: "Empty orderItems" });
      }

      res.status(200).send({ data });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function getOne(req, res) {
   try {
      let { id } = req.params;
      let [data] = await db.query(getOneOrderItems, [id]);

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
      let { error } = OrderItemPostValid.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      let { orderId, productId, quantity, totalSum } = req.body;

      let [created] = await db.query(
         "insert into orderItems (orderId, productId, quantity, totalSum) values(?,?,?,?)",
         [orderId, productId, quantity, totalSum]
      );

      let [found] = await db.query("select * from orderItems where id = ?", [
         created.insertId,
      ]);

      res.status(200).send({ data: found[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;
      let [deleted] = await db.query("delete from orderItems where id = ?", [
         id,
      ]);

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

      let { error } = OrderItemPatchValid.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      let keys = Object.keys(req.body);
      let values = Object.values(req.body);
      let queryKey = keys.map((key) => (key += "= ?"));

      await db.query(
         `update orderItems set ${queryKey.join(",")} where id = ?`,
         [...values, id]
      );

      let [updated] = await db.query("select * from orderItems where id = ?", [
         id,
      ]);

      res.status(200).send({ data: updated[0] });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}

export { getAll, getOne, create, remove, update };
