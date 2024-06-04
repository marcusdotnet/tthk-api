import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable building */
export declare type TimetableBuildingId = string
export const TABLE_NAME = "buildings";

/**
    The interface for a timetable building
*/
export class TimetableBuilding extends DataTableObject {
    id: TimetableBuildingId = ""
}