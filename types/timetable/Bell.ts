/** The ID string for a timetable bell */
export declare type TimetableBellId = string

/**
    The interface for a timetable bell
*/
export interface TimetableBell {
    ttid: string
    id: TimetableBellId
    perioddata: {}
    breakdata: {}
}