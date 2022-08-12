import { Users } from "@prisma/client";

import usersRepository from "../repositories/usersRepository.js";

async function ensureUserDoesntExist(email: string) {
    const user: Users = await usersRepository.getByEmail(email);
    if(user) throw { type: "error_conflict", message: "A user with this email address already exists." };
}

async function ensureUserExistsAndGetData(email: string) {
    const user: Users = await usersRepository.getByEmail(email);
    if(!user) throw { type: "error_not_found", message: "User doesnt exist." };
    return user;
}

async function ensureUserExists(id: number) {
    const user: Users = await usersRepository.getById(id);
    if(!user) throw { type: "error_not_found", message: "User doesnt exist." };
    return user;
}

export default {
    ensureUserDoesntExist,
    ensureUserExistsAndGetData,
    ensureUserExists
};