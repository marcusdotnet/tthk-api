import type { BunFile } from "bun";
import type { TimetableServiceOptions } from "../types/TimetableServiceOptions";
import type { DataRow, TimetableDataResponse } from "../types/TimetableDataResponse";
import type { TimetableConfigResponse } from "../types/TimetableConfigResponse";
import { Collection, Db, MongoClient } from "mongodb";


const isDevMode = process.env.NODE_ENV === "Development";
const timetableDevFile: BunFile | null = isDevMode && Bun.file(process.env!.DEV_TIMETABLE_FILE as string) || null;


/**
 * The structure for the timetable file used in development mode
*/
interface DevFileData {
    config?: TimetableConfigResponse;
    data: { [key: string]: TimetableDataResponse };
}

/**
 * The structure for a timetable data store
*/
interface TimetableData extends TimetableDataResponse {
    tt_id: string;
}

/**
 * The service that makes accessing timetable data easy
 * and allows for querying of timetable tables
 */
export class TimetableService {
    private options: TimetableServiceOptions | null = null;

    /**
     * A dictionary of all timetable data stores
     * where the key is a timetable id and the value is the timetable store
     */
    #tt_ids: string[] = [];
    default_ttid: string = '';
    
    #stores: Record<string, TimetableData> = {};
    #dbClient: MongoClient;

    constructor() {
        this.#dbClient = new MongoClient(process.env.MONGODB_URL);
    }

    /**
     * Configure the timetable service
     * options are consumed from the active .env file.
     */
    configure(): void {
        this.options = {
            eduPageTimetableUrl: process.env.TTHK_EDUPAGE_URL as string,
            eduPageTimetableConfigSuffix: process.env.EDUPAGE_CONFIG_ENDPOINT_SUFFIX as string,
            eduPageTimetableDataSuffix: process.env.EDUPAGE_DATA_ENDPOINT_SUFFIX as string,
            year: new Date().getFullYear()
        }
    }


    /**
     * Fetch the timetable data
     * must be called at least once during the program lifecycle in order to query the timetable.
     */
    async fetchData(): Promise<void> {
        const options: TimetableServiceOptions = this.options as TimetableServiceOptions;
        const localFileExists: boolean = isDevMode && await timetableDevFile?.exists() || false;

        var timetableConfigData: TimetableConfigResponse | undefined;
        var devFileData: DevFileData = (localFileExists && await timetableDevFile?.json()) || { "data": {}, "config": {} };

        if (localFileExists)
            timetableConfigData = devFileData["config"];

        if (!timetableConfigData || !timetableConfigData?.r) {
            timetableConfigData = await ((await fetch(`${options.eduPageTimetableUrl}/${options.eduPageTimetableConfigSuffix}`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, this.options?.year],
                    "__gsh": "00000000"
                })
            })).json());

        }

        if (!timetableConfigData) {
            console.error("Failed to retrieve timetable config data");
            return;
        };

        if (isDevMode)
            devFileData["config"] = timetableConfigData;

        const timetables: TimetableData[] = [];
        for (const timetableEntry of timetableConfigData.r.regular.timetables) {
            const timetableData: TimetableDataResponse = (localFileExists && devFileData["data"][timetableEntry.tt_num]) || await ((await fetch(`${options.eduPageTimetableUrl}/${options.eduPageTimetableDataSuffix}`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, timetableEntry.tt_num],
                    "__gsh": "00000000"
                })
            })).json());

            if (isDevMode)
                devFileData["data"][timetableEntry.tt_num] = timetableData;

            if (!timetableData) return;
            (timetableData as TimetableData).tt_id = timetableEntry.tt_num;
            timetables.push(timetableData as TimetableData);
        }
        
        this.setData(timetableConfigData, timetables);
        if (isDevMode && !localFileExists) {
            timetableDevFile?.writer().write(JSON.stringify(devFileData));
            console.log(`Wrote timetable data to ${timetableDevFile?.name}`)
        }
    }
    

    async connect() {
        try {
            console.log('Connecting to database...');
            await this.#dbClient.connect();
            console.log('Connected to MongoDB!');
        } catch (error) {
            console.error(error);
        }
    }

    async save(noBulkWrite: boolean = false) {
        if (Object.keys(this.#stores).length === 0) {
            return;
        }

        for (const timetable of Object.values(this.#stores)) {
            const tt_id = timetable.tt_id;
            const db = this.#dbClient.db(`timetable_${tt_id}`);

            for (const table of timetable.r.dbiAccessorRes.tables) {
                let collection: Collection<Document>;

                try {
                    collection = db.collection(table.id);
                    if (!collection) {
                        console.log(`Creating collection '${table.id}'`);
                        await db.createCollection(table.id);
                    }
                    
                } catch (e) {
                    console.error(`Error creating collection '${table.id}':`, e);
                    continue;
                }

                if (table.data_rows.length === 0) {
                    continue;
                }

                const bulkOps = table.data_rows.map((row: DataRow) => ({
                    insertOne: {
                        document: {
                            ...row,
                            _id: row.id,
                        },
                    },
                }));

                if (noBulkWrite) {
                    continue;
                }

                await collection.bulkWrite(bulkOps as any, { ordered: false })
                    .then(res => {
                        console.log(`Inserted ${res.insertedCount} documents into '${table.id}'`);
                    })
                    .catch(reason => {
                        if (reason.code === 11000) {
                            return;
                        }

                        console.error(`Error inserting documents into '${table.id}':`, reason);
                    });
            }
        }

        this.#stores = {};
    }

    setData(config: TimetableConfigResponse, data: TimetableData[]) {
        this.#tt_ids = [];
        this.#stores = {};
        this.default_ttid = config.r.regular.default_num;

        data.forEach(d => {
            this.#stores[d.tt_id] = d; 
            this.#tt_ids.push(d.tt_id);
        });
    }

    timetableExists(tt_id: string): boolean {
        return this.#tt_ids.includes(tt_id);
    }

    get timetableids(): string[] {
        return Object.keys(this.#stores);
    }

    getTimetableById(tt_id: string) {
        return this.#stores[tt_id];
    }

    get timetables() {
        return this.#tt_ids;
    }

    
    $(tt_id: string=this.default_ttid): Db|null {
        try {
            return this.#dbClient.db(`timetable_${tt_id}`);
        }
        catch (e) {
            console.error(`Error getting database for timetable '${tt_id}':`, e);
        }

        return null;
    }
}

