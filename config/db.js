import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
    host:  "localhost",
    user:  "root",
    password:  "1234",
    database:  "otp"
});

console.log("MySQL connected successfully");

export default db;
