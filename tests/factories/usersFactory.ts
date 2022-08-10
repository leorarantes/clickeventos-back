import { faker } from '@faker-js/faker';
import { SignUpData } from "../../src/controllers/authController.js";

import prisma from "../../src/database.js";

export function getRandomUser() {
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    return {name, email, password, confirmPassword: password};
}

export async function createUser(user: SignUpData) {
    await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password
        }
    });
}