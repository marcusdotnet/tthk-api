export const TABLE_NAME = "subjects";

/** The ID string for a timetable subject */
export declare type TimetableSubjectId = string

/**
    The interface for a timetable subject
*/
export class TimetableSubject {
    ttid: string = ""
    id: TimetableSubjectId = ""
    name: string = ""
    short: string = ""
    color: string = ""
    picture_url: string = ""
    contract_weight: number = 0
    edupageid: string = ""

    get dto() {
        return {
            id: this.id,
            name: this.name,
            short_name: this.short,
            color: this.color
        }
    }
}