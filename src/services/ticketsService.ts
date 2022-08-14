import { faker } from "@faker-js/faker";
import { Tickets } from "@prisma/client";

import { createTicketData, getTicketData, myTicketData } from "../controllers/ticketsController";
import ticketsRepository from "../repositories/ticketsRepository";

export async function create(userId: number, ticket: createTicketData) {
    const {eventId, paymentVoucher}: createTicketData = ticket;

    // generate ticket hash
    let ticketHash: string = faker.random.alphaNumeric(10);
    let repeatedTicketHash: boolean = true;
    while(repeatedTicketHash === true) {
        const ticketData: Tickets = await ticketsRepository.getByHash(ticketHash);
        if(ticketData) {
            ticketHash = faker.random.alphaNumeric(10);
        }
        else {
            repeatedTicketHash = false;
        }
    }

    await ticketsRepository.create(userId, eventId, ticketHash, paymentVoucher);
}

export async function getByEventId(eventId: string) {
    const tickets: Array<getTicketData> = await ticketsRepository.getByEventId(parseInt(eventId));
    return tickets;
}

export async function getByUserId(userId: number) {
    const tickets: Array<myTicketData> = await ticketsRepository.getByUserId(userId);
    return tickets;
}