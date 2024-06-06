import { execSync } from 'child_process';

execSync("bun --watch --env-file=.env ./src/main.ts");