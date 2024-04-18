import type { TimetableClassId } from "./TimetableClass"
import type { TimetableDayDefinitionId } from "./TimetableDayDefinition"
import type { TimetableGroupId } from "./TimetableGroup"
import type { TimetableStudentId } from "./TimetableStudent"
import type { TimetableSubjectId } from "./TimetableSubject"
import type { TimetableTeacherId } from "./TimetableTeacher"
import type { TimetableTermDefinitionId } from "./TimetableTermDefinition"
import type { TimetableWeekDefinitionId } from "./TimetableWeekDefinition"

/** The ID string for a timetable lesson */
export declare type TimetableLessonId = string

export interface TimetableLesson {
    id: TimetableLessonId
    subjectid: TimetableSubjectId
    teacherids: TimetableTeacherId[]
    groupids: TimetableGroupId[]
    classids: TimetableClassId[]
    count: number
    durationperiods: number
    termsdefid: TimetableTermDefinitionId
    weeksdefid: TimetableWeekDefinitionId
    daysdefid: TimetableDayDefinitionId
    terms: string
    seminargroup: any | null
    texts: any | null
    studentids: TimetableStudentId[]
    groupnames: [string]
    classdata: {}
}