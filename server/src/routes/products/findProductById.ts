import ProductModel from "../../models/Product.model.js";
import { Router, Request, Response } from "express";
import { getTotalAmount } from "./helpers/totalAmount.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findOne({ id });

    if (!product) {
      res.status(400).send("Product not found");
      throw Error("Product not found");
    }

    const totalAmount = await getTotalAmount(product.id);
    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: product.price.toFixed(2),
      store_name: product.store_name,
      totalAmount: totalAmount,
      revenue: (totalAmount * product.price).toFixed(2),
    };

    res.json(formattedProduct);
    return;
  } catch (error) {
    res.send({ error: "Error fetching product" });
  }
});

export default router;
