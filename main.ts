import { write } from "bun";
import { timetableChangesService, timetableService } from "./serviceProvider";
import type { TimetableClass } from "./types/timetable/Class";
import { QueryError } from "./types/timetable/internal/QueryError";
import app from "./api/server";



timetableChangesService.configure({
    changesUrl: process.env.TTHK_CHANGES_URL as string,
    changesSequence: process.env.TTHK_CHANGES_ORDER!.trim().split('"').filter(s => s != ",") as string[]
});



timetableService.configure({
    eduPageTimetableUrl: process.env.EDUPAGE_TIMETABLE_API_URL as string,
    schoolId: process.env.DEV_SCHOOL_ID as string,
    gsh: process.env.GSH as string
});


(async () => {
    await timetableChangesService.fetchData();
    await timetableService.fetchData();
    
    const port: Number = Number(process.env.API_PORT as unknown as string);
    app.listen(port, () => console.log(`Listening on port ${port}`));
})();