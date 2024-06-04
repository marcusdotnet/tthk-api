import path from "path";
import swaggerAutogen from "swagger-autogen";
import { TimetableChangeEntryDefinition, TimetableClassDefinition, TimetableClassroomDefinition, TimetableLessonDefinition, TimetableSubjectDefinition, TimetableTeacherDefinition } from "./swagger-definitions";


const outputFile = "./swagger-output.json";
const endpointFiles = [
    path.join(__dirname, "../server.ts"),
];

const doc = {
    host: `localhost:${process.env.API_PORT}`,
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
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        }
    },
    definitions: {
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
        TimetableChangeEntry: TimetableChangeEntryDefinition,
        TimetableChangeEntryArray: [TimetableChangeEntryDefinition]
    }
}

swaggerAutogen()(outputFile, endpointFiles, doc);


