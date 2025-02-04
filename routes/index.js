import { Router } from "express";
import productRoute from "./product.routes.js";
import orderRoute from "./order.routes.js";
import orderItemRoute from "./orderItems.routes.js";

let mainRoute = Router();

mainRoute.use("/products", productRoute);
mainRoute.use("/orders", orderRoute);
mainRoute.use("/orderItems", orderItemRoute);

export default mainRoute;
