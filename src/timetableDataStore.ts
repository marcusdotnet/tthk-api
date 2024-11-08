import { Db, MongoClient } from "mongodb";
import type { TimetableConfigResponse } from "./types/TimetableConfigResponse";
import type { DataRow, Table, TimetableDataResponse } from "./types/TimetableDataResponse";

export interface TimetableData extends TimetableDataResponse {
    tt_id: string;
}

export class TimetableDataStore {
    stores: Record<string, TimetableData> = {};
    default_id: string = '';
    #mongoClient: MongoClient;
    db: Db;

    constructor(config: TimetableConfigResponse, data: TimetableData[]) {
        data.forEach(d => {
            this.stores[d.tt_id] = d; 
        });

        this.default_id = config.r.regular.default_num;
        this.#mongoClient = new MongoClient(process.env.MONGODB_URL);
        this.db = this.#mongoClient.db('timetable');
    }

    timetableExists(tt_id: string): boolean {
        return Object.keys(this.stores).includes(tt_id);
    }

    get timetableids(): string[] {
        return Object.keys(this.stores);
    }

    getTimetableById(tt_id: string) {
        return this.stores[tt_id];
    }

    getTable(tt_id: string=this.default_id, table_id: string): Table|null { 
        return this.stores[tt_id].r.dbiAccessorRes.tables.find(t => t.id == table_id) as any;
    }

    async connect() {
        try {
            console.log('Connecting to database...')
            this.#mongoClient?.connect();
            console.log('Connected to MongoDB!');
        }
        catch (error) {
            console.error(error);
        }
    }

    async save() {
        if (Object.keys(this.stores).length === 0) {
            return
        };
    
        const defaultTimetable = this.stores[this.default_id];
    
        for (const table of defaultTimetable.r.dbiAccessorRes.tables) {
            try {
                const collection = this.db.collection(table.id) || await this.db.createCollection(table.id);
                console.log(`Using collection '${table.id}'`);
    
                if (table.data_rows.length === 0) { 
                    continue; 
                }
    
                const bulkOps = table.data_rows.map((row: DataRow) => ({
                    insertOne: {
                        document: {
                            ...row,
                            _id: row.id,
                        }
                    }
                }));
    
                await collection.bulkWrite(bulkOps as any, { ordered: false })
                .then(res => {
                    console.log(`Inserted ${res.insertedCount} documents into '${table.id}'`);
                })
                .catch(reason => {
                    if (reason.code === 11000) {
                        return;
                    }

                    console.error(reason)
                });
            } catch (error) {
                console.error(`Error processing table '${table.id}':`, error);
            }
            finally {
                this.stores = {};
            }
        }
    }
    
}