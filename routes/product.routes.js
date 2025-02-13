import { Router } from "express";
import {
   create,
   getAll,
   getOne,
   remove,
   sail,
   update,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";

import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";

let productRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 3)
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter products by exact price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter products with a price below this value
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter products with a price above this value
 *       - in: query
 *         name: washable
 *         schema:
 *           type: boolean
 *         description: Filter products by washable attribute
 *       - in: query
 *         name: brandId
 *         schema:
 *           type: integer
 *         description: Filter products by brand ID
 *       - in: query
 *         name: countryId
 *         schema:
 *           type: integer
 *         description: Filter products by country ID
 *       - in: query
 *         name: name_uz
 *         schema:
 *           type: string
 *         description: Filter products by name in Uzbek
 *       - in: query
 *         name: name_ru
 *         schema:
 *           type: string
 *         description: Filter products by name in Russian
 *     responses:
 *       200:
 *         description: A list of products
 *       404:
 *         description: No products found
 *       500:
 *         description: Server error
 */
productRoute.get("/", getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
productRoute.get("/:id", getOne);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name_uz
 *               - name_ru
 *               - price
 *               - description_uz
 *               - description_ru
 *               - size
 *               - washable
 *               - inStock
 *               - brandsID
 *               - countryID
 *               - image
 *               - categoriesId
 *             properties:
 *               name_uz:
 *                 type: string
 *                 example: "Product"
 *               name_ru:
 *                 type: string
 *                 example: "Продукт"
 *               price:
 *                 type: number
 *                 example: 19.99
 *               description_uz:
 *                 type: text
 *                 example: Product haqida
 *               description_ru:
 *                 type: text
 *                 example: Про продукт
 *               size:
 *                 type: string
 *                 example: 1.20
 *               washable:
 *                 type: boolean
 *               inStock:
 *                 type: boolean
 *               brandsID:
 *                 type: integer
 *                 example: 3
 *               countryID:
 *                 type: integer
 *                 example: 1
 *               categoriesId:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 5, 8]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name_uz:
 *                   type: string
 *                 name_ru:
 *                   type: string
 *                 price:
 *                   type: number
 *                 brandsID:
 *                   type: integer
 *                 contryID:
 *                   type: integer
 *                 categoriesId:
 *                   type: array
 *                   items:
 *                     type: integer
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

productRoute.post(
   "/",
   authentication,
   authorization(["admin"]),
   upload.single("image"),
   create
);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
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
 *               price:
 *                 type: number
 *               description_uz:
 *                 type: text
 *               description_ru:
 *                 type: text
 *               size:
 *                 type: string
 *               washable:
 *                 type: boolean
 *               inStock:
 *                 type: boolean
 *               brandsID:
 *                 type: integer
 *               contryID:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
productRoute.patch(
   "/:id",
   authentication,
   authorization(["admin"]),
   upload.single("image"),
   update
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

productRoute.delete("/:id", authentication, authorization(["admin"]), remove);

/**
 * @swagger
 * /products/sail/{id}:
 *   post:
 *     summary: Apply discount to a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *                 description: Discount percentage to apply
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *       400:
 *         description: Invalid discount value
 *       404:
 *         description: Product not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

productRoute.post("/sail/:id", authentication, authorization(["admin"]), sail);

export default productRoute;
