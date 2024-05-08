/** The ID string for a timetable period */
export declare type TimetablePeriodId = string

/** The numeric string representing a timetable period */
export declare type TimetablePeriodStr = string

export const TABLE_NAME = "periods";

/**
    The interface for a timetable period
*/
export class TimetablePeriod {
    ttid: string = ""
    id: TimetablePeriodId = ""
    period: TimetablePeriodStr = ""
    name: string = ""
    short: string = ""
    starttime: string = ""
    endtime: string = ""
    daydata: {} = {}
    printinsummary: boolean = false
    printinteacher: boolean = false
    printinclass: boolean = false
    printinclassroom: boolean = false
    printonlyinbells: [] = []
}