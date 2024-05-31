import { Router } from "express";
import type { TimetableSubject } from "../../types/timetable/Subject";

const SubjectsRouter = Router();

SubjectsRouter.get("/", (req, res) => {
    const data: TimetableSubject[] | undefined = req.timetableQuery("subjects", req.query) as TimetableSubject[];

    if (!data) return res.sendStatus(404);

    res.status(200);
    return res.json(data.map(subject => subject.dto));
});

SubjectsRouter.get("/:subjectId", (req, res) => {
    const data: TimetableSubject | undefined = (req.timetableQuery("subjects", {
        id: req.params.subjectId
    }) as TimetableSubject[])[0] as TimetableSubject;

    if (!data) return res.sendStatus(404);


    res.status(200);
    return res.send(data.dto);
});

export default SubjectsRouter;