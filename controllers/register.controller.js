import db from "../config/db.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { totp } from "otplib"
import axios from "axios"
import { userValidation, validatePhoneNumber, validateEmail } from "../validations/users.validation.js"

dotenv.config()
const OTPSECRET = process.env.OTPSECRET

totp.options = { step: 300 };

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


async function Register(req, res) {
    try {
        let { phoneNumber, password, email } = req.body;

        let checkPN = validatePhoneNumber(phoneNumber)
        if(!checkPN) {
            return res.status(400).json({message:"Phone Number format is incorrect!"})
        }

        let checkEmail = validateEmail(email)
        if (!checkEmail) {
            return res.status(400).json({message:"Email format is incorrect!"})
        }

        let { error, value } = userValidation.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const [existingUser] = await db.query("SELECT * FROM users WHERE phoneNumber = ?", [phoneNumber]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "This Phone Number have already been taken!" })
        }

        let hashedPassword = bcrypt.hashSync(password, 7)

        value.password = hashedPassword

        let query = `INSERT INTO users(`
        let mark = `(`
        const Values = []

        Object.entries(value).forEach(([key, value]) => {
            query += `${key},`
            mark += `?,`
            Values.push(value)
        });

        query = query.slice(0, -1)
        mark = mark.slice(0, -1)
        query += `) VALUES ${mark})`

        let result = await db.query(query, Values);

        if (result[0].affectedRows > 0) {
            let id = result[0].insertId
            let [created] = await db.query("SELECT * FROM users WHERE id=?", [id])

            try {
                let { firstName, phoneNumber } = created[0]
                let otp = totp.generate(`${OTPSECRET}${phoneNumber}`)
                // await otpSender(phoneNumber, otp)
                res.status(200).json({message: `${firstName}, You registered successfully! An OTP sent to your Mobile Phone Number!`, otp})
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
        else{
            return res.status(400).json({ message: "Error While Registration." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default Register
