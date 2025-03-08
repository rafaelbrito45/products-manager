import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.json({ status: "Server running", database: mongoStatus });
});

export default router;
