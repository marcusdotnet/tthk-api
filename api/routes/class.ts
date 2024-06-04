import { Router } from "express";


const ClassesRouter = Router();


ClassesRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.parameters['name'] = {
            in: 'query',
            description: 'The name of the class to look for',
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

    res.status(200);
    return res.json(classes.map(c => c.dto));
});

ClassesRouter.get("/:classId", (req, res) => {
    // #swagger.tags = ["Timetable"]
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    if (!classObj) return res.sendStatus(404);

    res.status(200);
    return res.send(classObj.dto);
});

ClassesRouter.get("/:classId/teachers", (req, res) => {
    // #swagger.tags = ["Timetable"]
    
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    if (!classObj) return res.sendStatus(404);

    res.status(200);
    return res.json(classObj.dto.teachers);
});

ClassesRouter.get("/:classId/classrooms", (req, res) => {
    // #swagger.tags = ["Timetable"]
    const classObj = req.timetableQueryOne("classes", {
        id: req.params.classId
    });

    if (!classObj) return res.sendStatus(404);

    res.status(200);
    return res.json(classObj.dto.classrooms);
});


export default ClassesRouter;