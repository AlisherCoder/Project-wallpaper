import mysql from "mysql2/promise";

<<<<<<< HEAD
const db = mysql.createPool({
=======
let db = await mysql.createConnection({
>>>>>>> 7c35a70 (server)
   host: "51.44.160.108",
   user: "root",
   password: "12345",
   database: "wallpaperstore",
});
console.log("MySQL Connection successfully!");
export default db;
