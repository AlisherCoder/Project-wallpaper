import mysql from "mysql2/promise";

let db = await mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "953901313",
   database: "wallpaperstore",
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
});
console.log("MySQL Connection successfully!");
export default db;
