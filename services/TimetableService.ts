import { TimetableCard } from "../types/timetable/Card";
import { TimetableClass, type TimetableClassId } from "../types/timetable/Class";
import type { TimetableClassroomId } from "../types/timetable/Classroom";
import type { TimetableDayId } from "../types/timetable/Day";
import { TimetableLesson } from "../types/timetable/Lesson";
import type { TimetableQuery } from "../types/timetable/Query";
import { TimetableDayDefinition } from "../types/timetable/definitions/DayDefinition";
import { TimetableTermDefinition } from "../types/timetable/definitions/TermDefinition";
import { TimetableWeekDefinition } from "../types/timetable/definitions/WeekDefinition";
import type { ApiConfigDataJson } from "../types/timetable/internal/ApiConfigDataJson";
import type { TimetableApiDataJson } from "../types/timetable/internal/ApiDataJson";
import { TimetableDataStore } from "../types/timetable/internal/DataStore";
import { QueryError } from "../types/timetable/internal/QueryError";
import type { TimetableServiceOptions } from "../types/timetable/internal/ServiceOptions";

const instantiateDataObj: Record<string, any> = {
    classes: () => new TimetableClass(),
    lessons: () => new TimetableLesson(),
    daysdefs: () => new TimetableDayDefinition(),
    weeksdefs: () => new TimetableWeekDefinition(),
    termsdefs: () => new TimetableTermDefinition(),
    cards: () => new TimetableCard()
};

/**
 * Dictionary of day translations
 */
const dayTranslations: Record<string, string> = {
    "1": "0",
    "e": "0",
    "ep": "0",
    "esmaspaev": "0",
    "mon": "0",
    "monday": "0",

    "2": "1",
    "t": "1",
    "tp": "1",
    "teisipaev": "1",
    "tue": "1",
    "tuesday": "1",

    "3": "2",
    "k": "2",
    "kp": "2",
    "kolmapaev": "2",
    "wed": "2",
    "wednesday": "2",

    "4": "3",
    "n": "3",
    "np": "3",
    "neljapaev": "3",
    "thu": "3",
    "thursday": "3",

    "5": "4",
    "r": "4",
    "reede": "4",
    "fri": "4",
    "friday": "4",

    "6": "5",
    "l": "5",
    "laupaev": "5",
    "sat": "5",
    "saturday": "5"
}



/**
 * The service that makes accessing timetable data easy
 * and allows for querying capabilities
 */
export class TimetableService {
    options: TimetableServiceOptions | null = null;
    timetableStores: Record<string, TimetableDataStore> = {};


    configure(options: TimetableServiceOptions) {
        this.options = options;
    }

    async fetchData() {
        const options = this.options as TimetableServiceOptions;
        this.timetableStores = {};

        const timetableConfigData: ApiConfigDataJson = await ((await fetch(`${options.eduPageTimetableUrl}/timetable/server/ttviewer.js?__func=getTTViewerData`, {
            method: "POST",
            body: JSON.stringify({
                "__args": [null, 2023],
                "__gsh": "00000000"
            })
        })).json());

        for (const timetableEntry of timetableConfigData.r.regular.timetables) {
            const timetableData: TimetableApiDataJson = await ((await fetch(`${options.eduPageTimetableUrl}/timetable/server/regulartt.js?__func=regularttGetData`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, timetableEntry.tt_num],
                    "__gsh": options.gsh
                })
            })).json());



            const dataStore: TimetableDataStore = new TimetableDataStore(timetableEntry);

            // copy everything from the timetable's data rows and
            // turn them into instances of custom classes if possible
            timetableData!.r!.dbiAccessorRes!.tables.forEach(table => {
                const rows = table.data_rows as [{ id: string }];
                const dataTable: any = {};
                const instantianteFunc = instantiateDataObj[table.id] as unknown as any;

                for (var row of rows) {
                    if (typeof instantianteFunc == "function") {
                        const rowObj = instantianteFunc();
                        Object.assign(rowObj, row);

                        dataTable[row.id] = rowObj;
                        continue;
                    }

                    dataTable[row.id] = row;
                }


                //@ts-ignore
                dataStore[table.id] = dataTable;
            });


            this.timetableStores[timetableEntry.tt_num] = dataStore;
        }
    }
}