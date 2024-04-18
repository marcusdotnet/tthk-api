import { TimetableClass, type TimetableClassId } from "../types/TimetableClass";
import type { TimetableServiceOptions } from "../types/TimetableServiceOptions";
import type { TimetableApiDataJson } from "../types/_TimetableApiDataJson";
import type { TimetableDataStore } from "../types/_TimetableDataStore";


const instantiateDataObj: Record<string, any> = {
    classes: (data: TimetableClass) => new TimetableClass()
};


export class TimetableService {
    options: TimetableServiceOptions | null = null;
    data: TimetableDataStore = {} as TimetableDataStore;

    classLookup: any = {};

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
        const jsonData: TimetableApiDataJson = await response.json();

        jsonData.r.dbiAccessorRes?.tables.forEach(table => {
            const rows = table.data_rows;
            const tableData: any = {};
            const instantianteFunc = instantiateDataObj[table.id] as unknown as any;

            for (var r of rows) {
                var row: {id: string} = r as {id: string};
                var rowObj;

                if (typeof instantianteFunc == "function") {
                    rowObj = instantianteFunc();
                    Object.assign(rowObj, row);
                }

                tableData[row!.id] = typeof rowObj != "undefined" ? rowObj : row;
            }
            
            
            //@ts-ignore
            data[table.id] = tableData;            
        });



        
        Object.values(data.classes as unknown as TimetableClass[]).forEach(classData => {            
            const name = classData.name.trim().toLowerCase();
            

            const classObj = new TimetableClass();
            Object.assign(classObj, classData);
            

            this.classLookup[name] = classData.id;
        });
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
}