import db from "../config/db.js";

async function getAll(req, res) {
   try {
      let [products] = await db.query("select * from products");

      if(products.length){
        
      }
      res.status(200).send({ data: products });
   } catch (error) {
      res.status(500).send({ message: error.message });
   }
}
