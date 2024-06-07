import { timetableChangesService, timetableService } from "./serviceProvider";
import app from "./api/server";

timetableChangesService.configure();
timetableService.configure();


(async () => {
    if (process.env.DEV === "true")
        console.log("Running in dev mode");

    await timetableChangesService.fetchData();
    await timetableService.fetchData();


    const timetableRefreshDelay: number = process.env.TIMETABLE_REFRESH_DELAY as unknown as number;
    setInterval(() => {
        timetableService.fetchData();
    }, timetableRefreshDelay * 1000);


    const port: number = Number(process.env.API_PORT as unknown as string);
    app.listen(port, () => console.log(`Listening on port ${port}`));
})();