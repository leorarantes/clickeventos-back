import { Request, Response } from "express";
import * as ticketsService from "../services/ticketsService.js";

export interface createTicketData {
    eventId: number,
    paymentVoucher: string
}

export interface getTicketData {
    holderName: string,
    paymentVoucher: string,
}

export async function create(req: Request, res: Response) {
    const userId: number = res.locals.id;
    const ticket: createTicketData = req.body;  
    await ticketsService.create(userId, ticket);
    res.sendStatus(201);
};

export async function getByEventId(req: Request, res: Response) {
    const eventId: string = req.params.eventId; 
    const tickets: Array<getTicketData> = await ticketsService.getByEventId(eventId);
    res.status(200).send(tickets);
};