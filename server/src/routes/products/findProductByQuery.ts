import { Router, Request, Response } from "express";
import ProductModel from "../../models/Product.model.js";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q as string;

    if (!searchQuery) {
      res.status(400).send("Search query is required");
      return;
    }

    const products = await ProductModel.find({
      name: { $regex: `^${searchQuery}`, $options: "i" },
    });

    res.json({ products });
  } catch (error) {
    res.send({ status: "Could not retrieve products" });
  }
});

export default router;
