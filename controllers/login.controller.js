import db from "../config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const JWTSECRET = process.env.JWTSECRET


async function Login(req, res) {
    try {
        const { phoneNumber, password } = req.body;
        
        const [user] = await db.query("SELECT * FROM users WHERE phoneNumber = ?", [phoneNumber]);
        
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found!" });
        }
        
        if (user[0].status !== "active") {
            return res.status(401).json({ message: "Your Account is not activated. Please verify your phone Number." });
        }
        
        const checkpwd = bcrypt.compareSync(password, user[0].password);
        
        if (!checkpwd) {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        
        let token = jwt.sign({ id: user[0].id, role: user[0].role, status_: user[0].status }, JWTSECRET);
        
        res.status(200).json({ message: "Logged In successfully!", data: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default Login
