import { Router } from "express";
import {
   create,
   getAll,
   getOne,
   remove,
   update,
} from "../controllers/order.controller.js";

let orderRoute = Router();

orderRoute.get("/", getAll);
orderRoute.post("/", create);
orderRoute.get("/:id", getOne);
orderRoute.delete("/:id", remove);
orderRoute.patch("/:id", update);

export default orderRoute;
