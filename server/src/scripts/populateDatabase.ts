import mongoose from "mongoose";
import fs from "fs";

import ProductModel from "../models/Product.model.js";
import OrderModel from "../models/Order.model.js";
import ClientModel from "../models/Client.model.js";

const MONGO_URI =
  "mongodb://admin:password@localhost:27017/local?authSource=admin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadJSON = (filename: string) => {
  const filePath = path.join(__dirname, "../data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const populateDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Load JSON files
    const products = loadJSON("products.json");
    const orders = loadJSON("orders.json");
    const clients = loadJSON("clients.json");

    // Clear existing data
    await ProductModel.deleteMany({});
    await OrderModel.deleteMany({});
    await ClientModel.deleteMany({});
    console.log("🗑️  Existing data cleared");

    // Insert new data
    await ProductModel.insertMany(products);
    await OrderModel.insertMany(orders);
    await ClientModel.insertMany(clients);
    console.log("🚀 Database populated successfully");

    mongoose.connection.close();
    console.log("🔌 Connection closed");
  } catch (error) {
    console.error("❌ Error populating database:", error);
    mongoose.connection.close();
  }
};

populateDB();
