import { timetableService } from "../../serviceProvider";
import type { TimetableClassroomId, TimetableClassroom } from "./Classroom";
import type { TimetableTeacherId, TimetableTeacher } from "./Teacher";
import { DataTableObject } from "./internal/DataTableObject";


export const TABLE_NAME = "classes";

/** The ID string for a timetable class */
export declare type TimetableClassId = string

/**
    The class for a timetable class
*/
export class TimetableClass extends DataTableObject {
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

    /**
     * The dto for this object, used in the API.
    */
    get dto() {
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            teachers: this.teacherids,
            classrooms: this.classroomids
        }
    }
}