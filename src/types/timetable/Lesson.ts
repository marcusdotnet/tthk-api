import { timetableService } from "../../../serviceProvider";
import type { TimetableClass, TimetableClassId } from "./Class";
import type { TimetableGroup, TimetableGroupId } from "./Group";
import type { TimetableStudent, TimetableStudentId } from "./Student";
import type { TimetableSubject, TimetableSubjectId } from "./Subject";
import type { TimetableTeacher, TimetableTeacherId } from "./Teacher";
import type { TimetableDayDefinitionId } from "./DayDefinition";
import type { TimetableTermDefinitionId } from "./TermDefinition";
import type { TimetableWeekDefinitionId } from "./WeekDefinition";
import { DataTableObject } from "./internal/DataTableObject";

export const TABLE_NAME = "lessons";

/** The ID string for a timetable lesson */
export declare type TimetableLessonId = string

/**
    The class for a timetable lesson
*/
export class TimetableLesson extends DataTableObject {
    id: TimetableLessonId = "";
    count: number = 0;
    durationperiods: number = 0;
    terms: string = "";
    seminargroup: any | null = null;
    texts: any | null = null;
    groupnames: string[] = [];
    classdata: {} = {};


    termsdefid: TimetableTermDefinitionId = "";
    get term() {
        return timetableService.timetableStores[this.ttid].termsdefs[this.termsdefid];
    }

    weeksdefid: TimetableWeekDefinitionId = "";
    get weekdef() {
        return timetableService.timetableStores[this.ttid].weeksdefs[this.weeksdefid];
    }

    daysdefid: TimetableDayDefinitionId = "";
    get daysdef() {
        return timetableService.timetableStores[this.ttid].daysdefs[this.daysdefid];
    }

    subjectid: TimetableSubjectId = "";
    get subject(): TimetableSubject {
        return timetableService.timetableStores[this.ttid].subjects[this.subjectid];
    }

    teacherids: TimetableTeacherId[] = [];
    get teachers(): TimetableTeacher[] {
        const teachers = [];

        for (const teacherId of this.teacherids) {
            const teacher = timetableService.timetableStores[this.ttid].teachers[teacherId];

            teachers.push(teacher);
        }

        return teachers;
    }

    groupids: TimetableGroupId[] = [];
    get groups(): TimetableGroup[] {
        const groups = [];

        for (const groupId of this.groupids) {
            const group = timetableService.timetableStores[this.ttid].groups[groupId];

            groups.push(group);
        }

        return groups;
    }

    classids: TimetableClassId[] = [];
    get classes(): TimetableClass[] {
        const classes = [];

        for (const classId of this.classids) {
            const classObj = timetableService.timetableStores[this.ttid].classes[classId];

            classes.push(classObj);
        }

        return classes;
    }

    studentids: TimetableStudentId[] = [];
    get students(): TimetableStudent[] {
        const students = [];

        for (const studentId of this.studentids) {
            const student = timetableService.timetableStores[this.ttid].students[studentId];

            students.push(student);
        }

        return students;
    }
}