import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { dbConnet, seeders } from "./config/mongoose.js";

import auth from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", auth);

// MongoDB
try {
  console.log("Connecting to database");
  await dbConnet();
  console.log("MongoDB connect");

  // solo debe ejecutar una sola vez esta funcion de seeders(),
  // seeders();
} catch (error) {
  console.log("Error MongoDB", error);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
