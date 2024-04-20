/** The ID string for a timetable division */
export declare type TimetableDivisionId = string

export interface TimetableDivision {
    id: TimetableDivisionId
    classid: string
    ascttdivision: string
    groupids: string[]
}