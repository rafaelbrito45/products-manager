import { Router } from "express";
import createProductRoute from "./createProduct.route.js";
import findAllProductsRoute from "./findAllProducts.route.js";
import findProductByQueryRoute from "./findProductByQuery.js";
import findProductById from "./findProductById.js";
import deleteProductById from "./deleteProductById.js";
import getProductsPaginated from "./getProductsPaginated.js";

const router = Router();

router.use("/paginate", getProductsPaginated); //GET /products?page=1&limit=10

router.use("/", findAllProductsRoute); // GET /products
router.use("/", createProductRoute); // POST /products
router.use("/search", findProductByQueryRoute); //GET /search/q=''
router.use("/", findProductById); //GET /:id
router.use("/:id", deleteProductById); //POST /:id

export default router;
