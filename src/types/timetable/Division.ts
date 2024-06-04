import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable division */
export declare type TimetableDivisionId = string

export const TABLE_NAME = "divisions";

export class TimetableDivision extends DataTableObject {
    id: TimetableDivisionId = ""
    classid: string = ""
    ascttdivision: string = ""
    groupids: string[] = []
}