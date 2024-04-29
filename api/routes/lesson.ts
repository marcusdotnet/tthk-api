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
        const dto = card.dto;

        //@ts-ignore
        if (!isPretty) return dto;

        const prettyDto: any = {} as TimetableCard["dto"];
        console.log("dto", dto);
        Object.assign(prettyDto, dto);
        prettyDto.teachers = dto.teachers.map(teacherId => (
            req.timetableQuery("teachers", { id: teacherId }) as TimetableTeacher[])[0].short
        )

        prettyDto.rooms = dto.teachers.map(roomId => {
            const rooms = req.timetableQuery("classrooms", { id: roomId }) as TimetableClassroom[];

            return rooms.length > 0 && (rooms[0]?.short || rooms[0]?.name);
        });

        prettyDto.days = undefined;
        prettyDto.day = dto.days.length > 0 && dto.days[0].name
        prettyDto.time_span = card.timeSpan.join("-");


        return prettyDto;
    }));
});

LessonsRouter.get("/:lessonId", (req, res) => {
    const card: TimetableCard | undefined = (req.timetableQuery("cards", {
        id: req.params.lessonId
    }) as TimetableCard[])[0] as TimetableCard;

    if (!card) return res.sendStatus(404);


    res.status(200);
    return res.send(card.dto);
});

export default LessonsRouter;