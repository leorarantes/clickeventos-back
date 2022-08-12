import { Request, Response } from "express";
import * as eventsService from "../services/eventsService.js";

export async function get(req: Request, res: Response) {
    const events = await eventsService.get();
    res.status(200).send(events);
};