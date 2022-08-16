import { Request, Response } from "express";

import * as authService from "../services/authService.js";

export interface SignUpData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
};

export interface SignInData {
    email: string,
    password: string
};

export async function signUp(req: Request, res: Response) {
    const user: SignUpData = req.body;
    await authService.signUp(user);
    res.sendStatus(201);
};

export async function signIn(req: Request, res: Response) {
    const user: SignInData = req.body;
    const token = await authService.signIn(user);
    res.status(200).send(token);
};