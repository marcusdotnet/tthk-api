declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'Development' | 'Production'
            TTHK_EDUPAGE_URL: string
            TTHK_CHANGES_URL: string
            TTHK_WEEK_LENGTH: number
            EDUPAGE_CONFIG_ENDPOINT_SUFFIX: string
            EDUPAGE_DATA_ENDPOINT_SUFFIX: string
            TIMETABLE_REFRESH_DELAY: number
            DEV_TIMETABLE_FILE: string
            API_PORT: number
            MONGODB_URL: string
        }
}
}

export {};