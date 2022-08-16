import { Events } from "@prisma/client";
import eventsRepository from "../repositories/eventsRepository";

function getTimestamp(date: string, time: string) {
    let dateTime: Date = new Date();

    if(parseInt(date.slice(0, 2)) > 31) throw { type: "error_unprocessable_entity", message: "Invalid date."};

    // set date
    dateTime.setDate(parseInt(date.slice(0, 2)));
    dateTime.setMonth(parseInt(date.slice(2, 4))-1);
    dateTime.setFullYear(parseInt(date.slice(4, 8)));
    
    // set time
    dateTime.setHours(parseInt(time.slice(0, 2)));
    dateTime.setMinutes(parseInt(time.slice(2, 4)));
    dateTime.setSeconds(0);

    return dateTime;
}

async function ensureEventExistsAndGetData(id: number) {
    const event: Events = await eventsRepository.getById(id);
    if(!event) throw { type: "error_not_found", message: "Event doesnt exist." };
    return event;
}

export default {
    getTimestamp,
    ensureEventExistsAndGetData
}