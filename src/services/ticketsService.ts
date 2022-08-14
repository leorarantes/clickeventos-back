import { faker } from "@faker-js/faker";

import { createTicketData } from "../controllers/ticketsController";
import ticketsRepository from "../repositories/ticketsRepository";

export async function create(userId: number, ticket: createTicketData) {
    const {eventId, paymentVoucher}: createTicketData = ticket;

    // generate ticket hash
    const ticketHash = faker.random.alphaNumeric(10);

    await ticketsRepository.create(userId, eventId, ticketHash, paymentVoucher);
}