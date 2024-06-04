import { Router } from "express";
import type { TimetableSubject } from "../../types/timetable/Subject";

const SubjectsRouter = Router();

SubjectsRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllSubjects"
        #swagger.parameters['name'] = {
            in: 'query',
            description: 'The name of the subject to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['short_name'] = {
            in: 'query',
            description: 'The short name of the subject to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['color'] = {
            in: 'query',
            description: 'The color of the subject to look for',
            required: false,
            type: 'string'
        }
    */
    const subjects = req.timetableQuery("subjects", req.query);
    if (!subjects) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableSubjectArray'
            }
    } */
    res.status(200);
    return res.json(subjects.map(subject => subject.dto));
});

SubjectsRouter.get("/:subjectId", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getSubjectById"
    */
    const subjectObj: TimetableSubject | undefined = req.timetableQueryOne("subjects", {
        id: req.params.subjectId
    });

    if (!subjectObj) return res.sendStatus(404);


    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableSubject'
            }
    } */
    res.status(200);
    return res.send(subjectObj.dto);
});

export default SubjectsRouter;