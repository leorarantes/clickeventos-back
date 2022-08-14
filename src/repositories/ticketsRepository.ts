import { getTicketData } from "../controllers/ticketsController.js";
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
    const tickets: Array<getTicketData> = (await prisma.tickets.findMany({
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
            createdAt: 'desc'
        }
    })).map((ticket: {paymentVoucher: string, user: {name: string}}) => {
        return {
            holderName: ticket.user.name,
            paymentVoucher: ticket.paymentVoucher
        };
    });
    return tickets;
}

export default {
    create,
    getByHash,
    getByEventId
}