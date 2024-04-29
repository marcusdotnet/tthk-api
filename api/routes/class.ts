import { Router } from "express";
import { timetableService } from "../../serviceProvider";
import type { TimetableClass } from "../../types/timetable/Class";

const ClassRouter = Router();

ClassRouter.get("/", (req, res) => {
    const data: TimetableClass[] | undefined = req.timetableQuery("classes", req.query) as TimetableClass[];

    if (!data) return res.sendStatus(404);

    res.status(200);
    return res.json(data.map(c => c.dto));
});

ClassRouter.get("/:classId", (req, res) => {
    const data: TimetableClass | undefined = (req.timetableQuery("classes", {
        id: req.params.classId
    }) as TimetableClass[])[0] as TimetableClass;

    if (!data) return res.sendStatus(404);


    res.status(200);
    return res.send(data.dto);
});

export default ClassRouter;