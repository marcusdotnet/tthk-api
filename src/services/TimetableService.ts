import type { BunFile } from "bun";
import type { TimetableServiceOptions } from "../types/TimetableServiceOptions";
import type { TimetableDataResponse } from "../types/TimetableDataResponse";
import type { TimetableConfigResponse } from "../types/TimetableConfigResponse";
import { TimetableDataStore, type TimetableData } from "../timetableDataStore";


const isDevMode = process.env.NODE_ENV === "Development";
const timetableDevFile: BunFile | null = isDevMode && Bun.file(process.env!.DEV_TIMETABLE_FILE as string) || null;

/**
 * The structure for the timetable file used in development mode
 */
interface DevFileData {
    config?: TimetableConfigResponse;
    data: { [key: string]: TimetableDataResponse };
}


/**
 * The service that makes accessing timetable data easy
 * and allows for querying of timetable tables
 */
export class TimetableService {
    private options: TimetableServiceOptions | null = null;

    /**
     * A dictionary of all timetable data stores
     * where the key is a timetable id and the value is the timetable store
     */
    store: TimetableDataStore | null = null;


    /**
     * Configure the timetable service
     * options are consumed from the active .env file.
     */
    configure(): void {
        this.options = {
            eduPageTimetableUrl: process.env.TTHK_EDUPAGE_URL as string,
            eduPageTimetableConfigSuffix: process.env.EDUPAGE_CONFIG_ENDPOINT_SUFFIX as string,
            eduPageTimetableDataSuffix: process.env.EDUPAGE_DATA_ENDPOINT_SUFFIX as string,
            year: new Date().getFullYear()
        }
    }


    /**
     * Fetch the timetable data
     * must be called at least once during the program lifecycle in order to query the timetable.
     */
    async fetchData(): Promise<void> {
        const options: TimetableServiceOptions = this.options as TimetableServiceOptions;
        const localFileExists: boolean = isDevMode && await timetableDevFile?.exists() || false;

        var timetableConfigData: TimetableConfigResponse | undefined;
        var devFileData: DevFileData = (localFileExists && await timetableDevFile?.json()) || { "data": {}, "config": {} };

        if (localFileExists)
            timetableConfigData = devFileData["config"];

        if (!timetableConfigData || !timetableConfigData?.r) {
            timetableConfigData = await ((await fetch(`${options.eduPageTimetableUrl}/${options.eduPageTimetableConfigSuffix}`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, this.options?.year],
                    "__gsh": "00000000"
                })
            })).json());
        }
        
        if (!timetableConfigData) {
            console.error("Failed to retrieve timetable config data");
            return;
        };

        if (isDevMode)
            devFileData["config"] = timetableConfigData;


        const timetables: TimetableData[] = [];
        for (const timetableEntry of timetableConfigData.r.regular.timetables) {
            const timetableData: TimetableDataResponse = (localFileExists && devFileData["data"][timetableEntry.tt_num]) || await ((await fetch(`${options.eduPageTimetableUrl}/${options.eduPageTimetableDataSuffix}`, {
                method: "POST",
                body: JSON.stringify({
                    "__args": [null, timetableEntry.tt_num],
                    "__gsh": "00000000"
                })
            })).json());

            if (isDevMode)
                devFileData["data"][timetableEntry.tt_num] = timetableData;

            if (!timetableData) return;
            (timetableData as TimetableData).tt_id = timetableEntry.tt_num;
            timetables.push(timetableData as TimetableData);

        }
        
        const dataStore: TimetableDataStore = new TimetableDataStore(timetableConfigData, timetables);
        this.store = dataStore;

        if (isDevMode && !localFileExists) {
            timetableDevFile?.writer().write(JSON.stringify(devFileData));
            console.log(`Wrote timetable data to ${timetableDevFile?.name}`)
        }
    }    
}

