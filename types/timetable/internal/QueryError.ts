import type { TimetableQuery } from "../Query";

export class QueryError extends Error {
    prototype: Error | null = null;

    constructor(text?: string) {
        super(text || "unknown query error");

        this.prototype = Error.prototype;
    }
}