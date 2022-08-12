import { Router } from "express";

import { get, getByManagerId } from "../controllers/eventsController.js";
import validateToken from "../middlewares/authValidator.js";

const eventsRouter = Router();

eventsRouter.get('/events', get);
eventsRouter.get('/events/from-manager', validateToken, getByManagerId);

export default eventsRouter;