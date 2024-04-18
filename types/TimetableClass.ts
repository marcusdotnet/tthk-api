import timetableService from "../service";
import type { TimetableClassroom, TimetableClassroomId } from "./TimetableClassroom"
import type { TimetableTeacher, TimetableTeacherId } from "./TimetableTeacher"

/** The ID string for a timetable class */
export declare type TimetableClassId = string


export class TimetableClass {
    id: TimetableClassId = "";
    name: string = "";
    short: string = "";
    bell: string = "";
    color: string = "";
    customfields: [] = [];
    printsubjectpictures: boolean = false;
    edupageid: string = "";
    
    classroomid: string = "";
    classroomids: TimetableClassroomId[] = [];
    get classroom(): TimetableClassroom | null {
        return timetableService.data.classrooms[this.classroomid] || null;
    }

    get classrooms() {
        const classrooms: TimetableClassroom[] = [];
        for (const classroomid of this.classroomids) {
            const classroom = timetableService.data.classrooms[classroomid];

            classrooms.push(classroom);
        }

        return classrooms;
    }
    
    teacherid: string = "";
    teacherids: TimetableTeacherId[] = [];
    get teacher(): TimetableTeacher | null {        
        return timetableService.data.teachers[this.teacherid] || null;
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