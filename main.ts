import config from "./config";
import { timetableService } from "./serviceProvider";
import type { TimetableDayId } from "./types";



timetableService.configure({
    eduPageTimetableUrl: config.EDUPAGE_TIMETABLE_API_URL,
    schoolId: config.DEV_SCHOOL_ID,
    gsh: config.GSH
});

timetableService.fetchData()
.then((data) => {
    timetableService.query({
        day: "4",
    }).map(card => {
        const lesson = card.lesson;

        console.log(`
            Subject: ${lesson.subject.name}
            Teacher: ${lesson.teachers[0].short}
            Room: ${card.classrooms[0].name}
            Periods: ${card.periodSpan.join("-")}
            Day: ${card.assignedDays[0]?.name}
        `);
        
    });
});