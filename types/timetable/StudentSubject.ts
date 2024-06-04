import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable student subject */
export declare type TimetableStudentSubjectId = string

export const TABLE_NAME = "studentsubjects";

/**
    The interface for a timetable student subject
*/
export class TimetableStudentSubject extends DataTableObject {
    id: TimetableStudentSubjectId = ""
}