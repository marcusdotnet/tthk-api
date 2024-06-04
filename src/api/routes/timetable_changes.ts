import { Router } from "express";
import { timetableChangesService } from "../../../serviceProvider";

const TimetableChangesRouter = Router();


TimetableChangesRouter.get("/", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllTimetableChanges"
        #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableChangeEntry'
            }
        }
    */

    res.send(timetableChangesService.changes.map(change => {
        return change.dto;
    }));
});

export default TimetableChangesRouter;