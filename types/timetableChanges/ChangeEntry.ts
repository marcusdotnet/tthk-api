/**
    The interface for a timetable change entry
*/
export interface TimetableChangeEntry {
    dayLetter: string
    date: string
    class: string
    period: string
    teacher: string
    info: string
}