import { Router } from "express"

import userRoute from "./users.routes.js"
import registerRoute from "./register.routes.js"
import loginRoute from "./login.routes.js"
import verifyotpRoute from "./verify-otp.routes.js"
import reqresetRoute from "./reqreset.routes.js"
import respwdRoute from "./respassword.routes.js"

let mainRoute = Router()

mainRoute.use("/users", userRoute)
mainRoute.use("/register", registerRoute)
mainRoute.use("/login", loginRoute)
mainRoute.use("/verify-otp", verifyotpRoute)
mainRoute.use("/request-reset", reqresetRoute)
mainRoute.use("/reset-password", respwdRoute)

export default mainRoute;
