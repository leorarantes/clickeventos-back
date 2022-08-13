import { Events } from "@prisma/client";
import prisma from "../database.js";

async function get() {
    const events: Array<Events> = await prisma.events.findMany();
    return events;
}

async function getByManagerId(managerId: number) {
    const events: Array<Events> = await prisma.events.findMany({
        where: {
            managerId
        }
    });
    return events;
}

async function create(name: string, price: number, dateTime: Date, description: string, managerId: number) {
    const event: Events = await prisma.events.create({
        data: {
            name,
            price,
            dateTime,
            description,
            managerId
        }
    });
    return event;
}

export default {
    get,
    getByManagerId,
    create
}