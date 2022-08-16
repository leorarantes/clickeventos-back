import supertest from 'supertest';

import prisma from "../../src/database.js";
import app from "../../src/app";
import { createUser, generateRandomUser, getToken } from '../factories/usersFactory';
import { testEvent } from '../factories/eventsFactory.js';

const agent = supertest(app);

const event = testEvent;
let events = [];
let token = "";
let user: any;
beforeAll(async () => {
    user = await createUser(generateRandomUser().create);
    token = getToken(user.id);
});

describe("POST /events", () => {
    it("given valid token and body, create event", async () => {
        const response = await agent
            .post("/events")
            .send(event)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(201);
    });
    
    it("given valid token and invalid body, fail to create event", async () => {
        const response = await agent
            .post("/events")
            .send({...event, price: "NaN"})
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(422);
    });

    it("given invalid token and valid body, fail to create event", async () => {
        const response = await agent
            .post("/events")
            .send(event)
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });
});

describe("GET /events", () => {
    it("given valid token, get events", async () => {
        const response = await agent
            .get("/events")
            .set("Authorization", "Bearer " + token);
        events = response.body;
        expect(response.status).toBe(200);
    });

    it("given invalid token, fail to get events", async () => {
        const response = await agent
            .get("/events")
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });
});

describe("GET /events/id/:id", () => {
    it("given valid token and valid id, get event", async () => {
        const response = await agent
            .get(`/events/id/${events[events.length-1].id}`)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("given invalid token and valid id, fail to get event", async () => {
        const response = await agent
            .get(`/events/id/${events[events.length-1].id}`)
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });

    it("given valid token and invalid id, fail to get event", async () => {
        const response = await agent
            .get("/events/id/0")
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(404);
    });
});

describe("GET /events/from-manager", () => {
    it("given valid token, get events", async () => {
        const response = await agent
            .get(`/events/from-manager`)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    
    it("given invalid token, fail to get events", async () => {
        const response = await agent
            .get(`/events/from-manager`)
            .set("Authorization", "Bearer " + "invalid_token");
        expect(response.status).toBe(401);
    });
});

afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM "eventsPhotos" WHERE photo = ${event.photo}`;
    await prisma.$executeRaw`DELETE FROM "eventsPix" WHERE key = ${event.pixKey}`;
    await prisma.$executeRaw`DELETE FROM "bankAccountsCpf" WHERE cpf = ${event.transfer.bankAccountCpf}`;
    await prisma.$executeRaw`DELETE FROM "eventsBankAccounts" WHERE account = ${event.transfer.bankAccount}`;
    await prisma.$executeRaw`DELETE FROM events WHERE name = ${event.name}`;
    await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
});