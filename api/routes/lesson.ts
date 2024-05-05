import { Router } from "express";
import type { TimetableSubject } from "../../types/timetable/Subject";
import type { TimetableCard } from "../../types/timetable/Card";
import type { TimetableTeacher } from "../../types/timetable/Teacher";
import type { TimetableClassroom } from "../../types/timetable/Classroom";

const LessonsRouter = Router();

LessonsRouter.get("/", (req, res) => {
    const cards: TimetableCard[] | undefined = req.timetableQuery("cards", req.query) as TimetableCard[];
    const isPretty = req.query && typeof req.query?.pretty == "string";

    if (!cards) return res.status(404).send({ message: "No lessons found that match your filter!" });

    res.status(200);
    return res.json(cards.map(card => {
        return isPretty ? card.prettyDto : card.dto;
    }));
});

LessonsRouter.get("/:lessonId", (req, res) => {
    const card: TimetableCard | undefined = (req.timetableQuery("cards", {
        id: req.params.lessonId
    }) as TimetableCard[])[0] as TimetableCard;
    if (!card) return res.sendStatus(404);

    const isPretty = req.query && typeof req.query?.pretty == "string";



    res.status(200);
    return res.send(isPretty ? card.prettyDto : card.dto);
});

export default LessonsRouter;