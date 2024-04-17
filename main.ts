import config from "./config";
import { TimetableService } from "./services/TimetableService";
import {write} from "bun";

const timetableService = new TimetableService({
    eduPageTimetableUrl: config.EDUPAGE_TIMETABLE_API_URL,
    schoolId: config.DEV_SCHOOL_ID,
    sessionId: "29b9d89b2ff5c04d7680bfa5d0f0f61c",
    gsh: config.GSH
});


export function logwrite(data: string | object) {
    var content = data;

    if (typeof data == "object") {
        content = JSON.stringify(data, null, 2);
    }

    write("test.json", content);
}


timetableService.fetchTimetable()
.then(() => {
    const data = timetableService.data;


    const tarpe22Id = timetableService.findClassIdByName("TARpe22");
    
    // console.log(timetableService.data.periods);
    console.log(timetableService.getPrettyTimetable());
    // timetableService.getPrettyTimetable()
});