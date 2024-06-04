import { timetableService } from "../../../serviceProvider"



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

    get periodSpan(): number[] | undefined {
        const span: number[] = this.period.split("-") as unknown as number[];
        if (span.length == 1)
            span[1] = span[0];
        
        span[0] = Number(span[0]);
        span[1] = Number(span[1]);
        if (Number.isNaN(span[0]) || Number.isNaN(span[1])) 
            return; 

        return span;
    }

    get date(): Date | undefined {
        var dateObj: Date | undefined;

        try {
            var dateSplit = this._date.split(".");
            if (dateSplit.length == 0)
                dateSplit = this._date.split("-");
            
            dateObj = new Date(`${dateSplit[1]}.${dateSplit[0]}.${dateSplit[2] || (new Date().getFullYear())}`);
        }
        catch (e) {}

        return dateObj;
    }

    get timetableId() {
        if (!this.date) return; // we can't figure it out because this entry doesn't have a valid date

        for (const dataStore of Object.values(timetableService.timetableStores)) {
            const dateSpan = dataStore.date_span;

            if (!this.date || dateSpan.length != 2 || this.date > dateSpan[1] || this.date < dateSpan[0])
                continue;
            

            
            return dataStore.dto.tt_num;
        }
    }

    get dto() {
        return {
            dayLetter: this.dayLetter,
            date: this.date,
            class: this.class,
            period_span: this.periodSpan || this.period,
            teacher: this.teacher,
            info: this.info
        }
    }
}