import { Router } from "express";

import { create, getByEventId } from "../controllers/ticketsController.js";
import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import { ticketSchema } from "../schemas/ticketSchema.js";

const ticketsRouter = Router();

ticketsRouter.post('/tickets', validateSchema(ticketSchema), validateToken, create);
ticketsRouter.get('/tickets/:eventId', validateSchema(ticketSchema), validateToken, getByEventId);

export default ticketsRouter;