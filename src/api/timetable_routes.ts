import { Router } from "express";
import { timetableService } from "../serviceProvider";
import TimetableMiddleware from "./middleware/timetable";
import ClassesRouter from "./routes/class";
import LessonsRouter from "./routes/lesson";
import RoomsRouter from "./routes/room";
import SubjectsRouter from "./routes/subject";
import TeachersRouter from "./routes/teacher";
import type { TimetableDataStore } from "../types/timetable/internal/DataStore";

const TimetableRouter = Router();


TimetableRouter.get("/", (_, res) => {
    /* 
        #swagger.tags = ['Timetable']
        #swagger.operationId = 'getAlltimetables'
        #swagger.summary = 'Get all timetables'
        #swagger.security = [{
            "ApiKeyAuth": []
        }]
    */
    const data = Object.values(timetableService.timetableStores).map(ttStore => ttStore.dto);
    if (data.length == 0) {
        /*
            #swagger.responses[404] = 'Not found'
        */

        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableArray'
            }
    } */
    res.send(data);
});

TimetableRouter.get("/current", (_, res) => {
    /* 
        #swagger.tags = ['Timetable']
        #swagger.operationId = 'getCurrentTimetable'
        #swagger.summary = 'Get the current timetable'
        #swagger.security = [{
            "ApiKeyAuth": []
        }]
    */

    
    var currentTimetable: TimetableDataStore | undefined; 
    
    const currentDate = new Date();
    const timetables = timetableService.timetableStores;
    for (const timetable of Object.values(timetables)) {
        if (!timetable.date_span) continue;
        const [start, end] = timetable.date_span;

        if (currentDate > start && currentDate <= end) {
            currentTimetable = timetable;
        }
    }

    if (!currentTimetable) {
        /*
            #swagger.responses[404] = 'Not found'
        */

        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/Timetable'
            }
    } */
    res.send(currentTimetable.dto);
});

TimetableRouter.use("/:timetableId/classes", TimetableMiddleware, ClassesRouter);
TimetableRouter.use("/:timetableId/teachers", TimetableMiddleware, TeachersRouter);
TimetableRouter.use("/:timetableId/subjects", TimetableMiddleware, SubjectsRouter);
TimetableRouter.use("/:timetableId/lessons", TimetableMiddleware, LessonsRouter);
TimetableRouter.use("/:timetableId/rooms", TimetableMiddleware, RoomsRouter);


export default TimetableRouter;