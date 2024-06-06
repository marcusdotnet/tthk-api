import { Router } from "express";

const TeachersRouter = Router();

TeachersRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllTeachers"
        #swagger.summary = 'Get all teachers related to the timetable'
        #swagger.security = [{"ApiKeyAuth": []}]
        #swagger.parameters['name'] = {
            in: 'query',
            description: 'The name of the teaacher to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['color'] = {
            in: 'query',
            description: 'The color of the teacher to look for',
            required: false,
            type: 'string'
        }        
        #swagger.parameters['taught_classes'] = {
            in: 'query',
            description: 'An array of classes the teacher should be teaching',
            required: false,
            type: 'array',
            schema: 'string'
        }
    */
    const teachers = req.timetableQuery("teachers", req.query);
    if (!teachers) { 
    // #swagger.responses[200] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableTeacherArray'
            }
    } */
    res.status(200);
    return res.json(teachers.map(teacher => teacher.dto));
});

TeachersRouter.get("/:teacherId", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getTeacherById"
        #swagger.summary = 'Get a specific teacher by id from the timetable'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const teacherObj = req.timetableQueryOne("teachers", {
        id: req.params.teacherId
    });

    if (!teacherObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableTeacher'
            }
    } */
    res.status(200);
    return res.send(teacherObj.dto);
});

TeachersRouter.get("/:teacherId/taught_classes", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getTeacherTaughtClasses"
        #swagger.summary = 'Get all classes taught by a specific teacher'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const teacherObj = req.timetableQueryOne("teachers", {
        id: req.params.teacherId
    });

    if (!teacherObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClassArray'
            }
    } */
    res.status(200);
    return res.send(teacherObj.taught_classes);
});

export default TeachersRouter;