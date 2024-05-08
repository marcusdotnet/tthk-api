/**
 * @swagger
 * /timetable/:timetableId/teachers:
 *  get:
*      summary: Retrieve a list of teachers
*      description: Retrieve a list of teachers
*      responses:
*          200:
*              description: A list of teachers
*              content:
*                  application/json:
*                      schema:
*                          type: object
 */

import { Router } from "express";
import type { TimetableClass } from "../../types/timetable/Class";
import type { TimetableTeacher } from "../../types/timetable/Teacher";

const TeacherRouter = Router();

TeacherRouter.get("/", (req, res) => {
    const teachers: TimetableTeacher[] | undefined = req.timetableQuery("teachers", req.query) as TimetableTeacher[];
    if (!teachers) return res.sendStatus(404);
    const isPretty = req.query && typeof req.query?.pretty == "string";

    res.status(200);
    return res.json(teachers.map(teacher => isPretty ? teacher.prettyDto : teacher.dto));
});

TeacherRouter.get("/:teacherId", (req, res) => {
    const teacher: TimetableTeacher | undefined = (req.timetableQuery("teachers", {
        id: req.params.teacherId
    }) as TimetableTeacher[])[0] as TimetableTeacher;

    if (!teacher) return res.sendStatus(404);
    const isPretty = req.query && typeof req.query?.pretty == "string";

    res.status(200);
    return res.send(isPretty ? teacher.prettyDto : teacher.dto);
});

export default TeacherRouter;