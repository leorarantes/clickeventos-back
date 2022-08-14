import prisma from "../database.js";

async function create(userId: number, eventId: number, ticketHash: string, paymentVoucher: string) {
    await prisma.tickets.create({
        data: {
            ticket: ticketHash,
            paymentVoucher,
            eventId,
            userId
        }
    });
}

async function getByHash(ticketHash: string) {
    const ticket = await prisma.tickets.findFirst({
        where: {
            ticket: ticketHash
        }
    });
    return ticket;
}

export default {
    create,
    getByHash
}