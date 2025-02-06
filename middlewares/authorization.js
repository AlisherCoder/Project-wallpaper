import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
let JWTSECRET = process.env.JWTSECRET

const authorization = (roles) => (req, res, next) => {
    let token = req.header("Authorization")
    
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not Authorized!" })
    }
    
    token = token.split(" ")[1]
    
    try {
        const data = jwt.verify(token, JWTSECRET)
        req.user = data
        
        if (roles.includes(data.role)) {
            next()
        } else {
            res.status(401).json({ message: "You Are Not Allowed!" })
        }
    } catch (error) {
        res.status(400).json({ message: "Something is wrong!", data: error.message })
    }
}

export default authorization



// import jwt from "jsonwebtoken"
// import dotenv from "dotenv"

// dotenv.config()
// let JWTSECRET = process.env.JWTSECRET

// const authorization = (roles) => (req, res, next) => {
//     let token = req.header("Authorization")
//     if(!token) {
//         res.status(401).json({message: "Not Authorized!"})
//         return
//     }
//     try {
//         const data = jwt.verify(token, JWTSECRET)
//         req.user = data
//         if (roles.includes(data.role)) {
//             next()
//         }else {
//         res.status(401).json({message: "You Are Not Allowed!"})
//         }
//     } catch (error) {
//         res.status(400).json({message: "Something is wrong!", data: error.message})
//     }
// }

// export default authorization

