import { Router, Request, Response } from "express";
import OrderModel from "../../models/Order.model.js";

const router = Router();

router.get("/orders/:customerId", async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      res.sendStatus(400).json({ error: "Customer Id not provided" });
      return;
    }
    if (typeof customerId !== "number") {
      res.sendStatus(400).json({ error: "Customer Id must be a number" });
      return;
    }

    const order = await OrderModel.findOne({ customer_id: customerId });

    if (!order) {
      res.status(404).json({ error: "Order not found for this customer" });
      return;
    }

    res.json(order);
  } catch (error) {
    throw new Error("Could not retrieve orders");
  }
});

export default router;
