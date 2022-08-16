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

export default {
    getTimestamp
}