import { timetableService } from "../../../serviceProvider";

/** The ID string for a timetable day definition */
export declare type TimetableDayDefinitionId = string

/**
    The class for a timetable day definition
*/
export class TimetableDayDefinition {
    id: TimetableDayDefinitionId = ""
    vals: string[] = [];

    get days() {
        const vals = [];
        for (const valEntry of this.vals) {
            const days = [];

            var i = -1;
            for (const digit of valEntry) {
                i++;

                if (digit == "0") continue;
                const day = timetableService.data.days[i];

                days.push(day);
            }

            vals.push(days);
        }

        return vals;
    }
}