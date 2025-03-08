import { Router, Request, Response } from "express";
import ProductModel from "../../models/Product.model.js";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  const { id, name, price, store_name } = req.body;
  const newProduct = new ProductModel({ id, name, price, store_name });
  try {
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    throw new Error("Could not create product");
  }
});

export default router;
