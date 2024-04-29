import { Router } from "express";
import { timetableChangesService } from "../../serviceProvider";

const TimetableChangesRouter = Router();


TimetableChangesRouter.get("/", (req, res) => {
    res.send(timetableChangesService.changes.map(change => ({
        day: change.dayLetter,
        date: change.date,
        period: change.period,
        info: change.info,
        teacher: change.teacher
    })));
})

export default TimetableChangesRouter;