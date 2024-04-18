import type { TimetableBell, TimetableBellId } from "./TimetableBell"
import type { TimetableBreak, TimetableBreakId } from "./TimetableBreak"
import type { TimetableBuilding, TimetableBuildingId } from "./TimetableBuilding"
import type { TimetableCard, TimetableCardId } from "./TimetableCard"
import type { TimetableClass, TimetableClassId } from "./TimetableClass"
import type { TimetableClassroom, TimetableClassroomId } from "./TimetableClassroom"
import type { TimetableClassroomSupervision, TimetableClassroomSupervisionId } from "./TimetableClassroomSupervision"
import type { TimetableDay, TimetableDayId } from "./TimetableDay"
import type { TimetableDayDefinition, TimetableDayDefinitionId } from "./TimetableDayDefinition"
import type { TimetableDivision, TimetableDivisionId } from "./TimetableDivision"
import type { TimetableGlobal, TimetableGlobalId } from "./TimetableGlobal"
import type { TimetableGroup, TimetableGroupId } from "./TimetableGroup"
import type { TimetableLesson, TimetableLessonId } from "./TimetableLesson"
import type { TimetablePeriod, TimetablePeriodId } from "./TimetablePeriod"
import type { TimetableStudent, TimetableStudentId } from "./TimetableStudent"
import type { TimetableStudentSubject, TimetableStudentSubjectId } from "./TimetableStudentSubject"
import type { TimetableSubject, TimetableSubjectId } from "./TimetableSubject"
import type { TimetableTeacher, TimetableTeacherId } from "./TimetableTeacher"
import type { TimetableTerm, TimetableTermId } from "./TimetableTerm"
import type { TimetableTermDefinition, TimetableTermDefinitionId } from "./TimetableTermDefinition"
import type { TimetableWeek, TimetableWeekId } from "./TimetableWeek"
import type { TimetableWeekDefinition, TimetableWeekDefinitionId } from "./TimetableWeekDefinition"

export interface TimetableDataStore {
    globals: Record<TimetableGlobalId, TimetableGlobal>
    periods: Record<TimetablePeriodId, TimetablePeriod>
    breaks: Record<TimetableBreakId, TimetableBreak>
    bells: Record<TimetableBellId, TimetableBell>
    daysdefs: Record<TimetableDayDefinitionId, TimetableDayDefinition>
    weeksdefs: Record<TimetableWeekDefinitionId, TimetableWeekDefinition>
    termsdefs: Record<TimetableTermDefinitionId, TimetableTermDefinition>
    days: Record<TimetableDayId, TimetableDay>
    weeks: Record<TimetableWeekId, TimetableWeek>
    terms: Record<TimetableTermId, TimetableTerm>
    buildings: Record<TimetableBuildingId, TimetableBuilding>
    classrooms: Record<TimetableClassroomId, TimetableClassroom>
    classes: Record<TimetableClassId, TimetableClass>
    subjects: Record<TimetableSubjectId, TimetableSubject>
    teachers: Record<TimetableTeacherId, TimetableTeacher>
    groups: Record<TimetableGroupId, TimetableGroup>
    divisions: Record<TimetableDivisionId, TimetableDivision>
    students: Record<TimetableStudentId, TimetableStudent>
    lessons: Record<TimetableLessonId, TimetableLesson>
    studentsubjects: Record<TimetableStudentSubjectId, TimetableStudentSubject>
    cards: Record<TimetableCardId, TimetableCard>
    classroomsupervisions: Record<TimetableClassroomSupervisionId, TimetableClassroomSupervision>
}