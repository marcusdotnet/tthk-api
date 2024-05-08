/** The ID string for a timetable student subject */
export declare type TimetableStudentSubjectId = string

export const TABLE_NAME = "studentsubjects";

/**
    The interface for a timetable student subject
*/
export class TimetableStudentSubject {
    ttid: string = ""
    id: TimetableStudentSubjectId = ""
}