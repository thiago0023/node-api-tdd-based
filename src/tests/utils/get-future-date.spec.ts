import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test('increase date with one year', () => {
        const year = new Date().getFullYear();

        expect(getFutureDate(`${year}-09-10`, 1).getFullYear()).toBe(year + 1);
    })
    