import mysql from "mysql2/promise";

<<<<<<< HEAD
<<<<<<< HEAD
const db = mysql.createPool({
=======
let db = await mysql.createConnection({
>>>>>>> 7c35a70 (server)
   host: "51.44.160.108",
=======
const db = mysql.createPool({
   host: "localhost",
>>>>>>> a77d53f (update)
   user: "root",
   password: "12345",
   database: "wallpaperstore",
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
});
console.log("MySQL Connection successfully!");
export default db;
