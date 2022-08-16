import supertest from 'supertest';

import prisma from "../../src/database.js";
import app from "../../src/app";
import { createUser, generateRandomUser, getToken } from '../factories/usersFactory';
import { createEvent, testEvent } from '../factories/eventsFactory.js';

const agent = supertest(app);

let ticket = {
    eventId: 0,
    paymentVoucher: "paymentVoucher_file"
}
const eventInfo = testEvent;
let token = "";
let user: any;
beforeAll(async () => {
    user = await createUser(generateRandomUser().create);
    token = getToken(user.id);
    ticket.eventId = (await createEvent(user.id, eventInfo)).id;
});

describe("POST /tickets", () => {
    it("given valid token and body, create ticket", async () => {
        const response = await agent
            .post("/tickets")
            .send(ticket)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(201);
    });
    
    it("given valid token and invalid body, fail to create ticket", async () => {
        const response = await agent
            .post("/tickets")
            .send({...ticket, eventId: "NaN"})
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(422);
    });

    it("given invalid token and valid body, fail to create ticket", async () => {
        const response = await agent
            .post("/tickets")
            .send(ticket)
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });
});

describe("GET /tickets/event/:id", () => {
    it("given valid token and valid eventId, get tickets", async () => {
        const response = await agent
            .get(`/tickets/event/${ticket.eventId}`)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("given invalid token and valid eventId, fail to get tickets", async () => {
        const response = await agent
            .get(`/tickets/event/${ticket.eventId}`)
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });

    it("given valid token and invalid eventId, fail to get tickets", async () => {
        const response = await agent
            .get(`/tickets/event/0`)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(404);
    });
});

describe("GET /tickets/from-user", () => {
    it("given valid token, get tickets", async () => {
        const response = await agent
            .get(`/tickets/from-user`)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    
    it("given invalid token, fail to get tickets", async () => {
        const response = await agent
            .get(`/events/from-manager`)
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });
});