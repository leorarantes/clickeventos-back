import prisma from "../database.js";

async function create(eventId: number, bankAgency: string, bankAccount: string, bankAccountHolder: string, bank: string) {
    const eventsBankAccount = await prisma.eventsBankAccounts.create({
        data: {
            agency: bankAgency,
            account: bankAccount,
            holderName: bankAccountHolder,
            bank,
            eventId
        }
    });
    return eventsBankAccount;
}

export default {
    create
}