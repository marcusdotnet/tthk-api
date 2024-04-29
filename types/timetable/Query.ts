import type { TimetableClass, TimetableClassId } from "./Class"
import type { TimetableClassroomId } from "./Classroom"
import type { TimetableDayId } from "./Day"
import type { TimetablePeriodId } from "./Period"

/**
    The interface for a timetable query
*/
export interface TimetableQuery {
    ttid: string
    class?: TimetableClassId | string
    subjectQuery?: string
    day?: TimetableDayId | number
    periodStart?: number
    periodEnd?: number
    count?: number
    room?: TimetableClassroomId | string
}