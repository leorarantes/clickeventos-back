import { Router } from "express";

import { signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { authSignUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(authSignUpSchema), signUp);

export default authRouter;