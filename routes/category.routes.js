import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/category.controller.js";
import upload from "../middlewares/multer.js";

import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";

const categoryRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: name_uz
 *         schema:
 *           type: string
 *         description: Filter categories by Uzbek name
 *       - in: query
 *         name: name_ru
 *         schema:
 *           type: string
 *         description: Filter categories by Russian name
 *     responses:
 *       200:
 *         description: List of categories
 *       404:
 *         description: No categories found
 *       500:
 *         description: Server error
 */
categoryRoute.get("/", getAll);


/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category data
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
categoryRoute.get("/:id", getOne);


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *               name_ru:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

categoryRoute.post("/", authentication, authorization(["admin"]), upload.single("image"), upload.single("image"), create);


/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

categoryRoute.delete("/:id", authentication, authorization(["admin"]), upload.single("image"), remove);


/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *               name_ru:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

categoryRoute.patch("/:id", authentication, authorization(["admin"]), upload.single("image"), upload.single("image"), update);

export default categoryRoute;
