import { timetableService } from "./serviceProvider"

/**
    The interface for a api data column
*/
interface TimetableApiDataColumn {
    id: string
    type: string
    name: string
    table: string | null
    subcolumns: [{
        id: string
        type: string
        name: string
    }] | null
}

/**
    The interface for a timetable api data json body
*/
export interface TimetableApiDataJson {
    r: {
        rights: {
            subjects: boolean
            classes: boolean
            teachers: boolean
            classrooms: boolean
            students: boolean
            igroups: boolean
            classroomsupervision: boolean
            teachers_summary: boolean
            classes_summary: boolean
            classrooms_summary: boolean
            igroups_summary: boolean
        },
        dbiAccessorRes: null | {
            type: string
            dbid: string
            tables: [{
                id: string
                def: {
                    id: string
                    name: string
                    item_name: string
                    icon: string
                }
                cdefs: [TimetableApiDataColumn]
                data_rows: [{}],
                data_columns: [string]
            }]
        }
        error: string | null
    }
}


/**
    The interface for a timetable data store
    - This defines the structure for the container in which all
    timetable data entries are stored.
*/
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



/**
    The interface for a timetable query
*/
export interface TimetableQuery {
    class?: TimetableClass | TimetableClassId
    subjectQuery?: string
    day?: TimetableDayId | number
    periodStart?: TimetablePeriodId | number
    periodEnd?: TimetablePeriodId | number
    count?: number
}


/**
    The interface for a class timetable query
*/
interface ClassTimetableQuery {
    subjectQuery?: string
    day?: TimetableDayId | number
    periodStart?: TimetablePeriodId | number
    periodEnd?: TimetablePeriodId | number
    count?: number
}

/**
    The interface for a class timetable
*/
export class ClassTimetable {
    id: TimetableClassId = "";
    private cards: TimetableCard[] = [];
    
    constructor(classId: TimetableClassId) {
        this.id = classId;
        this.cards = Object.values(timetableService.data.cards)
            .filter(card => card.lesson.classids.includes(classId));
    }
    
    getAll() {
        return this.cards
            .sort((cardA, cardB) => cardA.days.indexOf("1") - cardB.days.indexOf("1"));
    }

    getOnDay(dayId: TimetableDayId | number) {
        dayId = dayId.toString() as TimetableDayId;

        return this.cards
            .filter(card => card.assignedDays[0].id == dayId)
            .sort((cardA, cardB) => Number(cardA.period) - Number(cardB.period));
    }

    query(query: ClassTimetableQuery) {
        return this.cards
            .filter(card => query.subjectQuery != null ? card.lesson.subject.name.toLowerCase().includes(query.subjectQuery.toLowerCase()) : true)
            .filter(card => query.day != null ? card.assignedDays[0].id == query.day : true)
            .filter(card => {
                if (query.periodStart == null) return true;
                const [start] = card.periodSpan;

                return Number(query.periodStart) >= start;
            })
            .filter(card => {
                if (query.periodEnd == null) return true;
                const [_, end] = card.periodSpan;

                return Number(query.periodEnd) <= end;
            })
            .filter(card => query.count != null ? card.lesson.count >= query.count : true);
    }
}


/** The ID string for a timetable bell */
export declare type TimetableBellId = string

/**
    The interface for a timetable bell
*/
export interface TimetableBell {
    id: TimetableBellId
    perioddata: {}
    breakdata: {}
}


/** The ID string for a timetable day definition */
export declare type TimetableBreakId = string

/**
    The interface for a timetable break
*/
export interface TimetableBreak {
    id: TimetableBreakId
}


/** The ID string for a timetable building */
export declare type TimetableBuildingId = string

/**
    The interface for a timetable building
*/
export interface TimetableBuilding {
    id: TimetableBuildingId
}


/** The ID string for a timetable card */
export declare type TimetableCardId = string

/**
    The interface for a timetable card
*/
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

        return [start, end];
    }
}

/**
    The interface for a timetable change entry
*/
export interface TimetableChangeEntry {
    dayLetter: string
    date: string
    class: string
    period: string
    teacher: string
    info: string
}


/** The ID string for a timetable class */
export declare type TimetableClassId = string

/**
    The class for a timetable class
*/
export class TimetableClass {
    id: TimetableClassId = "";
    name: string = "";
    short: string = "";
    bell: string = "";
    color: string = "";
    customfields: [] = [];
    printsubjectpictures: boolean = false;
    edupageid: string = "";
    
    classroomid: string = "";
    classroomids: TimetableClassroomId[] = [];
    get classroom(): TimetableClassroom | null {
        return timetableService.data.classrooms[this.classroomid] || null;
    }

    get classrooms() {
        const classrooms: TimetableClassroom[] = [];
        for (const classroomid of this.classroomids) {
            const classroom = timetableService.data.classrooms[classroomid];

            classrooms.push(classroom);
        }

        return classrooms;
    }
    
    teacherid: string = "";
    teacherids: TimetableTeacherId[] = [];
    get teacher(): TimetableTeacher | null {        
        return timetableService.data.teachers[this.teacherid] || null;
    }

    get teachers(): TimetableTeacher[] {
        const teachers: TimetableTeacher[] = [];

        for (const teacherId of this.teacherids) {
            const teacher = timetableService.data.teachers[teacherId];

            teachers.push(teacher);
        }

        return teachers;
    }

    #timetable: ClassTimetable | null = null;
    get timetable() {
        if (!this.#timetable) {
            this.#timetable = new ClassTimetable(this.id);
        }

        return this.#timetable;
    }
}


/** The ID string for a timetable classroom */
export declare type TimetableClassroomId = string

/**
    The interface for a timetable classroom
*/
export interface TimetableClassroom {
    id: TimetableClassroomId
    name: string
    short: string
    buildingid: TimetableBuildingId
    color: string
}


/** The ID string for a timetable card */
export declare type TimetableClassroomSupervisionId = string

/**
    The interface for a timetable classroom supervision
*/
export interface TimetableClassroomSupervision {
    id: TimetableClassroomSupervisionId
}


/** The ID string for a timetable day */
export declare type TimetableDayId = string

/**
    The interface for a timetable day
*/
export interface TimetableDay {
    id: TimetableDayId
    name: string
    short: string
}


/** The ID string for a timetable day definition */
export declare type TimetableDayDefinitionId = string

/**
    The class for a timetable day definition
*/
export class TimetableDayDefinition {
    id: TimetableDayDefinitionId = ""
    vals: string[] = [];

    get days() {
        const vals = [];
        for (const valEntry of this.vals) {
            const days = [];

            var i = -1;
            for (const digit of valEntry) {
                i++;

                if (digit == "0") continue;
                const day = timetableService.data.days[i];

                days.push(day);
            }

            vals.push(days);
        }

        return vals;
    }
}


/** The ID string for a timetable division */
export declare type TimetableDivisionId = string

export interface TimetableDivision {
    id: TimetableDivisionId
    classid: string
    ascttdivision: string
    groupids: [string]
}


/** The ID string for a timetable global variable */
export declare type TimetableGlobalId = string

/**
    The interface for a timetable global
*/
export interface TimetableGlobal {
    id: TimetableGlobalId
    name: string
    settings: {draft_options: {}}
    customfields: []
    reg_name: string
    tt_datefrom: string
}


/** The ID string for a timetable group */
export declare type TimetableGroupId = string

/**
    The interface for a timetable group
*/
export interface TimetableGroup {
    id: TimetableGroupId
    name: string
    classid: string
    entireclass: boolean
    ascttdivision: string
    divisionid: string
    color: string
}


/** The ID string for a timetable lesson */
export declare type TimetableLessonId = string

/**
    The class for a timetable lesson
*/
export class TimetableLesson {
    id: TimetableLessonId = "";
    count: number = 0;
    durationperiods: number = 0;
    terms: string = "";
    seminargroup: any | null = null;
    texts: any | null = null;
    groupnames: string[] = [];
    classdata: {} = {};
    
    
    termsdefid: TimetableTermDefinitionId = "";
    get term() {
        return timetableService.data.termsdefs[this.termsdefid];
    }

    weeksdefid: TimetableWeekDefinitionId = "";
    get weekdef() {
        return timetableService.data.weeksdefs[this.weeksdefid];
    }

    daysdefid: TimetableDayDefinitionId = "";
    get daysdef() {
        return timetableService.data.daysdefs[this.daysdefid];
    }

    subjectid: TimetableSubjectId = "";
    get subject() {
        return timetableService.data.subjects[this.subjectid];
    }

    teacherids: TimetableTeacherId[] = [];
    get teachers() {
        const teachers = [];

        for (const teacherId of this.teacherids) {
            const teacher = timetableService.data.teachers[teacherId];

            teachers.push(teacher);
        }

        return teachers;
    }

    groupids: TimetableGroupId[] = [];
    get groups() {
        const groups = [];

        for (const groupId of this.groupids) {
            const group = timetableService.data.groups[groupId];

            groups.push(group);
        }

        return groups;
    }

    classids: TimetableClassId[] = [];
    get classes() {
        const classes = [];

        for (const classId of this.classids) {
            const classObj = timetableService.data.classes[classId];

            classes.push(classObj);
        }

        return classes;
    }

    studentids: TimetableStudentId[] = [];
    get students() {
        const students = [];

        for (const studentId of this.studentids) {
            const student = timetableService.data.students[studentId];

            students.push(student);
        }

        return students;
    }
}

/** The ID string for a timetable period */
export declare type TimetablePeriodId = string

/** The numeric string representing a timetable period */
export declare type TimetablePeriodStr = string

/**
    The interface for a timetable period
*/
export interface TimetablePeriod {
    id: TimetablePeriodId
    period: TimetablePeriodStr
    name: string
    short: string
    starttime: string
    endtime: string
    daydata: {}
    printinsummary: boolean
    printinteacher: boolean,
    printinclass: boolean,
    printinclassroom: boolean,
    printonlyinbells: []
}



/** The ID string for a timetable student */
export declare type TimetableStudentId = string

/**
    The interface for a timetable student
*/
export interface TimetableStudent {
    id: TimetableStudentId
}


/** The ID string for a timetable student subject */
export declare type TimetableStudentSubjectId = string

/**
    The interface for a timetable student subject
*/
export interface TimetableStudentSubject {
    id: TimetableStudentSubjectId
}


/** The ID string for a timetable subject */
export declare type TimetableSubjectId = string

/**
    The interface for a timetable subject
*/
export interface TimetableSubject {
    id: TimetableSubjectId
    name: string
    short: string
    color: string
    picture_url: string
    contract_weight: number
    edupageid: string
}


/** The ID string for a timetable teacher */
export declare type TimetableTeacherId = string

/**
    The interface for a timetable teacher
*/
export interface TimetableTeacher {
    id: TimetableTeacherId
    short: string
    bell: string
    color: string
    fontcolorprint: string
    fontcolorprint2: string
    customfields: [{
        field: string
        value: string
    }]
    edupageid: string
    classids: TimetableClassId[]
}


/** The ID string for a timetable term */
export declare type TimetableTermId = string

/**
    The interface for a timetable term
*/
export interface TimetableTerm {
    id: TimetableTermId
    name: string
    short: string
}


/** The ID string for a timetable term definition */
export declare type TimetableTermDefinitionId = string

/**
    The class for a timetable term definition
*/
export class TimetableTermDefinition {
    id: TimetableTermDefinitionId = ""
    vals: string[] = []

    get terms() {
        const termObjs = [];

        var i = 0;
        for (const term of Object.entries(timetableService.data.terms)) {
            const val = this.vals[i];

            if (val === "1") {
                termObjs.push(term);
            }

            i++;
        }

        return termObjs;
    }
}


/** The ID string for a timetable week */
export declare type TimetableWeekId = string

/**
    The interface for a timetable week
*/
export interface TimetableWeek {
    id: TimetableWeekId
    name: string
    short: string
}


/** The ID string for a timetable week definition */
export declare type TimetableWeekDefinitionId = string

/**
    The class for a timetable week definition
*/
export class TimetableWeekDefinition {
    id: TimetableWeekDefinitionId = ""
    vals: string[] = []

    get weeks() {
        const weekObjs = [];

        var i = 0;
        for (const week of Object.entries(timetableService.data.weeks)) {
            const val = this.vals[i];

            if (val === "1") {
                weekObjs.push(week);
            }

            i++;
        }

        return weekObjs;
    }
}