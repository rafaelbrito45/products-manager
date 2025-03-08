import { Router, Request, Response } from "express";
import OrderModel from "../../models/Order.model.js";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find();
    res.json(orders);
  } catch (error) {
    throw new Error("Could not retrieve orders");
  }
});

export default router;
