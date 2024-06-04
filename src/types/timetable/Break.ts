import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable break */
export declare type TimetableBreakId = string
export const TABLE_NAME = "breaks";

/**
    The interface for a timetable break
*/
export class TimetableBreak extends DataTableObject {
    id: TimetableBreakId = ""
}