import timetableService from "../service"
import type { TimetableClassroomId } from "./TimetableClassroom"
import type { TimetableDay } from "./TimetableDay"
import type { TimetableLessonId } from "./TimetableLesson"

/** The ID string for a timetable card */
export declare type TimetableCardId = string

export class TimetableCard {
    id: TimetableCardId = ""
    locked: boolean = false
    period: boolean = false
    days: string = ""
    weeks: string = ""

    get assignedDays() {
        const assigneddays = [];

        const days = this.days;
        for (var i = 0; i < days.length; i++) {
            const digit = days[i];
            if (digit == "0") continue;

            assigneddays.push(timetableService.data.days[i]);
        }

        return assigneddays;
    }

    classroomids: TimetableClassroomId[] = []
    get classrooms() {
        const classrooms = [];

        for (const classroomId of this.classroomids) {
            const classroom = timetableService.data.classrooms[classroomId];

            classrooms.push(classroom);
        }

        return classrooms;
    }
    
    lessonid: TimetableLessonId = ""
    get lesson() {
        return timetableService.data.lessons[this.lessonid];
    }

    get periodSpan() {
        const start = new Number(this.period) as number;
        const end = (start + this.lesson.durationperiods) - 1;

        return `${start}-${end}`;
    }
}