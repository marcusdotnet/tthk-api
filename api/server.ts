import express, { type Express } from "express";
import TimetableRouter from "./routes/timetable";
import ClassRouter from "./routes/class";
import TimetableMiddleware from "./middleware/timetable";

const app: Express = express();
app.use(express.json());

app.use("/timetable", TimetableRouter);

TimetableRouter.use("/:timetableId/classes", TimetableMiddleware, ClassRouter);


export default app;