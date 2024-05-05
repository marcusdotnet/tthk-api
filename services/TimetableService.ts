import { TimetableCard } from "../types/timetable/Card";
import { TimetableClass, type TimetableClassId } from "../types/timetable/Class";
import type { TimetableClassroomId } from "../types/timetable/Classroom";
import type { TimetableDayId } from "../types/timetable/Day";
import { TimetableLesson } from "../types/timetable/Lesson";
import type { TimetableQuery } from "../types/timetable/Query";
import { TimetableSubject } from "../types/timetable/Subject";
import { TimetableTeacher } from "../types/timetable/Teacher";
import { TimetableDayDefinition } from "../types/timetable/definitions/DayDefinition";
import { TimetableTermDefinition } from "../types/timetable/definitions/TermDefinition";
import { TimetableWeekDefinition } from "../types/timetable/definitions/WeekDefinition";
import type { ApiConfigDataJson } from "../types/timetable/internal/ApiConfigDataJson";
import type { TimetableApiDataJson } from "../types/timetable/internal/ApiDataJson";
import { TimetableDataStore } from "../types/timetable/internal/DataStore";
import { QueryError } from "../types/timetable/internal/QueryError";
import type { TimetableServiceOptions } from "../types/timetable/internal/ServiceOptions";
import { readFile, writeFile, exists } from "fs/promises";

const instantiateTableClass: Record<string, any> = {
    classes: () => new TimetableClass(),
    teachers: () => new TimetableTeacher(),
    lessons: () => new TimetableLesson(),
    subjects: () => new TimetableSubject(),
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


export declare type TimetableQueryTableName = "globals" | "periods" | "breaks" | "bells" | "daysdefs" | "weeksdefs" | "termsdefs" | "days" | "weeks" | "terms" | "buildings"
    | "classrooms" | "classes" | "subjects" | "teachers" | "groups" | "divisions" | "students" | "lessons" | "studentsubjects" | "cards" | "classroomsupervisions";



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

    async fetchData(useLocal?: boolean) {
        const options = this.options as TimetableServiceOptions;
        this.timetableStores = {};
        var timetableConfigData: ApiConfigDataJson = {} as ApiConfigDataJson;

        const localFilePath: string = process!.env!.DEV_TIMETABLE_FILE as string;
        const localFileExists = useLocal && await exists(localFilePath);

        if (!useLocal || !localFileExists) {
            timetableConfigData = await ((await fetch(`${options.eduPageTimetableUrl}/timetable/server/ttviewer.js?__func=getTTViewerData`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, 2023],
                    "__gsh": "00000000"
                })
            })).json());

            if (useLocal) {
                await writeFile(localFilePath, JSON.stringify(timetableConfigData));
                await this.fetchData(true);

                return;
            }
        }
        else {
            const jsonStr: string = await readFile(localFilePath) as unknown as string;

            timetableConfigData = JSON.parse(jsonStr)
        }

        for (const timetableEntry of timetableConfigData.r.regular.timetables) {
            const timetableData: TimetableApiDataJson = await ((await fetch(`${options.eduPageTimetableUrl}/timetable/server/regulartt.js?__func=regularttGetData`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, timetableEntry.tt_num],
                    "__gsh": options.gsh
                })
            })).json());


            const dataStore: TimetableDataStore = new TimetableDataStore(timetableEntry);
            dataStore.dto = timetableEntry;

            // copy everything from the timetable's data rows and
            // turn them into instances of custom classes if possible
            timetableData!.r!.dbiAccessorRes!.tables.forEach(table => {
                const rows = table.data_rows as [{ id: string }];
                const dataTable: any = {};
                const instantiateClassObj = instantiateTableClass[table.id] as unknown as any;

                for (var row of rows) {
                    if (typeof instantiateClassObj == "function") {
                        const rowObj = instantiateClassObj();
                        Object.assign(rowObj, {
                            ttid: timetableEntry.tt_num
                        });
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

    query(timetableId: string | undefined, tableName: TimetableQueryTableName, filter: TimetableDataStore[TimetableQueryTableName]) {
        const timetableStore = timetableId && Object.keys(this.timetableStores).includes(timetableId) && this.timetableStores[timetableId];
        if (!timetableStore) return false;

        var filtered: any[] = [];

        //@ts-ignore
        for (const entry of Object.values(timetableStore[tableName])) {
            var requirementsMet = true;

            for (const [filterKey, filterValue] of Object.entries(filter)) {
                if (filterValue == undefined || filterValue == null) continue;
                if (!Object.keys(entry).includes(filterKey)) continue;

                const srcValue: any | undefined = entry[filterKey];

                if (!srcValue || !checkMeetsQueryFilter(srcValue, filterValue)) {
                    requirementsMet = false;
                };
            }

            if (!requirementsMet) continue;

            filtered.push(entry);
        }


        return filtered;
    }
}


function checkMeetsQueryFilter(src: any, filter: any): boolean {
    if (typeof filter != "function" && (typeof src != typeof filter)) return false;

    if (typeof filter == "function") {
        return filter(src);
    }
    else if (typeof src == "string") {
        return src.toLowerCase().includes(filter.toLowerCase());
    }

    return src == filter;
}