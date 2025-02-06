import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/categoryItem.controller.js";

import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";


const categoryItemRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Category Items
 *   description: API endpoints for managing category items
 */

/**
 * @swagger
 * /category-items:
 *   get:
 *     summary: Get all category items
 *     tags: [Category Items]
 *     responses:
 *       200:
 *         description: A list of category items
 *       500:
 *         description: Internal server error
 */

categoryItemRoute.get("/", getAll);

/**
 * @swagger
 * /category-items/{id}:
 *   get:
 *     summary: Get a single category item by ID
 *     tags: [Category Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category item
 *     responses:
 *       200:
 *         description: Category item data
 *       404:
 *         description: Category item not found
 *       500:
 *         description: Internal server error
 */
categoryItemRoute.get("/:id", getOne);

/**
 * @swagger
 * /category-items:
 *   post:
 *     summary: Create a new category item
 *     tags: [Category Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryID:
 *                 type: integer
 *               productID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Category item created successfully
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
categoryItemRoute.post("/", authentication, authorization(["admin"]), create);


/**
 * @swagger
 * /category-items/{id}:
 *   patch:
 *     summary: Update a category item
 *     tags: [Category Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryID:
 *                 type: integer
 *               productID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Category item updated successfully
 *       404:
 *         description: Category item not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

categoryItemRoute.patch("/:id", authentication, authorization(["admin"]), update);

/**
 * @swagger
 * /category-items/{id}:
 *   delete:
 *     summary: Delete a category item
 *     tags: [Category Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category item
 *     responses:
 *       200:
 *         description: Category item deleted successfully
 *       404:
 *         description: Category item not found
 *       500:
 *         description: Internal server error
 */

categoryItemRoute.delete("/:id", authentication, authorization(["admin"]), remove);

export default categoryItemRoute;
