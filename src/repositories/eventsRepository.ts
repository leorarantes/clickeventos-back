import { Events } from "@prisma/client";
import prisma from "../database.js";

async function get() {
    const events: Array<Events> = await prisma.events.findMany({
        include: {
            eventsPhotos: {
                select: {
                    photo: true
                }
            }
        }
    });
    return events;
}

async function getById(id: number) {
    const event: Events = await prisma.events.findFirst({
        where: {
            id
        }
    });
    return event;
}

async function getByManagerId(managerId: number) {
    const events: Array<Events> = await prisma.events.findMany({
        where: {
            managerId
        }
    });
    return events;
}

async function create(name: string, price: number, timestamp: Date, location:string, description: string, managerId: number) {
    const event: Events = await prisma.events.create({
        data: {
            name,
            price,
            timestamp,
            location,
            description,
            managerId
        }
    });
    return event;
}

export default {
    get,
    getById,
    getByManagerId,
    create
}