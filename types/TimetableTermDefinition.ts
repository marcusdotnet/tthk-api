import timetableService from "../service";

/** The ID string for a timetable term definition */
export declare type TimetableTermDefinitionId = string

export class TimetableTermDefinition {
    id: TimetableTermDefinitionId = ""
    vals: string[] = []

    get terms() {
        const termObjs = [];

        var i = 0;
        for (const term of Object.entries(timetableService.data.terms)) {
            const val = this.vals[i];

            if (val === "1") {
                termObjs.push(term);
            }

            i++;
        }

        return termObjs;
    }
}