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
    ttid: string = ""
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
        return timetableService.timetableStores[this.ttid].classrooms[this.classroomid] || null;
    }

    get classrooms() {
        const classrooms: TimetableClassroom[] = [];
        for (const classroomid of this.classroomids) {
            const classroom = timetableService.timetableStores[this.ttid].classrooms[classroomid];

            classrooms.push(classroom);
        }

        return classrooms;
    }

    teacherid: string = "";
    teacherids: TimetableTeacherId[] = [];
    get teacher(): TimetableTeacher | null {
        return timetableService.timetableStores[this.ttid].teachers[this.teacherid] || null;
    }

    get teachers(): TimetableTeacher[] {
        const teachers: TimetableTeacher[] = [];

        for (const teacherId of this.teacherids) {
            const teacher = timetableService.timetableStores[this.ttid].teachers[teacherId];

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

    /**
     * The dto for this object, used in the API.
    */
    public get dto() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            teachers: this.teacherids,
            classrooms: this.classroomids
        }
    }
}