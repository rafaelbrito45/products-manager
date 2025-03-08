import { Router } from "express";
import findAllOrdersRoute from "./findAllOrders.route.js";

const router = Router();

router.use("/", findAllOrdersRoute); // GET /products

export default router;
