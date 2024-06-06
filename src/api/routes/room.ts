import { Router } from "express";

const RoomsRouter = Router();

RoomsRouter.get("/", (req, res) => {
    /*  #swagger.tags = ["Timetable"]
        #swagger.operationId = "getAllClassrooms"
        #swagger.summary = 'Get all classrooms related to the timetable'
        #swagger.security = [{
            "ApiKeyAuth": []
        }]
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
    if (!rooms) { 
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClassroomArray'
            }
    } */
    res.status(200);
    return res.json(rooms.map(r => r.dto));
});

RoomsRouter.get("/:roomId", (req, res) => {
    /* 
        #swagger.tags = ["Timetable"]
        #swagger.operationId = "getClassroomById"
        #swagger.summary = "Get a specific classroom by it's id related to the timetable"
        #swagger.security = [{
            "ApiKeyAuth": []
        }]
    */
    const roomObj = req.timetableQueryOne("classrooms", {
        id: req.params.roomId
    });

    if (!roomObj) {
        // #swagger.responses[404] = 'Not found'
        return res.sendStatus(404);
    }

    /* #swagger.responses[200] = {
            schema: {
                $ref: '#/components/schemas/TimetableClassroom'
            }
    } */
    res.status(200);
    return res.send(roomObj.dto);
});

export default RoomsRouter;