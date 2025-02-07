import mysql from "mysql2/promise";

let db = await mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "12345",
   database: "wallpaperstore",
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
});
console.log("MySQL Connection successfully!");
export default db;
