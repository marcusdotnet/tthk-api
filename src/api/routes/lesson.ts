import { Router } from "express";


const LessonsRouter = Router();

LessonsRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllLessons"
        #swagger.summary = 'Get all lessons related to the timetable'
        #swagger.security = [{"ApiKeyAuth": []}]
        #swagger.parameters['subject'] = {
            in: 'query',
            description: 'The id of the subject that the lesson should be associated with',
            required: false,
            type: 'string'
        }
        #swagger.parameters['classes'] = {
            in: 'query',
            description: 'An array of class ids that the lesson must have assigned to them',
            required: false,
            type: 'array'
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
    if (lessons.length == 0) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableLessonArray'
            }
    } */
    res.status(200);
    return res.json(lessons.map(lesson => lesson.dto));
});

LessonsRouter.get("/:lessonId", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonById"
        #swagger.summary = "Get a specific lesson by it's id related to the timetable"
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableLesson'
            }
    } */
    res.status(200);
    return res.send(lessonObj.dto);
});

LessonsRouter.get("/:lessonId/teachers", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonTeachers"
        #swagger.summary = 'Get all teachers assigned to the lesson'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }


    const data = lessonObj.dto.teachers;
    if (data.length == 0) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableTeacherArray'
            }
    } */
    res.status(200);
    return res.send(data);
});

LessonsRouter.get("/:lessonId/subject", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonSubject"
        #swagger.summary = 'Get the subject of a lesson'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableSubject'
            }
    } */
    res.status(200);
    return res.send(lessonObj.subject?.dto);
});

LessonsRouter.get("/:lessonId/rooms", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonRooms"
        #swagger.summary = 'Get all classrooms assigned to the lesson'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClassroomArray'
            }
    } */
    const data = lessonObj.dto.rooms;
    if (data.length == 0) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    res.status(200);
    return res.send(data);
});

LessonsRouter.get("/:lessonId/period_span", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getLessonPeriodSpan"
        #swagger.summary = 'Get the start and end periods of a lesson as a two element array'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const lessonObj = req.timetableQueryOne("cards", {
        id: req.params.lessonId
    });

    if (!lessonObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    res.status(200);
    return res.send(lessonObj.periodSpan);
});

export default LessonsRouter;