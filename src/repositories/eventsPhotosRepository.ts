import prisma from "../database.js";

async function create(eventId: number, photo: string) {
    await prisma.eventsPhotos.create({
        data: {
            photo,
            eventId
        }
    });
}

export default {
    create
}