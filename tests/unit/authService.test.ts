import { jest } from "@jest/globals";

import { getRandomUser } from "../factories/usersFactory.js";
import * as authService from "../../src/services/authService.js";
import usersRepository from "../../src/repositories/usersRepository.js";
import usersUtil from "../../src/utils/usersUtil.js";

jest.mock("../../src/repositories/usersRepository.js");
jest.mock("../../src/utils/usersUtil.js");

describe("authService test suite", () => {
    it("should create user", async () => {
        jest.spyOn(usersUtil, "ensureUserDoesntExist").mockImplementationOnce((): any => { });
        jest.spyOn(usersRepository, "create").mockImplementationOnce((): any => { });

        await authService.signUp(getRandomUser());
        expect(usersUtil.ensureUserDoesntExist).toBeCalled();
    });

    it("should not create duplicated user", async () => {
        jest.spyOn(usersUtil, "ensureUserDoesntExist").mockImplementationOnce((): any => { });

        const promise = authService.signUp(getRandomUser());
        expect(promise).rejects.toEqual({ type: "error_conflict", message: "A user with this email address already exists." });
    });
});