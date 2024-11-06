import type { TimetableConfigResponse } from "./types/TimetableConfigResponse";
import type { Table, TimetableDataResponse } from "./types/TimetableDataResponse";

export interface TimetableData extends TimetableDataResponse {
    tt_id: string;
}

export class TimetableDataStore {
    stores: Record<string, TimetableData> = {};
    default_id: string = '';

    constructor(config: TimetableConfigResponse, data: TimetableData[]) {
        data.forEach(d => {
            this.stores[d.tt_id] = d; 
        });
    }

    timetableExists(tt_id: string): boolean {
        return Object.keys(this.stores).includes(tt_id);
    }

    get timetableids(): string[] {
        return Object.keys(this.stores);
    }

    get default_timetable() {
        return this.stores[this.default_id];
    }

    getTimetableById(tt_id: string) {
        return this.stores[tt_id];
    }

    getTable(tt_id: string=this.default_id, table_id: string): Table|null { 
        return this.stores[tt_id].r.dbiAccessorRes.tables.find(t => t.id == table_id) as any;
    }
}