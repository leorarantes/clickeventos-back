import joi from "joi";

export const eventSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    date: joi.string().pattern(/[0-9]{8}/),
    time: joi.string().pattern(/[0-9]{4}/),
    location: joi.string().required(),
    photo: joi.string(),
    pixKey: joi.string(),
    transfer: joi.object({
        bankAgency: joi.string(),
        bankAccount: joi.string(),
        bankAccountHolder: joi.string(),
        bank: joi.string(),
        bankAccountCpf: joi.string()
    }),
    description: joi.string().required()
});