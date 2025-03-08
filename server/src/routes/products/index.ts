import { Router } from "express";
import createProductRoute from "./createProduct.route.js";
import findAllProductsRoute from "./findAllProducts.route.js";

const router = Router();

router.use("/", findAllProductsRoute); // GET /products
router.use("/", createProductRoute); // POST /products

export default router;
