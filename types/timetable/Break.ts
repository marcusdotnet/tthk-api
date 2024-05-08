/** The ID string for a timetable break */
export declare type TimetableBreakId = string
export const TABLE_NAME = "breaks";

/**
    The interface for a timetable break
*/
export interface TimetableBreak {
    ttid: string
    id: TimetableBreakId
}