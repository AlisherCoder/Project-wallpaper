import express from "express";
import mainRoute from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const PORT = process.env.PORT || 4000;

const options = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "Wallpaper Store",
         version: "0.1.0",
         description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
         {
            url: "http://51.44.160.108/:3000/api",
         },
      ],
   },
   apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const app = express();
app.use(express.json());

app.use(
   cors({
      origin: "*", // Barcha manbalarga ruxsat berish (faqat test uchun)
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
   })
);

app.use("/api", mainRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("*", (req, res) => {
   res.status(500).send({ msg: "Route Not Found!" });
});

app.listen(PORT, () => {
   console.log(`Server started on Port: ${PORT}`);
});
