import { execSync } from 'child_process';
import fs from "fs";

execSync("bun ./src/api/docs/swagger.ts", {stdio: "inherit"});
execSync("npx redocly build-docs ./src/api/docs/swagger-output.json --config ./src/api/docs/redocly.yaml", {stdio: "inherit"});
fs.renameSync("./redoc-static.html", "./src/api/docs/public/index.html");