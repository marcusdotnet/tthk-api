import type { TimetableBuildingId } from "./Building"

export const TABLE_NAME = "classrooms";

/** The ID string for a timetable classroom */
export declare type TimetableClassroomId = string

/**
    The interface for a timetable classroom
*/
export class TimetableClassroom {
    ttid: string = ""
    id: TimetableClassroomId = ""
    name: string = ""
    short: string = ""
    buildingid: TimetableBuildingId = ""
    color: string = ""

    /**
     * The dto for this object, used in the API.
    */
    get dto() {
        return this;
    }
}