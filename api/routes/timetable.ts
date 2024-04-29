import { Router } from "express";
import TimetableMiddleware from "../middleware/timetable";
import { timetableService } from "../../serviceProvider";

const TimetableRouter = Router();




TimetableRouter.get("/", (req, res) => {
    res.send(Object.values(timetableService.timetableStores).map(ttStore => ttStore.dto));
})

export default TimetableRouter;