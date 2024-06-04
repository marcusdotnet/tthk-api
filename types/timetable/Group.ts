import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable group */
export declare type TimetableGroupId = string

export const TABLE_NAME = "groups";

/**
    The interface for a timetable group
*/
export class TimetableGroup extends DataTableObject {
    id: TimetableGroupId = ""
    name: string = ""
    classid: string = ""
    entireclass: boolean = false
    ascttdivision: string = ""
    divisionid: string = ""
    color: string = ""
}
