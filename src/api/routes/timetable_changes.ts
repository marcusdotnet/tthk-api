import { Router } from "express";
import { timetableChangesService } from "../../serviceProvider";

const TimetableChangesRouter = Router();


TimetableChangesRouter.get("/", (req, res) => {
    /* 
        #swagger.tags = ["Timetable changes"]
        #swagger.operationId = "getAllTimetableChanges"
        #swagger.summary = 'Get all timetable changes'
        #swagger.security = [{"ApiKeyAuth": []}]
    */

    const data = timetableChangesService.changes.map(change => {
        return change.dto;
    });


    if (data.length == 0) {
        /*
            #swagger.responses[404] = 'Not found'
        */

        return res.sendStatus(404);
    }


    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableChangeEntryArray'
            }
    } */
    res.status(200);
    res.send(data);
});

export default TimetableChangesRouter;