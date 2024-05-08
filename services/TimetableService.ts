import { lstatSync, readdirSync } from "fs";
import { TimetableCard } from "../types/timetable/Card";
import { TimetableClass, type TimetableClassId } from "../types/timetable/Class";
import { TimetableLesson } from "../types/timetable/Lesson";
import { TimetableSubject } from "../types/timetable/Subject";
import { TimetableTeacher } from "../types/timetable/Teacher";
import { TimetableDayDefinition } from "../types/timetable/DayDefinition";
import { TimetableTermDefinition } from "../types/timetable/TermDefinition";
import { TimetableWeekDefinition } from "../types/timetable/WeekDefinition";
import type { ApiConfigDataJson } from "../types/timetable/internal/ApiConfigDataJson";
import type { TimetableApiDataJson } from "../types/timetable/internal/ApiDataJson";
import { TimetableDataStore } from "../types/timetable/internal/DataStore";
import type { TimetableServiceOptions } from "../types/timetable/internal/ServiceOptions";
import { readFile, writeFile, exists, readdir } from "fs/promises";
import path from "path";



const timetableTypePath = path.join(__dirname, "../types/timetable");

/**
 * A mapper where the key is the key of a table in the timetable datastore, and the value is a class.
 * All elements of the original api data within the table will be replaced with an instance of that class.
 * This is to achieve ORM-like behaviour.
 */
const tableClassMap: Record<string, Function> = {};

for (const fileName of readdirSync(timetableTypePath)) {
    const modulePath = path.join(timetableTypePath, fileName); 
    const fileStats = lstatSync(modulePath);
    if (fileStats.isDirectory()) continue;

    const ttModule = await import(modulePath);
    const tableName: string | undefined = ttModule?.TABLE_NAME
    if (!tableName) continue;

    var ttClassExport: Function | undefined;
    for (const moduleExport of Object.values(ttModule)) {
        if (typeof moduleExport == "function") {
            ttClassExport = moduleExport;
        }
    }
    if (!ttClassExport) continue;

    tableClassMap[tableName] = ttClassExport;
}


export declare type TimetableQueryTableName = "globals" | "periods" | "breaks" | "bells" | "daysdefs" | "weeksdefs" | "termsdefs" | "days" | "weeks" | "terms" | "buildings"
    | "classrooms" | "classes" | "subjects" | "teachers" | "groups" | "divisions" | "students" | "lessons" | "studentsubjects" | "cards" | "classroomsupervisions";


/**
 * The service that makes accessing timetable data easy
 * and allows for querying of timetable tables
 */
export class TimetableService {
    options: TimetableServiceOptions | null = null;
    timetableStores: Record<string, TimetableDataStore> = {};


    configure(): void {
        this.options = {
            eduPageTimetableUrl: process.env.EDUPAGE_TIMETABLE_API_URL as string,
            year: new Date().getFullYear(),
            gsh: process.env.GSH as string
        }
    }


    /**
     * 
     * @param useLocal Whether or not to use the local timetable file. Defaults to false.
     */
    async fetchData(useLocal: boolean = false): Promise<void> {
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
            for (const table of Object.values(timetableData!.r!.dbiAccessorRes!.tables)) {
                const rows = table.data_rows as [{ id: string }];
                const dataTable: any = {};
                const tableClassImport = await import("../types/timetable/")

                const instantiateClassObj = instantiateTableClass[table.id] as unknown as any;

                for (var row of rows) {
                    const rowObj = instantiateClassObj();
                    rowObj.ttid = timetableEntry.tt_num;
                    Object.assign(rowObj, row);

                    dataTable[row.id] = rowObj;
                }

                //@ts-ignore
                dataStore[table.id] = dataTable;
            };


            this.timetableStores[timetableEntry.tt_num] = dataStore;
        }
    }

    /**
     * 
     * @param timetableId The id of the timetable to look in
     * @param tableName The name of the table to look in
     * @param filter The filter options
     * @returns An array of elements from table {tableName} that matches the {filter} criteria
     */
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

                if (!srcValue || !TimetableService.checkMeetsQueryFilter(srcValue, filterValue)) {
                    requirementsMet = false;
                };
            }

            if (!requirementsMet) continue;

            filtered.push(entry);
        }


        return filtered;
    }

    private static checkMeetsQueryFilter(src: any, filter: any): boolean {
        if (typeof filter != "function" && (typeof src != typeof filter)) return false;
    
        if (typeof filter == "function") {
            return filter(src);
        }
        else if (typeof src == "string") {
            return src.toLowerCase().includes(filter.toLowerCase());
        }
    
        return src == filter;
    }
}

