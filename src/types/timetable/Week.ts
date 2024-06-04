import type { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable week */
export declare type TimetableWeekId = string

export const TABLE_NAME = "weeks";

/**
    The interface for a timetable week
*/
export interface TimetableWeek extends DataTableObject {
    id: TimetableWeekId
    name: string
    short: string
}