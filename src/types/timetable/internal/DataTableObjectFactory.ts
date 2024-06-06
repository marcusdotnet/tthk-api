import { lstatSync, readdirSync } from "fs";
import path from "path";

/**
 * A mapper where the key is the key of a table in the timetable datastore, and the value is a class.
 * All elements of the original api data within the table will be replaced with an instance of that class.
 * This is to achieve ORM-like behaviour.
*/
const timetableTypePath: string = path.join(__dirname, "../");


/**
 * The singleton class that handles creating instances for timetable datatables by name
*/
export class DataTableObjectFactory {
    static hasInstance: boolean;

    tableClassMap: Record<string, Function> = {};

    constructor() {
        if (DataTableObjectFactory.hasInstance) {
            console.warn("Tried to create a new instance of DataTableObjectFactory");
            return;
        };

        DataTableObjectFactory.hasInstance = true;

        (async () => {
            for (const fileName of readdirSync(timetableTypePath)) {
                const modulePath = path.join(timetableTypePath, fileName);
                const fileStats = lstatSync(modulePath);
                if (fileStats.isDirectory()) continue;
            
                const ttModule = await import(modulePath);
                if (!ttModule) continue;
                const tableName: string | undefined = ttModule?.TABLE_NAME
                if (!tableName) continue;
            
                var ttClassExport: Function | undefined;
                for (const moduleExport of Object.values(ttModule)) {
                    if (typeof moduleExport == "function") {
                        ttClassExport = moduleExport;
                    }
                }
                if (!ttClassExport) continue;
            
                this.tableClassMap[tableName] = ttClassExport;
            }
        
            // } catch (e) {
            //     console.error(e);
            // }
        })();
    }

    canInstantiate(tableName: string) {
        return this.tableClassMap[tableName] != undefined;
    }
    

    /**
     * 
     * @param tableName The name of the table we're trying to create a data object for
     * @returns An instance for the data table
     */
    createInstanceForTable(tableName: string): object | undefined {
        const tableConstructor = this.tableClassMap[tableName];
        if (!tableConstructor) {
            console.warn(`Couldn't find a constructor for table ${tableName}`);
            return;
        }
        // @ts-ignore
        return new(tableConstructor);
    }
}