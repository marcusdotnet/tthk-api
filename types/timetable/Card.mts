import { timetableService } from "../../serviceProvider"
import type { TimetableClassroomId } from "./Classroom"
import type { TimetableLessonId } from "./Lesson"

/** The ID string for a timetable card */
export declare type TimetableCardId = string

/**
    The interface for a timetable card
*/
export class TimetableCard {
    id: TimetableCardId = ""
    locked: boolean = false
    period: number = 0
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

        return [start, end];
    }

    get timeSpan(): string[] {
        const [start, end] = this.periodSpan;
        const startTime = timetableService.data.periods[start].starttime;
        const endTime = timetableService.data.periods[end ? end : start].endtime;
    
        return [startTime, endTime];
    }
}
export default () => new TimetableCard();