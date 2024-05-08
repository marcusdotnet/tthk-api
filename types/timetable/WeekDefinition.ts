import { timetableService } from "../../serviceProvider";

/** The ID string for a timetable week definition */
export declare type TimetableWeekDefinitionId = string

/**
    The class for a timetable week definition
*/
export class TimetableWeekDefinition {
    id: TimetableWeekDefinitionId = ""
    vals: string[] = []

    get weeks() {
        const weekObjs = [];

        var i = 0;
        for (const week of Object.entries(timetableService.timetableStores[this.ttid].weeks)) {
            const val = this.vals[i];

            if (val === "1") {
                weekObjs.push(week);
            }

            i++;
        }

        return weekObjs;
    }
}