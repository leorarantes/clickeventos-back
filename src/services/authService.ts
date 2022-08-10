import bcrypt from "bcrypt";

import { SignUpData } from "../controllers/authController.js";
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