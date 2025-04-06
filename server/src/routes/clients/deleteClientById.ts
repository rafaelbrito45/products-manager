import ClientModel from "../../models/Client.model.js";
import { Router, Request, Response } from "express";

const router = Router();

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedClient = await ClientModel.findOneAndDelete({ id });

    if (!deletedClient) {
      res.status(400).send("Client not found");
      throw Error("Client not found");
    }

    res.json({ message: `Client deleted successfully` });
    return;
  } catch (error) {
    res.send({ error: "Error deleting project" });
  }
});

export default router;
