import parse from "node-html-parser";
import { TimetableChangeEntry } from "../types/timetableChanges/ChangeEntry";
import type { TimetableChangesServiceOptions } from "../types/timetableChanges/internal/ServiceOptions";


export class TimetableChangesService {
    options: TimetableChangesServiceOptions = {} as TimetableChangesServiceOptions;
    changes: TimetableChangeEntry[] = [];


    configure() {
        this.options = {
            changesUrl: process.env.TTHK_CHANGES_URL as string
        }
    }


    async fetchData() {
        this.changes = [];

        const response = await fetch(this.options.changesUrl);
        const body = await response.text();
        const root = parse(body);

        for (const tableBody of root.querySelectorAll("table tbody")) {
            const firstRow = tableBody.firstChild;
            if (!firstRow || firstRow.childNodes.length < 5) continue;

            var rowIndex = -1;
            for (const tr of tableBody.childNodes) {
                rowIndex++;
                if (rowIndex == 0) continue; // skip the first row (it's the head of the table)

                const rowColumns = tr.childNodes;
                if (rowColumns.length < 6) continue;

                const changeEntry = new TimetableChangeEntry();
                changeEntry.dayLetter = rowColumns[0].innerText.trim();
                changeEntry._date = rowColumns[1].innerText.trim();
                changeEntry.class = rowColumns[2].innerText.trim();
                changeEntry.period = rowColumns[3].innerText.trim();
                changeEntry.teacher = rowColumns[4].innerText.trim();
                changeEntry.info = rowColumns[5].innerText.trim();

                this.changes.push(changeEntry);
            }
        }

        return this.changes;
    }
}