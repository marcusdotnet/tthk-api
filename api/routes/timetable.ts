/**
 * @swagger
 * components:
 *   schemas:
 *     Timetable:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 */

import { Router } from "express";
import { timetableService } from "../../serviceProvider";

const TimetableRouter = Router();


TimetableRouter.get("/", (req, res) => {
    res.send(Object.values(timetableService.timetableStores).map(ttStore => ttStore.dto));
})


export default TimetableRouter;