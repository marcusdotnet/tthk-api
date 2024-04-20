import { timetableService } from "../../serviceProvider";
import type { TimetableCard } from "./Card";
import type { TimetableClassId } from "./Class";
import type { TimetableDayId } from "./Day";
import type { TimetableQuery } from "./Query";

/**
    The interface for a class timetable
*/
export class ClassTimetable {
    id: TimetableClassId = "";
    #cards: TimetableCard[] = [];
    
    constructor(classId: TimetableClassId) {
        this.id = classId;
        this.#cards = (Object.values(timetableService.data.cards) as TimetableCard[])
            .filter(card => card.lesson.classids.includes(classId));
    }

    get entries() {
        return this.#cards;
    }

    /**
     * 
     * @param query The options object that contains the query parameters
     * @returns An array of timetable entries for this class
     */
    query(query: TimetableQuery) {
        query.class = this.id;

        return timetableService.query(query);
    }
}