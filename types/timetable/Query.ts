import type { TimetableClass, TimetableClassId } from "./Class"
import type { TimetableDayId } from "./Day"
import type { TimetablePeriodId } from "./Period"

/**
    The interface for a timetable query
*/
export interface TimetableQuery {
    class?: TimetableClass | TimetableClassId | string
    subjectQuery?: string
    day?: TimetableDayId | number
    periodStart?:  number
    periodEnd?: number
    count?: number
}