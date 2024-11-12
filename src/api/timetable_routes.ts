import { Router } from "express";
import { timetableService } from "../serviceProvider";
import TimetableMiddleware from "./middleware/timetable";
import ClassesRouter from "./routes/class";
import LessonsRouter from "./routes/lesson";
import RoomsRouter from "./routes/room";
import SubjectsRouter from "./routes/subject";
import TeachersRouter from "./routes/teacher";

const TimetableRouter = Router();


TimetableRouter.get("/", (_, res) => {
    return res.json(timetableService.timetables);
});

TimetableRouter.get("/current", (_, res) => {
    return res.json(timetableService.default_ttid);
});

TimetableRouter.use("/:timetableId/classes", TimetableMiddleware, ClassesRouter);
TimetableRouter.use("/:timetableId/teachers", TimetableMiddleware, TeachersRouter);
TimetableRouter.use("/:timetableId/subjects", TimetableMiddleware, SubjectsRouter);
TimetableRouter.use("/:timetableId/lessons", TimetableMiddleware, LessonsRouter);
TimetableRouter.use("/:timetableId/rooms", TimetableMiddleware, RoomsRouter);


export default TimetableRouter;