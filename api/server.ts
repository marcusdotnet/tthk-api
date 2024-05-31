import express, { type Express } from "express";
import TimetableRouter from "./routes/timetable";
import ClassRouter from "./routes/class";
import TeacherRouter from "./routes/teacher";
import TimetableMiddleware from "./middleware/timetable";
import TimetableChangesRouter from "./routes/ttChanges";
import SubjectsRouter from "./routes/subject";
import LessonsRouter from "./routes/lesson";
import swaggerUi from "swagger-ui-express";

import YAML from "yamljs";
import path from "path";

const docsPath = path.join(__dirname, "/docs");
const swaggerDocument = YAML.load(`${docsPath}/swagger.yaml`);




const app: Express = express();
app.use(express.json());
app.use("*.css", (_, res, next) => {
    res.setHeader("Content-Type", "text/css");

    next();
});

app.use("/timetable_changes", TimetableChangesRouter);
app.use("/timetable", TimetableRouter);

TimetableRouter.use("/:timetableId/classes", TimetableMiddleware, ClassRouter);
TimetableRouter.use("/:timetableId/teachers", TimetableMiddleware, TeacherRouter);
TimetableRouter.use("/:timetableId/subjects", TimetableMiddleware, SubjectsRouter);
TimetableRouter.use("/:timetableId/lessons", TimetableMiddleware, LessonsRouter);



app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCssUrl: `/docs.css`
}));


export default app;