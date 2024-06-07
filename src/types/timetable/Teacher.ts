import { timetableService } from "../../serviceProvider"
import type { TimetableClass, TimetableClassId } from "./Class"
import { TimetableDataStore } from "./internal/DataStore";
import { DataTableObject } from "./internal/DataTableObject";

/** The ID string for a timetable teacher */
export declare type TimetableTeacherId = string

export const TABLE_NAME = "teachers";

/**
    The interface for a timetable teacher
*/
export class TimetableTeacher extends DataTableObject {
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

    get taught_classes() {
        const taughtClasses = timetableService.query(this.ttid, "classes", {
            teacherids: [this.id]
        });

        return taughtClasses;
    }

    get dto() {
        return {
            id: this.id,
            name: this.short,
            color: this.color,
            taught_classes: this.taught_classes.map(classObj => classObj.id)
        }
    }
}