import { getTicketData, myTicketData } from "../controllers/ticketsController.js";
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

async function getByEventId(eventId: number) {
    const tickets: Array<getTicketData> = await prisma.tickets.findMany({
        where: {
            eventId
        },
        select: {
            paymentVoucher: true,
            user: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            id: 'desc'
        }
    });
    return tickets;
}

async function getByUserId(userId: number) {
    const tickets: Array<myTicketData> = await prisma.tickets.findMany({
        where: {
            userId
        },
        select: {
            ticket: true,
            paymentVoucher: true,
            event: {
                select: {
                    name: true,
                    dateTime: true
                }
            }
        },
        orderBy: {
            eventId: 'desc'
        }
    });
    return tickets;
}

export default {
    create,
    getByHash,
    getByEventId,
    getByUserId
}