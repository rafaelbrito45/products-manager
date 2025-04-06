import { Router, Request, Response } from "express";
import ClientModel from "../../models/Client.model.js";

const router = Router();
router.post("/", async (req: Request, res: Response) => {
  const { id, name, surname } = req.body;
  const newClient = new ClientModel({ id, name, surname });
  try {
    await newClient.save();
    res.json(newClient);
  } catch (error) {
    console.log(error);
    throw new Error("Could not create client");
  }
});

export default router;
