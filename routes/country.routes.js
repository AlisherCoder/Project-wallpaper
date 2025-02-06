import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/country.controller.js";

import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";

const countryRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: API for managing countries
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     parameters:
 *       - in: query
 *         name: name_uz
 *         schema:
 *           type: string
 *         description: Filter by Uzbek name
 *       - in: query
 *         name: name_ru
 *         schema:
 *           type: string
 *         description: Filter by Russian name
 *     responses:
 *       200:
 *         description: List of all countries
 *       404:
 *         description: No data found
 *       500:
 *         description: Server error
 */
countryRoute.get("/", getAll);

/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     summary: Get a single country by ID
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The country ID
 *     responses:
 *       200:
 *         description: Country data
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
countryRoute.get("/:id", getOne);

/**
 * @swagger
 * /countries:
 *   post:
 *     summary: Create a new country
 *     tags: [Countries]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_uz
 *               - name_ru
 *             properties:
 *               name_uz:
 *                 type: string
 *               name_ru:
 *                 type: string
 *     responses:
 *       201:
 *         description: Country created successfully
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
countryRoute.post("/", authentication, authorization(["admin"]), create);

/**
 * @swagger
 * /countries/{id}:
 *   patch:
 *     summary: Update a country
 *     tags: [Countries]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The country ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *               name_ru:
 *                 type: string
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       404:
 *         description: Country not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
countryRoute.patch("/:id", authentication, authorization(["admin"]), update);


/**
 * @swagger
 * /countries/{id}:
 *   delete:
 *     summary: Delete a country
 *     tags: [Countries]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The country ID
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */

countryRoute.delete("/:id", authentication, authorization(["admin"]), remove);

export default countryRoute;
