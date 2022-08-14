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

export default {
    create
}