/** The ID string for a timetable subject */
export declare type TimetableSubjectId = string

export interface TimetableSubject {
    id: TimetableSubjectId
    name: string
    short: string
    color: string
    picture_url: string
    contract_weight: number
    edupageid: string
}