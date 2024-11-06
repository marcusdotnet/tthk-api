import shell from 'shelljs';
import fs from 'fs/promises';
import path from 'path';

const tthkUrl = process.env.TTHK_EDUPAGE_URL;
const configEndpointSuffix = process.env.EDUPAGE_CONFIG_ENDPOINT_SUFFIX;
const dataEndpointSuffix = process.env.EDUPAGE_DATA_ENDPOINT_SUFFIX;

const configFilePath = 'timetableConfigResponse.json';
const dataFilePath = 'timetableDataResponse.json';
const configOutputPath = path.join(__dirname, '../src/types/TimetableConfigResponse.ts');
const dataOutputPath = path.join(__dirname, '../src/types/TimetableDataResponse.ts');

let defaultTimetableId: string | null = null;

async function generateTimetableConfigTypes(year: number = new Date().getFullYear()) {
    console.debug(`Generating timetable config types for year='${year}'`);
    const res = await fetch(`${tthkUrl}/${configEndpointSuffix}`, {
        method: "POST",
        body: JSON.stringify({
            "__args": [null, year || 2024],
            "__gsh": "00000000"
        })
    });

    const json = await res.json();
    defaultTimetableId = defaultTimetableId || json?.r?.regular?.default_num;
    
    console.debug(`Default timetable id='${defaultTimetableId}'`);
    fs.writeFile(configFilePath, JSON.stringify(json, null, 4));
    shell.exec(`npx quicktype --src ${configFilePath} --src-lang json --lang typescript --top-level TimetableConfigResponse --out ${configOutputPath}`)
    shell.rm(configFilePath);
}

async function generateTimetableDataTypes(timetableId: string) {
    console.debug(`Generating timetable data types for timetableId='${timetableId}'`);
    const res = await fetch(`${tthkUrl}/${dataEndpointSuffix}`, {
        method: "POST",
        body: JSON.stringify({
            "__args": [null, timetableId],
            "__gsh": "00000000"
        })
    });

    const json = await res.json();
    defaultTimetableId = defaultTimetableId || json?.r?.regular?.default_num;
    
    fs.writeFile(dataFilePath, JSON.stringify(json, null, 4));
    shell.exec(`npx quicktype --src ${dataFilePath} --src-lang json --lang typescript --top-level TimetableDataResponse --out ${dataOutputPath}`)
    shell.rm(dataFilePath);
}

(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    await generateTimetableConfigTypes();

    if (!defaultTimetableId) {
        console.error('Default timetable id not found');
        return;
    }

    await generateTimetableDataTypes(defaultTimetableId);
    console.debug('Types generated successfully!');
})();