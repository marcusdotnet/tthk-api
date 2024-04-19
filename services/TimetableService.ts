import { TimetableClass, TimetableLesson, TimetableDayDefinition, TimetableWeekDefinition, TimetableTermDefinition, TimetableCard, type TimetableDataStore, type TimetableApiDataJson, type TimetableClassId, type TimetableQuery } from "../types";

const instantiateDataObj: Record<string, any> = {
    classes: () => new TimetableClass(),
    lessons: () => new TimetableLesson(),
    daysdefs: () => new TimetableDayDefinition(),
    weeksdefs: () => new TimetableWeekDefinition(),
    termsdefs: () => new TimetableTermDefinition(),
    cards: () => new TimetableCard()
};


interface TimetableServiceOptions {
    eduPageTimetableUrl: string
    schoolId: string
    gsh: string
}

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

    getClassNames(): [string] {
        return Object.keys(this.classLookup) as [string];
    }

    getClassByName(className: string): TimetableClass | null  {
        const id: TimetableClassId | null = this.classLookup[className.toLowerCase()] as TimetableClassId;
        if (!id) return null;
        const classData: TimetableClass | null = this.data.classes[id]
        if (!classData) return null;
        
        return classData;
    }

    checkClassExist(classId: TimetableClassId): boolean {
        return Object.values(this.classLookup).find(c => c == classId) != null;
    }

    query(query: TimetableQuery) {
        return Object.values(this.data.cards)
            .filter(card => {
                if (query.class == null) return true;
                if (typeof query.class == "string") {}
                const queryId = typeof query.class == "string" ? query.class : (query.class as unknown as TimetableClass)!.id

                return card.lesson.classids.includes(queryId);
            })
            .filter(card => query.subjectQuery != null ? card.lesson.subject.name.toLowerCase().includes(query.subjectQuery.toLowerCase()) : true)
            .filter(card => query.day != null ? card?.assignedDays[0]?.id == query.day : card.days != "")
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