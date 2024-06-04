import { Router } from "express";

const RoomsRouter = Router();

RoomsRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllClassrooms"
        #swagger.parameters['name'] = {
            in: 'query',
            description: 'The name of the room to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['short_name'] = {
            in: 'query',
            description: 'The short name of the room to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['buildingid'] = {
            in: 'query',
            description: 'The building id of the room to look for',
            required: false,
            type: 'string'
        }
        #swagger.parameters['color'] = {
            in: 'query',
            description: 'The color of the room to look for, not sure why anyone would use this',
            required: false,
            type: 'string'
        }
    */
    const rooms = req.timetableQuery("classrooms", req.query);
    if (!rooms) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableClassroomArray'
            }
    } */
    res.status(200);
    return res.json(rooms.map(r => r.dto));
});

RoomsRouter.get("/:roomId", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getClassroomById"
    */
    const roomObj = req.timetableQueryOne("classrooms", {
        id: req.params.roomId
    });

    if (!roomObj) return res.sendStatus(404);

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/definitions/TimetableClassroom'
            }
    } */
    res.status(200);
    return res.send(roomObj.dto);
});

export default RoomsRouter;