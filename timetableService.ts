import config from "./config";
import { TimetableService } from "./services/TimetableService";

const timetableServiceSingleton = () => {
    return new TimetableService({
        eduPageTimetableUrl: config.EDUPAGE_TIMETABLE_API_URL,
        schoolId: config.DEV_SCHOOL_ID,
        sessionId: "29b9d89b2ff5c04d7680bfa5d0f0f61c",
        gsh: config.GSH
    }); 
}

declare global {
    var timetableServiceGlobal: undefined | ReturnType<typeof timetableServiceSingleton>
}

const timetableService = globalThis.timetableServiceGlobal ?? timetableServiceSingleton();

export default timetableService;