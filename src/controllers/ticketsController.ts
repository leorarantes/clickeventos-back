import { Request, Response } from "express";
import * as ticketsService from "../services/ticketsService.js";

export interface createTicketData {
    eventId: number,
    paymentVoucher: string
}

export async function create(req: Request, res: Response) {
    const userId: number = res.locals.id;
    const ticket: createTicketData = req.body;  
    await ticketsService.create(userId, ticket);
    res.sendStatus(201);
};