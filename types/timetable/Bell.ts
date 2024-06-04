import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable bell */
export declare type TimetableBellId = string
export const TABLE_NAME = "bells";


/**
    The interface for a timetable bell
*/
export class TimetableBell extends DataTableObject {
    id: TimetableBellId = "";
    perioddata: {} = {};
    breakdata: {} = {};
}