import type { TimetableDataStore } from "./DataStore";

/**
 * Valid queryable tables in a timetable
 */
export type TimetableDataTableName = Exclude<keyof TimetableDataStore, 'dto'>;