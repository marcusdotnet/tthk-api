import type { Request, Response } from "express";
import { timetableService } from "../../../serviceProvider";
import type { DataStoreType } from "../../types/timetable/internal/DataStore";
import type { TimetableDataTableName } from "../../types/timetable/internal/DataTableName";


declare global {
    namespace Express {
        interface Request {
            timetableQuery: <T extends TimetableDataTableName>(tableName: T, filter: Partial<DataStoreType<T>>) => DataStoreType<T>[] | never[]
            timetableQueryOne: <T extends TimetableDataTableName>(tableName: T, filter: Partial<DataStoreType<T>>) => DataStoreType<T> | undefined
        }
    }
}


const TimetableMiddleware = (req: Request, res: Response, next: Function) => {
    const timetableId: string | undefined = req.params?.timetableId as string;

    if (!timetableId || !Object.keys(timetableService.timetableStores).includes(timetableId)) {
        res.status(404);

        return res.send("That timetable does not exist!");
    }

    function timetableQuery<T extends TimetableDataTableName>(tableName: T, filter: Partial<DataStoreType<T>>) {
        return timetableService.query(timetableId, tableName, filter);
    }

    function timetableQueryOne<T extends TimetableDataTableName>(tableName: T, filter: Partial<DataStoreType<T>>) {
        return timetableService.queryOne<T>(timetableId, tableName, filter);
    }

    req.timetableQuery = timetableQuery;
    req.timetableQueryOne = timetableQueryOne;

    Object.assign(req.query, { timetableId: null });
    next();
};

export default TimetableMiddleware;