import { Router } from "express";

import { signUp } from "../controllers/authController.js";
import { signIn } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/authSchema.js";
import { signInSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), signIn);

export default authRouter;