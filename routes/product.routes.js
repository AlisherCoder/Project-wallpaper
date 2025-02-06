import { Router } from "express";
import {
   create,
   getAll,
   getOne,
   remove,
   sail,
   update,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";

let productRoute = Router();

productRoute.get("/", getAll);
productRoute.post("/", upload.single("image"), create);
productRoute.get("/:id", getOne);
productRoute.delete("/:id", remove);
productRoute.patch("/:id", upload.single("image"), update);
productRoute.post("/sail/:id", sail);

export default productRoute;
