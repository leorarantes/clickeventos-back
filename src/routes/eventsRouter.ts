import { Router } from "express";

import { get } from "../controllers/eventsController.js";

const eventsRouter = Router();

eventsRouter.post('/events', get);

export default eventsRouter;