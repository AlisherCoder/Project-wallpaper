import mysql from "mysql2/promise";

const db = await mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "953901313",
   database: "OBOY_PROJECT",
});

export default db;
