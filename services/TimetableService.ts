import type { TimetableServiceOptions } from "../types/TimetableService";
import type { TimetableDataJson } from "../types/TimetableDataJson";
import type { TimetableDataStore } from "../types/TimetableDataStore";
import type { TimetablePrettyEntry } from "../types/TimetablePrettyEntry";
import { logwrite } from "../main";


export class TimetableService {
    options: TimetableServiceOptions | null = null;
    data: TimetableDataStore = {} as TimetableDataStore;

    classLookup: any = {};
    classNameLookup: any = {};

    constructor(options: TimetableServiceOptions) {
        this.options = options;
        this.fetchTimetable();
    }

    async fetchTimetable() {
        const options = this.options as TimetableServiceOptions;

        const response = await fetch(options.eduPageTimetableUrl, {
            method: "POST",
            body: JSON.stringify({
                "__args": [null, options.schoolId],
                "__gsh": options.gsh
            })
        });

        
        const data = this.data
        const jsonData: TimetableDataJson = await response.json();
        jsonData.r.dbiAccessorRes?.tables.forEach(table => {
            //@ts-ignore
            data[table.id] = table.data_rows;
        });


        data.classes?.forEach(classData => {
            const name = classData.name.trim();

            this.classLookup[name] = classData.id;
            this.classNameLookup[classData.id] = name;
        });
    }

    getClassNames(): [string] {
        return Object.keys(this.classLookup) as [string];
    }

    findClassIdByName(className: string): string | null  {
        const keys = Object.keys(this.classLookup);

        for (const key of keys) {
            if (key.toLowerCase().startsWith(className.toLowerCase())) {
                return this.classLookup[key];
            }
        }

        return null;
    }

    checkClassExist(classId: string): boolean {
        return Object.values(this.classLookup).find(c => c == classId) != null;
    }

    getClassGroups(classId: string): [string] | null {
        if (!this.checkClassExist(classId)) {
            return null;
        }


        return [""];
    }

    getPrettyTimetable(): [TimetablePrettyEntry] {
        const timetable: [TimetablePrettyEntry] = [] as unknown as [TimetablePrettyEntry];
        const data = this.data;

        data.cards?.forEach(card => {
            const timetableEntry: TimetablePrettyEntry = {

            };

            const lessonData = data.lessons?.find(l => l.id == card.lessonid);
            const subjectData = data.subjects?.find(s => s.id == lessonData?.subjectid);
            const days = data.daysdefs?.find(d => d.id == lessonData?.daysdefid)?.vals;
            
            timetableEntry.teachers = lessonData!.teacherids.map(ti => {
                const teacherData = data.teachers!.find(t => t.id == ti);

                return teacherData!.short;
            });

            timetableEntry.groups = lessonData!.classids.map(classId => {
                return this.classNameLookup[classId]
            });
            
            
            timetableEntry.startPeriod = card.period;
            timetableEntry.subject = subjectData!.name
            timetableEntry.count = lessonData!.count;
            timetableEntry.duration = lessonData!.durationperiods;


            // if (timetableEntry.groups.find(c => c == "TARpe22")) {
            //     timetableEntry.DEV = card;
            //     timetable.push(timetableEntry);
            // };
            timetable.push(timetableEntry)
        });

        
        return timetable;
    }
}