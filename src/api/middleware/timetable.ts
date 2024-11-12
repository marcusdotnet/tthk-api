import type { NextFunction, Request, Response } from "express";
import { timetableService } from "../../serviceProvider";

declare global {
    namespace Express {
        interface Request {
            tt_id?: string;
        }
    }
}

export interface TimetableRequest extends Request {
    params: {
        timetableId: string;
    };
}

const TimetableMiddleware = (req: TimetableRequest, res: Response, next: NextFunction) => {
    const timetableId: string | undefined = req.params?.timetableId as string;
    
    if (!timetableService.$(timetableId)) {
        return res.send("That timetable does not exist!");
    }
    
    req.tt_id = timetableId;
    next();
};

export default TimetableMiddleware;
