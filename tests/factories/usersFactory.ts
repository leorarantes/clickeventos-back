import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";

import { SignInData, SignUpData } from "../../src/controllers/authController.js";

import prisma from "../../src/database.js";
import app from "../../src/app";

const agent = supertest(app);

export function generateRandomUser() {
    const id = 0;
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const createdAt = new Date();

    return { 
        create: { 
            name,
            email,
            password,
            confirmPassword: password
        },
        get: {
            id,
            name,
            email,
            password: bcrypt.hashSync(password, 14),
            createdAt
        }
    };
}

export async function createUser(user: SignUpData) {
    await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password, 14)
        }
    });
}

export async function getToken(email: string, password: string) {
    const response = await agent.post("/sign-in").send({ email, password });
    const token = response.body;
    return token;
}