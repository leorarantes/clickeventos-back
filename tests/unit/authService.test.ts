import { jest } from "@jest/globals";

import { generateRandomUser } from "../factories/usersFactory.js";
import * as authService from "../../src/services/authService.js";
import usersRepository from "../../src/repositories/usersRepository.js";

jest.mock("../../src/repositories/usersRepository.js");

const user = generateRandomUser();

describe("authService test suite", () => {
    it("should create user", async () => {
        jest.spyOn(usersRepository, "getByEmail").mockImplementationOnce((): any => undefined);
        jest.spyOn(usersRepository, "create").mockImplementationOnce((): any => { });

        await authService.signUp(user.create);
        expect(usersRepository.getByEmail).toBeCalled();
    });

    it("should not create duplicated user", async () => {
        jest.spyOn(usersRepository, "getByEmail").mockResolvedValueOnce(user.get);

        const promise = authService.signUp(user.create);
        expect(promise).rejects.toEqual({ type: "error_conflict", message: "A user with this email address already exists." });
    });

    it("user should login with valid email and password", async () => {
        jest.spyOn(usersRepository, "getByEmail").mockResolvedValueOnce(user.get);

        const promise = await authService.signIn(user.create);
        expect(promise).resolves;
        expect(usersRepository.getByEmail).toBeCalled();
    });

    it("user should not login with invalid email", async () => {
        jest.spyOn(usersRepository, "getByEmail").mockImplementationOnce((): any => undefined);

        const promise = authService.signIn(user.create);
        expect(promise).rejects.toEqual({ type: "error_not_found", message: "User doesnt exist." });
    });
    
    it("user should not login with invalid password", async () => {
        jest.spyOn(usersRepository, "getByEmail").mockImplementationOnce((): any => { return {...user.get, password: "invalid_password"}});

        const promise = authService.signIn(user.create);
        expect(promise).rejects.toEqual({ type: "error_unauthorized", message: "Invalid password." });
    });
});