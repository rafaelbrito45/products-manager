import ProductModel from "../../models/Product.model.js";
import { Router, Request, Response } from "express";

const router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductModel.findOneAndDelete({ id });

    if (!deletedProduct) {
      res.status(400).send("Product not found");
      throw Error("Product not found");
    }

    res.json({ message: `Product deleted successfully` });
    return;
  } catch (error) {
    res.send({ error: "Error deleting product" });
  }
});

export default router;
