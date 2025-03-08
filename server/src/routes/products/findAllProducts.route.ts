import { Router, Request, Response } from "express";
import ProductModel from "../../models/Product.model.js";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    throw new Error("Could not retrieve products");
  }
});

export default router;
