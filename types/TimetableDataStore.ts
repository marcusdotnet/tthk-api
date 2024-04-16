import type { TimetableDataColumn } from "./TimetableDataColumn"

export interface TimetableDataStore {
    globals: null | [{
        id: string
        name: string
        settings: {draft_options: {}}
        customfields: []
        reg_name: string
        tt_datefrom: string
    }]
    periods: null | [{
        id: string
        period: string
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
    }]
    breaks: null | [{}]
    bells: null | [{
        id: string
        perioddata: {}
        breakdata: {}
    }]
    daysdefs: null | [{
        id: string
        vals: [string]
    }]
    weeksdefs: null | [{
        id: string
        vals: [string]
    }]
    termsdefs: null | [{
        id: string
        vals: [string]
    }]
    days: null | [{
        id: string
        name: string
        short: string
    }]
    weeks: null | [{
        id: string
        name: string
        short: string
    }]
    terms: null | [{
        id: string
        name: string
        short: string
    }]
    buildings: null | [{}]
    classrooms: null | [{
        id: string
        name: string
        short: string
        buildingid: string
        color: string
    }]
    classes: null | [{
        id: string
        name: string
        short: string
        teacherid: string
        classroomids: [string]
        bell: string
        color: string
        customfields: []
        printsubjectpictures: boolean
        edupageid: string
        classroomid: string
        teacherids: []
    }]
    subjects: null | [{
        id: string
        name: string
        short: string
        color: string
        picture_url: string
        contract_weight: number
        edupageid: string
    }]
    teachers: null | [{
        id: string
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
        classids: []
    }]
    groups: null | [{
        id: string
        name: string
        classid: string
        entireclass: boolean
        ascttdivision: string
        divisionid: string
        color: string
    }]
    divisions: null | [{
        id: string
        classid: string
        ascttdivision: string
        groupids: [string]
    }]
    students: null | [{}]
    lessons: null | [{
        id: string
        subjectid: string
        teacherids: [string]
        groupids: [string]
        classids: [string]
        count: number
        durationperiods: number
        termsdefid: string
        weeksdefid: string
        daysdefid: string
        terms: string
        seminargroup: any | null
        texts: any | null
        studentids: []
        groupnames: [string]
        classdata: {}
    }]
    studentsubjects: null | [{}]
    cards: null | [{
        id: string
        lessonid: string
        locked: boolean
        period: boolean
        days: string
        weeks: string
        classroomids: [string]
    }]
    classroomsupervisions: null | [{}]
}