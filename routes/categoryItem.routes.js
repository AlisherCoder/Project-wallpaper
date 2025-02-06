import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/categoryItem.controller.js";

const categoryItemRoute = Router();

categoryItemRoute.get("/", getAll);
categoryItemRoute.post("/", create);
categoryItemRoute.get("/:id", getOne);
categoryItemRoute.delete("/:id", remove);
categoryItemRoute.patch("/:id", update);

export default categoryItemRoute;
