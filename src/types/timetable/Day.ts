import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable day */
export declare type TimetableDayId = string


export const TABLE_NAME = "days";

const dayEnglishTranslations: Record<string, string> = {
    "esmaspäev": "monday",
    "teisipäev": "tuesday",
    "kolmapäev": "wednesday",
    "neljapäev": "thursday",
    "reeded": "friday",
    "laupäev": "saturday",
    "pühapäev": "sunday"
};


/**
    The interface for a timetable day
*/
export class TimetableDay extends DataTableObject {
    id: TimetableDayId = ""
    name: string = ""
    short: string = ""

    get englishName() {
        return dayEnglishTranslations[this.name?.toLowerCase()] || this.name;
    }

    get letter() {
        return this?.name?.toUpperCase()[0];
    }
}