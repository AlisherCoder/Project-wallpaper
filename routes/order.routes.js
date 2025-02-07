import { Router } from "express";
import {
   create,
   getAll,
   getOne,
   remove,
} from "../controllers/order.controller.js";

import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";

let orderRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 *
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter orders by user ID
 *     responses:
 *       200:
 *         description: List of orders
 *       404:
 *         description: Not found data
 *       500:
 *         description: Server error
 */
orderRoute.get("/", getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Not found data
 *       500:
 *         description: Server error
 */

orderRoute.get("/:id", getOne);

/**
 * @swagger  
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [totalPrice, userId, products]
 *             properties:
 *               totalPrice:
 *                 type: number
 *                 example: 150.75
 *               userId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [productId, quantity, totalSum]
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "987f6543-d21b-45f8-a321-675123abc987"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     totalSum:
 *                       type: number
 *                       example: 75.50
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     totalPrice:
 *                       type: number
 *                     userId:
 *                       type: string
 *       400:
 *         description: Products cannot be empty
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
orderRoute.post("/", authentication, authorization(["admin"]), create);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Not found data
 *       500:
 *         description: Server error
 */
orderRoute.delete("/:id", authentication, authorization(["admin"]), remove);

export default orderRoute;
