import { Router } from "express";
import { timetableService } from "../../serviceProvider";
import type { TimetableRequest } from "../middleware/timetable";

const TeachersRouter = Router();

TeachersRouter.get("/", async (req: TimetableRequest, res) => {
    const teachers = await timetableService.$(req.tt_id)?.collection('teachers').find(req.query).toArray();
    return res.json(teachers);
});

TeachersRouter.get("/:teacherId", async (req, res) => {
    const teacher = await timetableService.$(req.tt_id)?.collection('teachers').findOne({ id: req.params.teacherId });
    return res.json(teacher);
});

TeachersRouter.get("/:teacherId/taught_classes", async (req, res) => {
    const teacher = await timetableService.$(req.tt_id)?.collection('teachers').findOne({ id: req.params.teacherId });
    return res.json(teacher?.classids);
});

export default TeachersRouter;