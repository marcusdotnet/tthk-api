import { timetableChangesService, timetableService } from "./serviceProvider";
import app from "./api/server";

timetableChangesService.configure();
timetableService.configure();


(async () => {
    console.log(`Running in mode '${process.env.NODE_ENV}'`);
    if (process.env.NODE_ENV === "Development") {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    console.log("Fetching timetable data...");
    await timetableChangesService.fetchData();
    await timetableService.fetchData();

    const timetableRefreshDelay: number = process.env.TIMETABLE_REFRESH_DELAY as unknown as number;
    setInterval(() => {
        timetableService.fetchData();
    }, timetableRefreshDelay * 1000);

    console.log("Connecting to database...");
    await timetableService.connect();

    console.log("Saving timetable data...");
    await timetableService.save(process.env.NODE_ENV === "Development");
    console.log("Timetable data saved!");

    console.log("Starting API...");
    const port: number = Number(process.env.API_PORT as unknown as string);
    app.listen(port, () => console.log(`Listening on port ${port}`));
})();