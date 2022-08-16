import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SignInData, SignUpData } from "../../src/controllers/authController.js";
import "../setup.js";

import prisma from "../../src/database.js";
import app from "../../src/app";
import { Users } from '@prisma/client';

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
    const newUser: Users = await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            password: bcrypt.hashSync(user.password, 14)
        }
    });
    return newUser;
}

export function getToken(id: number) {
    const token: string = jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET
    );
    return token;
}