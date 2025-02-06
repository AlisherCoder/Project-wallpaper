import { Router } from "express"
import Login from "../controllers/login.controller.js"

let loginRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
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
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged In successfully!"
 *                 data:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwic3RhdHVzXyI6ImFjdGl2ZSJ9.abc123xyz"
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Invalid credentials or account not activated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


loginRoute.post("/", Login);

export default loginRoute;
