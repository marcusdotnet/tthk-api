import { Router } from "express";
import { timetableService } from "../../serviceProvider";

const LessonsRouter = Router();

LessonsRouter.get("/", async (req, res) => {
    const lessons = await timetableService.$(req.tt_id)?.collection('lessons').find(req.query).toArray();
    return res.json(lessons);
});

LessonsRouter.get("/:lessonId", async (req, res) => {
    const lesson = await timetableService.$(req.tt_id)?.collection('lessons').findOne({ id: req.params.lessonId });
    return res.json(lesson);
});

LessonsRouter.get("/:lessonId/teachers", async (req, res) => {
    const lesson = await timetableService.$(req.tt_id)?.collection('lessons').findOne({ id: req.params.lessonId });
    return res.json(lesson?.teacherids);
});

LessonsRouter.get("/:lessonId/subject", async (req, res) => {
    const lesson = await timetableService.$(req.tt_id)?.collection('lessons').findOne({ id: req.params.lessonId });
    return res.json(lesson?.subjectid);
});

LessonsRouter.get("/:lessonId/rooms", async (req, res) => {
    
});

LessonsRouter.get("/:lessonId/period_span", async (req, res) => {

});

export default LessonsRouter;