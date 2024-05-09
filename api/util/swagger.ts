import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "TTHK Timetable API",
            version: "0.1.0",
            description:
                "Accessing the TTHK timetable made easier (for devs <3)",
        },
        servers: [
            {
                url: `http://localhost:${process.env.API_PORT}`,
            },
        ],
    },
    apis: ["./api/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);