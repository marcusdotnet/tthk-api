import type { TimetableClassroomId } from "./TimetableClassroom"
import type { TimetableLessonId } from "./TimetableLesson"

/** The ID string for a timetable card */
export declare type TimetableCardId = string

export interface TimetableCard {
    id: TimetableCardId
    lessonid: TimetableLessonId
    locked: boolean
    period: boolean
    days: string
    weeks: string
    classroomids: TimetableClassroomId[]
}