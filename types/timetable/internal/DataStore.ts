import type { TimetableBellId, TimetableBell } from "../Bell"
import type { TimetableBreakId, TimetableBreak } from "../Break"
import type { TimetableBuildingId, TimetableBuilding } from "../Building"
import type { TimetableCardId, TimetableCard } from "../Card"
import type { TimetableClassId, TimetableClass } from "../Class"
import type { TimetableClassroomId, TimetableClassroom } from "../Classroom"
import type { TimetableClassroomSupervisionId, TimetableClassroomSupervision } from "../ClassroomSupervision"
import type { TimetableDayId, TimetableDay } from "../Day"
import type { TimetableDivisionId, TimetableDivision } from "../Division"
import type { TimetableGlobalId, TimetableGlobal } from "../Global"
import type { TimetableGroupId, TimetableGroup } from "../Group"
import type { TimetableLessonId, TimetableLesson } from "../Lesson"
import type { TimetablePeriodId, TimetablePeriod } from "../Period"
import type { TimetableQuery } from "../Query"
import type { TimetableStudentId, TimetableStudent } from "../Student"
import type { TimetableStudentSubjectId, TimetableStudentSubject } from "../StudentSubject"
import type { TimetableSubjectId, TimetableSubject } from "../Subject"
import type { TimetableTeacherId, TimetableTeacher } from "../Teacher"
import type { TimetableTermId, TimetableTerm } from "../Term"
import type { TimetableWeekId, TimetableWeek } from "../Week"
import type { TimetableDayDefinitionId, TimetableDayDefinition } from "../definitions/DayDefinition"
import type { TimetableTermDefinitionId, TimetableTermDefinition } from "../definitions/TermDefinition"
import type { TimetableWeekDefinitionId, TimetableWeekDefinition } from "../definitions/WeekDefinition"
import type { ApiTimetable } from "./ApiConfigDataJson"
import { QueryError } from "./QueryError"


/**
    The interface for a timetable data store
    - This defines the structure for the container in which all
    timetable data entries are stored.
*/
export class TimetableDataStore {
    constructor(timetableEntry: ApiTimetable) {
        Object.assign(this, timetableEntry);
    }

    globals: Record<TimetableGlobalId, TimetableGlobal> = {};
    periods: Record<TimetablePeriodId, TimetablePeriod> = {};
    breaks: Record<TimetableBreakId, TimetableBreak> = {};
    bells: Record<TimetableBellId, TimetableBell> = {};
    daysdefs: Record<TimetableDayDefinitionId, TimetableDayDefinition> = {};
    weeksdefs: Record<TimetableWeekDefinitionId, TimetableWeekDefinition> = {};
    termsdefs: Record<TimetableTermDefinitionId, TimetableTermDefinition> = {};
    days: Record<TimetableDayId, TimetableDay> = {};
    weeks: Record<TimetableWeekId, TimetableWeek> = {};
    terms: Record<TimetableTermId, TimetableTerm> = {};
    buildings: Record<TimetableBuildingId, TimetableBuilding> = {};
    classrooms: Record<TimetableClassroomId, TimetableClassroom> = {};
    classes: Record<TimetableClassId, TimetableClass> = {};
    subjects: Record<TimetableSubjectId, TimetableSubject> = {};
    teachers: Record<TimetableTeacherId, TimetableTeacher> = {};
    groups: Record<TimetableGroupId, TimetableGroup> = {};
    divisions: Record<TimetableDivisionId, TimetableDivision> = {};
    students: Record<TimetableStudentId, TimetableStudent> = {};
    lessons: Record<TimetableLessonId, TimetableLesson> = {};
    studentsubjects: Record<TimetableStudentSubjectId, TimetableStudentSubject> = {};
    cards: Record<TimetableCardId, TimetableCard> = {};
    classroomsupervisions: Record<TimetableClassroomSupervisionId, TimetableClassroomSupervision> = {};
}