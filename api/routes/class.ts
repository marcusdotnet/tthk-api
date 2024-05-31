import { Router } from "express";
import type { TimetableClass } from "../../types/timetable/Class";

const ClassRouter = Router();

ClassRouter.get("/", (req, res) => {
    const classObj: TimetableClass[] | undefined = req.timetableQuery("classes", req.query) as TimetableClass[];
    if (!classObj) return res.sendStatus(404);

    res.status(200);
    return res.json(classObj.map(c => c.dto));
});

ClassRouter.get("/:classId", (req, res) => {
    const classObj: TimetableClass | undefined = (req.timetableQuery("classes", {
        id: req.params.classId
    }) as TimetableClass[])[0] as TimetableClass;

    if (!classObj) return res.sendStatus(404);

    res.status(200);
    return res.send(classObj.dto);
});

export default ClassRouter;