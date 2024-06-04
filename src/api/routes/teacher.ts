import { Router } from "express";

const TeachersRouter = Router();

TeachersRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllTeachers"
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
    if (!teachers) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableTeacherArray'
            }
    } */
    res.status(200);
    return res.json(teachers.map(teacher => teacher.dto));
});

TeachersRouter.get("/:teacherId", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getTeacherById"
    */
    const teacherObj = req.timetableQueryOne("teachers", {
        id: req.params.teacherId
    });

    if (!teacherObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableTeacher'
            }
    } */
    res.status(200);
    return res.send(teacherObj.dto);
});

TeachersRouter.get("/:teacherId/taught_classes", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getTeacherTaughtClasses"
    */
    const teacherObj = req.timetableQueryOne("teachers", {
        id: req.params.teacherId
    });

    if (!teacherObj) return res.sendStatus(404);

    res.status(200);
    return res.send(teacherObj.taught_classes);
});

export default TeachersRouter;