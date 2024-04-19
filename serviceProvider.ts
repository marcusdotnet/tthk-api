import config from "./config";
import { TimetableChangesService } from "./services/TimetableChangesService";
import { TimetableService } from "./services/TimetableService";




const timetableService = new TimetableService();
const timetableChangesService = new TimetableChangesService();

export {timetableService, timetableChangesService};