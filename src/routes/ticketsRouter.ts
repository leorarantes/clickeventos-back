import { Router } from "express";

import { create, getByEventId, getByUserId } from "../controllers/ticketsController.js";
import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import { ticketSchema } from "../schemas/ticketSchema.js";

const ticketsRouter = Router();

ticketsRouter.post('/tickets', validateSchema(ticketSchema), validateToken, create);
ticketsRouter.get('/tickets/event/:eventId', validateToken, getByEventId);
ticketsRouter.get('/tickets/from-user', validateToken, getByUserId);

export default ticketsRouter;