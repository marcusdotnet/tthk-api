import shell from 'shelljs';
import os from 'os';
import fs from 'fs';
import zip from 'zip-lib';

const BUN_VERSION = '1.1.34';
const PLATFORM = os.platform();


let bunExists = false;
let bunZipPath = null;
const bunFiles = Array.from(shell.find('bun*'))
if (bunFiles) {
    console.log(bunFiles); 
    bunFiles.forEach(file => {
        if (file.endsWith('.zip')) {
            bunZipPath = file;
        }
        else {
            bunExists = true;
        }
    })
}

function extractBunZip(zipPath) {
    const targetPath = zipPath.replace('.zip', '');
    const bunOutputName = PLATFORM === 'win32' ? 'bun.exe' : 'bun'; 

    console.log('Extracting bun zip...');
    zip.extract(zipPath, targetPath, { overwrite: true }).then(() => {
        shell.mv(`${targetPath}/${targetPath}/*`, bunOutputName);
        console.log(zipPath, targetPath)
        shell.rm(zipPath);
        shell.rm('-rf', targetPath);
        console.log('Done extracting bun!')
    });
}


if (bunExists) {
    console.log('Bun is already installed, skipping installation.');
    process.exit(0);
}

if (bunZipPath) {
    extractBunZip(bunZipPath);
}

let archSuffix = '';
switch (PLATFORM) {
    case 'win32':
        archSuffix = 'windows-x64';
        break;
    case 'linux':
        archSuffix = 'linux-x64'
        break;
    default:
        console.error('Couldn\'t figure out which version of Bun to install!')
        process.exit(1);
        break;
}

const bunZipName = `bun-${archSuffix}.zip`;
console.log(`Installing bun for platform: ${PLATFORM}`);
shell.exec(`curl -LO https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/${bunZipName}`);
extractBunZip(bunZipName);