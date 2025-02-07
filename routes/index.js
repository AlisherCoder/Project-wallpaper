import { Router } from "express"

import userRoute from "./users.routes.js"
import registerRoute from "./register.routes.js"
import loginRoute from "./login.routes.js"
import verifyotpRoute from "./verify-otp.routes.js"
import reqresetRoute from "./reqreset.routes.js"
import respwdRoute from "./respassword.routes.js"
import productRoute from "./product.routes.js";
import orderRoute from "./order.routes.js";

import categoryRoute from "./category.routes.js";
import countryRoute from "./country.routes.js";
import brandRoute from "./brands.routes.js";

let mainRoute = Router()

mainRoute.use("/users", userRoute)
mainRoute.use("/register", registerRoute)
mainRoute.use("/login", loginRoute)
mainRoute.use("/verify-otp", verifyotpRoute)
mainRoute.use("/request-reset", reqresetRoute)
mainRoute.use("/reset-password", respwdRoute)
mainRoute.use("/products", productRoute);
mainRoute.use("/orders", orderRoute);
mainRoute.use("/categories", categoryRoute);
mainRoute.use("/countries", countryRoute);
mainRoute.use("/brands", brandRoute);

export default mainRoute;
