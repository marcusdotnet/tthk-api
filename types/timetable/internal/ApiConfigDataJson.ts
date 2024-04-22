export interface ApiTimetable {
    tt_num: string
    year: number
    text: string
    datefrom: string
    hidden: boolean
}

export interface ApiConfigDataJson {
    r: {
        allow_my_items: {},
        defaults: {
            showColors: boolean
            timeMode: boolean
            swapAxis: boolean
        }
        current: {
            allow: boolean
        }
        regular: {
            default_num: string
            timetables: ApiTimetable[]
        }
        _changeEvents: {
            "dbi:global_settings": number
        }
    }
}