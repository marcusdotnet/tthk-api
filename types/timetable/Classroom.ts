import type { TimetableBuildingId } from "./Building"

/** The ID string for a timetable classroom */
export declare type TimetableClassroomId = string

/**
    The interface for a timetable classroom
*/
export interface TimetableClassroom {
    id: TimetableClassroomId
    name: string
    short: string
    buildingid: TimetableBuildingId
    color: string
}