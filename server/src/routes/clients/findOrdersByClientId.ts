import { Router, Request, Response } from "express";
import OrderModel from "../../models/Order.model.js";
import ProductModel from "../../models/Product.model.js";

const router = Router();

router.get("/:id/orders", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const orders = await OrderModel.find({ customer_id: Number(id) });

    const response = await Promise.all(
      orders.map(async (order) => {
        const products = await Promise.all(
          order.products.map(async (product) => {
            const productData = await ProductModel.findOne({
              id: product.product_id,
            });
            return {
              name: productData?.name,
              price: productData?.price,
            };
          })
        );

        return {
          customer_id: order.customer_id,
          products,
          date: order.purchase_date,
          order_id: order.purchase_id,
        };
      })
    );

    res.json(response);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
