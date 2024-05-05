import express, { type Express } from "express";
import TimetableRouter from "./routes/timetable";
import ClassRouter from "./routes/class";
import TeacherRouter from "./routes/teacher";
import TimetableMiddleware from "./middleware/timetable";
import TimetableChangesRouter from "./routes/ttChanges";
import SubjectsRouter from "./routes/subject";
import LessonsRouter from "./routes/lesson";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app: Express = express();
app.use(express.json());

app.use("/timetable_changes", TimetableChangesRouter);
app.use("/timetable", TimetableRouter);

TimetableRouter.use("/:timetableId/classes", TimetableMiddleware, ClassRouter);
TimetableRouter.use("/:timetableId/teachers", TimetableMiddleware, TeacherRouter);
TimetableRouter.use("/:timetableId/subjects", TimetableMiddleware, SubjectsRouter);
TimetableRouter.use("/:timetableId/lessons", TimetableMiddleware, LessonsRouter);

const specs = swaggerJSDoc({
    definition: {
        openapi: "3.1.0",
        info: {
            title: "TTHK Timetable API",
            version: "0.1.0",
            description:
                "This is the unofficial TTHK school API"
        },
        servers: [
            {
                url: "http://localhost:" + process.env.API_PORT + "/api",
            },
        ],
    },
    apis: ["./api/routes/*.ts"]
})


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

export default app;