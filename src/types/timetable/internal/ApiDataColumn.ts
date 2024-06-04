/**
    The interface for a api data column
*/
export interface TimetableApiDataColumn {
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