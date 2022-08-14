import joi from "joi";

export const ticketSchema = joi.object({
    eventId: joi.number().required(),
    paymentVoucher: joi.string().required()
});