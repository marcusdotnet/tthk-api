import timetableService from "../service";

/** The ID string for a timetable week definition */
export declare type TimetableWeekDefinitionId = string

export class TimetableWeekDefinition {
    id: TimetableWeekDefinitionId = ""
    vals: string[] = []

    get weeks() {
        const weekObjs = [];

        var i = 0;
        for (const week of Object.entries(timetableService.data.weeks)) {
            const val = this.vals[i];

            if (val === "1") {
                weekObjs.push(week);
            }

            i++;
        }

        return weekObjs;
    }
}