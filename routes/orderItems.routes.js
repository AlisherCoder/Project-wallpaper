import { Router } from "express";
import {
   create,
   getAll,
   getOne,
   remove,
   update,
} from "../controllers/orderItems.controller.js";

import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";

let orderItemRoute = Router();

/**
 * @swagger
 * tags:
 *   - name: Order Items
 *     description: API for managing order items
 */

/**
 * @swagger
 * /orderItems:
 *   get:
 *     summary: Get all order items
 *     tags: [Order Items]
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: integer
 *         description: Filter by order ID
 *       - in: query
 *         name: productId
 *         schema:
 *           type: integer
 *         description: Filter by product ID
 *       - in: query
 *         name: quantity
 *         schema:
 *           type: integer
 *         description: Filter by quantity
 *       - in: query
 *         name: totalSum
 *         schema:
 *           type: number
 *         description: Filter by total sum
 *     responses:
 *       200:
 *         description: A list of order items
 *       404:
 *         description: No data found
 */

orderItemRoute.get("/", getAll);

/**
 * @swagger
 * /orderItems/{id}:
 *   get:
 *     summary: Get a single order item by ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Order item found
 *       404:
 *         description: Order item not found
 */
orderItemRoute.get("/:id", getOne);

/**
 * @swagger
 * /orderItems:
 *   post:
 *     summary: Create a new order item
 *     tags: [Order Items]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - quantity
 *               - totalSum
 *             properties:
 *               orderId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               totalSum:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order item created
 *       422:
 *         description: Validation error
 */
orderItemRoute.post("/", authentication, authorization(["admin"]), create);

/**
 * @swagger
 * /orderItems/{id}:
 *   patch:
 *     summary: Update an order item
 *     tags: [Order Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               totalSum:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order item updated
 *       422:
 *         description: Validation error
 */
orderItemRoute.patch("/:id", authentication, authorization(["admin"]), update);

/**
 * @swagger
 * /orderItems/{id}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [Order Items]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Order item deleted
 *       404:
 *         description: Order item not found
 */

orderItemRoute.delete("/:id", authentication, authorization(["admin"]), remove);

export default orderItemRoute;
