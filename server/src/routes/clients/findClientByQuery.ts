import { Router, Request, Response } from "express";
import ClientModel from "../../models/Client.model.js";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q as string;

    if (!searchQuery) {
      res.status(400).send("Search query is required");
      return;
    }

    const clients = await ClientModel.find({
      name: { $regex: `^${searchQuery}`, $options: "i" },
    });

    res.json({ clients });
  } catch (error) {
    res.send({ status: "Could not retrieve clients" });
  }
});

export default router;
