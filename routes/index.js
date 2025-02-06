import { Router } from "express";
import productRoute from "./product.routes.js";
import orderRoute from "./order.routes.js";
import orderItemRoute from "./orderItems.routes.js";

import categoryItemRoute from "./categoryItem.routes.js";
import categoryRoute from "./category.routes.js";
import countryRoute from "./country.routes.js";
import brandRoute from "./brands.routes.js";

let mainRoute = Router();

mainRoute.use("/products", productRoute);
mainRoute.use("/orders", orderRoute);
mainRoute.use("/orderItems", orderItemRoute);
mainRoute.use("/categoryItems", categoryItemRoute);
mainRoute.use("/categories", categoryRoute);
mainRoute.use("/countries", countryRoute);
mainRoute.use("/brands", brandRoute);

export default mainRoute;
