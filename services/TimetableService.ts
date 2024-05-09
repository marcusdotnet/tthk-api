import { lstatSync, readdirSync } from "fs";
import type { ApiConfigDataJson } from "../types/timetable/internal/ApiConfigDataJson";
import type { TimetableApiDataJson } from "../types/timetable/internal/ApiDataJson";
import { TimetableDataStore } from "../types/timetable/internal/DataStore";
import type { TimetableServiceOptions } from "../types/timetable/internal/ServiceOptions";
import { readFile, writeFile, exists, readdir } from "fs/promises";
import path from "path";
import type { BunFile } from "bun";


const timetableDevFile: BunFile = Bun.file("./timetable.json");


/**
 * A mapper where the key is the key of a table in the timetable datastore, and the value is a class.
 * All elements of the original api data within the table will be replaced with an instance of that class.
 * This is to achieve ORM-like behaviour.
*/
const tableClassMap: Record<string, Function> = {};


const timetableTypePath: string = path.join(__dirname, "../types/timetable");
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


/**
 * The structure for the timetable file used in development mode
 */
interface DevFileData {
    config?: ApiConfigDataJson;
    data: { [key: string]: TimetableApiDataJson };
}


/**
 * Valid queryable tables in a timetable
 */
export declare type TimetableQueryTableName = "globals" | "periods" | "breaks" | "bells" | "daysdefs" | "weeksdefs" | "termsdefs" | "days" | "weeks" | "terms" | "buildings"
    | "classrooms" | "classes" | "subjects" | "teachers" | "groups" | "divisions" | "students" | "lessons" | "studentsubjects" | "cards" | "classroomsupervisions";


/**
 * The service that makes accessing timetable data easy
 * and allows for querying of timetable tables
 */
export class TimetableService {
    private options: TimetableServiceOptions | null = null;

    /**
     * A dictionary of all timetable data stores
     * where the key is a timetable id and the value is the timetable store
     */
    timetableStores: Record<string, TimetableDataStore> = {};


    /**
     * Configure the timetable service
     * options are consumed from the active .env file.
     */
    configure(): void {
        this.options = {
            eduPageTimetableUrl: process.env.EDUPAGE_TIMETABLE_API_URL as string,
            year: new Date().getFullYear(),
            gsh: process.env.GSH as string
        }
    }



    /**
     * Fetch the timetable data
     * must be called at least once during the program lifecycle in order to query the timetable.
     */
    async fetchData(): Promise<void> {
        const useLocalFile: boolean = Boolean(process.env?.DEV);
        const options = this.options as TimetableServiceOptions;
        const localFileExists = useLocalFile && await timetableDevFile.exists();

        var timetableConfigData: ApiConfigDataJson | undefined;
        var devFileData: DevFileData = useLocalFile && (localFileExists && await timetableDevFile.json()) || { "data": {}, "config": {} };


        if (useLocalFile && localFileExists) {
            timetableConfigData = devFileData["config"];
        }

        this.timetableStores = {};
        timetableConfigData ??= await ((await fetch(`${options.eduPageTimetableUrl}/timetable/server/ttviewer.js?__func=getTTViewerData`, {
            method: "POST",
            body: JSON.stringify({
                "__args": [null, 2023],
                "__gsh": "00000000"
            })
        })).json());

        if (useLocalFile && localFileExists)
            devFileData["config"] = timetableConfigData;

        //@ts-ignore
        for (const timetableEntry of timetableConfigData.r.regular.timetables) {
            const timetableData: TimetableApiDataJson = (useLocalFile && localFileExists && devFileData["data"][timetableEntry.tt_num]) || await ((await fetch(`${options.eduPageTimetableUrl}/timetable/server/regulartt.js?__func=regularttGetData`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, timetableEntry.tt_num],
                    "__gsh": options.gsh
                })
            })).json());

            if (useLocalFile)
                devFileData["data"][timetableEntry.tt_num] = timetableData;

            const dataStore: TimetableDataStore = new TimetableDataStore(timetableEntry);
            dataStore.dto = timetableEntry;

            if (!timetableData) return;

            // copy everything from the timetable's data rows and
            // turn them into instances of custom classes if possible
            for (const apiTable of timetableData!.r!.dbiAccessorRes!.tables) {
                if (!apiTable) continue;

                const rows = apiTable.data_rows as [{ id: string }];
                const dataTable: any = {};
                const instantiateClassObj = tableClassMap[apiTable.id] as unknown as Function;

                if (!instantiateClassObj) {
                    console.log("Failed to instantiate an instance for table '" + apiTable.id + "'");
                    continue;
                }

                for (var row of rows) {
                    //@ts-ignore
                    const rowObj = new (instantiateClassObj);
                    rowObj.ttid = timetableEntry.tt_num;
                    Object.assign(rowObj, row);

                    dataTable[row.id] = rowObj;
                }

                //@ts-ignore
                dataStore[apiTable.id] = dataTable;
            };

            this.timetableStores[timetableEntry.tt_num] = dataStore;
        }

        if (useLocalFile)
            timetableDevFile.writer().write(JSON.stringify(devFileData));
    }

    /**
     * Query a table of a specific timetable.
     * @param timetableId The id of the timetable to look in
     * @param tableName The name of the table to look in
     * @param filter The filter options
     * @returns An array of elements from table {tableName} that matches the {filter} criteria
     */
    query(timetableId: string | undefined, tableName: TimetableQueryTableName, filter: TimetableDataStore[TimetableQueryTableName]): any[] | undefined {
        const timetableStore = timetableId && Object.keys(this.timetableStores).includes(timetableId) && this.timetableStores[timetableId];
        if (!timetableStore) return;

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

    /**
     * The ids of all existing timetables in the timetable stores
     */
    get timetableids(): string[] {
        return Object.keys(this.timetableStores);
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

