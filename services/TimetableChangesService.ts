import parse from "node-html-parser";
import type { TimetableChangeEntry } from "../types/timetableChanges/ChangeEntry";
import type { TimetableChangesServiceOptions } from "../types/timetableChanges/internal/ServiceOptions";


export class TimetableChangesService {
    options: TimetableChangesServiceOptions = {} as TimetableChangesServiceOptions;
    changes: TimetableChangeEntry[] = [];


    configure() {
        this.options = {
            changesUrl: process.env.TTHK_CHANGES_URL as string,
            changesSequence: process.env.TTHK_CHANGES_ORDER!.trim().split('"').filter(s => s != ",") as string[]
        }
    }


    async fetchData() {
        this.changes = [];

        const response = await fetch(this.options.changesUrl);
        const body = await response.text();
        const root = parse(body);
        const changesSequence = this.options.changesSequence;

        for (const tableBody of root.querySelectorAll("table tbody")) {
            const firstRow = tableBody.firstChild;
            if (!firstRow || firstRow.childNodes.length < 5) continue;

            var rowIndex = -1;
            for (const tr of tableBody.childNodes) {
                rowIndex++;
                if (rowIndex == 0) continue; // skip the first row (it's the head of the table atm)

                const rowColumns = tr.childNodes;
                if (rowColumns.length < changesSequence.length) continue;

                const changeEntry: TimetableChangeEntry = {} as TimetableChangeEntry;

                var changeInfoIndex = 0;
                for (const td of rowColumns) {
                    const changeKey = changesSequence[changeInfoIndex];

                    //@ts-ignore
                    changeEntry[changeKey] = td.innerText.trim();

                    changeInfoIndex++;
                }

                this.changes.push(changeEntry);
            }
        }

        return this.changes;
    }
}