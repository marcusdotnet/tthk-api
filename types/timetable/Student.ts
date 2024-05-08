/** The ID string for a timetable student */
export declare type TimetableStudentId = string

export const TABLE_NAME = "students";

/**
    The interface for a timetable student
*/
export class TimetableStudent {
    ttid: string = ""
    id: TimetableStudentId = ""
}