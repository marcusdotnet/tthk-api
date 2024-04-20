import { timetableService } from "../../serviceProvider";
import { ClassTimetable } from "./ClassTimetable";
import type { TimetableClassroomId, TimetableClassroom } from "./Classroom";
import type { TimetableTeacherId, TimetableTeacher } from "./Teacher";

/** The ID string for a timetable class */
export declare type TimetableClassId = string

/**
    The class for a timetable class
*/
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

    #timetable: ClassTimetable | null = null;
    get timetable() {
        if (!this.#timetable) {
            this.#timetable = new ClassTimetable(this.id);
        }

        return this.#timetable;
    }
}