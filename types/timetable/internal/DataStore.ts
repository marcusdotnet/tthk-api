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

    /**
     * Get all valid class names
     * @returns An array of all class names
     */
    getClassNames(): string[] {
        return Object.values(this.classes).map(cl => cl.name) as string[];
    }

    /**
     * @param classId
     * @returns A class if it exists, otherwise undefined
     */
    findClassById(classId: TimetableClassId): TimetableClass | undefined {
        return Object.values(this.classes).find(cl => cl.id == classId);
    }

    /**
     * @param roomId
     * @returns A room if it exists, otherwise undefined
     */
    findRoomById(roomId: TimetableClassroomId): TimetableClassroom | undefined {
        return Object.values(this.classrooms).find(cr => cr.id == roomId);
    }

    /**
     * 
     * @param className 
     * @returns An array of classes whose name matches the query
     */
    queryClass(className: string): TimetableClass[] {
        className = className.toLowerCase();

        const foundClasses: TimetableClass[] = Object.values(this.classes).filter(cl =>
            cl.name.toLowerCase().includes(className)
            ||
            cl.short.toLowerCase().includes(className)
        );

        return foundClasses;
    }

    /**
     * 
     * @param roomQuery 
     * @returns An array of classes whose name matches the query
     */
    queryRoom(roomQuery: string): TimetableClassroom[] {
        roomQuery = roomQuery.toLowerCase();

        const foundRooms: TimetableClassroom[] = Object.values(this.classrooms).filter(cr =>
            cr.name.toLowerCase().includes(roomQuery)
            ||
            cr.short.toLowerCase().includes(roomQuery)
        );

        return foundRooms;
    }

    /**
     * 
     * @param query The options object that contains the query parameters
     * @returns An array of timetable entries
     */
    queryTimetable(query: TimetableQuery): TimetableCard[] {
        if (query.class) {
            const classByName = this.queryClass(query.class);
            const classById = this.findClassById(query.class);

            if (!classByName && !classById) {
                throw new QueryError("Class not found!");
            }
        }

        if (query.room) {
            const roomById = this.data.classrooms[query.room];

            if (!roomById) {
                const roomByName = Object.values(this.data.classrooms).find(r => {
                    return r.name.toLowerCase().includes(query.room?.toLowerCase() as TimetableClassroomId) || r?.short.toLowerCase().includes(query.room?.toLowerCase() as TimetableClassroomId);
                });

                if (!roomByName) {
                    throw new QueryError("Room not found!");
                }
                else {
                    query.room = roomByName.id;
                }
            }
        }

        var filteredTimetable = Object.values(this.data.cards)
            .filter(card => {
                if (query.class == null) return true;

                return card.lesson.classids.includes(query.class as TimetableClassId);
            })
            .filter(card => query.subjectQuery != null ? card.lesson.subject.name.toLowerCase().includes(query.subjectQuery.toLowerCase()) : true)
            .filter(card => {
                if (query.day == null) return card.days != "";
                const dayId: string | null = dayTranslations[query.day.toString().toLowerCase()];
                if (dayId == null) throw new QueryError("That is not a valid day!")

                return card?.assignedDays.find(d => d.id == dayId) != null;
            })
            .filter(card => {
                if (query.periodStart == null) return true;
                if (query.periodStart < 0) throw new QueryError("Starting period can't be less than 0!");
                const [start] = card.periodSpan;

                return query.periodStart >= start;
            })
            .filter(card => {
                if (query.periodEnd == null) return true;
                if (query.periodStart && query.periodEnd < query.periodStart) throw new QueryError("Ending period must be >= to the starting period!");
                const [_, end] = card.periodSpan;

                return query.periodEnd <= end;
            })
            .filter(card => query.count != null ? card.lesson.count >= query.count : true)
            .filter(card => query.room != null ? card.classroomids.includes(query.room) : true);

        if (query.day) {
            filteredTimetable.sort((a, b) => {
                return a.period - b.period;
            });
        }

        return filteredTimetable;
    }
}