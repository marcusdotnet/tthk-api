/** The ID string for a timetable day */
export declare type TimetableDayId = string


export const TABLE_NAME = "days";


/**
    The interface for a timetable day
*/
export class TimetableDay {
    ttid: string = ""
    id: TimetableDayId = ""
    name: string = ""
    short: string = ""
}