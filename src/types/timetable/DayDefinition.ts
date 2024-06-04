import { timetableService } from "../../../serviceProvider";
import { DataTableObject } from "./internal/DataTableObject";

export const TABLE_NAME = "daysdefs";

/** The ID string for a timetable day definition */
export declare type TimetableDayDefinitionId = string

/**
    The class for a timetable day definition
*/
export class TimetableDayDefinition extends DataTableObject {
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
                const day = timetableService.timetableStores[this.ttid].days[i];

                days.push(day);
            }

            vals.push(days);
        }

        return vals;
    }
}