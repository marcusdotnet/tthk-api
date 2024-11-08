import { Router } from "express";
import type { TimetableSubject } from "../../types/timetable/Subject";

const SubjectsRouter = Router();

SubjectsRouter.get("/", (req, res) => {

});

SubjectsRouter.get("/:subjectId", (req, res) => {

});

export default SubjectsRouter;