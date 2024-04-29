import { timetableService } from "../../serviceProvider"
import type { TimetableClassroom, TimetableClassroomId } from "./Classroom"
import type { TimetableDay } from "./Day"
import type { TimetableLesson, TimetableLessonId } from "./Lesson"

/** The ID string for a timetable card */
export declare type TimetableCardId = string

/**
    The interface for a timetable card
*/
export class TimetableCard {
    ttid: string = ""
    id: TimetableCardId = ""
    locked: boolean = false
    period: number = 0
    days: string = ""
    weeks: string = ""

    get assignedDays(): TimetableDay[] {
        const assigneddays = [];

        const days = this.days;
        for (var i = 0; i < days.length; i++) {
            const digit = days[i];
            if (digit == "0") continue;

            assigneddays.push(timetableService.timetableStores[this.ttid].days[i]);
        }

        return assigneddays;
    }

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
    get lesson(): TimetableLesson {
        return timetableService.timetableStores[this.ttid].lessons[this.lessonid];
    }

    get periodSpan(): number[] {
        const start = new Number(this.period) as number;
        const end = (start + this.lesson.durationperiods) - 1;

        return [start, end];
    }

    get timeSpan(): string[] {
        const [start, end] = this.periodSpan;
        const startTime = timetableService.timetableStores[this.ttid].periods[start].starttime;
        const endTime = timetableService.timetableStores[this.ttid].periods[end ? end : start].endtime;

        return [startTime, endTime];
    }

    get dto() {
        return {
            id: this.id,
            subject: this.lesson.subject.name,
            teachers: this.lesson.teacherids,
            rooms: this.classroomids,
            period_span: this.periodSpan,
            days: this.assignedDays
        }
    }
}