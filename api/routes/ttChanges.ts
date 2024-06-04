import { Router } from "express";
import { timetableChangesService } from "../../serviceProvider";

const TimetableChangesRouter = Router();


TimetableChangesRouter.get("/", (req, res) => {
    // #swagger.tags = ["Timetable changes"]
    res.send(timetableChangesService.changes.map(change => {
        // console.log(change.timetableId);
        console.log(change.date);
        return change.dto;
    }));
});

export default TimetableChangesRouter;