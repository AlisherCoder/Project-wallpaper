import { Router } from "express";

import categoryItemRoute from "./categoryItem.routes.js";
import categoryRoute     from "./category.routes.js";
import countryRoute      from "./country.routes.js";
import brandsRoute       from "./brands.routes.js";

let MainRouter = Router();

MainRouter.use("/categoryItem", categoryItemRoute);
MainRouter.use("/category", categoryRoute);
MainRouter.use("/country", countryRoute);
MainRouter.use("/brands", brandsRoute);