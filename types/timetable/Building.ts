/** The ID string for a timetable building */
export declare type TimetableBuildingId = string
export const TABLE_NAME = "buildings";

/**
    The interface for a timetable building
*/
export class TimetableBuilding {
    ttid: string = ""
    id: TimetableBuildingId = ""
}