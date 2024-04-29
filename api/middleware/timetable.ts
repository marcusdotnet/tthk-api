import type { Request, Response } from "express";
import { timetableService } from "../../serviceProvider";
import type { TimetableQueryTableName } from "../../services/TimetableService";



declare global {
    namespace Express {
        interface Request {
            timetableQuery: (tableName: TimetableQueryTableName, filterOptions: Object) => {}
        }
    }
}

const TimetableMiddleware = (req: Request, res: Response, next: Function) => {
    const timetableId: string | undefined = req.params?.timetableId as string;

    if (!timetableId || !Object.keys(timetableService.timetableStores).includes(timetableId)) {
        res.status(404);

        return res.send("That timetable does not exist!");
    }

    Object.assign(req, {
        timetableQuery: (tableName: TimetableQueryTableName, filterOptions: Object) => (
            timetableService.query(timetableId, tableName, filterOptions)
        )
    });

    Object.assign(req.query, { timetableId: null });
    next();
};

export default TimetableMiddleware;