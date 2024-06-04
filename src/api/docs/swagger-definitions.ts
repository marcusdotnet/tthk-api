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
    id: "",
    subject: "",
    teachers: [""],
    rooms: [""],
    period_start: 0,
    period_end: 0,
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