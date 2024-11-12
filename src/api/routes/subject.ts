import { Router } from "express";
import { timetableService } from "../../serviceProvider";

const SubjectsRouter = Router();

SubjectsRouter.get("/", async (req, res) => {
    const subjects = await timetableService.$(req.tt_id)?.collection('subjects').find(req.query).toArray();
    return res.json(subjects);
});

SubjectsRouter.get("/:subjectId", async (req, res) => {
    const subjects = await timetableService.$(req.tt_id)?.collection('subjects').find({
        id: req.params.subjectId
    }).toArray();

    return res.json(subjects);
});

export default SubjectsRouter;