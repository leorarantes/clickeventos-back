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

export default {
    get,
    getByManagerId
}