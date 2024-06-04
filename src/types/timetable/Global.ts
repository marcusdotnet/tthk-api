import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable global variable */
export declare type TimetableGlobalId = string

export const TABLE_NAME = "globals";

/**
    The interface for a timetable global
*/
export class TimetableGlobal extends DataTableObject {
    id: TimetableGlobalId = ""
    name: string = ""
    settings: { draft_options: {} } = {draft_options: {}}
    customfields: [] = []
    reg_name: string = ""
    tt_datefrom: string = ""
}