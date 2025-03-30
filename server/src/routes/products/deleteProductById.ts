import ProductModel from "../../models/Product.model.js";
import { Router, Request, Response } from "express";
import { getTotalAmount } from "./helpers/totalAmount.js";

const router = Router();

router.post("/:id", async (req: Request, res: Response) => {
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
    res.send({ error: "Error deleting project" });
  }
});

export default router;
