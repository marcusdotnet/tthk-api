/** The ID string for a timetable day */
export declare type TimetableDayId = string

/**
    The interface for a timetable day
*/
export interface TimetableDay {
    ttid: string
    id: TimetableDayId
    name: string
    short: string
}