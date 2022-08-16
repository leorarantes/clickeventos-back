import { Router } from "express";

import { get, getById, getByManagerId, create } from "../controllers/eventsController.js";
import validateToken from "../middlewares/authValidator.js";
import validateSchema from "../middlewares/validateSchema.js";
import { eventSchema } from "../schemas/eventSchema.js";

const eventsRouter = Router();

eventsRouter.get('/events', validateToken, get);
eventsRouter.get('/events/id/:id', validateToken, getById);
eventsRouter.get('/events/from-manager', validateToken, getByManagerId);
eventsRouter.post('/events', validateSchema(eventSchema), validateToken, create);

export default eventsRouter;