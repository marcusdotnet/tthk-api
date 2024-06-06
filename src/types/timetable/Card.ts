import { timetableService } from "../../../serviceProvider"
import type { TimetableClassroom, TimetableClassroomId } from "./Classroom"
import type { TimetableDay } from "./Day"
import type { TimetableLesson, TimetableLessonId } from "./Lesson"
import { DataTableObject } from "./internal/DataTableObject";

export const TABLE_NAME = "cards";

/** The ID string for a timetable card */
export declare type TimetableCardId = string

/**
    The interface for a timetable card
*/
export class TimetableCard extends DataTableObject {
    id: TimetableCardId = ""
    locked: boolean = false
    period: number = 0
    days: string = ""
    weeks: string = ""

    classroomids: TimetableClassroomId[] = []
    get classrooms(): TimetableClassroom[] {
        const classrooms = [];

        for (const classroomId of this.classroomids) {
            const classroom = timetableService.timetableStores[this.ttid].classrooms[classroomId];

            classrooms.push(classroom);
        }

        return classrooms;
    }

    lessonid: TimetableLessonId = ""
    get lesson(): TimetableLesson | undefined {
        return timetableService.timetableStores[this.ttid].lessons[this?.lessonid];
    }

    get periodSpan(): number[] | undefined {
        if (!this.lesson) return;

        const start = new Number(this.period) as number;
        const end = (start + this.lesson.durationperiods) - 1;

        return [start, end];
    }

    get timeSpan(): string[] | undefined {
        const periodSpan = this.periodSpan;
        if (!periodSpan) return;
        const [start, end] = periodSpan;

        const startTime = timetableService.timetableStores[this.ttid].periods[start]?.starttime;
        if (!startTime) return;
        const endTime = timetableService.timetableStores[this.ttid].periods[end ? end : start].endtime;

        return [startTime, endTime || startTime];
    }

    get subject() {
        return timetableService.queryOne(this.ttid, "subjects", { id: this.lesson.subjectid });
    }
    
    assignedDays: TimetableDay[] = [];
    override onDataReady(): void {
        const assigneddays = [];

        const days = this.days;
        for (var i = 0; i < days.length; i++) {
            const digit = days[i];
            if (digit == "0") continue;

            assigneddays.push(timetableService.timetableStores[this.ttid].days[i]);
        }

        this.assignedDays = assigneddays;
        

    }

    get dto() {
        const periodSpan = this.periodSpan;
        const lesson = this.lesson;
        const start = periodSpan?.at(0) || -1;
        const end = periodSpan?.at(1) || -1;

        return {
            id: this.id,
            subject: lesson?.subjectid,
            classes: lesson?.classids,
            teachers: lesson?.teacherids,
            rooms: this.classroomids,
            period_span: [start, end],
            days: this.assignedDays.map(d => d.id)
        }
    }
}