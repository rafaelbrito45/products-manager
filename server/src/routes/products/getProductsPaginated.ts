import { Router, Request, Response } from "express";
import ProductModel from "../../models/Product.model.js";
const router = Router();

// Route: GET /products?page=1&limit=10
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    if (page < 1 || limit < 1) {
      res
        .status(400)
        .json({ error: "Page and limit must be positive numbers" });
      return;
    }

    const skip = (page - 1) * limit;

    const products = await ProductModel.find().skip(skip).limit(limit);

    const totalProducts = await ProductModel.countDocuments();

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
