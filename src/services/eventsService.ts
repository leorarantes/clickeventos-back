import { Events } from "@prisma/client";

export async function get() {
    const events: Array<Events> = eventsRepository.get();
    return events;
}