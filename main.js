import express from "express";
import { config } from "dotenv";
import mainRoute from "./routes/index.js";
config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api", mainRoute);

app.listen(port, () => console.log("Server started on port", port));
