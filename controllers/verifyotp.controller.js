import db from "../config/db.js"
import dotenv from "dotenv"
import { totp } from "otplib"

dotenv.config()
const OTPSECRET = process.env.OTPSECRET


async function verifyOtp(req, res) {
    try {
        let { phoneNumber, otp } = req.body
        
        let check = totp.check(otp, `${OTPSECRET}${phoneNumber}`)
        
        if (check) {
            const [existingUser] = await db.query("SELECT * FROM users WHERE phoneNumber = ?", [phoneNumber]);
            if (existingUser.length > 0) {
                let result = await db.query("UPDATE users SET status = 'active' WHERE phoneNumber = ?", [phoneNumber]);
                if (result[0].affectedRows > 0){
                    return res.status(200).json({message: "OTP verified successfully and Your account is Activated!"})
                }
                else{
                    return res.status(400).json({ message: "User not Updated!" });
                }
            }
        }else {
            res.status(400).json({message: "OTP NOT Verified!"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default verifyOtp
