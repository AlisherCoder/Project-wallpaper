/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Operations related to brands
 */

import { Router } from "express";
import { getAll, getOne, create, update, remove } from "../controllers/brands.controller.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import upload from "../middlewares/multer.js";

let brandRoute = Router();

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get a list of all brands, with optional filtering by name
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name_uz
 *         required: false
 *         schema:
 *           type: string
 *           example: "Samsung"
 *         description: Filter brands by Uzbek name (optional)
 *       - in: query
 *         name: name_ru
 *         required: false
 *         schema:
 *           type: string
 *           example: "Самсунг"
 *         description: Filter brands by Russian name (optional)
 *     responses:
 *       200:
 *         description: A list of brands
 *       404:
 *         description: No brands found
 *       500:
 *         description: Internal server error
 */
brandRoute.get("/", authentication, authorization(["admin", "user"]), getAll);

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Get a specific brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Brand found
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */
brandRoute.get("/:id", authentication, authorization(["admin", "user"]), getOne);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *                 example: "Samsung"
 *               name_ru:
 *                 type: string
 *                 example: "Самсунг"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
brandRoute.post("/", authentication, authorization(["admin"]), upload.single("image"), create);

/**
 * @swagger
 * /brands/{id}:
 *   patch:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *                 example: "Samsung Updated"
 *               name_ru:
 *                 type: string
 *                 example: "Самсунг Обновлено"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
brandRoute.patch("/:id", authentication, authorization(["admin"]), upload.single("image"), update);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */
brandRoute.delete("/:id", authentication, authorization(["admin"]), remove);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT Authorization header using the Bearer scheme.
 */

export default brandRoute;





// import { Router } from "express";
// import {
//    getAll,
//    getOne,
//    create,
//    update,
//    remove,
// } from "../controllers/brands.controller.js";
// import upload from "../middlewares/multer.js";

// import authentication from "../middlewares/authentication.js";
// import authorization from "../middlewares/authorization.js";

// const brandRoute = Router();

// brandRoute.get("/", getAll);
// brandRoute.get("/:id", getOne);
// brandRoute.post("/", authentication, authorization(["admin"]), upload.single("image"), create);
// brandRoute.delete("/:id", authentication, authorization(["admin"]), remove);
// brandRoute.patch("/:id", authentication, authorization(["admin"]), upload.single("image"), update);

// export default brandRoute;
