import ClientModel from "../../models/Client.model.js";
import ProductModel from "../../models/Product.model.js";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await ClientModel.findOne({ id });

    if (!client) {
      res.status(400).send("client not found");
      throw Error("client not found");
    }

    res.json(client);
    return;
  } catch (error) {
    res.send({ error: "Error fetching client" });
  }
});

export default router;
