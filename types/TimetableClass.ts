import timetableService from "../service";
import type { TimetableClassroomId } from "./TimetableClassroom"
import type { TimetableTeacher, TimetableTeacherId } from "./TimetableTeacher"

/** The ID string for a timetable class */
export declare type TimetableClassId = string


export class TimetableClass {
    id: TimetableClassId = "";
    name: string = "";
    short: string = "";
    teacherid: string = "";
    classroomids: TimetableClassroomId[] = [];
    bell: string = "";
    color: string = "";
    customfields: [] = [];
    printsubjectpictures: boolean = false;
    edupageid: string = "";
    classroomid: string = "";
    teacherids: TimetableTeacherId[] = [];

    get teacher(): TimetableTeacher {        
        return timetableService.data.teachers[this.teacherid];
    }

    get teachers(): TimetableTeacher[] {
        const teachers: TimetableTeacher[] = [];

        for (const teacherId of this.teacherids) {
            const teacher = timetableService.data.teachers[teacherId];

            teachers.push(teacher);
        }

        return teachers;
    }
}