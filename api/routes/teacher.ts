import { Router } from "express";
import type { TimetableClass } from "../../types/timetable/Class";
import type { TimetableTeacher } from "../../types/timetable/Teacher";

const TeacherRouter = Router();

TeacherRouter.get("/", (req, res) => {
    const data: TimetableTeacher[] | undefined = req.timetableQuery("teachers", req.query) as TimetableTeacher[];

    if (!data) return res.sendStatus(404);

    res.status(200);
    return res.json(data.map(teacher => teacher.dto));
});

TeacherRouter.get("/:teacherId", (req, res) => {
    const data: TimetableTeacher | undefined = (req.timetableQuery("teachers", {
        id: req.params.teacherId
    }) as TimetableTeacher[])[0] as TimetableTeacher;

    if (!data) return res.sendStatus(404);


    res.status(200);
    return res.send(data.dto);
});

export default TeacherRouter;