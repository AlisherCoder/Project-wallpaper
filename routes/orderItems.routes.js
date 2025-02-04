import { Router } from "express";
import {
   create,
   getAll,
   getOne,
   remove,
   update,
} from "../controllers/orderItems.controller.js";

let orderItemRoute = Router();

orderItemRoute.get("/", getAll);
orderItemRoute.post("/", create);
orderItemRoute.get("/:id", getOne);
orderItemRoute.delete("/:id", remove);
orderItemRoute.patch("/:id", update);

export default orderItemRoute;
