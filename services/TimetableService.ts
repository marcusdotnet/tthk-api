import { TimetableCard } from "../types/timetable/Card";
import { TimetableClass, type TimetableClassId } from "../types/timetable/Class";
import type { TimetableClassroomId } from "../types/timetable/Classroom";
import type { TimetableDayId } from "../types/timetable/Day";
import { TimetableLesson } from "../types/timetable/Lesson";
import type { TimetableQuery } from "../types/timetable/Query";
import { TimetableDayDefinition } from "../types/timetable/definitions/DayDefinition";
import { TimetableTermDefinition } from "../types/timetable/definitions/TermDefinition";
import { TimetableWeekDefinition } from "../types/timetable/definitions/WeekDefinition";
import type { TimetableApiDataJson } from "../types/timetable/internal/ApiDataJson";
import type { TimetableDataStore } from "../types/timetable/internal/DataStore";
import { QueryError } from "../types/timetable/internal/QueryError";
import type { TimetableServiceOptions } from "../types/timetable/internal/ServiceOptions";

const instantiateDataObj: Record<string, any> = {
    classes: () => new TimetableClass(),
    lessons: () => new TimetableLesson(),
    daysdefs: () => new TimetableDayDefinition(),
    weeksdefs: () => new TimetableWeekDefinition(),
    termsdefs: () => new TimetableTermDefinition(),
    cards: () => new TimetableCard()
};

/**
 * Dictionary of day translations
 */
const dayTranslations: Record<string, string> = {
    "1": "0",
    "e": "0",
    "ep": "0",
    "esmaspaev": "0",
    "mon": "0",
    "monday": "0",

    "2": "1",
    "t": "1",
    "tp": "1",
    "teisipaev": "1",
    "tue": "1",
    "tuesday": "1",

    "3": "2",
    "k": "2",
    "kp": "2",
    "kolmapaev": "2",
    "wed": "2",
    "wednesday": "2",

    "4": "3",
    "n": "3",
    "np": "3",
    "neljapaev": "3",
    "thu": "3",
    "thursday": "3",

    "5": "4",
    "r": "4",
    "reede": "4",
    "fri": "4",
    "friday": "4",

    "6": "5",
    "l": "5",
    "laupaev": "5",
    "sat": "5",
    "saturday": "5"
}



/**
 * The service that makes accessing timetable data easy
 * and allows for querying capabilities
 */
export class TimetableService {
    options: TimetableServiceOptions | null = null;
    data: TimetableDataStore = {} as TimetableDataStore;

    classLookup: any = {};


    configure(options: TimetableServiceOptions) {
        this.options = options;
    }

    async fetchData() {
        const options = this.options as TimetableServiceOptions;
        this.data = {} as TimetableDataStore;

        const response = await fetch(options.eduPageTimetableUrl, {
            method: "POST",
            body: JSON.stringify({
                "__args": [null, options.schoolId],
                "__gsh": options.gsh
            })
        });

        
        const data = this.data
        const jsonData: TimetableApiDataJson = await response.json();

        jsonData!.r!.dbiAccessorRes!.tables.forEach(table => {
            const rows = table.data_rows as [{id: string}];
            const tableData: any = {};
            const instantianteFunc = instantiateDataObj[table.id] as unknown as any;

            for (var row of rows) {
                if (typeof instantianteFunc == "function") {
                    const rowObj = instantianteFunc();
                    Object.assign(rowObj, row);

                    tableData[row.id] = rowObj;
                    continue;
                }

                tableData[row.id] = row;
            }
            
            
            //@ts-ignore
            data[table.id] = tableData;
            
            return data;
        });


        for (const classData of Object.values(data.classes as unknown as TimetableClass[])) {
            const name = classData.name.trim().toLowerCase();

            const classObj = new TimetableClass();
            Object.assign(classObj, classData);            

            this.classLookup[name] = classData.id;
        }
    }

    /**
     * Get all valid class names
     * @returns An array of all class names
     */
    getClassNames(): [string] {
        return Object.keys(this.classLookup) as [string];
    }

    /**
     * 
     * @param className 
     * @returns A class whose name is {className}
     */
    getClassByName(className: string): TimetableClass | null  {
        const id: TimetableClassId | null = this.classLookup[className.toLowerCase()] as TimetableClassId;
        if (!id) return null;
        const classData: TimetableClass | null = this.data.classes[id]
        if (!classData) return null;
        
        return classData;
    }

    /**
     * 
     * @param classId 
     * @returns true if a class with an id of {classId} exists, false otherwise
     */
    checkClassExist(classId: TimetableClassId): boolean {
        return Object.values(this.classLookup).find(c => c == classId) != null;
    }

    /**
     * 
     * @param query The options object that contains the query parameters
     * @returns An array of timetable entries
     */
    query(query: TimetableQuery): TimetableCard[] {
        if (query.class) {
            if (typeof query.class == "string") {
                const idByName = this.classLookup[query.class.toLowerCase() as TimetableClassId];

                if (idByName) {
                    query.class = idByName;
                }
                else {
                    const classById = this.data.classes[query.class];

                    if (classById) {
                        query.class = query.class;
                    }
                }
                
                if (!this.data.classes[query.class as TimetableClassId]) {
                    throw new QueryError("That class doesn't exist!");
                }
            }
            else {
                if (query.class?.id && this.data.classes[query!.class!.id as TimetableClassId]) {
                    query.class = query.class.id;
                }
                else {
                    throw new QueryError("That class doesn't exist!");
                }
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