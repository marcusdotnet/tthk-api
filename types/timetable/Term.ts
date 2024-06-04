import type { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable term */
export declare type TimetableTermId = string

export const TABLE_NAME = "terms";

/**
    The interface for a timetable term
*/
export interface TimetableTerm extends DataTableObject {
    id: TimetableTermId
    name: string
    short: string
}