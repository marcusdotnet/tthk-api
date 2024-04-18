/** The ID string for a timetable group */
export declare type TimetableGroupId = string

export interface TimetableGroup {
    id: TimetableGroupId
    name: string
    classid: string
    entireclass: boolean
    ascttdivision: string
    divisionid: string
    color: string
}