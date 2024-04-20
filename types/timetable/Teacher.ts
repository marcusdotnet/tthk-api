import type { TimetableClassId } from "./Class"

/** The ID string for a timetable teacher */
export declare type TimetableTeacherId = string

/**
    The interface for a timetable teacher
*/
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