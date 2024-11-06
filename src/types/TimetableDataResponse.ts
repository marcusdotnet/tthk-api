// To parse this data:
//
//   import { Convert, TimetableDataResponse } from "./file";
//
//   const timetableDataResponse = Convert.toTimetableDataResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface TimetableDataResponse {
    r: R;
}

export interface R {
    rights:         { [key: string]: boolean };
    dbiAccessorRes: DbiAccessorRes;
    _changeEvents:  ChangeEvents;
}

export interface ChangeEvents {
    "dbi:global_settings": number;
}

export interface DbiAccessorRes {
    type:         string;
    dbid:         string;
    tables:       Table[];
    changeEvents: ChangeEventsClass;
}

export interface ChangeEventsClass {
    "dbi:timetables": number;
    ttonline_logo:    number;
}

export interface Table {
    id:           string;
    def:          Def;
    cdefs:        Cdef[];
    data_rows:    DataRow[];
    data_columns: string[];
}

export interface Cdef {
    id:          string;
    type:        string;
    name:        string;
    subcolumns?: CdefSubcolumn[];
    table?:      string;
}

export interface CdefSubcolumn {
    id:          string;
    type:        string;
    name:        string;
    subcolumns?: SubcolumnSubcolumn[];
    table?:      string;
}

export interface SubcolumnSubcolumn {
    id:   string;
    type: Type;
    name: string;
}

export enum Type {
    Checkbox = "checkbox",
    Float = "float",
    Int = "int",
    String = "string",
    Time = "time",
}

export interface DataRow {
    id:                         string;
    name?:                      string;
    settings?:                  Settings;
    customfields?:              Customfield[];
    reg_name?:                  string;
    tt_datefrom?:               string;
    period?:                    string;
    short?:                     string;
    starttime?:                 string;
    endtime?:                   string;
    daydata?:                   Breakdata;
    printinsummary?:            boolean;
    printinteacher?:            boolean;
    printinclass?:              boolean;
    printinclassroom?:          boolean;
    printonlyinbells?:          any[];
    perioddata?:                Breakdata;
    breakdata?:                 Breakdata;
    vals?:                      string[];
    typ?:                       number | string;
    buildingid?:                string;
    bell?:                      string;
    color?:                     string;
    teacherid?:                 string;
    classroomids?:              string[];
    printsubjectpictures?:      boolean;
    edupageid?:                 string;
    classroomid?:               string;
    teacherids?:                string[];
    picture_url?:               string;
    contract_weight?:           number;
    fontcolorprint?:            string;
    fontcolorprint2?:           string;
    classids?:                  string[];
    classid?:                   string;
    entireclass?:               boolean;
    ascttdivision?:             string;
    divisionid?:                string;
    groupids?:                  string[];
    subjectid?:                 string;
    count?:                     number;
    durationperiods?:           number;
    termsdefid?:                Sdefid;
    weeksdefid?:                Sdefid;
    daysdefid?:                 Daysdefid;
    terms?:                     string;
    seminargroup?:              null;
    texts?:                     null;
    studentids?:                any[];
    groupnames?:                Groupname[];
    classdata?:                 { [key: string]: Classdatum };
    lessonid?:                  string;
    locked?:                    boolean;
    days?:                      string;
    weeks?:                     string;
    fitwidth?:                  boolean;
    fitheight?:                 boolean;
    hideemptycolumns?:          boolean;
    hideemptyrows?:             boolean;
    headerwidth?:               number;
    headerheight?:              number;
    cellwidth?:                 number;
    cellheight?:                number;
    page_tables?:               string[];
    row_tables?:                string[];
    column_tables?:             ColumnTable[];
    celltype?:                  number;
    cardcolorenabled?:          boolean;
    cardcolortable1?:           string;
    cardcolortable2?:           string;
    cardcolorpos?:              Cardcolorpos;
    cardstyles?:                Cardstyle[];
    classroomsupervisionstyle?: Classroomsupervisionstyle;
    gridheadertexts?:           Gridheadertexts;
    pageheader?:                Classroomsupervisionstyle;
    pageheaderprefixenabled?:   boolean;
    userheader?:                Classroomsupervisionstyle;
    landscape?:                 boolean;
    repeatpage?:                number;
    splitpage_h?:               number;
    splitpage_w?:               number;
    splitpageorder?:            boolean;
    withclassroomtt?:           boolean;
    printlogo?:                 boolean;
    printlogo_url?:             string;
    extracolumns?:              Extra[];
    extrarows?:                 Extra[];
    rowheadercolors?:           Headercolors;
    columnheadercolors?:        Headercolors;
}

export interface Breakdata {
}

export enum Cardcolorpos {
    Empty = "",
    Left = "left",
}

export interface Cardstyle {
    texts:                    Texts;
    m_nDlzka:                 number;
    m_nPocetRiadkov:          number;
    m_nBezTriedyAleboUcitela: number;
}

export interface Texts {
    subjects:   Days;
    teachers:   Days;
    classrooms: Days;
    groupnames: Days;
    classes:    Days;
    count:      Days;
    time:       Days;
}

export interface Days {
    enabled:   boolean | null;
    pos:       number | null;
    size:      number;
    font:      Font;
    bold:      boolean;
    italic:    boolean;
    underline: boolean;
    autohide?: boolean;
    name_col?: Column;
    column?:   Column;
}

export enum Column {
    Empty = "",
    Name = "name",
    Short = "short",
    The2Lines = "2lines",
}

export enum Font {
    Arial = "Arial",
}

export interface Classdatum {
    divisionid: string;
    groups:     string;
}

export interface Classroomsupervisionstyle {
    size:      number;
    font:      Font;
    bold:      boolean;
    italic:    boolean;
    underline: boolean;
    vertical?: boolean;
    text?:     string;
}

export enum ColumnTable {
    Days = "days",
    Periods = "periods",
    Subjects = "subjects",
}

export interface Headercolors {
    enabled:   boolean;
    bgcolor1:  Bgcolor;
    bgcolor2:  Bgcolor;
    fontcolor: Fontcolor;
}

export enum Bgcolor {
    Ffffff = "#FFFFFF",
}

export enum Fontcolor {
    The000000 = "#000000",
}

export interface Customfield {
    field: Field;
    value: string;
}

export enum Field {
    EduPageID = "EduPage ID",
    MyAppID = "MyApp ID",
}

export enum Daysdefid {
    The7 = "*7",
}

export interface Extra {
    typ:         string;
    name:        string;
    size:        number;
    headerstyle: Classroomsupervisionstyle;
    cellstyle:   Classroomsupervisionstyle;
    name_col:    string;
}

export interface Gridheadertexts {
    days:    Days;
    periods: Days;
    time:    Days;
    objects: Days;
}

export enum Groupname {
    Empty = "",
    Gr1 = "Gr 1",
    Gr11 = "gr1/1",
    Gr12 = "gr1/2",
    Gr2 = "Gr 2",
    Gr21 = "gr 2/1",
    Gr22 = "gr 2/2",
    Gr3 = "gr 3",
    GroupnameGr1 = "gr 1",
    GroupnameGr2 = "gr2",
    GroupnameGr3 = "Gr 3",
    GroupnameGrupp1 = "grupp 1",
    GroupnameGrupp2 = "grupp 2",
    Grupp1 = "Grupp 1",
    Grupp2 = "Grupp 2",
    Grupp3 = "grupp 3",
    PurpleGr3 = "gr3",
}

export interface Settings {
    m_nZlozitostGener?:        number;
    m_bAllowZlavnenie?:        boolean;
    m_bGenerDraft?:            boolean;
    m_nCoGenerovat?:           number;
    m_nSchoolType?:            number;
    m_nGapsCounting?:          number;
    m_nTurciTyp?:              number;
    m_bSujectsInMinutes?:      boolean;
    m_bShowComboDays?:         boolean;
    name_format?:              string;
    m_strPrintHeaderText?:     string;
    m_strDateBellowTimeTable?: string;
    m_bPrintDozory?:           boolean;
    m_bPrintDozoryVSuhrnnych?: boolean;
    m_bPrintDozoryColor?:      boolean;
    m_bPrintSinglesSpolu?:     boolean;
    m_bPrintDoublesAsSingles?: boolean;
    m_nTimeFormat?:            number;
    m_nPrvyDen?:               number;
    m_bPrintDayAsNumber?:      boolean;
    m_DozoryKriteria?:         { [key: string]: number };
    draft_options?:            Breakdata;
    m_nSirkaCiaryLesson?:      number;
    m_nSirkaCiaryOkraj?:       number;
    m_nSirkaCiaryDen?:         number;
}

export enum Sdefid {
    The3 = "*3",
}

export interface Def {
    id:        string;
    name:      string;
    item_name: string;
    icon:      string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toTimetableDataResponse(json: string): TimetableDataResponse {
        return cast(JSON.parse(json), r("TimetableDataResponse"));
    }

    public static timetableDataResponseToJson(value: TimetableDataResponse): string {
        return JSON.stringify(uncast(value, r("TimetableDataResponse")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "TimetableDataResponse": o([
        { json: "r", js: "r", typ: r("R") },
    ], false),
    "R": o([
        { json: "rights", js: "rights", typ: m(true) },
        { json: "dbiAccessorRes", js: "dbiAccessorRes", typ: r("DbiAccessorRes") },
        { json: "_changeEvents", js: "_changeEvents", typ: r("ChangeEvents") },
    ], false),
    "ChangeEvents": o([
        { json: "dbi:global_settings", js: "dbi:global_settings", typ: 0 },
    ], false),
    "DbiAccessorRes": o([
        { json: "type", js: "type", typ: "" },
        { json: "dbid", js: "dbid", typ: "" },
        { json: "tables", js: "tables", typ: a(r("Table")) },
        { json: "changeEvents", js: "changeEvents", typ: r("ChangeEventsClass") },
    ], false),
    "ChangeEventsClass": o([
        { json: "dbi:timetables", js: "dbi:timetables", typ: 0 },
        { json: "ttonline_logo", js: "ttonline_logo", typ: 0 },
    ], false),
    "Table": o([
        { json: "id", js: "id", typ: "" },
        { json: "def", js: "def", typ: r("Def") },
        { json: "cdefs", js: "cdefs", typ: a(r("Cdef")) },
        { json: "data_rows", js: "data_rows", typ: a(r("DataRow")) },
        { json: "data_columns", js: "data_columns", typ: a("") },
    ], false),
    "Cdef": o([
        { json: "id", js: "id", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "subcolumns", js: "subcolumns", typ: u(undefined, a(r("CdefSubcolumn"))) },
        { json: "table", js: "table", typ: u(undefined, "") },
    ], false),
    "CdefSubcolumn": o([
        { json: "id", js: "id", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "subcolumns", js: "subcolumns", typ: u(undefined, a(r("SubcolumnSubcolumn"))) },
        { json: "table", js: "table", typ: u(undefined, "") },
    ], false),
    "SubcolumnSubcolumn": o([
        { json: "id", js: "id", typ: "" },
        { json: "type", js: "type", typ: r("Type") },
        { json: "name", js: "name", typ: "" },
    ], false),
    "DataRow": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "settings", js: "settings", typ: u(undefined, r("Settings")) },
        { json: "customfields", js: "customfields", typ: u(undefined, a(r("Customfield"))) },
        { json: "reg_name", js: "reg_name", typ: u(undefined, "") },
        { json: "tt_datefrom", js: "tt_datefrom", typ: u(undefined, "") },
        { json: "period", js: "period", typ: u(undefined, "") },
        { json: "short", js: "short", typ: u(undefined, "") },
        { json: "starttime", js: "starttime", typ: u(undefined, "") },
        { json: "endtime", js: "endtime", typ: u(undefined, "") },
        { json: "daydata", js: "daydata", typ: u(undefined, r("Breakdata")) },
        { json: "printinsummary", js: "printinsummary", typ: u(undefined, true) },
        { json: "printinteacher", js: "printinteacher", typ: u(undefined, true) },
        { json: "printinclass", js: "printinclass", typ: u(undefined, true) },
        { json: "printinclassroom", js: "printinclassroom", typ: u(undefined, true) },
        { json: "printonlyinbells", js: "printonlyinbells", typ: u(undefined, a("any")) },
        { json: "perioddata", js: "perioddata", typ: u(undefined, r("Breakdata")) },
        { json: "breakdata", js: "breakdata", typ: u(undefined, r("Breakdata")) },
        { json: "vals", js: "vals", typ: u(undefined, a("")) },
        { json: "typ", js: "typ", typ: u(undefined, u(0, "")) },
        { json: "buildingid", js: "buildingid", typ: u(undefined, "") },
        { json: "bell", js: "bell", typ: u(undefined, "") },
        { json: "color", js: "color", typ: u(undefined, "") },
        { json: "teacherid", js: "teacherid", typ: u(undefined, "") },
        { json: "classroomids", js: "classroomids", typ: u(undefined, a("")) },
        { json: "printsubjectpictures", js: "printsubjectpictures", typ: u(undefined, true) },
        { json: "edupageid", js: "edupageid", typ: u(undefined, "") },
        { json: "classroomid", js: "classroomid", typ: u(undefined, "") },
        { json: "teacherids", js: "teacherids", typ: u(undefined, a("")) },
        { json: "picture_url", js: "picture_url", typ: u(undefined, "") },
        { json: "contract_weight", js: "contract_weight", typ: u(undefined, 0) },
        { json: "fontcolorprint", js: "fontcolorprint", typ: u(undefined, "") },
        { json: "fontcolorprint2", js: "fontcolorprint2", typ: u(undefined, "") },
        { json: "classids", js: "classids", typ: u(undefined, a("")) },
        { json: "classid", js: "classid", typ: u(undefined, "") },
        { json: "entireclass", js: "entireclass", typ: u(undefined, true) },
        { json: "ascttdivision", js: "ascttdivision", typ: u(undefined, "") },
        { json: "divisionid", js: "divisionid", typ: u(undefined, "") },
        { json: "groupids", js: "groupids", typ: u(undefined, a("")) },
        { json: "subjectid", js: "subjectid", typ: u(undefined, "") },
        { json: "count", js: "count", typ: u(undefined, 0) },
        { json: "durationperiods", js: "durationperiods", typ: u(undefined, 0) },
        { json: "termsdefid", js: "termsdefid", typ: u(undefined, r("Sdefid")) },
        { json: "weeksdefid", js: "weeksdefid", typ: u(undefined, r("Sdefid")) },
        { json: "daysdefid", js: "daysdefid", typ: u(undefined, r("Daysdefid")) },
        { json: "terms", js: "terms", typ: u(undefined, "") },
        { json: "seminargroup", js: "seminargroup", typ: u(undefined, null) },
        { json: "texts", js: "texts", typ: u(undefined, null) },
        { json: "studentids", js: "studentids", typ: u(undefined, a("any")) },
        { json: "groupnames", js: "groupnames", typ: u(undefined, a(r("Groupname"))) },
        { json: "classdata", js: "classdata", typ: u(undefined, m(r("Classdatum"))) },
        { json: "lessonid", js: "lessonid", typ: u(undefined, "") },
        { json: "locked", js: "locked", typ: u(undefined, true) },
        { json: "days", js: "days", typ: u(undefined, "") },
        { json: "weeks", js: "weeks", typ: u(undefined, "") },
        { json: "fitwidth", js: "fitwidth", typ: u(undefined, true) },
        { json: "fitheight", js: "fitheight", typ: u(undefined, true) },
        { json: "hideemptycolumns", js: "hideemptycolumns", typ: u(undefined, true) },
        { json: "hideemptyrows", js: "hideemptyrows", typ: u(undefined, true) },
        { json: "headerwidth", js: "headerwidth", typ: u(undefined, 3.14) },
        { json: "headerheight", js: "headerheight", typ: u(undefined, 3.14) },
        { json: "cellwidth", js: "cellwidth", typ: u(undefined, 3.14) },
        { json: "cellheight", js: "cellheight", typ: u(undefined, 3.14) },
        { json: "page_tables", js: "page_tables", typ: u(undefined, a("")) },
        { json: "row_tables", js: "row_tables", typ: u(undefined, a("")) },
        { json: "column_tables", js: "column_tables", typ: u(undefined, a(r("ColumnTable"))) },
        { json: "celltype", js: "celltype", typ: u(undefined, 0) },
        { json: "cardcolorenabled", js: "cardcolorenabled", typ: u(undefined, true) },
        { json: "cardcolortable1", js: "cardcolortable1", typ: u(undefined, "") },
        { json: "cardcolortable2", js: "cardcolortable2", typ: u(undefined, "") },
        { json: "cardcolorpos", js: "cardcolorpos", typ: u(undefined, r("Cardcolorpos")) },
        { json: "cardstyles", js: "cardstyles", typ: u(undefined, a(r("Cardstyle"))) },
        { json: "classroomsupervisionstyle", js: "classroomsupervisionstyle", typ: u(undefined, r("Classroomsupervisionstyle")) },
        { json: "gridheadertexts", js: "gridheadertexts", typ: u(undefined, r("Gridheadertexts")) },
        { json: "pageheader", js: "pageheader", typ: u(undefined, r("Classroomsupervisionstyle")) },
        { json: "pageheaderprefixenabled", js: "pageheaderprefixenabled", typ: u(undefined, true) },
        { json: "userheader", js: "userheader", typ: u(undefined, r("Classroomsupervisionstyle")) },
        { json: "landscape", js: "landscape", typ: u(undefined, true) },
        { json: "repeatpage", js: "repeatpage", typ: u(undefined, 0) },
        { json: "splitpage_h", js: "splitpage_h", typ: u(undefined, 0) },
        { json: "splitpage_w", js: "splitpage_w", typ: u(undefined, 0) },
        { json: "splitpageorder", js: "splitpageorder", typ: u(undefined, true) },
        { json: "withclassroomtt", js: "withclassroomtt", typ: u(undefined, true) },
        { json: "printlogo", js: "printlogo", typ: u(undefined, true) },
        { json: "printlogo_url", js: "printlogo_url", typ: u(undefined, "") },
        { json: "extracolumns", js: "extracolumns", typ: u(undefined, a(r("Extra"))) },
        { json: "extrarows", js: "extrarows", typ: u(undefined, a(r("Extra"))) },
        { json: "rowheadercolors", js: "rowheadercolors", typ: u(undefined, r("Headercolors")) },
        { json: "columnheadercolors", js: "columnheadercolors", typ: u(undefined, r("Headercolors")) },
    ], false),
    "Breakdata": o([
    ], false),
    "Cardstyle": o([
        { json: "texts", js: "texts", typ: r("Texts") },
        { json: "m_nDlzka", js: "m_nDlzka", typ: 0 },
        { json: "m_nPocetRiadkov", js: "m_nPocetRiadkov", typ: 0 },
        { json: "m_nBezTriedyAleboUcitela", js: "m_nBezTriedyAleboUcitela", typ: 0 },
    ], false),
    "Texts": o([
        { json: "subjects", js: "subjects", typ: r("Days") },
        { json: "teachers", js: "teachers", typ: r("Days") },
        { json: "classrooms", js: "classrooms", typ: r("Days") },
        { json: "groupnames", js: "groupnames", typ: r("Days") },
        { json: "classes", js: "classes", typ: r("Days") },
        { json: "count", js: "count", typ: r("Days") },
        { json: "time", js: "time", typ: r("Days") },
    ], false),
    "Days": o([
        { json: "enabled", js: "enabled", typ: u(true, null) },
        { json: "pos", js: "pos", typ: u(0, null) },
        { json: "size", js: "size", typ: 3.14 },
        { json: "font", js: "font", typ: r("Font") },
        { json: "bold", js: "bold", typ: true },
        { json: "italic", js: "italic", typ: true },
        { json: "underline", js: "underline", typ: true },
        { json: "autohide", js: "autohide", typ: u(undefined, true) },
        { json: "name_col", js: "name_col", typ: u(undefined, r("Column")) },
        { json: "column", js: "column", typ: u(undefined, r("Column")) },
    ], false),
    "Classdatum": o([
        { json: "divisionid", js: "divisionid", typ: "" },
        { json: "groups", js: "groups", typ: "" },
    ], false),
    "Classroomsupervisionstyle": o([
        { json: "size", js: "size", typ: 3.14 },
        { json: "font", js: "font", typ: r("Font") },
        { json: "bold", js: "bold", typ: true },
        { json: "italic", js: "italic", typ: true },
        { json: "underline", js: "underline", typ: true },
        { json: "vertical", js: "vertical", typ: u(undefined, true) },
        { json: "text", js: "text", typ: u(undefined, "") },
    ], false),
    "Headercolors": o([
        { json: "enabled", js: "enabled", typ: true },
        { json: "bgcolor1", js: "bgcolor1", typ: r("Bgcolor") },
        { json: "bgcolor2", js: "bgcolor2", typ: r("Bgcolor") },
        { json: "fontcolor", js: "fontcolor", typ: r("Fontcolor") },
    ], false),
    "Customfield": o([
        { json: "field", js: "field", typ: r("Field") },
        { json: "value", js: "value", typ: "" },
    ], false),
    "Extra": o([
        { json: "typ", js: "typ", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "size", js: "size", typ: 0 },
        { json: "headerstyle", js: "headerstyle", typ: r("Classroomsupervisionstyle") },
        { json: "cellstyle", js: "cellstyle", typ: r("Classroomsupervisionstyle") },
        { json: "name_col", js: "name_col", typ: "" },
    ], false),
    "Gridheadertexts": o([
        { json: "days", js: "days", typ: r("Days") },
        { json: "periods", js: "periods", typ: r("Days") },
        { json: "time", js: "time", typ: r("Days") },
        { json: "objects", js: "objects", typ: r("Days") },
    ], false),
    "Settings": o([
        { json: "m_nZlozitostGener", js: "m_nZlozitostGener", typ: u(undefined, 0) },
        { json: "m_bAllowZlavnenie", js: "m_bAllowZlavnenie", typ: u(undefined, true) },
        { json: "m_bGenerDraft", js: "m_bGenerDraft", typ: u(undefined, true) },
        { json: "m_nCoGenerovat", js: "m_nCoGenerovat", typ: u(undefined, 0) },
        { json: "m_nSchoolType", js: "m_nSchoolType", typ: u(undefined, 0) },
        { json: "m_nGapsCounting", js: "m_nGapsCounting", typ: u(undefined, 0) },
        { json: "m_nTurciTyp", js: "m_nTurciTyp", typ: u(undefined, 0) },
        { json: "m_bSujectsInMinutes", js: "m_bSujectsInMinutes", typ: u(undefined, true) },
        { json: "m_bShowComboDays", js: "m_bShowComboDays", typ: u(undefined, true) },
        { json: "name_format", js: "name_format", typ: u(undefined, "") },
        { json: "m_strPrintHeaderText", js: "m_strPrintHeaderText", typ: u(undefined, "") },
        { json: "m_strDateBellowTimeTable", js: "m_strDateBellowTimeTable", typ: u(undefined, "") },
        { json: "m_bPrintDozory", js: "m_bPrintDozory", typ: u(undefined, true) },
        { json: "m_bPrintDozoryVSuhrnnych", js: "m_bPrintDozoryVSuhrnnych", typ: u(undefined, true) },
        { json: "m_bPrintDozoryColor", js: "m_bPrintDozoryColor", typ: u(undefined, true) },
        { json: "m_bPrintSinglesSpolu", js: "m_bPrintSinglesSpolu", typ: u(undefined, true) },
        { json: "m_bPrintDoublesAsSingles", js: "m_bPrintDoublesAsSingles", typ: u(undefined, true) },
        { json: "m_nTimeFormat", js: "m_nTimeFormat", typ: u(undefined, 0) },
        { json: "m_nPrvyDen", js: "m_nPrvyDen", typ: u(undefined, 0) },
        { json: "m_bPrintDayAsNumber", js: "m_bPrintDayAsNumber", typ: u(undefined, true) },
        { json: "m_DozoryKriteria", js: "m_DozoryKriteria", typ: u(undefined, m(0)) },
        { json: "draft_options", js: "draft_options", typ: u(undefined, r("Breakdata")) },
        { json: "m_nSirkaCiaryLesson", js: "m_nSirkaCiaryLesson", typ: u(undefined, 0) },
        { json: "m_nSirkaCiaryOkraj", js: "m_nSirkaCiaryOkraj", typ: u(undefined, 0) },
        { json: "m_nSirkaCiaryDen", js: "m_nSirkaCiaryDen", typ: u(undefined, 0) },
    ], false),
    "Def": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "item_name", js: "item_name", typ: "" },
        { json: "icon", js: "icon", typ: "" },
    ], false),
    "Type": [
        "checkbox",
        "float",
        "int",
        "string",
        "time",
    ],
    "Cardcolorpos": [
        "",
        "left",
    ],
    "Column": [
        "",
        "name",
        "short",
        "2lines",
    ],
    "Font": [
        "Arial",
    ],
    "ColumnTable": [
        "days",
        "periods",
        "subjects",
    ],
    "Bgcolor": [
        "#FFFFFF",
    ],
    "Fontcolor": [
        "#000000",
    ],
    "Field": [
        "EduPage ID",
        "MyApp ID",
    ],
    "Daysdefid": [
        "*7",
    ],
    "Groupname": [
        "",
        "Gr 1",
        "gr1/1",
        "gr1/2",
        "Gr 2",
        "gr 2/1",
        "gr 2/2",
        "gr 3",
        "gr 1",
        "gr2",
        "Gr 3",
        "grupp 1",
        "grupp 2",
        "Grupp 1",
        "Grupp 2",
        "grupp 3",
        "gr3",
    ],
    "Sdefid": [
        "*3",
    ],
};
