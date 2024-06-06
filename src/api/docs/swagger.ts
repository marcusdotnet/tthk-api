import path from "path";
import swaggerAutogen from "swagger-autogen";
import { TimetableChangeEntryDefinition, TimetableClassDefinition, TimetableClassroomDefinition, TimetableDataStoreDefinition, TimetableLessonDefinition, TimetableSubjectDefinition, TimetableTeacherDefinition } from "./swagger-definitions";


const outputFile = path.join(__dirname, "/swagger-output.json");
const endpointFiles = [
    process.platform === "win32" ? "../server.ts" : path.join(__dirname, "../server.ts")
];

const doc = {
    host: `localhost:${process.env.API_PORT}`,
    info: {
        title: "TTHK Timetable API",
        description: "This is the unofficial API to access TTHK's timetable data",
        license: {
            name: "MIT",
            url: "https://www.mit.edu/~amini/LICENSE.md"
        },
        "x-logo": {
            "url": "/tthk_logo.png",
            "backgroundColor": "#FFFFFF",
            "altText": "TTHK logo"
        }
    },
    tags: [
        {
            name: "Timetable",
            description: "These are the main timetable endpoints"
        },
        {
            name: "Timetable changes",
            description: "These are the timetable changes endpoints, used to scrape changes from TTHK's website"
        }
    ],
    components: {
        schemas: {
            TimetableClass: TimetableClassDefinition,
            TimetableClassArray: [TimetableClassDefinition],
            TimetableTeacher: TimetableTeacherDefinition,
            TimetableTeacherArray: [TimetableTeacherDefinition],
            TimetableClassroom: TimetableClassroomDefinition,
            TimetableClassroomArray: [TimetableClassroomDefinition],
            TimetableLesson: TimetableLessonDefinition,
            TimetableLessonArray: [TimetableLessonDefinition],
            TimetableSubject: TimetableSubjectDefinition,
            TimetableSubjectArray: [TimetableSubjectDefinition],
            // TimetableChangeEntry: TimetableChangeEntryDefinition,
            TimetableChangeEntryArray: [TimetableChangeEntryDefinition],
            Timetable: TimetableDataStoreDefinition,
            TimetableArray: [TimetableDataStoreDefinition],
        },
        securitySchemes: {
            ApiKeyAuth: {
                "type": "apiKey",
                "in": "header",
                "name": "X-API-KEY"
            }
        }
    }
}

swaggerAutogen({
    openapi: "3.1.0"
})(outputFile, endpointFiles, doc);


