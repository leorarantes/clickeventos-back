import prisma from "../database.js";

async function create(eventId: number, pixKey: string) {
    await prisma.eventsPix.create({
        data: {
            key: pixKey,
            eventId
        }
    });
}

export default {
    create
}