import { Router } from "express"
import { reqReset } from "../controllers/resetpwd.controller.js"

let reqresetRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Password Reset operations
 */

/**
 * @swagger
 * /request-reset:
 *   post:
 *     summary: Request for password reset by sending an OTP to the phone number
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
 *     responses:
 *       200:
 *         description: OTP sent successfully to the phone number for password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "John, An OTP sent to your Mobile Phone Number. Please confirm it!"
 *       400:
 *         description: Invalid phone number format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Phone Number format is incorrect!"
 *       404:
 *         description: User with the phone number not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Your Phone number is not registered. Please register first!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
reqresetRoute.post("/", reqReset);

export default reqresetRoute;

