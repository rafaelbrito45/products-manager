import { Router, Request, Response } from "express";
import Client from "../../models/Client.model.js";

const router = Router();

// Route: GET /clients?page=1&limit=10
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

    const clients = await Client.find().skip(skip).limit(limit);

    const totalClients = await Client.countDocuments();

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalClients / limit),
      totalClients,
      clients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
