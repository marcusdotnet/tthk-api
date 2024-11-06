import express, { type Express } from "express";

import TimetableRouter from "./timetable_routes";
import TimetableChangesRouter from "./routes/timetable_changes";
import path from "path";


const app: Express = express();

app.use(express.static(path.join(__dirname, "/docs/public")));

app.use(express.json());
app.use("/api/timetable_changes", TimetableChangesRouter);
app.use("/api/timetable", TimetableRouter);


export default app;