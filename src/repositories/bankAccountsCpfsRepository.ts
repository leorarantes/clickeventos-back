import prisma from "../database.js";

async function create(bankAccountId: number, bankAccountCpf: string) {
    await prisma.bankAccountsCpfs.create({
        data: {
            cpf: bankAccountCpf,
            bankAccountId
        }
    });
}

export default {
    create
}