import { Router } from "express";
import type { TimetableTeacher } from "../../types/timetable/Teacher";

const TeacherRouter = Router();

TeacherRouter.get("/", (req, res) => {
    const teachers: TimetableTeacher[] | undefined = req.timetableQuery("teachers", req.query) as TimetableTeacher[];
    if (!teachers) return res.sendStatus(404);

    res.status(200);
    return res.json(teachers.map(teacher => teacher.dto));
});

TeacherRouter.get("/:teacherId", (req, res) => {
    const teacher: TimetableTeacher | undefined = (req.timetableQuery("teachers", {
        id: req.params.teacherId
    }) as TimetableTeacher[])[0] as TimetableTeacher;

    if (!teacher) return res.sendStatus(404);

    res.status(200);
    return res.send(teacher.dto);
});

export default TeacherRouter;