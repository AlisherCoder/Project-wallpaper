import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/category.controller.js";
import upload from "../middlewares/multer.js";

const categoryRoute = Router();

categoryRoute.get("/", getAll);
categoryRoute.post("/", upload.single("image"), create);
categoryRoute.get("/:id", getOne);
categoryRoute.delete("/:id", remove);
categoryRoute.patch("/:id", upload.single("image"), update);

export default categoryRoute;
