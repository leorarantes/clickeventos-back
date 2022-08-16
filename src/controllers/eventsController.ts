import { Request, Response } from "express";
import { Events } from "@prisma/client";
import * as eventsService from "../services/eventsService.js";

export interface createEventData {
    name: string,
    price: number,
    date: string,
    time: string,
    location: string,
    photo: string,
    pixKey: string,
    transfer: {
        bankAgency: string,
        bankAccount: string,
        bankAccountHolder: string,
        bank: string,
        bankAccountCpf: string
    },
    description: string
}

export async function get(req: Request, res: Response) {
    const events: Array<Events> = await eventsService.get();
    res.status(200).send(events);
};

export async function getById(req: Request, res: Response) {
    const id: string = req.params.id;
    const event: Events = await eventsService.getById(id);
    res.status(200).send(event);
};

export async function getByManagerId(req: Request, res: Response) {
    const managerId: number = res.locals.id;
    const events: Array<Events> = await eventsService.getByManagerId(managerId);
    res.status(200).send(events);
};

export async function create(req: Request, res: Response) {
    const managerId: number = res.locals.id;
    const eventData: createEventData = req.body;  
    await eventsService.create(managerId, eventData);
    res.sendStatus(201);
};