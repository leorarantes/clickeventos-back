import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";

import { SignUpData } from "../../src/controllers/authController.js";

import prisma from "../../src/database.js";

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