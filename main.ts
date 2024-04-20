import { timetableChangesService, timetableService } from "./serviceProvider";
import type { TimetableClass } from "./types/timetable/Class";
import { QueryError } from "./types/timetable/internal/QueryError";




// timetableChangesService.configure({
//     changesUrl: process.env.TTHK_CHANGES_URL as string,
//     changesSequence: process.env.TTHK_CHANGES_ORDER!.trim().split('"').filter(s => s != ",") as string[]
// });

// timetableChangesService.fetchChanges()
// .then(data => {
//     console.log(data);
// });

timetableService.configure({
    eduPageTimetableUrl: process.env.EDUPAGE_TIMETABLE_API_URL as string,
    schoolId: process.env.DEV_SCHOOL_ID as string,
    gsh: process.env.GSH as string
});

timetableService.fetchData()
.then((data) => {
    timetableService.query({
        day: "tue",
        class: "TARpv22"
    }).map(card => {
        const lesson = card.lesson;

        console.log(`
            Subject: ${lesson.subject.name}
            Teacher: ${lesson.teachers[0].short}
            Classes: ${lesson.classes.map(cl => cl.name).join(", ")}
            Room: ${card.classrooms[0].name}
            Periods: ${card.periodSpan.join("-")}
            Day: ${card.assignedDays[0]?.name}
        `);
    });
});
