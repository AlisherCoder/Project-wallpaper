import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/brands.controller.js";
import upload from "../middlewares/multer.js";

const brandRoute = Router();

brandRoute.get("/", getAll);
brandRoute.get("/:id", getOne);
brandRoute.post("/", upload.single("image"), create);
brandRoute.delete("/:id", remove);
brandRoute.patch("/:id", upload.single("image"), update);

export default brandRoute;
