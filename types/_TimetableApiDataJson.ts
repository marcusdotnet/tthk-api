interface TimetableApiDataColumn {
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

export interface TimetableApiDataJson {
    r: {
        rights: {
            subjects: boolean
            classes: boolean
            teachers: boolean
            classrooms: boolean
            students: boolean
            igroups: boolean
            classroomsupervision: boolean
            teachers_summary: boolean
            classes_summary: boolean
            classrooms_summary: boolean
            igroups_summary: boolean
        },
        dbiAccessorRes: null | {
            type: string
            dbid: string
            tables: [{
                id: string
                def: {
                    id: string
                    name: string
                    item_name: string
                    icon: string
                }
                cdefs: [TimetableApiDataColumn]
                data_rows: [{}],
                data_columns: [string]
            }]
        }
        error: string | null
    }
}