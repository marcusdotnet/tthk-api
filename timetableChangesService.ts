import config from "./config";
import { TimetableChangesService } from "./services/TimetableChangesService";

const timetableChangesServiceSingleton = () => {
    return new TimetableChangesService({
        changesUrl: config.TTHK_CHANGES_URL,
        changesSequence: config.TTHK_CHANGES_ORDER
    }); 
}

declare global {
    var timetableChangesServiceGlobal: undefined | ReturnType<typeof timetableChangesServiceSingleton>
}

const timetableChangesService = globalThis.timetableChangesServiceGlobal ?? timetableChangesServiceSingleton();

export default timetableChangesService;