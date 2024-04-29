
/** The ID string for a timetable group */
export declare type TimetableGroupId = string

/**
    The interface for a timetable group
*/
export interface TimetableGroup {
    ttid: string
    id: TimetableGroupId
    name: string
    classid: string
    entireclass: boolean
    ascttdivision: string
    divisionid: string
    color: string
}
