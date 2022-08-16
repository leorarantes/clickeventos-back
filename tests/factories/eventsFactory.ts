import { createEventData } from "../../src/controllers/eventsController";
import bankAccountsCpfsRepository from "../../src/repositories/bankAccountsCpfsRepository";
import eventsBankAccountsRepository from "../../src/repositories/eventsBankAccountsRepository";
import eventsPhotosRepository from "../../src/repositories/eventsPhotosRepository";
import eventsPixRepository from "../../src/repositories/eventsPixRepository";
import eventsRepository from "../../src/repositories/eventsRepository";
import eventsUtil from "../../src/utils/eventsUtil";

export const testEvent: createEventData = {
    name: "Summer Barbecue",
    price: 20.00,
    date: "31122022",
    time: "1500",
    location: "Peter's house",
    photo: "photo_url",
    pixKey: "peter@test.com",
    transfer: {
        bankAgency: "0000-0",
        bankAccount: "00.000-0",
        bankAccountHolder: "Peter Junior",
        bank: "HSBC",
        bankAccountCpf: "000.000.000-00"
    },
    description: "Just a nice barbecue"
}

export async function createEvent(managerId: number, eventData: createEventData) {
    const {name, price, date, time, location, photo, pixKey, description} = eventData;
    const {bankAgency, bankAccount, bankAccountHolder, bank, bankAccountCpf} = eventData.transfer;

    const dateTime: Date = eventsUtil.getTimestamp(date, time);

    const event = await eventsRepository.create(name, price, dateTime, location, description, managerId); 
    await eventsPhotosRepository.create(event.id, photo);
    await eventsPixRepository.create(event.id, pixKey);
    const eventBankAccount = await eventsBankAccountsRepository.create(event.id, bankAgency, bankAccount, bankAccountHolder, bank);
    await bankAccountsCpfsRepository.create(eventBankAccount.id, bankAccountCpf);

    return event;
}