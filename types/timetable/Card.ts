import { timetableService } from "../../serviceProvider"
import type { TimetableClassroom, TimetableClassroomId } from "./Classroom"
import type { TimetableDay } from "./Day"
import type { TimetableLesson, TimetableLessonId } from "./Lesson"
import type { TimetableTeacher } from "./Teacher"
export const TABLE_NAME = "cards";

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
            subject: this.lesson.subjectid,
            teachers: this.lesson.teacherids,
            rooms: this.classroomids,
            period_span: this.periodSpan,
            days: this.assignedDays
        }
    }

    // get prettyDto() {
    //     const lesson = this.lesson;
    //     const subject = lesson.subject;

    //     const periodSpan = this.periodSpan;
    //     const [startPeriod, endPeriod] = this.periodSpan;

    //     const prettyDtoObj: any = {
    //         id: this.id,
    //         subject: (subject?.name || subject?.short || undefined),
    //         time_span: this.timeSpan.join("-"),
    //         period_span: startPeriod != endPeriod ? periodSpan.join("-") : startPeriod.toString(),
    //     }


    //     const prettyDays = this.assignedDays.map(ad => ad?.name || ad?.short);
    //     if (prettyDays.length > 1) {
    //         prettyDtoObj.days = prettyDays;
    //     }
    //     else {
    //         prettyDtoObj.day = prettyDays[0];
    //     }

    //     const prettyClassrooms = this.classrooms.map(room => room?.short || room?.name);
    //     if (this.classroomids.length > 1) {
    //         prettyDtoObj.rooms = prettyClassrooms;
    //     }
    //     else if (this.classroomids.length == 1) {
    //         prettyDtoObj.room = prettyClassrooms[0]
    //     }

    //     const prettyTeachers = lesson.teachers.map(teacher => teacher?.short || "no_name");

    //     if (prettyTeachers.length > 1) {
    //         prettyDtoObj.teachers = prettyTeachers;
    //     }
    //     else if (prettyTeachers.length == 1) {
    //         prettyDtoObj.teacher = prettyTeachers[0];
    //     }

    //     const prettyClasses = lesson.classes.map(cl => cl?.name || cl?.short);
    //     if (lesson.classids.length > 1) {
    //         prettyDtoObj.classes = prettyClasses
    //     }
    //     else if (lesson.classids.length == 1) {
    //         prettyDtoObj.class = prettyClasses[0];
    //     }

    //     return prettyDtoObj;
    // }
}