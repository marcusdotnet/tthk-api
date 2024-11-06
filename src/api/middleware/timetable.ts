import type { Request, Response } from "express";
import { timetableService } from "../../serviceProvider";


declare global {
    namespace Express {
        interface Request {
            tt_id?: string;
        }
    }
}

const TimetableMiddleware = (req: Request, res: Response, next: Function) => {
    const timetableId: string | undefined = req.params?.timetableId as string;
    
    if (!timetableService.store?.timetableExists(timetableId)) {
        return res.send("That timetable does not exist!");
    }
    
    req.tt_id = timetableId;
    next();
};

export default TimetableMiddleware;