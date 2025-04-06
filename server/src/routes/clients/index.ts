import { Router } from "express";
import getClientsPaginated from "./getClientsPaginated.js";
import findClientByQuery from "./findClientByQuery.js";
import findClientById from "./findClientById.js";
import createClient from "./createClient.js";
import deleteClientById from "./deleteClientById.js";
import findOrdersByClientId from "./findOrdersByClientId.js";

const router = Router();

router.use("/paginate", getClientsPaginated);
router.use("/", createClient); // POST /clients
router.use("/search", findClientByQuery); //GET /search/q=''
router.use("/", findClientById); //GET /:id
router.use("/", deleteClientById); //DELETE /:id
router.use("/", findOrdersByClientId);

export default router;
