import type { TimetableClassId } from "./Class"

/** The ID string for a timetable teacher */
export declare type TimetableTeacherId = string

/**
    The interface for a timetable teacher
*/
export class TimetableTeacher {
    ttid: string = ""
    id: TimetableTeacherId = ""
    short: string = ""
    bell: string = ""
    color: string = ""
    fontcolorprint: string = ""
    fontcolorprint2: string = ""
    customfields: [{
        field: string
        value: string
    }] | null = null
    edupageid: string = ""
    classids: TimetableClassId[] = []

    get dto() {
        return {
            id: this.id,
            name: this.short,
            color: this.color,
            taught_classes: this.classids
        }
    }
}