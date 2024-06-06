export const TimetableClassDefinition = {
    id: "",
    name: "",
    color: "",
    teachers: [""],
    classrooms: [""]
}

export const TimetableTeacherDefinition = {
    id: "",
    name: "",
    color: "",
    taught_classes: [""]
}

export const TimetableClassroomDefinition = {
    id: "",
    name: "",
    short_name: "",
    buildingid: "",
    color: ""
}

export const TimetableLessonDefinition = {
    id: "*1",
    subject: "*1223",
    classes: ["-467"],
    teachers: ["*140"],
    rooms: ["*29"],
    periods: [7, 7],
    days: [""]
}

export const TimetableSubjectDefinition = {
    id: "",
    name: "",
    short_name: "",
    color: ""
}

export const TimetableChangeEntryDefinition = {
    dayLetter: "",
    date: new Date(),
    class: "",
    period_span: [0, 0],
    teacher: "",
    info: ""
}

export const TimetableDataStoreDefinition = {
    "tt_num": "",
    "year": 0,
    "text": "",
    "datefrom": "yyyy-mm-dd",
    "hidden": false
}