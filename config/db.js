import mysql from "mysql2/promise";

let db = await mysql.createConnection({
   host: "51.44.160.108",
   user: "root",
   password: "12345",
   database: "wallpaperstore",
});
console.log("MySQL Connection successfully!");
export default db;
