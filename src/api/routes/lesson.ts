import { Router } from "express";


const LessonsRouter = Router();

LessonsRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllLessons"
        #swagger.parameters['subject'] = {
            in: 'query',
            description: 'The id of the subject that the lesson should be associated with',
            required: false,
            type: 'string'
        }
        #swagger.parameters['teachers'] = {
            in: 'query',
            description: 'An array of teacher ids that the lesson must have assigned to them',
            required: false,
            type: 'array'
        }
        #swagger.parameters['rooms'] = {
            in: 'query',
            description: 'An array of classroom ids that the lesson must have assigned to them',
            required: false,
            type: 'array'
        }
        #swagger.parameters['period_start'] = {
            in: 'query',
            description: 'Which period the lesson has to start at',
            required: false,
            type: 'integer'
        }        
        #swagger.parameters['period_end'] = {
            in: 'query',
            description: 'Which period the lesson has to end at',
            required: false,
            type: 'integer'
        }
        #swagger.parameters['days'] = {
            in: 'query',
            description: 'An array of the names of days that the lesson is on',
            required: false,
            type: 'array'
        }
    */
    const lessons = req.timetableQuery("cards", req.query);
    if (!lessons) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableLessonArray'
            }
    } */
    res.status(200);
    return res.json(lessons.map(lesson => lesson.dto));
});

LessonsRouter.get("/:lessonId", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonById"
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableLesson'
            }
    } */
    res.status(200);
    return res.send(lessonObj.dto);
});

LessonsRouter.get("/:lessonId/teachers", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonTeachers"
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableTeacherArray'
            }
    } */
    res.status(200);
    return res.send(lessonObj.dto.teachers);
});

LessonsRouter.get("/:lessonId/subject", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonSubject"
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableSubject'
            }
    } */
    res.status(200);
    return res.send(lessonObj.subject?.dto);
});

LessonsRouter.get("/:lessonId/rooms", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonRooms"
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableClassroomArray'
            }
    } */
    res.status(200);
    return res.send(lessonObj.dto.rooms);
});

LessonsRouter.get("/:lessonId/period_span", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonPeriodSpan"
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) return res.sendStatus(404);

    res.status(200);
    return res.send(lessonObj.periodSpan);
});

export default LessonsRouter;