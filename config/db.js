import mysql from "mysql2/promise"

let db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yusuf777$",
    database: "wallpaperstore"
})

export default db
