import type { TimetableClassId } from "./TimetableClass"

/** The ID string for a timetable teacher */
export declare type TimetableTeacherId = string

export interface TimetableTeacher {
    id: TimetableTeacherId
    short: string
    bell: string
    color: string
    fontcolorprint: string
    fontcolorprint2: string
    customfields: [{
        field: string
        value: string
    }]
    edupageid: string
    classids: TimetableClassId[]
}