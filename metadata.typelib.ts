/*
* This file is generated automatically by the RTTIST TypeGen tool.
* Do not edit it manually.
*/
import { ModuleImporter, MetadataLibrary, createGetTypeFunction, createCallsite, resolveFromFunctionCallsite, resolveFromMethodCallsite, getClassTypeParameter, Type } from "rttist";
import "rttist/dist/public.typelib";

// @ts-ignore; !! CONFIGURE THIS AS AN EXTERNAL DEPENDENCY !!
import { Metadata as InternalMetadataLibrary } from "./internal.typelib";

ModuleImporter.registerImporters({
	"@tthk-api/src/types/timetable/Bell": () => import("./src/types/timetable/Bell.js"),
	"@tthk-api/src/types/timetable/Break": () => import("./src/types/timetable/Break.js"),
	"@tthk-api/src/types/timetable/Building": () => import("./src/types/timetable/Building.js"),
	"@tthk-api/src/types/timetable/Card": () => import("./src/types/timetable/Card.js"),
	"@tthk-api/src/types/timetable/Class": () => import("./src/types/timetable/Class.js"),
	"@tthk-api/src/types/timetable/Classroom": () => import("./src/types/timetable/Classroom.js"),
	"@tthk-api/src/types/timetable/ClassroomSupervision": () => import("./src/types/timetable/ClassroomSupervision.js"),
	"@tthk-api/src/types/timetable/Day": () => import("./src/types/timetable/Day.js"),
	"@tthk-api/src/types/timetable/DayDefinition": () => import("./src/types/timetable/DayDefinition.js"),
	"@tthk-api/src/types/timetable/Division": () => import("./src/types/timetable/Division.js"),
	"@tthk-api/src/types/timetable/Global": () => import("./src/types/timetable/Global.js"),
	"@tthk-api/src/types/timetable/Group": () => import("./src/types/timetable/Group.js"),
	"@tthk-api/src/types/timetable/Lesson": () => import("./src/types/timetable/Lesson.js"),
	"@tthk-api/src/types/timetable/Period": () => import("./src/types/timetable/Period.js"),
	"@tthk-api/src/types/timetable/Student": () => import("./src/types/timetable/Student.js"),
	"@tthk-api/src/types/timetable/StudentSubject": () => import("./src/types/timetable/StudentSubject.js"),
	"@tthk-api/src/types/timetable/Subject": () => import("./src/types/timetable/Subject.js"),
	"@tthk-api/src/types/timetable/Teacher": () => import("./src/types/timetable/Teacher.js"),
	"@tthk-api/src/types/timetable/Term": () => import("./src/types/timetable/Term.js"),
	"@tthk-api/src/types/timetable/TermDefinition": () => import("./src/types/timetable/TermDefinition.js"),
	"@tthk-api/src/types/timetable/Week": () => import("./src/types/timetable/Week.js"),
	"@tthk-api/src/types/timetable/WeekDefinition": () => import("./src/types/timetable/WeekDefinition.js"),
	"@tthk-api/src/types/timetableChanges/ChangeEntry": () => import("./src/types/timetableChanges/ChangeEntry.js"),
	"@tthk-api/src/types/timetable/internal/ApiConfigDataJson": () => import("./src/types/timetable/internal/ApiConfigDataJson.js"),
	"@tthk-api/src/types/timetable/internal/ApiDataColumn": () => import("./src/types/timetable/internal/ApiDataColumn.js"),
	"@tthk-api/src/types/timetable/internal/ApiDataJson": () => import("./src/types/timetable/internal/ApiDataJson.js"),
	"@tthk-api/src/types/timetable/internal/DataStore": () => import("./src/types/timetable/internal/DataStore.js"),
	"@tthk-api/src/types/timetable/internal/DataTableName": () => import("./src/types/timetable/internal/DataTableName.js"),
	"@tthk-api/src/types/timetable/internal/DataTableObject": () => import("./src/types/timetable/internal/DataTableObject.js"),
	"@tthk-api/src/types/timetable/internal/ServiceOptions": () => import("./src/types/timetable/internal/ServiceOptions.js"),
	"@tthk-api/src/types/timetableChanges/internal/ServiceOptions": () => import("./src/types/timetableChanges/internal/ServiceOptions.js"),
});

export const getType: <T>(...args: any[]) => Type = createGetTypeFunction(InternalMetadataLibrary);
export const resolveType = InternalMetadataLibrary.resolveType.bind(InternalMetadataLibrary);
export const _ = {
	cs$: createCallsite,
	resFnCs$: resolveFromFunctionCallsite,
	resMCs$: resolveFromMethodCallsite,
	getTP$: getClassTypeParameter,
};
/** @internal */
export const Metadata: MetadataLibrary = InternalMetadataLibrary;