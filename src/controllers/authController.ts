import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export interface SignUpData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
};

export async function signUp(req: Request, res: Response) {
    const user: SignUpData = req.body;
    await authService.signUp(user);
    res.sendStatus(200);
};