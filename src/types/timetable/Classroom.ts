import type { TimetableBuildingId } from "./Building"
import { DataTableObject } from "./internal/DataTableObject";

export const TABLE_NAME = "classrooms";

/** The ID string for a timetable classroom */
export declare type TimetableClassroomId = string

/**
    The interface for a timetable classroom
*/
export class TimetableClassroom extends DataTableObject {
    id: TimetableClassroomId = ""
    name: string = ""
    short: string = ""
    buildingid: TimetableBuildingId = ""
    color: string = ""

    /**
     * The dto for this object, used in the API.
    */
    get dto() {
        return {
            id: this.id,
            name: this.name,
            short_name: this.short,
            buildingid: this.buildingid,
            color: this.color
        }
    }
}