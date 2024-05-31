import { timetableService } from "../../serviceProvider"
import type { TimetableClass, TimetableClassId } from "./Class"

/** The ID string for a timetable teacher */
export declare type TimetableTeacherId = string

export const TABLE_NAME = "teachers";

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
    get taught_classes() {
        const taughtClasses = timetableService.query(this.ttid, "classes", {
            id: (cl: TimetableClass) => {
                return cl.teacherids.includes(this.id); // weird bug here, fix later, painnnnnn, the painnnnnn
            }
        }) as TimetableClass[];

        return taughtClasses;
    }

    get dto() {
        return {
            id: this.id,
            name: this.short,
            color: this.color,
            taught_classes: this.classids
        }
    }

    // get prettyDto() {
    //     const prettyDtoObj: any = {
    //         id: this.id,
    //         name: this.short,
    //         color: this.color,
    //     };

    //     prettyDtoObj.taught_classes = this.taught_classes.map(classObj => classObj?.name || classObj?.short);
    //     return prettyDtoObj;
    // }
}