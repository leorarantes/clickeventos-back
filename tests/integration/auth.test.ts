import supertest from 'supertest';

import app from "../../src/app";
import prisma from "../../src/database.js";
import { createUser, generateRandomUser } from '../factories/usersFactory';

const agent = supertest(app);

let generatedUsers = new Array();
function insertAndGet() {
    const user = generateRandomUser();
    generatedUsers.push(user.create);
    return generatedUsers[generatedUsers.length-1];
}

describe("POST /sign-up", () => {
    it("given valid body, create user", async () => {
        const user = insertAndGet();
        const response = await agent
            .post("/sign-up")
            .send(user);
        expect(response.status).toBe(200);
    });

    it("given email already in use, fail to create user", async () => {
        const user = insertAndGet();
        await createUser(user);
        const response = await agent
            .post("/sign-up")
            .send(user);
        expect(response.status).toBe(409);
    });

    it("given invalid body, fail to create user", async () => {
        const response = await agent
            .post("/sign-up")
            .send({...generateRandomUser().create, name: ""});
        expect(response.status).toBe(422);
    });

    it("given invalid body, fail to create user", async () => {
        const response = await agent
            .post("/sign-up")
            .send({...generateRandomUser().create, email: "invalid_email"});
        expect(response.status).toBe(422);
    });
    
    it("given invalid body, fail to create user", async () => {
        const response = await agent
            .post("/sign-up")
            .send({...generateRandomUser().create, password: ""});
        expect(response.status).toBe(422);
    });

    it("given invalid body, fail to create user", async () => {
        const response = await agent
            .post("/sign-up")
            .send({...generateRandomUser().create, confirmPassword: "invalid_confirm_password"});
        expect(response.status).toBe(422);
    });
});

describe("POST /sign-in", () => {
    it("given valid email and password, receive token", async () => {
        const user = insertAndGet();
        await createUser(user);
        const response = await agent.post("/sign-in").send({ email: user.email, password: user.password });
        expect(response.status).toBe(201);
    });

    it("given invalid email and password, fail to receive token", async () => {
        const user = insertAndGet();
        await createUser(user);
        const response = await agent.post("/sign-in").send({ email: user.email, password: "invalid_password" });
        expect(response.status).toBe(401);
    });
});

afterAll(async () => {
    generatedUsers.forEach(async (user) => {
        await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    });
});