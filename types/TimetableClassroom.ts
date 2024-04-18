import type { TimetableBuildingId } from "./TimetableBuilding"

/** The ID string for a timetable classroom */
export declare type TimetableClassroomId = string

export interface TimetableClassroom {
    id: TimetableClassroomId
    name: string
    short: string
    buildingid: TimetableBuildingId
    color: string
}