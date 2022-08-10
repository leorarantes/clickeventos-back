import { Users } from "@prisma/client";

import usersRepository from "../repositories/usersRepository.js";

async function ensureUserDoesntExist(email: string) {
    const user: Users = await usersRepository.getByEmail(email);
    if(user) throw { type: "error_conflict", message: "A user with this email address already exists." };
}

export default {
    ensureUserDoesntExist
};