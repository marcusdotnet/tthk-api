import express, { type Express } from "express";
import TimetableRouter from "./routes/timetable";

const app: Express = express();
app.use(express.json());

app.use("/timetable", TimetableRouter);

export default app;