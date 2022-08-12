import { Users } from "@prisma/client";

import prisma from "../database.js";

async function create(name: string, email: string, password: string) {
    await prisma.users.create({data: {
        name,
        email,
        password
    }});
}

async function getByEmail(email: string) {
    const user: Users = await prisma.users.findFirst({where: {
        email
    }});
    return user;
}

async function getById(id: number) {
    const user: Users = await prisma.users.findFirst({where: {
        id
    }});
    return user;
}

export default {
    create,
    getByEmail,
    getById
};