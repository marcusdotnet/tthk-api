import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable card */
export declare type TimetableClassroomSupervisionId = string

export const TABLE_NAME = "classroomsupervisions";

/**
    The interface for a timetable classroom supervision
*/
export class TimetableClassroomSupervision extends DataTableObject {
    id: TimetableClassroomSupervisionId = ""
}