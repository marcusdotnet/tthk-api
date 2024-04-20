/** The ID string for a timetable period */
export declare type TimetablePeriodId = string

/** The numeric string representing a timetable period */
export declare type TimetablePeriodStr = string

/**
    The interface for a timetable period
*/
export interface TimetablePeriod {
    id: TimetablePeriodId
    period: TimetablePeriodStr
    name: string
    short: string
    starttime: string
    endtime: string
    daydata: {}
    printinsummary: boolean
    printinteacher: boolean,
    printinclass: boolean,
    printinclassroom: boolean,
    printonlyinbells: []
}