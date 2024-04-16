import { write } from "bun"
import type { TimetableServiceOptions } from "../types/TimetableService";
import type { TimetableDataJson } from "../types/TimetableDataJson";
import type { TimetableDataStore } from "../types/TimetableDataStore";


export class TimetableService {
    options: TimetableServiceOptions | null = null;
    data: TimetableDataStore = {} as TimetableDataStore;

    constructor(options: TimetableServiceOptions) {
        this.options = options;
        this.fetchTimetable();
    }

    async fetchTimetable() {
        const options = this.options as TimetableServiceOptions;

        const response = await fetch(options.eduPageTimetableUrl, {
            method: "POST",
            body: JSON.stringify({
                "__args": [null, options.schoolId],
                "__gsh": options.gsh
            })
        });

        
        const data = this.data
        const jsonData: TimetableDataJson = await response.json();
        jsonData.r.dbiAccessorRes?.tables.forEach(table => {
            //@ts-ignore
            data[table.id] = table.data_rows;
        });
    }
}