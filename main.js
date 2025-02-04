import express from "express";
import { config } from "dotenv";
config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.listen(port, () => console.log("Server started on port", port));
