/**
 * @swagger
 * /timetable:
 *  get:
*      summary: Retrieve a list of timetables
*      description: Retrieve a list of timetables
*      responses:
*          200:
*              description: A list of timetables
*              content:
*                  application/json:
*                      schema:
*                          type: object
 */

import { Router } from "express";
import { timetableService } from "../../serviceProvider";

const TimetableRouter = Router();


TimetableRouter.get("/", (req, res) => {
    res.send(Object.values(timetableService.timetableStores).map(ttStore => ttStore.dto));
})


export default TimetableRouter;