/** The ID string for a timetable term */
export declare type TimetableTermId = string

/**
    The interface for a timetable term
*/
export interface TimetableTerm {
    ttid: string
    id: TimetableTermId
    name: string
    short: string
}