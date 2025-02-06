import { Router } from "express";
import {
   getAll,
   getOne,
   create,
   update,
   remove,
} from "../controllers/country.controller.js";

const countryRoute = Router();

countryRoute.get("/", getAll);
countryRoute.post("/", create);
countryRoute.get("/:id", getOne);
countryRoute.delete("/:id", remove);
countryRoute.patch("/:id", update);

export default countryRoute;
