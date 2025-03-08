import { Router } from "express";
import getClientsPaginated from "./getClientsPaginated.js";

const router = Router();

router.use("/", getClientsPaginated);

export default router;
