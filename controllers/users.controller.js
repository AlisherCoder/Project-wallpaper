import db from "../config/db.js"
import { userPatchValid } from "../validations/users.validation.js"
import { getByname, getAll, getOne, getBynumber, getBysurname } from "../queries/user-queries.js"


async function findAll(req, res) {
    try {
        let { firstname, lastname, phonenumber, page, take = 4 } = req.query
        

        if (page) {
            let skip = (page - 1) * take;
            let [data] = await db.query(`SELECT 
            u.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', o.id, 
                    'user', o.userId, 
                    'totalPrice', o.totalPrice
                )
            ) AS orders,

            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', oi.id, 
                    'order', oi.orderId, 
                    'product', oi.productID, 
                    'quantity', oi.quantity, 
                    'totalSum', oi.totalSum,
                    'productDetails', JSON_OBJECT(
                        'name', p.name_uz,
                        'category', c.name_uz,
                        'brand', b.name_uz
                    )
                )
            ) AS orderItems

        FROM 
        users u
            LEFT JOIN orders o ON u.id = o.userId
            LEFT JOIN orderItems oi ON o.id = oi.orderId
            LEFT JOIN products p ON oi.productId = p.id
            LEFT JOIN categoryItems ci ON p.id = ci.productID
            LEFT JOIN categories c ON ci.categoryID = c.id
            LEFT JOIN brands b ON p.brandsID = b.id
            GROUP BY u.id
            LIMIT ${take} OFFSET ${skip}`);
   
            if (!data.length) {
               return res.status(404).json({ message: "That is all the users!" });
            }
            return res.status(200).json({ data });
         }

        if (firstname) {
            firstname = `%${firstname}%`
            let [ result, schema ] = await db.query(getByname, [firstname])

            if (result.length === 0) {
                return res.status(404).json({ message: "User NOT Found!" })
            }
            return res.status(200).json({ message:"User found:", data: result })
        }

        if (lastname) {
            lastname = `%${lastname}%`
            let [ result, schema ] = await db.query(getBysurname, [lastname])

            if (result.length === 0) {
                return res.status(404).json({ message: "User NOT Found!" })
            }
            return res.status(200).json({ message:"User found:", data: result })
        }

        if (phonenumber) {
            phonenumber = `%${phonenumber}%`
            let [ result, schema ] = await db.query(getBynumber, [phonenumber])

            if (result.length === 0) {
                return res.status(404).json({ message: "User NOT Found!" })
            }
            return res.status(200).json({ message:"User found:", data: result })
        }

        let [ result, schema ] = await db.query(getAll)

        if (result.length === 0) {
            return res.status(404).json({ message: "Users NOT Found!" })
        }
        res.status(200).json({ message: "All the Users", data: result })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function findOne(req, res) {
    try {
        let { id } = req.params
        let [ result, schema ] = await db.query(getOne, [id])

        if (result.length === 0) {
            return res.status(404).json({ message: "User NOT Found!" })
        }
        res.status(200).json({ message:"User found:", data: result })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function update(req, res) {
    try {
        let id = req.params.id
        let [tobeupdated] = await db.query("SELECT * FROM users WHERE id = ?", [id])

        if (tobeupdated.length === 0) {
            return res.status(404).json({message:"The user with the given ID does not exist!"})
        }

        let { error, value } = userPatchValid.validate(req.body)
        if (error) {
            res.status(400).json(error.details[0].message)
            return
        }

        let newdata = value
        
        if (Object.keys(newdata).length === 0) {
            return res.status(400).json("Please provide data to update!")
        } 

        let sql = `UPDATE users SET`
        const newValues = []

        Object.entries(newdata).forEach(([key, value]) => {
            sql += ` ${key}=?,`
            newValues.push(value)
        })

        sql = sql.slice(0, -1)
        sql += ' WHERE id=?'
        newValues.push(id)

        let result = await db.query(sql, newValues)

        if (result[0].affectedRows > 0){
            return res.status(200).json({ message:"User Updated!" })
        }
        else{
            return res.status(404).json({ message: "User not found!" });
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


async function remove(req, res) {
    try {
        let id = req.params.id
        
        let [tobeDeleted] = await db.query(`SELECT * FROM users WHERE id=?`, [id])
        
        if (tobeDeleted.length === 0) {
            return res.status(404).json({message:"The user with the given ID does not exist!"})
        }

        let result = await db.query(`DELETE FROM users WHERE id=?`, [id])
        
        if (result[0].affectedRows > 0) {
            res.status(200).json({ message:"User Deleted!" })
        }
        else{
            return res.status(404).json({ message: "User not found!" });
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export { findAll, findOne, update, remove }
