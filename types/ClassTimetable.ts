import timetableService from "../timetableService";
import type { TimetableCard } from "./TimetableCard";
import type { TimetableClassId } from "./TimetableClass";
import type { TimetableDayId } from "./TimetableDay";
import type { TimetablePeriodId } from "./TimetablePeriod";

interface ClassTimetableQuery {
    subjectQuery?: string
    day?: TimetableDayId | number
    periodStart?: TimetablePeriodId | number
    periodEnd?: TimetablePeriodId | number
    count?: number
}

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