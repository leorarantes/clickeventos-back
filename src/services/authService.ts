import bcrypt from "bcrypt";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

import { SignInData, SignUpData } from "../controllers/authController.js";
import usersUtil from "../utils/usersUtil.js";
import "../setup.js";
import usersRepository from "../repositories/usersRepository.js";

export async function signUp(user: SignUpData) {
    const { name, email, password }: SignUpData = user;
    await usersUtil.ensureUserDoesntExist(email);

    // create encrypted password
    const SALT = 14;
    const encryptedPassword: string = bcrypt.hashSync(password, SALT);

    await usersRepository.create(name, email, encryptedPassword);
}

export async function signIn(user: SignInData) {
    const { email, password }: SignInData = user;
    
    const existingUser: Users = await usersUtil.ensureUserExistsAndGetData(email);

    // validate password
    const encryptedPassword: string = existingUser.password;
    if(!bcrypt.compareSync(password, encryptedPassword)) {
        throw { type: "error_unauthorized", message: "Invalid password." };
    }

    // get token
    const token: string = jwt.sign(
        {
            id: existingUser.id,
        },
        process.env.JWT_SECRET
    );
    return { token };
}