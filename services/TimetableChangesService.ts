import type { TimetableChangeEntry } from "../types/TimetableChangeEntry";
import type { TimetableChangesServiceOptions } from "../types/TimetableChangesServiceOptions";
import parse from "node-html-parser";

export class TimetableChangesService {
    options: TimetableChangesServiceOptions = {} as TimetableChangesServiceOptions;
    changes: any[] = [];

    constructor(options: TimetableChangesServiceOptions) {
        this.options = options;
    }

    async fetchChanges() {
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
        

        console.log(this.changes);
    }
}