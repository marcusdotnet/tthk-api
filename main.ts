import { timetableChangesService, timetableService } from "./serviceProvider";
import app from "./api/server";

timetableChangesService.configure();
timetableService.configure();


(async () => {
    await timetableChangesService.fetchData();
    await timetableService.fetchData();

    const port: number = Number(process.env.API_PORT as unknown as string);
    app.listen(port, () => console.log(`Listening on port ${port}`));
})();