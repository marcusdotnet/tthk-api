import { write } from "bun";
import { timetableChangesService, timetableService } from "./serviceProvider";
import type { TimetableClass } from "./types/timetable/Class";
import { QueryError } from "./types/timetable/internal/QueryError";
import app from "./api/server";
import { TimetableCard } from "./types/timetable/Card";



timetableChangesService.configure();
timetableService.configure();


(async () => {
    // await timetableChangesService.fetchData();
    // await timetableService.fetchData(true);

    // const port: Number = Number(process.env.API_PORT as unknown as string);
    // app.listen(port, () => console.log(`Listening on port ${port}`));
})();