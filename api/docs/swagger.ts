import path from "path";
import swaggerAutogen from "swagger-autogen";

const doc = {
    host: "localhost:5637",
    info: {
        title: "TTHK Timetable API",
        description: "This is the unofficial API to access TTHK's timetable data"
    },
    tags: [
        {
            name: "Timetable",
            description: "This is the main timetable API"
        },
        {
            name: "Timetable changes",
            description: "This is the timetable changes API, used to scrape changes from TTHK's website"
        }
    ]
}


const outputFile = "./swagger-output.json";
const endpointFiles = [
    path.join(__dirname, "../server.ts"),
];

swaggerAutogen()(outputFile, endpointFiles, doc);


