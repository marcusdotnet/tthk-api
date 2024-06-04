import { TimetableChangesService } from "./src/services/TimetableChangesService";
import { TimetableService } from "./src/services/TimetableService";




const timetableService = new TimetableService();
const timetableChangesService = new TimetableChangesService();

export {timetableService, timetableChangesService};