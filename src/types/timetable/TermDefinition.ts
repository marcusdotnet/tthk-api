import { timetableService } from "../../serviceProvider";
import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable term definition */
export declare type TimetableTermDefinitionId = string

export const TABLE_NAME = "termsdefs";

/**
    The class for a timetable term definition
*/
export class TimetableTermDefinition extends DataTableObject {
    id: TimetableTermDefinitionId = ""
    vals: string[] = []

    get terms() {
        const termObjs = [];

        var i = 0;
        for (const term of Object.entries(timetableService.timetableStores[this.ttid].terms)) {
            const val = this.vals[i];

            if (val === "1") {
                termObjs.push(term);
            }

            i++;
        }

        return termObjs;
    }
}