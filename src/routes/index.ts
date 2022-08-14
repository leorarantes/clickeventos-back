import { Router } from "express";

import authRouter from "./authRouter.js";
import eventsRouter from "./eventsRouter.js";
import ticketsRouter from "./ticketsRouter.js";

const router = Router();

router.use(authRouter);
router.use(eventsRouter);
router.use(ticketsRouter);

export default router;