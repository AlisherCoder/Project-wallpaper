import { Router } from "express";
import Register from "../controllers/register.controller.js";

let registerRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 example: "example@email.com"
 *               firstName:
 *                  type: string
 *                  example: "Alex"
 *               lastName: 
 *                  type: string
 *                  example: "Fergusson"
 *               address: 
 *                  type: string
 *                  example: "Tashkent"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "John, You registered successfully! An OTP sent to your Mobile Phone Number!"
 *                 otp:
 *                   type: string
 *                   example: "123456"
 *       400:
 *         description: Bad request due to incorrect input or missing fields
 *       409:
 *         description: Phone number already taken
 *       500:
 *         description: Internal server error
 */


registerRoute.post("/", Register);

export default registerRoute;
