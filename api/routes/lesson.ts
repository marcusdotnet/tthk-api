import { Router } from "express";
import type { TimetableCard } from "../../types/timetable/Card";

const LessonsRouter = Router();

LessonsRouter.get("/", (req, res) => {
    const cards: TimetableCard[] | undefined = req.timetableQuery("cards", req.query) as TimetableCard[];

    if (!cards) return res.status(404).send({ message: "No lessons found that match your filter!" });

    res.status(200);
    return res.json(cards.map(card => card.dto));
});

LessonsRouter.get("/:lessonId", (req, res) => {
    const card: TimetableCard | undefined = (req.timetableQuery("cards", {
        id: req.params.lessonId
    }) as TimetableCard[])[0] as TimetableCard;
    if (!card) return res.sendStatus(404);

    const isPretty = req.query && typeof req.query?.pretty == "string";



    res.status(200);
    return res.send(card.dto);
});

export default LessonsRouter;