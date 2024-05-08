/** The ID string for a timetable bell */
export declare type TimetableBellId = string
export const TABLE_NAME = "bells";


/**
    The interface for a timetable bell
*/
export class TimetableBell {
    ttid: string = "";
    id: TimetableBellId = "";
    perioddata: {} = {};
    breakdata: {} = {};
}