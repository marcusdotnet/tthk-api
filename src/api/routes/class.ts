import { Router } from "express";


const ClassesRouter = Router();


ClassesRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getAllClasses'
        #swagger.security = [{"bearerAuth": []}]
        #swagger.parameters['name'] = {
            in: 'query',
            description: 'The name of the class to look for',
            required: false,
            type: 'string'
        }        
        #swagger.parameters['color'] = {
            in: 'query',
            description: 'The color of the class to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['teachers'] = {
            in: 'query',
            description: 'An array of teacher ids that a class must have assigned to them, which is typically only one',
            required: false,
            type: 'array'
        }
        #swagger.parameters['classrooms'] = {
            in: 'query',
            description: 'An array of classroom ids that a class must have assigned to them',
            required: false,
            type: 'array'
        }
    */
    const classes = req.timetableQuery("classes", req.query);
    if (!classes) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableClassArray'
            }
    } */
    res.status(200);
    return res.json(classes.map(c => c.dto));
});

ClassesRouter.get("/:classId", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getClassById'
    */
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    if (!classObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableClass'
            }
    } */
    res.status(200);
    return res.send(classObj.dto);
});

ClassesRouter.get("/:classId/teachers", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getClassTeachers'
    */
    
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    // #swagger.responses[404] = "Not found"
    if (!classObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableTeacherArray'
            }
    } */
    res.status(200);
    return res.json(classObj.dto.teachers);
});

ClassesRouter.get("/:classId/classrooms", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getClassAssignedRooms'
    */
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    // #swagger.responses[404] = "Not found"
    if (!classObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableClassroomArray'
            }
    } */
    res.status(200);
    return res.json(classObj.dto.classrooms);
});


export default ClassesRouter;