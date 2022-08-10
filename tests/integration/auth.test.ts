import supertest from 'supertest';

import app from "../../src/app";
import prisma from "../../src/database.js";
import { createUser, getRandomUser } from '../factories/usersFactory';

const agent = supertest(app);

let randomUsers = new Array(2);
randomUsers[0] = getRandomUser();
randomUsers[1] = getRandomUser();

describe("POST /sign-up", () => {
    it("given valid body, create user", async () => {
        const response = await agent
            .post("/sign-up")
            .send(randomUsers[0]);
        expect(response.status).toBe(200);
    });

    it("given email already in use, fail to create user", async () => {
        await createUser(randomUsers[1]);
        const response = await agent.post("/sign-up").send(randomUsers[1]);
        expect(response.status).toBe(409);
    });

    it("given invalid body, fail to create user", async () => {
        let emptyNameResponse = {...randomUsers[0]};
        emptyNameResponse.name= "";
        const response = await agent
            .post("/sign-up")
            .send(emptyNameResponse);
        expect(response.status).toBe(422);
    });

    it("given invalid body, fail to create user", async () => {
        let invalidEmailResponse = {...randomUsers[0]};
        invalidEmailResponse.email= "invalid_email";
        const response = await agent
            .post("/sign-up")
            .send(invalidEmailResponse);
        expect(response.status).toBe(422);
    });
    
    it("given invalid body, fail to create user", async () => {
        let emptyPasswordResponse = {...randomUsers[0]};
        emptyPasswordResponse.name= "";
        const response = await agent
            .post("/sign-up")
            .send(emptyPasswordResponse);
        expect(response.status).toBe(422);
    });

    it("given invalid body, fail to create user", async () => {
        let invalidConfirmPasswordResponse = {...randomUsers[0]};
        invalidConfirmPasswordResponse.confirmPassword= "invalid_confirm_password";
        const response = await agent
            .post("/sign-up")
            .send(invalidConfirmPasswordResponse);
        expect(response.status).toBe(422);
    });
});

afterAll(async () => {
    randomUsers.forEach(async (user) => {
        await prisma.$executeRaw`DELETE FROM users WHERE email = ${user.email}`;
    });
});