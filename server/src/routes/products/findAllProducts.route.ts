import { Router, Request, Response } from "express";
import ProductModel from "../../models/Product.model.js";
import { getTotalAmount } from "./helpers/totalAmount.js";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    const formattedProducts = await Promise.all(
      products.map(async (product) => {
        const totalAmount = await getTotalAmount(product.id);
        return {
          id: product.id,
          name: product.name,
          price: product.price.toFixed(2),
          store_name: product.store_name,
          totalAmount: totalAmount,
          revenue: (totalAmount * product.price).toFixed(2),
        };
      })
    );
    res.json(formattedProducts);
  } catch (error) {
    console.log(error);
  }
});

export default router;
