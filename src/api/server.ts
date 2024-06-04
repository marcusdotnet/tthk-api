import express, { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import swaggerDocument from "./docs/swagger-output.json";

import TimetableRouter from "./timetable_routes";
import TimetableChangesRouter from "./routes/timetable_changes";


const app: Express = express();


app.use(express.json());
app.use("*.css", (_, res, next) => {
    res.setHeader("Content-Type", "text/css");

    next();
});


app.use("/api/timetable_changes", TimetableChangesRouter);
app.use("/api/timetable", TimetableRouter);


app.use(express.static(path.join(__dirname, "public")));
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCssUrl: `/docs.css`
}));

export default app;