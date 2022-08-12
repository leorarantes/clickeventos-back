import { Events } from "@prisma/client";

import prisma from "../database.js";

async function get() {
    const events: Array<Events> = await prisma.events.findMany();
    return events;
}