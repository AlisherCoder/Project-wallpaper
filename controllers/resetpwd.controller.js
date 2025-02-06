import db from "../config/db.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { totp } from "otplib"
import axios from "axios"
import Joi from "joi"
import resetpwdValid from "../validations/reset.validation.js"

dotenv.config()
const OTPSECRET = process.env.OTPSECRET

const numberValid = Joi.object({
    phoneNumber: Joi.string().min(13).max(13).required()
})

const api = axios.create({
    baseURL: "https://notify.eskiz.uz/api",
    headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDExNTI5ODQsImlhdCI6MTczODU2MDk4NCwicm9sZSI6InRlc3QiLCJzaWduIjoiZjQyYTIzYjExODI2NWY4ZTZjNDBiODljMmI0MzU2NzY0NmIwMDdkMjMyODMxNTcyN2E0YTJiY2M5YTk1MTI0ZSIsInN1YiI6Ijk3MzIifQ.kf2z_4hYjPSnR9xmxfBZtmJxazAAT_Qok_3V5C0ZvXg"
    }
})

// async function otpSender(phoneNum, otp) {
//     try {
//         let req = await api.post("/message/sms/json", {
//             mobile_phone: phoneNum,
//             message: `This is test from Eskiz`,
//             from: 4546
//         })
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

async function reqReset(req, res) {
    try {
        let { phoneNumber } = req.body;

        let { error, value } = numberValid.validate({phoneNumber});
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const [existingUser] = await db.query("SELECT * FROM users WHERE phoneNumber = ?", [phoneNumber]);
        if (existingUser.length > 0) {
            let name = existingUser[0].firstName
            let otp = totp.generate(`${OTPSECRET}${phoneNumber}`)
            // await otpSender(phoneNumber, otp)
            return res.status(200).json({message: `${name}, An OTP sent to your Mobile Phone Number.Please confirm it!`, otp})
        }
        return res.status(404).json({ message: "Your Phone number is not registered.Please register first!" })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function resPassword(req, res) {
    try {
        let { phoneNumber, newPassword } = req.body;

        let { error, value } = resetpwdValid.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const [existingUser] = await db.query("SELECT * FROM users WHERE phoneNumber = ?", [phoneNumber]);

        if (existingUser.length === 0) {
            return res.status(404).json({ message: "Incorrect Phone Number!" });
        }

        let newhashedPwd = bcrypt.hashSync(newPassword, 7)
        let result = await db.query("UPDATE users SET password = ? WHERE phoneNumber = ?", [newhashedPwd, phoneNumber]);

        if (result[0].affectedRows > 0){
            return res.status(200).json({ message:"Your password Updated!" })
        }
        else{
            return res.status(404).json({ message: "Error while resetting password!" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { reqReset, resPassword }

