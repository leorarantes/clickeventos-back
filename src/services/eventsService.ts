import { Events } from "@prisma/client";
import eventsRepository from "../repositories/eventsRepository.js";
import usersUtil from "../utils/usersUtil.js";

export async function get() {
    const events: Array<Events> = await eventsRepository.get();
    return events;
}

export async function getByManagerId(managerId: number) {
    // ensure manager exists
    await usersUtil.ensureUserExists(managerId);

    const events: Array<Events> = await eventsRepository.getByManagerId(managerId);
    return events;
}