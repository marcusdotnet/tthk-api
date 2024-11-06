import { Router } from "express";


const ClassesRouter = Router();


ClassesRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getAllClasses'
        #swagger.security = [{"ApiKeyAuth": []}]
        #swagger.summary = 'Get all classes/groups related to the timetable'
    */
    const classes = req.timetableQuery("classes", req.query);
    if (classes.length == 0) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClassArray'
            }
    } */
    res.status(200);
    return res.json(classes.map(c => c.dto));
});

ClassesRouter.get("/:classId", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getClassById'
        #swagger.summary = 'Get a specific class/group related to the timetable'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    if (!classObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClass'
            }
    } */
    res.status(200);
    return res.send(classObj.dto);
});

ClassesRouter.get("/:classId/teachers", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getClassTeachers'
        #swagger.summary = 'Get all teachers assigned to a specific class'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    // #swagger.responses[404] = "Not found"
    if (!classObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    
    const data = classObj.dto.teachers;
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
    return res.json(data);
});

ClassesRouter.get("/:classId/classrooms", (req, res) => {
    /*
        #swagger.tags = ["Timetable"]
        #swagger.operationId = 'getClassAssignedRooms'
        #swagger.summary = 'Get all classrooms assigned to a specific class'
        #swagger.security = [{"ApiKeyAuth": []}]
    */
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    // #swagger.responses[404] = "Not found"
    if (!classObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    const data = classObj.dto.classrooms;
    if (data.length == 0) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClassroomArray'
            }
    } */
    res.status(200);
    return res.json(data);
});


export default ClassesRouter;