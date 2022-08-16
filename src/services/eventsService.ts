import { Events } from "@prisma/client";

import { createEventData } from "../controllers/eventsController.js";
import eventsRepository from "../repositories/eventsRepository.js";
import usersUtil from "../utils/usersUtil.js";
import eventsUtil from "../utils/eventsUtil.js";
import eventsPhotosRepository from "../repositories/eventsPhotosRepository.js";
import eventsPixRepository from "../repositories/eventsPixRepository.js";
import eventsBankAccountsRepository from "../repositories/eventsBankAccountsRepository.js";
import bankAccountsCpfsRepository from "../repositories/bankAccountsCpfsRepository.js";

export async function get() {
    const events: Array<Events> = await eventsRepository.get();
    return events;
}

export async function getById(id: string) {
    const event: Events = await eventsRepository.getById(parseInt(id));
    if(!event) throw { type: "error_not_found", message: "Event doesnt exist." };
    return event;
}

export async function getByManagerId(managerId: number) {
    // ensure manager exists
    await usersUtil.ensureUserExists(managerId);

    const events: Array<Events> = await eventsRepository.getByManagerId(managerId);
    return events;
}

export async function create(managerId: number, eventData: createEventData) {
    const {name, price, date, time, location, photo, pixKey, description} = eventData;
    const {bankAgency, bankAccount, bankAccountHolder, bank, bankAccountCpf} = eventData.transfer;
    
    // ensure manager exists
    await usersUtil.ensureUserExists(managerId);

    const dateTime: Date = eventsUtil.getTimestamp(date, time);

    const event = await eventsRepository.create(name, price, dateTime, location, description, managerId); 
    
    if(photo.length !== 0) await eventsPhotosRepository.create(event.id, photo);
    if(pixKey.length !== 0) await eventsPixRepository.create(event.id, pixKey);
    if(bankAgency.length !== 0) {
        const eventsBankAccount = await eventsBankAccountsRepository.create(event.id, bankAgency, bankAccount, bankAccountHolder, bank);
        if(bankAccountCpf.length !== 0) await bankAccountsCpfsRepository.create(eventsBankAccount.id, bankAccountCpf);
    }
}