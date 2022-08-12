import { Request, Response } from "express";
import { Events } from "@prisma/client";
import * as eventsService from "../services/eventsService.js";

export async function get(req: Request, res: Response) {
    const events: Array<Events> = await eventsService.get();
    res.status(200).send(events);
};

export async function getByManagerId(req: Request, res: Response) {
    const managerId: number = res.locals.id;
    const events: Array<Events> = await eventsService.getByManagerId(managerId);
    res.status(200).send(events);
};