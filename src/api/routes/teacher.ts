import { Router } from "express";
import { timetableService } from "../../serviceProvider";

const TeachersRouter = Router();

TeachersRouter.get("/", async (req, res) => {
    return await timetableService.store?.db.collection('teachers').find().toArray();
});

TeachersRouter.get("/:teacherId", (req, res) => {

});

TeachersRouter.get("/:teacherId/taught_classes", (req, res) => {

});

export default TeachersRouter;