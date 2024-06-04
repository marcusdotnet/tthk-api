import { timetableService } from "../../serviceProvider"


const timetableDtoDateRegex = /(\d{2}\. \d{2}\.) - (\d{2}\. \d{2}\.) (\d{4})/;

/**
    The interface for a timetable change entry
*/
export class TimetableChangeEntry {
    dayLetter: string = ""
    _date: string = ""
    class: string = ""
    period: string = ""
    teacher: string = ""
    info: string = ""

    get date(): Date | string {
        var dateObj: Date | string = this._date;

        try {
            dateObj = new Date(this._date);
        }
        catch (e) {}

        return dateObj;
    }

    get timetableId() {
        for (const dataStore of Object.values(timetableService.timetableStores)) {
            var dateStart: Date | string = dataStore.dto.datefrom;

            // try {
            //     dateStart = new Date(dateStart);
            // }
            // catch (_) {
            //     try {
            //         const match: string[] = dataStore.dto.text.match(timetableDtoDateRegex) as string[];
            //         const parenthesesMatch = match[1];


            //         console.log(parenthesesMatch);
            //     }
            //     catch (_) {}
            // }

            try {
                const match: string[] = dataStore.dto.text.match(timetableDtoDateRegex) as string[];
                const span = match[0].replaceAll(" ", "").trim();
                const spanSplit = span.split("-");
                const start = spanSplit[0].substring(0, spanSplit[0].length - 1);

                const endSplit = spanSplit[1].split('.');
                const endDay = endSplit[0];
                const endMonth = endSplit[1];
                const year = endSplit[2];

                const startDate = new Date(`${start}.${year}`);
                const endDate = new Date(spanSplit[1]);
                console.log(`${start}.${year}`);
                console.log(spanSplit[1]);
                console.log(startDate, endDate);
            }
            catch (_) {}
        }

        return "";
    }

    get dto() {
        return {
            dayLetter: this.dayLetter,
            date: this.date,
            class: this.class,
            period: this.period,
            teacher: this.teacher,
            info: this.info
        }
    }
}