export interface TimetableDataColumn {
    id: string
    type: string
    name: string
    table: string | null
    subcolumns: [{
        id: string
        type: string
        name: string
    }] | null
}