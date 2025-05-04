import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import statusRoutes from "./routes/status.routes.js";
import productsRoutes from "./routes/products/index.js";
import ordersRoutes from "./routes/orders/index.js";
import clientsRoutes from "./routes/clients/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://admin:password@localhost:27017/local?authSource=admin";

app.use(express.json());

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

// Use Routes
app.use("/status", statusRoutes);
app.use("/products", productsRoutes);
app.use("/clients", clientsRoutes);
app.use("/orders", ordersRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
